// test_exec.mjs
import { exec } from './dist/index.js';

async function runTests() {
  const tests = [
    {
      name: 'Valid command',
      cmd: 'Fixture 1 Thru 2',
      expectError: false
    },
    {
      name: 'Invalid command',
      cmd: 'NotARealCommand',
      expectError: true
    },
    {
      name: 'Empty command',
      cmd: '',
      expectError: true
    }
  ];

  let allPassed = true;
  for (const t of tests) {
    try {
      const result = await exec(t.cmd);
      if (t.expectError) {
        console.error(`Test: ${t.name} FAILED (expected error, got result)`);
        allPassed = false;
      } else {
        console.log(`Test: ${t.name} PASSED`);
        console.log('Result:', JSON.stringify(result, null, 2));
      }
    } catch (err) {
      if (t.expectError) {
        console.log(`Test: ${t.name} PASSED (caught error)`);
        console.log('Error:', err instanceof Error ? err.message : String(err));
      } else {
        console.error(`Test: ${t.name} FAILED (unexpected error)`);
        console.error('Error:', err instanceof Error ? err.message : String(err));
        allPassed = false;
      }
    }
  }
  if (allPassed) {
    console.log('All exec tests passed.');
  } else {
    console.error('Some exec tests failed.');
  }
}

runTests();
