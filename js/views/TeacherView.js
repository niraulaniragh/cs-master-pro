/**
 * TeacherView.js - Teacher Dashboard
 * Allows teachers to manage classrooms and host games
 */

const TeacherView = {
    currentClassroom: null,
    currentTab: 'classrooms',
    
    render: () => {
        if (!Auth.isTeacher()) {
            return `
                <div class="teacher-view">
                    <div class="access-denied">
                        <span class="denied-icon">🔒</span>
                        <h2>Teacher Access Only</h2>
                        <p>This area is for teacher accounts only.</p>
                        <button class="btn btn-primary" onclick="Router.navigate('home')">Go Home</button>
                    </div>
                </div>
            `;
        }
        
        const classrooms = Classroom.getTeacherClassrooms();
        
        return `
            <div class="teacher-view">
                <div class="teacher-header">
                    <div class="teacher-title">
                        <h1>👩‍🏫 Teacher Dashboard</h1>
                        <p>Manage your classrooms and host games</p>
                    </div>
                    <button class="btn btn-primary" onclick="TeacherView.showCreateClassroom()">
                        <i class="fas fa-plus"></i> Create Classroom
                    </button>
                </div>
                
                <div class="teacher-tabs">
                    <button class="teacher-tab ${TeacherView.currentTab === 'classrooms' ? 'active' : ''}" 
                            onclick="TeacherView.switchTab('classrooms')">
                        🏫 My Classrooms (${classrooms.length})
                    </button>
                    <button class="teacher-tab ${TeacherView.currentTab === 'games' ? 'active' : ''}"
                            onclick="TeacherView.switchTab('games')">
                        🎮 Active Games
                    </button>
                </div>
                
                <div class="teacher-content" id="teacher-content">
                    ${TeacherView.renderContent()}
                </div>
            </div>
        `;
    },
    
    renderContent: () => {
        if (TeacherView.currentTab === 'classrooms') {
            return TeacherView.renderClassrooms();
        } else if (TeacherView.currentTab === 'games') {
            return TeacherView.renderActiveGames();
        }
        return '';
    },
    
    renderClassrooms: () => {
        const classrooms = Classroom.getTeacherClassrooms();
        
        if (classrooms.length === 0) {
            return `
                <div class="empty-state">
                    <span class="empty-icon">🏫</span>
                    <h3>No Classrooms Yet</h3>
                    <p>Create your first classroom to get started!</p>
                    <button class="btn btn-primary" onclick="TeacherView.showCreateClassroom()">
                        Create Classroom
                    </button>
                </div>
            `;
        }
        
        return `
            <div class="classrooms-grid">
                ${classrooms.map(classroom => `
                    <div class="classroom-card">
                        <div class="classroom-header">
                            <h3>${classroom.name}</h3>
                            <span class="classroom-code" title="Share this code with students">${classroom.code}</span>
                        </div>
                        <p class="classroom-desc">${classroom.description || 'No description'}</p>
                        <div class="classroom-stats">
                            <div class="stat">
                                <span class="stat-value">${classroom.students.length}</span>
                                <span class="stat-label">Students</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">${classroom.stats.totalGamesPlayed}</span>
                                <span class="stat-label">Games</span>
                            </div>
                        </div>
                        <div class="classroom-actions">
                            <button class="btn btn-small btn-primary" onclick="TeacherView.viewClassroom('${classroom.code}')">
                                View Details
                            </button>
                            <button class="btn btn-small btn-secondary" onclick="TeacherView.hostGameForClassroom('${classroom.code}')">
                                🎮 Host Game
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    renderActiveGames: () => {
        const games = Classroom.getAvailableGames().filter(g => g.hostId === Auth.getCurrentUser()?.id);
        
        if (games.length === 0) {
            return `
                <div class="empty-state">
                    <span class="empty-icon">🎮</span>
                    <h3>No Active Games</h3>
                    <p>Host a game from one of your classrooms!</p>
                </div>
            `;
        }
        
        return `
            <div class="games-list">
                ${games.map(game => `
                    <div class="game-item ${game.status}">
                        <div class="game-info">
                            <h4>${TeacherView.getGameTitle(game.gameType)}</h4>
                            <p>Classroom: ${game.classroomName}</p>
                            <span class="game-status status-${game.status}">${game.status}</span>
                        </div>
                        <div class="game-players">
                            <span>${game.players.length} player${game.players.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div class="game-actions">
                            ${game.status === 'waiting' ? `
                                <button class="btn btn-small btn-primary" onclick="TeacherView.startHostedGame('${game.id}')">
                                    Start Game
                                </button>
                            ` : ''}
                            <button class="btn btn-small btn-secondary" onclick="TeacherView.viewGame('${game.id}')">
                                View
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    getGameTitle: (gameType) => {
        const titles = {
            'race': '🏎️ Car Race',
            'speedrun': '⚡ Speed Run',
            'battle': '⚔️ Battle Mode'
        };
        return titles[gameType] || gameType;
    },
    
    switchTab: (tab) => {
        TeacherView.currentTab = tab;
        document.querySelectorAll('.teacher-tab').forEach(t => {
            t.classList.toggle('active', t.textContent.toLowerCase().includes(tab));
        });
        document.getElementById('teacher-content').innerHTML = TeacherView.renderContent();
    },
    
    showCreateClassroom: () => {
        Modal.show({
            title: '🏫 Create New Classroom',
            content: `
                <form id="create-classroom-form" class="modal-form">
                    <div class="form-group">
                        <label for="classroom-name">Classroom Name *</label>
                        <input type="text" id="classroom-name" placeholder="e.g., 10A Computer Science" required minlength="3">
                    </div>
                    <div class="form-group">
                        <label for="classroom-desc">Description (optional)</label>
                        <textarea id="classroom-desc" placeholder="Describe your classroom..." rows="3"></textarea>
                    </div>
                </form>
            `,
            footer: `
                <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
                <button class="btn btn-primary" id="modal-create">Create Classroom</button>
            `
        });
        
        setTimeout(() => {
            document.getElementById('modal-cancel')?.addEventListener('click', Modal.close);
            document.getElementById('modal-create')?.addEventListener('click', () => {
                const name = document.getElementById('classroom-name').value;
                const desc = document.getElementById('classroom-desc').value;
                
                const result = Classroom.create(name, desc);
                if (result.success) {
                    Modal.close();
                    Toast.show(`Classroom created! Code: ${result.classroom.code}`, 'success');
                    TeacherView.refresh();
                } else {
                    Toast.show(result.error, 'error');
                }
            });
        }, 0);
    },
    
    viewClassroom: (code) => {
        const classroom = Classroom.get(code);
        if (!classroom) {
            Toast.show('Classroom not found', 'error');
            return;
        }
        
        Modal.show({
            title: `🏫 ${classroom.name}`,
            content: `
                <div class="classroom-details">
                    <div class="classroom-code-display">
                        <span class="code-label">Classroom Code:</span>
                        <span class="code-value">${classroom.code}</span>
                        <button class="btn btn-small" onclick="navigator.clipboard.writeText('${classroom.code}'); Toast.show('Code copied!', 'success')">
                            📋 Copy
                        </button>
                    </div>
                    
                    <div class="students-section">
                        <h4>Students (${classroom.students.length})</h4>
                        ${classroom.students.length === 0 ? `
                            <p class="no-students">No students yet. Share the code with your class!</p>
                        ` : `
                            <div class="students-list">
                                ${classroom.students.map(s => `
                                    <div class="student-item">
                                        <span class="student-name">${s.username}</span>
                                        <span class="student-stats">${s.stats.correctAnswers}/${s.stats.totalAnswers} correct</span>
                                        <button class="btn btn-tiny btn-danger" onclick="TeacherView.removeStudent('${code}', '${s.id}')">
                                            Remove
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>
                    
                    <div class="classroom-settings">
                        <h4>Settings</h4>
                        <label class="toggle-setting">
                            <input type="checkbox" id="allow-join" ${classroom.settings.allowJoin ? 'checked' : ''}>
                            <span>Allow new students to join</span>
                        </label>
                        <label class="toggle-setting">
                            <input type="checkbox" id="show-leaderboard" ${classroom.settings.showLeaderboard ? 'checked' : ''}>
                            <span>Show class leaderboard</span>
                        </label>
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-danger" id="modal-delete">Delete Classroom</button>
                <button class="btn btn-secondary" id="modal-close-detail">Close</button>
            `,
            className: 'modal-large'
        });
        
        setTimeout(() => {
            document.getElementById('modal-close-detail')?.addEventListener('click', Modal.close);
            document.getElementById('modal-delete')?.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this classroom? This cannot be undone.')) {
                    const result = Classroom.delete(code);
                    if (result.success) {
                        Modal.close();
                        Toast.show('Classroom deleted', 'info');
                        TeacherView.refresh();
                    } else {
                        Toast.show(result.error, 'error');
                    }
                }
            });
            
            document.getElementById('allow-join')?.addEventListener('change', (e) => {
                Classroom.updateSettings(code, { allowJoin: e.target.checked });
            });
            document.getElementById('show-leaderboard')?.addEventListener('change', (e) => {
                Classroom.updateSettings(code, { showLeaderboard: e.target.checked });
            });
        }, 0);
    },
    
    removeStudent: (classroomCode, studentId) => {
        if (confirm('Remove this student from the classroom?')) {
            const result = Classroom.removeStudent(classroomCode, studentId);
            if (result.success) {
                Toast.show('Student removed', 'info');
                TeacherView.viewClassroom(classroomCode); // Refresh modal
            } else {
                Toast.show(result.error, 'error');
            }
        }
    },
    
    hostGameForClassroom: (code) => {
        const classroom = Classroom.get(code);
        if (!classroom) return;
        
        Modal.show({
            title: '🎮 Host a Game',
            content: `
                <div class="host-game-form">
                    <p>Hosting game for: <strong>${classroom.name}</strong></p>
                    
                    <div class="form-group">
                        <label>Game Type</label>
                        <div class="game-type-selector">
                            <button type="button" class="game-type-btn active" data-type="race" onclick="TeacherView.selectGameType('race', this)">
                                <span class="type-icon">🏎️</span>
                                <span class="type-name">Car Race</span>
                                <span class="type-desc">Race to the finish!</span>
                            </button>
                            <button type="button" class="game-type-btn" data-type="speedrun" onclick="TeacherView.selectGameType('speedrun', this)">
                                <span class="type-icon">⚡</span>
                                <span class="type-name">Speed Run</span>
                                <span class="type-desc">Answer fast!</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="game-topic">Topic</label>
                        <select id="game-topic">
                            <option value="all">All Topics</option>
                            ${TOPICS.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="game-questions">Number of Questions</label>
                        <select id="game-questions">
                            <option value="5">5 questions</option>
                            <option value="10" selected>10 questions</option>
                            <option value="15">15 questions</option>
                            <option value="20">20 questions</option>
                        </select>
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" id="modal-host-cancel">Cancel</button>
                <button class="btn btn-primary" id="modal-host-start">Create Game</button>
            `
        });
        
        TeacherView.selectedGameType = 'race';
        
        setTimeout(() => {
            document.getElementById('modal-host-cancel')?.addEventListener('click', Modal.close);
            document.getElementById('modal-host-start')?.addEventListener('click', () => {
                const topic = document.getElementById('game-topic').value;
                const questionCount = parseInt(document.getElementById('game-questions').value);
                
                const result = Classroom.hostGame(code, TeacherView.selectedGameType, {
                    topic,
                    questionCount
                });
                
                if (result.success) {
                    Modal.close();
                    Toast.show('Game created! Waiting for players...', 'success');
                    TeacherView.switchTab('games');
                    TeacherView.refresh();
                    
                    // Open the game view
                    if (TeacherView.selectedGameType === 'race') {
                        CarRace.startAsHost(result.game);
                    }
                } else {
                    Toast.show(result.error, 'error');
                }
            });
        }, 0);
    },
    
    selectedGameType: 'race',
    
    selectGameType: (type, btn) => {
        TeacherView.selectedGameType = type;
        document.querySelectorAll('.game-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    },
    
    startHostedGame: (gameId) => {
        const result = Classroom.startGame(gameId);
        if (result.success) {
            Toast.show('Game started!', 'success');
            TeacherView.refresh();
            
            // Navigate to game
            const game = result.game;
            if (game.gameType === 'race') {
                CarRace.startAsHost(game);
            }
        } else {
            Toast.show(result.error, 'error');
        }
    },
    
    viewGame: (gameId) => {
        const game = Classroom.getGame(gameId);
        if (game && game.gameType === 'race') {
            CarRace.startAsHost(game);
        }
    },
    
    refresh: () => {
        document.getElementById('teacher-content').innerHTML = TeacherView.renderContent();
    },
    
    init: () => {
        console.log('👩‍🏫 Teacher view initialized');
    }
};
