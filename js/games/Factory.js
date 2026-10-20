/**
 * Factory.js - Factory Building Game (Stub)
 * Build factories and produce goods by answering questions!
 */

const Factory = {
    startAsHost: (game) => {
        Toast.show('Factory game coming soon!', 'info');
        Router.navigate('teacher');
    },
    
    startAsPlayer: (game) => {
        Toast.show('Factory game coming soon!', 'info');
        Router.navigate('home');
    }
};
