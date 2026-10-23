/**
 * LandingView.js - Premium SaaS Landing Page
 * STUNNING fullscreen design with:
 * - Animated particles background
 * - Gradient animated title
 * - Typing effect tagline
 * - Glowing CTA buttons
 * - Animated stats counters
 * - Smooth scroll navigation
 * - Feature cards with hover effects
 * - Testimonials section
 * - Scroll indicator
 */

const LandingView = {
    _observers: [],
    _animationFrameId: null,
    _particles: [],
    _typingInterval: null,
    _particleCanvas: null,
    _particleCtx: null,
    
    render: () => {
        return `
            <div class="lp-premium">
                <!-- Particle Canvas Background -->
                <canvas class="particle-canvas" id="particleCanvas"></canvas>
                
                <!-- Floating Gradient Orbs -->
                <div class="floating-orbs" aria-hidden="true">
                    <div class="orb orb-1"></div>
                    <div class="orb orb-2"></div>
                    <div class="orb orb-3"></div>
                    <div class="orb orb-4"></div>
                </div>
                
                <!-- Navigation -->
                <nav class="lp-nav-premium">
                    <div class="nav-container">
                        <div class="nav-logo">
                            <div class="logo-icon">
                                <span class="logo-icon-text">CS</span>
                                <div class="logo-glow"></div>
                            </div>
                            <span class="logo-text">
                                <span class="logo-main">CS Master</span>
                                <span class="logo-pro">PRO</span>
                            </span>
                        </div>
                        <div class="nav-links">
                            <a href="#features" class="nav-link">Features</a>
                            <a href="#testimonials" class="nav-link">Testimonials</a>
                            <a href="#pricing" class="nav-link">Pricing</a>
                        </div>
                        <div class="nav-actions">
                            <button class="btn-nav-ghost" onclick="AuthModal.show('login')">Sign In</button>
                            <button class="btn-nav-glow" onclick="AuthModal.show('signup')">
                                <span>Get Started</span>
                                <div class="btn-glow-effect"></div>
                            </button>
                        </div>
                    </div>
                </nav>
                
                <!-- Hero Section - TRUE Fullscreen -->
                <section class="hero-fullscreen" id="hero">
                    <div class="hero-content-wrapper">
                        <div class="hero-badge animate-fade-in">
                            <span class="badge-pulse"></span>
                            <span class="badge-text">🚀 New: AI-Powered Learning Path</span>
                        </div>
                        
                        <h1 class="hero-title animate-fade-in delay-1">
                            <span class="title-line">Master</span>
                            <span class="title-gradient-wrapper">
                                <span class="title-gradient">CS Master Pro</span>
                            </span>
                            <span class="title-line">Like Never Before</span>
                        </h1>
                        
                        <p class="hero-tagline animate-fade-in delay-2" id="typingTagline">
                            <span class="typing-text"></span>
                            <span class="typing-cursor">|</span>
                        </p>
                        
                        <div class="hero-cta-group animate-fade-in delay-3">
                            <button class="btn-cta-primary" onclick="AuthModal.show('signup')">
                                <span class="btn-text">Start Learning Free</span>
                                <span class="btn-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </span>
                                <div class="btn-shine"></div>
                                <div class="btn-glow-ring"></div>
                            </button>
                            <button class="btn-cta-secondary" onclick="document.getElementById('features').scrollIntoView({behavior: 'smooth'})">
                                <span class="btn-icon-play">▶</span>
                                <span>See How It Works</span>
                            </button>
                        </div>
                        
                        <!-- Animated Stats Counters -->
                        <div class="hero-stats animate-fade-in delay-4">
                            <div class="stat-item">
                                <span class="stat-number" data-target="11">0</span>
                                <span class="stat-label">Topics</span>
                                <div class="stat-bar"></div>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">
                                <span class="stat-number" data-target="200" data-suffix="+">0</span>
                                <span class="stat-label">Questions</span>
                                <div class="stat-bar"></div>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">
                                <span class="stat-number" data-target="12">0</span>
                                <span class="stat-label">Games</span>
                                <div class="stat-bar"></div>
                            </div>
                        </div>
                        
                        <!-- Social Proof Mini -->
                        <div class="hero-social-proof animate-fade-in delay-5">
                            <div class="avatar-stack">
                                <div class="avatar" style="background: linear-gradient(135deg, #667eea, #764ba2);">A</div>
                                <div class="avatar" style="background: linear-gradient(135deg, #f093fb, #f5576c);">B</div>
                                <div class="avatar" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">C</div>
                                <div class="avatar" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">D</div>
                                <div class="avatar avatar-more">+99</div>
                            </div>
                            <span class="proof-text">Join <strong>1,000+</strong> students mastering CS</span>
                        </div>
                    </div>
                    
                    <!-- Scroll Indicator -->
                    <div class="scroll-indicator" onclick="document.getElementById('features').scrollIntoView({behavior: 'smooth'})">
                        <span class="scroll-text">Scroll to explore</span>
                        <div class="scroll-arrow">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12l7 7 7-7"/>
                            </svg>
                        </div>
                    </div>
                </section>
                
                <!-- Features Section -->
                <section class="features-section" id="features">
                    <div class="section-container">
                        <div class="section-header reveal-up">
                            <span class="section-badge">✨ Features</span>
                            <h2 class="section-title">Everything You Need to <span class="gradient-text">Excel</span></h2>
                            <p class="section-subtitle">Powerful tools designed to make learning Computer Science engaging, effective, and fun.</p>
                        </div>
                        
                        <div class="features-grid">
                            <div class="feature-card reveal-up" data-delay="0">
                                <div class="feature-icon-wrapper">
                                    <div class="feature-icon">🎯</div>
                                    <div class="feature-icon-glow"></div>
                                </div>
                                <h3 class="feature-title">Exam-Focused Content</h3>
                                <p class="feature-desc">335+ questions mapped directly to Edexcel IGCSE syllabus. Every topic covered.</p>
                                <div class="feature-link">
                                    <span>Learn more</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                            
                            <div class="feature-card reveal-up" data-delay="100">
                                <div class="feature-icon-wrapper">
                                    <div class="feature-icon">🎮</div>
                                    <div class="feature-icon-glow"></div>
                                </div>
                                <h3 class="feature-title">Gamified Learning</h3>
                                <p class="feature-desc">12 addictive games turn revision into play. Boss battles, racing, puzzles & more.</p>
                                <div class="feature-link">
                                    <span>Learn more</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                            
                            <div class="feature-card reveal-up" data-delay="200">
                                <div class="feature-icon-wrapper">
                                    <div class="feature-icon">📊</div>
                                    <div class="feature-icon-glow"></div>
                                </div>
                                <h3 class="feature-title">Progress Analytics</h3>
                                <p class="feature-desc">XP, levels, streaks & detailed insights. Know exactly where you're improving.</p>
                                <div class="feature-link">
                                    <span>Learn more</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                            
                            <div class="feature-card reveal-up" data-delay="300">
                                <div class="feature-icon-wrapper">
                                    <div class="feature-icon">🧠</div>
                                    <div class="feature-icon-glow"></div>
                                </div>
                                <h3 class="feature-title">Smart Flashcards</h3>
                                <p class="feature-desc">Spaced repetition adapts to what you know. Focus on what matters most.</p>
                                <div class="feature-link">
                                    <span>Learn more</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                            
                            <div class="feature-card reveal-up" data-delay="400">
                                <div class="feature-icon-wrapper">
                                    <div class="feature-icon">🛠️</div>
                                    <div class="feature-icon-glow"></div>
                                </div>
                                <h3 class="feature-title">Interactive Tools</h3>
                                <p class="feature-desc">Binary converter, logic gates, algorithm visualizer. See concepts come alive.</p>
                                <div class="feature-link">
                                    <span>Learn more</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                            
                            <div class="feature-card reveal-up" data-delay="500">
                                <div class="feature-icon-wrapper">
                                    <div class="feature-icon">📝</div>
                                    <div class="feature-icon-glow"></div>
                                </div>
                                <h3 class="feature-title">Past Papers</h3>
                                <p class="feature-desc">Paper 1 & 2 questions with mark schemes. Real exam preparation that works.</p>
                                <div class="feature-link">
                                    <span>Learn more</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Testimonials Section -->
                <section class="testimonials-section" id="testimonials">
                    <div class="section-container">
                        <div class="section-header reveal-up">
                            <span class="section-badge">💬 Testimonials</span>
                            <h2 class="section-title">Loved by <span class="gradient-text">Students</span></h2>
                            <p class="section-subtitle">See what students are saying about CS Master Pro</p>
                        </div>
                        
                        <div class="testimonials-grid">
                            <div class="testimonial-card reveal-up" data-delay="0">
                                <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                                <p class="testimonial-text">"This app completely changed how I study for CS. The games make learning fun and the progress tracking keeps me motivated!"</p>
                                <div class="testimonial-author">
                                    <div class="author-avatar" style="background: linear-gradient(135deg, #667eea, #764ba2);">SC</div>
                                    <div class="author-info">
                                        <span class="author-name">Sarah Chen</span>
                                        <span class="author-school">Year 11 • Grade 9 achieved</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="testimonial-card featured reveal-up" data-delay="100">
                                <div class="featured-badge">⭐ Featured</div>
                                <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                                <p class="testimonial-text">"I went from struggling with binary to getting top marks. The spaced repetition flashcards are genius - I actually remember things now!"</p>
                                <div class="testimonial-author">
                                    <div class="author-avatar" style="background: linear-gradient(135deg, #f093fb, #f5576c);">JM</div>
                                    <div class="author-info">
                                        <span class="author-name">James Miller</span>
                                        <span class="author-school">Year 10 • Most Improved</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="testimonial-card reveal-up" data-delay="200">
                                <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                                <p class="testimonial-text">"The boss battles and games are so addictive! I find myself studying more because it doesn't feel like studying anymore."</p>
                                <div class="testimonial-author">
                                    <div class="author-avatar" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">AP</div>
                                    <div class="author-info">
                                        <span class="author-name">Aisha Patel</span>
                                        <span class="author-school">Year 11 • CS Enthusiast</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Final CTA Section -->
                <section class="final-cta-section" id="pricing">
                    <div class="cta-background">
                        <div class="cta-orb cta-orb-1"></div>
                        <div class="cta-orb cta-orb-2"></div>
                    </div>
                    <div class="section-container">
                        <div class="cta-content reveal-up">
                            <h2 class="cta-title">Ready to Master Computer Science?</h2>
                            <p class="cta-subtitle">Join thousands of students who are learning smarter, not harder.</p>
                            
                            <div class="cta-features">
                                <div class="cta-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>
                                    <span>Free forever</span>
                                </div>
                                <div class="cta-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>
                                    <span>No credit card required</span>
                                </div>
                                <div class="cta-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>
                                    <span>Instant access</span>
                                </div>
                            </div>
                            
                            <button class="btn-cta-final" onclick="AuthModal.show('signup')">
                                <span class="btn-text">Create Free Account</span>
                                <span class="btn-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </span>
                                <div class="btn-particles">
                                    <span></span><span></span><span></span><span></span>
                                </div>
                            </button>
                            
                            <p class="cta-note">🔒 Secure • 🌍 GDPR Compliant • ⚡ Instant Setup</p>
                        </div>
                    </div>
                </section>
                
                <!-- Footer -->
                <footer class="premium-footer">
                    <div class="footer-container">
                        <div class="footer-brand">
                            <div class="footer-logo">
                                <span class="footer-logo-icon">CS</span>
                                <span class="footer-logo-text">CS Master Pro</span>
                            </div>
                            <p class="footer-tagline">The smarter way to master Computer Science</p>
                        </div>
                        <div class="footer-links-group">
                            <div class="footer-column">
                                <h4>Product</h4>
                                <a href="#features">Features</a>
                                <a href="#pricing">Pricing</a>
                                <a href="#testimonials">Reviews</a>
                            </div>
                            <div class="footer-column">
                                <h4>Legal</h4>
                                <a href="privacy.html">Privacy</a>
                                <a href="terms.html">Terms</a>
                                <a href="cookies.html">Cookies</a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <span>© 2026 CS Master Pro. All rights reserved.</span>
                    </div>
                </footer>
            </div>
            
            <style>
                /* ============================================
                   PREMIUM LANDING PAGE STYLES
                   ============================================ */
                
                /* CSS Variables */
                .lp-premium {
                    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                    --gradient-secondary: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                    --gradient-accent: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                    --gradient-warm: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
                    --glow-primary: 0 0 40px rgba(102, 126, 234, 0.5);
                    --glow-secondary: 0 0 40px rgba(79, 172, 254, 0.5);
                    --bg-dark: #0a0a0f;
                    --bg-card: rgba(255, 255, 255, 0.03);
                    --text-primary: #ffffff;
                    --text-secondary: rgba(255, 255, 255, 0.7);
                    --text-muted: rgba(255, 255, 255, 0.5);
                    --border-subtle: rgba(255, 255, 255, 0.1);
                }
                
                /* Base Reset */
                .lp-premium {
                    min-height: 100vh;
                    background: var(--bg-dark);
                    color: var(--text-primary);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    overflow-x: hidden;
                    position: relative;
                }
                
                .lp-premium * {
                    box-sizing: border-box;
                }
                
                /* ============================================
                   PARTICLE CANVAS
                   ============================================ */
                .particle-canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }
                
                /* ============================================
                   FLOATING ORBS BACKGROUND
                   ============================================ */
                .floating-orbs {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    overflow: hidden;
                }
                
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.4;
                    animation: floatOrb 20s ease-in-out infinite;
                }
                
                .orb-1 {
                    width: 600px;
                    height: 600px;
                    background: var(--gradient-primary);
                    top: -200px;
                    left: -200px;
                    animation-delay: 0s;
                }
                
                .orb-2 {
                    width: 500px;
                    height: 500px;
                    background: var(--gradient-secondary);
                    top: 50%;
                    right: -150px;
                    animation-delay: -5s;
                }
                
                .orb-3 {
                    width: 400px;
                    height: 400px;
                    background: var(--gradient-accent);
                    bottom: -100px;
                    left: 30%;
                    animation-delay: -10s;
                }
                
                .orb-4 {
                    width: 350px;
                    height: 350px;
                    background: var(--gradient-warm);
                    top: 60%;
                    left: -100px;
                    animation-delay: -15s;
                }
                
                @keyframes floatOrb {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(50px, -50px) scale(1.1); }
                    50% { transform: translate(-30px, 30px) scale(0.95); }
                    75% { transform: translate(40px, 20px) scale(1.05); }
                }
                
                /* ============================================
                   NAVIGATION
                   ============================================ */
                .lp-nav-premium {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    padding: 20px 40px;
                    background: rgba(10, 10, 15, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid var(--border-subtle);
                }
                
                .nav-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .logo-icon {
                    width: 44px;
                    height: 44px;
                    background: var(--gradient-primary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .logo-icon-text {
                    font-weight: 800;
                    font-size: 16px;
                    color: white;
                    z-index: 1;
                }
                
                .logo-glow {
                    position: absolute;
                    inset: 0;
                    background: var(--gradient-primary);
                    filter: blur(10px);
                    opacity: 0.5;
                    animation: pulse 2s ease-in-out infinite;
                }
                
                .logo-text {
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                }
                
                .logo-main {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--text-primary);
                }
                
                .logo-pro {
                    font-size: 12px;
                    font-weight: 700;
                    padding: 3px 8px;
                    background: var(--gradient-primary);
                    border-radius: 6px;
                    color: white;
                }
                
                .nav-links {
                    display: flex;
                    gap: 32px;
                }
                
                .nav-link {
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 500;
                    transition: color 0.3s ease;
                }
                
                .nav-link:hover {
                    color: var(--text-primary);
                }
                
                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .btn-nav-ghost {
                    padding: 10px 20px;
                    background: transparent;
                    border: 1px solid var(--border-subtle);
                    border-radius: 10px;
                    color: var(--text-primary);
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .btn-nav-ghost:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.2);
                }
                
                .btn-nav-glow {
                    padding: 10px 24px;
                    background: var(--gradient-primary);
                    border: none;
                    border-radius: 10px;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: var(--glow-primary);
                }
                
                .btn-nav-glow:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 60px rgba(102, 126, 234, 0.6);
                }
                
                .btn-glow-effect {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.6s ease;
                }
                
                .btn-nav-glow:hover .btn-glow-effect {
                    transform: translateX(100%);
                }
                
                /* ============================================
                   HERO SECTION - TRUE FULLSCREEN
                   ============================================ */
                .hero-fullscreen {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 120px 40px 60px;
                    position: relative;
                    z-index: 2;
                }
                
                .hero-content-wrapper {
                    text-align: center;
                    max-width: 900px;
                }
                
                /* Hero Badge */
                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 20px 8px 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border-subtle);
                    border-radius: 50px;
                    margin-bottom: 32px;
                }
                
                .badge-pulse {
                    width: 8px;
                    height: 8px;
                    background: #43e97b;
                    border-radius: 50%;
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }
                
                .badge-text {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--text-secondary);
                }
                
                /* Hero Title with Animated Gradient */
                .hero-title {
                    font-size: clamp(48px, 8vw, 80px);
                    font-weight: 800;
                    line-height: 1.1;
                    margin: 0 0 24px;
                    letter-spacing: -2px;
                }
                
                .title-line {
                    display: block;
                    color: var(--text-primary);
                }
                
                .title-gradient-wrapper {
                    display: block;
                    position: relative;
                }
                
                .title-gradient {
                    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe, #667eea);
                    background-size: 300% 100%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: gradientShift 4s ease-in-out infinite;
                }
                
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                /* Typing Effect Tagline */
                .hero-tagline {
                    font-size: 20px;
                    color: var(--text-secondary);
                    margin: 0 0 40px;
                    min-height: 30px;
                }
                
                .typing-text {
                    display: inline;
                }
                
                .typing-cursor {
                    display: inline;
                    animation: blink 0.8s step-end infinite;
                    color: #667eea;
                    font-weight: 300;
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                /* CTA Buttons */
                .hero-cta-group {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 48px;
                }
                
                .btn-cta-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 36px;
                    background: var(--gradient-primary);
                    border: none;
                    border-radius: 14px;
                    color: white;
                    font-size: 17px;
                    font-weight: 700;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s ease;
                    box-shadow: var(--glow-primary);
                }
                
                .btn-cta-primary:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 0 80px rgba(102, 126, 234, 0.7);
                }
                
                .btn-cta-primary .btn-icon {
                    display: flex;
                    transition: transform 0.3s ease;
                }
                
                .btn-cta-primary .btn-icon svg {
                    width: 20px;
                    height: 20px;
                }
                
                .btn-cta-primary:hover .btn-icon {
                    transform: translateX(5px);
                }
                
                .btn-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: shine 3s ease-in-out infinite;
                }
                
                @keyframes shine {
                    0% { left: -100%; }
                    50%, 100% { left: 100%; }
                }
                
                .btn-glow-ring {
                    position: absolute;
                    inset: -3px;
                    border-radius: 17px;
                    background: var(--gradient-primary);
                    z-index: -1;
                    opacity: 0.5;
                    filter: blur(15px);
                    animation: glowPulse 2s ease-in-out infinite;
                }
                
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                
                .btn-cta-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 18px 32px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border-subtle);
                    border-radius: 14px;
                    color: var(--text-primary);
                    font-size: 17px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .btn-cta-secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }
                
                .btn-icon-play {
                    font-size: 12px;
                    color: #667eea;
                }
                
                /* Stats Counters */
                .hero-stats {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 40px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                
                .stat-item {
                    text-align: center;
                    position: relative;
                }
                
                .stat-number {
                    display: block;
                    font-size: 48px;
                    font-weight: 800;
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                }
                
                .stat-label {
                    display: block;
                    font-size: 14px;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-top: 8px;
                }
                
                .stat-bar {
                    position: absolute;
                    bottom: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 3px;
                    background: var(--gradient-primary);
                    border-radius: 2px;
                    opacity: 0.5;
                }
                
                .stat-divider {
                    width: 1px;
                    height: 50px;
                    background: var(--border-subtle);
                }
                
                /* Social Proof */
                .hero-social-proof {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                }
                
                .avatar-stack {
                    display: flex;
                }
                
                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 3px solid var(--bg-dark);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 600;
                    color: white;
                    margin-left: -12px;
                }
                
                .avatar:first-child {
                    margin-left: 0;
                }
                
                .avatar-more {
                    background: rgba(255, 255, 255, 0.1) !important;
                    color: var(--text-secondary);
                    font-size: 11px;
                }
                
                .proof-text {
                    font-size: 15px;
                    color: var(--text-secondary);
                }
                
                .proof-text strong {
                    color: var(--text-primary);
                }
                
                /* Scroll Indicator */
                .scroll-indicator {
                    position: absolute;
                    bottom: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.3s ease;
                }
                
                .scroll-indicator:hover {
                    opacity: 1;
                }
                
                .scroll-text {
                    font-size: 12px;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                
                .scroll-arrow {
                    width: 30px;
                    height: 50px;
                    border: 2px solid var(--border-subtle);
                    border-radius: 20px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    padding-bottom: 8px;
                }
                
                .scroll-arrow svg {
                    width: 16px;
                    height: 16px;
                    stroke: var(--text-muted);
                    animation: scrollBounce 2s ease-in-out infinite;
                }
                
                @keyframes scrollBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(5px); }
                }
                
                /* ============================================
                   ANIMATIONS
                   ============================================ */
                .animate-fade-in {
                    opacity: 0;
                    transform: translateY(30px);
                    animation: fadeInUp 0.8s ease forwards;
                }
                
                .delay-1 { animation-delay: 0.1s; }
                .delay-2 { animation-delay: 0.2s; }
                .delay-3 { animation-delay: 0.3s; }
                .delay-4 { animation-delay: 0.4s; }
                .delay-5 { animation-delay: 0.5s; }
                
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Reveal animations */
                .reveal-up {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
                
                .reveal-up.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* ============================================
                   FEATURES SECTION
                   ============================================ */
                .features-section {
                    padding: 120px 40px;
                    position: relative;
                    z-index: 2;
                }
                
                .section-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .section-header {
                    text-align: center;
                    margin-bottom: 64px;
                }
                
                .section-badge {
                    display: inline-block;
                    padding: 8px 16px;
                    background: rgba(102, 126, 234, 0.1);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                    border-radius: 50px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #667eea;
                    margin-bottom: 20px;
                }
                
                .section-title {
                    font-size: clamp(36px, 5vw, 52px);
                    font-weight: 800;
                    color: var(--text-primary);
                    margin: 0 0 16px;
                    letter-spacing: -1px;
                }
                
                .gradient-text {
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .section-subtitle {
                    font-size: 18px;
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                /* Feature Cards */
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 24px;
                }
                
                .feature-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-subtle);
                    border-radius: 20px;
                    padding: 32px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s ease;
                }
                
                .feature-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: var(--gradient-primary);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                
                .feature-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(102, 126, 234, 0.3);
                    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
                }
                
                .feature-card:hover::before {
                    opacity: 0.05;
                }
                
                .feature-icon-wrapper {
                    position: relative;
                    width: 64px;
                    height: 64px;
                    margin-bottom: 20px;
                }
                
                .feature-icon {
                    width: 64px;
                    height: 64px;
                    background: rgba(102, 126, 234, 0.1);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    position: relative;
                    z-index: 1;
                    transition: transform 0.3s ease;
                }
                
                .feature-card:hover .feature-icon {
                    transform: scale(1.1);
                }
                
                .feature-icon-glow {
                    position: absolute;
                    inset: 0;
                    background: var(--gradient-primary);
                    border-radius: 16px;
                    filter: blur(20px);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                
                .feature-card:hover .feature-icon-glow {
                    opacity: 0.4;
                }
                
                .feature-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0 0 12px;
                    position: relative;
                    z-index: 1;
                }
                
                .feature-desc {
                    font-size: 15px;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin: 0 0 16px;
                    position: relative;
                    z-index: 1;
                }
                
                .feature-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #667eea;
                    position: relative;
                    z-index: 1;
                    transition: gap 0.3s ease;
                }
                
                .feature-link svg {
                    width: 16px;
                    height: 16px;
                    stroke: #667eea;
                    transition: transform 0.3s ease;
                }
                
                .feature-card:hover .feature-link {
                    gap: 10px;
                }
                
                .feature-card:hover .feature-link svg {
                    transform: translateX(4px);
                }
                
                /* ============================================
                   TESTIMONIALS SECTION
                   ============================================ */
                .testimonials-section {
                    padding: 120px 40px;
                    position: relative;
                    z-index: 2;
                    background: linear-gradient(180deg, transparent, rgba(102, 126, 234, 0.03), transparent);
                }
                
                .testimonials-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 24px;
                }
                
                .testimonial-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-subtle);
                    border-radius: 20px;
                    padding: 32px;
                    position: relative;
                    transition: all 0.4s ease;
                }
                
                .testimonial-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(255, 255, 255, 0.15);
                }
                
                .testimonial-card.featured {
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                    border-color: rgba(102, 126, 234, 0.3);
                }
                
                .featured-badge {
                    position: absolute;
                    top: -1px;
                    right: 24px;
                    background: var(--gradient-primary);
                    padding: 6px 12px;
                    border-radius: 0 0 8px 8px;
                    font-size: 11px;
                    font-weight: 700;
                    color: white;
                }
                
                .testimonial-stars {
                    font-size: 16px;
                    margin-bottom: 16px;
                    letter-spacing: 2px;
                }
                
                .testimonial-text {
                    font-size: 16px;
                    color: var(--text-primary);
                    line-height: 1.7;
                    margin: 0 0 24px;
                }
                
                .testimonial-author {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                
                .author-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: 700;
                    color: white;
                }
                
                .author-info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                
                .author-name {
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                
                .author-school {
                    font-size: 13px;
                    color: var(--text-muted);
                }
                
                /* ============================================
                   FINAL CTA SECTION
                   ============================================ */
                .final-cta-section {
                    padding: 120px 40px;
                    position: relative;
                    z-index: 2;
                    overflow: hidden;
                }
                
                .cta-background {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }
                
                .cta-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                }
                
                .cta-orb-1 {
                    width: 600px;
                    height: 600px;
                    background: var(--gradient-primary);
                    top: -200px;
                    left: 50%;
                    transform: translateX(-50%);
                    opacity: 0.3;
                }
                
                .cta-orb-2 {
                    width: 400px;
                    height: 400px;
                    background: var(--gradient-secondary);
                    bottom: -100px;
                    right: 10%;
                    opacity: 0.2;
                }
                
                .cta-content {
                    text-align: center;
                    position: relative;
                    z-index: 1;
                    background: var(--bg-card);
                    border: 1px solid var(--border-subtle);
                    border-radius: 32px;
                    padding: 80px 60px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .cta-title {
                    font-size: clamp(32px, 5vw, 48px);
                    font-weight: 800;
                    color: var(--text-primary);
                    margin: 0 0 16px;
                    letter-spacing: -1px;
                }
                
                .cta-subtitle {
                    font-size: 18px;
                    color: var(--text-secondary);
                    margin: 0 0 40px;
                }
                
                .cta-features {
                    display: flex;
                    justify-content: center;
                    gap: 32px;
                    flex-wrap: wrap;
                    margin-bottom: 40px;
                }
                
                .cta-feature {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 15px;
                    color: var(--text-secondary);
                }
                
                .cta-feature svg {
                    width: 20px;
                    height: 20px;
                    stroke: #43e97b;
                }
                
                .btn-cta-final {
                    display: inline-flex;
                    align-items: center;
                    gap: 14px;
                    padding: 22px 48px;
                    background: var(--gradient-primary);
                    border: none;
                    border-radius: 16px;
                    color: white;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s ease;
                    box-shadow: var(--glow-primary);
                }
                
                .btn-cta-final:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 0 100px rgba(102, 126, 234, 0.7);
                }
                
                .btn-cta-final .btn-icon {
                    display: flex;
                    transition: transform 0.3s ease;
                }
                
                .btn-cta-final .btn-icon svg {
                    width: 22px;
                    height: 22px;
                }
                
                .btn-cta-final:hover .btn-icon {
                    transform: translateX(6px);
                }
                
                .btn-particles span {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: white;
                    border-radius: 50%;
                    opacity: 0;
                }
                
                .btn-cta-final:hover .btn-particles span {
                    animation: particle 0.6s ease forwards;
                }
                
                .btn-particles span:nth-child(1) { left: 20%; top: 50%; animation-delay: 0s; }
                .btn-particles span:nth-child(2) { left: 40%; top: 30%; animation-delay: 0.1s; }
                .btn-particles span:nth-child(3) { left: 60%; top: 70%; animation-delay: 0.2s; }
                .btn-particles span:nth-child(4) { left: 80%; top: 40%; animation-delay: 0.3s; }
                
                @keyframes particle {
                    0% { opacity: 1; transform: translateY(0) scale(1); }
                    100% { opacity: 0; transform: translateY(-30px) scale(0); }
                }
                
                .cta-note {
                    display: block;
                    margin-top: 24px;
                    font-size: 14px;
                    color: var(--text-muted);
                }
                
                /* ============================================
                   FOOTER
                   ============================================ */
                .premium-footer {
                    padding: 60px 40px 30px;
                    border-top: 1px solid var(--border-subtle);
                    position: relative;
                    z-index: 2;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 40px;
                }
                
                .footer-brand {
                    max-width: 300px;
                }
                
                .footer-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 12px;
                }
                
                .footer-logo-icon {
                    width: 36px;
                    height: 36px;
                    background: var(--gradient-primary);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 800;
                    color: white;
                }
                
                .footer-logo-text {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--text-primary);
                }
                
                .footer-tagline {
                    font-size: 14px;
                    color: var(--text-muted);
                    margin: 0;
                }
                
                .footer-links-group {
                    display: flex;
                    gap: 80px;
                }
                
                .footer-column h4 {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 16px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .footer-column a {
                    display: block;
                    color: var(--text-muted);
                    text-decoration: none;
                    font-size: 14px;
                    margin-bottom: 10px;
                    transition: color 0.3s ease;
                }
                
                .footer-column a:hover {
                    color: var(--text-primary);
                }
                
                .footer-bottom {
                    max-width: 1200px;
                    margin: 40px auto 0;
                    padding-top: 20px;
                    border-top: 1px solid var(--border-subtle);
                    text-align: center;
                    font-size: 13px;
                    color: var(--text-muted);
                }
                
                /* ============================================
                   RESPONSIVE
                   ============================================ */
                @media (max-width: 900px) {
                    .lp-nav-premium {
                        padding: 16px 20px;
                    }
                    
                    .nav-links {
                        display: none;
                    }
                    
                    .hero-fullscreen {
                        padding: 100px 20px 60px;
                    }
                    
                    .hero-stats {
                        gap: 24px;
                    }
                    
                    .stat-divider {
                        display: none;
                    }
                    
                    .features-section,
                    .testimonials-section,
                    .final-cta-section {
                        padding: 80px 20px;
                    }
                    
                    .cta-content {
                        padding: 50px 30px;
                    }
                    
                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                        align-items: center;
                    }
                    
                    .footer-links-group {
                        gap: 40px;
                    }
                }
                
                @media (max-width: 600px) {
                    .hero-cta-group {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .btn-cta-primary,
                    .btn-cta-secondary {
                        width: 100%;
                        max-width: 300px;
                        justify-content: center;
                    }
                    
                    .hero-social-proof {
                        flex-direction: column;
                        gap: 12px;
                    }
                    
                    .stat-number {
                        font-size: 36px;
                    }
                    
                    .features-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .testimonials-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .cta-features {
                        flex-direction: column;
                        gap: 12px;
                    }
                    
                    .btn-cta-final {
                        width: 100%;
                        max-width: 300px;
                        justify-content: center;
                    }
                }
                
                /* Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .animate-fade-in,
                    .reveal-up {
                        animation: none;
                        opacity: 1;
                        transform: none;
                    }
                    
                    .orb,
                    .btn-shine,
                    .typing-cursor,
                    .badge-pulse,
                    .scroll-arrow svg {
                        animation: none;
                    }
                    
                    .title-gradient {
                        animation: none;
                        background-position: 0% 50%;
                    }
                }
            </style>
        `;
    },
    
    init: () => {
        console.log('🚀 Premium Landing page initialized');
        
        requestAnimationFrame(() => {
            LandingView.initParticles();
            LandingView.initTypingEffect();
            LandingView.initScrollReveal();
            LandingView.initCounters();
            LandingView.initSmoothScroll();
        });
    },
    
    cleanup: () => {
        console.log('🧹 Landing page cleanup');
        
        LandingView._observers.forEach(obs => obs.disconnect());
        LandingView._observers = [];
        
        if (LandingView._animationFrameId) {
            cancelAnimationFrame(LandingView._animationFrameId);
            LandingView._animationFrameId = null;
        }
        
        if (LandingView._typingInterval) {
            clearInterval(LandingView._typingInterval);
            LandingView._typingInterval = null;
        }
    },
    
    // Particle System
    initParticles: () => {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        LandingView._particleCanvas = canvas;
        LandingView._particleCtx = canvas.getContext('2d');
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        
        // Create particles
        const particleCount = 80;
        LandingView._particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            LandingView._particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        const animate = () => {
            const ctx = LandingView._particleCtx;
            const particles = LandingView._particles;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((p, i) => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;
                
                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 126, 234, ${p.opacity})`;
                ctx.fill();
                
                // Draw connections
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - dist / 120)})`;
                        ctx.stroke();
                    }
                });
            });
            
            LandingView._animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
    },
    
    // Typing Effect
    initTypingEffect: () => {
        const phrases = [
            "Interactive quizzes that make learning fun 🎯",
            "12 addictive games to master every concept 🎮",
            "Smart flashcards powered by spaced repetition 🧠",
            "Track your progress with detailed analytics 📊",
            "Built specifically for IGCSE Computer Science 📚"
        ];
        
        const typingEl = document.querySelector('.typing-text');
        if (!typingEl) return;
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 50;
        
        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else {
                typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 50;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before new phrase
            }
            
            LandingView._typingInterval = setTimeout(type, typingSpeed);
        };
        
        setTimeout(type, 1000);
    },
    
    // Scroll Reveal
    initScrollReveal: () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay) || 0;
                    
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay);
                    
                    observer.unobserve(el);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        LandingView._observers.push(observer);
        
        document.querySelectorAll('.reveal-up').forEach(el => {
            observer.observe(el);
        });
    },
    
    // Animated Counters
    initCounters: () => {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        if (!counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    const suffix = el.dataset.suffix || '';
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);
                        
                        el.textContent = current + (progress === 1 ? suffix : '');
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    
                    requestAnimationFrame(animate);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        LandingView._observers.push(observer);
        counters.forEach(c => observer.observe(c));
    },
    
    // Smooth Scroll for anchor links
    initSmoothScroll: () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
};
