/**
 * Simple parser for grandMA2 List command outputs.
 *
 * Many grandMA2 CLI commands produce human‑readable tables.  The `List` keyword
 * in particular prints a header row followed by one or more data rows.  This
 * module contains a generic parser that converts such output into a
 * structured representation that can be returned from the MCP server.  It
 * makes a best‑effort attempt to split columns on whitespace while
 * respecting quoted strings, then maps each data row to an object keyed by
 * the header names.
 */

// Import the type and the value separately.  `MA2ObjectType` is a
// compile‑time only type alias, whereas `MA2_OBJECT_TYPES` is a runtime
// array used to validate list types.
import type { MA2ObjectType } from './objectTypes.js';
import { MA2_OBJECT_TYPES } from './objectTypes.js';

export interface ListParseResult {
  /**
   * The object type being listed (e.g. "cue", "group", "attribute").
   */
  /**
   * The grandMA2 object type represented by this list.  Known types are
   * enumerated in {@link MA2_OBJECT_TYPES}.  If the command did not
   * specify a supported type, `'destination'` is used to indicate the
   * current pool destination.
   */
  type: MA2ObjectType;
  /**
   * Header column names extracted from the first row of the list.
   */
  header: string[];
  /**
   * List of parsed objects, keyed by the header names.  If a row has
   * fewer columns than the header, missing values will be `null`.  If
   * there are more columns than headers, the extra values will be
   * captured under numeric keys.
   */
  items: Record<string, string | null>[];
}

/**
 * Parse the output lines from a grandMA2 `List` command.
 *
 * @param command The full command string (e.g. "List Cue" or
 *                "List Group Thru 10").  This is used to determine the
 *                returned `type` value.
 * @param lines   An array of text lines returned by the console prior to
 *                the terminating "OK" line.
 */
export function parseListOutput(command: string, lines: string[]): ListParseResult {
  // Filter out blank lines.  Some versions of the software include an
  // introductory line or extraneous spacing; ignore empty rows.
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  // Determine the type of object being listed.  Anything following the
  // keyword "List" is considered the target.  If nothing follows, default
  // to "destination" which corresponds to the currently selected pool.
  let listType: MA2ObjectType = 'destination';
  const listMatch = command.trim().match(/^List\s+(.+)/i);
  if (listMatch) {
    // Use the first token after "List" as the candidate type; remove extra option
    // qualifiers (e.g. "Thru 10").  Convert to lowercase for uniformity.
    const candidate = listMatch[1].split(/\s+/)[0].toLowerCase();
    // Only accept known object types; otherwise fall back to 'destination'.
    if ((MA2_OBJECT_TYPES as readonly string[]).includes(candidate)) {
      listType = candidate as MA2ObjectType;
    }
  }
  if (nonEmpty.length === 0) {
    return { type: listType, header: [], items: [] };
  }
  // The console emits a warning line (not an error) when the requested pool is
  // empty.  Treat it as a valid empty result rather than a malformed table.
  if (/NO OBJECTS FOUND/i.test(nonEmpty[0])) {
    return { type: listType, header: [], items: [] };
  }
  // The first non‑empty row is assumed to contain column headers.  Use a
  // whitespace splitter that preserves quoted strings.
  const headerTokens = splitColumns(nonEmpty[0]);
  const items: Record<string, string | null>[] = [];
  for (let i = 1; i < nonEmpty.length; i++) {
    const row = nonEmpty[i];
    const tokens = splitColumns(row);
    const item: Record<string, string | null> = {};
    // Map each token to its header name.  If the token is missing for
    // a given column, assign null.
    for (let h = 0; h < headerTokens.length; h++) {
      const key = headerTokens[h];
      item[key] = tokens[h] !== undefined ? tokens[h] : null;
    }
    // If there are more tokens than headers, index them numerically.
    for (let extra = headerTokens.length; extra < tokens.length; extra++) {
      item[String(extra)] = tokens[extra];
    }
    items.push(item);
  }
  return { type: listType, header: headerTokens, items };
}

/**
 * Split a single row of grandMA2 CLI output into columns.
 *
 * This function treats any sequence of whitespace outside of double quotes
 * as a column separator.  Quoted fields may themselves contain spaces and
 * are returned as a single token including the quotes.  Leading and
 * trailing whitespace around tokens is trimmed.  Empty fields (two
 * separators in a row) produce an empty string entry.
 *
 * @param line A single line of text from the console.
 */
function splitColumns(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let prevWasSpace = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
      prevWasSpace = false;
    } else if (!inQuotes && /\s/.test(char)) {
      if (!prevWasSpace) {
        if (current.length > 0) {
          result.push(current);
          current = '';
        }
        prevWasSpace = true;
      }
      // Ignore consecutive whitespace
    } else {
      current += char;
      prevWasSpace = false;
    }
  }
  if (current.length > 0) {
    result.push(current);
  }
  return result;
}