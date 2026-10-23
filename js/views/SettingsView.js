/**
 * SettingsView.js - Advanced Settings Management View
 * Comprehensive settings with study preferences, accessibility, privacy, and account security
 */

const SettingsView = {
    STORAGE_KEY: 'app_settings',
    currentSection: 'appearance',
    
    // Default settings with all new options
    defaults: {
        // Appearance
        sound: true,
        animations: true,
        darkMode: true,
        fontSize: 'medium',
        theme: 'default', // default, ocean, sunset, forest, midnight
        compactMode: false,
        
        // Study Preferences
        autoSave: true,
        showHints: true,
        showExplanations: true,
        questionTimer: false,
        timerDuration: 30, // seconds
        shuffleQuestions: true,
        shuffleAnswers: true,
        immediateFeeback: true,
        showCorrectAnswer: true,
        
        // Quiz Settings
        defaultQuestionCount: 10,
        difficultyPreference: 'mixed', // easy, medium, hard, mixed
        focusWeakTopics: false,
        repeatMissed: true,
        
        // Notifications
        notifications: true,
        streakReminders: true,
        dailyGoalReminder: true,
        reminderTime: '18:00',
        weeklyReport: true,
        
        // Accessibility
        reducedMotion: false,
        highContrast: false,
        largeClickTargets: false,
        screenReaderOptimized: false,
        dyslexiaFont: false,
        
        // Privacy
        showOnLeaderboard: true,
        shareProgress: true,
        analyticsEnabled: true,
        
        // Keyboard Shortcuts
        keyboardShortcuts: true,
        vimMode: false
    },

    // Theme presets
    THEMES: {
        default: { name: 'Default', primary: '#10b981', bg: '#1a1a2e', accent: '#6366f1' },
        ocean: { name: 'Ocean', primary: '#0ea5e9', bg: '#0f172a', accent: '#06b6d4' },
        sunset: { name: 'Sunset', primary: '#f97316', bg: '#1c1917', accent: '#f59e0b' },
        forest: { name: 'Forest', primary: '#22c55e', bg: '#14532d', accent: '#84cc16' },
        midnight: { name: 'Midnight', primary: '#8b5cf6', bg: '#0f0f23', accent: '#a855f7' }
    },

    /**
     * Get current settings with defaults fallback
     */
    getSettings: () => {
        try {
            if (typeof AppState !== 'undefined' && typeof AppState.getState === 'function') {
                const userSettings = AppState.getState('user.settings');
                if (userSettings && typeof userSettings === 'object') {
                    return { ...SettingsView.defaults, ...userSettings };
                }
            }
            
            if (typeof Storage !== 'undefined' && typeof Storage.load === 'function') {
                const stored = Storage.load(SettingsView.STORAGE_KEY);
                if (stored && typeof stored === 'object') {
                    return { ...SettingsView.defaults, ...stored };
                }
            }
            
            const raw = localStorage.getItem('csmaster_' + SettingsView.STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return { ...SettingsView.defaults, ...parsed };
            }
        } catch (error) {
            console.error('SettingsView: Error loading settings:', error);
        }
        
        return { ...SettingsView.defaults };
    },

    /**
     * Save settings to all persistence layers
     */
    saveSettings: (settings, options = {}) => {
        if (!settings || typeof settings !== 'object') {
            console.warn('SettingsView: Invalid settings object');
            return false;
        }
        
        try {
            const oldSettings = options._skipThemeCheck ? null : SettingsView.getSettings();
            const merged = { ...SettingsView.defaults, ...settings };
            
            if (typeof AppState !== 'undefined' && typeof AppState.setState === 'function') {
                AppState.setState('user.settings', merged);
            }
            
            if (typeof Storage !== 'undefined' && typeof Storage.save === 'function') {
                Storage.save(SettingsView.STORAGE_KEY, merged);
            }
            
            try {
                localStorage.setItem('csmaster_' + SettingsView.STORAGE_KEY, JSON.stringify(merged));
            } catch (e) {
                console.warn('SettingsView: localStorage save failed');
            }
            
            if (typeof EventBus !== 'undefined' && typeof EventBus.emit === 'function') {
                EventBus.emit('settings:changed', merged);
                if (oldSettings && merged.darkMode !== oldSettings.darkMode) {
                    EventBus.emit('theme:changed', merged.darkMode ? 'dark' : 'light');
                }
            }
            
            return true;
        } catch (error) {
            console.error('SettingsView: Error saving settings:', error);
            return false;
        }
    },

    /**
     * Update a single setting
     */
    updateSetting: (key, value, silent = false) => {
        if (!key || typeof key !== 'string') return false;
        
        const current = SettingsView.getSettings();
        current[key] = value;
        
        const success = SettingsView.saveSettings(current);
        
        // Apply special settings immediately
        if (success) {
            if (key === 'darkMode') SettingsView.applyTheme(value);
            if (key === 'fontSize') SettingsView.applyFontSize(value);
            if (key === 'theme') SettingsView.applyColorTheme(value);
            if (key === 'reducedMotion') SettingsView.applyReducedMotion(value);
            if (key === 'highContrast') SettingsView.applyHighContrast(value);
            if (key === 'dyslexiaFont') SettingsView.applyDyslexiaFont(value);
            if (key === 'compactMode') SettingsView.applyCompactMode(value);
            if (key === 'animations') SettingsView.applyAnimations(value);
        }
        
        if (success && !silent && typeof Toast !== 'undefined') {
            Toast.show('Setting saved', 'success');
        }
        
        return success;
    },

    /**
     * Apply theme (dark/light mode)
     */
    applyTheme: (isDark) => {
        const html = document.documentElement;
        const body = document.body;
        
        if (isDark) {
            html.classList.add('dark-mode');
            html.classList.remove('light-mode');
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            html.setAttribute('data-theme', 'dark');
        } else {
            html.classList.remove('dark-mode');
            html.classList.add('light-mode');
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            html.setAttribute('data-theme', 'light');
        }
        
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', isDark ? '#1a1a2e' : '#ffffff');
        }
    },

    /**
     * Apply color theme
     */
    applyColorTheme: (themeName) => {
        const theme = SettingsView.THEMES[themeName] || SettingsView.THEMES.default;
        const root = document.documentElement;
        
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--accent', theme.accent);
        root.setAttribute('data-color-theme', themeName);
    },

    /**
     * Toggle theme between dark and light
     */
    toggleTheme: () => {
        const settings = SettingsView.getSettings();
        const newDarkMode = !settings.darkMode;
        SettingsView.updateSetting('darkMode', newDarkMode);
        
        const toggle = document.getElementById('theme-toggle');
        if (toggle) toggle.checked = newDarkMode;
        
        return newDarkMode;
    },

    /**
     * Apply font size setting
     */
    applyFontSize: (size) => {
        const html = document.documentElement;
        html.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
        html.classList.add(`font-${size || 'medium'}`);
    },

    /**
     * Apply reduced motion
     */
    applyReducedMotion: (enabled) => {
        document.documentElement.classList.toggle('reduced-motion', enabled);
    },

    /**
     * Apply high contrast
     */
    applyHighContrast: (enabled) => {
        document.documentElement.classList.toggle('high-contrast', enabled);
    },

    /**
     * Apply dyslexia-friendly font
     */
    applyDyslexiaFont: (enabled) => {
        document.documentElement.classList.toggle('dyslexia-font', enabled);
    },

    /**
     * Apply compact mode
     */
    applyCompactMode: (enabled) => {
        document.documentElement.classList.toggle('compact-mode', enabled);
    },

    /**
     * Apply animations setting
     */
    applyAnimations: (enabled) => {
        document.documentElement.classList.toggle('no-animations', !enabled);
    },

    /**
     * Export all user data as JSON
     */
    exportData: () => {
        try {
            const exportObj = {
                version: '2.0',
                exportDate: new Date().toISOString(),
                settings: SettingsView.getSettings()
            };
            
            if (typeof Storage !== 'undefined' && typeof Storage.exportAll === 'function') {
                exportObj.data = Storage.exportAll();
            } else {
                exportObj.data = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('csmaster_')) {
                        const shortKey = key.substring(9);
                        try {
                            exportObj.data[shortKey] = JSON.parse(localStorage.getItem(key));
                        } catch (e) {
                            exportObj.data[shortKey] = localStorage.getItem(key);
                        }
                    }
                }
            }
            
            if (typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function') {
                const user = Auth.getCurrentUser();
                if (user) {
                    exportObj.userProfile = {
                        username: user.username,
                        email: user.email,
                        accountType: user.accountType,
                        profile: user.profile
                    };
                }
            }
            
            const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cs-master-pro-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            if (typeof Toast !== 'undefined') {
                Toast.show('Data exported successfully!', 'success');
            }
            
            return true;
        } catch (error) {
            console.error('SettingsView: Export error:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Failed to export data', 'error');
            }
            return false;
        }
    },

    /**
     * Import user data from JSON file
     */
    importData: (file) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file provided'));
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const importObj = JSON.parse(content);
                    
                    if (!importObj || typeof importObj !== 'object') {
                        throw new Error('Invalid import file format');
                    }
                    
                    const supportedVersions = ['1.0', '2.0'];
                    if (importObj.version && !supportedVersions.includes(importObj.version)) {
                        throw new Error(`Unsupported backup version: ${importObj.version}`);
                    }
                    
                    if (importObj.settings && typeof importObj.settings === 'object') {
                        const validSettings = {};
                        const allowedKeys = Object.keys(SettingsView.defaults);
                        for (const [key, value] of Object.entries(importObj.settings)) {
                            if (allowedKeys.includes(key)) {
                                validSettings[key] = value;
                            }
                        }
                        SettingsView.saveSettings(validSettings, { _skipThemeCheck: true });
                    }
                    
                    if (importObj.data && typeof importObj.data === 'object') {
                        if (typeof Storage !== 'undefined' && typeof Storage.importAll === 'function') {
                            Storage.importAll(importObj.data, true);
                        } else {
                            for (const [key, value] of Object.entries(importObj.data)) {
                                if (key === SettingsView.STORAGE_KEY) continue;
                                try {
                                    localStorage.setItem('csmaster_' + key, JSON.stringify(value));
                                } catch (e) {
                                    console.warn('SettingsView: Failed to import key:', key);
                                }
                            }
                        }
                    }
                    
                    if (typeof AppState !== 'undefined' && typeof AppState.init === 'function') {
                        AppState.init();
                    }
                    
                    if (typeof Toast !== 'undefined') {
                        Toast.show('Data imported successfully! Refreshing...', 'success');
                    }
                    
                    setTimeout(() => window.location.reload(), 1500);
                    resolve(true);
                } catch (error) {
                    console.error('SettingsView: Import error:', error);
                    if (typeof Toast !== 'undefined') {
                        Toast.show('Failed to import data: ' + error.message, 'error');
                    }
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                const error = new Error('Failed to read file');
                if (typeof Toast !== 'undefined') {
                    Toast.show('Failed to read file', 'error');
                }
                reject(error);
            };
            
            reader.readAsText(file);
        });
    },

    /**
     * Trigger file input for import
     */
    triggerImport: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        
        input.onchange = (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                SettingsView.importData(file).catch(err => {
                    console.error('Import failed:', err);
                });
            }
        };
        
        input.click();
    },

    /**
     * Clear all app data
     */
    clearAllData: () => {
        if (typeof Modal !== 'undefined' && typeof Modal.show === 'function') {
            Modal.show({
                title: '⚠️ Clear All Data',
                content: `
                    <div class="warning-modal">
                        <p><strong>This will permanently delete:</strong></p>
                        <ul>
                            <li>All your progress and XP</li>
                            <li>Quiz history and scores</li>
                            <li>Bookmarks and notes</li>
                            <li>All saved settings</li>
                        </ul>
                        <p class="danger-text">This action cannot be undone!</p>
                    </div>
                `,
                footer: `
                    <button class="btn btn-secondary" onclick="Modal.close()">Cancel</button>
                    <button class="btn btn-danger" onclick="SettingsView.confirmClearData()">Delete Everything</button>
                `
            });
        } else {
            if (confirm('This will delete all your data. Are you sure?')) {
                SettingsView.confirmClearData();
            }
        }
    },

    /**
     * Confirm and execute data clearing
     */
    confirmClearData: () => {
        try {
            if (typeof Storage !== 'undefined' && typeof Storage.clear === 'function') {
                Storage.clear();
            }
            
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('csmaster_')) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
            sessionStorage.clear();
            
            if (typeof Modal !== 'undefined' && typeof Modal.close === 'function') {
                Modal.close();
            }
            
            if (typeof Toast !== 'undefined') {
                Toast.show('All data cleared. Refreshing...', 'info');
            }
            
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error('SettingsView: Error clearing data:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Failed to clear data', 'error');
            }
        }
    },

    /**
     * Reset settings to defaults
     */
    resetToDefaults: () => {
        if (typeof Modal !== 'undefined') {
            Modal.show({
                title: '🔄 Reset Settings',
                content: '<p>This will reset all settings to their default values. Your progress and data will NOT be affected.</p>',
                footer: `
                    <button class="btn btn-secondary" onclick="Modal.close()">Cancel</button>
                    <button class="btn btn-primary" onclick="SettingsView.confirmReset()">Reset Settings</button>
                `
            });
        } else {
            if (confirm('Reset all settings to defaults?')) {
                SettingsView.confirmReset();
            }
        }
    },

    /**
     * Confirm settings reset
     */
    confirmReset: () => {
        SettingsView.saveSettings({ ...SettingsView.defaults });
        SettingsView.applyAllSettings();
        
        if (typeof Modal !== 'undefined') Modal.close();
        if (typeof Toast !== 'undefined') Toast.show('Settings reset to defaults', 'success');
        
        // Re-render
        const container = document.getElementById('app-main') || document.getElementById('app');
        if (container) {
            container.innerHTML = SettingsView.render();
            SettingsView.init();
        }
    },

    /**
     * Apply all settings on load
     */
    applyAllSettings: () => {
        const settings = SettingsView.getSettings();
        SettingsView.applyTheme(settings.darkMode);
        SettingsView.applyFontSize(settings.fontSize);
        SettingsView.applyColorTheme(settings.theme);
        SettingsView.applyReducedMotion(settings.reducedMotion);
        SettingsView.applyHighContrast(settings.highContrast);
        SettingsView.applyDyslexiaFont(settings.dyslexiaFont);
        SettingsView.applyCompactMode(settings.compactMode);
        SettingsView.applyAnimations(settings.animations);
    },

    /**
     * Get keyboard shortcuts list
     */
    getShortcuts: () => [
        { keys: '1-4 / A-D', action: 'Select answer option' },
        { keys: 'Enter', action: 'Next question / Confirm' },
        { keys: 'Space', action: 'Pause / Resume' },
        { keys: 'H', action: 'Use hint (if available)' },
        { keys: 'S', action: 'Skip question (if allowed)' },
        { keys: 'Esc', action: 'Exit / Close modal' },
        { keys: '?', action: 'Show keyboard shortcuts' },
        { keys: 'Ctrl + D', action: 'Toggle dark mode' }
    ],

    /**
     * Render section navigation
     */
    renderSectionNav: () => {
        const sections = [
            { id: 'appearance', name: 'Appearance', icon: '🎨' },
            { id: 'study', name: 'Study', icon: '📚' },
            { id: 'quiz', name: 'Quiz', icon: '❓' },
            { id: 'notifications', name: 'Notifications', icon: '🔔' },
            { id: 'accessibility', name: 'Accessibility', icon: '♿' },
            { id: 'privacy', name: 'Privacy', icon: '🔒' },
            { id: 'shortcuts', name: 'Shortcuts', icon: '⌨️' },
            { id: 'data', name: 'Data', icon: '💾' },
            { id: 'account', name: 'Account', icon: '👤' }
        ];
        
        return `
            <nav class="settings-nav">
                ${sections.map(s => `
                    <button class="settings-nav-item ${SettingsView.currentSection === s.id ? 'active' : ''}" 
                            onclick="SettingsView.switchSection('${s.id}')">
                        <span class="nav-icon">${s.icon}</span>
                        <span class="nav-text">${s.name}</span>
                    </button>
                `).join('')}
            </nav>
        `;
    },

    /**
     * Switch section
     */
    switchSection: (sectionId) => {
        SettingsView.currentSection = sectionId;
        
        // Update nav
        document.querySelectorAll('.settings-nav-item').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.toLowerCase().includes(sectionId) || btn.onclick.toString().includes(sectionId));
        });
        
        // Update content
        document.querySelectorAll('.settings-section').forEach(section => {
            section.classList.toggle('active', section.id === `section-${sectionId}`);
        });
        
        // Update nav active state properly
        document.querySelectorAll('.settings-nav-item').forEach(btn => {
            const onclick = btn.getAttribute('onclick') || '';
            btn.classList.toggle('active', onclick.includes(`'${sectionId}'`));
        });
    },

    /**
     * Render toggle setting
     */
    renderToggle: (id, key, label, desc, checked) => {
        return `
            <div class="setting-item">
                <div class="setting-info">
                    <span class="setting-label">${label}</span>
                    <span class="setting-desc">${desc}</span>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} 
                           onchange="SettingsView.updateSetting('${key}', this.checked)">
                    <span class="toggle-slider"></span>
                </label>
            </div>
        `;
    },

    /**
     * Main render function
     */
    render: () => {
        const settings = SettingsView.getSettings();
        const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
            ? Auth.getCurrentUser() 
            : null;
        
        return `
            <div class="settings-view advanced">
                <div class="view-header">
                    <h1>⚙️ Settings</h1>
                    <p>Customize your learning experience</p>
                </div>
                
                <div class="settings-layout">
                    ${SettingsView.renderSectionNav()}
                    
                    <div class="settings-content">
                        <!-- Appearance Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'appearance' ? 'active' : ''}" id="section-appearance">
                            <h3>🎨 Appearance</h3>
                            <div class="settings-list">
                                ${SettingsView.renderToggle('theme-toggle', 'darkMode', 'Dark Mode', 'Use dark theme for reduced eye strain', settings.darkMode)}
                                ${SettingsView.renderToggle('animation-toggle', 'animations', 'Animations', 'Enable smooth transitions and effects', settings.animations)}
                                ${SettingsView.renderToggle('compact-toggle', 'compactMode', 'Compact Mode', 'Reduce spacing for more content', settings.compactMode)}
                                
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Font Size</span>
                                        <span class="setting-desc">Adjust text size for readability</span>
                                    </div>
                                    <select id="font-size-select" class="setting-select" onchange="SettingsView.updateSetting('fontSize', this.value)">
                                        <option value="small" ${settings.fontSize === 'small' ? 'selected' : ''}>Small</option>
                                        <option value="medium" ${settings.fontSize === 'medium' ? 'selected' : ''}>Medium</option>
                                        <option value="large" ${settings.fontSize === 'large' ? 'selected' : ''}>Large</option>
                                        <option value="xlarge" ${settings.fontSize === 'xlarge' ? 'selected' : ''}>Extra Large</option>
                                    </select>
                                </div>
                                
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Color Theme</span>
                                        <span class="setting-desc">Choose your preferred color scheme</span>
                                    </div>
                                    <div class="theme-picker">
                                        ${Object.entries(SettingsView.THEMES).map(([id, theme]) => `
                                            <button class="theme-option ${settings.theme === id ? 'active' : ''}" 
                                                    onclick="SettingsView.updateSetting('theme', '${id}')"
                                                    style="--theme-color: ${theme.primary}"
                                                    title="${theme.name}">
                                                <span class="theme-dot"></span>
                                            </button>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Study Preferences Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'study' ? 'active' : ''}" id="section-study">
                            <h3>📚 Study Preferences</h3>
                            <div class="settings-list">
                                ${SettingsView.renderToggle('autosave-toggle', 'autoSave', 'Auto-Save Progress', 'Automatically save your progress', settings.autoSave)}
                                ${SettingsView.renderToggle('hints-toggle', 'showHints', 'Show Hints', 'Display helpful hints during quizzes', settings.showHints)}
                                ${SettingsView.renderToggle('explanations-toggle', 'showExplanations', 'Show Explanations', 'Show detailed explanations after answers', settings.showExplanations)}
                                ${SettingsView.renderToggle('feedback-toggle', 'immediateFeeback', 'Immediate Feedback', 'Show correct/incorrect immediately', settings.immediateFeeback)}
                                ${SettingsView.renderToggle('correct-toggle', 'showCorrectAnswer', 'Show Correct Answer', 'Reveal correct answer when wrong', settings.showCorrectAnswer)}
                            </div>
                        </div>
                        
                        <!-- Quiz Settings Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'quiz' ? 'active' : ''}" id="section-quiz">
                            <h3>❓ Quiz Settings</h3>
                            <div class="settings-list">
                                ${SettingsView.renderToggle('shuffle-q-toggle', 'shuffleQuestions', 'Shuffle Questions', 'Randomize question order', settings.shuffleQuestions)}
                                ${SettingsView.renderToggle('shuffle-a-toggle', 'shuffleAnswers', 'Shuffle Answers', 'Randomize answer positions', settings.shuffleAnswers)}
                                ${SettingsView.renderToggle('timer-toggle', 'questionTimer', 'Question Timer', 'Add time limit per question', settings.questionTimer)}
                                ${SettingsView.renderToggle('weak-toggle', 'focusWeakTopics', 'Focus Weak Topics', 'Prioritize topics you struggle with', settings.focusWeakTopics)}
                                ${SettingsView.renderToggle('repeat-toggle', 'repeatMissed', 'Repeat Missed', 'Show missed questions again later', settings.repeatMissed)}
                                
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Default Question Count</span>
                                        <span class="setting-desc">Number of questions per quiz</span>
                                    </div>
                                    <select id="question-count" class="setting-select" onchange="SettingsView.updateSetting('defaultQuestionCount', parseInt(this.value))">
                                        <option value="5" ${settings.defaultQuestionCount === 5 ? 'selected' : ''}>5 questions</option>
                                        <option value="10" ${settings.defaultQuestionCount === 10 ? 'selected' : ''}>10 questions</option>
                                        <option value="20" ${settings.defaultQuestionCount === 20 ? 'selected' : ''}>20 questions</option>
                                        <option value="50" ${settings.defaultQuestionCount === 50 ? 'selected' : ''}>50 questions</option>
                                    </select>
                                </div>
                                
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Timer Duration</span>
                                        <span class="setting-desc">Seconds per question (when timer enabled)</span>
                                    </div>
                                    <select id="timer-duration" class="setting-select" onchange="SettingsView.updateSetting('timerDuration', parseInt(this.value))" ${!settings.questionTimer ? 'disabled' : ''}>
                                        <option value="15" ${settings.timerDuration === 15 ? 'selected' : ''}>15 seconds</option>
                                        <option value="30" ${settings.timerDuration === 30 ? 'selected' : ''}>30 seconds</option>
                                        <option value="45" ${settings.timerDuration === 45 ? 'selected' : ''}>45 seconds</option>
                                        <option value="60" ${settings.timerDuration === 60 ? 'selected' : ''}>60 seconds</option>
                                    </select>
                                </div>
                                
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Difficulty Preference</span>
                                        <span class="setting-desc">Choose your preferred difficulty</span>
                                    </div>
                                    <select id="difficulty" class="setting-select" onchange="SettingsView.updateSetting('difficultyPreference', this.value)">
                                        <option value="easy" ${settings.difficultyPreference === 'easy' ? 'selected' : ''}>Easy</option>
                                        <option value="medium" ${settings.difficultyPreference === 'medium' ? 'selected' : ''}>Medium</option>
                                        <option value="hard" ${settings.difficultyPreference === 'hard' ? 'selected' : ''}>Hard</option>
                                        <option value="mixed" ${settings.difficultyPreference === 'mixed' ? 'selected' : ''}>Mixed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Notifications Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'notifications' ? 'active' : ''}" id="section-notifications">
                            <h3>🔔 Notifications</h3>
                            <div class="settings-list">
                                ${SettingsView.renderToggle('notif-toggle', 'notifications', 'Enable Notifications', 'Receive app notifications', settings.notifications)}
                                ${SettingsView.renderToggle('streak-toggle', 'streakReminders', 'Streak Reminders', 'Get reminded to maintain your streak', settings.streakReminders)}
                                ${SettingsView.renderToggle('goal-toggle', 'dailyGoalReminder', 'Daily Goal Reminder', 'Remind me to complete daily goals', settings.dailyGoalReminder)}
                                ${SettingsView.renderToggle('report-toggle', 'weeklyReport', 'Weekly Report', 'Receive weekly progress summary', settings.weeklyReport)}
                                
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Reminder Time</span>
                                        <span class="setting-desc">When to send daily reminders</span>
                                    </div>
                                    <input type="time" id="reminder-time" class="setting-input" 
                                           value="${settings.reminderTime}" 
                                           onchange="SettingsView.updateSetting('reminderTime', this.value)"
                                           ${!settings.notifications ? 'disabled' : ''}>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Accessibility Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'accessibility' ? 'active' : ''}" id="section-accessibility">
                            <h3>♿ Accessibility</h3>
                            <div class="settings-list">
                                ${SettingsView.renderToggle('motion-toggle', 'reducedMotion', 'Reduced Motion', 'Minimize animations and transitions', settings.reducedMotion)}
                                ${SettingsView.renderToggle('contrast-toggle', 'highContrast', 'High Contrast', 'Increase color contrast for visibility', settings.highContrast)}
                                ${SettingsView.renderToggle('targets-toggle', 'largeClickTargets', 'Large Click Targets', 'Make buttons and links easier to tap', settings.largeClickTargets)}
                                ${SettingsView.renderToggle('reader-toggle', 'screenReaderOptimized', 'Screen Reader Optimized', 'Optimize for screen readers', settings.screenReaderOptimized)}
                                ${SettingsView.renderToggle('dyslexia-toggle', 'dyslexiaFont', 'Dyslexia-Friendly Font', 'Use a font designed for dyslexia', settings.dyslexiaFont)}
                            </div>
                        </div>
                        
                        <!-- Privacy Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'privacy' ? 'active' : ''}" id="section-privacy">
                            <h3>🔒 Privacy</h3>
                            <div class="settings-list">
                                ${SettingsView.renderToggle('leaderboard-toggle', 'showOnLeaderboard', 'Show on Leaderboard', 'Display your name on public leaderboards', settings.showOnLeaderboard)}
                                ${SettingsView.renderToggle('share-toggle', 'shareProgress', 'Share Progress', 'Allow teachers to see your progress', settings.shareProgress)}
                                ${SettingsView.renderToggle('analytics-toggle', 'analyticsEnabled', 'Usage Analytics', 'Help improve the app with anonymous data', settings.analyticsEnabled)}
                            </div>
                        </div>
                        
                        <!-- Keyboard Shortcuts Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'shortcuts' ? 'active' : ''}" id="section-shortcuts">
                            <h3>⌨️ Keyboard Shortcuts</h3>
                            <div class="settings-list">
                                ${SettingsView.renderToggle('shortcuts-toggle', 'keyboardShortcuts', 'Enable Shortcuts', 'Use keyboard for navigation', settings.keyboardShortcuts)}
                                ${SettingsView.renderToggle('vim-toggle', 'vimMode', 'Vim Mode', 'Use Vim-style navigation (h/j/k/l)', settings.vimMode)}
                            </div>
                            
                            <div class="shortcuts-list">
                                <h4>Available Shortcuts</h4>
                                <div class="shortcuts-grid">
                                    ${SettingsView.getShortcuts().map(s => `
                                        <div class="shortcut-item">
                                            <kbd class="shortcut-keys">${s.keys}</kbd>
                                            <span class="shortcut-action">${s.action}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Data Management Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'data' ? 'active' : ''}" id="section-data">
                            <h3>💾 Data Management</h3>
                            <div class="settings-list">
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Export Data</span>
                                        <span class="setting-desc">Download all your data as a backup</span>
                                    </div>
                                    <button class="btn btn-secondary btn-small" onclick="SettingsView.exportData()">
                                        📥 Export
                                    </button>
                                </div>
                                
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Import Data</span>
                                        <span class="setting-desc">Restore from a previous backup</span>
                                    </div>
                                    <button class="btn btn-secondary btn-small" onclick="SettingsView.triggerImport()">
                                        📤 Import
                                    </button>
                                </div>
                                
                                <div class="setting-item">
                                    <div class="setting-info">
                                        <span class="setting-label">Reset Settings</span>
                                        <span class="setting-desc">Restore all settings to defaults</span>
                                    </div>
                                    <button class="btn btn-warning btn-small" onclick="SettingsView.resetToDefaults()">
                                        🔄 Reset
                                    </button>
                                </div>
                                
                                <div class="setting-item danger">
                                    <div class="setting-info">
                                        <span class="setting-label">Clear All Data</span>
                                        <span class="setting-desc">Delete all saved progress and settings</span>
                                    </div>
                                    <button class="btn btn-danger btn-small" onclick="SettingsView.clearAllData()">
                                        🗑️ Clear
                                    </button>
                                </div>
                            </div>
                            
                            <div class="storage-info" id="storage-info">
                                <p>Loading storage information...</p>
                            </div>
                        </div>
                        
                        <!-- Account Section -->
                        <div class="settings-section ${SettingsView.currentSection === 'account' ? 'active' : ''}" id="section-account">
                            <h3>👤 Account</h3>
                            ${user ? `
                                <div class="account-info">
                                    <div class="account-header">
                                        <div class="account-avatar" style="background: ${user.avatarColor || '#10b981'}">
                                            ${user.avatarEmoji || (user.username || 'U').charAt(0).toUpperCase()}
                                        </div>
                                        <div class="account-details">
                                            <span class="account-name">${user.username || 'User'}</span>
                                            <span class="account-email">${user.email || ''}</span>
                                            <span class="account-type">${user.accountType === 'teacher' ? '👩‍🏫 Teacher' : '🎒 Student'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="settings-list">
                                    <div class="setting-item">
                                        <div class="setting-info">
                                            <span class="setting-label">Change Password</span>
                                            <span class="setting-desc">Update your account password</span>
                                        </div>
                                        <button class="btn btn-secondary btn-small" onclick="App.showChangePassword()">
                                            🔑 Change
                                        </button>
                                    </div>
                                    <div class="setting-item">
                                        <div class="setting-info">
                                            <span class="setting-label">Account Type</span>
                                            <span class="setting-desc">Switch between student and teacher</span>
                                        </div>
                                        <button class="btn btn-secondary btn-small" onclick="App.showSwitchAccountType()">
                                            🔄 Switch
                                        </button>
                                    </div>
                                    <div class="setting-item danger">
                                        <div class="setting-info">
                                            <span class="setting-label">Delete Account</span>
                                            <span class="setting-desc">Permanently delete your account</span>
                                        </div>
                                        <button class="btn btn-danger btn-small" onclick="App.showDeleteAccount()">
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ` : `
                                <div class="auth-prompt">
                                    <p>Sign in to manage your account settings</p>
                                    <button class="btn btn-primary" onclick="App.showAuthModal('login')">Sign In</button>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Initialize view and bind events
     */
    init: () => {
        try {
            // Update storage info
            SettingsView.updateStorageInfo();
            
            // Apply all current settings
            SettingsView.applyAllSettings();
            
            // Bind timer toggle to enable/disable duration
            const timerToggle = document.getElementById('timer-toggle');
            const timerDuration = document.getElementById('timer-duration');
            if (timerToggle && timerDuration) {
                timerToggle.addEventListener('change', () => {
                    timerDuration.disabled = !timerToggle.checked;
                });
            }
            
            // Bind notifications toggle to enable/disable reminder time
            const notifToggle = document.getElementById('notif-toggle');
            const reminderTime = document.getElementById('reminder-time');
            if (notifToggle && reminderTime) {
                notifToggle.addEventListener('change', () => {
                    reminderTime.disabled = !notifToggle.checked;
                });
            }
            
        } catch (error) {
            console.error('SettingsView: Init error:', error);
        }
    },

    /**
     * Update storage usage display
     */
    updateStorageInfo: () => {
        const container = document.getElementById('storage-info');
        if (!container) return;
        
        try {
            let info = { used: 0, items: 0 };
            
            if (typeof Storage !== 'undefined' && typeof Storage.getUsageInfo === 'function') {
                info = Storage.getUsageInfo();
            } else {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('csmaster_')) {
                        const value = localStorage.getItem(key);
                        info.used += key.length + (value ? value.length : 0);
                        info.items++;
                    }
                }
                info.usedKB = Math.round(info.used / 1024 * 100) / 100;
            }
            
            // Estimate quota (5MB typical)
            const quotaKB = 5120;
            const percentage = Math.min(100, ((info.usedKB || info.used / 1024) / quotaKB) * 100);
            
            container.innerHTML = `
                <h4>📊 Storage Usage</h4>
                <div class="storage-bar">
                    <div class="storage-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="storage-stats">
                    <span>${(info.usedKB || info.used / 1024).toFixed(2)} KB used</span>
                    <span>${info.items} items</span>
                    <span>~${quotaKB} KB available</span>
                </div>
            `;
        } catch (error) {
            container.innerHTML = '<p>Unable to load storage info</p>';
        }
    },

    /**
     * Cleanup when leaving view
     */
    cleanup: () => {
        SettingsView.currentSection = 'appearance';
    }
};

// Initialize theme on load
(function() {
    try {
        SettingsView.applyAllSettings();
    } catch (e) {
        // Silent fail on initial load
    }
})();

// Make globally available
if (typeof window !== 'undefined') {
    window.SettingsView = SettingsView;
}
