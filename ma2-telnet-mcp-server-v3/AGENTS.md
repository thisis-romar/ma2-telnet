# AGENTS.md

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
- Commands:
  - <MA2 command>: Send command to console
  - :status: Show connection status
  - :close: Close connection
  - :batch <cmds>: Run multiple commands (comma separated)
  - :list <type> [args]: List objects of type
  - :help: Show help
  - :exit: Exit CLI

## Testing
- Parser/output normalization: Add tests for src/parser.ts
- State machine: Add tests for src/ma2Connection.ts
- Integration: Use test_login_exec.js for end-to-end tests

## Logging
- Set MA2_LOG_LEVEL environment variable to 'info', 'debug', or 'error' for CLI logging control.
- Credentials and sensitive info are redacted in logs.

## Packaging
- package.json exposes two binaries:
  - ma2-mcp: MCP server
  - ma2-repl: Interactive CLI

---
For further details, see README.md and CLAUDE.md.
