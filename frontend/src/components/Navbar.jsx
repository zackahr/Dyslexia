import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove authToken from localStorage or sessionStorage
        localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken');
        
        // Redirect to the login page after logout
        navigate('/login');
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: '#1976D2', // Primary blue color
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', paddingX: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        fontFamily: "'Montserrat', sans-serif",
                        letterSpacing: 1.5,
                        color: 'white',
                        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)',
                    }}
                >
                    Dys<span style={{ color: '#FFD700' }}>lexia</span>
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        to="/"
                        sx={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textTransform: 'none',
                            marginX: 1,
                            borderBottom: '2px solid transparent',
                            '&:hover': {
                                borderBottom: '2px solid #FFD700',
                            },
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/game"
                        sx={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textTransform: 'none',
                            marginX: 1,
                            borderBottom: '2px solid transparent',
                            '&:hover': {
                                borderBottom: '2px solid #FFD700',
                            },
                        }}
                    >
                        Game
                    </Button>
                    <Button
                        component={Link}
                        to="/player"
                        sx={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textTransform: 'none',
                            marginX: 1,
                            borderBottom: '2px solid transparent',
                            '&:hover': {
                                borderBottom: '2px solid #FFD700',
                            },
                        }}
                    >
                        Participant
                    </Button>
                    <Button
                        component={Link}
                        to="/play"
                        sx={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textTransform: 'none',
                            marginX: 1,
                            borderBottom: '2px solid transparent',
                            '&:hover': {
                                borderBottom: '2px solid #FFD700',
                            },
                        }}
                    >
                        Play
                    </Button>
                    <Button
                        onClick={handleLogout}
                        sx={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textTransform: 'none',
                            marginX: 1,
                            borderBottom: '2px solid transparent',
                            '&:hover': {
                                borderBottom: '2px solid #FFD700',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
