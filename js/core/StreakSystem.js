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
    
    // Get streak data from storage
    getData: () => {
        try {
            const data = localStorage.getItem(StreakSystem.STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Error loading streak data:', e);
        }
        return StreakSystem.getDefaultData();
    },
    
    // Default data structure
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
    
    // Save streak data
    saveData: (data) => {
        try {
            localStorage.setItem(StreakSystem.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving streak data:', e);
        }
    },
    
    // Initialize/check streak on app load
    init: () => {
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
                const lastDate = new Date(lastActive);
                const todayDate = new Date(today);
                const daysDiff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
                
                if (daysDiff === 1) {
                    // Consecutive day - streak continues (will be incremented when goal completed)
                } else if (daysDiff === 2 && data.streakFreezes > 0) {
                    // Missed one day but have freeze
                    data.streakFreezes--;
                    Toast.show('🧊 Streak Freeze used! You still have ' + data.streakFreezes + ' left.', 'info');
                } else if (daysDiff > 1) {
                    // Streak broken
                    if (data.currentStreak > 0) {
                        Toast.show(`😢 Streak lost! You had a ${data.currentStreak} day streak.`, 'warning');
                    }
                    data.currentStreak = 0;
                }
            }
            
            StreakSystem.saveData(data);
        }
        
        return data;
    },
    
    // Record activity
    recordActivity: (type, amount = 1) => {
        const data = StreakSystem.getData();
        const today = new Date().toDateString();
        
        // Ensure we're tracking today
        if (data.todayProgress.date !== today) {
            StreakSystem.init();
            return StreakSystem.recordActivity(type, amount);
        }
        
        // Update progress
        switch (type) {
            case 'question':
                data.todayProgress.questionsAnswered += amount;
                break;
            case 'correct':
                data.todayProgress.correctAnswers += amount;
                break;
            case 'studyTime':
                data.todayProgress.studyMinutes += amount;
                break;
            case 'flashcard':
                data.todayProgress.flashcardsReviewed += amount;
                break;
        }
        
        // Check if daily goal completed
        if (!data.todayProgress.completed) {
            const goals = data.dailyGoals;
            const prog = data.todayProgress;
            
            if (prog.questionsAnswered >= goals.questionsToAnswer &&
                prog.correctAnswers >= goals.correctAnswersNeeded) {
                // Daily goal completed!
                data.todayProgress.completed = true;
                data.lastActiveDate = today;
                data.currentStreak++;
                data.totalDaysActive++;
                
                if (data.currentStreak > data.longestStreak) {
                    data.longestStreak = data.currentStreak;
                }
                
                // Add to history
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
                
                // Calculate streak bonus XP
                const bonusXP = Math.min(data.currentStreak * 5, 50); // Max 50 bonus XP
                
                // Check for milestone rewards
                const newReward = StreakSystem.checkMilestoneReward(data);
                
                StreakSystem.saveData(data);
                
                // Show celebration
                setTimeout(() => {
                    StreakSystem.showStreakCelebration(data.currentStreak, bonusXP, newReward);
                }, 500);
                
                // Award XP
                if (typeof AppState !== 'undefined') {
                    const user = AppState.getState('user') || {};
                    user.xp = (user.xp || 0) + bonusXP;
                    AppState.setState('user', user);
                }
                
                return { completed: true, streak: data.currentStreak, bonusXP, newReward };
            }
        }
        
        StreakSystem.saveData(data);
        return { completed: false, progress: data.todayProgress };
    },
    
    // Check if user unlocked a new milestone reward
    checkMilestoneReward: (data) => {
        for (const reward of StreakSystem.rewards) {
            if (data.currentStreak >= reward.days && !data.unlockedRewards.includes(reward.days)) {
                data.unlockedRewards.push(reward.days);
                return reward;
            }
        }
        return null;
    },
    
    // Show streak celebration modal
    showStreakCelebration: (streak, bonusXP, newReward) => {
        const rewardHTML = newReward ? `
            <div class="streak-reward-unlock">
                <span class="reward-badge">${newReward.badge}</span>
                <h4>${newReward.title}</h4>
                <p>${newReward.description}</p>
                <span class="reward-xp">+${newReward.xp} Bonus XP!</span>
            </div>
        ` : '';
        
        if (typeof Modal !== 'undefined') {
            Modal.show({
                title: '🔥 Daily Goal Complete!',
                content: `
                    <div class="streak-celebration">
                        <div class="streak-fire">🔥</div>
                        <div class="streak-count">${streak}</div>
                        <div class="streak-label">Day Streak!</div>
                        <div class="streak-bonus">+${bonusXP} Streak Bonus XP</div>
                        ${rewardHTML}
                        <p class="streak-encourage">${StreakSystem.getEncouragement(streak)}</p>
                    </div>
                `,
                footer: '<button class="btn btn-primary" onclick="Modal.close()">Awesome!</button>',
                className: 'modal-streak'
            });
        }
        
        if (typeof SoundFX !== 'undefined') {
            SoundFX.play('levelUp');
        }
    },
    
    // Get encouragement message based on streak
    getEncouragement: (streak) => {
        if (streak === 1) return "Great start! Come back tomorrow to keep it going!";
        if (streak < 3) return "You're building momentum! Keep it up!";
        if (streak < 7) return "Amazing consistency! A week is within reach!";
        if (streak < 14) return "You're on fire! Don't break the chain!";
        if (streak < 30) return "Incredible dedication! You're a study machine!";
        return "LEGENDARY! You're an inspiration to all students!";
    },
    
    // Use a streak freeze
    useStreakFreeze: () => {
        const data = StreakSystem.getData();
        if (data.streakFreezes > 0) {
            data.streakFreezes--;
            StreakSystem.saveData(data);
            Toast.show('🧊 Streak Freeze activated for tomorrow!', 'success');
            return true;
        }
        Toast.show('❌ No Streak Freezes remaining!', 'error');
        return false;
    },
    
    // Award streak freeze (e.g., from achievements)
    awardStreakFreeze: (count = 1) => {
        const data = StreakSystem.getData();
        data.streakFreezes = Math.min(data.streakFreezes + count, 5); // Max 5
        StreakSystem.saveData(data);
        Toast.show(`🧊 You earned ${count} Streak Freeze${count > 1 ? 's' : ''}!`, 'success');
    },
    
    // Get progress percentage for today
    getTodayProgressPercent: () => {
        const data = StreakSystem.getData();
        const goals = data.dailyGoals;
        const prog = data.todayProgress;
        
        const questionProgress = Math.min(prog.questionsAnswered / goals.questionsToAnswer, 1);
        const correctProgress = Math.min(prog.correctAnswers / goals.correctAnswersNeeded, 1);
        
        return Math.round(((questionProgress + correctProgress) / 2) * 100);
    },
    
    // Render streak widget for home page
    renderWidget: () => {
        const data = StreakSystem.getData();
        const progress = StreakSystem.getTodayProgressPercent();
        const goals = data.dailyGoals;
        const prog = data.todayProgress;
        
        // Find next milestone
        const nextMilestone = StreakSystem.rewards.find(r => r.days > data.currentStreak);
        const daysToMilestone = nextMilestone ? nextMilestone.days - data.currentStreak : 0;
        
        return `
            <div class="streak-widget">
                <div class="streak-header">
                    <div class="streak-flame ${data.currentStreak > 0 ? 'active' : ''}">
                        ${data.currentStreak > 0 ? '🔥' : '❄️'}
                    </div>
                    <div class="streak-info">
                        <span class="streak-number">${data.currentStreak}</span>
                        <span class="streak-text">Day Streak</span>
                    </div>
                    <div class="streak-freezes" title="Streak Freezes protect your streak if you miss a day">
                        🧊 ${data.streakFreezes}
                    </div>
                </div>
                
                <div class="daily-goal-progress">
                    <div class="goal-header">
                        <span>Today's Goal</span>
                        <span class="${prog.completed ? 'completed' : ''}">${prog.completed ? '✅ Complete!' : progress + '%'}</span>
                    </div>
                    <div class="goal-bar">
                        <div class="goal-fill ${prog.completed ? 'complete' : ''}" style="width: ${progress}%"></div>
                    </div>
                    <div class="goal-details">
                        <span>📝 ${prog.questionsAnswered}/${goals.questionsToAnswer} questions</span>
                        <span>✅ ${prog.correctAnswers}/${goals.correctAnswersNeeded} correct</span>
                    </div>
                </div>
                
                ${nextMilestone ? `
                    <div class="next-milestone">
                        <span class="milestone-badge">${nextMilestone.badge}</span>
                        <span class="milestone-text">${nextMilestone.title} in ${daysToMilestone} day${daysToMilestone !== 1 ? 's' : ''}</span>
                    </div>
                ` : ''}
                
                <div class="streak-stats">
                    <div class="stat">
                        <span class="stat-value">${data.longestStreak}</span>
                        <span class="stat-label">Best Streak</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${data.totalDaysActive}</span>
                        <span class="stat-label">Total Days</span>
                    </div>
                </div>
            </div>
        `;
    }
};

// Initialize on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        StreakSystem.init();
    });
}
