# Pathfinding Visualiser - IN PROGRESS

Project aim is to be able to visualise path finding algrorithms in action with real map data.

Personal aim is to learn new skills. Before starting this project I have had little or no previous experience with many of the tools used (e.g. ReactJS, MySQL).
A secondary aim is to demonstrate my abilities.

Inspiration for the project originated from [Clement's pathfinding visualizer](https://clementmihailescu.github.io/Pathfinding-Visualizer/).
I thought it was a great project for visualising how different pathfinding algorithms work.
I wanted to put my own spin on the idea using real map data.

## Features (currently incomplete)
#### Front end
Uses [Mapbox GL JS](https://www.mapbox.com/) in a React app.
- Map will have moveable start and finish markers.
- Search box for finding specific marker locations.
- Inputs for algorithm selection and start.
- Animation showing the visited nodes in order.
- Depiction of the calculated path.

#### Back end
Uses MySQL to store the routing graph using map data from obtained from [OpenStreetMap](https://www.openstreetmap.org/).
- The OSM data is parsed into a routing graph using the [osm4routing](https://github.com/Tristramg/osm4routing) command-line tool.
- Path finding algorithms that return all the visited nodes and the final path nodes.


## Tasks
This project is still in progress and has not been completed yet.
Below is a rough design plan/task list.

#### Basic functionality
Achieve basic functionality; small map area, fixed start and end nodes, only Dijkstra's algorithm, only roads (no cycle-only/pedestrian routes).
- [ ] Create a simple React app with a Mapbox map.
- [ ] Create MySQL database of routing graph.
- [ ] Implement Dijkstra's algorithm.
- [ ] Create animation.

#### Further functionality
Add more functionality.
- [ ] Increase map area.
- [ ] Allow custom start and end nodes.
- [ ] Implement more path-finding algorithms.
- [ ] Add pedestrain/cycle routes.
