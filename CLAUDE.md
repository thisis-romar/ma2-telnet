npm start       # node dist/index.js  (library entry point, not the MCP server)
npm run server  # node dist/server.js (MCP stdio server)

# CLAUDE.md

## Hook Method: Project Context

This file is a pointer for Claude Code agents. For full project context, protocol quirks, build/test instructions, and agent skills, see:

**[AGENTS.md](AGENTS.md)**

## Claude Code Section

Claude Code users should register the MCP server as follows:

```
claude mcp add ma2-telnet node "C:/Users/romar/MA2-Telnet/ma2-telnet-mcp-server-v3/dist/server.js"
```

For detailed agent skills and operational caveats, always consult AGENTS.md.
