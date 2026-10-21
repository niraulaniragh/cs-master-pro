/**
 * CryptoHack.js - Crypto Hacking Game
 * Answer questions correctly to hack crypto vaults and steal coins!
 * Similar to Blooket's Crypto Hack mode
 */

const CryptoHack = {
    game: null,
    isHost: false,
    questions: [],
    currentQuestionIndex: 0,
    crypto: 0,
    playerVault: {},
    hackTarget: null,
    shield: false,
    shieldTurns: 0,
    updateInterval: null,
    
    VAULT_TYPES: [
        { name: 'Bitcoin', symbol: '₿', icon: '🪙', color: '#f7931a', multiplier: 1 },
        { name: 'Ethereum', symbol: 'Ξ', icon: '💎', color: '#627eea', multiplier: 1.5 },
        { name: 'Dogecoin', symbol: 'Ð', icon: '🐕', color: '#c3a634', multiplier: 0.5 },
        { name: 'Cardano', symbol: '₳', icon: '🔷', color: '#0033ad', multiplier: 1.2 },
        { name: 'Solana', symbol: '◎', icon: '☀️', color: '#9945ff', multiplier: 2 },
        { name: 'NFT Vault', symbol: '🖼️', icon: '🖼️', color: '#ff6b6b', multiplier: 3 }
    ],
    
    HACK_RESULTS: [
        { type: 'success', chance: 40, min: 50, max: 200, message: 'Hack successful!' },
        { type: 'mega', chance: 10, min: 200, max: 500, message: '🎉 MEGA HACK!' },
        { type: 'fail', chance: 30, min: 0, max: 0, message: 'Firewall blocked you!' },
        { type: 'trap', chance: 15, min: -100, max: -50, message: '⚠️ Security trap! Lost crypto!' },
        { type: 'bonus', chance: 5, min: 100, max: 300, message: '🔓 Found hidden wallet!' }
    ],
    
    // Start as host (teacher)
    startAsHost: (game) => {
        CryptoHack.game = game;
        CryptoHack.isHost = true;
        CryptoHack.loadQuestions();
        CryptoHack.renderHostView();
        CryptoHack.startUpdateLoop();
    },
    
    // Start as player (student)
    startAsPlayer: (game) => {
        CryptoHack.game = game;
        CryptoHack.isHost = false;
        CryptoHack.crypto = 100; // Starting crypto
        CryptoHack.shield = false;
        CryptoHack.shieldTurns = 0;
        CryptoHack.currentQuestionIndex = 0;
        CryptoHack.loadQuestions();
        CryptoHack.renderPlayerView();
        CryptoHack.startUpdateLoop();
    },
    
    loadQuestions: () => {
        const topic = CryptoHack.game.settings.topic;
        const count = CryptoHack.game.settings.questionCount || 15;
        
        let pool = [...QUESTIONS];
        if (topic && topic !== 'all') {
            pool = pool.filter(q => q.topic === topic);
        }
        
        // Shuffle and take required number
        CryptoHack.questions = pool
            .sort(() => Math.random() - 0.5)
            .slice(0, count);
    },
    
    renderHostView: () => {
        const container = document.getElementById('app');
        const game = CryptoHack.game;
        
        container.innerHTML = `
            <div class="crypto-hack-host">
                <div class="game-header">
                    <div class="game-title">
                        <span class="game-icon">🔐</span>
                        <h1>Crypto Hack</h1>
                        <span class="game-code">Code: ${game.joinCode}</span>
                    </div>
                    <button class="btn btn-danger" onclick="CryptoHack.endGame()">End Game</button>
                </div>
                
                <div class="host-dashboard">
                    <div class="leaderboard-section">
                        <h2>💰 Crypto Leaderboard</h2>
                        <div class="crypto-leaderboard" id="crypto-leaderboard">
                            ${CryptoHack.renderLeaderboard()}
                        </div>
                    </div>
                    
                    <div class="game-stats-section">
                        <div class="stat-card">
                            <span class="stat-icon">👥</span>
                            <span class="stat-value" id="player-count">${game.players.length}</span>
                            <span class="stat-label">Players</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-icon">❓</span>
                            <span class="stat-value">${CryptoHack.questions.length}</span>
                            <span class="stat-label">Questions</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-icon">🔐</span>
                            <span class="stat-value" id="hack-count">0</span>
                            <span class="stat-label">Total Hacks</span>
                        </div>
                    </div>
                    
                    <div class="recent-activity" id="recent-activity">
                        <h3>📜 Recent Activity</h3>
                        <div class="activity-feed"></div>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderPlayerView: () => {
        const container = document.getElementById('app');
        const game = CryptoHack.game;
        
        container.innerHTML = `
            <div class="crypto-hack-game">
                <div class="game-header">
                    <div class="player-crypto">
                        <span class="crypto-icon">💰</span>
                        <span class="crypto-amount" id="crypto-amount">${CryptoHack.crypto}</span>
                        <span class="crypto-label">Crypto</span>
                    </div>
                    <div class="game-title">
                        <span class="title-icon">🔐</span>
                        <span>Crypto Hack</span>
                    </div>
                    <div class="player-status">
                        ${CryptoHack.shield ? '<span class="shield-badge">🛡️ Protected</span>' : ''}
                        <span class="question-progress">Q${CryptoHack.currentQuestionIndex + 1}/${CryptoHack.questions.length}</span>
                    </div>
                </div>
                
                <div class="crypto-game-content" id="crypto-game-content">
                    ${CryptoHack.renderQuestion()}
                </div>
                
                <div class="mini-leaderboard" id="mini-leaderboard">
                    ${CryptoHack.renderMiniLeaderboard()}
                </div>
            </div>
        `;
    },
    
    renderQuestion: () => {
        if (CryptoHack.currentQuestionIndex >= CryptoHack.questions.length) {
            return CryptoHack.renderGameComplete();
        }
        
        const q = CryptoHack.questions[CryptoHack.currentQuestionIndex];
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        
        return `
            <div class="crypto-question-card">
                <div class="question-header">
                    <span class="question-topic">${CryptoHack.getTopicName(q.topic)}</span>
                    <span class="question-number">Question ${CryptoHack.currentQuestionIndex + 1}</span>
                </div>
                
                <div class="question-text">${q.question}</div>
                
                <div class="crypto-options">
                    ${shuffledOptions.map((opt, i) => `
                        <button class="crypto-option" onclick="CryptoHack.submitAnswer('${opt.replace(/'/g, "\\'")}', this)">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            <span class="option-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    getTopicName: (topicId) => {
        const topic = TOPICS.find(t => t.id === topicId);
        return topic ? topic.name : 'General';
    },
    
    submitAnswer: (answer, btn) => {
        const q = CryptoHack.questions[CryptoHack.currentQuestionIndex];
        const isCorrect = answer === q.answer;
        
        // Disable all buttons
        document.querySelectorAll('.crypto-option').forEach(b => {
            b.disabled = true;
            if (b.querySelector('.option-text').textContent === q.answer) {
                b.classList.add('correct');
            }
        });
        
        if (isCorrect) {
            btn.classList.add('correct');
            CryptoHack.showHackResult();
        } else {
            btn.classList.add('wrong');
            CryptoHack.showWrongAnswer();
        }
    },
    
    showHackResult: () => {
        // Determine hack outcome
        const roll = Math.random() * 100;
        let cumulative = 0;
        let result = CryptoHack.HACK_RESULTS[0];
        
        for (const r of CryptoHack.HACK_RESULTS) {
            cumulative += r.chance;
            if (roll < cumulative) {
                result = r;
                break;
            }
        }
        
        // Calculate crypto gained/lost
        let change = 0;
        if (result.min !== 0 || result.max !== 0) {
            change = Math.floor(Math.random() * (result.max - result.min + 1)) + result.min;
        }
        
        // Apply vault multiplier
        const vault = CryptoHack.VAULT_TYPES[Math.floor(Math.random() * CryptoHack.VAULT_TYPES.length)];
        if (change > 0) {
            change = Math.floor(change * vault.multiplier);
        }
        
        CryptoHack.crypto = Math.max(0, CryptoHack.crypto + change);
        
        // Update display
        document.getElementById('crypto-amount').textContent = CryptoHack.crypto;
        
        // Show result animation
        const content = document.getElementById('crypto-game-content');
        content.innerHTML = `
            <div class="hack-result ${result.type}">
                <div class="vault-hacked" style="background: ${vault.color}">
                    <span class="vault-icon">${vault.icon}</span>
                    <span class="vault-name">${vault.name}</span>
                </div>
                
                <div class="hack-outcome">
                    <div class="result-icon">${result.type === 'success' || result.type === 'mega' || result.type === 'bonus' ? '✅' : '❌'}</div>
                    <div class="result-message">${result.message}</div>
                    <div class="crypto-change ${change >= 0 ? 'positive' : 'negative'}">
                        ${change >= 0 ? '+' : ''}${change} 💰
                    </div>
                </div>
                
                <div class="hack-actions">
                    <button class="btn btn-secondary" onclick="CryptoHack.buyShield()">
                        🛡️ Buy Shield (50💰)
                    </button>
                    <button class="btn btn-primary" onclick="CryptoHack.nextQuestion()">
                        Continue →
                    </button>
                </div>
            </div>
        `;
        
        // Update player score in game
        CryptoHack.updatePlayerScore();
    },
    
    showWrongAnswer: () => {
        setTimeout(() => {
            const content = document.getElementById('crypto-game-content');
            content.innerHTML = `
                <div class="hack-result fail">
                    <div class="vault-locked">
                        <span class="lock-icon">🔒</span>
                    </div>
                    
                    <div class="hack-outcome">
                        <div class="result-icon">❌</div>
                        <div class="result-message">Wrong answer! Access denied.</div>
                        <div class="crypto-change neutral">No hack attempt</div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="CryptoHack.nextQuestion()">
                        Try Next Question →
                    </button>
                </div>
            `;
        }, 1000);
    },
    
    buyShield: () => {
        if (CryptoHack.crypto >= 50) {
            CryptoHack.crypto -= 50;
            CryptoHack.shield = true;
            CryptoHack.shieldTurns = 3;
            document.getElementById('crypto-amount').textContent = CryptoHack.crypto;
            Toast.show('🛡️ Shield activated for 3 questions!', 'success');
        } else {
            Toast.show('Not enough crypto!', 'error');
        }
    },
    
    nextQuestion: () => {
        CryptoHack.currentQuestionIndex++;
        
        // Decrease shield turns
        if (CryptoHack.shieldTurns > 0) {
            CryptoHack.shieldTurns--;
            if (CryptoHack.shieldTurns === 0) {
                CryptoHack.shield = false;
            }
        }
        
        if (CryptoHack.currentQuestionIndex >= CryptoHack.questions.length) {
            CryptoHack.showFinalResults();
        } else {
            CryptoHack.renderPlayerView();
        }
    },
    
    renderGameComplete: () => {
        return `
            <div class="game-complete">
                <h2>🏁 All Questions Complete!</h2>
                <p>Waiting for final results...</p>
            </div>
        `;
    },
    
    showFinalResults: () => {
        CryptoHack.updatePlayerScore();
        
        // Get updated game with all scores
        const game = Classroom.getGame(CryptoHack.game.id);
        const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);
        const myRank = sortedPlayers.findIndex(p => p.id === Auth.getCurrentUser()?.id) + 1;
        
        const container = document.getElementById('app');
        container.innerHTML = `
            <div class="crypto-results">
                <div class="results-header">
                    <h1>🔐 Crypto Hack Complete!</h1>
                </div>
                
                <div class="your-result">
                    <div class="rank-badge rank-${myRank <= 3 ? myRank : 'other'}">
                        ${myRank === 1 ? '🥇' : myRank === 2 ? '🥈' : myRank === 3 ? '🥉' : '#' + myRank}
                    </div>
                    <div class="final-crypto">
                        <span class="crypto-icon">💰</span>
                        <span class="crypto-value">${CryptoHack.crypto}</span>
                        <span class="crypto-label">Total Crypto</span>
                    </div>
                </div>
                
                <div class="final-leaderboard">
                    <h2>📊 Final Standings</h2>
                    <div class="leaderboard-list">
                        ${sortedPlayers.slice(0, 10).map((p, i) => `
                            <div class="leaderboard-item ${p.id === Auth.getCurrentUser()?.id ? 'is-you' : ''}">
                                <span class="lb-rank">${i + 1}</span>
                                <span class="lb-name">${Helpers.escapeHtml(p.username)}</span>
                                <span class="lb-score">${p.score} 💰</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="Router.navigate('home')">
                    Return Home
                </button>
            </div>
        `;
    },
    
    renderLeaderboard: () => {
        const game = Classroom.getGame(CryptoHack.game.id);
        if (!game || game.players.length === 0) {
            return '<p class="no-players">Waiting for players...</p>';
        }
        
        const sorted = [...game.players].sort((a, b) => b.score - a.score);
        
        return sorted.map((p, i) => `
            <div class="lb-row">
                <span class="lb-position">${i + 1}</span>
                <span class="lb-player">${Helpers.escapeHtml(p.username)}</span>
                <span class="lb-crypto">${p.score || 0} 💰</span>
            </div>
        `).join('');
    },
    
    renderMiniLeaderboard: () => {
        const game = Classroom.getGame(CryptoHack.game.id);
        if (!game || game.players.length === 0) return '';
        
        const sorted = [...game.players].sort((a, b) => b.score - a.score);
        const top3 = sorted.slice(0, 3);
        
        return `
            <div class="mini-lb-header">🏆 Top Players</div>
            ${top3.map((p, i) => `
                <div class="mini-lb-row">
                    <span class="mini-rank">${['🥇', '🥈', '🥉'][i]}</span>
                    <span class="mini-name">${Helpers.escapeHtml(p.username)}</span>
                    <span class="mini-score">${p.score || 0}💰</span>
                </div>
            `).join('')}
        `;
    },
    
    updatePlayerScore: () => {
        Classroom.updatePlayer(CryptoHack.game.id, {
            score: CryptoHack.crypto,
            questionsAnswered: CryptoHack.currentQuestionIndex
        });
    },
    
    startUpdateLoop: () => {
        CryptoHack.updateInterval = setInterval(() => {
            const game = Classroom.getGame(CryptoHack.game.id);
            if (!game) {
                clearInterval(CryptoHack.updateInterval);
                return;
            }
            
            if (CryptoHack.isHost) {
                // Update host leaderboard
                const lb = document.getElementById('crypto-leaderboard');
                if (lb) lb.innerHTML = CryptoHack.renderLeaderboard();
                
                const pc = document.getElementById('player-count');
                if (pc) pc.textContent = game.players.length;
            } else {
                // Update player mini leaderboard
                const mlb = document.getElementById('mini-leaderboard');
                if (mlb) mlb.innerHTML = CryptoHack.renderMiniLeaderboard();
            }
            
            // Check if game ended
            if (game.status === 'finished') {
                clearInterval(CryptoHack.updateInterval);
                if (!CryptoHack.isHost) {
                    CryptoHack.showFinalResults();
                }
            }
        }, 2000);
    },
    
    endGame: () => {
        if (confirm('End the game for all players?')) {
            clearInterval(CryptoHack.updateInterval);
            Classroom.endGame(CryptoHack.game.id);
            
            const game = Classroom.getGame(CryptoHack.game.id);
            const sorted = [...game.players].sort((a, b) => b.score - a.score);
            
            // Show final results for host
            const container = document.getElementById('app');
            container.innerHTML = `
                <div class="crypto-results host-results">
                    <div class="results-header">
                        <h1>🔐 Game Over!</h1>
                        <p>Final Results</p>
                    </div>
                    
                    <div class="podium">
                        ${sorted.length > 1 ? `
                            <div class="podium-place second">
                                <span class="podium-avatar">🥈</span>
                                <span class="podium-name">${Helpers.escapeHtml(sorted[1]?.username || '-')}</span>
                                <span class="podium-score">${sorted[1]?.score || 0} 💰</span>
                            </div>
                        ` : ''}
                        ${sorted.length > 0 ? `
                            <div class="podium-place first">
                                <span class="podium-avatar">🥇</span>
                                <span class="podium-name">${Helpers.escapeHtml(sorted[0]?.username || '-')}</span>
                                <span class="podium-score">${sorted[0]?.score || 0} 💰</span>
                            </div>
                        ` : ''}
                        ${sorted.length > 2 ? `
                            <div class="podium-place third">
                                <span class="podium-avatar">🥉</span>
                                <span class="podium-name">${Helpers.escapeHtml(sorted[2]?.username || '-')}</span>
                                <span class="podium-score">${sorted[2]?.score || 0} 💰</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="full-results">
                        ${sorted.map((p, i) => `
                            <div class="result-row">
                                <span class="result-rank">#${i + 1}</span>
                                <span class="result-name">${p.username}</span>
                                <span class="result-score">${p.score || 0} 💰</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="btn btn-primary btn-large" onclick="Router.navigate('teacher')">
                        Back to Dashboard
                    </button>
                </div>
            `;
        }
    },

    cleanup: () => {
        // Clear update interval
        if (CryptoHack.updateInterval) {
            clearInterval(CryptoHack.updateInterval);
            CryptoHack.updateInterval = null;
        }
        CryptoHack.game = null;
        console.log('🔐 CryptoHack cleanup');
    }
};
