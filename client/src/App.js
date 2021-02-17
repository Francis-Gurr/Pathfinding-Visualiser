import { useState } from "react";
import './App.css';
import Header from './components/Header';
import Map from './components/Map';

function App() {

  const [startLoc, setStart] = useState([-1.4717378, 53.3884883]); // Start marker location [lng, lat]
  const [endLoc, setEnd] = useState([-1.4741566, 53.3807122]); // End marker location [lng, lat]
  const [path, setPath] = useState([]); // Path
  
  // Get path from server
  const getPath = () => {
   console.log('run');
  };
  
  return (
    <div>
      <Header onStart={getPath} />
      <Map startLoc={startLoc} endLoc={endLoc} />
    </div>
  );
}

export default App;
