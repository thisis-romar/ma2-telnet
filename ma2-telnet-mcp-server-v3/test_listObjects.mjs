// test_listObjects.mjs
import { listObjects } from './dist/index.js';

const objectTypes = [
  'cue', 'group', 'fixture', 'attribute', 'macro', 'sequence', 'preset', 'view', 'executor', 'destination'
];

async function runTests() {
  let allPassed = true;

  // Test listing all supported object types
  for (const type of objectTypes) {
    try {
      const res = await listObjects(type);
      console.log(`List ${type} PASSED`);
      console.log('Result:', JSON.stringify(res, null, 2));
    } catch (err) {
      console.error(`List ${type} FAILED`);
      console.error('Error:', err instanceof Error ? err.message : String(err));
      allPassed = false;
    }
  }

  // Test empty pool (simulate with unlikely type)
  try {
    const res = await listObjects('emptytype');
    if (res.items && res.items.length === 0) {
      console.log('Empty pool PASSED');
    } else {
      console.error('Empty pool FAILED');
      allPassed = false;
    }
  } catch (err) {
    console.log('Empty pool PASSED (caught error)');
    console.log('Error:', err instanceof Error ? err.message : String(err));
  }

  // Test malformed command
  try {
    await listObjects('');
    console.error('Malformed command FAILED (should error)');
    allPassed = false;
  } catch (err) {
    console.log('Malformed command PASSED (caught error)');
    console.log('Error:', err instanceof Error ? err.message : String(err));
  }

  if (allPassed) {
    console.log('All listObjects tests passed.');
  } else {
    console.error('Some listObjects tests failed.');
  }
}

runTests();
