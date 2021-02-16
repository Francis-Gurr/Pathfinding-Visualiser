import './Header.css';

const Header = ({onStart}) => {
  const handleClick = () => {
    console.log('I was clicked');
  }
  
  return (
    <header className='header'>
      <div>
        <h1 className='title'> Pathfinding Visualiser </h1>
      </div>
      <div>
        <button className="button" onClick={onStart}>Start</button>
      </div>
    </header>
  );
};

export default Header
