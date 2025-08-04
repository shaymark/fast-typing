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
    
    // Hebrew letter sets
    HEBREW_LEVEL_LETTERS: {
        1: ['ח', 'ע'],
        2: ['ח', 'ע', 'ד', 'כ'],
        3: ['ח', 'ע', 'ד', 'כ', 'ס', 'ל'],
        4: ['ח', 'ע', 'ד', 'כ', 'ס', 'ל', 'א', 'ף'],
        5: ['ח', 'ע', 'ד', 'כ', 'ס', 'ל', 'א', 'ף', 'ג', 'ה'],
        6: ['ח', 'ע', 'ד', 'כ', 'ס', 'ל', 'א', 'ף', 'ג', 'ה', 'ר', 'ו'],
        7: ['ח', 'ע', 'ד', 'כ', 'ס', 'ל', 'א', 'ף', 'ג', 'ה', 'ר', 'ו', 'י', 'ש'],
        8: ['ח', 'ע', 'ד', 'כ', 'ס', 'ל', 'א', 'ף', 'ג', 'ה', 'ר', 'ו', 'י', 'ש', 'מ', 'נ'],
        9: ['ח', 'ע', 'ד', 'כ', 'ס', 'ל', 'א', 'ף', 'ג', 'ה', 'ר', 'ו', 'ي', 'ש', 'מ', 'נ', 'ק', 'פ'],
        10: ['ח', 'ע', 'ד', 'כ', 'ס', 'ל', 'א', 'ף', 'ג', 'ה', 'ר', 'ו', 'ي', 'ש', 'מ', 'נ', 'ק', 'פ', 'ת', 'צ']
    },
    
    // Arabic letter sets
    ARABIC_LEVEL_LETTERS: {
        1: ['ح', 'ع'],
        2: ['ح', 'ع', 'د', 'ك'],
        3: ['ح', 'ع', 'د', 'ك', 'س', 'ل'],
        4: ['ح', 'ع', 'د', 'ك', 'س', 'ل', 'ا', 'ف'],
        5: ['ح', 'ع', 'د', 'ك', 'س', 'ل', 'ا', 'ف', 'ج', 'ه'],
        6: ['ح', 'ع', 'د', 'ك', 'س', 'ل', 'ا', 'ف', 'ج', 'ه', 'ر', 'و'],
        7: ['ح', 'ع', 'د', 'ك', 'س', 'ل', 'ا', 'ف', 'ج', 'ه', 'ر', 'و', 'ي', 'ش'],
        8: ['ح', 'ع', 'د', 'ك', 'س', 'ل', 'ا', 'ف', 'ج', 'ه', 'ر', 'و', 'ي', 'ش', 'م', 'ن'],
        9: ['ح', 'ع', 'د', 'ك', 'س', 'ل', 'ا', 'ف', 'ج', 'ه', 'ر', 'و', 'ي', 'ش', 'م', 'ن', 'ق', 'ب'],
        10: ['ح', 'ع', 'د', 'ك', 'س', 'ل', 'ا', 'ف', 'ج', 'ه', 'ر', 'و', 'ي', 'ش', 'م', 'ن', 'ق', 'ب', 'ت', 'ص']
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
    },
    
    // Language modes
    LANGUAGE_MODES: {
        ENGLISH: 'english',
        HEBREW: 'hebrew',
        ARABIC: 'arabic'
    }
}; 