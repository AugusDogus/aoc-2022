import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

// Keep track of the last four characters received.
const lastFour: string[] = [];

// Process each character in the input.
for (let i = 0; i < input.length; i++) {
  // Add the current character to the lastFour array.
  lastFour.push(input[i]);

  // If the lastFour array has more than four characters, remove the oldest one.
  if (lastFour.length > 4) {
    lastFour.shift();
  }

  // If the last four characters are all different, we have found the start-of-packet marker.
  if (new Set(lastFour).size === 4) {
    // Part 1
    console.log(i + 1);
    break;
  }
}

const lastFourteen: string[] = [];

// Process each character in the buffer.
for (let i = 0; i < input.length; i++) {
  // Add the current character to the lastFourteen array.
  lastFourteen.push(input[i]);

  // If the lastFourteen array has more than 14 characters, remove the oldest one.
  if (lastFourteen.length > 14) {
    lastFourteen.shift();
  }

  // If the last 14 characters are all different, we have found the start-of-message marker.
  if (new Set(lastFourteen).size === 14) {
    // Part 2
    console.log(i + 1);
    break;
  }
}
