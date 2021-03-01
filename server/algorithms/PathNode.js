const PathNode = (id, dist, head, geometry) => {
  this.id = id; // OSM node id
  this.dist = dist; // Distance to the source node
  this.head = head; // Index of next node in the array of visitedNodes
  this.edgeGeometry = edgeGeometry; // Geometry of the edge between this node and head
};
