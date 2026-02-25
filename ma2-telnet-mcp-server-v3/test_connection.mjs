// test_connection.mjs
import { MA2Connection } from './dist/ma2Connection.js';

async function testConnection() {
  // Test normal connection
  const conn = new MA2Connection();
  try {
    await conn.connect();
    const status = await conn.sendCommand('status');
    console.log('Connection status:', status);
    conn.close();
    console.log('Connection test passed.');
  } catch (err) {
    console.error('Connection test failed:', err instanceof Error ? err.message : String(err));
  }

  // Test login failure
  const badConn = new MA2Connection();
  badConn.username = 'wronguser';
  badConn.password = 'wrongpass';
  try {
    await badConn.connect();
    await badConn.sendCommand('status');
    console.error('Login failure test failed: should not succeed');
  } catch (err) {
    console.log('Login failure test passed:', err instanceof Error ? err.message : String(err));
  } finally {
    badConn.close();
  }

  // Test reconnection
  const conn2 = new MA2Connection();
  try {
    await conn2.connect();
    conn2.close();
    await conn2.connect();
    const status2 = await conn2.sendCommand('status');
    console.log('Reconnection test passed.', status2);
    conn2.close();
  } catch (err) {
    console.error('Reconnection test failed:', err instanceof Error ? err.message : String(err));
    conn2.close();
  }
}

testConnection();
