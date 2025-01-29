import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Fab,
  Paper
} from '@mui/material';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { ArrowBack, Download } from '@mui/icons-material';
import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';

const PdfViewer = () => {
  const { pdfId } = useParams();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/game/pdf/${pdfId}`, {
          responseType: 'blob',
        });
        const pdfBlob = response.data;
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
      } catch (err) {
        console.error('Error fetching PDF:', err);
        setError('Failed to load PDF. Please try again later.');
      }
    };

    fetchPdf();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfId]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `document-${pdfId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            aria-label="back"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            PDF Document Viewer
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {pdfUrl ? (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer
                fileUrl={pdfUrl}
                theme={{
                  theme: 'light',
                  scrollbar: {
                    thumb: '#B71C1C',
                    track: '#F5F5F5',
                  },
                }}
              />
            </Worker>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              {error ? (
                <Typography color="error" variant="h6">
                  {error}
                </Typography>
              ) : (
                <>
                  <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
                  <Typography variant="body1" color="textSecondary">
                    Loading document...
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Paper>

        {pdfUrl && (
          <Tooltip title="Download PDF" arrow>
            <Fab
              color="primary"
              onClick={handleDownload}
              sx={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              <Download fontSize="large" />
            </Fab>
          </Tooltip>
        )}
      </Container>
    </>
  );
};

export default PdfViewer;