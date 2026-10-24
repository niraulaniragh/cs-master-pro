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
    isSubmitting: false, // Prevent double submissions

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
     * @returns {Object} Validation result with isValid and message
     */
    validateEmail: (email) => {
        if (!email || typeof email !== 'string') {
            return { isValid: false, message: 'Email address is required' };
        }
        const trimmed = email.trim();
        if (trimmed.length === 0) {
            return { isValid: false, message: 'Email address is required' };
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            return { isValid: false, message: 'Please enter a valid email address (e.g., user@example.com)' };
        }
        if (trimmed.length > 254) {
            return { isValid: false, message: 'Email address is too long' };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Legacy email validation (kept for compatibility)
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid
     */
    isValidEmail: (email) => {
        return AuthModal.validateEmail(email).isValid;
    },

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @param {boolean} isSignup - Whether this is for signup (stricter rules)
     * @returns {Object} Validation result with isValid and message
     */
    validatePassword: (password, isSignup = false) => {
        if (!password) {
            return { isValid: false, message: 'Password is required' };
        }
        if (password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters long' };
        }
        if (password.length > 128) {
            return { isValid: false, message: 'Password is too long (maximum 128 characters)' };
        }
        if (isSignup) {
            if (!/[A-Z]/.test(password)) {
                return { isValid: false, message: 'Password must contain at least one uppercase letter' };
            }
            if (!/[a-z]/.test(password)) {
                return { isValid: false, message: 'Password must contain at least one lowercase letter' };
            }
            if (!/[0-9]/.test(password)) {
                return { isValid: false, message: 'Password must contain at least one number' };
            }
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
                                           autocomplete="username" pattern="[a-zA-Z0-9_\\-]+">
                                    <span class="field-hint">3-30 characters, letters, numbers, underscores</span>
                                </div>
                            ` : ''}
                            
                            <div class="auth-field">
                                <label for="auth-email">${isLogin ? 'Email or Username' : 'Email'}</label>
                                <input type="${isLogin ? 'text' : 'email'}" id="auth-email" name="email" 
                                       placeholder="${isLogin ? 'Enter email or username' : 'Enter your email'}" required maxlength="254"
                                       autocomplete="${isLogin ? 'username' : 'email'}">
                            </div>
                            
                            <div class="auth-field">
                                <label for="auth-password">Password</label>
                                <div class="password-input-wrapper">
                                    <input type="password" id="auth-password" name="password" 
                                           placeholder="${!isLogin ? 'Create a password' : 'Enter your password'}" 
                                           required minlength="8" maxlength="128"
                                           autocomplete="${!isLogin ? 'new-password' : 'current-password'}">
                                    <button type="button" class="toggle-password" aria-label="Toggle password visibility">
                                        👁️
                                    </button>
                                </div>
                                ${!isLogin ? '<span class="field-hint">At least 8 characters with uppercase, lowercase, and number</span>' : ''}
                            </div>
                            
                            ${!isLogin ? `
                                <div class="auth-field">
                                    <label for="auth-confirm-password">Confirm Password</label>
                                    <input type="password" id="auth-confirm-password" name="confirmPassword" 
                                           placeholder="Confirm your password" required minlength="8" maxlength="128"
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

            // Real-time field validation
            AuthModal.attachFieldValidation();

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
     * @param {string} [fieldId] - Optional field ID to highlight
     */
    showError: (message, fieldId) => {
        const errorEl = document.getElementById('auth-error');
        if (errorEl) {
            errorEl.textContent = AuthModal.escapeHtml(message || 'An error occurred');
            errorEl.classList.remove('hidden');
            // Scroll error into view for better UX
            errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        // Highlight the problematic field
        if (fieldId) {
            const field = document.getElementById(fieldId);
            if (field) {
                field.classList.add('field-error');
                field.setAttribute('aria-invalid', 'true');
            }
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
        // Clear all field error states
        document.querySelectorAll('.field-error').forEach(field => {
            field.classList.remove('field-error');
            field.removeAttribute('aria-invalid');
        });
    },

    /**
     * Add real-time validation to form fields
     */
    attachFieldValidation: () => {
        const emailField = document.getElementById('auth-email');
        const passwordField = document.getElementById('auth-password');
        const usernameField = document.getElementById('auth-username');
        const confirmField = document.getElementById('auth-confirm-password');

        const showFieldError = (field, message) => {
            const hint = field?.parentElement?.querySelector('.field-hint, .field-error-hint');
            if (hint) {
                hint.dataset.originalText = hint.dataset.originalText || hint.textContent;
                hint.textContent = message;
                hint.classList.add('field-error-hint');
            }
            field?.classList.add('field-error');
        };

        const clearFieldError = (field) => {
            const hint = field?.parentElement?.querySelector('.field-error-hint');
            if (hint && hint.dataset.originalText) {
                hint.textContent = hint.dataset.originalText;
                hint.classList.remove('field-error-hint');
            }
            field?.classList.remove('field-error');
        };

        if (emailField) {
            emailField.addEventListener('blur', () => {
                const validation = AuthModal.validateEmail(emailField.value);
                if (!validation.isValid && emailField.value.trim()) {
                    showFieldError(emailField, validation.message);
                } else {
                    clearFieldError(emailField);
                }
            });
        }

        if (usernameField) {
            usernameField.addEventListener('blur', () => {
                const validation = AuthModal.validateUsername(usernameField.value);
                if (!validation.isValid && usernameField.value.trim()) {
                    showFieldError(usernameField, validation.message);
                } else {
                    clearFieldError(usernameField);
                }
            });
        }

        if (confirmField && passwordField) {
            confirmField.addEventListener('blur', () => {
                if (confirmField.value && confirmField.value !== passwordField.value) {
                    showFieldError(confirmField, 'Passwords do not match');
                } else {
                    clearFieldError(confirmField);
                }
            });
        }
    },

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    handleSubmit: async (event) => {
        event.preventDefault();
        AuthModal.hideError();

        // Prevent double submission
        if (AuthModal.isSubmitting) {
            return;
        }

        const submitBtn = document.querySelector('.auth-submit-btn');

        try {
            const form = event.target;
            if (!form) return;

            const email = (form.email?.value || '').trim();
            const password = form.password?.value || '';

            // Validate email/username
            const isSignup = AuthModal.mode === 'signup';
            if (isSignup) {
                // Strict email validation for signup
                const emailValidation = AuthModal.validateEmail(email);
                if (!emailValidation.isValid) {
                    AuthModal.showError(emailValidation.message);
                    form.email?.focus();
                    return;
                }
            } else {
                // For login, just check it's not empty
                if (!email) {
                    AuthModal.showError('Please enter your email or username');
                    form.email?.focus();
                    return;
                }
            }

            // Validate password (stricter for signup)
            const passwordValidation = AuthModal.validatePassword(password, isSignup);
            if (!passwordValidation.isValid) {
                AuthModal.showError(passwordValidation.message);
                form.password?.focus();
                return;
            }

            if (isSignup) {
                const username = (form.username?.value || '').trim();
                const confirmPassword = form.confirmPassword?.value || '';

                // Validate username
                const usernameValidation = AuthModal.validateUsername(username);
                if (!usernameValidation.isValid) {
                    AuthModal.showError(usernameValidation.message);
                    form.username?.focus();
                    return;
                }

                // Check passwords match
                if (password !== confirmPassword) {
                    AuthModal.showError('Passwords do not match. Please re-enter your password.');
                    form.confirmPassword?.focus();
                    return;
                }

                // Check Auth service availability
                if (typeof Auth === 'undefined' || !Auth.register) {
                    AuthModal.showError('Authentication service is currently unavailable. Please try again later.');
                    return;
                }

                // Set loading state
                AuthModal.setSubmitting(true, submitBtn);

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
                    
                    // Navigate to home page
                    if (typeof Router !== 'undefined' && Router.navigate) {
                        Router.navigate('home');
                    } else {
                        window.location.reload();
                    }
                } else {
                    AuthModal.showError(AuthModal.formatApiError(result?.error, 'Registration failed'));
                }
            } else {
                // Check Auth service availability
                if (typeof Auth === 'undefined' || !Auth.login) {
                    AuthModal.showError('Authentication service is currently unavailable. Please try again later.');
                    return;
                }

                // Set loading state
                AuthModal.setSubmitting(true, submitBtn);

                const result = await Auth.login(email, password);

                if (result && result.success) {
                    AuthModal.hide();
                    const displayName = (typeof Helpers !== 'undefined' && Helpers.escapeHtml)
                        ? Helpers.escapeHtml(result.user?.username || 'User')
                        : AuthModal.escapeHtml(result.user?.username || 'User');
                    
                    if (typeof Toast !== 'undefined') {
                        Toast.show(`Welcome back, ${displayName}! 👋`, 'success');
                    }
                    
                    // Navigate to home page
                    if (typeof Router !== 'undefined' && Router.navigate) {
                        Router.navigate('home');
                    } else {
                        window.location.reload();
                    }
                } else {
                    // Generic message for login failures (security: don't reveal if email exists)
                    AuthModal.showError('Invalid email or password. Please check your credentials and try again.');
                }
            }
        } catch (error) {
            console.error('AuthModal: Submit error', error);
            AuthModal.showError('An unexpected error occurred. Please check your connection and try again.');
        } finally {
            AuthModal.setSubmitting(false, submitBtn);
        }
    },

    /**
     * Set submitting state with loading indicator
     * @param {boolean} isSubmitting - Whether form is submitting
     * @param {HTMLElement} submitBtn - Submit button element
     */
    setSubmitting: (isSubmitting, submitBtn) => {
        AuthModal.isSubmitting = isSubmitting;
        if (submitBtn) {
            submitBtn.disabled = isSubmitting;
            if (isSubmitting) {
                submitBtn.dataset.originalText = submitBtn.textContent;
                submitBtn.textContent = 'Please wait...';
                submitBtn.classList.add('loading');
            } else {
                submitBtn.textContent = submitBtn.dataset.originalText || (AuthModal.mode === 'login' ? 'Log In' : 'Create Account');
                submitBtn.classList.remove('loading');
            }
        }
    },

    /**
     * Format API error messages for display
     * @param {string} error - Error from API
     * @param {string} fallback - Fallback message
     * @returns {string} User-friendly error message
     */
    formatApiError: (error, fallback) => {
        if (!error) return fallback;
        
        // Map common error codes to user-friendly messages
        const errorMap = {
            'email_exists': 'An account with this email already exists. Try logging in instead.',
            'username_taken': 'This username is already taken. Please choose another.',
            'invalid_credentials': 'Invalid email or password.',
            'rate_limited': 'Too many attempts. Please wait a moment and try again.',
            'network_error': 'Unable to connect. Please check your internet connection.'
        };

        return errorMap[error] || error || fallback;
    }
};
