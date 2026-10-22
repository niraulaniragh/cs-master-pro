/**
 * LandingView.js - Stunning Public Landing Page
 * Clean, animated, conversion-focused design
 */

const LandingView = {
    render: () => {
        return `
            <div class="landing-page">
                <!-- Animated Background -->
                <div class="landing-bg">
                    <div class="landing-gradient"></div>
                    <div class="landing-grid"></div>
                    <div class="floating-shapes">
                        <div class="shape shape-1">📚</div>
                        <div class="shape shape-2">💻</div>
                        <div class="shape shape-3">🎮</div>
                        <div class="shape shape-4">⚡</div>
                        <div class="shape shape-5">🏆</div>
                    </div>
                </div>
                
                <!-- Mini Header (Logo + Login only) -->
                <header class="landing-header">
                    <div class="landing-logo">
                        <svg viewBox="0 0 44 44" width="40" height="40">
                            <defs>
                                <linearGradient id="landingLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#10b981"/>
                                    <stop offset="50%" stop-color="#06b6d4"/>
                                    <stop offset="100%" stop-color="#3b82f6"/>
                                </linearGradient>
                            </defs>
                            <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="#0d1117" stroke="url(#landingLogoGrad)" stroke-width="2"/>
                            <rect x="17" y="18" width="10" height="8" rx="1" fill="none" stroke="url(#landingLogoGrad)" stroke-width="1.5"/>
                            <text x="22" y="24.5" text-anchor="middle" font-family="monospace" font-size="6" font-weight="bold" fill="url(#landingLogoGrad)">_</text>
                        </svg>
                        <span>CS Master Pro</span>
                    </div>
                    <button class="landing-login-btn" onclick="AuthModal.show('login')">
                        Log In
                    </button>
                </header>
                
                <!-- Hero Section -->
                <section class="landing-hero">
                    <div class="hero-content">
                        <div class="hero-badge animate-fade-in">
                            <span class="badge-icon">🎓</span>
                            <span>Edexcel IGCSE 4CP0</span>
                        </div>
                        
                        <h1 class="hero-title animate-fade-in-up">
                            Master Computer Science
                            <span class="gradient-text">the fun way</span>
                        </h1>
                        
                        <p class="hero-subtitle animate-fade-in-up delay-1">
                            Interactive quizzes, educational games, and smart revision tools 
                            designed to help you ace your IGCSE Computer Science exam.
                        </p>
                        
                        <div class="hero-cta animate-fade-in-up delay-2">
                            <button class="cta-primary" onclick="AuthModal.show('register')">
                                <span>Start Learning Free</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                            <p class="cta-note">No credit card required • Free forever</p>
                        </div>
                        
                        <!-- Stats -->
                        <div class="hero-stats animate-fade-in-up delay-3">
                            <div class="stat-item">
                                <span class="stat-number" data-target="335">0</span>
                                <span class="stat-label">Questions</span>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">
                                <span class="stat-number" data-target="12">0</span>
                                <span class="stat-label">Games</span>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">
                                <span class="stat-number" data-target="10">0</span>
                                <span class="stat-label">Topics</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Hero Visual - App Preview -->
                    <div class="hero-visual animate-fade-in delay-2">
                        <div class="app-preview">
                            <div class="preview-header">
                                <div class="preview-dots">
                                    <span></span><span></span><span></span>
                                </div>
                                <span class="preview-title">CS Master Pro</span>
                            </div>
                            <div class="preview-content">
                                <div class="preview-card">
                                    <div class="preview-level">Level 8</div>
                                    <div class="preview-xp">
                                        <div class="xp-bar"><div class="xp-fill" style="width: 75%"></div></div>
                                        <span>4,850 / 6,400 XP</span>
                                    </div>
                                </div>
                                <div class="preview-achievements">
                                    <span class="achievement">🔥 7-day streak</span>
                                    <span class="achievement">⭐ Quiz Master</span>
                                    <span class="achievement">🎮 Game Champion</span>
                                </div>
                                <div class="preview-topics">
                                    <div class="topic-progress">
                                        <span>Data Representation</span>
                                        <div class="topic-bar"><div style="width: 85%"></div></div>
                                    </div>
                                    <div class="topic-progress">
                                        <span>Programming</span>
                                        <div class="topic-bar"><div style="width: 70%"></div></div>
                                    </div>
                                    <div class="topic-progress">
                                        <span>Networks</span>
                                        <div class="topic-bar"><div style="width: 60%"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Features Section -->
                <section class="landing-features">
                    <div class="section-header">
                        <h2 class="section-title">Everything you need to succeed</h2>
                        <p class="section-subtitle">Comprehensive tools designed for IGCSE Computer Science revision</p>
                    </div>
                    
                    <div class="features-bento">
                        <div class="bento-card bento-large">
                            <div class="bento-icon">🎯</div>
                            <h3>Smart Quizzes</h3>
                            <p>335+ exam-style questions with instant feedback and detailed explanations</p>
                            <div class="bento-visual quiz-visual">
                                <div class="mini-question">
                                    <span class="q-text">What is 1010 in denary?</span>
                                    <div class="q-options">
                                        <span class="q-opt">8</span>
                                        <span class="q-opt correct">10</span>
                                        <span class="q-opt">12</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bento-card">
                            <div class="bento-icon">🎮</div>
                            <h3>12 Learning Games</h3>
                            <p>From Boss Battles to Type Racer - learn while having fun</p>
                        </div>
                        
                        <div class="bento-card">
                            <div class="bento-icon">🗂️</div>
                            <h3>Flashcards</h3>
                            <p>80+ flashcards with spaced repetition for maximum retention</p>
                        </div>
                        
                        <div class="bento-card">
                            <div class="bento-icon">📝</div>
                            <h3>Past Papers</h3>
                            <p>Paper 1 & Paper 2 practice with mark schemes</p>
                        </div>
                        
                        <div class="bento-card bento-large">
                            <div class="bento-icon">🛠️</div>
                            <h3>Interactive Tools</h3>
                            <p>Binary converter, logic gates simulator, algorithm visualizer, and more</p>
                            <div class="bento-visual tools-visual">
                                <div class="tool-demo">
                                    <span class="tool-label">Binary</span>
                                    <span class="tool-value">1010 = 10</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bento-card">
                            <div class="bento-icon">🐍</div>
                            <h3>Code Playground</h3>
                            <p>Write and run Python code directly in your browser</p>
                        </div>
                        
                        <div class="bento-card">
                            <div class="bento-icon">📊</div>
                            <h3>Progress Tracking</h3>
                            <p>XP, levels, achievements, and detailed analytics</p>
                        </div>
                    </div>
                </section>
                
                <!-- Topics Section -->
                <section class="landing-topics">
                    <div class="section-header">
                        <h2 class="section-title">Complete Syllabus Coverage</h2>
                        <p class="section-subtitle">All 10 IGCSE Computer Science topics, fully covered</p>
                    </div>
                    
                    <div class="topics-carousel">
                        <div class="topic-card" style="--topic-color: #f59e0b">
                            <span class="topic-icon">💾</span>
                            <span class="topic-name">Data Representation</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #10b981">
                            <span class="topic-icon">💻</span>
                            <span class="topic-name">Computer Systems</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #3b82f6">
                            <span class="topic-icon">🌐</span>
                            <span class="topic-name">Networks</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #8b5cf6">
                            <span class="topic-icon">🔒</span>
                            <span class="topic-name">Security</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #ec4899">
                            <span class="topic-icon">🔄</span>
                            <span class="topic-name">Algorithms</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #06b6d4">
                            <span class="topic-icon">🐍</span>
                            <span class="topic-name">Programming</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #f97316">
                            <span class="topic-icon">🗄️</span>
                            <span class="topic-name">Databases</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #14b8a6">
                            <span class="topic-icon">🤖</span>
                            <span class="topic-name">Emerging Tech</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #6366f1">
                            <span class="topic-icon">⚙️</span>
                            <span class="topic-name">Problem Solving</span>
                        </div>
                        <div class="topic-card" style="--topic-color: #84cc16">
                            <span class="topic-icon">⚖️</span>
                            <span class="topic-name">Ethics & Impacts</span>
                        </div>
                    </div>
                </section>
                
                <!-- Games Preview -->
                <section class="landing-games">
                    <div class="section-header">
                        <h2 class="section-title">Learn Through Play</h2>
                        <p class="section-subtitle">12 educational games that make revision addictive</p>
                    </div>
                    
                    <div class="games-showcase">
                        <div class="game-card-mini">
                            <span class="game-icon">⚡</span>
                            <span class="game-title">Speed Run</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">⚔️</span>
                            <span class="game-title">Battle Mode</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">🐉</span>
                            <span class="game-title">Boss Battles</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">💰</span>
                            <span class="game-title">Millionaire</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">🃏</span>
                            <span class="game-title">Memory Match</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">⌨️</span>
                            <span class="game-title">Type Racer</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">📝</span>
                            <span class="game-title">Fill Code</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">🔐</span>
                            <span class="game-title">Crypto Hack</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">🏰</span>
                            <span class="game-title">Tower Defense</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">🏭</span>
                            <span class="game-title">Code Factory</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">⛏️</span>
                            <span class="game-title">Gold Quest</span>
                        </div>
                        <div class="game-card-mini">
                            <span class="game-icon">🏎️</span>
                            <span class="game-title">Car Race</span>
                        </div>
                    </div>
                </section>
                
                <!-- Final CTA Section -->
                <section class="landing-final-cta">
                    <div class="cta-glow"></div>
                    <div class="cta-content">
                        <h2>Ready to ace your IGCSE?</h2>
                        <p>Join thousands of students who are mastering Computer Science the fun way.</p>
                        <button class="cta-primary cta-large" onclick="AuthModal.show('register')">
                            <span>Get Started Free</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                        <p class="cta-login-link">
                            Already have an account? <a href="#" onclick="AuthModal.show('login'); return false;">Log in</a>
                        </p>
                    </div>
                </section>
                
                <!-- Footer -->
                <footer class="landing-footer">
                    <div class="footer-content">
                        <div class="footer-brand">
                            <span class="footer-logo">CS Master Pro</span>
                            <span class="footer-tagline">IGCSE Computer Science Revision</span>
                        </div>
                        <div class="footer-links">
                            <a href="privacy.html">Privacy</a>
                            <a href="terms.html">Terms</a>
                            <a href="cookies.html">Cookies</a>
                        </div>
                        <p class="footer-copyright">© 2026 CS Master Pro. Made with 💚 for students.</p>
                    </div>
                </footer>
            </div>
        `;
    },
    
    init: () => {
        console.log('🏠 Landing page initialized');
        
        // Animate stats counter
        LandingView.animateCounters();
        
        // Add scroll reveal animations
        LandingView.initScrollAnimations();
    },
    
    cleanup: () => {
        console.log('🏠 Landing page cleanup');
    },
    
    /**
     * Animate number counters
     */
    animateCounters: () => {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const start = performance.now();
            
            const animate = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const eased = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * eased);
                
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target.toLocaleString() + '+';
                }
            };
            
            // Start animation when in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    },
    
    /**
     * Initialize scroll-triggered animations
     */
    initScrollAnimations: () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.bento-card, .topic-card, .game-card-mini, .section-header').forEach(el => {
            observer.observe(el);
        });
    }
};
