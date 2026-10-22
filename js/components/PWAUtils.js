/**
 * PWA Utilities Component
 * Provides offline detection, cache management, and sync utilities
 * Works alongside the PWAManager in index.html
 */

const PWAUtils = (function() {
    'use strict';
    
    // IndexedDB for offline data sync
    const DB_NAME = 'csmaster-offline';
    const DB_VERSION = 1;
    let db = null;
    
    // Offline queue for actions to sync later
    const offlineQueue = [];
    
    /**
     * Initialize PWA utilities
     */
    function init() {
        initIndexedDB();
        setupOfflineIndicator();
        setupCacheManagement();
        loadOfflineQueue();
        
        console.log('[PWAUtils] Initialized');
    }
    
    /**
     * Initialize IndexedDB for offline data storage
     */
    function initIndexedDB() {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = (event) => {
            console.error('[PWAUtils] IndexedDB error:', event.target.error);
        };
        
        request.onsuccess = (event) => {
            db = event.target.result;
            console.log('[PWAUtils] IndexedDB connected');
        };
        
        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            
            // Store for offline actions queue
            if (!database.objectStoreNames.contains('offline-queue')) {
                database.createObjectStore('offline-queue', { 
                    keyPath: 'id', 
                    autoIncrement: true 
                });
            }
            
            // Store for cached data
            if (!database.objectStoreNames.contains('cached-data')) {
                const store = database.createObjectStore('cached-data', { 
                    keyPath: 'key' 
                });
                store.createIndex('timestamp', 'timestamp', { unique: false });
            }
            
            // Store for pending progress updates
            if (!database.objectStoreNames.contains('pending-progress')) {
                const progressStore = database.createObjectStore('pending-progress', { 
                    keyPath: 'id', 
                    autoIncrement: true 
                });
                progressStore.createIndex('type', 'type', { unique: false });
            }
        };
    }
    
    /**
     * Setup offline indicator in UI
     */
    function setupOfflineIndicator() {
        // Create offline indicator element
        const indicator = document.createElement('div');
        indicator.id = 'offline-indicator';
        indicator.className = 'offline-indicator';
        indicator.innerHTML = `
            <span class="offline-indicator-icon">📡</span>
            <span class="offline-indicator-text">Offline Mode</span>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .offline-indicator {
                position: fixed;
                top: 70px;
                left: 50%;
                transform: translateX(-50%) translateY(-100%);
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 0 0 8px 8px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                font-weight: 500;
                z-index: 9998;
                transition: transform 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
            
            .offline-indicator.visible {
                transform: translateX(-50%) translateY(0);
            }
            
            .offline-indicator-icon {
                animation: pulse-offline 2s infinite;
            }
            
            @keyframes pulse-offline {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            body.offline .nav-stats,
            body.offline .nav-user {
                opacity: 0.6;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(indicator);
        
        // Show/hide based on online status
        function updateIndicator() {
            indicator.classList.toggle('visible', !navigator.onLine);
        }
        
        window.addEventListener('online', updateIndicator);
        window.addEventListener('offline', updateIndicator);
        updateIndicator();
    }
    
    /**
     * Setup cache management utilities
     */
    function setupCacheManagement() {
        // Add clear cache button in dev mode
        if (window.location.hostname === 'localhost' || 
            localStorage.getItem('dev-mode') === 'true') {
            
            window.clearAppCache = async function() {
                try {
                    const cacheNames = await caches.keys();
                    await Promise.all(
                        cacheNames
                            .filter(name => name.startsWith('csmaster-'))
                            .map(name => caches.delete(name))
                    );
                    console.log('[PWAUtils] Cache cleared');
                    if (typeof Toast !== 'undefined') {
                        Toast.show('Cache cleared. Refresh to reload.', 'success');
                    }
                    return true;
                } catch (error) {
                    console.error('[PWAUtils] Failed to clear cache:', error);
                    return false;
                }
            };
        }
    }
    
    /**
     * Load offline queue from IndexedDB
     */
    async function loadOfflineQueue() {
        if (!db) {
            setTimeout(loadOfflineQueue, 100);
            return;
        }
        
        try {
            const tx = db.transaction('offline-queue', 'readonly');
            const store = tx.objectStore('offline-queue');
            const request = store.getAll();
            
            request.onsuccess = () => {
                const items = request.result || [];
                offlineQueue.push(...items);
                
                if (items.length > 0 && navigator.onLine) {
                    processOfflineQueue();
                }
            };
        } catch (error) {
            console.error('[PWAUtils] Failed to load offline queue:', error);
        }
    }
    
    /**
     * Add action to offline queue
     */
    async function queueOfflineAction(action) {
        const entry = {
            action,
            timestamp: Date.now(),
            retries: 0
        };
        
        offlineQueue.push(entry);
        
        if (db) {
            try {
                const tx = db.transaction('offline-queue', 'readwrite');
                const store = tx.objectStore('offline-queue');
                await store.add(entry);
            } catch (error) {
                console.error('[PWAUtils] Failed to save to offline queue:', error);
            }
        }
        
        // If online, process immediately
        if (navigator.onLine) {
            processOfflineQueue();
        }
    }
    
    /**
     * Process offline queue when back online
     */
    async function processOfflineQueue() {
        if (offlineQueue.length === 0) return;
        
        console.log(`[PWAUtils] Processing ${offlineQueue.length} queued actions`);
        
        const processed = [];
        
        for (const entry of offlineQueue) {
            try {
                // Execute the queued action
                if (typeof entry.action === 'function') {
                    await entry.action();
                } else if (entry.action.type === 'api-call') {
                    await fetch(entry.action.url, entry.action.options);
                }
                
                processed.push(entry);
            } catch (error) {
                entry.retries++;
                
                if (entry.retries >= 3) {
                    console.error('[PWAUtils] Action failed after 3 retries:', error);
                    processed.push(entry); // Remove after max retries
                }
            }
        }
        
        // Remove processed items
        for (const entry of processed) {
            const index = offlineQueue.indexOf(entry);
            if (index > -1) {
                offlineQueue.splice(index, 1);
            }
        }
        
        // Update IndexedDB
        if (db && processed.length > 0) {
            try {
                const tx = db.transaction('offline-queue', 'readwrite');
                const store = tx.objectStore('offline-queue');
                
                for (const entry of processed) {
                    if (entry.id) {
                        store.delete(entry.id);
                    }
                }
            } catch (error) {
                console.error('[PWAUtils] Failed to update offline queue:', error);
            }
        }
        
        if (processed.length > 0) {
            console.log(`[PWAUtils] Processed ${processed.length} actions`);
        }
    }
    
    /**
     * Save progress data for offline sync
     */
    async function saveProgressOffline(type, data) {
        if (!db) return false;
        
        try {
            const tx = db.transaction('pending-progress', 'readwrite');
            const store = tx.objectStore('pending-progress');
            
            await store.add({
                type,
                data,
                timestamp: Date.now()
            });
            
            // Trigger background sync if available
            if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
                const reg = await navigator.serviceWorker.ready;
                await reg.sync.register('sync-progress');
            }
            
            return true;
        } catch (error) {
            console.error('[PWAUtils] Failed to save progress offline:', error);
            return false;
        }
    }
    
    /**
     * Cache data locally for offline access
     */
    async function cacheData(key, data, ttl = 24 * 60 * 60 * 1000) {
        if (!db) return false;
        
        try {
            const tx = db.transaction('cached-data', 'readwrite');
            const store = tx.objectStore('cached-data');
            
            await store.put({
                key,
                data,
                timestamp: Date.now(),
                expires: Date.now() + ttl
            });
            
            return true;
        } catch (error) {
            console.error('[PWAUtils] Failed to cache data:', error);
            return false;
        }
    }
    
    /**
     * Get cached data
     */
    async function getCachedData(key) {
        if (!db) return null;
        
        try {
            const tx = db.transaction('cached-data', 'readonly');
            const store = tx.objectStore('cached-data');
            const request = store.get(key);
            
            return new Promise((resolve) => {
                request.onsuccess = () => {
                    const result = request.result;
                    
                    if (result && result.expires > Date.now()) {
                        resolve(result.data);
                    } else {
                        // Expired or not found
                        resolve(null);
                    }
                };
                
                request.onerror = () => resolve(null);
            });
        } catch (error) {
            console.error('[PWAUtils] Failed to get cached data:', error);
            return null;
        }
    }
    
    /**
     * Clean up expired cache entries
     */
    async function cleanupExpiredCache() {
        if (!db) return;
        
        try {
            const tx = db.transaction('cached-data', 'readwrite');
            const store = tx.objectStore('cached-data');
            const index = store.index('timestamp');
            const now = Date.now();
            
            const request = index.openCursor();
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                
                if (cursor) {
                    const record = cursor.value;
                    
                    if (record.expires < now) {
                        store.delete(record.key);
                    }
                    
                    cursor.continue();
                }
            };
        } catch (error) {
            console.error('[PWAUtils] Failed to cleanup cache:', error);
        }
    }
    
    /**
     * Get storage usage estimate
     */
    async function getStorageEstimate() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            try {
                const estimate = await navigator.storage.estimate();
                return {
                    usage: estimate.usage,
                    quota: estimate.quota,
                    usagePercent: ((estimate.usage / estimate.quota) * 100).toFixed(2),
                    usageFormatted: formatBytes(estimate.usage),
                    quotaFormatted: formatBytes(estimate.quota)
                };
            } catch (error) {
                console.error('[PWAUtils] Storage estimate failed:', error);
            }
        }
        
        return null;
    }
    
    /**
     * Format bytes to human-readable string
     */
    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    /**
     * Request persistent storage
     */
    async function requestPersistentStorage() {
        if ('storage' in navigator && 'persist' in navigator.storage) {
            try {
                const persisted = await navigator.storage.persist();
                console.log(`[PWAUtils] Persistent storage: ${persisted ? 'granted' : 'denied'}`);
                return persisted;
            } catch (error) {
                console.error('[PWAUtils] Persistent storage request failed:', error);
            }
        }
        return false;
    }
    
    /**
     * Check if running as installed PWA
     */
    function isInstalledPWA() {
        // Check display mode
        if (window.matchMedia('(display-mode: standalone)').matches) return true;
        if (window.matchMedia('(display-mode: fullscreen)').matches) return true;
        if (window.matchMedia('(display-mode: minimal-ui)').matches) return true;
        
        // iOS Safari standalone
        if (window.navigator.standalone === true) return true;
        
        return false;
    }
    
    /**
     * Prefetch critical resources for offline use
     */
    async function prefetchResources(urls) {
        if (!('caches' in window)) return;
        
        try {
            const cacheNames = await caches.keys();
            const currentCache = cacheNames.find(name => name.startsWith('csmaster-'));
            
            if (!currentCache) return;
            
            const cache = await caches.open(currentCache);
            
            const results = await Promise.allSettled(
                urls.map(async (url) => {
                    // Check if already cached
                    const cached = await cache.match(url);
                    if (cached) return { url, status: 'cached' };
                    
                    // Fetch and cache
                    const response = await fetch(url);
                    if (response.ok) {
                        await cache.put(url, response);
                        return { url, status: 'fetched' };
                    }
                    
                    return { url, status: 'failed' };
                })
            );
            
            console.log('[PWAUtils] Prefetch results:', results);
            return results;
        } catch (error) {
            console.error('[PWAUtils] Prefetch failed:', error);
        }
    }
    
    // Process queue when back online
    window.addEventListener('online', () => {
        setTimeout(processOfflineQueue, 1000);
    });
    
    // Clean up expired cache on load
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(cleanupExpiredCache, 5000);
    });
    
    // Public API
    return {
        init,
        queueOfflineAction,
        saveProgressOffline,
        cacheData,
        getCachedData,
        getStorageEstimate,
        requestPersistentStorage,
        isInstalledPWA,
        prefetchResources,
        formatBytes
    };
})();

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', PWAUtils.init);
} else {
    PWAUtils.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PWAUtils;
}
