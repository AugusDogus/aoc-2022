import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const assignments = input.split(/\r?\n/).map((line) => {
  const [first, second] = line.split(',');
  return { first, second };
});

let overlaps = 0;

// Loop through each assignment and check if the ranges overlap
assignments.forEach((assignment) => {
  // Fill the ranges
  const firstRange = assignment.first.split('-').map((num) => parseInt(num, 10));
  const secondRange = assignment.second.split('-').map((num) => parseInt(num, 10));

  // Get the max and min of the ranges
  const firstStart = firstRange[0];
  const firstEnd = firstRange[1];
  const secondStart = secondRange[0];
  const secondEnd = secondRange[1];

  // Check if the ranges overlap
  const firstContainsSecond = firstStart <= secondStart && firstEnd >= secondEnd;
  const secondContainsFirst = secondStart <= firstStart && secondEnd >= firstEnd;

  // If the ranges overlap, increment the counter
  if (firstContainsSecond || secondContainsFirst) {
    overlaps++;
  }
});

// Part 1
console.log(overlaps);

let contains = 0;

for (const assignment of assignments) {
  const firstRange = assignment.first.split('-').map((x) => parseInt(x));
  const secondRange = assignment.second.split('-').map((x) => parseInt(x));

  const hasOverlap = firstRange[0] <= secondRange[1] && secondRange[0] <= firstRange[1];
  if (hasOverlap) contains++;
}

// Part 2
console.log(contains);
