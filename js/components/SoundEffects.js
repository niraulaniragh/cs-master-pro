/**
 * SoundEffects.js - Enhanced UI Sound Effects
 * Uses Web Audio API with better sounds that work reliably
 */

const SoundFX = {
    enabled: true,
    volume: 0.4,
    audioContext: null,
    initialized: false,
    userInteracted: false,
    activeNodes: new Set(), // Track active audio nodes for cleanup
    interactionListeners: [], // Track listeners for cleanup

    /**
     * Initialize sound system
     */
    init: () => {
        try {
            // Load preference from storage
            const saved = localStorage.getItem('csmaster_sound');
            if (saved !== null) {
                SoundFX.enabled = saved === 'true';
            }

            // Don't create AudioContext here - wait for user interaction
            SoundFX.setupInteractionListeners();

            console.log('🔊 Sound effects initialized (waiting for user interaction)');
        } catch (error) {
            console.warn('SoundFX: Error during initialization', error);
        }
    },

    /**
     * Setup one-time interaction listeners for audio context creation
     */
    setupInteractionListeners: () => {
        const initOnInteraction = () => {
            if (!SoundFX.userInteracted) {
                SoundFX.userInteracted = true;
                SoundFX.ensureContext();
            }
        };

        // Store listener references for cleanup
        const events = ['click', 'keydown', 'touchstart'];
        events.forEach(event => {
            const listener = { event, handler: initOnInteraction };
            document.addEventListener(event, initOnInteraction, { once: true, passive: true });
            SoundFX.interactionListeners.push(listener);
        });
    },

    /**
     * Ensure audio context is created and running
     * @returns {AudioContext|null} The audio context or null
     */
    ensureContext: () => {
        try {
            if (!SoundFX.audioContext && SoundFX.userInteracted) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (!AudioContextClass) {
                    console.warn('SoundFX: Web Audio API not supported');
                    return null;
                }
                SoundFX.audioContext = new AudioContextClass();
                SoundFX.initialized = true;
            }

            // Resume if suspended (browsers require user interaction)
            if (SoundFX.audioContext && SoundFX.audioContext.state === 'suspended') {
                SoundFX.audioContext.resume().catch(err => {
                    console.warn('SoundFX: Could not resume audio context', err);
                });
            }

            return SoundFX.audioContext;
        } catch (error) {
            console.warn('SoundFX: Could not create audio context', error);
            return null;
        }
    },

    /**
     * Toggle sound on/off
     */
    toggle: () => {
        SoundFX.enabled = !SoundFX.enabled;

        try {
            localStorage.setItem('csmaster_sound', String(SoundFX.enabled));
        } catch (e) {
            console.warn('SoundFX: Could not save preference', e);
        }

        // Update button icon
        const btn = document.querySelector('.sound-toggle');
        if (btn) {
            btn.textContent = SoundFX.enabled ? '🔊' : '🔇';
        }

        if (typeof Toast !== 'undefined' && Toast.show) {
            Toast.show(SoundFX.enabled ? '🔊 Sound ON' : '🔇 Sound OFF', 'info');
        }

        if (SoundFX.enabled) {
            SoundFX.play('click');
        }
    },

    /**
     * Set volume level
     * @param {number} level - Volume level between 0 and 1
     */
    setVolume: (level) => {
        const num = Number(level);
        if (isNaN(num)) return;
        SoundFX.volume = Math.max(0, Math.min(1, num));
    },

    /**
     * Validate sound type
     * @param {string} type - Sound type
     * @returns {boolean} True if valid
     */
    isValidType: (type) => {
        const validTypes = [
            'click', 'hover', 'tab', 'success', 'error', 'correct', 'wrong',
            'levelup', 'xp', 'combo', 'start', 'timer', 'powerup', 'damage',
            'victory', 'defeat', 'type', 'whoosh', 'pop', 'ding', 'streak'
        ];
        return validTypes.includes(type);
    },

    /**
     * Play a sound effect
     * @param {string} type - Sound effect type
     */
    play: (type) => {
        if (!SoundFX.enabled) return;
        if (!type || typeof type !== 'string') return;

        const ctx = SoundFX.ensureContext();
        if (!ctx) return;

        try {
            switch (type) {
                case 'click':
                    SoundFX.playTone([1200], [0.08], 'sine', 0.3);
                    break;
                case 'hover':
                    SoundFX.playTone([800], [0.04], 'sine', 0.15);
                    break;
                case 'tab':
                    SoundFX.playTone([600, 900], [0.06, 0.08], 'sine', 0.25);
                    break;
                case 'success':
                    SoundFX.playChord([523, 659, 784], 0.3, 0.35);
                    break;
                case 'error':
                    SoundFX.playTone([300, 200], [0.1, 0.15], 'sawtooth', 0.3);
                    break;
                case 'correct':
                    SoundFX.playTone([880, 1100], [0.08, 0.12], 'sine', 0.4);
                    break;
                case 'wrong':
                    SoundFX.playTone([250, 180], [0.08, 0.12], 'square', 0.25);
                    break;
                case 'levelup':
                    SoundFX.playMelody([523, 659, 784, 1047], [0.12, 0.12, 0.12, 0.25], 0.4);
                    break;
                case 'xp':
                    SoundFX.playTone([1400, 1800], [0.05, 0.08], 'sine', 0.35);
                    break;
                case 'combo':
                    SoundFX.playTone([500, 800, 1200], [0.04, 0.04, 0.08], 'sine', 0.35);
                    break;
                case 'start':
                    SoundFX.playMelody([440, 554, 659], [0.1, 0.1, 0.2], 0.4);
                    break;
                case 'timer':
                    SoundFX.playTone([600], [0.03], 'square', 0.2);
                    break;
                case 'powerup':
                    SoundFX.playSweep(400, 1600, 0.25, 0.4);
                    break;
                case 'damage':
                    SoundFX.playTone([350, 150], [0.08, 0.12], 'sawtooth', 0.35);
                    break;
                case 'victory':
                    SoundFX.playMelody([523, 659, 784, 1047, 784, 1047], [0.12, 0.12, 0.12, 0.2, 0.12, 0.35], 0.45);
                    break;
                case 'defeat':
                    SoundFX.playMelody([392, 349, 330, 294], [0.2, 0.2, 0.2, 0.4], 0.3, 'sawtooth');
                    break;
                case 'type':
                    SoundFX.playTone([900 + Math.random() * 300], [0.02], 'square', 0.08);
                    break;
                case 'whoosh':
                    SoundFX.playSweep(200, 800, 0.15, 0.25);
                    break;
                case 'pop':
                    SoundFX.playTone([1500, 800], [0.02, 0.06], 'sine', 0.3);
                    break;
                case 'ding':
                    SoundFX.playTone([1200], [0.15], 'sine', 0.4);
                    break;
                case 'streak':
                    SoundFX.playChord([659, 784, 988], 0.25, 0.4);
                    break;
                default:
                    SoundFX.playTone([800], [0.06], 'sine', 0.25);
            }
        } catch (error) {
            console.debug('SoundFX: Sound playback failed', error);
        }
    },

    /**
     * Create and track an oscillator/gain node pair
     * @param {OscillatorType} waveform - Oscillator type
     * @returns {Object|null} Object with osc and gain nodes, or null
     */
    createOscillatorGain: (waveform = 'sine') => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return null;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = waveform;

            // Track for potential cleanup
            const nodeData = { osc, gain };
            SoundFX.activeNodes.add(nodeData);

            // Auto-remove from tracking after sound completes
            osc.onended = () => {
                SoundFX.activeNodes.delete(nodeData);
            };

            return nodeData;
        } catch (error) {
            console.debug('SoundFX: Error creating oscillator', error);
            return null;
        }
    },

    /**
     * Play simple tone(s)
     * @param {number[]} frequencies - Array of frequencies in Hz
     * @param {number[]} durations - Array of durations in seconds
     * @param {OscillatorType} [waveform='sine'] - Waveform type
     * @param {number} [volume=0.3] - Volume multiplier
     */
    playTone: (frequencies, durations, waveform = 'sine', volume = 0.3) => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return;

        // Validate inputs
        if (!Array.isArray(frequencies) || !Array.isArray(durations)) return;
        if (frequencies.length === 0 || durations.length === 0) return;

        const validWaveforms = ['sine', 'square', 'sawtooth', 'triangle'];
        const safeWaveform = validWaveforms.includes(waveform) ? waveform : 'sine';
        const safeVolume = Math.max(0, Math.min(1, Number(volume) || 0.3));

        let time = ctx.currentTime;

        frequencies.forEach((freq, i) => {
            const duration = durations[i] || durations[0];
            if (typeof freq !== 'number' || typeof duration !== 'number') return;
            if (freq <= 0 || duration <= 0) return;

            const nodes = SoundFX.createOscillatorGain(safeWaveform);
            if (!nodes) return;

            const { osc, gain } = nodes;

            osc.frequency.value = freq;
            gain.gain.setValueAtTime(SoundFX.volume * safeVolume, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

            osc.start(time);
            osc.stop(time + duration + 0.01);

            time += duration * 0.7;
        });
    },

    /**
     * Play chord (multiple notes at once)
     * @param {number[]} frequencies - Array of frequencies in Hz
     * @param {number} duration - Duration in seconds
     * @param {number} [volume=0.3] - Volume multiplier
     */
    playChord: (frequencies, duration, volume = 0.3) => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return;

        if (!Array.isArray(frequencies) || frequencies.length === 0) return;
        if (typeof duration !== 'number' || duration <= 0) return;

        const safeVolume = Math.max(0, Math.min(1, Number(volume) || 0.3));
        const perNoteVolume = safeVolume / frequencies.length;

        frequencies.forEach(freq => {
            if (typeof freq !== 'number' || freq <= 0) return;

            const nodes = SoundFX.createOscillatorGain('sine');
            if (!nodes) return;

            const { osc, gain } = nodes;

            osc.frequency.value = freq;
            gain.gain.setValueAtTime(SoundFX.volume * perNoteVolume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration + 0.01);
        });
    },

    /**
     * Play melody (notes in sequence)
     * @param {number[]} frequencies - Array of frequencies in Hz
     * @param {number[]} durations - Array of durations in seconds
     * @param {number} [volume=0.3] - Volume multiplier
     * @param {OscillatorType} [waveform='sine'] - Waveform type
     */
    playMelody: (frequencies, durations, volume = 0.3, waveform = 'sine') => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return;

        if (!Array.isArray(frequencies) || !Array.isArray(durations)) return;
        if (frequencies.length === 0 || durations.length === 0) return;

        const validWaveforms = ['sine', 'square', 'sawtooth', 'triangle'];
        const safeWaveform = validWaveforms.includes(waveform) ? waveform : 'sine';
        const safeVolume = Math.max(0, Math.min(1, Number(volume) || 0.3));

        let time = ctx.currentTime;

        frequencies.forEach((freq, i) => {
            const duration = durations[i] || durations[0];
            if (typeof freq !== 'number' || typeof duration !== 'number') return;
            if (freq <= 0 || duration <= 0) return;

            const nodes = SoundFX.createOscillatorGain(safeWaveform);
            if (!nodes) return;

            const { osc, gain } = nodes;

            osc.frequency.value = freq;
            gain.gain.setValueAtTime(SoundFX.volume * safeVolume, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

            osc.start(time);
            osc.stop(time + duration + 0.01);

            time += duration * 0.85;
        });
    },

    /**
     * Play frequency sweep
     * @param {number} startFreq - Starting frequency in Hz
     * @param {number} endFreq - Ending frequency in Hz
     * @param {number} duration - Duration in seconds
     * @param {number} [volume=0.3] - Volume multiplier
     */
    playSweep: (startFreq, endFreq, duration, volume = 0.3) => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return;

        if (typeof startFreq !== 'number' || typeof endFreq !== 'number') return;
        if (typeof duration !== 'number' || duration <= 0) return;
        if (startFreq <= 0 || endFreq <= 0) return;

        const safeVolume = Math.max(0, Math.min(1, Number(volume) || 0.3));

        const nodes = SoundFX.createOscillatorGain('sine');
        if (!nodes) return;

        const { osc, gain } = nodes;

        osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

        gain.gain.setValueAtTime(SoundFX.volume * safeVolume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration + 0.01);
    },

    /**
     * Stop all active sounds
     */
    stopAll: () => {
        SoundFX.activeNodes.forEach(({ osc }) => {
            try {
                osc.stop();
            } catch (e) {
                // Already stopped
            }
        });
        SoundFX.activeNodes.clear();
    },

    /**
     * Cleanup and destroy sound system
     */
    destroy: () => {
        try {
            // Stop all active sounds
            SoundFX.stopAll();

            // Close audio context
            if (SoundFX.audioContext) {
                SoundFX.audioContext.close().catch(() => {});
                SoundFX.audioContext = null;
            }

            // Remove any remaining interaction listeners
            SoundFX.interactionListeners.forEach(({ event, handler }) => {
                document.removeEventListener(event, handler);
            });
            SoundFX.interactionListeners = [];

            SoundFX.initialized = false;
            SoundFX.userInteracted = false;
        } catch (error) {
            console.warn('SoundFX: Error during cleanup', error);
        }
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', SoundFX.init);
} else {
    SoundFX.init();
}

// Add automatic sounds to UI elements with delegation
document.addEventListener('click', (e) => {
    if (!SoundFX.enabled) return;

    const target = e.target.closest('button, .btn, .nav-link, .mode-tab, .tab-btn, .topic-card, .game-card, .challenge-item');
    if (!target) return;

    if (target.matches('.nav-link, .mode-tab, .tab-btn')) {
        SoundFX.play('tab');
    } else if (target.matches('.btn-primary')) {
        SoundFX.play('click');
    } else if (target.matches('.game-card, .challenge-item')) {
        SoundFX.play('pop');
    } else if (target.matches('.topic-card')) {
        SoundFX.play('whoosh');
    } else {
        SoundFX.play('hover');
    }
});
