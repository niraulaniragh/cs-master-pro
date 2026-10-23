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
    
    // Track guest usage in session (persisted to sessionStorage)
    const SESSION_KEY = 'guestLimiterUsage';
    
    function loadSessionUsage() {
        try {
            const stored = sessionStorage.getItem(SESSION_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Failed to load guest usage from session:', e);
        }
        return {
            questionsAnswered: 0,
            flashcardsViewed: 0,
            gamesPlayed: [],
            topicsViewed: [],
            toolsUsed: []
        };
    }
    
    function saveSessionUsage() {
        try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUsage));
        } catch (e) {
            console.warn('Failed to save guest usage to session:', e);
        }
    }
    
    let sessionUsage = loadSessionUsage();
    
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
     * Returns false if limit reached (caller should check canAnswerQuestion first)
     */
    function recordQuestion() {
        if (isGuest()) {
            if (sessionUsage.questionsAnswered >= LIMITS.questions) {
                return false;
            }
            sessionUsage.questionsAnswered++;
            saveSessionUsage();
        }
        return true;
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
     * Returns false if limit reached
     */
    function recordFlashcard() {
        if (isGuest()) {
            if (sessionUsage.flashcardsViewed >= LIMITS.flashcards) {
                return false;
            }
            sessionUsage.flashcardsViewed++;
            saveSessionUsage();
        }
        return true;
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
     * Returns false if limit reached and game not already played
     */
    function recordGame(gameId) {
        if (isGuest()) {
            if (sessionUsage.gamesPlayed.includes(gameId)) {
                return true; // Already played, allow replay
            }
            if (sessionUsage.gamesPlayed.length >= LIMITS.games) {
                return false;
            }
            sessionUsage.gamesPlayed.push(gameId);
            saveSessionUsage();
        }
        return true;
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
     * Returns false if limit reached and topic not already viewed
     */
    function recordTopic(topicId) {
        if (isGuest()) {
            if (sessionUsage.topicsViewed.includes(topicId)) {
                return true;
            }
            if (sessionUsage.topicsViewed.length >= LIMITS.topics) {
                return false;
            }
            sessionUsage.topicsViewed.push(topicId);
            saveSessionUsage();
        }
        return true;
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
     * Returns false if limit reached and tool not already used
     */
    function recordTool(toolId) {
        if (isGuest()) {
            if (sessionUsage.toolsUsed.includes(toolId)) {
                return true;
            }
            if (sessionUsage.toolsUsed.length >= LIMITS.tools) {
                return false;
            }
            sessionUsage.toolsUsed.push(toolId);
            saveSessionUsage();
        }
        return true;
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
        
        // Keyboard handler for Escape key
        function handleKeydown(e) {
            if (e.key === 'Escape') {
                closeOverlay();
            }
        }
        document.addEventListener('keydown', handleKeydown);
        
        function closeOverlay() {
            document.removeEventListener('keydown', handleKeydown);
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
     * Returns an object with HTML and a setup function to attach event listener
     */
    function getLimitBanner(message) {
        const bannerId = 'guest-banner-' + Date.now();
        const html = `
            <div class="guest-limit-banner" id="${bannerId}">
                <div class="guest-limit-banner-content">
                    <span class="guest-limit-banner-icon">🔒</span>
                    <span class="guest-limit-banner-text">${escapeHtml(message)}</span>
                </div>
                <button class="btn btn-primary btn-small guest-signup-inline" data-guest-signup>
                    Sign Up Free
                </button>
            </div>
        `;
        
        // Setup function to attach event listener after DOM insertion
        const setup = () => {
            const banner = document.getElementById(bannerId);
            if (banner) {
                const btn = banner.querySelector('[data-guest-signup]');
                if (btn) {
                    btn.addEventListener('click', () => showSignupPrompt(message));
                }
            }
        };
        
        return { html, setup, bannerId };
    }
    
    /**
     * Legacy getLimitBanner that returns just HTML (for backward compatibility)
     * Uses event delegation on document
     */
    function getLimitBannerHtml(message) {
        return `
            <div class="guest-limit-banner">
                <div class="guest-limit-banner-content">
                    <span class="guest-limit-banner-icon">🔒</span>
                    <span class="guest-limit-banner-text">${escapeHtml(message)}</span>
                </div>
                <button class="btn btn-primary btn-small guest-signup-inline" data-guest-message="${escapeHtml(message)}">
                    Sign Up Free
                </button>
            </div>
        `;
    }
    
    // Event delegation for inline signup buttons (handles XSS-safe approach)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-guest-message]');
        if (btn) {
            const message = btn.getAttribute('data-guest-message');
            showSignupPrompt(message);
        }
    });
    
    /**
     * Reset session usage (for testing or on logout)
     */
    function resetUsage() {
        sessionUsage.questionsAnswered = 0;
        sessionUsage.flashcardsViewed = 0;
        sessionUsage.gamesPlayed = [];
        sessionUsage.topicsViewed = [];
        sessionUsage.toolsUsed = [];
        try {
            sessionStorage.removeItem(SESSION_KEY);
        } catch (e) {
            console.warn('Failed to clear guest usage from session:', e);
        }
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
        getLimitBannerHtml,
        resetUsage,
        LIMITS
    };
})();
