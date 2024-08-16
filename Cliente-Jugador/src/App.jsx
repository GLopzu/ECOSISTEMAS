import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [move, setMove] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !move) {
      setMessage('Por favor, ingrese nombre y movimiento.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/move', { name, move });
      setMessage(`${name} ha realizado su jugada.`);
    } catch (error) {
      setMessage('Error al enviar el movimiento.');
    }
  };

  return (
    <div className="App">
      <h1>Cliente Jugador</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={move} onChange={(e) => setMove(e.target.value)}>
          <option value="">Selecciona tu movimiento</option>
          <option value="piedra">Piedra</option>
          <option value="papel">Papel</option>
          <option value="tijera">Tijera</option>
        </select>
        <button type="submit">Enviar</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default App;
