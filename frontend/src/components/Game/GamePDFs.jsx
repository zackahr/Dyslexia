import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  VisibilityOutlined as ViewIcon, 
  DeleteOutline as DeleteIcon, 
  CloudUpload as UploadIcon 
} from '@mui/icons-material';
import axios from 'axios';

const GamePDFs = () => {
  const { id } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/game/${id}`);
      const pdfIds = response.data.pdfs || [];
      const pdfUrls = pdfIds
        .filter(pdfId => pdfId && typeof pdfId === 'string')
        .map(pdfId => `http://localhost:3000/game/pdf/${pdfId}`);
      setPdfs(pdfUrls);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [id]);

  const handleViewPdf = (pdfUrl) => {
    if (!pdfUrl) return;
    const pdfId = pdfUrl.split('/').pop();
    window.location.href = `/pdf/${pdfId}`;
  };

  const handleDeletePdf = async (pdfUrl) => {
    if (!pdfUrl) return;
    try {
      await axios.delete(`http://localhost:3000/game/${id}/pdfs`, { data: { url: pdfUrl } });
      setPdfs((prev) => prev.filter((pdf) => pdf !== pdfUrl));
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleUploadPdf = async () => {
    if (!selectedFile) {
      alert('Please select a PDF to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post(`http://localhost:3000/game/${id}/pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset file selection and refresh PDFs
      setSelectedFile(null);
      
      // Clear file input
      const fileInput = document.getElementById('pdf-upload-input');
      if (fileInput) fileInput.value = '';

      // Fetch updated PDFs
      await fetchPdfs();
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Game PDFs
      </Typography>

      {/* Upload Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          id="pdf-upload-input"
          style={{ display: 'none' }}
        />
        <label htmlFor="pdf-upload-input">
          <Button
            variant="contained"
            component="span"
            color="primary"
            startIcon={<UploadIcon />}
            sx={{ textTransform: 'none' }}
          >
            Select PDF
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body2">
            {selectedFile.name}
          </Typography>
        )}
        <Button
          variant="contained"
          color="success"
          startIcon={<UploadIcon />}
          onClick={handleUploadPdf}
          disabled={!selectedFile}
          sx={{ textTransform: 'none' }}
        >
          Upload
        </Button>
      </Box>

      {/* PDFs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PDF Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pdfs.map((pdf) => pdf && (
              <TableRow key={pdf}>
                <TableCell>
                  {pdf.split('/').pop() || 'Unknown PDF'}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View PDF">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewPdf(pdf)}
                    >
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete PDF">
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeletePdf(pdf)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GamePDFs;