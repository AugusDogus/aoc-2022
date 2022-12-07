import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

// Split the input (delimit by an empty line and remove the empty line)
const [first, second] = input.split(/\r?\n\r?\n/);

const stackCount = parseInt(first.split('\n').reverse()[0].at(-2)!);
const crates = first.split('\n').reverse().slice(1);
const instructions = second.split('\n').map((x) => x.split(' ').map(Number));

const stacks: string[][] = [];

let result = '';

for (let i = 1; i <= stackCount; i++) stacks[i] = [];

crates.forEach((crate) => {
  let pos = 0;
  for (let i = 1; i <= stackCount; i++) {
    pos = i == 1 ? pos + 1 : pos + 3;
    if (crate.charAt(pos) != ' ') stacks[i].push(crate.charAt(pos));
    pos++;
  }
});

instructions.forEach((instruction) => {
  const amount = instruction[1];
  const from = instruction[3];
  const to = instruction[5];
  const b = [];

  for (let x = 0; x < amount; x++) stacks[to].push(stacks[from].pop()!);
  b.reverse().forEach((x) => stacks[to].push(x));
});

for (let i = 1; i <= stackCount; i++) if (stacks[i].length > 0) result += stacks[i].at(-1);

// Part 1
console.log(result);

result = '';

for (let i = 1; i <= stackCount; i++) stacks[i] = [];

crates.forEach((c) => {
  let pos = 0;

  for (let i = 1; i <= stackCount; i++) {
    pos = i == 1 ? pos + 1 : pos + 3;
    if (c.charAt(pos) != ' ') stacks[i].push(c.charAt(pos));
    pos++;
  }
});

instructions.forEach((i) => {
  const amount = i[1];
  const from = i[3];
  const to = i[5];
  const b: string[] = [];

  for (let x = 0; x < amount; x++) b.push(stacks[from].pop()!);
  b.reverse().forEach((x) => stacks[to].push(x));
});

for (let i = 1; i <= stackCount; i++) if (stacks[i].length > 0) result += stacks[i].at(-1);

// Part 2
console.log(result);
