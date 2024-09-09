import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const StartGame = () => {
  const [players, setPlayers] = useState([]);
  const [readyPlayers, setReadyPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerId, setPlayerId] = useState(null); // Añadir estado para el ID del jugador
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("request-players");

    socket.on("players-list", (playersList) => {
      setPlayers(playersList);
    });

    socket.on("ready-players", (readyPlayersList) => {
      setReadyPlayers(readyPlayersList);
    });

    socket.on("game-started", (playersList) => {
      setGameStarted(true);
      navigate("/game");
    });

    socket.on("connect", () => {
      // Enviar el jugador al servidor cuando se conecte
      socket.emit("register-player", { name: "PlayerName", socketId: socket.id });
    });

    return () => {
      socket.off("players-list");
      socket.off("ready-players");
      socket.off("game-started");
    };
  }, [navigate]);

  const handleStartGame = () => {
    socket.emit("start-game-request");
  };

  const handlePlayerReady = () => {
    if (playerId) {
      socket.emit("player-ready", playerId);
    }
  };

  return (
    <div>
      <h2>Jugadores Conectados</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
      <h3>Jugadores Listos: {readyPlayers.length}/{players.length}</h3>
      <button onClick={handlePlayerReady} disabled={gameStarted}>
        {gameStarted ? "Juego en progreso..." : "Estoy Listo"}
      </button>
      <button onClick={handleStartGame} disabled={gameStarted || readyPlayers.length < players.length}>
        {gameStarted ? "Juego en progreso..." : "Iniciar Juego"}
      </button>
    </div>
  );
};

export default StartGame;
