/**
 * TowerDefense.js - Knowledge Tower Defense Game
 * Defend your base by answering questions to power your towers
 */

const TowerDefense = {
    isPlaying: false,
    health: 100,
    gold: 50,
    wave: 1,
    score: 0,
    questions: [],
    currentQuestion: null,
    currentQuestionIndex: 0,
    towers: [],
    enemies: [],
    waveInProgress: false,
    questionActive: false,
    waveLoopTimer: null,
    lastAttackTime: {}, // Track per-tower attack cooldowns
    attackCooldown: 500, // ms between tower attacks
    
    towerTypes: {
        basic: { name: 'Code Tower', cost: 25, damage: 10, range: 100, icon: '🗼', color: '#3b82f6' },
        fire: { name: 'Bug Blaster', cost: 50, damage: 20, range: 100, icon: '🔥', color: '#ef4444' },
        ice: { name: 'Freeze Ray', cost: 50, damage: 15, range: 100, icon: '❄️', color: '#06b6d4', slow: 0.5 },
        lightning: { name: 'Logic Zapper', cost: 75, damage: 30, range: 100, icon: '⚡', color: '#eab308' }
    },
    
    enemyTypes: {
        bug: { name: 'Bug', health: 30, speed: 1, icon: '🐛', reward: 10 },
        virus: { name: 'Virus', health: 50, speed: 1.5, icon: '🦠', reward: 15 },
        trojan: { name: 'Trojan', health: 80, speed: 0.8, icon: '🐴', reward: 25 },
        worm: { name: 'Worm', health: 100, speed: 1.2, icon: '🪱', reward: 30 },
        boss: { name: 'Malware Boss', health: 200, speed: 0.5, icon: '👾', reward: 100 }
    },

    open: () => {
        const modal = document.createElement('div');
        modal.id = 'td-modal';
        modal.className = 'game-modal active';
        modal.innerHTML = `<div class="game-container td-container">${TowerDefense.renderMenu()}</div>`;
        document.body.appendChild(modal);
    },
    
    startAsHost: (game) => { TowerDefense.open(); },
    startAsPlayer: (game) => { TowerDefense.open(); },

    close: () => {
        TowerDefense.cleanup();
        const modal = document.getElementById('td-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    renderMenu: () => {
        const stats = TowerDefense.getStats();
        return `
            <div class="game-header">
                <h2>🏰 Tower Defense</h2>
                <button class="close-btn" onclick="TowerDefense.close()">✕</button>
            </div>
            <div class="td-menu">
                <div class="td-hero">
                    <div class="td-graphic">
                        <span class="tower-icon">🏰</span>
                        <span class="enemy-icon">🐛</span>
                        <span class="enemy-icon">🦠</span>
                    </div>
                    <h3>Defend Your Knowledge Base!</h3>
                    <p>Answer questions to power your towers and defeat the bugs!</p>
                </div>
                <div class="td-stats">
                    <div class="td-stat"><span>🏆</span><span>${stats.highScore || 0}</span><span>High Score</span></div>
                    <div class="td-stat"><span>🌊</span><span>${stats.highestWave || 0}</span><span>Best Wave</span></div>
                    <div class="td-stat"><span>🐛</span><span>${stats.totalKills || 0}</span><span>Bugs Killed</span></div>
                </div>
                <div class="td-start">
                    <h4>Select Difficulty</h4>
                    <div class="td-difficulties">
                        <button class="td-diff-btn" onclick="TowerDefense.start('easy')">
                            <span>🟢</span><span>Easy</span><span>More gold, weaker enemies</span>
                        </button>
                        <button class="td-diff-btn" onclick="TowerDefense.start('normal')">
                            <span>🟡</span><span>Normal</span><span>Balanced challenge</span>
                        </button>
                        <button class="td-diff-btn" onclick="TowerDefense.start('hard')">
                            <span>🔴</span><span>Hard</span><span>Less gold, stronger enemies</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    start: (difficulty) => {
        TowerDefense.isPlaying = true;
        TowerDefense.health = 100;
        TowerDefense.gold = difficulty === 'easy' ? 75 : difficulty === 'normal' ? 50 : 35;
        TowerDefense.wave = 1;
        TowerDefense.score = 0;
        TowerDefense.towers = [];
        TowerDefense.enemies = [];
        TowerDefense.currentQuestionIndex = 0;
        TowerDefense.difficulty = difficulty;
        TowerDefense.lastAttackTime = {};
        TowerDefense.waveInProgress = false;
        TowerDefense.questionActive = false;
        
        if (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS) && QUESTIONS.length > 0) {
            TowerDefense.questions = [...QUESTIONS].sort(() => Math.random() - 0.5);
        } else {
            TowerDefense.questions = [
                { id: 'td1', question: 'What is an algorithm?', options: ['A set of instructions', 'A type of computer', 'A programming language', 'A data type'], answer: 0 },
                { id: 'td2', question: 'What does RAM store?', options: ['Permanent data', 'Temporary data', 'Programs only', 'Nothing'], answer: 1 }
            ];
        }
        
        TowerDefense.showGame();
    },
    
    showGame: () => {
        const container = document.querySelector('.td-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="game-header">
                <h2>🏰 Wave ${TowerDefense.wave}</h2>
                <button class="close-btn" onclick="TowerDefense.close()">✕</button>
            </div>
            <div class="td-game">
                <div class="td-hud">
                    <div class="hud-item"><span>❤️</span><span id="td-health">${TowerDefense.health}</span></div>
                    <div class="hud-item"><span>🪙</span><span id="td-gold">${TowerDefense.gold}</span></div>
                    <div class="hud-item"><span>🌊</span><span id="td-wave">${TowerDefense.wave}</span></div>
                    <div class="hud-item"><span>🎯</span><span id="td-score">${TowerDefense.score}</span></div>
                </div>
                
                <div class="td-battlefield" id="td-battlefield">
                    <div class="td-path">
                        <div class="td-spawn">🚪</div>
                        <div class="td-track" id="td-track"></div>
                        <div class="td-base">🏰</div>
                    </div>
                    <div class="td-towers" id="td-towers"></div>
                </div>
                
                <div class="td-controls">
                    <div class="td-shop">
                        <span class="shop-label">Build Tower:</span>
                        ${Object.entries(TowerDefense.towerTypes).map(([key, tower]) => `
                            <button class="tower-btn" onclick="TowerDefense.buildTower('${key}')" title="${tower.name} - ${tower.cost} gold">
                                <span class="tower-icon">${tower.icon}</span>
                                <span class="tower-cost">${tower.cost}</span>
                            </button>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" id="start-wave-btn" onclick="TowerDefense.startWave()">
                        ▶️ Start Wave ${TowerDefense.wave}
                    </button>
                </div>
                
                <div class="td-question-area" id="td-question" style="display: none;"></div>
            </div>
        `;
        
        TowerDefense.renderTowers();
    },
    
    buildTower: (type) => {
        const tower = TowerDefense.towerTypes[type];
        if (!tower) {
            TowerDefense.showToast('Invalid tower type!', 'error');
            return;
        }
        
        if (TowerDefense.gold < tower.cost) {
            TowerDefense.showToast('Not enough gold!', 'error');
            return;
        }
        
        if (TowerDefense.towers.length >= 6) {
            TowerDefense.showToast('Maximum towers reached!', 'warning');
            return;
        }
        
        TowerDefense.gold -= tower.cost;
        const towerId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        TowerDefense.towers.push({ type, ...tower, id: towerId });
        TowerDefense.lastAttackTime[towerId] = 0;
        
        TowerDefense.updateHUD('gold', TowerDefense.gold);
        TowerDefense.renderTowers();
        
        if (typeof SoundFX !== 'undefined' && SoundFX.play) SoundFX.play('click');
    },
    
    renderTowers: () => {
        const container = document.getElementById('td-towers');
        if (!container) return;
        
        container.innerHTML = TowerDefense.towers.map((tower, i) => `
            <div class="td-tower" style="--tower-color: ${tower.color}; left: ${10 + i * 15}%;">
                <span class="tower-sprite">${tower.icon}</span>
                <span class="tower-name">${tower.name}</span>
            </div>
        `).join('');
    },
    
    startWave: () => {
        if (TowerDefense.waveInProgress || !TowerDefense.isPlaying) return;
        TowerDefense.waveInProgress = true;
        
        const btn = document.getElementById('start-wave-btn');
        if (btn) {
            btn.disabled = true;
            btn.textContent = '⚔️ Wave in Progress...';
        }
        
        // Generate enemies for this wave
        TowerDefense.generateEnemies();
        
        // Start the wave loop
        TowerDefense.waveLoop();
    },
    
    generateEnemies: () => {
        TowerDefense.enemies = [];
        const wave = TowerDefense.wave;
        const diffMult = TowerDefense.difficulty === 'easy' ? 0.8 : TowerDefense.difficulty === 'hard' ? 1.3 : 1;
        
        // More enemies each wave with caps
        const bugCount = Math.min(3 + wave, 10);
        const virusCount = wave >= 2 ? Math.min(wave - 1, 5) : 0;
        const trojanCount = wave >= 4 ? Math.min(wave - 3, 3) : 0;
        const wormCount = wave >= 6 ? Math.min(wave - 5, 2) : 0;
        const bossCount = wave % 5 === 0 ? 1 : 0;
        
        const addEnemy = (type, count) => {
            const base = TowerDefense.enemyTypes[type];
            if (!base) return;
            
            for (let i = 0; i < count; i++) {
                const scaledHealth = Math.round(base.health * diffMult * (1 + wave * 0.1));
                TowerDefense.enemies.push({
                    ...base,
                    type,
                    health: scaledHealth,
                    maxHealth: scaledHealth,
                    baseSpeed: base.speed,
                    position: -10 - (TowerDefense.enemies.length * 12), // Staggered spawn based on total count
                    slowedUntil: 0,
                    id: Date.now() + '_' + Math.random().toString(36).substr(2, 9)
                });
            }
        };
        
        addEnemy('bug', bugCount);
        addEnemy('virus', virusCount);
        addEnemy('trojan', trojanCount);
        addEnemy('worm', wormCount);
        if (bossCount) addEnemy('boss', bossCount);
        
        // Shuffle enemies for varied spawn order
        TowerDefense.enemies.sort(() => Math.random() - 0.5);
        
        // Re-stagger positions after shuffle
        TowerDefense.enemies.forEach((enemy, i) => {
            enemy.position = -10 - (i * 12);
        });
    },
    
    waveLoop: () => {
        if (!TowerDefense.isPlaying || !TowerDefense.waveInProgress) return;
        
        const now = Date.now();
        let allDead = true;
        let reachedBase = false;
        
        // Move enemies
        for (let i = 0; i < TowerDefense.enemies.length; i++) {
            const enemy = TowerDefense.enemies[i];
            if (enemy.health <= 0) continue;
            
            allDead = false;
            
            // Calculate speed (check for slow effect)
            let speed = enemy.baseSpeed;
            if (enemy.slowedUntil && now < enemy.slowedUntil) {
                speed *= 0.5;
            }
            enemy.speed = speed;
            
            enemy.position += speed;
            
            // Check if reached base
            if (enemy.position >= 100) {
                TowerDefense.health -= 10;
                enemy.health = 0;
                reachedBase = true;
            }
        }
        
        // Update health display if enemies reached base
        if (reachedBase) {
            TowerDefense.updateHUD('health', TowerDefense.health);
            
            if (TowerDefense.health <= 0) {
                TowerDefense.gameOver();
                return;
            }
        }
        
        // Tower attacks with cooldown
        TowerDefense.processTowerAttacks(now);
        
        // Render enemies (batched)
        TowerDefense.renderEnemies();
        
        // Check wave complete
        const allEnemiesDead = TowerDefense.enemies.every(e => e.health <= 0);
        if (allDead || allEnemiesDead) {
            TowerDefense.waveComplete();
            return;
        }
        
        // Show question periodically (reduced frequency, only when not already active)
        if (!TowerDefense.questionActive && Math.random() < 0.05) {
            TowerDefense.showQuestion();
        }
        
        // Schedule next frame with proper timer tracking
        TowerDefense.waveLoopTimer = setTimeout(() => {
            if (TowerDefense.isPlaying && TowerDefense.waveInProgress) {
                requestAnimationFrame(() => TowerDefense.waveLoop());
            }
        }, 100);
    },
    
    processTowerAttacks: (now) => {
        // Find alive enemies in range, sorted by position (closest to base first)
        const aliveEnemies = TowerDefense.enemies
            .filter(e => e.health > 0 && e.position >= 0 && e.position <= 100)
            .sort((a, b) => b.position - a.position);
        
        if (aliveEnemies.length === 0) return;
        
        let goldGained = 0;
        let scoreGained = 0;
        
        TowerDefense.towers.forEach(tower => {
            // Check cooldown
            const lastAttack = TowerDefense.lastAttackTime[tower.id] || 0;
            if (now - lastAttack < TowerDefense.attackCooldown) return;
            
            // Find target (prioritize closest to base)
            const target = aliveEnemies.find(e => e.health > 0);
            if (!target) return;
            
            // Attack
            TowerDefense.lastAttackTime[tower.id] = now;
            target.health -= tower.damage;
            
            // Apply slow effect for ice towers
            if (tower.slow) {
                target.slowedUntil = now + 2000; // 2 second slow
            }
            
            // Check if killed
            if (target.health <= 0) {
                goldGained += target.reward;
                scoreGained += target.reward;
            }
        });
        
        // Batch update gold/score
        if (goldGained > 0) {
            TowerDefense.gold += goldGained;
            TowerDefense.score += scoreGained;
            TowerDefense.updateHUD('gold', TowerDefense.gold);
            TowerDefense.updateHUD('score', TowerDefense.score);
        }
    },
    
    renderEnemies: () => {
        const track = document.getElementById('td-track');
        if (!track) return;
        
        // Build HTML in one pass
        const html = [];
        for (let i = 0; i < TowerDefense.enemies.length; i++) {
            const e = TowerDefense.enemies[i];
            if (e.health > 0 && e.position >= 0) {
                const healthPct = Math.max(0, (e.health / e.maxHealth) * 100);
                const isSlowed = e.slowedUntil && Date.now() < e.slowedUntil;
                html.push(`
                    <div class="td-enemy${isSlowed ? ' slowed' : ''}" style="left: ${Math.min(e.position, 100)}%">
                        <div class="enemy-health" style="width: ${healthPct}%"></div>
                        <span class="enemy-sprite">${e.icon}</span>
                    </div>
                `);
            }
        }
        track.innerHTML = html.join('');
    },
    
    showQuestion: () => {
        if (!TowerDefense.questions || TowerDefense.questions.length === 0) return;
        
        if (TowerDefense.currentQuestionIndex >= TowerDefense.questions.length) {
            TowerDefense.currentQuestionIndex = 0;
        }
        
        const q = TowerDefense.questions[TowerDefense.currentQuestionIndex];
        if (!q || !q.options || !Array.isArray(q.options)) return;
        
        TowerDefense.currentQuestion = q;
        TowerDefense.questionActive = true;
        
        const questionArea = document.getElementById('td-question');
        if (questionArea) {
            questionArea.style.display = 'block';
            questionArea.innerHTML = `
                <div class="td-question-card">
                    <p>${TowerDefense.escapeHtml(q.question)}</p>
                    <div class="td-options">
                        ${q.options.map((opt, i) => `<button class="td-option" onclick="TowerDefense.answer(${i})">${TowerDefense.escapeHtml(opt)}</button>`).join('')}
                    </div>
                </div>
            `;
        }
    },
    
    answer: (index) => {
        const q = TowerDefense.currentQuestion;
        if (!q) return;
        
        TowerDefense.questionActive = false;
        const isCorrect = index === q.answer;
        
        if (isCorrect) {
            // Power up towers - deal bonus damage to all enemies
            let goldGained = 0;
            let scoreGained = 0;
            
            TowerDefense.enemies.forEach(e => {
                if (e.health > 0) {
                    e.health -= 20;
                    if (e.health <= 0) {
                        goldGained += e.reward;
                        scoreGained += e.reward;
                    }
                }
            });
            
            TowerDefense.gold += goldGained;
            TowerDefense.score += scoreGained;
            TowerDefense.updateHUD('gold', TowerDefense.gold);
            TowerDefense.updateHUD('score', TowerDefense.score);
            
            TowerDefense.showToast('⚡ Towers powered up! Bonus damage dealt!', 'success');
            if (typeof SRSSystem !== 'undefined' && SRSSystem.recordAnswer) SRSSystem.recordAnswer(q.id, true);
        } else {
            TowerDefense.showToast('❌ Wrong! Enemies advance faster!', 'error');
            TowerDefense.enemies.forEach(e => {
                if (e.health > 0) e.position += 10;
            });
            if (typeof SRSSystem !== 'undefined' && SRSSystem.recordAnswer) SRSSystem.recordAnswer(q.id, false);
        }
        
        if (typeof StreakSystem !== 'undefined' && StreakSystem.recordActivity) {
            StreakSystem.recordActivity('question');
            if (isCorrect) StreakSystem.recordActivity('correct');
        }
        
        TowerDefense.currentQuestionIndex++;
        
        const questionArea = document.getElementById('td-question');
        if (questionArea) questionArea.style.display = 'none';
    },
    
    waveComplete: () => {
        TowerDefense.waveInProgress = false;
        
        // Clear any pending timer
        if (TowerDefense.waveLoopTimer) {
            clearTimeout(TowerDefense.waveLoopTimer);
            TowerDefense.waveLoopTimer = null;
        }
        
        TowerDefense.wave++;
        
        // Bonus gold scales with difficulty
        const diffBonus = TowerDefense.difficulty === 'easy' ? 1.2 : TowerDefense.difficulty === 'hard' ? 0.8 : 1;
        const waveBonus = Math.round(TowerDefense.wave * 10 * diffBonus);
        TowerDefense.gold += waveBonus;
        
        TowerDefense.showToast(`🌊 Wave ${TowerDefense.wave - 1} Complete! +${waveBonus} gold`, 'success');
        
        // Update UI
        TowerDefense.updateHUD('wave', TowerDefense.wave);
        TowerDefense.updateHUD('gold', TowerDefense.gold);
        
        const btn = document.getElementById('start-wave-btn');
        if (btn) {
            btn.disabled = false;
            btn.textContent = `▶️ Start Wave ${TowerDefense.wave}`;
        }
        
        // Update header
        const header = document.querySelector('.td-container .game-header h2');
        if (header) header.textContent = `🏰 Wave ${TowerDefense.wave}`;
    },
    
    gameOver: () => {
        TowerDefense.isPlaying = false;
        TowerDefense.waveInProgress = false;
        
        // Clear timer
        if (TowerDefense.waveLoopTimer) {
            clearTimeout(TowerDefense.waveLoopTimer);
            TowerDefense.waveLoopTimer = null;
        }
        
        const killCount = TowerDefense.enemies.filter(e => e.health <= 0).length;
        
        const stats = TowerDefense.getStats();
        stats.highScore = Math.max(stats.highScore || 0, TowerDefense.score);
        stats.highestWave = Math.max(stats.highestWave || 0, TowerDefense.wave - 1);
        stats.totalKills = (stats.totalKills || 0) + killCount;
        TowerDefense.saveStats(stats);
        
        const xpEarned = Math.round(TowerDefense.score / 5);
        if (typeof AppState !== 'undefined' && AppState.getState && AppState.setState) {
            const user = AppState.getState('user') || {};
            user.xp = (user.xp || 0) + xpEarned;
            AppState.setState('user', user);
        }
        
        const container = document.querySelector('.td-container');
        if (container) {
            container.innerHTML = `
                <div class="game-header"><h2>🏰 Game Over!</h2><button class="close-btn" onclick="TowerDefense.close()">✕</button></div>
                <div class="td-results">
                    <div class="results-graphic"><span class="big-icon">🏰</span></div>
                    <h3>Your base was overrun!</h3>
                    <div class="results-stats">
                        <div class="result-item"><span>Waves Survived</span><span>${TowerDefense.wave - 1}</span></div>
                        <div class="result-item"><span>Final Score</span><span>${TowerDefense.score}</span></div>
                        <div class="result-item"><span>Bugs Killed</span><span>${killCount}</span></div>
                        <div class="result-item"><span>XP Earned</span><span>+${xpEarned}</span></div>
                    </div>
                    <div class="results-actions">
                        <button class="btn btn-primary" onclick="TowerDefense.close(); TowerDefense.open();">Play Again</button>
                        <button class="btn btn-secondary" onclick="TowerDefense.close()">Exit</button>
                    </div>
                </div>
            `;
        }
    },
    
    // Helper: Update HUD element safely
    updateHUD: (id, value) => {
        const el = document.getElementById('td-' + id);
        if (el) el.textContent = value;
    },
    
    // Helper: Show toast notification with fallback
    showToast: (message, type) => {
        if (typeof Toast !== 'undefined' && Toast.show) {
            Toast.show(message, type);
        } else {
            console.log(`[${type}] ${message}`);
        }
    },
    
    // Helper: Escape HTML to prevent XSS
    escapeHtml: (text) => {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    getStats: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_td') || '{}');
        } catch (e) {
            console.warn('Failed to load TowerDefense stats:', e);
            return {};
        }
    },
    
    saveStats: (stats) => {
        try {
            localStorage.setItem('csmaster_td', JSON.stringify(stats));
        } catch (e) {
            console.warn('Failed to save TowerDefense stats:', e);
        }
    },

    cleanup: () => {
        // Stop game
        TowerDefense.isPlaying = false;
        TowerDefense.waveInProgress = false;
        TowerDefense.questionActive = false;
        
        // Clear any pending timers
        if (TowerDefense.waveLoopTimer) {
            clearTimeout(TowerDefense.waveLoopTimer);
            TowerDefense.waveLoopTimer = null;
        }
        
        // Reset state
        TowerDefense.towers = [];
        TowerDefense.enemies = [];
        TowerDefense.questions = [];
        TowerDefense.currentQuestion = null;
        TowerDefense.lastAttackTime = {};
        
        console.log('🏰 TowerDefense cleanup');
    }
};
