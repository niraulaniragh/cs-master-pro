/**
 * KeyboardShortcuts.js - Keyboard Shortcuts System
 * Power user navigation with keyboard
 */

const KeyboardShortcuts = {
    shortcuts: [],
    enabled: true,
    keydownHandler: null,

    /**
     * Default shortcuts configuration
     */
    defaultShortcuts: [
        { key: 'h', description: 'Go to Home', action: () => KeyboardShortcuts.safeNavigate('home') },
        { key: 'l', description: 'Go to Learn', action: () => KeyboardShortcuts.safeNavigate('learn') },
        { key: 'p', description: 'Go to Practice', action: () => KeyboardShortcuts.safeNavigate('practice') },
        { key: 't', description: 'Go to Tools', action: () => KeyboardShortcuts.safeNavigate('tools') },
        { key: 'c', description: 'Go to Playground (Code)', action: () => KeyboardShortcuts.safeNavigate('playground') },
        { key: 'k', ctrl: true, description: 'Search Notes', action: () => KeyboardShortcuts.safeOpenSearch() },
        { key: 'd', description: 'Start Daily Challenge', action: () => KeyboardShortcuts.safeDailyChallenge() },
        { key: 's', description: 'Open Study Timer', action: () => KeyboardShortcuts.safeOpenTimer() },
        { key: '?', description: 'Show Keyboard Shortcuts', action: () => KeyboardShortcuts.showHelp() },
        { key: 'Escape', description: 'Close Modal/Search', action: () => KeyboardShortcuts.closeOverlays() }
    ],

    /**
     * Initialize keyboard shortcuts
     */
    init: () => {
        try {
            // Load default shortcuts
            KeyboardShortcuts.shortcuts = [...KeyboardShortcuts.defaultShortcuts];

            // Remove existing handler if any
            if (KeyboardShortcuts.keydownHandler) {
                document.removeEventListener('keydown', KeyboardShortcuts.keydownHandler);
            }

            // Create and attach handler
            KeyboardShortcuts.keydownHandler = KeyboardShortcuts.handleKeydown.bind(KeyboardShortcuts);
            document.addEventListener('keydown', KeyboardShortcuts.keydownHandler);

            console.log('⌨️ Keyboard shortcuts initialized');
        } catch (error) {
            console.error('KeyboardShortcuts: Error during initialization', error);
        }
    },

    /**
     * Destroy keyboard shortcuts (cleanup)
     */
    destroy: () => {
        if (KeyboardShortcuts.keydownHandler) {
            document.removeEventListener('keydown', KeyboardShortcuts.keydownHandler);
            KeyboardShortcuts.keydownHandler = null;
        }
        KeyboardShortcuts.shortcuts = [];
    },

    /**
     * Enable/disable shortcuts
     * @param {boolean} enabled - Enable state
     */
    setEnabled: (enabled) => {
        KeyboardShortcuts.enabled = Boolean(enabled);
    },

    /**
     * Add a custom shortcut
     * @param {Object} shortcut - Shortcut configuration
     * @param {string} shortcut.key - Key to press
     * @param {boolean} [shortcut.ctrl] - Requires Ctrl/Cmd
     * @param {string} shortcut.description - Description for help
     * @param {Function} shortcut.action - Action to execute
     * @returns {boolean} True if added successfully
     */
    addShortcut: (shortcut) => {
        try {
            if (!shortcut || typeof shortcut !== 'object') {
                console.warn('KeyboardShortcuts: Invalid shortcut object');
                return false;
            }
            if (!shortcut.key || typeof shortcut.action !== 'function') {
                console.warn('KeyboardShortcuts: Shortcut missing key or action');
                return false;
            }

            // Check for duplicate
            const exists = KeyboardShortcuts.shortcuts.some(s =>
                s.key.toLowerCase() === shortcut.key.toLowerCase() &&
                Boolean(s.ctrl) === Boolean(shortcut.ctrl)
            );

            if (exists) {
                console.warn('KeyboardShortcuts: Shortcut already exists for', shortcut.key);
                return false;
            }

            KeyboardShortcuts.shortcuts.push({
                key: shortcut.key,
                ctrl: Boolean(shortcut.ctrl),
                description: String(shortcut.description || ''),
                action: shortcut.action
            });

            return true;

        } catch (error) {
            console.error('KeyboardShortcuts: Error adding shortcut', error);
            return false;
        }
    },

    /**
     * Remove a shortcut by key
     * @param {string} key - Key of shortcut to remove
     * @param {boolean} [ctrl] - Whether it requires Ctrl/Cmd
     * @returns {boolean} True if removed
     */
    removeShortcut: (key, ctrl = false) => {
        const initialLength = KeyboardShortcuts.shortcuts.length;
        KeyboardShortcuts.shortcuts = KeyboardShortcuts.shortcuts.filter(s =>
            !(s.key.toLowerCase() === key.toLowerCase() && Boolean(s.ctrl) === Boolean(ctrl))
        );
        return KeyboardShortcuts.shortcuts.length < initialLength;
    },

    /**
     * Handle keydown events
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeydown: (e) => {
        if (!KeyboardShortcuts.enabled) return;

        try {
            // Ignore if typing in input/textarea
            const tagName = e.target.tagName;
            const isEditable = e.target.isContentEditable;
            const isInput = tagName === 'INPUT' || tagName === 'TEXTAREA' || isEditable;

            // Allow Escape even in inputs
            if (isInput && e.key !== 'Escape') {
                return;
            }

            // Ignore if modal is open (except for Escape and Ctrl shortcuts)
            const modalOpen = document.querySelector('.modal-overlay.show') ||
                document.querySelector('.auth-modal-overlay') ||
                document.querySelector('.search-overlay');

            if (modalOpen && e.key !== 'Escape' && !(e.ctrlKey || e.metaKey)) {
                return;
            }

            // Find matching shortcut
            for (const shortcut of KeyboardShortcuts.shortcuts) {
                const ctrlRequired = Boolean(shortcut.ctrl);
                const ctrlPressed = e.ctrlKey || e.metaKey;
                const ctrlMatch = ctrlRequired ? ctrlPressed : !ctrlPressed;

                const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase() ||
                    e.key === shortcut.key;

                if (ctrlMatch && keyMatch) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Execute action safely
                    try {
                        shortcut.action();
                    } catch (actionError) {
                        console.error('KeyboardShortcuts: Error executing shortcut action', actionError);
                    }
                    return;
                }
            }

        } catch (error) {
            console.error('KeyboardShortcuts: Error handling keydown', error);
        }
    },

    /**
     * Safe navigation helper
     * @param {string} route - Route to navigate to
     */
    safeNavigate: (route) => {
        try {
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate(route);
            }
        } catch (error) {
            console.warn('KeyboardShortcuts: Navigation failed', error);
        }
    },

    /**
     * Safe search open helper
     */
    safeOpenSearch: () => {
        try {
            if (typeof SearchNotes !== 'undefined' && SearchNotes.open) {
                SearchNotes.open();
            }
        } catch (error) {
            console.warn('KeyboardShortcuts: Search open failed', error);
        }
    },

    /**
     * Safe daily challenge helper
     */
    safeDailyChallenge: () => {
        try {
            if (typeof DailyChallenge !== 'undefined' && DailyChallenge.start) {
                DailyChallenge.start();
            }
        } catch (error) {
            console.warn('KeyboardShortcuts: Daily challenge start failed', error);
        }
    },

    /**
     * Safe timer open helper
     */
    safeOpenTimer: () => {
        try {
            if (typeof StudyTimer !== 'undefined' && StudyTimer.showFullTimer) {
                StudyTimer.showFullTimer();
            }
        } catch (error) {
            console.warn('KeyboardShortcuts: Timer open failed', error);
        }
    },

    /**
     * Close all overlays (modals, search, etc.)
     */
    closeOverlays: () => {
        try {
            // Close Modal
            if (typeof Modal !== 'undefined' && Modal.close) {
                Modal.close();
            }

            // Close SearchNotes
            if (typeof SearchNotes !== 'undefined' && SearchNotes.close && SearchNotes.isOpen) {
                SearchNotes.close();
            }

            // Close AuthModal
            if (typeof AuthModal !== 'undefined' && AuthModal.hide && AuthModal.isOpen) {
                AuthModal.hide();
            }

        } catch (error) {
            console.warn('KeyboardShortcuts: Error closing overlays', error);
        }
    },

    /**
     * Escape HTML for safe display
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml: (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Show help modal with all shortcuts
     */
    showHelp: () => {
        try {
            // Group shortcuts by category
            const navigation = KeyboardShortcuts.shortcuts.filter(s =>
                ['h', 'l', 'p', 't', 'c'].includes(s.key.toLowerCase())
            );
            const features = KeyboardShortcuts.shortcuts.filter(s =>
                ['k', 'd', 's'].includes(s.key.toLowerCase())
            );
            const general = KeyboardShortcuts.shortcuts.filter(s =>
                ['?', 'escape'].includes(s.key.toLowerCase())
            );

            const renderShortcut = (s) => `
                <div class="shortcut-item">
                    ${s.ctrl ? '<kbd>Ctrl</kbd> + ' : ''}<kbd>${KeyboardShortcuts.escapeHtml(s.key.toUpperCase())}</kbd>
                    <span>${KeyboardShortcuts.escapeHtml(s.description)}</span>
                </div>
            `;

            const content = `
                <div class="keyboard-help">
                    <p class="help-intro">Use these keyboard shortcuts to navigate quickly</p>
                    
                    ${navigation.length > 0 ? `
                        <div class="shortcut-group">
                            <h4>Navigation</h4>
                            <div class="shortcut-list">
                                ${navigation.map(renderShortcut).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${features.length > 0 ? `
                        <div class="shortcut-group">
                            <h4>Features</h4>
                            <div class="shortcut-list">
                                ${features.map(renderShortcut).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${general.length > 0 ? `
                        <div class="shortcut-group">
                            <h4>General</h4>
                            <div class="shortcut-list">
                                ${general.map(renderShortcut).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;

            if (typeof Modal !== 'undefined' && Modal.show) {
                Modal.show({
                    title: '⌨️ Keyboard Shortcuts',
                    content
                });
            }

        } catch (error) {
            console.error('KeyboardShortcuts: Error showing help', error);
        }
    },

    /**
     * Render keyboard shortcut indicator button
     * @returns {string} HTML string
     */
    renderIndicator: () => {
        return `
            <button class="keyboard-shortcut-btn" onclick="KeyboardShortcuts.showHelp()" 
                    title="Keyboard Shortcuts (?)" aria-label="Show keyboard shortcuts">
                <i class="fas fa-keyboard" aria-hidden="true"></i>
            </button>
        `;
    },

    /**
     * Get all shortcuts (for external inspection)
     * @returns {Array} Array of shortcut objects
     */
    getShortcuts: () => {
        return [...KeyboardShortcuts.shortcuts];
    }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => KeyboardShortcuts.init());
} else {
    KeyboardShortcuts.init();
}
