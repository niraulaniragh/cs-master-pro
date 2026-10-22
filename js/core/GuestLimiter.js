/**
 * GuestLimiter.js - Restricts content for non-logged-in users
 * Shows ~20% of content and prompts to sign up for full access
 */

const GuestLimiter = (function() {
    'use strict';
    
    // Guest limits configuration
    const LIMITS = {
        questions: 3,        // Questions per quiz session
        flashcards: 5,       // Flashcards viewable
        games: 2,            // Games playable
        topics: 2,           // Topics accessible in learn view
        tools: 2,            // Tools accessible
        notes: 1,            // Notes viewable per topic
        pastPapers: 0        // Past papers (premium only)
    };
    
    // Track guest usage in session
    const sessionUsage = {
        questionsAnswered: 0,
        flashcardsViewed: 0,
        gamesPlayed: [],     // Array of game IDs played
        topicsViewed: [],    // Array of topic IDs viewed
        toolsUsed: []        // Array of tool IDs used
    };
    
    /**
     * Check if user is a guest (not logged in)
     */
    function isGuest() {
        return typeof Auth === 'undefined' || !Auth.isLoggedIn || !Auth.isLoggedIn();
    }
    
    /**
     * Check if guest can access a route
     */
    function canAccessRoute(route) {
        if (!isGuest()) return { allowed: true };
        
        // Routes that are always accessible
        const publicRoutes = ['landing', 'home'];
        if (publicRoutes.includes(route)) {
            return { allowed: true };
        }
        
        // Routes with limited access
        const limitedRoutes = ['learn', 'practice', 'games', 'tools', 'playground'];
        if (limitedRoutes.includes(route)) {
            return { allowed: true, limited: true };
        }
        
        // Routes that require login
        const protectedRoutes = ['analytics', 'teacher', 'pastpapers'];
        if (protectedRoutes.includes(route)) {
            return { 
                allowed: false, 
                reason: 'This feature requires an account.',
                showSignup: true
            };
        }
        
        return { allowed: true };
    }
    
    /**
     * Check if guest can do more questions
     */
    function canAnswerQuestion() {
        if (!isGuest()) return { allowed: true };
        
        if (sessionUsage.questionsAnswered >= LIMITS.questions) {
            return {
                allowed: false,
                reason: `You've answered ${LIMITS.questions} questions. Sign up for unlimited practice!`,
                showSignup: true
            };
        }
        return { allowed: true, remaining: LIMITS.questions - sessionUsage.questionsAnswered };
    }
    
    /**
     * Record a question answered
     */
    function recordQuestion() {
        if (isGuest()) {
            sessionUsage.questionsAnswered++;
        }
    }
    
    /**
     * Check if guest can view more flashcards
     */
    function canViewFlashcard() {
        if (!isGuest()) return { allowed: true };
        
        if (sessionUsage.flashcardsViewed >= LIMITS.flashcards) {
            return {
                allowed: false,
                reason: `You've viewed ${LIMITS.flashcards} flashcards. Sign up to access all ${typeof FLASHCARDS !== 'undefined' ? FLASHCARDS.length : '80'}+ flashcards!`,
                showSignup: true
            };
        }
        return { allowed: true, remaining: LIMITS.flashcards - sessionUsage.flashcardsViewed };
    }
    
    /**
     * Record a flashcard viewed
     */
    function recordFlashcard() {
        if (isGuest()) {
            sessionUsage.flashcardsViewed++;
        }
    }
    
    /**
     * Check if guest can play a game
     */
    function canPlayGame(gameId) {
        if (!isGuest()) return { allowed: true };
        
        // If already played this game, allow replay
        if (sessionUsage.gamesPlayed.includes(gameId)) {
            return { allowed: true };
        }
        
        if (sessionUsage.gamesPlayed.length >= LIMITS.games) {
            return {
                allowed: false,
                reason: `You've tried ${LIMITS.games} games. Sign up to play all 12 educational games!`,
                showSignup: true
            };
        }
        return { allowed: true };
    }
    
    /**
     * Record a game played
     */
    function recordGame(gameId) {
        if (isGuest() && !sessionUsage.gamesPlayed.includes(gameId)) {
            sessionUsage.gamesPlayed.push(gameId);
        }
    }
    
    /**
     * Check if guest can view a topic
     */
    function canViewTopic(topicId) {
        if (!isGuest()) return { allowed: true };
        
        // If already viewing this topic, allow
        if (sessionUsage.topicsViewed.includes(topicId)) {
            return { allowed: true };
        }
        
        if (sessionUsage.topicsViewed.length >= LIMITS.topics) {
            return {
                allowed: false,
                reason: `You've explored ${LIMITS.topics} topics. Sign up to access all 10 IGCSE topics!`,
                showSignup: true
            };
        }
        return { allowed: true };
    }
    
    /**
     * Record a topic viewed
     */
    function recordTopic(topicId) {
        if (isGuest() && !sessionUsage.topicsViewed.includes(topicId)) {
            sessionUsage.topicsViewed.push(topicId);
        }
    }
    
    /**
     * Check if guest can use a tool
     */
    function canUseTool(toolId) {
        if (!isGuest()) return { allowed: true };
        
        if (sessionUsage.toolsUsed.includes(toolId)) {
            return { allowed: true };
        }
        
        if (sessionUsage.toolsUsed.length >= LIMITS.tools) {
            return {
                allowed: false,
                reason: `You've used ${LIMITS.tools} tools. Sign up for unlimited access to all tools!`,
                showSignup: true
            };
        }
        return { allowed: true };
    }
    
    /**
     * Record a tool used
     */
    function recordTool(toolId) {
        if (isGuest() && !sessionUsage.toolsUsed.includes(toolId)) {
            sessionUsage.toolsUsed.push(toolId);
        }
    }
    
    /**
     * Filter array to show only limited items for guests
     */
    function limitArray(array, limitKey) {
        if (!isGuest()) return array;
        const limit = LIMITS[limitKey] || 3;
        return array.slice(0, limit);
    }
    
    /**
     * Get current usage stats for display
     */
    function getUsageStats() {
        return {
            isGuest: isGuest(),
            limits: LIMITS,
            usage: sessionUsage
        };
    }
    
    /**
     * Show the signup prompt modal
     */
    function showSignupPrompt(message, feature) {
        const overlay = document.createElement('div');
        overlay.className = 'guest-limit-overlay';
        overlay.innerHTML = `
            <div class="guest-limit-modal">
                <div class="guest-limit-icon">🔒</div>
                <h2>Create a Free Account</h2>
                <p class="guest-limit-message">${escapeHtml(message)}</p>
                <div class="guest-limit-benefits">
                    <h3>With a free account, you get:</h3>
                    <ul>
                        <li>✅ Unlimited quiz questions</li>
                        <li>✅ All 80+ flashcards</li>
                        <li>✅ 12 educational games</li>
                        <li>✅ Progress tracking & XP</li>
                        <li>✅ Achievements & streaks</li>
                        <li>✅ Past paper practice</li>
                    </ul>
                </div>
                <div class="guest-limit-actions">
                    <button class="btn btn-primary btn-large" id="guest-signup-btn">
                        <i class="fas fa-user-plus"></i> Sign Up Free
                    </button>
                    <button class="btn btn-outline" id="guest-login-btn">
                        Already have an account? Log In
                    </button>
                </div>
                <button class="guest-limit-close" aria-label="Close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Animate in
        requestAnimationFrame(() => {
            overlay.classList.add('visible');
        });
        
        // Event handlers
        overlay.querySelector('#guest-signup-btn').addEventListener('click', () => {
            closeOverlay();
            if (typeof AuthModal !== 'undefined') {
                AuthModal.show('register');
            }
        });
        
        overlay.querySelector('#guest-login-btn').addEventListener('click', () => {
            closeOverlay();
            if (typeof AuthModal !== 'undefined') {
                AuthModal.show('login');
            }
        });
        
        overlay.querySelector('.guest-limit-close').addEventListener('click', closeOverlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeOverlay();
        });
        
        function closeOverlay() {
            overlay.classList.remove('visible');
            setTimeout(() => overlay.remove(), 300);
        }
        
        // Focus trap
        overlay.querySelector('#guest-signup-btn').focus();
    }
    
    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Show inline limit message (for embedding in views)
     */
    function getLimitBanner(message) {
        return `
            <div class="guest-limit-banner">
                <div class="guest-limit-banner-content">
                    <span class="guest-limit-banner-icon">🔒</span>
                    <span class="guest-limit-banner-text">${escapeHtml(message)}</span>
                </div>
                <button class="btn btn-primary btn-small guest-signup-inline" onclick="GuestLimiter.showSignupPrompt('${escapeHtml(message)}')">
                    Sign Up Free
                </button>
            </div>
        `;
    }
    
    /**
     * Reset session usage (for testing)
     */
    function resetUsage() {
        sessionUsage.questionsAnswered = 0;
        sessionUsage.flashcardsViewed = 0;
        sessionUsage.gamesPlayed = [];
        sessionUsage.topicsViewed = [];
        sessionUsage.toolsUsed = [];
    }
    
    // Public API
    return {
        isGuest,
        canAccessRoute,
        canAnswerQuestion,
        recordQuestion,
        canViewFlashcard,
        recordFlashcard,
        canPlayGame,
        recordGame,
        canViewTopic,
        recordTopic,
        canUseTool,
        recordTool,
        limitArray,
        getUsageStats,
        showSignupPrompt,
        getLimitBanner,
        resetUsage,
        LIMITS
    };
})();
