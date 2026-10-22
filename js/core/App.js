/**
 * App.js - Main Application Entry Point
 * Initializes all modules and starts the application
 */

const App = (() => {
    const init = () => {
        // Check for demo mode
        if (typeof DemoMode !== 'undefined') {
            DemoMode.init();
        }
        
        console.log('🚀 CS Master Pro - Starting...');
        
        // Initialize modules in order
        Storage.init();
        Auth.init();
        Classroom.init();
        
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
                
                console.log(`👤 Logged in as: ${user.username} (${user.accountType || 'student'})`);
                
                // Add teacher link if teacher
                App.updateTeacherNav();
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
        
        // Cleanup old games
        Classroom.cleanupGames();
        
        console.log('✅ Application initialized successfully');

        // Dismiss loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => loadingScreen.remove(), 500);
            }
        }, 2000);
    };
    
    /**
     * Update navigation for teacher/student
     */
    const updateTeacherNav = () => {
        const navLinks = document.querySelector('.nav-links');
        const existingTeacherLink = document.querySelector('.nav-link[data-route="teacher"]');
        
        // Remove existing teacher link if present
        if (existingTeacherLink) {
            existingTeacherLink.remove();
        }
        
        // Add teacher link if user is a teacher
        if (Auth.isTeacher()) {
            const teacherLink = document.createElement('a');
            teacherLink.href = '#';
            teacherLink.className = 'nav-link teacher-link';
            teacherLink.dataset.route = 'teacher';
            teacherLink.innerHTML = '<i class="fas fa-chalkboard-teacher"></i> <span>Dashboard</span>';
            teacherLink.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('teacher');
            });
            navLinks.appendChild(teacherLink);
        }
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
        const accountType = user.accountType || 'student';
        const avatarColor = user.avatarColor || '#10b981';
        const avatarEmoji = user.avatarEmoji || '';

        Modal.show({
            title: '👤 Profile & Settings',
            content: `
                <div class="profile-modal">
                    <div class="profile-header">
                        <div class="profile-avatar-wrapper">
                            <div class="profile-avatar" style="background: ${avatarColor}" onclick="App.showAvatarEditor()">
                                ${avatarEmoji || Helpers.escapeHtml(user.username.charAt(0).toUpperCase())}
                            </div>
                            <button class="avatar-edit-btn" onclick="App.showAvatarEditor()">✏️</button>
                        </div>
                        <div class="profile-info">
                            <h3>${Helpers.escapeHtml(user.username)}</h3>
                            <p>${Helpers.escapeHtml(user.email)}</p>
                            <span class="account-type-badge ${accountType}">${accountType === 'teacher' ? '👩‍🏫 Teacher' : '🎒 Student'}</span>
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
                    
                    <div class="profile-section">
                        <h4>⚙️ Settings</h4>
                        <div class="settings-list">
                            <div class="setting-item">
                                <span>Account Type</span>
                                <button class="btn btn-small btn-secondary" onclick="App.showSwitchAccountType()">
                                    Switch to ${accountType === 'teacher' ? 'Student' : 'Teacher'}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-actions">
                        <button class="btn btn-secondary" onclick="App.showChangePassword()">
                            🔑 Change Password
                        </button>
                        <button class="btn btn-danger" onclick="App.showDeleteAccount()">
                            🗑️ Delete Account
                        </button>
                    </div>
                </div>
            `,
            footer: '<button class="btn btn-primary" id="profile-close">Close</button>',
            className: 'modal-profile'
        });
        
        setTimeout(() => {
            document.getElementById('profile-close')?.addEventListener('click', Modal.close);
        }, 0);
    };
    
    /**
     * Show avatar editor
     */
    const showAvatarEditor = () => {
        const user = Auth.getCurrentUser();
        const currentColor = user.avatarColor || '#10b981';
        const currentEmoji = user.avatarEmoji || '';
        
        const colors = [
            '#10b981', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
            '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#10b981',
            '#10b981', '#10b981', '#34d399', '#f97316', '#f43f5e', '#6b7280'
        ];
        
        const emojis = ['', '😀', '😎', '🤓', '🧑‍💻', '👨‍🎓', '👩‍🎓', '🦊', '🐱', '🐶', '🦁', '🐼', '🐨', '🦄', '🐉', '🎮', '🎯', '🚀', '⭐', '🔥'];
        
        Modal.show({
            title: '🎨 Customize Avatar',
            content: `
                <div class="avatar-editor">
                    <div class="avatar-preview">
                        <div class="preview-avatar" id="avatar-preview" style="background: ${currentColor}">
                            ${currentEmoji || Helpers.escapeHtml(user.username.charAt(0).toUpperCase())}
                        </div>
                    </div>
                    
                    <div class="editor-section">
                        <h4>Color</h4>
                        <div class="color-grid">
                            ${colors.map(c => `
                                <button class="color-btn ${c === currentColor ? 'selected' : ''}" 
                                        style="background: ${c}"
                                        onclick="App.selectAvatarColor('${c}')"></button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="editor-section">
                        <h4>Icon (optional)</h4>
                        <div class="emoji-grid">
                            ${emojis.map(e => `
                                <button class="emoji-btn ${e === currentEmoji ? 'selected' : ''}"
                                        onclick="App.selectAvatarEmoji('${e}')">${e || '✕'}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" id="avatar-cancel">Cancel</button>
                <button class="btn btn-primary" id="avatar-save">Save</button>
            `
        });
        
        App.tempAvatarColor = currentColor;
        App.tempAvatarEmoji = currentEmoji;
        
        setTimeout(() => {
            document.getElementById('avatar-cancel')?.addEventListener('click', () => {
                Modal.close();
                App.showProfile();
            });
            document.getElementById('avatar-save')?.addEventListener('click', () => {
                App.saveAvatar();
            });
        }, 0);
    };
    
    let tempAvatarColor = '#10b981';
    let tempAvatarEmoji = '';
    
    const selectAvatarColor = (color) => {
        App.tempAvatarColor = color;
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.style.background === color);
        });
        App.updateAvatarPreview();
    };
    
    const selectAvatarEmoji = (emoji) => {
        App.tempAvatarEmoji = emoji;
        document.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.textContent === (emoji || '✕'));
        });
        App.updateAvatarPreview();
    };
    
    const updateAvatarPreview = () => {
        const preview = document.getElementById('avatar-preview');
        const user = Auth.getCurrentUser();
        if (preview) {
            preview.style.background = App.tempAvatarColor;
            preview.textContent = App.tempAvatarEmoji || user.username.charAt(0).toUpperCase();
        }
    };
    
    const saveAvatar = () => {
        const user = Auth.getCurrentUser();
        Auth.updateUser(user.email, {
            avatarColor: App.tempAvatarColor,
            avatarEmoji: App.tempAvatarEmoji
        });
        Toast.show('Avatar updated!', 'success');
        Modal.close();
        App.showProfile();
    };
    
    /**
     * Show switch account type dialog
     */
    const showSwitchAccountType = () => {
        const user = Auth.getCurrentUser();
        const currentType = user.accountType || 'student';
        const newType = currentType === 'teacher' ? 'student' : 'teacher';
        
        Modal.show({
            title: '🔄 Switch Account Type',
            content: `
                <div class="switch-account-dialog">
                    <p>You are currently a <strong>${currentType === 'teacher' ? '👩‍🏫 Teacher' : '🎒 Student'}</strong>.</p>
                    <p>Switching to <strong>${newType === 'teacher' ? '👩‍🏫 Teacher' : '🎒 Student'}</strong> will:</p>
                    <ul>
                        ${newType === 'teacher' ? `
                            <li>✅ Allow you to create classrooms</li>
                            <li>✅ Allow you to create assignments</li>
                            <li>✅ Allow you to host multiplayer games</li>
                            <li>⚠️ You won't see student classroom features</li>
                        ` : `
                            <li>✅ Allow you to join classrooms</li>
                            <li>✅ Allow you to take assignments</li>
                            <li>✅ Allow you to join multiplayer games</li>
                            <li>⚠️ You won't be able to create classrooms</li>
                        `}
                    </ul>
                    <p class="switch-note">Your XP, achievements, and progress will be preserved.</p>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" id="switch-cancel">Cancel</button>
                <button class="btn btn-primary" id="switch-confirm">Switch to ${newType === 'teacher' ? 'Teacher' : 'Student'}</button>
            `
        });
        
        setTimeout(() => {
            document.getElementById('switch-cancel')?.addEventListener('click', () => {
                Modal.close();
                App.showProfile();
            });
            document.getElementById('switch-confirm')?.addEventListener('click', () => {
                App.confirmSwitchAccountType(newType);
            });
        }, 0);
    };
    
    const confirmSwitchAccountType = (newType) => {
        const user = Auth.getCurrentUser();
        const session = Auth.getSession();
        
        // Update user
        Auth.updateUser(user.email, {
            accountType: newType,
            // Initialize teacher/student specific fields
            ...(newType === 'teacher' ? { classrooms: user.classrooms || [] } : {}),
            ...(newType === 'student' ? { joinedClassrooms: user.joinedClassrooms || [] } : {})
        });
        
        // Update session
        session.accountType = newType;
        localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(session));
        sessionStorage.setItem(Auth.SESSION_KEY, JSON.stringify(session));
        
        Toast.show(`Switched to ${newType} account!`, 'success');
        Modal.close();
        
        // Refresh the page to update nav and features
        setTimeout(() => window.location.reload(), 500);
    };

    /**
     * Show change password dialog
     */
    const showChangePassword = () => {
        Modal.show({
            title: '🔑 Change Password',
            content: `
                <form class="change-password-form" id="change-pw-form">
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
                </form>
            `,
            footer: `
                <button class="btn btn-secondary" id="pw-cancel">Cancel</button>
                <button class="btn btn-primary" id="pw-submit">Update Password</button>
            `
        });
        
        setTimeout(() => {
            document.getElementById('pw-cancel')?.addEventListener('click', () => {
                Modal.close();
                App.showProfile();
            });
            document.getElementById('pw-submit')?.addEventListener('click', () => {
                const form = document.getElementById('change-pw-form');
                App.handleChangePassword({ preventDefault: () => {}, target: form });
            });
        }, 0);
    };

    /**
     * Handle change password
     */
    const handleChangePassword = async (event) => {
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

        const result = await Auth.changePassword(currentPassword, newPassword);
        if (result.success) {
            Modal.close();
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
        Modal.show({
            title: '🗑️ Delete Account',
            content: `
                <div class="delete-account-warning">
                    <p>⚠️ <strong>Warning:</strong> This action cannot be undone!</p>
                    <p>All your progress, achievements, and data will be permanently deleted.</p>
                </div>
                <form class="delete-account-form" id="delete-account-form">
                    <div class="form-field">
                        <label>Enter your password to confirm</label>
                        <input type="password" name="password" required>
                    </div>
                    <div class="form-error hidden" id="delete-error"></div>
                </form>
            `,
            footer: `
                <button class="btn btn-secondary" id="delete-cancel">Cancel</button>
                <button class="btn btn-danger" id="delete-confirm">Delete My Account</button>
            `
        });
        
        setTimeout(() => {
            document.getElementById('delete-cancel')?.addEventListener('click', () => {
                Modal.close();
                App.showProfile();
            });
            document.getElementById('delete-confirm')?.addEventListener('click', () => {
                const form = document.getElementById('delete-account-form');
                App.handleDeleteAccount({ preventDefault: () => {}, target: form });
            });
        }, 0);
    };

    /**
     * Handle delete account
     */
    const handleDeleteAccount = async (event) => {
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;

        const result = await Auth.deleteAccount(password);
        if (result.success) {
            Modal.close();
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
        handleDeleteAccount,
        updateTeacherNav,
        showAvatarEditor,
        selectAvatarColor,
        selectAvatarEmoji,
        updateAvatarPreview,
        saveAvatar,
        showSwitchAccountType,
        confirmSwitchAccountType,
        tempAvatarColor,
        tempAvatarEmoji
    };
})();
