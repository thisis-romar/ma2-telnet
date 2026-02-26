import net from 'net';
import { parseListOutput, ListParseResult } from './parser.js';

// Strips ANSI terminal escape sequences (colours, cursor, erase codes).
const ANSI_RE = /\x1b\[[^a-zA-Z]*[a-zA-Z]/g;
function stripAnsi(s: string): string {
  return s.replace(ANSI_RE, '');
}

// The grandMA2 console terminates every response with its command prompt,
// which looks like "\r [<layer>]>" (with optional trailing ANSI codes that
// are stripped before matching).
const PROMPT_RE = /\r \[[^\]]*\]>/;

// A line in the response that starts with "Error #" signals a command failure.
const ERROR_LINE_RE = /^Error #\d+:/m;

type PendingCommand = {
  cmd: string;
  resolve: (value: { raw: string[]; parsed?: ListParseResult }) => void;
  reject: (reason?: unknown) => void;
};

// Internal login phases:
//  'banner'   – connected; waiting for the initial banner+prompt so we can
//               send the login command.
//  'login'    – login command sent; waiting for the login response+prompt.
//  'ready'    – logged in; the connection is idle and ready for commands.
type LoginPhase = 'banner' | 'login' | 'ready';

/**
 * Manages a persistent TCP connection to a grandMA2 console and provides
 * queued command execution.  Each command is submitted as a single line and
 * results are delivered as arrays of response lines.  `List` commands also
 * produce an additional structured representation parsed from the output.
 *
 * Protocol notes observed from the grandMA2 onPC 3.9 telnet interface:
 *  - Commands must be terminated with CRLF (\r\n).
 *  - Every response (including login) is terminated by the console prompt
 *    which takes the form "\r [<LayerName>]>" (possibly followed by further
 *    ANSI codes).
 *  - Response lines use LF+CR (\n\r) as the line separator.
 *  - The console prefixes each command response with an "Executing : …" echo
 *    line which is stripped from the returned output.
 *  - Errors appear as lines matching /^Error #\d+:/ before the prompt.
 *  - ANSI colour/cursor escape sequences are stripped before parsing.
 */
export class MA2Connection {
  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;

  private socket: net.Socket | null = null;
  /** Accumulated stripped text waiting to be parsed into responses. */
  private buffer = '';
  /** Current phase of the login handshake. */
  private phase: LoginPhase = 'banner';

  /** Resolves/rejects the promise returned by connect(). */
  private loginResolve: (() => void) | null = null;
  private loginReject: ((err: Error) => void) | null = null;

  private queue: PendingCommand[] = [];
  private busy = false;
  private current: PendingCommand | null = null;

  private isClosed = false;
  private isError = false;

  constructor() {
    this.host = process.env.MA2_HOST || '127.0.0.1';
    this.port = parseInt(process.env.MA2_PORT || '30000', 10);
    this.username = process.env.MA2_USERNAME || 'administrator';
    this.password = process.env.MA2_PASSWORD || 'admin';
  }

  /**
   * Establish the TCP connection and perform the login handshake.  Returns a
   * promise that resolves when the console is ready for commands.  Subsequent
   * calls return immediately if already connected.
   */
  async connect(): Promise<void> {
    if (this.socket) return;
    // Reset state so we can reconnect after a previous disconnect.
    this.isClosed = false;
    this.isError = false;
    await this.openSocket();
    await new Promise<void>((resolve, reject) => {
      this.loginResolve = resolve;
      this.loginReject = reject;
    });
  }

  /**
   * Queue a command for execution.  Commands are executed one at a time in
   * the order they are submitted.
   */
  async sendCommand(cmd: string): Promise<{ raw: string[]; parsed?: ListParseResult }> {
    await this.connect();
    return new Promise((resolve, reject) => {
      this.queue.push({ cmd, resolve, reject });
      this.flushQueue();
    });
  }

  /** Close the socket.  In-flight and queued commands are rejected. */
  close(): void {
    this.isClosed = true;
    this.socket?.end();
    this.cleanupSocket();
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private openSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      const sock = new net.Socket();
      this.socket = sock;

      // One-time handler for errors that occur before the TCP connect completes.
      const onConnectError = (err: Error) => {
        this.cleanupSocket();
        reject(err);
      };
      sock.once('error', onConnectError);

      // Persistent handlers installed after the TCP connect succeeds.
      sock.on('data', (d: Buffer) => this.handleData(d));
      sock.on('close', () => this.cleanupSocket());

      sock.connect(this.port, this.host, () => {
        // Replace the connect-time error handler with a runtime one that
        // routes errors to whatever is currently waiting.
        sock.off('error', onConnectError);
        sock.on('error', (err: Error) => this.handleSocketError(err));
        resolve();
      });
    });
  }

  private handleSocketError(err: Error): void {
    this.isError = true;
    if (this.loginReject) {
      const reject = this.loginReject;
      this.loginResolve = null;
      this.loginReject = null;
      reject(err);
    } else if (this.current) {
      this.current.reject(err);
    }
    this.cleanupSocket();
  }

  private cleanupSocket(): void {
    this.isClosed = true;
    if (this.socket) {
      this.socket.destroy();
      this.socket.removeAllListeners();
      this.socket = null;
    }
    this.buffer = '';
    this.phase = 'banner';
    this.busy = false;

    if (this.loginReject) {
      this.loginReject(new Error('Connection closed during login'));
    }
    this.loginResolve = null;
    this.loginReject = null;

    if (this.current) {
      this.current.reject(new Error('Connection closed'));
      this.current = null;
    }
    for (const pending of this.queue) {
      pending.reject(new Error('Connection closed'));
    }
    this.queue = [];
  }

  getConnectionState(): { closed: boolean; error: boolean } {
    return { closed: this.isClosed, error: this.isError };
  }

  private handleData(data: Buffer): void {
    this.buffer += stripAnsi(data.toString());
    this.processBuffer();
  }

  /**
   * Check whether the accumulated buffer contains a complete response
   * (terminated by the console prompt) and dispatch accordingly.
   */
  private processBuffer(): void {
    const match = PROMPT_RE.exec(this.buffer);
    if (!match) return;

    // Everything before the prompt is the response body.
    const response = this.buffer.slice(0, match.index);
    // Discard through the end of the prompt; keep any trailing bytes.
    this.buffer = this.buffer.slice(match.index + match[0].length);

    if (this.phase === 'banner') {
      // The initial welcome burst contains MULTIPLE prompts: first the
      // auto-login-as-guest prompt, then an advisory "Please login!" message
      // followed by a second prompt.  Consume all prompts now and only act on
      // the last one, which represents the console's actual ready state.
      //
      // Note: this.buffer was already sliced past the first prompt at line 201,
      // so search from position 0 in the current buffer for any additional prompts.
      let searchFrom = 0;
      while (true) {
        const m = PROMPT_RE.exec(this.buffer.slice(searchFrom));
        if (!m) break;
        searchFrom += m.index + m[0].length;
      }
      // Discard everything through the last prompt found.
      this.buffer = this.buffer.slice(searchFrom);
      this.phase = 'login';
      this.socket!.write(`login ${this.username} ${this.password}\r\n`);
      this.processBuffer();
      return;
    }

    if (this.phase === 'login') {
      // Login response received.
      if (ERROR_LINE_RE.test(response)) {
        const errLine = response.split(/\n|\r/).find((l) => ERROR_LINE_RE.test(l)) ?? 'Login failed';
        const err = new Error(errLine.trim());
        if (this.loginReject) this.loginReject(err);
        this.loginResolve = null;
        this.loginReject = null;
        this.cleanupSocket();
      } else {
        this.phase = 'ready';
        if (this.loginResolve) this.loginResolve();
        this.loginResolve = null;
        this.loginReject = null;
        this.processBuffer();
      }
      return;
    }

    // phase === 'ready': this is the response to the current command.
    this.deliverResponse(response);
    // Continue in case more complete responses are already buffered.
    this.processBuffer();
  }

  private deliverResponse(response: string): void {
    if (!this.current) return;

    const { cmd, resolve, reject } = this.current;
    this.current = null;
    this.busy = false;

    // Split on \n or \r, filter blanks, strip the "Executing : …" echo.
    const lines = response
      .split(/[\n\r]+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith('Executing :'));

    if (ERROR_LINE_RE.test(response)) {
      const errLine = lines.find((l) => ERROR_LINE_RE.test(l)) ?? 'Command failed';
      reject(new Error(errLine));
    } else {
      let parsed: ListParseResult | undefined;
      if (/^list\s+/i.test(cmd.trim())) {
        parsed = parseListOutput(cmd, lines);
      }
      resolve({ raw: lines, parsed });
    }

    this.flushQueue();
  }

  private flushQueue(): void {
    if (this.busy || !this.socket || this.phase !== 'ready') return;
    const next = this.queue.shift();
    if (!next) return;
    this.busy = true;
    this.current = next;
    this.socket.write(next.cmd.trim() + '\r\n');
  }
}
