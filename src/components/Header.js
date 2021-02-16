import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div>
        <h1 className='title'> Pathfinding Visualiser </h1>
      </div>
      <div>
        <button className="button">Start</button>
      </div>
    </header>
  );
};

export default Header
