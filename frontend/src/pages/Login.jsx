import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('authToken', data.access_token);
        // Redirect to home page or any other page after successful login
        navigate('/');
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(true);
    }
  };

  return (
    <Container
      maxWidth="100vw"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #f0f4f8, #e2e8f0)', // Soft gradient background
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Luxurious shadow effect
          background: '#ffffff',
          width: '100%',
          maxWidth: 400, // Set maximum width for the login form
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 3,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Logo
        </Typography>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2, // Rounded corners for input fields
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            helperText={error ? 'Invalid username or password' : ''}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2, // Rounded corners for input fields
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            background: 'linear-gradient(to right, #1976D2, #2A5298)', // Elegant gradient background
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            '&:hover': {
              background: 'linear-gradient(to right, #2A5298, #1976D2)',
            },
            padding: '12px 0', // Slightly larger padding for a premium feel
            borderRadius: '30px', // Rounded button
          }}
        >
          Log In
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
