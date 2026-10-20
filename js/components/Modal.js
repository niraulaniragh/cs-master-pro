/**
 * Modal.js - Modal Dialog Component
 * Displays overlay dialogs for confirmations, info, or custom content
 */

const Modal = (() => {
    let modalElement = null;
    let onCloseCallback = null;
    let confirmCallback = null;
    let cancelCallback = null;

    const create = () => {
        if (modalElement) return;

        modalElement = document.createElement('div');
        modalElement.className = 'modal-overlay';
        modalElement.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer"></div>
            </div>
        `;

        document.body.appendChild(modalElement);

        // Close on overlay click
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) close();
        });

        // Close button
        modalElement.querySelector('.modal-close').addEventListener('click', close);

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalElement.classList.contains('show')) {
                close();
            }
        });
    };

    const show = (options = {}) => {
        create();

        const {
            title = '',
            content = '',
            footer = '',
            onClose = null,
            className = ''
        } = options;

        const modal = modalElement.querySelector('.modal');
        modal.className = 'modal' + (className ? ` ${className}` : '');

        modalElement.querySelector('.modal-title').textContent = title;
        modalElement.querySelector('.modal-body').innerHTML = content;
        modalElement.querySelector('.modal-footer').innerHTML = footer;

        onCloseCallback = onClose;
        AppState.setState('ui.modalOpen', true);

        requestAnimationFrame(() => {
            modalElement.classList.add('show');
        });
    };

    const close = () => {
        if (!modalElement) return;

        modalElement.classList.remove('show');
        AppState.setState('ui.modalOpen', false);

        if (onCloseCallback) {
            onCloseCallback();
            onCloseCallback = null;
        }
    };
    
    // Handle confirm button click
    const handleConfirm = () => {
        close();
        if (confirmCallback) {
            confirmCallback();
            confirmCallback = null;
        }
    };
    
    // Handle cancel button click  
    const handleCancel = () => {
        close();
        if (cancelCallback) {
            cancelCallback();
            cancelCallback = null;
        }
    };

    // Preset modals
    const confirm = (title, message, onConfirm, onCancel = null) => {
        confirmCallback = onConfirm;
        cancelCallback = onCancel;
        
        show({
            title,
            content: `<p>${message}</p>`,
            footer: `
                <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
                <button class="btn btn-primary" id="modal-confirm-btn">Confirm</button>
            `
        });
        
        // Attach event listeners after DOM update
        setTimeout(() => {
            document.getElementById('modal-cancel-btn')?.addEventListener('click', handleCancel);
            document.getElementById('modal-confirm-btn')?.addEventListener('click', handleConfirm);
        }, 0);
    };

    const alert = (title, message) => {
        show({
            title,
            content: `<p>${message}</p>`,
            footer: '<button class="btn btn-primary" id="modal-ok-btn">OK</button>'
        });
        
        setTimeout(() => {
            document.getElementById('modal-ok-btn')?.addEventListener('click', close);
        }, 0);
    };

    const quiz = (result) => {
        const percentage = Helpers.percentage(result.correct, result.total);
        const grade = percentage >= 90 ? 'A*' : percentage >= 80 ? 'A' : 
                      percentage >= 70 ? 'B' : percentage >= 60 ? 'C' :
                      percentage >= 50 ? 'D' : percentage >= 40 ? 'E' : 'U';

        show({
            title: '🎉 Quiz Complete!',
            content: `
                <div class="quiz-result">
                    <div class="result-grade">${grade}</div>
                    <div class="result-score">${result.correct}/${result.total}</div>
                    <div class="result-percentage">${percentage}%</div>
                    <div class="result-xp">+${result.xp} XP earned!</div>
                </div>
            `,
            footer: `
                <button class="btn btn-secondary" id="modal-quiz-home">Home</button>
                <button class="btn btn-primary" id="modal-quiz-retry">Try Again</button>
            `,
            className: 'modal-quiz'
        });
        
        setTimeout(() => {
            document.getElementById('modal-quiz-home')?.addEventListener('click', () => {
                close();
                Router.navigate('home');
            });
            document.getElementById('modal-quiz-retry')?.addEventListener('click', () => {
                close();
                PracticeView.startQuiz();
            });
        }, 0);
    };

    return { show, close, confirm, alert, quiz };
})();
