const BinaryHeap = () => {
  let heap = []; // heap array of GraphNode objects
  let map = new Map(); // KEY: node id, VALUE: Index of node in heap array

  // Swap two nodes in the heap
  const swap = (i, j) => {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
    // Update index of swapped keys in map
    map.set(heap[i].id, i);
    map.set(heap[j].id, j);
    return;
  };

  // Bubble up a node
  const bubbleUp = (i) => {
    while (i > 0) {
      // Swap if value of node is smaller than value of parent
      let parentIdx = Math.floor(i / 2);
      if (heap[i].distToSrc() < heap[parentIdx].distToSrc()) {
        swap(i, parentIdx);
        i = parentIdx;
      } else {
        break;
      }
    }
    return;
  };

  // Insert a new node into the heap
  const insert = (node) => {
    let i = heap.length; // Index at which to put new node (i.e at end of array)
    heap.push(node);
    map[node.id] = i;
    bubbleUp(i);
    return;
  };

  // Extract
  const extract = () => {
    const root = heap[0];
    map.delete(root.id); // Remove node from map
    // Put last node in the roots place
    heap[0] = heap[heap.length - 1];
    heap.pop();
    map.set(heap[0].id) = 0;

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
          heap[2 * parentIdx].distToSrc() < heap[2 * parentIdx + 1].distToSrc()
            ? 2 * parentIdx
            : 2 * parentIdx + 1;
      }

      // If the parent value is greater than the child; swap them
      if (heap[parentIdx].distToSrc() > heap[minChildIdx].distToSrc()) {
        swap(parentIdx, minChildIdx);
        parentIdx = minChildIdx;
      } else {
        break;
      }
    }
    return root;
  };

  // Decrease-Key
  const decreaseKey = (node) => {
    let i = map.get(node.id);
    //heap[i] = node;
    bubbleUp(i);
    return;
  };
};
//module.exports = { func };
export default BinaryHeap;
