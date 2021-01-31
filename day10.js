/** Day 10: Adapter Array
 * https://adventofcode.com/2020/day/10

Part one: What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
Part two:
 */

const {
  datefy
} = require('./utils');

const pdata = datefy(10, x => parseInt(x, 10));

function countDifferences(adapters) {
  let count1 = 0;
  let count3 = 1;
  adapters.sort((a, b) => a - b);
  let previous = 0;

  for (let i = 0; i < adapters.length; i++) {
    if (i > 0) previous = adapters[i - 1];
    const diff = adapters[i] - previous;
    if (diff === 1) count1++;
    if (diff === 3) count3++;
  }

  return count1 * count3;
}

function countArrangements(adapters) {
  adapters = [0, ...adapters.sort((a, b) => a - b)];
  adapters.push(adapters[adapters.length - 1] + 3);
  return recursiveCount(adapters);
}

function recursiveCount(adapters, i = 0, memo = {}) {
  if (i in memo) return memo[i];
  if (i === adapters.length - 1) return 1;

  let variations = 0;

  if (adapters[i + 1] && ((adapters[i + 1] - adapters[i]) <= 3)) {
    variations+= recursiveCount(adapters, i + 1, memo)
  }

  if (adapters[i + 2] && ((adapters[i + 2] - adapters[i]) <= 3)) {
    variations+= recursiveCount(adapters, i + 2, memo)
  }

  if (adapters[i + 3] && ((adapters[i + 3] - adapters[i]) <= 3)) {
    variations+= recursiveCount(adapters, i + 3, memo)
  }

  memo[i] = variations;
  return variations;
}

// console.log(countDifferences(pdata)); // -> 2482
console.log(countArrangements(pdata)); // -> 96717311574016