/**
 * Assignment.js - Assignment System
 * Teachers can create assignments, students can complete them
 */

const Assignment = {
    ASSIGNMENTS_KEY: 'csmaster_assignments',
    SUBMISSIONS_KEY: 'csmaster_submissions',
    
    init: () => {
        if (!localStorage.getItem(Assignment.ASSIGNMENTS_KEY)) {
            localStorage.setItem(Assignment.ASSIGNMENTS_KEY, JSON.stringify({}));
        }
        if (!localStorage.getItem(Assignment.SUBMISSIONS_KEY)) {
            localStorage.setItem(Assignment.SUBMISSIONS_KEY, JSON.stringify({}));
        }
        console.log('📝 Assignment system initialized');
    },
    
    // ==================== STORAGE ====================
    
    getAssignments: () => {
        try {
            return JSON.parse(localStorage.getItem(Assignment.ASSIGNMENTS_KEY)) || {};
        } catch {
            return {};
        }
    },
    
    saveAssignments: (assignments) => {
        localStorage.setItem(Assignment.ASSIGNMENTS_KEY, JSON.stringify(assignments));
    },
    
    getSubmissions: () => {
        try {
            return JSON.parse(localStorage.getItem(Assignment.SUBMISSIONS_KEY)) || {};
        } catch {
            return {};
        }
    },
    
    saveSubmissions: (submissions) => {
        localStorage.setItem(Assignment.SUBMISSIONS_KEY, JSON.stringify(submissions));
    },
    
    // ==================== TEACHER FUNCTIONS ====================
    
    /**
     * Create a new assignment
     */
    create: (classroomCode, data) => {
        if (!Auth.isTeacher()) {
            return { success: false, error: 'Only teachers can create assignments' };
        }
        
        const classroom = Classroom.get(classroomCode);
        const user = Auth.getCurrentUser();
        
        if (!classroom || classroom.teacherId !== user.id) {
            return { success: false, error: 'Classroom not found or unauthorized' };
        }
        
        if (!data.title || data.title.length < 3) {
            return { success: false, error: 'Title must be at least 3 characters' };
        }
        
        const assignmentId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        
        const assignment = {
            id: assignmentId,
            classroomCode: classroomCode,
            classroomName: classroom.name,
            teacherId: user.id,
            teacherName: user.username,
            title: data.title.trim(),
            description: data.description || '',
            type: data.type || 'quiz', // 'quiz', 'topic-practice', 'custom'
            settings: {
                topic: data.topic || 'all',
                questionCount: data.questionCount || 10,
                timeLimit: data.timeLimit || 0, // 0 = no limit, in minutes
                passingScore: data.passingScore || 60, // percentage
                allowRetry: data.allowRetry !== false,
                maxAttempts: data.maxAttempts || 3,
                showAnswers: data.showAnswers !== false, // show correct answers after submission
                shuffleQuestions: data.shuffleQuestions !== false,
                dueDate: data.dueDate || null
            },
            questions: data.questions || [], // For custom assignments
            status: 'active', // 'active', 'closed', 'draft'
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
        Assignment.saveAssignments(assignments);
        
        return { success: true, assignment };
    },
    
    /**
     * Generate questions for assignment
     */
    generateQuestions: (settings) => {
        let pool = [...QUESTIONS];
        
        // Filter by topic
        if (settings.topic && settings.topic !== 'all') {
            pool = pool.filter(q => q.topic === settings.topic);
        }
        
        // Shuffle
        if (settings.shuffleQuestions) {
            pool = Helpers.shuffle(pool);
        }
        
        // Take required number
        return pool.slice(0, settings.questionCount).map(q => q.id);
    },
    
    /**
     * Update assignment
     */
    update: (assignmentId, updates) => {
        if (!Auth.isTeacher()) {
            return { success: false, error: 'Unauthorized' };
        }
        
        const assignments = Assignment.getAssignments();
        const assignment = assignments[assignmentId];
        
        if (!assignment) {
            return { success: false, error: 'Assignment not found' };
        }
        
        const user = Auth.getCurrentUser();
        if (assignment.teacherId !== user.id) {
            return { success: false, error: 'You can only edit your own assignments' };
        }
        
        // Update allowed fields
        if (updates.title) assignment.title = updates.title;
        if (updates.description !== undefined) assignment.description = updates.description;
        if (updates.settings) assignment.settings = { ...assignment.settings, ...updates.settings };
        if (updates.status) assignment.status = updates.status;
        
        Assignment.saveAssignments(assignments);
        return { success: true, assignment };
    },
    
    /**
     * Delete assignment
     */
    delete: (assignmentId) => {
        if (!Auth.isTeacher()) {
            return { success: false, error: 'Unauthorized' };
        }
        
        const assignments = Assignment.getAssignments();
        const assignment = assignments[assignmentId];
        
        if (!assignment) {
            return { success: false, error: 'Assignment not found' };
        }
        
        const user = Auth.getCurrentUser();
        if (assignment.teacherId !== user.id) {
            return { success: false, error: 'You can only delete your own assignments' };
        }
        
        delete assignments[assignmentId];
        Assignment.saveAssignments(assignments);
        
        // Also delete related submissions
        const submissions = Assignment.getSubmissions();
        Object.keys(submissions).forEach(key => {
            if (submissions[key].assignmentId === assignmentId) {
                delete submissions[key];
            }
        });
        Assignment.saveSubmissions(submissions);
        
        return { success: true };
    },
    
    /**
     * Get teacher's assignments
     */
    getTeacherAssignments: (classroomCode = null) => {
        const user = Auth.getCurrentUser();
        if (!user || !Auth.isTeacher()) return [];
        
        const assignments = Assignment.getAssignments();
        let result = Object.values(assignments).filter(a => a.teacherId === user.id);
        
        if (classroomCode) {
            result = result.filter(a => a.classroomCode === classroomCode);
        }
        
        // Sort by creation date (newest first)
        return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    /**
     * Get submissions for an assignment
     */
    getAssignmentSubmissions: (assignmentId) => {
        const submissions = Assignment.getSubmissions();
        return Object.values(submissions)
            .filter(s => s.assignmentId === assignmentId)
            .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    },
    
    // ==================== STUDENT FUNCTIONS ====================
    
    /**
     * Get assignments for student's classrooms
     */
    getStudentAssignments: () => {
        const user = Auth.getCurrentUser();
        if (!user) return [];
        
        const myClassrooms = Classroom.getStudentClassrooms().map(c => c.code);
        const assignments = Assignment.getAssignments();
        const submissions = Assignment.getSubmissions();
        
        return Object.values(assignments)
            .filter(a => myClassrooms.includes(a.classroomCode) && a.status === 'active')
            .map(a => {
                // Check if student has submitted
                const mySubmissions = Object.values(submissions).filter(
                    s => s.assignmentId === a.id && s.studentId === user.id
                );
                
                return {
                    ...a,
                    mySubmissions,
                    attempts: mySubmissions.length,
                    bestScore: mySubmissions.length > 0 
                        ? Math.max(...mySubmissions.map(s => s.score))
                        : null,
                    lastSubmission: mySubmissions.length > 0
                        ? mySubmissions[0]
                        : null,
                    canAttempt: mySubmissions.length < a.settings.maxAttempts || a.settings.allowRetry
                };
            })
            .sort((a, b) => {
                // Sort: incomplete first, then by due date
                if (a.attempts === 0 && b.attempts > 0) return -1;
                if (a.attempts > 0 && b.attempts === 0) return 1;
                if (a.settings.dueDate && b.settings.dueDate) {
                    return new Date(a.settings.dueDate) - new Date(b.settings.dueDate);
                }
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
    },
    
    /**
     * Start an assignment attempt
     */
    startAttempt: (assignmentId) => {
        const user = Auth.getCurrentUser();
        if (!user) return { success: false, error: 'Not logged in' };
        
        const assignments = Assignment.getAssignments();
        const assignment = assignments[assignmentId];
        
        if (!assignment) {
            return { success: false, error: 'Assignment not found' };
        }
        
        if (assignment.status !== 'active') {
            return { success: false, error: 'This assignment is no longer active' };
        }
        
        // Check if in classroom
        const classroom = Classroom.get(assignment.classroomCode);
        if (!classroom.students.some(s => s.id === user.id)) {
            return { success: false, error: 'You are not in this classroom' };
        }
        
        // Check attempts
        const submissions = Assignment.getSubmissions();
        const myAttempts = Object.values(submissions).filter(
            s => s.assignmentId === assignmentId && s.studentId === user.id
        );
        
        if (myAttempts.length >= assignment.settings.maxAttempts && !assignment.settings.allowRetry) {
            return { success: false, error: 'Maximum attempts reached' };
        }
        
        // Check due date
        if (assignment.settings.dueDate && new Date(assignment.settings.dueDate) < new Date()) {
            return { success: false, error: 'This assignment is past due' };
        }
        
        // Get full questions
        const questions = assignment.questions.map(qId => {
            const q = QUESTIONS.find(question => question.id === qId);
            return q ? { ...q } : null;
        }).filter(q => q !== null);
        
        // Shuffle if enabled
        const finalQuestions = assignment.settings.shuffleQuestions 
            ? Helpers.shuffle(questions)
            : questions;
        
        return {
            success: true,
            assignment: {
                ...assignment,
                questionData: finalQuestions
            },
            attemptNumber: myAttempts.length + 1
        };
    },
    
    /**
     * Submit assignment
     */
    submit: (assignmentId, answers, timeSpent) => {
        const user = Auth.getCurrentUser();
        if (!user) return { success: false, error: 'Not logged in' };
        
        const assignments = Assignment.getAssignments();
        const assignment = assignments[assignmentId];
        
        if (!assignment) {
            return { success: false, error: 'Assignment not found' };
        }
        
        // Calculate score
        let correct = 0;
        const results = [];
        
        assignment.questions.forEach((qId, index) => {
            const question = QUESTIONS.find(q => q.id === qId);
            if (question) {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.answer;
                if (isCorrect) correct++;
                
                results.push({
                    questionId: qId,
                    userAnswer,
                    correctAnswer: question.answer,
                    isCorrect,
                    question: question.question,
                    explanation: question.explanation
                });
            }
        });
        
        const score = Math.round((correct / assignment.questions.length) * 100);
        const passed = score >= assignment.settings.passingScore;
        
        // Create submission
        const submissionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const submission = {
            id: submissionId,
            assignmentId,
            studentId: user.id,
            studentName: user.username,
            answers,
            results: assignment.settings.showAnswers ? results : null,
            correct,
            total: assignment.questions.length,
            score,
            passed,
            timeSpent, // in seconds
            submittedAt: new Date().toISOString()
        };
        
        // Save submission
        const submissions = Assignment.getSubmissions();
        submissions[submissionId] = submission;
        Assignment.saveSubmissions(submissions);
        
        // Update assignment stats
        const allSubmissions = Object.values(submissions).filter(s => s.assignmentId === assignmentId);
        assignment.stats.totalSubmissions = allSubmissions.length;
        assignment.stats.avgScore = Math.round(
            allSubmissions.reduce((sum, s) => sum + s.score, 0) / allSubmissions.length
        );
        assignment.stats.highestScore = Math.max(...allSubmissions.map(s => s.score));
        
        if (!assignment.stats.completedBy.includes(user.id)) {
            assignment.stats.completedBy.push(user.id);
        }
        
        Assignment.saveAssignments(assignments);
        
        // Award XP
        const xpEarned = Math.round(10 + (score / 10));
        AppState.addXP(xpEarned, 'assignment');
        
        return {
            success: true,
            submission,
            xpEarned
        };
    },
    
    /**
     * Get assignment by ID
     */
    get: (assignmentId) => {
        const assignments = Assignment.getAssignments();
        return assignments[assignmentId] || null;
    }
};

// Initialize
Assignment.init();
