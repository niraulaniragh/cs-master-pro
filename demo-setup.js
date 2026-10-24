/**
 * CS Master Pro - FULL Demo Account Setup
 * Paste this entire script in browser console (F12 → Console)
 * 
 * Login: demo@csmaster.pro / Demo2024!
 */

(async function() {
    console.log('🚀 Setting up FULL demo account...');
    
    const DEMO_EMAIL = 'demo@csmaster.pro';
    const DEMO_USERNAME = 'DemoStudent';
    const DEMO_PASSWORD = 'Demo2024!';
    
    // Generate 90 days of realistic study history
    function generateStudyHistory() {
        const history = [];
        const today = new Date();
        for (let i = 89; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const dayOfWeek = date.getDay();
            let questions, correct, xp;
            
            if (i < 21) {
                // Last 3 weeks - very active (current streak)
                questions = 20 + Math.floor(Math.random() * 30);
                correct = Math.floor(questions * (0.78 + Math.random() * 0.18));
                xp = correct * 10 + Math.floor(Math.random() * 100);
            } else if (i < 45) {
                // 3-6 weeks ago - moderate activity
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    questions = 25 + Math.floor(Math.random() * 35);
                } else {
                    questions = 10 + Math.floor(Math.random() * 20);
                }
                correct = Math.floor(questions * (0.72 + Math.random() * 0.2));
                xp = correct * 10;
            } else if (Math.random() > 0.25) {
                // Older - some activity
                questions = 5 + Math.floor(Math.random() * 15);
                correct = Math.floor(questions * (0.65 + Math.random() * 0.25));
                xp = correct * 10;
            } else {
                questions = 0; correct = 0; xp = 0;
            }
            history.push({ date: dateStr, questions, correct, xp });
        }
        return history;
    }
    
    // All achievements unlocked for demo
    const allAchievements = [
        // Milestones
        'first_question', 'quiz_master', 'century', 'thousand',
        // Streaks
        'streak_3', 'streak_7', 'streak_14', 'streak_30',
        // Accuracy
        'perfect_10', 'perfect_25', 'perfect_quiz', 'accuracy_90',
        // Topics
        'topic_master', 'all_topics', 'deep_dive',
        // Games
        'speed_demon', 'battle_victor', 'boss_slayer', 'millionaire', 'game_master',
        // Special
        'night_owl', 'early_bird', 'weekend_warrior', 'comeback', 'explorer'
    ];
    
    const demoProfile = {
        xp: 18750,
        level: 22,
        totalCorrect: 2847,
        totalAnswered: 3412,
        streak: 21,
        longestStreak: 34,
        lastActive: new Date().toISOString(),
        achievements: allAchievements,
        topicsStudied: [
            { id: 'algorithms', answered: 456, correct: 398, mastered: true },
            { id: 'programming', answered: 523, correct: 448, mastered: true },
            { id: 'data', answered: 387, correct: 334, mastered: true },
            { id: 'computers', answered: 312, correct: 278, mastered: true },
            { id: 'networks', answered: 489, correct: 412, mastered: true },
            { id: 'security', answered: 378, correct: 321, mastered: true },
            { id: 'databases', answered: 298, correct: 251, mastered: false },
            { id: 'ethics', answered: 245, correct: 214, mastered: false },
            { id: 'problem-solving', answered: 324, correct: 291, mastered: true }
        ],
        gamesPlayed: {
            speedrun: { played: 89, won: 72, bestScore: 3850, bestTime: 42 },
            battlemode: { played: 67, won: 51, bestScore: 2400, winStreak: 8 },
            bossbattle: { played: 45, won: 38, bestScore: 12500, bossesDefeated: 12 },
            millionaire: { played: 34, won: 18, bestScore: 1000000, perfectGames: 5 },
            memorymatch: { played: 56, won: 48, bestScore: 4800, bestTime: 38 },
            goldquest: { played: 43, won: 35, bestScore: 7200, deepestLevel: 15 },
            factory: { played: 38, won: 29, bestScore: 4500, efficiency: 94 },
            typeracer: { played: 52, won: 41, bestScore: 98, bestWPM: 98 },
            towerdefense: { played: 31, won: 24, bestScore: 8900, wavesCompleted: 25 },
            carrace: { played: 47, won: 38, bestScore: 3200, bestLap: 12.4 },
            cryptohack: { played: 29, won: 21, bestScore: 15000, biggestHeist: 5000 }
        },
        goals: [
            { id: 'daily_questions', name: 'Daily Questions', target: 25, current: 18, icon: '📝' },
            { id: 'weekly_xp', name: 'Weekly XP', target: 750, current: 580, icon: '⭐' },
            { id: 'streak', name: 'Maintain Streak', target: 30, current: 21, icon: '🔥' },
            { id: 'master_topic', name: 'Master All Topics', target: 9, current: 7, icon: '📚' }
        ],
        studyHistory: generateStudyHistory(),
        bookmarks: [
            { id: 'bm1', questionId: 42, note: 'Review binary conversion', createdAt: new Date(Date.now() - 5*24*60*60*1000).toISOString() },
            { id: 'bm2', questionId: 156, note: 'Tricky SQL question', createdAt: new Date(Date.now() - 3*24*60*60*1000).toISOString() },
            { id: 'bm3', questionId: 89, note: 'Network layers - remember order', createdAt: new Date(Date.now() - 1*24*60*60*1000).toISOString() }
        ],
        notes: [
            { id: 'n1', topic: 'algorithms', content: 'Binary search only works on SORTED arrays!', createdAt: new Date(Date.now() - 10*24*60*60*1000).toISOString() },
            { id: 'n2', topic: 'networks', content: 'TCP = reliable, UDP = fast but unreliable', createdAt: new Date(Date.now() - 7*24*60*60*1000).toISOString() },
            { id: 'n3', topic: 'security', content: 'Symmetric = same key, Asymmetric = public/private pair', createdAt: new Date(Date.now() - 2*24*60*60*1000).toISOString() }
        ],
        weakTopics: ['databases', 'ethics'],
        strongTopics: ['programming', 'algorithms', 'networks'],
        recentQuizzes: [
            { date: new Date(Date.now() - 1*24*60*60*1000).toISOString(), topic: 'networks', score: 9, total: 10, xp: 95 },
            { date: new Date(Date.now() - 1*24*60*60*1000).toISOString(), topic: 'programming', score: 10, total: 10, xp: 120 },
            { date: new Date(Date.now() - 2*24*60*60*1000).toISOString(), topic: 'security', score: 8, total: 10, xp: 85 },
            { date: new Date(Date.now() - 2*24*60*60*1000).toISOString(), topic: 'algorithms', score: 9, total: 10, xp: 95 },
            { date: new Date(Date.now() - 3*24*60*60*1000).toISOString(), topic: 'data', score: 7, total: 10, xp: 75 }
        ],
        flashcardsReviewed: 234,
        notesRead: 45,
        totalStudyTime: 4850, // minutes
        preferredDifficulty: 'mixed',
        soundEnabled: true,
        lastLoginDevice: 'Chrome on MacOS'
    };
    
    try {
        // Generate salt and hash password
        let salt = ''; 
        for(let i = 0; i < 32; i++) salt += Math.floor(Math.random() * 16).toString(16);
        const data = new TextEncoder().encode(DEMO_PASSWORD + salt);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        
        // Generate session token
        let token = ''; 
        for(let i = 0; i < 64; i++) token += Math.floor(Math.random() * 16).toString(16);
        
        const users = JSON.parse(localStorage.getItem('csmaster_users') || '{}');
        
        // Create full demo user
        users[DEMO_EMAIL] = {
            id: 'demo_' + Date.now().toString(36),
            username: DEMO_USERNAME,
            email: DEMO_EMAIL,
            passwordHash: hash,
            passwordSalt: salt,
            sessionToken: token,
            activeSessionToken: token,
            accountType: 'student',
            avatarColor: '#8b5cf6',
            avatarEmoji: '🚀',
            createdAt: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString(),
            profile: demoProfile,
            joinedClassrooms: ['demo-class-123'],
            settings: {
                darkMode: true,
                sound: true,
                animations: true,
                fontSize: 'medium',
                notifications: true,
                showHints: true
            }
        };
        
        localStorage.setItem('csmaster_users', JSON.stringify(users));
        
        // Create session
        localStorage.setItem('csmaster_session', JSON.stringify({
            email: DEMO_EMAIL,
            username: DEMO_USERNAME,
            token: token,
            sessionToken: token,
            accountType: 'student',
            createdAt: Date.now(),
            expiresAt: Date.now() + 12 * 60 * 60 * 1000
        }));
        
        // Update leaderboard with demo user at top
        const lb = JSON.parse(localStorage.getItem('csmaster_leaderboard') || '[]');
        const filtered = lb.filter(p => p.email !== DEMO_EMAIL);
        filtered.unshift({
            username: DEMO_USERNAME,
            email: DEMO_EMAIL,
            xp: 18750,
            level: 22,
            streak: 21,
            accuracy: 83,
            isCurrentUser: true
        });
        // Add some fake competitors
        const fakeUsers = [
            { username: 'CodeMaster99', xp: 16200, level: 20, streak: 15, accuracy: 81 },
            { username: 'AlgoQueen', xp: 14500, level: 18, streak: 12, accuracy: 85 },
            { username: 'ByteWizard', xp: 12800, level: 17, streak: 8, accuracy: 79 },
            { username: 'DataNinja', xp: 11200, level: 16, streak: 10, accuracy: 82 },
            { username: 'PythonPro', xp: 9800, level: 14, streak: 6, accuracy: 77 }
        ];
        fakeUsers.forEach(u => {
            if (!filtered.find(p => p.username === u.username)) {
                filtered.push(u);
            }
        });
        filtered.sort((a, b) => b.xp - a.xp);
        localStorage.setItem('csmaster_leaderboard', JSON.stringify(filtered));
        
        // Save some quiz history
        localStorage.setItem('csmaster_quiz_history', JSON.stringify(demoProfile.recentQuizzes));
        
        // Save bookmarks
        localStorage.setItem('csmaster_bookmarks', JSON.stringify(demoProfile.bookmarks));
        
        console.log('%c✅ FULL Demo Account Ready!', 'color: #10b981; font-size: 20px; font-weight: bold');
        console.log('');
        console.log('%c📧 Email: demo@csmaster.pro', 'font-size: 14px; color: #6366f1');
        console.log('%c🔑 Password: Demo2024!', 'font-size: 14px; color: #6366f1');
        console.log('');
        console.log('%c📊 Account Stats:', 'font-weight: bold; font-size: 14px');
        console.log('   🎯 Level 22 with 18,750 XP');
        console.log('   🔥 21-day active streak (longest: 34)');
        console.log('   ✅ 83% accuracy (2,847 / 3,412 correct)');
        console.log('   🏆 25 achievements unlocked (ALL!)');
        console.log('   📚 7 topics mastered');
        console.log('   🎮 All 11 games played with stats');
        console.log('   📅 90 days of activity history');
        console.log('   📝 Bookmarks and notes saved');
        console.log('   👥 Appears #1 on leaderboard');
        console.log('');
        console.log('%c🔄 Refreshing page...', 'color: #f59e0b');
        
        setTimeout(() => location.reload(), 2000);
        
    } catch(e) { 
        console.error('❌ Error:', e); 
    }
})();
