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
    isAnswering: false, // Prevent double-clicks
    
    upgradeCosts: {
        worker: [50, 100, 200, 400, 800],
        machine: [100, 250, 500, 1000, 2000],
        quality: [75, 150, 300, 600, 1200]
    },

    open: () => {
        // Prevent duplicate modals
        if (document.getElementById('factory-modal')) {
            Factory.close();
        }
        const modal = document.createElement('div');
        modal.id = 'factory-modal';
        modal.className = 'game-modal active';
        modal.innerHTML = `<div class="game-container factory-container">${Factory.renderMenu()}</div>`;
        document.body.appendChild(modal);
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
        Factory.isAnswering = false;
        Factory.products = 0;
        Factory.money = 0;
        Factory.currentQuestionIndex = 0;
        
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
        
        // Validate questions have required fields
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
        
        container.innerHTML = `
            <div class="game-header"><h2>🏭 Factory Floor</h2><button class="close-btn" onclick="Factory.close()">✕</button></div>
            <div class="factory-floor">
                <div class="factory-hud">
                    <div class="hud-stat" title="Money earned"><span>💰</span><span id="f-money">${Factory.money}</span></div>
                    <div class="hud-stat" title="Products made"><span>📦</span><span id="f-products">${Factory.products}</span></div>
                    <div class="hud-stat" title="Workers (production base)"><span>👷</span><span id="f-workers">${Factory.workers}</span></div>
                    <div class="hud-stat" title="Machines (multiplier)"><span>⚙️</span><span id="f-machines">${Factory.machines}</span></div>
                    <div class="hud-stat" title="Progress"><span>📊</span><span id="f-progress">${Factory.currentQuestionIndex}/${Factory.questions.length}</span></div>
                </div>
                
                <div class="conveyor-belt">
                    <div class="belt-animation"></div>
                    <div class="product-area" id="product-area"></div>
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
        
        return `
            <div class="f-question">
                <p class="question-text">${Factory.escapeHtml(q.question)}</p>
                <div class="f-options">
                    ${q.options.map((opt, i) => `<button class="f-option" onclick="Factory.answer(${i})">${Factory.escapeHtml(opt)}</button>`).join('')}
                </div>
            </div>
        `;
    },
    
    escapeHtml: (text) => {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    answer: (index) => {
        // Prevent double-clicks and answering when game not active
        if (Factory.isAnswering || !Factory.isPlaying) return;
        Factory.isAnswering = true;
        
        const q = Factory.currentQuestion;
        if (!q || typeof q.answer !== 'number') {
            Factory.isAnswering = false;
            return;
        }
        
        const isCorrect = index === q.answer;
        const buttons = document.querySelectorAll('.f-option');
        
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            btn.classList.add('disabled');
            if (i === q.answer) btn.classList.add('correct');
            else if (i === index && !isCorrect) btn.classList.add('incorrect');
        });
        
        if (isCorrect) {
            // Calculate production with safe bounds
            const baseProducts = Math.max(1, Factory.workers) * Math.max(1, Factory.machines);
            const qualityMultiplier = 1 + (Math.max(0, Factory.qualityBonus) * 0.1);
            const productsProduced = Math.max(1, Math.round(baseProducts * qualityMultiplier * Factory.productionRate));
            
            Factory.products += productsProduced;
            
            // Calculate money (10 per product base, capped at reasonable max)
            const moneyEarned = Math.min(productsProduced * 10, 10000);
            Factory.money += moneyEarned;
            
            Factory.updateHUD();
            Factory.showProduction(productsProduced, moneyEarned);
            
            if (typeof SRSSystem !== 'undefined' && SRSSystem.recordAnswer) SRSSystem.recordAnswer(q.id, true);
            if (typeof SoundFX !== 'undefined' && SoundFX.play) SoundFX.play('success');
        } else {
            Factory.showProductionFail();
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
        
        // Show earnings notification
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
    
    openUpgrades: () => {
        // Check if Modal is available
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
                    <p class="upgrade-formula"><small>Formula: Workers × Machines × (1 + Quality×10%)</small></p>
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
        
        if (typeof Toast !== 'undefined' && Toast.show) {
            Toast.show(`⬆️ ${type.charAt(0).toUpperCase() + type.slice(1)} upgraded!`, 'success');
        }
        
        if (typeof Modal !== 'undefined' && Modal.close) {
            Modal.close();
        }
        // Refresh upgrades modal
        setTimeout(() => Factory.openUpgrades(), 100);
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
        if (!Factory.isPlaying) return; // Prevent double-ending
        Factory.isPlaying = false;
        
        const stats = Factory.getStats();
        const previousMoney = stats.totalMoney || 0;
        const previousProducts = stats.totalProducts || 0;
        
        stats.totalMoney = previousMoney + Factory.money;
        stats.totalProducts = previousProducts + Factory.products;
        stats.bestShift = Math.max(stats.bestShift || 0, Factory.products);
        stats.shiftsCompleted = (stats.shiftsCompleted || 0) + 1;
        Factory.saveStats(stats);
        
        const xpEarned = Math.round(Factory.products * 2);
        if (typeof AppState !== 'undefined' && AppState.getState && AppState.setState) {
            const user = AppState.getState('user') || {};
            user.xp = (user.xp || 0) + xpEarned;
            AppState.setState('user', user);
        }
        
        const accuracy = Factory.currentQuestionIndex > 0 
            ? Math.round((Factory.products / (Factory.currentQuestionIndex * Factory.workers * Factory.machines)) * 100)
            : 0;
        
        const container = document.querySelector('.factory-container');
        if (container) {
            container.innerHTML = `
                <div class="game-header"><h2>🏭 Shift Complete!</h2><button class="close-btn" onclick="Factory.close()">✕</button></div>
                <div class="factory-results">
                    <div class="results-graphic"><span class="big-icon">🏭</span></div>
                    <h3>Great Work!</h3>
                    <div class="results-stats">
                        <div class="result-item"><span>📦 Products Made</span><span class="result-value">${Factory.products}</span></div>
                        <div class="result-item"><span>💰 Money Earned</span><span class="result-value">${Factory.money}</span></div>
                        <div class="result-item"><span>✨ XP Earned</span><span class="result-value">+${xpEarned}</span></div>
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
        console.log('🏭 Factory cleanup');
    }
};
