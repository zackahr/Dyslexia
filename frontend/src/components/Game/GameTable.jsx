import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  IconButton, 
  TableContainer, 
  Paper,
  Typography,
  Tooltip,
  Button,
  Box,
  Avatar
} from '@mui/material';
import { 
  Add, 
  VideogameAsset, 
  CalendarToday,
  FolderOpen 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import GameActions from './GameActions';
import { lightBlue, blueGrey } from '@mui/material/colors';

const GameTable = ({ games, onEditGame, onDeleteGame, onAddGame }) => (
  <TableContainer 
    component={Paper} 
    elevation={3} 
    sx={{ 
      borderRadius: 4,
      overflow: 'hidden',
      border: `1px solid ${blueGrey[100]}`,
      '& .MuiTableCell-root': {
        py: 2
      }
    }}
  >
    <Table>
      <TableHead sx={{ bgcolor: lightBlue[50] }}>
        <TableRow>
          <TableCell sx={{ width: '45%' }}>
            <Typography variant="subtitle1" fontWeight="600">
              Game Name
            </Typography>
          </TableCell>
          <TableCell>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="subtitle1" fontWeight="600">
                Date Created
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="right">
            <Tooltip title="Add New Game">
              <IconButton 
                color="primary" 
                onClick={onAddGame}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s'
                }}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.length > 0 ? (
          games.map((game) => (
            <TableRow 
              key={game.id}
              hover 
              sx={{ 
                '&:hover': { 
                  bgcolor: blueGrey[50],
                  '& .game-actions': {
                    opacity: 1
                  }
                },
                '&:last-child td': { borderBottom: 0 }
              }}
            >
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: lightBlue[100] }}>
                    <VideogameAsset sx={{ color: lightBlue[600] }} />
                  </Avatar>
                  <Link 
                    to={`/game/${game._id}`} 
                    style={{ 
                      textDecoration: 'none', 
                      color: 'inherit',
                      fontWeight: 500
                    }}
                  >
                    {game.name}
                  </Link>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(game.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <GameActions
                  game={game}
                  onEdit={onEditGame}
                  onDelete={onDeleteGame}
                  sx={{ opacity: 0.7, transition: 'opacity 0.2s' }}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                color={blueGrey[400]}
              >
                <FolderOpen sx={{ fontSize: 60 }} />
                <Typography variant="h6">
                  No games available
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={onAddGame}
                  sx={{ mt: 2 }}
                >
                  Create New Game
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default GameTable;