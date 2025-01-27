import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './components/Game/index';
import Player from './pages/Player';
import Login from './pages/Login';
import GamePDFs from './components/Game/GamePDFs';
import PdfViewer from './components/Game/PdfViewer';  // Create this new component for viewing PDFs

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
        <Route path="/game/:id" element={<GamePDFs />} />
        <Route path="/pdf/:pdfId" element={<PdfViewer />} /> {/* New route for PDF viewer */}
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
