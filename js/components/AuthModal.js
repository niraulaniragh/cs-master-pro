/**
 * AuthModal.js - Login/Signup Modal Component
 * Handles user authentication UI with proper validation and security
 */

const AuthModal = {
    isOpen: false,
    mode: 'login', // 'login' or 'signup'
    selectedAccountType: 'student', // 'student' or 'teacher'
    boundEventHandlers: new Map(), // Track event handlers for cleanup
    escapeHandler: null,

    /**
     * Sanitize text for safe display
     * @param {string} text - Text to sanitize
     * @returns {string} Sanitized text
     */
    escapeHtml: (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid
     */
    isValidEmail: (email) => {
        if (!email || typeof email !== 'string') return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    },

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {Object} Validation result with isValid and message
     */
    validatePassword: (password) => {
        if (!password) {
            return { isValid: false, message: 'Password is required' };
        }
        if (password.length < 6) {
            return { isValid: false, message: 'Password must be at least 6 characters' };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Validate username
     * @param {string} username - Username to validate
     * @returns {Object} Validation result with isValid and message
     */
    validateUsername: (username) => {
        if (!username || typeof username !== 'string') {
            return { isValid: false, message: 'Username is required' };
        }
        const trimmed = username.trim();
        if (trimmed.length < 3) {
            return { isValid: false, message: 'Username must be at least 3 characters' };
        }
        if (trimmed.length > 30) {
            return { isValid: false, message: 'Username must be less than 30 characters' };
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
            return { isValid: false, message: 'Username can only contain letters, numbers, underscores, and hyphens' };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Show the auth modal
     * @param {string} [mode='login'] - Mode: 'login' or 'signup'
     */
    show: (mode = 'login') => {
        try {
            AuthModal.mode = mode === 'signup' ? 'signup' : 'login';
            AuthModal.isOpen = true;
            AuthModal.selectedAccountType = 'student';
            AuthModal.render();
            document.body.classList.add('modal-open');
            
            // Add escape key handler
            AuthModal.escapeHandler = (e) => {
                if (e.key === 'Escape' && AuthModal.isOpen) {
                    AuthModal.hide();
                }
            };
            document.addEventListener('keydown', AuthModal.escapeHandler);
        } catch (error) {
            console.error('AuthModal: Error showing modal', error);
        }
    },

    /**
     * Hide the auth modal
     */
    hide: () => {
        try {
            AuthModal.isOpen = false;
            
            // Remove escape handler
            if (AuthModal.escapeHandler) {
                document.removeEventListener('keydown', AuthModal.escapeHandler);
                AuthModal.escapeHandler = null;
            }

            // Cleanup event handlers
            AuthModal.boundEventHandlers.forEach((handler, element) => {
                if (element && element.removeEventListener) {
                    element.removeEventListener('click', handler);
                    element.removeEventListener('submit', handler);
                }
            });
            AuthModal.boundEventHandlers.clear();

            // Remove modal element
            const modal = document.getElementById('auth-modal');
            if (modal) {
                modal.remove();
            }
            document.body.classList.remove('modal-open');
        } catch (error) {
            console.error('AuthModal: Error hiding modal', error);
        }
    },

    /**
     * Switch between login and signup modes
     * @param {string} mode - Mode: 'login' or 'signup'
     */
    switchMode: (mode) => {
        if (mode !== 'login' && mode !== 'signup') {
            console.warn('AuthModal: Invalid mode', mode);
            return;
        }
        AuthModal.mode = mode;
        AuthModal.render();
    },

    /**
     * Select account type
     * @param {string} type - Type: 'student' or 'teacher'
     */
    selectAccountType: (type) => {
        if (type !== 'student' && type !== 'teacher') {
            console.warn('AuthModal: Invalid account type', type);
            return;
        }
        AuthModal.selectedAccountType = type;
        
        const buttons = document.querySelectorAll('.account-type-btn');
        buttons.forEach(btn => {
            const btnType = btn.dataset.type;
            btn.classList.toggle('active', btnType === type);
        });
    },

    /**
     * Render the modal
     */
    render: () => {
        try {
            // Remove existing modal
            const existingModal = document.getElementById('auth-modal');
            if (existingModal) {
                existingModal.remove();
            }

            const isLogin = AuthModal.mode === 'login';
            const isStudentSelected = AuthModal.selectedAccountType === 'student';

            const modalHTML = `
                <div class="auth-modal-overlay" id="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
                    <div class="auth-modal">
                        <button class="auth-modal-close" aria-label="Close" type="button">&times;</button>
                        <div class="auth-header">
                            <div class="auth-logo">🎓</div>
                            <h2 id="auth-modal-title">CS Master Pro</h2>
                            <p class="auth-subtitle">${isLogin ? 'Welcome back!' : 'Create your account'}</p>
                        </div>
                        
                        <div class="auth-tabs" role="tablist">
                            <button class="auth-tab ${isLogin ? 'active' : ''}" 
                                    role="tab" aria-selected="${isLogin}" data-mode="login" type="button">
                                Log In
                            </button>
                            <button class="auth-tab ${!isLogin ? 'active' : ''}"
                                    role="tab" aria-selected="${!isLogin}" data-mode="signup" type="button">
                                Sign Up
                            </button>
                        </div>
                        
                        <form class="auth-form" id="auth-form" novalidate>
                            ${!isLogin ? `
                                <div class="auth-field account-type-field">
                                    <label id="account-type-label">I am a...</label>
                                    <div class="account-type-selector" role="group" aria-labelledby="account-type-label">
                                        <button type="button" class="account-type-btn ${isStudentSelected ? 'active' : ''}" 
                                                data-type="student" aria-pressed="${isStudentSelected}">
                                            <span class="type-icon">🎒</span>
                                            <span class="type-label">Student</span>
                                            <span class="type-desc">Learn & practice</span>
                                        </button>
                                        <button type="button" class="account-type-btn ${!isStudentSelected ? 'active' : ''}"
                                                data-type="teacher" aria-pressed="${!isStudentSelected}">
                                            <span class="type-icon">👩‍🏫</span>
                                            <span class="type-label">Teacher</span>
                                            <span class="type-desc">Create classrooms & host games</span>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="auth-field">
                                    <label for="auth-username">Username</label>
                                    <input type="text" id="auth-username" name="username" 
                                           placeholder="Choose a username" required minlength="3" maxlength="30"
                                           autocomplete="username" pattern="[a-zA-Z0-9_-]+">
                                    <span class="field-hint">3-30 characters, letters, numbers, underscores</span>
                                </div>
                            ` : ''}
                            
                            <div class="auth-field">
                                <label for="auth-email">Email</label>
                                <input type="email" id="auth-email" name="email" 
                                       placeholder="Enter your email" required
                                       autocomplete="email">
                            </div>
                            
                            <div class="auth-field">
                                <label for="auth-password">Password</label>
                                <div class="password-input-wrapper">
                                    <input type="password" id="auth-password" name="password" 
                                           placeholder="${!isLogin ? 'Create a password' : 'Enter your password'}" 
                                           required minlength="6"
                                           autocomplete="${!isLogin ? 'new-password' : 'current-password'}">
                                    <button type="button" class="toggle-password" aria-label="Toggle password visibility">
                                        👁️
                                    </button>
                                </div>
                                ${!isLogin ? '<span class="field-hint">At least 6 characters</span>' : ''}
                            </div>
                            
                            ${!isLogin ? `
                                <div class="auth-field">
                                    <label for="auth-confirm-password">Confirm Password</label>
                                    <input type="password" id="auth-confirm-password" name="confirmPassword" 
                                           placeholder="Confirm your password" required minlength="6"
                                           autocomplete="new-password">
                                </div>
                            ` : ''}
                            
                            <div class="auth-error hidden" id="auth-error" role="alert" aria-live="assertive"></div>
                            
                            <button type="submit" class="auth-submit-btn">
                                ${isLogin ? 'Log In' : 'Create Account'}
                            </button>
                        </form>
                        
                        <div class="auth-footer">
                            ${isLogin ? `
                                <p>Don't have an account? <a href="#" class="auth-switch-link" data-mode="signup">Sign up</a></p>
                            ` : `
                                <p>Already have an account? <a href="#" class="auth-switch-link" data-mode="login">Log in</a></p>
                            `}
                        </div>
                        
                        <div class="auth-features">
                            <div class="feature">
                                <span>📊</span>
                                <span>Track your progress</span>
                            </div>
                            <div class="feature">
                                <span>🏆</span>
                                <span>Earn achievements</span>
                            </div>
                            <div class="feature">
                                <span>📱</span>
                                <span>Sync across devices</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
            AuthModal.attachEventListeners();

            // Focus first input
            setTimeout(() => {
                const firstInput = document.querySelector('.auth-form input');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);

        } catch (error) {
            console.error('AuthModal: Error rendering modal', error);
        }
    },

    /**
     * Attach event listeners to modal elements
     */
    attachEventListeners: () => {
        try {
            const modal = document.getElementById('auth-modal');
            if (!modal) return;

            // Close button
            const closeBtn = modal.querySelector('.auth-modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', AuthModal.hide);
            }

            // Overlay click to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    AuthModal.hide();
                }
            });

            // Tab switching
            const tabs = modal.querySelectorAll('.auth-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const mode = tab.dataset.mode;
                    if (mode) AuthModal.switchMode(mode);
                });
            });

            // Switch links
            const switchLinks = modal.querySelectorAll('.auth-switch-link');
            switchLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const mode = link.dataset.mode;
                    if (mode) AuthModal.switchMode(mode);
                });
            });

            // Account type buttons
            const accountTypeBtns = modal.querySelectorAll('.account-type-btn');
            accountTypeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const type = btn.dataset.type;
                    if (type) AuthModal.selectAccountType(type);
                });
            });

            // Password toggle
            const toggleBtn = modal.querySelector('.toggle-password');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', AuthModal.togglePassword);
            }

            // Form submission
            const form = modal.querySelector('#auth-form');
            if (form) {
                form.addEventListener('submit', AuthModal.handleSubmit);
            }

        } catch (error) {
            console.error('AuthModal: Error attaching event listeners', error);
        }
    },

    /**
     * Toggle password visibility
     */
    togglePassword: () => {
        try {
            const passwordInput = document.getElementById('auth-password');
            const confirmInput = document.getElementById('auth-confirm-password');

            if (!passwordInput) return;

            const newType = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = newType;
            
            if (confirmInput) {
                confirmInput.type = newType;
            }
        } catch (error) {
            console.error('AuthModal: Error toggling password', error);
        }
    },

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError: (message) => {
        const errorEl = document.getElementById('auth-error');
        if (errorEl) {
            errorEl.textContent = AuthModal.escapeHtml(message || 'An error occurred');
            errorEl.classList.remove('hidden');
        }
    },

    /**
     * Hide error message
     */
    hideError: () => {
        const errorEl = document.getElementById('auth-error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
        }
    },

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    handleSubmit: async (event) => {
        event.preventDefault();
        AuthModal.hideError();

        try {
            const form = event.target;
            if (!form) return;

            const email = (form.email?.value || '').trim();
            const password = form.password?.value || '';

            // Validate email
            if (!AuthModal.isValidEmail(email)) {
                AuthModal.showError('Please enter a valid email address');
                return;
            }

            // Validate password
            const passwordValidation = AuthModal.validatePassword(password);
            if (!passwordValidation.isValid) {
                AuthModal.showError(passwordValidation.message);
                return;
            }

            if (AuthModal.mode === 'signup') {
                const username = (form.username?.value || '').trim();
                const confirmPassword = form.confirmPassword?.value || '';

                // Validate username
                const usernameValidation = AuthModal.validateUsername(username);
                if (!usernameValidation.isValid) {
                    AuthModal.showError(usernameValidation.message);
                    return;
                }

                // Check passwords match
                if (password !== confirmPassword) {
                    AuthModal.showError('Passwords do not match');
                    return;
                }

                // Attempt registration
                if (typeof Auth === 'undefined' || !Auth.register) {
                    AuthModal.showError('Authentication service unavailable');
                    return;
                }

                const result = await Auth.register(username, email, password, AuthModal.selectedAccountType);

                if (result && result.success) {
                    AuthModal.hide();
                    const displayName = (typeof Helpers !== 'undefined' && Helpers.escapeHtml) 
                        ? Helpers.escapeHtml(result.user?.username || username)
                        : AuthModal.escapeHtml(result.user?.username || username);
                    const welcome = AuthModal.selectedAccountType === 'teacher'
                        ? `Welcome, ${displayName}! 👩‍🏫 You can now create classrooms!`
                        : `Welcome, ${displayName}! 🎉`;
                    
                    if (typeof Toast !== 'undefined') {
                        Toast.show(welcome, 'success');
                    }
                    
                    // Reload app to show authenticated state
                    if (typeof App !== 'undefined' && App.init) {
                        App.init();
                    }
                } else {
                    AuthModal.showError(result?.error || 'Registration failed');
                }
            } else {
                // Attempt login
                if (typeof Auth === 'undefined' || !Auth.login) {
                    AuthModal.showError('Authentication service unavailable');
                    return;
                }

                const result = await Auth.login(email, password);

                if (result && result.success) {
                    AuthModal.hide();
                    const displayName = (typeof Helpers !== 'undefined' && Helpers.escapeHtml)
                        ? Helpers.escapeHtml(result.user?.username || 'User')
                        : AuthModal.escapeHtml(result.user?.username || 'User');
                    
                    if (typeof Toast !== 'undefined') {
                        Toast.show(`Welcome back, ${displayName}! 👋`, 'success');
                    }
                    
                    // Reload app with user's progress
                    if (typeof App !== 'undefined' && App.init) {
                        App.init();
                    }
                } else {
                    AuthModal.showError(result?.error || 'Login failed');
                }
            }
        } catch (error) {
            console.error('AuthModal: Submit error', error);
            AuthModal.showError('An unexpected error occurred. Please try again.');
        }
    }
};
