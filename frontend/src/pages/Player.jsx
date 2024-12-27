import React, { useState } from 'react';
import { Container, TextField, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, DialogContentText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Player = () => {
    const [players, setPlayers] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // For delete confirmation dialog
    const [playerName, setPlayerName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [profile, setProfile] = useState('');
    const [city, setCity] = useState('');
    const [parentName, setParentName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [menuAnchorEl, setMenuAnchorEl] = useState(null); // For managing the menu
    const [selectedPlayer, setSelectedPlayer] = useState(null); // To store the selected player for editing/deleting
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPlayer = {
            playerName,
            birthday,
            gender,
            schoolName,
            profile,
            city,
            parentName,
            phone,
            email,
        };
        if (selectedPlayer) {
            // Update the existing player if it's an edit
            setPlayers(players.map(player => (player === selectedPlayer ? newPlayer : player)));
        } else {
            setPlayers([...players, newPlayer]);
        }
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        setPlayerName('');
        setBirthday('');
        setGender('');
        setSchoolName('');
        setProfile('');
        setCity('');
        setParentName('');
        setPhone('');
        setEmail('');
        setSelectedPlayer(null); // Clear selected player after closing
    };

    const handleMenuClick = (event, player) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedPlayer(player);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedPlayer(null);
    };

    const handleEdit = () => {
        // Fill the form with the player's existing data for editing
        setPlayerName(selectedPlayer.playerName);
        setBirthday(selectedPlayer.birthday);
        setGender(selectedPlayer.gender);
        setSchoolName(selectedPlayer.schoolName);
        setProfile(selectedPlayer.profile);
        setCity(selectedPlayer.city);
        setParentName(selectedPlayer.parentName);
        setPhone(selectedPlayer.phone);
        setEmail(selectedPlayer.email);
        setOpen(true); // Open the dialog for editing
    };

    const handleDelete = () => {
        setPlayers(players.filter(player => player !== selectedPlayer));
        handleCloseDeleteDialog();
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedPlayer(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976D2' }}>
                Players List
            </Typography>

            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '10px' }}>
                <Table sx={{ minWidth: 'md' }} aria-label="player table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Birthday</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Gender</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
                            {/* <TableCell></TableCell> For the menu */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map((player, index) => (
                            <TableRow key={index}>
                                <TableCell>{player.playerName}</TableCell>
                                <TableCell>{player.birthday}</TableCell>
                                <TableCell>{player.gender}</TableCell>
                                <TableCell>
                                    <IconButton onClick={(e) => handleMenuClick(e, player)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <IconButton
                color="primary"
                onClick={() => setOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    backgroundColor: '#1976D2',
                    '&:hover': { backgroundColor: '#1565C0' },
                    boxShadow: 3,
                    borderRadius: '50%',
                    padding: 2,
                }}
            >
                <AddIcon sx={{ fontSize: 20, color: 'white' }} />
            </IconButton>

            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(5px)' }}>
                <DialogTitle sx={{ backgroundColor: '#1976D2', color: 'white', marginBottom: '1vh' }}>
                    {selectedPlayer ? 'Edit Player Information' : 'Add Player Information'}
                </DialogTitle>
                <DialogContent sx={{ marginTop: '1vh' }}>
                    <TextField
                        fullWidth
                        label="Player Name"
                        variant="outlined"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                    <TextField
                        label="Birthday"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        sx={{ mb: 2, borderRadius: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="body1">Gender</Typography>
                        <RadioGroup
                            row
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label="School Name"
                        variant="outlined"
                        fullWidth
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        sx={{ mb: 2, borderRadius: 2 }}
                    />
                    <TextField
                        label="Profile"
                        variant="outlined"
                        fullWidth
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        sx={{ mb: 2, borderRadius: 2 }}
                    />
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        sx={{ mb: 2, borderRadius: 2 }}
                    />
                    <TextField
                        label="Parent Name (Optional)"
                        variant="outlined"
                        fullWidth
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        sx={{ mb: 2, borderRadius: 2 }}
                    />
                    <TextField
                        label="Phone (Optional)"
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ mb: 2, borderRadius: 2 }}
                    />
                    <TextField
                        label="Email (Optional)"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2, borderRadius: 2 }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#1976D2' }}>
                    <Button onClick={handleClose} color="secondary" sx={{ color: 'white' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" sx={{ backgroundColor: '#1565C0', color: 'white', '&:hover': { backgroundColor: '#0d47a1' } }}>
                        {selectedPlayer ? 'Save Changes' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="delete-confirmation-title"
            >
                <DialogTitle id="delete-confirmation-title">
                    Are you sure you want to delete this player?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" sx={{ backgroundColor: '#d32f2f', color: 'white' }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={() => setOpenDeleteDialog(true)}>Delete</MenuItem>
            </Menu>
        </Container>
    );
};

export default Player;
