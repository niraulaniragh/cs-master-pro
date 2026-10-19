/**
 * App.js - Main Application Entry Point
 * Initializes all modules and starts the application
 */

const App = (() => {
    const init = () => {
        console.log('🚀 CS Master Pro - Starting...');
        
        // Initialize modules in order
        Storage.init();
        AppState.init();
        AppState.updateNavStats();
        Router.init();
        
        // Apply syntax highlighting to any existing code blocks
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
        
        console.log('✅ Application initialized successfully');
    };

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { init };
})();
