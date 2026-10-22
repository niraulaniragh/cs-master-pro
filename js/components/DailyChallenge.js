/**
 * DailyChallenge.js - Daily Challenge & Streak System
 * Encourages daily study with bonus XP and streak tracking
 */

const DailyChallenge = {
    STORAGE_KEY: 'csmaster_daily',
    QUESTIONS_PER_DAY: 5,

    // State
    currentIndex: 0,
    score: 0,
    answers: [],
    questions: [],

    /**
     * Get today's date string in ISO format (YYYY-MM-DD)
     * @returns {string} Today's date string
     */
    getToday: () => {
        try {
            return new Date().toISOString().split('T')[0];
        } catch (error) {
            console.error('DailyChallenge: Error getting today\'s date', error);
            return new Date().toDateString(); // Fallback
        }
    },

    /**
     * Get stored daily challenge data
     * @returns {Object} Challenge data object
     */
    getData: () => {
        try {
            const stored = localStorage.getItem(DailyChallenge.STORAGE_KEY);
            if (!stored) return {};
            const parsed = JSON.parse(stored);
            return typeof parsed === 'object' && parsed !== null ? parsed : {};
        } catch (error) {
            console.warn('DailyChallenge: Error loading data, resetting', error);
            return {};
        }
    },

    /**
     * Save daily challenge data
     * @param {Object} data - Data to save
     * @returns {boolean} True if saved successfully
     */
    saveData: (data) => {
        try {
            if (!data || typeof data !== 'object') {
                console.warn('DailyChallenge: Invalid data to save');
                return false;
            }
            localStorage.setItem(DailyChallenge.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('DailyChallenge: Error saving data', error);
            return false;
        }
    },

    /**
     * Get current streak count
     * @returns {number} Current streak
     */
    getStreak: () => {
        const data = DailyChallenge.getData();
        const streak = Number(data.streak);
        return isNaN(streak) || streak < 0 ? 0 : streak;
    },

    /**
     * Check if daily challenge is completed today
     * @returns {boolean} True if completed today
     */
    isCompletedToday: () => {
        const data = DailyChallenge.getData();
        return data.lastCompleted === DailyChallenge.getToday();
    },

    /**
     * Generate seeded random number for consistent daily questions
     * @param {number} seed - Seed value
     * @returns {Function} Random number generator
     */
    seededRandom: (seed) => {
        return () => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };
    },

    /**
     * Get today's challenge questions
     * @returns {Array} Array of question objects
     */
    getTodaysChallenge: () => {
        try {
            const data = DailyChallenge.getData();
            const today = DailyChallenge.getToday();

            // If we already have today's questions, return them
            if (data.challengeDate === today && Array.isArray(data.challengeQuestions) && data.challengeQuestions.length > 0) {
                return data.challengeQuestions;
            }

            // Check if QUESTIONS is available
            if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
                console.warn('DailyChallenge: QUESTIONS not available');
                return [];
            }

            // Generate new challenge questions for today
            // Use date as seed for consistent questions throughout the day
            const seed = parseInt(today.split('-').join('')) || Date.now();
            const random = DailyChallenge.seededRandom(seed);

            const shuffled = [...QUESTIONS].sort(() => random() - 0.5);
            const questions = shuffled.slice(0, DailyChallenge.QUESTIONS_PER_DAY);

            // Validate questions have required fields
            const validQuestions = questions.filter(q =>
                q && q.question && Array.isArray(q.options) && typeof q.answer === 'number'
            );

            if (validQuestions.length === 0) {
                console.warn('DailyChallenge: No valid questions found');
                return [];
            }

            // Save today's questions
            data.challengeDate = today;
            data.challengeQuestions = validQuestions;
            DailyChallenge.saveData(data);

            return validQuestions;

        } catch (error) {
            console.error('DailyChallenge: Error generating challenge', error);
            return [];
        }
    },

    /**
     * Complete daily challenge and calculate rewards
     * @param {number} score - Number of correct answers
     * @param {number} total - Total number of questions
     * @returns {Object} Result object with XP breakdown
     */
    complete: (score, total) => {
        try {
            const data = DailyChallenge.getData();
            const today = DailyChallenge.getToday();

            // Validate inputs
            const validScore = Math.max(0, Math.min(Number(score) || 0, total));
            const validTotal = Math.max(1, Number(total) || DailyChallenge.QUESTIONS_PER_DAY);

            // Calculate yesterday's date
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

            // Calculate streak
            if (data.lastCompleted === yesterday) {
                data.streak = (Number(data.streak) || 0) + 1;
            } else if (data.lastCompleted !== today) {
                data.streak = 1;
            }

            data.lastCompleted = today;
            data.lastScore = validScore;
            data.lastTotal = validTotal;

            // Track best streak
            const currentStreak = Number(data.streak) || 1;
            const bestStreak = Number(data.bestStreak) || 0;
            if (currentStreak > bestStreak) {
                data.bestStreak = currentStreak;
            }

            // Track history
            if (!Array.isArray(data.history)) {
                data.history = [];
            }
            data.history.push({
                date: today,
                score: validScore,
                total: validTotal,
                streak: currentStreak
            });

            // Keep only last 30 days
            if (data.history.length > 30) {
                data.history = data.history.slice(-30);
            }

            DailyChallenge.saveData(data);

            // Calculate bonus XP
            const baseXP = validScore * 15; // Higher XP for daily challenge
            const streakBonus = Math.min(currentStreak * 5, 50); // Up to 50 bonus XP
            const perfectBonus = validScore === validTotal ? 25 : 0;
            const totalXP = baseXP + streakBonus + perfectBonus;

            return {
                streak: currentStreak,
                bestStreak: data.bestStreak || currentStreak,
                baseXP,
                streakBonus,
                perfectBonus,
                totalXP
            };

        } catch (error) {
            console.error('DailyChallenge: Error completing challenge', error);
            return {
                streak: 1,
                bestStreak: 1,
                baseXP: 0,
                streakBonus: 0,
                perfectBonus: 0,
                totalXP: 0
            };
        }
    },

    /**
     * Get motivational message based on streak
     * @returns {string} Motivational message
     */
    getMotivation: () => {
        const streak = DailyChallenge.getStreak();
        const messages = {
            0: "Start your streak today! 🚀",
            1: "Great start! Keep it going! 🌟",
            2: "2 days strong! You're building a habit! 💪",
            3: "3 day streak! You're on fire! 🔥",
            5: "5 days! Halfway to double digits! ⭐",
            7: "A whole week! Incredible dedication! 🏆",
            14: "2 weeks! You're unstoppable! 🎯",
            30: "30 days! You're a legend! 👑"
        };

        const thresholds = Object.keys(messages).map(Number).sort((a, b) => b - a);
        for (const threshold of thresholds) {
            if (streak >= threshold) {
                return messages[threshold];
            }
        }
        return messages[0];
    },

    /**
     * Escape HTML for safe display
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml: (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Render daily challenge card for homepage
     * @returns {string} HTML string
     */
    renderCard: () => {
        try {
            const data = DailyChallenge.getData();
            const completed = DailyChallenge.isCompletedToday();
            const streak = DailyChallenge.getStreak();
            const motivation = DailyChallenge.escapeHtml(DailyChallenge.getMotivation());

            if (completed) {
                const lastScore = Number(data.lastScore) || 0;
                const lastTotal = Number(data.lastTotal) || DailyChallenge.QUESTIONS_PER_DAY;

                return `
                    <div class="daily-challenge-card completed">
                        <div class="dc-header">
                            <span class="dc-icon">✅</span>
                            <div class="dc-title">
                                <h3>Daily Challenge Complete!</h3>
                                <p>Come back tomorrow for a new challenge</p>
                            </div>
                        </div>
                        <div class="dc-streak">
                            <div class="streak-fire">🔥</div>
                            <div class="streak-count">${streak}</div>
                            <div class="streak-label">Day Streak</div>
                        </div>
                        <div class="dc-score">
                            Today's Score: ${lastScore}/${lastTotal}
                        </div>
                        <p class="dc-motivation">${motivation}</p>
                    </div>
                `;
            }

            return `
                <div class="daily-challenge-card">
                    <div class="dc-header">
                        <span class="dc-icon">🎯</span>
                        <div class="dc-title">
                            <h3>Daily Challenge</h3>
                            <p>${DailyChallenge.QUESTIONS_PER_DAY} questions • Bonus XP • Build your streak</p>
                        </div>
                    </div>
                    ${streak > 0 ? `
                        <div class="dc-streak">
                            <div class="streak-fire">🔥</div>
                            <div class="streak-count">${streak}</div>
                            <div class="streak-label">Day Streak</div>
                        </div>
                    ` : ''}
                    <p class="dc-motivation">${motivation}</p>
                    <button class="btn btn-primary btn-large dc-start" onclick="DailyChallenge.start()">
                        Start Today's Challenge 🚀
                    </button>
                </div>
            `;

        } catch (error) {
            console.error('DailyChallenge: Error rendering card', error);
            return '<div class="daily-challenge-card error">Unable to load daily challenge</div>';
        }
    },

    /**
     * Start daily challenge
     */
    start: () => {
        try {
            const questions = DailyChallenge.getTodaysChallenge();

            if (!questions || questions.length === 0) {
                if (typeof Toast !== 'undefined') {
                    Toast.show('Unable to load daily challenge questions', 'error');
                }
                return;
            }

            // Reset state
            DailyChallenge.currentIndex = 0;
            DailyChallenge.score = 0;
            DailyChallenge.answers = [];
            DailyChallenge.questions = questions;

            // Navigate to practice and show challenge
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate('practice');
            }

            setTimeout(() => {
                DailyChallenge.showChallenge();
            }, 100);

        } catch (error) {
            console.error('DailyChallenge: Error starting challenge', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Error starting daily challenge', 'error');
            }
        }
    },

    /**
     * Show challenge UI
     */
    showChallenge: () => {
        try {
            const content = document.getElementById('main-content');
            if (!content) {
                console.error('DailyChallenge: Main content element not found');
                return;
            }

            const total = DailyChallenge.questions.length || DailyChallenge.QUESTIONS_PER_DAY;

            content.innerHTML = `
                <div class="daily-challenge-view">
                    <div class="dc-game-header">
                        <div class="dc-game-title">
                            <span>🎯</span> Daily Challenge
                        </div>
                        <div class="dc-game-progress">
                            Question <span id="dc-current">1</span> of <span id="dc-total">${total}</span>
                        </div>
                    </div>
                    <div class="dc-progress-bar">
                        <div class="dc-progress-fill" id="dc-progress" style="width: ${100 / total}%"></div>
                    </div>
                    <div class="dc-question-container" id="dc-question">
                        <!-- Question rendered here -->
                    </div>
                </div>
            `;

            DailyChallenge.showQuestion();

        } catch (error) {
            console.error('DailyChallenge: Error showing challenge', error);
        }
    },

    /**
     * Show current question
     */
    showQuestion: () => {
        try {
            const q = DailyChallenge.questions[DailyChallenge.currentIndex];
            if (!q) {
                console.error('DailyChallenge: Question not found at index', DailyChallenge.currentIndex);
                return;
            }

            // Get topic info safely
            let topic = null;
            if (typeof getTopicById === 'function' && q.topic) {
                topic = getTopicById(q.topic);
            }

            const total = DailyChallenge.questions.length;
            const progress = ((DailyChallenge.currentIndex + 1) / total) * 100;

            // Update progress indicators
            const currentEl = document.getElementById('dc-current');
            const progressEl = document.getElementById('dc-progress');

            if (currentEl) currentEl.textContent = DailyChallenge.currentIndex + 1;
            if (progressEl) progressEl.style.width = `${progress}%`;

            // Shuffle options with tracking
            const shuffledOptions = (q.options || []).map((opt, i) => ({
                text: opt,
                originalIndex: i
            }));

            // Shuffle using Fisher-Yates
            for (let i = shuffledOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
            }

            const questionContainer = document.getElementById('dc-question');
            if (!questionContainer) return;

            questionContainer.innerHTML = `
                <div class="dc-topic" style="color: ${topic?.color || '#888'}">
                    ${topic?.icon || '📝'} ${DailyChallenge.escapeHtml(topic?.name || 'General')}
                </div>
                <h3 class="dc-question-text">${DailyChallenge.escapeHtml(q.question)}</h3>
                <div class="dc-options">
                    ${shuffledOptions.map((opt, i) => `
                        <button class="dc-option" data-original-index="${opt.originalIndex}">
                            <span class="dc-option-letter">${String.fromCharCode(65 + i)}</span>
                            <span class="dc-option-text">${DailyChallenge.escapeHtml(opt.text)}</span>
                        </button>
                    `).join('')}
                </div>
            `;

            // Attach click handlers (event delegation would be better for performance)
            const options = questionContainer.querySelectorAll('.dc-option');
            options.forEach(btn => {
                btn.addEventListener('click', function () {
                    const originalIndex = parseInt(this.dataset.originalIndex);
                    if (!isNaN(originalIndex)) {
                        DailyChallenge.selectAnswer(originalIndex, this);
                    }
                }, { once: true });
            });

        } catch (error) {
            console.error('DailyChallenge: Error showing question', error);
        }
    },

    /**
     * Handle answer selection
     * @param {number} answerIndex - Selected answer's original index
     * @param {HTMLElement} btn - Selected button element
     */
    selectAnswer: (answerIndex, btn) => {
        try {
            const q = DailyChallenge.questions[DailyChallenge.currentIndex];
            if (!q) return;

            const isCorrect = answerIndex === q.answer;

            // Disable all options
            const allOptions = document.querySelectorAll('.dc-option');
            allOptions.forEach(opt => {
                opt.disabled = true;
                opt.style.pointerEvents = 'none';
            });

            // Show correct/incorrect
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');

            // Highlight correct answer if wrong
            if (!isCorrect) {
                allOptions.forEach(opt => {
                    const originalIndex = parseInt(opt.dataset.originalIndex);
                    if (originalIndex === q.answer) {
                        opt.classList.add('correct');
                    }
                });
            }

            if (isCorrect) DailyChallenge.score++;

            DailyChallenge.answers.push({
                question: q,
                answer: answerIndex,
                correct: isCorrect
            });

            // Show explanation and next button
            const questionContainer = document.getElementById('dc-question');
            if (questionContainer) {
                const explanationHtml = `
                    <div class="dc-explanation ${isCorrect ? 'correct' : 'incorrect'}">
                        <p><strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong></p>
                        <p>${DailyChallenge.escapeHtml(q.explanation || '')}</p>
                    </div>
                    <button class="btn btn-primary dc-next" id="dc-next-btn">
                        ${DailyChallenge.currentIndex < DailyChallenge.questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
                    </button>
                `;
                questionContainer.insertAdjacentHTML('beforeend', explanationHtml);

                // Attach click handler for next button
                const nextBtn = document.getElementById('dc-next-btn');
                if (nextBtn) {
                    nextBtn.addEventListener('click', DailyChallenge.next, { once: true });
                }
            }

        } catch (error) {
            console.error('DailyChallenge: Error selecting answer', error);
        }
    },

    /**
     * Go to next question or results
     */
    next: () => {
        DailyChallenge.currentIndex++;
        if (DailyChallenge.currentIndex >= DailyChallenge.questions.length) {
            DailyChallenge.showResults();
        } else {
            DailyChallenge.showQuestion();
        }
    },

    /**
     * Show challenge results
     */
    showResults: () => {
        try {
            const total = DailyChallenge.questions.length || DailyChallenge.QUESTIONS_PER_DAY;
            const result = DailyChallenge.complete(DailyChallenge.score, total);

            // Award XP
            if (typeof AppState !== 'undefined' && AppState.addXP) {
                AppState.addXP(result.totalXP);
            }

            // Check achievements
            if (typeof AppState !== 'undefined' && AppState.unlockAchievement) {
                if (result.streak >= 7) AppState.unlockAchievement('week_streak');
                if (result.streak >= 30) AppState.unlockAchievement('month_streak');
                if (DailyChallenge.score === total) AppState.unlockAchievement('perfect_daily');
            }

            const percentage = Math.round((DailyChallenge.score / total) * 100);

            const questionContainer = document.getElementById('dc-question');
            if (!questionContainer) return;

            questionContainer.innerHTML = `
                <div class="dc-results">
                    <h2>🎉 Challenge Complete!</h2>
                    
                    <div class="dc-results-score">
                        <div class="dc-score-circle">
                            <span class="score-value">${DailyChallenge.score}</span>
                            <span class="score-total">/${total}</span>
                        </div>
                        <div class="dc-score-label">${percentage}%</div>
                    </div>
                    
                    <div class="dc-streak-result">
                        <div class="streak-fire-big">🔥</div>
                        <div class="streak-info">
                            <span class="streak-number">${result.streak}</span>
                            <span class="streak-text">Day Streak!</span>
                        </div>
                    </div>
                    
                    <div class="dc-xp-breakdown">
                        <div class="xp-row">
                            <span>Base XP (${DailyChallenge.score} correct × 15)</span>
                            <span>+${result.baseXP}</span>
                        </div>
                        <div class="xp-row streak-bonus">
                            <span>🔥 Streak Bonus (${result.streak} days)</span>
                            <span>+${result.streakBonus}</span>
                        </div>
                        ${result.perfectBonus ? `
                            <div class="xp-row perfect-bonus">
                                <span>💯 Perfect Bonus</span>
                                <span>+${result.perfectBonus}</span>
                            </div>
                        ` : ''}
                        <div class="xp-row total">
                            <span>Total XP Earned</span>
                            <span>+${result.totalXP}</span>
                        </div>
                    </div>
                    
                    <p class="dc-motivation-result">${DailyChallenge.escapeHtml(DailyChallenge.getMotivation())}</p>
                    
                    <div class="dc-results-actions">
                        <button class="btn btn-secondary" id="dc-home-btn">
                            Back to Home
                        </button>
                        <button class="btn btn-primary" id="dc-practice-btn">
                            Practice More
                        </button>
                    </div>
                </div>
            `;

            // Attach button handlers
            const homeBtn = document.getElementById('dc-home-btn');
            const practiceBtn = document.getElementById('dc-practice-btn');

            if (homeBtn) {
                homeBtn.addEventListener('click', () => {
                    if (typeof Router !== 'undefined' && Router.navigate) {
                        Router.navigate('home');
                    }
                });
            }

            if (practiceBtn) {
                practiceBtn.addEventListener('click', () => {
                    if (typeof Router !== 'undefined' && Router.navigate) {
                        Router.navigate('practice');
                    }
                });
            }

        } catch (error) {
            console.error('DailyChallenge: Error showing results', error);
        }
    },

    /**
     * Reset daily challenge state (for testing)
     */
    reset: () => {
        DailyChallenge.currentIndex = 0;
        DailyChallenge.score = 0;
        DailyChallenge.answers = [];
        DailyChallenge.questions = [];
    }
};

// Add streak achievements if ACHIEVEMENTS exists
if (typeof ACHIEVEMENTS !== 'undefined' && Array.isArray(ACHIEVEMENTS)) {
    const achievementsToAdd = [
        { id: 'week_streak', name: 'Week Warrior', icon: '📅', description: 'Maintain a 7-day streak' },
        { id: 'month_streak', name: 'Monthly Master', icon: '🗓️', description: 'Maintain a 30-day streak' },
        { id: 'perfect_daily', name: 'Daily Perfectionist', icon: '⭐', description: 'Get 100% on a daily challenge' }
    ];

    achievementsToAdd.forEach(achievement => {
        if (!ACHIEVEMENTS.some(a => a.id === achievement.id)) {
            ACHIEVEMENTS.push(achievement);
        }
    });
}
