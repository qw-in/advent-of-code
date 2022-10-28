const assert = require('assert');
const fs = require('fs');
const path = require('path');

function move(char, x, y) {
  switch (char) {
    case '^': {
      y += 1;
      break;
    }
    case '>': {
      x += 1;
      break;
    }
    case 'v': {
      y -= 1;
      break;
    }
    case '<': {
      x -= 1;
      break;
    }
    default:
      throw Error(`Invalid ${char}`);
  }
  return [x, y];
}

function santaBot(input) {
  const spots = new Map();

  let santaX = 0;
  let santaY = 0;

  let botX = 0;
  let botY = 0;

  spots.set(`${santaX}|${santaY}`, true);

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      [santaX, santaY] = move(input[i], santaX, santaY);
      spots.set(`${santaX}|${santaY}`, true);
    } else {
      [botX, botY] = move(input[i], botX, botY);
      spots.set(`${botX}|${botY}`, true);
    }
  }

  return spots.size;
}

function test() {
  assert.equal(santaBot('^v'), 3);
  assert.equal(santaBot('^>v<'), 3);
  assert.equal(santaBot('^v^v^v^v^v'), 11);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(santaBot(input));
}