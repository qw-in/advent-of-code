const assert = require('assert');
const fs = require('fs');
const path = require('path');

function solve(input) {
  const backpacks = input.trim().split('\n');
  let total = 0;

  for (let i = 0; i < backpacks.length; i += 3) {
    for (let char of backpacks[i]) {
      if (backpacks[i + 1].includes(char) && backpacks[i + 2].includes(char)) {
        // Calculate priority
        const charCode = char.charCodeAt(0);
        if (charCode < 96) {
          // Uppercase
          total += charCode - 38;
          break;
        }
        // Lowercase
        total += charCode - 96;
        break;
      }
    }
  }
  return total;
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
  assert.equal(solve(sample), 70);
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