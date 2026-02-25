// test_execBatch.mjs
import { execBatch } from './dist/index.js';

async function runTests() {
  const tests = [
    {
      name: 'All valid commands',
      cmds: ['Fixture 1', 'Fixture 2'],
      expectError: false
    },
    {
      name: 'Mixed valid/invalid',
      cmds: ['Fixture 1', 'NotARealCommand'],
      expectError: true
    },
    {
      name: 'All invalid commands',
      cmds: ['NotARealCommand', ''],
      expectError: true
    }
  ];

  let allPassed = true;
  for (const t of tests) {
    try {
      const result = await execBatch(t.cmds);
      if (t.expectError && !result.errors) {
        console.error(`Test: ${t.name} FAILED (expected error, got result)`);
        allPassed = false;
      } else if (!t.expectError && result.errors) {
        console.error(`Test: ${t.name} FAILED (unexpected error)`);
        console.error('Errors:', JSON.stringify(result.errors, null, 2));
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
    console.log('All execBatch tests passed.');
  } else {
    console.error('Some execBatch tests failed.');
  }
}

runTests();
