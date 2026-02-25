---

## Sequential Workflow: Using the MCP Server via Terminal

### 1. Build the Project

```bash
npm install
npm run build
```

### 2. Start the MCP Server

- For JSON payloads:
  ```bash
  npm run server
  # or: node dist/server.js
  ```
- For interactive REPL:
  ```bash
  node dist/server.js --repl
  ```

### 3. Register the MCP Server (Claude Code)

```bash
claude mcp add ma2-telnet node "C:/Users/romar/MA2-Telnet/ma2-telnet-mcp-server-v3/dist/server.js"
```

### 4. Send Batch Commands

Prepare a JSON payload (e.g., `add_and_patch_dimmer_payload.json`):

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

Send it to the server:

```powershell
type add_and_patch_dimmer_payload.json | node dist/server.js
```

### 5. Confirm Execution

- Start the server in REPL mode:
  ```bash
  node dist/server.js --repl
  ```
- Type a command (e.g., `List Fixture`) and verify the output.

---

## Notes
- Use file-based JSON payloads to avoid PowerShell quoting issues.
- If you see no output, check your environment and console connectivity.
- Use `print_env.js` to verify environment variables.
- The server must be able to reach the grandMA2 console.

---