const assert = require('assert');
const fs = require('fs');
const path = require('path');

function solve(input) {
  return input
    .trim()
    .split('\n')
    .filter((pair) => {
      const range = pair
        .split(/[-,]/)
        .map(n => Number.parseInt(n, 10));

      const cmp = range[2] - range[0];
      if (cmp === 0) {
        return true;
      }
      if (cmp < 0) {
        return range[3] >= range[1];
      }
      return range[3] <= range[1];
    })
    .length
}

const sample = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

function test() {
  assert.equal(solve(sample), 2);
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