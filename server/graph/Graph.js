import { query } from "express";
import GraphNode from "./GraphNode";

const Graph = (con, transportMode) => {
  this.con = con;
  this.transportMode = transportMode; // 0 = car, 1 = cycle, 2 = foot
  var adjacencyMap; // KEY: source node, VALUE: [[neighbour 1, distance], [neighbour 2, distance], ... , [neighbour n, distance]]
  populateAdjacencyMap();
  var nodeMap; // KEY: node id, VALUE: [lat, long]
  populateNodeMap();

  const populateAdjacencyMap = () => {
    adjacencyMap = new Map();
    // Query edge database for matching rows
    let rows = queryEdgeTable();
    for (let i = 0; i < rows.length; i++) {
      let source = rows[i].source;
      let target = rows[i].target;
      let distance = rows[i].distance;
      if (adjacencyMap.has(source)) {
        adjacencyMap.get(source).push([target, distance]);
      } else {
        adjacencyMap.set(source, [[target, distance]]);
      }
    }
  };

  const populateNodeMap = () => {
    nodeMap = new Map();
    let rows = queryNodeTable();
    for (let i = 0; i < rows.length; i++) {
      let node = rows[i].node_id;
      let lat = rows[i].latitude;
      let long = rows[i].longitude;
      // Add the node to the map if it is in the graph (i.e. connected to other nodes)
      if (adjacencyMap.has(node)) {
        nodeMap.set(node, [lat, long]);
      }
    }
  };

  // Get the node id of the nearest node in the graph to a location (latitude, longitude)
  const getNearestNode = (latitude, longitude) => {
    let nearestNode;
    let minDistance;
    for (let [key, value] of nodeMap) {
      let distance = calcDistance(value[0], value[1], latitude, longitude);
      if (minDistance === null || distance < minDistance) {
        minDistance = distance;
        nearestNode = key;
      }
    }
    return nearestNode;
  };

  // Calculates distance between a pair of latitude and longitude points using Haversine formula
  const calcDistance = (lat1, long1, lat2, long2) => {
    var p = Math.PI / 180;
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((long2 - long1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  };

  // Get the neighbours of a node
  const getNeighbours = (node) => {
    return adjacencyMap.get(node);
  };

  // Get data from edges table for this transport mode
  const queryEdges = () => {
    let sqlQuery = "SELECT * FROM edges WHERE ";
    switch (transportMode) {
      //car
      case 0:
        sqlQuery + mysql.escape("car != 0");
        break;
      // cycle
      case 1:
        sqlQuery + mysql.escape("cycle != 0");
        break;
      // foot
      case 2:
        sqlQuery + mysql.escape("foot != 0");
        break;
    }
    con.query(sqlQuery, [], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        return rows;
      }
    });
  };

  // Get data from edges table for this transport mode
  const queryEdgeTable = () => {
    // Create query
    let sqlQuery = "SELECT * FROM edges WHERE ";
    switch (transportMode) {
      //car
      case 0:
        sqlQuery + mysql.escape("car != 0");
        break;
      // cycle
      case 1:
        sqlQuery + mysql.escape("cycle != 0");
        break;
      // foot
      case 2:
        sqlQuery + mysql.escape("foot != 0");
        break;
    }
    // Query database
    con.query(sqlQuery, [], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        return rows;
      }
    });
  };

  // Get data from edges table for this transport mode
  const queryNodeTable = () => {
    let sqlQuery = "SELECT * FROM nodes";
    // Query database
    con.query(sqlQuery, [], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        return rows;
      }
    });
  };
};

export default Graph;
