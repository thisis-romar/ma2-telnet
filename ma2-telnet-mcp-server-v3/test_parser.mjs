// test_parser.mjs
import { parseListOutput } from './dist/parser.js';

const tests = [
  {
    name: 'Basic fixture list',
    input: `List Fixture\nName   ID   Patch\n"Fixture 1"   1   1.101\n"Fixture 2"   2   1.102\n`,
    type: 'fixture',
    expectedItems: 2,
    expectedHeader: ['Name', 'ID', 'Patch']
  },
  {
    name: 'Empty pool warning',
    input: `List Group\nWARNING, NO OBJECTS FOUND FOR LIST\n`,
    type: 'group',
    expectedItems: 0,
    expectedHeader: []
  },
  {
    name: 'Quoted fields and spaces',
    input: `List Cue\nName   Number   Info\n"Cue 1"   1   "Go+"\n"Cue 2"   2   "Fade 3s"\n`,
    type: 'cue',
    expectedItems: 2,
    expectedHeader: ['Name', 'Number', 'Info']
  },
  {
    name: 'Extra columns',
    input: `List Attribute\nAttr   Value   Extra\nDimmer   100   foo   bar\n`,
    type: 'attribute',
    expectedItems: 1,
    expectedHeader: ['Attr', 'Value', 'Extra']
  },
  {
    name: 'Missing columns',
    input: `List Group\nName   ID\n"Group 1"\n`,
    type: 'group',
    expectedItems: 1,
    expectedHeader: ['Name', 'ID']
  },
  {
    name: 'Malformed input',
    input: `List Fixture\n\n\n`,
    type: 'fixture',
    expectedItems: 0,
    expectedHeader: []
  }
];

let allPassed = true;
for (const t of tests) {
  const lines = t.input.split(/\r?\n/).filter(l => l.length > 0);
  const result = parseListOutput(t.input.split("\n")[0], lines.slice(1));
  const pass =
    result.items.length === t.expectedItems &&
    JSON.stringify(result.header) === JSON.stringify(t.expectedHeader);
  console.log(`Test: ${t.name}`);
  console.log('Result:', JSON.stringify(result, null, 2));
  if (pass) {
    console.log('  Passed.');
  } else {
    console.error('  Failed.');
    allPassed = false;
  }
}
if (allPassed) {
  console.log('All parser tests passed.');
} else {
  console.error('Some parser tests failed.');
}
