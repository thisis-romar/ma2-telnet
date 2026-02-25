import readline from 'readline';
import { exec, status, close, execBatch, listObjects } from './index.js';

// Simple log utility
const LOG_LEVEL = process.env.MA2_LOG_LEVEL || 'info';
function log(level: 'error' | 'info' | 'debug', msg: string) {
  if (['error', 'info', 'debug'].indexOf(level) === -1) return;
  if (level === 'debug' && LOG_LEVEL !== 'debug') return;
  if (level === 'info' && LOG_LEVEL === 'error') return;
  // Redact credentials
  msg = msg.replace(/(admin|administrator|password|MA2_PASSWORD|MA2_USERNAME)\s*[:=]\s*\S+/gi, '[REDACTED]');
  console[level === 'error' ? 'error' : 'log'](`[${level.toUpperCase()}] ${msg}`);
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'MA2> '
  });

  log('info', 'Welcome to MA2 Interactive CLI. Type :help for commands.');
  rl.prompt();

  rl.on('line', async (line) => {
    const cmd = line.trim();
    if (!cmd) {
      rl.prompt();
      return;
    }
    try {
      if (cmd.startsWith(':')) {
        // Meta-commands
        if (cmd === ':help') {
          log('info', 'Commands:');
          log('info', '  <MA2 command>        Send command to console');
          log('info', '  :status              Show connection status');
          log('info', '  :close               Close connection');
          log('info', '  :batch <cmds>        Run multiple commands (comma separated)');
          log('info', '  :list <type> [args]  List objects of type');
          log('info', '  :exit                Exit CLI');
        } else if (cmd === ':status') {
          const s = await status();
          log('info', JSON.stringify(s, null, 2));
        } else if (cmd === ':close') {
          await close();
          log('info', 'Connection closed.');
        } else if (cmd.startsWith(':batch ')) {
          const cmds = cmd.slice(7).split(',').map(s => s.trim()).filter(Boolean);
          const res = await execBatch(cmds);
          log('info', JSON.stringify(res, null, 2));
        } else if (cmd.startsWith(':list ')) {
          const [type, ...args] = cmd.slice(6).split(' ');
          const res = await listObjects(type as any, args.join(' '));
          log('info', JSON.stringify(res, null, 2));
        } else if (cmd === ':exit') {
          rl.close();
        } else {
          log('error', 'Unknown meta-command. Type :help for list.');
        }
      } else {
        // MA2 command
        const result = await exec(cmd);
        log('info', JSON.stringify(result, null, 2));
      }
    } catch (err) {
      log('error', err instanceof Error ? err.message : String(err));
    }
    rl.prompt();
  });

  rl.on('close', () => {
    log('info', 'Exiting MA2 CLI.');
    process.exit(0);
  });
}

main().catch((err) => {
  log('error', 'Fatal: ' + (err instanceof Error ? err.message : String(err)));
  process.exit(1);
});
