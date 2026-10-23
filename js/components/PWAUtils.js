/**
 * PWA Utilities Component - DISABLED
 * All PWA/offline functionality has been removed.
 * These are stub functions that do nothing.
 */

const PWAUtils = (function() {
    'use strict';
    
    // Empty stub functions
    function init() {}
    function queueOfflineAction() {}
    function saveProgressOffline() { return Promise.resolve(false); }
    function cacheData() { return Promise.resolve(false); }
    function getCachedData() { return Promise.resolve(null); }
    function getStorageEstimate() { return Promise.resolve(null); }
    function requestPersistentStorage() { return Promise.resolve(false); }
    function isInstalledPWA() { return false; }
    function prefetchResources() { return Promise.resolve([]); }
    function formatBytes() { return '0 B'; }
    
    // Public API - all no-ops
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

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PWAUtils;
}
