import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const lines = input.split('\r\n');

let currentPath = '/';
let inDirectory = false;
const files: { [path: string]: { type: 'dir'; size: number } | { type: 'file'; size: number } } = { '/': { type: 'dir', size: 0 } };

// Loop over each line
for (const line of lines) {
  // If the line starts with $ cd, we are changing directories
  if (line.startsWith('$ cd')) {
    inDirectory = false;
    const directory = line.split(' ')[2];
    currentPath =
      directory === '..'
        ? currentPath.slice(0, currentPath.lastIndexOf('/'))
        : directory.startsWith('/')
        ? directory
        : (currentPath === '/' ? '' : currentPath) + '/' + directory;
  } else if (line.startsWith('$ ls')) {
    inDirectory = true;
  } else if (inDirectory) {
    // Check if it's a file size or a directory
    const [size, path] = line.split(' ');
    if (parseInt(size)) {
      files[currentPath + '/' + path] = { type: 'file', size: parseInt(size) };
    } else {
      files[currentPath + '/' + path] = { type: 'dir', size: 0 };
    }
  }
}

for (const key of Object.keys(files)) {
  if (files[key].type === 'dir') {
    let size = 0;

    for (const [_key, _value] of Object.entries(files)) {
      if (_key.startsWith(key) && _value.type === 'file') {
        size += _value.size;
      }
    }

    files[key].size = size;
  }
}

let totalSize = 0;
for (const [key, value] of Object.entries(files)) {
  if (value.type === 'dir' && value.size <= 100_000) {
    totalSize += value.size;
  }
}

// Part 1
console.log(totalSize);

// Filesystem Capacity
const capacity = 70_000_000;
const requiredFreeSpace = 30_000_000;

const freeSpace = capacity - files['/'].size;
const requiredToDelete = requiredFreeSpace - freeSpace;

// Find all directories that are larger than requiredToDelete
let largeDirectories: typeof files[] = [];

for (const [key, value] of Object.entries(files)) {
  if (value.type === 'dir' && value.size > requiredToDelete) {
    largeDirectories.push({ [key]: value });
  }
}

// Find the smallest large directory
let smallestLargeDirectory: typeof files = {};
let smallestSize = Infinity;

for (const directory of largeDirectories) {
  for (const [key, value] of Object.entries(directory)) {
    if (value.size < smallestSize) {
      smallestSize = value.size;
      smallestLargeDirectory = directory;
    }
  }
}

// Part 2
console.log(smallestLargeDirectory[Object.keys(smallestLargeDirectory)[0]].size);
