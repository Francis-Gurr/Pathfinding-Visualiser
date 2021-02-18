const binHeap = [];
const map = new Map(); // Index of each key

// Swap two keys in a heap
const swap = (i, j) => {
  const temp = binHeap[i];
  binHeap[i] = binHeap[j];
  binHeap[j] = temp;
  // Update index of swapped keys in map
  map[binHeap[i]] = i;
  map[binHeap[j]] = j;
  return;
};

// Bubble up a key
const bubbleUp = (i) => {
  while (i > 0) {
    // Swap if value of key is smaller than value of parent
    let parentIdx = Math.floor(i / 2);
    if (binHeap[i] < binHeap[parentIdx]) {
      swap(i, parentIdx);
      i = parentIdx;
    } else {
      break;
    }
  }
  return;
};

// Insert a new key to the heap
const insert = (key) => {
  let i = binHeap.length; // Index at which to put new key (i.e at end of array)
  binHeap.push(key);
  map[key] = i;
  bubbleUp(i);
  return;
};

// Extract
const extract = () => {
  const root = binHeap[0];
  map.delete[root]; // Remove key from map
  // Put last key in the roots place
  binHeap[0] = binHeap[binHeap.length - 1];
  binHeap.pop();
  map[binHeap[0]] = 0;

  // Bubble down the new root
  let parentIdx = 0;
  while (2 * parentIdx <= binHeap.length) {
    // Get the child with the smallest value
    let minChildIdx;
    // If only one child, then it is the minimum
    if (2 * parentIdx + 1 > binHeap.length) {
      minChildIdx = 2 * parentIdx;
    } else {
      // Else compare the two children to find smallest
      minChildIdx =
        binHeap[2 * parentIdx] < binHeap[2 * parentIdx + 1]
          ? 2 * parentIdx
          : 2 * parentIdx + 1;
    }
    // If the parent value is greater than the child; swap them
    if (binHeap[parentIdx] > binHeap[minChildIdx]) {
      swap(parentIdx, minChildIdx);
      parentIdx = minChildIdx;
    } else {
      break;
    }
  }
  return root;
};

// Decrease-Key
const decreaseKey = (key, newValue) => {
  let i = map(key);
  //map.remove(key);
  binHeap[i] = newValue;
  //map[binHeap[i]] = i;
  bubbleUp(i);
  return;
};

//module.exports = { func };
export default { insert, extract, decreaseKey };
