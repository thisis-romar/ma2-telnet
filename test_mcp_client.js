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
