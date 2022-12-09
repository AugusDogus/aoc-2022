import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const lines = input.split('\n');

let tailPosition = { x: 0, y: 0 };
let headPosition = { x: 0, y: 0 };

const positions = new Set<string>();

for (const line of lines) {
  const [direction, steps] = line.split(' ');

  let newPosition = { x: headPosition.x, y: headPosition.y };

  if (direction === 'L') {
    newPosition.x -= parseInt(steps);
  } else if (direction === 'R') {
    newPosition.x += parseInt(steps);
  } else if (direction === 'U') {
    newPosition.y += parseInt(steps);
  } else if (direction === 'D') {
    newPosition.y -= parseInt(steps);
  }

  const points = new Set<string>();

  let x = tailPosition.x;
  let y = tailPosition.y;

  let lastPoint = { x, y };

  while (x !== newPosition.x || y !== newPosition.y) {
    lastPoint = { x, y };
    points.add(`${x},${y}`);
    if (x < newPosition.x) {
      x++;
    } else if (x > newPosition.x) {
      x--;
    }

    if (y < newPosition.y) {
      y++;
    } else if (y > newPosition.y) {
      y--;
    }
  }

  tailPosition = lastPoint;
  headPosition = newPosition;

  points.forEach((p) => positions.add(p));
}

// Part 1
console.log(positions.size);

let rope = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

positions.clear();

for (const line of lines) {
  const [direction, steps] = line.split(' ');

  for (let moved = 0; moved < parseInt(steps); moved++) {
    const newEnd = { ...rope[0] };

    if (direction === 'R') {
      newEnd.x++;
    } else if (direction === 'L') {
      newEnd.x--;
    } else if (direction === 'U') {
      newEnd.y++;
    } else if (direction === 'D') {
      newEnd.y--;
    }
    rope[0] = newEnd;

    for (let knot = 0; knot < rope.length - 1; knot++) {
      let dx = rope[knot].x - rope[knot + 1].x;
      let dy = rope[knot].y - rope[knot + 1].y;
      if (Math.abs(dx) > 1) {
        rope[knot + 1].x += dx > 0 ? 1 : -1;
        if (Math.abs(dy) != 0) rope[knot + 1].y += dy > 0 ? 1 : -1;
      } else if (Math.abs(dy) > 1) {
        rope[knot + 1].y += dy > 0 ? 1 : -1;
        if (Math.abs(dx) != 0) rope[knot + 1].x += dx > 0 ? 1 : -1;
      }
    }

    positions.add(`${rope[9].x},${rope[9].y}`);
  }
}

// Part 2
console.log(positions.size);
