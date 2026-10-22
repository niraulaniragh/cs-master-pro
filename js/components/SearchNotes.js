/**
 * SearchNotes.js - Search Functionality for Notes
 * Search across all revision notes with highlighted results
 */

const SearchNotes = {
    isOpen: false,
    results: [],
    query: '',
    focusedIndex: 0,
    keydownHandler: null,
    MIN_QUERY_LENGTH: 2,
    MAX_RESULTS: 50,
    DISPLAY_LIMIT: 20,

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
     * Escape regex special characters
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeRegex: (str) => {
        if (!str) return '';
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    /**
     * Open search modal
     */
    open: () => {
        try {
            if (SearchNotes.isOpen) return;

            SearchNotes.isOpen = true;
            SearchNotes.results = [];
            SearchNotes.query = '';
            SearchNotes.focusedIndex = 0;
            SearchNotes.render();

        } catch (error) {
            console.error('SearchNotes: Error opening search', error);
        }
    },

    /**
     * Close search modal
     */
    close: () => {
        try {
            SearchNotes.isOpen = false;

            // Remove keyboard handler
            if (SearchNotes.keydownHandler) {
                document.removeEventListener('keydown', SearchNotes.keydownHandler);
                SearchNotes.keydownHandler = null;
            }

            // Remove overlay
            const overlay = document.getElementById('search-overlay');
            if (overlay) {
                overlay.remove();
            }

            // Clear state
            SearchNotes.results = [];
            SearchNotes.query = '';
            SearchNotes.focusedIndex = 0;

        } catch (error) {
            console.error('SearchNotes: Error closing search', error);
        }
    },

    /**
     * Render search interface
     */
    render: () => {
        try {
            // Remove existing overlay
            const existingOverlay = document.getElementById('search-overlay');
            if (existingOverlay) {
                existingOverlay.remove();
            }

            const html = `
                <div class="search-overlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="Search notes">
                    <div class="search-modal">
                        <div class="search-header">
                            <div class="search-input-wrapper">
                                <i class="fas fa-search" aria-hidden="true"></i>
                                <input type="text" id="search-input" placeholder="Search notes..." 
                                       autofocus autocomplete="off" aria-label="Search query">
                                <kbd>ESC</kbd>
                            </div>
                        </div>
                        <div class="search-results" id="search-results" role="listbox">
                            <div class="search-hint">
                                <p>🔍 Start typing to search across all topics</p>
                                <p>Press <kbd>Enter</kbd> to go to first result</p>
                            </div>
                        </div>
                        <div class="search-footer">
                            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                            <span><kbd>Enter</kbd> Open</span>
                            <span><kbd>ESC</kbd> Close</span>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', html);

            // Setup overlay click to close
            const overlay = document.getElementById('search-overlay');
            if (overlay) {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        SearchNotes.close();
                    }
                });
            }

            // Setup input handler
            const input = document.getElementById('search-input');
            if (input) {
                input.addEventListener('input', (e) => {
                    SearchNotes.search(e.target.value);
                });

                // Focus input
                setTimeout(() => input.focus(), 50);
            }

            // Add keyboard listener
            SearchNotes.keydownHandler = SearchNotes.handleKeydown.bind(SearchNotes);
            document.addEventListener('keydown', SearchNotes.keydownHandler);

        } catch (error) {
            console.error('SearchNotes: Error rendering search', error);
        }
    },

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeydown: (e) => {
        if (!SearchNotes.isOpen) return;

        try {
            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    SearchNotes.close();
                    break;

                case 'Enter':
                    e.preventDefault();
                    if (SearchNotes.results.length > 0) {
                        const result = SearchNotes.results[SearchNotes.focusedIndex];
                        if (result) {
                            SearchNotes.goToResult(result);
                        }
                    }
                    break;

                case 'ArrowDown':
                    e.preventDefault();
                    SearchNotes.navigateResults(1);
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    SearchNotes.navigateResults(-1);
                    break;
            }

        } catch (error) {
            console.error('SearchNotes: Error handling keydown', error);
        }
    },

    /**
     * Navigate through results
     * @param {number} direction - 1 for down, -1 for up
     */
    navigateResults: (direction) => {
        const items = document.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        // Update focused index
        SearchNotes.focusedIndex = Math.max(0, Math.min(
            SearchNotes.focusedIndex + direction,
            items.length - 1
        ));

        // Update visual focus
        items.forEach((item, i) => {
            item.classList.toggle('focused', i === SearchNotes.focusedIndex);
        });

        // Scroll into view
        const focusedItem = items[SearchNotes.focusedIndex];
        if (focusedItem) {
            focusedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    },

    /**
     * Search notes for query
     * @param {string} query - Search query
     */
    search: (query) => {
        try {
            SearchNotes.query = (query || '').toLowerCase().trim();
            SearchNotes.focusedIndex = 0;

            const resultsContainer = document.getElementById('search-results');
            if (!resultsContainer) return;

            if (SearchNotes.query.length < SearchNotes.MIN_QUERY_LENGTH) {
                resultsContainer.innerHTML = `
                    <div class="search-hint">
                        <p>🔍 Type at least ${SearchNotes.MIN_QUERY_LENGTH} characters to search</p>
                    </div>
                `;
                SearchNotes.results = [];
                return;
            }

            // Check if NOTES is available
            if (typeof NOTES === 'undefined' || !NOTES || typeof NOTES !== 'object') {
                resultsContainer.innerHTML = `
                    <div class="search-no-results">
                        <span>📚</span>
                        <p>Notes not available</p>
                    </div>
                `;
                SearchNotes.results = [];
                return;
            }

            // Search through all notes
            const results = [];
            const escapedQuery = SearchNotes.escapeRegex(SearchNotes.query);
            const searchRegex = new RegExp(escapedQuery, 'gi');

            for (const [topicId, subtopics] of Object.entries(NOTES)) {
                if (!subtopics || typeof subtopics !== 'object') continue;

                // Get topic info safely
                let topic = null;
                if (typeof getTopicById === 'function') {
                    topic = getTopicById(topicId);
                }

                for (const [subtopicName, data] of Object.entries(subtopics)) {
                    if (!data || typeof data !== 'object') continue;

                    const content = String(data.content || '');
                    const lowerContent = content.toLowerCase();
                    const lowerSubtopic = subtopicName.toLowerCase();

                    // Check if query matches
                    if (lowerContent.includes(SearchNotes.query) || lowerSubtopic.includes(SearchNotes.query)) {
                        // Find context around the match
                        let snippet = '';
                        const matchIndex = lowerContent.indexOf(SearchNotes.query);

                        if (matchIndex !== -1) {
                            // Extract text content (strip HTML)
                            const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                            const lowerText = textContent.toLowerCase();
                            const textMatch = lowerText.indexOf(SearchNotes.query);

                            if (textMatch !== -1) {
                                const contextSize = 50;
                                const start = Math.max(0, textMatch - contextSize);
                                const end = Math.min(textContent.length, textMatch + SearchNotes.query.length + contextSize);
                                snippet = (start > 0 ? '...' : '') +
                                    textContent.slice(start, end) +
                                    (end < textContent.length ? '...' : '');
                            }
                        }

                        // Count matches
                        const matches = lowerContent.match(searchRegex) || [];

                        results.push({
                            topicId,
                            topicName: topic?.name || topicId,
                            topicIcon: topic?.icon || '📝',
                            topicColor: topic?.color || '#888',
                            subtopic: subtopicName,
                            snippet,
                            matchCount: matches.length
                        });

                        // Limit total results
                        if (results.length >= SearchNotes.MAX_RESULTS) {
                            break;
                        }
                    }
                }

                if (results.length >= SearchNotes.MAX_RESULTS) {
                    break;
                }
            }

            // Sort by match count (descending)
            results.sort((a, b) => b.matchCount - a.matchCount);

            SearchNotes.results = results;
            SearchNotes.renderResults(results);

        } catch (error) {
            console.error('SearchNotes: Error searching', error);
            SearchNotes.results = [];
        }
    },

    /**
     * Render search results
     * @param {Array} results - Search results array
     */
    renderResults: (results) => {
        try {
            const container = document.getElementById('search-results');
            if (!container) return;

            if (!results || results.length === 0) {
                container.innerHTML = `
                    <div class="search-no-results">
                        <span>😕</span>
                        <p>No results found for "${SearchNotes.escapeHtml(SearchNotes.query)}"</p>
                        <p>Try different keywords or check spelling</p>
                    </div>
                `;
                return;
            }

            const displayResults = results.slice(0, SearchNotes.DISPLAY_LIMIT);

            container.innerHTML = `
                <div class="search-count">${results.length} result${results.length !== 1 ? 's' : ''} found</div>
                ${displayResults.map((result, index) => `
                    <div class="search-result-item ${index === 0 ? 'focused' : ''}" 
                         role="option"
                         data-index="${index}"
                         tabindex="-1">
                        <div class="result-icon" style="color: ${result.topicColor}">${result.topicIcon}</div>
                        <div class="result-content">
                            <div class="result-title">${SearchNotes.escapeHtml(result.subtopic)}</div>
                            <div class="result-topic">${SearchNotes.escapeHtml(result.topicName)}</div>
                            ${result.snippet ? `
                                <div class="result-snippet">${SearchNotes.highlightQuery(SearchNotes.escapeHtml(result.snippet))}</div>
                            ` : ''}
                        </div>
                        <div class="result-arrow">→</div>
                    </div>
                `).join('')}
                ${results.length > SearchNotes.DISPLAY_LIMIT ? `
                    <div class="search-more">+ ${results.length - SearchNotes.DISPLAY_LIMIT} more results</div>
                ` : ''}
            `;

            // Attach click handlers
            const items = container.querySelectorAll('.search-result-item');
            items.forEach((item, index) => {
                item.addEventListener('click', () => {
                    const result = SearchNotes.results[index];
                    if (result) {
                        SearchNotes.goToResult(result);
                    }
                });
            });

        } catch (error) {
            console.error('SearchNotes: Error rendering results', error);
        }
    },

    /**
     * Highlight query in text
     * @param {string} text - Text to highlight in
     * @returns {string} Text with highlighted query
     */
    highlightQuery: (text) => {
        if (!SearchNotes.query || !text) return text || '';

        try {
            const escapedQuery = SearchNotes.escapeRegex(SearchNotes.query);
            const regex = new RegExp(`(${escapedQuery})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        } catch (error) {
            return text;
        }
    },

    /**
     * Navigate to search result
     * @param {Object} result - Result object
     */
    goToResult: (result) => {
        try {
            if (!result || !result.topicId) {
                console.warn('SearchNotes: Invalid result');
                return;
            }

            SearchNotes.close();

            // Navigate to learn page
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate('learn');
            }

            // Select topic and subtopic after navigation
            setTimeout(() => {
                try {
                    if (typeof LearnView !== 'undefined') {
                        if (LearnView.selectTopic) {
                            LearnView.selectTopic(result.topicId);
                        }

                        setTimeout(() => {
                            if (LearnView.selectSubtopic && result.subtopic) {
                                LearnView.selectSubtopic(result.subtopic);
                            }
                        }, 100);
                    }
                } catch (e) {
                    console.warn('SearchNotes: Error navigating to result', e);
                }
            }, 100);

        } catch (error) {
            console.error('SearchNotes: Error going to result', error);
        }
    }
};

// Global keyboard shortcut to open search (Ctrl/Cmd + K)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (!SearchNotes.isOpen) {
            SearchNotes.open();
        }
    }
});
