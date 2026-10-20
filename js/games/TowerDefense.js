/**
 * TowerDefense.js - Tower Defense Game (Stub)
 * Defend your tower by answering questions!
 */

const TowerDefense = {
    startAsHost: (game) => {
        Toast.show('Tower Defense coming soon!', 'info');
        Router.navigate('teacher');
    },
    
    startAsPlayer: (game) => {
        Toast.show('Tower Defense coming soon!', 'info');
        Router.navigate('home');
    }
};
