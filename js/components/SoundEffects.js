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

    init: () => {
        // Load preference
        const saved = localStorage.getItem('csmaster_sound');
        if (saved !== null) {
            SoundFX.enabled = saved === 'true';
        }
        
        // Don't create AudioContext here - wait for user interaction
        // Add one-time listener for user interaction
        const initOnInteraction = () => {
            if (!SoundFX.userInteracted) {
                SoundFX.userInteracted = true;
                SoundFX.ensureContext();
            }
        };
        
        // Listen for first user interaction
        document.addEventListener('click', initOnInteraction, { once: true });
        document.addEventListener('keydown', initOnInteraction, { once: true });
        document.addEventListener('touchstart', initOnInteraction, { once: true });
        
        console.log('🔊 Sound effects initialized (waiting for user interaction)');
    },

    ensureContext: () => {
        if (!SoundFX.audioContext && SoundFX.userInteracted) {
            try {
                SoundFX.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                SoundFX.initialized = true;
            } catch (e) {
                console.warn('Could not create audio context:', e);
            }
        }
        // Resume if suspended (browsers require user interaction)
        if (SoundFX.audioContext && SoundFX.audioContext.state === 'suspended') {
            SoundFX.audioContext.resume();
        }
        return SoundFX.audioContext;
    },

    toggle: () => {
        SoundFX.enabled = !SoundFX.enabled;
        localStorage.setItem('csmaster_sound', SoundFX.enabled);
        
        // Update button icon
        const btn = document.querySelector('.sound-toggle');
        if (btn) {
            btn.textContent = SoundFX.enabled ? '🔊' : '🔇';
        }
        
        if (typeof Toast !== 'undefined') {
            Toast.show(SoundFX.enabled ? '🔊 Sound ON' : '🔇 Sound OFF', 'info');
        }
        if (SoundFX.enabled) SoundFX.play('click');
    },

    // Play a sound effect
    play: (type) => {
        if (!SoundFX.enabled) return;
        
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
        } catch (e) {
            console.warn('Sound failed:', e);
        }
    },

    // Play simple tone(s)
    playTone: (frequencies, durations, waveform = 'sine', volume = 0.3) => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return;
        
        let time = ctx.currentTime;
        
        frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = waveform;
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(SoundFX.volume * volume, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + durations[i]);
            
            osc.start(time);
            osc.stop(time + durations[i] + 0.01);
            
            time += durations[i] * 0.7;
        });
    },

    // Play chord (multiple notes at once)
    playChord: (frequencies, duration, volume = 0.3) => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return;
        
        frequencies.forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(SoundFX.volume * volume / frequencies.length, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration + 0.01);
        });
    },

    // Play melody (notes in sequence)
    playMelody: (frequencies, durations, volume = 0.3, waveform = 'sine') => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return;
        
        let time = ctx.currentTime;
        
        frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = waveform;
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(SoundFX.volume * volume, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + durations[i]);
            
            osc.start(time);
            osc.stop(time + durations[i] + 0.01);
            
            time += durations[i] * 0.85;
        });
    },

    // Play frequency sweep
    playSweep: (startFreq, endFreq, duration, volume = 0.3) => {
        const ctx = SoundFX.audioContext;
        if (!ctx) return;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
        
        gain.gain.setValueAtTime(SoundFX.volume * volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration + 0.01);
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', SoundFX.init);
} else {
    SoundFX.init();
}

// Ensure audio context on first interaction
document.addEventListener('click', () => {
    SoundFX.ensureContext();
}, { once: true });

document.addEventListener('keydown', () => {
    SoundFX.ensureContext();
}, { once: true });

// Add automatic sounds to UI elements
document.addEventListener('click', (e) => {
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
