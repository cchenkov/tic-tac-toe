import { Link } from 'react-router-dom';

function CPUGameMenu() {
  return (
    <>
      <h2>Difficulty</h2>
      <Link to="/cpu/easy" style={{ margin: 4 }}>Easy</Link>
      <Link to="/cpu/normal" style={{ margin: 4 }}>Normal</Link>
      <Link to="/cpu/hard" style={{ margin: 4 }}>Hard</Link>
    </>
  );
}

export default CPUGameMenu;
