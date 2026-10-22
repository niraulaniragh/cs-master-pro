/**
 * BattleMode.js - 1v1 Head to Head
 * Compete against AI opponents or challenge friends
 * Features: Power-ups, sudden death, difficulty levels
 */

const BattleMode = {
    isPlaying: false,
    questions: [],
    currentIndex: 0,
    playerScore: 0,
    opponentScore: 0,
    playerHP: 100,
    opponentHP: 100,
    difficulty: 'normal',
    opponentName: 'CPU Bot',
    round: 0,
    maxRounds: 10,
    powerUps: { doublePoints: 1, skipQuestion: 1, timeFreezes: 1 },
    questionTimer: null,
    timeLeft: 15,

    difficulties: {
        easy: { name: 'Rookie Bot 🤖', speed: [3, 6], accuracy: 0.5, color: '#10b981' },
        normal: { name: 'Smart Bot 🧠', speed: [2, 4], accuracy: 0.7, color: '#3b82f6' },
        hard: { name: 'Pro Bot 💪', speed: [1, 3], accuracy: 0.85, color: '#f59e0b' },
        expert: { name: 'Master Bot 👑', speed: [0.8, 2], accuracy: 0.95, color: '#ef4444' }
    },

    open: () => {
        const modal = document.createElement('div');
        modal.className = 'game-modal battle-mode-modal';
        modal.id = 'battle-mode-modal';
        modal.innerHTML = BattleMode.renderMenu();
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    close: () => {
        BattleMode.cleanup();
        const modal = document.getElementById('battle-mode-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    renderMenu: () => {
        const stats = BattleMode.getStats();
        
        return `
            <div class="game-container battle-container">
                <button class="game-close-btn" onclick="BattleMode.close()">✕</button>
                
                <div class="game-header">
                    <div class="game-icon">⚔️</div>
                    <h2>Battle Mode</h2>
                    <p>Challenge AI opponents in head-to-head combat!</p>
                </div>
                
                <div class="battle-menu">
                    <div class="battle-stats-row">
                        <div class="battle-stat">
                            <span class="battle-stat-value">${stats.wins || 0}</span>
                            <span class="battle-stat-label">Wins</span>
                        </div>
                        <div class="battle-stat">
                            <span class="battle-stat-value">${stats.losses || 0}</span>
                            <span class="battle-stat-label">Losses</span>
                        </div>
                        <div class="battle-stat">
                            <span class="battle-stat-value">${stats.winStreak || 0}</span>
                            <span class="battle-stat-label">Win Streak</span>
                        </div>
                    </div>
                    
                    <div class="battle-difficulty-select">
                        <label>Choose Your Opponent:</label>
                        <div class="difficulty-options">
                            ${Object.entries(BattleMode.difficulties).map(([key, d]) => `
                                <button class="difficulty-btn ${BattleMode.difficulty === key ? 'selected' : ''}" 
                                        style="--diff-color: ${d.color}"
                                        onclick="BattleMode.selectDifficulty('${key}')">
                                    <span class="diff-name">${d.name}</span>
                                    <span class="diff-desc">${Math.floor(d.accuracy * 100)}% accuracy</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large battle-start-btn" onclick="BattleMode.startGame()">
                        <span class="btn-icon">⚔️</span>
                        Start Battle
                    </button>
                    
                    <div class="battle-powerups-info">
                        <h4>Power-ups Available</h4>
                        <div class="powerup-icons">
                            <div class="powerup-item" title="Double Points - Earn 2x points for the next question">
                                <span class="pu-icon">2️⃣</span>
                                <span class="pu-name">Double</span>
                            </div>
                            <div class="powerup-item" title="Skip - Skip the current question without penalty">
                                <span class="pu-icon">⏭️</span>
                                <span class="pu-name">Skip</span>
                            </div>
                            <div class="powerup-item" title="Time Freeze - Stop the timer for 5 seconds">
                                <span class="pu-icon">❄️</span>
                                <span class="pu-name">Freeze</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    selectDifficulty: (diff, evt) => {
        BattleMode.difficulty = diff;
        BattleMode.opponentName = BattleMode.difficulties[diff].name;
        
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Use evt parameter or fallback to find button by diff
        const targetBtn = evt?.target?.closest('.difficulty-btn') || 
                         document.querySelector(`.difficulty-btn[onclick*="'${diff}'"]`);
        if (targetBtn) {
            targetBtn.classList.add('selected');
        }
    },

    startGame: () => {
        try {
            // Validate QUESTIONS exists
            if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
                Toast?.show?.('No questions available', 'error');
                return;
            }
            
            BattleMode.questions = shuffleArray([...QUESTIONS]).slice(0, BattleMode.maxRounds);
            
            if (BattleMode.questions.length === 0) {
                Toast?.show?.('Not enough questions available', 'error');
                return;
            }
            
            BattleMode.currentIndex = 0;
            BattleMode.playerScore = 0;
            BattleMode.opponentScore = 0;
            BattleMode.playerHP = 100;
            BattleMode.opponentHP = 100;
            BattleMode.round = 0;
            BattleMode.powerUps = { doublePoints: 1, skipQuestion: 1, timeFreeze: 1 };
            BattleMode.isPlaying = true;
            BattleMode.activeDoublePoints = false;
            
            SoundFX?.play?.('start');
            
            const container = document.querySelector('.battle-container');
            if (!container) {
                console.error('Battle container not found');
                return;
            }
            container.innerHTML = BattleMode.renderGame();
            
            // Register keyboard handler
            document.addEventListener('keydown', BattleMode.keyHandler);
            
            BattleMode.showQuestion();
        } catch (error) {
            console.error('BattleMode.startGame error:', error);
            Toast?.show?.('Failed to start game', 'error');
        }
    },

    renderGame: () => {
        const opponent = BattleMode.difficulties[BattleMode.difficulty];
        const username = Auth.getCurrentUser()?.username || 'You';
        
        return `
            <div class="battle-game-view">
                <div class="battle-arena">
                    <div class="battle-player player-left">
                        <div class="bp-avatar">👤</div>
                        <div class="bp-name">${Helpers.escapeHtml(username)}</div>
                        <div class="bp-hp-bar">
                            <div class="bp-hp-fill" id="player-hp" style="width: 100%"></div>
                            <span class="bp-hp-text" id="player-hp-text">100</span>
                        </div>
                        <div class="bp-score" id="player-score">0</div>
                    </div>
                    
                    <div class="battle-vs">
                        <span class="vs-text">VS</span>
                        <div class="round-display">Round <span id="battle-round">1</span>/${BattleMode.maxRounds}</div>
                    </div>
                    
                    <div class="battle-player player-right">
                        <div class="bp-avatar" style="background: ${opponent.color}">🤖</div>
                        <div class="bp-name">${BattleMode.opponentName}</div>
                        <div class="bp-hp-bar">
                            <div class="bp-hp-fill" id="opponent-hp" style="width: 100%"></div>
                            <span class="bp-hp-text" id="opponent-hp-text">100</span>
                        </div>
                        <div class="bp-score" id="opponent-score">0</div>
                    </div>
                </div>
                
                <div class="battle-timer-bar">
                    <div class="battle-timer-fill" id="battle-timer-fill"></div>
                    <span class="battle-timer-text" id="battle-timer-text">15</span>
                </div>
                
                <div class="battle-question-area" id="battle-question-area">
                    <!-- Question loads here -->
                </div>
                
                <div class="battle-powerups" id="battle-powerups">
                    <button class="pu-btn ${BattleMode.powerUps.doublePoints > 0 ? '' : 'used'}" 
                            onclick="BattleMode.usePowerUp('doublePoints')" 
                            title="Double points for next correct answer">
                        2️⃣ <span id="pu-double">${BattleMode.powerUps.doublePoints}</span>
                    </button>
                    <button class="pu-btn ${BattleMode.powerUps.skipQuestion > 0 ? '' : 'used'}" 
                            onclick="BattleMode.usePowerUp('skipQuestion')" 
                            title="Skip this question">
                        ⏭️ <span id="pu-skip">${BattleMode.powerUps.skipQuestion}</span>
                    </button>
                    <button class="pu-btn ${BattleMode.powerUps.timeFreeze > 0 ? '' : 'used'}" 
                            onclick="BattleMode.usePowerUp('timeFreeze')" 
                            title="Freeze timer for 5 seconds">
                        ❄️ <span id="pu-freeze">${BattleMode.powerUps.timeFreeze}</span>
                    </button>
                </div>
            </div>
        `;
    },

    showQuestion: () => {
        if (!BattleMode.isPlaying || BattleMode.currentIndex >= BattleMode.questions.length) {
            BattleMode.endGame();
            return;
        }
        
        BattleMode.round++;
        document.getElementById('battle-round').textContent = BattleMode.round;
        
        const question = BattleMode.questions[BattleMode.currentIndex];
        BattleMode.timeLeft = 15;
        BattleMode.activeDoublePoints = false;
        
        const questionArea = document.getElementById('battle-question-area');
        questionArea.innerHTML = `
            <div class="battle-question animate-in">
                <h3 class="bq-text">${question.question}</h3>
                <div class="bq-options">
                    ${question.options.map((opt, i) => `
                        <button class="bq-option" onclick="BattleMode.answer(${i})" data-index="${i}">
                            <span class="bq-option-key">${String.fromCharCode(65 + i)}</span>
                            <span class="bq-option-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        BattleMode.startQuestionTimer();
        BattleMode.simulateOpponent(question);
    },

    startQuestionTimer: () => {
        const timerFill = document.getElementById('battle-timer-fill');
        const timerText = document.getElementById('battle-timer-text');
        
        timerFill.style.width = '100%';
        timerText.textContent = BattleMode.timeLeft;
        
        BattleMode.questionTimer = setInterval(() => {
            BattleMode.timeLeft -= 0.1;
            
            const percent = (BattleMode.timeLeft / 15) * 100;
            timerFill.style.width = percent + '%';
            timerText.textContent = Math.ceil(BattleMode.timeLeft);
            
            if (BattleMode.timeLeft <= 5) {
                timerFill.classList.add('danger');
            }
            
            if (BattleMode.timeLeft <= 0) {
                BattleMode.timeout();
            }
        }, 100);
    },

    simulateOpponent: (question) => {
        const settings = BattleMode.difficulties[BattleMode.difficulty];
        const willBeCorrect = Math.random() < settings.accuracy;
        const [minTime, maxTime] = settings.speed;
        const answerTime = minTime + Math.random() * (maxTime - minTime);
        
        BattleMode.opponentTimeout = setTimeout(() => {
            if (!BattleMode.isPlaying) return;
            
            if (willBeCorrect) {
                BattleMode.opponentScore += 10;
                BattleMode.playerHP -= 10;
                BattleMode.showOpponentAction('correct');
            } else {
                BattleMode.opponentHP -= 5;
                BattleMode.showOpponentAction('wrong');
            }
            
            BattleMode.updateDisplays();
        }, answerTime * 1000);
    },

    showOpponentAction: (result) => {
        const indicator = document.createElement('div');
        indicator.className = `opponent-indicator ${result}`;
        indicator.textContent = result === 'correct' ? '✓ Bot answered!' : '✗ Bot missed!';
        document.querySelector('.player-right').appendChild(indicator);
        setTimeout(() => indicator.remove(), 1000);
    },

    answer: (index) => {
        if (!BattleMode.isPlaying) return;
        
        clearInterval(BattleMode.questionTimer);
        clearTimeout(BattleMode.opponentTimeout);
        
        const question = BattleMode.questions[BattleMode.currentIndex];
        const isCorrect = index === question.answer;
        
        // Highlight answers
        document.querySelectorAll('.bq-option').forEach((btn, i) => {
            btn.disabled = true;
            if (i === question.answer) {
                btn.classList.add('correct');
            } else if (i === index && !isCorrect) {
                btn.classList.add('wrong');
            }
        });
        
        if (isCorrect) {
            let points = 10;
            if (BattleMode.activeDoublePoints) {
                points = 20;
                BattleMode.activeDoublePoints = false;
            }
            BattleMode.playerScore += points;
            BattleMode.opponentHP -= 15;
            SoundFX.play('correct');
            BattleMode.showFeedback(true, points);
        } else {
            BattleMode.playerHP -= 10;
            SoundFX.play('damage');
            BattleMode.showFeedback(false, 0);
        }
        
        BattleMode.updateDisplays();
        
        // Check for KO
        if (BattleMode.playerHP <= 0 || BattleMode.opponentHP <= 0) {
            setTimeout(() => BattleMode.endGame(), 1000);
            return;
        }
        
        BattleMode.currentIndex++;
        setTimeout(() => BattleMode.showQuestion(), 1500);
    },

    timeout: () => {
        clearInterval(BattleMode.questionTimer);
        BattleMode.playerHP -= 15;
        BattleMode.showFeedback(false, 0, 'Time up!');
        BattleMode.updateDisplays();
        
        // Highlight correct answer
        const question = BattleMode.questions[BattleMode.currentIndex];
        document.querySelectorAll('.bq-option').forEach((btn, i) => {
            btn.disabled = true;
            if (i === question.answer) {
                btn.classList.add('correct');
            }
        });
        
        if (BattleMode.playerHP <= 0) {
            setTimeout(() => BattleMode.endGame(), 1000);
            return;
        }
        
        BattleMode.currentIndex++;
        setTimeout(() => BattleMode.showQuestion(), 1500);
    },

    usePowerUp: (type) => {
        if (BattleMode.powerUps[type] <= 0) return;
        
        BattleMode.powerUps[type]--;
        
        switch (type) {
            case 'doublePoints':
                BattleMode.activeDoublePoints = true;
                Toast.show('2️⃣ Double Points activated!', 'info');
                break;
            case 'skipQuestion':
                clearInterval(BattleMode.questionTimer);
                clearTimeout(BattleMode.opponentTimeout);
                BattleMode.currentIndex++;
                BattleMode.showQuestion();
                Toast.show('⏭️ Question skipped!', 'info');
                break;
            case 'timeFreeze':
                clearInterval(BattleMode.questionTimer);
                Toast.show('❄️ Time frozen for 5 seconds!', 'info');
                setTimeout(() => {
                    if (BattleMode.isPlaying) {
                        BattleMode.startQuestionTimer();
                    }
                }, 5000);
                break;
        }
        
        // Update UI
        document.getElementById('pu-double').textContent = BattleMode.powerUps.doublePoints;
        document.getElementById('pu-skip').textContent = BattleMode.powerUps.skipQuestion;
        document.getElementById('pu-freeze').textContent = BattleMode.powerUps.timeFreeze;
        
        document.querySelectorAll('.pu-btn').forEach((btn, i) => {
            const types = ['doublePoints', 'skipQuestion', 'timeFreeze'];
            if (BattleMode.powerUps[types[i]] <= 0) {
                btn.classList.add('used');
            }
        });
    },

    showFeedback: (correct, points, message = '') => {
        const feedback = document.createElement('div');
        feedback.className = `battle-feedback ${correct ? 'correct' : 'wrong'}`;
        feedback.innerHTML = correct 
            ? `<span>✓ +${points} points!</span>`
            : `<span>✗ ${message || 'Wrong!'}</span>`;
        
        document.querySelector('.battle-game-view').appendChild(feedback);
        setTimeout(() => feedback.remove(), 1000);
    },

    updateDisplays: () => {
        document.getElementById('player-score').textContent = BattleMode.playerScore;
        document.getElementById('opponent-score').textContent = BattleMode.opponentScore;
        
        document.getElementById('player-hp').style.width = Math.max(0, BattleMode.playerHP) + '%';
        document.getElementById('opponent-hp').style.width = Math.max(0, BattleMode.opponentHP) + '%';
        
        document.getElementById('player-hp-text').textContent = Math.max(0, BattleMode.playerHP);
        document.getElementById('opponent-hp-text').textContent = Math.max(0, BattleMode.opponentHP);
        
        // HP color changes
        if (BattleMode.playerHP <= 30) {
            document.getElementById('player-hp').classList.add('critical');
        }
        if (BattleMode.opponentHP <= 30) {
            document.getElementById('opponent-hp').classList.add('critical');
        }
    },

    stopGame: () => {
        BattleMode.isPlaying = false;
        clearInterval(BattleMode.questionTimer);
        clearTimeout(BattleMode.opponentTimeout);
    },

    endGame: () => {
        BattleMode.stopGame();
        
        const playerWon = BattleMode.playerHP > BattleMode.opponentHP || 
                          (BattleMode.playerHP === BattleMode.opponentHP && BattleMode.playerScore > BattleMode.opponentScore);
        const isDraw = BattleMode.playerHP === BattleMode.opponentHP && BattleMode.playerScore === BattleMode.opponentScore;
        
        // Play sound
        if (playerWon) {
            SoundFX?.play?.('victory');
        } else if (!isDraw) {
            SoundFX?.play?.('defeat');
        }
        
        // Save stats
        BattleMode.saveStats(playerWon, isDraw);
        
        // Award XP
        let xpEarned = playerWon ? 100 : 25;
        if (playerWon && BattleMode.difficulty === 'expert') xpEarned = 200;
        AppState?.addXP?.(xpEarned);
        
        const container = document.querySelector('.battle-container');
        if (!container) {
            console.error('Battle container not found');
            return;
        }
        
        container.innerHTML = `
            <button class="game-close-btn" onclick="BattleMode.close()">✕</button>
            
            <div class="battle-results">
                <div class="battle-result-banner ${playerWon ? 'victory' : isDraw ? 'draw' : 'defeat'}">
                    ${playerWon ? '🎉 VICTORY! 🎉' : isDraw ? '🤝 DRAW! 🤝' : '💀 DEFEAT 💀'}
                </div>
                
                <div class="battle-final-scores">
                    <div class="bf-player">
                        <span class="bf-name">You</span>
                        <span class="bf-score">${BattleMode.playerScore}</span>
                        <span class="bf-hp">${Math.max(0, BattleMode.playerHP)} HP</span>
                    </div>
                    <div class="bf-vs">vs</div>
                    <div class="bf-player">
                        <span class="bf-name">${BattleMode.opponentName}</span>
                        <span class="bf-score">${BattleMode.opponentScore}</span>
                        <span class="bf-hp">${Math.max(0, BattleMode.opponentHP)} HP</span>
                    </div>
                </div>
                
                <div class="battle-xp-earned">
                    +${xpEarned} XP Earned
                </div>
                
                <div class="battle-results-actions">
                    <button class="btn btn-primary" onclick="BattleMode.startGame()">
                        🔄 Rematch
                    </button>
                    <button class="btn btn-secondary" onclick="BattleMode.renderMenuAgain()">
                        Change Opponent
                    </button>
                </div>
            </div>
        `;
    },

    renderMenuAgain: () => {
        try {
            const container = document.querySelector('.battle-container');
            if (container) {
                // Re-render the entire container with menu
                const menuHtml = BattleMode.renderMenu();
                // Extract just the inner content
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = menuHtml;
                const newContainer = tempDiv.querySelector('.battle-container');
                if (newContainer) {
                    container.innerHTML = newContainer.innerHTML;
                }
            }
        } catch (error) {
            console.error('BattleMode.renderMenuAgain error:', error);
            BattleMode.close();
        }
    },

    saveStats: (won, draw) => {
        const stats = BattleMode.getStats();
        
        if (won) {
            stats.wins = (stats.wins || 0) + 1;
            stats.winStreak = (stats.winStreak || 0) + 1;
            stats.maxWinStreak = Math.max(stats.maxWinStreak || 0, stats.winStreak);
        } else if (!draw) {
            stats.losses = (stats.losses || 0) + 1;
            stats.winStreak = 0;
        }
        
        stats.totalGames = (stats.totalGames || 0) + 1;
        
        localStorage.setItem('csmaster_battle_stats', JSON.stringify(stats));
        
        // Achievements
        if (stats.wins >= 10) AppState.unlockAchievement('battle_veteran');
        if (stats.maxWinStreak >= 5) AppState.unlockAchievement('undefeated');
    },

    getStats: () => {
        return JSON.parse(localStorage.getItem('csmaster_battle_stats') || '{}');
    },

    cleanup: () => {
        // Remove keyboard listener
        document.removeEventListener('keydown', BattleMode.keyHandler);
        // Stop game and clear timers
        BattleMode.stopGame();
        // Reset state
        BattleMode.questions = [];
        BattleMode.currentIndex = 0;
        console.log('⚔️ BattleMode cleanup');
    }
};

// Keyboard shortcuts handler (defined but not auto-registered)
BattleMode.keyHandler = (e) => {
    if (!BattleMode.isPlaying) return;
    
    const key = e.key.toUpperCase();
    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, '1': 0, '2': 1, '3': 2, '4': 3 };
    
    if (keyMap.hasOwnProperty(key)) {
        e.preventDefault();
        BattleMode.answer(keyMap[key]);
    }
};
// Note: Keyboard handler is now registered in startGame() and removed in cleanup()
