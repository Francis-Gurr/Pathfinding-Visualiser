import Dijkstra from "./algorithms/Dijkstra";
import PathTreeNode from "./path/PathTreeNode";

const Path = (sourceNode) => {
  var pathNodes; // Array of PathTreeNode objects in visited order nodes[0] is the source node
  var pathNodeMap; // KEY: node id, VALUE: index of node in pathNodes array

  // Add a graph node to the path tree
  const add = (node) => {
    pathNodes.push(node);
    pathNodeMap.set(node.id, pathNodes.length - 1);
  };
};

export default PathTree;
