import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Button, Typography, FormControl,
    RadioGroup, FormControlLabel, Radio, Table, TableBody,
    TableCell, TableHead, TableRow, Paper, IconButton, Dialog,
    DialogActions, DialogContent, DialogTitle, Menu, MenuItem,
    DialogContentText, Box, InputAdornment, Tooltip, TableContainer
} from '@mui/material';
import {
    Add, MoreVert, Person, Cake, Male, Female,
    School, LocationCity, Phone, Email, ModeEdit,
    Delete, ErrorOutline, CalendarToday, AccountCircle,
    ContactMail, FamilyRestroom, Transgender, Settings
} from '@mui/icons-material';
import InputMask from 'react-input-mask';
import axios from 'axios';

const Player = () => {
    const [players, setPlayers] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [profile, setProfile] = useState('');
    const [city, setCity] = useState('');
    const [parentName, setParentName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
    };

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/players/');
                setPlayers(response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);

    const handleSubmit = async (e) => {
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
            try {
                await axios.put(`http://localhost:3000/players/${selectedPlayer._id}`, newPlayer);
                setPlayers(players.map(player => (player.id === selectedPlayer._id ? newPlayer : player)));
            } catch (error) {
                console.error('Error updating player:', error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:3000/players/', newPlayer);
                setPlayers([...players, response.data]);
            } catch (error) {
                console.error('Error adding player:', error);
            }
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
        setSelectedPlayer(null);
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
        setPlayerName(selectedPlayer.playerName);
        setBirthday(selectedPlayer.birthday);
        setGender(selectedPlayer.gender);
        setSchoolName(selectedPlayer.schoolName);
        setProfile(selectedPlayer.profile);
        setCity(selectedPlayer.city);
        setParentName(selectedPlayer.parentName);
        setPhone(selectedPlayer.phone);
        setEmail(selectedPlayer.email);
        setOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/players/${selectedPlayer._id}`);
            setPlayers(players.filter(player => player.id !== selectedPlayer._id));
        } catch (error) {
            console.error('Error deleting player:', error);
        }
        handleCloseDeleteDialog();
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedPlayer(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
            <Typography variant="h4" gutterBottom sx={{
                textAlign: 'center',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
            }}>
                <Person fontSize="large" /> Participant List
            </Typography>

            <TableContainer component={Paper} sx={{
                boxShadow: 3,
                borderRadius: '10px',
                '& .MuiTableCell-root': { py: 1.5 }
            }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'primary.light' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                                <Box display="flex" alignItems="center">
                                    <Person sx={{ mr: 1, fontSize: 20 }} /> Name
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                                <Box display="flex" alignItems="center">
                                    <Cake sx={{ mr: 1, fontSize: 20 }} /> Birthday
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                                <Box display="flex" alignItems="center">
                                    <Transgender sx={{ mr: 1, fontSize: 20 }} /> Gender
                                </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                                <Box display="flex" alignItems="center">
                                    <Settings sx={{ mr: 1, fontSize: 20 }} /> Actions
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map((player, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{player.playerName}</TableCell>
                                <TableCell>{formatDate(player.birthday)}</TableCell>
                                <TableCell>
                                    {player.gender === 'male' ?
                                        <Male color="primary" /> :
                                        <Female color="secondary" />}
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Actions">
                                        <IconButton onClick={(e) => handleMenuClick(e, player)}>
                                            <MoreVert color="action" />
                                        </IconButton>
                                    </Tooltip>
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
                    bottom: 32,
                    right: 32,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                    boxShadow: 6,
                    width: 56,
                    height: 56
                }}
            >
                <Add fontSize="large" />
            </IconButton>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 3,
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    '& .MuiSvgIcon-root': {
                        fontSize: '2rem'
                    }
                }}>
                    <AccountCircle /> {selectedPlayer ? 'Edit Participant' : 'New Participant'}
                </DialogTitle>
                <DialogContent sx={{ p: 4 }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3,
                        mb: 4
                    }}>
                        {/* Left Column */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Person fontSize="small" /> Personal Information
                            </Typography>

                            <TextField
                                fullWidth
                                label="Full Name"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />

                            <InputMask
                                mask="9999/99/99"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            >
                                {() => (
                                    <TextField
                                        fullWidth
                                        label="Date of Birth"
                                        placeholder="YYYY/MM/DD"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarToday color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                    />
                                )}
                            </InputMask>

                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Transgender fontSize="small" /> Gender
                                </Typography>
                                <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio color="primary" />}
                                        label={
                                            <Box display="flex" alignItems="center" sx={{ mr: 3 }}>
                                                <Male sx={{ mr: 1, color: 'primary.main' }} /> Male
                                            </Box>
                                        }
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio color="secondary" />}
                                        label={
                                            <Box display="flex" alignItems="center">
                                                <Female sx={{ mr: 1, color: 'secondary.main' }} /> Female
                                            </Box>
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        {/* Right Column */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationCity fontSize="small" /> Location & Education
                            </Typography>

                            <TextField
                                label="School Name"
                                value={schoolName}
                                onChange={(e) => setSchoolName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <School color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                fullWidth
                            />

                            <TextField
                                label="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationCity color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                fullWidth
                            />

                            <TextField
                                label="Parent/Guardian Name"
                                value={parentName}
                                onChange={(e) => setParentName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FamilyRestroom color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                    </Box>

                    {/* Full Width Fields */}
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ContactMail fontSize="small" /> Contact Information
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                        <TextField
                            label="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            label="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>

                    <TextField
                        label="Participant Profile"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mt: 3 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ModeEdit color="action" />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        placeholder="Write a brief description about the participant..."
                    />
                </DialogContent>
                <DialogActions sx={{ px: 4, py: 3, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: 2, px: 3 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ px: 4 }}
                    >
                        {selectedPlayer ? 'Save Changes' : 'Create Participant'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <ErrorOutline sx={{ color: 'error.main', fontSize: 60, mb: 2 }} />
                    <br />
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign="center">
                        Are you sure you want to delete {selectedPlayer?.playerName}?
                        <br />
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        onClick={handleCloseDeleteDialog}
                        variant="outlined"
                        sx={{ mr: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit} sx={{ color: 'primary.main' }}>
                    <ModeEdit sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={() => setOpenDeleteDialog(true)} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
        </Container>
    );
};

export default Player;