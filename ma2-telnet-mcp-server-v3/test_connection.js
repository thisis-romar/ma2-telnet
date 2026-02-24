// test_connection.js
import { MA2Connection } from './src/ma2Connection.js';

async function testConnection() {
  const conn = new MA2Connection();
  try {
    await conn.openSocket();
    await conn.performLogin();
    const status = await conn.getStatus();
    console.log('Connection status:', status);
    await conn.close();
    console.log('Connection test passed.');
  } catch (err) {
    console.error('Connection test failed:', err instanceof Error ? err.message : String(err));
  }
}

testConnection();
