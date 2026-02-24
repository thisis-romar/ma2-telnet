# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`ma2-telnet-mcp-server-v3` is a TypeScript library that exposes a grandMA2 lighting console's telnet CLI as callable functions intended to be registered as MCP (Model Context Protocol) tools. All source lives under `ma2-telnet-mcp-server-v3/`.

## Commands

Run from `ma2-telnet-mcp-server-v3/`:

```bash
npm run build   # compile TypeScript → dist/
npm start       # node dist/index.js  (library entry point, not the MCP server)
npm run server  # node dist/server.js (MCP stdio server)
```

After rebuilding, the MCP server registration does not need to be updated — Claude Code always spawns `dist/server.js` fresh.

There are no tests configured.

## MCP Server Registration

The server is registered in Claude Code as `ma2-telnet`:

```
claude mcp add ma2-telnet node "C:/Users/romar/MA2-Telnet/ma2-telnet-mcp-server-v3/dist/server.js"
```

Tools exposed: `ma2_exec`, `ma2_exec_batch`, `ma2_status`, `ma2_list_objects`.

## Environment Variables

`MA2Connection` reads these at construction time:

| Variable | Default | Purpose |
|---|---|---|
| `MA2_HOST` | `127.0.0.1` | Console IP address |
| `MA2_PORT` | `30000` | Console telnet port |
| `MA2_USERNAME` | `administrator` | Login username |
| `MA2_PASSWORD` | `admin` | Login password |

## Architecture

### `src/index.ts` — Public API
Exports the functions meant to be registered as MCP tools: `exec`, `execBatch`, `status`, `close`, and `listObjects`. **This module does not start a server**; an external bootstrap script imports these functions and registers them with an MCP or HTTP framework.

### `src/ma2Connection.ts` — `MA2Connection`
Manages a persistent TCP socket to the console. Commands are queued and executed **serially**.

**grandMA2 telnet protocol (observed from onPC 3.9.61):**
- Commands must be terminated with **`\r\n`** (CRLF). `\n` alone is silently ignored.
- Every response — including the login response — ends with the **command prompt**: `\r [<LayerName>]>` (e.g. `\r [Fixture]>`), optionally followed by ANSI erase codes. This prompt is the sole response terminator; there is no `OK` line.
- Response lines use `\n\r` as their line separator (reversed from standard).
- The console **ANSI-colours** all output (`\x1b[31m` for errors, `\x1b[32m` for command names, etc.). All escape sequences are stripped before parsing.
- On connect the console sends a multi-part banner: the MA2 logo, an auto-login as `guest`, the first prompt, then a "Please login!" advisory, then a **second prompt**. The login command must be sent only after the **last** prompt in this burst (scanning for all occurrences of the prompt pattern and acting on the final one).
- Login is sent automatically as `login <user> <password>\r\n` and confirmed by `Logged in as User '<name>'` in the response before the next prompt.
- Every command response begins with an `Executing : <CommandName>` echo line which is stripped from returned output.
- Errors appear as `Error : <cmd>` (coloured red) followed by `Error #<N>: <message>` on the next line, before the prompt. Detected via `/^Error #\d+:/m`.
- When a pool is empty, `List` commands return a single `WARNING, NO OBJECTS FOUND FOR LIST` advisory (not an error). The parser returns `{ header: [], items: [] }` for this case.

**Connection lifecycle:**
1. `openSocket()` — establishes TCP, installs a persistent `error` event handler.
2. `performLogin()` — waits for the last prompt in the initial banner, sends credentials, waits for the login response+prompt.
3. `sendCommand()` — queues commands; `flushQueue()` sends them one at a time once `phase === 'ready'`.
4. On socket close all queued and in-flight commands are rejected; subsequent `sendCommand` calls reconnect transparently.
5. For any command matching `/^list\s+/i`, `parseListOutput` is called and the result is returned as the `parsed` property alongside `raw` lines.

### `src/parser.ts` — `parseListOutput`
Parses grandMA2 `List` command output (a header row + data rows) into a `ListParseResult`:
- `type`: the `MA2ObjectType` extracted from the command (lowercased first token after `List`); falls back to `'destination'` for unknown types.
- `header`: column names from the first non-empty line.
- `items`: array of `Record<string, string | null>` — each row mapped to its header keys. Extra columns beyond the header are stored under numeric string keys.
- If the first non-empty line matches `/NO OBJECTS FOUND/i` (the console's empty-pool advisory), returns `{ header: [], items: [] }` immediately.

Column splitting handles double-quoted strings as single tokens.

### `src/objectTypes.ts` — `MA2ObjectType`
TypeScript string literal union and runtime array (`MA2_OBJECT_TYPES`) of all grandMA2 noun keywords (e.g. `'cue'`, `'group'`, `'fixture'`). Used by the parser to validate list types.

### `src/functionKeywords.ts` — `MA2FunctionKeyword`
TypeScript union and runtime array (`MA2_FUNCTION_KEYWORDS`) of all grandMA2 verb keywords (e.g. `'store'`, `'record'`, `'goto'`). Exported for downstream consumers.

### `src/predefinedVariables.ts` — `MA2PredefinedVariable`
TypeScript union and runtime array (`MA2_PREDEFINED_VARIABLES`) of console system variables without the leading `$` (e.g. `'TIME'`, `'SHOWFILE'`). Exported for downstream consumers.
