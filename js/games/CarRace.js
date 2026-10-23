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
    pollInterval: null,
    shieldActive: false, // Track shield status
    hintUsed: false, // Track hint status for current question
    
    // Car colors for different players
    carColors: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⚪', '🟤'],
    carEmojis: ['🏎️', '🚗', '🚙', '🚕', '🏁'],
    
    /**
     * Safe helper access
     */
    escapeHtml: (str) => {
        if (typeof Helpers !== 'undefined' && Helpers.escapeHtml) {
            return Helpers.escapeHtml(str);
        }
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    /**
     * Start game as host (teacher)
     */
    startAsHost: (game) => {
        try {
            if (!game) {
                console.error('No game provided to CarRace.startAsHost');
                return;
            }
            CarRace.game = game;
            CarRace.isHost = true;
            CarRace.questions = CarRace.loadQuestions(game.settings || {});
            CarRace.raceTrackLength = game.settings?.questionCount || 10;
            CarRace.render();
        } catch (error) {
            console.error('CarRace.startAsHost error:', error);
            CarRace.showToast('Failed to start game as host', 'error');
        }
    },
    
    /**
     * Start game as player (student)
     */
    startAsPlayer: (game) => {
        try {
            if (!game) {
                console.error('No game provided to CarRace.startAsPlayer');
                return;
            }
            
            CarRace.game = game;
            CarRace.isHost = false;
            CarRace.playerPosition = 0;
            CarRace.powerups = [];
            CarRace.isPenalized = false;
            CarRace.selectedPowerup = null;
            CarRace.shieldActive = false;
            CarRace.hintUsed = false;
            CarRace.questions = CarRace.loadQuestions(game.settings || {});
            CarRace.raceTrackLength = game.settings?.questionCount || 10;
            CarRace.render();
            
            // Start polling for game updates
            CarRace.startPolling();
        } catch (error) {
            console.error('CarRace.startAsPlayer error:', error);
            CarRace.showToast('Failed to join game', 'error');
        }
    },
    
    /**
     * Safe toast wrapper
     */
    showToast: (message, type) => {
        if (typeof Toast !== 'undefined' && Toast.show) {
            Toast.show(message, type);
        } else {
            console.log(`[${type}] ${message}`);
        }
    },
    
    /**
     * Safe sound wrapper
     */
    playSound: (sound) => {
        try {
            if (typeof SoundFX !== 'undefined' && SoundFX.play) {
                SoundFX.play(sound);
            }
        } catch (error) {
            console.warn('Sound playback failed:', error);
        }
    },
    
    /**
     * Load questions for the race
     */
    loadQuestions: (settings) => {
        try {
            let questions = typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS) ? [...QUESTIONS] : [];
            
            if (questions.length === 0) {
                console.warn('No questions available for CarRace');
                return [];
            }
            
            // Filter by topic
            if (settings?.topic && settings.topic !== 'all') {
                questions = questions.filter(q => q && q.topic === settings.topic);
            }
            
            // Shuffle and limit
            const count = settings?.questionCount || 10;
            questions = (typeof Helpers !== 'undefined' && Helpers.shuffle) 
                ? Helpers.shuffle(questions).slice(0, count)
                : questions.sort(() => Math.random() - 0.5).slice(0, count);
            
            return questions;
        } catch (error) {
            console.error('CarRace.loadQuestions error:', error);
            return [];
        }
    },
    
    /**
     * Get current user safely
     */
    getCurrentUser: () => {
        try {
            if (typeof Auth !== 'undefined' && Auth.getCurrentUser) {
                return Auth.getCurrentUser();
            }
        } catch (error) {
            console.warn('Could not get current user:', error);
        }
        return null;
    },
    
    /**
     * Render the game
     */
    render: () => {
        try {
            const container = document.getElementById('app-main') || document.getElementById('app');
            if (!container) {
                console.error('No container found for CarRace');
                return;
            }
            container.innerHTML = CarRace.renderGame();
            
            // Start update loop
            CarRace.startUpdateLoop();
        } catch (error) {
            console.error('CarRace.render error:', error);
        }
    },
    
    renderGame: () => {
        const game = CarRace.game;
        if (!game) return '<div class="error-state">Game not loaded</div>';
        
        const classroomName = game.classroomName || 'Race';
        
        return `
            <div class="car-race-container">
                <div class="race-header">
                    <div class="race-title">
                        <h1>🏎️ Car Race</h1>
                        <span class="race-classroom">${CarRace.escapeHtml(classroomName)}</span>
                    </div>
                    <div class="race-status">
                        <span class="status-badge status-${game.status || 'unknown'}">${game.status || 'unknown'}</span>
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
                                            title="${CarRace.escapeHtml(CarRace.getPowerupDescription(p))}">
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
        if (!game) return '';
        
        const trackLength = CarRace.raceTrackLength;
        const players = game.players || [];
        const currentUser = CarRace.getCurrentUser();
        
        // Create track with checkpoints
        let trackHTML = '<div class="track-road">';
        
        for (let i = 0; i <= trackLength; i++) {
            const isFinish = i === trackLength;
            const isStart = i === 0;
            const playersAtCheckpoint = players.filter(p => p && p.position === i);
            
            trackHTML += `
                <div class="checkpoint ${isFinish ? 'finish' : ''} ${isStart ? 'start' : ''}" data-position="${i}">
                    <span class="checkpoint-marker">${isFinish ? '🏁' : isStart ? '🚦' : '🔶'}</span>
                    <span class="checkpoint-num">${i}</span>
                    <div class="cars-at-checkpoint">
                        ${playersAtCheckpoint
                            .map((p, idx) => `
                                <span class="car-icon ${currentUser && p.id === currentUser.id ? 'my-car' : ''}" 
                                      title="${CarRace.escapeHtml(p.username || 'Player')}"
                                      style="transform: translateX(${idx * 15}px)">
                                    ${CarRace.carEmojis[0]}
                                    <span class="car-label">${CarRace.escapeHtml((p.username || 'P').substring(0, 3))}</span>
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
        if (!game) return '';
        
        const players = game.players || [];
        const currentUser = CarRace.getCurrentUser();
        const currentPlayer = currentUser ? players.find(p => p && p.id === currentUser.id) : null;
        const gameIdDisplay = (game.id || '').substring(0, 8).toUpperCase();
        
        return `
            <div class="waiting-room">
                <div class="waiting-icon">🏎️</div>
                <h2>Waiting for Players...</h2>
                <div class="game-code">
                    <span>Game ID:</span>
                    <strong>${CarRace.escapeHtml(gameIdDisplay)}</strong>
                </div>
                
                <div class="joined-players">
                    <h3>Players Joined (${players.length})</h3>
                    <div class="player-list">
                        ${players.length === 0 ? 
                            '<p class="no-players">Waiting for players to join...</p>' :
                            players.map((p) => `
                                <div class="player-item">
                                    <span class="player-car">${CarRace.carEmojis[0]}</span>
                                    <span class="player-name">${CarRace.escapeHtml(p.username || 'Player')}</span>
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
                        ${currentPlayer?.ready ? '❌ Not Ready' : '✅ Ready'}
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
        
        // Check if race is complete for this player
        if (CarRace.playerPosition >= CarRace.raceTrackLength) {
            return `
                <div class="race-complete">
                    <div class="complete-icon">🏁</div>
                    <h2>Race Complete!</h2>
                    <p>Waiting for other racers to finish...</p>
                </div>
            `;
        }
        
        const question = CarRace.questions[CarRace.questionIndex];
        if (!question) {
            return `
                <div class="race-complete">
                    <div class="complete-icon">🏁</div>
                    <h2>No more questions!</h2>
                    <p>Waiting for results...</p>
                </div>
            `;
        }
        
        // Get options, applying hint if active
        let options = question.options || [];
        let hiddenIndexes = [];
        
        if (CarRace.hintUsed && options.length > 2) {
            // Hide 2 wrong options (but not the correct answer)
            const wrongIndexes = options
                .map((_, i) => i)
                .filter(i => i !== question.answer);
            hiddenIndexes = wrongIndexes.slice(0, 2);
        }
        
        return `
            <div class="race-question">
                <div class="question-header">
                    <span class="question-number">Checkpoint ${CarRace.questionIndex + 1}/${CarRace.raceTrackLength}</span>
                    <span class="question-topic">${CarRace.escapeHtml(question.topic || 'General')}</span>
                </div>
                
                <div class="question-text">${CarRace.escapeHtml(question.question || '')}</div>
                
                <div class="race-options">
                    ${options.map((opt, i) => {
                        const isHidden = hiddenIndexes.includes(i);
                        return `
                            <button class="race-option ${isHidden ? 'option-hidden' : ''}" 
                                    onclick="CarRace.answer(${i})"
                                    ${isHidden ? 'disabled' : ''}>
                                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                                <span class="option-text">${isHidden ? '---' : CarRace.escapeHtml(opt || '')}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
                
                ${CarRace.selectedPowerup !== null ? `
                    <div class="active-powerup">
                        Using: ${CarRace.getPowerupIcon(CarRace.powerups[CarRace.selectedPowerup])}
                        ${CarRace.escapeHtml(CarRace.getPowerupDescription(CarRace.powerups[CarRace.selectedPowerup]))}
                    </div>
                ` : ''}
                
                ${CarRace.shieldActive ? `
                    <div class="shield-indicator">🛡️ Shield Active - No penalty for wrong answer!</div>
                ` : ''}
            </div>
        `;
    },
    
    renderHostView: () => {
        const game = CarRace.game;
        if (!game) return '';
        
        const players = game.players || [];
        const finished = players.filter(p => p && p.position >= CarRace.raceTrackLength);
        const sortedPlayers = [...players].sort((a, b) => (b.position || 0) - (a.position || 0));
        
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
                    ${sortedPlayers.length === 0 ? '<p class="no-players">No players yet</p>' : 
                        sortedPlayers.map((p, i) => `
                            <div class="standing-row ${(p.position || 0) >= CarRace.raceTrackLength ? 'finished' : ''}">
                                <span class="standing-pos">${i + 1}</span>
                                <span class="standing-car">${CarRace.carEmojis[0]}</span>
                                <span class="standing-name">${CarRace.escapeHtml(p.username || 'Player')}</span>
                                <span class="standing-progress">${p.position || 0}/${CarRace.raceTrackLength}</span>
                                ${(p.position || 0) >= CarRace.raceTrackLength ? '<span class="finish-flag">🏁</span>' : ''}
                            </div>
                        `).join('')
                    }
                </div>
                
                ${finished.length === players.length && players.length > 0 ? `
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
        if (!game) return '';
        
        const players = game.players || [];
        const results = game.results || [...players].sort((a, b) => (b.position || 0) - (a.position || 0));
        
        if (results.length === 0) {
            return `
                <div class="race-results">
                    <div class="results-header">
                        <h2>🏆 Race Results</h2>
                    </div>
                    <p class="no-results">No results available</p>
                    <div class="results-actions">
                        <button class="btn btn-primary" onclick="CarRace.close()">Back to Dashboard</button>
                    </div>
                </div>
            `;
        }
        
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
                            <span class="place-name">${CarRace.escapeHtml(p.username || 'Player')}</span>
                            <span class="place-stats">${p.correctAnswers || 0} correct</span>
                        </div>
                    `).join('')}
                </div>
                
                ${results.length > 3 ? `
                    <div class="full-results">
                        ${results.slice(3).map((p, i) => `
                            <div class="result-row">
                                <span class="result-pos">${i + 4}</span>
                                <span class="result-name">${CarRace.escapeHtml(p.username || 'Player')}</span>
                                <span class="result-stats">${p.correctAnswers || 0}/${(p.correctAnswers || 0) + (p.wrongAnswers || 0)}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
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
        if (!game) return '';
        
        const players = [...(game.players || [])].sort((a, b) => (b.position || 0) - (a.position || 0));
        const currentUser = CarRace.getCurrentUser();
        
        if (players.length === 0) {
            return `
                <h3>🏆 Leaderboard</h3>
                <div class="leaderboard-list">
                    <p class="no-players">No players yet</p>
                </div>
            `;
        }
        
        return `
            <h3>🏆 Leaderboard</h3>
            <div class="leaderboard-list">
                ${players.map((p, i) => `
                    <div class="lb-row ${currentUser && p.id === currentUser.id ? 'current-user' : ''}">
                        <span class="lb-pos">${i + 1}</span>
                        <span class="lb-name">${CarRace.escapeHtml(p.username || 'Player')}</span>
                        <span class="lb-progress">${p.position || 0}/${CarRace.raceTrackLength}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // ==================== GAME ACTIONS ====================
    
    answer: (answerIndex) => {
        try {
            if (CarRace.isPenalized) return;
            if (CarRace.playerPosition >= CarRace.raceTrackLength) return;
            
            const question = CarRace.questions[CarRace.questionIndex];
            if (!question) return;
            
            const isCorrect = answerIndex === question.answer;
            
            if (isCorrect) {
                CarRace.handleCorrectAnswer();
            } else {
                CarRace.handleWrongAnswer();
            }
        } catch (error) {
            console.error('CarRace.answer error:', error);
        }
    },
    
    handleCorrectAnswer: () => {
        try {
            CarRace.playSound('correct');
            CarRace.playerPosition++;
            CarRace.questionIndex++;
            CarRace.hintUsed = false; // Reset hint for next question
            CarRace.shieldActive = false; // Reset shield
            
            // Possibly earn a powerup (30% chance)
            if (Math.random() < 0.3 && CarRace.powerups.length < 3) {
                const powerup = CarRace.getRandomPowerup();
                CarRace.powerups.push(powerup);
                CarRace.showToast(`Power-up earned: ${CarRace.getPowerupIcon(powerup)} ${powerup}!`, 'success');
            }
            
            // Use selected powerup (except shield which is used on wrong answer)
            if (CarRace.selectedPowerup !== null) {
                const powerup = CarRace.powerups[CarRace.selectedPowerup];
                if (powerup !== 'shield') { // Shield handled differently
                    CarRace.usePowerup(powerup);
                }
                CarRace.powerups.splice(CarRace.selectedPowerup, 1);
                CarRace.selectedPowerup = null;
            }
            
            // Update server
            CarRace.updatePlayerOnServer({
                position: CarRace.playerPosition,
                correctAnswers: CarRace.getPlayerStat('correctAnswers') + 1,
                powerups: CarRace.powerups
            });
            
            // Check if finished
            if (CarRace.playerPosition >= CarRace.raceTrackLength) {
                CarRace.handleFinish();
            } else {
                CarRace.updateDisplay();
            }
        } catch (error) {
            console.error('CarRace.handleCorrectAnswer error:', error);
        }
    },
    
    handleWrongAnswer: () => {
        try {
            // Check for shield powerup
            if (CarRace.shieldActive) {
                CarRace.shieldActive = false;
                CarRace.showToast('🛡️ Shield protected you!', 'info');
                CarRace.playSound('shield');
                CarRace.updateDisplay();
                return;
            }
            
            CarRace.playSound('wrong');
            CarRace.isPenalized = true;
            
            // Update wrong answer count
            CarRace.updatePlayerOnServer({
                wrongAnswers: CarRace.getPlayerStat('wrongAnswers') + 1
            });
            
            CarRace.updateDisplay();
            
            // 3 second penalty
            let remaining = 3;
            const timerEl = document.getElementById('penalty-timer');
            
            if (CarRace.penaltyTimer) {
                clearInterval(CarRace.penaltyTimer);
            }
            
            CarRace.penaltyTimer = setInterval(() => {
                remaining--;
                if (timerEl) timerEl.textContent = remaining;
                
                if (remaining <= 0) {
                    clearInterval(CarRace.penaltyTimer);
                    CarRace.penaltyTimer = null;
                    CarRace.isPenalized = false;
                    CarRace.updateDisplay();
                }
            }, 1000);
        } catch (error) {
            console.error('CarRace.handleWrongAnswer error:', error);
            CarRace.isPenalized = false;
        }
    },
    
    /**
     * Get player stat safely
     */
    getPlayerStat: (stat) => {
        try {
            const currentUser = CarRace.getCurrentUser();
            if (!currentUser || !CarRace.game?.players) return 0;
            const player = CarRace.game.players.find(p => p && p.id === currentUser.id);
            return player?.[stat] || 0;
        } catch (error) {
            return 0;
        }
    },
    
    /**
     * Update player on server safely
     */
    updatePlayerOnServer: (data) => {
        try {
            if (typeof Classroom !== 'undefined' && Classroom.updatePlayer && CarRace.game?.id) {
                Classroom.updatePlayer(CarRace.game.id, data);
            }
        } catch (error) {
            console.error('Failed to update player on server:', error);
        }
    },
    
    handleFinish: () => {
        CarRace.showToast('🏁 You finished the race!', 'success');
        CarRace.playSound('victory');
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
        try {
            if (index < 0 || index >= CarRace.powerups.length) return;
            
            if (CarRace.selectedPowerup === index) {
                CarRace.selectedPowerup = null;
                CarRace.shieldActive = false;
                CarRace.hintUsed = false;
            } else {
                CarRace.selectedPowerup = index;
                const powerup = CarRace.powerups[index];
                
                // Activate shield immediately when selected
                if (powerup === 'shield') {
                    CarRace.shieldActive = true;
                    CarRace.powerups.splice(index, 1);
                    CarRace.selectedPowerup = null;
                    CarRace.showToast('🛡️ Shield activated!', 'info');
                }
                // Activate hint immediately
                else if (powerup === 'hint') {
                    CarRace.hintUsed = true;
                    CarRace.powerups.splice(index, 1);
                    CarRace.selectedPowerup = null;
                    CarRace.showToast('💡 Hint used! 2 wrong options removed.', 'info');
                }
                // Skip is used immediately
                else if (powerup === 'skip') {
                    CarRace.powerups.splice(index, 1);
                    CarRace.selectedPowerup = null;
                    CarRace.usePowerup('skip');
                }
            }
            CarRace.updateDisplay();
        } catch (error) {
            console.error('CarRace.selectPowerup error:', error);
        }
    },
    
    usePowerup: (powerup) => {
        try {
            switch (powerup) {
                case 'boost':
                    CarRace.playerPosition = Math.min(
                        CarRace.playerPosition + 1, 
                        CarRace.raceTrackLength
                    );
                    CarRace.showToast('🚀 Boost! +1 position', 'success');
                    CarRace.updatePlayerOnServer({ position: CarRace.playerPosition });
                    break;
                case 'shield':
                    // Shield is handled via shieldActive flag
                    break;
                case 'skip':
                    CarRace.questionIndex++;
                    CarRace.playerPosition = Math.min(
                        CarRace.playerPosition + 1, 
                        CarRace.raceTrackLength
                    );
                    CarRace.showToast('⏭️ Question skipped!', 'info');
                    CarRace.updatePlayerOnServer({ position: CarRace.playerPosition });
                    if (CarRace.playerPosition >= CarRace.raceTrackLength) {
                        CarRace.handleFinish();
                    }
                    break;
                case 'hint':
                    // Hint is handled via hintUsed flag
                    break;
            }
        } catch (error) {
            console.error('CarRace.usePowerup error:', error);
        }
    },
    
    // ==================== HOST CONTROLS ====================
    
    hostStartRace: () => {
        try {
            if (typeof Classroom === 'undefined' || !Classroom.startGame) {
                CarRace.showToast('Cannot start game - Classroom not available', 'error');
                return;
            }
            
            const result = Classroom.startGame(CarRace.game.id);
            if (result?.success) {
                CarRace.game = result.game;
                CarRace.showToast('🏁 Race started!', 'success');
                CarRace.updateDisplay();
            } else {
                CarRace.showToast(result?.error || 'Failed to start race', 'error');
            }
        } catch (error) {
            console.error('CarRace.hostStartRace error:', error);
            CarRace.showToast('Failed to start race', 'error');
        }
    },
    
    toggleReady: () => {
        try {
            const user = CarRace.getCurrentUser();
            if (!user || !CarRace.game?.players) return;
            
            const player = CarRace.game.players.find(p => p && p.id === user.id);
            if (player) {
                CarRace.updatePlayerOnServer({ ready: !player.ready });
                CarRace.refreshGameState();
            }
        } catch (error) {
            console.error('CarRace.toggleReady error:', error);
        }
    },
    
    endRace: () => {
        try {
            if (!confirm('Are you sure you want to end the race?')) return;
            
            if (typeof Classroom !== 'undefined' && Classroom.endGame && CarRace.game?.id) {
                Classroom.endGame(CarRace.game.id);
            }
            CarRace.game.status = 'finished';
            CarRace.updateDisplay();
        } catch (error) {
            console.error('CarRace.endRace error:', error);
        }
    },
    
    showFinalResults: () => {
        try {
            if (typeof Classroom !== 'undefined' && Classroom.endGame && CarRace.game?.id) {
                Classroom.endGame(CarRace.game.id);
            }
            CarRace.game.status = 'finished';
            CarRace.updateDisplay();
        } catch (error) {
            console.error('CarRace.showFinalResults error:', error);
        }
    },
    
    close: () => {
        try {
            CarRace.cleanup();
            
            if (typeof Auth !== 'undefined' && Auth.isTeacher?.()) {
                if (typeof Router !== 'undefined' && Router.navigate) {
                    Router.navigate('teacher');
                }
            } else {
                if (typeof Router !== 'undefined' && Router.navigate) {
                    Router.navigate('home');
                }
            }
        } catch (error) {
            console.error('CarRace.close error:', error);
        }
    },
    
    // ==================== GAME LOOP ====================
    
    startPolling: () => {
        CarRace.stopPolling();
        // Poll for game state updates every second
        CarRace.pollInterval = setInterval(() => {
            CarRace.refreshGameState();
        }, 1000);
    },
    
    stopPolling: () => {
        if (CarRace.pollInterval) {
            clearInterval(CarRace.pollInterval);
            CarRace.pollInterval = null;
        }
    },
    
    refreshGameState: () => {
        try {
            if (!CarRace.game?.id) return;
            if (typeof Classroom === 'undefined' || !Classroom.getGame) return;
            
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
        } catch (error) {
            console.error('CarRace.refreshGameState error:', error);
        }
    },
    
    startUpdateLoop: () => {
        if (CarRace.updateInterval) {
            clearInterval(CarRace.updateInterval);
        }
        CarRace.updateInterval = setInterval(() => {
            CarRace.refreshGameState();
        }, 2000);
    },
    
    updateDisplay: () => {
        try {
            const game = CarRace.game;
            if (!game) return;
            
            const questionPanel = document.getElementById('question-panel');
            if (questionPanel) {
                questionPanel.innerHTML = game.status === 'waiting' ? CarRace.renderWaiting() :
                                          game.status === 'playing' ? CarRace.renderQuestion() :
                                          CarRace.renderResults();
            }
            
            const track = document.getElementById('race-track');
            if (track) track.innerHTML = CarRace.renderTrack();
            
            const lb = document.getElementById('race-leaderboard');
            if (lb) lb.innerHTML = CarRace.renderLeaderboard();
            
            const powerupsBar = document.getElementById('powerups-bar');
            if (powerupsBar && !CarRace.isHost && game.status === 'playing') {
                powerupsBar.innerHTML = `
                    <span class="powerups-label">Power-ups:</span>
                    <div class="powerups-list">
                        ${CarRace.powerups.length === 0 ? 
                            '<span class="no-powerups">None yet - answer correctly to earn!</span>' :
                            CarRace.powerups.map((p, i) => `
                                <button class="powerup-btn ${CarRace.selectedPowerup === i ? 'selected' : ''}" 
                                        onclick="CarRace.selectPowerup(${i})"
                                        title="${CarRace.escapeHtml(CarRace.getPowerupDescription(p))}">
                                    ${CarRace.getPowerupIcon(p)}
                                </button>
                            `).join('')
                        }
                    </div>
                `;
            }
        } catch (error) {
            console.error('CarRace.updateDisplay error:', error);
        }
    },
    
    init: () => {
        console.log('🏎️ Car Race game initialized');
    },

    cleanup: () => {
        try {
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
            if (CarRace.animationFrame) {
                cancelAnimationFrame(CarRace.animationFrame);
                CarRace.animationFrame = null;
            }
            // Reset state
            CarRace.game = null;
            CarRace.questions = [];
            CarRace.playerPosition = 0;
            CarRace.questionIndex = 0;
            CarRace.isPenalized = false;
            CarRace.powerups = [];
            CarRace.selectedPowerup = null;
            CarRace.shieldActive = false;
            CarRace.hintUsed = false;
            console.log('🏎️ CarRace cleanup');
        } catch (error) {
            console.error('CarRace.cleanup error:', error);
        }
    }
};
