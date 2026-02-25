// test_status.mjs
import { status, close } from './dist/index.js';

async function runTests() {
  let allPassed = true;

  // Test status after connect
  try {
    const s = await status();
    console.log('Status after connect PASSED');
    console.log('Result:', JSON.stringify(s, null, 2));
  } catch (err) {
    console.error('Status after connect FAILED');
    console.error('Error:', err instanceof Error ? err.message : String(err));
    allPassed = false;
  }

  // Test status after close
  try {
    await close();
    const s2 = await status();
    console.error('Status after close FAILED (should error)');
    allPassed = false;
  } catch (err) {
    console.log('Status after close PASSED (caught error)');
    console.log('Error:', err instanceof Error ? err.message : String(err));
  }

  // Test status after error (simulate by closing and calling status again)
  try {
    await close();
    await status();
    console.error('Status after error FAILED (should error)');
    allPassed = false;
  } catch (err) {
    console.log('Status after error PASSED (caught error)');
    console.log('Error:', err instanceof Error ? err.message : String(err));
  }

  if (allPassed) {
    console.log('All status tests passed.');
  } else {
    console.error('Some status tests failed.');
  }
}

runTests();
