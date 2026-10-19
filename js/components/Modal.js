/**
 * Modal.js - Modal Dialog Component
 * Displays overlay dialogs for confirmations, info, or custom content
 */

const Modal = (() => {
    let modalElement = null;
    let onCloseCallback = null;

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

    // Preset modals
    const confirm = (title, message, onConfirm, onCancel = null) => {
        show({
            title,
            content: `<p>${message}</p>`,
            footer: `
                <button class="btn btn-secondary" onclick="Modal.close(); ${onCancel ? 'onCancel()' : ''}">Cancel</button>
                <button class="btn btn-primary" onclick="Modal.close(); (${onConfirm})();">Confirm</button>
            `
        });
    };

    const alert = (title, message) => {
        show({
            title,
            content: `<p>${message}</p>`,
            footer: '<button class="btn btn-primary" onclick="Modal.close()">OK</button>'
        });
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
                <button class="btn btn-secondary" onclick="Modal.close(); Router.navigate('home');">Home</button>
                <button class="btn btn-primary" onclick="Modal.close(); PracticeView.startQuiz();">Try Again</button>
            `,
            className: 'modal-quiz'
        });
    };

    return { show, close, confirm, alert, quiz };
})();
