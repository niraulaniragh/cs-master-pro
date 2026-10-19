/**
 * SearchNotes.js - Search Functionality for Notes
 * Search across all revision notes with highlighted results
 */

const SearchNotes = {
    isOpen: false,
    results: [],
    query: '',

    /**
     * Open search modal
     */
    open: () => {
        SearchNotes.isOpen = true;
        SearchNotes.results = [];
        SearchNotes.query = '';
        SearchNotes.render();
    },

    /**
     * Close search
     */
    close: () => {
        SearchNotes.isOpen = false;
        const overlay = document.getElementById('search-overlay');
        if (overlay) overlay.remove();
    },

    /**
     * Render search interface
     */
    render: () => {
        const existingOverlay = document.getElementById('search-overlay');
        if (existingOverlay) existingOverlay.remove();

        const html = `
            <div class="search-overlay" id="search-overlay" onclick="if(event.target === this) SearchNotes.close()">
                <div class="search-modal">
                    <div class="search-header">
                        <div class="search-input-wrapper">
                            <i class="fas fa-search"></i>
                            <input type="text" id="search-input" placeholder="Search notes..." 
                                   autofocus oninput="SearchNotes.search(this.value)">
                            <kbd>ESC</kbd>
                        </div>
                    </div>
                    <div class="search-results" id="search-results">
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
        
        // Focus input
        setTimeout(() => {
            document.getElementById('search-input').focus();
        }, 100);

        // Add keyboard listener
        document.addEventListener('keydown', SearchNotes.handleKeydown);
    },

    /**
     * Handle keyboard navigation
     */
    handleKeydown: (e) => {
        if (!SearchNotes.isOpen) return;
        
        if (e.key === 'Escape') {
            SearchNotes.close();
            document.removeEventListener('keydown', SearchNotes.handleKeydown);
        }
        
        if (e.key === 'Enter' && SearchNotes.results.length > 0) {
            SearchNotes.goToResult(SearchNotes.results[0]);
        }
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const items = document.querySelectorAll('.search-result-item');
            const focused = document.querySelector('.search-result-item.focused');
            let index = Array.from(items).indexOf(focused);
            
            if (e.key === 'ArrowDown') {
                index = Math.min(index + 1, items.length - 1);
            } else {
                index = Math.max(index - 1, 0);
            }
            
            items.forEach(item => item.classList.remove('focused'));
            if (items[index]) {
                items[index].classList.add('focused');
                items[index].scrollIntoView({ block: 'nearest' });
            }
        }
    },

    /**
     * Search notes
     */
    search: (query) => {
        SearchNotes.query = query.toLowerCase().trim();
        
        if (SearchNotes.query.length < 2) {
            document.getElementById('search-results').innerHTML = `
                <div class="search-hint">
                    <p>🔍 Type at least 2 characters to search</p>
                </div>
            `;
            return;
        }
        
        // Search through all notes
        const results = [];
        
        for (const [topicId, subtopics] of Object.entries(NOTES)) {
            const topic = getTopicById(topicId);
            
            for (const [subtopicName, data] of Object.entries(subtopics)) {
                const content = data.content || '';
                const lowerContent = content.toLowerCase();
                
                // Check if query matches
                if (lowerContent.includes(SearchNotes.query) || 
                    subtopicName.toLowerCase().includes(SearchNotes.query)) {
                    
                    // Find context around the match
                    const matchIndex = lowerContent.indexOf(SearchNotes.query);
                    let snippet = '';
                    
                    if (matchIndex !== -1) {
                        // Extract text content (strip HTML)
                        const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
                        const lowerText = textContent.toLowerCase();
                        const textMatch = lowerText.indexOf(SearchNotes.query);
                        
                        if (textMatch !== -1) {
                            const start = Math.max(0, textMatch - 50);
                            const end = Math.min(textContent.length, textMatch + SearchNotes.query.length + 50);
                            snippet = (start > 0 ? '...' : '') + 
                                      textContent.slice(start, end) + 
                                      (end < textContent.length ? '...' : '');
                        }
                    }
                    
                    results.push({
                        topicId,
                        topicName: topic?.name || topicId,
                        topicIcon: topic?.icon || '📝',
                        topicColor: topic?.color || '#888',
                        subtopic: subtopicName,
                        snippet,
                        matchCount: (lowerContent.match(new RegExp(SearchNotes.query, 'g')) || []).length
                    });
                }
            }
        }
        
        // Sort by match count
        results.sort((a, b) => b.matchCount - a.matchCount);
        SearchNotes.results = results;
        
        SearchNotes.renderResults(results);
    },

    /**
     * Render search results
     */
    renderResults: (results) => {
        const container = document.getElementById('search-results');
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="search-no-results">
                    <span>😕</span>
                    <p>No results found for "${SearchNotes.query}"</p>
                    <p>Try different keywords or check spelling</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="search-count">${results.length} result${results.length !== 1 ? 's' : ''} found</div>
            ${results.slice(0, 20).map((result, index) => `
                <div class="search-result-item ${index === 0 ? 'focused' : ''}" 
                     onclick="SearchNotes.goToResult(SearchNotes.results[${index}])">
                    <div class="result-icon" style="color: ${result.topicColor}">${result.topicIcon}</div>
                    <div class="result-content">
                        <div class="result-title">${result.subtopic}</div>
                        <div class="result-topic">${result.topicName}</div>
                        ${result.snippet ? `
                            <div class="result-snippet">${SearchNotes.highlightQuery(result.snippet)}</div>
                        ` : ''}
                    </div>
                    <div class="result-arrow">→</div>
                </div>
            `).join('')}
            ${results.length > 20 ? `
                <div class="search-more">+ ${results.length - 20} more results</div>
            ` : ''}
        `;
    },

    /**
     * Highlight query in text
     */
    highlightQuery: (text) => {
        if (!SearchNotes.query) return text;
        const regex = new RegExp(`(${SearchNotes.query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    },

    /**
     * Go to search result
     */
    goToResult: (result) => {
        SearchNotes.close();
        document.removeEventListener('keydown', SearchNotes.handleKeydown);
        
        // Navigate to learn page and select the topic
        Router.navigate('learn');
        
        setTimeout(() => {
            if (typeof LearnView !== 'undefined') {
                LearnView.selectTopic(result.topicId);
                
                setTimeout(() => {
                    LearnView.selectSubtopic(result.subtopic);
                }, 100);
            }
        }, 100);
    }
};

// Global keyboard shortcut to open search (Ctrl/Cmd + K)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        SearchNotes.open();
    }
});
