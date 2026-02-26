import { MA2Connection } from './ma2Connection.js';
import { parseListOutput, ListParseResult } from './parser.js';
import type { MA2ObjectType } from './objectTypes.js';
import type { MA2FunctionKeyword } from './functionKeywords.js';
import { MA2_FUNCTION_KEYWORDS } from './functionKeywords.js';
import type { MA2PredefinedVariable } from './predefinedVariables.js';
import { MA2_PREDEFINED_VARIABLES } from './predefinedVariables.js';

// This module instantiates a single MA2Connection instance and exposes
// helper functions that can be registered as MCP tools.  It intentionally
// does not start a server on its own; an external bootstrap script can
// import these functions and register them with whatever RPC or HTTP
// framework is in use.

const connection = new MA2Connection();

/**
 * Execute a single grandMA2 command.  If the command begins with
 * `List`, the returned object will contain a `parsed` property with
 * structured data.  Otherwise the raw lines are returned under
 * `lines`.
 */
export async function exec(command: string): Promise<{ raw: string[]; parsed?: ListParseResult }> {
  return connection.sendCommand(command);
}

/**
 * Execute multiple grandMA2 commands in sequence.  Commands are
 * submitted in order and responses are returned in the same order.  Each
 * result includes either a `parsed` property (for `List` commands) or
 * a `lines` property with the raw output.
 */
export async function execBatch(commands: string[]): Promise<Array<{ raw?: string[]; parsed?: ListParseResult; error?: string }>> {
  const results: Array<{ raw?: string[]; parsed?: ListParseResult; error?: string }> = [];
  for (const cmd of commands) {
    try {
      const result = await connection.sendCommand(cmd);
      results.push({ raw: result.raw, parsed: result.parsed });
    } catch (err) {
      results.push({ error: err instanceof Error ? err.message : String(err) });
    }
  }
  return results;
}

export async function status(): Promise<{ connected: boolean }> {
  try {
    await connection.connect();
    // Validate env values
    const port = Number(connection['port']);
    if (!Number.isInteger(port) || port <= 0 || port > 65535) {
      throw new Error('Invalid MA2_PORT environment variable');
    }
    if (!connection['host'] || typeof connection['host'] !== 'string') {
      throw new Error('Invalid MA2_HOST environment variable');
    }
    if (!connection['username'] || typeof connection['username'] !== 'string') {
      throw new Error('Invalid MA2_USERNAME environment variable');
    }
    if (!connection['password'] || typeof connection['password'] !== 'string') {
      throw new Error('Invalid MA2_PASSWORD environment variable');
    }
    const state = connection.getConnectionState();
    if (state.closed) {
      throw new Error('Connection is closed');
    }
    if (state.error) {
      throw new Error('Connection is in error state');
    }
    return { connected: true };
  } catch (err) {
    throw err;
  }
}

export { parseListOutput };

// Re‑export the function keyword definitions so that downstream consumers can
// reference the complete set of supported verbs.  These exports are
// optional but provide symmetry with the object type definitions.
export type { MA2FunctionKeyword };
export { MA2_FUNCTION_KEYWORDS };

// Re‑export the predefined variable definitions so that downstream
// consumers can reference the complete set of supported system variables.
export type { MA2PredefinedVariable };
export { MA2_PREDEFINED_VARIABLES };

/**
 * List objects of a specific grandMA2 type.  This helper wraps the
 * underlying `exec` function and always issues a `List` command for
 * the given object type.  Additional arguments may be supplied to
 * constrain the range (e.g. `"Thru 10"`).  The returned promise
 * resolves with a `ListParseResult` containing structured rows.
 *
 * Example:
 *
 * ```ts
 * const cues = await listObjects('cue');
 * const groups = await listObjects('group', 'Thru 10');
 * ```
 *
 * If the console returns no rows, the `header` and `items` arrays
 * will be empty.  Errors from the console are propagated via
 * rejected promises.
 */
export async function listObjects(type: MA2ObjectType, args?: string): Promise<{ raw: string[]; parsed: ListParseResult }> {
  const cmd = args && args.trim().length > 0 ? `List ${type} ${args}` : `List ${type}`;
  const result = await exec(cmd);
  if (!result.parsed) {
    throw new Error(`No parsed result for command: ${cmd}`);
  }
  return { raw: result.raw, parsed: result.parsed };
}

export function close() {
  connection.close();
}