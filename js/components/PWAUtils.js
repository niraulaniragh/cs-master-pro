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
    
    // Install prompt handling
    let deferredInstallPrompt = null;
    let installPromptShown = false;
    
    // Service worker update tracking
    let waitingServiceWorker = null;
    
    /**
     * Initialize PWA utilities
     */
    function init() {
        initIndexedDB();
        setupOfflineIndicator();
        setupCacheManagement();
        loadOfflineQueue();
        setupInstallPrompt();
        setupUpdateNotification();
        setupNetworkPolling();
        
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
        // Only create if not already exists
        if (document.getElementById('offline-indicator')) return;
        
        // Create offline indicator element
        const indicator = document.createElement('div');
        indicator.id = 'offline-indicator';
        indicator.className = 'offline-indicator';
        indicator.setAttribute('aria-live', 'polite');
        indicator.setAttribute('aria-hidden', 'true');
        indicator.innerHTML = `
            <span class="offline-indicator-icon">📡</span>
            <span class="offline-indicator-text">Offline Mode</span>
        `;
        
        // Add styles - HIDDEN by default (no .visible class)
        const style = document.createElement('style');
        style.id = 'offline-indicator-styles';
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
                pointer-events: none;
                opacity: 0;
                visibility: hidden;
            }
            
            .offline-indicator.visible {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .offline-indicator-icon {
                animation: pulse-offline 2s infinite;
            }
            
            @keyframes pulse-offline {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        
        if (!document.getElementById('offline-indicator-styles')) {
            document.head.appendChild(style);
        }
        document.body.appendChild(indicator);
        
        // Show/hide based on online status - ONLY show when actually offline
        function showOffline() {
            indicator.classList.add('visible');
            indicator.setAttribute('aria-hidden', 'false');
            document.body.classList.add('offline');
        }
        
        function hideOffline() {
            indicator.classList.remove('visible');
            indicator.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('offline');
        }
        
        window.addEventListener('online', hideOffline);
        window.addEventListener('offline', showOffline);
        
        // Initial state: only show if navigator.onLine is false
        // Default to HIDDEN - assume online until proven otherwise
        if (navigator.onLine === false) {
            showOffline();
        }
        // No else needed - it's hidden by default via CSS
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
     * Setup install prompt handling
     */
    function setupInstallPrompt() {
        // Capture the install prompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredInstallPrompt = e;
            console.log('[PWAUtils] Install prompt captured');
            
            // Show install button if not already installed
            if (!isInstalledPWA() && !installPromptShown) {
                showInstallButton();
            }
        });
        
        // Track successful installation
        window.addEventListener('appinstalled', () => {
            deferredInstallPrompt = null;
            installPromptShown = false;
            hideInstallButton();
            console.log('[PWAUtils] App installed successfully');
            
            if (typeof Toast !== 'undefined') {
                Toast.show('App installed! You can now use it offline.', 'success');
            }
        });
    }
    
    /**
     * Show install button in UI
     */
    function showInstallButton() {
        if (document.getElementById('pwa-install-btn')) return;
        
        const btn = document.createElement('button');
        btn.id = 'pwa-install-btn';
        btn.className = 'pwa-install-btn';
        btn.setAttribute('aria-label', 'Install app');
        btn.innerHTML = `
            <span class="pwa-install-icon">📲</span>
            <span class="pwa-install-text">Install App</span>
        `;
        
        const style = document.createElement('style');
        style.id = 'pwa-install-styles';
        style.textContent = `
            .pwa-install-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                z-index: 9997;
                box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
                transition: transform 0.2s, box-shadow 0.2s;
                animation: slideInUp 0.3s ease;
            }
            .pwa-install-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
            }
            .pwa-install-btn:active {
                transform: translateY(0);
            }
            @keyframes slideInUp {
                from { transform: translateY(100px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        if (!document.getElementById('pwa-install-styles')) {
            document.head.appendChild(style);
        }
        
        btn.addEventListener('click', promptInstall);
        document.body.appendChild(btn);
        installPromptShown = true;
    }
    
    /**
     * Hide install button
     */
    function hideInstallButton() {
        const btn = document.getElementById('pwa-install-btn');
        if (btn) btn.remove();
    }
    
    /**
     * Trigger install prompt
     */
    async function promptInstall() {
        if (!deferredInstallPrompt) {
            console.log('[PWAUtils] No install prompt available');
            return { outcome: 'unavailable' };
        }
        
        deferredInstallPrompt.prompt();
        const result = await deferredInstallPrompt.userChoice;
        
        console.log('[PWAUtils] Install prompt result:', result.outcome);
        
        if (result.outcome === 'accepted') {
            hideInstallButton();
        }
        
        deferredInstallPrompt = null;
        return result;
    }
    
    /**
     * Setup service worker update notification
     */
    function setupUpdateNotification() {
        if (!('serviceWorker' in navigator)) return;
        
        navigator.serviceWorker.ready.then((registration) => {
            // Check for updates periodically
            setInterval(() => {
                registration.update().catch(() => {});
            }, 60 * 60 * 1000); // Every hour
            
            // Handle updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                
                if (!newWorker) return;
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        waitingServiceWorker = newWorker;
                        showUpdateNotification();
                    }
                });
            });
            
            // Handle waiting worker on page load
            if (registration.waiting) {
                waitingServiceWorker = registration.waiting;
                showUpdateNotification();
            }
        });
        
        // Handle controller change (update activated)
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    }
    
    /**
     * Show update notification banner
     */
    function showUpdateNotification() {
        if (document.getElementById('pwa-update-banner')) return;
        
        const banner = document.createElement('div');
        banner.id = 'pwa-update-banner';
        banner.className = 'pwa-update-banner';
        banner.setAttribute('role', 'alert');
        banner.innerHTML = `
            <span class="pwa-update-text">🎉 A new version is available!</span>
            <button class="pwa-update-btn" id="pwa-update-btn">Update Now</button>
            <button class="pwa-update-dismiss" id="pwa-update-dismiss" aria-label="Dismiss">✕</button>
        `;
        
        const style = document.createElement('style');
        style.id = 'pwa-update-styles';
        style.textContent = `
            .pwa-update-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 12px 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 16px;
                z-index: 9999;
                box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
                animation: slideUp 0.3s ease;
            }
            .pwa-update-text {
                font-weight: 500;
            }
            .pwa-update-btn {
                background: white;
                color: #059669;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .pwa-update-btn:hover {
                transform: scale(1.05);
            }
            .pwa-update-dismiss {
                background: transparent;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 4px 8px;
                opacity: 0.8;
            }
            .pwa-update-dismiss:hover {
                opacity: 1;
            }
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
        `;
        
        if (!document.getElementById('pwa-update-styles')) {
            document.head.appendChild(style);
        }
        
        document.body.appendChild(banner);
        
        document.getElementById('pwa-update-btn').addEventListener('click', applyUpdate);
        document.getElementById('pwa-update-dismiss').addEventListener('click', () => {
            banner.remove();
        });
    }
    
    /**
     * Apply the pending service worker update
     */
    function applyUpdate() {
        if (waitingServiceWorker) {
            waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
    }
    
    /**
     * Setup network polling for reliable offline detection
     */
    function setupNetworkPolling() {
        let lastOnlineState = navigator.onLine;
        
        // Poll a lightweight endpoint to verify actual connectivity
        async function checkConnectivity() {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);
                
                const response = await fetch('/manifest.json', {
                    method: 'HEAD',
                    cache: 'no-store',
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                return response.ok;
            } catch {
                return false;
            }
        }
        
        async function updateOnlineStatus() {
            const isOnline = await checkConnectivity();
            const indicator = document.getElementById('offline-indicator');
            
            if (isOnline !== lastOnlineState) {
                lastOnlineState = isOnline;
                
                if (indicator) {
                    if (isOnline) {
                        indicator.classList.remove('visible');
                        indicator.setAttribute('aria-hidden', 'true');
                        document.body.classList.remove('offline');
                    } else {
                        indicator.classList.add('visible');
                        indicator.setAttribute('aria-hidden', 'false');
                        document.body.classList.add('offline');
                    }
                }
                
                // Dispatch custom event for other components
                window.dispatchEvent(new CustomEvent('connectivitychange', { 
                    detail: { online: isOnline } 
                }));
            }
        }
        
        // Check every 30 seconds when page is visible
        let pollInterval = null;
        
        function startPolling() {
            if (!pollInterval) {
                pollInterval = setInterval(updateOnlineStatus, 30000);
            }
        }
        
        function stopPolling() {
            if (pollInterval) {
                clearInterval(pollInterval);
                pollInterval = null;
            }
        }
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopPolling();
            } else {
                startPolling();
                updateOnlineStatus(); // Check immediately when visible
            }
        });
        
        if (!document.hidden) {
            startPolling();
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
