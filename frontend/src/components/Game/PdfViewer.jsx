import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';

const PdfViewer = () => {
  const { pdfId } = useParams();  // Get the PDF ID from the URL
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        // Fetch the PDF blob or URL based on the PDF ID
        const response = await axios.get(`http://localhost:3000/game/pdf/${pdfId}`, {
          responseType: 'blob',  // Expecting the response as a Blob
        });
        const pdfBlob = response.data;
        const pdfUrl = URL.createObjectURL(pdfBlob);  // Create an object URL for the Blob
        setPdfUrl(pdfUrl);  // Set the URL for the PDF
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };
    
    fetchPdf();
  }, [pdfId]);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976D2' }}>
        View PDF
      </Typography>

      {pdfUrl ? (
        <Box sx={{ height: '600px', border: '1px solid #ccc', borderRadius: '8px', p: 2 }}>
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#757575' }}>
          Loading PDF...
        </Typography>
      )}
    </Container>
  );
};

export default PdfViewer;
