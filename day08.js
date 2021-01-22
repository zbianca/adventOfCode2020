/** Day 8: Handheld Halting
 * https://adventofcode.com/2020/day/8

Part one: Immediately before any instruction is executed a second time, what value is in the accumulator?
Part two: Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?
*/

const {
  datefy
} = require('./utils');

function parseLine(line) {
  let [cmd, num] = line.split(' ');
  return [cmd, parseInt(num)];
}

const pdata = datefy(8, parseLine);

function getAccumulator(input) {
  const visited = new Array(input.length).fill(false);
  let acc = 0;
  let i = 0

  while (!visited[i] && i >= 0) {
    if (i === input.length) return [acc, false];
    visited[i] = true;
    let [cmd, num] = input[i];
    if (cmd === 'nop') {
      i++;
    } else if (cmd === 'acc') {
      acc += num;
      i++;
    } else {
      i += num;
    }
  }

  return [acc, visited[i]];
}

function fixBoot(input) {
  for (let i = 0; i < input.length; i++) {
    const inputCopy = input.slice();
    let cur = inputCopy[i];
    if (cur[0] === 'nop') inputCopy[i] = ['jmp', cur[1]];
    else if (cur[0] === 'jmp') inputCopy[i] = ['nop', cur[1]];
    else continue;

    const [acc, looped] = getAccumulator(inputCopy);

    if (!looped) return acc;
  }

  return null;
}

// console.log(getAccumulator(pdata)); // -> 1134, looped
console.log(fixBoot(pdata)); // -> 1205