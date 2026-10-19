/* ==========================================
   CS Quest - Game Engine
   XP System, Levels, Achievements, Quiz Logic
========================================== */

// ==========================================
// Game State
// ==========================================
const GameState = {
    xp: 0,
    level: 1,
    streak: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    dailyProgress: 0,
    achievements: [],
    topicProgress: {},
    settings: {
        sound: true,
        animations: true,
        darkMode: true
    }
};

// Quiz State
const QuizState = {
    mode: 'practice',
    topic: 'all',
    questions: [],
    currentIndex: 0,
    lives: 3,
    timer: null,
    timeLeft: 30,
    correct: 0,
    incorrect: 0,
    xpEarned: 0,
    answers: []
};

// Flashcard State
const FlashcardState = {
    cards: [],
    currentIndex: 0,
    known: 0,
    unknown: 0
};

// ==========================================
// Configuration
// ==========================================
const CONFIG = {
    xpPerLevel: [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000],
    xpRewards: {
        practice: 5,
        quickfire: 10,
        challenge: 20,
        flashcard: 3
    },
    streakBonus: 1.5,
    dailyGoal: 20
};

const TOPICS_CONFIG = [
    { id: 'problem-solving', name: 'Problem Solving', icon: '🧩', color: '#8B5CF6', questions: 0 },
    { id: 'programming', name: 'Programming', icon: '💻', color: '#EC4899', questions: 0 },
    { id: 'data', name: 'Data', icon: '📊', color: '#3B82F6', questions: 0 },
    { id: 'computers', name: 'Computers', icon: '🖥️', color: '#10B981', questions: 0 },
    { id: 'networks', name: 'Networks & Internet', icon: '🌐', color: '#F59E0B', questions: 0 },
    { id: 'bigger-picture', name: 'The Bigger Picture', icon: '🌍', color: '#EF4444', questions: 0 }
];

const ACHIEVEMENTS = [
    { id: 'first_quiz', name: 'First Steps', icon: '🎯', desc: 'Complete your first quiz', unlocked: false },
    { id: 'streak_5', name: 'On Fire!', icon: '🔥', desc: 'Get a 5 answer streak', unlocked: false },
    { id: 'streak_10', name: 'Unstoppable', icon: '⚡', desc: 'Get a 10 answer streak', unlocked: false },
    { id: 'perfect', name: 'Perfectionist', icon: '💯', desc: 'Get 100% on a quiz', unlocked: false },
    { id: 'level_5', name: 'Rising Star', icon: '⭐', desc: 'Reach Level 5', unlocked: false },
    { id: 'level_10', name: 'Expert', icon: '🏆', desc: 'Reach Level 10', unlocked: false },
    { id: 'daily', name: 'Daily Grinder', icon: '📅', desc: 'Complete daily challenge', unlocked: false },
    { id: 'speedster', name: 'Speedster', icon: '🚀', desc: 'Answer 10 questions in Quick Fire', unlocked: false },
    { id: 'survivor', name: 'Survivor', icon: '💪', desc: 'Complete Challenge Mode', unlocked: false },
    { id: '100_correct', name: 'Century', icon: '💎', desc: 'Answer 100 questions correctly', unlocked: false },
    { id: 'all_topics', name: 'Well Rounded', icon: '🎓', desc: 'Practice all 6 Edexcel topics', unlocked: false },
    { id: 'flashcard_master', name: 'Memory Master', icon: '🧠', desc: 'Review 50 flashcards', unlocked: false }
];

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initializeUI();
    updateStats();
    populateTopics();
    populateAchievements();
});

function loadProgress() {
    const saved = localStorage.getItem('csquest_progress');
    if (saved) {
        const data = JSON.parse(saved);
        Object.assign(GameState, data);
    }
}

function saveProgress() {
    localStorage.setItem('csquest_progress', JSON.stringify(GameState));
}

function initializeUI() {
    // Create particles
    createParticles();
    
    // Set up settings toggles
    document.getElementById('sound-toggle').checked = GameState.settings.sound;
    document.getElementById('animation-toggle').checked = GameState.settings.animations;
    document.getElementById('dark-toggle').checked = GameState.settings.darkMode;
}

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        container.appendChild(particle);
    }
}

// ==========================================
// Stats & XP System
// ==========================================
function updateStats() {
    document.getElementById('xp-display').textContent = GameState.xp;
    document.getElementById('level-display').textContent = GameState.level;
    document.getElementById('streak-display').textContent = GameState.streak;
    document.getElementById('lb-xp').textContent = GameState.xp;
    
    // XP Bar
    const currentLevelXP = CONFIG.xpPerLevel[GameState.level - 1] || 0;
    const nextLevelXP = CONFIG.xpPerLevel[GameState.level] || CONFIG.xpPerLevel[CONFIG.xpPerLevel.length - 1];
    const progress = ((GameState.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    
    document.getElementById('xp-fill').style.width = `${Math.min(progress, 100)}%`;
    document.getElementById('xp-label').textContent = `${GameState.xp} / ${nextLevelXP} XP to Level ${GameState.level + 1}`;
    
    // Daily Progress
    const dailyPercent = (GameState.dailyProgress / CONFIG.dailyGoal) * 100;
    document.getElementById('daily-fill').style.width = `${Math.min(dailyPercent, 100)}%`;
    document.getElementById('daily-progress').textContent = `${GameState.dailyProgress}/${CONFIG.dailyGoal}`;
}

function addXP(amount) {
    const bonusMultiplier = GameState.streak >= 5 ? CONFIG.streakBonus : 1;
    const finalXP = Math.round(amount * bonusMultiplier);
    
    GameState.xp += finalXP;
    QuizState.xpEarned += finalXP;
    
    // Check for level up
    checkLevelUp();
    updateStats();
    saveProgress();
    
    return finalXP;
}

function checkLevelUp() {
    const nextLevelXP = CONFIG.xpPerLevel[GameState.level] || Infinity;
    
    if (GameState.xp >= nextLevelXP && GameState.level < CONFIG.xpPerLevel.length) {
        GameState.level++;
        
        // Check level achievements
        if (GameState.level >= 5) unlockAchievement('level_5');
        if (GameState.level >= 10) unlockAchievement('level_10');
        
        return true;
    }
    return false;
}

// ==========================================
// Topic Management
// ==========================================
function populateTopics() {
    const grid = document.getElementById('topic-grid');
    grid.innerHTML = '';
    
    // Use TOPICS from questions.js if available, otherwise use TOPICS_CONFIG
    const topicsList = typeof TOPICS !== 'undefined' ? TOPICS : TOPICS_CONFIG;
    
    topicsList.forEach(topic => {
        // Count questions for this topic
        const questionCount = QUESTIONS.filter(q => q.topic === topic.id).length;
        topic.questions = questionCount;
        
        const progress = GameState.topicProgress[topic.id] || 0;
        
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.style.setProperty('--topic-color', topic.color);
        card.onclick = () => selectTopic(topic.id);
        
        card.innerHTML = `
            <div class="topic-icon" style="background: ${topic.color}">${topic.icon}</div>
            <div class="topic-info">
                <h4>${topic.name}</h4>
                <span>${questionCount} questions</span>
                <div class="topic-progress">
                    <div class="topic-progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function selectTopic(topicId) {
    QuizState.topic = topicId;
    
    // Update UI
    document.querySelectorAll('.topic-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

// ==========================================
// Game Modes
// ==========================================
function startMode(mode) {
    QuizState.mode = mode;
    QuizState.currentIndex = 0;
    QuizState.correct = 0;
    QuizState.incorrect = 0;
    QuizState.xpEarned = 0;
    QuizState.answers = [];
    QuizState.lives = 3;
    
    // Get questions for selected topic
    let questions = QuizState.topic === 'all' 
        ? [...QUESTIONS] 
        : QUESTIONS.filter(q => q.topic === QuizState.topic);
    
    // Shuffle questions
    QuizState.questions = shuffleArray(questions);
    
    // Mode-specific setup
    if (mode === 'quickfire') {
        QuizState.questions = QuizState.questions.slice(0, 20);
        QuizState.timeLeft = 30;
    } else if (mode === 'challenge') {
        QuizState.questions = QuizState.questions.slice(0, 10);
        QuizState.lives = 3;
    } else if (mode === 'practice') {
        QuizState.questions = QuizState.questions.slice(0, 15);
    } else if (mode === 'flashcards') {
        startFlashcards();
        return;
    }
    
    // Update UI
    showScreen('quiz-screen');
    updateQuizUI();
    loadQuestion();
    
    if (mode === 'quickfire') {
        startTimer();
    }
}

function updateQuizUI() {
    const modeNames = {
        practice: 'Practice Mode',
        quickfire: '⚡ Quick Fire',
        challenge: '🏆 Challenge Mode'
    };
    
    document.getElementById('quiz-mode-label').textContent = modeNames[QuizState.mode] || 'Quiz';
    
    const topicsList = typeof TOPICS !== 'undefined' ? TOPICS : TOPICS_CONFIG;
    const topicName = topicsList.find(t => t.id === QuizState.topic)?.name || 'All Topics';
    document.getElementById('quiz-topic-label').textContent = topicName;
    
    // Show/hide lives
    document.getElementById('lives-display').style.display = 
        QuizState.mode === 'challenge' ? 'flex' : 'none';
    
    // Show/hide timer
    document.getElementById('timer-display').style.display = 
        QuizState.mode === 'quickfire' ? 'flex' : 'none';
    
    updateLivesDisplay();
}

function updateLivesDisplay() {
    const hearts = document.querySelectorAll('#lives-display i');
    hearts.forEach((heart, index) => {
        heart.classList.toggle('lost', index >= QuizState.lives);
    });
}

// ==========================================
// Timer
// ==========================================
function startTimer() {
    QuizState.timeLeft = 30;
    updateTimerDisplay();
    
    QuizState.timer = setInterval(() => {
        QuizState.timeLeft--;
        updateTimerDisplay();
        
        if (QuizState.timeLeft <= 0) {
            timeOut();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const display = document.getElementById('timer-display');
    display.querySelector('span').textContent = QuizState.timeLeft;
    display.classList.toggle('warning', QuizState.timeLeft <= 5);
}

function stopTimer() {
    if (QuizState.timer) {
        clearInterval(QuizState.timer);
        QuizState.timer = null;
    }
}

function timeOut() {
    stopTimer();
    handleAnswer(null, true);
}

function resetTimer() {
    stopTimer();
    if (QuizState.mode === 'quickfire') {
        startTimer();
    }
}

// ==========================================
// Question Management
// ==========================================
function loadQuestion() {
    if (QuizState.currentIndex >= QuizState.questions.length) {
        endQuiz();
        return;
    }
    
    const question = QuizState.questions[QuizState.currentIndex];
    
    // Update progress
    const progress = ((QuizState.currentIndex) / QuizState.questions.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progress}%`;
    document.getElementById('question-counter').textContent = 
        `${QuizState.currentIndex + 1} / ${QuizState.questions.length}`;
    document.getElementById('q-number').textContent = `Question ${QuizState.currentIndex + 1}`;
    
    // Set question text
    document.getElementById('question-text').textContent = question.question;
    
    // Create answer buttons
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    const shuffledAnswers = shuffleArray([...question.options]);
    
    shuffledAnswers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `
            <span class="letter">${letters[index]}</span>
            <span class="text">${answer}</span>
        `;
        btn.onclick = () => handleAnswer(answer);
        answersContainer.appendChild(btn);
    });
    
    // Hide explanation and next button
    document.getElementById('explanation-box').classList.remove('show');
    document.getElementById('next-btn').classList.remove('show');
    
    // Reset timer for quickfire
    if (QuizState.mode === 'quickfire') {
        resetTimer();
    }
}

function handleAnswer(selectedAnswer, isTimeout = false) {
    stopTimer();
    
    const question = QuizState.questions[QuizState.currentIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    // Record answer
    QuizState.answers.push({
        question: question.question,
        selected: selectedAnswer,
        correct: question.correct,
        isCorrect
    });
    
    // Update stats
    if (isCorrect) {
        QuizState.correct++;
        GameState.streak++;
        GameState.totalCorrect++;
        GameState.dailyProgress++;
        
        // Add XP
        const xpAmount = CONFIG.xpRewards[QuizState.mode] || 5;
        addXP(xpAmount);
        
        // Check streak achievements
        if (GameState.streak >= 5) unlockAchievement('streak_5');
        if (GameState.streak >= 10) unlockAchievement('streak_10');
        
        playSound('correct');
    } else {
        QuizState.incorrect++;
        GameState.streak = 0;
        
        if (QuizState.mode === 'challenge') {
            QuizState.lives--;
            updateLivesDisplay();
            
            if (QuizState.lives <= 0) {
                setTimeout(() => endQuiz(), 1500);
            }
        }
        
        playSound('incorrect');
    }
    
    GameState.totalAnswered++;
    
    // Check achievements
    if (GameState.totalCorrect >= 100) unlockAchievement('100_correct');
    if (GameState.dailyProgress >= CONFIG.dailyGoal) unlockAchievement('daily');
    
    // Update UI
    highlightAnswers(selectedAnswer, question.correct);
    
    // Show explanation in practice mode
    if (QuizState.mode === 'practice' && question.explanation) {
        document.getElementById('explanation-text').textContent = question.explanation;
        document.getElementById('explanation-box').classList.add('show');
    }
    
    // Show next button or auto-advance
    if (QuizState.mode === 'practice') {
        document.getElementById('next-btn').classList.add('show');
    } else {
        setTimeout(() => nextQuestion(), 1200);
    }
    
    updateStats();
    saveProgress();
}

function highlightAnswers(selected, correct) {
    const buttons = document.querySelectorAll('.answer-btn');
    
    buttons.forEach(btn => {
        btn.classList.add('disabled');
        const text = btn.querySelector('.text').textContent;
        
        if (text === correct) {
            btn.classList.add('correct');
        } else if (text === selected && text !== correct) {
            btn.classList.add('incorrect');
        }
    });
}

function nextQuestion() {
    QuizState.currentIndex++;
    
    if (QuizState.currentIndex >= QuizState.questions.length || 
        (QuizState.mode === 'challenge' && QuizState.lives <= 0)) {
        endQuiz();
    } else {
        loadQuestion();
    }
}

// ==========================================
// Quiz End
// ==========================================
function endQuiz() {
    stopTimer();
    
    const total = QuizState.correct + QuizState.incorrect;
    const accuracy = total > 0 ? Math.round((QuizState.correct / total) * 100) : 0;
    
    // Check achievements
    if (total > 0) unlockAchievement('first_quiz');
    if (accuracy === 100 && total >= 5) unlockAchievement('perfect');
    if (QuizState.mode === 'challenge' && QuizState.lives > 0) unlockAchievement('survivor');
    if (QuizState.mode === 'quickfire' && QuizState.correct >= 10) unlockAchievement('speedster');
    
    // Update topic progress
    if (QuizState.topic !== 'all') {
        const currentProgress = GameState.topicProgress[QuizState.topic] || 0;
        GameState.topicProgress[QuizState.topic] = Math.min(100, currentProgress + accuracy / 2);
        
        // Check all topics achievement
        const topicsPlayed = Object.keys(GameState.topicProgress).length;
        if (topicsPlayed >= 6) unlockAchievement('all_topics');
    }
    
    saveProgress();
    
    // Show results
    showResults(accuracy);
}

function showResults(accuracy) {
    showScreen('results-screen');
    
    // Set icon and message based on performance
    let icon, title, subtitle;
    if (accuracy >= 90) {
        icon = '🎉'; title = 'AMAZING!'; subtitle = 'You absolutely crushed it!';
    } else if (accuracy >= 70) {
        icon = '🔥'; title = 'Great Job!'; subtitle = 'Keep up the good work!';
    } else if (accuracy >= 50) {
        icon = '👍'; title = 'Not Bad!'; subtitle = 'Room for improvement!';
    } else {
        icon = '💪'; title = 'Keep Trying!'; subtitle = 'Practice makes perfect!';
    }
    
    document.querySelector('.results-icon').textContent = icon;
    document.getElementById('results-title').textContent = title;
    document.getElementById('results-subtitle').textContent = subtitle;
    
    // Stats
    const total = QuizState.correct + QuizState.incorrect;
    document.getElementById('result-score').textContent = `${QuizState.correct}/${total}`;
    document.getElementById('result-accuracy').textContent = `${accuracy}%`;
    document.getElementById('result-xp').textContent = `+${QuizState.xpEarned}`;
    
    // Check for level up
    const leveledUp = checkLevelUp();
    const levelBanner = document.getElementById('level-up-banner');
    if (leveledUp) {
        levelBanner.style.display = 'flex';
        document.getElementById('new-level').textContent = `Level ${GameState.level}`;
    } else {
        levelBanner.style.display = 'none';
    }
}

function playAgain() {
    startMode(QuizState.mode);
}

function goHome() {
    showScreen('home-screen');
    populateTopics();
}

function reviewMistakes() {
    // Filter wrong answers
    const mistakes = QuizState.answers.filter(a => !a.isCorrect);
    
    if (mistakes.length === 0) {
        alert('No mistakes to review! You got them all right! 🎉');
        return;
    }
    
    let reviewText = 'Review Your Mistakes:\n\n';
    mistakes.forEach((m, i) => {
        reviewText += `${i + 1}. ${m.question}\n`;
        reviewText += `   Your answer: ${m.selected || 'No answer'}\n`;
        reviewText += `   Correct: ${m.correct}\n\n`;
    });
    
    alert(reviewText);
}

// ==========================================
// Flashcards
// ==========================================
function startFlashcards() {
    // Get flashcards for selected topic
    let cards = QuizState.topic === 'all'
        ? [...FLASHCARDS]
        : FLASHCARDS.filter(f => f.topic === QuizState.topic);
    
    FlashcardState.cards = shuffleArray(cards);
    FlashcardState.currentIndex = 0;
    FlashcardState.known = 0;
    FlashcardState.unknown = 0;
    
    showScreen('flashcard-screen');
    
    const topicName = TOPICS.find(t => t.id === QuizState.topic)?.name || 'All Topics';
    document.getElementById('flashcard-topic-label').textContent = topicName;
    
    loadCard();
}

function loadCard() {
    if (FlashcardState.currentIndex >= FlashcardState.cards.length) {
        endFlashcards();
        return;
    }
    
    const card = FlashcardState.cards[FlashcardState.currentIndex];
    
    document.getElementById('card-term').textContent = card.term;
    document.getElementById('card-definition').textContent = card.definition;
    document.getElementById('card-counter').textContent = 
        `${FlashcardState.currentIndex + 1} / ${FlashcardState.cards.length}`;
    
    // Reset card flip
    document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function markCard(known) {
    if (known) {
        FlashcardState.known++;
        addXP(CONFIG.xpRewards.flashcard);
    } else {
        FlashcardState.unknown++;
    }
    
    FlashcardState.currentIndex++;
    
    // Achievement check
    const totalReviewed = FlashcardState.known + FlashcardState.unknown;
    if (totalReviewed >= 50) unlockAchievement('flashcard_master');
    
    loadCard();
    saveProgress();
}

function nextCard() {
    if (FlashcardState.currentIndex < FlashcardState.cards.length - 1) {
        FlashcardState.currentIndex++;
        loadCard();
    }
}

function prevCard() {
    if (FlashcardState.currentIndex > 0) {
        FlashcardState.currentIndex--;
        loadCard();
    }
}

function shuffleCards() {
    FlashcardState.cards = shuffleArray(FlashcardState.cards);
    FlashcardState.currentIndex = 0;
    loadCard();
}

function endFlashcards() {
    const total = FlashcardState.known + FlashcardState.unknown;
    const percent = total > 0 ? Math.round((FlashcardState.known / total) * 100) : 0;
    
    alert(`Flashcards Complete!\n\nKnew: ${FlashcardState.known}\nNeed to Review: ${FlashcardState.unknown}\nScore: ${percent}%`);
    
    goHome();
}

// ==========================================
// Achievements
// ==========================================
function populateAchievements() {
    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = '';
    
    ACHIEVEMENTS.forEach(ach => {
        const isUnlocked = GameState.achievements.includes(ach.id);
        
        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        item.innerHTML = `
            <span class="icon">${ach.icon}</span>
            <span class="name">${ach.name}</span>
        `;
        item.title = ach.desc;
        
        grid.appendChild(item);
    });
}

function unlockAchievement(id) {
    if (GameState.achievements.includes(id)) return;
    
    GameState.achievements.push(id);
    
    const achievement = ACHIEVEMENTS.find(a => a.id === id);
    if (achievement) {
        showAchievementPopup(achievement);
        playSound('achievement');
    }
    
    populateAchievements();
    saveProgress();
}

function showAchievementPopup(achievement) {
    const popup = document.getElementById('achievement-popup');
    document.getElementById('achievement-name').textContent = achievement.name;
    
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// ==========================================
// Modals
// ==========================================
function toggleLeaderboard() {
    document.getElementById('leaderboard-modal').classList.toggle('show');
}

function toggleAchievements() {
    populateAchievements();
    document.getElementById('achievements-modal').classList.toggle('show');
}

function toggleSettings() {
    document.getElementById('settings-modal').classList.toggle('show');
}

function resetProgress() {
    if (confirm('Are you sure? This will reset ALL your progress including XP, levels, and achievements!')) {
        localStorage.removeItem('csquest_progress');
        location.reload();
    }
}

// ==========================================
// Navigation
// ==========================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function exitQuiz() {
    stopTimer();
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
        goHome();
    }
}

// ==========================================
// Utilities
// ==========================================
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function playSound(type) {
    if (!GameState.settings.sound) return;
    
    // Web Audio API beeps
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        
        if (type === 'correct') {
            oscillator.frequency.value = 800;
            gain.gain.value = 0.1;
        } else if (type === 'incorrect') {
            oscillator.frequency.value = 300;
            gain.gain.value = 0.1;
        } else if (type === 'achievement') {
            oscillator.frequency.value = 600;
            gain.gain.value = 0.15;
        }
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
        // Audio not supported
    }
}

// Settings handlers
document.getElementById('sound-toggle')?.addEventListener('change', (e) => {
    GameState.settings.sound = e.target.checked;
    saveProgress();
});

document.getElementById('animation-toggle')?.addEventListener('change', (e) => {
    GameState.settings.animations = e.target.checked;
    document.body.classList.toggle('no-animations', !e.target.checked);
    saveProgress();
});

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (document.getElementById('quiz-screen').classList.contains('active')) {
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            const buttons = document.querySelectorAll('.answer-btn:not(.disabled)');
            if (buttons[index]) buttons[index].click();
        }
    }
    
    if (document.getElementById('flashcard-screen').classList.contains('active')) {
        if (e.key === ' ' || e.key === 'Enter') {
            flipCard();
        } else if (e.key === 'ArrowLeft') {
            prevCard();
        } else if (e.key === 'ArrowRight') {
            nextCard();
        }
    }
});

console.log('🎮 CS Quest loaded! Good luck getting that 9!');
