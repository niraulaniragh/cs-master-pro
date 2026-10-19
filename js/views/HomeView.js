/**
 * HomeView.js - Home/Dashboard View
 */

const HomeView = {
    render: () => {
        const user = AppState.getState('user');
        const xpForNext = HomeView.getXPForNextLevel(user.level);
        const currentLevelXP = HomeView.getXPForLevel(user.level);
        const progress = Math.min(100, ((user.xp - currentLevelXP) / (xpForNext - currentLevelXP)) * 100);

        return `
            <div class="home-view">
                <section class="hero">
                    <h1>🎓 CS Master Pro</h1>
                    <p class="hero-subtitle">Master IGCSE Computer Science with interactive learning</p>
                </section>

                <section class="stats-overview">
                    <div class="stat-card">
                        <div class="stat-icon">⚡</div>
                        <div class="stat-value">${user.xp}</div>
                        <div class="stat-label">Total XP</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-value">${user.level}</div>
                        <div class="stat-label">Level</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-value">${user.totalCorrect}</div>
                        <div class="stat-label">Correct</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🏆</div>
                        <div class="stat-value">${user.achievements.length}/${ACHIEVEMENTS.length}</div>
                        <div class="stat-label">Achievements</div>
                    </div>
                </section>

                <section class="progress-section">
                    <h3>Level Progress</h3>
                    <div class="level-progress">
                        <div class="level-badge">Lv ${user.level}</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="level-badge">Lv ${user.level + 1}</div>
                    </div>
                    <p class="progress-text">${user.xp} / ${xpForNext} XP</p>
                </section>

                <section class="quick-actions">
                    <h3>Quick Start</h3>
                    <div class="action-grid">
                        <button class="action-card" onclick="Router.navigate('learn')">
                            <span class="action-icon">📚</span>
                            <span class="action-title">Learn</span>
                            <span class="action-desc">Study revision notes</span>
                        </button>
                        <button class="action-card" onclick="Router.navigate('practice')">
                            <span class="action-icon">🎯</span>
                            <span class="action-title">Practice</span>
                            <span class="action-desc">Test your knowledge</span>
                        </button>
                        <button class="action-card" onclick="Router.navigate('tools')">
                            <span class="action-icon">🔧</span>
                            <span class="action-title">Tools</span>
                            <span class="action-desc">Interactive tools</span>
                        </button>
                        <button class="action-card" onclick="Router.navigate('playground')">
                            <span class="action-icon">💻</span>
                            <span class="action-title">Code</span>
                            <span class="action-desc">Write & trace code</span>
                        </button>
                    </div>
                </section>

                <section class="topics-overview">
                    <h3>Topics</h3>
                    <div class="topics-grid">
                        ${TOPICS.map(topic => `
                            <div class="topic-card" style="--topic-color: ${topic.color}" onclick="Router.navigate('learn'); setTimeout(() => LearnView.selectTopic('${topic.id}'), 100)">
                                <span class="topic-icon">${topic.icon}</span>
                                <span class="topic-name">${topic.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section class="achievements-preview">
                    <h3>Recent Achievements</h3>
                    <div class="achievements-grid">
                        ${ACHIEVEMENTS.slice(0, 5).map(ach => `
                            <div class="achievement ${user.achievements.includes(ach.id) ? 'unlocked' : 'locked'}">
                                <span class="ach-icon">${ach.icon}</span>
                                <span class="ach-name">${ach.name}</span>
                            </div>
                        `).join('')}
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
    }
};
