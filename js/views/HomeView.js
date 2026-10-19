/**
 * HomeView.js - Enhanced Home/Dashboard View
 * Features: Daily Challenge, Study Timer, Leaderboard, Progress Charts
 */

const HomeView = {
    render: () => {
        const user = AppState.getState('user');
        const xpForNext = HomeView.getXPForNextLevel(user.level);
        const currentLevelXP = HomeView.getXPForLevel(user.level);
        const progress = Math.min(100, ((user.xp - currentLevelXP) / (xpForNext - currentLevelXP)) * 100);
        const accuracy = user.totalAnswered > 0 ? Math.round((user.totalCorrect / user.totalAnswered) * 100) : 0;
        const rank = HomeView.getRank(user.level);
        const isLoggedIn = typeof Auth !== 'undefined' && Auth.isLoggedIn();
        const username = isLoggedIn ? Auth.getSession()?.username : 'Student';

        return `
            <div class="home-view">
                <!-- Welcome Hero -->
                <section class="hero">
                    <div class="hero-content">
                        <div class="hero-welcome">
                            <h1>Welcome back, ${username}! 👋</h1>
                            <p class="hero-subtitle">Ready to master IGCSE Computer Science?</p>
                        </div>
                        <div class="hero-badges">
                            <span class="badge badge-purple">Edexcel 4CP0</span>
                            <span class="badge badge-green">155+ Questions</span>
                            <span class="badge badge-cyan">Interactive Learning</span>
                        </div>
                    </div>
                    <div class="hero-search">
                        <button class="search-btn" onclick="SearchNotes.open()">
                            <i class="fas fa-search"></i>
                            <span>Search notes...</span>
                            <kbd>Ctrl+K</kbd>
                        </button>
                    </div>
                </section>

                <!-- Daily Challenge & Timer Row -->
                <section class="feature-row">
                    ${DailyChallenge.renderCard()}
                    ${StudyTimer.render()}
                </section>

                <!-- Main Dashboard -->
                <section class="dashboard-grid">
                    <!-- Progress Panel -->
                    <div class="dashboard-panel user-panel">
                        <div class="panel-header">
                            <h3>📊 Your Progress</h3>
                            <span class="rank-badge">${rank.icon} ${rank.name}</span>
                        </div>
                        
                        <div class="level-display">
                            <div class="level-circle">
                                <svg viewBox="0 0 100 100">
                                    <circle class="level-circle-bg" cx="50" cy="50" r="45"/>
                                    <circle class="level-circle-progress" cx="50" cy="50" r="45"
                                        stroke-dasharray="${progress * 2.83} 283"
                                        style="--progress-color: ${rank.color}"/>
                                </svg>
                                <div class="level-number">
                                    <span class="level-value">${user.level}</span>
                                    <span class="level-label">Level</span>
                                </div>
                            </div>
                            <div class="level-info">
                                <div class="xp-display">
                                    <span class="xp-current">${user.xp.toLocaleString()}</span>
                                    <span class="xp-divider">/</span>
                                    <span class="xp-target">${xpForNext.toLocaleString()} XP</span>
                                </div>
                                <div class="xp-bar">
                                    <div class="xp-fill" style="width: ${progress}%; background: ${rank.color}"></div>
                                </div>
                                <p class="xp-needed">${(xpForNext - user.xp).toLocaleString()} XP to Level ${user.level + 1}</p>
                            </div>
                        </div>
                        
                        <!-- Mini Stats -->
                        <div class="mini-stats">
                            <div class="mini-stat">
                                <span class="mini-stat-value">${user.totalCorrect}</span>
                                <span class="mini-stat-label">Correct</span>
                            </div>
                            <div class="mini-stat">
                                <span class="mini-stat-value">${accuracy}%</span>
                                <span class="mini-stat-label">Accuracy</span>
                            </div>
                            <div class="mini-stat">
                                <span class="mini-stat-value">${user.achievements.length}</span>
                                <span class="mini-stat-label">Achievements</span>
                            </div>
                        </div>
                    </div>

                    <!-- Leaderboard -->
                    <div class="dashboard-panel leaderboard-panel">
                        ${Leaderboard.renderMini()}
                    </div>
                </section>

                <!-- Quick Actions -->
                <section class="quick-actions">
                    <h3>🚀 Quick Start</h3>
                    <div class="action-grid">
                        <button class="action-card" onclick="Router.navigate('learn')">
                            <span class="action-icon">📚</span>
                            <span class="action-title">Learn</span>
                            <span class="action-desc">Study revision notes</span>
                            <kbd>L</kbd>
                        </button>
                        <button class="action-card highlight" onclick="Router.navigate('practice')">
                            <span class="action-icon">🎯</span>
                            <span class="action-title">Practice</span>
                            <span class="action-desc">Quiz & Flashcards</span>
                            <kbd>P</kbd>
                        </button>
                        <button class="action-card" onclick="Router.navigate('tools')">
                            <span class="action-icon">🔧</span>
                            <span class="action-title">Tools</span>
                            <span class="action-desc">Interactive tools</span>
                            <kbd>T</kbd>
                        </button>
                        <button class="action-card" onclick="Router.navigate('playground')">
                            <span class="action-icon">💻</span>
                            <span class="action-title">Code</span>
                            <span class="action-desc">Write & trace code</span>
                            <kbd>C</kbd>
                        </button>
                    </div>
                </section>

                <!-- Topics Overview -->
                <section class="topic-progress-section">
                    <div class="section-header-row">
                        <h3>📖 Topics Overview</h3>
                        <button class="btn btn-small btn-secondary" onclick="Router.navigate('learn')">
                            View All →
                        </button>
                    </div>
                    <div class="topics-progress-grid">
                        ${TOPICS.slice(0, 6).map(topic => {
                            const questionCount = QUESTIONS.filter(q => q.topic === topic.id).length;
                            return `
                                <div class="topic-progress-card" onclick="Router.navigate('learn'); setTimeout(() => LearnView.selectTopic('${topic.id}'), 100)">
                                    <div class="topic-header" style="border-color: ${topic.color}">
                                        <span class="topic-icon" style="background: ${topic.color}">${topic.icon}</span>
                                        <div class="topic-info">
                                            <span class="topic-name">${topic.name}</span>
                                            <span class="topic-meta">${topic.subtopics.length} subtopics • ${questionCount} questions</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </section>

                <!-- Achievements Preview -->
                <section class="achievements-section">
                    <div class="section-header-row">
                        <h3>🏆 Achievements</h3>
                        <span class="achievement-count">${user.achievements.length}/${ACHIEVEMENTS.length} Unlocked</span>
                    </div>
                    <div class="achievements-scroll">
                        ${ACHIEVEMENTS.slice(0, 8).map(ach => {
                            const unlocked = user.achievements.includes(ach.id);
                            return `
                                <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}" title="${ach.description}">
                                    <span class="ach-icon">${unlocked ? ach.icon : '🔒'}</span>
                                    <span class="ach-name">${ach.name}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </section>

                <!-- Keyboard Shortcut Hint -->
                <div class="keyboard-hint">
                    <p>💡 Press <kbd>?</kbd> for keyboard shortcuts</p>
                </div>
            </div>
        `;
    },

    init: () => {
        console.log('🏠 Home view initialized');
    },

    getXPForLevel: (level) => {
        const thresholds = [0, 0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000];
        return thresholds[level] || 0;
    },

    getXPForNextLevel: (level) => {
        const thresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000, 30000];
        return thresholds[level + 1] || thresholds[thresholds.length - 1];
    },

    getRank: (level) => {
        if (level >= 10) return { name: 'Master', icon: '👑', color: '#fbbf24' };
        if (level >= 8) return { name: 'Expert', icon: '💎', color: '#a855f7' };
        if (level >= 6) return { name: 'Advanced', icon: '🌟', color: '#3b82f6' };
        if (level >= 4) return { name: 'Intermediate', icon: '📈', color: '#22c55e' };
        if (level >= 2) return { name: 'Learner', icon: '📚', color: '#22d3ee' };
        return { name: 'Beginner', icon: '🌱', color: '#6b7280' };
    }
};
