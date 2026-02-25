// process_cmd_examples.js
// Script to further process filtered commands: group by context, export Markdown, and summary stats

const fs = require('fs/promises');
const path = require('path');

const inputPath = path.join(__dirname, 'cmd_examples_filtered.json');
const mdPath = path.join(__dirname, 'cmd_examples_processed.md');
const summaryPath = path.join(__dirname, 'cmd_examples_summary.json');

async function main() {
  const data = await fs.readFile(inputPath, 'utf8');
  const entries = JSON.parse(data);

  // Group by context
  const grouped = {};
  for (const ex of entries) {
    const key = ex.context || 'Uncategorized';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ex);
  }

  // Markdown export
  let md = '# grandMA2 Command Examples (Processed)\n\n';
  for (const section in grouped) {
    md += `## ${section}\n`;
    for (const ex of grouped[section]) {
      md += `- **Command:** \`${ex.command}\`\n  - **Source:** [${ex.url}](${ex.url})\n`;
    }
    md += '\n';
  }
  await fs.writeFile(mdPath, md);

  // Summary stats
  const summary = {
    totalCommands: entries.length,
    contexts: Object.keys(grouped).length,
    commandsPerContext: Object.fromEntries(
      Object.entries(grouped).map(([k, v]) => [k, v.length])
    )
  };
  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));

  console.log(`Processed Markdown written to ${mdPath}`);
  console.log(`Summary written to ${summaryPath}`);
  console.log(`Total commands: ${summary.totalCommands}`);
  console.log(`Contexts: ${summary.contexts}`);
}

if (require.main === module) {
  main();
}
