// Simple MCP client for testing ma2-telnet server
const { spawn } = require('child_process');

const proc = spawn('node', ['ma2-telnet-mcp-server-v3/dist/server.js'], {
  stdio: ['pipe', 'pipe', 'inherit']
});

proc.stdout.on('data', (data) => {
  console.log('Server output:', data.toString());
});

const mcpRequest = JSON.stringify({ tool: 'ma2_exec', args: { command: 'list group' } }) + '\n';
proc.stdin.write(mcpRequest);

setTimeout(() => {
  proc.stdin.end();
  proc.kill();
}, 2000);

/**
 * Output Modes Testing
 *
 * For output mode details, usage, and examples, see:
 *   skills/ma2-output-modes/SKILL.md
 *
 * This script validates both parsed and raw output modes for key commands.
 */

// Test both output modes for 'list group' command
const testRawParsed = async () => {
  const { spawn } = require('child_process');

  // Test parsed output (default)
  const procParsed = spawn('node', ['ma2-telnet-mcp-server-v3/dist/server.js'], {
    stdio: ['pipe', 'pipe', 'inherit']
  });
  procParsed.stdout.on('data', (data) => {
    console.log('Parsed output:', data.toString());
  });
  const parsedRequest = JSON.stringify({ tool: 'ma2_exec', args: { command: 'list group' } }) + '\n';
  procParsed.stdin.write(parsedRequest);
  setTimeout(() => {
    procParsed.stdin.end();
    procParsed.kill();
  }, 2000);

  // Test raw output (explicit)
  const procRaw = spawn('node', ['ma2-telnet-mcp-server-v3/dist/server.js'], {
    stdio: ['pipe', 'pipe', 'inherit']
  });
  procRaw.stdout.on('data', (data) => {
    console.log('Raw output:', data.toString());
  });
  const rawRequest = JSON.stringify({ tool: 'ma2_exec', args: { command: 'list group', raw: true } }) + '\n';
  procRaw.stdin.write(rawRequest);
  setTimeout(() => {
    procRaw.stdin.end();
    procRaw.kill();
  }, 2000);
};

testRawParsed();
