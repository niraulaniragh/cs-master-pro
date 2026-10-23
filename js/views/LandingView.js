/**
 * LandingView.js - Complete Redesign
 * Modern, clean, conversion-focused landing page
 * 
 * Fixes applied:
 * - Improved animations with staggered delays and will-change hints
 * - Enhanced CTA buttons with better contrast and hover states
 * - Mobile-first responsive design
 * - Performance optimizations (lazy observers, reduced reflows)
 */

const LandingView = {
    // Store observer references for cleanup
    _observers: [],
    _animationFrameId: null,
    
    render: () => {
        return `
            <div class="lp">
                <!-- Ambient Background - lazy loaded -->
                <div class="lp-ambient" aria-hidden="true">
                    <div class="ambient-orb orb-1"></div>
                    <div class="ambient-orb orb-2"></div>
                    <div class="ambient-orb orb-3"></div>
                </div>
                
                <!-- Navigation -->
                <nav class="lp-nav" role="navigation" aria-label="Main navigation">
                    <div class="lp-nav-inner">
                        <div class="lp-logo">
                            <div class="logo-hex" aria-hidden="true">
                                <span>CS</span>
                            </div>
                            <div class="logo-text">
                                <span class="logo-name">CS Master</span>
                                <span class="logo-tag">PRO</span>
                            </div>
                        </div>
                        <div class="lp-nav-actions">
                            <button class="lp-nav-btn lp-nav-btn--secondary" onclick="AuthModal.show('login')">
                                Sign In
                            </button>
                            <button class="lp-nav-btn lp-nav-btn--primary lp-nav-cta" onclick="AuthModal.show('signup')">
                                Get Started Free
                            </button>
                        </div>
                    </div>
                </nav>
                
                <!-- Hero -->
                <section class="lp-hero" aria-labelledby="hero-title">
                    <div class="lp-hero-content">
                        <div class="hero-eyebrow lp-fade-in">
                            <span class="eyebrow-icon" aria-hidden="true">🎓</span>
                            <span>Pearson Edexcel IGCSE 4CP0</span>
                        </div>
                        
                        <h1 id="hero-title" class="hero-headline lp-fade-in lp-delay-1">
                            The <span class="text-gradient">smarter</span> way to<br>
                            master Computer Science
                        </h1>
                        
                        <p class="hero-description lp-fade-in lp-delay-2">
                            Quizzes, games, flashcards, and tools designed specifically 
                            for IGCSE Computer Science. Learn faster. Remember longer. Score higher.
                        </p>
                        
                        <div class="hero-actions lp-fade-in lp-delay-3">
                            <button class="btn-hero-primary" onclick="AuthModal.show('signup')" aria-label="Start learning for free">
                                <span>Start Free</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                            <button class="btn-hero-secondary" onclick="AuthModal.show('login')">
                                I have an account
                            </button>
                        </div>
                        
                        <div class="hero-metrics lp-fade-in lp-delay-4" role="list" aria-label="Platform statistics">
                            <div class="metric" role="listitem">
                                <span class="metric-value" data-count="335" aria-live="polite">0</span>
                                <span class="metric-label">Questions</span>
                            </div>
                            <div class="metric" role="listitem">
                                <span class="metric-value" data-count="12" aria-live="polite">0</span>
                                <span class="metric-label">Games</span>
                            </div>
                            <div class="metric" role="listitem">
                                <span class="metric-value" data-count="80" aria-live="polite">0</span>
                                <span class="metric-label">Flashcards</span>
                            </div>
                            <div class="metric" role="listitem">
                                <span class="metric-value" data-count="11" aria-live="polite">0</span>
                                <span class="metric-label">Topics</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="lp-hero-visual lp-fade-in lp-delay-2" aria-hidden="true">
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
                <section class="lp-why" aria-labelledby="why-title">
                    <div class="why-header">
                        <span class="section-label">Why CS Master Pro?</span>
                        <h2 id="why-title" class="section-headline">Everything you need to ace your exam</h2>
                    </div>
                    
                    <div class="why-grid" role="list">
                        <div class="why-card lp-reveal" role="listitem" data-delay="0">
                            <div class="why-icon" aria-hidden="true">🎯</div>
                            <h3>Exam-Focused Content</h3>
                            <p>335+ questions mapped directly to the Edexcel syllabus. Every topic, every concept.</p>
                        </div>
                        <div class="why-card lp-reveal" role="listitem" data-delay="100">
                            <div class="why-icon" aria-hidden="true">🎮</div>
                            <h3>Learn Through Play</h3>
                            <p>12 educational games turn revision into an addictive experience. Boss battles, racing, puzzles.</p>
                        </div>
                        <div class="why-card lp-reveal" role="listitem" data-delay="200">
                            <div class="why-icon" aria-hidden="true">📊</div>
                            <h3>Track Your Progress</h3>
                            <p>XP, levels, streaks, and detailed analytics show exactly where you're improving.</p>
                        </div>
                        <div class="why-card lp-reveal" role="listitem" data-delay="300">
                            <div class="why-icon" aria-hidden="true">🧠</div>
                            <h3>Spaced Repetition</h3>
                            <p>Smart flashcards that adapt to what you know. Focus on what matters most.</p>
                        </div>
                        <div class="why-card lp-reveal" role="listitem" data-delay="400">
                            <div class="why-icon" aria-hidden="true">🛠️</div>
                            <h3>Interactive Tools</h3>
                            <p>Binary converter, logic gates, algorithm visualizer - see concepts come alive.</p>
                        </div>
                        <div class="why-card lp-reveal" role="listitem" data-delay="500">
                            <div class="why-icon" aria-hidden="true">📝</div>
                            <h3>Past Paper Practice</h3>
                            <p>Paper 1 & 2 questions with mark schemes. Real exam preparation.</p>
                        </div>
                    </div>
                </section>
                
                <!-- Topics Section -->
                <section class="lp-topics" aria-labelledby="topics-title">
                    <div class="topics-header">
                        <span class="section-label">Complete Coverage</span>
                        <h2 id="topics-title" class="section-headline">All 10 IGCSE topics included</h2>
                    </div>
                    
                    <div class="topics-list" role="list">
                        <div class="topic-pill lp-reveal" style="--c: #6366f1" role="listitem" data-delay="0"><span aria-hidden="true">🎯</span> Introduction to CS</div>
                        <div class="topic-pill lp-reveal" style="--c: #f59e0b" role="listitem" data-delay="50"><span aria-hidden="true">💾</span> Data Representation</div>
                        <div class="topic-pill lp-reveal" style="--c: #10b981" role="listitem" data-delay="100"><span aria-hidden="true">💻</span> Computer Systems</div>
                        <div class="topic-pill lp-reveal" style="--c: #3b82f6" role="listitem" data-delay="150"><span aria-hidden="true">🌐</span> Networks</div>
                        <div class="topic-pill lp-reveal" style="--c: #8b5cf6" role="listitem" data-delay="200"><span aria-hidden="true">🔒</span> Security</div>
                        <div class="topic-pill lp-reveal" style="--c: #ec4899" role="listitem" data-delay="250"><span aria-hidden="true">🔄</span> Algorithms</div>
                        <div class="topic-pill lp-reveal" style="--c: #06b6d4" role="listitem" data-delay="300"><span aria-hidden="true">🐍</span> Programming</div>
                        <div class="topic-pill lp-reveal" style="--c: #f97316" role="listitem" data-delay="350"><span aria-hidden="true">🗄️</span> Databases</div>
                        <div class="topic-pill lp-reveal" style="--c: #14b8a6" role="listitem" data-delay="400"><span aria-hidden="true">🤖</span> Emerging Tech</div>
                        <div class="topic-pill lp-reveal" style="--c: #ef4444" role="listitem" data-delay="450"><span aria-hidden="true">⚙️</span> Problem Solving</div>
                        <div class="topic-pill lp-reveal" style="--c: #84cc16" role="listitem" data-delay="500"><span aria-hidden="true">⚖️</span> Ethics</div>
                    </div>
                </section>
                
                <!-- Games Section -->
                <section class="lp-games" aria-labelledby="games-title">
                    <div class="games-header">
                        <span class="section-label">Fun & Effective</span>
                        <h2 id="games-title" class="section-headline">12 games that make learning addictive</h2>
                    </div>
                    
                    <div class="games-carousel" role="list">
                        <div class="game-tile lp-reveal" role="listitem" data-delay="0"><span aria-hidden="true">⚡</span><p>Speed Run</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="50"><span aria-hidden="true">⚔️</span><p>Battle Mode</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="100"><span aria-hidden="true">🐉</span><p>Boss Battles</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="150"><span aria-hidden="true">💰</span><p>Millionaire</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="200"><span aria-hidden="true">🃏</span><p>Memory Match</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="250"><span aria-hidden="true">⌨️</span><p>Type Racer</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="300"><span aria-hidden="true">📝</span><p>Fill Code</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="350"><span aria-hidden="true">🔐</span><p>Crypto Hack</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="400"><span aria-hidden="true">🏰</span><p>Tower Defense</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="450"><span aria-hidden="true">🏭</span><p>Code Factory</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="500"><span aria-hidden="true">⛏️</span><p>Gold Quest</p></div>
                        <div class="game-tile lp-reveal" role="listitem" data-delay="550"><span aria-hidden="true">🏎️</span><p>Car Race</p></div>
                    </div>
                </section>
                
                <!-- CTA Section -->
                <section class="lp-cta" aria-labelledby="cta-title">
                    <div class="cta-box lp-reveal">
                        <h2 id="cta-title">Ready to start?</h2>
                        <p>Join students who are mastering Computer Science the smart way.</p>
                        <button class="btn-cta btn-cta--animated" onclick="AuthModal.show('signup')" aria-label="Create your free account now">
                            <span class="btn-cta-text">Create Free Account</span>
                            <span class="btn-cta-icon" aria-hidden="true">→</span>
                        </button>
                        <span class="cta-note">No credit card needed • Free forever</span>
                    </div>
                </section>
                
                <!-- Footer -->
                <footer class="lp-footer" role="contentinfo">
                    <div class="footer-inner">
                        <span class="footer-brand">CS Master Pro</span>
                        <nav class="footer-links" aria-label="Footer navigation">
                            <a href="privacy.html">Privacy</a>
                            <a href="terms.html">Terms</a>
                            <a href="cookies.html">Cookies</a>
                        </nav>
                        <span class="footer-copy">© 2026 CS Master Pro</span>
                    </div>
                </footer>
            </div>
            
            <style>
                /* Performance: Add will-change hints for animated elements */
                .lp-fade-in, .lp-reveal {
                    will-change: opacity, transform;
                }
                
                /* Hero fade-in animations */
                .lp-fade-in {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: lpFadeIn 0.6s ease forwards;
                }
                .lp-delay-1 { animation-delay: 0.1s; }
                .lp-delay-2 { animation-delay: 0.2s; }
                .lp-delay-3 { animation-delay: 0.3s; }
                .lp-delay-4 { animation-delay: 0.4s; }
                
                @keyframes lpFadeIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Scroll reveal elements */
                .lp-reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
                .lp-reveal.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* Enhanced CTA buttons */
                .lp-nav-actions {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }
                
                .lp-nav-btn--primary {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    border: none;
                    color: white;
                    font-weight: 600;
                    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
                }
                
                .lp-nav-btn--primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
                }
                
                .lp-nav-cta {
                    display: none;
                }
                
                @media (min-width: 768px) {
                    .lp-nav-cta {
                        display: inline-flex;
                    }
                }
                
                /* Animated CTA button */
                .btn-cta--animated {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 18px 36px;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    border: none;
                    border-radius: 12px;
                    color: white;
                    font-weight: 700;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
                    position: relative;
                    overflow: hidden;
                }
                
                .btn-cta--animated::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s ease;
                }
                
                .btn-cta--animated:hover::before {
                    left: 100%;
                }
                
                .btn-cta--animated:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 40px rgba(16, 185, 129, 0.5);
                }
                
                .btn-cta-icon {
                    transition: transform 0.3s ease;
                }
                
                .btn-cta--animated:hover .btn-cta-icon {
                    transform: translateX(5px);
                }
                
                /* Mobile responsiveness fixes */
                @media (max-width: 900px) {
                    .lp-hero {
                        grid-template-columns: 1fr;
                        padding: 100px 20px 60px;
                        gap: 40px;
                        text-align: center;
                    }
                    
                    .lp-hero-content {
                        max-width: 100%;
                    }
                    
                    .hero-actions {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .btn-hero-primary,
                    .btn-hero-secondary {
                        width: 100%;
                        max-width: 300px;
                        justify-content: center;
                    }
                    
                    .hero-metrics {
                        justify-content: center;
                        flex-wrap: wrap;
                        gap: 20px 32px;
                    }
                    
                    .metric {
                        text-align: center;
                        min-width: 80px;
                    }
                    
                    .lp-hero-visual {
                        display: none;
                    }
                    
                    .why-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                    
                    .topics-list {
                        gap: 8px;
                    }
                    
                    .topic-pill {
                        font-size: 0.8rem;
                        padding: 8px 14px;
                    }
                    
                    .games-carousel {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 12px;
                    }
                    
                    .game-tile {
                        padding: 16px 8px;
                    }
                    
                    .game-tile span {
                        font-size: 1.5rem;
                    }
                    
                    .game-tile p {
                        font-size: 0.7rem;
                    }
                    
                    .cta-box {
                        padding: 40px 24px;
                    }
                    
                    .btn-cta--animated {
                        width: 100%;
                        max-width: 300px;
                        justify-content: center;
                    }
                }
                
                @media (max-width: 600px) {
                    .lp-nav-inner {
                        height: 56px;
                    }
                    
                    .logo-name {
                        font-size: 1rem;
                    }
                    
                    .hero-headline {
                        font-size: 1.8rem;
                    }
                    
                    .hero-description {
                        font-size: 1rem;
                    }
                    
                    .metric-value {
                        font-size: 1.5rem;
                    }
                    
                    .metric-label {
                        font-size: 0.75rem;
                    }
                    
                    .why-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .games-carousel {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .footer-inner {
                        flex-direction: column;
                        gap: 16px;
                        text-align: center;
                    }
                }
                
                /* Reduce motion for accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .lp-fade-in,
                    .lp-reveal {
                        animation: none;
                        opacity: 1;
                        transform: none;
                        transition: none;
                    }
                    
                    .ambient-orb {
                        animation: none;
                    }
                    
                    .btn-cta--animated::before {
                        display: none;
                    }
                }
            </style>
        `;
    },
    
    init: () => {
        console.log('🏠 Landing page initialized');
        
        // Defer non-critical animations
        requestAnimationFrame(() => {
            LandingView.setupScrollReveal();
            LandingView.countUp();
        });
    },
    
    cleanup: () => {
        console.log('🏠 Landing page cleanup');
        
        // Disconnect all observers
        LandingView._observers.forEach(obs => obs.disconnect());
        LandingView._observers = [];
        
        // Cancel any pending animation frames
        if (LandingView._animationFrameId) {
            cancelAnimationFrame(LandingView._animationFrameId);
            LandingView._animationFrameId = null;
        }
    },
    
    setupScrollReveal: () => {
        // Use a single observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay) || 0;
                    
                    // Use setTimeout for staggered animations
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay);
                    
                    // Unobserve after revealing
                    observer.unobserve(el);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
        });
        
        // Store reference for cleanup
        LandingView._observers.push(observer);
        
        // Observe all reveal elements
        document.querySelectorAll('.lp-reveal').forEach(el => {
            observer.observe(el);
        });
    },
    
    countUp: () => {
        const counters = document.querySelectorAll('.metric-value[data-count]');
        if (!counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const duration = 1000; // 1 second total
                    const startTime = performance.now();
                    
                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function for smooth animation
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);
                        
                        el.textContent = current;
                        
                        if (progress < 1) {
                            LandingView._animationFrameId = requestAnimationFrame(animate);
                        } else {
                            el.textContent = target + '+';
                        }
                    };
                    
                    LandingView._animationFrameId = requestAnimationFrame(animate);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        // Store reference for cleanup
        LandingView._observers.push(observer);
        
        counters.forEach(c => observer.observe(c));
    }
};
