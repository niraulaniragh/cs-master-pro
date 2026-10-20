/**
 * Auth.js - Authentication Module
 * Handles user registration, login, logout, and session management
 * Uses localStorage for persistence (suitable for static site)
 */

const Auth = {
    // Storage keys
    USERS_KEY: 'csmaster_users',
    SESSION_KEY: 'csmaster_session',
    
    /**
     * Initialize auth module
     */
    init: () => {
        console.log('🔐 Auth module initialized');
        // Ensure users storage exists
        if (!localStorage.getItem(Auth.USERS_KEY)) {
            localStorage.setItem(Auth.USERS_KEY, JSON.stringify({}));
        }
    },

    /**
     * Get all registered users
     */
    getUsers: () => {
        try {
            return JSON.parse(localStorage.getItem(Auth.USERS_KEY)) || {};
        } catch {
            return {};
        }
    },

    /**
     * Save users to storage
     */
    saveUsers: (users) => {
        localStorage.setItem(Auth.USERS_KEY, JSON.stringify(users));
    },

    /**
     * Hash password (simple hash for demo - use bcrypt in production)
     */
    hashPassword: (password) => {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(16);
    },

    /**
     * Validate email format
     */
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate password strength
     */
    isValidPassword: (password) => {
        return password.length >= 6;
    },

    /**
     * Register a new user
     */
    register: (username, email, password, accountType = 'student') => {
        // Validation
        if (!username || username.length < 3) {
            return { success: false, error: 'Username must be at least 3 characters' };
        }
        
        if (!Auth.isValidEmail(email)) {
            return { success: false, error: 'Please enter a valid email address' };
        }
        
        if (!Auth.isValidPassword(password)) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }
        
        if (!['student', 'teacher'].includes(accountType)) {
            return { success: false, error: 'Invalid account type' };
        }

        const users = Auth.getUsers();
        const normalizedEmail = email.toLowerCase().trim();

        // Check if email already exists
        if (users[normalizedEmail]) {
            return { success: false, error: 'An account with this email already exists' };
        }

        // Check if username is taken
        const usernameTaken = Object.values(users).some(u => 
            u.username.toLowerCase() === username.toLowerCase()
        );
        if (usernameTaken) {
            return { success: false, error: 'This username is already taken' };
        }

        // Create user
        const newUser = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            username: username.trim(),
            email: normalizedEmail,
            passwordHash: Auth.hashPassword(password),
            accountType: accountType,
            createdAt: new Date().toISOString(),
            profile: {
                xp: 0,
                level: 1,
                totalCorrect: 0,
                totalAnswered: 0,
                achievements: [],
                streak: 0,
                lastActive: new Date().toISOString()
            },
            // Teacher-specific fields
            ...(accountType === 'teacher' ? {
                classrooms: [],
                school: ''
            } : {}),
            // Student-specific fields
            ...(accountType === 'student' ? {
                joinedClassrooms: []
            } : {})
        };

        users[normalizedEmail] = newUser;
        Auth.saveUsers(users);

        // Auto-login after registration
        Auth.createSession(newUser);

        return { success: true, user: newUser };
    },

    /**
     * Login user
     */
    login: (email, password) => {
        if (!email || !password) {
            return { success: false, error: 'Please enter email and password' };
        }

        const users = Auth.getUsers();
        const normalizedEmail = email.toLowerCase().trim();
        const user = users[normalizedEmail];

        if (!user) {
            return { success: false, error: 'No account found with this email' };
        }

        if (user.passwordHash !== Auth.hashPassword(password)) {
            return { success: false, error: 'Incorrect password' };
        }

        // Update last active
        user.profile.lastActive = new Date().toISOString();
        Auth.saveUsers(users);

        // Create session
        Auth.createSession(user);

        return { success: true, user };
    },

    /**
     * Create session
     */
    createSession: (user) => {
        const session = {
            userId: user.id,
            email: user.email,
            username: user.username,
            accountType: user.accountType || 'student',
            loginTime: new Date().toISOString(),
            rememberMe: true
        };
        // Store in both localStorage (persistent) and sessionStorage (backup)
        localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(session));
        sessionStorage.setItem(Auth.SESSION_KEY, JSON.stringify(session));
    },

    /**
     * Get current session
     */
    getSession: () => {
        try {
            // Try localStorage first, then sessionStorage
            let session = localStorage.getItem(Auth.SESSION_KEY);
            if (!session) {
                session = sessionStorage.getItem(Auth.SESSION_KEY);
                // If found in session, copy to localStorage
                if (session) {
                    localStorage.setItem(Auth.SESSION_KEY, session);
                }
            }
            return session ? JSON.parse(session) : null;
        } catch {
            return null;
        }
    },

    /**
     * Check if user is logged in
     */
    isLoggedIn: () => {
        return Auth.getSession() !== null;
    },

    /**
     * Get current user
     */
    getCurrentUser: () => {
        const session = Auth.getSession();
        if (!session) return null;

        const users = Auth.getUsers();
        return users[session.email] || null;
    },

    /**
     * Logout user
     */
    logout: () => {
        localStorage.removeItem(Auth.SESSION_KEY);
        // Reset app state
        if (typeof AppState !== 'undefined') {
            AppState.resetState();
        }
    },

    /**
     * Update user profile
     */
    updateProfile: (updates) => {
        const session = Auth.getSession();
        if (!session) return false;

        const users = Auth.getUsers();
        const user = users[session.email];
        
        if (!user) return false;

        // Merge profile updates
        user.profile = { ...user.profile, ...updates };
        Auth.saveUsers(users);

        return true;
    },

    /**
     * Get user profile
     */
    getProfile: () => {
        const user = Auth.getCurrentUser();
        return user ? user.profile : null;
    },

    /**
     * Save user progress (syncs with AppState)
     */
    saveProgress: (state) => {
        const session = Auth.getSession();
        if (!session) return false;

        const users = Auth.getUsers();
        const user = users[session.email];
        
        if (!user) return false;

        user.profile = {
            xp: state.xp || 0,
            level: state.level || 1,
            totalCorrect: state.totalCorrect || 0,
            totalAnswered: state.totalAnswered || 0,
            achievements: state.achievements || [],
            streak: state.streak || 0,
            lastActive: new Date().toISOString()
        };

        Auth.saveUsers(users);
        return true;
    },

    /**
     * Delete account
     */
    deleteAccount: (password) => {
        const session = Auth.getSession();
        if (!session) return { success: false, error: 'Not logged in' };

        const users = Auth.getUsers();
        const user = users[session.email];

        if (!user) return { success: false, error: 'User not found' };

        if (user.passwordHash !== Auth.hashPassword(password)) {
            return { success: false, error: 'Incorrect password' };
        }

        delete users[session.email];
        Auth.saveUsers(users);
        Auth.logout();

        return { success: true };
    },

    /**
     * Change password
     */
    changePassword: (currentPassword, newPassword) => {
        const session = Auth.getSession();
        if (!session) return { success: false, error: 'Not logged in' };

        const users = Auth.getUsers();
        const user = users[session.email];

        if (!user) return { success: false, error: 'User not found' };

        if (user.passwordHash !== Auth.hashPassword(currentPassword)) {
            return { success: false, error: 'Current password is incorrect' };
        }

        if (!Auth.isValidPassword(newPassword)) {
            return { success: false, error: 'New password must be at least 6 characters' };
        }

        user.passwordHash = Auth.hashPassword(newPassword);
        Auth.saveUsers(users);

        return { success: true };
    },
    
    /**
     * Check if current user is a teacher
     */
    isTeacher: () => {
        const session = Auth.getSession();
        return session?.accountType === 'teacher';
    },
    
    /**
     * Check if current user is a student
     */
    isStudent: () => {
        const session = Auth.getSession();
        return session?.accountType === 'student';
    },
    
    /**
     * Get account type
     */
    getAccountType: () => {
        const session = Auth.getSession();
        return session?.accountType || 'student';
    },
    
    /**
     * Get user by ID
     */
    getUserById: (userId) => {
        const users = Auth.getUsers();
        return Object.values(users).find(u => u.id === userId) || null;
    },
    
    /**
     * Update user data directly
     */
    updateUser: (email, updates) => {
        const users = Auth.getUsers();
        if (users[email]) {
            users[email] = { ...users[email], ...updates };
            Auth.saveUsers(users);
            return true;
        }
        return false;
    }
};
