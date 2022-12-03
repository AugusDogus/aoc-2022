import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const lines = input.split(/\r?\n/);

const alphabet = Object.assign(
  {},
  ...'abcdefghijklmnopqrstuvwxyz'.split('').map((letter, index) => {
    return {
      [letter]: index + 1,
    };
  })
);

let sum = 0;

lines.forEach((line) => {
  const first = line.slice(0, line.length / 2);
  const second = line.slice(line.length / 2);

  const common = first.split('').find((letter) => second.includes(letter)) as string;

  sum += alphabet[common.toLowerCase()];

  const isUpperCase = common === common.toUpperCase();

  if (isUpperCase) sum += 26;
});

// Part 1
console.log(sum);

// Batch every 3 lines into an array
const rucksacks = lines.reduce((acc, line, index) => {
  if (index % 3 === 0) {
    acc.push([]);
  }

  acc[acc.length - 1].push(line);

  return acc;
}, [] as string[][]);

const badges = rucksacks.map((rucksack) => {
  const [first, second, third] = rucksack;

  const common = first.split('').find((letter) => second.includes(letter) && third.includes(letter)) as string;

  return common;
});

sum = 0;

// Find the sums of the common letters
badges.forEach((badge) => {
  sum += alphabet[badge.toLowerCase()];

  const isUpperCase = badge === badge.toUpperCase();

  if (isUpperCase) sum += 26;
});

// Part 2
console.log(sum);
