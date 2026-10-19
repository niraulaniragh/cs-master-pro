/**
 * SoundEffects.js - UI Sound Effects
 * Plays sounds on interactions using Web Audio API
 */

const SoundFX = {
    enabled: true,
    volume: 0.3,
    audioContext: null,

    init: () => {
        // Create audio context on first user interaction
        document.addEventListener('click', () => {
            if (!SoundFX.audioContext) {
                SoundFX.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
        
        // Load preference
        const saved = localStorage.getItem('csmaster_sound');
        if (saved !== null) {
            SoundFX.enabled = saved === 'true';
        }
        
        console.log('🔊 Sound effects initialized');
    },

    toggle: () => {
        SoundFX.enabled = !SoundFX.enabled;
        localStorage.setItem('csmaster_sound', SoundFX.enabled);
        Toast.show(SoundFX.enabled ? '🔊 Sound ON' : '🔇 Sound OFF', 'info');
        if (SoundFX.enabled) SoundFX.play('click');
    },

    // Play a sound effect
    play: (type) => {
        if (!SoundFX.enabled || !SoundFX.audioContext) return;
        
        try {
            const ctx = SoundFX.audioContext;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            gainNode.gain.value = SoundFX.volume;
            
            switch (type) {
                case 'click':
                    // Short click sound
                    oscillator.frequency.value = 800;
                    oscillator.type = 'sine';
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.1);
                    break;
                    
                case 'hover':
                    // Soft hover
                    oscillator.frequency.value = 600;
                    oscillator.type = 'sine';
                    gainNode.gain.value = SoundFX.volume * 0.3;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.05);
                    break;
                    
                case 'tab':
                    // Tab switch - two tones
                    oscillator.frequency.value = 500;
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(500, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(700, ctx.currentTime + 0.05);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.15);
                    break;
                    
                case 'success':
                    // Success - ascending tones
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
                    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
                    oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.4);
                    break;
                    
                case 'error':
                    // Error - descending buzz
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
                    gainNode.gain.value = SoundFX.volume * 0.5;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.2);
                    break;
                    
                case 'correct':
                    // Correct answer - bright ding
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 880; // A5
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.2);
                    break;
                    
                case 'wrong':
                    // Wrong answer - low buzz
                    oscillator.type = 'square';
                    oscillator.frequency.value = 200;
                    gainNode.gain.value = SoundFX.volume * 0.4;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.15);
                    break;
                    
                case 'levelup':
                    // Level up - fanfare
                    const osc1 = ctx.createOscillator();
                    const osc2 = ctx.createOscillator();
                    const gain1 = ctx.createGain();
                    const gain2 = ctx.createGain();
                    
                    osc1.connect(gain1);
                    osc2.connect(gain2);
                    gain1.connect(ctx.destination);
                    gain2.connect(ctx.destination);
                    
                    osc1.type = 'sine';
                    osc2.type = 'sine';
                    
                    gain1.gain.value = SoundFX.volume;
                    gain2.gain.value = SoundFX.volume * 0.7;
                    
                    osc1.frequency.setValueAtTime(523, ctx.currentTime);
                    osc1.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
                    osc1.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
                    osc1.frequency.setValueAtTime(1047, ctx.currentTime + 0.45);
                    
                    osc2.frequency.setValueAtTime(392, ctx.currentTime);
                    osc2.frequency.setValueAtTime(523, ctx.currentTime + 0.15);
                    osc2.frequency.setValueAtTime(659, ctx.currentTime + 0.3);
                    osc2.frequency.setValueAtTime(784, ctx.currentTime + 0.45);
                    
                    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
                    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
                    
                    osc1.start(ctx.currentTime);
                    osc2.start(ctx.currentTime);
                    osc1.stop(ctx.currentTime + 0.7);
                    osc2.stop(ctx.currentTime + 0.7);
                    return; // Don't continue to default oscillator handling
                    
                case 'xp':
                    // XP gain - coin sound
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(1500, ctx.currentTime + 0.05);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.15);
                    break;
                    
                case 'combo':
                    // Combo - quick ascending
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.15);
                    break;
                    
                case 'start':
                    // Game start
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(550, ctx.currentTime + 0.1);
                    oscillator.frequency.setValueAtTime(660, ctx.currentTime + 0.2);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.35);
                    break;
                    
                case 'timer':
                    // Timer tick - urgent
                    oscillator.type = 'square';
                    oscillator.frequency.value = 440;
                    gainNode.gain.value = SoundFX.volume * 0.3;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.05);
                    break;
                    
                case 'powerup':
                    // Power-up - magical
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.2);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.3);
                    break;
                    
                case 'damage':
                    // Take damage
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.1);
                    gainNode.gain.value = SoundFX.volume * 0.5;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.2);
                    break;
                    
                case 'victory':
                    // Victory fanfare
                    const notes = [523, 523, 523, 659, 784, 659, 784];
                    const durations = [0.15, 0.15, 0.15, 0.3, 0.5, 0.15, 0.6];
                    let time = ctx.currentTime;
                    
                    notes.forEach((freq, i) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'sine';
                        osc.frequency.value = freq;
                        gain.gain.value = SoundFX.volume;
                        gain.gain.exponentialRampToValueAtTime(0.01, time + durations[i]);
                        osc.start(time);
                        osc.stop(time + durations[i]);
                        time += durations[i] * 0.8;
                    });
                    return;
                    
                case 'defeat':
                    // Defeat - sad trombone
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(392, ctx.currentTime);
                    oscillator.frequency.setValueAtTime(370, ctx.currentTime + 0.2);
                    oscillator.frequency.setValueAtTime(349, ctx.currentTime + 0.4);
                    oscillator.frequency.setValueAtTime(330, ctx.currentTime + 0.6);
                    gainNode.gain.value = SoundFX.volume * 0.4;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.9);
                    break;
                    
                case 'type':
                    // Typing sound
                    oscillator.type = 'square';
                    oscillator.frequency.value = 1000 + Math.random() * 200;
                    gainNode.gain.value = SoundFX.volume * 0.1;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.02);
                    break;
                    
                default:
                    // Default click
                    oscillator.frequency.value = 700;
                    oscillator.type = 'sine';
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.08);
            }
        } catch (e) {
            console.warn('Sound effect failed:', e);
        }
    }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', SoundFX.init);

// Add sound to common interactions
document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Buttons
    if (target.matches('button, .btn')) {
        if (target.classList.contains('btn-primary')) {
            SoundFX.play('click');
        } else {
            SoundFX.play('hover');
        }
    }
    
    // Nav links
    if (target.matches('.nav-link, .mode-tab, .tab-btn')) {
        SoundFX.play('tab');
    }
    
    // Game options
    if (target.matches('.sr-option, .bq-option, .boss-option, .mill-answer, .quiz-option')) {
        SoundFX.play('click');
    }
    
    // Challenge items
    if (target.matches('.challenge-item, .boss-card, .game-card, .difficulty-btn')) {
        SoundFX.play('click');
    }
});
