/**
 * helpers.js - Utility Functions
 * Common helper functions used throughout the application
 */

// ===========================================
// CONSOLIDATED CONSTANTS
// ===========================================

// XP thresholds for each level (index = level, value = XP needed to reach that level)
const XP_THRESHOLDS = [0, 0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000, 30000, 45000, 65000, 100000];

// Rank definitions based on level
const RANKS = [
    { minLevel: 1, name: 'Beginner', icon: '🌱', color: '#6b7280' },
    { minLevel: 2, name: 'Learner', icon: '📚', color: '#22d3ee' },
    { minLevel: 4, name: 'Intermediate', icon: '📈', color: '#22c55e' },
    { minLevel: 6, name: 'Advanced', icon: '🌟', color: '#3b82f6' },
    { minLevel: 8, name: 'Expert', icon: '💎', color: '#10b981' },
    { minLevel: 10, name: 'Master', icon: '👑', color: '#fbbf24' }
];

// Export for modules if needed
if (typeof window !== 'undefined') {
    window.XP_THRESHOLDS = XP_THRESHOLDS;
    window.RANKS = RANKS;
}

// ===========================================
// GLOBAL UTILITY FUNCTIONS
// ===========================================

// Global shuffleArray function (used by games)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Get XP required for a specific level
function getXPForLevel(level) {
    return XP_THRESHOLDS[level] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
}

// Get XP required for next level
function getXPForNextLevel(level) {
    return XP_THRESHOLDS[level + 1] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
}

// Get rank for a given level
function getRankForLevel(level) {
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (level >= RANKS[i].minLevel) {
            return RANKS[i];
        }
    }
    return RANKS[0];
}

// Calculate level from XP
function getLevelFromXP(xp) {
    for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= XP_THRESHOLDS[i]) {
            return i;
        }
    }
    return 1;
}

// ===========================================
// HELPERS OBJECT
// ===========================================

const Helpers = {
    // Array utilities
    shuffle: shuffleArray,
    shuffleArray: shuffleArray,
    
    // XP and Level utilities
    XP_THRESHOLDS,
    RANKS,
    getXPForLevel,
    getXPForNextLevel,
    getRankForLevel,
    getLevelFromXP,

    // Generate random ID
    generateId: (length = 9) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
    // Generate short code (for game/classroom codes)
    generateCode: (length = 6) => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid confusing chars like O, 0, I, 1
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format number with commas
    formatNumber: (num) => {
        if (num === null || num === undefined) return '0';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Format number with K/M suffixes
    formatCompact: (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },

    // Calculate percentage
    percentage: (value, total) => total === 0 ? 0 : Math.round((value / total) * 100),

    // Clamp number between min and max
    clamp: (num, min, max) => Math.min(Math.max(num, min), max),

    // Escape HTML
    escapeHtml: (str) => {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    // Unescape HTML
    unescapeHtml: (str) => {
        if (!str) return '';
        const div = document.createElement('div');
        div.innerHTML = str;
        return div.textContent;
    },

    // ===========================================
    // NUMBER BASE CONVERSIONS
    // ===========================================
    
    // Convert denary to binary
    denaryToBinary: (num, bits = 8) => {
        if (num < 0) return 'Error: Negative number';
        return num.toString(2).padStart(bits, '0');
    },

    // Convert binary to denary
    binaryToDenary: (binary) => {
        if (!/^[01]+$/.test(binary)) return NaN;
        return parseInt(binary, 2);
    },

    // Convert denary to hex
    denaryToHex: (num) => {
        if (num < 0) return 'Error: Negative number';
        return num.toString(16).toUpperCase();
    },

    // Convert hex to denary
    hexToDenary: (hex) => {
        if (!/^[0-9A-Fa-f]+$/.test(hex)) return NaN;
        return parseInt(hex, 16);
    },
    
    // Convert binary to hex
    binaryToHex: (binary) => {
        const denary = parseInt(binary, 2);
        return isNaN(denary) ? 'Error' : denary.toString(16).toUpperCase();
    },
    
    // Convert hex to binary
    hexToBinary: (hex, bits = 8) => {
        const denary = parseInt(hex, 16);
        return isNaN(denary) ? 'Error' : denary.toString(2).padStart(bits, '0');
    },

    // Binary addition
    binaryAdd: (a, b) => {
        const sum = parseInt(a, 2) + parseInt(b, 2);
        return sum.toString(2);
    },

    // Binary left shift
    leftShift: (binary, positions = 1) => {
        const num = parseInt(binary, 2);
        return (num << positions).toString(2);
    },

    // Binary right shift
    rightShift: (binary, positions = 1) => {
        const num = parseInt(binary, 2);
        return (num >> positions).toString(2);
    },

    // ===========================================
    // DATE/TIME UTILITIES
    // ===========================================
    
    // Sleep/delay function
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // Format date nicely
    formatDate: (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    },
    
    // Format time ago (e.g., "2 hours ago")
    timeAgo: (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
        
        return Helpers.formatDate(date);
    },
    
    // Format duration in mm:ss or hh:mm:ss
    formatDuration: (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    },

    // ===========================================
    // OBJECT UTILITIES
    // ===========================================
    
    // Deep clone object
    deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
    
    // Deep merge objects
    deepMerge: (target, source) => {
        const result = { ...target };
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = Helpers.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    },
    
    // Pick specific keys from object
    pick: (obj, keys) => {
        return keys.reduce((result, key) => {
            if (key in obj) result[key] = obj[key];
            return result;
        }, {});
    },
    
    // Omit specific keys from object
    omit: (obj, keys) => {
        const result = { ...obj };
        keys.forEach(key => delete result[key]);
        return result;
    },

    // ===========================================
    // DOM UTILITIES
    // ===========================================
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animate value change
    animateValue: (element, start, end, duration) => {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(start + (end - start) * progress);
            element.textContent = value;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    },
    
    // Smooth scroll to element
    scrollToElement: (element, offset = 0) => {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    },
    
    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            return success;
        }
    },
    
    // ===========================================
    // VALIDATION UTILITIES
    // ===========================================
    
    // Check if valid email
    isValidEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Check if string is empty or whitespace
    isEmpty: (str) => !str || str.trim().length === 0,
    
    // Validate binary string
    isValidBinary: (str) => /^[01]+$/.test(str),
    
    // Validate hex string
    isValidHex: (str) => /^[0-9A-Fa-f]+$/.test(str)
};

// Make global for compatibility
if (typeof window !== 'undefined') {
    window.Helpers = Helpers;
    window.shuffleArray = shuffleArray;
    window.getXPForLevel = getXPForLevel;
    window.getXPForNextLevel = getXPForNextLevel;
    window.getRankForLevel = getRankForLevel;
    window.getLevelFromXP = getLevelFromXP;
}

// ===========================================
// ANIMATION UTILITIES
// ===========================================

// Animated counter
Helpers.animateCounter = (element, start, end, duration = 1000, suffix = '') => {
    if (!element) return;
    const startTime = performance.now();
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeProgress);
        element.textContent = current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
};

// Confetti effect
Helpers.confetti = (options = {}) => {
    const defaults = { particleCount: 100, spread: 70, origin: { x: 0.5, y: 0.5 }, colors: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b', '#ef4444'] };
    const config = { ...defaults, ...options };
    const container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(container);
    
    for (let i = 0; i < config.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const size = Math.random() * 10 + 5;
        const left = config.origin.x * 100 + (Math.random() - 0.5) * config.spread;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        particle.style.cssText = `
            position:absolute;left:${left}%;top:${config.origin.y * 100}%;
            width:${size}px;height:${size}px;background:${color};
            transform:rotate(${rotation}deg);
            animation:confettiFall ${duration}s ease-out ${delay}s forwards;
        `;
        if (Math.random() > 0.5) particle.style.borderRadius = '50%';
        container.appendChild(particle);
    }
    setTimeout(() => container.remove(), 5000);
};

// Button ripple effect
Helpers.addRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    ripple.className = 'btn-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
};

// Auto-attach ripple to all buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (btn) Helpers.addRipple(e);
});
