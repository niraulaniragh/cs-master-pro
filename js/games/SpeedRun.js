/**
 * SpeedRun.js - Timed Theory Challenge
 * Beat the clock! Answer questions as fast as possible.
 * Features: Combo multiplier, speed bonuses, global leaderboard
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

    open: () => {
        const modal = document.createElement('div');
        modal.className = 'game-modal speed-run-modal';
        modal.id = 'speed-run-modal';
        modal.innerHTML = SpeedRun.renderMenu();
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    close: () => {
        document.removeEventListener('keydown', SpeedRun.keyHandler);
        const modal = document.getElementById('speed-run-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        SpeedRun.stopGame();
    },

    renderMenu: () => {
        const topScores = SpeedRun.getLeaderboard();
        const personalBest = SpeedRun.getPersonalBest();
        
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
                            ${TOPICS.map(t => `
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
                                    <span class="sr-lb-name">${Helpers.escapeHtml(entry.username)}</span>
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
        // Get questions based on selected topic
        SpeedRun.questions = SpeedRun.getQuestions(50);
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
        
        SoundFX.play('start');
        
        const container = document.querySelector('.speed-run-container');
        container.innerHTML = SpeedRun.renderGame();
        
        SpeedRun.showQuestion();
        SpeedRun.startTimer();
    },

    getQuestions: (count) => {
        let pool = [];
        
        if (SpeedRun.selectedTopic === 'all') {
            pool = [...QUESTIONS];
        } else {
            pool = QUESTIONS.filter(q => q.topic === SpeedRun.selectedTopic);
        }
        
        // Shuffle and pick
        return shuffleArray([...pool]).slice(0, count);
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
                            <span class="sr-combo-value" id="sr-combo">${SpeedRun.combo}x</span>
                            <span class="sr-combo-label">Combo</span>
                        </div>
                    </div>
                </div>
                
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
        SpeedRun.questionStartTime = Date.now();
        
        const questionArea = document.getElementById('sr-question-area');
        questionArea.innerHTML = `
            <div class="sr-question animate-in">
                <div class="sr-question-number">Question ${SpeedRun.currentIndex + 1}</div>
                <h3 class="sr-question-text">${question.question}</h3>
                <div class="sr-options">
                    ${question.options.map((opt, i) => `
                        <button class="sr-option" onclick="SpeedRun.answer(${i})">
                            <span class="sr-option-key">${String.fromCharCode(65 + i)}</span>
                            <span class="sr-option-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Update progress
        const progress = ((SpeedRun.currentIndex) / SpeedRun.questions.length) * 100;
        document.getElementById('sr-progress').style.width = progress + '%';
    },

    answer: (index) => {
        if (!SpeedRun.isPlaying) return;
        
        const question = SpeedRun.questions[SpeedRun.currentIndex];
        const isCorrect = index === question.answer;
        const answerTime = (Date.now() - SpeedRun.questionStartTime) / 1000;
        
        // Calculate points
        let points = 0;
        let bonusText = '';
        
        if (isCorrect) {
            SpeedRun.correctAnswers++;
            SpeedRun.combo++;
            SpeedRun.maxCombo = Math.max(SpeedRun.maxCombo, SpeedRun.combo);
            
            // Play sound
            if (SpeedRun.combo > 1) {
                SoundFX.play('combo');
            } else {
                SoundFX.play('correct');
            }
            
            if (answerTime < SpeedRun.fastestAnswer) {
                SpeedRun.fastestAnswer = answerTime;
            }
            
            // Base points
            points = 100;
            
            // Speed bonus (under 3 seconds = up to 50 bonus)
            if (answerTime < 3) {
                const speedBonus = Math.floor((3 - answerTime) * 25);
                points += speedBonus;
                bonusText += ` +${speedBonus} speed`;
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
        } else {
            SpeedRun.wrongAnswers++;
            SpeedRun.combo = 0;
            SoundFX.play('wrong');
            SpeedRun.showFeedback(false, 0, '', answerTime);
        }
        
        // Update displays
        document.getElementById('sr-score').textContent = SpeedRun.score;
        document.getElementById('sr-combo').textContent = SpeedRun.combo + 'x';
        
        const comboDisplay = document.getElementById('sr-combo-display');
        if (SpeedRun.combo > 0) {
            comboDisplay.classList.add('active');
            if (SpeedRun.combo >= 5) comboDisplay.classList.add('fire');
            if (SpeedRun.combo >= 10) comboDisplay.classList.add('legendary');
        } else {
            comboDisplay.classList.remove('active', 'fire', 'legendary');
        }
        
        // Next question after brief delay
        SpeedRun.currentIndex++;
        setTimeout(() => SpeedRun.showQuestion(), 400);
    },

    showFeedback: (correct, points, bonus, time) => {
        const feedback = document.createElement('div');
        feedback.className = `sr-feedback ${correct ? 'correct' : 'wrong'}`;
        feedback.innerHTML = correct 
            ? `<span class="sr-fb-icon">✓</span><span class="sr-fb-points">+${points}</span><span class="sr-fb-bonus">${bonus}</span><span class="sr-fb-time">${time.toFixed(1)}s</span>`
            : `<span class="sr-fb-icon">✗</span><span class="sr-fb-text">Combo Lost!</span>`;
        
        document.querySelector('.sr-game-view').appendChild(feedback);
        setTimeout(() => feedback.remove(), 800);
    },

    startTimer: () => {
        const circumference = 2 * Math.PI * 45;
        const circle = document.getElementById('sr-timer-circle');
        circle.style.strokeDasharray = circumference;
        
        SpeedRun.timer = setInterval(() => {
            SpeedRun.timeLeft--;
            
            document.getElementById('sr-timer-text').textContent = SpeedRun.timeLeft;
            
            // Update circle
            const progress = SpeedRun.timeLeft / 60;
            const offset = circumference * (1 - progress);
            circle.style.strokeDashoffset = offset;
            
            // Color changes
            if (SpeedRun.timeLeft <= 10) {
                circle.classList.add('danger');
            } else if (SpeedRun.timeLeft <= 20) {
                circle.classList.add('warning');
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
        SpeedRun.stopGame();
        
        const totalTime = (Date.now() - SpeedRun.startTime) / 1000;
        const accuracy = SpeedRun.correctAnswers / (SpeedRun.correctAnswers + SpeedRun.wrongAnswers) * 100 || 0;
        
        // Save score
        SpeedRun.saveScore();
        
        // Award XP
        const xpEarned = Math.floor(SpeedRun.score / 10);
        AppState.addXP(xpEarned);
        
        // Check achievements
        if (SpeedRun.maxCombo >= 10) {
            AppState.unlockAchievement('speed_demon');
        }
        if (SpeedRun.score >= 2000) {
            AppState.unlockAchievement('speed_master');
        }
        
        const container = document.querySelector('.speed-run-container');
        const isNewRecord = SpeedRun.isNewPersonalBest();
        
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
        const username = Auth.getCurrentUser()?.username || 'Guest';
        const leaderboard = JSON.parse(localStorage.getItem('csmaster_speedrun_lb') || '[]');
        
        leaderboard.push({
            username,
            score: SpeedRun.score,
            maxCombo: SpeedRun.maxCombo,
            correct: SpeedRun.correctAnswers,
            accuracy: SpeedRun.correctAnswers / (SpeedRun.correctAnswers + SpeedRun.wrongAnswers) * 100,
            date: new Date().toISOString()
        });
        
        // Sort by score and keep top 100
        leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem('csmaster_speedrun_lb', JSON.stringify(leaderboard.slice(0, 100)));
        
        // Update personal best
        const personalBest = SpeedRun.getPersonalBest();
        if (SpeedRun.score > (personalBest.score || 0)) {
            localStorage.setItem('csmaster_speedrun_pb_' + username, JSON.stringify({
                score: SpeedRun.score,
                maxCombo: SpeedRun.maxCombo,
                gamesPlayed: (personalBest.gamesPlayed || 0) + 1
            }));
        } else {
            localStorage.setItem('csmaster_speedrun_pb_' + username, JSON.stringify({
                ...personalBest,
                gamesPlayed: (personalBest.gamesPlayed || 0) + 1
            }));
        }
    },

    getLeaderboard: () => {
        return JSON.parse(localStorage.getItem('csmaster_speedrun_lb') || '[]');
    },

    getPersonalBest: () => {
        const username = Auth.getCurrentUser()?.username || 'Guest';
        return JSON.parse(localStorage.getItem('csmaster_speedrun_pb_' + username) || '{}');
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
        console.log('⚡ SpeedRun cleanup');
    }
};

// Keyboard shortcuts handler for Speed Run
SpeedRun.keyHandler = (e) => {
    if (!SpeedRun.isPlaying) return;
    
    const key = e.key.toUpperCase();
    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, '1': 0, '2': 1, '3': 2, '4': 3 };
    
    if (keyMap.hasOwnProperty(key)) {
        e.preventDefault();
        SpeedRun.answer(keyMap[key]);
    }
};
document.addEventListener('keydown', SpeedRun.keyHandler);
