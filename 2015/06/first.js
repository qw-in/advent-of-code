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


// Naive implementation
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
          board.delete(key);
        }
        break;
      }
      case 'turn on': {
        for (const key of coordsToKeys(from, to)) {
          board.set(key, true);
        }
        break;
      }
      case 'toggle': {
        for (const key of coordsToKeys(from, to)) {
          if (board.has(key)) {
            board.delete(key);
          } else {
            board.set(key, true);
          }
        }

        break;
      }
      default:
        throw Error(`Unsupported command "${command}"`);
    }
  }

  return board.size;
}

// Naive solution worked, thinking about a faster solution...

/**
 * Maybe create a stack of overlapping rectangles
 * and resolve without storing the current state of
 * each light individually?
 * 
 * Some thoughts:
 * - A "turn *" command means any previous command can be ignored
 * - Overlapping "toggle" can be reduced to 0 or 1 toggle
 * 
 * Experiment:
 * 1. "turn on 0,0 through 999,999" => push [on, 0, 0, 999, 999]
 * 2. "toggle 0,0 through 999,0" => push [toggle, 0, 0, 999, 0]
 * 3. "turn off 499,499 through 500,500" => push [off, 499, 499, 500, 500]
 * 
 * Idea 1:
 * Iterate over the board, and for each position search through
 * the stack until first relevant "on" / "off" termination found
 * 
 * If "toggle" is found flip a "toggle" boolean.
 * 
 * - 0,0 hits 2, then 1 => !on
 * - 0,1 hits 1 => on
 * ...
 * - 499,499 hits 3 => off
 * 
 * Would likely depend on stack depth => could potentially prune "covered"
 * squares in the stack (ie under an "off" or "on" block). Bet the GPU would
 * be fast at this!
 */

function test() {
  assert.equal(fireHazard('turn on 0,0 through 999,999'), 1_000_000);
  assert.equal(fireHazard('toggle 0,0 through 999,0'), 1_000);
  assert.equal(fireHazard('turn on 499,499 through 500,500'), 4);

  assert.equal(
    fireHazard(
      // 1_000_000 on, 1000 turned off, 4 turned off
      'turn on 0,0 through 999,999\ntoggle 0,0 through 999,0\nturn off 499,499 through 500,500'),
      1_000_000 - 1000 - 4
  );
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