# AGENTS.md


## Interface Options

| Interface         | Usage                        | Features                                  |
|-------------------|-----------------------------|-------------------------------------------|
| MCP stdio server  | Claude, Cursor, MCP agents  | Structured JSON commands, tool registration|
| CLI REPL          | `ma2-repl`, `npm run repl`  | Interactive command input, meta-commands   |
| Node.js API       | Custom scripts via index.ts | Programmatic automation, batch ops         |
| Direct telnet     | Raw telnet client            | Manual testing (not recommended for automation) |

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
- Set MA2_LOG_LEVEL environment variable to 'info', 'debug', or 'error' for CLI logging control.
- Credentials and sensitive info are redacted in logs.

## Troubleshooting
- If you see empty output, check environment variables and console connection.
- Use `print_env.js` to verify MA2_HOST, MA2_PORT, MA2_USERNAME, MA2_PASSWORD.
- Confirm grandMA2 console is running and reachable on the specified port.
- Review logs in CLI, terminal, and console for errors or feedback.

## Scripting
- You can use custom Node.js scripts via `src/index.ts` for automation and batch operations.

---
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
