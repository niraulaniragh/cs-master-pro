/**
 * PastPaperView.js - Enhanced Past Paper Practice Mode
 * Features: Topic sorting, mark schemes, exam-style timing, progress tracking
 */

const PastPaperView = {
    currentPaper: null,
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: 0,
    timerInterval: null,
    showingMarkScheme: false,
    
    // Paper types matching IGCSE structure
    paperTypes: {
        paper1: { name: 'Paper 1 - Theory', duration: 90, marks: 100 },
        paper2: { name: 'Paper 2 - Problem Solving', duration: 90, marks: 100 }
    },
    
    // Past paper questions organized by topic and year
    papers: {
        '2023-paper1': {
            year: 2023,
            paper: 'paper1',
            questions: [
                { id: 'pp2023-1', topic: 'data-representation', marks: 4, question: 'Convert the denary number 156 to binary.', type: 'written', markScheme: '156 ÷ 2 = 78 r0\n78 ÷ 2 = 39 r0\n39 ÷ 2 = 19 r1\n19 ÷ 2 = 9 r1\n9 ÷ 2 = 4 r1\n4 ÷ 2 = 2 r0\n2 ÷ 2 = 1 r0\n1 ÷ 2 = 0 r1\n\nAnswer: 10011100\n\n1 mark for method\n3 marks for correct answer' },
                { id: 'pp2023-2', topic: 'data-representation', marks: 3, question: 'Explain why hexadecimal is used by programmers instead of binary.', type: 'written', markScheme: '• Easier to read/less prone to errors (1 mark)\n• Shorter representation - 1 hex = 4 binary digits (1 mark)\n• Easier to convert to/from binary (1 mark)\n• Used for memory addresses, color codes, MAC addresses (1 mark)\nMax 3 marks' },
                { id: 'pp2023-3', topic: 'hardware', marks: 2, question: 'State two functions of the CPU.', type: 'written', markScheme: '• Fetch instructions from memory (1 mark)\n• Decode instructions (1 mark)\n• Execute instructions (1 mark)\n• Perform calculations/arithmetic (1 mark)\n• Control data flow (1 mark)\nMax 2 marks' },
                { id: 'pp2023-4', topic: 'hardware', marks: 4, question: 'Describe the difference between RAM and ROM.', type: 'written', markScheme: 'RAM:\n• Volatile - loses data when power off (1 mark)\n• Read and write (1 mark)\n• Stores currently running programs/data (1 mark)\n\nROM:\n• Non-volatile - retains data when power off (1 mark)\n• Read only (1 mark)\n• Stores boot/startup instructions (1 mark)\nMax 4 marks' },
                { id: 'pp2023-5', topic: 'software', marks: 3, question: 'Explain the purpose of an operating system.', type: 'written', markScheme: '• Manages hardware resources (1 mark)\n• Provides user interface (1 mark)\n• Manages files and folders (1 mark)\n• Handles security/user accounts (1 mark)\n• Runs application software (1 mark)\n• Memory management (1 mark)\nMax 3 marks' },
                { id: 'pp2023-6', topic: 'networks', marks: 4, question: 'Describe the differences between a LAN and a WAN.', type: 'written', markScheme: 'LAN:\n• Small geographical area (1 mark)\n• Privately owned/maintained (1 mark)\n• High speed, low latency (1 mark)\n\nWAN:\n• Large geographical area (1 mark)\n• Uses third-party infrastructure (1 mark)\n• Lower speed, higher latency (1 mark)\nMax 4 marks' },
                { id: 'pp2023-7', topic: 'security', marks: 3, question: 'State three methods of preventing unauthorized access to a computer system.', type: 'written', markScheme: '• Strong passwords (1 mark)\n• Biometric authentication (1 mark)\n• Two-factor authentication (1 mark)\n• Firewall (1 mark)\n• Encryption (1 mark)\n• Access control lists (1 mark)\nMax 3 marks' },
                { id: 'pp2023-8', topic: 'programming', marks: 5, question: 'Write pseudocode for a program that inputs 10 numbers and outputs the largest.', type: 'code', markScheme: 'DECLARE max, num : INTEGER\nmax ← 0\nFOR i ← 1 TO 10\n    INPUT num\n    IF num > max THEN\n        max ← num\n    ENDIF\nNEXT i\nOUTPUT max\n\n• Loop 10 times (1 mark)\n• Input number (1 mark)\n• Comparison with max (1 mark)\n• Update max correctly (1 mark)\n• Output result (1 mark)' }
            ]
        },
        '2022-paper1': {
            year: 2022,
            paper: 'paper1',
            questions: [
                { id: 'pp2022-1', topic: 'data-representation', marks: 3, question: 'Convert the binary number 11010110 to denary.', type: 'written', markScheme: '128 + 64 + 16 + 4 + 2 = 214\n\n1 mark for showing working\n2 marks for correct answer' },
                { id: 'pp2022-2', topic: 'data-representation', marks: 4, question: 'Explain how characters are represented in a computer using ASCII.', type: 'written', markScheme: '• Each character has a unique number/code (1 mark)\n• Standard ASCII uses 7 bits (1 mark)\n• Can represent 128 characters (1 mark)\n• Includes letters, numbers, symbols (1 mark)\n• Extended ASCII uses 8 bits for 256 characters (1 mark)\nMax 4 marks' },
                { id: 'pp2022-3', topic: 'hardware', marks: 3, question: 'Describe the purpose of cache memory.', type: 'written', markScheme: '• Stores frequently used data/instructions (1 mark)\n• Faster access than RAM (1 mark)\n• Located between CPU and RAM (1 mark)\n• Reduces time to fetch data (1 mark)\nMax 3 marks' },
                { id: 'pp2022-4', topic: 'software', marks: 4, question: 'Compare compiled and interpreted languages.', type: 'written', markScheme: 'Compiled:\n• Translated all at once before running (1 mark)\n• Creates executable file (1 mark)\n• Faster execution (1 mark)\n\nInterpreted:\n• Translated line by line (1 mark)\n• No executable created (1 mark)\n• Easier to debug (1 mark)\nMax 4 marks' },
                { id: 'pp2022-5', topic: 'networks', marks: 3, question: 'State three advantages of using a star network topology.', type: 'written', markScheme: '• Easy to add new devices (1 mark)\n• One failure doesn\'t affect others (1 mark)\n• Easy to find faults (1 mark)\n• Better performance/no collisions (1 mark)\n• Central management (1 mark)\nMax 3 marks' },
                { id: 'pp2022-6', topic: 'security', marks: 4, question: 'Describe how encryption protects data during transmission.', type: 'written', markScheme: '• Data is scrambled/encoded (1 mark)\n• Uses an encryption key (1 mark)\n• Only recipient with key can decrypt (1 mark)\n• Prevents interception/reading (1 mark)\n• Even if intercepted, data is unreadable (1 mark)\nMax 4 marks' }
            ]
        }
    },
    
    render: () => {
        return `
            <div class="past-paper-view">
                <div class="pp-header">
                    <h1>📝 Past Paper Practice</h1>
                    <p>Practice with real IGCSE-style exam questions</p>
                </div>
                
                <div class="pp-content">
                    ${PastPaperView.renderPaperSelection()}
                </div>
            </div>
        `;
    },
    
    init: () => {
        console.log('📝 Past Paper view initialized');
    },
    
    renderPaperSelection: () => {
        const stats = PastPaperView.getStats();
        
        return `
            <div class="pp-selection">
                <div class="pp-options">
                    <div class="pp-option-group">
                        <h3>📚 Full Papers</h3>
                        <p>Complete past paper experience with timing</p>
                        <div class="pp-papers-list">
                            ${Object.entries(PastPaperView.papers).map(([id, paper]) => {
                                const completed = stats.completed?.includes(id);
                                const score = stats.scores?.[id];
                                return `
                                    <div class="pp-paper-card ${completed ? 'completed' : ''}">
                                        <div class="pp-paper-info">
                                            <span class="pp-year">${paper.year}</span>
                                            <span class="pp-name">${PastPaperView.paperTypes[paper.paper].name}</span>
                                            <span class="pp-questions">${paper.questions.length} questions</span>
                                        </div>
                                        ${completed ? `<span class="pp-score">${score}%</span>` : ''}
                                        <button class="btn btn-primary btn-small" onclick="PastPaperView.startPaper('${id}')">
                                            ${completed ? 'Retry' : 'Start'}
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <div class="pp-option-group">
                        <h3>🎯 Topic Practice</h3>
                        <p>Practice questions sorted by topic</p>
                        <div class="pp-topics-list">
                            ${PastPaperView.getTopicStats().map(topic => `
                                <div class="pp-topic-card">
                                    <span class="pp-topic-name">${topic.name}</span>
                                    <span class="pp-topic-count">${topic.count} questions</span>
                                    <button class="btn btn-secondary btn-small" onclick="PastPaperView.startTopicPractice('${topic.id}')">
                                        Practice
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="pp-stats-panel">
                    <h3>📊 Your Progress</h3>
                    <div class="pp-stats">
                        <div class="pp-stat">
                            <span class="pp-stat-value">${stats.totalAttempted || 0}</span>
                            <span class="pp-stat-label">Questions Attempted</span>
                        </div>
                        <div class="pp-stat">
                            <span class="pp-stat-value">${stats.averageScore || 0}%</span>
                            <span class="pp-stat-label">Average Score</span>
                        </div>
                        <div class="pp-stat">
                            <span class="pp-stat-value">${Object.keys(stats.scores || {}).length}</span>
                            <span class="pp-stat-label">Papers Completed</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    getTopicStats: () => {
        const topics = {};
        
        Object.values(PastPaperView.papers).forEach(paper => {
            paper.questions.forEach(q => {
                if (!topics[q.topic]) {
                    topics[q.topic] = { id: q.topic, name: PastPaperView.formatTopicName(q.topic), count: 0 };
                }
                topics[q.topic].count++;
            });
        });
        
        return Object.values(topics).sort((a, b) => b.count - a.count);
    },
    
    formatTopicName: (id) => {
        const names = {
            'data-representation': 'Data Representation',
            'hardware': 'Hardware',
            'software': 'Software',
            'networks': 'Networks',
            'security': 'Security',
            'programming': 'Programming',
            'databases': 'Databases',
            'algorithms': 'Algorithms'
        };
        return names[id] || id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },
    
    startPaper: (paperId) => {
        const paper = PastPaperView.papers[paperId];
        if (!paper) return;
        
        PastPaperView.currentPaper = { id: paperId, ...paper };
        PastPaperView.currentQuestionIndex = 0;
        PastPaperView.answers = [];
        PastPaperView.showingMarkScheme = false;
        
        // Start timer
        const duration = PastPaperView.paperTypes[paper.paper].duration;
        PastPaperView.timeRemaining = duration * 60;
        
        PastPaperView.renderExam();
        PastPaperView.startTimer();
    },
    
    startTopicPractice: (topicId) => {
        // Collect all questions for this topic
        const questions = [];
        Object.values(PastPaperView.papers).forEach(paper => {
            paper.questions.forEach(q => {
                if (q.topic === topicId) questions.push(q);
            });
        });
        
        if (questions.length === 0) {
            Toast.show('No questions available for this topic', 'error');
            return;
        }
        
        // Shuffle and take up to 10
        const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 10);
        
        PastPaperView.currentPaper = {
            id: `topic-${topicId}`,
            year: 'Practice',
            paper: 'paper1',
            questions: shuffled
        };
        PastPaperView.currentQuestionIndex = 0;
        PastPaperView.answers = [];
        PastPaperView.timeRemaining = 0; // No timer for topic practice
        
        PastPaperView.renderExam();
    },
    
    renderExam: () => {
        const container = document.querySelector('.pp-content');
        if (!container) return;
        
        const paper = PastPaperView.currentPaper;
        const q = paper.questions[PastPaperView.currentQuestionIndex];
        
        container.innerHTML = `
            <div class="pp-exam">
                <div class="pp-exam-header">
                    <div class="pp-exam-info">
                        <span class="pp-exam-title">${paper.year} - ${PastPaperView.paperTypes[paper.paper]?.name || 'Practice'}</span>
                        <span class="pp-exam-progress">Question ${PastPaperView.currentQuestionIndex + 1} of ${paper.questions.length}</span>
                    </div>
                    ${PastPaperView.timeRemaining > 0 ? `
                        <div class="pp-timer" id="pp-timer">
                            <i class="fas fa-clock"></i>
                            <span id="timer-display">${PastPaperView.formatTime(PastPaperView.timeRemaining)}</span>
                        </div>
                    ` : ''}
                    <button class="btn btn-secondary btn-small" onclick="PastPaperView.exitExam()">Exit</button>
                </div>
                
                <div class="pp-question-card">
                    <div class="pp-question-meta">
                        <span class="pp-topic-badge">${PastPaperView.formatTopicName(q.topic)}</span>
                        <span class="pp-marks-badge">${q.marks} mark${q.marks > 1 ? 's' : ''}</span>
                    </div>
                    
                    <div class="pp-question-text">
                        <p>${q.question}</p>
                    </div>
                    
                    <div class="pp-answer-area">
                        ${q.type === 'code' ? `
                            <textarea id="pp-answer" class="pp-code-answer" placeholder="Write your answer here..." rows="10">${PastPaperView.answers[PastPaperView.currentQuestionIndex]?.answer || ''}</textarea>
                        ` : `
                            <textarea id="pp-answer" class="pp-written-answer" placeholder="Write your answer here..." rows="6">${PastPaperView.answers[PastPaperView.currentQuestionIndex]?.answer || ''}</textarea>
                        `}
                    </div>
                    
                    <div class="pp-actions">
                        ${PastPaperView.currentQuestionIndex > 0 ? `
                            <button class="btn btn-secondary" onclick="PastPaperView.prevQuestion()">← Previous</button>
                        ` : '<div></div>'}
                        
                        <button class="btn btn-primary" onclick="PastPaperView.saveAndNext()">
                            ${PastPaperView.currentQuestionIndex < paper.questions.length - 1 ? 'Next →' : 'Finish'}
                        </button>
                    </div>
                </div>
                
                <div class="pp-question-nav">
                    ${paper.questions.map((_, i) => `
                        <button class="pp-nav-btn ${i === PastPaperView.currentQuestionIndex ? 'current' : ''} ${PastPaperView.answers[i] ? 'answered' : ''}" 
                                onclick="PastPaperView.goToQuestion(${i})">
                            ${i + 1}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    saveAnswer: () => {
        const answerEl = document.getElementById('pp-answer');
        if (answerEl) {
            PastPaperView.answers[PastPaperView.currentQuestionIndex] = {
                answer: answerEl.value,
                question: PastPaperView.currentPaper.questions[PastPaperView.currentQuestionIndex]
            };
        }
    },
    
    saveAndNext: () => {
        PastPaperView.saveAnswer();
        
        if (PastPaperView.currentQuestionIndex < PastPaperView.currentPaper.questions.length - 1) {
            PastPaperView.currentQuestionIndex++;
            PastPaperView.renderExam();
        } else {
            PastPaperView.finishExam();
        }
    },
    
    prevQuestion: () => {
        PastPaperView.saveAnswer();
        if (PastPaperView.currentQuestionIndex > 0) {
            PastPaperView.currentQuestionIndex--;
            PastPaperView.renderExam();
        }
    },
    
    goToQuestion: (index) => {
        PastPaperView.saveAnswer();
        PastPaperView.currentQuestionIndex = index;
        PastPaperView.renderExam();
    },
    
    startTimer: () => {
        if (PastPaperView.timerInterval) clearInterval(PastPaperView.timerInterval);
        
        PastPaperView.timerInterval = setInterval(() => {
            PastPaperView.timeRemaining--;
            
            const display = document.getElementById('timer-display');
            if (display) {
                display.textContent = PastPaperView.formatTime(PastPaperView.timeRemaining);
                
                if (PastPaperView.timeRemaining <= 300) {
                    display.parentElement.classList.add('warning');
                }
            }
            
            if (PastPaperView.timeRemaining <= 0) {
                clearInterval(PastPaperView.timerInterval);
                Toast.show('⏰ Time\'s up!', 'warning');
                PastPaperView.finishExam();
            }
        }, 1000);
    },
    
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    
    exitExam: () => {
        if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
            if (PastPaperView.timerInterval) clearInterval(PastPaperView.timerInterval);
            const container = document.querySelector('.pp-content');
            if (container) {
                container.innerHTML = PastPaperView.renderPaperSelection();
            }
        }
    },
    
    finishExam: () => {
        PastPaperView.saveAnswer();
        if (PastPaperView.timerInterval) clearInterval(PastPaperView.timerInterval);
        
        PastPaperView.renderResults();
    },
    
    renderResults: () => {
        const container = document.querySelector('.pp-content');
        if (!container) return;
        
        const paper = PastPaperView.currentPaper;
        const totalMarks = paper.questions.reduce((sum, q) => sum + q.marks, 0);
        
        container.innerHTML = `
            <div class="pp-results">
                <div class="pp-results-header">
                    <h2>📝 Review Your Answers</h2>
                    <p>${paper.year} - ${PastPaperView.paperTypes[paper.paper]?.name || 'Practice'}</p>
                </div>
                
                <div class="pp-results-summary">
                    <p>Total marks available: <strong>${totalMarks}</strong></p>
                    <p>Compare your answers with the mark schemes below.</p>
                </div>
                
                <div class="pp-results-questions">
                    ${paper.questions.map((q, i) => {
                        const answer = PastPaperView.answers[i];
                        return `
                            <div class="pp-result-item">
                                <div class="pp-result-header">
                                    <span class="pp-q-num">Q${i + 1}</span>
                                    <span class="pp-q-topic">${PastPaperView.formatTopicName(q.topic)}</span>
                                    <span class="pp-q-marks">${q.marks} marks</span>
                                </div>
                                
                                <div class="pp-result-question">
                                    <p><strong>Question:</strong> ${q.question}</p>
                                </div>
                                
                                <div class="pp-result-answer">
                                    <p><strong>Your Answer:</strong></p>
                                    <pre class="pp-user-answer">${Helpers.escapeHtml(answer?.answer || '(No answer provided)')}</pre>
                                </div>
                                
                                <div class="pp-mark-scheme">
                                    <button class="btn btn-secondary btn-small" onclick="this.nextElementSibling.classList.toggle('show'); this.textContent = this.nextElementSibling.classList.contains('show') ? 'Hide Mark Scheme' : 'Show Mark Scheme'">
                                        Show Mark Scheme
                                    </button>
                                    <div class="pp-scheme-content">
                                        <p><strong>Mark Scheme:</strong></p>
                                        <pre>${q.markScheme}</pre>
                                    </div>
                                </div>
                                
                                <div class="pp-self-mark">
                                    <label>Self-assess your marks:</label>
                                    <input type="number" min="0" max="${q.marks}" value="0" class="pp-mark-input" data-question="${i}" onchange="PastPaperView.updateSelfMark()">
                                    <span>/ ${q.marks}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="pp-results-footer">
                    <div class="pp-total-score">
                        <span>Your estimated score:</span>
                        <span id="pp-total-marks">0</span> / ${totalMarks}
                        (<span id="pp-percentage">0</span>%)
                    </div>
                    
                    <div class="pp-results-actions">
                        <button class="btn btn-primary" onclick="PastPaperView.saveResults()">Save Results</button>
                        <button class="btn btn-secondary" onclick="location.reload()">Back to Papers</button>
                    </div>
                </div>
            </div>
        `;
    },
    
    updateSelfMark: () => {
        const inputs = document.querySelectorAll('.pp-mark-input');
        let total = 0;
        inputs.forEach(input => {
            total += parseInt(input.value) || 0;
        });
        
        const paper = PastPaperView.currentPaper;
        const totalMarks = paper.questions.reduce((sum, q) => sum + q.marks, 0);
        const percentage = Math.round((total / totalMarks) * 100);
        
        document.getElementById('pp-total-marks').textContent = total;
        document.getElementById('pp-percentage').textContent = percentage;
    },
    
    saveResults: () => {
        const inputs = document.querySelectorAll('.pp-mark-input');
        let total = 0;
        inputs.forEach(input => {
            total += parseInt(input.value) || 0;
        });
        
        const paper = PastPaperView.currentPaper;
        const totalMarks = paper.questions.reduce((sum, q) => sum + q.marks, 0);
        const percentage = Math.round((total / totalMarks) * 100);
        
        const stats = PastPaperView.getStats();
        stats.completed = stats.completed || [];
        stats.scores = stats.scores || {};
        stats.totalAttempted = (stats.totalAttempted || 0) + paper.questions.length;
        
        if (!stats.completed.includes(paper.id)) {
            stats.completed.push(paper.id);
        }
        stats.scores[paper.id] = percentage;
        
        // Calculate average
        const scores = Object.values(stats.scores);
        stats.averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        
        PastPaperView.saveStats(stats);
        
        Toast.show(`✅ Results saved! Score: ${percentage}%`, 'success');
        
        // Track with streak system
        if (typeof StreakSystem !== 'undefined') {
            paper.questions.forEach(() => StreakSystem.recordActivity('question'));
        }
    },
    
    getStats: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_pastpapers') || '{}');
        } catch (e) {
            return {};
        }
    },
    
    saveStats: (stats) => {
        localStorage.setItem('csmaster_pastpapers', JSON.stringify(stats));
    }
};
