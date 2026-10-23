/**
 * ProfileView.js - Advanced User Profile Page
 * Comprehensive profile with stats, achievements, activity, goals, and customization
 */

const ProfileView = {
    currentTab: 'overview',
    activityData: null,
    
    // Achievement definitions
    ACHIEVEMENTS: {
        // Milestone Achievements
        first_question: { id: 'first_question', name: 'First Steps', desc: 'Answer your first question', icon: '🎯', xp: 10, category: 'milestone' },
        quiz_master: { id: 'quiz_master', name: 'Quiz Master', desc: 'Complete 10 quizzes', icon: '📝', xp: 50, category: 'milestone' },
        century: { id: 'century', name: 'Century', desc: 'Answer 100 questions', icon: '💯', xp: 100, category: 'milestone' },
        thousand: { id: 'thousand', name: 'Thousand Club', desc: 'Answer 1000 questions', icon: '🏆', xp: 500, category: 'milestone' },
        
        // Streak Achievements
        streak_3: { id: 'streak_3', name: 'Getting Started', desc: '3 day streak', icon: '🔥', xp: 30, category: 'streak' },
        streak_7: { id: 'streak_7', name: 'Week Warrior', desc: '7 day streak', icon: '🔥', xp: 70, category: 'streak' },
        streak_14: { id: 'streak_14', name: 'Fortnight Fighter', desc: '14 day streak', icon: '🔥', xp: 140, category: 'streak' },
        streak_30: { id: 'streak_30', name: 'Monthly Master', desc: '30 day streak', icon: '🔥', xp: 300, category: 'streak' },
        streak_100: { id: 'streak_100', name: 'Centurion', desc: '100 day streak', icon: '👑', xp: 1000, category: 'streak' },
        
        // Accuracy Achievements
        perfect_10: { id: 'perfect_10', name: 'Perfect 10', desc: '10 correct in a row', icon: '⭐', xp: 50, category: 'accuracy' },
        perfect_25: { id: 'perfect_25', name: 'Sharpshooter', desc: '25 correct in a row', icon: '🎯', xp: 125, category: 'accuracy' },
        perfect_quiz: { id: 'perfect_quiz', name: 'Flawless', desc: 'Complete a quiz with 100%', icon: '💎', xp: 75, category: 'accuracy' },
        accuracy_90: { id: 'accuracy_90', name: 'Precision', desc: 'Maintain 90%+ accuracy', icon: '🏹', xp: 100, category: 'accuracy' },
        
        // Topic Achievements
        topic_master: { id: 'topic_master', name: 'Topic Master', desc: 'Master any topic (90%+ in 50+ questions)', icon: '📚', xp: 200, category: 'topic' },
        all_topics: { id: 'all_topics', name: 'Renaissance', desc: 'Study all topics', icon: '🌟', xp: 150, category: 'topic' },
        deep_dive: { id: 'deep_dive', name: 'Deep Diver', desc: 'Answer 100+ questions in one topic', icon: '🔬', xp: 100, category: 'topic' },
        
        // Game Achievements
        speed_demon: { id: 'speed_demon', name: 'Speed Demon', desc: 'Win SpeedRun under 60 seconds', icon: '⚡', xp: 100, category: 'games' },
        battle_victor: { id: 'battle_victor', name: 'Battle Victor', desc: 'Win 10 Battle Mode games', icon: '⚔️', xp: 100, category: 'games' },
        boss_slayer: { id: 'boss_slayer', name: 'Boss Slayer', desc: 'Defeat all bosses', icon: '🐉', xp: 250, category: 'games' },
        millionaire: { id: 'millionaire', name: 'Millionaire', desc: 'Win Who Wants to Be a Millionaire', icon: '💰', xp: 200, category: 'games' },
        game_master: { id: 'game_master', name: 'Game Master', desc: 'Play all game modes', icon: '🎮', xp: 150, category: 'games' },
        
        // Special Achievements
        night_owl: { id: 'night_owl', name: 'Night Owl', desc: 'Study after midnight', icon: '🦉', xp: 25, category: 'special' },
        early_bird: { id: 'early_bird', name: 'Early Bird', desc: 'Study before 6am', icon: '🐦', xp: 25, category: 'special' },
        weekend_warrior: { id: 'weekend_warrior', name: 'Weekend Warrior', desc: 'Study on Saturday & Sunday', icon: '📅', xp: 50, category: 'special' },
        comeback: { id: 'comeback', name: 'Comeback Kid', desc: 'Return after 7+ days away', icon: '🔄', xp: 50, category: 'special' },
        explorer: { id: 'explorer', name: 'Explorer', desc: 'Visit all sections of the app', icon: '🧭', xp: 75, category: 'special' }
    },
    
    // Badge tiers based on XP
    BADGES: [
        { name: 'Newcomer', minXP: 0, icon: '🌱', color: '#6b7280' },
        { name: 'Learner', minXP: 100, icon: '📖', color: '#22c55e' },
        { name: 'Student', minXP: 500, icon: '🎒', color: '#3b82f6' },
        { name: 'Scholar', minXP: 1500, icon: '📚', color: '#8b5cf6' },
        { name: 'Expert', minXP: 3500, icon: '🎓', color: '#f59e0b' },
        { name: 'Master', minXP: 7500, icon: '⭐', color: '#ef4444' },
        { name: 'Grandmaster', minXP: 15000, icon: '👑', color: '#fbbf24' },
        { name: 'Legend', minXP: 30000, icon: '🏆', color: '#ec4899' },
        { name: 'Champion', minXP: 50000, icon: '💎', color: '#06b6d4' },
        { name: 'Immortal', minXP: 100000, icon: '🔥', color: '#dc2626' }
    ],

    /**
     * Get user data safely
     */
    getUserData: () => {
        try {
            const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
            if (!user) return null;
            
            return {
                username: user.username || 'User',
                email: user.email || '',
                avatarColor: user.avatarColor || '#10b981',
                avatarEmoji: user.avatarEmoji || '',
                accountType: user.accountType || 'student',
                createdAt: user.createdAt || new Date().toISOString(),
                level: user.profile?.level || user.level || 1,
                xp: user.profile?.xp || user.xp || 0,
                streak: user.profile?.streak || 0,
                longestStreak: user.profile?.longestStreak || user.profile?.streak || 0,
                totalAnswered: user.profile?.totalAnswered || 0,
                totalCorrect: user.profile?.totalCorrect || 0,
                achievements: user.profile?.achievements || [],
                topicsStudied: user.profile?.topicsStudied || [],
                gamesPlayed: user.profile?.gamesPlayed || {},
                studyHistory: user.profile?.studyHistory || [],
                goals: user.profile?.goals || [],
                lastActive: user.profile?.lastActive || new Date().toISOString()
            };
        } catch (e) {
            console.error('ProfileView: Error getting user data:', e);
            return null;
        }
    },

    /**
     * Get current badge based on XP
     */
    getBadge: (xp) => {
        let badge = ProfileView.BADGES[0];
        for (const b of ProfileView.BADGES) {
            if (xp >= b.minXP) badge = b;
        }
        return badge;
    },

    /**
     * Get next badge
     */
    getNextBadge: (xp) => {
        for (const b of ProfileView.BADGES) {
            if (xp < b.minXP) return b;
        }
        return null;
    },

    /**
     * Calculate accuracy percentage
     */
    getAccuracy: (correct, total) => {
        if (!total || total === 0) return 0;
        return Math.round((correct / total) * 100);
    },

    /**
     * Get XP needed for level
     */
    getXPForLevel: (level) => {
        const thresholds = [0, 0, 100, 250, 500, 850, 1300, 1850, 2500, 3250, 4100, 5050, 6100, 7250, 8500, 9850, 11300, 12850, 14500, 16250, 18100, 20050, 22100, 24250, 26500, 28850, 31300, 33850, 36500, 39250, 42100];
        return thresholds[level] || thresholds[thresholds.length - 1] + (level - 30) * 3000;
    },

    /**
     * Get activity for last N days
     */
    getActivityData: (days = 30) => {
        const user = ProfileView.getUserData();
        if (!user) return [];
        
        const history = user.studyHistory || [];
        const result = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayData = history.find(h => h.date === dateStr) || { date: dateStr, questions: 0, correct: 0, xp: 0 };
            result.push(dayData);
        }
        
        return result;
    },

    /**
     * Render activity heatmap
     */
    renderActivityHeatmap: () => {
        const activity = ProfileView.getActivityData(84); // 12 weeks
        const weeks = [];
        
        for (let i = 0; i < activity.length; i += 7) {
            weeks.push(activity.slice(i, i + 7));
        }
        
        const getColor = (questions) => {
            if (questions === 0) return 'var(--bg-tertiary)';
            if (questions < 5) return 'rgba(16, 185, 129, 0.3)';
            if (questions < 15) return 'rgba(16, 185, 129, 0.5)';
            if (questions < 30) return 'rgba(16, 185, 129, 0.7)';
            return 'rgba(16, 185, 129, 1)';
        };
        
        return `
            <div class="activity-heatmap">
                <div class="heatmap-grid">
                    ${weeks.map(week => `
                        <div class="heatmap-week">
                            ${week.map(day => `
                                <div class="heatmap-day" 
                                     style="background: ${getColor(day.questions)}"
                                     title="${day.date}: ${day.questions} questions, ${day.xp} XP">
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
                <div class="heatmap-legend">
                    <span>Less</span>
                    <div class="legend-scale">
                        <div class="legend-box" style="background: var(--bg-tertiary)"></div>
                        <div class="legend-box" style="background: rgba(16, 185, 129, 0.3)"></div>
                        <div class="legend-box" style="background: rgba(16, 185, 129, 0.5)"></div>
                        <div class="legend-box" style="background: rgba(16, 185, 129, 0.7)"></div>
                        <div class="legend-box" style="background: rgba(16, 185, 129, 1)"></div>
                    </div>
                    <span>More</span>
                </div>
            </div>
        `;
    },

    /**
     * Render achievements section
     */
    renderAchievements: (userAchievements = []) => {
        const categories = {
            milestone: { name: 'Milestones', icon: '🎯' },
            streak: { name: 'Streaks', icon: '🔥' },
            accuracy: { name: 'Accuracy', icon: '🎯' },
            topic: { name: 'Topics', icon: '📚' },
            games: { name: 'Games', icon: '🎮' },
            special: { name: 'Special', icon: '⭐' }
        };
        
        const unlocked = new Set(userAchievements.map(a => typeof a === 'string' ? a : a.id));
        
        return `
            <div class="achievements-gallery">
                ${Object.entries(categories).map(([catId, cat]) => {
                    const catAchievements = Object.values(ProfileView.ACHIEVEMENTS).filter(a => a.category === catId);
                    if (catAchievements.length === 0) return '';
                    
                    return `
                        <div class="achievement-category">
                            <h4>${cat.icon} ${cat.name}</h4>
                            <div class="achievement-grid">
                                ${catAchievements.map(ach => {
                                    const isUnlocked = unlocked.has(ach.id);
                                    return `
                                        <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                                            <div class="achievement-icon">${isUnlocked ? ach.icon : '🔒'}</div>
                                            <div class="achievement-info">
                                                <span class="achievement-name">${ach.name}</span>
                                                <span class="achievement-desc">${ach.desc}</span>
                                                <span class="achievement-xp">+${ach.xp} XP</span>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    /**
     * Render topic progress
     */
    renderTopicProgress: () => {
        const user = ProfileView.getUserData();
        if (!user) return '<p>No data available</p>';
        
        const topics = typeof TOPICS !== 'undefined' ? TOPICS : [];
        const topicStats = user.topicsStudied || [];
        
        return `
            <div class="topic-progress-list">
                ${topics.map(topic => {
                    const stats = topicStats.find(t => t.id === topic.id) || { answered: 0, correct: 0 };
                    const accuracy = ProfileView.getAccuracy(stats.correct, stats.answered);
                    const mastered = stats.answered >= 50 && accuracy >= 90;
                    
                    return `
                        <div class="topic-progress-item ${mastered ? 'mastered' : ''}">
                            <div class="topic-header">
                                <span class="topic-icon" style="background: ${topic.color || '#888'}">${topic.icon || '📖'}</span>
                                <span class="topic-name">${topic.name || 'Unknown'}</span>
                                ${mastered ? '<span class="mastered-badge">⭐ Mastered</span>' : ''}
                            </div>
                            <div class="topic-stats">
                                <span>${stats.answered} questions</span>
                                <span>${accuracy}% accuracy</span>
                            </div>
                            <div class="topic-bar">
                                <div class="topic-bar-fill" style="width: ${Math.min(100, (stats.answered / 50) * 100)}%; background: ${topic.color || '#10b981'}"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    /**
     * Render study goals
     */
    renderGoals: () => {
        const user = ProfileView.getUserData();
        const goals = user?.goals || [];
        
        // Default goals if none set
        const defaultGoals = [
            { id: 'daily_questions', name: 'Daily Questions', target: 20, current: 0, icon: '📝' },
            { id: 'weekly_xp', name: 'Weekly XP', target: 500, current: 0, icon: '⭐' },
            { id: 'streak', name: 'Maintain Streak', target: 7, current: user?.streak || 0, icon: '🔥' }
        ];
        
        const activeGoals = goals.length > 0 ? goals : defaultGoals;
        
        return `
            <div class="goals-section">
                <div class="goals-header">
                    <h4>🎯 Your Goals</h4>
                    <button class="btn btn-small btn-ghost" onclick="ProfileView.editGoals()">Edit</button>
                </div>
                <div class="goals-list">
                    ${activeGoals.map(goal => {
                        const progress = Math.min(100, (goal.current / goal.target) * 100);
                        const completed = progress >= 100;
                        
                        return `
                            <div class="goal-item ${completed ? 'completed' : ''}">
                                <div class="goal-icon">${goal.icon}</div>
                                <div class="goal-info">
                                    <span class="goal-name">${goal.name}</span>
                                    <span class="goal-progress-text">${goal.current} / ${goal.target}</span>
                                </div>
                                <div class="goal-bar">
                                    <div class="goal-bar-fill" style="width: ${progress}%"></div>
                                </div>
                                ${completed ? '<span class="goal-check">✓</span>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    /**
     * Edit goals modal
     */
    editGoals: () => {
        if (typeof Modal === 'undefined') return;
        
        const user = ProfileView.getUserData();
        const goals = user?.goals || [];
        
        Modal.show({
            title: '🎯 Edit Goals',
            content: `
                <div class="edit-goals-form">
                    <div class="goal-form-item">
                        <label>Daily Questions Target</label>
                        <input type="number" id="goal-daily" min="5" max="100" value="${goals.find(g => g.id === 'daily_questions')?.target || 20}">
                    </div>
                    <div class="goal-form-item">
                        <label>Weekly XP Target</label>
                        <input type="number" id="goal-weekly-xp" min="100" max="5000" value="${goals.find(g => g.id === 'weekly_xp')?.target || 500}">
                    </div>
                    <div class="goal-form-item">
                        <label>Streak Goal (days)</label>
                        <input type="number" id="goal-streak" min="3" max="365" value="${goals.find(g => g.id === 'streak')?.target || 7}">
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" onclick="Modal.close()">Cancel</button>
                <button class="btn btn-primary" onclick="ProfileView.saveGoals()">Save Goals</button>
            `
        });
    },

    /**
     * Save goals
     */
    saveGoals: () => {
        try {
            const dailyTarget = parseInt(document.getElementById('goal-daily')?.value) || 20;
            const weeklyXP = parseInt(document.getElementById('goal-weekly-xp')?.value) || 500;
            const streakTarget = parseInt(document.getElementById('goal-streak')?.value) || 7;
            
            const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
            if (!user) return;
            
            const goals = [
                { id: 'daily_questions', name: 'Daily Questions', target: dailyTarget, current: 0, icon: '📝' },
                { id: 'weekly_xp', name: 'Weekly XP', target: weeklyXP, current: 0, icon: '⭐' },
                { id: 'streak', name: 'Maintain Streak', target: streakTarget, current: user.profile?.streak || 0, icon: '🔥' }
            ];
            
            // Update user profile
            if (typeof Auth.updateProfile === 'function') {
                Auth.updateProfile({ goals });
            }
            
            if (typeof Modal !== 'undefined') Modal.close();
            if (typeof Toast !== 'undefined') Toast.show('Goals saved!', 'success');
            
            // Refresh view
            ProfileView.render();
            ProfileView.init();
            
        } catch (e) {
            console.error('Error saving goals:', e);
            if (typeof Toast !== 'undefined') Toast.show('Failed to save goals', 'error');
        }
    },

    /**
     * Render game stats
     */
    renderGameStats: () => {
        const user = ProfileView.getUserData();
        const games = user?.gamesPlayed || {};
        
        const gameList = [
            { id: 'speedrun', name: 'Speed Run', icon: '⚡' },
            { id: 'battlemode', name: 'Battle Mode', icon: '⚔️' },
            { id: 'bossbattle', name: 'Boss Battle', icon: '🐉' },
            { id: 'millionaire', name: 'Millionaire', icon: '💰' },
            { id: 'memorymatch', name: 'Memory Match', icon: '🧠' },
            { id: 'goldquest', name: 'Gold Quest', icon: '💎' },
            { id: 'factory', name: 'Code Factory', icon: '🏭' },
            { id: 'typeracer', name: 'Type Racer', icon: '🏎️' },
            { id: 'towerdefense', name: 'Tower Defense', icon: '🏰' },
            { id: 'carrace', name: 'Car Race', icon: '🚗' },
            { id: 'cryptohack', name: 'Crypto Hack', icon: '🔐' }
        ];
        
        return `
            <div class="game-stats-grid">
                ${gameList.map(game => {
                    const stats = games[game.id] || { played: 0, won: 0, bestScore: 0 };
                    const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
                    
                    return `
                        <div class="game-stat-card">
                            <div class="game-stat-icon">${game.icon}</div>
                            <div class="game-stat-name">${game.name}</div>
                            <div class="game-stat-details">
                                <span>Played: ${stats.played}</span>
                                <span>Win Rate: ${winRate}%</span>
                                ${stats.bestScore ? `<span>Best: ${stats.bestScore}</span>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    /**
     * Main render function
     */
    render: () => {
        const user = ProfileView.getUserData();
        
        if (!user) {
            return `
                <div class="profile-view">
                    <div class="view-header">
                        <h1>👤 Profile</h1>
                    </div>
                    <div class="auth-required">
                        <div class="auth-icon">🔒</div>
                        <h2>Sign in to view your profile</h2>
                        <p>Track your progress, achievements, and study history</p>
                        <button class="btn btn-primary" onclick="App.showAuthModal('login')">Sign In</button>
                    </div>
                </div>
            `;
        }
        
        const badge = ProfileView.getBadge(user.xp);
        const nextBadge = ProfileView.getNextBadge(user.xp);
        const accuracy = ProfileView.getAccuracy(user.totalCorrect, user.totalAnswered);
        const xpForNext = ProfileView.getXPForLevel(user.level + 1);
        const xpForCurrent = ProfileView.getXPForLevel(user.level);
        const levelProgress = ((user.xp - xpForCurrent) / (xpForNext - xpForCurrent)) * 100;
        const unlockedCount = user.achievements?.length || 0;
        const totalAchievements = Object.keys(ProfileView.ACHIEVEMENTS).length;
        
        const escapeHtml = (str) => {
            return String(str).replace(/[&<>"']/g, (m) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            })[m]);
        };
        
        return `
            <div class="profile-view">
                <!-- Profile Header -->
                <div class="profile-hero">
                    <div class="profile-hero-bg"></div>
                    <div class="profile-hero-content">
                        <div class="profile-avatar-large" style="background: ${user.avatarColor}" onclick="App.showAvatarEditor()">
                            ${user.avatarEmoji || escapeHtml(user.username.charAt(0).toUpperCase())}
                            <div class="avatar-edit-overlay">✏️</div>
                        </div>
                        <div class="profile-hero-info">
                            <h1 class="profile-username">${escapeHtml(user.username)}</h1>
                            <div class="profile-badge" style="background: ${badge.color}">
                                <span class="badge-icon">${badge.icon}</span>
                                <span class="badge-name">${badge.name}</span>
                            </div>
                            <div class="profile-meta">
                                <span>📅 Joined ${new Date(user.createdAt).toLocaleDateString()}</span>
                                <span>🎯 ${user.accountType === 'teacher' ? 'Teacher' : 'Student'}</span>
                            </div>
                        </div>
                        <div class="profile-quick-stats">
                            <div class="quick-stat">
                                <span class="quick-stat-value">${user.level}</span>
                                <span class="quick-stat-label">Level</span>
                            </div>
                            <div class="quick-stat">
                                <span class="quick-stat-value">${user.xp.toLocaleString()}</span>
                                <span class="quick-stat-label">XP</span>
                            </div>
                            <div class="quick-stat fire">
                                <span class="quick-stat-value">${user.streak}</span>
                                <span class="quick-stat-label">🔥 Streak</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Tab Navigation -->
                <div class="profile-tabs">
                    <button class="profile-tab ${ProfileView.currentTab === 'overview' ? 'active' : ''}" onclick="ProfileView.switchTab('overview')">
                        📊 Overview
                    </button>
                    <button class="profile-tab ${ProfileView.currentTab === 'achievements' ? 'active' : ''}" onclick="ProfileView.switchTab('achievements')">
                        🏆 Achievements
                    </button>
                    <button class="profile-tab ${ProfileView.currentTab === 'topics' ? 'active' : ''}" onclick="ProfileView.switchTab('topics')">
                        📚 Topics
                    </button>
                    <button class="profile-tab ${ProfileView.currentTab === 'games' ? 'active' : ''}" onclick="ProfileView.switchTab('games')">
                        🎮 Games
                    </button>
                </div>
                
                <!-- Tab Content -->
                <div class="profile-tab-content">
                    <!-- Overview Tab -->
                    <div class="tab-panel ${ProfileView.currentTab === 'overview' ? 'active' : ''}" id="tab-overview">
                        <div class="profile-grid">
                            <!-- Level Progress Card -->
                            <div class="profile-card level-card">
                                <h3>📈 Level Progress</h3>
                                <div class="level-display">
                                    <div class="level-circle">
                                        <svg viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" class="level-bg"></circle>
                                            <circle cx="50" cy="50" r="45" class="level-progress" 
                                                    style="stroke-dasharray: ${levelProgress * 2.83} 283"></circle>
                                        </svg>
                                        <div class="level-number">${user.level}</div>
                                    </div>
                                    <div class="level-info">
                                        <p class="xp-text">${user.xp.toLocaleString()} / ${xpForNext.toLocaleString()} XP</p>
                                        <p class="xp-needed">${(xpForNext - user.xp).toLocaleString()} XP to Level ${user.level + 1}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Stats Card -->
                            <div class="profile-card stats-card">
                                <h3>📊 Statistics</h3>
                                <div class="stats-grid">
                                    <div class="stat-item">
                                        <span class="stat-value">${user.totalAnswered.toLocaleString()}</span>
                                        <span class="stat-label">Questions</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-value">${accuracy}%</span>
                                        <span class="stat-label">Accuracy</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-value">${user.longestStreak}</span>
                                        <span class="stat-label">Best Streak</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-value">${unlockedCount}/${totalAchievements}</span>
                                        <span class="stat-label">Achievements</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Badge Progress -->
                            <div class="profile-card badge-card">
                                <h3>🎖️ Badge Progress</h3>
                                <div class="badge-display">
                                    <div class="current-badge" style="background: ${badge.color}">
                                        <span class="badge-big-icon">${badge.icon}</span>
                                        <span class="badge-title">${badge.name}</span>
                                    </div>
                                    ${nextBadge ? `
                                        <div class="badge-arrow">→</div>
                                        <div class="next-badge">
                                            <span class="badge-big-icon">${nextBadge.icon}</span>
                                            <span class="badge-title">${nextBadge.name}</span>
                                            <span class="badge-xp-needed">${(nextBadge.minXP - user.xp).toLocaleString()} XP</span>
                                        </div>
                                    ` : '<p class="max-badge">Maximum badge achieved!</p>'}
                                </div>
                            </div>
                            
                            <!-- Goals -->
                            <div class="profile-card goals-card">
                                ${ProfileView.renderGoals()}
                            </div>
                            
                            <!-- Activity Heatmap -->
                            <div class="profile-card activity-card full-width">
                                <h3>📅 Activity</h3>
                                ${ProfileView.renderActivityHeatmap()}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Achievements Tab -->
                    <div class="tab-panel ${ProfileView.currentTab === 'achievements' ? 'active' : ''}" id="tab-achievements">
                        <div class="achievements-header">
                            <h2>🏆 Achievements</h2>
                            <p class="achievements-count">${unlockedCount} / ${totalAchievements} unlocked</p>
                        </div>
                        ${ProfileView.renderAchievements(user.achievements)}
                    </div>
                    
                    <!-- Topics Tab -->
                    <div class="tab-panel ${ProfileView.currentTab === 'topics' ? 'active' : ''}" id="tab-topics">
                        <div class="topics-header">
                            <h2>📚 Topic Progress</h2>
                            <p>Master topics by answering 50+ questions with 90%+ accuracy</p>
                        </div>
                        ${ProfileView.renderTopicProgress()}
                    </div>
                    
                    <!-- Games Tab -->
                    <div class="tab-panel ${ProfileView.currentTab === 'games' ? 'active' : ''}" id="tab-games">
                        <div class="games-header">
                            <h2>🎮 Game Statistics</h2>
                        </div>
                        ${ProfileView.renderGameStats()}
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Switch tabs
     */
    switchTab: (tabId) => {
        ProfileView.currentTab = tabId;
        
        // Update tab buttons
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.profile-tab[onclick*="${tabId}"]`)?.classList.add('active');
        
        // Update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`tab-${tabId}`)?.classList.add('active');
    },

    /**
     * Initialize view
     */
    init: () => {
        // Animate counters
        setTimeout(() => {
            document.querySelectorAll('.stat-value[data-counter]').forEach(el => {
                const value = parseInt(el.getAttribute('data-value')) || 0;
                if (typeof Helpers !== 'undefined' && Helpers.animateCounter) {
                    Helpers.animateCounter(el, 0, value, 1000);
                }
            });
        }, 100);
    },

    /**
     * Cleanup
     */
    cleanup: () => {
        ProfileView.currentTab = 'overview';
    }
};

// Make globally available
if (typeof window !== 'undefined') {
    window.ProfileView = ProfileView;
}
