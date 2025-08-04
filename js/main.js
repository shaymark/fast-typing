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
        this.inputHandler = new InputHandler(this.gameState, this.renderer);
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
                if (this.gameState.state === GAME_CONSTANTS.GAME_STATES.PAUSED) {
                    // Resume game if paused
                    this.inputHandler.togglePause();
                } else {
                    // Start new game
                    this.startGame();
                }
            });
        }

        // Language mode buttons
        const englishModeBtn = document.getElementById('englishMode');
        const hebrewModeBtn = document.getElementById('hebrewMode');
        const arabicModeBtn = document.getElementById('arabicMode');
        
        if (englishModeBtn) {
            englishModeBtn.addEventListener('click', () => {
                this.setLanguageMode(GAME_CONSTANTS.LANGUAGE_MODES.ENGLISH);
            });
        }
        
        if (hebrewModeBtn) {
            hebrewModeBtn.addEventListener('click', () => {
                this.setLanguageMode(GAME_CONSTANTS.LANGUAGE_MODES.HEBREW);
            });
        }
        
        if (arabicModeBtn) {
            arabicModeBtn.addEventListener('click', () => {
                this.setLanguageMode(GAME_CONSTANTS.LANGUAGE_MODES.ARABIC);
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

    // Set language mode
    setLanguageMode(mode) {
        if (this.isInitialized) {
            this.gameState.setLanguageMode(mode);
            this.renderer.clearLetters(); // Clear current letters
            
            // Update button states
            const englishModeBtn = document.getElementById('englishMode');
            const hebrewModeBtn = document.getElementById('hebrewMode');
            const arabicModeBtn = document.getElementById('arabicMode');
            
            if (englishModeBtn && hebrewModeBtn && arabicModeBtn) {
                englishModeBtn.classList.remove('active');
                hebrewModeBtn.classList.remove('active');
                arabicModeBtn.classList.remove('active');
                
                if (mode === GAME_CONSTANTS.LANGUAGE_MODES.ENGLISH) {
                    englishModeBtn.classList.add('active');
                } else if (mode === GAME_CONSTANTS.LANGUAGE_MODES.HEBREW) {
                    hebrewModeBtn.classList.add('active');
                } else if (mode === GAME_CONSTANTS.LANGUAGE_MODES.ARABIC) {
                    arabicModeBtn.classList.add('active');
                }
            }
            
            // Show/hide keyboard layout
            this.updateKeyboardLayout(mode);
            
            console.log('Language mode changed to:', mode);
        }
    }

    // Update keyboard layout display
    updateKeyboardLayout(mode) {
        const keyboardLayout = document.getElementById('keyboardLayout');
        if (!keyboardLayout) return;
        
        if (mode === GAME_CONSTANTS.LANGUAGE_MODES.ARABIC) {
            keyboardLayout.innerHTML = `
                <img src="arabic_keyboard.png" alt="Arabic Keyboard Layout">
            `;
            keyboardLayout.classList.add('show');
        } else {
            keyboardLayout.classList.remove('show');
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