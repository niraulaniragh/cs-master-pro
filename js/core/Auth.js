/**
 * Auth.js - Authentication Module
 * Handles user registration, login, logout, and session management
 * Uses localStorage for persistence (suitable for static site)
 */

const Auth = {
    // Storage keys
    USERS_KEY: 'csmaster_users',
    SESSION_KEY: 'csmaster_session',
    RATE_LIMIT_KEY: 'csmaster_rate_limit',
    
    // Rate limiting config
    MAX_FAILED_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes in milliseconds
    
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
     * Generate a random salt for password hashing
     */
    generateSalt: () => {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Hash password using SHA-256 with Web Crypto API
     * @param {string} password - The password to hash
     * @param {string} salt - The salt to use (generates new one if not provided)
     * @returns {Promise<{hash: string, salt: string}>}
     */
    hashPassword: async (password, salt = null) => {
        if (!salt) {
            salt = Auth.generateSalt();
        }
        const data = new TextEncoder().encode(password + salt);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return { hash, salt };
    },

    /**
     * Verify password against stored hash
     * @param {string} password - The password to verify
     * @param {string} storedHash - The stored hash
     * @param {string} salt - The salt used for hashing
     * @returns {Promise<boolean>}
     */
    verifyPassword: async (password, storedHash, salt) => {
        const { hash } = await Auth.hashPassword(password, salt);
        return hash === storedHash;
    },

    /**
     * Legacy hash function for backward compatibility with old accounts
     * DO NOT USE FOR NEW PASSWORDS - use hashPassword() instead
     */
    legacyHashPassword: (password) => {
        let hash = 0;
        const str = password + 'CSMasterPro_2024';
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
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
     * Validate password strength (min 8 chars, at least 1 number)
     */
    isValidPassword: (password) => {
        if (password.length < 8) return false;
        if (!/\d/.test(password)) return false;
        return true;
    },

    /**
     * Sanitize username (alphanumeric + underscore only, max 20 chars)
     */
    sanitizeUsername: (username) => {
        if (!username) return '';
        // Remove any characters that aren't alphanumeric or underscore
        return username.replace(/[^a-zA-Z0-9_]/g, '').substring(0, 20);
    },

    /**
     * Validate username format
     */
    isValidUsername: (username) => {
        // Check length (3-20 characters)
        if (username.length < 3 || username.length > 20) return false;
        // Check format (alphanumeric + underscore only)
        if (!/^[a-zA-Z0-9_]+$/.test(username)) return false;
        return true;
    },

    /**
     * Get rate limit data for an email
     */
    getRateLimitData: () => {
        try {
            return JSON.parse(localStorage.getItem(Auth.RATE_LIMIT_KEY)) || {};
        } catch {
            return {};
        }
    },

    /**
     * Save rate limit data
     */
    saveRateLimitData: (data) => {
        localStorage.setItem(Auth.RATE_LIMIT_KEY, JSON.stringify(data));
    },

    /**
     * Check if account is locked due to failed attempts
     */
    isAccountLocked: (email) => {
        const data = Auth.getRateLimitData();
        const normalizedEmail = email.toLowerCase().trim();
        const record = data[normalizedEmail];
        
        if (!record) return false;
        
        // Check if lockout has expired
        if (record.lockedUntil && Date.now() > record.lockedUntil) {
            // Reset the record
            delete data[normalizedEmail];
            Auth.saveRateLimitData(data);
            return false;
        }
        
        return record.lockedUntil && Date.now() < record.lockedUntil;
    },

    /**
     * Record a failed login attempt
     */
    recordFailedAttempt: (email) => {
        const data = Auth.getRateLimitData();
        const normalizedEmail = email.toLowerCase().trim();
        
        if (!data[normalizedEmail]) {
            data[normalizedEmail] = { attempts: 0, lastAttempt: null, lockedUntil: null };
        }
        
        data[normalizedEmail].attempts++;
        data[normalizedEmail].lastAttempt = Date.now();
        
        // Lock account if too many attempts
        if (data[normalizedEmail].attempts >= Auth.MAX_FAILED_ATTEMPTS) {
            data[normalizedEmail].lockedUntil = Date.now() + Auth.LOCKOUT_DURATION;
        }
        
        Auth.saveRateLimitData(data);
        return data[normalizedEmail].attempts;
    },

    /**
     * Clear failed attempts on successful login
     */
    clearFailedAttempts: (email) => {
        const data = Auth.getRateLimitData();
        const normalizedEmail = email.toLowerCase().trim();
        delete data[normalizedEmail];
        Auth.saveRateLimitData(data);
    },

    /**
     * Get remaining lockout time in minutes
     */
    getRemainingLockoutTime: (email) => {
        const data = Auth.getRateLimitData();
        const normalizedEmail = email.toLowerCase().trim();
        const record = data[normalizedEmail];
        
        if (!record || !record.lockedUntil) return 0;
        
        const remaining = record.lockedUntil - Date.now();
        return Math.ceil(remaining / 60000); // Convert to minutes
    },

    /**
     * Register a new user
     */
    register: async (username, email, password, accountType = 'student') => {
        // Sanitize username
        const sanitizedUsername = Auth.sanitizeUsername(username);
        
        // Validation
        if (!Auth.isValidUsername(sanitizedUsername)) {
            return { success: false, error: 'Username must be 3-20 characters, alphanumeric and underscores only' };
        }
        
        if (!Auth.isValidEmail(email)) {
            return { success: false, error: 'Please enter a valid email address' };
        }
        
        if (!Auth.isValidPassword(password)) {
            return { success: false, error: 'Password must be at least 8 characters with at least 1 number' };
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
            u.username.toLowerCase() === sanitizedUsername.toLowerCase()
        );
        if (usernameTaken) {
            return { success: false, error: 'This username is already taken' };
        }

        // Hash password with salt
        const { hash, salt } = await Auth.hashPassword(password);

        // Create user
        const newUser = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
            username: sanitizedUsername,
            email: normalizedEmail,
            passwordHash: hash,
            passwordSalt: salt,
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
    login: async (email, password) => {
        if (!email || !password) {
            return { success: false, error: 'Please enter email and password' };
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check rate limiting
        if (Auth.isAccountLocked(normalizedEmail)) {
            const remaining = Auth.getRemainingLockoutTime(normalizedEmail);
            return { success: false, error: `Account temporarily locked. Try again in ${remaining} minute(s).` };
        }

        const users = Auth.getUsers();
        const user = users[normalizedEmail];

        if (!user) {
            Auth.recordFailedAttempt(normalizedEmail);
            return { success: false, error: 'No account found with this email' };
        }

        // Verify password - support both old and new hash formats
        let isValid = false;
        
        if (user.passwordSalt) {
            // New format with SHA-256 and salt
            isValid = await Auth.verifyPassword(password, user.passwordHash, user.passwordSalt);
        } else {
            // Old format - simple hash (for backward compatibility)
            const oldHash = Auth.legacyHashPassword(password);
            isValid = (oldHash === user.passwordHash);
            
            // If valid, upgrade to new hash format
            if (isValid) {
                const { hash, salt } = await Auth.hashPassword(password);
                user.passwordHash = hash;
                user.passwordSalt = salt;
                Auth.saveUsers(users);
                console.log('🔐 Password upgraded to new secure format');
            }
        }
        
        if (!isValid) {
            const attempts = Auth.recordFailedAttempt(normalizedEmail);
            const remaining = Auth.MAX_FAILED_ATTEMPTS - attempts;
            if (remaining > 0) {
                return { success: false, error: `Incorrect password. ${remaining} attempt(s) remaining.` };
            } else {
                const lockoutMins = Math.ceil(Auth.LOCKOUT_DURATION / 60000);
                return { success: false, error: `Too many failed attempts. Account locked for ${lockoutMins} minutes.` };
            }
        }

        // Clear failed attempts on successful login
        Auth.clearFailedAttempts(normalizedEmail);

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
        // Store only in localStorage to prevent desync
        localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(session));
    },

    /**
     * Get current session
     */
    getSession: () => {
        try {
            // Only check localStorage to prevent desync issues
            const session = localStorage.getItem(Auth.SESSION_KEY);
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
    deleteAccount: async (password) => {
        const session = Auth.getSession();
        if (!session) return { success: false, error: 'Not logged in' };

        const users = Auth.getUsers();
        const user = users[session.email];

        if (!user) return { success: false, error: 'User not found' };

        const isValid = await Auth.verifyPassword(password, user.passwordHash, user.passwordSalt);
        if (!isValid) {
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
    changePassword: async (currentPassword, newPassword) => {
        const session = Auth.getSession();
        if (!session) return { success: false, error: 'Not logged in' };

        const users = Auth.getUsers();
        const user = users[session.email];

        if (!user) return { success: false, error: 'User not found' };

        const isValid = await Auth.verifyPassword(currentPassword, user.passwordHash, user.passwordSalt);
        if (!isValid) {
            return { success: false, error: 'Current password is incorrect' };
        }

        if (!Auth.isValidPassword(newPassword)) {
            return { success: false, error: 'New password must be at least 8 characters with at least 1 number' };
        }

        // Hash new password with new salt
        const { hash, salt } = await Auth.hashPassword(newPassword);
        user.passwordHash = hash;
        user.passwordSalt = salt;
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
