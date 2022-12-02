const assert = require('assert');
const fs = require('fs');
const path = require('path');

function topCalories(input) {
  const elfCals = input
    // Each elf delimited by two lines
    .split('\n\n')
    .map((calories) =>
      // Each elf's list of calories
      calories
        .trim()
        .split('\n')
        .reduce((total, raw) => Number.parseInt(raw, 10) + total, 0)
    );

  // Find largest 3 (slow)
  // (could just do it all in a loop & track top 3 but lazy)
  return elfCals
    // Janky insertion sort
    .reduce((candidates, cals) => {
      const index = candidates.findIndex((candidate) => candidate < cals);
      if (index !== -1) {
        // Since insertion sort, should in in descending sorted order
        candidates.pop();
        candidates.splice(index, 0, cals);
      }
      return candidates;
    }, [0, 0, 0])
    // Lets overuse reduce!
    .reduce((total, num) => num + total, 0)

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
  assert.equal(topCalories(sample), 45000);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(topCalories(input));
}