// Main game initialization and coordination
class FastTypingGame {
    constructor() {
        this.gameState = null;
        this.inputHandler = null;
        this.renderer = null;
        this.gameLoop = null;
        this.isInitialized = false;
    }

    // Initialize the game
    init() {
        if (this.isInitialized) return;

        // Create game components
        this.gameState = new GameState();
        this.renderer = new Renderer(this.gameState);
        this.inputHandler = new InputHandler(this.gameState);
        this.gameLoop = new GameLoop(this.gameState, this.inputHandler, this.renderer);

        // Setup event listeners
        this.setupEventListeners();

        // Show initial menu
        this.renderer.showMenu();

        this.isInitialized = true;
        console.log('Fast Typing Game initialized successfully!');
    }

    // Setup event listeners for UI
    setupEventListeners() {
        // Start button click
        const startButton = document.getElementById('startButton');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.startGame();
            });
        }

        // Keyboard events for starting game
        document.addEventListener('keydown', (event) => {
            if (this.gameState.state === GAME_CONSTANTS.GAME_STATES.MENU) {
                this.startGame();
            }
        });

        // Pause on window blur
        window.addEventListener('blur', () => {
            if (this.gameState.state === GAME_CONSTANTS.GAME_STATES.PLAYING) {
                this.gameLoop.pause();
            }
        });

        // Resume on window focus
        window.addEventListener('focus', () => {
            if (this.gameState.state === GAME_CONSTANTS.GAME_STATES.PAUSED) {
                this.gameLoop.resume();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // Start a new game
    startGame() {
        if (this.gameState.state === GAME_CONSTANTS.GAME_STATES.PLAYING) {
            return; // Already playing
        }

        this.gameLoop.startNewGame();
        console.log('Game started!');
    }

    // Handle window resize
    handleResize() {
        // Update game area dimensions if needed
        const dimensions = this.renderer.getGameAreaDimensions();
        console.log('Game area resized:', dimensions);
    }

    // Get game statistics (for debugging)
    getStats() {
        if (!this.isInitialized) {
            return { error: 'Game not initialized' };
        }

        return {
            gameState: this.gameState.getStats(),
            gameLoop: this.gameLoop.getStats(),
            isInitialized: this.isInitialized
        };
    }

    // Pause the game
    pause() {
        if (this.isInitialized) {
            this.gameLoop.pause();
        }
    }

    // Resume the game
    resume() {
        if (this.isInitialized) {
            this.gameLoop.resume();
        }
    }

    // Restart the game
    restart() {
        if (this.isInitialized) {
            this.gameLoop.startNewGame();
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new FastTypingGame();
    game.init();

    // Make game available globally for debugging
    window.fastTypingGame = game;

    console.log('Fast Typing Game loaded!');
    console.log('Available letters for level 1:', GAME_CONSTANTS.LEVEL_LETTERS[1]);
    console.log('Game constants:', GAME_CONSTANTS);
}); 