// Input handler for keyboard events
class InputHandler {
    constructor(gameState) {
        this.gameState = gameState;
        this.pressedKeys = new Set();
        this.setupEventListeners();
    }

    // Setup keyboard event listeners
    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            this.handleKeyDown(event);
        });

        document.addEventListener('keyup', (event) => {
            this.handleKeyUp(event);
        });

        // Prevent default behavior for game keys
        document.addEventListener('keydown', (event) => {
            if (this.isGameKey(event.key)) {
                event.preventDefault();
            }
        });
    }

    // Handle key down events
    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        
        if (this.gameState.state !== GAME_CONSTANTS.GAME_STATES.PLAYING) {
            return;
        }

        if (this.isGameKey(key)) {
            this.pressedKeys.add(key);
            this.checkLetterMatch(key);
        }
    }

    // Handle key up events
    handleKeyUp(event) {
        const key = event.key.toLowerCase();
        this.pressedKeys.delete(key);
    }

    // Check if a key is a game key (available letters)
    isGameKey(key) {
        const availableLetters = this.gameState.getAvailableLetters();
        return availableLetters.includes(key);
    }

    // Check if pressed key matches any falling letter
    checkLetterMatch(pressedKey) {
        const letters = this.gameState.letters;
        let foundMatch = false;

        // Find the first letter that matches the pressed key
        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            
            if (!letter.isHit && letter.char === pressedKey) {
                // Found a match!
                letter.hitCorrect();
                this.gameState.handleCorrectHit();
                foundMatch = true;
                break;
            }
        }

        // If no match found, it's a wrong key press
        if (!foundMatch) {
            this.handleWrongKeyPress(pressedKey);
        }
    }

    // Handle wrong key press
    handleWrongKeyPress(pressedKey) {
        // Find any letter to show wrong animation
        const letters = this.gameState.letters;
        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            if (!letter.isHit) {
                letter.hitWrong();
                break;
            }
        }
        
        this.gameState.handleWrongHit();
    }

    // Check if any letters have reached the bottom
    checkLettersAtBottom() {
        const letters = this.gameState.letters;
        let lettersAtBottom = 0;

        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            
            if (letter.hasReachedBottom() && !letter.isHit) {
                lettersAtBottom++;
                letter.hitWrong(); // Mark as wrong hit
            }
        }

        // If 3 or more letters reach bottom, lose a life
        if (lettersAtBottom >= 3) {
            this.gameState.loseLife();
        }
    }

    // Get currently pressed keys
    getPressedKeys() {
        return Array.from(this.pressedKeys);
    }

    // Clear all pressed keys
    clearPressedKeys() {
        this.pressedKeys.clear();
    }

    // Check if a specific key is currently pressed
    isKeyPressed(key) {
        return this.pressedKeys.has(key.toLowerCase());
    }
} 