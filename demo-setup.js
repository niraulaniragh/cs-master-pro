/**
 * CS Master Pro - Demo Account Setup Script
 * 
 * HOW TO USE:
 * 1. Open your website in the browser
 * 2. Open Developer Tools (F12 or Cmd+Option+I)
 * 3. Go to Console tab
 * 4. Copy and paste this entire script
 * 5. Press Enter
 * 
 * Login credentials:
 * - Email: demo@csmaster.pro
 * - Password: Demo2024!
 */

(async function() {
    console.log('🚀 Setting up demo account...');
    
    const DEMO_EMAIL = 'demo@csmaster.pro';
    const DEMO_USERNAME = 'DemoStudent';
    const DEMO_PASSWORD = 'Demo2024!';
    
    // Generate study history for last 30 days
    function generateStudyHistory() {
        const history = [];
        const today = new Date();
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            let questions, correct, xp;
            if (i < 14) {
                questions = 15 + Math.floor(Math.random() * 25);
                correct = Math.floor(questions * (0.75 + Math.random() * 0.2));
                xp = correct * 10 + Math.floor(Math.random() * 50);
            } else if (Math.random() > 0.3) {
                questions = 5 + Math.floor(Math.random() * 20);
                correct = Math.floor(questions * (0.7 + Math.random() * 0.25));
                xp = correct * 10;
            } else {
                questions = 0; correct = 0; xp = 0;
            }
            history.push({ date: dateStr, questions, correct, xp });
        }
        return history;
    }
    
    const demoProfile = {
        xp: 8500,
        level: 15,
        totalCorrect: 847,
        totalAnswered: 1024,
        streak: 14,
        longestStreak: 21,
        lastActive: new Date().toISOString(),
        achievements: [
            'first_question', 'quiz_master', 'century', 'streak_3', 'streak_7', 'streak_14',
            'perfect_10', 'perfect_quiz', 'accuracy_90', 'topic_master', 'all_topics',
            'speed_demon', 'battle_victor', 'millionaire', 'game_master', 'night_owl',
            'weekend_warrior', 'explorer'
        ],
        topicsStudied: [
            { id: 'algorithms', answered: 156, correct: 142 },
            { id: 'programming', answered: 189, correct: 168 },
            { id: 'data', answered: 134, correct: 121 },
            { id: 'computers', answered: 98, correct: 89 },
            { id: 'networks', answered: 167, correct: 148 },
            { id: 'security', answered: 112, correct: 98 },
            { id: 'databases', answered: 87, correct: 76 },
            { id: 'ethics', answered: 81, correct: 75 }
        ],
        gamesPlayed: {
            speedrun: { played: 45, won: 38, bestScore: 2450 },
            battlemode: { played: 32, won: 24, bestScore: 1800 },
            bossbattle: { played: 18, won: 12, bestScore: 5200 },
            millionaire: { played: 15, won: 8, bestScore: 1000000 },
            memorymatch: { played: 28, won: 22, bestScore: 3200 },
            goldquest: { played: 21, won: 16, bestScore: 4500 },
            factory: { played: 19, won: 14, bestScore: 2800 },
            typeracer: { played: 24, won: 18, bestScore: 95 },
            towerdefense: { played: 16, won: 11, bestScore: 3800 },
            carrace: { played: 22, won: 17, bestScore: 2100 },
            cryptohack: { played: 14, won: 9, bestScore: 8500 }
        },
        goals: [
            { id: 'daily_questions', name: 'Daily Questions', target: 20, current: 15, icon: '📝' },
            { id: 'weekly_xp', name: 'Weekly XP', target: 500, current: 420, icon: '⭐' },
            { id: 'streak', name: 'Maintain Streak', target: 30, current: 14, icon: '🔥' }
        ],
        studyHistory: generateStudyHistory()
    };
    
    try {
        // Generate salt
        let salt = '';
        for (let i = 0; i < 32; i++) salt += Math.floor(Math.random() * 16).toString(16);
        
        // Hash password using SHA-256
        const data = new TextEncoder().encode(DEMO_PASSWORD + salt);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        
        // Generate session token
        let token = '';
        for (let i = 0; i < 64; i++) token += Math.floor(Math.random() * 16).toString(16);
        
        const users = JSON.parse(localStorage.getItem('csmaster_users') || '{}');
        
        users[DEMO_EMAIL] = {
            id: 'demo_' + Date.now().toString(36),
            username: DEMO_USERNAME,
            email: DEMO_EMAIL,
            passwordHash: hash,
            passwordSalt: salt,
            sessionToken: token,
            accountType: 'student',
            avatarColor: '#10b981',
            avatarEmoji: '🎓',
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            profile: demoProfile,
            joinedClassrooms: []
        };
        
        localStorage.setItem('csmaster_users', JSON.stringify(users));
        localStorage.setItem('csmaster_session', JSON.stringify({
            email: DEMO_EMAIL,
            username: DEMO_USERNAME,
            token: token,
            createdAt: Date.now(),
            expiresAt: Date.now() + 24 * 60 * 60 * 1000
        }));
        
        // Update leaderboard
        const lb = JSON.parse(localStorage.getItem('csmaster_leaderboard') || '[]');
        const idx = lb.findIndex(p => p.email === DEMO_EMAIL);
        const entry = { username: DEMO_USERNAME, email: DEMO_EMAIL, xp: 8500, level: 15, streak: 14, accuracy: 83 };
        if (idx >= 0) lb[idx] = entry; else lb.push(entry);
        lb.sort((a, b) => b.xp - a.xp);
        localStorage.setItem('csmaster_leaderboard', JSON.stringify(lb));
        
        console.log('%c✅ Demo account ready!', 'color: #10b981; font-size: 16px; font-weight: bold');
        console.log('');
        console.log('%c📧 Email: demo@csmaster.pro', 'font-size: 14px');
        console.log('%c🔑 Password: Demo2024!', 'font-size: 14px');
        console.log('');
        console.log('%c📊 Account Stats:', 'font-weight: bold');
        console.log('   Level 15 | 8,500 XP | 14-day streak 🔥 | 83% accuracy | 18 achievements');
        console.log('');
        console.log('%c🔄 Refreshing...', 'color: #6366f1');
        
        setTimeout(() => location.reload(), 1500);
    } catch (e) {
        console.error('❌ Error:', e);
    }
})();
