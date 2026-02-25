// test_list_commands.js
// Script to document and test all grandMA2 'list' commands from filtered dataset

const fs = require('fs/promises');
const path = require('path');

const inputPath = path.join(__dirname, 'cmd_examples_filtered.json');
const docPath = path.join(__dirname, 'list_commands.md');
const testPath = path.join(__dirname, 'list_commands_test_results.json');

async function main() {
  const data = await fs.readFile(inputPath, 'utf8');
  const entries = JSON.parse(data);
  const listCmds = entries.filter(e => /\blist/i.test(e.command));

  // Documentation Markdown
  let md = '# grandMA2 List Commands\n\n';
  md += '## Extracted List Commands\n';
  for (const cmd of listCmds) {
    md += `- \`${cmd.command}\`\n  - Context: ${cmd.context}\n  - Source: [${cmd.url}](${cmd.url})\n`;
  }
  await fs.writeFile(docPath, md);

  // Test simulation: Validate syntax and flag ambiguous
  const testResults = listCmds.map(cmd => {
    // Standard syntax: List <ObjectType> [args]
    const valid = /^List(\s+[A-Za-z]+.*)?$/.test(cmd.command) || /List[A-Za-z]+/.test(cmd.command);
    const ambiguous = /feature|Menu|PSRList|RdmList/.test(cmd.command);
    return {
      command: cmd.command,
      context: cmd.context,
      url: cmd.url,
      valid,
      ambiguous,
      notes: valid ? (ambiguous ? 'Valid but context-specific/advanced' : 'Valid') : 'Non-standard or ambiguous'
    };
  });
  await fs.writeFile(testPath, JSON.stringify(testResults, null, 2));

  console.log(`List command documentation written to ${docPath}`);
  console.log(`Test results written to ${testPath}`);
  console.log(`Total list commands: ${listCmds.length}`);
}

if (require.main === module) {
  main();
}
