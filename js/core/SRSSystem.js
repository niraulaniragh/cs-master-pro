/**
 * SRSSystem.js - Spaced Repetition System
 * Implements SM-2 algorithm for optimal learning
 * Tracks mastery per question/topic and auto-resurfaces weak content
 */

const SRSSystem = {
    STORAGE_KEY: 'csmaster_srs',
    
    // SM-2 algorithm constants
    MIN_EASINESS: 1.3,
    DEFAULT_EASINESS: 2.5,
    
    // Mastery levels
    MASTERY_LEVELS: {
        NEW: { name: 'New', color: '#6b7280', icon: '⬜' },
        LEARNING: { name: 'Learning', color: '#f59e0b', icon: '🟨' },
        REVIEWING: { name: 'Reviewing', color: '#3b82f6', icon: '🟦' },
        MASTERED: { name: 'Mastered', color: '#10b981', icon: '🟩' }
    },
    
    // Get all SRS data
    getData: () => {
        try {
            const data = localStorage.getItem(SRSSystem.STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Error loading SRS data:', e);
            return {};
        }
    },
    
    // Save SRS data
    saveData: (data) => {
        try {
            localStorage.setItem(SRSSystem.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving SRS data:', e);
        }
    },
    
    // Get card data for a specific question
    getCard: (questionId) => {
        const data = SRSSystem.getData();
        return data[questionId] || {
            id: questionId,
            easiness: SRSSystem.DEFAULT_EASINESS,
            interval: 0,
            repetitions: 0,
            nextReview: null,
            lastReview: null,
            totalReviews: 0,
            correctCount: 0,
            incorrectCount: 0
        };
    },
    
    // Update card after review (SM-2 algorithm)
    reviewCard: (questionId, quality) => {
        // Quality: 0-5 (0-2 = incorrect, 3-5 = correct with varying ease)
        // For simplicity: 0 = wrong, 3 = hard but correct, 4 = correct, 5 = easy
        
        const data = SRSSystem.getData();
        const card = SRSSystem.getCard(questionId);
        const now = Date.now();
        
        card.lastReview = now;
        card.totalReviews++;
        
        if (quality >= 3) {
            // Correct answer
            card.correctCount++;
            
            if (card.repetitions === 0) {
                card.interval = 1; // 1 day
            } else if (card.repetitions === 1) {
                card.interval = 6; // 6 days
            } else {
                card.interval = Math.round(card.interval * card.easiness);
            }
            
            card.repetitions++;
            
            // Update easiness factor
            card.easiness = Math.max(
                SRSSystem.MIN_EASINESS,
                card.easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
            );
        } else {
            // Incorrect answer - reset
            card.incorrectCount++;
            card.repetitions = 0;
            card.interval = 1;
        }
        
        // Calculate next review date
        card.nextReview = now + (card.interval * 24 * 60 * 60 * 1000);
        
        data[questionId] = card;
        SRSSystem.saveData(data);
        
        return card;
    },
    
    // Simple review (correct/incorrect)
    recordAnswer: (questionId, isCorrect) => {
        const quality = isCorrect ? 4 : 1;
        return SRSSystem.reviewCard(questionId, quality);
    },
    
    // Get mastery level for a question
    getMasteryLevel: (questionId) => {
        const card = SRSSystem.getCard(questionId);
        
        if (card.totalReviews === 0) {
            return SRSSystem.MASTERY_LEVELS.NEW;
        } else if (card.repetitions < 2) {
            return SRSSystem.MASTERY_LEVELS.LEARNING;
        } else if (card.repetitions < 5 || card.interval < 21) {
            return SRSSystem.MASTERY_LEVELS.REVIEWING;
        } else {
            return SRSSystem.MASTERY_LEVELS.MASTERED;
        }
    },
    
    // Get all questions due for review
    getDueCards: (questions) => {
        const data = SRSSystem.getData();
        const now = Date.now();
        
        // If no questions provided, try to use global QUESTIONS
        const questionList = questions || (typeof QUESTIONS !== 'undefined' ? QUESTIONS : []);
        
        return questionList.filter(q => {
            const card = data[q.id];
            if (!card) return true; // New card - always due
            return !card.nextReview || card.nextReview <= now;
        });
    },
    
    // Get count of due cards without needing full question list
    getDueCount: () => {
        const data = SRSSystem.getData();
        const now = Date.now();
        let dueCount = 0;
        
        Object.values(data).forEach(card => {
            if (!card.nextReview || card.nextReview <= now) {
                dueCount++;
            }
        });
        
        return dueCount;
    },
    
    // Check if a specific question is due for review
    isDue: (questionId) => {
        const card = SRSSystem.getCard(questionId);
        if (card.totalReviews === 0) return true; // New card
        return !card.nextReview || card.nextReview <= Date.now();
    },
    
    // Get questions that need review (weak areas)
    getWeakCards: (questions, limit = 10) => {
        const data = SRSSystem.getData();
        
        // Score each question by weakness
        const scored = questions.map(q => {
            const card = data[q.id] || { correctCount: 0, incorrectCount: 0, totalReviews: 0 };
            const accuracy = card.totalReviews > 0 
                ? card.correctCount / card.totalReviews 
                : 0.5;
            
            return {
                question: q,
                card,
                weaknessScore: (1 - accuracy) + (card.incorrectCount * 0.1)
            };
        });
        
        // Sort by weakness (highest first) and return limit
        return scored
            .filter(s => s.card.totalReviews > 0) // Only reviewed questions
            .sort((a, b) => b.weaknessScore - a.weaknessScore)
            .slice(0, limit)
            .map(s => s.question);
    },
    
    // Get topic mastery statistics
    getTopicMastery: (questions, topicId) => {
        const topicQuestions = questions.filter(q => q.topic === topicId);
        if (topicQuestions.length === 0) return null;
        
        const data = SRSSystem.getData();
        let mastered = 0, reviewing = 0, learning = 0, newCount = 0;
        let totalCorrect = 0, totalReviews = 0;
        
        topicQuestions.forEach(q => {
            const level = SRSSystem.getMasteryLevel(q.id);
            const card = data[q.id];
            
            if (level === SRSSystem.MASTERY_LEVELS.MASTERED) mastered++;
            else if (level === SRSSystem.MASTERY_LEVELS.REVIEWING) reviewing++;
            else if (level === SRSSystem.MASTERY_LEVELS.LEARNING) learning++;
            else newCount++;
            
            if (card) {
                totalCorrect += card.correctCount || 0;
                totalReviews += card.totalReviews || 0;
            }
        });
        
        return {
            topicId,
            total: topicQuestions.length,
            mastered,
            reviewing,
            learning,
            new: newCount,
            masteryPercent: Math.round((mastered / topicQuestions.length) * 100),
            accuracy: totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0
        };
    },
    
    // Get all topics mastery for dashboard
    getAllTopicsMastery: (questions, topics) => {
        return topics.map(topic => ({
            ...topic,
            mastery: SRSSystem.getTopicMastery(questions, topic.id)
        }));
    },
    
    // Get overall statistics
    getOverallStats: () => {
        const data = SRSSystem.getData();
        const cards = Object.values(data);
        
        if (cards.length === 0) {
            return {
                totalCards: 0,
                totalReviews: 0,
                averageAccuracy: 0,
                cardsLearning: 0,
                cardsMastered: 0,
                dueToday: 0
            };
        }
        
        const now = Date.now();
        let totalReviews = 0, totalCorrect = 0;
        let learning = 0, mastered = 0, dueToday = 0;
        
        cards.forEach(card => {
            totalReviews += card.totalReviews || 0;
            totalCorrect += card.correctCount || 0;
            
            if (card.repetitions >= 5 && card.interval >= 21) {
                mastered++;
            } else if (card.totalReviews > 0) {
                learning++;
            }
            
            if (!card.nextReview || card.nextReview <= now) {
                dueToday++;
            }
        });
        
        return {
            totalCards: cards.length,
            totalReviews,
            averageAccuracy: totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0,
            cardsLearning: learning,
            cardsMastered: mastered,
            dueToday
        };
    },
    
    // Start a smart review session (due + weak cards)
    startSmartReview: (questions, count = 10) => {
        const dueCards = SRSSystem.getDueCards(questions);
        const weakCards = SRSSystem.getWeakCards(questions, count);
        
        // Combine and deduplicate
        const combined = [...dueCards];
        weakCards.forEach(wc => {
            if (!combined.find(c => c.id === wc.id)) {
                combined.push(wc);
            }
        });
        
        // Shuffle and limit
        const shuffled = combined.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    },
    
    // Render mastery indicator for a question
    renderMasteryBadge: (questionId) => {
        const level = SRSSystem.getMasteryLevel(questionId);
        return `<span class="mastery-badge" style="background: ${level.color}" title="${level.name}">${level.icon}</span>`;
    },
    
    // Render topic mastery bar
    renderTopicMasteryBar: (mastery) => {
        if (!mastery) return '<div class="mastery-bar empty">No data</div>';
        
        return `
            <div class="mastery-bar-container">
                <div class="mastery-bar">
                    <div class="mastery-segment mastered" style="width: ${(mastery.mastered / mastery.total) * 100}%" title="Mastered: ${mastery.mastered}"></div>
                    <div class="mastery-segment reviewing" style="width: ${(mastery.reviewing / mastery.total) * 100}%" title="Reviewing: ${mastery.reviewing}"></div>
                    <div class="mastery-segment learning" style="width: ${(mastery.learning / mastery.total) * 100}%" title="Learning: ${mastery.learning}"></div>
                    <div class="mastery-segment new" style="width: ${(mastery.new / mastery.total) * 100}%" title="New: ${mastery.new}"></div>
                </div>
                <span class="mastery-percent">${mastery.masteryPercent}%</span>
            </div>
        `;
    }
};
