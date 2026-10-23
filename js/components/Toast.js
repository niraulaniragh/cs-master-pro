/**
 * Toast.js - Toast Notification Component
 * Shows non-blocking notifications that auto-dismiss
 */

const Toast = (() => {
    let container = null;
    const activeToasts = new Map(); // Track active toasts with unique IDs
    const MAX_TOASTS = 5; // Limit concurrent toasts
    let toastIdCounter = 0;

    // Default durations by type (errors stay longer)
    const DEFAULT_DURATIONS = {
        success: 3000,
        error: 5000,
        warning: 4000,
        info: 3000
    };

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
        // Accessibility: Use aria-live region for screen readers
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Notifications');
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'false');
        // Stacking: Apply inline styles for proper stacking context
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-height: 100vh;
            overflow: hidden;
            pointer-events: none;
        `;
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
     * @param {string} type - The toast type for default duration
     * @returns {number} Valid duration in milliseconds
     */
    const validateDuration = (duration, type) => {
        if (duration === undefined || duration === null) {
            return DEFAULT_DURATIONS[type] || 3000;
        }
        const num = Number(duration);
        if (isNaN(num) || num < 0) {
            return DEFAULT_DURATIONS[type] || 3000;
        }
        return Math.min(Math.max(num, 500), 30000); // Clamp between 500ms and 30s
    };

    /**
     * Remove oldest toast if limit exceeded
     */
    const enforceLimit = () => {
        if (activeToasts.size >= MAX_TOASTS) {
            const oldestId = activeToasts.keys().next().value;
            const oldest = activeToasts.get(oldestId);
            if (oldest && oldest.element) {
                removeToast(oldestId);
            }
        }
    };

    /**
     * Update stacking positions with animation
     */
    const updateStackPositions = () => {
        let index = 0;
        activeToasts.forEach((toastData) => {
            if (toastData.element) {
                toastData.element.style.transform = `translateY(${index * 0}px)`;
                toastData.element.style.order = index;
                index++;
            }
        });
    };

    /**
     * Remove a toast element with animation
     * @param {number} toastId - Toast ID to remove
     */
    const removeToast = (toastId) => {
        const toastData = activeToasts.get(toastId);
        if (!toastData || !toastData.element) return;

        // Clear timeout to prevent double removal
        if (toastData.timeoutId) {
            clearTimeout(toastData.timeoutId);
            toastData.timeoutId = null;
        }

        activeToasts.delete(toastId);

        const element = toastData.element;
        
        // Animate out
        element.style.animation = 'toast-slide-out 0.3s ease-in forwards';
        element.classList.remove('show');

        // Wait for animation then remove
        const removeTimeout = setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
            updateStackPositions();
        }, 300);

        // Store cleanup timeout for potential early cleanup
        toastData.cleanupTimeoutId = removeTimeout;
    };

    /**
     * Handle keyboard events on toast
     * @param {KeyboardEvent} event - Keyboard event
     * @param {number} toastId - Toast ID
     */
    const handleKeyDown = (event, toastId) => {
        if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            removeToast(toastId);
        }
    };

    /**
     * Inject required CSS if not present
     */
    const injectStyles = () => {
        if (document.getElementById('toast-animation-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'toast-animation-styles';
        style.textContent = `
            @keyframes toast-slide-in {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes toast-slide-out {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .toast {
                pointer-events: auto;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 16px;
                border-radius: 8px;
                background: #333;
                color: #fff;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                font-size: 14px;
                max-width: 350px;
                opacity: 0;
                transform: translateX(100%);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            .toast.show {
                opacity: 1;
                transform: translateX(0);
                animation: toast-slide-in 0.3s ease-out;
            }
            .toast-success { background: #10b981; }
            .toast-error { background: #ef4444; }
            .toast-warning { background: #f59e0b; }
            .toast-info { background: #3b82f6; }
            .toast-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 4px;
                margin-left: auto;
                opacity: 0.7;
                font-size: 16px;
                line-height: 1;
                border-radius: 4px;
            }
            .toast-close:hover,
            .toast-close:focus {
                opacity: 1;
                background: rgba(255,255,255,0.1);
            }
            .toast-close:focus {
                outline: 2px solid rgba(255,255,255,0.5);
                outline-offset: 2px;
            }
            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(255,255,255,0.3);
                border-radius: 0 0 8px 8px;
            }
            .toast { position: relative; overflow: hidden; }
        `;
        document.head.appendChild(style);
    };

    /**
     * Show a toast notification
     * @param {string} message - The message to display
     * @param {string} [type='info'] - Toast type: success, error, warning, info
     * @param {number} [duration] - Duration in milliseconds (defaults by type)
     * @returns {Object|null} Toast control object with dismiss method, or null on failure
     */
    const show = (message, type = 'info', duration) => {
        try {
            injectStyles();
            
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
            const validDuration = validateDuration(duration, validType);

            // Enforce toast limit
            enforceLimit();

            const toastId = ++toastIdCounter;
            const toast = document.createElement('div');
            toast.className = `toast toast-${validType}`;
            toast.setAttribute('role', validType === 'error' ? 'alert' : 'status');
            toast.setAttribute('aria-live', validType === 'error' ? 'assertive' : 'polite');
            toast.setAttribute('aria-atomic', 'true');
            toast.setAttribute('tabindex', '0');

            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };

            toast.innerHTML = `
                <span class="toast-icon" aria-hidden="true">${icons[validType]}</span>
                <span class="toast-message">${sanitizedMessage}</span>
                <button class="toast-close" aria-label="Dismiss notification" type="button">×</button>
                <div class="toast-progress" style="animation: toast-progress ${validDuration}ms linear forwards;"></div>
            `;

            // Add progress bar animation
            const progressStyle = document.createElement('style');
            progressStyle.textContent = `
                @keyframes toast-progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `;
            if (!document.getElementById('toast-progress-style')) {
                progressStyle.id = 'toast-progress-style';
                document.head.appendChild(progressStyle);
            }

            containerEl.appendChild(toast);

            // Create toast data object for tracking
            const toastData = {
                element: toast,
                timeoutId: null,
                cleanupTimeoutId: null
            };
            activeToasts.set(toastId, toastData);

            // Event listeners for dismiss
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => removeToast(toastId));
            toast.addEventListener('keydown', (e) => handleKeyDown(e, toastId));

            // Pause auto-dismiss on hover/focus
            let remainingTime = validDuration;
            let startTime = Date.now();

            const pauseDismiss = () => {
                if (toastData.timeoutId) {
                    clearTimeout(toastData.timeoutId);
                    remainingTime -= Date.now() - startTime;
                    const progress = toast.querySelector('.toast-progress');
                    if (progress) progress.style.animationPlayState = 'paused';
                }
            };

            const resumeDismiss = () => {
                startTime = Date.now();
                const progress = toast.querySelector('.toast-progress');
                if (progress) progress.style.animationPlayState = 'running';
                toastData.timeoutId = setTimeout(() => {
                    removeToast(toastId);
                }, remainingTime);
            };

            toast.addEventListener('mouseenter', pauseDismiss);
            toast.addEventListener('mouseleave', resumeDismiss);
            toast.addEventListener('focusin', pauseDismiss);
            toast.addEventListener('focusout', resumeDismiss);

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
                removeToast(toastId);
            }, validDuration);

            updateStackPositions();

            // Return control object
            return {
                id: toastId,
                element: toast,
                dismiss: () => removeToast(toastId)
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
        activeToasts.forEach((toastData, toastId) => {
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
        // Remove injected styles
        const styles = document.getElementById('toast-animation-styles');
        if (styles) styles.remove();
        const progressStyle = document.getElementById('toast-progress-style');
        if (progressStyle) progressStyle.remove();
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
