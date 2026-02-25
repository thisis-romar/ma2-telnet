// MA2 Keyword Test Script
// This script sends each MA2 function keyword as a command to the telnet MCP server and logs feedback.
// Usage: node ma2_keyword_test_script.js


const net = require('net');

const HOST = process.env.MA2_HOST || '127.0.0.1';
const PORT = process.env.MA2_PORT || 30000;

const keywords = [
  '>>>','<<<','adduservar','addvar','align','alignfadermodules','all','allrows','assign','at','backup','black','blackout','blind','blindedit','block','call','changedest','channellink','circularcopy','clear','clearactive','clearall','clearselection','clone','cmdhelp','copy','delete','deleteshow','disconnectstation','doublerate','doublespeed','edit','endsession','export','extract','fix','flash','flip','freeze','go','goback','goto','halfrate','halfspeed','help','highlight','if','ifactive','ifoutput','ifprog','import','info','insert','invert','invitestation','joinsession','kill','label','layer','learn','leavesession','list','listfadermodules','listlibrary','listeffectlibrary','listmacrolibrary','listshows','listuservar','listvar','load','loadshow','lock','login','logout','masterfade','matricksblocks','matricksfilter','matricksgroups','matricksinterleave','matricksreset','matrickswings','menu','midicontrol','midinote','midiprogram','move','networkinfo','networknodeinfo','networknodeupdate','networkspeedtest','newshow','nextrow','off','on','oops','park','pause','preview','previewedit','previewexecutor','prevrow','psr','psrlist','psrprepare','rate1','reboot','record','saveshow','select','selectdrive','selfix','setip','setup','setuservar','setvar','shuffleselection','shufflevalues','shutdown','solo','speed','stepfade','stepinfade','stepoutfade','stomp','store','storelook','swop','swopgo','swopon','temp','tempfader','toggle','tools','top','unblock','unpark','update','updatefirmware','updatesoftware','updatethumbnails','version','appearance'
];

function getExampleCommand(keyword) {
  // Map keywords to example commands (simplified, for demo)
  switch (keyword) {
    case 'store': return 'Store Cue 1';
    case 'copy': return 'Copy Cue 1 Cue 2';
    case 'delete': return 'Delete Cue 2';
    case 'go': return 'Go+ 1';
    case 'label': return 'Label Cue 1 "Test Cue"';
    case 'list': return 'List Cue';
    case 'record': return 'Record Cue 3';
    case 'assign': return 'Assign Cue 1 Executor 1';
    case 'blackout': return 'Blackout On';
    case 'off': return 'Off Cue 1';
    case 'on': return 'On Cue 1';
    case 'update': return 'Update Cue 1';
    case 'edit': return 'Edit Cue 1';
    case 'backup': return 'Backup';
    case 'loadshow': return 'LoadShow "DemoShow"';
    case 'saveshow': return 'SaveShow "DemoShow"';
    case 'login': return 'Login administrator admin';
    case 'logout': return 'Logout';
    case 'help': return 'Help';
    case 'version': return 'Version';
    default: return keyword.charAt(0).toUpperCase() + keyword.slice(1);
  }
}

async function runTests() {
  const client = new net.Socket();
  let buffer = '';
  let ready = false;
  let loggedIn = false;

  client.connect(PORT, HOST, () => {
    console.log('Connected to MCP server. Sending login...');
    client.write('Login administrator admin\r\n');
  });

  client.on('data', (data) => {
    buffer += data.toString();
    // Wait for login prompt
    if (!loggedIn && buffer.includes("Logged in as User 'administrator'")) {
      loggedIn = true;
      ready = true;
      buffer = '';
      console.log('Login successful.');
    }
  });

  client.on('error', (err) => {
    console.error('Socket error:', err.message);
    client.destroy();
  });

  // Wait for login before sending commands
  while (!ready) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Step 1: Import 10 dimmer fixtures
  buffer = '';
  const importCmd = 'Import Fixture 1 Thru 10 "Dimmer"';
  console.log(`\n--- Importing fixtures: ${importCmd}`);
  client.write(importCmd + '\r\n');
  await new Promise((resolve) => {
    const checkFeedback = () => {
      if (buffer.includes('[Channel]>')) {
        console.log('Feedback:', buffer.trim());
        resolve();
      } else {
        setTimeout(checkFeedback, 100);
      }
    };
    checkFeedback();
  });

  // Step 2: Validate all function keywords
  for (const keyword of keywords) {
    const cmd = getExampleCommand(keyword);
    buffer = '';
    console.log(`\n--- Testing keyword: ${keyword} | Command: ${cmd}`);
    client.write(cmd + '\r\n');
    await new Promise((resolve) => {
      const checkFeedback = () => {
        if (buffer.includes('[Channel]>')) {
          console.log('Feedback:', buffer.trim());
          resolve();
        } else {
          setTimeout(checkFeedback, 100);
        }
      };
      checkFeedback();
    });
  }
  client.end();
}

runTests();
