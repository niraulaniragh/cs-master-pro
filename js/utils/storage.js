/**
 * Storage.js - Local Storage Wrapper
 * Handles persistent data storage with JSON serialization, migration, quota handling, and error recovery
 */

const Storage = (() => {
    const PREFIX = 'csmaster_';
    const VERSION_KEY = '_storage_version';
    const CURRENT_VERSION = 2;
    const MAX_KEY_LENGTH = 100;
    const MAX_VALUE_SIZE = 5 * 1024 * 1024; // 5MB safety limit
    const QUOTA_RESERVE = 100 * 1024; // Keep 100KB reserve
    const MAX_RETRY_ATTEMPTS = 3;

    // Keys ordered by priority (lowest priority first for cleanup)
    const CLEANUP_PRIORITY = [
        'analytics_cache',
        'temp_',
        'cache_',
        'session_',
        'history',
        'recent_'
    ];

    // Critical keys that should never be auto-deleted
    const PROTECTED_KEYS = [
        'user_data',
        'progress',
        'settings',
        'auth_token',
        'bookmarks',
        'streak'
    ];

    let _available = null;
    let _migrationCallbacks = [];

    /**
     * Check if localStorage is available
     * @returns {boolean} True if available
     */
    const isAvailable = () => {
        if (_available !== null) return _available;

        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            _available = true;
        } catch (e) {
            _available = false;
        }
        return _available;
    };

    /**
     * Get estimated quota remaining
     * @returns {number} Estimated bytes remaining
     */
    const getQuotaRemaining = () => {
        if (!isAvailable()) return 0;

        try {
            let totalUsed = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                if (key && value) {
                    totalUsed += (key.length + value.length) * 2; // UTF-16 encoding
                }
            }
            // Most browsers have 5-10MB limit, assume 5MB
            const estimatedQuota = 5 * 1024 * 1024;
            return Math.max(0, estimatedQuota - totalUsed);
        } catch (e) {
            return 0;
        }
    };

    /**
     * Check if we have enough space for data
     * @param {string} data - Serialized data to store
     * @returns {boolean} True if enough space
     */
    const hasSpaceFor = (data) => {
        const needed = (data.length * 2) + QUOTA_RESERVE;
        return getQuotaRemaining() >= needed;
    };

    /**
     * Free up storage space by removing low-priority items
     * @param {number} bytesNeeded - Bytes to free
     * @returns {number} Bytes actually freed
     */
    const freeUpSpace = (bytesNeeded) => {
        if (!isAvailable()) return 0;

        let freedBytes = 0;
        const keysToRemove = [];

        // Collect all app keys with their sizes and priorities
        const appKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const fullKey = localStorage.key(i);
            if (fullKey && fullKey.startsWith(PREFIX)) {
                const key = fullKey.substring(PREFIX.length);
                const value = localStorage.getItem(fullKey);
                const size = (fullKey.length + (value?.length || 0)) * 2;

                // Skip protected keys
                const isProtected = PROTECTED_KEYS.some(p => key.startsWith(p) || key === p);
                if (isProtected) continue;

                // Calculate priority (lower = delete first)
                let priority = 100;
                for (let j = 0; j < CLEANUP_PRIORITY.length; j++) {
                    if (key.startsWith(CLEANUP_PRIORITY[j]) || key.includes(CLEANUP_PRIORITY[j])) {
                        priority = j;
                        break;
                    }
                }

                appKeys.push({ fullKey, key, size, priority });
            }
        }

        // Sort by priority (lowest first)
        appKeys.sort((a, b) => a.priority - b.priority);

        // Remove keys until we've freed enough space
        for (const item of appKeys) {
            if (freedBytes >= bytesNeeded) break;

            try {
                localStorage.removeItem(item.fullKey);
                freedBytes += item.size;
                keysToRemove.push(item.key);
            } catch (e) {
                // Continue trying other keys
            }
        }

        if (keysToRemove.length > 0) {
            console.warn(`Storage: Freed ${Math.round(freedBytes / 1024)}KB by removing ${keysToRemove.length} items:`, keysToRemove);
        }

        return freedBytes;
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
     * Create integrity wrapper for data
     * @param {*} data - Data to wrap
     * @returns {Object} Wrapped data with metadata
     */
    const wrapData = (data) => {
        return {
            _v: CURRENT_VERSION,
            _t: Date.now(),
            _d: data
        };
    };

    /**
     * Unwrap data and verify integrity
     * @param {*} wrapped - Wrapped data
     * @returns {*} Original data or null if invalid
     */
    const unwrapData = (wrapped) => {
        // Handle legacy data (not wrapped)
        if (wrapped && typeof wrapped === 'object' && '_d' in wrapped) {
            return wrapped._d;
        }
        // Return as-is for legacy format
        return wrapped;
    };

    /**
     * Save data to storage with retry and quota handling
     * @param {string} key - Storage key
     * @param {*} data - Data to store (will be JSON serialized)
     * @param {Object} [options] - Options
     * @param {boolean} [options.wrap=true] - Whether to wrap with metadata
     * @returns {boolean} True if saved successfully
     */
    const save = (key, data, options = {}) => {
        const { wrap = true } = options;
        const validKey = validateKey(key);
        if (!validKey) return false;

        if (!isAvailable()) {
            console.warn('Storage: localStorage not available');
            return false;
        }

        let serialized;
        try {
            const toStore = wrap ? wrapData(data) : data;
            serialized = JSON.stringify(toStore);
        } catch (error) {
            console.error('Storage: Serialization error', error);
            return false;
        }

        // Check size limit
        if (serialized.length > MAX_VALUE_SIZE) {
            console.warn(`Storage: Data exceeds maximum size of ${MAX_VALUE_SIZE} bytes`);
            return false;
        }

        // Try to save with retry logic
        for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
            try {
                localStorage.setItem(getFullKey(validKey), serialized);
                return true;

            } catch (error) {
                const isQuotaError = error.name === 'QuotaExceededError' ||
                                     error.code === 22 ||
                                     error.code === 1014 || // Firefox
                                     (error.name === 'NS_ERROR_DOM_QUOTA_REACHED');

                if (isQuotaError && attempt < MAX_RETRY_ATTEMPTS - 1) {
                    // Try to free up space
                    const bytesNeeded = serialized.length * 2 + QUOTA_RESERVE;
                    const freedBytes = freeUpSpace(bytesNeeded);

                    if (freedBytes < bytesNeeded) {
                        console.error('Storage: Unable to free enough space');
                        return false;
                    }
                    // Retry after freeing space
                    continue;
                }

                if (isQuotaError) {
                    console.error('Storage: Quota exceeded after cleanup attempts');
                } else {
                    console.error('Storage: Save error', error);
                }
                return false;
            }
        }

        return false;
    };

    /**
     * Load data from storage with error recovery
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
            const raw = localStorage.getItem(getFullKey(validKey));

            if (raw === null) {
                return defaultValue;
            }

            let parsed;
            try {
                parsed = JSON.parse(raw);
            } catch (parseError) {
                // Data is corrupted, attempt recovery
                console.warn(`Storage: Corrupted data for key "${validKey}", removing`);
                remove(validKey);
                return defaultValue;
            }

            return unwrapData(parsed);

        } catch (error) {
            console.error('Storage: Load error', error);
            return defaultValue;
        }
    };

    /**
     * Safely load with validation callback
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value
     * @param {Function} validator - Validation function (data) => boolean
     * @returns {*} Valid data or default
     */
    const loadValidated = (key, defaultValue, validator) => {
        const data = load(key, null);

        if (data === null) {
            return defaultValue;
        }

        try {
            if (typeof validator === 'function' && !validator(data)) {
                console.warn(`Storage: Validation failed for key "${key}", using default`);
                return defaultValue;
            }
        } catch (e) {
            console.warn(`Storage: Validator threw error for key "${key}"`, e);
            return defaultValue;
        }

        return data;
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
     * @param {Object} [options] - Options
     * @param {boolean} [options.preserveProtected=false] - Keep protected keys
     * @returns {boolean} True if cleared successfully
     */
    const clear = (options = {}) => {
        const { preserveProtected = false } = options;

        if (!isAvailable()) return false;

        try {
            const keysToRemove = [];

            for (let i = 0; i < localStorage.length; i++) {
                const fullKey = localStorage.key(i);
                if (fullKey && fullKey.startsWith(PREFIX)) {
                    const key = fullKey.substring(PREFIX.length);

                    if (preserveProtected) {
                        const isProtected = PROTECTED_KEYS.some(p => key.startsWith(p) || key === p);
                        if (isProtected) continue;
                    }

                    keysToRemove.push(fullKey);
                }
            }

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
                        usedBytes += (key.length + value.length) * 2; // UTF-16
                        itemCount++;
                    }
                }
            }

            const quotaRemaining = getQuotaRemaining();

            return {
                used: usedBytes,
                usedKB: Math.round(usedBytes / 1024 * 100) / 100,
                usedMB: Math.round(usedBytes / (1024 * 1024) * 100) / 100,
                remaining: quotaRemaining,
                remainingKB: Math.round(quotaRemaining / 1024 * 100) / 100,
                items: itemCount,
                available: true
            };

        } catch (error) {
            console.error('Storage: Usage info error', error);
            return { used: 0, items: 0, available: false };
        }
    };

    /**
     * Update existing data by merging with new data (deep merge for nested objects)
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

        // Deep merge
        const deepMerge = (target, source) => {
            const result = { ...target };
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    result[key] = deepMerge(result[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
            return result;
        };

        const merged = deepMerge(existing, updates);
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
            const data = {
                _exportVersion: CURRENT_VERSION,
                _exportDate: new Date().toISOString(),
                data: {}
            };

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(PREFIX)) {
                    const shortKey = key.substring(PREFIX.length);
                    const value = localStorage.getItem(key);
                    try {
                        const parsed = JSON.parse(value);
                        data.data[shortKey] = unwrapData(parsed);
                    } catch (e) {
                        data.data[shortKey] = value;
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
     * @param {Object} exportData - Data object from exportAll
     * @param {boolean} [overwrite=false] - Whether to overwrite existing keys
     * @returns {Object} Result with success flag and counts
     */
    const importAll = (exportData, overwrite = false) => {
        const result = { success: false, imported: 0, skipped: 0, errors: [] };

        if (!exportData || typeof exportData !== 'object') {
            result.errors.push('Invalid import data');
            return result;
        }

        if (!isAvailable()) {
            result.errors.push('localStorage not available');
            return result;
        }

        // Handle both old format (flat) and new format (with data wrapper)
        const data = exportData.data || exportData;

        if (typeof data !== 'object' || Array.isArray(data)) {
            result.errors.push('Invalid data format');
            return result;
        }

        try {
            for (const [key, value] of Object.entries(data)) {
                // Skip metadata keys
                if (key.startsWith('_export')) continue;

                if (!overwrite && exists(key)) {
                    result.skipped++;
                    continue;
                }

                if (save(key, value)) {
                    result.imported++;
                } else {
                    result.errors.push(`Failed to import key: ${key}`);
                }
            }

            result.success = result.errors.length === 0;
            return result;

        } catch (error) {
            console.error('Storage: Import error', error);
            result.errors.push(error.message);
            return result;
        }
    };

    // ========== Migration System ==========

    /**
     * Register a migration callback
     * @param {number} fromVersion - Version to migrate from
     * @param {number} toVersion - Version to migrate to
     * @param {Function} callback - Migration function (data) => data
     */
    const registerMigration = (fromVersion, toVersion, callback) => {
        _migrationCallbacks.push({ fromVersion, toVersion, callback });
        // Sort by fromVersion to ensure correct order
        _migrationCallbacks.sort((a, b) => a.fromVersion - b.fromVersion);
    };

    /**
     * Get current storage version
     * @returns {number} Current version
     */
    const getVersion = () => {
        return load(VERSION_KEY, 1);
    };

    /**
     * Run pending migrations
     * @returns {boolean} True if migrations ran successfully
     */
    const runMigrations = () => {
        const currentVersion = getVersion();

        if (currentVersion >= CURRENT_VERSION) {
            return true;
        }

        console.log(`Storage: Migrating from v${currentVersion} to v${CURRENT_VERSION}`);

        try {
            // Run registered migrations in order
            for (const migration of _migrationCallbacks) {
                if (migration.fromVersion >= currentVersion && migration.toVersion <= CURRENT_VERSION) {
                    console.log(`Storage: Running migration v${migration.fromVersion} -> v${migration.toVersion}`);

                    // Get all current data
                    const allKeys = keys();
                    for (const key of allKeys) {
                        if (key === VERSION_KEY) continue;

                        const data = load(key);
                        if (data !== null) {
                            try {
                                const migrated = migration.callback(key, data);
                                if (migrated !== undefined && migrated !== data) {
                                    save(key, migrated);
                                }
                            } catch (e) {
                                console.warn(`Storage: Migration error for key "${key}"`, e);
                            }
                        }
                    }
                }
            }

            // Update version
            save(VERSION_KEY, CURRENT_VERSION, { wrap: false });
            console.log(`Storage: Migration complete, now at v${CURRENT_VERSION}`);
            return true;

        } catch (error) {
            console.error('Storage: Migration failed', error);
            return false;
        }
    };

    /**
     * Initialize storage module with migrations
     */
    const init = () => {
        if (isAvailable()) {
            // Register default migrations
            registerMigration(1, 2, (key, data) => {
                // v1 -> v2: Normalize date formats
                if (data && typeof data === 'object') {
                    if (data.timestamp && typeof data.timestamp === 'string') {
                        const ts = Date.parse(data.timestamp);
                        if (!isNaN(ts)) {
                            data.timestamp = ts;
                        }
                    }
                    if (data.date && typeof data.date === 'string') {
                        const ts = Date.parse(data.date);
                        if (!isNaN(ts)) {
                            data.date = ts;
                        }
                    }
                }
                return data;
            });

            // Run migrations
            runMigrations();

            console.log('💾 Storage initialized (v' + CURRENT_VERSION + ')');
        } else {
            console.warn('💾 Storage: localStorage not available');
        }
    };

    /**
     * Health check - verify storage integrity
     * @returns {Object} Health report
     */
    const healthCheck = () => {
        const report = {
            available: isAvailable(),
            version: CURRENT_VERSION,
            storedVersion: getVersion(),
            itemCount: 0,
            corruptedKeys: [],
            usage: null
        };

        if (!report.available) return report;

        try {
            const allKeys = keys();
            report.itemCount = allKeys.length;

            // Check each key for corruption
            for (const key of allKeys) {
                try {
                    const raw = localStorage.getItem(getFullKey(key));
                    JSON.parse(raw);
                } catch (e) {
                    report.corruptedKeys.push(key);
                }
            }

            report.usage = getUsageInfo();

        } catch (error) {
            console.error('Storage: Health check error', error);
        }

        return report;
    };

    /**
     * Repair corrupted storage entries
     * @returns {Object} Repair results
     */
    const repair = () => {
        const results = { removed: [], fixed: 0 };

        const health = healthCheck();
        for (const key of health.corruptedKeys) {
            if (remove(key)) {
                results.removed.push(key);
            }
        }

        console.log(`Storage: Repair complete. Removed ${results.removed.length} corrupted entries.`);
        return results;
    };

    return {
        init,
        save,
        load,
        loadValidated,
        exists,
        remove,
        clear,
        keys,
        getUsageInfo,
        getQuotaRemaining,
        update,
        increment,
        pushToArray,
        exportAll,
        importAll,
        isAvailable,
        registerMigration,
        runMigrations,
        getVersion,
        healthCheck,
        repair,
        freeUpSpace,
        PREFIX,
        VERSION: CURRENT_VERSION
    };
})();

// Auto-initialize
Storage.init();
