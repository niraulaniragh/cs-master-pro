/**
 * TypeRacer.js - Typing Speed Challenge
 * Type out definitions, code snippets, and CS terms
 * Features: WPM tracking, accuracy, difficulty levels
 */

const TypeRacer = {
    isPlaying: false,
    currentText: '',
    typedText: '',
    startTime: null,
    endTime: null,
    timer: null,
    wpm: 0,
    accuracy: 100,
    errors: 0,
    currentIndex: 0,
    mode: 'definitions', // definitions, code, mixed
    difficulty: 'medium',

    texts: {
        definitions: [
            "An algorithm is a step-by-step procedure for solving a problem or accomplishing a task.",
            "A variable is a named storage location in memory that holds a value which can be changed during program execution.",
            "A loop is a programming construct that repeats a block of code until a specified condition is met.",
            "An array is a data structure that stores a collection of elements of the same type in contiguous memory locations.",
            "A function is a reusable block of code that performs a specific task and can be called from other parts of the program.",
            "The CPU is the central processing unit that executes instructions and performs calculations in a computer.",
            "RAM is volatile memory that temporarily stores data and programs currently being used by the computer.",
            "Binary is a number system that uses only two digits, zero and one, to represent all values.",
            "Encryption is the process of converting data into a coded format to prevent unauthorized access.",
            "A protocol is a set of rules that govern how data is transmitted between devices on a network.",
            "Decomposition is the process of breaking down a complex problem into smaller, more manageable sub-problems.",
            "Abstraction involves hiding unnecessary details and showing only the essential features of an object or system.",
            "Debugging is the process of identifying, analyzing, and removing errors from computer programs.",
            "An IP address is a unique numerical identifier assigned to each device connected to a computer network.",
            "A firewall is a security system that monitors and controls incoming and outgoing network traffic."
        ],
        code: [
            "for i in range(10):\n    print(i)",
            "if score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")",
            "def calculate_area(length, width):\n    return length * width",
            "numbers = [1, 2, 3, 4, 5]\ntotal = sum(numbers)",
            "while count < 10:\n    count = count + 1",
            "name = input(\"Enter name: \")\nprint(\"Hello\", name)",
            "for item in shopping_list:\n    print(item)",
            "def is_even(number):\n    return number % 2 == 0",
            "try:\n    result = x / y\nexcept:\n    print(\"Error\")",
            "class Student:\n    def __init__(self, name):\n        self.name = name"
        ],
        mixed: [] // Will combine both
    },

    open: () => {
        const modal = document.createElement('div');
        modal.className = 'game-modal type-racer-modal';
        modal.id = 'type-racer-modal';
        modal.innerHTML = TypeRacer.renderMenu();
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    close: () => {
        const modal = document.getElementById('type-racer-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        TypeRacer.stopGame();
    },

    renderMenu: () => {
        const stats = TypeRacer.getStats();
        
        return `
            <div class="game-container type-racer-container">
                <button class="game-close-btn" onclick="TypeRacer.close()">✕</button>
                
                <div class="game-header">
                    <div class="game-icon">⌨️</div>
                    <h2>Type Racer</h2>
                    <p>Type CS definitions and code as fast as you can!</p>
                </div>
                
                <div class="tr-menu">
                    <div class="tr-stats-row">
                        <div class="tr-stat">
                            <span class="tr-stat-value">${stats.bestWpm || 0}</span>
                            <span class="tr-stat-label">Best WPM</span>
                        </div>
                        <div class="tr-stat">
                            <span class="tr-stat-value">${stats.avgAccuracy || 0}%</span>
                            <span class="tr-stat-label">Avg Accuracy</span>
                        </div>
                        <div class="tr-stat">
                            <span class="tr-stat-value">${stats.racesCompleted || 0}</span>
                            <span class="tr-stat-label">Races Done</span>
                        </div>
                    </div>
                    
                    <div class="tr-mode-select">
                        <label>Select Mode:</label>
                        <div class="tr-mode-buttons">
                            <button class="tr-mode-btn ${TypeRacer.mode === 'definitions' ? 'selected' : ''}"
                                    onclick="TypeRacer.selectMode('definitions')">
                                📝 Definitions
                            </button>
                            <button class="tr-mode-btn ${TypeRacer.mode === 'code' ? 'selected' : ''}"
                                    onclick="TypeRacer.selectMode('code')">
                                💻 Code
                            </button>
                            <button class="tr-mode-btn ${TypeRacer.mode === 'mixed' ? 'selected' : ''}"
                                    onclick="TypeRacer.selectMode('mixed')">
                                🎯 Mixed
                            </button>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-large tr-start-btn" onclick="TypeRacer.startGame()">
                        <span class="btn-icon">🏎️</span>
                        Start Race
                    </button>
                    
                    <div class="tr-tips">
                        <h4>💡 Tips</h4>
                        <ul>
                            <li>Focus on accuracy over speed at first</li>
                            <li>Code mode includes special characters</li>
                            <li>Use Tab for code indentation</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    selectMode: (mode) => {
        TypeRacer.mode = mode;
        document.querySelectorAll('.tr-mode-btn').forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
    },

    startGame: () => {
        // Get random text based on mode
        let textPool;
        if (TypeRacer.mode === 'mixed') {
            textPool = [...TypeRacer.texts.definitions, ...TypeRacer.texts.code];
        } else {
            textPool = TypeRacer.texts[TypeRacer.mode];
        }
        
        TypeRacer.currentText = shuffleArray([...textPool])[0];
        TypeRacer.typedText = '';
        TypeRacer.currentIndex = 0;
        TypeRacer.errors = 0;
        TypeRacer.wpm = 0;
        TypeRacer.accuracy = 100;
        TypeRacer.startTime = null;
        TypeRacer.isPlaying = true;
        
        const container = document.querySelector('.type-racer-container');
        container.innerHTML = TypeRacer.renderGame();
        
        // Focus input
        setTimeout(() => {
            document.getElementById('tr-input').focus();
        }, 100);
    },

    renderGame: () => {
        const displayText = TypeRacer.renderTextDisplay();
        
        return `
            <div class="tr-game-view">
                <div class="tr-game-header">
                    <div class="tr-stat-display">
                        <div class="tr-live-stat">
                            <span class="tr-ls-value" id="tr-wpm">0</span>
                            <span class="tr-ls-label">WPM</span>
                        </div>
                        <div class="tr-live-stat">
                            <span class="tr-ls-value" id="tr-accuracy">100%</span>
                            <span class="tr-ls-label">Accuracy</span>
                        </div>
                        <div class="tr-live-stat">
                            <span class="tr-ls-value" id="tr-time">0:00</span>
                            <span class="tr-ls-label">Time</span>
                        </div>
                    </div>
                </div>
                
                <div class="tr-progress-bar">
                    <div class="tr-progress-fill" id="tr-progress"></div>
                </div>
                
                <div class="tr-text-display" id="tr-text-display">
                    ${displayText}
                </div>
                
                <div class="tr-input-area">
                    <textarea 
                        id="tr-input" 
                        class="tr-input" 
                        placeholder="Start typing here..."
                        oninput="TypeRacer.handleInput(event)"
                        onkeydown="TypeRacer.handleKeyDown(event)"
                        autocomplete="off"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                    ></textarea>
                </div>
                
                <div class="tr-car-track">
                    <div class="tr-car player-car" id="tr-player-car">🏎️</div>
                    <div class="tr-finish-line">🏁</div>
                </div>
            </div>
        `;
    },

    renderTextDisplay: () => {
        return TypeRacer.currentText.split('').map((char, i) => {
            let className = '';
            if (i < TypeRacer.currentIndex) {
                className = TypeRacer.typedText[i] === char ? 'correct' : 'incorrect';
            } else if (i === TypeRacer.currentIndex) {
                className = 'current';
            }
            
            // Handle special characters
            let displayChar = char;
            if (char === '\n') displayChar = '↵\n';
            if (char === ' ' && className === 'incorrect') displayChar = '·';
            
            return `<span class="${className}">${displayChar}</span>`;
        }).join('');
    },

    handleInput: (event) => {
        if (!TypeRacer.isPlaying) return;
        
        // Start timer on first input
        if (!TypeRacer.startTime) {
            TypeRacer.startTime = Date.now();
            TypeRacer.startTimer();
        }
        
        const input = event.target.value;
        TypeRacer.typedText = input;
        TypeRacer.currentIndex = input.length;
        
        // Count errors
        let errors = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== TypeRacer.currentText[i]) {
                errors++;
            }
        }
        TypeRacer.errors = errors;
        
        // Update displays
        TypeRacer.updateDisplays();
        
        // Check completion
        if (input.length >= TypeRacer.currentText.length) {
            TypeRacer.endGame();
        }
    },

    handleKeyDown: (event) => {
        // Handle Tab for code indentation
        if (event.key === 'Tab') {
            event.preventDefault();
            const input = event.target;
            const start = input.selectionStart;
            input.value = input.value.substring(0, start) + '    ' + input.value.substring(input.selectionEnd);
            input.selectionStart = input.selectionEnd = start + 4;
            TypeRacer.handleInput({ target: input });
        }
    },

    updateDisplays: () => {
        // Update text display
        document.getElementById('tr-text-display').innerHTML = TypeRacer.renderTextDisplay();
        
        // Calculate WPM
        const timeElapsed = (Date.now() - TypeRacer.startTime) / 1000 / 60; // in minutes
        const wordsTyped = TypeRacer.currentIndex / 5; // standard: 5 chars = 1 word
        TypeRacer.wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        
        // Calculate accuracy
        const correctChars = TypeRacer.currentIndex - TypeRacer.errors;
        TypeRacer.accuracy = TypeRacer.currentIndex > 0 
            ? Math.round((correctChars / TypeRacer.currentIndex) * 100) 
            : 100;
        
        // Update stats display
        document.getElementById('tr-wpm').textContent = TypeRacer.wpm;
        document.getElementById('tr-accuracy').textContent = TypeRacer.accuracy + '%';
        
        // Update progress
        const progress = (TypeRacer.currentIndex / TypeRacer.currentText.length) * 100;
        document.getElementById('tr-progress').style.width = progress + '%';
        
        // Move car
        document.getElementById('tr-player-car').style.left = `calc(${progress}% - 20px)`;
    },

    startTimer: () => {
        TypeRacer.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - TypeRacer.startTime) / 1000);
            const mins = Math.floor(elapsed / 60);
            const secs = elapsed % 60;
            document.getElementById('tr-time').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        }, 1000);
    },

    stopGame: () => {
        TypeRacer.isPlaying = false;
        if (TypeRacer.timer) {
            clearInterval(TypeRacer.timer);
            TypeRacer.timer = null;
        }
    },

    endGame: () => {
        TypeRacer.stopGame();
        TypeRacer.endTime = Date.now();
        
        const totalTime = (TypeRacer.endTime - TypeRacer.startTime) / 1000;
        const finalWpm = Math.round((TypeRacer.currentText.length / 5) / (totalTime / 60));
        
        // Save stats
        TypeRacer.saveStats(finalWpm, TypeRacer.accuracy);
        
        // Award XP based on performance
        let xpEarned = Math.floor(finalWpm / 2);
        if (TypeRacer.accuracy === 100) xpEarned += 50;
        if (TypeRacer.mode === 'code') xpEarned += 25;
        AppState.addXP(xpEarned);
        
        // Achievements
        if (finalWpm >= 60) AppState.unlockAchievement('speed_typist');
        if (TypeRacer.accuracy === 100) AppState.unlockAchievement('perfect_accuracy');
        
        const container = document.querySelector('.type-racer-container');
        container.innerHTML = `
            <button class="game-close-btn" onclick="TypeRacer.close()">✕</button>
            
            <div class="tr-results">
                <div class="tr-result-banner">🏁 Race Complete! 🏁</div>
                
                <div class="tr-final-wpm">
                    <span class="tr-fw-value">${finalWpm}</span>
                    <span class="tr-fw-label">WPM</span>
                </div>
                
                <div class="tr-results-grid">
                    <div class="tr-result-item">
                        <span class="tr-ri-icon">🎯</span>
                        <span class="tr-ri-value">${TypeRacer.accuracy}%</span>
                        <span class="tr-ri-label">Accuracy</span>
                    </div>
                    <div class="tr-result-item">
                        <span class="tr-ri-icon">⏱️</span>
                        <span class="tr-ri-value">${totalTime.toFixed(1)}s</span>
                        <span class="tr-ri-label">Time</span>
                    </div>
                    <div class="tr-result-item">
                        <span class="tr-ri-icon">✗</span>
                        <span class="tr-ri-value">${TypeRacer.errors}</span>
                        <span class="tr-ri-label">Errors</span>
                    </div>
                    <div class="tr-result-item">
                        <span class="tr-ri-icon">⭐</span>
                        <span class="tr-ri-value">+${xpEarned}</span>
                        <span class="tr-ri-label">XP</span>
                    </div>
                </div>
                
                <div class="tr-rating">
                    ${TypeRacer.getRating(finalWpm, TypeRacer.accuracy)}
                </div>
                
                <div class="tr-results-actions">
                    <button class="btn btn-primary" onclick="TypeRacer.startGame()">
                        🔄 Race Again
                    </button>
                    <button class="btn btn-secondary" onclick="TypeRacer.close()">
                        Done
                    </button>
                </div>
            </div>
        `;
    },

    getRating: (wpm, accuracy) => {
        if (wpm >= 80 && accuracy >= 98) return '<span class="rating legendary">🏆 LEGENDARY</span>';
        if (wpm >= 60 && accuracy >= 95) return '<span class="rating master">⭐ MASTER</span>';
        if (wpm >= 45 && accuracy >= 90) return '<span class="rating expert">🎯 EXPERT</span>';
        if (wpm >= 30 && accuracy >= 85) return '<span class="rating good">👍 GOOD</span>';
        return '<span class="rating beginner">📝 KEEP PRACTICING</span>';
    },

    saveStats: (wpm, accuracy) => {
        const stats = TypeRacer.getStats();
        
        stats.racesCompleted = (stats.racesCompleted || 0) + 1;
        stats.bestWpm = Math.max(stats.bestWpm || 0, wpm);
        
        // Calculate rolling average accuracy
        const totalAcc = (stats.avgAccuracy || 0) * ((stats.racesCompleted - 1) || 0) + accuracy;
        stats.avgAccuracy = Math.round(totalAcc / stats.racesCompleted);
        
        localStorage.setItem('csmaster_typeracer_stats', JSON.stringify(stats));
    },

    getStats: () => {
        return JSON.parse(localStorage.getItem('csmaster_typeracer_stats') || '{}');
    }
};
