// fetch_cmd_descriptions.js
// Script to fetch and pair grandMA2 command examples with their manual descriptions

const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const inputPath = path.join(__dirname, 'cmd_examples_filtered.json');
const outputPath = path.join(__dirname, 'cmd_examples_with_descriptions.json');

async function fetchDescription(url, command, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(url, { timeout: 10000 });
      const $ = cheerio.load(res.data);
      let desc = '';
      $('pre, code').each((i, el) => {
        if ($(el).text().includes(command)) {
          let next = $(el).next();
          while (next.length && !desc) {
            if (next.is('p') || next.is('li')) desc = next.text().trim();
            next = next.next();
          }
        }
      });
      return desc || null;
    } catch (err) {
      if (attempt === retries) {
        return null;
      }
      await new Promise(res => setTimeout(res, 1000 * (attempt + 1)));
    }
  }
}

async function main() {
  const data = await fs.readFile(inputPath, 'utf8');
  const entries = JSON.parse(data);
  const results = [];
  const failed = [];
  const successes = [];
  const concurrency = 5;
  let idx = 0;
  async function processBatch(batch) {
    await Promise.all(batch.map(async entry => {
      let description = await fetchDescription(entry.url, entry.command);
      if (description) {
        successes.push({ ...entry, description });
      } else {
        failed.push(entry);
      }
    }));
  }
  while (idx < entries.length) {
    const batch = entries.slice(idx, idx + concurrency);
    await processBatch(batch);
    idx += concurrency;
    console.log(`Processed ${Math.min(idx, entries.length)} of ${entries.length}`);
  }
  await fs.writeFile(outputPath, JSON.stringify(successes, null, 2));
  await fs.writeFile(path.join(__dirname, 'cmd_examples_failed.json'), JSON.stringify(failed, null, 2));
  console.log(`Descriptions paired and written to ${outputPath}`);
  console.log(`Failed to fetch descriptions for ${failed.length} commands. See cmd_examples_failed.json.`);
}

if (require.main === module) {
  main();
}
