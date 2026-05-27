# 🎮 Carson Ghosthouse - Multiplayer Horror Investigation Game

A cooperative multiplayer 3D horror investigation game based on true paranormal stories. Players investigate real haunted locations, identify supernatural entities, and survive increasingly aggressive ghost encounters. Features immersive cutscenes as your team drives to each investigation site.

## 🎯 Core Features

### True Story Locations
Each location is based on real paranormal incidents:
- **Waverly Hills Sanatorium** (Kentucky) - Medical ghostly phenomena
- **The Stanley Hotel** (Colorado) - Overlook-inspired haunting
- **Lizzie Borden House** (Massachusetts) - Violent spirit activity
- **Penumbra Mansion** (Nevada) - Unknown entity presence
- **Myrtles Plantation** (Louisiana) - Multiple spirits, violent attacks
- **Fort Jefferson** (Florida) - Military ghost encounters

### Immersive Cutscenes
- Drive to each location with atmospheric dialogue
- Team briefing with case history
- Environment setup and preparation
- Dramatic transitions into investigation

### Day/Night Cycle System
- **Day Phase (5 min)**: Investigation mode, full visibility, ghosts dormant
- **Transition Phase (30s)**: Warning system, sky darkens, atmosphere intensifies
- **Night Phase (3 min)**: Combat/survival mode, reduced visibility, aggressive ghosts

### Ghost Types (6 Unique Behaviors)
1. **Poltergeist** - Throws objects, aggressive day/night
2. **Phantom** - Possession risk, weak to salt
3. **Wraith** - Levitates, passes through walls
4. **Banshee** - Screams, targets single player
5. **Shade** - Hides in groups, triggers when alone
6. **Demon** - Most aggressive, resistant to tools

### Manducous - Special Predatory Ghost
- Hunts and charges at players
- Attempts to grab/consume players
- Emits terrifying eating/chewing sounds
- Leaves slime trails
- Carries away consumed players
- Weakness: Shotgun (instant kill with 1 hit)

### Survival Mechanics
- **Sanity System**: Decreases in darkness, increases in sunlight/groups
- **Health System**: Take damage from ghost attacks, recover with items
- **Hide System**: 8-12 hide spots per location, max 3 players per spot
- **Weapons**: Wooden bat (melee/stun) and shotgun (ranged/kill)

### Multiplayer Features
- Real-time synchronization via WebSocket
- 1-4 players per session
- Shared objectives and threats
- Team dynamics (separated players drain sanity faster)
- Voice chat proximity system
- Player revive mechanics

## 🛠️ Tech Stack

### Backend
- **Node.js** + Express
- **Socket.io** for WebSocket real-time multiplayer
- **MongoDB** for game persistence
- **Redis** for state caching

### Frontend
- **Three.js** for 3D rendering
- **Cannon.js** for physics
- **Howler.js** for 3D spatial audio
- **Webpack** for bundling

## 📦 Project Structure

```
carson-ghosthouse/
├── server/
│   ├── index.js                 # Server entry point
│   ├── managers/
│   │   ├── GameStateManager.js  # Game state tracking
│   │   ├── PlayerManager.js     # Player instances
│   │   ├── LocationManager.js   # Location/cutscene management
│   │   └── EventBroadcaster.js  # Event distribution
│   ├── systems/
│   │   ├── DayNightCycleManager.js  # Day/night cycles
│   │   ├── SanityManager.js         # Sanity mechanics
│   │   ├── GhostAI.js               # Ghost behaviors
│   │   ├── ManducousAI.js           # Predatory ghost AI
│   │   ├── CutsceneManager.js       # Location intro cutscenes
│   │   ├── WeaponSystem.js          # Combat system
│   │   └── HideSystem.js            # Hide mechanics
│   └── data/
│       ├── locations.js         # True story location data
│       ├── ghosts.js            # Ghost type definitions
│       └── investigations.js    # Case histories
├── client/
│   ├── index.js                 # Client entry point
│   ├── Game.js                  # Three.js game engine
│   ├── GameClient.js            # WebSocket client
│   └── scenes/
│       ├── CutsceneScene.js     # Driving cutscenes
│       └── InvestigationScene.js # Main game scene
├── index.html                   # HTML entry point
├── webpack.config.js            # Webpack configuration
├── package.json                 # Dependencies
├── .env.example                 # Environment template
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (for persistence)
- Redis (for caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/xboxkracken22-oss/Carson-Ghosthouse.git
cd Carson-Ghosthouse

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start MongoDB and Redis (if local)
mongod
redis-server
```

### Running the Game

**Terminal 1 - Start Server:**
```bash
npm run dev
```

**Terminal 2 - Build Frontend:**
```bash
npm run build
```

**Terminal 3 - Start Dev Server:**
```bash
npm run serve
```

Then open `http://localhost:8080` in your browser.

## 🎮 Controls

| Key | Action |
|-----|--------|
| **WASD** | Move |
| **Mouse** | Look around |
| **Left Click** | Attack with equipped weapon |
| **E** | Hide in nearby hide spot |
| **Enter** | Send chat message |
| **Space** | Sprint/Jump |

## 📊 Game Mechanics

### Sanity System
- **Decreases**: Ghost encounters (-10%), being chased (-5%), darkness (-1%), seeing Manducous (-20%)
- **Increases**: Sunlight (+2%), in group (+1%), completing objective (+25%), hiding (+1%)
- **Effects**:
  - 75-100%: Good state
  - 50-75%: Ambient whispers, shadows
  - 25-50%: Visual distortions, minor hallucinations
  - 0-25%: Severe hallucinations, reduced accuracy
  - 0%: Death from fear

### Weapons
- **Wooden Bat**: Melee weapon, 2m range, unlimited ammo, stuns ghosts 3s
- **Shotgun**: Ranged weapon, 8m range, 5 ammo max, instant-kills Manducous

### Hide Spots
- 8-12 per location
- Maximum 3 players per spot
- Provides sanity recovery (+1%/s) and safety
- Can be discovered by nearby ghosts

## 🎬 Cutscene System

Before each investigation, players experience a driving cutscene:

```javascript
Cutscene Flow:
1. Team briefing - Learn case history
2. Driving sequence - Travel to location (2D scene)
3. Arrival - Atmosphere builds
4. Entry - Transition into 3D investigation
```

Each location has unique dialogue, historical context, and paranormal background based on real events.

## 🧪 Testing

Run the development server and connect multiple clients:

```bash
npm run dev & npm run serve
```

Open `http://localhost:8080` in multiple browser tabs to simulate multiplayer.

## 📝 API Reference

### Server Events

**Client → Server:**
- `join-game` - Join the game session
- `select-location` - Choose investigation location
- `start-cutscene` - Begin location intro
- `cutscene-complete` - Ready to start investigation
- `player-move` - Send player position
- `player-attack` - Attack with weapon
- `player-hide` - Hide in spot
- `player-reveal` - Exit hiding
- `chat-message` - Send message

**Server → Client:**
- `game-state` - Initial game state
- `cutscene-start` - Begin driving cutscene
- `cutscene-progress` - Cutscene update
- `cutscene-complete` - Transition to investigation
- `cycle-changed` - Day/night cycle changed
- `cycle-update` - Cycle progress update
- `player-joined` - New player joined
- `player-moved` - Player position update
- `ghost-attack` - Ghost attacked
- `manducous-update` - Manducous position/status
- `player-consumed` - Player consumed by Manducous

## 🎨 True Story Locations

### Waverly Hills Sanatorium
- **Location**: Louisville, Kentucky
- **History**: Tuberculosis patients, experimental treatments
- **Phenomena**: Medical equipment activation, shadow figures
- **Ghost Type**: Phantom (possession risk)

### The Stanley Hotel
- **Location**: Estes Park, Colorado  
- **History**: Hotel fire, isolated mountain setting
- **Phenomena**: Disembodied voices, apparitions in hallways
- **Ghost Type**: Poltergeist (object throwing)

### Lizzie Borden House
- **Location**: Fall River, Massachusetts
- **History**: Unsolved murders in 1892
- **Phenomena**: Violent spirits, emotional disturbances
- **Ghost Type**: Demon (most aggressive)

### Penumbra Mansion
- **Location**: Las Vegas, Nevada
- **History**: Unknown entity, tragic deaths
- **Phenomena**: Unknown phenomena, reality distortion
- **Ghost Type**: Wraith (levitation, wall passing)

### Myrtles Plantation
- **Location**: St. Francisville, Louisiana
- **History**: Multiple murders, slave spirits
- **Phenomena**: Multiple spirits, violent attacks
- **Ghost Type**: Shade (group hiding)

### Fort Jefferson
- **Location**: Dry Tortugas, Florida
- **History**: Civil War era fort, prisoner deaths
- **Phenomena**: Military ghost encounters, anomalies
- **Ghost Type**: Banshee (screams, targeting)

## 🐛 Known Issues

- Audio system not yet implemented (prepared for Howler.js)
- Physics engine not yet integrated (prepared for Cannon.js)
- Database persistence in development mode
- Cutscene animations in progress

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributors

- **xboxkracken22-oss** - Project Lead

## 🎓 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Socket.io Documentation](https://socket.io/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- True paranormal case studies and historical records

---

**Happy investigating! And watch out for Manducous...** 🐲👻
