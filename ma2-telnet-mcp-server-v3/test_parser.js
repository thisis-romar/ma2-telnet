// test_parser.js
import { parseListOutput } from './src/parser.js';

const sampleListOutput = `List Fixture\nName   ID   Patch\n"Fixture 1"   1   1.101\n"Fixture 2"   2   1.102\n`;

const result = parseListOutput(sampleListOutput, 'fixture');
console.log('Parsed List Output:', JSON.stringify(result, null, 2));

if (result.items.length === 2 && result.header.includes('Name')) {
  console.log('Parser test passed.');
} else {
  console.error('Parser test failed.');
}
