const BinaryHeap = () => {
  let heap = [];
  let map = new Map(); // Index of each key

  // Swap two keys in a heap
  const swap = (i, j) => {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
    // Update index of swapped keys in map
    map[heap[i]] = i;
    map[heap[j]] = j;
    return;
  };

  // Bubble up a key
  const bubbleUp = (i) => {
    while (i > 0) {
      // Swap if value of key is smaller than value of parent
      let parentIdx = Math.floor(i / 2);
      if (heap[i] < heap[parentIdx]) {
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
    let i = heap.length; // Index at which to put new key (i.e at end of array)
    heap.push(key);
    map[key] = i;
    bubbleUp(i);
    return;
  };

  // Extract
  const extract = () => {
    const root = heap[0];
    map.delete[root]; // Remove key from map
    // Put last key in the roots place
    heap[0] = heap[heap.length - 1];
    heap.pop();
    map[heap[0]] = 0;

    // Bubble down the new root
    let parentIdx = 0;
    while (2 * parentIdx <= heap.length) {
      // Get the child with the smallest value
      let minChildIdx;
      // If only one child, then it is the minimum
      // Else compare both children to find smallest
      if (2 * parentIdx + 1 > heap.length) {
        minChildIdx = 2 * parentIdx;
      } else {
        minChildIdx =
          heap[2 * parentIdx] < heap[2 * parentIdx + 1]
            ? 2 * parentIdx
            : 2 * parentIdx + 1;
      }

      // If the parent value is greater than the child; swap them
      if (heap[parentIdx] > heap[minChildIdx]) {
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
    if (heap[i] < newValue) {
      heap[i] = newValue;
      bubbleUp(i);
    }
    return;
  };
};
//module.exports = { func };
export default { binaryHeap };
