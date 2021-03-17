const GraphNode = (id, lat, lng) => {
  this.id = id; // OSM node id
  this.lat = lat;
  this.lng = lng;
  var neighbours = []; // Neighbours = [[GraphNode, distance to neighbour, geometry], [gn, dist, geo], ... , [gn, dist, geo]]
  var pathToSrc = [null, Infinity, null]; // [previous GraphNode, distance to source, geometry of previous edge]

  const hasNeighbours = () => {
    return neighbours.length > 0;
  };

  const addNeighbour = (node, distance, geometry) => {
    neighbours.push([node, distance, geometry]);
  };

  const distToSrc = () => {
    return pathToSrc[1];
  };

  const updatePath = (previous, distance, geometry) => {
    pathToSrc = [previous, distance, geometry];
  };
};

export default GraphNode;
