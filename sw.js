/**
 * Service Worker for CS Master Pro
 * Enables offline functionality with stale-while-revalidate caching
 * Includes version management and automatic cache cleanup
 */

// Version management - update this on each deploy
const BUILD_TIMESTAMP = '20261021233400';
const CACHE_NAME = `csmaster-v${BUILD_TIMESTAMP}`;
const OFFLINE_URL = '/cs-master-pro/offline.html';

// Cache configuration
const CACHE_CONFIG = {
    // Files to cache immediately on install (app shell)
    precache: [
        '/cs-master-pro/',
        '/cs-master-pro/index.html',
        '/cs-master-pro/offline.html',
        '/cs-master-pro/styles/main.css',
        '/cs-master-pro/styles/games.css',
        '/cs-master-pro/manifest.json'
    ],
    // Patterns for runtime caching
    runtimeCache: [
        /\.js$/,
        /\.css$/,
        /\.woff2?$/,
        /\.png$/,
        /\.jpg$/,
        /\.svg$/
    ],
    // Files/patterns to never cache
    neverCache: [
        /\/api\//,
        /chrome-extension/,
        /localhost/
    ]
};

/**
 * Install event - precache essential files
 */
self.addEventListener('install', (event) => {
    console.log(`[SW] Installing version ${BUILD_TIMESTAMP}...`);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Precaching app shell');
                // Use addAll with error handling for individual files
                return Promise.allSettled(
                    CACHE_CONFIG.precache.map(url => 
                        cache.add(url).catch(err => {
                            console.warn(`[SW] Failed to precache ${url}:`, err);
                        })
                    )
                );
            })
            .then(() => {
                console.log('[SW] Precaching complete');
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
            .catch((err) => {
                console.error('[SW] Precaching failed:', err);
            })
    );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
    console.log(`[SW] Activating version ${BUILD_TIMESTAMP}...`);
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => {
                            // Delete all caches that don't match current version
                            return name.startsWith('csmaster-') && name !== CACHE_NAME;
                        })
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Old caches cleaned up');
                // Take control of all clients immediately
                return self.clients.claim();
            })
            .then(() => {
                // Notify clients about the update
                return self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'SW_UPDATED',
                            version: BUILD_TIMESTAMP
                        });
                    });
                });
            })
    );
});

/**
 * Fetch event - implement stale-while-revalidate strategy
 */
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip cross-origin requests (except CDNs we trust)
    const url = new URL(event.request.url);
    const isSameOrigin = url.origin === self.location.origin;
    const isTrustedCDN = url.hostname.includes('cdnjs.cloudflare.com') || 
                         url.hostname.includes('fonts.googleapis.com') ||
                         url.hostname.includes('fonts.gstatic.com') ||
                         url.hostname.includes('cdn.jsdelivr.net');
    
    if (!isSameOrigin && !isTrustedCDN) return;
    
    // Skip URLs that should never be cached
    if (CACHE_CONFIG.neverCache.some(pattern => pattern.test(event.request.url))) return;
    
    event.respondWith(staleWhileRevalidate(event.request));
});

/**
 * Stale-While-Revalidate caching strategy
 * Returns cached response immediately, then updates cache in background
 */
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Start fetching in background
    const fetchPromise = fetch(request)
        .then((networkResponse) => {
            // Check if valid response
            if (networkResponse && networkResponse.status === 200) {
                // Clone and cache the new response
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch((error) => {
            console.log('[SW] Network request failed:', request.url);
            return null;
        });
    
    // Return cached response immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // No cache - wait for network
    try {
        const networkResponse = await fetchPromise;
        
        if (networkResponse) {
            return networkResponse;
        }
        
        // Network failed, no cache - return offline page for navigation
        if (request.mode === 'navigate') {
            return cache.match(OFFLINE_URL);
        }
        
        // Return error response for other requests
        return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    } catch (error) {
        // Fallback for navigation requests
        if (request.mode === 'navigate') {
            return cache.match(OFFLINE_URL);
        }
        throw error;
    }
}

/**
 * Background sync for progress data
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-progress') {
        console.log('[SW] Syncing progress data...');
        event.waitUntil(syncProgress());
    }
});

async function syncProgress() {
    // Future: Sync localStorage data to server
    console.log('[SW] Progress sync complete');
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
            data: {
                url: data.url || '/cs-master-pro/'
            },
            actions: [
                { action: 'open', title: 'Open App' },
                { action: 'close', title: 'Dismiss' }
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
    
    if (event.action === 'close') return;
    
    event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/cs-master-pro/')
    );
});

/**
 * Handle messages from main thread
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: BUILD_TIMESTAMP });
    }
});

console.log(`[SW] Service worker loaded (v${BUILD_TIMESTAMP})`);
