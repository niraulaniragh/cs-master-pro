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
    
    towerTypes: {
        basic: { name: 'Code Tower', cost: 25, damage: 10, icon: '🗼', color: '#3b82f6' },
        fire: { name: 'Bug Blaster', cost: 50, damage: 20, icon: '🔥', color: '#ef4444' },
        ice: { name: 'Freeze Ray', cost: 50, damage: 15, icon: '❄️', color: '#06b6d4', slow: true },
        lightning: { name: 'Logic Zapper', cost: 75, damage: 30, icon: '⚡', color: '#eab308' }
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
        const modal = document.getElementById('td-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        TowerDefense.isPlaying = false;
        TowerDefense.waveInProgress = false;
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
        
        if (typeof QUESTIONS !== 'undefined') {
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
        if (TowerDefense.gold < tower.cost) {
            Toast.show('Not enough gold!', 'error');
            return;
        }
        
        if (TowerDefense.towers.length >= 6) {
            Toast.show('Maximum towers reached!', 'warning');
            return;
        }
        
        TowerDefense.gold -= tower.cost;
        TowerDefense.towers.push({ type, ...tower, id: Date.now() });
        
        document.getElementById('td-gold').textContent = TowerDefense.gold;
        TowerDefense.renderTowers();
        
        if (typeof SoundFX !== 'undefined') SoundFX.play('click');
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
        if (TowerDefense.waveInProgress) return;
        TowerDefense.waveInProgress = true;
        
        document.getElementById('start-wave-btn').disabled = true;
        document.getElementById('start-wave-btn').textContent = '⚔️ Wave in Progress...';
        
        // Generate enemies for this wave
        TowerDefense.generateEnemies();
        
        // Start the wave loop
        TowerDefense.waveLoop();
    },
    
    generateEnemies: () => {
        TowerDefense.enemies = [];
        const wave = TowerDefense.wave;
        const diffMult = TowerDefense.difficulty === 'easy' ? 0.8 : TowerDefense.difficulty === 'hard' ? 1.3 : 1;
        
        // More enemies each wave
        const bugCount = Math.min(3 + wave, 10);
        const virusCount = wave >= 2 ? Math.min(wave - 1, 5) : 0;
        const trojanCount = wave >= 4 ? Math.min(wave - 3, 3) : 0;
        const bossCount = wave % 5 === 0 ? 1 : 0;
        
        const addEnemy = (type, count) => {
            const base = TowerDefense.enemyTypes[type];
            for (let i = 0; i < count; i++) {
                TowerDefense.enemies.push({
                    ...base,
                    health: Math.round(base.health * diffMult * (1 + wave * 0.1)),
                    maxHealth: Math.round(base.health * diffMult * (1 + wave * 0.1)),
                    position: -10 - (i * 15), // Staggered spawn
                    id: Date.now() + Math.random()
                });
            }
        };
        
        addEnemy('bug', bugCount);
        addEnemy('virus', virusCount);
        addEnemy('trojan', trojanCount);
        if (bossCount) addEnemy('boss', bossCount);
        
        // Shuffle enemies
        TowerDefense.enemies.sort(() => Math.random() - 0.5);
    },
    
    waveLoop: () => {
        if (!TowerDefense.isPlaying || !TowerDefense.waveInProgress) return;
        
        // Move enemies
        let allDead = true;
        TowerDefense.enemies.forEach(enemy => {
            if (enemy.health > 0) {
                allDead = false;
                enemy.position += enemy.speed;
                
                // Check if reached base
                if (enemy.position >= 100) {
                    TowerDefense.health -= 10;
                    enemy.health = 0;
                    document.getElementById('td-health').textContent = TowerDefense.health;
                    
                    if (TowerDefense.health <= 0) {
                        TowerDefense.gameOver();
                        return;
                    }
                }
            }
        });
        
        // Tower attacks
        TowerDefense.towers.forEach(tower => {
            const target = TowerDefense.enemies.find(e => e.health > 0 && e.position >= 0 && e.position <= 100);
            if (target) {
                target.health -= tower.damage;
                if (target.health <= 0) {
                    TowerDefense.gold += target.reward;
                    TowerDefense.score += target.reward;
                    document.getElementById('td-gold').textContent = TowerDefense.gold;
                    document.getElementById('td-score').textContent = TowerDefense.score;
                }
            }
        });
        
        // Render enemies
        TowerDefense.renderEnemies();
        
        // Check wave complete
        if (allDead || TowerDefense.enemies.every(e => e.health <= 0)) {
            TowerDefense.waveComplete();
            return;
        }
        
        // Show question periodically
        if (!TowerDefense.questionActive && Math.random() < 0.1) {
            TowerDefense.showQuestion();
        }
        
        requestAnimationFrame(() => setTimeout(() => TowerDefense.waveLoop(), 100));
    },
    
    renderEnemies: () => {
        const track = document.getElementById('td-track');
        if (!track) return;
        
        track.innerHTML = TowerDefense.enemies
            .filter(e => e.health > 0 && e.position >= 0)
            .map(e => `
                <div class="td-enemy" style="left: ${e.position}%">
                    <div class="enemy-health" style="width: ${(e.health / e.maxHealth) * 100}%"></div>
                    <span class="enemy-sprite">${e.icon}</span>
                </div>
            `).join('');
    },
    
    showQuestion: () => {
        if (TowerDefense.currentQuestionIndex >= TowerDefense.questions.length) {
            TowerDefense.currentQuestionIndex = 0;
        }
        
        const q = TowerDefense.questions[TowerDefense.currentQuestionIndex];
        TowerDefense.currentQuestion = q;
        TowerDefense.questionActive = true;
        
        const questionArea = document.getElementById('td-question');
        if (questionArea) {
            questionArea.style.display = 'block';
            questionArea.innerHTML = `
                <div class="td-question-card">
                    <p>${q.question}</p>
                    <div class="td-options">
                        ${q.options.map((opt, i) => `<button class="td-option" onclick="TowerDefense.answer(${i})">${opt}</button>`).join('')}
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
            TowerDefense.enemies.forEach(e => {
                if (e.health > 0) {
                    e.health -= 20;
                    if (e.health <= 0) {
                        TowerDefense.gold += e.reward;
                        TowerDefense.score += e.reward;
                    }
                }
            });
            document.getElementById('td-gold').textContent = TowerDefense.gold;
            document.getElementById('td-score').textContent = TowerDefense.score;
            
            Toast.show('⚡ Towers powered up! Bonus damage dealt!', 'success');
            if (typeof SRSSystem !== 'undefined') SRSSystem.recordAnswer(q.id, true);
        } else {
            Toast.show('❌ Wrong! Enemies advance faster!', 'error');
            TowerDefense.enemies.forEach(e => e.position += 10);
            if (typeof SRSSystem !== 'undefined') SRSSystem.recordAnswer(q.id, false);
        }
        
        if (typeof StreakSystem !== 'undefined') {
            StreakSystem.recordActivity('question');
            if (isCorrect) StreakSystem.recordActivity('correct');
        }
        
        TowerDefense.currentQuestionIndex++;
        document.getElementById('td-question').style.display = 'none';
    },
    
    waveComplete: () => {
        TowerDefense.waveInProgress = false;
        TowerDefense.wave++;
        
        // Bonus gold
        const waveBonus = TowerDefense.wave * 10;
        TowerDefense.gold += waveBonus;
        
        Toast.show(`🌊 Wave ${TowerDefense.wave - 1} Complete! +${waveBonus} gold`, 'success');
        
        // Update UI
        document.getElementById('td-wave').textContent = TowerDefense.wave;
        document.getElementById('td-gold').textContent = TowerDefense.gold;
        
        const btn = document.getElementById('start-wave-btn');
        if (btn) {
            btn.disabled = false;
            btn.textContent = `▶️ Start Wave ${TowerDefense.wave}`;
        }
    },
    
    gameOver: () => {
        TowerDefense.isPlaying = false;
        TowerDefense.waveInProgress = false;
        
        const stats = TowerDefense.getStats();
        stats.highScore = Math.max(stats.highScore || 0, TowerDefense.score);
        stats.highestWave = Math.max(stats.highestWave || 0, TowerDefense.wave - 1);
        stats.totalKills = (stats.totalKills || 0) + TowerDefense.enemies.filter(e => e.health <= 0).length;
        TowerDefense.saveStats(stats);
        
        const xpEarned = Math.round(TowerDefense.score / 5);
        if (typeof AppState !== 'undefined') {
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
    
    getStats: () => { try { return JSON.parse(localStorage.getItem('csmaster_td') || '{}'); } catch (e) { return {}; } },
    saveStats: (stats) => { localStorage.setItem('csmaster_td', JSON.stringify(stats)); },

    cleanup: () => {
        // Stop game
        TowerDefense.isPlaying = false;
        TowerDefense.waveInProgress = false;
        TowerDefense.questionActive = false;
        console.log('🏰 TowerDefense cleanup');
    }
};
