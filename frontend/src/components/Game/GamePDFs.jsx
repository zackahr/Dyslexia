import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Videocam as VideocamIcon,
  Mic as MicIcon
} from '@mui/icons-material';
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
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  VisibilityOutlined as ViewIcon,
  DeleteOutline as DeleteIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';
import axios from 'axios';

const GamePDFs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdfs, setPdfs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Permission states
  const [cameraAccess, setCameraAccess] = useState('prompt');
  const [micAccess, setMicAccess] = useState('prompt');

  // Check permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        if (navigator.permissions) {
          // Camera permission
          const cameraPermission = await navigator.permissions.query({ name: 'camera' });
          setCameraAccess(cameraPermission.state);
          cameraPermission.onchange = () => setCameraAccess(cameraPermission.state);

          // Microphone permission
          const micPermission = await navigator.permissions.query({ name: 'microphone' });
          setMicAccess(micPermission.state);
          micPermission.onchange = () => setMicAccess(micPermission.state);
        }
      } catch (error) {
        console.log('Permissions API not fully supported');
      }
    };

    checkPermissions();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/game/${id}`);
      const pdfData = response.data.pdfs.map(pdf => ({
        id: pdf.id,
        url: `http://localhost:3000/game/pdf/${pdf.id}`,
        name: pdf.filename,
      }));
      setPdfs(pdfData);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/players/');
      const playerList = response.data.map(player => ({
        playerName: player.playerName,
        schoolName: player.schoolName,
        id: player._id,
      }));
      setPlayers(playerList);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [id]);

  const handleViewPdf = async (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    await fetchPlayers();
    setSelectedPlayer('');
    setOpenPlayerDialog(true);
  };

  const handleConfirmViewPdf = () => {
    if (!selectedPlayer) {
      alert('Please select a player first.');
      return;
    }

    const pdfId = selectedPdf.split('/').pop();
    navigate(`/pdf/${pdfId}`, {
      state: { player: selectedPlayer },
    });

    setOpenPlayerDialog(false);
    setSelectedPlayer('');
  };

  const handleDeletePdf = async (pdfId) => {
    try {
      await axios.delete(`http://localhost:3000/game/${id}/pdf/${pdfId}`);
      setPdfs((prev) => prev.filter((pdf) => pdf.id !== pdfId));
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

      setSelectedFile(null);
      const fileInput = document.getElementById('pdf-upload-input');
      if (fileInput) fileInput.value = '';

      await fetchPdfs();
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#333' }}>
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
            sx={{ textTransform: 'none', fontFamily: 'Poppins, sans-serif', fontWeight: 500, borderRadius: '8px' }}
          >
            Select PDF
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', color: '#555' }}>
            {selectedFile.name}
          </Typography>
        )}
        <Button
          variant="contained"
          color="success"
          startIcon={<UploadIcon />}
          onClick={handleUploadPdf}
          disabled={!selectedFile}
          sx={{ textTransform: 'none', fontFamily: 'Poppins, sans-serif', fontWeight: 500, borderRadius: '8px' }}
        >
          Upload
        </Button>
      </Box>

      {/* PDFs Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#333' }}>PDF Name</TableCell>
              <TableCell align="right" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#333' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pdfs.map((pdf) => pdf && (
              <TableRow key={pdf.id}>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#555' }}>
                  {pdf.name || 'Unknown PDF'}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View PDF">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewPdf(pdf.url)}
                      sx={{ '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.1)' } }}
                    >
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete PDF">
                    <IconButton
                      color="error"
                      onClick={() => handleDeletePdf(pdf.id)}
                      sx={{ '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' } }}
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

      {/* Player Selection Dialog */}
      <Dialog
        open={openPlayerDialog}
        onClose={() => setOpenPlayerDialog(false)}
        PaperProps={{
          style: {
            borderRadius: '28px',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
          }
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '1.3rem',
            color: '#000',
            textAlign: 'center',
            padding: '20px 24px 10px'
          }}
        >
          Select Player & Record
        </DialogTitle>
        <DialogContent sx={{ padding: '20px 24px' }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Choose Player
            </InputLabel>
            <Select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              sx={{
                borderRadius: '12px',
                '& .MuiOutlinedInput-input': {
                  padding: '14px',
                }
              }}
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.playerName} - {player.schoolName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Recording Buttons */}
          <Box sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button
              variant="contained"
              startIcon={<VideocamIcon />}
              sx={{
                fontFamily: 'Poppins, sans-serif',
                borderRadius: '25px',
                padding: '12px 24px',
                backgroundColor: '#ff3b30',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#ff1a0d',
                  boxShadow: '0px 4px 12px rgba(255, 59, 48, 0.3)'
                }
              }}
              onClick={async () => {
                try {
                  // Request camera access
                  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                  setCameraAccess('granted');
                  // Handle video recording logic here
                  console.log('Camera access granted. Stream:', stream);
                  // You can start recording or preview the video stream here
                } catch (error) {
                  setCameraAccess('denied');
                  console.error('Camera access denied:', error);
                  alert('Camera access is required for video recording.');
                }
              }}
              // disabled={cameraAccess === 'denied'}
            >
              Video Record
            </Button>

            <Button
              variant="contained"
              startIcon={<MicIcon />}
              sx={{
                fontFamily: 'Poppins, sans-serif',
                borderRadius: '25px',
                padding: '12px 24px',
                backgroundColor: '#5856d6',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#4a48c7',
                  boxShadow: '0px 4px 12px rgba(88, 86, 214, 0.3)'
                }
              }}
              onClick={async () => {
                try {
                  // Request microphone access
                  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                  setMicAccess('granted');
                  // Handle audio recording logic here
                  console.log('Microphone access granted. Stream:', stream);
                  // You can start recording or preview the audio stream here
                } catch (error) {
                  setMicAccess('denied');
                  console.error('Microphone access denied:', error);
                  alert('Microphone access is required for voice recording.');
                }
              }}
              // disabled={micAccess === 'denied'}
            >
              Voice Record
            </Button>
          </Box>

          {/* Recording Status Indicators */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#666', fontFamily: 'Poppins' }}>
              Camera: {cameraAccess === 'granted' ? 'Allowed' : 'Blocked'} •
              Microphone: {micAccess === 'granted' ? 'Allowed' : 'Blocked'}
            </Typography>
          </Box>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions sx={{
          padding: '16px 24px',
          flexDirection: 'column',
          gap: 1
        }}>
          <Button
            fullWidth
            onClick={handleConfirmViewPdf}
            sx={{
              fontFamily: 'Poppins',
              borderRadius: '25px',
              padding: '12px',
              backgroundColor: '#007aff',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0063cc'
              }
            }}
          >
            Confirm Selection
          </Button>
          <Button
            fullWidth
            onClick={() => setOpenPlayerDialog(false)}
            sx={{
              fontFamily: 'Poppins',
              borderRadius: '25px',
              padding: '12px',
              color: '#007aff',
              border: '1px solid #007aff',
              '&:hover': {
                backgroundColor: 'rgba(0, 122, 255, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GamePDFs;