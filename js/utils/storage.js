/**
 * Storage.js - Local Storage Wrapper
 * Handles persistent data storage with JSON serialization
 */

const Storage = (() => {
    const PREFIX = 'csmaster_';

    const init = () => {
        console.log('💾 Storage initialized');
    };

    const save = (key, data) => {
        try {
            localStorage.setItem(PREFIX + key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    };

    const load = (key) => {
        try {
            const data = localStorage.getItem(PREFIX + key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Storage load error:', e);
            return null;
        }
    };

    const remove = (key) => {
        localStorage.removeItem(PREFIX + key);
    };

    const clear = () => {
        Object.keys(localStorage)
            .filter(key => key.startsWith(PREFIX))
            .forEach(key => localStorage.removeItem(key));
    };

    return { init, save, load, remove, clear };
})();
