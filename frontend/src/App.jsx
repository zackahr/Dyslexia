import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Player from './pages/Player';
import Login from './pages/Login';
import Play from './pages/Play';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/login' && <Navbar />} {/* Hide Navbar on /login */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/player" element={<Player />} />
        <Route path="/login" element={<Login />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </div>
  );
};

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
