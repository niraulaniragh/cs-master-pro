/**
 * Service Worker for CS Master Pro
 * Enhanced PWA with intelligent caching, graceful updates, and offline support
 * 
 * Features:
 * - Stale-while-revalidate for optimal performance
 * - Cache size limits to prevent storage bloat
 * - Graceful update notifications
 * - Background sync for progress data
 * - Network-first for critical resources
 * - Comprehensive error recovery
 */

// Version management - update this on each deploy
const BUILD_TIMESTAMP = '20261022224500';
const CACHE_NAME = `csmaster-v${BUILD_TIMESTAMP}`;
const OFFLINE_URL = '/cs-master-pro/offline.html';

// Cache configuration
const CACHE_CONFIG = {
    // Maximum cache sizes (in number of entries)
    maxEntries: {
        static: 100,    // HTML, CSS, JS files
        images: 50,     // Images and icons
        fonts: 20,      // Web fonts
        api: 30         // API/data responses
    },
    // Maximum cache age (in milliseconds)
    maxAge: {
        static: 7 * 24 * 60 * 60 * 1000,  // 7 days
        images: 30 * 24 * 60 * 60 * 1000, // 30 days
        fonts: 365 * 24 * 60 * 60 * 1000, // 1 year
        api: 24 * 60 * 60 * 1000          // 1 day
    },
    // Files to cache immediately on install (app shell)
    precache: [
        '/cs-master-pro/',
        '/cs-master-pro/index.html',
        '/cs-master-pro/offline.html',
        '/cs-master-pro/styles/main.css',
        '/cs-master-pro/styles/games.css',
        '/cs-master-pro/manifest.json',
        // Core JS files
        '/cs-master-pro/js/core/App.js',
        '/cs-master-pro/js/core/State.js',
        '/cs-master-pro/js/core/Router.js',
        '/cs-master-pro/js/utils/storage.js',
        // Data files for offline access
        '/cs-master-pro/js/data/topics.js',
        '/cs-master-pro/js/data/questions.js',
        '/cs-master-pro/js/data/notes.js'
    ],
    // Patterns for runtime caching by category
    cachePatterns: {
        static: [/\.html$/, /\.js$/, /\.css$/],
        images: [/\.png$/, /\.jpg$/, /\.jpeg$/, /\.gif$/, /\.svg$/, /\.webp$/, /\.ico$/],
        fonts: [/\.woff2?$/, /\.ttf$/, /\.otf$/, /\.eot$/]
    },
    // Files/patterns to never cache
    neverCache: [
        /\/api\//,
        /chrome-extension/,
        /localhost/,
        /\.map$/,
        /analytics/,
        /google-analytics/,
        /gtag/
    ],
    // Trusted CDNs for cross-origin caching
    trustedCDNs: [
        'cdnjs.cloudflare.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'cdn.jsdelivr.net'
    ]
};

/**
 * Install event - precache essential files with individual error handling
 */
self.addEventListener('install', (event) => {
    console.log(`[SW] Installing version ${BUILD_TIMESTAMP}...`);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async (cache) => {
                console.log('[SW] Precaching app shell');
                
                // Cache each file individually to handle failures gracefully
                const results = await Promise.allSettled(
                    CACHE_CONFIG.precache.map(async (url) => {
                        try {
                            const response = await fetch(url, { cache: 'no-store' });
                            if (response.ok) {
                                await cache.put(url, response);
                                return { url, success: true };
                            }
                            throw new Error(`HTTP ${response.status}`);
                        } catch (err) {
                            console.warn(`[SW] Failed to precache ${url}:`, err.message);
                            return { url, success: false, error: err.message };
                        }
                    })
                );
                
                const succeeded = results.filter(r => r.value?.success).length;
                const failed = results.filter(r => !r.value?.success).length;
                console.log(`[SW] Precaching complete: ${succeeded} succeeded, ${failed} failed`);
                
                return results;
            })
            .then(() => {
                // Force the new service worker to activate immediately
                console.log('[SW] Installation complete, activating immediately');
                return self.skipWaiting();
            })
            .catch((err) => {
                console.error('[SW] Precaching failed:', err);
            })
    );
});

/**
 * Activate event - clean up old caches and enforce size limits
 */
self.addEventListener('activate', (event) => {
    console.log(`[SW] Activating version ${BUILD_TIMESTAMP}...`);
    
    event.waitUntil(
        (async () => {
            // Clean up old caches
            const cacheNames = await caches.keys();
            const deletePromises = cacheNames
                .filter(name => name.startsWith('csmaster-') && name !== CACHE_NAME)
                .map(name => {
                    console.log('[SW] Deleting old cache:', name);
                    return caches.delete(name);
                });
            
            await Promise.all(deletePromises);
            console.log('[SW] Old caches cleaned up');
            
            // Enforce cache size limits
            await enforceCacheLimits();
            
            // Take control of all clients
            await self.clients.claim();
            
            // Notify all clients about the update
            const clients = await self.clients.matchAll({ type: 'window' });
            clients.forEach(client => {
                client.postMessage({
                    type: 'SW_UPDATED',
                    version: BUILD_TIMESTAMP,
                    message: 'A new version is available!'
                });
            });
            
            console.log(`[SW] Activation complete, notified ${clients.length} clients`);
        })()
    );
});

/**
 * Fetch event - intelligent caching strategy based on request type
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    const url = new URL(request.url);
    
    // Skip URLs that should never be cached
    if (CACHE_CONFIG.neverCache.some(pattern => pattern.test(request.url))) {
        return;
    }
    
    // Check if this is a trusted origin
    const isSameOrigin = url.origin === self.location.origin;
    const isTrustedCDN = CACHE_CONFIG.trustedCDNs.some(cdn => url.hostname.includes(cdn));
    
    if (!isSameOrigin && !isTrustedCDN) {
        return;
    }
    
    // Determine caching strategy based on request type
    if (request.mode === 'navigate') {
        // Navigation requests: network-first with offline fallback
        event.respondWith(networkFirstWithOfflineFallback(request));
    } else if (isStaticAsset(request.url)) {
        // Static assets: stale-while-revalidate
        event.respondWith(staleWhileRevalidate(request));
    } else {
        // Other requests: cache-first for speed
        event.respondWith(cacheFirst(request));
    }
});

/**
 * Check if URL is a static asset
 */
function isStaticAsset(url) {
    const patterns = [
        ...CACHE_CONFIG.cachePatterns.static,
        ...CACHE_CONFIG.cachePatterns.images,
        ...CACHE_CONFIG.cachePatterns.fonts
    ];
    return patterns.some(pattern => pattern.test(url));
}

/**
 * Get asset category for cache management
 */
function getAssetCategory(url) {
    for (const [category, patterns] of Object.entries(CACHE_CONFIG.cachePatterns)) {
        if (patterns.some(pattern => pattern.test(url))) {
            return category;
        }
    }
    return 'static';
}

/**
 * Network-first strategy with offline fallback
 * Best for navigation requests and critical resources
 */
async function networkFirstWithOfflineFallback(request) {
    const cache = await caches.open(CACHE_NAME);
    
    try {
        // Try network first with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const networkResponse = await fetch(request, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (networkResponse.ok) {
            // Update cache in background
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed for navigation, trying cache:', request.url);
        
        // Try cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page for navigation requests
        const offlineResponse = await cache.match(OFFLINE_URL);
        if (offlineResponse) {
            return offlineResponse;
        }
        
        // Final fallback
        return new Response(createOfflineFallbackHTML(), {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/html' }
        });
    }
}

/**
 * Stale-while-revalidate strategy
 * Returns cached response immediately, updates cache in background
 */
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Start fetching in background
    const fetchPromise = fetch(request)
        .then(async (networkResponse) => {
            if (networkResponse && networkResponse.ok) {
                // Clone and cache the new response with timestamp
                const responseToCache = networkResponse.clone();
                await cacheWithMetadata(cache, request, responseToCache);
            }
            return networkResponse;
        })
        .catch((error) => {
            console.log('[SW] Background fetch failed:', request.url);
            return null;
        });
    
    // Return cached response immediately if available
    if (cachedResponse) {
        // Trigger background update but don't wait for it
        fetchPromise.catch(() => {});
        return cachedResponse;
    }
    
    // No cache - wait for network
    try {
        const networkResponse = await fetchPromise;
        
        if (networkResponse) {
            return networkResponse;
        }
        
        // Return error response
        return createErrorResponse(request);
    } catch (error) {
        return createErrorResponse(request);
    }
}

/**
 * Cache-first strategy
 * Best for assets that don't change often
 */
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            await cacheWithMetadata(cache, request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        return createErrorResponse(request);
    }
}

/**
 * Cache response with metadata for age-based cleanup
 */
async function cacheWithMetadata(cache, request, response) {
    try {
        // Add timestamp header for cache management
        const headers = new Headers(response.headers);
        headers.set('sw-cache-timestamp', Date.now().toString());
        
        const cachedResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: headers
        });
        
        await cache.put(request, cachedResponse);
    } catch (error) {
        // Fallback to simple caching
        await cache.put(request, response);
    }
}

/**
 * Enforce cache size limits to prevent storage bloat
 */
async function enforceCacheLimits() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const requests = await cache.keys();
        
        // Categorize cached items
        const categorized = {
            static: [],
            images: [],
            fonts: [],
            other: []
        };
        
        for (const request of requests) {
            const category = getAssetCategory(request.url);
            const response = await cache.match(request);
            const timestamp = response?.headers?.get('sw-cache-timestamp');
            
            categorized[category] = categorized[category] || [];
            categorized[category].push({
                request,
                timestamp: timestamp ? parseInt(timestamp) : 0
            });
        }
        
        // Enforce limits per category
        for (const [category, items] of Object.entries(categorized)) {
            const maxEntries = CACHE_CONFIG.maxEntries[category] || 50;
            const maxAge = CACHE_CONFIG.maxAge[category] || CACHE_CONFIG.maxAge.static;
            const now = Date.now();
            
            // Sort by timestamp (oldest first)
            items.sort((a, b) => a.timestamp - b.timestamp);
            
            // Remove expired entries
            for (const item of items) {
                if (item.timestamp && (now - item.timestamp) > maxAge) {
                    await cache.delete(item.request);
                    console.log(`[SW] Removed expired: ${item.request.url}`);
                }
            }
            
            // Remove excess entries (oldest first)
            const remaining = items.filter(item => {
                return !item.timestamp || (now - item.timestamp) <= maxAge;
            });
            
            if (remaining.length > maxEntries) {
                const toRemove = remaining.slice(0, remaining.length - maxEntries);
                for (const item of toRemove) {
                    await cache.delete(item.request);
                    console.log(`[SW] Removed excess: ${item.request.url}`);
                }
            }
        }
        
        console.log('[SW] Cache limits enforced');
    } catch (error) {
        console.error('[SW] Failed to enforce cache limits:', error);
    }
}

/**
 * Create error response based on request type
 */
function createErrorResponse(request) {
    const url = new URL(request.url);
    
    // Return appropriate error based on file type
    if (/\.(js|mjs)$/.test(url.pathname)) {
        return new Response('// Offline - resource unavailable', {
            status: 503,
            headers: { 'Content-Type': 'application/javascript' }
        });
    }
    
    if (/\.css$/.test(url.pathname)) {
        return new Response('/* Offline - resource unavailable */', {
            status: 503,
            headers: { 'Content-Type': 'text/css' }
        });
    }
    
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(url.pathname)) {
        // Return a transparent 1x1 pixel
        return new Response(
            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            {
                status: 503,
                headers: { 'Content-Type': 'image/gif' }
            }
        );
    }
    
    return new Response('Offline - resource unavailable', {
        status: 503,
        statusText: 'Service Unavailable'
    });
}

/**
 * Create minimal offline fallback HTML
 */
function createOfflineFallbackHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - CS Master Pro</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0d1117; color: #e6edf3; 
               display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
        .container { text-align: center; padding: 20px; }
        h1 { color: #10b981; }
        button { background: #10b981; color: white; border: none; padding: 12px 24px; 
                 border-radius: 8px; cursor: pointer; font-size: 16px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📡 You're Offline</h1>
        <p>Please check your connection and try again.</p>
        <button onclick="location.reload()">Retry</button>
    </div>
    <script>window.addEventListener('online', () => location.reload());</script>
</body>
</html>`;
}

/**
 * Background sync for progress data
 */
self.addEventListener('sync', (event) => {
    console.log('[SW] Sync event:', event.tag);
    
    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    } else if (event.tag === 'sync-analytics') {
        event.waitUntil(syncAnalytics());
    }
});

/**
 * Sync user progress data
 */
async function syncProgress() {
    try {
        // Get pending sync data from IndexedDB
        const pendingData = await getPendingSyncData('progress');
        
        if (pendingData && pendingData.length > 0) {
            console.log(`[SW] Syncing ${pendingData.length} progress entries`);
            
            // In a real app, this would sync to a server
            // For now, just mark as synced
            await clearPendingSyncData('progress');
            
            // Notify clients
            const clients = await self.clients.matchAll({ type: 'window' });
            clients.forEach(client => {
                client.postMessage({
                    type: 'SYNC_COMPLETE',
                    syncType: 'progress',
                    count: pendingData.length
                });
            });
        }
        
        console.log('[SW] Progress sync complete');
    } catch (error) {
        console.error('[SW] Progress sync failed:', error);
        throw error; // Re-throw to retry sync
    }
}

/**
 * Sync analytics data
 */
async function syncAnalytics() {
    try {
        console.log('[SW] Analytics sync complete');
    } catch (error) {
        console.error('[SW] Analytics sync failed:', error);
    }
}

/**
 * IndexedDB helpers for background sync
 */
const DB_NAME = 'csmaster-sync';
const DB_VERSION = 1;

function openSyncDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('pending')) {
                db.createObjectStore('pending', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

async function getPendingSyncData(type) {
    try {
        const db = await openSyncDB();
        const tx = db.transaction('pending', 'readonly');
        const store = tx.objectStore('pending');
        
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                const data = request.result.filter(item => item.type === type);
                resolve(data);
            };
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('[SW] Failed to get pending sync data:', error);
        return [];
    }
}

async function clearPendingSyncData(type) {
    try {
        const db = await openSyncDB();
        const tx = db.transaction('pending', 'readwrite');
        const store = tx.objectStore('pending');
        
        const request = store.getAll();
        request.onsuccess = () => {
            request.result
                .filter(item => item.type === type)
                .forEach(item => store.delete(item.id));
        };
    } catch (error) {
        console.error('[SW] Failed to clear pending sync data:', error);
    }
}

/**
 * Periodic background sync (if supported)
 */
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-content') {
        event.waitUntil(updateCachedContent());
    }
});

async function updateCachedContent() {
    try {
        const cache = await caches.open(CACHE_NAME);
        
        // Update critical cached resources
        const criticalResources = [
            '/cs-master-pro/js/data/questions.js',
            '/cs-master-pro/js/data/topics.js'
        ];
        
        for (const url of criticalResources) {
            try {
                const response = await fetch(url, { cache: 'no-store' });
                if (response.ok) {
                    await cache.put(url, response);
                }
            } catch (error) {
                console.log(`[SW] Failed to update ${url}:`, error);
            }
        }
        
        console.log('[SW] Periodic content update complete');
    } catch (error) {
        console.error('[SW] Periodic update failed:', error);
    }
}

/**
 * Push notifications support
 */
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    try {
        const data = event.data.json();
        
        const options = {
            body: data.body || 'You have a new notification',
            icon: '/cs-master-pro/icons/icon-192.png',
            badge: '/cs-master-pro/icons/badge-72.png',
            vibrate: [100, 50, 100],
            tag: data.tag || 'csmaster-notification',
            renotify: true,
            data: {
                url: data.url || '/cs-master-pro/',
                action: data.action
            },
            actions: [
                { action: 'open', title: 'Open App' },
                { action: 'dismiss', title: 'Dismiss' }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'CS Master Pro', options)
        );
    } catch (e) {
        console.error('[SW] Push notification error:', e);
    }
});

/**
 * Handle notification click
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'dismiss') return;
    
    const urlToOpen = event.notification.data?.url || '/cs-master-pro/';
    
    event.waitUntil(
        (async () => {
            // Try to focus an existing window
            const allClients = await self.clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            });
            
            for (const client of allClients) {
                if (client.url.includes('/cs-master-pro/') && 'focus' in client) {
                    await client.focus();
                    client.postMessage({
                        type: 'NOTIFICATION_CLICK',
                        url: urlToOpen,
                        action: event.notification.data?.action
                    });
                    return;
                }
            }
            
            // No existing window, open new one
            await self.clients.openWindow(urlToOpen);
        })()
    );
});

/**
 * Handle messages from main thread
 */
self.addEventListener('message', (event) => {
    const { data } = event;
    
    switch (data?.type) {
        case 'SKIP_WAITING':
            console.log('[SW] Skip waiting requested');
            self.skipWaiting();
            break;
            
        case 'GET_VERSION':
            event.ports?.[0]?.postMessage({ 
                version: BUILD_TIMESTAMP,
                cacheName: CACHE_NAME
            });
            break;
            
        case 'CLEAR_CACHE':
            caches.delete(CACHE_NAME).then(() => {
                event.ports?.[0]?.postMessage({ success: true });
            });
            break;
            
        case 'GET_CACHE_STATS':
            getCacheStats().then(stats => {
                event.ports?.[0]?.postMessage(stats);
            });
            break;
            
        case 'CACHE_URLS':
            cacheUrls(data.urls).then(result => {
                event.ports?.[0]?.postMessage(result);
            });
            break;
    }
});

/**
 * Get cache statistics
 */
async function getCacheStats() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const requests = await cache.keys();
        
        let totalSize = 0;
        const categories = {};
        
        for (const request of requests) {
            const response = await cache.match(request);
            const category = getAssetCategory(request.url);
            
            // Estimate size (not exact but good enough)
            const blob = await response?.clone()?.blob();
            const size = blob?.size || 0;
            
            totalSize += size;
            categories[category] = (categories[category] || 0) + 1;
        }
        
        return {
            totalEntries: requests.length,
            totalSize: formatBytes(totalSize),
            categories,
            version: BUILD_TIMESTAMP
        };
    } catch (error) {
        return { error: error.message };
    }
}

/**
 * Cache specific URLs on demand
 */
async function cacheUrls(urls) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const results = await Promise.allSettled(
            urls.map(async (url) => {
                const response = await fetch(url);
                if (response.ok) {
                    await cache.put(url, response);
                    return { url, success: true };
                }
                return { url, success: false };
            })
        );
        
        return {
            success: true,
            cached: results.filter(r => r.value?.success).length,
            failed: results.filter(r => !r.value?.success).length
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
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

console.log(`[SW] Service worker loaded (v${BUILD_TIMESTAMP})`);
