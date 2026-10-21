/**
 * PlaygroundView.js - Real Python Code Playground
 * Uses Pyodide for 100% authentic Python execution in the browser
 */

const PlaygroundView = {
    pyodide: null,
    pyodideReady: false,
    pyodideLoading: false,
    currentLessonSections: [],
    outputBuffer: [],
    inputQueue: [],
    waitingForInput: false,
    inputResolve: null,
    
    render: () => {
        return `
            <div class="playground-view">
                <div class="playground-header">
                    <h2>🐍 Python Playground</h2>
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
                    <div class="playground-mode active" id="sandbox-mode">
                        ${PlaygroundView.renderSandbox()}
                    </div>
                    <div class="playground-mode" id="challenges-mode">
                        ${PlaygroundView.renderChallenges()}
                    </div>
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
                            <span>Python 3.11 (Real Python via Pyodide)</span>
                            <span id="pyodide-status" class="pyodide-status loading">Loading...</span>
                        </div>
                        <div class="code-actions">
                            <select id="example-select" onchange="PlaygroundView.loadExample(this.value)">
                                <option value="">📂 Load Example...</option>
                                <optgroup label="Basics">
                                    <option value="hello">Hello World</option>
                                    <option value="variables">Variables & Types</option>
                                    <option value="arithmetic">Arithmetic</option>
                                    <option value="input">Input/Output</option>
                                </optgroup>
                                <optgroup label="Control Flow">
                                    <option value="if">If Statements</option>
                                    <option value="for">FOR Loop</option>
                                    <option value="while">WHILE Loop</option>
                                </optgroup>
                                <optgroup label="Data Structures">
                                    <option value="list">Lists</option>
                                    <option value="dictionary">Dictionaries</option>
                                </optgroup>
                                <optgroup label="Functions">
                                    <option value="function">Functions</option>
                                    <option value="recursion">Recursion</option>
                                </optgroup>
                                <optgroup label="Algorithms">
                                    <option value="factorial">Factorial</option>
                                    <option value="fizzbuzz">FizzBuzz</option>
                                    <option value="bubblesort">Bubble Sort</option>
                                    <option value="binarysearch">Binary Search</option>
                                </optgroup>
                            </select>
                            <button class="btn btn-small btn-secondary" onclick="PlaygroundView.clearCode()">
                                <i class="fas fa-trash"></i> Clear
                            </button>
                        </div>
                    </div>
                    <div class="code-editor-container">
                        <div class="line-numbers" id="line-numbers">1</div>
                        <textarea id="code-editor" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off"
                            oninput="PlaygroundView.handleInput()"
                            onkeydown="PlaygroundView.handleKeydown(event)"
                            onscroll="PlaygroundView.syncScroll()"
                            placeholder="# Write your Python code here"># Welcome to Python Playground! 🐍
# This runs REAL Python 3.11 in your browser

name = input("What is your name? ")
age = int(input("How old are you? "))

if age >= 18:
    print(f"Hello {name}, you are an adult!")
else:
    years_left = 18 - age
    print(f"Hello {name}, you'll be an adult in {years_left} years!")</textarea>
                    </div>
                    <div class="code-controls">
                        <button class="btn btn-primary btn-run" onclick="PlaygroundView.runCode()" id="run-btn">
                            <i class="fas fa-play"></i> Run Code
                        </button>
                        <button class="btn btn-secondary" onclick="PlaygroundView.stopCode()" id="stop-btn" style="display: none;">
                            <i class="fas fa-stop"></i> Stop
                        </button>
                    </div>
                </div>
                
                <div class="output-section">
                    <div class="output-header">
                        <span>📤 Output</span>
                        <button class="btn btn-small btn-ghost" onclick="PlaygroundView.clearOutput()">Clear</button>
                    </div>
                    <div class="output-display" id="output-display">
                        <span class="output-placeholder">Click "Run Code" to see output here...</span>
                    </div>
                    <div class="input-area" id="input-area" style="display: none;">
                        <input type="text" id="user-input" placeholder="Enter input..." onkeydown="if(event.key==='Enter')PlaygroundView.submitInput()">
                        <button class="btn btn-primary btn-small" onclick="PlaygroundView.submitInput()">Submit</button>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        console.log('🐍 Python Playground initialized');
        PlaygroundView.loadPyodide();
        setTimeout(() => {
            PlaygroundView.handleInput();
        }, 100);
    },
    
    // Load Pyodide WebAssembly Python
    loadPyodide: async () => {
        if (PlaygroundView.pyodideLoading || PlaygroundView.pyodideReady) return;
        
        PlaygroundView.pyodideLoading = true;
        const status = document.getElementById('pyodide-status');
        
        try {
            if (status) {
                status.textContent = 'Loading Python...';
                status.className = 'pyodide-status loading';
            }
            
            // Load Pyodide from CDN
            if (!window.loadPyodide) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
                document.head.appendChild(script);
                
                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                });
            }
            
            if (status) status.textContent = 'Initializing Python...';
            
            PlaygroundView.pyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });
            
            // Set up custom input/output
            PlaygroundView.pyodide.runPython(`
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.buffer = []
    
    def write(self, text):
        if text:
            import js
            js.PlaygroundView.addOutput(text)
    
    def flush(self):
        pass

sys.stdout = OutputCapture()
sys.stderr = OutputCapture()
            `);
            
            PlaygroundView.pyodideReady = true;
            PlaygroundView.pyodideLoading = false;
            
            if (status) {
                status.textContent = 'Python Ready ✓';
                status.className = 'pyodide-status ready';
            }
            
            console.log('✅ Pyodide Python loaded successfully');
            
        } catch (error) {
            console.error('Failed to load Pyodide:', error);
            PlaygroundView.pyodideLoading = false;
            
            if (status) {
                status.textContent = 'Failed to load Python';
                status.className = 'pyodide-status error';
            }
        }
    },
    
    // Run Python code
    runCode: async () => {
        const code = document.getElementById('code-editor')?.value || '';
        const output = document.getElementById('output-display');
        const runBtn = document.getElementById('run-btn');
        const stopBtn = document.getElementById('stop-btn');
        
        if (!code.trim()) {
            if (output) output.innerHTML = '<span class="output-info">No code to run.</span>';
            return;
        }
        
        // Clear output
        PlaygroundView.outputBuffer = [];
        if (output) output.innerHTML = '';
        
        // Show running state
        if (runBtn) runBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'inline-flex';
        
        // Check if Pyodide is ready
        if (!PlaygroundView.pyodideReady) {
            if (output) output.innerHTML = '<span class="output-info">⏳ Loading Python... Please wait.</span>';
            await PlaygroundView.loadPyodide();
            
            if (!PlaygroundView.pyodideReady) {
                if (output) output.innerHTML = '<span class="output-error">❌ Failed to load Python. Please refresh the page.</span>';
                if (runBtn) runBtn.style.display = 'inline-flex';
                if (stopBtn) stopBtn.style.display = 'none';
                return;
            }
        }
        
        try {
            // Handle input() calls
            const hasInput = code.includes('input(');
            
            if (hasInput) {
                // Wrap code to handle input
                await PlaygroundView.runWithInput(code);
            } else {
                // Run directly
                await PlaygroundView.pyodide.runPythonAsync(code);
            }
            
            // Track with learning systems
            if (typeof StreakSystem !== 'undefined') {
                StreakSystem.recordActivity('question');
            }
            
        } catch (error) {
            PlaygroundView.addOutput(`\n❌ Error: ${error.message}\n`, 'error');
        }
        
        // Restore buttons
        if (runBtn) runBtn.style.display = 'inline-flex';
        if (stopBtn) stopBtn.style.display = 'none';
        document.getElementById('input-area').style.display = 'none';
    },
    
    // Run code that contains input() calls
    runWithInput: async (code) => {
        // Replace input() with custom async function
        const modifiedCode = `
import asyncio
from js import PlaygroundView

async def __custom_input(prompt=""):
    print(prompt, end="")
    result = await PlaygroundView.getInputAsync()
    print(result)
    return result

# Replace built-in input
__builtins_input = input
def input(prompt=""):
    import asyncio
    loop = asyncio.get_event_loop()
    return loop.run_until_complete(__custom_input(prompt))
`;
        
        // For now, use a simpler approach - pre-collect inputs
        const inputMatches = code.match(/input\s*\([^)]*\)/g) || [];
        
        if (inputMatches.length > 0) {
            // Show input area
            document.getElementById('input-area').style.display = 'flex';
            
            // Collect all inputs first
            const inputs = [];
            for (let i = 0; i < inputMatches.length; i++) {
                const promptMatch = inputMatches[i].match(/input\s*\(\s*["']([^"']*)["']\s*\)/);
                const prompt = promptMatch ? promptMatch[1] : `Input ${i + 1}: `;
                
                PlaygroundView.addOutput(prompt);
                const userInput = await PlaygroundView.waitForInput();
                PlaygroundView.addOutput(userInput + '\n', 'input');
                inputs.push(userInput);
            }
            
            document.getElementById('input-area').style.display = 'none';
            
            // Create code that uses the collected inputs
            let inputIndex = 0;
            const inputValues = JSON.stringify(inputs);
            const wrappedCode = `
__inputs = ${inputValues}
__input_index = 0

def input(prompt=""):
    global __input_index
    result = __inputs[__input_index] if __input_index < len(__inputs) else ""
    __input_index += 1
    return result

${code}
`;
            
            await PlaygroundView.pyodide.runPythonAsync(wrappedCode);
        } else {
            await PlaygroundView.pyodide.runPythonAsync(code);
        }
    },
    
    // Wait for user input
    waitForInput: () => {
        return new Promise((resolve) => {
            PlaygroundView.inputResolve = resolve;
            PlaygroundView.waitingForInput = true;
            
            const inputField = document.getElementById('user-input');
            if (inputField) {
                inputField.value = '';
                inputField.focus();
            }
        });
    },
    
    // Submit user input
    submitInput: () => {
        const inputField = document.getElementById('user-input');
        const value = inputField?.value || '';
        
        if (PlaygroundView.inputResolve) {
            PlaygroundView.inputResolve(value);
            PlaygroundView.inputResolve = null;
            PlaygroundView.waitingForInput = false;
        }
        
        if (inputField) inputField.value = '';
    },
    
    // Get input asynchronously (called from Python)
    getInputAsync: () => {
        return PlaygroundView.waitForInput();
    },
    
    // Add output to display
    addOutput: (text, type = 'normal') => {
        const output = document.getElementById('output-display');
        if (!output) return;
        
        // Remove placeholder
        const placeholder = output.querySelector('.output-placeholder');
        if (placeholder) placeholder.remove();
        
        const span = document.createElement('span');
        span.className = `output-${type}`;
        span.textContent = text;
        output.appendChild(span);
        
        // Auto-scroll
        output.scrollTop = output.scrollHeight;
    },
    
    // Stop running code
    stopCode: () => {
        // Pyodide doesn't support interrupting, but we can reset state
        PlaygroundView.waitingForInput = false;
        PlaygroundView.inputResolve = null;
        
        document.getElementById('input-area').style.display = 'none';
        document.getElementById('run-btn').style.display = 'inline-flex';
        document.getElementById('stop-btn').style.display = 'none';
        
        PlaygroundView.addOutput('\n⛔ Execution stopped.\n', 'error');
    },
    
    // Clear output
    clearOutput: () => {
        const output = document.getElementById('output-display');
        if (output) {
            output.innerHTML = '<span class="output-placeholder">Click "Run Code" to see output here...</span>';
        }
    },
    
    // Clear code
    clearCode: () => {
        const editor = document.getElementById('code-editor');
        if (editor) {
            editor.value = '# Write your Python code here\n';
            PlaygroundView.handleInput();
        }
        PlaygroundView.clearOutput();
    },
    
    showMode: (mode, btn) => {
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.playground-mode').forEach(m => m.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${mode}-mode`).classList.add('active');
    },

    // Examples
    examples: {
        hello: 'print("Hello, World!")',
        variables: `# Variables and Types
name = "Alice"
age = 15
height = 1.65
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}m")
print(f"Student: {is_student}")
print(f"Type of age: {type(age)}")`,
        arithmetic: `# Arithmetic Operations
a = 17
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} // {b} = {a // b}")  # Integer division
print(f"{a} % {b} = {a % b}")    # Modulus
print(f"{a} ** {b} = {a ** b}")  # Power`,
        input: `# Input and Output
name = input("What is your name? ")
age = int(input("How old are you? "))

print(f"\\nHello, {name}!")
print(f"In 10 years, you'll be {age + 10} years old.")`,
        if: `# If Statements
score = 75

if score >= 90:
    grade = "A*"
elif score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 60:
    grade = "C"
elif score >= 50:
    grade = "D"
else:
    grade = "U"

print(f"Score: {score}")
print(f"Grade: {grade}")`,
        for: `# FOR Loops
print("Counting 1 to 5:")
for i in range(1, 6):
    print(f"  {i}")

print("\\nSquare numbers:")
for n in range(1, 6):
    print(f"  {n}² = {n ** 2}")

print("\\nIterating a list:")
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"  I like {fruit}")`,
        while: `# WHILE Loops
print("Countdown:")
count = 5
while count > 0:
    print(f"  {count}...")
    count -= 1
print("  Blast off! 🚀")

print("\\nFinding first multiple of 7 over 50:")
num = 1
while num * 7 <= 50:
    num += 1
print(f"  {num} * 7 = {num * 7}")`,
        list: `# Lists
numbers = [5, 2, 8, 1, 9]
print(f"Original: {numbers}")

# Append
numbers.append(6)
print(f"After append(6): {numbers}")

# Sort
numbers.sort()
print(f"After sort(): {numbers}")

# Length
print(f"Length: {len(numbers)}")

# Access
print(f"First: {numbers[0]}, Last: {numbers[-1]}")

# Slice
print(f"First 3: {numbers[:3]}")

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares 1-5: {squares}")`,
        dictionary: `# Dictionaries
student = {
    "name": "Alice",
    "age": 15,
    "subjects": ["Math", "Science", "English"],
    "grades": {"Math": 85, "Science": 92, "English": 78}
}

print(f"Name: {student['name']}")
print(f"Age: {student['age']}")
print(f"Subjects: {student['subjects']}")

# Access nested
print(f"Math grade: {student['grades']['Math']}")

# Add new key
student["school"] = "ABC High"
print(f"School: {student['school']}")

# Iterate
print("\\nAll grades:")
for subject, grade in student['grades'].items():
    print(f"  {subject}: {grade}")`,
        function: `# Functions
def greet(name, greeting="Hello"):
    """Return a greeting message."""
    return f"{greeting}, {name}!"

def calculate_area(length, width):
    """Calculate area of rectangle."""
    return length * width

def is_even(n):
    """Check if number is even."""
    return n % 2 == 0

# Using functions
print(greet("Alice"))
print(greet("Bob", "Hi"))

area = calculate_area(5, 3)
print(f"Area: {area}")

for i in range(1, 6):
    print(f"{i} is even: {is_even(i)}")`,
        recursion: `# Recursion
def factorial(n):
    """Calculate factorial recursively."""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    """Get nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Factorial
print("Factorials:")
for i in range(1, 8):
    print(f"  {i}! = {factorial(i)}")

# Fibonacci
print("\\nFibonacci sequence:")
fib_nums = [fibonacci(i) for i in range(10)]
print(f"  {fib_nums}")`,
        factorial: `# Factorial - Iterative and Recursive
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

n = 6
print(f"{n}! (iterative) = {factorial_iterative(n)}")
print(f"{n}! (recursive) = {factorial_recursive(n)}")`,
        fizzbuzz: `# FizzBuzz
for i in range(1, 21):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
        bubblesort: `# Bubble Sort Algorithm
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

# Test
numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"Original: {numbers}")
sorted_nums = bubble_sort(numbers.copy())
print(f"Sorted:   {sorted_nums}")`,
        binarysearch: `# Binary Search Algorithm
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        print(f"  Checking index {mid}: {arr[mid]}")
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test
numbers = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]
target = 23

print(f"Array: {numbers}")
print(f"Searching for: {target}")
print("Steps:")

index = binary_search(numbers, target)
if index != -1:
    print(f"\\nFound at index {index}")
else:
    print(f"\\nNot found")`
    },
    
    loadExample: (name) => {
        if (!name || !PlaygroundView.examples[name]) return;
        
        const editor = document.getElementById('code-editor');
        if (editor) {
            editor.value = PlaygroundView.examples[name];
            PlaygroundView.handleInput();
        }
        
        // Reset dropdown
        document.getElementById('example-select').value = '';
    },

    handleInput: () => {
        PlaygroundView.updateLineNumbers();
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
        if (lineNumbers && editor) lineNumbers.scrollTop = editor.scrollTop;
    },

    handleKeydown: (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const editor = e.target;
            const start = editor.selectionStart;
            editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(editor.selectionEnd);
            editor.selectionStart = editor.selectionEnd = start + 4;
            PlaygroundView.handleInput();
        }
        // Ctrl/Cmd + Enter to run
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            PlaygroundView.runCode();
        }
    },

    // Challenges
    renderChallenges: () => {
        const challenges = [
            { id: 1, name: 'Sum of Numbers', difficulty: 'Easy', description: 'Calculate the sum of numbers 1 to N' },
            { id: 2, name: 'Prime Checker', difficulty: 'Medium', description: 'Check if a number is prime' },
            { id: 3, name: 'Palindrome', difficulty: 'Medium', description: 'Check if a string is a palindrome' },
            { id: 4, name: 'Fibonacci', difficulty: 'Medium', description: 'Generate Fibonacci sequence' },
            { id: 5, name: 'Sorting', difficulty: 'Hard', description: 'Implement bubble sort' }
        ];
        
        return `
            <div class="challenges-container">
                <h3>🎯 Python Challenges</h3>
                <div class="challenges-grid">
                    ${challenges.map(c => `
                        <div class="challenge-card" onclick="PlaygroundView.loadChallenge(${c.id})">
                            <span class="challenge-diff ${c.difficulty.toLowerCase()}">${c.difficulty}</span>
                            <h4>${c.name}</h4>
                            <p>${c.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    loadChallenge: (id) => {
        const challenges = {
            1: `# Challenge: Sum of Numbers
# Calculate the sum of numbers from 1 to N

n = int(input("Enter N: "))

# Your code here - calculate sum of 1 to n
total = 0


print(f"Sum of 1 to {n} = {total}")`,
            2: `# Challenge: Prime Checker
# Check if a number is prime

num = int(input("Enter a number: "))

# Your code here - set is_prime to True or False
is_prime = True


if is_prime:
    print(f"{num} is prime")
else:
    print(f"{num} is not prime")`,
            3: `# Challenge: Palindrome Checker
# Check if a string is a palindrome (same forwards and backwards)

text = input("Enter text: ")

# Your code here - set is_palindrome to True or False
is_palindrome = False


if is_palindrome:
    print(f"'{text}' is a palindrome!")
else:
    print(f"'{text}' is not a palindrome")`,
            4: `# Challenge: Fibonacci Sequence
# Generate first N Fibonacci numbers

n = int(input("How many Fibonacci numbers? "))

# Your code here - create list of first n Fibonacci numbers
fib_sequence = []


print(f"First {n} Fibonacci numbers: {fib_sequence}")`,
            5: `# Challenge: Bubble Sort
# Sort a list using bubble sort algorithm

numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"Original: {numbers}")

# Your code here - sort the list using bubble sort


print(f"Sorted: {numbers}")`
        };
        
        const code = challenges[id];
        if (code) {
            const editor = document.getElementById('code-editor');
            if (editor) {
                editor.value = code;
                PlaygroundView.handleInput();
            }
            PlaygroundView.showMode('sandbox', document.querySelector('.mode-tab'));
        }
    },

    // Learn Mode
    renderLearnMode: () => {
        return `
            <div class="learn-container">
                <div class="learn-topics">
                    <h3>📖 Python Lessons</h3>
                    <div class="topic-list">
                        <button class="topic-btn" onclick="PlaygroundView.loadLesson('basics')">🔤 Basics</button>
                        <button class="topic-btn" onclick="PlaygroundView.loadLesson('variables')">📦 Variables</button>
                        <button class="topic-btn" onclick="PlaygroundView.loadLesson('conditions')">🔀 Conditions</button>
                        <button class="topic-btn" onclick="PlaygroundView.loadLesson('loops')">🔄 Loops</button>
                        <button class="topic-btn" onclick="PlaygroundView.loadLesson('functions')">⚡ Functions</button>
                        <button class="topic-btn" onclick="PlaygroundView.loadLesson('lists')">📋 Lists</button>
                    </div>
                </div>
                <div class="learn-content" id="learn-content">
                    <div class="lesson-placeholder">
                        <span>👈</span>
                        <p>Select a lesson to start learning!</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    lessons: {
        basics: {
            title: 'Python Basics',
            sections: [
                { title: 'Print Statement', content: 'Use print() to display output.', code: 'print("Hello, World!")\nprint("Python is fun!")' },
                { title: 'Comments', content: 'Comments start with # and are ignored.', code: '# This is a comment\nprint("Hello")  # Inline comment' }
            ]
        },
        variables: {
            title: 'Variables & Data Types',
            sections: [
                { title: 'Creating Variables', content: 'Variables store values. No declaration needed.', code: 'name = "Alice"\nage = 15\nheight = 1.65\nprint(name, age, height)' },
                { title: 'Data Types', content: 'Python has int, float, str, bool, list, dict.', code: 'x = 10        # int\ny = 3.14      # float\ns = "hello"   # str\nb = True      # bool\nprint(type(x), type(y), type(s), type(b))' }
            ]
        },
        conditions: {
            title: 'Conditional Statements',
            sections: [
                { title: 'If Statement', content: 'Execute code based on conditions.', code: 'age = 18\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")' },
                { title: 'Elif', content: 'Check multiple conditions.', code: 'score = 75\nif score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("C")' }
            ]
        },
        loops: {
            title: 'Loops',
            sections: [
                { title: 'For Loop', content: 'Iterate a specific number of times.', code: 'for i in range(5):\n    print(f"Count: {i}")' },
                { title: 'While Loop', content: 'Repeat while condition is true.', code: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Done!")' }
            ]
        },
        functions: {
            title: 'Functions',
            sections: [
                { title: 'Defining Functions', content: 'Functions are reusable code blocks.', code: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Alice"))' },
                { title: 'Parameters', content: 'Functions can have default parameters.', code: 'def power(base, exp=2):\n    return base ** exp\n\nprint(power(3))\nprint(power(2, 4))' }
            ]
        },
        lists: {
            title: 'Lists',
            sections: [
                { title: 'Creating Lists', content: 'Lists store multiple values.', code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits)\nprint(fruits[0])' },
                { title: 'List Methods', content: 'Lists have useful methods.', code: 'nums = [3, 1, 4]\nnums.append(5)\nnums.sort()\nprint(nums)' }
            ]
        }
    },

    loadLesson: (topicId) => {
        const lesson = PlaygroundView.lessons[topicId];
        if (!lesson) return;
        
        PlaygroundView.currentLessonSections = lesson.sections;
        
        document.getElementById('learn-content').innerHTML = `
            <div class="lesson-content">
                <h3>${lesson.title}</h3>
                ${lesson.sections.map((s, i) => `
                    <div class="lesson-section">
                        <h4>${i + 1}. ${s.title}</h4>
                        <p>${s.content}</p>
                        <div class="lesson-code">
                            <pre><code>${s.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                            <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLessonCode(${i})">▶ Try It</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    tryLessonCode: (index) => {
        if (PlaygroundView.currentLessonSections[index]) {
            PlaygroundView.tryCode(PlaygroundView.currentLessonSections[index].code);
        }
    },

    tryCode: (code) => {
        const modeTab = document.querySelector('.mode-tab');
        if (modeTab) {
            PlaygroundView.showMode('sandbox', modeTab);
        }
        const editor = document.getElementById('code-editor');
        if (editor) {
            editor.value = code;
            PlaygroundView.handleInput();
        }
        PlaygroundView.runCode();
    }
};
