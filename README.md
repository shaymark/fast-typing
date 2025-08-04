# Fast Typing Game

A web-based typing game where letters fall from the top of the screen and players must type them before they reach the bottom. The game features progressive difficulty with new letters introduced at each level.

## Features

- **Progressive Difficulty**: Start with just 'j' and 'f' keys, gradually adding more letters
- **Level System**: 10 levels with increasing complexity
- **Score System**: Points for correct hits with bonus points for consecutive hits
- **Lives System**: Game over when 3 letters reach the bottom
- **Smooth Animations**: Visual feedback for correct and incorrect key presses
- **Responsive Design**: Works on desktop and mobile devices
- **Pause/Resume**: Automatically pauses when window loses focus

## How to Play

1. Open `index.html` in a web browser
2. Click "Start Game" or press any key to begin
3. Type the falling letters before they reach the bottom
4. Score points for each correct letter typed
5. Avoid letting 3 letters reach the bottom (you lose a life)
6. Progress through levels to unlock more letters

## Game Mechanics

### Level Progression
- **Level 1**: j, f
- **Level 2**: j, f, d, k
- **Level 3**: j, f, d, k, s, l
- **Level 4**: j, f, d, k, s, l, a, ;
- **Level 5**: j, f, d, k, s, l, a, ;, g, h
- **Level 6**: j, f, d, k, s, l, a, ;, g, h, r, u
- **Level 7**: j, f, d, k, s, l, a, ;, g, h, r, u, e, i
- **Level 8**: j, f, d, k, s, l, a, ;, g, h, r, u, e, i, w, o
- **Level 9**: j, f, d, k, s, l, a, ;, g, h, r, u, e, i, w, o, q, p
- **Level 10**: j, f, d, k, s, l, a, ;, g, h, r, u, e, i, w, o, q, p, t, y

### Scoring
- **Correct Hit**: 10 points
- **Consecutive Hits Bonus**: +50 points (after 3 consecutive hits)
- **Level Up**: Occurs when score reaches target based on current level

### Difficulty Increases
- **Speed**: Letters fall faster each level
- **Spawn Rate**: Letters spawn more frequently each level
- **Letter Variety**: More letters available each level

## Customization

All game parameters can be easily modified in `js/constants.js`:

### Game Area
```javascript
GAME_WIDTH: 800,           // Width of game area
GAME_HEIGHT: 530,          // Height of game area
```

### Letter Properties
```javascript
LETTER_SIZE: 32,           // Size of letters in pixels
LETTER_SPAWN_RATE: 2000,   // Milliseconds between letter spawns
LETTER_FALL_SPEED: 1,      // Pixels per frame
LETTER_SPAWN_WIDTH: 700,   // Width range for spawning letters
```

### Game Mechanics
```javascript
MAX_LIVES: 3,              // Number of lives
POINTS_PER_LETTER: 10,     // Points for each correct letter
BONUS_POINTS: 50,          // Bonus for consecutive hits
```

### Level Progression
```javascript
LETTERS_PER_LEVEL: 2,      // New letters added per level
SPEED_INCREASE_PER_LEVEL: 0.2,    // Speed increase per level
SPAWN_RATE_DECREASE_PER_LEVEL: 100, // Faster spawning per level
```

### Level-Specific Letters
Modify the `LEVEL_LETTERS` object to change which letters appear at each level:

```javascript
LEVEL_LETTERS: {
    1: ['j', 'f'],
    2: ['j', 'f', 'd', 'k'],
    // ... add more levels
}
```

## File Structure

```
fast-typing/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── js/
│   ├── constants.js    # Game parameters and constants
│   ├── letter.js       # Letter class for falling letters
│   ├── game-state.js   # Game state management
│   ├── input-handler.js # Keyboard input handling
│   ├── renderer.js     # Visual rendering and UI
│   ├── game-loop.js    # Main game loop
│   └── main.js         # Game initialization and coordination
└── README.md           # This file
```

## Technical Details

### Architecture
The game is built with a modular architecture where each JavaScript file handles a specific aspect:

- **Letter Class**: Manages individual falling letter objects
- **Game State**: Handles score, level, lives, and game progression
- **Input Handler**: Processes keyboard events and letter matching
- **Renderer**: Manages visual updates and letter spawning
- **Game Loop**: Controls the main game cycle and timing
- **Main**: Coordinates all components and handles initialization

### Performance
- Uses `requestAnimationFrame` for smooth 60fps gameplay
- Efficient DOM manipulation with minimal reflows
- Optimized letter cleanup and memory management

### Browser Compatibility
- Modern browsers with ES6+ support
- Responsive design for various screen sizes
- Touch-friendly interface for mobile devices

## Running the Game

1. Download all files to a local directory
2. Open `index.html` in a web browser
3. No server required - runs entirely in the browser

## Debugging

The game exposes a global `fastTypingGame` object for debugging:

```javascript
// Get game statistics
console.log(fastTypingGame.getStats());

// Pause/Resume game
fastTypingGame.pause();
fastTypingGame.resume();

// Restart game
fastTypingGame.restart();
```

## Future Enhancements

Potential improvements that could be added:
- Sound effects and background music
- High score system with local storage
- Different game modes (time attack, survival, etc.)
- Customizable key layouts
- Multiplayer support
- Achievement system
- Tutorial mode for beginners

## License

This project is open source and available under the MIT License. 