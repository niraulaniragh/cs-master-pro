/**
 * Classroom.js - Classroom Management System
 * Allows teachers to create classrooms and students to join them
 */

const Classroom = {
    CLASSROOMS_KEY: 'csmaster_classrooms',
    ACTIVE_GAMES_KEY: 'csmaster_active_games',
    
    // Validation constants
    MIN_CLASSROOM_NAME_LENGTH: 3,
    MAX_CLASSROOM_NAME_LENGTH: 50,
    CODE_LENGTH: 6,
    MAX_STUDENTS_PER_CLASSROOM: 100,
    GAME_EXPIRY_MS: 60 * 60 * 1000, // 1 hour
    
    /**
     * Initialize classroom system
     */
    init: () => {
        try {
            if (!localStorage.getItem(Classroom.CLASSROOMS_KEY)) {
                localStorage.setItem(Classroom.CLASSROOMS_KEY, JSON.stringify({}));
            }
            if (!localStorage.getItem(Classroom.ACTIVE_GAMES_KEY)) {
                localStorage.setItem(Classroom.ACTIVE_GAMES_KEY, JSON.stringify({}));
            }
            console.log('🏫 Classroom system initialized');
        } catch (error) {
            console.error('Failed to initialize Classroom system:', error);
        }
    },
    
    /**
     * Get all classrooms with error handling
     */
    getClassrooms: () => {
        try {
            const data = localStorage.getItem(Classroom.CLASSROOMS_KEY);
            if (!data) return {};
            const parsed = JSON.parse(data);
            return (typeof parsed === 'object' && parsed !== null) ? parsed : {};
        } catch (error) {
            console.error('Error loading classrooms:', error);
            return {};
        }
    },
    
    /**
     * Save classrooms with error handling
     */
    saveClassrooms: (classrooms) => {
        if (!classrooms || typeof classrooms !== 'object') {
            console.error('Invalid classrooms data');
            return false;
        }
        try {
            localStorage.setItem(Classroom.CLASSROOMS_KEY, JSON.stringify(classrooms));
            return true;
        } catch (error) {
            console.error('Error saving classrooms:', error);
            return false;
        }
    },
    
    /**
     * Generate unique classroom code (6 characters)
     */
    generateCode: () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars (0, O, 1, I)
        let code = '';
        for (let i = 0; i < Classroom.CODE_LENGTH; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },
    
    /**
     * Sanitize string input
     */
    sanitize: (str, maxLength = 200) => {
        if (!str || typeof str !== 'string') return '';
        return str.trim().substring(0, maxLength);
    },
    
    /**
     * Create a new classroom (teacher only)
     */
    create: (name, description = '') => {
        try {
            // Check authentication
            if (typeof Auth === 'undefined' || !Auth.isTeacher || !Auth.isTeacher()) {
                return { success: false, error: 'Only teachers can create classrooms' };
            }
            
            // Sanitize inputs
            const sanitizedName = Classroom.sanitize(name, Classroom.MAX_CLASSROOM_NAME_LENGTH);
            const sanitizedDesc = Classroom.sanitize(description, 500);
            
            if (!sanitizedName || sanitizedName.length < Classroom.MIN_CLASSROOM_NAME_LENGTH) {
                return { success: false, error: `Classroom name must be at least ${Classroom.MIN_CLASSROOM_NAME_LENGTH} characters` };
            }
            
            const user = typeof Auth.getCurrentUser === 'function' ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            const classrooms = Classroom.getClassrooms();
            
            // Generate unique code (with retry limit)
            let code;
            let attempts = 0;
            const maxAttempts = 10;
            do {
                code = Classroom.generateCode();
                attempts++;
            } while (classrooms[code] && attempts < maxAttempts);
            
            if (attempts >= maxAttempts) {
                return { success: false, error: 'Failed to generate unique code. Please try again.' };
            }
            
            const newClassroom = {
                code: code,
                name: sanitizedName,
                description: sanitizedDesc,
                teacherId: user.id,
                teacherName: user.username || 'Teacher',
                createdAt: new Date().toISOString(),
                students: [],
                settings: {
                    allowJoin: true,
                    showLeaderboard: true
                },
                stats: {
                    totalGamesPlayed: 0,
                    totalQuestionsAnswered: 0
                }
            };
            
            classrooms[code] = newClassroom;
            if (!Classroom.saveClassrooms(classrooms)) {
                return { success: false, error: 'Failed to save classroom' };
            }
            
            // Add classroom to teacher's list
            if (typeof Auth.getUsers === 'function' && typeof Auth.saveUsers === 'function') {
                const users = Auth.getUsers();
                if (users[user.email]) {
                    if (!Array.isArray(users[user.email].classrooms)) {
                        users[user.email].classrooms = [];
                    }
                    users[user.email].classrooms.push(code);
                    Auth.saveUsers(users);
                }
            }
            
            return { success: true, classroom: newClassroom };
        } catch (error) {
            console.error('Error creating classroom:', error);
            return { success: false, error: 'An error occurred while creating the classroom' };
        }
    },
    
    /**
     * Join a classroom (student only)
     */
    join: (code) => {
        try {
            if (typeof Auth === 'undefined' || !Auth.isStudent || !Auth.isStudent()) {
                return { success: false, error: 'Only students can join classrooms' };
            }
            
            const user = typeof Auth.getCurrentUser === 'function' ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            if (!code || typeof code !== 'string') {
                return { success: false, error: 'Invalid classroom code' };
            }
            
            const classrooms = Classroom.getClassrooms();
            const normalizedCode = code.toUpperCase().trim();
            const classroom = classrooms[normalizedCode];
            
            if (!classroom) {
                return { success: false, error: 'Classroom not found. Check the code and try again.' };
            }
            
            if (!classroom.settings || !classroom.settings.allowJoin) {
                return { success: false, error: 'This classroom is not accepting new students' };
            }
            
            // Ensure students array exists
            if (!Array.isArray(classroom.students)) {
                classroom.students = [];
            }
            
            // Check if already joined
            if (classroom.students.some(s => s && s.id === user.id)) {
                return { success: false, error: 'You are already in this classroom' };
            }
            
            // Check max students
            if (classroom.students.length >= Classroom.MAX_STUDENTS_PER_CLASSROOM) {
                return { success: false, error: 'This classroom is full' };
            }
            
            // Add student to classroom
            classroom.students.push({
                id: user.id,
                username: user.username || 'Student',
                joinedAt: new Date().toISOString(),
                stats: {
                    gamesPlayed: 0,
                    correctAnswers: 0,
                    totalAnswers: 0
                }
            });
            
            if (!Classroom.saveClassrooms(classrooms)) {
                return { success: false, error: 'Failed to join classroom' };
            }
            
            // Add classroom to student's list
            if (typeof Auth.getUsers === 'function' && typeof Auth.saveUsers === 'function') {
                const users = Auth.getUsers();
                if (users[user.email]) {
                    if (!Array.isArray(users[user.email].joinedClassrooms)) {
                        users[user.email].joinedClassrooms = [];
                    }
                    if (!users[user.email].joinedClassrooms.includes(normalizedCode)) {
                        users[user.email].joinedClassrooms.push(normalizedCode);
                        Auth.saveUsers(users);
                    }
                }
            }
            
            return { success: true, classroom };
        } catch (error) {
            console.error('Error joining classroom:', error);
            return { success: false, error: 'An error occurred while joining the classroom' };
        }
    },
    
    /**
     * Leave a classroom (student only)
     */
    leave: (code) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            if (!code || typeof code !== 'string') {
                return { success: false, error: 'Invalid classroom code' };
            }
            
            const classrooms = Classroom.getClassrooms();
            const classroom = classrooms[code];
            
            if (!classroom) {
                return { success: false, error: 'Classroom not found' };
            }
            
            // Remove student from classroom
            if (Array.isArray(classroom.students)) {
                classroom.students = classroom.students.filter(s => s && s.id !== user.id);
            }
            
            if (!Classroom.saveClassrooms(classrooms)) {
                return { success: false, error: 'Failed to leave classroom' };
            }
            
            // Remove from student's list
            if (typeof Auth.getUsers === 'function' && typeof Auth.saveUsers === 'function') {
                const users = Auth.getUsers();
                if (users[user.email] && Array.isArray(users[user.email].joinedClassrooms)) {
                    users[user.email].joinedClassrooms = users[user.email].joinedClassrooms.filter(c => c !== code);
                    Auth.saveUsers(users);
                }
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error leaving classroom:', error);
            return { success: false, error: 'An error occurred while leaving the classroom' };
        }
    },
    
    /**
     * Delete a classroom (teacher only)
     */
    delete: (code) => {
        try {
            if (typeof Auth === 'undefined' || !Auth.isTeacher || !Auth.isTeacher()) {
                return { success: false, error: 'Only teachers can delete classrooms' };
            }
            
            const user = typeof Auth.getCurrentUser === 'function' ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            const classrooms = Classroom.getClassrooms();
            const classroom = classrooms[code];
            
            if (!classroom) {
                return { success: false, error: 'Classroom not found' };
            }
            
            if (classroom.teacherId !== user.id) {
                return { success: false, error: 'You can only delete your own classrooms' };
            }
            
            // Remove classroom from all students
            if (typeof Auth.getUsers === 'function' && typeof Auth.saveUsers === 'function') {
                const users = Auth.getUsers();
                
                if (Array.isArray(classroom.students)) {
                    classroom.students.forEach(student => {
                        if (!student || !student.id) return;
                        const studentUser = Object.values(users).find(u => u && u.id === student.id);
                        if (studentUser && Array.isArray(studentUser.joinedClassrooms)) {
                            studentUser.joinedClassrooms = studentUser.joinedClassrooms.filter(c => c !== code);
                        }
                    });
                }
                
                // Remove from teacher's list
                if (users[user.email] && Array.isArray(users[user.email].classrooms)) {
                    users[user.email].classrooms = users[user.email].classrooms.filter(c => c !== code);
                }
                
                Auth.saveUsers(users);
            }
            
            // Delete classroom
            delete classrooms[code];
            Classroom.saveClassrooms(classrooms);
            
            return { success: true };
        } catch (error) {
            console.error('Error deleting classroom:', error);
            return { success: false, error: 'An error occurred while deleting the classroom' };
        }
    },
    
    /**
     * Get classroom by code
     */
    get: (code) => {
        if (!code || typeof code !== 'string') return null;
        const classrooms = Classroom.getClassrooms();
        return classrooms[code] || null;
    },
    
    /**
     * Get teacher's classrooms
     */
    getTeacherClassrooms: () => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user || (typeof Auth.isTeacher === 'function' && !Auth.isTeacher())) {
                return [];
            }
            
            const classrooms = Classroom.getClassrooms();
            return Object.values(classrooms).filter(c => c && c.teacherId === user.id);
        } catch (error) {
            console.error('Error getting teacher classrooms:', error);
            return [];
        }
    },
    
    /**
     * Get student's joined classrooms
     */
    getStudentClassrooms: () => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user || (typeof Auth.isStudent === 'function' && !Auth.isStudent())) {
                return [];
            }
            
            const classrooms = Classroom.getClassrooms();
            return Object.values(classrooms).filter(c => 
                c && Array.isArray(c.students) && c.students.some(s => s && s.id === user.id)
            );
        } catch (error) {
            console.error('Error getting student classrooms:', error);
            return [];
        }
    },
    
    /**
     * Update classroom settings (teacher only)
     */
    updateSettings: (code, settings) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            const classrooms = Classroom.getClassrooms();
            const classroom = classrooms[code];
            
            if (!classroom || classroom.teacherId !== user.id) {
                return { success: false, error: 'Classroom not found or unauthorized' };
            }
            
            if (settings && typeof settings === 'object') {
                classroom.settings = { ...(classroom.settings || {}), ...settings };
                Classroom.saveClassrooms(classrooms);
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error updating classroom settings:', error);
            return { success: false, error: 'An error occurred' };
        }
    },
    
    /**
     * Remove student from classroom (teacher only)
     */
    removeStudent: (code, studentId) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            const classrooms = Classroom.getClassrooms();
            const classroom = classrooms[code];
            
            if (!classroom || classroom.teacherId !== user.id) {
                return { success: false, error: 'Classroom not found or unauthorized' };
            }
            
            if (Array.isArray(classroom.students)) {
                classroom.students = classroom.students.filter(s => s && s.id !== studentId);
            }
            
            Classroom.saveClassrooms(classrooms);
            
            // Remove from student's joined list
            if (typeof Auth.getUsers === 'function' && typeof Auth.saveUsers === 'function') {
                const users = Auth.getUsers();
                const studentUser = Object.values(users).find(u => u && u.id === studentId);
                if (studentUser && Array.isArray(studentUser.joinedClassrooms)) {
                    studentUser.joinedClassrooms = studentUser.joinedClassrooms.filter(c => c !== code);
                    Auth.saveUsers(users);
                }
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error removing student:', error);
            return { success: false, error: 'An error occurred' };
        }
    },
    
    // ==================== GAME HOSTING ====================
    
    /**
     * Get active games with error handling
     */
    getActiveGames: () => {
        try {
            const data = localStorage.getItem(Classroom.ACTIVE_GAMES_KEY);
            if (!data) return {};
            const parsed = JSON.parse(data);
            return (typeof parsed === 'object' && parsed !== null) ? parsed : {};
        } catch (error) {
            console.error('Error loading active games:', error);
            return {};
        }
    },
    
    /**
     * Save active games
     */
    saveActiveGames: (games) => {
        if (!games || typeof games !== 'object') return false;
        try {
            localStorage.setItem(Classroom.ACTIVE_GAMES_KEY, JSON.stringify(games));
            return true;
        } catch (error) {
            console.error('Error saving active games:', error);
            return false;
        }
    },
    
    /**
     * Host a game in classroom (teacher only)
     */
    hostGame: (classroomCode, gameType, settings = {}) => {
        try {
            if (typeof Auth === 'undefined' || !Auth.isTeacher || !Auth.isTeacher()) {
                return { success: false, error: 'Only teachers can host games' };
            }
            
            const classroom = Classroom.get(classroomCode);
            const user = typeof Auth.getCurrentUser === 'function' ? Auth.getCurrentUser() : null;
            
            if (!classroom || !user || classroom.teacherId !== user.id) {
                return { success: false, error: 'Classroom not found or unauthorized' };
            }
            
            const gameId = Date.now().toString(36) + Math.random().toString(36).substring(2);
            const joinCode = Classroom.generateCode();
            
            const game = {
                id: gameId,
                joinCode: joinCode,
                classroomCode: classroomCode,
                classroomName: classroom.name || 'Classroom',
                gameType: gameType || 'race',
                hostId: user.id,
                hostName: user.username || 'Teacher',
                status: 'waiting',
                createdAt: new Date().toISOString(),
                settings: {
                    topic: settings.topic || 'all',
                    difficulty: settings.difficulty || 'mixed',
                    questionCount: Math.min(Math.max(settings.questionCount || 10, 1), 50),
                    ...(settings || {})
                },
                players: [],
                results: []
            };
            
            const games = Classroom.getActiveGames();
            games[gameId] = game;
            Classroom.saveActiveGames(games);
            
            return { success: true, game };
        } catch (error) {
            console.error('Error hosting game:', error);
            return { success: false, error: 'An error occurred while hosting the game' };
        }
    },
    
    /**
     * Join a hosted game
     */
    joinGame: (gameId) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false, error: 'Not logged in' };
            }
            
            const games = Classroom.getActiveGames();
            const game = games[gameId];
            
            if (!game) {
                return { success: false, error: 'Game not found' };
            }
            
            if (game.status !== 'waiting') {
                return { success: false, error: 'Game has already started' };
            }
            
            // Check if in classroom
            const classroom = Classroom.get(game.classroomCode);
            if (!classroom) {
                return { success: false, error: 'Classroom not found' };
            }
            
            const isTeacher = classroom.teacherId === user.id;
            const isStudent = Array.isArray(classroom.students) && classroom.students.some(s => s && s.id === user.id);
            
            if (!isTeacher && !isStudent) {
                return { success: false, error: 'You are not in this classroom' };
            }
            
            // Ensure players array exists
            if (!Array.isArray(game.players)) {
                game.players = [];
            }
            
            // Check if already joined
            if (game.players.some(p => p && p.id === user.id)) {
                return { success: true, game }; // Already joined
            }
            
            game.players.push({
                id: user.id,
                username: user.username || 'Player',
                ready: false,
                position: 0,
                score: 0,
                correctAnswers: 0,
                wrongAnswers: 0,
                powerups: []
            });
            
            Classroom.saveActiveGames(games);
            
            return { success: true, game };
        } catch (error) {
            console.error('Error joining game:', error);
            return { success: false, error: 'An error occurred while joining the game' };
        }
    },
    
    /**
     * Start a hosted game (teacher only)
     */
    startGame: (gameId) => {
        try {
            if (typeof Auth === 'undefined' || !Auth.isTeacher || !Auth.isTeacher()) {
                return { success: false, error: 'Only teachers can start games' };
            }
            
            const user = typeof Auth.getCurrentUser === 'function' ? Auth.getCurrentUser() : null;
            const games = Classroom.getActiveGames();
            const game = games[gameId];
            
            if (!game || game.hostId !== user.id) {
                return { success: false, error: 'Game not found or unauthorized' };
            }
            
            const playerCount = Array.isArray(game.players) ? game.players.length : 0;
            if (playerCount < 1) {
                return { success: false, error: 'Need at least 1 player to start' };
            }
            
            game.status = 'playing';
            game.startedAt = new Date().toISOString();
            
            Classroom.saveActiveGames(games);
            
            return { success: true, game };
        } catch (error) {
            console.error('Error starting game:', error);
            return { success: false, error: 'An error occurred while starting the game' };
        }
    },
    
    /**
     * Update player state in game
     */
    updatePlayer: (gameId, updates) => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) {
                return { success: false };
            }
            
            const games = Classroom.getActiveGames();
            const game = games[gameId];
            
            if (!game || !Array.isArray(game.players)) {
                return { success: false };
            }
            
            const player = game.players.find(p => p && p.id === user.id);
            if (player && updates && typeof updates === 'object') {
                Object.assign(player, updates);
                Classroom.saveActiveGames(games);
            }
            
            return { success: true, game };
        } catch (error) {
            console.error('Error updating player:', error);
            return { success: false };
        }
    },
    
    /**
     * End a game
     */
    endGame: (gameId) => {
        try {
            const games = Classroom.getActiveGames();
            const game = games[gameId];
            
            if (!game) {
                return { success: false };
            }
            
            game.status = 'finished';
            game.endedAt = new Date().toISOString();
            
            // Sort players by score/position
            if (Array.isArray(game.players)) {
                game.results = [...game.players].sort((a, b) => {
                    if (game.gameType === 'race') {
                        return (b.position || 0) - (a.position || 0) || (b.score || 0) - (a.score || 0);
                    }
                    return (b.score || 0) - (a.score || 0);
                });
            } else {
                game.results = [];
            }
            
            Classroom.saveActiveGames(games);
            
            // Update classroom stats
            const classrooms = Classroom.getClassrooms();
            const classroom = classrooms[game.classroomCode];
            if (classroom) {
                if (!classroom.stats) classroom.stats = {};
                classroom.stats.totalGamesPlayed = (classroom.stats.totalGamesPlayed || 0) + 1;
                Classroom.saveClassrooms(classrooms);
            }
            
            return { success: true, game };
        } catch (error) {
            console.error('Error ending game:', error);
            return { success: false };
        }
    },
    
    /**
     * Get game by ID
     */
    getGame: (gameId) => {
        if (!gameId) return null;
        const games = Classroom.getActiveGames();
        return games[gameId] || null;
    },
    
    /**
     * Find game by join code
     */
    findGameByCode: (code) => {
        if (!code || typeof code !== 'string') return null;
        
        const games = Classroom.getActiveGames();
        const normalizedCode = code.toUpperCase().trim();
        
        return Object.values(games).find(g => 
            g && g.joinCode === normalizedCode && 
            (g.status === 'waiting' || g.status === 'playing')
        ) || null;
    },
    
    /**
     * Get available games for student's classrooms
     */
    getAvailableGames: () => {
        try {
            const user = typeof Auth !== 'undefined' && typeof Auth.getCurrentUser === 'function' 
                ? Auth.getCurrentUser() : null;
            if (!user) return [];
            
            const games = Classroom.getActiveGames();
            const isTeacher = typeof Auth.isTeacher === 'function' && Auth.isTeacher();
            
            const myClassroomCodes = isTeacher 
                ? Classroom.getTeacherClassrooms().map(c => c.code)
                : Classroom.getStudentClassrooms().map(c => c.code);
            
            return Object.values(games).filter(g => 
                g && myClassroomCodes.includes(g.classroomCode) && 
                (g.status === 'waiting' || g.status === 'playing')
            );
        } catch (error) {
            console.error('Error getting available games:', error);
            return [];
        }
    },
    
    /**
     * Clean up old games
     */
    cleanupGames: () => {
        try {
            const games = Classroom.getActiveGames();
            const cutoffTime = Date.now() - Classroom.GAME_EXPIRY_MS;
            
            let cleaned = 0;
            Object.keys(games).forEach(id => {
                const game = games[id];
                if (game && game.createdAt) {
                    const createdTime = new Date(game.createdAt).getTime();
                    if (!isNaN(createdTime) && createdTime < cutoffTime) {
                        delete games[id];
                        cleaned++;
                    }
                }
            });
            
            if (cleaned > 0) {
                Classroom.saveActiveGames(games);
                console.log(`🧹 Cleaned up ${cleaned} old games`);
            }
        } catch (error) {
            console.error('Error cleaning up games:', error);
        }
    }
};

// Initialize on load
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Classroom.init());
    } else {
        Classroom.init();
    }
}
