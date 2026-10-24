/**
 * DemoMode.js - Pre-populated demo data for presentations
 * Activates with ?demo=true URL parameter
 */

const DemoMode = {
    DEMO_KEY: 'csmaster_demo_mode',
    DEMO_EMAIL: 'demo@csmaster.pro',
    DEMO_USERNAME: 'DemoStudent',
    DEMO_PASSWORD: 'Demo2024!',
    
    // Check if demo mode should be active
    isActive: () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('demo') === 'true';
    },
    
    // Initialize demo mode on page load
    init: async () => {
        if (DemoMode.isActive()) {
            console.log('🎬 Demo Mode Detected');
            await DemoMode.setupDemoAccount();
        }
    },
    
    // Setup or restore demo account
    setupDemoAccount: async () => {
        try {
            const users = JSON.parse(localStorage.getItem('csmaster_users') || '{}');
            
            // Check if demo account exists and has correct password
            if (!users[DemoMode.DEMO_EMAIL]) {
                console.log('🎬 Creating demo account...');
                
                // Create account using Auth.register if available
                if (typeof Auth !== 'undefined' && Auth.register) {
                    const result = await Auth.register(
                        DemoMode.DEMO_USERNAME,
                        DemoMode.DEMO_EMAIL,
                        DemoMode.DEMO_PASSWORD,
                        'student'
                    );
                    
                    if (!result.success) {
                        console.error('Failed to create demo account:', result.error);
                        return;
                    }
                }
            }
            
            // Add demo profile data
            DemoMode.addDemoStats();
            
            // Auto-login
            if (typeof Auth !== 'undefined' && Auth.login) {
                const loginResult = await Auth.login(DemoMode.DEMO_EMAIL, DemoMode.DEMO_PASSWORD);
                if (loginResult.success) {
                    console.log('🎬 Demo account logged in');
                    if (typeof Toast !== 'undefined') {
                        Toast.show('Welcome to the demo!', 'success');
                    }
                    // Navigate to home
                    if (typeof Router !== 'undefined' && Router.navigate) {
                        Router.navigate('home');
                    }
                }
            }
            
        } catch (error) {
            console.error('DemoMode setup error:', error);
        }
    },
    
    // Add impressive stats to demo account
    addDemoStats: () => {
        try {
            const users = JSON.parse(localStorage.getItem('csmaster_users') || '{}');
            
            if (users[DemoMode.DEMO_EMAIL]) {
                users[DemoMode.DEMO_EMAIL].profile = {
                    xp: 32500,
                    level: 35,
                    totalCorrect: 4150,
                    totalAnswered: 4800,
                    streak: 21,
                    longestStreak: 28,
                    lastActive: new Date().toISOString(),
                    achievements: [
                        'first_question', 'quiz_master', 'century', 'thousand',
                        'streak_3', 'streak_7', 'streak_14',
                        'perfect_10', 'perfect_quiz', 'accuracy_90',
                        'topic_master', 'all_topics',
                        'speed_demon', 'battle_victor', 'millionaire', 'game_master',
                        'night_owl', 'explorer'
                    ],
                    topicsStudied: [
                        { id: 'algorithms', answered: 456, correct: 398 },
                        { id: 'programming', answered: 523, correct: 448 },
                        { id: 'data', answered: 387, correct: 334 },
                        { id: 'computers', answered: 312, correct: 278 },
                        { id: 'networks', answered: 489, correct: 412 },
                        { id: 'security', answered: 378, correct: 321 }
                    ],
                    gamesPlayed: {
                        speedrun: { played: 89, won: 72, bestScore: 3850 },
                        battlemode: { played: 67, won: 51, bestScore: 2400 },
                        bossbattle: { played: 45, won: 38, bestScore: 12500 },
                        millionaire: { played: 34, won: 18, bestScore: 1000000 },
                        memorymatch: { played: 56, won: 48, bestScore: 4800 }
                    }
                };
                users[DemoMode.DEMO_EMAIL].avatarColor = '#8b5cf6';
                users[DemoMode.DEMO_EMAIL].avatarEmoji = '🚀';
                
                localStorage.setItem('csmaster_users', JSON.stringify(users));
            }
            
            // Set streak data
            const streakData = {
                currentStreak: 21,
                longestStreak: 28,
                lastActiveDate: new Date().toDateString(),
                totalDaysActive: 65,
                streakFreezes: 2,
                todayProgress: {
                    date: new Date().toDateString(),
                    questionsAnswered: 32,
                    correctAnswers: 28,
                    studyMinutes: 45,
                    flashcardsReviewed: 15
                },
                unlockedRewards: [3, 7, 14],
                history: []
            };
            localStorage.setItem('csmaster_streaks', JSON.stringify(streakData));
            
            // Set leaderboard
            const leaderboard = [
                { username: 'DemoStudent', xp: 32500, level: 35, streak: 21, isCurrentUser: true },
                { username: 'CodeMaster99', xp: 28400, level: 31, streak: 15 },
                { username: 'AlgoQueen', xp: 24100, level: 28, streak: 12 },
                { username: 'ByteWizard', xp: 19800, level: 24, streak: 9 },
                { username: 'DataNinja', xp: 15200, level: 19, streak: 6 }
            ];
            localStorage.setItem('csmaster_leaderboard', JSON.stringify(leaderboard));
            
            console.log('🎬 Demo stats added');
            
        } catch (error) {
            console.error('Error adding demo stats:', error);
        }
    }
};

// Auto-initialize when Auth is ready
if (typeof window !== 'undefined') {
    window.DemoMode = DemoMode;
    
    // Initialize after a short delay to ensure Auth is loaded
    setTimeout(() => {
        if (DemoMode.isActive()) {
            DemoMode.init();
        }
    }, 500);
}
