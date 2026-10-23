/**
 * MemoryMatch.js - Card Matching Game
 * Match terms with their definitions
 * Features: Timer, moves counter, difficulty levels, leaderboard,
 * flip animations, celebrations, combos, near-miss feedback, themes
 */

const MemoryMatch = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 0,
    moves: 0,
    startTime: null,
    timer: null,
    elapsedTime: 0,
    difficulty: 'medium',
    selectedTopic: 'all',
    isLocked: false,
    
    // New features
    combo: 0,
    maxCombo: 0,
    score: 0,
    currentTheme: 'classic',
    currentLevel: 1,
    timeLimit: 0,
    lastFlippedPairId: null,

    difficulties: {
        easy: { pairs: 6, name: 'Easy (6 pairs)', gridCols: 4, timeLimit: 120 },
        medium: { pairs: 8, name: 'Medium (8 pairs)', gridCols: 4, timeLimit: 150 },
        hard: { pairs: 12, name: 'Hard (12 pairs)', gridCols: 6, timeLimit: 180 },
        expert: { pairs: 15, name: 'Expert (15 pairs)', gridCols: 6, timeLimit: 240 }
    },

    // Card themes
    themes: {
        classic: {
            name: '🃏 Classic',
            termIcon: '📝',
            defIcon: '💡',
            cardBack: '❓'
        },
        circuits: {
            name: '⚡ Circuits',
            termIcon: '🔌',
            defIcon: '💡',
            cardBack: '⚡'
        },
        binary: {
            name: '🔢 Binary',
            termIcon: '1️⃣',
            defIcon: '0️⃣',
            cardBack: '🔢'
        },
        icons: {
            name: '💻 Tech Icons',
            termIcon: '🖥️',
            defIcon: '⚙️',
            cardBack: '💾'
        },
        space: {
            name: '🚀 Space',
            termIcon: '🌟',
            defIcon: '🪐',
            cardBack: '🚀'
        },
        nature: {
            name: '🌿 Nature',
            termIcon: '🌸',
            defIcon: '🍃',
            cardBack: '🌿'
        }
    },

    // Level progression settings
    levelProgression: {
        1: { pairs: 4, timeLimit: 90, timeBonusMultiplier: 1.0 },
        2: { pairs: 6, timeLimit: 100, timeBonusMultiplier: 1.2 },
        3: { pairs: 8, timeLimit: 110, timeBonusMultiplier: 1.4 },
        4: { pairs: 10, timeLimit: 120, timeBonusMultiplier: 1.6 },
        5: { pairs: 12, timeLimit: 130, timeBonusMultiplier: 1.8 },
        6: { pairs: 15, timeLimit: 150, timeBonusMultiplier: 2.0 }
    },

    // Term-definition pairs for matching
    termPairs: [
        { term: 'Algorithm', definition: 'A step-by-step procedure for solving a problem' },
        { term: 'Variable', definition: 'A named storage location that can hold a value' },
        { term: 'Loop', definition: 'A programming construct that repeats code' },
        { term: 'Array', definition: 'A data structure storing multiple items of the same type' },
        { term: 'Function', definition: 'A reusable block of code that performs a task' },
        { term: 'Boolean', definition: 'A data type with only true or false values' },
        { term: 'String', definition: 'A sequence of characters treated as text' },
        { term: 'Integer', definition: 'A whole number without decimal places' },
        { term: 'CPU', definition: 'The brain of the computer that processes instructions' },
        { term: 'RAM', definition: 'Volatile memory for temporary data storage' },
        { term: 'ROM', definition: 'Non-volatile memory that retains data when powered off' },
        { term: 'Binary', definition: 'A number system using only 0 and 1' },
        { term: 'Hexadecimal', definition: 'A base-16 number system using 0-9 and A-F' },
        { term: 'ASCII', definition: 'A character encoding standard for text' },
        { term: 'Pixel', definition: 'The smallest unit of a digital image' },
        { term: 'Bit', definition: 'The smallest unit of data (0 or 1)' },
        { term: 'Byte', definition: 'A unit of data equal to 8 bits' },
        { term: 'IP Address', definition: 'A unique identifier for a device on a network' },
        { term: 'Protocol', definition: 'A set of rules for data communication' },
        { term: 'Encryption', definition: 'Converting data into a coded format for security' },
        { term: 'Firewall', definition: 'A security system that monitors network traffic' },
        { term: 'Malware', definition: 'Malicious software designed to cause harm' },
        { term: 'Compiler', definition: 'Translates entire source code to machine code' },
        { term: 'Interpreter', definition: 'Executes code line by line without compiling' },
        { term: 'Debugging', definition: 'The process of finding and fixing errors' },
        { term: 'Iteration', definition: 'Repeating a process or set of instructions' },
        { term: 'Selection', definition: 'Making decisions based on conditions (if/else)' },
        { term: 'Sequence', definition: 'Executing instructions in order, one after another' },
        { term: 'Decomposition', definition: 'Breaking a problem into smaller parts' },
        { term: 'Abstraction', definition: 'Hiding complexity and showing only essentials' }
    ],

    // Inject CSS for animations
    injectStyles: () => {
        if (document.getElementById('mm-enhanced-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'mm-enhanced-styles';
        styles.textContent = `
            /* Card flip animation */
            .mm-card {
                perspective: 1000px;
                cursor: pointer;
                transition: transform 0.1s ease;
            }
            
            .mm-card:hover:not(.flipped):not(.matched) {
                transform: scale(1.05);
            }
            
            .mm-card:active:not(.flipped):not(.matched) {
                transform: scale(0.95);
            }
            
            .mm-card-inner {
                position: relative;
                width: 100%;
                height: 100%;
                transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
                transform-style: preserve-3d;
            }
            
            .mm-card.flipped .mm-card-inner {
                transform: rotateY(180deg);
            }
            
            .mm-card-front, .mm-card-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                padding: 8px;
                box-sizing: border-box;
            }
            
            .mm-card-front {
                background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--primary-dark, #4f46e5) 100%);
                box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
            }
            
            .mm-card-back {
                background: var(--card-bg, #1e1e2e);
                transform: rotateY(180deg);
                border: 2px solid var(--border, #363654);
            }
            
            .mm-card.term .mm-card-back {
                border-color: var(--primary, #6366f1);
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);
            }
            
            .mm-card.definition .mm-card-back {
                border-color: var(--success, #22c55e);
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 100%);
            }
            
            /* Match animation */
            .mm-card.matched {
                animation: matchPulse 0.6s ease;
            }
            
            .mm-card.matched .mm-card-inner {
                transform: rotateY(180deg);
            }
            
            .mm-card.matched .mm-card-back {
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);
                border-color: var(--success, #22c55e);
                box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
            }
            
            @keyframes matchPulse {
                0% { transform: scale(1); }
                30% { transform: scale(1.15); }
                60% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }
            
            /* No match shake */
            .mm-card.no-match {
                animation: cardShake 0.5s ease;
            }
            
            @keyframes cardShake {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-8px) rotate(-2deg); }
                40% { transform: translateX(8px) rotate(2deg); }
                60% { transform: translateX(-6px) rotate(-1deg); }
                80% { transform: translateX(6px) rotate(1deg); }
            }
            
            /* Sparkle effect */
            .mm-sparkle {
                position: absolute;
                pointer-events: none;
                font-size: 24px;
                animation: sparkleFloat 1s ease-out forwards;
                z-index: 1000;
            }
            
            @keyframes sparkleFloat {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(0.5) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: translate(var(--tx, 20px), var(--ty, -30px)) scale(1.2) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: translate(calc(var(--tx, 20px) * 2), calc(var(--ty, -30px) * 2)) scale(0.3) rotate(360deg);
                }
            }
            
            /* Points floating */
            .mm-points-float {
                position: absolute;
                font-size: 20px;
                font-weight: bold;
                color: var(--success, #22c55e);
                text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
                animation: pointsFloat 1.2s ease-out forwards;
                z-index: 1000;
                pointer-events: none;
            }
            
            .mm-points-float.combo {
                color: #f59e0b;
                font-size: 24px;
                text-shadow: 0 0 15px rgba(245, 158, 11, 0.6);
            }
            
            @keyframes pointsFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(0.8);
                }
                20% {
                    transform: translateY(-10px) scale(1.2);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-60px) scale(0.9);
                }
            }
            
            /* Combo indicator */
            .mm-combo-indicator {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 48px;
                font-weight: bold;
                color: #f59e0b;
                text-shadow: 0 0 30px rgba(245, 158, 11, 0.8);
                animation: comboPopIn 0.8s ease-out forwards;
                z-index: 2000;
                pointer-events: none;
            }
            
            @keyframes comboPopIn {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.3) rotate(-10deg);
                }
                30% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.3) rotate(5deg);
                }
                60% {
                    transform: translate(-50%, -50%) scale(0.95) rotate(-2deg);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                }
            }
            
            /* Almost feedback */
            .mm-almost-feedback {
                position: fixed;
                top: 30%;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 24px;
                background: rgba(239, 68, 68, 0.9);
                color: white;
                font-size: 18px;
                font-weight: bold;
                border-radius: 30px;
                animation: almostPop 1s ease-out forwards;
                z-index: 2000;
                pointer-events: none;
            }
            
            @keyframes almostPop {
                0% {
                    opacity: 0;
                    transform: translateX(-50%) scale(0.5);
                }
                20% {
                    opacity: 1;
                    transform: translateX(-50%) scale(1.1);
                }
                80% {
                    opacity: 1;
                    transform: translateX(-50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateX(-50%) scale(0.9) translateY(-20px);
                }
            }
            
            /* Stats bar enhancements */
            .mm-combo-display {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                padding: 4px 12px;
                border-radius: 20px;
                font-weight: bold;
                animation: comboPulse 0.5s ease infinite alternate;
            }
            
            .mm-combo-display.inactive {
                background: rgba(245, 158, 11, 0.2);
                animation: none;
            }
            
            @keyframes comboPulse {
                from { box-shadow: 0 0 5px rgba(245, 158, 11, 0.5); }
                to { box-shadow: 0 0 15px rgba(245, 158, 11, 0.8); }
            }
            
            /* Timer warning */
            .mm-timer-warning {
                color: #ef4444 !important;
                animation: timerPulse 0.5s ease infinite alternate;
            }
            
            @keyframes timerPulse {
                from { opacity: 1; }
                to { opacity: 0.5; }
            }
            
            /* Theme selector */
            .mm-theme-selector {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                justify-content: center;
                margin: 16px 0;
            }
            
            .mm-theme-btn {
                padding: 8px 16px;
                border: 2px solid var(--border, #363654);
                background: var(--card-bg, #1e1e2e);
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
            }
            
            .mm-theme-btn:hover {
                border-color: var(--primary, #6366f1);
                transform: translateY(-2px);
            }
            
            .mm-theme-btn.selected {
                border-color: var(--primary, #6366f1);
                background: rgba(99, 102, 241, 0.2);
                box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
            }
            
            /* Level progression */
            .mm-level-display {
                background: linear-gradient(135deg, var(--primary, #6366f1) 0%, #8b5cf6 100%);
                padding: 4px 12px;
                border-radius: 20px;
                font-weight: bold;
            }
            
            /* Progress mode indicator */
            .mm-mode-toggle {
                display: flex;
                gap: 8px;
                justify-content: center;
                margin: 12px 0;
            }
            
            .mm-mode-btn {
                padding: 10px 20px;
                border: 2px solid var(--border, #363654);
                background: var(--card-bg, #1e1e2e);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .mm-mode-btn:hover {
                border-color: var(--primary, #6366f1);
            }
            
            .mm-mode-btn.selected {
                border-color: var(--primary, #6366f1);
                background: rgba(99, 102, 241, 0.2);
            }
            
            /* Card theme variations */
            .mm-card.theme-circuits .mm-card-front {
                background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
            }
            
            .mm-card.theme-binary .mm-card-front {
                background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
            }
            
            .mm-card.theme-icons .mm-card-front {
                background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
            }
            
            .mm-card.theme-space .mm-card-front {
                background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
            }
            
            .mm-card.theme-nature .mm-card-front {
                background: linear-gradient(135deg, #166534 0%, #22c55e 100%);
            }
            
            /* Level complete celebration */
            .mm-level-complete {
                position: fixed;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.8);
                z-index: 3000;
                animation: fadeIn 0.3s ease;
            }
            
            .mm-level-complete-content {
                text-align: center;
                animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.5); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    },

    open: () => {
        try {
            MemoryMatch.injectStyles();
            
            const modal = document.createElement('div');
            modal.className = 'game-modal memory-match-modal';
            modal.id = 'memory-match-modal';
            modal.innerHTML = MemoryMatch.renderMenu();
            document.body.appendChild(modal);
            
            requestAnimationFrame(() => modal.classList.add('active'));
        } catch (error) {
            console.error('MemoryMatch.open error:', error);
        }
    },

    close: () => {
        try {
            const modal = document.getElementById('memory-match-modal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.remove();
                    }
                }, 300);
            }
            MemoryMatch.stopTimer();
        } catch (error) {
            console.error('MemoryMatch.close error:', error);
        }
    },

    renderMenu: () => {
        const bestScores = MemoryMatch.getBestScores();
        const progressLevel = MemoryMatch.getProgressLevel();
        
        return `
            <div class="game-container memory-container">
                <button class="game-close-btn" onclick="MemoryMatch.close()">✕</button>
                
                <div class="game-header">
                    <div class="game-icon">🃏</div>
                    <h2>Memory Match</h2>
                    <p>Match CS terms with their definitions!</p>
                </div>
                
                <div class="memory-menu">
                    <div class="mm-best-scores">
                        <h4>🏆 Best Scores</h4>
                        <div class="mm-scores-grid">
                            ${Object.entries(MemoryMatch.difficulties).map(([key, d]) => `
                                <div class="mm-score-item">
                                    <span class="mm-si-diff">${d.name}</span>
                                    <span class="mm-si-score">${bestScores[key] ? bestScores[key].moves + ' moves' : 'Not played'}</span>
                                    <span class="mm-si-time">${bestScores[key] ? MemoryMatch.formatTime(bestScores[key].time) : '-'}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mm-mode-toggle">
                        <button class="mm-mode-btn selected" onclick="MemoryMatch.setMode('classic', event)">
                            🎮 Classic Mode
                        </button>
                        <button class="mm-mode-btn" onclick="MemoryMatch.setMode('progression', event)">
                            📈 Progression (Level ${progressLevel})
                        </button>
                    </div>
                    
                    <div id="mm-classic-options">
                        <div class="mm-difficulty-select">
                            <label>Select Difficulty:</label>
                            <div class="mm-diff-buttons">
                                ${Object.entries(MemoryMatch.difficulties).map(([key, d]) => `
                                    <button class="mm-diff-btn ${MemoryMatch.difficulty === key ? 'selected' : ''}"
                                            onclick="MemoryMatch.selectDifficulty('${key}', event)">
                                        ${d.name}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="mm-theme-selector">
                        <label style="width: 100%; text-align: center; margin-bottom: 8px;">Card Theme:</label>
                        ${Object.entries(MemoryMatch.themes).map(([key, theme]) => `
                            <button class="mm-theme-btn ${MemoryMatch.currentTheme === key ? 'selected' : ''}"
                                    onclick="MemoryMatch.selectTheme('${key}', event)">
                                ${theme.name}
                            </button>
                        `).join('')}
                    </div>
                    
                    <button class="btn btn-primary btn-large mm-start-btn" onclick="MemoryMatch.startGame()">
                        <span class="btn-icon">🎴</span>
                        Start Game
                    </button>
                </div>
            </div>
        `;
    },

    gameMode: 'classic',

    setMode: (mode, evt) => {
        MemoryMatch.gameMode = mode;
        document.querySelectorAll('.mm-mode-btn').forEach(btn => btn.classList.remove('selected'));
        if (evt?.target) evt.target.classList.add('selected');
        
        const classicOptions = document.getElementById('mm-classic-options');
        if (classicOptions) {
            classicOptions.style.display = mode === 'classic' ? 'block' : 'none';
        }
    },

    selectTheme: (theme, evt) => {
        MemoryMatch.currentTheme = theme;
        document.querySelectorAll('.mm-theme-btn').forEach(btn => btn.classList.remove('selected'));
        if (evt?.target) evt.target.classList.add('selected');
    },

    selectDifficulty: (diff, evt) => {
        if (!MemoryMatch.difficulties[diff]) return;
        
        MemoryMatch.difficulty = diff;
        document.querySelectorAll('.mm-diff-btn').forEach(btn => btn.classList.remove('selected'));
        
        const targetBtn = evt?.target || document.querySelector(`.mm-diff-btn[onclick*="'${diff}'"]`);
        if (targetBtn) {
            targetBtn.classList.add('selected');
        }
    },

    getProgressLevel: () => {
        try {
            const stored = localStorage.getItem('csmaster_memory_level');
            return stored ? parseInt(stored, 10) : 1;
        } catch {
            return 1;
        }
    },

    saveProgressLevel: (level) => {
        try {
            localStorage.setItem('csmaster_memory_level', level.toString());
        } catch (error) {
            console.error('Failed to save progress level:', error);
        }
    },

    startGame: () => {
        try {
            let settings;
            
            if (MemoryMatch.gameMode === 'progression') {
                MemoryMatch.currentLevel = MemoryMatch.getProgressLevel();
                const levelSettings = MemoryMatch.levelProgression[MemoryMatch.currentLevel] || 
                                     MemoryMatch.levelProgression[6];
                settings = {
                    pairs: levelSettings.pairs,
                    gridCols: levelSettings.pairs <= 6 ? 4 : 6,
                    timeLimit: levelSettings.timeLimit
                };
            } else {
                settings = MemoryMatch.difficulties[MemoryMatch.difficulty];
                if (!settings) {
                    Toast?.show?.('Invalid difficulty selected', 'error');
                    return;
                }
            }
            
            if (!MemoryMatch.termPairs || MemoryMatch.termPairs.length < settings.pairs) {
                Toast?.show?.('Not enough term pairs for this difficulty', 'error');
                return;
            }
            
            MemoryMatch.totalPairs = settings.pairs;
            MemoryMatch.matchedPairs = 0;
            MemoryMatch.moves = 0;
            MemoryMatch.elapsedTime = 0;
            MemoryMatch.flippedCards = [];
            MemoryMatch.isLocked = false;
            MemoryMatch.combo = 0;
            MemoryMatch.maxCombo = 0;
            MemoryMatch.score = 0;
            MemoryMatch.timeLimit = settings.timeLimit || 0;
            MemoryMatch.lastFlippedPairId = null;
            
            MemoryMatch.cards = MemoryMatch.createCards(settings.pairs);
            
            const container = document.querySelector('.memory-container');
            if (!container) {
                console.error('MemoryMatch container not found');
                return;
            }
            container.innerHTML = MemoryMatch.renderGame(settings.gridCols);
            
            MemoryMatch.startTimer();
        } catch (error) {
            console.error('MemoryMatch.startGame error:', error);
            Toast?.show?.('Failed to start game', 'error');
        }
    },

    createCards: (pairCount) => {
        const selectedPairs = shuffleArray([...MemoryMatch.termPairs]).slice(0, pairCount);
        const theme = MemoryMatch.themes[MemoryMatch.currentTheme];
        
        const cards = [];
        selectedPairs.forEach((pair, index) => {
            cards.push({
                id: index * 2,
                pairId: index,
                type: 'term',
                content: pair.term,
                icon: theme.termIcon,
                isFlipped: false,
                isMatched: false
            });
            cards.push({
                id: index * 2 + 1,
                pairId: index,
                type: 'definition',
                content: pair.definition,
                icon: theme.defIcon,
                isFlipped: false,
                isMatched: false
            });
        });
        
        return shuffleArray(cards);
    },

    renderGame: (gridCols) => {
        const theme = MemoryMatch.themes[MemoryMatch.currentTheme];
        const showTimer = MemoryMatch.gameMode === 'progression';
        
        return `
            <div class="mm-game-view">
                <div class="mm-game-header">
                    ${MemoryMatch.gameMode === 'progression' ? `
                        <div class="mm-stat">
                            <span class="mm-level-display">Level ${MemoryMatch.currentLevel}</span>
                        </div>
                    ` : ''}
                    <div class="mm-stat">
                        <span class="mm-stat-icon">⏱️</span>
                        <span class="mm-stat-value ${showTimer ? '' : ''}" id="mm-timer">
                            ${showTimer ? MemoryMatch.formatTime(MemoryMatch.timeLimit) : '0:00'}
                        </span>
                    </div>
                    <div class="mm-stat">
                        <span class="mm-stat-icon">👆</span>
                        <span class="mm-stat-value" id="mm-moves">0</span>
                        <span class="mm-stat-label">moves</span>
                    </div>
                    <div class="mm-stat">
                        <span class="mm-stat-icon">✓</span>
                        <span class="mm-stat-value" id="mm-pairs">0/${MemoryMatch.totalPairs}</span>
                    </div>
                    <div class="mm-stat">
                        <span class="mm-combo-display inactive" id="mm-combo">🔥 0x</span>
                    </div>
                    <div class="mm-stat">
                        <span class="mm-stat-icon">⭐</span>
                        <span class="mm-stat-value" id="mm-score">0</span>
                    </div>
                </div>
                
                <div class="mm-grid" style="--grid-cols: ${gridCols}">
                    ${MemoryMatch.cards.map(card => `
                        <div class="mm-card ${card.type} theme-${MemoryMatch.currentTheme}" 
                             data-id="${card.id}" 
                             data-pair-id="${card.pairId}"
                             onclick="MemoryMatch.flipCard(${card.id})">
                            <div class="mm-card-inner">
                                <div class="mm-card-front">
                                    <span class="mm-card-icon">${theme.cardBack}</span>
                                </div>
                                <div class="mm-card-back">
                                    <span class="mm-card-content">${card.content}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mm-hint">
                    <span class="hint-term">${theme.termIcon} = Term</span>
                    <span class="hint-def">${theme.defIcon} = Definition</span>
                    <span>Match each term with its definition!</span>
                </div>
            </div>
        `;
    },

    flipCard: (cardId) => {
        try {
            if (MemoryMatch.isLocked || MemoryMatch.flippedCards.length >= 2) return;
            
            const card = MemoryMatch.cards.find(c => c.id === cardId);
            if (!card || card.isFlipped || card.isMatched) return;
            
            // Flip the card with satisfying animation
            card.isFlipped = true;
            const cardEl = document.querySelector(`.mm-card[data-id="${cardId}"]`);
            if (!cardEl) {
                console.error('Card element not found:', cardId);
                card.isFlipped = false;
                return;
            }
            
            cardEl.classList.add('flipped');
            
            // Play flip sound effect (visual feedback)
            MemoryMatch.playFlipEffect(cardEl);
            
            MemoryMatch.flippedCards.push(card);
            
            if (MemoryMatch.flippedCards.length === 2) {
                MemoryMatch.moves++;
                const movesEl = document.getElementById('mm-moves');
                if (movesEl) {
                    movesEl.textContent = MemoryMatch.moves;
                }
                
                MemoryMatch.checkMatch();
            }
        } catch (error) {
            console.error('MemoryMatch.flipCard error:', error);
            MemoryMatch.isLocked = false;
        }
    },

    playFlipEffect: (cardEl) => {
        // Create a subtle pulse effect
        const rect = cardEl.getBoundingClientRect();
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 10px;
            height: 10px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: flipPulse 0.3s ease-out forwards;
            z-index: 1000;
        `;
        
        if (!document.getElementById('flip-pulse-style')) {
            const style = document.createElement('style');
            style.id = 'flip-pulse-style';
            style.textContent = `
                @keyframes flipPulse {
                    from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    to { transform: translate(-50%, -50%) scale(4); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(pulse);
        setTimeout(() => pulse.remove(), 300);
    },

    checkMatch: () => {
        try {
            MemoryMatch.isLocked = true;
            
            if (MemoryMatch.flippedCards.length !== 2) {
                MemoryMatch.isLocked = false;
                return;
            }
            
            const [card1, card2] = MemoryMatch.flippedCards;
            if (!card1 || !card2) {
                MemoryMatch.flippedCards = [];
                MemoryMatch.isLocked = false;
                return;
            }
            
            const isMatch = card1.pairId === card2.pairId && card1.type !== card2.type;
            
            const card1El = document.querySelector(`.mm-card[data-id="${card1.id}"]`);
            const card2El = document.querySelector(`.mm-card[data-id="${card2.id}"]`);
            
            if (!card1El || !card2El) {
                console.error('Card elements not found during match check');
                MemoryMatch.flippedCards = [];
                MemoryMatch.isLocked = false;
                return;
            }
            
            if (isMatch) {
                // Match found!
                card1.isMatched = true;
                card2.isMatched = true;
                
                card1El.classList.add('matched');
                card2El.classList.add('matched');
                
                // Increment combo
                MemoryMatch.combo++;
                if (MemoryMatch.combo > MemoryMatch.maxCombo) {
                    MemoryMatch.maxCombo = MemoryMatch.combo;
                }
                
                // Calculate points with combo bonus
                const basePoints = 100;
                const comboBonus = MemoryMatch.combo > 1 ? (MemoryMatch.combo - 1) * 50 : 0;
                const points = basePoints + comboBonus;
                MemoryMatch.score += points;
                
                // Update UI
                MemoryMatch.matchedPairs++;
                MemoryMatch.updateScoreDisplay();
                
                // Celebration effects!
                MemoryMatch.showMatchCelebration(card1El, card2El, points);
                
                if (MemoryMatch.combo >= 2) {
                    MemoryMatch.showComboIndicator();
                }
                
                MemoryMatch.flippedCards = [];
                MemoryMatch.isLocked = false;
                
                // Check win
                if (MemoryMatch.matchedPairs === MemoryMatch.totalPairs) {
                    setTimeout(() => MemoryMatch.endGame(), 800);
                }
            } else {
                // No match - check for near-miss
                MemoryMatch.checkNearMiss(card1, card2);
                
                // Reset combo
                MemoryMatch.combo = 0;
                MemoryMatch.updateComboDisplay();
                
                // Add shake animation
                card1El.classList.add('no-match');
                card2El.classList.add('no-match');
                
                // Store the pair IDs for near-miss detection
                MemoryMatch.lastFlippedPairId = card1.pairId;
                
                setTimeout(() => {
                    card1.isFlipped = false;
                    card2.isFlipped = false;
                    
                    const el1 = document.querySelector(`.mm-card[data-id="${card1.id}"]`);
                    const el2 = document.querySelector(`.mm-card[data-id="${card2.id}"]`);
                    if (el1) {
                        el1.classList.remove('flipped', 'no-match');
                    }
                    if (el2) {
                        el2.classList.remove('flipped', 'no-match');
                    }
                    
                    MemoryMatch.flippedCards = [];
                    MemoryMatch.isLocked = false;
                }, 1000);
            }
        } catch (error) {
            console.error('MemoryMatch.checkMatch error:', error);
            MemoryMatch.flippedCards = [];
            MemoryMatch.isLocked = false;
        }
    },

    checkNearMiss: (card1, card2) => {
        // Near-miss: same type cards (both terms or both definitions)
        // or if one of the cards shares a pairId with a recently flipped card
        if (card1.type === card2.type) {
            // Both are terms or both are definitions - that's a near miss!
            MemoryMatch.showAlmostFeedback("Almost! Match term ↔ definition");
        }
    },

    showAlmostFeedback: (message) => {
        const feedback = document.createElement('div');
        feedback.className = 'mm-almost-feedback';
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => feedback.remove(), 1000);
    },

    showMatchCelebration: (card1El, card2El, points) => {
        // Sparkles on both cards
        [card1El, card2El].forEach(cardEl => {
            MemoryMatch.createSparkles(cardEl);
        });
        
        // Floating points
        const rect = card1El.getBoundingClientRect();
        const pointsEl = document.createElement('div');
        pointsEl.className = 'mm-points-float' + (MemoryMatch.combo > 1 ? ' combo' : '');
        pointsEl.textContent = `+${points}`;
        pointsEl.style.left = `${rect.left + rect.width / 2}px`;
        pointsEl.style.top = `${rect.top}px`;
        document.body.appendChild(pointsEl);
        
        setTimeout(() => pointsEl.remove(), 1200);
    },

    createSparkles: (cardEl) => {
        const rect = cardEl.getBoundingClientRect();
        const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '✦'];
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'mm-sparkle';
            sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
            
            const tx = (Math.random() - 0.5) * 100;
            const ty = -30 - Math.random() * 50;
            sparkle.style.cssText = `
                left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width}px;
                top: ${rect.top + rect.height / 2 + (Math.random() - 0.5) * rect.height}px;
                --tx: ${tx}px;
                --ty: ${ty}px;
            `;
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    },

    showComboIndicator: () => {
        const indicator = document.createElement('div');
        indicator.className = 'mm-combo-indicator';
        indicator.textContent = `🔥 ${MemoryMatch.combo}x COMBO!`;
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.remove(), 800);
    },

    updateScoreDisplay: () => {
        const pairsEl = document.getElementById('mm-pairs');
        if (pairsEl) {
            pairsEl.textContent = `${MemoryMatch.matchedPairs}/${MemoryMatch.totalPairs}`;
        }
        
        const scoreEl = document.getElementById('mm-score');
        if (scoreEl) {
            scoreEl.textContent = MemoryMatch.score;
        }
        
        MemoryMatch.updateComboDisplay();
    },

    updateComboDisplay: () => {
        const comboEl = document.getElementById('mm-combo');
        if (comboEl) {
            comboEl.textContent = `🔥 ${MemoryMatch.combo}x`;
            if (MemoryMatch.combo > 0) {
                comboEl.classList.remove('inactive');
            } else {
                comboEl.classList.add('inactive');
            }
        }
    },

    startTimer: () => {
        MemoryMatch.stopTimer();
        MemoryMatch.startTime = Date.now();
        
        if (MemoryMatch.gameMode === 'progression' && MemoryMatch.timeLimit > 0) {
            // Countdown timer for progression mode
            MemoryMatch.timer = setInterval(() => {
                MemoryMatch.elapsedTime = Math.floor((Date.now() - MemoryMatch.startTime) / 1000);
                const remaining = Math.max(0, MemoryMatch.timeLimit - MemoryMatch.elapsedTime);
                
                const timerEl = document.getElementById('mm-timer');
                if (timerEl) {
                    timerEl.textContent = MemoryMatch.formatTime(remaining);
                    
                    // Warning when time is low
                    if (remaining <= 30) {
                        timerEl.classList.add('mm-timer-warning');
                    } else {
                        timerEl.classList.remove('mm-timer-warning');
                    }
                }
                
                // Time's up!
                if (remaining <= 0) {
                    MemoryMatch.timeUp();
                }
            }, 1000);
        } else {
            // Count up timer for classic mode
            MemoryMatch.timer = setInterval(() => {
                MemoryMatch.elapsedTime = Math.floor((Date.now() - MemoryMatch.startTime) / 1000);
                const timerEl = document.getElementById('mm-timer');
                if (timerEl) {
                    timerEl.textContent = MemoryMatch.formatTime(MemoryMatch.elapsedTime);
                }
            }, 1000);
        }
    },

    stopTimer: () => {
        if (MemoryMatch.timer) {
            clearInterval(MemoryMatch.timer);
            MemoryMatch.timer = null;
        }
    },

    timeUp: () => {
        MemoryMatch.stopTimer();
        
        const container = document.querySelector('.memory-container');
        if (!container) return;
        
        container.innerHTML = `
            <button class="game-close-btn" onclick="MemoryMatch.close()">✕</button>
            
            <div class="mm-results">
                <div class="mm-result-banner" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                    ⏰ Time's Up! ⏰
                </div>
                
                <div class="mm-final-score">
                    <span class="mm-fs-value">${MemoryMatch.score}</span>
                    <span class="mm-fs-label">Score</span>
                </div>
                
                <p style="text-align: center; margin: 20px 0;">
                    You matched ${MemoryMatch.matchedPairs}/${MemoryMatch.totalPairs} pairs
                </p>
                
                <div class="mm-results-actions">
                    <button class="btn btn-primary" onclick="MemoryMatch.startGame()">
                        🔄 Try Again
                    </button>
                    <button class="btn btn-secondary" onclick="MemoryMatch.close()">
                        Done
                    </button>
                </div>
            </div>
        `;
    },

    formatTime: (seconds) => {
        if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
            return '0:00';
        }
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    endGame: () => {
        try {
            MemoryMatch.stopTimer();
            
            // Calculate final score
            const baseScore = MemoryMatch.score;
            const timeBonus = Math.max(0, 300 - MemoryMatch.elapsedTime) * 2;
            const comboBonusPoints = MemoryMatch.maxCombo * 100;
            const difficultyBonuses = { easy: 0, medium: 200, hard: 500, expert: 1000 };
            const difficultyBonus = MemoryMatch.gameMode === 'classic' 
                ? (difficultyBonuses[MemoryMatch.difficulty] || 0)
                : MemoryMatch.currentLevel * 150;
            
            const finalScore = baseScore + timeBonus + comboBonusPoints + difficultyBonus;
            
            // Save score (classic mode)
            if (MemoryMatch.gameMode === 'classic') {
                MemoryMatch.saveScore(MemoryMatch.moves, MemoryMatch.elapsedTime, finalScore);
            }
            
            // Award XP
            const xpEarned = Math.floor(finalScore / 20);
            if (typeof AppState !== 'undefined' && AppState?.addXP) {
                AppState.addXP(xpEarned);
            }
            
            const efficiency = MemoryMatch.moves > 0 
                ? Math.round(MemoryMatch.totalPairs / MemoryMatch.moves * 100) 
                : 100;
            
            const container = document.querySelector('.memory-container');
            if (!container) {
                console.error('Container not found for end game display');
                return;
            }
            
            if (MemoryMatch.gameMode === 'progression') {
                MemoryMatch.showLevelComplete(container, finalScore, efficiency, xpEarned);
            } else {
                MemoryMatch.showClassicResults(container, finalScore, efficiency, xpEarned);
            }
        } catch (error) {
            console.error('MemoryMatch.endGame error:', error);
        }
    },

    showLevelComplete: (container, finalScore, efficiency, xpEarned) => {
        const nextLevel = Math.min(MemoryMatch.currentLevel + 1, 6);
        const canProgress = nextLevel <= 6;
        
        // Save progress
        if (canProgress && nextLevel > MemoryMatch.getProgressLevel()) {
            MemoryMatch.saveProgressLevel(nextLevel);
        }
        
        container.innerHTML = `
            <button class="game-close-btn" onclick="MemoryMatch.close()">✕</button>
            
            <div class="mm-results">
                <div class="mm-result-banner">
                    🎉 Level ${MemoryMatch.currentLevel} Complete! 🎉
                </div>
                
                <div class="mm-final-score">
                    <span class="mm-fs-value">${finalScore}</span>
                    <span class="mm-fs-label">Final Score</span>
                </div>
                
                <div class="mm-results-grid">
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">⏱️</span>
                        <span class="mm-ri-value">${MemoryMatch.formatTime(MemoryMatch.elapsedTime)}</span>
                        <span class="mm-ri-label">Time</span>
                    </div>
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">👆</span>
                        <span class="mm-ri-value">${MemoryMatch.moves}</span>
                        <span class="mm-ri-label">Moves</span>
                    </div>
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">🔥</span>
                        <span class="mm-ri-value">${MemoryMatch.maxCombo}x</span>
                        <span class="mm-ri-label">Max Combo</span>
                    </div>
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">⭐</span>
                        <span class="mm-ri-value">+${xpEarned}</span>
                        <span class="mm-ri-label">XP</span>
                    </div>
                </div>
                
                <div class="mm-results-actions">
                    ${canProgress && MemoryMatch.currentLevel < 6 ? `
                        <button class="btn btn-primary" onclick="MemoryMatch.nextLevel()">
                            ➡️ Level ${nextLevel}
                        </button>
                    ` : `
                        <button class="btn btn-primary" onclick="MemoryMatch.startGame()">
                            🔄 Play Again
                        </button>
                    `}
                    <button class="btn btn-secondary" onclick="MemoryMatch.close()">
                        Done
                    </button>
                </div>
            </div>
        `;
    },

    showClassicResults: (container, finalScore, efficiency, xpEarned) => {
        container.innerHTML = `
            <button class="game-close-btn" onclick="MemoryMatch.close()">✕</button>
            
            <div class="mm-results">
                <div class="mm-result-banner">🎉 Congratulations! 🎉</div>
                
                <div class="mm-final-score">
                    <span class="mm-fs-value">${finalScore}</span>
                    <span class="mm-fs-label">Final Score</span>
                </div>
                
                <div class="mm-results-grid">
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">⏱️</span>
                        <span class="mm-ri-value">${MemoryMatch.formatTime(MemoryMatch.elapsedTime)}</span>
                        <span class="mm-ri-label">Time</span>
                    </div>
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">👆</span>
                        <span class="mm-ri-value">${MemoryMatch.moves}</span>
                        <span class="mm-ri-label">Moves</span>
                    </div>
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">🎯</span>
                        <span class="mm-ri-value">${efficiency}%</span>
                        <span class="mm-ri-label">Efficiency</span>
                    </div>
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">🔥</span>
                        <span class="mm-ri-value">${MemoryMatch.maxCombo}x</span>
                        <span class="mm-ri-label">Max Combo</span>
                    </div>
                    <div class="mm-result-item">
                        <span class="mm-ri-icon">⭐</span>
                        <span class="mm-ri-value">+${xpEarned}</span>
                        <span class="mm-ri-label">XP</span>
                    </div>
                </div>
                
                <div class="mm-results-actions">
                    <button class="btn btn-primary" onclick="MemoryMatch.startGame()">
                        🔄 Play Again
                    </button>
                    <button class="btn btn-secondary" onclick="MemoryMatch.close()">
                        Done
                    </button>
                </div>
            </div>
        `;
    },

    nextLevel: () => {
        MemoryMatch.currentLevel = Math.min(MemoryMatch.currentLevel + 1, 6);
        MemoryMatch.startGame();
    },

    saveScore: (moves, time, score) => {
        try {
            const bestScores = MemoryMatch.getBestScores();
            const current = bestScores[MemoryMatch.difficulty];
            
            if (!current || moves < current.moves || (moves === current.moves && time < current.time)) {
                bestScores[MemoryMatch.difficulty] = { moves, time, score, date: new Date().toISOString() };
                localStorage.setItem('csmaster_memory_best', JSON.stringify(bestScores));
            }
        } catch (error) {
            console.error('MemoryMatch.saveScore error:', error);
        }
    },

    getBestScores: () => {
        try {
            const stored = localStorage.getItem('csmaster_memory_best');
            if (!stored) return {};
            const parsed = JSON.parse(stored);
            return typeof parsed === 'object' && parsed !== null ? parsed : {};
        } catch (error) {
            console.error('MemoryMatch.getBestScores error:', error);
            return {};
        }
    },

    cleanup: () => {
        MemoryMatch.stopTimer();
        MemoryMatch.isLocked = false;
        MemoryMatch.flippedCards = [];
        MemoryMatch.cards = [];
        MemoryMatch.matchedPairs = 0;
        MemoryMatch.combo = 0;
        MemoryMatch.maxCombo = 0;
        MemoryMatch.score = 0;
        console.log('🃏 MemoryMatch cleanup');
    }
};
