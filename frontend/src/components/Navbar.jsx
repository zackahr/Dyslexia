import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  SportsEsports as GameIcon,
  People as PeopleIcon,
  ExitToApp as LogoutIcon,
  AccessibilityNew as LogoIcon
} from '@mui/icons-material';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'linear-gradient(45deg, #1565C0 30%, #1976D2 90%)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                py: 1,
                borderBottom: '2px solid #FFD700'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
                    {/* Logo Section */}
                    <Box component={Link} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <LogoIcon sx={{ 
                            fontSize: 40, 
                            color: '#FFD700', 
                            mr: 1,
                            filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.5))'
                        }} />
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                fontFamily: "'Poppins', sans-serif",
                                letterSpacing: 1.2,
                                color: 'white',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                '& span': {
                                    color: '#FFD700',
                                    ml: 0.5
                                }
                            }}
                        >
                            Dys<span>lexia</span>
                        </Typography>
                    </Box>

                    {/* Navigation Links */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            component={Link}
                            to="/"
                            startIcon={<HomeIcon sx={{ color: '#FFD700' }} />}
                            sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Home
                        </Button>

                        <Button
                            component={Link}
                            to="/game"
                            startIcon={<GameIcon sx={{ color: '#FFD700' }} />}
                            sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Games
                        </Button>

                        <Button
                            component={Link}
                            to="/player"
                            startIcon={<PeopleIcon sx={{ color: '#FFD700' }} />}
                            sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Players
                        </Button>

                        <IconButton
                            onClick={handleLogout}
                            sx={{
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                ml: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 215, 0, 0.2)'
                                }
                            }}
                        >
                            <LogoutIcon sx={{ color: '#FFD700', fontSize: 28 }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;