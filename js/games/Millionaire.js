/**
 * Millionaire.js - Who Wants to Be a Millionaire Style Quiz
 * 15 questions of escalating difficulty
 * Features: Lifelines, dramatic reveals, XP milestones
 */

const Millionaire = {
    isPlaying: false,
    questions: [],
    currentQuestion: 0,
    currentPrize: 0,
    lifelines: { fiftyFifty: true, askAudience: true, phoneFriend: true },
    isAnswerLocked: false,
    selectedAnswer: null,
    eliminatedAnswers: [], // Track eliminated answers for 50:50

    // Prize ladder (XP instead of money)
    prizes: [
        100, 200, 300, 500, 1000,      // Level 1-5
        2000, 4000, 8000, 16000, 32000, // Level 6-10
        64000, 125000, 250000, 500000, 1000000 // Level 11-15
    ],
    
    // Safe havens
    safeHavens: [4, 9, 14], // Questions 5, 10, 15 (0-indexed: 4, 9, 14)

    open: () => {
        const modal = document.createElement('div');
        modal.className = 'game-modal millionaire-modal';
        modal.id = 'millionaire-modal';
        modal.innerHTML = Millionaire.renderMenu();
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    close: () => {
        const modal = document.getElementById('millionaire-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        Millionaire.cleanup();
    },

    renderMenu: () => {
        const stats = Millionaire.getStats();
        
        return `
            <div class="game-container millionaire-container">
                <button class="game-close-btn" onclick="Millionaire.close()">✕</button>
                
                <div class="game-header millionaire-header">
                    <div class="game-icon">💰</div>
                    <h2>Who Wants to Be a CS Master?</h2>
                    <p>Answer 15 questions to win 1,000,000 XP!</p>
                </div>
                
                <div class="mill-menu">
                    <div class="mill-stats-row">
                        <div class="mill-stat">
                            <span class="mill-stat-value">${stats.gamesPlayed || 0}</span>
                            <span class="mill-stat-label">Games Played</span>
                        </div>
                        <div class="mill-stat">
                            <span class="mill-stat-value">${stats.bestLevel || 0}</span>
                            <span class="mill-stat-label">Best Level</span>
                        </div>
                        <div class="mill-stat">
                            <span class="mill-stat-value">${(stats.totalXP || 0).toLocaleString()}</span>
                            <span class="mill-stat-label">Total XP Won</span>
                        </div>
                    </div>
                    
                    <div class="mill-rules">
                        <h4>📜 Rules</h4>
                        <ul>
                            <li>Answer 15 questions of increasing difficulty</li>
                            <li>Questions 5, 10, and 15 are <strong>safe havens</strong></li>
                            <li>Wrong answer = Game over (keep safe haven XP)</li>
                            <li>You can walk away at any time with your current XP</li>
                        </ul>
                    </div>
                    
                    <div class="mill-lifelines-preview">
                        <h4>🆘 Lifelines</h4>
                        <div class="mill-lifeline-icons">
                            <div class="mill-ll-icon">
                                <span>50:50</span>
                                <small>Remove 2 wrong answers</small>
                            </div>
                            <div class="mill-ll-icon">
                                <span>👥</span>
                                <small>Ask the Audience</small>
                            </div>
                            <div class="mill-ll-icon">
                                <span>📞</span>
                                <small>Phone a Friend</small>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large mill-start-btn" onclick="Millionaire.startGame()">
                        <span class="btn-icon">🎮</span>
                        Let's Play!
                    </button>
                </div>
            </div>
        `;
    },

    startGame: () => {
        try {
            // Validate QUESTIONS exists
            if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS) || QUESTIONS.length < 15) {
                if (typeof Toast !== 'undefined' && Toast?.show) {
                    Toast.show('Not enough questions available (need at least 15)', 'error');
                }
                return;
            }
            
            // Validate shuffleArray exists
            if (typeof shuffleArray !== 'function') {
                console.error('shuffleArray function not found');
                return;
            }
            
            // Get questions sorted by difficulty
            const allQuestions = shuffleArray([...QUESTIONS]);
            
            // Try to pick questions of increasing difficulty
            // For now, just shuffle and pick 15
            Millionaire.questions = allQuestions.slice(0, 15);
            
            if (Millionaire.questions.length < 15) {
                if (typeof Toast !== 'undefined' && Toast?.show) {
                    Toast.show('Not enough questions available', 'error');
                }
                return;
            }
            
            Millionaire.currentQuestion = 0;
            Millionaire.currentPrize = 0;
            Millionaire.lifelines = { fiftyFifty: true, askAudience: true, phoneFriend: true };
            Millionaire.isPlaying = true;
            Millionaire.isAnswerLocked = false;
            Millionaire.selectedAnswer = null;
            Millionaire.eliminatedAnswers = [];
            
            const container = document.querySelector('.millionaire-container');
            if (!container) {
                console.error('Millionaire container not found');
                return;
            }
            container.innerHTML = Millionaire.renderGame();
            
            Millionaire.showQuestion();
        } catch (error) {
            console.error('Millionaire.startGame error:', error);
            if (typeof Toast !== 'undefined' && Toast?.show) {
                Toast.show('Failed to start game', 'error');
            }
        }
    },

    renderGame: () => {
        return `
            <div class="mill-game-view">
                <div class="mill-top-bar">
                    <button class="mill-walk-away" onclick="Millionaire.walkAway()">
                        🚶 Walk Away
                    </button>
                    <div class="mill-current-prize" id="mill-current-prize">
                        ${Millionaire.currentPrize.toLocaleString()} XP
                    </div>
                </div>
                
                <div class="mill-main-area">
                    <div class="mill-question-panel" id="mill-question-panel">
                        <!-- Question loads here -->
                    </div>
                    
                    <div class="mill-answers" id="mill-answers">
                        <!-- Answers load here -->
                    </div>
                </div>
                
                <div class="mill-bottom-bar">
                    <div class="mill-lifelines" id="mill-lifelines">
                        <button class="mill-lifeline ${Millionaire.lifelines.fiftyFifty ? '' : 'used'}" 
                                onclick="Millionaire.useFiftyFifty()" id="ll-fifty">
                            50:50
                        </button>
                        <button class="mill-lifeline ${Millionaire.lifelines.askAudience ? '' : 'used'}" 
                                onclick="Millionaire.useAskAudience()" id="ll-audience">
                            👥 Audience
                        </button>
                        <button class="mill-lifeline ${Millionaire.lifelines.phoneFriend ? '' : 'used'}" 
                                onclick="Millionaire.usePhoneFriend()" id="ll-phone">
                            📞 Friend
                        </button>
                    </div>
                    
                    <div class="mill-prize-ladder" id="mill-prize-ladder">
                        ${Millionaire.prizes.map((prize, i) => {
                            const isSafe = Millionaire.safeHavens.includes(i);
                            return `
                                <div class="mill-prize-row ${i === Millionaire.currentQuestion ? 'current' : ''} ${isSafe ? 'safe' : ''}" 
                                     data-level="${i}">
                                    <span class="mill-pr-num">${i + 1}</span>
                                    <span class="mill-pr-amount">${prize.toLocaleString()} XP</span>
                                </div>
                            `;
                        }).reverse().join('')}
                    </div>
                </div>
            </div>
        `;
    },

    escapeHtml: (text) => {
        if (typeof Helpers !== 'undefined' && Helpers?.escapeHtml) {
            return Helpers.escapeHtml(text);
        }
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    showQuestion: () => {
        if (!Millionaire.isPlaying || Millionaire.currentQuestion >= Millionaire.questions.length) {
            Millionaire.winGame();
            return;
        }
        
        const question = Millionaire.questions[Millionaire.currentQuestion];
        if (!question || !question.options || !Array.isArray(question.options)) {
            console.error('Invalid question at index', Millionaire.currentQuestion);
            return;
        }
        
        Millionaire.selectedAnswer = null;
        Millionaire.isAnswerLocked = false;
        Millionaire.eliminatedAnswers = [];
        
        // Update prize ladder
        document.querySelectorAll('.mill-prize-row').forEach((row, i) => {
            row.classList.remove('current');
            if (14 - i === Millionaire.currentQuestion) {
                row.classList.add('current');
            }
        });
        
        // Show question with animation
        const questionPanel = document.getElementById('mill-question-panel');
        if (questionPanel) {
            questionPanel.innerHTML = `
                <div class="mill-question-number">Question ${Millionaire.currentQuestion + 1} of 15</div>
                <div class="mill-question-text animate-in">${Millionaire.escapeHtml(question.question)}</div>
            `;
        }
        
        // Show answers
        const answersPanel = document.getElementById('mill-answers');
        if (answersPanel) {
            const letters = ['A', 'B', 'C', 'D'];
            answersPanel.innerHTML = question.options.map((opt, i) => `
                <button class="mill-answer animate-in" data-index="${i}" onclick="Millionaire.selectAnswer(${i})" style="animation-delay: ${i * 0.1}s">
                    <span class="mill-answer-letter">${letters[i]}:</span>
                    <span class="mill-answer-text">${Millionaire.escapeHtml(opt)}</span>
                </button>
            `).join('');
        }
    },

    selectAnswer: (index) => {
        if (Millionaire.isAnswerLocked) return;
        if (Millionaire.eliminatedAnswers.includes(index)) return; // Can't select eliminated answers
        
        Millionaire.selectedAnswer = index;
        
        // Highlight selected
        document.querySelectorAll('.mill-answer').forEach(btn => {
            btn.classList.remove('selected');
        });
        const selectedBtn = document.querySelector(`.mill-answer[data-index="${index}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
        
        // Show confirmation
        Millionaire.showConfirmation();
    },

    showConfirmation: () => {
        // Remove any existing confirm box
        document.querySelector('.mill-confirm-box')?.remove();
        
        const confirmBox = document.createElement('div');
        confirmBox.className = 'mill-confirm-box';
        confirmBox.innerHTML = `
            <p>Final answer?</p>
            <div class="mill-confirm-buttons">
                <button class="btn btn-primary" onclick="Millionaire.lockAnswer()">Yes, Final Answer</button>
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">Change Answer</button>
            </div>
        `;
        
        const mainArea = document.querySelector('.mill-main-area');
        if (mainArea) {
            mainArea.appendChild(confirmBox);
        }
    },

    lockAnswer: () => {
        document.querySelector('.mill-confirm-box')?.remove();
        
        if (Millionaire.selectedAnswer === null) return;
        
        Millionaire.isAnswerLocked = true;
        
        const question = Millionaire.questions[Millionaire.currentQuestion];
        if (!question) return;
        
        const isCorrect = Millionaire.selectedAnswer === question.answer;
        
        // Dramatic pause and reveal
        const selectedBtn = document.querySelector(`.mill-answer[data-index="${Millionaire.selectedAnswer}"]`);
        if (!selectedBtn) {
            console.error('Selected button not found');
            return;
        }
        selectedBtn.classList.add('thinking');
        
        setTimeout(() => {
            selectedBtn.classList.remove('thinking');
            
            // Show correct answer
            const correctBtn = document.querySelector(`.mill-answer[data-index="${question.answer}"]`);
            if (correctBtn) {
                correctBtn.classList.add('correct');
            }
            
            if (!isCorrect) {
                selectedBtn.classList.add('wrong');
            }
            
            setTimeout(() => {
                if (isCorrect) {
                    Millionaire.correctAnswer();
                } else {
                    Millionaire.wrongAnswer();
                }
            }, 1500);
        }, 2000);
    },

    correctAnswer: () => {
        Millionaire.currentPrize = Millionaire.prizes[Millionaire.currentQuestion];
        const prizeEl = document.getElementById('mill-current-prize');
        if (prizeEl) {
            prizeEl.textContent = Millionaire.currentPrize.toLocaleString() + ' XP';
        }
        
        // Update ladder
        const prizeRow = document.querySelector(`.mill-prize-row[data-level="${Millionaire.currentQuestion}"]`);
        if (prizeRow) {
            prizeRow.classList.add('won');
        }
        
        if (typeof Toast !== 'undefined' && Toast?.show) {
            Toast.show(`🎉 Correct! You've won ${Millionaire.currentPrize.toLocaleString()} XP!`, 'success');
        }
        
        Millionaire.currentQuestion++;
        
        setTimeout(() => Millionaire.showQuestion(), 2000);
    },

    wrongAnswer: () => {
        Millionaire.isPlaying = false;
        
        // Calculate winnings (drop to last safe haven)
        let finalPrize = 0;
        for (let i = Millionaire.currentQuestion - 1; i >= 0; i--) {
            if (Millionaire.safeHavens.includes(i)) {
                finalPrize = Millionaire.prizes[i];
                break;
            }
        }
        
        Millionaire.endGame(false, finalPrize);
    },

    walkAway: () => {
        if (!confirm('Are you sure you want to walk away with ' + Millionaire.currentPrize.toLocaleString() + ' XP?')) {
            return;
        }
        
        Millionaire.isPlaying = false;
        Millionaire.endGame(true, Millionaire.currentPrize);
    },

    winGame: () => {
        Millionaire.isPlaying = false;
        Millionaire.currentPrize = Millionaire.prizes[14]; // 1,000,000
        Millionaire.endGame(true, Millionaire.currentPrize, true);
    },

    useFiftyFifty: () => {
        if (!Millionaire.lifelines.fiftyFifty || Millionaire.isAnswerLocked) return;
        
        const question = Millionaire.questions[Millionaire.currentQuestion];
        if (!question || typeof question.answer !== 'number') return;
        
        Millionaire.lifelines.fiftyFifty = false;
        const fiftyBtn = document.getElementById('ll-fifty');
        if (fiftyBtn) fiftyBtn.classList.add('used');
        
        const wrongAnswers = [0, 1, 2, 3].filter(i => i !== question.answer);
        
        if (typeof shuffleArray !== 'function') {
            console.error('shuffleArray not available');
            return;
        }
        
        const toRemove = shuffleArray(wrongAnswers).slice(0, 2);
        Millionaire.eliminatedAnswers = toRemove;
        
        toRemove.forEach(index => {
            const btn = document.querySelector(`.mill-answer[data-index="${index}"]`);
            if (btn) {
                btn.classList.add('eliminated');
                btn.disabled = true;
            }
        });
        
        // Clear selection if eliminated answer was selected
        if (Millionaire.selectedAnswer !== null && toRemove.includes(Millionaire.selectedAnswer)) {
            Millionaire.selectedAnswer = null;
            document.querySelectorAll('.mill-answer').forEach(btn => btn.classList.remove('selected'));
            document.querySelector('.mill-confirm-box')?.remove();
        }
        
        if (typeof Toast !== 'undefined' && Toast?.show) {
            Toast.show('50:50 used! Two wrong answers removed.', 'info');
        }
    },

    useAskAudience: () => {
        if (!Millionaire.lifelines.askAudience || Millionaire.isAnswerLocked) return;
        
        const question = Millionaire.questions[Millionaire.currentQuestion];
        if (!question || typeof question.answer !== 'number') return;
        
        Millionaire.lifelines.askAudience = false;
        const audienceBtn = document.getElementById('ll-audience');
        if (audienceBtn) audienceBtn.classList.add('used');
        
        // Generate audience percentages (correct answer gets highest)
        const correctPercent = 40 + Math.floor(Math.random() * 30); // 40-70%
        let remaining = 100 - correctPercent;
        
        // Distribute remaining among other answers
        const percentages = [0, 0, 0, 0];
        percentages[question.answer] = correctPercent;
        
        const otherIndices = [0, 1, 2, 3].filter(i => i !== question.answer);
        otherIndices.forEach((idx, i) => {
            if (i === otherIndices.length - 1) {
                percentages[idx] = remaining; // Last one gets remainder
            } else {
                const share = Math.floor(Math.random() * (remaining / 2));
                percentages[idx] = share;
                remaining -= share;
            }
        });
        
        // Show results
        const resultsHtml = `
            <div class="mill-audience-results">
                <h4>👥 Audience Results</h4>
                <div class="audience-bars">
                    ${['A', 'B', 'C', 'D'].map((letter, i) => `
                        <div class="audience-bar">
                            <div class="ab-fill" style="height: ${percentages[i]}%"></div>
                            <span class="ab-percent">${percentages[i]}%</span>
                            <span class="ab-letter">${letter}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-secondary" onclick="this.parentElement.remove()">Close</button>
            </div>
        `;
        
        // Remove existing audience results
        document.querySelector('.mill-audience-results')?.remove();
        
        const resultsDiv = document.createElement('div');
        resultsDiv.innerHTML = resultsHtml;
        const mainArea = document.querySelector('.mill-main-area');
        if (mainArea && resultsDiv.firstElementChild) {
            mainArea.appendChild(resultsDiv.firstElementChild);
        }
    },

    usePhoneFriend: () => {
        if (!Millionaire.lifelines.phoneFriend || Millionaire.isAnswerLocked) return;
        
        const question = Millionaire.questions[Millionaire.currentQuestion];
        if (!question || !question.options || typeof question.answer !== 'number') return;
        
        Millionaire.lifelines.phoneFriend = false;
        const phoneBtn = document.getElementById('ll-phone');
        if (phoneBtn) phoneBtn.classList.add('used');
        
        const letters = ['A', 'B', 'C', 'D'];
        
        // Friend is 80% likely to give correct answer
        const isCorrect = Math.random() < 0.8;
        const correctIndex = question.answer;
        const wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIndex && i < question.options.length);
        
        let suggestedIndex;
        if (wrongIndices.length === 0 || isCorrect) {
            suggestedIndex = correctIndex;
        } else {
            suggestedIndex = shuffleArray(wrongIndices)[0];
        }
        
        const confidence = isCorrect ? (70 + Math.floor(Math.random() * 25)) : (30 + Math.floor(Math.random() * 40));
        
        const friendNames = ['Alex', 'Sam', 'Jordan', 'Casey', 'Morgan'];
        const friendName = shuffleArray(friendNames)[0];
        
        // Get the actual answer text with bounds checking
        const suggestedLetter = letters[suggestedIndex] || 'A';
        const suggestedText = question.options[suggestedIndex] || 'that option';
        
        // Remove existing phone dialog
        document.querySelector('.mill-phone-dialog')?.remove();
        
        const dialogHtml = `
            <div class="mill-phone-dialog">
                <h4>📞 Calling ${Millionaire.escapeHtml(friendName)}...</h4>
                <p class="phone-message">
                    "Hmm, I think it's <strong>${suggestedLetter}: ${Millionaire.escapeHtml(suggestedText)}</strong>. 
                    I'm about ${confidence}% sure about that."
                </p>
                <button class="btn btn-secondary" onclick="this.parentElement.remove()">Thanks!</button>
            </div>
        `;
        
        const dialogDiv = document.createElement('div');
        dialogDiv.innerHTML = dialogHtml;
        const mainArea = document.querySelector('.mill-main-area');
        if (mainArea && dialogDiv.firstElementChild) {
            mainArea.appendChild(dialogDiv.firstElementChild);
        }
    },

    endGame: (walkedAway, prize, isMillionaire = false) => {
        const safePrize = prize || 0;
        
        // Save stats
        Millionaire.saveStats(Millionaire.currentQuestion, safePrize, isMillionaire);
        
        // Award XP (prize is already XP, so use directly or scale as needed)
        const xpEarned = Math.floor(safePrize / 10); // 10% of prize as actual XP reward
        if (xpEarned > 0 && typeof AppState !== 'undefined' && AppState?.addXP) {
            AppState.addXP(xpEarned);
        }
        
        // Achievements
        if (typeof AppState !== 'undefined' && AppState?.unlockAchievement) {
            if (isMillionaire) AppState.unlockAchievement('millionaire');
            if (Millionaire.currentQuestion >= 10) AppState.unlockAchievement('quiz_master');
        }
        
        const container = document.querySelector('.millionaire-container');
        if (!container) {
            console.error('Millionaire container not found');
            Millionaire.close();
            return;
        }
        
        const questionReached = walkedAway || isMillionaire 
            ? Millionaire.currentQuestion 
            : Millionaire.currentQuestion + 1;
        
        container.innerHTML = `
            <button class="game-close-btn" onclick="Millionaire.close()">✕</button>
            
            <div class="mill-results">
                <div class="mill-result-banner ${isMillionaire ? 'millionaire' : walkedAway ? 'walked' : 'lost'}">
                    ${isMillionaire ? '🎉 YOU\'RE A CS MILLIONAIRE! 🎉' : walkedAway ? '🚶 You walked away!' : '💔 Game Over'}
                </div>
                
                <div class="mill-final-prize">
                    <span class="mill-fp-value">${safePrize.toLocaleString()}</span>
                    <span class="mill-fp-label">XP Won</span>
                </div>
                
                <div class="mill-result-info">
                    <p>You reached question ${questionReached} of 15</p>
                    <p>+${xpEarned.toLocaleString()} XP added to your account</p>
                </div>
                
                <div class="mill-results-actions">
                    <button class="btn btn-primary" onclick="Millionaire.startGame()">
                        🔄 Play Again
                    </button>
                    <button class="btn btn-secondary" onclick="Millionaire.close()">
                        Done
                    </button>
                </div>
            </div>
        `;
    },

    saveStats: (level, prize, isMillionaire) => {
        try {
            const stats = Millionaire.getStats();
            const safePrize = prize || 0;
            
            stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;
            stats.bestLevel = Math.max(stats.bestLevel || 0, level);
            stats.totalXP = (stats.totalXP || 0) + safePrize;
            if (isMillionaire) stats.millionaireWins = (stats.millionaireWins || 0) + 1;
            
            localStorage.setItem('csmaster_millionaire_stats', JSON.stringify(stats));
        } catch (e) {
            console.error('Failed to save Millionaire stats:', e);
        }
    },

    getStats: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_millionaire_stats') || '{}');
        } catch (e) {
            console.error('Failed to load Millionaire stats:', e);
            return {};
        }
    },

    cleanup: () => {
        // Stop game
        Millionaire.isPlaying = false;
        Millionaire.isAnswerLocked = false;
        Millionaire.selectedAnswer = null;
        Millionaire.questions = [];
        Millionaire.eliminatedAnswers = [];
        console.log('💰 Millionaire cleanup');
    }
};
