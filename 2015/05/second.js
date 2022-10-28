const assert = require('assert');
const fs = require('fs');
const path = require('path');

function isStringNice(input) {
  let doublePair = false;
  let sammich = false;

  for (let i = 0; i < input.length - 2; i ++) {
    if (input.indexOf(input.substring(i, i + 2), i + 2) >= 0) {
      doublePair = true;
    }

    if (input[i] === input[i + 2]) {
      sammich = true;
    }
  }

  return doublePair && sammich;
}

function totalNiceStrings(input) {
  return input.split('\n').filter(isStringNice).length;
}

function test() {
  assert.equal(isStringNice('qjhvhtzxzqqjkmpb'), true);
  assert.equal(isStringNice('xxyxx'), true);
  assert.equal(isStringNice('aaavyv'), false);
  assert.equal(isStringNice('aaaavyv'), true);
  assert.equal(isStringNice('uurcxstgmygtbstg'), false);
  assert.equal(isStringNice('ieodomkazucvgmuy'), false);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(totalNiceStrings(input));
}