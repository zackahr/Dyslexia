import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
        localStorage.setItem('authToken', data.access_token);
        navigate('/');
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(true);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth="100vw"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #f0f4f8, #e2e8f0)',
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        {/* Logo or Icon */}
        <Lock
          sx={{
            fontSize: 60,
            color: '#1976D2',
            marginBottom: 2,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 3,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Welcome Back
        </Typography>

        {/* Username Field */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: '#1976D2' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          helperText={error ? 'Invalid username or password' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: '#1976D2' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        {/* Remember Me Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
          }
          label="Remember Me"
          sx={{ mb: 2 }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            background: 'linear-gradient(to right, #1976D2, #2A5298)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            '&:hover': {
              background: 'linear-gradient(to right, #2A5298, #1976D2)',
            },
            padding: '12px 0',
            borderRadius: '30px',
            mb: 2,
          }}
        >
          Log In
        </Button>

        {/* Forgot Password Link */}
        <Typography
          variant="body2"
          sx={{
            color: '#1976D2',
            cursor: 'pointer',
            mb: 2,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;