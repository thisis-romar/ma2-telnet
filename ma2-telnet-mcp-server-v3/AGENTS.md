# AGENTS.md


## Interface Options

| Interface         | Usage                        | Features                                  |
|-------------------|-----------------------------|-------------------------------------------|
| MCP stdio server  | Claude, Cursor, MCP agents  | Structured JSON commands, tool registration|
| CLI REPL          | `ma2-repl`, `npm run repl`  | Interactive command input, meta-commands   |
| Node.js API       | Custom scripts via index.ts | Programmatic automation, batch ops         |
| Direct telnet     | Raw telnet client            | Manual testing (not recommended for automation) |

## Output Modes

Both the MCP server and CLI support two output modes for all commands:

- **Parsed**: Structured JSON output (default for List commands and batch tools)
- **Raw**: Unprocessed telnet lines (including prompt, echo, and warnings)

### Selecting Output Mode

- **CLI**: Use the `--raw` flag or the `:raw` meta-command to toggle raw output.
- **MCP server**: All tools return both `raw` and `parsed` fields in responses when available.

#### Example

```jsonc
{
  "raw": ["Executing : List World", "World 1 Full", ">"],
  "parsed": { "type": "world", "items": [{...}] }
}
```

## Usage

### MCP Server (Machine-facing)
- Start the MCP stdio server:
  ```
  npm run server
  # or
  ma2-mcp
  ```
- MCP tools exposed: ma2_exec, ma2_exec_batch, ma2_status, ma2_list_objects
- Environment variables:
  - MA2_HOST: Console IP address (default: 127.0.0.1)
  - MA2_PORT: Console telnet port (default: 30000)
  - MA2_USERNAME: Login username (default: administrator)
  - MA2_PASSWORD: Login password (default: admin)


### Interactive CLI (Human-facing)
- Start the CLI REPL:
  ```
  npm run repl
  # or
  ma2-repl
  ```
- CLI Meta-Commands:
  - <MA2 command>: Send command to console
  - :status: Show connection status
  - :close: Close connection
  - :batch <cmds>: Run multiple commands (comma separated)
  - :list <type> [args]: List objects of type
  - :help: Show help
  - :exit: Exit CLI

#### Example Usage
```
ma2-repl
MA2> Fixture 1 thru
MA2> :status
MA2> :batch Version, List World
MA2> :list fixture
MA2> :exit
```


## Logging

## Troubleshooting

## Scripting

---
name: ma2-telnet-mcp-server-v3
version: 1.1.0
---

# ma2-telnet-mcp-server-v3 — Agent Instructions

## Build & Test
cd ma2-telnet-mcp-server-v3
npm install          # installs zod + all deps
npm run build        # tsc → dist/
npm test             # runs tests/*.mjs
npm run server       # start MCP server (stdio)
npm run repl         # interactive CLI (port 30000)

## grandMA2 Telnet Protocol (CRITICAL)
PORT: 30000 (command access)  |  30001 (read-only System Monitor)
ENABLE: Setup → Console → Global Settings → Telnet → Login Enabled
CRLF: ALL commands MUST end with \r\n — console ignores \n-only
LOGIN: Wait for SECOND prompt before sending: Login "username" "password"\r\n
PROMPT DETECTION: Response complete when [Context]> received
ANSI: Strip all ANSI escape codes from responses before parsing
ECHO: Ignore "Executing : CommandName" first line in every response
EMPTY LIST: WARNING, NO OBJECTS FOUND FOR LIST = empty result, not error

## Macro Creation via Telnet

WARNING: Record Macro N Please enters hardware key-recording mode.
Console waits for PHYSICAL key presses — NOT telnet stream input.
Using Record Macro from a telnet agent session will:
  - Execute and return an Executing: Record confirmation
  - Leave the console in recording mode, unresponsive to telnet
  - Require physical operator intervention to recover

ALWAYS use the Store + Assign pattern for telnet macro creation:
  Store Macro 1.[id]
  Store Macro 1.[id].[line]
  Assign Macro 1.[id].[line] /CMD="command text"

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

## Environment Variables
MA2_HOST / MA2_PORT (default 30000) / MA2_USERNAME / MA2_PASSWORD

## Agent Skills (progressive disclosure)
skills/ma2-connection/SKILL.md   ← START HERE for any connection work
skills/ma2-commands/SKILL.md     ← START HERE for any command work
skills/ma2-export-import/SKILL.md ← START HERE for export/import/macros
skills/ma2-macros/SKILL.md       ← Full macro automation guide
For further details, see README.md and CLAUDE.md.

## Testing
- Parser/output normalization: Run test_parser.js for src/parser.ts
- State machine: Run test_connection.js for src/ma2Connection.ts
- Integration: Use test_login_exec.js for end-to-end tests

## Packaging
- package.json exposes two binaries:
  - ma2-mcp: MCP server
  - ma2-repl: Interactive CLI

---
For further details, see README.md and CLAUDE.md.
