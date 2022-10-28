const assert = require('assert');
const fs = require('fs');
const path = require('path');

function calculateFloor(instruction) {
  let floor = 0;

  for (const char of instruction) {
    if (char == '(') {
      floor++;
    } else {
      floor--;
    }
  }

  return floor;
}

function test() {
  assert.equal(calculateFloor('(())'), 0);
  assert.equal(calculateFloor('()()'), 0);
  assert.equal(calculateFloor('((('), 3);
  assert.equal(calculateFloor('(()(()('), 3);
  assert.equal(calculateFloor('))((((('), 3);
  assert.equal(calculateFloor('())'), -1);
  assert.equal(calculateFloor('))('), -1);
  assert.equal(calculateFloor(')))'), -3);
  assert.equal(calculateFloor(')())())'), -3);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(calculateFloor(input));
}