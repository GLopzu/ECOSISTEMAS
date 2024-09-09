import React, { useState } from "react";
import Register from "./register";
import StartGame from "./StartGame";

const SimulatePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleRegister = (name) => {
    setPlayers((prevPlayers) => [...prevPlayers, name]);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <div>
          <h1>Simulación de Jugadores</h1>
          <Register onRegister={handleRegister} />
          {players.length >= 3 && (
            <button onClick={handleStartGame}>Iniciar Juego</button>
          )}
          <div>
            <h2>Jugadores Registrados</h2>
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <StartGame />
      )}
    </div>
  );
};

export default SimulatePlayers;
