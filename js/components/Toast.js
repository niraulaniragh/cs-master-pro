/**
 * Toast.js - Toast Notification Component
 * Shows non-blocking notifications that auto-dismiss
 */

const Toast = (() => {
    let container = null;

    const init = () => {
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    };

    const show = (message, type = 'info', duration = 3000) => {
        init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);
        
        // Play sound based on type
        if (typeof SoundFX !== 'undefined') {
            if (type === 'success') SoundFX.play('success');
            else if (type === 'error') SoundFX.play('error');
            else if (message.includes('XP')) SoundFX.play('xp');
            else if (message.includes('Level Up')) SoundFX.play('levelup');
            else if (message.includes('Achievement')) SoundFX.play('success');
        }

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);

        return toast;
    };

    const success = (message, duration) => show(message, 'success', duration);
    const error = (message, duration) => show(message, 'error', duration);
    const warning = (message, duration) => show(message, 'warning', duration);
    const info = (message, duration) => show(message, 'info', duration);

    return { show, success, error, warning, info };
})();
