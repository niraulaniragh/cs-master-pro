/**
 * Leaderboard.js - Leaderboard System
 * Shows rankings of users by XP and achievements
 */

const Leaderboard = {
    // Cache for rankings to avoid excessive recalculation
    _cache: null,
    _cacheTimestamp: 0,
    _cacheTTL: 5000, // 5 seconds

    /**
     * Escape HTML for safe display
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml: (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Clear the rankings cache
     */
    clearCache: () => {
        Leaderboard._cache = null;
        Leaderboard._cacheTimestamp = 0;
    },

    /**
     * Get all users sorted by XP
     * @param {boolean} [forceRefresh=false] - Force refresh cache
     * @returns {Array} Array of user rankings
     */
    getRankings: (forceRefresh = false) => {
        try {
            // Check cache validity
            const now = Date.now();
            if (!forceRefresh && Leaderboard._cache && (now - Leaderboard._cacheTimestamp) < Leaderboard._cacheTTL) {
                return Leaderboard._cache;
            }

            // Check if Auth is available
            if (typeof Auth === 'undefined' || !Auth.getUsers) {
                console.debug('Leaderboard: Auth service not available');
                return [];
            }

            const users = Auth.getUsers();
            if (!users || typeof users !== 'object') {
                return [];
            }

            // Get current session for highlighting current user
            let currentEmail = null;
            let currentUsername = null;
            try {
                const session = Auth.getSession ? Auth.getSession() : null;
                currentEmail = session?.email || null;
                currentUsername = session?.username || null;
            } catch (e) {
                // Session check failed, continue without
            }

            const rankings = Object.values(users)
                .filter(user => user && typeof user === 'object')
                .map(user => {
                    const profile = user.profile || {};
                    // Check if this is current user by email OR username
                    const isCurrentUser = (currentEmail && user.email && user.email.toLowerCase() === currentEmail.toLowerCase()) ||
                                         (currentUsername && user.username && user.username.toLowerCase() === currentUsername.toLowerCase());
                    return {
                        username: String(user.username || 'Anonymous'),
                        xp: Math.max(0, Number(profile.xp) || 0),
                        level: Math.max(1, Number(profile.level) || 1),
                        achievements: Array.isArray(profile.achievements) ? profile.achievements.length : 0,
                        totalCorrect: Math.max(0, Number(profile.totalCorrect) || 0),
                        isCurrentUser
                    };
                })
                .sort((a, b) => {
                    // Primary sort by XP (descending)
                    if (b.xp !== a.xp) return b.xp - a.xp;
                    // Secondary sort by level (descending)
                    if (b.level !== a.level) return b.level - a.level;
                    // Tertiary sort by achievements (descending)
                    return b.achievements - a.achievements;
                });

            // Add rank numbers
            rankings.forEach((user, index) => {
                user.rank = index + 1;
            });

            // Cache results
            Leaderboard._cache = rankings;
            Leaderboard._cacheTimestamp = now;

            return rankings;

        } catch (error) {
            console.error('Leaderboard: Error getting rankings', error);
            return [];
        }
    },

    /**
     * Get current user's rank
     * @returns {number} User's rank (0 if not found)
     */
    getCurrentUserRank: () => {
        try {
            const rankings = Leaderboard.getRankings();
            const currentUser = rankings.find(u => u.isCurrentUser);
            return currentUser?.rank || 0;
        } catch (error) {
            console.error('Leaderboard: Error getting current user rank', error);
            return 0;
        }
    },

    /**
     * Get rank icon based on position
     * @param {number} rank - Rank position
     * @returns {string} Icon or rank number
     */
    getRankIcon: (rank) => {
        const numRank = Number(rank);
        switch (numRank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return `#${numRank || '?'}`;
        }
    },

    /**
     * Get rank CSS class
     * @param {number} rank - Rank position
     * @returns {string} CSS class name
     */
    getRankClass: (rank) => {
        const numRank = Number(rank);
        if (numRank === 1) return 'gold';
        if (numRank === 2) return 'silver';
        if (numRank === 3) return 'bronze';
        return '';
    },

    /**
     * Format number with locale-aware separators
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber: (num) => {
        const n = Number(num) || 0;
        try {
            return n.toLocaleString();
        } catch (e) {
            return String(n);
        }
    },

    /**
     * Render full leaderboard
     * @param {Object} [options] - Render options
     * @param {number} [options.limit=10] - Maximum entries to show
     * @returns {string} HTML string
     */
    render: (options = {}) => {
        try {
            const { limit = 10 } = options;
            const rankings = Leaderboard.getRankings();
            const currentRank = Leaderboard.getCurrentUserRank();

            if (!rankings || rankings.length === 0) {
                return `
                    <div class="leaderboard-empty">
                        <span>🏆</span>
                        <p>No rankings yet!</p>
                        <p>Create an account to join the leaderboard.</p>
                    </div>
                `;
            }

            const displayLimit = Math.max(1, Math.min(100, Number(limit) || 10));

            return `
                <div class="leaderboard">
                    <div class="leaderboard-header">
                        <h3>🏆 Leaderboard</h3>
                        ${currentRank > 0 ? `<span class="your-rank">Your Rank: #${currentRank}</span>` : ''}
                    </div>
                    
                    <div class="leaderboard-podium">
                        ${rankings.length >= 2 ? `
                            <div class="podium-spot second ${rankings[1].isCurrentUser ? 'current-user highlight' : ''}">
                                <div class="podium-avatar silver">${Leaderboard.escapeHtml(rankings[1].username.charAt(0).toUpperCase())}</div>
                                <div class="podium-name">${Leaderboard.escapeHtml(rankings[1].username)}${rankings[1].isCurrentUser ? ' (You)' : ''}</div>
                                <div class="podium-xp">${Leaderboard.formatNumber(rankings[1].xp)} XP</div>
                                <div class="podium-rank">${Leaderboard.getRankIcon(rankings[1].rank)}</div>
                            </div>
                        ` : ''}
                        ${rankings.length >= 1 ? `
                            <div class="podium-spot first ${rankings[0].isCurrentUser ? 'current-user highlight' : ''}">
                                <div class="podium-avatar gold">${Leaderboard.escapeHtml(rankings[0].username.charAt(0).toUpperCase())}</div>
                                <div class="podium-name">${Leaderboard.escapeHtml(rankings[0].username)}${rankings[0].isCurrentUser ? ' (You)' : ''}</div>
                                <div class="podium-xp">${Leaderboard.formatNumber(rankings[0].xp)} XP</div>
                                <div class="podium-rank">${Leaderboard.getRankIcon(rankings[0].rank)}</div>
                            </div>
                        ` : ''}
                        ${rankings.length >= 3 ? `
                            <div class="podium-spot third ${rankings[2].isCurrentUser ? 'current-user highlight' : ''}">
                                <div class="podium-avatar bronze">${Leaderboard.escapeHtml(rankings[2].username.charAt(0).toUpperCase())}</div>
                                <div class="podium-name">${Leaderboard.escapeHtml(rankings[2].username)}${rankings[2].isCurrentUser ? ' (You)' : ''}</div>
                                <div class="podium-xp">${Leaderboard.formatNumber(rankings[2].xp)} XP</div>
                                <div class="podium-rank">${Leaderboard.getRankIcon(rankings[2].rank)}</div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="leaderboard-list">
                        ${rankings.slice(3, displayLimit).map(user => `
                            <div class="leaderboard-row ${user.isCurrentUser ? 'current-user highlight' : ''} ${Leaderboard.getRankClass(user.rank)}" ${user.isCurrentUser ? 'data-current-user="true"' : ''}>
                                <div class="lb-rank">${Leaderboard.getRankIcon(user.rank)}</div>
                                <div class="lb-avatar">${Leaderboard.escapeHtml(user.username.charAt(0).toUpperCase())}</div>
                                <div class="lb-info">
                                    <span class="lb-name">${Leaderboard.escapeHtml(user.username)}${user.isCurrentUser ? ' (You)' : ''}</span>
                                    <span class="lb-stats">Level ${user.level} • ${user.achievements} 🏆</span>
                                </div>
                                <div class="lb-xp">${Leaderboard.formatNumber(user.xp)} XP</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${rankings.length > displayLimit ? `
                        <div class="leaderboard-more">
                            + ${rankings.length - displayLimit} more users
                        </div>
                    ` : ''}
                </div>
            `;

        } catch (error) {
            console.error('Leaderboard: Error rendering', error);
            return '<div class="leaderboard-error">Unable to load leaderboard</div>';
        }
    },

    /**
     * Render mini leaderboard for homepage
     * @param {Object} [options] - Render options
     * @param {number} [options.limit=5] - Maximum entries to show
     * @returns {string} HTML string
     */
    renderMini: (options = {}) => {
        try {
            const { limit = 5 } = options;
            const displayLimit = Math.max(1, Math.min(10, Number(limit) || 5));
            const rankings = Leaderboard.getRankings().slice(0, displayLimit);

            if (!rankings || rankings.length === 0) {
                return '';
            }

            return `
                <div class="leaderboard-mini">
                    <div class="lb-mini-header">
                        <h4>🏆 Top Students</h4>
                        <button class="btn btn-small btn-secondary" onclick="Leaderboard.showFull()">View All</button>
                    </div>
                    <div class="lb-mini-list">
                        ${rankings.map(user => `
                            <div class="lb-mini-row ${user.isCurrentUser ? 'current-user highlight' : ''}" ${user.isCurrentUser ? 'data-current-user="true"' : ''}>
                                <span class="lb-mini-rank">${Leaderboard.getRankIcon(user.rank)}</span>
                                <span class="lb-mini-name">${Leaderboard.escapeHtml(user.username)}${user.isCurrentUser ? ' (You)' : ''}</span>
                                <span class="lb-mini-xp">${Leaderboard.formatNumber(user.xp)} XP</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

        } catch (error) {
            console.error('Leaderboard: Error rendering mini', error);
            return '';
        }
    },

    /**
     * Show full leaderboard in modal
     */
    showFull: () => {
        try {
            if (typeof Modal !== 'undefined' && Modal.show) {
                Modal.show({
                    title: 'Leaderboard',
                    content: Leaderboard.render({ limit: 20 })
                });
            } else {
                console.warn('Leaderboard: Modal not available');
            }
        } catch (error) {
            console.error('Leaderboard: Error showing full leaderboard', error);
        }
    },

    /**
     * Refresh leaderboard display
     */
    refresh: () => {
        Leaderboard.clearCache();
        // Force fetch fresh rankings
        const rankings = Leaderboard.getRankings(true);
        
        // If there's a leaderboard element on the page, re-render it
        const container = document.querySelector('.leaderboard');
        if (container) {
            container.outerHTML = Leaderboard.render();
        }
        const miniContainer = document.querySelector('.leaderboard-mini');
        if (miniContainer) {
            miniContainer.outerHTML = Leaderboard.renderMini();
        }
        
        // Emit event for any listeners
        if (typeof EventBus !== 'undefined' && EventBus.emit) {
            EventBus.emit('leaderboard:updated', { rankings });
        }
    }
};
