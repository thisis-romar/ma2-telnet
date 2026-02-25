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
export async function exec(command: string): Promise<{ lines?: string[]; parsed?: ListParseResult }> {
  const { raw, parsed } = await connection.sendCommand(command);
  if (parsed) {
    return { parsed };
  }
  return { lines: raw };
}

/**
 * Execute multiple grandMA2 commands in sequence.  Commands are
 * submitted in order and responses are returned in the same order.  Each
 * result includes either a `parsed` property (for `List` commands) or
 * a `lines` property with the raw output.
 */
export async function execBatch(commands: string[]): Promise<Array<{ lines?: string[]; parsed?: ListParseResult; error?: string }>> {
  const results: Array<{ lines?: string[]; parsed?: ListParseResult; error?: string }> = [];
  for (const cmd of commands) {
    try {
      const { raw, parsed } = await connection.sendCommand(cmd);
      if (parsed) {
        results.push({ parsed });
      } else {
        results.push({ lines: raw });
      }
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
    if (!connection['socket'] || connection['socket'].destroyed) {
      throw new Error('Connection is closed');
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
export async function listObjects(type: MA2ObjectType, args?: string): Promise<ListParseResult> {
  // Build the List command.  Avoid trailing whitespace when args is
  // undefined or empty.
  const cmd = args && args.trim().length > 0 ? `List ${type} ${args}` : `List ${type}`;
  const { parsed } = await exec(cmd);
  // If parsing failed (e.g. because the command was not recognized), throw an error.
  if (!parsed) {
    throw new Error(`No parsed result for command: ${cmd}`);
  }
  return parsed;
}

export function close() {
  connection.close();
}