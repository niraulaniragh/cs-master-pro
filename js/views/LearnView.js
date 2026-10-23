/**
 * LearnView.js - Learning Mode with Revision Notes
 * Features: Topic navigation, subtopics, print/export, search
 */

const LearnView = {
    currentTopic: 'problem-solving',
    currentSubtopic: null,

    render: () => {
        try {
            const topics = typeof TOPICS !== 'undefined' && Array.isArray(TOPICS) ? TOPICS : [];
            
            return `
                <div class="learn-view">
                    <div class="learn-sidebar">
                        <div class="sidebar-header">
                            <h3>📚 Topics</h3>
                            <button class="search-mini-btn" onclick="typeof SearchNotes !== 'undefined' && SearchNotes.open()" title="Search Notes (Ctrl+K)">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <div class="topic-list">
                            ${topics.length === 0 ? `
                                <p class="empty-topics">No topics available</p>
                            ` : topics.map(topic => `
                                <div class="topic-item ${LearnView.currentTopic === topic.id ? 'active' : ''}" 
                                     style="--topic-color: ${topic.color || '#6b46c1'}"
                                     onclick="LearnView.selectTopic('${topic.id}')">
                                    <span class="topic-icon">${topic.icon || '📚'}</span>
                                    <span class="topic-name">${topic.name || 'Unnamed'}</span>
                                    <span class="topic-count">${Array.isArray(topic.subtopics) ? topic.subtopics.length : 0}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="learn-content">
                        <div class="subtopic-nav" id="subtopic-nav"></div>
                        <div class="notes-container" id="notes-container">
                            <div class="notes-placeholder">
                                <span class="placeholder-icon">👈</span>
                                <p>Select a topic from the sidebar to view revision notes</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('LearnView render error:', error);
            return `
                <div class="learn-view">
                    <div class="error-state">
                        <span class="error-icon">⚠️</span>
                        <h2>Unable to load Learn Mode</h2>
                        <p>Please try refreshing the page.</p>
                        <button class="btn btn-primary" onclick="location.reload()">Refresh</button>
                    </div>
                </div>
            `;
        }
    },

    init: () => {
        console.log('📚 Learn view initialized');
        try {
            if (LearnView.currentTopic) {
                LearnView.selectTopic(LearnView.currentTopic);
            }
        } catch (error) {
            console.error('Error initializing LearnView:', error);
        }
    },

    cleanup: () => {
        console.log('📚 Learn view cleanup');
    },

    selectTopic: (topicId) => {
        try {
            if (!topicId) return;
            
            // Check guest limits for topic access
            if (typeof GuestLimiter !== 'undefined') {
                const canView = GuestLimiter.canViewTopic(topicId);
                if (!canView?.allowed) {
                    GuestLimiter.showSignupPrompt(canView?.reason, 'learn');
                    return;
                }
                GuestLimiter.recordTopic(topicId);
            }
            
            LearnView.currentTopic = topicId;
            LearnView.currentSubtopic = null;

            // Update active state
            document.querySelectorAll('.topic-item').forEach(item => {
                item.classList.remove('active');
            });
            const activeItem = document.querySelector(`.topic-item[onclick*="${topicId}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }

            // Get topic data
            const topic = typeof getTopicById === 'function' ? getTopicById(topicId) : null;
            const topicNotes = (typeof NOTES !== 'undefined' && NOTES) ? NOTES[topicId] : {};
            const subtopics = Object.keys(topicNotes || {});

            // Render subtopic navigation with print button
            const subtopicNav = document.getElementById('subtopic-nav');
            if (subtopicNav) {
                subtopicNav.innerHTML = `
                    <div class="subtopic-header">
                        <div class="subtopic-title">
                            <span class="topic-icon" style="color: ${topic?.color || '#6b46c1'}">${topic?.icon || '📚'}</span>
                            <h2>${topic?.name || 'Topic'}</h2>
                        </div>
                        <div class="subtopic-actions">
                            <button class="btn btn-small btn-secondary" onclick="LearnView.printNotes()" title="Print Notes">
                                <i class="fas fa-print"></i> Print
                            </button>
                        </div>
                    </div>
                    <div class="subtopic-tabs">
                        ${subtopics.map((sub, i) => `
                            <button class="subtopic-tab ${i === 0 ? 'active' : ''}" 
                                    onclick="LearnView.selectSubtopic('${sub}')">${sub}</button>
                        `).join('')}
                    </div>
                `;
            }

            // Show first subtopic or placeholder
            if (subtopics.length > 0) {
                LearnView.selectSubtopic(subtopics[0]);
            } else {
                const notesContainer = document.getElementById('notes-container');
                if (notesContainer) {
                    notesContainer.innerHTML = `
                        <div class="notes-placeholder">
                            <span class="placeholder-icon">📝</span>
                            <p>Notes coming soon for ${topic?.name || 'this topic'}!</p>
                        </div>
                    `;
                }
            }

            // Track progress
            LearnView.trackTopicRead(topicId);
        } catch (error) {
            console.error('Error selecting topic:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Error loading topic', 'error');
            }
        }
    },

    selectSubtopic: (subtopic) => {
        if (!subtopic) return;
        
        try {
            LearnView.currentSubtopic = subtopic;

            // Update active tab
            document.querySelectorAll('.subtopic-tab').forEach(tab => {
                tab.classList.toggle('active', tab.textContent === subtopic);
            });

            // Get notes and container
            const notesData = typeof NOTES !== 'undefined' ? NOTES : {};
            const notes = notesData[LearnView.currentTopic]?.[subtopic];
            const container = document.getElementById('notes-container');
            const topic = typeof getTopicById === 'function' ? getTopicById(LearnView.currentTopic) : null;

            if (!container) return;

            if (notes?.content) {
                container.innerHTML = `
                    <article class="notes-content" id="printable-notes">
                        <div class="notes-breadcrumb">
                            <span style="color: ${topic?.color || '#6b46c1'}">${topic?.icon || '📚'} ${topic?.name || 'Topic'}</span>
                            <span class="breadcrumb-sep">›</span>
                            <span>${subtopic}</span>
                        </div>
                        ${notes.content}
                    </article>
                    <div class="notes-actions">
                        <button class="btn btn-secondary" onclick="LearnView.prevSubtopic()">
                            ← Previous
                        </button>
                        <div class="notes-progress">
                            ${LearnView.getSubtopicProgress()}
                        </div>
                        <button class="btn btn-primary" onclick="LearnView.nextSubtopic()">
                            Next →
                        </button>
                    </div>
                `;

                // Apply syntax highlighting
                if (typeof hljs !== 'undefined') {
                    container.querySelectorAll('pre code').forEach(block => {
                        hljs.highlightElement(block);
                    });
                }

                // Scroll to top of notes
                container.scrollTop = 0;
            } else {
                container.innerHTML = `
                    <div class="notes-placeholder">
                        <span class="placeholder-icon">📄</span>
                        <p>Notes not available for this section</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error selecting subtopic:', error);
        }
    },

    getSubtopicProgress: () => {
        try {
            const notesData = typeof NOTES !== 'undefined' ? NOTES : {};
            const topicNotes = notesData[LearnView.currentTopic] || {};
            const subtopics = Object.keys(topicNotes);
            const currentIndex = subtopics.indexOf(LearnView.currentSubtopic);
            return `${currentIndex + 1} / ${subtopics.length}`;
        } catch (error) {
            return '- / -';
        }
    },

    nextSubtopic: () => {
        try {
            const notesData = typeof NOTES !== 'undefined' ? NOTES : {};
            const topicsData = typeof TOPICS !== 'undefined' && Array.isArray(TOPICS) ? TOPICS : [];
            const topicNotes = notesData[LearnView.currentTopic] || {};
            const subtopics = Object.keys(topicNotes);
            const currentIndex = subtopics.indexOf(LearnView.currentSubtopic);
            
            if (currentIndex < subtopics.length - 1) {
                LearnView.selectSubtopic(subtopics[currentIndex + 1]);
            } else if (topicsData.length > 0) {
                // Move to next topic
                const topicIndex = topicsData.findIndex(t => t.id === LearnView.currentTopic);
                if (topicIndex >= 0 && topicIndex < topicsData.length - 1) {
                    LearnView.selectTopic(topicsData[topicIndex + 1].id);
                    if (typeof Toast !== 'undefined') {
                        Toast.show('Moving to next topic! 📚', 'info');
                    }
                } else if (typeof Toast !== 'undefined') {
                    Toast.show('🎉 You\'ve completed all topics!', 'success');
                }
            }
        } catch (error) {
            console.error('Error navigating to next subtopic:', error);
        }
    },

    prevSubtopic: () => {
        try {
            const notesData = typeof NOTES !== 'undefined' ? NOTES : {};
            const topicNotes = notesData[LearnView.currentTopic] || {};
            const subtopics = Object.keys(topicNotes);
            const currentIndex = subtopics.indexOf(LearnView.currentSubtopic);
            
            if (currentIndex > 0) {
                LearnView.selectSubtopic(subtopics[currentIndex - 1]);
            }
        } catch (error) {
            console.error('Error navigating to previous subtopic:', error);
        }
    },

    trackTopicRead: (topicId) => {
        try {
            if (typeof AppState === 'undefined') return;
            
            const readTopics = AppState.getState('learn.readTopics') || [];
            if (!readTopics.includes(topicId)) {
                readTopics.push(topicId);
                AppState.setState('learn.readTopics', readTopics);
                AppState.addXP(10);
                
                // Check achievements
                const topicsData = typeof TOPICS !== 'undefined' && Array.isArray(TOPICS) ? TOPICS : [];
                if (topicsData.length > 0 && readTopics.length >= topicsData.length) {
                    AppState.unlockAchievement('all_topics');
                }
            }
        } catch (error) {
            console.error('Error tracking topic read:', error);
        }
    },

    /**
     * Print current notes
     */
    printNotes: () => {
        try {
            const topic = typeof getTopicById === 'function' ? getTopicById(LearnView.currentTopic) : null;
            const notesData = typeof NOTES !== 'undefined' ? NOTES : {};
            const topicNotes = notesData[LearnView.currentTopic] || {};
            const subtopics = Object.keys(topicNotes);
            
            if (subtopics.length === 0) {
                if (typeof Toast !== 'undefined') {
                    Toast.show('No notes available to print', 'warning');
                }
                return;
            }
            
            const topicName = topic?.name || 'Topic';
            const topicIcon = topic?.icon || '📚';
            
            // Create print content
            let printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${topicName} - CS Master Pro Notes</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 20px;
                            color: #333;
                        }
                        h1 { color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 10px; }
                        h2 { color: #4a5568; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
                        h3 { color: #2d3748; }
                        h4 { color: #4a5568; }
                        .definition-box, .info-box, .example-box, .tip-box {
                            background: #f7fafc;
                            border-left: 4px solid #6b46c1;
                            padding: 15px;
                            margin: 15px 0;
                            border-radius: 0 8px 8px 0;
                        }
                        .definition-box { border-left-color: #6b46c1; }
                        .info-box { border-left-color: #3182ce; }
                        .example-box { border-left-color: #38a169; }
                        .tip-box { border-left-color: #d69e2e; }
                        .warning { 
                            background: #fff5f5; 
                            border-left: 4px solid #e53e3e;
                            padding: 15px;
                            margin: 15px 0;
                        }
                        table { border-collapse: collapse; width: 100%; margin: 15px 0; }
                        th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
                        th { background: #f7fafc; }
                        code { background: #edf2f7; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
                        pre { background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 8px; overflow-x: auto; }
                        pre code { background: none; color: inherit; }
                        .page-break { page-break-before: always; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .footer { text-align: center; margin-top: 30px; color: #718096; font-size: 0.875rem; }
                        @media print {
                            body { padding: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>${topicIcon} ${topicName}</h1>
                        <p>CS Master Pro - Edexcel IGCSE Computer Science (4CP0)</p>
                    </div>
            `;

            // Add all subtopics
            subtopics.forEach((subtopic, index) => {
                const notes = topicNotes[subtopic];
                if (notes?.content) {
                    if (index > 0) {
                        printContent += '<div class="page-break"></div>';
                    }
                    printContent += `<section><h2>${subtopic}</h2>${notes.content}</section>`;
                }
            });

            printContent += `
                    <div class="footer">
                        <p>Generated from CS Master Pro • ${new Date().toLocaleDateString()}</p>
                    </div>
                </body>
                </html>
            `;

            // Open print window
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                if (typeof Toast !== 'undefined') {
                    Toast.show('Please allow popups to print notes', 'error');
                }
                return;
            }
            
            printWindow.document.write(printContent);
            printWindow.document.close();
            
            // Trigger print after content loads
            setTimeout(() => {
                printWindow.print();
            }, 500);

            if (typeof Toast !== 'undefined') {
                Toast.show('📄 Print dialog opened!', 'success');
            }
        } catch (error) {
            console.error('Error printing notes:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Error preparing print', 'error');
            }
        }
    },

    /**
     * Export notes as text
     */
    exportNotes: () => {
        try {
            const topic = typeof getTopicById === 'function' ? getTopicById(LearnView.currentTopic) : null;
            const notesData = typeof NOTES !== 'undefined' ? NOTES : {};
            const topicNotes = notesData[LearnView.currentTopic] || {};
            const subtopics = Object.keys(topicNotes);
            
            if (subtopics.length === 0) {
                if (typeof Toast !== 'undefined') {
                    Toast.show('No notes available to export', 'warning');
                }
                return;
            }
            
            const topicName = topic?.name || 'Topic';
            let textContent = `${topicName} - CS Master Pro Notes\n${'='.repeat(50)}\n\n`;
            
            subtopics.forEach(subtopic => {
                const notes = topicNotes[subtopic];
                if (notes?.content) {
                    // Strip HTML and format
                    const textOnly = notes.content
                        .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n\n$1\n' + '-'.repeat(30) + '\n')
                        .replace(/<li[^>]*>(.*?)<\/li>/gi, '• $1\n')
                        .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
                        .replace(/<br\s*\/?>/gi, '\n')
                        .replace(/<[^>]*>/g, '')
                        .replace(/&nbsp;/g, ' ')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&amp;/g, '&')
                        .replace(/\n{3,}/g, '\n\n')
                        .trim();
                    
                    textContent += `\n${subtopic}\n${'-'.repeat(subtopic.length)}\n${textOnly}\n`;
                }
            });
            
            // Download as text file
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${topicName.replace(/\s+/g, '_')}_notes.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            if (typeof Toast !== 'undefined') {
                Toast.show('📥 Notes exported!', 'success');
            }
        } catch (error) {
            console.error('Error exporting notes:', error);
            if (typeof Toast !== 'undefined') {
                Toast.show('Error exporting notes', 'error');
            }
        }
    }
};
