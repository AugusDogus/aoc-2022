import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

// Make a grid of all the trees
const grid = input
  .split('\r\n')
  .map((line) => line.split(''))
  .map((line) => line.map((n) => parseInt(n)));

const visibleTrees = new Set();

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const currentTree = grid[i][j];

    const leftTrees: number[] = [];
    const rightTrees: number[] = [];

    const upTrees: number[] = [];
    const downTrees: number[] = [];

    const outerHorizontal = (!grid[i][j - 1] && grid[i][j - 1] !== 0) || (!grid[i][j + 1] && grid[i][j + 1] !== 0);
    const outerVertical = !grid[i - 1] || !grid[i + 1];

    if (outerHorizontal) {
      // This it an outer tree
      visibleTrees.add(`${i},${j}`);
    } else {
      // This has trees left and right of it

      // Loop through the trees on this line
      for (let k = 0; k < grid[i].length; k++) {
        // If j = k, then this is the same tree
        if (j !== k) {
          if (k < j) {
            leftTrees.push(grid[i][k]);
          } else {
            rightTrees.push(grid[i][k]);
          }
        }
      }
    }

    if (outerVertical) {
      // This it an outer tree
      visibleTrees.add(`${i},${j}`);
    } else {
      // This has trees up and down of it

      // Loop through the trees on this column
      for (let k = 0; k < grid.length; k++) {
        // If i = k, then this is the same tree
        if (i !== k) {
          if (k < i) {
            upTrees.push(grid[k][j]);
          } else {
            downTrees.push(grid[k][j]);
          }
        }
      }
    }

    // Check if there are any trees in the way
    const leftVisible = currentTree > Math.max(...leftTrees);
    const rightVisible = currentTree > Math.max(...rightTrees);
    const upVisible = currentTree > Math.max(...upTrees);
    const downVisible = currentTree > Math.max(...downTrees);

    const visible = leftVisible || rightVisible || upVisible || downVisible;

    if (visible) {
      visibleTrees.add(`${i},${j}`);
    }
  }
}

console.log(visibleTrees.size);
