/** Day 9: Encoding Error
 * https://adventofcode.com/2020/day/9

Part one: find the first number in the list (after the preamble) which is not the sum of two of the 25 numbers before it.
Part two: find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1. Add together the smallest and largest number in this contiguous range.
*/

const {
  datefy
} = require('./utils');

const pdata = datefy(9, x => parseInt(x, 10));

function findSumPt1(input) {
  const preamble = 25;
  for (let i = preamble; i < input.length; i++) {
    let found = false;
    for (let j = i - preamble; j < input.length - 1; j++) {
      for (let k = i - preamble + 1; k < input.length; k++) {
        if (input[i] === input[j] + input[k]) {
          found = true;
          continue;
        }
      }
    }
    if (!found) return input[i];
  }
  return null;
}

function findSumPt2(input) {
  const target = 14360655;

  for (let i = 0; i < input.length; i++) {
    if (input[i] >= target) continue;
    let sum = input[i];
    let j = i + 1;

    while (sum < target) {
      sum+= input[j];
      if (sum === target) return getSumMinMax(i, j, input);
      else j++;
    }
  }

  return null;
}

function getSumMinMax(i, j, input) {
  let min = input[i];
  let max = input[i];
  for (let k = i + 1; k <= j; k++) {
    if (input[k] < min) min = input[k];
    if (input[k] > max) max = input[k];
  }
  return min + max;
}


// console.log(findSumPt1(pdata)); // -> 14360655
console.log(findSumPt2(pdata)); // -> 1962331