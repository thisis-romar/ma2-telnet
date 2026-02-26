---
name: ma2-telnet
description: MCP server and TypeScript library exposing grandMA2 console command-line control over Telnet to AI agents and MCP clients.
version: 1.1.0
---

# ma2-telnet — Agent Instructions

## Build & Test
cd ma2-telnet-mcp-server-v3
npm install          # installs zod + all deps
npm run build        # tsc → dist/
npm test             # runs tests/*.mjs
npm run server       # start MCP server (stdio)
npm run repl         # interactive CLI (port 30000)

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

## grandMA2 Telnet Protocol (CRITICAL)
PORT: 30000 (command access)  |  30001 (read-only System Monitor)
ENABLE: Setup → Console → Global Settings → Telnet → Login Enabled
CRLF: ALL commands MUST end with \r\n — console ignores \n-only
LOGIN: Wait for SECOND prompt before sending: Login "username" "password"\r\n
PROMPT DETECTION: Response complete when [Context]> received
ANSI: Strip all ANSI escape codes from responses before parsing
ECHO: Ignore "Executing : CommandName" first line in every response
EMPTY LIST: WARNING, NO OBJECTS FOUND FOR LIST = empty result, not error

## Export / Import (CRITICAL — file operations)
SYNTAX:  Export [Object-list] ["filename"] / [option]=[value]
         Import "filename" [At Object] / [option]=[value]
DRIVE:   SelectDrive 1 (internal) | SelectDrive 4 (USB stick 1)
         Use SelectDrive before any Export/Import to/from USB
PATH onPC: C:\ProgramData\MA Lighting Technologies\grandMA\gma2_V_3.x\importexport
RESTRICTION: FixtureTypes can ONLY be imported inside EditSetup context
EXAMPLES:
  Export Group 1 Thru 4 "Front_groups"
  Export Macro 1 Thru 10 "mymacros"
  Import "mymacros.xml" At Macro 20
  SelectDrive 4 / Export Sequence 1 "Main_seq" / SelectDrive 1

## Macro Creation via Telnet (3-step pattern)

⚠️  CRITICAL WARNING: Record Macro N Please enters hardware key-recording mode.
Console waits for PHYSICAL key presses — NOT telnet stream input.
Using Record Macro from a telnet agent session will:
  - Execute and return an Executing: Record confirmation
  - Leave the console in recording mode, unresponsive to telnet
  - Require physical operator intervention to recover

ALWAYS use the Store + Assign pattern for telnet macro creation:
  Store Macro 1.[id]
  Store Macro 1.[id].[line]
  Assign Macro 1.[id].[line] /CMD="command text"

CORRECT PATTERN (3 commands per macro line):
  1. Store Macro 1.[id]                          (create pool object)
  2. Store Macro 1.[id].[line]                   (create line slot)
  3. Assign Macro 1.[id].[line] /CMD="command"   (set content)
  4. Label Macro [id] "My Macro Name"            (optional label)

EXAMPLE — create Macro 5 with 2 lines:
  Store Macro 1.5
  Store Macro 1.5.1
  Store Macro 1.5.2
  Assign Macro 1.5.1 /CMD="Go Executor 1"
  Assign Macro 1.5.2 /CMD="SaveShow"
  Label Macro 5 "ShowStart"

## Environment Variables
MA2_HOST / MA2_PORT (default 30000) / MA2_USERNAME / MA2_PASSWORD

## Agent Skills (progressive disclosure)
skills/ma2-connection/SKILL.md   ← START HERE for any connection work
skills/ma2-commands/SKILL.md     ← START HERE for any command work
skills/ma2-export-import/SKILL.md ← START HERE for export/import/macros
skills/ma2-macros/SKILL.md       ← Full macro automation guide
