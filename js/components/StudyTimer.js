/**
 * StudyTimer.js - Pomodoro Study Timer
 * Helps students focus with timed study sessions
 */

const StudyTimer = {
    STORAGE_KEY: 'csmaster_timer',
    
    // Timer state
    isRunning: false,
    isPaused: false,
    timeRemaining: 25 * 60, // 25 minutes in seconds
    currentMode: 'study', // 'study' or 'break'
    interval: null,
    
    // Settings
    studyDuration: 25, // minutes
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLong: 4,
    completedSessions: 0,

    /**
     * Initialize timer
     */
    init: () => {
        const saved = StudyTimer.loadData();
        if (saved) {
            StudyTimer.completedSessions = saved.completedSessions || 0;
        }
    },

    /**
     * Load saved data
     */
    loadData: () => {
        try {
            return JSON.parse(localStorage.getItem(StudyTimer.STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    },

    /**
     * Save data
     */
    saveData: () => {
        const data = {
            completedSessions: StudyTimer.completedSessions,
            lastSession: new Date().toISOString()
        };
        localStorage.setItem(StudyTimer.STORAGE_KEY, JSON.stringify(data));
    },

    /**
     * Format time as MM:SS
     */
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Start timer
     */
    start: () => {
        if (StudyTimer.isRunning) return;
        
        StudyTimer.isRunning = true;
        StudyTimer.isPaused = false;
        
        StudyTimer.interval = setInterval(() => {
            if (!StudyTimer.isPaused) {
                StudyTimer.timeRemaining--;
                StudyTimer.updateDisplay();
                
                if (StudyTimer.timeRemaining <= 0) {
                    StudyTimer.complete();
                }
            }
        }, 1000);
        
        StudyTimer.updateDisplay();
    },

    /**
     * Pause timer
     */
    pause: () => {
        StudyTimer.isPaused = true;
        StudyTimer.updateDisplay();
    },

    /**
     * Resume timer
     */
    resume: () => {
        StudyTimer.isPaused = false;
        StudyTimer.updateDisplay();
    },

    /**
     * Stop timer
     */
    stop: () => {
        clearInterval(StudyTimer.interval);
        StudyTimer.isRunning = false;
        StudyTimer.isPaused = false;
        StudyTimer.timeRemaining = StudyTimer.studyDuration * 60;
        StudyTimer.currentMode = 'study';
        StudyTimer.updateDisplay();
    },

    /**
     * Complete current session
     */
    complete: () => {
        clearInterval(StudyTimer.interval);
        StudyTimer.isRunning = false;
        
        if (StudyTimer.currentMode === 'study') {
            StudyTimer.completedSessions++;
            StudyTimer.saveData();
            
            // Award XP for completing a study session
            AppState.addXP(25);
            
            // Play notification sound (if supported)
            StudyTimer.playNotification();
            
            // Check if time for long break
            const isLongBreak = StudyTimer.completedSessions % StudyTimer.sessionsBeforeLong === 0;
            
            Toast.show(
                `🎉 Study session complete! ${isLongBreak ? 'Time for a long break!' : 'Take a short break!'}`,
                'success'
            );
            
            // Switch to break mode
            StudyTimer.currentMode = 'break';
            StudyTimer.timeRemaining = (isLongBreak ? StudyTimer.longBreak : StudyTimer.shortBreak) * 60;
        } else {
            // Break complete
            Toast.show('⏰ Break over! Ready for another session?', 'info');
            StudyTimer.currentMode = 'study';
            StudyTimer.timeRemaining = StudyTimer.studyDuration * 60;
        }
        
        StudyTimer.updateDisplay();
    },

    /**
     * Play notification
     */
    playNotification: () => {
        // Browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('CS Master Pro', {
                body: StudyTimer.currentMode === 'study' ? 
                    'Study session complete! Take a break.' : 
                    'Break is over! Ready to study?',
                icon: '🎓'
            });
        }
    },

    /**
     * Request notification permission
     */
    requestNotificationPermission: () => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    },

    /**
     * Update display
     */
    updateDisplay: () => {
        const timeEl = document.getElementById('timer-display');
        const statusEl = document.getElementById('timer-status');
        const progressEl = document.getElementById('timer-progress');
        const startBtn = document.getElementById('timer-start');
        const pauseBtn = document.getElementById('timer-pause');
        
        if (timeEl) timeEl.textContent = StudyTimer.formatTime(StudyTimer.timeRemaining);
        
        if (statusEl) {
            statusEl.textContent = StudyTimer.currentMode === 'study' ? '📚 Study Time' : '☕ Break Time';
            statusEl.className = `timer-status ${StudyTimer.currentMode}`;
        }
        
        if (progressEl) {
            const totalTime = StudyTimer.currentMode === 'study' ? 
                StudyTimer.studyDuration * 60 : 
                (StudyTimer.completedSessions % StudyTimer.sessionsBeforeLong === 0 ? 
                    StudyTimer.longBreak : StudyTimer.shortBreak) * 60;
            const progress = ((totalTime - StudyTimer.timeRemaining) / totalTime) * 100;
            progressEl.style.width = `${progress}%`;
        }
        
        if (startBtn && pauseBtn) {
            if (!StudyTimer.isRunning) {
                startBtn.style.display = 'inline-flex';
                pauseBtn.style.display = 'none';
            } else {
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-flex';
                pauseBtn.innerHTML = StudyTimer.isPaused ? 
                    '<i class="fas fa-play"></i> Resume' : 
                    '<i class="fas fa-pause"></i> Pause';
            }
        }
    },

    /**
     * Render timer widget
     */
    render: () => {
        return `
            <div class="study-timer-widget">
                <div class="timer-header">
                    <h3>⏱️ Study Timer</h3>
                    <span class="timer-sessions">${StudyTimer.completedSessions} sessions today</span>
                </div>
                
                <div class="timer-circle">
                    <svg viewBox="0 0 100 100">
                        <circle class="timer-bg" cx="50" cy="50" r="45"/>
                        <circle class="timer-progress" id="timer-circle-progress" cx="50" cy="50" r="45"/>
                    </svg>
                    <div class="timer-content">
                        <div class="timer-display" id="timer-display">${StudyTimer.formatTime(StudyTimer.timeRemaining)}</div>
                        <div class="timer-status" id="timer-status">📚 Study Time</div>
                    </div>
                </div>
                
                <div class="timer-progress-bar">
                    <div class="timer-progress-fill" id="timer-progress"></div>
                </div>
                
                <div class="timer-controls">
                    <button class="btn btn-primary" id="timer-start" onclick="StudyTimer.start()">
                        <i class="fas fa-play"></i> Start
                    </button>
                    <button class="btn btn-secondary" id="timer-pause" style="display:none" onclick="StudyTimer.isPaused ? StudyTimer.resume() : StudyTimer.pause()">
                        <i class="fas fa-pause"></i> Pause
                    </button>
                    <button class="btn btn-secondary" onclick="StudyTimer.stop()">
                        <i class="fas fa-stop"></i> Reset
                    </button>
                </div>
                
                <div class="timer-info">
                    <p>🍅 Pomodoro Technique: 25 min study, 5 min break</p>
                    <p>Every 4 sessions = 15 min long break</p>
                </div>
            </div>
        `;
    },

    /**
     * Render mini timer for nav
     */
    renderMini: () => {
        if (!StudyTimer.isRunning) return '';
        
        return `
            <div class="mini-timer ${StudyTimer.currentMode}" onclick="StudyTimer.showFullTimer()">
                <span class="mini-timer-icon">${StudyTimer.currentMode === 'study' ? '📚' : '☕'}</span>
                <span class="mini-timer-time">${StudyTimer.formatTime(StudyTimer.timeRemaining)}</span>
            </div>
        `;
    },

    /**
     * Show full timer modal
     */
    showFullTimer: () => {
        Modal.show('Study Timer', StudyTimer.render());
        StudyTimer.updateDisplay();
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    StudyTimer.init();
    StudyTimer.requestNotificationPermission();
});
