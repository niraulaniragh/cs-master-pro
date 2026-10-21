/**
 * PracticeView.js - Quiz, Flashcard & Past Paper Study Mode
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
                    
                    <div class="flashcard-wrapper">
                        <div class="flashcard" id="flashcard" onclick="PracticeView.flipCard()">
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
        
        // Update flashcard count based on topic
        setTimeout(() => {
            const totalEl = document.getElementById('total-flashcards');
            if (totalEl) {
                totalEl.textContent = typeof FLASHCARDS !== 'undefined' ? FLASHCARDS.length : 0;
            }
        }, 100);
    },

    switchMode: (mode) => {
        PracticeView.mode = mode;
        
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

        document.getElementById('practice-setup').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');

        PracticeView.showQuestion();
    },

    showQuestion: () => {
        const q = PracticeView.questions[PracticeView.currentIndex];
        const total = PracticeView.questions.length;
        const progress = ((PracticeView.currentIndex + 1) / total) * 100;

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
            <div class="options-list">
                ${shuffledOptions.map((opt, i) => `
                    <button class="option-btn" onclick="PracticeView.selectAnswer(${opt.originalIndex}, this)">
                        <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                        <span class="option-text">${opt.text}</span>
                    </button>
                `).join('')}
            </div>
        `;
    },

    selectAnswer: (answerIndex, buttonEl) => {
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
            
            if (PracticeView.streak >= 5) AppState.unlockAchievement('streak_5');
            if (PracticeView.streak >= 10) AppState.unlockAchievement('streak_10');
        } else {
            PracticeView.streak = 0;
            document.getElementById('streak-count').textContent = 0;
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
            <div class="explanation ${isCorrect ? 'correct' : 'incorrect'}">
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
        
        if (PracticeView.currentIndex >= PracticeView.questions.length) {
            PracticeView.showResults();
        } else {
            PracticeView.showQuestion();
        }
    },

    showResults: () => {
        const total = PracticeView.questions.length;
        const percentage = Math.round((PracticeView.score / total) * 100);
        const xpEarned = PracticeView.score * 10 + (percentage === 100 ? 50 : 0);

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

        document.getElementById('quiz-container').innerHTML = `
            <div class="results-card">
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

        PracticeView.showFlashcard();
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

        document.getElementById('flashcard').classList.remove('flipped');

        document.getElementById('prev-card-btn').disabled = PracticeView.flashcardIndex === 0;
        document.getElementById('next-card-btn').textContent = 
            PracticeView.flashcardIndex === total - 1 ? 'Finish →' : 'Next →';

        document.getElementById('known-count').textContent = PracticeView.knownCards.size;
        document.getElementById('review-count').textContent = PracticeView.reviewCards.size;
    },

    flipCard: () => {
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.toggle('flipped');
        PracticeView.flippedCards.add(PracticeView.flashcardIndex);
    },

    markKnown: () => {
        PracticeView.knownCards.add(PracticeView.flashcardIndex);
        PracticeView.reviewCards.delete(PracticeView.flashcardIndex);
        document.getElementById('known-count').textContent = PracticeView.knownCards.size;
        document.getElementById('review-count').textContent = PracticeView.reviewCards.size;
        
        AppState.addXP(5);
        Toast.show('✅ Great! Card marked as known (+5 XP)', 'success');
        
        setTimeout(() => PracticeView.nextCard(), 500);
    },

    markReview: () => {
        PracticeView.reviewCards.add(PracticeView.flashcardIndex);
        PracticeView.knownCards.delete(PracticeView.flashcardIndex);
        document.getElementById('known-count').textContent = PracticeView.knownCards.size;
        document.getElementById('review-count').textContent = PracticeView.reviewCards.size;
        
        Toast.show('🔄 Card marked for review', 'info');
        
        setTimeout(() => PracticeView.nextCard(), 500);
    },

    prevCard: () => {
        if (PracticeView.flashcardIndex > 0) {
            PracticeView.flashcardIndex--;
            PracticeView.showFlashcard();
        }
    },

    nextCard: () => {
        if (PracticeView.flashcardIndex < PracticeView.flashcards.length - 1) {
            PracticeView.flashcardIndex++;
            PracticeView.showFlashcard();
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

        if (percentage === 100) AppState.unlockAchievement('flashcard_master');

        document.getElementById('flashcard-container').innerHTML = `
            <div class="results-card">
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
            
            <div class="flashcard-wrapper">
                <div class="flashcard" id="flashcard" onclick="PracticeView.flipCard()">
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
            
            <div class="flashcard-actions">
                <button class="btn btn-review" onclick="PracticeView.markReview()">🔄 Review Again</button>
                <button class="btn btn-known" onclick="PracticeView.markKnown()">✅ Got It!</button>
            </div>
            
            <div class="flashcard-nav">
                <button class="btn btn-secondary" onclick="PracticeView.prevCard()" id="prev-card-btn">← Previous</button>
                <button class="btn btn-secondary" onclick="PracticeView.nextCard()" id="next-card-btn">Next →</button>
            </div>
        `;

        PracticeView.showFlashcard();
    },

    resetFlashcards: () => {
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
            
            <div class="flashcard-wrapper">
                <div class="flashcard" id="flashcard" onclick="PracticeView.flipCard()">
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
                    <label>Your Answer:</label>
                    <textarea id="pp-user-answer" placeholder="Write your answer here. Think about what points the mark scheme would include..." rows="8"></textarea>
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
                
                <div class="pp-mark-scheme">
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
                    <div class="pp-marks-buttons">
                        ${Array.from({length: q.marks + 1}, (_, i) => 
                            `<button class="mark-btn" onclick="PracticeView.selfAssess(${i}, ${q.marks})">${i}</button>`
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

        // Show navigation
        const total = PracticeView.pastPaperQuestions.length;
        const isLast = PracticeView.pastPaperIndex >= total - 1;

        const actionsDiv = document.querySelector('.pp-self-assess');
        actionsDiv.innerHTML = `
            <div class="pp-feedback">
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
            <div class="results-card">
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
