// filter_cmd_examples.js
// Script to filter and deduplicate clean [Channel]> command lines from cmd_examples.json

const fs = require('fs/promises');
const path = require('path');

const inputPath = path.join(__dirname, 'cmd_examples.json');
const outputPath = path.join(__dirname, 'cmd_examples_filtered.json');

async function main() {
  const data = await fs.readFile(inputPath, 'utf8');
  const entries = JSON.parse(data);
  const clean = [];
  const seen = new Set();

  for (const entry of entries) {
    // Only keep lines that are exactly '[Channel]> ...' (no context blocks)
    const cmdMatch = entry.command.match(/^\[Channel\]>\s*(.+)$/);
    if (cmdMatch) {
      const key = `${cmdMatch[1]}|${entry.context}`;
      if (!seen.has(key)) {
        clean.push({
          command: cmdMatch[1],
          context: entry.context,
          url: entry.url
        });
        seen.add(key);
      }
    }
  }

  await fs.writeFile(outputPath, JSON.stringify(clean, null, 2));
  console.log(`Filtered and deduplicated commands written to ${outputPath}`);
  console.log(`Total unique commands: ${clean.length}`);
}

if (require.main === module) {
  main();
}
