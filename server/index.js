const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
require('dotenv').config();

const GameStateManager = require('./managers/GameStateManager');
const PlayerManager = require('./managers/PlayerManager');
const EventBroadcaster = require('./managers/EventBroadcaster');
const DayNightCycleManager = require('./systems/DayNightCycleManager');
const SanityManager = require('./systems/SanityManager');
const GhostAI = require('./systems/GhostAI');
const ManducousAI = require('./systems/ManducousAI');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// Game Managers
const gameState = new GameStateManager();
const playerManager = new PlayerManager();
const eventBroadcaster = new EventBroadcaster(io);
const dayNightCycle = new DayNightCycleManager(gameState, eventBroadcaster);
const sanityManager = new SanityManager();
const ghostAI = new GhostAI(gameState, playerManager, eventBroadcaster);
const manducousAI = new ManducousAI(gameState, playerManager, eventBroadcaster);

// Start game cycles
dayNightCycle.start();
ghostAI.start();
manducousAI.start();

// Socket.io Connection Handler
io.on('connection', (socket) => {
  console.log(`[Connected] Player ${socket.id}`);

  // Player joins game
  socket.on('join-game', (data) => {
    const player = playerManager.addPlayer(socket.id, data.username);
    gameState.addPlayer(player);
    eventBroadcaster.broadcast('player-joined', { player, totalPlayers: gameState.getPlayerCount() });
    socket.emit('game-state', gameState.getState());
  });

  // Player movement
  socket.on('player-move', (position) => {
    const player = playerManager.getPlayer(socket.id);
    if (player) {
      player.position = position;
      eventBroadcaster.broadcast('player-moved', { playerId: socket.id, position });
    }
  });

  // Player attacks
  socket.on('player-attack', (data) => {
    const player = playerManager.getPlayer(socket.id);
    if (player && data.weapon) {
      console.log(`[Attack] ${player.username} using ${data.weapon}`);
      eventBroadcaster.broadcast('player-attacked', { playerId: socket.id, weapon: data.weapon, target: data.target });
    }
  });

  // Player hides
  socket.on('player-hide', (hideSpotId) => {
    const player = playerManager.getPlayer(socket.id);
    if (player) {
      player.isHiding = true;
      player.hideSpotId = hideSpotId;
      sanityManager.updateHideSanity(player, true);
      eventBroadcaster.broadcast('player-hid', { playerId: socket.id, hideSpotId });
    }
  });

  // Player reveals
  socket.on('player-reveal', () => {
    const player = playerManager.getPlayer(socket.id);
    if (player) {
      player.isHiding = false;
      player.hideSpotId = null;
      eventBroadcaster.broadcast('player-revealed', { playerId: socket.id });
    }
  });

  // Chat message
  socket.on('chat-message', (message) => {
    const player = playerManager.getPlayer(socket.id);
    if (player) {
      eventBroadcaster.broadcast('chat-message', {
        playerId: socket.id,
        username: player.username,
        message,
        timestamp: Date.now()
      });
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`[Disconnected] Player ${socket.id}`);
    const player = playerManager.getPlayer(socket.id);
    if (player) {
      playerManager.removePlayer(socket.id);
      gameState.removePlayer(socket.id);
      eventBroadcaster.broadcast('player-left', { playerId: socket.id, remainingPlayers: gameState.getPlayerCount() });
    }
  });
});

// REST API endpoints
app.get('/api/game-state', (req, res) => {
  res.json(gameState.getState());
});

app.get('/api/players', (req, res) => {
  res.json(playerManager.getAllPlayers());
});

app.get('/api/stats', (req, res) => {
  res.json({
    playersConnected: gameState.getPlayerCount(),
    gameTime: gameState.getGameTime(),
    currentCycle: gameState.getCurrentCycle()
  });
});

// 404 handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🎮 Carson Ghosthouse Server running on port ${PORT}`);
});

module.exports = { app, server, io, gameState, playerManager, eventBroadcaster };
