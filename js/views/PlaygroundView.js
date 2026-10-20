/**
 * PlaygroundView.js - Enhanced Code Playground
 * Features: Line-by-line execution, complex challenges, comprehensive Python lessons
 * Note: Uses safe expression parsing (no eval) for CSP compliance
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
                                    <option value="arithmetic">Arithmetic</option>
                                </optgroup>
                                <optgroup label="Control Flow">
                                    <option value="if">If Statements</option>
                                    <option value="for">FOR Loop</option>
                                    <option value="while">WHILE Loop</option>
                                </optgroup>
                                <optgroup label="Data Structures">
                                    <option value="list">Lists</option>
                                </optgroup>
                                <optgroup label="Algorithms">
                                    <option value="factorial">Factorial</option>
                                    <option value="fizzbuzz">FizzBuzz</option>
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

total = 0
for i in range(1, 6):
    total = total + i
    print(f"Added {i}, total is {total}")

print(f"Sum of 1-5 = {total}")</textarea>
                    </div>
                    <div class="execution-controls">
                        <button class="btn btn-primary" onclick="PlaygroundView.runCode()">
                            <i class="fas fa-play"></i> Run Code
                        </button>
                        <button class="btn btn-secondary" onclick="PlaygroundView.clearOutput()">
                            <i class="fas fa-eraser"></i> Clear Output
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
                    </div>
                    
                    <div class="tab-content active" id="output-tab">
                        <div class="output-header">
                            <span>Program Output</span>
                            <span class="execution-status" id="exec-status"></span>
                        </div>
                        <pre id="code-output" class="output-display">Click "Run Code" to execute your program</pre>
                    </div>
                    
                    <div class="tab-content" id="variables-tab">
                        <div class="output-header">
                            <span>Variable Watch</span>
                            <span class="var-count" id="var-count">0 variables</span>
                        </div>
                        <div id="variables-display" class="variables-display">
                            <p class="placeholder-text">Run code to see variables</p>
                        </div>
                    </div>
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
                        <p>Choose from ${challenges.length} coding challenges!</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderLearnMode: () => {
        const topics = [
            { id: 'intro', name: 'Introduction to Python', icon: '🐍', lessons: 4 },
            { id: 'variables', name: 'Variables & Data Types', icon: '📦', lessons: 6 },
            { id: 'operators', name: 'Operators', icon: '➕', lessons: 5 },
            { id: 'conditionals', name: 'Selection (If Statements)', icon: '🔀', lessons: 5 },
            { id: 'loops', name: 'Iteration (Loops)', icon: '🔄', lessons: 7 },
            { id: 'lists', name: 'Lists (Arrays)', icon: '📋', lessons: 6 },
            { id: 'functions', name: 'Subprograms (Functions)', icon: '⚙️', lessons: 6 },
            { id: 'algorithms', name: 'Standard Algorithms', icon: '🔍', lessons: 7 },
            { id: 'arrays2d', name: '2D Arrays (Matrices)', icon: '📊', lessons: 4 },
            { id: 'filehandling', name: 'File Handling', icon: '📁', lessons: 4 },
        ];
        
        return `
            <div class="learn-layout">
                <div class="learn-topics">
                    <h3>📖 Python Course</h3>
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
                        <p>Select a topic from the left to start learning!</p>
                        <div class="quick-ref-grid">
                            <div class="ref-item"><code>print("Hi")</code><span>Output</span></div>
                            <div class="ref-item"><code>x = 10</code><span>Variable</span></div>
                            <div class="ref-item"><code>if x > 5:</code><span>Condition</span></div>
                            <div class="ref-item"><code>for i in range(5):</code><span>Loop</span></div>
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
    // SAFE EXPRESSION PARSER (No eval!)
    // ==========================================
    
    // Tokenize expression
    tokenize: (expr) => {
        const tokens = [];
        let i = 0;
        while (i < expr.length) {
            // Skip whitespace
            if (/\s/.test(expr[i])) { i++; continue; }
            
            // Numbers
            if (/\d/.test(expr[i]) || (expr[i] === '-' && /\d/.test(expr[i+1]) && tokens.length === 0)) {
                let num = '';
                if (expr[i] === '-') { num = '-'; i++; }
                while (i < expr.length && /[\d.]/.test(expr[i])) {
                    num += expr[i++];
                }
                tokens.push({ type: 'number', value: parseFloat(num) });
                continue;
            }
            
            // Strings
            if (expr[i] === '"' || expr[i] === "'") {
                const quote = expr[i++];
                let str = '';
                while (i < expr.length && expr[i] !== quote) {
                    if (expr[i] === '\\' && i + 1 < expr.length) {
                        i++;
                        if (expr[i] === 'n') str += '\n';
                        else if (expr[i] === 't') str += '\t';
                        else str += expr[i];
                    } else {
                        str += expr[i];
                    }
                    i++;
                }
                i++; // Skip closing quote
                tokens.push({ type: 'string', value: str });
                continue;
            }
            
            // Operators
            const ops = ['==', '!=', '<=', '>=', '**', '//', '+=', '-=', '*=', '/=', 
                        '+', '-', '*', '/', '%', '<', '>', '(', ')', '[', ']', ',', ':'];
            let matched = false;
            for (const op of ops) {
                if (expr.slice(i, i + op.length) === op) {
                    tokens.push({ type: 'op', value: op });
                    i += op.length;
                    matched = true;
                    break;
                }
            }
            if (matched) continue;
            
            // Identifiers/keywords
            if (/[a-zA-Z_]/.test(expr[i])) {
                let id = '';
                while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
                    id += expr[i++];
                }
                if (id === 'True') tokens.push({ type: 'boolean', value: true });
                else if (id === 'False') tokens.push({ type: 'boolean', value: false });
                else if (id === 'None') tokens.push({ type: 'none', value: null });
                else if (id === 'and') tokens.push({ type: 'op', value: 'and' });
                else if (id === 'or') tokens.push({ type: 'op', value: 'or' });
                else if (id === 'not') tokens.push({ type: 'op', value: 'not' });
                else tokens.push({ type: 'identifier', value: id });
                continue;
            }
            
            i++; // Skip unknown
        }
        return tokens;
    },

    // Safe expression evaluator
    safeEval: (expr, vars = {}) => {
        if (expr === undefined || expr === null || expr === '') return null;
        expr = String(expr).trim();
        
        // Handle f-strings
        if (expr.startsWith('f"') || expr.startsWith("f'")) {
            const quote = expr[1];
            const content = expr.slice(2, -1);
            return content.replace(/\{([^}]+)\}/g, (_, e) => {
                const val = PlaygroundView.safeEval(e, vars);
                if (Array.isArray(val)) return '[' + val.join(', ') + ']';
                return String(val);
            });
        }
        
        // Simple string
        if ((expr.startsWith('"') && expr.endsWith('"')) || 
            (expr.startsWith("'") && expr.endsWith("'"))) {
            return expr.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        }
        
        // List literal
        if (expr.startsWith('[') && expr.endsWith(']')) {
            const inner = expr.slice(1, -1).trim();
            if (!inner) return [];
            return PlaygroundView.parseListItems(inner, vars);
        }
        
        // Built-in functions
        const funcMatch = expr.match(/^(\w+)\((.*)$/);
        if (funcMatch) {
            const fname = funcMatch[1];
            // Find matching closing paren
            let depth = 1, i = fname.length + 1;
            while (i < expr.length && depth > 0) {
                if (expr[i] === '(') depth++;
                else if (expr[i] === ')') depth--;
                i++;
            }
            const argStr = expr.slice(fname.length + 1, i - 1);
            
            switch (fname) {
                case 'len':
                    const lenVal = PlaygroundView.safeEval(argStr, vars);
                    return (lenVal && lenVal.length !== undefined) ? lenVal.length : 0;
                case 'int':
                    return Math.floor(Number(PlaygroundView.safeEval(argStr, vars))) || 0;
                case 'str':
                    return String(PlaygroundView.safeEval(argStr, vars));
                case 'float':
                    return Number(PlaygroundView.safeEval(argStr, vars)) || 0;
                case 'abs':
                    return Math.abs(PlaygroundView.safeEval(argStr, vars));
                case 'max':
                    const maxVal = PlaygroundView.safeEval(argStr, vars);
                    return Array.isArray(maxVal) ? Math.max(...maxVal) : maxVal;
                case 'min':
                    const minVal = PlaygroundView.safeEval(argStr, vars);
                    return Array.isArray(minVal) ? Math.min(...minVal) : minVal;
                case 'sum':
                    const sumVal = PlaygroundView.safeEval(argStr, vars);
                    return Array.isArray(sumVal) ? sumVal.reduce((a, b) => a + b, 0) : 0;
                case 'range':
                    const rangeArgs = PlaygroundView.parseArgs(argStr, vars);
                    if (rangeArgs.length === 1) return { type: 'range', start: 0, end: rangeArgs[0], step: 1 };
                    if (rangeArgs.length === 2) return { type: 'range', start: rangeArgs[0], end: rangeArgs[1], step: 1 };
                    return { type: 'range', start: rangeArgs[0], end: rangeArgs[1], step: rangeArgs[2] };
                case 'type':
                    const typeVal = PlaygroundView.safeEval(argStr, vars);
                    if (Array.isArray(typeVal)) return "<class 'list'>";
                    if (typeof typeVal === 'number') return Number.isInteger(typeVal) ? "<class 'int'>" : "<class 'float'>";
                    if (typeof typeVal === 'string') return "<class 'str'>";
                    if (typeof typeVal === 'boolean') return "<class 'bool'>";
                    return "<class 'NoneType'>";
                case 'print':
                    return null; // Handled separately
                case 'input':
                    return 'test'; // Simulated input
            }
        }
        
        // String methods
        if (expr.includes('.upper()')) {
            const varName = expr.split('.')[0].trim();
            return String(vars[varName] || '').toUpperCase();
        }
        if (expr.includes('.lower()')) {
            const varName = expr.split('.')[0].trim();
            return String(vars[varName] || '').toLowerCase();
        }
        if (expr.includes('.strip()')) {
            const varName = expr.split('.')[0].trim();
            return String(vars[varName] || '').trim();
        }
        
        // List indexing: arr[i] or string[i]
        const indexMatch = expr.match(/^(\w+)\[(.+)\]$/);
        if (indexMatch) {
            const arr = vars[indexMatch[1]];
            const idx = PlaygroundView.safeEval(indexMatch[2], vars);
            if (Array.isArray(arr) || typeof arr === 'string') {
                const index = idx < 0 ? arr.length + idx : idx;
                return arr[index];
            }
        }
        
        // Slicing: arr[start:end]
        const sliceMatch = expr.match(/^(\w+)\[([^:]*):([^\]]*)\]$/);
        if (sliceMatch) {
            const arr = vars[sliceMatch[1]];
            if (Array.isArray(arr) || typeof arr === 'string') {
                const start = sliceMatch[2] ? PlaygroundView.safeEval(sliceMatch[2], vars) : 0;
                const end = sliceMatch[3] ? PlaygroundView.safeEval(sliceMatch[3], vars) : arr.length;
                return typeof arr === 'string' ? arr.slice(start, end) : arr.slice(start, end);
            }
        }
        
        // Reverse slice: text[::-1]
        if (expr.match(/^(\w+)\[::-1\]$/)) {
            const varName = expr.match(/^(\w+)/)[1];
            const val = vars[varName];
            if (typeof val === 'string') return val.split('').reverse().join('');
            if (Array.isArray(val)) return [...val].reverse();
        }
        
        // Parse and evaluate expression
        return PlaygroundView.evalExpression(expr, vars);
    },

    parseArgs: (argStr, vars) => {
        const args = [];
        let current = '';
        let depth = 0;
        
        for (const char of argStr) {
            if (char === '(' || char === '[') depth++;
            else if (char === ')' || char === ']') depth--;
            else if (char === ',' && depth === 0) {
                if (current.trim()) args.push(PlaygroundView.safeEval(current.trim(), vars));
                current = '';
                continue;
            }
            current += char;
        }
        if (current.trim()) args.push(PlaygroundView.safeEval(current.trim(), vars));
        return args;
    },

    parseListItems: (inner, vars) => {
        const items = [];
        let current = '';
        let depth = 0;
        let inString = false;
        let stringChar = '';
        
        for (let i = 0; i < inner.length; i++) {
            const char = inner[i];
            
            if ((char === '"' || char === "'") && !inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar && inString) {
                inString = false;
            }
            
            if (!inString) {
                if (char === '[' || char === '(') depth++;
                else if (char === ']' || char === ')') depth--;
                else if (char === ',' && depth === 0) {
                    if (current.trim()) items.push(PlaygroundView.safeEval(current.trim(), vars));
                    current = '';
                    continue;
                }
            }
            current += char;
        }
        if (current.trim()) items.push(PlaygroundView.safeEval(current.trim(), vars));
        return items;
    },

    evalExpression: (expr, vars) => {
        expr = expr.trim();
        
        // Check for variable first
        if (vars.hasOwnProperty(expr)) {
            return vars[expr];
        }
        
        // Numbers
        if (/^-?\d+(\.\d+)?$/.test(expr)) {
            return parseFloat(expr);
        }
        
        // Boolean
        if (expr === 'True') return true;
        if (expr === 'False') return false;
        if (expr === 'None') return null;
        
        // Handle comparisons and logical ops
        // Order matters: check multi-char ops first
        const ops = [
            { op: ' and ', fn: (a, b, v) => PlaygroundView.evalExpression(a, v) && PlaygroundView.evalExpression(b, v) },
            { op: ' or ', fn: (a, b, v) => PlaygroundView.evalExpression(a, v) || PlaygroundView.evalExpression(b, v) },
            { op: '==', fn: (a, b, v) => PlaygroundView.evalExpression(a, v) === PlaygroundView.evalExpression(b, v) },
            { op: '!=', fn: (a, b, v) => PlaygroundView.evalExpression(a, v) !== PlaygroundView.evalExpression(b, v) },
            { op: '<=', fn: (a, b, v) => PlaygroundView.evalExpression(a, v) <= PlaygroundView.evalExpression(b, v) },
            { op: '>=', fn: (a, b, v) => PlaygroundView.evalExpression(a, v) >= PlaygroundView.evalExpression(b, v) },
            { op: '<', fn: (a, b, v) => PlaygroundView.evalExpression(a, v) < PlaygroundView.evalExpression(b, v) },
            { op: '>', fn: (a, b, v) => PlaygroundView.evalExpression(a, v) > PlaygroundView.evalExpression(b, v) },
        ];
        
        for (const { op, fn } of ops) {
            const idx = expr.indexOf(op);
            if (idx > 0) {
                return fn(expr.slice(0, idx), expr.slice(idx + op.length), vars);
            }
        }
        
        // Handle not
        if (expr.startsWith('not ')) {
            return !PlaygroundView.evalExpression(expr.slice(4), vars);
        }
        
        // Handle arithmetic (respecting precedence)
        // First: + and - (left to right, but not inside parens)
        let depth = 0;
        for (let i = expr.length - 1; i >= 0; i--) {
            const char = expr[i];
            if (char === ')') depth++;
            else if (char === '(') depth--;
            else if (depth === 0 && (char === '+' || char === '-') && i > 0) {
                // Check it's not a unary minus
                const prev = expr[i - 1];
                if (!/[\+\-\*\/\%\(]/.test(prev)) {
                    const left = PlaygroundView.evalExpression(expr.slice(0, i), vars);
                    const right = PlaygroundView.evalExpression(expr.slice(i + 1), vars);
                    if (typeof left === 'string' || typeof right === 'string') {
                        return String(left) + String(right);
                    }
                    return char === '+' ? left + right : left - right;
                }
            }
        }
        
        // Then: *, /, //, %
        depth = 0;
        for (let i = expr.length - 1; i >= 0; i--) {
            const char = expr[i];
            if (char === ')') depth++;
            else if (char === '(') depth--;
            else if (depth === 0) {
                if (expr.slice(i - 1, i + 1) === '//') {
                    const left = PlaygroundView.evalExpression(expr.slice(0, i - 1), vars);
                    const right = PlaygroundView.evalExpression(expr.slice(i + 1), vars);
                    return Math.floor(left / right);
                }
                if (char === '*' && expr[i + 1] !== '*' && expr[i - 1] !== '*') {
                    const left = PlaygroundView.evalExpression(expr.slice(0, i), vars);
                    const right = PlaygroundView.evalExpression(expr.slice(i + 1), vars);
                    // String repetition
                    if (typeof left === 'string') return left.repeat(right);
                    if (typeof right === 'string') return right.repeat(left);
                    return left * right;
                }
                if (char === '/' && expr[i + 1] !== '/') {
                    const left = PlaygroundView.evalExpression(expr.slice(0, i), vars);
                    const right = PlaygroundView.evalExpression(expr.slice(i + 1), vars);
                    return left / right;
                }
                if (char === '%') {
                    const left = PlaygroundView.evalExpression(expr.slice(0, i), vars);
                    const right = PlaygroundView.evalExpression(expr.slice(i + 1), vars);
                    return left % right;
                }
            }
        }
        
        // Then: ** (exponent)
        depth = 0;
        for (let i = 0; i < expr.length - 1; i++) {
            const char = expr[i];
            if (char === '(') depth++;
            else if (char === ')') depth--;
            else if (depth === 0 && expr.slice(i, i + 2) === '**') {
                const left = PlaygroundView.evalExpression(expr.slice(0, i), vars);
                const right = PlaygroundView.evalExpression(expr.slice(i + 2), vars);
                return Math.pow(left, right);
            }
        }
        
        // Handle parentheses
        if (expr.startsWith('(') && expr.endsWith(')')) {
            return PlaygroundView.evalExpression(expr.slice(1, -1), vars);
        }
        
        // Variable lookup
        if (vars.hasOwnProperty(expr)) {
            return vars[expr];
        }
        
        return expr; // Return as-is if can't parse
    },

    // ==========================================
    // PYTHON INTERPRETER
    // ==========================================
    interpretPython: (code) => {
        const lines = code.split('\n');
        const vars = {};
        const output = [];
        
        const executeBlock = (start, end, indent, localVars = {}) => {
            const allVars = { ...vars, ...localVars };
            let i = start;
            
            while (i <= end) {
                const line = lines[i];
                if (!line || line.trim() === '' || line.trim().startsWith('#')) {
                    i++;
                    continue;
                }
                
                const lineIndent = line.search(/\S/);
                if (lineIndent >= 0 && lineIndent < indent && line.trim()) break;
                if (lineIndent > indent) { i++; continue; }
                
                const trimmed = line.trim();
                
                // Print statement
                if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
                    const content = trimmed.slice(6, -1);
                    output.push(PlaygroundView.evalPrint(content, { ...vars, ...localVars }));
                }
                // Variable assignment
                else if (trimmed.match(/^\w+\s*=\s*.+$/) && !trimmed.startsWith('if ') && 
                         !trimmed.startsWith('while ') && !trimmed.startsWith('for ') &&
                         !trimmed.includes('==')) {
                    const match = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
                    if (match) {
                        const val = PlaygroundView.safeEval(match[2], { ...vars, ...localVars });
                        vars[match[1]] = val;
                        if (localVars.hasOwnProperty(match[1])) localVars[match[1]] = val;
                    }
                }
                // Augmented assignment
                else if (trimmed.match(/^\w+\s*[+\-*\/]=\s*.+$/)) {
                    const match = trimmed.match(/^(\w+)\s*([+\-*\/])=\s*(.+)$/);
                    if (match) {
                        const current = vars[match[1]] ?? localVars[match[1]] ?? 0;
                        const val = PlaygroundView.safeEval(match[3], { ...vars, ...localVars });
                        let newVal;
                        switch (match[2]) {
                            case '+': newVal = typeof current === 'string' ? current + val : current + val; break;
                            case '-': newVal = current - val; break;
                            case '*': newVal = current * val; break;
                            case '/': newVal = current / val; break;
                        }
                        vars[match[1]] = newVal;
                    }
                }
                // List operations
                else if (trimmed.match(/^\w+\.append\(.+\)$/)) {
                    const match = trimmed.match(/^(\w+)\.append\((.+)\)$/);
                    if (match && Array.isArray(vars[match[1]])) {
                        vars[match[1]].push(PlaygroundView.safeEval(match[2], { ...vars, ...localVars }));
                    }
                }
                else if (trimmed.match(/^\w+\.remove\(.+\)$/)) {
                    const match = trimmed.match(/^(\w+)\.remove\((.+)\)$/);
                    if (match && Array.isArray(vars[match[1]])) {
                        const val = PlaygroundView.safeEval(match[2], { ...vars, ...localVars });
                        const idx = vars[match[1]].indexOf(val);
                        if (idx > -1) vars[match[1]].splice(idx, 1);
                    }
                }
                // List index assignment
                else if (trimmed.match(/^\w+\[.+\]\s*=\s*.+$/)) {
                    const match = trimmed.match(/^(\w+)\[(.+)\]\s*=\s*(.+)$/);
                    if (match) {
                        const idx = PlaygroundView.safeEval(match[2], { ...vars, ...localVars });
                        const val = PlaygroundView.safeEval(match[3], { ...vars, ...localVars });
                        if (Array.isArray(vars[match[1]])) {
                            vars[match[1]][idx] = val;
                        }
                    }
                }
                // Swap: a, b = b, a
                else if (trimmed.match(/^\w+\s*,\s*\w+\s*=\s*.+,\s*.+$/)) {
                    const match = trimmed.match(/^(\w+)\s*,\s*(\w+)\s*=\s*(.+),\s*(.+)$/);
                    if (match) {
                        const val1 = PlaygroundView.safeEval(match[3].trim(), { ...vars, ...localVars });
                        const val2 = PlaygroundView.safeEval(match[4].trim(), { ...vars, ...localVars });
                        vars[match[1]] = val1;
                        vars[match[2]] = val2;
                    }
                }
                // FOR loop
                else if (trimmed.startsWith('for ') && trimmed.endsWith(':')) {
                    const match = trimmed.match(/for\s+(\w+)\s+in\s+(.+):/);
                    if (match) {
                        const varName = match[1];
                        const iterable = PlaygroundView.safeEval(match[2], { ...vars, ...localVars });
                        
                        let blockEnd = i + 1;
                        while (blockEnd < lines.length && 
                               (lines[blockEnd].trim() === '' || 
                                lines[blockEnd].search(/\S/) > indent ||
                                lines[blockEnd].trim().startsWith('#'))) {
                            blockEnd++;
                        }
                        blockEnd--;
                        
                        let items = [];
                        if (iterable && iterable.type === 'range') {
                            for (let k = iterable.start; 
                                 iterable.step > 0 ? k < iterable.end : k > iterable.end; 
                                 k += iterable.step) {
                                items.push(k);
                            }
                        } else if (Array.isArray(iterable)) {
                            items = iterable;
                        } else if (typeof iterable === 'string') {
                            items = iterable.split('');
                        }
                        
                        for (const item of items) {
                            vars[varName] = item;
                            executeBlock(i + 1, blockEnd, indent + 4, localVars);
                        }
                        
                        i = blockEnd;
                    }
                }
                // WHILE loop
                else if (trimmed.startsWith('while ') && trimmed.endsWith(':')) {
                    const condition = trimmed.match(/while\s+(.+):/)?.[1];
                    
                    let blockEnd = i + 1;
                    while (blockEnd < lines.length && 
                           (lines[blockEnd].trim() === '' || 
                            lines[blockEnd].search(/\S/) > indent ||
                            lines[blockEnd].trim().startsWith('#'))) {
                        blockEnd++;
                    }
                    blockEnd--;
                    
                    let iterations = 0;
                    while (PlaygroundView.safeEval(condition, { ...vars, ...localVars }) && iterations < 10000) {
                        executeBlock(i + 1, blockEnd, indent + 4, localVars);
                        iterations++;
                    }
                    i = blockEnd;
                }
                // IF statement
                else if (trimmed.startsWith('if ') && trimmed.endsWith(':')) {
                    const condition = trimmed.match(/if\s+(.+):/)?.[1];
                    
                    let blockEnd = i + 1;
                    while (blockEnd < lines.length && 
                           (lines[blockEnd].trim() === '' || 
                            lines[blockEnd].search(/\S/) > indent ||
                            lines[blockEnd].trim().startsWith('#'))) {
                        blockEnd++;
                    }
                    blockEnd--;
                    
                    // Find elif/else
                    let hasElse = false;
                    let elseStart = -1;
                    let k = blockEnd + 1;
                    while (k < lines.length) {
                        const nextLine = lines[k]?.trim();
                        if (!nextLine || nextLine.startsWith('#')) { k++; continue; }
                        const nextIndent = lines[k].search(/\S/);
                        if (nextIndent === indent) {
                            if (nextLine.startsWith('elif ') || nextLine.startsWith('else:')) {
                                if (!hasElse) {
                                    hasElse = true;
                                    elseStart = k;
                                }
                                // Find this block's end
                                let elseEnd = k + 1;
                                while (elseEnd < lines.length && 
                                       (lines[elseEnd].trim() === '' || 
                                        lines[elseEnd].search(/\S/) > indent)) {
                                    elseEnd++;
                                }
                                blockEnd = elseEnd - 1;
                                k = elseEnd;
                            } else {
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                    
                    if (PlaygroundView.safeEval(condition, { ...vars, ...localVars })) {
                        // Find the actual if block end (before elif/else)
                        let ifBlockEnd = i + 1;
                        while (ifBlockEnd < lines.length) {
                            const l = lines[ifBlockEnd]?.trim();
                            if (!l || l.startsWith('#')) { ifBlockEnd++; continue; }
                            const li = lines[ifBlockEnd].search(/\S/);
                            if (li <= indent && l && !l.startsWith('#')) break;
                            ifBlockEnd++;
                        }
                        ifBlockEnd--;
                        executeBlock(i + 1, ifBlockEnd, indent + 4, localVars);
                    } else if (hasElse) {
                        // Handle elif/else chain
                        let found = false;
                        let j = elseStart;
                        while (j <= blockEnd && !found) {
                            const elseLine = lines[j]?.trim();
                            if (elseLine?.startsWith('elif ')) {
                                const elifCond = elseLine.match(/elif\s+(.+):/)?.[1];
                                if (PlaygroundView.safeEval(elifCond, { ...vars, ...localVars })) {
                                    let elifEnd = j + 1;
                                    while (elifEnd < lines.length && 
                                           (lines[elifEnd].trim() === '' || 
                                            lines[elifEnd].search(/\S/) > indent)) {
                                        elifEnd++;
                                    }
                                    executeBlock(j + 1, elifEnd - 1, indent + 4, localVars);
                                    found = true;
                                }
                            } else if (elseLine === 'else:') {
                                let elseEnd = j + 1;
                                while (elseEnd < lines.length && 
                                       (lines[elseEnd].trim() === '' || 
                                        lines[elseEnd].search(/\S/) > indent)) {
                                    elseEnd++;
                                }
                                executeBlock(j + 1, elseEnd - 1, indent + 4, localVars);
                                found = true;
                            }
                            j++;
                        }
                    }
                    
                    i = blockEnd;
                }
                
                i++;
            }
        };
        
        executeBlock(0, lines.length - 1, 0);
        return { output: output.join('\n'), variables: vars };
    },

    evalPrint: (content, vars) => {
        // Handle end= parameter
        let endChar = '\n';
        const endMatch = content.match(/,\s*end\s*=\s*["']([^"']*)["']\s*$/);
        if (endMatch) {
            endChar = endMatch[1];
            content = content.replace(/,\s*end\s*=\s*["'][^"']*["']\s*$/, '');
        }
        
        // Parse arguments
        const parts = [];
        let current = '';
        let depth = 0;
        let inString = false;
        let stringChar = '';
        
        for (let i = 0; i < content.length; i++) {
            const char = content[i];
            
            if ((char === '"' || char === "'") && !inString && content[i-1] !== 'f') {
                inString = true;
                stringChar = char;
            } else if (char === stringChar && inString && content[i-1] !== '\\') {
                inString = false;
            }
            
            if (!inString) {
                if (char === '(' || char === '[') depth++;
                else if (char === ')' || char === ']') depth--;
                else if (char === ',' && depth === 0) {
                    if (current.trim()) parts.push(current.trim());
                    current = '';
                    continue;
                }
            }
            current += char;
        }
        if (current.trim()) parts.push(current.trim());
        
        const result = parts.map(p => {
            const val = PlaygroundView.safeEval(p, vars);
            if (Array.isArray(val)) return '[' + val.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ') + ']';
            return val === null ? 'None' : String(val);
        }).join(' ');
        
        return result;
    },

    // ==========================================
    // CHALLENGES - Aligned with Edexcel IGCSE 4CP0 Paper 2
    // ==========================================
    getChallenges: () => [
        // ============ EXISTING CHALLENGES ============
        {
            id: 'hello', name: 'Hello World', icon: '👋', difficulty: 'Beginner', xp: 50,
            description: 'Print "Hello, World!" to the screen.',
            hints: ['Use the print() function', 'Put the text inside quotes'],
            starterCode: '# Print Hello, World!\n',
            tests: [{ expected: 'Hello, World!' }]
        },
        {
            id: 'sum_two', name: 'Add Numbers', icon: '➕', difficulty: 'Beginner', xp: 50,
            description: 'Create a=5 and b=3, then print their sum (8).',
            hints: ['Use + to add numbers', 'print(a + b)'],
            starterCode: '# Add two numbers\na = 5\nb = 3\n',
            tests: [{ expected: '8' }]
        },
        {
            id: 'even_odd', name: 'Even or Odd', icon: '🔢', difficulty: 'Beginner', xp: 50,
            description: 'Given num=7, print "Even" or "Odd".',
            hints: ['Use if num % 2 == 0', 'MOD (%) gives remainder after division'],
            starterCode: 'num = 7\n',
            tests: [{ expected: 'Odd' }]
        },
        {
            id: 'countdown', name: 'Countdown', icon: '🚀', difficulty: 'Beginner', xp: 50,
            description: 'Print 5 to 1, then "Blast off!"',
            hints: ['Use range(5, 0, -1) to count down', 'Print "Blast off!" after the loop'],
            starterCode: '# Countdown\n',
            tests: [{ contains: ['5', '4', '3', '2', '1', 'Blast off!'] }]
        },
        
        // ============ NEW BEGINNER CHALLENGES (8) ============
        {
            id: 'greet_user', name: 'Greeting Message', icon: '🙋', difficulty: 'Beginner', xp: 50,
            description: 'Create a variable name="Alice" and print "Hello, Alice!" using an f-string.\n\nExample output:\nHello, Alice!',
            hints: ['Use f-strings: f"Hello, {name}!"', 'f-strings let you embed variables in text'],
            starterCode: '# Create a greeting\nname = "Alice"\n',
            tests: [{ expected: 'Hello, Alice!' }]
        },
        {
            id: 'rectangle_area', name: 'Rectangle Area', icon: '📐', difficulty: 'Beginner', xp: 50,
            description: 'Calculate the area of a rectangle with length=8 and width=5. Print the result (40).\n\nFormula: area = length × width',
            hints: ['Area = length * width', 'Store result in a variable, then print it'],
            starterCode: '# Calculate rectangle area\nlength = 8\nwidth = 5\n',
            tests: [{ expected: '40' }]
        },
        {
            id: 'temperature', name: 'Celsius to Fahrenheit', icon: '🌡️', difficulty: 'Beginner', xp: 50,
            description: 'Convert celsius=25 to Fahrenheit and print the result (77.0).\n\nFormula: F = (C × 9/5) + 32',
            hints: ['Formula: fahrenheit = (celsius * 9/5) + 32', 'Order of operations matters - use brackets'],
            starterCode: '# Temperature conversion\ncelsius = 25\n',
            tests: [{ expected: '77.0' }]
        },
        {
            id: 'swap_vars', name: 'Swap Variables', icon: '🔀', difficulty: 'Beginner', xp: 50,
            description: 'Given a=10 and b=20, swap their values and print both.\n\nExpected output:\na = 20\nb = 10',
            hints: ['Use a temporary variable: temp = a', 'Or use Python swap: a, b = b, a'],
            starterCode: '# Swap two variables\na = 10\nb = 20\n# Swap them\n\nprint(f"a = {a}")\nprint(f"b = {b}")',
            tests: [{ contains: ['a = 20', 'b = 10'] }]
        },
        {
            id: 'avg_three', name: 'Average of Three', icon: '📊', difficulty: 'Beginner', xp: 50,
            description: 'Calculate and print the average of num1=15, num2=20, num3=25.\n\nExpected output: 20.0',
            hints: ['Average = (sum of all) / (count)', 'Add all three and divide by 3'],
            starterCode: '# Calculate average\nnum1 = 15\nnum2 = 20\nnum3 = 25\n',
            tests: [{ expected: '20.0' }]
        },
        {
            id: 'remainder', name: 'DIV and MOD', icon: '➗', difficulty: 'Beginner', xp: 50,
            description: 'Given dividend=17 and divisor=5, print the quotient (integer division) and remainder on separate lines.\n\nExpected output:\n3\n2',
            hints: ['Use // for integer division (DIV)', 'Use % for remainder (MOD)'],
            starterCode: '# DIV and MOD operations\ndividend = 17\ndivisor = 5\n',
            tests: [{ contains: ['3', '2'] }]
        },
        {
            id: 'string_length', name: 'String Length', icon: '📏', difficulty: 'Beginner', xp: 50,
            description: 'Given text="Computer Science", print the number of characters including spaces.\n\nExpected output: 16',
            hints: ['Use len() to get string length', 'Spaces count as characters'],
            starterCode: '# Find string length\ntext = "Computer Science"\n',
            tests: [{ expected: '16' }]
        },
        {
            id: 'string_upper', name: 'Uppercase Output', icon: '🔠', difficulty: 'Beginner', xp: 50,
            description: 'Given message="hello world", print it in uppercase.\n\nExpected output: HELLO WORLD',
            hints: ['Use .upper() method on strings', 'Example: text.upper()'],
            starterCode: '# Convert to uppercase\nmessage = "hello world"\n',
            tests: [{ expected: 'HELLO WORLD' }]
        },
        
        // ============ EXISTING INTERMEDIATE CHALLENGES ============
        {
            id: 'sum_range', name: 'Sum 1 to 10', icon: '📊', difficulty: 'Intermediate', xp: 100,
            description: 'Print the sum of numbers from 1 to 10 (55).\n\nUse a FOR loop to add each number to a running total.',
            hints: ['Use a loop with total += i', 'Start total at 0', 'range(1, 11) gives 1 to 10'],
            starterCode: 'total = 0\n',
            tests: [{ expected: '55' }]
        },
        {
            id: 'factorial', name: 'Factorial', icon: '❗', difficulty: 'Intermediate', xp: 100,
            description: 'Calculate and print 5! (factorial of 5 = 120).\n\n5! = 5 × 4 × 3 × 2 × 1 = 120',
            hints: ['Multiply 1*2*3*4*5', 'Use a loop and multiply each number', 'Start result at 1 (not 0!)'],
            starterCode: 'n = 5\nresult = 1\n',
            tests: [{ expected: '120' }]
        },
        {
            id: 'fizzbuzz', name: 'FizzBuzz', icon: '🎯', difficulty: 'Intermediate', xp: 100,
            description: 'Print numbers 1-15, but:\n- Print "Fizz" for multiples of 3\n- Print "Buzz" for multiples of 5\n- Print "FizzBuzz" for multiples of both',
            hints: ['Check 15 first (divisible by both)', 'Use elif for the conditions', 'if i % 3 == 0 and i % 5 == 0'],
            starterCode: 'for i in range(1, 16):\n    pass\n',
            tests: [{ contains: ['FizzBuzz', 'Fizz', 'Buzz'] }]
        },
        {
            id: 'reverse', name: 'Reverse String', icon: '🔄', difficulty: 'Intermediate', xp: 100,
            description: 'Print "Python" reversed (nohtyP).\n\nUse string slicing with a negative step.',
            hints: ['Use text[::-1] for reverse', 'Slicing: [start:stop:step]', '-1 step goes backwards'],
            starterCode: 'text = "Python"\n',
            tests: [{ expected: 'nohtyP' }]
        },
        {
            id: 'find_max', name: 'Find Maximum', icon: '📈', difficulty: 'Intermediate', xp: 100,
            description: 'Find and print the maximum value in [3, 7, 2, 9, 4].\n\nDo NOT use the built-in max() function - write the algorithm yourself.',
            hints: ['Start with first element as largest', 'Loop through and compare each', 'Update largest if current is bigger'],
            starterCode: 'nums = [3, 7, 2, 9, 4]\nlargest = nums[0]\n',
            tests: [{ expected: '9' }]
        },
        
        // ============ NEW INTERMEDIATE CHALLENGES (8) ============
        {
            id: 'count_vowels', name: 'Count Vowels', icon: '🔤', difficulty: 'Intermediate', xp: 100,
            description: 'Count and print the number of vowels (a,e,i,o,u) in "Programming is fun".\n\nExpected output: 5',
            hints: ['Loop through each character', 'Check if char in "aeiouAEIOU"', 'Use a counter variable'],
            starterCode: '# Count vowels\ntext = "Programming is fun"\ncount = 0\n',
            tests: [{ expected: '5' }]
        },
        {
            id: 'multiplication_table', name: 'Times Table', icon: '✖️', difficulty: 'Intermediate', xp: 100,
            description: 'Print the 7 times table from 1 to 10.\n\nFormat each line as: 7 x 1 = 7\n\nExpected output includes:\n7 x 1 = 7\n7 x 2 = 14\n... (up to 10)',
            hints: ['Use a FOR loop from 1 to 10', 'Use f-string for formatting', 'Calculate 7 * i for each'],
            starterCode: '# Print 7 times table\nnum = 7\n',
            tests: [{ contains: ['7 x 1 = 7', '7 x 5 = 35', '7 x 10 = 70'] }]
        },
        {
            id: 'grade_calc', name: 'Grade Calculator', icon: '📝', difficulty: 'Intermediate', xp: 100,
            description: 'Given score=73, print the grade using this scale:\n- A: 90-100\n- B: 80-89\n- C: 70-79\n- D: 60-69\n- F: below 60\n\nExpected output: C',
            hints: ['Use if-elif-else chain', 'Check from highest to lowest', 'score >= 90 for A, etc.'],
            starterCode: '# Grade calculator\nscore = 73\n',
            tests: [{ expected: 'C' }]
        },
        {
            id: 'password_check', name: 'Password Validation', icon: '🔑', difficulty: 'Intermediate', xp: 100,
            description: 'Check if password="Secret123" meets these criteria:\n- At least 8 characters long\n- Contains at least one digit\n\nPrint "Valid" or "Invalid".\n\nExpected output: Valid',
            hints: ['Use len() for length check', 'Loop to check for digits', 'char.isdigit() checks if digit'],
            starterCode: '# Password validation\npassword = "Secret123"\nhas_digit = False\n',
            tests: [{ expected: 'Valid' }]
        },
        {
            id: 'list_sum_even', name: 'Sum Even Numbers', icon: '🔢', difficulty: 'Intermediate', xp: 100,
            description: 'Sum only the EVEN numbers in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].\n\nExpected output: 30\n(2+4+6+8+10=30)',
            hints: ['Use % 2 == 0 to check even', 'Add to total only if even', 'Loop through the list'],
            starterCode: '# Sum even numbers only\nnums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\ntotal = 0\n',
            tests: [{ expected: '30' }]
        },
        {
            id: 'list_filter', name: 'Filter Passing Scores', icon: '✅', difficulty: 'Intermediate', xp: 100,
            description: 'Given scores=[45, 78, 62, 39, 88, 55, 91], create and print a new list containing only passing scores (50 or above).\n\nExpected output: [78, 62, 88, 55, 91]',
            hints: ['Create empty list: passing = []', 'Use append() to add items', 'Check if score >= 50'],
            starterCode: '# Filter passing scores\nscores = [45, 78, 62, 39, 88, 55, 91]\npassing = []\n',
            tests: [{ contains: ['78', '62', '88', '55', '91'] }]
        },
        {
            id: 'count_occurrences', name: 'Count Target Value', icon: '🔍', difficulty: 'Intermediate', xp: 100,
            description: 'Count how many times the value 3 appears in [1, 3, 5, 3, 7, 3, 9, 2, 3].\n\nExpected output: 4',
            hints: ['Use a counter variable', 'Loop and check if item == target', 'Increment counter when found'],
            starterCode: '# Count occurrences\nnums = [1, 3, 5, 3, 7, 3, 9, 2, 3]\ntarget = 3\ncount = 0\n',
            tests: [{ expected: '4' }]
        },
        {
            id: 'nested_loop', name: 'Star Rectangle', icon: '⭐', difficulty: 'Intermediate', xp: 100,
            description: 'Print a 3×5 rectangle of stars using nested loops.\n\nExpected output:\n*****\n*****\n*****',
            hints: ['Outer loop for rows (3)', 'Inner loop for columns (5)', 'Use print() with end="" for same line'],
            starterCode: '# Print star rectangle\nrows = 3\ncols = 5\n',
            tests: [{ contains: ['*****'] }]
        },
        
        // ============ EXISTING ADVANCED CHALLENGES ============
        {
            id: 'prime', name: 'Prime Check', icon: '🔐', difficulty: 'Advanced', xp: 150,
            description: 'Check if n=17 is prime. Print "Prime" or "Not prime".\n\nA prime number is only divisible by 1 and itself.',
            hints: ['Check divisors from 2 to n-1', 'If any divides evenly, not prime', 'Use a flag variable'],
            starterCode: 'n = 17\nis_prime = True\n',
            tests: [{ expected: 'Prime' }]
        },
        {
            id: 'palindrome', name: 'Palindrome', icon: '🪞', difficulty: 'Advanced', xp: 150,
            description: 'Check if "radar" is a palindrome (same forwards and backwards). Print "Yes" or "No".',
            hints: ['Compare word to word[::-1]', 'Or compare first half to reversed second half', 'A palindrome reads same both ways'],
            starterCode: 'word = "radar"\n',
            tests: [{ expected: 'Yes' }]
        },
        {
            id: 'fibonacci', name: 'Fibonacci', icon: '🌀', difficulty: 'Advanced', xp: 150,
            description: 'Print the first 10 Fibonacci numbers.\n\nSequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34\n(Each number = sum of previous two)',
            hints: ['Start with a=0, b=1', 'Each = sum of previous two', 'Use: a, b = b, a + b'],
            starterCode: 'a = 0\nb = 1\n',
            tests: [{ contains: ['0', '1', '1', '2', '3', '5', '8', '13', '21', '34'] }]
        },
        
        // ============ NEW ADVANCED CHALLENGES (6) ============
        {
            id: 'bubble_sort', name: 'Bubble Sort', icon: '🫧', difficulty: 'Advanced', xp: 150,
            description: 'Sort the list [64, 34, 25, 12, 22, 11, 90] using the BUBBLE SORT algorithm.\n\nPrint the sorted list.\n\nExpected output: [11, 12, 22, 25, 34, 64, 90]',
            hints: ['Compare adjacent elements', 'Swap if in wrong order', 'Repeat until no swaps needed', 'Use nested loops'],
            starterCode: '# Bubble Sort algorithm\nnums = [64, 34, 25, 12, 22, 11, 90]\nn = len(nums)\n\n# Implement bubble sort here\n\nprint(nums)',
            tests: [{ contains: ['11', '12', '22', '25', '34', '64', '90'] }]
        },
        {
            id: 'linear_search', name: 'Linear Search', icon: '🔎', difficulty: 'Advanced', xp: 150,
            description: 'Implement LINEAR SEARCH to find target=7 in [4, 2, 7, 1, 9, 3].\n\nPrint the index if found, or -1 if not found.\n\nExpected output: 2',
            hints: ['Loop through each element', 'Compare each with target', 'Return index when found', 'Use enumerate() or index counter'],
            starterCode: '# Linear Search algorithm\nnums = [4, 2, 7, 1, 9, 3]\ntarget = 7\nfound_index = -1\n\n# Implement linear search here\n\nprint(found_index)',
            tests: [{ expected: '2' }]
        },
        {
            id: 'binary_search', name: 'Binary Search', icon: '🎯', difficulty: 'Advanced', xp: 150,
            description: 'Implement BINARY SEARCH to find target=23 in sorted list [2, 5, 8, 12, 16, 23, 38, 56, 72, 91].\n\nPrint the index if found, or -1 if not found.\n\nExpected output: 5',
            hints: ['List MUST be sorted first', 'Use low, mid, high pointers', 'mid = (low + high) // 2', 'Halve search space each step'],
            starterCode: '# Binary Search algorithm (list is pre-sorted)\nnums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\ntarget = 23\nlow = 0\nhigh = len(nums) - 1\nfound_index = -1\n\n# Implement binary search here\n\nprint(found_index)',
            tests: [{ expected: '5' }]
        },
        {
            id: '2d_array_sum', name: '2D Array Sum', icon: '📊', difficulty: 'Advanced', xp: 150,
            description: 'Given a 2D array (matrix), calculate and print the sum of all elements.\n\nMatrix:\n[[1, 2, 3],\n [4, 5, 6],\n [7, 8, 9]]\n\nExpected output: 45',
            hints: ['Use nested loops', 'Outer loop for rows', 'Inner loop for columns', 'Access element: matrix[row][col]'],
            starterCode: '# Sum all elements in 2D array\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\ntotal = 0\n\n# Sum all elements\n\nprint(total)',
            tests: [{ expected: '45' }]
        },
        {
            id: '2d_array_max', name: '2D Array Maximum', icon: '🏆', difficulty: 'Advanced', xp: 150,
            description: 'Find and print the maximum value in this 2D array:\n\n[[3, 8, 2],\n [9, 1, 5],\n [4, 7, 6]]\n\nExpected output: 9',
            hints: ['Initialize max with first element: matrix[0][0]', 'Use nested loops to check all', 'Update max when larger found'],
            starterCode: '# Find maximum in 2D array\nmatrix = [[3, 8, 2], [9, 1, 5], [4, 7, 6]]\nmax_val = matrix[0][0]\n\n# Find the maximum\n\nprint(max_val)',
            tests: [{ expected: '9' }]
        },
        {
            id: 'file_simulation', name: 'File Data Processing', icon: '📁', difficulty: 'Advanced', xp: 150,
            description: 'Simulate reading student data from a "file" (given as a list).\n\nData format: ["Alice,85", "Bob,92", "Charlie,78", "Diana,88"]\n\nParse each record, calculate the average score, and print:\n- Each student name and score\n- The class average\n\nExpected output includes:\nAlice: 85\nBob: 92\nCharlie: 78\nDiana: 88\nAverage: 85.75',
            hints: ['Use .split(",") to separate name and score', 'Convert score to int: int(parts[1])', 'Calculate average: total / count', 'This simulates file handling from Paper 2'],
            starterCode: '# Simulate file processing\nfile_data = ["Alice,85", "Bob,92", "Charlie,78", "Diana,88"]\ntotal = 0\ncount = 0\n\n# Process each record\n\n# Print average',
            tests: [{ contains: ['Alice: 85', 'Bob: 92', 'Average: 85.75'] }]
        }
    ],

    getCompletedChallenges: () => {
        return JSON.parse(localStorage.getItem('csmaster_completed_challenges') || '[]');
    },

    loadChallenge: (id) => {
        const challenge = PlaygroundView.getChallenges().find(c => c.id === id);
        if (!challenge) return;
        
        PlaygroundView.currentChallenge = challenge;
        
        // Handle both old single hint and new hints array format
        const hintsHtml = Array.isArray(challenge.hints) 
            ? challenge.hints.map((h, i) => `<p>💡 Hint ${i + 1}: ${h}</p>`).join('')
            : `<p>💡 ${challenge.hint || 'No hints available'}</p>`;
        
        document.getElementById('challenge-workspace').innerHTML = `
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
                        <p>${challenge.description.replace(/\n/g, '<br>')}</p>
                        <button class="btn btn-small btn-secondary" onclick="document.getElementById('hint').style.display='block'">💡 Show Hints</button>
                        <div id="hint" style="display:none;margin-top:8px;color:var(--yellow)">${hintsHtml}</div>
                    </div>
                    <div class="challenge-editor-section">
                        <div class="ce-header">
                            <span>Your Code</span>
                            <div class="ce-actions">
                                <button class="btn btn-small btn-secondary" onclick="PlaygroundView.resetChallenge()">Reset</button>
                                <button class="btn btn-small btn-secondary" onclick="PlaygroundView.runChallenge()">▶ Test</button>
                                <button class="btn btn-small btn-primary" onclick="PlaygroundView.submitChallenge()">✓ Submit</button>
                            </div>
                        </div>
                        <textarea id="challenge-editor" onkeydown="PlaygroundView.handleTab(event)">${challenge.starterCode}</textarea>
                    </div>
                    <div class="challenge-output-section">
                        <h4>Output</h4>
                        <pre id="challenge-output" class="challenge-output">Run to see output...</pre>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelectorAll('.challenge-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.challenge-item[onclick*="${id}"]`)?.classList.add('active');
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
            output.className = 'challenge-output';
        } catch (e) {
            output.textContent = 'Error: ' + e.message;
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
            const text = result.output.trim();
            const test = challenge.tests[0];
            
            let passed = test.contains 
                ? test.contains.every(s => text.includes(s))
                : text.includes(test.expected);
            
            if (passed) {
                output.innerHTML = '<span class="success">✅ Correct!</span>\n\n' + text;
                const completed = PlaygroundView.getCompletedChallenges();
                if (!completed.includes(challenge.id)) {
                    completed.push(challenge.id);
                    localStorage.setItem('csmaster_completed_challenges', JSON.stringify(completed));
                    if (typeof AppState !== 'undefined') AppState.addXP(challenge.xp);
                    if (typeof Toast !== 'undefined') Toast.show(`🎉 +${challenge.xp} XP!`, 'success');
                    document.querySelector(`.challenge-item[onclick*="${challenge.id}"]`)?.classList.add('completed');
                }
            } else {
                output.innerHTML = '<span class="error">❌ Try again!</span>\n\nYour output:\n' + text;
            }
        } catch (e) {
            output.innerHTML = '<span class="error">Error: ' + e.message + '</span>';
        }
    },

    // ==========================================
    // LESSONS - Comprehensive Python Course for Edexcel IGCSE 4CP0
    // ==========================================
    lessons: {
        intro: {
            title: 'Introduction to Python',
            sections: [
                { 
                    title: 'Hello World', 
                    content: 'The print() function displays output to the screen. Text strings must be enclosed in quotation marks (single or double).', 
                    code: 'print("Hello, World!")\nprint(\'Single quotes work too!\')' 
                },
                { 
                    title: 'Comments', 
                    content: 'Comments explain code and are ignored when running. They start with # symbol. Good practice: add comments to explain complex logic.', 
                    code: '# This is a comment - Python ignores it\nprint("This runs")  # Comments can be on same line\n\n# Use comments to explain your code\n# Calculate area of rectangle\narea = 5 * 3\nprint(area)' 
                },
                { 
                    title: 'Program Flow', 
                    content: 'Python executes code line by line from top to bottom. Each instruction runs in sequence (sequential execution).', 
                    code: 'print("Step 1: First this runs")\nprint("Step 2: Then this runs")\nprint("Step 3: Finally this runs")' 
                },
                { 
                    title: 'Print Multiple Items', 
                    content: 'The print() function can output multiple items separated by commas. By default, they are separated by spaces.', 
                    code: 'name = "Alice"\nage = 16\nprint("Name:", name)\nprint("Age:", age)\nprint(name, "is", age, "years old")' 
                }
            ]
        },
        variables: {
            title: 'Variables & Data Types',
            sections: [
                { 
                    title: 'Creating Variables', 
                    content: 'Variables store data in memory. Use meaningful names! The assignment operator (=) assigns a value to a variable. Variable names are case-sensitive.', 
                    code: '# Good variable names are descriptive\nstudent_name = "Alice"\nstudent_age = 16\ntest_score = 85.5\n\nprint(student_name)\nprint(student_age)\nprint(test_score)' 
                },
                { 
                    title: 'Data Types', 
                    content: 'Python has several built-in data types:<br>• <b>str</b> (string) - Text in quotes<br>• <b>int</b> (integer) - Whole numbers<br>• <b>float</b> - Decimal numbers<br>• <b>bool</b> (boolean) - True or False', 
                    code: '# Four main data types for IGCSE\ntext = "Hello"      # str (string)\nwhole = 42          # int (integer)\ndecimal = 3.14      # float\nflag = True         # bool (boolean)\n\nprint(type(text))\nprint(type(whole))\nprint(type(decimal))\nprint(type(flag))' 
                },
                { 
                    title: 'f-Strings (Formatted Strings)', 
                    content: 'f-strings let you embed variables directly in text. Put f before the string and wrap variables in curly braces {}. This is the modern, preferred way to format output.', 
                    code: 'name = "Bob"\nage = 15\nscore = 92.5\n\n# f-string - modern way (preferred)\nprint(f"Name: {name}")\nprint(f"{name} is {age} years old")\nprint(f"Score: {score}%")' 
                },
                { 
                    title: 'Type Conversion (Casting)', 
                    content: 'Convert between data types using int(), float(), str(). Essential when combining numbers with text or reading user input.', 
                    code: '# String to Integer\ntext_num = "42"\nreal_num = int(text_num)\nprint(real_num + 8)  # 50\n\n# Integer to String\nage = 16\nmessage = "Age: " + str(age)\nprint(message)\n\n# Float to Integer (removes decimal)\nprice = 19.99\nwhole_price = int(price)  # 19\nprint(whole_price)' 
                },
                { 
                    title: 'Input from User', 
                    content: 'The input() function reads text from the user. It ALWAYS returns a string, so convert to int or float if needed for calculations.', 
                    code: '# Input always returns a string\nname = "Alice"  # Simulated input\nage_str = "16"  # Simulated input\n\n# Convert string to integer for math\nage = int(age_str)\nnext_year = age + 1\n\nprint(f"Hello {name}!")\nprint(f"Next year you will be {next_year}")' 
                },
                { 
                    title: 'Constants', 
                    content: 'Constants are values that should not change. By convention, use UPPERCASE names. Python does not enforce this, but it signals intent to other programmers.', 
                    code: '# Constants use UPPERCASE by convention\nPI = 3.14159\nMAX_SCORE = 100\nTAX_RATE = 0.20\n\n# Using constants\nradius = 5\narea = PI * radius ** 2\nprint(f"Circle area: {area}")\n\ntotal = 80\ntax = total * TAX_RATE\nprint(f"Tax: {tax}")' 
                }
            ]
        },
        operators: {
            title: 'Operators',
            sections: [
                { 
                    title: 'Arithmetic Operators', 
                    content: 'Python supports standard math operations plus some special ones:<br>• + Addition<br>• - Subtraction<br>• * Multiplication<br>• / Division (always gives float)<br>• // Integer Division (DIV)<br>• % Modulus (MOD - remainder)<br>• ** Exponent (power)', 
                    code: 'a = 17\nb = 5\n\nprint(f"Addition: {a} + {b} = {a + b}")      # 22\nprint(f"Subtraction: {a} - {b} = {a - b}")  # 12\nprint(f"Multiply: {a} * {b} = {a * b}")     # 85\nprint(f"Division: {a} / {b} = {a / b}")     # 3.4\nprint(f"DIV: {a} // {b} = {a // b}")        # 3\nprint(f"MOD: {a} % {b} = {a % b}")          # 2\nprint(f"Power: {a} ** 2 = {a ** 2}")        # 289' 
                },
                { 
                    title: 'DIV and MOD Explained', 
                    content: '<b>DIV (//):</b> Integer division - gives whole number result<br><b>MOD (%):</b> Modulus - gives the remainder<br><br>Example: 17 ÷ 5 = 3 remainder 2<br>So: 17 // 5 = 3 and 17 % 5 = 2', 
                    code: '# DIV and MOD are essential for IGCSE!\ntotal_minutes = 135\n\n# Convert to hours and minutes\nhours = total_minutes // 60   # DIV gives whole hours\nmins = total_minutes % 60     # MOD gives remaining mins\n\nprint(f"{total_minutes} minutes = {hours}h {mins}m")\n\n# Check if number is even or odd\nnum = 17\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")' 
                },
                { 
                    title: 'Comparison Operators', 
                    content: 'Compare values and return True or False:<br>• == Equal to (NOT single =)<br>• != Not equal to<br>• < Less than<br>• > Greater than<br>• <= Less than or equal<br>• >= Greater than or equal', 
                    code: 'x = 10\ny = 5\n\nprint(f"{x} == {y}: {x == y}")   # False\nprint(f"{x} != {y}: {x != y}")   # True\nprint(f"{x} > {y}: {x > y}")     # True\nprint(f"{x} < {y}: {x < y}")     # False\nprint(f"{x} >= 10: {x >= 10}")   # True\nprint(f"{y} <= 5: {y <= 5}")     # True' 
                },
                { 
                    title: 'Logical Operators', 
                    content: 'Combine conditions:<br>• <b>and</b> - Both must be True<br>• <b>or</b> - At least one must be True<br>• <b>not</b> - Reverses True/False', 
                    code: 'age = 16\nhas_ticket = True\n\n# AND - both conditions must be true\nif age >= 12 and has_ticket:\n    print("Can enter cinema")\n\n# OR - at least one must be true\nday = "Saturday"\nif day == "Saturday" or day == "Sunday":\n    print("It is the weekend!")\n\n# NOT - reverses the condition\nraining = False\nif not raining:\n    print("No umbrella needed!")' 
                },
                { 
                    title: 'Operator Precedence', 
                    content: 'Order of operations (BIDMAS):<br>1. Brackets ()<br>2. Indices ** (power)<br>3. Division /, //, %<br>4. Multiplication *<br>5. Addition +<br>6. Subtraction -<br><br>Use brackets to make order clear!', 
                    code: '# Without brackets - follows BIDMAS\nresult1 = 2 + 3 * 4      # 3*4 first = 14\nprint(f"2 + 3 * 4 = {result1}")\n\n# With brackets - changes order\nresult2 = (2 + 3) * 4    # 2+3 first = 20\nprint(f"(2 + 3) * 4 = {result2}")\n\n# Power has high precedence\nresult3 = 2 ** 3 * 2     # 8 * 2 = 16\nprint(f"2 ** 3 * 2 = {result3}")' 
                }
            ]
        },
        conditionals: {
            title: 'Selection (If Statements)',
            sections: [
                { 
                    title: 'Basic If Statement', 
                    content: 'The IF statement executes code only when a condition is True. Indentation (4 spaces) is crucial - it defines the code block.', 
                    code: 'age = 18\n\nif age >= 18:\n    print("You are an adult")\n    print("You can vote!")\n\nprint("Program continues here")' 
                },
                { 
                    title: 'If-Else Statement', 
                    content: 'ELSE provides an alternative when the IF condition is False. Exactly one block will run.', 
                    code: 'temperature = 25\n\nif temperature >= 30:\n    print("It is hot!")\n    print("Stay hydrated")\nelse:\n    print("Temperature is OK")\n    print("Enjoy your day")' 
                },
                { 
                    title: 'If-Elif-Else Chain', 
                    content: 'ELIF (else if) checks multiple conditions in sequence. Only the FIRST matching block runs. Order matters - check strictest conditions first!', 
                    code: 'score = 75\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelif score >= 60:\n    grade = "D"\nelse:\n    grade = "F"\n\nprint(f"Score: {score} = Grade {grade}")' 
                },
                { 
                    title: 'Nested If Statements', 
                    content: 'If statements can be placed inside other if statements. Each level needs more indentation. Use this for complex decision trees.', 
                    code: 'age = 16\nhas_id = True\n\nif age >= 18:\n    print("Adult")\n    if has_id:\n        print("Can buy alcohol")\n    else:\n        print("Need ID to buy alcohol")\nelse:\n    print("Under 18")\n    if age >= 16:\n        print("Can buy lottery tickets")\n    else:\n        print("Too young for lottery")' 
                },
                { 
                    title: 'Complex Conditions', 
                    content: 'Combine multiple conditions using AND, OR, NOT. Use brackets for clarity.', 
                    code: '# Check if year is a leap year\nyear = 2024\n\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print(f"{year} is a leap year")\nelse:\n    print(f"{year} is not a leap year")\n\n# Range check\nage = 25\nif age >= 18 and age <= 65:\n    print("Working age")\n\n# Membership check\nday = "Monday"\nif day == "Saturday" or day == "Sunday":\n    print("Weekend!")\nelse:\n    print("Weekday")' 
                }
            ]
        },
        loops: {
            title: 'Iteration (Loops)',
            sections: [
                { 
                    title: 'FOR Loop with Range', 
                    content: 'FOR loops repeat a set number of times. range(n) generates numbers 0 to n-1. The loop variable updates automatically each iteration.', 
                    code: '# Basic range - 0 to 4\nprint("range(5): 0 to 4")\nfor i in range(5):\n    print(i)\n\n# Counting from 1 to 5\nprint("range(1, 6): 1 to 5")\nfor i in range(1, 6):\n    print(i)' 
                },
                { 
                    title: 'Range with Step', 
                    content: 'range(start, stop, step) gives more control:<br>• start: First number (included)<br>• stop: End number (excluded)<br>• step: How much to add each time', 
                    code: '# Count by 2s\nprint("Even numbers 0-10:")\nfor i in range(0, 11, 2):\n    print(i)\n\n# Countdown (negative step)\nprint("Countdown:")\nfor i in range(5, 0, -1):\n    print(i)\nprint("Blast off!")' 
                },
                { 
                    title: 'FOR Loop Through Lists', 
                    content: 'FOR loops can iterate through each item in a list (or string). The loop variable takes each value in turn.', 
                    code: '# Loop through list items\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(f"I like {fruit}")\n\n# Loop through characters in string\nword = "PYTHON"\nfor letter in word:\n    print(letter)' 
                },
                { 
                    title: 'FOR Loop with Index', 
                    content: 'Sometimes you need both the index AND the value. Use range(len(list)) to access by position.', 
                    code: '# Access by index\ncolors = ["red", "green", "blue"]\nfor i in range(len(colors)):\n    print(f"Index {i}: {colors[i]}")\n\n# Useful for modifying list elements\nnums = [1, 2, 3, 4, 5]\nfor i in range(len(nums)):\n    nums[i] = nums[i] * 2\nprint(nums)' 
                },
                { 
                    title: 'WHILE Loop', 
                    content: 'WHILE loops repeat while a condition is True. Useful when you do not know how many iterations needed. WARNING: Ensure condition eventually becomes False!', 
                    code: '# Basic while loop\ncount = 0\nwhile count < 5:\n    print(f"Count is {count}")\n    count = count + 1\n\nprint("Loop finished!")\n\n# While with condition\npassword = ""\nattempts = 0\nwhile password != "secret" and attempts < 3:\n    password = "wrong"  # Simulated input\n    attempts = attempts + 1\n    print(f"Attempt {attempts}")' 
                },
                { 
                    title: 'Totalling and Counting', 
                    content: 'Common patterns using loops:<br>• <b>Totalling:</b> Add up values (start with 0)<br>• <b>Counting:</b> Count occurrences (start with 0)', 
                    code: '# TOTALLING - sum all values\nnums = [10, 20, 30, 40, 50]\ntotal = 0\nfor num in nums:\n    total = total + num\nprint(f"Sum: {total}")\n\n# COUNTING - count matches\nscores = [85, 92, 78, 95, 88, 91]\npass_count = 0\nfor score in scores:\n    if score >= 80:\n        pass_count = pass_count + 1\nprint(f"Passed: {pass_count}")' 
                },
                { 
                    title: 'Nested Loops', 
                    content: 'A loop inside another loop. The inner loop runs completely for each iteration of the outer loop.', 
                    code: '# Print a rectangle of stars\nfor row in range(3):\n    for col in range(5):\n        print("*", end="")\n    print()  # New line after each row\n\nprint()\n\n# Times tables\nfor i in range(1, 4):\n    for j in range(1, 4):\n        result = i * j\n        print(f"{i} x {j} = {result}")' 
                }
            ]
        },
        lists: {
            title: 'Lists (Arrays)',
            sections: [
                { 
                    title: 'Creating Lists', 
                    content: 'Lists store multiple items in order. Items are separated by commas and enclosed in square brackets. Lists can hold any data type.', 
                    code: '# Creating lists\nnumbers = [10, 20, 30, 40, 50]\nnames = ["Alice", "Bob", "Charlie"]\nmixed = [1, "hello", 3.14, True]\nempty = []\n\nprint(numbers)\nprint(names)\nprint(f"List length: {len(numbers)}")' 
                },
                { 
                    title: 'Accessing Elements (Indexing)', 
                    content: 'Access items by their index (position). Indices start at 0! Use negative indices to count from the end: -1 is last item.', 
                    code: 'colors = ["red", "green", "blue", "yellow"]\n#           0       1        2        3\n#          -4      -3       -2       -1\n\nprint(colors[0])    # First: red\nprint(colors[2])    # Third: blue\nprint(colors[-1])   # Last: yellow\nprint(colors[-2])   # Second last: blue' 
                },
                { 
                    title: 'Modifying Lists', 
                    content: 'Lists are mutable - you can change them.<br>• Change item: list[index] = new_value<br>• Add item: list.append(item)<br>• Remove item: list.remove(item)', 
                    code: '# Modify by index\nnums = [1, 2, 3, 4, 5]\nnums[2] = 99\nprint(f"After change: {nums}")\n\n# Append (add to end)\nnums.append(6)\nprint(f"After append: {nums}")\n\n# Remove by value\nnums.remove(99)\nprint(f"After remove: {nums}")' 
                },
                { 
                    title: 'List Slicing', 
                    content: 'Extract a portion of a list using slicing: list[start:stop]<br>• start: First index (included)<br>• stop: End index (excluded)<br>• Omit start = from beginning<br>• Omit stop = to end', 
                    code: 'nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\nprint(nums[2:5])    # [2, 3, 4]\nprint(nums[:4])     # [0, 1, 2, 3]\nprint(nums[6:])     # [6, 7, 8, 9]\nprint(nums[::2])    # [0, 2, 4, 6, 8] every 2nd\nprint(nums[::-1])   # Reversed!' 
                },
                { 
                    title: 'List Functions', 
                    content: 'Useful built-in functions for lists:<br>• len() - Number of items<br>• sum() - Total of numeric list<br>• max() - Largest value<br>• min() - Smallest value', 
                    code: 'scores = [85, 92, 78, 95, 88]\n\nprint(f"Count: {len(scores)}")\nprint(f"Total: {sum(scores)}")\nprint(f"Highest: {max(scores)}")\nprint(f"Lowest: {min(scores)}")\n\n# Calculate average\naverage = sum(scores) / len(scores)\nprint(f"Average: {average}")' 
                },
                { 
                    title: 'Searching in Lists', 
                    content: 'Check if item exists and find its position.', 
                    code: 'fruits = ["apple", "banana", "cherry", "date"]\n\n# Check if item exists\nif "banana" in fruits:\n    print("Banana found!")\n\nif "grape" not in fruits:\n    print("No grape")\n\n# Find index of item\nnames = ["Alice", "Bob", "Charlie"]\ntarget = "Bob"\nfor i in range(len(names)):\n    if names[i] == target:\n        print(f"Found {target} at index {i}")' 
                }
            ]
        },
        functions: {
            title: 'Subprograms (Functions)',
            sections: [
                { 
                    title: 'Why Use Functions?', 
                    content: 'Functions are reusable blocks of code.<br>Benefits:<br>• Avoid code repetition (DRY principle)<br>• Make code easier to read and maintain<br>• Break complex problems into smaller parts<br>• Can be tested independently', 
                    code: '# Without function - repeated code\nprint("*" * 20)\nprint("Welcome!")\nprint("*" * 20)\n\nprint("*" * 20)\nprint("Goodbye!")\nprint("*" * 20)' 
                },
                { 
                    title: 'Defining Functions', 
                    content: 'Use def keyword to define a function. Function body must be indented. Call the function by name with parentheses.', 
                    code: '# Define a function\ndef display_border():\n    print("*" * 20)\n\ndef greet():\n    print("Hello!")\n    print("Welcome to Python")\n\n# Call the functions\ndisplay_border()\ngreet()\ndisplay_border()' 
                },
                { 
                    title: 'Parameters (Arguments)', 
                    content: 'Parameters pass data INTO a function. Define them in parentheses. Values passed when calling are called arguments.', 
                    code: '# Function with one parameter\ndef greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Alice")\ngreet("Bob")\n\n# Function with multiple parameters\ndef add_numbers(a, b):\n    result = a + b\n    print(f"{a} + {b} = {result}")\n\nadd_numbers(5, 3)\nadd_numbers(10, 20)' 
                },
                { 
                    title: 'Return Values', 
                    content: 'Functions can send data back using return. The returned value can be stored in a variable or used directly.', 
                    code: '# Function that returns a value\ndef calculate_area(length, width):\n    area = length * width\n    return area\n\n# Store returned value\nroom_area = calculate_area(5, 4)\nprint(f"Room area: {room_area}")\n\n# Use directly in expression\ntotal = calculate_area(3, 3) + calculate_area(2, 2)\nprint(f"Total area: {total}")' 
                },
                { 
                    title: 'Multiple Returns & Validation', 
                    content: 'Functions can have multiple return statements (usually with conditions). Return stops function execution immediately.', 
                    code: '# Function with validation\ndef calculate_grade(score):\n    if score < 0 or score > 100:\n        return "Invalid score"\n    \n    if score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    elif score >= 60:\n        return "D"\n    else:\n        return "F"\n\nprint(calculate_grade(85))\nprint(calculate_grade(72))\nprint(calculate_grade(150))' 
                },
                { 
                    title: 'Procedures vs Functions', 
                    content: '<b>Procedure:</b> Performs action, no return value<br><b>Function:</b> Returns a value<br><br>In Python, both use def. A procedure is just a function without return.', 
                    code: '# PROCEDURE - performs action, no return\ndef display_menu():\n    print("=== MENU ===")\n    print("1. Start")\n    print("2. Exit")\n\n# FUNCTION - returns a value\ndef get_maximum(a, b):\n    if a > b:\n        return a\n    else:\n        return b\n\n# Call procedure (no value captured)\ndisplay_menu()\n\n# Call function (capture return value)\nbigger = get_maximum(10, 25)\nprint(f"Maximum: {bigger}")' 
                }
            ]
        },
        algorithms: {
            title: 'Standard Algorithms',
            sections: [
                { 
                    title: 'Linear Search', 
                    content: 'Search through list one item at a time. Returns index if found, -1 if not found. Works on unsorted lists. Time complexity: O(n)', 
                    code: '# Linear Search Algorithm\nnums = [4, 2, 7, 1, 9, 3]\ntarget = 7\nfound_index = -1\n\nfor i in range(len(nums)):\n    if nums[i] == target:\n        found_index = i\n\nif found_index != -1:\n    print(f"Found {target} at index {found_index}")\nelse:\n    print(f"{target} not found")' 
                },
                { 
                    title: 'Binary Search', 
                    content: 'Efficient search for SORTED lists. Repeatedly halve the search space. Much faster than linear for large lists. Time complexity: O(log n)', 
                    code: '# Binary Search (list MUST be sorted!)\nnums = [2, 5, 8, 12, 16, 23, 38, 56]\ntarget = 23\n\nlow = 0\nhigh = len(nums) - 1\nfound_index = -1\n\nwhile low <= high:\n    mid = (low + high) // 2\n    if nums[mid] == target:\n        found_index = mid\n        low = high + 1  # Exit loop\n    elif nums[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\n\nprint(f"Found at index: {found_index}")' 
                },
                { 
                    title: 'Bubble Sort', 
                    content: 'Compare adjacent elements and swap if in wrong order. Repeat until no swaps needed. Simple but inefficient for large lists.', 
                    code: '# Bubble Sort Algorithm\nnums = [64, 34, 25, 12, 22, 11, 90]\nn = len(nums)\n\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if nums[j] > nums[j + 1]:\n            # Swap adjacent elements\n            nums[j], nums[j + 1] = nums[j + 1], nums[j]\n\nprint(f"Sorted: {nums}")' 
                },
                { 
                    title: 'Finding Maximum', 
                    content: 'Iterate through list tracking the largest value seen. Initialize with first element.', 
                    code: '# Find Maximum Algorithm\nnums = [34, 67, 23, 89, 45, 12]\n\nmax_val = nums[0]  # Start with first\nmax_idx = 0\n\nfor i in range(1, len(nums)):\n    if nums[i] > max_val:\n        max_val = nums[i]\n        max_idx = i\n\nprint(f"Maximum: {max_val}")\nprint(f"At index: {max_idx}")' 
                },
                { 
                    title: 'Finding Minimum', 
                    content: 'Same as maximum but track smallest value instead.', 
                    code: '# Find Minimum Algorithm\nnums = [34, 67, 23, 89, 45, 12]\n\nmin_val = nums[0]  # Start with first\n\nfor i in range(1, len(nums)):\n    if nums[i] < min_val:\n        min_val = nums[i]\n\nprint(f"Minimum: {min_val}")' 
                },
                { 
                    title: 'Calculating Average', 
                    content: 'Sum all values then divide by count. Watch out for division by zero!', 
                    code: '# Calculate Average Algorithm\nscores = [85, 92, 78, 95, 88, 76]\n\n# Manual calculation (exam style)\ntotal = 0\ncount = 0\n\nfor score in scores:\n    total = total + score\n    count = count + 1\n\nif count > 0:\n    average = total / count\n    print(f"Average: {average}")\nelse:\n    print("No data!")' 
                },
                { 
                    title: 'Counting Occurrences', 
                    content: 'Count how many times a specific value appears in a list.', 
                    code: '# Count Occurrences Algorithm\ndata = [1, 3, 5, 3, 7, 3, 9, 2, 3]\ntarget = 3\ncount = 0\n\nfor item in data:\n    if item == target:\n        count = count + 1\n\nprint(f"{target} appears {count} times")\n\n# Count vowels in text\ntext = "Hello World"\nvowels = "aeiouAEIOU"\nvowel_count = 0\n\nfor char in text:\n    if char in vowels:\n        vowel_count = vowel_count + 1\n\nprint(f"Vowels: {vowel_count}")' 
                }
            ]
        },
        arrays2d: {
            title: '2D Arrays (Matrices)',
            sections: [
                { 
                    title: 'Creating 2D Arrays', 
                    content: 'A 2D array is a list of lists - think of it as a table with rows and columns. Access elements using two indices: [row][column]', 
                    code: '# 2D Array - list of lists\nmatrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Access element: matrix[row][column]\nprint(matrix[0][0])  # Row 0, Col 0 = 1\nprint(matrix[1][2])  # Row 1, Col 2 = 6\nprint(matrix[2][1])  # Row 2, Col 1 = 8' 
                },
                { 
                    title: 'Iterating 2D Arrays', 
                    content: 'Use nested loops to access all elements. Outer loop for rows, inner loop for columns.', 
                    code: '# Print entire 2D array\nmatrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\nfor row in range(len(matrix)):\n    for col in range(len(matrix[row])):\n        print(matrix[row][col], end=" ")\n    print()  # New line after each row' 
                },
                { 
                    title: 'Sum All Elements', 
                    content: 'Calculate the total of all elements in a 2D array.', 
                    code: '# Sum all elements in 2D array\nmatrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\ntotal = 0\nfor row in range(len(matrix)):\n    for col in range(len(matrix[row])):\n        total = total + matrix[row][col]\n\nprint(f"Sum of all elements: {total}")' 
                },
                { 
                    title: 'Find Maximum in 2D', 
                    content: 'Find the largest value in a 2D array.', 
                    code: '# Find maximum in 2D array\nmatrix = [\n    [3, 8, 2],\n    [9, 1, 5],\n    [4, 7, 6]\n]\n\nmax_val = matrix[0][0]\n\nfor row in range(len(matrix)):\n    for col in range(len(matrix[row])):\n        if matrix[row][col] > max_val:\n            max_val = matrix[row][col]\n\nprint(f"Maximum value: {max_val}")' 
                }
            ]
        },
        filehandling: {
            title: 'File Handling (Simulation)',
            sections: [
                { 
                    title: 'Why File Handling?', 
                    content: 'Files store data permanently. When a program ends, variables are lost - but files persist. Common operations: Read, Write, Append.', 
                    code: '# In the exam, file handling is tested\n# Here we simulate with lists\n\n# Simulated file data (each item = one line)\nfile_data = [\n    "Alice,85",\n    "Bob,92",\n    "Charlie,78"\n]\n\n# Process each "line"\nfor line in file_data:\n    print(line)' 
                },
                { 
                    title: 'Reading File Data', 
                    content: 'Simulating reading records from a file. Each line is typically one record. Split lines to extract fields.', 
                    code: '# Simulate reading student records\nfile_data = [\n    "Alice,85",\n    "Bob,92",\n    "Charlie,78"\n]\n\nfor line in file_data:\n    parts = line.split(",")  # Split by comma\n    name = parts[0]\n    score = int(parts[1])\n    print(f"Student: {name}, Score: {score}")' 
                },
                { 
                    title: 'Processing File Data', 
                    content: 'Calculate statistics from file data - a common exam question pattern.', 
                    code: '# Calculate average from file data\nfile_data = [\n    "Alice,85",\n    "Bob,92",\n    "Charlie,78",\n    "Diana,88"\n]\n\ntotal = 0\ncount = 0\n\nfor line in file_data:\n    parts = line.split(",")\n    score = int(parts[1])\n    total = total + score\n    count = count + 1\n\naverage = total / count\nprint(f"Class average: {average}")' 
                },
                { 
                    title: 'Writing to File (Simulation)', 
                    content: 'Simulating writing new data to a file. In reality, you would use file operations.', 
                    code: '# Simulate writing to a file\noutput_data = []  # Our "file"\n\n# Add records\noutput_data.append("David,95")\noutput_data.append("Eve,81")\n\n# Display "file" contents\nprint("File contents:")\nfor line in output_data:\n    print(line)' 
                }
            ]
        }
    },

    loadLesson: (topicId) => {
        const lesson = PlaygroundView.lessons[topicId];
        if (!lesson) return;
        
        document.getElementById('learn-content').innerHTML = `
            <div class="lesson-content">
                <h3>${lesson.title}</h3>
                ${lesson.sections.map((s, i) => `
                    <div class="lesson-section">
                        <h4>${i + 1}. ${s.title}</h4>
                        <p>${s.content}</p>
                        <div class="lesson-code">
                            <pre><code>${s.code}</code></pre>
                            <button class="btn btn-small btn-primary" onclick="PlaygroundView.tryCode(\`${s.code.replace(/`/g, '\\`')}\`)">▶ Try It</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    tryCode: (code) => {
        PlaygroundView.showMode('sandbox', document.querySelector('.mode-tab'));
        document.getElementById('code-editor').value = code;
        PlaygroundView.updateLineNumbers();
        PlaygroundView.runCode();
    },

    // ==========================================
    // EXAMPLES
    // ==========================================
    examples: {
        hello: 'print("Hello, World!")',
        variables: 'name = "Alice"\nage = 15\nprint(f"{name} is {age}")',
        arithmetic: 'a = 10\nb = 3\nprint(f"{a} + {b} = {a + b}")\nprint(f"{a} * {b} = {a * b}")\nprint(f"{a} / {b} = {a / b}")',
        if: 'score = 75\nif score >= 70:\n    print("Pass!")\nelse:\n    print("Fail")',
        for: 'for i in range(1, 6):\n    print(f"Count: {i}")',
        while: 'x = 5\nwhile x > 0:\n    print(x)\n    x = x - 1\nprint("Done!")',
        list: 'nums = [1, 2, 3]\nnums.append(4)\nprint(nums)\nprint(f"Sum: {sum(nums)}")',
        factorial: 'n = 5\nresult = 1\nfor i in range(1, n + 1):\n    result = result * i\nprint(f"{n}! = {result}")',
        fizzbuzz: 'for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)'
    },

    loadExample: (name) => {
        if (name && PlaygroundView.examples[name]) {
            document.getElementById('code-editor').value = PlaygroundView.examples[name];
            PlaygroundView.updateLineNumbers();
            document.getElementById('example-select').value = '';
        }
    },

    // ==========================================
    // UI HELPERS
    // ==========================================
    clearCode: () => {
        document.getElementById('code-editor').value = '';
        PlaygroundView.updateLineNumbers();
    },

    clearOutput: () => {
        document.getElementById('code-output').textContent = '';
        document.getElementById('exec-status').textContent = '';
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
        const status = document.getElementById('exec-status');
        const varsDisplay = document.getElementById('variables-display');
        const varCount = document.getElementById('var-count');
        
        try {
            const result = PlaygroundView.interpretPython(code);
            output.textContent = result.output || '(No output)';
            output.className = 'output-display';
            status.textContent = '✅ Success';
            
            // Update variables display
            const vars = Object.entries(result.variables);
            varCount.textContent = `${vars.length} variable${vars.length !== 1 ? 's' : ''}`;
            
            if (vars.length > 0) {
                varsDisplay.innerHTML = vars.map(([name, value]) => {
                    const type = Array.isArray(value) ? 'list' : typeof value;
                    const display = Array.isArray(value) ? '[' + value.join(', ') + ']' : String(value);
                    return `<div class="var-item">
                        <span class="var-name">${name}</span>
                        <span class="var-type">${type}</span>
                        <span class="var-value">${display}</span>
                    </div>`;
                }).join('');
            } else {
                varsDisplay.innerHTML = '<p class="placeholder-text">No variables</p>';
            }
        } catch (e) {
            output.textContent = 'Error: ' + e.message;
            output.className = 'output-display error';
            status.textContent = '❌ Error';
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
            editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(editor.selectionEnd);
            editor.selectionStart = editor.selectionEnd = start + 4;
            PlaygroundView.updateLineNumbers();
        }
    }
};
// Build: Tue Oct 20 18:07:28 CEST 2026
