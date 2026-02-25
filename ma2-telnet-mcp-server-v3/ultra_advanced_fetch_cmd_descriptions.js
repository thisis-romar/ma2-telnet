// ultra_advanced_fetch_cmd_descriptions.js
// Ultra-advanced parser for pairing grandMA2 command examples with their manual descriptions

const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const inputPath = path.join(__dirname, 'cmd_examples_filtered.json');
const outputPath = path.join(__dirname, 'cmd_examples_with_descriptions_ultra.json');
const failedPath = path.join(__dirname, 'cmd_examples_failed_ultra.json');

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

function findBestDescription($, command) {
  // Fuzzy search for command in all text nodes
  const normCmd = normalize(command);
  let bestDesc = null;
  let bestScore = 0;
  $('[class], pre, code, p, li, td, th, div, span').each((i, el) => {
    const text = $(el).text();
    const normText = normalize(text);
    // Score: exact, contains, or partial match
    let score = 0;
    if (normText === normCmd) score = 3;
    else if (normText.includes(normCmd)) score = 2;
    else if (normCmd && normText && normCmd.split(' ').every(w => normText.includes(w))) score = 1;
    if (score > bestScore) {
      // Try next/prev/parent/child for description
      let desc = '';
      let next = $(el).next();
      while (next.length && !desc) {
        if (next.is('p') || next.is('li') || next.is('td') || next.is('th') || next.is('div')) {
          const t = next.text().trim();
          if (t && !t.includes(command)) desc = t;
        }
        next = next.next();
      }
      if (!desc) {
        let prev = $(el).prev();
        while (prev.length && !desc) {
          if (prev.is('p') || prev.is('li') || prev.is('td') || prev.is('th') || prev.is('div')) {
            const t = prev.text().trim();
            if (t && !t.includes(command)) desc = t;
          }
          prev = prev.prev();
        }
      }
      if (!desc) {
        let parent = $(el).parent();
        if (parent.length) {
          const t = parent.text().trim();
          if (t && !t.includes(command)) desc = t;
        }
      }
      if (!desc) {
        const firstP = $('p').first().text().trim();
        if (firstP && !firstP.includes(command)) desc = firstP;
      }
      bestDesc = desc;
      bestScore = score;
    }
  });
  return bestDesc || null;
}

async function fetchDescription(url, command, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(url, { timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0' } });
      const $ = cheerio.load(res.data);
      let desc = findBestDescription($, command);
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
  const concurrency = 2;
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
  await fs.writeFile(failedPath, JSON.stringify(failed, null, 2));
  console.log(`Ultra descriptions paired and written to ${outputPath}`);
  console.log(`Failed to fetch descriptions for ${failed.length} commands. See ${failedPath}.`);
}

if (require.main === module) {
  main();
}
