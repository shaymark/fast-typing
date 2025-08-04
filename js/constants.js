// Game Constants - Easy to modify parameters
const GAME_CONSTANTS = {
    // Game area dimensions
    GAME_WIDTH: 800,
    GAME_HEIGHT: 530, // 600 - 70 (header height)
    
    // Letter properties
    LETTER_SIZE: 32,
    LETTER_SPAWN_RATE: 2000, // milliseconds between letter spawns
    LETTER_FALL_SPEED: 1, // pixels per frame
    LETTER_SPAWN_WIDTH: 700, // width range for spawning letters
    
    // Game mechanics
    MAX_LIVES: 3,
    POINTS_PER_LETTER: 10,
    BONUS_POINTS: 50, // bonus for consecutive correct hits
    
    // Level progression
    LETTERS_PER_LEVEL: 2, // how many new letters to add per level
    SPEED_INCREASE_PER_LEVEL: 0.2, // speed increase per level
    SPAWN_RATE_DECREASE_PER_LEVEL: 100, // milliseconds faster spawning per level
    
    // Level-specific letter sets
    LEVEL_LETTERS: {
        1: ['j', 'f'],
        2: ['j', 'f', 'd', 'k'],
        3: ['j', 'f', 'd', 'k', 's', 'l'],
        4: ['j', 'f', 'd', 'k', 's', 'l', 'a', ';'],
        5: ['j', 'f', 'd', 'k', 's', 'l', 'a', ';', 'g', 'h'],
        6: ['j', 'f', 'd', 'k', 's', 'l', 'a', ';', 'g', 'h', 'r', 'u'],
        7: ['j', 'f', 'd', 'k', 's', 'l', 'a', ';', 'g', 'h', 'r', 'u', 'e', 'i'],
        8: ['j', 'f', 'd', 'k', 's', 'l', 'a', ';', 'g', 'h', 'r', 'u', 'e', 'i', 'w', 'o'],
        9: ['j', 'f', 'd', 'k', 's', 'l', 'a', ';', 'g', 'h', 'r', 'u', 'e', 'i', 'w', 'o', 'q', 'p'],
        10: ['j', 'f', 'd', 'k', 's', 'l', 'a', ';', 'g', 'h', 'r', 'u', 'e', 'i', 'w', 'o', 'q', 'p', 't', 'y']
    },
    
    // Animation settings
    CORRECT_HIT_ANIMATION_DURATION: 300,
    WRONG_HIT_ANIMATION_DURATION: 300,
    
    // Game states
    GAME_STATES: {
        MENU: 'menu',
        PLAYING: 'playing',
        PAUSED: 'paused',
        GAME_OVER: 'gameOver'
    }
}; 