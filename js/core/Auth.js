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
    
    // Session config
    SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    SESSION_REFRESH_THRESHOLD: 30 * 60 * 1000, // Refresh if less than 30 min remaining
    
    /**
     * Initialize auth module
     */
    init: () => {
        console.log('🔐 Auth module initialized');
        // Ensure users storage exists
        try {
            if (!localStorage.getItem(Auth.USERS_KEY)) {
                localStorage.setItem(Auth.USERS_KEY, JSON.stringify({}));
            }
            // Validate existing session on init
            Auth.validateSession();
        } catch (error) {
            console.error('Failed to initialize Auth storage:', error);
        }
    },

    /**
     * Generate a cryptographically secure session token
     */
    generateSessionToken: () => {
        try {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        } catch (error) {
            console.warn('crypto.getRandomValues not available, using fallback');
            let token = '';
            for (let i = 0; i < 64; i++) {
                token += Math.floor(Math.random() * 16).toString(16);
            }
            return token;
        }
    },

    /**
     * Get all registered users
     */
    getUsers: () => {
        try {
            const data = localStorage.getItem(Auth.USERS_KEY);
            if (!data) return {};
            const parsed = JSON.parse(data);
            return typeof parsed === 'object' && parsed !== null ? parsed : {};
        } catch (error) {
            console.error('Error loading users:', error);
            return {};
        }
    },

    /**
     * Save users to storage
     */
    saveUsers: (users) => {
        if (!users || typeof users !== 'object') {
            console.error('Invalid users data');
            return false;
        }
        try {
            localStorage.setItem(Auth.USERS_KEY, JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Error saving users:', error);
            return false;
        }
    },

    /**
     * Generate a random salt for password hashing
     */
    generateSalt: () => {
        try {
            const array = new Uint8Array(16);
            crypto.getRandomValues(array);
            return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        } catch (error) {
            // Fallback for older browsers
            console.warn('crypto.getRandomValues not available, using fallback');
            let salt = '';
            for (let i = 0; i < 32; i++) {
                salt += Math.floor(Math.random() * 16).toString(16);
            }
            return salt;
        }
    },

    /**
     * Hash password using SHA-256 with Web Crypto API
     * @param {string} password - The password to hash
     * @param {string} salt - The salt to use (generates new one if not provided)
     * @returns {Promise<{hash: string, salt: string}>}
     */
    hashPassword: async (password, salt = null) => {
        if (!password || typeof password !== 'string') {
            throw new Error('Invalid password');
        }
        
        if (!salt) {
            salt = Auth.generateSalt();
        }
        
        try {
            const data = new TextEncoder().encode(password + salt);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            return { hash, salt };
        } catch (error) {
            console.error('Error hashing password:', error);
            // Fallback to legacy hash if Web Crypto fails
            return { hash: Auth.legacyHashPassword(password + salt), salt };
        }
    },

    /**
     * Verify password against stored hash
     * @param {string} password - The password to verify
     * @param {string} storedHash - The stored hash
     * @param {string} salt - The salt used for hashing
     * @returns {Promise<boolean>}
     */
    verifyPassword: async (password, storedHash, salt) => {
        if (!password || !storedHash) return false;
        
        try {
            const { hash } = await Auth.hashPassword(password, salt);
            return hash === storedHash;
        } catch (error) {
            console.error('Error verifying password:', error);
            return false;
        }
    },

    /**
     * Legacy hash function for backward compatibility with old accounts
     * DO NOT USE FOR NEW PASSWORDS - use hashPassword() instead
     */
    legacyHashPassword: (password) => {
        if (!password || typeof password !== 'string') return '';
        
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
        if (!email || typeof email !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    },

    /**
     * Validate password strength (min 8 chars, at least 1 number)
     */
    isValidPassword: (password) => {
        if (!password || typeof password !== 'string') return false;
        if (password.length < 8) return false;
        if (!/\d/.test(password)) return false;
        return true;
    },

    /**
     * Sanitize username (alphanumeric + underscore only, max 20 chars)
     */
    sanitizeUsername: (username) => {
        if (!username || typeof username !== 'string') return '';
        // Remove any characters that aren't alphanumeric or underscore
        return username.replace(/[^a-zA-Z0-9_]/g, '').substring(0, 20);
    },

    /**
     * Validate username format
     */
    isValidUsername: (username) => {
        if (!username || typeof username !== 'string') return false;
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
            const data = localStorage.getItem(Auth.RATE_LIMIT_KEY);
            if (!data) return {};
            const parsed = JSON.parse(data);
            return typeof parsed === 'object' && parsed !== null ? parsed : {};
        } catch (error) {
            console.error('Error loading rate limit data:', error);
            return {};
        }
    },

    /**
     * Save rate limit data
     */
    saveRateLimitData: (data) => {
        if (!data || typeof data !== 'object') return false;
        try {
            localStorage.setItem(Auth.RATE_LIMIT_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving rate limit data:', error);
            return false;
        }
    },

    /**
     * Check if account is locked due to failed attempts
     */
    isAccountLocked: (email) => {
        if (!email || typeof email !== 'string') return false;
        
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
        if (!email || typeof email !== 'string') return 0;
        
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
        if (!email || typeof email !== 'string') return;
        
        const data = Auth.getRateLimitData();
        const normalizedEmail = email.toLowerCase().trim();
        delete data[normalizedEmail];
        Auth.saveRateLimitData(data);
    },

    /**
     * Get remaining lockout time in minutes
     */
    getRemainingLockoutTime: (email) => {
        if (!email || typeof email !== 'string') return 0;
        
        const data = Auth.getRateLimitData();
        const normalizedEmail = email.toLowerCase().trim();
        const record = data[normalizedEmail];
        
        if (!record || !record.lockedUntil) return 0;
        
        const remaining = record.lockedUntil - Date.now();
        return Math.max(0, Math.ceil(remaining / 60000)); // Convert to minutes
    },

    /**
     * Register a new user
     */
    register: async (username, email, password, accountType = 'student') => {
        try {
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
                u && u.username && u.username.toLowerCase() === sanitizedUsername.toLowerCase()
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
            if (!Auth.saveUsers(users)) {
                return { success: false, error: 'Failed to save user data' };
            }

            // Auto-login after registration
            Auth.createSession(newUser);

            return { success: true, user: newUser };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'An error occurred during registration' };
        }
    },

    /**
     * Login user
     */
    login: async (email, password) => {
        try {
            if (!email || !password) {
                return { success: false, error: 'Please enter email and password' };
            }

            const normalizedEmail = (email + '').toLowerCase().trim();

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
            } else if (user.passwordHash) {
                // Old format - simple hash (for backward compatibility)
                const oldHash = Auth.legacyHashPassword(password);
                isValid = (oldHash === user.passwordHash);
                
                // If valid, upgrade to new hash format
                if (isValid) {
                    try {
                        const { hash, salt } = await Auth.hashPassword(password);
                        user.passwordHash = hash;
                        user.passwordSalt = salt;
                        Auth.saveUsers(users);
                        console.log('🔐 Password upgraded to new secure format');
                    } catch (e) {
                        console.warn('Failed to upgrade password format:', e);
                    }
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
            if (!user.profile) {
                user.profile = {};
            }
            user.profile.lastActive = new Date().toISOString();
            Auth.saveUsers(users);

            // Create session
            Auth.createSession(user);

            return { success: true, user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'An error occurred during login' };
        }
    },

    /**
     * Create session with secure token and expiry
     */
    createSession: (user) => {
        if (!user || !user.email) {
            console.error('Invalid user for session creation');
            return false;
        }
        
        try {
            const now = Date.now();
            const sessionToken = Auth.generateSessionToken();
            const session = {
                userId: user.id || '',
                email: user.email,
                username: user.username || 'User',
                accountType: user.accountType || 'student',
                loginTime: new Date().toISOString(),
                createdAt: now,
                expiresAt: now + Auth.SESSION_DURATION,
                sessionToken: sessionToken,
                rememberMe: true
            };
            
            // Store session token hash in user record for validation
            const users = Auth.getUsers();
            if (users[user.email]) {
                users[user.email].activeSessionToken = sessionToken;
                users[user.email].sessionCreatedAt = now;
                Auth.saveUsers(users);
            }
            
            localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(session));
            return true;
        } catch (error) {
            console.error('Error creating session:', error);
            return false;
        }
    },

    /**
     * Validate session integrity and expiry
     */
    validateSession: () => {
        try {
            const sessionData = localStorage.getItem(Auth.SESSION_KEY);
            if (!sessionData) return null;
            
            const session = JSON.parse(sessionData);
            if (!session || typeof session !== 'object') {
                Auth.clearSessionData();
                return null;
            }
            
            const now = Date.now();
            
            // Check session expiry
            if (session.expiresAt && now > session.expiresAt) {
                console.log('🔐 Session expired');
                Auth.clearSessionData();
                return null;
            }
            
            // Validate session token against stored user record
            if (session.email && session.sessionToken) {
                const users = Auth.getUsers();
                const user = users[session.email];
                if (!user || user.activeSessionToken !== session.sessionToken) {
                    console.log('🔐 Session token invalid (possibly logged in elsewhere)');
                    Auth.clearSessionData();
                    return null;
                }
            }
            
            // Refresh session if close to expiry
            if (session.expiresAt && (session.expiresAt - now) < Auth.SESSION_REFRESH_THRESHOLD) {
                session.expiresAt = now + Auth.SESSION_DURATION;
                localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(session));
                console.log('🔐 Session refreshed');
            }
            
            return session;
        } catch (error) {
            console.error('Error validating session:', error);
            Auth.clearSessionData();
            return null;
        }
    },

    /**
     * Get current session (with validation)
     */
    getSession: () => {
        return Auth.validateSession();
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
        if (!session || !session.email) return null;

        const users = Auth.getUsers();
        return users[session.email] || null;
    },

    /**
     * Clear all session-related data from storage
     */
    clearSessionData: () => {
        try {
            // Clear from localStorage
            localStorage.removeItem(Auth.SESSION_KEY);
            // Clear from sessionStorage as fallback
            sessionStorage.removeItem(Auth.SESSION_KEY);
            // Clear any cached auth data
            sessionStorage.removeItem('csmaster_auth_cache');
        } catch (error) {
            console.error('Error clearing session data:', error);
        }
    },

    /**
     * Logout user - comprehensive cleanup
     */
    logout: () => {
        try {
            // Get session before clearing to invalidate server-side token
            const session = Auth.getSession();
            
            // Invalidate session token in user record
            if (session && session.email) {
                const users = Auth.getUsers();
                if (users[session.email]) {
                    delete users[session.email].activeSessionToken;
                    delete users[session.email].sessionCreatedAt;
                    Auth.saveUsers(users);
                }
            }
            
            // Clear all session data
            Auth.clearSessionData();
            
            // Clear any sensitive cached data
            sessionStorage.clear();
            
            // Reset app state
            if (typeof AppState !== 'undefined' && typeof AppState.resetState === 'function') {
                AppState.resetState();
            }
            
            console.log('🔐 Logout complete');
            return true;
        } catch (error) {
            console.error('Error during logout:', error);
            // Force clear even on error
            try {
                localStorage.removeItem(Auth.SESSION_KEY);
                sessionStorage.clear();
            } catch (e) {
                // Ignore
            }
            return false;
        }
    },

    /**
     * Update user profile
     */
    updateProfile: (updates) => {
        if (!updates || typeof updates !== 'object') return false;
        
        const session = Auth.getSession();
        if (!session || !session.email) return false;

        try {
            const users = Auth.getUsers();
            const user = users[session.email];
            
            if (!user) return false;

            // Ensure profile exists
            if (!user.profile) {
                user.profile = {};
            }

            // Merge profile updates
            user.profile = { ...user.profile, ...updates };
            return Auth.saveUsers(users);
        } catch (error) {
            console.error('Error updating profile:', error);
            return false;
        }
    },

    /**
     * Get user profile
     */
    getProfile: () => {
        const user = Auth.getCurrentUser();
        return user && user.profile ? user.profile : null;
    },

    /**
     * Save user progress (syncs with AppState)
     */
    saveProgress: (state) => {
        if (!state || typeof state !== 'object') return false;
        
        const session = Auth.getSession();
        if (!session || !session.email) return false;

        try {
            const users = Auth.getUsers();
            const user = users[session.email];
            
            if (!user) return false;

            user.profile = {
                xp: state.xp || 0,
                level: state.level || 1,
                totalCorrect: state.totalCorrect || 0,
                totalAnswered: state.totalAnswered || 0,
                achievements: Array.isArray(state.achievements) ? state.achievements : [],
                streak: state.streak || 0,
                lastActive: new Date().toISOString()
            };

            return Auth.saveUsers(users);
        } catch (error) {
            console.error('Error saving progress:', error);
            return false;
        }
    },

    /**
     * Delete account
     */
    deleteAccount: async (password) => {
        try {
            const session = Auth.getSession();
            if (!session || !session.email) {
                return { success: false, error: 'Not logged in' };
            }

            const users = Auth.getUsers();
            const user = users[session.email];

            if (!user) {
                return { success: false, error: 'User not found' };
            }

            if (!user.passwordHash || !user.passwordSalt) {
                return { success: false, error: 'Invalid account state' };
            }

            const isValid = await Auth.verifyPassword(password, user.passwordHash, user.passwordSalt);
            if (!isValid) {
                return { success: false, error: 'Incorrect password' };
            }

            delete users[session.email];
            Auth.saveUsers(users);
            Auth.logout();

            return { success: true };
        } catch (error) {
            console.error('Error deleting account:', error);
            return { success: false, error: 'An error occurred while deleting account' };
        }
    },

    /**
     * Change password (invalidates all other sessions)
     */
    changePassword: async (currentPassword, newPassword) => {
        try {
            const session = Auth.getSession();
            if (!session || !session.email) {
                return { success: false, error: 'Not logged in' };
            }

            const users = Auth.getUsers();
            const user = users[session.email];

            if (!user) {
                return { success: false, error: 'User not found' };
            }

            if (!user.passwordHash || !user.passwordSalt) {
                return { success: false, error: 'Invalid account state' };
            }

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
            user.passwordChangedAt = Date.now();
            
            // Invalidate all sessions by clearing active token
            delete user.activeSessionToken;
            delete user.sessionCreatedAt;
            
            Auth.saveUsers(users);
            
            // Create new session for current user
            Auth.createSession(user);

            return { success: true };
        } catch (error) {
            console.error('Error changing password:', error);
            return { success: false, error: 'An error occurred while changing password' };
        }
    },
    
    /**
     * Check if current user is a teacher
     */
    isTeacher: () => {
        const session = Auth.getSession();
        return session && session.accountType === 'teacher';
    },
    
    /**
     * Check if current user is a student
     */
    isStudent: () => {
        const session = Auth.getSession();
        return session && session.accountType === 'student';
    },
    
    /**
     * Get account type
     */
    getAccountType: () => {
        const session = Auth.getSession();
        return session && session.accountType ? session.accountType : 'student';
    },
    
    /**
     * Get user by ID
     */
    getUserById: (userId) => {
        if (!userId) return null;
        
        try {
            const users = Auth.getUsers();
            return Object.values(users).find(u => u && u.id === userId) || null;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            return null;
        }
    },
    
    /**
     * Update user data directly
     */
    updateUser: (email, updates) => {
        if (!email || !updates || typeof updates !== 'object') return false;
        
        try {
            const users = Auth.getUsers();
            const normalizedEmail = email.toLowerCase().trim();
            
            if (users[normalizedEmail]) {
                users[normalizedEmail] = { ...users[normalizedEmail], ...updates };
                return Auth.saveUsers(users);
            }
            return false;
        } catch (error) {
            console.error('Error updating user:', error);
            return false;
        }
    }
};
