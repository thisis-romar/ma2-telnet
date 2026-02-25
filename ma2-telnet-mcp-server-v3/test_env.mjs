// test_env.mjs
import { status } from './dist/index.js';

async function runTests() {
  let allPassed = true;

  // Backup original env
  const orig = {
    MA2_HOST: process.env.MA2_HOST,
    MA2_PORT: process.env.MA2_PORT,
    MA2_USERNAME: process.env.MA2_USERNAME,
    MA2_PASSWORD: process.env.MA2_PASSWORD
  };

  // Test missing env vars (should use defaults)
  delete process.env.MA2_HOST;
  delete process.env.MA2_PORT;
  delete process.env.MA2_USERNAME;
  delete process.env.MA2_PASSWORD;
  try {
    const s = await status();
    console.log('Missing env vars PASSED');
    console.log('Result:', JSON.stringify(s, null, 2));
  } catch (err) {
    console.error('Missing env vars FAILED');
    console.error('Error:', err instanceof Error ? err.message : String(err));
    allPassed = false;
  }

  // Test invalid env values
  process.env.MA2_PORT = 'notaport';
  try {
    await status();
    console.error('Invalid env values FAILED (should error)');
    allPassed = false;
  } catch (err) {
    console.log('Invalid env values PASSED (caught error)');
    console.log('Error:', err instanceof Error ? err.message : String(err));
  }

  // Test custom env values
  process.env.MA2_HOST = '127.0.0.1';
  process.env.MA2_PORT = '30000';
  process.env.MA2_USERNAME = 'administrator';
  process.env.MA2_PASSWORD = 'admin';
  try {
    const s2 = await status();
    console.log('Custom env values PASSED');
    console.log('Result:', JSON.stringify(s2, null, 2));
  } catch (err) {
    console.error('Custom env values FAILED');
    console.error('Error:', err instanceof Error ? err.message : String(err));
    allPassed = false;
  }

  // Restore original env
  process.env.MA2_HOST = orig.MA2_HOST;
  process.env.MA2_PORT = orig.MA2_PORT;
  process.env.MA2_USERNAME = orig.MA2_USERNAME;
  process.env.MA2_PASSWORD = orig.MA2_PASSWORD;

  if (allPassed) {
    console.log('All env tests passed.');
  } else {
    console.error('Some env tests failed.');
  }
}

runTests();
