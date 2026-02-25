# Telnet MCP Project Snapshot

## Directory Structure

```
ma2-telnet-mcp-server-v3/
├── dist/                  # Compiled JS output
├── node_modules/          # npm dependencies
├── package-lock.json      # npm lock file
├── package.json           # Project metadata and scripts
├── print_env.js           # Script to print environment variables
├── src/                   # TypeScript source files
│   ├── functionKeywords.ts
│   ├── index.ts
│   ├── ma2Connection.ts
│   ├── objectTypes.ts
│   ├── parser.ts
│   ├── predefinedVariables.ts
│   └── server.ts
├── test_login_exec.js     # Script for MCP login and command testing
├── test_ma2.mjs           # Additional test script
├── tsconfig.json          # TypeScript config
```

## Key Files
- **src/server.ts**: MCP stdio server entry point
- **src/index.ts**: Public API (exec, execBatch, status, close, listObjects)
- **src/ma2Connection.ts**: TCP connection, login handshake, command queue
- **src/parser.ts**: List command output parser
- **test_login_exec.js**: Script for testing login and command execution
- **print_env.js**: Script for environment variable validation

## Status
- Environment variables confirmed settable via print_env.js
- MCP server and test scripts present
- Directory structure matches project documentation

---

_Last snapshot: 2026-02-24_
