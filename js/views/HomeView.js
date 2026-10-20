/**
 * HomeView.js - Home Dashboard
 */

const HomeView = {
    render: () => {
        const user = AppState.getState('user');
        const xpForNext = HomeView.getXPForNextLevel(user.level);
        const currentLevelXP = HomeView.getXPForLevel(user.level);
        const progress = Math.min(100, ((user.xp - currentLevelXP) / (xpForNext - currentLevelXP)) * 100);
        const accuracy = user.totalAnswered > 0 ? Math.round((user.totalCorrect / user.totalAnswered) * 100) : 0;
        const isLoggedIn = typeof Auth !== 'undefined' && Auth.isLoggedIn();
        const username = isLoggedIn ? Auth.getCurrentUser()?.username : 'there';
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

        return `
            <div class="home-view">
                <div class="home-main">
                    <!-- Simple Welcome -->
                    <div class="welcome-section">
                        <h1>${greeting}, ${username}!</h1>
                        <p>What would you like to study today?</p>
                    </div>

                    <!-- Quick Actions -->
                    <div class="quick-actions">
                        <button class="quick-action" onclick="Router.navigate('learn')">
                            <span class="qa-icon">📖</span>
                            <span class="qa-text">
                                <strong>Study Notes</strong>
                                <small>Read revision notes</small>
                            </span>
                        </button>
                        <button class="quick-action" onclick="Router.navigate('practice')">
                            <span class="qa-icon">✏️</span>
                            <span class="qa-text">
                                <strong>Practice Quiz</strong>
                                <small>Test your knowledge</small>
                            </span>
                        </button>
                        <button class="quick-action" onclick="Router.navigate('games')">
                            <span class="qa-icon">🎮</span>
                            <span class="qa-text">
                                <strong>Play Games</strong>
                                <small>Learn while having fun</small>
                            </span>
                        </button>
                        <button class="quick-action" onclick="DailyChallenge.start()">
                            <span class="qa-icon">🎯</span>
                            <span class="qa-text">
                                <strong>Daily Challenge</strong>
                                <small>5 questions, bonus XP</small>
                            </span>
                        </button>
                    </div>

                    <!-- Topics Grid -->
                    <div class="topics-section">
                        <h2>Topics</h2>
                        <div class="topics-grid">
                            ${TOPICS.map(topic => `
                                <button class="topic-card" onclick="Router.navigate('learn'); setTimeout(() => LearnView.selectTopic('${topic.id}'), 100)">
                                    <span class="tc-icon">${topic.icon}</span>
                                    <span class="tc-name">${topic.name}</span>
                                    <span class="tc-count">${topic.subtopics.length} subtopics</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Recent / Continue -->
                    <div class="continue-section">
                        <h2>Tools</h2>
                        <div class="tools-row">
                            <button class="tool-btn" onclick="Router.navigate('tools')">
                                <span>🔢</span> Binary Converter
                            </button>
                            <button class="tool-btn" onclick="Router.navigate('tools')">
                                <span>🔌</span> Logic Gates
                            </button>
                            <button class="tool-btn" onclick="Router.navigate('playground')">
                                <span>💻</span> Code Playground
                            </button>
                            <button class="tool-btn" onclick="SearchNotes.open()">
                                <span>🔍</span> Search Notes
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Stats -->
                <div class="home-sidebar">
                    <div class="stats-card">
                        <h3>Your Stats</h3>
                        <div class="stat-row">
                            <span>Level</span>
                            <strong>${user.level}</strong>
                        </div>
                        <div class="stat-row">
                            <span>XP</span>
                            <strong>${user.xp.toLocaleString()}</strong>
                        </div>
                        <div class="xp-progress">
                            <div class="xp-bar-mini">
                                <div class="xp-fill-mini" style="width: ${progress}%"></div>
                            </div>
                            <small>${Math.round(progress)}% to Level ${user.level + 1}</small>
                        </div>
                        <div class="stat-row">
                            <span>Questions</span>
                            <strong>${user.totalAnswered}</strong>
                        </div>
                        <div class="stat-row">
                            <span>Accuracy</span>
                            <strong>${accuracy}%</strong>
                        </div>
                    </div>

                    <div class="streak-card">
                        <div class="streak-icon">🔥</div>
                        <div class="streak-info">
                            <strong>${DailyChallenge.getStreak()} day streak</strong>
                            <small>Keep it going!</small>
                        </div>
                    </div>

                    <div class="tip-card">
                        <strong>💡 Tip</strong>
                        <p>${HomeView.getRandomTip()}</p>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        console.log('🏠 Home view initialized');
    },

    getXPForLevel: (level) => {
        const thresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000];
        return thresholds[level - 1] || 0;
    },

    getXPForNextLevel: (level) => {
        const thresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000, 30000];
        return thresholds[level] || thresholds[thresholds.length - 1];
    },

    getRandomTip: () => {
        const tips = [
            "Use binary shifts for quick multiplication by powers of 2.",
            "Remember: 1 byte = 8 bits, 1 KB = 1024 bytes.",
            "TCP is reliable but slower, UDP is faster but unreliable.",
            "Bubble sort is simple but O(n²) - not efficient for large data.",
            "Always validate user input to prevent errors and security issues.",
            "Decomposition means breaking big problems into smaller parts.",
            "RAM is volatile (loses data when off), ROM is non-volatile.",
            "SQL uses SELECT, FROM, WHERE for database queries.",
            "An algorithm must be finite, precise, and produce a result.",
            "Practice past papers to get familiar with exam question styles."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }
};
