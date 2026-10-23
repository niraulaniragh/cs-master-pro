/**
 * GamesView.js - Games Hub
 * Central hub for all competitive theory games
 */

const GamesView = {
    render: () => {
        try {
            const games = [
                {
                    id: 'speed-run',
                    name: 'Speed Run',
                    icon: '⚡',
                    color: '#f59e0b',
                    description: 'Race against the clock! Answer as many questions as you can in 60 seconds.',
                    features: ['Combo multipliers', 'Speed bonuses', 'Global leaderboard'],
                    action: 'SpeedRun.open()',
                    difficulty: 'Medium'
                },
                {
                    id: 'battle-mode',
                    name: 'Battle Mode',
                    icon: '⚔️',
                    color: '#ef4444',
                    description: 'Challenge AI opponents in strategic 1v1 knowledge battles.',
                    features: ['4 difficulty levels', 'Power-ups', 'HP battles'],
                    action: 'BattleMode.open()',
                    difficulty: 'Variable'
                },
                {
                    id: 'memory-match',
                    name: 'Memory Match',
                    icon: '🃏',
                    color: '#8b5cf6',
                    description: 'Test your memory by matching CS terms with their definitions.',
                    features: ['Timer challenge', 'Multiple difficulties', 'Best scores'],
                    action: 'MemoryMatch.open()',
                    difficulty: 'Easy-Hard'
                },
                {
                    id: 'type-racer',
                    name: 'Type Racer',
                    icon: '⌨️',
                    color: '#06b6d4',
                    description: 'Boost your typing speed with code snippets and definitions.',
                    features: ['WPM tracking', 'Accuracy stats', 'Code & definitions'],
                    action: 'TypeRacer.open()',
                    difficulty: 'Medium'
                },
                {
                    id: 'millionaire',
                    name: 'Who Wants to Be a CS Master?',
                    icon: '💰',
                    color: '#3b82f6',
                    description: 'Answer 15 escalating questions to win 1,000,000 XP! Use lifelines wisely.',
                    features: ['Lifelines', 'Safe havens', 'Escalating difficulty'],
                    action: 'Millionaire.open()',
                    difficulty: 'Hard'
                },
                {
                    id: 'fill-code',
                    name: 'Fill in the Code',
                    icon: '📝',
                    color: '#14b8a6',
                    description: 'Complete code snippets by filling in the missing pieces.',
                    features: ['Pseudocode & Python', 'Word bank', 'Hints available'],
                    action: 'FillCode.open()',
                    difficulty: 'Medium'
                },
                {
                    id: 'boss-battle',
                    name: 'Boss Battles',
                    icon: '🐉',
                    color: '#059669',
                    description: 'Face off against legendary topic bosses in epic knowledge showdowns!',
                    features: ['8 unique bosses', 'Power-ups', 'Epic rewards'],
                    action: 'BossBattle.open()',
                    difficulty: 'Hard'
                },
                {
                    id: 'gold-quest',
                    name: 'Gold Quest',
                    icon: '⛏️',
                    color: '#fbbf24',
                    description: 'Mine for treasure by answering questions. Upgrade your gear!',
                    features: ['Upgradeable equipment', 'Streak bonuses', 'Gem discoveries'],
                    action: 'GoldQuest.open()',
                    difficulty: 'Medium'
                },
                {
                    id: 'factory',
                    name: 'Code Factory',
                    icon: '🏭',
                    color: '#64748b',
                    description: 'Build and manage a factory powered by your CS knowledge.',
                    features: ['Hire workers', 'Upgrade machines', 'Production bonuses'],
                    action: 'Factory.open()',
                    difficulty: 'Medium'
                },
                {
                    id: 'tower-defense',
                    name: 'Tower Defense',
                    icon: '🏰',
                    color: '#1e40af',
                    description: 'Defend your system from waves of bugs and viruses!',
                    features: ['Build towers', 'Wave system', 'Boss battles'],
                    action: 'TowerDefense.open()',
                    difficulty: 'Hard'
                },
                {
                    id: 'daily-challenge',
                    name: 'Daily Challenge',
                    icon: '📅',
                    color: '#10b981',
                    description: 'Complete 5 daily questions to build your streak and earn bonuses!',
                    features: ['Streak rewards', 'Perfect bonuses', 'Daily reset'],
                    action: 'DailyChallenge.start()',
                    difficulty: 'Easy'
                }
            ];

            return `
                <div class="games-view">
                    <div class="games-header">
                        <div class="games-hero">
                            <h1>🎮 Games Hub</h1>
                            <p>Compete, learn, and have fun with our theory games!</p>
                        </div>
                        
                        <div class="games-quick-stats">
                            <div class="gqs-stat">
                                <span class="gqs-value">${GamesView.getTotalGamesPlayed()}</span>
                                <span class="gqs-label">Games Played</span>
                            </div>
                            <div class="gqs-stat">
                                <span class="gqs-value">${GamesView.getTotalXPFromGames().toLocaleString()}</span>
                                <span class="gqs-label">XP from Games</span>
                            </div>
                            <div class="gqs-stat">
                                <span class="gqs-value">${GamesView.getAchievementsCount()}</span>
                                <span class="gqs-label">Achievements</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="games-grid">
                        ${games.map(game => GamesView.renderGameCard(game)).join('')}
                    </div>
                    
                    <div class="games-leaderboard-section">
                        <h2>🏆 Top Players This Week</h2>
                        <div class="games-leaderboard">
                            ${GamesView.renderMiniLeaderboard()}
                        </div>
                    </div>
                    
                    <div class="games-achievements-section">
                        <h2>🏅 Game Achievements</h2>
                        <div class="games-achievements">
                            ${GamesView.renderGameAchievements()}
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('GamesView render error:', error);
            return `
                <div class="games-view">
                    <div class="error-state">
                        <span class="error-icon">⚠️</span>
                        <h2>Unable to load Games</h2>
                        <p>Please try refreshing the page.</p>
                        <button class="btn btn-primary" onclick="location.reload()">Refresh</button>
                    </div>
                </div>
            `;
        }
    },

    /**
     * Render a single game card
     */
    renderGameCard: (game) => {
        const difficultyClass = game.difficulty.toLowerCase().replace(/[^a-z]/g, '');
        return `
            <div class="game-card" style="--game-color: ${game.color}">
                <div class="game-card-header">
                    <span class="game-card-icon">${game.icon}</span>
                    <span class="game-difficulty ${difficultyClass}">${game.difficulty}</span>
                </div>
                <h3 class="game-card-title">${game.name}</h3>
                <p class="game-card-desc">${game.description}</p>
                <ul class="game-card-features">
                    ${game.features.map(f => `<li>✓ ${f}</li>`).join('')}
                </ul>
                <button class="btn btn-primary game-play-btn" onclick="GamesView.launchGame('${game.id}', '${game.action}')">
                    Play Now
                </button>
            </div>
        `;
    },

    init: () => {
        console.log('🎮 Games view initialized');
    },

    cleanup: () => {
        // Cleanup resources if needed
    },
    
    /**
     * Launch a game with guest limit checking
     */
    launchGame: (gameId, gameAction) => {
        // Check guest limits
        if (typeof GuestLimiter !== 'undefined') {
            const canPlay = GuestLimiter.canPlayGame(gameId);
            if (!canPlay.allowed) {
                GuestLimiter.showSignupPrompt(canPlay.reason, 'games');
                return;
            }
            GuestLimiter.recordGame(gameId);
        }
        
        // Game module lookup (avoid eval for CSP compliance)
        const gameModules = {
            'SpeedRun': typeof SpeedRun !== 'undefined' ? SpeedRun : null,
            'BattleMode': typeof BattleMode !== 'undefined' ? BattleMode : null,
            'MemoryMatch': typeof MemoryMatch !== 'undefined' ? MemoryMatch : null,
            'TypeRacer': typeof TypeRacer !== 'undefined' ? TypeRacer : null,
            'Millionaire': typeof Millionaire !== 'undefined' ? Millionaire : null,
            'FillCode': typeof FillCode !== 'undefined' ? FillCode : null,
            'BossBattle': typeof BossBattle !== 'undefined' ? BossBattle : null,
            'GoldQuest': typeof GoldQuest !== 'undefined' ? GoldQuest : null,
            'Factory': typeof Factory !== 'undefined' ? Factory : null,
            'TowerDefense': typeof TowerDefense !== 'undefined' ? TowerDefense : null,
            'DailyChallenge': typeof DailyChallenge !== 'undefined' ? DailyChallenge : null
        };
        
        // Parse action string (e.g., "SpeedRun.open()")
        const match = gameAction.match(/^(\w+)\.(\w+)\(\)$/);
        if (!match) {
            console.error('Invalid game action format:', gameAction);
            return;
        }
        
        const [, moduleName, methodName] = match;
        const gameModule = gameModules[moduleName];
        
        if (!gameModule) {
            console.error('Game module not found:', moduleName);
            if (typeof Toast !== 'undefined') {
                Toast.show('Game not available. Please refresh the page.', 'error');
            }
            return;
        }
        
        if (typeof gameModule[methodName] !== 'function') {
            console.error('Game method not found:', methodName);
            if (typeof Toast !== 'undefined') {
                Toast.show('Failed to launch game. Please try again.', 'error');
            }
            return;
        }
        
        // Launch the game
        try {
            gameModule[methodName]();
        } catch (e) {
            console.error('Failed to launch game:', gameId, e);
            if (typeof Toast !== 'undefined') {
                Toast.show('Failed to launch game. Please try again.', 'error');
            }
        }
    },

    /**
     * Get current username safely
     */
    getUsername: () => {
        try {
            if (typeof Auth !== 'undefined' && Auth.getCurrentUser) {
                return Auth.getCurrentUser()?.username || 'Guest';
            }
        } catch (e) {
            // Ignore
        }
        return 'Guest';
    },

    /**
     * Safely parse JSON from localStorage
     */
    safeParseJSON: (key, fallback = {}) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            return fallback;
        }
    },

    getTotalGamesPlayed: () => {
        try {
            let total = 0;
            const username = GamesView.getUsername();
            
            // Speed Run
            const srStats = GamesView.safeParseJSON(`csmaster_speedrun_pb_${username}`);
            total += parseInt(srStats.gamesPlayed) || 0;
            
            // Battle Mode
            const battleStats = GamesView.safeParseJSON('csmaster_battle_stats');
            total += parseInt(battleStats.totalGames) || 0;
            
            // Millionaire
            const millStats = GamesView.safeParseJSON('csmaster_millionaire_stats');
            total += parseInt(millStats.gamesPlayed) || 0;
            
            // Type Racer
            const trStats = GamesView.safeParseJSON('csmaster_typeracer_stats');
            total += parseInt(trStats.racesCompleted) || 0;
            
            // Boss Battle
            const bossStats = GamesView.safeParseJSON('csmaster_boss_stats');
            total += parseInt(bossStats.battlesPlayed) || 0;
            
            return total;
        } catch (error) {
            console.error('Error getting games played:', error);
            return 0;
        }
    },

    getTotalXPFromGames: () => {
        try {
            let total = 0;
            const username = GamesView.getUsername();
            
            // Millionaire XP
            const millStats = GamesView.safeParseJSON('csmaster_millionaire_stats');
            total += parseInt(millStats.totalXP) || 0;
            
            // Speed Run XP (estimate from leaderboard scores)
            const srLB = GamesView.safeParseJSON('csmaster_speedrun_lb', []);
            if (Array.isArray(srLB)) {
                const userScores = srLB.filter(s => s?.username === username);
                total += userScores.reduce((sum, s) => sum + Math.floor((parseInt(s?.score) || 0) / 10), 0);
            }
            
            return total;
        } catch (error) {
            console.error('Error getting XP from games:', error);
            return 0;
        }
    },

    getAchievementsCount: () => {
        try {
            const gameAchievements = [
                'speed_demon', 'speed_master', 'battle_veteran', 'undefeated',
                'speed_typist', 'perfect_accuracy', 'millionaire', 'quiz_master',
                'boss_slayer', 'champion', 'flawless'
            ];
            
            if (typeof AppState === 'undefined') return 0;
            
            const user = AppState.getState('user');
            const unlocked = Array.isArray(user?.achievements) ? user.achievements : [];
            return gameAchievements.filter(a => unlocked.includes(a)).length;
        } catch (e) {
            console.error('Error getting achievements count:', e);
            return 0;
        }
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml: (str) => {
        if (typeof Helpers !== 'undefined' && Helpers.escapeHtml) {
            return Helpers.escapeHtml(str);
        }
        const htmlEntities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return String(str).replace(/[&<>"']/g, m => htmlEntities[m]);
    },

    renderMiniLeaderboard: () => {
        try {
            const srLB = GamesView.safeParseJSON('csmaster_speedrun_lb', []);
            const top5 = Array.isArray(srLB) ? srLB.slice(0, 5) : [];
            
            if (top5.length === 0) {
                return '<p class="no-data">No scores yet. Be the first to play!</p>';
            }
            
            const medals = ['🥇', '🥈', '🥉'];
            
            return `
                <table class="mini-lb-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Score</th>
                            <th>Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${top5.map((entry, i) => `
                            <tr>
                                <td>${medals[i] || (i + 1)}</td>
                                <td>${GamesView.escapeHtml(entry?.username || 'Anonymous')}</td>
                                <td>${(parseInt(entry?.score) || 0).toLocaleString()}</td>
                                <td>Speed Run</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } catch (error) {
            console.error('Error rendering leaderboard:', error);
            return '<p class="no-data">Could not load leaderboard</p>';
        }
    },

    renderGameAchievements: () => {
        // Game-related achievement IDs
        const gameAchievementIds = [
            'speed_demon', 'speed_master', 'battle_veteran', 'undefeated',
            'speed_typist', 'perfect_accuracy', 'millionaire', 'quiz_master',
            'boss_slayer', 'champion', 'flawless'
        ];
        
        // Get achievements from global ACHIEVEMENTS constant
        let achievements = [];
        if (typeof ACHIEVEMENTS !== 'undefined' && Array.isArray(ACHIEVEMENTS)) {
            achievements = ACHIEVEMENTS.filter(a => gameAchievementIds.includes(a.id));
        }
        
        // Fallback if ACHIEVEMENTS not available
        if (achievements.length === 0) {
            achievements = [
                { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', description: '10x combo in Speed Run' },
                { id: 'speed_master', name: 'Speed Master', icon: '🏎️', description: 'Score 2000+ in Speed Run' },
                { id: 'battle_veteran', name: 'Battle Veteran', icon: '⚔️', description: 'Win 10 battles' },
                { id: 'undefeated', name: 'Undefeated', icon: '🏆', description: '5 win streak in Battle Mode' },
                { id: 'speed_typist', name: 'Speed Typist', icon: '⌨️', description: '60+ WPM in Type Racer' },
                { id: 'perfect_accuracy', name: 'Perfect Accuracy', icon: '🎯', description: '100% accuracy in Type Racer' },
                { id: 'millionaire', name: 'CS Millionaire', icon: '💰', description: 'Win 1,000,000 XP in Millionaire' },
                { id: 'quiz_master', name: 'Quiz Master', icon: '🧠', description: 'Reach question 10 in Millionaire' },
                { id: 'boss_slayer', name: 'Boss Slayer', icon: '🗡️', description: 'Defeat any boss' },
                { id: 'champion', name: 'Champion', icon: '👑', description: 'Defeat The Examinator' },
                { id: 'flawless', name: 'Flawless Victory', icon: '⭐', description: 'Defeat boss with full HP' }
            ];
        }
        
        let unlocked = [];
        try {
            if (typeof AppState !== 'undefined') {
                const user = AppState.getState('user');
                unlocked = Array.isArray(user?.achievements) ? user.achievements : [];
            }
        } catch (e) {
            // Continue with empty unlocked array
        }
        
        return `
            <div class="game-ach-grid">
                ${achievements.map(ach => {
                    const isUnlocked = unlocked.includes(ach.id);
                    const desc = ach.description || ach.desc || '';
                    return `
                        <div class="game-ach-card ${isUnlocked ? 'unlocked' : 'locked'}">
                            <span class="game-ach-icon">${ach.icon}</span>
                            <span class="game-ach-name">${ach.name}</span>
                            <span class="game-ach-desc">${desc}</span>
                            ${isUnlocked ? '<span class="game-ach-check">✓</span>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};
