const assert = require('assert');
const fs = require('fs');
const path = require('path');

function isStringNice(input) {
  if (input.length < 4) {
    return false;
  }

  let vowels = 0;
  let double = false;
  let char;
  let next;

  for (let i = 0; i < input.length; i++) {
    char = input[i];

    
    if ('aeiou'.includes(char)) {
      vowels++;
    }

    
    // Bounds check for last char
    if (i + 1 === input.length) {
      break;
    }
    
    next = input[i + 1];
    if (char === next) {
      double = true;
    }
    
    if (['ab', 'cd', 'pq', 'xy'].includes(`${char}${next}`)) {
      return false;
    }
  }
  return vowels >= 3 && double;
}

function totalNiceStrings(input) {
  return input.split('\n').filter(isStringNice).length;
}

function test() {
  assert.equal(isStringNice('ugknbfddgicrmopn'), true);
  assert.equal(isStringNice('jchzalrnumimnmhp'), false);
  assert.equal(isStringNice('haegwjzuvuyypxyu'), false);
  assert.equal(isStringNice('dvszwmarrgswjxmb'), false);

  assert.equal(
    totalNiceStrings(
      'ugknbfddgicrmopn\njchzalrnumimnmhp\ndvszwmarrgswjxmb'
    ), 1);
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