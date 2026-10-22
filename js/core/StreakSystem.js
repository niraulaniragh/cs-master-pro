/**
 * StreakSystem.js - Enhanced Daily Streak & Goals System
 * Features: Daily goals, streak counter, rewards, streak freeze
 */

const StreakSystem = {
    STORAGE_KEY: 'csmaster_streaks',
    
    // Default daily goals
    defaultGoals: {
        questionsToAnswer: 10,
        correctAnswersNeeded: 7,
        studyMinutes: 15,
        flashcardsToReview: 5
    },
    
    // Streak rewards configuration
    rewards: [
        { days: 3, xp: 50, badge: '🔥', title: '3-Day Streak', description: 'On fire!' },
        { days: 7, xp: 150, badge: '⭐', title: 'Week Warrior', description: 'A full week of studying!' },
        { days: 14, xp: 300, badge: '💎', title: 'Two Week Champion', description: 'Unstoppable!' },
        { days: 30, xp: 500, badge: '👑', title: 'Monthly Master', description: 'Legendary dedication!' },
        { days: 50, xp: 750, badge: '🏆', title: 'Half Century', description: '50 days strong!' },
        { days: 100, xp: 1500, badge: '🌟', title: 'Century Legend', description: '100 days of excellence!' }
    ],
    
    /**
     * Get streak data from storage with error handling
     */
    getData: () => {
        try {
            const data = localStorage.getItem(StreakSystem.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                if (parsed && typeof parsed === 'object') {
                    // Merge with defaults to ensure all fields exist
                    return StreakSystem.mergeWithDefaults(parsed);
                }
            }
        } catch (e) {
            console.error('Error loading streak data:', e);
        }
        return StreakSystem.getDefaultData();
    },
    
    /**
     * Merge saved data with defaults to ensure structure is complete
     */
    mergeWithDefaults: (saved) => {
        const defaults = StreakSystem.getDefaultData();
        return {
            currentStreak: saved.currentStreak ?? defaults.currentStreak,
            longestStreak: saved.longestStreak ?? defaults.longestStreak,
            lastActiveDate: saved.lastActiveDate ?? defaults.lastActiveDate,
            streakFreezes: saved.streakFreezes ?? defaults.streakFreezes,
            totalDaysActive: saved.totalDaysActive ?? defaults.totalDaysActive,
            dailyGoals: { ...defaults.dailyGoals, ...(saved.dailyGoals || {}) },
            todayProgress: {
                ...defaults.todayProgress,
                ...(saved.todayProgress || {})
            },
            history: Array.isArray(saved.history) ? saved.history : defaults.history,
            unlockedRewards: Array.isArray(saved.unlockedRewards) ? saved.unlockedRewards : defaults.unlockedRewards,
            weeklyXPBonus: saved.weeklyXPBonus ?? defaults.weeklyXPBonus
        };
    },
    
    /**
     * Default data structure
     */
    getDefaultData: () => ({
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        streakFreezes: 2,
        totalDaysActive: 0,
        dailyGoals: { ...StreakSystem.defaultGoals },
        todayProgress: {
            date: new Date().toDateString(),
            questionsAnswered: 0,
            correctAnswers: 0,
            studyMinutes: 0,
            flashcardsReviewed: 0,
            completed: false
        },
        history: [],
        unlockedRewards: [],
        weeklyXPBonus: 0
    }),
    
    /**
     * Save streak data with error handling
     */
    saveData: (data) => {
        if (!data || typeof data !== 'object') {
            console.error('Invalid streak data');
            return false;
        }
        
        try {
            localStorage.setItem(StreakSystem.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving streak data:', e);
            return false;
        }
    },
    
    /**
     * Initialize/check streak on app load
     */
    init: () => {
        try {
            const data = StreakSystem.getData();
            const today = new Date().toDateString();
            const lastActive = data.lastActiveDate;
            
            // Check if it's a new day
            if (data.todayProgress.date !== today) {
                // Reset today's progress
                data.todayProgress = {
                    date: today,
                    questionsAnswered: 0,
                    correctAnswers: 0,
                    studyMinutes: 0,
                    flashcardsReviewed: 0,
                    completed: false
                };
                
                // Check streak status
                if (lastActive) {
                    try {
                        const lastDate = new Date(lastActive);
                        const todayDate = new Date(today);
                        const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
                        
                        if (daysDiff === 1) {
                            // Consecutive day - streak continues (will be incremented when goal completed)
                        } else if (daysDiff === 2 && data.streakFreezes > 0) {
                            // Missed one day but have freeze
                            data.streakFreezes = Math.max(0, data.streakFreezes - 1);
                            if (typeof Toast !== 'undefined' && typeof Toast.show === 'function') {
                                Toast.show('🧊 Streak Freeze used! You still have ' + data.streakFreezes + ' left.', 'info');
                            }
                        } else if (daysDiff > 1) {
                            // Streak broken
                            if (data.currentStreak > 0) {
                                if (typeof Toast !== 'undefined' && typeof Toast.show === 'function') {
                                    Toast.show(`😢 Streak lost! You had a ${data.currentStreak} day streak.`, 'warning');
                                }
                            }
                            data.currentStreak = 0;
                        }
                    } catch (dateError) {
                        console.error('Error parsing dates:', dateError);
                    }
                }
                
                StreakSystem.saveData(data);
            }
            
            return data;
        } catch (error) {
            console.error('Error initializing streak system:', error);
            return StreakSystem.getDefaultData();
        }
    },
    
    /**
     * Record activity
     */
    recordActivity: (type, amount = 1) => {
        if (!type || typeof type !== 'string') {
            console.warn('Invalid activity type');
            return { completed: false, progress: null };
        }
        
        amount = typeof amount === 'number' && !isNaN(amount) ? Math.max(0, Math.floor(amount)) : 1;
        
        try {
            const data = StreakSystem.getData();
            const today = new Date().toDateString();
            
            // Ensure we're tracking today
            if (data.todayProgress.date !== today) {
                StreakSystem.init();
                return StreakSystem.recordActivity(type, amount);
            }
            
            // Update progress based on type
            switch (type) {
                case 'question':
                    data.todayProgress.questionsAnswered = (data.todayProgress.questionsAnswered || 0) + amount;
                    break;
                case 'correct':
                    data.todayProgress.correctAnswers = (data.todayProgress.correctAnswers || 0) + amount;
                    break;
                case 'studyTime':
                    data.todayProgress.studyMinutes = (data.todayProgress.studyMinutes || 0) + amount;
                    break;
                case 'flashcard':
                    data.todayProgress.flashcardsReviewed = (data.todayProgress.flashcardsReviewed || 0) + amount;
                    break;
                default:
                    console.warn('Unknown activity type:', type);
            }
            
            // Check if daily goal completed
            if (!data.todayProgress.completed) {
                const goals = data.dailyGoals || StreakSystem.defaultGoals;
                const prog = data.todayProgress;
                
                const questionsGoalMet = (prog.questionsAnswered || 0) >= (goals.questionsToAnswer || 10);
                const correctGoalMet = (prog.correctAnswers || 0) >= (goals.correctAnswersNeeded || 7);
                
                if (questionsGoalMet && correctGoalMet) {
                    // Daily goal completed!
                    data.todayProgress.completed = true;
                    data.lastActiveDate = today;
                    data.currentStreak = (data.currentStreak || 0) + 1;
                    data.totalDaysActive = (data.totalDaysActive || 0) + 1;
                    
                    if (data.currentStreak > (data.longestStreak || 0)) {
                        data.longestStreak = data.currentStreak;
                    }
                    
                    // Add to history
                    if (!Array.isArray(data.history)) {
                        data.history = [];
                    }
                    data.history.push({
                        date: today,
                        streak: data.currentStreak,
                        questions: prog.questionsAnswered,
                        correct: prog.correctAnswers
                    });
                    
                    // Keep only last 30 days
                    if (data.history.length > 30) {
                        data.history = data.history.slice(-30);
                    }
                    
                    // Calculate streak bonus XP (capped at 50)
                    const bonusXP = Math.min((data.currentStreak || 1) * 5, 50);
                    
                    // Check for milestone rewards
                    const newReward = StreakSystem.checkMilestoneReward(data);
                    
                    StreakSystem.saveData(data);
                    
                    // Show celebration after a short delay
                    setTimeout(() => {
                        StreakSystem.showStreakCelebration(data.currentStreak, bonusXP, newReward);
                    }, 500);
                    
                    // Award XP
                    if (typeof AppState !== 'undefined' && typeof AppState.addXP === 'function') {
                        AppState.addXP(bonusXP);
                    }
                    
                    return { completed: true, streak: data.currentStreak, bonusXP, newReward };
                }
            }
            
            StreakSystem.saveData(data);
            return { completed: false, progress: data.todayProgress };
        } catch (error) {
            console.error('Error recording activity:', error);
            return { completed: false, progress: null };
        }
    },
    
    /**
     * Check if user unlocked a new milestone reward
     */
    checkMilestoneReward: (data) => {
        if (!data || !Array.isArray(data.unlockedRewards)) {
            return null;
        }
        
        const currentStreak = data.currentStreak || 0;
        
        for (const reward of StreakSystem.rewards) {
            if (currentStreak >= reward.days && !data.unlockedRewards.includes(reward.days)) {
                data.unlockedRewards.push(reward.days);
                return reward;
            }
        }
        return null;
    },
    
    /**
     * Show streak celebration modal
     */
    showStreakCelebration: (streak, bonusXP, newReward) => {
        try {
            const rewardHTML = newReward ? `
                <div class="streak-reward-unlock">
                    <span class="reward-badge">${newReward.badge || '🎉'}</span>
                    <h4>${StreakSystem.escapeHtml(newReward.title || 'Reward')}</h4>
                    <p>${StreakSystem.escapeHtml(newReward.description || '')}</p>
                    <span class="reward-xp">+${newReward.xp || 0} Bonus XP!</span>
                </div>
            ` : '';
            
            if (typeof Modal !== 'undefined' && typeof Modal.show === 'function') {
                Modal.show({
                    title: '🔥 Daily Goal Complete!',
                    content: `
                        <div class="streak-celebration">
                            <div class="streak-fire">🔥</div>
                            <div class="streak-count">${streak || 0}</div>
                            <div class="streak-label">Day Streak!</div>
                            <div class="streak-bonus">+${bonusXP || 0} Streak Bonus XP</div>
                            ${rewardHTML}
                            <p class="streak-encourage">${StreakSystem.getEncouragement(streak)}</p>
                        </div>
                    `,
                    footer: '<button class="btn btn-primary" onclick="Modal.close()">Awesome!</button>',
                    className: 'modal-streak'
                });
            }
            
            if (typeof SoundFX !== 'undefined' && typeof SoundFX.play === 'function') {
                SoundFX.play('levelUp');
            }
        } catch (error) {
            console.error('Error showing streak celebration:', error);
        }
    },
    
    /**
     * Simple HTML escape helper
     */
    escapeHtml: (str) => {
        if (!str || typeof str !== 'string') return '';
        return str.replace(/[&<>"']/g, (m) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[m]);
    },
    
    /**
     * Get encouragement message based on streak
     */
    getEncouragement: (streak) => {
        streak = streak || 0;
        if (streak === 1) return "Great start! Come back tomorrow to keep it going!";
        if (streak < 3) return "You're building momentum! Keep it up!";
        if (streak < 7) return "Amazing consistency! A week is within reach!";
        if (streak < 14) return "You're on fire! Don't break the chain!";
        if (streak < 30) return "Incredible dedication! You're a study machine!";
        return "LEGENDARY! You're an inspiration to all students!";
    },
    
    /**
     * Use a streak freeze
     */
    useStreakFreeze: () => {
        try {
            const data = StreakSystem.getData();
            if ((data.streakFreezes || 0) > 0) {
                data.streakFreezes = Math.max(0, data.streakFreezes - 1);
                StreakSystem.saveData(data);
                if (typeof Toast !== 'undefined' && typeof Toast.show === 'function') {
                    Toast.show('🧊 Streak Freeze activated for tomorrow!', 'success');
                }
                return true;
            }
            if (typeof Toast !== 'undefined' && typeof Toast.show === 'function') {
                Toast.show('❌ No Streak Freezes remaining!', 'error');
            }
            return false;
        } catch (error) {
            console.error('Error using streak freeze:', error);
            return false;
        }
    },
    
    /**
     * Award streak freeze (e.g., from achievements)
     */
    awardStreakFreeze: (count = 1) => {
        try {
            count = typeof count === 'number' && count > 0 ? Math.floor(count) : 1;
            const data = StreakSystem.getData();
            data.streakFreezes = Math.min((data.streakFreezes || 0) + count, 5); // Max 5
            StreakSystem.saveData(data);
            if (typeof Toast !== 'undefined' && typeof Toast.show === 'function') {
                Toast.show(`🧊 You earned ${count} Streak Freeze${count > 1 ? 's' : ''}!`, 'success');
            }
            return true;
        } catch (error) {
            console.error('Error awarding streak freeze:', error);
            return false;
        }
    },
    
    /**
     * Get progress percentage for today
     */
    getTodayProgressPercent: () => {
        try {
            const data = StreakSystem.getData();
            const goals = data.dailyGoals || StreakSystem.defaultGoals;
            const prog = data.todayProgress || {};
            
            const questionsGoal = goals.questionsToAnswer || 10;
            const correctGoal = goals.correctAnswersNeeded || 7;
            
            const questionProgress = Math.min((prog.questionsAnswered || 0) / questionsGoal, 1);
            const correctProgress = Math.min((prog.correctAnswers || 0) / correctGoal, 1);
            
            return Math.round(((questionProgress + correctProgress) / 2) * 100);
        } catch (error) {
            console.error('Error getting progress percent:', error);
            return 0;
        }
    },
    
    /**
     * Render streak widget for home page
     */
    renderWidget: () => {
        try {
            const data = StreakSystem.getData();
            const progress = StreakSystem.getTodayProgressPercent();
            const goals = data.dailyGoals || StreakSystem.defaultGoals;
            const prog = data.todayProgress || {};
            
            // Find next milestone
            const currentStreak = data.currentStreak || 0;
            const nextMilestone = StreakSystem.rewards.find(r => r.days > currentStreak);
            const daysToMilestone = nextMilestone ? nextMilestone.days - currentStreak : 0;
            
            const isActive = currentStreak > 0;
            const isCompleted = prog.completed === true;
            
            return `
                <div class="streak-widget">
                    <div class="streak-header">
                        <div class="streak-flame ${isActive ? 'active' : ''}">
                            ${isActive ? '🔥' : '❄️'}
                        </div>
                        <div class="streak-info">
                            <span class="streak-number">${currentStreak}</span>
                            <span class="streak-text">Day Streak</span>
                        </div>
                        <div class="streak-freezes" title="Streak Freezes protect your streak if you miss a day">
                            🧊 ${data.streakFreezes || 0}
                        </div>
                    </div>
                    
                    <div class="daily-goal-progress">
                        <div class="goal-header">
                            <span>Today's Goal</span>
                            <span class="${isCompleted ? 'completed' : ''}">${isCompleted ? '✅ Complete!' : progress + '%'}</span>
                        </div>
                        <div class="goal-bar">
                            <div class="goal-fill ${isCompleted ? 'complete' : ''}" style="width: ${progress}%"></div>
                        </div>
                        <div class="goal-details">
                            <span>📝 ${prog.questionsAnswered || 0}/${goals.questionsToAnswer || 10} questions</span>
                            <span>✅ ${prog.correctAnswers || 0}/${goals.correctAnswersNeeded || 7} correct</span>
                        </div>
                    </div>
                    
                    ${nextMilestone ? `
                        <div class="next-milestone">
                            <span class="milestone-badge">${nextMilestone.badge || '🎯'}</span>
                            <span class="milestone-text">${StreakSystem.escapeHtml(nextMilestone.title || 'Milestone')} in ${daysToMilestone} day${daysToMilestone !== 1 ? 's' : ''}</span>
                        </div>
                    ` : ''}
                    
                    <div class="streak-stats">
                        <div class="stat">
                            <span class="stat-value">${data.longestStreak || 0}</span>
                            <span class="stat-label">Best Streak</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${data.totalDaysActive || 0}</span>
                            <span class="stat-label">Total Days</span>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering streak widget:', error);
            return '<div class="streak-widget error">Unable to load streak data</div>';
        }
    },
    
    /**
     * Reset streak data
     */
    reset: () => {
        try {
            localStorage.removeItem(StreakSystem.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error resetting streak data:', error);
            return false;
        }
    }
};

// Initialize on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        try {
            StreakSystem.init();
        } catch (error) {
            console.error('Error initializing StreakSystem on DOMContentLoaded:', error);
        }
    });
}
