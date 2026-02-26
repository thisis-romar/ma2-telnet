// test_all_commands.js
// Telnet validation suite — sends every command from cmd_examples_filtered.json
// against the live grandMA2 console and records pass/fail/skip results.
//
// Usage: node tests/test_all_commands.js
//
// Uses high-numbered pool slots (900+) for write operations and cleans up after.
// Destructive commands (DeleteShow, Shutdown, etc.) are skipped.
// Automatically reconnects if the console drops the TCP connection.

const path = require('path');
const fs = require('fs/promises');

const DATA_PATH = path.join(__dirname, '..', 'cmd_examples_filtered.json');
const RESULTS_PATH = path.join(__dirname, 'test_results_all_commands.json');
const REPORT_PATH = path.join(__dirname, 'test_report.md');

// High pool slot range for write tests (to avoid conflicts with show data)
const TEST_SLOT = 900;

// Delay between every command (ms) to avoid overwhelming the console
const INTER_CMD_DELAY = 150;
// Longer pause every N commands
const BATCH_SIZE = 20;
const BATCH_DELAY = 1000;
// Delay after reconnecting (base — uses exponential backoff)
const RECONNECT_BASE_DELAY = 5000;
// Max reconnect attempts per command
const MAX_RECONNECT_ATTEMPTS = 5;

// Commands that are destructive or dangerous — always skip
const DESTRUCTIVE_COMMANDS = [
  'DeleteShow', 'NewShow', 'LoadShow', 'Shutdown', 'Reboot', 'Restart',
  'Record Macro', 'Record Executor',
  'UpdateFirmware', 'UpdateSoftware', 'NetworkNodeUpdate',
  'SetHostname', 'SetIP', 'SetNetworkSpeed',
  'DisconnectStation', 'InviteStation',
  'EndSession', 'JoinSession', 'LeaveSession',
  'BlackScreen', 'Setup', 'Menu',
  'SaveShow',  // Skip to avoid overwriting user's save
  'PSR', 'PSRPrepare',
  'EditSetup',
  'Login', 'Logout',
  'Backup',
];

function isDestructive(command) {
  const cmd = command.trim();
  for (const d of DESTRUCTIVE_COMMANDS) {
    if (cmd.toLowerCase().startsWith(d.toLowerCase())) return true;
  }
  if (/shutdown|reboot|deleteshow|newshow|loadshow|updatefirmware|updatesoftware/i.test(cmd)) return true;
  return false;
}

function isSafe(command) {
  const cmd = command.trim().toLowerCase();
  if (cmd.startsWith('list ') || cmd.startsWith('list\t')) return true;
  if (cmd === 'list') return true;
  if (cmd.startsWith('version')) return true;
  if (cmd.startsWith('listvar')) return true;
  if (cmd.startsWith('listuservar')) return true;
  if (cmd.startsWith('listshows')) return true;
  if (cmd.startsWith('listeffectlibrary')) return true;
  if (cmd.startsWith('listmacrolibrary')) return true;
  if (cmd.startsWith('listpluginlibrary')) return true;
  if (cmd.startsWith('listfadermodules')) return true;
  if (cmd.startsWith('listoops')) return true;
  if (cmd.startsWith('listowner')) return true;
  if (cmd.startsWith('listupdate')) return true;
  if (cmd.startsWith('cmdhelp')) return true;
  if (cmd.startsWith('help')) return true;
  if (cmd.startsWith('crashloglist')) return true;
  if (cmd.startsWith('networkinfo')) return true;
  if (cmd.startsWith('networknodeinfo')) return true;
  if (cmd.startsWith('networkspeedtest')) return true;
  if (cmd.startsWith('selectdrive')) return true;
  if (cmd.endsWith('/?')) return true;
  return false;
}

// Rewrite commands to use safe pool slots
function rewriteForSafety(command) {
  const cmd = command.trim();

  if (/^Store\s+(Group|Macro|Effect|Sequence|Preset|Executor|World|Filter|Layout|View|Timecode|Timer)\s+\d/i.test(cmd)) {
    return cmd.replace(/^(Store\s+\w+\s+)\d+/i, `$1${TEST_SLOT}`);
  }
  if (/^Delete\s+(Group|Macro|Effect|Sequence|Preset|World|Filter|Layout|View|Timecode|Timer)\s+\d/i.test(cmd)) {
    return cmd.replace(/^(Delete\s+\w+\s+)\d+/i, `$1${TEST_SLOT}`);
  }
  if (/^Label\s+(Group|Macro|Effect|Sequence|Preset|World|Filter|Layout|View)\s+\d/i.test(cmd)) {
    return cmd.replace(/^(Label\s+\w+\s+)\d+/i, `$1${TEST_SLOT}`);
  }
  if (/^Copy\s+\w+\s+\d+.*\s+At\s+\d+/i.test(cmd)) {
    return cmd.replace(/At\s+\d+/i, `At ${TEST_SLOT}`);
  }

  return cmd;
}

// --- Connection management with reconnection ---

let api = null;

async function loadApi() {
  // Fresh require to get a new connection singleton
  // Clear the module cache to force a new MA2Connection instance
  const modPath = require.resolve('../dist/index.js');
  // Also clear the connection module cache
  const connModPath = require.resolve('../dist/ma2Connection.js');
  delete require.cache[modPath];
  delete require.cache[connModPath];
  api = require(modPath);
}

async function ensureConnection() {
  if (!api) {
    await loadApi();
  }
  try {
    const s = await api.status();
    if (s.connected) return true;
  } catch {
    // Connection lost — reload
  }
  // Close old connection if it exists
  try { api.close(); } catch {}
  await loadApi();
  const s = await api.status();
  return s.connected;
}

async function execWithReconnect(command) {
  for (let attempt = 1; attempt <= MAX_RECONNECT_ATTEMPTS; attempt++) {
    try {
      await ensureConnection();
      return await api.exec(command);
    } catch (err) {
      const isConnError = /ECONNREFUSED|ECONNRESET|EPIPE|Connection closed|closed during login/i.test(err.message);
      if (isConnError && attempt < MAX_RECONNECT_ATTEMPTS) {
        const delay = RECONNECT_BASE_DELAY * Math.pow(2, attempt - 1);
        console.log(`    [reconnect] attempt ${attempt}/${MAX_RECONNECT_ATTEMPTS}, waiting ${delay/1000}s after: ${err.message}`);
        // Force fresh connection
        try { api.close(); } catch {}
        api = null;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }
}

// --- Test execution ---

async function runTest(entry) {
  const { command, context, skill } = entry;
  const cmd = command.trim();

  if (cmd.length < 2) {
    return { command: cmd, skill, context, status: 'skip', reason: 'too short' };
  }

  if (isDestructive(cmd)) {
    return { command: cmd, skill, context, status: 'skip', reason: 'destructive' };
  }

  const cleanCmd = cmd.replace(/[\u200b\u200c\u200d\ufeff]/g, '');
  const testCmd = isSafe(cleanCmd) ? cleanCmd : rewriteForSafety(cleanCmd);

  try {
    const result = await execWithReconnect(testCmd);
    const raw = result.raw || [];
    const hasError = raw.some(l => /^Error #\d+:/m.test(l));

    if (hasError) {
      const errorLine = raw.find(l => /^Error #\d+:/.test(l)) || 'Unknown error';
      return {
        command: cmd, testCommand: testCmd !== cmd ? testCmd : undefined,
        skill, context, status: 'fail', error: errorLine,
        response: raw.slice(0, 3),
      };
    }

    return {
      command: cmd, testCommand: testCmd !== cmd ? testCmd : undefined,
      skill, context, status: 'pass',
      response: raw.slice(0, 3),
    };
  } catch (err) {
    return {
      command: cmd, testCommand: testCmd !== cmd ? testCmd : undefined,
      skill, context, status: 'fail',
      error: err.message,
    };
  }
}

async function generateReport(results) {
  const bySkill = {};
  for (const r of results) {
    if (!bySkill[r.skill]) bySkill[r.skill] = [];
    bySkill[r.skill].push(r);
  }

  let md = '# MA2 Telnet Command Validation Report\n\n';
  md += `Generated: ${new Date().toISOString()}\n\n`;

  const pass = results.filter(r => r.status === 'pass').length;
  const fail = results.filter(r => r.status === 'fail').length;
  const skip = results.filter(r => r.status === 'skip').length;
  md += `## Summary\n\n`;
  md += `| Status | Count |\n|---|---|\n`;
  md += `| PASS | ${pass} |\n`;
  md += `| FAIL | ${fail} |\n`;
  md += `| SKIP | ${skip} |\n`;
  md += `| **Total** | **${results.length}** |\n\n`;

  md += `## Results by Skill\n\n`;
  for (const [skill, entries] of Object.entries(bySkill).sort()) {
    const p = entries.filter(r => r.status === 'pass').length;
    const f = entries.filter(r => r.status === 'fail').length;
    const s = entries.filter(r => r.status === 'skip').length;
    md += `### ${skill}\n\n`;
    md += `Pass: ${p} | Fail: ${f} | Skip: ${s}\n\n`;

    const failures = entries.filter(r => r.status === 'fail');
    if (failures.length > 0) {
      md += `**Failures:**\n\n`;
      md += `| Command | Error |\n|---|---|\n`;
      for (const f of failures) {
        const escaped = (f.error || '').replace(/\|/g, '\\|');
        md += `| \`${f.command}\` | ${escaped} |\n`;
      }
      md += '\n';
    }
  }

  return md;
}

async function main() {
  console.log('MA2 Telnet Command Validation Suite');
  console.log('====================================\n');

  // Check initial connection (with retries — console may need time after prior sessions)
  let connected = false;
  for (let attempt = 1; attempt <= MAX_RECONNECT_ATTEMPTS; attempt++) {
    try {
      await loadApi();
      const s = await api.status();
      console.log('Connection:', JSON.stringify(s));
      connected = true;
      break;
    } catch (err) {
      const delay = RECONNECT_BASE_DELAY * Math.pow(2, attempt - 1);
      console.log(`Connection attempt ${attempt}/${MAX_RECONNECT_ATTEMPTS} failed: ${err.message}`);
      if (attempt < MAX_RECONNECT_ATTEMPTS) {
        console.log(`  Retrying in ${delay/1000}s...`);
        try { api.close(); } catch {}
        api = null;
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  if (!connected) {
    console.error('Cannot connect to MA2 console after all retries.');
    process.exit(1);
  }

  // Load test data
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  const entries = JSON.parse(raw);

  // Deduplicate by command
  const seen = new Set();
  const unique = [];
  for (const e of entries) {
    const cmd = (e.command || '').trim().replace(/[\u200b\u200c\u200d\ufeff]/g, '');
    if (cmd && !seen.has(cmd)) {
      seen.add(cmd);
      unique.push(e);
    }
  }

  console.log(`Testing ${unique.length} unique commands (from ${entries.length} entries)`);
  console.log(`Throttle: ${INTER_CMD_DELAY}ms per cmd, ${BATCH_DELAY}ms every ${BATCH_SIZE} cmds\n`);

  const results = [];
  let passCount = 0, failCount = 0, skipCount = 0;

  for (let i = 0; i < unique.length; i++) {
    const entry = unique[i];
    const result = await runTest(entry);
    results.push(result);

    const icon = result.status === 'pass' ? 'PASS' : result.status === 'fail' ? 'FAIL' : 'SKIP';
    if (result.status === 'pass') passCount++;
    else if (result.status === 'fail') failCount++;
    else skipCount++;

    const progress = `[${i + 1}/${unique.length}]`;
    const cmd = (result.testCommand || result.command).substring(0, 50);
    if (result.status === 'fail') {
      console.log(`  ${icon} ${progress} ${cmd} → ${result.error}`);
    } else if (result.status === 'skip') {
      // Only log skip summary, not each one
    } else {
      console.log(`  ${icon} ${progress} ${cmd}`);
    }

    // Throttle: delay between every command
    if (result.status !== 'skip') {
      await new Promise(r => setTimeout(r, INTER_CMD_DELAY));
    }

    // Longer pause every BATCH_SIZE commands + save progress
    if (i > 0 && i % BATCH_SIZE === 0) {
      await new Promise(r => setTimeout(r, BATCH_DELAY));
      // Save partial results so progress isn't lost on interruption
      await fs.writeFile(RESULTS_PATH, JSON.stringify(results, null, 2) + '\n');
    }
  }

  // Write results
  await fs.writeFile(RESULTS_PATH, JSON.stringify(results, null, 2) + '\n');
  console.log(`\nResults written to: ${RESULTS_PATH}`);

  // Generate report
  const report = await generateReport(results);
  await fs.writeFile(REPORT_PATH, report);
  console.log(`Report written to: ${REPORT_PATH}`);

  // Summary
  console.log(`\n====================================`);
  console.log(`PASS: ${passCount}  FAIL: ${failCount}  SKIP: ${skipCount}  TOTAL: ${results.length}`);

  try { api.close(); } catch {}
  process.exit(failCount > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal:', err);
  try { api.close(); } catch {}
  process.exit(1);
});
