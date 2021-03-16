const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { default: Graph } = require("./graph/Graph");

app.use(cors());
app.use(express.json());

// Connect to database
const con = mysql.createConnection({
  host: "localhost",
  user: "francis",
  password: "password",
  database: "sheffield_city_centre",
});

// Create graphs
const carGraph = new Graph(con, 0);
const cycleGraph = new Graph(con, 1);
const footGraph = new Graph(con, 2);

app.put("/path", (req, res) => {
  const lng = req.body.lng;
  const lat = req.body.lat;

  con.query(
    "SELECT node_id FROM nodes WHERE longitude = ? AND latitude = ?",
    [lng, lat],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
