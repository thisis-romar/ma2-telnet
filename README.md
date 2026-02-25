# ma2-telnet

> MCP server that bridges Claude to a grandMA2 lighting console over telnet — execute commands, batch operations, and query structured show data directly from Claude.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=nodedotjs&logoColor=white)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.27-blueviolet)
![grandMA2](https://img.shields.io/badge/grandMA2-onPC_3.9-FFD700?logoColor=black)
![License](https://img.shields.io/badge/license-Apache_2.0-blue)

---

## Overview

`ma2-telnet` exposes the grandMA2 command-line interface as four [Model Context Protocol](https://modelcontextprotocol.io) tools, letting Claude issue lighting commands, read show state, and query structured object lists in natural conversation.

```
Claude ──MCP stdio──► ma2-telnet server ──TCP 30000──► grandMA2 console / onPC
```

The server handles the full telnet handshake — initial banner, dual-prompt sequence, login — and normalises the console's ANSI-coloured, CRLF-terminated output into clean JSON before returning it to Claude.

---

## Table of Contents

- [Tools](#tools)
- [Installation](#installation)
- [Configuration](#configuration)
- [Registering with Claude Code](#registering-with-claude-code)
- [Protocol Notes](#protocol-notes)
- [Project Structure](#project-structure)
- [Development](#development)

---



## Interface Options

| Interface         | Usage                        | Features                                  |
|-------------------|-----------------------------|-------------------------------------------|
| MCP stdio server  | Claude, Cursor, MCP agents  | Structured JSON commands, tool registration|
| CLI REPL          | `ma2-repl`, `npm run repl`  | Interactive command input, meta-commands   |
| Node.js API       | Custom scripts via index.ts | Programmatic automation, batch ops         |
| Direct telnet     | Raw telnet client            | Manual testing (not recommended for automation) |

## Tools

| Tool | Description |
|---|---|
| `ma2_exec` | Execute a single grandMA2 command. `List` commands return structured parsed output; all others return raw lines. |
| `ma2_exec_batch` | Execute multiple commands in sequence and return all results in order. Aborts on the first error. |
| `ma2_status` | Check whether the TCP connection to the console is established. |
| `ma2_list_objects` | Run `List <type> [args]` and return a typed, structured table of objects. |

## Interactive CLI

`ma2-repl` provides a human-facing REPL for direct MA2 command input and meta-commands:

### Usage

```
npm run repl
# or
ma2-repl
```


### CLI Meta-Commands
- `<MA2 command>`: Send command to console
- `:status`: Show connection status
- `:close`: Close connection
- `:batch <cmds>`: Run multiple commands (comma separated)
- `:list <type> [args]`: List objects of type
- `:help`: Show help
- `:exit`: Exit CLI

#### Example Usage
```
ma2-repl
MA2> Fixture 1 thru
MA2> :status
MA2> :batch Version, List World
MA2> :list fixture
MA2> :exit
```

### Troubleshooting
- If you see empty output, check environment variables and console connection.
- Use `print_env.js` to verify MA2_HOST, MA2_PORT, MA2_USERNAME, MA2_PASSWORD.
- Confirm grandMA2 console is running and reachable on the specified port.
- Review logs in CLI, terminal, and console for errors or feedback.

### Logging
- Set `MA2_LOG_LEVEL` to 'info', 'debug', or 'error' for CLI logging control.
- Credentials and sensitive info are redacted in logs.

### Testing
- Run `test_parser.js` for parser normalization.
- Run `test_connection.js` for connection state machine.

### Packaging
- `package.json` exposes two binaries:
  - `ma2-mcp`: MCP server
  - `ma2-repl`: Interactive CLI

---
For further details, see AGENTS.md and CLAUDE.md.

### `ma2_exec`

```jsonc
// Request
{ "command": "version" }

// Response
{
  "lines": [
    "Console onPC 3.9.61.1",
    "Build date is Jul 15 2025",
    "Current user is 'administrator'"
    // ...
  ]
}
```

```jsonc
// List commands return structured output instead
{ "command": "List World" }

{
  "parsed": {
    "type": "world",
    "header": ["No.", "", "Name", "", "Info"],
    "items": [{ "No.": "World", "Name": "1", "Info": "Full" }]
  }
}
```

### `ma2_exec_batch`

```jsonc
{ "commands": ["version", "List Filter", "List World"] }

// Returns an array in the same order — each entry has either "lines" or "parsed"
```

### `ma2_list_objects`

```jsonc
{ "type": "cue", "args": "Thru 10" }
// Equivalent to running: List Cue Thru 10
```

Supported `type` values include: `cue`, `sequence`, `group`, `fixture`, `fixturetype`, `macro`, `preset`, `effect`, `executor`, `page`, `world`, `filter`, `layout`, `view`, `user` and [many more](ma2-telnet-mcp-server-v3/src/objectTypes.ts).

---

## Quickstart: Sequential Workflow with Terminal Tools

### 1. Build and Start the MCP Server

```bash
cd ma2-telnet-mcp-server-v3
npm install
npm run build
npm run server  # or: node dist/server.js --repl
```

### 2. Register the MCP Server (Claude Code)

```bash
claude mcp add ma2-telnet node "C:/Users/romar/MA2-Telnet/ma2-telnet-mcp-server-v3/dist/server.js"
```

### 3. Send Commands via Terminal (Batch Example)

Create a payload file (e.g., add_and_patch_dimmer_payload.json):

```json
{
  "tool": "ma2_exec_batch",
  "args": {
    "commands": [
      "Fixture 1 Thru 10 Type Dimmer",
      "Assign DMX 1.1 Thru 1.10 At Fixture 1 Thru 10"
    ]
  }
}
```

Send it to the MCP server:

```powershell
type ma2-telnet-mcp-server-v3\add_and_patch_dimmer_payload.json | node ma2-telnet-mcp-server-v3/dist/server.js
```

### 4. Confirm Execution

For confirmation, run the server in REPL mode:

```bash
node ma2-telnet-mcp-server-v3/dist/server.js --repl
```
Type a command (e.g., `List Fixture`) and check the output.

---

## Installation

**Prerequisites:** Node.js 20+, npm

```bash
git clone https://github.com/thisis-romar/ma2-telnet.git
cd ma2-telnet/ma2-telnet-mcp-server-v3
npm install
npm run build
```

---

## Configuration

The console connection is configured via environment variables. Defaults target a local grandMA2 onPC instance.

| Variable | Default | Description |
|---|---|---|
| `MA2_HOST` | `127.0.0.1` | IP address of the grandMA2 console or onPC |
| `MA2_PORT` | `30000` | Telnet port (grandMA2 default) |
| `MA2_USERNAME` | `administrator` | Login username |
| `MA2_PASSWORD` | `admin` | Login password |

Set them before starting the server:

```bash
MA2_HOST=192.168.1.100 MA2_USERNAME=myuser MA2_PASSWORD=mypass node dist/server.js
```

Or export them in your shell profile / Claude Code MCP config.

---

## Registering with Claude Code

```bash
claude mcp add ma2-telnet node "/absolute/path/to/ma2-telnet/ma2-telnet-mcp-server-v3/dist/server.js"
```

Verify it's running:

```bash
claude mcp list
# ma2-telnet: node ... - ✓ Connected
```

Claude Code always spawns a fresh server process, so rebuilding (`npm run build`) takes effect automatically on the next conversation.

<details>
<summary>Passing environment variables to the MCP server</summary>

Use the `--env` flag when registering:

```bash
claude mcp add ma2-telnet \
  --env MA2_HOST=192.168.1.100 \
  --env MA2_USERNAME=administrator \
  --env MA2_PASSWORD=admin \
  node "/absolute/path/to/dist/server.js"
```

Or edit `~/.claude.json` directly under the `mcpServers` key.

</details>

---

## Protocol Notes

The grandMA2 telnet interface (port 30000) has several non-obvious behaviours that the connection layer handles transparently.

<details>
<summary>Full protocol details</summary>

### Line endings
Commands must be terminated with **CRLF (`\r\n`)**. A bare `\n` is silently ignored by the console — the command never executes.

### Response terminator
There is **no `OK` line**. Every response ends with the console's command prompt:
```
\r [Fixture]>
```
This prompt (with optional trailing ANSI codes) is the sole signal that a response is complete.

### Initial banner — dual prompt
On connect, the console sends:
1. The MA2 ASCII logo
2. An auto-login confirmation: `Logged in as User 'guest'`
3. **First prompt**
4. The advisory message: `Please login !`
5. **Second prompt** ← login must be sent after this one

Sending credentials after only the first prompt causes the second prompt to be mistaken for the login response, shifting all subsequent command responses by one. The connection layer scans for the **last** prompt in the initial burst before sending credentials.

### ANSI colour codes
All output is coloured: errors in red, command names in green, etc. All `\x1b[…` sequences are stripped before parsing or returning output.

### Response structure
Every command response begins with an echo line:
```
Executing : CommandName [args]
```
This line is stripped from all returned output.

### Errors
Error responses contain two lines before the prompt:
```
Error : CommandName
Error #14: OBJECT DOES NOT EXIST
```
Detected via `/^Error #\d+:/m`. The error message is thrown as a JavaScript `Error`.

### Empty pools
When a `List` command targets an empty pool, the console responds with:
```
WARNING, NO OBJECTS FOUND FOR LIST
```
This is **not** an error. The parser returns `{ header: [], items: [] }`.

</details>

---

## Project Structure

```
ma2-telnet-mcp-server-v3/
├── src/
│   ├── server.ts           # MCP stdio server entry point (4 registered tools)
│   ├── index.ts            # Public API: exec, execBatch, status, close, listObjects
│   ├── ma2Connection.ts    # TCP connection, login handshake, command queue
│   ├── parser.ts           # List command output → structured ListParseResult
│   ├── objectTypes.ts      # MA2ObjectType union + runtime array
│   ├── functionKeywords.ts # MA2FunctionKeyword union + runtime array
│   └── predefinedVariables.ts # MA2PredefinedVariable union + runtime array
├── dist/                   # Compiled JS (git-ignored)
├── package.json
└── tsconfig.json           # module: Node16, moduleResolution: Node16
```

---

## Development

```bash
cd ma2-telnet-mcp-server-v3

npm run build    # tsc — compile TypeScript → dist/
npm run server   # node dist/server.js — run MCP server directly
npm start        # node dist/index.js — library entry point (not the MCP server)
```

There are no automated tests. Use the library entry point for ad-hoc testing:

```js
// Quick smoke test
const { exec, status } = require('./dist/index.js');
status().then(console.log);          // { connected: true }
exec('version').then(r => console.log(r.lines[0]));  // Console onPC 3.9.x
```

> **Note on module resolution:** The project uses `"module": "Node16"` in `tsconfig.json` to support the MCP SDK's conditional package exports. All relative imports in source files use `.js` extensions.
