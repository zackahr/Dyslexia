import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import GameTable from './GameTable';
import GameDialog from './GameDialog';
import DeleteDialog from './DeleteDialog';

const Game = () => {
  const [games, setGames] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameToDelete, setGameToDelete] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/game');
        setGames(response.data || []);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);

  const handleAddGame = () => {
    setCurrentGame(null);
    setOpen(true);
  };

  const handleEditGame = (game) => {
    setCurrentGame(game);
    setOpen(true);
  };

  const handleSaveGame = async (gameData) => {
    try {
      if (currentGame) {
        // Ensure that the current game has the ID and update the game
        const updatedGame = { ...currentGame, ...gameData };
        
        // If game already exists, perform a PUT request to update the game
        await axios.put(`http://localhost:3000/game/${updatedGame._id}`, updatedGame);
        
        // Update the games state with the updated game
        setGames((prev) => prev.map((g) => (g._id === updatedGame._id ? updatedGame : g)));
      } else {
        // If there's no current game (it's a new game), perform a POST request to add the game
        const response = await axios.post('http://localhost:3000/game', gameData);
        
        // Add the newly created game to the state
        setGames((prev) => [...prev, response.data]);
      }
      
      setOpen(false); // Close the dialog after saving
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const handleDeleteGame = async () => {
    try {
      if (!gameToDelete?._id) {
        console.error('No game ID to delete:', gameToDelete);
        return;
      }
      await axios.delete(`http://localhost:3000/game/${gameToDelete._id}`);
      setGames((prev) => prev.filter((g) => g._id !== gameToDelete._id));
      setDeleteDialogOpen(false); // Close the dialog after deletion
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976D2' }}>
        Games List
      </Typography>
      <GameTable
        games={games}
        onEditGame={handleEditGame}
        onDeleteGame={(game) => {
          console.log('Game to delete:', game); // Debugging
          setGameToDelete(game);
          setDeleteDialogOpen(true);
        }}
        onAddGame={handleAddGame}
      />

      <GameDialog
        open={open}
        onClose={() => setOpen(false)}
        game={currentGame}
        onSubmit={handleSaveGame}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={handleDeleteGame}
      />
    </Container>
  );
};

export default Game;
