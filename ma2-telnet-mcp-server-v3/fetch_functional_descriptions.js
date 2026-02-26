// fetch_functional_descriptions.js
// Scrapes functional descriptions from grandMA2 help pages.
// Extracts what each command DOES, not "how to type it".
//
// Usage: node fetch_functional_descriptions.js

const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const inputPath = path.join(__dirname, 'cmd_examples_filtered.json');
const outputPath = path.join(__dirname, 'cmd_examples_filtered.json');

// Patterns to skip — these are "how to type" instructions, not functional descriptions
const SKIP_PATTERNS = [
  /^to get the .* keyword/i,
  /^to go to the .* keyword/i,
  /^to execute the keyword/i,
  /^to enter the keyword/i,
  /^the key .* is located/i,
  /^pressing .* enters/i,
  /^press(ing)?\s/i,
  /^type\s/i,
  /^version\s+\d/i,
  /^table\s+\d/i,
  /^new in the manual/i,
  /^grandma2 user manual/i,
  /^×$/,
  /^\s*$/,
];

function isUsefulDescription(text) {
  if (!text || text.trim().length < 10) return false;
  if (text.trim().length > 300) return false;
  const trimmed = text.trim();
  for (const pat of SKIP_PATTERNS) {
    if (pat.test(trimmed)) return false;
  }
  return true;
}

function extractFunctionalDescription($, context) {
  // Strategy 1: Look for the main content paragraph that describes the keyword
  // These typically appear as: "<Keyword> is a function keyword..." or "<Keyword> is used to..."
  // They're in the main content area, usually the first meaningful <p>

  // Find the main content div (MA help pages use specific structure)
  const mainContent = $('div.topic-content, div.content, div#content, article, main, body');

  // Collect all paragraphs in order
  const paragraphs = [];
  mainContent.find('p').each((i, el) => {
    const text = $(el).text().trim();
    if (isUsefulDescription(text)) {
      paragraphs.push(text);
    }
  });

  // Strategy 2: Look for a paragraph that contains "is a" pattern (definitional)
  const contextKeyword = (context || '').replace(/ keyword$/i, '').replace(/ key$/i, '').trim().split(/\s+/)[0];

  for (const p of paragraphs) {
    // Prefer definitional sentences: "X is a function keyword...", "X is used to..."
    if (/\bis\s+a\s+(function|helping|object)\s+keyword/i.test(p)) return p;
    if (/\bis\s+(a\s+)?function\s+used/i.test(p)) return p;
    if (/\bis\s+used\s+to/i.test(p)) return p;
    if (/\bis\s+an?\s+object\s+type/i.test(p)) return p;
  }

  // Strategy 3: First paragraph that mentions the keyword name
  if (contextKeyword && contextKeyword.length > 1) {
    for (const p of paragraphs) {
      const lower = p.toLowerCase();
      if (lower.includes(contextKeyword.toLowerCase()) && p.length > 20) {
        return p;
      }
    }
  }

  // Strategy 4: First meaningful paragraph
  if (paragraphs.length > 0) {
    return paragraphs[0];
  }

  return null;
}

async function fetchPage(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(url, {
        timeout: 15000,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MA2-Telnet-Docs/1.0)' },
      });
      return cheerio.load(res.data);
    } catch (err) {
      if (attempt === retries) return null;
      await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  return null;
}

async function main() {
  const raw = await fs.readFile(inputPath, 'utf8');
  const entries = JSON.parse(raw);

  // Group by URL to avoid redundant fetches
  const byUrl = {};
  for (const entry of entries) {
    const url = entry.url;
    if (!byUrl[url]) byUrl[url] = [];
    byUrl[url].push(entry);
  }

  const urls = Object.keys(byUrl);
  console.log(`Fetching ${urls.length} unique URLs for ${entries.length} entries...`);

  let fetched = 0;
  let enriched = 0;
  let failed = 0;

  // Process in batches of 3 concurrent
  const CONCURRENCY = 3;
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (url) => {
      const $ = await fetchPage(url);
      fetched++;

      if (!$) {
        failed += byUrl[url].length;
        console.log(`  FAIL [${fetched}/${urls.length}] ${url.split('/').pop()}`);
        return;
      }

      // Extract one description per URL using context from the first entry
      const context = byUrl[url][0].context;
      const desc = extractFunctionalDescription($, context);

      if (desc) {
        for (const entry of byUrl[url]) {
          // Only set if not already a better description, or if missing
          if (!entry.description || entry.description.length < 10) {
            entry.description = desc;
            enriched++;
          }
        }
        const short = desc.substring(0, 60) + (desc.length > 60 ? '...' : '');
        console.log(`  OK   [${fetched}/${urls.length}] ${url.split('/').pop()} → "${short}"`);
      } else {
        console.log(`  SKIP [${fetched}/${urls.length}] ${url.split('/').pop()} (no description found)`);
      }
    }));
  }

  // Write enriched data back
  await fs.writeFile(outputPath, JSON.stringify(entries, null, 2) + '\n');

  // Stats
  const withDesc = entries.filter(e => e.description && e.description.trim().length > 10).length;
  console.log(`\nDone.`);
  console.log(`  URLs fetched: ${fetched}`);
  console.log(`  Entries enriched: ${enriched}`);
  console.log(`  Entries with description: ${withDesc} / ${entries.length}`);
  console.log(`  Failed fetches: ${failed}`);
  console.log(`  Written to: ${outputPath}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
