/**
 * PlaygroundView.js - Python Learning Playground
 * Focused on Challenges and Learning Python for IGCSE
 */

const PlaygroundView = {
    currentLessonSections: [],
    currentChallenge: null,
    
    render: () => {
        return `
            <div class="playground-view">
                <div class="playground-header">
                    <h2>🐍 Python Playground</h2>
                    <div class="playground-mode-tabs">
                        <button class="mode-tab" onclick="PlaygroundView.showMode('sandbox', this)">
                            🎨 Sandbox
                        </button>
                        <button class="mode-tab active" onclick="PlaygroundView.showMode('challenges', this)">
                            🎯 Challenges
                        </button>
                        <button class="mode-tab" onclick="PlaygroundView.showMode('learn', this)">
                            📖 Learn Python
                        </button>
                    </div>
                </div>
                
                <div class="playground-content">
                    <div class="playground-mode" id="sandbox-mode">
                        ${PlaygroundView.renderSandbox()}
                    </div>
                    <div class="playground-mode active" id="challenges-mode">
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
                            <span>Python Code Editor</span>
                        </div>
                        <div class="code-actions">
                            <select id="example-select" onchange="PlaygroundView.loadExample(this.value)">
                                <option value="">📂 Load Example...</option>
                                <option value="hello">Hello World</option>
                                <option value="variables">Variables</option>
                                <option value="if">If Statement</option>
                                <option value="for">FOR Loop</option>
                                <option value="while">WHILE Loop</option>
                                <option value="list">Lists</option>
                                <option value="function">Functions</option>
                            </select>
                            <button class="btn btn-small btn-secondary" onclick="PlaygroundView.clearCode()">
                                <i class="fas fa-trash"></i> Clear
                            </button>
                        </div>
                    </div>
                    <div class="code-editor-container">
                        <div class="line-numbers" id="line-numbers">1</div>
                        <textarea id="code-editor" spellcheck="false"
                            oninput="PlaygroundView.updateLineNumbers()"
                            onkeydown="PlaygroundView.handleTab(event)"
                            onscroll="PlaygroundView.syncScroll()"
                            placeholder="# Write your Python code here"># Python Sandbox
# Try the Challenges or Learn sections for guided practice!

print("Hello, World!")

for i in range(1, 6):
    print(f"Count: {i}")</textarea>
                    </div>
                </div>
                
                <div class="output-section">
                    <div class="output-header">
                        <span>📤 Example Output</span>
                    </div>
                    <div class="output-display" id="output-display">
                        <pre>Hello, World!
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5</pre>
                    </div>
                    
                    <div class="sandbox-actions">
                        <p>Ready to practice? Try these:</p>
                        <button class="btn btn-primary" onclick="PlaygroundView.goToChallenges()">
                            🎯 Go to Challenges
                        </button>
                        <button class="btn btn-secondary" onclick="PlaygroundView.goToLearn()">
                            📖 Learn Python
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        console.log('🐍 Python Playground initialized');
        setTimeout(() => PlaygroundView.updateLineNumbers(), 100);
    },

    cleanup: () => {
        // Reset current states
        PlaygroundView.currentLessonSections = [];
        PlaygroundView.currentChallenge = null;
        console.log('🐍 Python Playground cleanup');
    },
    
    showMode: (mode, btn) => {
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.playground-mode').forEach(m => m.classList.remove('active'));
        if (btn) btn.classList.add('active');
        document.getElementById(`${mode}-mode`).classList.add('active');
        
        // Update tab button active state when called programmatically
        if (!btn) {
            const tabs = document.querySelectorAll('.mode-tab');
            tabs.forEach(tab => {
                if (tab.textContent.toLowerCase().includes(mode)) {
                    tab.classList.add('active');
                }
            });
        }
    },
    
    goToChallenges: () => {
        const challengesTab = document.querySelector('.mode-tab:nth-child(2)');
        PlaygroundView.showMode('challenges', challengesTab);
    },
    
    goToLearn: () => {
        const learnTab = document.querySelector('.mode-tab:nth-child(3)');
        PlaygroundView.showMode('learn', learnTab);
    },

    // ==========================================
    // CHALLENGES SECTION
    // ==========================================
    
    challenges: [
        {
            id: 1,
            title: 'Hello World',
            difficulty: 'Easy',
            category: 'Basics',
            description: 'Write a program that prints "Hello, World!" to the screen.',
            hint: 'Use the print() function with the text in quotes.',
            starterCode: '# Print "Hello, World!" below\n',
            solution: 'print("Hello, World!")',
            expectedOutput: 'Hello, World!',
            xp: 10
        },
        {
            id: 2,
            title: 'Sum Two Numbers',
            difficulty: 'Easy',
            category: 'Basics',
            description: 'Create two variables a=5 and b=3, then print their sum.',
            hint: 'Add the variables using + and print the result.',
            starterCode: '# Create variables a and b, then print their sum\na = 5\nb = 3\n# Print the sum below\n',
            solution: 'a = 5\nb = 3\nprint(a + b)',
            expectedOutput: '8',
            xp: 15
        },
        {
            id: 3,
            title: 'Even or Odd',
            difficulty: 'Easy',
            category: 'Conditions',
            description: 'Check if the number 7 is even or odd. Print "Even" or "Odd".',
            hint: 'Use the modulus operator (%) to check if divisible by 2.',
            starterCode: 'number = 7\n\n# Check if even or odd and print the result\n',
            solution: 'number = 7\nif number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
            expectedOutput: 'Odd',
            xp: 20
        },
        {
            id: 4,
            title: 'Count to 5',
            difficulty: 'Easy',
            category: 'Loops',
            description: 'Use a FOR loop to print numbers 1 to 5, each on a new line.',
            hint: 'Use range(1, 6) to get numbers 1 through 5.',
            starterCode: '# Use a for loop to print 1 to 5\n',
            solution: 'for i in range(1, 5):\n    print(i)',
            expectedOutput: '1\n2\n3\n4\n5',
            xp: 20
        },
        {
            id: 5,
            title: 'Sum 1 to 10',
            difficulty: 'Medium',
            category: 'Loops',
            description: 'Calculate and print the sum of numbers from 1 to 10.',
            hint: 'Use a loop and a variable to accumulate the total.',
            starterCode: '# Calculate sum of 1 to 10\ntotal = 0\n\n# Add your loop here\n\nprint(total)',
            solution: 'total = 0\nfor i in range(1, 11):\n    total += i\nprint(total)',
            expectedOutput: '55',
            xp: 25
        },
        {
            id: 6,
            title: 'Multiplication Table',
            difficulty: 'Medium',
            category: 'Loops',
            description: 'Print the 5 times table from 5x1 to 5x5.',
            hint: 'Use a for loop and f-strings for formatting.',
            starterCode: '# Print 5 times table (5x1 to 5x5)\n',
            solution: 'for i in range(1, 6):\n    print(f"5 x {i} = {5 * i}")',
            expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25',
            xp: 30
        },
        {
            id: 7,
            title: 'Find Maximum',
            difficulty: 'Medium',
            category: 'Lists',
            description: 'Find and print the largest number in the list [4, 2, 9, 1, 7].',
            hint: 'You can use max() or loop through comparing values.',
            starterCode: 'numbers = [4, 2, 9, 1, 7]\n\n# Find and print the maximum\n',
            solution: 'numbers = [4, 2, 9, 1, 7]\nprint(max(numbers))',
            expectedOutput: '9',
            xp: 25
        },
        {
            id: 8,
            title: 'List Sum',
            difficulty: 'Medium',
            category: 'Lists',
            description: 'Calculate and print the sum of all numbers in [10, 20, 30, 40].',
            hint: 'You can use sum() or loop through adding values.',
            starterCode: 'numbers = [10, 20, 30, 40]\n\n# Calculate and print the sum\n',
            solution: 'numbers = [10, 20, 30, 40]\nprint(sum(numbers))',
            expectedOutput: '100',
            xp: 25
        },
        {
            id: 9,
            title: 'Reverse String',
            difficulty: 'Medium',
            category: 'Strings',
            description: 'Reverse the string "Python" and print it.',
            hint: 'Use string slicing with [::-1].',
            starterCode: 'text = "Python"\n\n# Reverse and print\n',
            solution: 'text = "Python"\nprint(text[::-1])',
            expectedOutput: 'nohtyP',
            xp: 30
        },
        {
            id: 10,
            title: 'Count Vowels',
            difficulty: 'Medium',
            category: 'Strings',
            description: 'Count how many vowels are in "Hello World" and print the count.',
            hint: 'Loop through each character and check if it\'s a vowel.',
            starterCode: 'text = "Hello World"\nvowels = "aeiouAEIOU"\ncount = 0\n\n# Count vowels\n\nprint(count)',
            solution: 'text = "Hello World"\nvowels = "aeiouAEIOU"\ncount = 0\nfor char in text:\n    if char in vowels:\n        count += 1\nprint(count)',
            expectedOutput: '3',
            xp: 35
        },
        {
            id: 11,
            title: 'FizzBuzz (1-15)',
            difficulty: 'Hard',
            category: 'Conditions',
            description: 'Print numbers 1-15, but print "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both.',
            hint: 'Check divisibility by 15 first (both 3 and 5), then 3, then 5.',
            starterCode: '# FizzBuzz from 1 to 15\n',
            solution: 'for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
            expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
            xp: 50
        },
        {
            id: 12,
            title: 'Factorial',
            difficulty: 'Hard',
            category: 'Functions',
            description: 'Write a function factorial(n) that returns n! Print factorial(5).',
            hint: 'Multiply from 1 to n, or use recursion.',
            starterCode: '# Define factorial function\ndef factorial(n):\n    # Your code here\n    pass\n\n# Print factorial of 5\nprint(factorial(5))',
            solution: 'def factorial(n):\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))',
            expectedOutput: '120',
            xp: 45
        },
        {
            id: 13,
            title: 'Prime Checker',
            difficulty: 'Hard',
            category: 'Functions',
            description: 'Write a function is_prime(n) that returns True if n is prime. Test with 17.',
            hint: 'A prime has no divisors other than 1 and itself.',
            starterCode: '# Define is_prime function\ndef is_prime(n):\n    # Your code here\n    pass\n\n# Test with 17\nprint(is_prime(17))',
            solution: 'def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(17))',
            expectedOutput: 'True',
            xp: 50
        },
        {
            id: 14,
            title: 'Bubble Sort',
            difficulty: 'Hard',
            category: 'Algorithms',
            description: 'Sort the list [64, 34, 25, 12, 22] using bubble sort algorithm. Print the sorted list.',
            hint: 'Compare adjacent elements and swap if in wrong order. Repeat until sorted.',
            starterCode: 'numbers = [64, 34, 25, 12, 22]\n\n# Implement bubble sort\n\nprint(numbers)',
            solution: 'numbers = [64, 34, 25, 12, 22]\nn = len(numbers)\nfor i in range(n):\n    for j in range(0, n-i-1):\n        if numbers[j] > numbers[j+1]:\n            numbers[j], numbers[j+1] = numbers[j+1], numbers[j]\nprint(numbers)',
            expectedOutput: '[12, 22, 25, 34, 64]',
            xp: 60
        },
        {
            id: 15,
            title: 'Linear Search',
            difficulty: 'Hard',
            category: 'Algorithms',
            description: 'Find the index of value 7 in [3, 1, 7, 9, 2] using linear search. Print the index.',
            hint: 'Loop through and return index when found.',
            starterCode: 'numbers = [3, 1, 7, 9, 2]\ntarget = 7\n\n# Find index of target\nindex = -1\n\nprint(index)',
            solution: 'numbers = [3, 1, 7, 9, 2]\ntarget = 7\nindex = -1\nfor i in range(len(numbers)):\n    if numbers[i] == target:\n        index = i\n        break\nprint(index)',
            expectedOutput: '2',
            xp: 45
        }
    ],
    
    renderChallenges: () => {
        const completed = PlaygroundView.getCompletedChallenges();
        const categories = [...new Set(PlaygroundView.challenges.map(c => c.category))];
        
        return `
            <div class="challenges-container">
                <div class="challenges-header">
                    <h3>🎯 Python Coding Challenges</h3>
                    <p>Complete challenges to earn XP and master Python!</p>
                    <div class="challenges-progress">
                        <span class="progress-text">${completed.length}/${PlaygroundView.challenges.length} Completed</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(completed.length / PlaygroundView.challenges.length) * 100}%"></div>
                        </div>
                    </div>
                </div>
                
                ${categories.map(cat => `
                    <div class="challenge-category">
                        <h4>${cat}</h4>
                        <div class="challenges-grid">
                            ${PlaygroundView.challenges.filter(c => c.category === cat).map(challenge => {
                                const isCompleted = completed.includes(challenge.id);
                                return `
                                    <div class="challenge-card ${isCompleted ? 'completed' : ''}" onclick="PlaygroundView.openChallenge(${challenge.id})">
                                        <div class="challenge-card-header">
                                            <span class="challenge-diff ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
                                            ${isCompleted ? '<span class="challenge-check">✓</span>' : ''}
                                        </div>
                                        <h5>${challenge.title}</h5>
                                        <p>${challenge.description.substring(0, 60)}...</p>
                                        <div class="challenge-xp">+${challenge.xp} XP</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    openChallenge: (id) => {
        const challenge = PlaygroundView.challenges.find(c => c.id === id);
        if (!challenge) return;
        
        PlaygroundView.currentChallenge = challenge;
        
        const container = document.getElementById('challenges-mode');
        container.innerHTML = `
            <div class="challenge-detail">
                <div class="challenge-detail-header">
                    <button class="btn btn-ghost" onclick="PlaygroundView.backToChallenges()">
                        ← Back to Challenges
                    </button>
                    <span class="challenge-diff ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
                </div>
                
                <div class="challenge-info">
                    <h3>${challenge.title}</h3>
                    <p class="challenge-description">${challenge.description}</p>
                    <div class="challenge-reward">🏆 Reward: +${challenge.xp} XP</div>
                </div>
                
                <div class="challenge-workspace">
                    <div class="challenge-editor-section">
                        <div class="section-header">
                            <span>📝 Your Code</span>
                            <button class="btn btn-small btn-ghost" onclick="PlaygroundView.showHint()">💡 Hint</button>
                        </div>
                        <textarea id="challenge-code" class="challenge-editor" spellcheck="false">${challenge.starterCode}</textarea>
                    </div>
                    
                    <div class="challenge-output-section">
                        <div class="section-header">
                            <span>📤 Expected Output</span>
                        </div>
                        <pre class="expected-output">${challenge.expectedOutput}</pre>
                        
                        <div class="section-header">
                            <span>🔍 Your Output</span>
                        </div>
                        <pre class="your-output" id="challenge-output">Run your code to see output...</pre>
                    </div>
                </div>
                
                <div class="challenge-actions">
                    <button class="btn btn-secondary" onclick="PlaygroundView.resetChallenge()">
                        🔄 Reset
                    </button>
                    <button class="btn btn-primary btn-large" onclick="PlaygroundView.runChallenge()">
                        ▶️ Run & Check
                    </button>
                    <button class="btn btn-ghost" onclick="PlaygroundView.showSolution()">
                        👁️ Show Solution
                    </button>
                </div>
            </div>
        `;
    },
    
    backToChallenges: () => {
        PlaygroundView.currentChallenge = null;
        document.getElementById('challenges-mode').innerHTML = PlaygroundView.renderChallenges();
    },
    
    showHint: () => {
        if (PlaygroundView.currentChallenge) {
            Toast.show('💡 ' + PlaygroundView.currentChallenge.hint, 'info');
        }
    },
    
    showSolution: () => {
        if (PlaygroundView.currentChallenge) {
            const editor = document.getElementById('challenge-code');
            if (editor) {
                editor.value = PlaygroundView.currentChallenge.solution;
            }
            Toast.show('Solution loaded! Try to understand it before moving on.', 'info');
        }
    },
    
    resetChallenge: () => {
        if (PlaygroundView.currentChallenge) {
            document.getElementById('challenge-code').value = PlaygroundView.currentChallenge.starterCode;
            document.getElementById('challenge-output').textContent = 'Run your code to see output...';
        }
    },
    
    runChallenge: () => {
        const challenge = PlaygroundView.currentChallenge;
        if (!challenge) return;
        
        const code = document.getElementById('challenge-code').value;
        const outputEl = document.getElementById('challenge-output');
        
        try {
            // Simple Python interpreter for checking output
            const output = PlaygroundView.executePython(code);
            outputEl.textContent = output;
            outputEl.className = 'your-output';
            
            // Check if correct
            const expectedNormalized = challenge.expectedOutput.trim();
            const outputNormalized = output.trim();
            
            if (outputNormalized === expectedNormalized) {
                outputEl.className = 'your-output correct';
                PlaygroundView.completeChallenge(challenge.id, challenge.xp);
            } else {
                outputEl.className = 'your-output incorrect';
                Toast.show('Not quite right. Check your output!', 'warning');
            }
        } catch (error) {
            outputEl.textContent = 'Error: ' + error.message;
            outputEl.className = 'your-output error';
        }
    },
    
    completeChallenge: (id, xp) => {
        const completed = PlaygroundView.getCompletedChallenges();
        if (!completed.includes(id)) {
            completed.push(id);
            localStorage.setItem('csmaster_completed_challenges', JSON.stringify(completed));
            
            // Award XP
            if (typeof AppState !== 'undefined') {
                const user = AppState.getState('user') || {};
                user.xp = (user.xp || 0) + xp;
                AppState.setState('user', user);
            }
            
            // Track with streak
            if (typeof StreakSystem !== 'undefined') {
                StreakSystem.recordActivity('question');
                StreakSystem.recordActivity('correct');
            }
            
            Toast.show(`🎉 Challenge Complete! +${xp} XP`, 'success');
            
            // Play sound
            if (typeof SoundFX !== 'undefined') {
                SoundFX.play('success');
            }
        } else {
            Toast.show('✓ Correct! (Already completed)', 'success');
        }
    },
    
    getCompletedChallenges: () => {
        try {
            return JSON.parse(localStorage.getItem('csmaster_completed_challenges') || '[]');
        } catch (e) {
            return [];
        }
    },

    // ==========================================
    // LEARN PYTHON SECTION
    // ==========================================
    
    lessons: {
        basics: {
            title: '🔤 Python Basics',
            sections: [
                {
                    title: 'Print Statement',
                    content: 'The <code>print()</code> function displays output to the screen. Put text in quotes.',
                    code: 'print("Hello, World!")\nprint("Python is fun!")\nprint(123)',
                    output: 'Hello, World!\nPython is fun!\n123'
                },
                {
                    title: 'Comments',
                    content: 'Comments start with <code>#</code> and are ignored by Python. Use them to explain your code.',
                    code: '# This is a comment\nprint("Hello")  # This prints hello\n\n# Comments help others understand your code',
                    output: 'Hello'
                },
                {
                    title: 'Basic Math',
                    content: 'Python can do math! Use +, -, *, /, // (integer division), % (remainder), ** (power).',
                    code: 'print(5 + 3)   # Addition\nprint(10 - 4)  # Subtraction\nprint(6 * 7)   # Multiplication\nprint(15 / 2)  # Division\nprint(15 // 2) # Integer division\nprint(15 % 2)  # Remainder\nprint(2 ** 3)  # Power (2³)',
                    output: '8\n6\n42\n7.5\n7\n1\n8'
                }
            ]
        },
        variables: {
            title: '📦 Variables & Data Types',
            sections: [
                {
                    title: 'Creating Variables',
                    content: 'Variables store data. Use <code>=</code> to assign values. No need to declare types!',
                    code: 'name = "Alice"    # String (text)\nage = 15          # Integer (whole number)\nheight = 1.65     # Float (decimal)\nis_student = True # Boolean (True/False)\n\nprint(name)\nprint(age)',
                    output: 'Alice\n15'
                },
                {
                    title: 'Data Types',
                    content: 'Python has several data types: <code>str</code> (text), <code>int</code> (integers), <code>float</code> (decimals), <code>bool</code> (True/False).',
                    code: 'x = 10\ny = 3.14\nname = "Bob"\nactive = True\n\nprint(type(x))     # <class \'int\'>\nprint(type(y))     # <class \'float\'>\nprint(type(name))  # <class \'str\'>\nprint(type(active))# <class \'bool\'>',
                    output: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>"
                },
                {
                    title: 'F-Strings (Formatted Strings)',
                    content: 'F-strings let you embed variables in text. Put <code>f</code> before the string and use <code>{variable}</code>.',
                    code: 'name = "Alice"\nage = 15\nscore = 92.5\n\nprint(f"Name: {name}")\nprint(f"{name} is {age} years old")\nprint(f"Score: {score}%")',
                    output: 'Name: Alice\nAlice is 15 years old\nScore: 92.5%'
                }
            ]
        },
        conditions: {
            title: '🔀 Conditional Statements',
            sections: [
                {
                    title: 'If Statement',
                    content: 'Use <code>if</code> to run code only when a condition is true. Remember the colon and indentation!',
                    code: 'age = 18\n\nif age >= 18:\n    print("You are an adult")\n    print("You can vote!")',
                    output: 'You are an adult\nYou can vote!'
                },
                {
                    title: 'If-Else',
                    content: 'Use <code>else</code> to run different code when the condition is false.',
                    code: 'temperature = 15\n\nif temperature > 20:\n    print("It\'s warm!")\nelse:\n    print("It\'s cold!")',
                    output: "It's cold!"
                },
                {
                    title: 'If-Elif-Else',
                    content: 'Use <code>elif</code> (else if) to check multiple conditions.',
                    code: 'score = 75\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelif score >= 60:\n    grade = "D"\nelse:\n    grade = "F"\n\nprint(f"Grade: {grade}")',
                    output: 'Grade: C'
                },
                {
                    title: 'Comparison Operators',
                    content: 'Compare values with: <code>==</code> (equal), <code>!=</code> (not equal), <code><</code>, <code>></code>, <code><=</code>, <code>>=</code>',
                    code: 'a = 5\nb = 10\n\nprint(a == b)   # False - equal?\nprint(a != b)   # True - not equal?\nprint(a < b)    # True - less than?\nprint(a > b)    # False - greater than?\nprint(a <= 5)   # True - less or equal?',
                    output: 'False\nTrue\nTrue\nFalse\nTrue'
                }
            ]
        },
        loops: {
            title: '🔄 Loops',
            sections: [
                {
                    title: 'FOR Loop with range()',
                    content: '<code>for</code> loops repeat code a specific number of times. <code>range(5)</code> gives 0,1,2,3,4.',
                    code: '# Count 0 to 4\nfor i in range(5):\n    print(i)\n\n# Count 1 to 5\nprint("---")\nfor i in range(1, 6):\n    print(i)',
                    output: '0\n1\n2\n3\n4\n---\n1\n2\n3\n4\n5'
                },
                {
                    title: 'FOR Loop with Lists',
                    content: 'Loop through items in a list directly.',
                    code: 'fruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n    print(f"I like {fruit}")',
                    output: 'I like apple\nI like banana\nI like cherry'
                },
                {
                    title: 'WHILE Loop',
                    content: '<code>while</code> loops repeat while a condition is true. Be careful of infinite loops!',
                    code: 'count = 5\n\nwhile count > 0:\n    print(count)\n    count = count - 1\n\nprint("Blast off!")',
                    output: '5\n4\n3\n2\n1\nBlast off!'
                },
                {
                    title: 'Loop with Accumulator',
                    content: 'Use a variable to accumulate (build up) a total.',
                    code: '# Sum of 1 to 5\ntotal = 0\n\nfor i in range(1, 6):\n    total = total + i\n    print(f"Added {i}, total is {total}")\n\nprint(f"Final total: {total}")',
                    output: 'Added 1, total is 1\nAdded 2, total is 3\nAdded 3, total is 6\nAdded 4, total is 10\nAdded 5, total is 15\nFinal total: 15'
                }
            ]
        },
        lists: {
            title: '📋 Lists',
            sections: [
                {
                    title: 'Creating Lists',
                    content: 'Lists store multiple items in order. Use square brackets <code>[]</code>.',
                    code: 'numbers = [1, 2, 3, 4, 5]\nnames = ["Alice", "Bob", "Charlie"]\nmixed = [1, "hello", True, 3.14]\n\nprint(numbers)\nprint(names)',
                    output: '[1, 2, 3, 4, 5]\n[\'Alice\', \'Bob\', \'Charlie\']'
                },
                {
                    title: 'Accessing Items',
                    content: 'Access items by index (position). Python starts counting at 0! Use negative indices from the end.',
                    code: 'fruits = ["apple", "banana", "cherry", "date"]\n\nprint(fruits[0])   # First item\nprint(fruits[2])   # Third item\nprint(fruits[-1])  # Last item\nprint(fruits[-2])  # Second to last',
                    output: 'apple\ncherry\ndate\ncherry'
                },
                {
                    title: 'List Methods',
                    content: 'Lists have useful methods: <code>append()</code>, <code>remove()</code>, <code>sort()</code>, <code>len()</code>.',
                    code: 'nums = [3, 1, 4]\nprint(f"Original: {nums}")\n\nnums.append(5)      # Add to end\nprint(f"After append: {nums}")\n\nnums.sort()         # Sort in order\nprint(f"After sort: {nums}")\n\nprint(f"Length: {len(nums)}")',
                    output: 'Original: [3, 1, 4]\nAfter append: [3, 1, 4, 5]\nAfter sort: [1, 3, 4, 5]\nLength: 4'
                },
                {
                    title: 'List Slicing',
                    content: 'Get a portion of a list with <code>[start:end]</code>. End index is not included.',
                    code: 'letters = ["a", "b", "c", "d", "e"]\n\nprint(letters[1:4])   # Index 1,2,3\nprint(letters[:3])    # First 3\nprint(letters[2:])    # From index 2\nprint(letters[::2])   # Every 2nd item',
                    output: "[\'b\', \'c\', \'d\']\n[\'a\', \'b\', \'c\']\n[\'c\', \'d\', \'e\']\n[\'a\', \'c\', \'e\']"
                }
            ]
        },
        functions: {
            title: '⚡ Functions',
            sections: [
                {
                    title: 'Defining Functions',
                    content: 'Functions are reusable blocks of code. Define with <code>def</code>, call by name.',
                    code: 'def greet():\n    print("Hello!")\n    print("Welcome to Python!")\n\n# Call the function\ngreet()\ngreet()  # Can call multiple times',
                    output: 'Hello!\nWelcome to Python!\nHello!\nWelcome to Python!'
                },
                {
                    title: 'Functions with Parameters',
                    content: 'Parameters let you pass data into functions.',
                    code: 'def greet(name):\n    print(f"Hello, {name}!")\n\ndef add(a, b):\n    print(f"{a} + {b} = {a + b}")\n\ngreet("Alice")\ngreet("Bob")\nadd(5, 3)',
                    output: 'Hello, Alice!\nHello, Bob!\n5 + 3 = 8'
                },
                {
                    title: 'Return Values',
                    content: 'Use <code>return</code> to send a value back from a function.',
                    code: 'def square(n):\n    return n * n\n\ndef add(a, b):\n    return a + b\n\nresult = square(5)\nprint(f"5 squared is {result}")\n\nsum_result = add(10, 20)\nprint(f"10 + 20 = {sum_result}")',
                    output: '5 squared is 25\n10 + 20 = 30'
                },
                {
                    title: 'Default Parameters',
                    content: 'Give parameters default values that are used if no argument is provided.',
                    code: 'def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\n\ngreet("Alice")           # Uses default\ngreet("Bob", "Hi")       # Custom greeting\ngreet("Charlie", "Hey")',
                    output: 'Hello, Alice!\nHi, Bob!\nHey, Charlie!'
                }
            ]
        },
        strings: {
            title: '📝 Strings',
            sections: [
                {
                    title: 'String Basics',
                    content: 'Strings are text enclosed in quotes (single or double).',
                    code: 'single = \'Hello\'\ndouble = "World"\nmulti = """This is\na multi-line\nstring"""\n\nprint(single)\nprint(double)\nprint(multi)',
                    output: 'Hello\nWorld\nThis is\na multi-line\nstring'
                },
                {
                    title: 'String Methods',
                    content: 'Strings have useful methods: <code>upper()</code>, <code>lower()</code>, <code>strip()</code>, <code>replace()</code>.',
                    code: 'text = "  Hello World  "\n\nprint(text.upper())        # UPPERCASE\nprint(text.lower())        # lowercase\nprint(text.strip())        # Remove whitespace\nprint(text.replace("World", "Python"))',
                    output: '  HELLO WORLD  \n  hello world  \nHello World\n  Hello Python  '
                },
                {
                    title: 'String Indexing',
                    content: 'Access individual characters by index. Strings are like lists of characters.',
                    code: 'word = "Python"\n\nprint(word[0])    # First character\nprint(word[-1])   # Last character\nprint(word[0:3])  # First 3 chars\nprint(len(word))  # Length',
                    output: 'P\nn\nPyt\n6'
                }
            ]
        }
    },

    renderLearnMode: () => {
        return `
            <div class="learn-container">
                <div class="learn-sidebar">
                    <h3>📖 Python Lessons</h3>
                    <div class="lesson-nav">
                        ${Object.entries(PlaygroundView.lessons).map(([id, lesson]) => `
                            <button class="lesson-nav-btn" onclick="PlaygroundView.loadLesson('${id}')">
                                ${lesson.title}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="learn-content" id="learn-content">
                    <div class="lesson-welcome">
                        <h2>👋 Welcome to Python Learning!</h2>
                        <p>Choose a topic from the left to start learning Python.</p>
                        <div class="lesson-topics-preview">
                            ${Object.entries(PlaygroundView.lessons).map(([id, lesson]) => `
                                <div class="topic-preview-card" onclick="PlaygroundView.loadLesson('${id}')">
                                    <h4>${lesson.title}</h4>
                                    <p>${lesson.sections.length} sections</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    loadLesson: (topicId) => {
        const lesson = PlaygroundView.lessons[topicId];
        if (!lesson) return;
        
        PlaygroundView.currentLessonSections = lesson.sections;
        
        // Update active state in nav
        document.querySelectorAll('.lesson-nav-btn').forEach(btn => btn.classList.remove('active'));
        event?.target?.classList.add('active');
        
        document.getElementById('learn-content').innerHTML = `
            <div class="lesson-content">
                <h2>${lesson.title}</h2>
                
                ${lesson.sections.map((section, i) => `
                    <div class="lesson-section">
                        <h3>${i + 1}. ${section.title}</h3>
                        <p class="section-explanation">${section.content}</p>
                        
                        <div class="code-example">
                            <div class="code-example-header">
                                <span>📝 Code</span>
                                <button class="btn btn-small btn-ghost" onclick="PlaygroundView.copyCode(${i})">
                                    📋 Copy
                                </button>
                            </div>
                            <pre class="code-block"><code>${PlaygroundView.escapeHtml(section.code)}</code></pre>
                        </div>
                        
                        <div class="output-example">
                            <div class="output-example-header">
                                <span>📤 Output</span>
                            </div>
                            <pre class="output-block">${PlaygroundView.escapeHtml(section.output)}</pre>
                        </div>
                    </div>
                `).join('')}
                
                <div class="lesson-complete">
                    <p>🎉 You've completed this lesson!</p>
                    <button class="btn btn-primary" onclick="PlaygroundView.showMode('challenges', document.querySelector('.mode-tab:nth-child(2)'))">
                        Try Some Challenges →
                    </button>
                </div>
            </div>
        `;
    },
    
    copyCode: (sectionIndex) => {
        const section = PlaygroundView.currentLessonSections[sectionIndex];
        if (section) {
            navigator.clipboard.writeText(section.code).then(() => {
                Toast.show('Code copied!', 'success');
            });
        }
    },
    
    escapeHtml: (text) => {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    // ==========================================
    // SIMPLE PYTHON EXECUTOR
    // ==========================================
    
    executePython: (code) => {
        const output = [];
        const vars = {};
        const funcs = {};
        
        const lines = code.split('\n');
        
        const evaluate = (expr, localVars = {}) => {
            expr = expr.trim();
            if (!expr) return undefined;
            
            // String literals
            if ((expr.startsWith('"') && expr.endsWith('"')) || 
                (expr.startsWith("'") && expr.endsWith("'"))) {
                return expr.slice(1, -1);
            }
            
            // F-string
            if (expr.startsWith('f"') || expr.startsWith("f'")) {
                const str = expr.slice(2, -1);
                return str.replace(/\{([^}]+)\}/g, (_, e) => {
                    const val = evaluate(e.trim(), localVars);
                    if (Array.isArray(val)) return '[' + val.join(', ') + ']';
                    return String(val);
                });
            }
            
            // List literal
            if (expr.startsWith('[') && expr.endsWith(']')) {
                const inner = expr.slice(1, -1).trim();
                if (!inner) return [];
                const items = PlaygroundView.splitByComma(inner);
                return items.map(item => evaluate(item.trim(), localVars));
            }
            
            // Boolean/None
            if (expr === 'True') return true;
            if (expr === 'False') return false;
            if (expr === 'None') return null;
            
            // Numbers
            if (/^-?\d+$/.test(expr)) return parseInt(expr);
            if (/^-?\d+\.\d+$/.test(expr)) return parseFloat(expr);
            
            // Variable lookup
            const allVars = { ...vars, ...localVars };
            if (allVars.hasOwnProperty(expr)) return allVars[expr];
            
            // len()
            if (expr.startsWith('len(') && expr.endsWith(')')) {
                const arg = evaluate(expr.slice(4, -1), localVars);
                return arg?.length || 0;
            }
            
            // max(), min(), sum()
            if (expr.startsWith('max(') && expr.endsWith(')')) {
                const arg = evaluate(expr.slice(4, -1), localVars);
                return Array.isArray(arg) ? Math.max(...arg) : arg;
            }
            if (expr.startsWith('min(') && expr.endsWith(')')) {
                const arg = evaluate(expr.slice(4, -1), localVars);
                return Array.isArray(arg) ? Math.min(...arg) : arg;
            }
            if (expr.startsWith('sum(') && expr.endsWith(')')) {
                const arg = evaluate(expr.slice(4, -1), localVars);
                return Array.isArray(arg) ? arg.reduce((a, b) => a + b, 0) : arg;
            }
            
            // type()
            if (expr.startsWith('type(') && expr.endsWith(')')) {
                const arg = evaluate(expr.slice(5, -1), localVars);
                if (typeof arg === 'number' && Number.isInteger(arg)) return "<class 'int'>";
                if (typeof arg === 'number') return "<class 'float'>";
                if (typeof arg === 'string') return "<class 'str'>";
                if (typeof arg === 'boolean') return "<class 'bool'>";
                if (Array.isArray(arg)) return "<class 'list'>";
                return "<class 'NoneType'>";
            }
            
            // int(), str(), float()
            if (expr.startsWith('int(') && expr.endsWith(')')) {
                return parseInt(evaluate(expr.slice(4, -1), localVars)) || 0;
            }
            if (expr.startsWith('str(') && expr.endsWith(')')) {
                const val = evaluate(expr.slice(4, -1), localVars);
                if (Array.isArray(val)) return '[' + val.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ') + ']';
                return String(val);
            }
            if (expr.startsWith('float(') && expr.endsWith(')')) {
                return parseFloat(evaluate(expr.slice(6, -1), localVars)) || 0;
            }
            
            // range()
            if (expr.startsWith('range(') && expr.endsWith(')')) {
                const args = expr.slice(6, -1).split(',').map(a => evaluate(a.trim(), localVars));
                const start = args.length > 1 ? args[0] : 0;
                const end = args.length > 1 ? args[1] : args[0];
                const step = args[2] || 1;
                const result = [];
                for (let i = start; step > 0 ? i < end : i > end; i += step) result.push(i);
                return result;
            }
            
            // List indexing: list[i]
            const indexMatch = expr.match(/^(\w+)\[(.+)\]$/);
            if (indexMatch) {
                const arr = evaluate(indexMatch[1], localVars);
                const idx = evaluate(indexMatch[2], localVars);
                if (Array.isArray(arr) || typeof arr === 'string') {
                    return idx < 0 ? arr[arr.length + idx] : arr[idx];
                }
            }
            
            // Slicing: list[a:b]
            const sliceMatch = expr.match(/^(\w+)\[([^:]*):([^:]*)\]$/);
            if (sliceMatch) {
                const arr = evaluate(sliceMatch[1], localVars);
                const start = sliceMatch[2] ? evaluate(sliceMatch[2], localVars) : 0;
                const end = sliceMatch[3] ? evaluate(sliceMatch[3], localVars) : arr?.length;
                if (Array.isArray(arr) || typeof arr === 'string') {
                    return arr.slice(start, end);
                }
            }
            
            // String methods
            if (expr.includes('.upper()')) {
                const base = evaluate(expr.replace('.upper()', ''), localVars);
                return String(base).toUpperCase();
            }
            if (expr.includes('.lower()')) {
                const base = evaluate(expr.replace('.lower()', ''), localVars);
                return String(base).toLowerCase();
            }
            if (expr.includes('.strip()')) {
                const base = evaluate(expr.replace('.strip()', ''), localVars);
                return String(base).trim();
            }
            
            // Arithmetic with proper operator precedence
            // Power
            if (expr.includes('**')) {
                const parts = expr.split('**');
                if (parts.length === 2) {
                    return Math.pow(evaluate(parts[0], localVars), evaluate(parts[1], localVars));
                }
            }
            // Integer division
            if (expr.includes('//')) {
                const parts = expr.split('//');
                if (parts.length === 2) {
                    return Math.floor(evaluate(parts[0], localVars) / evaluate(parts[1], localVars));
                }
            }
            // Modulus
            if (expr.includes('%') && !expr.includes('"%')) {
                const parts = expr.split('%');
                if (parts.length === 2) {
                    return evaluate(parts[0], localVars) % evaluate(parts[1], localVars);
                }
            }
            // Multiplication and division
            if (expr.includes('*') && !expr.includes('**')) {
                const idx = expr.lastIndexOf('*');
                return evaluate(expr.slice(0, idx), localVars) * evaluate(expr.slice(idx + 1), localVars);
            }
            if (expr.includes('/') && !expr.includes('//')) {
                const idx = expr.lastIndexOf('/');
                return evaluate(expr.slice(0, idx), localVars) / evaluate(expr.slice(idx + 1), localVars);
            }
            // Addition and subtraction (handle from right to respect precedence)
            for (let i = expr.length - 1; i >= 0; i--) {
                if ((expr[i] === '+' || expr[i] === '-') && i > 0) {
                    const left = evaluate(expr.slice(0, i), localVars);
                    const right = evaluate(expr.slice(i + 1), localVars);
                    if (expr[i] === '+') {
                        if (typeof left === 'string' || typeof right === 'string') {
                            return String(left) + String(right);
                        }
                        return left + right;
                    }
                    return left - right;
                }
            }
            
            // Comparisons
            if (expr.includes('==')) {
                const parts = expr.split('==');
                return evaluate(parts[0], localVars) === evaluate(parts[1], localVars);
            }
            if (expr.includes('!=')) {
                const parts = expr.split('!=');
                return evaluate(parts[0], localVars) !== evaluate(parts[1], localVars);
            }
            if (expr.includes('>=')) {
                const parts = expr.split('>=');
                return evaluate(parts[0], localVars) >= evaluate(parts[1], localVars);
            }
            if (expr.includes('<=')) {
                const parts = expr.split('<=');
                return evaluate(parts[0], localVars) <= evaluate(parts[1], localVars);
            }
            if (expr.includes('>')) {
                const parts = expr.split('>');
                return evaluate(parts[0], localVars) > evaluate(parts[1], localVars);
            }
            if (expr.includes('<')) {
                const parts = expr.split('<');
                return evaluate(parts[0], localVars) < evaluate(parts[1], localVars);
            }
            
            // in operator
            if (expr.includes(' in ')) {
                const parts = expr.split(' in ');
                const item = evaluate(parts[0].trim(), localVars);
                const container = evaluate(parts[1].trim(), localVars);
                if (typeof container === 'string') return container.includes(item);
                if (Array.isArray(container)) return container.includes(item);
                return false;
            }
            
            // Function call
            const funcMatch = expr.match(/^(\w+)\((.*)\)$/);
            if (funcMatch && funcs[funcMatch[1]]) {
                const func = funcs[funcMatch[1]];
                const argValues = funcMatch[2] ? PlaygroundView.splitByComma(funcMatch[2]).map(a => evaluate(a.trim(), localVars)) : [];
                const funcVars = {};
                func.params.forEach((p, i) => funcVars[p] = argValues[i]);
                return executeBlock(func.body, funcVars);
            }
            
            return expr;
        };
        
        const executeBlock = (blockLines, localVars = {}, returnValue = { value: undefined, returned: false }) => {
            for (let i = 0; i < blockLines.length && !returnValue.returned; i++) {
                const line = blockLines[i];
                const trimmed = line.trim();
                
                if (!trimmed || trimmed.startsWith('#')) continue;
                
                // Return statement
                if (trimmed.startsWith('return ')) {
                    returnValue.value = evaluate(trimmed.slice(7), localVars);
                    returnValue.returned = true;
                    return returnValue.value;
                }
                if (trimmed === 'return') {
                    returnValue.returned = true;
                    return undefined;
                }
                
                // Print statement
                if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
                    const inner = trimmed.slice(6, -1);
                    if (!inner) {
                        output.push('');
                    } else {
                        const val = evaluate(inner, localVars);
                        if (Array.isArray(val)) {
                            output.push('[' + val.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ') + ']');
                        } else if (val === true) {
                            output.push('True');
                        } else if (val === false) {
                            output.push('False');
                        } else {
                            output.push(String(val));
                        }
                    }
                    continue;
                }
                
                // Function definition
                if (trimmed.startsWith('def ') && trimmed.endsWith(':')) {
                    const match = trimmed.match(/def\s+(\w+)\s*\(([^)]*)\)\s*:/);
                    if (match) {
                        const funcName = match[1];
                        const params = match[2] ? match[2].split(',').map(p => p.trim()) : [];
                        
                        // Collect function body
                        const bodyLines = [];
                        const baseIndent = line.search(/\S/);
                        i++;
                        while (i < blockLines.length) {
                            const bodyLine = blockLines[i];
                            if (bodyLine.trim() === '' || bodyLine.search(/\S/) > baseIndent) {
                                bodyLines.push(bodyLine);
                                i++;
                            } else {
                                i--;
                                break;
                            }
                        }
                        funcs[funcName] = { params, body: bodyLines };
                    }
                    continue;
                }
                
                // Variable assignment
                if (trimmed.includes('=') && !trimmed.includes('==') && !trimmed.includes('!=') && 
                    !trimmed.includes('>=') && !trimmed.includes('<=')) {
                    
                    // Compound assignment
                    if (trimmed.includes('+=')) {
                        const parts = trimmed.split('+=');
                        const varName = parts[0].trim();
                        const target = localVars.hasOwnProperty(varName) ? localVars : vars;
                        target[varName] = (target[varName] || 0) + evaluate(parts[1].trim(), localVars);
                    } else if (trimmed.includes('-=')) {
                        const parts = trimmed.split('-=');
                        const varName = parts[0].trim();
                        const target = localVars.hasOwnProperty(varName) ? localVars : vars;
                        target[varName] = (target[varName] || 0) - evaluate(parts[1].trim(), localVars);
                    } else if (trimmed.includes('*=')) {
                        const parts = trimmed.split('*=');
                        const varName = parts[0].trim();
                        const target = localVars.hasOwnProperty(varName) ? localVars : vars;
                        target[varName] = (target[varName] || 1) * evaluate(parts[1].trim(), localVars);
                    } else {
                        // Simple assignment
                        const eqIndex = trimmed.indexOf('=');
                        const varName = trimmed.slice(0, eqIndex).trim();
                        const value = evaluate(trimmed.slice(eqIndex + 1).trim(), localVars);
                        
                        // Check for list index assignment
                        const indexAssign = varName.match(/^(\w+)\[(.+)\]$/);
                        if (indexAssign) {
                            const arr = vars[indexAssign[1]] || localVars[indexAssign[1]];
                            const idx = evaluate(indexAssign[2], localVars);
                            if (Array.isArray(arr)) arr[idx] = value;
                        } else {
                            if (localVars.hasOwnProperty(varName)) {
                                localVars[varName] = value;
                            } else {
                                vars[varName] = value;
                            }
                        }
                    }
                    continue;
                }
                
                // List methods
                if (trimmed.match(/^\w+\.append\(.+\)$/)) {
                    const match = trimmed.match(/^(\w+)\.append\((.+)\)$/);
                    if (match) {
                        const arr = vars[match[1]] || localVars[match[1]];
                        if (Array.isArray(arr)) arr.push(evaluate(match[2], localVars));
                    }
                    continue;
                }
                if (trimmed.match(/^\w+\.sort\(\)$/)) {
                    const match = trimmed.match(/^(\w+)\.sort\(\)$/);
                    if (match) {
                        const arr = vars[match[1]] || localVars[match[1]];
                        if (Array.isArray(arr)) arr.sort((a, b) => a - b);
                    }
                    continue;
                }
                
                // FOR loop
                if (trimmed.startsWith('for ') && trimmed.endsWith(':')) {
                    const match = trimmed.match(/for\s+(\w+)\s+in\s+(.+):/);
                    if (match) {
                        const loopVar = match[1];
                        const iterable = evaluate(match[2], localVars);
                        
                        // Collect loop body
                        const bodyLines = [];
                        const baseIndent = line.search(/\S/);
                        i++;
                        while (i < blockLines.length) {
                            const bodyLine = blockLines[i];
                            if (bodyLine.trim() === '' || bodyLine.search(/\S/) > baseIndent) {
                                bodyLines.push(bodyLine);
                                i++;
                            } else {
                                i--;
                                break;
                            }
                        }
                        
                        // Execute loop
                        const items = Array.isArray(iterable) ? iterable : 
                                     (typeof iterable === 'string' ? iterable.split('') : []);
                        for (const item of items) {
                            const loopVars = { ...localVars, [loopVar]: item };
                            executeBlock(bodyLines, loopVars, returnValue);
                            if (returnValue.returned) break;
                        }
                    }
                    continue;
                }
                
                // WHILE loop
                if (trimmed.startsWith('while ') && trimmed.endsWith(':')) {
                    const condition = trimmed.slice(6, -1).trim();
                    
                    // Collect loop body
                    const bodyLines = [];
                    const baseIndent = line.search(/\S/);
                    i++;
                    while (i < blockLines.length) {
                        const bodyLine = blockLines[i];
                        if (bodyLine.trim() === '' || bodyLine.search(/\S/) > baseIndent) {
                            bodyLines.push(bodyLine);
                            i++;
                        } else {
                            i--;
                            break;
                        }
                    }
                    
                    // Execute loop (with safety limit)
                    let iterations = 0;
                    while (evaluate(condition, localVars) && iterations < 10000) {
                        executeBlock(bodyLines, localVars, returnValue);
                        if (returnValue.returned) break;
                        iterations++;
                    }
                    continue;
                }
                
                // IF statement
                if (trimmed.startsWith('if ') && trimmed.endsWith(':')) {
                    const condition = trimmed.slice(3, -1).trim();
                    
                    // Collect if body
                    const ifBody = [];
                    const baseIndent = line.search(/\S/);
                    i++;
                    while (i < blockLines.length) {
                        const bodyLine = blockLines[i];
                        const lineIndent = bodyLine.search(/\S/);
                        const lineTrimmed = bodyLine.trim();
                        
                        if (lineTrimmed === '' || lineIndent > baseIndent) {
                            ifBody.push(bodyLine);
                            i++;
                        } else if (lineIndent === baseIndent && (lineTrimmed.startsWith('elif ') || lineTrimmed.startsWith('else:'))) {
                            break;
                        } else {
                            break;
                        }
                    }
                    
                    // Check for elif/else
                    const branches = [{ condition, body: ifBody }];
                    
                    while (i < blockLines.length) {
                        const branchLine = blockLines[i];
                        const branchTrimmed = branchLine.trim();
                        const branchIndent = branchLine.search(/\S/);
                        
                        if (branchIndent === baseIndent && branchTrimmed.startsWith('elif ') && branchTrimmed.endsWith(':')) {
                            const elifCond = branchTrimmed.slice(5, -1).trim();
                            const elifBody = [];
                            i++;
                            while (i < blockLines.length) {
                                const bodyLine = blockLines[i];
                                const lineIndent = bodyLine.search(/\S/);
                                const lineTrimmed = bodyLine.trim();
                                if (lineTrimmed === '' || lineIndent > baseIndent) {
                                    elifBody.push(bodyLine);
                                    i++;
                                } else {
                                    break;
                                }
                            }
                            branches.push({ condition: elifCond, body: elifBody });
                        } else if (branchIndent === baseIndent && branchTrimmed === 'else:') {
                            const elseBody = [];
                            i++;
                            while (i < blockLines.length) {
                                const bodyLine = blockLines[i];
                                const lineIndent = bodyLine.search(/\S/);
                                if (bodyLine.trim() === '' || lineIndent > baseIndent) {
                                    elseBody.push(bodyLine);
                                    i++;
                                } else {
                                    break;
                                }
                            }
                            branches.push({ condition: 'True', body: elseBody });
                            break;
                        } else {
                            break;
                        }
                    }
                    i--; // Adjust for outer loop increment
                    
                    // Execute first matching branch
                    for (const branch of branches) {
                        if (evaluate(branch.condition, localVars)) {
                            executeBlock(branch.body, localVars, returnValue);
                            break;
                        }
                    }
                    continue;
                }
            }
            
            return returnValue.value;
        };
        
        executeBlock(lines);
        return output.join('\n');
    },
    
    splitByComma: (str) => {
        const result = [];
        let current = '';
        let depth = 0;
        let inString = false;
        let stringChar = '';
        
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            
            if (!inString && (char === '"' || char === "'")) {
                inString = true;
                stringChar = char;
            } else if (inString && char === stringChar) {
                inString = false;
            }
            
            if (!inString) {
                if (char === '[' || char === '(' || char === '{') depth++;
                if (char === ']' || char === ')' || char === '}') depth--;
                
                if (char === ',' && depth === 0) {
                    result.push(current.trim());
                    current = '';
                    continue;
                }
            }
            
            current += char;
        }
        
        if (current.trim()) result.push(current.trim());
        return result;
    },

    // ==========================================
    // SANDBOX HELPERS
    // ==========================================
    
    examples: {
        hello: 'print("Hello, World!")',
        variables: 'name = "Alice"\nage = 15\nprint(f"{name} is {age} years old")',
        if: 'score = 75\nif score >= 70:\n    print("Pass!")\nelse:\n    print("Fail")',
        for: 'for i in range(1, 6):\n    print(f"Count: {i}")',
        while: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Done!")',
        list: 'nums = [3, 1, 4, 1, 5]\nprint(f"Original: {nums}")\nnums.sort()\nprint(f"Sorted: {nums}")',
        function: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))'
    },
    
    loadExample: (name) => {
        if (!name || !PlaygroundView.examples[name]) return;
        const editor = document.getElementById('code-editor');
        if (editor) {
            editor.value = PlaygroundView.examples[name];
            PlaygroundView.updateLineNumbers();
        }
        document.getElementById('example-select').value = '';
    },
    
    clearCode: () => {
        const editor = document.getElementById('code-editor');
        if (editor) {
            editor.value = '# Write your Python code here\n';
            PlaygroundView.updateLineNumbers();
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
        if (lineNumbers && editor) lineNumbers.scrollTop = editor.scrollTop;
    },

    handleTab: (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const editor = e.target;
            const start = editor.selectionStart;
            editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(editor.selectionEnd);
            editor.selectionStart = editor.selectionEnd = start + 4;
            PlaygroundView.updateLineNumbers();
        }
    }
};
