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
        GoldQuest.cleanup();
        const modal = document.getElementById('goldquest-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
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
        
        // Load saved equipment with proper defaults
        const stats = GoldQuest.getStats();
        if (stats.equipment) {
            GoldQuest.equipment = {
                pickaxe: { ...GoldQuest.equipment.pickaxe, level: stats.equipment.pickaxe?.level || 1 },
                helmet: { ...GoldQuest.equipment.helmet, level: stats.equipment.helmet?.level || 0 },
                cart: { ...GoldQuest.equipment.cart, level: stats.equipment.cart?.level || 0 }
            };
        }
        
        if (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS) && QUESTIONS.length > 0) {
            GoldQuest.questions = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 20);
        } else {
            GoldQuest.questions = [
                { id: 'gq1', question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], answer: 0 },
                { id: 'gq2', question: 'How many bits in a byte?', options: ['4', '8', '16', '32'], answer: 1 }
            ];
        }
        
        GoldQuest.showMine();
    },
    
    // Helper to safely get equipment values with bounds checking
    getPickaxeIndex: () => Math.max(0, Math.min(GoldQuest.equipment.pickaxe.level - 1, GoldQuest.equipment.pickaxe.names.length - 1)),
    getHelmetIndex: () => Math.max(0, Math.min(GoldQuest.equipment.helmet.level, GoldQuest.equipment.helmet.bonus.length - 1)),
    
    showMine: () => {
        const container = document.querySelector('.goldquest-container');
        if (!container) return;
        
        const pickaxeIndex = GoldQuest.getPickaxeIndex();
        const pickaxeName = GoldQuest.equipment.pickaxe.names[pickaxeIndex] || 'Wooden';
        
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
        if (!GoldQuest.questions || GoldQuest.currentQuestionIndex >= GoldQuest.questions.length) {
            GoldQuest.endMining();
            return '<p class="gq-complete">All questions complete!</p>';
        }
        
        const q = GoldQuest.questions[GoldQuest.currentQuestionIndex];
        if (!q || !q.options || !Array.isArray(q.options)) {
            GoldQuest.currentQuestionIndex++;
            return GoldQuest.renderQuestion();
        }
        
        GoldQuest.currentQuestion = q;
        
        return `
            <div class="gq-question">
                <p class="question-text">${q.question || 'Question'}</p>
                <div class="gq-options">
                    ${q.options.map((opt, i) => `<button class="gq-option" onclick="GoldQuest.answer(${i})">${opt}</button>`).join('')}
                </div>
            </div>
        `;
    },
    
    answer: (index) => {
        const q = GoldQuest.currentQuestion;
        if (!q || typeof q.answer !== 'number') return;
        
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
            const pickaxeIndex = GoldQuest.getPickaxeIndex();
            const helmetIndex = GoldQuest.getHelmetIndex();
            const pickaxeMultiplier = GoldQuest.equipment.pickaxe.multipliers[pickaxeIndex] || 1;
            const helmetBonus = GoldQuest.equipment.helmet.bonus[helmetIndex] || 0;
            const streakBonus = Math.min(GoldQuest.consecutiveCorrect, 5);
            
            const goldEarned = Math.round((baseGold + helmetBonus) * pickaxeMultiplier * GoldQuest.goldMultiplier * (1 + streakBonus * 0.1));
            GoldQuest.gold += goldEarned;
            
            // Safely update HUD elements
            const goldEl = document.getElementById('gq-gold');
            const depthEl = document.getElementById('gq-depth');
            const streakEl = document.getElementById('gq-streak');
            if (goldEl) goldEl.textContent = GoldQuest.gold;
            if (depthEl) depthEl.textContent = GoldQuest.mineDepth + 'm';
            if (streakEl) streakEl.textContent = GoldQuest.consecutiveCorrect + 'x';
            
            // Show gold popup
            const shaft = document.getElementById('mine-shaft');
            if (shaft) {
                const popup = document.createElement('div');
                popup.className = 'gold-popup';
                popup.textContent = `+${goldEarned} 🪙`;
                shaft.appendChild(popup);
                setTimeout(() => popup.remove(), 1000);
            }
            
            if (typeof SRSSystem !== 'undefined' && SRSSystem?.recordAnswer) SRSSystem.recordAnswer(q.id, true);
            if (typeof SoundFX !== 'undefined' && SoundFX?.play) SoundFX.play('success');
        } else {
            GoldQuest.consecutiveCorrect = 0;
            const streakEl = document.getElementById('gq-streak');
            if (streakEl) streakEl.textContent = '0x';
            if (typeof SRSSystem !== 'undefined' && SRSSystem?.recordAnswer) SRSSystem.recordAnswer(q.id, false);
            if (typeof SoundFX !== 'undefined' && SoundFX?.play) SoundFX.play('error');
        }
        
        if (typeof StreakSystem !== 'undefined' && StreakSystem?.recordActivity) {
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
        // Check if Modal is available
        if (typeof Modal === 'undefined' || !Modal?.show) {
            if (typeof Toast !== 'undefined' && Toast?.show) {
                Toast.show('Shop not available', 'warning');
            }
            return;
        }
        
        const eq = GoldQuest.equipment;
        const costs = GoldQuest.upgradeCosts;
        
        // Safe upgrade check with bounds validation
        const canUpgrade = (type) => {
            const currentLevel = eq[type]?.level ?? 0;
            const maxLevel = costs[type]?.length ?? 0;
            const upgradeCost = costs[type]?.[currentLevel];
            return currentLevel < maxLevel && typeof upgradeCost === 'number' && GoldQuest.gold >= upgradeCost;
        };
        
        const getUpgradeCost = (type) => {
            const currentLevel = eq[type]?.level ?? 0;
            return costs[type]?.[currentLevel] ?? '—';
        };
        
        const pickaxeIndex = GoldQuest.getPickaxeIndex();
        const pickaxeName = eq.pickaxe.names[pickaxeIndex] || 'Pickaxe';
        
        Modal.show({
            title: '🛒 Mining Shop',
            content: `
                <div class="gq-shop">
                    <p class="shop-gold">Current Gold: <strong>${GoldQuest.gold} 🪙</strong></p>
                    <div class="shop-items">
                        <div class="shop-item">
                            <div class="item-info">
                                <span class="item-icon">⛏️</span>
                                <span class="item-name">${pickaxeName} Pickaxe</span>
                                <span class="item-level">Lv ${eq.pickaxe.level}/6</span>
                            </div>
                            ${eq.pickaxe.level < 6 ? `<button class="btn btn-small btn-primary" onclick="GoldQuest.upgrade('pickaxe')" ${canUpgrade('pickaxe') ? '' : 'disabled'}>${getUpgradeCost('pickaxe')} 🪙</button>` : '<span class="max-badge">MAX</span>'}
                        </div>
                        <div class="shop-item">
                            <div class="item-info">
                                <span class="item-icon">⛑️</span>
                                <span class="item-name">Mining Helmet</span>
                                <span class="item-level">Lv ${eq.helmet.level}/5</span>
                            </div>
                            ${eq.helmet.level < 5 ? `<button class="btn btn-small btn-primary" onclick="GoldQuest.upgrade('helmet')" ${canUpgrade('helmet') ? '' : 'disabled'}>${getUpgradeCost('helmet')} 🪙</button>` : '<span class="max-badge">MAX</span>'}
                        </div>
                        <div class="shop-item">
                            <div class="item-info">
                                <span class="item-icon">🛒</span>
                                <span class="item-name">Mining Cart</span>
                                <span class="item-level">Lv ${eq.cart.level}/5</span>
                            </div>
                            ${eq.cart.level < 5 ? `<button class="btn btn-small btn-primary" onclick="GoldQuest.upgrade('cart')" ${canUpgrade('cart') ? '' : 'disabled'}>${getUpgradeCost('cart')} 🪙</button>` : '<span class="max-badge">MAX</span>'}
                        </div>
                    </div>
                </div>
            `,
            footer: '<button class="btn btn-secondary" onclick="Modal.close()">Close</button>'
        });
    },
    
    upgrade: (type) => {
        const eq = GoldQuest.equipment[type];
        const costs = GoldQuest.upgradeCosts[type];
        
        if (!eq || !costs) return;
        
        const currentLevel = eq.level ?? 0;
        const cost = costs[currentLevel];
        
        // Validate upgrade is possible
        if (typeof cost !== 'number' || currentLevel >= costs.length || GoldQuest.gold < cost) {
            if (typeof Toast !== 'undefined' && Toast?.show) {
                Toast.show('Cannot upgrade - not enough gold', 'warning');
            }
            return;
        }
        
        GoldQuest.gold -= cost;
        GoldQuest.equipment[type].level++;
        
        // Save updated equipment
        const stats = GoldQuest.getStats();
        stats.equipment = GoldQuest.equipment;
        GoldQuest.saveStats(stats);
        
        // Update gold display in HUD if visible
        const goldEl = document.getElementById('gq-gold');
        if (goldEl) goldEl.textContent = GoldQuest.gold;
        
        if (typeof Toast !== 'undefined' && Toast?.show) {
            Toast.show(`⬆️ ${type.charAt(0).toUpperCase() + type.slice(1)} upgraded!`, 'success');
        }
        
        if (typeof Modal !== 'undefined' && Modal?.close) {
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
        if (typeof AppState !== 'undefined' && AppState?.getState && AppState?.setState) {
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
    
    getStats: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_goldquest') || '{}');
        } catch (e) {
            console.warn('GoldQuest: Failed to load stats', e);
            return {};
        }
    },
    
    saveStats: (stats) => {
        try {
            localStorage.setItem('csmaster_goldquest', JSON.stringify(stats));
        } catch (e) {
            console.warn('GoldQuest: Failed to save stats', e);
        }
    },

    cleanup: () => {
        GoldQuest.isPlaying = false;
        GoldQuest.questions = [];
        GoldQuest.currentQuestion = null;
        GoldQuest.currentQuestionIndex = 0;
        GoldQuest.gold = 0;
        GoldQuest.mineDepth = 0;
        GoldQuest.consecutiveCorrect = 0;
        console.log('⛏️ GoldQuest cleanup');
    }
};
