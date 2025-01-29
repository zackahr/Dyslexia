import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getPlayers = () => api.get('/players');
export const createPlayer = (player) => api.post('/players', player);
export const updatePlayer = (id, player) => api.put(`/players/${id}`, player);
export const deletePlayer = (id) => api.delete(`/players/${id}`);

const apis = {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer
};

export default apis;