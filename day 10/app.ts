import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const lines = input.split('\r\n');

let register = 1;

let instructions: number[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line === 'noop') instructions.push(0);
  if (line.split(' ')[0] === 'addx') {
    instructions.push(0);
    instructions.push(parseInt(line.split(' ')[1]));
  }
}

const strengths: number[] = [];
const logCycles = [20, 60, 100, 140, 180, 220];

for (let [index, addend] of instructions.entries()) {
  if (logCycles.includes(index + 1)) {
    strengths.push(register * (index + 1));
  }
  register += addend;
}

// Sum all the strengths
const strength = strengths.reduce((a, b) => a + b, 0);

// Part 1
console.log(strength);

instructions = [];
register = 1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [instruction, addend] = line.split(' ');

  instructions.push(0);

  if (instruction === 'addx') instructions.push(parseInt(addend));
}

const grid: string[][] = Array.from({ length: 6 }, () => new Array(40).fill(' '));

for (let [index, addend] of instructions.entries()) {
  const [dx, dy] = [index % 40, Math.floor(index / 40)];

  const shouldPaint = dx === register || dx === register - 1 || dx === register + 1;
  grid[dy][dx] = shouldPaint ? 'X' : ' ';
  register += addend;
}

// Part 2
grid.forEach((row) => {
  console.log(row.join(''));
});
