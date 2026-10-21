/**
 * Router.js - Client-side Router for SPA Navigation
 * Handles view switching without page reloads
 */

const Router = (() => {
    const routes = {
        home: HomeView,
        learn: LearnView,
        practice: PracticeView,
        tools: ToolsView,
        playground: PlaygroundView,
        games: GamesView,
        teacher: TeacherView
    };

    let currentView = null;

    // Navigate to a route
    const navigate = (route, params = {}, pushState = true) => {
        console.log(`📍 Navigating to: ${route}`);
        
        // Update state
        if (typeof AppState !== 'undefined') {
            AppState.setState('ui.currentRoute', route);
        }
        
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.route === route);
        });

        // Get the view
        const View = routes[route];
        if (!View || typeof View.render !== 'function') {
            console.error(`Route not found or invalid: ${route}`);
            if (route !== 'home') {
                navigate('home', {}, false); // Fallback to home
            }
            return;
        }

        // Cleanup previous view
        if (currentView && typeof currentView.cleanup === 'function') {
            currentView.cleanup();
        }

        // Render new view
        const container = document.getElementById('main-content');
        if (!container) {
            console.error('Main content container not found');
            return;
        }
        
        container.innerHTML = '<div class="loading-spinner"></div>';
        
        // Update browser history (for back/forward navigation)
        if (pushState) {
            history.pushState({ route, params }, '', `#${route}`);
        }
        
        // Small delay for smooth transition
        setTimeout(() => {
            try {
                currentView = View;
                container.innerHTML = View.render(params);
                
                // Initialize view
                if (typeof View.init === 'function') {
                    View.init(params);
                }
                
                // Scroll to top
                window.scrollTo(0, 0);
            } catch (error) {
                console.error(`Error rendering view: ${route}`, error);
                container.innerHTML = `
                    <div class="error-state">
                        <span class="error-icon">⚠️</span>
                        <h2>Something went wrong</h2>
                        <p>Failed to load the page. Please try again.</p>
                        <button class="btn btn-primary" onclick="Router.navigate('home')">Go Home</button>
                    </div>
                `;
            }
        }, 50);
    };

    // Initialize router
    const init = () => {
        // Handle nav clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.dataset.route;
                if (route) navigate(route);
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const route = e.state?.route || 'home';
            navigate(route, e.state?.params || {}, false);
        });

        // Check for initial hash route
        const initialRoute = window.location.hash.slice(1) || 'home';
        navigate(routes[initialRoute] ? initialRoute : 'home', {}, false);
    };

    return { navigate, init };
})();
