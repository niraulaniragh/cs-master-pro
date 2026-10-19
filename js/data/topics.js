/**
 * topics.js - Topic Definitions for Edexcel IGCSE 4CP0
 * Complete Paper 1 & Paper 2 Syllabus
 */

const TOPICS = [
    {
        id: 'problem-solving',
        name: 'Problem Solving',
        icon: '🧩',
        color: '#3b82f6',
        paper: 'Paper 1 & 2',
        description: 'Algorithms, flowcharts, searching & sorting, decomposition, abstraction',
        subtopics: [
            'Algorithms & Flowcharts',
            'Pseudocode',
            'Linear Search',
            'Binary Search',
            'Bubble Sort',
            'Merge Sort',
            'Decomposition',
            'Abstraction'
        ]
    },
    {
        id: 'programming',
        name: 'Programming',
        icon: '💻',
        color: '#10b981',
        paper: 'Paper 2 (Practical)',
        description: 'Data types, variables, selection, iteration, arrays, functions, file handling, string manipulation',
        subtopics: [
            'Data Types',
            'Variables & Constants',
            'Operators',
            'Selection (IF/ELSE)',
            'Iteration (Loops)',
            'Arrays',
            'Functions & Procedures',
            'String Handling',
            'File Handling',
            'Validation',
            'Testing'
        ]
    },
    {
        id: 'data',
        name: 'Data Representation',
        icon: '📊',
        color: '#f59e0b',
        paper: 'Paper 1',
        description: 'Binary, hex, ASCII, Unicode, images, sound, compression, encryption',
        subtopics: [
            'Binary Numbers',
            'Hexadecimal',
            'Binary Addition',
            'Binary Shifts',
            'ASCII & Unicode',
            'Images',
            'Sound',
            'Compression',
            'Encryption'
        ]
    },
    {
        id: 'computers',
        name: 'Computer Systems',
        icon: '🖥️',
        color: '#8b5cf6',
        paper: 'Paper 1',
        description: 'Architecture, CPU, memory, storage, logic gates, software, translators',
        subtopics: [
            'Von Neumann Architecture',
            'CPU Components',
            'Fetch-Decode-Execute Cycle',
            'Primary Storage',
            'Secondary Storage',
            'System Software',
            'Utility Software',
            'Logic Gates',
            'Translators'
        ]
    },
    {
        id: 'networks',
        name: 'Networks & Internet',
        icon: '🌐',
        color: '#ec4899',
        paper: 'Paper 1',
        description: 'LAN/WAN, topologies, hardware, protocols, TCP/IP, security threats, prevention',
        subtopics: [
            'Network Types (LAN/WAN)',
            'Network Topologies',
            'Network Hardware',
            'Protocols',
            'Security Threats',
            'Security Prevention'
        ]
    },
    {
        id: 'databases',
        name: 'Databases',
        icon: '🗄️',
        color: '#ef4444',
        paper: 'Paper 1 & 2',
        description: 'Database concepts, tables, keys, SQL queries, validation',
        subtopics: [
            'Database Concepts',
            'Primary & Foreign Keys',
            'SQL Queries',
            'Data Validation in Databases'
        ]
    },
    {
        id: 'web-development',
        name: 'Web Development',
        icon: '🌍',
        color: '#14b8a6',
        paper: 'Paper 1',
        description: 'HTML structure, tags, CSS styling, web page creation',
        subtopics: [
            'HTML Basics',
            'CSS Basics'
        ]
    },
    {
        id: 'boolean-logic',
        name: 'Boolean Logic',
        icon: '🔣',
        color: '#f97316',
        paper: 'Paper 1',
        description: 'Boolean expressions, truth tables, logic operators',
        subtopics: [
            'Boolean Expressions',
            'Truth Tables'
        ]
    },
    {
        id: 'bigger-picture',
        name: 'The Bigger Picture',
        icon: '🌍',
        color: '#06b6d4',
        paper: 'Paper 1',
        description: 'Environmental impact, ethics, AI, copyright, automation, digital currency',
        subtopics: [
            'Environmental Impact',
            'Ethical Issues',
            'Copyright & Licensing',
            'Artificial Intelligence',
            'Automation & Robotics',
            'Digital Currency'
        ]
    },
    {
        id: 'exam-tips',
        name: 'Exam Tips',
        icon: '📝',
        color: '#fbbf24',
        paper: 'Paper 1 & 2',
        description: 'Command words, exam technique, mark schemes, common mistakes',
        subtopics: [
            'Command Words',
            'Exam Technique',
            'Mark Scheme Advice',
            'Common Mistakes'
        ]
    }
];

// Helper function to get topic by ID
const getTopicById = (id) => TOPICS.find(t => t.id === id);

// Helper function to get topic color
const getTopicColor = (id) => getTopicById(id)?.color || '#6b7280';

// Helper function to get all subtopics for a topic
const getSubtopics = (topicId) => getTopicById(topicId)?.subtopics || [];
