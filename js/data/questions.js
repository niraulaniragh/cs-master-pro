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
    { id: 42, topic: 'programming', question: 'What does SUBSTRING("Hello", 0, 3) return (0-indexed)?', options: ['Hel', 'ell', 'llo', 'Hello'], answer: 0, explanation: 'SUBSTRING extracts characters from a string. Starting at index 0, taking 3 characters gives "Hel".' },
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
    { id: 1001, topic: 'problem-solving', front: 'What is an algorithm?', back: 'A step-by-step set of instructions to solve a problem. Must be finite, precise, and produce an output.' },
    { id: 1002, topic: 'problem-solving', front: 'What is decomposition?', back: 'Breaking a complex problem into smaller, manageable sub-problems that can be solved individually.' },
    { id: 1003, topic: 'problem-solving', front: 'What is abstraction?', back: 'Hiding unnecessary details to focus on the essential features of a problem.' },
    { id: 1004, topic: 'problem-solving', front: 'Binary Search requirement?', back: 'Data MUST be sorted. Divides search space in half each time. O(log n) complexity.' },
    { id: 1005, topic: 'problem-solving', front: 'Bubble Sort - how it works?', back: 'Compares adjacent pairs, swaps if in wrong order. Largest values "bubble" to the end. O(n²) complexity.' },
    { id: 1006, topic: 'problem-solving', front: 'Merge Sort - how it works?', back: 'Divide and conquer: split list in half repeatedly until single elements, then merge back in sorted order. O(n log n).' },
    { id: 1007, topic: 'programming', front: 'Five main data types?', back: 'Integer (whole numbers), Real/Float (decimals), Boolean (True/False), Character (single char), String (text)' },
    { id: 1008, topic: 'programming', front: 'Difference: Variable vs Constant?', back: 'Variable: value CAN change during execution. Constant: value CANNOT change once set.' },
    { id: 1009, topic: 'programming', front: 'Three types of loops?', back: 'FOR (count-controlled), WHILE (pre-test condition), REPEAT-UNTIL (post-test, runs at least once)' },
    { id: 10010, topic: 'programming', front: 'Function vs Procedure?', back: 'Function: RETURNS a value. Procedure: performs action but does NOT return a value.' },
    { id: 10011, topic: 'programming', front: 'What is validation?', back: 'Checking that input data is reasonable and within acceptable limits. Types: range, type, length, presence, format.' },
    { id: 10012, topic: 'programming', front: 'Three types of test data?', back: 'Normal (typical valid data), Boundary (edge values), Erroneous (invalid data that should be rejected)' },
    { id: 10013, topic: 'data', front: 'Binary to Denary conversion?', back: 'Add place values where there is a 1. Place values: 128, 64, 32, 16, 8, 4, 2, 1' },
    { id: 10014, topic: 'data', front: 'Hexadecimal digits?', back: '0-9, then A=10, B=11, C=12, D=13, E=14, F=15. Each hex digit = 4 bits.' },
    { id: 10015, topic: 'data', front: 'Binary left shift effect?', back: 'Multiplies by 2 for each position shifted. Bits fall off the left, zeros added on right.' },
    { id: 10016, topic: 'data', front: 'Binary right shift effect?', back: 'Divides by 2 for each position shifted (integer division). Bits fall off the right.' },
    { id: 10017, topic: 'data', front: 'Lossy vs Lossless compression?', back: 'Lossy: permanently removes data (smaller files, quality loss). Lossless: no data lost (can restore original).' },
    { id: 10018, topic: 'data', front: 'Image file size formula?', back: 'Width × Height × Color Depth (bits per pixel). Result in bits, divide by 8 for bytes.' },
    { id: 10019, topic: 'data', front: 'Sound file size formula?', back: 'Sample rate × Bit depth × Channels × Duration (seconds). Result in bits.' },
    { id: 10020, topic: 'data', front: 'ASCII vs Unicode?', back: 'ASCII: 7-bit, 128 characters, English only. Unicode: up to 32-bit, 143,000+ characters, all languages.' },
    { id: 10021, topic: 'computers', front: 'CPU components?', back: 'ALU (calculations), Control Unit (fetches/decodes), Registers (fast storage), Cache (frequently used data)' },
    { id: 10022, topic: 'computers', front: 'FDE Cycle stages?', back: 'Fetch (get instruction), Decode (interpret it), Execute (perform it). Repeats continuously.' },
    { id: 10023, topic: 'computers', front: 'Key registers?', back: 'PC (next instruction address), MAR (address being accessed), MDR (data being transferred), CIR (current instruction), ACC (results)' },
    { id: 10024, topic: 'computers', front: 'RAM vs ROM?', back: 'RAM: volatile (loses data when off), read/write, stores running programs. ROM: non-volatile, read-only, stores boot instructions.' },
    { id: 10025, topic: 'computers', front: 'Compiler vs Interpreter?', back: 'Compiler: translates entire program at once, creates executable, fast to run. Interpreter: line by line, no executable, slower but easier to debug.' },
    { id: 10026, topic: 'computers', front: 'Logic gates: AND, OR, NOT?', back: 'AND: output 1 only if ALL inputs are 1. OR: output 1 if ANY input is 1. NOT: inverts input.' },
    { id: 10027, topic: 'networks', front: 'LAN vs WAN?', back: 'LAN: small area (building), fast, private. WAN: large area (countries), slower, often public infrastructure.' },
    { id: 10028, topic: 'networks', front: 'Star topology pros/cons?', back: 'Pros: one failure doesn\'t affect others, easy to add devices. Cons: central switch is single point of failure.' },
    { id: 10029, topic: 'networks', front: 'Switch vs Router?', back: 'Switch: connects devices in a LAN, uses MAC addresses. Router: connects different networks, uses IP addresses.' },
    { id: 10030, topic: 'networks', front: 'Common malware types?', back: 'Virus (attaches to files), Worm (self-replicates), Trojan (disguised), Ransomware (encrypts files), Spyware (monitors user)' },
    { id: 10031, topic: 'databases', front: 'Primary Key rules?', back: 'Must be UNIQUE (no duplicates), NOT NULL (must have value), should not change.' },
    { id: 10032, topic: 'databases', front: 'What is a Foreign Key?', back: 'A field that links to the primary key of another table, creating a relationship between tables.' },
    { id: 10033, topic: 'databases', front: 'SQL SELECT syntax?', back: 'SELECT columns FROM table WHERE condition ORDER BY column ASC/DESC' },
    { id: 10034, topic: 'bigger-picture', front: 'What is e-waste?', back: 'Discarded electronic equipment. Contains toxic materials, environmental concern, should be recycled properly.' },
    { id: 10035, topic: 'bigger-picture', front: 'Open source vs Proprietary?', back: 'Open source: code freely available to view/modify. Proprietary: code is closed, company controls it, usually paid.' }
];

// Past Paper Style Questions (Extended Response)
const PAST_PAPER_QUESTIONS = [
    {
        id: 2001,
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
        id: 2002,
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
        id: 2003,
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
        id: 2004,
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
        id: 2005,
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
        id: 2006,
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
        id: 2007,
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
        id: 2008,
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
        id: 2009,
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
        id: 20010,
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
        id: 20011,
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
        id: 20012,
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
    { id: 205, topic: 'data', question: 'How does Vigenère cipher encrypt "CAT" with key "KEY"?', options: ['MCX', 'MKR', 'MER', 'MAY'], answer: 2, explanation: 'Vigenère adds letter positions: C(2)+K(10)=M(12), A(0)+E(4)=E(4), T(19)+Y(24)=R(43 mod 26=17). Result: MER.' },
    { id: 206, topic: 'data', question: 'When adding two positive numbers in two\'s complement, overflow occurs if:', options: ['Result is positive', 'Result is negative', 'Result is zero', 'Carry out equals carry in'], answer: 1, explanation: 'When two positives give a negative result, overflow has occurred (exceeded max positive value).' },
    { id: 207, topic: 'data', question: 'Run-length encoding of "AAABBBCCCCDD" produces:', options: ['3A3B4C2D', 'A3B3C4D2', 'ABCD3342', '12ABCD'], answer: 0, explanation: 'RLE counts consecutive characters: 3 As, 3 Bs, 4 Cs, 2 Ds = 3A3B4C2D.' },
    { id: 208, topic: 'data', question: 'What binary operation detects if a number is odd?', options: ['AND with 1', 'OR with 1', 'XOR with 1', 'NOT'], answer: 0, explanation: 'Number AND 1 = 1 if odd, 0 if even. The LSB determines odd/even.' },
    { id: 209, topic: 'data', question: 'What is the denary value of two\'s complement 11111100?', options: ['-4', '252', '-3', '4'], answer: 0, explanation: 'MSB is 1 so negative. Invert: 00000011, add 1: 00000100 = 4. So original = -4.' },
    { id: 210, topic: 'data', question: 'Which format uses lossy compression for audio?', options: ['WAV', 'FLAC', 'MP3', 'AIFF'], answer: 2, explanation: 'MP3 uses lossy compression, removing frequencies humans can\'t easily hear.' },

    // ==================== COMPUTER SYSTEMS (15 more) ====================
    { id: 211, topic: 'computers', question: 'What register holds the instruction currently being executed?', options: ['Program Counter (PC)', 'Memory Address Register (MAR)', 'Current Instruction Register (CIR)', 'Accumulator (ACC)'], answer: 2, explanation: 'The CIR (Current Instruction Register) holds the instruction being decoded and executed.' },
    { id: 212, topic: 'computers', question: 'In the FDE cycle, what happens during the FETCH stage?', options: ['Instruction is executed', 'Instruction is interpreted', 'Instruction is retrieved from memory', 'Results are stored'], answer: 2, explanation: 'Fetch retrieves the next instruction from memory using the address in the PC.' },
    { id: 213, topic: 'computers', question: 'Which factor does NOT directly affect CPU performance?', options: ['Clock speed', 'Number of cores', 'Cache size', 'Monitor resolution'], answer: 3, explanation: 'Monitor resolution affects display, not CPU processing performance.' },
    { id: 214, topic: 'computers', question: 'What is the output of NAND gate with inputs A=1, B=1?', options: ['0', '1', 'Error', 'Undefined'], answer: 0, explanation: 'NAND = NOT AND. 1 AND 1 = 1, then NOT 1 = 0. So NAND(1,1) = 0.' },
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
        id: 20013,
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
        id: 20014,
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
        id: 20015,
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
        id: 20016,
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
        id: 20017,
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
        id: 20018,
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
        id: 20019,
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
        id: 20020,
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
        id: 20021,
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
        id: 20022,
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

// ==================== ADDITIONAL PAST PAPER QUESTIONS (IDs 20100+) ====================
// Covers Paper 1 (theory) and Paper 2 (programming/algorithms) style questions
// Topics: algorithms, programming, data representation, networks, security

const ADDITIONAL_PAST_PAPER_QUESTIONS = [
    // ========== ALGORITHMS - Paper 1 & 2 Style ==========
    {
        id: 20100,
        topic: 'problem-solving',
        marks: 6,
        year: '2023',
        paper: 'Paper 2',
        question: 'The following pseudocode implements a linear search:\n\nFUNCTION linearSearch(arr, target)\n    FOR i ← 0 TO LENGTH(arr) - 1\n        IF arr[i] = target THEN\n            RETURN i\n        ENDIF\n    ENDFOR\n    RETURN -1\nENDFUNCTION\n\n(a) Explain what the function returns when the target is found and when it is not found. [2]\n(b) State the time complexity of this algorithm and justify your answer. [2]\n(c) Rewrite this algorithm to search from the end of the array to the beginning. [2]',
        markScheme: [
            '(a) Returns the index position when target is found (1)',
            'Returns -1 when target is not found (1)',
            '(b) Time complexity is O(n) / linear (1)',
            'Justification: worst case checks every element once (1)',
            '(c) Loop from LENGTH-1 TO 0 / decrementing (1)',
            'Correct comparison and return logic maintained (1)'
        ],
        sampleAnswer: '(a) When the target is found, the function returns the index position (i) where the element was located. When the target is not found after checking all elements, it returns -1 to indicate the search was unsuccessful.\n\n(b) The time complexity is O(n) - linear time. This is because in the worst case, the algorithm must check every element in the array once before finding the target (at the end) or determining it\'s not present.\n\n(c) FUNCTION linearSearchReverse(arr, target)\n    FOR i ← LENGTH(arr) - 1 TO 0 STEP -1\n        IF arr[i] = target THEN\n            RETURN i\n        ENDIF\n    ENDFOR\n    RETURN -1\nENDFUNCTION'
    },
    {
        id: 20101,
        topic: 'problem-solving',
        marks: 5,
        year: '2022',
        paper: 'Paper 1',
        question: 'Describe the merge sort algorithm. Include in your answer:\n- How the algorithm divides the data [2]\n- How the algorithm combines the sorted sublists [2]\n- The time complexity of the algorithm [1]',
        markScheme: [
            'Divides: Recursively splits list in half until single elements (1)',
            'Divides: Single elements are considered sorted (1)',
            'Combines: Compares elements from two sublists (1)',
            'Combines: Places smaller element first / merges in order (1)',
            'Time complexity: O(n log n) in all cases (1)'
        ],
        sampleAnswer: 'Merge sort is a divide-and-conquer algorithm:\n\nDividing: The algorithm recursively divides the list in half until each sublist contains only a single element. A single element is inherently sorted, so these become the base cases.\n\nCombining: The sorted sublists are merged back together by comparing the first elements of each sublist. The smaller element is placed into the result first. This comparison continues until all elements from both sublists are merged into a single sorted list.\n\nTime complexity: O(n log n) in best, average, and worst cases. The log n comes from the number of times we can halve n, and the n comes from the merging step at each level.'
    },
    {
        id: 20102,
        topic: 'problem-solving',
        marks: 4,
        year: '2023',
        paper: 'Paper 2',
        question: 'A binary search is performed on the sorted array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]\n\n(a) Show the steps taken to find the value 23. [3]\n(b) How many comparisons were needed? [1]',
        markScheme: [
            '(a) Step 1: Middle index = 4, value 16, 23 > 16, search right half (1)',
            'Step 2: Middle of right half, index 7, value 45, 23 < 45, search left (1)',
            'Step 3: Middle = index 5, value 23, found (1)',
            '(b) 3 comparisons needed (1)'
        ],
        sampleAnswer: '(a) Array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72] (indices 0-9)\n\nStep 1: Middle index = (0+9)÷2 = 4, value = 16\n23 > 16, so search right half (indices 5-9)\n\nStep 2: Middle index = (5+9)÷2 = 7, value = 45\n23 < 45, so search left half (indices 5-6)\n\nStep 3: Middle index = (5+6)÷2 = 5, value = 23\n23 = 23, target found at index 5\n\n(b) 3 comparisons were needed to find the value 23.'
    },
    {
        id: 20103,
        topic: 'problem-solving',
        marks: 6,
        year: '2022',
        paper: 'Paper 2',
        question: 'Complete a trace table for the following algorithm:\n\nx ← 1\ny ← 0\nWHILE x <= 4\n    y ← y + x * x\n    x ← x + 1\nENDWHILE\nOUTPUT y\n\nShow all values of x and y at each iteration. What is the final output?',
        markScheme: [
            'Initial values x=1, y=0 shown (1)',
            'First iteration: y=0+1=1, x=2 (1)',
            'Second iteration: y=1+4=5, x=3 (1)',
            'Third iteration: y=5+9=14, x=4 (1)',
            'Fourth iteration: y=14+16=30, x=5 (1)',
            'Final output: 30 (1)'
        ],
        sampleAnswer: 'Trace table:\n\n| Iteration | x (start) | y (start) | x*x | y (after) | x (after) |\n|-----------|-----------|-----------|-----|-----------|------------|\n| Initial   | 1         | 0         | -   | 0         | 1          |\n| 1         | 1         | 0         | 1   | 1         | 2          |\n| 2         | 2         | 1         | 4   | 5         | 3          |\n| 3         | 3         | 5         | 9   | 14        | 4          |\n| 4         | 4         | 14        | 16  | 30        | 5          |\n\nLoop ends when x=5 (5 <= 4 is FALSE)\n\nFinal output: 30\n\nThe algorithm calculates the sum of squares: 1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30'
    },

    // ========== PROGRAMMING - Paper 2 Style ==========
    {
        id: 20104,
        topic: 'programming',
        marks: 6,
        year: '2023',
        paper: 'Paper 2',
        question: 'A program stores student grades in an array. Write pseudocode for a function that:\n- Takes an array of integer grades (0-100) as a parameter\n- Returns the average grade\n- Handles the case where the array might be empty\n\nInclude appropriate validation.',
        markScheme: [
            'Function declaration with array parameter (1)',
            'Check for empty array and handle appropriately (1)',
            'Initialize sum/total variable to 0 (1)',
            'Loop through all elements adding to sum (1)',
            'Calculate average correctly (sum / length) (1)',
            'Return the average value (1)'
        ],
        sampleAnswer: 'FUNCTION calculateAverage(grades)\n    // Handle empty array\n    IF LENGTH(grades) = 0 THEN\n        RETURN 0  // or could return -1 to indicate error\n    ENDIF\n    \n    total ← 0\n    \n    // Sum all grades\n    FOR i ← 0 TO LENGTH(grades) - 1\n        total ← total + grades[i]\n    ENDFOR\n    \n    // Calculate and return average\n    average ← total / LENGTH(grades)\n    RETURN average\nENDFUNCTION'
    },
    {
        id: 20105,
        topic: 'programming',
        marks: 5,
        year: '2022',
        paper: 'Paper 2',
        question: 'Write pseudocode for a procedure that:\n- Reads numbers from a file called "numbers.txt"\n- Outputs only the even numbers\n- Counts and outputs how many even numbers were found',
        markScheme: [
            'Opens file correctly for reading (1)',
            'Loop to read until EOF (1)',
            'Correct even number check (MOD 2 = 0) (1)',
            'Counter incremented for each even number (1)',
            'Outputs count and closes file (1)'
        ],
        sampleAnswer: 'PROCEDURE findEvenNumbers()\n    OPEN "numbers.txt" FOR READ\n    count ← 0\n    \n    WHILE NOT EOF("numbers.txt")\n        READ num FROM "numbers.txt"\n        IF num MOD 2 = 0 THEN\n            OUTPUT num\n            count ← count + 1\n        ENDIF\n    ENDWHILE\n    \n    CLOSE "numbers.txt"\n    OUTPUT "Total even numbers found: ", count\nENDPROCEDURE'
    },
    {
        id: 20106,
        topic: 'programming',
        marks: 4,
        year: '2023',
        paper: 'Paper 2',
        question: 'Explain the difference between a procedure and a function. Give an example of when you would use each.',
        markScheme: [
            'Procedure: performs actions but does not return a value (1)',
            'Function: returns a value to the calling code (1)',
            'Procedure example: printing output, updating global variable (1)',
            'Function example: calculating a result needed in an expression (1)'
        ],
        sampleAnswer: 'A procedure is a subroutine that performs a series of actions but does not return a value to the calling code. It might display output, modify files, or update global variables.\n\nExample of procedure: A displayMenu() procedure that prints options to the screen.\n\nA function is a subroutine that performs actions and returns a value that can be used in expressions or assigned to variables.\n\nExample of function: A calculateArea(length, width) function that returns the area, allowing code like: totalArea ← calculateArea(5, 3) + calculateArea(4, 2)'
    },
    {
        id: 20107,
        topic: 'programming',
        marks: 6,
        year: '2022',
        paper: 'Paper 2',
        question: 'A shop needs to validate product codes. A valid code:\n- Is exactly 8 characters long\n- Starts with two uppercase letters\n- Ends with 6 digits\n\nWrite pseudocode for a function that returns TRUE if a code is valid, FALSE otherwise.',
        markScheme: [
            'Function declaration with code parameter (1)',
            'Length check: exactly 8 characters (1)',
            'Check first two characters are uppercase letters (A-Z / ASCII 65-90) (1)',
            'Loop or check last 6 characters are digits (1)',
            'Correct use of ASCII values or string functions (1)',
            'Returns TRUE/FALSE appropriately (1)'
        ],
        sampleAnswer: 'FUNCTION validateProductCode(code)\n    // Check length\n    IF LENGTH(code) ≠ 8 THEN\n        RETURN FALSE\n    ENDIF\n    \n    // Check first two characters are uppercase letters\n    FOR i ← 0 TO 1\n        char ← SUBSTRING(code, i, 1)\n        IF ASC(char) < 65 OR ASC(char) > 90 THEN\n            RETURN FALSE\n        ENDIF\n    ENDFOR\n    \n    // Check last 6 characters are digits\n    FOR i ← 2 TO 7\n        char ← SUBSTRING(code, i, 1)\n        IF ASC(char) < 48 OR ASC(char) > 57 THEN\n            RETURN FALSE\n        ENDIF\n    ENDFOR\n    \n    RETURN TRUE\nENDFUNCTION'
    },
    {
        id: 20108,
        topic: 'programming',
        marks: 5,
        year: '2023',
        paper: 'Paper 2',
        question: 'A 2D array called grid[4][4] stores a game board. Write pseudocode to:\n(a) Initialize all elements to 0 [2]\n(b) Check if any row contains all the same value (returns TRUE/FALSE) [3]',
        markScheme: [
            '(a) Nested loops for rows and columns (1)',
            '(a) Assignment of 0 to each element (1)',
            '(b) Outer loop iterates through each row (1)',
            '(b) Inner loop/check compares elements in row (1)',
            '(b) Returns TRUE if match found, FALSE if not (1)'
        ],
        sampleAnswer: '(a) Initialize all elements to 0:\nFOR row ← 0 TO 3\n    FOR col ← 0 TO 3\n        grid[row][col] ← 0\n    ENDFOR\nENDFOR\n\n(b) Check for row with all same values:\nFUNCTION checkMatchingRow(grid)\n    FOR row ← 0 TO 3\n        firstValue ← grid[row][0]\n        allMatch ← TRUE\n        \n        FOR col ← 1 TO 3\n            IF grid[row][col] ≠ firstValue THEN\n                allMatch ← FALSE\n            ENDIF\n        ENDFOR\n        \n        IF allMatch = TRUE THEN\n            RETURN TRUE\n        ENDIF\n    ENDFOR\n    RETURN FALSE\nENDFUNCTION'
    },

    // ========== DATA REPRESENTATION - Paper 1 Style ==========
    {
        id: 20109,
        topic: 'data',
        marks: 5,
        year: '2023',
        paper: 'Paper 1',
        question: '(a) Convert the denary number 156 to:\n    (i) Binary [2]\n    (ii) Hexadecimal [1]\n(b) Perform the binary addition: 10110101 + 01001110. Show any overflow if it occurs. [2]',
        markScheme: [
            '(a)(i) 156 = 10011100 in binary (1)',
            '(a)(i) Working shown: 128+16+8+4 = 156 (1)',
            '(a)(ii) 9C in hexadecimal (1)',
            '(b) Result: 100000011 (1)',
            '(b) Overflow occurs (9 bits needed for 8-bit result) (1)'
        ],
        sampleAnswer: '(a)(i) Converting 156 to binary:\n156 ÷ 2 = 78 r 0\n78 ÷ 2 = 39 r 0\n39 ÷ 2 = 19 r 1\n19 ÷ 2 = 9 r 1\n9 ÷ 2 = 4 r 1\n4 ÷ 2 = 2 r 0\n2 ÷ 2 = 1 r 0\n1 ÷ 2 = 0 r 1\n\nReading remainders bottom-up: 10011100\nCheck: 128+16+8+4 = 156 ✓\n\n(a)(ii) Converting to hexadecimal:\n1001 1100 = 9 C\nSo 156 = 9C in hexadecimal\n\n(b) Binary addition:\n  10110101  (181)\n+ 01001110  (78)\n-----------\n 100000011  (259)\n\nOverflow occurs because the result (259) exceeds the maximum 8-bit value (255). The result requires 9 bits.'
    },
    {
        id: 20110,
        topic: 'data',
        marks: 6,
        year: '2022',
        paper: 'Paper 1',
        question: 'A digital audio file has the following properties:\n- Sample rate: 44,100 Hz\n- Bit depth: 16 bits\n- Stereo (2 channels)\n- Duration: 3 minutes\n\n(a) Calculate the file size in megabytes. Show your working. [4]\n(b) Explain one way to reduce the file size and state any disadvantage. [2]',
        markScheme: [
            '(a) Duration in seconds: 3 × 60 = 180 seconds (1)',
            '(a) Total samples: 44,100 × 180 × 2 = 15,876,000 (1)',
            '(a) Total bits: 15,876,000 × 16 = 254,016,000 bits (1)',
            '(a) Convert to MB: 254,016,000 ÷ 8 ÷ 1,000,000 ≈ 31.75 MB (1)',
            '(b) Reduce sample rate/bit depth/use compression (1)',
            '(b) Disadvantage: loss of quality/detail (1)'
        ],
        sampleAnswer: '(a) File size calculation:\nDuration: 3 minutes = 180 seconds\nSamples per second per channel: 44,100\nNumber of channels: 2\nBits per sample: 16\n\nTotal samples = 44,100 × 180 × 2 = 15,876,000 samples\nTotal bits = 15,876,000 × 16 = 254,016,000 bits\nBytes = 254,016,000 ÷ 8 = 31,752,000 bytes\nMegabytes = 31,752,000 ÷ 1,000,000 = 31.75 MB\n\n(b) One way to reduce file size: Use lossy compression (e.g., convert to MP3)\nDisadvantage: Some audio data is permanently lost, which may reduce sound quality, particularly noticeable in high frequencies or quiet passages.'
    },
    {
        id: 20111,
        topic: 'data',
        marks: 4,
        year: '2023',
        paper: 'Paper 1',
        question: 'Explain the difference between lossy and lossless compression. Give one example file format for each type and explain why that compression type is appropriate for that format.',
        markScheme: [
            'Lossy: permanently removes some data to achieve compression (1)',
            'Lossless: no data is lost, original can be fully reconstructed (1)',
            'Lossy example: JPEG/MP3/MP4 - small quality loss acceptable for images/audio/video (1)',
            'Lossless example: PNG/ZIP/FLAC - exact data must be preserved for documents/archives (1)'
        ],
        sampleAnswer: 'Lossy compression permanently removes some data during compression. The original file cannot be fully reconstructed, but significant file size reduction is achieved.\n\nExample: MP3 for audio files. This is appropriate because the human ear cannot detect certain frequencies, so removing them reduces file size without noticeable quality loss for most listeners.\n\nLossless compression reduces file size without losing any data. The original file can be perfectly reconstructed from the compressed version.\n\nExample: PNG for images with text or logos. This is appropriate because text must remain crisp and readable - any loss of data could blur edges or change colors, making text difficult to read.'
    },
    {
        id: 20112,
        topic: 'data',
        marks: 5,
        year: '2022',
        paper: 'Paper 1',
        question: 'Using 8-bit two\'s complement:\n(a) Represent -45 in binary. Show your working. [3]\n(b) Add -45 and +30 in binary. Show your working and give the result in denary. [2]',
        markScheme: [
            '(a) +45 = 00101101 (1)',
            '(a) Inverted = 11010010 (1)',
            '(a) Add 1 = 11010011 = -45 (1)',
            '(b) -45 + 30 = 11010011 + 00011110 = 11110001 (1)',
            '(b) Result = -15 in denary (1)'
        ],
        sampleAnswer: '(a) Converting -45 to 8-bit two\'s complement:\nStep 1: Convert +45 to binary\n45 = 32 + 8 + 4 + 1 = 00101101\n\nStep 2: Invert all bits\n00101101 → 11010010\n\nStep 3: Add 1\n11010010 + 1 = 11010011\n\nSo -45 in two\'s complement is: 11010011\n\n(b) Adding -45 + 30:\n-45 = 11010011\n+30 = 00011110\n\n  11010011\n+ 00011110\n-----------\n  11110001\n\nConverting result to denary (MSB is 1, so negative):\nInvert: 00001110, Add 1: 00001111 = 15\nResult: -15'
    },

    // ========== NETWORKS - Paper 1 Style ==========
    {
        id: 20113,
        topic: 'networks',
        marks: 6,
        year: '2023',
        paper: 'Paper 1',
        question: 'Describe the four layers of the TCP/IP model. For each layer, state its purpose and give one example protocol or technology used at that layer.',
        markScheme: [
            'Application layer: provides network services to applications (1)',
            'Application example: HTTP, SMTP, FTP, DNS (1)',
            'Transport layer: end-to-end data transfer and reliability (1)',
            'Transport example: TCP, UDP (1)',
            'Internet layer: addressing and routing packets between networks (1)',
            'Internet example: IP, ICMP (1)',
            'Link/Network Access layer: physical transmission of data (1)',
            'Link example: Ethernet, Wi-Fi, MAC addresses (1)'
        ],
        sampleAnswer: '1. Application Layer\nPurpose: Provides network services directly to user applications. Handles high-level protocols for specific services.\nExample: HTTP (web browsing), SMTP (sending email)\n\n2. Transport Layer\nPurpose: Provides end-to-end communication between hosts. Ensures reliable data transfer, error checking, and flow control.\nExample: TCP (reliable, ordered delivery), UDP (fast, connectionless)\n\n3. Internet Layer\nPurpose: Handles logical addressing (IP addresses) and routing packets across multiple networks from source to destination.\nExample: IP (Internet Protocol) for addressing and routing\n\n4. Link/Network Access Layer\nPurpose: Handles physical transmission of data over the network medium. Deals with hardware addressing and physical connection.\nExample: Ethernet for wired connections, Wi-Fi for wireless'
    },
    {
        id: 20114,
        topic: 'networks',
        marks: 5,
        year: '2022',
        paper: 'Paper 1',
        question: 'A company is setting up a network using star topology.\n(a) Draw a diagram showing 5 computers connected in a star topology. [2]\n(b) State two advantages and one disadvantage of star topology. [3]',
        markScheme: [
            '(a) Central switch/hub shown (1)',
            '(a) All 5 computers connected directly to central device (1)',
            '(b) Advantage 1: Single device failure doesn\'t affect others (1)',
            '(b) Advantage 2: Easy to add new devices / easy fault detection (1)',
            '(b) Disadvantage: Central switch is single point of failure / more cabling needed (1)'
        ],
        sampleAnswer: '(a) Star Topology Diagram:\n\n         [PC1]    [PC2]\n            \\    /\n         [SWITCH/HUB]\n           /  |  \\\n       [PC3] [PC4] [PC5]\n\nAll computers connect directly to the central switch.\n\n(b) Advantages:\n1. If one computer or cable fails, it doesn\'t affect the rest of the network - other devices continue communicating normally.\n2. Easy to add new devices - simply connect them to an available port on the switch without disrupting existing connections.\n\nDisadvantage:\nThe central switch is a single point of failure. If it breaks down, the entire network stops functioning and no devices can communicate with each other.'
    },
    {
        id: 20115,
        topic: 'networks',
        marks: 4,
        year: '2023',
        paper: 'Paper 1',
        question: 'Explain the difference between TCP and UDP. Give one application where each protocol would be most appropriate and explain why.',
        markScheme: [
            'TCP: connection-oriented, reliable, guarantees delivery and order (1)',
            'UDP: connectionless, faster, no guarantee of delivery (1)',
            'TCP application: web browsing/email/file transfer - data must arrive complete and in order (1)',
            'UDP application: video streaming/gaming/VoIP - speed more important than perfect delivery (1)'
        ],
        sampleAnswer: 'TCP (Transmission Control Protocol):\n- Connection-oriented: establishes connection before sending data\n- Reliable: guarantees delivery through acknowledgments and retransmission\n- Ordered: data arrives in the correct sequence\n\nAppropriate for: Web browsing (HTTP/HTTPS). Web pages must load completely with all elements in the correct position. Missing or out-of-order data would corrupt the page.\n\nUDP (User Datagram Protocol):\n- Connectionless: sends data without establishing connection first\n- Faster: no overhead for reliability checking\n- No delivery guarantee: packets may be lost or arrive out of order\n\nAppropriate for: Video streaming. Speed is crucial for real-time playback. A few lost packets cause minor glitches but waiting for retransmission would cause noticeable buffering and delays.'
    },

    // ========== SECURITY - Paper 1 Style ==========
    {
        id: 20116,
        topic: 'networks',
        marks: 6,
        year: '2023',
        paper: 'Paper 1',
        question: 'A company has experienced several cyber attacks.\n(a) Describe what ransomware is and how it affects a computer system. [2]\n(b) Describe what a phishing attack is. [2]\n(c) State two measures the company could implement to protect against these attacks. [2]',
        markScheme: [
            '(a) Ransomware encrypts files/locks system (1)',
            '(a) Demands payment/ransom for decryption key (1)',
            '(b) Phishing uses fake emails/websites (1)',
            '(b) Tricks users into revealing personal information/credentials (1)',
            '(c) Measure 1: Regular backups / staff training / email filtering (1)',
            '(c) Measure 2: Anti-malware software / firewall / 2FA (1)'
        ],
        sampleAnswer: '(a) Ransomware is a type of malware that encrypts the victim\'s files or locks their entire system, making the data inaccessible. The attacker then demands a ransom payment (often in cryptocurrency) in exchange for the decryption key to restore access to the files.\n\n(b) Phishing is a social engineering attack where criminals send fraudulent emails or create fake websites that appear to be from legitimate organizations (banks, services, colleagues). The goal is to trick recipients into revealing sensitive information such as passwords, credit card numbers, or personal details by making them believe they are interacting with a trusted source.\n\n(c) Protection measures:\n1. Implement regular, automated backups stored offline or in the cloud. This allows recovery from ransomware without paying the ransom.\n2. Conduct regular cybersecurity awareness training for staff to help them recognize and report phishing attempts before clicking suspicious links or attachments.'
    },
    {
        id: 20117,
        topic: 'networks',
        marks: 5,
        year: '2022',
        paper: 'Paper 1',
        question: 'Explain the importance of encryption in network security. In your answer:\n- Describe what encryption does [2]\n- Explain the difference between symmetric and asymmetric encryption [2]\n- Give an example of where encryption is used [1]',
        markScheme: [
            'Encryption converts plaintext to unreadable ciphertext (1)',
            'Only authorized users with key can decrypt (1)',
            'Symmetric: same key encrypts and decrypts (1)',
            'Asymmetric: different keys (public/private) for encrypt/decrypt (1)',
            'Example: HTTPS, email, file storage, banking (1)'
        ],
        sampleAnswer: 'Encryption is essential for network security as it protects data confidentiality.\n\nWhat encryption does:\nEncryption converts readable data (plaintext) into an unreadable format (ciphertext) using a mathematical algorithm and a key. Only someone with the correct decryption key can convert it back to readable form, preventing unauthorized access to sensitive information.\n\nSymmetric vs Asymmetric:\nSymmetric encryption uses the same secret key for both encryption and decryption. It\'s fast but requires secure key distribution between parties.\n\nAsymmetric encryption uses a pair of keys: a public key (shared openly) to encrypt and a private key (kept secret) to decrypt. This solves the key distribution problem but is slower.\n\nExample:\nHTTPS uses encryption to secure web communications. When you access your bank\'s website, encryption ensures that your login credentials and financial data cannot be intercepted and read by attackers monitoring the network.'
    },
    {
        id: 20118,
        topic: 'networks',
        marks: 4,
        year: '2023',
        paper: 'Paper 1',
        question: 'Describe four security threats that could affect a computer network and explain how each could be prevented.',
        markScheme: [
            'Threat 1 (e.g., malware) with valid prevention (1)',
            'Threat 2 (e.g., phishing) with valid prevention (1)',
            'Threat 3 (e.g., DDoS) with valid prevention (1)',
            'Threat 4 (e.g., SQL injection/brute force) with valid prevention (1)'
        ],
        sampleAnswer: '1. Malware (viruses, worms, trojans)\nPrevention: Install and regularly update anti-malware software, and avoid downloading from untrusted sources.\n\n2. Phishing attacks\nPrevention: Train users to recognize suspicious emails, implement email filtering, and use multi-factor authentication.\n\n3. DDoS (Distributed Denial of Service)\nPrevention: Use DDoS protection services, implement rate limiting, and have redundant servers to handle traffic spikes.\n\n4. Brute force attacks\nPrevention: Enforce strong password policies, implement account lockout after failed attempts, and use CAPTCHA on login forms.'
    },

    // ========== DATABASES - Paper 1 & 2 Style ==========
    {
        id: 20119,
        topic: 'databases',
        marks: 6,
        year: '2023',
        paper: 'Paper 2',
        question: 'A bookshop database has these tables:\n\nBooks(BookID, Title, AuthorID, Price, StockQuantity)\nAuthors(AuthorID, FirstName, LastName, Country)\nSales(SaleID, BookID, SaleDate, Quantity)\n\nWrite SQL queries to:\n(a) Find all books priced over £15, showing title and price, sorted by price descending [2]\n(b) Find the total number of books sold for each BookID [2]\n(c) List all book titles with their author\'s full name [2]',
        markScheme: [
            '(a) SELECT Title, Price FROM Books WHERE Price > 15 ORDER BY Price DESC (2)',
            '(b) SELECT BookID, SUM(Quantity) FROM Sales GROUP BY BookID (2)',
            '(c) Correct JOIN between Books and Authors (1)',
            '(c) Concatenation of FirstName and LastName / both columns selected (1)'
        ],
        sampleAnswer: '(a) SELECT Title, Price\nFROM Books\nWHERE Price > 15\nORDER BY Price DESC;\n\n(b) SELECT BookID, SUM(Quantity) AS TotalSold\nFROM Sales\nGROUP BY BookID;\n\n(c) SELECT Books.Title, Authors.FirstName, Authors.LastName\nFROM Books\nJOIN Authors ON Books.AuthorID = Authors.AuthorID;\n\nOR (with concatenation):\n\nSELECT Books.Title, \n       Authors.FirstName || \' \' || Authors.LastName AS AuthorName\nFROM Books\nJOIN Authors ON Books.AuthorID = Authors.AuthorID;'
    },
    {
        id: 20120,
        topic: 'databases',
        marks: 4,
        year: '2022',
        paper: 'Paper 1',
        question: 'Explain the purpose of:\n(a) A primary key [2]\n(b) A foreign key [2]\n\nUse examples from a school database with Students and Classes tables.',
        markScheme: [
            '(a) Uniquely identifies each record in a table (1)',
            '(a) Example: StudentID in Students table (1)',
            '(b) Links to primary key in another table / creates relationship (1)',
            '(b) Example: ClassID in Students table linking to Classes (1)'
        ],
        sampleAnswer: '(a) Primary Key:\nA primary key is a field (or combination of fields) that uniquely identifies each record in a database table. No two records can have the same primary key value, and it cannot be empty (NULL).\n\nExample: In a Students table, StudentID would be the primary key. Each student has a unique ID (e.g., S001, S002) that distinguishes them from all other students, even if they have the same name.\n\n(b) Foreign Key:\nA foreign key is a field in one table that references the primary key in another table, creating a relationship between the two tables. It enables data to be linked across tables.\n\nExample: In the Students table, ClassID could be a foreign key that references the primary key ClassID in the Classes table. This links each student to their class without storing all class details repeatedly for every student.'
    },

    // ========== MORE ALGORITHMS - Paper 2 Style ==========
    {
        id: 20121,
        topic: 'problem-solving',
        marks: 5,
        year: '2023',
        paper: 'Paper 2',
        question: 'Describe the bubble sort algorithm. Show the state of the array [5, 2, 8, 1, 9] after each complete pass of bubble sort.',
        markScheme: [
            'Compares adjacent elements and swaps if in wrong order (1)',
            'Pass 1: [2, 5, 1, 8, 9] (1)',
            'Pass 2: [2, 1, 5, 8, 9] (1)',
            'Pass 3: [1, 2, 5, 8, 9] (1)',
            'Pass 4: no swaps needed, sorted (1)'
        ],
        sampleAnswer: 'Bubble sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. After each pass, the largest unsorted element "bubbles" to its correct position at the end.\n\nOriginal: [5, 2, 8, 1, 9]\n\nPass 1:\n5,2 → swap → [2, 5, 8, 1, 9]\n5,8 → no swap\n8,1 → swap → [2, 5, 1, 8, 9]\n8,9 → no swap\nResult: [2, 5, 1, 8, 9]\n\nPass 2:\n2,5 → no swap\n5,1 → swap → [2, 1, 5, 8, 9]\n5,8 → no swap\nResult: [2, 1, 5, 8, 9]\n\nPass 3:\n2,1 → swap → [1, 2, 5, 8, 9]\n2,5 → no swap\nResult: [1, 2, 5, 8, 9]\n\nPass 4:\nNo swaps needed → Array is sorted\nFinal: [1, 2, 5, 8, 9]'
    },
    {
        id: 20122,
        topic: 'programming',
        marks: 6,
        year: '2022',
        paper: 'Paper 2',
        question: 'A temperature monitoring system records temperatures every hour. Write pseudocode for a program that:\n- Stores 24 temperature readings in an array\n- Finds and outputs the highest temperature and when it occurred\n- Finds and outputs the lowest temperature and when it occurred\n- Calculates and outputs the average temperature',
        markScheme: [
            'Array declaration for 24 elements (1)',
            'Input loop for readings with hours (1)',
            'Max finding with tracking hour (1)',
            'Min finding with tracking hour (1)',
            'Sum calculation within loop (1)',
            'Average calculation and all outputs (1)'
        ],
        sampleAnswer: '// Declare array for 24 hourly readings\nDECLARE temps: ARRAY[0:23] OF REAL\n\n// Input temperatures\nFOR hour ← 0 TO 23\n    OUTPUT "Enter temperature for hour ", hour, ": "\n    INPUT temps[hour]\nENDFOR\n\n// Initialize tracking variables\nmaxTemp ← temps[0]\nmaxHour ← 0\nminTemp ← temps[0]\nminHour ← 0\ntotal ← 0\n\n// Find max, min, and sum\nFOR hour ← 0 TO 23\n    total ← total + temps[hour]\n    \n    IF temps[hour] > maxTemp THEN\n        maxTemp ← temps[hour]\n        maxHour ← hour\n    ENDIF\n    \n    IF temps[hour] < minTemp THEN\n        minTemp ← temps[hour]\n        minHour ← hour\n    ENDIF\nENDFOR\n\n// Calculate average\naverage ← total / 24\n\n// Output results\nOUTPUT "Highest temperature: ", maxTemp, " at hour ", maxHour\nOUTPUT "Lowest temperature: ", minTemp, " at hour ", minHour\nOUTPUT "Average temperature: ", average'
    },
    {
        id: 20123,
        topic: 'data',
        marks: 4,
        year: '2023',
        paper: 'Paper 1',
        question: 'An image has a resolution of 1920 × 1080 pixels with a colour depth of 24 bits.\n(a) Calculate the file size in megabytes. Show your working. [3]\n(b) Explain how reducing the colour depth would affect the image. [1]',
        markScheme: [
            '(a) Total pixels: 1920 × 1080 = 2,073,600 (1)',
            '(a) Total bits: 2,073,600 × 24 = 49,766,400 (1)',
            '(a) File size: 49,766,400 ÷ 8 ÷ 1,000,000 ≈ 6.22 MB (1)',
            '(b) Fewer colors available / less smooth gradients / possible banding (1)'
        ],
        sampleAnswer: '(a) File size calculation:\nTotal pixels = 1920 × 1080 = 2,073,600 pixels\nBits per pixel = 24\nTotal bits = 2,073,600 × 24 = 49,766,400 bits\nTotal bytes = 49,766,400 ÷ 8 = 6,220,800 bytes\nMegabytes = 6,220,800 ÷ 1,000,000 = 6.22 MB\n\n(b) Reducing colour depth would reduce the number of available colours. This could cause visible banding in gradients (smooth colour transitions would appear as distinct steps), loss of subtle colour variations, and an overall less realistic or natural appearance in photographs.'
    },

    // ========== MORE PROGRAMMING CONCEPTS ==========
    {
        id: 20124,
        topic: 'programming',
        marks: 5,
        year: '2022',
        paper: 'Paper 1',
        question: 'Describe the purpose of the following types of test data:\n(a) Normal data [2]\n(b) Boundary data [2]\n(c) Erroneous data [1]\n\nGive an example of each for a program that accepts ages between 18 and 65.',
        markScheme: [
            '(a) Normal: typical/expected valid input (1)',
            '(a) Example: 25, 40, 50 (any valid age in range) (1)',
            '(b) Boundary: values at edges of valid range (1)',
            '(b) Example: 17, 18, 65, 66 (1)',
            '(c) Erroneous: invalid/wrong type data that should be rejected (1)',
            '(c) Example: -5, "abc", 150 (1)'
        ],
        sampleAnswer: '(a) Normal data: Typical, expected input values that the program should handle correctly. These test that the program works under everyday conditions.\nExample for age 18-65: 25, 40, 50 (typical ages within the valid range)\n\n(b) Boundary data: Values at the edges of acceptable ranges. These are crucial because errors often occur at boundaries.\nExample for age 18-65:\n- 17 (just below minimum - should be rejected)\n- 18 (minimum valid - should be accepted)\n- 65 (maximum valid - should be accepted)\n- 66 (just above maximum - should be rejected)\n\n(c) Erroneous data: Invalid input that the program should reject. Tests that validation and error handling work correctly.\nExample for age 18-65: -5 (negative age), "twenty" (wrong type - text instead of number), 200 (unrealistic value)'
    },
    {
        id: 20125,
        topic: 'programming',
        marks: 4,
        year: '2023',
        paper: 'Paper 2',
        question: 'Explain the difference between a syntax error and a logic error. Give one example of each in pseudocode.',
        markScheme: [
            'Syntax error: violates language rules / prevents compilation (1)',
            'Example: missing ENDIF, misspelled keyword, wrong brackets (1)',
            'Logic error: program runs but produces incorrect output (1)',
            'Example: using + instead of -, wrong comparison operator (1)'
        ],
        sampleAnswer: 'Syntax Error:\nA syntax error occurs when code violates the grammatical rules of the programming language. The program cannot be compiled or run until the error is fixed. The error is usually identified by the compiler/interpreter.\n\nExample:\nIF age > 18 THEN\n    OUTPUT "Adult"\n// Missing ENDIF - syntax error\n\nLogic Error:\nA logic error occurs when the program runs without crashing but produces incorrect results. The code is syntactically correct but doesn\'t do what was intended. These errors are harder to find as no error message is shown.\n\nExample:\naverage ← (num1 + num2 + num3) / 2  // Should divide by 3, not 2\n\nThis calculates the wrong average but doesn\'t cause any error message.'
    },

    // ========== ETHICS & BIGGER PICTURE ==========
    {
        id: 20126,
        topic: 'bigger-picture',
        marks: 6,
        year: '2023',
        paper: 'Paper 1',
        question: 'Discuss the ethical implications of using artificial intelligence (AI) for making decisions about job applications.\n\nConsider both advantages and disadvantages in your answer.',
        markScheme: [
            'Advantage: Faster processing of large volumes of applications (1)',
            'Advantage: Potential consistency/reduced human bias (1)',
            'Disadvantage: Algorithmic bias from training data (1)',
            'Disadvantage: Lack of transparency in decisions (1)',
            'Disadvantage: Privacy concerns with data collection (1)',
            'Discussion of accountability/fairness issues (1)'
        ],
        sampleAnswer: 'Advantages of AI in recruitment:\n1. Efficiency: AI can process thousands of applications quickly, reducing time-to-hire and freeing HR staff for other tasks.\n2. Consistency: AI applies the same criteria to every application, potentially eliminating inconsistencies from human fatigue or mood variations.\n\nDisadvantages and ethical concerns:\n1. Algorithmic Bias: If the AI is trained on historical hiring data, it may perpetuate past discrimination. For example, if a company historically hired fewer women, the AI might learn to favour male candidates.\n\n2. Lack of Transparency: AI decision-making can be a "black box" - candidates may not understand why they were rejected, making it difficult to challenge unfair decisions.\n\n3. Privacy: AI systems may collect and analyse extensive personal data from social media and other sources without explicit consent.\n\n4. Accountability: When AI makes a discriminatory decision, it\'s unclear who is responsible - the company, the AI developers, or the training data providers.\n\nConclusion: While AI can improve efficiency, organisations must ensure systems are regularly audited for bias, decisions are explainable, and human oversight remains in place for final decisions.'
    },
    {
        id: 20127,
        topic: 'bigger-picture',
        marks: 4,
        year: '2022',
        paper: 'Paper 1',
        question: 'Explain what the digital divide is and describe two ways it can affect society.',
        markScheme: [
            'Digital divide: gap between those with/without access to technology (1)',
            'Can be geographical, economic, or generational (1)',
            'Effect 1: Educational disadvantage - limited access to online learning (1)',
            'Effect 2: Economic/employment disadvantage - cannot apply for jobs online (1)'
        ],
        sampleAnswer: 'The digital divide refers to the gap between individuals, communities, or countries who have access to modern information and communication technology and those who do not. This divide can exist due to:\n- Economic factors (cannot afford devices/internet)\n- Geographic factors (rural areas with poor infrastructure)\n- Age factors (older generations less familiar with technology)\n- Educational factors (lacking digital skills)\n\nEffects on society:\n\n1. Educational Inequality: Students without home internet access struggle to complete online homework, access educational resources, or participate in remote learning. This widens the achievement gap between wealthy and disadvantaged students.\n\n2. Employment Barriers: Many jobs require online applications, digital skills, or remote working capability. Those on the wrong side of the digital divide may be unable to find employment or are limited to lower-paying jobs that don\'t require technology, perpetuating economic inequality.'
    },

    // ========== MORE DATA REPRESENTATION ==========
    {
        id: 20128,
        topic: 'data',
        marks: 4,
        year: '2023',
        paper: 'Paper 1',
        question: 'Using the Caesar cipher with a shift of 5:\n(a) Encrypt the message "HELLO" [2]\n(b) Explain one weakness of the Caesar cipher [2]',
        markScheme: [
            '(a) H→M, E→J, L→Q, L→Q, O→T (1)',
            '(a) Encrypted message: MJQQT (1)',
            '(b) Only 25 possible shifts / easy to brute force (1)',
            '(b) Letter frequency analysis can crack it (1)'
        ],
        sampleAnswer: '(a) Encrypting "HELLO" with shift 5:\nH (position 7) + 5 = M (position 12)\nE (position 4) + 5 = J (position 9)\nL (position 11) + 5 = Q (position 16)\nL (position 11) + 5 = Q (position 16)\nO (position 14) + 5 = T (position 19)\n\nEncrypted message: MJQQT\n\n(b) Weakness: The Caesar cipher has only 25 possible shift values, making it extremely vulnerable to brute force attack. An attacker can simply try all 25 shifts until readable text appears. Additionally, the cipher preserves letter frequency - "E" is the most common letter in English, so the most frequent letter in the ciphertext likely represents "E", making frequency analysis attacks straightforward.'
    },
    {
        id: 20129,
        topic: 'data',
        marks: 5,
        year: '2022',
        paper: 'Paper 1',
        question: 'Explain what Run Length Encoding (RLE) is and demonstrate how it would compress the following string:\n\n"AAABBBBCCCCCCDDDD"\n\nCalculate the compression ratio.',
        markScheme: [
            'RLE replaces runs of identical characters with count and character (1)',
            'Compressed: 3A4B6C4D (1)',
            'Original length: 17 characters (1)',
            'Compressed length: 8 characters (1)',
            'Ratio: 8/17 = 0.47 or ~47% or 2.1:1 compression (1)'
        ],
        sampleAnswer: 'Run Length Encoding (RLE) is a simple lossless compression technique that replaces consecutive sequences (runs) of identical characters with the character followed by the count of how many times it appears.\n\nOriginal string: "AAABBBBCCCCCCDDDD" (17 characters)\n\nCompressing:\n- AAA → 3A (3 copies of A)\n- BBBB → 4B (4 copies of B)\n- CCCCCC → 6C (6 copies of C)\n- DDDD → 4D (4 copies of D)\n\nCompressed string: "3A4B6C4D" (8 characters)\n\nCompression ratio calculation:\nOriginal size: 17 characters\nCompressed size: 8 characters\nRatio: 8 ÷ 17 = 0.47 (or 47% of original)\nCompression ratio: 17:8 ≈ 2.1:1\n\nThe data has been reduced to less than half its original size.'
    },

    // ========== ADDITIONAL PROGRAMMING ==========
    {
        id: 20130,
        topic: 'programming',
        marks: 5,
        year: '2023',
        paper: 'Paper 2',
        question: 'Write pseudocode for a function that takes a string and returns it reversed. For example, "HELLO" would return "OLLEH".',
        markScheme: [
            'Function declaration with string parameter (1)',
            'Initialize empty result string (1)',
            'Loop from end to start of string (1)',
            'Concatenate each character to result (1)',
            'Return the reversed string (1)'
        ],
        sampleAnswer: 'FUNCTION reverseString(text)\n    reversed ← ""\n    \n    // Loop from end to start\n    FOR i ← LENGTH(text) - 1 TO 0 STEP -1\n        // Get character at position i\n        char ← SUBSTRING(text, i, 1)\n        // Add to result\n        reversed ← reversed & char\n    ENDFOR\n    \n    RETURN reversed\nENDFUNCTION\n\n// Alternative using array approach:\nFUNCTION reverseString(text)\n    reversed ← ""\n    length ← LENGTH(text)\n    \n    FOR i ← 0 TO length - 1\n        // Get character from end\n        char ← SUBSTRING(text, length - 1 - i, 1)\n        reversed ← reversed & char\n    ENDFOR\n    \n    RETURN reversed\nENDFUNCTION'
    },
    {
        id: 20131,
        topic: 'programming',
        marks: 4,
        year: '2022',
        paper: 'Paper 2',
        question: 'Explain the difference between:\n(a) Local and global variables [2]\n(b) Passing parameters by value and by reference [2]',
        markScheme: [
            '(a) Local: only accessible within function/procedure where declared (1)',
            '(a) Global: accessible from anywhere in the program (1)',
            '(b) By value: copy of data passed, original unchanged (1)',
            '(b) By reference: address passed, original can be modified (1)'
        ],
        sampleAnswer: '(a) Local vs Global Variables:\n\nLocal variables are declared inside a function or procedure and can only be accessed within that function. They are created when the function runs and destroyed when it ends. This keeps data isolated and prevents unintended modifications.\n\nGlobal variables are declared outside all functions and can be accessed from anywhere in the program. While convenient, they can make code harder to debug and maintain because any part of the program can modify them.\n\n(b) Passing by Value vs Reference:\n\nBy Value: A copy of the data is passed to the function. Any changes made inside the function affect only the copy; the original variable remains unchanged. Used when you don\'t want the function to modify the original data.\n\nBy Reference: The memory address of the variable is passed. The function works directly with the original data, so any changes affect the original variable. Used when you need the function to modify the original data or when passing large data structures to avoid copying overhead.'
    }
];

// Append additional past paper questions to the array
PAST_PAPER_QUESTIONS.push(...ADDITIONAL_PAST_PAPER_QUESTIONS);

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


// ==================== ADDITIONAL 100+ QUESTIONS ====================

const EXTRA_QUESTIONS = [
    // MORE PROBLEM SOLVING
    { id: 300, topic: 'problem-solving', question: 'What is the main advantage of merge sort over bubble sort?', options: ['Uses less code', 'More efficient for large datasets O(n log n) vs O(n²)', 'Easier to understand', 'Works on unsorted data only'], answer: 1, explanation: 'Merge sort has O(n log n) time complexity, much better than bubble sort\'s O(n²) for large datasets.' },
    { id: 301, topic: 'problem-solving', question: 'In a trace table, what do rows represent?', options: ['Variables', 'Each step/iteration of execution', 'Outputs only', 'Input values'], answer: 1, explanation: 'Each row in a trace table represents one step or iteration of the program execution.' },
    { id: 302, topic: 'problem-solving', question: 'What is the best case time complexity of bubble sort?', options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'], answer: 1, explanation: 'Best case is O(n) when data is already sorted - only one pass needed.' },
    { id: 303, topic: 'problem-solving', question: 'Which sorting algorithm is stable?', options: ['Quick sort', 'Heap sort', 'Merge sort', 'Selection sort'], answer: 2, explanation: 'Merge sort is stable - it preserves the relative order of equal elements.' },
    { id: 304, topic: 'problem-solving', question: 'What is the space complexity of merge sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2, explanation: 'Merge sort requires O(n) additional space for the temporary arrays during merging.' },
    
    // MORE DATA REPRESENTATION
    { id: 410, topic: 'data', question: 'What is the maximum unsigned value for 8 bits?', options: ['127', '128', '255', '256'], answer: 2, explanation: '8 bits can represent 2^8 = 256 values, from 0 to 255 (255 is the maximum).' },
    { id: 411, topic: 'data', question: 'Convert hexadecimal FF to denary:', options: ['15', '16', '255', '256'], answer: 2, explanation: 'FF in hex = 15×16 + 15 = 240 + 15 = 255.' },
    { id: 412, topic: 'data', question: 'What is the range of signed 8-bit two\'s complement?', options: ['0 to 255', '-127 to 128', '-128 to 127', '-256 to 255'], answer: 2, explanation: 'Two\'s complement 8-bit ranges from -128 to +127 (-2^7 to 2^7-1).' },
    { id: 413, topic: 'data', question: 'How many bits are in a nibble?', options: ['2', '4', '8', '16'], answer: 1, explanation: 'A nibble is 4 bits, half a byte. One hex digit represents one nibble.' },
    { id: 314, topic: 'data', question: 'What does lossy compression mean?', options: ['No data is lost', 'Some data is permanently removed', 'File size increases', 'Cannot be undone but all data kept'], answer: 1, explanation: 'Lossy compression permanently removes some data to achieve smaller file sizes.' },
    { id: 415, topic: 'data', question: 'Which is an example of lossy compression?', options: ['ZIP', 'PNG', 'MP3', 'GIF'], answer: 2, explanation: 'MP3 is lossy audio compression. ZIP and PNG are lossless.' },
    { id: 416, topic: 'data', question: 'What is RLE compression?', options: ['Removes colors', 'Replaces runs of identical data with count', 'Encrypts data', 'Splits files'], answer: 1, explanation: 'Run Length Encoding replaces sequences of identical data with the value and a count.' },
    { id: 417, topic: 'data', question: 'Calculate 1010 AND 1100:', options: ['1000', '1110', '0110', '1010'], answer: 0, explanation: 'AND: both bits must be 1. Position by position: 1&1=1, 0&1=0, 1&0=0, 0&0=0 = 1000.' },
    { id: 418, topic: 'data', question: 'Calculate 1010 OR 1100:', options: ['1000', '1110', '0110', '1010'], answer: 1, explanation: 'OR: either bit can be 1. Position by position: 1|1=1, 0|1=1, 1|0=1, 0|0=0 = 1110.' },
    { id: 419, topic: 'data', question: 'What is a check digit used for?', options: ['Encryption', 'Detecting transcription errors', 'Compression', 'Authentication'], answer: 1, explanation: 'Check digits detect errors when data is entered or transmitted (like ISBN, barcodes).' },
    
    // MORE HARDWARE
    { id: 420, topic: 'computers', question: 'What does volatile memory mean?', options: ['Explodes easily', 'Loses data when power is off', 'Is very fast', 'Cannot be written to'], answer: 1, explanation: 'Volatile memory (like RAM) loses all stored data when power is turned off.' },
    { id: 421, topic: 'computers', question: 'Which register holds the address of the next instruction?', options: ['MAR', 'MDR', 'Program Counter', 'Accumulator'], answer: 2, explanation: 'The Program Counter (PC) holds the memory address of the next instruction to fetch.' },
    { id: 422, topic: 'computers', question: 'What is the function of the ALU?', options: ['Store data', 'Perform calculations and logic', 'Fetch instructions', 'Decode instructions'], answer: 1, explanation: 'The Arithmetic Logic Unit performs mathematical operations and logical comparisons.' },
    { id: 423, topic: 'computers', question: 'What is clock speed measured in?', options: ['Bytes', 'Hertz (Hz)', 'Bits per second', 'Watts'], answer: 1, explanation: 'Clock speed is measured in Hertz (Hz) - cycles per second. Modern CPUs use GHz.' },
    { id: 424, topic: 'computers', question: 'What does increasing core count allow?', options: ['Faster single tasks', 'Parallel processing of multiple tasks', 'More storage', 'Better graphics'], answer: 1, explanation: 'Multiple cores allow parallel processing - running several tasks simultaneously.' },
    { id: 425, topic: 'computers', question: 'What is an SSD?', options: ['Spinning disk storage', 'Solid State Drive with flash memory', 'A type of RAM', 'A processor'], answer: 1, explanation: 'SSDs use flash memory with no moving parts - faster and more reliable than HDDs.' },
    { id: 226, topic: 'computers', question: 'What is the purpose of the control unit?', options: ['Perform calculations', 'Coordinate and manage CPU operations', 'Store programs', 'Connect peripherals'], answer: 1, explanation: 'The Control Unit coordinates all CPU activities, managing fetch-decode-execute cycle.' },
    { id: 227, topic: 'computers', question: 'What is cache memory used for?', options: ['Long-term storage', 'Storing frequently accessed data for fast access', 'Boot instructions', 'Graphics processing'], answer: 1, explanation: 'Cache stores frequently used data/instructions for faster CPU access than main RAM.' },
    { id: 228, topic: 'computers', question: 'Which has the fastest access time?', options: ['HDD', 'SSD', 'RAM', 'Cache'], answer: 3, explanation: 'Cache is fastest, then RAM, then SSD, then HDD (slowest).' },
    { id: 229, topic: 'computers', question: 'What is embedded system?', options: ['Computer inside another device', 'A gaming PC', 'Cloud computing', 'A type of virus'], answer: 0, explanation: 'Embedded systems are computers built into devices like washing machines, cars, ATMs.' },
    
    // MORE NETWORKS
    { id: 230, topic: 'networks', question: 'What layer of TCP/IP handles routing?', options: ['Application', 'Transport', 'Internet', 'Link'], answer: 2, explanation: 'The Internet layer (IP) handles addressing and routing packets across networks.' },
    { id: 231, topic: 'networks', question: 'What port does HTTPS use?', options: ['80', '443', '21', '25'], answer: 1, explanation: 'HTTPS (secure web) uses port 443. HTTP uses port 80.' },
    { id: 232, topic: 'networks', question: 'What is a MAC address?', options: ['Internet Protocol address', 'Unique hardware address for NIC', 'Website URL', 'Email address'], answer: 1, explanation: 'MAC (Media Access Control) address is a unique identifier burned into network hardware.' },
    { id: 233, topic: 'networks', question: 'Which protocol sends email?', options: ['POP3', 'IMAP', 'SMTP', 'HTTP'], answer: 2, explanation: 'SMTP (Simple Mail Transfer Protocol) sends emails. POP3/IMAP receive them.' },
    { id: 234, topic: 'networks', question: 'What is the purpose of DNS?', options: ['Block malware', 'Translate domain names to IP addresses', 'Encrypt data', 'Assign IP addresses'], answer: 1, explanation: 'DNS (Domain Name System) converts human-readable domains to IP addresses.' },
    { id: 235, topic: 'networks', question: 'What topology has a single point of failure at the center?', options: ['Bus', 'Ring', 'Star', 'Mesh'], answer: 2, explanation: 'Star topology relies on central hub/switch - if it fails, whole network fails.' },
    { id: 236, topic: 'networks', question: 'What is bandwidth?', options: ['Physical width of cable', 'Maximum data transfer rate', 'Number of users', 'Type of signal'], answer: 1, explanation: 'Bandwidth is the maximum amount of data that can be transmitted per second.' },
    { id: 237, topic: 'networks', question: 'What does NAT do?', options: ['Blocks viruses', 'Translates private to public IP addresses', 'Encrypts traffic', 'Speeds up internet'], answer: 1, explanation: 'NAT (Network Address Translation) allows multiple devices to share one public IP.' },
    { id: 238, topic: 'networks', question: 'Which is more secure: HTTP or HTTPS?', options: ['HTTP', 'HTTPS', 'Both equal', 'Neither is secure'], answer: 1, explanation: 'HTTPS uses SSL/TLS encryption to secure data in transit. HTTP is unencrypted.' },
    { id: 239, topic: 'networks', question: 'What is a packet?', options: ['Physical envelope', 'Small unit of data with header info', 'Type of cable', 'Network device'], answer: 1, explanation: 'A packet is a small chunk of data with headers containing source, destination, etc.' },
    
    // MORE SECURITY
    { id: 240, topic: 'networks', question: 'What is phishing?', options: ['Catching fish online', 'Tricking users to reveal sensitive info', 'A firewall type', 'Encryption method'], answer: 1, explanation: 'Phishing uses fake emails/websites to trick users into revealing passwords, etc.' },
    { id: 241, topic: 'networks', question: 'What is two-factor authentication (2FA)?', options: ['Two passwords', 'Using two different login methods', 'Double encryption', 'Dual monitors'], answer: 1, explanation: '2FA requires two different verification methods (password + phone code, etc.).' },
    { id: 242, topic: 'networks', question: 'What is ransomware?', options: ['Antivirus software', 'Malware that encrypts files and demands payment', 'A type of firewall', 'Spam filter'], answer: 1, explanation: 'Ransomware encrypts victim\'s files and demands payment for the decryption key.' },
    { id: 243, topic: 'networks', question: 'What is a brute force attack?', options: ['Physical break-in', 'Trying all possible password combinations', 'Social engineering', 'Network flooding'], answer: 1, explanation: 'Brute force systematically tries all possible combinations until finding correct password.' },
    { id: 244, topic: 'networks', question: 'What is the purpose of a firewall?', options: ['Cool down computer', 'Filter network traffic based on rules', 'Store passwords', 'Speed up internet'], answer: 1, explanation: 'Firewalls monitor and filter incoming/outgoing network traffic based on security rules.' },
    { id: 245, topic: 'networks', question: 'What is social engineering?', options: ['Building social networks', 'Manipulating people to reveal information', 'Programming social apps', 'Network design'], answer: 1, explanation: 'Social engineering manipulates people psychologically to divulge confidential information.' },
    { id: 246, topic: 'networks', question: 'What is a DDoS attack?', options: ['Data theft', 'Overwhelming a server with traffic', 'Password cracking', 'Phishing'], answer: 1, explanation: 'DDoS (Distributed Denial of Service) floods servers with requests to make them unavailable.' },
    { id: 247, topic: 'networks', question: 'Why use different passwords for different accounts?', options: ['To remember them easily', 'If one is compromised, others stay safe', 'It\'s the law', 'For fun'], answer: 1, explanation: 'If one site is breached, unique passwords prevent attackers accessing your other accounts.' },
    { id: 248, topic: 'networks', question: 'What makes a strong password?', options: ['Short and simple', 'Long with mixed characters, numbers, symbols', 'Your birthday', 'Common words'], answer: 1, explanation: 'Strong passwords are long (12+), use mixed case, numbers, symbols, and avoid dictionary words.' },
    { id: 249, topic: 'networks', question: 'What is biometric authentication?', options: ['Using passwords', 'Using physical characteristics (fingerprint, face)', 'Using security questions', 'Using PINs'], answer: 1, explanation: 'Biometrics use unique physical traits like fingerprints, face, iris, or voice for authentication.' },
    
    // MORE PROGRAMMING
    { id: 250, topic: 'programming', question: 'What is a local variable?', options: ['Available everywhere', 'Only accessible within its function/procedure', 'Stored on disk', 'A constant'], answer: 1, explanation: 'Local variables exist only within the block where they\'re declared.' },
    { id: 251, topic: 'programming', question: 'What is a global variable?', options: ['On the internet', 'Accessible from anywhere in the program', 'Only in main()', 'A parameter'], answer: 1, explanation: 'Global variables can be accessed from any part of the program.' },
    { id: 252, topic: 'programming', question: 'What is recursion?', options: ['A loop type', 'A function calling itself', 'An error', 'A data type'], answer: 1, explanation: 'Recursion is when a function calls itself to solve smaller instances of a problem.' },
    { id: 253, topic: 'programming', question: 'What is a parameter?', options: ['A variable type', 'Value passed to a function', 'A loop counter', 'An output'], answer: 1, explanation: 'Parameters are values passed into functions/procedures for them to work with.' },
    { id: 254, topic: 'programming', question: 'What is the difference between == and = ?', options: ['No difference', '== compares, = assigns', '= compares, == assigns', 'Both compare'], answer: 1, explanation: '== is comparison (equals), = is assignment (store value in variable).' },
    { id: 255, topic: 'programming', question: 'What is debugging?', options: ['Adding bugs', 'Finding and fixing errors', 'Removing features', 'Writing documentation'], answer: 1, explanation: 'Debugging is the process of finding, understanding, and fixing errors (bugs) in code.' },
    { id: 256, topic: 'programming', question: 'What is a syntax error?', options: ['Logic mistake', 'Violation of language rules', 'Runtime crash', 'User error'], answer: 1, explanation: 'Syntax errors violate the grammar rules of the programming language.' },
    { id: 257, topic: 'programming', question: 'What is a logic error?', options: ['Syntax mistake', 'Code runs but produces wrong results', 'Won\'t compile', 'Crashes computer'], answer: 1, explanation: 'Logic errors mean the code runs but doesn\'t do what was intended.' },
    { id: 258, topic: 'programming', question: 'What is file handling used for?', options: ['Organizing folders', 'Reading from and writing to files', 'Compressing files', 'Deleting files only'], answer: 1, explanation: 'File handling allows programs to read, write, and manipulate data in files.' },
    { id: 259, topic: 'programming', question: 'What does APPEND mode do?', options: ['Deletes file content', 'Adds data to end without deleting existing', 'Creates new file', 'Reads only'], answer: 1, explanation: 'APPEND mode adds new data to the end of a file without removing existing content.' },
    
    // MORE SOFTWARE & OS
    { id: 260, topic: 'computers', question: 'What is multitasking?', options: ['One task at a time', 'Running multiple programs simultaneously', 'Multiple users', 'Batch processing'], answer: 1, explanation: 'Multitasking allows the OS to run multiple programs at the same time (or appear to).' },
    { id: 261, topic: 'computers', question: 'What is virtual memory?', options: ['Cloud storage', 'Using disk space as extra RAM', 'Fast RAM', 'GPU memory'], answer: 1, explanation: 'Virtual memory uses hard drive space to extend available RAM when physical RAM is full.' },
    { id: 262, topic: 'computers', question: 'What is a device driver?', options: ['A mechanic', 'Software enabling OS to communicate with hardware', 'A USB stick', 'A peripheral'], answer: 1, explanation: 'Device drivers are software that let the OS communicate with hardware devices.' },
    { id: 263, topic: 'computers', question: 'What is defragmentation?', options: ['Breaking files', 'Reorganizing files for faster access', 'Deleting files', 'Compressing files'], answer: 1, explanation: 'Defragmentation reorganizes fragmented file data on HDDs to improve read speed.' },
    { id: 264, topic: 'computers', question: 'What type of software is a word processor?', options: ['System software', 'Application software', 'Utility software', 'Firmware'], answer: 1, explanation: 'Word processors are application software - programs users interact with directly.' },
    { id: 265, topic: 'computers', question: 'What is open source software?', options: ['Free to download', 'Source code available for anyone to view/modify', 'Made by Google', 'Shareware'], answer: 1, explanation: 'Open source means the source code is freely available to view, modify, and distribute.' },
    { id: 266, topic: 'computers', question: 'What is the purpose of an interpreter?', options: ['Translate entire program before running', 'Translate and execute code line by line', 'Write code', 'Debug code'], answer: 1, explanation: 'Interpreters translate and execute source code one line at a time.' },
    { id: 267, topic: 'computers', question: 'What is the purpose of a compiler?', options: ['Run code line by line', 'Translate entire program to machine code first', 'Fix errors', 'Store programs'], answer: 1, explanation: 'Compilers translate the entire source code to machine code before execution.' },
    { id: 268, topic: 'computers', question: 'What is utility software?', options: ['Games', 'Programs that maintain and optimize the system', 'Word processors', 'Web browsers'], answer: 1, explanation: 'Utility software performs maintenance tasks like antivirus, disk cleanup, backup.' },
    { id: 269, topic: 'computers', question: 'What is firmware?', options: ['Software stored in ROM/flash', 'Cloud software', 'Application', 'A virus'], answer: 0, explanation: 'Firmware is software permanently stored in hardware (ROM/flash) like BIOS.' },
    
    // DATABASES
    { id: 270, topic: 'databases', question: 'What is a primary key?', options: ['The first column', 'Unique identifier for each record', 'The largest value', 'A password'], answer: 1, explanation: 'A primary key uniquely identifies each record in a table - no duplicates allowed.' },
    { id: 271, topic: 'databases', question: 'What is a foreign key?', options: ['Key from another country', 'Links to primary key in another table', 'Backup key', 'Encrypted key'], answer: 1, explanation: 'A foreign key is a field that references the primary key in another table.' },
    { id: 272, topic: 'databases', question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Question Language', 'System Quality Level', 'Standard Query Logic'], answer: 0, explanation: 'SQL = Structured Query Language, used to manage and query databases.' },
    { id: 273, topic: 'databases', question: 'What does SELECT do in SQL?', options: ['Deletes data', 'Retrieves data from database', 'Updates records', 'Creates tables'], answer: 1, explanation: 'SELECT retrieves (queries) data from one or more database tables.' },
    { id: 274, topic: 'databases', question: 'What is a database record?', options: ['A column', 'A single row containing related data', 'The whole table', 'A query'], answer: 1, explanation: 'A record (row) contains all the data about one item in the table.' },
    { id: 275, topic: 'databases', question: 'What is a database field?', options: ['A row', 'A single piece of data / column', 'The whole database', 'A report'], answer: 1, explanation: 'A field (column) holds one specific piece of information for all records.' },
    { id: 276, topic: 'databases', question: 'What SQL command adds new records?', options: ['SELECT', 'UPDATE', 'INSERT', 'DELETE'], answer: 2, explanation: 'INSERT INTO adds new records to a database table.' },
    { id: 277, topic: 'databases', question: 'What SQL command modifies existing data?', options: ['SELECT', 'UPDATE', 'INSERT', 'CREATE'], answer: 1, explanation: 'UPDATE modifies existing records in a table.' },
    { id: 278, topic: 'databases', question: 'What does WHERE clause do?', options: ['Sorts results', 'Filters results based on conditions', 'Counts records', 'Joins tables'], answer: 1, explanation: 'WHERE filters the results to show only records matching specified conditions.' },
    { id: 279, topic: 'databases', question: 'What is data redundancy?', options: ['Backup data', 'Same data stored multiple times unnecessarily', 'Missing data', 'Encrypted data'], answer: 1, explanation: 'Data redundancy is unnecessary duplication of data, wasting space and causing inconsistencies.' }
];

// Add extra questions to main QUESTIONS array
QUESTIONS.push(...EXTRA_QUESTIONS);

// More flashcards for comprehensive coverage
const MORE_FLASHCARDS = [
    { id: 101, topic: 'problem-solving', front: 'Insertion Sort', back: 'Builds sorted array one item at a time. Takes each element and inserts into correct position. O(n²) worst case, O(n) best case (nearly sorted). Good for small or nearly sorted datasets.' },
    { id: 102, topic: 'problem-solving', front: 'Quick Sort', back: 'Divide and conquer. Pick pivot, partition array (smaller left, larger right), recursively sort. O(n log n) average, O(n²) worst (bad pivot). In-place, not stable.' },
    { id: 103, topic: 'data', front: 'Sample Rate', back: 'Number of samples taken per second when digitizing audio. Measured in Hz. Higher rate = better quality but larger file. CD quality = 44,100 Hz.' },
    { id: 104, topic: 'data', front: 'Bit Depth', back: 'Number of bits per sample in digital audio. More bits = more amplitude levels = better quality. 16-bit = 65,536 levels. CD quality = 16-bit.' },
    { id: 105, topic: 'data', front: 'Color Depth', back: 'Number of bits used per pixel. More bits = more colors. 1-bit = 2 colors, 8-bit = 256 colors, 24-bit = 16.7 million colors (true color).' },
    { id: 106, topic: 'data', front: 'Image Resolution', back: 'Number of pixels in an image (width × height). Higher resolution = more detail but larger file size. E.g., 1920×1080 = 2,073,600 pixels.' },
    { id: 107, topic: 'computers', front: 'Von Neumann Architecture', back: 'CPU and memory are separate. Instructions and data share same memory and bus. Fetch-decode-execute cycle. Single bus can be bottleneck.' },
    { id: 108, topic: 'computers', front: 'Harvard Architecture', back: 'Separate memory and buses for instructions and data. Can fetch instruction while accessing data (faster). Used in embedded systems, DSPs.' },
    { id: 109, topic: 'networks', front: 'Client-Server Model', back: 'Server provides services/resources, clients request them. Centralized control, easier security/backup. Examples: web servers, email servers.' },
    { id: 110, topic: 'networks', front: 'Peer-to-Peer (P2P)', back: 'All computers equal - can be both client and server. No central server. Good for sharing files. Examples: BitTorrent, some games.' },
    { id: 111, topic: 'networks', front: 'Cloud Computing', back: 'Services over internet: IaaS (infrastructure), PaaS (platform), SaaS (software). Benefits: scalable, pay-per-use, accessible anywhere.' },
    { id: 112, topic: 'networks', front: 'Symmetric Encryption', back: 'Same key encrypts and decrypts. Fast but key distribution problem. Examples: AES, DES. Used for bulk data encryption.' },
    { id: 113, topic: 'networks', front: 'Asymmetric Encryption', back: 'Public key encrypts, private key decrypts (or vice versa). Slower but solves key distribution. Examples: RSA. Used for key exchange, digital signatures.' },
    { id: 114, topic: 'networks', front: 'Digital Certificate', back: 'Issued by Certificate Authority (CA). Contains public key and identity info. Verifies website/entity identity. Enables HTTPS.' },
    { id: 115, topic: 'programming', front: 'IDE Features', back: 'Integrated Development Environment: code editor, compiler/interpreter, debugger, auto-complete, syntax highlighting, version control, project management.' },
    { id: 116, topic: 'programming', front: 'Testing Types', back: 'Normal data (expected input), Boundary data (edge of valid range), Erroneous data (invalid/wrong type). Ensures program handles all cases.' },
    { id: 117, topic: 'databases', front: 'ACID Properties', back: 'Atomicity (all or nothing), Consistency (valid state), Isolation (transactions independent), Durability (committed data persists). Ensures reliable transactions.' },
    { id: 118, topic: 'databases', front: 'SQL Wildcards', back: '% matches any sequence of characters. _ matches single character. Used with LIKE. Example: WHERE name LIKE "A%" finds names starting with A.' },
    { id: 119, topic: 'bigger-picture', front: 'Digital Divide', back: 'Gap between those with access to technology and those without. Causes: cost, infrastructure, education. Effects: economic/educational inequality.' },
    { id: 120, topic: 'bigger-picture', front: 'Automation Impact', back: 'Pros: efficiency, consistency, dangerous job replacement. Cons: job losses, skill gaps, initial cost. Society must adapt with retraining.' }
];

// Add more flashcards
FLASHCARDS.push(...MORE_FLASHCARDS);

// ==================== EXPANDED FLASHCARDS (CS Theory) ====================
const EXPANDED_FLASHCARDS = [
    // Binary/Hex conversions
    { id: 500, topic: 'data', front: 'Convert binary 11001010 to denary', back: '128 + 64 + 8 + 2 = 202. Add place values where bit is 1: 128, 64, 32, 16, 8, 4, 2, 1' },
    { id: 501, topic: 'data', front: 'Convert denary 175 to binary', back: '10101111. Subtract largest place values: 175-128=47, 47-32=15, 15-8=7, 7-4=3, 3-2=1, 1-1=0' },
    { id: 502, topic: 'data', front: 'Convert hex A7 to denary', back: 'A7 = (10×16) + 7 = 160 + 7 = 167. A=10 in hex.' },
    { id: 503, topic: 'data', front: 'Convert denary 255 to hex', back: 'FF. 255÷16=15 remainder 15. Both 15s = F. Maximum 8-bit value.' },
    { id: 504, topic: 'data', front: 'Convert binary 11110000 to hex', back: 'F0. Split into nibbles: 1111=F, 0000=0. Each nibble = one hex digit.' },
    { id: 505, topic: 'data', front: 'Convert hex 2B to binary', back: '00101011. 2=0010, B=1011. Expand each hex digit to 4 bits.' },
    { id: 506, topic: 'data', front: 'Why use hexadecimal?', back: 'Shorter than binary (1 hex = 4 bits), easier for humans to read, used for colors (#FF0000), MAC addresses, memory addresses.' },
    { id: 507, topic: 'data', front: 'Binary addition: 1011 + 0111', back: '10010. Carry 1 when sum exceeds 1. 1+1=10, 1+1+1=11. Result may need extra bit.' },
    { id: 508, topic: 'data', front: 'What is binary overflow?', back: 'When result exceeds available bits. 8-bit max=255, so 200+100=300 overflows. Causes incorrect results.' },
    { id: 509, topic: 'data', front: 'Convert hex FF to binary', back: '11111111. F=1111, so FF=11111111. This equals 255 in denary.' },
    
    // Logic gates
    { id: 510, topic: 'computers', front: 'AND gate truth table', back: '0 AND 0 = 0, 0 AND 1 = 0, 1 AND 0 = 0, 1 AND 1 = 1. Output is 1 ONLY when ALL inputs are 1.' },
    { id: 511, topic: 'computers', front: 'OR gate truth table', back: '0 OR 0 = 0, 0 OR 1 = 1, 1 OR 0 = 1, 1 OR 1 = 1. Output is 1 when ANY input is 1.' },
    { id: 512, topic: 'computers', front: 'NOT gate function', back: 'Inverts input: NOT 0 = 1, NOT 1 = 0. Single input, single output. Also called inverter.' },
    { id: 513, topic: 'computers', front: 'XOR gate truth table', back: '0 XOR 0 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1, 1 XOR 1 = 0. Output is 1 when inputs DIFFER.' },
    { id: 514, topic: 'computers', front: 'NAND gate truth table', back: '0 NAND 0 = 1, 0 NAND 1 = 1, 1 NAND 0 = 1, 1 NAND 1 = 0. Opposite of AND. Universal gate.' },
    { id: 515, topic: 'computers', front: 'NOR gate truth table', back: '0 NOR 0 = 1, 0 NOR 1 = 0, 1 NOR 0 = 0, 1 NOR 1 = 0. Opposite of OR. Universal gate.' },
    { id: 516, topic: 'computers', front: 'Why are NAND/NOR called universal gates?', back: 'Any logic circuit can be built using only NAND gates (or only NOR gates). Simplifies manufacturing.' },
    { id: 517, topic: 'computers', front: 'Logic gate: A AND (NOT B)', back: 'Output 1 only when A=1 AND B=0. Used in circuits where you need A but not B.' },
    { id: 518, topic: 'computers', front: 'Half adder circuit', back: 'Adds 2 bits. Sum = A XOR B, Carry = A AND B. Basic building block for arithmetic circuits.' },
    { id: 519, topic: 'computers', front: 'Full adder circuit', back: 'Adds 3 bits (A, B, carry-in). Uses two half adders and an OR gate. Chains together for multi-bit addition.' },
    
    // Network protocols
    { id: 520, topic: 'networks', front: 'TCP (Transmission Control Protocol)', back: 'Reliable, connection-based. Guarantees delivery, order, error checking. Three-way handshake. Used: web, email, file transfer.' },
    { id: 521, topic: 'networks', front: 'UDP (User Datagram Protocol)', back: 'Fast, connectionless. No guarantee of delivery/order. Low overhead. Used: streaming, gaming, VoIP, DNS.' },
    { id: 522, topic: 'networks', front: 'TCP vs UDP speed', back: 'UDP faster due to no handshake, no acknowledgments, no retransmission. TCP slower but reliable.' },
    { id: 523, topic: 'networks', front: 'HTTP (HyperText Transfer Protocol)', back: 'Application layer protocol for web. Request-response model. Methods: GET (retrieve), POST (submit), PUT, DELETE. Port 80.' },
    { id: 524, topic: 'networks', front: 'HTTPS', back: 'HTTP + SSL/TLS encryption. Secure web browsing. Port 443. Protects data in transit. Uses digital certificates.' },
    { id: 525, topic: 'networks', front: 'FTP (File Transfer Protocol)', back: 'Transfers files between computers. Uses two connections: control (port 21) and data (port 20). Clear text, consider SFTP.' },
    { id: 526, topic: 'networks', front: 'SMTP (Simple Mail Transfer Protocol)', back: 'Sends email. Port 25 (or 587 with auth). Push protocol. Works with POP3/IMAP for receiving.' },
    { id: 527, topic: 'networks', front: 'POP3 vs IMAP', back: 'POP3: downloads and deletes from server. IMAP: keeps on server, syncs across devices. IMAP better for multiple devices.' },
    { id: 528, topic: 'networks', front: 'IP (Internet Protocol)', back: 'Addresses and routes packets. IPv4: 32-bit (4 billion addresses). IPv6: 128-bit (practically unlimited). Network layer.' },
    { id: 529, topic: 'networks', front: 'DHCP', back: 'Dynamic Host Configuration Protocol. Automatically assigns IP addresses to devices on a network. Simplifies network management.' },
    
    // CPU components
    { id: 530, topic: 'computers', front: 'ALU (Arithmetic Logic Unit)', back: 'Performs all calculations (add, subtract, multiply) and logical operations (AND, OR, comparisons). Core of CPU processing.' },
    { id: 531, topic: 'computers', front: 'Control Unit (CU)', back: 'Coordinates CPU operations. Fetches instructions, decodes them, controls data flow. Directs other components.' },
    { id: 532, topic: 'computers', front: 'Program Counter (PC)', back: 'Register holding memory address of NEXT instruction to fetch. Increments after each fetch (unless jump).' },
    { id: 533, topic: 'computers', front: 'Memory Address Register (MAR)', back: 'Holds address of memory location being accessed. Sends address to memory via address bus.' },
    { id: 534, topic: 'computers', front: 'Memory Data Register (MDR)', back: 'Holds data being transferred to/from memory. Acts as buffer between CPU and RAM.' },
    { id: 535, topic: 'computers', front: 'Current Instruction Register (CIR)', back: 'Holds the instruction currently being decoded/executed. Fed to decoder in control unit.' },
    { id: 536, topic: 'computers', front: 'Accumulator (ACC)', back: 'Register storing results of ALU calculations. Used for intermediate results. Single general-purpose register in simple CPUs.' },
    { id: 537, topic: 'computers', front: 'CPU Cache levels', back: 'L1: smallest, fastest, on CPU core. L2: larger, slightly slower. L3: shared between cores, largest. Reduces RAM access.' },
    { id: 538, topic: 'computers', front: 'Address Bus', back: 'Carries memory addresses from CPU to RAM. Unidirectional. Width determines max addressable memory (32-bit = 4GB).' },
    { id: 539, topic: 'computers', front: 'Data Bus', back: 'Carries actual data between CPU and memory/devices. Bidirectional. Width affects transfer speed (32-bit, 64-bit).' },
    
    // Data types and structures
    { id: 540, topic: 'programming', front: 'Integer data type', back: 'Whole numbers only (no decimals). Positive or negative. Examples: -5, 0, 42. Used for counting, indexing.' },
    { id: 541, topic: 'programming', front: 'Float/Real data type', back: 'Numbers with decimal points. Examples: 3.14, -0.5, 2.0. Used for measurements, calculations requiring precision.' },
    { id: 542, topic: 'programming', front: 'Boolean data type', back: 'Only two values: True or False (1 or 0). Used for conditions, flags, logic. 1 bit of information.' },
    { id: 543, topic: 'programming', front: 'Character data type', back: 'Single letter, digit, or symbol. Examples: \'A\', \'7\', \'@\'. Usually 1 byte (ASCII) or 2+ bytes (Unicode).' },
    { id: 544, topic: 'programming', front: 'String data type', back: 'Sequence of characters. Text data. Examples: "Hello", "123". Operations: concatenation, substring, length.' },
    { id: 545, topic: 'programming', front: 'Array data structure', back: 'Ordered collection of elements, same type. Fixed size. Access by index (0-based). O(1) access, O(n) search.' },
    { id: 546, topic: 'programming', front: 'Stack data structure', back: 'LIFO (Last In First Out). Operations: push (add), pop (remove). Used for undo, function calls, backtracking.' },
    { id: 547, topic: 'programming', front: 'Queue data structure', back: 'FIFO (First In First Out). Operations: enqueue (add), dequeue (remove). Used for print jobs, task scheduling.' },
    { id: 548, topic: 'programming', front: 'Linked list vs array', back: 'Linked list: dynamic size, O(1) insert/delete, O(n) access. Array: fixed size, O(1) access, O(n) insert/delete.' },
    { id: 549, topic: 'programming', front: 'Record/Struct', back: 'Collection of related fields, can be different types. Example: Student record with name(string), age(int), grade(char).' },
    
    // Algorithms (sorting, searching)
    { id: 550, topic: 'problem-solving', front: 'Linear Search algorithm', back: 'Check each element sequentially until found. O(n) time. Works on unsorted data. Simple but slow for large lists.' },
    { id: 551, topic: 'problem-solving', front: 'Binary Search algorithm', back: 'Divide sorted list in half each step. O(log n) time. REQUIRES sorted data. Very efficient for large lists.' },
    { id: 552, topic: 'problem-solving', front: 'Binary search step-by-step', back: '1. Find middle element. 2. If target=middle, found. 3. If target<middle, search left half. 4. If target>middle, search right half. Repeat.' },
    { id: 553, topic: 'problem-solving', front: 'Bubble Sort algorithm', back: 'Compare adjacent pairs, swap if wrong order. Repeat passes until no swaps. O(n²) time. Simple but inefficient.' },
    { id: 554, topic: 'problem-solving', front: 'Bubble Sort optimization', back: 'Track if any swaps made in pass. If no swaps, list is sorted—stop early. Best case O(n) for sorted input.' },
    { id: 555, topic: 'problem-solving', front: 'Merge Sort algorithm', back: 'Divide list into halves until single elements. Merge pairs in sorted order. O(n log n) time. Divide and conquer.' },
    { id: 556, topic: 'problem-solving', front: 'Merge Sort merge step', back: 'Compare first elements of two sorted sublists. Take smaller one. Repeat until both empty. Combines into one sorted list.' },
    { id: 557, topic: 'problem-solving', front: 'Quick Sort algorithm', back: 'Pick pivot, partition (smaller left, larger right), recurse on partitions. O(n log n) average, O(n²) worst case.' },
    { id: 558, topic: 'problem-solving', front: 'Insertion Sort algorithm', back: 'Build sorted portion by inserting each element in correct position. O(n²) worst, O(n) best (nearly sorted). Good for small data.' },
    { id: 559, topic: 'problem-solving', front: 'Time complexity comparison', back: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). Lower is better for large inputs.' },
    
    // Security concepts
    { id: 560, topic: 'networks', front: 'Encryption', back: 'Converting plaintext to unreadable ciphertext using an algorithm and key. Protects data confidentiality. Decryption reverses it.' },
    { id: 561, topic: 'networks', front: 'Symmetric encryption', back: 'Same key to encrypt and decrypt. Fast. Problem: secure key exchange. Examples: AES, DES. Used for bulk data.' },
    { id: 562, topic: 'networks', front: 'Asymmetric encryption', back: 'Two keys: public (encrypt) and private (decrypt). Slower. Solves key exchange. Examples: RSA. Used for secure communication.' },
    { id: 563, topic: 'networks', front: 'Hashing', back: 'One-way function producing fixed-size digest. Cannot reverse. Same input = same hash. Used for passwords, integrity checking.' },
    { id: 564, topic: 'networks', front: 'Malware types', back: 'Virus (attaches to files), Worm (self-replicates via network), Trojan (disguised), Ransomware (encrypts for payment), Spyware (monitors user).' },
    { id: 565, topic: 'networks', front: 'Firewall function', back: 'Monitors and filters network traffic based on security rules. Blocks unauthorized access. Can be hardware or software.' },
    { id: 566, topic: 'networks', front: 'Packet filtering firewall', back: 'Examines packet headers (IP, port). Simple, fast. Doesn\'t inspect content. Stateless or stateful.' },
    { id: 567, topic: 'networks', front: 'Phishing attack', back: 'Fake emails/websites trick users into revealing credentials. Social engineering. Prevention: verify URLs, don\'t click suspicious links.' },
    { id: 568, topic: 'networks', front: 'SQL injection attack', back: 'Malicious SQL in input fields to manipulate database. Example: \' OR 1=1--. Prevention: parameterized queries, input validation.' },
    { id: 569, topic: 'networks', front: 'DDoS attack', back: 'Distributed Denial of Service. Overwhelms server with traffic from many sources. Prevention: traffic filtering, rate limiting, CDN.' },
    { id: 570, topic: 'networks', front: 'Man-in-the-middle attack', back: 'Attacker intercepts communication between two parties. Can eavesdrop or modify data. Prevention: HTTPS, certificate validation.' },
    { id: 571, topic: 'networks', front: 'Brute force attack', back: 'Trying all possible password combinations. Time-consuming. Prevention: strong passwords, account lockout, rate limiting, 2FA.' },
    { id: 572, topic: 'networks', front: 'Two-factor authentication (2FA)', back: 'Two different verification methods: something you know (password) + something you have (phone) or are (biometric). Much more secure.' },
    { id: 573, topic: 'networks', front: 'Digital certificate', back: 'Electronic document proving identity. Contains public key. Issued by Certificate Authority (CA). Enables HTTPS trust.' },
    { id: 574, topic: 'networks', front: 'VPN (Virtual Private Network)', back: 'Encrypts all traffic through secure tunnel. Hides IP address. Used for privacy, accessing restricted content, secure remote work.' },
    
    // Additional topics for comprehensive coverage
    { id: 575, topic: 'data', front: 'Two\'s complement for -5 (8-bit)', back: 'Start with +5: 00000101. Invert: 11111010. Add 1: 11111011. MSB=1 indicates negative.' },
    { id: 576, topic: 'computers', front: 'Fetch-Decode-Execute cycle', back: 'Fetch: PC→MAR, read instruction→MDR→CIR, PC+1. Decode: CU interprets instruction. Execute: ALU performs operation.' },
    { id: 577, topic: 'computers', front: 'Control bus signals', back: 'Read/Write, Clock, Interrupt, Bus request. Coordinates operations between CPU and other components.' },
    { id: 578, topic: 'programming', front: 'Recursion base case', back: 'Condition that stops recursion. Without it, infinite recursion causes stack overflow. Example: factorial(0) = 1.' },
    { id: 579, topic: 'problem-solving', front: 'Space complexity', back: 'Memory used by algorithm. Bubble sort: O(1) in-place. Merge sort: O(n) needs extra arrays. Trade-off with time.' },
    { id: 580, topic: 'networks', front: 'MAC address format', back: '48-bit hardware address. Written as 6 hex pairs: AA:BB:CC:DD:EE:FF. Unique to each network interface. Layer 2.' },
    { id: 581, topic: 'networks', front: 'IPv4 vs IPv6', back: 'IPv4: 32-bit, 4 billion addresses, exhausted. IPv6: 128-bit, 340 undecillion addresses, built-in security.' },
    { id: 582, topic: 'databases', front: 'SQL JOIN types', back: 'INNER: matching rows only. LEFT: all from left + matches. RIGHT: all from right + matches. FULL: all from both.' },
    { id: 583, topic: 'programming', front: 'Pass by value vs reference', back: 'Value: copy passed, original unchanged. Reference: address passed, can modify original. Affects function behavior.' },
    { id: 584, topic: 'computers', front: 'Interrupt handling', back: 'Signal to CPU requiring attention. CPU saves state, runs interrupt handler, restores state. Types: hardware, software, timer.' }
];

// Add expanded flashcards
FLASHCARDS.push(...EXPANDED_FLASHCARDS);

/**
 * Shuffle question options and update answer index accordingly.
 * 
 * This function solves the problem where 'answer' field values cluster around
 * 1 or 2 (B or C), creating predictable patterns. It randomizes option order
 * while tracking where the correct answer moves to.
 * 
 * USAGE IN GAMES:
 * Before displaying a question, call this function to randomize options:
 * 
 *   const shuffledQuestion = shuffleQuestionOptions(question);
 *   // Now display shuffledQuestion.options and use shuffledQuestion.answer
 *   // to check the user's selection
 * 
 * For batch processing:
 *   const shuffledQuestions = questions.map(q => shuffleQuestionOptions(q));
 * 
 * @param {Object} question - Question object with 'options' array and 'answer' index
 * @returns {Object} New question object with shuffled options and updated answer index
 */
function shuffleQuestionOptions(question) {
    // Create array of [originalIndex, option] pairs
    const indexedOptions = question.options.map((opt, idx) => ({ originalIndex: idx, option: opt }));
    
    // Fisher-Yates shuffle
    for (let i = indexedOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexedOptions[i], indexedOptions[j]] = [indexedOptions[j], indexedOptions[i]];
    }
    
    // Extract shuffled options and find new position of correct answer
    const shuffledOptions = indexedOptions.map(item => item.option);
    const newAnswerIndex = indexedOptions.findIndex(item => item.originalIndex === question.answer);
    
    // Return new question object (original unchanged)
    return {
        ...question,
        options: shuffledOptions,
        answer: newAnswerIndex
    };
}

// ==================== NEW QUESTIONS (ID 500+) ====================
// Topics: Security, Databases, Ethics, Web Development
// Answer distribution: ~25% each (A=0, B=1, C=2, D=3)

const QUESTIONS_500 = [
    // ==================== SECURITY: Encryption & Hashing (11 questions) ====================
    { id: 500, topic: 'networks', question: 'What is the main difference between encryption and hashing?', options: ['Encryption is reversible, hashing is one-way', 'Hashing is reversible, encryption is one-way', 'Both are reversible', 'Both are one-way'], answer: 0, explanation: 'Encryption can be decrypted with a key; hashing is a one-way function that cannot be reversed.' },
    { id: 501, topic: 'networks', question: 'Which algorithm is commonly used for hashing passwords?', options: ['AES', 'bcrypt', 'RSA', 'DES'], answer: 1, explanation: 'bcrypt is designed for password hashing with built-in salting and adaptive cost factor.' },
    { id: 502, topic: 'networks', question: 'What is a salt in cryptography?', options: ['A type of firewall', 'An encryption key', 'Random data added before hashing to prevent rainbow table attacks', 'A password strength measure'], answer: 2, explanation: 'A salt is random data added to input before hashing, making precomputed attacks ineffective.' },
    { id: 503, topic: 'networks', question: 'Which type of encryption uses the same key for encryption and decryption?', options: ['Asymmetric', 'Public key', 'Hash-based', 'Symmetric'], answer: 3, explanation: 'Symmetric encryption (like AES) uses one shared key for both encryption and decryption.' },
    { id: 504, topic: 'networks', question: 'In asymmetric encryption, which key is used to encrypt data sent to you?', options: ['Your public key', 'Your private key', 'The sender\'s private key', 'A shared secret key'], answer: 0, explanation: 'Others encrypt with your public key; only your private key can decrypt it.' },
    { id: 505, topic: 'networks', question: 'What is a rainbow table attack?', options: ['Flooding a network with colorful packets', 'Using precomputed hash values to crack passwords', 'A type of DDoS attack', 'Intercepting wireless signals'], answer: 1, explanation: 'Rainbow tables contain precomputed hashes to quickly look up passwords from their hashes.' },
    { id: 506, topic: 'networks', question: 'What does SSL/TLS provide for web connections?', options: ['Faster speeds', 'Encrypted secure communication', 'Better graphics', 'More bandwidth'], answer: 1, explanation: 'SSL/TLS encrypts data between browser and server, providing secure HTTPS connections.' },
    { id: 507, topic: 'networks', question: 'Which hash algorithm produces a 256-bit output?', options: ['MD5', 'SHA-1', 'CRC32', 'SHA-256'], answer: 3, explanation: 'SHA-256 produces a 256-bit (32-byte) hash output, commonly used for security.' },
    { id: 508, topic: 'networks', question: 'Why should MD5 not be used for security purposes?', options: ['It has known collision vulnerabilities', 'It\'s too slow', 'It produces outputs that are too long', 'It requires too much memory'], answer: 0, explanation: 'MD5 has known collision attacks where different inputs produce the same hash.' },
    { id: 509, topic: 'networks', question: 'What is end-to-end encryption?', options: ['Encryption at server only', 'Encryption of file names only', 'Encryption using end keys', 'Encryption where only sender and recipient can read messages'], answer: 3, explanation: 'End-to-end encryption means only communicating parties can decrypt messages, not even the service provider.' },
    { id: 510, topic: 'networks', question: 'A digital signature is created using:', options: ['The sender\'s private key', 'The sender\'s public key', 'The recipient\'s public key', 'A shared password'], answer: 0, explanation: 'Digital signatures are created with the sender\'s private key and verified with their public key.' },
    
    // ==================== SECURITY: Malware & Firewalls (11 questions) ====================
    { id: 511, topic: 'networks', question: 'What type of malware disguises itself as legitimate software?', options: ['Worm', 'Trojan horse', 'Adware', 'Rootkit'], answer: 1, explanation: 'Trojans appear to be useful software but contain hidden malicious code.' },
    { id: 512, topic: 'networks', question: 'Which malware type can spread across networks without user interaction?', options: ['Virus', 'Trojan', 'Worm', 'Spyware'], answer: 2, explanation: 'Worms self-replicate and spread automatically across networks without needing user action.' },
    { id: 513, topic: 'networks', question: 'What does a packet-filtering firewall examine?', options: ['File contents', 'Email attachments', 'User passwords', 'Packet headers (IP addresses, ports)'], answer: 3, explanation: 'Packet-filtering firewalls check packet headers for source/destination IPs and port numbers.' },
    { id: 514, topic: 'networks', question: 'What is a keylogger?', options: ['Malware that records keystrokes', 'A password manager', 'A firewall type', 'An encryption tool'], answer: 0, explanation: 'Keyloggers secretly record everything typed, capturing passwords and sensitive data.' },
    { id: 515, topic: 'networks', question: 'What is the purpose of a stateful firewall?', options: ['Only check incoming traffic', 'Track active connections and their states', 'Block all UDP traffic', 'Encrypt all packets'], answer: 1, explanation: 'Stateful firewalls track connection states and make decisions based on traffic context.' },
    { id: 516, topic: 'networks', question: 'Which malware type typically demands payment in cryptocurrency?', options: ['Adware', 'Spyware', 'Worm', 'Ransomware'], answer: 3, explanation: 'Ransomware encrypts files and demands cryptocurrency payment for decryption keys.' },
    { id: 517, topic: 'networks', question: 'What does a rootkit do?', options: ['Hides malware presence from detection', 'Speeds up computer', 'Manages user accounts', 'Compresses files'], answer: 0, explanation: 'Rootkits hide malware and malicious activities by modifying OS components.' },
    { id: 518, topic: 'networks', question: 'An application-level firewall operates at which OSI layer?', options: ['Layer 1 - Physical', 'Layer 7 - Application', 'Layer 3 - Network', 'Layer 4 - Transport'], answer: 1, explanation: 'Application-level firewalls inspect traffic at Layer 7, understanding application protocols.' },
    { id: 519, topic: 'networks', question: 'What is a botnet?', options: ['A network security tool', 'A network of infected computers controlled remotely', 'A type of firewall', 'An antivirus program'], answer: 1, explanation: 'Botnets are networks of compromised computers (bots/zombies) controlled by attackers.' },
    { id: 520, topic: 'networks', question: 'What protection does a DMZ provide?', options: ['Isolates public-facing servers from internal network', 'Faster internet', 'Encrypts all traffic', 'Blocks all external access'], answer: 0, explanation: 'A DMZ (Demilitarized Zone) separates public servers from the internal network for security.' },
    { id: 521, topic: 'networks', question: 'Which is NOT a function of antivirus software?', options: ['Scanning for known malware signatures', 'Quarantining infected files', 'Encrypting network traffic', 'Real-time protection'], answer: 2, explanation: 'Antivirus detects and removes malware. Encrypting traffic is done by VPNs/SSL.' },
    
    // ==================== DATABASES: SQL & Keys (11 questions) ====================
    { id: 522, topic: 'databases', question: 'What SQL keyword removes duplicate rows from results?', options: ['UNIQUE', 'DISTINCT', 'SINGLE', 'NODUPE'], answer: 1, explanation: 'SELECT DISTINCT returns only unique rows, removing duplicates from results.' },
    { id: 523, topic: 'databases', question: 'Which SQL clause is used with aggregate functions to filter groups?', options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'], answer: 2, explanation: 'HAVING filters groups after GROUP BY; WHERE filters individual rows before grouping.' },
    { id: 524, topic: 'databases', question: 'What does a composite key consist of?', options: ['One field only', 'A foreign key', 'An auto-increment field', 'Two or more fields combined'], answer: 3, explanation: 'A composite key uses multiple fields together to uniquely identify a record.' },
    { id: 525, topic: 'databases', question: 'Which constraint ensures a field cannot be empty?', options: ['NOT NULL', 'UNIQUE', 'PRIMARY KEY', 'CHECK'], answer: 0, explanation: 'NOT NULL constraint ensures the field must contain a value, cannot be left empty.' },
    { id: 526, topic: 'databases', question: 'What does CASCADE DELETE do?', options: ['Deletes the database', 'Cancels all deletions', 'Automatically deletes related records in child tables', 'Creates a backup before delete'], answer: 2, explanation: 'CASCADE DELETE automatically removes related records when parent record is deleted.' },
    { id: 527, topic: 'databases', question: 'In 3NF (Third Normal Form), there should be no:', options: ['Primary keys', 'Foreign keys', 'Tables', 'Transitive dependencies'], answer: 3, explanation: '3NF eliminates transitive dependencies - non-key fields should depend only on the primary key.' },
    { id: 528, topic: 'databases', question: 'What does the SQL JOIN operation do?', options: ['Combines rows from two or more tables', 'Splits tables apart', 'Deletes matching rows', 'Creates indexes'], answer: 0, explanation: 'JOIN combines rows from multiple tables based on related columns.' },
    { id: 529, topic: 'databases', question: 'Which type of JOIN returns all rows from the left table?', options: ['INNER JOIN', 'CROSS JOIN', 'LEFT JOIN', 'NATURAL JOIN'], answer: 2, explanation: 'LEFT JOIN returns all rows from left table plus matching rows from right table.' },
    { id: 530, topic: 'databases', question: 'What is a surrogate key?', options: ['A natural identifier like email', 'A foreign key', 'A composite key', 'An auto-generated artificial key (like ID number)'], answer: 3, explanation: 'Surrogate keys are system-generated (often auto-increment) with no business meaning.' },
    { id: 531, topic: 'databases', question: 'The BETWEEN operator in SQL is:', options: ['Exclusive of endpoints', 'Only for dates', 'Inclusive of endpoints', 'Only for strings'], answer: 2, explanation: 'BETWEEN is inclusive - WHERE age BETWEEN 18 AND 65 includes both 18 and 65.' },
    { id: 532, topic: 'databases', question: 'What does database indexing improve?', options: ['Storage capacity', 'Data security', 'Query search speed', 'Backup speed'], answer: 2, explanation: 'Indexes create data structures that speed up searching/querying, like a book index.' },
    
    // ==================== ETHICS & IMPACTS (5 questions) ====================
    { id: 533, topic: 'bigger-picture', question: 'What is the main purpose of GDPR?', options: ['Speed up internet', 'Regulate software prices', 'Protect personal data and privacy', 'Control social media'], answer: 2, explanation: 'GDPR (General Data Protection Regulation) protects EU citizens\' personal data and privacy.' },
    { id: 534, topic: 'bigger-picture', question: 'What ethical concern arises from facial recognition in public spaces?', options: ['Faster identification', 'Improved security only', 'Better photography', 'Mass surveillance and privacy invasion'], answer: 3, explanation: 'Facial recognition enables mass surveillance, tracking individuals without consent.' },
    { id: 535, topic: 'bigger-picture', question: 'What is planned obsolescence?', options: ['Designing products to become outdated/fail intentionally', 'Planning software updates', 'Scheduling backups', 'Organizing files'], answer: 0, explanation: 'Planned obsolescence designs products to have limited lifespans, forcing replacements.' },
    { id: 536, topic: 'bigger-picture', question: 'Which is an example of the digital divide?', options: ['Using different browsers', 'Preferring iOS over Android', 'Rural areas lacking broadband access', 'Using old software'], answer: 2, explanation: 'Digital divide refers to inequality in technology access between different groups or regions.' },
    { id: 537, topic: 'bigger-picture', question: 'What is net neutrality?', options: ['Neutral website colors', 'Free antivirus software', 'ISPs treating all internet traffic equally', 'Anonymous browsing'], answer: 2, explanation: 'Net neutrality means ISPs must treat all data equally, not favoring certain services.' },
    
    // ==================== WEB DEVELOPMENT: HTML & CSS (6 questions) ====================
    { id: 538, topic: 'programming', question: 'What does HTML stand for?', options: ['High Tech Modern Language', 'HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlink Text Mode Language'], answer: 1, explanation: 'HTML = HyperText Markup Language, the standard language for creating web pages.' },
    { id: 539, topic: 'programming', question: 'Which HTML tag creates a hyperlink?', options: ['<link>', '<href>', '<url>', '<a>'], answer: 3, explanation: 'The <a> (anchor) tag creates hyperlinks using the href attribute for the destination.' },
    { id: 540, topic: 'programming', question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Coded Style Syntax'], answer: 0, explanation: 'CSS = Cascading Style Sheets, used to style and layout web pages.' },
    { id: 541, topic: 'programming', question: 'Which CSS property changes text color?', options: ['text-color', 'color', 'font-color', 'foreground'], answer: 1, explanation: 'The color property sets the text color. background-color sets background.' },
    { id: 542, topic: 'programming', question: 'What is the correct HTML for the largest heading?', options: ['<heading>', '<h6>', '<head>', '<h1>'], answer: 3, explanation: '<h1> is the largest heading, <h6> is smallest. <head> contains metadata, not visible content.' },
    { id: 543, topic: 'programming', question: 'Which CSS selector targets elements with class="main"?', options: ['#main', 'main', '*main', '.main'], answer: 3, explanation: '.classname selects by class, #id selects by ID, tagname selects all of that tag.' }
];

// Append new questions to QUESTIONS array
QUESTIONS.push(...QUESTIONS_500);

console.log('📚 Content expanded: ' + QUESTIONS.length + ' questions, ' + FLASHCARDS.length + ' flashcards loaded.');
