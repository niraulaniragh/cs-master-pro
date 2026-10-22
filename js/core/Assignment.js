/**
 * Assignment.js - Assignment System
 * Teachers can create assignments, students can complete them
 */

const Assignment = {
    ASSIGNMENTS_KEY: 'csmaster_assignments',
    SUBMISSIONS_KEY: 'csmaster_submissions',
    
    // Validation constants
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 1000,
    MIN_QUESTIONS: 1,
    MAX_QUESTIONS: 50,
    MAX_ATTEMPTS: 10,
    MAX_TIME_LIMIT: 180, // 3 hours max
    
    /**
     * Initialize assignment system
     */
    init: () => {
        try {
            if (!localStorage.getItem(Assignment.ASSIGNMENTS_KEY)) {
                localStorage.setItem(Assignment.ASSIGNMENTS_KEY, JSON.stringify({}));
            }
            if (!localStorage.getItem(Assignment.SUBMISSIONS_KEY)) {
                localStorage.setItem(Assignment.SUBMISSIONS_KEY, JSON.stringify({}));
            }
            console.log('📝 Assignment system initialized');
        } catch (error) {
            console.error('Failed to initialize Assignment system:', error);
        }
    },
    
    // ==================== STORAGE ====================
    
    /**
     * Get assignments with error handling
     */
    getAssignments: () => {
        try {
            const data = localStorage.getItem(Assignment.ASSIGNMENTS_KEY);
            if (!data) return {};
            const parsed = JSON.parse(data);
            return (typeof parsed === 'object' && parsed !== null) ? parsed : {};
        } catch (error) {
            console.error('Error loading assignments:', error);
            return {};
        }
    },
    
    /**
     * Save assignments with error handling
     */
    saveAssignments: (assignments) => {
        if (!assignments || typeof assignments !== 'object') {
            console.error('Invalid assignments data');
            return false;
        }
        try {
            localStorage.setItem(Assignment.ASSIGNMENTS_KEY, JSON.stringify(assignments));
            return true;
        } catch (error) {
            console.error('Error saving assignments:', error);
            return false;
        }
    },
    
    /**
     * Get submissions with error handling
     */
    getSubmissions: () => {
        try {
            const data = localStorage.getItem(Assignment.SUBMISSIONS_KEY);
            if (!data) return {};
            const parsed = JSON.parse(data);
            return (typeof parsed === 'object' && parsed !== null) ? parsed : {};
        } catch (error) {
            console.error('Error loading submissions:', error);
            return {};
        }
    },
    
    /**
     * Save submissions with error handling
     */
    saveSubmissions: (submissions) => {
        if (!submissions || typeof submissions !== 'object') {
            console.error('Invalid submissions data');
            return false;
        }
        try {
            localStorage.setItem(Assignment.SUBMISSIONS_KEY, JSON.stringify(submissions));
            return true;
        } catch (error) {
            console.error('Error saving submissions:', error);
            return false;
        }
    },
    
    /**
     * Sanitize string input
     */
    sanitize: (str, maxLength = 200) => {
        if (!str || typeof str !== 'string') return '';
        return str.trim().substring(0, maxLength);
    },
    
    // ==================== TEACHER FUNCTIONS ====================
    
    /**
     * Create a new assignment
     */
    create: (classroomCode, data) => {
        try {
            if (typeof Auth === 'undefined' || !Auth.isTeacher || !Auth.isTeacher()) {
                return { success: false, error: 'Only teachers can create assignments' };
            }
            
            if (!data || typeof data !== 'object') {
                return { success: false, error: 'Invalid assignment data' };
            }
            
            const classroom = typeof Classroom !== 'undefined' ? Classroom.get(classroomCode) : null;
            const user = typeof Auth.getCurrentUser === 'function' ? Auth.getCurrentUser() : null;
            
            if (!classroom || !user || classroom.teacherId !== user.id) {
                return { success: false, error: 'Classroom not found or unauthorized' };
            }
            
            // Sanitize and validate inputs
            const title = Assignment.sanitize(data.title, Assignment.MAX_TITLE_LENGTH);
            if (!title || title.length < Assignment.MIN_TITLE_LENGTH) {
                return { success: false, error: `Title must be at least ${Assignment.MIN_TITLE_LENGTH} characters` };
            }
            
            const description = Assignment.sanitize(data.description || '', Assignment.MAX_DESCRIPTION_LENGTH);
            
            // Validate settings
            const questionCount = Math.min(
                Math.max(parseInt(data.questionCount) || 10, Assignment.MIN_QUESTIONS),
                Assignment.MAX_QUESTIONS
            );
            const timeLimit = Math.min(
                Math.max(parseInt(data.timeLimit) || 0, 0),
                Assignment.MAX_TIME_LIMIT
            );
            const passingScore = Math.min(Math.max(parseInt(data.passingScore) || 60, 0), 100);
            const maxAttempts = Math.min(
                Math.max(parseInt(data.maxAttempts) || 3, 1),
                Assignment.MAX_ATTEMPTS
            );
            
            const assignmentId = Date.now().toString(36) + Math.random().toString(36).substring(2);
            
            const assignment = {
                id: assignmentId,
                classroomCode: classroomCode,
                classroomName: classroom.name || 'Classroom',
                teacherId: user.id,
                teacherName: user.username || 'Teacher',
                title: title,
                description: description,
                type: ['quiz', 'topic-practice', 'custom'].includes(data.type) ? data.type : 'quiz',
                settings: {
                    topic: data.topic || 'all',
                    questionCount: questionCount,
                    timeLimit: timeLimit,
                    passingScore: passingScore,
                    allowRetry: data.allowRetry !== false,
                    maxAttempts: maxAttempts,
                    showAnswers: data.showAnswers !== false,
                    shuffleQuestions: data.shuffleQuestions !== false,
                    dueDate: data.dueDate || null
                },
                questions: Array.isArray(data.questions) ? data.questions : [],
                status: 'active',
                createdAt: new Date().toISOString(),
                stats: {
                    totalSubmissions: 0,
                    avgScore: 0,
                    highestScore: 0,
                    completedBy: []
                }
            };
            
            // If not custom questions, generate from question bank
            if (assignment.type !== 'custom' && assignment.questions.length === 0) {
                assignment.questions = Assignment.generateQuestions(assignment.settings);
            }
            
            const assignments = Assignment.getAssignments();
            assignments[assignmentId] = assignment;
            
            if (!Assignment.saveAssignments(assignments)) {
                return { success: false, error: 'Failed to save assignment' };
            }
            
            return { success: true, assignment };
        } catch (error) {
            console.error('Error creating assignment:', error);
            return { success: false, error: 'An error occurred while creating the assignment' };
        }
    },
    
    /**
     * Generate questions for assignment
     */
    generateQuestions: (settings) => {
        try {
            // Check if QUESTIONS global exists
            if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS)) {
                console.warn('QUESTIONS not available');
                return [];
            }
            
            let pool = [...QUESTIONS];
            
            // Filter by topic
            if (settings && settings.topic && settings.topic !== 'all') {
                pool = pool.filter(q => q && q.topic === settings.topic);
            }
            
            // Shuffle using Fisher-Yates
            if (!settings || settings.shuffleQuestions !== false) {
                for (let i = pool.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [pool[i], pool[j]] = [pool[j], pool[i]];
                }
            }
            
            // Take required number
            const count = (settings && settings.questionCount) || 10;
            return pool.slice(0, count).map(q => q.id).filter(Boolean);
        } catch (error) {
            console.error('Error generating questions:', error);
            return [];
        }
    },
    
    /**
     * Update assignment
     */
    update: (assignmentId, updates) => {
        try {
            if (typeof Auth === 'undefined' || !Auth.isTeacher || !Auth.isTeacher()) {
                return { success: false, error: 'Unauthorized' };
            }
            
            if (!assignmentId || !updates || typeof updates !== 'object') {
                return { success: false, error: 'Invalid parameters' };
            }
            
            const assignments = Assignment.getAssignments();
            const assignment = assignments[assignmentId];
            
            if (!assignment) {
                return { success: false, error: 'Assignment not found' };
            }
            
            const user = typeof Auth.getCurrentUser === 'function' ? Auth.getCurrentUser() : null;
            if (!user || assignment.teacherId !== user.id) {
                return { success: false, error: 'You can only edit your own assignments' };
            }
            
            // Update allowed fields with validation
            if (updates.title) {
                const newTitle = Assignment.sanitize(updates.title, Assignment.MAX_TITLE_LENGTH);
                if (newTitle.length >= Assignment.MIN_TITLE_LENGTH) {
                    assignment.title = newTitle;
                }
            }
            
            if (updates.description !== undefined) {
                assignment.description = Assignment.sanitize(updates.description, Assignment.MAX_DESCRIPTION_LENGTH);
            }
            
            if (updates.settings && typeof updates.settings === 'object') {
                assignment.settings = { ...(assignment.settings || {}), ...updates.settings };
            }
            
            if (updates.status && ['active', 'closed', 'draft'].includes(updates.status)) {
                assignment.status = updates.status;
            }
            
            Assignment.saveAssignments(assignments);
            return { success: true, assignment };
        } catch (error) {
            console.error('Error updating assignment:', error);
            return { success: false, error: 'An error occurred while updating the assignment' };
        }
    },
    
    /**
     * Delete assignment
     */
    delete: (assignmentId) => {
        try {
            if (typeof Auth === 'undefined' || !Auth.isTeacher || !Auth.isTeacher()) {
                return { success: false, error: 'Unauthorized' };
            }
            
            const assignments = Assignment.getAssignments();
            const assignment = assignments[assignmentId];
            
            if (!assignment) {
                return { success: false, error: 'Assignment not found' };
            }
            
            const user = typeof Auth.getCurrentUser === 'function' ? Auth.getCurrentUser() : null;
            if (!user || assignment.teacherId !== user.id) {
                return { success: false, error: 'You can only delete your own assignments' };
            }
            
            delete assignments[assignmentId];
            Assignment.saveAssignments(assignments);
            
            // Also delete related submissions
            const submissions = Assignment.getSubmissions();
            let deletedSubmissions = 0;
            Object.keys(submissions).forEach(key => {
                if (submissions[key] && submissions[key].assignmentId === assignmentId) {
                    delete submissions[key];
                    deletedSubmissions++;
                }
            });
            
            if (deletedSubmissions > 0) {
                Assignment.saveSubmissions(submissions);
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error deleting assignment:', error);
            return { success: false, error: 'An error occurred while deleting the assignment' };
        }
    },
    
    /**
     * Get teacher's assignments
     */
    getTeacherAssignments: (classroomCode = null) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user || (typeof Auth.isTeacher === 'function' && !Auth.isTeacher())) {
                return [];
            }
            
            const assignments = Assignment.getAssignments();
            let result = Object.values(assignments).filter(a => a && a.teacherId === user.id);
            
            if (classroomCode) {
                result = result.filter(a => a.classroomCode === classroomCode);
            }
            
            // Sort by creation date (newest first)
            return result.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
        } catch (error) {
            console.error('Error getting teacher assignments:', error);
            return [];
        }
    },
    
    /**
     * Get submissions for an assignment
     */
    getAssignmentSubmissions: (assignmentId) => {
        if (!assignmentId) return [];
        
        try {
            const submissions = Assignment.getSubmissions();
            return Object.values(submissions)
                .filter(s => s && s.assignmentId === assignmentId)
                .sort((a, b) => {
                    const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
                    const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
                    return dateB - dateA;
                });
        } catch (error) {
            console.error('Error getting assignment submissions:', error);
            return [];
        }
    },
    
    // ==================== STUDENT FUNCTIONS ====================
    
    /**
     * Get assignments for student's classrooms
     */
    getStudentAssignments: () => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) return [];
            
            const myClassrooms = typeof Classroom !== 'undefined' 
                ? Classroom.getStudentClassrooms().map(c => c.code)
                : [];
            
            if (myClassrooms.length === 0) return [];
            
            const assignments = Assignment.getAssignments();
            const submissions = Assignment.getSubmissions();
            
            return Object.values(assignments)
                .filter(a => a && myClassrooms.includes(a.classroomCode) && a.status === 'active')
                .map(a => {
                    // Check if student has submitted
                    const mySubmissions = Object.values(submissions).filter(
                        s => s && s.assignmentId === a.id && s.studentId === user.id
                    );
                    
                    const maxAttempts = a.settings?.maxAttempts || 3;
                    const allowRetry = a.settings?.allowRetry !== false;
                    
                    return {
                        ...a,
                        mySubmissions,
                        attempts: mySubmissions.length,
                        bestScore: mySubmissions.length > 0 
                            ? Math.max(...mySubmissions.map(s => s.score || 0))
                            : null,
                        lastSubmission: mySubmissions.length > 0
                            ? mySubmissions.sort((x, y) => {
                                const dateX = x.submittedAt ? new Date(x.submittedAt).getTime() : 0;
                                const dateY = y.submittedAt ? new Date(y.submittedAt).getTime() : 0;
                                return dateY - dateX;
                            })[0]
                            : null,
                        canAttempt: mySubmissions.length < maxAttempts || allowRetry
                    };
                })
                .sort((a, b) => {
                    // Sort: incomplete first, then by due date
                    if (a.attempts === 0 && b.attempts > 0) return -1;
                    if (a.attempts > 0 && b.attempts === 0) return 1;
                    
                    const dueDateA = a.settings?.dueDate;
                    const dueDateB = b.settings?.dueDate;
                    
                    if (dueDateA && dueDateB) {
                        return new Date(dueDateA).getTime() - new Date(dueDateB).getTime();
                    }
                    
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
        } catch (error) {
            console.error('Error getting student assignments:', error);
            return [];
        }
    },
    
    /**
     * Start an assignment attempt
     */
    startAttempt: (assignmentId) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            const assignments = Assignment.getAssignments();
            const assignment = assignments[assignmentId];
            
            if (!assignment) {
                return { success: false, error: 'Assignment not found' };
            }
            
            if (assignment.status !== 'active') {
                return { success: false, error: 'This assignment is no longer active' };
            }
            
            // Check if in classroom
            const classroom = typeof Classroom !== 'undefined' ? Classroom.get(assignment.classroomCode) : null;
            if (!classroom || !Array.isArray(classroom.students)) {
                return { success: false, error: 'Classroom not found' };
            }
            
            if (!classroom.students.some(s => s && s.id === user.id)) {
                return { success: false, error: 'You are not in this classroom' };
            }
            
            // Check attempts
            const submissions = Assignment.getSubmissions();
            const myAttempts = Object.values(submissions).filter(
                s => s && s.assignmentId === assignmentId && s.studentId === user.id
            );
            
            const maxAttempts = assignment.settings?.maxAttempts || 3;
            const allowRetry = assignment.settings?.allowRetry !== false;
            
            if (myAttempts.length >= maxAttempts && !allowRetry) {
                return { success: false, error: 'Maximum attempts reached' };
            }
            
            // Check due date
            const dueDate = assignment.settings?.dueDate;
            if (dueDate && new Date(dueDate) < new Date()) {
                return { success: false, error: 'This assignment is past due' };
            }
            
            // Get full questions
            if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS)) {
                return { success: false, error: 'Question bank not available' };
            }
            
            const questions = (assignment.questions || []).map(qId => {
                const q = QUESTIONS.find(question => question && question.id === qId);
                return q ? { ...q } : null;
            }).filter(q => q !== null);
            
            if (questions.length === 0) {
                return { success: false, error: 'No questions available for this assignment' };
            }
            
            // Shuffle if enabled
            let finalQuestions = questions;
            if (assignment.settings?.shuffleQuestions !== false) {
                finalQuestions = [...questions];
                for (let i = finalQuestions.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [finalQuestions[i], finalQuestions[j]] = [finalQuestions[j], finalQuestions[i]];
                }
            }
            
            return {
                success: true,
                assignment: {
                    ...assignment,
                    questionData: finalQuestions
                },
                attemptNumber: myAttempts.length + 1
            };
        } catch (error) {
            console.error('Error starting attempt:', error);
            return { success: false, error: 'An error occurred while starting the assignment' };
        }
    },
    
    /**
     * Submit assignment
     */
    submit: (assignmentId, answers, timeSpent) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            const assignments = Assignment.getAssignments();
            const assignment = assignments[assignmentId];
            
            if (!assignment) {
                return { success: false, error: 'Assignment not found' };
            }
            
            if (!Array.isArray(answers)) {
                answers = [];
            }
            
            if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS)) {
                return { success: false, error: 'Question bank not available' };
            }
            
            // Calculate score
            let correct = 0;
            const results = [];
            const questionList = assignment.questions || [];
            
            questionList.forEach((qId, index) => {
                const question = QUESTIONS.find(q => q && q.id === qId);
                if (question) {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === question.answer;
                    if (isCorrect) correct++;
                    
                    results.push({
                        questionId: qId,
                        userAnswer: userAnswer,
                        correctAnswer: question.answer,
                        isCorrect,
                        question: question.question || '',
                        explanation: question.explanation || ''
                    });
                }
            });
            
            const totalQuestions = questionList.length || 1;
            const score = Math.round((correct / totalQuestions) * 100);
            const passingScore = assignment.settings?.passingScore || 60;
            const passed = score >= passingScore;
            
            // Create submission
            const submissionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
            const showAnswers = assignment.settings?.showAnswers !== false;
            
            const submission = {
                id: submissionId,
                assignmentId,
                studentId: user.id,
                studentName: user.username || 'Student',
                answers,
                results: showAnswers ? results : null,
                correct,
                total: totalQuestions,
                score,
                passed,
                timeSpent: typeof timeSpent === 'number' ? Math.max(0, Math.floor(timeSpent)) : 0,
                submittedAt: new Date().toISOString()
            };
            
            // Save submission
            const submissions = Assignment.getSubmissions();
            submissions[submissionId] = submission;
            Assignment.saveSubmissions(submissions);
            
            // Update assignment stats
            const allSubmissions = Object.values(submissions).filter(s => s && s.assignmentId === assignmentId);
            
            if (!assignment.stats) {
                assignment.stats = { totalSubmissions: 0, avgScore: 0, highestScore: 0, completedBy: [] };
            }
            
            assignment.stats.totalSubmissions = allSubmissions.length;
            
            if (allSubmissions.length > 0) {
                const totalScore = allSubmissions.reduce((sum, s) => sum + (s.score || 0), 0);
                assignment.stats.avgScore = Math.round(totalScore / allSubmissions.length);
                assignment.stats.highestScore = Math.max(...allSubmissions.map(s => s.score || 0));
            }
            
            if (!Array.isArray(assignment.stats.completedBy)) {
                assignment.stats.completedBy = [];
            }
            
            if (!assignment.stats.completedBy.includes(user.id)) {
                assignment.stats.completedBy.push(user.id);
            }
            
            Assignment.saveAssignments(assignments);
            
            // Award XP
            const xpEarned = Math.round(10 + (score / 10));
            if (typeof AppState !== 'undefined' && typeof AppState.addXP === 'function') {
                AppState.addXP(xpEarned);
            }
            
            return {
                success: true,
                submission,
                xpEarned
            };
        } catch (error) {
            console.error('Error submitting assignment:', error);
            return { success: false, error: 'An error occurred while submitting the assignment' };
        }
    },
    
    /**
     * Get assignment by ID
     */
    get: (assignmentId) => {
        if (!assignmentId) return null;
        const assignments = Assignment.getAssignments();
        return assignments[assignmentId] || null;
    },
    
    /**
     * Get student's submission for an assignment
     */
    getStudentSubmission: (assignmentId) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user || !assignmentId) return null;
            
            const submissions = Assignment.getSubmissions();
            const studentSubmissions = Object.values(submissions)
                .filter(s => s && s.assignmentId === assignmentId && s.studentId === user.id)
                .sort((a, b) => {
                    const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
                    const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
                    return dateB - dateA;
                });
            
            return studentSubmissions[0] || null;
        } catch (error) {
            console.error('Error getting student submission:', error);
            return null;
        }
    }
};

// Initialize on load
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Assignment.init());
    } else {
        Assignment.init();
    }
}
