import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Paper } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import GameActions from './GameActions';

const GameTable = ({ games, onEditGame, onDeleteGame, onAddGame }) => (
  <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Game Name</TableCell>
          <TableCell>Date Created</TableCell>
          <TableCell align="right">
            <IconButton color="primary" onClick={onAddGame}>
              <Add />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.length > 0 ? (
          games.map((game) => (
            <TableRow key={game.id}>
              <TableCell>
                {/* Wrap game name in a Link to navigate to the game details */}
                <Link to={`/game/${game._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {game.name}
                </Link>
              </TableCell>
              <TableCell>{new Date(game.date).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                <GameActions
                  game={game}
                  onEdit={onEditGame}
                  onDelete={onDeleteGame}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} align="center">
              No games available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default GameTable;
