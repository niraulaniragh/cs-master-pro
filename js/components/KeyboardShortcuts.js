/**
 * KeyboardShortcuts.js - Keyboard Shortcuts System
 * Power user navigation with keyboard
 */

const KeyboardShortcuts = {
    shortcuts: [
        { key: 'h', description: 'Go to Home', action: () => Router.navigate('home') },
        { key: 'l', description: 'Go to Learn', action: () => Router.navigate('learn') },
        { key: 'p', description: 'Go to Practice', action: () => Router.navigate('practice') },
        { key: 't', description: 'Go to Tools', action: () => Router.navigate('tools') },
        { key: 'c', description: 'Go to Playground (Code)', action: () => Router.navigate('playground') },
        { key: 'k', ctrl: true, description: 'Search Notes', action: () => SearchNotes.open() },
        { key: 'd', description: 'Start Daily Challenge', action: () => DailyChallenge.start() },
        { key: 's', description: 'Open Study Timer', action: () => StudyTimer.showFullTimer() },
        { key: '?', description: 'Show Keyboard Shortcuts', action: () => KeyboardShortcuts.showHelp() },
        { key: 'Escape', description: 'Close Modal/Search', action: () => {
            Modal.hide();
            SearchNotes.close();
        }}
    ],

    /**
     * Initialize keyboard shortcuts
     */
    init: () => {
        document.addEventListener('keydown', KeyboardShortcuts.handleKeydown);
    },

    /**
     * Handle keydown events
     */
    handleKeydown: (e) => {
        // Ignore if typing in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Ignore if modal is open (except Escape)
        if (document.querySelector('.modal-overlay.show') && e.key !== 'Escape') {
            return;
        }

        for (const shortcut of KeyboardShortcuts.shortcuts) {
            const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : !(e.ctrlKey || e.metaKey);
            const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase() || e.key === shortcut.key;
            
            if (ctrlMatch && keyMatch) {
                e.preventDefault();
                shortcut.action();
                return;
            }
        }
    },

    /**
     * Show help modal
     */
    showHelp: () => {
        const content = `
            <div class="keyboard-help">
                <p class="help-intro">Use these keyboard shortcuts to navigate quickly</p>
                
                <div class="shortcut-group">
                    <h4>Navigation</h4>
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>H</kbd>
                            <span>Go to Home</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>L</kbd>
                            <span>Go to Learn</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>P</kbd>
                            <span>Go to Practice</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>T</kbd>
                            <span>Go to Tools</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>C</kbd>
                            <span>Go to Code Playground</span>
                        </div>
                    </div>
                </div>
                
                <div class="shortcut-group">
                    <h4>Features</h4>
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>K</kbd>
                            <span>Search Notes</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>D</kbd>
                            <span>Start Daily Challenge</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>S</kbd>
                            <span>Open Study Timer</span>
                        </div>
                    </div>
                </div>
                
                <div class="shortcut-group">
                    <h4>General</h4>
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>?</kbd>
                            <span>Show this help</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Esc</kbd>
                            <span>Close modal/search</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        Modal.show('⌨️ Keyboard Shortcuts', content);
    },

    /**
     * Render keyboard shortcut indicator
     */
    renderIndicator: () => {
        return `
            <button class="keyboard-shortcut-btn" onclick="KeyboardShortcuts.showHelp()" title="Keyboard Shortcuts (?)">
                <i class="fas fa-keyboard"></i>
            </button>
        `;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    KeyboardShortcuts.init();
});
