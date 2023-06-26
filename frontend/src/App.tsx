import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import CPUGameMenu from './components/CPUGameMenu';
import CPUGame from './components/CPUGame';
import LocalGame from './components/LocalGame';
import OnlineGame from './components/OnlineGame';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Layout />} >
        <Route path="online/:uid" element={<OnlineGame />} />
        <Route path="local" element={<LocalGame />} />
        <Route path="cpu" element={<CPUGameMenu />} />
        <Route path="cpu/easy" element={<CPUGame difficulty='easy' />} />
        <Route path="cpu/normal" element={<CPUGame difficulty='normal' />} />
        <Route path="cpu/hard" element={<CPUGame difficulty='hard' />} />
      </Route>
    </Routes>
  )
}

export default App;
