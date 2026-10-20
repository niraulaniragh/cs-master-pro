/**
 * AuthModal.js - Login/Signup Modal Component
 */

const AuthModal = {
    isOpen: false,
    mode: 'login', // 'login' or 'signup'
    selectedAccountType: 'student', // 'student' or 'teacher'
    
    /**
     * Show the auth modal
     */
    show: (mode = 'login') => {
        AuthModal.mode = mode;
        AuthModal.isOpen = true;
        AuthModal.selectedAccountType = 'student';
        AuthModal.render();
        document.body.classList.add('modal-open');
    },

    /**
     * Hide the auth modal
     */
    hide: () => {
        AuthModal.isOpen = false;
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.remove();
        }
        document.body.classList.remove('modal-open');
    },

    /**
     * Switch between login and signup
     */
    switchMode: (mode) => {
        AuthModal.mode = mode;
        AuthModal.render();
    },
    
    /**
     * Select account type
     */
    selectAccountType: (type) => {
        AuthModal.selectedAccountType = type;
        document.querySelectorAll('.account-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
    },

    /**
     * Render the modal
     */
    render: () => {
        // Remove existing modal
        const existingModal = document.getElementById('auth-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modalHTML = `
            <div class="auth-modal-overlay" id="auth-modal">
                <div class="auth-modal">
                    <div class="auth-header">
                        <div class="auth-logo">🎓</div>
                        <h2>CS Master Pro</h2>
                        <p class="auth-subtitle">${AuthModal.mode === 'login' ? 'Welcome back!' : 'Create your account'}</p>
                    </div>
                    
                    <div class="auth-tabs">
                        <button class="auth-tab ${AuthModal.mode === 'login' ? 'active' : ''}" 
                                onclick="AuthModal.switchMode('login')">
                            Log In
                        </button>
                        <button class="auth-tab ${AuthModal.mode === 'signup' ? 'active' : ''}"
                                onclick="AuthModal.switchMode('signup')">
                            Sign Up
                        </button>
                    </div>
                    
                    <form class="auth-form" onsubmit="AuthModal.handleSubmit(event)">
                        ${AuthModal.mode === 'signup' ? `
                            <div class="auth-field account-type-field">
                                <label>I am a...</label>
                                <div class="account-type-selector">
                                    <button type="button" class="account-type-btn ${AuthModal.selectedAccountType === 'student' ? 'active' : ''}" 
                                            data-type="student" onclick="AuthModal.selectAccountType('student')">
                                        <span class="type-icon">🎒</span>
                                        <span class="type-label">Student</span>
                                        <span class="type-desc">Learn & practice</span>
                                    </button>
                                    <button type="button" class="account-type-btn ${AuthModal.selectedAccountType === 'teacher' ? 'active' : ''}"
                                            data-type="teacher" onclick="AuthModal.selectAccountType('teacher')">
                                        <span class="type-icon">👩‍🏫</span>
                                        <span class="type-label">Teacher</span>
                                        <span class="type-desc">Create classrooms & host games</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="auth-field">
                                <label for="auth-username">Username</label>
                                <input type="text" id="auth-username" name="username" 
                                       placeholder="Choose a username" required minlength="3"
                                       autocomplete="username">
                                <span class="field-hint">At least 3 characters</span>
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
                                       placeholder="${AuthModal.mode === 'signup' ? 'Create a password' : 'Enter your password'}" 
                                       required minlength="6"
                                       autocomplete="${AuthModal.mode === 'signup' ? 'new-password' : 'current-password'}">
                                <button type="button" class="toggle-password" onclick="AuthModal.togglePassword()">
                                    👁️
                                </button>
                            </div>
                            ${AuthModal.mode === 'signup' ? '<span class="field-hint">At least 6 characters</span>' : ''}
                        </div>
                        
                        ${AuthModal.mode === 'signup' ? `
                            <div class="auth-field">
                                <label for="auth-confirm-password">Confirm Password</label>
                                <input type="password" id="auth-confirm-password" name="confirmPassword" 
                                       placeholder="Confirm your password" required minlength="6"
                                       autocomplete="new-password">
                            </div>
                        ` : ''}
                        
                        <div class="auth-error hidden" id="auth-error"></div>
                        
                        <button type="submit" class="auth-submit-btn">
                            ${AuthModal.mode === 'login' ? 'Log In' : 'Create Account'}
                        </button>
                    </form>
                    
                    <div class="auth-footer">
                        ${AuthModal.mode === 'login' ? `
                            <p>Don't have an account? <a href="#" onclick="AuthModal.switchMode('signup'); return false;">Sign up</a></p>
                        ` : `
                            <p>Already have an account? <a href="#" onclick="AuthModal.switchMode('login'); return false;">Log in</a></p>
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

        // Focus first input
        setTimeout(() => {
            const firstInput = document.querySelector('.auth-form input');
            if (firstInput) firstInput.focus();
        }, 100);
    },

    /**
     * Toggle password visibility
     */
    togglePassword: () => {
        const passwordInput = document.getElementById('auth-password');
        const confirmInput = document.getElementById('auth-confirm-password');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            if (confirmInput) confirmInput.type = 'text';
        } else {
            passwordInput.type = 'password';
            if (confirmInput) confirmInput.type = 'password';
        }
    },

    /**
     * Show error message
     */
    showError: (message) => {
        const errorEl = document.getElementById('auth-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
        }
    },

    /**
     * Hide error message
     */
    hideError: () => {
        const errorEl = document.getElementById('auth-error');
        if (errorEl) {
            errorEl.classList.add('hidden');
        }
    },

    /**
     * Handle form submission
     */
    handleSubmit: (event) => {
        event.preventDefault();
        AuthModal.hideError();

        const form = event.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        if (AuthModal.mode === 'signup') {
            const username = form.username.value.trim();
            const confirmPassword = form.confirmPassword.value;

            // Check passwords match
            if (password !== confirmPassword) {
                AuthModal.showError('Passwords do not match');
                return;
            }

            // Attempt registration with account type
            const result = Auth.register(username, email, password, AuthModal.selectedAccountType);
            
            if (result.success) {
                AuthModal.hide();
                const welcome = AuthModal.selectedAccountType === 'teacher' 
                    ? `Welcome, ${result.user.username}! 👩‍🏫 You can now create classrooms!`
                    : `Welcome, ${result.user.username}! 🎉`;
                Toast.show(welcome, 'success');
                // Reload app to show authenticated state
                App.init();
            } else {
                AuthModal.showError(result.error);
            }
        } else {
            // Attempt login
            const result = Auth.login(email, password);
            
            if (result.success) {
                AuthModal.hide();
                Toast.show(`Welcome back, ${result.user.username}! 👋`, 'success');
                // Reload app with user's progress
                App.init();
            } else {
                AuthModal.showError(result.error);
            }
        }
    }
};
