const sum = require('./sumDice');

test('adds 1 + 2 to equal 3', () => {
  expect(sumDice(1, 2)).toBe(3);
});