/**
 * EventBus.js - Simple Pub/Sub Event System
 * Enables decoupled communication between components
 */

const EventBus = {
    // Store event listeners
    _events: {},
    
    // Max listeners per event to prevent memory leaks
    _maxListeners: 100,
    
    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} - Unsubscribe function
     */
    on: (event, callback) => {
        // Validate parameters
        if (!event || typeof event !== 'string') {
            console.warn('EventBus.on: Invalid event name');
            return () => {};
        }
        
        if (typeof callback !== 'function') {
            console.warn('EventBus.on: Callback must be a function');
            return () => {};
        }
        
        if (!EventBus._events[event]) {
            EventBus._events[event] = [];
        }
        
        // Check for max listeners
        if (EventBus._events[event].length >= EventBus._maxListeners) {
            console.warn(`EventBus: Max listeners (${EventBus._maxListeners}) reached for event "${event}"`);
            return () => {};
        }
        
        // Prevent duplicate callbacks
        if (EventBus._events[event].includes(callback)) {
            console.warn(`EventBus: Duplicate callback for event "${event}"`);
            return () => EventBus.off(event, callback);
        }
        
        EventBus._events[event].push(callback);
        
        // Return unsubscribe function for convenience
        return () => EventBus.off(event, callback);
    },
    
    /**
     * Unsubscribe from an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function to remove
     */
    off: (event, callback) => {
        if (!event || typeof event !== 'string') return;
        if (!EventBus._events[event]) return;
        
        if (typeof callback === 'function') {
            EventBus._events[event] = EventBus._events[event].filter(
                cb => cb !== callback
            );
        }
        
        // Clean up empty event arrays
        if (EventBus._events[event].length === 0) {
            delete EventBus._events[event];
        }
    },
    
    /**
     * Emit an event with data
     * @param {string} event - Event name
     * @param {*} data - Data to pass to listeners
     */
    emit: (event, data) => {
        if (!event || typeof event !== 'string') {
            console.warn('EventBus.emit: Invalid event name');
            return;
        }
        
        if (!EventBus._events[event]) return;
        
        // Create a copy of listeners to avoid issues if listeners modify the array
        const listeners = [...EventBus._events[event]];
        
        listeners.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`EventBus: Error in listener for "${event}":`, error);
            }
        });
    },
    
    /**
     * Subscribe to an event once (auto-unsubscribes after first emit)
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} - Unsubscribe function
     */
    once: (event, callback) => {
        if (!event || typeof event !== 'string') {
            console.warn('EventBus.once: Invalid event name');
            return () => {};
        }
        
        if (typeof callback !== 'function') {
            console.warn('EventBus.once: Callback must be a function');
            return () => {};
        }
        
        const wrapper = (data) => {
            EventBus.off(event, wrapper);
            try {
                callback(data);
            } catch (error) {
                console.error(`EventBus: Error in once listener for "${event}":`, error);
            }
        };
        
        return EventBus.on(event, wrapper);
    },
    
    /**
     * Clear all listeners for an event (or all events)
     * @param {string} [event] - Optional event name
     */
    clear: (event) => {
        if (event && typeof event === 'string') {
            delete EventBus._events[event];
        } else {
            EventBus._events = {};
        }
    },
    
    /**
     * Get list of active events (for debugging)
     * @returns {string[]} - Array of event names
     */
    getActiveEvents: () => Object.keys(EventBus._events),
    
    /**
     * Get listener count for an event
     * @param {string} event - Event name
     * @returns {number} - Number of listeners
     */
    listenerCount: (event) => {
        if (!event || typeof event !== 'string') return 0;
        return EventBus._events[event]?.length || 0;
    },
    
    /**
     * Check if an event has listeners
     * @param {string} event - Event name
     * @returns {boolean}
     */
    hasListeners: (event) => {
        return EventBus.listenerCount(event) > 0;
    },
    
    /**
     * Set max listeners per event
     * @param {number} max - Maximum number of listeners
     */
    setMaxListeners: (max) => {
        if (typeof max === 'number' && max > 0) {
            EventBus._maxListeners = max;
        }
    }
};

// Common event names (for reference)
EventBus.Events = {
    // User events
    USER_LOGIN: 'user:login',
    USER_LOGOUT: 'user:logout',
    USER_XP_GAINED: 'user:xp_gained',
    USER_LEVEL_UP: 'user:level_up',
    
    // Practice events
    QUESTION_ANSWERED: 'question:answered',
    QUESTION_CORRECT: 'question:correct',
    QUESTION_WRONG: 'question:wrong',
    SESSION_COMPLETE: 'session:complete',
    
    // Game events
    GAME_STARTED: 'game:started',
    GAME_ENDED: 'game:ended',
    GAME_SCORE: 'game:score',
    
    // Navigation events
    ROUTE_CHANGED: 'route:changed',
    VIEW_LOADED: 'view:loaded',
    
    // Daily goals events
    GOAL_PROGRESS: 'goal:progress',
    GOAL_COMPLETE: 'goal:complete',
    
    // System events
    THEME_CHANGED: 'theme:changed',
    OFFLINE_MODE: 'offline:mode',
    DATA_SYNCED: 'data:synced'
};

// Freeze events object to prevent accidental modification
Object.freeze(EventBus.Events);

// Export for global access
if (typeof window !== 'undefined') {
    window.EventBus = EventBus;
}

console.log('📢 EventBus loaded');
