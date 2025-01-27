import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Paper } from '@mui/material';
import { Delete } from '@mui/icons-material';

const GameTablePdfs = ({ pdfs, onViewPdf, onDeletePdf }) => (
  <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>PDF URL</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pdfs.length > 0 ? (
          pdfs.map((pdfUrl, index) => (
            <TableRow key={index}>
              <TableCell>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  {pdfUrl}
                </a>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onViewPdf(pdfUrl)} color="primary">
                  View
                </IconButton>
                <IconButton onClick={() => onDeletePdf(pdfUrl)} color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} align="center">
              No PDFs available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default GameTablePdfs;
