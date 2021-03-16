//const heap = require("./BinaryHeap");
import heap from "./BinaryHeap";

const Dikstra = (srcNodeId, graph) => {
  const target = this.target;
  let visitedNodes = []; // Array of nodes in visited order [[srcNodeId, 0, 0], [node id, pointer to previous node, distance to source], ...]

  // Initialise heap with src node with distance 0 and it's neighbours
  const binHeap = new BinaryHeap();
  binHeap.insert([srcNodeId, 0, 0]);

  // While heap is not empty
  while (binHeap.isNotEmpty()) {
    // Extract the min (i.e. visit it, add to visitedNodes array)
    let min = binHeap.extract();
    // Get neighbours
    let neighbours = graph.getNeighbours(min); // [[neighbour 1, distance], [neighbour 2, distance], ... , [neighbour n, distance]]
    // Update distances to neighbours
    for (let i = 0; i < neighbours.length; i++) {
      let nodeId = neighbours[i][0];
      let previousPointer = visitedNodes.length; // Pointer to the previous node (i.e. min) in visitedNodes array
      let distanceToSrc = min.distance + neighbours[i][1];
      binHeap.decreaseKey([nodeId, previousPointer, distanceToSrc]);
    }
    visitedNodes.push(min);
  }

  return visitedNodes;
};

export default Dijkstra;
