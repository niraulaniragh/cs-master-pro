/**
 * LandingView.js - Landing Page for Guests
 * Matches the main app UI style
 */

const LandingView = {
    render: () => {
        const totalQuestions = (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS) && QUESTIONS.length) || 200;
        const totalTopics = (typeof TOPICS !== 'undefined' && Array.isArray(TOPICS) && TOPICS.length) || 11;
        
        return `
            <div class="home-view-new landing-guest">
                <!-- Hero Section -->
                <section class="hero-new hero-landing">
                    <div class="hero-left">
                        <span class="hero-greeting">Welcome to</span>
                        <h1 class="hero-name hero-brand">CS Master Pro</h1>
                        <p class="hero-tagline">Your complete IGCSE Computer Science revision platform</p>
                        <div class="hero-tags">
                            <span class="hero-tag">Edexcel 4CP0</span>
                            <span class="hero-tag accent">${totalQuestions}+ Questions</span>
                            <span class="hero-tag">${totalTopics} Topics</span>
                        </div>
                        <div class="hero-cta-buttons">
                            <button class="btn-primary btn-lg" onclick="AuthModal.show('signup')">
                                <i class="fas fa-rocket"></i> Get Started Free
                            </button>
                            <button class="btn-secondary btn-lg" onclick="AuthModal.show('login')">
                                <i class="fas fa-sign-in-alt"></i> Sign In
                            </button>
                        </div>
                    </div>
                    <div class="hero-right hero-stats-preview">
                        <div class="preview-card">
                            <div class="preview-stat">
                                <span class="preview-number">${totalTopics}</span>
                                <span class="preview-label">Topics</span>
                            </div>
                            <div class="preview-stat">
                                <span class="preview-number">${totalQuestions}+</span>
                                <span class="preview-label">Questions</span>
                            </div>
                            <div class="preview-stat">
                                <span class="preview-number">12</span>
                                <span class="preview-label">Games</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="quick-actions-section">
                    <div class="card-new">
                        <div class="card-header">
                            <h2>🚀 Everything You Need to Succeed</h2>
                        </div>
                        <div class="quick-grid-6">
                            <div class="quick-btn-new feature-item">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #3b82f6, #60a5fa);">📚</div>
                                <div class="quick-info">
                                    <span class="quick-title">Learn</span>
                                    <span class="quick-desc">Comprehensive notes for all topics</span>
                                </div>
                            </div>
                            <div class="quick-btn-new feature-item">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #10b981, #34d399);">🎯</div>
                                <div class="quick-info">
                                    <span class="quick-title">Practice</span>
                                    <span class="quick-desc">Quiz yourself with instant feedback</span>
                                </div>
                            </div>
                            <div class="quick-btn-new feature-item">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #8b5cf6, #a78bfa);">🎮</div>
                                <div class="quick-info">
                                    <span class="quick-title">Games</span>
                                    <span class="quick-desc">12 games to make learning fun</span>
                                </div>
                            </div>
                            <div class="quick-btn-new feature-item">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">💻</div>
                                <div class="quick-info">
                                    <span class="quick-title">Code Playground</span>
                                    <span class="quick-desc">Write and run Python code</span>
                                </div>
                            </div>
                            <div class="quick-btn-new feature-item">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #f97316, #fb923c);">🔧</div>
                                <div class="quick-info">
                                    <span class="quick-title">Tools</span>
                                    <span class="quick-desc">Binary, hex converters & more</span>
                                </div>
                            </div>
                            <div class="quick-btn-new feature-item">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #ec4899, #f472b6);">📝</div>
                                <div class="quick-info">
                                    <span class="quick-title">Past Papers</span>
                                    <span class="quick-desc">Real exam questions with solutions</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Topics Preview -->
                <section class="main-grid">
                    <div class="main-left">
                        <div class="card-new">
                            <div class="card-header">
                                <h2>📖 Topics Covered</h2>
                            </div>
                            <div class="topics-list-landing">
                                ${LandingView.renderTopics()}
                            </div>
                        </div>
                    </div>
                    
                    <div class="main-right">
                        <!-- Games Preview -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>🎮 Fun Learning Games</h2>
                            </div>
                            <div class="games-preview-list">
                                <div class="game-preview-item">
                                    <span class="game-icon">⚡</span>
                                    <span class="game-name">Speed Run</span>
                                </div>
                                <div class="game-preview-item">
                                    <span class="game-icon">⚔️</span>
                                    <span class="game-name">Battle Mode</span>
                                </div>
                                <div class="game-preview-item">
                                    <span class="game-icon">💰</span>
                                    <span class="game-name">Millionaire</span>
                                </div>
                                <div class="game-preview-item">
                                    <span class="game-icon">🐉</span>
                                    <span class="game-name">Boss Battles</span>
                                </div>
                                <div class="game-preview-item">
                                    <span class="game-icon">🃏</span>
                                    <span class="game-name">Memory Match</span>
                                </div>
                                <div class="game-preview-item">
                                    <span class="game-icon">⌨️</span>
                                    <span class="game-name">Type Racer</span>
                                </div>
                            </div>
                            <p class="games-more">+ 6 more games!</p>
                        </div>
                        
                        <!-- Why Choose Us -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>✨ Why CS Master Pro?</h2>
                            </div>
                            <div class="why-list">
                                <div class="why-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Aligned with Edexcel 4CP0 syllabus</span>
                                </div>
                                <div class="why-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Track your progress with XP & levels</span>
                                </div>
                                <div class="why-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Instant feedback on every question</span>
                                </div>
                                <div class="why-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Learn by playing fun games</span>
                                </div>
                                <div class="why-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>100% free to use</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Final CTA -->
                <section class="cta-section">
                    <div class="card-new cta-card">
                        <h2>Ready to Master Computer Science?</h2>
                        <p>Join thousands of students preparing for their IGCSE exams</p>
                        <div class="cta-buttons">
                            <button class="btn-primary btn-lg" onclick="AuthModal.show('signup')">
                                <i class="fas fa-user-plus"></i> Create Free Account
                            </button>
                            <button class="btn-ghost btn-lg" onclick="LandingView.tryAsGuest()">
                                <i class="fas fa-play"></i> Try as Guest
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },
    
    renderTopics: () => {
        const topics = typeof TOPICS !== 'undefined' ? TOPICS : [
            { id: 'problem-solving', name: 'Problem Solving', icon: '🧩' },
            { id: 'programming', name: 'Programming', icon: '💻' },
            { id: 'data', name: 'Data Representation', icon: '🔢' },
            { id: 'computers', name: 'Computer Systems', icon: '🖥️' },
            { id: 'networks', name: 'Networks', icon: '🌐' },
            { id: 'issues', name: 'Impacts of Technology', icon: '⚖️' }
        ];
        
        return topics.map(topic => `
            <div class="topic-preview-item">
                <span class="topic-icon">${topic.icon}</span>
                <span class="topic-name">${topic.name}</span>
            </div>
        `).join('');
    },
    
    tryAsGuest: () => {
        // Set guest mode and navigate to home
        if (typeof GuestLimiter !== 'undefined') {
            GuestLimiter.resetUsage();
        }
        sessionStorage.setItem('guest_mode', 'true');
        Router.navigate('home');
    },
    
    init: () => {
        // Nothing special needed
    },
    
    cleanup: () => {
        // Nothing to clean up
    }
};
