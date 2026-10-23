/**
 * LandingView.js - Simple Landing Page
 */

const LandingView = {
    render: () => {
        return `
            <div class="landing-page">
                <!-- Hero -->
                <div class="landing-hero">
                    <h1 class="landing-title">CS Master Pro</h1>
                    <p class="landing-subtitle">Master IGCSE Computer Science with interactive quizzes, games, and comprehensive notes</p>
                    <p class="landing-badge">Edexcel 4CP0 • 200+ Questions • 12 Games</p>
                    <div class="landing-buttons">
                        <button class="landing-btn primary" onclick="if(typeof AuthModal!=='undefined')AuthModal.show('signup')">
                            Get Started Free
                        </button>
                        <button class="landing-btn secondary" onclick="if(typeof AuthModal!=='undefined')AuthModal.show('login')">
                            Sign In
                        </button>
                    </div>
                </div>

                <!-- Features -->
                <div class="landing-features">
                    <div class="landing-feature">
                        <span class="feature-icon">📚</span>
                        <h3>Learn</h3>
                        <p>Comprehensive revision notes for all topics</p>
                    </div>
                    <div class="landing-feature">
                        <span class="feature-icon">🎯</span>
                        <h3>Practice</h3>
                        <p>200+ questions with instant feedback</p>
                    </div>
                    <div class="landing-feature">
                        <span class="feature-icon">🎮</span>
                        <h3>Games</h3>
                        <p>12 fun games to make learning enjoyable</p>
                    </div>
                    <div class="landing-feature">
                        <span class="feature-icon">💻</span>
                        <h3>Code</h3>
                        <p>Python playground to practice coding</p>
                    </div>
                    <div class="landing-feature">
                        <span class="feature-icon">🔧</span>
                        <h3>Tools</h3>
                        <p>Binary, hex converters and more</p>
                    </div>
                    <div class="landing-feature">
                        <span class="feature-icon">📝</span>
                        <h3>Past Papers</h3>
                        <p>Real exam questions with solutions</p>
                    </div>
                </div>

                <!-- CTA -->
                <div class="landing-cta">
                    <h2>Ready to start learning?</h2>
                    <button class="landing-btn primary large" onclick="if(typeof AuthModal!=='undefined')AuthModal.show('signup')">
                        Create Free Account
                    </button>
                    <button class="landing-btn ghost" onclick="LandingView.enterAsGuest()">
                        or continue as guest
                    </button>
                </div>
            </div>
        `;
    },

    enterAsGuest: () => {
        if (typeof GuestLimiter !== 'undefined') {
            GuestLimiter.resetUsage();
        }
        sessionStorage.setItem('guest_mode', 'true');
        if (typeof Router !== 'undefined') {
            Router.navigate('home');
        }
    },

    init: () => {},
    cleanup: () => {}
};
