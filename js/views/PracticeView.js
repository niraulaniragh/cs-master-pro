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
                                ${TOPICS.map(t => `<option value="${t.id}">${t.icon} ${t.name}</option>`).join('')}
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
                                ${TOPICS.map(t => `<option value="${t.id}">${t.icon} ${t.name}</option>`).join('')}
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
                                ${TOPICS.map(t => `<option value="${t.id}">${t.icon} ${t.name}</option>`).join('')}
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
            const totalEl = document.getElementById('total-flashcards');
            if (totalEl) {
                totalEl.textContent = typeof FLASHCARDS !== 'undefined' ? FLASHCARDS.length : 0;
            }
        }, 100);
    },
    
    // Clean up when leaving the view
    cleanup: () => {
        PracticeView.removeKeyboardNavigation();
        PracticeView.removeSwipeGestures();
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
            if (PracticeView.mode === 'flashcards' && !document.getElementById('flashcard-container').classList.contains('hidden')) {
                PracticeView.handleFlashcardKeyboard(e);
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
        const flashcard = document.getElementById('flashcard');
        
        if (flashcard) {
            // Add visual feedback during swipe
            if (Math.abs(diffX) > 20) {
                if (diffX > 0) {
                    flashcard.classList.add('swiping-right');
                    flashcard.classList.remove('swiping-left');
                } else {
                    flashcard.classList.add('swiping-left');
                    flashcard.classList.remove('swiping-right');
                }
            } else {
                flashcard.classList.remove('swiping-left', 'swiping-right');
            }
        }
    },
    
    handleTouchEnd: (e) => {
        PracticeView.touchEndX = e.changedTouches[0].screenX;
        PracticeView.touchEndY = e.changedTouches[0].screenY;
        
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.remove('swiping-left', 'swiping-right');
        }
        
        PracticeView.handleSwipeGesture();
    },
    
    handleSwipeGesture: () => {
        const diffX = PracticeView.touchEndX - PracticeView.touchStartX;
        const diffY = PracticeView.touchEndY - PracticeView.touchStartY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > PracticeView.minSwipeDistance) {
            const flashcard = document.getElementById('flashcard');
            
            if (diffX > 0) {
                // Swipe right - Mark as known
                if (flashcard) {
                    flashcard.classList.add('swipe-complete-right');
                    setTimeout(() => {
                        flashcard.classList.remove('swipe-complete-right');
                        PracticeView.markKnown();
                    }, 200);
                } else {
                    PracticeView.markKnown();
                }
            } else {
                // Swipe left - Mark for review
                if (flashcard) {
                    flashcard.classList.add('swipe-complete-left');
                    setTimeout(() => {
                        flashcard.classList.remove('swipe-complete-left');
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
        document.getElementById('practice-setup').classList.add('hidden');
        document.getElementById('flashcard-setup').classList.add('hidden');
        document.getElementById('pastpaper-setup').classList.add('hidden');
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('flashcard-container').classList.add('hidden');
        document.getElementById('pastpaper-container').classList.add('hidden');
        
        // Remove swipe gestures when not in flashcard mode
        PracticeView.removeSwipeGestures();
        
        // Show appropriate setup
        if (mode === 'quiz') {
            document.getElementById('practice-setup').classList.remove('hidden');
        } else if (mode === 'flashcards') {
            document.getElementById('flashcard-setup').classList.remove('hidden');
            const count = getFlashcardsByTopic(PracticeView.selectedTopic).length;
            document.getElementById('total-flashcards').textContent = count;
        } else if (mode === 'pastpaper') {
            document.getElementById('pastpaper-setup').classList.remove('hidden');
        }
    },

    // ==================== QUIZ MODE ====================
    startQuiz: () => {
        const count = parseInt(document.getElementById('count-select').value);
        PracticeView.questions = getRandomQuestions(count, PracticeView.selectedTopic);
        PracticeView.currentIndex = 0;
        PracticeView.score = 0;
        PracticeView.streak = 0;
        PracticeView.answers = [];
        PracticeView.isActive = true;
        PracticeView.hasAnswered = false;

        document.getElementById('practice-setup').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');

        PracticeView.showQuestion();
        PracticeView.announce(`Quiz started. Question 1 of ${count}.`);
    },

    showQuestion: () => {
        const q = PracticeView.questions[PracticeView.currentIndex];
        const total = PracticeView.questions.length;
        const progress = ((PracticeView.currentIndex + 1) / total) * 100;
        PracticeView.hasAnswered = false;

        document.getElementById('quiz-progress-text').textContent = `${PracticeView.currentIndex + 1} / ${total}`;
        document.getElementById('quiz-progress-bar').style.width = `${progress}%`;

        const topic = getTopicById(q.topic);
        const shuffledOptions = q.options.map((opt, i) => ({ text: opt, originalIndex: i }));
        Helpers.shuffle(shuffledOptions);

        document.getElementById('question-card').innerHTML = `
            <div class="question-topic" style="color: ${topic?.color || '#888'}">
                ${topic?.icon || '📝'} ${topic?.name || 'General'}
            </div>
            <h3 class="question-text">${q.question}</h3>
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
    },

    selectAnswer: (answerIndex, buttonEl) => {
        if (PracticeView.hasAnswered) return;
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
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('quiz-container').innerHTML = `
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
        document.getElementById('practice-setup').classList.remove('hidden');
    },

    // ==================== FLASHCARD MODE ====================
    startFlashcards: () => {
        PracticeView.flashcards = getFlashcardsByTopic(PracticeView.selectedTopic);
        Helpers.shuffle(PracticeView.flashcards);
        PracticeView.flashcardIndex = 0;
        PracticeView.flippedCards = new Set();
        PracticeView.knownCards = new Set();
        PracticeView.reviewCards = new Set();

        document.getElementById('flashcard-setup').classList.add('hidden');
        document.getElementById('flashcard-container').classList.remove('hidden');

        // Set up swipe gestures for flashcards
        PracticeView.setupSwipeGestures();

        PracticeView.showFlashcard();
        PracticeView.announce(`Flashcard study started. Card 1 of ${PracticeView.flashcards.length}.`);
    },

    showFlashcard: () => {
        const card = PracticeView.flashcards[PracticeView.flashcardIndex];
        const total = PracticeView.flashcards.length;
        const progress = ((PracticeView.flashcardIndex + 1) / total) * 100;

        document.getElementById('flashcard-progress-text').textContent = `${PracticeView.flashcardIndex + 1} / ${total}`;
        document.getElementById('flashcard-progress-bar').style.width = `${progress}%`;

        const topic = getTopicById(card.topic);
        document.getElementById('flashcard-topic').innerHTML = `
            <span style="color: ${topic?.color || '#888'}">${topic?.icon || '📝'} ${topic?.name || 'General'}</span>
        `;
        document.getElementById('flashcard-question').textContent = card.front;
        document.getElementById('flashcard-answer').textContent = card.back;

        const flashcardEl = document.getElementById('flashcard');
        flashcardEl.classList.remove('flipped');
        flashcardEl.setAttribute('aria-label', `Flashcard ${PracticeView.flashcardIndex + 1} of ${total}. Question: ${card.front}. Click or press Space to reveal answer.`);

        document.getElementById('prev-card-btn').disabled = PracticeView.flashcardIndex === 0;
        document.getElementById('next-card-btn').textContent = 
            PracticeView.flashcardIndex === total - 1 ? 'Finish →' : 'Next →';

        document.getElementById('known-count').textContent = PracticeView.knownCards.size;
        document.getElementById('review-count').textContent = PracticeView.reviewCards.size;
    },

    flipCard: () => {
        const flashcard = document.getElementById('flashcard');
        const isFlipped = flashcard.classList.toggle('flipped');
        PracticeView.flippedCards.add(PracticeView.flashcardIndex);
        
        const card = PracticeView.flashcards[PracticeView.flashcardIndex];
        if (isFlipped) {
            flashcard.setAttribute('aria-label', `Answer: ${card.back}. Click or press Space to see question again.`);
            PracticeView.announce(`Answer: ${card.back}`);
        } else {
            flashcard.setAttribute('aria-label', `Question: ${card.front}. Click or press Space to reveal answer.`);
        }
    },

    markKnown: () => {
        PracticeView.knownCards.add(PracticeView.flashcardIndex);
        PracticeView.reviewCards.delete(PracticeView.flashcardIndex);
        document.getElementById('known-count').textContent = PracticeView.knownCards.size;
        document.getElementById('review-count').textContent = PracticeView.reviewCards.size;
        
        AppState.addXP(5);
        Toast.show('✅ Great! Card marked as known (+5 XP)', 'success');
        PracticeView.announce('Card marked as known. Plus 5 XP.');
        
        setTimeout(() => PracticeView.nextCard(), 500);
    },

    markReview: () => {
        PracticeView.reviewCards.add(PracticeView.flashcardIndex);
        PracticeView.knownCards.delete(PracticeView.flashcardIndex);
        document.getElementById('known-count').textContent = PracticeView.knownCards.size;
        document.getElementById('review-count').textContent = PracticeView.reviewCards.size;
        
        Toast.show('🔄 Card marked for review', 'info');
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
        const percentage = Math.round((knownCount / total) * 100);
        const xpEarned = knownCount * 5;

        AppState.addXP(20);
        
        // Remove swipe gestures
        PracticeView.removeSwipeGestures();
        
        // Announce results
        PracticeView.announce(`Study session complete! ${knownCount} cards known, ${reviewCount} need review. ${percentage} percent mastery. Plus ${xpEarned + 20} XP.`);

        if (percentage === 100) AppState.unlockAchievement('flashcard_master');

        document.getElementById('flashcard-container').innerHTML = `
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
                        <p>💡 You have ${reviewCount} cards to review. Practice makes perfect!</p>
                        <button class="btn btn-secondary" onclick="PracticeView.studyReviewCards()">
                            Study Review Cards
                        </button>
                    </div>
                ` : ''}
                
                <div class="result-actions">
                    <button class="btn btn-secondary" onclick="Router.navigate('home')">Home</button>
                    <button class="btn btn-primary" onclick="PracticeView.resetFlashcards()">Study Again</button>
                </div>
            </div>
        `;
    },

    studyReviewCards: () => {
        const reviewIndices = Array.from(PracticeView.reviewCards);
        if (reviewIndices.length === 0) {
            Toast.show('No cards marked for review!', 'info');
            return;
        }

        PracticeView.flashcards = reviewIndices.map(i => PracticeView.flashcards[i]);
        PracticeView.flashcardIndex = 0;
        PracticeView.knownCards.clear();
        PracticeView.reviewCards.clear();

        document.getElementById('flashcard-container').innerHTML = `
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

        // Re-setup swipe gestures
        PracticeView.setupSwipeGestures();
        PracticeView.showFlashcard();
    },

    resetFlashcards: () => {
        PracticeView.removeSwipeGestures();
        document.getElementById('flashcard-container').classList.add('hidden');
        document.getElementById('flashcard-container').innerHTML = `
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
        document.getElementById('flashcard-setup').classList.remove('hidden');
    },

    // ==================== PAST PAPER MODE ====================
    startPastPaper: () => {
        PracticeView.pastPaperQuestions = getPastPaperQuestionsByTopic(PracticeView.selectedTopic);
        Helpers.shuffle(PracticeView.pastPaperQuestions);
        PracticeView.pastPaperIndex = 0;
        PracticeView.showingMarkScheme = false;

        document.getElementById('pastpaper-setup').classList.add('hidden');
        document.getElementById('pastpaper-container').classList.remove('hidden');

        PracticeView.showPastPaperQuestion();
    },

    showPastPaperQuestion: () => {
        const q = PracticeView.pastPaperQuestions[PracticeView.pastPaperIndex];
        const total = PracticeView.pastPaperQuestions.length;
        const topic = getTopicById(q.topic);

        document.getElementById('pastpaper-progress-text').textContent = `Question ${PracticeView.pastPaperIndex + 1} / ${total}`;

        document.getElementById('pastpaper-question').innerHTML = `
            <div class="pp-question-card">
                <div class="pp-header">
                    <span class="pp-topic" style="color: ${topic?.color || '#888'}">
                        ${topic?.icon || '📝'} ${topic?.name || 'General'}
                    </span>
                    <span class="pp-marks">[${q.marks} marks]</span>
                </div>
                
                <div class="pp-question-text">
                    <p>${q.question}</p>
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
    },

    showMarkScheme: () => {
        const q = PracticeView.pastPaperQuestions[PracticeView.pastPaperIndex];
        const total = PracticeView.pastPaperQuestions.length;
        const userAnswer = document.getElementById('pp-user-answer').value;
        
        // Award XP for attempting
        AppState.addXP(10);

        document.getElementById('pastpaper-question').innerHTML = `
            <div class="pp-question-card">
                <div class="pp-header">
                    <span class="pp-topic">📋 Mark Scheme</span>
                    <span class="pp-marks">[${q.marks} marks]</span>
                </div>
                
                <div class="pp-question-text">
                    <p><strong>Question:</strong> ${q.question}</p>
                </div>
                
                ${userAnswer ? `
                    <div class="pp-user-answer-review">
                        <h4>Your Answer:</h4>
                        <p>${userAnswer}</p>
                    </div>
                ` : ''}
                
                <div class="pp-mark-scheme" role="region" aria-label="Mark scheme points">
                    <h4>✅ Mark Scheme Points:</h4>
                    <ul>
                        ${q.markScheme.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="pp-sample-answer">
                    <h4>📝 Sample Answer:</h4>
                    <p>${q.sampleAnswer}</p>
                </div>
                
                <div class="pp-self-assess">
                    <h4>How many marks would you give yourself?</h4>
                    <div class="pp-marks-buttons" role="group" aria-label="Self assessment marks">
                        ${Array.from({length: q.marks + 1}, (_, i) => 
                            `<button class="mark-btn" onclick="PracticeView.selfAssess(${i}, ${q.marks})" aria-label="${i} out of ${q.marks} marks">${i}</button>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    selfAssess: (marks, maxMarks) => {
        const percentage = Math.round((marks / maxMarks) * 100);
        let feedback = '';
        
        if (percentage >= 80) {
            feedback = '🌟 Excellent! You covered most of the key points.';
            AppState.addXP(20);
        } else if (percentage >= 60) {
            feedback = '👍 Good effort! Review the points you missed.';
            AppState.addXP(10);
        } else if (percentage >= 40) {
            feedback = '📚 Keep practicing! Focus on the mark scheme structure.';
            AppState.addXP(5);
        } else {
            feedback = '💪 Don\'t give up! Study the sample answer and try similar questions.';
        }

        Toast.show(feedback, percentage >= 60 ? 'success' : 'info');
        PracticeView.announce(`You gave yourself ${marks} out of ${maxMarks} marks. ${feedback}`);

        // Show navigation
        const total = PracticeView.pastPaperQuestions.length;
        const isLast = PracticeView.pastPaperIndex >= total - 1;

        const actionsDiv = document.querySelector('.pp-self-assess');
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
        AppState.addXP(30); // Bonus for completing

        document.getElementById('pastpaper-question').innerHTML = `
            <div class="results-card" role="region" aria-label="Past Paper Practice Results">
                <h2>📄 Practice Complete!</h2>
                <p>You practiced ${total} exam-style questions!</p>
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
        
        PracticeView.announce(`Practice complete! You practiced ${total} exam-style questions.`);
    },

    exitPastPaper: () => {
        PracticeView.resetPastPaper();
    },

    resetPastPaper: () => {
        document.getElementById('pastpaper-container').classList.add('hidden');
        document.getElementById('pastpaper-container').innerHTML = `
            <div class="pastpaper-header">
                <div class="pastpaper-progress">
                    <span id="pastpaper-progress-text">Question 1 / 12</span>
                </div>
                <button class="btn btn-secondary btn-small" onclick="PracticeView.exitPastPaper()">Exit</button>
            </div>
            <div class="pastpaper-question" id="pastpaper-question"></div>
        `;
        document.getElementById('pastpaper-setup').classList.remove('hidden');
    }
};
