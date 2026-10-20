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

                <!-- Classroom Section (for students) -->
                ${HomeView.renderClassroomSection()}
                
                <!-- Assignments Section (for students) -->
                ${Auth.isStudent() ? AssignmentView.renderStudentAssignments() : ''}

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
