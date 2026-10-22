/**
 * MemoryMatch.js - Card Matching Game
 * Match terms with their definitions
 * Features: Timer, moves counter, difficulty levels, leaderboard
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

    difficulties: {
        easy: { pairs: 6, name: 'Easy (6 pairs)', gridCols: 4 },
        medium: { pairs: 8, name: 'Medium (8 pairs)', gridCols: 4 },
        hard: { pairs: 12, name: 'Hard (12 pairs)', gridCols: 6 },
        expert: { pairs: 15, name: 'Expert (15 pairs)', gridCols: 6 }
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

    open: () => {
        const modal = document.createElement('div');
        modal.className = 'game-modal memory-match-modal';
        modal.id = 'memory-match-modal';
        modal.innerHTML = MemoryMatch.renderMenu();
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    close: () => {
        const modal = document.getElementById('memory-match-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        MemoryMatch.stopTimer();
    },

    renderMenu: () => {
        const bestScores = MemoryMatch.getBestScores();
        
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
                    
                    <button class="btn btn-primary btn-large mm-start-btn" onclick="MemoryMatch.startGame()">
                        <span class="btn-icon">🎴</span>
                        Start Game
                    </button>
                </div>
            </div>
        `;
    },

    selectDifficulty: (diff, evt) => {
        MemoryMatch.difficulty = diff;
        document.querySelectorAll('.mm-diff-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Use evt parameter or find by diff
        const targetBtn = evt?.target || document.querySelector(`.mm-diff-btn[onclick*="'${diff}'"]`);
        if (targetBtn) {
            targetBtn.classList.add('selected');
        }
    },

    startGame: () => {
        try {
            const settings = MemoryMatch.difficulties[MemoryMatch.difficulty];
            if (!settings) {
                Toast?.show?.('Invalid difficulty selected', 'error');
                return;
            }
            
            // Validate we have enough term pairs
            if (MemoryMatch.termPairs.length < settings.pairs) {
                Toast?.show?.('Not enough term pairs for this difficulty', 'error');
                return;
            }
            
            MemoryMatch.totalPairs = settings.pairs;
            MemoryMatch.matchedPairs = 0;
            MemoryMatch.moves = 0;
            MemoryMatch.elapsedTime = 0;
            MemoryMatch.flippedCards = [];
            MemoryMatch.isLocked = false;
            
            // Create cards
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
        // Select random pairs
        const selectedPairs = shuffleArray([...MemoryMatch.termPairs]).slice(0, pairCount);
        
        // Create card objects (term and definition for each pair)
        const cards = [];
        selectedPairs.forEach((pair, index) => {
            cards.push({
                id: index * 2,
                pairId: index,
                type: 'term',
                content: pair.term,
                isFlipped: false,
                isMatched: false
            });
            cards.push({
                id: index * 2 + 1,
                pairId: index,
                type: 'definition',
                content: pair.definition,
                isFlipped: false,
                isMatched: false
            });
        });
        
        return shuffleArray(cards);
    },

    renderGame: (gridCols) => {
        return `
            <div class="mm-game-view">
                <div class="mm-game-header">
                    <div class="mm-stat">
                        <span class="mm-stat-icon">⏱️</span>
                        <span class="mm-stat-value" id="mm-timer">0:00</span>
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
                </div>
                
                <div class="mm-grid" style="--grid-cols: ${gridCols}">
                    ${MemoryMatch.cards.map(card => `
                        <div class="mm-card ${card.type}" data-id="${card.id}" onclick="MemoryMatch.flipCard(${card.id})">
                            <div class="mm-card-inner">
                                <div class="mm-card-front">
                                    <span class="mm-card-icon">${card.type === 'term' ? '📝' : '💡'}</span>
                                </div>
                                <div class="mm-card-back">
                                    <span class="mm-card-content">${card.content}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mm-hint">
                    <span class="hint-term">📝 = Term</span>
                    <span class="hint-def">💡 = Definition</span>
                    <span>Match each term with its definition!</span>
                </div>
            </div>
        `;
    },

    flipCard: (cardId) => {
        if (MemoryMatch.isLocked) return;
        
        const card = MemoryMatch.cards.find(c => c.id === cardId);
        if (!card || card.isFlipped || card.isMatched) return;
        
        // Flip the card
        card.isFlipped = true;
        const cardEl = document.querySelector(`.mm-card[data-id="${cardId}"]`);
        cardEl.classList.add('flipped');
        
        MemoryMatch.flippedCards.push(card);
        
        // Check for match when 2 cards are flipped
        if (MemoryMatch.flippedCards.length === 2) {
            MemoryMatch.moves++;
            document.getElementById('mm-moves').textContent = MemoryMatch.moves;
            
            MemoryMatch.checkMatch();
        }
    },

    checkMatch: () => {
        MemoryMatch.isLocked = true;
        
        const [card1, card2] = MemoryMatch.flippedCards;
        const isMatch = card1.pairId === card2.pairId && card1.type !== card2.type;
        
        if (isMatch) {
            // Match found!
            card1.isMatched = true;
            card2.isMatched = true;
            
            const card1El = document.querySelector(`.mm-card[data-id="${card1.id}"]`);
            const card2El = document.querySelector(`.mm-card[data-id="${card2.id}"]`);
            card1El.classList.add('matched');
            card2El.classList.add('matched');
            
            MemoryMatch.matchedPairs++;
            document.getElementById('mm-pairs').textContent = `${MemoryMatch.matchedPairs}/${MemoryMatch.totalPairs}`;
            
            MemoryMatch.flippedCards = [];
            MemoryMatch.isLocked = false;
            
            // Check win
            if (MemoryMatch.matchedPairs === MemoryMatch.totalPairs) {
                setTimeout(() => MemoryMatch.endGame(), 500);
            }
        } else {
            // No match - flip back
            setTimeout(() => {
                card1.isFlipped = false;
                card2.isFlipped = false;
                
                const card1El = document.querySelector(`.mm-card[data-id="${card1.id}"]`);
                const card2El = document.querySelector(`.mm-card[data-id="${card2.id}"]`);
                card1El.classList.remove('flipped');
                card2El.classList.remove('flipped');
                
                MemoryMatch.flippedCards = [];
                MemoryMatch.isLocked = false;
            }, 1000);
        }
    },

    startTimer: () => {
        MemoryMatch.startTime = Date.now();
        MemoryMatch.timer = setInterval(() => {
            MemoryMatch.elapsedTime = Math.floor((Date.now() - MemoryMatch.startTime) / 1000);
            document.getElementById('mm-timer').textContent = MemoryMatch.formatTime(MemoryMatch.elapsedTime);
        }, 1000);
    },

    stopTimer: () => {
        if (MemoryMatch.timer) {
            clearInterval(MemoryMatch.timer);
            MemoryMatch.timer = null;
        }
    },

    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    endGame: () => {
        MemoryMatch.stopTimer();
        
        // Calculate score
        const baseScore = 1000;
        const timeBonus = Math.max(0, 300 - MemoryMatch.elapsedTime) * 2;
        const movesPenalty = MemoryMatch.moves * 5;
        const difficultyBonus = { easy: 0, medium: 200, hard: 500, expert: 1000 }[MemoryMatch.difficulty];
        const finalScore = baseScore + timeBonus - movesPenalty + difficultyBonus;
        
        // Save score
        MemoryMatch.saveScore(MemoryMatch.moves, MemoryMatch.elapsedTime, finalScore);
        
        // Award XP
        const xpEarned = Math.floor(finalScore / 20);
        AppState.addXP(xpEarned);
        
        const container = document.querySelector('.memory-container');
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
                        <span class="mm-ri-value">${Math.round(MemoryMatch.totalPairs / MemoryMatch.moves * 100)}%</span>
                        <span class="mm-ri-label">Efficiency</span>
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

    saveScore: (moves, time, score) => {
        const bestScores = MemoryMatch.getBestScores();
        const current = bestScores[MemoryMatch.difficulty];
        
        if (!current || moves < current.moves || (moves === current.moves && time < current.time)) {
            bestScores[MemoryMatch.difficulty] = { moves, time, score, date: new Date().toISOString() };
            localStorage.setItem('csmaster_memory_best', JSON.stringify(bestScores));
        }
    },

    getBestScores: () => {
        return JSON.parse(localStorage.getItem('csmaster_memory_best') || '{}');
    },

    cleanup: () => {
        // Stop timer
        MemoryMatch.stopTimer();
        // Reset state
        MemoryMatch.isLocked = false;
        MemoryMatch.flippedCards = [];
        MemoryMatch.cards = [];
        MemoryMatch.matchedPairs = 0;
        console.log('🃏 MemoryMatch cleanup');
    }
};
