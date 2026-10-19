/**
 * questions.js - Quiz Questions for Edexcel IGCSE 4CP0
 */

const QUESTIONS = [
    // PROBLEM SOLVING
    { id: 1, topic: 'problem-solving', question: 'What is an algorithm?', options: ['A programming language', 'A step-by-step set of instructions to solve a problem', 'A type of computer hardware', 'A database'], answer: 1, explanation: 'An algorithm is a finite set of well-defined instructions to solve a problem.' },
    { id: 2, topic: 'problem-solving', question: 'Which flowchart symbol represents a decision?', options: ['Rectangle', 'Oval', 'Diamond', 'Parallelogram'], answer: 2, explanation: 'A diamond shape represents a decision point with Yes/No branches.' },
    { id: 3, topic: 'problem-solving', question: 'What is the main requirement for binary search?', options: ['Small dataset', 'Data must be sorted', 'Data must be unsorted', 'Numeric data only'], answer: 1, explanation: 'Binary search only works on sorted data as it relies on comparing middle values.' },
    { id: 4, topic: 'problem-solving', question: 'In bubble sort, what happens after each pass?', options: ['The smallest item is at the start', 'The largest unsorted item bubbles to its correct position', 'All items are sorted', 'Nothing changes'], answer: 1, explanation: 'Bubble sort moves the largest unsorted item to its final position each pass.' },
    { id: 5, topic: 'problem-solving', question: 'What is decomposition?', options: ['Removing code', 'Breaking a problem into smaller sub-problems', 'Compressing files', 'Encrypting data'], answer: 1, explanation: 'Decomposition breaks complex problems into smaller, manageable parts.' },
    { id: 6, topic: 'problem-solving', question: 'What does abstraction mean in computing?', options: ['Making code longer', 'Hiding unnecessary details', 'Adding more features', 'Using abstract art'], answer: 1, explanation: 'Abstraction focuses on essential features while hiding complex details.' },
    { id: 7, topic: 'problem-solving', question: 'Which search is faster for large sorted datasets?', options: ['Linear search', 'Binary search', 'Both are equal', 'Neither works'], answer: 1, explanation: 'Binary search eliminates half the data each step, making it O(log n) vs O(n).' },
    { id: 8, topic: 'problem-solving', question: 'What does a parallelogram represent in a flowchart?', options: ['Decision', 'Process', 'Input/Output', 'Start/End'], answer: 2, explanation: 'Parallelograms represent input and output operations.' },
    { id: 9, topic: 'problem-solving', question: 'Which sorting algorithm uses divide and conquer?', options: ['Bubble sort', 'Linear sort', 'Merge sort', 'Selection sort'], answer: 2, explanation: 'Merge sort divides the list in half repeatedly, then merges sorted halves.' },
    { id: 10, topic: 'problem-solving', question: 'What is the worst-case time complexity of bubble sort?', options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'], answer: 3, explanation: 'Bubble sort has O(n²) worst case when data is reverse sorted.' },

    // PROGRAMMING
    { id: 11, topic: 'programming', question: 'Which data type stores decimal numbers?', options: ['Integer', 'Boolean', 'Float/Real', 'String'], answer: 2, explanation: 'Float/Real data types store decimal (floating point) numbers.' },
    { id: 12, topic: 'programming', question: 'What is a constant?', options: ['A value that changes', 'A value that cannot change once set', 'A type of variable', 'A loop counter'], answer: 1, explanation: 'Constants are fixed values that cannot be modified during execution.' },
    { id: 13, topic: 'programming', question: 'What does MOD (%) operator do?', options: ['Multiplies numbers', 'Returns the remainder', 'Returns quotient', 'Adds numbers'], answer: 1, explanation: 'MOD returns the remainder after integer division (e.g., 7 MOD 3 = 1).' },
    { id: 14, topic: 'programming', question: 'Which loop always runs at least once?', options: ['FOR loop', 'WHILE loop', 'REPEAT-UNTIL loop', 'None of them'], answer: 2, explanation: 'REPEAT-UNTIL checks the condition after each iteration, so it runs at least once.' },
    { id: 15, topic: 'programming', question: 'What is array index 0?', options: ['The last element', 'The first element', 'An error', 'The middle element'], answer: 1, explanation: 'Arrays are zero-indexed, so index 0 refers to the first element.' },
    { id: 16, topic: 'programming', question: 'What is the difference between a function and a procedure?', options: ['No difference', 'Functions return values, procedures do not', 'Procedures are faster', 'Functions cannot take parameters'], answer: 1, explanation: 'Functions return a value; procedures perform actions without returning.' },
    { id: 17, topic: 'programming', question: 'Which validation checks if a value is within limits?', options: ['Type check', 'Length check', 'Range check', 'Format check'], answer: 2, explanation: 'Range check validates that input is within minimum and maximum bounds.' },
    { id: 18, topic: 'programming', question: 'What does a Boolean variable store?', options: ['Numbers', 'Text', 'True or False', 'Decimals'], answer: 2, explanation: 'Boolean variables can only hold True or False values.' },
    { id: 19, topic: 'programming', question: 'What is iteration?', options: ['Making decisions', 'Repeating code', 'Storing data', 'Outputting results'], answer: 1, explanation: 'Iteration means repeating a block of code multiple times (loops).' },
    { id: 20, topic: 'programming', question: 'What is the purpose of validation?', options: ['Check if data is correct', 'Check if data is reasonable', 'Encrypt data', 'Delete data'], answer: 1, explanation: 'Validation checks if data is sensible and within acceptable bounds.' },

    // DATA REPRESENTATION
    { id: 21, topic: 'data', question: 'What is 13 in binary (8-bit)?', options: ['00001101', '00001011', '00001110', '00001100'], answer: 0, explanation: '13 = 8 + 4 + 1 = 00001101 in binary.' },
    { id: 22, topic: 'data', question: 'What is hexadecimal FF in denary?', options: ['15', '16', '255', '256'], answer: 2, explanation: 'FF = 15×16 + 15 = 240 + 15 = 255.' },
    { id: 23, topic: 'data', question: 'How many bits in a byte?', options: ['4', '8', '16', '32'], answer: 1, explanation: 'A byte consists of 8 bits.' },
    { id: 24, topic: 'data', question: 'What is the ASCII code for "A"?', options: ['65', '97', '48', '32'], answer: 0, explanation: 'Uppercase A is ASCII code 65; lowercase a is 97.' },
    { id: 25, topic: 'data', question: 'What happens when you left shift a binary number by 1?', options: ['Divides by 2', 'Multiplies by 2', 'No change', 'Reverses it'], answer: 1, explanation: 'Left shift multiplies by 2 (each position is worth double).' },
    { id: 26, topic: 'data', question: 'What type of compression loses data permanently?', options: ['Lossless', 'Lossy', 'Both', 'Neither'], answer: 1, explanation: 'Lossy compression permanently removes some data to achieve smaller files.' },
    { id: 27, topic: 'data', question: 'What increases image file size?', options: ['Lower resolution', 'Higher resolution and color depth', 'Fewer colors', 'Smaller dimensions'], answer: 1, explanation: 'File size = Width × Height × Color Depth. Higher values = larger files.' },
    { id: 28, topic: 'data', question: 'What is the sample rate for CD quality audio?', options: ['22,050 Hz', '44,100 Hz', '48,000 Hz', '96,000 Hz'], answer: 1, explanation: 'CD quality audio uses 44,100 Hz sample rate.' },
    { id: 29, topic: 'data', question: 'What advantage does Unicode have over ASCII?', options: ['Smaller file sizes', 'Supports many more characters/languages', 'Faster processing', 'Older standard'], answer: 1, explanation: 'Unicode supports 143,000+ characters from all languages; ASCII only 128.' },
    { id: 30, topic: 'data', question: 'What is 10101010 in hexadecimal?', options: ['AA', 'AB', 'A0', '55'], answer: 0, explanation: '1010 1010 = A A in hex (10 = A in hex).' },

    // COMPUTERS
    { id: 31, topic: 'computers', question: 'What does CPU stand for?', options: ['Computer Processing Unit', 'Central Processing Unit', 'Central Program Unit', 'Computer Program Unit'], answer: 1, explanation: 'CPU stands for Central Processing Unit.' },
    { id: 32, topic: 'computers', question: 'What does the ALU do?', options: ['Stores data', 'Performs arithmetic and logic operations', 'Controls the CPU', 'Manages memory'], answer: 1, explanation: 'The Arithmetic Logic Unit performs calculations and logical comparisons.' },
    { id: 33, topic: 'computers', question: 'What does the Program Counter (PC) hold?', options: ['Current instruction', 'Memory data', 'Address of next instruction', 'Calculation results'], answer: 2, explanation: 'The PC holds the memory address of the next instruction to fetch.' },
    { id: 34, topic: 'computers', question: 'What is Von Neumann bottleneck?', options: ['CPU overheating', 'Data and instructions sharing the same bus', 'RAM failure', 'Power issues'], answer: 1, explanation: 'Von Neumann bottleneck occurs because data and instructions share the same pathway.' },
    { id: 35, topic: 'computers', question: 'What is the output of AND gate with inputs 1 and 0?', options: ['0', '1', 'Error', 'Undefined'], answer: 0, explanation: 'AND gate outputs 1 only when ALL inputs are 1. 1 AND 0 = 0.' },
    { id: 36, topic: 'computers', question: 'Which translator converts the entire program at once?', options: ['Interpreter', 'Compiler', 'Assembler', 'Debugger'], answer: 1, explanation: 'A compiler translates the entire source code into machine code at once.' },
    { id: 37, topic: 'computers', question: 'What are the three stages of the FDE cycle?', options: ['Find, Delete, Execute', 'Fetch, Decode, Execute', 'Fetch, Delete, End', 'Find, Decode, End'], answer: 1, explanation: 'The CPU cycle is Fetch (get instruction), Decode (interpret), Execute (perform).' },
    { id: 38, topic: 'computers', question: 'What type of memory is RAM?', options: ['Permanent', 'Volatile', 'Secondary', 'Optical'], answer: 1, explanation: 'RAM is volatile - it loses data when power is turned off.' },
    { id: 39, topic: 'computers', question: 'What does XOR gate output when both inputs are 1?', options: ['0', '1', 'Error', '2'], answer: 0, explanation: 'XOR outputs 1 only when inputs are different. 1 XOR 1 = 0.' },
    { id: 40, topic: 'computers', question: 'Which increases CPU performance?', options: ['Lower clock speed', 'Fewer cores', 'More cache memory', 'Smaller registers'], answer: 2, explanation: 'More cache means faster access to frequently used data.' },

    // NETWORKS
    { id: 41, topic: 'networks', question: 'What is a LAN?', options: ['Large Area Network', 'Local Area Network', 'Long Area Network', 'Linked Area Network'], answer: 1, explanation: 'LAN stands for Local Area Network - covers a small geographical area.' },
    { id: 42, topic: 'networks', question: 'Which topology has a central switch?', options: ['Bus', 'Ring', 'Star', 'Mesh'], answer: 2, explanation: 'Star topology connects all devices to a central switch or hub.' },
    { id: 43, topic: 'networks', question: 'What does a firewall do?', options: ['Prevents fires', 'Filters network traffic', 'Stores data', 'Creates backups'], answer: 1, explanation: 'A firewall monitors and filters incoming and outgoing network traffic.' },
    { id: 44, topic: 'networks', question: 'What is phishing?', options: ['Catching fish online', 'Fake emails/sites to steal data', 'A type of virus', 'Network topology'], answer: 1, explanation: 'Phishing uses fake emails/websites to trick users into revealing personal data.' },
    { id: 45, topic: 'networks', question: 'What does HTTPS provide that HTTP does not?', options: ['Faster speed', 'Encryption/security', 'Better graphics', 'More storage'], answer: 1, explanation: 'HTTPS adds SSL/TLS encryption to secure data transfer.' },
    { id: 46, topic: 'networks', question: 'What is malware?', options: ['Good software', 'Malicious software', 'Network hardware', 'A protocol'], answer: 1, explanation: 'Malware is malicious software designed to harm or exploit systems.' },
    { id: 47, topic: 'networks', question: 'What is two-factor authentication?', options: ['Two passwords', 'Using two computers', 'Two different verification methods', 'Two usernames'], answer: 2, explanation: '2FA requires two different types of verification (e.g., password + phone code).' },
    { id: 48, topic: 'networks', question: 'Which network type covers the largest area?', options: ['LAN', 'PAN', 'WAN', 'MAN'], answer: 2, explanation: 'WAN (Wide Area Network) can span countries or the entire globe.' },
    { id: 49, topic: 'networks', question: 'What type of malware replicates itself across networks?', options: ['Virus', 'Worm', 'Trojan', 'Spyware'], answer: 1, explanation: 'Worms self-replicate and spread across networks without user interaction.' },
    { id: 50, topic: 'networks', question: 'What does IP address identify?', options: ['A website name', 'A device on a network', 'An email', 'A protocol'], answer: 1, explanation: 'An IP address uniquely identifies a device on a network.' },

    // BIGGER PICTURE
    { id: 51, topic: 'bigger-picture', question: 'What is e-waste?', options: ['Electronic waste', 'Energy waste', 'Email waste', 'Encrypted waste'], answer: 0, explanation: 'E-waste refers to discarded electronic devices and equipment.' },
    { id: 52, topic: 'bigger-picture', question: 'What does open source software mean?', options: ['Free to buy', 'Source code is available to view/modify', 'Only works online', 'Made by one person'], answer: 1, explanation: 'Open source means the source code is freely available to use and modify.' },
    { id: 53, topic: 'bigger-picture', question: 'What is the digital divide?', options: ['Splitting files', 'Gap between those with/without technology access', 'A math operation', 'Computer screen crack'], answer: 1, explanation: 'The digital divide is the gap between those who have access to technology and those who do not.' },
    { id: 54, topic: 'bigger-picture', question: 'What does copyright protect?', options: ['Ideas', 'Original creative works', 'Hardware', 'All information'], answer: 1, explanation: 'Copyright protects original creative works like software, music, and text.' },
    { id: 55, topic: 'bigger-picture', question: 'What is a positive environmental impact of computers?', options: ['More e-waste', 'Remote working reduces travel', 'Higher energy use', 'More manufacturing'], answer: 1, explanation: 'Remote working and video calls reduce the need for commuting and travel.' },
    { id: 56, topic: 'bigger-picture', question: 'What is proprietary software?', options: ['Free software', 'Commercial software with restricted access', 'Open source', 'Shareware'], answer: 1, explanation: 'Proprietary software is owned by a company with restricted access and usually requires payment.' },
    { id: 57, topic: 'bigger-picture', question: 'What is one concern about AI?', options: ['It uses too much paper', 'Potential job displacement', 'It makes computers slower', 'It uses less electricity'], answer: 1, explanation: 'AI automation may replace human jobs in various industries.' },
    { id: 58, topic: 'bigger-picture', question: 'What is cyberbullying?', options: ['Building computers', 'Using technology to harass others', 'A type of virus', 'Network security'], answer: 1, explanation: 'Cyberbullying is using technology to intimidate, threaten, or harass others.' },
    { id: 59, topic: 'bigger-picture', question: 'What does Creative Commons license allow?', options: ['No sharing ever', 'Flexible sharing with conditions', 'Only commercial use', 'Full ownership transfer'], answer: 1, explanation: 'Creative Commons licenses allow creators to specify how their work can be shared and used.' },
    { id: 60, topic: 'bigger-picture', question: 'What is algorithmic bias?', options: ['Fast algorithms', 'Unfair outcomes from biased training data', 'Algorithm errors', 'Slow processing'], answer: 1, explanation: 'Algorithmic bias occurs when AI systems produce unfair results due to biased data or design.' }
];

// Helper function to get questions by topic
const getQuestionsByTopic = (topicId) => {
    if (topicId === 'all') return QUESTIONS;
    return QUESTIONS.filter(q => q.topic === topicId);
};

// Helper function to get random questions
const getRandomQuestions = (count, topicId = 'all') => {
    const pool = getQuestionsByTopic(topicId);
    return Helpers.shuffle(pool).slice(0, count);
};
