import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Play = () => {
    const [pdfFile, setPdfFile] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976D2' }}>
                Upload and View PDF
            </Typography>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    sx={{ textTransform: 'none', mb: 2 }}
                >
                    Upload PDF
                    <input
                        type="file"
                        hidden
                        accept="application/pdf"
                        onChange={handleFileUpload}
                    />
                </Button>
            </Box>

            {pdfFile ? (
                <Box sx={{ height: '600px', border: '1px solid #ccc', borderRadius: '8px', p: 2 }}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={URL.createObjectURL(pdfFile)} />
                    </Worker>
                </Box>
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', color: '#757575' }}>
                    No PDF uploaded. Please upload a file to preview.
                </Typography>
            )}
        </Container>
    );
};

export default Play;
