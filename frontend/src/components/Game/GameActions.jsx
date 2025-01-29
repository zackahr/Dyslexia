// GameActions.js
import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const GameActions = ({ game, onEdit, onDelete, sx }) => (
  <Box sx={{ ...sx }}>
    <Tooltip title="Edit Game">
      <IconButton onClick={() => onEdit(game)} color="primary">
        <Edit fontSize="small" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete Game">
      <IconButton onClick={() => onDelete(game)} color="error">
        <Delete fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
);

export default GameActions;