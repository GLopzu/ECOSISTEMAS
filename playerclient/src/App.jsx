import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import StartGame from "./components/StartGame";
import Game from "./components/Game";

function App() {
  const [players, setPlayers] = useState([]);

  const handleRegister = (name) => {
    setPlayers([...players, { name }]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register onRegister={handleRegister} />} />
          <Route path="/startgame" element={<StartGame players={players} />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
