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
    isMobile: false,

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
        // Detect mobile device
        TypeRacer.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || ('ontouchstart' in window) 
            || (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);

        const modal = document.createElement('div');
        modal.className = 'game-modal type-racer-modal';
        modal.id = 'type-racer-modal';
        modal.innerHTML = TypeRacer.renderMenu();
        document.body.appendChild(modal);
        
        // Prevent background scrolling on mobile
        if (TypeRacer.isMobile) {
            document.body.style.overflow = 'hidden';
        }
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    close: () => {
        const modal = document.getElementById('type-racer-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        TypeRacer.stopGame();
        
        // Restore scrolling on mobile
        if (TypeRacer.isMobile) {
            document.body.style.overflow = '';
        }
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
                                    onclick="TypeRacer.selectMode('definitions', event)"
                                    ontouchend="TypeRacer.selectMode('definitions', event)">
                                📝 Definitions
                            </button>
                            <button class="tr-mode-btn ${TypeRacer.mode === 'code' ? 'selected' : ''}"
                                    onclick="TypeRacer.selectMode('code', event)"
                                    ontouchend="TypeRacer.selectMode('code', event)">
                                💻 Code
                            </button>
                            <button class="tr-mode-btn ${TypeRacer.mode === 'mixed' ? 'selected' : ''}"
                                    onclick="TypeRacer.selectMode('mixed', event)"
                                    ontouchend="TypeRacer.selectMode('mixed', event)">
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
                            ${TypeRacer.isMobile ? '<li>Tap the input area to show keyboard</li>' : '<li>Use Tab for code indentation</li>'}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    selectMode: (mode, evt) => {
        // Prevent double-firing on touch devices
        if (evt) {
            evt.preventDefault();
        }
        
        TypeRacer.mode = mode;
        document.querySelectorAll('.tr-mode-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Use evt parameter or find by mode
        const targetBtn = evt?.target || document.querySelector(`.tr-mode-btn[onclick*="'${mode}'"]`);
        if (targetBtn) {
            targetBtn.classList.add('selected');
        }
    },

    startGame: () => {
        try {
            // Get random text based on mode
            let textPool;
            if (TypeRacer.mode === 'mixed') {
                textPool = [...TypeRacer.texts.definitions, ...TypeRacer.texts.code];
            } else {
                textPool = TypeRacer.texts[TypeRacer.mode];
            }
            
            // Validate we have texts
            if (!textPool || textPool.length === 0) {
                if (typeof Toast !== 'undefined' && Toast?.show) {
                    Toast.show('No texts available for this mode', 'error');
                }
                return;
            }
            
            TypeRacer.currentText = shuffleArray([...textPool])[0];
            TypeRacer.typedText = '';
            TypeRacer.currentIndex = 0;
            TypeRacer.errors = 0;
            TypeRacer.wpm = 0;
            TypeRacer.accuracy = 100;
            TypeRacer.startTime = null;
            TypeRacer.isPlaying = true;
            
            // Clear any existing timer before starting
            TypeRacer.clearTimer();
            
            const container = document.querySelector('.type-racer-container');
            if (!container) {
                console.error('TypeRacer container not found');
                return;
            }
            container.innerHTML = TypeRacer.renderGame();
            
            // Focus input with mobile-friendly delay
            setTimeout(() => {
                const input = document.getElementById('tr-input');
                if (input) {
                    input.focus();
                    // On mobile, scroll input into view
                    if (TypeRacer.isMobile) {
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }, TypeRacer.isMobile ? 300 : 100);
        } catch (error) {
            console.error('TypeRacer.startGame error:', error);
            if (typeof Toast !== 'undefined' && Toast?.show) {
                Toast.show('Failed to start game', 'error');
            }
        }
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
                
                <div class="tr-text-display" id="tr-text-display" ${TypeRacer.isMobile ? 'onclick="TypeRacer.focusInput()"' : ''}>
                    ${displayText}
                </div>
                
                <div class="tr-input-area">
                    <textarea 
                        id="tr-input" 
                        class="tr-input" 
                        placeholder="${TypeRacer.isMobile ? 'Tap here to start typing...' : 'Start typing here...'}"
                        oninput="TypeRacer.handleInput(event)"
                        onkeydown="TypeRacer.handleKeyDown(event)"
                        onpaste="TypeRacer.handlePaste(event)"
                        onblur="TypeRacer.handleBlur(event)"
                        autocomplete="off"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        enterkeyhint="done"
                        inputmode="text"
                    ></textarea>
                    ${TypeRacer.isMobile ? '<div class="tr-mobile-hint">Tap above to show keyboard</div>' : ''}
                </div>
                
                <div class="tr-car-track">
                    <div class="tr-car player-car" id="tr-player-car">🏎️</div>
                    <div class="tr-finish-line">🏁</div>
                </div>
            </div>
        `;
    },

    focusInput: () => {
        const input = document.getElementById('tr-input');
        if (input) {
            input.focus();
        }
    },

    handleBlur: (event) => {
        // On mobile, show a hint to refocus if game is still playing
        if (TypeRacer.isMobile && TypeRacer.isPlaying) {
            const hint = document.querySelector('.tr-mobile-hint');
            if (hint) {
                hint.textContent = 'Tap to continue typing...';
                hint.classList.add('visible');
            }
        }
    },

    renderTextDisplay: () => {
        if (!TypeRacer.currentText) return '';
        
        return TypeRacer.currentText.split('').map((char, i) => {
            let className = '';
            if (i < TypeRacer.currentIndex) {
                // Safely check if typedText has this character
                const typedChar = TypeRacer.typedText?.[i];
                className = typedChar === char ? 'correct' : 'incorrect';
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

    handlePaste: (event) => {
        // Prevent pasting to ensure fair typing
        event.preventDefault();
        if (typeof Toast !== 'undefined' && Toast?.show) {
            Toast.show('Pasting is disabled - type it out!', 'info');
        }
    },

    handleInput: (event) => {
        if (!TypeRacer.isPlaying) return;
        
        const input = event?.target?.value ?? '';
        
        // Start timer on first input
        if (!TypeRacer.startTime && input.length > 0) {
            TypeRacer.startTime = Date.now();
            TypeRacer.startTimer();
        }
        
        // Limit input to text length to prevent overflow
        const maxLength = TypeRacer.currentText?.length || 0;
        TypeRacer.typedText = input.substring(0, maxLength);
        TypeRacer.currentIndex = Math.min(input.length, maxLength);
        
        // Count errors with bounds checking
        let errors = 0;
        const textLength = TypeRacer.currentText?.length || 0;
        for (let i = 0; i < TypeRacer.currentIndex && i < textLength; i++) {
            if (TypeRacer.typedText[i] !== TypeRacer.currentText[i]) {
                errors++;
            }
        }
        TypeRacer.errors = errors;
        
        // Update displays
        TypeRacer.updateDisplays();
        
        // Check completion
        if (TypeRacer.currentIndex >= maxLength && maxLength > 0) {
            TypeRacer.endGame();
        }
    },

    handleKeyDown: (event) => {
        // Handle Tab for code indentation
        if (event.key === 'Tab') {
            event.preventDefault();
            const input = event.target;
            if (!input) return;
            
            const start = input.selectionStart ?? 0;
            const end = input.selectionEnd ?? start;
            input.value = input.value.substring(0, start) + '    ' + input.value.substring(end);
            input.selectionStart = input.selectionEnd = start + 4;
            TypeRacer.handleInput({ target: input });
        }
        
        // Handle Escape to stop game
        if (event.key === 'Escape') {
            TypeRacer.close();
        }
    },

    updateDisplays: () => {
        // Null checks for all DOM elements
        const textDisplay = document.getElementById('tr-text-display');
        const wpmDisplay = document.getElementById('tr-wpm');
        const accuracyDisplay = document.getElementById('tr-accuracy');
        const progressBar = document.getElementById('tr-progress');
        const playerCar = document.getElementById('tr-player-car');
        
        // Update text display
        if (textDisplay) {
            textDisplay.innerHTML = TypeRacer.renderTextDisplay();
        }
        
        // Calculate WPM only if timer started
        if (TypeRacer.startTime) {
            const timeElapsed = (Date.now() - TypeRacer.startTime) / 1000 / 60; // in minutes
            const wordsTyped = TypeRacer.currentIndex / 5; // standard: 5 chars = 1 word
            TypeRacer.wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        }
        
        // Calculate accuracy
        const correctChars = TypeRacer.currentIndex - TypeRacer.errors;
        TypeRacer.accuracy = TypeRacer.currentIndex > 0 
            ? Math.round((correctChars / TypeRacer.currentIndex) * 100) 
            : 100;
        
        // Update stats display with null checks
        if (wpmDisplay) {
            wpmDisplay.textContent = TypeRacer.wpm;
        }
        if (accuracyDisplay) {
            accuracyDisplay.textContent = TypeRacer.accuracy + '%';
        }
        
        // Update progress
        const textLength = TypeRacer.currentText?.length || 1;
        const progress = (TypeRacer.currentIndex / textLength) * 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        // Move car with null check
        if (playerCar) {
            playerCar.style.left = `calc(${progress}% - 20px)`;
        }
    },

    startTimer: () => {
        // Clear any existing timer first
        TypeRacer.clearTimer();
        
        TypeRacer.timer = setInterval(() => {
            // Check if game is still playing and startTime exists
            if (!TypeRacer.isPlaying || !TypeRacer.startTime) {
                TypeRacer.clearTimer();
                return;
            }
            
            const timeDisplay = document.getElementById('tr-time');
            if (!timeDisplay) {
                TypeRacer.clearTimer();
                return;
            }
            
            const elapsed = Math.floor((Date.now() - TypeRacer.startTime) / 1000);
            const mins = Math.floor(elapsed / 60);
            const secs = elapsed % 60;
            timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        }, 1000);
    },

    clearTimer: () => {
        if (TypeRacer.timer !== null) {
            clearInterval(TypeRacer.timer);
            TypeRacer.timer = null;
        }
    },

    stopGame: () => {
        TypeRacer.isPlaying = false;
        TypeRacer.clearTimer();
    },

    endGame: () => {
        TypeRacer.stopGame();
        TypeRacer.endTime = Date.now();
        
        // Null check for startTime
        if (!TypeRacer.startTime) {
            TypeRacer.startTime = TypeRacer.endTime - 1000; // fallback: assume 1 second
        }
        
        const totalTime = (TypeRacer.endTime - TypeRacer.startTime) / 1000;
        const textLength = TypeRacer.currentText?.length || 1;
        const finalWpm = totalTime > 0 
            ? Math.round((textLength / 5) / (totalTime / 60)) 
            : 0;
        
        // Save stats
        TypeRacer.saveStats(finalWpm, TypeRacer.accuracy);
        
        // Award XP based on performance
        let xpEarned = Math.floor(finalWpm / 2);
        if (TypeRacer.accuracy === 100) xpEarned += 50;
        if (TypeRacer.mode === 'code') xpEarned += 25;
        
        // Null check for AppState
        if (typeof AppState !== 'undefined' && AppState?.addXP) {
            AppState.addXP(xpEarned);
        }
        
        // Achievements with null checks
        if (typeof AppState !== 'undefined' && AppState?.unlockAchievement) {
            if (finalWpm >= 60) AppState.unlockAchievement('speed_typist');
            if (TypeRacer.accuracy === 100) AppState.unlockAchievement('perfect_accuracy');
        }
        
        const container = document.querySelector('.type-racer-container');
        if (!container) {
            console.error('TypeRacer container not found for results');
            return;
        }
        
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
        try {
            const stats = TypeRacer.getStats();
            
            stats.racesCompleted = (stats.racesCompleted || 0) + 1;
            stats.bestWpm = Math.max(stats.bestWpm || 0, wpm);
            
            // Calculate rolling average accuracy
            const prevRaces = (stats.racesCompleted - 1) || 0;
            const totalAcc = (stats.avgAccuracy || 0) * prevRaces + accuracy;
            stats.avgAccuracy = Math.round(totalAcc / stats.racesCompleted);
            
            localStorage.setItem('csmaster_typeracer_stats', JSON.stringify(stats));
        } catch (error) {
            console.error('TypeRacer.saveStats error:', error);
        }
    },

    getStats: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_typeracer_stats') || '{}');
        } catch (error) {
            console.error('TypeRacer.getStats error:', error);
            return {};
        }
    },

    cleanup: () => {
        // Stop game and clear timer
        TypeRacer.stopGame();
        // Reset state
        TypeRacer.currentText = '';
        TypeRacer.typedText = '';
        TypeRacer.startTime = null;
        TypeRacer.endTime = null;
        // Restore scrolling
        document.body.style.overflow = '';
        console.log('⌨️ TypeRacer cleanup');
    }
};
