const assert = require('assert');
const fs = require('fs');
const path = require('path');

function firstBasement(instruction) {
  let floor = 0;


  for (let pos = 1; pos <= instruction.length; pos++) {
    if (instruction[pos - 1] == '(') {
      floor++;
    } else {
      floor--;
    }

    if (floor == -1) {
      return pos;
    }
  }

  return -1;
}

function test() {
  assert.equal(firstBasement(')'), 1);
  assert.equal(firstBasement('()())'), 5);
}

const [instruction] = process.argv.slice(2);

if (!instruction || instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(firstBasement(input));
}