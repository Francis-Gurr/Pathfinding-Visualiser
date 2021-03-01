//const heap = require("./BinaryHeap");
import heap from "./BinaryHeap";
import PathNode from "./PathNode";

const Dikstra = (src, target, mode, con) => {
  const src = this.src;
  const target = this.target;
  const mode = this.mode; // Mode of transport (0: car, 1: bike, 2: foot)
  const binHeap = new BinaryHeap();
  let visitedNodes = []; // Array of nodes in visited order

  // Get edges in the forward direction (i.e. nodeId is the target)
  const queryForward = (nodeId) => {
    let sqlQuery = "SELECT * FROM edges WHERE target = ? AND ";
    switch (mode) {
      //car
      case 0:
        sqlQuery + mysql.escape("car != 0");
        break;
      // bike
      case 1:
        sqlQuery + mysql.escape("bike != 0");
        break;
      // foot
      case 2:
        sqlQuery + mysql.escape("foot != 0");
        break;
    }
    con.query(sqlQuery, [nodeId], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        return results;
      }
    });
  };

  // Get edges in the opposite direction (i.e. nodeId is the source)
  const queryReverse = (nodeId) => {
    let sqlQuery = "SELECT * FROM edges WHERE source = ? AND ";
    switch (mode) {
      //car
      case 0:
        sqlQuery + mysql.escape("car_reverse != 0");
        break;
      // bike
      case 1:
        sqlQuery + mysql.escape("bike_reverse != 0");
        break;
      // foot
      case 2:
        sqlQuery + mysql.escape("foot != 0");
        break;
    }
    con.query(sqlQuery, [nodeId], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        return results;
      }
    });
  };

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
