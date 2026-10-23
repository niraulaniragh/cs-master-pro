/**
 * TypeRacer.js - Typing Speed Challenge
 * Type out definitions, code snippets, and CS terms
 * Features: WPM tracking, accuracy, difficulty levels, racing visuals
 */

const TypeRacer = {
    isPlaying: false,
    currentText: '',
    typedText: '',
    startTime: null,
    endTime: null,
    timer: null,
    wpmTimer: null,
    ghostTimer: null,
    wpm: 0,
    accuracy: 100,
    errors: 0,
    currentIndex: 0,
    mode: 'definitions',
    difficulty: 'medium',
    isMobile: false,
    
    // New: Speed boost tracking
    lastWpm: 0,
    speedBoostActive: false,
    consecutiveFastChars: 0,
    
    // New: Ghost racer data
    ghostProgress: 0,
    bestTime: null,
    bestTextId: null,

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
        mixed: []
    },

    open: () => {
        TypeRacer.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || ('ontouchstart' in window) 
            || (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);

        const modal = document.createElement('div');
        modal.className = 'game-modal type-racer-modal';
        modal.id = 'type-racer-modal';
        modal.innerHTML = TypeRacer.renderMenu();
        document.body.appendChild(modal);
        
        // Inject enhanced styles
        TypeRacer.injectStyles();
        
        if (TypeRacer.isMobile) {
            document.body.style.overflow = 'hidden';
        }
        
        requestAnimationFrame(() => modal.classList.add('active'));
    },

    injectStyles: () => {
        if (document.getElementById('typeracer-enhanced-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'typeracer-enhanced-styles';
        styles.textContent = `
            /* Racing Track */
            .tr-race-track {
                position: relative;
                height: 120px;
                background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
                border-radius: 12px;
                margin: 1rem 0;
                overflow: hidden;
                border: 2px solid #333;
            }
            
            .tr-track-lanes {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            
            .tr-lane {
                position: absolute;
                left: 0;
                right: 0;
                height: 50px;
                display: flex;
                align-items: center;
                padding: 0 10px;
            }
            
            .tr-lane.player-lane {
                top: 10px;
                background: rgba(74, 144, 226, 0.1);
                border-bottom: 2px dashed rgba(255,255,255,0.2);
            }
            
            .tr-lane.ghost-lane {
                top: 60px;
                background: rgba(255, 193, 7, 0.1);
            }
            
            .tr-lane-label {
                position: absolute;
                left: 10px;
                font-size: 0.7rem;
                color: rgba(255,255,255,0.5);
                text-transform: uppercase;
            }
            
            /* Cars */
            .tr-car {
                position: absolute;
                font-size: 2rem;
                transition: left 0.15s ease-out;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
                z-index: 10;
            }
            
            .tr-car.player-car {
                top: 18px;
                left: 10px;
            }
            
            .tr-car.ghost-car {
                top: 68px;
                left: 10px;
                opacity: 0.6;
                filter: grayscale(50%) drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            }
            
            /* Speed Boost Animation */
            .tr-car.speed-boost {
                animation: carBoost 0.3s ease-out;
            }
            
            .tr-car.speed-boost::after {
                content: '💨';
                position: absolute;
                right: 100%;
                top: 50%;
                transform: translateY(-50%);
                font-size: 1.2rem;
                animation: boostTrail 0.5s ease-out forwards;
            }
            
            @keyframes carBoost {
                0%, 100% { transform: scale(1) translateY(0); }
                50% { transform: scale(1.2) translateY(-3px); }
            }
            
            @keyframes boostTrail {
                0% { opacity: 1; transform: translateY(-50%) translateX(0); }
                100% { opacity: 0; transform: translateY(-50%) translateX(-30px); }
            }
            
            /* Finish Line */
            .tr-finish-line {
                position: absolute;
                right: 15px;
                top: 0;
                bottom: 0;
                width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                background: repeating-linear-gradient(
                    0deg,
                    #000 0px,
                    #000 10px,
                    #fff 10px,
                    #fff 20px
                );
                opacity: 0.8;
            }
            
            .tr-finish-flag {
                position: absolute;
                right: 60px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 1.5rem;
            }
            
            /* Live Stats Bar */
            .tr-live-stats-bar {
                display: flex;
                justify-content: space-around;
                padding: 0.75rem;
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
                margin-bottom: 1rem;
            }
            
            .tr-live-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.5rem 1rem;
            }
            
            .tr-live-stat-value {
                font-size: 1.5rem;
                font-weight: bold;
                font-family: 'JetBrains Mono', monospace;
                transition: all 0.2s ease;
            }
            
            .tr-live-stat-label {
                font-size: 0.7rem;
                color: rgba(255,255,255,0.6);
                text-transform: uppercase;
            }
            
            /* WPM Colors */
            .tr-wpm-value { color: #4a90e2; }
            .tr-wpm-value.fast { color: #4ecdc4; }
            .tr-wpm-value.blazing { color: #f39c12; animation: wpmPulse 0.5s ease; }
            
            @keyframes wpmPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            /* Accuracy Indicator */
            .tr-accuracy-value {
                transition: color 0.3s ease;
            }
            .tr-accuracy-value.perfect { color: #2ecc71; }
            .tr-accuracy-value.good { color: #f1c40f; }
            .tr-accuracy-value.poor { color: #e74c3c; }
            
            .tr-accuracy-indicator {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: inline-block;
                margin-left: 5px;
                transition: background-color 0.3s ease;
            }
            .tr-accuracy-indicator.perfect { background: #2ecc71; box-shadow: 0 0 10px #2ecc71; }
            .tr-accuracy-indicator.good { background: #f1c40f; box-shadow: 0 0 10px #f1c40f; }
            .tr-accuracy-indicator.poor { background: #e74c3c; box-shadow: 0 0 10px #e74c3c; }
            
            /* Speed Boost Overlay */
            .tr-speed-boost-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            
            .tr-speed-boost-overlay.active {
                opacity: 1;
                animation: speedLines 0.5s ease-out;
            }
            
            @keyframes speedLines {
                0% {
                    background: radial-gradient(ellipse at center, transparent 0%, transparent 100%);
                }
                50% {
                    background: radial-gradient(ellipse at center, transparent 30%, rgba(74, 144, 226, 0.1) 70%, rgba(74, 144, 226, 0.2) 100%);
                }
                100% {
                    background: radial-gradient(ellipse at center, transparent 0%, transparent 100%);
                }
            }
            
            /* Celebration */
            .tr-celebration-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 1001;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .tr-celebration-text {
                font-size: 4rem;
                font-weight: bold;
                color: #fff;
                text-shadow: 0 0 20px rgba(255,215,0,0.8);
                animation: celebrateText 1s ease-out forwards;
            }
            
            @keyframes celebrateText {
                0% { transform: scale(0) rotate(-10deg); opacity: 0; }
                50% { transform: scale(1.2) rotate(5deg); opacity: 1; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            
            .tr-confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                animation: confettiFall 2s ease-out forwards;
            }
            
            @keyframes confettiFall {
                0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            
            /* Ghost best time display */
            .tr-ghost-info {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.8rem;
                color: rgba(255,255,255,0.6);
                margin-top: 0.5rem;
            }
            
            .tr-ghost-info span {
                color: #f1c40f;
            }
            
            /* Enhanced progress bar */
            .tr-progress-bar {
                position: relative;
                height: 8px;
                background: rgba(255,255,255,0.1);
                border-radius: 4px;
                margin-bottom: 1rem;
                overflow: hidden;
            }
            
            .tr-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4a90e2, #4ecdc4);
                border-radius: 4px;
                transition: width 0.1s ease-out;
                position: relative;
            }
            
            .tr-progress-fill.boosted {
                background: linear-gradient(90deg, #f39c12, #e74c3c);
                box-shadow: 0 0 10px rgba(243, 156, 18, 0.5);
            }
            
            /* Beat ghost indicator */
            .tr-beating-ghost {
                position: absolute;
                top: -20px;
                right: 0;
                font-size: 0.7rem;
                color: #2ecc71;
                animation: beatGhost 0.5s ease;
            }
            
            @keyframes beatGhost {
                0% { transform: translateY(10px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            
            /* New best time banner */
            .tr-new-best {
                background: linear-gradient(135deg, #f39c12, #e74c3c);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-weight: bold;
                animation: newBestPulse 1s ease infinite;
                margin-top: 0.5rem;
                display: inline-block;
            }
            
            @keyframes newBestPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(styles);
    },

    close: () => {
        const modal = document.getElementById('type-racer-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        TypeRacer.stopGame();
        
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
                            <li>Beat your ghost (previous best) to set new records!</li>
                            ${TypeRacer.isMobile ? '<li>Tap the input area to show keyboard</li>' : '<li>Use Tab for code indentation</li>'}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    selectMode: (mode, evt) => {
        if (evt) {
            evt.preventDefault();
        }
        
        TypeRacer.mode = mode;
        document.querySelectorAll('.tr-mode-btn').forEach(btn => btn.classList.remove('selected'));
        
        const targetBtn = evt?.target || document.querySelector(`.tr-mode-btn[onclick*="'${mode}'"]`);
        if (targetBtn) {
            targetBtn.classList.add('selected');
        }
    },

    startGame: () => {
        try {
            let textPool;
            if (TypeRacer.mode === 'mixed') {
                textPool = [...TypeRacer.texts.definitions, ...TypeRacer.texts.code];
            } else {
                textPool = TypeRacer.texts[TypeRacer.mode];
            }
            
            if (!textPool || textPool.length === 0) {
                if (typeof Toast !== 'undefined' && Toast?.show) {
                    Toast.show('No texts available for this mode', 'error');
                }
                return;
            }
            
            const shuffled = (typeof shuffleArray === 'function') 
                ? shuffleArray([...textPool]) 
                : [...textPool].sort(() => Math.random() - 0.5);
            TypeRacer.currentText = shuffled[0];
            TypeRacer.bestTextId = TypeRacer.currentText.substring(0, 50);
            TypeRacer.typedText = '';
            TypeRacer.currentIndex = 0;
            TypeRacer.errors = 0;
            TypeRacer.wpm = 0;
            TypeRacer.lastWpm = 0;
            TypeRacer.accuracy = 100;
            TypeRacer.startTime = null;
            TypeRacer.isPlaying = true;
            TypeRacer.speedBoostActive = false;
            TypeRacer.consecutiveFastChars = 0;
            TypeRacer.ghostProgress = 0;
            
            // Load ghost data for this text
            TypeRacer.loadGhostData();
            
            TypeRacer.clearTimer();
            
            const container = document.querySelector('.type-racer-container');
            if (!container) {
                console.error('TypeRacer container not found');
                return;
            }
            container.innerHTML = TypeRacer.renderGame();
            
            setTimeout(() => {
                const input = document.getElementById('tr-input');
                if (input) {
                    input.focus();
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

    loadGhostData: () => {
        try {
            const ghostData = JSON.parse(localStorage.getItem('csmaster_typeracer_ghost') || '{}');
            TypeRacer.bestTime = ghostData[TypeRacer.bestTextId] || null;
        } catch (e) {
            TypeRacer.bestTime = null;
        }
    },

    saveGhostData: (time) => {
        try {
            const ghostData = JSON.parse(localStorage.getItem('csmaster_typeracer_ghost') || '{}');
            if (!ghostData[TypeRacer.bestTextId] || time < ghostData[TypeRacer.bestTextId]) {
                ghostData[TypeRacer.bestTextId] = time;
                localStorage.setItem('csmaster_typeracer_ghost', JSON.stringify(ghostData));
                return true; // New best!
            }
            return false;
        } catch (e) {
            return false;
        }
    },

    renderGame: () => {
        const displayText = TypeRacer.renderTextDisplay();
        const hasGhost = TypeRacer.bestTime !== null;
        
        return `
            <div class="tr-game-view">
                <!-- Speed Boost Overlay -->
                <div class="tr-speed-boost-overlay" id="tr-speed-overlay"></div>
                
                <!-- Live Stats Bar -->
                <div class="tr-live-stats-bar">
                    <div class="tr-live-stat">
                        <span class="tr-live-stat-value tr-wpm-value" id="tr-wpm">0</span>
                        <span class="tr-live-stat-label">WPM</span>
                    </div>
                    <div class="tr-live-stat">
                        <span class="tr-live-stat-value tr-accuracy-value perfect" id="tr-accuracy">100%</span>
                        <span class="tr-accuracy-indicator perfect" id="tr-accuracy-dot"></span>
                        <span class="tr-live-stat-label">Accuracy</span>
                    </div>
                    <div class="tr-live-stat">
                        <span class="tr-live-stat-value" id="tr-time">0:00</span>
                        <span class="tr-live-stat-label">Time</span>
                    </div>
                </div>
                
                <!-- Racing Track with Cars -->
                <div class="tr-race-track">
                    <div class="tr-track-lanes">
                        <div class="tr-lane player-lane">
                            <span class="tr-lane-label">You</span>
                        </div>
                        <div class="tr-lane ghost-lane">
                            <span class="tr-lane-label">${hasGhost ? 'Ghost (Best: ' + TypeRacer.bestTime.toFixed(1) + 's)' : 'No ghost yet'}</span>
                        </div>
                    </div>
                    <div class="tr-car player-car" id="tr-player-car">🏎️</div>
                    <div class="tr-car ghost-car" id="tr-ghost-car">${hasGhost ? '👻' : ''}</div>
                    <div class="tr-finish-line"></div>
                    <span class="tr-finish-flag">🏁</span>
                </div>
                
                <!-- Progress Bar -->
                <div class="tr-progress-bar">
                    <div class="tr-progress-fill" id="tr-progress"></div>
                </div>
                
                <!-- Text Display -->
                <div class="tr-text-display" id="tr-text-display" ${TypeRacer.isMobile ? 'onclick="TypeRacer.focusInput()"' : ''}>
                    ${displayText}
                </div>
                
                <!-- Input Area -->
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
                const typedChar = TypeRacer.typedText?.[i];
                className = typedChar === char ? 'correct' : 'incorrect';
            } else if (i === TypeRacer.currentIndex) {
                className = 'current';
            }
            
            let displayChar = char;
            if (char === '\n') displayChar = '↵\n';
            if (char === ' ' && className === 'incorrect') displayChar = '·';
            
            return `<span class="${className}">${displayChar}</span>`;
        }).join('');
    },

    handlePaste: (event) => {
        event.preventDefault();
        if (typeof Toast !== 'undefined' && Toast?.show) {
            Toast.show('Pasting is disabled - type it out!', 'info');
        }
    },

    handleInput: (event) => {
        if (!TypeRacer.isPlaying) return;
        
        const input = event?.target?.value ?? '';
        const prevIndex = TypeRacer.currentIndex;
        
        // Start timer on first input
        if (!TypeRacer.startTime && input.length > 0) {
            TypeRacer.startTime = Date.now();
            TypeRacer.startTimer();
            TypeRacer.startWpmUpdater();
            if (TypeRacer.bestTime) {
                TypeRacer.startGhostRacer();
            }
        }
        
        const maxLength = TypeRacer.currentText?.length || 0;
        TypeRacer.typedText = input.substring(0, maxLength);
        TypeRacer.currentIndex = Math.min(input.length, maxLength);
        
        // Count errors
        let errors = 0;
        const textLength = TypeRacer.currentText?.length || 0;
        for (let i = 0; i < TypeRacer.currentIndex && i < textLength; i++) {
            if (TypeRacer.typedText[i] !== TypeRacer.currentText[i]) {
                errors++;
            }
        }
        TypeRacer.errors = errors;
        
        // Check for speed boost (fast consecutive correct typing)
        if (TypeRacer.currentIndex > prevIndex) {
            const lastCharCorrect = TypeRacer.typedText[TypeRacer.currentIndex - 1] === 
                                   TypeRacer.currentText[TypeRacer.currentIndex - 1];
            if (lastCharCorrect && TypeRacer.wpm >= 50) {
                TypeRacer.consecutiveFastChars++;
                if (TypeRacer.consecutiveFastChars >= 10 && !TypeRacer.speedBoostActive) {
                    TypeRacer.triggerSpeedBoost();
                }
            } else {
                TypeRacer.consecutiveFastChars = 0;
            }
        }
        
        TypeRacer.updateDisplays();
        
        // Check completion
        if (TypeRacer.currentIndex >= maxLength && maxLength > 0) {
            TypeRacer.endGame();
        }
    },

    triggerSpeedBoost: () => {
        TypeRacer.speedBoostActive = true;
        
        const playerCar = document.getElementById('tr-player-car');
        const speedOverlay = document.getElementById('tr-speed-overlay');
        const progressFill = document.getElementById('tr-progress');
        
        if (playerCar) {
            playerCar.classList.add('speed-boost');
            setTimeout(() => playerCar.classList.remove('speed-boost'), 300);
        }
        
        if (speedOverlay) {
            speedOverlay.classList.add('active');
            setTimeout(() => speedOverlay.classList.remove('active'), 500);
        }
        
        if (progressFill) {
            progressFill.classList.add('boosted');
            setTimeout(() => progressFill.classList.remove('boosted'), 500);
        }
        
        // Reset after a delay
        setTimeout(() => {
            TypeRacer.speedBoostActive = false;
            TypeRacer.consecutiveFastChars = 0;
        }, 1000);
    },

    handleKeyDown: (event) => {
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
        
        if (event.key === 'Escape') {
            TypeRacer.close();
        }
    },

    updateDisplays: () => {
        const textDisplay = document.getElementById('tr-text-display');
        const wpmDisplay = document.getElementById('tr-wpm');
        const accuracyDisplay = document.getElementById('tr-accuracy');
        const accuracyDot = document.getElementById('tr-accuracy-dot');
        const progressBar = document.getElementById('tr-progress');
        const playerCar = document.getElementById('tr-player-car');
        
        // Update text display
        if (textDisplay) {
            textDisplay.innerHTML = TypeRacer.renderTextDisplay();
        }
        
        // Calculate accuracy
        const correctChars = TypeRacer.currentIndex - TypeRacer.errors;
        TypeRacer.accuracy = TypeRacer.currentIndex > 0 
            ? Math.round((correctChars / TypeRacer.currentIndex) * 100) 
            : 100;
        
        // Update accuracy with color coding
        if (accuracyDisplay) {
            accuracyDisplay.textContent = TypeRacer.accuracy + '%';
            
            // Remove all classes first
            accuracyDisplay.classList.remove('perfect', 'good', 'poor');
            if (accuracyDot) accuracyDot.classList.remove('perfect', 'good', 'poor');
            
            // Add appropriate class
            let accuracyClass = 'poor';
            if (TypeRacer.accuracy >= 95) accuracyClass = 'perfect';
            else if (TypeRacer.accuracy >= 85) accuracyClass = 'good';
            
            accuracyDisplay.classList.add(accuracyClass);
            if (accuracyDot) accuracyDot.classList.add(accuracyClass);
        }
        
        // Update progress
        const textLength = TypeRacer.currentText?.length || 1;
        const progress = (TypeRacer.currentIndex / textLength) * 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        // Move player car
        if (playerCar) {
            const trackWidth = 85; // percentage of track available
            playerCar.style.left = `calc(${(progress / 100) * trackWidth}% + 10px)`;
        }
    },

    updateWpmDisplay: () => {
        if (!TypeRacer.startTime || !TypeRacer.isPlaying) return;
        
        const wpmDisplay = document.getElementById('tr-wpm');
        if (!wpmDisplay) return;
        
        const timeElapsed = (Date.now() - TypeRacer.startTime) / 1000 / 60;
        const wordsTyped = TypeRacer.currentIndex / 5;
        TypeRacer.wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        
        wpmDisplay.textContent = TypeRacer.wpm;
        
        // Remove previous classes
        wpmDisplay.classList.remove('fast', 'blazing');
        
        // Add WPM-based class
        if (TypeRacer.wpm >= 80) {
            wpmDisplay.classList.add('blazing');
        } else if (TypeRacer.wpm >= 50) {
            wpmDisplay.classList.add('fast');
        }
        
        // Trigger animation if WPM increased significantly
        if (TypeRacer.wpm > TypeRacer.lastWpm + 5) {
            wpmDisplay.style.animation = 'none';
            wpmDisplay.offsetHeight; // Trigger reflow
            wpmDisplay.style.animation = 'wpmPulse 0.3s ease';
        }
        TypeRacer.lastWpm = TypeRacer.wpm;
    },

    startWpmUpdater: () => {
        if (TypeRacer.wpmTimer) clearInterval(TypeRacer.wpmTimer);
        TypeRacer.wpmTimer = setInterval(() => {
            TypeRacer.updateWpmDisplay();
        }, 200); // Update WPM 5 times per second for smooth display
    },

    startGhostRacer: () => {
        if (!TypeRacer.bestTime || TypeRacer.ghostTimer) return;
        
        const textLength = TypeRacer.currentText?.length || 1;
        const updateInterval = 100; // ms
        const progressPerUpdate = (100 / TypeRacer.bestTime) * (updateInterval / 1000);
        
        TypeRacer.ghostTimer = setInterval(() => {
            if (!TypeRacer.isPlaying) {
                clearInterval(TypeRacer.ghostTimer);
                TypeRacer.ghostTimer = null;
                return;
            }
            
            TypeRacer.ghostProgress += progressPerUpdate;
            if (TypeRacer.ghostProgress > 100) TypeRacer.ghostProgress = 100;
            
            const ghostCar = document.getElementById('tr-ghost-car');
            if (ghostCar) {
                const trackWidth = 85;
                ghostCar.style.left = `calc(${(TypeRacer.ghostProgress / 100) * trackWidth}% + 10px)`;
            }
            
            // Stop ghost at finish
            if (TypeRacer.ghostProgress >= 100) {
                clearInterval(TypeRacer.ghostTimer);
                TypeRacer.ghostTimer = null;
            }
        }, updateInterval);
    },

    startTimer: () => {
        TypeRacer.clearTimer();
        
        TypeRacer.timer = setInterval(() => {
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
        if (TypeRacer.wpmTimer !== null) {
            clearInterval(TypeRacer.wpmTimer);
            TypeRacer.wpmTimer = null;
        }
        if (TypeRacer.ghostTimer !== null) {
            clearInterval(TypeRacer.ghostTimer);
            TypeRacer.ghostTimer = null;
        }
    },

    stopGame: () => {
        TypeRacer.isPlaying = false;
        TypeRacer.clearTimer();
    },

    triggerCelebration: (isNewBest) => {
        const overlay = document.createElement('div');
        overlay.className = 'tr-celebration-overlay';
        overlay.id = 'tr-celebration';
        
        // Create confetti
        const colors = ['#f39c12', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#1abc9c'];
        let confettiHTML = '';
        for (let i = 0; i < 50; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const size = 5 + Math.random() * 10;
            confettiHTML += `<div class="tr-confetti" style="
                left: ${left}%;
                background: ${color};
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${delay}s;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            "></div>`;
        }
        
        overlay.innerHTML = `
            ${confettiHTML}
            <div class="tr-celebration-text">
                ${isNewBest ? '🏆 NEW BEST! 🏆' : '🎉 FINISH! 🎉'}
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Remove after animation
        setTimeout(() => {
            overlay.remove();
        }, 2500);
    },

    endGame: () => {
        TypeRacer.stopGame();
        TypeRacer.endTime = Date.now();
        
        if (!TypeRacer.startTime) {
            TypeRacer.startTime = TypeRacer.endTime - 1000;
        }
        
        const totalTime = (TypeRacer.endTime - TypeRacer.startTime) / 1000;
        const textLength = TypeRacer.currentText?.length || 1;
        const finalWpm = totalTime > 0 
            ? Math.round((textLength / 5) / (totalTime / 60)) 
            : 0;
        
        // Check for new best time
        const isNewBest = TypeRacer.saveGhostData(totalTime);
        const beatGhost = TypeRacer.bestTime && totalTime < TypeRacer.bestTime;
        
        // Trigger celebration
        TypeRacer.triggerCelebration(isNewBest);
        
        // Save stats
        TypeRacer.saveStats(finalWpm, TypeRacer.accuracy);
        
        // Award XP
        let xpEarned = Math.floor(finalWpm / 2);
        if (TypeRacer.accuracy === 100) xpEarned += 50;
        if (TypeRacer.mode === 'code') xpEarned += 25;
        if (isNewBest) xpEarned += 30;
        
        if (typeof AppState !== 'undefined' && AppState?.addXP) {
            AppState.addXP(xpEarned);
        }
        
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
                
                ${isNewBest ? '<div class="tr-new-best">🎉 NEW PERSONAL BEST! 🎉</div>' : ''}
                ${beatGhost && !isNewBest ? '<div style="color: #2ecc71; margin-top: 0.5rem;">👻 You beat your ghost!</div>' : ''}
                
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
        TypeRacer.stopGame();
        TypeRacer.currentText = '';
        TypeRacer.typedText = '';
        TypeRacer.startTime = null;
        TypeRacer.endTime = null;
        TypeRacer.ghostProgress = 0;
        document.body.style.overflow = '';
        
        // Remove celebration overlay if exists
        const celebration = document.getElementById('tr-celebration');
        if (celebration) celebration.remove();
        
        console.log('⌨️ TypeRacer cleanup');
    }
};
