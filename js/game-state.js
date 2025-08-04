// Game state management
class GameState {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.lives = GAME_CONSTANTS.MAX_LIVES;
        this.state = GAME_CONSTANTS.GAME_STATES.MENU;
        this.consecutiveHits = 0;
        this.letters = [];
        this.lastSpawnTime = 0;
        this.currentSpawnRate = GAME_CONSTANTS.LETTER_SPAWN_RATE;
        this.currentFallSpeed = GAME_CONSTANTS.LETTER_FALL_SPEED;
    }

    // Reset game state for new game
    reset() {
        this.score = 0;
        this.level = 1;
        this.lives = GAME_CONSTANTS.MAX_LIVES;
        this.state = GAME_CONSTANTS.GAME_STATES.PLAYING;
        this.consecutiveHits = 0;
        this.letters = [];
        this.lastSpawnTime = 0;
        this.currentSpawnRate = GAME_CONSTANTS.LETTER_SPAWN_RATE;
        this.currentFallSpeed = GAME_CONSTANTS.LETTER_FALL_SPEED;
    }

    // Add points to score
    addScore(points) {
        this.score += points;
        this.updateUI();
    }

    // Lose a life
    loseLife() {
        this.lives--;
        this.consecutiveHits = 0;
        this.updateUI();
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    // Handle correct letter hit
    handleCorrectHit() {
        this.consecutiveHits++;
        let points = GAME_CONSTANTS.POINTS_PER_LETTER;
        
        // Bonus for consecutive hits
        if (this.consecutiveHits >= 3) {
            points += GAME_CONSTANTS.BONUS_POINTS;
        }
        
        this.addScore(points);
        this.checkLevelUp();
    }

    // Handle wrong key press
    handleWrongHit() {
        this.consecutiveHits = 0;
    }

    // Check if player should level up
    checkLevelUp() {
        const lettersForCurrentLevel = this.getAvailableLetters().length;
        const targetScore = this.level * lettersForCurrentLevel * GAME_CONSTANTS.POINTS_PER_LETTER;
        
        if (this.score >= targetScore) {
            this.levelUp();
        }
    }

    // Level up the player
    levelUp() {
        this.level++;
        this.consecutiveHits = 0;
        
        // Increase difficulty
        this.currentFallSpeed += GAME_CONSTANTS.SPEED_INCREASE_PER_LEVEL;
        this.currentSpawnRate = Math.max(
            500, // Minimum spawn rate
            this.currentSpawnRate - GAME_CONSTANTS.SPAWN_RATE_DECREASE_PER_LEVEL
        );
        
        this.updateUI();
    }

    // Get available letters for current level
    getAvailableLetters() {
        const maxLevel = Math.max(...Object.keys(GAME_CONSTANTS.LEVEL_LETTERS).map(Number));
        const level = Math.min(this.level, maxLevel);
        return GAME_CONSTANTS.LEVEL_LETTERS[level] || GAME_CONSTANTS.LEVEL_LETTERS[maxLevel];
    }

    // Add a new letter to the game
    addLetter(letter) {
        this.letters.push(letter);
    }

    // Remove a letter from the game
    removeLetter(letter) {
        const index = this.letters.indexOf(letter);
        if (index > -1) {
            this.letters.splice(index, 1);
        }
    }

    // Check if it's time to spawn a new letter
    shouldSpawnLetter(currentTime) {
        return currentTime - this.lastSpawnTime >= this.currentSpawnRate;
    }

    // Update spawn time
    updateSpawnTime(currentTime) {
        this.lastSpawnTime = currentTime;
    }

    // Get current fall speed
    getCurrentFallSpeed() {
        return this.currentFallSpeed;
    }

    // Check if game is over
    isGameOver() {
        return this.lives <= 0;
    }

    // End the game
    gameOver() {
        this.state = GAME_CONSTANTS.GAME_STATES.GAME_OVER;
    }

    // Update UI elements
    updateUI() {
        const scoreElement = document.getElementById('score');
        const levelElement = document.getElementById('level');
        const livesElement = document.getElementById('lives');
        
        if (scoreElement) scoreElement.textContent = this.score;
        if (levelElement) levelElement.textContent = this.level;
        if (livesElement) livesElement.textContent = this.lives;
    }

    // Get game statistics
    getStats() {
        return {
            score: this.score,
            level: this.level,
            lives: this.lives,
            consecutiveHits: this.consecutiveHits,
            lettersInPlay: this.letters.length
        };
    }
} 