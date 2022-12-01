import fs from 'fs';
import path from 'path';

// Read in the input file
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

// Split the input into an array of strings (delimit by blank line)
const inputArray = input.split(/\r?\n\r?\n/);

// Split each array element into an array of strings (delimit by line break)
const items = inputArray.map((x) => x.split(/\r?\n/));

// Sum each array's elements
const sums = items.map((array) => array.reduce((a, b) => a + parseInt(b), 0));

// Find the highest sum
const max = Math.max(...sums);

// Part 1
console.log(max);

// Find the top three sums
const topThree = sums.sort((a, b) => b - a).slice(0, 3);

// Sum the top three
const topThreeSum = topThree.reduce((a, b) => a + b, 0);

// Part 2
console.log(topThreeSum);
