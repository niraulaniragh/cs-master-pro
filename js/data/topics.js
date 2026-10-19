/**
 * topics.js - Topic Definitions for Edexcel IGCSE 4CP0
 * Contains all 6 main topics with metadata
 */

const TOPICS = [
    {
        id: 'problem-solving',
        name: 'Problem Solving',
        icon: '🧩',
        color: '#3b82f6',
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
        description: 'Constructs, data types, arrays, loops, functions, validation, file handling',
        subtopics: [
            'Data Types',
            'Variables & Constants',
            'Operators',
            'Selection (IF/ELSE)',
            'Iteration (Loops)',
            'Arrays',
            'Functions & Procedures',
            'String Handling',
            'Validation',
            'File Handling'
        ]
    },
    {
        id: 'data',
        name: 'Data Representation',
        icon: '📊',
        color: '#f59e0b',
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
        description: 'Von Neumann, CPU components, logic gates, software types, translators',
        subtopics: [
            'Von Neumann Architecture',
            'CPU Components',
            'Fetch-Decode-Execute Cycle',
            'Primary Storage',
            'Secondary Storage',
            'Logic Gates',
            'System Software',
            'Utility Software',
            'Translators'
        ]
    },
    {
        id: 'networks',
        name: 'Networks & Internet',
        icon: '🌐',
        color: '#ec4899',
        description: 'LAN/WAN, topologies, protocols, TCP/IP, security threats, prevention',
        subtopics: [
            'Network Types (LAN/WAN)',
            'Network Topologies',
            'Network Hardware',
            'Protocols',
            'TCP/IP Model',
            'Internet & WWW',
            'Security Threats',
            'Security Prevention',
            'HTML & CSS Basics'
        ]
    },
    {
        id: 'bigger-picture',
        name: 'The Bigger Picture',
        icon: '🌍',
        color: '#06b6d4',
        description: 'Environmental impact, ethics, AI, copyright, emerging technologies',
        subtopics: [
            'Environmental Impact',
            'E-Waste',
            'Ethical Issues',
            'Legal Issues',
            'Copyright & Licensing',
            'Artificial Intelligence',
            'Privacy & Surveillance',
            'Emerging Technologies'
        ]
    }
];

// Helper function to get topic by ID
const getTopicById = (id) => TOPICS.find(t => t.id === id);

// Helper function to get topic color
const getTopicColor = (id) => getTopicById(id)?.color || '#6b7280';

// Helper function to get all subtopics for a topic
const getSubtopics = (topicId) => getTopicById(topicId)?.subtopics || [];
