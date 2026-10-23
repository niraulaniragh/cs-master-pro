/**
 * BattleMode.js - 1v1 Head to Head
 * Compete against AI opponents or challenge friends
 * Features: Power-ups, sudden death, difficulty levels, AI personalities
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
    powerUps: { doublePoints: 1, skipQuestion: 1, timeFreeze: 1 },
    questionTimer: null,
    opponentTimeout: null,
    timeLeft: 15,
    playerAnswered: false,
    timeFrozen: false,
    currentPersonality: null,
    lastDamageDealt: 0,

    // AI Personalities
    personalities: {
        aggressive: {
            name: 'Aggressive',
            icon: '🔥',
            speedMultiplier: 0.7,
            accuracyModifier: -0.05,
            damageMultiplier: 1.3,
            taunt: ['Come on, is that all?', 'Too slow!', 'I eat noobs for breakfast!'],
            color: '#ef4444'
        },
        defensive: {
            name: 'Defensive',
            icon: '🛡️',
            speedMultiplier: 1.3,
            accuracyModifier: 0.1,
            damageMultiplier: 0.8,
            taunt: ['Patience wins battles...', 'Steady and sure.', 'No rush here.'],
            color: '#3b82f6'
        },
        balanced: {
            name: 'Balanced',
            icon: '⚖️',
            speedMultiplier: 1.0,
            accuracyModifier: 0,
            damageMultiplier: 1.0,
            taunt: ['Good game!', 'Well played!', 'Let\'s see what you\'ve got.'],
            color: '#10b981'
        }
    },

    // Battle commentary phrases
    commentary: {
        criticalHit: ['💥 CRITICAL HIT!', '⚡ DEVASTATING BLOW!', '🎯 PERFECT STRIKE!'],
        closeBattle: ['😰 This is INTENSE!', '🔥 Neck and neck!', '⚔️ Anyone\'s game!'],
        lowHP: ['💀 On the brink!', '😱 Hanging by a thread!', '🩸 Critical condition!'],
        comeback: ['🔄 The comeback begins!', '💪 Fighting back!', '🌟 Never give up!'],
        dominating: ['👑 DOMINATING!', '🏆 Unstoppable!', '💯 Flawless!']
    },

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
        BattleMode.opponentName = BattleMode.difficulties[diff]?.name || 'CPU Bot';
        
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        const targetBtn = evt?.target?.closest('.difficulty-btn') || 
                         document.querySelector(`.difficulty-btn[onclick*="'${diff}'"]`);
        if (targetBtn) {
            targetBtn.classList.add('selected');
        }
    },

    // Assign random personality to AI
    assignPersonality: () => {
        const personalities = Object.keys(BattleMode.personalities);
        const randomIndex = Math.floor(Math.random() * personalities.length);
        BattleMode.currentPersonality = personalities[randomIndex];
        return BattleMode.personalities[BattleMode.currentPersonality];
    },

    startGame: () => {
        try {
            if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
                Toast?.show?.('No questions available', 'error');
                return;
            }
            
            if (typeof shuffleArray !== 'function') {
                console.error('shuffleArray function not found');
                Toast?.show?.('Game initialization error', 'error');
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
            BattleMode.playerAnswered = false;
            BattleMode.timeFrozen = false;
            BattleMode.lastDamageDealt = 0;
            
            // Assign AI personality
            const personality = BattleMode.assignPersonality();
            
            SoundFX?.play?.('start');
            
            const container = document.querySelector('.battle-container');
            if (!container) {
                console.error('Battle container not found');
                return;
            }
            container.innerHTML = BattleMode.renderGame();
            
            // Show AI personality announcement
            BattleMode.showPersonalityIntro(personality);
            
            document.addEventListener('keydown', BattleMode.keyHandler);
            
            setTimeout(() => BattleMode.showQuestion(), 2000);
        } catch (error) {
            console.error('BattleMode.startGame error:', error);
            Toast?.show?.('Failed to start game', 'error');
        }
    },

    showPersonalityIntro: (personality) => {
        const gameView = document.querySelector('.battle-game-view');
        if (!gameView) return;
        
        const intro = document.createElement('div');
        intro.className = 'personality-intro';
        intro.innerHTML = `
            <div class="personality-badge" style="--personality-color: ${personality.color}">
                <span class="personality-icon">${personality.icon}</span>
                <span class="personality-name">${personality.name}</span>
            </div>
            <div class="personality-taunt">"${personality.taunt[Math.floor(Math.random() * personality.taunt.length)]}"</div>
        `;
        gameView.appendChild(intro);
        
        setTimeout(() => intro.classList.add('show'), 100);
        setTimeout(() => {
            intro.classList.remove('show');
            setTimeout(() => intro.remove(), 500);
        }, 1800);
    },

    renderGame: () => {
        const opponent = BattleMode.difficulties[BattleMode.difficulty] || BattleMode.difficulties.normal;
        const personality = BattleMode.personalities[BattleMode.currentPersonality] || BattleMode.personalities.balanced;
        const currentUser = typeof Auth !== 'undefined' ? Auth.getCurrentUser?.() : null;
        const username = currentUser?.username || 'You';
        const escapedUsername = typeof Helpers !== 'undefined' && Helpers.escapeHtml 
            ? Helpers.escapeHtml(username) 
            : username.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
        
        return `
            <div class="battle-game-view">
                <div class="battle-commentary" id="battle-commentary"></div>
                
                <div class="battle-arena">
                    <div class="battle-player player-left">
                        <div class="bp-avatar">👤</div>
                        <div class="bp-name">${escapedUsername}</div>
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
                        <div class="bp-personality" style="color: ${personality.color}">${personality.icon} ${personality.name}</div>
                        <div class="bp-hp-bar">
                            <div class="bp-hp-fill" id="opponent-hp" style="width: 100%"></div>
                            <span class="bp-hp-text" id="opponent-hp-text">100</span>
                        </div>
                        <div class="bp-score" id="opponent-score">0</div>
                        <div class="ai-thinking-indicator" id="ai-thinking" style="display: none;">
                            <span class="thinking-dots">
                                <span>.</span><span>.</span><span>.</span>
                            </span>
                            <span class="thinking-text">Thinking</span>
                        </div>
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
        BattleMode.playerAnswered = false;
        
        const roundEl = document.getElementById('battle-round');
        if (roundEl) roundEl.textContent = BattleMode.round;
        
        const question = BattleMode.questions[BattleMode.currentIndex];
        if (!question || !question.options || !Array.isArray(question.options)) {
            console.error('Invalid question format at index', BattleMode.currentIndex);
            BattleMode.currentIndex++;
            BattleMode.showQuestion();
            return;
        }
        
        BattleMode.timeLeft = 15;
        BattleMode.activeDoublePoints = false;
        
        // Shuffle answer options
        const shuffled = typeof Helpers !== 'undefined' && Helpers.shuffleOptions 
            ? Helpers.shuffleOptions(question)
            : { options: question.options, correctIndex: question.answer };
        
        // Store shuffled correct index for this round
        BattleMode.currentCorrectIndex = shuffled.correctIndex;
        
        const questionArea = document.getElementById('battle-question-area');
        if (!questionArea) {
            console.error('Question area not found');
            return;
        }
        
        questionArea.innerHTML = `
            <div class="battle-question animate-in">
                <h3 class="bq-text">${question.question}</h3>
                <div class="bq-options">
                    ${shuffled.options.map((opt, i) => `
                        <button class="bq-option" onclick="BattleMode.answer(${i})" data-index="${i}">
                            <span class="bq-option-key">${String.fromCharCode(65 + i)}</span>
                            <span class="bq-option-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Check for close battle commentary
        BattleMode.checkBattleCommentary();
        
        BattleMode.startQuestionTimer();
        BattleMode.simulateOpponent(question);
    },

    // Show dramatic battle commentary
    showCommentary: (type) => {
        const phrases = BattleMode.commentary[type];
        if (!phrases) return;
        
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        const commentaryEl = document.getElementById('battle-commentary');
        if (!commentaryEl) return;
        
        commentaryEl.textContent = phrase;
        commentaryEl.className = 'battle-commentary show ' + type;
        
        setTimeout(() => {
            commentaryEl.classList.remove('show');
        }, 2000);
    },

    checkBattleCommentary: () => {
        const hpDiff = Math.abs(BattleMode.playerHP - BattleMode.opponentHP);
        
        if (hpDiff <= 15 && BattleMode.round > 3) {
            BattleMode.showCommentary('closeBattle');
        } else if (BattleMode.playerHP <= 25) {
            BattleMode.showCommentary('lowHP');
        } else if (BattleMode.opponentHP <= 25 && BattleMode.playerHP > 50) {
            BattleMode.showCommentary('dominating');
        } else if (BattleMode.playerHP < BattleMode.opponentHP && BattleMode.lastDamageDealt > 15) {
            BattleMode.showCommentary('comeback');
        }
    },

    startQuestionTimer: () => {
        const timerFill = document.getElementById('battle-timer-fill');
        const timerText = document.getElementById('battle-timer-text');
        
        if (!timerFill || !timerText) {
            console.error('Timer elements not found');
            return;
        }
        
        timerFill.style.width = '100%';
        timerFill.classList.remove('danger');
        timerText.textContent = BattleMode.timeLeft;
        
        if (BattleMode.questionTimer) {
            clearInterval(BattleMode.questionTimer);
        }
        
        BattleMode.questionTimer = setInterval(() => {
            if (BattleMode.timeFrozen) return;
            
            BattleMode.timeLeft -= 0.1;
            
            const percent = (BattleMode.timeLeft / 15) * 100;
            const fill = document.getElementById('battle-timer-fill');
            const text = document.getElementById('battle-timer-text');
            
            if (fill) fill.style.width = Math.max(0, percent) + '%';
            if (text) text.textContent = Math.ceil(Math.max(0, BattleMode.timeLeft));
            
            if (BattleMode.timeLeft <= 5 && fill) {
                fill.classList.add('danger');
            }
            
            if (BattleMode.timeLeft <= 0) {
                BattleMode.timeout();
            }
        }, 100);
    },

    // Show AI thinking animation
    showAIThinking: (show) => {
        const thinkingEl = document.getElementById('ai-thinking');
        if (thinkingEl) {
            thinkingEl.style.display = show ? 'flex' : 'none';
            if (show) {
                thinkingEl.classList.add('active');
            } else {
                thinkingEl.classList.remove('active');
            }
        }
    },

    simulateOpponent: (question) => {
        const settings = BattleMode.difficulties[BattleMode.difficulty] || BattleMode.difficulties.normal;
        const personality = BattleMode.personalities[BattleMode.currentPersonality] || BattleMode.personalities.balanced;
        
        // Apply personality modifiers
        const accuracy = Math.min(0.98, settings.accuracy + personality.accuracyModifier);
        const willBeCorrect = Math.random() < accuracy;
        
        const [minTime, maxTime] = settings.speed;
        const adjustedMin = minTime * personality.speedMultiplier;
        const adjustedMax = maxTime * personality.speedMultiplier;
        const answerTime = adjustedMin + Math.random() * (adjustedMax - adjustedMin);
        
        if (BattleMode.opponentTimeout) {
            clearTimeout(BattleMode.opponentTimeout);
        }
        
        // Show thinking animation after a short delay
        setTimeout(() => {
            if (BattleMode.isPlaying && !BattleMode.playerAnswered) {
                BattleMode.showAIThinking(true);
            }
        }, 500);
        
        BattleMode.opponentTimeout = setTimeout(() => {
            BattleMode.showAIThinking(false);
            
            if (!BattleMode.isPlaying || BattleMode.playerAnswered) return;
            
            if (willBeCorrect) {
                const baseDamage = 10;
                const damage = Math.round(baseDamage * personality.damageMultiplier);
                BattleMode.opponentScore += damage;
                BattleMode.playerHP -= damage;
                BattleMode.showOpponentAction('correct', damage);
                
                // Screen shake on big AI hits
                if (damage >= 12) {
                    BattleMode.screenShake('medium');
                }
            } else {
                BattleMode.opponentHP -= 5;
                BattleMode.showOpponentAction('wrong');
            }
            
            BattleMode.updateDisplays();
            
            if (BattleMode.playerHP <= 0 || BattleMode.opponentHP <= 0) {
                setTimeout(() => BattleMode.endGame(), 1000);
            }
        }, answerTime * 1000);
    },

    showOpponentAction: (result, damage = 0) => {
        const playerRight = document.querySelector('.player-right');
        if (!playerRight) return;
        
        const indicator = document.createElement('div');
        indicator.className = `opponent-indicator ${result}`;
        
        if (result === 'correct' && damage >= 12) {
            indicator.textContent = `💥 Bot SMASHED! -${damage}HP`;
        } else {
            indicator.textContent = result === 'correct' ? '✓ Bot answered!' : '✗ Bot missed!';
        }
        
        playerRight.appendChild(indicator);
        setTimeout(() => indicator.remove(), 1000);
    },

    // Screen shake effect
    screenShake: (intensity = 'light') => {
        const gameView = document.querySelector('.battle-game-view');
        if (!gameView) return;
        
        const shakeClass = `shake-${intensity}`;
        gameView.classList.add(shakeClass);
        
        setTimeout(() => {
            gameView.classList.remove(shakeClass);
        }, intensity === 'heavy' ? 500 : 300);
    },

    answer: (index) => {
        if (!BattleMode.isPlaying || BattleMode.playerAnswered) return;
        
        BattleMode.playerAnswered = true;
        BattleMode.showAIThinking(false);
        
        clearInterval(BattleMode.questionTimer);
        clearTimeout(BattleMode.opponentTimeout);
        
        const question = BattleMode.questions[BattleMode.currentIndex];
        if (!question) return;
        
        // Use shuffled correct index
        const correctIndex = BattleMode.currentCorrectIndex !== undefined 
            ? BattleMode.currentCorrectIndex 
            : question.answer;
        const isCorrect = index === correctIndex;
        
        // Highlight answers
        document.querySelectorAll('.bq-option').forEach((btn, i) => {
            btn.disabled = true;
            if (i === correctIndex) {
                btn.classList.add('correct');
            } else if (i === index && !isCorrect) {
                btn.classList.add('wrong');
            }
        });
        
        if (isCorrect) {
            let points = 10;
            const isCritical = BattleMode.timeLeft > 10; // Fast answer = critical
            
            if (BattleMode.activeDoublePoints) {
                points = 20;
                BattleMode.activeDoublePoints = false;
            }
            
            if (isCritical) {
                points = Math.round(points * 1.5);
                BattleMode.showCommentary('criticalHit');
                BattleMode.screenShake('heavy');
            }
            
            BattleMode.playerScore += points;
            BattleMode.lastDamageDealt = points;
            BattleMode.opponentHP -= points;
            SoundFX?.play?.('correct');
            BattleMode.showFeedback(true, points, isCritical);
        } else {
            BattleMode.playerHP -= 10;
            BattleMode.lastDamageDealt = 0;
            SoundFX?.play?.('damage');
            BattleMode.showFeedback(false, 0);
            BattleMode.screenShake('light');
        }
        
        BattleMode.updateDisplays();
        
        if (BattleMode.playerHP <= 0 || BattleMode.opponentHP <= 0) {
            setTimeout(() => BattleMode.endGame(), 1000);
            return;
        }
        
        BattleMode.currentIndex++;
        setTimeout(() => BattleMode.showQuestion(), 1500);
    },

    timeout: () => {
        if (BattleMode.playerAnswered) return;
        
        BattleMode.playerAnswered = true;
        BattleMode.showAIThinking(false);
        clearInterval(BattleMode.questionTimer);
        clearTimeout(BattleMode.opponentTimeout);
        
        BattleMode.playerHP -= 15;
        BattleMode.lastDamageDealt = 0;
        SoundFX?.play?.('damage');
        BattleMode.showFeedback(false, 0, false, 'Time up!');
        BattleMode.updateDisplays();
        BattleMode.screenShake('medium');
        
        const question = BattleMode.questions[BattleMode.currentIndex];
        const correctIndex = BattleMode.currentCorrectIndex !== undefined 
            ? BattleMode.currentCorrectIndex 
            : question?.answer;
        
        if (question) {
            document.querySelectorAll('.bq-option').forEach((btn, i) => {
                btn.disabled = true;
                if (i === correctIndex) {
                    btn.classList.add('correct');
                }
            });
        }
        
        if (BattleMode.playerHP <= 0) {
            setTimeout(() => BattleMode.endGame(), 1000);
            return;
        }
        
        BattleMode.currentIndex++;
        setTimeout(() => BattleMode.showQuestion(), 1500);
    },

    // Power-up visual effects
    showPowerUpVisual: (type) => {
        const gameView = document.querySelector('.battle-game-view');
        if (!gameView) return;
        
        const visual = document.createElement('div');
        visual.className = 'powerup-visual ' + type;
        
        const icons = {
            doublePoints: '2️⃣',
            skipQuestion: '⏭️',
            timeFreeze: '❄️'
        };
        
        const names = {
            doublePoints: 'DOUBLE DAMAGE!',
            skipQuestion: 'SKIP!',
            timeFreeze: 'TIME FREEZE!'
        };
        
        visual.innerHTML = `
            <div class="powerup-burst">
                <span class="powerup-icon-large">${icons[type]}</span>
                <span class="powerup-name-large">${names[type]}</span>
            </div>
        `;
        
        gameView.appendChild(visual);
        
        // Add screen effect for time freeze
        if (type === 'timeFreeze') {
            gameView.classList.add('frozen-effect');
            setTimeout(() => gameView.classList.remove('frozen-effect'), 5000);
        }
        
        setTimeout(() => visual.remove(), 1000);
    },

    usePowerUp: (type) => {
        if (!BattleMode.isPlaying || BattleMode.playerAnswered) return;
        if (!BattleMode.powerUps[type] || BattleMode.powerUps[type] <= 0) return;
        
        BattleMode.powerUps[type]--;
        
        // Show visual effect
        BattleMode.showPowerUpVisual(type);
        SoundFX?.play?.('powerup');
        
        switch (type) {
            case 'doublePoints':
                BattleMode.activeDoublePoints = true;
                Toast?.show?.('2️⃣ Double Points activated!', 'info');
                break;
            case 'skipQuestion':
                clearInterval(BattleMode.questionTimer);
                clearTimeout(BattleMode.opponentTimeout);
                BattleMode.showAIThinking(false);
                BattleMode.currentIndex++;
                Toast?.show?.('⏭️ Question skipped!', 'info');
                BattleMode.showQuestion();
                break;
            case 'timeFreeze':
                BattleMode.timeFrozen = true;
                Toast?.show?.('❄️ Time frozen for 5 seconds!', 'info');
                setTimeout(() => {
                    if (BattleMode.isPlaying) {
                        BattleMode.timeFrozen = false;
                    }
                }, 5000);
                break;
        }
        
        const puDouble = document.getElementById('pu-double');
        const puSkip = document.getElementById('pu-skip');
        const puFreeze = document.getElementById('pu-freeze');
        
        if (puDouble) puDouble.textContent = BattleMode.powerUps.doublePoints;
        if (puSkip) puSkip.textContent = BattleMode.powerUps.skipQuestion;
        if (puFreeze) puFreeze.textContent = BattleMode.powerUps.timeFreeze;
        
        document.querySelectorAll('.pu-btn').forEach((btn, i) => {
            const types = ['doublePoints', 'skipQuestion', 'timeFreeze'];
            if (BattleMode.powerUps[types[i]] <= 0) {
                btn.classList.add('used');
            }
        });
    },

    showFeedback: (correct, points, isCritical = false, message = '') => {
        const gameView = document.querySelector('.battle-game-view');
        if (!gameView) return;
        
        const feedback = document.createElement('div');
        feedback.className = `battle-feedback ${correct ? 'correct' : 'wrong'} ${isCritical ? 'critical' : ''}`;
        
        if (correct) {
            feedback.innerHTML = isCritical 
                ? `<span>💥 CRITICAL! +${points} points!</span>`
                : `<span>✓ +${points} points!</span>`;
        } else {
            feedback.innerHTML = `<span>✗ ${message || 'Wrong!'}</span>`;
        }
        
        gameView.appendChild(feedback);
        setTimeout(() => feedback.remove(), 1000);
    },

    updateDisplays: () => {
        const playerScore = document.getElementById('player-score');
        const opponentScore = document.getElementById('opponent-score');
        const playerHp = document.getElementById('player-hp');
        const opponentHp = document.getElementById('opponent-hp');
        const playerHpText = document.getElementById('player-hp-text');
        const opponentHpText = document.getElementById('opponent-hp-text');
        
        if (playerScore) playerScore.textContent = BattleMode.playerScore;
        if (opponentScore) opponentScore.textContent = BattleMode.opponentScore;
        
        const clampedPlayerHP = Math.max(0, BattleMode.playerHP);
        const clampedOpponentHP = Math.max(0, BattleMode.opponentHP);
        
        if (playerHp) {
            playerHp.style.width = clampedPlayerHP + '%';
            if (clampedPlayerHP <= 30) playerHp.classList.add('critical');
        }
        if (opponentHp) {
            opponentHp.style.width = clampedOpponentHP + '%';
            if (clampedOpponentHP <= 30) opponentHp.classList.add('critical');
        }
        
        if (playerHpText) playerHpText.textContent = clampedPlayerHP;
        if (opponentHpText) opponentHpText.textContent = clampedOpponentHP;
    },

    stopGame: () => {
        BattleMode.isPlaying = false;
        BattleMode.timeFrozen = false;
        if (BattleMode.questionTimer) {
            clearInterval(BattleMode.questionTimer);
            BattleMode.questionTimer = null;
        }
        if (BattleMode.opponentTimeout) {
            clearTimeout(BattleMode.opponentTimeout);
            BattleMode.opponentTimeout = null;
        }
    },

    endGame: () => {
        BattleMode.stopGame();
        
        const playerWon = BattleMode.playerHP > BattleMode.opponentHP || 
                          (BattleMode.playerHP === BattleMode.opponentHP && BattleMode.playerScore > BattleMode.opponentScore);
        const isDraw = BattleMode.playerHP === BattleMode.opponentHP && BattleMode.playerScore === BattleMode.opponentScore;
        
        if (playerWon) {
            SoundFX?.play?.('victory');
        } else if (!isDraw) {
            SoundFX?.play?.('defeat');
        }
        
        BattleMode.saveStats(playerWon, isDraw);
        
        let xpEarned = playerWon ? 100 : 25;
        if (playerWon && BattleMode.difficulty === 'expert') xpEarned = 200;
        AppState?.addXP?.(xpEarned);
        
        const container = document.querySelector('.battle-container');
        if (!container) {
            console.error('Battle container not found');
            return;
        }
        
        const clampedPlayerHP = Math.max(0, BattleMode.playerHP);
        const clampedOpponentHP = Math.max(0, BattleMode.opponentHP);
        const personality = BattleMode.personalities[BattleMode.currentPersonality] || BattleMode.personalities.balanced;
        
        container.innerHTML = `
            <button class="game-close-btn" onclick="BattleMode.close()">✕</button>
            
            <div class="battle-results">
                <div class="battle-result-banner ${playerWon ? 'victory' : isDraw ? 'draw' : 'defeat'}">
                    ${playerWon ? '🎉 VICTORY! 🎉' : isDraw ? '🤝 DRAW! 🤝' : '💀 DEFEAT 💀'}
                </div>
                
                <div class="opponent-reaction">
                    ${playerWon 
                        ? `${personality.icon} "Well played, human..."` 
                        : isDraw 
                            ? `${personality.icon} "A worthy opponent!"` 
                            : `${personality.icon} "${personality.taunt[0]}"`}
                </div>
                
                <div class="battle-final-scores">
                    <div class="bf-player">
                        <span class="bf-name">You</span>
                        <span class="bf-score">${BattleMode.playerScore}</span>
                        <span class="bf-hp">${clampedPlayerHP} HP</span>
                    </div>
                    <div class="bf-vs">vs</div>
                    <div class="bf-player">
                        <span class="bf-name">${BattleMode.opponentName}</span>
                        <span class="bf-score">${BattleMode.opponentScore}</span>
                        <span class="bf-hp">${clampedOpponentHP} HP</span>
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
                const menuHtml = BattleMode.renderMenu();
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
        try {
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
            
            if (stats.wins >= 10) AppState?.unlockAchievement?.('battle_veteran');
            if (stats.maxWinStreak >= 5) AppState?.unlockAchievement?.('undefeated');
        } catch (error) {
            console.error('BattleMode.saveStats error:', error);
        }
    },

    getStats: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_battle_stats') || '{}');
        } catch (error) {
            console.error('BattleMode.getStats error:', error);
            return {};
        }
    },

    cleanup: () => {
        document.removeEventListener('keydown', BattleMode.keyHandler);
        BattleMode.stopGame();
        BattleMode.questions = [];
        BattleMode.currentIndex = 0;
        BattleMode.playerAnswered = false;
        BattleMode.timeFrozen = false;
        BattleMode.currentPersonality = null;
        BattleMode.currentCorrectIndex = undefined;
        console.log('⚔️ BattleMode cleanup');
    }
};

BattleMode.keyHandler = (e) => {
    if (!BattleMode.isPlaying || BattleMode.playerAnswered) return;
    
    const key = e.key.toUpperCase();
    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, '1': 0, '2': 1, '3': 2, '4': 3 };
    
    if (Object.prototype.hasOwnProperty.call(keyMap, key)) {
        e.preventDefault();
        BattleMode.answer(keyMap[key]);
    }
};

// CSS for new features (inject into page)
const battleModeStyles = document.createElement('style');
battleModeStyles.textContent = `
/* AI Thinking Animation */
.ai-thinking-indicator {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    background: rgba(0,0,0,0.3);
    border-radius: 15px;
    font-size: 0.8em;
    margin-top: 5px;
}
.ai-thinking-indicator.active {
    animation: pulse 1s infinite;
}
.thinking-dots span {
    animation: bounce 1.4s infinite ease-in-out;
    display: inline-block;
}
.thinking-dots span:nth-child(1) { animation-delay: 0s; }
.thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
.thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
}
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Battle Commentary */
.battle-commentary {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5em;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 100;
    pointer-events: none;
}
.battle-commentary.show {
    opacity: 1;
    animation: commentaryPop 0.5s ease-out;
}
.battle-commentary.criticalHit { color: #fbbf24; }
.battle-commentary.closeBattle { color: #f97316; }
.battle-commentary.lowHP { color: #ef4444; }
.battle-commentary.comeback { color: #10b981; }
.battle-commentary.dominating { color: #a855f7; }
@keyframes commentaryPop {
    0% { transform: translate(-50%, -50%) scale(0.5); }
    50% { transform: translate(-50%, -50%) scale(1.2); }
    100% { transform: translate(-50%, -50%) scale(1); }
}

/* Screen Shake */
.shake-light {
    animation: shakeLight 0.3s ease-in-out;
}
.shake-medium {
    animation: shakeMedium 0.3s ease-in-out;
}
.shake-heavy {
    animation: shakeHeavy 0.5s ease-in-out;
}
@keyframes shakeLight {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
}
@keyframes shakeMedium {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-5px); }
    40% { transform: translateX(5px); }
    60% { transform: translateX(-3px); }
    80% { transform: translateX(3px); }
}
@keyframes shakeHeavy {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-8px, -2px); }
    20% { transform: translate(8px, 2px); }
    30% { transform: translate(-6px, -4px); }
    40% { transform: translate(6px, 4px); }
    50% { transform: translate(-4px, -2px); }
    60% { transform: translate(4px, 2px); }
    70% { transform: translate(-2px, -1px); }
    80% { transform: translate(2px, 1px); }
}

/* Personality Intro */
.personality-intro {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    text-align: center;
    z-index: 200;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.personality-intro.show {
    transform: translate(-50%, -50%) scale(1);
}
.personality-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 30px;
    background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6));
    border: 3px solid var(--personality-color);
    border-radius: 50px;
    box-shadow: 0 0 30px var(--personality-color);
}
.personality-icon {
    font-size: 2em;
}
.personality-name {
    font-size: 1.5em;
    font-weight: bold;
    color: var(--personality-color);
}
.personality-taunt {
    margin-top: 10px;
    font-style: italic;
    color: #ccc;
}
.bp-personality {
    font-size: 0.75em;
    margin-top: 2px;
}

/* Power-up Visuals */
.powerup-visual {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 150;
    animation: powerupFlash 1s ease-out forwards;
}
.powerup-burst {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 40px;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    border-radius: 20px;
}
.powerup-icon-large {
    font-size: 4em;
    animation: powerupSpin 0.5s ease-out;
}
.powerup-name-large {
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 20px currentColor;
    margin-top: 10px;
}
.powerup-visual.doublePoints .powerup-name-large { color: #fbbf24; }
.powerup-visual.skipQuestion .powerup-name-large { color: #a855f7; }
.powerup-visual.timeFreeze .powerup-name-large { color: #38bdf8; }
@keyframes powerupFlash {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
}
@keyframes powerupSpin {
    0% { transform: rotate(0deg) scale(0.5); }
    100% { transform: rotate(360deg) scale(1); }
}

/* Time Freeze Effect */
.frozen-effect {
    position: relative;
}
.frozen-effect::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%);
    pointer-events: none;
    animation: frozenPulse 2s infinite;
}
@keyframes frozenPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
}

/* Critical Feedback */
.battle-feedback.critical {
    font-size: 1.5em;
    color: #fbbf24;
    text-shadow: 0 0 20px #fbbf24;
}
`;
document.head.appendChild(battleModeStyles);
