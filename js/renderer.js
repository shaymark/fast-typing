// Renderer class to handle visual updates and letter spawning
class Renderer {
    constructor(gameState) {
        this.gameState = gameState;
        this.gameArea = document.getElementById('gameArea');
        this.overlay = document.getElementById('gameOverlay');
        this.overlayTitle = document.getElementById('overlayTitle');
        this.overlayMessage = document.getElementById('overlayMessage');
        this.startButton = document.getElementById('startButton');
    }

    // Spawn a new letter
    spawnLetter() {
        const availableLetters = this.gameState.getAvailableLetters();
        const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
        
        // Random X position within spawn width
        const x = Math.random() * (GAME_CONSTANTS.LETTER_SPAWN_WIDTH - GAME_CONSTANTS.LETTER_SIZE);
        
        // Start from top of game area
        const y = -GAME_CONSTANTS.LETTER_SIZE;
        
        const letter = new Letter(randomLetter, x, y);
        const element = letter.createElement();
        
        this.gameArea.appendChild(element);
        this.gameState.addLetter(letter);
    }

    // Update all letters
    updateLetters() {
        const letters = this.gameState.letters;
        const currentFallSpeed = this.gameState.getCurrentFallSpeed();
        
        for (let i = letters.length - 1; i >= 0; i--) {
            const letter = letters[i];
            
            // Update letter position with current fall speed
            letter.update(currentFallSpeed);
            
            // Check if letter animation is complete and should be removed
            if (letter.isHit && letter.isAnimationComplete()) {
                letter.remove();
                this.gameState.removeLetter(letter);
            }
        }
    }

    // Show menu overlay
    showMenu() {
        this.overlayTitle.textContent = 'Fast Typing Game';
        this.overlayMessage.textContent = 'Press any key to start!';
        this.startButton.textContent = 'Start Game';
        this.overlay.classList.remove('hidden');
    }

    // Show game over overlay
    showGameOver() {
        this.overlayTitle.textContent = 'Game Over!';
        this.overlayMessage.textContent = `Final Score: ${this.gameState.score} | Level: ${this.gameState.level}`;
        this.startButton.textContent = 'Play Again';
        this.overlay.classList.remove('hidden');
    }

    // Hide overlay
    hideOverlay() {
        this.overlay.classList.add('hidden');
    }

    // Clear all letters from the game area
    clearLetters() {
        const letters = this.gameState.letters;
        for (let i = letters.length - 1; i >= 0; i--) {
            letters[i].remove();
        }
        this.gameState.letters = [];
        
        // Also remove any remaining letter elements from DOM
        const letterElements = this.gameArea.querySelectorAll('.falling-letter');
        letterElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    }

    // Show level up notification
    showLevelUp() {
        // Create a temporary level up notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #4facfe, #00f2fe);
            color: white;
            padding: 20px 40px;
            border-radius: 15px;
            font-size: 24px;
            font-weight: bold;
            z-index: 1000;
            animation: levelUpAnimation 2s ease-out forwards;
        `;
        notification.textContent = `Level ${this.gameState.level}!`;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes levelUpAnimation {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        this.gameArea.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 2000);
    }

    // Show score popup
    showScorePopup(x, y, points) {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            color: #27ae60;
            font-size: 18px;
            font-weight: bold;
            pointer-events: none;
            z-index: 1000;
            animation: scorePopup 1s ease-out forwards;
        `;
        popup.textContent = `+${points}`;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scorePopup {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-30px); }
            }
        `;
        document.head.appendChild(style);
        
        this.gameArea.appendChild(popup);
        
        // Remove popup after animation
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 1000);
    }

    // Get game area dimensions
    getGameAreaDimensions() {
        return {
            width: this.gameArea.offsetWidth,
            height: this.gameArea.offsetHeight
        };
    }
} 