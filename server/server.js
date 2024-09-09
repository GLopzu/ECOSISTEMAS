const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Ruta para registrar un nuevo usuario
app.post("/register", (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre es requerido." });
    }

    const usersFilePath = path.join(__dirname, "users.json");
    let users = [];

    if (fs.existsSync(usersFilePath)) {
      const usersData = fs.readFileSync(usersFilePath);
      users = JSON.parse(usersData);
    }

    const newUser = {
      id: users.length + 1,
      name,
      role: "PENDING",
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "Usuario registrado con éxito.", user: newUser });
  } catch (error) {
    console.error("Error en la ruta /register:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

// Configurar Socket.io
let players = [];
let readyPlayers = new Set();

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("request-players", () => {
    socket.emit("players-list", players);
    socket.emit("ready-players", Array.from(readyPlayers));
  });

  socket.on("start-game-request", () => {
    if (players.length >= 3 && readyPlayers.size === players.length) {
      const roles = ["MARCO", "POLO", "POLO_ESPECIAL"];
      players = players.map((player, index) => ({
        ...player,
        role: roles[index % roles.length],
      }));
      io.emit("game-started", players);
      readyPlayers.clear(); // Resetear el set de jugadores listos
    }
  });

  socket.on("player-ready", (playerId) => {
    readyPlayers.add(playerId);
    io.emit("ready-players", Array.from(readyPlayers));
  });

  socket.on("register-player", (player) => {
    const existingPlayer = players.find(p => p.name === player.name);
    if (existingPlayer) {
      // Eliminar jugador antiguo y agregar uno nuevo con el socketId actualizado
      players = players.filter(p => p.name !== player.name);
    }
    players.push({ ...player, socketId: socket.id });
    io.emit("players-list", players);
  });

  socket.on("make-move", (data) => {
    const { action, playerName } = data;
    const player = players.find(p => p.name === playerName);
    if (action === "MARCO") {
      io.emit("marco", { playerName });
    } else if (action === "POLO") {
      io.emit("polo", { playerName });
    }
  });

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
    players = players.filter(p => p.socketId !== socket.id);
    readyPlayers.delete(socket.id);
    io.emit("players-list", players);
    io.emit("ready-players", Array.from(readyPlayers));
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
