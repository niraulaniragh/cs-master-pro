/**
 * Leaderboard.js - Leaderboard System
 * Shows rankings of users by XP and achievements
 */

const Leaderboard = {
    /**
     * Get all users sorted by XP
     */
    getRankings: () => {
        if (typeof Auth === 'undefined') return [];
        
        const users = Auth.getUsers();
        const rankings = Object.values(users)
            .map(user => ({
                username: user.username,
                xp: user.profile?.xp || 0,
                level: user.profile?.level || 1,
                achievements: user.profile?.achievements?.length || 0,
                totalCorrect: user.profile?.totalCorrect || 0,
                isCurrentUser: Auth.getSession()?.email === user.email
            }))
            .sort((a, b) => b.xp - a.xp);
        
        // Add rank numbers
        rankings.forEach((user, index) => {
            user.rank = index + 1;
        });
        
        return rankings;
    },

    /**
     * Get current user's rank
     */
    getCurrentUserRank: () => {
        const rankings = Leaderboard.getRankings();
        const currentUser = rankings.find(u => u.isCurrentUser);
        return currentUser?.rank || 0;
    },

    /**
     * Get rank icon
     */
    getRankIcon: (rank) => {
        switch(rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return `#${rank}`;
        }
    },

    /**
     * Get rank class
     */
    getRankClass: (rank) => {
        if (rank === 1) return 'gold';
        if (rank === 2) return 'silver';
        if (rank === 3) return 'bronze';
        return '';
    },

    /**
     * Render leaderboard
     */
    render: () => {
        const rankings = Leaderboard.getRankings();
        const currentRank = Leaderboard.getCurrentUserRank();
        
        if (rankings.length === 0) {
            return `
                <div class="leaderboard-empty">
                    <span>🏆</span>
                    <p>No rankings yet!</p>
                    <p>Create an account to join the leaderboard.</p>
                </div>
            `;
        }
        
        return `
            <div class="leaderboard">
                <div class="leaderboard-header">
                    <h3>🏆 Leaderboard</h3>
                    ${currentRank > 0 ? `<span class="your-rank">Your Rank: #${currentRank}</span>` : ''}
                </div>
                
                <div class="leaderboard-podium">
                    ${rankings.length >= 2 ? `
                        <div class="podium-spot second">
                            <div class="podium-avatar">${Helpers.escapeHtml(rankings[1].username.charAt(0).toUpperCase())}</div>
                            <div class="podium-name">${Helpers.escapeHtml(rankings[1].username)}</div>
                            <div class="podium-xp">${rankings[1].xp.toLocaleString()} XP</div>
                            <div class="podium-rank">🥈</div>
                        </div>
                    ` : ''}
                    ${rankings.length >= 1 ? `
                        <div class="podium-spot first">
                            <div class="podium-avatar gold">${Helpers.escapeHtml(rankings[0].username.charAt(0).toUpperCase())}</div>
                            <div class="podium-name">${Helpers.escapeHtml(rankings[0].username)}</div>
                            <div class="podium-xp">${rankings[0].xp.toLocaleString()} XP</div>
                            <div class="podium-rank">🥇</div>
                        </div>
                    ` : ''}
                    ${rankings.length >= 3 ? `
                        <div class="podium-spot third">
                            <div class="podium-avatar">${Helpers.escapeHtml(rankings[2].username.charAt(0).toUpperCase())}</div>
                            <div class="podium-name">${Helpers.escapeHtml(rankings[2].username)}</div>
                            <div class="podium-xp">${rankings[2].xp.toLocaleString()} XP</div>
                            <div class="podium-rank">🥉</div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="leaderboard-list">
                    ${rankings.slice(0, 10).map(user => `
                        <div class="leaderboard-row ${user.isCurrentUser ? 'current-user' : ''} ${Leaderboard.getRankClass(user.rank)}">
                            <div class="lb-rank">${Leaderboard.getRankIcon(user.rank)}</div>
                            <div class="lb-avatar">${user.username.charAt(0).toUpperCase()}</div>
                            <div class="lb-info">
                                <span class="lb-name">${user.username}${user.isCurrentUser ? ' (You)' : ''}</span>
                                <span class="lb-stats">Level ${user.level} • ${user.achievements} 🏆</span>
                            </div>
                            <div class="lb-xp">${user.xp.toLocaleString()} XP</div>
                        </div>
                    `).join('')}
                </div>
                
                ${rankings.length > 10 ? `
                    <div class="leaderboard-more">
                        + ${rankings.length - 10} more users
                    </div>
                ` : ''}
            </div>
        `;
    },

    /**
     * Render mini leaderboard for homepage
     */
    renderMini: () => {
        const rankings = Leaderboard.getRankings().slice(0, 5);
        
        if (rankings.length === 0) return '';
        
        return `
            <div class="leaderboard-mini">
                <div class="lb-mini-header">
                    <h4>🏆 Top Students</h4>
                    <button class="btn btn-small btn-secondary" onclick="Leaderboard.showFull()">View All</button>
                </div>
                <div class="lb-mini-list">
                    ${rankings.map(user => `
                        <div class="lb-mini-row ${user.isCurrentUser ? 'current-user' : ''}">
                            <span class="lb-mini-rank">${Leaderboard.getRankIcon(user.rank)}</span>
                            <span class="lb-mini-name">${user.username}</span>
                            <span class="lb-mini-xp">${user.xp.toLocaleString()} XP</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    /**
     * Show full leaderboard modal
     */
    showFull: () => {
        Modal.show('Leaderboard', Leaderboard.render());
    }
};
