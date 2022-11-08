const assert = require('assert');
const fs = require('fs');
const path = require('path');

function parseCoord(coord) {
  return coord.split(',').map((s) => Number.parseInt(s, 10))
}

function parseInstruction(instruction) {
  const groups = instruction.match(/^(.*) (\d+,\d+) through (\d+,\d+)$/);

  const command = groups[1].trim();
  const from = parseCoord(groups[2]);
  const to = parseCoord(groups[3]);

  return {
    command,
    from,
    to,
  }
}

function* coordsToKeys([fromX, fromY], [toX, toY]) {
  for (let x = fromX; x <= toX; x++) {
    for (let y = fromY; y <= toY; y++) {
      // Cantor pairing function: https://stackoverflow.com/a/13871379
      // (a + b) * (a + b + 1) / 2 + a; where a, b >= 0
      // Should be usable given the bounds:
      // 0 <= x,y < 1000
      yield (x + y) * (x + y + 1) / 2 + x;
    }
  }
}


function fireHazard(instructions) {
  const board = new Map();

  for (const instruction of instructions.split('\n')) {
    const {
      command,
      from,
      to,
    } = parseInstruction(instruction);

    // Delete rather than setting to false to
    // make board.size convenient
    switch (command) {
      case 'turn off': {
        for (const key of coordsToKeys(from, to)) {
          const state = board.get(key) ?? 0;
          board.set(key, Math.max(0, state - 1));
        }
        break;
      }
      case 'turn on': {
        for (const key of coordsToKeys(from, to)) {
          const state = board.get(key) ?? 0;
          board.set(key, state + 1);
        }
        break;
      }
      case 'toggle': {
        for (const key of coordsToKeys(from, to)) {
          const state = board.get(key) ?? 0;
          board.set(key, state + 2);
        }

        break;
      }
      default:
        throw Error(`Unsupported command "${command}"`);
    }
  }

  // .array functions on iterators ES2022 pls
  return Array
    .from(board.entries())
    .reduce(
      (totalBrightness, [, brightness]) => totalBrightness + (brightness ?? 0),
      0,
    );
}

function test() {
  assert.equal(fireHazard('turn on 0,0 through 0,0'), 1);
  assert.equal(fireHazard('toggle 0,0 through 999,999'), 2_000_000);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  const input = fs.readFileSync(
    path.resolve(__dirname, instruction),
    'utf-8'
  );
  console.log(fireHazard(input));
}