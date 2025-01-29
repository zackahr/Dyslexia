import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

const GameDialog = ({ open, onClose, game, onSubmit }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (game) {
      setName(game.name || '');
      setDate(game.date || '');
    } else {
      setName('');
      setDate('');
    }
  }, [game]);

  const handleSubmit = async () => {
    try {
      const gameData = { name, date };
      onSubmit(gameData);
      onClose();
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{game ? 'Edit Game' : 'Add Game'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Game Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Date Created"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{game ? 'Save Changes' : 'Add Game'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameDialog;
