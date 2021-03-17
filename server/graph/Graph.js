import { query } from "express";
import GraphNode from "./GraphNode";

const Graph = (con, transportMode) => {
  this.con = con;
  this.transportMode = transportMode; // 0 = car, 1 = cycle, 2 = foot
  var nodeMap; // KEY: node id, VALUE: GraphNode
  addNodes();
  addNeighbours();
  removeSingletons();

  // Add nodes to the node map
  const addNodes = () => {
    nodeMap = new Map();
    // Query node table in database
    let rows = queryNodeTable();
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].node_id;
      let lat = rows[i].latitude;
      let long = rows[i].longitude;

      node = new GraphNode(id, lat, long);
      nodeMap.set(id, node);
    }
  };

  // Find and add neighbours to the graph nodes
  const addNeighbours = () => {
    // Query edge table in database
    let rows = queryEdgeTable();
    for (let i = 0; i < rows.length; i++) {
      let sourceID = rows[i].source;
      let targetID = rows[i].target;
      let distance = rows[i].distance;
      let geometry = rows[i].geometry;

      let sourceNode = nodeMap.get(sourceID);
      let targetNode = nodeMap.get(targetID);
      sourceNode.addNeighbour(targetNode, distance, geometry);
    }
  };

  // Remove singleton nodes, i.e. nodes with no edges/neighbours
  const removeSingletons = () => {
    for (let [id, node] of nodeMap) {
      if (!node.hasNeighbours) {
        nodeMap.delete(id);
      }
    }
  };

  // Get the node id of the nearest node in the graph to a location (latitude, longitude)
  const getNearestNodeID = (latitude, longitude) => {
    let nearestNodeID;
    let minDistance;
    for (let [id, node] of nodeMap) {
      // Calculate distance between node and location
      let distance = calcDistance(node.lat, node.long, latitude, longitude);
      // If distance is the new minimum, update minimum distance and nearest node
      if (minDistance === null || distance < minDistance) {
        minDistance = distance;
        nearestNodeID = id;
      }
    }
    return nearestNodeID;
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
  const getNeighbours = (nodeID) => {
    return nodeMap.get(nodeID).neighbours;
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
