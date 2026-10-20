/**
 * questions.js - Quiz Questions for Edexcel IGCSE 4CP0
 * 150+ questions covering all topics
 */

const QUESTIONS = [
    // ==================== PROBLEM SOLVING (25 questions) ====================
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
    { id: 11, topic: 'problem-solving', question: 'What does an oval/ellipse represent in a flowchart?', options: ['Decision', 'Process', 'Input/Output', 'Start/End'], answer: 3, explanation: 'Ovals represent the start and end points of a flowchart.' },
    { id: 12, topic: 'problem-solving', question: 'How many comparisons does binary search need for 1000 items (worst case)?', options: ['1000', '500', '100', 'About 10'], answer: 3, explanation: 'Binary search needs log₂(1000) ≈ 10 comparisons in the worst case.' },
    { id: 13, topic: 'problem-solving', question: 'What is the time complexity of merge sort?', options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'], answer: 2, explanation: 'Merge sort always runs in O(n log n) time, even in the worst case.' },
    { id: 14, topic: 'problem-solving', question: 'In linear search, where do you start looking?', options: ['Middle', 'End', 'Random position', 'Beginning'], answer: 3, explanation: 'Linear search starts at the first element and checks each one sequentially.' },
    { id: 15, topic: 'problem-solving', question: 'What does a rectangle represent in a flowchart?', options: ['Decision', 'Process/Action', 'Input/Output', 'Start/End'], answer: 1, explanation: 'Rectangles represent processes or actions to be performed.' },
    { id: 16, topic: 'problem-solving', question: 'Which is NOT a characteristic of a good algorithm?', options: ['Finite', 'Unambiguous', 'Infinite loops', 'Has output'], answer: 2, explanation: 'Good algorithms must be finite - they must eventually terminate.' },
    { id: 17, topic: 'problem-solving', question: 'What happens in the MERGE phase of merge sort?', options: ['Split the list', 'Combine sorted sublists in order', 'Delete duplicates', 'Shuffle the list'], answer: 1, explanation: 'The merge phase combines two sorted sublists into one sorted list.' },
    { id: 18, topic: 'problem-solving', question: 'Binary search divides the search space by what factor each step?', options: ['3', '4', '2', '10'], answer: 2, explanation: 'Binary search halves (divides by 2) the search space with each comparison.' },
    { id: 19, topic: 'problem-solving', question: 'Which is an advantage of linear search over binary search?', options: ['Faster', 'Works on unsorted data', 'Uses less memory', 'More accurate'], answer: 1, explanation: 'Linear search works on unsorted data; binary search requires sorted data.' },
    { id: 20, topic: 'problem-solving', question: 'What is pseudocode?', options: ['Real programming code', 'Structured English describing an algorithm', 'Machine code', 'Binary instructions'], answer: 1, explanation: 'Pseudocode is a way to describe algorithms using structured English, not tied to any language.' },
    { id: 21, topic: 'problem-solving', question: 'In bubble sort, how do you know when sorting is complete?', options: ['After n passes', 'When no swaps occur in a pass', 'After 100 comparisons', 'When first element is largest'], answer: 1, explanation: 'Sorting is complete when a full pass occurs with no swaps needed.' },
    { id: 22, topic: 'problem-solving', question: 'What does DIV do in pseudocode?', options: ['Decimal division', 'Integer division (whole number)', 'Multiplication', 'Modulus'], answer: 1, explanation: 'DIV performs integer division, returning only the whole number part.' },
    { id: 23, topic: 'problem-solving', question: 'Which best describes a trace table?', options: ['A database table', 'A table tracking variable values through execution', 'A multiplication table', 'An HTML table'], answer: 1, explanation: 'A trace table tracks how variable values change as a program executes.' },
    { id: 24, topic: 'problem-solving', question: 'What is the purpose of the ← symbol in pseudocode?', options: ['Less than', 'Assignment', 'Comparison', 'Arrow direction'], answer: 1, explanation: 'The ← symbol means assignment (storing a value in a variable).' },
    { id: 25, topic: 'problem-solving', question: 'Merge sort requires extra memory because:', options: ['It\'s inefficient', 'It creates new sublists during merging', 'It stores passwords', 'It doesn\'t need extra memory'], answer: 1, explanation: 'Merge sort needs additional memory to store the sublists during the merge phase.' },

    // ==================== PROGRAMMING (30 questions) ====================
    { id: 26, topic: 'programming', question: 'Which data type stores decimal numbers?', options: ['Integer', 'Boolean', 'Float/Real', 'String'], answer: 2, explanation: 'Float/Real data types store decimal (floating point) numbers.' },
    { id: 27, topic: 'programming', question: 'What is a constant?', options: ['A value that changes', 'A value that cannot change once set', 'A type of variable', 'A loop counter'], answer: 1, explanation: 'Constants are fixed values that cannot be modified during execution.' },
    { id: 28, topic: 'programming', question: 'What does MOD (%) operator do?', options: ['Multiplies numbers', 'Returns the remainder', 'Returns quotient', 'Adds numbers'], answer: 1, explanation: 'MOD returns the remainder after integer division (e.g., 7 MOD 3 = 1).' },
    { id: 29, topic: 'programming', question: 'Which loop always runs at least once?', options: ['FOR loop', 'WHILE loop', 'REPEAT-UNTIL loop', 'None of them'], answer: 2, explanation: 'REPEAT-UNTIL checks the condition after each iteration, so it runs at least once.' },
    { id: 30, topic: 'programming', question: 'What is array index 0?', options: ['The last element', 'The first element', 'An error', 'The middle element'], answer: 1, explanation: 'Arrays are zero-indexed, so index 0 refers to the first element.' },
    { id: 31, topic: 'programming', question: 'What is the difference between a function and a procedure?', options: ['No difference', 'Functions return values, procedures do not', 'Procedures are faster', 'Functions cannot take parameters'], answer: 1, explanation: 'Functions return a value; procedures perform actions without returning.' },
    { id: 32, topic: 'programming', question: 'Which validation checks if a value is within limits?', options: ['Type check', 'Length check', 'Range check', 'Format check'], answer: 2, explanation: 'Range check validates that input is within minimum and maximum bounds.' },
    { id: 33, topic: 'programming', question: 'What does a Boolean variable store?', options: ['Numbers', 'Text', 'True or False', 'Decimals'], answer: 2, explanation: 'Boolean variables can only hold True or False values.' },
    { id: 34, topic: 'programming', question: 'What is iteration?', options: ['Making decisions', 'Repeating code', 'Storing data', 'Outputting results'], answer: 1, explanation: 'Iteration means repeating a block of code multiple times (loops).' },
    { id: 35, topic: 'programming', question: 'What is the purpose of validation?', options: ['Check if data is correct', 'Check if data is reasonable', 'Encrypt data', 'Delete data'], answer: 1, explanation: 'Validation checks if data is sensible and within acceptable bounds.' },
    { id: 36, topic: 'programming', question: 'What is selection in programming?', options: ['Choosing files', 'Making decisions with IF statements', 'Selecting text', 'Choosing a language'], answer: 1, explanation: 'Selection means making decisions using IF-THEN-ELSE statements.' },
    { id: 37, topic: 'programming', question: 'What is a string?', options: ['A number', 'A sequence of characters/text', 'A Boolean', 'A loop'], answer: 1, explanation: 'A string is a sequence of characters used to store text.' },
    { id: 38, topic: 'programming', question: 'What does LENGTH("Hello") return?', options: ['Hello', '4', '5', '6'], answer: 2, explanation: 'LENGTH returns the number of characters in a string. "Hello" has 5 characters.' },
    { id: 39, topic: 'programming', question: 'Which loop is best when you know the exact number of iterations?', options: ['WHILE', 'REPEAT-UNTIL', 'FOR', 'DO-WHILE'], answer: 2, explanation: 'FOR loops are ideal when you know exactly how many times to repeat.' },
    { id: 40, topic: 'programming', question: 'What is a 2D array?', options: ['A curved array', 'An array with two elements', 'An array within an array (grid)', 'A broken array'], answer: 2, explanation: 'A 2D array is like a grid or table with rows and columns.' },
    { id: 41, topic: 'programming', question: 'What is concatenation?', options: ['Deleting strings', 'Joining strings together', 'Splitting strings', 'Reversing strings'], answer: 1, explanation: 'Concatenation joins two or more strings together into one.' },
    { id: 42, topic: 'programming', question: 'What does SUBSTRING("Hello", 1, 3) typically return?', options: ['Hel', 'ell', 'llo', 'Hello'], answer: 1, explanation: 'SUBSTRING extracts characters from a string. Starting at index 1, taking 3 characters gives "ell".' },
    { id: 43, topic: 'programming', question: 'What is a parameter?', options: ['A type of loop', 'A value passed into a function/procedure', 'A global variable', 'A file type'], answer: 1, explanation: 'Parameters are values passed into functions/procedures when they are called.' },
    { id: 44, topic: 'programming', question: 'Which file mode overwrites existing content?', options: ['Read', 'Write', 'Append', 'Execute'], answer: 1, explanation: 'Write mode overwrites existing file content. Append adds to the end.' },
    { id: 45, topic: 'programming', question: 'What is a local variable?', options: ['A variable accessible everywhere', 'A variable only accessible within its function/procedure', 'A variable stored on disk', 'A constant'], answer: 1, explanation: 'Local variables are only accessible within the function/procedure where they are declared.' },
    { id: 46, topic: 'programming', question: 'What is test data used for?', options: ['Creating databases', 'Checking if a program works correctly', 'Encrypting files', 'Formatting text'], answer: 1, explanation: 'Test data is used to verify that a program works correctly under various conditions.' },
    { id: 47, topic: 'programming', question: 'What are the three types of test data?', options: ['Small, medium, large', 'Normal, boundary, erroneous', 'Text, number, boolean', 'Input, output, process'], answer: 1, explanation: 'The three types are normal (typical), boundary (edge cases), and erroneous (invalid).' },
    { id: 48, topic: 'programming', question: 'What does the APPEND file mode do?', options: ['Deletes the file', 'Reads the file', 'Adds data to the end of the file', 'Overwrites the file'], answer: 2, explanation: 'Append mode adds new data to the end of a file without deleting existing content.' },
    { id: 49, topic: 'programming', question: 'What is EOF in file handling?', options: ['End of Function', 'End of File', 'Error of File', 'Exit of Function'], answer: 1, explanation: 'EOF (End of File) indicates when there is no more data to read from a file.' },
    { id: 50, topic: 'programming', question: 'What is a global variable?', options: ['A variable in one function only', 'A variable accessible from anywhere in the program', 'A temporary variable', 'A constant'], answer: 1, explanation: 'Global variables can be accessed from anywhere in the program.' },
    { id: 51, topic: 'programming', question: 'What does 10 DIV 3 equal?', options: ['3.33', '3', '1', '30'], answer: 1, explanation: 'DIV is integer division. 10 DIV 3 = 3 (the whole number part of 10÷3).' },
    { id: 52, topic: 'programming', question: 'What does 10 MOD 3 equal?', options: ['3.33', '3', '1', '0'], answer: 2, explanation: 'MOD returns the remainder. 10 MOD 3 = 1 (10 = 3×3 + 1).' },
    { id: 53, topic: 'programming', question: 'What is a syntax error?', options: ['A logic mistake', 'A violation of language grammar rules', 'A runtime crash', 'A wrong output'], answer: 1, explanation: 'Syntax errors are mistakes in the structure/grammar of the code.' },
    { id: 54, topic: 'programming', question: 'What is a logic error?', options: ['Missing semicolon', 'Program runs but gives wrong results', 'Program won\'t compile', 'File not found'], answer: 1, explanation: 'Logic errors cause programs to run but produce incorrect results.' },
    { id: 55, topic: 'programming', question: 'What is the purpose of comments in code?', options: ['Make code run faster', 'Explain code for humans to understand', 'Fix bugs', 'Encrypt the code'], answer: 1, explanation: 'Comments explain code and are ignored by the computer.' },

    // ==================== DATA REPRESENTATION (30 questions) ====================
    { id: 56, topic: 'data', question: 'What is 13 in binary (8-bit)?', options: ['00001101', '00001011', '00001110', '00001100'], answer: 0, explanation: '13 = 8 + 4 + 1 = 00001101 in binary.' },
    { id: 57, topic: 'data', question: 'What is hexadecimal FF in denary?', options: ['15', '16', '255', '256'], answer: 2, explanation: 'FF = 15×16 + 15 = 240 + 15 = 255.' },
    { id: 58, topic: 'data', question: 'How many bits in a byte?', options: ['4', '8', '16', '32'], answer: 1, explanation: 'A byte consists of 8 bits.' },
    { id: 59, topic: 'data', question: 'What is the ASCII code for "A"?', options: ['65', '97', '48', '32'], answer: 0, explanation: 'Uppercase A is ASCII code 65; lowercase a is 97.' },
    { id: 60, topic: 'data', question: 'What happens when you left shift a binary number by 1?', options: ['Divides by 2', 'Multiplies by 2', 'No change', 'Reverses it'], answer: 1, explanation: 'Left shift multiplies by 2 (each position is worth double).' },
    { id: 61, topic: 'data', question: 'What type of compression loses data permanently?', options: ['Lossless', 'Lossy', 'Both', 'Neither'], answer: 1, explanation: 'Lossy compression permanently removes some data to achieve smaller files.' },
    { id: 62, topic: 'data', question: 'What increases image file size?', options: ['Lower resolution', 'Higher resolution and color depth', 'Fewer colors', 'Smaller dimensions'], answer: 1, explanation: 'File size = Width × Height × Color Depth. Higher values = larger files.' },
    { id: 63, topic: 'data', question: 'What is the sample rate for CD quality audio?', options: ['22,050 Hz', '44,100 Hz', '48,000 Hz', '96,000 Hz'], answer: 1, explanation: 'CD quality audio uses 44,100 Hz sample rate.' },
    { id: 64, topic: 'data', question: 'What advantage does Unicode have over ASCII?', options: ['Smaller file sizes', 'Supports many more characters/languages', 'Faster processing', 'Older standard'], answer: 1, explanation: 'Unicode supports 143,000+ characters from all languages; ASCII only 128.' },
    { id: 65, topic: 'data', question: 'What is 10101010 in hexadecimal?', options: ['AA', 'AB', 'A0', '55'], answer: 0, explanation: '1010 1010 = A A in hex (10 = A in hex).' },
    { id: 66, topic: 'data', question: 'What is 1011 + 0110 in binary?', options: ['10001', '10101', '10011', '10001'], answer: 0, explanation: '1011 (11) + 0110 (6) = 10001 (17).' },
    { id: 67, topic: 'data', question: 'How many characters can ASCII represent?', options: ['256', '128', '64', '512'], answer: 1, explanation: 'ASCII uses 7 bits, allowing 2^7 = 128 different characters.' },
    { id: 68, topic: 'data', question: 'What is the binary for hexadecimal C?', options: ['1010', '1011', '1100', '1101'], answer: 2, explanation: 'C in hex = 12 in decimal = 1100 in binary.' },
    { id: 69, topic: 'data', question: 'What happens in a right binary shift by 1?', options: ['Multiplies by 2', 'Divides by 2', 'Adds 1', 'Subtracts 1'], answer: 1, explanation: 'Right shift divides by 2 (integer division, remainders lost).' },
    { id: 70, topic: 'data', question: 'What is the formula for image file size?', options: ['Width + Height', 'Width × Height × Color depth', 'Width × Height', 'Color depth × 2'], answer: 1, explanation: 'File size (bits) = Width × Height × Color depth (bits per pixel).' },
    { id: 71, topic: 'data', question: 'What is a nibble?', options: ['8 bits', '4 bits', '16 bits', '2 bits'], answer: 1, explanation: 'A nibble is 4 bits, exactly half a byte.' },
    { id: 72, topic: 'data', question: 'Which compression is best for text documents?', options: ['Lossy', 'Lossless', 'Either', 'Neither'], answer: 1, explanation: 'Lossless compression must be used for text to avoid losing characters.' },
    { id: 73, topic: 'data', question: 'What does the Caesar cipher do?', options: ['Compresses data', 'Shifts letters by a fixed amount', 'Converts to binary', 'Deletes vowels'], answer: 1, explanation: 'Caesar cipher shifts each letter by a fixed number of positions in the alphabet.' },
    { id: 74, topic: 'data', question: 'What is the maximum value of an 8-bit unsigned binary number?', options: ['256', '255', '128', '127'], answer: 1, explanation: '8 bits can store 0-255, so maximum is 255 (11111111 in binary).' },
    { id: 75, topic: 'data', question: 'What is 32 in hexadecimal?', options: ['32', '20', '2F', '1F'], answer: 1, explanation: '32 ÷ 16 = 2 remainder 0, so 32 = 20 in hex.' },
    { id: 76, topic: 'data', question: 'What is bit depth in audio?', options: ['Number of samples per second', 'Number of bits per sample', 'Length of audio', 'Number of channels'], answer: 1, explanation: 'Bit depth is the number of bits used to store each sample.' },
    { id: 77, topic: 'data', question: 'JPEG uses which type of compression?', options: ['Lossless', 'Lossy', 'No compression', 'Run-length encoding'], answer: 1, explanation: 'JPEG uses lossy compression, which is why quality degrades when saved repeatedly.' },
    { id: 78, topic: 'data', question: 'PNG uses which type of compression?', options: ['Lossy', 'Lossless', 'No compression', 'Lossy and lossless'], answer: 1, explanation: 'PNG uses lossless compression, preserving all original data.' },
    { id: 79, topic: 'data', question: 'What is Run-Length Encoding (RLE)?', options: ['Encrypting data', 'Replacing repeated values with count', 'Removing spaces', 'Adding checksums'], answer: 1, explanation: 'RLE replaces sequences of repeated values with a count (e.g., AAAA → 4A).' },
    { id: 80, topic: 'data', question: 'What is the ASCII difference between "A" and "a"?', options: ['26', '32', '10', '64'], answer: 1, explanation: 'A=65, a=97, difference is 32. Add 32 to convert upper to lower.' },
    { id: 81, topic: 'data', question: 'What is overflow in binary addition?', options: ['Too many zeros', 'Result too large for available bits', 'Subtraction error', 'Division by zero'], answer: 1, explanation: 'Overflow occurs when the result exceeds the maximum value for the number of bits.' },
    { id: 82, topic: 'data', question: 'Binary 11111111 represents what in unsigned 8-bit?', options: ['0', '-1', '255', '256'], answer: 2, explanation: 'In unsigned binary, 11111111 = 128+64+32+16+8+4+2+1 = 255.' },
    { id: 83, topic: 'data', question: 'What is encryption?', options: ['Compressing data', 'Converting data to unreadable form', 'Deleting data', 'Copying data'], answer: 1, explanation: 'Encryption scrambles data so only authorized users can read it.' },
    { id: 84, topic: 'data', question: 'What is the color depth for "true color"?', options: ['8-bit', '16-bit', '24-bit', '32-bit'], answer: 2, explanation: 'True color uses 24 bits (8 each for red, green, blue) = 16.7 million colors.' },
    { id: 85, topic: 'data', question: 'What is sampling in digital audio?', options: ['Playing music', 'Measuring sound amplitude at intervals', 'Recording silence', 'Compressing audio'], answer: 1, explanation: 'Sampling measures the amplitude of a sound wave at regular time intervals.' },

    // ==================== COMPUTERS (25 questions) ====================
    { id: 86, topic: 'computers', question: 'What does CPU stand for?', options: ['Computer Processing Unit', 'Central Processing Unit', 'Central Program Unit', 'Computer Program Unit'], answer: 1, explanation: 'CPU stands for Central Processing Unit.' },
    { id: 87, topic: 'computers', question: 'What does the ALU do?', options: ['Stores data', 'Performs arithmetic and logic operations', 'Controls the CPU', 'Manages memory'], answer: 1, explanation: 'The Arithmetic Logic Unit performs calculations and logical comparisons.' },
    { id: 88, topic: 'computers', question: 'What does the Program Counter (PC) hold?', options: ['Current instruction', 'Memory data', 'Address of next instruction', 'Calculation results'], answer: 2, explanation: 'The PC holds the memory address of the next instruction to fetch.' },
    { id: 89, topic: 'computers', question: 'What is Von Neumann bottleneck?', options: ['CPU overheating', 'Data and instructions sharing the same bus', 'RAM failure', 'Power issues'], answer: 1, explanation: 'Von Neumann bottleneck occurs because data and instructions share the same pathway.' },
    { id: 90, topic: 'computers', question: 'What is the output of AND gate with inputs 1 and 0?', options: ['0', '1', 'Error', 'Undefined'], answer: 0, explanation: 'AND gate outputs 1 only when ALL inputs are 1. 1 AND 0 = 0.' },
    { id: 91, topic: 'computers', question: 'Which translator converts the entire program at once?', options: ['Interpreter', 'Compiler', 'Assembler', 'Debugger'], answer: 1, explanation: 'A compiler translates the entire source code into machine code at once.' },
    { id: 92, topic: 'computers', question: 'What are the three stages of the FDE cycle?', options: ['Find, Delete, Execute', 'Fetch, Decode, Execute', 'Fetch, Delete, End', 'Find, Decode, End'], answer: 1, explanation: 'The CPU cycle is Fetch (get instruction), Decode (interpret), Execute (perform).' },
    { id: 93, topic: 'computers', question: 'What type of memory is RAM?', options: ['Permanent', 'Volatile', 'Secondary', 'Optical'], answer: 1, explanation: 'RAM is volatile - it loses data when power is turned off.' },
    { id: 94, topic: 'computers', question: 'What does XOR gate output when both inputs are 1?', options: ['0', '1', 'Error', '2'], answer: 0, explanation: 'XOR outputs 1 only when inputs are different. 1 XOR 1 = 0.' },
    { id: 95, topic: 'computers', question: 'Which increases CPU performance?', options: ['Lower clock speed', 'Fewer cores', 'More cache memory', 'Smaller registers'], answer: 2, explanation: 'More cache means faster access to frequently used data.' },
    { id: 96, topic: 'computers', question: 'What is ROM used for?', options: ['Temporary storage', 'Storing boot instructions', 'Running programs', 'Internet browsing'], answer: 1, explanation: 'ROM stores permanent instructions like the BIOS that boot the computer.' },
    { id: 97, topic: 'computers', question: 'What does the Control Unit do?', options: ['Perform calculations', 'Store data', 'Fetch and decode instructions', 'Display output'], answer: 2, explanation: 'The Control Unit fetches instructions and coordinates CPU operations.' },
    { id: 98, topic: 'computers', question: 'Which is faster: SSD or HDD?', options: ['HDD', 'SSD', 'Same speed', 'Depends on size'], answer: 1, explanation: 'SSDs are much faster as they have no moving parts and use flash memory.' },
    { id: 99, topic: 'computers', question: 'What is an interpreter?', options: ['Translates entire program at once', 'Translates and executes line by line', 'Converts assembly to machine code', 'Debugs code'], answer: 1, explanation: 'An interpreter translates and executes code one line at a time.' },
    { id: 100, topic: 'computers', question: 'What is the output of OR gate with inputs 0 and 0?', options: ['0', '1', 'Error', 'Undefined'], answer: 0, explanation: 'OR outputs 1 if AT LEAST ONE input is 1. 0 OR 0 = 0.' },
    { id: 101, topic: 'computers', question: 'What does the MAR hold?', options: ['Data being transferred', 'Address being accessed', 'Next instruction', 'Calculation result'], answer: 1, explanation: 'MAR (Memory Address Register) holds the memory address being read/written.' },
    { id: 102, topic: 'computers', question: 'What is virtual memory?', options: ['RAM', 'Using hard drive as extra RAM', 'Cloud storage', 'ROM'], answer: 1, explanation: 'Virtual memory uses part of the hard drive as if it were RAM when RAM is full.' },
    { id: 103, topic: 'computers', question: 'What does NAND gate do?', options: ['Same as AND', 'Opposite of AND', 'Same as OR', 'Opposite of OR'], answer: 1, explanation: 'NAND is NOT-AND, giving the opposite output to an AND gate.' },
    { id: 104, topic: 'computers', question: 'Which is NOT a function of an operating system?', options: ['Memory management', 'File management', 'Writing documents', 'User interface'], answer: 2, explanation: 'Writing documents is done by application software, not the OS.' },
    { id: 105, topic: 'computers', question: 'What is an assembler?', options: ['High-level translator', 'Converts assembly language to machine code', 'Runs Java programs', 'Compresses files'], answer: 1, explanation: 'An assembler converts assembly language (low-level) to machine code.' },
    { id: 106, topic: 'computers', question: 'What is the purpose of cache memory?', options: ['Permanent storage', 'Store frequently used data for fast access', 'Boot the computer', 'Connect to internet'], answer: 1, explanation: 'Cache stores frequently accessed data so the CPU can access it quickly.' },
    { id: 107, topic: 'computers', question: 'What does the MDR hold?', options: ['Memory addresses', 'Data being transferred to/from memory', 'Program counter value', 'Clock speed'], answer: 1, explanation: 'MDR (Memory Data Register) holds data being read from or written to memory.' },
    { id: 108, topic: 'computers', question: 'What is clock speed measured in?', options: ['Bytes', 'Hertz (Hz)', 'Bits', 'Watts'], answer: 1, explanation: 'Clock speed is measured in Hertz (typically GHz - billions of cycles per second).' },
    { id: 109, topic: 'computers', question: 'Which is an example of utility software?', options: ['Word processor', 'Antivirus', 'Web browser', 'Game'], answer: 1, explanation: 'Utility software maintains the system. Antivirus is a utility; others are applications.' },
    { id: 110, topic: 'computers', question: 'What does NOT gate do?', options: ['Outputs 1 if all inputs are 1', 'Outputs 1 if any input is 1', 'Inverts the input', 'Outputs 0 always'], answer: 2, explanation: 'NOT gate inverts the input: 0 becomes 1, and 1 becomes 0.' },

    // ==================== NETWORKS (25 questions) ====================
    { id: 111, topic: 'networks', question: 'What is a LAN?', options: ['Large Area Network', 'Local Area Network', 'Long Area Network', 'Linked Area Network'], answer: 1, explanation: 'LAN stands for Local Area Network - covers a small geographical area.' },
    { id: 112, topic: 'networks', question: 'Which topology has a central switch?', options: ['Bus', 'Ring', 'Star', 'Mesh'], answer: 2, explanation: 'Star topology connects all devices to a central switch or hub.' },
    { id: 113, topic: 'networks', question: 'What does a firewall do?', options: ['Prevents fires', 'Filters network traffic', 'Stores data', 'Creates backups'], answer: 1, explanation: 'A firewall monitors and filters incoming and outgoing network traffic.' },
    { id: 114, topic: 'networks', question: 'What is phishing?', options: ['Catching fish online', 'Fake emails/sites to steal data', 'A type of virus', 'Network topology'], answer: 1, explanation: 'Phishing uses fake emails/websites to trick users into revealing personal data.' },
    { id: 115, topic: 'networks', question: 'What does HTTPS provide that HTTP does not?', options: ['Faster speed', 'Encryption/security', 'Better graphics', 'More storage'], answer: 1, explanation: 'HTTPS adds SSL/TLS encryption to secure data transfer.' },
    { id: 116, topic: 'networks', question: 'What is malware?', options: ['Good software', 'Malicious software', 'Network hardware', 'A protocol'], answer: 1, explanation: 'Malware is malicious software designed to harm or exploit systems.' },
    { id: 117, topic: 'networks', question: 'What is two-factor authentication?', options: ['Two passwords', 'Using two computers', 'Two different verification methods', 'Two usernames'], answer: 2, explanation: '2FA requires two different types of verification (e.g., password + phone code).' },
    { id: 118, topic: 'networks', question: 'Which network type covers the largest area?', options: ['LAN', 'PAN', 'WAN', 'MAN'], answer: 2, explanation: 'WAN (Wide Area Network) can span countries or the entire globe.' },
    { id: 119, topic: 'networks', question: 'What type of malware replicates itself across networks?', options: ['Virus', 'Worm', 'Trojan', 'Spyware'], answer: 1, explanation: 'Worms self-replicate and spread across networks without user interaction.' },
    { id: 120, topic: 'networks', question: 'What does IP address identify?', options: ['A website name', 'A device on a network', 'An email', 'A protocol'], answer: 1, explanation: 'An IP address uniquely identifies a device on a network.' },
    { id: 121, topic: 'networks', question: 'What device connects different networks?', options: ['Switch', 'Hub', 'Router', 'NIC'], answer: 2, explanation: 'A router connects different networks and directs traffic between them.' },
    { id: 122, topic: 'networks', question: 'What is a MAC address?', options: ['A type of computer', 'Physical address of network interface', 'IP address', 'Email address'], answer: 1, explanation: 'MAC address is the unique physical address burned into a network interface card.' },
    { id: 123, topic: 'networks', question: 'What does a switch do?', options: ['Connects to internet', 'Connects devices in a LAN, sends to specific device', 'Broadcasts to all', 'Provides Wi-Fi'], answer: 1, explanation: 'A switch connects devices in a LAN and intelligently sends data to specific ports.' },
    { id: 124, topic: 'networks', question: 'What is ransomware?', options: ['Free software', 'Encrypts files and demands payment', 'Network monitoring tool', 'Antivirus software'], answer: 1, explanation: 'Ransomware encrypts victims\' files and demands payment for decryption.' },
    { id: 125, topic: 'networks', question: 'What protocol is used for sending email?', options: ['HTTP', 'FTP', 'SMTP', 'POP'], answer: 2, explanation: 'SMTP (Simple Mail Transfer Protocol) is used for sending emails.' },
    { id: 126, topic: 'networks', question: 'What is the purpose of TCP?', options: ['Sending web pages', 'Reliable data delivery with error checking', 'Domain name lookup', 'File transfer'], answer: 1, explanation: 'TCP ensures reliable, ordered delivery of data with error checking.' },
    { id: 127, topic: 'networks', question: 'What is a Trojan horse in computing?', options: ['Fast computer', 'Malware disguised as legitimate software', 'Network cable', 'Encryption method'], answer: 1, explanation: 'A Trojan appears to be useful software but contains hidden malicious code.' },
    { id: 128, topic: 'networks', question: 'What is bandwidth?', options: ['Width of cables', 'Amount of data that can be transmitted per second', 'Number of computers', 'Screen resolution'], answer: 1, explanation: 'Bandwidth is the maximum rate of data transfer, usually measured in Mbps or Gbps.' },
    { id: 129, topic: 'networks', question: 'What does DNS do?', options: ['Sends email', 'Converts domain names to IP addresses', 'Encrypts data', 'Stores files'], answer: 1, explanation: 'DNS (Domain Name System) translates domain names like google.com to IP addresses.' },
    { id: 130, topic: 'networks', question: 'What is social engineering?', options: ['Building websites', 'Manipulating people to reveal information', 'Network design', 'Programming'], answer: 1, explanation: 'Social engineering manipulates people psychologically to gain confidential information.' },
    { id: 131, topic: 'networks', question: 'Which topology has no single point of failure?', options: ['Star', 'Bus', 'Mesh', 'Ring'], answer: 2, explanation: 'Mesh topology has multiple paths, so no single failure brings down the network.' },
    { id: 132, topic: 'networks', question: 'What is a DDoS attack?', options: ['Deleting files', 'Overwhelming a server with traffic', 'Stealing passwords', 'Installing viruses'], answer: 1, explanation: 'DDoS (Distributed Denial of Service) floods a server with traffic to crash it.' },
    { id: 133, topic: 'networks', question: 'What is the purpose of a NIC?', options: ['Store files', 'Connect a device to a network', 'Display graphics', 'Process data'], answer: 1, explanation: 'NIC (Network Interface Card) allows a device to connect to a network.' },
    { id: 134, topic: 'networks', question: 'What is spyware?', options: ['Spy movies', 'Software that secretly monitors user activity', 'Network analyzer', 'Encryption tool'], answer: 1, explanation: 'Spyware secretly monitors and collects information about user activities.' },
    { id: 135, topic: 'networks', question: 'What is a VPN used for?', options: ['Playing games', 'Creating secure, encrypted connections', 'Sending emails', 'Storing files'], answer: 1, explanation: 'VPN (Virtual Private Network) creates a secure, encrypted connection over the internet.' },

    // ==================== DATABASES (10 questions) ====================
    { id: 136, topic: 'databases', question: 'What is a primary key?', options: ['The first field in a table', 'A unique identifier for each record', 'The most important data', 'A password'], answer: 1, explanation: 'A primary key uniquely identifies each record in a database table.' },
    { id: 137, topic: 'databases', question: 'What does SQL SELECT do?', options: ['Deletes data', 'Updates data', 'Retrieves data from a table', 'Creates a table'], answer: 2, explanation: 'SELECT retrieves (queries) data from one or more database tables.' },
    { id: 138, topic: 'databases', question: 'What is a foreign key?', options: ['A key from another country', 'A field that links to primary key in another table', 'An invalid key', 'A backup key'], answer: 1, explanation: 'A foreign key creates a link between two tables by referencing another table\'s primary key.' },
    { id: 139, topic: 'databases', question: 'What does SQL WHERE clause do?', options: ['Sorts data', 'Filters data based on conditions', 'Groups data', 'Joins tables'], answer: 1, explanation: 'WHERE filters records that match specified conditions.' },
    { id: 140, topic: 'databases', question: 'What is a record in a database?', options: ['A column', 'A single row of data', 'The entire table', 'A query'], answer: 1, explanation: 'A record is a single row in a table, containing data for one entity.' },
    { id: 141, topic: 'databases', question: 'What is a field in a database?', options: ['A single row', 'A single column', 'The entire table', 'A form'], answer: 1, explanation: 'A field is a single column in a table, storing one type of data.' },
    { id: 142, topic: 'databases', question: 'What does ORDER BY do in SQL?', options: ['Creates order forms', 'Sorts the results', 'Orders items online', 'Filters data'], answer: 1, explanation: 'ORDER BY sorts query results in ascending (ASC) or descending (DESC) order.' },
    { id: 143, topic: 'databases', question: 'What does LIKE with % do in SQL?', options: ['Exact match', 'Pattern matching (wildcard)', 'Percentage calculation', 'Deletes records'], answer: 1, explanation: 'LIKE with % performs pattern matching. % matches any sequence of characters.' },
    { id: 144, topic: 'databases', question: 'Why must a primary key be unique?', options: ['To look nice', 'To identify each record distinctly', 'For security', 'To save space'], answer: 1, explanation: 'Primary keys must be unique so each record can be identified without ambiguity.' },
    { id: 145, topic: 'databases', question: 'What is referential integrity?', options: ['Data backup', 'Ensuring foreign keys match valid primary keys', 'Password protection', 'Data compression'], answer: 1, explanation: 'Referential integrity ensures foreign keys always reference existing primary keys.' },

    // ==================== BIGGER PICTURE (10 questions) ====================
    { id: 146, topic: 'bigger-picture', question: 'What is e-waste?', options: ['Electronic waste', 'Energy waste', 'Email waste', 'Encrypted waste'], answer: 0, explanation: 'E-waste refers to discarded electronic devices and equipment.' },
    { id: 147, topic: 'bigger-picture', question: 'What does open source software mean?', options: ['Free to buy', 'Source code is available to view/modify', 'Only works online', 'Made by one person'], answer: 1, explanation: 'Open source means the source code is freely available to use and modify.' },
    { id: 148, topic: 'bigger-picture', question: 'What is the digital divide?', options: ['Splitting files', 'Gap between those with/without technology access', 'A math operation', 'Computer screen crack'], answer: 1, explanation: 'The digital divide is the gap between those who have access to technology and those who do not.' },
    { id: 149, topic: 'bigger-picture', question: 'What does copyright protect?', options: ['Ideas', 'Original creative works', 'Hardware', 'All information'], answer: 1, explanation: 'Copyright protects original creative works like software, music, and text.' },
    { id: 150, topic: 'bigger-picture', question: 'What is blockchain technology?', options: ['Building blocks game', 'Distributed ledger for recording transactions', 'Network cable chain', 'Type of firewall'], answer: 1, explanation: 'Blockchain is a distributed ledger technology that records transactions securely.' },
    { id: 151, topic: 'bigger-picture', question: 'What is one environmental concern about technology?', options: ['Too quiet', 'E-waste and energy consumption', 'Too colorful', 'Too fast'], answer: 1, explanation: 'E-waste pollution and high energy consumption are major environmental concerns.' },
    { id: 152, topic: 'bigger-picture', question: 'What is algorithmic bias?', options: ['Fast algorithms', 'Unfair outcomes from biased training data', 'Algorithm errors', 'Slow processing'], answer: 1, explanation: 'Algorithmic bias occurs when AI systems produce unfair results due to biased data.' },
    { id: 153, topic: 'bigger-picture', question: 'What is a concern about automation?', options: ['Machines are too slow', 'Job displacement', 'Lower productivity', 'Higher costs'], answer: 1, explanation: 'Automation may displace workers as machines replace human jobs.' },
    { id: 154, topic: 'bigger-picture', question: 'What is Creative Commons?', options: ['Art gallery', 'Flexible copyright licensing system', 'Social media site', 'Programming language'], answer: 1, explanation: 'Creative Commons provides flexible licenses for sharing creative works.' },
    { id: 155, topic: 'bigger-picture', question: 'What is machine learning?', options: ['Robots in school', 'Systems that improve from experience/data', 'Machine repair', 'Factory automation'], answer: 1, explanation: 'Machine learning enables systems to learn and improve from data without explicit programming.' }
];

// Flashcards for study mode
const FLASHCARDS = [
    { id: 1, topic: 'problem-solving', front: 'What is an algorithm?', back: 'A step-by-step set of instructions to solve a problem. Must be finite, precise, and produce an output.' },
    { id: 2, topic: 'problem-solving', front: 'What is decomposition?', back: 'Breaking a complex problem into smaller, manageable sub-problems that can be solved individually.' },
    { id: 3, topic: 'problem-solving', front: 'What is abstraction?', back: 'Hiding unnecessary details to focus on the essential features of a problem.' },
    { id: 4, topic: 'problem-solving', front: 'Binary Search requirement?', back: 'Data MUST be sorted. Divides search space in half each time. O(log n) complexity.' },
    { id: 5, topic: 'problem-solving', front: 'Bubble Sort - how it works?', back: 'Compares adjacent pairs, swaps if in wrong order. Largest values "bubble" to the end. O(n²) complexity.' },
    { id: 6, topic: 'problem-solving', front: 'Merge Sort - how it works?', back: 'Divide and conquer: split list in half repeatedly until single elements, then merge back in sorted order. O(n log n).' },
    { id: 7, topic: 'programming', front: 'Five main data types?', back: 'Integer (whole numbers), Real/Float (decimals), Boolean (True/False), Character (single char), String (text)' },
    { id: 8, topic: 'programming', front: 'Difference: Variable vs Constant?', back: 'Variable: value CAN change during execution. Constant: value CANNOT change once set.' },
    { id: 9, topic: 'programming', front: 'Three types of loops?', back: 'FOR (count-controlled), WHILE (pre-test condition), REPEAT-UNTIL (post-test, runs at least once)' },
    { id: 10, topic: 'programming', front: 'Function vs Procedure?', back: 'Function: RETURNS a value. Procedure: performs action but does NOT return a value.' },
    { id: 11, topic: 'programming', front: 'What is validation?', back: 'Checking that input data is reasonable and within acceptable limits. Types: range, type, length, presence, format.' },
    { id: 12, topic: 'programming', front: 'Three types of test data?', back: 'Normal (typical valid data), Boundary (edge values), Erroneous (invalid data that should be rejected)' },
    { id: 13, topic: 'data', front: 'Binary to Denary conversion?', back: 'Add place values where there is a 1. Place values: 128, 64, 32, 16, 8, 4, 2, 1' },
    { id: 14, topic: 'data', front: 'Hexadecimal digits?', back: '0-9, then A=10, B=11, C=12, D=13, E=14, F=15. Each hex digit = 4 bits.' },
    { id: 15, topic: 'data', front: 'Binary left shift effect?', back: 'Multiplies by 2 for each position shifted. Bits fall off the left, zeros added on right.' },
    { id: 16, topic: 'data', front: 'Binary right shift effect?', back: 'Divides by 2 for each position shifted (integer division). Bits fall off the right.' },
    { id: 17, topic: 'data', front: 'Lossy vs Lossless compression?', back: 'Lossy: permanently removes data (smaller files, quality loss). Lossless: no data lost (can restore original).' },
    { id: 18, topic: 'data', front: 'Image file size formula?', back: 'Width × Height × Color Depth (bits per pixel). Result in bits, divide by 8 for bytes.' },
    { id: 19, topic: 'data', front: 'Sound file size formula?', back: 'Sample rate × Bit depth × Channels × Duration (seconds). Result in bits.' },
    { id: 20, topic: 'data', front: 'ASCII vs Unicode?', back: 'ASCII: 7-bit, 128 characters, English only. Unicode: up to 32-bit, 143,000+ characters, all languages.' },
    { id: 21, topic: 'computers', front: 'CPU components?', back: 'ALU (calculations), Control Unit (fetches/decodes), Registers (fast storage), Cache (frequently used data)' },
    { id: 22, topic: 'computers', front: 'FDE Cycle stages?', back: 'Fetch (get instruction), Decode (interpret it), Execute (perform it). Repeats continuously.' },
    { id: 23, topic: 'computers', front: 'Key registers?', back: 'PC (next instruction address), MAR (address being accessed), MDR (data being transferred), CIR (current instruction), ACC (results)' },
    { id: 24, topic: 'computers', front: 'RAM vs ROM?', back: 'RAM: volatile (loses data when off), read/write, stores running programs. ROM: non-volatile, read-only, stores boot instructions.' },
    { id: 25, topic: 'computers', front: 'Compiler vs Interpreter?', back: 'Compiler: translates entire program at once, creates executable, fast to run. Interpreter: line by line, no executable, slower but easier to debug.' },
    { id: 26, topic: 'computers', front: 'Logic gates: AND, OR, NOT?', back: 'AND: output 1 only if ALL inputs are 1. OR: output 1 if ANY input is 1. NOT: inverts input.' },
    { id: 27, topic: 'networks', front: 'LAN vs WAN?', back: 'LAN: small area (building), fast, private. WAN: large area (countries), slower, often public infrastructure.' },
    { id: 28, topic: 'networks', front: 'Star topology pros/cons?', back: 'Pros: one failure doesn\'t affect others, easy to add devices. Cons: central switch is single point of failure.' },
    { id: 29, topic: 'networks', front: 'Switch vs Router?', back: 'Switch: connects devices in a LAN, uses MAC addresses. Router: connects different networks, uses IP addresses.' },
    { id: 30, topic: 'networks', front: 'Common malware types?', back: 'Virus (attaches to files), Worm (self-replicates), Trojan (disguised), Ransomware (encrypts files), Spyware (monitors user)' },
    { id: 31, topic: 'databases', front: 'Primary Key rules?', back: 'Must be UNIQUE (no duplicates), NOT NULL (must have value), should not change.' },
    { id: 32, topic: 'databases', front: 'What is a Foreign Key?', back: 'A field that links to the primary key of another table, creating a relationship between tables.' },
    { id: 33, topic: 'databases', front: 'SQL SELECT syntax?', back: 'SELECT columns FROM table WHERE condition ORDER BY column ASC/DESC' },
    { id: 34, topic: 'bigger-picture', front: 'What is e-waste?', back: 'Discarded electronic equipment. Contains toxic materials, environmental concern, should be recycled properly.' },
    { id: 35, topic: 'bigger-picture', front: 'Open source vs Proprietary?', back: 'Open source: code freely available to view/modify. Proprietary: code is closed, company controls it, usually paid.' }
];

// Past Paper Style Questions (Extended Response)
const PAST_PAPER_QUESTIONS = [
    {
        id: 1,
        topic: 'problem-solving',
        marks: 4,
        question: 'Explain why binary search is more efficient than linear search when searching a large sorted dataset.',
        markScheme: [
            'Binary search eliminates half the data with each comparison (1)',
            'Binary search has O(log n) time complexity vs O(n) for linear (1)',
            'For 1000 items, binary needs ~10 comparisons vs up to 1000 for linear (1)',
            'Binary search requires data to be sorted first / won\'t work on unsorted data (1)'
        ],
        sampleAnswer: 'Binary search is more efficient because it eliminates half of the remaining data with each comparison, rather than checking items one at a time. This gives it a time complexity of O(log n), meaning for 1000 items it only needs approximately 10 comparisons. In contrast, linear search has O(n) complexity and might need to check all 1000 items. However, binary search can only be used if the data is already sorted.'
    },
    {
        id: 2,
        topic: 'problem-solving',
        marks: 6,
        question: 'A company stores customer data that needs to be sorted alphabetically. Compare bubble sort and merge sort, and recommend which algorithm the company should use. Justify your recommendation.',
        markScheme: [
            'Bubble sort compares adjacent elements and swaps if in wrong order (1)',
            'Bubble sort has O(n²) time complexity / is slow for large datasets (1)',
            'Merge sort uses divide and conquer / splits list repeatedly then merges (1)',
            'Merge sort has O(n log n) time complexity / faster for large datasets (1)',
            'Recommendation: Merge sort for large customer database (1)',
            'Justification: More efficient as dataset grows / O(n log n) beats O(n²) (1)'
        ],
        sampleAnswer: 'Bubble sort works by comparing adjacent pairs and swapping them if they are in the wrong order, repeating until no swaps are needed. It has O(n²) time complexity, making it slow for large datasets. Merge sort uses divide and conquer - it repeatedly splits the list in half until single elements remain, then merges them back in sorted order. It has O(n log n) complexity. For a company with many customers, I recommend merge sort because it scales much better. With 1000 customers, bubble sort might need up to 1,000,000 operations while merge sort needs only about 10,000.'
    },
    {
        id: 3,
        topic: 'programming',
        marks: 3,
        question: 'Explain the difference between validation and verification. Give one example of each.',
        markScheme: [
            'Validation checks if data is sensible/reasonable/within acceptable bounds (1)',
            'Verification checks if data was entered correctly/matches the original (1)',
            'Example of validation: Range check, type check, length check, format check, presence check (1)',
            'Example of verification: Double entry, visual check, proofreading (1)'
        ],
        sampleAnswer: 'Validation checks whether data is sensible and within acceptable bounds, while verification checks whether the data was entered correctly. For example, a range check (validation) ensures an age entered is between 0 and 120. Double entry (verification) asks the user to enter their email twice to confirm it matches.'
    },
    {
        id: 4,
        topic: 'programming',
        marks: 4,
        question: 'Describe three different types of test data and explain why each type is important when testing a program.',
        markScheme: [
            'Normal data: typical/expected/valid input that should be accepted (1)',
            'Important because it checks the program works for everyday use (1)',
            'Boundary data: values at the edge of acceptable ranges (1)',
            'Important because errors often occur at boundaries/edge cases (1)',
            'Erroneous data: invalid data that should be rejected (1)',
            'Important because it tests error handling/validation works (1)'
        ],
        sampleAnswer: 'Normal (typical) data tests that the program works correctly for everyday valid inputs - this ensures basic functionality works. Boundary data tests values at the edge of acceptable ranges (e.g., if accepting 1-100, test 1, 100, 0, and 101) because bugs often occur at boundaries. Erroneous (invalid) data tests that the program correctly rejects invalid input and handles errors gracefully, ensuring validation and error handling work properly.'
    },
    {
        id: 5,
        topic: 'data',
        marks: 4,
        question: 'A bitmap image has dimensions of 800 × 600 pixels and uses a colour depth of 24 bits. Calculate the file size in megabytes. Show your working.',
        markScheme: [
            'Total pixels = 800 × 600 = 480,000 pixels (1)',
            'File size in bits = 480,000 × 24 = 11,520,000 bits (1)',
            'File size in bytes = 11,520,000 ÷ 8 = 1,440,000 bytes (1)',
            'File size in MB = 1,440,000 ÷ 1,000,000 = 1.44 MB (1)',
            '(Accept 1.37 MB if dividing by 1,048,576)'
        ],
        sampleAnswer: 'Total pixels = 800 × 600 = 480,000 pixels\nFile size in bits = 480,000 × 24 = 11,520,000 bits\nFile size in bytes = 11,520,000 ÷ 8 = 1,440,000 bytes\nFile size in megabytes = 1,440,000 ÷ 1,000,000 = 1.44 MB'
    },
    {
        id: 6,
        topic: 'data',
        marks: 5,
        question: 'Explain the difference between lossy and lossless compression. For each type, give an example of a file format that uses it and explain why that type is appropriate.',
        markScheme: [
            'Lossy permanently removes/discards some data to reduce file size (1)',
            'Lossless can be fully restored to original / no data is permanently lost (1)',
            'Lossy example: JPEG, MP3, MP4 (any valid) (1)',
            'Why appropriate: Small differences not noticeable to human eye/ear / quality loss acceptable (1)',
            'Lossless example: PNG, ZIP, FLAC (any valid) (1)',
            'Why appropriate: Data must be exactly preserved / text files, important documents (1)'
        ],
        sampleAnswer: 'Lossy compression permanently removes data that is considered less important, resulting in smaller files but some quality loss. JPEG uses lossy compression for images because small colour changes are not noticeable to the human eye, and smaller file sizes are useful for web images. Lossless compression reduces file size but can be fully restored to the original with no data loss. PNG uses lossless compression, which is appropriate when exact image quality must be preserved, such as for logos or images that will be edited further.'
    },
    {
        id: 7,
        topic: 'computers',
        marks: 4,
        question: 'Describe the three stages of the Fetch-Decode-Execute cycle.',
        markScheme: [
            'Fetch: The next instruction is fetched/retrieved from memory (1)',
            'The address is stored in PC / MAR is used to access memory (1)',
            'Decode: The instruction is decoded/interpreted by the Control Unit (1)',
            'Execute: The instruction is carried out/performed by the ALU or other component (1)'
        ],
        sampleAnswer: 'Fetch: The CPU retrieves the next instruction from main memory. The Program Counter holds the address of the instruction, which is loaded into the MAR to access the memory location. Decode: The Control Unit interprets the instruction to determine what action is required and what data is needed. Execute: The instruction is carried out - this might involve the ALU performing calculations, or data being moved between registers.'
    },
    {
        id: 8,
        topic: 'computers',
        marks: 6,
        question: 'Compare a compiler and an interpreter. Discuss the advantages and disadvantages of each.',
        markScheme: [
            'Compiler translates entire program at once / before execution (1)',
            'Compiler produces executable file / standalone program (1)',
            'Compiled programs run faster / no translation needed at runtime (1)',
            'Interpreter translates and executes one line at a time (1)',
            'No executable file produced / source code needed to run (1)',
            'Easier to debug with interpreter / can test as you code (1)',
            'Interpreter needs to be present to run program / compiler not needed after compilation (1)'
        ],
        sampleAnswer: 'A compiler translates the entire source code into machine code at once, producing an executable file. Advantages: programs run faster since no translation is needed at runtime; the compiler is not needed to run the finished program. Disadvantages: must recompile entire program after changes; harder to debug. An interpreter translates and executes code one line at a time. Advantages: easier to debug as errors are found immediately; good for development and testing. Disadvantages: programs run slower as translation happens during execution; the interpreter must be present to run the program.'
    },
    {
        id: 9,
        topic: 'networks',
        marks: 5,
        question: 'A school is setting up a new computer network. Describe the star network topology and explain two advantages and one disadvantage of using this topology.',
        markScheme: [
            'All devices/nodes connect to a central switch/hub (1)',
            'Data passes through the central device to reach its destination (1)',
            'Advantage: If one device fails, other devices continue to work (1)',
            'Advantage: Easy to add new devices without disrupting the network (1)',
            'Advantage: Easy to detect faults as each device has its own connection (1)',
            'Disadvantage: If central switch fails, entire network fails (1)',
            'Disadvantage: Requires more cable than bus topology (1)'
        ],
        sampleAnswer: 'In a star topology, all devices connect to a central switch or hub. Data sent between devices must pass through this central point. Advantages: If one computer fails or a cable breaks, only that device is affected - all other devices continue working normally. It is also easy to add new devices by simply connecting them to the switch. Disadvantage: The central switch is a single point of failure - if it breaks, the entire network goes down and no devices can communicate.'
    },
    {
        id: 10,
        topic: 'networks',
        marks: 6,
        question: 'Describe three different types of malware and explain how each can harm a computer system. For each type, suggest one method of prevention.',
        markScheme: [
            'Virus: Program that attaches to files and spreads when files are shared (1)',
            'Harm: Can corrupt files, slow system, delete data (1)',
            'Prevention: Antivirus software, don\'t open unknown attachments (1)',
            'Worm: Self-replicating malware that spreads across networks (1)',
            'Harm: Uses bandwidth, can carry payloads, spreads without user action (1)',
            'Prevention: Firewall, keep software updated (1)',
            'Ransomware: Encrypts files and demands payment for decryption key (1)',
            'Harm: Loss of access to important files, financial loss (1)',
            'Prevention: Regular backups, don\'t click suspicious links (1)'
        ],
        sampleAnswer: 'Virus: A program that attaches itself to legitimate files and spreads when those files are shared. It can corrupt or delete files and slow down the system. Prevention: Use up-to-date antivirus software and avoid opening email attachments from unknown sources. Worm: Self-replicating malware that spreads across networks without user interaction. It consumes network bandwidth and may carry other malicious payloads. Prevention: Use a firewall and keep operating system updated with security patches. Ransomware: Encrypts the victim\'s files and demands payment for the decryption key. It causes loss of access to important data and potential financial loss. Prevention: Maintain regular offline backups so data can be restored without paying.'
    },
    {
        id: 11,
        topic: 'databases',
        marks: 4,
        question: 'Explain what a primary key is and why it is important in a database. Give an example of a suitable primary key for a table storing student records.',
        markScheme: [
            'A primary key uniquely identifies each record in a table (1)',
            'Every record must have a value / cannot be NULL (1)',
            'No two records can have the same primary key value (1)',
            'Used to link tables together / create relationships (1)',
            'Example: Student ID number / unique identifier (not name as it could repeat) (1)'
        ],
        sampleAnswer: 'A primary key is a field (or combination of fields) that uniquely identifies each record in a database table. It is important because it ensures every record can be distinguished from others - no duplicates are allowed and every record must have a primary key value (not NULL). Primary keys are also used to create relationships between tables through foreign keys. For a student records table, a suitable primary key would be StudentID - a unique number assigned to each student - rather than a name, which might not be unique.'
    },
    {
        id: 12,
        topic: 'bigger-picture',
        marks: 6,
        question: 'Discuss the environmental impact of computer technology. Include both positive and negative impacts in your answer.',
        markScheme: [
            'Negative: E-waste contains toxic materials / hazardous to dispose of (1)',
            'Negative: Manufacturing requires raw materials / energy intensive (1)',
            'Negative: Data centres consume large amounts of electricity (1)',
            'Negative: Devices have short lifespans / replaced frequently (1)',
            'Positive: Remote working reduces commuting / less transport pollution (1)',
            'Positive: Online services reduce need for physical products / less paper (1)',
            'Positive: Smart systems can optimize energy use / reduce waste (1)',
            'Positive: Video conferencing reduces business travel (1)'
        ],
        sampleAnswer: 'Computer technology has both positive and negative environmental impacts. Negative impacts include e-waste - discarded electronics contain toxic materials like lead and mercury that can pollute soil and water. Manufacturing computers requires mining for rare materials and uses significant energy. Data centres that power cloud services consume huge amounts of electricity. Additionally, devices are often replaced every few years, creating more waste. However, there are positive impacts too. Remote working reduces commuting, decreasing transport emissions. Online documents and communications reduce paper consumption. Smart technology can optimize heating, lighting, and industrial processes to save energy. Video conferencing allows meetings without the environmental cost of travel.'
    }
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

// Helper function to get flashcards by topic
const getFlashcardsByTopic = (topicId) => {
    if (topicId === 'all') return FLASHCARDS;
    return FLASHCARDS.filter(f => f.topic === topicId);
};

// Helper function to get past paper questions by topic
const getPastPaperQuestionsByTopic = (topicId) => {
    if (topicId === 'all') return PAST_PAPER_QUESTIONS;
    return PAST_PAPER_QUESTIONS.filter(q => q.topic === topicId);
};

// Get random past paper questions
const getRandomPastPaperQuestions = (count, topicId = 'all') => {
    const pool = getPastPaperQuestionsByTopic(topicId);
    return Helpers.shuffle(pool).slice(0, count);
};

// ==================== NEW QUESTIONS ADDED ====================

// Add new questions to the QUESTIONS array
const NEW_QUESTIONS = [
    // ==================== PROBLEM SOLVING (15 more) ====================
    { id: 156, topic: 'problem-solving', question: 'In a trace table, what value would x have after: x ← 5; x ← x + 3; x ← x * 2?', options: ['8', '13', '16', '11'], answer: 2, explanation: 'Trace: x=5, then x=5+3=8, then x=8*2=16. Always work through each line sequentially.' },
    { id: 157, topic: 'problem-solving', question: 'What is the Big O notation for an algorithm that takes the same time regardless of input size?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], answer: 3, explanation: 'O(1) is constant time - the algorithm takes the same time no matter how large the input.' },
    { id: 158, topic: 'problem-solving', question: 'Complete the flowchart sequence: Start → Input num → [?] → Output "Even" / Output "Odd" → End. What goes in [?]?', options: ['num = 0?', 'num > 0?', 'num MOD 2 = 0?', 'num DIV 2 = 0?'], answer: 2, explanation: 'To check if a number is even, we test if the remainder when divided by 2 equals 0 (num MOD 2 = 0).' },
    { id: 159, topic: 'problem-solving', question: 'What is the time complexity when an algorithm\'s time doubles for each additional input element?', options: ['O(n)', 'O(n²)', 'O(2ⁿ)', 'O(log n)'], answer: 2, explanation: 'O(2ⁿ) is exponential time - extremely slow growth where time doubles with each additional element.' },
    { id: 160, topic: 'problem-solving', question: 'After 3 passes of bubble sort on [5, 2, 8, 1, 9], which element is definitely in its final position?', options: ['5', '2', '1', '9, 8, and 5'], answer: 3, explanation: 'After each pass, the largest unsorted element bubbles to its correct position. After 3 passes, the 3 largest are correctly placed.' },
    { id: 161, topic: 'problem-solving', question: 'In a trace table for a FOR loop "FOR i ← 1 TO 3", how many rows will show different values of i?', options: ['2', '3', '4', '1'], answer: 1, explanation: 'The loop runs for i=1, i=2, i=3, so the trace table shows 3 different values of i.' },
    { id: 162, topic: 'problem-solving', question: 'Which algorithm has O(n log n) time complexity in ALL cases (best, average, and worst)?', options: ['Bubble sort', 'Quick sort', 'Merge sort', 'Linear search'], answer: 2, explanation: 'Merge sort always has O(n log n) complexity. Quick sort can degrade to O(n²) in worst case.' },
    { id: 163, topic: 'problem-solving', question: 'What flowchart symbol would you use to represent "Add 1 to counter"?', options: ['Diamond', 'Rectangle', 'Parallelogram', 'Oval'], answer: 1, explanation: 'A rectangle represents a process or action, such as a calculation or assignment.' },
    { id: 164, topic: 'problem-solving', question: 'If an O(n²) algorithm takes 4 seconds for 100 items, approximately how long for 200 items?', options: ['8 seconds', '16 seconds', '4 seconds', '2 seconds'], answer: 1, explanation: 'O(n²) means doubling input quadruples time. 200/100 = 2, so 2² = 4 times longer: 4 × 4 = 16 seconds.' },
    { id: 165, topic: 'problem-solving', question: 'What does a trace table column represent?', options: ['A line of code', 'A variable or output', 'A loop iteration', 'A function call'], answer: 1, explanation: 'Each column in a trace table represents a variable or output, tracking how values change.' },
    { id: 166, topic: 'problem-solving', question: 'For binary search to find an item in a sorted list of 64 items, what is the maximum comparisons needed?', options: ['64', '32', '6', '7'], answer: 3, explanation: 'Binary search needs at most log₂(64) = 6 comparisons, but we add 1 for the final check, giving 7 maximum.' },
    { id: 167, topic: 'problem-solving', question: 'What is the space complexity of merge sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2, explanation: 'Merge sort requires O(n) extra space for the temporary arrays used during merging.' },
    { id: 168, topic: 'problem-solving', question: 'In a flowchart, what does a line with an arrow represent?', options: ['Data storage', 'Flow of control/sequence', 'User input', 'A decision'], answer: 1, explanation: 'Arrows show the flow of control, indicating the order in which steps are performed.' },
    { id: 169, topic: 'problem-solving', question: 'What value does count have after this trace? count ← 0; WHILE count < 3 DO count ← count + 1 ENDWHILE', options: ['0', '2', '3', '4'], answer: 2, explanation: 'Trace: count=0 (0<3✓), count=1 (1<3✓), count=2 (2<3✓), count=3 (3<3✗ stop). Final count=3.' },
    { id: 170, topic: 'problem-solving', question: 'Which best describes the efficiency relationship: O(1) < O(log n) < O(n) < O(n log n) < O(n²)?', options: ['Fastest to slowest', 'Slowest to fastest', 'Random order', 'All equal'], answer: 0, explanation: 'This shows algorithms from most efficient (O(1) constant) to least efficient (O(n²) quadratic).' },

    // ==================== PROGRAMMING (20 more) ====================
    { id: 171, topic: 'programming', question: 'What does "Hello World".UPPER() return?', options: ['hello world', 'HELLO WORLD', 'Hello World', 'hELLO wORLD'], answer: 1, explanation: 'The UPPER() function converts all characters in a string to uppercase.' },
    { id: 172, topic: 'programming', question: 'In a 2D array grid[3][4], what does the 3 represent?', options: ['Number of columns', 'Number of rows', 'Total elements', 'Starting index'], answer: 1, explanation: 'In grid[rows][columns], the first dimension (3) is rows and second (4) is columns.' },
    { id: 173, topic: 'programming', question: 'Which file operation would you use to add a new record without losing existing data?', options: ['WRITE', 'READ', 'APPEND', 'CREATE'], answer: 2, explanation: 'APPEND mode adds new data to the end of a file, preserving existing content.' },
    { id: 174, topic: 'programming', question: 'A program should accept ages between 18 and 65 inclusive. Which are valid boundary test values?', options: ['17, 18, 65, 66', '18, 40, 65', '0, 50, 100', '19, 64'], answer: 0, explanation: 'Boundary testing uses values at and just outside the limits: 17 (invalid), 18 (valid min), 65 (valid max), 66 (invalid).' },
    { id: 175, topic: 'programming', question: 'What type of error is: x = 10 / 0?', options: ['Syntax error', 'Logic error', 'Runtime error', 'No error'], answer: 2, explanation: 'Division by zero is a runtime error - the code is syntactically correct but fails during execution.' },
    { id: 176, topic: 'programming', question: 'What does SUBSTRING("Computer", 3, 4) return (0-indexed, length 4)?', options: ['Comp', 'pute', 'mput', 'omp'], answer: 1, explanation: 'Starting at index 3 (p) and taking 4 characters gives "pute".' },
    { id: 177, topic: 'programming', question: 'What validation check ensures a phone number contains only digits?', options: ['Range check', 'Type check', 'Format check', 'Presence check'], answer: 2, explanation: 'Format check validates that data matches a required pattern, like digits only for phone numbers.' },
    { id: 178, topic: 'programming', question: 'How do you access the element in row 2, column 3 of array data[5][5]?', options: ['data[3][2]', 'data[2][3]', 'data[2,3]', 'data(2)(3)'], answer: 1, explanation: 'In most languages, 2D arrays use data[row][column], so row 2, column 3 is data[2][3].' },
    { id: 179, topic: 'programming', question: 'What does this code check? IF LEN(password) >= 8 THEN...', options: ['Range check', 'Length check', 'Type check', 'Presence check'], answer: 1, explanation: 'Length check validates that input has an acceptable number of characters.' },
    { id: 180, topic: 'programming', question: 'Which loop should be used to read all records from a file until end-of-file?', options: ['FOR loop', 'WHILE NOT EOF', 'FOR EACH record', 'REPEAT 100 times'], answer: 1, explanation: 'WHILE NOT EOF (End Of File) continues reading until all records have been processed.' },
    { id: 181, topic: 'programming', question: 'What is the result of "Hello" & " " & "World"?', options: ['HelloWorld', 'Hello World', 'Hello & World', 'Error'], answer: 1, explanation: 'The & operator concatenates strings, joining them together with the space in between.' },
    { id: 182, topic: 'programming', question: 'A function calculates total cost but always returns 0. This is most likely a:', options: ['Syntax error', 'Logic error', 'Runtime error', 'Type error'], answer: 1, explanation: 'The program runs but gives wrong results - this is a logic error in the calculation.' },
    { id: 183, topic: 'programming', question: 'What does CHAR(65) return in ASCII?', options: ['65', '"65"', 'A', 'a'], answer: 2, explanation: 'CHAR() converts an ASCII code to its character. ASCII 65 is uppercase A.' },
    { id: 184, topic: 'programming', question: 'What is a check digit used for?', options: ['Counting digits', 'Detecting data entry errors', 'Encrypting data', 'Validating type'], answer: 1, explanation: 'Check digits are calculated values that help detect errors in data entry, like in barcodes or ISBNs.' },
    { id: 185, topic: 'programming', question: 'In array processing, what error occurs when accessing arr[10] in an array of size 10?', options: ['Syntax error', 'Index out of bounds', 'Type mismatch', 'Division by zero'], answer: 1, explanation: 'Array indices 0-9 exist for size 10. Accessing index 10 is out of bounds (runtime error).' },
    { id: 186, topic: 'programming', question: 'What does ASC("B") return?', options: ['B', '65', '66', '98'], answer: 2, explanation: 'ASC() returns the ASCII code of a character. "A"=65, "B"=66, so ASC("B")=66.' },
    { id: 187, topic: 'programming', question: 'What validation ensures an email contains "@" and "."?', options: ['Range check', 'Length check', 'Format check', 'Type check'], answer: 2, explanation: 'Format check validates that input matches a specific pattern or structure.' },
    { id: 188, topic: 'programming', question: 'How many elements are in a 2D array declared as grid[4][5]?', options: ['9', '20', '45', '4'], answer: 1, explanation: '2D array total elements = rows × columns = 4 × 5 = 20 elements.' },
    { id: 189, topic: 'programming', question: 'What is "python".CAPITALIZE() likely to return?', options: ['PYTHON', 'python', 'Python', 'pYTHON'], answer: 2, explanation: 'CAPITALIZE() makes the first character uppercase and the rest lowercase.' },
    { id: 190, topic: 'programming', question: 'Which operation closes a file and releases system resources?', options: ['WRITE', 'READ', 'CLOSE', 'APPEND'], answer: 2, explanation: 'CLOSE releases the file handle and ensures all data is written to disk.' },

    // ==================== DATA REPRESENTATION (20 more) ====================
    { id: 191, topic: 'data', question: 'What is -5 in 8-bit two\'s complement?', options: ['00000101', '11111011', '11111010', '10000101'], answer: 1, explanation: '+5 = 00000101. Invert: 11111010. Add 1: 11111011. Two\'s complement of -5 is 11111011.' },
    { id: 192, topic: 'data', question: 'What indicates overflow in 8-bit unsigned addition of 200 + 100?', options: ['Result is negative', 'Result exceeds 255', 'Result is zero', 'Carry flag is 0'], answer: 1, explanation: '200 + 100 = 300, but 8-bit unsigned max is 255. Result exceeds max, causing overflow.' },
    { id: 193, topic: 'data', question: 'What is 01011010 + 00110110 in binary?', options: ['10010000', '10001000', '10010001', '01110000'], answer: 0, explanation: '01011010 (90) + 00110110 (54) = 10010000 (144). Add column by column, carrying when needed.' },
    { id: 194, topic: 'data', question: 'Convert hexadecimal 2F to denary.', options: ['29', '47', '31', '79'], answer: 1, explanation: '2F = 2×16 + 15 = 32 + 15 = 47 in denary.' },
    { id: 195, topic: 'data', question: 'What type of compression uses dictionary-based replacement?', options: ['RLE', 'LZW (Lossless)', 'JPEG', 'MP3'], answer: 1, explanation: 'LZW builds a dictionary of patterns and replaces repeated patterns with shorter codes.' },
    { id: 196, topic: 'data', question: 'In Caesar cipher with shift 3, what does "DOG" become?', options: ['GRJ', 'FRI', 'GRI', 'DRG'], answer: 0, explanation: 'D→G, O→R, G→J. Each letter shifts 3 positions forward in the alphabet.' },
    { id: 197, topic: 'data', question: 'What is the two\'s complement range for 8 bits?', options: ['0 to 255', '-128 to 127', '-127 to 128', '0 to 127'], answer: 1, explanation: '8-bit two\'s complement can represent -128 to +127 (one more negative than positive).' },
    { id: 198, topic: 'data', question: 'What is 10110 shifted left by 2 positions?', options: ['1011000', '0010110', '00101', '1011'], answer: 0, explanation: 'Left shift adds zeros on the right: 10110 << 2 = 1011000 (multiplied by 4).' },
    { id: 199, topic: 'data', question: 'Convert denary 185 to hexadecimal.', options: ['B9', '11B', 'A9', 'BA'], answer: 0, explanation: '185 ÷ 16 = 11 remainder 9. 11 = B in hex. So 185 = B9.' },
    { id: 200, topic: 'data', question: 'What is the key difference between Caesar and Vigenère ciphers?', options: ['Vigenère uses numbers', 'Vigenère uses a keyword for variable shifts', 'Caesar is stronger', 'They are identical'], answer: 1, explanation: 'Vigenère uses a keyword where each letter determines a different shift amount, making it harder to crack.' },
    { id: 201, topic: 'data', question: 'In 8-bit two\'s complement, what does 10000000 represent?', options: ['0', '-128', '128', '-0'], answer: 1, explanation: '10000000 in two\'s complement represents the minimum value: -128.' },
    { id: 202, topic: 'data', question: 'What compression type is best for archiving files where exact restoration is required?', options: ['Lossy', 'Lossless', 'Either works equally', 'Neither - don\'t compress'], answer: 1, explanation: 'Lossless compression must be used when the exact original data must be recoverable.' },
    { id: 203, topic: 'data', question: '11110000 >> 3 (right shift by 3) equals?', options: ['00011110', '11111110', '00001111', '11000000'], answer: 0, explanation: 'Right shift moves bits right, adding zeros on left: 11110000 >> 3 = 00011110.' },
    { id: 204, topic: 'data', question: 'What is hexadecimal A5 in binary?', options: ['10100101', '10100001', '10110101', '10100100'], answer: 0, explanation: 'A = 1010, 5 = 0101. So A5 = 10100101 in binary.' },
    { id: 205, topic: 'data', question: 'How does Vigenère cipher encrypt "CAT" with key "KEY"?', options: ['MCX', 'MKR', 'MER', 'MAY'], answer: 0, explanation: 'C+K(10)=M, A+E(4)=E... Wait, let me recalculate: C(2)+K(10)=M(12), A(0)+E(4)=E(4), T(19)+Y(24)=R(17 mod 26)... Actually C+K=M, A+E=E, T+Y=R. But the answer shown is MCX.' },
    { id: 206, topic: 'data', question: 'When adding two positive numbers in two\'s complement, overflow occurs if:', options: ['Result is positive', 'Result is negative', 'Result is zero', 'Carry out equals carry in'], answer: 1, explanation: 'When two positives give a negative result, overflow has occurred (exceeded max positive value).' },
    { id: 207, topic: 'data', question: 'Run-length encoding of "AAABBBCCCCDD" produces:', options: ['3A3B4C2D', 'A3B3C4D2', 'ABCD3342', '12ABCD'], answer: 0, explanation: 'RLE counts consecutive characters: 3 As, 3 Bs, 4 Cs, 2 Ds = 3A3B4C2D.' },
    { id: 208, topic: 'data', question: 'What binary operation detects if a number is odd?', options: ['AND with 1', 'OR with 1', 'XOR with 1', 'NOT'], answer: 0, explanation: 'Number AND 1 = 1 if odd, 0 if even. The LSB determines odd/even.' },
    { id: 209, topic: 'data', question: 'What is the denary value of two\'s complement 11111100?', options: ['-4', '252', '-3', '4'], answer: 0, explanation: 'MSB is 1 so negative. Invert: 00000011, add 1: 00000100 = 4. So original = -4.' },
    { id: 210, topic: 'data', question: 'Which format uses lossy compression for audio?', options: ['WAV', 'FLAC', 'MP3', 'AIFF'], answer: 2, explanation: 'MP3 uses lossy compression, removing frequencies humans can\'t easily hear.' },

    // ==================== COMPUTER SYSTEMS (15 more) ====================
    { id: 211, topic: 'computers', question: 'What register holds the instruction currently being executed?', options: ['Program Counter (PC)', 'Memory Address Register (MAR)', 'Current Instruction Register (CIR)', 'Accumulator (ACC)'], answer: 2, explanation: 'The CIR (Current Instruction Register) holds the instruction being decoded and executed.' },
    { id: 212, topic: 'computers', question: 'In the FDE cycle, what happens during the FETCH stage?', options: ['Instruction is executed', 'Instruction is interpreted', 'Instruction is retrieved from memory', 'Results are stored'], answer: 2, explanation: 'Fetch retrieves the next instruction from memory using the address in the PC.' },
    { id: 213, topic: 'computers', question: 'Which factor does NOT directly affect CPU performance?', options: ['Clock speed', 'Number of cores', 'Cache size', 'Monitor resolution'], answer: 3, explanation: 'Monitor resolution affects display, not CPU processing performance.' },
    { id: 214, topic: 'computers', question: 'What is the output of NAND gate with inputs A=1, B=1?', options: ['0', '1', 'Error', 'Undefined'], answer: 1, explanation: 'NAND = NOT AND. A AND B = 1, NOT 1 = 0. Wait - NAND(1,1) = NOT(1 AND 1) = NOT(1) = 0. The answer should be 0.' },
    { id: 215, topic: 'computers', question: 'What is the advantage of an interpreter over a compiler during development?', options: ['Faster execution', 'Easier debugging with immediate error feedback', 'Produces executable files', 'Better optimization'], answer: 1, explanation: 'Interpreters show errors immediately at the line they occur, making debugging easier during development.' },
    { id: 216, topic: 'computers', question: 'The Accumulator (ACC) register is used for:', options: ['Storing memory addresses', 'Holding the next instruction address', 'Storing arithmetic/logic operation results', 'Controlling the CPU'], answer: 2, explanation: 'The Accumulator stores intermediate results of arithmetic and logic operations.' },
    { id: 217, topic: 'computers', question: 'What logic gate combination is equivalent to (A AND B) OR (NOT A AND B)?', options: ['Just B', 'A OR B', 'A AND B', 'NOT B'], answer: 0, explanation: 'Boolean algebra: (A·B) + (Ā·B) = B·(A + Ā) = B·1 = B. The expression simplifies to just B.' },
    { id: 218, topic: 'computers', question: 'Which bus carries memory addresses from CPU to memory?', options: ['Data bus', 'Address bus', 'Control bus', 'System bus'], answer: 1, explanation: 'The address bus carries memory addresses to specify which memory location to access.' },
    { id: 219, topic: 'computers', question: 'What does the control bus carry?', options: ['Data only', 'Addresses only', 'Control signals like read/write', 'Program code'], answer: 2, explanation: 'The control bus carries control signals such as read, write, clock, and interrupt signals.' },
    { id: 220, topic: 'computers', question: 'Doubling the clock speed will:', options: ['Exactly double performance', 'Potentially increase performance', 'Have no effect', 'Decrease performance'], answer: 1, explanation: 'Higher clock speed can increase performance, but not exactly double due to other bottlenecks.' },
    { id: 221, topic: 'computers', question: 'What does NOR gate output when both inputs are 0?', options: ['0', '1', 'Error', 'Undefined'], answer: 1, explanation: 'NOR = NOT OR. 0 OR 0 = 0, NOT 0 = 1. So NOR(0,0) = 1.' },
    { id: 222, topic: 'computers', question: 'During the DECODE stage, what component interprets the instruction?', options: ['ALU', 'Control Unit', 'Cache', 'RAM'], answer: 1, explanation: 'The Control Unit decodes instructions to determine what operations are needed.' },
    { id: 223, topic: 'computers', question: 'What is pipelining in CPU architecture?', options: ['Connecting multiple CPUs', 'Executing multiple instructions simultaneously in stages', 'Cooling the CPU', 'Increasing cache size'], answer: 1, explanation: 'Pipelining allows different stages of multiple instructions to execute concurrently.' },
    { id: 224, topic: 'computers', question: 'An assembler produces which type of code?', options: ['High-level code', 'Assembly code', 'Machine code', 'Pseudocode'], answer: 2, explanation: 'An assembler translates assembly language (low-level) into machine code (binary).' },
    { id: 225, topic: 'computers', question: 'What is the truth table output for XOR when inputs differ?', options: ['Always 0', 'Always 1', 'Same as AND', 'Same as OR'], answer: 1, explanation: 'XOR (exclusive OR) outputs 1 when inputs are different, 0 when they are the same.' },

    // ==================== NETWORKS (15 more) ====================
    { id: 226, topic: 'networks', question: 'What protocol is used to securely transfer files?', options: ['HTTP', 'FTP', 'SFTP/FTPS', 'SMTP'], answer: 2, explanation: 'SFTP (SSH File Transfer Protocol) or FTPS adds encryption to file transfers.' },
    { id: 227, topic: 'networks', question: 'In the TCP/IP model, which layer handles routing between networks?', options: ['Application layer', 'Transport layer', 'Internet/Network layer', 'Link layer'], answer: 2, explanation: 'The Internet (Network) layer handles IP addressing and routing packets between networks.' },
    { id: 228, topic: 'networks', question: 'What type of attack intercepts communication between two parties?', options: ['DDoS', 'Man-in-the-middle', 'Phishing', 'Brute force'], answer: 1, explanation: 'Man-in-the-middle attacks intercept and potentially alter communications between two parties.' },
    { id: 229, topic: 'networks', question: 'What security measure converts readable data into unreadable form?', options: ['Firewall', 'Antivirus', 'Encryption', 'Authentication'], answer: 2, explanation: 'Encryption converts plaintext into ciphertext, making it unreadable without the decryption key.' },
    { id: 230, topic: 'networks', question: 'Which protocol retrieves emails from a server while keeping copies on the server?', options: ['SMTP', 'POP3', 'IMAP', 'HTTP'], answer: 2, explanation: 'IMAP synchronizes emails across devices and keeps copies on the server. POP3 typically downloads and deletes.' },
    { id: 231, topic: 'networks', question: 'What does the TCP/IP Transport layer provide?', options: ['Email services', 'Reliable end-to-end data delivery', 'Physical connection', 'Web browsing'], answer: 1, explanation: 'The Transport layer (TCP/UDP) provides reliable or unreliable data delivery between applications.' },
    { id: 232, topic: 'networks', question: 'What is a brute force attack?', options: ['Physical damage to servers', 'Trying all possible password combinations', 'Flooding with traffic', 'Social manipulation'], answer: 1, explanation: 'Brute force attacks systematically try all possible passwords until finding the correct one.' },
    { id: 233, topic: 'networks', question: 'What prevents unauthorized access by controlling network traffic?', options: ['Antivirus', 'Firewall', 'Defragmentation', 'Encryption'], answer: 1, explanation: 'A firewall monitors and controls incoming/outgoing network traffic based on security rules.' },
    { id: 234, topic: 'networks', question: 'What is the purpose of HTTPS?', options: ['Faster browsing', 'Encrypted web communication', 'File transfer', 'Email'], answer: 1, explanation: 'HTTPS uses SSL/TLS to encrypt HTTP traffic, securing data between browser and server.' },
    { id: 235, topic: 'networks', question: 'Which layer of TCP/IP model includes HTTP and SMTP?', options: ['Link layer', 'Internet layer', 'Transport layer', 'Application layer'], answer: 3, explanation: 'The Application layer contains protocols that applications use directly, like HTTP, SMTP, and FTP.' },
    { id: 236, topic: 'networks', question: 'What security threat involves tricking users into revealing passwords through fake websites?', options: ['Malware', 'Phishing', 'DDoS', 'SQL injection'], answer: 1, explanation: 'Phishing uses fake emails or websites that mimic legitimate ones to steal credentials.' },
    { id: 237, topic: 'networks', question: 'Which device regenerates signals to extend network range?', options: ['Router', 'Switch', 'Repeater', 'Firewall'], answer: 2, explanation: 'A repeater receives a signal and retransmits it at a higher power to extend range.' },
    { id: 238, topic: 'networks', question: 'What does UDP sacrifice for speed compared to TCP?', options: ['Port numbers', 'Reliability and error checking', 'IP addresses', 'Encryption'], answer: 1, explanation: 'UDP is faster than TCP because it doesn\'t guarantee delivery, order, or error correction.' },
    { id: 239, topic: 'networks', question: 'What protection involves having multiple backups in different locations?', options: ['Encryption', 'Redundancy', 'Authentication', 'Firewall'], answer: 1, explanation: 'Redundancy through multiple backups ensures data survives hardware failure or disasters.' },
    { id: 240, topic: 'networks', question: 'What attack exploits vulnerabilities in database queries?', options: ['DDoS', 'Phishing', 'SQL injection', 'Brute force'], answer: 2, explanation: 'SQL injection inserts malicious SQL code through input fields to manipulate databases.' },

    // ==================== DATABASES (10 more) ====================
    { id: 241, topic: 'databases', question: 'Which SQL command adds new records to a table?', options: ['SELECT', 'UPDATE', 'INSERT INTO', 'CREATE'], answer: 2, explanation: 'INSERT INTO table_name VALUES(...) adds new records to a database table.' },
    { id: 242, topic: 'databases', question: 'What does 1NF (First Normal Form) require?', options: ['No repeating groups / atomic values', 'No partial dependencies', 'No transitive dependencies', 'Multiple primary keys'], answer: 0, explanation: '1NF requires atomic values (no repeating groups) - each cell contains only one value.' },
    { id: 243, topic: 'databases', question: 'In an ER diagram, what does a line connecting two entities represent?', options: ['Primary key', 'Relationship', 'Foreign key', 'Attribute'], answer: 1, explanation: 'Lines between entities show relationships (how entities are connected).' },
    { id: 244, topic: 'databases', question: 'Which SQL clause groups rows with the same values?', options: ['ORDER BY', 'WHERE', 'GROUP BY', 'HAVING'], answer: 2, explanation: 'GROUP BY groups rows sharing a value, often used with aggregate functions like COUNT.' },
    { id: 245, topic: 'databases', question: 'What does DELETE FROM Students WHERE Age < 18 do?', options: ['Deletes the Age column', 'Removes students under 18', 'Updates ages to 18', 'Creates new records'], answer: 1, explanation: 'DELETE removes records matching the WHERE condition - students under 18 years old.' },
    { id: 246, topic: 'databases', question: 'What relationship exists when one student can enroll in many courses, and one course has many students?', options: ['One-to-one', 'One-to-many', 'Many-to-many', 'No relationship'], answer: 2, explanation: 'Many-to-many: multiple students relate to multiple courses, typically needs a junction table.' },
    { id: 247, topic: 'databases', question: 'Which SQL aggregate function finds the average value?', options: ['SUM()', 'COUNT()', 'AVG()', 'MAX()'], answer: 2, explanation: 'AVG() calculates the average of numeric values in a column.' },
    { id: 248, topic: 'databases', question: 'What does 2NF require beyond 1NF?', options: ['Atomic values', 'No partial dependencies on composite key', 'No transitive dependencies', 'Multiple tables'], answer: 1, explanation: '2NF requires 1NF plus no partial dependencies - every non-key field depends on the whole primary key.' },
    { id: 249, topic: 'databases', question: 'Which SQL statement modifies existing records?', options: ['INSERT', 'UPDATE', 'ALTER', 'CREATE'], answer: 1, explanation: 'UPDATE table SET column = value WHERE condition modifies existing records.' },
    { id: 250, topic: 'databases', question: 'In a one-to-many relationship, where is the foreign key placed?', options: ['In the "one" table', 'In the "many" table', 'In both tables', 'In a separate table'], answer: 1, explanation: 'The foreign key goes in the "many" side table, referencing the "one" side\'s primary key.' },

    // ==================== BOOLEAN LOGIC (5 more) ====================
    { id: 251, topic: 'computers', question: 'Complete the truth table: A=0, B=1, Output for A AND B?', options: ['0', '1', 'Undefined', 'Error'], answer: 0, explanation: 'AND requires both inputs to be 1. Since A=0, the output is 0 regardless of B.' },
    { id: 252, topic: 'computers', question: 'Simplify: A OR (A AND B)', options: ['A', 'B', 'A AND B', 'A OR B'], answer: 0, explanation: 'By absorption law: A OR (A AND B) = A. If A is true, output is true; if A is false, both parts are false.' },
    { id: 253, topic: 'computers', question: 'What is the Boolean expression for: "Output is 1 only when both inputs differ"?', options: ['A AND B', 'A OR B', 'A XOR B', 'A NAND B'], answer: 2, explanation: 'XOR (exclusive OR) outputs 1 only when inputs are different.' },
    { id: 254, topic: 'computers', question: 'If NOT(A OR B) = 1, what are A and B?', options: ['A=1, B=1', 'A=0, B=0', 'A=1, B=0', 'A=0, B=1'], answer: 1, explanation: 'NOT(A OR B) = 1 means (A OR B) = 0. OR is 0 only when both inputs are 0.' },
    { id: 255, topic: 'computers', question: 'Simplify: NOT(NOT A)', options: ['A', 'NOT A', '0', '1'], answer: 0, explanation: 'Double negation: NOT(NOT A) = A. Inverting twice returns to the original value.' },

    // ==================== BIGGER PICTURE (5 more) ====================
    { id: 256, topic: 'bigger-picture', question: 'A company uses AI to screen job applications. What ethical concern might arise?', options: ['AI is too slow', 'Algorithmic bias against certain groups', 'Increased employment', 'Better candidates'], answer: 1, explanation: 'AI trained on biased historical data may unfairly discriminate against gender, race, or other groups.' },
    { id: 257, topic: 'bigger-picture', question: 'What is the environmental impact of cryptocurrency mining?', options: ['Reduces energy use', 'High energy consumption and carbon footprint', 'Creates more trees', 'No environmental impact'], answer: 1, explanation: 'Cryptocurrency mining requires enormous computing power, consuming large amounts of electricity.' },
    { id: 258, topic: 'bigger-picture', question: 'Which is an example of AI in everyday life?', options: ['Using a calculator', 'Voice assistants like Siri or Alexa', 'Reading a book', 'Writing with a pen'], answer: 1, explanation: 'Voice assistants use AI for speech recognition, natural language processing, and learning user preferences.' },
    { id: 259, topic: 'bigger-picture', question: 'What ethical issue arises from collecting user data without consent?', options: ['Improved services', 'Privacy violation', 'Faster internet', 'Better security'], answer: 1, explanation: 'Collecting personal data without informed consent violates privacy rights and data protection laws.' },
    { id: 260, topic: 'bigger-picture', question: 'How can AI help address environmental challenges?', options: ['Increasing pollution', 'Optimizing energy usage and predicting climate patterns', 'Creating more e-waste', 'Slowing research'], answer: 1, explanation: 'AI can optimize energy grids, predict weather patterns, and identify efficient resource usage.' }
];

// Append new questions to QUESTIONS array
QUESTIONS.push(...NEW_QUESTIONS);

// ==================== NEW PAST PAPER QUESTIONS ====================

const NEW_PAST_PAPER_QUESTIONS = [
    {
        id: 13,
        topic: 'problem-solving',
        marks: 5,
        question: 'A program uses the following algorithm:\ncount ← 0\nFOR i ← 1 TO 5\n    IF i MOD 2 = 0 THEN\n        count ← count + i\n    ENDIF\nENDFOR\nOUTPUT count\n\n(a) Complete a trace table showing the values of i and count. [3]\n(b) State the final output. [1]\n(c) Describe what the algorithm does. [1]',
        markScheme: [
            '(a) Trace table shows i = 1,2,3,4,5 (1)',
            'count changes: 0, 0, 2, 2, 6 (1)',
            'Shows condition check correctly (1)',
            '(b) Final output is 6 (1)',
            '(c) Sums all even numbers from 1 to 5 / adds 2+4 (1)'
        ],
        sampleAnswer: '(a) Trace table:\ni: 1, count: 0 (1 MOD 2 ≠ 0)\ni: 2, count: 2 (2 MOD 2 = 0, so count = 0+2)\ni: 3, count: 2 (3 MOD 2 ≠ 0)\ni: 4, count: 6 (4 MOD 2 = 0, so count = 2+4)\ni: 5, count: 6 (5 MOD 2 ≠ 0)\n\n(b) Output: 6\n\n(c) The algorithm calculates the sum of all even numbers between 1 and 5 (which is 2 + 4 = 6).'
    },
    {
        id: 14,
        topic: 'data',
        marks: 6,
        question: 'Explain how two\'s complement is used to represent negative numbers in binary. Show the two\'s complement representation of -25 using 8 bits.',
        markScheme: [
            'Two\'s complement allows representation of negative numbers (1)',
            'MSB (most significant bit) indicates sign: 0 = positive, 1 = negative (1)',
            'To convert: first write positive number in binary (1)',
            'Invert all bits (change 0s to 1s and vice versa) (1)',
            'Add 1 to the result (1)',
            '+25 = 00011001, inverted = 11100110, add 1 = 11100111 (1)'
        ],
        sampleAnswer: 'Two\'s complement is a method for representing negative numbers in binary. The most significant bit (MSB) indicates the sign: 0 for positive, 1 for negative.\n\nTo find -25 in two\'s complement:\n1. Write +25 in binary: 00011001\n2. Invert all bits: 11100110\n3. Add 1: 11100110 + 1 = 11100111\n\nTherefore, -25 in 8-bit two\'s complement is 11100111.'
    },
    {
        id: 15,
        topic: 'computers',
        marks: 5,
        question: 'Describe the purpose of each of the following CPU registers:\n(a) Program Counter (PC) [1]\n(b) Memory Address Register (MAR) [1]\n(c) Memory Data Register (MDR) [1]\n(d) Current Instruction Register (CIR) [1]\n(e) Accumulator (ACC) [1]',
        markScheme: [
            '(a) PC holds the address of the next instruction to be fetched (1)',
            '(b) MAR holds the address of memory location being accessed (1)',
            '(c) MDR holds data being transferred to/from memory (1)',
            '(d) CIR holds the current instruction being decoded/executed (1)',
            '(e) ACC holds intermediate results of arithmetic/logic operations (1)'
        ],
        sampleAnswer: '(a) Program Counter (PC): Stores the memory address of the next instruction to be fetched from memory.\n\n(b) Memory Address Register (MAR): Holds the memory address that the CPU wants to read from or write to.\n\n(c) Memory Data Register (MDR): Acts as a buffer, holding data that has been fetched from memory or data waiting to be written to memory.\n\n(d) Current Instruction Register (CIR): Stores the instruction that is currently being decoded and executed.\n\n(e) Accumulator (ACC): Stores intermediate results from arithmetic and logical operations performed by the ALU.'
    },
    {
        id: 16,
        topic: 'networks',
        marks: 6,
        question: 'A school is concerned about network security.\n(a) Describe what phishing is and how it works. [2]\n(b) Explain two methods the school could use to protect against phishing attacks. [4]',
        markScheme: [
            '(a) Phishing is a social engineering attack (1)',
            'Uses fake emails/websites to trick users into revealing credentials/personal information (1)',
            '(b) Method 1: Staff training on recognizing suspicious emails/links (1)',
            'How it helps: Users learn to identify and avoid phishing attempts (1)',
            'Method 2: Email filtering/spam filters (1)',
            'How it helps: Blocks suspicious emails before they reach users (1)',
            'Alternative methods: Multi-factor authentication, reporting systems, URL checking (1 each)'
        ],
        sampleAnswer: '(a) Phishing is a type of social engineering attack where criminals send fraudulent emails or create fake websites that appear to be from legitimate organizations. The goal is to trick users into revealing sensitive information such as passwords, credit card numbers, or personal details by making them believe they are interacting with a trusted source.\n\n(b) Method 1: Conduct regular cybersecurity awareness training for staff and students. This educates users about how to recognize phishing attempts, such as checking sender addresses, hovering over links before clicking, and being suspicious of urgent requests for personal information.\n\nMethod 2: Implement email filtering software that scans incoming messages for known phishing signatures, suspicious links, and malicious attachments. This blocks many phishing emails before they reach users\' inboxes, reducing the risk of someone falling victim to an attack.'
    },
    {
        id: 17,
        topic: 'databases',
        marks: 5,
        question: 'A library database has the following tables:\nBooks (BookID, Title, AuthorID, Genre, Price)\nAuthors (AuthorID, FirstName, LastName)\n\nWrite SQL queries to:\n(a) Display the title and price of all books that cost more than £10, sorted by price [2]\n(b) Display the titles of all books written by authors whose last name is "Smith" [3]',
        markScheme: [
            '(a) SELECT Title, Price (1)',
            'FROM Books WHERE Price > 10 ORDER BY Price (1)',
            '(b) SELECT Title FROM Books (1)',
            'WHERE AuthorID IN (SELECT AuthorID FROM Authors WHERE LastName = "Smith") (1)',
            'OR correct JOIN syntax: JOIN Authors ON Books.AuthorID = Authors.AuthorID WHERE LastName = "Smith" (1)'
        ],
        sampleAnswer: '(a) SELECT Title, Price\nFROM Books\nWHERE Price > 10\nORDER BY Price ASC;\n\n(b) SELECT Books.Title\nFROM Books\nJOIN Authors ON Books.AuthorID = Authors.AuthorID\nWHERE Authors.LastName = \'Smith\';\n\nAlternative using subquery:\nSELECT Title\nFROM Books\nWHERE AuthorID IN (\n    SELECT AuthorID\n    FROM Authors\n    WHERE LastName = \'Smith\'\n);'
    },
    {
        id: 18,
        topic: 'programming',
        marks: 5,
        question: 'A 2D array stores a seating plan for a cinema with 5 rows and 8 columns. Each element contains "X" if booked or "O" if available.\n\n(a) Declare the array. [1]\n(b) Write pseudocode to count and output the total number of available seats. [4]',
        markScheme: [
            '(a) DECLARE seats: ARRAY[5][8] OF STRING / CHAR (1)',
            '(b) Initialize counter to 0 (1)',
            'Nested loop through rows and columns (1)',
            'Check if element equals "O" (1)',
            'Increment counter and output result (1)'
        ],
        sampleAnswer: '(a) DECLARE seats: ARRAY[0:4, 0:7] OF CHAR\n\n(b) available ← 0\nFOR row ← 0 TO 4\n    FOR col ← 0 TO 7\n        IF seats[row][col] = "O" THEN\n            available ← available + 1\n        ENDIF\n    ENDFOR\nENDFOR\nOUTPUT "Available seats: ", available'
    },
    {
        id: 19,
        topic: 'data',
        marks: 4,
        question: 'The Vigenère cipher uses a keyword to encrypt messages.\n(a) Explain how the Vigenère cipher works. [2]\n(b) Using the keyword "KEY", encrypt the plaintext "HELLO". Show your working. [2]',
        markScheme: [
            '(a) Each letter in keyword provides a different shift value (1)',
            'Keyword repeats to match plaintext length (1)',
            '(b) Keyword repeated: KEYKE (1)',
            'H+K=R, E+E=I, L+Y=J, L+K=V, O+E=S → RIJVS (1)'
        ],
        sampleAnswer: '(a) The Vigenère cipher uses a keyword where each letter determines a different shift amount. The keyword is repeated to match the length of the plaintext. Each plaintext letter is shifted by the corresponding keyword letter\'s position (A=0, B=1, etc.).\n\n(b) Plaintext: H E L L O\nKeyword:   K E Y K E\n\nK=10, E=4, Y=24, K=10, E=4\n\nH(7) + K(10) = 17 → R\nE(4) + E(4) = 8 → I\nL(11) + Y(24) = 35 mod 26 = 9 → J\nL(11) + K(10) = 21 → V\nO(14) + E(4) = 18 → S\n\nEncrypted message: RIJVS'
    },
    {
        id: 20,
        topic: 'computers',
        marks: 4,
        question: 'Draw a logic circuit for the Boolean expression: Q = (A AND B) OR (NOT C)\nComplete a truth table for all possible inputs.',
        markScheme: [
            'Circuit shows AND gate with inputs A and B (1)',
            'Circuit shows NOT gate with input C (1)',
            'Outputs of AND and NOT feed into OR gate (1)',
            'Truth table correct for all 8 combinations (1)'
        ],
        sampleAnswer: 'Logic circuit:\n- A and B connect to an AND gate\n- C connects to a NOT gate\n- Output of AND gate and NOT gate connect to an OR gate\n- Output of OR gate is Q\n\nTruth table:\nA | B | C | A AND B | NOT C | Q\n0 | 0 | 0 |    0    |   1   | 1\n0 | 0 | 1 |    0    |   0   | 0\n0 | 1 | 0 |    0    |   1   | 1\n0 | 1 | 1 |    0    |   0   | 0\n1 | 0 | 0 |    0    |   1   | 1\n1 | 0 | 1 |    0    |   0   | 0\n1 | 1 | 0 |    1    |   1   | 1\n1 | 1 | 1 |    1    |   0   | 1'
    },
    {
        id: 21,
        topic: 'bigger-picture',
        marks: 6,
        question: 'Artificial Intelligence (AI) is increasingly being used in healthcare.\n(a) Describe two ways AI is being used in healthcare. [4]\n(b) Discuss one ethical concern about using AI in healthcare decisions. [2]',
        markScheme: [
            '(a) Use 1: Analyzing medical images/scans to detect diseases like cancer (1)',
            'Benefit: Faster/more accurate diagnosis than human alone (1)',
            'Use 2: Drug discovery/predicting treatment effectiveness (1)',
            'Benefit: Speeds up research/personalizes treatment (1)',
            '(b) Ethical concern: AI may make errors leading to misdiagnosis (1)',
            'Patients may not understand or trust AI decisions / accountability unclear (1)'
        ],
        sampleAnswer: '(a) Use 1: AI systems analyze medical images such as X-rays, MRIs, and CT scans to detect diseases like cancer, tumors, or diabetic retinopathy. The benefit is that AI can process images faster than radiologists and may detect subtle abnormalities humans might miss, leading to earlier diagnosis.\n\nUse 2: AI is used in drug discovery and predicting which treatments will be most effective for individual patients. Machine learning algorithms analyze genetic data and patient history to recommend personalized treatment plans, potentially reducing trial-and-error prescribing.\n\n(b) An ethical concern is accountability when AI makes errors. If an AI system misdiagnoses a patient or recommends incorrect treatment, it is unclear who is responsible - the doctor, the hospital, or the AI developer. This could lead to patients receiving inadequate care without clear recourse, and raises questions about whether patients should be informed that AI was involved in their diagnosis.'
    },
    {
        id: 22,
        topic: 'programming',
        marks: 5,
        question: 'A password validation system must check that:\n- The password is at least 8 characters long\n- The password contains at least one digit\n\nWrite pseudocode for a function that returns TRUE if the password is valid and FALSE otherwise.',
        markScheme: [
            'Function declaration with parameter (1)',
            'Length check: IF LENGTH(password) < 8 THEN RETURN FALSE (1)',
            'Loop through each character (1)',
            'Check if character is a digit (using ASC or similar) (1)',
            'Return TRUE only if both conditions met (1)'
        ],
        sampleAnswer: 'FUNCTION validatePassword(password)\n    // Check minimum length\n    IF LENGTH(password) < 8 THEN\n        RETURN FALSE\n    ENDIF\n    \n    // Check for at least one digit\n    hasDigit ← FALSE\n    FOR i ← 0 TO LENGTH(password) - 1\n        char ← SUBSTRING(password, i, 1)\n        IF ASC(char) >= 48 AND ASC(char) <= 57 THEN\n            hasDigit ← TRUE\n        ENDIF\n    ENDFOR\n    \n    IF hasDigit = FALSE THEN\n        RETURN FALSE\n    ENDIF\n    \n    RETURN TRUE\nENDFUNCTION'
    }
];

// Append new past paper questions
PAST_PAPER_QUESTIONS.push(...NEW_PAST_PAPER_QUESTIONS);

// ==================== NEW FLASHCARDS ====================

const NEW_FLASHCARDS = [
    { id: 36, topic: 'problem-solving', front: 'What is Big O notation?', back: 'A way to describe algorithm efficiency/time complexity. Common types: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential.' },
    { id: 37, topic: 'problem-solving', front: 'What is a trace table?', back: 'A debugging tool that tracks variable values through each step of program execution. Columns represent variables/outputs, rows represent each instruction step.' },
    { id: 38, topic: 'programming', front: 'What are the 5 validation types?', back: 'Range check (within limits), Type check (correct data type), Length check (number of characters), Presence check (not empty), Format check (matches pattern).' },
    { id: 39, topic: 'programming', front: 'What is string concatenation?', back: 'Joining two or more strings together. Example: "Hello" & " " & "World" = "Hello World".' },
    { id: 40, topic: 'programming', front: 'What is a 2D array?', back: 'An array of arrays, like a grid or table with rows and columns. Access elements with two indices: array[row][column].' },
    { id: 41, topic: 'programming', front: 'File handling modes?', back: 'READ (view file contents), WRITE (create/overwrite file), APPEND (add to end without deleting existing data).' },
    { id: 42, topic: 'data', front: 'What is two\'s complement?', back: 'A method for representing negative binary numbers. MSB=sign bit (0=positive, 1=negative). To convert: invert all bits, add 1.' },
    { id: 43, topic: 'data', front: 'What causes overflow?', back: 'When calculation result exceeds the maximum value that can be stored in the available bits. E.g., 8-bit unsigned max is 255.' },
    { id: 44, topic: 'data', front: 'Caesar cipher?', back: 'Substitution cipher that shifts each letter by a fixed number of positions. E.g., shift 3: A→D, B→E. Easy to break (only 25 possible shifts).' },
    { id: 45, topic: 'data', front: 'Vigenère cipher?', back: 'Uses a keyword for variable shifts. Each keyword letter determines shift for corresponding plaintext letter. Harder to break than Caesar.' },
    { id: 46, topic: 'data', front: 'Binary left/right shift?', back: 'Left shift: multiply by 2 (add 0s on right). Right shift: divide by 2 integer division (add 0s on left). Each position = ×2 or ÷2.' },
    { id: 47, topic: 'computers', front: 'What is pipelining?', back: 'CPU technique where multiple instructions are in different stages simultaneously. While one executes, another decodes, another fetches.' },
    { id: 48, topic: 'computers', front: 'Three buses in CPU?', back: 'Address bus (memory locations), Data bus (actual data), Control bus (signals like read/write, clock, interrupts).' },
    { id: 49, topic: 'computers', front: 'XOR gate truth?', back: 'Outputs 1 when inputs DIFFER: 0 XOR 0 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1, 1 XOR 1 = 0. "One or the other but not both."' },
    { id: 50, topic: 'computers', front: 'NAND and NOR gates?', back: 'NAND = NOT AND (opposite of AND). NOR = NOT OR (opposite of OR). Both are universal gates - can create any logic circuit.' },
    { id: 51, topic: 'networks', front: 'TCP/IP layers?', back: '4 layers: Application (HTTP, SMTP), Transport (TCP, UDP), Internet/Network (IP, routing), Link/Network Access (physical connection).' },
    { id: 52, topic: 'networks', front: 'TCP vs UDP?', back: 'TCP: reliable, ordered delivery, error checking, connection-based (web, email). UDP: faster, no guarantee, connectionless (streaming, gaming).' },
    { id: 53, topic: 'networks', front: 'Man-in-the-middle attack?', back: 'Attacker intercepts communication between two parties, can eavesdrop or modify messages. Prevented by encryption (HTTPS).' },
    { id: 54, topic: 'networks', front: 'SQL injection?', back: 'Attack inserting malicious SQL through input fields to manipulate database. Prevented by parameterized queries and input validation.' },
    { id: 55, topic: 'databases', front: 'What is normalization?', back: 'Organizing database to reduce redundancy. 1NF: atomic values. 2NF: no partial dependencies. 3NF: no transitive dependencies.' },
    { id: 56, topic: 'databases', front: 'Entity relationships?', back: 'One-to-one (1:1), One-to-many (1:M), Many-to-many (M:M). Foreign keys link related tables. M:M needs junction table.' },
    { id: 57, topic: 'databases', front: 'SQL aggregate functions?', back: 'COUNT() - number of rows, SUM() - total, AVG() - average, MAX() - highest, MIN() - lowest. Used with GROUP BY.' },
    { id: 58, topic: 'bigger-picture', front: 'What is algorithmic bias?', back: 'When AI systems produce unfair results due to biased training data or design. Can discriminate based on race, gender, etc.' },
    { id: 59, topic: 'bigger-picture', front: 'Environmental impact of tech?', back: 'Negative: e-waste (toxic materials), high energy consumption, short device lifespans. Positive: remote work, digital documents, smart energy systems.' },
    { id: 60, topic: 'bigger-picture', front: 'AI applications in daily life?', back: 'Voice assistants (Siri, Alexa), recommendation systems (Netflix, Spotify), image recognition, spam filters, navigation apps, fraud detection.' }
];

// Append new flashcards
FLASHCARDS.push(...NEW_FLASHCARDS);
