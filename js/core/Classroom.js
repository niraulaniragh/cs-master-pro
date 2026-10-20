/**
 * Classroom.js - Classroom Management System
 * Allows teachers to create classrooms and students to join them
 */

const Classroom = {
    CLASSROOMS_KEY: 'csmaster_classrooms',
    ACTIVE_GAMES_KEY: 'csmaster_active_games',
    
    /**
     * Initialize classroom system
     */
    init: () => {
        if (!localStorage.getItem(Classroom.CLASSROOMS_KEY)) {
            localStorage.setItem(Classroom.CLASSROOMS_KEY, JSON.stringify({}));
        }
        if (!localStorage.getItem(Classroom.ACTIVE_GAMES_KEY)) {
            localStorage.setItem(Classroom.ACTIVE_GAMES_KEY, JSON.stringify({}));
        }
        console.log('🏫 Classroom system initialized');
    },
    
    /**
     * Get all classrooms
     */
    getClassrooms: () => {
        try {
            return JSON.parse(localStorage.getItem(Classroom.CLASSROOMS_KEY)) || {};
        } catch {
            return {};
        }
    },
    
    /**
     * Save classrooms
     */
    saveClassrooms: (classrooms) => {
        localStorage.setItem(Classroom.CLASSROOMS_KEY, JSON.stringify(classrooms));
    },
    
    /**
     * Generate unique classroom code (6 characters)
     */
    generateCode: () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars (0, O, 1, I)
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },
    
    /**
     * Create a new classroom (teacher only)
     */
    create: (name, description = '') => {
        if (!Auth.isTeacher()) {
            return { success: false, error: 'Only teachers can create classrooms' };
        }
        
        if (!name || name.length < 3) {
            return { success: false, error: 'Classroom name must be at least 3 characters' };
        }
        
        const user = Auth.getCurrentUser();
        if (!user) {
            return { success: false, error: 'Not logged in' };
        }
        
        const classrooms = Classroom.getClassrooms();
        
        // Generate unique code
        let code;
        do {
            code = Classroom.generateCode();
        } while (classrooms[code]);
        
        const newClassroom = {
            code: code,
            name: name.trim(),
            description: description.trim(),
            teacherId: user.id,
            teacherName: user.username,
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
        Classroom.saveClassrooms(classrooms);
        
        // Add classroom to teacher's list
        const users = Auth.getUsers();
        if (users[user.email]) {
            if (!users[user.email].classrooms) {
                users[user.email].classrooms = [];
            }
            users[user.email].classrooms.push(code);
            Auth.saveUsers(users);
        }
        
        return { success: true, classroom: newClassroom };
    },
    
    /**
     * Join a classroom (student only)
     */
    join: (code) => {
        if (!Auth.isStudent()) {
            return { success: false, error: 'Only students can join classrooms' };
        }
        
        const user = Auth.getCurrentUser();
        if (!user) {
            return { success: false, error: 'Not logged in' };
        }
        
        const classrooms = Classroom.getClassrooms();
        const normalizedCode = code.toUpperCase().trim();
        const classroom = classrooms[normalizedCode];
        
        if (!classroom) {
            return { success: false, error: 'Classroom not found. Check the code and try again.' };
        }
        
        if (!classroom.settings.allowJoin) {
            return { success: false, error: 'This classroom is not accepting new students' };
        }
        
        // Check if already joined
        if (classroom.students.some(s => s.id === user.id)) {
            return { success: false, error: 'You are already in this classroom' };
        }
        
        // Add student to classroom
        classroom.students.push({
            id: user.id,
            username: user.username,
            joinedAt: new Date().toISOString(),
            stats: {
                gamesPlayed: 0,
                correctAnswers: 0,
                totalAnswers: 0
            }
        });
        
        Classroom.saveClassrooms(classrooms);
        
        // Add classroom to student's list
        const users = Auth.getUsers();
        if (users[user.email]) {
            if (!users[user.email].joinedClassrooms) {
                users[user.email].joinedClassrooms = [];
            }
            users[user.email].joinedClassrooms.push(normalizedCode);
            Auth.saveUsers(users);
        }
        
        return { success: true, classroom };
    },
    
    /**
     * Leave a classroom (student only)
     */
    leave: (code) => {
        const user = Auth.getCurrentUser();
        if (!user) {
            return { success: false, error: 'Not logged in' };
        }
        
        const classrooms = Classroom.getClassrooms();
        const classroom = classrooms[code];
        
        if (!classroom) {
            return { success: false, error: 'Classroom not found' };
        }
        
        // Remove student from classroom
        classroom.students = classroom.students.filter(s => s.id !== user.id);
        Classroom.saveClassrooms(classrooms);
        
        // Remove from student's list
        const users = Auth.getUsers();
        if (users[user.email] && users[user.email].joinedClassrooms) {
            users[user.email].joinedClassrooms = users[user.email].joinedClassrooms.filter(c => c !== code);
            Auth.saveUsers(users);
        }
        
        return { success: true };
    },
    
    /**
     * Delete a classroom (teacher only)
     */
    delete: (code) => {
        if (!Auth.isTeacher()) {
            return { success: false, error: 'Only teachers can delete classrooms' };
        }
        
        const user = Auth.getCurrentUser();
        const classrooms = Classroom.getClassrooms();
        const classroom = classrooms[code];
        
        if (!classroom) {
            return { success: false, error: 'Classroom not found' };
        }
        
        if (classroom.teacherId !== user.id) {
            return { success: false, error: 'You can only delete your own classrooms' };
        }
        
        // Remove classroom from all students
        const users = Auth.getUsers();
        classroom.students.forEach(student => {
            const studentUser = Object.values(users).find(u => u.id === student.id);
            if (studentUser && studentUser.joinedClassrooms) {
                studentUser.joinedClassrooms = studentUser.joinedClassrooms.filter(c => c !== code);
            }
        });
        
        // Remove from teacher's list
        if (users[user.email] && users[user.email].classrooms) {
            users[user.email].classrooms = users[user.email].classrooms.filter(c => c !== code);
        }
        
        Auth.saveUsers(users);
        
        // Delete classroom
        delete classrooms[code];
        Classroom.saveClassrooms(classrooms);
        
        return { success: true };
    },
    
    /**
     * Get classroom by code
     */
    get: (code) => {
        const classrooms = Classroom.getClassrooms();
        return classrooms[code] || null;
    },
    
    /**
     * Get teacher's classrooms
     */
    getTeacherClassrooms: () => {
        const user = Auth.getCurrentUser();
        if (!user || !Auth.isTeacher()) return [];
        
        const classrooms = Classroom.getClassrooms();
        return Object.values(classrooms).filter(c => c.teacherId === user.id);
    },
    
    /**
     * Get student's joined classrooms
     */
    getStudentClassrooms: () => {
        const user = Auth.getCurrentUser();
        if (!user || !Auth.isStudent()) return [];
        
        const classrooms = Classroom.getClassrooms();
        return Object.values(classrooms).filter(c => 
            c.students.some(s => s.id === user.id)
        );
    },
    
    /**
     * Update classroom settings (teacher only)
     */
    updateSettings: (code, settings) => {
        const user = Auth.getCurrentUser();
        const classrooms = Classroom.getClassrooms();
        const classroom = classrooms[code];
        
        if (!classroom || classroom.teacherId !== user.id) {
            return { success: false, error: 'Classroom not found or unauthorized' };
        }
        
        classroom.settings = { ...classroom.settings, ...settings };
        Classroom.saveClassrooms(classrooms);
        
        return { success: true };
    },
    
    /**
     * Remove student from classroom (teacher only)
     */
    removeStudent: (code, studentId) => {
        const user = Auth.getCurrentUser();
        const classrooms = Classroom.getClassrooms();
        const classroom = classrooms[code];
        
        if (!classroom || classroom.teacherId !== user.id) {
            return { success: false, error: 'Classroom not found or unauthorized' };
        }
        
        classroom.students = classroom.students.filter(s => s.id !== studentId);
        Classroom.saveClassrooms(classrooms);
        
        // Remove from student's joined list
        const users = Auth.getUsers();
        const studentUser = Object.values(users).find(u => u.id === studentId);
        if (studentUser && studentUser.joinedClassrooms) {
            studentUser.joinedClassrooms = studentUser.joinedClassrooms.filter(c => c !== code);
            Auth.saveUsers(users);
        }
        
        return { success: true };
    },
    
    // ==================== GAME HOSTING ====================
    
    /**
     * Get active games
     */
    getActiveGames: () => {
        try {
            return JSON.parse(localStorage.getItem(Classroom.ACTIVE_GAMES_KEY)) || {};
        } catch {
            return {};
        }
    },
    
    /**
     * Save active games
     */
    saveActiveGames: (games) => {
        localStorage.setItem(Classroom.ACTIVE_GAMES_KEY, JSON.stringify(games));
    },
    
    /**
     * Host a game in classroom (teacher only)
     */
    hostGame: (classroomCode, gameType, settings = {}) => {
        if (!Auth.isTeacher()) {
            return { success: false, error: 'Only teachers can host games' };
        }
        
        const classroom = Classroom.get(classroomCode);
        const user = Auth.getCurrentUser();
        
        if (!classroom || classroom.teacherId !== user.id) {
            return { success: false, error: 'Classroom not found or unauthorized' };
        }
        
        const gameId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const joinCode = Classroom.generateCode(); // 6-character code for students to join
        
        const game = {
            id: gameId,
            joinCode: joinCode, // Code students use to join
            classroomCode: classroomCode,
            classroomName: classroom.name,
            gameType: gameType, // 'race', 'crypto', 'tower', 'factory', 'gold'
            hostId: user.id,
            hostName: user.username,
            status: 'waiting', // 'waiting', 'playing', 'finished'
            createdAt: new Date().toISOString(),
            settings: {
                topic: settings.topic || 'all',
                difficulty: settings.difficulty || 'mixed',
                questionCount: settings.questionCount || 10,
                ...settings
            },
            players: [],
            results: []
        };
        
        const games = Classroom.getActiveGames();
        games[gameId] = game;
        Classroom.saveActiveGames(games);
        
        return { success: true, game };
    },
    
    /**
     * Join a hosted game (student only)
     */
    joinGame: (gameId) => {
        const user = Auth.getCurrentUser();
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
        if (!classroom.students.some(s => s.id === user.id) && classroom.teacherId !== user.id) {
            return { success: false, error: 'You are not in this classroom' };
        }
        
        // Check if already joined
        if (game.players.some(p => p.id === user.id)) {
            return { success: true, game }; // Already joined, return success
        }
        
        game.players.push({
            id: user.id,
            username: user.username,
            ready: false,
            position: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            powerups: []
        });
        
        Classroom.saveActiveGames(games);
        
        return { success: true, game };
    },
    
    /**
     * Start a hosted game (teacher only)
     */
    startGame: (gameId) => {
        if (!Auth.isTeacher()) {
            return { success: false, error: 'Only teachers can start games' };
        }
        
        const user = Auth.getCurrentUser();
        const games = Classroom.getActiveGames();
        const game = games[gameId];
        
        if (!game || game.hostId !== user.id) {
            return { success: false, error: 'Game not found or unauthorized' };
        }
        
        if (game.players.length < 1) {
            return { success: false, error: 'Need at least 1 player to start' };
        }
        
        game.status = 'playing';
        game.startedAt = new Date().toISOString();
        
        Classroom.saveActiveGames(games);
        
        return { success: true, game };
    },
    
    /**
     * Update player state in game
     */
    updatePlayer: (gameId, updates) => {
        const user = Auth.getCurrentUser();
        const games = Classroom.getActiveGames();
        const game = games[gameId];
        
        if (!game) return { success: false };
        
        const player = game.players.find(p => p.id === user.id);
        if (player) {
            Object.assign(player, updates);
            Classroom.saveActiveGames(games);
        }
        
        return { success: true, game };
    },
    
    /**
     * End a game
     */
    endGame: (gameId) => {
        const games = Classroom.getActiveGames();
        const game = games[gameId];
        
        if (!game) return { success: false };
        
        game.status = 'finished';
        game.endedAt = new Date().toISOString();
        
        // Sort players by score/position
        game.results = [...game.players].sort((a, b) => {
            if (game.gameType === 'race') {
                return b.position - a.position || b.score - a.score;
            }
            return b.score - a.score;
        });
        
        Classroom.saveActiveGames(games);
        
        // Update classroom stats
        const classrooms = Classroom.getClassrooms();
        const classroom = classrooms[game.classroomCode];
        if (classroom) {
            classroom.stats.totalGamesPlayed++;
            Classroom.saveClassrooms(classrooms);
        }
        
        return { success: true, game };
    },
    
    /**
     * Get game by ID
     */
    getGame: (gameId) => {
        const games = Classroom.getActiveGames();
        return games[gameId] || null;
    },
    
    /**
     * Find game by join code
     */
    findGameByCode: (code) => {
        const games = Classroom.getActiveGames();
        return Object.values(games).find(g => 
            g.joinCode === code && 
            (g.status === 'waiting' || g.status === 'playing')
        ) || null;
    },
    
    /**
     * Get available games for student's classrooms
     */
    getAvailableGames: () => {
        const user = Auth.getCurrentUser();
        if (!user) return [];
        
        const games = Classroom.getActiveGames();
        const myClassroomCodes = Auth.isTeacher() 
            ? Classroom.getTeacherClassrooms().map(c => c.code)
            : Classroom.getStudentClassrooms().map(c => c.code);
        
        return Object.values(games).filter(g => 
            myClassroomCodes.includes(g.classroomCode) && 
            (g.status === 'waiting' || g.status === 'playing')
        );
    },
    
    /**
     * Clean up old games
     */
    cleanupGames: () => {
        const games = Classroom.getActiveGames();
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        
        let cleaned = 0;
        Object.keys(games).forEach(id => {
            const game = games[id];
            if (new Date(game.createdAt).getTime() < oneHourAgo) {
                delete games[id];
                cleaned++;
            }
        });
        
        if (cleaned > 0) {
            Classroom.saveActiveGames(games);
            console.log(`🧹 Cleaned up ${cleaned} old games`);
        }
    }
};

// Initialize on load
Classroom.init();
