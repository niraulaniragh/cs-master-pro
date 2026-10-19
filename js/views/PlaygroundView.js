/**
 * PlaygroundView.js - Enhanced Code Playground
 * Features: Realistic Python interpreter, coding challenges, syntax highlighting
 */

const PlaygroundView = {
    currentChallenge: null,
    
    render: () => {
        return `
            <div class="playground-view">
                <div class="playground-header">
                    <h2>💻 Code Playground</h2>
                    <div class="playground-mode-tabs">
                        <button class="mode-tab active" onclick="PlaygroundView.showMode('sandbox', this)">
                            🎨 Sandbox
                        </button>
                        <button class="mode-tab" onclick="PlaygroundView.showMode('challenges', this)">
                            🎯 Challenges
                        </button>
                        <button class="mode-tab" onclick="PlaygroundView.showMode('learn', this)">
                            📖 Learn Python
                        </button>
                    </div>
                </div>
                
                <div class="playground-content">
                    <!-- Sandbox Mode -->
                    <div class="playground-mode active" id="sandbox-mode">
                        ${PlaygroundView.renderSandbox()}
                    </div>
                    
                    <!-- Challenges Mode -->
                    <div class="playground-mode" id="challenges-mode">
                        ${PlaygroundView.renderChallenges()}
                    </div>
                    
                    <!-- Learn Mode -->
                    <div class="playground-mode" id="learn-mode">
                        ${PlaygroundView.renderLearnMode()}
                    </div>
                </div>
            </div>
        `;
    },

    renderSandbox: () => {
        return `
            <div class="sandbox-layout">
                <div class="code-section">
                    <div class="code-header">
                        <div class="code-title">
                            <span class="python-icon">🐍</span>
                            <span>Python 3</span>
                        </div>
                        <div class="code-actions">
                            <select id="example-select" onchange="PlaygroundView.loadExample(this.value)">
                                <option value="">📂 Load Example...</option>
                                <optgroup label="Basics">
                                    <option value="hello">Hello World</option>
                                    <option value="variables">Variables & Types</option>
                                    <option value="input">User Input</option>
                                </optgroup>
                                <optgroup label="Control Flow">
                                    <option value="if">If Statements</option>
                                    <option value="for">FOR Loop</option>
                                    <option value="while">WHILE Loop</option>
                                    <option value="nested">Nested Loops</option>
                                </optgroup>
                                <optgroup label="Data Structures">
                                    <option value="list">Lists</option>
                                    <option value="dict">Dictionaries</option>
                                </optgroup>
                                <optgroup label="Functions">
                                    <option value="function">Functions</option>
                                    <option value="recursion">Recursion</option>
                                </optgroup>
                                <optgroup label="Algorithms">
                                    <option value="linear">Linear Search</option>
                                    <option value="binary">Binary Search</option>
                                    <option value="bubble">Bubble Sort</option>
                                </optgroup>
                            </select>
                            <button class="btn btn-small btn-secondary" onclick="PlaygroundView.clearCode()">
                                <i class="fas fa-trash"></i> Clear
                            </button>
                            <button class="btn btn-small btn-primary" onclick="PlaygroundView.runCode()">
                                <i class="fas fa-play"></i> Run
                            </button>
                        </div>
                    </div>
                    <div class="code-editor-wrapper">
                        <div class="line-numbers" id="line-numbers">1</div>
                        <textarea id="code-editor" spellcheck="false" 
                            oninput="PlaygroundView.updateLineNumbers()"
                            onkeydown="PlaygroundView.handleTab(event)"
                            onscroll="PlaygroundView.syncScroll()"
                            placeholder="# Write your Python code here&#10;print('Hello, World!')"># Welcome to Python Playground!
# Try running this code:

name = input("What's your name? ")
print(f"Hello, {name}!")

for i in range(5):
    print(f"Count: {i}")</textarea>
                    </div>
                </div>
                
                <div class="output-section">
                    <div class="output-tabs">
                        <button class="tab-btn active" onclick="PlaygroundView.showTab('output', this)">
                            📤 Output
                        </button>
                        <button class="tab-btn" onclick="PlaygroundView.showTab('trace', this)">
                            📊 Trace Table
                        </button>
                        <button class="tab-btn" onclick="PlaygroundView.showTab('console', this)">
                            🖥️ Console
                        </button>
                    </div>
                    
                    <div class="tab-content active" id="output-tab">
                        <div class="output-header">
                            <span>Program Output</span>
                            <button class="btn-icon" onclick="PlaygroundView.copyOutput()" title="Copy output">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                        <pre id="code-output" class="output-display">Click "Run" to execute your code</pre>
                    </div>
                    
                    <div class="tab-content" id="trace-tab">
                        <div class="trace-controls">
                            <button class="btn btn-secondary" onclick="PlaygroundView.generateTrace()">
                                <i class="fas fa-table"></i> Generate Trace
                            </button>
                            <span class="trace-help">Tracks variable changes step by step</span>
                        </div>
                        <div id="trace-table-container">
                            <p class="trace-placeholder">Write code with variables and click "Generate Trace"</p>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="console-tab">
                        <div id="python-console" class="python-console">
                            <div class="console-output" id="console-output">
                                <div class="console-line">Python 3.x Console (Simulated)</div>
                                <div class="console-line">Type Python commands below:</div>
                            </div>
                            <div class="console-input-line">
                                <span class="console-prompt">&gt;&gt;&gt;</span>
                                <input type="text" id="console-input" 
                                    onkeydown="PlaygroundView.handleConsoleInput(event)"
                                    placeholder="Enter Python expression...">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Input Modal -->
            <div class="input-modal" id="input-modal" style="display: none;">
                <div class="input-modal-content">
                    <p id="input-prompt">Enter input:</p>
                    <input type="text" id="input-value" onkeydown="if(event.key==='Enter')PlaygroundView.submitInput()">
                    <button class="btn btn-primary" onclick="PlaygroundView.submitInput()">Submit</button>
                </div>
            </div>
        `;
    },

    renderChallenges: () => {
        const challenges = PlaygroundView.getChallenges();
        const completed = PlaygroundView.getCompletedChallenges();
        
        return `
            <div class="challenges-layout">
                <div class="challenges-sidebar">
                    <h3>🎯 Coding Challenges</h3>
                    <p class="challenges-progress">
                        Completed: ${completed.length}/${challenges.length}
                    </p>
                    <div class="challenges-list">
                        ${challenges.map((c, i) => `
                            <button class="challenge-item ${completed.includes(c.id) ? 'completed' : ''} ${PlaygroundView.currentChallenge?.id === c.id ? 'active' : ''}"
                                    onclick="PlaygroundView.loadChallenge('${c.id}')">
                                <span class="challenge-icon">${completed.includes(c.id) ? '✅' : c.icon}</span>
                                <span class="challenge-info">
                                    <span class="challenge-name">${c.name}</span>
                                    <span class="challenge-difficulty ${c.difficulty}">${c.difficulty}</span>
                                </span>
                                <span class="challenge-xp">+${c.xp} XP</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="challenge-workspace" id="challenge-workspace">
                    <div class="challenge-placeholder">
                        <span class="placeholder-icon">👈</span>
                        <p>Select a challenge from the list to begin</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderLearnMode: () => {
        const topics = [
            { id: 'variables', name: 'Variables & Data Types', icon: '📦' },
            { id: 'operators', name: 'Operators', icon: '➕' },
            { id: 'conditionals', name: 'If Statements', icon: '🔀' },
            { id: 'loops', name: 'Loops', icon: '🔄' },
            { id: 'lists', name: 'Lists & Arrays', icon: '📋' },
            { id: 'functions', name: 'Functions', icon: '⚙️' },
            { id: 'strings', name: 'String Methods', icon: '📝' },
        ];
        
        return `
            <div class="learn-layout">
                <div class="learn-topics">
                    <h3>📖 Python Basics</h3>
                    <div class="topic-cards">
                        ${topics.map(t => `
                            <button class="learn-topic-card" onclick="PlaygroundView.loadLesson('${t.id}')">
                                <span class="ltc-icon">${t.icon}</span>
                                <span class="ltc-name">${t.name}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="learn-content" id="learn-content">
                    <div class="learn-placeholder">
                        <h3>🐍 Learn Python Interactively</h3>
                        <p>Select a topic from the left to learn with examples you can run!</p>
                        <div class="python-tips">
                            <h4>Quick Reference:</h4>
                            <div class="tips-grid">
                                <div class="tip-item">
                                    <code>print("Hello")</code>
                                    <span>Output text</span>
                                </div>
                                <div class="tip-item">
                                    <code>x = 10</code>
                                    <span>Assign variable</span>
                                </div>
                                <div class="tip-item">
                                    <code>input("Name? ")</code>
                                    <span>Get user input</span>
                                </div>
                                <div class="tip-item">
                                    <code>for i in range(5):</code>
                                    <span>Loop 0-4</span>
                                </div>
                                <div class="tip-item">
                                    <code>if x > 5:</code>
                                    <span>Condition</span>
                                </div>
                                <div class="tip-item">
                                    <code>len(list)</code>
                                    <span>Get length</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        console.log('💻 Playground view initialized');
        PlaygroundView.updateLineNumbers();
    },

    showMode: (mode, btn) => {
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.playground-mode').forEach(m => m.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${mode}-mode`).classList.add('active');
    },

    // ==========================================
    // CODE EXAMPLES
    // ==========================================
    examples: {
        hello: `# Hello World - The classic first program
print("Hello, World!")
print("Welcome to Python!")`,

        variables: `# Variables and Data Types
name = "Alice"          # String
age = 15               # Integer
height = 1.65          # Float
is_student = True      # Boolean

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}m")
print(f"Is student: {is_student}")

# Check types
print(f"Type of name: {type(name)}")
print(f"Type of age: {type(age)}")`,

        input: `# User Input
name = input("What is your name? ")
age = input("How old are you? ")
age = int(age)  # Convert to integer

print(f"Hello {name}!")
print(f"In 5 years, you'll be {age + 5}")`,

        if: `# If Statements
score = 75

if score >= 90:
    print("Grade: A - Excellent!")
elif score >= 80:
    print("Grade: B - Good!")
elif score >= 70:
    print("Grade: C - Satisfactory")
elif score >= 60:
    print("Grade: D - Pass")
else:
    print("Grade: F - Fail")

# Also try changing the score!`,

        for: `# FOR Loop - Count from 1 to 10
print("Counting up:")
for i in range(1, 11):
    print(f"Number: {i}")

print("\\nCounting down:")
for i in range(10, 0, -1):
    print(f"Countdown: {i}")
print("Blast off! 🚀")`,

        while: `# WHILE Loop - Keep going until condition is false
count = 0
print("Counting with while loop:")

while count < 5:
    print(f"Count is: {count}")
    count = count + 1

print(f"Final count: {count}")
print("Loop finished!")`,

        nested: `# Nested Loops - Times Tables
print("Times Table (1-5):")
print("-" * 25)

for i in range(1, 6):
    for j in range(1, 6):
        result = i * j
        print(f"{i} x {j} = {result}")
    print("-" * 25)`,

        list: `# Lists (Arrays)
fruits = ["apple", "banana", "cherry", "date"]

print("All fruits:", fruits)
print(f"First fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")
print(f"Number of fruits: {len(fruits)}")

# Add and remove
fruits.append("elderberry")
print(f"After adding: {fruits}")

fruits.remove("banana")
print(f"After removing banana: {fruits}")

# Loop through list
print("\\nAll fruits:")
for fruit in fruits:
    print(f"  - {fruit}")`,

        dict: `# Dictionaries - Key-Value pairs
student = {
    "name": "Alice",
    "age": 15,
    "grade": "A",
    "subjects": ["Math", "Science", "English"]
}

print(f"Name: {student['name']}")
print(f"Age: {student['age']}")
print(f"Grade: {student['grade']}")

print("\\nSubjects:")
for subject in student["subjects"]:
    print(f"  - {subject}")

# Add new key
student["school"] = "CS Academy"
print(f"\\nSchool: {student['school']}")`,

        function: `# Functions
def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

def is_even(number):
    return number % 2 == 0

# Using the functions
message = greet("Python")
print(message)

result = add(5, 3)
print(f"5 + 3 = {result}")

print(f"Is 4 even? {is_even(4)}")
print(f"Is 7 even? {is_even(7)}")`,

        recursion: `# Recursion - Function calling itself
def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Calculate factorials
for i in range(1, 8):
    print(f"{i}! = {factorial(i)}")

print("\\nFibonacci sequence:")
for i in range(10):
    print(fibonacci(i), end=" ")`,

        linear: `# Linear Search Algorithm
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Found! Return index
    return -1  # Not found

# Test the search
numbers = [4, 2, 7, 1, 9, 3, 8, 5]
print(f"Array: {numbers}")

target = 7
result = linear_search(numbers, target)

if result != -1:
    print(f"Found {target} at index {result}")
else:
    print(f"{target} not found")`,

        binary: `# Binary Search Algorithm (requires sorted array)
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        print(f"Checking index {mid}: {arr[mid]}")
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    
    return -1

# Must be sorted!
numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
print(f"Sorted array: {numbers}")
print(f"\\nSearching for 13...")

result = binary_search(numbers, 13)
print(f"\\nFound at index: {result}")`,

        bubble: `# Bubble Sort Algorithm
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        print(f"Pass {i + 1}: {arr}")
        if not swapped:
            break
    return arr

# Test the sort
numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"Original: {numbers}")
print("\\nSorting...")
sorted_nums = bubble_sort(numbers.copy())
print(f"\\nSorted: {sorted_nums}")`
    },

    loadExample: (name) => {
        if (name && PlaygroundView.examples[name]) {
            document.getElementById('code-editor').value = PlaygroundView.examples[name];
            PlaygroundView.updateLineNumbers();
            document.getElementById('example-select').value = '';
        }
    },

    // ==========================================
    // CHALLENGES
    // ==========================================
    getChallenges: () => [
        {
            id: 'hello',
            name: 'Hello World',
            icon: '👋',
            difficulty: 'Easy',
            xp: 10,
            description: 'Print "Hello, World!" to the screen.',
            hint: 'Use the print() function with a string.',
            starterCode: '# Print Hello, World!\n',
            testCases: [
                { input: '', expected: 'Hello, World!' }
            ]
        },
        {
            id: 'sum_two',
            name: 'Sum of Two',
            icon: '➕',
            difficulty: 'Easy',
            xp: 15,
            description: 'Write a program that asks for two numbers and prints their sum.',
            hint: 'Use input() to get numbers, convert with int(), then add them.',
            starterCode: '# Get two numbers from user and print their sum\n',
            testCases: [
                { input: ['5', '3'], expected: '8' }
            ]
        },
        {
            id: 'even_odd',
            name: 'Even or Odd',
            icon: '🔢',
            difficulty: 'Easy',
            xp: 20,
            description: 'Check if a number is even or odd. Print "Even" or "Odd".',
            hint: 'Use the modulo operator (%) to check divisibility by 2.',
            starterCode: '# Check if a number is even or odd\nnum = int(input("Enter a number: "))\n',
            testCases: [
                { input: ['4'], expected: 'Even' },
                { input: ['7'], expected: 'Odd' }
            ]
        },
        {
            id: 'countdown',
            name: 'Countdown',
            icon: '🚀',
            difficulty: 'Easy',
            xp: 25,
            description: 'Print a countdown from 10 to 1, then print "Blast off!"',
            hint: 'Use a for loop with range(10, 0, -1).',
            starterCode: '# Countdown from 10 to 1\n',
            testCases: [
                { input: '', expected: '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nBlast off!' }
            ]
        },
        {
            id: 'factorial',
            name: 'Factorial',
            icon: '❗',
            difficulty: 'Medium',
            xp: 30,
            description: 'Calculate the factorial of a number (e.g., 5! = 120).',
            hint: 'Use a loop or recursion. Multiply all numbers from 1 to n.',
            starterCode: '# Calculate factorial\nn = int(input("Enter number: "))\n',
            testCases: [
                { input: ['5'], expected: '120' },
                { input: ['7'], expected: '5040' }
            ]
        },
        {
            id: 'fizzbuzz',
            name: 'FizzBuzz',
            icon: '🎯',
            difficulty: 'Medium',
            xp: 35,
            description: 'Print 1-20. For multiples of 3 print "Fizz", for 5 print "Buzz", for both print "FizzBuzz".',
            hint: 'Check divisibility with %. Check 15 (both) first!',
            starterCode: '# FizzBuzz challenge\nfor i in range(1, 21):\n    # Your code here\n    pass',
            testCases: [
                { input: '', contains: ['FizzBuzz', 'Fizz', 'Buzz'] }
            ]
        },
        {
            id: 'reverse',
            name: 'Reverse String',
            icon: '🔄',
            difficulty: 'Medium',
            xp: 30,
            description: 'Reverse a string entered by the user.',
            hint: 'Try using slicing: string[::-1]',
            starterCode: '# Reverse a string\ntext = input("Enter text: ")\n',
            testCases: [
                { input: ['hello'], expected: 'olleh' },
                { input: ['Python'], expected: 'nohtyP' }
            ]
        },
        {
            id: 'max_list',
            name: 'Find Maximum',
            icon: '📈',
            difficulty: 'Medium',
            xp: 35,
            description: 'Find the largest number in a list without using max().',
            hint: 'Loop through and keep track of the biggest value.',
            starterCode: '# Find maximum without max()\nnumbers = [3, 7, 2, 9, 4, 1, 8]\n',
            testCases: [
                { input: '', expected: '9' }
            ]
        },
        {
            id: 'prime',
            name: 'Prime Checker',
            icon: '🔐',
            difficulty: 'Hard',
            xp: 50,
            description: 'Check if a number is prime. Print "Prime" or "Not prime".',
            hint: 'A prime has no divisors other than 1 and itself. Check up to sqrt(n).',
            starterCode: '# Check if number is prime\nn = int(input("Enter number: "))\n',
            testCases: [
                { input: ['7'], expected: 'Prime' },
                { input: ['12'], expected: 'Not prime' }
            ]
        },
        {
            id: 'palindrome',
            name: 'Palindrome',
            icon: '🪞',
            difficulty: 'Hard',
            xp: 50,
            description: 'Check if a word is a palindrome (same forwards and backwards).',
            hint: 'Compare the string to its reverse.',
            starterCode: '# Check palindrome\nword = input("Enter word: ").lower()\n',
            testCases: [
                { input: ['radar'], expected: 'Yes' },
                { input: ['hello'], expected: 'No' }
            ]
        }
    ],

    getCompletedChallenges: () => {
        return JSON.parse(localStorage.getItem('csmaster_completed_challenges') || '[]');
    },

    loadChallenge: (id) => {
        const challenges = PlaygroundView.getChallenges();
        const challenge = challenges.find(c => c.id === id);
        if (!challenge) return;
        
        PlaygroundView.currentChallenge = challenge;
        
        const workspace = document.getElementById('challenge-workspace');
        workspace.innerHTML = `
            <div class="challenge-detail">
                <div class="challenge-header">
                    <div class="ch-title">
                        <span class="ch-icon">${challenge.icon}</span>
                        <h3>${challenge.name}</h3>
                        <span class="ch-difficulty ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
                        <span class="ch-xp">+${challenge.xp} XP</span>
                    </div>
                </div>
                
                <div class="challenge-description">
                    <p>${challenge.description}</p>
                    <button class="btn btn-small btn-secondary" onclick="PlaygroundView.showHint()">
                        💡 Show Hint
                    </button>
                    <div class="challenge-hint" id="challenge-hint" style="display: none;">
                        <strong>Hint:</strong> ${challenge.hint}
                    </div>
                </div>
                
                <div class="challenge-editor">
                    <div class="ce-header">
                        <span>Your Solution</span>
                        <div class="ce-actions">
                            <button class="btn btn-small btn-secondary" onclick="PlaygroundView.resetChallenge()">
                                Reset
                            </button>
                            <button class="btn btn-small btn-primary" onclick="PlaygroundView.runChallenge()">
                                ▶ Run
                            </button>
                            <button class="btn btn-small btn-success" onclick="PlaygroundView.submitChallenge()">
                                ✓ Submit
                            </button>
                        </div>
                    </div>
                    <textarea id="challenge-editor" spellcheck="false"
                        onkeydown="PlaygroundView.handleTab(event)">${challenge.starterCode}</textarea>
                </div>
                
                <div class="challenge-output">
                    <h4>Output</h4>
                    <pre id="challenge-output">Run your code to see output...</pre>
                </div>
            </div>
        `;
        
        // Update sidebar
        document.querySelectorAll('.challenge-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.closest('.challenge-item')?.classList.add('active');
    },

    showHint: () => {
        const hint = document.getElementById('challenge-hint');
        hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
    },

    resetChallenge: () => {
        if (PlaygroundView.currentChallenge) {
            document.getElementById('challenge-editor').value = PlaygroundView.currentChallenge.starterCode;
        }
    },

    runChallenge: () => {
        const code = document.getElementById('challenge-editor').value;
        const output = document.getElementById('challenge-output');
        
        try {
            const result = PlaygroundView.interpretPython(code);
            output.textContent = result.output || '(No output)';
            output.className = '';
        } catch (e) {
            output.textContent = `Error: ${e.message}`;
            output.className = 'error';
        }
    },

    submitChallenge: () => {
        const code = document.getElementById('challenge-editor').value;
        const output = document.getElementById('challenge-output');
        const challenge = PlaygroundView.currentChallenge;
        
        if (!challenge) return;
        
        try {
            const result = PlaygroundView.interpretPython(code);
            const outputText = result.output.trim();
            
            // Check test cases
            let passed = false;
            
            if (challenge.testCases[0].contains) {
                // Check if output contains required strings
                passed = challenge.testCases[0].contains.every(s => 
                    outputText.toLowerCase().includes(s.toLowerCase())
                );
            } else {
                // Check exact match (allowing for whitespace differences)
                const expected = challenge.testCases[0].expected.trim();
                passed = outputText === expected || 
                         outputText.includes(expected) ||
                         outputText.replace(/\s+/g, ' ') === expected.replace(/\s+/g, ' ');
            }
            
            if (passed) {
                output.innerHTML = `<span class="success">✅ Correct! Challenge completed!</span>\n\n${outputText}`;
                
                // Save completion
                const completed = PlaygroundView.getCompletedChallenges();
                if (!completed.includes(challenge.id)) {
                    completed.push(challenge.id);
                    localStorage.setItem('csmaster_completed_challenges', JSON.stringify(completed));
                    
                    // Award XP
                    AppState.addXP(challenge.xp);
                    Toast.show(`🎉 Challenge completed! +${challenge.xp} XP`, 'success');
                    
                    // Update UI
                    document.querySelector(`.challenge-item[onclick*="${challenge.id}"]`)?.classList.add('completed');
                }
            } else {
                output.innerHTML = `<span class="error">❌ Not quite right. Try again!</span>\n\nYour output:\n${outputText}\n\nExpected:\n${challenge.testCases[0].expected || 'Contains: ' + challenge.testCases[0].contains?.join(', ')}`;
            }
        } catch (e) {
            output.innerHTML = `<span class="error">Error: ${e.message}</span>`;
        }
    },

    // ==========================================
    // PYTHON INTERPRETER (Enhanced)
    // ==========================================
    inputQueue: [],
    inputResolve: null,

    interpretPython: (code) => {
        const lines = code.split('\n');
        const variables = {};
        const functions = {};
        let output = [];
        
        // Pre-scan for function definitions
        PlaygroundView.scanFunctions(lines, functions);

        const evalExpr = (expr, localVars = {}) => {
            let processed = expr.trim();
            const allVars = { ...variables, ...localVars };
            
            // Handle f-strings
            if (processed.startsWith('f"') || processed.startsWith("f'")) {
                const quote = processed[1];
                const content = processed.slice(2, -1);
                return content.replace(/\{([^}]+)\}/g, (_, e) => evalExpr(e, localVars));
            }
            
            // Handle string literals
            if ((processed.startsWith('"') && processed.endsWith('"')) ||
                (processed.startsWith("'") && processed.endsWith("'"))) {
                return processed.slice(1, -1);
            }
            
            // Handle list literals
            if (processed.startsWith('[') && processed.endsWith(']')) {
                const inner = processed.slice(1, -1);
                if (!inner.trim()) return [];
                return inner.split(',').map(item => evalExpr(item.trim(), localVars));
            }
            
            // Handle dict literals
            if (processed.startsWith('{') && processed.endsWith('}')) {
                const inner = processed.slice(1, -1);
                if (!inner.trim()) return {};
                const obj = {};
                inner.split(',').forEach(pair => {
                    const [key, val] = pair.split(':');
                    if (key && val) {
                        obj[evalExpr(key.trim(), localVars)] = evalExpr(val.trim(), localVars);
                    }
                });
                return obj;
            }
            
            // Handle type()
            if (processed.startsWith('type(')) {
                const arg = processed.match(/type\((.+)\)/)?.[1];
                const val = evalExpr(arg, localVars);
                const t = typeof val;
                if (Array.isArray(val)) return "<class 'list'>";
                if (t === 'number') return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
                if (t === 'string') return "<class 'str'>";
                if (t === 'boolean') return "<class 'bool'>";
                return `<class '${t}'>`;
            }
            
            // Handle len()
            if (processed.startsWith('len(')) {
                const arg = processed.match(/len\((.+)\)/)?.[1];
                const val = evalExpr(arg, localVars);
                return val?.length ?? 0;
            }
            
            // Handle int(), str(), float()
            if (processed.startsWith('int(')) {
                const arg = processed.match(/int\((.+)\)/)?.[1];
                return parseInt(evalExpr(arg, localVars)) || 0;
            }
            if (processed.startsWith('str(')) {
                const arg = processed.match(/str\((.+)\)/)?.[1];
                return String(evalExpr(arg, localVars));
            }
            if (processed.startsWith('float(')) {
                const arg = processed.match(/float\((.+)\)/)?.[1];
                return parseFloat(evalExpr(arg, localVars)) || 0;
            }
            
            // Handle range()
            if (processed.startsWith('range(')) {
                const match = processed.match(/range\(([^)]+)\)/);
                if (match) {
                    const args = match[1].split(',').map(s => evalExpr(s.trim(), localVars));
                    if (args.length === 1) return { type: 'range', start: 0, end: args[0], step: 1 };
                    if (args.length === 2) return { type: 'range', start: args[0], end: args[1], step: 1 };
                    if (args.length === 3) return { type: 'range', start: args[0], end: args[1], step: args[2] };
                }
            }
            
            // Handle abs(), min(), max(), sum()
            if (processed.startsWith('abs(')) {
                const arg = processed.match(/abs\((.+)\)/)?.[1];
                return Math.abs(evalExpr(arg, localVars));
            }
            if (processed.startsWith('min(')) {
                const arg = processed.match(/min\((.+)\)/)?.[1];
                const val = evalExpr(arg, localVars);
                return Array.isArray(val) ? Math.min(...val) : val;
            }
            if (processed.startsWith('max(')) {
                const arg = processed.match(/max\((.+)\)/)?.[1];
                const val = evalExpr(arg, localVars);
                return Array.isArray(val) ? Math.max(...val) : val;
            }
            if (processed.startsWith('sum(')) {
                const arg = processed.match(/sum\((.+)\)/)?.[1];
                const val = evalExpr(arg, localVars);
                return Array.isArray(val) ? val.reduce((a, b) => a + b, 0) : 0;
            }
            
            // Handle input()
            if (processed.startsWith('input(')) {
                const prompt = processed.match(/input\(([^)]*)\)/)?.[1] || '';
                const promptText = evalExpr(prompt, localVars);
                if (PlaygroundView.inputQueue.length > 0) {
                    return PlaygroundView.inputQueue.shift();
                }
                output.push(promptText);
                return PlaygroundView.simulatedInputs.shift() || 'test';
            }
            
            // Handle string methods
            if (processed.includes('.upper()')) {
                const varName = processed.split('.')[0];
                return String(evalExpr(varName, localVars)).toUpperCase();
            }
            if (processed.includes('.lower()')) {
                const varName = processed.split('.')[0];
                return String(evalExpr(varName, localVars)).toLowerCase();
            }
            if (processed.includes('.strip()')) {
                const varName = processed.split('.')[0];
                return String(evalExpr(varName, localVars)).trim();
            }
            
            // Handle list indexing: arr[i]
            const indexMatch = processed.match(/^(\w+)\[([^\]]+)\]$/);
            if (indexMatch) {
                const arr = allVars[indexMatch[1]];
                const idx = evalExpr(indexMatch[2], localVars);
                if (Array.isArray(arr)) {
                    return idx < 0 ? arr[arr.length + idx] : arr[idx];
                }
                if (typeof arr === 'string') {
                    return idx < 0 ? arr[arr.length + idx] : arr[idx];
                }
                if (typeof arr === 'object') {
                    return arr[idx];
                }
            }
            
            // Handle list methods
            if (processed.includes('.append(')) {
                const match = processed.match(/(\w+)\.append\((.+)\)/);
                if (match && Array.isArray(allVars[match[1]])) {
                    allVars[match[1]].push(evalExpr(match[2], localVars));
                    return null;
                }
            }
            if (processed.includes('.remove(')) {
                const match = processed.match(/(\w+)\.remove\((.+)\)/);
                if (match && Array.isArray(allVars[match[1]])) {
                    const val = evalExpr(match[2], localVars);
                    const idx = allVars[match[1]].indexOf(val);
                    if (idx > -1) allVars[match[1]].splice(idx, 1);
                    return null;
                }
            }
            if (processed.includes('.copy()')) {
                const varName = processed.split('.')[0];
                return [...(allVars[varName] || [])];
            }
            
            // Handle function calls
            for (const [fname, fdef] of Object.entries(functions)) {
                if (processed.startsWith(fname + '(')) {
                    const argsMatch = processed.match(new RegExp(`${fname}\\(([^)]*)\\)`));
                    if (argsMatch) {
                        const argValues = argsMatch[1] ? argsMatch[1].split(',').map(a => evalExpr(a.trim(), localVars)) : [];
                        return PlaygroundView.executeFunction(fdef, argValues, functions, variables, output);
                    }
                }
            }
            
            // Replace variable names with values
            for (const [name, value] of Object.entries(allVars)) {
                const regex = new RegExp(`\\b${name}\\b`, 'g');
                if (typeof value === 'string') {
                    processed = processed.replace(regex, `"${value}"`);
                } else if (Array.isArray(value)) {
                    processed = processed.replace(regex, JSON.stringify(value));
                } else {
                    processed = processed.replace(regex, value);
                }
            }
            
            // Handle Python operators
            processed = processed.replace(/\band\b/g, '&&');
            processed = processed.replace(/\bor\b/g, '||');
            processed = processed.replace(/\bnot\b/g, '!');
            processed = processed.replace(/\bTrue\b/g, 'true');
            processed = processed.replace(/\bFalse\b/g, 'false');
            processed = processed.replace(/\bNone\b/g, 'null');
            processed = processed.replace(/\/\//g, '/'); // Integer division
            
            try {
                return eval(processed);
            } catch {
                return processed;
            }
        };

        const executeBlock = (startLine, endLine, indent, localVars = {}) => {
            let j = startLine;
            while (j <= endLine) {
                const line = lines[j];
                if (!line || line.trim() === '' || line.trim().startsWith('#')) {
                    j++;
                    continue;
                }
                
                const lineIndent = line.search(/\S/);
                if (lineIndent < indent && line.trim()) break;
                if (lineIndent > indent) { j++; continue; }

                const trimmed = line.trim();

                // Skip function definitions (already scanned)
                if (trimmed.startsWith('def ')) {
                    let blockEnd = j + 1;
                    while (blockEnd < lines.length && 
                           (lines[blockEnd].trim() === '' || 
                            lines[blockEnd].search(/\S/) > indent ||
                            lines[blockEnd].trim().startsWith('#'))) {
                        blockEnd++;
                    }
                    j = blockEnd;
                    continue;
                }

                // Return statement
                if (trimmed.startsWith('return ')) {
                    const retVal = evalExpr(trimmed.slice(7), localVars);
                    return { returned: true, value: retVal };
                }
                if (trimmed === 'return') {
                    return { returned: true, value: null };
                }

                // Break statement
                if (trimmed === 'break') {
                    return { break: true };
                }

                // Continue statement
                if (trimmed === 'continue') {
                    return { continue: true };
                }

                // Pass statement
                if (trimmed === 'pass') {
                    j++;
                    continue;
                }

                // Print statement
                if (trimmed.startsWith('print(')) {
                    const content = trimmed.slice(6, -1);
                    let parts = [];
                    let current = '';
                    let depth = 0;
                    let inString = false;
                    let stringChar = '';
                    
                    for (const char of content) {
                        if ((char === '"' || char === "'") && !inString) {
                            inString = true;
                            stringChar = char;
                        } else if (char === stringChar && inString) {
                            inString = false;
                        }
                        
                        if (!inString) {
                            if (char === '(' || char === '[' || char === '{') depth++;
                            if (char === ')' || char === ']' || char === '}') depth--;
                            if (char === ',' && depth === 0) {
                                parts.push(current.trim());
                                current = '';
                                continue;
                            }
                        }
                        current += char;
                    }
                    if (current.trim()) parts.push(current.trim());
                    
                    // Handle end= parameter
                    let endChar = '\n';
                    parts = parts.filter(p => {
                        if (p.startsWith('end=')) {
                            endChar = evalExpr(p.slice(4), localVars);
                            return false;
                        }
                        return true;
                    });
                    
                    const toPrint = parts.map(p => {
                        const val = evalExpr(p, localVars);
                        if (Array.isArray(val)) return JSON.stringify(val).replace(/"/g, "'");
                        return val;
                    }).join(' ');
                    
                    if (endChar === '\n') {
                        output.push(toPrint);
                    } else {
                        if (output.length === 0) output.push('');
                        output[output.length - 1] += toPrint + endChar;
                    }
                }
                // Augmented assignment (+=, -=, *=, /=)
                else if (trimmed.match(/^\w+\s*[+\-*\/]=\s*.+$/)) {
                    const match = trimmed.match(/^(\w+)\s*([+\-*\/])=\s*(.+)$/);
                    if (match) {
                        const [, varName, op, expr] = match;
                        const current = variables[varName] ?? localVars[varName] ?? 0;
                        const val = evalExpr(expr, localVars);
                        const newVal = eval(`${current} ${op} ${val}`);
                        if (varName in localVars) localVars[varName] = newVal;
                        else variables[varName] = newVal;
                    }
                }
                // Swap: a, b = b, a
                else if (trimmed.match(/^\w+\s*,\s*\w+\s*=\s*.+,\s*.+$/)) {
                    const match = trimmed.match(/^(\w+)\s*,\s*(\w+)\s*=\s*(.+),\s*(.+)$/);
                    if (match) {
                        const [, var1, var2, expr1, expr2] = match;
                        const val1 = evalExpr(expr1.trim(), localVars);
                        const val2 = evalExpr(expr2.trim(), localVars);
                        variables[var1] = val1;
                        variables[var2] = val2;
                    }
                }
                // List index assignment: arr[i] = value
                else if (trimmed.match(/^\w+\[.+\]\s*=\s*.+$/)) {
                    const match = trimmed.match(/^(\w+)\[(.+)\]\s*=\s*(.+)$/);
                    if (match) {
                        const [, arrName, idxExpr, valExpr] = match;
                        const idx = evalExpr(idxExpr, localVars);
                        const val = evalExpr(valExpr, localVars);
                        if (Array.isArray(variables[arrName])) {
                            variables[arrName][idx] = val;
                        } else if (typeof variables[arrName] === 'object') {
                            variables[arrName][idx] = val;
                        }
                    }
                }
                // Regular assignment
                else if (trimmed.includes('=') && !trimmed.includes('==') && 
                         !trimmed.startsWith('if') && !trimmed.startsWith('while') &&
                         !trimmed.startsWith('elif')) {
                    const eqIdx = trimmed.indexOf('=');
                    const varName = trimmed.slice(0, eqIdx).trim();
                    const value = evalExpr(trimmed.slice(eqIdx + 1).trim(), localVars);
                    if (varName in localVars) {
                        localVars[varName] = value;
                    } else {
                        variables[varName] = value;
                    }
                }
                // Method calls (append, remove, etc.)
                else if (trimmed.match(/^\w+\.(append|remove|pop|clear|insert)\(.+\)$/)) {
                    evalExpr(trimmed, localVars);
                }
                // FOR loop
                else if (trimmed.startsWith('for ')) {
                    const match = trimmed.match(/for\s+(\w+)\s+in\s+(.+):/);
                    if (match) {
                        const varName = match[1];
                        const iterable = evalExpr(match[2], localVars);
                        
                        let blockEnd = j + 1;
                        while (blockEnd < lines.length && 
                               (lines[blockEnd].trim() === '' || 
                                lines[blockEnd].search(/\S/) > indent ||
                                lines[blockEnd].trim().startsWith('#'))) {
                            blockEnd++;
                        }
                        blockEnd--;

                        const iterate = (items) => {
                            for (const item of items) {
                                variables[varName] = item;
                                const result = executeBlock(j + 1, blockEnd, indent + 4, localVars);
                                if (result?.break) break;
                                if (result?.returned) return result;
                            }
                        };

                        if (iterable?.type === 'range') {
                            const items = [];
                            for (let k = iterable.start; iterable.step > 0 ? k < iterable.end : k > iterable.end; k += iterable.step) {
                                items.push(k);
                            }
                            const result = iterate(items);
                            if (result?.returned) return result;
                        } else if (Array.isArray(iterable)) {
                            const result = iterate(iterable);
                            if (result?.returned) return result;
                        } else if (typeof iterable === 'string') {
                            const result = iterate(iterable.split(''));
                            if (result?.returned) return result;
                        }
                        j = blockEnd;
                    }
                }
                // WHILE loop
                else if (trimmed.startsWith('while ')) {
                    const condition = trimmed.match(/while\s+(.+):/)?.[1];
                    let blockEnd = j + 1;
                    while (blockEnd < lines.length && 
                           (lines[blockEnd].trim() === '' || 
                            lines[blockEnd].search(/\S/) > indent ||
                            lines[blockEnd].trim().startsWith('#'))) {
                        blockEnd++;
                    }
                    blockEnd--;

                    let iterations = 0;
                    while (evalExpr(condition, localVars) && iterations < 10000) {
                        const result = executeBlock(j + 1, blockEnd, indent + 4, localVars);
                        if (result?.break) break;
                        if (result?.returned) return result;
                        iterations++;
                    }
                    j = blockEnd;
                }
                // IF statement
                else if (trimmed.startsWith('if ')) {
                    const condition = trimmed.match(/if\s+(.+):/)?.[1];
                    let blockEnd = j + 1;
                    while (blockEnd < lines.length && 
                           (lines[blockEnd].trim() === '' || 
                            lines[blockEnd].search(/\S/) > indent ||
                            lines[blockEnd].trim().startsWith('#'))) {
                        blockEnd++;
                    }
                    blockEnd--;

                    // Find elif and else blocks
                    let elifElseBlocks = [];
                    let k = blockEnd + 1;
                    while (k < lines.length) {
                        const nextLine = lines[k]?.trim();
                        if (!nextLine || nextLine.startsWith('#')) { k++; continue; }
                        const nextIndent = lines[k].search(/\S/);
                        if (nextIndent === indent && (nextLine.startsWith('elif ') || nextLine.startsWith('else:'))) {
                            let nextBlockEnd = k + 1;
                            while (nextBlockEnd < lines.length && 
                                   (lines[nextBlockEnd].trim() === '' || 
                                    lines[nextBlockEnd].search(/\S/) > indent ||
                                    lines[nextBlockEnd].trim().startsWith('#'))) {
                                nextBlockEnd++;
                            }
                            nextBlockEnd--;
                            elifElseBlocks.push({ line: k, type: nextLine.startsWith('elif') ? 'elif' : 'else', end: nextBlockEnd });
                            k = nextBlockEnd + 1;
                        } else {
                            break;
                        }
                    }

                    let executed = false;
                    if (evalExpr(condition, localVars)) {
                        const result = executeBlock(j + 1, blockEnd, indent + 4, localVars);
                        if (result?.returned) return result;
                        executed = true;
                    }

                    if (!executed) {
                        for (const block of elifElseBlocks) {
                            if (block.type === 'elif') {
                                const elifCond = lines[block.line].trim().match(/elif\s+(.+):/)?.[1];
                                if (evalExpr(elifCond, localVars)) {
                                    const result = executeBlock(block.line + 1, block.end, indent + 4, localVars);
                                    if (result?.returned) return result;
                                    executed = true;
                                    break;
                                }
                            } else if (block.type === 'else') {
                                const result = executeBlock(block.line + 1, block.end, indent + 4, localVars);
                                if (result?.returned) return result;
                                break;
                            }
                        }
                    }

                    j = elifElseBlocks.length > 0 ? elifElseBlocks[elifElseBlocks.length - 1].end : blockEnd;
                }
                
                j++;
            }
            return {};
        };

        executeBlock(0, lines.length - 1, 0);
        
        return { output: output.join('\n'), variables };
    },

    scanFunctions: (lines, functions) => {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line?.trim();
            if (trimmed?.startsWith('def ')) {
                const match = trimmed.match(/def\s+(\w+)\(([^)]*)\):/);
                if (match) {
                    const name = match[1];
                    const params = match[2] ? match[2].split(',').map(p => p.trim()) : [];
                    
                    let blockEnd = i + 1;
                    const indent = line.search(/\S/);
                    while (blockEnd < lines.length && 
                           (lines[blockEnd].trim() === '' || 
                            lines[blockEnd].search(/\S/) > indent ||
                            lines[blockEnd].trim().startsWith('#'))) {
                        blockEnd++;
                    }
                    blockEnd--;
                    
                    functions[name] = { params, startLine: i + 1, endLine: blockEnd, indent: indent + 4 };
                }
            }
        }
    },

    executeFunction: (fdef, args, functions, globalVars, output) => {
        const localVars = {};
        fdef.params.forEach((param, i) => {
            localVars[param] = args[i];
        });
        
        const code = PlaygroundView.lastCode || '';
        const lines = code.split('\n');
        
        const evalExpr = PlaygroundView.createEvalExpr(globalVars, localVars, functions, output);
        
        const executeBlock = (startLine, endLine, indent) => {
            let j = startLine;
            while (j <= endLine) {
                const line = lines[j];
                if (!line || line.trim() === '' || line.trim().startsWith('#')) {
                    j++;
                    continue;
                }
                
                const lineIndent = line.search(/\S/);
                if (lineIndent < indent && line.trim()) break;
                if (lineIndent > indent) { j++; continue; }

                const trimmed = line.trim();

                if (trimmed.startsWith('return ')) {
                    return evalExpr(trimmed.slice(7));
                }
                if (trimmed === 'return') {
                    return null;
                }

                // Handle other statements...
                if (trimmed.startsWith('print(')) {
                    const content = trimmed.slice(6, -1);
                    output.push(String(evalExpr(content)));
                }
                else if (trimmed.includes('=') && !trimmed.includes('==')) {
                    const [varName, ...rest] = trimmed.split('=');
                    localVars[varName.trim()] = evalExpr(rest.join('=').trim());
                }
                
                j++;
            }
            return null;
        };
        
        return executeBlock(fdef.startLine, fdef.endLine, fdef.indent);
    },

    createEvalExpr: (globalVars, localVars, functions, output) => {
        return (expr) => {
            // Simplified eval for functions
            let processed = expr.trim();
            const allVars = { ...globalVars, ...localVars };
            
            for (const [name, value] of Object.entries(allVars)) {
                const regex = new RegExp(`\\b${name}\\b`, 'g');
                processed = processed.replace(regex, typeof value === 'string' ? `"${value}"` : value);
            }
            
            try {
                return eval(processed);
            } catch {
                return processed;
            }
        };
    },

    simulatedInputs: [],
    lastCode: '',

    // ==========================================
    // UI HELPERS
    // ==========================================
    clearCode: () => {
        document.getElementById('code-editor').value = '';
        document.getElementById('code-output').textContent = '';
        PlaygroundView.updateLineNumbers();
    },

    showTab: (tabId, btn) => {
        document.querySelectorAll('.output-section .tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.output-section .tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    },

    runCode: () => {
        const code = document.getElementById('code-editor').value;
        const output = document.getElementById('code-output');
        PlaygroundView.lastCode = code;
        
        try {
            const result = PlaygroundView.interpretPython(code);
            output.textContent = result.output || '(No output - use print() to see results)';
            output.className = '';
        } catch (e) {
            output.textContent = `Error: ${e.message}`;
            output.className = 'error';
        }
    },

    updateLineNumbers: () => {
        const editor = document.getElementById('code-editor');
        const lineNumbers = document.getElementById('line-numbers');
        if (!editor || !lineNumbers) return;
        
        const lines = editor.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    },

    syncScroll: () => {
        const editor = document.getElementById('code-editor');
        const lineNumbers = document.getElementById('line-numbers');
        if (lineNumbers) {
            lineNumbers.scrollTop = editor.scrollTop;
        }
    },

    handleTab: (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const editor = e.target;
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 4;
            PlaygroundView.updateLineNumbers();
        }
    },

    handleConsoleInput: (e) => {
        if (e.key === 'Enter') {
            const input = document.getElementById('console-input');
            const output = document.getElementById('console-output');
            const expr = input.value.trim();
            
            if (!expr) return;
            
            // Add input to output
            const inputLine = document.createElement('div');
            inputLine.className = 'console-line input';
            inputLine.textContent = `>>> ${expr}`;
            output.appendChild(inputLine);
            
            try {
                const result = PlaygroundView.interpretPython(`print(${expr})`);
                if (result.output) {
                    const resultLine = document.createElement('div');
                    resultLine.className = 'console-line output';
                    resultLine.textContent = result.output;
                    output.appendChild(resultLine);
                }
            } catch (e) {
                const errorLine = document.createElement('div');
                errorLine.className = 'console-line error';
                errorLine.textContent = `Error: ${e.message}`;
                output.appendChild(errorLine);
            }
            
            input.value = '';
            output.scrollTop = output.scrollHeight;
        }
    },

    copyOutput: () => {
        const output = document.getElementById('code-output');
        navigator.clipboard.writeText(output.textContent);
        Toast.show('Output copied!', 'success');
    },

    generateTrace: () => {
        const code = document.getElementById('code-editor').value;
        const container = document.getElementById('trace-table-container');
        
        try {
            const trace = PlaygroundView.createTraceTable(code);
            container.innerHTML = trace;
        } catch (e) {
            container.innerHTML = `<p class="error">Error generating trace: ${e.message}</p>`;
        }
    },

    createTraceTable: (code) => {
        const lines = code.split('\n');
        const trackVars = new Set();
        
        // Find all variables
        lines.forEach(line => {
            const match = line.match(/^\s*(\w+)\s*=/);
            if (match && !['if', 'for', 'while', 'def', 'class'].includes(match[1])) {
                trackVars.add(match[1]);
            }
        });

        const varNames = Array.from(trackVars);
        
        if (varNames.length === 0) {
            return '<p class="trace-placeholder">No variables found to trace. Add some variable assignments!</p>';
        }

        let html = `
            <table class="trace-table">
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Line</th>
                        ${varNames.map(v => `<th>${v}</th>`).join('')}
                        <th>Output</th>
                    </tr>
                </thead>
                <tbody>
        `;

        const state = {};
        varNames.forEach(v => state[v] = '-');
        let step = 1;

        lines.forEach((line, lineNum) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            
            let changed = false;
            let outputVal = '';
            
            varNames.forEach(v => {
                const regex = new RegExp(`^${v}\\s*=\\s*(.+)$`);
                const match = trimmed.match(regex);
                if (match) {
                    let expr = match[1];
                    varNames.forEach(name => {
                        if (state[name] !== '-') {
                            expr = expr.replace(new RegExp(`\\b${name}\\b`, 'g'), state[name]);
                        }
                    });
                    try {
                        state[v] = eval(expr);
                        changed = true;
                    } catch {
                        state[v] = '?';
                    }
                }
            });

            if (trimmed.startsWith('print(')) {
                outputVal = '→ print';
                changed = true;
            }

            if (trimmed.startsWith('for ') || trimmed.startsWith('while ')) {
                changed = true;
            }

            if (changed) {
                html += `
                    <tr>
                        <td>${step++}</td>
                        <td><code>${trimmed.substring(0, 35)}${trimmed.length > 35 ? '...' : ''}</code></td>
                        ${varNames.map(v => `<td>${Array.isArray(state[v]) ? JSON.stringify(state[v]) : state[v]}</td>`).join('')}
                        <td>${outputVal}</td>
                    </tr>
                `;
            }
        });

        html += '</tbody></table>';
        html += '<p class="trace-note"><em>Note: This is a simplified trace for visualization.</em></p>';
        
        return html;
    },

    loadLesson: (topicId) => {
        const lessons = {
            variables: {
                title: 'Variables & Data Types',
                content: `
                    <h3>📦 Variables & Data Types</h3>
                    <p>Variables store data. Python has several data types:</p>
                    <div class="lesson-code">
                        <pre><code># Strings - text
name = "Alice"

# Integers - whole numbers
age = 15

# Floats - decimal numbers
height = 1.75

# Booleans - True or False
is_student = True

# Print them all
print(f"Name: {name}, Age: {age}")
print(f"Height: {height}m")
print(f"Student: {is_student}")</code></pre>
                        <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLesson('variables')">Try it →</button>
                    </div>
                `
            },
            operators: {
                title: 'Operators',
                content: `
                    <h3>➕ Operators</h3>
                    <div class="lesson-code">
                        <pre><code># Arithmetic
print(5 + 3)   # Addition: 8
print(10 - 4)  # Subtraction: 6
print(3 * 4)   # Multiplication: 12
print(15 / 3)  # Division: 5.0
print(17 // 5) # Integer division: 3
print(17 % 5)  # Modulo (remainder): 2
print(2 ** 3)  # Power: 8

# Comparison
print(5 > 3)   # True
print(5 == 5)  # True
print(5 != 3)  # True</code></pre>
                        <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLesson('operators')">Try it →</button>
                    </div>
                `
            },
            conditionals: {
                title: 'If Statements',
                content: `
                    <h3>🔀 If Statements</h3>
                    <div class="lesson-code">
                        <pre><code>score = 75

if score >= 90:
    print("Grade A")
elif score >= 80:
    print("Grade B")
elif score >= 70:
    print("Grade C")
else:
    print("Grade D")

# Try changing the score!</code></pre>
                        <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLesson('conditionals')">Try it →</button>
                    </div>
                `
            },
            loops: {
                title: 'Loops',
                content: `
                    <h3>🔄 Loops</h3>
                    <div class="lesson-code">
                        <pre><code># FOR loop
for i in range(5):
    print(f"Count: {i}")

# WHILE loop
x = 0
while x < 3:
    print(f"x = {x}")
    x = x + 1

# Loop through list
fruits = ["apple", "banana"]
for fruit in fruits:
    print(fruit)</code></pre>
                        <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLesson('loops')">Try it →</button>
                    </div>
                `
            },
            lists: {
                title: 'Lists',
                content: `
                    <h3>📋 Lists</h3>
                    <div class="lesson-code">
                        <pre><code>numbers = [1, 2, 3, 4, 5]

print(numbers[0])    # First: 1
print(numbers[-1])   # Last: 5
print(len(numbers))  # Length: 5

numbers.append(6)    # Add item
print(numbers)

numbers.remove(3)    # Remove item
print(numbers)</code></pre>
                        <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLesson('lists')">Try it →</button>
                    </div>
                `
            },
            functions: {
                title: 'Functions',
                content: `
                    <h3>⚙️ Functions</h3>
                    <div class="lesson-code">
                        <pre><code>def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

def is_even(n):
    return n % 2 == 0

print(greet("World"))
print(add(5, 3))
print(is_even(4))</code></pre>
                        <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLesson('functions')">Try it →</button>
                    </div>
                `
            },
            strings: {
                title: 'String Methods',
                content: `
                    <h3>📝 String Methods</h3>
                    <div class="lesson-code">
                        <pre><code>text = "Hello World"

print(text.upper())     # HELLO WORLD
print(text.lower())     # hello world
print(len(text))        # 11

name = "  Alice  "
print(name.strip())     # Alice

# f-strings (formatted)
age = 15
print(f"Age: {age}")</code></pre>
                        <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLesson('strings')">Try it →</button>
                    </div>
                `
            }
        };

        const lesson = lessons[topicId];
        if (!lesson) return;

        document.getElementById('learn-content').innerHTML = lesson.content;
    },

    tryLesson: (topicId) => {
        const lessonCode = {
            variables: `# Variables & Data Types
name = "Alice"
age = 15
height = 1.75
is_student = True

print(f"Name: {name}, Age: {age}")
print(f"Height: {height}m")
print(f"Student: {is_student}")`,
            operators: `# Operators
print("Addition:", 5 + 3)
print("Subtraction:", 10 - 4)
print("Multiplication:", 3 * 4)
print("Division:", 15 / 3)
print("Integer division:", 17 // 5)
print("Modulo:", 17 % 5)
print("Power:", 2 ** 3)`,
            conditionals: `# If Statements
score = 75

if score >= 90:
    print("Grade A")
elif score >= 80:
    print("Grade B")
elif score >= 70:
    print("Grade C")
else:
    print("Grade D")`,
            loops: `# Loops
print("FOR loop:")
for i in range(5):
    print(f"Count: {i}")

print("\\nWHILE loop:")
x = 0
while x < 3:
    print(f"x = {x}")
    x = x + 1`,
            lists: `# Lists
numbers = [1, 2, 3, 4, 5]
print("List:", numbers)
print("First:", numbers[0])
print("Last:", numbers[-1])
print("Length:", len(numbers))

numbers.append(6)
print("After append:", numbers)`,
            functions: `# Functions
def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

print(greet("World"))
print(f"5 + 3 = {add(5, 3)}")`,
            strings: `# String Methods
text = "Hello World"
print("Original:", text)
print("Upper:", text.upper())
print("Lower:", text.lower())
print("Length:", len(text))`
        };

        // Switch to sandbox mode and load code
        PlaygroundView.showMode('sandbox', document.querySelector('.mode-tab'));
        document.getElementById('code-editor').value = lessonCode[topicId] || '';
        PlaygroundView.updateLineNumbers();
        PlaygroundView.runCode();
    }
};
