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
        { name: 'Dogecoin', symbol: 'Ð', icon: '🐕', color: '#c3a634', multiplier: 0.8 },
        { name: 'Cardano', symbol: '₳', icon: '🔷', color: '#0033ad', multiplier: 1.2 },
        { name: 'Solana', symbol: '◎', icon: '☀️', color: '#9945ff', multiplier: 1.8 },
        { name: 'NFT Vault', symbol: '🖼️', icon: '🖼️', color: '#ff6b6b', multiplier: 2.5 }
    ],
    
    // Rebalanced: reduced trap penalty, improved success rates
    HACK_RESULTS: [
        { type: 'success', chance: 45, min: 50, max: 150, message: 'Hack successful! Crypto secured.' },
        { type: 'mega', chance: 10, min: 150, max: 350, message: '🎉 MEGA HACK! Jackpot!' },
        { type: 'fail', chance: 25, min: 0, max: 0, message: 'Firewall blocked your attempt.' },
        { type: 'trap', chance: 12, min: -50, max: -25, message: '⚠️ Security trap triggered!' },
        { type: 'bonus', chance: 8, min: 75, max: 200, message: '🔓 Hidden wallet discovered!' }
    ],
    
    // Start as host (teacher)
    startAsHost: (game) => {
        if (!game) {
            console.error('CryptoHack.startAsHost: No game provided');
            return;
        }
        CryptoHack.game = game;
        CryptoHack.isHost = true;
        CryptoHack.loadQuestions();
        CryptoHack.renderHostView();
        CryptoHack.startUpdateLoop();
    },
    
    // Start as player (student)
    startAsPlayer: (game) => {
        if (!game) {
            console.error('CryptoHack.startAsPlayer: No game provided');
            return;
        }
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
        try {
            const topic = CryptoHack.game?.settings?.topic;
            const count = CryptoHack.game?.settings?.questionCount || 15;
            
            let pool = typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS) ? [...QUESTIONS] : [];
            
            if (pool.length === 0) {
                console.warn('No questions available for CryptoHack');
                CryptoHack.questions = [];
                return;
            }
            
            if (topic && topic !== 'all') {
                pool = pool.filter(q => q && q.topic === topic);
            }
            
            // Shuffle and take required number
            CryptoHack.questions = pool
                .filter(q => q && q.question && Array.isArray(q.options) && typeof q.answer === 'number')
                .sort(() => Math.random() - 0.5)
                .slice(0, count);
        } catch (error) {
            console.error('CryptoHack.loadQuestions error:', error);
            CryptoHack.questions = [];
        }
    },
    
    renderHostView: () => {
        const container = document.getElementById('app');
        if (!container) {
            console.error('CryptoHack.renderHostView: App container not found');
            return;
        }
        const game = CryptoHack.game;
        if (!game) {
            console.error('CryptoHack.renderHostView: No game data');
            return;
        }
        
        const playerCount = Array.isArray(game.players) ? game.players.length : 0;
        
        container.innerHTML = `
            <div class="crypto-hack-host">
                <div class="game-header">
                    <div class="game-title">
                        <span class="game-icon">🔐</span>
                        <h1>Crypto Hack</h1>
                        <span class="game-code">Code: ${game.joinCode || 'N/A'}</span>
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
                            <span class="stat-value" id="player-count">${playerCount}</span>
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
        if (!container) {
            console.error('CryptoHack.renderPlayerView: App container not found');
            return;
        }
        const game = CryptoHack.game;
        if (!game) {
            console.error('CryptoHack.renderPlayerView: No game data');
            return;
        }
        
        const totalQuestions = CryptoHack.questions.length || 1;
        
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
                        ${CryptoHack.shield ? `<span class="shield-badge">🛡️ Protected (${CryptoHack.shieldTurns})</span>` : ''}
                        <span class="question-progress">Q${CryptoHack.currentQuestionIndex + 1}/${totalQuestions}</span>
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
        if (!CryptoHack.questions || CryptoHack.questions.length === 0) {
            return '<div class="error-message">No questions available. Please contact your teacher.</div>';
        }
        
        if (CryptoHack.currentQuestionIndex >= CryptoHack.questions.length) {
            return CryptoHack.renderGameComplete();
        }
        
        const q = CryptoHack.questions[CryptoHack.currentQuestionIndex];
        if (!q || !Array.isArray(q.options) || q.options.length === 0) {
            console.error('Invalid question data at index', CryptoHack.currentQuestionIndex);
            return '<div class="error-message">Error loading question. Skipping...</div>';
        }
        
        // Shuffle options using Helpers or fallback to Fisher-Yates
        let shuffledOptions;
        if (typeof Helpers !== 'undefined' && Helpers.shuffleOptions) {
            const shuffled = Helpers.shuffleOptions(q);
            shuffledOptions = shuffled.options.map((opt, i) => ({
                text: opt || '',
                originalIndex: q.options.indexOf(opt)
            }));
            // Fix: track where original correct answer is now
            CryptoHack.currentCorrectIndex = shuffled.answer;
        } else {
            // Fallback: Fisher-Yates shuffle
            const optionsWithIndices = q.options.map((opt, idx) => ({ text: opt || '', originalIndex: idx }));
            for (let i = optionsWithIndices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
            }
            shuffledOptions = optionsWithIndices;
            CryptoHack.currentCorrectIndex = shuffledOptions.findIndex(opt => opt.originalIndex === q.answer);
        }
        
        return `
            <div class="crypto-question-card">
                <div class="question-header">
                    <span class="question-topic">${CryptoHack.getTopicName(q.topic)}</span>
                    <span class="question-number">Question ${CryptoHack.currentQuestionIndex + 1} of ${CryptoHack.questions.length}</span>
                </div>
                
                <div class="question-text">${q.question || 'Question text missing'}</div>
                
                <div class="crypto-options">
                    ${shuffledOptions.map((opt, i) => `
                        <button class="crypto-option" onclick="CryptoHack.submitAnswer(${opt.originalIndex}, this)">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            <span class="option-text">${opt.text}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    getTopicName: (topicId) => {
        if (typeof TOPICS === 'undefined' || !Array.isArray(TOPICS)) {
            return 'General';
        }
        const topic = TOPICS.find(t => t && t.id === topicId);
        return topic?.name || 'General';
    },
    
    submitAnswer: (answerIndex, btn) => {
        if (!btn) return;
        
        const q = CryptoHack.questions[CryptoHack.currentQuestionIndex];
        if (!q) {
            console.error('No current question found');
            CryptoHack.nextQuestion();
            return;
        }
        
        const isCorrect = answerIndex === q.answer;
        
        // Disable all buttons and highlight correct one
        document.querySelectorAll('.crypto-option').forEach((b) => {
            b.disabled = true;
            const btnOnclick = b.getAttribute('onclick') || '';
            const match = btnOnclick.match(/submitAnswer\((\d+)/);
            if (match && parseInt(match[1]) === q.answer) {
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
        
        // Shield protects from losses
        if (change < 0 && CryptoHack.shield) {
            change = 0;
            result = { ...result, message: '🛡️ Shield blocked the trap!' };
        }
        
        CryptoHack.crypto = Math.max(0, CryptoHack.crypto + change);
        
        // Update display
        const cryptoAmountEl = document.getElementById('crypto-amount');
        if (cryptoAmountEl) {
            cryptoAmountEl.textContent = CryptoHack.crypto;
        }
        
        // Show result animation
        const content = document.getElementById('crypto-game-content');
        if (!content) return;
        
        const shieldCost = 50;
        const canAffordShield = CryptoHack.crypto >= shieldCost;
        
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
                    <div class="total-crypto">Total: ${CryptoHack.crypto} 💰</div>
                </div>
                
                <div class="hack-actions">
                    ${!CryptoHack.shield ? `
                        <button class="btn btn-secondary ${!canAffordShield ? 'btn-disabled' : ''}" 
                                onclick="CryptoHack.buyShield()" 
                                ${!canAffordShield ? 'disabled' : ''}>
                            🛡️ Buy Shield (${shieldCost}💰)
                        </button>
                    ` : `
                        <span class="shield-active">🛡️ Shield active (${CryptoHack.shieldTurns} turns left)</span>
                    `}
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
            if (!content) return;
            
            content.innerHTML = `
                <div class="hack-result fail">
                    <div class="vault-locked">
                        <span class="lock-icon">🔒</span>
                    </div>
                    
                    <div class="hack-outcome">
                        <div class="result-icon">❌</div>
                        <div class="result-message">Incorrect answer. Access denied.</div>
                        <div class="crypto-change neutral">No crypto gained</div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="CryptoHack.nextQuestion()">
                        Next Question →
                    </button>
                </div>
            `;
        }, 1000);
    },
    
    buyShield: () => {
        const shieldCost = 50;
        if (CryptoHack.crypto >= shieldCost) {
            CryptoHack.crypto -= shieldCost;
            CryptoHack.shield = true;
            CryptoHack.shieldTurns = 3;
            const cryptoAmountEl = document.getElementById('crypto-amount');
            if (cryptoAmountEl) {
                cryptoAmountEl.textContent = CryptoHack.crypto;
            }
            if (typeof Toast !== 'undefined' && Toast.show) {
                Toast.show('🛡️ Shield activated! Protected for 3 questions.', 'success');
            }
        } else {
            if (typeof Toast !== 'undefined' && Toast.show) {
                Toast.show('Not enough crypto for shield!', 'error');
            }
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
                <p>Calculating final results...</p>
            </div>
        `;
    },
    
    showFinalResults: () => {
        CryptoHack.updatePlayerScore();
        
        // Get updated game with all scores
        const game = typeof Classroom !== 'undefined' && Classroom.getGame 
            ? Classroom.getGame(CryptoHack.game?.id) 
            : CryptoHack.game;
        
        if (!game || !Array.isArray(game.players)) {
            console.error('CryptoHack.showFinalResults: Invalid game data');
            return;
        }
        
        const sortedPlayers = [...game.players].sort((a, b) => (b.score || 0) - (a.score || 0));
        const currentUser = typeof Auth !== 'undefined' && Auth.getCurrentUser ? Auth.getCurrentUser() : null;
        const myRank = currentUser ? sortedPlayers.findIndex(p => p.id === currentUser.id) + 1 : 0;
        
        const container = document.getElementById('app');
        if (!container) return;
        
        container.innerHTML = `
            <div class="crypto-results">
                <div class="results-header">
                    <h1>🔐 Crypto Hack Complete!</h1>
                </div>
                
                <div class="your-result">
                    <div class="rank-badge rank-${myRank <= 3 ? myRank : 'other'}">
                        ${myRank === 1 ? '🥇' : myRank === 2 ? '🥈' : myRank === 3 ? '🥉' : myRank > 0 ? '#' + myRank : '-'}
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
                            <div class="leaderboard-item ${currentUser && p.id === currentUser.id ? 'is-you' : ''}">
                                <span class="lb-rank">${i + 1}</span>
                                <span class="lb-name">${typeof Helpers !== 'undefined' && Helpers.escapeHtml ? Helpers.escapeHtml(p.username || 'Player') : (p.username || 'Player')}</span>
                                <span class="lb-score">${p.score || 0} 💰</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="typeof Router !== 'undefined' && Router.navigate ? Router.navigate('home') : null">
                    Return Home
                </button>
            </div>
        `;
    },
    
    renderLeaderboard: () => {
        const game = typeof Classroom !== 'undefined' && Classroom.getGame 
            ? Classroom.getGame(CryptoHack.game?.id) 
            : CryptoHack.game;
            
        if (!game || !Array.isArray(game.players) || game.players.length === 0) {
            return '<p class="no-players">Waiting for players to join...</p>';
        }
        
        const sorted = [...game.players].sort((a, b) => (b.score || 0) - (a.score || 0));
        
        return sorted.map((p, i) => `
            <div class="lb-row">
                <span class="lb-position">${i + 1}</span>
                <span class="lb-player">${typeof Helpers !== 'undefined' && Helpers.escapeHtml ? Helpers.escapeHtml(p.username || 'Player') : (p.username || 'Player')}</span>
                <span class="lb-crypto">${p.score || 0} 💰</span>
            </div>
        `).join('');
    },
    
    renderMiniLeaderboard: () => {
        const game = typeof Classroom !== 'undefined' && Classroom.getGame 
            ? Classroom.getGame(CryptoHack.game?.id) 
            : CryptoHack.game;
            
        if (!game || !Array.isArray(game.players) || game.players.length === 0) {
            return '';
        }
        
        const sorted = [...game.players].sort((a, b) => (b.score || 0) - (a.score || 0));
        const top3 = sorted.slice(0, 3);
        
        return `
            <div class="mini-lb-header">🏆 Top Players</div>
            ${top3.map((p, i) => `
                <div class="mini-lb-row">
                    <span class="mini-rank">${['🥇', '🥈', '🥉'][i]}</span>
                    <span class="mini-name">${typeof Helpers !== 'undefined' && Helpers.escapeHtml ? Helpers.escapeHtml(p.username || 'Player') : (p.username || 'Player')}</span>
                    <span class="mini-score">${p.score || 0}💰</span>
                </div>
            `).join('')}
        `;
    },
    
    updatePlayerScore: () => {
        if (typeof Classroom !== 'undefined' && Classroom.updatePlayer && CryptoHack.game?.id) {
            Classroom.updatePlayer(CryptoHack.game.id, {
                score: CryptoHack.crypto,
                questionsAnswered: CryptoHack.currentQuestionIndex
            });
        }
    },
    
    startUpdateLoop: () => {
        if (CryptoHack.updateInterval) {
            clearInterval(CryptoHack.updateInterval);
        }
        
        CryptoHack.updateInterval = setInterval(() => {
            const game = typeof Classroom !== 'undefined' && Classroom.getGame 
                ? Classroom.getGame(CryptoHack.game?.id) 
                : null;
                
            if (!game) {
                clearInterval(CryptoHack.updateInterval);
                CryptoHack.updateInterval = null;
                return;
            }
            
            if (CryptoHack.isHost) {
                // Update host leaderboard
                const lb = document.getElementById('crypto-leaderboard');
                if (lb) lb.innerHTML = CryptoHack.renderLeaderboard();
                
                const pc = document.getElementById('player-count');
                if (pc) pc.textContent = Array.isArray(game.players) ? game.players.length : 0;
            } else {
                // Update player mini leaderboard
                const mlb = document.getElementById('mini-leaderboard');
                if (mlb) mlb.innerHTML = CryptoHack.renderMiniLeaderboard();
            }
            
            // Check if game ended
            if (game.status === 'finished') {
                clearInterval(CryptoHack.updateInterval);
                CryptoHack.updateInterval = null;
                if (!CryptoHack.isHost) {
                    CryptoHack.showFinalResults();
                }
            }
        }, 2000);
    },
    
    endGame: () => {
        if (!confirm('End the game for all players?')) {
            return;
        }
        
        if (CryptoHack.updateInterval) {
            clearInterval(CryptoHack.updateInterval);
            CryptoHack.updateInterval = null;
        }
        
        if (typeof Classroom !== 'undefined' && Classroom.endGame && CryptoHack.game?.id) {
            Classroom.endGame(CryptoHack.game.id);
        }
        
        const game = typeof Classroom !== 'undefined' && Classroom.getGame 
            ? Classroom.getGame(CryptoHack.game?.id) 
            : CryptoHack.game;
            
        if (!game || !Array.isArray(game.players)) {
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate('teacher');
            }
            return;
        }
        
        const sorted = [...game.players].sort((a, b) => (b.score || 0) - (a.score || 0));
        
        // Show final results for host
        const container = document.getElementById('app');
        if (!container) return;
        
        const escapeHtml = (str) => {
            if (typeof Helpers !== 'undefined' && Helpers.escapeHtml) {
                return Helpers.escapeHtml(str);
            }
            return String(str || '').replace(/[&<>"']/g, m => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[m]));
        };
        
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
                            <span class="podium-name">${escapeHtml(sorted[1]?.username || 'Player 2')}</span>
                            <span class="podium-score">${sorted[1]?.score || 0} 💰</span>
                        </div>
                    ` : ''}
                    ${sorted.length > 0 ? `
                        <div class="podium-place first">
                            <span class="podium-avatar">🥇</span>
                            <span class="podium-name">${escapeHtml(sorted[0]?.username || 'Player 1')}</span>
                            <span class="podium-score">${sorted[0]?.score || 0} 💰</span>
                        </div>
                    ` : ''}
                    ${sorted.length > 2 ? `
                        <div class="podium-place third">
                            <span class="podium-avatar">🥉</span>
                            <span class="podium-name">${escapeHtml(sorted[2]?.username || 'Player 3')}</span>
                            <span class="podium-score">${sorted[2]?.score || 0} 💰</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="full-results">
                    ${sorted.map((p, i) => `
                        <div class="result-row">
                            <span class="result-rank">#${i + 1}</span>
                            <span class="result-name">${escapeHtml(p.username || 'Player')}</span>
                            <span class="result-score">${p.score || 0} 💰</span>
                        </div>
                    `).join('')}
                </div>
                
                <button class="btn btn-primary btn-large" onclick="typeof Router !== 'undefined' && Router.navigate ? Router.navigate('teacher') : null">
                    Back to Dashboard
                </button>
            </div>
        `;
    },

    cleanup: () => {
        // Clear update interval
        if (CryptoHack.updateInterval) {
            clearInterval(CryptoHack.updateInterval);
            CryptoHack.updateInterval = null;
        }
        // Reset state
        CryptoHack.game = null;
        CryptoHack.questions = [];
        CryptoHack.currentQuestionIndex = 0;
        CryptoHack.crypto = 0;
        CryptoHack.shield = false;
        CryptoHack.shieldTurns = 0;
        console.log('🔐 CryptoHack cleanup');
    }
};
