/**
 * GamesView.js - Games Hub
 * Central hub for all competitive theory games
 */

const GamesView = {
    render: () => {
        const games = [
            {
                id: 'speed-run',
                name: 'Speed Run',
                icon: '⚡',
                color: '#f59e0b',
                description: 'Answer questions as fast as possible in 60 seconds!',
                features: ['Combo multipliers', 'Speed bonuses', 'Global leaderboard'],
                action: 'SpeedRun.open()',
                difficulty: 'Medium'
            },
            {
                id: 'battle-mode',
                name: 'Battle Mode',
                icon: '⚔️',
                color: '#10b981',
                description: '1v1 head-to-head against AI opponents!',
                features: ['4 difficulty levels', 'Power-ups', 'HP battles'],
                action: 'BattleMode.open()',
                difficulty: 'Variable'
            },
            {
                id: 'memory-match',
                name: 'Memory Match',
                icon: '🃏',
                color: '#10b981',
                description: 'Match CS terms with their definitions!',
                features: ['Timer challenge', 'Multiple difficulties', 'Best scores'],
                action: 'MemoryMatch.open()',
                difficulty: 'Easy-Hard'
            },
            {
                id: 'type-racer',
                name: 'Type Racer',
                icon: '⌨️',
                color: '#10b981',
                description: 'Type out definitions and code snippets!',
                features: ['WPM tracking', 'Accuracy stats', 'Code & definitions'],
                action: 'TypeRacer.open()',
                difficulty: 'Medium'
            },
            {
                id: 'millionaire',
                name: 'Who Wants to Be a CS Master?',
                icon: '💰',
                color: '#3b82f6',
                description: '15 questions to win 1,000,000 XP!',
                features: ['Lifelines', 'Safe havens', 'Escalating difficulty'],
                action: 'Millionaire.open()',
                difficulty: 'Hard'
            },
            {
                id: 'fill-code',
                name: 'Fill in the Code',
                icon: '📝',
                color: '#06b6d4',
                description: 'Complete code snippets by filling blanks!',
                features: ['Pseudocode & Python', 'Word bank', 'Hints available'],
                action: 'FillCode.open()',
                difficulty: 'Medium'
            },
            {
                id: 'boss-battle',
                name: 'Boss Battles',
                icon: '🐉',
                color: '#059669',
                description: 'Defeat topic bosses in epic battles!',
                features: ['8 unique bosses', 'Power-ups', 'Epic rewards'],
                action: 'BossBattle.open()',
                difficulty: 'Hard'
            },
            {
                id: 'gold-quest',
                name: 'Gold Quest',
                icon: '⛏️',
                color: '#fbbf24',
                description: 'Mine for gold by answering questions!',
                features: ['Upgradeable equipment', 'Streak bonuses', 'Gem discoveries'],
                action: 'GoldQuest.open()',
                difficulty: 'Medium'
            },
            {
                id: 'factory',
                name: 'Code Factory',
                icon: '🏭',
                color: '#64748b',
                description: 'Build products by powering your factory with knowledge!',
                features: ['Hire workers', 'Upgrade machines', 'Production bonuses'],
                action: 'Factory.open()',
                difficulty: 'Medium'
            },
            {
                id: 'tower-defense',
                name: 'Tower Defense',
                icon: '🏰',
                color: '#1e3a5f',
                description: 'Defend your base from bugs and viruses!',
                features: ['Build towers', 'Wave system', 'Boss battles'],
                action: 'TowerDefense.open()',
                difficulty: 'Hard'
            },
            {
                id: 'daily-challenge',
                name: 'Daily Challenge',
                icon: '📅',
                color: '#10b981',
                description: 'Complete 5 questions daily for streak bonuses!',
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
                    ${games.map(game => `
                        <div class="game-card" style="--game-color: ${game.color}">
                            <div class="game-card-header">
                                <span class="game-card-icon">${game.icon}</span>
                                <span class="game-difficulty ${game.difficulty.toLowerCase().replace(/[^a-z]/g, '')}">${game.difficulty}</span>
                            </div>
                            <h3 class="game-card-title">${game.name}</h3>
                            <p class="game-card-desc">${game.description}</p>
                            <ul class="game-card-features">
                                ${game.features.map(f => `<li>✓ ${f}</li>`).join('')}
                            </ul>
                            <button class="btn btn-primary game-play-btn" onclick="${game.action}">
                                Play Now
                            </button>
                        </div>
                    `).join('')}
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
    },

    init: () => {
        console.log('🎮 Games view initialized');
    },

    getTotalGamesPlayed: () => {
        let total = 0;
        
        // Speed Run
        const srStats = JSON.parse(localStorage.getItem('csmaster_speedrun_pb_' + (Auth.getCurrentUser()?.username || 'Guest')) || '{}');
        total += srStats.gamesPlayed || 0;
        
        // Battle Mode
        const battleStats = JSON.parse(localStorage.getItem('csmaster_battle_stats') || '{}');
        total += battleStats.totalGames || 0;
        
        // Millionaire
        const millStats = JSON.parse(localStorage.getItem('csmaster_millionaire_stats') || '{}');
        total += millStats.gamesPlayed || 0;
        
        // Type Racer
        const trStats = JSON.parse(localStorage.getItem('csmaster_typeracer_stats') || '{}');
        total += trStats.racesCompleted || 0;
        
        // Boss Battle
        const bossStats = JSON.parse(localStorage.getItem('csmaster_boss_stats') || '{}');
        total += bossStats.battlesPlayed || 0;
        
        return total;
    },

    getTotalXPFromGames: () => {
        // Estimate based on stored stats
        let total = 0;
        
        const millStats = JSON.parse(localStorage.getItem('csmaster_millionaire_stats') || '{}');
        total += millStats.totalXP || 0;
        
        const srLB = JSON.parse(localStorage.getItem('csmaster_speedrun_lb') || '[]');
        const username = Auth.getCurrentUser()?.username || 'Guest';
        const userScores = srLB.filter(s => s.username === username);
        total += userScores.reduce((sum, s) => sum + Math.floor(s.score / 10), 0);
        
        return total;
    },

    getAchievementsCount: () => {
        const gameAchievements = ['speed_demon', 'speed_master', 'battle_veteran', 'undefeated', 
                                   'speed_typist', 'perfect_accuracy', 'millionaire', 'quiz_master',
                                   'boss_slayer', 'champion', 'flawless'];
        try {
            const user = AppState.getState('user') || {};
            const unlocked = user.achievements || [];
            return gameAchievements.filter(a => unlocked.includes(a)).length;
        } catch (e) {
            return 0;
        }
    },

    renderMiniLeaderboard: () => {
        const srLB = JSON.parse(localStorage.getItem('csmaster_speedrun_lb') || '[]');
        const top5 = srLB.slice(0, 5);
        
        if (top5.length === 0) {
            return '<p class="no-data">No scores yet. Be the first to play!</p>';
        }
        
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
                            <td>${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</td>
                            <td>${entry.username}</td>
                            <td>${entry.score.toLocaleString()}</td>
                            <td>Speed Run</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderGameAchievements: () => {
        const achievements = [
            { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', desc: '10x combo in Speed Run' },
            { id: 'speed_master', name: 'Speed Master', icon: '🏎️', desc: 'Score 2000+ in Speed Run' },
            { id: 'battle_veteran', name: 'Battle Veteran', icon: '⚔️', desc: 'Win 10 battles' },
            { id: 'undefeated', name: 'Undefeated', icon: '🏆', desc: '5 win streak in Battle Mode' },
            { id: 'speed_typist', name: 'Speed Typist', icon: '⌨️', desc: '60+ WPM in Type Racer' },
            { id: 'perfect_accuracy', name: 'Perfect Accuracy', icon: '🎯', desc: '100% accuracy in Type Racer' },
            { id: 'millionaire', name: 'CS Millionaire', icon: '💰', desc: 'Win 1,000,000 XP in Millionaire' },
            { id: 'quiz_master', name: 'Quiz Master', icon: '🧠', desc: 'Reach question 10 in Millionaire' },
            { id: 'boss_slayer', name: 'Boss Slayer', icon: '🗡️', desc: 'Defeat any boss' },
            { id: 'champion', name: 'Champion', icon: '👑', desc: 'Defeat The Examinator' },
            { id: 'flawless', name: 'Flawless Victory', icon: '⭐', desc: 'Defeat boss with full HP' }
        ];
        
        let unlocked = [];
        try {
            const user = AppState.getState('user');
            if (user && user.achievements) {
                unlocked = user.achievements;
            }
        } catch (e) {
            unlocked = [];
        }
        
        return `
            <div class="game-ach-grid">
                ${achievements.map(ach => `
                    <div class="game-ach-card ${unlocked.includes(ach.id) ? 'unlocked' : 'locked'}">
                        <span class="game-ach-icon">${ach.icon}</span>
                        <span class="game-ach-name">${ach.name}</span>
                        <span class="game-ach-desc">${ach.desc}</span>
                        ${unlocked.includes(ach.id) ? '<span class="game-ach-check">✓</span>' : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
};
