const assert = require('assert');
const fs = require('fs');
const path = require('path');

function calculateWrapping(x, y, z) {
  const xy = x * y;
  const xz = x * z;
  const yz = y * z;

  const extra = Math.min(xy, xz, yz);

  return 2 * xy + 2 * xz + 2 * yz + extra;
}

function totalWrapping(input) {
  return input
    .split('\n')
    .map((dimension) => calculateWrapping(
      ...dimension
        .split('x')
        .map(s => Number.parseInt(s, 10))
    ))
    .reduce((s, d) => s + d, 0);
}

function test() {
  assert.equal(calculateWrapping(2,3,4), 58);
  assert.equal(calculateWrapping(3,4,2), 58);
  assert.equal(calculateWrapping(4,2,3), 58);
  assert.equal(calculateWrapping(4,3,2), 58);

  assert.equal(calculateWrapping(1,1,10), 43);

  assert.equal(totalWrapping(`2x3x4\n1x1x10`), 58+43);
  assert.equal(totalWrapping(`4x3x2\n2x3x4\n1x1x10`), 58+58+43);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(totalWrapping(input));
}