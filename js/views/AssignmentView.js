/**
 * AssignmentView.js - Assignment Management and Taking
 * Teachers: Create/manage assignments
 * Students: View and complete assignments
 */

const AssignmentView = {
    currentAssignment: null,
    attemptData: null,
    currentQuestion: 0,
    answers: [],
    startTime: null,
    timerInterval: null,
    
    // ==================== TEACHER VIEW ====================
    
    renderTeacherAssignments: (classroomCode = null) => {
        const assignments = Assignment.getTeacherAssignments(classroomCode);
        
        return `
            <div class="assignments-section">
                <div class="section-header-row">
                    <h3>📝 Assignments</h3>
                    <button class="btn btn-small btn-primary" onclick="AssignmentView.showCreateAssignment('${classroomCode || ''}')">
                        + Create Assignment
                    </button>
                </div>
                
                ${assignments.length === 0 ? `
                    <div class="empty-assignments">
                        <span class="empty-icon">📝</span>
                        <p>No assignments yet. Create one to get started!</p>
                    </div>
                ` : `
                    <div class="assignments-list">
                        ${assignments.map(a => AssignmentView.renderAssignmentCard(a, true)).join('')}
                    </div>
                `}
            </div>
        `;
    },
    
    renderAssignmentCard: (assignment, isTeacher = false) => {
        const dueDate = assignment.settings.dueDate 
            ? new Date(assignment.settings.dueDate).toLocaleDateString()
            : 'No due date';
        
        const statusClass = assignment.status === 'active' ? 'status-active' : 
                           assignment.status === 'closed' ? 'status-closed' : 'status-draft';
        
        if (isTeacher) {
            return `
                <div class="assignment-card">
                    <div class="assignment-header">
                        <h4>${assignment.title}</h4>
                        <span class="assignment-status ${statusClass}">${assignment.status}</span>
                    </div>
                    <p class="assignment-desc">${assignment.description || 'No description'}</p>
                    <div class="assignment-meta">
                        <span><i class="fas fa-book"></i> ${assignment.settings.topic === 'all' ? 'All Topics' : assignment.settings.topic}</span>
                        <span><i class="fas fa-question-circle"></i> ${assignment.questions.length} questions</span>
                        <span><i class="fas fa-calendar"></i> ${dueDate}</span>
                    </div>
                    <div class="assignment-stats">
                        <span>${assignment.stats.totalSubmissions} submissions</span>
                        <span>Avg: ${assignment.stats.avgScore}%</span>
                        <span>${assignment.stats.completedBy.length} completed</span>
                    </div>
                    <div class="assignment-actions">
                        <button class="btn btn-tiny btn-secondary" onclick="AssignmentView.viewSubmissions('${assignment.id}')">
                            View Submissions
                        </button>
                        <button class="btn btn-tiny btn-secondary" onclick="AssignmentView.editAssignment('${assignment.id}')">
                            Edit
                        </button>
                        <button class="btn btn-tiny btn-danger" onclick="AssignmentView.deleteAssignment('${assignment.id}')">
                            Delete
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Student view
            const hasSubmitted = assignment.attempts > 0;
            const canAttempt = assignment.canAttempt;
            
            return `
                <div class="assignment-card ${hasSubmitted ? 'completed' : 'pending'}">
                    <div class="assignment-header">
                        <h4>${assignment.title}</h4>
                        ${hasSubmitted ? `
                            <span class="score-badge ${assignment.bestScore >= assignment.settings.passingScore ? 'passed' : 'failed'}">
                                Best: ${assignment.bestScore}%
                            </span>
                        ` : `
                            <span class="assignment-badge new">New</span>
                        `}
                    </div>
                    <p class="assignment-desc">${assignment.description || 'No description'}</p>
                    <div class="assignment-meta">
                        <span><i class="fas fa-chalkboard"></i> ${assignment.classroomName}</span>
                        <span><i class="fas fa-question-circle"></i> ${assignment.questions.length} questions</span>
                        ${assignment.settings.timeLimit > 0 ? `
                            <span><i class="fas fa-clock"></i> ${assignment.settings.timeLimit} min</span>
                        ` : ''}
                        <span><i class="fas fa-calendar"></i> Due: ${dueDate}</span>
                    </div>
                    <div class="assignment-progress">
                        <span>Attempts: ${assignment.attempts}/${assignment.settings.maxAttempts}</span>
                        <span>Pass: ${assignment.settings.passingScore}%</span>
                    </div>
                    <div class="assignment-actions">
                        ${canAttempt ? `
                            <button class="btn btn-small btn-primary" onclick="AssignmentView.startAssignment('${assignment.id}')">
                                ${hasSubmitted ? 'Retry' : 'Start'}
                            </button>
                        ` : `
                            <button class="btn btn-small btn-secondary" disabled>Max Attempts Reached</button>
                        `}
                        ${hasSubmitted ? `
                            <button class="btn btn-small btn-secondary" onclick="AssignmentView.viewMySubmission('${assignment.id}')">
                                View Results
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }
    },
    
    // ==================== CREATE ASSIGNMENT ====================
    
    showCreateAssignment: (classroomCode = '') => {
        const classrooms = Classroom.getTeacherClassrooms();
        
        Modal.show({
            title: '📝 Create Assignment',
            content: `
                <form id="create-assignment-form" class="assignment-form">
                    <div class="form-group">
                        <label for="assign-classroom">Classroom *</label>
                        <select id="assign-classroom" required>
                            <option value="">Select classroom...</option>
                            ${classrooms.map(c => `
                                <option value="${c.code}" ${c.code === classroomCode ? 'selected' : ''}>
                                    ${c.name}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="assign-title">Title *</label>
                        <input type="text" id="assign-title" placeholder="e.g., Week 3 Quiz - Data Types" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="assign-desc">Description</label>
                        <textarea id="assign-desc" placeholder="Instructions for students..." rows="2"></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="assign-topic">Topic</label>
                            <select id="assign-topic">
                                <option value="all">All Topics</option>
                                ${TOPICS.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="assign-questions">Questions</label>
                            <select id="assign-questions">
                                <option value="5">5 questions</option>
                                <option value="10" selected>10 questions</option>
                                <option value="15">15 questions</option>
                                <option value="20">20 questions</option>
                                <option value="25">25 questions</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="assign-time">Time Limit</label>
                            <select id="assign-time">
                                <option value="0">No limit</option>
                                <option value="10">10 minutes</option>
                                <option value="15">15 minutes</option>
                                <option value="20">20 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">60 minutes</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="assign-pass">Pass Score</label>
                            <select id="assign-pass">
                                <option value="50">50%</option>
                                <option value="60" selected>60%</option>
                                <option value="70">70%</option>
                                <option value="80">80%</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="assign-attempts">Max Attempts</label>
                            <select id="assign-attempts">
                                <option value="1">1 attempt</option>
                                <option value="2">2 attempts</option>
                                <option value="3" selected>3 attempts</option>
                                <option value="5">5 attempts</option>
                                <option value="0">Unlimited</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="assign-due">Due Date</label>
                            <input type="date" id="assign-due">
                        </div>
                    </div>
                    
                    <div class="form-group checkboxes">
                        <label class="checkbox-label">
                            <input type="checkbox" id="assign-show-answers" checked>
                            Show correct answers after submission
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="assign-shuffle" checked>
                            Shuffle questions
                        </label>
                    </div>
                </form>
            `,
            footer: `
                <button class="btn btn-secondary" id="assign-cancel">Cancel</button>
                <button class="btn btn-primary" id="assign-create">Create Assignment</button>
            `,
            className: 'modal-large'
        });
        
        setTimeout(() => {
            document.getElementById('assign-cancel')?.addEventListener('click', Modal.close);
            document.getElementById('assign-create')?.addEventListener('click', AssignmentView.handleCreateAssignment);
        }, 0);
    },
    
    handleCreateAssignment: () => {
        const classroomCode = document.getElementById('assign-classroom').value;
        const title = document.getElementById('assign-title').value.trim();
        const description = document.getElementById('assign-desc').value.trim();
        const topic = document.getElementById('assign-topic').value;
        const questionCount = parseInt(document.getElementById('assign-questions').value);
        const timeLimit = parseInt(document.getElementById('assign-time').value);
        const passingScore = parseInt(document.getElementById('assign-pass').value);
        const maxAttempts = parseInt(document.getElementById('assign-attempts').value);
        const dueDate = document.getElementById('assign-due').value || null;
        const showAnswers = document.getElementById('assign-show-answers').checked;
        const shuffleQuestions = document.getElementById('assign-shuffle').checked;
        
        if (!classroomCode) {
            Toast.show('Please select a classroom', 'error');
            return;
        }
        
        if (!title) {
            Toast.show('Please enter a title', 'error');
            return;
        }
        
        const result = Assignment.create(classroomCode, {
            title,
            description,
            topic,
            questionCount,
            timeLimit,
            passingScore,
            maxAttempts: maxAttempts || 999,
            dueDate,
            showAnswers,
            shuffleQuestions
        });
        
        if (result.success) {
            Modal.close();
            Toast.show('Assignment created!', 'success');
            TeacherView.refresh();
        } else {
            Toast.show(result.error, 'error');
        }
    },
    
    editAssignment: (assignmentId) => {
        const assignment = Assignment.get(assignmentId);
        if (!assignment) return;
        
        Modal.show({
            title: '✏️ Edit Assignment',
            content: `
                <form class="assignment-form">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" id="edit-title" value="${assignment.title}">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="edit-desc" rows="2">${assignment.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select id="edit-status">
                            <option value="active" ${assignment.status === 'active' ? 'selected' : ''}>Active</option>
                            <option value="closed" ${assignment.status === 'closed' ? 'selected' : ''}>Closed</option>
                            <option value="draft" ${assignment.status === 'draft' ? 'selected' : ''}>Draft</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date" id="edit-due" value="${assignment.settings.dueDate || ''}">
                    </div>
                </form>
            `,
            footer: `
                <button class="btn btn-secondary" id="edit-cancel">Cancel</button>
                <button class="btn btn-primary" id="edit-save">Save Changes</button>
            `
        });
        
        setTimeout(() => {
            document.getElementById('edit-cancel')?.addEventListener('click', Modal.close);
            document.getElementById('edit-save')?.addEventListener('click', () => {
                const result = Assignment.update(assignmentId, {
                    title: document.getElementById('edit-title').value,
                    description: document.getElementById('edit-desc').value,
                    status: document.getElementById('edit-status').value,
                    settings: {
                        dueDate: document.getElementById('edit-due').value || null
                    }
                });
                
                if (result.success) {
                    Modal.close();
                    Toast.show('Assignment updated!', 'success');
                    TeacherView.refresh();
                } else {
                    Toast.show(result.error, 'error');
                }
            });
        }, 0);
    },
    
    deleteAssignment: (assignmentId) => {
        if (confirm('Delete this assignment? All submissions will be lost.')) {
            const result = Assignment.delete(assignmentId);
            if (result.success) {
                Toast.show('Assignment deleted', 'info');
                TeacherView.refresh();
            } else {
                Toast.show(result.error, 'error');
            }
        }
    },
    
    viewSubmissions: (assignmentId) => {
        const assignment = Assignment.get(assignmentId);
        const submissions = Assignment.getAssignmentSubmissions(assignmentId);
        
        Modal.show({
            title: `📊 Submissions - ${assignment.title}`,
            content: `
                <div class="submissions-view">
                    <div class="submissions-stats">
                        <div class="stat">
                            <span class="stat-value">${submissions.length}</span>
                            <span class="stat-label">Total Submissions</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${assignment.stats.avgScore}%</span>
                            <span class="stat-label">Average Score</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${assignment.stats.highestScore}%</span>
                            <span class="stat-label">Highest Score</span>
                        </div>
                    </div>
                    
                    ${submissions.length === 0 ? `
                        <p class="no-submissions">No submissions yet</p>
                    ` : `
                        <div class="submissions-list">
                            <table class="submissions-table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Score</th>
                                        <th>Time</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${submissions.map(s => `
                                        <tr class="${s.passed ? 'passed' : 'failed'}">
                                            <td>${s.studentName}</td>
                                            <td>${s.score}% (${s.correct}/${s.total})</td>
                                            <td>${Math.floor(s.timeSpent / 60)}:${(s.timeSpent % 60).toString().padStart(2, '0')}</td>
                                            <td>${new Date(s.submittedAt).toLocaleString()}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>
            `,
            footer: '<button class="btn btn-primary" id="close-submissions">Close</button>',
            className: 'modal-large'
        });
        
        setTimeout(() => {
            document.getElementById('close-submissions')?.addEventListener('click', Modal.close);
        }, 0);
    },
    
    // ==================== STUDENT VIEW ====================
    
    renderStudentAssignments: () => {
        const assignments = Assignment.getStudentAssignments();
        const pending = assignments.filter(a => a.attempts === 0);
        const completed = assignments.filter(a => a.attempts > 0);
        
        return `
            <section class="assignments-section student-assignments">
                <div class="section-header-row">
                    <h3>📝 My Assignments</h3>
                    <span class="assignment-count">${pending.length} pending</span>
                </div>
                
                ${assignments.length === 0 ? `
                    <div class="no-assignments">
                        <span class="empty-icon">📝</span>
                        <p>No assignments yet. Join a classroom to receive assignments!</p>
                    </div>
                ` : `
                    ${pending.length > 0 ? `
                        <div class="assignments-group">
                            <h4>📌 Pending</h4>
                            <div class="assignments-grid">
                                ${pending.map(a => AssignmentView.renderAssignmentCard(a, false)).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${completed.length > 0 ? `
                        <div class="assignments-group">
                            <h4>✅ Completed</h4>
                            <div class="assignments-grid">
                                ${completed.map(a => AssignmentView.renderAssignmentCard(a, false)).join('')}
                            </div>
                        </div>
                    ` : ''}
                `}
            </section>
        `;
    },
    
    // ==================== TAKING ASSIGNMENT ====================
    
    startAssignment: (assignmentId) => {
        const result = Assignment.startAttempt(assignmentId);
        
        if (!result.success) {
            Toast.show(result.error, 'error');
            return;
        }
        
        AssignmentView.currentAssignment = result.assignment;
        AssignmentView.attemptData = {
            attemptNumber: result.attemptNumber,
            questions: result.assignment.questionData
        };
        AssignmentView.currentQuestion = 0;
        AssignmentView.answers = new Array(result.assignment.questionData.length).fill(null);
        AssignmentView.startTime = Date.now();
        
        AssignmentView.renderAssignmentAttempt();
        
        // Start timer if time limit
        if (result.assignment.settings.timeLimit > 0) {
            AssignmentView.startTimer(result.assignment.settings.timeLimit);
        }
    },
    
    renderAssignmentAttempt: () => {
        const assignment = AssignmentView.currentAssignment;
        const questions = AssignmentView.attemptData.questions;
        const current = AssignmentView.currentQuestion;
        const question = questions[current];
        
        document.getElementById('app-main').innerHTML = `
            <div class="assignment-attempt">
                <div class="attempt-header">
                    <div class="attempt-info">
                        <h2>${assignment.title}</h2>
                        <span class="attempt-progress">Question ${current + 1} of ${questions.length}</span>
                    </div>
                    <div class="attempt-controls">
                        ${assignment.settings.timeLimit > 0 ? `
                            <div class="timer" id="assignment-timer">
                                <i class="fas fa-clock"></i>
                                <span id="timer-display">--:--</span>
                            </div>
                        ` : ''}
                        <button class="btn btn-small btn-danger" onclick="AssignmentView.confirmExit()">
                            Exit
                        </button>
                    </div>
                </div>
                
                <div class="question-nav">
                    ${questions.map((q, i) => `
                        <button class="q-nav-btn ${i === current ? 'current' : ''} ${AssignmentView.answers[i] !== null ? 'answered' : ''}"
                                onclick="AssignmentView.goToQuestion(${i})">
                            ${i + 1}
                        </button>
                    `).join('')}
                </div>
                
                <div class="attempt-question">
                    <div class="question-text">${question.question}</div>
                    
                    <div class="question-options">
                        ${question.options.map((opt, i) => `
                            <button class="option-btn ${AssignmentView.answers[current] === i ? 'selected' : ''}"
                                    onclick="AssignmentView.selectAnswer(${i})">
                                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                                <span class="option-text">${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="attempt-footer">
                    <button class="btn btn-secondary" onclick="AssignmentView.prevQuestion()" 
                            ${current === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    
                    ${current === questions.length - 1 ? `
                        <button class="btn btn-primary" onclick="AssignmentView.submitAssignment()">
                            Submit Assignment
                        </button>
                    ` : `
                        <button class="btn btn-primary" onclick="AssignmentView.nextQuestion()">
                            Next →
                        </button>
                    `}
                </div>
            </div>
        `;
    },
    
    selectAnswer: (index) => {
        AssignmentView.answers[AssignmentView.currentQuestion] = index;
        AssignmentView.renderAssignmentAttempt();
    },
    
    goToQuestion: (index) => {
        AssignmentView.currentQuestion = index;
        AssignmentView.renderAssignmentAttempt();
    },
    
    prevQuestion: () => {
        if (AssignmentView.currentQuestion > 0) {
            AssignmentView.currentQuestion--;
            AssignmentView.renderAssignmentAttempt();
        }
    },
    
    nextQuestion: () => {
        if (AssignmentView.currentQuestion < AssignmentView.attemptData.questions.length - 1) {
            AssignmentView.currentQuestion++;
            AssignmentView.renderAssignmentAttempt();
        }
    },
    
    startTimer: (minutes) => {
        let remaining = minutes * 60;
        
        AssignmentView.timerInterval = setInterval(() => {
            remaining--;
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            
            const timerEl = document.getElementById('timer-display');
            if (timerEl) {
                timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
                
                if (remaining <= 60) {
                    timerEl.parentElement.classList.add('warning');
                }
            }
            
            if (remaining <= 0) {
                clearInterval(AssignmentView.timerInterval);
                Toast.show('Time\'s up! Submitting...', 'warning');
                AssignmentView.submitAssignment();
            }
        }, 1000);
    },
    
    confirmExit: () => {
        if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
            AssignmentView.cleanup();
            Router.navigate('home');
        }
    },
    
    submitAssignment: () => {
        // Check unanswered questions
        const unanswered = AssignmentView.answers.filter(a => a === null).length;
        if (unanswered > 0) {
            if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
                return;
            }
        }
        
        AssignmentView.cleanup();
        
        const timeSpent = Math.floor((Date.now() - AssignmentView.startTime) / 1000);
        
        const result = Assignment.submit(
            AssignmentView.currentAssignment.id,
            AssignmentView.answers,
            timeSpent
        );
        
        if (result.success) {
            AssignmentView.showResults(result.submission, result.xpEarned);
        } else {
            Toast.show(result.error, 'error');
            Router.navigate('home');
        }
    },
    
    showResults: (submission, xpEarned) => {
        const assignment = AssignmentView.currentAssignment;
        const percentage = submission.score;
        const passed = submission.passed;
        
        document.getElementById('app-main').innerHTML = `
            <div class="assignment-results">
                <div class="results-header ${passed ? 'passed' : 'failed'}">
                    <span class="result-icon">${passed ? '🎉' : '📚'}</span>
                    <h1>${passed ? 'Well Done!' : 'Keep Practicing!'}</h1>
                    <p>${assignment.title}</p>
                </div>
                
                <div class="results-score">
                    <div class="score-circle ${passed ? 'passed' : 'failed'}">
                        <span class="score-value">${percentage}%</span>
                        <span class="score-label">${submission.correct}/${submission.total} correct</span>
                    </div>
                </div>
                
                <div class="results-stats">
                    <div class="result-stat">
                        <span class="stat-icon">⏱️</span>
                        <span class="stat-value">${Math.floor(submission.timeSpent / 60)}:${(submission.timeSpent % 60).toString().padStart(2, '0')}</span>
                        <span class="stat-label">Time</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-icon">🎯</span>
                        <span class="stat-value">${passed ? 'PASS' : 'FAIL'}</span>
                        <span class="stat-label">Required: ${assignment.settings.passingScore}%</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-value">+${xpEarned}</span>
                        <span class="stat-label">XP Earned</span>
                    </div>
                </div>
                
                ${submission.results ? `
                    <div class="results-breakdown">
                        <h3>Question Breakdown</h3>
                        <div class="breakdown-list">
                            ${submission.results.map((r, i) => `
                                <div class="breakdown-item ${r.isCorrect ? 'correct' : 'wrong'}">
                                    <div class="breakdown-header">
                                        <span class="q-num">Q${i + 1}</span>
                                        <span class="q-status">${r.isCorrect ? '✓' : '✗'}</span>
                                    </div>
                                    <p class="q-text">${r.question}</p>
                                    ${!r.isCorrect ? `
                                        <p class="q-answer">
                                            Your answer: <span class="wrong-ans">${AssignmentView.attemptData.questions[i].options[r.userAnswer] || 'No answer'}</span><br>
                                            Correct: <span class="correct-ans">${AssignmentView.attemptData.questions[i].options[r.correctAnswer]}</span>
                                        </p>
                                    ` : ''}
                                    <p class="q-explanation">${r.explanation}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="results-actions">
                    <button class="btn btn-secondary" onclick="Router.navigate('home')">
                        Back to Home
                    </button>
                    ${assignment.canAttempt ? `
                        <button class="btn btn-primary" onclick="AssignmentView.startAssignment('${assignment.id}')">
                            Try Again
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    },
    
    viewMySubmission: (assignmentId) => {
        const assignment = Assignment.getStudentAssignments().find(a => a.id === assignmentId);
        if (!assignment || !assignment.lastSubmission) return;
        
        AssignmentView.currentAssignment = assignment;
        AssignmentView.attemptData = { questions: assignment.questions.map(qId => QUESTIONS.find(q => q.id === qId)) };
        AssignmentView.showResults(assignment.lastSubmission, 0);
    },
    
    cleanup: () => {
        if (AssignmentView.timerInterval) {
            clearInterval(AssignmentView.timerInterval);
            AssignmentView.timerInterval = null;
        }
    }
};
