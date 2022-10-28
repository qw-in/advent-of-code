const assert = require('assert');
const fs = require('fs');
const path = require('path');

function calculateRibbon(x, y, z) {
  // Lazy...hehe
  const xy = 2 * x + 2 * y;
  const xz = 2 * x + 2 * z;
  const yz = 2 * y + 2 * z;

  const around = Math.min(xy, xz, yz);
  const volume = x * y * z;

  return around + volume;
}

function totalRibbon(input) {
  return input
    .split('\n')
    .map((dimension) => calculateRibbon(
      ...dimension
        .split('x')
        .map(s => Number.parseInt(s, 10))
    ))
    .reduce((s, d) => s + d, 0);
}

function test() {
  assert.equal(calculateRibbon(2,3,4), 34);
  assert.equal(calculateRibbon(1,1,10), 14);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(totalRibbon(input));
}