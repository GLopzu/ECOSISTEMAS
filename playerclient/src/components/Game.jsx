import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Game = () => {
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [polos, setPolos] = useState([]);

  useEffect(() => {
    socket.on("players-list", (players) => {
      const player = players.find(p => p.name === localStorage.getItem('playerName'));
      if (player) {
        setRole(player.role);
      }
    });

    socket.on("marco", ({ playerName }) => {
      if (role === "POLO" || role === "POLO_ESPECIAL") {
        setMessage(`${playerName} ha gritado MARCO`);
      }
    });

    socket.on("polo", ({ playerName }) => {
      if (role === "MARCO") {
        setPolos(prevPolos => [...prevPolos, playerName]);
      }
    });

    return () => {
      socket.off("players-list");
      socket.off("marco");
      socket.off("polo");
    };
  }, [role]);

  const handleMove = (action) => {
    socket.emit("make-move", { action, playerName: localStorage.getItem('playerName') });
    if (action === "MARCO") {
      setMessage("Has gritado MARCO");
    } else if (action === "POLO") {
      setMessage("Has gritado POLO");
    }
  };

  return (
    <div>
      <h2>Juego en Progreso</h2>
      {role && <p>Tu rol es: {role}</p>}
      <button onClick={() => handleMove("MARCO")}>MARCO</button>
      <button onClick={() => handleMove("POLO")}>POLO</button>
      {message && <p>{message}</p>}
      {role === "MARCO" && polos.length > 0 && (
        <div>
          <h3>Polos que han gritado:</h3>
          <ul>
            {polos.map((polo, index) => (
              <li key={index}>{polo}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game;
