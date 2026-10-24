/**
 * CS Master Pro - FULL Demo Account Setup
 * Paste this entire script in browser console (F12 → Console)
 * 
 * Login: demo@csmaster.pro / Demo2024!
 */

(async function(){
    console.log('🚀 Setting up FULL demo account...');
    
    const DEMO_EMAIL = 'demo@csmaster.pro';
    const DEMO_USERNAME = 'DemoStudent';
    const DEMO_PASSWORD = 'Demo2024!';
    
    // Generate 90 days of study history
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
                questions = 20 + Math.floor(Math.random() * 30);
                correct = Math.floor(questions * (0.78 + Math.random() * 0.18));
                xp = correct * 10 + Math.floor(Math.random() * 100);
            } else if (i < 45) {
                questions = dayOfWeek === 0 || dayOfWeek === 6 ? 25 + Math.floor(Math.random() * 35) : 10 + Math.floor(Math.random() * 20);
                correct = Math.floor(questions * (0.72 + Math.random() * 0.2));
                xp = correct * 10;
            } else if (Math.random() > 0.25) {
                questions = 5 + Math.floor(Math.random() * 15);
                correct = Math.floor(questions * (0.65 + Math.random() * 0.25));
                xp = correct * 10;
            } else { questions = 0; correct = 0; xp = 0; }
            history.push({ date: dateStr, questions, correct, xp });
        }
        return history;
    }
    
    // All achievements
    const allAchievements = [
        'first_question', 'quiz_master', 'century', 'thousand',
        'streak_3', 'streak_7', 'streak_14', 'streak_30',
        'perfect_10', 'perfect_25', 'perfect_quiz', 'accuracy_90',
        'topic_master', 'all_topics', 'deep_dive',
        'speed_demon', 'battle_victor', 'boss_slayer', 'millionaire', 'game_master',
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
            speedrun: { played: 89, won: 72, bestScore: 3850 },
            battlemode: { played: 67, won: 51, bestScore: 2400 },
            bossbattle: { played: 45, won: 38, bestScore: 12500 },
            millionaire: { played: 34, won: 18, bestScore: 1000000 },
            memorymatch: { played: 56, won: 48, bestScore: 4800 },
            goldquest: { played: 43, won: 35, bestScore: 7200 },
            factory: { played: 38, won: 29, bestScore: 4500 },
            typeracer: { played: 52, won: 41, bestScore: 98 },
            towerdefense: { played: 31, won: 24, bestScore: 8900 },
            carrace: { played: 47, won: 38, bestScore: 3200 },
            cryptohack: { played: 29, won: 21, bestScore: 15000 }
        },
        goals: [
            { id: 'daily_questions', name: 'Daily Questions', target: 25, current: 18, icon: '📝' },
            { id: 'weekly_xp', name: 'Weekly XP', target: 750, current: 580, icon: '⭐' },
            { id: 'streak', name: 'Maintain Streak', target: 30, current: 21, icon: '🔥' }
        ],
        studyHistory: generateStudyHistory()
    };
    
    try {
        // First, delete any existing demo account
        const users = JSON.parse(localStorage.getItem('csmaster_users') || '{}');
        delete users[DEMO_EMAIL];
        localStorage.setItem('csmaster_users', JSON.stringify(users));
        
        // Clear any existing session
        localStorage.removeItem('csmaster_session');
        
        // Use the actual Auth.register function to create account properly
        if (typeof Auth !== 'undefined' && Auth.register) {
            console.log('📝 Registering account via Auth.register...');
            const result = await Auth.register(DEMO_USERNAME, DEMO_EMAIL, DEMO_PASSWORD, 'student');
            
            if (!result.success) {
                throw new Error(result.error || 'Registration failed');
            }
            
            console.log('✅ Account registered successfully');
            
            // Now update the user with our demo profile data
            const updatedUsers = JSON.parse(localStorage.getItem('csmaster_users') || '{}');
            if (updatedUsers[DEMO_EMAIL]) {
                updatedUsers[DEMO_EMAIL].profile = demoProfile;
                updatedUsers[DEMO_EMAIL].avatarColor = '#8b5cf6';
                updatedUsers[DEMO_EMAIL].avatarEmoji = '🚀';
                updatedUsers[DEMO_EMAIL].createdAt = new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString();
                localStorage.setItem('csmaster_users', JSON.stringify(updatedUsers));
                console.log('✅ Profile data added');
            }
        } else {
            throw new Error('Auth module not available. Make sure you are on the website.');
        }
        
        // Update leaderboard
        const lb = JSON.parse(localStorage.getItem('csmaster_leaderboard') || '[]').filter(p => p.email !== DEMO_EMAIL);
        lb.unshift({ username: DEMO_USERNAME, email: DEMO_EMAIL, xp: 18750, level: 22, streak: 21, accuracy: 83, isCurrentUser: true });
        [
            { username: 'CodeMaster99', xp: 16200, level: 20, streak: 15, accuracy: 81 },
            { username: 'AlgoQueen', xp: 14500, level: 18, streak: 12, accuracy: 85 },
            { username: 'ByteWizard', xp: 12800, level: 17, streak: 8, accuracy: 79 },
            { username: 'DataNinja', xp: 11200, level: 16, streak: 10, accuracy: 82 },
            { username: 'PythonPro', xp: 9800, level: 14, streak: 6, accuracy: 77 }
        ].forEach(u => { if (!lb.find(p => p.username === u.username)) lb.push(u); });
        lb.sort((a, b) => b.xp - a.xp);
        localStorage.setItem('csmaster_leaderboard', JSON.stringify(lb));
        
        console.log('');
        console.log('%c✅ DEMO ACCOUNT READY!', 'color: #10b981; font-size: 20px; font-weight: bold');
        console.log('');
        console.log('%c📧 Email: demo@csmaster.pro', 'font-size: 16px; color: #6366f1; font-weight: bold');
        console.log('%c🔑 Password: Demo2024!', 'font-size: 16px; color: #6366f1; font-weight: bold');
        console.log('');
        console.log('📊 Level 22 | 18,750 XP | 21-day streak 🔥');
        console.log('🏆 25 achievements | 83% accuracy | #1 leaderboard');
        console.log('');
        console.log('%c🔄 Refreshing in 2 seconds...', 'color: #f59e0b');
        
        setTimeout(() => location.reload(), 2000);
        
    } catch(e) {
        console.error('❌ Error:', e.message);
        console.log('');
        console.log('💡 Try refreshing the page first, then run this script again.');
    }
})();
