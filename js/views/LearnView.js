/**
 * LearnView.js - Learning Mode with Revision Notes
 */

const LearnView = {
    currentTopic: 'problem-solving',
    currentSubtopic: null,

    render: () => {
        return `
            <div class="learn-view">
                <div class="learn-sidebar">
                    <h3>📚 Topics</h3>
                    <div class="topic-list">
                        ${TOPICS.map(topic => `
                            <div class="topic-item ${LearnView.currentTopic === topic.id ? 'active' : ''}" 
                                 style="--topic-color: ${topic.color}"
                                 onclick="LearnView.selectTopic('${topic.id}')">
                                <span class="topic-icon">${topic.icon}</span>
                                <span class="topic-name">${topic.name}</span>
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
    },

    init: () => {
        console.log('📚 Learn view initialized');
        if (LearnView.currentTopic) {
            LearnView.selectTopic(LearnView.currentTopic);
        }
    },

    selectTopic: (topicId) => {
        LearnView.currentTopic = topicId;
        LearnView.currentSubtopic = null;

        // Update active state
        document.querySelectorAll('.topic-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.topic-item[onclick*="${topicId}"]`)?.classList.add('active');

        // Get topic data
        const topic = getTopicById(topicId);
        const topicNotes = NOTES[topicId] || {};
        const subtopics = Object.keys(topicNotes);

        // Render subtopic navigation
        const subtopicNav = document.getElementById('subtopic-nav');
        subtopicNav.innerHTML = `
            <div class="subtopic-header">
                <span class="topic-icon" style="color: ${topic.color}">${topic.icon}</span>
                <h2>${topic.name}</h2>
            </div>
            <div class="subtopic-tabs">
                ${subtopics.map((sub, i) => `
                    <button class="subtopic-tab ${i === 0 ? 'active' : ''}" 
                            onclick="LearnView.selectSubtopic('${sub}')">${sub}</button>
                `).join('')}
            </div>
        `;

        // Show first subtopic
        if (subtopics.length > 0) {
            LearnView.selectSubtopic(subtopics[0]);
        } else {
            document.getElementById('notes-container').innerHTML = `
                <div class="notes-placeholder">
                    <p>Notes coming soon for ${topic.name}!</p>
                </div>
            `;
        }

        // Track progress
        LearnView.trackTopicRead(topicId);
    },

    selectSubtopic: (subtopic) => {
        LearnView.currentSubtopic = subtopic;

        // Update active tab
        document.querySelectorAll('.subtopic-tab').forEach(tab => {
            tab.classList.toggle('active', tab.textContent === subtopic);
        });

        // Get and render notes
        const notes = NOTES[LearnView.currentTopic]?.[subtopic];
        const container = document.getElementById('notes-container');

        if (notes) {
            container.innerHTML = `
                <article class="notes-content">
                    ${notes.content}
                </article>
                <div class="notes-actions">
                    <button class="btn btn-secondary" onclick="LearnView.prevSubtopic()">
                        ← Previous
                    </button>
                    <button class="btn btn-primary" onclick="LearnView.nextSubtopic()">
                        Next →
                    </button>
                </div>
            `;

            // Apply syntax highlighting
            container.querySelectorAll('pre code').forEach(block => {
                if (typeof hljs !== 'undefined') {
                    hljs.highlightElement(block);
                }
            });
        } else {
            container.innerHTML = '<p>Notes not available</p>';
        }
    },

    nextSubtopic: () => {
        const topicNotes = NOTES[LearnView.currentTopic] || {};
        const subtopics = Object.keys(topicNotes);
        const currentIndex = subtopics.indexOf(LearnView.currentSubtopic);
        
        if (currentIndex < subtopics.length - 1) {
            LearnView.selectSubtopic(subtopics[currentIndex + 1]);
        } else {
            // Move to next topic
            const topicIndex = TOPICS.findIndex(t => t.id === LearnView.currentTopic);
            if (topicIndex < TOPICS.length - 1) {
                LearnView.selectTopic(TOPICS[topicIndex + 1].id);
            }
        }
    },

    prevSubtopic: () => {
        const topicNotes = NOTES[LearnView.currentTopic] || {};
        const subtopics = Object.keys(topicNotes);
        const currentIndex = subtopics.indexOf(LearnView.currentSubtopic);
        
        if (currentIndex > 0) {
            LearnView.selectSubtopic(subtopics[currentIndex - 1]);
        }
    },

    trackTopicRead: (topicId) => {
        const readTopics = AppState.getState('learn.readTopics') || [];
        if (!readTopics.includes(topicId)) {
            readTopics.push(topicId);
            AppState.setState('learn.readTopics', readTopics);
            AppState.addXP(5);
            
            // Check for achievement
            if (readTopics.length >= 6) {
                AppState.unlockAchievement('note_reader');
            }
        }
    }
};
