//const heap = require("./BinaryHeap");
import heap from "./BinaryHeap";
import PathNode from "./PathNode";

const Dikstra = (src, target, mode) => {
  const src = this.src;
  const target = this.target;
  const mode = this.mode; // Mode of transport (0: car, 1: cycle, 2: foot)
  const binHeap = new BinaryHeap();
  let visitedNodes = []; // Array of nodes in visited order

  // Return rows where nodeId is in target column
  const queryTargets = (nodeId) => {};
  // Return rows where nodeId is in source column (i.e. reverse direction)
  const querySources = (nodeId) => {};

  // Get the neighbours of a node
  const getNeighbours = (node) => {
    let neighbours = [];
    // Check edges table for source column matches
    for (row in queryTargets) {
      const neigh = new PathNode(
        (id = targetCol),
        (distFromSrc = node.distFromSrc + lengthCol),
        (head = visitedNodes.length),
        (edgePath = wktCol)
      );
      neighbours.push(neigh);
    }
    // Check edges table for target column matches
    for (row in querySources) {
      const neigh = new pathNode(
        (id = sourceCol),
        (distFromSrc = node.distFromSrc + lengthCol),
        (head = visitedNodes.length),
        (edgePath = wktCol.reversed)
      );
      neighbours.push(neigh);
    }
    return neighbours;
  };

  // Initialise heap with src node with distance 0 and it's neighbours
  binHeap.insert(src);

  // While heap is not empty
  while (binHeap.isNotEmpty()) {
    // -> Extract the min (i.e. visit it, add to visited array)
    let min = binHeap.extract();
    let neighbours = getNeighbours(min);
    // Update distances to neighbours
    visitedNodes.push(min);
  }

  return visitedNodes;
};
