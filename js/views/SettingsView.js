/**
 * SettingsView.js - Settings Management View
 * Handles setting persistence, theme switching, and data export/import
 */

const SettingsView = {
    STORAGE_KEY: 'app_settings',
    
    // Default settings
    defaults: {
        sound: true,
        animations: true,
        darkMode: true,
        fontSize: 'medium',
        autoSave: true,
        showHints: true,
        notifications: true
    },

    /**
     * Get current settings with defaults fallback
     */
    getSettings: () => {
        try {
            // Try AppState first
            if (typeof AppState !== 'undefined' && typeof AppState.getState === 'function') {
                const userSettings = AppState.getState('user.settings');
                if (userSettings && typeof userSettings === 'object') {
                    return { ...SettingsView.defaults, ...userSettings };
                }
            }
            
            // Fallback to Storage
            if (typeof Storage !== 'undefined' && typeof Storage.load === 'function') {
                const stored = Storage.load(SettingsView.STORAGE_KEY);
                if (stored && typeof stored === 'object') {
                    return { ...SettingsView.defaults, ...stored };
                }
            }
            
            // Fallback to localStorage
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
            // Get old settings BEFORE merging/saving for comparison
            const oldSettings = options._skipThemeCheck ? null : SettingsView.getSettings();
            const merged = { ...SettingsView.defaults, ...settings };
            
            // Save to AppState (triggers reactive updates)
            if (typeof AppState !== 'undefined' && typeof AppState.setState === 'function') {
                AppState.setState('user.settings', merged);
            }
            
            // Save to Storage module
            if (typeof Storage !== 'undefined' && typeof Storage.save === 'function') {
                Storage.save(SettingsView.STORAGE_KEY, merged);
            }
            
            // Also save to localStorage directly for redundancy
            try {
                localStorage.setItem('csmaster_' + SettingsView.STORAGE_KEY, JSON.stringify(merged));
            } catch (e) {
                // localStorage might be full
                console.warn('SettingsView: localStorage save failed, quota may be exceeded');
            }
            
            // Emit event for other components
            if (typeof EventBus !== 'undefined' && typeof EventBus.emit === 'function') {
                EventBus.emit('settings:changed', merged);
                // Only emit theme:changed if theme actually changed
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
    updateSetting: (key, value) => {
        if (!key || typeof key !== 'string') return false;
        
        const current = SettingsView.getSettings();
        current[key] = value;
        
        const success = SettingsView.saveSettings(current);
        
        // Apply theme immediately if darkMode changed
        if (success && key === 'darkMode') {
            SettingsView.applyTheme(value);
        }
        
        if (success && typeof Toast !== 'undefined') {
            Toast.show('Setting saved', 'success');
        }
        
        return success;
    },

    /**
     * Apply theme (dark/light mode)
     */
    applyTheme: (isDark) => {
        try {
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
            
            // Update meta theme-color for mobile browsers
            const metaTheme = document.querySelector('meta[name="theme-color"]');
            if (metaTheme) {
                metaTheme.setAttribute('content', isDark ? '#1a1a2e' : '#ffffff');
            }
            
            // Emit event
            if (typeof EventBus !== 'undefined' && typeof EventBus.emit === 'function') {
                EventBus.emit('theme:changed', isDark ? 'dark' : 'light');
            }
        } catch (error) {
            console.error('SettingsView: Error applying theme:', error);
        }
    },

    /**
     * Toggle theme between dark and light
     */
    toggleTheme: () => {
        const settings = SettingsView.getSettings();
        const newDarkMode = !settings.darkMode;
        
        // updateSetting handles saving and applies theme
        SettingsView.updateSetting('darkMode', newDarkMode);
        
        // Update UI toggle if visible
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.checked = newDarkMode;
        }
        
        return newDarkMode;
    },

    /**
     * Export all user data as JSON
     */
    exportData: () => {
        try {
            const exportObj = {
                version: '1.0',
                exportDate: new Date().toISOString(),
                settings: SettingsView.getSettings()
            };
            
            // Get all app data from Storage
            if (typeof Storage !== 'undefined' && typeof Storage.exportAll === 'function') {
                exportObj.data = Storage.exportAll();
            } else {
                // Fallback: manually collect from localStorage
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
            
            // Get user profile if logged in
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
            
            // Create and download file
            const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cs-theory-backup-${new Date().toISOString().split('T')[0]}.json`;
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
                    let importObj;
                    
                    try {
                        importObj = JSON.parse(content);
                    } catch (parseError) {
                        throw new Error('Invalid JSON format');
                    }
                    
                    // Validate import format
                    if (!importObj || typeof importObj !== 'object') {
                        throw new Error('Invalid import file format');
                    }
                    
                    // Validate version compatibility
                    const supportedVersions = ['1.0'];
                    if (importObj.version && !supportedVersions.includes(importObj.version)) {
                        throw new Error(`Unsupported backup version: ${importObj.version}. Supported: ${supportedVersions.join(', ')}`);
                    }
                    
                    // Validate required structure
                    if (!importObj.settings && !importObj.data) {
                        throw new Error('Import file contains no settings or data');
                    }
                    
                    // Import settings
                    if (importObj.settings && typeof importObj.settings === 'object') {
                        // Validate settings have expected structure
                        const validSettings = {};
                        const allowedKeys = Object.keys(SettingsView.defaults);
                        for (const [key, value] of Object.entries(importObj.settings)) {
                            if (allowedKeys.includes(key)) {
                                validSettings[key] = value;
                            }
                        }
                        SettingsView.saveSettings(validSettings, { _skipThemeCheck: true });
                    }
                    
                    // Import data using Storage module
                    if (importObj.data && typeof importObj.data === 'object') {
                        if (typeof Storage !== 'undefined' && typeof Storage.importAll === 'function') {
                            Storage.importAll(importObj.data, true); // overwrite = true
                        } else {
                            // Fallback: manually import to localStorage
                            for (const [key, value] of Object.entries(importObj.data)) {
                                // Skip importing the settings key since we handled it above
                                if (key === SettingsView.STORAGE_KEY) continue;
                                try {
                                    localStorage.setItem('csmaster_' + key, JSON.stringify(value));
                                } catch (e) {
                                    console.warn('SettingsView: Failed to import key:', key);
                                }
                            }
                        }
                    }
                    
                    // Reload state
                    if (typeof AppState !== 'undefined' && typeof AppState.init === 'function') {
                        AppState.init();
                    }
                    
                    if (typeof Toast !== 'undefined') {
                        Toast.show('Data imported successfully! Refreshing...', 'success');
                    }
                    
                    // Refresh page after short delay to apply changes
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    
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
            // Clear Storage module data
            if (typeof Storage !== 'undefined' && typeof Storage.clear === 'function') {
                Storage.clear();
            }
            
            // Clear all csmaster_ prefixed items
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('csmaster_')) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
            
            // Clear session storage too
            sessionStorage.clear();
            
            if (typeof Modal !== 'undefined' && typeof Modal.close === 'function') {
                Modal.close();
            }
            
            if (typeof Toast !== 'undefined') {
                Toast.show('All data cleared. Refreshing...', 'info');
            }
            
            // Reload after delay
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('SettingsView: Error clearing data:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Failed to clear data', 'error');
            }
        }
    },

    /**
     * Render the settings view
     */
    render: () => {
        const settings = SettingsView.getSettings();
        const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
            ? Auth.getCurrentUser() 
            : null;
        
        return `
            <div class="settings-view">
                <div class="view-header">
                    <h1>⚙️ Settings</h1>
                    <p>Customize your learning experience</p>
                </div>
                
                <div class="settings-container">
                    <!-- Appearance Section -->
                    <div class="settings-section">
                        <h3>🎨 Appearance</h3>
                        <div class="settings-list">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <span class="setting-label">Dark Mode</span>
                                    <span class="setting-desc">Use dark theme for reduced eye strain</span>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="theme-toggle" ${settings.darkMode ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <span class="setting-label">Animations</span>
                                    <span class="setting-desc">Enable smooth transitions and effects</span>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="animation-toggle" ${settings.animations ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <span class="setting-label">Font Size</span>
                                    <span class="setting-desc">Adjust text size for readability</span>
                                </div>
                                <select id="font-size-select" class="setting-select">
                                    <option value="small" ${settings.fontSize === 'small' ? 'selected' : ''}>Small</option>
                                    <option value="medium" ${settings.fontSize === 'medium' ? 'selected' : ''}>Medium</option>
                                    <option value="large" ${settings.fontSize === 'large' ? 'selected' : ''}>Large</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Audio & Feedback Section -->
                    <div class="settings-section">
                        <h3>🔊 Audio & Feedback</h3>
                        <div class="settings-list">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <span class="setting-label">Sound Effects</span>
                                    <span class="setting-desc">Play sounds for correct/incorrect answers</span>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="sound-toggle" ${settings.sound ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <span class="setting-label">Show Hints</span>
                                    <span class="setting-desc">Display helpful hints during quizzes</span>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="hints-toggle" ${settings.showHints ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <span class="setting-label">Notifications</span>
                                    <span class="setting-desc">Receive streak reminders and updates</span>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="notifications-toggle" ${settings.notifications ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Data Management Section -->
                    <div class="settings-section">
                        <h3>💾 Data Management</h3>
                        <div class="settings-list">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <span class="setting-label">Auto-Save Progress</span>
                                    <span class="setting-desc">Automatically save your progress</span>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="autosave-toggle" ${settings.autoSave ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
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
                    </div>
                    
                    <!-- Storage Info -->
                    <div class="settings-section">
                        <h3>📊 Storage Info</h3>
                        <div class="storage-info" id="storage-info">
                            <p>Loading storage information...</p>
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
            // Bind toggle events
            const bindings = [
                { id: 'theme-toggle', key: 'darkMode', callback: (v) => SettingsView.applyTheme(v) },
                { id: 'animation-toggle', key: 'animations' },
                { id: 'sound-toggle', key: 'sound', callback: (v) => {
                    if (typeof SoundFX !== 'undefined' && typeof SoundFX.setEnabled === 'function') {
                        SoundFX.setEnabled(v);
                    }
                }},
                { id: 'hints-toggle', key: 'showHints' },
                { id: 'notifications-toggle', key: 'notifications' },
                { id: 'autosave-toggle', key: 'autoSave' }
            ];
            
            bindings.forEach(({ id, key, callback }) => {
                const el = document.getElementById(id);
                if (el) {
                    el.addEventListener('change', (e) => {
                        const value = e.target.checked;
                        SettingsView.updateSetting(key, value);
                        if (callback) callback(value);
                    });
                }
            });
            
            // Font size select
            const fontSelect = document.getElementById('font-size-select');
            if (fontSelect) {
                fontSelect.addEventListener('change', (e) => {
                    SettingsView.updateSetting('fontSize', e.target.value);
                    SettingsView.applyFontSize(e.target.value);
                });
            }
            
            // Update storage info
            SettingsView.updateStorageInfo();
            
            // Apply current theme
            const settings = SettingsView.getSettings();
            SettingsView.applyTheme(settings.darkMode);
            SettingsView.applyFontSize(settings.fontSize);
            
        } catch (error) {
            console.error('SettingsView: Init error:', error);
        }
    },

    /**
     * Apply font size setting
     */
    applyFontSize: (size) => {
        const html = document.documentElement;
        html.classList.remove('font-small', 'font-medium', 'font-large');
        html.classList.add(`font-${size || 'medium'}`);
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
                // Manual calculation
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
            
            container.innerHTML = `
                <div class="storage-stats">
                    <div class="stat">
                        <span class="stat-value">${info.usedKB || (info.used / 1024).toFixed(2)} KB</span>
                        <span class="stat-label">Storage Used</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${info.items}</span>
                        <span class="stat-label">Items Stored</span>
                    </div>
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
        // Nothing to cleanup currently
    }
};

// Initialize theme on load
(function() {
    try {
        const settings = SettingsView.getSettings();
        SettingsView.applyTheme(settings.darkMode);
        SettingsView.applyFontSize(settings.fontSize);
    } catch (e) {
        // Silent fail on initial load
    }
})();
