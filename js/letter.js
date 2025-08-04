// Letter class to handle individual falling letters
class Letter {
    constructor(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;
        this.element = null;
        this.isHit = false;
        this.isCorrect = false;
        this.animationStartTime = null;
    }

    // Create DOM element for the letter
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'falling-letter';
        this.element.textContent = this.char;
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        return this.element;
    }

    // Update letter position
    update() {
        if (!this.isHit) {
            this.y += GAME_CONSTANTS.LETTER_FALL_SPEED;
            if (this.element) {
                this.element.style.top = this.y + 'px';
            }
        }
    }

    // Handle correct key press
    hitCorrect() {
        this.isHit = true;
        this.isCorrect = true;
        this.animationStartTime = Date.now();
        
        if (this.element) {
            this.element.classList.add('correct');
        }
    }

    // Handle wrong key press
    hitWrong() {
        this.isCorrect = false;
        this.animationStartTime = Date.now();
        
        if (this.element) {
            this.element.classList.add('wrong');
        }
    }

    // Check if letter has reached the bottom
    hasReachedBottom() {
        return this.y >= GAME_CONSTANTS.GAME_HEIGHT;
    }

    // Check if animation is complete
    isAnimationComplete() {
        if (!this.animationStartTime) return false;
        
        const animationDuration = this.isCorrect ? 
            GAME_CONSTANTS.CORRECT_HIT_ANIMATION_DURATION : 
            GAME_CONSTANTS.WRONG_HIT_ANIMATION_DURATION;
            
        return Date.now() - this.animationStartTime >= animationDuration;
    }

    // Remove letter from DOM
    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    // Get letter bounds for collision detection
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: GAME_CONSTANTS.LETTER_SIZE,
            height: GAME_CONSTANTS.LETTER_SIZE
        };
    }
} 