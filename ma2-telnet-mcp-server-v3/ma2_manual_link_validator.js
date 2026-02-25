// grandMA2 Manual Link Validator
// Validates all links in manual_index.json and reports broken or unreachable URLs.
// Usage: node ma2_manual_link_validator.js

const fs = require('fs');
const axios = require('axios');

const index = JSON.parse(fs.readFileSync('manual_index.json', 'utf8'));

async function validateLinks() {
  let valid = 0;
  let broken = 0;
  for (const entry of index) {
    try {
      const res = await axios.head(entry.url);
      if (res.status === 200) {
        valid++;
        console.log(`VALID: ${entry.title} - ${entry.url}`);
      } else {
        broken++;
        console.log(`BROKEN: ${entry.title} - ${entry.url} (status: ${res.status})`);
      }
    } catch (err) {
      broken++;
      console.log(`BROKEN: ${entry.title} - ${entry.url} (error: ${err.message})`);
    }
  }
  console.log(`\nValidation complete. Valid: ${valid}, Broken: ${broken}`);
}

validateLinks();
