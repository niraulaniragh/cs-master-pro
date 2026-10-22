/**
 * BookmarkSystem.js - Bookmark & Highlight System for Notes
 * Features: Bookmarks, text highlighting, study guide creation
 */

const BookmarkSystem = {
    STORAGE_KEY: 'csmaster_bookmarks',
    HIGHLIGHTS_KEY: 'csmaster_highlights',
    MAX_BOOKMARKS: 500,
    MAX_HIGHLIGHTS_PER_TOPIC: 100,
    MAX_HIGHLIGHT_LENGTH: 500,

    // Highlight colors configuration
    colors: {
        yellow: { name: 'Yellow', bg: '#fef08a', border: '#facc15' },
        green: { name: 'Green', bg: '#bbf7d0', border: '#22c55e' },
        blue: { name: 'Blue', bg: '#bfdbfe', border: '#3b82f6' },
        pink: { name: 'Pink', bg: '#fbcfe8', border: '#ec4899' },
        orange: { name: 'Orange', bg: '#fed7aa', border: '#f97316' }
    },

    currentColor: 'yellow',
    highlightMenuTimeout: null,

    /**
     * Escape HTML for safe display
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml: (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Escape string for use in regex
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeRegex: (str) => {
        if (!str) return '';
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    /**
     * Generate unique ID
     * @returns {string} Unique ID
     */
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    },

    // ==========================================
    // BOOKMARK METHODS
    // ==========================================

    /**
     * Get all bookmarks
     * @returns {Array} Array of bookmarks
     */
    getBookmarks: () => {
        try {
            const stored = localStorage.getItem(BookmarkSystem.STORAGE_KEY);
            if (!stored) return [];
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.warn('BookmarkSystem: Error loading bookmarks', error);
            return [];
        }
    },

    /**
     * Save bookmarks to storage
     * @param {Array} bookmarks - Bookmarks array to save
     * @returns {boolean} True if saved successfully
     */
    saveBookmarks: (bookmarks) => {
        try {
            if (!Array.isArray(bookmarks)) {
                console.warn('BookmarkSystem: Invalid bookmarks data');
                return false;
            }
            // Enforce limit
            const trimmed = bookmarks.slice(-BookmarkSystem.MAX_BOOKMARKS);
            localStorage.setItem(BookmarkSystem.STORAGE_KEY, JSON.stringify(trimmed));
            return true;
        } catch (error) {
            console.error('BookmarkSystem: Error saving bookmarks', error);
            return false;
        }
    },

    /**
     * Add a bookmark
     * @param {string} topicId - Topic identifier
     * @param {string} sectionId - Section identifier
     * @param {string} title - Bookmark title
     * @param {string} [note=''] - Optional note
     * @returns {string|null} Bookmark ID or null on failure
     */
    addBookmark: (topicId, sectionId, title, note = '') => {
        try {
            // Validate inputs
            if (!topicId || typeof topicId !== 'string') {
                console.warn('BookmarkSystem: Invalid topicId');
                return null;
            }
            if (!sectionId || typeof sectionId !== 'string') {
                console.warn('BookmarkSystem: Invalid sectionId');
                return null;
            }
            if (!title || typeof title !== 'string') {
                console.warn('BookmarkSystem: Invalid title');
                return null;
            }

            const bookmarks = BookmarkSystem.getBookmarks();

            // Check if already bookmarked
            if (bookmarks.some(b => b.topicId === topicId && b.sectionId === sectionId)) {
                if (typeof Toast !== 'undefined') {
                    Toast.show('Already bookmarked', 'info');
                }
                return null;
            }

            const id = BookmarkSystem.generateId();

            bookmarks.push({
                id,
                topicId: String(topicId),
                sectionId: String(sectionId),
                title: String(title).slice(0, 200), // Limit title length
                note: String(note || '').slice(0, 500), // Limit note length
                createdAt: new Date().toISOString()
            });

            if (BookmarkSystem.saveBookmarks(bookmarks)) {
                if (typeof Toast !== 'undefined') {
                    Toast.show('🔖 Bookmark added!', 'success');
                }
                return id;
            }
            return null;

        } catch (error) {
            console.error('BookmarkSystem: Error adding bookmark', error);
            return null;
        }
    },

    /**
     * Remove a bookmark by ID
     * @param {string} id - Bookmark ID
     * @returns {boolean} True if removed
     */
    removeBookmark: (id) => {
        try {
            if (!id) return false;

            const bookmarks = BookmarkSystem.getBookmarks();
            const filtered = bookmarks.filter(b => b.id !== id);

            if (filtered.length !== bookmarks.length) {
                BookmarkSystem.saveBookmarks(filtered);
                if (typeof Toast !== 'undefined') {
                    Toast.show('Bookmark removed', 'info');
                }
                return true;
            }
            return false;

        } catch (error) {
            console.error('BookmarkSystem: Error removing bookmark', error);
            return false;
        }
    },

    /**
     * Check if section is bookmarked
     * @param {string} topicId - Topic identifier
     * @param {string} sectionId - Section identifier
     * @returns {boolean} True if bookmarked
     */
    isBookmarked: (topicId, sectionId) => {
        try {
            if (!topicId || !sectionId) return false;
            const bookmarks = BookmarkSystem.getBookmarks();
            return bookmarks.some(b => b.topicId === topicId && b.sectionId === sectionId);
        } catch (error) {
            return false;
        }
    },

    /**
     * Toggle bookmark for a section
     * @param {string} topicId - Topic identifier
     * @param {string} sectionId - Section identifier
     * @param {string} title - Section title
     * @returns {boolean} True if now bookmarked, false if removed
     */
    toggleBookmark: (topicId, sectionId, title) => {
        const bookmarks = BookmarkSystem.getBookmarks();
        const existing = bookmarks.find(b => b.topicId === topicId && b.sectionId === sectionId);

        if (existing) {
            BookmarkSystem.removeBookmark(existing.id);
            return false;
        } else {
            BookmarkSystem.addBookmark(topicId, sectionId, title);
            return true;
        }
    },

    // ==========================================
    // HIGHLIGHT METHODS
    // ==========================================

    /**
     * Get all highlights
     * @returns {Object} Highlights object by topic
     */
    getHighlights: () => {
        try {
            const stored = localStorage.getItem(BookmarkSystem.HIGHLIGHTS_KEY);
            if (!stored) return {};
            const parsed = JSON.parse(stored);
            return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
        } catch (error) {
            console.warn('BookmarkSystem: Error loading highlights', error);
            return {};
        }
    },

    /**
     * Save highlights to storage
     * @param {Object} highlights - Highlights object to save
     * @returns {boolean} True if saved successfully
     */
    saveHighlights: (highlights) => {
        try {
            if (!highlights || typeof highlights !== 'object' || Array.isArray(highlights)) {
                console.warn('BookmarkSystem: Invalid highlights data');
                return false;
            }
            localStorage.setItem(BookmarkSystem.HIGHLIGHTS_KEY, JSON.stringify(highlights));
            return true;
        } catch (error) {
            console.error('BookmarkSystem: Error saving highlights', error);
            return false;
        }
    },

    /**
     * Add a highlight
     * @param {string} topicId - Topic identifier
     * @param {string} text - Text to highlight
     * @param {string} [color] - Highlight color key
     * @returns {boolean} True if added successfully
     */
    addHighlight: (topicId, text, color = null) => {
        try {
            // Validate inputs
            if (!topicId || typeof topicId !== 'string') {
                console.warn('BookmarkSystem: Invalid topicId');
                return false;
            }
            if (!text || typeof text !== 'string') {
                console.warn('BookmarkSystem: Invalid text');
                return false;
            }

            const trimmedText = text.trim();
            if (trimmedText.length < 2 || trimmedText.length > BookmarkSystem.MAX_HIGHLIGHT_LENGTH) {
                console.warn('BookmarkSystem: Text length out of range');
                return false;
            }

            const highlightColor = (color && BookmarkSystem.colors[color]) ? color : BookmarkSystem.currentColor;
            const highlights = BookmarkSystem.getHighlights();

            if (!Array.isArray(highlights[topicId])) {
                highlights[topicId] = [];
            }

            // Check for duplicate
            if (highlights[topicId].some(h => h.text === trimmedText)) {
                return false;
            }

            // Enforce limit per topic
            if (highlights[topicId].length >= BookmarkSystem.MAX_HIGHLIGHTS_PER_TOPIC) {
                highlights[topicId].shift(); // Remove oldest
            }

            highlights[topicId].push({
                id: BookmarkSystem.generateId(),
                text: trimmedText,
                color: highlightColor,
                createdAt: new Date().toISOString()
            });

            return BookmarkSystem.saveHighlights(highlights);

        } catch (error) {
            console.error('BookmarkSystem: Error adding highlight', error);
            return false;
        }
    },

    /**
     * Remove a highlight
     * @param {string} topicId - Topic identifier
     * @param {string} highlightId - Highlight ID
     * @returns {boolean} True if removed
     */
    removeHighlight: (topicId, highlightId) => {
        try {
            if (!topicId || !highlightId) return false;

            const highlights = BookmarkSystem.getHighlights();
            if (!Array.isArray(highlights[topicId])) return false;

            const initialLength = highlights[topicId].length;
            highlights[topicId] = highlights[topicId].filter(h => h.id !== highlightId);

            if (highlights[topicId].length !== initialLength) {
                return BookmarkSystem.saveHighlights(highlights);
            }
            return false;

        } catch (error) {
            console.error('BookmarkSystem: Error removing highlight', error);
            return false;
        }
    },

    /**
     * Get highlights for a specific topic
     * @param {string} topicId - Topic identifier
     * @returns {Array} Array of highlights
     */
    getTopicHighlights: (topicId) => {
        try {
            if (!topicId) return [];
            const highlights = BookmarkSystem.getHighlights();
            return Array.isArray(highlights[topicId]) ? highlights[topicId] : [];
        } catch (error) {
            return [];
        }
    },

    /**
     * Apply highlights to content
     * @param {string} topicId - Topic identifier
     * @param {string} content - HTML content
     * @returns {string} Content with highlights applied
     */
    applyHighlights: (topicId, content) => {
        try {
            if (!topicId || !content) return content || '';

            const highlights = BookmarkSystem.getTopicHighlights(topicId);
            if (highlights.length === 0) return content;

            let result = content;

            highlights.forEach(h => {
                if (!h.text || !h.color) return;

                const color = BookmarkSystem.colors[h.color];
                if (!color) return;

                const escapedText = BookmarkSystem.escapeRegex(h.text);
                const regex = new RegExp(`(${escapedText})`, 'gi');

                result = result.replace(regex,
                    `<mark class="user-highlight" style="background: ${color.bg}; border-bottom: 2px solid ${color.border};" data-highlight-id="${BookmarkSystem.escapeHtml(h.id)}">$1</mark>`
                );
            });

            return result;

        } catch (error) {
            console.error('BookmarkSystem: Error applying highlights', error);
            return content || '';
        }
    },

    /**
     * Handle text selection for highlighting
     * @param {string} topicId - Topic identifier
     */
    handleSelection: (topicId) => {
        try {
            const selection = window.getSelection();
            if (!selection) return;

            const text = selection.toString().trim();
            if (text.length > 2 && text.length < BookmarkSystem.MAX_HIGHLIGHT_LENGTH) {
                BookmarkSystem.showHighlightMenu(selection, topicId, text);
            }

        } catch (error) {
            console.warn('BookmarkSystem: Error handling selection', error);
        }
    },

    /**
     * Show highlight color menu
     * @param {Selection} selection - Window selection
     * @param {string} topicId - Topic identifier
     * @param {string} text - Selected text
     */
    showHighlightMenu: (selection, topicId, text) => {
        try {
            // Clear any existing timeout
            if (BookmarkSystem.highlightMenuTimeout) {
                clearTimeout(BookmarkSystem.highlightMenuTimeout);
            }

            // Remove existing menu
            BookmarkSystem.hideHighlightMenu();

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            const menu = document.createElement('div');
            menu.id = 'highlight-menu';
            menu.className = 'highlight-menu';
            menu.style.cssText = `
                position: fixed;
                top: ${Math.max(10, rect.top - 50)}px;
                left: ${Math.max(10, rect.left + (rect.width / 2) - 100)}px;
                z-index: 10000;
            `;

            const colorButtons = Object.entries(BookmarkSystem.colors).map(([key, color]) => `
                <button class="highlight-color-btn" style="background: ${color.bg}; border-color: ${color.border};"
                        data-color="${key}" data-topic="${BookmarkSystem.escapeHtml(topicId)}"
                        title="${color.name}">
                </button>
            `).join('');

            menu.innerHTML = `
                <div class="highlight-colors">
                    ${colorButtons}
                    <button class="highlight-close-btn" title="Close">✕</button>
                </div>
            `;

            document.body.appendChild(menu);

            // Attach event listeners
            menu.querySelectorAll('.highlight-color-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const color = btn.dataset.color;
                    const topic = btn.dataset.topic;
                    BookmarkSystem.highlightSelection(topic, text, color);
                });
            });

            menu.querySelector('.highlight-close-btn').addEventListener('click', () => {
                BookmarkSystem.hideHighlightMenu();
            });

            // Auto-remove after 5 seconds
            BookmarkSystem.highlightMenuTimeout = setTimeout(() => {
                BookmarkSystem.hideHighlightMenu();
            }, 5000);

        } catch (error) {
            console.warn('BookmarkSystem: Error showing highlight menu', error);
        }
    },

    /**
     * Hide highlight menu
     */
    hideHighlightMenu: () => {
        const menu = document.getElementById('highlight-menu');
        if (menu) {
            menu.remove();
        }
        if (BookmarkSystem.highlightMenuTimeout) {
            clearTimeout(BookmarkSystem.highlightMenuTimeout);
            BookmarkSystem.highlightMenuTimeout = null;
        }
    },

    /**
     * Apply highlight from selection
     * @param {string} topicId - Topic identifier
     * @param {string} text - Selected text
     * @param {string} color - Highlight color
     */
    highlightSelection: (topicId, text, color) => {
        try {
            if (BookmarkSystem.addHighlight(topicId, text, color)) {
                if (typeof Toast !== 'undefined') {
                    Toast.show('✨ Text highlighted!', 'success');
                }

                // Refresh content if possible
                if (typeof LearnView !== 'undefined' && LearnView.refreshContent) {
                    LearnView.refreshContent();
                }
            }

            BookmarkSystem.hideHighlightMenu();
            window.getSelection()?.removeAllRanges();

        } catch (error) {
            console.error('BookmarkSystem: Error highlighting selection', error);
        }
    },

    // ==========================================
    // UI RENDERING
    // ==========================================

    /**
     * Render bookmarks panel
     * @returns {string} HTML string
     */
    renderBookmarksPanel: () => {
        try {
            const bookmarks = BookmarkSystem.getBookmarks();

            if (bookmarks.length === 0) {
                return `
                    <div class="bookmarks-empty">
                        <span class="empty-icon">🔖</span>
                        <p>No bookmarks yet</p>
                        <p class="empty-hint">Click the bookmark icon on any section to save it for later!</p>
                    </div>
                `;
            }

            // Group by topic
            const byTopic = {};
            bookmarks.forEach(b => {
                if (!byTopic[b.topicId]) byTopic[b.topicId] = [];
                byTopic[b.topicId].push(b);
            });

            const getTopicName = (id) => {
                try {
                    if (typeof TOPICS !== 'undefined' && Array.isArray(TOPICS)) {
                        const topic = TOPICS.find(t => t.id === id);
                        return topic?.name || id;
                    }
                } catch (e) {}
                return id;
            };

            return `
                <div class="bookmarks-list">
                    ${Object.entries(byTopic).map(([topicId, items]) => `
                        <div class="bookmark-group">
                            <h4 class="bookmark-topic">${BookmarkSystem.escapeHtml(getTopicName(topicId))}</h4>
                            ${items.map(b => `
                                <div class="bookmark-item" data-bookmark-id="${BookmarkSystem.escapeHtml(b.id)}">
                                    <div class="bookmark-info" onclick="BookmarkSystem.goToBookmark('${BookmarkSystem.escapeHtml(b.topicId)}', '${BookmarkSystem.escapeHtml(b.sectionId)}')">
                                        <span class="bookmark-title">${BookmarkSystem.escapeHtml(b.title)}</span>
                                        ${b.note ? `<span class="bookmark-note">${BookmarkSystem.escapeHtml(b.note)}</span>` : ''}
                                    </div>
                                    <button class="bookmark-delete" onclick="BookmarkSystem.removeBookmark('${BookmarkSystem.escapeHtml(b.id)}'); this.closest('.bookmark-item').remove();" aria-label="Delete bookmark">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
            `;

        } catch (error) {
            console.error('BookmarkSystem: Error rendering bookmarks panel', error);
            return '<div class="bookmarks-error">Unable to load bookmarks</div>';
        }
    },

    /**
     * Navigate to a bookmark
     * @param {string} topicId - Topic identifier
     * @param {string} sectionId - Section identifier
     */
    goToBookmark: (topicId, sectionId) => {
        try {
            if (!topicId) return;

            // Navigate to learn page
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate('learn');
            }

            setTimeout(() => {
                if (typeof LearnView !== 'undefined' && LearnView.selectTopic) {
                    LearnView.selectTopic(topicId);

                    setTimeout(() => {
                        if (sectionId) {
                            const section = document.getElementById(sectionId);
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                section.classList.add('highlight-flash');
                                setTimeout(() => section.classList.remove('highlight-flash'), 2000);
                            }
                        }
                    }, 300);
                }
            }, 100);

        } catch (error) {
            console.error('BookmarkSystem: Error navigating to bookmark', error);
        }
    },

    /**
     * Render bookmark button for a section
     * @param {string} topicId - Topic identifier
     * @param {string} sectionId - Section identifier
     * @param {string} title - Section title
     * @returns {string} HTML string
     */
    renderBookmarkButton: (topicId, sectionId, title) => {
        const isBookmarked = BookmarkSystem.isBookmarked(topicId, sectionId);
        const safeTitle = (title || '').replace(/'/g, "\\'");

        return `
            <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}"
                    onclick="BookmarkSystem.toggleBookmark('${BookmarkSystem.escapeHtml(topicId)}', '${BookmarkSystem.escapeHtml(sectionId)}', '${safeTitle}'); this.classList.toggle('bookmarked');"
                    title="${isBookmarked ? 'Remove bookmark' : 'Add bookmark'}"
                    aria-label="${isBookmarked ? 'Remove bookmark' : 'Add bookmark'}">
                <i class="fas fa-bookmark"></i>
            </button>
        `;
    },

    // ==========================================
    // STUDY GUIDE EXPORT
    // ==========================================

    /**
     * Create study guide from bookmarks and highlights
     * @returns {string} Markdown formatted study guide
     */
    createStudyGuide: () => {
        try {
            const bookmarks = BookmarkSystem.getBookmarks();
            const highlights = BookmarkSystem.getHighlights();

            const getTopicName = (id) => {
                try {
                    if (typeof TOPICS !== 'undefined' && Array.isArray(TOPICS)) {
                        const topic = TOPICS.find(t => t.id === id);
                        return topic?.name || id;
                    }
                } catch (e) {}
                return id;
            };

            let guide = '# My Study Guide\n\n';
            guide += `Generated: ${new Date().toLocaleDateString()}\n\n`;

            // Add bookmarked sections
            if (bookmarks.length > 0) {
                guide += '## Bookmarked Sections\n\n';
                bookmarks.forEach(b => {
                    guide += `### ${b.title || 'Untitled'}\n`;
                    guide += `Topic: ${getTopicName(b.topicId)}\n`;
                    if (b.note) guide += `Note: ${b.note}\n`;
                    guide += '\n';
                });
            }

            // Add highlights
            const allHighlights = Object.entries(highlights);
            const hasHighlights = allHighlights.some(([_, items]) => Array.isArray(items) && items.length > 0);

            if (hasHighlights) {
                guide += '## Highlighted Text\n\n';
                allHighlights.forEach(([topicId, items]) => {
                    if (!Array.isArray(items) || items.length === 0) return;

                    guide += `### ${getTopicName(topicId)}\n`;
                    items.forEach(h => {
                        if (h.text) {
                            guide += `- "${h.text}"\n`;
                        }
                    });
                    guide += '\n';
                });
            }

            if (bookmarks.length === 0 && !hasHighlights) {
                guide += '*No bookmarks or highlights saved yet.*\n';
            }

            return guide;

        } catch (error) {
            console.error('BookmarkSystem: Error creating study guide', error);
            return '# Study Guide\n\nError generating study guide.';
        }
    },

    /**
     * Export study guide as file download
     */
    exportStudyGuide: () => {
        try {
            const guide = BookmarkSystem.createStudyGuide();
            const blob = new Blob([guide], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `study-guide-${new Date().toISOString().slice(0, 10)}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Cleanup
            setTimeout(() => URL.revokeObjectURL(url), 100);

            if (typeof Toast !== 'undefined') {
                Toast.show('📥 Study guide exported!', 'success');
            }

        } catch (error) {
            console.error('BookmarkSystem: Error exporting study guide', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Error exporting study guide', 'error');
            }
        }
    },

    /**
     * Clear all bookmarks and highlights
     * @returns {boolean} True if cleared
     */
    clearAll: () => {
        try {
            localStorage.removeItem(BookmarkSystem.STORAGE_KEY);
            localStorage.removeItem(BookmarkSystem.HIGHLIGHTS_KEY);
            if (typeof Toast !== 'undefined') {
                Toast.show('All bookmarks and highlights cleared', 'info');
            }
            return true;
        } catch (error) {
            console.error('BookmarkSystem: Error clearing data', error);
            return false;
        }
    }
};
