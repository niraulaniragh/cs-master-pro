/**
 * Service Worker - Self-Unregistering
 * PWA functionality has been removed from this application.
 * This service worker unregisters itself and cleans up any existing caches.
 */

// Immediately unregister this service worker
self.addEventListener('install', (event) => {
    console.log('[SW] Installing self-unregistering service worker...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating and cleaning up...');
    
    event.waitUntil(
        (async () => {
            // Delete all caches
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => {
                    console.log('[SW] Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
            
            // Unregister this service worker
            const registration = await self.registration;
            await registration.unregister();
            console.log('[SW] Service worker unregistered');
            
            // Notify clients to reload (optional)
            const clients = await self.clients.matchAll({ type: 'window' });
            clients.forEach(client => {
                client.postMessage({ type: 'SW_UNREGISTERED' });
            });
        })()
    );
});

// Pass through all fetch requests - no caching
self.addEventListener('fetch', (event) => {
    // Do nothing - let requests pass through normally
});
