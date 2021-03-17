const GraphNode = (id, lat, long) => {
  this.id = id; // OSM node id
  this.lat = lat;
  this.long = long;
  var neighbours = []; // Neighbours = [[GraphNode, distance to neighbour, geometry], [gn, dist, geo], ... , [gn, dist, geo]]
  var pathToSrc = { previous: null, distance: inf, geometry: null }; // [previous GraphNode, distance to source, geometry of previous edge]

  const hasNeighbours = () => {
    return neighbours.length > 0;
  };

  const addNeighbour = (node, distance, geometry) => {
    neighbours.push([node, distance, geometry]);
  };

  const distToSrc = () => {
    return pathToSrc.distance;
  };

  const updatePath = (previous, distance, geometry) => {
    pathToSrc.previous = previous;
    pathToSrc.distance = distance;
    pathToSrc.geometry = geometry;
  };
};

export default GraphNode;
