/**
 * PracticeView.js - Quiz, Flashcard & Past Paper Study Mode
 * With keyboard navigation and touch gesture support
 */

const PracticeView = {
    // Quiz state
    questions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    answers: [],
    selectedTopic: 'all',
    isActive: false,
    hasAnswered: false,
    
    // Flashcard state
    flashcards: [],
    flashcardIndex: 0,
    flippedCards: new Set(),
    knownCards: new Set(),
    reviewCards: new Set(),
    
    // Past paper state
    pastPaperQuestions: [],
    pastPaperIndex: 0,
    showingMarkScheme: false,
    
    mode: 'quiz', // 'quiz', 'flashcards', or 'pastpaper'
    
    // Touch/swipe state
    touchStartX: 0,
    touchStartY: 0,
    touchEndX: 0,
    touchEndY: 0,
    minSwipeDistance: 50,
    
    // Keyboard handler reference for cleanup
    keyboardHandler: null,

    render: () => {
        try {
            const topicOptions = typeof TOPICS !== 'undefined' && Array.isArray(TOPICS) 
                ? TOPICS.map(t => `<option value="${t.id}">${t.icon} ${t.name}</option>`).join('')
                : '';
            
            return `
            <div class="practice-view">
                <div class="practice-tabs">
                    <button class="tab-btn active" data-mode="quiz" onclick="PracticeView.switchMode('quiz')">
                        🎯 Quiz Mode
                    </button>
                    <button class="tab-btn" data-mode="flashcards" onclick="PracticeView.switchMode('flashcards')">
                        🗂️ Flashcards
                    </button>
                    <button class="tab-btn" data-mode="pastpaper" onclick="PracticeView.switchMode('pastpaper')">
                        📄 Past Papers
                    </button>
                </div>
                
                <!-- Quiz Setup -->
                <div class="practice-setup" id="practice-setup">
                    <h2>🎯 Practice Mode</h2>
                    <p>Test your knowledge with quiz questions</p>
                    
                    <div class="setup-options">
                        <div class="option-group">
                            <label>Topic</label>
                            <select id="topic-select" onchange="PracticeView.selectedTopic = this.value">
                                <option value="all">All Topics</option>
                                ${topicOptions}
                            </select>
                        </div>
                        
                        <div class="option-group">
                            <label>Questions</label>
                            <select id="count-select">
                                <option value="5">5 Questions</option>
                                <option value="10" selected>10 Questions</option>
                                <option value="20">20 Questions</option>
                                <option value="30">30 Questions</option>
                            </select>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large" onclick="PracticeView.startQuiz()">
                        Start Quiz 🚀
                    </button>
                </div>
                
                <!-- Flashcard Setup -->
                <div class="flashcard-setup hidden" id="flashcard-setup">
                    <h2>🗂️ Flashcard Study</h2>
                    <p>Learn key concepts with interactive flashcards</p>
                    
                    <div class="setup-options">
                        <div class="option-group">
                            <label>Topic</label>
                            <select id="flashcard-topic-select" onchange="PracticeView.selectedTopic = this.value">
                                <option value="all">All Topics</option>
                                ${topicOptions}
                            </select>
                        </div>
                    </div>
                    
                    <div class="flashcard-stats">
                        <div class="stat-box">
                            <span class="stat-number" id="total-flashcards">35</span>
                            <span class="stat-label">Total Cards</span>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large" onclick="PracticeView.startFlashcards()">
                        Start Studying 📚
                    </button>
                </div>
                
                <!-- Past Paper Setup -->
                <div class="pastpaper-setup hidden" id="pastpaper-setup">
                    <h2>📄 Past Paper Questions</h2>
                    <p>Practice exam-style extended response questions</p>
                    
                    <div class="setup-options">
                        <div class="option-group">
                            <label>Topic</label>
                            <select id="pastpaper-topic-select" onchange="PracticeView.selectedTopic = this.value">
                                <option value="all">All Topics</option>
                                ${topicOptions}
                            </select>
                        </div>
                    </div>
                    
                    <div class="pastpaper-info">
                        <div class="info-card">
                            <span class="info-icon">✍️</span>
                            <div class="info-text">
                                <strong>Write your answer</strong>
                                <span>Practice writing full responses just like in the exam</span>
                            </div>
                        </div>
                        <div class="info-card">
                            <span class="info-icon">📋</span>
                            <div class="info-text">
                                <strong>Check the mark scheme</strong>
                                <span>Compare your answer against examiner's points</span>
                            </div>
                        </div>
                        <div class="info-card">
                            <span class="info-icon">💯</span>
                            <div class="info-text">
                                <strong>Self-assess</strong>
                                <span>Learn what examiners are looking for</span>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large" onclick="PracticeView.startPastPaper()">
                        Start Practice 📝
                    </button>
                </div>
                
                <!-- Quiz Container -->
                <div class="quiz-container hidden" id="quiz-container">
                    <div class="quiz-header">
                        <div class="quiz-progress">
                            <span id="quiz-progress-text">1 / 10</span>
                            <div class="progress-bar">
                                <div class="progress-fill" id="quiz-progress-bar" style="width: 10%"></div>
                            </div>
                        </div>
                        <div class="quiz-stats">
                            <span class="stat">🔥 <span id="streak-count">0</span></span>
                            <span class="stat">✅ <span id="correct-count">0</span></span>
                        </div>
                    </div>
                    
                    <div class="question-card" id="question-card">
                        <!-- Question content rendered here -->
                    </div>
                </div>
                
                <!-- Flashcard Container -->
                <div class="flashcard-container hidden" id="flashcard-container">
                    <div class="flashcard-header">
                        <div class="flashcard-progress">
                            <span id="flashcard-progress-text">1 / 35</span>
                            <div class="progress-bar">
                                <div class="progress-fill" id="flashcard-progress-bar" style="width: 3%"></div>
                            </div>
                        </div>
                        <div class="flashcard-stats">
                            <span class="stat known">✅ <span id="known-count">0</span></span>
                            <span class="stat review">🔄 <span id="review-count">0</span></span>
                        </div>
                    </div>
                    
                    <div class="flashcard-wrapper" id="flashcard-wrapper">
                        <div class="flashcard" id="flashcard" onclick="PracticeView.flipCard()" tabindex="0" role="button" aria-label="Flashcard - click or press Space to flip">
                            <div class="flashcard-inner">
                                <div class="flashcard-front">
                                    <span class="flip-hint">Click to reveal answer</span>
                                    <div class="flashcard-topic" id="flashcard-topic"></div>
                                    <div class="flashcard-question" id="flashcard-question"></div>
                                </div>
                                <div class="flashcard-back">
                                    <span class="flip-hint">Click to see question</span>
                                    <div class="flashcard-answer" id="flashcard-answer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Swipe indicator for mobile -->
                    <div class="swipe-indicator">
                        👈 Swipe left for Review • Swipe right for Got It 👉
                    </div>
                    
                    <!-- Keyboard hints for desktop -->
                    <div class="flashcard-keyboard-hint">
                        <kbd>Space</kbd> or <kbd>F</kbd> to flip • <kbd>←</kbd><kbd>→</kbd> to navigate • <kbd>G</kbd> Got it • <kbd>R</kbd> Review
                    </div>
                    
                    <div class="flashcard-actions">
                        <button class="btn btn-review" onclick="PracticeView.markReview()" title="Need more practice">
                            🔄 Review Again
                        </button>
                        <button class="btn btn-known" onclick="PracticeView.markKnown()" title="Got it!">
                            ✅ Got It!
                        </button>
                    </div>
                    
                    <div class="flashcard-nav">
                        <button class="btn btn-secondary" onclick="PracticeView.prevCard()" id="prev-card-btn">
                            ← Previous
                        </button>
                        <button class="btn btn-secondary" onclick="PracticeView.nextCard()" id="next-card-btn">
                            Next →
                        </button>
                    </div>
                </div>
                
                <!-- Past Paper Container -->
                <div class="pastpaper-container hidden" id="pastpaper-container">
                    <div class="pastpaper-header">
                        <div class="pastpaper-progress">
                            <span id="pastpaper-progress-text">Question 1 / 12</span>
                        </div>
                        <button class="btn btn-secondary btn-small" onclick="PracticeView.exitPastPaper()">
                            Exit
                        </button>
                    </div>
                    
                    <div class="pastpaper-question" id="pastpaper-question">
                        <!-- Question content rendered here -->
                    </div>
                </div>
            </div>
        `;
        } catch (error) {
            console.error('PracticeView render error:', error);
            return `
                <div class="practice-view">
                    <div class="error-state">
                        <span class="error-icon">⚠️</span>
                        <h2>Unable to load Practice Mode</h2>
                        <p>Please try refreshing the page.</p>
                        <button class="btn btn-primary" onclick="location.reload()">Refresh</button>
                    </div>
                </div>
            `;
        }
    },

    init: () => {
        console.log('🎯 Practice view initialized');
        PracticeView.isActive = false;
        PracticeView.mode = 'quiz';
        PracticeView.hasAnswered = false;
        
        // Set up keyboard navigation
        PracticeView.setupKeyboardNavigation();
        
        // Update flashcard count based on topic
        setTimeout(() => {
            try {
                const totalEl = document.getElementById('total-flashcards');
                if (totalEl) {
                    const count = typeof FLASHCARDS !== 'undefined' && Array.isArray(FLASHCARDS) ? FLASHCARDS.length : 0;
                    totalEl.textContent = count;
                }
            } catch (e) {
                console.error('Error updating flashcard count:', e);
            }
        }, 100);
    },
    
    // Clean up when leaving the view
    cleanup: () => {
        // Remove keyboard listener
        PracticeView.removeKeyboardNavigation();
        // Remove swipe gesture listeners
        PracticeView.removeSwipeGestures();
        // Reset state
        PracticeView.isActive = false;
        PracticeView.hasAnswered = false;
        PracticeView.questions = [];
        PracticeView.flashcards = [];
        console.log('🎯 Practice view cleanup');
    },
    
    // ==================== KEYBOARD NAVIGATION ====================
    setupKeyboardNavigation: () => {
        // Remove existing handler if any
        PracticeView.removeKeyboardNavigation();
        
        PracticeView.keyboardHandler = (e) => {
            // Don't handle if typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                return;
            }
            
            // Quiz mode keyboard shortcuts
            if (PracticeView.mode === 'quiz' && PracticeView.isActive) {
                PracticeView.handleQuizKeyboard(e);
            }
            
            // Flashcard mode keyboard shortcuts
            if (PracticeView.mode === 'flashcards') {
                const flashcardContainer = document.getElementById('flashcard-container');
                if (flashcardContainer && !flashcardContainer.classList.contains('hidden')) {
                    PracticeView.handleFlashcardKeyboard(e);
                }
            }
        };
        
        document.addEventListener('keydown', PracticeView.keyboardHandler);
    },
    
    removeKeyboardNavigation: () => {
        if (PracticeView.keyboardHandler) {
            document.removeEventListener('keydown', PracticeView.keyboardHandler);
            PracticeView.keyboardHandler = null;
        }
    },
    
    handleQuizKeyboard: (e) => {
        const key = e.key.toLowerCase();
        
        // If already answered, Enter continues to next
        if (PracticeView.hasAnswered) {
            if (key === 'enter') {
                e.preventDefault();
                PracticeView.nextQuestion();
                return;
            }
            return;
        }
        
        // Number keys 1-4 or A-D to select answers
        let answerIndex = -1;
        
        if (key >= '1' && key <= '4') {
            answerIndex = parseInt(key) - 1;
        } else if (key >= 'a' && key <= 'd') {
            answerIndex = key.charCodeAt(0) - 97; // a=0, b=1, c=2, d=3
        }
        
        if (answerIndex >= 0 && answerIndex < 4) {
            e.preventDefault();
            const optionBtns = document.querySelectorAll('.option-btn:not(:disabled)');
            if (optionBtns[answerIndex]) {
                optionBtns[answerIndex].click();
            }
        }
    },
    
    handleFlashcardKeyboard: (e) => {
        const key = e.key.toLowerCase();
        
        switch (key) {
            case ' ':
            case 'f':
                e.preventDefault();
                PracticeView.flipCard();
                break;
            case 'arrowleft':
                e.preventDefault();
                PracticeView.prevCard();
                break;
            case 'arrowright':
                e.preventDefault();
                PracticeView.nextCard();
                break;
            case 'g':
                e.preventDefault();
                PracticeView.markKnown();
                break;
            case 'r':
                e.preventDefault();
                PracticeView.markReview();
                break;
            default:
                break;
        }
    },
    
    // ==================== SWIPE GESTURES ====================
    setupSwipeGestures: () => {
        const flashcardWrapper = document.getElementById('flashcard-wrapper');
        if (!flashcardWrapper) return;
        
        flashcardWrapper.addEventListener('touchstart', PracticeView.handleTouchStart, { passive: true });
        flashcardWrapper.addEventListener('touchmove', PracticeView.handleTouchMove, { passive: true });
        flashcardWrapper.addEventListener('touchend', PracticeView.handleTouchEnd, { passive: true });
    },
    
    removeSwipeGestures: () => {
        const flashcardWrapper = document.getElementById('flashcard-wrapper');
        if (!flashcardWrapper) return;
        
        flashcardWrapper.removeEventListener('touchstart', PracticeView.handleTouchStart);
        flashcardWrapper.removeEventListener('touchmove', PracticeView.handleTouchMove);
        flashcardWrapper.removeEventListener('touchend', PracticeView.handleTouchEnd);
    },
    
    handleTouchStart: (e) => {
        PracticeView.touchStartX = e.changedTouches[0].screenX;
        PracticeView.touchStartY = e.changedTouches[0].screenY;
    },
    
    handleTouchMove: (e) => {
        if (!PracticeView.touchStartX) return;
        
        const currentX = e.changedTouches[0].screenX;
        const diffX = currentX - PracticeView.touchStartX;
        const wrapper = document.getElementById('flashcard-wrapper');
        
        if (wrapper) {
            // Add visual feedback during swipe - apply to wrapper to not conflict with flip
            if (Math.abs(diffX) > 20) {
                if (diffX > 0) {
                    wrapper.classList.add('swiping-right');
                    wrapper.classList.remove('swiping-left');
                } else {
                    wrapper.classList.add('swiping-left');
                    wrapper.classList.remove('swiping-right');
                }
            } else {
                wrapper.classList.remove('swiping-left', 'swiping-right');
            }
        }
    },
    
    handleTouchEnd: (e) => {
        PracticeView.touchEndX = e.changedTouches[0].screenX;
        PracticeView.touchEndY = e.changedTouches[0].screenY;
        
        const wrapper = document.getElementById('flashcard-wrapper');
        if (wrapper) {
            wrapper.classList.remove('swiping-left', 'swiping-right');
        }
        
        PracticeView.handleSwipeGesture();
    },
    
    handleSwipeGesture: () => {
        const diffX = PracticeView.touchEndX - PracticeView.touchStartX;
        const diffY = PracticeView.touchEndY - PracticeView.touchStartY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > PracticeView.minSwipeDistance) {
            const wrapper = document.getElementById('flashcard-wrapper');
            
            if (diffX > 0) {
                // Swipe right - Mark as known
                if (wrapper) {
                    wrapper.classList.add('swipe-complete-right');
                    setTimeout(() => {
                        wrapper.classList.remove('swipe-complete-right');
                        PracticeView.markKnown();
                    }, 200);
                } else {
                    PracticeView.markKnown();
                }
            } else {
                // Swipe left - Mark for review
                if (wrapper) {
                    wrapper.classList.add('swipe-complete-left');
                    setTimeout(() => {
                        wrapper.classList.remove('swipe-complete-left');
                        PracticeView.markReview();
                    }, 200);
                } else {
                    PracticeView.markReview();
                }
            }
        }
        
        // Reset touch coordinates
        PracticeView.touchStartX = 0;
        PracticeView.touchStartY = 0;
        PracticeView.touchEndX = 0;
        PracticeView.touchEndY = 0;
    },
    
    // ==================== SCREEN READER ANNOUNCEMENTS ====================
    announce: (message) => {
        const announcer = document.getElementById('sr-announcer');
        if (announcer) {
            announcer.textContent = '';
            // Use setTimeout to ensure the change is detected by screen readers
            setTimeout(() => {
                announcer.textContent = message;
            }, 100);
        }
    },

    switchMode: (mode) => {
        PracticeView.mode = mode;
        PracticeView.hasAnswered = false;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        // Hide all setups and containers
        const elementsToHide = [
            'practice-setup', 'flashcard-setup', 'pastpaper-setup',
            'quiz-container', 'flashcard-container', 'pastpaper-container'
        ];
        elementsToHide.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        
        // Remove swipe gestures when not in flashcard mode
        PracticeView.removeSwipeGestures();
        
        // Show appropriate setup
        if (mode === 'quiz') {
            const el = document.getElementById('practice-setup');
            if (el) el.classList.remove('hidden');
        } else if (mode === 'flashcards') {
            const el = document.getElementById('flashcard-setup');
            if (el) el.classList.remove('hidden');
            try {
                const count = typeof getFlashcardsByTopic === 'function' 
                    ? getFlashcardsByTopic(PracticeView.selectedTopic).length 
                    : 0;
                const totalEl = document.getElementById('total-flashcards');
                if (totalEl) totalEl.textContent = count;
            } catch (e) {
                console.warn('Could not load flashcard count:', e);
            }
        } else if (mode === 'pastpaper') {
            const el = document.getElementById('pastpaper-setup');
            if (el) el.classList.remove('hidden');
        }
    },

    // ==================== QUIZ MODE ====================
    startQuiz: () => {
        try {
            if (typeof getRandomQuestions !== 'function') {
                Toast.show('Quiz system not available', 'error');
                return;
            }
            
            const count = parseInt(document.getElementById('count-select')?.value) || 10;
            PracticeView.questions = getRandomQuestions(count, PracticeView.selectedTopic);
            
            if (!PracticeView.questions || PracticeView.questions.length === 0) {
                Toast.show('No questions available for this topic', 'warning');
                return;
            }
            
            PracticeView.currentIndex = 0;
            PracticeView.score = 0;
            PracticeView.streak = 0;
            PracticeView.answers = [];
            PracticeView.isActive = true;
            PracticeView.hasAnswered = false;

            document.getElementById('practice-setup')?.classList.add('hidden');
            document.getElementById('quiz-container')?.classList.remove('hidden');

            PracticeView.showQuestion();
            PracticeView.announce(`Quiz started. Question 1 of ${PracticeView.questions.length}.`);
        } catch (error) {
            console.error('Error starting quiz:', error);
            Toast.show('Failed to start quiz. Please try again.', 'error');
        }
    },

    showQuestion: () => {
        try {
            const q = PracticeView.questions[PracticeView.currentIndex];
            if (!q) {
                console.error('Question not found at index', PracticeView.currentIndex);
                return;
            }
            
            const total = PracticeView.questions.length;
            const progress = ((PracticeView.currentIndex + 1) / total) * 100;
            PracticeView.hasAnswered = false;

            const progressText = document.getElementById('quiz-progress-text');
            const progressBar = document.getElementById('quiz-progress-bar');
            if (progressText) progressText.textContent = `${PracticeView.currentIndex + 1} / ${total}`;
            if (progressBar) progressBar.style.width = `${progress}%`;

            const topic = typeof getTopicById === 'function' ? getTopicById(q.topic) : null;
            const options = Array.isArray(q.options) ? q.options : [];
            const shuffledOptions = options.map((opt, i) => ({ text: opt, originalIndex: i }));
            if (typeof Helpers !== 'undefined' && Helpers.shuffle) {
                Helpers.shuffle(shuffledOptions);
            }

            const questionCard = document.getElementById('question-card');
            if (questionCard) {
                questionCard.innerHTML = `
                    <div class="question-topic" style="color: ${topic?.color || '#888'}">
                        ${topic?.icon || '📝'} ${topic?.name || 'General'}
                    </div>
                    <h3 class="question-text">${q.question || 'Question not available'}</h3>
                    <div class="options-list" role="group" aria-label="Answer options">
                        ${shuffledOptions.map((opt, i) => `
                            <button class="option-btn" onclick="PracticeView.selectAnswer(${opt.originalIndex}, this)" aria-label="Option ${String.fromCharCode(65 + i)}: ${opt.text}">
                                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                                <span class="option-text">${opt.text}</span>
                            </button>
                        `).join('')}
                    </div>
                    <div class="quiz-keyboard-hint">
                        Press <kbd>1</kbd>-<kbd>4</kbd> or <kbd>A</kbd>-<kbd>D</kbd> to select • <kbd>Enter</kbd> to continue
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error showing question:', error);
            Toast.show('Error displaying question', 'error');
        }
    },

    selectAnswer: (answerIndex, buttonEl) => {
        if (PracticeView.hasAnswered) return;
        
        // Check guest limits before allowing answer
        if (typeof GuestLimiter !== 'undefined') {
            const canAnswer = GuestLimiter.canAnswerQuestion();
            if (!canAnswer.allowed) {
                GuestLimiter.showSignupPrompt(canAnswer.reason, 'practice');
                return;
            }
            // Record this question for guest tracking
            GuestLimiter.recordQuestion();
        }
        
        PracticeView.hasAnswered = true;
        
        const q = PracticeView.questions[PracticeView.currentIndex];
        const isCorrect = answerIndex === q.answer;

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });

        buttonEl.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        const correctBtn = document.querySelectorAll('.option-btn')[
            Array.from(document.querySelectorAll('.option-btn')).findIndex(btn => 
                btn.querySelector('.option-text').textContent === q.options[q.answer]
            )
        ];
        if (correctBtn && !isCorrect) {
            correctBtn.classList.add('correct');
        }

        if (isCorrect) {
            PracticeView.score++;
            PracticeView.streak++;
            document.getElementById('correct-count').textContent = PracticeView.score;
            document.getElementById('streak-count').textContent = PracticeView.streak;
            
            // Announce correct answer
            PracticeView.announce(`Correct! Your score is now ${PracticeView.score}.`);
            
            if (PracticeView.streak >= 5) AppState.unlockAchievement('streak_5');
            if (PracticeView.streak >= 10) AppState.unlockAchievement('streak_10');
        } else {
            PracticeView.streak = 0;
            document.getElementById('streak-count').textContent = 0;
            
            // Announce incorrect with correct answer
            PracticeView.announce(`Incorrect. The correct answer was ${q.options[q.answer]}.`);
        }

        PracticeView.answers.push({ question: q, answer: answerIndex, correct: isCorrect });
        
        // Track with SRS system
        if (typeof SRSSystem !== 'undefined') {
            SRSSystem.recordAnswer(q.id, isCorrect);
        }
        
        // Track with Streak system
        if (typeof StreakSystem !== 'undefined') {
            StreakSystem.recordActivity('question');
            if (isCorrect) {
                StreakSystem.recordActivity('correct');
            }
        }

        const card = document.getElementById('question-card');
        card.innerHTML += `
            <div class="explanation ${isCorrect ? 'correct' : 'incorrect'}" role="alert">
                <p><strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong></p>
                <p>${q.explanation}</p>
            </div>
            <button class="btn btn-primary" onclick="PracticeView.nextQuestion()">
                ${PracticeView.currentIndex < PracticeView.questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
            </button>
        `;
    },

    nextQuestion: () => {
        PracticeView.currentIndex++;
        PracticeView.hasAnswered = false;
        
        if (PracticeView.currentIndex >= PracticeView.questions.length) {
            PracticeView.showResults();
        } else {
            PracticeView.showQuestion();
            PracticeView.announce(`Question ${PracticeView.currentIndex + 1} of ${PracticeView.questions.length}.`);
        }
    },

    showResults: () => {
        const total = PracticeView.questions.length;
        const percentage = Math.round((PracticeView.score / total) * 100);
        const xpEarned = PracticeView.score * 10 + (percentage === 100 ? 50 : 0);
        PracticeView.isActive = false;

        AppState.addXP(xpEarned);
        
        const user = AppState.getState('user');
        AppState.setState('user.totalCorrect', user.totalCorrect + PracticeView.score);
        AppState.setState('user.totalAnswered', user.totalAnswered + total);

        AppState.unlockAchievement('first_quiz');
        if (percentage === 100) AppState.unlockAchievement('perfect');
        if (user.totalCorrect + PracticeView.score >= 100) AppState.unlockAchievement('century');

        const grade = percentage >= 90 ? 'A*' : percentage >= 80 ? 'A' : 
                      percentage >= 70 ? 'B' : percentage >= 60 ? 'C' :
                      percentage >= 50 ? 'D' : percentage >= 40 ? 'E' : 'U';

        // Announce results
        PracticeView.announce(`Quiz complete! You scored ${PracticeView.score} out of ${total}, ${percentage} percent. Grade ${grade}. You earned ${xpEarned} XP.`);

        document.getElementById('quiz-container').innerHTML = `
            <div class="results-card" role="region" aria-label="Quiz Results">
                <h2>🎉 Quiz Complete!</h2>
                <div class="result-grade">${grade}</div>
                <div class="result-score">${PracticeView.score} / ${total}</div>
                <div class="result-percentage">${percentage}%</div>
                <div class="result-xp">+${xpEarned} XP earned!</div>
                
                <div class="results-breakdown">
                    <h3>Question Review</h3>
                    ${PracticeView.answers.map((a, i) => `
                        <div class="result-item ${a.correct ? 'correct' : 'incorrect'}">
                            <span class="result-icon">${a.correct ? '✅' : '❌'}</span>
                            <span class="result-question">Q${i + 1}: ${a.question.question.substring(0, 50)}...</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="result-actions">
                    <button class="btn btn-secondary" onclick="Router.navigate('home')">Home</button>
                    <button class="btn btn-primary" onclick="PracticeView.resetQuiz()">Try Again</button>
                </div>
            </div>
        `;
    },

    resetQuiz: () => {
        PracticeView.isActive = false;
        PracticeView.hasAnswered = false;
        
        const containerEl = document.getElementById('quiz-container');
        const setupEl = document.getElementById('practice-setup');
        
        if (containerEl) {
            containerEl.classList.add('hidden');
            containerEl.innerHTML = `
                <div class="quiz-header">
                    <div class="quiz-progress">
                        <span id="quiz-progress-text">1 / 10</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="quiz-progress-bar" style="width: 10%"></div>
                        </div>
                    </div>
                    <div class="quiz-stats">
                        <span class="stat">🔥 <span id="streak-count">0</span></span>
                        <span class="stat">✅ <span id="correct-count">0</span></span>
                    </div>
                </div>
                <div class="question-card" id="question-card"></div>
            `;
        }
        if (setupEl) setupEl.classList.remove('hidden');
    },

    // ==================== FLASHCARD MODE ====================
    startFlashcards: () => {
        try {
            if (typeof getFlashcardsByTopic !== 'function') {
                Toast.show('Flashcard system not available', 'error');
                return;
            }
            
            PracticeView.flashcards = getFlashcardsByTopic(PracticeView.selectedTopic);
            
            if (!PracticeView.flashcards || PracticeView.flashcards.length === 0) {
                Toast.show('No flashcards available for this topic', 'warning');
                return;
            }
            
            if (typeof Helpers !== 'undefined' && Helpers.shuffle) {
                Helpers.shuffle(PracticeView.flashcards);
            }
            PracticeView.flashcardIndex = 0;
            PracticeView.flippedCards = new Set();
            PracticeView.knownCards = new Set();
            PracticeView.reviewCards = new Set();

            const setupEl = document.getElementById('flashcard-setup');
            const containerEl = document.getElementById('flashcard-container');
            if (setupEl) setupEl.classList.add('hidden');
            if (containerEl) containerEl.classList.remove('hidden');

            // Set up swipe gestures for flashcards
            PracticeView.setupSwipeGestures();

            PracticeView.showFlashcard();
            PracticeView.announce(`Flashcard study started. Card 1 of ${PracticeView.flashcards.length}.`);
        } catch (error) {
            console.error('Error starting flashcards:', error);
            Toast.show('Failed to start flashcards. Please try again.', 'error');
        }
    },

    showFlashcard: () => {
        const card = PracticeView.flashcards[PracticeView.flashcardIndex];
        if (!card) {
            console.error('Flashcard not found at index', PracticeView.flashcardIndex);
            return;
        }
        
        const total = PracticeView.flashcards.length;
        const progress = ((PracticeView.flashcardIndex + 1) / total) * 100;

        const progressText = document.getElementById('flashcard-progress-text');
        const progressBar = document.getElementById('flashcard-progress-bar');
        if (progressText) progressText.textContent = `${PracticeView.flashcardIndex + 1} / ${total}`;
        if (progressBar) progressBar.style.width = `${progress}%`;

        const topic = typeof getTopicById === 'function' ? getTopicById(card.topic) : null;
        const topicEl = document.getElementById('flashcard-topic');
        const questionEl = document.getElementById('flashcard-question');
        const answerEl = document.getElementById('flashcard-answer');
        
        if (topicEl) {
            topicEl.innerHTML = `
                <span style="color: ${topic?.color || '#888'}">${topic?.icon || '📝'} ${topic?.name || 'General'}</span>
            `;
        }
        if (questionEl) questionEl.textContent = card.front || '';
        if (answerEl) answerEl.textContent = card.back || '';

        const flashcardEl = document.getElementById('flashcard');
        if (flashcardEl) {
            flashcardEl.classList.remove('flipped');
            flashcardEl.setAttribute('aria-label', `Flashcard ${PracticeView.flashcardIndex + 1} of ${total}. Question: ${card.front}. Click or press Space to reveal answer.`);
        }

        const prevBtn = document.getElementById('prev-card-btn');
        const nextBtn = document.getElementById('next-card-btn');
        if (prevBtn) prevBtn.disabled = PracticeView.flashcardIndex === 0;
        if (nextBtn) {
            nextBtn.textContent = PracticeView.flashcardIndex === total - 1 ? 'Finish →' : 'Next →';
        }

        const knownCount = document.getElementById('known-count');
        const reviewCount = document.getElementById('review-count');
        if (knownCount) knownCount.textContent = PracticeView.knownCards.size;
        if (reviewCount) reviewCount.textContent = PracticeView.reviewCards.size;
    },

    flipCard: () => {
        const flashcard = document.getElementById('flashcard');
        if (!flashcard) return;
        
        const isFlipped = flashcard.classList.toggle('flipped');
        PracticeView.flippedCards.add(PracticeView.flashcardIndex);
        
        const card = PracticeView.flashcards[PracticeView.flashcardIndex];
        if (!card) return;
        
        if (isFlipped) {
            flashcard.setAttribute('aria-label', `Answer: ${card.back}. Click or press Space to see question again.`);
            PracticeView.announce(`Answer: ${card.back}`);
        } else {
            flashcard.setAttribute('aria-label', `Question: ${card.front}. Click or press Space to reveal answer.`);
        }
    },

    markKnown: () => {
        const card = PracticeView.flashcards[PracticeView.flashcardIndex];
        
        PracticeView.knownCards.add(PracticeView.flashcardIndex);
        PracticeView.reviewCards.delete(PracticeView.flashcardIndex);
        
        // Track with SRS system for spaced repetition
        if (typeof SRSSystem !== 'undefined' && card && card.id) {
            SRSSystem.recordAnswer(card.id, true); // quality 4 = correct
        }
        
        // Track with Streak system
        if (typeof StreakSystem !== 'undefined') {
            StreakSystem.recordActivity('flashcard');
        }
        
        const knownCount = document.getElementById('known-count');
        const reviewCount = document.getElementById('review-count');
        if (knownCount) knownCount.textContent = PracticeView.knownCards.size;
        if (reviewCount) reviewCount.textContent = PracticeView.reviewCards.size;
        
        if (typeof AppState !== 'undefined' && AppState.addXP) {
            AppState.addXP(5);
        }
        if (typeof Toast !== 'undefined') {
            Toast.show('✅ Great! Card marked as known (+5 XP)', 'success');
        }
        PracticeView.announce('Card marked as known. Plus 5 XP.');
        
        setTimeout(() => PracticeView.nextCard(), 500);
    },

    markReview: () => {
        const card = PracticeView.flashcards[PracticeView.flashcardIndex];
        
        PracticeView.reviewCards.add(PracticeView.flashcardIndex);
        PracticeView.knownCards.delete(PracticeView.flashcardIndex);
        
        // Track with SRS system for spaced repetition - mark as needing review
        if (typeof SRSSystem !== 'undefined' && card && card.id) {
            SRSSystem.recordAnswer(card.id, false); // quality 1 = incorrect/needs review
        }
        
        const knownCount = document.getElementById('known-count');
        const reviewCount = document.getElementById('review-count');
        if (knownCount) knownCount.textContent = PracticeView.knownCards.size;
        if (reviewCount) reviewCount.textContent = PracticeView.reviewCards.size;
        
        if (typeof Toast !== 'undefined') {
            Toast.show('🔄 Card marked for review', 'info');
        }
        PracticeView.announce('Card marked for review.');
        
        setTimeout(() => PracticeView.nextCard(), 500);
    },

    prevCard: () => {
        if (PracticeView.flashcardIndex > 0) {
            PracticeView.flashcardIndex--;
            PracticeView.showFlashcard();
            PracticeView.announce(`Card ${PracticeView.flashcardIndex + 1} of ${PracticeView.flashcards.length}.`);
        }
    },

    nextCard: () => {
        if (PracticeView.flashcardIndex < PracticeView.flashcards.length - 1) {
            PracticeView.flashcardIndex++;
            PracticeView.showFlashcard();
            PracticeView.announce(`Card ${PracticeView.flashcardIndex + 1} of ${PracticeView.flashcards.length}.`);
        } else {
            PracticeView.showFlashcardResults();
        }
    },

    showFlashcardResults: () => {
        const total = PracticeView.flashcards.length;
        const knownCount = PracticeView.knownCards.size;
        const reviewCount = PracticeView.reviewCards.size;
        const unseenCount = total - knownCount - reviewCount;
        const percentage = total > 0 ? Math.round((knownCount / total) * 100) : 0;
        const xpEarned = knownCount * 5;

        if (typeof AppState !== 'undefined' && AppState.addXP) {
            AppState.addXP(20);
        }
        
        // Remove swipe gestures
        PracticeView.removeSwipeGestures();
        
        // Announce results
        PracticeView.announce(`Study session complete! ${knownCount} cards known, ${reviewCount} need review. ${percentage} percent mastery. Plus ${xpEarned + 20} XP.`);

        if (percentage === 100 && typeof AppState !== 'undefined' && AppState.unlockAchievement) {
            AppState.unlockAchievement('flashcard_master');
        }

        const containerEl = document.getElementById('flashcard-container');
        if (containerEl) {
            containerEl.innerHTML = `
                <div class="results-card" role="region" aria-label="Flashcard Study Results">
                    <h2>📚 Study Session Complete!</h2>
                    
                    <div class="flashcard-results">
                        <div class="result-stat known">
                            <span class="result-number">${knownCount}</span>
                            <span class="result-label">✅ Known</span>
                        </div>
                        <div class="result-stat review">
                            <span class="result-number">${reviewCount}</span>
                            <span class="result-label">🔄 Need Review</span>
                        </div>
                        <div class="result-stat unseen">
                            <span class="result-number">${unseenCount}</span>
                            <span class="result-label">⏭️ Skipped</span>
                        </div>
                    </div>
                    
                    <div class="result-percentage">${percentage}% Mastery</div>
                    <div class="result-xp">+${xpEarned + 20} XP earned!</div>
                    
                    ${reviewCount > 0 ? `
                        <div class="review-suggestion">
                            <p>💡 You have ${reviewCount} card${reviewCount !== 1 ? 's' : ''} to review. Practice makes perfect!</p>
                            <button class="btn btn-secondary" onclick="PracticeView.studyReviewCards()">
                                Study Review Cards
                            </button>
                        </div>
                    ` : knownCount === total ? `
                        <div class="review-suggestion success">
                            <p>🎉 Perfect! You knew all ${total} cards!</p>
                        </div>
                    ` : ''}
                    
                    <div class="result-actions">
                        <button class="btn btn-secondary" onclick="Router.navigate('home')">Home</button>
                        <button class="btn btn-primary" onclick="PracticeView.resetFlashcards()">Study Again</button>
                    </div>
                </div>
            `;
        }
    },

    studyReviewCards: () => {
        const reviewIndices = Array.from(PracticeView.reviewCards);
        if (reviewIndices.length === 0) {
            if (typeof Toast !== 'undefined') {
                Toast.show('No cards marked for review. Great job!', 'info');
            }
            return;
        }

        // Create new array from review cards only
        const originalFlashcards = PracticeView.flashcards;
        PracticeView.flashcards = reviewIndices
            .map(i => originalFlashcards[i])
            .filter(card => card != null);
        
        if (PracticeView.flashcards.length === 0) {
            if (typeof Toast !== 'undefined') {
                Toast.show('No valid review cards found', 'warning');
            }
            return;
        }
        
        PracticeView.flashcardIndex = 0;
        PracticeView.knownCards.clear();
        PracticeView.reviewCards.clear();

        const containerEl = document.getElementById('flashcard-container');
        if (containerEl) {
            containerEl.innerHTML = `
                <div class="flashcard-header">
                    <div class="flashcard-progress">
                        <span id="flashcard-progress-text">1 / ${PracticeView.flashcards.length}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="flashcard-progress-bar" style="width: 3%"></div>
                        </div>
                    </div>
                    <div class="flashcard-stats">
                        <span class="stat known">✅ <span id="known-count">0</span></span>
                        <span class="stat review">🔄 <span id="review-count">0</span></span>
                    </div>
                </div>
                
                <div class="flashcard-wrapper" id="flashcard-wrapper">
                    <div class="flashcard" id="flashcard" onclick="PracticeView.flipCard()" tabindex="0" role="button" aria-label="Flashcard - click or press Space to flip">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span class="flip-hint">Click to reveal answer</span>
                                <div class="flashcard-topic" id="flashcard-topic"></div>
                                <div class="flashcard-question" id="flashcard-question"></div>
                            </div>
                            <div class="flashcard-back">
                                <span class="flip-hint">Click to see question</span>
                                <div class="flashcard-answer" id="flashcard-answer"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="swipe-indicator">
                    👈 Swipe left for Review • Swipe right for Got It 👉
                </div>
                
                <div class="flashcard-keyboard-hint">
                    <kbd>Space</kbd> or <kbd>F</kbd> to flip • <kbd>←</kbd><kbd>→</kbd> to navigate • <kbd>G</kbd> Got it • <kbd>R</kbd> Review
                </div>
                
                <div class="flashcard-actions">
                    <button class="btn btn-review" onclick="PracticeView.markReview()">🔄 Review Again</button>
                    <button class="btn btn-known" onclick="PracticeView.markKnown()">✅ Got It!</button>
                </div>
                
                <div class="flashcard-nav">
                    <button class="btn btn-secondary" onclick="PracticeView.prevCard()" id="prev-card-btn">← Previous</button>
                    <button class="btn btn-secondary" onclick="PracticeView.nextCard()" id="next-card-btn">Next →</button>
                </div>
            `;
        }

        // Re-setup swipe gestures
        PracticeView.setupSwipeGestures();
        PracticeView.showFlashcard();
        PracticeView.announce(`Reviewing ${PracticeView.flashcards.length} card${PracticeView.flashcards.length !== 1 ? 's' : ''}.`);
    },

    resetFlashcards: () => {
        PracticeView.removeSwipeGestures();
        const containerEl = document.getElementById('flashcard-container');
        const setupEl = document.getElementById('flashcard-setup');
        
        if (containerEl) {
            containerEl.classList.add('hidden');
            containerEl.innerHTML = `
                <div class="flashcard-header">
                    <div class="flashcard-progress">
                        <span id="flashcard-progress-text">1 / 35</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="flashcard-progress-bar" style="width: 3%"></div>
                        </div>
                    </div>
                    <div class="flashcard-stats">
                        <span class="stat known">✅ <span id="known-count">0</span></span>
                        <span class="stat review">🔄 <span id="review-count">0</span></span>
                    </div>
                </div>
                
                <div class="flashcard-wrapper" id="flashcard-wrapper">
                    <div class="flashcard" id="flashcard" onclick="PracticeView.flipCard()" tabindex="0" role="button" aria-label="Flashcard - click or press Space to flip">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span class="flip-hint">Click to reveal answer</span>
                                <div class="flashcard-topic" id="flashcard-topic"></div>
                                <div class="flashcard-question" id="flashcard-question"></div>
                            </div>
                            <div class="flashcard-back">
                                <span class="flip-hint">Click to see question</span>
                                <div class="flashcard-answer" id="flashcard-answer"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="swipe-indicator">
                    👈 Swipe left for Review • Swipe right for Got It 👉
                </div>
                
                <div class="flashcard-keyboard-hint">
                    <kbd>Space</kbd> or <kbd>F</kbd> to flip • <kbd>←</kbd><kbd>→</kbd> to navigate • <kbd>G</kbd> Got it • <kbd>R</kbd> Review
                </div>
                
                <div class="flashcard-actions">
                    <button class="btn btn-review" onclick="PracticeView.markReview()">🔄 Review Again</button>
                    <button class="btn btn-known" onclick="PracticeView.markKnown()">✅ Got It!</button>
                </div>
                
                <div class="flashcard-nav">
                    <button class="btn btn-secondary" onclick="PracticeView.prevCard()" id="prev-card-btn">← Previous</button>
                    <button class="btn btn-secondary" onclick="PracticeView.nextCard()" id="next-card-btn">Next →</button>
                </div>
            `;
        }
        if (setupEl) setupEl.classList.remove('hidden');
    },

    // ==================== PAST PAPER MODE ====================
    startPastPaper: () => {
        try {
            if (typeof getPastPaperQuestionsByTopic !== 'function') {
                Toast.show('Past paper system not available', 'error');
                return;
            }
            
            PracticeView.pastPaperQuestions = getPastPaperQuestionsByTopic(PracticeView.selectedTopic);
            
            if (!PracticeView.pastPaperQuestions || PracticeView.pastPaperQuestions.length === 0) {
                Toast.show('No past paper questions available for this topic', 'warning');
                return;
            }
            
            if (typeof Helpers !== 'undefined' && Helpers.shuffle) {
                Helpers.shuffle(PracticeView.pastPaperQuestions);
            }
            PracticeView.pastPaperIndex = 0;
            PracticeView.showingMarkScheme = false;

            const setupEl = document.getElementById('pastpaper-setup');
            const containerEl = document.getElementById('pastpaper-container');
            if (setupEl) setupEl.classList.add('hidden');
            if (containerEl) containerEl.classList.remove('hidden');

            PracticeView.showPastPaperQuestion();
            PracticeView.announce(`Past paper practice started. Question 1 of ${PracticeView.pastPaperQuestions.length}.`);
        } catch (error) {
            console.error('Error starting past paper practice:', error);
            Toast.show('Failed to start past paper practice. Please try again.', 'error');
        }
    },

    showPastPaperQuestion: () => {
        const q = PracticeView.pastPaperQuestions[PracticeView.pastPaperIndex];
        if (!q) {
            console.error('Past paper question not found at index', PracticeView.pastPaperIndex);
            return;
        }
        
        const total = PracticeView.pastPaperQuestions.length;
        const topic = typeof getTopicById === 'function' ? getTopicById(q.topic) : null;

        const progressEl = document.getElementById('pastpaper-progress-text');
        if (progressEl) progressEl.textContent = `Question ${PracticeView.pastPaperIndex + 1} / ${total}`;

        const questionEl = document.getElementById('pastpaper-question');
        if (questionEl) {
            questionEl.innerHTML = `
                <div class="pp-question-card">
                    <div class="pp-header">
                        <span class="pp-topic" style="color: ${topic?.color || '#888'}">
                            ${topic?.icon || '📝'} ${topic?.name || 'General'}
                        </span>
                        <span class="pp-marks">[${q.marks || 0} marks]</span>
                    </div>
                    
                    <div class="pp-question-text">
                        <p>${q.question || 'Question not available'}</p>
                    </div>
                    
                    <div class="pp-answer-area">
                        <label for="pp-user-answer">Your Answer:</label>
                        <textarea id="pp-user-answer" placeholder="Write your answer here. Think about what points the mark scheme would include..." rows="8" aria-describedby="pp-answer-hint"></textarea>
                        <span id="pp-answer-hint" class="sr-only">Write your full response as you would in an exam</span>
                    </div>
                    
                    <div class="pp-actions">
                        <button class="btn btn-primary" onclick="PracticeView.showMarkScheme()">
                            📋 Show Mark Scheme
                        </button>
                    </div>
                </div>
            `;
        }
    },

    showMarkScheme: () => {
        const q = PracticeView.pastPaperQuestions[PracticeView.pastPaperIndex];
        if (!q) {
            console.error('Past paper question not found');
            return;
        }
        
        const total = PracticeView.pastPaperQuestions.length;
        const userAnswerEl = document.getElementById('pp-user-answer');
        const userAnswer = userAnswerEl ? userAnswerEl.value : '';
        
        // Award XP for attempting
        if (typeof AppState !== 'undefined' && AppState.addXP) {
            AppState.addXP(10);
        }
        
        const markSchemeList = Array.isArray(q.markScheme) 
            ? q.markScheme.map(point => `<li>${point}</li>`).join('')
            : '<li>Mark scheme not available</li>';

        const questionEl = document.getElementById('pastpaper-question');
        if (questionEl) {
            questionEl.innerHTML = `
                <div class="pp-question-card">
                    <div class="pp-header">
                        <span class="pp-topic">📋 Mark Scheme</span>
                        <span class="pp-marks">[${q.marks || 0} marks]</span>
                    </div>
                    
                    <div class="pp-question-text">
                        <p><strong>Question:</strong> ${q.question || ''}</p>
                    </div>
                    
                    ${userAnswer ? `
                        <div class="pp-user-answer-review">
                            <h4>Your Answer:</h4>
                            <p>${userAnswer}</p>
                        </div>
                    ` : `
                        <div class="pp-user-answer-review empty">
                            <h4>Your Answer:</h4>
                            <p><em>No answer provided - try writing one next time!</em></p>
                        </div>
                    `}
                    
                    <div class="pp-mark-scheme" role="region" aria-label="Mark scheme points">
                        <h4>✅ Mark Scheme Points:</h4>
                        <ul>
                            ${markSchemeList}
                        </ul>
                    </div>
                    
                    <div class="pp-sample-answer">
                        <h4>📝 Sample Answer:</h4>
                        <p>${q.sampleAnswer || 'Sample answer not available'}</p>
                    </div>
                    
                    <div class="pp-self-assess">
                        <h4>How many marks would you give yourself?</h4>
                        <div class="pp-marks-buttons" role="group" aria-label="Self assessment marks">
                            ${Array.from({length: (q.marks || 0) + 1}, (_, i) => 
                                `<button class="mark-btn" onclick="PracticeView.selfAssess(${i}, ${q.marks || 0})" aria-label="${i} out of ${q.marks || 0} marks">${i}</button>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    },

    selfAssess: (marks, maxMarks) => {
        const percentage = maxMarks > 0 ? Math.round((marks / maxMarks) * 100) : 0;
        let feedback = '';
        
        if (percentage >= 80) {
            feedback = '🌟 Excellent! You covered most of the key points.';
            if (typeof AppState !== 'undefined' && AppState.addXP) AppState.addXP(20);
        } else if (percentage >= 60) {
            feedback = '👍 Good effort! Review the points you missed.';
            if (typeof AppState !== 'undefined' && AppState.addXP) AppState.addXP(10);
        } else if (percentage >= 40) {
            feedback = '📚 Keep practicing! Focus on the mark scheme structure.';
            if (typeof AppState !== 'undefined' && AppState.addXP) AppState.addXP(5);
        } else {
            feedback = '💪 Don\'t give up! Study the sample answer and try similar questions.';
        }

        if (typeof Toast !== 'undefined') {
            Toast.show(feedback, percentage >= 60 ? 'success' : 'info');
        }
        PracticeView.announce(`You gave yourself ${marks} out of ${maxMarks} marks. ${feedback}`);

        // Show navigation
        const total = PracticeView.pastPaperQuestions.length;
        const isLast = PracticeView.pastPaperIndex >= total - 1;

        const actionsDiv = document.querySelector('.pp-self-assess');
        if (actionsDiv) {
            actionsDiv.innerHTML = `
                <div class="pp-feedback" role="alert">
                    <p>${feedback}</p>
                    <p>You gave yourself <strong>${marks}/${maxMarks}</strong> marks</p>
                </div>
                <div class="pp-nav-buttons">
                    ${PracticeView.pastPaperIndex > 0 ? 
                        '<button class="btn btn-secondary" onclick="PracticeView.prevPastPaper()">← Previous</button>' : ''}
                    ${isLast ? 
                        '<button class="btn btn-primary" onclick="PracticeView.finishPastPaper()">Finish 🎉</button>' :
                        '<button class="btn btn-primary" onclick="PracticeView.nextPastPaper()">Next Question →</button>'
                    }
                </div>
            `;
        }
    },

    prevPastPaper: () => {
        if (PracticeView.pastPaperIndex > 0) {
            PracticeView.pastPaperIndex--;
            PracticeView.showPastPaperQuestion();
        }
    },

    nextPastPaper: () => {
        if (PracticeView.pastPaperIndex < PracticeView.pastPaperQuestions.length - 1) {
            PracticeView.pastPaperIndex++;
            PracticeView.showPastPaperQuestion();
        }
    },

    finishPastPaper: () => {
        const total = PracticeView.pastPaperQuestions.length;
        if (typeof AppState !== 'undefined' && AppState.addXP) {
            AppState.addXP(30); // Bonus for completing
        }

        const questionEl = document.getElementById('pastpaper-question');
        if (questionEl) {
            questionEl.innerHTML = `
                <div class="results-card" role="region" aria-label="Past Paper Practice Results">
                    <h2>📄 Practice Complete!</h2>
                    <p>You practiced ${total} exam-style question${total !== 1 ? 's' : ''}!</p>
                    <div class="result-xp">+XP earned for practice!</div>
                    
                    <div class="pp-tips">
                        <h4>💡 Tips for Improvement:</h4>
                        <ul>
                            <li>Re-read the sample answers to understand the structure</li>
                            <li>Practice writing answers under timed conditions</li>
                            <li>Focus on using technical vocabulary</li>
                            <li>Always relate to the scenario in the question</li>
                        </ul>
                    </div>
                    
                    <div class="result-actions">
                        <button class="btn btn-secondary" onclick="Router.navigate('home')">Home</button>
                        <button class="btn btn-primary" onclick="PracticeView.resetPastPaper()">Practice More</button>
                    </div>
                </div>
            `;
        }
        
        PracticeView.announce(`Practice complete! You practiced ${total} exam-style question${total !== 1 ? 's' : ''}.`);
    },

    exitPastPaper: () => {
        PracticeView.resetPastPaper();
    },

    resetPastPaper: () => {
        const containerEl = document.getElementById('pastpaper-container');
        const setupEl = document.getElementById('pastpaper-setup');
        
        if (containerEl) {
            containerEl.classList.add('hidden');
            containerEl.innerHTML = `
                <div class="pastpaper-header">
                    <div class="pastpaper-progress">
                        <span id="pastpaper-progress-text">Question 1 / 12</span>
                    </div>
                    <button class="btn btn-secondary btn-small" onclick="PracticeView.exitPastPaper()">Exit</button>
                </div>
                <div class="pastpaper-question" id="pastpaper-question"></div>
            `;
        }
        if (setupEl) setupEl.classList.remove('hidden');
    }
};
