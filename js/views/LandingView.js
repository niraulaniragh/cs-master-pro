/**
 * LandingView.js - Landing Page for Guests
 * Matches the main app UI style with interactive elements
 */

const LandingView = {
    demoQuestion: null,
    demoAnswered: false,
    counterAnimated: false,
    
    render: () => {
        const totalQuestions = (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS) && QUESTIONS.length) || 200;
        const totalTopics = (typeof TOPICS !== 'undefined' && Array.isArray(TOPICS) && TOPICS.length) || 11;
        
        // Get a random demo question
        LandingView.demoQuestion = LandingView.getRandomQuestion();
        LandingView.demoAnswered = false;
        
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
                                <span class="preview-number" data-target="${totalTopics}">0</span>
                                <span class="preview-label">Topics</span>
                            </div>
                            <div class="preview-stat">
                                <span class="preview-number" data-target="${totalQuestions}">0</span>
                                <span class="preview-label">Questions</span>
                            </div>
                            <div class="preview-stat">
                                <span class="preview-number" data-target="12">0</span>
                                <span class="preview-label">Games</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Interactive Demo Section -->
                <section class="demo-section">
                    <div class="card-new demo-card">
                        <div class="card-header">
                            <h2>🎯 Try a Question!</h2>
                            <span class="demo-badge">Live Demo</span>
                        </div>
                        <div class="demo-question-area" id="demo-question-area">
                            ${LandingView.renderDemoQuestion()}
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
                            <button class="quick-btn-new" onclick="LandingView.showFeaturePreview('learn')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #3b82f6, #60a5fa);">📚</div>
                                <div class="quick-info">
                                    <span class="quick-title">Learn</span>
                                    <span class="quick-desc">Comprehensive notes for all topics</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="LandingView.showFeaturePreview('practice')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #10b981, #34d399);">🎯</div>
                                <div class="quick-info">
                                    <span class="quick-title">Practice</span>
                                    <span class="quick-desc">Quiz yourself with instant feedback</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="LandingView.showFeaturePreview('games')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #8b5cf6, #a78bfa);">🎮</div>
                                <div class="quick-info">
                                    <span class="quick-title">Games</span>
                                    <span class="quick-desc">12 games to make learning fun</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="LandingView.showFeaturePreview('code')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">💻</div>
                                <div class="quick-info">
                                    <span class="quick-title">Code Playground</span>
                                    <span class="quick-desc">Write and run Python code</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="LandingView.showFeaturePreview('tools')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #f97316, #fb923c);">🔧</div>
                                <div class="quick-info">
                                    <span class="quick-title">Tools</span>
                                    <span class="quick-desc">Binary, hex converters & more</span>
                                </div>
                            </button>
                            <button class="quick-btn-new" onclick="LandingView.showFeaturePreview('papers')">
                                <div class="quick-icon-lg" style="background: linear-gradient(135deg, #ec4899, #f472b6);">📝</div>
                                <div class="quick-info">
                                    <span class="quick-title">Past Papers</span>
                                    <span class="quick-desc">Real exam questions with solutions</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Topics Preview - Interactive -->
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
                        
                        <!-- Live Stats -->
                        <div class="card-new stats-card-landing">
                            <div class="card-header">
                                <h2>📊 Platform Stats</h2>
                            </div>
                            <div class="landing-stats-grid">
                                <div class="landing-stat-item">
                                    <div class="landing-stat-icon">👥</div>
                                    <div class="landing-stat-info">
                                        <span class="landing-stat-value" data-target="1000">0</span>
                                        <span class="landing-stat-label">Students</span>
                                    </div>
                                </div>
                                <div class="landing-stat-item">
                                    <div class="landing-stat-icon">✅</div>
                                    <div class="landing-stat-info">
                                        <span class="landing-stat-value" data-target="50000">0</span>
                                        <span class="landing-stat-label">Questions Answered</span>
                                    </div>
                                </div>
                                <div class="landing-stat-item">
                                    <div class="landing-stat-icon">🎮</div>
                                    <div class="landing-stat-info">
                                        <span class="landing-stat-value" data-target="10000">0</span>
                                        <span class="landing-stat-label">Games Played</span>
                                    </div>
                                </div>
                                <div class="landing-stat-item">
                                    <div class="landing-stat-icon">⭐</div>
                                    <div class="landing-stat-info">
                                        <span class="landing-stat-value">4.8</span>
                                        <span class="landing-stat-label">Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="main-right">
                        <!-- Games Preview - Clickable -->
                        <div class="card-new">
                            <div class="card-header">
                                <h2>🎮 Fun Learning Games</h2>
                            </div>
                            <div class="games-preview-list">
                                ${LandingView.renderGamesPreview()}
                            </div>
                            <button class="btn-secondary btn-full" onclick="LandingView.tryAsGuest()">
                                <i class="fas fa-play"></i> Try Games as Guest
                            </button>
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
    
    getRandomQuestion: () => {
        if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
            return {
                question: 'What does CPU stand for?',
                options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'],
                answer: 0,
                explanation: 'CPU stands for Central Processing Unit - the brain of the computer.'
            };
        }
        const easyQuestions = QUESTIONS.filter(q => q.id <= 50);
        const pool = easyQuestions.length > 0 ? easyQuestions : QUESTIONS;
        return pool[Math.floor(Math.random() * pool.length)];
    },
    
    renderDemoQuestion: () => {
        const q = LandingView.demoQuestion;
        if (!q) return '<p>Loading question...</p>';
        
        return `
            <div class="demo-question">
                <p class="demo-question-text">${q.question}</p>
                <div class="demo-options">
                    ${q.options.map((opt, i) => `
                        <button class="demo-option" onclick="LandingView.answerDemo(${i})" data-index="${i}">
                            <span class="demo-option-letter">${String.fromCharCode(65 + i)}</span>
                            <span class="demo-option-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="demo-feedback" id="demo-feedback"></div>
            </div>
        `;
    },
    
    answerDemo: (index) => {
        if (LandingView.demoAnswered) return;
        LandingView.demoAnswered = true;
        
        const q = LandingView.demoQuestion;
        const isCorrect = index === q.answer;
        const options = document.querySelectorAll('.demo-option');
        const feedback = document.getElementById('demo-feedback');
        
        options.forEach((opt, i) => {
            opt.disabled = true;
            if (i === q.answer) {
                opt.classList.add('correct');
            } else if (i === index && !isCorrect) {
                opt.classList.add('wrong');
            }
        });
        
        if (feedback) {
            feedback.innerHTML = `
                <div class="demo-result ${isCorrect ? 'correct' : 'wrong'}">
                    <span class="demo-result-icon">${isCorrect ? '✅' : '❌'}</span>
                    <span class="demo-result-text">${isCorrect ? 'Correct!' : 'Not quite!'}</span>
                </div>
                <p class="demo-explanation">${q.explanation || ''}</p>
                <button class="btn-primary btn-sm" onclick="LandingView.newDemoQuestion()">
                    <i class="fas fa-redo"></i> Try Another
                </button>
            `;
            feedback.classList.add('visible');
        }
    },
    
    newDemoQuestion: () => {
        LandingView.demoQuestion = LandingView.getRandomQuestion();
        LandingView.demoAnswered = false;
        const area = document.getElementById('demo-question-area');
        if (area) {
            area.innerHTML = LandingView.renderDemoQuestion();
        }
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
            <button class="topic-preview-item" onclick="LandingView.showTopicPreview('${topic.id}')">
                <span class="topic-icon">${topic.icon}</span>
                <span class="topic-name">${topic.name}</span>
                <i class="fas fa-chevron-right topic-arrow"></i>
            </button>
        `).join('');
    },
    
    renderGamesPreview: () => {
        const games = [
            { id: 'speed-run', icon: '⚡', name: 'Speed Run', desc: 'Race against time' },
            { id: 'battle-mode', icon: '⚔️', name: 'Battle Mode', desc: 'Challenge AI opponents' },
            { id: 'millionaire', icon: '💰', name: 'Millionaire', desc: 'Win 1M XP' },
            { id: 'boss-battle', icon: '🐉', name: 'Boss Battles', desc: 'Defeat topic bosses' },
            { id: 'memory-match', icon: '🃏', name: 'Memory Match', desc: 'Match terms' },
            { id: 'type-racer', icon: '⌨️', name: 'Type Racer', desc: 'Speed typing' }
        ];
        
        return games.map(game => `
            <button class="game-preview-item" onclick="LandingView.showGamePreview('${game.id}')">
                <span class="game-icon">${game.icon}</span>
                <div class="game-info">
                    <span class="game-name">${game.name}</span>
                    <span class="game-desc">${game.desc}</span>
                </div>
            </button>
        `).join('') + '<p class="games-more">+ 6 more games!</p>';
    },
    
    showFeaturePreview: (feature) => {
        const previews = {
            learn: { title: '📚 Learn', desc: 'Comprehensive revision notes covering all IGCSE Computer Science topics. Each topic has multiple subtopics with clear explanations, examples, and key points.', img: '📖' },
            practice: { title: '🎯 Practice', desc: 'Test your knowledge with 200+ questions. Get instant feedback, track your accuracy, and review explanations for every answer.', img: '✏️' },
            games: { title: '🎮 Games', desc: '12 educational games including Speed Run, Battle Mode, Millionaire, Boss Battles, and more. Learn while having fun!', img: '🕹️' },
            code: { title: '💻 Code Playground', desc: 'Write, run, and test Python code directly in your browser. Practice programming concepts with real code.', img: '⌨️' },
            tools: { title: '🔧 Tools', desc: 'Binary/Hex converters, Logic Gate simulator, ASCII table, Algorithm visualizer, and more helpful tools.', img: '🛠️' },
            papers: { title: '📝 Past Papers', desc: 'Practice with real exam questions from previous years. Includes mark schemes and model answers.', img: '📋' }
        };
        
        const preview = previews[feature];
        if (!preview) return;
        
        LandingView.showModal(`
            <div class="feature-preview-modal">
                <div class="feature-preview-icon">${preview.img}</div>
                <h3>${preview.title}</h3>
                <p>${preview.desc}</p>
                <div class="feature-preview-actions">
                    <button class="btn-primary" onclick="LandingView.tryAsGuest()">
                        <i class="fas fa-play"></i> Try It Now
                    </button>
                    <button class="btn-secondary" onclick="LandingView.closeModal()">Close</button>
                </div>
            </div>
        `);
    },
    
    showTopicPreview: (topicId) => {
        const topics = typeof TOPICS !== 'undefined' ? TOPICS : [];
        const topic = topics.find(t => t.id === topicId) || { name: topicId, icon: '📚' };
        
        LandingView.showModal(`
            <div class="topic-preview-modal">
                <div class="topic-preview-header">
                    <span class="topic-preview-icon">${topic.icon}</span>
                    <h3>${topic.name}</h3>
                </div>
                <p>This topic covers essential concepts for your IGCSE Computer Science exam.</p>
                <ul class="topic-preview-points">
                    <li>Comprehensive revision notes</li>
                    <li>Practice questions with explanations</li>
                    <li>Interactive learning games</li>
                </ul>
                <div class="feature-preview-actions">
                    <button class="btn-primary" onclick="AuthModal.show('signup')">
                        <i class="fas fa-user-plus"></i> Sign Up to Access
                    </button>
                    <button class="btn-secondary" onclick="LandingView.closeModal()">Close</button>
                </div>
            </div>
        `);
    },
    
    showGamePreview: (gameId) => {
        const games = {
            'speed-run': { name: 'Speed Run', icon: '⚡', desc: 'Answer as many questions as you can in 60 seconds! Build combos for bonus points.' },
            'battle-mode': { name: 'Battle Mode', icon: '⚔️', desc: 'Challenge AI opponents in 1v1 battles. Use power-ups to gain the advantage!' },
            'millionaire': { name: 'Millionaire', icon: '💰', desc: 'Answer 15 questions to win 1,000,000 XP. Use lifelines wisely!' },
            'boss-battle': { name: 'Boss Battles', icon: '🐉', desc: 'Face off against topic bosses in epic knowledge showdowns!' },
            'memory-match': { name: 'Memory Match', icon: '🃏', desc: 'Match CS terms with their definitions. Test your memory!' },
            'type-racer': { name: 'Type Racer', icon: '⌨️', desc: 'Improve your typing speed with code snippets and definitions.' }
        };
        
        const game = games[gameId] || { name: gameId, icon: '🎮', desc: 'An educational game to help you learn.' };
        
        LandingView.showModal(`
            <div class="game-preview-modal">
                <div class="game-preview-header">
                    <span class="game-preview-icon">${game.icon}</span>
                    <h3>${game.name}</h3>
                </div>
                <p>${game.desc}</p>
                <div class="feature-preview-actions">
                    <button class="btn-primary" onclick="LandingView.closeModal(); LandingView.tryAsGuest();">
                        <i class="fas fa-play"></i> Play Now
                    </button>
                    <button class="btn-secondary" onclick="LandingView.closeModal()">Close</button>
                </div>
            </div>
        `);
    },
    
    showModal: (content) => {
        // Remove any existing modal
        LandingView.closeModal();
        
        const modal = document.createElement('div');
        modal.className = 'landing-modal-overlay';
        modal.id = 'landing-modal';
        modal.innerHTML = `
            <div class="landing-modal">
                <button class="landing-modal-close" onclick="LandingView.closeModal()">
                    <i class="fas fa-times"></i>
                </button>
                ${content}
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) LandingView.closeModal();
        });
        
        // Close on escape
        document.addEventListener('keydown', LandingView.handleEscape);
        
        // Animate in
        requestAnimationFrame(() => modal.classList.add('visible'));
    },
    
    closeModal: () => {
        const modal = document.getElementById('landing-modal');
        if (modal) {
            modal.classList.remove('visible');
            setTimeout(() => modal.remove(), 200);
        }
        document.removeEventListener('keydown', LandingView.handleEscape);
    },
    
    handleEscape: (e) => {
        if (e.key === 'Escape') LandingView.closeModal();
    },
    
    animateCounters: () => {
        if (LandingView.counterAnimated) return;
        LandingView.counterAnimated = true;
        
        const counters = document.querySelectorAll('[data-target]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            if (isNaN(target)) return;
            
            const duration = 1500;
            const start = 0;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easeOut);
                
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target.toLocaleString() + (target >= 100 ? '+' : '');
                }
            };
            
            requestAnimationFrame(animate);
        });
    },
    
    tryAsGuest: () => {
        if (typeof GuestLimiter !== 'undefined') {
            GuestLimiter.resetUsage();
        }
        sessionStorage.setItem('guest_mode', 'true');
        Router.navigate('home');
    },
    
    init: () => {
        // Animate counters after a short delay
        setTimeout(() => LandingView.animateCounters(), 500);
    },
    
    cleanup: () => {
        LandingView.closeModal();
        LandingView.counterAnimated = false;
        document.removeEventListener('keydown', LandingView.handleEscape);
    }
};
