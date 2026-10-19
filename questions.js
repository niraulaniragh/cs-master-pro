/* ==========================================
   CS Quest - Question Bank
   Edexcel IGCSE Computer Science 4CP0
   Paper 1: Principles of Computer Science
========================================== */

// Topic IDs for Edexcel 4CP0:
// - problem-solving: Topic 1 - Problem Solving
// - programming: Topic 2 - Programming  
// - data: Topic 3 - Data
// - computers: Topic 4 - Computers
// - networks: Topic 5 - Communication and the Internet
// - bigger-picture: Topic 6 - The Bigger Picture

const TOPICS = [
    { id: 'problem-solving', name: 'Problem Solving', icon: '🧩', color: '#8B5CF6' },
    { id: 'programming', name: 'Programming', icon: '💻', color: '#EC4899' },
    { id: 'data', name: 'Data', icon: '📊', color: '#3B82F6' },
    { id: 'computers', name: 'Computers', icon: '🖥️', color: '#10B981' },
    { id: 'networks', name: 'Networks & Internet', icon: '🌐', color: '#F59E0B' },
    { id: 'bigger-picture', name: 'The Bigger Picture', icon: '🌍', color: '#EF4444' }
];

const QUESTIONS = [
    // ==========================================
    // TOPIC 1: PROBLEM SOLVING
    // ==========================================
    {
        topic: 'problem-solving',
        question: 'What is decomposition in computational thinking?',
        options: [
            'Breaking a complex problem into smaller sub-problems',
            'Combining small problems into one',
            'Deleting unnecessary parts of a problem',
            'Converting problems to binary'
        ],
        correct: 'Breaking a complex problem into smaller sub-problems',
        explanation: 'Decomposition involves breaking down complex problems into smaller, more manageable parts that are easier to solve.'
    },
    {
        topic: 'problem-solving',
        question: 'What is abstraction?',
        options: [
            'Removing unnecessary details to focus on important information',
            'Adding more details to a solution',
            'Converting pseudocode to a programming language',
            'Testing a program for errors'
        ],
        correct: 'Removing unnecessary details to focus on important information',
        explanation: 'Abstraction means filtering out irrelevant details and focusing only on what is important for solving the problem.'
    },
    {
        topic: 'problem-solving',
        question: 'What shape represents a decision in a flowchart?',
        options: ['Diamond', 'Rectangle', 'Oval', 'Parallelogram'],
        correct: 'Diamond',
        explanation: 'Diamond shapes represent decision points where a yes/no or true/false choice is made.'
    },
    {
        topic: 'problem-solving',
        question: 'What shape represents a process in a flowchart?',
        options: ['Rectangle', 'Diamond', 'Oval', 'Parallelogram'],
        correct: 'Rectangle',
        explanation: 'Rectangles represent process/action steps - instructions that the computer should carry out.'
    },
    {
        topic: 'problem-solving',
        question: 'What shape represents input/output in a flowchart?',
        options: ['Parallelogram', 'Rectangle', 'Diamond', 'Circle'],
        correct: 'Parallelogram',
        explanation: 'Parallelograms represent input (data coming in) or output (data going out).'
    },
    {
        topic: 'problem-solving',
        question: 'What is pseudocode?',
        options: [
            'A structured way to describe an algorithm using English-like statements',
            'The official code of a programming language',
            'Binary machine code',
            'A type of flowchart'
        ],
        correct: 'A structured way to describe an algorithm using English-like statements',
        explanation: 'Pseudocode describes algorithm steps in plain, structured English, not tied to any specific programming language.'
    },
    {
        topic: 'problem-solving',
        question: 'What is a trace table used for?',
        options: [
            'Tracking variable values as an algorithm executes',
            'Drawing flowcharts',
            'Converting binary to hexadecimal',
            'Testing hardware components'
        ],
        correct: 'Tracking variable values as an algorithm executes',
        explanation: 'A trace table shows how the values of variables change step-by-step as an algorithm runs.'
    },
    {
        topic: 'problem-solving',
        question: 'In a linear search, how are items checked?',
        options: [
            'One at a time from the start until the item is found',
            'By jumping to the middle first',
            'In random order',
            'From the end backwards only'
        ],
        correct: 'One at a time from the start until the item is found',
        explanation: 'Linear search checks each element in sequence from the first to the last until the target is found.'
    },
    {
        topic: 'problem-solving',
        question: 'What is the main requirement for binary search?',
        options: [
            'The data must be sorted',
            'The data must be unsorted',
            'The data must be in binary',
            'The data must contain only numbers'
        ],
        correct: 'The data must be sorted',
        explanation: 'Binary search only works on sorted data because it repeatedly divides the search interval in half.'
    },
    {
        topic: 'problem-solving',
        question: 'How does binary search work?',
        options: [
            'Repeatedly divides the list in half, eliminating half each time',
            'Checks every item one by one',
            'Starts from the end of the list',
            'Randomly picks items to check'
        ],
        correct: 'Repeatedly divides the list in half, eliminating half each time',
        explanation: 'Binary search finds the middle, compares it with the target, then eliminates the irrelevant half.'
    },
    {
        topic: 'problem-solving',
        question: 'How does bubble sort work?',
        options: [
            'Repeatedly compares adjacent pairs and swaps if in wrong order',
            'Finds the smallest and moves it to the front',
            'Divides the list and merges sorted halves',
            'Randomly rearranges elements'
        ],
        correct: 'Repeatedly compares adjacent pairs and swaps if in wrong order',
        explanation: 'Bubble sort compares neighbouring elements and swaps them if needed, repeating until sorted.'
    },
    {
        topic: 'problem-solving',
        question: 'How does merge sort work?',
        options: [
            'Divides list into halves recursively, then merges sorted halves',
            'Compares adjacent pairs and swaps',
            'Finds the smallest each time',
            'Checks each item once only'
        ],
        correct: 'Divides list into halves recursively, then merges sorted halves',
        explanation: 'Merge sort uses divide-and-conquer: split into halves, sort each half, then merge them together.'
    },
    {
        topic: 'problem-solving',
        question: 'Which algorithm is generally faster for large datasets?',
        options: [
            'Binary search compared to linear search',
            'Linear search compared to binary search',
            'Both have the same speed',
            'Neither can handle large datasets'
        ],
        correct: 'Binary search compared to linear search',
        explanation: 'Binary search is O(log n) while linear search is O(n), making binary search much faster for large sorted datasets.'
    },
    {
        topic: 'problem-solving',
        question: 'What does algorithm efficiency refer to?',
        options: [
            'How much time and memory an algorithm uses',
            'How colourful the code is',
            'How many programmers worked on it',
            'How old the algorithm is'
        ],
        correct: 'How much time and memory an algorithm uses',
        explanation: 'Efficiency measures the computational resources (time and space) an algorithm requires.'
    },
    {
        topic: 'problem-solving',
        question: 'What is a syntax error?',
        options: [
            'Breaking the rules of the programming language',
            'A logical mistake that produces wrong output',
            'Running out of memory',
            'A hardware malfunction'
        ],
        correct: 'Breaking the rules of the programming language',
        explanation: 'Syntax errors occur when code violates language grammar rules, like missing brackets or misspelled keywords.'
    },
    {
        topic: 'problem-solving',
        question: 'What is a logic error?',
        options: [
            'The program runs but produces incorrect results',
            'The program cannot start due to missing brackets',
            'The program crashes immediately',
            'The program uses too much memory'
        ],
        correct: 'The program runs but produces incorrect results',
        explanation: 'Logic errors mean the code runs without crashing but does not do what was intended.'
    },
    {
        topic: 'problem-solving',
        question: 'What is the purpose of test data?',
        options: [
            'To check if a program works correctly with different inputs',
            'To make the program run faster',
            'To store user passwords',
            'To convert code to binary'
        ],
        correct: 'To check if a program works correctly with different inputs',
        explanation: 'Test data validates that the program handles normal, boundary, and erroneous inputs correctly.'
    },
    {
        topic: 'problem-solving',
        question: 'What is normal test data?',
        options: [
            'Typical valid input that the program should accept',
            'Invalid input to test error handling',
            'Values at the edge of valid ranges',
            'Random data with no purpose'
        ],
        correct: 'Typical valid input that the program should accept',
        explanation: 'Normal test data represents everyday valid inputs the program is expected to process correctly.'
    },
    {
        topic: 'problem-solving',
        question: 'What is boundary test data?',
        options: [
            'Values at the edge of valid ranges',
            'Completely invalid data',
            'The most common data used',
            'Data that causes crashes'
        ],
        correct: 'Values at the edge of valid ranges',
        explanation: 'Boundary data tests the limits, like testing age 17, 18, and 19 when minimum age is 18.'
    },
    {
        topic: 'problem-solving',
        question: 'What is erroneous test data?',
        options: [
            'Invalid data that should be rejected by the program',
            'The most common type of valid data',
            'Data at the boundary of valid ranges',
            'Data that runs the program faster'
        ],
        correct: 'Invalid data that should be rejected by the program',
        explanation: 'Erroneous data tests that the program properly rejects and handles invalid input.'
    },

    // ==========================================
    // TOPIC 2: PROGRAMMING
    // ==========================================
    {
        topic: 'programming',
        question: 'What are the three basic programming constructs?',
        options: [
            'Sequence, selection, iteration',
            'Input, process, output',
            'Variables, constants, arrays',
            'Functions, procedures, classes'
        ],
        correct: 'Sequence, selection, iteration',
        explanation: 'All programs use sequence (steps in order), selection (IF statements), and iteration (loops).'
    },
    {
        topic: 'programming',
        question: 'What is sequence in programming?',
        options: [
            'Code executed one line after another in order',
            'Code that repeats',
            'Code that makes decisions',
            'Code that is never executed'
        ],
        correct: 'Code executed one line after another in order',
        explanation: 'Sequence means instructions are executed line by line in the order they are written.'
    },
    {
        topic: 'programming',
        question: 'What is selection in programming?',
        options: [
            'Code that makes decisions using IF statements',
            'Code that repeats multiple times',
            'Code executed in sequence',
            'Code that defines variables'
        ],
        correct: 'Code that makes decisions using IF statements',
        explanation: 'Selection uses conditions (IF-THEN-ELSE) to decide which code to execute.'
    },
    {
        topic: 'programming',
        question: 'What is iteration in programming?',
        options: [
            'Code that repeats using loops',
            'Code executed once only',
            'Code that makes decisions',
            'Code that stops the program'
        ],
        correct: 'Code that repeats using loops',
        explanation: 'Iteration means repeating code using loops like FOR, WHILE, or DO-WHILE.'
    },
    {
        topic: 'programming',
        question: 'What is a variable?',
        options: [
            'A named memory location whose value can change',
            'A fixed value that never changes',
            'A type of loop',
            'A comment in code'
        ],
        correct: 'A named memory location whose value can change',
        explanation: 'Variables store data that can be modified during program execution.'
    },
    {
        topic: 'programming',
        question: 'What is a constant?',
        options: [
            'A named value that cannot change during execution',
            'A value that changes frequently',
            'A type of variable',
            'A loop counter'
        ],
        correct: 'A named value that cannot change during execution',
        explanation: 'Constants are like variables but their values remain fixed throughout the program, like PI = 3.14159.'
    },
    {
        topic: 'programming',
        question: 'Which data type stores whole numbers?',
        options: ['Integer', 'Real/Float', 'String', 'Boolean'],
        correct: 'Integer',
        explanation: 'Integers store whole numbers without decimal points, like -5, 0, 42.'
    },
    {
        topic: 'programming',
        question: 'Which data type stores decimal numbers?',
        options: ['Real/Float', 'Integer', 'Boolean', 'Character'],
        correct: 'Real/Float',
        explanation: 'Real (or Float) data types store numbers with decimal points, like 3.14 or -0.5.'
    },
    {
        topic: 'programming',
        question: 'Which data type stores text?',
        options: ['String', 'Integer', 'Boolean', 'Float'],
        correct: 'String',
        explanation: 'Strings store sequences of characters/text, like "Hello World".'
    },
    {
        topic: 'programming',
        question: 'Which data type stores TRUE or FALSE?',
        options: ['Boolean', 'Integer', 'String', 'Character'],
        correct: 'Boolean',
        explanation: 'Boolean data type can only hold two values: TRUE or FALSE.'
    },
    {
        topic: 'programming',
        question: 'Which data type stores a single letter or symbol?',
        options: ['Character', 'String', 'Integer', 'Boolean'],
        correct: 'Character',
        explanation: 'Character (char) stores a single character, like \'A\' or \'5\'.'
    },
    {
        topic: 'programming',
        question: 'What is an array?',
        options: [
            'A data structure that stores multiple values of the same type',
            'A single variable',
            'A type of loop',
            'A decision statement'
        ],
        correct: 'A data structure that stores multiple values of the same type',
        explanation: 'Arrays store collections of related data under one name, accessed by index numbers.'
    },
    {
        topic: 'programming',
        question: 'What is the index of the first element in most arrays?',
        options: ['0', '1', '-1', '10'],
        correct: '0',
        explanation: 'In most programming languages, arrays start at index 0, so the first element is at position 0.'
    },
    {
        topic: 'programming',
        question: 'What is a 2D array?',
        options: [
            'An array with rows and columns like a table',
            'An array that can only store 2 items',
            'An array that stores doubles only',
            'Two separate arrays'
        ],
        correct: 'An array with rows and columns like a table',
        explanation: 'A 2D array organizes data in rows and columns, accessed by two indices [row][column].'
    },
    {
        topic: 'programming',
        question: 'What is a FOR loop best used for?',
        options: [
            'When you know exactly how many times to repeat',
            'When you don\'t know how many times to repeat',
            'When you never want to repeat',
            'When making decisions'
        ],
        correct: 'When you know exactly how many times to repeat',
        explanation: 'FOR loops are count-controlled - ideal when the number of iterations is known in advance.'
    },
    {
        topic: 'programming',
        question: 'What is a WHILE loop best used for?',
        options: [
            'When repeating until a condition becomes false',
            'When repeating exactly 10 times',
            'When you never want to repeat',
            'When storing data'
        ],
        correct: 'When repeating until a condition becomes false',
        explanation: 'WHILE loops are condition-controlled - they keep running as long as the condition is true.'
    },
    {
        topic: 'programming',
        question: 'What is a subprogram?',
        options: [
            'A named block of code that can be called from elsewhere',
            'The main program',
            'A variable declaration',
            'A comment in code'
        ],
        correct: 'A named block of code that can be called from elsewhere',
        explanation: 'Subprograms (functions and procedures) are reusable blocks of code called by name.'
    },
    {
        topic: 'programming',
        question: 'What is the difference between a function and a procedure?',
        options: [
            'Functions return a value, procedures do not',
            'Procedures return a value, functions do not',
            'They are identical',
            'Functions are longer than procedures'
        ],
        correct: 'Functions return a value, procedures do not',
        explanation: 'Functions return data to the calling code; procedures perform actions without returning values.'
    },
    {
        topic: 'programming',
        question: 'What is a parameter?',
        options: [
            'A value passed into a function or procedure',
            'The name of a function',
            'A type of loop',
            'A global variable'
        ],
        correct: 'A value passed into a function or procedure',
        explanation: 'Parameters are variables that receive data passed to a function/procedure when it is called.'
    },
    {
        topic: 'programming',
        question: 'What is a local variable?',
        options: [
            'A variable only accessible within its function/procedure',
            'A variable accessible everywhere in the program',
            'A constant value',
            'An array element'
        ],
        correct: 'A variable only accessible within its function/procedure',
        explanation: 'Local variables exist only within the block where they are declared and cannot be accessed elsewhere.'
    },
    {
        topic: 'programming',
        question: 'What is a global variable?',
        options: [
            'A variable accessible from anywhere in the program',
            'A variable only in one function',
            'A constant that never changes',
            'A parameter passed to a function'
        ],
        correct: 'A variable accessible from anywhere in the program',
        explanation: 'Global variables are declared outside functions and can be accessed throughout the entire program.'
    },
    {
        topic: 'programming',
        question: 'What does the MOD operator do?',
        options: [
            'Returns the remainder after division',
            'Returns the quotient of division',
            'Multiplies two numbers',
            'Adds two numbers'
        ],
        correct: 'Returns the remainder after division',
        explanation: 'MOD (modulo) returns the remainder: 17 MOD 5 = 2 because 17 ÷ 5 = 3 remainder 2.'
    },
    {
        topic: 'programming',
        question: 'What does the DIV operator do?',
        options: [
            'Returns the integer quotient without remainder',
            'Returns the remainder',
            'Divides with decimals',
            'Multiplies numbers'
        ],
        correct: 'Returns the integer quotient without remainder',
        explanation: 'DIV (integer division) returns the whole number result: 17 DIV 5 = 3.'
    },
    {
        topic: 'programming',
        question: 'What is validation?',
        options: [
            'Checking that data meets specified requirements',
            'Checking that data is correct',
            'Deleting invalid data',
            'Encrypting data'
        ],
        correct: 'Checking that data meets specified requirements',
        explanation: 'Validation ensures input data is reasonable and follows rules (type, range, format, etc.).'
    },
    {
        topic: 'programming',
        question: 'What is a range check?',
        options: [
            'Checking a value is within acceptable limits',
            'Checking data type',
            'Checking length of text',
            'Checking for special characters'
        ],
        correct: 'Checking a value is within acceptable limits',
        explanation: 'Range check verifies a value falls within specified minimum and maximum values.'
    },
    {
        topic: 'programming',
        question: 'What is a length check?',
        options: [
            'Checking data has the correct number of characters',
            'Checking data is within a range',
            'Checking data type',
            'Checking data exists'
        ],
        correct: 'Checking data has the correct number of characters',
        explanation: 'Length check ensures input has the required number of characters, like a password being 8+ characters.'
    },
    {
        topic: 'programming',
        question: 'What is string concatenation?',
        options: [
            'Joining two or more strings together',
            'Splitting a string into parts',
            'Converting string to integer',
            'Reversing a string'
        ],
        correct: 'Joining two or more strings together',
        explanation: 'Concatenation combines strings: "Hello" + " " + "World" = "Hello World".'
    },
    {
        topic: 'programming',
        question: 'What does file reading allow a program to do?',
        options: [
            'Access data stored in external files',
            'Write data to the screen',
            'Delete files permanently',
            'Create new variables'
        ],
        correct: 'Access data stored in external files',
        explanation: 'File reading enables programs to retrieve and use data stored in text files or other file types.'
    },
    {
        topic: 'programming',
        question: 'What does file writing allow a program to do?',
        options: [
            'Save data to external files for later use',
            'Read data from external files',
            'Display data on screen',
            'Delete data from memory'
        ],
        correct: 'Save data to external files for later use',
        explanation: 'File writing enables programs to store data permanently in files, persisting after the program ends.'
    },

    // ==========================================
    // TOPIC 3: DATA
    // ==========================================
    {
        topic: 'data',
        question: 'What is binary?',
        options: [
            'A number system using only 0 and 1',
            'A number system using 0-9',
            'A number system using 0-9 and A-F',
            'A number system using letters only'
        ],
        correct: 'A number system using only 0 and 1',
        explanation: 'Binary (base-2) uses only two digits: 0 and 1. All computer data is stored in binary.'
    },
    {
        topic: 'data',
        question: 'What is the binary equivalent of denary 13?',
        options: ['1101', '1011', '1110', '1001'],
        correct: '1101',
        explanation: '13 = 8 + 4 + 0 + 1 = 1101 in binary (8+4+1 = 13).'
    },
    {
        topic: 'data',
        question: 'What is the denary equivalent of binary 10110?',
        options: ['22', '26', '18', '20'],
        correct: '22',
        explanation: '10110 = 16 + 0 + 4 + 2 + 0 = 22 in denary.'
    },
    {
        topic: 'data',
        question: 'What is hexadecimal?',
        options: [
            'A number system using 0-9 and A-F (base-16)',
            'A number system using only 0 and 1',
            'A number system using 0-9 only',
            'A number system using letters only'
        ],
        correct: 'A number system using 0-9 and A-F (base-16)',
        explanation: 'Hexadecimal (base-16) uses 0-9 for values 0-9 and A-F for values 10-15.'
    },
    {
        topic: 'data',
        question: 'What is the hexadecimal equivalent of binary 11110000?',
        options: ['F0', 'E1', '0F', 'FF'],
        correct: 'F0',
        explanation: '1111 = F (15) and 0000 = 0. So 11110000 = F0 in hex.'
    },
    {
        topic: 'data',
        question: 'Why is hexadecimal used in computing?',
        options: [
            'It is more compact and easier to read than binary',
            'Computers can only understand hexadecimal',
            'It uses less storage than binary',
            'It is faster to process'
        ],
        correct: 'It is more compact and easier to read than binary',
        explanation: 'Hex provides a compact representation - 4 binary digits = 1 hex digit, making it easier for humans.'
    },
    {
        topic: 'data',
        question: 'What is the result of binary addition: 1011 + 0110?',
        options: ['10001', '10010', '1111', '10000'],
        correct: '10001',
        explanation: '1011 (11) + 0110 (6) = 10001 (17). Remember to carry when adding 1+1.'
    },
    {
        topic: 'data',
        question: 'What is overflow in binary?',
        options: [
            'When the result exceeds the available number of bits',
            'When dividing by zero',
            'When subtracting larger from smaller',
            'When converting to hexadecimal'
        ],
        correct: 'When the result exceeds the available number of bits',
        explanation: 'Overflow occurs when a calculation produces a result too large to fit in the allocated bits.'
    },
    {
        topic: 'data',
        question: 'What happens in a binary left shift?',
        options: [
            'The value is multiplied by 2',
            'The value is divided by 2',
            'The value stays the same',
            'The value becomes negative'
        ],
        correct: 'The value is multiplied by 2',
        explanation: 'Left shift moves all bits left, adding a 0 on the right, effectively multiplying by 2.'
    },
    {
        topic: 'data',
        question: 'What happens in a binary right shift?',
        options: [
            'The value is divided by 2 (integer division)',
            'The value is multiplied by 2',
            'The value becomes negative',
            'The value doubles'
        ],
        correct: 'The value is divided by 2 (integer division)',
        explanation: 'Right shift moves all bits right, removing the rightmost bit, effectively dividing by 2.'
    },
    {
        topic: 'data',
        question: 'What is ASCII?',
        options: [
            'A character encoding standard using 7 bits',
            'A type of image file',
            'A compression method',
            'A network protocol'
        ],
        correct: 'A character encoding standard using 7 bits',
        explanation: 'ASCII uses 7 bits to represent 128 characters including letters, numbers, and symbols.'
    },
    {
        topic: 'data',
        question: 'Why was Unicode developed?',
        options: [
            'To represent characters from all world languages',
            'To replace binary',
            'To make computers faster',
            'To reduce file sizes'
        ],
        correct: 'To represent characters from all world languages',
        explanation: 'Unicode can represent over 100,000 characters from all writing systems, unlike ASCII\'s 128.'
    },
    {
        topic: 'data',
        question: 'How are bitmap images stored?',
        options: [
            'As a grid of pixels, each with colour data',
            'As mathematical equations',
            'As text descriptions',
            'As sound waves'
        ],
        correct: 'As a grid of pixels, each with colour data',
        explanation: 'Bitmap images store data for each pixel in a grid, defining its colour using binary values.'
    },
    {
        topic: 'data',
        question: 'What is colour depth?',
        options: [
            'The number of bits used to represent each pixel\'s colour',
            'The number of pixels in an image',
            'The brightness of an image',
            'The size of the image file'
        ],
        correct: 'The number of bits used to represent each pixel\'s colour',
        explanation: 'Colour depth determines how many different colours can be represented. 24-bit = 16.7 million colours.'
    },
    {
        topic: 'data',
        question: 'How is image resolution measured?',
        options: [
            'Width × Height in pixels',
            'File size in bytes',
            'Colour depth in bits',
            'Compression ratio'
        ],
        correct: 'Width × Height in pixels',
        explanation: 'Resolution is the dimensions of an image in pixels, like 1920×1080.'
    },
    {
        topic: 'data',
        question: 'Calculate the file size: 800×600 pixels, 24-bit colour (in bytes)',
        options: ['1,440,000 bytes', '480,000 bytes', '14,400 bytes', '4,800,000 bytes'],
        correct: '1,440,000 bytes',
        explanation: '800 × 600 × 24 bits = 11,520,000 bits ÷ 8 = 1,440,000 bytes.'
    },
    {
        topic: 'data',
        question: 'What is sample rate in digital sound?',
        options: [
            'Number of samples taken per second',
            'The volume of the sound',
            'The length of the recording',
            'The file type'
        ],
        correct: 'Number of samples taken per second',
        explanation: 'Sample rate (measured in Hz) is how many times per second the sound wave is measured.'
    },
    {
        topic: 'data',
        question: 'What is bit depth in audio?',
        options: [
            'Number of bits used to store each sample',
            'Length of the audio file',
            'Volume level',
            'Number of audio channels'
        ],
        correct: 'Number of bits used to store each sample',
        explanation: 'Bit depth determines the precision of each sample and affects audio quality.'
    },
    {
        topic: 'data',
        question: 'What is lossy compression?',
        options: [
            'Compression that permanently removes some data',
            'Compression that keeps all original data',
            'A method that increases file size',
            'A type of encryption'
        ],
        correct: 'Compression that permanently removes some data',
        explanation: 'Lossy compression (like JPEG, MP3) removes data permanently to achieve smaller file sizes.'
    },
    {
        topic: 'data',
        question: 'What is lossless compression?',
        options: [
            'Compression that allows perfect reconstruction of original data',
            'Compression that removes some data',
            'Compression that doubles file size',
            'A type of encryption'
        ],
        correct: 'Compression that allows perfect reconstruction of original data',
        explanation: 'Lossless compression (like ZIP, PNG) reduces file size without losing any data.'
    },
    {
        topic: 'data',
        question: 'What is Run-Length Encoding (RLE)?',
        options: [
            'Lossless compression replacing repeated values with a count',
            'Lossy compression for images',
            'A type of encryption',
            'A sound format'
        ],
        correct: 'Lossless compression replacing repeated values with a count',
        explanation: 'RLE replaces sequences like "AAAAAABBB" with "6A3B" - the value and its count.'
    },
    {
        topic: 'data',
        question: 'What is the Caesar cipher?',
        options: [
            'A substitution cipher that shifts letters by a fixed amount',
            'A method to compress files',
            'A type of error detection',
            'A binary conversion method'
        ],
        correct: 'A substitution cipher that shifts letters by a fixed amount',
        explanation: 'Caesar cipher shifts each letter by a fixed number, like A→D, B→E with a shift of 3.'
    },
    {
        topic: 'data',
        question: 'What is the Vigenère cipher?',
        options: [
            'A cipher using a keyword for variable shifts',
            'A cipher that only shifts vowels',
            'A compression algorithm',
            'A binary encryption method'
        ],
        correct: 'A cipher using a keyword for variable shifts',
        explanation: 'Vigenère uses a keyword where each letter indicates a different shift amount for each position.'
    },
    {
        topic: 'data',
        question: 'What is the Rail Fence cipher?',
        options: [
            'A transposition cipher writing text in a zigzag pattern',
            'A substitution cipher like Caesar',
            'A compression method',
            'A binary encoding'
        ],
        correct: 'A transposition cipher writing text in a zigzag pattern',
        explanation: 'Rail Fence writes plaintext in a zigzag across rows (rails), then reads off row by row.'
    },
    {
        topic: 'data',
        question: 'What is the difference between a bit and a byte?',
        options: [
            'A byte is 8 bits',
            'A bit is 8 bytes',
            'They are the same',
            'A byte is 4 bits'
        ],
        correct: 'A byte is 8 bits',
        explanation: 'A bit is a single binary digit (0 or 1). A byte is 8 bits and can represent values 0-255.'
    },
    {
        topic: 'data',
        question: 'How many bytes are in a kilobyte (KB)?',
        options: ['1024 bytes', '1000 bytes', '100 bytes', '8 bytes'],
        correct: '1024 bytes',
        explanation: 'In binary terms, 1 KB = 2^10 = 1024 bytes.'
    },

    // ==========================================
    // TOPIC 4: COMPUTERS
    // ==========================================
    {
        topic: 'computers',
        question: 'What are the main components of the Von Neumann architecture?',
        options: [
            'CPU, memory, input/output, buses',
            'Keyboard, mouse, monitor only',
            'Hard drive and SSD only',
            'Internet and Wi-Fi only'
        ],
        correct: 'CPU, memory, input/output, buses',
        explanation: 'Von Neumann architecture consists of a CPU, memory (storing programs and data), I/O, and buses connecting them.'
    },
    {
        topic: 'computers',
        question: 'What are the three main parts of the CPU?',
        options: [
            'ALU, Control Unit, Registers',
            'RAM, ROM, Cache',
            'Keyboard, Mouse, Monitor',
            'Hard Drive, SSD, USB'
        ],
        correct: 'ALU, Control Unit, Registers',
        explanation: 'The CPU contains the ALU (calculations), Control Unit (directs operations), and Registers (fast storage).'
    },
    {
        topic: 'computers',
        question: 'What does the ALU do?',
        options: [
            'Performs arithmetic and logical operations',
            'Stores data permanently',
            'Connects to the internet',
            'Displays images on screen'
        ],
        correct: 'Performs arithmetic and logical operations',
        explanation: 'The Arithmetic Logic Unit performs mathematical calculations and logical comparisons.'
    },
    {
        topic: 'computers',
        question: 'What does the Control Unit do?',
        options: [
            'Coordinates and controls CPU operations',
            'Performs calculations',
            'Stores data permanently',
            'Connects peripherals'
        ],
        correct: 'Coordinates and controls CPU operations',
        explanation: 'The Control Unit fetches, decodes, and coordinates the execution of instructions.'
    },
    {
        topic: 'computers',
        question: 'What is the fetch-decode-execute cycle?',
        options: [
            'The process the CPU uses to run each instruction',
            'How files are saved to disk',
            'How the internet connects',
            'How graphics are displayed'
        ],
        correct: 'The process the CPU uses to run each instruction',
        explanation: 'The CPU fetches an instruction from memory, decodes what it means, then executes it.'
    },
    {
        topic: 'computers',
        question: 'What is clock speed?',
        options: [
            'The rate at which CPU cycles occur, measured in Hz',
            'How fast the computer boots up',
            'The speed of the hard drive',
            'The refresh rate of the monitor'
        ],
        correct: 'The rate at which CPU cycles occur, measured in Hz',
        explanation: 'Clock speed (e.g., 3.5 GHz) indicates how many cycles per second the CPU can perform.'
    },
    {
        topic: 'computers',
        question: 'How does more cache memory improve performance?',
        options: [
            'Stores frequently used data closer to the CPU for faster access',
            'Makes the computer screen brighter',
            'Increases internet speed',
            'Makes files smaller'
        ],
        correct: 'Stores frequently used data closer to the CPU for faster access',
        explanation: 'Cache is very fast memory near the CPU that stores frequently accessed data to reduce wait times.'
    },
    {
        topic: 'computers',
        question: 'How do more CPU cores improve performance?',
        options: [
            'Allow multiple instructions to be processed simultaneously',
            'Make the computer smaller',
            'Reduce power consumption',
            'Increase storage capacity'
        ],
        correct: 'Allow multiple instructions to be processed simultaneously',
        explanation: 'Multiple cores enable parallel processing, handling multiple tasks at the same time.'
    },
    {
        topic: 'computers',
        question: 'What is RAM?',
        options: [
            'Volatile memory for currently running programs',
            'Permanent storage for files',
            'The CPU\'s calculation unit',
            'A type of hard drive'
        ],
        correct: 'Volatile memory for currently running programs',
        explanation: 'RAM (Random Access Memory) stores data temporarily while programs run; it loses data when power is off.'
    },
    {
        topic: 'computers',
        question: 'What is ROM?',
        options: [
            'Non-volatile memory containing fixed data like boot instructions',
            'Memory that loses data when powered off',
            'Removable storage',
            'A type of graphics card'
        ],
        correct: 'Non-volatile memory containing fixed data like boot instructions',
        explanation: 'ROM (Read Only Memory) retains data without power, typically storing firmware/BIOS.'
    },
    {
        topic: 'computers',
        question: 'What is virtual memory?',
        options: [
            'Hard disk space used as extra RAM when RAM is full',
            'Cloud storage',
            'A type of cache',
            'Memory inside the CPU'
        ],
        correct: 'Hard disk space used as extra RAM when RAM is full',
        explanation: 'When RAM is full, the OS uses hard disk space as virtual memory, though it\'s slower.'
    },
    {
        topic: 'computers',
        question: 'What is an embedded system?',
        options: [
            'A computer system built into a device for specific tasks',
            'A portable computer',
            'A type of internet connection',
            'A removable hard drive'
        ],
        correct: 'A computer system built into a device for specific tasks',
        explanation: 'Embedded systems are dedicated computers in devices like washing machines, cars, or microwaves.'
    },
    {
        topic: 'computers',
        question: 'What is the output of an AND gate when both inputs are 1?',
        options: ['1', '0', 'Undefined', 'Error'],
        correct: '1',
        explanation: 'AND gate outputs 1 only when ALL inputs are 1.'
    },
    {
        topic: 'computers',
        question: 'What is the output of an OR gate when both inputs are 0?',
        options: ['0', '1', 'Undefined', 'Error'],
        correct: '0',
        explanation: 'OR gate outputs 0 only when ALL inputs are 0.'
    },
    {
        topic: 'computers',
        question: 'What does a NOT gate do?',
        options: [
            'Inverts the input (0→1, 1→0)',
            'Adds two inputs',
            'Stores data',
            'Compares two values'
        ],
        correct: 'Inverts the input (0→1, 1→0)',
        explanation: 'NOT gate outputs the opposite of its input: 1 becomes 0, and 0 becomes 1.'
    },
    {
        topic: 'computers',
        question: 'What is the output of XOR when both inputs are the same?',
        options: ['0', '1', 'Undefined', 'Error'],
        correct: '0',
        explanation: 'XOR (exclusive OR) outputs 1 only when inputs are DIFFERENT.'
    },
    {
        topic: 'computers',
        question: 'What is a truth table?',
        options: [
            'A table showing all possible input/output combinations for a logic circuit',
            'A database table',
            'A spreadsheet formula',
            'A type of array'
        ],
        correct: 'A table showing all possible input/output combinations for a logic circuit',
        explanation: 'Truth tables list every possible input combination and the resulting output for logic gates.'
    },
    {
        topic: 'computers',
        question: 'What is the difference between system software and application software?',
        options: [
            'System software manages hardware; application software performs user tasks',
            'They are the same thing',
            'Application software manages hardware',
            'System software is for gaming'
        ],
        correct: 'System software manages hardware; application software performs user tasks',
        explanation: 'System software (OS, drivers, utilities) manages the computer; applications are for user tasks.'
    },
    {
        topic: 'computers',
        question: 'What is the purpose of an operating system?',
        options: [
            'Manage hardware, provide user interface, run applications',
            'Only browse the internet',
            'Only play games',
            'Only store files'
        ],
        correct: 'Manage hardware, provide user interface, run applications',
        explanation: 'The OS manages memory, processes, files, security, and provides an interface between user and hardware.'
    },
    {
        topic: 'computers',
        question: 'What is utility software?',
        options: [
            'System software that performs maintenance tasks',
            'Games and entertainment',
            'Word processors',
            'Web browsers'
        ],
        correct: 'System software that performs maintenance tasks',
        explanation: 'Utilities include antivirus, disk defragmenters, backup tools - maintaining system health.'
    },
    {
        topic: 'computers',
        question: 'What is the difference between high-level and low-level languages?',
        options: [
            'High-level is human-readable; low-level is closer to machine code',
            'Low-level is easier to learn',
            'High-level runs faster',
            'They are identical'
        ],
        correct: 'High-level is human-readable; low-level is closer to machine code',
        explanation: 'High-level languages (Python, Java) are easy to read; low-level (assembly) is closer to hardware.'
    },
    {
        topic: 'computers',
        question: 'What does a compiler do?',
        options: [
            'Translates entire source code to machine code before execution',
            'Executes code line by line',
            'Compresses files',
            'Manages memory'
        ],
        correct: 'Translates entire source code to machine code before execution',
        explanation: 'Compilers translate the whole program at once, creating an executable file.'
    },
    {
        topic: 'computers',
        question: 'What does an interpreter do?',
        options: [
            'Translates and executes code line by line',
            'Translates the entire program first',
            'Compresses code',
            'Creates graphics'
        ],
        correct: 'Translates and executes code line by line',
        explanation: 'Interpreters translate and run each line in sequence, good for debugging but slower execution.'
    },
    {
        topic: 'computers',
        question: 'What does an assembler do?',
        options: [
            'Translates assembly language to machine code',
            'Translates Python to assembly',
            'Compresses files',
            'Connects to the internet'
        ],
        correct: 'Translates assembly language to machine code',
        explanation: 'Assemblers convert assembly language mnemonics (like ADD, MOV) into binary machine code.'
    },
    {
        topic: 'computers',
        question: 'What is the purpose of simulation software?',
        options: [
            'To model real-world systems for testing without risk',
            'To play video games',
            'To browse the internet',
            'To write documents'
        ],
        correct: 'To model real-world systems for testing without risk',
        explanation: 'Simulations model scenarios (flight, weather, medical) to test and train without real-world consequences.'
    },

    // ==========================================
    // TOPIC 5: NETWORKS & INTERNET
    // ==========================================
    {
        topic: 'networks',
        question: 'What is a LAN?',
        options: [
            'A network covering a small geographical area like a building',
            'A network covering a large area like a country',
            'A personal device network',
            'The internet'
        ],
        correct: 'A network covering a small geographical area like a building',
        explanation: 'LAN (Local Area Network) connects devices in a limited area like a home, office, or school.'
    },
    {
        topic: 'networks',
        question: 'What is a WAN?',
        options: [
            'A network covering a large geographical area',
            'A network in a single room',
            'A wireless phone connection',
            'A type of storage'
        ],
        correct: 'A network covering a large geographical area',
        explanation: 'WAN (Wide Area Network) spans large areas, connecting LANs across cities, countries, or continents.'
    },
    {
        topic: 'networks',
        question: 'What is a PAN?',
        options: [
            'A personal network connecting devices near one person',
            'A network for an entire country',
            'A network for large companies',
            'The global internet'
        ],
        correct: 'A personal network connecting devices near one person',
        explanation: 'PAN (Personal Area Network) connects personal devices within a few meters, like Bluetooth.'
    },
    {
        topic: 'networks',
        question: 'What is a network topology?',
        options: [
            'The physical or logical arrangement of devices in a network',
            'The speed of the network',
            'The type of cables used',
            'The number of users'
        ],
        correct: 'The physical or logical arrangement of devices in a network',
        explanation: 'Topology describes how devices are connected and arranged, like star, bus, or mesh.'
    },
    {
        topic: 'networks',
        question: 'What does a router do?',
        options: [
            'Directs data packets between different networks',
            'Stores website files',
            'Displays web pages',
            'Compresses data'
        ],
        correct: 'Directs data packets between different networks',
        explanation: 'Routers forward data packets to their destination using IP addresses and routing tables.'
    },
    {
        topic: 'networks',
        question: 'What does a WAP (Wireless Access Point) do?',
        options: [
            'Allows wireless devices to connect to a wired network',
            'Stores files wirelessly',
            'Increases internet speed',
            'Blocks viruses'
        ],
        correct: 'Allows wireless devices to connect to a wired network',
        explanation: 'WAPs create Wi-Fi networks, enabling wireless devices to access the network.'
    },
    {
        topic: 'networks',
        question: 'What is TCP/IP?',
        options: [
            'The fundamental protocol suite for internet communication',
            'A type of cable',
            'A web browser',
            'An email service'
        ],
        correct: 'The fundamental protocol suite for internet communication',
        explanation: 'TCP/IP is the set of protocols that governs how data is transmitted across the internet.'
    },
    {
        topic: 'networks',
        question: 'What does HTTP stand for?',
        options: [
            'HyperText Transfer Protocol',
            'High Tech Transfer Program',
            'Home Text Transfer Protocol',
            'Hybrid Transfer Process'
        ],
        correct: 'HyperText Transfer Protocol',
        explanation: 'HTTP is the protocol for transferring web pages between servers and browsers.'
    },
    {
        topic: 'networks',
        question: 'What makes HTTPS more secure than HTTP?',
        options: [
            'Data is encrypted using SSL/TLS',
            'It runs faster',
            'It uses fewer resources',
            'It is newer technology'
        ],
        correct: 'Data is encrypted using SSL/TLS',
        explanation: 'HTTPS encrypts data in transit, preventing eavesdropping and tampering.'
    },
    {
        topic: 'networks',
        question: 'What is FTP used for?',
        options: [
            'Transferring files between computers over a network',
            'Sending emails',
            'Browsing web pages',
            'Video calling'
        ],
        correct: 'Transferring files between computers over a network',
        explanation: 'FTP (File Transfer Protocol) is specifically designed for uploading and downloading files.'
    },
    {
        topic: 'networks',
        question: 'What is packet switching?',
        options: [
            'Data is split into packets that may take different routes',
            'Data is sent as one large block',
            'Data is stored before sending',
            'Data is compressed automatically'
        ],
        correct: 'Data is split into packets that may take different routes',
        explanation: 'In packet switching, data is divided into packets that travel independently and are reassembled.'
    },
    {
        topic: 'networks',
        question: 'What information is in a packet header?',
        options: [
            'Source/destination addresses, packet number, error check data',
            'Only the message content',
            'Only the sender\'s name',
            'Only the file size'
        ],
        correct: 'Source/destination addresses, packet number, error check data',
        explanation: 'Packet headers contain routing info, sequencing, and error detection data for proper delivery.'
    },
    {
        topic: 'networks',
        question: 'What is an IP address?',
        options: [
            'A unique numerical identifier for a device on a network',
            'A password for the internet',
            'A website name',
            'An email address'
        ],
        correct: 'A unique numerical identifier for a device on a network',
        explanation: 'IP addresses uniquely identify devices so data can be routed to the correct destination.'
    },
    {
        topic: 'networks',
        question: 'What is the difference between IPv4 and IPv6?',
        options: [
            'IPv6 uses 128 bits for more addresses; IPv4 uses 32 bits',
            'IPv4 is newer than IPv6',
            'IPv6 is slower',
            'They are identical'
        ],
        correct: 'IPv6 uses 128 bits for more addresses; IPv4 uses 32 bits',
        explanation: 'IPv6 was created because IPv4\'s 4.3 billion addresses were running out.'
    },
    {
        topic: 'networks',
        question: 'What does DNS do?',
        options: [
            'Translates domain names to IP addresses',
            'Blocks viruses',
            'Compresses web pages',
            'Stores passwords'
        ],
        correct: 'Translates domain names to IP addresses',
        explanation: 'DNS (Domain Name System) converts human-friendly names like google.com to IP addresses.'
    },
    {
        topic: 'networks',
        question: 'What is the World Wide Web?',
        options: [
            'A system of interlinked documents accessed via the internet',
            'The same as the internet',
            'A type of cable',
            'An email service'
        ],
        correct: 'A system of interlinked documents accessed via the internet',
        explanation: 'The WWW is a service on the internet - a collection of web pages linked by hyperlinks.'
    },
    {
        topic: 'networks',
        question: 'What is malware?',
        options: [
            'Malicious software designed to damage or exploit systems',
            'Anti-virus software',
            'A type of firewall',
            'A network protocol'
        ],
        correct: 'Malicious software designed to damage or exploit systems',
        explanation: 'Malware includes viruses, worms, trojans, ransomware, and spyware that harm computers.'
    },
    {
        topic: 'networks',
        question: 'What is phishing?',
        options: [
            'Fraudulent attempts to steal personal information',
            'A type of firewall',
            'A network cable',
            'A backup method'
        ],
        correct: 'Fraudulent attempts to steal personal information',
        explanation: 'Phishing uses fake emails or websites to trick users into revealing sensitive information.'
    },
    {
        topic: 'networks',
        question: 'What is a DDoS attack?',
        options: [
            'Overwhelming a server with traffic to make it unavailable',
            'Stealing passwords',
            'Encrypting files for ransom',
            'Creating fake websites'
        ],
        correct: 'Overwhelming a server with traffic to make it unavailable',
        explanation: 'Distributed Denial of Service attacks flood servers with requests from multiple sources.'
    },
    {
        topic: 'networks',
        question: 'What is a firewall?',
        options: [
            'Software/hardware that monitors and controls network traffic',
            'A virus',
            'A type of browser',
            'A backup system'
        ],
        correct: 'Software/hardware that monitors and controls network traffic',
        explanation: 'Firewalls filter network traffic based on security rules to block unauthorized access.'
    },
    {
        topic: 'networks',
        question: 'Why is it important to keep software updated?',
        options: [
            'To patch security vulnerabilities',
            'To make the computer slower',
            'To delete files',
            'To change the user interface'
        ],
        correct: 'To patch security vulnerabilities',
        explanation: 'Updates fix known security flaws that hackers could exploit; unpatched software is a security risk.'
    },
    {
        topic: 'networks',
        question: 'What is encryption?',
        options: [
            'Converting data to an unreadable form that requires a key to read',
            'Compressing files',
            'Deleting files',
            'Copying files'
        ],
        correct: 'Converting data to an unreadable form that requires a key to read',
        explanation: 'Encryption scrambles data so only authorized parties with the key can read it.'
    },

    // ==========================================
    // TOPIC 6: THE BIGGER PICTURE
    // ==========================================
    {
        topic: 'bigger-picture',
        question: 'What is e-waste?',
        options: [
            'Discarded electronic devices and components',
            'Digital files',
            'Email spam',
            'Unused software'
        ],
        correct: 'Discarded electronic devices and components',
        explanation: 'E-waste is electronic waste that can contain hazardous materials and should be recycled properly.'
    },
    {
        topic: 'bigger-picture',
        question: 'Why is e-waste an environmental concern?',
        options: [
            'It contains toxic materials and fills landfills',
            'It uses too much electricity',
            'It is too expensive',
            'It takes up internet bandwidth'
        ],
        correct: 'It contains toxic materials and fills landfills',
        explanation: 'E-waste contains hazardous substances like lead and mercury that can contaminate soil and water.'
    },
    {
        topic: 'bigger-picture',
        question: 'How do data centres impact the environment?',
        options: [
            'They consume large amounts of energy for power and cooling',
            'They produce no emissions',
            'They reduce energy use',
            'They have no impact'
        ],
        correct: 'They consume large amounts of energy for power and cooling',
        explanation: 'Data centres use significant electricity, contributing to carbon emissions if powered by fossil fuels.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is the digital divide?',
        options: [
            'The gap between those with and without access to technology',
            'A type of computer virus',
            'The difference between hardware and software',
            'A network security issue'
        ],
        correct: 'The gap between those with and without access to technology',
        explanation: 'The digital divide refers to inequality in access to computers and the internet.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is intellectual property (IP)?',
        options: [
            'Creations of the mind that can be legally protected',
            'Physical computer hardware',
            'Internet Protocol addresses',
            'Computer memory'
        ],
        correct: 'Creations of the mind that can be legally protected',
        explanation: 'IP includes inventions, designs, software, music, and art that can be copyrighted or patented.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is copyright?',
        options: [
            'Legal protection for original creative works',
            'The right to copy any file',
            'A type of software license',
            'A programming concept'
        ],
        correct: 'Legal protection for original creative works',
        explanation: 'Copyright protects creators\' rights, preventing unauthorized copying or distribution of their work.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is a software license?',
        options: [
            'A legal agreement defining how software can be used',
            'A physical key for the computer',
            'An internet connection',
            'A type of virus'
        ],
        correct: 'A legal agreement defining how software can be used',
        explanation: 'Software licenses specify terms of use, including whether software can be copied, modified, or shared.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is open source software?',
        options: [
            'Software whose source code is freely available to modify and share',
            'Software that costs money',
            'Software that cannot be modified',
            'Software only for businesses'
        ],
        correct: 'Software whose source code is freely available to modify and share',
        explanation: 'Open source allows anyone to view, modify, and distribute the source code freely.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is proprietary software?',
        options: [
            'Software owned by a company with restricted source code',
            'Free software anyone can modify',
            'Software that has expired',
            'Government software'
        ],
        correct: 'Software owned by a company with restricted source code',
        explanation: 'Proprietary software is owned by companies who keep the source code secret and control distribution.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is cybercrime?',
        options: [
            'Criminal activities carried out using computers or the internet',
            'Installing software',
            'Using social media',
            'Online shopping'
        ],
        correct: 'Criminal activities carried out using computers or the internet',
        explanation: 'Cybercrime includes hacking, fraud, identity theft, and distribution of illegal content.'
    },
    {
        topic: 'bigger-picture',
        question: 'Why is data privacy important?',
        options: [
            'To protect personal information from misuse',
            'To make computers run faster',
            'To increase storage space',
            'To improve graphics'
        ],
        correct: 'To protect personal information from misuse',
        explanation: 'Data privacy prevents identity theft, fraud, and unwanted surveillance or profiling.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is Artificial Intelligence (AI)?',
        options: [
            'Computer systems that can perform tasks requiring human intelligence',
            'A type of computer virus',
            'A programming language',
            'A type of hardware'
        ],
        correct: 'Computer systems that can perform tasks requiring human intelligence',
        explanation: 'AI enables machines to learn, make decisions, and solve problems like humans do.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is quantum computing?',
        options: [
            'Computing using quantum bits that can represent multiple states',
            'Very fast traditional computing',
            'Computing without electricity',
            'A type of cloud storage'
        ],
        correct: 'Computing using quantum bits that can represent multiple states',
        explanation: 'Quantum computers use qubits that can be in superposition, potentially solving certain problems much faster.'
    },
    {
        topic: 'bigger-picture',
        question: 'What are potential benefits of AI in healthcare?',
        options: [
            'Faster diagnosis and personalized treatment',
            'Slower medical procedures',
            'More expensive treatments',
            'Less accurate diagnoses'
        ],
        correct: 'Faster diagnosis and personalized treatment',
        explanation: 'AI can analyze medical data quickly, assist in diagnosis, and help develop personalized treatments.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is a potential risk of automation and AI?',
        options: [
            'Job displacement in certain sectors',
            'Increased employment everywhere',
            'Slower production',
            'Less accurate results'
        ],
        correct: 'Job displacement in certain sectors',
        explanation: 'Automation can replace human jobs, particularly repetitive or routine tasks, causing unemployment concerns.'
    },
    {
        topic: 'bigger-picture',
        question: 'What ethical concerns exist around facial recognition technology?',
        options: [
            'Privacy invasion and potential for mass surveillance',
            'It makes computers run slower',
            'It uses too much electricity',
            'It is too accurate'
        ],
        correct: 'Privacy invasion and potential for mass surveillance',
        explanation: 'Facial recognition raises concerns about privacy, consent, and potential government surveillance.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is nanotechnology?',
        options: [
            'Technology at the molecular or atomic scale',
            'Technology for nano-sized people',
            'Very large computers',
            'A type of software'
        ],
        correct: 'Technology at the molecular or atomic scale',
        explanation: 'Nanotechnology works with structures smaller than 100 nanometers, enabling new materials and devices.'
    },
    {
        topic: 'bigger-picture',
        question: 'How might emerging technologies affect employment?',
        options: [
            'Create new jobs while making some existing jobs obsolete',
            'Only create new jobs',
            'Only eliminate jobs',
            'Have no effect on employment'
        ],
        correct: 'Create new jobs while making some existing jobs obsolete',
        explanation: 'Technology changes the job market - eliminating some roles while creating new ones requiring different skills.'
    },
    {
        topic: 'bigger-picture',
        question: 'What is the purpose of data protection laws?',
        options: [
            'To regulate how organizations collect, store, and use personal data',
            'To make the internet faster',
            'To increase computer prices',
            'To block all websites'
        ],
        correct: 'To regulate how organizations collect, store, and use personal data',
        explanation: 'Data protection laws (like GDPR) give individuals rights over their data and hold organizations accountable.'
    },
    {
        topic: 'bigger-picture',
        question: 'What does accessibility mean in technology?',
        options: [
            'Designing technology usable by people with disabilities',
            'Making technology cheaper',
            'Making technology smaller',
            'Making technology faster'
        ],
        correct: 'Designing technology usable by people with disabilities',
        explanation: 'Accessibility ensures everyone, including those with visual, hearing, or motor impairments, can use technology.'
    }
];

// ==========================================
// FLASHCARDS - Edexcel 4CP0
// ==========================================
const FLASHCARDS = [
    // Problem Solving
    { topic: 'problem-solving', term: 'Algorithm', definition: 'A step-by-step procedure to solve a problem or complete a task' },
    { topic: 'problem-solving', term: 'Decomposition', definition: 'Breaking a complex problem into smaller, more manageable sub-problems' },
    { topic: 'problem-solving', term: 'Abstraction', definition: 'Removing unnecessary details to focus on the important information' },
    { topic: 'problem-solving', term: 'Pseudocode', definition: 'A structured way to describe an algorithm using English-like statements' },
    { topic: 'problem-solving', term: 'Flowchart', definition: 'A diagram using shapes to represent steps in an algorithm' },
    { topic: 'problem-solving', term: 'Trace Table', definition: 'A table used to track variable values as an algorithm executes' },
    { topic: 'problem-solving', term: 'Linear Search', definition: 'A search that checks each item in order until the target is found' },
    { topic: 'problem-solving', term: 'Binary Search', definition: 'A search that repeatedly divides a sorted list in half to find the target' },
    { topic: 'problem-solving', term: 'Bubble Sort', definition: 'A sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order' },
    { topic: 'problem-solving', term: 'Merge Sort', definition: 'A divide-and-conquer sorting algorithm that splits, sorts, and merges lists' },
    { topic: 'problem-solving', term: 'Syntax Error', definition: 'An error caused by breaking the rules of the programming language' },
    { topic: 'problem-solving', term: 'Logic Error', definition: 'An error where the program runs but produces incorrect results' },
    { topic: 'problem-solving', term: 'Test Data', definition: 'Data used to check if a program works correctly (normal, boundary, erroneous)' },
    
    // Programming
    { topic: 'programming', term: 'Sequence', definition: 'Code executed one line after another in order' },
    { topic: 'programming', term: 'Selection', definition: 'Code that makes decisions using IF statements' },
    { topic: 'programming', term: 'Iteration', definition: 'Code that repeats using loops (FOR, WHILE)' },
    { topic: 'programming', term: 'Variable', definition: 'A named memory location whose value can change during execution' },
    { topic: 'programming', term: 'Constant', definition: 'A named value that cannot change during program execution' },
    { topic: 'programming', term: 'Integer', definition: 'A data type that stores whole numbers' },
    { topic: 'programming', term: 'Real/Float', definition: 'A data type that stores decimal numbers' },
    { topic: 'programming', term: 'String', definition: 'A data type that stores text (sequences of characters)' },
    { topic: 'programming', term: 'Boolean', definition: 'A data type that stores only TRUE or FALSE' },
    { topic: 'programming', term: 'Character', definition: 'A data type that stores a single letter or symbol' },
    { topic: 'programming', term: 'Array', definition: 'A data structure storing multiple values of the same type under one name' },
    { topic: 'programming', term: '2D Array', definition: 'An array with rows and columns, accessed by two indices' },
    { topic: 'programming', term: 'FOR Loop', definition: 'A count-controlled loop that repeats a known number of times' },
    { topic: 'programming', term: 'WHILE Loop', definition: 'A condition-controlled loop that repeats until a condition becomes false' },
    { topic: 'programming', term: 'Function', definition: 'A subprogram that returns a value to the calling code' },
    { topic: 'programming', term: 'Procedure', definition: 'A subprogram that performs an action without returning a value' },
    { topic: 'programming', term: 'Parameter', definition: 'A value passed into a function or procedure when called' },
    { topic: 'programming', term: 'Local Variable', definition: 'A variable only accessible within the function/procedure where it is declared' },
    { topic: 'programming', term: 'Global Variable', definition: 'A variable accessible from anywhere in the program' },
    { topic: 'programming', term: 'MOD', definition: 'An operator that returns the remainder after division (e.g., 17 MOD 5 = 2)' },
    { topic: 'programming', term: 'DIV', definition: 'An operator that returns the integer quotient (e.g., 17 DIV 5 = 3)' },
    { topic: 'programming', term: 'Validation', definition: 'Checking that input data meets specified requirements' },
    { topic: 'programming', term: 'String Concatenation', definition: 'Joining two or more strings together' },
    
    // Data
    { topic: 'data', term: 'Binary', definition: 'A number system using only 0 and 1 (base-2)' },
    { topic: 'data', term: 'Denary', definition: 'The decimal number system we use daily (base-10)' },
    { topic: 'data', term: 'Hexadecimal', definition: 'A number system using 0-9 and A-F (base-16)' },
    { topic: 'data', term: 'Bit', definition: 'A single binary digit (0 or 1), the smallest unit of data' },
    { topic: 'data', term: 'Byte', definition: '8 bits of data' },
    { topic: 'data', term: 'Overflow', definition: 'When a calculation result exceeds the available number of bits' },
    { topic: 'data', term: 'Left Shift', definition: 'Moving bits left, effectively multiplying by 2' },
    { topic: 'data', term: 'Right Shift', definition: 'Moving bits right, effectively dividing by 2' },
    { topic: 'data', term: 'ASCII', definition: 'A 7-bit character encoding standard representing 128 characters' },
    { topic: 'data', term: 'Unicode', definition: 'A character encoding supporting all world languages and symbols' },
    { topic: 'data', term: 'Pixel', definition: 'The smallest unit of a digital image' },
    { topic: 'data', term: 'Resolution', definition: 'The dimensions of an image in pixels (width × height)' },
    { topic: 'data', term: 'Colour Depth', definition: 'The number of bits used to represent each pixel\'s colour' },
    { topic: 'data', term: 'Sample Rate', definition: 'Number of sound samples taken per second (measured in Hz)' },
    { topic: 'data', term: 'Bit Depth (Audio)', definition: 'Number of bits used to store each audio sample' },
    { topic: 'data', term: 'Lossy Compression', definition: 'Compression that permanently removes some data to reduce file size' },
    { topic: 'data', term: 'Lossless Compression', definition: 'Compression that allows perfect reconstruction of original data' },
    { topic: 'data', term: 'Run-Length Encoding', definition: 'Lossless compression replacing repeated values with a count' },
    { topic: 'data', term: 'Caesar Cipher', definition: 'A substitution cipher that shifts each letter by a fixed amount' },
    { topic: 'data', term: 'Vigenère Cipher', definition: 'A cipher using a keyword for variable shift amounts' },
    { topic: 'data', term: 'Rail Fence Cipher', definition: 'A transposition cipher writing text in a zigzag pattern' },
    
    // Computers
    { topic: 'computers', term: 'Von Neumann Architecture', definition: 'Computer architecture with CPU, memory, I/O, and buses' },
    { topic: 'computers', term: 'CPU', definition: 'Central Processing Unit - the brain that executes instructions' },
    { topic: 'computers', term: 'ALU', definition: 'Arithmetic Logic Unit - performs calculations and comparisons' },
    { topic: 'computers', term: 'Control Unit', definition: 'The part of CPU that coordinates and controls operations' },
    { topic: 'computers', term: 'Register', definition: 'Small, fast storage inside the CPU for temporary data' },
    { topic: 'computers', term: 'Fetch-Decode-Execute', definition: 'The cycle the CPU uses to process each instruction' },
    { topic: 'computers', term: 'Clock Speed', definition: 'The rate of CPU cycles, measured in Hz (e.g., 3.5 GHz)' },
    { topic: 'computers', term: 'Cache', definition: 'Fast memory near the CPU storing frequently accessed data' },
    { topic: 'computers', term: 'CPU Cores', definition: 'Independent processing units allowing parallel execution' },
    { topic: 'computers', term: 'RAM', definition: 'Volatile memory storing data for currently running programs' },
    { topic: 'computers', term: 'ROM', definition: 'Non-volatile memory containing permanent data like boot instructions' },
    { topic: 'computers', term: 'Virtual Memory', definition: 'Hard disk space used as extra RAM when RAM is full' },
    { topic: 'computers', term: 'Embedded System', definition: 'A computer built into a device for specific tasks' },
    { topic: 'computers', term: 'AND Gate', definition: 'Logic gate that outputs 1 only when ALL inputs are 1' },
    { topic: 'computers', term: 'OR Gate', definition: 'Logic gate that outputs 1 when ANY input is 1' },
    { topic: 'computers', term: 'NOT Gate', definition: 'Logic gate that inverts the input (0→1, 1→0)' },
    { topic: 'computers', term: 'XOR Gate', definition: 'Logic gate that outputs 1 only when inputs are DIFFERENT' },
    { topic: 'computers', term: 'Truth Table', definition: 'A table showing all possible input/output combinations for logic gates' },
    { topic: 'computers', term: 'Operating System', definition: 'Software that manages hardware and provides user interface' },
    { topic: 'computers', term: 'Utility Software', definition: 'System software for maintenance tasks (antivirus, backup, etc.)' },
    { topic: 'computers', term: 'High-Level Language', definition: 'Human-readable programming language (e.g., Python, Java)' },
    { topic: 'computers', term: 'Low-Level Language', definition: 'Language closer to machine code (assembly language)' },
    { topic: 'computers', term: 'Compiler', definition: 'Translates entire source code to machine code before execution' },
    { topic: 'computers', term: 'Interpreter', definition: 'Translates and executes code line by line' },
    { topic: 'computers', term: 'Assembler', definition: 'Translates assembly language mnemonics to machine code' },
    
    // Networks & Internet
    { topic: 'networks', term: 'LAN', definition: 'Local Area Network - covers a small area like a building' },
    { topic: 'networks', term: 'WAN', definition: 'Wide Area Network - covers large geographical areas' },
    { topic: 'networks', term: 'PAN', definition: 'Personal Area Network - connects devices near one person' },
    { topic: 'networks', term: 'Network Topology', definition: 'The arrangement of devices in a network' },
    { topic: 'networks', term: 'Router', definition: 'Device that directs data packets between networks' },
    { topic: 'networks', term: 'WAP', definition: 'Wireless Access Point - enables Wi-Fi connections' },
    { topic: 'networks', term: 'TCP/IP', definition: 'The fundamental protocol suite for internet communication' },
    { topic: 'networks', term: 'HTTP', definition: 'HyperText Transfer Protocol - for transferring web pages' },
    { topic: 'networks', term: 'HTTPS', definition: 'Secure HTTP with SSL/TLS encryption' },
    { topic: 'networks', term: 'FTP', definition: 'File Transfer Protocol - for transferring files' },
    { topic: 'networks', term: 'Packet Switching', definition: 'Data split into packets that may take different routes' },
    { topic: 'networks', term: 'IP Address', definition: 'A unique numerical identifier for devices on a network' },
    { topic: 'networks', term: 'IPv4', definition: 'IP version 4 using 32-bit addresses (4.3 billion addresses)' },
    { topic: 'networks', term: 'IPv6', definition: 'IP version 6 using 128-bit addresses (vastly more addresses)' },
    { topic: 'networks', term: 'DNS', definition: 'Domain Name System - translates domain names to IP addresses' },
    { topic: 'networks', term: 'World Wide Web', definition: 'A system of interlinked documents accessed via the internet' },
    { topic: 'networks', term: 'Malware', definition: 'Malicious software designed to damage or exploit systems' },
    { topic: 'networks', term: 'Phishing', definition: 'Fraudulent attempts to steal personal information' },
    { topic: 'networks', term: 'DDoS Attack', definition: 'Overwhelming a server with traffic to make it unavailable' },
    { topic: 'networks', term: 'Firewall', definition: 'Software/hardware that monitors and controls network traffic' },
    { topic: 'networks', term: 'Encryption', definition: 'Converting data to unreadable form requiring a key to decrypt' },
    
    // The Bigger Picture
    { topic: 'bigger-picture', term: 'E-waste', definition: 'Discarded electronic devices and components' },
    { topic: 'bigger-picture', term: 'Digital Divide', definition: 'The gap between those with and without access to technology' },
    { topic: 'bigger-picture', term: 'Intellectual Property', definition: 'Creations of the mind that can be legally protected' },
    { topic: 'bigger-picture', term: 'Copyright', definition: 'Legal protection for original creative works' },
    { topic: 'bigger-picture', term: 'Software License', definition: 'A legal agreement defining how software can be used' },
    { topic: 'bigger-picture', term: 'Open Source', definition: 'Software with source code freely available to modify and share' },
    { topic: 'bigger-picture', term: 'Proprietary Software', definition: 'Software owned by a company with restricted source code' },
    { topic: 'bigger-picture', term: 'Cybercrime', definition: 'Criminal activities using computers or the internet' },
    { topic: 'bigger-picture', term: 'Data Privacy', definition: 'The right to control how personal information is collected and used' },
    { topic: 'bigger-picture', term: 'Artificial Intelligence', definition: 'Computer systems performing tasks requiring human intelligence' },
    { topic: 'bigger-picture', term: 'Quantum Computing', definition: 'Computing using quantum bits that can represent multiple states' },
    { topic: 'bigger-picture', term: 'Nanotechnology', definition: 'Technology at the molecular or atomic scale' },
    { topic: 'bigger-picture', term: 'Accessibility', definition: 'Designing technology usable by people with disabilities' },
    { topic: 'bigger-picture', term: 'Data Protection Laws', definition: 'Regulations controlling how organizations handle personal data' }
];

console.log(`📚 Edexcel 4CP0 Question Bank Loaded: ${QUESTIONS.length} questions and ${FLASHCARDS.length} flashcards!`);
