/**
 * PastPaperView.js - Enhanced Past Paper Practice Mode
 * Features: Topic sorting, mark schemes, exam-style timing, progress tracking
 */

const PastPaperView = {
    currentPaper: null,
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: 0,
    timerInterval: null,
    showingMarkScheme: false,
    
    // Paper types matching IGCSE structure
    paperTypes: {
        paper1: { name: 'Paper 1 - Theory', duration: 90, marks: 100 },
        paper2: { name: 'Paper 2 - Problem Solving', duration: 90, marks: 100 }
    },
    
    // Past paper questions organized by topic and year
    papers: {
        '2023-paper1': {
            year: 2023,
            paper: 'paper1',
            questions: [
                { id: 'pp2023-1', topic: 'data-representation', marks: 4, question: 'Convert the denary number 156 to binary.', type: 'written', markScheme: '156 ÷ 2 = 78 r0\n78 ÷ 2 = 39 r0\n39 ÷ 2 = 19 r1\n19 ÷ 2 = 9 r1\n9 ÷ 2 = 4 r1\n4 ÷ 2 = 2 r0\n2 ÷ 2 = 1 r0\n1 ÷ 2 = 0 r1\n\nAnswer: 10011100\n\n1 mark for method\n3 marks for correct answer' },
                { id: 'pp2023-2', topic: 'data-representation', marks: 3, question: 'Explain why hexadecimal is used by programmers instead of binary.', type: 'written', markScheme: '• Easier to read/less prone to errors (1 mark)\n• Shorter representation - 1 hex = 4 binary digits (1 mark)\n• Easier to convert to/from binary (1 mark)\n• Used for memory addresses, color codes, MAC addresses (1 mark)\nMax 3 marks' },
                { id: 'pp2023-3', topic: 'hardware', marks: 2, question: 'State two functions of the CPU.', type: 'written', markScheme: '• Fetch instructions from memory (1 mark)\n• Decode instructions (1 mark)\n• Execute instructions (1 mark)\n• Perform calculations/arithmetic (1 mark)\n• Control data flow (1 mark)\nMax 2 marks' },
                { id: 'pp2023-4', topic: 'hardware', marks: 4, question: 'Describe the difference between RAM and ROM.', type: 'written', markScheme: 'RAM:\n• Volatile - loses data when power off (1 mark)\n• Read and write (1 mark)\n• Stores currently running programs/data (1 mark)\n\nROM:\n• Non-volatile - retains data when power off (1 mark)\n• Read only (1 mark)\n• Stores boot/startup instructions (1 mark)\nMax 4 marks' },
                { id: 'pp2023-5', topic: 'software', marks: 3, question: 'Explain the purpose of an operating system.', type: 'written', markScheme: '• Manages hardware resources (1 mark)\n• Provides user interface (1 mark)\n• Manages files and folders (1 mark)\n• Handles security/user accounts (1 mark)\n• Runs application software (1 mark)\n• Memory management (1 mark)\nMax 3 marks' },
                { id: 'pp2023-6', topic: 'networks', marks: 4, question: 'Describe the differences between a LAN and a WAN.', type: 'written', markScheme: 'LAN:\n• Small geographical area (1 mark)\n• Privately owned/maintained (1 mark)\n• High speed, low latency (1 mark)\n\nWAN:\n• Large geographical area (1 mark)\n• Uses third-party infrastructure (1 mark)\n• Lower speed, higher latency (1 mark)\nMax 4 marks' },
                { id: 'pp2023-7', topic: 'security', marks: 3, question: 'State three methods of preventing unauthorized access to a computer system.', type: 'written', markScheme: '• Strong passwords (1 mark)\n• Biometric authentication (1 mark)\n• Two-factor authentication (1 mark)\n• Firewall (1 mark)\n• Encryption (1 mark)\n• Access control lists (1 mark)\nMax 3 marks' },
                { id: 'pp2023-8', topic: 'programming', marks: 5, question: 'Write pseudocode for a program that inputs 10 numbers and outputs the largest.', type: 'code', markScheme: 'DECLARE max, num : INTEGER\nmax ← 0\nFOR i ← 1 TO 10\n    INPUT num\n    IF num > max THEN\n        max ← num\n    ENDIF\nNEXT i\nOUTPUT max\n\n• Loop 10 times (1 mark)\n• Input number (1 mark)\n• Comparison with max (1 mark)\n• Update max correctly (1 mark)\n• Output result (1 mark)' }
            ]
        },
        '2022-paper1': {
            year: 2022,
            paper: 'paper1',
            questions: [
                { id: 'pp2022-1', topic: 'data-representation', marks: 3, question: 'Convert the binary number 11010110 to denary.', type: 'written', markScheme: '128 + 64 + 16 + 4 + 2 = 214\n\n1 mark for showing working\n2 marks for correct answer' },
                { id: 'pp2022-2', topic: 'data-representation', marks: 4, question: 'Explain how characters are represented in a computer using ASCII.', type: 'written', markScheme: '• Each character has a unique number/code (1 mark)\n• Standard ASCII uses 7 bits (1 mark)\n• Can represent 128 characters (1 mark)\n• Includes letters, numbers, symbols (1 mark)\n• Extended ASCII uses 8 bits for 256 characters (1 mark)\nMax 4 marks' },
                { id: 'pp2022-3', topic: 'hardware', marks: 3, question: 'Describe the purpose of cache memory.', type: 'written', markScheme: '• Stores frequently used data/instructions (1 mark)\n• Faster access than RAM (1 mark)\n• Located between CPU and RAM (1 mark)\n• Reduces time to fetch data (1 mark)\nMax 3 marks' },
                { id: 'pp2022-4', topic: 'software', marks: 4, question: 'Compare compiled and interpreted languages.', type: 'written', markScheme: 'Compiled:\n• Translated all at once before running (1 mark)\n• Creates executable file (1 mark)\n• Faster execution (1 mark)\n\nInterpreted:\n• Translated line by line (1 mark)\n• No executable created (1 mark)\n• Easier to debug (1 mark)\nMax 4 marks' },
                { id: 'pp2022-5', topic: 'networks', marks: 3, question: 'State three advantages of using a star network topology.', type: 'written', markScheme: '• Easy to add new devices (1 mark)\n• One failure doesn\'t affect others (1 mark)\n• Easy to find faults (1 mark)\n• Better performance/no collisions (1 mark)\n• Central management (1 mark)\nMax 3 marks' },
                { id: 'pp2022-6', topic: 'security', marks: 4, question: 'Describe how encryption protects data during transmission.', type: 'written', markScheme: '• Data is scrambled/encoded (1 mark)\n• Uses an encryption key (1 mark)\n• Only recipient with key can decrypt (1 mark)\n• Prevents interception/reading (1 mark)\n• Even if intercepted, data is unreadable (1 mark)\nMax 4 marks' }
            ]
        },
        // ==================== PAPER 2 - PROBLEM SOLVING & PROGRAMMING ====================
        '2023-paper2': {
            year: 2023,
            paper: 'paper2',
            questions: [
                { 
                    id: 'pp2023-p2-1', 
                    topic: 'algorithms', 
                    marks: 4, 
                    question: 'A program stores student test scores in an array called Scores[1:30]. Write an algorithm in pseudocode to find and output the average score.', 
                    type: 'code', 
                    markScheme: 'DECLARE Total, Average : REAL\nDECLARE i : INTEGER\nTotal ← 0\nFOR i ← 1 TO 30\n    Total ← Total + Scores[i]\nNEXT i\nAverage ← Total / 30\nOUTPUT Average\n\n• Initialize total to 0 (1 mark)\n• Loop through all 30 elements (1 mark)\n• Add each score to total (1 mark)\n• Calculate average by dividing by 30 (1 mark)\n• Output the result (1 mark)\nMax 4 marks' 
                },
                { 
                    id: 'pp2023-p2-2', 
                    topic: 'algorithms', 
                    marks: 6, 
                    question: 'Write pseudocode for a linear search algorithm that searches for a value in an array Data[1:100] and outputs the position if found, or "Not found" if the value is not in the array.', 
                    type: 'code', 
                    markScheme: 'DECLARE SearchValue : INTEGER\nDECLARE Found : BOOLEAN\nDECLARE Position, i : INTEGER\n\nINPUT SearchValue\nFound ← FALSE\nPosition ← -1\n\nFOR i ← 1 TO 100\n    IF Data[i] = SearchValue THEN\n        Found ← TRUE\n        Position ← i\n    ENDIF\nNEXT i\n\nIF Found = TRUE THEN\n    OUTPUT "Found at position ", Position\nELSE\n    OUTPUT "Not found"\nENDIF\n\n• Input search value (1 mark)\n• Initialize Found flag (1 mark)\n• Loop through array (1 mark)\n• Compare each element (1 mark)\n• Store position when found (1 mark)\n• Output appropriate message (1 mark)' 
                },
                { 
                    id: 'pp2023-p2-3', 
                    topic: 'algorithms', 
                    marks: 5, 
                    question: 'Describe how a bubble sort algorithm works. Include details of how the algorithm knows when to stop.', 
                    type: 'written', 
                    markScheme: '• Compares adjacent pairs of elements (1 mark)\n• Swaps them if they are in the wrong order (1 mark)\n• Repeats through the entire list (1 mark)\n• After each pass, the largest unsorted element "bubbles" to the end (1 mark)\n• Uses a flag/variable to track if any swaps were made (1 mark)\n• Stops when a complete pass is made with no swaps (1 mark)\n• Or stops after n-1 passes where n is the number of elements (1 mark)\nMax 5 marks' 
                },
                { 
                    id: 'pp2023-p2-4', 
                    topic: 'programming', 
                    marks: 3, 
                    question: 'State three different data types and give an example of data that would be stored using each type.', 
                    type: 'written', 
                    markScheme: '• INTEGER - whole numbers, e.g., 42, -7, age (1 mark)\n• REAL/FLOAT - decimal numbers, e.g., 3.14, price (1 mark)\n• STRING - text, e.g., "Hello", name (1 mark)\n• BOOLEAN - True/False values (1 mark)\n• CHAR - single character, e.g., "A" (1 mark)\nMax 3 marks' 
                },
                { 
                    id: 'pp2023-p2-5', 
                    topic: 'programming', 
                    marks: 4, 
                    question: 'Explain the difference between a WHILE loop and a FOR loop. Give an example of when each would be appropriate.', 
                    type: 'written', 
                    markScheme: 'FOR loop:\n• Used when number of iterations is known (1 mark)\n• Example: iterating through an array of fixed size (1 mark)\n\nWHILE loop:\n• Used when number of iterations is unknown (1 mark)\n• Continues until condition becomes false (1 mark)\n• Example: reading input until user enters "quit" (1 mark)\n• Example: searching until item found (1 mark)\nMax 4 marks' 
                },
                { 
                    id: 'pp2023-p2-6', 
                    topic: 'programming', 
                    marks: 6, 
                    question: 'Write a function in pseudocode called Factorial that takes an integer n as input and returns n! (n factorial). For example, Factorial(5) should return 120.', 
                    type: 'code', 
                    markScheme: 'FUNCTION Factorial(n : INTEGER) RETURNS INTEGER\n    DECLARE result, i : INTEGER\n    result ← 1\n    FOR i ← 1 TO n\n        result ← result * i\n    NEXT i\n    RETURN result\nENDFUNCTION\n\n• Correct function header with parameter (1 mark)\n• Initialize result to 1 (1 mark)\n• Loop from 1 to n (1 mark)\n• Multiply result by i each iteration (1 mark)\n• Return statement (1 mark)\n• Correct syntax throughout (1 mark)' 
                },
                { 
                    id: 'pp2023-p2-7', 
                    topic: 'programming', 
                    marks: 5, 
                    question: 'Write pseudocode to validate a password. The password must:\n- Be at least 8 characters long\n- Contain at least one number\nThe program should keep asking until a valid password is entered.', 
                    type: 'code', 
                    markScheme: 'DECLARE Password : STRING\nDECLARE Valid, HasNumber : BOOLEAN\nDECLARE i : INTEGER\n\nREPEAT\n    OUTPUT "Enter password: "\n    INPUT Password\n    Valid ← TRUE\n    HasNumber ← FALSE\n    \n    IF LENGTH(Password) < 8 THEN\n        Valid ← FALSE\n        OUTPUT "Password must be at least 8 characters"\n    ENDIF\n    \n    FOR i ← 1 TO LENGTH(Password)\n        IF Password[i] >= "0" AND Password[i] <= "9" THEN\n            HasNumber ← TRUE\n        ENDIF\n    NEXT i\n    \n    IF HasNumber = FALSE THEN\n        Valid ← FALSE\n        OUTPUT "Password must contain a number"\n    ENDIF\nUNTIL Valid = TRUE\n\n• Input password in loop (1 mark)\n• Check length >= 8 (1 mark)\n• Check for number using loop (1 mark)\n• Appropriate error messages (1 mark)\n• Loop until valid (1 mark)' 
                },
                { 
                    id: 'pp2023-p2-8', 
                    topic: 'algorithms', 
                    marks: 4, 
                    question: 'Complete the trace table for this algorithm when the input is 7:\n\nnum ← INPUT\nresult ← 1\nWHILE num > 1\n    result ← result * num\n    num ← num - 1\nENDWHILE\nOUTPUT result', 
                    type: 'written', 
                    markScheme: 'Trace table:\n| num | result | num > 1 |\n|-----|--------|--------|\n| 7   | 1      | TRUE   |\n| 7   | 7      | TRUE   |\n| 6   | 42     | TRUE   |\n| 5   | 210    | TRUE   |\n| 4   | 840    | TRUE   |\n| 3   | 2520   | TRUE   |\n| 2   | 5040   | TRUE   |\n| 1   | 5040   | FALSE  |\n\nOutput: 5040\n\n• Correct initial values (1 mark)\n• Correct result calculations (1 mark)\n• Correct num decrements (1 mark)\n• Correct final output 5040 (1 mark)' 
                },
                { 
                    id: 'pp2023-p2-9', 
                    topic: 'programming', 
                    marks: 8, 
                    question: 'A school stores student grades in a 2D array Grades[1:30, 1:5] where each row is a student and each column is a subject. Write pseudocode to:\n(a) Calculate and output the average grade for student 15\n(b) Find and output the highest grade across all students and subjects', 
                    type: 'code', 
                    markScheme: '// Part (a) - Average for student 15\nDECLARE Total, Average : REAL\nDECLARE j : INTEGER\nTotal ← 0\nFOR j ← 1 TO 5\n    Total ← Total + Grades[15, j]\nNEXT j\nAverage ← Total / 5\nOUTPUT "Student 15 average: ", Average\n\n// Part (b) - Highest grade overall\nDECLARE Highest : INTEGER\nDECLARE i, j : INTEGER\nHighest ← 0\nFOR i ← 1 TO 30\n    FOR j ← 1 TO 5\n        IF Grades[i, j] > Highest THEN\n            Highest ← Grades[i, j]\n        ENDIF\n    NEXT j\nNEXT i\nOUTPUT "Highest grade: ", Highest\n\nPart (a):\n• Loop through 5 subjects (1 mark)\n• Access correct row [15, j] (1 mark)\n• Calculate average correctly (1 mark)\n• Output result (1 mark)\n\nPart (b):\n• Nested loops for rows and columns (2 marks)\n• Correct comparison and update (1 mark)\n• Output result (1 mark)' 
                },
                { 
                    id: 'pp2023-p2-10', 
                    topic: 'algorithms', 
                    marks: 5, 
                    question: 'Draw a flowchart for an algorithm that inputs numbers until -1 is entered, then outputs the count of positive numbers entered.', 
                    type: 'written', 
                    markScheme: 'Flowchart should include:\n• Start terminal (1 mark)\n• Initialize count to 0 (1 mark)\n• Input number in loop (1 mark)\n• Decision: number = -1? (1 mark)\n• Decision: number > 0? and increment count (1 mark)\n• Loop back correctly (1 mark)\n• Output count (1 mark)\n• End terminal (1 mark)\nMax 5 marks\n\nKey flow:\nSTART → count=0 → INPUT num → num=-1? → YES → OUTPUT count → END\n                                    ↓ NO\n                              num>0? → YES → count=count+1\n                                    ↓ NO        ↓\n                                    ←←←←←←←←←←←←' 
                }
            ]
        },
        '2022-paper2': {
            year: 2022,
            paper: 'paper2',
            questions: [
                { 
                    id: 'pp2022-p2-1', 
                    topic: 'algorithms', 
                    marks: 5, 
                    question: 'Write pseudocode for a program that inputs a series of positive numbers and outputs the largest and smallest. The input ends when the user enters 0.', 
                    type: 'code', 
                    markScheme: 'DECLARE num, largest, smallest : INTEGER\n\nINPUT num\nlargest ← num\nsmallest ← num\n\nWHILE num <> 0\n    IF num > largest THEN\n        largest ← num\n    ENDIF\n    IF num < smallest THEN\n        smallest ← num\n    ENDIF\n    INPUT num\nENDWHILE\n\nOUTPUT "Largest: ", largest\nOUTPUT "Smallest: ", smallest\n\n• First input before loop (1 mark)\n• Initialize largest and smallest (1 mark)\n• Loop until 0 entered (1 mark)\n• Update largest correctly (1 mark)\n• Update smallest correctly (1 mark)' 
                },
                { 
                    id: 'pp2022-p2-2', 
                    topic: 'programming', 
                    marks: 4, 
                    question: 'Explain what is meant by:\n(a) A local variable\n(b) A global variable\nGive one advantage and one disadvantage of using global variables.', 
                    type: 'written', 
                    markScheme: '(a) Local variable:\n• Declared inside a function/procedure (1 mark)\n• Only accessible within that function (1 mark)\n\n(b) Global variable:\n• Declared outside all functions (1 mark)\n• Accessible from anywhere in the program (1 mark)\n\nAdvantage of global:\n• Data can be shared between functions easily (1 mark)\n• Don\'t need to pass as parameters (1 mark)\n\nDisadvantage of global:\n• Can be changed accidentally (1 mark)\n• Makes debugging harder (1 mark)\n• Poor programming practice (1 mark)\nMax 4 marks' 
                },
                { 
                    id: 'pp2022-p2-3', 
                    topic: 'programming', 
                    marks: 6, 
                    question: 'Write a procedure called Reverse that takes a string as a parameter and outputs the string in reverse order. For example, Reverse("Hello") should output "olleH".', 
                    type: 'code', 
                    markScheme: 'PROCEDURE Reverse(text : STRING)\n    DECLARE reversed : STRING\n    DECLARE i : INTEGER\n    reversed ← ""\n    \n    FOR i ← LENGTH(text) DOWNTO 1\n        reversed ← reversed & text[i]\n    NEXT i\n    \n    OUTPUT reversed\nENDPROCEDURE\n\n• Correct procedure header with parameter (1 mark)\n• Initialize empty string for result (1 mark)\n• Loop from end to start (1 mark)\n• Access characters correctly (1 mark)\n• Concatenate characters (1 mark)\n• Output result (1 mark)' 
                },
                { 
                    id: 'pp2022-p2-4', 
                    topic: 'algorithms', 
                    marks: 4, 
                    question: 'Explain the difference between validation and verification of data. Give one example of each.', 
                    type: 'written', 
                    markScheme: 'Validation:\n• Checking data is sensible/reasonable (1 mark)\n• Automatic check by computer (1 mark)\n• Example: range check, type check, length check, format check, presence check (1 mark)\n\nVerification:\n• Checking data has been entered correctly (1 mark)\n• Checking data matches the source (1 mark)\n• Example: double entry, visual check, proofreading (1 mark)\nMax 4 marks' 
                },
                { 
                    id: 'pp2022-p2-5', 
                    topic: 'programming', 
                    marks: 5, 
                    question: 'A text file called "scores.txt" contains student names and their scores, one per line, in the format "Name,Score". Write pseudocode to read the file and output the name of the student with the highest score.', 
                    type: 'code', 
                    markScheme: 'DECLARE line, name, topName : STRING\nDECLARE score, topScore : INTEGER\ntopScore ← 0\n\nOPENFILE "scores.txt" FOR READ\n\nWHILE NOT EOF("scores.txt")\n    READFILE "scores.txt", line\n    name ← SUBSTRING(line, 1, POSITION(line, ",") - 1)\n    score ← INT(SUBSTRING(line, POSITION(line, ",") + 1, LENGTH(line)))\n    \n    IF score > topScore THEN\n        topScore ← score\n        topName ← name\n    ENDIF\nENDWHILE\n\nCLOSEFILE "scores.txt"\nOUTPUT "Top student: ", topName, " with ", topScore\n\n• Open file for reading (1 mark)\n• Loop until end of file (1 mark)\n• Parse name and score from line (1 mark)\n• Track highest score and name (1 mark)\n• Close file and output (1 mark)' 
                },
                { 
                    id: 'pp2022-p2-6', 
                    topic: 'algorithms', 
                    marks: 7, 
                    question: 'Write pseudocode for a binary search algorithm to search for a value in a sorted array Data[1:100]. The algorithm should output the position if found, or -1 if not found.', 
                    type: 'code', 
                    markScheme: 'FUNCTION BinarySearch(Data : ARRAY, SearchValue : INTEGER) RETURNS INTEGER\n    DECLARE Low, High, Mid : INTEGER\n    DECLARE Found : BOOLEAN\n    \n    Low ← 1\n    High ← 100\n    Found ← FALSE\n    \n    WHILE Low <= High AND Found = FALSE\n        Mid ← (Low + High) DIV 2\n        \n        IF Data[Mid] = SearchValue THEN\n            Found ← TRUE\n        ELSE IF Data[Mid] < SearchValue THEN\n            Low ← Mid + 1\n        ELSE\n            High ← Mid - 1\n        ENDIF\n    ENDWHILE\n    \n    IF Found = TRUE THEN\n        RETURN Mid\n    ELSE\n        RETURN -1\n    ENDIF\nENDFUNCTION\n\n• Initialize Low, High correctly (1 mark)\n• Loop while Low <= High (1 mark)\n• Calculate Mid correctly (1 mark)\n• Compare with middle element (1 mark)\n• Adjust Low when too small (1 mark)\n• Adjust High when too large (1 mark)\n• Return position or -1 (1 mark)' 
                },
                { 
                    id: 'pp2022-p2-7', 
                    topic: 'programming', 
                    marks: 4, 
                    question: 'Explain what is meant by a subroutine. Describe two benefits of using subroutines in programs.', 
                    type: 'written', 
                    markScheme: 'Subroutine:\n• A named block of code that performs a specific task (1 mark)\n• Can be a function (returns a value) or procedure (doesn\'t return) (1 mark)\n• Can be called from elsewhere in the program (1 mark)\n\nBenefits:\n• Code reuse - write once, use many times (1 mark)\n• Easier to test and debug (1 mark)\n• Makes code more readable/organized (1 mark)\n• Team development - different people can work on different subroutines (1 mark)\n• Easier maintenance (1 mark)\nMax 4 marks' 
                },
                { 
                    id: 'pp2022-p2-8', 
                    topic: 'algorithms', 
                    marks: 5, 
                    question: 'What is the output of this algorithm?\n\nDECLARE a, b, temp : INTEGER\na ← 5\nb ← 3\nFOR i ← 1 TO 4\n    temp ← a\n    a ← a + b\n    b ← temp\nNEXT i\nOUTPUT a, b', 
                    type: 'written', 
                    markScheme: 'Trace:\n| i | a  | b  | temp |\n|---|----|----|------|\n|   | 5  | 3  |      |\n| 1 | 8  | 5  | 5    |\n| 2 | 13 | 8  | 8    |\n| 3 | 21 | 13 | 13   |\n| 4 | 34 | 21 | 21   |\n\nOutput: 34, 21\n\n(This generates Fibonacci-like sequence)\n\n• Correct understanding of temp swap (1 mark)\n• Correct value of a after each iteration (2 marks)\n• Correct value of b after each iteration (1 mark)\n• Correct final output (1 mark)' 
                }
            ]
        },
        '2021-paper2': {
            year: 2021,
            paper: 'paper2',
            questions: [
                { 
                    id: 'pp2021-p2-1', 
                    topic: 'algorithms', 
                    marks: 4, 
                    question: 'Write pseudocode to calculate and output the sum of all even numbers between 1 and 100 inclusive.', 
                    type: 'code', 
                    markScheme: 'DECLARE Total, i : INTEGER\nTotal ← 0\n\nFOR i ← 2 TO 100 STEP 2\n    Total ← Total + i\nNEXT i\n\nOUTPUT Total\n\nAlternative:\nFOR i ← 1 TO 100\n    IF i MOD 2 = 0 THEN\n        Total ← Total + i\n    ENDIF\nNEXT i\n\n• Initialize total to 0 (1 mark)\n• Loop through range (1 mark)\n• Identify even numbers (1 mark)\n• Add to total and output (1 mark)\n\nAnswer: 2550' 
                },
                { 
                    id: 'pp2021-p2-2', 
                    topic: 'programming', 
                    marks: 5, 
                    question: 'Explain the difference between a procedure and a function. Write an example of each.', 
                    type: 'written', 
                    markScheme: 'Procedure:\n• Does not return a value (1 mark)\n• Called as a statement (1 mark)\n• Example:\nPROCEDURE Greet(name : STRING)\n    OUTPUT "Hello ", name\nENDPROCEDURE (1 mark)\n\nFunction:\n• Returns a value (1 mark)\n• Used in expressions (1 mark)\n• Example:\nFUNCTION Square(n : INTEGER) RETURNS INTEGER\n    RETURN n * n\nENDFUNCTION (1 mark)\n\nMax 5 marks' 
                },
                { 
                    id: 'pp2021-p2-3', 
                    topic: 'programming', 
                    marks: 6, 
                    question: 'Write a function called IsPrime that takes an integer as input and returns TRUE if the number is prime, FALSE otherwise.', 
                    type: 'code', 
                    markScheme: 'FUNCTION IsPrime(n : INTEGER) RETURNS BOOLEAN\n    DECLARE i : INTEGER\n    \n    IF n < 2 THEN\n        RETURN FALSE\n    ENDIF\n    \n    FOR i ← 2 TO n DIV 2\n        IF n MOD i = 0 THEN\n            RETURN FALSE\n        ENDIF\n    NEXT i\n    \n    RETURN TRUE\nENDFUNCTION\n\n• Function header with correct return type (1 mark)\n• Handle edge cases (n < 2) (1 mark)\n• Loop from 2 to n/2 or sqrt(n) (1 mark)\n• Check divisibility with MOD (1 mark)\n• Return FALSE if divisible (1 mark)\n• Return TRUE if no divisors found (1 mark)' 
                },
                { 
                    id: 'pp2021-p2-4', 
                    topic: 'algorithms', 
                    marks: 4, 
                    question: 'State four different types of error that can occur in a program. For each, give an example.', 
                    type: 'written', 
                    markScheme: '• Syntax error - breaking language rules, e.g., missing bracket, misspelled keyword (1 mark)\n• Logic error - program runs but gives wrong result, e.g., using + instead of - (1 mark)\n• Runtime error - error during execution, e.g., division by zero, file not found (1 mark)\n• Type error - wrong data type, e.g., adding string to integer (1 mark)\n• Overflow error - number too large for storage (1 mark)\n• Array index out of bounds (1 mark)\nMax 4 marks' 
                },
                { 
                    id: 'pp2021-p2-5', 
                    topic: 'programming', 
                    marks: 7, 
                    question: 'Write pseudocode for a program that:\n1. Inputs marks for 30 students\n2. Stores them in an array\n3. Calculates the average\n4. Outputs how many students scored above average', 
                    type: 'code', 
                    markScheme: 'DECLARE Marks : ARRAY[1:30] OF INTEGER\nDECLARE Total, Count, i : INTEGER\nDECLARE Average : REAL\n\n// Input marks\nTotal ← 0\nFOR i ← 1 TO 30\n    OUTPUT "Enter mark for student ", i\n    INPUT Marks[i]\n    Total ← Total + Marks[i]\nNEXT i\n\n// Calculate average\nAverage ← Total / 30\n\n// Count above average\nCount ← 0\nFOR i ← 1 TO 30\n    IF Marks[i] > Average THEN\n        Count ← Count + 1\n    ENDIF\nNEXT i\n\nOUTPUT "Average: ", Average\nOUTPUT "Students above average: ", Count\n\n• Declare array correctly (1 mark)\n• Input loop storing in array (1 mark)\n• Calculate total (1 mark)\n• Calculate average (1 mark)\n• Second loop to count (1 mark)\n• Correct comparison (> not >=) (1 mark)\n• Output results (1 mark)' 
                },
                { 
                    id: 'pp2021-p2-6', 
                    topic: 'algorithms', 
                    marks: 4, 
                    question: 'Describe how you would test a program that validates email addresses. Include the test data you would use.', 
                    type: 'written', 
                    markScheme: 'Testing approach:\n• Normal/valid data - should be accepted (1 mark)\n• Boundary data - edge cases (1 mark)\n• Invalid/erroneous data - should be rejected (1 mark)\n\nTest data examples:\n• Valid: user@example.com, a@b.co (1 mark)\n• Invalid: missing @ symbol - "userexample.com" (1 mark)\n• Invalid: missing domain - "user@" (1 mark)\n• Invalid: spaces - "user @example.com" (1 mark)\n• Boundary: minimum valid "a@b.c" (1 mark)\nMax 4 marks' 
                }
            ]
        }
    },
    
    render: () => {
        try {
            return `
                <div class="past-paper-view">
                    <div class="pp-header">
                        <h1>📝 Past Paper Practice</h1>
                        <p>Practice with Pearson Edexcel IGCSE Computer Science (4CP0) style exam questions</p>
                        <div class="pp-exam-info">
                            <span class="pp-exam-badge">Edexcel 4CP0</span>
                            <span class="pp-exam-detail">International GCSE</span>
                        </div>
                    </div>
                    
                    <div class="pp-content">
                        ${PastPaperView.renderPaperSelection()}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('PastPaperView render error:', error);
            return `
                <div class="past-paper-view">
                    <div class="error-state">
                        <span class="error-icon">⚠️</span>
                        <h2>Unable to load Past Papers</h2>
                        <p>Please try refreshing the page.</p>
                        <button class="btn btn-primary" onclick="location.reload()">Refresh</button>
                    </div>
                </div>
            `;
        }
    },
    
    init: () => {
        console.log('📝 Past Paper view initialized');
    },
    
    cleanup: () => {
        // Clear any running timer
        if (PastPaperView.timerInterval) {
            clearInterval(PastPaperView.timerInterval);
            PastPaperView.timerInterval = null;
        }
        // Reset state
        PastPaperView.currentPaper = null;
        PastPaperView.currentQuestionIndex = 0;
        PastPaperView.answers = [];
        PastPaperView.timeRemaining = 0;
        console.log('📝 Past Paper view cleanup');
    },
    
    renderPaperSelection: () => {
        try {
            const stats = PastPaperView.getStats();
            
            // Group papers by type
            const paper1s = Object.entries(PastPaperView.papers).filter(([id, p]) => p.paper === 'paper1');
            const paper2s = Object.entries(PastPaperView.papers).filter(([id, p]) => p.paper === 'paper2');
            
            return `
            <div class="pp-selection">
                <div class="pp-paper-types">
                    <!-- Paper 1 Section -->
                    <div class="pp-paper-type-section">
                        <div class="pp-paper-type-header paper1">
                            <span class="pp-paper-type-icon">📖</span>
                            <div class="pp-paper-type-info">
                                <h3>Paper 1 - Principles of Computer Science</h3>
                                <p>Written exam covering all theory topics • 1hr 30min • 50% of IGCSE</p>
                            </div>
                        </div>
                        <div class="pp-papers-list">
                            ${paper1s.map(([id, paper]) => {
                                const completed = stats.completed?.includes(id);
                                const score = stats.scores?.[id];
                                return `
                                    <div class="pp-paper-card ${completed ? 'completed' : ''}">
                                        <div class="pp-paper-info">
                                            <span class="pp-year">${paper.year}</span>
                                            <span class="pp-questions">${paper.questions.length} questions</span>
                                        </div>
                                        ${completed ? `<span class="pp-score">${score}%</span>` : ''}
                                        <button class="btn btn-primary btn-small" onclick="PastPaperView.startPaper('${id}')">
                                            ${completed ? 'Retry' : 'Start'}
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <!-- Paper 2 Section -->
                    <div class="pp-paper-type-section">
                        <div class="pp-paper-type-header paper2">
                            <span class="pp-paper-type-icon">💻</span>
                            <div class="pp-paper-type-info">
                                <h3>Paper 2 - Application of Computational Thinking</h3>
                                <p>Problem solving, algorithms & programming • 1hr 30min • 50% of IGCSE</p>
                            </div>
                        </div>
                        <div class="pp-papers-list">
                            ${paper2s.map(([id, paper]) => {
                                const completed = stats.completed?.includes(id);
                                const score = stats.scores?.[id];
                                return `
                                    <div class="pp-paper-card ${completed ? 'completed' : ''}">
                                        <div class="pp-paper-info">
                                            <span class="pp-year">${paper.year}</span>
                                            <span class="pp-questions">${paper.questions.length} questions</span>
                                        </div>
                                        ${completed ? `<span class="pp-score">${score}%</span>` : ''}
                                        <button class="btn btn-primary btn-small" onclick="PastPaperView.startPaper('${id}')">
                                            ${completed ? 'Retry' : 'Start'}
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="pp-options">
                    <div class="pp-option-group">
                        <h3>🎯 Topic Practice</h3>
                        <p>Practice questions sorted by topic</p>
                        <div class="pp-topics-list">
                            ${PastPaperView.getTopicStats().map(topic => `
                                <div class="pp-topic-card">
                                    <span class="pp-topic-name">${topic.name}</span>
                                    <span class="pp-topic-count">${topic.count} questions</span>
                                    <button class="btn btn-secondary btn-small" onclick="PastPaperView.startTopicPractice('${topic.id}')">
                                        Practice
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="pp-stats-panel">
                    <h3>📊 Your Progress</h3>
                    <div class="pp-stats">
                        <div class="pp-stat">
                            <span class="pp-stat-value">${stats.totalAttempted || 0}</span>
                            <span class="pp-stat-label">Questions Attempted</span>
                        </div>
                        <div class="pp-stat">
                            <span class="pp-stat-value">${stats.averageScore || 0}%</span>
                            <span class="pp-stat-label">Average Score</span>
                        </div>
                        <div class="pp-stat">
                            <span class="pp-stat-value">${Object.keys(stats.scores || {}).length}</span>
                            <span class="pp-stat-label">Papers Completed</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        } catch (error) {
            console.error('Error rendering paper selection:', error);
            return '<div class="error-message">Failed to load papers</div>';
        }
    },
    
    getTopicStats: () => {
        try {
            const topics = {};
            
            Object.values(PastPaperView.papers || {}).forEach(paper => {
                if (Array.isArray(paper.questions)) {
                    paper.questions.forEach(q => {
                        if (!topics[q.topic]) {
                            topics[q.topic] = { id: q.topic, name: PastPaperView.formatTopicName(q.topic), count: 0 };
                        }
                        topics[q.topic].count++;
                    });
                }
            });
            
            return Object.values(topics).sort((a, b) => b.count - a.count);
        } catch (error) {
            console.error('Error getting topic stats:', error);
            return [];
        }
    },
    
    formatTopicName: (id) => {
        const names = {
            'data-representation': 'Data Representation',
            'hardware': 'Hardware',
            'software': 'Software',
            'networks': 'Networks',
            'security': 'Security',
            'programming': 'Programming',
            'databases': 'Databases',
            'algorithms': 'Algorithms'
        };
        return names[id] || id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },
    
    startPaper: (paperId) => {
        const paper = PastPaperView.papers[paperId];
        if (!paper) return;
        
        PastPaperView.currentPaper = { id: paperId, ...paper };
        PastPaperView.currentQuestionIndex = 0;
        PastPaperView.answers = [];
        PastPaperView.showingMarkScheme = false;
        
        // Start timer
        const duration = PastPaperView.paperTypes[paper.paper].duration;
        PastPaperView.timeRemaining = duration * 60;
        
        PastPaperView.renderExam();
        PastPaperView.startTimer();
    },
    
    startTopicPractice: (topicId) => {
        // Collect all questions for this topic
        const questions = [];
        Object.values(PastPaperView.papers).forEach(paper => {
            paper.questions.forEach(q => {
                if (q.topic === topicId) questions.push(q);
            });
        });
        
        if (questions.length === 0) {
            Toast.show('No questions available for this topic', 'error');
            return;
        }
        
        // Shuffle and take up to 10
        const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 10);
        
        PastPaperView.currentPaper = {
            id: `topic-${topicId}`,
            year: 'Practice',
            paper: 'paper1',
            questions: shuffled
        };
        PastPaperView.currentQuestionIndex = 0;
        PastPaperView.answers = [];
        PastPaperView.timeRemaining = 0; // No timer for topic practice
        
        PastPaperView.renderExam();
    },
    
    renderExam: () => {
        const container = document.querySelector('.pp-content');
        if (!container) return;
        
        const paper = PastPaperView.currentPaper;
        const q = paper.questions[PastPaperView.currentQuestionIndex];
        
        container.innerHTML = `
            <div class="pp-exam">
                <div class="pp-exam-header">
                    <div class="pp-exam-info">
                        <span class="pp-exam-title">${paper.year} - ${PastPaperView.paperTypes[paper.paper]?.name || 'Practice'}</span>
                        <span class="pp-exam-progress">Question ${PastPaperView.currentQuestionIndex + 1} of ${paper.questions.length}</span>
                    </div>
                    ${PastPaperView.timeRemaining > 0 ? `
                        <div class="pp-timer" id="pp-timer">
                            <i class="fas fa-clock"></i>
                            <span id="timer-display">${PastPaperView.formatTime(PastPaperView.timeRemaining)}</span>
                        </div>
                    ` : ''}
                    <button class="btn btn-secondary btn-small" onclick="PastPaperView.exitExam()">Exit</button>
                </div>
                
                <div class="pp-question-card">
                    <div class="pp-question-meta">
                        <span class="pp-topic-badge">${PastPaperView.formatTopicName(q.topic)}</span>
                        <span class="pp-marks-badge">${q.marks} mark${q.marks > 1 ? 's' : ''}</span>
                    </div>
                    
                    <div class="pp-question-text">
                        <p>${q.question}</p>
                    </div>
                    
                    <div class="pp-answer-area">
                        ${q.type === 'code' ? `
                            <textarea id="pp-answer" class="pp-code-answer" placeholder="Write your answer here..." rows="10">${PastPaperView.answers[PastPaperView.currentQuestionIndex]?.answer || ''}</textarea>
                        ` : `
                            <textarea id="pp-answer" class="pp-written-answer" placeholder="Write your answer here..." rows="6">${PastPaperView.answers[PastPaperView.currentQuestionIndex]?.answer || ''}</textarea>
                        `}
                    </div>
                    
                    <div class="pp-actions">
                        ${PastPaperView.currentQuestionIndex > 0 ? `
                            <button class="btn btn-secondary" onclick="PastPaperView.prevQuestion()">← Previous</button>
                        ` : '<div></div>'}
                        
                        <button class="btn btn-primary" onclick="PastPaperView.saveAndNext()">
                            ${PastPaperView.currentQuestionIndex < paper.questions.length - 1 ? 'Next →' : 'Finish'}
                        </button>
                    </div>
                </div>
                
                <div class="pp-question-nav">
                    ${paper.questions.map((_, i) => `
                        <button class="pp-nav-btn ${i === PastPaperView.currentQuestionIndex ? 'current' : ''} ${PastPaperView.answers[i] ? 'answered' : ''}" 
                                onclick="PastPaperView.goToQuestion(${i})">
                            ${i + 1}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    saveAnswer: () => {
        const answerEl = document.getElementById('pp-answer');
        if (answerEl) {
            PastPaperView.answers[PastPaperView.currentQuestionIndex] = {
                answer: answerEl.value,
                question: PastPaperView.currentPaper.questions[PastPaperView.currentQuestionIndex]
            };
        }
    },
    
    saveAndNext: () => {
        PastPaperView.saveAnswer();
        
        if (PastPaperView.currentQuestionIndex < PastPaperView.currentPaper.questions.length - 1) {
            PastPaperView.currentQuestionIndex++;
            PastPaperView.renderExam();
        } else {
            PastPaperView.finishExam();
        }
    },
    
    prevQuestion: () => {
        PastPaperView.saveAnswer();
        if (PastPaperView.currentQuestionIndex > 0) {
            PastPaperView.currentQuestionIndex--;
            PastPaperView.renderExam();
        }
    },
    
    goToQuestion: (index) => {
        PastPaperView.saveAnswer();
        PastPaperView.currentQuestionIndex = index;
        PastPaperView.renderExam();
    },
    
    startTimer: () => {
        if (PastPaperView.timerInterval) clearInterval(PastPaperView.timerInterval);
        
        PastPaperView.timerInterval = setInterval(() => {
            PastPaperView.timeRemaining--;
            
            const display = document.getElementById('timer-display');
            if (display) {
                display.textContent = PastPaperView.formatTime(PastPaperView.timeRemaining);
                
                if (PastPaperView.timeRemaining <= 300) {
                    display.parentElement.classList.add('warning');
                }
            }
            
            if (PastPaperView.timeRemaining <= 0) {
                clearInterval(PastPaperView.timerInterval);
                Toast.show('⏰ Time\'s up!', 'warning');
                PastPaperView.finishExam();
            }
        }, 1000);
    },
    
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    
    exitExam: () => {
        if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
            if (PastPaperView.timerInterval) clearInterval(PastPaperView.timerInterval);
            const container = document.querySelector('.pp-content');
            if (container) {
                container.innerHTML = PastPaperView.renderPaperSelection();
            }
        }
    },
    
    finishExam: () => {
        PastPaperView.saveAnswer();
        if (PastPaperView.timerInterval) clearInterval(PastPaperView.timerInterval);
        
        PastPaperView.renderResults();
    },
    
    renderResults: () => {
        const container = document.querySelector('.pp-content');
        if (!container) return;
        
        const paper = PastPaperView.currentPaper;
        const totalMarks = paper.questions.reduce((sum, q) => sum + q.marks, 0);
        
        container.innerHTML = `
            <div class="pp-results">
                <div class="pp-results-header">
                    <h2>📝 Review Your Answers</h2>
                    <p>${paper.year} - ${PastPaperView.paperTypes[paper.paper]?.name || 'Practice'}</p>
                </div>
                
                <div class="pp-results-summary">
                    <p>Total marks available: <strong>${totalMarks}</strong></p>
                    <p>Compare your answers with the mark schemes below.</p>
                </div>
                
                <div class="pp-results-questions">
                    ${paper.questions.map((q, i) => {
                        const answer = PastPaperView.answers[i];
                        return `
                            <div class="pp-result-item">
                                <div class="pp-result-header">
                                    <span class="pp-q-num">Q${i + 1}</span>
                                    <span class="pp-q-topic">${PastPaperView.formatTopicName(q.topic)}</span>
                                    <span class="pp-q-marks">${q.marks} marks</span>
                                </div>
                                
                                <div class="pp-result-question">
                                    <p><strong>Question:</strong> ${q.question}</p>
                                </div>
                                
                                <div class="pp-result-answer">
                                    <p><strong>Your Answer:</strong></p>
                                    <pre class="pp-user-answer">${Helpers.escapeHtml(answer?.answer || '(No answer provided)')}</pre>
                                </div>
                                
                                <div class="pp-mark-scheme">
                                    <button class="btn btn-secondary btn-small" onclick="this.nextElementSibling.classList.toggle('show'); this.textContent = this.nextElementSibling.classList.contains('show') ? 'Hide Mark Scheme' : 'Show Mark Scheme'">
                                        Show Mark Scheme
                                    </button>
                                    <div class="pp-scheme-content">
                                        <p><strong>Mark Scheme:</strong></p>
                                        <pre>${q.markScheme}</pre>
                                    </div>
                                </div>
                                
                                <div class="pp-self-mark">
                                    <label>Self-assess your marks:</label>
                                    <input type="number" min="0" max="${q.marks}" value="0" class="pp-mark-input" data-question="${i}" onchange="PastPaperView.updateSelfMark()">
                                    <span>/ ${q.marks}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="pp-results-footer">
                    <div class="pp-total-score">
                        <span>Your estimated score:</span>
                        <span id="pp-total-marks">0</span> / ${totalMarks}
                        (<span id="pp-percentage">0</span>%)
                    </div>
                    
                    <div class="pp-results-actions">
                        <button class="btn btn-primary" onclick="PastPaperView.saveResults()">Save Results</button>
                        <button class="btn btn-secondary" onclick="location.reload()">Back to Papers</button>
                    </div>
                </div>
            </div>
        `;
    },
    
    updateSelfMark: () => {
        const inputs = document.querySelectorAll('.pp-mark-input');
        let total = 0;
        inputs.forEach(input => {
            total += parseInt(input.value) || 0;
        });
        
        const paper = PastPaperView.currentPaper;
        const totalMarks = paper.questions.reduce((sum, q) => sum + q.marks, 0);
        const percentage = Math.round((total / totalMarks) * 100);
        
        document.getElementById('pp-total-marks').textContent = total;
        document.getElementById('pp-percentage').textContent = percentage;
    },
    
    saveResults: () => {
        const inputs = document.querySelectorAll('.pp-mark-input');
        let total = 0;
        inputs.forEach(input => {
            total += parseInt(input.value) || 0;
        });
        
        const paper = PastPaperView.currentPaper;
        const totalMarks = paper.questions.reduce((sum, q) => sum + q.marks, 0);
        const percentage = Math.round((total / totalMarks) * 100);
        
        const stats = PastPaperView.getStats();
        stats.completed = stats.completed || [];
        stats.scores = stats.scores || {};
        stats.totalAttempted = (stats.totalAttempted || 0) + paper.questions.length;
        
        if (!stats.completed.includes(paper.id)) {
            stats.completed.push(paper.id);
        }
        stats.scores[paper.id] = percentage;
        
        // Calculate average
        const scores = Object.values(stats.scores);
        stats.averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        
        PastPaperView.saveStats(stats);
        
        Toast.show(`✅ Results saved! Score: ${percentage}%`, 'success');
        
        // Track with streak system
        if (typeof StreakSystem !== 'undefined') {
            paper.questions.forEach(() => StreakSystem.recordActivity('question'));
        }
    },
    
    getStats: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_pastpapers') || '{}');
        } catch (e) {
            return {};
        }
    },
    
    saveStats: (stats) => {
        localStorage.setItem('csmaster_pastpapers', JSON.stringify(stats));
    }
};
