/**
 * DailyChallenge.js - Daily Challenge & Streak System
 * Encourages daily study with bonus XP and streak tracking
 */

const DailyChallenge = {
    STORAGE_KEY: 'csmaster_daily',
    
    /**
     * Get today's date string
     */
    getToday: () => {
        return new Date().toISOString().split('T')[0];
    },

    /**
     * Get stored daily challenge data
     */
    getData: () => {
        try {
            return JSON.parse(localStorage.getItem(DailyChallenge.STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    },

    /**
     * Save daily challenge data
     */
    saveData: (data) => {
        localStorage.setItem(DailyChallenge.STORAGE_KEY, JSON.stringify(data));
    },

    /**
     * Get current streak
     */
    getStreak: () => {
        const data = DailyChallenge.getData();
        return data.streak || 0;
    },

    /**
     * Check if daily challenge is completed today
     */
    isCompletedToday: () => {
        const data = DailyChallenge.getData();
        return data.lastCompleted === DailyChallenge.getToday();
    },

    /**
     * Get today's challenge questions
     */
    getTodaysChallenge: () => {
        const data = DailyChallenge.getData();
        const today = DailyChallenge.getToday();
        
        // If we already have today's questions, return them
        if (data.challengeDate === today && data.challengeQuestions) {
            return data.challengeQuestions;
        }
        
        // Generate new challenge questions for today
        // Use date as seed for consistent questions throughout the day
        let seed = parseInt(today.split('-').join(''));
        const shuffled = [...QUESTIONS].sort(() => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x) - 0.5;
        });
        
        const questions = shuffled.slice(0, 5); // 5 questions per day
        
        // Save today's questions
        data.challengeDate = today;
        data.challengeQuestions = questions;
        DailyChallenge.saveData(data);
        
        return questions;
    },

    /**
     * Complete daily challenge
     */
    complete: (score, total) => {
        const data = DailyChallenge.getData();
        const today = DailyChallenge.getToday();
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        // Calculate streak
        if (data.lastCompleted === yesterday) {
            data.streak = (data.streak || 0) + 1;
        } else if (data.lastCompleted !== today) {
            data.streak = 1;
        }
        
        data.lastCompleted = today;
        data.lastScore = score;
        data.lastTotal = total;
        
        // Track best streak
        if (data.streak > (data.bestStreak || 0)) {
            data.bestStreak = data.streak;
        }
        
        // Track history
        if (!data.history) data.history = [];
        data.history.push({
            date: today,
            score,
            total,
            streak: data.streak
        });
        
        // Keep only last 30 days
        if (data.history.length > 30) {
            data.history = data.history.slice(-30);
        }
        
        DailyChallenge.saveData(data);
        
        // Calculate bonus XP
        const baseXP = score * 15; // Higher XP for daily challenge
        const streakBonus = Math.min(data.streak * 5, 50); // Up to 50 bonus XP
        const perfectBonus = score === total ? 25 : 0;
        const totalXP = baseXP + streakBonus + perfectBonus;
        
        return {
            streak: data.streak,
            bestStreak: data.bestStreak,
            baseXP,
            streakBonus,
            perfectBonus,
            totalXP
        };
    },

    /**
     * Get motivational message based on streak
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
        
        // Find the appropriate message
        const thresholds = Object.keys(messages).map(Number).sort((a, b) => b - a);
        for (const threshold of thresholds) {
            if (streak >= threshold) {
                return messages[threshold];
            }
        }
        return messages[0];
    },

    /**
     * Render daily challenge card for homepage
     */
    renderCard: () => {
        const data = DailyChallenge.getData();
        const completed = DailyChallenge.isCompletedToday();
        const streak = DailyChallenge.getStreak();
        const motivation = DailyChallenge.getMotivation();
        
        if (completed) {
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
                        Today's Score: ${data.lastScore}/${data.lastTotal}
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
                        <p>5 questions • Bonus XP • Build your streak</p>
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
    },

    /**
     * Start daily challenge
     */
    start: () => {
        const questions = DailyChallenge.getTodaysChallenge();
        DailyChallenge.currentIndex = 0;
        DailyChallenge.score = 0;
        DailyChallenge.answers = [];
        DailyChallenge.questions = questions;
        
        // Navigate to practice and show challenge
        Router.navigate('practice');
        setTimeout(() => {
            DailyChallenge.showChallenge();
        }, 100);
    },

    currentIndex: 0,
    score: 0,
    answers: [],
    questions: [],

    /**
     * Show challenge UI
     */
    showChallenge: () => {
        const content = document.getElementById('main-content');
        content.innerHTML = `
            <div class="daily-challenge-view">
                <div class="dc-game-header">
                    <div class="dc-game-title">
                        <span>🎯</span> Daily Challenge
                    </div>
                    <div class="dc-game-progress">
                        Question <span id="dc-current">1</span> of <span id="dc-total">5</span>
                    </div>
                </div>
                <div class="dc-progress-bar">
                    <div class="dc-progress-fill" id="dc-progress" style="width: 20%"></div>
                </div>
                <div class="dc-question-container" id="dc-question">
                    <!-- Question rendered here -->
                </div>
            </div>
        `;
        DailyChallenge.showQuestion();
    },

    /**
     * Show current question
     */
    showQuestion: () => {
        const q = DailyChallenge.questions[DailyChallenge.currentIndex];
        const topic = getTopicById(q.topic);
        const progress = ((DailyChallenge.currentIndex + 1) / 5) * 100;
        
        document.getElementById('dc-current').textContent = DailyChallenge.currentIndex + 1;
        document.getElementById('dc-progress').style.width = `${progress}%`;
        
        const shuffledOptions = q.options.map((opt, i) => ({ text: opt, originalIndex: i }));
        Helpers.shuffle(shuffledOptions);
        
        document.getElementById('dc-question').innerHTML = `
            <div class="dc-topic" style="color: ${topic?.color || '#888'}">
                ${topic?.icon || '📝'} ${topic?.name || 'General'}
            </div>
            <h3 class="dc-question-text">${q.question}</h3>
            <div class="dc-options">
                ${shuffledOptions.map((opt, i) => `
                    <button class="dc-option" onclick="DailyChallenge.selectAnswer(${opt.originalIndex}, this)">
                        <span class="dc-option-letter">${String.fromCharCode(65 + i)}</span>
                        <span class="dc-option-text">${opt.text}</span>
                    </button>
                `).join('')}
            </div>
        `;
    },

    /**
     * Handle answer selection
     */
    selectAnswer: (answerIndex, btn) => {
        const q = DailyChallenge.questions[DailyChallenge.currentIndex];
        const isCorrect = answerIndex === q.answer;
        
        // Disable all options
        document.querySelectorAll('.dc-option').forEach(opt => opt.disabled = true);
        
        // Show correct/incorrect
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        // Highlight correct answer
        if (!isCorrect) {
            const correctBtn = Array.from(document.querySelectorAll('.dc-option')).find(opt => 
                opt.querySelector('.dc-option-text').textContent === q.options[q.answer]
            );
            if (correctBtn) correctBtn.classList.add('correct');
        }
        
        if (isCorrect) DailyChallenge.score++;
        DailyChallenge.answers.push({ question: q, answer: answerIndex, correct: isCorrect });
        
        // Show explanation and next button
        document.getElementById('dc-question').innerHTML += `
            <div class="dc-explanation ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong></p>
                <p>${q.explanation}</p>
            </div>
            <button class="btn btn-primary dc-next" onclick="DailyChallenge.next()">
                ${DailyChallenge.currentIndex < 4 ? 'Next Question →' : 'See Results 🎉'}
            </button>
        `;
    },

    /**
     * Go to next question or results
     */
    next: () => {
        DailyChallenge.currentIndex++;
        if (DailyChallenge.currentIndex >= 5) {
            DailyChallenge.showResults();
        } else {
            DailyChallenge.showQuestion();
        }
    },

    /**
     * Show challenge results
     */
    showResults: () => {
        const result = DailyChallenge.complete(DailyChallenge.score, 5);
        
        // Award XP
        AppState.addXP(result.totalXP);
        
        // Check achievements
        if (result.streak >= 7) AppState.unlockAchievement('week_streak');
        if (result.streak >= 30) AppState.unlockAchievement('month_streak');
        if (DailyChallenge.score === 5) AppState.unlockAchievement('perfect_daily');
        
        const percentage = (DailyChallenge.score / 5) * 100;
        
        document.getElementById('dc-question').innerHTML = `
            <div class="dc-results">
                <h2>🎉 Challenge Complete!</h2>
                
                <div class="dc-results-score">
                    <div class="dc-score-circle">
                        <span class="score-value">${DailyChallenge.score}</span>
                        <span class="score-total">/5</span>
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
                
                <p class="dc-motivation-result">${DailyChallenge.getMotivation()}</p>
                
                <div class="dc-results-actions">
                    <button class="btn btn-secondary" onclick="Router.navigate('home')">
                        Back to Home
                    </button>
                    <button class="btn btn-primary" onclick="Router.navigate('practice')">
                        Practice More
                    </button>
                </div>
            </div>
        `;
    }
};

// Add streak achievements
if (typeof ACHIEVEMENTS !== 'undefined') {
    ACHIEVEMENTS.push(
        { id: 'week_streak', name: 'Week Warrior', icon: '📅', description: 'Maintain a 7-day streak' },
        { id: 'month_streak', name: 'Monthly Master', icon: '🗓️', description: 'Maintain a 30-day streak' },
        { id: 'perfect_daily', name: 'Daily Perfectionist', icon: '⭐', description: 'Get 100% on a daily challenge' }
    );
}
// v1792445355
