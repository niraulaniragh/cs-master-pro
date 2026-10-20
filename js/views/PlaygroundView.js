/**
 * PlaygroundView.js - Enhanced Code Playground
 * Features: Line-by-line execution, complex challenges, comprehensive Python lessons
 */

const PlaygroundView = {
    currentChallenge: null,
    executionState: null,
    isStepMode: false,
    currentLine: -1,
    
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
                        </div>
                    </div>
                    <div class="code-editor-wrapper">
                        <div class="line-numbers" id="line-numbers">1</div>
                        <textarea id="code-editor" spellcheck="false" 
                            oninput="PlaygroundView.updateLineNumbers()"
                            onkeydown="PlaygroundView.handleTab(event)"
                            onscroll="PlaygroundView.syncScroll()"
                            placeholder="# Write your Python code here"># Welcome to Python Playground!
# Try the Step-by-Step debugger!

total = 0
for i in range(1, 6):
    total = total + i
    print(f"Added {i}, total is {total}")

print(f"Sum of 1-5 = {total}")</textarea>
                    </div>
                    <div class="execution-controls">
                        <button class="btn btn-primary" onclick="PlaygroundView.runCode()">
                            <i class="fas fa-play"></i> Run All
                        </button>
                        <button class="btn btn-secondary" onclick="PlaygroundView.startStepMode()">
                            <i class="fas fa-shoe-prints"></i> Step-by-Step
                        </button>
                        <button class="btn btn-secondary" id="step-next-btn" onclick="PlaygroundView.stepNext()" disabled>
                            <i class="fas fa-forward-step"></i> Next Line
                        </button>
                        <button class="btn btn-secondary" id="step-reset-btn" onclick="PlaygroundView.resetStepMode()" disabled>
                            <i class="fas fa-rotate-left"></i> Reset
                        </button>
                    </div>
                </div>
                
                <div class="output-section">
                    <div class="output-tabs">
                        <button class="tab-btn active" onclick="PlaygroundView.showTab('output', this)">
                            📤 Output
                        </button>
                        <button class="tab-btn" onclick="PlaygroundView.showTab('variables', this)">
                            📊 Variables
                        </button>
                        <button class="tab-btn" onclick="PlaygroundView.showTab('trace', this)">
                            📋 Trace Table
                        </button>
                    </div>
                    
                    <div class="tab-content active" id="output-tab">
                        <div class="output-header">
                            <span>Program Output</span>
                            <span class="execution-status" id="exec-status"></span>
                        </div>
                        <pre id="code-output" class="output-display">Click "Run All" or "Step-by-Step" to execute</pre>
                    </div>
                    
                    <div class="tab-content" id="variables-tab">
                        <div class="output-header">
                            <span>Variable Watch</span>
                            <span class="var-count" id="var-count">0 variables</span>
                        </div>
                        <div id="variables-display" class="variables-display">
                            <p class="placeholder-text">Variables will appear here during execution</p>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="trace-tab">
                        <div class="output-header">
                            <span>Execution Trace</span>
                            <button class="btn btn-small" onclick="PlaygroundView.clearTrace()">Clear</button>
                        </div>
                        <div id="trace-display" class="trace-display">
                            <p class="placeholder-text">Step through code to see execution trace</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderChallenges: () => {
        const challenges = PlaygroundView.getChallenges();
        const completed = PlaygroundView.getCompletedChallenges();
        
        const easyCount = challenges.filter(c => c.difficulty === 'Easy').length;
        const mediumCount = challenges.filter(c => c.difficulty === 'Medium').length;
        const hardCount = challenges.filter(c => c.difficulty === 'Hard').length;
        
        return `
            <div class="challenges-layout">
                <div class="challenges-sidebar">
                    <h3>🎯 Coding Challenges</h3>
                    <div class="challenges-stats">
                        <div class="challenge-stat">
                            <span class="stat-num">${completed.length}</span>
                            <span class="stat-label">Completed</span>
                        </div>
                        <div class="challenge-stat">
                            <span class="stat-num">${challenges.length}</span>
                            <span class="stat-label">Total</span>
                        </div>
                    </div>
                    <div class="difficulty-filter">
                        <button class="diff-btn active" onclick="PlaygroundView.filterChallenges('all', this)">All</button>
                        <button class="diff-btn easy" onclick="PlaygroundView.filterChallenges('Easy', this)">Easy (${easyCount})</button>
                        <button class="diff-btn medium" onclick="PlaygroundView.filterChallenges('Medium', this)">Medium (${mediumCount})</button>
                        <button class="diff-btn hard" onclick="PlaygroundView.filterChallenges('Hard', this)">Hard (${hardCount})</button>
                    </div>
                    <div class="challenges-list" id="challenges-list">
                        ${challenges.map(c => `
                            <button class="challenge-item ${completed.includes(c.id) ? 'completed' : ''}" 
                                    data-difficulty="${c.difficulty}"
                                    onclick="PlaygroundView.loadChallenge('${c.id}')">
                                <span class="challenge-icon">${completed.includes(c.id) ? '✅' : c.icon}</span>
                                <span class="challenge-info">
                                    <span class="challenge-name">${c.name}</span>
                                    <span class="challenge-meta">
                                        <span class="challenge-difficulty ${c.difficulty.toLowerCase()}">${c.difficulty}</span>
                                        <span class="challenge-xp">+${c.xp} XP</span>
                                    </span>
                                </span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="challenge-workspace" id="challenge-workspace">
                    <div class="challenge-placeholder">
                        <span class="placeholder-icon">🎯</span>
                        <h3>Select a Challenge</h3>
                        <p>Choose from ${challenges.length} coding challenges to test your Python skills!</p>
                        <div class="challenge-tips">
                            <h4>Tips:</h4>
                            <ul>
                                <li>Start with Easy challenges to learn the basics</li>
                                <li>Use the hint button if you get stuck</li>
                                <li>You can run your code before submitting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderLearnMode: () => {
        const topics = [
            { id: 'intro', name: 'Introduction to Python', icon: '🐍', lessons: 3 },
            { id: 'variables', name: 'Variables & Data Types', icon: '📦', lessons: 4 },
            { id: 'operators', name: 'Operators & Expressions', icon: '➕', lessons: 3 },
            { id: 'strings', name: 'Working with Strings', icon: '📝', lessons: 4 },
            { id: 'conditionals', name: 'If Statements & Logic', icon: '🔀', lessons: 4 },
            { id: 'loops', name: 'Loops & Iteration', icon: '🔄', lessons: 5 },
            { id: 'lists', name: 'Lists & Arrays', icon: '📋', lessons: 5 },
            { id: 'functions', name: 'Functions', icon: '⚙️', lessons: 4 },
            { id: 'algorithms', name: 'Basic Algorithms', icon: '🔍', lessons: 4 },
            { id: 'filehandling', name: 'File Handling', icon: '📁', lessons: 3 },
        ];
        
        return `
            <div class="learn-layout">
                <div class="learn-topics">
                    <h3>📖 Python Course</h3>
                    <p class="learn-subtitle">Master Python with interactive lessons</p>
                    <div class="topic-cards">
                        ${topics.map((t, idx) => `
                            <button class="learn-topic-card" onclick="PlaygroundView.loadLesson('${t.id}')">
                                <span class="topic-number">${idx + 1}</span>
                                <span class="ltc-icon">${t.icon}</span>
                                <span class="ltc-info">
                                    <span class="ltc-name">${t.name}</span>
                                    <span class="ltc-lessons">${t.lessons} lessons</span>
                                </span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="learn-content" id="learn-content">
                    <div class="learn-welcome">
                        <h3>🐍 Welcome to Python!</h3>
                        <p>Python is a powerful, beginner-friendly programming language used for:</p>
                        <div class="python-uses">
                            <div class="use-card"><span>🌐</span>Web Development</div>
                            <div class="use-card"><span>🤖</span>AI & Machine Learning</div>
                            <div class="use-card"><span>📊</span>Data Science</div>
                            <div class="use-card"><span>🎮</span>Game Development</div>
                        </div>
                        <h4>Quick Reference</h4>
                        <div class="quick-ref-grid">
                            <div class="ref-item">
                                <code>print("Hello")</code>
                                <span>Output text</span>
                            </div>
                            <div class="ref-item">
                                <code>x = 10</code>
                                <span>Create variable</span>
                            </div>
                            <div class="ref-item">
                                <code>input("Name? ")</code>
                                <span>Get user input</span>
                            </div>
                            <div class="ref-item">
                                <code>if x > 5:</code>
                                <span>Condition check</span>
                            </div>
                            <div class="ref-item">
                                <code>for i in range(5):</code>
                                <span>Loop 0 to 4</span>
                            </div>
                            <div class="ref-item">
                                <code>def func():</code>
                                <span>Define function</span>
                            </div>
                            <div class="ref-item">
                                <code>list = [1, 2, 3]</code>
                                <span>Create list</span>
                            </div>
                            <div class="ref-item">
                                <code>len(list)</code>
                                <span>Get length</span>
                            </div>
                        </div>
                        <p class="start-hint">👈 Select a topic to start learning!</p>
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
    // LINE-BY-LINE EXECUTION
    // ==========================================
    startStepMode: () => {
        const code = document.getElementById('code-editor').value;
        PlaygroundView.executionState = {
            lines: code.split('\n'),
            currentLine: 0,
            variables: {},
            output: [],
            trace: [],
            callStack: [],
            loopStack: []
        };
        PlaygroundView.isStepMode = true;
        
        // Enable step controls
        document.getElementById('step-next-btn').disabled = false;
        document.getElementById('step-reset-btn').disabled = false;
        document.getElementById('exec-status').textContent = '⏸️ Step Mode';
        document.getElementById('code-output').textContent = '';
        
        // Clear and prepare displays
        PlaygroundView.updateVariablesDisplay();
        PlaygroundView.updateTraceDisplay();
        PlaygroundView.highlightLine(0);
        
        Toast.show('Step mode started. Click "Next Line" to execute', 'info');
    },

    stepNext: () => {
        if (!PlaygroundView.executionState) return;
        
        const state = PlaygroundView.executionState;
        if (state.currentLine >= state.lines.length) {
            PlaygroundView.finishStepMode();
            return;
        }
        
        // Skip empty lines and comments
        while (state.currentLine < state.lines.length) {
            const line = state.lines[state.currentLine].trim();
            if (line && !line.startsWith('#')) break;
            state.currentLine++;
        }
        
        if (state.currentLine >= state.lines.length) {
            PlaygroundView.finishStepMode();
            return;
        }
        
        // Execute current line
        const result = PlaygroundView.executeSingleLine(state.currentLine, state);
        
        // Record in trace
        state.trace.push({
            line: state.currentLine + 1,
            code: state.lines[state.currentLine].trim(),
            variables: { ...state.variables },
            output: result.output || null
        });
        
        // Update displays
        PlaygroundView.updateVariablesDisplay();
        PlaygroundView.updateTraceDisplay();
        PlaygroundView.updateOutput(state.output);
        
        // Move to next line (unless loop/function changed it)
        if (!result.jumped) {
            state.currentLine++;
        }
        
        // Highlight next line
        PlaygroundView.highlightLine(state.currentLine);
        
        // Check if finished
        if (state.currentLine >= state.lines.length) {
            PlaygroundView.finishStepMode();
        }
    },

    executeSingleLine: (lineNum, state) => {
        const line = state.lines[lineNum];
        const trimmed = line.trim();
        const indent = line.search(/\S/);
        let result = { jumped: false, output: null };
        
        // Variable assignment
        if (trimmed.match(/^\w+\s*=\s*.+$/) && !trimmed.startsWith('if ') && !trimmed.startsWith('while ') && !trimmed.startsWith('for ')) {
            const match = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
            if (match) {
                const [, varName, expr] = match;
                state.variables[varName] = PlaygroundView.evalExpr(expr, state.variables);
            }
        }
        // Augmented assignment
        else if (trimmed.match(/^\w+\s*[+\-*\/]=\s*.+$/)) {
            const match = trimmed.match(/^(\w+)\s*([+\-*\/])=\s*(.+)$/);
            if (match) {
                const [, varName, op, expr] = match;
                const current = state.variables[varName] ?? 0;
                const val = PlaygroundView.evalExpr(expr, state.variables);
                state.variables[varName] = eval(`${current} ${op} ${val}`);
            }
        }
        // Print statement
        else if (trimmed.startsWith('print(')) {
            const content = trimmed.slice(6, -1);
            const output = PlaygroundView.evalPrint(content, state.variables);
            state.output.push(output);
            result.output = output;
        }
        // FOR loop
        else if (trimmed.startsWith('for ')) {
            const match = trimmed.match(/for\s+(\w+)\s+in\s+(.+):/);
            if (match) {
                const varName = match[1];
                const iterable = PlaygroundView.evalExpr(match[2], state.variables);
                
                // Find loop end
                let loopEnd = lineNum + 1;
                while (loopEnd < state.lines.length && 
                       (state.lines[loopEnd].trim() === '' || 
                        state.lines[loopEnd].search(/\S/) > indent)) {
                    loopEnd++;
                }
                loopEnd--;
                
                // Initialize loop
                let items = [];
                if (iterable?.type === 'range') {
                    for (let k = iterable.start; iterable.step > 0 ? k < iterable.end : k > iterable.end; k += iterable.step) {
                        items.push(k);
                    }
                } else if (Array.isArray(iterable)) {
                    items = iterable;
                }
                
                state.loopStack.push({
                    type: 'for',
                    varName,
                    items,
                    index: 0,
                    startLine: lineNum,
                    endLine: loopEnd,
                    bodyStart: lineNum + 1
                });
                
                if (items.length > 0) {
                    state.variables[varName] = items[0];
                }
            }
        }
        // WHILE loop
        else if (trimmed.startsWith('while ')) {
            const condition = trimmed.match(/while\s+(.+):/)?.[1];
            
            // Find loop end
            let loopEnd = lineNum + 1;
            while (loopEnd < state.lines.length && 
                   (state.lines[loopEnd].trim() === '' || 
                    state.lines[loopEnd].search(/\S/) > indent)) {
                loopEnd++;
            }
            loopEnd--;
            
            state.loopStack.push({
                type: 'while',
                condition,
                startLine: lineNum,
                endLine: loopEnd,
                bodyStart: lineNum + 1
            });
            
            // Check condition
            if (!PlaygroundView.evalExpr(condition, state.variables)) {
                state.currentLine = loopEnd + 1;
                state.loopStack.pop();
                result.jumped = true;
            }
        }
        // IF statement
        else if (trimmed.startsWith('if ')) {
            const condition = trimmed.match(/if\s+(.+):/)?.[1];
            
            // Find if block end
            let blockEnd = lineNum + 1;
            while (blockEnd < state.lines.length && 
                   (state.lines[blockEnd].trim() === '' || 
                    state.lines[blockEnd].search(/\S/) > indent)) {
                blockEnd++;
            }
            blockEnd--;
            
            if (!PlaygroundView.evalExpr(condition, state.variables)) {
                // Skip to after the block (or elif/else)
                state.currentLine = blockEnd + 1;
                result.jumped = true;
            }
        }
        
        // Check if we're at the end of a loop body
        const currentLoop = state.loopStack[state.loopStack.length - 1];
        if (currentLoop && lineNum === currentLoop.endLine) {
            if (currentLoop.type === 'for') {
                currentLoop.index++;
                if (currentLoop.index < currentLoop.items.length) {
                    state.variables[currentLoop.varName] = currentLoop.items[currentLoop.index];
                    state.currentLine = currentLoop.bodyStart;
                    result.jumped = true;
                } else {
                    state.loopStack.pop();
                }
            } else if (currentLoop.type === 'while') {
                if (PlaygroundView.evalExpr(currentLoop.condition, state.variables)) {
                    state.currentLine = currentLoop.bodyStart;
                    result.jumped = true;
                } else {
                    state.loopStack.pop();
                }
            }
        }
        
        return result;
    },

    highlightLine: (lineNum) => {
        const editor = document.getElementById('code-editor');
        const lines = editor.value.split('\n');
        
        // Update line numbers with highlight
        const lineNumbers = document.getElementById('line-numbers');
        lineNumbers.innerHTML = lines.map((_, i) => 
            `<span class="${i === lineNum ? 'current-line' : ''}">${i + 1}</span>`
        ).join('<br>');
    },

    finishStepMode: () => {
        PlaygroundView.isStepMode = false;
        document.getElementById('step-next-btn').disabled = true;
        document.getElementById('exec-status').textContent = '✅ Finished';
        PlaygroundView.highlightLine(-1);
        Toast.show('Execution complete!', 'success');
    },

    resetStepMode: () => {
        PlaygroundView.executionState = null;
        PlaygroundView.isStepMode = false;
        document.getElementById('step-next-btn').disabled = true;
        document.getElementById('step-reset-btn').disabled = true;
        document.getElementById('exec-status').textContent = '';
        document.getElementById('code-output').textContent = 'Click "Run All" or "Step-by-Step" to execute';
        document.getElementById('variables-display').innerHTML = '<p class="placeholder-text">Variables will appear here during execution</p>';
        document.getElementById('trace-display').innerHTML = '<p class="placeholder-text">Step through code to see execution trace</p>';
        PlaygroundView.updateLineNumbers();
    },

    updateVariablesDisplay: () => {
        const state = PlaygroundView.executionState;
        if (!state) return;
        
        const container = document.getElementById('variables-display');
        const vars = Object.entries(state.variables);
        
        document.getElementById('var-count').textContent = `${vars.length} variable${vars.length !== 1 ? 's' : ''}`;
        
        if (vars.length === 0) {
            container.innerHTML = '<p class="placeholder-text">No variables yet</p>';
            return;
        }
        
        container.innerHTML = vars.map(([name, value]) => {
            const type = Array.isArray(value) ? 'list' : typeof value;
            const displayValue = Array.isArray(value) ? JSON.stringify(value) : String(value);
            return `
                <div class="var-item">
                    <span class="var-name">${name}</span>
                    <span class="var-type">${type}</span>
                    <span class="var-value">${displayValue}</span>
                </div>
            `;
        }).join('');
    },

    updateTraceDisplay: () => {
        const state = PlaygroundView.executionState;
        if (!state || state.trace.length === 0) return;
        
        const container = document.getElementById('trace-display');
        container.innerHTML = `
            <table class="trace-table">
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Line</th>
                        <th>Code</th>
                        <th>Variables Changed</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.trace.map((t, i) => `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${t.line}</td>
                            <td><code>${t.code.substring(0, 30)}${t.code.length > 30 ? '...' : ''}</code></td>
                            <td>${Object.entries(t.variables).map(([k,v]) => `${k}=${Array.isArray(v) ? '[...]' : v}`).join(', ') || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    updateOutput: (outputLines) => {
        document.getElementById('code-output').textContent = outputLines.join('\n') || '(No output yet)';
    },

    clearTrace: () => {
        if (PlaygroundView.executionState) {
            PlaygroundView.executionState.trace = [];
        }
        document.getElementById('trace-display').innerHTML = '<p class="placeholder-text">Trace cleared</p>';
    },

    // ==========================================
    // CHALLENGES (15+ with varying difficulty)
    // ==========================================
    getChallenges: () => [
        // EASY (5)
        {
            id: 'hello',
            name: 'Hello World',
            icon: '👋',
            difficulty: 'Easy',
            xp: 10,
            description: 'Print "Hello, World!" to the screen. This is the classic first program every programmer writes!',
            hint: 'Use print() with a string inside quotes.',
            starterCode: '# Print Hello, World!\n',
            tests: [{ expected: 'Hello, World!' }]
        },
        {
            id: 'sum_two',
            name: 'Add Two Numbers',
            icon: '➕',
            difficulty: 'Easy',
            xp: 15,
            description: 'Create variables a=5 and b=3, then print their sum.',
            hint: 'Create two variables, add them, and print the result.',
            starterCode: '# Add two numbers\na = 5\nb = 3\n# Print the sum\n',
            tests: [{ expected: '8' }]
        },
        {
            id: 'even_odd',
            name: 'Even or Odd',
            icon: '🔢',
            difficulty: 'Easy',
            xp: 20,
            description: 'Given num = 7, print "Even" if it\'s even, or "Odd" if it\'s odd.',
            hint: 'Use the modulo operator (%) - if num % 2 == 0, it\'s even.',
            starterCode: '# Check if even or odd\nnum = 7\n',
            tests: [{ expected: 'Odd' }]
        },
        {
            id: 'countdown',
            name: 'Countdown',
            icon: '🚀',
            difficulty: 'Easy',
            xp: 25,
            description: 'Print numbers from 5 down to 1, then print "Blast off!"',
            hint: 'Use range(5, 0, -1) to count backwards.',
            starterCode: '# Countdown from 5\n',
            tests: [{ contains: ['5', '4', '3', '2', '1', 'Blast off!'] }]
        },
        {
            id: 'greeting',
            name: 'Personal Greeting',
            icon: '🙋',
            difficulty: 'Easy',
            xp: 20,
            description: 'Create a variable name = "Alex" and print "Hello, Alex!"',
            hint: 'Use an f-string: f"Hello, {name}!"',
            starterCode: '# Create a greeting\nname = "Alex"\n',
            tests: [{ expected: 'Hello, Alex!' }]
        },
        
        // MEDIUM (6)
        {
            id: 'sum_range',
            name: 'Sum 1 to N',
            icon: '📊',
            difficulty: 'Medium',
            xp: 30,
            description: 'Calculate and print the sum of numbers from 1 to 10.',
            hint: 'Use a for loop with range(1, 11) and keep a running total.',
            starterCode: '# Sum numbers 1 to 10\ntotal = 0\n',
            tests: [{ expected: '55' }]
        },
        {
            id: 'factorial',
            name: 'Factorial',
            icon: '❗',
            difficulty: 'Medium',
            xp: 35,
            description: 'Calculate 5! (5 factorial = 5×4×3×2×1 = 120)',
            hint: 'Start with result=1, then multiply by each number from 1 to 5.',
            starterCode: '# Calculate 5!\nn = 5\nresult = 1\n',
            tests: [{ expected: '120' }]
        },
        {
            id: 'fizzbuzz',
            name: 'FizzBuzz',
            icon: '🎯',
            difficulty: 'Medium',
            xp: 40,
            description: 'Print 1-15. For multiples of 3 print "Fizz", for 5 print "Buzz", for both print "FizzBuzz".',
            hint: 'Check divisibility by 15 first (for FizzBuzz), then 3, then 5.',
            starterCode: '# FizzBuzz 1-15\nfor i in range(1, 16):\n    pass  # Replace this\n',
            tests: [{ contains: ['FizzBuzz', 'Fizz', 'Buzz', '1', '2'] }]
        },
        {
            id: 'reverse_string',
            name: 'Reverse String',
            icon: '🔄',
            difficulty: 'Medium',
            xp: 30,
            description: 'Reverse the string "Python" and print it.',
            hint: 'You can use string slicing: text[::-1]',
            starterCode: '# Reverse a string\ntext = "Python"\n',
            tests: [{ expected: 'nohtyP' }]
        },
        {
            id: 'find_max',
            name: 'Find Maximum',
            icon: '📈',
            difficulty: 'Medium',
            xp: 35,
            description: 'Find and print the largest number in the list [3, 7, 2, 9, 4, 1, 8] without using max().',
            hint: 'Loop through and keep track of the biggest value seen.',
            starterCode: '# Find the maximum\nnumbers = [3, 7, 2, 9, 4, 1, 8]\nlargest = numbers[0]\n',
            tests: [{ expected: '9' }]
        },
        {
            id: 'count_vowels',
            name: 'Count Vowels',
            icon: '🔤',
            difficulty: 'Medium',
            xp: 35,
            description: 'Count and print the number of vowels in "Hello World".',
            hint: 'Check if each character is in "aeiouAEIOU".',
            starterCode: '# Count vowels\ntext = "Hello World"\ncount = 0\n',
            tests: [{ expected: '3' }]
        },
        
        // HARD (5)
        {
            id: 'prime_check',
            name: 'Prime Checker',
            icon: '🔐',
            difficulty: 'Hard',
            xp: 50,
            description: 'Check if 17 is a prime number. Print "Prime" or "Not prime".',
            hint: 'A prime only has divisors 1 and itself. Check if any number from 2 to n-1 divides evenly.',
            starterCode: '# Check if prime\nn = 17\nis_prime = True\n',
            tests: [{ expected: 'Prime' }]
        },
        {
            id: 'palindrome',
            name: 'Palindrome Check',
            icon: '🪞',
            difficulty: 'Hard',
            xp: 50,
            description: 'Check if "radar" is a palindrome (same forwards and backwards). Print "Yes" or "No".',
            hint: 'Compare the string to its reverse.',
            starterCode: '# Check palindrome\nword = "radar"\n',
            tests: [{ expected: 'Yes' }]
        },
        {
            id: 'fibonacci',
            name: 'Fibonacci Sequence',
            icon: '🌀',
            difficulty: 'Hard',
            xp: 60,
            description: 'Print the first 10 Fibonacci numbers (0, 1, 1, 2, 3, 5, 8, 13, 21, 34).',
            hint: 'Each number is the sum of the two before it. Start with a=0, b=1.',
            starterCode: '# Fibonacci sequence\na = 0\nb = 1\n',
            tests: [{ contains: ['0', '1', '1', '2', '3', '5', '8', '13', '21', '34'] }]
        },
        {
            id: 'bubble_sort',
            name: 'Bubble Sort',
            icon: '🫧',
            difficulty: 'Hard',
            xp: 70,
            description: 'Sort the list [64, 34, 25, 12, 22] using bubble sort and print the sorted list.',
            hint: 'Compare adjacent elements and swap if out of order. Repeat until sorted.',
            starterCode: '# Bubble sort\nnums = [64, 34, 25, 12, 22]\n',
            tests: [{ contains: ['12', '22', '25', '34', '64'] }]
        },
        {
            id: 'binary_search',
            name: 'Binary Search',
            icon: '🔍',
            difficulty: 'Hard',
            xp: 70,
            description: 'Find the index of 7 in sorted list [1, 3, 5, 7, 9, 11] using binary search. Print "Found at index X".',
            hint: 'Compare middle element. If target is smaller, search left half; if larger, search right half.',
            starterCode: '# Binary search\nnums = [1, 3, 5, 7, 9, 11]\ntarget = 7\n',
            tests: [{ contains: ['Found', 'index', '3'] }]
        }
    ],

    getCompletedChallenges: () => {
        return JSON.parse(localStorage.getItem('csmaster_completed_challenges') || '[]');
    },

    filterChallenges: (difficulty, btn) => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.challenge-item').forEach(item => {
            if (difficulty === 'all' || item.dataset.difficulty === difficulty) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    },

    loadChallenge: (id) => {
        const challenge = PlaygroundView.getChallenges().find(c => c.id === id);
        if (!challenge) return;
        
        PlaygroundView.currentChallenge = challenge;
        
        const workspace = document.getElementById('challenge-workspace');
        workspace.innerHTML = `
            <div class="challenge-detail">
                <div class="challenge-header">
                    <div class="ch-title">
                        <span class="ch-icon">${challenge.icon}</span>
                        <h3>${challenge.name}</h3>
                    </div>
                    <div class="ch-badges">
                        <span class="ch-difficulty ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
                        <span class="ch-xp">+${challenge.xp} XP</span>
                    </div>
                </div>
                
                <div class="challenge-body">
                    <div class="challenge-description">
                        <p>${challenge.description}</p>
                        <button class="btn btn-small btn-secondary" onclick="PlaygroundView.showHint()">
                            💡 Show Hint
                        </button>
                        <div class="challenge-hint" id="challenge-hint" style="display: none;">
                            <strong>💡 Hint:</strong> ${challenge.hint}
                        </div>
                    </div>
                    
                    <div class="challenge-editor-section">
                        <div class="ce-header">
                            <span>Your Code</span>
                            <div class="ce-actions">
                                <button class="btn btn-small btn-secondary" onclick="PlaygroundView.resetChallenge()">
                                    <i class="fas fa-undo"></i> Reset
                                </button>
                                <button class="btn btn-small btn-secondary" onclick="PlaygroundView.runChallenge()">
                                    <i class="fas fa-play"></i> Test
                                </button>
                                <button class="btn btn-small btn-primary" onclick="PlaygroundView.submitChallenge()">
                                    <i class="fas fa-check"></i> Submit
                                </button>
                            </div>
                        </div>
                        <textarea id="challenge-editor" spellcheck="false"
                            onkeydown="PlaygroundView.handleTab(event)">${challenge.starterCode}</textarea>
                    </div>
                    
                    <div class="challenge-output-section">
                        <h4>Output</h4>
                        <pre id="challenge-output" class="challenge-output">Run your code to see output...</pre>
                    </div>
                </div>
            </div>
        `;
        
        // Highlight active challenge
        document.querySelectorAll('.challenge-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.challenge-item[onclick*="${id}"]`)?.classList.add('active');
    },

    showHint: () => {
        const hint = document.getElementById('challenge-hint');
        hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
    },

    resetChallenge: () => {
        if (PlaygroundView.currentChallenge) {
            document.getElementById('challenge-editor').value = PlaygroundView.currentChallenge.starterCode;
            document.getElementById('challenge-output').textContent = 'Run your code to see output...';
        }
    },

    runChallenge: () => {
        const code = document.getElementById('challenge-editor').value;
        const output = document.getElementById('challenge-output');
        
        try {
            const result = PlaygroundView.interpretPython(code);
            output.textContent = result.output || '(No output)';
            output.className = 'challenge-output';
        } catch (e) {
            output.textContent = `Error: ${e.message}`;
            output.className = 'challenge-output error';
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
            
            let passed = false;
            const test = challenge.tests[0];
            
            if (test.contains) {
                passed = test.contains.every(s => outputText.includes(s));
            } else if (test.expected) {
                passed = outputText.includes(test.expected);
            }
            
            if (passed) {
                output.innerHTML = `<span class="success">✅ Correct! Challenge completed!</span>\n\n${outputText}`;
                
                const completed = PlaygroundView.getCompletedChallenges();
                if (!completed.includes(challenge.id)) {
                    completed.push(challenge.id);
                    localStorage.setItem('csmaster_completed_challenges', JSON.stringify(completed));
                    
                    if (typeof AppState !== 'undefined') {
                        AppState.addXP(challenge.xp);
                    }
                    Toast.show(`🎉 +${challenge.xp} XP earned!`, 'success');
                    
                    // Update UI
                    document.querySelector(`.challenge-item[onclick*="${challenge.id}"]`)?.classList.add('completed');
                    const icon = document.querySelector(`.challenge-item[onclick*="${challenge.id}"] .challenge-icon`);
                    if (icon) icon.textContent = '✅';
                }
            } else {
                output.innerHTML = `<span class="error">❌ Not quite right. Try again!</span>\n\nYour output:\n${outputText}`;
            }
        } catch (e) {
            output.innerHTML = `<span class="error">Error: ${e.message}</span>`;
        }
    },

    // ==========================================
    // COMPREHENSIVE LESSONS
    // ==========================================
    lessons: {
        intro: {
            title: 'Introduction to Python',
            sections: [
                {
                    title: 'What is Python?',
                    content: `Python is a high-level, interpreted programming language known for its clear syntax and readability. Created by Guido van Rossum in 1991, it's now one of the world's most popular languages.`,
                    code: `# Your first Python program!\nprint("Hello, Python!")\nprint("I'm learning to code!")`
                },
                {
                    title: 'Running Python Code',
                    content: `Python executes code line by line from top to bottom. Each print() statement outputs text to the screen.`,
                    code: `print("Line 1")\nprint("Line 2")\nprint("Line 3")`
                },
                {
                    title: 'Comments',
                    content: `Comments start with # and are ignored by Python. Use them to explain your code!`,
                    code: `# This is a comment - Python ignores it\nprint("This runs")  # Inline comment\n\n# Comments help others understand your code\n# They also help YOU remember what you did!`
                }
            ]
        },
        variables: {
            title: 'Variables & Data Types',
            sections: [
                {
                    title: 'Creating Variables',
                    content: `Variables store data. In Python, you don't need to declare types - Python figures it out automatically!`,
                    code: `name = "Alice"    # String (text)\nage = 15          # Integer (whole number)\nheight = 1.65     # Float (decimal)\nis_student = True # Boolean (True/False)\n\nprint(name)\nprint(age)`
                },
                {
                    title: 'Data Types',
                    content: `Python has several built-in data types: str (text), int (whole numbers), float (decimals), bool (True/False), list, dict, and more.`,
                    code: `# Check types with type()\nprint(type("hello"))  # <class 'str'>\nprint(type(42))       # <class 'int'>\nprint(type(3.14))     # <class 'float'>\nprint(type(True))     # <class 'bool'>`
                },
                {
                    title: 'Type Conversion',
                    content: `Convert between types using int(), str(), float(), bool().`,
                    code: `# Convert string to int\nnum_str = "42"\nnum_int = int(num_str)\nprint(num_int + 8)  # 50\n\n# Convert int to string\nage = 15\nprint("Age: " + str(age))`
                },
                {
                    title: 'f-Strings (Formatted Strings)',
                    content: `f-strings let you embed variables directly in strings. Put f before the quotes and use {variable} to insert values.`,
                    code: `name = "Alex"\nage = 15\nscore = 95.5\n\n# f-string makes this easy!\nprint(f"Name: {name}")\nprint(f"Age: {age} years old")\nprint(f"Score: {score}%")`
                }
            ]
        },
        operators: {
            title: 'Operators & Expressions',
            sections: [
                {
                    title: 'Arithmetic Operators',
                    content: `Python supports all basic math operations plus some special ones.`,
                    code: `print("Addition:", 5 + 3)       # 8\nprint("Subtraction:", 10 - 4)   # 6\nprint("Multiplication:", 6 * 7) # 42\nprint("Division:", 15 / 4)      # 3.75\nprint("Integer div:", 15 // 4)  # 3\nprint("Modulo:", 17 % 5)        # 2 (remainder)\nprint("Power:", 2 ** 8)         # 256`
                },
                {
                    title: 'Comparison Operators',
                    content: `Comparisons return True or False. Used in conditions.`,
                    code: `x = 10\ny = 5\n\nprint(x > y)   # True (greater than)\nprint(x < y)   # False (less than)\nprint(x == 10) # True (equal to)\nprint(x != y)  # True (not equal)\nprint(x >= 10) # True (greater or equal)\nprint(x <= 5)  # False (less or equal)`
                },
                {
                    title: 'Logical Operators',
                    content: `Combine conditions with and, or, not.`,
                    code: `age = 15\nhas_ticket = True\n\n# Both must be true\nprint(age >= 13 and has_ticket)  # True\n\n# At least one must be true\nprint(age >= 18 or has_ticket)   # True\n\n# Inverts the value\nprint(not has_ticket)            # False`
                }
            ]
        },
        strings: {
            title: 'Working with Strings',
            sections: [
                {
                    title: 'String Basics',
                    content: `Strings are sequences of characters. Create them with quotes (single or double).`,
                    code: `message = "Hello, World!"\nname = 'Python'\n\nprint(message)\nprint(len(message))  # Length: 13`
                },
                {
                    title: 'String Indexing & Slicing',
                    content: `Access individual characters with [index]. First character is index 0. Negative indices count from the end.`,
                    code: `text = "Python"\n\nprint(text[0])   # P (first)\nprint(text[-1])  # n (last)\nprint(text[0:3]) # Pyt (slice)\nprint(text[2:])  # thon (from index 2)\nprint(text[::-1]) # nohtyP (reversed)`
                },
                {
                    title: 'String Methods',
                    content: `Strings have many useful methods for manipulation.`,
                    code: `text = "  Hello World  "\n\nprint(text.upper())      # "  HELLO WORLD  "\nprint(text.lower())      # "  hello world  "\nprint(text.strip())      # "Hello World"\nprint(text.replace("World", "Python"))\n# "  Hello Python  "`
                },
                {
                    title: 'String Concatenation',
                    content: `Join strings with + or use f-strings for cleaner code.`,
                    code: `first = "Hello"\nlast = "World"\n\n# Method 1: Concatenation\nprint(first + " " + last)\n\n# Method 2: f-strings (preferred)\nprint(f"{first} {last}")`
                }
            ]
        },
        conditionals: {
            title: 'If Statements & Logic',
            sections: [
                {
                    title: 'Basic If Statement',
                    content: `if statements execute code only when a condition is True. Indentation (4 spaces) defines the code block.`,
                    code: `age = 18\n\nif age >= 18:\n    print("You are an adult")\n    print("You can vote!")`
                },
                {
                    title: 'If-Else',
                    content: `else provides an alternative when the condition is False.`,
                    code: `temperature = 25\n\nif temperature > 30:\n    print("It's hot!")\nelse:\n    print("Nice weather!")`
                },
                {
                    title: 'If-Elif-Else',
                    content: `elif (else if) checks multiple conditions in order.`,
                    code: `score = 75\n\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelif score >= 70:\n    print("Grade: C")\nelif score >= 60:\n    print("Grade: D")\nelse:\n    print("Grade: F")`
                },
                {
                    title: 'Nested Conditions',
                    content: `You can put if statements inside other if statements.`,
                    code: `age = 20\nhas_license = True\n\nif age >= 18:\n    print("Old enough to drive")\n    if has_license:\n        print("You can drive!")\n    else:\n        print("Get a license first")\nelse:\n    print("Too young to drive")`
                }
            ]
        },
        loops: {
            title: 'Loops & Iteration',
            sections: [
                {
                    title: 'FOR Loop Basics',
                    content: `FOR loops iterate a specific number of times. range(n) generates numbers 0 to n-1.`,
                    code: `# Print 0 to 4\nfor i in range(5):\n    print(f"Count: {i}")`
                },
                {
                    title: 'FOR Loop with Range',
                    content: `range() can take start, stop, and step arguments.`,
                    code: `# range(start, stop, step)\nprint("1 to 10:")\nfor i in range(1, 11):\n    print(i, end=" ")\n\nprint("\\n\\nCountdown:")\nfor i in range(10, 0, -1):\n    print(i, end=" ")\nprint("\\nBlast off!")`
                },
                {
                    title: 'FOR Loop with Lists',
                    content: `Loop directly through items in a list.`,
                    code: `fruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n    print(f"I like {fruit}")`
                },
                {
                    title: 'WHILE Loop',
                    content: `WHILE loops continue as long as a condition is True.`,
                    code: `count = 0\n\nwhile count < 5:\n    print(f"Count is {count}")\n    count = count + 1\n\nprint("Loop finished!")`
                },
                {
                    title: 'Break and Continue',
                    content: `break exits the loop early. continue skips to the next iteration.`,
                    code: `# break example\nfor i in range(10):\n    if i == 5:\n        break\n    print(i, end=" ")\n\nprint("\\n")\n\n# continue example\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i, end=" ")`
                }
            ]
        },
        lists: {
            title: 'Lists & Arrays',
            sections: [
                {
                    title: 'Creating Lists',
                    content: `Lists store multiple items in order. Items can be any type.`,
                    code: `numbers = [1, 2, 3, 4, 5]\nfruits = ["apple", "banana", "cherry"]\nmixed = [1, "hello", True, 3.14]\n\nprint(numbers)\nprint(fruits)\nprint(f"Length: {len(fruits)}")`
                },
                {
                    title: 'Accessing List Items',
                    content: `Use indices to access items. First item is index 0.`,
                    code: `colors = ["red", "green", "blue", "yellow"]\n\nprint(colors[0])   # red (first)\nprint(colors[-1])  # yellow (last)\nprint(colors[1:3]) # ['green', 'blue'] (slice)`
                },
                {
                    title: 'Modifying Lists',
                    content: `Lists are mutable - you can change, add, and remove items.`,
                    code: `nums = [1, 2, 3]\n\n# Change item\nnums[0] = 10\nprint(nums)  # [10, 2, 3]\n\n# Add items\nnums.append(4)     # Add to end\nprint(nums)  # [10, 2, 3, 4]\n\n# Remove items\nnums.remove(2)     # Remove by value\nprint(nums)  # [10, 3, 4]`
                },
                {
                    title: 'List Methods',
                    content: `Lists have many useful methods for manipulation.`,
                    code: `nums = [3, 1, 4, 1, 5, 9, 2, 6]\n\nprint(f"Length: {len(nums)}")\nprint(f"Max: {max(nums)}")\nprint(f"Min: {min(nums)}")\nprint(f"Sum: {sum(nums)}")\n\nnums.sort()\nprint(f"Sorted: {nums}")`
                },
                {
                    title: 'List Comprehension',
                    content: `A concise way to create lists based on existing lists.`,
                    code: `# Create list of squares\nsquares = []\nfor i in range(1, 6):\n    squares.append(i ** 2)\nprint(squares)\n\n# Same thing with list comprehension\nsquares2 = [i ** 2 for i in range(1, 6)]\nprint(squares2)`
                }
            ]
        },
        functions: {
            title: 'Functions',
            sections: [
                {
                    title: 'Defining Functions',
                    content: `Functions are reusable blocks of code. Define with def, call by name.`,
                    code: `def greet():\n    print("Hello!")\n    print("Welcome to Python!")\n\n# Call the function\ngreet()\ngreet()  # Can call multiple times`
                },
                {
                    title: 'Function Parameters',
                    content: `Functions can accept inputs (parameters) to work with.`,
                    code: `def greet(name):\n    print(f"Hello, {name}!")\n\ndef add(a, b):\n    print(f"{a} + {b} = {a + b}")\n\ngreet("Alice")\ngreet("Bob")\nadd(5, 3)`
                },
                {
                    title: 'Return Values',
                    content: `Functions can return values using return.`,
                    code: `def square(n):\n    return n * n\n\ndef is_even(n):\n    return n % 2 == 0\n\nresult = square(5)\nprint(f"5 squared = {result}")\n\nprint(f"Is 4 even? {is_even(4)}")\nprint(f"Is 7 even? {is_even(7)}")`
                },
                {
                    title: 'Default Parameters',
                    content: `Give parameters default values that are used if no argument is provided.`,
                    code: `def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\n\ngreet("Alice")           # Uses default\ngreet("Bob", "Hi")       # Custom greeting\ngreet("Charlie", "Hey")  # Custom greeting`
                }
            ]
        },
        algorithms: {
            title: 'Basic Algorithms',
            sections: [
                {
                    title: 'Linear Search',
                    content: `Linear search checks each element one by one until finding the target or reaching the end.`,
                    code: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i  # Found!\n    return -1  # Not found\n\nnumbers = [4, 2, 7, 1, 9, 3]\nresult = linear_search(numbers, 7)\nprint(f"Found at index: {result}")`
                },
                {
                    title: 'Binary Search',
                    content: `Binary search is faster but requires a sorted list. It repeatedly divides the search space in half.`,
                    code: `def binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n    \n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nnums = [1, 3, 5, 7, 9, 11]\nprint(binary_search(nums, 7))`
                },
                {
                    title: 'Bubble Sort',
                    content: `Bubble sort repeatedly swaps adjacent elements if they're in the wrong order.`,
                    code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nnums = [64, 34, 25, 12, 22]\nprint(f"Before: {nums}")\nbubble_sort(nums)\nprint(f"After: {nums}")`
                },
                {
                    title: 'Counting Algorithm',
                    content: `Count occurrences of items or find statistics in data.`,
                    code: `def count_item(arr, target):\n    count = 0\n    for item in arr:\n        if item == target:\n            count += 1\n    return count\n\ngrades = ['A', 'B', 'A', 'C', 'A', 'B']\nprint(f"Number of A's: {count_item(grades, 'A')}")`
                }
            ]
        },
        filehandling: {
            title: 'File Handling',
            sections: [
                {
                    title: 'Reading Files',
                    content: `Python uses open() to work with files. (Note: This is simulated in the playground)`,
                    code: `# Reading a file (conceptual example)\n# file = open("data.txt", "r")\n# content = file.read()\n# file.close()\n\n# Simulated example:\ndata = "Line 1\\nLine 2\\nLine 3"\nlines = data.split("\\n")\n\nfor line in lines:\n    print(line)`
                },
                {
                    title: 'Writing Files',
                    content: `Use "w" mode to write (overwrites) or "a" mode to append.`,
                    code: `# Writing to a file (conceptual)\n# file = open("output.txt", "w")\n# file.write("Hello, World!")\n# file.close()\n\n# Simulated example:\noutput = []\noutput.append("First line")\noutput.append("Second line")\n\nfor line in output:\n    print(line)`
                },
                {
                    title: 'CSV Data',
                    content: `CSV (Comma Separated Values) is a common data format.`,
                    code: `# CSV data example\ncsv_data = \"\"\"name,age,grade\nAlice,15,A\nBob,16,B\nCharlie,15,A\"\"\"\n\nlines = csv_data.split("\\n")\nheaders = lines[0].split(",")\n\nfor line in lines[1:]:\n    values = line.split(",")\n    print(f"{values[0]} is {values[1]} years old")`
                }
            ]
        }
    },

    loadLesson: (topicId) => {
        const lesson = PlaygroundView.lessons[topicId];
        if (!lesson) return;
        
        const content = document.getElementById('learn-content');
        content.innerHTML = `
            <div class="lesson-content">
                <h3>${lesson.title}</h3>
                ${lesson.sections.map((section, idx) => `
                    <div class="lesson-section">
                        <h4>${idx + 1}. ${section.title}</h4>
                        <p>${section.content}</p>
                        <div class="lesson-code">
                            <pre><code>${section.code}</code></pre>
                            <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryLesson(\`${section.code.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`)">
                                ▶ Try It
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    tryLesson: (code) => {
        PlaygroundView.showMode('sandbox', document.querySelector('.mode-tab'));
        document.getElementById('code-editor').value = code;
        PlaygroundView.updateLineNumbers();
        PlaygroundView.runCode();
    },

    // ==========================================
    // CODE EXAMPLES
    // ==========================================
    examples: {
        hello: `# Hello World\nprint("Hello, World!")`,
        variables: `# Variables\nname = "Alice"\nage = 15\nprint(f"{name} is {age}")`,
        input: `# User Input\nname = input("Name? ")\nprint(f"Hello, {name}!")`,
        if: `# If Statement\nscore = 75\nif score >= 70:\n    print("Pass!")\nelse:\n    print("Fail")`,
        for: `# FOR Loop\nfor i in range(5):\n    print(f"i = {i}")`,
        while: `# WHILE Loop\nx = 0\nwhile x < 5:\n    print(x)\n    x += 1`,
        nested: `# Nested Loops\nfor i in range(3):\n    for j in range(3):\n        print(f"({i},{j})", end=" ")\n    print()`,
        list: `# Lists\nnums = [1, 2, 3]\nnums.append(4)\nprint(nums)`,
        dict: `# Dictionary\nperson = {"name": "Alice", "age": 15}\nprint(person["name"])`,
        function: `# Functions\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
        recursion: `# Recursion\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)\n\nprint(factorial(5))`,
        linear: `# Linear Search\ndef search(arr, x):\n    for i in range(len(arr)):\n        if arr[i] == x:\n            return i\n    return -1\n\nprint(search([4,2,7,1], 7))`,
        binary: `# Binary Search\ndef binary(arr, x):\n    lo, hi = 0, len(arr)-1\n    while lo <= hi:\n        mid = (lo+hi)//2\n        if arr[mid] == x: return mid\n        elif arr[mid] < x: lo = mid+1\n        else: hi = mid-1\n    return -1\n\nprint(binary([1,3,5,7,9], 5))`,
        bubble: `# Bubble Sort\narr = [64, 34, 25]\nfor i in range(len(arr)):\n    for j in range(len(arr)-1):\n        if arr[j] > arr[j+1]:\n            arr[j], arr[j+1] = arr[j+1], arr[j]\nprint(arr)`
    },

    loadExample: (name) => {
        if (name && PlaygroundView.examples[name]) {
            document.getElementById('code-editor').value = PlaygroundView.examples[name];
            PlaygroundView.updateLineNumbers();
            document.getElementById('example-select').value = '';
        }
    },

    // ==========================================
    // PYTHON INTERPRETER
    // ==========================================
    evalExpr: (expr, vars = {}) => {
        let processed = expr.trim();
        
        // f-strings
        if (processed.startsWith('f"') || processed.startsWith("f'")) {
            const content = processed.slice(2, -1);
            return content.replace(/\{([^}]+)\}/g, (_, e) => PlaygroundView.evalExpr(e, vars));
        }
        
        // Strings
        if ((processed.startsWith('"') && processed.endsWith('"')) ||
            (processed.startsWith("'") && processed.endsWith("'"))) {
            return processed.slice(1, -1);
        }
        
        // Lists
        if (processed.startsWith('[') && processed.endsWith(']')) {
            const inner = processed.slice(1, -1).trim();
            if (!inner) return [];
            return inner.split(',').map(item => PlaygroundView.evalExpr(item.trim(), vars));
        }
        
        // Built-in functions
        if (processed.startsWith('len(')) {
            const arg = processed.match(/len\((.+)\)/)?.[1];
            const val = PlaygroundView.evalExpr(arg, vars);
            return val?.length ?? 0;
        }
        if (processed.startsWith('range(')) {
            const match = processed.match(/range\(([^)]+)\)/);
            if (match) {
                const args = match[1].split(',').map(s => PlaygroundView.evalExpr(s.trim(), vars));
                if (args.length === 1) return { type: 'range', start: 0, end: args[0], step: 1 };
                if (args.length === 2) return { type: 'range', start: args[0], end: args[1], step: 1 };
                return { type: 'range', start: args[0], end: args[1], step: args[2] };
            }
        }
        if (processed.startsWith('int(')) {
            const arg = processed.match(/int\((.+)\)/)?.[1];
            return parseInt(PlaygroundView.evalExpr(arg, vars)) || 0;
        }
        if (processed.startsWith('str(')) {
            const arg = processed.match(/str\((.+)\)/)?.[1];
            return String(PlaygroundView.evalExpr(arg, vars));
        }
        if (processed.startsWith('max(')) {
            const arg = processed.match(/max\((.+)\)/)?.[1];
            const val = PlaygroundView.evalExpr(arg, vars);
            return Array.isArray(val) ? Math.max(...val) : val;
        }
        if (processed.startsWith('min(')) {
            const arg = processed.match(/min\((.+)\)/)?.[1];
            const val = PlaygroundView.evalExpr(arg, vars);
            return Array.isArray(val) ? Math.min(...val) : val;
        }
        if (processed.startsWith('sum(')) {
            const arg = processed.match(/sum\((.+)\)/)?.[1];
            const val = PlaygroundView.evalExpr(arg, vars);
            return Array.isArray(val) ? val.reduce((a, b) => a + b, 0) : 0;
        }
        if (processed.startsWith('abs(')) {
            const arg = processed.match(/abs\((.+)\)/)?.[1];
            return Math.abs(PlaygroundView.evalExpr(arg, vars));
        }
        
        // String methods
        if (processed.includes('.upper()')) {
            const varName = processed.split('.')[0];
            return String(vars[varName] || '').toUpperCase();
        }
        if (processed.includes('.lower()')) {
            const varName = processed.split('.')[0];
            return String(vars[varName] || '').toLowerCase();
        }
        
        // List indexing
        const indexMatch = processed.match(/^(\w+)\[([^\]]+)\]$/);
        if (indexMatch) {
            const arr = vars[indexMatch[1]];
            const idx = PlaygroundView.evalExpr(indexMatch[2], vars);
            if (Array.isArray(arr) || typeof arr === 'string') {
                return idx < 0 ? arr[arr.length + idx] : arr[idx];
            }
        }
        
        // Replace variables
        for (const [name, value] of Object.entries(vars)) {
            const regex = new RegExp(`\\b${name}\\b`, 'g');
            if (typeof value === 'string') {
                processed = processed.replace(regex, `"${value}"`);
            } else if (Array.isArray(value)) {
                processed = processed.replace(regex, JSON.stringify(value));
            } else {
                processed = processed.replace(regex, value);
            }
        }
        
        // Python to JS operators
        processed = processed.replace(/\band\b/g, '&&');
        processed = processed.replace(/\bor\b/g, '||');
        processed = processed.replace(/\bnot\b/g, '!');
        processed = processed.replace(/\bTrue\b/g, 'true');
        processed = processed.replace(/\bFalse\b/g, 'false');
        
        try {
            return eval(processed);
        } catch {
            return processed;
        }
    },

    evalPrint: (content, vars) => {
        // Handle end= parameter
        let endChar = '\n';
        if (content.includes('end=')) {
            const endMatch = content.match(/,\s*end=["']([^"']*)["']/);
            if (endMatch) {
                endChar = endMatch[1];
                content = content.replace(/,\s*end=["'][^"']*["']/, '');
            }
        }
        
        // Parse print arguments
        const parts = [];
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
                if (char === '(' || char === '[') depth++;
                if (char === ')' || char === ']') depth--;
                if (char === ',' && depth === 0) {
                    parts.push(current.trim());
                    current = '';
                    continue;
                }
            }
            current += char;
        }
        if (current.trim()) parts.push(current.trim());
        
        return parts.map(p => {
            const val = PlaygroundView.evalExpr(p, vars);
            if (Array.isArray(val)) return JSON.stringify(val).replace(/"/g, "'");
            return String(val);
        }).join(' ');
    },

    interpretPython: (code) => {
        const lines = code.split('\n');
        const vars = {};
        const output = [];
        
        const executeBlock = (start, end, indent) => {
            let i = start;
            while (i <= end) {
                const line = lines[i];
                if (!line || line.trim() === '' || line.trim().startsWith('#')) {
                    i++;
                    continue;
                }
                
                const lineIndent = line.search(/\S/);
                if (lineIndent < indent && line.trim()) break;
                if (lineIndent > indent) { i++; continue; }
                
                const trimmed = line.trim();
                
                if (trimmed.startsWith('print(')) {
                    output.push(PlaygroundView.evalPrint(trimmed.slice(6, -1), vars));
                }
                else if (trimmed.match(/^\w+\s*=\s*.+$/) && !trimmed.includes('==')) {
                    const match = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
                    if (match) vars[match[1]] = PlaygroundView.evalExpr(match[2], vars);
                }
                else if (trimmed.match(/^\w+\s*[+\-*\/]=\s*.+$/)) {
                    const match = trimmed.match(/^(\w+)\s*([+\-*\/])=\s*(.+)$/);
                    if (match) {
                        const current = vars[match[1]] ?? 0;
                        vars[match[1]] = eval(`${current} ${match[2]} ${PlaygroundView.evalExpr(match[3], vars)}`);
                    }
                }
                else if (trimmed.startsWith('for ')) {
                    const match = trimmed.match(/for\s+(\w+)\s+in\s+(.+):/);
                    if (match) {
                        const varName = match[1];
                        const iterable = PlaygroundView.evalExpr(match[2], vars);
                        
                        let blockEnd = i + 1;
                        while (blockEnd < lines.length && 
                               (lines[blockEnd].trim() === '' || lines[blockEnd].search(/\S/) > indent)) {
                            blockEnd++;
                        }
                        blockEnd--;
                        
                        const iterate = (items) => {
                            for (const item of items) {
                                vars[varName] = item;
                                executeBlock(i + 1, blockEnd, indent + 4);
                            }
                        };
                        
                        if (iterable?.type === 'range') {
                            const items = [];
                            for (let k = iterable.start; iterable.step > 0 ? k < iterable.end : k > iterable.end; k += iterable.step) {
                                items.push(k);
                            }
                            iterate(items);
                        } else if (Array.isArray(iterable)) {
                            iterate(iterable);
                        }
                        
                        i = blockEnd;
                    }
                }
                else if (trimmed.startsWith('while ')) {
                    const condition = trimmed.match(/while\s+(.+):/)?.[1];
                    let blockEnd = i + 1;
                    while (blockEnd < lines.length && 
                           (lines[blockEnd].trim() === '' || lines[blockEnd].search(/\S/) > indent)) {
                        blockEnd++;
                    }
                    blockEnd--;
                    
                    let iterations = 0;
                    while (PlaygroundView.evalExpr(condition, vars) && iterations < 10000) {
                        executeBlock(i + 1, blockEnd, indent + 4);
                        iterations++;
                    }
                    i = blockEnd;
                }
                else if (trimmed.startsWith('if ')) {
                    const condition = trimmed.match(/if\s+(.+):/)?.[1];
                    let blockEnd = i + 1;
                    while (blockEnd < lines.length && 
                           (lines[blockEnd].trim() === '' || lines[blockEnd].search(/\S/) > indent)) {
                        blockEnd++;
                    }
                    blockEnd--;
                    
                    if (PlaygroundView.evalExpr(condition, vars)) {
                        executeBlock(i + 1, blockEnd, indent + 4);
                    }
                    i = blockEnd;
                }
                
                i++;
            }
        };
        
        executeBlock(0, lines.length - 1, 0);
        return { output: output.join('\n'), variables: vars };
    },

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
        
        try {
            const result = PlaygroundView.interpretPython(code);
            output.textContent = result.output || '(No output)';
            output.className = 'output-display';
            document.getElementById('exec-status').textContent = '✅ Completed';
        } catch (e) {
            output.textContent = `Error: ${e.message}`;
            output.className = 'output-display error';
            document.getElementById('exec-status').textContent = '❌ Error';
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
        if (lineNumbers) lineNumbers.scrollTop = editor.scrollTop;
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
    }
};
