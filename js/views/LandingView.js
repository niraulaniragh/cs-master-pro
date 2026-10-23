/**
 * LandingView.js - Landing Page
 * Simple, clean, bug-free
 */

const LandingView = {
    render: () => {
        return `
            <div class="landing-page">
                <!-- Hero -->
                <div class="landing-hero">
                    <div class="landing-eyebrow">🎓 The #1 IGCSE CS Revision Platform</div>
                    <h1 class="landing-title">CS Master Pro</h1>
                    <p class="landing-subtitle">Master Computer Science the smart way. Interactive quizzes, engaging games, and comprehensive notes designed for Edexcel IGCSE success.</p>
                    <div class="landing-stats-row">
                        <div class="landing-stat">
                            <span class="stat-num">11</span>
                            <span class="stat-label">Topics</span>
                        </div>
                        <div class="landing-stat">
                            <span class="stat-num">200+</span>
                            <span class="stat-label">Questions</span>
                        </div>
                        <div class="landing-stat">
                            <span class="stat-num">12</span>
                            <span class="stat-label">Games</span>
                        </div>
                        <div class="landing-stat">
                            <span class="stat-num">100%</span>
                            <span class="stat-label">Free</span>
                        </div>
                    </div>
                    <div class="landing-buttons">
                        <button class="landing-btn primary" onclick="if(typeof AuthModal!=='undefined')AuthModal.show('signup')">
                            🚀 Get Started Free
                        </button>
                        <button class="landing-btn secondary" onclick="if(typeof AuthModal!=='undefined')AuthModal.show('login')">
                            Sign In
                        </button>
                    </div>
                </div>

                <!-- Trust Banner -->
                <div class="landing-trust">
                    <span>✓ Aligned with Edexcel 4CP0</span>
                    <span>✓ Instant Feedback</span>
                    <span>✓ Track Your Progress</span>
                    <span>✓ No Credit Card Required</span>
                </div>

                <!-- Features -->
                <div class="landing-section">
                    <h2 class="section-title">Everything You Need to Ace Your Exam</h2>
                    <p class="section-subtitle">From comprehensive notes to interactive games, we've got you covered</p>
                    <div class="landing-features">
                        <div class="landing-feature">
                            <span class="feature-icon">📚</span>
                            <h3>Study Notes</h3>
                            <p>Clear, detailed revision notes covering every topic in the syllabus</p>
                        </div>
                        <div class="landing-feature">
                            <span class="feature-icon">🎯</span>
                            <h3>Practice Quizzes</h3>
                            <p>Test yourself with 200+ questions and get instant explanations</p>
                        </div>
                        <div class="landing-feature">
                            <span class="feature-icon">🎮</span>
                            <h3>Learning Games</h3>
                            <p>Speed Run, Battle Mode, Millionaire, Boss Battles and 8 more!</p>
                        </div>
                        <div class="landing-feature">
                            <span class="feature-icon">💻</span>
                            <h3>Code Playground</h3>
                            <p>Write and run Python code directly in your browser</p>
                        </div>
                        <div class="landing-feature">
                            <span class="feature-icon">🔧</span>
                            <h3>Helpful Tools</h3>
                            <p>Binary converter, logic gates, ASCII table, and more</p>
                        </div>
                        <div class="landing-feature">
                            <span class="feature-icon">📝</span>
                            <h3>Past Papers</h3>
                            <p>Practice with real exam questions and mark schemes</p>
                        </div>
                    </div>
                </div>

                <!-- Why Section -->
                <div class="landing-section landing-why">
                    <h2 class="section-title">Why Students Love CS Master Pro</h2>
                    <div class="why-grid">
                        <div class="why-card">
                            <div class="why-icon">⚡</div>
                            <h3>Learn Faster</h3>
                            <p>Gamified learning keeps you engaged and helps concepts stick</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">📊</div>
                            <h3>Track Progress</h3>
                            <p>XP system, levels, and streaks keep you motivated</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🎯</div>
                            <h3>Exam Ready</h3>
                            <p>Content aligned with Edexcel 4CP0 specification</p>
                        </div>
                    </div>
                </div>

                <!-- Topics Preview -->
                <div class="landing-section">
                    <h2 class="section-title">Complete Syllabus Coverage</h2>
                    <p class="section-subtitle">All the topics you need for your IGCSE exam</p>
                    <div class="topics-preview">
                        <div class="topic-tag">🧩 Problem Solving</div>
                        <div class="topic-tag">💻 Programming</div>
                        <div class="topic-tag">🔢 Data Representation</div>
                        <div class="topic-tag">🖥️ Computer Systems</div>
                        <div class="topic-tag">🌐 Networks</div>
                        <div class="topic-tag">🔒 Security</div>
                        <div class="topic-tag">🗄️ Databases</div>
                        <div class="topic-tag">⚖️ Impacts of Technology</div>
                    </div>
                </div>

                <!-- CTA -->
                <div class="landing-cta">
                    <h2>Ready to Master Computer Science?</h2>
                    <p>Join thousands of students who are already improving their grades</p>
                    <button class="landing-btn primary large" onclick="if(typeof AuthModal!=='undefined')AuthModal.show('signup')">
                        Start Learning Now — It's Free
                    </button>
                    <button class="landing-btn ghost" onclick="LandingView.enterAsGuest()">
                        or try as guest first
                    </button>
                </div>

                <!-- Footer -->
                <div class="landing-footer">
                    <p>Made with ❤️ for IGCSE Computer Science students</p>
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
