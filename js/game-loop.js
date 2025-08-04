// Game loop to handle the main game cycle
class GameLoop {
    constructor(gameState, inputHandler, renderer) {
        this.gameState = gameState;
        this.inputHandler = inputHandler;
        this.renderer = renderer;
        this.isRunning = false;
        this.lastTime = 0;
        this.animationId = null;
    }

    // Start the game loop
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }

    // Stop the game loop
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // Main game loop
    gameLoop(currentTime = performance.now()) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update game logic
        this.update(deltaTime, currentTime);

        // Continue the loop
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }

    // Update game state
    update(deltaTime, currentTime) {
        if (this.gameState.state !== GAME_CONSTANTS.GAME_STATES.PLAYING) {
            return;
        }

        // Spawn new letters
        if (this.gameState.shouldSpawnLetter(currentTime)) {
            this.renderer.spawnLetter();
            this.gameState.updateSpawnTime(currentTime);
        }

        // Update all letters
        this.renderer.updateLetters();

        // Check for letters at bottom
        this.inputHandler.checkLettersAtBottom();

        // Check for level up
        this.checkLevelUp();

        // Check for game over
        if (this.gameState.isGameOver()) {
            this.gameOver();
        }
    }

    // Check if player should level up
    checkLevelUp() {
        const currentLevel = this.gameState.level;
        const lettersForCurrentLevel = this.gameState.getAvailableLetters().length;
        const targetScore = currentLevel * lettersForCurrentLevel * GAME_CONSTANTS.POINTS_PER_LETTER;
        
        if (this.gameState.score >= targetScore && this.gameState.score > 0) {
            // Level up
            this.gameState.levelUp();
            this.renderer.showLevelUp();
        }
    }

    // Handle game over
    gameOver() {
        this.stop();
        this.gameState.gameOver();
        this.renderer.showGameOver();
    }

    // Start a new game
    startNewGame() {
        // Reset game state
        this.gameState.reset();
        
        // Clear all letters
        this.renderer.clearLetters();
        
        // Hide overlay
        this.renderer.hideOverlay();
        
        // Clear input
        this.inputHandler.clearPressedKeys();
        
        // Start game loop
        this.start();
    }

    // Pause the game
    pause() {
        if (this.gameState.state === GAME_CONSTANTS.GAME_STATES.PLAYING) {
            this.gameState.state = GAME_CONSTANTS.GAME_STATES.PAUSED;
            this.stop();
        }
    }

    // Resume the game
    resume() {
        if (this.gameState.state === GAME_CONSTANTS.GAME_STATES.PAUSED) {
            this.gameState.state = GAME_CONSTANTS.GAME_STATES.PLAYING;
            this.start();
        }
    }

    // Get current FPS (for debugging)
    getFPS() {
        return 1000 / (performance.now() - this.lastTime);
    }

    // Update spawn rate from slider
    updateSpawnRate() {
        this.gameState.currentSpawnRate = GAME_CONSTANTS.getDynamicSpawnRate();
        console.log('Game spawn rate updated to:', this.gameState.currentSpawnRate + 'ms');
    }

    // Update fall speed from slider
    updateFallSpeed() {
        this.gameState.currentFallSpeed = GAME_CONSTANTS.getDynamicFallSpeed();
        console.log('Game fall speed updated to:', this.gameState.currentFallSpeed);
    }

    // Get game statistics
    getStats() {
        return {
            isRunning: this.isRunning,
            gameState: this.gameState.getStats(),
            fps: this.getFPS()
        };
    }
} 