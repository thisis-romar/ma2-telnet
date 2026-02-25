// advanced_fetch_cmd_descriptions.js
// Advanced parser for pairing grandMA2 command examples with their manual descriptions

const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const inputPath = path.join(__dirname, 'cmd_examples_filtered.json');
const outputPath = path.join(__dirname, 'cmd_examples_with_descriptions_advanced.json');

function findClosestDescription($, el, command) {
  // Try next siblings
  let next = el.next();
  while (next.length) {
    if (next.is('p') || next.is('li') || next.is('td') || next.is('th') || next.is('div')) {
      const text = next.text().trim();
      if (text && !text.includes(command)) return text;
    }
    next = next.next();
  }
  // Try previous siblings
  let prev = el.prev();
  while (prev.length) {
    if (prev.is('p') || prev.is('li') || prev.is('td') || prev.is('th') || prev.is('div')) {
      const text = prev.text().trim();
      if (text && !text.includes(command)) return text;
    }
    prev = prev.prev();
  }
  // Try parent
  let parent = el.parent();
  if (parent.length) {
    const text = parent.text().trim();
    if (text && !text.includes(command)) return text;
  }
  // Try first paragraph in the document
  const firstP = $('p').first().text().trim();
  if (firstP && !firstP.includes(command)) return firstP;
  return null;
}

async function fetchDescription(url, command, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(url, { timeout: 10000 });
      const $ = cheerio.load(res.data);
      let desc = null;
      // Search for the command anywhere in the HTML
      let found = false;
      $('[class], pre, code, p, li, td, th, div').each((i, el) => {
        const text = $(el).text();
        if (text.includes(command) && !found) {
          desc = findClosestDescription($, $(el), command);
          found = true;
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
  const concurrency = 3;
  let idx = 0;
  async function processBatch(batch) {
    await Promise.all(batch.map(async entry => {
      let description = await fetchDescription(entry.url, entry.command);
      if (description) {
        results.push({ ...entry, description });
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
  await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
  await fs.writeFile(path.join(__dirname, 'cmd_examples_failed_advanced.json'), JSON.stringify(failed, null, 2));
  console.log(`Descriptions paired and written to ${outputPath}`);
  console.log(`Failed to fetch descriptions for ${failed.length} commands. See cmd_examples_failed_advanced.json.`);
}

if (require.main === module) {
  main();
}
