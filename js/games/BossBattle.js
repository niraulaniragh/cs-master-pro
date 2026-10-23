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
    maxBossHP: 100,
    questions: [],
    currentIndex: 0,
    combo: 0,
    maxCombo: 0,
    totalDamage: 0,
    difficulty: 1,
    powerUps: { heal: 2, shield: 1, critical: 2 },
    hasShield: false,
    criticalActive: false,
    bossPhase: 1, // For special moves at HP thresholds
    specialMoveUsed: { phase2: false, phase3: false },

    // Boss taunts
    bossTaunts: {
        entrance: [
            "You dare challenge me?!",
            "Another fool seeking defeat!",
            "Your knowledge ends here!",
            "Prepare to be schooled!"
        ],
        attack: [
            "Take THIS!",
            "Feel my power!",
            "You cannot escape!",
            "Pathetic attempt!"
        ],
        damaged: [
            "Lucky shot!",
            "You'll pay for that!",
            "Impossible!",
            "Is that all you've got?"
        ],
        lowHP: [
            "I won't lose to YOU!",
            "This isn't over!",
            "I'm just getting started!",
            "ENOUGH!"
        ],
        special: [
            "WITNESS TRUE POWER!",
            "BEHOLD MY ULTIMATE ATTACK!",
            "YOU CANNOT SURVIVE THIS!",
            "FEEL THE WRATH!"
        ]
    },

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
            attacks: ['Binary Blast', 'Hex Hammer', 'Bit Barrage'],
            specialMove: { name: 'OVERFLOW APOCALYPSE', damage: 35, effect: 'screen-glitch' }
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
            attacks: ['Sorting Storm', 'Search Strike', 'Loop Lightning'],
            specialMove: { name: 'INFINITE RECURSION', damage: 40, effect: 'fire-breath' }
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
            attacks: ['Packet Punch', 'Protocol Slash', 'Firewall Fury'],
            specialMove: { name: 'DDOS DEVASTATION', damage: 38, effect: 'shadow-clone' }
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
            attacks: ['CPU Crush', 'RAM Rush', 'Cache Crash'],
            specialMove: { name: 'THERMAL MELTDOWN', damage: 30, effect: 'earthquake' }
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
            attacks: ['Malware Maelstrom', 'Phishing Phantasm', 'Encryption Eclipse'],
            specialMove: { name: 'ZERO DAY STRIKE', damage: 45, effect: 'phase-shift' }
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
            attacks: ['Function Flood', 'Variable Vortex', 'Loop Leviathan'],
            specialMove: { name: 'SPAGHETTI CODE TSUNAMI', damage: 35, effect: 'tentacle-grab' }
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
            attacks: ['Query Quake', 'SQL Slash', 'Table Tornado'],
            specialMove: { name: 'DROP TABLE DOOM', damage: 42, effect: 'hellfire' }
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
            attacks: ['Exam Explosion', 'Mark Massacre', 'Grade Guillotine'],
            specialMove: { name: 'FINAL EXAMINATION', damage: 50, effect: 'ultimate-doom' }
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
            if (!pool || pool.length === 0) {
                Toast?.show?.('No questions available for this boss', 'error');
                return;
            }
            
            // Calculate difficulty based on boss defeats
            const stats = BossBattle.getStats();
            const defeatedCount = stats.defeated?.length || 0;
            BossBattle.difficulty = 1 + (defeatedCount * 0.15);
            
            // Scale boss HP and attack with difficulty
            const scaledHP = Math.floor(boss.hp * BossBattle.difficulty);
            const scaledAttack = Math.floor(boss.attack * (1 + (defeatedCount * 0.1)));
            
            BossBattle.questions = typeof shuffleArray === 'function' 
                ? shuffleArray([...pool]).slice(0, 15) 
                : [...pool].sort(() => Math.random() - 0.5).slice(0, 15);
            BossBattle.currentIndex = 0;
            BossBattle.playerHP = 100;
            BossBattle.bossHP = scaledHP;
            BossBattle.maxBossHP = scaledHP;
            BossBattle.combo = 0;
            BossBattle.maxCombo = 0;
            BossBattle.totalDamage = 0;
            BossBattle.powerUps = { heal: 2, shield: 1, critical: 2 };
            BossBattle.hasShield = false;
            BossBattle.criticalActive = false;
            BossBattle.isPlaying = true;
            BossBattle.scaledBossAttack = scaledAttack;
            BossBattle.bossPhase = 1;
            BossBattle.specialMoveUsed = { phase2: false, phase3: false };
            
            const container = document.querySelector('.boss-container');
            if (!container) {
                console.error('Boss container not found');
                return;
            }
            container.innerHTML = BossBattle.renderBattle();
            
            // Register keyboard handler
            document.removeEventListener('keydown', BossBattle.keyHandler);
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
        if (!boss) return '<div class="error">No boss selected</div>';
        
        const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser?.() : null;
        const username = user?.username || 'Hero';
        
        return `
            <div class="boss-battle-view" style="--boss-color: ${boss.color}">
                <div class="boss-arena">
                    <div class="boss-player player-side">
                        <div class="boss-avatar player-avatar" id="player-avatar">👤</div>
                        <div class="boss-name">${typeof Helpers !== 'undefined' ? Helpers.escapeHtml(username) : username}</div>
                        <div class="boss-hp-container" id="player-hp-container">
                            <div class="boss-hp-bar">
                                <div class="boss-hp-fill player-hp" id="player-hp"></div>
                            </div>
                            <span class="boss-hp-text" id="player-hp-text">100/100</span>
                        </div>
                        <div class="shield-indicator ${BossBattle.hasShield ? 'active' : ''}" id="shield-indicator">🛡️</div>
                        <div class="powerup-effect" id="player-powerup-effect"></div>
                    </div>
                    
                    <div class="boss-vs-indicator">
                        <span class="combo-counter" id="combo-counter">Combo: 0x</span>
                        ${BossBattle.difficulty > 1 ? `<span class="difficulty-badge">⚠️ ${Math.round((BossBattle.difficulty - 1) * 100)}% harder</span>` : ''}
                    </div>
                    
                    <div class="boss-player boss-side">
                        <div class="boss-avatar" id="boss-avatar" style="background: ${boss.color}">${boss.icon}</div>
                        <div class="boss-name">${boss.name}</div>
                        <div class="boss-hp-container" id="boss-hp-container">
                            <div class="boss-hp-bar">
                                <div class="boss-hp-fill boss-hp" id="boss-hp"></div>
                            </div>
                            <span class="boss-hp-text" id="boss-hp-text">${BossBattle.maxBossHP}/${BossBattle.maxBossHP}</span>
                        </div>
                        <div class="boss-taunt" id="boss-taunt"></div>
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

    // Get random taunt from category
    getTaunt: (category) => {
        const taunts = BossBattle.bossTaunts[category];
        return taunts[Math.floor(Math.random() * taunts.length)];
    },

    // Show boss taunt with animation
    showBossTaunt: (text) => {
        const tauntEl = document.getElementById('boss-taunt');
        if (!tauntEl) return;
        
        tauntEl.textContent = `"${text}"`;
        tauntEl.classList.add('show');
        
        setTimeout(() => {
            tauntEl.classList.remove('show');
        }, 2500);
    },

    // Boss attack animation
    playBossAttackAnimation: (attackName) => {
        const bossAvatar = document.getElementById('boss-avatar');
        const playerAvatar = document.getElementById('player-avatar');
        const arena = document.querySelector('.boss-arena');
        
        if (!bossAvatar || !arena) return;
        
        // Boss lunges forward
        bossAvatar.classList.add('attack-lunge');
        
        // Create attack effect
        const attackEffect = document.createElement('div');
        attackEffect.className = 'boss-attack-effect';
        attackEffect.innerHTML = `<span class="attack-name">${attackName}</span>`;
        arena.appendChild(attackEffect);
        
        setTimeout(() => {
            bossAvatar.classList.remove('attack-lunge');
            attackEffect.remove();
        }, 800);
        
        // Screen shake for impact
        setTimeout(() => {
            arena.classList.add('screen-shake');
            setTimeout(() => arena.classList.remove('screen-shake'), 300);
        }, 400);
    },

    // Player power-up visual effect
    showPowerUpEffect: (type) => {
        const effectEl = document.getElementById('player-powerup-effect');
        const playerAvatar = document.getElementById('player-avatar');
        if (!effectEl || !playerAvatar) return;
        
        const effects = {
            heal: { icon: '💚', color: '#22c55e', particles: '✨' },
            shield: { icon: '🛡️', color: '#3b82f6', particles: '⚡' },
            critical: { icon: '⚡', color: '#f59e0b', particles: '🔥' }
        };
        
        const effect = effects[type];
        
        // Glow effect on player
        playerAvatar.style.boxShadow = `0 0 30px ${effect.color}`;
        playerAvatar.classList.add('powerup-active');
        
        // Particle burst
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'powerup-particle';
            particle.textContent = effect.particles;
            particle.style.setProperty('--angle', `${i * 60}deg`);
            effectEl.appendChild(particle);
        }
        
        setTimeout(() => {
            playerAvatar.style.boxShadow = '';
            playerAvatar.classList.remove('powerup-active');
            effectEl.innerHTML = '';
        }, 1000);
    },

    // Health bar shake animation for low HP
    shakeHealthBar: (target) => {
        const containerId = target === 'player' ? 'player-hp-container' : 'boss-hp-container';
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.classList.add('hp-shake');
        setTimeout(() => container.classList.remove('hp-shake'), 500);
    },

    // Check and trigger boss special moves at HP thresholds
    checkBossPhase: () => {
        const boss = BossBattle.currentBoss;
        if (!boss || !boss.specialMove) return false;
        
        const hpPercent = (BossBattle.bossHP / BossBattle.maxBossHP) * 100;
        
        // Phase 2: Below 60% HP
        if (hpPercent <= 60 && hpPercent > 30 && !BossBattle.specialMoveUsed.phase2) {
            BossBattle.specialMoveUsed.phase2 = true;
            BossBattle.bossPhase = 2;
            return true;
        }
        
        // Phase 3: Below 30% HP
        if (hpPercent <= 30 && !BossBattle.specialMoveUsed.phase3) {
            BossBattle.specialMoveUsed.phase3 = true;
            BossBattle.bossPhase = 3;
            return true;
        }
        
        return false;
    },

    // Execute boss special move
    executeBossSpecialMove: (callback) => {
        const boss = BossBattle.currentBoss;
        if (!boss || !boss.specialMove) {
            callback?.();
            return;
        }
        
        const special = boss.specialMove;
        const arena = document.querySelector('.boss-arena');
        const bossAvatar = document.getElementById('boss-avatar');
        
        // Show warning
        BossBattle.showBossTaunt(BossBattle.getTaunt('special'));
        BossBattle.addBattleLog(`⚠️ ${boss.name} is charging a special attack!`, 'warning');
        
        // Charging animation
        bossAvatar?.classList.add('charging');
        
        setTimeout(() => {
            bossAvatar?.classList.remove('charging');
            
            // Execute special move
            BossBattle.addBattleLog(`💀 ${boss.icon} uses ${special.name}!!!`, 'special-attack');
            
            // Special effect based on type
            arena?.classList.add(`special-${special.effect}`);
            
            // Calculate damage (reduced if shield)
            let damage = special.damage;
            if (BossBattle.hasShield) {
                damage = Math.floor(damage / 2);
                BossBattle.hasShield = false;
                BossBattle.addBattleLog(`🛡️ Shield absorbed half the special attack!`, 'shield');
                const shieldIndicator = document.getElementById('shield-indicator');
                if (shieldIndicator) shieldIndicator.classList.remove('active');
            }
            
            BossBattle.playerHP = Math.max(0, BossBattle.playerHP - damage);
            BossBattle.showDamageEffect('player', damage);
            BossBattle.updateHP();
            
            setTimeout(() => {
                arena?.classList.remove(`special-${special.effect}`);
                callback?.();
            }, 1500);
            
        }, 1500);
    },

    showBossEntrance: () => {
        const boss = BossBattle.currentBoss;
        if (!boss) return;
        
        const bossAvatar = document.getElementById('boss-avatar');
        bossAvatar?.classList.add('dramatic-entrance');
        
        BossBattle.addBattleLog(`${boss.icon} ${boss.name} appears!`, 'entrance');
        
        setTimeout(() => {
            BossBattle.showBossTaunt(BossBattle.getTaunt('entrance'));
            BossBattle.addBattleLog(`"${boss.description}"`, 'boss-speak');
        }, 800);
        
        setTimeout(() => {
            if (!BossBattle.isPlaying) return;
            bossAvatar?.classList.remove('dramatic-entrance');
            BossBattle.addBattleLog('Battle Start! Answer questions to attack!', 'system');
            BossBattle.showQuestion();
        }, 2500);
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
        if (!question || !question.options) {
            console.error('Invalid question at index', BossBattle.currentIndex);
            BossBattle.currentIndex++;
            BossBattle.showQuestion();
            return;
        }
        
        const questionArea = document.getElementById('boss-question-area');
        if (!questionArea) return;
        
        // Shuffle answer options using Helpers if available
        const shuffled = typeof Helpers !== 'undefined' && Helpers.shuffleOptions 
            ? Helpers.shuffleOptions(question)
            : { options: question.options, correctIndex: question.answer };
        
        questionArea.innerHTML = `
            <div class="boss-question animate-in">
                <h3>${question.question}</h3>
                <div class="boss-options">
                    ${shuffled.options.map((opt, i) => `
                        <button class="boss-option" onclick="BossBattle.answer(${i}, ${shuffled.correctIndex})" data-index="${i}">
                            <span class="boss-opt-key">${String.fromCharCode(65 + i)}</span>
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    answer: (index, correctIndex) => {
        if (!BossBattle.isPlaying) return;
        
        const question = BossBattle.questions[BossBattle.currentIndex];
        if (!question) return;
        
        // Use correctIndex if provided (from shuffled), otherwise use original
        const correctAnswer = correctIndex !== undefined ? correctIndex : question.answer;
        const isCorrect = index === correctAnswer;
        const boss = BossBattle.currentBoss;
        if (!boss) return;
        
        // Disable all options
        document.querySelectorAll('.boss-option').forEach((btn, i) => {
            btn.disabled = true;
            if (i === correctAnswer) btn.classList.add('correct');
            else if (i === index) btn.classList.add('wrong');
        });
        
        if (isCorrect) {
            BossBattle.combo++;
            BossBattle.maxCombo = Math.max(BossBattle.maxCombo, BossBattle.combo);
            
            // Calculate damage with combo bonus
            let damage = 15 + (BossBattle.combo * 3);
            if (BossBattle.criticalActive) {
                damage *= 2;
                BossBattle.criticalActive = false;
                BossBattle.addBattleLog('⚡ CRITICAL HIT!', 'critical');
                
                // Critical hit visual
                const playerAvatar = document.getElementById('player-avatar');
                playerAvatar?.classList.add('critical-strike');
                setTimeout(() => playerAvatar?.classList.remove('critical-strike'), 500);
            }
            
            const prevHP = BossBattle.bossHP;
            BossBattle.bossHP = Math.max(0, BossBattle.bossHP - damage);
            BossBattle.totalDamage += damage;
            
            BossBattle.addBattleLog(`You deal ${damage} damage! 💥`, 'player-attack');
            BossBattle.showDamageEffect('boss', damage);
            
            // Boss damaged taunt
            if (damage >= 25) {
                BossBattle.showBossTaunt(BossBattle.getTaunt('damaged'));
            }
            
            const comboCounter = document.getElementById('combo-counter');
            if (comboCounter) {
                comboCounter.textContent = `Combo: ${BossBattle.combo}x`;
                comboCounter.classList.add('pulse');
                setTimeout(() => comboCounter.classList.remove('pulse'), 300);
            }
            
            // Check for phase transition (special move)
            const triggerSpecial = BossBattle.checkBossPhase();
            
            BossBattle.updateHP();
            BossBattle.currentIndex++;
            
            if (triggerSpecial && BossBattle.bossHP > 0) {
                // Boss uses special move before next question
                setTimeout(() => {
                    if (!BossBattle.isPlaying) return;
                    BossBattle.executeBossSpecialMove(() => {
                        if (BossBattle.playerHP <= 0) {
                            BossBattle.endBattle(false);
                        } else if (BossBattle.bossHP <= 0) {
                            BossBattle.endBattle(true);
                        } else {
                            BossBattle.showQuestion();
                        }
                    });
                }, 1000);
            } else {
                setTimeout(() => {
                    if (!BossBattle.isPlaying) return;
                    if (BossBattle.bossHP <= 0) {
                        BossBattle.endBattle(true);
                    } else {
                        BossBattle.showQuestion();
                    }
                }, 1500);
            }
            
        } else {
            BossBattle.combo = 0;
            const comboCounter = document.getElementById('combo-counter');
            if (comboCounter) comboCounter.textContent = 'Combo: 0x';
            
            // Boss attacks with animation
            const attack = boss.attacks[Math.floor(Math.random() * boss.attacks.length)];
            let damage = BossBattle.scaledBossAttack || boss.attack;
            
            // Show boss attack animation
            BossBattle.playBossAttackAnimation(attack);
            BossBattle.showBossTaunt(BossBattle.getTaunt('attack'));
            
            if (BossBattle.hasShield) {
                damage = Math.floor(damage / 2);
                BossBattle.hasShield = false;
                BossBattle.addBattleLog(`🛡️ Shield absorbed half the damage!`, 'shield');
                const shieldIndicator = document.getElementById('shield-indicator');
                if (shieldIndicator) shieldIndicator.classList.remove('active');
            }
            
            BossBattle.playerHP = Math.max(0, BossBattle.playerHP - damage);
            
            BossBattle.addBattleLog(`${boss.icon} uses ${attack}! -${damage} HP`, 'boss-attack');
            BossBattle.showDamageEffect('player', damage);
            
            BossBattle.updateHP();
            BossBattle.currentIndex++;
            
            // Check for low HP taunt
            if (BossBattle.playerHP <= 30 && BossBattle.playerHP > 0) {
                setTimeout(() => {
                    BossBattle.showBossTaunt(BossBattle.getTaunt('lowHP'));
                }, 500);
            }
            
            setTimeout(() => {
                if (!BossBattle.isPlaying) return;
                if (BossBattle.playerHP <= 0) {
                    BossBattle.endBattle(false);
                } else {
                    BossBattle.showQuestion();
                }
            }, 1500);
        }
    },

    usePowerUp: (type) => {
        if (BossBattle.powerUps[type] <= 0) return;
        
        BossBattle.powerUps[type]--;
        BossBattle.showPowerUpEffect(type);
        
        switch (type) {
            case 'heal':
                const healAmount = 30;
                BossBattle.playerHP = Math.min(100, BossBattle.playerHP + healAmount);
                BossBattle.addBattleLog(`❤️ You healed ${healAmount} HP!`, 'heal');
                break;
            case 'shield':
                BossBattle.hasShield = true;
                BossBattle.addBattleLog(`🛡️ Shield activated! Next attack halved.`, 'shield');
                const shieldIndicator = document.getElementById('shield-indicator');
                if (shieldIndicator) shieldIndicator.classList.add('active');
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
        const element = target === 'boss' ? document.getElementById('boss-avatar') : document.getElementById('player-avatar');
        if (!element) return;
        
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
        if (!boss) return;
        
        const playerPercent = Math.max(0, BossBattle.playerHP);
        const bossPercent = Math.max(0, (BossBattle.bossHP / BossBattle.maxBossHP) * 100);
        
        const playerHPBar = document.getElementById('player-hp');
        const bossHPBar = document.getElementById('boss-hp');
        
        if (playerHPBar) playerHPBar.style.width = playerPercent + '%';
        if (bossHPBar) bossHPBar.style.width = bossPercent + '%';
        
        const playerHPText = document.getElementById('player-hp-text');
        const bossHPText = document.getElementById('boss-hp-text');
        
        if (playerHPText) playerHPText.textContent = `${Math.max(0, BossBattle.playerHP)}/100`;
        if (bossHPText) bossHPText.textContent = `${Math.max(0, BossBattle.bossHP)}/${BossBattle.maxBossHP}`;
        
        // Low HP effects - shake and critical styling
        if (BossBattle.playerHP <= 30) {
            if (playerHPBar) playerHPBar.classList.add('critical');
            BossBattle.shakeHealthBar('player');
        }
        if (bossPercent <= 30) {
            if (bossHPBar) bossHPBar.classList.add('critical');
            BossBattle.shakeHealthBar('boss');
        }
    },

    addBattleLog: (message, type) => {
        const log = document.getElementById('boss-battle-log');
        if (!log) return;
        
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

    // Victory cutscene
    showVictoryCutscene: (callback) => {
        const boss = BossBattle.currentBoss;
        const container = document.querySelector('.boss-battle-view');
        if (!container || !boss) {
            callback?.();
            return;
        }
        
        // Dim the arena
        container.classList.add('cutscene-active');
        
        // Create cutscene overlay
        const cutscene = document.createElement('div');
        cutscene.className = 'cutscene victory-cutscene';
        cutscene.innerHTML = `
            <div class="cutscene-content">
                <div class="cutscene-boss defeated-boss">${boss.icon}</div>
                <div class="cutscene-explosion">💥</div>
                <div class="cutscene-text">
                    <div class="victory-text">VICTORY!</div>
                    <div class="boss-defeated-text">${boss.name} has been defeated!</div>
                </div>
                <div class="cutscene-particles"></div>
            </div>
        `;
        container.appendChild(cutscene);
        
        // Add particles
        const particleContainer = cutscene.querySelector('.cutscene-particles');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'victory-particle';
            particle.textContent = ['⭐', '✨', '🎉', '🏆'][Math.floor(Math.random() * 4)];
            particle.style.setProperty('--x', `${Math.random() * 100}%`);
            particle.style.setProperty('--delay', `${Math.random() * 0.5}s`);
            particleContainer.appendChild(particle);
        }
        
        setTimeout(() => {
            cutscene.remove();
            container.classList.remove('cutscene-active');
            callback?.();
        }, 3000);
    },

    // Defeat cutscene
    showDefeatCutscene: (callback) => {
        const boss = BossBattle.currentBoss;
        const container = document.querySelector('.boss-battle-view');
        if (!container || !boss) {
            callback?.();
            return;
        }
        
        container.classList.add('cutscene-active');
        
        const cutscene = document.createElement('div');
        cutscene.className = 'cutscene defeat-cutscene';
        cutscene.innerHTML = `
            <div class="cutscene-content">
                <div class="cutscene-boss triumphant-boss">${boss.icon}</div>
                <div class="defeat-overlay"></div>
                <div class="cutscene-text">
                    <div class="defeat-text">DEFEATED</div>
                    <div class="boss-wins-text">${boss.name} was too powerful...</div>
                    <div class="try-again-text">Study more and try again!</div>
                </div>
            </div>
        `;
        container.appendChild(cutscene);
        
        setTimeout(() => {
            cutscene.remove();
            container.classList.remove('cutscene-active');
            callback?.();
        }, 3000);
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
        
        // Show cutscene then results
        const showResults = () => {
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
                            <span class="brs-value">${BossBattle.maxCombo}x</span>
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
        };
        
        // Play appropriate cutscene
        if (victory) {
            BossBattle.showVictoryCutscene(showResults);
        } else {
            BossBattle.showDefeatCutscene(showResults);
        }
    },

    showMenu: () => {
        try {
            const container = document.querySelector('.boss-container');
            if (container) {
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
        document.removeEventListener('keydown', BossBattle.keyHandler);
        BossBattle.isPlaying = false;
        BossBattle.questions = [];
        BossBattle.currentBoss = null;
        console.log('🐉 BossBattle cleanup');
    }
};

// Keyboard shortcuts handler
BossBattle.keyHandler = (e) => {
    if (!BossBattle.isPlaying) return;
    
    const key = e.key.toUpperCase();
    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    
    if (keyMap.hasOwnProperty(key)) {
        e.preventDefault();
        // Get correct index from the currently displayed button
        const btn = document.querySelector(`.boss-option[data-index="${keyMap[key]}"]`);
        if (btn && !btn.disabled) {
            btn.click();
        }
    }
};

// Inject epic CSS animations
const epicBossStyles = document.createElement('style');
epicBossStyles.textContent = `
    /* Boss Attack Animation */
    .attack-lunge {
        animation: attackLunge 0.8s ease-out;
    }
    @keyframes attackLunge {
        0% { transform: translateX(0) scale(1); }
        30% { transform: translateX(-50px) scale(1.2); }
        60% { transform: translateX(-100px) scale(1.3); }
        100% { transform: translateX(0) scale(1); }
    }
    
    .boss-attack-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        animation: attackEffect 0.8s ease-out forwards;
    }
    .attack-name {
        font-size: 1.5rem;
        font-weight: bold;
        color: #ef4444;
        text-shadow: 0 0 20px #ef4444, 0 0 40px #ef4444;
        animation: flashText 0.2s ease infinite;
    }
    @keyframes attackEffect {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
    }
    @keyframes flashText {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    /* Screen Shake */
    .screen-shake {
        animation: screenShake 0.3s ease;
    }
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
    }
    
    /* Boss Taunt */
    .boss-taunt {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: #fff;
        padding: 8px 16px;
        border-radius: 8px;
        font-style: italic;
        opacity: 0;
        transition: all 0.3s ease;
        white-space: nowrap;
        z-index: 10;
    }
    .boss-taunt.show {
        opacity: 1;
        animation: tauntBounce 0.3s ease;
    }
    @keyframes tauntBounce {
        0% { transform: translateX(-50%) scale(0.8); }
        50% { transform: translateX(-50%) scale(1.1); }
        100% { transform: translateX(-50%) scale(1); }
    }
    
    /* Power-up Effects */
    .powerup-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
    .powerup-particle {
        position: absolute;
        font-size: 1.5rem;
        animation: particleBurst 1s ease-out forwards;
    }
    @keyframes particleBurst {
        0% { 
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-80px);
            opacity: 0;
        }
    }
    .powerup-active {
        animation: powerupGlow 0.5s ease infinite;
    }
    @keyframes powerupGlow {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.3); }
    }
    
    /* HP Bar Shake */
    .hp-shake {
        animation: hpShake 0.5s ease;
    }
    @keyframes hpShake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-3px); }
        20% { transform: translateX(3px); }
        30% { transform: translateX(-3px); }
        40% { transform: translateX(3px); }
        50% { transform: translateX(-2px); }
        60% { transform: translateX(2px); }
        70% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
    }
    
    /* Critical Strike */
    .critical-strike {
        animation: criticalStrike 0.5s ease;
    }
    @keyframes criticalStrike {
        0% { transform: scale(1); filter: brightness(1); }
        25% { transform: scale(1.3); filter: brightness(2) hue-rotate(30deg); }
        50% { transform: scale(1.1); filter: brightness(1.5); }
        100% { transform: scale(1); filter: brightness(1); }
    }
    
    /* Boss Charging */
    .charging {
        animation: bossCharging 1.5s ease infinite;
    }
    @keyframes bossCharging {
        0% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(1.2); filter: brightness(1.5) saturate(2); box-shadow: 0 0 50px var(--boss-color); }
        100% { transform: scale(1); filter: brightness(1); }
    }
    
    /* Dramatic Entrance */
    .dramatic-entrance {
        animation: dramaticEntrance 1.5s ease;
    }
    @keyframes dramaticEntrance {
        0% { transform: scale(0) rotate(-180deg); opacity: 0; }
        50% { transform: scale(1.5) rotate(0deg); opacity: 1; }
        75% { transform: scale(0.9); }
        100% { transform: scale(1); }
    }
    
    /* Special Move Effects */
    .special-screen-glitch {
        animation: screenGlitch 1.5s ease;
    }
    @keyframes screenGlitch {
        0%, 100% { filter: none; }
        10% { filter: hue-rotate(90deg); transform: skewX(5deg); }
        20% { filter: hue-rotate(180deg); transform: skewX(-5deg); }
        30% { filter: invert(1); }
        40% { filter: hue-rotate(270deg); transform: skewX(3deg); }
        50% { filter: saturate(3); }
    }
    
    .special-fire-breath {
        animation: fireBreath 1.5s ease;
        background: linear-gradient(transparent, rgba(255,100,0,0.3));
    }
    @keyframes fireBreath {
        0%, 100% { background: transparent; }
        50% { background: linear-gradient(transparent, rgba(255,100,0,0.5)); }
    }
    
    .special-earthquake {
        animation: earthquake 1.5s ease;
    }
    @keyframes earthquake {
        0%, 100% { transform: translateY(0); }
        10% { transform: translateY(-5px) translateX(-3px); }
        20% { transform: translateY(5px) translateX(3px); }
        30% { transform: translateY(-5px) translateX(3px); }
        40% { transform: translateY(5px) translateX(-3px); }
        50% { transform: translateY(-3px); }
    }
    
    .special-phase-shift {
        animation: phaseShift 1.5s ease;
    }
    @keyframes phaseShift {
        0%, 100% { opacity: 1; }
        25% { opacity: 0.3; filter: blur(5px); }
        50% { opacity: 0.8; filter: blur(0); }
        75% { opacity: 0.3; filter: blur(5px); }
    }
    
    .special-shadow-clone, .special-tentacle-grab, .special-hellfire, .special-ultimate-doom {
        animation: ultimateAttack 1.5s ease;
    }
    @keyframes ultimateAttack {
        0% { filter: brightness(1); }
        25% { filter: brightness(0.3); }
        50% { filter: brightness(2) saturate(2); }
        75% { filter: brightness(0.5); }
        100% { filter: brightness(1); }
    }
    
    /* Cutscene Styles */
    .cutscene-active {
        filter: brightness(0.5);
    }
    .cutscene {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        pointer-events: none;
    }
    .cutscene-content {
        text-align: center;
        position: relative;
    }
    
    /* Victory Cutscene */
    .victory-cutscene .cutscene-boss {
        font-size: 5rem;
        animation: bossDefeat 1s ease forwards;
    }
    @keyframes bossDefeat {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5) rotate(10deg); opacity: 1; }
        100% { transform: scale(0) rotate(180deg); opacity: 0; }
    }
    .cutscene-explosion {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 8rem;
        animation: explosion 1s ease forwards;
        animation-delay: 0.5s;
        opacity: 0;
    }
    @keyframes explosion {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }
    .victory-text {
        font-size: 3rem;
        font-weight: bold;
        color: #fbbf24;
        text-shadow: 0 0 30px #fbbf24;
        animation: victoryText 0.5s ease forwards;
        animation-delay: 1s;
        opacity: 0;
    }
    @keyframes victoryText {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); opacity: 1; }
    }
    .boss-defeated-text {
        font-size: 1.2rem;
        color: #fff;
        animation: fadeIn 0.5s ease forwards;
        animation-delay: 1.5s;
        opacity: 0;
    }
    .victory-particle {
        position: absolute;
        font-size: 1.5rem;
        left: var(--x);
        animation: confetti 2s ease forwards;
        animation-delay: var(--delay);
    }
    @keyframes confetti {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
    }
    
    /* Defeat Cutscene */
    .defeat-cutscene .cutscene-boss {
        font-size: 5rem;
        animation: bossTriumph 2s ease infinite;
    }
    @keyframes bossTriumph {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    .defeat-overlay {
        position: absolute;
        top: -100px;
        left: -100px;
        right: -100px;
        bottom: -100px;
        background: radial-gradient(transparent, rgba(0,0,0,0.8));
        animation: defeatDarken 1s ease forwards;
    }
    @keyframes defeatDarken {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    .defeat-text {
        font-size: 3rem;
        font-weight: bold;
        color: #ef4444;
        text-shadow: 0 0 30px #ef4444;
        animation: defeatText 0.5s ease forwards;
        animation-delay: 0.5s;
        opacity: 0;
    }
    @keyframes defeatText {
        0% { transform: translateY(-20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
    }
    .boss-wins-text, .try-again-text {
        color: #fff;
        animation: fadeIn 0.5s ease forwards;
        opacity: 0;
    }
    .boss-wins-text { animation-delay: 1s; }
    .try-again-text { animation-delay: 1.5s; font-size: 0.9rem; color: #9ca3af; margin-top: 10px; }
    
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    /* Battle Log Entry Animations */
    .battle-log-entry.special-attack {
        color: #ef4444;
        font-weight: bold;
        animation: specialLogEntry 0.5s ease;
    }
    .battle-log-entry.warning {
        color: #f59e0b;
        font-weight: bold;
        animation: warningPulse 0.5s ease infinite;
    }
    @keyframes specialLogEntry {
        0% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    @keyframes warningPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
`;
document.head.appendChild(epicBossStyles);
