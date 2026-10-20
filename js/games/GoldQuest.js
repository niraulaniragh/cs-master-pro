/**
 * GoldQuest.js - Gold Mining Quest Game (Stub)
 * Mine for gold by answering questions correctly!
 */

const GoldQuest = {
    startAsHost: (game) => {
        Toast.show('Gold Quest coming soon!', 'info');
        Router.navigate('teacher');
    },
    
    startAsPlayer: (game) => {
        Toast.show('Gold Quest coming soon!', 'info');
        Router.navigate('home');
    }
};
