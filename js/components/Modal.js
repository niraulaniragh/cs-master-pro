/**
 * Modal.js - Modal Dialog Component
 * Displays overlay dialogs for confirmations, info, or custom content
 */

const Modal = (() => {
    let modalElement = null;
    let onCloseCallback = null;
    let confirmCallback = null;
    let cancelCallback = null;
    let escapeHandler = null;
    let focusTrap = null;
    let previousActiveElement = null;
    
    // Track bound event handlers for cleanup
    const boundHandlers = new Map();

    /**
     * Sanitize HTML content to prevent XSS
     * @param {string} content - Content to sanitize
     * @returns {string} Sanitized content
     */
    const sanitizeContent = (content) => {
        if (content === null || content === undefined) {
            return '';
        }
        return String(content);
    };

    /**
     * Sanitize text content (escapes HTML)
     * @param {string} text - Text to sanitize
     * @returns {string} Escaped text
     */
    const escapeText = (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    /**
     * Create the modal DOM structure
     */
    const create = () => {
        if (modalElement && document.body.contains(modalElement)) {
            return;
        }

        if (!document.body) {
            console.warn('Modal: document.body not available');
            return;
        }

        modalElement = document.createElement('div');
        modalElement.className = 'modal-overlay';
        modalElement.setAttribute('role', 'dialog');
        modalElement.setAttribute('aria-modal', 'true');
        modalElement.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer"></div>
            </div>
        `;

        document.body.appendChild(modalElement);

        // Close on overlay click
        const overlayClickHandler = (e) => {
            if (e.target === modalElement) {
                close();
            }
        };
        modalElement.addEventListener('click', overlayClickHandler);
        boundHandlers.set('overlayClick', { element: modalElement, type: 'click', handler: overlayClickHandler });

        // Close button
        const closeBtn = modalElement.querySelector('.modal-close');
        if (closeBtn) {
            const closeBtnHandler = () => close();
            closeBtn.addEventListener('click', closeBtnHandler);
            boundHandlers.set('closeBtn', { element: closeBtn, type: 'click', handler: closeBtnHandler });
        }

        // Escape key handler
        escapeHandler = (e) => {
            if (e.key === 'Escape' && modalElement && modalElement.classList.contains('show')) {
                e.preventDefault();
                close();
            }
        };
        document.addEventListener('keydown', escapeHandler);
    };

    /**
     * Set up focus trap within modal
     */
    const setupFocusTrap = () => {
        if (!modalElement) return;

        const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        focusTrap = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        };

        modalElement.addEventListener('keydown', focusTrap);
    };

    /**
     * Remove focus trap
     */
    const removeFocusTrap = () => {
        if (focusTrap && modalElement) {
            modalElement.removeEventListener('keydown', focusTrap);
            focusTrap = null;
        }
    };

    /**
     * Show modal with options
     * @param {Object} options - Modal configuration
     * @param {string} [options.title=''] - Modal title
     * @param {string} [options.content=''] - Modal body content (HTML)
     * @param {string} [options.footer=''] - Modal footer content (HTML)
     * @param {Function} [options.onClose=null] - Callback when modal closes
     * @param {string} [options.className=''] - Additional CSS class
     * @returns {boolean} True if modal was shown successfully
     */
    const show = (options = {}) => {
        try {
            create();

            if (!modalElement) {
                console.warn('Modal: Could not create modal element');
                return false;
            }

            const {
                title = '',
                content = '',
                footer = '',
                onClose = null,
                className = ''
            } = options;

            const modal = modalElement.querySelector('.modal');
            if (!modal) {
                console.error('Modal: Modal inner element not found');
                return false;
            }

            // Reset classes and apply new ones
            modal.className = 'modal' + (className ? ` ${className}` : '');

            // Set content safely
            const titleEl = modalElement.querySelector('.modal-title');
            const bodyEl = modalElement.querySelector('.modal-body');
            const footerEl = modalElement.querySelector('.modal-footer');

            if (titleEl) {
                titleEl.textContent = title; // Use textContent for title to prevent XSS
            }
            if (bodyEl) {
                bodyEl.innerHTML = sanitizeContent(content);
            }
            if (footerEl) {
                footerEl.innerHTML = sanitizeContent(footer);
            }

            // Set ARIA label
            if (title) {
                modalElement.setAttribute('aria-label', title);
            }

            onCloseCallback = typeof onClose === 'function' ? onClose : null;

            // Update app state if available
            try {
                if (typeof AppState !== 'undefined' && AppState.setState) {
                    AppState.setState('ui.modalOpen', true);
                }
            } catch (e) {
                // AppState not available, continue
            }

            // Store current focus to restore later
            previousActiveElement = document.activeElement;

            // Show modal with animation
            requestAnimationFrame(() => {
                if (modalElement) {
                    modalElement.classList.add('show');
                    setupFocusTrap();
                    
                    // Focus first focusable element
                    const firstFocusable = modalElement.querySelector(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (firstFocusable) {
                        firstFocusable.focus();
                    }
                }
            });

            return true;
        } catch (error) {
            console.error('Modal: Error showing modal', error);
            return false;
        }
    };

    /**
     * Close the modal
     */
    const close = () => {
        if (!modalElement) return;

        try {
            modalElement.classList.remove('show');

            // Update app state if available
            try {
                if (typeof AppState !== 'undefined' && AppState.setState) {
                    AppState.setState('ui.modalOpen', false);
                }
            } catch (e) {
                // AppState not available, continue
            }

            // Execute close callback
            if (onCloseCallback) {
                try {
                    onCloseCallback();
                } catch (callbackError) {
                    console.error('Modal: Error in onClose callback', callbackError);
                }
                onCloseCallback = null;
            }

            // Clear callbacks
            confirmCallback = null;
            cancelCallback = null;

            // Remove focus trap
            removeFocusTrap();

            // Restore previous focus
            if (previousActiveElement && previousActiveElement.focus) {
                try {
                    previousActiveElement.focus();
                } catch (e) {
                    // Element may have been removed
                }
            }
            previousActiveElement = null;

        } catch (error) {
            console.error('Modal: Error closing modal', error);
        }
    };

    /**
     * Destroy modal and cleanup all resources
     */
    const destroy = () => {
        try {
            // Remove escape handler
            if (escapeHandler) {
                document.removeEventListener('keydown', escapeHandler);
                escapeHandler = null;
            }

            // Remove focus trap
            removeFocusTrap();

            // Remove all bound handlers
            boundHandlers.forEach(({ element, type, handler }) => {
                if (element) {
                    element.removeEventListener(type, handler);
                }
            });
            boundHandlers.clear();

            // Remove modal element
            if (modalElement && modalElement.parentNode) {
                modalElement.remove();
            }
            modalElement = null;

            // Clear callbacks
            onCloseCallback = null;
            confirmCallback = null;
            cancelCallback = null;
            previousActiveElement = null;

        } catch (error) {
            console.error('Modal: Error destroying modal', error);
        }
    };

    /**
     * Handle confirm button click
     */
    const handleConfirm = () => {
        const callback = confirmCallback;
        close();
        if (callback) {
            try {
                callback();
            } catch (error) {
                console.error('Modal: Error in confirm callback', error);
            }
        }
    };

    /**
     * Handle cancel button click
     */
    const handleCancel = () => {
        const callback = cancelCallback;
        close();
        if (callback) {
            try {
                callback();
            } catch (error) {
                console.error('Modal: Error in cancel callback', error);
            }
        }
    };

    /**
     * Safely bind button event listener
     * @param {string} buttonId - Button element ID
     * @param {Function} handler - Click handler
     */
    const bindButton = (buttonId, handler) => {
        // Use requestAnimationFrame to ensure DOM is updated
        requestAnimationFrame(() => {
            const btn = document.getElementById(buttonId);
            if (btn) {
                btn.addEventListener('click', handler);
                boundHandlers.set(buttonId, { element: btn, type: 'click', handler });
            }
        });
    };

    /**
     * Show confirmation dialog
     * @param {string} title - Dialog title
     * @param {string} message - Confirmation message
     * @param {Function} onConfirm - Callback when confirmed
     * @param {Function} [onCancel=null] - Callback when cancelled
     * @returns {boolean} True if modal was shown
     */
    const confirm = (title, message, onConfirm, onCancel = null) => {
        // Validate callbacks
        if (typeof onConfirm !== 'function') {
            console.warn('Modal.confirm: onConfirm must be a function');
            return false;
        }

        confirmCallback = onConfirm;
        cancelCallback = typeof onCancel === 'function' ? onCancel : null;

        const result = show({
            title: title || 'Confirm',
            content: `<p>${escapeText(message || '')}</p>`,
            footer: `
                <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
                <button class="btn btn-primary" id="modal-confirm-btn">Confirm</button>
            `
        });

        if (result) {
            bindButton('modal-cancel-btn', handleCancel);
            bindButton('modal-confirm-btn', handleConfirm);
        }

        return result;
    };

    /**
     * Show alert dialog
     * @param {string} title - Dialog title
     * @param {string} message - Alert message
     * @returns {boolean} True if modal was shown
     */
    const alert = (title, message) => {
        const result = show({
            title: title || 'Alert',
            content: `<p>${escapeText(message || '')}</p>`,
            footer: '<button class="btn btn-primary" id="modal-ok-btn">OK</button>'
        });

        if (result) {
            bindButton('modal-ok-btn', close);
        }

        return result;
    };

    /**
     * Show quiz result modal
     * @param {Object} result - Quiz result object
     * @param {number} result.correct - Number of correct answers
     * @param {number} result.total - Total number of questions
     * @param {number} result.xp - XP earned
     * @returns {boolean} True if modal was shown
     */
    const quiz = (result) => {
        // Validate result object
        if (!result || typeof result !== 'object') {
            console.warn('Modal.quiz: Invalid result object');
            return false;
        }

        const correct = Number(result.correct) || 0;
        const total = Number(result.total) || 1; // Prevent division by zero
        const xp = Number(result.xp) || 0;

        // Calculate percentage safely
        const percentage = typeof Helpers !== 'undefined' && Helpers.percentage
            ? Helpers.percentage(correct, total)
            : Math.round((correct / total) * 100);

        const grade = percentage >= 90 ? 'A*' : percentage >= 80 ? 'A' :
                      percentage >= 70 ? 'B' : percentage >= 60 ? 'C' :
                      percentage >= 50 ? 'D' : percentage >= 40 ? 'E' : 'U';

        const shown = show({
            title: '🎉 Quiz Complete!',
            content: `
                <div class="quiz-result">
                    <div class="result-grade">${grade}</div>
                    <div class="result-score">${correct}/${total}</div>
                    <div class="result-percentage">${percentage}%</div>
                    <div class="result-xp">+${xp} XP earned!</div>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" id="modal-quiz-home">Home</button>
                <button class="btn btn-primary" id="modal-quiz-retry">Try Again</button>
            `,
            className: 'modal-quiz'
        });

        if (shown) {
            bindButton('modal-quiz-home', () => {
                close();
                try {
                    if (typeof Router !== 'undefined' && Router.navigate) {
                        Router.navigate('home');
                    }
                } catch (e) {
                    console.warn('Modal: Router not available');
                }
            });

            bindButton('modal-quiz-retry', () => {
                close();
                try {
                    if (typeof PracticeView !== 'undefined' && PracticeView.startQuiz) {
                        PracticeView.startQuiz();
                    }
                } catch (e) {
                    console.warn('Modal: PracticeView not available');
                }
            });
        }

        return shown;
    };

    /**
     * Check if modal is currently open
     * @returns {boolean} True if modal is open
     */
    const isOpen = () => {
        return modalElement && modalElement.classList.contains('show');
    };

    return {
        show,
        close,
        destroy,
        confirm,
        alert,
        quiz,
        isOpen
    };
})();
