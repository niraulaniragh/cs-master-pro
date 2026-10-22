/**
 * DemoMode.js - Pre-populated demo data for presentations
 * Activates with ?demo=true URL parameter or keyboard shortcut
 */

const DemoMode = {
    DEMO_KEY: 'csmaster_demo_mode',
    
    // Demo user data showing good progress
    demoData: {
        user: {
            xp: 4850,
            level: 8,
            streak: 12,
            totalCorrect: 347,
            totalAnswered: 412,
            achievements: [
                'first_quiz', 'streak_5', 'streak_10', 'perfect', 
                'level_5', 'note_reader', 'century', 'speed_demon',
                'battle_veteran', 'speed_typist', 'boss_slayer'
            ],
            topicProgress: {
                'problem-solving': { correct: 45, total: 52 },
                'data-representation': { correct: 38, total: 45 },
                'hardware': { correct: 42, total: 50 },
                'software': { correct: 35, total: 42 },
                'networks': { correct: 40, total: 48 },
                'security': { correct: 32, total: 38 },
                'databases': { correct: 28, total: 35 },
                'programming': { correct: 87, total: 102 }
            },
            settings: {
                sound: true,
                animations: true,
                darkMode: true
            }
        },
        username: 'Alex_Demo',
        dailyGoals: {
            date: new Date().toDateString(),
            questions: 18,
            correct: 14,
            topics: 3,
            games: 2
        }
    },
    
    // Check if demo mode should be active
    isActive: () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('demo') === 'true' || 
               localStorage.getItem(DemoMode.DEMO_KEY) === 'true';
    },
    
    // Activate demo mode
    activate: () => {
        console.log('🎬 Demo Mode Activated');
        localStorage.setItem(DemoMode.DEMO_KEY, 'true');
        
        // Set demo user state
        if (typeof Storage !== 'undefined') {
            Storage.save('user', DemoMode.demoData.user);
        }
        
        // Set daily goals
        localStorage.setItem('csmaster_daily_goals', JSON.stringify(DemoMode.demoData.dailyGoals));
        
        // Create demo session (simulates logged in user)
        const demoSession = {
            userId: 'demo_user_001',
            email: 'demo@csmaster.pro',
            username: DemoMode.demoData.username,
            accountType: 'student',
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('csmaster_session', JSON.stringify(demoSession));
        
        // Mark onboarding as complete
        localStorage.setItem('csmaster_onboarding_complete', 'true');
        
        // Add some game high scores
        localStorage.setItem('csmaster_speedrun_pb_all', JSON.stringify({
            score: 2450,
            combo: 12,
            date: new Date().toISOString()
        }));
        
        // Show activation message
        if (typeof Toast !== 'undefined') {
            Toast.show('🎬 Demo Mode Active - Press Ctrl+Shift+D to exit', 'info');
        }
        
        // Reload to apply changes
        window.location.reload();
    },
    
    // Deactivate demo mode
    deactivate: () => {
        console.log('🎬 Demo Mode Deactivated');
        localStorage.removeItem(DemoMode.DEMO_KEY);
        localStorage.removeItem('csmaster_session');
        
        // Clear demo data
        Storage.remove('user');
        localStorage.removeItem('csmaster_daily_goals');
        localStorage.removeItem('csmaster_onboarding_complete');
        localStorage.removeItem('csmaster_speedrun_pb_all');
        
        if (typeof Toast !== 'undefined') {
            Toast.show('Demo Mode Deactivated', 'info');
        }
        
        window.location.href = window.location.pathname;
    },
    
    // Toggle demo mode
    toggle: () => {
        if (DemoMode.isActive()) {
            DemoMode.deactivate();
        } else {
            DemoMode.activate();
        }
    },
    
    // Initialize - check URL params and setup keyboard shortcut
    init: () => {
        // Check URL for demo param
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('demo') === 'true' && !localStorage.getItem(DemoMode.DEMO_KEY)) {
            DemoMode.activate();
            return;
        }
        
        // Keyboard shortcut: Ctrl+Shift+D to toggle demo mode
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                DemoMode.toggle();
            }
        });
        
        // Show indicator if demo mode is active
        if (DemoMode.isActive()) {
            DemoMode.showIndicator();
        }
    },
    
    // Show demo mode indicator
    showIndicator: () => {
        const indicator = document.createElement('div');
        indicator.id = 'demo-indicator';
        indicator.innerHTML = '🎬 DEMO MODE';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            z-index: 9999;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
            animation: pulse 2s ease-in-out infinite;
        `;
        indicator.title = 'Click to exit demo mode (or Ctrl+Shift+D)';
        indicator.onclick = () => DemoMode.deactivate();
        document.body.appendChild(indicator);
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => DemoMode.init());
