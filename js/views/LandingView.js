/**
 * LandingView.js - Public Landing Page
 * Shown to visitors who are not logged in
 */

const LandingView = {
    render: () => {
        const totalQuestions = (typeof QUESTIONS !== 'undefined' && QUESTIONS?.length) || 300;
        const totalTopics = (typeof TOPICS !== 'undefined' && TOPICS?.length) || 10;
        
        return `
            <div class="landing-page">
                <!-- Hero Section -->
                <section class="landing-hero">
                    <div class="landing-hero-content">
                        <div class="landing-badge">🎓 Edexcel IGCSE 4CP0</div>
                        <h1 class="landing-title">Master Computer Science</h1>
                        <p class="landing-subtitle">The ultimate revision platform for IGCSE Computer Science. Interactive quizzes, educational games, flashcards, and study tools to help you ace your exams.</p>
                        <div class="landing-cta">
                            <button class="btn btn-primary btn-large" onclick="AuthModal.show('register')">
                                <i class="fas fa-rocket"></i> Get Started Free
                            </button>
                            <button class="btn btn-secondary btn-large" onclick="AuthModal.show('login')">
                                <i class="fas fa-sign-in-alt"></i> Log In
                            </button>
                        </div>
                        <p class="landing-note">✨ No credit card required • Free forever</p>
                    </div>
                    <div class="landing-hero-visual">
                        <div class="hero-stats-grid">
                            <div class="hero-stat-card">
                                <span class="hero-stat-number">${totalQuestions}+</span>
                                <span class="hero-stat-label">Practice Questions</span>
                            </div>
                            <div class="hero-stat-card">
                                <span class="hero-stat-number">12</span>
                                <span class="hero-stat-label">Learning Games</span>
                            </div>
                            <div class="hero-stat-card">
                                <span class="hero-stat-number">${totalTopics}</span>
                                <span class="hero-stat-label">Topics Covered</span>
                            </div>
                            <div class="hero-stat-card">
                                <span class="hero-stat-number">100%</span>
                                <span class="hero-stat-label">Syllabus Coverage</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="landing-features">
                    <h2 class="section-title">Everything You Need to Succeed</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">📝</div>
                            <h3>Interactive Quizzes</h3>
                            <p>Test your knowledge with hundreds of multiple-choice questions covering every topic in the syllabus.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🎮</div>
                            <h3>Educational Games</h3>
                            <p>Learn while having fun with 12 unique games including Speed Run, Millionaire, Boss Battles, and more.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🧠</div>
                            <h3>Smart Flashcards</h3>
                            <p>Master key concepts with spaced repetition flashcards that adapt to your learning pace.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📚</div>
                            <h3>Study Notes</h3>
                            <p>Comprehensive revision notes for all topics, with code examples and exam tips.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🔧</div>
                            <h3>Learning Tools</h3>
                            <p>Binary converters, ASCII lookup, logic gate simulators, and more interactive tools.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">💻</div>
                            <h3>Code Playground</h3>
                            <p>Write and test Python code directly in your browser. Practice programming concepts hands-on.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📊</div>
                            <h3>Progress Tracking</h3>
                            <p>Track your XP, level up, earn achievements, and see detailed analytics of your performance.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🔥</div>
                            <h3>Daily Streaks</h3>
                            <p>Build study habits with daily challenges and streak tracking to keep you motivated.</p>
                        </div>
                    </div>
                </section>

                <!-- Topics Section -->
                <section class="landing-topics">
                    <h2 class="section-title">Complete Syllabus Coverage</h2>
                    <p class="section-subtitle">Every topic from the Edexcel IGCSE Computer Science specification</p>
                    <div class="topics-grid">
                        ${(typeof TOPICS !== 'undefined' ? TOPICS : []).map(topic => `
                            <div class="topic-card" style="--topic-color: ${topic.color}">
                                <span class="topic-icon">${topic.icon}</span>
                                <span class="topic-name">${topic.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Games Preview -->
                <section class="landing-games">
                    <h2 class="section-title">Learn Through Play</h2>
                    <p class="section-subtitle">12 unique games to make revision fun and effective</p>
                    <div class="games-preview">
                        <div class="game-preview-card">
                            <span class="game-emoji">⚡</span>
                            <span class="game-name">Speed Run</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">💰</span>
                            <span class="game-name">Millionaire</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">👾</span>
                            <span class="game-name">Boss Battle</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">⚔️</span>
                            <span class="game-name">Battle Mode</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">🏎️</span>
                            <span class="game-name">Car Race</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">🔐</span>
                            <span class="game-name">Crypto Hack</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">⌨️</span>
                            <span class="game-name">Type Racer</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">🧩</span>
                            <span class="game-name">Memory Match</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">🏰</span>
                            <span class="game-name">Tower Defense</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">🏭</span>
                            <span class="game-name">Factory</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">💎</span>
                            <span class="game-name">Gold Quest</span>
                        </div>
                        <div class="game-preview-card">
                            <span class="game-emoji">📝</span>
                            <span class="game-name">Fill Code</span>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="landing-cta-section">
                    <div class="cta-content">
                        <h2>Ready to Start Learning?</h2>
                        <p>Join thousands of students preparing for their IGCSE Computer Science exam.</p>
                        <button class="btn btn-primary btn-large" onclick="AuthModal.show('register')">
                            <i class="fas fa-user-plus"></i> Create Free Account
                        </button>
                        <p class="cta-login">Already have an account? <a href="#" onclick="AuthModal.show('login'); return false;">Log in here</a></p>
                    </div>
                </section>
            </div>
        `;
    },
    
    init: () => {
        // Add entrance animations
        setTimeout(() => {
            document.querySelectorAll('.feature-card, .topic-card, .game-preview-card').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.05}s`;
            });
        }, 100);
    },
    
    cleanup: () => {
        // Nothing to clean up
    }
};
