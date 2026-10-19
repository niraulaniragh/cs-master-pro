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
        playground: PlaygroundView
    };

    let currentView = null;

    // Navigate to a route
    const navigate = (route, params = {}) => {
        console.log(`📍 Navigating to: ${route}`);
        
        // Update state
        AppState.setState('ui.currentRoute', route);
        
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.route === route);
        });

        // Get the view
        const View = routes[route];
        if (!View) {
            console.error(`Route not found: ${route}`);
            return;
        }

        // Cleanup previous view
        if (currentView && currentView.cleanup) {
            currentView.cleanup();
        }

        // Render new view
        const container = document.getElementById('main-content');
        container.innerHTML = '<div class="loading-spinner"></div>';
        
        // Small delay for smooth transition
        setTimeout(() => {
            currentView = View;
            container.innerHTML = View.render(params);
            
            // Initialize view
            if (View.init) {
                View.init(params);
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
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
            navigate(route);
        });

        // Initial route
        navigate('home');
    };

    return { navigate, init };
})();
