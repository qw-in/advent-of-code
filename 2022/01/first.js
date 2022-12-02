const assert = require('assert');
const fs = require('fs');
const path = require('path');

function maxCalories(input) {
  return Math.max(...(input
    // Each elf delimited by two lines
    .split('\n\n')
    .map((calories) =>
      // Each elf's list of calories
      calories
        .trim()
        .split('\n')
        .reduce((total, raw) => Number.parseInt(raw, 10) + total, 0)
    )));
}

const sample = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

function test() {
  assert.equal(maxCalories(sample), 24000);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(maxCalories(input));
}