/**
 * Factory.js - Code Factory Tycoon Game
 * Build products by answering questions to power your factory empire!
 */

const Factory = {
    isPlaying: false,
    products: 0,
    money: 0,
    workers: 1,
    machines: 1,
    questions: [],
    currentQuestion: null,
    currentQuestionIndex: 0,
    productionRate: 1,
    qualityBonus: 0,
    isAnswering: false,
    correctStreak: 0,
    animationInterval: null,
    
    // Milestone achievements
    milestones: {
        firstProduct: { id: 'firstProduct', name: 'First Product!', icon: '📦', desc: 'Produce your first item', threshold: 1, type: 'products' },
        producer: { id: 'producer', name: 'Producer', icon: '🏭', desc: 'Produce 50 items in one shift', threshold: 50, type: 'products' },
        massProducer: { id: 'massProducer', name: 'Mass Producer', icon: '🚀', desc: 'Produce 200 items in one shift', threshold: 200, type: 'products' },
        moneyMaker: { id: 'moneyMaker', name: 'Money Maker', icon: '💰', desc: 'Earn 1,000 in one shift', threshold: 1000, type: 'money' },
        tycoon: { id: 'tycoon', name: 'Tycoon', icon: '👑', desc: 'Earn 5,000 in one shift', threshold: 5000, type: 'money' },
        perfectShift: { id: 'perfectShift', name: 'Perfect Shift', icon: '⭐', desc: 'Answer 10 questions correctly in a row', threshold: 10, type: 'streak' },
        factoryBoss: { id: 'factoryBoss', name: 'Factory Boss', icon: '🎩', desc: 'Max out all upgrades', threshold: 1, type: 'maxUpgrades' },
        nightOwl: { id: 'nightOwl', name: 'Night Owl', icon: '🌙', desc: 'Complete 5 night shifts', threshold: 5, type: 'nightShifts' },
        veteran: { id: 'veteran', name: 'Veteran', icon: '🏅', desc: 'Complete 25 shifts', threshold: 25, type: 'totalShifts' }
    },
    
    upgradeCosts: {
        worker: [50, 100, 200, 400, 800],
        machine: [100, 250, 500, 1000, 2000],
        quality: [75, 150, 300, 600, 1200]
    },

    open: () => {
        if (document.getElementById('factory-modal')) {
            Factory.close();
        }
        const modal = document.createElement('div');
        modal.id = 'factory-modal';
        modal.className = 'game-modal active';
        modal.innerHTML = `<div class="game-container factory-container">${Factory.renderMenu()}</div>`;
        document.body.appendChild(modal);
        Factory.injectTycoonStyles();
    },
    
    startAsHost: (game) => { Factory.open(); },
    startAsPlayer: (game) => { Factory.open(); },

    close: () => {
        Factory.cleanup();
        const modal = document.getElementById('factory-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },
    
    injectTycoonStyles: () => {
        if (document.getElementById('factory-tycoon-styles')) return;
        const style = document.createElement('style');
        style.id = 'factory-tycoon-styles';
        style.textContent = `
            /* Conveyor Belt Animation */
            .conveyor-belt {
                position: relative;
                background: linear-gradient(90deg, #374151 0%, #4b5563 50%, #374151 100%);
                height: 80px;
                border-radius: 8px;
                overflow: hidden;
                margin: 1rem 0;
                border: 3px solid #6b7280;
            }
            .belt-track {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 20px;
                background: repeating-linear-gradient(90deg, #1f2937 0px, #1f2937 20px, #374151 20px, #374151 40px);
                animation: beltMove 1s linear infinite;
            }
            @keyframes beltMove {
                0% { background-position: 0 0; }
                100% { background-position: 40px 0; }
            }
            .belt-paused .belt-track { animation-play-state: paused; }
            
            /* Machine Animation */
            .machine-area {
                display: flex;
                justify-content: space-around;
                padding: 0.5rem;
                gap: 0.5rem;
            }
            .machine {
                font-size: 2rem;
                animation: machineWork 0.5s ease-in-out infinite;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            }
            .machine:nth-child(2) { animation-delay: 0.1s; }
            .machine:nth-child(3) { animation-delay: 0.2s; }
            .machine:nth-child(4) { animation-delay: 0.3s; }
            .machine:nth-child(5) { animation-delay: 0.4s; }
            @keyframes machineWork {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-3px) rotate(-2deg); }
                75% { transform: translateY(-3px) rotate(2deg); }
            }
            .belt-paused .machine { animation-play-state: paused; }
            
            /* Worker Animation */
            .workers-area {
                display: flex;
                justify-content: center;
                gap: 0.75rem;
                margin: 0.75rem 0;
                flex-wrap: wrap;
            }
            .worker {
                font-size: 1.8rem;
                animation: workerBusy 1.2s ease-in-out infinite;
                position: relative;
            }
            .worker::after {
                content: '💭';
                position: absolute;
                top: -10px;
                right: -5px;
                font-size: 0.7rem;
                opacity: 0;
                animation: workerThink 2s ease-in-out infinite;
            }
            .worker:nth-child(odd)::after { animation-delay: 0.5s; }
            @keyframes workerBusy {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-4px); }
                75% { transform: translateX(4px); }
            }
            @keyframes workerThink {
                0%, 60%, 100% { opacity: 0; transform: translateY(0); }
                30% { opacity: 1; transform: translateY(-5px); }
            }
            .belt-paused .worker { animation-play-state: paused; }
            .belt-paused .worker::after { animation-play-state: paused; }
            
            /* Product Animation */
            .product-area {
                position: absolute;
                top: 10px;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                pointer-events: none;
            }
            .produced-item {
                font-size: 1.5rem;
                animation: productSlide 1s ease-out forwards;
                opacity: 0;
            }
            @keyframes productSlide {
                0% { transform: translateX(-100px) scale(0.5); opacity: 0; }
                30% { opacity: 1; }
                100% { transform: translateX(100px) scale(1); opacity: 0; }
            }
            
            /* Earning Popup */
            .earning-popup {
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 1.2rem;
                font-weight: bold;
                color: #22c55e;
                text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
                animation: earningFloat 1.2s ease-out forwards;
                z-index: 10;
            }
            @keyframes earningFloat {
                0% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-40px); }
            }
            
            /* Production Fail */
            .production-fail {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 1rem;
                font-weight: bold;
                color: #ef4444;
                background: rgba(0,0,0,0.8);
                padding: 0.5rem 1rem;
                border-radius: 8px;
                animation: failShake 0.5s ease-out;
            }
            @keyframes failShake {
                0%, 100% { transform: translate(-50%, -50%) rotate(0); }
                25% { transform: translate(-50%, -50%) rotate(-3deg); }
                75% { transform: translate(-50%, -50%) rotate(3deg); }
            }
            
            /* Upgrade Celebration */
            .upgrade-celebration {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 9999;
            }
            .celebration-particle {
                position: absolute;
                font-size: 2rem;
                animation: celebrationFall 2s ease-out forwards;
            }
            @keyframes celebrationFall {
                0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            
            /* Stats Dashboard */
            .stats-dashboard {
                background: linear-gradient(135deg, #1f2937, #374151);
                border-radius: 12px;
                padding: 1rem;
                margin: 1rem 0;
                border: 2px solid #4b5563;
            }
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 0.75rem;
            }
            .stat-card {
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
                padding: 0.75rem;
                text-align: center;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .stat-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }
            .stat-card .stat-icon { font-size: 1.5rem; display: block; }
            .stat-card .stat-value { font-size: 1.25rem; font-weight: bold; color: #22d3ee; display: block; }
            .stat-card .stat-label { font-size: 0.7rem; color: #9ca3af; display: block; }
            
            /* Achievements */
            .achievements-section {
                margin-top: 1rem;
            }
            .achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 0.5rem;
            }
            .achievement {
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
                padding: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                opacity: 0.4;
                filter: grayscale(1);
                transition: all 0.3s;
            }
            .achievement.unlocked {
                opacity: 1;
                filter: grayscale(0);
                border: 1px solid #22c55e;
                box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
            }
            .achievement .ach-icon { font-size: 1.5rem; }
            .achievement .ach-info { flex: 1; }
            .achievement .ach-name { font-size: 0.75rem; font-weight: bold; display: block; }
            .achievement .ach-desc { font-size: 0.6rem; color: #9ca3af; display: block; }
            
            /* Achievement Unlock Popup */
            .achievement-unlock {
                position: fixed;
                top: 20%;
                left: 50%;
                transform: translateX(-50%) scale(0);
                background: linear-gradient(135deg, #1f2937, #374151);
                border: 3px solid #fbbf24;
                border-radius: 16px;
                padding: 1.5rem 2rem;
                z-index: 10000;
                text-align: center;
                animation: achievementPop 0.5s ease-out forwards, achievementFade 0.5s ease-in 2.5s forwards;
                box-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
            }
            @keyframes achievementPop {
                0% { transform: translateX(-50%) scale(0) rotate(-10deg); }
                50% { transform: translateX(-50%) scale(1.1) rotate(5deg); }
                100% { transform: translateX(-50%) scale(1) rotate(0deg); }
            }
            @keyframes achievementFade {
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
            .achievement-unlock .unlock-icon { font-size: 3rem; display: block; }
            .achievement-unlock .unlock-title { color: #fbbf24; font-size: 0.9rem; margin-top: 0.5rem; }
            .achievement-unlock .unlock-name { font-size: 1.2rem; font-weight: bold; margin-top: 0.25rem; }
            
            /* Streak Indicator */
            .streak-indicator {
                position: absolute;
                top: -30px;
                right: 10px;
                background: linear-gradient(135deg, #f59e0b, #ef4444);
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: bold;
                animation: streakPulse 1s ease-in-out infinite;
            }
            @keyframes streakPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            /* HUD Enhancement */
            .factory-hud {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                justify-content: center;
                padding: 0.75rem;
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
                margin-bottom: 1rem;
            }
            .hud-stat {
                display: flex;
                align-items: center;
                gap: 0.3rem;
                background: rgba(0,0,0,0.3);
                padding: 0.4rem 0.75rem;
                border-radius: 6px;
                font-size: 0.9rem;
            }
            .hud-stat span:first-child { font-size: 1.1rem; }
        `;
        document.head.appendChild(style);
    },

    renderMenu: () => {
        const stats = Factory.getStats();
        const unlockedAchievements = stats.achievements || [];
        
        return `
            <div class="game-header">
                <h2>🏭 Code Factory Tycoon</h2>
                <button class="close-btn" onclick="Factory.close()">✕</button>
            </div>
            <div class="factory-menu">
                <div class="factory-hero">
                    <div class="factory-graphic" style="font-size: 4rem;">🏭</div>
                    <h3>Build Your Code Empire!</h3>
                    <p>Answer questions to produce products, hire workers, and become a tycoon!</p>
                </div>
                
                ${Factory.renderStatsDashboard(stats)}
                
                <div class="factory-start">
                    <h4>Start a Shift</h4>
                    <div class="shift-options">
                        <button class="shift-btn" onclick="Factory.start('short')">
                            <span class="shift-icon">⏱️</span>
                            <span class="shift-name">Quick Shift</span>
                            <span class="shift-desc">10 Questions</span>
                        </button>
                        <button class="shift-btn" onclick="Factory.start('normal')">
                            <span class="shift-icon">🕐</span>
                            <span class="shift-name">Standard Shift</span>
                            <span class="shift-desc">20 Questions</span>
                        </button>
                        <button class="shift-btn" onclick="Factory.start('long')">
                            <span class="shift-icon">🌙</span>
                            <span class="shift-name">Night Shift</span>
                            <span class="shift-desc">30 Questions (1.5x Pay)</span>
                        </button>
                    </div>
                </div>
                
                ${Factory.renderAchievements(unlockedAchievements)}
            </div>
        `;
    },
    
    renderStatsDashboard: (stats) => {
        return `
            <div class="stats-dashboard">
                <h4 style="margin: 0 0 0.75rem 0; color: #fbbf24;">📊 Factory Stats</h4>
                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-icon">💰</span>
                        <span class="stat-value">${(stats.totalMoney || 0).toLocaleString()}</span>
                        <span class="stat-label">Total Earnings</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">📦</span>
                        <span class="stat-value">${(stats.totalProducts || 0).toLocaleString()}</span>
                        <span class="stat-label">Products Made</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-value">${stats.bestShift || 0}</span>
                        <span class="stat-label">Best Shift</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">📋</span>
                        <span class="stat-value">${stats.shiftsCompleted || 0}</span>
                        <span class="stat-label">Shifts Done</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">👷</span>
                        <span class="stat-value">${stats.workers || 1}/6</span>
                        <span class="stat-label">Workers</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">⚙️</span>
                        <span class="stat-value">${stats.machines || 1}/6</span>
                        <span class="stat-label">Machines</span>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderAchievements: (unlockedAchievements) => {
        const achievementsList = Object.values(Factory.milestones).map(m => {
            const isUnlocked = unlockedAchievements.includes(m.id);
            return `
                <div class="achievement ${isUnlocked ? 'unlocked' : ''}">
                    <span class="ach-icon">${m.icon}</span>
                    <div class="ach-info">
                        <span class="ach-name">${m.name}</span>
                        <span class="ach-desc">${m.desc}</span>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="achievements-section">
                <h4 style="margin: 0 0 0.75rem 0; color: #fbbf24;">🏆 Achievements</h4>
                <div class="achievements-grid">${achievementsList}</div>
            </div>
        `;
    },
    
    start: (shiftType) => {
        Factory.isPlaying = true;
        Factory.isAnswering = false;
        Factory.products = 0;
        Factory.money = 0;
        Factory.currentQuestionIndex = 0;
        Factory.correctStreak = 0;
        Factory.shiftType = shiftType;
        
        const stats = Factory.getStats();
        Factory.workers = Math.max(1, stats.workers || 1);
        Factory.machines = Math.max(1, stats.machines || 1);
        Factory.qualityBonus = Math.max(0, stats.qualityLevel || 0);
        
        const questionCount = shiftType === 'short' ? 10 : shiftType === 'normal' ? 20 : 30;
        Factory.productionRate = shiftType === 'long' ? 1.5 : 1;
        
        if (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS) && QUESTIONS.length > 0) {
            Factory.questions = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, questionCount);
        } else {
            Factory.questions = [
                { id: 'f1', question: 'What is RAM?', options: ['Random Access Memory', 'Read Access Memory', 'Run Access Memory', 'Real Access Memory'], answer: 0 },
                { id: 'f2', question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Text Machine Language', 'HyperText Machine Learning', 'Home Tool Markup Language'], answer: 0 },
                { id: 'f3', question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Personal Utility', 'Core Processing Unit'], answer: 0 },
                { id: 'f4', question: 'Which is a valid JavaScript data type?', options: ['undefined', 'integer', 'float', 'double'], answer: 0 },
                { id: 'f5', question: 'What is the purpose of CSS?', options: ['Styling web pages', 'Database management', 'Server routing', 'API handling'], answer: 0 }
            ];
        }
        
        Factory.questions = Factory.questions.filter(q => 
            q && q.question && Array.isArray(q.options) && q.options.length > 0 && typeof q.answer === 'number'
        );
        
        if (Factory.questions.length === 0) {
            Factory.showError('No valid questions available');
            return;
        }
        
        Factory.showFactory();
    },
    
    showError: (message) => {
        if (typeof Toast !== 'undefined' && Toast.show) {
            Toast.show(message, 'error');
        } else {
            alert(message);
        }
    },
    
    showFactory: () => {
        const container = document.querySelector('.factory-container');
        if (!container) return;
        
        const workerEmojis = ['👷', '👷‍♀️', '🧑‍🔧', '👨‍🔧', '👩‍🔧', '🧑‍💼'];
        const machineEmojis = ['⚙️', '🔧', '🔩', '🏭', '🔨', '⛏️'];
        
        const workersHtml = Array(Factory.workers).fill(0).map((_, i) => 
            `<span class="worker">${workerEmojis[i % workerEmojis.length]}</span>`
        ).join('');
        
        const machinesHtml = Array(Factory.machines).fill(0).map((_, i) => 
            `<span class="machine">${machineEmojis[i % machineEmojis.length]}</span>`
        ).join('');
        
        container.innerHTML = `
            <div class="game-header"><h2>🏭 Factory Floor</h2><button class="close-btn" onclick="Factory.close()">✕</button></div>
            <div class="factory-floor">
                <div class="factory-hud">
                    <div class="hud-stat" title="Money earned"><span>💰</span><span id="f-money">${Factory.money}</span></div>
                    <div class="hud-stat" title="Products made"><span>📦</span><span id="f-products">${Factory.products}</span></div>
                    <div class="hud-stat" title="Workers"><span>👷</span><span id="f-workers">${Factory.workers}</span></div>
                    <div class="hud-stat" title="Machines"><span>⚙️</span><span id="f-machines">${Factory.machines}</span></div>
                    <div class="hud-stat" title="Progress"><span>📊</span><span id="f-progress">${Factory.currentQuestionIndex}/${Factory.questions.length}</span></div>
                </div>
                
                <div class="workers-area" id="workers-area">${workersHtml}</div>
                
                <div class="conveyor-belt" id="conveyor-belt">
                    <div class="machine-area">${machinesHtml}</div>
                    <div class="belt-track"></div>
                    <div class="product-area" id="product-area"></div>
                    <div id="streak-display"></div>
                </div>
                
                <div class="factory-question" id="factory-question">${Factory.renderQuestion()}</div>
                
                <div class="factory-actions">
                    <button class="btn btn-secondary" onclick="Factory.openUpgrades()">⬆️ Upgrades</button>
                    <button class="btn btn-warning" onclick="Factory.confirmEndShift()">🚪 End Shift</button>
                </div>
            </div>
        `;
    },
    
    renderQuestion: () => {
        if (Factory.currentQuestionIndex >= Factory.questions.length) {
            setTimeout(() => Factory.endShift(), 100);
            return '<div class="shift-complete-msg">Shift complete! Calculating results...</div>';
        }
        
        const q = Factory.questions[Factory.currentQuestionIndex];
        if (!q || !q.question || !Array.isArray(q.options)) {
            Factory.currentQuestionIndex++;
            return Factory.renderQuestion();
        }
        
        Factory.currentQuestion = q;
        
        // Shuffle answer options - always use internal to get originalIndices format
        const shuffled = Factory.shuffleOptionsInternal(q);
        
        return `
            <div class="f-question">
                <p class="question-text">${Factory.escapeHtml(q.question)}</p>
                <div class="f-options">
                    ${shuffled.options.map((opt, i) => `<button class="f-option" data-original="${shuffled.originalIndices[i]}" onclick="Factory.answer(${shuffled.originalIndices[i]}, this)">${Factory.escapeHtml(opt)}</button>`).join('')}
                </div>
            </div>
        `;
    },
    
    // Internal shuffle if Helpers.shuffleOptions not available
    shuffleOptionsInternal: (question) => {
        const indices = question.options.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return {
            options: indices.map(i => question.options[i]),
            originalIndices: indices
        };
    },
    
    escapeHtml: (text) => {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    answer: (originalIndex, buttonEl) => {
        if (Factory.isAnswering || !Factory.isPlaying) return;
        Factory.isAnswering = true;
        
        const q = Factory.currentQuestion;
        if (!q || typeof q.answer !== 'number') {
            Factory.isAnswering = false;
            return;
        }
        
        const isCorrect = originalIndex === q.answer;
        const buttons = document.querySelectorAll('.f-option');
        const conveyor = document.getElementById('conveyor-belt');
        
        buttons.forEach((btn) => {
            btn.disabled = true;
            btn.classList.add('disabled');
            const origIdx = parseInt(btn.getAttribute('data-original'));
            if (origIdx === q.answer) btn.classList.add('correct');
            else if (btn === buttonEl && !isCorrect) btn.classList.add('incorrect');
        });
        
        if (isCorrect) {
            Factory.correctStreak++;
            
            // Check for streak achievement
            if (Factory.correctStreak >= 10) {
                Factory.checkMilestone('perfectShift', Factory.correctStreak);
            }
            
            const baseProducts = Math.max(1, Factory.workers) * Math.max(1, Factory.machines);
            const qualityMultiplier = 1 + (Math.max(0, Factory.qualityBonus) * 0.1);
            const streakBonus = 1 + (Math.min(Factory.correctStreak, 10) * 0.05);
            const productsProduced = Math.max(1, Math.round(baseProducts * qualityMultiplier * Factory.productionRate * streakBonus));
            
            Factory.products += productsProduced;
            
            const moneyEarned = Math.min(productsProduced * 10, 10000);
            Factory.money += moneyEarned;
            
            Factory.updateHUD();
            Factory.showProduction(productsProduced, moneyEarned);
            Factory.updateStreakDisplay();
            
            // Check milestones
            Factory.checkMilestone('firstProduct', Factory.products);
            Factory.checkMilestone('producer', Factory.products);
            Factory.checkMilestone('massProducer', Factory.products);
            Factory.checkMilestone('moneyMaker', Factory.money);
            Factory.checkMilestone('tycoon', Factory.money);
            
            if (conveyor) conveyor.classList.remove('belt-paused');
            
            if (typeof SRSSystem !== 'undefined' && SRSSystem.recordAnswer) SRSSystem.recordAnswer(q.id, true);
            if (typeof SoundFX !== 'undefined' && SoundFX.play) SoundFX.play('success');
        } else {
            Factory.correctStreak = 0;
            Factory.showProductionFail();
            Factory.updateStreakDisplay();
            
            if (conveyor) conveyor.classList.add('belt-paused');
            
            if (typeof SRSSystem !== 'undefined' && SRSSystem.recordAnswer) SRSSystem.recordAnswer(q.id, false);
            if (typeof SoundFX !== 'undefined' && SoundFX.play) SoundFX.play('error');
        }
        
        if (typeof StreakSystem !== 'undefined' && StreakSystem.recordActivity) {
            StreakSystem.recordActivity('question');
            if (isCorrect) StreakSystem.recordActivity('correct');
        }
        
        setTimeout(() => {
            Factory.isAnswering = false;
            Factory.currentQuestionIndex++;
            Factory.updateHUD();
            const questionArea = document.getElementById('factory-question');
            if (questionArea) questionArea.innerHTML = Factory.renderQuestion();
        }, 1500);
    },
    
    updateStreakDisplay: () => {
        const display = document.getElementById('streak-display');
        if (!display) return;
        
        if (Factory.correctStreak >= 3) {
            display.innerHTML = `<div class="streak-indicator">🔥 ${Factory.correctStreak}x Streak!</div>`;
        } else {
            display.innerHTML = '';
        }
    },
    
    updateHUD: () => {
        const moneyEl = document.getElementById('f-money');
        const productsEl = document.getElementById('f-products');
        const progressEl = document.getElementById('f-progress');
        const workersEl = document.getElementById('f-workers');
        const machinesEl = document.getElementById('f-machines');
        
        if (moneyEl) moneyEl.textContent = Factory.money;
        if (productsEl) productsEl.textContent = Factory.products;
        if (progressEl) progressEl.textContent = `${Factory.currentQuestionIndex}/${Factory.questions.length}`;
        if (workersEl) workersEl.textContent = Factory.workers;
        if (machinesEl) machinesEl.textContent = Factory.machines;
    },
    
    showProduction: (count, money) => {
        const area = document.getElementById('product-area');
        if (!area) return;
        
        const earning = document.createElement('span');
        earning.className = 'earning-popup';
        earning.textContent = `+${money} 💰`;
        area.appendChild(earning);
        setTimeout(() => earning.remove(), 1200);
        
        const products = ['📦', '💾', '💻', '📱', '🖥️'];
        const displayCount = Math.min(count, 5);
        for (let i = 0; i < displayCount; i++) {
            const product = document.createElement('span');
            product.className = 'produced-item';
            product.textContent = products[i % products.length];
            product.style.animationDelay = `${i * 0.1}s`;
            area.appendChild(product);
            setTimeout(() => product.remove(), 1000);
        }
    },
    
    showProductionFail: () => {
        const area = document.getElementById('product-area');
        if (!area) return;
        
        const fail = document.createElement('span');
        fail.className = 'production-fail';
        fail.textContent = '❌ Production Halted!';
        area.appendChild(fail);
        setTimeout(() => fail.remove(), 1200);
    },
    
    checkMilestone: (milestoneId, value) => {
        const milestone = Factory.milestones[milestoneId];
        if (!milestone) return;
        
        const stats = Factory.getStats();
        const achievements = stats.achievements || [];
        
        if (achievements.includes(milestoneId)) return;
        
        if (value >= milestone.threshold) {
            achievements.push(milestoneId);
            stats.achievements = achievements;
            Factory.saveStats(stats);
            Factory.showAchievementUnlock(milestone);
        }
    },
    
    showAchievementUnlock: (milestone) => {
        // Remove any existing unlock popup
        const existing = document.querySelector('.achievement-unlock');
        if (existing) existing.remove();
        
        const popup = document.createElement('div');
        popup.className = 'achievement-unlock';
        popup.innerHTML = `
            <span class="unlock-icon">${milestone.icon}</span>
            <div class="unlock-title">🏆 Achievement Unlocked!</div>
            <div class="unlock-name">${milestone.name}</div>
        `;
        document.body.appendChild(popup);
        
        if (typeof SoundFX !== 'undefined' && SoundFX.play) {
            SoundFX.play('levelUp');
        }
        
        setTimeout(() => popup.remove(), 3000);
    },
    
    showUpgradeCelebration: () => {
        const celebration = document.createElement('div');
        celebration.className = 'upgrade-celebration';
        
        const particles = ['🎉', '✨', '⭐', '💫', '🌟', '🎊'];
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('span');
            particle.className = 'celebration-particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 0.5}s`;
            particle.style.animationDuration = `${1.5 + Math.random()}s`;
            celebration.appendChild(particle);
        }
        
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 2500);
    },
    
    openUpgrades: () => {
        if (typeof Modal === 'undefined' || !Modal.show) {
            Factory.showError('Upgrade menu not available');
            return;
        }
        
        const stats = Factory.getStats();
        const workers = Math.max(1, stats.workers || 1);
        const machines = Math.max(1, stats.machines || 1);
        const quality = Math.max(0, stats.qualityLevel || 0);
        
        const canUpgrade = (type, level) => {
            const costs = Factory.upgradeCosts[type];
            if (!costs || level < 0) return false;
            return level < costs.length && Factory.money >= costs[level];
        };
        
        const getCost = (type, level) => {
            const costs = Factory.upgradeCosts[type];
            if (!costs || level < 0 || level >= costs.length) return 'MAX';
            return costs[level];
        };
        
        Modal.show({
            title: '⬆️ Factory Upgrades',
            content: `
                <div class="factory-upgrades">
                    <p class="upgrade-money">Current Money: <strong>${Factory.money} 💰</strong></p>
                    <div class="upgrade-list">
                        <div class="upgrade-item">
                            <div class="upgrade-info">
                                <span class="upgrade-name">👷 Workers (${workers}/6)</span>
                                <span class="upgrade-desc">+1 base production per correct answer</span>
                            </div>
                            ${workers < 6 ? `<button class="btn btn-small btn-primary" onclick="Factory.upgrade('worker')" ${canUpgrade('worker', workers-1) ? '' : 'disabled'}>${getCost('worker', workers-1)} 💰</button>` : '<span class="upgrade-max">MAX</span>'}
                        </div>
                        <div class="upgrade-item">
                            <div class="upgrade-info">
                                <span class="upgrade-name">⚙️ Machines (${machines}/6)</span>
                                <span class="upgrade-desc">×${machines} production multiplier</span>
                            </div>
                            ${machines < 6 ? `<button class="btn btn-small btn-primary" onclick="Factory.upgrade('machine')" ${canUpgrade('machine', machines-1) ? '' : 'disabled'}>${getCost('machine', machines-1)} 💰</button>` : '<span class="upgrade-max">MAX</span>'}
                        </div>
                        <div class="upgrade-item">
                            <div class="upgrade-info">
                                <span class="upgrade-name">⭐ Quality (${quality}/5)</span>
                                <span class="upgrade-desc">+${quality * 10}% bonus to all production</span>
                            </div>
                            ${quality < 5 ? `<button class="btn btn-small btn-primary" onclick="Factory.upgrade('quality')" ${canUpgrade('quality', quality) ? '' : 'disabled'}>${getCost('quality', quality)} 💰</button>` : '<span class="upgrade-max">MAX</span>'}
                        </div>
                    </div>
                    <p class="upgrade-formula"><small>Formula: Workers × Machines × (1 + Quality×10%) × Streak Bonus</small></p>
                </div>
            `,
            footer: '<button class="btn btn-secondary" onclick="Modal.close()">Close</button>'
        });
    },
    
    upgrade: (type) => {
        const stats = Factory.getStats();
        let level, costIndex, cost;
        
        switch (type) {
            case 'worker':
                level = Math.max(1, stats.workers || 1);
                costIndex = level - 1;
                cost = Factory.upgradeCosts.worker[costIndex];
                if (cost && Factory.money >= cost && level < 6) {
                    Factory.money -= cost;
                    stats.workers = level + 1;
                    Factory.workers = stats.workers;
                } else {
                    Factory.showError('Cannot afford this upgrade');
                    return;
                }
                break;
            case 'machine':
                level = Math.max(1, stats.machines || 1);
                costIndex = level - 1;
                cost = Factory.upgradeCosts.machine[costIndex];
                if (cost && Factory.money >= cost && level < 6) {
                    Factory.money -= cost;
                    stats.machines = level + 1;
                    Factory.machines = stats.machines;
                } else {
                    Factory.showError('Cannot afford this upgrade');
                    return;
                }
                break;
            case 'quality':
                level = Math.max(0, stats.qualityLevel || 0);
                cost = Factory.upgradeCosts.quality[level];
                if (cost && Factory.money >= cost && level < 5) {
                    Factory.money -= cost;
                    stats.qualityLevel = level + 1;
                    Factory.qualityBonus = stats.qualityLevel;
                } else {
                    Factory.showError('Cannot afford this upgrade');
                    return;
                }
                break;
            default:
                return;
        }
        
        Factory.saveStats(stats);
        Factory.updateHUD();
        Factory.showUpgradeCelebration();
        
        // Check for factory boss achievement (all maxed)
        if (stats.workers >= 6 && stats.machines >= 6 && stats.qualityLevel >= 5) {
            Factory.checkMilestone('factoryBoss', 1);
        }
        
        // Update workers/machines display on factory floor
        Factory.updateFactoryFloor();
        
        if (typeof Toast !== 'undefined' && Toast.show) {
            Toast.show(`⬆️ ${type.charAt(0).toUpperCase() + type.slice(1)} upgraded!`, 'success');
        }
        
        if (typeof Modal !== 'undefined' && Modal.close) {
            Modal.close();
        }
        setTimeout(() => Factory.openUpgrades(), 100);
    },
    
    updateFactoryFloor: () => {
        const workersArea = document.getElementById('workers-area');
        const workerEmojis = ['👷', '👷‍♀️', '🧑‍🔧', '👨‍🔧', '👩‍🔧', '🧑‍💼'];
        
        if (workersArea) {
            workersArea.innerHTML = Array(Factory.workers).fill(0).map((_, i) => 
                `<span class="worker">${workerEmojis[i % workerEmojis.length]}</span>`
            ).join('');
        }
    },
    
    confirmEndShift: () => {
        if (Factory.currentQuestionIndex < Factory.questions.length) {
            if (typeof Modal !== 'undefined' && Modal.confirm) {
                Modal.confirm({
                    title: 'End Shift Early?',
                    message: `You have ${Factory.questions.length - Factory.currentQuestionIndex} questions remaining. End shift now?`,
                    confirmText: 'End Shift',
                    onConfirm: () => Factory.endShift()
                });
            } else if (confirm(`You have ${Factory.questions.length - Factory.currentQuestionIndex} questions remaining. End shift now?`)) {
                Factory.endShift();
            }
        } else {
            Factory.endShift();
        }
    },
    
    endShift: () => {
        if (!Factory.isPlaying) return;
        Factory.isPlaying = false;
        
        const stats = Factory.getStats();
        const previousMoney = stats.totalMoney || 0;
        const previousProducts = stats.totalProducts || 0;
        
        stats.totalMoney = previousMoney + Factory.money;
        stats.totalProducts = previousProducts + Factory.products;
        stats.bestShift = Math.max(stats.bestShift || 0, Factory.products);
        stats.shiftsCompleted = (stats.shiftsCompleted || 0) + 1;
        
        // Track night shifts
        if (Factory.shiftType === 'long') {
            stats.nightShiftsCompleted = (stats.nightShiftsCompleted || 0) + 1;
            Factory.checkMilestone('nightOwl', stats.nightShiftsCompleted);
        }
        
        // Check veteran milestone
        Factory.checkMilestone('veteran', stats.shiftsCompleted);
        
        Factory.saveStats(stats);
        
        const xpEarned = Math.round(Factory.products * 2);
        if (typeof AppState !== 'undefined' && AppState.getState && AppState.setState) {
            const user = AppState.getState('user') || {};
            user.xp = (user.xp || 0) + xpEarned;
            AppState.setState('user', user);
        }
        
        const container = document.querySelector('.factory-container');
        if (container) {
            container.innerHTML = `
                <div class="game-header"><h2>🏭 Shift Complete!</h2><button class="close-btn" onclick="Factory.close()">✕</button></div>
                <div class="factory-results">
                    <div class="results-graphic"><span class="big-icon" style="font-size: 4rem;">🏭</span></div>
                    <h3>Great Work!</h3>
                    <div class="results-stats">
                        <div class="result-item"><span>📦 Products Made</span><span class="result-value">${Factory.products}</span></div>
                        <div class="result-item"><span>💰 Money Earned</span><span class="result-value">${Factory.money}</span></div>
                        <div class="result-item"><span>✨ XP Earned</span><span class="result-value">+${xpEarned}</span></div>
                        <div class="result-item"><span>🔥 Best Streak</span><span class="result-value">${Factory.correctStreak}x</span></div>
                        <div class="result-item"><span>📊 Questions</span><span class="result-value">${Factory.currentQuestionIndex}/${Factory.questions.length}</span></div>
                    </div>
                    ${Factory.products === stats.bestShift && Factory.products > 0 ? '<div class="new-record">🏆 New Best Shift!</div>' : ''}
                    <div class="results-actions">
                        <button class="btn btn-primary" onclick="Factory.close(); setTimeout(() => Factory.open(), 100);">New Shift</button>
                        <button class="btn btn-secondary" onclick="Factory.close()">Exit</button>
                    </div>
                </div>
            `;
        }
    },
    
    getStats: () => {
        try {
            const data = localStorage.getItem('csmaster_factory');
            if (!data) return {};
            const parsed = JSON.parse(data);
            return typeof parsed === 'object' && parsed !== null ? parsed : {};
        } catch (e) {
            console.warn('Factory: Failed to load stats', e);
            return {};
        }
    },
    
    saveStats: (stats) => {
        try {
            if (typeof stats !== 'object' || stats === null) return;
            localStorage.setItem('csmaster_factory', JSON.stringify(stats));
        } catch (e) {
            console.warn('Factory: Failed to save stats', e);
        }
    },

    cleanup: () => {
        Factory.isPlaying = false;
        Factory.isAnswering = false;
        Factory.questions = [];
        Factory.currentQuestion = null;
        Factory.currentQuestionIndex = 0;
        Factory.products = 0;
        Factory.money = 0;
        Factory.correctStreak = 0;
        if (Factory.animationInterval) {
            clearInterval(Factory.animationInterval);
            Factory.animationInterval = null;
        }
        console.log('🏭 Factory cleanup');
    }
};
