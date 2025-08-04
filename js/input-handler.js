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
        
        // For Hebrew mode, we need to handle Hebrew character input
        if (this.gameState.getLanguageMode() === GAME_CONSTANTS.LANGUAGE_MODES.HEBREW) {
            // Hebrew letters can be input in different ways depending on keyboard layout
            // We'll check both the direct character and some common Hebrew keyboard mappings
            const hebrewMappings = {
                'ח': ['ח', 'j', 'h'],
                'ע': ['ע', 'g', 'u'],
                'ד': ['ד', 'd', 's'],
                'כ': ['כ', 'f', 'k'],
                'ס': ['ס', 'x', 'c'],
                'ל': ['ל', 'k', 'l'],
                'א': ['א', 't', 'a'],
                'ף': ['ף', 'p', ';'],
                'ג': ['ג', 'd', 'g'],
                'ה': ['ה', 'h', 'v'],
                'ר': ['ר', 'r', 'e'],
                'ו': ['ו', 'v', 'w'],
                'י': ['י', 'y', 'i'],
                'ש': ['ש', 'a', 'w'],
                'מ': ['מ', 'n', 'm'],
                'נ': ['נ', 'n', 'b'],
                'ק': ['ק', 'e', 'q'],
                'פ': ['פ', 'p', 'f'],
                'ת': ['ת', ',', 't'],
                'צ': ['צ', 'm', 'c']
            };
            
            for (const letter of availableLetters) {
                if (hebrewMappings[letter] && hebrewMappings[letter].includes(key)) {
                    return true;
                }
            }
        }
        
        // For Arabic mode, we need to handle Arabic character input
        if (this.gameState.getLanguageMode() === GAME_CONSTANTS.LANGUAGE_MODES.ARABIC) {
            // Arabic letters can be input in different ways depending on keyboard layout
            // We'll check both the direct character and some common Arabic keyboard mappings
            const arabicMappings = {
                'ح': ['ح', 'h', 'j'],
                'ع': ['ع', 'a', 'e'],
                'د': ['د', 'd', 's'],
                'ك': ['ك', 'k', 'f'],
                'س': ['س', 's', 'x'],
                'ل': ['ل', 'l', 'k'],
                'ا': ['ا', 'a', 't'],
                'ف': ['ف', 'f', 'p'],
                'ج': ['ج', 'j', 'g'],
                'ه': ['ه', 'h', 'v'],
                'ر': ['ر', 'r', 'e'],
                'و': ['و', 'w', 'v'],
                'ي': ['ي', 'y', 'i'],
                'ش': ['ش', 'sh', 'w'],
                'م': ['م', 'm', 'n'],
                'ن': ['ن', 'n', 'b'],
                'ق': ['ق', 'q', 'e'],
                'ب': ['ب', 'b', 'p'],
                'ت': ['ت', 't', ','],
                'ص': ['ص', 's', 'c']
            };
            
            for (const letter of availableLetters) {
                if (arabicMappings[letter] && arabicMappings[letter].includes(key)) {
                    return true;
                }
            }
        }
        
        return availableLetters.includes(key);
    }

    // Check if pressed key matches any falling letter
    checkLetterMatch(pressedKey) {
        const letters = this.gameState.letters;
        let foundMatch = false;

        // Find the first letter that matches the pressed key
        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            
            if (!letter.isHit && this.isKeyMatch(letter.char, pressedKey)) {
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

    // Check if a key matches a letter (handles Hebrew and Arabic mappings)
    isKeyMatch(letterChar, pressedKey) {
        if (letterChar === pressedKey) {
            return true;
        }
        
        // For Hebrew mode, check keyboard mappings
        if (this.gameState.getLanguageMode() === GAME_CONSTANTS.LANGUAGE_MODES.HEBREW) {
            const hebrewMappings = {
                'ח': ['ח', 'j', 'h'],
                'ע': ['ע', 'g', 'u'],
                'ד': ['ד', 'd', 's'],
                'כ': ['כ', 'f', 'k'],
                'ס': ['ס', 'x', 'c'],
                'ל': ['ל', 'k', 'l'],
                'א': ['א', 't', 'a'],
                'ף': ['ף', 'p', ';'],
                'ג': ['ג', 'd', 'g'],
                'ה': ['ה', 'h', 'v'],
                'ר': ['ר', 'r', 'e'],
                'ו': ['ו', 'v', 'w'],
                'י': ['י', 'y', 'i'],
                'ש': ['ש', 'a', 'w'],
                'מ': ['מ', 'n', 'm'],
                'נ': ['נ', 'n', 'b'],
                'ק': ['ק', 'e', 'q'],
                'פ': ['פ', 'p', 'f'],
                'ת': ['ת', ',', 't'],
                'צ': ['צ', 'm', 'c']
            };
            
            const mappings = hebrewMappings[letterChar];
            return mappings && mappings.includes(pressedKey);
        }
        
        // For Arabic mode, check keyboard mappings
        if (this.gameState.getLanguageMode() === GAME_CONSTANTS.LANGUAGE_MODES.ARABIC) {
            const arabicMappings = {
                'ح': ['ح', 'h', 'j'],
                'ع': ['ع', 'a', 'e'],
                'د': ['د', 'd', 's'],
                'ك': ['ك', 'k', 'f'],
                'س': ['س', 's', 'x'],
                'ل': ['ل', 'l', 'k'],
                'ا': ['ا', 'a', 't'],
                'ف': ['ف', 'f', 'p'],
                'ج': ['ج', 'j', 'g'],
                'ه': ['ه', 'h', 'v'],
                'ر': ['ر', 'r', 'e'],
                'و': ['و', 'w', 'v'],
                'ي': ['ي', 'y', 'i'],
                'ش': ['ش', 'sh', 'w'],
                'م': ['م', 'm', 'n'],
                'ن': ['ن', 'n', 'b'],
                'ق': ['ق', 'q', 'e'],
                'ب': ['ب', 'b', 'p'],
                'ت': ['ت', 't', ','],
                'ص': ['ص', 's', 'c']
            };
            
            const mappings = arabicMappings[letterChar];
            return mappings && mappings.includes(pressedKey);
        }
        
        return false;
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

        for (let i = letters.length - 1; i >= 0; i--) {
            const letter = letters[i];
            
            if (letter.hasReachedBottom() && !letter.isHit) {
                letter.hitWrong(); // Mark as wrong hit
                letter.isHit = true; // Mark as hit so it doesn't count again
                
                // Lose a life for each letter that reaches the bottom
                this.gameState.loseLife();
            }
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