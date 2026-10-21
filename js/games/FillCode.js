/**
 * FillCode.js - Fill in the Code Challenge
 * Complete pseudocode and code snippets by filling in the blanks
 * Features: Drag-drop or type, hints, difficulty levels
 */

const FillCode = {
    isPlaying: false,
    challenges: [],
    currentIndex: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    hintsUsed: 0,
    difficulty: 'medium',

    // Code challenges with blanks
    codeSnippets: [
        {
            title: 'For Loop',
            difficulty: 'easy',
            code: `for i in _____(10):
    print(i)`,
            blanks: ['range'],
            explanation: 'range() generates a sequence of numbers'
        },
        {
            title: 'If Statement',
            difficulty: 'easy',
            code: `_____ score >= 50:
    print("Pass")
_____:
    print("Fail")`,
            blanks: ['if', 'else'],
            explanation: 'if checks a condition, else handles the alternative'
        },
        {
            title: 'While Loop',
            difficulty: 'easy',
            code: `count = 0
_____ count < 10:
    count = count _____ 1`,
            blanks: ['while', '+'],
            explanation: 'while loops repeat until condition is False'
        },
        {
            title: 'Function Definition',
            difficulty: 'medium',
            code: `_____ calculate_area(length, width):
    _____ length * width`,
            blanks: ['def', 'return'],
            explanation: 'def defines a function, return sends back a value'
        },
        {
            title: 'Array/List',
            difficulty: 'medium',
            code: `numbers = [1, 2, 3, 4, 5]
total = _____(numbers)
average = total _____ len(numbers)`,
            blanks: ['sum', '/'],
            explanation: 'sum() adds all elements, / divides for average'
        },
        {
            title: 'Input and Output',
            difficulty: 'easy',
            code: `name = _____("Enter your name: ")
_____(\"Hello\", name)`,
            blanks: ['input', 'print'],
            explanation: 'input() gets user data, print() displays output'
        },
        {
            title: 'Boolean Logic',
            difficulty: 'medium',
            code: `age = 18
has_license = True
can_drive = age >= 18 _____ has_license`,
            blanks: ['and'],
            explanation: 'and requires both conditions to be True'
        },
        {
            title: 'String Methods',
            difficulty: 'medium',
            code: `text = "Hello World"
upper_text = text._____()
length = _____(text)`,
            blanks: ['upper', 'len'],
            explanation: 'upper() converts to uppercase, len() returns length'
        },
        {
            title: 'List Operations',
            difficulty: 'medium',
            code: `fruits = ["apple", "banana"]
fruits._____(\"orange\")
first = fruits[_____]`,
            blanks: ['append', '0'],
            explanation: 'append() adds to list, [0] gets first element'
        },
        {
            title: 'Try-Except',
            difficulty: 'hard',
            code: `_____:
    result = x / y
_____ ZeroDivisionError:
    print("Cannot divide by zero")`,
            blanks: ['try', 'except'],
            explanation: 'try-except handles errors gracefully'
        },
        {
            title: 'Class Definition',
            difficulty: 'hard',
            code: `_____ Student:
    def _____(_____. name):
        self.name = name`,
            blanks: ['class', '__init__', 'self'],
            explanation: 'class defines objects, __init__ is the constructor'
        },
        {
            title: 'File Handling',
            difficulty: 'hard',
            code: `file = _____("data.txt", "r")
content = file._____()
file._____()`,
            blanks: ['open', 'read', 'close'],
            explanation: 'open() opens file, read() gets content, close() releases'
        },
        {
            title: 'Bubble Sort',
            difficulty: 'hard',
            code: `for i in range(n):
    for j in range(0, n-i-1):
        if arr[j] _____ arr[j+1]:
            arr[j], arr[j+1] = arr[j+1], _____`,
            blanks: ['>', 'arr[j]'],
            explanation: 'Swap if current > next, exchange positions'
        },
        {
            title: 'Binary Search',
            difficulty: 'hard',
            code: `mid = (low + _____) // 2
if arr[mid] == target:
    _____ mid
elif arr[mid] < target:
    low = mid _____ 1`,
            blanks: ['high', 'return', '+'],
            explanation: 'Find middle, return if found, adjust search range'
        },
        {
            title: 'SQL Query',
            difficulty: 'medium',
            code: `_____ name, age
_____ students
_____ age >= 18`,
            blanks: ['SELECT', 'FROM', 'WHERE'],
            explanation: 'SELECT columns FROM table WHERE condition'
        }
    ],

    open: () => {
        const modal = document.createElement('div');
        modal.className = 'game-modal fillcode-modal';
        modal.id = 'fillcode-modal';
        modal.innerHTML = FillCode.renderMenu();
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    close: () => {
        const modal = document.getElementById('fillcode-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    renderMenu: () => {
        const stats = FillCode.getStats();
        
        return `
            <div class="game-container fillcode-container">
                <button class="game-close-btn" onclick="FillCode.close()">✕</button>
                
                <div class="game-header">
                    <div class="game-icon">📝</div>
                    <h2>Fill in the Code</h2>
                    <p>Complete the code by filling in the blanks!</p>
                </div>
                
                <div class="fc-menu">
                    <div class="fc-stats-row">
                        <div class="fc-stat">
                            <span class="fc-stat-value">${stats.challengesCompleted || 0}</span>
                            <span class="fc-stat-label">Completed</span>
                        </div>
                        <div class="fc-stat">
                            <span class="fc-stat-value">${stats.accuracy || 0}%</span>
                            <span class="fc-stat-label">Accuracy</span>
                        </div>
                        <div class="fc-stat">
                            <span class="fc-stat-value">${stats.bestStreak || 0}</span>
                            <span class="fc-stat-label">Best Streak</span>
                        </div>
                    </div>
                    
                    <div class="fc-difficulty-select">
                        <label>Select Difficulty:</label>
                        <div class="fc-diff-buttons">
                            <button class="fc-diff-btn ${FillCode.difficulty === 'easy' ? 'selected' : ''}"
                                    onclick="FillCode.selectDifficulty('easy')">
                                🟢 Easy
                            </button>
                            <button class="fc-diff-btn ${FillCode.difficulty === 'medium' ? 'selected' : ''}"
                                    onclick="FillCode.selectDifficulty('medium')">
                                🟡 Medium
                            </button>
                            <button class="fc-diff-btn ${FillCode.difficulty === 'hard' ? 'selected' : ''}"
                                    onclick="FillCode.selectDifficulty('hard')">
                                🔴 Hard
                            </button>
                            <button class="fc-diff-btn ${FillCode.difficulty === 'all' ? 'selected' : ''}"
                                    onclick="FillCode.selectDifficulty('all')">
                                🎯 Mixed
                            </button>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large fc-start-btn" onclick="FillCode.startGame()">
                        <span class="btn-icon">💻</span>
                        Start Challenge
                    </button>
                </div>
            </div>
        `;
    },

    selectDifficulty: (diff) => {
        FillCode.difficulty = diff;
        document.querySelectorAll('.fc-diff-btn').forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
    },

    startGame: () => {
        // Filter by difficulty
        let pool = FillCode.codeSnippets;
        if (FillCode.difficulty !== 'all') {
            pool = pool.filter(s => s.difficulty === FillCode.difficulty);
        }
        
        FillCode.challenges = shuffleArray([...pool]).slice(0, 10);
        FillCode.currentIndex = 0;
        FillCode.score = 0;
        FillCode.correctAnswers = 0;
        FillCode.wrongAnswers = 0;
        FillCode.hintsUsed = 0;
        FillCode.isPlaying = true;
        
        const container = document.querySelector('.fillcode-container');
        container.innerHTML = FillCode.renderGame();
        
        FillCode.showChallenge();
    },

    renderGame: () => {
        return `
            <div class="fc-game-view">
                <div class="fc-game-header">
                    <div class="fc-progress">
                        <span id="fc-progress-text">1 / ${FillCode.challenges.length}</span>
                        <div class="fc-progress-bar">
                            <div class="fc-progress-fill" id="fc-progress-fill"></div>
                        </div>
                    </div>
                    <div class="fc-score" id="fc-score">
                        Score: ${FillCode.score}
                    </div>
                </div>
                
                <div class="fc-challenge-area" id="fc-challenge-area">
                    <!-- Challenge loads here -->
                </div>
            </div>
        `;
    },

    showChallenge: () => {
        if (FillCode.currentIndex >= FillCode.challenges.length) {
            FillCode.endGame();
            return;
        }
        
        const challenge = FillCode.challenges[FillCode.currentIndex];
        
        // Update progress
        document.getElementById('fc-progress-text').textContent = `${FillCode.currentIndex + 1} / ${FillCode.challenges.length}`;
        document.getElementById('fc-progress-fill').style.width = `${(FillCode.currentIndex / FillCode.challenges.length) * 100}%`;
        
        // Create code display with input blanks
        let codeHtml = challenge.code;
        let blankIndex = 0;
        codeHtml = codeHtml.replace(/_____/g, () => {
            const idx = blankIndex++;
            return `<input type="text" class="fc-blank" data-index="${idx}" data-answer="${challenge.blanks[idx]}" autocomplete="off" spellcheck="false">`;
        });
        
        const challengeArea = document.getElementById('fc-challenge-area');
        challengeArea.innerHTML = `
            <div class="fc-challenge animate-in">
                <div class="fc-challenge-header">
                    <h3>${challenge.title}</h3>
                    <span class="fc-diff-badge ${challenge.difficulty}">${challenge.difficulty}</span>
                </div>
                
                <div class="fc-code-block">
                    <pre><code>${codeHtml}</code></pre>
                </div>
                
                <div class="fc-word-bank" id="fc-word-bank">
                    <span class="fc-wb-label">Word Bank:</span>
                    ${shuffleArray([...challenge.blanks]).map(word => `
                        <button class="fc-word" onclick="FillCode.insertWord('${word}')">${word}</button>
                    `).join('')}
                </div>
                
                <div class="fc-actions">
                    <button class="btn btn-secondary" onclick="FillCode.showHint()">
                        💡 Hint
                    </button>
                    <button class="btn btn-primary" onclick="FillCode.checkAnswer()">
                        Check Answer ✓
                    </button>
                </div>
            </div>
        `;
        
        // Focus first blank
        document.querySelector('.fc-blank')?.focus();
        
        // Add keyboard navigation
        document.querySelectorAll('.fc-blank').forEach((input, i, inputs) => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' || e.key === 'Enter') {
                    e.preventDefault();
                    if (i < inputs.length - 1) {
                        inputs[i + 1].focus();
                    } else {
                        FillCode.checkAnswer();
                    }
                }
            });
        });
    },

    insertWord: (word) => {
        // Find first empty blank and insert word
        const blanks = document.querySelectorAll('.fc-blank');
        for (const blank of blanks) {
            if (!blank.value) {
                blank.value = word;
                blank.classList.add('filled');
                
                // Disable word in bank
                document.querySelectorAll('.fc-word').forEach(btn => {
                    if (btn.textContent === word && !btn.classList.contains('used')) {
                        btn.classList.add('used');
                        return;
                    }
                });
                
                // Focus next blank
                const nextBlank = [...blanks].find(b => !b.value);
                if (nextBlank) nextBlank.focus();
                
                break;
            }
        }
    },

    showHint: () => {
        const challenge = FillCode.challenges[FillCode.currentIndex];
        FillCode.hintsUsed++;
        
        // Show hint modal
        const hintHtml = `
            <div class="fc-hint-modal">
                <h4>💡 Hint</h4>
                <p>${challenge.explanation}</p>
                <button class="btn btn-secondary" onclick="this.parentElement.remove()">Got it!</button>
            </div>
        `;
        
        const hintDiv = document.createElement('div');
        hintDiv.innerHTML = hintHtml;
        document.querySelector('.fc-challenge-area').appendChild(hintDiv.firstElementChild);
    },

    checkAnswer: () => {
        const challenge = FillCode.challenges[FillCode.currentIndex];
        const blanks = document.querySelectorAll('.fc-blank');
        let allCorrect = true;
        
        blanks.forEach((blank, i) => {
            const userAnswer = blank.value.trim().toLowerCase();
            const correctAnswer = challenge.blanks[i].toLowerCase();
            
            if (userAnswer === correctAnswer) {
                blank.classList.add('correct');
            } else {
                blank.classList.add('wrong');
                allCorrect = false;
            }
            blank.disabled = true;
        });
        
        if (allCorrect) {
            FillCode.correctAnswers++;
            const points = FillCode.hintsUsed === 0 ? 100 : 50;
            FillCode.score += points;
            document.getElementById('fc-score').textContent = `Score: ${FillCode.score}`;
            
            Toast.show(`✓ Correct! +${points} points`, 'success');
        } else {
            FillCode.wrongAnswers++;
            Toast.show('✗ Not quite right. Check the correct answers.', 'error');
            
            // Show correct answers
            blanks.forEach((blank, i) => {
                if (blank.classList.contains('wrong')) {
                    blank.value = challenge.blanks[i];
                    blank.classList.remove('wrong');
                    blank.classList.add('shown-answer');
                }
            });
        }
        
        // Show next button
        const actions = document.querySelector('.fc-actions');
        actions.innerHTML = `
            <button class="btn btn-primary" onclick="FillCode.nextChallenge()">
                ${FillCode.currentIndex < FillCode.challenges.length - 1 ? 'Next Challenge →' : 'See Results'}
            </button>
        `;
    },

    nextChallenge: () => {
        FillCode.currentIndex++;
        FillCode.showChallenge();
    },

    endGame: () => {
        FillCode.isPlaying = false;
        
        const accuracy = Math.round((FillCode.correctAnswers / FillCode.challenges.length) * 100);
        
        // Save stats
        FillCode.saveStats(FillCode.correctAnswers, accuracy);
        
        // Award XP
        const xpEarned = FillCode.score / 2;
        AppState.addXP(xpEarned);
        
        const container = document.querySelector('.fillcode-container');
        container.innerHTML = `
            <button class="game-close-btn" onclick="FillCode.close()">✕</button>
            
            <div class="fc-results">
                <div class="fc-result-banner">🎉 Challenge Complete!</div>
                
                <div class="fc-final-score">
                    <span class="fc-fs-value">${FillCode.score}</span>
                    <span class="fc-fs-label">Final Score</span>
                </div>
                
                <div class="fc-results-grid">
                    <div class="fc-result-item">
                        <span class="fc-ri-icon">✓</span>
                        <span class="fc-ri-value">${FillCode.correctAnswers}</span>
                        <span class="fc-ri-label">Correct</span>
                    </div>
                    <div class="fc-result-item">
                        <span class="fc-ri-icon">✗</span>
                        <span class="fc-ri-value">${FillCode.wrongAnswers}</span>
                        <span class="fc-ri-label">Wrong</span>
                    </div>
                    <div class="fc-result-item">
                        <span class="fc-ri-icon">🎯</span>
                        <span class="fc-ri-value">${accuracy}%</span>
                        <span class="fc-ri-label">Accuracy</span>
                    </div>
                    <div class="fc-result-item">
                        <span class="fc-ri-icon">⭐</span>
                        <span class="fc-ri-value">+${xpEarned}</span>
                        <span class="fc-ri-label">XP</span>
                    </div>
                </div>
                
                <div class="fc-results-actions">
                    <button class="btn btn-primary" onclick="FillCode.startGame()">
                        🔄 Play Again
                    </button>
                    <button class="btn btn-secondary" onclick="FillCode.close()">
                        Done
                    </button>
                </div>
            </div>
        `;
    },

    saveStats: (correct, accuracy) => {
        const stats = FillCode.getStats();
        
        stats.challengesCompleted = (stats.challengesCompleted || 0) + FillCode.challenges.length;
        stats.totalCorrect = (stats.totalCorrect || 0) + correct;
        
        // Update accuracy (rolling average)
        const totalAttempts = stats.challengesCompleted;
        stats.accuracy = Math.round((stats.totalCorrect / totalAttempts) * 100);
        
        // Update streak
        if (correct === FillCode.challenges.length) {
            stats.currentStreak = (stats.currentStreak || 0) + 1;
            stats.bestStreak = Math.max(stats.bestStreak || 0, stats.currentStreak);
        } else {
            stats.currentStreak = 0;
        }
        
        localStorage.setItem('csmaster_fillcode_stats', JSON.stringify(stats));
    },

    getStats: () => {
        return JSON.parse(localStorage.getItem('csmaster_fillcode_stats') || '{}');
    },

    cleanup: () => {
        // Stop game
        FillCode.isPlaying = false;
        console.log('📝 FillCode cleanup');
    }
};
