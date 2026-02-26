---
name: ma2-output-modes
description: "Describes and standardizes output modes (parsed/raw) for grandMA2 telnet agent commands. Use when testing, validating, or documenting output handling."
version: 1.0.0
---

# SK-XX — Output Modes for grandMA2 Telnet Agent

## Purpose
This skill documents the two output modes (parsed and raw) supported by the MCP server, CLI, and test scripts for grandMA2 telnet automation. Use this skill when writing, testing, or validating output handling for any command.

## Output Modes
- **Parsed**: Structured JSON output (default for List commands and batch tools)
- **Raw**: Unprocessed telnet lines (including prompt, echo, and warnings)

### Selecting Output Mode
- **CLI**: Use the `--raw` flag or the `:raw` meta-command to toggle raw output.
- **MCP server**: All tools return both `raw` and `parsed` fields in responses when available.

### Example Usage
- Parsed: `{ tool: 'ma2_exec', args: { command: 'list group' } }`
- Raw: `{ tool: 'ma2_exec', args: { command: 'list group', raw: true } }`

### Example Output
- Parsed: `{ parsed: { ... }, raw: [ ... ] }`
- Raw: `{ raw: [ ... ] }`

## References
- See AGENTS.md and README.md for full documentation.
- Test scripts: test_mcp_client.js, test_list_commands.js, test_changedest_commands.js

## Best Practices
- Always validate both output modes in tests.
- Reference this skill in test scripts instead of duplicating instructions.
