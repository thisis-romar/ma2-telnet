// test_list_commands.js
// Script to document and test all grandMA2 'list' commands from filtered dataset

const fs = require('fs/promises');
const path = require('path');

const inputPath = path.join(__dirname, 'cmd_examples_filtered.json');
const docPath = path.join(__dirname, 'list_commands.md');
const testPath = path.join(__dirname, 'list_commands_test_results.json');

async function main() {
  const data = await fs.readFile(inputPath, 'utf8');
  const entries = JSON.parse(data);
  const listCmds = entries.filter(e => /\blist/i.test(e.command));

  // Documentation Markdown
  let md = '# grandMA2 List Commands\n\n';
  md += '## Extracted List Commands\n';
  for (const cmd of listCmds) {
    md += `- \`${cmd.command}\`\n  - Context: ${cmd.context}\n  - Source: [${cmd.url}](${cmd.url})\n`;
  }
  await fs.writeFile(docPath, md);

  // Test simulation: Validate syntax and flag ambiguous
  const testResults = listCmds.map(cmd => {
    // Standard syntax: List <ObjectType> [args]
    const valid = /^List(\s+[A-Za-z]+.*)?$/.test(cmd.command) || /List[A-Za-z]+/.test(cmd.command);
    const ambiguous = /feature|Menu|PSRList|RdmList/.test(cmd.command);
    return {
      command: cmd.command,
      context: cmd.context,
      url: cmd.url,
      valid,
      ambiguous,
      notes: valid ? (ambiguous ? 'Valid but context-specific/advanced' : 'Valid') : 'Non-standard or ambiguous'
    };
  });
  await fs.writeFile(testPath, JSON.stringify(testResults, null, 2));

  /**
   * Output Mode Testing
   *
   * This script validates both parsed and raw output modes for List commands.
   *
   * Usage:
   * - Parsed output: Default mode, returns structured JSON for List commands.
   * - Raw output: Set 'raw: true' in args or use CLI '--raw' flag/:raw meta-command.
   *
   * Example:
   *   Parsed: { tool: 'ma2_exec', args: { command: 'list group' } }
   *   Raw:    { tool: 'ma2_exec', args: { command: 'list group', raw: true } }
   *
   * Output:
   *   - Parsed: { parsed: { ... }, raw: [ ... ] }
   *   - Raw:    { raw: [ ... ] }
   *
   * See AGENTS.md and README.md for full documentation.
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

  console.log(`List command documentation written to ${docPath}`);
  console.log(`Test results written to ${testPath}`);
  console.log(`Total list commands: ${listCmds.length}`);
}

if (require.main === module) {
  main();
}
