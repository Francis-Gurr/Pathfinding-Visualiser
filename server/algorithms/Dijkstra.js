//const heap = require("./BinaryHeap");
import PathTree from "../Path";
import PathTreeNode from "../path/PathTreeNode";
import heap from "./BinaryHeap";

const Dikstra = (sourceNode, targetNodeId, graph) => {
  var path = new Path();

  // Initialise heap with source node
  const binHeap = new BinaryHeap();
  binHeap.insert(sourceNode);

  // While heap is not empty
  while (binHeap.isNotEmpty()) {
    // Extract the min and add it to the path (i.e. visit it)
    let min = binHeap.extract();
    path.add(min);

    // Get neighbours
    let neighbours = min.neighbours; // Neighbours = [[GraphNode, distance, geometry], [gn, dist, geo], ... , [gn, dist, geo]]
    // Update distances to neighbours
    for (let i = 0; i < neighbours.length; i++) {
      let neighbourNode = neighbours[i][0];
      let distToSrcViaMin = min.distToSrc() + neighbours[i][1]; // Distance from neighbour to source going via min
      let currDistToSrc = neighbourNode.distToSrc(); // Current distance from neighbour to source

      // If the distance via min is shorter, update the path to be via min
      if (distToSrcViaMin < currDistToSrc) {
        neighbourNode.updatePath(min, distToSrcViaMin, neighbours[i][2]); // (previous = min, distance = via min, geometry)

        // If the current distance from neighbour to source is inf, then it has not been yet been seen, so add it to the binary heap
        if (!Number.isFinite(currDistToSrc)) {
          binHeap.insert(neighbourNode);
        }
        // Else if the distance via min is shorter, update the path to be via min
        else {
          binHeap.decreaseKey(neighbourNode);
        }
      }
    }
  }

  return path;
};

export default Dijkstra;
