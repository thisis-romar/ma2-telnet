// test_changedest_commands.js
// Script to document and test all grandMA2 ChangeDest/CD commands from filtered dataset

const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');

const inputPath = path.join(__dirname, 'cmd_examples_filtered.json');
const docPath = path.join(__dirname, 'changedest_commands.md');
const testPath = path.join(__dirname, 'changedest_commands_test_results.json');
const webUrl = 'https://help.malighting.com/grandMA2/en/help/key_keyword_changedest.html';

async function main() {
  const data = await fs.readFile(inputPath, 'utf8');
  const entries = JSON.parse(data);
  const cdCmds = entries.filter(e => /\b(ChangeDest|CD)\b|CD\s*\//i.test(e.command));

  // Documentation Markdown
  let md = '# grandMA2 ChangeDest/CD Commands\n\n';
  md += '## Extracted ChangeDest/CD Commands\n';
  for (const cmd of cdCmds) {
    md += `- \`${cmd.command}\`\n  - Context: ${cmd.context}\n  - Source: [${cmd.url}](${cmd.url})\n`;
  }
  await fs.writeFile(docPath, md);

  // Web validation
  let webContent = '';
  try {
    const res = await axios.get(webUrl);
    webContent = res.data;
  } catch (err) {
    webContent = 'Failed to fetch web resource.';
  }

  // Test simulation: Validate syntax and flag ambiguous
  const testResults = cdCmds.map(cmd => {
    // Standard syntax: ChangeDest <args>, CD <args>, CD /
    const valid = /^(ChangeDest|CD)(\s+.+|\s*\/.*)?$/i.test(cmd.command);
    const ambiguous = /CD\s*\//.test(cmd.command) && !/ChangeDest/.test(cmd.command);
    const webMention = webContent.includes(cmd.command);
    return {
      command: cmd.command,
      context: cmd.context,
      url: cmd.url,
      valid,
      ambiguous,
      webMention,
      notes: valid ? (ambiguous ? 'Valid but context-specific/advanced' : (webMention ? 'Valid and web-documented' : 'Valid')) : 'Non-standard or ambiguous'
    };
  });
  await fs.writeFile(testPath, JSON.stringify(testResults, null, 2));

  console.log(`ChangeDest/CD command documentation written to ${docPath}`);
  console.log(`Test results written to ${testPath}`);
  console.log(`Total ChangeDest/CD commands: ${cdCmds.length}`);
}

if (require.main === module) {
  main();
}
