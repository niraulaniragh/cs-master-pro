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
            { id: 'intro', name: 'Introduction to Python', icon: '🐍', lessons: 3 },
            { id: 'variables', name: 'Variables & Data Types', icon: '📦', lessons: 4 },
            { id: 'operators', name: 'Operators', icon: '➕', lessons: 3 },
            { id: 'conditionals', name: 'If Statements', icon: '🔀', lessons: 3 },
            { id: 'loops', name: 'Loops', icon: '🔄', lessons: 4 },
            { id: 'lists', name: 'Lists', icon: '📋', lessons: 4 },
            { id: 'functions', name: 'Functions', icon: '⚙️', lessons: 3 },
            { id: 'algorithms', name: 'Algorithms', icon: '🔍', lessons: 3 },
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
    // CHALLENGES
    // ==========================================
    getChallenges: () => [
        {
            id: 'hello', name: 'Hello World', icon: '👋', difficulty: 'Easy', xp: 10,
            description: 'Print "Hello, World!" to the screen.',
            hint: 'Use print("Hello, World!")',
            starterCode: '# Print Hello, World!\n',
            tests: [{ expected: 'Hello, World!' }]
        },
        {
            id: 'sum_two', name: 'Add Numbers', icon: '➕', difficulty: 'Easy', xp: 15,
            description: 'Create a=5 and b=3, then print their sum (8).',
            hint: 'print(a + b)',
            starterCode: '# Add two numbers\na = 5\nb = 3\n',
            tests: [{ expected: '8' }]
        },
        {
            id: 'even_odd', name: 'Even or Odd', icon: '🔢', difficulty: 'Easy', xp: 20,
            description: 'Given num=7, print "Even" or "Odd".',
            hint: 'Use if num % 2 == 0',
            starterCode: 'num = 7\n',
            tests: [{ expected: 'Odd' }]
        },
        {
            id: 'countdown', name: 'Countdown', icon: '🚀', difficulty: 'Easy', xp: 25,
            description: 'Print 5 to 1, then "Blast off!"',
            hint: 'Use range(5, 0, -1)',
            starterCode: '# Countdown\n',
            tests: [{ contains: ['5', '4', '3', '2', '1', 'Blast off!'] }]
        },
        {
            id: 'sum_range', name: 'Sum 1 to 10', icon: '📊', difficulty: 'Medium', xp: 30,
            description: 'Print the sum of 1 to 10 (55).',
            hint: 'Use a loop with total += i',
            starterCode: 'total = 0\n',
            tests: [{ expected: '55' }]
        },
        {
            id: 'factorial', name: 'Factorial', icon: '❗', difficulty: 'Medium', xp: 35,
            description: 'Calculate and print 5! (120).',
            hint: 'Multiply 1*2*3*4*5',
            starterCode: 'n = 5\nresult = 1\n',
            tests: [{ expected: '120' }]
        },
        {
            id: 'fizzbuzz', name: 'FizzBuzz', icon: '🎯', difficulty: 'Medium', xp: 40,
            description: 'Print 1-15: "Fizz" for 3, "Buzz" for 5, "FizzBuzz" for both.',
            hint: 'Check 15 first, then 3, then 5',
            starterCode: 'for i in range(1, 16):\n    pass\n',
            tests: [{ contains: ['FizzBuzz', 'Fizz', 'Buzz'] }]
        },
        {
            id: 'reverse', name: 'Reverse String', icon: '🔄', difficulty: 'Medium', xp: 30,
            description: 'Print "Python" reversed (nohtyP).',
            hint: 'Use text[::-1]',
            starterCode: 'text = "Python"\n',
            tests: [{ expected: 'nohtyP' }]
        },
        {
            id: 'find_max', name: 'Find Maximum', icon: '📈', difficulty: 'Medium', xp: 35,
            description: 'Find and print the max in [3,7,2,9,4] (9).',
            hint: 'Loop and track largest',
            starterCode: 'nums = [3, 7, 2, 9, 4]\nlargest = nums[0]\n',
            tests: [{ expected: '9' }]
        },
        {
            id: 'prime', name: 'Prime Check', icon: '🔐', difficulty: 'Hard', xp: 50,
            description: 'Check if 17 is prime. Print "Prime" or "Not prime".',
            hint: 'Check divisors from 2 to n-1',
            starterCode: 'n = 17\nis_prime = True\n',
            tests: [{ expected: 'Prime' }]
        },
        {
            id: 'palindrome', name: 'Palindrome', icon: '🪞', difficulty: 'Hard', xp: 50,
            description: 'Check if "radar" is a palindrome. Print "Yes" or "No".',
            hint: 'Compare word to word[::-1]',
            starterCode: 'word = "radar"\n',
            tests: [{ expected: 'Yes' }]
        },
        {
            id: 'fibonacci', name: 'Fibonacci', icon: '🌀', difficulty: 'Hard', xp: 60,
            description: 'Print first 10 Fibonacci numbers.',
            hint: 'Each = sum of previous two',
            starterCode: 'a = 0\nb = 1\n',
            tests: [{ contains: ['0', '1', '1', '2', '3', '5', '8', '13', '21', '34'] }]
        }
    ],

    getCompletedChallenges: () => {
        return JSON.parse(localStorage.getItem('csmaster_completed_challenges') || '[]');
    },

    loadChallenge: (id) => {
        const challenge = PlaygroundView.getChallenges().find(c => c.id === id);
        if (!challenge) return;
        
        PlaygroundView.currentChallenge = challenge;
        
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
                        <p>${challenge.description}</p>
                        <button class="btn btn-small btn-secondary" onclick="document.getElementById('hint').style.display='block'">💡 Hint</button>
                        <p id="hint" style="display:none;margin-top:8px;color:var(--yellow)">💡 ${challenge.hint}</p>
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
    // LESSONS
    // ==========================================
    lessons: {
        intro: {
            title: 'Introduction to Python',
            sections: [
                { title: 'Hello World', content: 'Your first program!', code: 'print("Hello, World!")' },
                { title: 'Comments', content: 'Comments start with #', code: '# This is a comment\nprint("Code runs")' },
                { title: 'Multiple Lines', content: 'Code runs top to bottom', code: 'print("Line 1")\nprint("Line 2")' }
            ]
        },
        variables: {
            title: 'Variables & Data Types',
            sections: [
                { title: 'Creating Variables', content: 'Variables store data', code: 'name = "Alice"\nage = 15\nprint(name)\nprint(age)' },
                { title: 'Data Types', content: 'String, int, float, bool', code: 'text = "Hello"  # str\nnum = 42        # int\npi = 3.14       # float\nok = True       # bool\nprint(type(num))' },
                { title: 'f-Strings', content: 'Embed variables in strings', code: 'name = "Bob"\nage = 20\nprint(f"{name} is {age}")' },
                { title: 'Type Conversion', content: 'Convert between types', code: 'x = "42"\ny = int(x)\nprint(y + 8)' }
            ]
        },
        operators: {
            title: 'Operators',
            sections: [
                { title: 'Arithmetic', content: 'Math operations', code: 'print(5 + 3)   # 8\nprint(10 - 4)  # 6\nprint(3 * 4)   # 12\nprint(15 / 3)  # 5.0\nprint(17 % 5)  # 2\nprint(2 ** 3)  # 8' },
                { title: 'Comparison', content: 'Return True/False', code: 'print(5 > 3)   # True\nprint(5 == 5)  # True\nprint(5 != 3)  # True' },
                { title: 'Logical', content: 'and, or, not', code: 'x = 5\nprint(x > 3 and x < 10)\nprint(x < 3 or x > 4)\nprint(not x > 10)' }
            ]
        },
        conditionals: {
            title: 'If Statements',
            sections: [
                { title: 'Basic If', content: 'Execute code conditionally', code: 'age = 18\nif age >= 18:\n    print("Adult")' },
                { title: 'If-Else', content: 'Alternative path', code: 'x = 10\nif x > 5:\n    print("Big")\nelse:\n    print("Small")' },
                { title: 'If-Elif-Else', content: 'Multiple conditions', code: 'score = 75\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelse:\n    print("D")' }
            ]
        },
        loops: {
            title: 'Loops',
            sections: [
                { title: 'FOR Loop', content: 'Repeat a set number of times', code: 'for i in range(5):\n    print(f"i = {i}")' },
                { title: 'Range Options', content: 'start, stop, step', code: 'for i in range(1, 6):\n    print(i)\n\nfor i in range(10, 0, -2):\n    print(i)' },
                { title: 'Loop Through List', content: 'Iterate over items', code: 'fruits = ["apple", "banana"]\nfor fruit in fruits:\n    print(fruit)' },
                { title: 'WHILE Loop', content: 'Loop while condition true', code: 'x = 0\nwhile x < 5:\n    print(x)\n    x = x + 1' }
            ]
        },
        lists: {
            title: 'Lists',
            sections: [
                { title: 'Creating Lists', content: 'Store multiple items', code: 'nums = [1, 2, 3, 4, 5]\nprint(nums)\nprint(len(nums))' },
                { title: 'Indexing', content: 'Access by position', code: 'colors = ["red", "green", "blue"]\nprint(colors[0])   # red\nprint(colors[-1])  # blue' },
                { title: 'Modifying', content: 'Add and remove items', code: 'nums = [1, 2, 3]\nnums.append(4)\nprint(nums)\nnums.remove(2)\nprint(nums)' },
                { title: 'List Functions', content: 'Built-in functions', code: 'nums = [3, 1, 4, 1, 5]\nprint(max(nums))\nprint(min(nums))\nprint(sum(nums))' }
            ]
        },
        functions: {
            title: 'Functions',
            sections: [
                { title: 'Defining Functions', content: 'Reusable code blocks', code: 'def greet():\n    print("Hello!")\n\ngreet()\ngreet()' },
                { title: 'Parameters', content: 'Pass data to functions', code: 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Alice")\ngreet("Bob")' },
                { title: 'Return Values', content: 'Get results back', code: 'def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result)' }
            ]
        },
        algorithms: {
            title: 'Algorithms',
            sections: [
                { title: 'Linear Search', content: 'Find item in list', code: 'nums = [4, 2, 7, 1, 9]\ntarget = 7\nfound = -1\nfor i in range(len(nums)):\n    if nums[i] == target:\n        found = i\nprint(f"Found at {found}")' },
                { title: 'Finding Max', content: 'Find largest value', code: 'nums = [3, 7, 2, 9, 4]\nlargest = nums[0]\nfor n in nums:\n    if n > largest:\n        largest = n\nprint(largest)' },
                { title: 'Counting', content: 'Count occurrences', code: 'text = "hello"\ncount = 0\nfor char in text:\n    if char == "l":\n        count = count + 1\nprint(count)' }
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
