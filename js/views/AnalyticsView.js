/**
 * AnalyticsView.js - Comprehensive Analytics Dashboard
 * Features: Performance trends, topic heatmap, study time tracking
 */

const AnalyticsView = {
    render: () => {
        const user = AppState.getState('user') || {};
        const streakData = typeof StreakSystem !== 'undefined' ? StreakSystem.getData() : {};
        const srsStats = typeof SRSSystem !== 'undefined' ? SRSSystem.getOverallStats() : {};
        const studyStats = AnalyticsView.getStudyTimeStats();
        
        return `
            <div class="analytics-view">
                <div class="analytics-header">
                    <h1>📊 Analytics Dashboard</h1>
                    <p>Track your learning progress and identify areas for improvement</p>
                </div>
                
                <!-- Overview Cards -->
                <section class="analytics-overview">
                    <div class="analytics-card primary">
                        <div class="card-icon">🎯</div>
                        <div class="card-content">
                            <span class="card-value">${srsStats.averageAccuracy || 0}%</span>
                            <span class="card-label">Overall Accuracy</span>
                        </div>
                    </div>
                    <div class="analytics-card">
                        <div class="card-icon">📝</div>
                        <div class="card-content">
                            <span class="card-value">${srsStats.totalReviews || 0}</span>
                            <span class="card-label">Questions Answered</span>
                        </div>
                    </div>
                    <div class="analytics-card">
                        <div class="card-icon">🧠</div>
                        <div class="card-content">
                            <span class="card-value">${srsStats.cardsMastered || 0}</span>
                            <span class="card-label">Cards Mastered</span>
                        </div>
                    </div>
                    <div class="analytics-card">
                        <div class="card-icon">⏱️</div>
                        <div class="card-content">
                            <span class="card-value">${studyStats.totalHours}h</span>
                            <span class="card-label">Study Time</span>
                        </div>
                    </div>
                </section>
                
                <!-- Main Dashboard Grid -->
                <div class="analytics-grid">
                    <!-- Performance Trends -->
                    <section class="analytics-section trends">
                        <h2>📈 Performance Trends</h2>
                        <div class="chart-container">
                            ${AnalyticsView.renderPerformanceChart()}
                        </div>
                    </section>
                    
                    <!-- Topic Mastery Heatmap -->
                    <section class="analytics-section mastery">
                        <h2>🗺️ Topic Mastery</h2>
                        <div class="mastery-grid">
                            ${AnalyticsView.renderTopicMastery()}
                        </div>
                    </section>
                    
                    <!-- Study Time Distribution -->
                    <section class="analytics-section time">
                        <h2>⏰ Study Time</h2>
                        <div class="time-chart">
                            ${AnalyticsView.renderStudyTimeChart()}
                        </div>
                    </section>
                    
                    <!-- Weak Areas -->
                    <section class="analytics-section weak-areas">
                        <h2>⚠️ Areas to Improve</h2>
                        <div class="weak-list">
                            ${AnalyticsView.renderWeakAreas()}
                        </div>
                    </section>
                    
                    <!-- Recent Activity -->
                    <section class="analytics-section activity">
                        <h2>📅 Activity Calendar</h2>
                        <div class="activity-calendar">
                            ${AnalyticsView.renderActivityCalendar()}
                        </div>
                    </section>
                    
                    <!-- Achievements Progress -->
                    <section class="analytics-section achievements">
                        <h2>🏆 Achievement Progress</h2>
                        <div class="achievement-progress">
                            ${AnalyticsView.renderAchievementProgress()}
                        </div>
                    </section>
                </div>
                
                <!-- Study Recommendations -->
                <section class="analytics-recommendations">
                    <h2>💡 Smart Recommendations</h2>
                    <div class="recommendations-list">
                        ${AnalyticsView.renderRecommendations()}
                    </div>
                </section>
            </div>
        `;
    },
    
    init: () => {
        console.log('📊 Analytics view initialized');
    },
    
    // Get study time statistics
    getStudyTimeStats: () => {
        try {
            const stored = localStorage.getItem('csmaster_study_time') || '{}';
            const data = JSON.parse(stored);
            
            let totalMinutes = 0;
            const dailyMinutes = {};
            
            Object.entries(data).forEach(([date, minutes]) => {
                totalMinutes += minutes;
                dailyMinutes[date] = minutes;
            });
            
            return {
                totalMinutes,
                totalHours: Math.round(totalMinutes / 60),
                dailyMinutes,
                averageDaily: Object.keys(dailyMinutes).length > 0 
                    ? Math.round(totalMinutes / Object.keys(dailyMinutes).length)
                    : 0
            };
        } catch (e) {
            return { totalMinutes: 0, totalHours: 0, dailyMinutes: {}, averageDaily: 0 };
        }
    },
    
    // Render performance trend chart (ASCII/CSS based)
    renderPerformanceChart: () => {
        const streakData = typeof StreakSystem !== 'undefined' ? StreakSystem.getData() : {};
        const history = streakData.history || [];
        
        if (history.length < 2) {
            return `
                <div class="chart-empty">
                    <span>📊</span>
                    <p>Complete more daily goals to see your trends!</p>
                </div>
            `;
        }
        
        // Get last 14 days of data
        const recent = history.slice(-14);
        const maxQuestions = Math.max(...recent.map(d => d.questions), 10);
        
        return `
            <div class="bar-chart">
                ${recent.map((day, i) => {
                    const height = (day.questions / maxQuestions) * 100;
                    const accuracy = day.questions > 0 ? Math.round((day.correct / day.questions) * 100) : 0;
                    const date = new Date(day.date);
                    const dayLabel = date.toLocaleDateString('en', { weekday: 'short' });
                    
                    return `
                        <div class="bar-item">
                            <div class="bar-wrapper">
                                <div class="bar" style="height: ${height}%">
                                    <span class="bar-value">${day.questions}</span>
                                </div>
                            </div>
                            <span class="bar-label">${dayLabel}</span>
                            <span class="bar-accuracy">${accuracy}%</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="chart-legend">
                <span>📝 Questions answered per day</span>
                <span>✅ Accuracy shown below</span>
            </div>
        `;
    },
    
    // Render topic mastery heatmap
    renderTopicMastery: () => {
        if (typeof TOPICS === 'undefined' || typeof QUESTIONS === 'undefined') {
            return '<p class="empty-state">Topic data not available</p>';
        }
        
        const topicsMastery = typeof SRSSystem !== 'undefined' 
            ? SRSSystem.getAllTopicsMastery(QUESTIONS, TOPICS)
            : TOPICS.map(t => ({ ...t, mastery: null }));
        
        return topicsMastery.map(topic => {
            const mastery = topic.mastery || { masteryPercent: 0, mastered: 0, total: 0 };
            const heatColor = AnalyticsView.getHeatColor(mastery.masteryPercent);
            
            return `
                <div class="mastery-item" style="--heat-color: ${heatColor}">
                    <span class="mastery-icon">${topic.icon || '📚'}</span>
                    <div class="mastery-info">
                        <span class="mastery-name">${topic.name}</span>
                        <div class="mastery-bar-mini">
                            <div class="mastery-fill" style="width: ${mastery.masteryPercent}%"></div>
                        </div>
                    </div>
                    <span class="mastery-value">${mastery.masteryPercent}%</span>
                </div>
            `;
        }).join('');
    },
    
    // Get heat color based on percentage
    getHeatColor: (percent) => {
        if (percent >= 80) return '#10b981';
        if (percent >= 60) return '#34d399';
        if (percent >= 40) return '#fbbf24';
        if (percent >= 20) return '#f97316';
        return '#ef4444';
    },
    
    // Render study time distribution
    renderStudyTimeChart: () => {
        const stats = AnalyticsView.getStudyTimeStats();
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        // Aggregate by day of week
        const byDay = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        
        Object.entries(stats.dailyMinutes).forEach(([dateStr, minutes]) => {
            const date = new Date(dateStr);
            const day = date.getDay();
            byDay[day] += minutes;
            counts[day]++;
        });
        
        const maxMinutes = Math.max(...Object.values(byDay), 60);
        
        return `
            <div class="time-bars">
                ${days.map((day, i) => {
                    const dayIndex = (i + 1) % 7; // Monday = 1
                    const minutes = byDay[dayIndex];
                    const avg = counts[dayIndex] > 0 ? Math.round(minutes / counts[dayIndex]) : 0;
                    const height = (minutes / maxMinutes) * 100;
                    
                    return `
                        <div class="time-bar-item">
                            <div class="time-bar-wrapper">
                                <div class="time-bar" style="height: ${height}%"></div>
                            </div>
                            <span class="time-day">${day}</span>
                            <span class="time-value">${avg}m</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="time-summary">
                <span>Total: <strong>${stats.totalHours}h ${stats.totalMinutes % 60}m</strong></span>
                <span>Daily avg: <strong>${stats.averageDaily}m</strong></span>
            </div>
        `;
    },
    
    // Render weak areas
    renderWeakAreas: () => {
        if (typeof QUESTIONS === 'undefined' || typeof SRSSystem === 'undefined') {
            return '<p class="empty-state">Answer more questions to identify weak areas</p>';
        }
        
        const weakCards = SRSSystem.getWeakCards(QUESTIONS, 5);
        
        if (weakCards.length === 0) {
            return `
                <div class="empty-state">
                    <span>🎉</span>
                    <p>Great job! No major weak areas detected.</p>
                </div>
            `;
        }
        
        // Group by topic
        const byTopic = {};
        weakCards.forEach(q => {
            const topic = q.topic || 'general';
            byTopic[topic] = (byTopic[topic] || 0) + 1;
        });
        
        const topicName = (id) => {
            if (typeof TOPICS !== 'undefined') {
                const topic = TOPICS.find(t => t.id === id);
                return topic ? topic.name : id;
            }
            return id;
        };
        
        return Object.entries(byTopic)
            .sort((a, b) => b[1] - a[1])
            .map(([topic, count]) => `
                <div class="weak-item">
                    <span class="weak-topic">${topicName(topic)}</span>
                    <span class="weak-count">${count} question${count > 1 ? 's' : ''} need review</span>
                    <button class="btn btn-small btn-primary" onclick="AnalyticsView.startTopicReview('${topic}')">
                        Review
                    </button>
                </div>
            `).join('');
    },
    
    // Start a focused review on a weak topic
    startTopicReview: (topicId) => {
        if (typeof PracticeView !== 'undefined') {
            PracticeView.selectedTopic = topicId;
            Router.navigate('practice');
            setTimeout(() => {
                if (typeof PracticeView.startQuiz === 'function') {
                    PracticeView.startQuiz();
                }
            }, 100);
        }
    },
    
    // Render activity calendar (GitHub-style)
    renderActivityCalendar: () => {
        const streakData = typeof StreakSystem !== 'undefined' ? StreakSystem.getData() : {};
        const history = streakData.history || [];
        
        // Create map of dates
        const dateMap = {};
        history.forEach(day => {
            dateMap[day.date] = day;
        });
        
        // Generate last 12 weeks
        const weeks = [];
        const today = new Date();
        
        for (let w = 11; w >= 0; w--) {
            const week = [];
            for (let d = 0; d < 7; d++) {
                const date = new Date(today);
                date.setDate(date.getDate() - (w * 7 + (6 - d)));
                const dateStr = date.toDateString();
                const dayData = dateMap[dateStr];
                
                let level = 0;
                if (dayData) {
                    if (dayData.questions >= 20) level = 4;
                    else if (dayData.questions >= 15) level = 3;
                    else if (dayData.questions >= 10) level = 2;
                    else level = 1;
                }
                
                week.push({
                    date: dateStr,
                    level,
                    questions: dayData?.questions || 0
                });
            }
            weeks.push(week);
        }
        
        return `
            <div class="calendar-grid">
                ${weeks.map(week => `
                    <div class="calendar-week">
                        ${week.map(day => `
                            <div class="calendar-day level-${day.level}" 
                                 title="${day.date}: ${day.questions} questions">
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
            <div class="calendar-legend">
                <span>Less</span>
                <div class="calendar-day level-0"></div>
                <div class="calendar-day level-1"></div>
                <div class="calendar-day level-2"></div>
                <div class="calendar-day level-3"></div>
                <div class="calendar-day level-4"></div>
                <span>More</span>
            </div>
        `;
    },
    
    // Render achievement progress
    renderAchievementProgress: () => {
        const achievements = [
            { id: 'first_quiz', name: 'First Steps', desc: 'Complete your first quiz', icon: '🎯', target: 1, type: 'quizzes' },
            { id: 'streak_7', name: 'Week Warrior', desc: '7-day streak', icon: '🔥', target: 7, type: 'streak' },
            { id: 'mastery_10', name: 'Knowledge Seeker', desc: 'Master 10 questions', icon: '🧠', target: 10, type: 'mastered' },
            { id: 'accuracy_90', name: 'Perfectionist', desc: '90% accuracy (50+ questions)', icon: '🎯', target: 90, type: 'accuracy' },
            { id: 'all_topics', name: 'Well Rounded', desc: 'Practice all topics', icon: '🌟', target: 10, type: 'topics' }
        ];
        
        const streakData = typeof StreakSystem !== 'undefined' ? StreakSystem.getData() : {};
        const srsStats = typeof SRSSystem !== 'undefined' ? SRSSystem.getOverallStats() : {};
        
        return achievements.map(ach => {
            let current = 0;
            
            switch (ach.type) {
                case 'streak':
                    current = streakData.longestStreak || 0;
                    break;
                case 'mastered':
                    current = srsStats.cardsMastered || 0;
                    break;
                case 'accuracy':
                    current = srsStats.averageAccuracy || 0;
                    break;
                case 'quizzes':
                    current = srsStats.totalReviews > 0 ? 1 : 0;
                    break;
                default:
                    current = 0;
            }
            
            const progress = Math.min(100, (current / ach.target) * 100);
            const completed = current >= ach.target;
            
            return `
                <div class="achievement-item ${completed ? 'completed' : ''}">
                    <span class="achievement-icon">${ach.icon}</span>
                    <div class="achievement-info">
                        <span class="achievement-name">${ach.name}</span>
                        <span class="achievement-desc">${ach.desc}</span>
                        <div class="achievement-bar">
                            <div class="achievement-fill" style="width: ${progress}%"></div>
                        </div>
                    </div>
                    <span class="achievement-progress">${current}/${ach.target}</span>
                </div>
            `;
        }).join('');
    },
    
    // Render smart recommendations
    renderRecommendations: () => {
        const recommendations = [];
        const streakData = typeof StreakSystem !== 'undefined' ? StreakSystem.getData() : {};
        const srsStats = typeof SRSSystem !== 'undefined' ? SRSSystem.getOverallStats() : {};
        
        // Check streak
        if (!streakData.todayProgress?.completed) {
            const progress = typeof StreakSystem !== 'undefined' ? StreakSystem.getTodayProgressPercent() : 0;
            recommendations.push({
                icon: '🔥',
                title: 'Complete your daily goal',
                desc: `You're ${progress}% done. Keep going to maintain your streak!`,
                action: 'Router.navigate("practice")',
                btnText: 'Practice Now'
            });
        }
        
        // Check due cards
        if (srsStats.dueToday > 0) {
            recommendations.push({
                icon: '📚',
                title: `${srsStats.dueToday} cards due for review`,
                desc: 'Review these cards to strengthen your memory',
                action: 'AnalyticsView.startSmartReview()',
                btnText: 'Start Review'
            });
        }
        
        // Low accuracy topic suggestion
        if (typeof TOPICS !== 'undefined' && typeof QUESTIONS !== 'undefined' && typeof SRSSystem !== 'undefined') {
            const weakest = SRSSystem.getAllTopicsMastery(QUESTIONS, TOPICS)
                .filter(t => t.mastery && t.mastery.masteryPercent < 50)
                .sort((a, b) => a.mastery.masteryPercent - b.mastery.masteryPercent)[0];
            
            if (weakest) {
                recommendations.push({
                    icon: '⚠️',
                    title: `Focus on ${weakest.name}`,
                    desc: `Only ${weakest.mastery.masteryPercent}% mastery - this topic needs attention`,
                    action: `AnalyticsView.startTopicReview('${weakest.id}')`,
                    btnText: 'Practice Topic'
                });
            }
        }
        
        // Encourage streaks
        if (streakData.currentStreak === 0) {
            recommendations.push({
                icon: '💪',
                title: 'Start a new streak!',
                desc: 'Consistent daily practice is the key to success',
                action: 'Router.navigate("practice")',
                btnText: 'Begin'
            });
        }
        
        if (recommendations.length === 0) {
            recommendations.push({
                icon: '🎉',
                title: 'Great job!',
                desc: 'You\'re on track. Keep up the excellent work!',
                action: null,
                btnText: null
            });
        }
        
        return recommendations.map(rec => `
            <div class="recommendation-card">
                <span class="rec-icon">${rec.icon}</span>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.desc}</p>
                </div>
                ${rec.action ? `
                    <button class="btn btn-primary" onclick="${rec.action}">${rec.btnText}</button>
                ` : ''}
            </div>
        `).join('');
    },
    
    // Start smart review session
    startSmartReview: () => {
        if (typeof QUESTIONS !== 'undefined' && typeof SRSSystem !== 'undefined') {
            const questions = SRSSystem.startSmartReview(QUESTIONS, 10);
            if (questions.length > 0 && typeof PracticeView !== 'undefined') {
                PracticeView.questions = questions;
                PracticeView.currentIndex = 0;
                PracticeView.score = 0;
                Router.navigate('practice');
                setTimeout(() => {
                    if (typeof PracticeView.showQuestion === 'function') {
                        PracticeView.quizMode = true;
                        PracticeView.showQuestion();
                    }
                }, 100);
            } else {
                Toast.show('No cards due for review!', 'info');
            }
        }
    }
};
