const GraphNode = (id, lat, long) => {
  this.id = id; // OSM node id
  this.lat = lat;
  this.long = long;
  var neighbours = []; // Neighbours = [[GraphNode, distance, geometry], [gn, dist, geo], ... , [gn, dist, geo]]

  const hasNeighbours = () => {
    return neighbours.length > 0;
  };

  const addNeighbour = (node, distance, geometry) => {
    neighbours.push([node, distance, geometry]);
  };
};

export default GraphNode;
