/**
 * State.js - Reactive State Management System
 * A simple but powerful state management with auth integration
 */

const AppState = (() => {
    // Default state structure
    const getDefaultState = () => ({
        user: {
            xp: 0,
            level: 1,
            streak: 0,
            totalCorrect: 0,
            totalAnswered: 0,
            achievements: [],
            topicProgress: {},
            settings: {
                sound: true,
                animations: true,
                darkMode: true
            }
        },
        quiz: {
            mode: null,
            topic: 'all',
            questions: [],
            currentIndex: 0,
            lives: 3,
            correct: 0,
            incorrect: 0,
            answers: [],
            isActive: false
        },
        learn: {
            currentTopic: 'problem-solving',
            currentSubtopic: null,
            readTopics: [],
            bookmarks: []
        },
        ui: {
            currentRoute: 'home',
            isLoading: false,
            modalOpen: false
        }
    });

    // Private state
    let state = getDefaultState();

    // Subscribers for reactive updates
    const subscribers = new Map();

    // Debounce timer for save operations
    let saveTimer = null;
    const SAVE_DEBOUNCE_MS = 500;

    /**
     * Deep clone utility with error handling
     */
    const deepClone = (obj) => {
        if (obj === null || obj === undefined) return obj;
        if (typeof obj !== 'object') return obj;
        
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (error) {
            console.error('Deep clone error:', error);
            // Fallback: return a shallow copy for simple objects
            if (Array.isArray(obj)) return [...obj];
            return { ...obj };
        }
    };

    /**
     * Safely traverse path in object
     */
    const getValueAtPath = (obj, path) => {
        if (!path || typeof path !== 'string') return obj;
        if (!obj || typeof obj !== 'object') return undefined;
        
        const keys = path.split('.');
        let value = obj;
        
        for (const key of keys) {
            if (value === null || value === undefined) return undefined;
            value = value[key];
        }
        
        return value;
    };

    /**
     * Get state or specific path
     */
    const getState = (path = null) => {
        try {
            if (!path) return deepClone(state);
            return deepClone(getValueAtPath(state, path));
        } catch (error) {
            console.error('Error getting state:', error);
            return path ? undefined : getDefaultState();
        }
    };

    /**
     * Set state with path notation
     */
    const setState = (path, value) => {
        if (!path || typeof path !== 'string') {
            console.error('Invalid path for setState');
            return;
        }
        
        try {
            const keys = path.split('.');
            let current = state;
            
            // Navigate to parent
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (current[key] === undefined || current[key] === null) {
                    current[key] = {};
                }
                current = current[key];
            }
            
            // Set the value
            const finalKey = keys[keys.length - 1];
            current[finalKey] = value;
            
            // Notify subscribers
            notifySubscribers(path, value);
            
            // Persist user state with debounce
            if (path.startsWith('user')) {
                debouncedSaveUserProgress();
            }
        } catch (error) {
            console.error('Error setting state:', error);
        }
    };

    /**
     * Debounced save to prevent rapid successive saves
     */
    const debouncedSaveUserProgress = () => {
        if (saveTimer) {
            clearTimeout(saveTimer);
        }
        saveTimer = setTimeout(() => {
            saveUserProgressImmediate();
            saveTimer = null;
        }, SAVE_DEBOUNCE_MS);
    };

    /**
     * Save user progress immediately
     */
    const saveUserProgressImmediate = () => {
        try {
            // Save to localStorage
            if (typeof Storage !== 'undefined' && typeof Storage.save === 'function') {
                Storage.save('user', state.user);
            }
            
            // If logged in, also save to user profile
            if (typeof Auth !== 'undefined' && typeof Auth.isLoggedIn === 'function' && Auth.isLoggedIn()) {
                if (typeof Auth.saveProgress === 'function') {
                    Auth.saveProgress(state.user);
                }
            }
        } catch (error) {
            console.error('Error saving user progress:', error);
        }
    };

    /**
     * Update state (merge objects)
     */
    const updateState = (path, updates) => {
        if (!path || typeof path !== 'string') return;
        
        try {
            const current = getState(path);
            if (current !== null && typeof current === 'object' && !Array.isArray(current) && typeof updates === 'object') {
                setState(path, { ...current, ...updates });
            } else {
                setState(path, updates);
            }
        } catch (error) {
            console.error('Error updating state:', error);
        }
    };

    /**
     * Subscribe to state changes
     */
    const subscribe = (path, callback) => {
        if (!path || typeof callback !== 'function') {
            console.warn('Invalid subscription parameters');
            return () => {};
        }
        
        if (!subscribers.has(path)) {
            subscribers.set(path, []);
        }
        subscribers.get(path).push(callback);
        
        // Return unsubscribe function
        return () => {
            const subs = subscribers.get(path);
            if (subs) {
                const index = subs.indexOf(callback);
                if (index > -1) subs.splice(index, 1);
            }
        };
    };

    /**
     * Notify subscribers of changes
     */
    const notifySubscribers = (path, value) => {
        if (!path) return;
        
        try {
            // Notify exact path subscribers
            if (subscribers.has(path)) {
                const callbacks = subscribers.get(path);
                for (const cb of callbacks) {
                    try {
                        cb(value);
                    } catch (e) {
                        console.error('Subscriber callback error:', e);
                    }
                }
            }
            
            // Notify parent path subscribers
            const parts = path.split('.');
            for (let i = parts.length - 1; i >= 0; i--) {
                const parentPath = parts.slice(0, i).join('.');
                if (parentPath && subscribers.has(parentPath)) {
                    const callbacks = subscribers.get(parentPath);
                    const parentValue = getState(parentPath);
                    for (const cb of callbacks) {
                        try {
                            cb(parentValue);
                        } catch (e) {
                            console.error('Parent subscriber callback error:', e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error notifying subscribers:', error);
        }
    };

    /**
     * Initialize state from storage (for guests)
     */
    const init = () => {
        try {
            if (typeof Storage !== 'undefined' && typeof Storage.load === 'function') {
                const savedUser = Storage.load('user');
                if (savedUser && typeof savedUser === 'object') {
                    // Merge with defaults to ensure all fields exist
                    state.user = { ...getDefaultState().user, ...savedUser };
                    // Ensure achievements is always an array
                    if (!Array.isArray(state.user.achievements)) {
                        state.user.achievements = [];
                    }
                }
            }
            console.log('🔄 State initialized:', state.user.xp, 'XP, Level', state.user.level);
            updateNavUser();
        } catch (error) {
            console.error('Error initializing state:', error);
            state = getDefaultState();
        }
    };

    /**
     * Initialize state from a user profile (for logged in users)
     */
    const initWithProfile = (profile) => {
        try {
            if (!profile || typeof profile !== 'object') {
                init();
                return;
            }
            
            state.user = {
                xp: profile.xp || 0,
                level: profile.level || 1,
                streak: profile.streak || 0,
                totalCorrect: profile.totalCorrect || 0,
                totalAnswered: profile.totalAnswered || 0,
                achievements: Array.isArray(profile.achievements) ? profile.achievements : [],
                topicProgress: profile.topicProgress || {},
                settings: profile.settings || {
                    sound: true,
                    animations: true,
                    darkMode: true
                }
            };
            
            if (typeof Storage !== 'undefined' && typeof Storage.save === 'function') {
                Storage.save('user', state.user);
            }
            
            console.log('🔄 State loaded from profile:', state.user.xp, 'XP, Level', state.user.level);
            updateNavUser();
        } catch (error) {
            console.error('Error initializing with profile:', error);
            init();
        }
    };

    /**
     * Reset state (for logout)
     */
    const resetState = () => {
        try {
            state.user = getDefaultState().user;
            if (typeof Storage !== 'undefined' && typeof Storage.remove === 'function') {
                Storage.remove('user');
            }
        } catch (error) {
            console.error('Error resetting state:', error);
        }
    };

    /**
     * Helper function for safe HTML escaping
     */
    const escapeHtml = (str) => {
        if (typeof Helpers !== 'undefined' && typeof Helpers.escapeHtml === 'function') {
            return Helpers.escapeHtml(str);
        }
        return String(str).replace(/[&<>"']/g, (m) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[m]);
    };

    /**
     * Update nav with user info
     */
    const updateNavUser = () => {
        try {
            const navUser = document.getElementById('nav-user');
            if (!navUser) return;

            const isLoggedIn = typeof Auth !== 'undefined' && typeof Auth.isLoggedIn === 'function' && Auth.isLoggedIn();
            
            if (isLoggedIn) {
                const session = typeof Auth.getSession === 'function' ? Auth.getSession() : null;
                if (session && session.username) {
                    const safeUsername = escapeHtml(session.username);
                    const firstChar = escapeHtml(session.username.charAt(0).toUpperCase());
                    navUser.innerHTML = `
                        <div class="user-menu">
                            <button class="user-menu-btn" onclick="AppState.toggleUserMenu()">
                                <span class="user-avatar">${firstChar}</span>
                                <span class="user-name">${safeUsername}</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="user-dropdown" id="user-dropdown">
                                <a href="#" onclick="App.showProfile(); return false;">
                                    <i class="fas fa-user"></i> Profile
                                </a>
                                <a href="#" onclick="App.logout(); return false;">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </a>
                            </div>
                        </div>
                    `;
                } else {
                    // Logged in but no session data
                    showLoginButton(navUser);
                }
            } else {
                showLoginButton(navUser);
            }
        } catch (error) {
            console.error('Error updating nav user:', error);
        }
    };

    /**
     * Show login button in nav
     */
    const showLoginButton = (navUser) => {
        navUser.innerHTML = `
            <button class="btn btn-primary btn-small" onclick="if(typeof AuthModal !== 'undefined') AuthModal.show('login');">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
        `;
    };

    /**
     * Toggle user dropdown menu
     */
    const toggleUserMenu = () => {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    };

    // Close dropdown when clicking outside
    if (typeof document !== 'undefined') {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                const dropdown = document.getElementById('user-dropdown');
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
            }
        });
    }

    // XP thresholds for levels (cached)
    const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000];

    /**
     * Calculate level from XP
     */
    const calculateLevel = (xp) => {
        if (typeof xp !== 'number' || xp < 0) return 1;
        
        for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
        }
        return 1;
    };

    /**
     * Add XP and check for level up
     */
    const addXP = (amount) => {
        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
            return { xp: state.user.xp, level: state.user.level, leveledUp: false };
        }
        
        try {
            const previousLevel = state.user.level;
            const currentXP = (state.user.xp || 0) + Math.floor(amount);
            const newLevel = calculateLevel(currentXP);
            
            setState('user.xp', currentXP);
            
            const leveledUp = newLevel > previousLevel;
            if (leveledUp) {
                setState('user.level', newLevel);
                
                if (typeof Toast !== 'undefined' && typeof Toast.show === 'function') {
                    Toast.show(`🎉 Level Up! You're now Level ${newLevel}!`, 'success');
                }
                
                // Confetti celebration on level up
                if (typeof Helpers !== 'undefined' && typeof Helpers.confetti === 'function') {
                    try {
                        Helpers.confetti({ particleCount: 150, spread: 90 });
                    } catch (e) {
                        console.warn('Confetti error:', e);
                    }
                }
                
                // Check level achievements
                if (newLevel >= 5) unlockAchievement('level_5');
                if (newLevel >= 10) unlockAchievement('level_10');
            }
            
            updateNavStats();
            return { xp: currentXP, level: newLevel, leveledUp };
        } catch (error) {
            console.error('Error adding XP:', error);
            return { xp: state.user.xp, level: state.user.level, leveledUp: false };
        }
    };

    /**
     * Update navigation stats display
     */
    const updateNavStats = () => {
        try {
            const xpEl = document.getElementById('nav-xp');
            const levelEl = document.getElementById('nav-level');
            if (xpEl) xpEl.textContent = state.user.xp || 0;
            if (levelEl) levelEl.textContent = state.user.level || 1;
        } catch (error) {
            console.error('Error updating nav stats:', error);
        }
    };

    /**
     * Unlock an achievement
     */
    const unlockAchievement = (id) => {
        if (!id || typeof id !== 'string') return;
        
        try {
            // Ensure achievements is an array
            if (!Array.isArray(state.user.achievements)) {
                state.user.achievements = [];
            }
            
            if (!state.user.achievements.includes(id)) {
                state.user.achievements.push(id);
                setState('user.achievements', [...state.user.achievements]);
                
                // Find and display achievement
                if (typeof ACHIEVEMENTS !== 'undefined' && Array.isArray(ACHIEVEMENTS)) {
                    const achievement = ACHIEVEMENTS.find(a => a && a.id === id);
                    if (achievement && typeof Toast !== 'undefined') {
                        Toast.show(`🏆 Achievement: ${achievement.name}!`, 'success');
                    }
                }
            }
        } catch (error) {
            console.error('Error unlocking achievement:', error);
        }
    };

    /**
     * Check if user has an achievement
     */
    const hasAchievement = (id) => {
        if (!id) return false;
        return Array.isArray(state.user.achievements) && state.user.achievements.includes(id);
    };

    /**
     * Reset all progress
     */
    const reset = () => {
        try {
            state.user = getDefaultState().user;
            if (typeof Storage !== 'undefined' && typeof Storage.clear === 'function') {
                Storage.clear();
            }
            updateNavStats();
        } catch (error) {
            console.error('Error resetting state:', error);
        }
    };

    return {
        getState,
        setState,
        updateState,
        subscribe,
        init,
        initWithProfile,
        resetState,
        addXP,
        calculateLevel,
        unlockAchievement,
        hasAchievement,
        updateNavStats,
        updateNavUser,
        toggleUserMenu,
        reset
    };
})();

// Achievements Data
const ACHIEVEMENTS = [
    // Learning Achievements
    { id: 'first_quiz', name: 'First Steps', icon: '🎯', description: 'Complete your first quiz' },
    { id: 'streak_5', name: 'On Fire!', icon: '🔥', description: 'Get a 5 answer streak' },
    { id: 'streak_10', name: 'Unstoppable', icon: '⚡', description: 'Get a 10 answer streak' },
    { id: 'perfect', name: 'Perfectionist', icon: '💯', description: 'Get 100% on a quiz' },
    { id: 'level_5', name: 'Rising Star', icon: '⭐', description: 'Reach Level 5' },
    { id: 'level_10', name: 'Expert', icon: '🏆', description: 'Reach Level 10' },
    { id: 'all_topics', name: 'Well Rounded', icon: '🎓', description: 'Study all topics' },
    { id: 'note_reader', name: 'Bookworm', icon: '📚', description: 'Read notes from all topics' },
    { id: 'tool_master', name: 'Tool Master', icon: '🔧', description: 'Use all learning tools' },
    { id: 'century', name: 'Century', icon: '💎', description: 'Answer 100 questions correctly' },
    { id: 'flashcard_master', name: 'Memory Master', icon: '🧠', description: 'Complete flashcards with 100% known' },
    
    // Game Achievements
    { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', description: 'Get 10x combo in Speed Run' },
    { id: 'speed_master', name: 'Speed Master', icon: '🏎️', description: 'Score 2000+ in Speed Run' },
    { id: 'battle_veteran', name: 'Battle Veteran', icon: '⚔️', description: 'Win 10 battles' },
    { id: 'undefeated', name: 'Undefeated', icon: '🛡️', description: 'Get a 5 win streak in Battle Mode' },
    { id: 'speed_typist', name: 'Speed Typist', icon: '⌨️', description: 'Type at 60+ WPM' },
    { id: 'perfect_accuracy', name: 'Perfect Accuracy', icon: '🎯', description: '100% accuracy in Type Racer' },
    { id: 'millionaire', name: 'CS Millionaire', icon: '💰', description: 'Win 1,000,000 XP in Millionaire' },
    { id: 'quiz_master', name: 'Quiz Master', icon: '🧠', description: 'Reach question 10 in Millionaire' },
    { id: 'boss_slayer', name: 'Boss Slayer', icon: '🗡️', description: 'Defeat any boss' },
    { id: 'champion', name: 'Champion', icon: '👑', description: 'Defeat The Examinator' },
    { id: 'flawless', name: 'Flawless Victory', icon: '⭐', description: 'Defeat a boss with full HP' },
    
    // Daily Challenge Achievements  
    { id: 'daily_streak_7', name: 'Weekly Warrior', icon: '📅', description: '7-day streak on daily challenges' },
    { id: 'daily_streak_30', name: 'Monthly Master', icon: '🗓️', description: '30-day streak on daily challenges' }
];
