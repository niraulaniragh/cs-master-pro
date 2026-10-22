/**
 * Toast.js - Toast Notification Component
 * Shows non-blocking notifications that auto-dismiss
 */

const Toast = (() => {
    let container = null;
    const activeToasts = new Set(); // Track active toasts for cleanup
    const MAX_TOASTS = 5; // Limit concurrent toasts

    /**
     * Initialize toast container
     * @returns {HTMLElement|null} The container element or null if document.body unavailable
     */
    const init = () => {
        if (container && document.body.contains(container)) {
            return container;
        }

        if (!document.body) {
            console.warn('Toast: document.body not available');
            return null;
        }

        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('role', 'alert');
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
        return container;
    };

    /**
     * Validate and sanitize message
     * @param {*} message - The message to validate
     * @returns {string} Sanitized message string
     */
    const sanitizeMessage = (message) => {
        if (message === null || message === undefined) {
            return '';
        }
        if (typeof message !== 'string') {
            message = String(message);
        }
        // Basic XSS protection - escape HTML
        const div = document.createElement('div');
        div.textContent = message;
        return div.innerHTML;
    };

    /**
     * Validate toast type
     * @param {string} type - The toast type
     * @returns {string} Valid toast type
     */
    const validateType = (type) => {
        const validTypes = ['success', 'error', 'warning', 'info'];
        return validTypes.includes(type) ? type : 'info';
    };

    /**
     * Validate duration
     * @param {*} duration - The duration value
     * @returns {number} Valid duration in milliseconds
     */
    const validateDuration = (duration) => {
        const num = Number(duration);
        if (isNaN(num) || num < 0) {
            return 3000; // Default
        }
        return Math.min(Math.max(num, 500), 30000); // Clamp between 500ms and 30s
    };

    /**
     * Remove oldest toast if limit exceeded
     */
    const enforceLimit = () => {
        if (activeToasts.size >= MAX_TOASTS) {
            const oldest = activeToasts.values().next().value;
            if (oldest && oldest.element) {
                removeToast(oldest);
            }
        }
    };

    /**
     * Remove a toast element with animation
     * @param {Object} toastData - Toast data object with element and timeoutId
     */
    const removeToast = (toastData) => {
        if (!toastData || !toastData.element) return;

        // Clear timeout to prevent double removal
        if (toastData.timeoutId) {
            clearTimeout(toastData.timeoutId);
            toastData.timeoutId = null;
        }

        activeToasts.delete(toastData);

        const element = toastData.element;
        element.classList.remove('show');

        // Wait for animation then remove
        const removeTimeout = setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, 300);

        // Store cleanup timeout for potential early cleanup
        toastData.cleanupTimeoutId = removeTimeout;
    };

    /**
     * Show a toast notification
     * @param {string} message - The message to display
     * @param {string} [type='info'] - Toast type: success, error, warning, info
     * @param {number} [duration=3000] - Duration in milliseconds
     * @returns {Object|null} Toast control object with dismiss method, or null on failure
     */
    const show = (message, type = 'info', duration = 3000) => {
        try {
            const containerEl = init();
            if (!containerEl) {
                console.warn('Toast: Could not initialize container');
                return null;
            }

            // Validate inputs
            const sanitizedMessage = sanitizeMessage(message);
            if (!sanitizedMessage) {
                console.warn('Toast: Empty message provided');
                return null;
            }

            const validType = validateType(type);
            const validDuration = validateDuration(duration);

            // Enforce toast limit
            enforceLimit();

            const toast = document.createElement('div');
            toast.className = `toast toast-${validType}`;
            toast.setAttribute('role', 'status');

            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };

            toast.innerHTML = `
                <span class="toast-icon">${icons[validType]}</span>
                <span class="toast-message">${sanitizedMessage}</span>
            `;

            containerEl.appendChild(toast);

            // Create toast data object for tracking
            const toastData = {
                element: toast,
                timeoutId: null,
                cleanupTimeoutId: null
            };
            activeToasts.add(toastData);

            // Play sound based on type (with safety check)
            try {
                if (typeof SoundFX !== 'undefined' && SoundFX.play) {
                    if (validType === 'success') {
                        SoundFX.play('success');
                    } else if (validType === 'error') {
                        SoundFX.play('error');
                    } else if (sanitizedMessage.includes('XP')) {
                        SoundFX.play('xp');
                    } else if (sanitizedMessage.includes('Level Up')) {
                        SoundFX.play('levelup');
                    } else if (sanitizedMessage.includes('Achievement')) {
                        SoundFX.play('success');
                    }
                }
            } catch (soundError) {
                // Silently fail - sound is not critical
                console.debug('Toast: Sound playback failed', soundError);
            }

            // Trigger animation
            requestAnimationFrame(() => {
                if (toast.parentNode) {
                    toast.classList.add('show');
                }
            });

            // Auto remove after duration
            toastData.timeoutId = setTimeout(() => {
                removeToast(toastData);
            }, validDuration);

            // Return control object
            return {
                element: toast,
                dismiss: () => removeToast(toastData)
            };

        } catch (error) {
            console.error('Toast: Error showing toast', error);
            return null;
        }
    };

    /**
     * Show success toast
     * @param {string} message - The message to display
     * @param {number} [duration] - Duration in milliseconds
     * @returns {Object|null} Toast control object
     */
    const success = (message, duration) => show(message, 'success', duration);

    /**
     * Show error toast
     * @param {string} message - The message to display
     * @param {number} [duration] - Duration in milliseconds
     * @returns {Object|null} Toast control object
     */
    const error = (message, duration) => show(message, 'error', duration);

    /**
     * Show warning toast
     * @param {string} message - The message to display
     * @param {number} [duration] - Duration in milliseconds
     * @returns {Object|null} Toast control object
     */
    const warning = (message, duration) => show(message, 'warning', duration);

    /**
     * Show info toast
     * @param {string} message - The message to display
     * @param {number} [duration] - Duration in milliseconds
     * @returns {Object|null} Toast control object
     */
    const info = (message, duration) => show(message, 'info', duration);

    /**
     * Clear all active toasts
     */
    const clearAll = () => {
        activeToasts.forEach(toastData => {
            if (toastData.timeoutId) {
                clearTimeout(toastData.timeoutId);
            }
            if (toastData.cleanupTimeoutId) {
                clearTimeout(toastData.cleanupTimeoutId);
            }
            if (toastData.element && toastData.element.parentNode) {
                toastData.element.remove();
            }
        });
        activeToasts.clear();
    };

    /**
     * Destroy toast system and cleanup
     */
    const destroy = () => {
        clearAll();
        if (container && container.parentNode) {
            container.remove();
        }
        container = null;
    };

    /**
     * Get count of active toasts
     * @returns {number} Number of active toasts
     */
    const getActiveCount = () => activeToasts.size;

    return {
        show,
        success,
        error,
        warning,
        info,
        clearAll,
        destroy,
        getActiveCount
    };
})();
