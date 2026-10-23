/**
 * SpeedRun.js - Timed Theory Challenge
 * Beat the clock! Answer questions as fast as possible.
 * Features: Combo multiplier, speed bonuses, global leaderboard, streak effects
 */

const SpeedRun = {
    isPlaying: false,
    questions: [],
    currentIndex: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    timeLeft: 60,
    timer: null,
    startTime: null,
    questionStartTime: null,
    correctAnswers: 0,
    wrongAnswers: 0,
    fastestAnswer: Infinity,
    selectedTopic: 'all',
    currentShuffled: null, // Store current shuffled question
    closeCallCount: 0, // Track close call bonuses
    
    // Encouraging messages for streaks
    streakMessages: {
        3: { text: 'Nice!', icon: '👍' },
        5: { text: 'On Fire!', icon: '🔥' },
        7: { text: 'Unstoppable!', icon: '💪' },
        10: { text: 'LEGENDARY!', icon: '⚡' },
        15: { text: 'GODLIKE!', icon: '👑' },
        20: { text: 'BEYOND LIMITS!', icon: '🌟' }
    },

    open: () => {
        try {
            // Clean up any existing modal first
            SpeedRun.cleanup();
            
            const modal = document.createElement('div');
            modal.className = 'game-modal speed-run-modal';
            modal.id = 'speed-run-modal';
            modal.innerHTML = SpeedRun.renderMenu();
            document.body.appendChild(modal);
            
            requestAnimationFrame(() => modal.classList.add('active'));
        } catch (error) {
            console.error('SpeedRun.open error:', error);
            Toast?.show?.('Failed to open Speed Run', 'error');
        }
    },

    close: () => {
        try {
            SpeedRun.cleanup();
            const modal = document.getElementById('speed-run-modal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        } catch (error) {
            console.error('SpeedRun.close error:', error);
        }
    },

    renderMenu: () => {
        const topScores = SpeedRun.getLeaderboard();
        const personalBest = SpeedRun.getPersonalBest();
        const topics = typeof TOPICS !== 'undefined' && Array.isArray(TOPICS) ? TOPICS : [];
        
        return `
            <div class="game-container speed-run-container">
                <button class="game-close-btn" onclick="SpeedRun.close()">✕</button>
                
                <div class="game-header">
                    <div class="game-icon">⚡</div>
                    <h2>Speed Run</h2>
                    <p>Answer as many questions as possible in 60 seconds!</p>
                </div>
                
                <div class="speed-run-menu">
                    <div class="sr-stats-row">
                        <div class="sr-stat">
                            <span class="sr-stat-value">${personalBest.score || 0}</span>
                            <span class="sr-stat-label">Personal Best</span>
                        </div>
                        <div class="sr-stat">
                            <span class="sr-stat-value">${personalBest.maxCombo || 0}x</span>
                            <span class="sr-stat-label">Best Combo</span>
                        </div>
                        <div class="sr-stat">
                            <span class="sr-stat-value">${personalBest.gamesPlayed || 0}</span>
                            <span class="sr-stat-label">Games Played</span>
                        </div>
                    </div>
                    
                    <div class="sr-topic-select">
                        <label>Select Topic:</label>
                        <select id="sr-topic" onchange="SpeedRun.selectedTopic = this.value">
                            <option value="all">🎯 All Topics (Mixed)</option>
                            ${topics.map(t => `
                                <option value="${t.id}">${t.icon} ${t.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <button class="btn btn-primary btn-large sr-start-btn" onclick="SpeedRun.startGame()">
                        <span class="btn-icon">🚀</span>
                        Start Speed Run
                    </button>
                    
                    <div class="sr-leaderboard">
                        <h3>🏆 Top Speed Runners</h3>
                        <div class="sr-leaderboard-list">
                            ${topScores.length > 0 ? topScores.slice(0, 5).map((entry, i) => `
                                <div class="sr-lb-entry ${i < 3 ? 'top-' + (i + 1) : ''}">
                                    <span class="sr-lb-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1)}</span>
                                    <span class="sr-lb-name">${typeof Helpers !== 'undefined' && Helpers.escapeHtml ? Helpers.escapeHtml(entry.username) : entry.username}</span>
                                    <span class="sr-lb-score">${entry.score}</span>
                                </div>
                            `).join('') : '<p class="no-scores">No scores yet. Be the first!</p>'}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    startGame: () => {
        try {
            // Clear any existing timer first to prevent race conditions
            if (SpeedRun.timer) {
                clearInterval(SpeedRun.timer);
                SpeedRun.timer = null;
            }
            
            // Get questions based on selected topic
            SpeedRun.questions = SpeedRun.getQuestions(50);
            
            // Validate we have questions
            if (!SpeedRun.questions || SpeedRun.questions.length === 0) {
                Toast?.show?.('No questions available for this topic', 'error');
                return;
            }
            
            SpeedRun.currentIndex = 0;
            SpeedRun.score = 0;
            SpeedRun.combo = 0;
            SpeedRun.maxCombo = 0;
            SpeedRun.timeLeft = 60;
            SpeedRun.correctAnswers = 0;
            SpeedRun.wrongAnswers = 0;
            SpeedRun.fastestAnswer = Infinity;
            SpeedRun.isPlaying = true;
            SpeedRun.startTime = Date.now();
            SpeedRun.questionStartTime = null;
            SpeedRun.currentShuffled = null;
            SpeedRun.closeCallCount = 0;
            
            SoundFX?.play?.('start');
            
            const container = document.querySelector('.speed-run-container');
            if (!container) {
                console.error('SpeedRun container not found');
                return;
            }
            container.innerHTML = SpeedRun.renderGame();
            
            // Register keyboard handler for this game session
            document.removeEventListener('keydown', SpeedRun.keyHandler); // Remove first to prevent duplicates
            document.addEventListener('keydown', SpeedRun.keyHandler);
            
            SpeedRun.showQuestion();
            SpeedRun.startTimer();
        } catch (error) {
            console.error('SpeedRun.startGame error:', error);
            Toast?.show?.('Failed to start game', 'error');
            SpeedRun.stopGame();
        }
    },

    getQuestions: (count) => {
        // Check if QUESTIONS exists
        if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS)) {
            console.error('QUESTIONS not defined or not an array');
            return [];
        }
        
        let pool = [];
        
        if (SpeedRun.selectedTopic === 'all') {
            pool = [...QUESTIONS];
        } else {
            pool = QUESTIONS.filter(q => q && q.topic === SpeedRun.selectedTopic);
        }
        
        // Shuffle and pick
        if (typeof shuffleArray === 'function') {
            return shuffleArray([...pool]).slice(0, count);
        }
        // Fallback shuffle if shuffleArray not defined
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    },

    renderGame: () => {
        return `
            <div class="sr-game-view">
                <div class="sr-game-header">
                    <div class="sr-timer">
                        <div class="sr-timer-ring">
                            <svg viewBox="0 0 100 100">
                                <circle class="sr-timer-bg" cx="50" cy="50" r="45"/>
                                <circle class="sr-timer-progress" cx="50" cy="50" r="45" id="sr-timer-circle"/>
                            </svg>
                            <span class="sr-timer-text" id="sr-timer-text">60</span>
                        </div>
                    </div>
                    
                    <div class="sr-score-display">
                        <div class="sr-score">
                            <span class="sr-score-value" id="sr-score">0</span>
                            <span class="sr-score-label">Score</span>
                        </div>
                        <div class="sr-combo ${SpeedRun.combo > 0 ? 'active' : ''}" id="sr-combo-display">
                            <span class="sr-combo-flames" id="sr-combo-flames"></span>
                            <span class="sr-combo-value" id="sr-combo">${SpeedRun.combo}x</span>
                            <span class="sr-combo-label">Combo</span>
                        </div>
                    </div>
                </div>
                
                <div class="sr-streak-message" id="sr-streak-message"></div>
                
                <div class="sr-question-area" id="sr-question-area">
                    <!-- Question loads here -->
                </div>
                
                <div class="sr-progress-bar">
                    <div class="sr-progress-fill" id="sr-progress" style="width: 0%"></div>
                </div>
            </div>
        `;
    },

    showQuestion: () => {
        if (!SpeedRun.isPlaying || SpeedRun.currentIndex >= SpeedRun.questions.length) {
            SpeedRun.endGame();
            return;
        }
        
        const question = SpeedRun.questions[SpeedRun.currentIndex];
        if (!question || !question.question || !Array.isArray(question.options)) {
            console.error('Invalid question at index', SpeedRun.currentIndex);
            SpeedRun.currentIndex++;
            SpeedRun.showQuestion();
            return;
        }
        
        SpeedRun.questionStartTime = Date.now();
        
        // Shuffle options using Helpers.shuffleOptions
        const shuffled = Helpers.shuffleOptions(question);
        SpeedRun.currentShuffled = shuffled;
        
        const questionArea = document.getElementById('sr-question-area');
        if (!questionArea) {
            console.error('Question area not found');
            SpeedRun.endGame();
            return;
        }
        
        questionArea.innerHTML = `
            <div class="sr-question animate-in">
                <div class="sr-question-number">Question ${SpeedRun.currentIndex + 1}</div>
                <h3 class="sr-question-text">${question.question}</h3>
                <div class="sr-options">
                    ${shuffled.options.map((opt, i) => `
                        <button class="sr-option" onclick="SpeedRun.answer(${i})">
                            <span class="sr-option-key">${String.fromCharCode(65 + i)}</span>
                            <span class="sr-option-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Update progress
        const progressEl = document.getElementById('sr-progress');
        if (progressEl) {
            const progress = ((SpeedRun.currentIndex) / SpeedRun.questions.length) * 100;
            progressEl.style.width = progress + '%';
        }
    },

    answer: (index) => {
        if (!SpeedRun.isPlaying) return;
        
        const shuffled = SpeedRun.currentShuffled;
        if (!shuffled) {
            SpeedRun.endGame();
            return;
        }
        
        // Use shuffled.answer for checking correct answer
        const isCorrect = index === shuffled.answer;
        const answerTime = SpeedRun.questionStartTime 
            ? (Date.now() - SpeedRun.questionStartTime) / 1000 
            : 0;
        
        // Check for close call (answered in last 2 seconds of question display)
        const isCloseCall = answerTime >= (SpeedRun.timeLeft > 2 ? 3 : SpeedRun.timeLeft) - 2 && answerTime > 0;
        
        // Calculate points
        let points = 0;
        let bonusText = '';
        
        if (isCorrect) {
            SpeedRun.correctAnswers++;
            SpeedRun.combo++;
            SpeedRun.maxCombo = Math.max(SpeedRun.maxCombo, SpeedRun.combo);
            
            // Play sound with null checks
            if (SpeedRun.combo > 1) {
                SoundFX?.play?.('combo');
            } else {
                SoundFX?.play?.('correct');
            }
            
            if (answerTime > 0 && answerTime < SpeedRun.fastestAnswer) {
                SpeedRun.fastestAnswer = answerTime;
            }
            
            // Base points
            points = 100;
            
            // Speed bonus (under 3 seconds = up to 50 bonus)
            if (answerTime > 0 && answerTime < 3) {
                const speedBonus = Math.floor((3 - answerTime) * 25);
                points += speedBonus;
                bonusText += ` +${speedBonus} speed`;
            }
            
            // Close call bonus (answered in last 2 seconds before timer would run out)
            if (SpeedRun.timeLeft <= 2 && isCorrect) {
                const closeCallBonus = 75;
                points += closeCallBonus;
                bonusText += ` +${closeCallBonus} close call!`;
                SpeedRun.closeCallCount++;
                SpeedRun.showCloseCallEffect();
            }
            
            // Combo multiplier
            if (SpeedRun.combo > 1) {
                const comboMultiplier = Math.min(SpeedRun.combo, 10);
                const comboBonus = Math.floor(points * (comboMultiplier - 1) * 0.1);
                points += comboBonus;
                bonusText += ` +${comboBonus} combo`;
            }
            
            SpeedRun.score += points;
            SpeedRun.showFeedback(true, points, bonusText, answerTime);
            
            // Show streak message if applicable
            SpeedRun.showStreakMessage();
        } else {
            SpeedRun.wrongAnswers++;
            SpeedRun.combo = 0;
            SoundFX?.play?.('wrong');
            SpeedRun.showFeedback(false, 0, '', answerTime);
            SpeedRun.hideStreakMessage();
        }
        
        // Update displays with null checks
        const scoreEl = document.getElementById('sr-score');
        if (scoreEl) scoreEl.textContent = SpeedRun.score;
        
        SpeedRun.updateComboDisplay();
        
        // Next question after brief delay
        SpeedRun.currentIndex++;
        setTimeout(() => SpeedRun.showQuestion(), 400);
    },
    
    updateComboDisplay: () => {
        const comboEl = document.getElementById('sr-combo');
        if (comboEl) comboEl.textContent = SpeedRun.combo + 'x';
        
        const comboDisplay = document.getElementById('sr-combo-display');
        const flamesEl = document.getElementById('sr-combo-flames');
        
        if (comboDisplay) {
            // Remove all classes first
            comboDisplay.classList.remove('active', 'fire', 'legendary', 'godlike');
            
            if (SpeedRun.combo > 0) {
                comboDisplay.classList.add('active');
                
                // Add visual combo indicator with x2, x3, x4...
                if (SpeedRun.combo >= 2) {
                    comboDisplay.classList.add('combo-active');
                }
                if (SpeedRun.combo >= 5) {
                    comboDisplay.classList.add('fire');
                }
                if (SpeedRun.combo >= 10) {
                    comboDisplay.classList.add('legendary');
                }
                if (SpeedRun.combo >= 15) {
                    comboDisplay.classList.add('godlike');
                }
                
                // Update flames based on combo
                if (flamesEl) {
                    let flames = '';
                    if (SpeedRun.combo >= 3) flames = '🔥';
                    if (SpeedRun.combo >= 5) flames = '🔥🔥';
                    if (SpeedRun.combo >= 7) flames = '🔥🔥🔥';
                    if (SpeedRun.combo >= 10) flames = '⚡🔥🔥🔥⚡';
                    if (SpeedRun.combo >= 15) flames = '👑⚡🔥⚡👑';
                    flamesEl.textContent = flames;
                    flamesEl.className = 'sr-combo-flames' + (flames ? ' active' : '');
                }
            } else {
                if (flamesEl) {
                    flamesEl.textContent = '';
                    flamesEl.className = 'sr-combo-flames';
                }
            }
        }
    },
    
    showStreakMessage: () => {
        const messageEl = document.getElementById('sr-streak-message');
        if (!messageEl) return;
        
        // Find the appropriate message for current combo
        let streakData = null;
        const thresholds = Object.keys(SpeedRun.streakMessages).map(Number).sort((a, b) => b - a);
        
        for (const threshold of thresholds) {
            if (SpeedRun.combo >= threshold) {
                streakData = SpeedRun.streakMessages[threshold];
                break;
            }
        }
        
        if (streakData && SpeedRun.combo >= 3) {
            messageEl.innerHTML = `<span class="sr-streak-icon">${streakData.icon}</span> <span class="sr-streak-text">${streakData.text}</span> <span class="sr-streak-combo">x${SpeedRun.combo}</span>`;
            messageEl.className = 'sr-streak-message active';
            
            // Add shake effect for high combos
            if (SpeedRun.combo >= 10) {
                messageEl.classList.add('legendary');
            }
            if (SpeedRun.combo >= 15) {
                messageEl.classList.add('godlike');
            }
        }
    },
    
    hideStreakMessage: () => {
        const messageEl = document.getElementById('sr-streak-message');
        if (messageEl) {
            messageEl.className = 'sr-streak-message';
            messageEl.innerHTML = '';
        }
    },
    
    showCloseCallEffect: () => {
        const gameView = document.querySelector('.sr-game-view');
        if (!gameView) return;
        
        const closeCallEl = document.createElement('div');
        closeCallEl.className = 'sr-close-call-effect';
        closeCallEl.innerHTML = '⏱️ CLOSE CALL! ⏱️';
        gameView.appendChild(closeCallEl);
        
        setTimeout(() => {
            if (closeCallEl.parentNode) {
                closeCallEl.remove();
            }
        }, 1000);
    },

    showFeedback: (correct, points, bonus, time) => {
        const gameView = document.querySelector('.sr-game-view');
        if (!gameView) return;
        
        const feedback = document.createElement('div');
        feedback.className = `sr-feedback ${correct ? 'correct' : 'wrong'}`;
        feedback.innerHTML = correct 
            ? `<span class="sr-fb-icon">✓</span><span class="sr-fb-points">+${points}</span><span class="sr-fb-bonus">${bonus}</span><span class="sr-fb-time">${time.toFixed(1)}s</span>`
            : `<span class="sr-fb-icon">✗</span><span class="sr-fb-text">Combo Lost!</span>`;
        
        gameView.appendChild(feedback);
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 800);
    },

    startTimer: () => {
        const circumference = 2 * Math.PI * 45;
        const circle = document.getElementById('sr-timer-circle');
        if (!circle) {
            console.error('Timer circle not found');
            return;
        }
        circle.style.strokeDasharray = circumference;
        
        // Clear any existing timer to prevent multiple timers
        if (SpeedRun.timer) {
            clearInterval(SpeedRun.timer);
        }
        
        SpeedRun.timer = setInterval(() => {
            // Safety check - stop if game is no longer playing
            if (!SpeedRun.isPlaying) {
                SpeedRun.stopGame();
                return;
            }
            
            SpeedRun.timeLeft--;
            
            const timerText = document.getElementById('sr-timer-text');
            const timerCircle = document.getElementById('sr-timer-circle');
            
            if (timerText) {
                timerText.textContent = Math.max(0, SpeedRun.timeLeft);
            }
            
            // Update circle
            if (timerCircle) {
                const progress = Math.max(0, SpeedRun.timeLeft) / 60;
                const offset = circumference * (1 - progress);
                timerCircle.style.strokeDashoffset = offset;
                
                // Color changes
                if (SpeedRun.timeLeft <= 10) {
                    timerCircle.classList.add('danger');
                    timerCircle.classList.remove('warning');
                } else if (SpeedRun.timeLeft <= 20) {
                    timerCircle.classList.add('warning');
                }
            }
            
            if (SpeedRun.timeLeft <= 0) {
                SpeedRun.endGame();
            }
        }, 1000);
    },

    stopGame: () => {
        SpeedRun.isPlaying = false;
        if (SpeedRun.timer) {
            clearInterval(SpeedRun.timer);
            SpeedRun.timer = null;
        }
    },

    endGame: () => {
        // Prevent multiple calls
        if (!SpeedRun.isPlaying && SpeedRun.timer === null) {
            return;
        }
        
        SpeedRun.stopGame();
        
        const totalAnswers = SpeedRun.correctAnswers + SpeedRun.wrongAnswers;
        const accuracy = totalAnswers > 0 ? (SpeedRun.correctAnswers / totalAnswers * 100) : 0;
        
        // Save score
        SpeedRun.saveScore();
        
        // Award XP
        const xpEarned = Math.floor(SpeedRun.score / 10);
        AppState?.addXP?.(xpEarned);
        
        // Check achievements
        if (SpeedRun.maxCombo >= 10) {
            AppState?.unlockAchievement?.('speed_demon');
        }
        if (SpeedRun.score >= 2000) {
            AppState?.unlockAchievement?.('speed_master');
        }
        
        const container = document.querySelector('.speed-run-container');
        if (!container) {
            console.error('SpeedRun container not found');
            return;
        }
        
        const isNewRecord = SpeedRun.isNewPersonalBest();
        
        if (isNewRecord) {
            SoundFX?.play?.('achievement');
        } else {
            SoundFX?.play?.('complete');
        }
        
        container.innerHTML = `
            <button class="game-close-btn" onclick="SpeedRun.close()">✕</button>
            
            <div class="sr-results">
                ${isNewRecord ? '<div class="sr-new-record">🎉 NEW PERSONAL BEST! 🎉</div>' : ''}
                
                <div class="sr-final-score">
                    <span class="sr-final-value">${SpeedRun.score}</span>
                    <span class="sr-final-label">Final Score</span>
                </div>
                
                <div class="sr-results-grid">
                    <div class="sr-result-item">
                        <span class="sr-ri-icon">✓</span>
                        <span class="sr-ri-value">${SpeedRun.correctAnswers}</span>
                        <span class="sr-ri-label">Correct</span>
                    </div>
                    <div class="sr-result-item">
                        <span class="sr-ri-icon">✗</span>
                        <span class="sr-ri-value">${SpeedRun.wrongAnswers}</span>
                        <span class="sr-ri-label">Wrong</span>
                    </div>
                    <div class="sr-result-item">
                        <span class="sr-ri-icon">🎯</span>
                        <span class="sr-ri-value">${accuracy.toFixed(0)}%</span>
                        <span class="sr-ri-label">Accuracy</span>
                    </div>
                    <div class="sr-result-item">
                        <span class="sr-ri-icon">🔥</span>
                        <span class="sr-ri-value">${SpeedRun.maxCombo}x</span>
                        <span class="sr-ri-label">Max Combo</span>
                    </div>
                    <div class="sr-result-item">
                        <span class="sr-ri-icon">⚡</span>
                        <span class="sr-ri-value">${SpeedRun.fastestAnswer === Infinity ? '-' : SpeedRun.fastestAnswer.toFixed(1) + 's'}</span>
                        <span class="sr-ri-label">Fastest</span>
                    </div>
                    <div class="sr-result-item">
                        <span class="sr-ri-icon">⏱️</span>
                        <span class="sr-ri-value">${SpeedRun.closeCallCount}</span>
                        <span class="sr-ri-label">Close Calls</span>
                    </div>
                    <div class="sr-result-item">
                        <span class="sr-ri-icon">⭐</span>
                        <span class="sr-ri-value">+${xpEarned}</span>
                        <span class="sr-ri-label">XP Earned</span>
                    </div>
                </div>
                
                <div class="sr-results-actions">
                    <button class="btn btn-primary" onclick="SpeedRun.startGame()">
                        🔄 Play Again
                    </button>
                    <button class="btn btn-secondary" onclick="SpeedRun.close()">
                        Done
                    </button>
                </div>
            </div>
        `;
    },

    saveScore: () => {
        try {
            const username = (typeof Auth !== 'undefined' && Auth?.getCurrentUser?.()?.username) || 'Guest';
            const leaderboard = JSON.parse(localStorage.getItem('csmaster_speedrun_lb') || '[]');
            
            const totalAnswers = SpeedRun.correctAnswers + SpeedRun.wrongAnswers;
            const accuracy = totalAnswers > 0 
                ? (SpeedRun.correctAnswers / totalAnswers * 100) 
                : 0;
            
            leaderboard.push({
                username,
                score: SpeedRun.score,
                maxCombo: SpeedRun.maxCombo,
                correct: SpeedRun.correctAnswers,
                accuracy: accuracy,
                date: new Date().toISOString()
            });
            
            // Sort by score and keep top 100
            leaderboard.sort((a, b) => b.score - a.score);
            localStorage.setItem('csmaster_speedrun_lb', JSON.stringify(leaderboard.slice(0, 100)));
            
            // Update personal best
            const personalBest = SpeedRun.getPersonalBest();
            const newGamesPlayed = (personalBest.gamesPlayed || 0) + 1;
            
            if (SpeedRun.score > (personalBest.score || 0)) {
                localStorage.setItem('csmaster_speedrun_pb_' + username, JSON.stringify({
                    score: SpeedRun.score,
                    maxCombo: SpeedRun.maxCombo,
                    gamesPlayed: newGamesPlayed
                }));
            } else {
                localStorage.setItem('csmaster_speedrun_pb_' + username, JSON.stringify({
                    ...personalBest,
                    gamesPlayed: newGamesPlayed
                }));
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    },

    getLeaderboard: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_speedrun_lb') || '[]');
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            return [];
        }
    },

    getPersonalBest: () => {
        try {
            const username = (typeof Auth !== 'undefined' && Auth?.getCurrentUser?.()?.username) || 'Guest';
            return JSON.parse(localStorage.getItem('csmaster_speedrun_pb_' + username) || '{}');
        } catch (error) {
            console.error('Error loading personal best:', error);
            return {};
        }
    },

    isNewPersonalBest: () => {
        const personalBest = SpeedRun.getPersonalBest();
        return SpeedRun.score > (personalBest.score || 0);
    },

    cleanup: () => {
        // Remove keydown listener
        document.removeEventListener('keydown', SpeedRun.keyHandler);
        // Clear timer
        SpeedRun.stopGame();
        // Reset state
        SpeedRun.questions = [];
        SpeedRun.currentIndex = 0;
        SpeedRun.questionStartTime = null;
        SpeedRun.currentShuffled = null;
        SpeedRun.closeCallCount = 0;
        console.log('⚡ SpeedRun cleanup');
    }
};

// Keyboard shortcuts handler for Speed Run (defined but not auto-registered)
SpeedRun.keyHandler = (e) => {
    if (!SpeedRun.isPlaying) return;
    
    const key = e.key.toUpperCase();
    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, '1': 0, '2': 1, '3': 2, '4': 3 };
    
    if (Object.prototype.hasOwnProperty.call(keyMap, key)) {
        e.preventDefault();
        SpeedRun.answer(keyMap[key]);
    }
};
// Note: Keyboard handler is now registered in startGame() and removed in cleanup()
