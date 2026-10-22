/**
 * Router.js - Client-side Router for SPA Navigation
 * Handles view switching without page reloads
 */

const Router = (() => {
    // Route configuration - lazy-loaded for undefined views
    const routes = {
        home: () => typeof HomeView !== 'undefined' ? HomeView : null,
        learn: () => typeof LearnView !== 'undefined' ? LearnView : null,
        practice: () => typeof PracticeView !== 'undefined' ? PracticeView : null,
        tools: () => typeof ToolsView !== 'undefined' ? ToolsView : null,
        playground: () => typeof PlaygroundView !== 'undefined' ? PlaygroundView : null,
        games: () => typeof GamesView !== 'undefined' ? GamesView : null,
        teacher: () => typeof TeacherView !== 'undefined' ? TeacherView : null,
        analytics: () => typeof AnalyticsView !== 'undefined' ? AnalyticsView : null,
        pastpapers: () => typeof PastPaperView !== 'undefined' ? PastPaperView : null
    };

    let currentView = null;
    let isNavigating = false;
    const TRANSITION_DURATION = 300;

    /**
     * Get view safely
     */
    const getView = (route) => {
        const viewGetter = routes[route];
        if (typeof viewGetter !== 'function') return null;
        
        const view = viewGetter();
        if (!view || typeof view.render !== 'function') return null;
        
        return view;
    };

    /**
     * Show error state in container
     */
    const showError = (container, message = 'Page not found') => {
        container.innerHTML = `
            <div class="error-state" style="text-align: center; padding: 4rem;">
                <span style="font-size: 4rem;">⚠️</span>
                <h2>Something went wrong</h2>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="Router.navigate('home')">Go Home</button>
            </div>
        `;
    };

    /**
     * Navigate to a route
     * @param {string} route - Route name
     * @param {object} params - Optional parameters
     * @param {boolean} pushState - Whether to push to browser history
     */
    const navigate = (route, params = {}, pushState = true) => {
        // Validate route
        if (!route || typeof route !== 'string') {
            console.error('Invalid route');
            route = 'home';
        }
        
        // Prevent double navigation
        if (isNavigating) {
            console.warn('Navigation in progress, ignoring request');
            return;
        }
        
        console.log(`📍 Navigating to: ${route}`);
        isNavigating = true;
        
        try {
            // Update state
            if (typeof AppState !== 'undefined' && typeof AppState.setState === 'function') {
                AppState.setState('ui.currentRoute', route);
            }
            
            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                const isActive = link.dataset && link.dataset.route === route;
                link.classList.toggle('active', isActive);
            });

            // Get the view
            const View = getView(route);
            if (!View) {
                console.error(`Route not found or invalid: ${route}`);
                if (route !== 'home') {
                    isNavigating = false;
                    navigate('home', {}, false);
                    return;
                }
                // If even home fails, show error
                const container = document.getElementById('main-content');
                if (container) {
                    showError(container, 'Unable to load the requested page.');
                }
                isNavigating = false;
                return;
            }

            // Cleanup previous view safely
            if (currentView && typeof currentView.cleanup === 'function') {
                try {
                    currentView.cleanup();
                } catch (e) {
                    console.warn('View cleanup error:', e);
                }
            }

            // Get container
            const container = document.getElementById('main-content');
            if (!container) {
                console.error('Main content container not found');
                isNavigating = false;
                return;
            }
            
            // Show loading state
            container.innerHTML = '<div class="loading-spinner"></div>';
            
            // Update browser history (for back/forward navigation)
            if (pushState) {
                try {
                    history.pushState({ route, params }, '', `#${route}`);
                } catch (e) {
                    console.warn('Failed to push state:', e);
                }
            }
            
            // Add page exit class for smooth transition
            container.classList.add('page-exit');
            
            // Render after transition
            setTimeout(() => {
                try {
                    container.classList.remove('page-exit');
                    currentView = View;
                    
                    // Render the view
                    const content = View.render(params || {});
                    container.innerHTML = typeof content === 'string' ? content : '';
                    
                    // Initialize view
                    if (typeof View.init === 'function') {
                        try {
                            View.init(params || {});
                        } catch (initError) {
                            console.error('View init error:', initError);
                        }
                    }
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                    
                } catch (error) {
                    console.error(`Error rendering view: ${route}`, error);
                    showError(container, 'Failed to load the page. Please try again.');
                } finally {
                    isNavigating = false;
                }
            }, TRANSITION_DURATION);
            
        } catch (error) {
            console.error('Navigation error:', error);
            isNavigating = false;
            
            const container = document.getElementById('main-content');
            if (container) {
                showError(container);
            }
        }
    };

    /**
     * Initialize router
     */
    const init = () => {
        try {
            // Handle nav clicks
            document.querySelectorAll('.nav-link').forEach(link => {
                // Remove existing listeners by cloning
                const newLink = link.cloneNode(true);
                if (link.parentNode) {
                    link.parentNode.replaceChild(newLink, link);
                }
                
                newLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const route = newLink.dataset && newLink.dataset.route;
                    if (route) {
                        navigate(route);
                    }
                });
            });

            // Handle browser back/forward
            window.addEventListener('popstate', (e) => {
                const route = (e.state && e.state.route) || 'home';
                const params = (e.state && e.state.params) || {};
                navigate(route, params, false);
            });

            // Check for initial hash route
            const hash = window.location.hash.slice(1);
            const initialRoute = hash && routes[hash] ? hash : 'home';
            navigate(initialRoute, {}, false);
            
            console.log('🚦 Router initialized');
        } catch (error) {
            console.error('Router initialization error:', error);
            // Try to navigate to home as fallback
            try {
                navigate('home', {}, false);
            } catch (e) {
                console.error('Failed to navigate to home:', e);
            }
        }
    };

    /**
     * Get current route
     */
    const getCurrentRoute = () => {
        if (typeof AppState !== 'undefined' && typeof AppState.getState === 'function') {
            return AppState.getState('ui.currentRoute') || 'home';
        }
        const hash = window.location.hash.slice(1);
        return hash && routes[hash] ? hash : 'home';
    };

    /**
     * Check if a route exists
     */
    const hasRoute = (route) => {
        return route && typeof routes[route] === 'function';
    };

    return { 
        navigate, 
        init,
        getCurrentRoute,
        hasRoute
    };
})();
