/**
 * BossBattle.js - Epic Boss Fights
 * Defeat topic bosses by answering questions correctly
 * Features: Boss HP, special attacks, power-ups, epic rewards
 */

const BossBattle = {
    isPlaying: false,
    currentBoss: null,
    playerHP: 100,
    bossHP: 100,
    questions: [],
    currentIndex: 0,
    combo: 0,
    totalDamage: 0,
    powerUps: { heal: 2, shield: 1, critical: 2 },
    hasShield: false,
    criticalActive: false,

    // Boss characters for each topic
    bosses: [
        {
            id: 'binary-beast',
            name: 'Binary Beast',
            topic: 'data-representation',
            icon: '🤖',
            description: 'Master of 0s and 1s',
            hp: 100,
            attack: 15,
            color: '#3b82f6',
            reward: 500,
            attacks: ['Binary Blast', 'Hex Hammer', 'Bit Barrage']
        },
        {
            id: 'algorithm-dragon',
            name: 'Algorithm Dragon',
            topic: 'problem-solving',
            icon: '🐉',
            description: 'Guardian of Logic',
            hp: 120,
            attack: 18,
            color: '#10b981',
            reward: 600,
            attacks: ['Sorting Storm', 'Search Strike', 'Loop Lightning']
        },
        {
            id: 'network-ninja',
            name: 'Network Ninja',
            topic: 'networks',
            icon: '🥷',
            description: 'Shadow of the Web',
            hp: 110,
            attack: 20,
            color: '#10b981',
            reward: 550,
            attacks: ['Packet Punch', 'Protocol Slash', 'Firewall Fury']
        },
        {
            id: 'hardware-golem',
            name: 'Hardware Golem',
            topic: 'computer-systems',
            icon: '🗿',
            description: 'Ancient Machine Spirit',
            hp: 150,
            attack: 12,
            color: '#f59e0b',
            reward: 700,
            attacks: ['CPU Crush', 'RAM Rush', 'Cache Crash']
        },
        {
            id: 'security-specter',
            name: 'Security Specter',
            topic: 'security',
            icon: '👻',
            description: 'Phantom of Encryption',
            hp: 100,
            attack: 25,
            color: '#10b981',
            reward: 650,
            attacks: ['Malware Maelstrom', 'Phishing Phantasm', 'Encryption Eclipse']
        },
        {
            id: 'code-kraken',
            name: 'Code Kraken',
            topic: 'programming',
            icon: '🦑',
            description: 'Deep Sea Developer',
            hp: 130,
            attack: 17,
            color: '#06b6d4',
            reward: 600,
            attacks: ['Function Flood', 'Variable Vortex', 'Loop Leviathan']
        },
        {
            id: 'database-demon',
            name: 'Database Demon',
            topic: 'databases',
            icon: '😈',
            description: 'Lord of Tables',
            hp: 115,
            attack: 19,
            color: '#f97316',
            reward: 580,
            attacks: ['Query Quake', 'SQL Slash', 'Table Tornado']
        },
        {
            id: 'final-boss',
            name: 'The Examinator',
            topic: 'all',
            icon: '💀',
            description: 'Ultimate IGCSE Challenge',
            hp: 200,
            attack: 22,
            color: '#fbbf24',
            reward: 1500,
            attacks: ['Exam Explosion', 'Mark Massacre', 'Grade Guillotine']
        }
    ],

    open: () => {
        const modal = document.createElement('div');
        modal.className = 'game-modal boss-battle-modal';
        modal.id = 'boss-battle-modal';
        modal.innerHTML = BossBattle.renderMenu();
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    close: () => {
        BossBattle.cleanup();
        const modal = document.getElementById('boss-battle-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    renderMenu: () => {
        const stats = BossBattle.getStats();
        const defeatedBosses = stats.defeated || [];
        
        return `
            <div class="game-container boss-container">
                <button class="game-close-btn" onclick="BossBattle.close()">✕</button>
                
                <div class="game-header boss-header">
                    <div class="game-icon">⚔️</div>
                    <h2>Boss Battles</h2>
                    <p>Defeat the bosses to prove your CS mastery!</p>
                </div>
                
                <div class="boss-menu">
                    <div class="boss-stats-row">
                        <div class="boss-stat">
                            <span class="boss-stat-value">${defeatedBosses.length}/${BossBattle.bosses.length}</span>
                            <span class="boss-stat-label">Bosses Defeated</span>
                        </div>
                        <div class="boss-stat">
                            <span class="boss-stat-value">${stats.totalDamage || 0}</span>
                            <span class="boss-stat-label">Total Damage</span>
                        </div>
                        <div class="boss-stat">
                            <span class="boss-stat-value">${stats.perfectKills || 0}</span>
                            <span class="boss-stat-label">Perfect Wins</span>
                        </div>
                    </div>
                    
                    <div class="boss-selection">
                        <h4>⚔️ Choose Your Battle</h4>
                        <div class="boss-grid">
                            ${BossBattle.bosses.map(boss => {
                                const isDefeated = defeatedBosses.includes(boss.id);
                                const isFinal = boss.id === 'final-boss';
                                const isLocked = isFinal && defeatedBosses.length < BossBattle.bosses.length - 1;
                                
                                return `
                                    <button class="boss-card ${isDefeated ? 'defeated' : ''} ${isLocked ? 'locked' : ''}"
                                            style="--boss-color: ${boss.color}"
                                            onclick="${isLocked ? '' : `BossBattle.selectBoss('${boss.id}')`}"
                                            ${isLocked ? 'disabled' : ''}>
                                        <span class="boss-icon">${boss.icon}</span>
                                        <span class="boss-name">${boss.name}</span>
                                        <span class="boss-desc">${boss.description}</span>
                                        ${isDefeated ? '<span class="boss-badge">✓ Defeated</span>' : ''}
                                        ${isLocked ? '<span class="boss-badge locked">🔒 Defeat all others first</span>' : ''}
                                        <span class="boss-reward">🏆 ${boss.reward} XP</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    selectBoss: (bossId) => {
        BossBattle.currentBoss = BossBattle.bosses.find(b => b.id === bossId);
        BossBattle.startBattle();
    },

    startBattle: () => {
        try {
            const boss = BossBattle.currentBoss;
            if (!boss) {
                Toast?.show?.('No boss selected', 'error');
                return;
            }
            
            // Get questions for this boss's topic
            let pool = typeof QUESTIONS !== 'undefined' ? QUESTIONS : [];
            if (boss.topic !== 'all') {
                pool = pool.filter(q => q.topic === boss.topic);
            }
            
            // Validate we have enough questions
            if (pool.length === 0) {
                Toast?.show?.('No questions available for this boss', 'error');
                return;
            }
            
            BossBattle.questions = shuffleArray([...pool]).slice(0, 15);
            BossBattle.currentIndex = 0;
            BossBattle.playerHP = 100;
            BossBattle.bossHP = boss.hp;
            BossBattle.combo = 0;
            BossBattle.totalDamage = 0;
            BossBattle.powerUps = { heal: 2, shield: 1, critical: 2 };
            BossBattle.hasShield = false;
            BossBattle.criticalActive = false;
            BossBattle.isPlaying = true;
            
            const container = document.querySelector('.boss-container');
            if (!container) {
                console.error('Boss container not found');
                return;
            }
            container.innerHTML = BossBattle.renderBattle();
            
            // Register keyboard handler
            document.addEventListener('keydown', BossBattle.keyHandler);
            
            // Dramatic entrance
            setTimeout(() => {
                BossBattle.showBossEntrance();
            }, 500);
        } catch (error) {
            console.error('BossBattle.startBattle error:', error);
            Toast?.show?.('Failed to start battle', 'error');
        }
    },

    renderBattle: () => {
        const boss = BossBattle.currentBoss;
        const username = Auth.getCurrentUser()?.username || 'Hero';
        
        return `
            <div class="boss-battle-view" style="--boss-color: ${boss.color}">
                <div class="boss-arena">
                    <div class="boss-player player-side">
                        <div class="boss-avatar player-avatar">👤</div>
                        <div class="boss-name">${Helpers.escapeHtml(username)}</div>
                        <div class="boss-hp-container">
                            <div class="boss-hp-bar">
                                <div class="boss-hp-fill player-hp" id="player-hp"></div>
                            </div>
                            <span class="boss-hp-text" id="player-hp-text">100/100</span>
                        </div>
                        ${BossBattle.hasShield ? '<div class="shield-indicator">🛡️</div>' : ''}
                    </div>
                    
                    <div class="boss-vs-indicator">
                        <span class="combo-counter" id="combo-counter">Combo: 0x</span>
                    </div>
                    
                    <div class="boss-player boss-side">
                        <div class="boss-avatar" id="boss-avatar" style="background: ${boss.color}">${boss.icon}</div>
                        <div class="boss-name">${boss.name}</div>
                        <div class="boss-hp-container">
                            <div class="boss-hp-bar">
                                <div class="boss-hp-fill boss-hp" id="boss-hp"></div>
                            </div>
                            <span class="boss-hp-text" id="boss-hp-text">${boss.hp}/${boss.hp}</span>
                        </div>
                    </div>
                </div>
                
                <div class="boss-battle-log" id="boss-battle-log">
                    <!-- Battle messages appear here -->
                </div>
                
                <div class="boss-question-area" id="boss-question-area">
                    <!-- Question loads here -->
                </div>
                
                <div class="boss-powerups">
                    <button class="boss-pu-btn" onclick="BossBattle.usePowerUp('heal')" id="pu-heal">
                        ❤️ Heal (${BossBattle.powerUps.heal})
                    </button>
                    <button class="boss-pu-btn" onclick="BossBattle.usePowerUp('shield')" id="pu-shield">
                        🛡️ Shield (${BossBattle.powerUps.shield})
                    </button>
                    <button class="boss-pu-btn" onclick="BossBattle.usePowerUp('critical')" id="pu-critical">
                        ⚡ Critical (${BossBattle.powerUps.critical})
                    </button>
                </div>
            </div>
        `;
    },

    showBossEntrance: () => {
        const boss = BossBattle.currentBoss;
        
        BossBattle.addBattleLog(`${boss.icon} ${boss.name} appears!`, 'entrance');
        BossBattle.addBattleLog(`"${boss.description}"`, 'boss-speak');
        
        setTimeout(() => {
            BossBattle.addBattleLog('Battle Start! Answer questions to attack!', 'system');
            BossBattle.showQuestion();
        }, 2000);
    },

    showQuestion: () => {
        if (!BossBattle.isPlaying) return;
        
        if (BossBattle.currentIndex >= BossBattle.questions.length || BossBattle.bossHP <= 0) {
            BossBattle.endBattle(true);
            return;
        }
        
        if (BossBattle.playerHP <= 0) {
            BossBattle.endBattle(false);
            return;
        }
        
        const question = BossBattle.questions[BossBattle.currentIndex];
        
        const questionArea = document.getElementById('boss-question-area');
        questionArea.innerHTML = `
            <div class="boss-question animate-in">
                <h3>${question.question}</h3>
                <div class="boss-options">
                    ${question.options.map((opt, i) => `
                        <button class="boss-option" onclick="BossBattle.answer(${i})" data-index="${i}">
                            <span class="boss-opt-key">${String.fromCharCode(65 + i)}</span>
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    answer: (index) => {
        if (!BossBattle.isPlaying) return;
        
        const question = BossBattle.questions[BossBattle.currentIndex];
        const isCorrect = index === question.answer;
        const boss = BossBattle.currentBoss;
        
        // Disable all options
        document.querySelectorAll('.boss-option').forEach((btn, i) => {
            btn.disabled = true;
            if (i === question.answer) btn.classList.add('correct');
            else if (i === index) btn.classList.add('wrong');
        });
        
        if (isCorrect) {
            BossBattle.combo++;
            
            // Calculate damage
            let damage = 15 + (BossBattle.combo * 2);
            if (BossBattle.criticalActive) {
                damage *= 2;
                BossBattle.criticalActive = false;
                BossBattle.addBattleLog('⚡ CRITICAL HIT!', 'critical');
            }
            
            BossBattle.bossHP -= damage;
            BossBattle.totalDamage += damage;
            
            BossBattle.addBattleLog(`You deal ${damage} damage! 💥`, 'player-attack');
            BossBattle.showDamageEffect('boss', damage);
            
            document.getElementById('combo-counter').textContent = `Combo: ${BossBattle.combo}x`;
            document.getElementById('combo-counter').classList.add('pulse');
            setTimeout(() => document.getElementById('combo-counter').classList.remove('pulse'), 300);
            
        } else {
            BossBattle.combo = 0;
            document.getElementById('combo-counter').textContent = 'Combo: 0x';
            
            // Boss attacks
            const attack = boss.attacks[Math.floor(Math.random() * boss.attacks.length)];
            let damage = boss.attack;
            
            if (BossBattle.hasShield) {
                damage = Math.floor(damage / 2);
                BossBattle.hasShield = false;
                BossBattle.addBattleLog(`🛡️ Shield absorbed half the damage!`, 'shield');
            }
            
            BossBattle.playerHP -= damage;
            
            BossBattle.addBattleLog(`${boss.icon} uses ${attack}! -${damage} HP`, 'boss-attack');
            BossBattle.showDamageEffect('player', damage);
        }
        
        BossBattle.updateHP();
        BossBattle.currentIndex++;
        
        // Check for battle end
        setTimeout(() => {
            if (BossBattle.bossHP <= 0) {
                BossBattle.endBattle(true);
            } else if (BossBattle.playerHP <= 0) {
                BossBattle.endBattle(false);
            } else {
                BossBattle.showQuestion();
            }
        }, 1500);
    },

    usePowerUp: (type) => {
        if (BossBattle.powerUps[type] <= 0) return;
        
        BossBattle.powerUps[type]--;
        
        switch (type) {
            case 'heal':
                const healAmount = 30;
                BossBattle.playerHP = Math.min(100, BossBattle.playerHP + healAmount);
                BossBattle.addBattleLog(`❤️ You healed ${healAmount} HP!`, 'heal');
                break;
            case 'shield':
                BossBattle.hasShield = true;
                BossBattle.addBattleLog(`🛡️ Shield activated! Next attack halved.`, 'shield');
                break;
            case 'critical':
                BossBattle.criticalActive = true;
                BossBattle.addBattleLog(`⚡ Critical hit ready! Next attack deals 2x damage!`, 'critical');
                break;
        }
        
        // Update buttons
        document.getElementById('pu-heal').innerHTML = `❤️ Heal (${BossBattle.powerUps.heal})`;
        document.getElementById('pu-shield').innerHTML = `🛡️ Shield (${BossBattle.powerUps.shield})`;
        document.getElementById('pu-critical').innerHTML = `⚡ Critical (${BossBattle.powerUps.critical})`;
        
        if (BossBattle.powerUps[type] <= 0) {
            document.getElementById(`pu-${type}`).classList.add('used');
        }
        
        BossBattle.updateHP();
    },

    showDamageEffect: (target, damage) => {
        const element = target === 'boss' ? document.getElementById('boss-avatar') : document.querySelector('.player-avatar');
        
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 300);
        
        // Floating damage number
        const dmgEl = document.createElement('div');
        dmgEl.className = `damage-number ${target}`;
        dmgEl.textContent = `-${damage}`;
        element.parentElement.appendChild(dmgEl);
        setTimeout(() => dmgEl.remove(), 1000);
    },

    updateHP: () => {
        const boss = BossBattle.currentBoss;
        
        const playerPercent = Math.max(0, BossBattle.playerHP);
        const bossPercent = Math.max(0, (BossBattle.bossHP / boss.hp) * 100);
        
        document.getElementById('player-hp').style.width = playerPercent + '%';
        document.getElementById('boss-hp').style.width = bossPercent + '%';
        
        document.getElementById('player-hp-text').textContent = `${Math.max(0, BossBattle.playerHP)}/100`;
        document.getElementById('boss-hp-text').textContent = `${Math.max(0, BossBattle.bossHP)}/${boss.hp}`;
        
        // Color changes for low HP
        if (BossBattle.playerHP <= 30) {
            document.getElementById('player-hp').classList.add('critical');
        }
        if (bossPercent <= 30) {
            document.getElementById('boss-hp').classList.add('critical');
        }
    },

    addBattleLog: (message, type) => {
        const log = document.getElementById('boss-battle-log');
        const entry = document.createElement('div');
        entry.className = `battle-log-entry ${type}`;
        entry.textContent = message;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
        
        // Keep only last 5 messages
        while (log.children.length > 5) {
            log.removeChild(log.firstChild);
        }
    },

    endBattle: (victory) => {
        BossBattle.isPlaying = false;
        const boss = BossBattle.currentBoss;
        if (!boss) {
            console.error('No boss found');
            BossBattle.close();
            return;
        }
        
        const isPerfect = BossBattle.playerHP === 100;
        
        // Save stats
        BossBattle.saveStats(victory, isPerfect);
        
        // Award XP
        let xpEarned = victory ? boss.reward : Math.floor(boss.reward * 0.2);
        if (isPerfect && victory) xpEarned *= 1.5;
        AppState?.addXP?.(Math.floor(xpEarned));
        
        // Achievements
        if (victory) {
            AppState?.unlockAchievement?.('boss_slayer');
            if (boss.id === 'final-boss') AppState?.unlockAchievement?.('champion');
        }
        if (isPerfect && victory) AppState?.unlockAchievement?.('flawless');
        
        const container = document.querySelector('.boss-container');
        if (!container) {
            console.error('Boss container not found');
            return;
        }
        
        container.innerHTML = `
            <button class="game-close-btn" onclick="BossBattle.close()">✕</button>
            
            <div class="boss-results ${victory ? 'victory' : 'defeat'}">
                <div class="boss-result-banner">
                    ${victory ? '🎉 VICTORY! 🎉' : '💀 DEFEATED 💀'}
                </div>
                
                <div class="boss-defeated-display">
                    <span class="boss-icon-large" style="background: ${boss.color}">${boss.icon}</span>
                    <span class="boss-name-large">${boss.name}</span>
                    ${victory ? '<span class="defeated-text">has been defeated!</span>' : '<span class="defeated-text">has won this time...</span>'}
                </div>
                
                ${isPerfect && victory ? '<div class="perfect-badge">⭐ PERFECT - No damage taken!</div>' : ''}
                
                <div class="boss-results-stats">
                    <div class="boss-result-stat">
                        <span class="brs-icon">💥</span>
                        <span class="brs-value">${BossBattle.totalDamage}</span>
                        <span class="brs-label">Damage Dealt</span>
                    </div>
                    <div class="boss-result-stat">
                        <span class="brs-icon">🔥</span>
                        <span class="brs-value">${BossBattle.combo}x</span>
                        <span class="brs-label">Best Combo</span>
                    </div>
                    <div class="boss-result-stat">
                        <span class="brs-icon">⭐</span>
                        <span class="brs-value">+${Math.floor(xpEarned)}</span>
                        <span class="brs-label">XP Earned</span>
                    </div>
                </div>
                
                <div class="boss-results-actions">
                    <button class="btn btn-primary" onclick="BossBattle.startBattle()">
                        🔄 ${victory ? 'Fight Again' : 'Try Again'}
                    </button>
                    <button class="btn btn-secondary" onclick="BossBattle.showMenu()">
                        Choose Boss
                    </button>
                </div>
            </div>
        `;
    },

    showMenu: () => {
        try {
            const container = document.querySelector('.boss-container');
            if (container) {
                // Re-render the menu content
                const menuHtml = BossBattle.renderMenu();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = menuHtml;
                const newContent = tempDiv.querySelector('.boss-container');
                if (newContent) {
                    container.innerHTML = newContent.innerHTML;
                }
            }
        } catch (error) {
            console.error('BossBattle.showMenu error:', error);
            BossBattle.close();
            BossBattle.open();
        }
    },

    saveStats: (victory, perfect) => {
        const stats = BossBattle.getStats();
        const boss = BossBattle.currentBoss;
        
        if (victory) {
            if (!stats.defeated) stats.defeated = [];
            if (!stats.defeated.includes(boss.id)) {
                stats.defeated.push(boss.id);
            }
            if (perfect) stats.perfectKills = (stats.perfectKills || 0) + 1;
        }
        
        stats.totalDamage = (stats.totalDamage || 0) + BossBattle.totalDamage;
        stats.battlesPlayed = (stats.battlesPlayed || 0) + 1;
        
        localStorage.setItem('csmaster_boss_stats', JSON.stringify(stats));
    },

    getStats: () => {
        return JSON.parse(localStorage.getItem('csmaster_boss_stats') || '{}');
    },

    cleanup: () => {
        // Remove keydown listener
        document.removeEventListener('keydown', BossBattle.keyHandler);
        // Stop game
        BossBattle.isPlaying = false;
        // Reset state
        BossBattle.questions = [];
        BossBattle.currentBoss = null;
        console.log('🐉 BossBattle cleanup');
    }
};

// Keyboard shortcuts handler (defined but not auto-registered)
BossBattle.keyHandler = (e) => {
    if (!BossBattle.isPlaying) return;
    
    const key = e.key.toUpperCase();
    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    
    if (keyMap.hasOwnProperty(key)) {
        e.preventDefault();
        BossBattle.answer(keyMap[key]);
    }
};
// Note: Keyboard handler is now registered in startBattle() and removed in cleanup()
