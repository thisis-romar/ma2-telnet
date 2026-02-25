import { exec, execBatch, status, listObjects, close } from './dist/index.js';

async function run() {
  console.log('=== MA2 Full Test ===\n');

  // 1. Status
  try {
    const s = await status();
    console.log('STATUS:', JSON.stringify(s, null, 2));
  } catch(e) { console.log('STATUS ERROR:', e.message); }

  // 2. Version
  try {
    const v = await exec('Version');
    console.log('VERSION:', JSON.stringify(v, null, 2));
  } catch(e) { console.log('VERSION ERROR:', e.message); }

  // 3. Login Kromar
  try {
    const l = await exec('Login "Kromar"');
    console.log('LOGIN:', JSON.stringify(l, null, 2));
  } catch(e) { console.log('LOGIN ERROR:', e.message); }

  // 4. List Cue
  try {
    const lc = await listObjects('List Cue');
    console.log('LIST CUE:', JSON.stringify(lc, null, 2));
  } catch(e) { console.log('LIST CUE ERROR:', e.message); }

  // 5. List Group
  try {
    const lg = await listObjects('List Group');
    console.log('LIST GROUP:', JSON.stringify(lg, null, 2));
  } catch(e) { console.log('LIST GROUP ERROR:', e.message); }

  await close();
  console.log('\n=== Test Complete ===');
}

run().catch(console.error);
