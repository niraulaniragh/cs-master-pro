/**
 * Service Worker for CS Master Pro
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'csmaster-v1';
const OFFLINE_URL = '/cs-master-pro/offline.html';

// Files to cache immediately on install
const PRECACHE_URLS = [
    '/cs-master-pro/',
    '/cs-master-pro/index.html',
    '/cs-master-pro/styles/main.css',
    '/cs-master-pro/styles/games.css',
    '/cs-master-pro/js/core/App.js',
    '/cs-master-pro/js/core/Auth.js',
    '/cs-master-pro/js/core/Router.js',
    '/cs-master-pro/js/core/State.js',
    '/cs-master-pro/js/core/StreakSystem.js',
    '/cs-master-pro/js/core/SRSSystem.js',
    '/cs-master-pro/js/data/questions.js',
    '/cs-master-pro/js/data/notes.js',
    '/cs-master-pro/js/data/flashcards.js',
    '/cs-master-pro/manifest.json'
];

// Install event - precache essential files
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Precaching app shell');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                console.log('[SW] Precaching complete');
                return self.skipWaiting();
            })
            .catch((err) => {
                console.error('[SW] Precaching failed:', err);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Claiming clients');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }
                
                // Not in cache - fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone and cache the response
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Network failed - return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }
                        
                        // For other requests, return a simple error
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Background sync for progress data
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-progress') {
        console.log('[SW] Syncing progress data...');
        event.waitUntil(syncProgress());
    }
});

async function syncProgress() {
    // Get pending progress from IndexedDB and sync to server
    // For now, localStorage-based app doesn't need this
    console.log('[SW] Progress sync complete');
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
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
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'close') return;
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/cs-master-pro/')
    );
});

console.log('[SW] Service worker loaded');
