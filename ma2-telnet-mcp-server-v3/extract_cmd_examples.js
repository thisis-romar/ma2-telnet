// extract_cmd_examples.js
// Node.js CLI tool to extract command examples from grandMA2 manual pages

const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const manualIndexPath = path.join(__dirname, 'manual_index.json');
const outputPath = path.join(__dirname, 'cmd_examples.json');

async function loadUrls() {
  const data = await fs.readFile(manualIndexPath, 'utf8');
  const entries = JSON.parse(data);
  return entries.map(e => e.url);
}

async function fetchPage(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err.message);
    return null;
  }
}

function extractExamples(html, url) {
  const $ = cheerio.load(html);
  const examples = [];
  // Helper to extract only the command after [Channel]>
  function extractChannelCmds(text, context) {
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\[Channel\]>\s*(.+)$/);
      if (match) {
        examples.push({ url, command: match[1].trim(), context });
      }
    }
  }
  // Scan all code/pre blocks
  $('pre, code').each((i, el) => {
    const text = $(el).text();
    let context = $(el).closest('section, article').find('h1,h2,h3').first().text().trim();
    if (!context) context = $(el).parents().find('h1,h2,h3').first().text().trim();
    extractChannelCmds(text, context);
  });
  // Scan all text nodes for inline [Channel]> lines
  $('body').find('*').each((i, el) => {
    const text = $(el).text();
    let context = $(el).closest('section, article').find('h1,h2,h3').first().text().trim();
    if (!context) context = $(el).parents().find('h1,h2,h3').first().text().trim();
    extractChannelCmds(text, context);
  });
  // Deduplicate by url, command, context
  const seen = new Set();
  return examples.filter(ex => {
    const key = `${ex.url}|${ex.command}|${ex.context}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function main() {
  const urls = await loadUrls();
  const total = urls.length;
  console.log(`Total URLs to process: ${total}`);
  const batchSize = 50; // Increased batch size for faster extraction
  let processed = 0;
  let valid = 0;
  let invalid = 0;
  let retried = 0;
  let failed = 0;
  const allExamples = [];
  function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }
  async function fetchWithRetry(url, retries = 3) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const htmlPromise = fetchPage(url);
        const html = await Promise.race([
          htmlPromise,
          sleep(7000).then(() => null)
        ]);
        if (html) return html;
      } catch {}
      retried++;
      await sleep(10 + Math.floor(Math.random() * 40));
    }
    failed++;
    console.log(`Slow or failed link: ${url}`);
    return null;
  }
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await Promise.all(batch.map(async url => {
      await sleep(10 + Math.floor(Math.random() * 40));
      processed++;
      if (processed % batchSize === 0 || processed === total) {
        console.log(`Batch progress: ${processed} of ${total}`);
      }
      let html;
      try {
        html = await fetchWithRetry(url);
      } catch (err) {
        console.warn(`Failed to fetch ${url}: ${err && err.message ? err.message : err}`);
        invalid++;
        return;
      }
      if (!html) {
        invalid++;
        return;
      }
      valid++;
      const examples = extractExamples(html, url);
      allExamples.push(...examples);
    }));
  }
  await fs.writeFile(outputPath, JSON.stringify(allExamples, null, 2));

  // Markdown output
  const mdPath = path.join(__dirname, 'cmd_examples.md');
  let md = '# grandMA2 Command Examples Extracted\n\n';
  // Group by context (section/heading)
  const grouped = {};
  for (const ex of allExamples) {
    const key = ex.context || 'Uncategorized';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ex);
  }
  for (const section in grouped) {
    md += `## ${section}\n`;
    for (const ex of grouped[section]) {
      md += `\n**Source:** [${ex.url}](${ex.url})\n\n`;
      md += '``' + ex.command + '``\n\n';
    }
  }
  await fs.writeFile(mdPath, md);
  console.log(`Markdown output written to ${mdPath}`);
  // Output summary
  console.log(`\nValidation Summary:`);
  console.log(`Total links: ${total}`);
  console.log(`Valid: ${valid}`);
  console.log(`Invalid: ${invalid}`);
  console.log(`Retried: ${retried}`);
  console.log(`Failed: ${failed}`);
}

if (require.main === module) {
  main();
}
