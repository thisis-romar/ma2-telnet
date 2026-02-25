// grandMA2 Manual Index Scraper
// Scrapes all child topics from https://help.malighting.com/grandMA2/en/help and outputs a structured index.
// Usage: node ma2_manual_index_scraper.js

const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://help.malighting.com/grandMA2/en/help';

async function scrapeIndex() {
  try {
    const res = await axios.get(BASE_URL);
    const $ = cheerio.load(res.data);
    const links = [];
    // Try to select links from the manual index sidebar or main content
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      // Accept links that contain 'key_' and are not just anchors
      if (href && href.includes('key_') && !href.startsWith('#')) {
        let url = href;
        // Fix missing slash and base path
        if (!url.startsWith('http')) {
          if (!url.startsWith('/')) url = '/' + url;
          if (!url.startsWith('/grandMA2/en/help/')) url = '/grandMA2/en/help' + url;
          url = 'https://help.malighting.com' + url;
        }
        links.push({
          title: text,
          url
        });
      }
    });
    console.log(`Found ${links.length} manual links.`);
    const fs = require('fs');
    console.log('grandMA2 Manual Index:');
    links.forEach(link => {
      console.log(`- ${link.title}: ${link.url}`);
    });
    fs.writeFileSync('manual_index.json', JSON.stringify(links, null, 2));
    console.log('Index saved to manual_index.json');
    return links;
  } catch (err) {
    console.error('Error scraping manual index:', err.message);
  }
}

scrapeIndex();
