/**
 * App.js - Main Application Entry Point
 * Initializes all modules and starts the application
 */

const App = (() => {
    const init = () => {
        console.log('🚀 CS Master Pro - Starting...');
        
        // Initialize modules in order
        Storage.init();
        Auth.init();
        
        // Check authentication
        const session = Auth.getSession();
        const isLoggedIn = session !== null;
        
        console.log('🔑 Session check:', isLoggedIn ? 'Found session' : 'No session');
        
        if (isLoggedIn) {
            // User is logged in - load their profile
            const user = Auth.getCurrentUser();
            
            if (user) {
                const profile = user.profile;
                if (profile) {
                    AppState.initWithProfile(profile);
                } else {
                    AppState.init();
                }
                
                // Update last active
                Auth.updateProfile({ lastActive: new Date().toISOString() });
                
                console.log(`👤 Logged in as: ${user.username}`);
            } else {
                // Session exists but user not found - clear invalid session
                console.log('⚠️ Invalid session, clearing...');
                Auth.logout();
                AppState.init();
                setTimeout(() => AuthModal.show('login'), 100);
            }
        } else {
            // Not logged in - show auth modal
            AppState.init();
            setTimeout(() => {
                AuthModal.show('login');
            }, 100);
        }
        
        AppState.updateNavStats();
        Router.init();
        
        // Apply syntax highlighting to any existing code blocks
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
        
        console.log('✅ Application initialized successfully');
    };

    /**
     * Handle logout
     */
    const logout = () => {
        if (confirm('Are you sure you want to log out?')) {
            Auth.logout();
            Toast.show('You have been logged out', 'info');
            // Reload to show login
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    /**
     * Show user profile/settings
     */
    const showProfile = () => {
        const user = Auth.getCurrentUser();
        if (!user) return;

        const joinDate = new Date(user.createdAt).toLocaleDateString();
        const lastActive = new Date(user.profile.lastActive).toLocaleDateString();

        Modal.show('User Profile', `
            <div class="profile-modal">
                <div class="profile-header">
                    <div class="profile-avatar">
                        ${user.username.charAt(0).toUpperCase()}
                    </div>
                    <div class="profile-info">
                        <h3>${user.username}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>
                
                <div class="profile-stats">
                    <div class="profile-stat">
                        <span class="stat-value">${user.profile.level}</span>
                        <span class="stat-label">Level</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-value">${user.profile.xp.toLocaleString()}</span>
                        <span class="stat-label">XP</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-value">${user.profile.achievements.length}</span>
                        <span class="stat-label">Achievements</span>
                    </div>
                </div>
                
                <div class="profile-details">
                    <p><strong>Joined:</strong> ${joinDate}</p>
                    <p><strong>Last Active:</strong> ${lastActive}</p>
                    <p><strong>Questions Answered:</strong> ${user.profile.totalAnswered}</p>
                    <p><strong>Correct Answers:</strong> ${user.profile.totalCorrect}</p>
                </div>
                
                <div class="profile-actions">
                    <button class="btn btn-secondary" onclick="App.showChangePassword()">
                        Change Password
                    </button>
                    <button class="btn btn-danger" onclick="App.showDeleteAccount()">
                        Delete Account
                    </button>
                </div>
            </div>
        `);
    };

    /**
     * Show change password dialog
     */
    const showChangePassword = () => {
        Modal.show('Change Password', `
            <form class="change-password-form" onsubmit="App.handleChangePassword(event)">
                <div class="form-field">
                    <label>Current Password</label>
                    <input type="password" name="currentPassword" required>
                </div>
                <div class="form-field">
                    <label>New Password</label>
                    <input type="password" name="newPassword" required minlength="6">
                </div>
                <div class="form-field">
                    <label>Confirm New Password</label>
                    <input type="password" name="confirmPassword" required minlength="6">
                </div>
                <div class="form-error hidden" id="change-pw-error"></div>
                <button type="submit" class="btn btn-primary">Update Password</button>
            </form>
        `);
    };

    /**
     * Handle change password
     */
    const handleChangePassword = (event) => {
        event.preventDefault();
        const form = event.target;
        const currentPassword = form.currentPassword.value;
        const newPassword = form.newPassword.value;
        const confirmPassword = form.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            document.getElementById('change-pw-error').textContent = 'Passwords do not match';
            document.getElementById('change-pw-error').classList.remove('hidden');
            return;
        }

        const result = Auth.changePassword(currentPassword, newPassword);
        if (result.success) {
            Modal.hide();
            Toast.show('Password updated successfully', 'success');
        } else {
            document.getElementById('change-pw-error').textContent = result.error;
            document.getElementById('change-pw-error').classList.remove('hidden');
        }
    };

    /**
     * Show delete account dialog
     */
    const showDeleteAccount = () => {
        Modal.show('Delete Account', `
            <div class="delete-account-warning">
                <p>⚠️ <strong>Warning:</strong> This action cannot be undone!</p>
                <p>All your progress, achievements, and data will be permanently deleted.</p>
            </div>
            <form class="delete-account-form" onsubmit="App.handleDeleteAccount(event)">
                <div class="form-field">
                    <label>Enter your password to confirm</label>
                    <input type="password" name="password" required>
                </div>
                <div class="form-error hidden" id="delete-error"></div>
                <button type="submit" class="btn btn-danger">Delete My Account</button>
            </form>
        `);
    };

    /**
     * Handle delete account
     */
    const handleDeleteAccount = (event) => {
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;

        const result = Auth.deleteAccount(password);
        if (result.success) {
            Modal.hide();
            Toast.show('Account deleted successfully', 'info');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            document.getElementById('delete-error').textContent = result.error;
            document.getElementById('delete-error').classList.remove('hidden');
        }
    };

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { 
        init, 
        logout, 
        showProfile,
        showChangePassword,
        handleChangePassword,
        showDeleteAccount,
        handleDeleteAccount
    };
})();
