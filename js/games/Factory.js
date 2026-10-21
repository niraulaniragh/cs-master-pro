/**
 * Factory.js - Code Factory Production Game
 * Build products by answering questions to power your factory
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
    
    upgradeCosts: {
        worker: [50, 100, 200, 400, 800],
        machine: [100, 250, 500, 1000, 2000],
        quality: [75, 150, 300, 600, 1200]
    },

    open: () => {
        const modal = document.createElement('div');
        modal.id = 'factory-modal';
        modal.className = 'game-modal active';
        modal.innerHTML = `<div class="game-container factory-container">${Factory.renderMenu()}</div>`;
        document.body.appendChild(modal);
    },
    
    startAsHost: (game) => { Factory.open(); },
    startAsPlayer: (game) => { Factory.open(); },

    close: () => {
        const modal = document.getElementById('factory-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        Factory.isPlaying = false;
    },

    renderMenu: () => {
        const stats = Factory.getStats();
        return `
            <div class="game-header">
                <h2>🏭 Code Factory</h2>
                <button class="close-btn" onclick="Factory.close()">✕</button>
            </div>
            <div class="factory-menu">
                <div class="factory-hero">
                    <div class="factory-graphic">🏭</div>
                    <h3>Build Your Code Empire!</h3>
                    <p>Answer questions to produce code products, hire workers, and upgrade machines!</p>
                </div>
                <div class="factory-stats">
                    <div class="f-stat"><span>💰</span><span>${stats.totalMoney || 0}</span><span>Total Earned</span></div>
                    <div class="f-stat"><span>📦</span><span>${stats.totalProducts || 0}</span><span>Products Made</span></div>
                    <div class="f-stat"><span>⭐</span><span>${stats.bestShift || 0}</span><span>Best Shift</span></div>
                </div>
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
            </div>
        `;
    },
    
    start: (shiftType) => {
        Factory.isPlaying = true;
        Factory.products = 0;
        Factory.money = 0;
        Factory.currentQuestionIndex = 0;
        
        const stats = Factory.getStats();
        Factory.workers = stats.workers || 1;
        Factory.machines = stats.machines || 1;
        Factory.qualityBonus = stats.qualityLevel || 0;
        
        const questionCount = shiftType === 'short' ? 10 : shiftType === 'normal' ? 20 : 30;
        Factory.productionRate = shiftType === 'long' ? 1.5 : 1;
        
        if (typeof QUESTIONS !== 'undefined') {
            Factory.questions = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, questionCount);
        } else {
            Factory.questions = [
                { id: 'f1', question: 'What is RAM?', options: ['Random Access Memory', 'Read Access Memory', 'Run Access Memory', 'Real Access Memory'], answer: 0 },
                { id: 'f2', question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Text Machine Language', 'HyperText Machine Learning', 'Home Tool Markup Language'], answer: 0 }
            ];
        }
        
        Factory.showFactory();
    },
    
    showFactory: () => {
        const container = document.querySelector('.factory-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="game-header"><h2>🏭 Factory Floor</h2><button class="close-btn" onclick="Factory.close()">✕</button></div>
            <div class="factory-floor">
                <div class="factory-hud">
                    <div class="hud-stat"><span>💰</span><span id="f-money">${Factory.money}</span></div>
                    <div class="hud-stat"><span>📦</span><span id="f-products">${Factory.products}</span></div>
                    <div class="hud-stat"><span>👷</span><span>${Factory.workers}</span></div>
                    <div class="hud-stat"><span>⚙️</span><span>${Factory.machines}</span></div>
                    <div class="hud-stat"><span>📊</span><span id="f-progress">${Factory.currentQuestionIndex}/${Factory.questions.length}</span></div>
                </div>
                
                <div class="conveyor-belt">
                    <div class="belt-animation"></div>
                    <div class="product-area" id="product-area"></div>
                </div>
                
                <div class="factory-question" id="factory-question">${Factory.renderQuestion()}</div>
                
                <div class="factory-actions">
                    <button class="btn btn-secondary" onclick="Factory.openUpgrades()">⬆️ Upgrades</button>
                    <button class="btn btn-warning" onclick="Factory.endShift()">🚪 End Shift</button>
                </div>
            </div>
        `;
    },
    
    renderQuestion: () => {
        if (Factory.currentQuestionIndex >= Factory.questions.length) {
            Factory.endShift();
            return '';
        }
        
        const q = Factory.questions[Factory.currentQuestionIndex];
        Factory.currentQuestion = q;
        
        return `
            <div class="f-question">
                <p class="question-text">${q.question}</p>
                <div class="f-options">
                    ${q.options.map((opt, i) => `<button class="f-option" onclick="Factory.answer(${i})">${opt}</button>`).join('')}
                </div>
            </div>
        `;
    },
    
    answer: (index) => {
        const q = Factory.currentQuestion;
        if (!q) return;
        
        const isCorrect = index === q.answer;
        const buttons = document.querySelectorAll('.f-option');
        
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === q.answer) btn.classList.add('correct');
            else if (i === index && !isCorrect) btn.classList.add('incorrect');
        });
        
        if (isCorrect) {
            // Calculate production
            const baseProducts = Factory.workers * Factory.machines;
            const qualityMultiplier = 1 + (Factory.qualityBonus * 0.1);
            const productsProduced = Math.round(baseProducts * qualityMultiplier * Factory.productionRate);
            
            Factory.products += productsProduced;
            
            // Calculate money (10 per product base)
            const moneyEarned = productsProduced * 10;
            Factory.money += moneyEarned;
            
            document.getElementById('f-money').textContent = Factory.money;
            document.getElementById('f-products').textContent = Factory.products;
            
            // Show production animation
            Factory.showProduction(productsProduced);
            
            if (typeof SRSSystem !== 'undefined') SRSSystem.recordAnswer(q.id, true);
            if (typeof SoundFX !== 'undefined') SoundFX.play('success');
        } else {
            // Production stops on wrong answer
            Factory.showProductionFail();
            if (typeof SRSSystem !== 'undefined') SRSSystem.recordAnswer(q.id, false);
            if (typeof SoundFX !== 'undefined') SoundFX.play('error');
        }
        
        if (typeof StreakSystem !== 'undefined') {
            StreakSystem.recordActivity('question');
            if (isCorrect) StreakSystem.recordActivity('correct');
        }
        
        setTimeout(() => {
            Factory.currentQuestionIndex++;
            document.getElementById('f-progress').textContent = `${Factory.currentQuestionIndex}/${Factory.questions.length}`;
            const questionArea = document.getElementById('factory-question');
            if (questionArea) questionArea.innerHTML = Factory.renderQuestion();
        }, 1500);
    },
    
    showProduction: (count) => {
        const area = document.getElementById('product-area');
        if (!area) return;
        
        const products = ['📦', '💾', '💻', '📱', '🖥️'];
        for (let i = 0; i < Math.min(count, 5); i++) {
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
        setTimeout(() => fail.remove(), 1000);
    },
    
    openUpgrades: () => {
        const stats = Factory.getStats();
        const workers = stats.workers || 1;
        const machines = stats.machines || 1;
        const quality = stats.qualityLevel || 0;
        
        const canUpgrade = (type, level) => {
            const costs = Factory.upgradeCosts[type];
            return level < costs.length && Factory.money >= costs[level];
        };
        
        Modal.show({
            title: '⬆️ Factory Upgrades',
            content: `
                <div class="factory-upgrades">
                    <p>Current Money: <strong>${Factory.money} 💰</strong></p>
                    <div class="upgrade-list">
                        <div class="upgrade-item">
                            <span>👷 Workers (${workers}/6)</span>
                            <span>+1 base production</span>
                            ${workers < 6 ? `<button class="btn btn-small btn-primary" onclick="Factory.upgrade('worker')" ${canUpgrade('worker', workers-1) ? '' : 'disabled'}>${Factory.upgradeCosts.worker[workers-1] || 'MAX'} 💰</button>` : '<span>MAX</span>'}
                        </div>
                        <div class="upgrade-item">
                            <span>⚙️ Machines (${machines}/6)</span>
                            <span>×${machines} multiplier</span>
                            ${machines < 6 ? `<button class="btn btn-small btn-primary" onclick="Factory.upgrade('machine')" ${canUpgrade('machine', machines-1) ? '' : 'disabled'}>${Factory.upgradeCosts.machine[machines-1] || 'MAX'} 💰</button>` : '<span>MAX</span>'}
                        </div>
                        <div class="upgrade-item">
                            <span>⭐ Quality (${quality}/5)</span>
                            <span>+${quality * 10}% bonus</span>
                            ${quality < 5 ? `<button class="btn btn-small btn-primary" onclick="Factory.upgrade('quality')" ${canUpgrade('quality', quality) ? '' : 'disabled'}>${Factory.upgradeCosts.quality[quality] || 'MAX'} 💰</button>` : '<span>MAX</span>'}
                        </div>
                    </div>
                </div>
            `,
            footer: '<button class="btn btn-secondary" onclick="Modal.close()">Close</button>'
        });
    },
    
    upgrade: (type) => {
        const stats = Factory.getStats();
        let level, costIndex;
        
        switch (type) {
            case 'worker':
                level = stats.workers || 1;
                costIndex = level - 1;
                if (Factory.money >= Factory.upgradeCosts.worker[costIndex]) {
                    Factory.money -= Factory.upgradeCosts.worker[costIndex];
                    stats.workers = level + 1;
                    Factory.workers = stats.workers;
                }
                break;
            case 'machine':
                level = stats.machines || 1;
                costIndex = level - 1;
                if (Factory.money >= Factory.upgradeCosts.machine[costIndex]) {
                    Factory.money -= Factory.upgradeCosts.machine[costIndex];
                    stats.machines = level + 1;
                    Factory.machines = stats.machines;
                }
                break;
            case 'quality':
                level = stats.qualityLevel || 0;
                if (Factory.money >= Factory.upgradeCosts.quality[level]) {
                    Factory.money -= Factory.upgradeCosts.quality[level];
                    stats.qualityLevel = level + 1;
                    Factory.qualityBonus = stats.qualityLevel;
                }
                break;
        }
        
        Factory.saveStats(stats);
        document.getElementById('f-money').textContent = Factory.money;
        Toast.show(`⬆️ ${type} upgraded!`, 'success');
        Modal.close();
        Factory.openUpgrades();
    },
    
    endShift: () => {
        Factory.isPlaying = false;
        
        const stats = Factory.getStats();
        stats.totalMoney = (stats.totalMoney || 0) + Factory.money;
        stats.totalProducts = (stats.totalProducts || 0) + Factory.products;
        stats.bestShift = Math.max(stats.bestShift || 0, Factory.products);
        Factory.saveStats(stats);
        
        const xpEarned = Math.round(Factory.products * 2);
        if (typeof AppState !== 'undefined') {
            const user = AppState.getState('user') || {};
            user.xp = (user.xp || 0) + xpEarned;
            AppState.setState('user', user);
        }
        
        const container = document.querySelector('.factory-container');
        if (container) {
            container.innerHTML = `
                <div class="game-header"><h2>🏭 Shift Complete!</h2><button class="close-btn" onclick="Factory.close()">✕</button></div>
                <div class="factory-results">
                    <div class="results-graphic"><span class="big-icon">🏭</span></div>
                    <div class="results-stats">
                        <div class="result-item"><span>Products Made</span><span class="result-value">${Factory.products} 📦</span></div>
                        <div class="result-item"><span>Money Earned</span><span class="result-value">${Factory.money} 💰</span></div>
                        <div class="result-item"><span>XP Earned</span><span class="result-value">+${xpEarned}</span></div>
                    </div>
                    <div class="results-actions">
                        <button class="btn btn-primary" onclick="Factory.close(); Factory.open();">New Shift</button>
                        <button class="btn btn-secondary" onclick="Factory.close()">Exit</button>
                    </div>
                </div>
            `;
        }
    },
    
    getStats: () => { try { return JSON.parse(localStorage.getItem('csmaster_factory') || '{}'); } catch (e) { return {}; } },
    saveStats: (stats) => { localStorage.setItem('csmaster_factory', JSON.stringify(stats)); },

    cleanup: () => {
        // Stop game
        Factory.isPlaying = false;
        console.log('🏭 Factory cleanup');
    }
};
