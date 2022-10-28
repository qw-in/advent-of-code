const assert = require('assert');
const crypto = require('crypto');

function adventMine(input) {
  let out = 1;
  while (true) {
    const hash = crypto
      .createHash('md5')
      .update(`${input}${out}`)
      .digest("hex");

    if (hash.startsWith('000000')) {
      return out;
    }

    out++;
  }
}

function test() {
  assert.equal(false, true);
}

const [instruction] = process.argv.slice(2);

if (instruction === 'test') {
  test();
} else {
  console.log(adventMine(instruction));
}