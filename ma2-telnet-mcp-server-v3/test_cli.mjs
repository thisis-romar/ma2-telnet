// test_cli.mjs
// Automated CLI test: interactive input, meta-commands, error feedback, colored output
// Run: node test_cli.mjs

import { spawn } from 'child_process';
import stripAnsi from 'strip-ansi';

const CLI_PATH = './ma2-telnet-mcp-server-v3/dist/cli.js';

function runCliTest(commands, expectedOutputs) {
  return new Promise((resolve, reject) => {
    const cli = spawn('node', [CLI_PATH], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';
    let error = '';

    cli.stdout.on('data', (data) => {
      output += data.toString();
    });
    cli.stderr.on('data', (data) => {
      error += data.toString();
    });
    cli.on('close', (code) => {
      resolve({ output, error, code });
    });

    // Send commands
    commands.forEach(cmd => cli.stdin.write(cmd + '\n'));
    // End input
    cli.stdin.end();
  });
}

async function main() {

  // 1. Test help/meta-command
  const helpResult = await runCliTest([':help'], ['Commands:']);
  const helpPlain = stripAnsi(helpResult.output);
  console.log('Help output:', helpPlain.includes('Commands:') ? 'PASS' : 'FAIL');

  // 2. Test error feedback (invalid meta-command)
  const errorResult = await runCliTest([':notacommand'], ['Unknown meta-command']);
  const errorPlain = stripAnsi(errorResult.output);
  const errorColored = /\x1b\[31m/.test(errorResult.output); // ANSI for red
  console.log('Error output:', errorPlain.includes('Unknown meta-command') && errorColored ? 'PASS' : 'FAIL');

  // 3. Test valid MA2 command (help)
  const execResult = await runCliTest(['help'], ['help']);
  const execPlain = stripAnsi(execResult.output);
  console.log('Exec output:', execPlain.includes('help') ? 'PASS' : 'FAIL');

  // 4. Test colored output (success/info)
  const successColored = /\x1b\[32m/.test(execResult.output) || /\x1b\[34m/.test(execResult.output); // ANSI green or blue
  console.log('Success color:', successColored ? 'PASS' : 'FAIL');

  // 5. Test multiple commands
  const batchResult = await runCliTest([':help', ':notacommand', 'help'], []);
  const batchPlain = stripAnsi(batchResult.output);
  const batchErrorColored = /\x1b\[31m/.test(batchResult.output);
  const batchSuccessColored = /\x1b\[32m/.test(batchResult.output) || /\x1b\[34m/.test(batchResult.output);
  console.log('Batch output:', batchPlain.includes('Commands:') && batchPlain.includes('Unknown meta-command') && batchPlain.includes('help') ? 'PASS' : 'FAIL');
  console.log('Batch error color:', batchErrorColored ? 'PASS' : 'FAIL');
  console.log('Batch success color:', batchSuccessColored ? 'PASS' : 'FAIL');
}

main();
