/**
 * App.js - Main Application Entry Point
 * Initializes all modules and starts the application
 */

const App = (() => {
    // Private state
    let tempAvatarColor = '#10b981';
    let tempAvatarEmoji = '';
    let isInitialized = false;

    /**
     * Safe initialization of a module
     * @param {string} name - Module name for logging
     * @param {Function} initFn - Initialization function
     */
    const safeInit = (name, initFn) => {
        try {
            if (typeof initFn === 'function') {
                initFn();
            }
        } catch (error) {
            console.error(`❌ Failed to initialize ${name}:`, error);
        }
    };

    const init = () => {
        // Prevent double initialization
        if (isInitialized) {
            console.warn('⚠️ App already initialized');
            return;
        }

        try {
            // Check for demo mode
            if (typeof DemoMode !== 'undefined' && typeof DemoMode.init === 'function') {
                DemoMode.init();
            }
            
            console.log('🚀 CS Master Pro - Starting...');
            
            // Phase 1: Core infrastructure (order matters: Storage -> Auth -> AppState -> Router)
            safeInit('Storage', () => typeof Storage !== 'undefined' && Storage.init && Storage.init());
            safeInit('Auth', () => typeof Auth !== 'undefined' && Auth.init && Auth.init());
            safeInit('AppState', () => typeof AppState !== 'undefined' && AppState.init && AppState.init());
            safeInit('Router', () => typeof Router !== 'undefined' && Router.init && Router.init());
            
            // Phase 2: Feature modules (can fail independently)
            safeInit('Classroom', () => typeof Classroom !== 'undefined' && Classroom.init && Classroom.init());
            
            // Phase 3: Session-dependent initialization with error boundary
            const session = typeof Auth !== 'undefined' ? Auth.getSession() : null;
            const isLoggedIn = session !== null;
            
            console.log('🔑 Session check:', isLoggedIn ? 'Found session' : 'No session');
            
            try {
                if (isLoggedIn) {
                    handleLoggedInUser();
                } else {
                    handleGuestUser();
                }
            } catch (sessionError) {
                console.error('❌ Session handling failed:', sessionError);
                // Fallback to guest mode on any session error
                try {
                    handleGuestUser();
                } catch (guestError) {
                    console.error('❌ Guest fallback failed:', guestError);
                }
            }
            
            // Phase 4: Post-init tasks (non-critical)
            safeInit('NavStats', () => {
                if (typeof AppState !== 'undefined' && typeof AppState.updateNavStats === 'function') {
                    AppState.updateNavStats();
                }
            });
            
            safeInit('SyntaxHighlight', () => {
                if (typeof hljs !== 'undefined' && typeof hljs.highlightAll === 'function') {
                    hljs.highlightAll();
                }
            });
            
            safeInit('GameCleanup', () => {
                if (typeof Classroom !== 'undefined' && typeof Classroom.cleanupGames === 'function') {
                    Classroom.cleanupGames();
                }
            });
            
            isInitialized = true;
            console.log('✅ Application initialized successfully');

            // Dismiss loading screen
            dismissLoadingScreen();
            
        } catch (error) {
            console.error('❌ Application initialization failed:', error);
            dismissLoadingScreen();
            showErrorState();
        }
    };

    /**
     * Handle logged in user initialization
     */
    const handleLoggedInUser = () => {
        try {
            const user = Auth.getCurrentUser();
            
            if (user) {
                const profile = user.profile;
                // AppState already initialized in init(), just load profile if available
                if (profile && typeof AppState !== 'undefined' && typeof AppState.initWithProfile === 'function') {
                    AppState.initWithProfile(profile);
                }
                
                // Update last active
                if (typeof Auth.updateProfile === 'function') {
                    Auth.updateProfile({ lastActive: new Date().toISOString() });
                }
                
                const accountType = user.accountType || 'student';
                const username = user.username || 'User';
                console.log(`👤 Logged in as: ${username} (${accountType})`);
                
                // Add teacher link if teacher
                App.updateTeacherNav();
            } else {
                // Session exists but user not found - clear invalid session
                console.log('⚠️ Invalid session, clearing...');
                if (typeof Auth.logout === 'function') {
                    Auth.logout();
                }
                setTimeout(() => {
                    if (typeof AuthModal !== 'undefined' && typeof AuthModal.show === 'function') {
                        AuthModal.show('login');
                    }
                }, 100);
            }
        } catch (error) {
            console.error('Error handling logged in user:', error);
            // Re-throw to let the error boundary in init() handle it
            throw error;
        }
    };

    /**
     * Handle guest user initialization
     */
    const handleGuestUser = () => {
        // AppState already initialized in init()
        // Show landing page for guests instead of login modal
        // The landing page has login/register buttons
        
        // Add guest mode badge to nav
        showGuestModeBadge();
    };
    
    /**
     * Show guest mode badge in navigation
     */
    const showGuestModeBadge = () => {
        const navRight = document.querySelector('.nav-right');
        if (navRight && !document.getElementById('guest-mode-badge')) {
            const badge = document.createElement('div');
            badge.id = 'guest-mode-badge';
            badge.className = 'guest-mode-badge';
            badge.innerHTML = `
                <span>👤 Guest</span>
                <button class="btn btn-small btn-primary" onclick="AuthModal.show('login')">Sign In</button>
            `;
            navRight.insertBefore(badge, navRight.firstChild);
        }
    };
    
    /**
     * Remove guest mode badge (called after login)
     */
    const hideGuestModeBadge = () => {
        const badge = document.getElementById('guest-mode-badge');
        if (badge) badge.remove();
    };

    /**
     * Dismiss loading screen with animation
     */
    const dismissLoadingScreen = () => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 400);
            }
        }, 800); // Reduced from 2000ms for faster perceived load
    };

    /**
     * Show error state when initialization fails
     */
    const showErrorState = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-state" style="text-align: center; padding: 4rem;">
                    <span style="font-size: 4rem;">⚠️</span>
                    <h2>Something went wrong</h2>
                    <p>The application failed to initialize. Please refresh the page.</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">Refresh Page</button>
                </div>
            `;
        }
    };
    
    /**
     * Update navigation for teacher/student
     */
    const updateTeacherNav = () => {
        try {
            const navLinks = document.querySelector('.nav-links');
            if (!navLinks) return;
            
            const existingTeacherLink = document.querySelector('.nav-link[data-route="teacher"]');
            
            // Remove existing teacher link if present
            if (existingTeacherLink && existingTeacherLink.parentNode) {
                existingTeacherLink.remove();
            }
            
            // Add teacher link if user is a teacher
            if (typeof Auth !== 'undefined' && typeof Auth.isTeacher === 'function' && Auth.isTeacher()) {
                const teacherLink = document.createElement('a');
                teacherLink.href = '#';
                teacherLink.className = 'nav-link teacher-link';
                teacherLink.dataset.route = 'teacher';
                teacherLink.innerHTML = '<i class="fas fa-chalkboard-teacher"></i> <span>Dashboard</span>';
                teacherLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
                        Router.navigate('teacher');
                    }
                });
                navLinks.appendChild(teacherLink);
            }
        } catch (error) {
            console.error('Error updating teacher nav:', error);
        }
    };

    /**
     * Handle logout with proper cleanup
     */
    const logout = () => {
        if (confirm('Are you sure you want to log out?')) {
            try {
                // Phase 1: Clean up UI elements
                hideGuestModeBadge();
                
                // Remove teacher nav link
                const teacherLink = document.querySelector('.nav-link[data-route="teacher"]');
                if (teacherLink && teacherLink.parentNode) {
                    teacherLink.remove();
                }
                
                // Phase 2: Clean up module state
                if (typeof AppState !== 'undefined' && typeof AppState.reset === 'function') {
                    AppState.reset();
                }
                
                if (typeof Classroom !== 'undefined' && typeof Classroom.cleanup === 'function') {
                    Classroom.cleanup();
                }
                
                if (typeof Router !== 'undefined' && typeof Router.cleanup === 'function') {
                    Router.cleanup();
                }
                
                // Phase 3: Clear any active modals
                if (typeof Modal !== 'undefined' && typeof Modal.close === 'function') {
                    Modal.close();
                }
                
                // Phase 4: Call Auth logout (clears session storage)
                if (typeof Auth !== 'undefined' && typeof Auth.logout === 'function') {
                    Auth.logout();
                }
                
                // Reset initialization flag to allow re-init after reload
                isInitialized = false;
                
                if (typeof Toast !== 'undefined' && typeof Toast.show === 'function') {
                    Toast.show('You have been logged out', 'info');
                }
                
                // Reload to reset application state
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } catch (error) {
                console.error('Error during logout:', error);
                // Force reload even on error to ensure clean state
                window.location.reload();
            }
        }
    };

    /**
     * Show user profile/settings
     */
    const showProfile = () => {
        try {
            const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
            if (!user) {
                if (typeof Toast !== 'undefined') {
                    Toast.show('Please log in to view your profile', 'warning');
                }
                return;
            }

            const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown';
            const lastActive = user.profile?.lastActive ? new Date(user.profile.lastActive).toLocaleDateString() : 'Unknown';
            const accountType = user.accountType || 'student';
            const avatarColor = user.avatarColor || '#10b981';
            const avatarEmoji = user.avatarEmoji || '';
            const username = user.username || 'User';
            const email = user.email || '';
            const level = user.profile?.level || 1;
            const xp = user.profile?.xp || 0;
            const achievements = user.profile?.achievements || [];
            const totalAnswered = user.profile?.totalAnswered || 0;
            const totalCorrect = user.profile?.totalCorrect || 0;

            // Helper function for safe HTML escaping
            const escapeHtml = (str) => {
                if (typeof Helpers !== 'undefined' && typeof Helpers.escapeHtml === 'function') {
                    return Helpers.escapeHtml(str);
                }
                return String(str).replace(/[&<>"']/g, (m) => ({
                    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
                })[m]);
            };

            if (typeof Modal === 'undefined' || typeof Modal.show !== 'function') {
                console.error('Modal not available');
                return;
            }

            Modal.show({
                title: '👤 Profile & Settings',
                content: `
                    <div class="profile-modal">
                        <div class="profile-header">
                            <div class="profile-avatar-wrapper">
                                <div class="profile-avatar" style="background: ${avatarColor}" onclick="App.showAvatarEditor()">
                                    ${avatarEmoji || escapeHtml(username.charAt(0).toUpperCase())}
                                </div>
                                <button class="avatar-edit-btn" onclick="App.showAvatarEditor()">✏️</button>
                            </div>
                            <div class="profile-info">
                                <h3>${escapeHtml(username)}</h3>
                                <p>${escapeHtml(email)}</p>
                                <span class="account-type-badge ${accountType}">${accountType === 'teacher' ? '👩‍🏫 Teacher' : '🎒 Student'}</span>
                            </div>
                        </div>
                        
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <span class="stat-value">${level}</span>
                                <span class="stat-label">Level</span>
                            </div>
                            <div class="profile-stat">
                                <span class="stat-value">${xp.toLocaleString()}</span>
                                <span class="stat-label">XP</span>
                            </div>
                            <div class="profile-stat">
                                <span class="stat-value">${achievements.length}</span>
                                <span class="stat-label">Achievements</span>
                            </div>
                        </div>
                        
                        <div class="profile-details">
                            <p><strong>Joined:</strong> ${joinDate}</p>
                            <p><strong>Last Active:</strong> ${lastActive}</p>
                            <p><strong>Questions Answered:</strong> ${totalAnswered}</p>
                            <p><strong>Correct Answers:</strong> ${totalCorrect}</p>
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
                const closeBtn = document.getElementById('profile-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        if (typeof Modal.close === 'function') Modal.close();
                    });
                }
            }, 0);
        } catch (error) {
            console.error('Error showing profile:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Failed to load profile', 'error');
            }
        }
    };
    
    /**
     * Show avatar editor
     */
    const showAvatarEditor = () => {
        try {
            const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
            if (!user) return;
            
            const currentColor = user.avatarColor || '#10b981';
            const currentEmoji = user.avatarEmoji || '';
            
            const colors = [
                '#10b981', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
                '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
                '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#ef4444', '#6b7280'
            ];
            
            const emojis = ['', '😀', '😎', '🤓', '🧑‍💻', '👨‍🎓', '👩‍🎓', '🦊', '🐱', '🐶', '🦁', '🐼', '🐨', '🦄', '🐉', '🎮', '🎯', '🚀', '⭐', '🔥'];

            const escapeHtml = (str) => {
                if (typeof Helpers !== 'undefined' && typeof Helpers.escapeHtml === 'function') {
                    return Helpers.escapeHtml(str);
                }
                return String(str).replace(/[&<>"']/g, (m) => ({
                    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
                })[m]);
            };

            if (typeof Modal === 'undefined') return;
            
            Modal.show({
                title: '🎨 Customize Avatar',
                content: `
                    <div class="avatar-editor">
                        <div class="avatar-preview">
                            <div class="preview-avatar" id="avatar-preview" style="background: ${currentColor}">
                                ${currentEmoji || escapeHtml(user.username.charAt(0).toUpperCase())}
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
                const cancelBtn = document.getElementById('avatar-cancel');
                const saveBtn = document.getElementById('avatar-save');
                
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                        if (typeof Modal.close === 'function') Modal.close();
                        App.showProfile();
                    });
                }
                if (saveBtn) {
                    saveBtn.addEventListener('click', () => App.saveAvatar());
                }
            }, 0);
        } catch (error) {
            console.error('Error showing avatar editor:', error);
        }
    };
    
    const selectAvatarColor = (color) => {
        if (!color) return;
        App.tempAvatarColor = color;
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.style.background === color || btn.style.backgroundColor === color);
        });
        App.updateAvatarPreview();
    };
    
    const selectAvatarEmoji = (emoji) => {
        App.tempAvatarEmoji = emoji || '';
        document.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.textContent === (emoji || '✕'));
        });
        App.updateAvatarPreview();
    };
    
    const updateAvatarPreview = () => {
        const preview = document.getElementById('avatar-preview');
        const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
        if (preview && user) {
            preview.style.background = App.tempAvatarColor;
            preview.textContent = App.tempAvatarEmoji || user.username.charAt(0).toUpperCase();
        }
    };
    
    const saveAvatar = () => {
        try {
            const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
            if (!user) return;
            
            if (typeof Auth.updateUser === 'function') {
                Auth.updateUser(user.email, {
                    avatarColor: App.tempAvatarColor,
                    avatarEmoji: App.tempAvatarEmoji
                });
            }
            
            if (typeof Toast !== 'undefined') {
                Toast.show('Avatar updated!', 'success');
            }
            if (typeof Modal !== 'undefined' && typeof Modal.close === 'function') {
                Modal.close();
            }
            App.showProfile();
        } catch (error) {
            console.error('Error saving avatar:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Failed to save avatar', 'error');
            }
        }
    };
    
    /**
     * Show switch account type dialog
     */
    const showSwitchAccountType = () => {
        try {
            const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
            if (!user) return;
            
            const currentType = user.accountType || 'student';
            const newType = currentType === 'teacher' ? 'student' : 'teacher';
            
            if (typeof Modal === 'undefined') return;
            
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
                const cancelBtn = document.getElementById('switch-cancel');
                const confirmBtn = document.getElementById('switch-confirm');
                
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                        if (typeof Modal.close === 'function') Modal.close();
                        App.showProfile();
                    });
                }
                if (confirmBtn) {
                    confirmBtn.addEventListener('click', () => App.confirmSwitchAccountType(newType));
                }
            }, 0);
        } catch (error) {
            console.error('Error showing switch account type dialog:', error);
        }
    };
    
    const confirmSwitchAccountType = (newType) => {
        try {
            const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
            const session = typeof Auth !== 'undefined' ? Auth.getSession() : null;
            
            if (!user || !session) return;
            
            // Update user
            if (typeof Auth.updateUser === 'function') {
                Auth.updateUser(user.email, {
                    accountType: newType,
                    // Initialize teacher/student specific fields
                    ...(newType === 'teacher' ? { classrooms: user.classrooms || [] } : {}),
                    ...(newType === 'student' ? { joinedClassrooms: user.joinedClassrooms || [] } : {})
                });
            }
            
            // Update session
            session.accountType = newType;
            try {
                localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(session));
            } catch (e) {
                console.error('Failed to save session:', e);
            }
            
            if (typeof Toast !== 'undefined') {
                Toast.show(`Switched to ${newType} account!`, 'success');
            }
            if (typeof Modal !== 'undefined' && typeof Modal.close === 'function') {
                Modal.close();
            }
            
            // Refresh the page to update nav and features
            setTimeout(() => window.location.reload(), 500);
        } catch (error) {
            console.error('Error switching account type:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Failed to switch account type', 'error');
            }
        }
    };

    /**
     * Show change password dialog
     */
    const showChangePassword = () => {
        if (typeof Modal === 'undefined') return;
        
        Modal.show({
            title: '🔑 Change Password',
            content: `
                <form class="change-password-form" id="change-pw-form">
                    <div class="form-field">
                        <label>Current Password</label>
                        <input type="password" name="currentPassword" required autocomplete="current-password">
                    </div>
                    <div class="form-field">
                        <label>New Password</label>
                        <input type="password" name="newPassword" required minlength="6" autocomplete="new-password">
                    </div>
                    <div class="form-field">
                        <label>Confirm New Password</label>
                        <input type="password" name="confirmPassword" required minlength="6" autocomplete="new-password">
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
            const cancelBtn = document.getElementById('pw-cancel');
            const submitBtn = document.getElementById('pw-submit');
            
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    if (typeof Modal.close === 'function') Modal.close();
                    App.showProfile();
                });
            }
            if (submitBtn) {
                submitBtn.addEventListener('click', () => {
                    const form = document.getElementById('change-pw-form');
                    if (form) {
                        App.handleChangePassword({ preventDefault: () => {}, target: form });
                    }
                });
            }
        }, 0);
    };

    /**
     * Handle change password
     */
    const handleChangePassword = async (event) => {
        event.preventDefault();
        
        try {
            const form = event.target;
            if (!form) return;
            
            const currentPassword = form.currentPassword?.value || '';
            const newPassword = form.newPassword?.value || '';
            const confirmPassword = form.confirmPassword?.value || '';
            const errorEl = document.getElementById('change-pw-error');

            if (newPassword !== confirmPassword) {
                if (errorEl) {
                    errorEl.textContent = 'Passwords do not match';
                    errorEl.classList.remove('hidden');
                }
                return;
            }

            if (typeof Auth === 'undefined' || typeof Auth.changePassword !== 'function') {
                throw new Error('Auth module not available');
            }

            const result = await Auth.changePassword(currentPassword, newPassword);
            if (result.success) {
                if (typeof Modal !== 'undefined' && typeof Modal.close === 'function') {
                    Modal.close();
                }
                if (typeof Toast !== 'undefined') {
                    Toast.show('Password updated successfully', 'success');
                }
            } else {
                if (errorEl) {
                    errorEl.textContent = result.error || 'Failed to change password';
                    errorEl.classList.remove('hidden');
                }
            }
        } catch (error) {
            console.error('Error changing password:', error);
            const errorEl = document.getElementById('change-pw-error');
            if (errorEl) {
                errorEl.textContent = 'An error occurred. Please try again.';
                errorEl.classList.remove('hidden');
            }
        }
    };

    /**
     * Show delete account dialog
     */
    const showDeleteAccount = () => {
        if (typeof Modal === 'undefined') return;
        
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
                        <input type="password" name="password" required autocomplete="current-password">
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
            const cancelBtn = document.getElementById('delete-cancel');
            const confirmBtn = document.getElementById('delete-confirm');
            
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    if (typeof Modal.close === 'function') Modal.close();
                    App.showProfile();
                });
            }
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    const form = document.getElementById('delete-account-form');
                    if (form) {
                        App.handleDeleteAccount({ preventDefault: () => {}, target: form });
                    }
                });
            }
        }, 0);
    };

    /**
     * Handle delete account
     */
    const handleDeleteAccount = async (event) => {
        event.preventDefault();
        
        try {
            const form = event.target;
            if (!form) return;
            
            const password = form.password?.value || '';
            const errorEl = document.getElementById('delete-error');

            if (!password) {
                if (errorEl) {
                    errorEl.textContent = 'Please enter your password';
                    errorEl.classList.remove('hidden');
                }
                return;
            }

            if (typeof Auth === 'undefined' || typeof Auth.deleteAccount !== 'function') {
                throw new Error('Auth module not available');
            }

            const result = await Auth.deleteAccount(password);
            if (result.success) {
                if (typeof Modal !== 'undefined' && typeof Modal.close === 'function') {
                    Modal.close();
                }
                if (typeof Toast !== 'undefined') {
                    Toast.show('Account deleted successfully', 'info');
                }
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                if (errorEl) {
                    errorEl.textContent = result.error || 'Failed to delete account';
                    errorEl.classList.remove('hidden');
                }
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            const errorEl = document.getElementById('delete-error');
            if (errorEl) {
                errorEl.textContent = 'An error occurred. Please try again.';
                errorEl.classList.remove('hidden');
            }
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
        showGuestModeBadge,
        hideGuestModeBadge,
        get tempAvatarColor() { return tempAvatarColor; },
        set tempAvatarColor(val) { tempAvatarColor = val; },
        get tempAvatarEmoji() { return tempAvatarEmoji; },
        set tempAvatarEmoji(val) { tempAvatarEmoji = val; }
    };
})();
