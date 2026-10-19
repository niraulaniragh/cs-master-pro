/**
 * PracticeView.js - Quiz Practice Mode
 */

const PracticeView = {
    questions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    answers: [],
    selectedTopic: 'all',
    isActive: false,

    render: () => {
        return `
            <div class="practice-view">
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
                            </select>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large" onclick="PracticeView.startQuiz()">
                        Start Quiz 🚀
                    </button>
                </div>
                
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
            </div>
        `;
    },

    init: () => {
        console.log('🎯 Practice view initialized');
        PracticeView.isActive = false;
    },

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

        // Disable all buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });

        // Show correct/incorrect
        buttonEl.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        // Highlight correct answer
        const correctBtn = document.querySelectorAll('.option-btn')[
            Array.from(document.querySelectorAll('.option-btn')).findIndex(btn => 
                btn.querySelector('.option-text').textContent === q.options[q.answer]
            )
        ];
        if (correctBtn && !isCorrect) {
            correctBtn.classList.add('correct');
        }

        // Update stats
        if (isCorrect) {
            PracticeView.score++;
            PracticeView.streak++;
            document.getElementById('correct-count').textContent = PracticeView.score;
            document.getElementById('streak-count').textContent = PracticeView.streak;
            
            // Check streak achievements
            if (PracticeView.streak >= 5) AppState.unlockAchievement('streak_5');
            if (PracticeView.streak >= 10) AppState.unlockAchievement('streak_10');
        } else {
            PracticeView.streak = 0;
            document.getElementById('streak-count').textContent = 0;
        }

        PracticeView.answers.push({ question: q, answer: answerIndex, correct: isCorrect });

        // Show explanation
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

        // Award XP
        AppState.addXP(xpEarned);
        
        // Update stats
        const user = AppState.getState('user');
        AppState.setState('user.totalCorrect', user.totalCorrect + PracticeView.score);
        AppState.setState('user.totalAnswered', user.totalAnswered + total);

        // Check achievements
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
    }
};
