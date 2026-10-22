/**
 * State.js - Reactive State Management System
 * A simple but powerful state management with auth integration
 */

const AppState = (() => {
    // Private state
    let state = {
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
    };

    // Subscribers for reactive updates
    const subscribers = new Map();

    // Deep clone utility
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

    // Get state or specific path
    const getState = (path = null) => {
        if (!path) return deepClone(state);
        
        const keys = path.split('.');
        let value = state;
        for (const key of keys) {
            value = value?.[key];
        }
        return deepClone(value);
    };

    // Set state with path notation
    const setState = (path, value) => {
        const keys = path.split('.');
        let current = state;
        
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
        
        // Notify subscribers
        notifySubscribers(path, value);
        
        // Persist user state (to localStorage for guests, to Auth for logged in users)
        if (path.startsWith('user')) {
            saveUserProgress();
        }
    };

    // Save user progress - syncs with Auth if logged in
    // Use debounced version to prevent race conditions when answering questions rapidly
    const saveUserProgressImmediate = () => {
        Storage.save('user', state.user);
        
        // If logged in, also save to user profile
        if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
            Auth.saveProgress(state.user);
        }
    };
    
    // Debounced version (500ms delay) to prevent data loss during rapid updates
    const saveUserProgress = typeof Helpers !== 'undefined' && Helpers.debounce 
        ? Helpers.debounce(saveUserProgressImmediate, 500)
        : saveUserProgressImmediate;

    // Update state (merge objects)
    const updateState = (path, updates) => {
        const current = getState(path);
        if (typeof current === 'object' && !Array.isArray(current)) {
            setState(path, { ...current, ...updates });
        } else {
            setState(path, updates);
        }
    };

    // Subscribe to state changes
    const subscribe = (path, callback) => {
        if (!subscribers.has(path)) {
            subscribers.set(path, []);
        }
        subscribers.get(path).push(callback);
        
        // Return unsubscribe function
        return () => {
            const subs = subscribers.get(path);
            const index = subs.indexOf(callback);
            if (index > -1) subs.splice(index, 1);
        };
    };

    // Notify subscribers of changes
    const notifySubscribers = (path, value) => {
        // Notify exact path subscribers
        if (subscribers.has(path)) {
            subscribers.get(path).forEach(cb => cb(value));
        }
        
        // Notify parent path subscribers
        const parts = path.split('.');
        for (let i = parts.length - 1; i >= 0; i--) {
            const parentPath = parts.slice(0, i).join('.');
            if (parentPath && subscribers.has(parentPath)) {
                subscribers.get(parentPath).forEach(cb => cb(getState(parentPath)));
            }
        }
    };

    // Initialize state from storage (for guests)
    const init = () => {
        const savedUser = Storage.load('user');
        if (savedUser) {
            state.user = { ...state.user, ...savedUser };
        }
        console.log('🔄 State initialized:', state.user.xp, 'XP, Level', state.user.level);
        updateNavUser();
    };

    // Initialize state from a user profile (for logged in users)
    const initWithProfile = (profile) => {
        state.user = {
            xp: profile.xp || 0,
            level: profile.level || 1,
            streak: profile.streak || 0,
            totalCorrect: profile.totalCorrect || 0,
            totalAnswered: profile.totalAnswered || 0,
            achievements: profile.achievements || [],
            topicProgress: profile.topicProgress || {},
            settings: profile.settings || {
                sound: true,
                animations: true,
                darkMode: true
            }
        };
        Storage.save('user', state.user);
        console.log('🔄 State loaded from profile:', state.user.xp, 'XP, Level', state.user.level);
        updateNavUser();
    };

    // Reset state (for logout)
    const resetState = () => {
        state.user = {
            xp: 0,
            level: 1,
            streak: 0,
            totalCorrect: 0,
            totalAnswered: 0,
            achievements: [],
            topicProgress: {},
            settings: { sound: true, animations: true, darkMode: true }
        };
        Storage.remove('user');
    };

    // Update nav with user info
    const updateNavUser = () => {
        const navUser = document.getElementById('nav-user');
        if (!navUser) return;

        if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
            const session = Auth.getSession();
            const safeUsername = Helpers.escapeHtml(session.username);
            navUser.innerHTML = `
                <div class="user-menu">
                    <button class="user-menu-btn" onclick="AppState.toggleUserMenu()">
                        <span class="user-avatar">${Helpers.escapeHtml(session.username.charAt(0).toUpperCase())}</span>
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
            navUser.innerHTML = `
                <button class="btn btn-primary btn-small" onclick="AuthModal.show('login')">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
            `;
        }
    };

    // Toggle user dropdown menu
    const toggleUserMenu = () => {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    };

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu')) {
            const dropdown = document.getElementById('user-dropdown');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        }
    });

    // XP and Level System
    const addXP = (amount) => {
        const currentXP = state.user.xp + amount;
        const newLevel = calculateLevel(currentXP);
        
        setState('user.xp', currentXP);
        
        if (newLevel > state.user.level) {
            setState('user.level', newLevel);
            Toast.show(`🎉 Level Up! You're now Level ${newLevel}!`, 'success');
            
            // Confetti celebration on level up
            if (typeof Helpers !== 'undefined' && Helpers.confetti) {
                Helpers.confetti({ particleCount: 150, spread: 90 });
            }
            
            // Check level achievements
            if (newLevel >= 5) unlockAchievement('level_5');
            if (newLevel >= 10) unlockAchievement('level_10');
        }
        
        updateNavStats();
        return { xp: currentXP, level: newLevel, leveledUp: newLevel > state.user.level };
    };

    const calculateLevel = (xp) => {
        const thresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000];
        for (let i = thresholds.length - 1; i >= 0; i--) {
            if (xp >= thresholds[i]) return i + 1;
        }
        return 1;
    };

    const updateNavStats = () => {
        const xpEl = document.getElementById('nav-xp');
        const levelEl = document.getElementById('nav-level');
        if (xpEl) xpEl.textContent = state.user.xp;
        if (levelEl) levelEl.textContent = state.user.level;
    };

    // Achievement System
    const unlockAchievement = (id) => {
        if (!state.user.achievements.includes(id)) {
            state.user.achievements.push(id);
            setState('user.achievements', state.user.achievements);
            
            const achievement = ACHIEVEMENTS.find(a => a.id === id);
            if (achievement) {
                Toast.show(`🏆 Achievement: ${achievement.name}!`, 'success');
            }
        }
    };

    const hasAchievement = (id) => state.user.achievements.includes(id);

    // Reset all progress
    const reset = () => {
        state.user = {
            xp: 0,
            level: 1,
            streak: 0,
            totalCorrect: 0,
            totalAnswered: 0,
            achievements: [],
            topicProgress: {},
            settings: { sound: true, animations: true, darkMode: true }
        };
        Storage.clear();
        updateNavStats();
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
