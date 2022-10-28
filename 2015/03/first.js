const assert = require('assert');
const fs = require('fs');
const path = require('path');

// String keys ain't great but its js

function santa(input) {
  const spots = new Map();

  let x = 0;
  let y = 0;

  spots.set(`${x}|${y}`, true);

  for (const char of input) {
    switch (char) {
      case '^': {
        y += 1;
        spots.set(`${x}|${y}`, true);
        break;
      }
      case '>': {
        x += 1;
        spots.set(`${x}|${y}`, true);
        break;
      }
      case 'v': {
        y -= 1;
        spots.set(`${x}|${y}`, true);
        break;
      }
      case '<': {
        x -= 1;
        spots.set(`${x}|${y}`, true);
        break;
      }
      default:
        throw Error(`Invalid ${char}`);
    }
  }
  return spots.size;
}

function test() {
  assert.equal(santa('>'), 2);
  assert.equal(santa('^>v<'), 4);
  assert.equal(santa('^v^v^v^v^v'), 2);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(santa(input));
}