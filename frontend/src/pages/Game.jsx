import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, TextField, Menu, MenuItem,
    Container, TableContainer, Paper, Typography, Box,
} from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';
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
    const [menuRowIndex, setMenuRowIndex] = useState(null); // Track the index of the menu

    const navigate = useNavigate(); // Create navigate function

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
        setMenuRowIndex(index); // Set the row index of the menu
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuRowIndex(null); // Reset the menu index
    };

    const handleSaveGame = () => {
        if (newGameName.trim() === '') {
            setError(true);
            return;
        }
        if (currentGameIndex !== null) {
            const updatedGames = [...games];
            updatedGames[currentGameIndex] = {
                ...updatedGames[currentGameIndex],
                name: newGameName,
            };
            setGames(updatedGames);
        } else {
            setGames([...games, { name: newGameName, date: new Date().toLocaleDateString() }]);
        }
        handleClose();
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

    const handleDeleteGame = () => {
        setGames(games.filter((_, i) => i !== gameToDelete));
        handleDeleteDialogClose();
    };

    // Handle navigation to the /play page when a game row is clicked
    const handleRowClick = (index) => {
        navigate('/play', { state: { game: games[index] } }); // Pass the game data via state
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
                        {games.map((game, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                    '&:hover': { backgroundColor: '#f1f1f1' },
                                }}
                            >
                                <TableCell sx={{cursor: 'pointer'}} onClick={() => handleRowClick(index)}>{game.name}</TableCell>
                                <TableCell>{game.date}</TableCell>
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
                                                setCurrentGameIndex(index); // Use the correct index
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for adding/editing a game */}
            <Dialog sx={{ backdropFilter: 'blur(5px)' }} open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', pb: 2 }}>
                    {currentGameIndex !== null ? 'Edit Game' : 'Add Game'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ py: 2 }}>
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
                            sx={{
                                '& .MuiInputBase-root': { borderRadius: 2 },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'primary.main',
                                },
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button onClick={handleClose} sx={{ px: 4 }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveGame}
                        variant="contained"
                        color="primary"
                        sx={{
                            px: 4,
                            background: 'linear-gradient(to right, #1e3c72, #2a5298)',
                            color: '#fff',
                        }}
                    >
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
