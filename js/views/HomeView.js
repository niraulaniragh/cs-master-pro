/**
 * HomeView.js - Enhanced Home/Dashboard View
 * New Modern Design - Clean, Professional, Inspired
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
            <div class="home-view-new">
                <!-- Hero Section -->
                <section class="hero-new">
                    <div class="hero-left">
                        <span class="hero-greeting">Welcome back</span>
                        <h1 class="hero-name">${username}</h1>
                        <p class="hero-tagline">Continue your Computer Science journey</p>
                        <div class="hero-tags">
                            <span class="hero-tag">Edexcel 4CP0</span>
                            <span class="hero-tag accent">155+ Questions</span>
                        </div>
                    </div>
                    <div class="hero-right">
                        <button class="search-box" onclick="SearchNotes.open()">
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
                            <span class="stat-icon-inner">${user.level}</span>
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
                            <span class="stat-value">${user.xp.toLocaleString()}</span>
                            <span class="stat-desc">Total XP Earned</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon-wrap green">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value">${user.totalCorrect}</span>
                            <span class="stat-desc">Correct Answers</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon-wrap orange">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-value">${user.achievements.length}</span>
                            <span class="stat-desc">Achievements</span>
                        </div>
                    </div>
                </section>

                <!-- Main Grid -->
                <section class="main-grid">
                    <!-- Left Column -->
                    <div class="main-left">
                        <!-- Quick Actions -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>Quick Actions</h2>
                            </div>
                            <div class="quick-grid">
                                <button class="quick-btn" onclick="Router.navigate('learn')">
                                    <div class="quick-icon blue">📚</div>
                                    <span class="quick-label">Learn</span>
                                </button>
                                <button class="quick-btn" onclick="Router.navigate('practice')">
                                    <div class="quick-icon green">🎯</div>
                                    <span class="quick-label">Practice</span>
                                </button>
                                <button class="quick-btn" onclick="Router.navigate('games')">
                                    <div class="quick-icon purple">🎮</div>
                                    <span class="quick-label">Games</span>
                                </button>
                                <button class="quick-btn" onclick="Router.navigate('playground')">
                                    <div class="quick-icon cyan">💻</div>
                                    <span class="quick-label">Code</span>
                                </button>
                            </div>
                        </div>

                        <!-- Progress Card -->
                        <div class="card-new progress-card-new">
                            <div class="card-header">
                                <h2>Your Progress</h2>
                                <span class="card-badge">${accuracy}% Accuracy</span>
                            </div>
                            <div class="progress-content">
                                <div class="level-badge-big">
                                    <span class="level-number">${user.level}</span>
                                    <span class="level-text">LEVEL</span>
                                </div>
                                <div class="progress-details">
                                    <div class="progress-row">
                                        <span>Next Level</span>
                                        <span>${user.xp} / ${xpForNext} XP</span>
                                    </div>
                                    <div class="progress-bar-new">
                                        <div class="progress-fill-new" style="width: ${progress}%"></div>
                                    </div>
                                    <span class="progress-hint">${(xpForNext - user.xp).toLocaleString()} XP to go</span>
                                </div>
                            </div>
                        </div>

                        <!-- Topics -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>Topics</h2>
                                <button class="link-btn" onclick="Router.navigate('learn')">View all →</button>
                            </div>
                            <div class="topics-list">
                                ${TOPICS.slice(0, 4).map(topic => {
                                    const questionCount = QUESTIONS.filter(q => q.topic === topic.id).length;
                                    return `
                                        <div class="topic-row" onclick="Router.navigate('learn'); setTimeout(() => LearnView.selectTopic('${topic.id}'), 100)">
                                            <div class="topic-icon-new" style="background: ${topic.color}">${topic.icon}</div>
                                            <div class="topic-details">
                                                <span class="topic-title">${topic.name}</span>
                                                <span class="topic-sub">${topic.subtopics.length} subtopics • ${questionCount} questions</span>
                                            </div>
                                            <i class="fas fa-chevron-right topic-arrow"></i>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="main-right">
                        <!-- Daily Challenge -->
                        <div class="card-new highlight-card">
                            <div class="highlight-icon">⚡</div>
                            <div class="highlight-content">
                                <h3>Daily Challenge</h3>
                                <p>Complete today's challenge for bonus XP!</p>
                                <button class="btn-new primary" onclick="DailyChallenge.start()">Start Challenge</button>
                            </div>
                        </div>

                        <!-- Leaderboard -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>Leaderboard</h2>
                                <span class="card-badge green">Live</span>
                            </div>
                            <div class="leaderboard-list">
                                ${HomeView.renderLeaderboard()}
                            </div>
                        </div>

                        <!-- Achievements -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>Achievements</h2>
                                <span class="card-badge">${user.achievements.length}/${ACHIEVEMENTS.length}</span>
                            </div>
                            <div class="achievements-grid">
                                ${ACHIEVEMENTS.slice(0, 6).map(ach => {
                                    const unlocked = user.achievements.includes(ach.id);
                                    return `
                                        <div class="ach-item ${unlocked ? 'unlocked' : ''}" title="${ach.description}">
                                            <span class="ach-emoji">${unlocked ? ach.icon : '🔒'}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Classroom Section (for students) -->
                ${HomeView.renderClassroomSection()}
                
                <!-- Assignments Section (for students) -->
                ${Auth.isStudent() ? AssignmentView.renderStudentAssignments() : ''}
            </div>
        `;
    },
    
    renderLeaderboard: () => {
        const leaders = Leaderboard.getTop(5);
        if (leaders.length === 0) {
            return '<p class="empty-text">No players yet</p>';
        }
        return leaders.map((p, i) => `
            <div class="lb-row-new">
                <span class="lb-rank-new ${i < 3 ? 'top' + (i+1) : ''}">${i + 1}</span>
                <span class="lb-name-new">${p.username}</span>
                <span class="lb-xp-new">${p.xp.toLocaleString()} XP</span>
            </div>
        `).join('');
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
    }
};
