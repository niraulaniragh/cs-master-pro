/**
 * helpers.js - Utility Functions
 * Common helper functions used throughout the application
 */

// ===========================================
// CONSOLIDATED CONSTANTS
// ===========================================

// XP thresholds for each level (index = level, value = XP needed to reach that level)
const XP_THRESHOLDS = Object.freeze([0, 0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 20000, 30000, 45000, 65000, 100000]);

// Rank definitions based on level
const RANKS = Object.freeze([
    { minLevel: 1, name: 'Beginner', icon: '🌱', color: '#6b7280' },
    { minLevel: 2, name: 'Learner', icon: '📚', color: '#22d3ee' },
    { minLevel: 4, name: 'Intermediate', icon: '📈', color: '#22c55e' },
    { minLevel: 6, name: 'Advanced', icon: '🌟', color: '#3b82f6' },
    { minLevel: 8, name: 'Expert', icon: '💎', color: '#10b981' },
    { minLevel: 10, name: 'Master', icon: '👑', color: '#fbbf24' }
]);

// ===========================================
// GLOBAL UTILITY FUNCTIONS
// ===========================================

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array (does not mutate original)
 */
function shuffleArray(array) {
    if (!Array.isArray(array)) {
        console.warn('shuffleArray: Input is not an array');
        return [];
    }
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Get XP required for a specific level
 * @param {number} level - Level number
 * @returns {number} XP required for level
 */
function getXPForLevel(level) {
    const lvl = Math.max(0, Math.floor(Number(level) || 0));
    if (lvl < XP_THRESHOLDS.length) {
        return XP_THRESHOLDS[lvl];
    }
    return XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
}

/**
 * Get XP required for next level
 * @param {number} level - Current level
 * @returns {number} XP required for next level
 */
function getXPForNextLevel(level) {
    const lvl = Math.max(0, Math.floor(Number(level) || 0));
    const nextLvl = Math.min(lvl + 1, XP_THRESHOLDS.length - 1);
    return XP_THRESHOLDS[nextLvl];
}

/**
 * Get rank for a given level
 * @param {number} level - Level number
 * @returns {Object} Rank object with name, icon, color
 */
function getRankForLevel(level) {
    const lvl = Math.max(1, Math.floor(Number(level) || 1));
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (lvl >= RANKS[i].minLevel) {
            return { ...RANKS[i] }; // Return copy
        }
    }
    return { ...RANKS[0] };
}

/**
 * Calculate level from XP amount
 * @param {number} xp - XP amount
 * @returns {number} Level number
 */
function getLevelFromXP(xp) {
    const xpAmount = Math.max(0, Math.floor(Number(xp) || 0));
    for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xpAmount >= XP_THRESHOLDS[i]) {
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

    /**
     * Shuffle question options while tracking the correct answer
     * @param {Object} question - Question object with options and answer properties
     * @returns {Object} New question with shuffled options and updated answer index
     */
    shuffleOptions: (question) => {
        if (!question || !question.options) return question;
        
        // Create array of {option, originalIndex}
        const indexed = question.options.map((opt, i) => ({ opt, i }));
        
        // Fisher-Yates shuffle
        for (let i = indexed.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
        }
        
        // Find where correct answer ended up
        const newAnswer = indexed.findIndex(item => item.i === question.answer);
        
        return {
            ...question,
            options: indexed.map(item => item.opt),
            answer: newAnswer
        };
    },

    // XP and Level utilities (expose as properties and reference functions)
    XP_THRESHOLDS,
    RANKS,
    getXPForLevel,
    getXPForNextLevel,
    getRankForLevel,
    getLevelFromXP,

    /**
     * Generate random alphanumeric ID
     * @param {number} [length=9] - Length of ID
     * @returns {string} Generated ID
     */
    generateId: (length = 9) => {
        const len = Math.max(1, Math.min(32, Math.floor(Number(length) || 9)));
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    /**
     * Generate short code (for game/classroom codes)
     * Avoids confusing characters like O, 0, I, 1
     * @param {number} [length=6] - Length of code
     * @returns {string} Generated code
     */
    generateCode: (length = 6) => {
        const len = Math.max(1, Math.min(12, Math.floor(Number(length) || 6)));
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    /**
     * Create debounced version of function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce: (func, wait) => {
        if (typeof func !== 'function') {
            console.warn('Helpers.debounce: First argument must be a function');
            return () => {};
        }
        const waitTime = Math.max(0, Number(wait) || 0);
        let timeout = null;

        const debounced = function (...args) {
            const later = () => {
                timeout = null;
                func.apply(this, args);
            };
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(later, waitTime);
        };

        debounced.cancel = () => {
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
            }
        };

        return debounced;
    },

    /**
     * Create throttled version of function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Minimum time between calls in milliseconds
     * @returns {Function} Throttled function
     */
    throttle: (func, limit) => {
        if (typeof func !== 'function') {
            console.warn('Helpers.throttle: First argument must be a function');
            return () => {};
        }
        const limitTime = Math.max(0, Number(limit) || 0);
        let inThrottle = false;
        let lastArgs = null;
        let lastThis = null;

        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                    if (lastArgs) {
                        func.apply(lastThis, lastArgs);
                        lastArgs = null;
                        lastThis = null;
                    }
                }, limitTime);
            } else {
                lastArgs = args;
                lastThis = this;
            }
        };
    },

    /**
     * Format number with locale-aware thousand separators
     * @param {number} num - Number to format
     * @returns {string} Formatted number string
     */
    formatNumber: (num) => {
        const n = Number(num);
        if (isNaN(n)) return '0';
        try {
            return n.toLocaleString();
        } catch (e) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    },

    /**
     * Format number with K/M suffixes for compact display
     * @param {number} num - Number to format
     * @returns {string} Compact formatted number
     */
    formatCompact: (num) => {
        const n = Number(num);
        if (isNaN(n)) return '0';
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return n.toString();
    },

    /**
     * Calculate percentage
     * @param {number} value - Part value
     * @param {number} total - Total value
     * @returns {number} Percentage (0-100), returns 0 for invalid/zero/negative total
     */
    percentage: (value, total) => {
        const v = Number(value) || 0;
        const t = Number(total);
        if (t <= 0 || isNaN(t)) return 0;
        return Math.round((v / t) * 100);
    },

    /**
     * Clamp number between min and max
     * @param {number} num - Number to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped value
     */
    clamp: (num, min, max) => {
        const n = Number(num) || 0;
        let minVal = Number(min) || 0;
        let maxVal = Number(max) || 0;
        // Swap if min > max
        if (minVal > maxVal) {
            [minVal, maxVal] = [maxVal, minVal];
        }
        return Math.min(Math.max(n, minVal), maxVal);
    },

    /**
     * Escape HTML special characters to prevent XSS
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeHtml: (str) => {
        if (str === null || str === undefined) return '';
        const text = String(str);
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Unescape HTML entities
     * @param {string} str - String to unescape
     * @returns {string} Unescaped string
     */
    unescapeHtml: (str) => {
        if (str === null || str === undefined) return '';
        const text = String(str);
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent || '';
    },

    // ===========================================
    // NUMBER BASE CONVERSIONS
    // ===========================================

    /**
     * Convert denary (decimal) to binary
     * @param {number} num - Denary number
     * @param {number} [bits=8] - Number of bits for padding
     * @returns {string} Binary string
     */
    denaryToBinary: (num, bits = 8) => {
        const n = parseInt(num);
        if (isNaN(n) || n < 0) return 'Error: Invalid or negative number';
        const b = Math.max(1, Math.min(32, Math.floor(Number(bits) || 8)));
        return n.toString(2).padStart(b, '0');
    },

    /**
     * Convert binary to denary (decimal)
     * @param {string} binary - Binary string
     * @returns {number|NaN} Denary number or NaN if invalid
     */
    binaryToDenary: (binary) => {
        if (!binary || typeof binary !== 'string' || !/^[01]+$/.test(binary)) {
            return NaN;
        }
        return parseInt(binary, 2);
    },

    /**
     * Convert denary (decimal) to hexadecimal
     * @param {number} num - Denary number
     * @returns {string} Hexadecimal string (uppercase)
     */
    denaryToHex: (num) => {
        const n = parseInt(num);
        if (isNaN(n) || n < 0) return 'Error: Invalid or negative number';
        return n.toString(16).toUpperCase();
    },

    /**
     * Convert hexadecimal to denary (decimal)
     * @param {string} hex - Hexadecimal string
     * @returns {number|NaN} Denary number or NaN if invalid
     */
    hexToDenary: (hex) => {
        if (!hex || typeof hex !== 'string' || !/^[0-9A-Fa-f]+$/.test(hex)) {
            return NaN;
        }
        return parseInt(hex, 16);
    },

    /**
     * Convert binary to hexadecimal
     * @param {string} binary - Binary string
     * @returns {string} Hexadecimal string or error message
     */
    binaryToHex: (binary) => {
        const denary = Helpers.binaryToDenary(binary);
        if (isNaN(denary)) return 'Error: Invalid binary';
        return denary.toString(16).toUpperCase();
    },

    /**
     * Convert hexadecimal to binary
     * @param {string} hex - Hexadecimal string
     * @param {number} [bits=8] - Number of bits for padding
     * @returns {string} Binary string or error message
     */
    hexToBinary: (hex, bits = 8) => {
        const denary = Helpers.hexToDenary(hex);
        if (isNaN(denary)) return 'Error: Invalid hex';
        const b = Math.max(1, Math.min(32, Math.floor(Number(bits) || 8)));
        return denary.toString(2).padStart(b, '0');
    },

    /**
     * Add two binary numbers
     * @param {string} a - First binary number
     * @param {string} b - Second binary number
     * @returns {string} Sum in binary or error message
     */
    binaryAdd: (a, b) => {
        const numA = Helpers.binaryToDenary(a);
        const numB = Helpers.binaryToDenary(b);
        if (isNaN(numA) || isNaN(numB)) return 'Error: Invalid binary';
        return (numA + numB).toString(2);
    },

    /**
     * Binary left shift
     * @param {string} binary - Binary string
     * @param {number} [positions=1] - Number of positions to shift (max 31)
     * @returns {string} Shifted binary or error message
     */
    leftShift: (binary, positions = 1) => {
        const num = Helpers.binaryToDenary(binary);
        if (isNaN(num)) return 'Error: Invalid binary';
        const pos = Math.max(0, Math.min(31, Math.floor(Number(positions) || 1)));
        return (num << pos).toString(2);
    },

    /**
     * Binary right shift
     * @param {string} binary - Binary string
     * @param {number} [positions=1] - Number of positions to shift (max 31)
     * @returns {string} Shifted binary or error message
     */
    rightShift: (binary, positions = 1) => {
        const num = Helpers.binaryToDenary(binary);
        if (isNaN(num)) return 'Error: Invalid binary';
        const pos = Math.max(0, Math.min(31, Math.floor(Number(positions) || 1)));
        return (num >> pos).toString(2);
    },

    // ===========================================
    // DATE/TIME UTILITIES
    // ===========================================

    /**
     * Sleep/delay utility (use with await)
     * @param {number} ms - Milliseconds to sleep
     * @returns {Promise} Promise that resolves after delay
     */
    sleep: (ms) => new Promise(resolve => {
        const delay = Math.max(0, Number(ms) || 0);
        setTimeout(resolve, delay);
    }),

    /**
     * Format date in a readable format
     * @param {Date|string|number} date - Date to format
     * @returns {string} Formatted date string
     */
    formatDate: (date) => {
        try {
            const d = new Date(date);
            if (isNaN(d.getTime())) return 'Invalid date';
            return d.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch (e) {
            return 'Invalid date';
        }
    },

    /**
     * Format time as relative (e.g., "2 hours ago")
     * @param {Date|string|number} date - Date to format
     * @returns {string} Relative time string
     */
    timeAgo: (date) => {
        try {
            const d = new Date(date);
            if (isNaN(d.getTime())) return 'Unknown';

            const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

            if (seconds < 0) return 'just now';
            if (seconds < 60) return 'just now';
            
            const minutes = Math.floor(seconds / 60);
            if (seconds < 3600) return minutes === 1 ? '1 min ago' : minutes + ' mins ago';
            
            const hours = Math.floor(seconds / 3600);
            if (seconds < 86400) return hours === 1 ? '1 hour ago' : hours + ' hours ago';
            
            const days = Math.floor(seconds / 86400);
            if (seconds < 604800) return days === 1 ? '1 day ago' : days + ' days ago';

            return Helpers.formatDate(date);
        } catch (e) {
            return 'Unknown';
        }
    },

    /**
     * Format duration in mm:ss or hh:mm:ss
     * @param {number} seconds - Duration in seconds
     * @returns {string} Formatted duration string
     */
    formatDuration: (seconds) => {
        const secs = Math.max(0, Math.floor(Number(seconds) || 0));
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    },

    // ===========================================
    // OBJECT UTILITIES
    // ===========================================

    /**
     * Deep clone an object using JSON serialization
     * Note: Does not preserve functions, undefined, or circular references
     * @param {*} obj - Object to clone
     * @returns {*} Cloned object
     */
    deepClone: (obj) => {
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (e) {
            console.warn('Helpers.deepClone: Clone failed', e);
            return obj;
        }
    },

    /**
     * Deep merge two objects
     * @param {Object} target - Target object
     * @param {Object} source - Source object to merge
     * @param {number} [maxDepth=10] - Maximum recursion depth
     * @returns {Object} Merged object (new object, does not mutate inputs)
     */
    deepMerge: (target, source, maxDepth = 10) => {
        const merge = (t, s, depth, seen) => {
            if (depth > maxDepth) {
                console.warn('Helpers.deepMerge: Max depth exceeded');
                return s;
            }
            if (!t || typeof t !== 'object') return s || {};
            if (!s || typeof s !== 'object') return t;
            
            // Circular reference check
            if (seen.has(s)) {
                console.warn('Helpers.deepMerge: Circular reference detected');
                return t;
            }
            seen.add(s);

            const result = { ...t };
            for (const key in s) {
                if (Object.prototype.hasOwnProperty.call(s, key)) {
                    if (s[key] && typeof s[key] === 'object' && !Array.isArray(s[key])) {
                        result[key] = merge(result[key], s[key], depth + 1, seen);
                    } else {
                        result[key] = s[key];
                    }
                }
            }
            return result;
        };
        return merge(target, source, 0, new WeakSet());
    },

    /**
     * Pick specific keys from object
     * @param {Object} obj - Source object
     * @param {Array<string>} keys - Keys to pick
     * @returns {Object} New object with only specified keys
     */
    pick: (obj, keys) => {
        if (!obj || typeof obj !== 'object') return {};
        if (!Array.isArray(keys)) return {};

        return keys.reduce((result, key) => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = obj[key];
            }
            return result;
        }, {});
    },

    /**
     * Omit specific keys from object
     * @param {Object} obj - Source object
     * @param {Array<string>} keys - Keys to omit
     * @returns {Object} New object without specified keys
     */
    omit: (obj, keys) => {
        if (!obj || typeof obj !== 'object') return {};
        if (!Array.isArray(keys)) return { ...obj };

        const result = { ...obj };
        keys.forEach(key => {
            delete result[key];
        });
        return result;
    },

    // ===========================================
    // DOM UTILITIES
    // ===========================================

    /**
     * Check if element is in viewport
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} True if element is visible in viewport
     */
    isInViewport: (element) => {
        if (!element || !(element instanceof Element)) return false;
        try {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        } catch (e) {
            return false;
        }
    },

    /**
     * Animate value change in element
     * @param {HTMLElement} element - Element to update
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} [duration=1000] - Animation duration in ms
     */
    animateValue: (element, start, end, duration = 1000) => {
        if (!element || !(element instanceof Element)) return;

        const startVal = Number(start) || 0;
        const endVal = Number(end) || 0;
        const dur = Math.max(0, Number(duration) || 1000);

        // Handle zero duration - set immediately
        if (dur === 0) {
            element.textContent = endVal;
            return;
        }

        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / dur, 1);
            const value = Math.floor(startVal + (endVal - startVal) * progress);
            element.textContent = value;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    },

    /**
     * Smooth scroll to element
     * @param {HTMLElement} element - Target element
     * @param {number} [offset=0] - Offset from top
     */
    scrollToElement: (element, offset = 0) => {
        if (!element || !(element instanceof Element)) return;
        try {
            const off = Number(offset) || 0;
            const top = element.getBoundingClientRect().top + window.pageYOffset - off;
            window.scrollTo({ top, behavior: 'smooth' });
        } catch (e) {
            console.warn('Helpers.scrollToElement: Scroll failed', e);
        }
    },

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Promise resolving to success status
     */
    copyToClipboard: async (text) => {
        if (text === null || text === undefined) return false;
        const str = String(text);

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(str);
                return true;
            }
        } catch (e) {
            // Fall through to fallback
        }

        // Fallback for older browsers
        try {
            const textarea = document.createElement('textarea');
            textarea.value = str;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            return success;
        } catch (e) {
            console.warn('Helpers.copyToClipboard: Copy failed', e);
            return false;
        }
    },

    // ===========================================
    // VALIDATION UTILITIES
    // ===========================================

    /**
     * Check if valid email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email format
     */
    isValidEmail: (email) => {
        if (!email || typeof email !== 'string') return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    },

    /**
     * Check if string is empty or only whitespace
     * @param {string} str - String to check
     * @returns {boolean} True if empty or whitespace
     */
    isEmpty: (str) => {
        if (str === null || str === undefined) return true;
        if (typeof str !== 'string') return false;
        return str.trim().length === 0;
    },

    /**
     * Check if string is valid binary
     * @param {string} str - String to validate
     * @returns {boolean} True if valid binary string
     */
    isValidBinary: (str) => {
        if (!str || typeof str !== 'string') return false;
        return /^[01]+$/.test(str);
    },

    /**
     * Check if string is valid hexadecimal
     * @param {string} str - String to validate
     * @returns {boolean} True if valid hex string
     */
    isValidHex: (str) => {
        if (!str || typeof str !== 'string') return false;
        return /^[0-9A-Fa-f]+$/.test(str);
    },

    // ===========================================
    // ANIMATION UTILITIES
    // ===========================================

    /**
     * Animate counter with easing
     * @param {HTMLElement} element - Element to update
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} [duration=1000] - Duration in ms
     * @param {string} [suffix=''] - Suffix to append
     */
    animateCounter: (element, start, end, duration = 1000, suffix = '') => {
        if (!element || !(element instanceof Element)) return;

        const startVal = Number(start) || 0;
        const endVal = Number(end) || 0;
        const dur = Math.max(0, Number(duration) || 1000);
        const suf = String(suffix || '');

        // Handle zero duration - set immediately
        if (dur === 0) {
            element.textContent = endVal.toLocaleString() + suf;
            return;
        }

        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / dur, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startVal + (endVal - startVal) * easeProgress);
            element.textContent = current.toLocaleString() + suf;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    },

    /**
     * Create confetti effect
     * @param {Object} [options] - Confetti options
     * @param {number} [options.particleCount=100] - Number of particles
     * @param {number} [options.spread=70] - Spread angle
     * @param {Object} [options.origin] - Origin point {x, y}
     * @param {Array} [options.colors] - Array of color strings
     */
    confetti: (options = {}) => {
        try {
            const defaults = {
                particleCount: 100,
                spread: 70,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b', '#ef4444']
            };
            const config = { ...defaults, ...options };

            const container = document.createElement('div');
            container.className = 'confetti-container';
            container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
            document.body.appendChild(container);

            const count = Math.min(200, Math.max(1, config.particleCount));
            for (let i = 0; i < count; i++) {
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

            setTimeout(() => {
                if (container.parentNode) {
                    container.remove();
                }
            }, 5000);

        } catch (e) {
            console.warn('Helpers.confetti: Effect failed', e);
        }
    },

    /**
     * Add ripple effect to click event
     * @param {Event} event - Click event
     */
    addRipple: (event) => {
        try {
            const button = event.currentTarget;
            if (!button || !(button instanceof Element)) return;

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
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);

        } catch (e) {
            // Silently fail - ripple is cosmetic
        }
    }
};

// Make globals available
if (typeof window !== 'undefined') {
    window.Helpers = Helpers;
    window.XP_THRESHOLDS = XP_THRESHOLDS;
    window.RANKS = RANKS;
    window.shuffleArray = shuffleArray;
    window.getXPForLevel = getXPForLevel;
    window.getXPForNextLevel = getXPForNextLevel;
    window.getRankForLevel = getRankForLevel;
    window.getLevelFromXP = getLevelFromXP;
}

// Auto-attach ripple to buttons (with event delegation)
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (btn) {
        Helpers.addRipple(e);
    }
});
