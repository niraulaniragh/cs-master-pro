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
    currentDepthLevel: 1,
    gemsFound: 0,
    rareTreasures: [],
    isAnimating: false,
    
    // Depth level thresholds and rewards
    depthLevels: [
        { depth: 0, name: 'Surface', color: '#8B4513', goldBonus: 1.0, gemChance: 0.05, treasureChance: 0.01 },
        { depth: 25, name: 'Shallow Mine', color: '#6B3E0A', goldBonus: 1.2, gemChance: 0.08, treasureChance: 0.02 },
        { depth: 50, name: 'Deep Mine', color: '#4A2800', goldBonus: 1.5, gemChance: 0.12, treasureChance: 0.03 },
        { depth: 100, name: 'Underground', color: '#3A1F00', goldBonus: 2.0, gemChance: 0.15, treasureChance: 0.05 },
        { depth: 150, name: 'Caverns', color: '#2A1500', goldBonus: 2.5, gemChance: 0.20, treasureChance: 0.07 },
        { depth: 200, name: 'Magma Zone', color: '#1A0A00', goldBonus: 3.0, gemChance: 0.25, treasureChance: 0.10 },
        { depth: 300, name: 'Core', color: '#0F0500', goldBonus: 4.0, gemChance: 0.35, treasureChance: 0.15 }
    ],
    
    // Rare treasures that can be discovered
    treasureTypes: [
        { name: 'Ancient Coin', icon: '🏆', value: 50, rarity: 'common' },
        { name: 'Ruby', icon: '❤️', value: 100, rarity: 'uncommon' },
        { name: 'Sapphire', icon: '💙', value: 150, rarity: 'uncommon' },
        { name: 'Emerald', icon: '💚', value: 200, rarity: 'rare' },
        { name: 'Diamond', icon: '💎', value: 500, rarity: 'rare' },
        { name: 'Golden Idol', icon: '🗿', value: 750, rarity: 'epic' },
        { name: 'Dragon Egg', icon: '🥚', value: 1000, rarity: 'legendary' },
        { name: 'Ancient Crown', icon: '👑', value: 2000, rarity: 'legendary' }
    ],
    
    // Gem types for discoveries
    gemTypes: ['💎', '💠', '🔷', '🔶', '❤️', '💚', '💙', '💜'],
    
    // Equipment upgrades
    equipment: {
        pickaxe: { level: 1, names: ['Wooden', 'Stone', 'Iron', 'Gold', 'Diamond', 'Emerald'], multipliers: [1, 1.5, 2, 3, 4, 5], icons: ['🪓', '⛏️', '🔨', '✨⛏️', '💎⛏️', '🌟⛏️'] },
        helmet: { level: 0, bonus: [0, 5, 10, 15, 20, 25], icons: ['', '⛑️', '🪖', '🎩', '👑', '💫👑'] },
        cart: { level: 0, capacity: [100, 250, 500, 1000, 2500, 5000], icons: ['🛒', '🛷', '🚃', '🚂', '🚀', '✨🚀'] }
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
        GoldQuest.injectStyles();
    },
    
    injectStyles: () => {
        if (document.getElementById('goldquest-styles')) return;
        const style = document.createElement('style');
        style.id = 'goldquest-styles';
        style.textContent = `
            @keyframes pickaxeSwing {
                0% { transform: rotate(0deg); }
                25% { transform: rotate(-45deg); }
                50% { transform: rotate(0deg); }
                75% { transform: rotate(-30deg); }
                100% { transform: rotate(0deg); }
            }
            @keyframes mineHit {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            @keyframes gemSparkle {
                0% { transform: scale(0) rotate(0deg); opacity: 0; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
                100% { transform: scale(1) rotate(360deg); opacity: 1; }
            }
            @keyframes gemCelebrate {
                0% { transform: translateY(0) scale(1); }
                25% { transform: translateY(-20px) scale(1.2); }
                50% { transform: translateY(-10px) scale(1.1); }
                75% { transform: translateY(-15px) scale(1.15); }
                100% { transform: translateY(0) scale(1); }
            }
            @keyframes treasureReveal {
                0% { transform: scale(0) rotate(-180deg); opacity: 0; filter: brightness(3); }
                50% { transform: scale(1.3) rotate(0deg); opacity: 1; filter: brightness(2); }
                100% { transform: scale(1) rotate(0deg); opacity: 1; filter: brightness(1); }
            }
            @keyframes depthPulse {
                0%, 100% { box-shadow: 0 0 10px rgba(255,215,0,0.5); }
                50% { box-shadow: 0 0 30px rgba(255,215,0,0.9); }
            }
            @keyframes equipmentGlow {
                0% { filter: drop-shadow(0 0 5px gold); }
                50% { filter: drop-shadow(0 0 15px gold) brightness(1.3); }
                100% { filter: drop-shadow(0 0 5px gold); }
            }
            @keyframes upgradeFlash {
                0% { background: radial-gradient(circle, gold 0%, transparent 70%); opacity: 1; }
                100% { background: radial-gradient(circle, gold 0%, transparent 70%); opacity: 0; transform: scale(2); }
            }
            @keyframes rockCrumble {
                0% { opacity: 1; transform: translateY(0) rotate(0deg); }
                100% { opacity: 0; transform: translateY(50px) rotate(45deg); }
            }
            @keyframes sparkleFloat {
                0% { opacity: 1; transform: translateY(0) scale(1); }
                100% { opacity: 0; transform: translateY(-30px) scale(0); }
            }
            .pickaxe-swing { animation: pickaxeSwing 0.5s ease-in-out; }
            .mine-hit { animation: mineHit 0.3s ease-in-out; }
            .gem-sparkle { animation: gemSparkle 0.6s ease-out forwards; }
            .gem-celebrate { animation: gemCelebrate 0.8s ease-in-out; }
            .treasure-reveal { animation: treasureReveal 1s ease-out forwards; }
            .depth-pulse { animation: depthPulse 1s ease-in-out infinite; }
            .equipment-glow { animation: equipmentGlow 1s ease-in-out infinite; }
            .upgrade-flash { animation: upgradeFlash 0.8s ease-out forwards; }
            .rock-crumble { animation: rockCrumble 0.5s ease-in forwards; }
            .sparkle-float { animation: sparkleFloat 0.8s ease-out forwards; }
            
            .depth-indicator {
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                text-align: center;
                margin: 10px 0;
                transition: all 0.5s ease;
            }
            .gem-discovery-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .gem-discovery-content {
                text-align: center;
                padding: 40px;
            }
            .discovered-gem {
                font-size: 80px;
                margin: 20px 0;
            }
            .treasure-discovery-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(0,0,0,0.9) 70%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 10001;
            }
            .treasure-content {
                text-align: center;
                padding: 40px;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border-radius: 20px;
                border: 3px solid gold;
                box-shadow: 0 0 50px rgba(255,215,0,0.5);
            }
            .treasure-icon {
                font-size: 100px;
                margin: 20px 0;
            }
            .treasure-rarity {
                padding: 5px 15px;
                border-radius: 10px;
                font-weight: bold;
                text-transform: uppercase;
            }
            .rarity-common { background: #808080; color: white; }
            .rarity-uncommon { background: #1eff00; color: black; }
            .rarity-rare { background: #0070dd; color: white; }
            .rarity-epic { background: #a335ee; color: white; }
            .rarity-legendary { background: linear-gradient(90deg, #ff8000, #ffd700); color: black; }
            
            .equipment-display {
                display: flex;
                gap: 10px;
                justify-content: center;
                margin: 10px 0;
            }
            .equip-item {
                font-size: 24px;
                padding: 5px;
                border-radius: 8px;
                background: rgba(0,0,0,0.3);
            }
            .mining-particles {
                position: absolute;
                pointer-events: none;
            }
            .particle {
                position: absolute;
                font-size: 12px;
            }
        `;
        document.head.appendChild(style);
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
        const pickaxeIcon = GoldQuest.equipment.pickaxe.icons[Math.min((stats.equipment?.pickaxe?.level || 1) - 1, 5)];
        return `
            <div class="game-header">
                <h2>⛏️ Gold Quest</h2>
                <button class="close-btn" onclick="GoldQuest.close()">✕</button>
            </div>
            <div class="goldquest-menu">
                <div class="gq-hero">
                    <div class="gq-mine-graphic">
                        <span class="mine-icon" style="font-size: 48px;">${pickaxeIcon}</span>
                        <span class="gold-pile">💰</span>
                    </div>
                    <h3>Mine for Knowledge Gold!</h3>
                    <p>Answer CS questions to mine gold, discover gems, and find rare treasures!</p>
                </div>
                <div class="gq-stats">
                    <div class="gq-stat"><span class="stat-icon">🪙</span><span class="stat-value">${stats.totalGold || 0}</span><span class="stat-label">Total Gold</span></div>
                    <div class="gq-stat"><span class="stat-icon">⛏️</span><span class="stat-value">${stats.deepestMine || 0}m</span><span class="stat-label">Deepest Mine</span></div>
                    <div class="gq-stat"><span class="stat-icon">💎</span><span class="stat-value">${stats.gemsFound || 0}</span><span class="stat-label">Gems Found</span></div>
                    <div class="gq-stat"><span class="stat-icon">🏆</span><span class="stat-value">${stats.treasuresFound || 0}</span><span class="stat-label">Treasures</span></div>
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
        GoldQuest.currentDepthLevel = 1;
        GoldQuest.gemsFound = 0;
        GoldQuest.rareTreasures = [];
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
    
    getCurrentDepthLevel: () => {
        const levels = GoldQuest.depthLevels;
        for (let i = levels.length - 1; i >= 0; i--) {
            if (GoldQuest.mineDepth >= levels[i].depth) {
                return levels[i];
            }
        }
        return levels[0];
    },
    
    showMine: () => {
        const container = document.querySelector('.goldquest-container');
        if (!container) return;
        
        const pickaxeIndex = GoldQuest.getPickaxeIndex();
        const pickaxeName = GoldQuest.equipment.pickaxe.names[pickaxeIndex] || 'Wooden';
        const pickaxeIcon = GoldQuest.equipment.pickaxe.icons[pickaxeIndex] || '⛏️';
        const helmetIcon = GoldQuest.equipment.helmet.icons[GoldQuest.equipment.helmet.level] || '';
        const cartIcon = GoldQuest.equipment.cart.icons[GoldQuest.equipment.cart.level] || '🛒';
        const depthLevel = GoldQuest.getCurrentDepthLevel();
        
        container.innerHTML = `
            <div class="game-header"><h2>⛏️ Mining...</h2><button class="close-btn" onclick="GoldQuest.close()">✕</button></div>
            <div class="gq-mining">
                <div class="gq-hud">
                    <div class="hud-item"><span>🪙</span><span id="gq-gold">${GoldQuest.gold}</span></div>
                    <div class="hud-item"><span>📏</span><span id="gq-depth">${GoldQuest.mineDepth}m</span></div>
                    <div class="hud-item"><span>🔥</span><span id="gq-streak">${GoldQuest.consecutiveCorrect}x</span></div>
                    <div class="hud-item"><span>💎</span><span id="gq-gems">${GoldQuest.gemsFound}</span></div>
                </div>
                <div class="depth-indicator" id="depth-indicator" style="background: ${depthLevel.color}; color: white;">
                    📍 ${depthLevel.name} (${depthLevel.goldBonus}x bonus)
                </div>
                <div class="equipment-display" id="equipment-display">
                    <span class="equip-item" title="${pickaxeName} Pickaxe">${pickaxeIcon}</span>
                    ${helmetIcon ? `<span class="equip-item" title="Mining Helmet">${helmetIcon}</span>` : ''}
                    <span class="equip-item" title="Mining Cart">${cartIcon}</span>
                </div>
                <div class="mine-shaft" id="mine-shaft">
                    <div class="miner" id="miner">${pickaxeIcon}</div>
                    <div class="mining-particles" id="mining-particles"></div>
                </div>
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
        
        // Shuffle options using Helpers if available
        const shuffled = (typeof Helpers !== 'undefined' && Helpers.shuffleOptions) 
            ? Helpers.shuffleOptions(q) 
            : GoldQuest.shuffleOptions(q);
        
        return `
            <div class="gq-question">
                <p class="question-text">${q.question || 'Question'}</p>
                <div class="gq-options">
                    ${shuffled.options.map((opt, i) => `<button class="gq-option" onclick="GoldQuest.answer(${shuffled.answerMap[i]})">${opt}</button>`).join('')}
                </div>
            </div>
        `;
    },
    
    // Local shuffle implementation as fallback
    shuffleOptions: (question) => {
        const options = [...question.options];
        const answerMap = options.map((_, i) => i);
        
        // Fisher-Yates shuffle
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
            [answerMap[i], answerMap[j]] = [answerMap[j], answerMap[i]];
        }
        
        return { options, answerMap };
    },
    
    playMiningAnimation: () => {
        const miner = document.getElementById('miner');
        const shaft = document.getElementById('mine-shaft');
        const particles = document.getElementById('mining-particles');
        
        if (miner) {
            miner.classList.add('pickaxe-swing');
            setTimeout(() => miner.classList.remove('pickaxe-swing'), 500);
        }
        
        if (shaft) {
            shaft.classList.add('mine-hit');
            setTimeout(() => shaft.classList.remove('mine-hit'), 300);
        }
        
        // Create rock particles
        if (particles) {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('span');
                particle.className = 'particle rock-crumble';
                particle.textContent = ['🪨', '�ite', '💥', '✨'][Math.floor(Math.random() * 4)];
                particle.style.left = `${30 + Math.random() * 40}%`;
                particle.style.top = `${20 + Math.random() * 30}%`;
                particles.appendChild(particle);
                setTimeout(() => particle.remove(), 500);
            }
        }
    },
    
    showGemDiscovery: (gem) => {
        const overlay = document.createElement('div');
        overlay.className = 'gem-discovery-overlay';
        overlay.innerHTML = `
            <div class="gem-discovery-content">
                <h2 style="color: gold; font-size: 24px;">💎 GEM DISCOVERED! 💎</h2>
                <div class="discovered-gem gem-sparkle">${gem}</div>
                <p style="color: white; font-size: 18px;">+25 bonus gold!</p>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Add celebration sparkles
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('span');
                sparkle.className = 'sparkle-float';
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = `${20 + Math.random() * 60}%`;
                sparkle.style.top = `${40 + Math.random() * 20}%`;
                sparkle.style.fontSize = '24px';
                overlay.appendChild(sparkle);
            }, i * 100);
        }
        
        if (typeof SoundFX !== 'undefined' && SoundFX?.play) SoundFX.play('achievement');
        
        setTimeout(() => overlay.remove(), 2000);
    },
    
    showTreasureDiscovery: (treasure) => {
        const overlay = document.createElement('div');
        overlay.className = 'treasure-discovery-overlay';
        overlay.innerHTML = `
            <div class="treasure-content">
                <h2 style="color: gold; font-size: 28px; margin-bottom: 10px;">🎉 RARE TREASURE! 🎉</h2>
                <div class="treasure-icon treasure-reveal">${treasure.icon}</div>
                <h3 style="color: white; font-size: 22px; margin: 10px 0;">${treasure.name}</h3>
                <span class="treasure-rarity rarity-${treasure.rarity}">${treasure.rarity}</span>
                <p style="color: gold; font-size: 20px; margin-top: 15px;">+${treasure.value} gold!</p>
            </div>
        `;
        document.body.appendChild(overlay);
        
        if (typeof SoundFX !== 'undefined' && SoundFX?.play) SoundFX.play('levelup');
        
        setTimeout(() => overlay.remove(), 3000);
    },
    
    checkDepthLevelUp: () => {
        const newLevel = GoldQuest.getCurrentDepthLevel();
        const levels = GoldQuest.depthLevels;
        const newLevelIndex = levels.indexOf(newLevel);
        
        if (newLevelIndex > GoldQuest.currentDepthLevel - 1) {
            GoldQuest.currentDepthLevel = newLevelIndex + 1;
            
            // Update depth indicator with animation
            const indicator = document.getElementById('depth-indicator');
            if (indicator) {
                indicator.style.background = newLevel.color;
                indicator.innerHTML = `📍 ${newLevel.name} (${newLevel.goldBonus}x bonus)`;
                indicator.classList.add('depth-pulse');
                setTimeout(() => indicator.classList.remove('depth-pulse'), 2000);
            }
            
            // Show level up notification
            if (typeof Toast !== 'undefined' && Toast?.show) {
                Toast.show(`⬇️ Reached ${newLevel.name}! ${newLevel.goldBonus}x gold bonus!`, 'success');
            }
        }
    },
    
    checkForDiscoveries: () => {
        const depthLevel = GoldQuest.getCurrentDepthLevel();
        
        // Check for gem discovery
        if (Math.random() < depthLevel.gemChance) {
            GoldQuest.gemsFound++;
            GoldQuest.gold += 25;
            const gem = GoldQuest.gemTypes[Math.floor(Math.random() * GoldQuest.gemTypes.length)];
            GoldQuest.showGemDiscovery(gem);
            
            const gemsEl = document.getElementById('gq-gems');
            if (gemsEl) gemsEl.textContent = GoldQuest.gemsFound;
        }
        
        // Check for rare treasure discovery
        if (Math.random() < depthLevel.treasureChance) {
            // Weight treasures by rarity based on depth
            const availableTreasures = GoldQuest.treasureTypes.filter(t => {
                if (t.rarity === 'legendary' && GoldQuest.mineDepth < 150) return false;
                if (t.rarity === 'epic' && GoldQuest.mineDepth < 100) return false;
                return true;
            });
            
            const treasure = availableTreasures[Math.floor(Math.random() * availableTreasures.length)];
            GoldQuest.rareTreasures.push(treasure);
            GoldQuest.gold += treasure.value;
            
            setTimeout(() => GoldQuest.showTreasureDiscovery(treasure), 500);
        }
    },
    
    answer: (index) => {
        const q = GoldQuest.currentQuestion;
        if (!q || typeof q.answer !== 'number' || GoldQuest.isAnimating) return;
        
        GoldQuest.isAnimating = true;
        const isCorrect = index === q.answer;
        const buttons = document.querySelectorAll('.gq-option');
        
        // Play mining animation
        GoldQuest.playMiningAnimation();
        
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            // Find which button corresponds to which original answer
            const btnAnswer = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
            if (btnAnswer === q.answer) btn.classList.add('correct');
            else if (btnAnswer === index && !isCorrect) btn.classList.add('incorrect');
        });
        
        if (isCorrect) {
            GoldQuest.consecutiveCorrect++;
            GoldQuest.mineDepth += 5 + Math.floor(GoldQuest.consecutiveCorrect / 2); // Deeper digs with streaks
            
            const depthLevel = GoldQuest.getCurrentDepthLevel();
            const baseGold = 10;
            const pickaxeIndex = GoldQuest.getPickaxeIndex();
            const helmetIndex = GoldQuest.getHelmetIndex();
            const pickaxeMultiplier = GoldQuest.equipment.pickaxe.multipliers[pickaxeIndex] || 1;
            const helmetBonus = GoldQuest.equipment.helmet.bonus[helmetIndex] || 0;
            const streakBonus = Math.min(GoldQuest.consecutiveCorrect, 5);
            const depthBonus = depthLevel.goldBonus;
            
            const goldEarned = Math.round((baseGold + helmetBonus) * pickaxeMultiplier * GoldQuest.goldMultiplier * depthBonus * (1 + streakBonus * 0.1));
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
            
            // Check for depth level up
            GoldQuest.checkDepthLevelUp();
            
            // Check for gem/treasure discoveries
            GoldQuest.checkForDiscoveries();
            
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
            GoldQuest.isAnimating = false;
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
        const pickaxeIcon = eq.pickaxe.icons[pickaxeIndex] || '⛏️';
        const helmetIcon = eq.helmet.icons[eq.helmet.level] || '⛑️';
        const cartIcon = eq.cart.icons[eq.cart.level] || '🛒';
        
        Modal.show({
            title: '🛒 Mining Shop',
            content: `
                <div class="gq-shop">
                    <p class="shop-gold">Current Gold: <strong>${GoldQuest.gold} 🪙</strong></p>
                    <div class="shop-items">
                        <div class="shop-item">
                            <div class="item-info">
                                <span class="item-icon" style="font-size: 32px;">${pickaxeIcon}</span>
                                <span class="item-name">${pickaxeName} Pickaxe</span>
                                <span class="item-level">Lv ${eq.pickaxe.level}/6</span>
                            </div>
                            ${eq.pickaxe.level < 6 ? `<button class="btn btn-small btn-primary" onclick="GoldQuest.upgrade('pickaxe')" ${canUpgrade('pickaxe') ? '' : 'disabled'}>${getUpgradeCost('pickaxe')} 🪙</button>` : '<span class="max-badge">MAX</span>'}
                        </div>
                        <div class="shop-item">
                            <div class="item-info">
                                <span class="item-icon" style="font-size: 32px;">${helmetIcon}</span>
                                <span class="item-name">Mining Helmet</span>
                                <span class="item-level">Lv ${eq.helmet.level}/5</span>
                            </div>
                            ${eq.helmet.level < 5 ? `<button class="btn btn-small btn-primary" onclick="GoldQuest.upgrade('helmet')" ${canUpgrade('helmet') ? '' : 'disabled'}>${getUpgradeCost('helmet')} 🪙</button>` : '<span class="max-badge">MAX</span>'}
                        </div>
                        <div class="shop-item">
                            <div class="item-info">
                                <span class="item-icon" style="font-size: 32px;">${cartIcon}</span>
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
        
        // Show upgrade visual effect
        GoldQuest.showUpgradeEffect(type);
        
        if (typeof Toast !== 'undefined' && Toast?.show) {
            const newIcon = GoldQuest.equipment[type].icons?.[GoldQuest.equipment[type].level] || '⬆️';
            Toast.show(`${newIcon} ${type.charAt(0).toUpperCase() + type.slice(1)} upgraded!`, 'success');
        }
        
        // Update equipment display if visible
        const equipDisplay = document.getElementById('equipment-display');
        if (equipDisplay) {
            const pickaxeIndex = GoldQuest.getPickaxeIndex();
            const pickaxeIcon = GoldQuest.equipment.pickaxe.icons[pickaxeIndex] || '⛏️';
            const helmetIcon = GoldQuest.equipment.helmet.icons[GoldQuest.equipment.helmet.level] || '';
            const cartIcon = GoldQuest.equipment.cart.icons[GoldQuest.equipment.cart.level] || '🛒';
            
            equipDisplay.innerHTML = `
                <span class="equip-item ${type === 'pickaxe' ? 'equipment-glow' : ''}" title="${GoldQuest.equipment.pickaxe.names[pickaxeIndex]} Pickaxe">${pickaxeIcon}</span>
                ${helmetIcon ? `<span class="equip-item ${type === 'helmet' ? 'equipment-glow' : ''}" title="Mining Helmet">${helmetIcon}</span>` : ''}
                <span class="equip-item ${type === 'cart' ? 'equipment-glow' : ''}" title="Mining Cart">${cartIcon}</span>
            `;
        }
        
        if (typeof Modal !== 'undefined' && Modal?.close) {
            Modal.close();
            GoldQuest.openShop();
        }
    },
    
    showUpgradeEffect: (type) => {
        const container = document.querySelector('.goldquest-container');
        if (!container) return;
        
        const flash = document.createElement('div');
        flash.className = 'upgrade-flash';
        flash.style.position = 'absolute';
        flash.style.top = '50%';
        flash.style.left = '50%';
        flash.style.width = '100px';
        flash.style.height = '100px';
        flash.style.marginLeft = '-50px';
        flash.style.marginTop = '-50px';
        flash.style.borderRadius = '50%';
        flash.style.pointerEvents = 'none';
        container.appendChild(flash);
        
        setTimeout(() => flash.remove(), 800);
        
        if (typeof SoundFX !== 'undefined' && SoundFX?.play) SoundFX.play('powerup');
    },
    
    endMining: () => {
        GoldQuest.isPlaying = false;
        const stats = GoldQuest.getStats();
        stats.totalGold = (stats.totalGold || 0) + GoldQuest.gold;
        stats.deepestMine = Math.max(stats.deepestMine || 0, GoldQuest.mineDepth);
        stats.gemsFound = (stats.gemsFound || 0) + GoldQuest.gemsFound;
        stats.treasuresFound = (stats.treasuresFound || 0) + GoldQuest.rareTreasures.length;
        stats.equipment = GoldQuest.equipment;
        GoldQuest.saveStats(stats);
        
        const xpEarned = Math.round(GoldQuest.gold / 5);
        if (typeof AppState !== 'undefined' && AppState?.getState && AppState?.setState) {
            const user = AppState.getState('user') || {};
            user.xp = (user.xp || 0) + xpEarned;
            AppState.setState('user', user);
        }
        
        const depthLevel = GoldQuest.getCurrentDepthLevel();
        const treasureList = GoldQuest.rareTreasures.length > 0 
            ? `<div class="result-item"><span>Treasures</span><span class="result-value">${GoldQuest.rareTreasures.map(t => t.icon).join(' ')}</span></div>`
            : '';
        
        const container = document.querySelector('.goldquest-container');
        if (container) {
            container.innerHTML = `
                <div class="game-header"><h2>⛏️ Mining Complete!</h2><button class="close-btn" onclick="GoldQuest.close()">✕</button></div>
                <div class="gq-results">
                    <div class="results-graphic"><span class="big-icon">🪙</span></div>
                    <div class="depth-indicator" style="background: ${depthLevel.color}; color: white;">
                        Reached: ${depthLevel.name}
                    </div>
                    <div class="results-stats">
                        <div class="result-item"><span>Gold Mined</span><span class="result-value">${GoldQuest.gold}</span></div>
                        <div class="result-item"><span>Depth</span><span class="result-value">${GoldQuest.mineDepth}m</span></div>
                        <div class="result-item"><span>Gems Found</span><span class="result-value">💎 ${GoldQuest.gemsFound}</span></div>
                        ${treasureList}
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
        GoldQuest.gemsFound = 0;
        GoldQuest.rareTreasures = [];
        GoldQuest.isAnimating = false;
        console.log('⛏️ GoldQuest cleanup');
    }
};
