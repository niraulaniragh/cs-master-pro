/**
 * BookmarkSystem.js - Bookmark & Highlight System for Notes
 * Features: Bookmarks, text highlighting, study guide creation
 */

const BookmarkSystem = {
    STORAGE_KEY: 'csmaster_bookmarks',
    HIGHLIGHTS_KEY: 'csmaster_highlights',
    
    // Highlight colors
    colors: {
        yellow: { name: 'Yellow', bg: '#fef08a', border: '#facc15' },
        green: { name: 'Green', bg: '#bbf7d0', border: '#22c55e' },
        blue: { name: 'Blue', bg: '#bfdbfe', border: '#3b82f6' },
        pink: { name: 'Pink', bg: '#fbcfe8', border: '#ec4899' },
        orange: { name: 'Orange', bg: '#fed7aa', border: '#f97316' }
    },
    
    currentColor: 'yellow',
    
    // Get all bookmarks
    getBookmarks: () => {
        try {
            return JSON.parse(localStorage.getItem(BookmarkSystem.STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    },
    
    // Save bookmarks
    saveBookmarks: (bookmarks) => {
        localStorage.setItem(BookmarkSystem.STORAGE_KEY, JSON.stringify(bookmarks));
    },
    
    // Get all highlights
    getHighlights: () => {
        try {
            return JSON.parse(localStorage.getItem(BookmarkSystem.HIGHLIGHTS_KEY) || '{}');
        } catch (e) {
            return {};
        }
    },
    
    // Save highlights
    saveHighlights: (highlights) => {
        localStorage.setItem(BookmarkSystem.HIGHLIGHTS_KEY, JSON.stringify(highlights));
    },
    
    // Add a bookmark
    addBookmark: (topicId, sectionId, title, note = '') => {
        const bookmarks = BookmarkSystem.getBookmarks();
        const id = Date.now().toString(36);
        
        bookmarks.push({
            id,
            topicId,
            sectionId,
            title,
            note,
            createdAt: new Date().toISOString()
        });
        
        BookmarkSystem.saveBookmarks(bookmarks);
        Toast.show('🔖 Bookmark added!', 'success');
        return id;
    },
    
    // Remove a bookmark
    removeBookmark: (id) => {
        const bookmarks = BookmarkSystem.getBookmarks();
        const filtered = bookmarks.filter(b => b.id !== id);
        BookmarkSystem.saveBookmarks(filtered);
        Toast.show('Bookmark removed', 'info');
    },
    
    // Check if section is bookmarked
    isBookmarked: (topicId, sectionId) => {
        const bookmarks = BookmarkSystem.getBookmarks();
        return bookmarks.some(b => b.topicId === topicId && b.sectionId === sectionId);
    },
    
    // Toggle bookmark
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
    
    // Add highlight
    addHighlight: (topicId, text, color = null) => {
        const highlights = BookmarkSystem.getHighlights();
        const highlightColor = color || BookmarkSystem.currentColor;
        
        if (!highlights[topicId]) {
            highlights[topicId] = [];
        }
        
        // Check if already highlighted
        if (highlights[topicId].some(h => h.text === text)) {
            return false;
        }
        
        highlights[topicId].push({
            id: Date.now().toString(36),
            text,
            color: highlightColor,
            createdAt: new Date().toISOString()
        });
        
        BookmarkSystem.saveHighlights(highlights);
        return true;
    },
    
    // Remove highlight
    removeHighlight: (topicId, highlightId) => {
        const highlights = BookmarkSystem.getHighlights();
        if (highlights[topicId]) {
            highlights[topicId] = highlights[topicId].filter(h => h.id !== highlightId);
            BookmarkSystem.saveHighlights(highlights);
        }
    },
    
    // Get highlights for a topic
    getTopicHighlights: (topicId) => {
        const highlights = BookmarkSystem.getHighlights();
        return highlights[topicId] || [];
    },
    
    // Apply highlights to content
    applyHighlights: (topicId, content) => {
        const highlights = BookmarkSystem.getTopicHighlights(topicId);
        let result = content;
        
        highlights.forEach(h => {
            const color = BookmarkSystem.colors[h.color];
            const regex = new RegExp(`(${h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            result = result.replace(regex, `<mark class="user-highlight" style="background: ${color.bg}; border-bottom: 2px solid ${color.border};" data-highlight-id="${h.id}">$1</mark>`);
        });
        
        return result;
    },
    
    // Handle text selection for highlighting
    handleSelection: (topicId) => {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        if (text.length > 2 && text.length < 500) {
            BookmarkSystem.showHighlightMenu(selection, topicId, text);
        }
    },
    
    // Show highlight color menu
    showHighlightMenu: (selection, topicId, text) => {
        // Remove existing menu
        const existing = document.getElementById('highlight-menu');
        if (existing) existing.remove();
        
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        const menu = document.createElement('div');
        menu.id = 'highlight-menu';
        menu.className = 'highlight-menu';
        menu.style.cssText = `
            position: fixed;
            top: ${rect.top - 50}px;
            left: ${rect.left + (rect.width / 2) - 100}px;
            z-index: 10000;
        `;
        
        menu.innerHTML = `
            <div class="highlight-colors">
                ${Object.entries(BookmarkSystem.colors).map(([key, color]) => `
                    <button class="highlight-color-btn" style="background: ${color.bg}; border-color: ${color.border};" 
                            onclick="BookmarkSystem.highlightSelection('${topicId}', '${text.replace(/'/g, "\\'")}', '${key}')">
                    </button>
                `).join('')}
                <button class="highlight-close-btn" onclick="document.getElementById('highlight-menu').remove()">✕</button>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (document.getElementById('highlight-menu')) {
                document.getElementById('highlight-menu').remove();
            }
        }, 5000);
    },
    
    // Apply highlight from selection
    highlightSelection: (topicId, text, color) => {
        if (BookmarkSystem.addHighlight(topicId, text, color)) {
            Toast.show('✨ Text highlighted!', 'success');
            
            // Refresh the content to show highlight
            if (typeof LearnView !== 'undefined' && LearnView.refreshContent) {
                LearnView.refreshContent();
            }
        }
        
        // Remove menu
        const menu = document.getElementById('highlight-menu');
        if (menu) menu.remove();
        
        // Clear selection
        window.getSelection().removeAllRanges();
    },
    
    // Render bookmarks panel
    renderBookmarksPanel: () => {
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
            if (typeof TOPICS !== 'undefined') {
                const topic = TOPICS.find(t => t.id === id);
                return topic ? topic.name : id;
            }
            return id;
        };
        
        return `
            <div class="bookmarks-list">
                ${Object.entries(byTopic).map(([topicId, items]) => `
                    <div class="bookmark-group">
                        <h4 class="bookmark-topic">${getTopicName(topicId)}</h4>
                        ${items.map(b => `
                            <div class="bookmark-item">
                                <div class="bookmark-info" onclick="BookmarkSystem.goToBookmark('${b.topicId}', '${b.sectionId}')">
                                    <span class="bookmark-title">${b.title}</span>
                                    ${b.note ? `<span class="bookmark-note">${b.note}</span>` : ''}
                                </div>
                                <button class="bookmark-delete" onclick="BookmarkSystem.removeBookmark('${b.id}'); this.closest('.bookmark-item').remove();">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // Navigate to bookmark
    goToBookmark: (topicId, sectionId) => {
        Router.navigate('learn');
        setTimeout(() => {
            if (typeof LearnView !== 'undefined' && LearnView.selectTopic) {
                LearnView.selectTopic(topicId);
                setTimeout(() => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        section.classList.add('highlight-flash');
                        setTimeout(() => section.classList.remove('highlight-flash'), 2000);
                    }
                }, 300);
            }
        }, 100);
    },
    
    // Create study guide from bookmarks and highlights
    createStudyGuide: () => {
        const bookmarks = BookmarkSystem.getBookmarks();
        const highlights = BookmarkSystem.getHighlights();
        
        let guide = '# My Study Guide\n\n';
        guide += `Generated: ${new Date().toLocaleDateString()}\n\n`;
        
        // Add bookmarked sections
        if (bookmarks.length > 0) {
            guide += '## Bookmarked Sections\n\n';
            bookmarks.forEach(b => {
                guide += `### ${b.title}\n`;
                if (b.note) guide += `Note: ${b.note}\n`;
                guide += '\n';
            });
        }
        
        // Add highlights
        const allHighlights = Object.entries(highlights);
        if (allHighlights.length > 0) {
            guide += '## Highlighted Text\n\n';
            allHighlights.forEach(([topicId, items]) => {
                if (items.length > 0) {
                    const topicName = typeof TOPICS !== 'undefined' ? 
                        (TOPICS.find(t => t.id === topicId)?.name || topicId) : topicId;
                    guide += `### ${topicName}\n`;
                    items.forEach(h => {
                        guide += `- "${h.text}"\n`;
                    });
                    guide += '\n';
                }
            });
        }
        
        return guide;
    },
    
    // Export study guide
    exportStudyGuide: () => {
        const guide = BookmarkSystem.createStudyGuide();
        const blob = new Blob([guide], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `study-guide-${new Date().toISOString().slice(0,10)}.md`;
        a.click();
        
        URL.revokeObjectURL(url);
        Toast.show('📥 Study guide exported!', 'success');
    },
    
    // Render bookmark button for a section
    renderBookmarkButton: (topicId, sectionId, title) => {
        const isBookmarked = BookmarkSystem.isBookmarked(topicId, sectionId);
        return `
            <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                    onclick="BookmarkSystem.toggleBookmark('${topicId}', '${sectionId}', '${title.replace(/'/g, "\\'")}'); this.classList.toggle('bookmarked');"
                    title="${isBookmarked ? 'Remove bookmark' : 'Add bookmark'}">
                <i class="fas fa-bookmark"></i>
            </button>
        `;
    }
};
