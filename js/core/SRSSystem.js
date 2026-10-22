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
    
    // Cache for performance
    _dataCache: null,
    _cacheTime: 0,
    _cacheTTL: 5000, // 5 seconds cache TTL
    
    // Mastery levels
    MASTERY_LEVELS: {
        NEW: { name: 'New', color: '#6b7280', icon: '⬜' },
        LEARNING: { name: 'Learning', color: '#f59e0b', icon: '🟨' },
        REVIEWING: { name: 'Reviewing', color: '#3b82f6', icon: '🟦' },
        MASTERED: { name: 'Mastered', color: '#10b981', icon: '🟩' }
    },
    
    /**
     * Clear the data cache
     */
    clearCache: () => {
        SRSSystem._dataCache = null;
        SRSSystem._cacheTime = 0;
    },
    
    /**
     * Get all SRS data with caching
     */
    getData: () => {
        try {
            // Check cache
            const now = Date.now();
            if (SRSSystem._dataCache && (now - SRSSystem._cacheTime) < SRSSystem._cacheTTL) {
                return SRSSystem._dataCache;
            }
            
            const data = localStorage.getItem(SRSSystem.STORAGE_KEY);
            if (!data) {
                SRSSystem._dataCache = {};
                SRSSystem._cacheTime = now;
                return {};
            }
            
            const parsed = JSON.parse(data);
            const result = (typeof parsed === 'object' && parsed !== null) ? parsed : {};
            
            SRSSystem._dataCache = result;
            SRSSystem._cacheTime = now;
            return result;
        } catch (e) {
            console.error('Error loading SRS data:', e);
            return {};
        }
    },
    
    /**
     * Save SRS data
     */
    saveData: (data) => {
        if (!data || typeof data !== 'object') {
            console.error('Invalid SRS data');
            return false;
        }
        
        try {
            localStorage.setItem(SRSSystem.STORAGE_KEY, JSON.stringify(data));
            // Update cache
            SRSSystem._dataCache = data;
            SRSSystem._cacheTime = Date.now();
            return true;
        } catch (e) {
            console.error('Error saving SRS data:', e);
            return false;
        }
    },
    
    /**
     * Get card data for a specific question
     */
    getCard: (questionId) => {
        if (!questionId) {
            return SRSSystem.createDefaultCard('unknown');
        }
        
        const data = SRSSystem.getData();
        return data[questionId] || SRSSystem.createDefaultCard(questionId);
    },
    
    /**
     * Create a default card structure
     */
    createDefaultCard: (questionId) => ({
        id: questionId,
        easiness: SRSSystem.DEFAULT_EASINESS,
        interval: 0,
        repetitions: 0,
        nextReview: null,
        lastReview: null,
        totalReviews: 0,
        correctCount: 0,
        incorrectCount: 0
    }),
    
    /**
     * Update card after review (SM-2 algorithm)
     * Quality: 0-5 (0-2 = incorrect, 3-5 = correct with varying ease)
     */
    reviewCard: (questionId, quality) => {
        if (!questionId) {
            console.error('Invalid questionId for review');
            return null;
        }
        
        // Validate and normalize quality
        quality = typeof quality === 'number' ? Math.max(0, Math.min(5, Math.floor(quality))) : 1;
        
        try {
            const data = SRSSystem.getData();
            const card = SRSSystem.getCard(questionId);
            const now = Date.now();
            
            card.lastReview = now;
            card.totalReviews = (card.totalReviews || 0) + 1;
            
            if (quality >= 3) {
                // Correct answer
                card.correctCount = (card.correctCount || 0) + 1;
                
                if (card.repetitions === 0) {
                    card.interval = 1; // 1 day
                } else if (card.repetitions === 1) {
                    card.interval = 6; // 6 days
                } else {
                    card.interval = Math.round((card.interval || 1) * (card.easiness || SRSSystem.DEFAULT_EASINESS));
                }
                
                card.repetitions = (card.repetitions || 0) + 1;
                
                // Update easiness factor
                card.easiness = Math.max(
                    SRSSystem.MIN_EASINESS,
                    (card.easiness || SRSSystem.DEFAULT_EASINESS) + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
                );
            } else {
                // Incorrect answer - reset
                card.incorrectCount = (card.incorrectCount || 0) + 1;
                card.repetitions = 0;
                card.interval = 1;
            }
            
            // Calculate next review date (interval in days)
            const intervalMs = (card.interval || 1) * 24 * 60 * 60 * 1000;
            card.nextReview = now + intervalMs;
            
            data[questionId] = card;
            SRSSystem.saveData(data);
            
            return card;
        } catch (e) {
            console.error('Error reviewing card:', e);
            return null;
        }
    },
    
    /**
     * Simple review (correct/incorrect)
     */
    recordAnswer: (questionId, isCorrect) => {
        const quality = isCorrect ? 4 : 1;
        return SRSSystem.reviewCard(questionId, quality);
    },
    
    /**
     * Get mastery level for a question
     */
    getMasteryLevel: (questionId) => {
        if (!questionId) {
            return SRSSystem.MASTERY_LEVELS.NEW;
        }
        
        const card = SRSSystem.getCard(questionId);
        
        if (!card.totalReviews || card.totalReviews === 0) {
            return SRSSystem.MASTERY_LEVELS.NEW;
        } else if (card.repetitions < 2) {
            return SRSSystem.MASTERY_LEVELS.LEARNING;
        } else if (card.repetitions < 5 || (card.interval || 0) < 21) {
            return SRSSystem.MASTERY_LEVELS.REVIEWING;
        } else {
            return SRSSystem.MASTERY_LEVELS.MASTERED;
        }
    },
    
    /**
     * Get all questions due for review
     */
    getDueCards: (questions) => {
        // If no questions provided, try to use global QUESTIONS
        const questionList = Array.isArray(questions) 
            ? questions 
            : (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS) ? QUESTIONS : []);
        
        if (questionList.length === 0) {
            return [];
        }
        
        const data = SRSSystem.getData();
        const now = Date.now();
        
        return questionList.filter(q => {
            if (!q || !q.id) return false;
            const card = data[q.id];
            if (!card) return true; // New card - always due
            return !card.nextReview || card.nextReview <= now;
        });
    },
    
    /**
     * Get count of due cards without needing full question list
     */
    getDueCount: () => {
        try {
            const data = SRSSystem.getData();
            const now = Date.now();
            let dueCount = 0;
            
            Object.values(data).forEach(card => {
                if (card && (!card.nextReview || card.nextReview <= now)) {
                    dueCount++;
                }
            });
            
            return dueCount;
        } catch (e) {
            console.error('Error getting due count:', e);
            return 0;
        }
    },
    
    /**
     * Check if a specific question is due for review
     */
    isDue: (questionId) => {
        if (!questionId) return false;
        
        const card = SRSSystem.getCard(questionId);
        if (!card.totalReviews || card.totalReviews === 0) return true; // New card
        return !card.nextReview || card.nextReview <= Date.now();
    },
    
    /**
     * Get questions that need review (weak areas)
     */
    getWeakCards: (questions, limit = 10) => {
        if (!Array.isArray(questions) || questions.length === 0) {
            return [];
        }
        
        limit = Math.max(1, Math.min(100, limit)); // Clamp limit
        
        try {
            const data = SRSSystem.getData();
            
            // Score each question by weakness
            const scored = [];
            
            for (const q of questions) {
                if (!q || !q.id) continue;
                
                const card = data[q.id];
                if (!card || !card.totalReviews || card.totalReviews === 0) continue;
                
                const accuracy = card.correctCount / card.totalReviews;
                const weaknessScore = (1 - accuracy) + ((card.incorrectCount || 0) * 0.1);
                
                scored.push({
                    question: q,
                    weaknessScore
                });
            }
            
            // Sort by weakness (highest first) and return limit
            return scored
                .sort((a, b) => b.weaknessScore - a.weaknessScore)
                .slice(0, limit)
                .map(s => s.question);
        } catch (e) {
            console.error('Error getting weak cards:', e);
            return [];
        }
    },
    
    /**
     * Get topic mastery statistics
     */
    getTopicMastery: (questions, topicId) => {
        if (!Array.isArray(questions) || !topicId) {
            return null;
        }
        
        const topicQuestions = questions.filter(q => q && q.topic === topicId);
        if (topicQuestions.length === 0) return null;
        
        try {
            const data = SRSSystem.getData();
            let mastered = 0, reviewing = 0, learning = 0, newCount = 0;
            let totalCorrect = 0, totalReviews = 0;
            
            for (const q of topicQuestions) {
                if (!q.id) continue;
                
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
            }
            
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
        } catch (e) {
            console.error('Error getting topic mastery:', e);
            return null;
        }
    },
    
    /**
     * Get all topics mastery for dashboard
     */
    getAllTopicsMastery: (questions, topics) => {
        if (!Array.isArray(topics)) return [];
        if (!Array.isArray(questions)) questions = [];
        
        return topics.map(topic => {
            if (!topic) return null;
            return {
                ...topic,
                mastery: SRSSystem.getTopicMastery(questions, topic.id)
            };
        }).filter(Boolean);
    },
    
    /**
     * Get overall statistics
     */
    getOverallStats: () => {
        try {
            const data = SRSSystem.getData();
            const cards = Object.values(data).filter(c => c && typeof c === 'object');
            
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
            
            for (const card of cards) {
                totalReviews += card.totalReviews || 0;
                totalCorrect += card.correctCount || 0;
                
                if ((card.repetitions || 0) >= 5 && (card.interval || 0) >= 21) {
                    mastered++;
                } else if (card.totalReviews > 0) {
                    learning++;
                }
                
                if (!card.nextReview || card.nextReview <= now) {
                    dueToday++;
                }
            }
            
            return {
                totalCards: cards.length,
                totalReviews,
                averageAccuracy: totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0,
                cardsLearning: learning,
                cardsMastered: mastered,
                dueToday
            };
        } catch (e) {
            console.error('Error getting overall stats:', e);
            return {
                totalCards: 0,
                totalReviews: 0,
                averageAccuracy: 0,
                cardsLearning: 0,
                cardsMastered: 0,
                dueToday: 0
            };
        }
    },
    
    /**
     * Start a smart review session (due + weak cards)
     */
    startSmartReview: (questions, count = 10) => {
        if (!Array.isArray(questions) || questions.length === 0) {
            return [];
        }
        
        count = Math.max(1, Math.min(50, count)); // Clamp count
        
        try {
            const dueCards = SRSSystem.getDueCards(questions);
            const weakCards = SRSSystem.getWeakCards(questions, count);
            
            // Combine and deduplicate using a Map for O(1) lookup
            const seen = new Map();
            const combined = [];
            
            for (const card of dueCards) {
                if (card && card.id && !seen.has(card.id)) {
                    seen.set(card.id, true);
                    combined.push(card);
                }
            }
            
            for (const card of weakCards) {
                if (card && card.id && !seen.has(card.id)) {
                    seen.set(card.id, true);
                    combined.push(card);
                }
            }
            
            // Shuffle using Fisher-Yates
            for (let i = combined.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [combined[i], combined[j]] = [combined[j], combined[i]];
            }
            
            return combined.slice(0, count);
        } catch (e) {
            console.error('Error starting smart review:', e);
            return [];
        }
    },
    
    /**
     * Render mastery indicator for a question
     */
    renderMasteryBadge: (questionId) => {
        const level = SRSSystem.getMasteryLevel(questionId);
        const safeColor = (level.color || '#6b7280').replace(/[^a-zA-Z0-9#]/g, '');
        const safeName = (level.name || 'Unknown').replace(/[<>"'&]/g, '');
        const safeIcon = level.icon || '⬜';
        return `<span class="mastery-badge" style="background: ${safeColor}" title="${safeName}">${safeIcon}</span>`;
    },
    
    /**
     * Render topic mastery bar
     */
    renderTopicMasteryBar: (mastery) => {
        if (!mastery || typeof mastery !== 'object') {
            return '<div class="mastery-bar empty">No data</div>';
        }
        
        const total = mastery.total || 1; // Prevent division by zero
        const masteredPct = ((mastery.mastered || 0) / total) * 100;
        const reviewingPct = ((mastery.reviewing || 0) / total) * 100;
        const learningPct = ((mastery.learning || 0) / total) * 100;
        const newPct = ((mastery.new || 0) / total) * 100;
        
        return `
            <div class="mastery-bar-container">
                <div class="mastery-bar">
                    <div class="mastery-segment mastered" style="width: ${masteredPct}%" title="Mastered: ${mastery.mastered || 0}"></div>
                    <div class="mastery-segment reviewing" style="width: ${reviewingPct}%" title="Reviewing: ${mastery.reviewing || 0}"></div>
                    <div class="mastery-segment learning" style="width: ${learningPct}%" title="Learning: ${mastery.learning || 0}"></div>
                    <div class="mastery-segment new" style="width: ${newPct}%" title="New: ${mastery.new || 0}"></div>
                </div>
                <span class="mastery-percent">${mastery.masteryPercent || 0}%</span>
            </div>
        `;
    },
    
    /**
     * Reset all SRS data
     */
    reset: () => {
        try {
            localStorage.removeItem(SRSSystem.STORAGE_KEY);
            SRSSystem.clearCache();
            return true;
        } catch (e) {
            console.error('Error resetting SRS data:', e);
            return false;
        }
    }
};
