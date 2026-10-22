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
    intervalId: null,

    // Settings
    studyDuration: 25, // minutes
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLong: 4,
    completedSessions: 0,

    // Callbacks for external integrations
    onTick: null,
    onComplete: null,
    onStateChange: null,

    /**
     * Initialize timer
     */
    init: () => {
        try {
            const saved = StudyTimer.loadData();
            if (saved && typeof saved === 'object') {
                StudyTimer.completedSessions = Math.max(0, Number(saved.completedSessions) || 0);
            }
        } catch (error) {
            console.warn('StudyTimer: Error during initialization', error);
        }
    },

    /**
     * Load saved data
     * @returns {Object|null} Saved data or null
     */
    loadData: () => {
        try {
            const stored = localStorage.getItem(StudyTimer.STORAGE_KEY);
            if (!stored) return null;
            const parsed = JSON.parse(stored);
            return typeof parsed === 'object' ? parsed : null;
        } catch (error) {
            console.warn('StudyTimer: Error loading data', error);
            return null;
        }
    },

    /**
     * Save data
     * @returns {boolean} True if saved successfully
     */
    saveData: () => {
        try {
            const data = {
                completedSessions: StudyTimer.completedSessions,
                lastSession: new Date().toISOString()
            };
            localStorage.setItem(StudyTimer.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('StudyTimer: Error saving data', error);
            return false;
        }
    },

    /**
     * Format time as MM:SS
     * @param {number} seconds - Time in seconds
     * @returns {string} Formatted time string
     */
    formatTime: (seconds) => {
        const secs = Math.max(0, Math.floor(Number(seconds) || 0));
        const mins = Math.floor(secs / 60);
        const remainingSecs = secs % 60;
        return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
    },

    /**
     * Start timer
     * @returns {boolean} True if started successfully
     */
    start: () => {
        if (StudyTimer.isRunning) return false;

        try {
            StudyTimer.isRunning = true;
            StudyTimer.isPaused = false;

            // Clear any existing interval
            if (StudyTimer.intervalId) {
                clearInterval(StudyTimer.intervalId);
            }

            StudyTimer.intervalId = setInterval(() => {
                if (!StudyTimer.isPaused && StudyTimer.isRunning) {
                    StudyTimer.timeRemaining--;

                    // Call tick callback
                    if (typeof StudyTimer.onTick === 'function') {
                        StudyTimer.onTick(StudyTimer.timeRemaining);
                    }

                    StudyTimer.updateDisplay();

                    if (StudyTimer.timeRemaining <= 0) {
                        StudyTimer.complete();
                    }
                }
            }, 1000);

            StudyTimer.updateDisplay();

            // Notify state change
            if (typeof StudyTimer.onStateChange === 'function') {
                StudyTimer.onStateChange('started');
            }

            return true;

        } catch (error) {
            console.error('StudyTimer: Error starting timer', error);
            StudyTimer.isRunning = false;
            return false;
        }
    },

    /**
     * Pause timer
     */
    pause: () => {
        StudyTimer.isPaused = true;
        StudyTimer.updateDisplay();

        if (typeof StudyTimer.onStateChange === 'function') {
            StudyTimer.onStateChange('paused');
        }
    },

    /**
     * Resume timer
     */
    resume: () => {
        StudyTimer.isPaused = false;
        StudyTimer.updateDisplay();

        if (typeof StudyTimer.onStateChange === 'function') {
            StudyTimer.onStateChange('resumed');
        }
    },

    /**
     * Toggle pause/resume
     */
    togglePause: () => {
        if (StudyTimer.isPaused) {
            StudyTimer.resume();
        } else {
            StudyTimer.pause();
        }
    },

    /**
     * Stop timer and reset
     */
    stop: () => {
        try {
            // Clear interval
            if (StudyTimer.intervalId) {
                clearInterval(StudyTimer.intervalId);
                StudyTimer.intervalId = null;
            }

            StudyTimer.isRunning = false;
            StudyTimer.isPaused = false;
            StudyTimer.timeRemaining = StudyTimer.studyDuration * 60;
            StudyTimer.currentMode = 'study';
            StudyTimer.updateDisplay();

            if (typeof StudyTimer.onStateChange === 'function') {
                StudyTimer.onStateChange('stopped');
            }

        } catch (error) {
            console.error('StudyTimer: Error stopping timer', error);
        }
    },

    /**
     * Complete current session
     */
    complete: () => {
        try {
            // Clear interval
            if (StudyTimer.intervalId) {
                clearInterval(StudyTimer.intervalId);
                StudyTimer.intervalId = null;
            }

            StudyTimer.isRunning = false;

            if (StudyTimer.currentMode === 'study') {
                StudyTimer.completedSessions++;
                StudyTimer.saveData();

                // Award XP for completing a study session
                if (typeof AppState !== 'undefined' && AppState.addXP) {
                    AppState.addXP(25);
                }

                // Play notification
                StudyTimer.playNotification();

                // Check if time for long break
                const isLongBreak = StudyTimer.completedSessions % StudyTimer.sessionsBeforeLong === 0;

                if (typeof Toast !== 'undefined') {
                    Toast.show(
                        `🎉 Study session complete! ${isLongBreak ? 'Time for a long break!' : 'Take a short break!'}`,
                        'success'
                    );
                }

                // Switch to break mode
                StudyTimer.currentMode = 'break';
                StudyTimer.timeRemaining = (isLongBreak ? StudyTimer.longBreak : StudyTimer.shortBreak) * 60;

            } else {
                // Break complete
                if (typeof Toast !== 'undefined') {
                    Toast.show('⏰ Break over! Ready for another session?', 'info');
                }
                StudyTimer.currentMode = 'study';
                StudyTimer.timeRemaining = StudyTimer.studyDuration * 60;
            }

            StudyTimer.updateDisplay();

            // Call complete callback
            if (typeof StudyTimer.onComplete === 'function') {
                StudyTimer.onComplete(StudyTimer.currentMode);
            }

            if (typeof StudyTimer.onStateChange === 'function') {
                StudyTimer.onStateChange('completed');
            }

        } catch (error) {
            console.error('StudyTimer: Error completing session', error);
        }
    },

    /**
     * Play notification
     */
    playNotification: () => {
        try {
            // Browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('CS Master Pro', {
                    body: StudyTimer.currentMode === 'study'
                        ? 'Study session complete! Take a break.'
                        : 'Break is over! Ready to study?',
                    icon: '🎓',
                    tag: 'study-timer'
                });
            }

            // Play sound if available
            if (typeof SoundFX !== 'undefined' && SoundFX.play) {
                SoundFX.play('success');
            }

        } catch (error) {
            console.warn('StudyTimer: Error playing notification', error);
        }
    },

    /**
     * Request notification permission
     * @returns {Promise<boolean>} True if permission granted
     */
    requestNotificationPermission: async () => {
        try {
            if (!('Notification' in window)) {
                return false;
            }
            if (Notification.permission === 'granted') {
                return true;
            }
            if (Notification.permission === 'default') {
                const permission = await Notification.requestPermission();
                return permission === 'granted';
            }
            return false;
        } catch (error) {
            console.warn('StudyTimer: Error requesting notification permission', error);
            return false;
        }
    },

    /**
     * Update display elements
     */
    updateDisplay: () => {
        try {
            const timeEl = document.getElementById('timer-display');
            const statusEl = document.getElementById('timer-status');
            const progressEl = document.getElementById('timer-progress');
            const startBtn = document.getElementById('timer-start');
            const pauseBtn = document.getElementById('timer-pause');

            if (timeEl) {
                timeEl.textContent = StudyTimer.formatTime(StudyTimer.timeRemaining);
            }

            if (statusEl) {
                statusEl.textContent = StudyTimer.currentMode === 'study' ? '📚 Study Time' : '☕ Break Time';
                statusEl.className = `timer-status ${StudyTimer.currentMode}`;
            }

            if (progressEl) {
                const totalTime = StudyTimer.currentMode === 'study'
                    ? StudyTimer.studyDuration * 60
                    : (StudyTimer.completedSessions % StudyTimer.sessionsBeforeLong === 0
                        ? StudyTimer.longBreak : StudyTimer.shortBreak) * 60;
                const progress = totalTime > 0 ? ((totalTime - StudyTimer.timeRemaining) / totalTime) * 100 : 0;
                progressEl.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            }

            if (startBtn && pauseBtn) {
                if (!StudyTimer.isRunning) {
                    startBtn.style.display = 'inline-flex';
                    pauseBtn.style.display = 'none';
                } else {
                    startBtn.style.display = 'none';
                    pauseBtn.style.display = 'inline-flex';
                    pauseBtn.innerHTML = StudyTimer.isPaused
                        ? '<i class="fas fa-play"></i> Resume'
                        : '<i class="fas fa-pause"></i> Pause';
                }
            }

        } catch (error) {
            console.warn('StudyTimer: Error updating display', error);
        }
    },

    /**
     * Get current timer state
     * @returns {Object} Current state
     */
    getState: () => {
        return {
            isRunning: StudyTimer.isRunning,
            isPaused: StudyTimer.isPaused,
            timeRemaining: StudyTimer.timeRemaining,
            currentMode: StudyTimer.currentMode,
            completedSessions: StudyTimer.completedSessions,
            formattedTime: StudyTimer.formatTime(StudyTimer.timeRemaining)
        };
    },

    /**
     * Set custom durations
     * @param {Object} options - Duration options
     * @param {number} [options.study] - Study duration in minutes
     * @param {number} [options.shortBreak] - Short break duration in minutes
     * @param {number} [options.longBreak] - Long break duration in minutes
     * @param {number} [options.sessionsBeforeLong] - Sessions before long break
     */
    setDurations: (options = {}) => {
        if (options.study && typeof options.study === 'number' && options.study > 0) {
            StudyTimer.studyDuration = Math.min(120, options.study);
        }
        if (options.shortBreak && typeof options.shortBreak === 'number' && options.shortBreak > 0) {
            StudyTimer.shortBreak = Math.min(30, options.shortBreak);
        }
        if (options.longBreak && typeof options.longBreak === 'number' && options.longBreak > 0) {
            StudyTimer.longBreak = Math.min(60, options.longBreak);
        }
        if (options.sessionsBeforeLong && typeof options.sessionsBeforeLong === 'number' && options.sessionsBeforeLong > 0) {
            StudyTimer.sessionsBeforeLong = Math.min(10, options.sessionsBeforeLong);
        }

        // Reset time if not running
        if (!StudyTimer.isRunning) {
            StudyTimer.timeRemaining = StudyTimer.studyDuration * 60;
            StudyTimer.updateDisplay();
        }
    },

    /**
     * Render timer widget
     * @returns {string} HTML string
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
                    <button class="btn btn-secondary" id="timer-pause" style="display:none" onclick="StudyTimer.togglePause()">
                        <i class="fas fa-pause"></i> Pause
                    </button>
                    <button class="btn btn-secondary" onclick="StudyTimer.stop()">
                        <i class="fas fa-stop"></i> Reset
                    </button>
                </div>
                
                <div class="timer-info">
                    <p>🍅 Pomodoro Technique: ${StudyTimer.studyDuration} min study, ${StudyTimer.shortBreak} min break</p>
                    <p>Every ${StudyTimer.sessionsBeforeLong} sessions = ${StudyTimer.longBreak} min long break</p>
                </div>
            </div>
        `;
    },

    /**
     * Render mini timer for nav
     * @returns {string} HTML string
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
        if (typeof Modal !== 'undefined' && Modal.show) {
            Modal.show({
                title: 'Study Timer',
                content: StudyTimer.render()
            });
            StudyTimer.updateDisplay();
        }
    },

    /**
     * Cleanup and destroy timer
     */
    destroy: () => {
        if (StudyTimer.intervalId) {
            clearInterval(StudyTimer.intervalId);
            StudyTimer.intervalId = null;
        }
        StudyTimer.isRunning = false;
        StudyTimer.isPaused = false;
        StudyTimer.onTick = null;
        StudyTimer.onComplete = null;
        StudyTimer.onStateChange = null;
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    StudyTimer.init();
    StudyTimer.requestNotificationPermission();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (StudyTimer.intervalId) {
        clearInterval(StudyTimer.intervalId);
    }
});
