/**
 * GoldQuest.js - Gold Mining Adventure Game
 * Answer questions correctly to mine gold and upgrade your equipment
 */

const GoldQuest = {
    isPlaying: false,
    gold: 0,
    pickaxeLevel: 1,
    questions: [],
    currentQuestion: null,
    currentQuestionIndex: 0,
    mineDepth: 0,
    consecutiveCorrect: 0,
    goldMultiplier: 1,
    
    // Equipment upgrades
    equipment: {
        pickaxe: { level: 1, names: ['Wooden', 'Stone', 'Iron', 'Gold', 'Diamond', 'Emerald'], multipliers: [1, 1.5, 2, 3, 4, 5] },
        helmet: { level: 0, bonus: [0, 5, 10, 15, 20, 25] },
        cart: { level: 0, capacity: [100, 250, 500, 1000, 2500, 5000] }
    },
    
    upgradeCosts: {
        pickaxe: [0, 50, 150, 400, 1000, 2500],
        helmet: [25, 75, 200, 500, 1200],
        cart: [30, 100, 300, 800, 2000]
    },

    open: () => {
        const modal = document.createElement('div');
        modal.id = 'goldquest-modal';
        modal.className = 'game-modal active';
        modal.innerHTML = `<div class="game-container goldquest-container">${GoldQuest.renderMenu()}</div>`;
        document.body.appendChild(modal);
    },
    
    startAsHost: (game) => { GoldQuest.open(); },
    startAsPlayer: (game) => { GoldQuest.open(); },

    close: () => {
        const modal = document.getElementById('goldquest-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        GoldQuest.isPlaying = false;
    },

    renderMenu: () => {
        const stats = GoldQuest.getStats();
        return `
            <div class="game-header">
                <h2>⛏️ Gold Quest</h2>
                <button class="close-btn" onclick="GoldQuest.close()">✕</button>
            </div>
            <div class="goldquest-menu">
                <div class="gq-hero">
                    <div class="gq-mine-graphic"><span class="mine-icon">⛏️</span><span class="gold-pile">💰</span></div>
                    <h3>Mine for Knowledge Gold!</h3>
                    <p>Answer CS questions to mine gold, upgrade your equipment, and dig deeper!</p>
                </div>
                <div class="gq-stats">
                    <div class="gq-stat"><span class="stat-icon">🪙</span><span class="stat-value">${stats.totalGold || 0}</span><span class="stat-label">Total Gold</span></div>
                    <div class="gq-stat"><span class="stat-icon">⛏️</span><span class="stat-value">${stats.deepestMine || 0}m</span><span class="stat-label">Deepest Mine</span></div>
                    <div class="gq-stat"><span class="stat-icon">💎</span><span class="stat-value">${stats.gemsFound || 0}</span><span class="stat-label">Gems Found</span></div>
                </div>
                <div class="gq-difficulty">
                    <h4>Select Mine Difficulty</h4>
                    <div class="difficulty-options">
                        <button class="diff-btn" onclick="GoldQuest.start('easy')"><span class="diff-icon">🟢</span><span class="diff-name">Surface Mine</span><span class="diff-desc">1x Gold</span></button>
                        <button class="diff-btn" onclick="GoldQuest.start('medium')"><span class="diff-icon">🟡</span><span class="diff-name">Deep Mine</span><span class="diff-desc">2x Gold</span></button>
                        <button class="diff-btn" onclick="GoldQuest.start('hard')"><span class="diff-icon">🔴</span><span class="diff-name">Core Mine</span><span class="diff-desc">3x Gold</span></button>
                    </div>
                </div>
            </div>
        `;
    },
    
    start: (difficulty) => {
        GoldQuest.isPlaying = true;
        GoldQuest.gold = 0;
        GoldQuest.mineDepth = 0;
        GoldQuest.consecutiveCorrect = 0;
        GoldQuest.currentQuestionIndex = 0;
        GoldQuest.goldMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
        
        const stats = GoldQuest.getStats();
        GoldQuest.equipment = stats.equipment || GoldQuest.equipment;
        
        if (typeof QUESTIONS !== 'undefined') {
            GoldQuest.questions = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 20);
        } else {
            GoldQuest.questions = [
                { id: 'gq1', question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], answer: 0 },
                { id: 'gq2', question: 'How many bits in a byte?', options: ['4', '8', '16', '32'], answer: 1 }
            ];
        }
        
        GoldQuest.showMine();
    },
    
    showMine: () => {
        const container = document.querySelector('.goldquest-container');
        if (!container) return;
        
        const pickaxeName = GoldQuest.equipment.pickaxe.names[GoldQuest.equipment.pickaxe.level - 1];
        
        container.innerHTML = `
            <div class="game-header"><h2>⛏️ Mining...</h2><button class="close-btn" onclick="GoldQuest.close()">✕</button></div>
            <div class="gq-mining">
                <div class="gq-hud">
                    <div class="hud-item"><span>🪙</span><span id="gq-gold">${GoldQuest.gold}</span></div>
                    <div class="hud-item"><span>📏</span><span id="gq-depth">${GoldQuest.mineDepth}m</span></div>
                    <div class="hud-item"><span>🔥</span><span id="gq-streak">${GoldQuest.consecutiveCorrect}x</span></div>
                    <div class="hud-item"><span>⛏️</span><span>${pickaxeName}</span></div>
                </div>
                <div class="mine-shaft" id="mine-shaft"><div class="miner">⛏️</div></div>
                <div class="gq-question-area" id="gq-question">${GoldQuest.renderQuestion()}</div>
                <div class="gq-actions">
                    <button class="btn btn-secondary" onclick="GoldQuest.openShop()">🛒 Shop</button>
                    <button class="btn btn-warning" onclick="GoldQuest.endMining()">🚪 Exit</button>
                </div>
            </div>
        `;
    },
    
    renderQuestion: () => {
        if (GoldQuest.currentQuestionIndex >= GoldQuest.questions.length) {
            GoldQuest.endMining();
            return '';
        }
        
        const q = GoldQuest.questions[GoldQuest.currentQuestionIndex];
        GoldQuest.currentQuestion = q;
        
        return `
            <div class="gq-question">
                <p class="question-text">${q.question}</p>
                <div class="gq-options">
                    ${q.options.map((opt, i) => `<button class="gq-option" onclick="GoldQuest.answer(${i})">${opt}</button>`).join('')}
                </div>
            </div>
        `;
    },
    
    answer: (index) => {
        const q = GoldQuest.currentQuestion;
        if (!q) return;
        
        const isCorrect = index === q.answer;
        const buttons = document.querySelectorAll('.gq-option');
        
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === q.answer) btn.classList.add('correct');
            else if (i === index && !isCorrect) btn.classList.add('incorrect');
        });
        
        if (isCorrect) {
            GoldQuest.consecutiveCorrect++;
            GoldQuest.mineDepth += 5;
            
            const baseGold = 10;
            const pickaxeMultiplier = GoldQuest.equipment.pickaxe.multipliers[GoldQuest.equipment.pickaxe.level - 1];
            const helmetBonus = GoldQuest.equipment.helmet.bonus[GoldQuest.equipment.helmet.level] || 0;
            const streakBonus = Math.min(GoldQuest.consecutiveCorrect, 5);
            
            const goldEarned = Math.round((baseGold + helmetBonus) * pickaxeMultiplier * GoldQuest.goldMultiplier * (1 + streakBonus * 0.1));
            GoldQuest.gold += goldEarned;
            
            document.getElementById('gq-gold').textContent = GoldQuest.gold;
            document.getElementById('gq-depth').textContent = GoldQuest.mineDepth + 'm';
            document.getElementById('gq-streak').textContent = GoldQuest.consecutiveCorrect + 'x';
            
            // Show gold popup
            const shaft = document.getElementById('mine-shaft');
            if (shaft) {
                const popup = document.createElement('div');
                popup.className = 'gold-popup';
                popup.textContent = `+${goldEarned} 🪙`;
                shaft.appendChild(popup);
                setTimeout(() => popup.remove(), 1000);
            }
            
            if (typeof SRSSystem !== 'undefined') SRSSystem.recordAnswer(q.id, true);
            if (typeof SoundFX !== 'undefined') SoundFX.play('success');
        } else {
            GoldQuest.consecutiveCorrect = 0;
            document.getElementById('gq-streak').textContent = '0x';
            if (typeof SRSSystem !== 'undefined') SRSSystem.recordAnswer(q.id, false);
            if (typeof SoundFX !== 'undefined') SoundFX.play('error');
        }
        
        if (typeof StreakSystem !== 'undefined') {
            StreakSystem.recordActivity('question');
            if (isCorrect) StreakSystem.recordActivity('correct');
        }
        
        setTimeout(() => {
            GoldQuest.currentQuestionIndex++;
            const questionArea = document.getElementById('gq-question');
            if (questionArea) questionArea.innerHTML = GoldQuest.renderQuestion();
        }, 1500);
    },
    
    openShop: () => {
        const eq = GoldQuest.equipment;
        const costs = GoldQuest.upgradeCosts;
        
        const canUpgrade = (type) => eq[type].level < costs[type].length && GoldQuest.gold >= costs[type][eq[type].level];
        
        Modal.show({
            title: '🛒 Mining Shop',
            content: `
                <div class="gq-shop">
                    <p>Current Gold: <strong>${GoldQuest.gold} 🪙</strong></p>
                    <div class="shop-items">
                        <div class="shop-item">
                            <span>⛏️ ${eq.pickaxe.names[eq.pickaxe.level - 1]} Pickaxe (Lv ${eq.pickaxe.level}/6)</span>
                            ${eq.pickaxe.level < 6 ? `<button class="btn btn-small btn-primary" onclick="GoldQuest.upgrade('pickaxe')" ${canUpgrade('pickaxe') ? '' : 'disabled'}>${costs.pickaxe[eq.pickaxe.level]} 🪙</button>` : '<span>MAX</span>'}
                        </div>
                        <div class="shop-item">
                            <span>⛑️ Mining Helmet (Lv ${eq.helmet.level}/5)</span>
                            ${eq.helmet.level < 5 ? `<button class="btn btn-small btn-primary" onclick="GoldQuest.upgrade('helmet')" ${canUpgrade('helmet') ? '' : 'disabled'}>${costs.helmet[eq.helmet.level]} 🪙</button>` : '<span>MAX</span>'}
                        </div>
                    </div>
                </div>
            `,
            footer: '<button class="btn btn-secondary" onclick="Modal.close()">Close</button>'
        });
    },
    
    upgrade: (type) => {
        const cost = GoldQuest.upgradeCosts[type][GoldQuest.equipment[type].level];
        if (GoldQuest.gold >= cost) {
            GoldQuest.gold -= cost;
            GoldQuest.equipment[type].level++;
            const stats = GoldQuest.getStats();
            stats.equipment = GoldQuest.equipment;
            GoldQuest.saveStats(stats);
            Toast.show(`⬆️ ${type} upgraded!`, 'success');
            Modal.close();
            GoldQuest.openShop();
        }
    },
    
    endMining: () => {
        GoldQuest.isPlaying = false;
        const stats = GoldQuest.getStats();
        stats.totalGold = (stats.totalGold || 0) + GoldQuest.gold;
        stats.deepestMine = Math.max(stats.deepestMine || 0, GoldQuest.mineDepth);
        stats.equipment = GoldQuest.equipment;
        GoldQuest.saveStats(stats);
        
        const xpEarned = Math.round(GoldQuest.gold / 5);
        if (typeof AppState !== 'undefined') {
            const user = AppState.getState('user') || {};
            user.xp = (user.xp || 0) + xpEarned;
            AppState.setState('user', user);
        }
        
        const container = document.querySelector('.goldquest-container');
        if (container) {
            container.innerHTML = `
                <div class="game-header"><h2>⛏️ Mining Complete!</h2><button class="close-btn" onclick="GoldQuest.close()">✕</button></div>
                <div class="gq-results">
                    <div class="results-graphic"><span class="big-icon">🪙</span></div>
                    <div class="results-stats">
                        <div class="result-item"><span>Gold Mined</span><span class="result-value">${GoldQuest.gold}</span></div>
                        <div class="result-item"><span>Depth</span><span class="result-value">${GoldQuest.mineDepth}m</span></div>
                        <div class="result-item"><span>XP Earned</span><span class="result-value">+${xpEarned}</span></div>
                    </div>
                    <div class="results-actions">
                        <button class="btn btn-primary" onclick="GoldQuest.close(); GoldQuest.open();">Play Again</button>
                        <button class="btn btn-secondary" onclick="GoldQuest.close()">Exit</button>
                    </div>
                </div>
            `;
        }
    },
    
    getStats: () => { try { return JSON.parse(localStorage.getItem('csmaster_goldquest') || '{}'); } catch (e) { return {}; } },
    saveStats: (stats) => { localStorage.setItem('csmaster_goldquest', JSON.stringify(stats)); },

    cleanup: () => {
        // Stop game
        GoldQuest.isPlaying = false;
        console.log('⛏️ GoldQuest cleanup');
    }
};
