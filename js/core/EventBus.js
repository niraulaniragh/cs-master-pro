/**
 * EventBus.js - Simple Pub/Sub Event System
 * Enables decoupled communication between components
 */

const EventBus = {
    // Store event listeners
    _events: {},
    
    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} - Unsubscribe function
     */
    on: (event, callback) => {
        if (!EventBus._events[event]) {
            EventBus._events[event] = [];
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
        if (!EventBus._events[event]) return;
        
        EventBus._events[event] = EventBus._events[event].filter(
            cb => cb !== callback
        );
        
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
        if (!EventBus._events[event]) return;
        
        EventBus._events[event].forEach(callback => {
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
     */
    once: (event, callback) => {
        const wrapper = (data) => {
            EventBus.off(event, wrapper);
            callback(data);
        };
        EventBus.on(event, wrapper);
    },
    
    /**
     * Clear all listeners for an event (or all events)
     * @param {string} [event] - Optional event name
     */
    clear: (event) => {
        if (event) {
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
        return EventBus._events[event]?.length || 0;
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

// Export for global access
window.EventBus = EventBus;

console.log('📢 EventBus loaded');
