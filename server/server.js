import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let players = {};
let gameState = 'waiting'; // 'waiting', 'playing', 'finished'
let winner = '';

app.post('/move', (req, res) => {
  const { name, move } = req.body;
  if (!name || !move) {
    return res.status(400).json({ error: 'Nombre y movimiento requeridos' });
  }

  players[name] = move;

  if (Object.keys(players).length === 2) {
    const [player1, player2] = Object.keys(players);
    const result = getResult(players[player1], players[player2]);
    winner = result;
    gameState = 'finished';
    players = {}; // Reset players
  } else {
    gameState = 'playing';
  }

  res.json({ status: gameState });
});

app.get('/state', (req, res) => {
  res.json({ state: gameState, winner: winner });
});

app.post('/reset', (req, res) => {
  players = {};
  gameState = 'waiting';
  winner = '';
  res.json({ status: 'Game reset' });
});

function getResult(move1, move2) {
  if (move1 === move2) return 'Empate';
  if (
    (move1 === 'piedra' && move2 === 'tijera') ||
    (move1 === 'papel' && move2 === 'piedra') ||
    (move1 === 'tijera' && move2 === 'papel')
  ) {
    return 'Jugador 1 gana';
  } else {
    return 'Jugador 2 gana';
  }
}

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
