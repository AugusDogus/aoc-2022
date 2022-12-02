import fs from 'fs';
import path from 'path';

// Read in the input file
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

// Split the input into an array of strings (delimit by line)
const lines = input.split(/\r?\n/);

const parsed = lines.map((line) => line.split(' '));

const translate = {
  X: 'A',
  Y: 'B',
  Z: 'C',
};

const choices = {
  A: {
    beats: 'C',
    loses: 'B',
    score: 1,
  },
  B: {
    beats: 'A',
    loses: 'C',
    score: 2,
  },
  C: {
    beats: 'B',
    loses: 'A',
    score: 3,
  },
};

const win = 6;
const draw = 3;

let score = 0;

parsed.forEach((game) => {
  let [opponent, me] = game;

  if (translate[me] === opponent) {
    // We drew
    score += draw;
  }

  if (choices[translate[me]].beats === opponent) {
    // We won
    score += win;
  }

  score += choices[translate[me]].score;
});

// Part 1
console.log(score);

score = 0;

const strategyChoices = {
  draw: {
    A: 'A',
  },
};

parsed.forEach((game) => {
  let [opponent, me] = game;
  if (me === 'X') {
    // We want to lose
    score += choices[choices[opponent].beats].score;
  } else if (me === 'Y') {
    // We want to draw
    score += choices[opponent].score;
    score += draw;
  } else {
    // We want to win
    score += choices[choices[opponent].loses].score;
    score += win;
  }
});

// Part 2
console.log(score);
