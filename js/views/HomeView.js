/**
 * HomeView.js - Enhanced Home/Dashboard View
 * New Modern Design - Clean, Professional
 * Includes Onboarding Flow and Daily Goals Widget
 */

const HomeView = {
    // Daily Goals Configuration
    DAILY_GOALS: {
        questions: { target: 20, icon: '📝', label: 'Questions Answered' },
        correct: { target: 15, icon: '✅', label: 'Correct Answers' },
        topics: { target: 3, icon: '📚', label: 'Topics Studied' },
        games: { target: 2, icon: '🎮', label: 'Games Played' }
    },
    
    ONBOARDING_KEY: 'csmaster_onboarding_complete',
    PREFERENCES_KEY: 'csmaster_user_preferences',
    DAILY_GOALS_KEY: 'csmaster_daily_goals',
    
    render: () => {
        // Check for onboarding (skip if demo mode is active)
        const hasCompletedOnboarding = localStorage.getItem(HomeView.ONBOARDING_KEY) === 'true';
        const isDemoMode = typeof DemoMode !== 'undefined' && DemoMode.isActive();
        
        // Schedule onboarding check after render (skip in demo mode)
        if (!hasCompletedOnboarding && !isDemoMode) {
            setTimeout(() => HomeView.showOnboarding(), 500);
        }
        const user = AppState.getState('user') || {};
        const level = user.level || 1;
        const xp = user.xp || 0;
        const totalCorrect = user.totalCorrect || 0;
        const totalAnswered = user.totalAnswered || 0;
        
        const xpForNext = HomeView.getXPForNextLevel(level);
        const currentLevelXP = HomeView.getXPForLevel(level);
        const progress = Math.min(100, ((xp - currentLevelXP) / (xpForNext - currentLevelXP)) * 100) || 0;
        const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
        const rank = HomeView.getRank(level);
        const isLoggedIn = typeof Auth !== 'undefined' && Auth.isLoggedIn();
        const username = isLoggedIn ? (Auth.getSession()?.username || 'Student') : 'Student';
        const totalQuestions = (typeof QUESTIONS !== 'undefined' && QUESTIONS?.length) || 0;

        return `
            <div class="home-view-new">
                <!-- Hero Section -->
                <section class="hero-new">
                    <div class="hero-left">
                        <span class="hero-greeting">Welcome back</span>
                        <h1 class="hero-name">${Helpers.escapeHtml(username)}</h1>
                        <p class="hero-tagline">Continue your Computer Science journey</p>
                        <div class="hero-tags">
                            <span class="hero-tag">Edexcel 4CP0</span>
                            <span class="hero-tag accent">${totalQuestions}+ Questions</span>
                        </div>
                    </div>
                    <div class="hero-right">
                        <button class="search-box" onclick="typeof SearchNotes !== 'undefined' && SearchNotes.open()">
                            <i class="fas fa-search"></i>
                            <span>Search topics, notes...</span>
                            <kbd>⌘K</kbd>
                        </button>
                    </div>
                </section>

                <!-- Stats Overview -->
                <section class="stats-overview">
                    <div class="stat-card primary">
                        <div class="stat-icon-wrap">
                            <span class="stat-icon-inner">${level}</span>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value">${rank.name}</span>
                            <span class="stat-desc">${rank.icon} Current Rank</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon-wrap blue">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value" data-counter="xp" data-value="${xp}">0</span>
                            <span class="stat-desc">Total XP</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon-wrap green">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value" data-counter="correct" data-value="${totalCorrect}">0</span>
                            <span class="stat-desc">Correct</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon-wrap orange">
                            <i class="fas fa-percent"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value" data-counter="accuracy" data-value="${accuracy}">0</span>
                            <span class="stat-desc">Accuracy</span>
                        </div>
                    </div>
                </section>

                <!-- Quick Actions - Full Width -->
                <section class="quick-actions-section">
                    <div class="card-new">
                        <div class="card-header">
                            <h2>🚀 Quick Actions</h2>
                        </div>
                        <div class="quick-grid-6">
                            <button class="quick-btn-new" onclick="Router.navigate('learn')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #3b82f6, #60a5fa);">📚</div>
                                <div class="quick-info">
                                    <span class="quick-title">Learn</span>
                                    <span class="quick-desc">Study notes</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="Router.navigate('practice')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #10b981, #34d399);">🎯</div>
                                <div class="quick-info">
                                    <span class="quick-title">Practice</span>
                                    <span class="quick-desc">Quiz yourself</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="Router.navigate('games')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #8b5cf6, #a78bfa);">🎮</div>
                                <div class="quick-info">
                                    <span class="quick-title">Games</span>
                                    <span class="quick-desc">Fun learning</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="Router.navigate('playground')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">💻</div>
                                <div class="quick-info">
                                    <span class="quick-title">Code</span>
                                    <span class="quick-desc">Write code</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="Router.navigate('tools')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #f97316, #fb923c);">🔧</div>
                                <div class="quick-info">
                                    <span class="quick-title">Tools</span>
                                    <span class="quick-desc">Converters</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="Router.navigate('pastpapers')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #ec4899, #f472b6);">📝</div>
                                <div class="quick-info">
                                    <span class="quick-title">Past Papers</span>
                                    <span class="quick-desc">Exam practice</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Main Grid -->
                <section class="main-grid">
                    <!-- Left Column -->
                    <div class="main-left">
                        <!-- Daily Goals Widget -->
                        ${HomeView.renderDailyGoals()}
                        
                        <!-- Streak Widget -->
                        <div class="card-new streak-card">
                            ${typeof StreakSystem !== 'undefined' ? StreakSystem.renderWidget() : '<p>Loading streaks...</p>'}
                        </div>
                        
                        <!-- Progress Card -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>📊 Your Progress</h2>
                            </div>
                            <div class="progress-content-new">
                                <div class="level-badge-large">
                                    <span class="level-num-lg">${level}</span>
                                    <span class="level-label-sm">LEVEL</span>
                                </div>
                                <div class="progress-info">
                                    <div class="progress-title">${rank.name} ${rank.icon}</div>
                                    <div class="progress-bar-wrap">
                                        <div class="progress-bar-bg">
                                            <div class="progress-bar-fill" style="width: ${progress}%"></div>
                                        </div>
                                        <span class="progress-text">${xp} / ${xpForNext} XP</span>
                                    </div>
                                    <p class="progress-next">${(xpForNext - user.xp).toLocaleString()} XP until Level ${user.level + 1}</p>
                                </div>
                            </div>
                            <div class="progress-stats">
                                <div class="p-stat">
                                    <span class="p-stat-val">${totalAnswered}</span>
                                    <span class="p-stat-lbl">Answered</span>
                                </div>
                                <div class="p-stat">
                                    <span class="p-stat-val">${totalCorrect}</span>
                                    <span class="p-stat-lbl">Correct</span>
                                </div>
                                <div class="p-stat">
                                    <span class="p-stat-val">${user.achievements?.length || 0}</span>
                                    <span class="p-stat-lbl">Badges</span>
                                </div>
                            </div>
                        </div>

                        <!-- Topics -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>📖 Study Topics</h2>
                                <button class="link-btn" onclick="Router.navigate('learn')">View all →</button>
                            </div>
                            <div class="topics-list-new">
                                ${(TOPICS || []).slice(0, 6).map(topic => {
                                    const questionCount = (QUESTIONS || []).filter(q => q.topic === topic.id).length;
                                    return `
                                        <div class="topic-item" onclick="Router.navigate('learn'); setTimeout(() => LearnView.selectTopic('${topic.id}'), 100)">
                                            <div class="topic-icon-box" style="background: ${topic.color}20; color: ${topic.color};">${topic.icon}</div>
                                            <div class="topic-text">
                                                <span class="topic-name">${topic.name}</span>
                                                <span class="topic-meta">${topic.subtopics?.length || 0} subtopics • ${questionCount} Qs</span>
                                            </div>
                                            <i class="fas fa-chevron-right"></i>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="main-right">
                        <!-- Leaderboard -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>🏆 Leaderboard</h2>
                                <span class="live-badge">● Live</span>
                            </div>
                            <div class="leaderboard-new">
                                ${HomeView.renderLeaderboard()}
                            </div>
                        </div>

                        <!-- Achievements -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>🎖️ Achievements</h2>
                                <span class="count-badge">${user.achievements?.length || 0}/${ACHIEVEMENTS?.length || 0}</span>
                            </div>
                            <div class="achievements-new">
                                ${(ACHIEVEMENTS || []).slice(0, 8).map(ach => {
                                    const unlocked = user.achievements?.includes(ach.id);
                                    return `
                                        <div class="ach-item-new ${unlocked ? 'unlocked' : ''}" title="${ach.name}: ${ach.description}">
                                            <span class="ach-icon">${unlocked ? ach.icon : '🔒'}</span>
                                            <span class="ach-name">${ach.name}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Study Tip -->
                        <div class="card-new tip-card">
                            <div class="tip-icon">💡</div>
                            <div class="tip-content">
                                <h3>Study Tip</h3>
                                <p>${HomeView.getRandomTip()}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Classroom Section (for students) -->
                ${HomeView.renderClassroomSection()}
            </div>
        `;
    },
    
    renderLeaderboard: () => {
        try {
            if (typeof Leaderboard === 'undefined') {
                return '<p class="empty-text">Leaderboard loading...</p>';
            }
            const leaders = Leaderboard.getRankings().slice(0, 5);
            if (!leaders || leaders.length === 0) {
                return '<p class="empty-text">No players yet. Be the first!</p>';
            }
            return leaders.map((p, i) => `
                <div class="lb-item ${p.isCurrentUser ? 'is-me' : ''}">
                    <span class="lb-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</span>
                    <span class="lb-name">${Helpers.escapeHtml(p.username || 'Anonymous')}</span>
                    <span class="lb-xp">${(p.xp || 0).toLocaleString()} XP</span>
                </div>
            `).join('');
        } catch (e) {
            console.error('Leaderboard error:', e);
            return '<p class="empty-text">Could not load leaderboard</p>';
        }
    },
    
    getRandomTip: () => {
        const tips = [
            "Practice a little every day for the best results!",
            "Use flashcards to memorize key terms and definitions.",
            "Try explaining concepts to others - it helps you learn!",
            "Take breaks every 25 minutes using the Pomodoro technique.",
            "Review your mistakes - they're your best teachers!",
            "Write pseudocode before actual code to plan your logic.",
            "Binary and hexadecimal conversions get easier with practice!"
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    },

    init: () => {
        console.log('🏠 Home view initialized');
        
        // After render, animate the counters
        setTimeout(() => {
            const xpEl = document.querySelector('.stat-value[data-counter="xp"]');
            const correctEl = document.querySelector('.stat-value[data-counter="correct"]');
            const accuracyEl = document.querySelector('.stat-value[data-counter="accuracy"]');
            
            if (xpEl) {
                const xpValue = parseInt(xpEl.getAttribute('data-value')) || 0;
                Helpers.animateCounter(xpEl, 0, xpValue, 1500);
            }
            if (correctEl) {
                const correctValue = parseInt(correctEl.getAttribute('data-value')) || 0;
                Helpers.animateCounter(correctEl, 0, correctValue, 1200);
            }
            if (accuracyEl) {
                const accuracyValue = parseInt(accuracyEl.getAttribute('data-value')) || 0;
                Helpers.animateCounter(accuracyEl, 0, accuracyValue, 1000, '%');
            }
        }, 100);
    },

    cleanup: () => {
        // No intervals or event listeners to clean up
        console.log('🏠 Home view cleanup');
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
        if (level >= 8) return { name: 'Expert', icon: '💎', color: '#10b981' };
        if (level >= 6) return { name: 'Advanced', icon: '🌟', color: '#3b82f6' };
        if (level >= 4) return { name: 'Intermediate', icon: '📈', color: '#22c55e' };
        if (level >= 2) return { name: 'Learner', icon: '📚', color: '#22d3ee' };
        return { name: 'Beginner', icon: '🌱', color: '#6b7280' };
    },
    
    // Classroom section for students
    renderClassroomSection: () => {
        // Only show for students
        if (!Auth.isStudent()) return '';
        
        const classrooms = Classroom.getStudentClassrooms();
        const availableGames = Classroom.getAvailableGames();
        
        return `
            <section class="classroom-section">
                <div class="section-header-row">
                    <h3>🏫 My Classrooms</h3>
                </div>
                
                <!-- Prominent Join Buttons -->
                <div class="join-buttons-row">
                    <button class="join-big-btn join-classroom-btn" onclick="HomeView.showJoinClassroom()">
                        <span class="join-icon">🏫</span>
                        <span class="join-text">
                            <span class="join-title">Join Classroom</span>
                            <span class="join-subtitle">Enter teacher's code</span>
                        </span>
                        <span class="join-arrow">→</span>
                    </button>
                    <button class="join-big-btn join-game-btn" onclick="HomeView.showJoinGame()">
                        <span class="join-icon">🎮</span>
                        <span class="join-text">
                            <span class="join-title">Join Game</span>
                            <span class="join-subtitle">Enter game code</span>
                        </span>
                        <span class="join-arrow">→</span>
                    </button>
                </div>
                
                ${classrooms.length === 0 ? `
                    <div class="no-classrooms-card">
                        <span class="no-classroom-icon">🏫</span>
                        <p>You haven't joined any classrooms yet.</p>
                        <p class="hint">Ask your teacher for a classroom code!</p>
                    </div>
                ` : `
                    <div class="classrooms-row">
                        ${classrooms.map(c => `
                            <div class="student-classroom-card">
                                <div class="classroom-info">
                                    <h4>${c.name}</h4>
                                    <p>Teacher: ${c.teacherName}</p>
                                    <span class="student-count">${c.students.length} students</span>
                                </div>
                                <button class="btn btn-tiny btn-secondary" onclick="HomeView.leaveClassroom('${c.code}')">
                                    Leave
                                </button>
                            </div>
                        `).join('')}
                    </div>
                `}
                
                ${availableGames.length > 0 ? `
                    <div class="live-games">
                        <h4>🎮 Live Games</h4>
                        <div class="live-games-list">
                            ${availableGames.map(g => `
                                <div class="live-game-card">
                                    <span class="game-icon">${g.gameType === 'race' ? '🏎️' : '⚡'}</span>
                                    <div class="game-details">
                                        <span class="game-name">${g.gameType === 'race' ? 'Car Race' : 'Speed Run'}</span>
                                        <span class="game-classroom">${g.classroomName}</span>
                                        <span class="game-status-badge status-${g.status}">${g.status}</span>
                                    </div>
                                    <button class="btn btn-small btn-primary" onclick="HomeView.joinGame('${g.id}')">
                                        ${g.status === 'waiting' ? 'Join' : 'Watch'}
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </section>
        `;
    },
    
    showJoinClassroom: () => {
        Modal.show({
            title: '🏫 Join a Classroom',
            content: `
                <div class="join-classroom-form">
                    <p>Enter the 6-character code from your teacher:</p>
                    <div class="code-input-wrapper">
                        <input type="text" id="classroom-code-input" 
                               placeholder="e.g., ABC123" 
                               maxlength="6"
                               style="text-transform: uppercase; font-family: var(--font-mono); font-size: 1.5rem; text-align: center; letter-spacing: 0.3em;">
                    </div>
                    <p class="join-note">💡 For testing: Create a classroom as a teacher first, then switch to student mode to join it.</p>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" id="join-cancel">Cancel</button>
                <button class="btn btn-primary" id="join-submit">Join Classroom</button>
            `
        });
        
        setTimeout(() => {
            document.getElementById('classroom-code-input')?.focus();
            document.getElementById('join-cancel')?.addEventListener('click', Modal.close);
            document.getElementById('join-submit')?.addEventListener('click', () => {
                const code = document.getElementById('classroom-code-input').value.trim().toUpperCase();
                if (code.length !== 6) {
                    Toast.show('Please enter a 6-character code', 'error');
                    return;
                }
                
                const result = Classroom.join(code);
                if (result.success) {
                    Modal.close();
                    Toast.show(`Joined ${result.classroom.name}!`, 'success');
                    // Refresh the page
                    Router.navigate('home');
                } else {
                    Toast.show(result.error, 'error');
                }
            });
        }, 0);
    },
    
    leaveClassroom: (code) => {
        const classroom = Classroom.get(code);
        if (confirm(`Leave "${classroom?.name}"? You can rejoin later with the code.`)) {
            const result = Classroom.leave(code);
            if (result.success) {
                Toast.show('Left classroom', 'info');
                Router.navigate('home');
            } else {
                Toast.show(result.error, 'error');
            }
        }
    },
    
    joinGame: (gameId) => {
        const result = Classroom.joinGame(gameId);
        if (result.success) {
            const game = result.game;
            if (game.gameType === 'race') {
                CarRace.startAsPlayer(game);
            } else if (game.gameType === 'crypto') {
                CryptoHack.startAsPlayer(game);
            } else if (game.gameType === 'tower') {
                TowerDefense.startAsPlayer(game);
            } else if (game.gameType === 'factory') {
                Factory.startAsPlayer(game);
            } else if (game.gameType === 'gold') {
                GoldQuest.startAsPlayer(game);
            }
        } else {
            Toast.show(result.error, 'error');
        }
    },
    
    showJoinGame: () => {
        Modal.show({
            title: '🎮 Join a Game',
            content: `
                <div class="join-game-form">
                    <p>Enter the game code from your teacher:</p>
                    <div class="code-input-wrapper large-code">
                        <input type="text" id="game-code-input" 
                               placeholder="XXXXXX" 
                               maxlength="6"
                               autocomplete="off"
                               style="text-transform: uppercase; font-family: var(--font-mono); font-size: 2rem; text-align: center; letter-spacing: 0.4em; padding: 15px;">
                    </div>
                    <p class="join-hint">Game codes are 6 characters long</p>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" id="game-join-cancel">Cancel</button>
                <button class="btn btn-primary" id="game-join-submit">Join Game</button>
            `
        });
        
        setTimeout(() => {
            const input = document.getElementById('game-code-input');
            input?.focus();
            
            // Auto-uppercase while typing
            input?.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
            });
            
            document.getElementById('game-join-cancel')?.addEventListener('click', Modal.close);
            document.getElementById('game-join-submit')?.addEventListener('click', () => {
                const code = document.getElementById('game-code-input').value.trim().toUpperCase();
                if (code.length !== 6) {
                    Toast.show('Please enter a 6-character game code', 'error');
                    return;
                }
                
                // Find the game by code
                const game = Classroom.findGameByCode(code);
                if (game) {
                    Modal.close();
                    HomeView.joinGame(game.id);
                } else {
                    Toast.show('Game not found. Check the code and try again.', 'error');
                }
            });
        }, 0);
    },
    
    // ==========================================
    // ONBOARDING FLOW
    // ==========================================
    
    showOnboarding: () => {
        const preferences = HomeView.getUserPreferences();
        
        Modal.show({
            title: '👋 Welcome to CS Master Pro!',
            content: `
                <div class="onboarding-form">
                    <p class="onboarding-intro">Let's personalize your learning experience. This only takes a minute!</p>
                    
                    <div class="onboarding-section">
                        <label class="onboarding-label">📅 When is your exam?</label>
                        <input type="date" id="onboarding-exam-date" class="onboarding-input" 
                               value="${preferences.examDate || ''}"
                               min="${new Date().toISOString().split('T')[0]}">
                        <span class="onboarding-hint">We'll help you stay on track!</span>
                    </div>
                    
                    <div class="onboarding-section">
                        <label class="onboarding-label">📊 What's your current skill level?</label>
                        <div class="skill-level-options">
                            <button type="button" class="skill-btn ${preferences.skillLevel === 'beginner' ? 'selected' : ''}" data-level="beginner">
                                🌱 Beginner
                                <span>Just starting out</span>
                            </button>
                            <button type="button" class="skill-btn ${preferences.skillLevel === 'intermediate' ? 'selected' : ''}" data-level="intermediate">
                                📈 Intermediate
                                <span>Know the basics</span>
                            </button>
                            <button type="button" class="skill-btn ${preferences.skillLevel === 'advanced' ? 'selected' : ''}" data-level="advanced">
                                🚀 Advanced
                                <span>Preparing for exam</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="onboarding-section">
                        <label class="onboarding-label">🎯 Which topics do you find challenging? (Select any)</label>
                        <div class="weak-topics-grid">
                            ${(TOPICS || []).map(topic => `
                                <label class="topic-checkbox ${(preferences.weakTopics || []).includes(topic.id) ? 'selected' : ''}">
                                    <input type="checkbox" value="${topic.id}" ${(preferences.weakTopics || []).includes(topic.id) ? 'checked' : ''}>
                                    <span class="topic-icon" style="background: ${topic.color}20; color: ${topic.color};">${topic.icon}</span>
                                    <span class="topic-name">${topic.name}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <style>
                    .onboarding-form { max-width: 500px; margin: 0 auto; }
                    .onboarding-intro { text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem; }
                    .onboarding-section { margin-bottom: 1.5rem; }
                    .onboarding-label { display: block; font-weight: 600; margin-bottom: 0.5rem; }
                    .onboarding-input { width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary); font-size: 1rem; }
                    .onboarding-hint { display: block; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem; }
                    .skill-level-options { display: flex; gap: 0.75rem; flex-wrap: wrap; }
                    .skill-btn { flex: 1; min-width: 120px; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--bg-secondary); cursor: pointer; text-align: center; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
                    .skill-btn span { font-size: 0.8rem; color: var(--text-muted); }
                    .skill-btn:hover { border-color: var(--primary); }
                    .skill-btn.selected { border-color: var(--primary); background: var(--primary-light); }
                    .weak-topics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.5rem; max-height: 200px; overflow-y: auto; padding: 0.5rem; }
                    .topic-checkbox { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 2px solid var(--border); border-radius: 8px; cursor: pointer; transition: all 0.2s; }
                    .topic-checkbox:hover { border-color: var(--primary); }
                    .topic-checkbox.selected { border-color: var(--primary); background: var(--primary-light); }
                    .topic-checkbox input { display: none; }
                    .topic-icon { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
                    .topic-name { font-size: 0.85rem; flex: 1; }
                </style>
            `,
            footer: `
                <button class="btn btn-secondary" id="onboarding-skip">Skip for now</button>
                <button class="btn btn-primary" id="onboarding-save">Let's Go! 🚀</button>
            `
        });
        
        setTimeout(() => {
            // Skill level selection
            document.querySelectorAll('.skill-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.skill-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                });
            });
            
            // Topic checkbox selection - fix visual feedback
            document.querySelectorAll('.topic-checkbox').forEach(label => {
                const checkbox = label.querySelector('input');
                
                // Initial state sync
                if (checkbox.checked) {
                    label.classList.add('selected');
                }
                
                label.addEventListener('click', (e) => {
                    // Prevent double-toggle if clicking directly on checkbox
                    if (e.target.tagName === 'INPUT') {
                        // Let the checkbox handle itself, just update visual
                        setTimeout(() => {
                            label.classList.toggle('selected', checkbox.checked);
                        }, 0);
                    } else {
                        // Toggle checkbox manually
                        checkbox.checked = !checkbox.checked;
                        label.classList.toggle('selected', checkbox.checked);
                    }
                });
            });
            
            // Skip button
            document.getElementById('onboarding-skip')?.addEventListener('click', () => {
                localStorage.setItem(HomeView.ONBOARDING_KEY, 'true');
                Modal.close();
            });
            
            // Save button
            document.getElementById('onboarding-save')?.addEventListener('click', () => {
                const examDate = document.getElementById('onboarding-exam-date')?.value || '';
                const skillLevel = document.querySelector('.skill-btn.selected')?.dataset.level || 'beginner';
                const weakTopics = Array.from(document.querySelectorAll('.topic-checkbox input:checked')).map(cb => cb.value);
                
                const preferences = {
                    examDate,
                    skillLevel,
                    weakTopics,
                    onboardingCompletedAt: new Date().toISOString()
                };
                
                HomeView.saveUserPreferences(preferences);
                localStorage.setItem(HomeView.ONBOARDING_KEY, 'true');
                
                Modal.close();
                Toast.show('Welcome! Your preferences have been saved 🎉', 'success');
                
                // Emit event for other components
                if (typeof EventBus !== 'undefined') {
                    EventBus.emit(EventBus.Events?.USER_PREFERENCES_SAVED || 'user:preferences_saved', preferences);
                }
                
                // Refresh home view to show personalized content
                Router.navigate('home');
            });
        }, 0);
    },
    
    getUserPreferences: () => {
        try {
            const stored = localStorage.getItem(HomeView.PREFERENCES_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    },
    
    saveUserPreferences: (preferences) => {
        try {
            localStorage.setItem(HomeView.PREFERENCES_KEY, JSON.stringify(preferences));
        } catch (e) {
            console.error('Failed to save preferences:', e);
        }
    },
    
    // ==========================================
    // DAILY GOALS SYSTEM
    // ==========================================
    
    getDailyGoalsData: () => {
        try {
            const stored = localStorage.getItem(HomeView.DAILY_GOALS_KEY);
            const data = stored ? JSON.parse(stored) : {};
            
            // Check if it's a new day - reset if needed
            const today = new Date().toDateString();
            if (data.date !== today) {
                return {
                    date: today,
                    questions: 0,
                    correct: 0,
                    topics: [],
                    games: 0
                };
            }
            
            return data;
        } catch (e) {
            return {
                date: new Date().toDateString(),
                questions: 0,
                correct: 0,
                topics: [],
                games: 0
            };
        }
    },
    
    saveDailyGoalsData: (data) => {
        try {
            data.date = new Date().toDateString();
            localStorage.setItem(HomeView.DAILY_GOALS_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save daily goals:', e);
        }
    },
    
    trackQuestion: (isCorrect, topicId = null) => {
        const data = HomeView.getDailyGoalsData();
        data.questions++;
        if (isCorrect) data.correct++;
        
        if (topicId && !data.topics.includes(topicId)) {
            data.topics.push(topicId);
        }
        
        HomeView.saveDailyGoalsData(data);
        
        // Emit event
        if (typeof EventBus !== 'undefined') {
            EventBus.emit(EventBus.Events?.GOAL_PROGRESS || 'goal:progress', data);
        }
        
        // Check for goal completion
        HomeView.checkGoalCompletion(data);
    },
    
    trackGame: () => {
        const data = HomeView.getDailyGoalsData();
        data.games++;
        HomeView.saveDailyGoalsData(data);
        
        if (typeof EventBus !== 'undefined') {
            EventBus.emit(EventBus.Events?.GOAL_PROGRESS || 'goal:progress', data);
        }
        
        HomeView.checkGoalCompletion(data);
    },
    
    trackTopic: (topicId) => {
        const data = HomeView.getDailyGoalsData();
        if (!data.topics.includes(topicId)) {
            data.topics.push(topicId);
            HomeView.saveDailyGoalsData(data);
            
            if (typeof EventBus !== 'undefined') {
                EventBus.emit(EventBus.Events?.GOAL_PROGRESS || 'goal:progress', data);
            }
            
            HomeView.checkGoalCompletion(data);
        }
    },
    
    checkGoalCompletion: (data) => {
        const goals = HomeView.DAILY_GOALS;
        
        if (data.questions >= goals.questions.target && 
            data.correct >= goals.correct.target && 
            data.topics.length >= goals.topics.target && 
            data.games >= goals.games.target) {
            
            // All goals complete!
            if (!data.allGoalsCompleteShown) {
                data.allGoalsCompleteShown = true;
                HomeView.saveDailyGoalsData(data);
                Toast.show('🎉 Amazing! All daily goals completed!', 'success');
                
                if (typeof EventBus !== 'undefined') {
                    EventBus.emit(EventBus.Events?.GOAL_COMPLETE || 'goal:complete', data);
                }
            }
        }
    },
    
    renderDailyGoals: () => {
        const data = HomeView.getDailyGoalsData();
        const goals = HomeView.DAILY_GOALS;
        
        const renderGoalBar = (current, target, icon, label) => {
            const percent = Math.min(100, (current / target) * 100);
            const isComplete = current >= target;
            
            return `
                <div class="daily-goal-item ${isComplete ? 'complete' : ''}">
                    <div class="goal-header">
                        <span class="goal-icon">${icon}</span>
                        <span class="goal-label">${label}</span>
                        <span class="goal-count">${current}/${target}</span>
                    </div>
                    <div class="goal-bar-bg">
                        <div class="goal-bar-fill ${isComplete ? 'complete' : ''}" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
        };
        
        const topicsCount = Array.isArray(data.topics) ? data.topics.length : 0;
        
        return `
            <div class="card-new daily-goals-card">
                <div class="card-header">
                    <h2>🎯 Daily Goals</h2>
                    <span class="goals-reset-time">Resets at midnight</span>
                </div>
                <div class="daily-goals-content">
                    ${renderGoalBar(data.questions, goals.questions.target, goals.questions.icon, goals.questions.label)}
                    ${renderGoalBar(data.correct, goals.correct.target, goals.correct.icon, goals.correct.label)}
                    ${renderGoalBar(topicsCount, goals.topics.target, goals.topics.icon, goals.topics.label)}
                    ${renderGoalBar(data.games, goals.games.target, goals.games.icon, goals.games.label)}
                </div>
            </div>
            
            <style>
                .daily-goals-card { margin-bottom: 1rem; }
                .goals-reset-time { font-size: 0.75rem; color: var(--text-muted); }
                .daily-goals-content { display: flex; flex-direction: column; gap: 0.75rem; }
                .daily-goal-item { padding: 0.5rem 0; }
                .daily-goal-item.complete .goal-icon { animation: bounce 0.5s ease; }
                .goal-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
                .goal-icon { font-size: 1.1rem; }
                .goal-label { flex: 1; font-size: 0.9rem; color: var(--text-secondary); }
                .goal-count { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
                .goal-bar-bg { height: 8px; background: var(--bg-tertiary); border-radius: 4px; overflow: hidden; }
                .goal-bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--primary-light)); border-radius: 4px; transition: width 0.3s ease; }
                .goal-bar-fill.complete { background: linear-gradient(90deg, #10b981, #34d399); }
                @keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
            </style>
        `;
    }

};