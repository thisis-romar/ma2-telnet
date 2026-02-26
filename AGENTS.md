---
name: ma2-telnet
description: MCP server and TypeScript library exposing grandMA2 console command-line control over Telnet to AI agents and MCP clients.
version: 1.1.0
---

# ma2-telnet — Agent Instructions

## Interface Options

| Interface        | Usage                       | Features                                        |
|------------------|-----------------------------|-------------------------------------------------|
| MCP stdio server | Claude, Cursor, MCP agents  | Structured JSON commands, tool registration     |
| CLI REPL         | `ma2-repl`, `npm run repl`  | Interactive command input, meta-commands         |
| Node.js API      | Custom scripts via index.ts | Programmatic automation, batch ops              |
| Direct telnet    | Raw telnet client           | Manual testing (not recommended for automation) |

## Build & Test

```bash
cd ma2-telnet-mcp-server-v3
npm install          # installs zod + all deps
npm run build        # tsc → dist/
npm test             # runs tests/*.mjs
npm run server       # start MCP server (stdio)
npm run repl         # interactive CLI (port 30000)
```

## Output Modes

Both the MCP server and CLI support two output modes for all commands:

- **Parsed**: Structured JSON output (default for List commands)
- **Raw**: Unprocessed telnet lines (including prompt, echo, and warnings)

**CLI**: Append `--raw` to any command, or use the `:raw <command>` meta-command.
**MCP server**: All tools return both `raw` and `parsed` fields in responses when available.

```jsonc
{
  "raw": ["Executing : List World", "World 1 Full", ">"],
  "parsed": { "type": "world", "header": ["No.", "Name", "Info"], "items": [{...}] }
}
```

## MCP stdio Server (JSON-RPC 2.0)

The server communicates over stdin/stdout using JSON-RPC 2.0 (one JSON object per line).
stderr carries diagnostics only.

### Start

```bash
cd ma2-telnet-mcp-server-v3
npm run server                    # node dist/server.js
```

Env vars (or defaults): MA2_HOST=127.0.0.1  MA2_PORT=30000  MA2_USERNAME=administrator  MA2_PASSWORD=admin

### Handshake (required before any tool call)

```text
→ {"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}
← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2024-11-05","capabilities":{"tools":{}},"serverInfo":{"name":"ma2-telnet","version":"3.0.0"}}}
→ {"jsonrpc":"2.0","method":"notifications/initialized"}
```

After the initialized notification, the server accepts `tools/list` and `tools/call`.

### Tool Calls

#### ma2_exec — single command

```text
→ {"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"ma2_exec","arguments":{"command":"List Group"}}}
← {"jsonrpc":"2.0","id":2,"result":{"content":[{"type":"text","text":"{\"raw\":[...],\"parsed\":{\"type\":\"group\",\"header\":[\"No\",\"Name\",...],\"items\":[...]}}"}]}}
```

#### ma2_exec_batch — multiple commands

```text
→ {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"ma2_exec_batch","arguments":{"commands":["Store Group 5","Label Group 5 \"Front Wash\""]}}}
← {"jsonrpc":"2.0","id":3,"result":{"content":[{"type":"text","text":"[{\"raw\":[...],\"parsed\":null},{\"raw\":[...],\"parsed\":null}]"}]}}
```

#### ma2_status — connection check

```text
→ {"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"ma2_status","arguments":{}}}
← {"jsonrpc":"2.0","id":4,"result":{"content":[{"type":"text","text":"{\"connected\":true}"}]}}
```

#### ma2_list_objects — typed list with structured parse

```text
→ {"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"ma2_list_objects","arguments":{"type":"fixture","args":"Thru 10"}}}
← {"jsonrpc":"2.0","id":5,"result":{"content":[{"type":"text","text":"{\"raw\":[...],\"parsed\":{\"type\":\"fixture\",\"header\":[...],\"items\":[...]}}"}]}}
```

Valid types: cue, group, fixture, sequence, executor, macro, effect, preset, timecode, page, ... (see src/objectTypes.ts for all)

### Response Shape

All tools return: `{ content: [{ type: "text", text: "<JSON string>" }] }`

The `text` field is a JSON-stringified payload (double-encoded):

- **ma2_exec / ma2_list_objects**: `{ raw: string[], parsed: { type, header, items } | null }`
- **ma2_exec_batch**: `[{ raw: string[], parsed: ... | null }, ...]`
- **ma2_status**: `{ connected: boolean }`

`parsed` is populated only for List commands; null otherwise.

### Quick-test with pipe (no MCP client needed)

```bash
printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}\n{"jsonrpc":"2.0","method":"notifications/initialized"}\n{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"ma2_status","arguments":{}}}\n' \
  | node dist/server.js 2>/dev/null
```

## Interactive CLI

```bash
npm run repl
# or
ma2-repl
```

### Meta-Commands

- `<MA2 command>` — Send command to console (append `--raw` for raw output)
- `:status` — Show connection status
- `:close` — Close connection
- `:batch <cmds>` — Run multiple commands (comma separated)
- `:list <type> [args] [--raw]` — List objects of type
- `:raw <command>` — Send command and show raw telnet output
- `:help` — Show help
- `:exit` — Exit CLI

### Example Session

```text
MA2> Fixture 1 thru
MA2> :status
MA2> :batch Version, List World
MA2> :list fixture
MA2> :raw List Group
MA2> :exit
```

## grandMA2 Telnet Protocol (CRITICAL)

- **PORT**: `30000` (command access), `30001` (read-only System Monitor)
- **ENABLE**: Setup → Console → Global Settings → Telnet → Login Enabled
- **CRLF**: ALL commands MUST end with `\r\n` — console ignores `\n`-only
- **LOGIN**: Wait for SECOND prompt before sending:

  ```text
  Login "username" "password"\r\n
  ```

- **PROMPT DETECTION**: Response complete when `[Context]>` received
- **ANSI**: Strip all ANSI escape codes from responses before parsing
- **ECHO**: Ignore `Executing : CommandName` first line in every response
- **EMPTY LIST**: `WARNING, NO OBJECTS FOUND FOR LIST` = empty result, not error

## Export / Import (CRITICAL — file operations)

**Syntax:**

```text
Export [Object-list] ["filename"] / [option]=[value]
Import "filename" [At Object] / [option]=[value]
```

- **Drive selection**: `SelectDrive 1` (internal) or `SelectDrive 4` (USB stick 1) — run before any Export/Import to/from USB
- **Path on onPC**: `C:\ProgramData\MA Lighting Technologies\grandMA\gma2_V_3.x\importexport`
- **Restriction**: FixtureTypes can ONLY be imported inside EditSetup context

**Examples:**

```text
Export Group 1 Thru 4 "Front_groups"
Export Macro 1 Thru 10 "mymacros"
Import "mymacros.xml" At Macro 20
SelectDrive 4 / Export Sequence 1 "Main_seq" / SelectDrive 1
```

## Macro Creation via Telnet (3-step pattern)

> **CRITICAL WARNING**: `Record Macro N Please` enters hardware key-recording mode.
> Console waits for PHYSICAL key presses — NOT telnet stream input.
> Using `Record Macro` from a telnet agent session will:
>
> - Execute and return an `Executing: Record` confirmation
> - Leave the console in recording mode, unresponsive to telnet
> - Require physical operator intervention to recover

ALWAYS use the Store + Assign pattern for telnet macro creation:

```text
Store Macro 1.[id]
Store Macro 1.[id].[line]
Assign Macro 1.[id].[line] /CMD="command text"
```

**Correct pattern** (3 commands per macro line):

1. `Store Macro 1.[id]` — create pool object
2. `Store Macro 1.[id].[line]` — create line slot
3. `Assign Macro 1.[id].[line] /CMD="command"` — set content
4. `Label Macro [id] "My Macro Name"` — optional label

**Example** — create Macro 5 with 2 lines:

```text
Store Macro 1.5
Store Macro 1.5.1
Store Macro 1.5.2
Assign Macro 1.5.1 /CMD="Go Executor 1"
Assign Macro 1.5.2 /CMD="SaveShow"
Label Macro 5 "ShowStart"
```

## Environment Variables

MA2_HOST / MA2_PORT (default 30000) / MA2_USERNAME / MA2_PASSWORD

## Logging

Set `MA2_LOG_LEVEL` to `info`, `debug`, or `error` for CLI logging control.
Credentials and sensitive info are redacted in logs automatically.

## Testing

- `tests/test_all_commands.js` — Full command suite validation
- `tests/test_list_commands.js` — List command parsing
- `tests/test_changedest_commands.js` — ChangeDest command coverage
- `print_env.js` — Verify environment variable configuration

## Troubleshooting

- Empty output → check env vars (`print_env.js`) and console reachability
- Confirm grandMA2 console is running on the specified host/port
- Review CLI logs (set `MA2_LOG_LEVEL=debug` for verbose output)

## Packaging

package.json exposes two binaries:

- `ma2-mcp` → `dist/server.js` (MCP stdio server)
- `ma2-repl` → `dist/cli.js` (interactive CLI)

## Scripting (Node.js API)

Import functions directly from `src/index.ts` for programmatic automation:

```typescript
import { exec, execBatch, status, listObjects, close } from './index.js';
```

## Agent Skills (progressive disclosure)

### Core (start here)

- `skills/ma2-connection/SKILL.md` — Connection & session management
- `skills/ma2-commands/SKILL.md` — Command syntax & keywords

### Operations

- `skills/ma2-cues/SKILL.md` — Cue management
- `skills/ma2-executors/SKILL.md` — Executor control
- `skills/ma2-macros/SKILL.md` — Macros & automation
- `skills/ma2-effects/SKILL.md` — Effects programming
- `skills/ma2-timecode/SKILL.md` — Timecode integration

### Data & Configuration

- `skills/ma2-groups/SKILL.md` — Group management
- `skills/ma2-group-bulk/SKILL.md` — Bulk group operations
- `skills/ma2-presets/SKILL.md` — Preset management
- `skills/ma2-patch/SKILL.md` — DMX patching
- `skills/ma2-export-import/SKILL.md` — Export/Import & file operations
- `skills/ma2-backup/SKILL.md` — Backup operations
- `skills/ma2-output-modes/SKILL.md` — Raw vs parsed output selection
