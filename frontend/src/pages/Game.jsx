import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, TextField, Menu, MenuItem,
    Container, TableContainer, Paper, Typography, Box,
} from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const Game = () => {
    const [games, setGames] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentGameIndex, setCurrentGameIndex] = useState(null);
    const [newGameName, setNewGameName] = useState('');
    const [gameToDelete, setGameToDelete] = useState(null);
    const [error, setError] = useState(false);
    const [menuRowIndex, setMenuRowIndex] = useState(null);

    const navigate = useNavigate();

    // Fetch games from the server
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/game'); // Replace with your API endpoint
                if (Array.isArray(response.data)) {
                    setGames(response.data);
                } else {
                    console.error('Expected an array but received:', response.data);
                    setGames([]); // Fallback to an empty array
                }
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        fetchGames();
    }, []);

    const handleAddGame = () => {
        setOpen(true);
        setCurrentGameIndex(null);
        setNewGameName('');
        setError(false);
    };

    const handleClose = () => {
        setOpen(false);
        setNewGameName('');
        setCurrentGameIndex(null);
        setError(false);
    };

    const handleMenuOpen = (event, index) => {
        setAnchorEl(event.currentTarget);
        setMenuRowIndex(index);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuRowIndex(null);
    };

    const handleSaveGame = async () => {
        if (newGameName.trim() === '') {
            setError(true);
            return;
        }

        try {
            if (currentGameIndex !== null) {
                // Update existing game
                const updatedGame = { ...games[currentGameIndex], name: newGameName };
                await axios.put(`http://localhost:3000/game/${updatedGame.id}`, updatedGame); // Replace with your API endpoint
                const updatedGames = [...games];
                updatedGames[currentGameIndex] = updatedGame;
                setGames(updatedGames);
            } else {
                // Add new game
                const newGame = { name: newGameName, date: new Date().toISOString() };
                const response = await axios.post('http://localhost:3000/game', newGame); // Replace with your API endpoint
                setGames([...games, response.data]);
            }
            handleClose();
        } catch (error) {
            console.error('Error saving game:', error);
        }
    };

    const handleDeleteDialogOpen = (index) => {
        setGameToDelete(index);
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setGameToDelete(null);
    };

    const handleDeleteGame = async () => {
        try {
            const game = games[gameToDelete];
            await axios.delete(`http://localhost:3000/game/${game.id}`); // Replace with your API endpoint
            setGames(games.filter((_, i) => i !== gameToDelete));
        } catch (error) {
            console.error('Error deleting game:', error);
        }
        handleDeleteDialogClose();
    };

    const handleRowClick = (index) => {
        navigate('/play', { state: { game: games[index] } });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976D2' }}>
                Games List
            </Typography>
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'primary.main' }}>
                                Game Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'primary.main' }}>
                                Date Created
                            </TableCell>
                            <TableCell align="right">
                                <IconButton color="primary" onClick={handleAddGame} aria-label="Add Game">
                                    <Add />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(games) && games.length > 0 ? (
                            games.map((game, index) => (
                                <TableRow key={game.id} /* other props */>
                                    <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(index)}>
                                        {game.name}
                                    </TableCell>
                                    <TableCell>{new Date(game.date).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={(event) => handleMenuOpen(event, index)}>
                                            <MoreVert />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl && menuRowIndex === index)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    setCurrentGameIndex(index);
                                                    setNewGameName(game.name);
                                                    setOpen(true);
                                                    handleMenuClose();
                                                }}
                                            >
                                                Edit
                                            </MenuItem>
                                            <MenuItem onClick={() => handleDeleteDialogOpen(index)}>Delete</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No games available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for adding/editing a game */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentGameIndex !== null ? 'Edit Game' : 'Add Game'}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Game Name"
                        value={newGameName}
                        onChange={(e) => {
                            setNewGameName(e.target.value);
                            setError(false);
                        }}
                        error={error}
                        helperText={error ? 'Game name cannot be empty' : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSaveGame} variant="contained">
                        {currentGameIndex !== null ? 'Save Changes' : 'Add Game'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for deleting a game */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this game?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                    <Button onClick={handleDeleteGame} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Game;
