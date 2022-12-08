import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

// Make a grid of all the trees
const grid = input
  .split('\r\n')
  .map((line) => line.split(''))
  .map((line) => line.map((n) => parseInt(n)));

const visibleTrees = new Set();

for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[x].length; y++) {
    const currentTree = grid[x][y];

    const surroundingTrees: number[][] = [[], [], [], []];

    const outerHorizontal = (!grid[x][y - 1] && grid[x][y - 1] !== 0) || (!grid[x][y + 1] && grid[x][y + 1] !== 0);
    const outerVertical = !grid[x - 1] || !grid[x + 1];

    if (outerHorizontal) {
      // This it an outer tree
      visibleTrees.add(`${x},${y}`);
    } else {
      // This has trees left and right of it

      // Loop through the trees on this line
      for (let k = 0; k < grid[x].length; k++) {
        // If j = k, then this is the same tree
        if (y !== k) {
          if (k < y) {
            surroundingTrees[0].push(grid[x][k]);
          } else {
            surroundingTrees[1].push(grid[x][k]);
          }
        }
      }
    }

    if (outerVertical) {
      // This it an outer tree
      visibleTrees.add(`${x},${y}`);
    } else {
      // This has trees up and down of it

      // Loop through the trees on this column
      for (let k = 0; k < grid.length; k++) {
        // If i = k, then this is the same tree
        if (x !== k) {
          if (k < x) {
            surroundingTrees[2].push(grid[k][y]);
          } else {
            surroundingTrees[3].push(grid[k][y]);
          }
        }
      }
    }

    for (let trees of surroundingTrees) {
      if (currentTree > Math.max(...trees)) {
        visibleTrees.add(`${x},${y}`);
      }
    }
  }
}

// Part 1
console.log(visibleTrees.size);

const viewDistances: number[] = [];
for (let y = 0; y < grid.length; ++y) {
  for (let x = 0; x < grid[y].length; ++x) {
    const height = grid[y][x];
    let viewDistance = 1;
    let multiplier = 0;

    // Find all trees left of this tree
    for (let i = x - 1; i >= 0; --i) {
      // Increment the multiplier
      ++multiplier;
      // If the height of the tree is less than or equal to the height of the current tree, then it is blocked
      if (height <= grid[y][i]) {
        break;
      }
    }
    // Otherwise, add the multiplier to the view distance
    viewDistance *= multiplier;

    // Reset the multiplier and find all trees right of this tree
    multiplier = 0;
    for (let i = x + 1; i < grid[y].length; ++i) {
      // Increment the multiplier
      ++multiplier;
      // If the height of the tree is less than or equal to the height of the current tree, then it is blocked
      if (height <= grid[y][i]) {
        break;
      }
    }
    // Otherwise, add the multiplier to the view distance
    viewDistance *= multiplier;

    // Reset the multiplier and find all trees above this tree
    // etc...
    multiplier = 0;
    for (let j = y - 1; j >= 0; --j) {
      ++multiplier;
      if (height <= grid[j][x]) {
        break;
      }
    }
    viewDistance *= multiplier;

    multiplier = 0;
    for (let j = y + 1; j < grid.length; ++j) {
      ++multiplier;
      if (height <= grid[j][x]) {
        break;
      }
    }
    viewDistance *= multiplier;

    // Add the view distance to the array
    viewDistances.push(viewDistance);
  }
}

// Find the largest view distance
const viewDistance = Math.max(...viewDistances);

// Part 2
console.log(viewDistance);
