import './App.css';
import Map from './components/Map';
import Header from './components/Header';

function App() {
  
  // calc algo
  const algo = () => {
   console.log('run');
  };
  
  return (
    <div>
      <Header onStart={algo}/>
      <Map />
    </div>
  );
}

export default App;
