import React from 'react';
import { Typography, Container, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { School, Accessibility, EmojiObjects, PlayCircleFilled } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: 'center',
        mt: { xs: 8, md: 15 },
        padding: 4,
        borderRadius: 4,
        boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 11%)`,
          backgroundSize: '50px 50px',
          animation: `${float} 6s infinite linear`,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Animated Icons */}
      <School sx={{ 
        position: 'absolute', 
        top: 30, 
        left: 30, 
        fontSize: 60, 
        color: 'rgba(255,255,255,0.15)',
        animation: `${float} 4s infinite ease-in-out`,
      }} />
      
      <Accessibility sx={{ 
        position: 'absolute', 
        bottom: 30, 
        right: 30, 
        fontSize: 60, 
        color: 'rgba(255,255,255,0.15)',
        animation: `${float} 5s infinite ease-in-out`,
      }} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontFamily: "'Montserrat', sans-serif",
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: '2px',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <EmojiObjects sx={{ fontSize: '2.5rem', color: '#FFD700' }} />
          Dyslexia Learning Platform
          <EmojiObjects sx={{ fontSize: '2.5rem', color: '#FFD700' }} />
        </Typography>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 3, borderRadius: 3 }}>
              <School sx={{ fontSize: 50, color: '#FFD700', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Interactive Learning
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 3, borderRadius: 3 }}>
              <Accessibility sx={{ fontSize: 50, color: '#FFD700', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Accessible Design
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 3, borderRadius: 3 }}>
              <EmojiObjects sx={{ fontSize: 50, color: '#FFD700', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Creative Approach
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body1"
          paragraph
          sx={{
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 400,
            lineHeight: 1.8,
            mb: 4,
            px: 2,
          }}
        >
          Our innovative platform uses game-based learning to help children with dyslexia improve their reading skills 
          through engaging activities, visual storytelling, and adaptive challenges. Build confidence while having fun!
        </Typography>

        <Button
          variant="contained"
          startIcon={<PlayCircleFilled sx={{ fontSize: '1.5rem' }} />}
          component={Link}
          to="/game"
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 50,
            background: 'linear-gradient(45deg, #FFD700 0%, #FFC400 100%)',
            color: '#1976D2',
            boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 12px 32px rgba(255, 215, 0, 0.4)',
              background: 'linear-gradient(45deg, #FFC400 0%, #FFD700 100%)',
            },
          }}
        >
          Start Learning Journey
        </Button>
      </Box>
    </Container>
  );
};

export default Home;