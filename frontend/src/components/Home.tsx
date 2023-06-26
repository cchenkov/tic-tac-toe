import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function Home() {
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Link to={`/online/${uuid()}`} style={{ margin: 4 }}>Online</Link>
      <Link to="/local" style={{ margin: 4 }}>Local</Link>
      <Link to="/cpu" style={{ margin: 4 }}>CPU</Link>
    </>
  );
}

export default Home;
