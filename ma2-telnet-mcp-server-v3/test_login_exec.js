// Test grandMA2 login and command execution via MCP server
const { exec } = require('./dist/index.js');

async function test() {
  try {
    // Print environment variables
    console.log('Environment variables:');
    console.log('MA2_HOST:', process.env.MA2_HOST);
    console.log('MA2_PORT:', process.env.MA2_PORT);
    console.log('MA2_USERNAME:', process.env.MA2_USERNAME);
    console.log('MA2_PASSWORD:', process.env.MA2_PASSWORD);

    // Test clearall command
    const clearallResult = await exec('clearall');
    console.log('Clearall command result:', JSON.stringify(clearallResult, null, 2));
  } catch (err) {
    console.error('Error:', err);
    if (err && err.stack) {
      console.error('Stack:', err.stack);
    }
  }
}

test();
