import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: 'center',
        mt: 25,
        padding: 4,
        borderRadius: 4,
        boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid black',
        backgroundColor: '#1976D2', // Primary blue color for the background
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontFamily: "'Montserrat', sans-serif",
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          letterSpacing: '2px',
        }}
      >
        Welcome to the Dyslexia Platform
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          color: 'white', // Adjusted to white for better contrast on blue background
          fontSize: '1.2rem',
          fontWeight: '400',
          lineHeight: 1.8,
          marginBottom: 3,
        }}
      >
        The concept of this game is to help children with dyslexia improve their reading skills in a fun and engaging way. 
        Through interactive gameplay, children can learn to recognize letters, words, and sounds, building their confidence 
        in reading. This platform is designed to provide a supportive environment for children to enhance their literacy 
        skills while having fun at the same time.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="secondary" // You can change this to 'primary' if you want it to match the blue theme
          size="large"
          component={Link}
          to="/game"
          sx={{
            paddingX: 4,
            paddingY: 2,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 3,
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          Explore Games
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
