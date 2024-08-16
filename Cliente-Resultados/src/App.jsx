import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('waiting');
  const [winner, setWinner] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await axios.get('http://localhost:5000/state');
        setGameState(response.data.state);
        setWinner(response.data.winner);
      } catch (error) {
        setMessage('Error al obtener el estado del juego.');
      }
    };

    const intervalId = setInterval(fetchGameState, 2000); // Poll every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleReset = async () => {
    try {
      await axios.post('http://localhost:5000/reset');
      setMessage('Juego reiniciado.');
    } catch (error) {
      setMessage('Error al reiniciar el juego.');
    }
  };

  return (
    <div className="App">
      <h1>Cliente Resultados</h1>
      {gameState === 'finished' ? (
        <>
          <p>{winner}</p>
          <button onClick={handleReset}>Volver a Jugar</button>
        </>
      ) : (
        <p>Esperando jugadas...</p>
      )}
      <p>{message}</p>
    </div>
  );
}

export default App;
