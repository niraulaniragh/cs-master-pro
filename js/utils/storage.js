/**
 * Storage.js - Local Storage Wrapper
 * Handles persistent data storage with JSON serialization and error handling
 */

const Storage = (() => {
    const PREFIX = 'csmaster_';
    const MAX_KEY_LENGTH = 100;
    const MAX_VALUE_SIZE = 5 * 1024 * 1024; // 5MB safety limit

    /**
     * Check if localStorage is available
     * @returns {boolean} True if available
     */
    const isAvailable = () => {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    };

    /**
     * Initialize storage module
     */
    const init = () => {
        if (isAvailable()) {
            console.log('💾 Storage initialized');
        } else {
            console.warn('💾 Storage: localStorage not available');
        }
    };

    /**
     * Validate and sanitize storage key
     * @param {string} key - Key to validate
     * @returns {string|null} Sanitized key or null if invalid
     */
    const validateKey = (key) => {
        if (!key || typeof key !== 'string') {
            console.warn('Storage: Invalid key (must be non-empty string)');
            return null;
        }

        const sanitized = key.trim();
        if (sanitized.length === 0) {
            console.warn('Storage: Key cannot be empty');
            return null;
        }

        if (sanitized.length > MAX_KEY_LENGTH) {
            console.warn(`Storage: Key exceeds maximum length of ${MAX_KEY_LENGTH}`);
            return null;
        }

        return sanitized;
    };

    /**
     * Get full key with prefix
     * @param {string} key - Base key
     * @returns {string} Full key with prefix
     */
    const getFullKey = (key) => {
        return PREFIX + key;
    };

    /**
     * Save data to storage
     * @param {string} key - Storage key
     * @param {*} data - Data to store (will be JSON serialized)
     * @returns {boolean} True if saved successfully
     */
    const save = (key, data) => {
        const validKey = validateKey(key);
        if (!validKey) return false;

        if (!isAvailable()) {
            console.warn('Storage: localStorage not available');
            return false;
        }

        try {
            const serialized = JSON.stringify(data);

            // Check size
            if (serialized.length > MAX_VALUE_SIZE) {
                console.warn(`Storage: Data exceeds maximum size of ${MAX_VALUE_SIZE} bytes`);
                return false;
            }

            localStorage.setItem(getFullKey(validKey), serialized);
            return true;

        } catch (error) {
            if (error.name === 'QuotaExceededError' || error.code === 22) {
                console.error('Storage: Quota exceeded. Consider clearing old data.');
            } else {
                console.error('Storage: Save error', error);
            }
            return false;
        }
    };

    /**
     * Load data from storage
     * @param {string} key - Storage key
     * @param {*} [defaultValue=null] - Default value if key not found or error
     * @returns {*} Parsed data or default value
     */
    const load = (key, defaultValue = null) => {
        const validKey = validateKey(key);
        if (!validKey) return defaultValue;

        if (!isAvailable()) {
            console.warn('Storage: localStorage not available');
            return defaultValue;
        }

        try {
            const data = localStorage.getItem(getFullKey(validKey));

            if (data === null) {
                return defaultValue;
            }

            return JSON.parse(data);

        } catch (error) {
            console.error('Storage: Load error', error);
            return defaultValue;
        }
    };

    /**
     * Check if key exists in storage
     * @param {string} key - Storage key
     * @returns {boolean} True if key exists
     */
    const exists = (key) => {
        const validKey = validateKey(key);
        if (!validKey) return false;

        if (!isAvailable()) return false;

        try {
            return localStorage.getItem(getFullKey(validKey)) !== null;
        } catch (error) {
            return false;
        }
    };

    /**
     * Remove item from storage
     * @param {string} key - Storage key
     * @returns {boolean} True if removed successfully
     */
    const remove = (key) => {
        const validKey = validateKey(key);
        if (!validKey) return false;

        if (!isAvailable()) return false;

        try {
            localStorage.removeItem(getFullKey(validKey));
            return true;
        } catch (error) {
            console.error('Storage: Remove error', error);
            return false;
        }
    };

    /**
     * Clear all app-specific storage (keys with prefix)
     * @returns {boolean} True if cleared successfully
     */
    const clear = () => {
        if (!isAvailable()) return false;

        try {
            const keysToRemove = [];

            // Collect keys first to avoid modifying during iteration
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(PREFIX)) {
                    keysToRemove.push(key);
                }
            }

            // Remove collected keys
            keysToRemove.forEach(key => localStorage.removeItem(key));

            console.log(`Storage: Cleared ${keysToRemove.length} items`);
            return true;

        } catch (error) {
            console.error('Storage: Clear error', error);
            return false;
        }
    };

    /**
     * Get all keys with the app prefix
     * @returns {Array<string>} Array of keys (without prefix)
     */
    const keys = () => {
        if (!isAvailable()) return [];

        try {
            const result = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(PREFIX)) {
                    result.push(key.substring(PREFIX.length));
                }
            }
            return result;

        } catch (error) {
            console.error('Storage: Keys error', error);
            return [];
        }
    };

    /**
     * Get storage usage info
     * @returns {Object} Object with used, quota (if available), and items count
     */
    const getUsageInfo = () => {
        if (!isAvailable()) {
            return { used: 0, items: 0, available: false };
        }

        try {
            let usedBytes = 0;
            let itemCount = 0;

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(PREFIX)) {
                    const value = localStorage.getItem(key);
                    if (value) {
                        usedBytes += key.length + value.length;
                        itemCount++;
                    }
                }
            }

            return {
                used: usedBytes,
                usedKB: Math.round(usedBytes / 1024 * 100) / 100,
                items: itemCount,
                available: true
            };

        } catch (error) {
            console.error('Storage: Usage info error', error);
            return { used: 0, items: 0, available: false };
        }
    };

    /**
     * Update existing data by merging with new data
     * @param {string} key - Storage key
     * @param {Object} updates - Object with updates to merge
     * @returns {boolean} True if updated successfully
     */
    const update = (key, updates) => {
        if (!updates || typeof updates !== 'object' || Array.isArray(updates)) {
            console.warn('Storage: Updates must be a non-array object');
            return false;
        }

        const existing = load(key, {});
        if (typeof existing !== 'object' || Array.isArray(existing)) {
            console.warn('Storage: Cannot update non-object data');
            return false;
        }

        const merged = { ...existing, ...updates };
        return save(key, merged);
    };

    /**
     * Increment a numeric value in storage
     * @param {string} key - Storage key
     * @param {number} [amount=1] - Amount to increment
     * @returns {number|null} New value or null if failed
     */
    const increment = (key, amount = 1) => {
        const validKey = validateKey(key);
        if (!validKey) return null;

        const inc = Number(amount) || 1;
        const current = load(validKey, 0);
        const currentNum = Number(current) || 0;
        const newValue = currentNum + inc;

        if (save(validKey, newValue)) {
            return newValue;
        }
        return null;
    };

    /**
     * Push item to array in storage
     * @param {string} key - Storage key
     * @param {*} item - Item to push
     * @param {number} [maxLength] - Optional max length (removes oldest if exceeded)
     * @returns {boolean} True if pushed successfully
     */
    const pushToArray = (key, item, maxLength = null) => {
        const validKey = validateKey(key);
        if (!validKey) return false;

        let arr = load(validKey, []);
        if (!Array.isArray(arr)) {
            arr = [];
        }

        arr.push(item);

        // Enforce max length if specified
        if (maxLength && typeof maxLength === 'number' && maxLength > 0) {
            while (arr.length > maxLength) {
                arr.shift();
            }
        }

        return save(validKey, arr);
    };

    /**
     * Export all app storage as JSON
     * @returns {Object|null} All stored data or null if failed
     */
    const exportAll = () => {
        if (!isAvailable()) return null;

        try {
            const data = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(PREFIX)) {
                    const shortKey = key.substring(PREFIX.length);
                    const value = localStorage.getItem(key);
                    try {
                        data[shortKey] = JSON.parse(value);
                    } catch (e) {
                        data[shortKey] = value;
                    }
                }
            }
            return data;

        } catch (error) {
            console.error('Storage: Export error', error);
            return null;
        }
    };

    /**
     * Import data from export object
     * @param {Object} data - Data object from exportAll
     * @param {boolean} [overwrite=false] - Whether to overwrite existing keys
     * @returns {boolean} True if imported successfully
     */
    const importAll = (data, overwrite = false) => {
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            console.warn('Storage: Import data must be a non-array object');
            return false;
        }

        if (!isAvailable()) return false;

        try {
            for (const [key, value] of Object.entries(data)) {
                if (!overwrite && exists(key)) {
                    continue;
                }
                save(key, value);
            }
            return true;

        } catch (error) {
            console.error('Storage: Import error', error);
            return false;
        }
    };

    return {
        init,
        save,
        load,
        exists,
        remove,
        clear,
        keys,
        getUsageInfo,
        update,
        increment,
        pushToArray,
        exportAll,
        importAll,
        isAvailable,
        PREFIX
    };
})();

// Auto-initialize
Storage.init();
