/**
 * CarRace.js - Multiplayer Car Racing Game
 * Players race by answering questions - correct answers advance, wrong answers cause delay
 */

const CarRace = {
    game: null,
    isHost: false,
    currentQuestion: null,
    questionIndex: 0,
    questions: [],
    playerPosition: 0,
    isPenalized: false,
    penaltyTimer: null,
    powerups: [],
    selectedPowerup: null,
    raceTrackLength: 10, // Number of checkpoints
    animationFrame: null,
    updateInterval: null,
    
    // Car colors for different players
    carColors: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⚪', '🟤'],
    carEmojis: ['🏎️', '🚗', '🚙', '🚕', '🏁'],
    
    /**
     * Start game as host (teacher)
     */
    startAsHost: (game) => {
        CarRace.game = game;
        CarRace.isHost = true;
        CarRace.questions = CarRace.loadQuestions(game.settings);
        CarRace.raceTrackLength = game.settings.questionCount || 10;
        CarRace.render();
    },
    
    /**
     * Start game as player (student)
     */
    startAsPlayer: (game) => {
        CarRace.game = game;
        CarRace.isHost = false;
        CarRace.playerPosition = 0;
        CarRace.powerups = [];
        CarRace.questions = CarRace.loadQuestions(game.settings);
        CarRace.raceTrackLength = game.settings.questionCount || 10;
        CarRace.render();
        
        // Start polling for game updates
        CarRace.startPolling();
    },
    
    /**
     * Load questions for the race
     */
    loadQuestions: (settings) => {
        let questions = [...QUESTIONS];
        
        // Filter by topic
        if (settings.topic && settings.topic !== 'all') {
            questions = questions.filter(q => q.topic === settings.topic);
        }
        
        // Shuffle and limit
        questions = Helpers.shuffle(questions).slice(0, settings.questionCount || 10);
        
        return questions;
    },
    
    /**
     * Render the game
     */
    render: () => {
        const container = document.getElementById('app-main') || document.getElementById('app');
        if (!container) {
            console.error('No container found for CarRace');
            return;
        }
        container.innerHTML = CarRace.renderGame();
        
        // Start update loop
        CarRace.startUpdateLoop();
    },
    
    renderGame: () => {
        const game = CarRace.game;
        if (!game) return '';
        
        return `
            <div class="car-race-container">
                <div class="race-header">
                    <div class="race-title">
                        <h1>🏎️ Car Race</h1>
                        <span class="race-classroom">${game.classroomName}</span>
                    </div>
                    <div class="race-status">
                        <span class="status-badge status-${game.status}">${game.status}</span>
                        ${CarRace.isHost ? `
                            <button class="btn btn-small btn-danger" onclick="CarRace.endRace()">End Race</button>
                        ` : ''}
                    </div>
                </div>
                
                <div class="race-main">
                    <!-- Race Track -->
                    <div class="race-track" id="race-track">
                        ${CarRace.renderTrack()}
                    </div>
                    
                    <!-- Question Panel -->
                    <div class="question-panel" id="question-panel">
                        ${game.status === 'waiting' ? CarRace.renderWaiting() :
                          game.status === 'playing' ? CarRace.renderQuestion() :
                          CarRace.renderResults()}
                    </div>
                </div>
                
                <!-- Powerups Bar -->
                ${!CarRace.isHost && game.status === 'playing' ? `
                    <div class="powerups-bar" id="powerups-bar">
                        <span class="powerups-label">Power-ups:</span>
                        <div class="powerups-list">
                            ${CarRace.powerups.length === 0 ? 
                                '<span class="no-powerups">None yet - answer correctly to earn!</span>' :
                                CarRace.powerups.map((p, i) => `
                                    <button class="powerup-btn ${CarRace.selectedPowerup === i ? 'selected' : ''}" 
                                            onclick="CarRace.selectPowerup(${i})"
                                            title="${CarRace.getPowerupDescription(p)}">
                                        ${CarRace.getPowerupIcon(p)}
                                    </button>
                                `).join('')
                            }
                        </div>
                    </div>
                ` : ''}
                
                <!-- Leaderboard -->
                <div class="race-leaderboard" id="race-leaderboard">
                    ${CarRace.renderLeaderboard()}
                </div>
            </div>
        `;
    },
    
    renderTrack: () => {
        const game = CarRace.game;
        const trackLength = CarRace.raceTrackLength;
        const players = game.players || [];
        
        // Create track with checkpoints
        let trackHTML = '<div class="track-road">';
        
        for (let i = 0; i <= trackLength; i++) {
            const isFinish = i === trackLength;
            const isStart = i === 0;
            
            trackHTML += `
                <div class="checkpoint ${isFinish ? 'finish' : ''} ${isStart ? 'start' : ''}" data-position="${i}">
                    <span class="checkpoint-marker">${isFinish ? '🏁' : isStart ? '🚦' : '🔶'}</span>
                    <span class="checkpoint-num">${i}</span>
                    <div class="cars-at-checkpoint">
                        ${players
                            .filter(p => p.position === i)
                            .map((p, idx) => `
                                <span class="car-icon ${p.id === Auth.getCurrentUser()?.id ? 'my-car' : ''}" 
                                      title="${Helpers.escapeHtml(p.username)}"
                                      style="transform: translateX(${idx * 15}px)">
                                    ${CarRace.carEmojis[0]}
                                    <span class="car-label">${Helpers.escapeHtml(p.username.substring(0, 3))}</span>
                                </span>
                            `).join('')
                        }
                    </div>
                </div>
            `;
        }
        
        trackHTML += '</div>';
        return trackHTML;
    },
    
    renderWaiting: () => {
        const game = CarRace.game;
        const players = game.players || [];
        
        return `
            <div class="waiting-room">
                <div class="waiting-icon">🏎️</div>
                <h2>Waiting for Players...</h2>
                <div class="game-code">
                    <span>Game ID:</span>
                    <strong>${game.id.substring(0, 8).toUpperCase()}</strong>
                </div>
                
                <div class="joined-players">
                    <h3>Players Joined (${players.length})</h3>
                    <div class="player-list">
                        ${players.length === 0 ? 
                            '<p class="no-players">Waiting for players to join...</p>' :
                            players.map((p, i) => `
                                <div class="player-item">
                                    <span class="player-car">${CarRace.carEmojis[0]}</span>
                                    <span class="player-name">${Helpers.escapeHtml(p.username)}</span>
                                    ${p.ready ? '<span class="ready-badge">Ready</span>' : ''}
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
                
                ${CarRace.isHost ? `
                    <button class="btn btn-large btn-primary" onclick="CarRace.hostStartRace()" 
                            ${players.length < 1 ? 'disabled' : ''}>
                        🏁 Start Race
                    </button>
                ` : `
                    <button class="btn btn-large btn-secondary" onclick="CarRace.toggleReady()">
                        ${(game.players.find(p => p.id === Auth.getCurrentUser()?.id)?.ready) ? 
                            '❌ Not Ready' : '✅ Ready'}
                    </button>
                `}
            </div>
        `;
    },
    
    renderQuestion: () => {
        if (CarRace.isHost) {
            return CarRace.renderHostView();
        }
        
        if (CarRace.isPenalized) {
            return CarRace.renderPenalty();
        }
        
        const question = CarRace.questions[CarRace.questionIndex];
        if (!question) {
            return '<div class="race-complete">🏁 Race Complete!</div>';
        }
        
        return `
            <div class="race-question">
                <div class="question-header">
                    <span class="question-number">Checkpoint ${CarRace.questionIndex + 1}/${CarRace.raceTrackLength}</span>
                    <span class="question-topic">${question.topic}</span>
                </div>
                
                <div class="question-text">${question.question}</div>
                
                <div class="race-options">
                    ${question.options.map((opt, i) => `
                        <button class="race-option" onclick="CarRace.answer(${i})">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            <span class="option-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
                
                ${CarRace.selectedPowerup !== null ? `
                    <div class="active-powerup">
                        Using: ${CarRace.getPowerupIcon(CarRace.powerups[CarRace.selectedPowerup])}
                        ${CarRace.getPowerupDescription(CarRace.powerups[CarRace.selectedPowerup])}
                    </div>
                ` : ''}
            </div>
        `;
    },
    
    renderHostView: () => {
        const game = CarRace.game;
        const players = game.players || [];
        const finished = players.filter(p => p.position >= CarRace.raceTrackLength);
        
        return `
            <div class="host-view">
                <h2>🏁 Race in Progress</h2>
                
                <div class="race-progress">
                    <div class="progress-stats">
                        <div class="stat">
                            <span class="stat-value">${finished.length}</span>
                            <span class="stat-label">Finished</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${players.length - finished.length}</span>
                            <span class="stat-label">Racing</span>
                        </div>
                    </div>
                </div>
                
                <div class="live-standings">
                    <h3>Live Standings</h3>
                    ${[...players].sort((a, b) => b.position - a.position).map((p, i) => `
                        <div class="standing-row ${p.position >= CarRace.raceTrackLength ? 'finished' : ''}">
                            <span class="standing-pos">${i + 1}</span>
                            <span class="standing-car">${CarRace.carEmojis[0]}</span>
                            <span class="standing-name">${Helpers.escapeHtml(p.username)}</span>
                            <span class="standing-progress">${p.position}/${CarRace.raceTrackLength}</span>
                            ${p.position >= CarRace.raceTrackLength ? '<span class="finish-flag">🏁</span>' : ''}
                        </div>
                    `).join('')}
                </div>
                
                ${finished.length === players.length ? `
                    <button class="btn btn-large btn-primary" onclick="CarRace.showFinalResults()">
                        View Final Results
                    </button>
                ` : ''}
            </div>
        `;
    },
    
    renderPenalty: () => {
        return `
            <div class="penalty-screen">
                <div class="penalty-icon">💥</div>
                <h2>Wrong Answer!</h2>
                <p>Wait 3 seconds before trying again...</p>
                <div class="penalty-timer" id="penalty-timer">3</div>
            </div>
        `;
    },
    
    renderResults: () => {
        const game = CarRace.game;
        const results = game.results || game.players.sort((a, b) => b.position - a.position);
        
        return `
            <div class="race-results">
                <div class="results-header">
                    <h2>🏆 Race Results</h2>
                </div>
                
                <div class="podium">
                    ${results.slice(0, 3).map((p, i) => `
                        <div class="podium-place place-${i + 1}">
                            <span class="place-medal">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                            <span class="place-car">${CarRace.carEmojis[0]}</span>
                            <span class="place-name">${Helpers.escapeHtml(p.username)}</span>
                            <span class="place-stats">${p.correctAnswers} correct</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="full-results">
                    ${results.slice(3).map((p, i) => `
                        <div class="result-row">
                            <span class="result-pos">${i + 4}</span>
                            <span class="result-name">${Helpers.escapeHtml(p.username)}</span>
                            <span class="result-stats">${p.correctAnswers}/${p.correctAnswers + p.wrongAnswers}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="results-actions">
                    ${CarRace.isHost ? `
                        <button class="btn btn-primary" onclick="CarRace.close()">Close Race</button>
                    ` : `
                        <button class="btn btn-primary" onclick="CarRace.close()">Back to Dashboard</button>
                    `}
                </div>
            </div>
        `;
    },
    
    renderLeaderboard: () => {
        const game = CarRace.game;
        const players = [...(game.players || [])].sort((a, b) => b.position - a.position);
        
        return `
            <h3>🏆 Leaderboard</h3>
            <div class="leaderboard-list">
                ${players.map((p, i) => `
                    <div class="lb-row ${p.id === Auth.getCurrentUser()?.id ? 'current-user' : ''}">
                        <span class="lb-pos">${i + 1}</span>
                        <span class="lb-name">${p.username}</span>
                        <span class="lb-progress">${p.position}/${CarRace.raceTrackLength}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // ==================== GAME ACTIONS ====================
    
    answer: (answerIndex) => {
        if (CarRace.isPenalized) return;
        
        const question = CarRace.questions[CarRace.questionIndex];
        const isCorrect = answerIndex === question.answer;
        
        if (isCorrect) {
            CarRace.handleCorrectAnswer();
        } else {
            CarRace.handleWrongAnswer();
        }
    },
    
    handleCorrectAnswer: () => {
        SoundFX.play('correct');
        CarRace.playerPosition++;
        CarRace.questionIndex++;
        
        // Possibly earn a powerup (30% chance)
        if (Math.random() < 0.3 && CarRace.powerups.length < 3) {
            const powerup = CarRace.getRandomPowerup();
            CarRace.powerups.push(powerup);
            Toast.show(`Power-up earned: ${CarRace.getPowerupIcon(powerup)} ${powerup}!`, 'success');
        }
        
        // Use selected powerup
        if (CarRace.selectedPowerup !== null) {
            const powerup = CarRace.powerups[CarRace.selectedPowerup];
            CarRace.usePowerup(powerup);
            CarRace.powerups.splice(CarRace.selectedPowerup, 1);
            CarRace.selectedPowerup = null;
        }
        
        // Update server
        Classroom.updatePlayer(CarRace.game.id, {
            position: CarRace.playerPosition,
            correctAnswers: (CarRace.game.players.find(p => p.id === Auth.getCurrentUser()?.id)?.correctAnswers || 0) + 1,
            powerups: CarRace.powerups
        });
        
        // Check if finished
        if (CarRace.playerPosition >= CarRace.raceTrackLength) {
            CarRace.handleFinish();
        } else {
            CarRace.updateDisplay();
        }
    },
    
    handleWrongAnswer: () => {
        SoundFX.play('wrong');
        CarRace.isPenalized = true;
        
        // Update wrong answer count
        Classroom.updatePlayer(CarRace.game.id, {
            wrongAnswers: (CarRace.game.players.find(p => p.id === Auth.getCurrentUser()?.id)?.wrongAnswers || 0) + 1
        });
        
        CarRace.updateDisplay();
        
        // 3 second penalty
        let remaining = 3;
        const timerEl = document.getElementById('penalty-timer');
        
        CarRace.penaltyTimer = setInterval(() => {
            remaining--;
            if (timerEl) timerEl.textContent = remaining;
            
            if (remaining <= 0) {
                clearInterval(CarRace.penaltyTimer);
                CarRace.isPenalized = false;
                CarRace.updateDisplay();
            }
        }, 1000);
    },
    
    handleFinish: () => {
        Toast.show('🏁 You finished the race!', 'success');
        SoundFX.play('victory');
        CarRace.updateDisplay();
    },
    
    // ==================== POWERUPS ====================
    
    getRandomPowerup: () => {
        const powerups = ['boost', 'shield', 'skip', 'hint'];
        return powerups[Math.floor(Math.random() * powerups.length)];
    },
    
    getPowerupIcon: (powerup) => {
        const icons = {
            'boost': '🚀',
            'shield': '🛡️',
            'skip': '⏭️',
            'hint': '💡'
        };
        return icons[powerup] || '❓';
    },
    
    getPowerupDescription: (powerup) => {
        const descriptions = {
            'boost': 'Advance 2 positions on correct answer',
            'shield': 'No penalty for wrong answer',
            'skip': 'Skip this question',
            'hint': 'Remove 2 wrong options'
        };
        return descriptions[powerup] || '';
    },
    
    selectPowerup: (index) => {
        if (CarRace.selectedPowerup === index) {
            CarRace.selectedPowerup = null;
        } else {
            CarRace.selectedPowerup = index;
        }
        CarRace.updateDisplay();
    },
    
    usePowerup: (powerup) => {
        switch (powerup) {
            case 'boost':
                CarRace.playerPosition++; // Extra position
                Toast.show('🚀 Boost! +1 position', 'success');
                break;
            case 'shield':
                // Shield is handled in wrong answer
                Toast.show('🛡️ Shield activated!', 'info');
                break;
            case 'skip':
                CarRace.questionIndex++;
                CarRace.playerPosition++;
                Toast.show('⏭️ Question skipped!', 'info');
                break;
            case 'hint':
                // Remove 2 wrong options - handled in render
                Toast.show('💡 Hint used!', 'info');
                break;
        }
    },
    
    // ==================== HOST CONTROLS ====================
    
    hostStartRace: () => {
        const result = Classroom.startGame(CarRace.game.id);
        if (result.success) {
            CarRace.game = result.game;
            Toast.show('🏁 Race started!', 'success');
            CarRace.updateDisplay();
        } else {
            Toast.show(result.error, 'error');
        }
    },
    
    toggleReady: () => {
        const user = Auth.getCurrentUser();
        const player = CarRace.game.players.find(p => p.id === user.id);
        if (player) {
            Classroom.updatePlayer(CarRace.game.id, { ready: !player.ready });
            CarRace.refreshGameState();
        }
    },
    
    endRace: () => {
        if (confirm('Are you sure you want to end the race?')) {
            Classroom.endGame(CarRace.game.id);
            CarRace.game.status = 'finished';
            CarRace.updateDisplay();
        }
    },
    
    showFinalResults: () => {
        Classroom.endGame(CarRace.game.id);
        CarRace.game.status = 'finished';
        CarRace.updateDisplay();
    },
    
    close: () => {
        CarRace.stopPolling();
        if (CarRace.updateInterval) {
            clearInterval(CarRace.updateInterval);
        }
        
        if (Auth.isTeacher()) {
            Router.navigate('teacher');
        } else {
            Router.navigate('home');
        }
    },
    
    // ==================== GAME LOOP ====================
    
    startPolling: () => {
        // Poll for game state updates every second
        CarRace.pollInterval = setInterval(() => {
            CarRace.refreshGameState();
        }, 1000);
    },
    
    stopPolling: () => {
        if (CarRace.pollInterval) {
            clearInterval(CarRace.pollInterval);
        }
    },
    
    refreshGameState: () => {
        const game = Classroom.getGame(CarRace.game.id);
        if (game) {
            const statusChanged = game.status !== CarRace.game.status;
            CarRace.game = game;
            
            if (statusChanged) {
                CarRace.updateDisplay();
            } else {
                // Just update leaderboard and track
                const track = document.getElementById('race-track');
                if (track) track.innerHTML = CarRace.renderTrack();
                
                const lb = document.getElementById('race-leaderboard');
                if (lb) lb.innerHTML = CarRace.renderLeaderboard();
            }
        }
    },
    
    startUpdateLoop: () => {
        CarRace.updateInterval = setInterval(() => {
            CarRace.refreshGameState();
        }, 2000);
    },
    
    updateDisplay: () => {
        const questionPanel = document.getElementById('question-panel');
        if (questionPanel) {
            questionPanel.innerHTML = CarRace.game.status === 'waiting' ? CarRace.renderWaiting() :
                                      CarRace.game.status === 'playing' ? CarRace.renderQuestion() :
                                      CarRace.renderResults();
        }
        
        const track = document.getElementById('race-track');
        if (track) track.innerHTML = CarRace.renderTrack();
        
        const lb = document.getElementById('race-leaderboard');
        if (lb) lb.innerHTML = CarRace.renderLeaderboard();
        
        const powerupsBar = document.getElementById('powerups-bar');
        if (powerupsBar && !CarRace.isHost && CarRace.game.status === 'playing') {
            powerupsBar.innerHTML = `
                <span class="powerups-label">Power-ups:</span>
                <div class="powerups-list">
                    ${CarRace.powerups.length === 0 ? 
                        '<span class="no-powerups">None yet - answer correctly to earn!</span>' :
                        CarRace.powerups.map((p, i) => `
                            <button class="powerup-btn ${CarRace.selectedPowerup === i ? 'selected' : ''}" 
                                    onclick="CarRace.selectPowerup(${i})"
                                    title="${CarRace.getPowerupDescription(p)}">
                                ${CarRace.getPowerupIcon(p)}
                            </button>
                        `).join('')
                    }
                </div>
            `;
        }
    },
    
    init: () => {
        console.log('🏎️ Car Race game initialized');
    },

    cleanup: () => {
        // Stop polling and update intervals
        CarRace.stopPolling();
        if (CarRace.updateInterval) {
            clearInterval(CarRace.updateInterval);
            CarRace.updateInterval = null;
        }
        if (CarRace.penaltyTimer) {
            clearInterval(CarRace.penaltyTimer);
            CarRace.penaltyTimer = null;
        }
        CarRace.game = null;
        console.log('🏎️ CarRace cleanup');
    }
};
