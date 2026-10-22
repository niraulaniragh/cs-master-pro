/**
 * LandingView.js - Complete Redesign
 * Modern, clean, conversion-focused landing page
 */

const LandingView = {
    render: () => {
        return `
            <div class="lp">
                <!-- Ambient Background -->
                <div class="lp-ambient">
                    <div class="ambient-orb orb-1"></div>
                    <div class="ambient-orb orb-2"></div>
                    <div class="ambient-orb orb-3"></div>
                </div>
                
                <!-- Navigation -->
                <nav class="lp-nav">
                    <div class="lp-nav-inner">
                        <div class="lp-logo">
                            <div class="logo-hex">
                                <span>CS</span>
                            </div>
                            <div class="logo-text">
                                <span class="logo-name">CS Master</span>
                                <span class="logo-tag">PRO</span>
                            </div>
                        </div>
                        <button class="lp-nav-btn" onclick="AuthModal.show('login')">
                            Sign In
                        </button>
                    </div>
                </nav>
                
                <!-- Hero -->
                <section class="lp-hero">
                    <div class="lp-hero-content">
                        <div class="hero-eyebrow">
                            <span class="eyebrow-icon">🎓</span>
                            <span>Pearson Edexcel IGCSE 4CP0</span>
                        </div>
                        
                        <h1 class="hero-headline">
                            The <span class="text-gradient">smarter</span> way to<br>
                            master Computer Science
                        </h1>
                        
                        <p class="hero-description">
                            Quizzes, games, flashcards, and tools designed specifically 
                            for IGCSE Computer Science. Learn faster. Remember longer. Score higher.
                        </p>
                        
                        <div class="hero-actions">
                            <button class="btn-hero-primary" onclick="AuthModal.show('signup')">
                                Start Free
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                            <button class="btn-hero-secondary" onclick="AuthModal.show('login')">
                                I have an account
                            </button>
                        </div>
                        
                        <div class="hero-metrics">
                            <div class="metric">
                                <span class="metric-value" data-count="335">0</span>
                                <span class="metric-label">Questions</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value" data-count="12">0</span>
                                <span class="metric-label">Games</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value" data-count="80">0</span>
                                <span class="metric-label">Flashcards</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value" data-count="11">0</span>
                                <span class="metric-label">Topics</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="lp-hero-visual">
                        <div class="dashboard-preview">
                            <div class="dash-header">
                                <div class="dash-user">
                                    <div class="user-avatar">🧑‍💻</div>
                                    <div class="user-info">
                                        <span class="user-name">Alex Chen</span>
                                        <span class="user-level">Level 12 • 8,450 XP</span>
                                    </div>
                                </div>
                                <div class="dash-streak">🔥 14 day streak</div>
                            </div>
                            <div class="dash-progress">
                                <div class="progress-ring">
                                    <svg viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" class="ring-bg"/>
                                        <circle cx="50" cy="50" r="45" class="ring-fill" style="--progress: 72"/>
                                    </svg>
                                    <span class="progress-text">72%</span>
                                </div>
                                <div class="progress-info">
                                    <span class="progress-title">Course Progress</span>
                                    <span class="progress-sub">7 of 10 topics mastered</span>
                                </div>
                            </div>
                            <div class="dash-achievements">
                                <span class="ach-badge">🏆 Quiz Master</span>
                                <span class="ach-badge">⚡ Speed Demon</span>
                                <span class="ach-badge">🎯 Perfect Score</span>
                            </div>
                            <div class="dash-recent">
                                <span class="recent-label">Continue Learning</span>
                                <div class="recent-topic">
                                    <span class="topic-emoji">🌐</span>
                                    <span class="topic-info">
                                        <span class="topic-title">Networks</span>
                                        <span class="topic-prog">85% complete</span>
                                    </span>
                                    <span class="topic-arrow">→</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Why Section -->
                <section class="lp-why">
                    <div class="why-header">
                        <span class="section-label">Why CS Master Pro?</span>
                        <h2 class="section-headline">Everything you need to ace your exam</h2>
                    </div>
                    
                    <div class="why-grid">
                        <div class="why-card">
                            <div class="why-icon">🎯</div>
                            <h3>Exam-Focused Content</h3>
                            <p>335+ questions mapped directly to the Edexcel syllabus. Every topic, every concept.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🎮</div>
                            <h3>Learn Through Play</h3>
                            <p>12 educational games turn revision into an addictive experience. Boss battles, racing, puzzles.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">📊</div>
                            <h3>Track Your Progress</h3>
                            <p>XP, levels, streaks, and detailed analytics show exactly where you're improving.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🧠</div>
                            <h3>Spaced Repetition</h3>
                            <p>Smart flashcards that adapt to what you know. Focus on what matters most.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🛠️</div>
                            <h3>Interactive Tools</h3>
                            <p>Binary converter, logic gates, algorithm visualizer - see concepts come alive.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">📝</div>
                            <h3>Past Paper Practice</h3>
                            <p>Paper 1 & 2 questions with mark schemes. Real exam preparation.</p>
                        </div>
                    </div>
                </section>
                
                <!-- Topics Section -->
                <section class="lp-topics">
                    <div class="topics-header">
                        <span class="section-label">Complete Coverage</span>
                        <h2 class="section-headline">All 10 IGCSE topics included</h2>
                    </div>
                    
                    <div class="topics-list">
                        <div class="topic-pill" style="--c: #6366f1"><span>🎯</span> Introduction to CS</div>
                        <div class="topic-pill" style="--c: #f59e0b"><span>💾</span> Data Representation</div>
                        <div class="topic-pill" style="--c: #10b981"><span>💻</span> Computer Systems</div>
                        <div class="topic-pill" style="--c: #3b82f6"><span>🌐</span> Networks</div>
                        <div class="topic-pill" style="--c: #8b5cf6"><span>🔒</span> Security</div>
                        <div class="topic-pill" style="--c: #ec4899"><span>🔄</span> Algorithms</div>
                        <div class="topic-pill" style="--c: #06b6d4"><span>🐍</span> Programming</div>
                        <div class="topic-pill" style="--c: #f97316"><span>🗄️</span> Databases</div>
                        <div class="topic-pill" style="--c: #14b8a6"><span>🤖</span> Emerging Tech</div>
                        <div class="topic-pill" style="--c: #ef4444"><span>⚙️</span> Problem Solving</div>
                        <div class="topic-pill" style="--c: #84cc16"><span>⚖️</span> Ethics</div>
                    </div>
                </section>
                
                <!-- Games Section -->
                <section class="lp-games">
                    <div class="games-header">
                        <span class="section-label">Fun & Effective</span>
                        <h2 class="section-headline">12 games that make learning addictive</h2>
                    </div>
                    
                    <div class="games-carousel">
                        <div class="game-tile"><span>⚡</span><p>Speed Run</p></div>
                        <div class="game-tile"><span>⚔️</span><p>Battle Mode</p></div>
                        <div class="game-tile"><span>🐉</span><p>Boss Battles</p></div>
                        <div class="game-tile"><span>💰</span><p>Millionaire</p></div>
                        <div class="game-tile"><span>🃏</span><p>Memory Match</p></div>
                        <div class="game-tile"><span>⌨️</span><p>Type Racer</p></div>
                        <div class="game-tile"><span>📝</span><p>Fill Code</p></div>
                        <div class="game-tile"><span>🔐</span><p>Crypto Hack</p></div>
                        <div class="game-tile"><span>🏰</span><p>Tower Defense</p></div>
                        <div class="game-tile"><span>🏭</span><p>Code Factory</p></div>
                        <div class="game-tile"><span>⛏️</span><p>Gold Quest</p></div>
                        <div class="game-tile"><span>🏎️</span><p>Car Race</p></div>
                    </div>
                </section>
                
                <!-- CTA Section -->
                <section class="lp-cta">
                    <div class="cta-box">
                        <h2>Ready to start?</h2>
                        <p>Join students who are mastering Computer Science the smart way.</p>
                        <button class="btn-cta" onclick="AuthModal.show('signup')">
                            Create Free Account
                        </button>
                        <span class="cta-note">No credit card needed • Free forever</span>
                    </div>
                </section>
                
                <!-- Footer -->
                <footer class="lp-footer">
                    <div class="footer-inner">
                        <span class="footer-brand">CS Master Pro</span>
                        <div class="footer-links">
                            <a href="privacy.html">Privacy</a>
                            <a href="terms.html">Terms</a>
                            <a href="cookies.html">Cookies</a>
                        </div>
                        <span class="footer-copy">© 2026 CS Master Pro</span>
                    </div>
                </footer>
            </div>
        `;
    },
    
    init: () => {
        console.log('🏠 Landing page initialized');
        LandingView.animateOnScroll();
        LandingView.countUp();
    },
    
    cleanup: () => {
        console.log('🏠 Landing page cleanup');
    },
    
    animateOnScroll: () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.why-card, .topic-pill, .game-tile').forEach(el => {
            observer.observe(el);
        });
    },
    
    countUp: () => {
        const counters = document.querySelectorAll('.metric-value[data-count]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    let current = 0;
                    const step = target / 40;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current);
                        }
                    }, 30);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(c => observer.observe(c));
    }
};
