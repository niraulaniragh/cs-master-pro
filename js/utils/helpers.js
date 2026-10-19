/**
 * helpers.js - Utility Functions
 * Common helper functions used throughout the application
 */

const Helpers = {
    // Shuffle array (Fisher-Yates)
    shuffle: (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    // Generate random ID
    generateId: () => Math.random().toString(36).substr(2, 9),

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
    formatNumber: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),

    // Calculate percentage
    percentage: (value, total) => total === 0 ? 0 : Math.round((value / total) * 100),

    // Escape HTML
    escapeHtml: (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

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

    // Sleep/delay function
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    // Deep clone object
    deepClone: (obj) => JSON.parse(JSON.stringify(obj)),

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
    }
};
