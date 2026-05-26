class GameStateManager {
  constructor() {
    this.players = new Map();
    this.gameTime = 0;
    this.currentCycle = 'day'; // 'day', 'night', 'transition'
    this.ghosts = [];
    this.manducous = null;
    this.locations = [];
  }

  addPlayer(player) {
    this.players.set(player.id, player);
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
  }

  getPlayer(playerId) {
    return this.players.get(playerId);
  }

  getPlayerCount() {
    return this.players.size;
  }

  getAllPlayers() {
    return Array.from(this.players.values());
  }

  updateCycle(cycle) {
    this.currentCycle = cycle;
  }

  getCurrentCycle() {
    return this.currentCycle;
  }

  getGameTime() {
    return this.gameTime;
  }

  updateGameTime(time) {
    this.gameTime = time;
  }

  addGhost(ghost) {
    this.ghosts.push(ghost);
  }

  removeGhost(ghostId) {
    this.ghosts = this.ghosts.filter(g => g.id !== ghostId);
  }

  getGhosts() {
    return this.ghosts;
  }

  setManducous(manducous) {
    this.manducous = manducous;
  }

  getManducous() {
    return this.manducous;
  }

  getState() {
    return {
      players: this.getAllPlayers(),
      gameTime: this.gameTime,
      currentCycle: this.currentCycle,
      ghosts: this.ghosts,
      manducous: this.manducous,
      playerCount: this.getPlayerCount()
    };
  }
}

module.exports = GameStateManager;
