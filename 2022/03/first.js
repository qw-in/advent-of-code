const assert = require('assert');
const fs = require('fs');
const path = require('path');

function solve(input) {
  return input
    .trim()
    .split('\n')
    .map((backpack) => {
      const midIndex = Math.floor(backpack.trim().length / 2);
      for (let i = 0; i < midIndex; i++) {
        if (backpack.indexOf(backpack[i], midIndex) > - 1) {
          // Calculate priority
          const charCode = backpack.charCodeAt(i);
          if (charCode < 96) {
            // Uppercase
            return charCode - 38; 
          }
          // Lowercase
          return charCode - 96;
        }
      }
    })
    .reduce((a, i) => a + i, 0);
}

const sample = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

function test() {
  assert.equal(solve(sample), 157);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(solve(input));
}