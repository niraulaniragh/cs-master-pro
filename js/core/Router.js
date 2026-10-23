/**
 * Router.js - Client-side Router for SPA Navigation
 * Handles view switching without page reloads
 */

const Router = (() => {
    // Route configuration - lazy-loaded for undefined views
    const routes = {
        landing: () => typeof LandingView !== 'undefined' ? LandingView : null,
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
    let navigationTimeoutId = null;
    let isInitialized = false;
    const TRANSITION_DURATION = 300;
    const NAVIGATION_TIMEOUT = 5000; // Safety timeout to reset stuck navigation

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
     * Escape HTML to prevent XSS
     */
    const escapeHtml = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    /**
     * Show error state in container
     */
    const showError = (container, message = 'Page not found') => {
        const safeMessage = escapeHtml(message);
        container.innerHTML = `
            <div class="error-state" style="text-align: center; padding: 4rem;">
                <span style="font-size: 4rem;">⚠️</span>
                <h2>Something went wrong</h2>
                <p>${safeMessage}</p>
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
            route = 'home';
        }
        
        // Check login status
        const isLoggedIn = typeof Auth !== 'undefined' && Auth.isLoggedIn && Auth.isLoggedIn();
        
        // Redirect logged-in users away from landing page
        if (route === 'landing' && isLoggedIn) {
            route = 'home';
        }
        
        // Check guest access restrictions
        if (typeof GuestLimiter !== 'undefined') {
            const access = GuestLimiter.canAccessRoute(route);
            if (!access.allowed) {
                GuestLimiter.showSignupPrompt(access.reason, route);
                return;
            }
        }
        
        // Hide/show navigation based on route and login status
        const nav = document.querySelector('.main-nav');
        const footer = document.querySelector('.main-footer');
        
        if (route === 'landing' && !isLoggedIn) {
            // Hide nav and footer for guests on landing page
            if (nav) nav.classList.add('hidden');
            if (footer) footer.classList.add('hidden');
            document.body.classList.add('landing-mode');
        } else {
            // Show nav and footer for all other cases
            if (nav) nav.classList.remove('hidden');
            if (footer) footer.classList.remove('hidden');
            document.body.classList.remove('landing-mode');
        }
        
        // Prevent double navigation
        if (isNavigating) {
            return;
        }
        
        isNavigating = true;
        
        // Safety timeout to reset stuck navigation flag
        if (navigationTimeoutId) {
            clearTimeout(navigationTimeoutId);
        }
        navigationTimeoutId = setTimeout(() => {
            isNavigating = false;
            navigationTimeoutId = null;
        }, NAVIGATION_TIMEOUT);
        
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
                    // Cleanup errors are non-critical
                }
            }

            // Get container
            const container = document.getElementById('main-content');
            if (!container) {
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
                    // History API failure is non-critical
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
                            // View init error - page still rendered
                        }
                    }
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                    
                } catch (error) {
                    showError(container, 'Failed to load the page. Please try again.');
                } finally {
                    isNavigating = false;
                    if (navigationTimeoutId) {
                        clearTimeout(navigationTimeoutId);
                        navigationTimeoutId = null;
                    }
                }
            }, TRANSITION_DURATION);
            
        } catch (error) {
            isNavigating = false;
            if (navigationTimeoutId) {
                clearTimeout(navigationTimeoutId);
                navigationTimeoutId = null;
            }
            
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
        // Prevent double initialization
        if (isInitialized) {
            return;
        }
        
        try {
            // Use event delegation for nav clicks (more performant)
            const navHandler = (e) => {
                const link = e.target.closest('.nav-link');
                if (link) {
                    e.preventDefault();
                    const route = link.dataset && link.dataset.route;
                    if (route) {
                        navigate(route);
                    }
                }
            };
            
            // Attach to document once instead of each link
            document.addEventListener('click', navHandler);

            // Handle browser back/forward
            window.addEventListener('popstate', (e) => {
                const route = (e.state && e.state.route) || 'home';
                const params = (e.state && e.state.params) || {};
                navigate(route, params, false);
            });

            // Check for initial hash route
            const hash = window.location.hash.slice(1);
            
            // Determine initial route based on login status
            const isLoggedIn = typeof Auth !== 'undefined' && Auth.isLoggedIn && Auth.isLoggedIn();
            let initialRoute;
            
            if (isLoggedIn) {
                // Logged in users always go to home (or their requested route, but never landing)
                initialRoute = (hash && routes[hash] && hash !== 'landing') ? hash : 'home';
            } else {
                // Guests go to landing (or landing if trying to access protected routes)
                initialRoute = 'landing';
            }
            
            isInitialized = true;
            navigate(initialRoute, {}, false);
            
        } catch (error) {
            // Try to navigate to home as fallback
            try {
                navigate('home', {}, false);
            } catch (e) {
                // Critical failure
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

    /**
     * Cleanup router state (called on logout)
     */
    const cleanup = () => {
        try {
            // Clear navigation state
            if (navigationTimeoutId) {
                clearTimeout(navigationTimeoutId);
                navigationTimeoutId = null;
            }
            isNavigating = false;
            currentView = null;
            // Don't reset isInitialized - will be set again on next init
        } catch (error) {
            console.error('Error cleaning up router:', error);
        }
    };

    return { 
        navigate, 
        init,
        getCurrentRoute,
        hasRoute,
        cleanup
    };
})();
