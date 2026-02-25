// test_close.mjs
import { close, exec } from './dist/index.js';

async function runTests() {
  let allPassed = true;

  // Test connection closure
  try {
    await close();
    console.log('Connection closure PASSED');
  } catch (err) {
    console.error('Connection closure FAILED');
    console.error('Error:', err instanceof Error ? err.message : String(err));
    allPassed = false;
  }

  // Test repeated close
  try {
    await close();
    console.log('Repeated close PASSED');
  } catch (err) {
    console.error('Repeated close FAILED');
    console.error('Error:', err instanceof Error ? err.message : String(err));
    allPassed = false;
  }

  // Test command after close
  try {
    await close();
    await exec('Fixture 1');
    console.error('Command after close FAILED (should error)');
    allPassed = false;
  } catch (err) {
    console.log('Command after close PASSED (caught error)');
    console.log('Error:', err instanceof Error ? err.message : String(err));
  }

  if (allPassed) {
    console.log('All close tests passed.');
  } else {
    console.error('Some close tests failed.');
  }
}

runTests();
