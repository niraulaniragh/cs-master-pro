/**
 * HomeView.js - Enhanced Home/Dashboard View
 * Features: Better stats, visual progress charts, study streaks, topic progress
 */

const HomeView = {
    render: () => {
        const user = AppState.getState('user');
        const xpForNext = HomeView.getXPForNextLevel(user.level);
        const currentLevelXP = HomeView.getXPForLevel(user.level);
        const progress = Math.min(100, ((user.xp - currentLevelXP) / (xpForNext - currentLevelXP)) * 100);
        const accuracy = user.totalAnswered > 0 ? Math.round((user.totalCorrect / user.totalAnswered) * 100) : 0;
        const rank = HomeView.getRank(user.level);

        return `
            <div class="home-view">
                <section class="hero">
                    <div class="hero-content">
                        <h1>🎓 CS Master Pro</h1>
                        <p class="hero-subtitle">Master IGCSE Computer Science • Edexcel 4CP0</p>
                        <div class="hero-badges">
                            <span class="badge badge-purple">Paper 1 & 2 Complete</span>
                            <span class="badge badge-green">155+ Questions</span>
                            <span class="badge badge-cyan">Interactive Tools</span>
                        </div>
                    </div>
                </section>

                <section class="dashboard-grid">
                    <!-- Main Stats Panel -->
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
                    </div>

                    <!-- Stats Cards -->
                    <div class="dashboard-panel stats-panel">
                        <div class="panel-header">
                            <h3>📈 Statistics</h3>
                        </div>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-icon-box purple">✅</div>
                                <div class="stat-details">
                                    <span class="stat-value">${user.totalCorrect}</span>
                                    <span class="stat-label">Correct Answers</span>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-icon-box blue">📝</div>
                                <div class="stat-details">
                                    <span class="stat-value">${user.totalAnswered}</span>
                                    <span class="stat-label">Questions Answered</span>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-icon-box green">🎯</div>
                                <div class="stat-details">
                                    <span class="stat-value">${accuracy}%</span>
                                    <span class="stat-label">Accuracy Rate</span>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-icon-box orange">🏆</div>
                                <div class="stat-details">
                                    <span class="stat-value">${user.achievements.length}/${ACHIEVEMENTS.length}</span>
                                    <span class="stat-label">Achievements</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Accuracy Visual -->
                        <div class="accuracy-visual">
                            <div class="accuracy-bar-container">
                                <div class="accuracy-bar" style="width: ${accuracy}%"></div>
                            </div>
                            <div class="accuracy-labels">
                                <span>0%</span>
                                <span class="accuracy-current">${accuracy}% Accuracy</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Quick Actions -->
                <section class="quick-actions">
                    <h3>🚀 Quick Start</h3>
                    <div class="action-grid">
                        <button class="action-card" onclick="Router.navigate('learn')">
                            <span class="action-icon">📚</span>
                            <span class="action-title">Learn</span>
                            <span class="action-desc">Study revision notes with ${TOPICS.reduce((acc, t) => acc + t.subtopics.length, 0)}+ subtopics</span>
                        </button>
                        <button class="action-card highlight" onclick="Router.navigate('practice')">
                            <span class="action-icon">🎯</span>
                            <span class="action-title">Practice</span>
                            <span class="action-desc">Quiz mode & Flashcards with 155+ questions</span>
                        </button>
                        <button class="action-card" onclick="Router.navigate('tools')">
                            <span class="action-icon">🔧</span>
                            <span class="action-title">Tools</span>
                            <span class="action-desc">Binary converter, Logic gates & more</span>
                        </button>
                        <button class="action-card" onclick="Router.navigate('playground')">
                            <span class="action-icon">💻</span>
                            <span class="action-title">Code</span>
                            <span class="action-desc">Write & trace code with trace tables</span>
                        </button>
                    </div>
                </section>

                <!-- Topic Progress -->
                <section class="topic-progress-section">
                    <h3>📖 Topics Overview</h3>
                    <p class="section-subtitle">Click any topic to start learning</p>
                    <div class="topics-progress-grid">
                        ${TOPICS.map(topic => {
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
                                    <div class="topic-subtopics">
                                        ${topic.subtopics.slice(0, 3).map(sub => `<span class="subtopic-tag">${sub}</span>`).join('')}
                                        ${topic.subtopics.length > 3 ? `<span class="subtopic-more">+${topic.subtopics.length - 3} more</span>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </section>

                <!-- Achievements -->
                <section class="achievements-section">
                    <div class="section-header">
                        <h3>🏆 Achievements</h3>
                        <span class="achievement-count">${user.achievements.length}/${ACHIEVEMENTS.length} Unlocked</span>
                    </div>
                    <div class="achievements-grid">
                        ${ACHIEVEMENTS.map(ach => {
                            const unlocked = user.achievements.includes(ach.id);
                            return `
                                <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}" title="${ach.description}">
                                    <span class="ach-icon">${unlocked ? ach.icon : '🔒'}</span>
                                    <div class="ach-info">
                                        <span class="ach-name">${ach.name}</span>
                                        <span class="ach-desc">${ach.description}</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </section>

                <!-- Study Tips -->
                <section class="study-tips-section">
                    <h3>💡 Study Tips</h3>
                    <div class="tips-grid">
                        <div class="tip-card">
                            <span class="tip-icon">📖</span>
                            <div class="tip-content">
                                <h4>Read First, Quiz Later</h4>
                                <p>Study the revision notes for each topic before testing yourself with quizzes.</p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <span class="tip-icon">🔄</span>
                            <div class="tip-content">
                                <h4>Spaced Repetition</h4>
                                <p>Use flashcards regularly. Mark cards for review and revisit them daily.</p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <span class="tip-icon">🎯</span>
                            <div class="tip-content">
                                <h4>Focus on Weak Areas</h4>
                                <p>After each quiz, review the questions you got wrong and read the explanations.</p>
                            </div>
                        </div>
                        <div class="tip-card">
                            <span class="tip-icon">🔧</span>
                            <div class="tip-content">
                                <h4>Practice with Tools</h4>
                                <p>Use interactive tools to understand binary, logic gates, and algorithms visually.</p>
                            </div>
                        </div>
                    </div>
                </section>
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
