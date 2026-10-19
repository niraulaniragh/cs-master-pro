/**
 * PlaygroundView.js - Code Playground with Trace Tables
 */

const PlaygroundView = {
    render: () => {
        return `
            <div class="playground-view">
                <h2>💻 Code Playground</h2>
                
                <div class="playground-layout">
                    <div class="code-section">
                        <div class="code-header">
                            <span>Python Code</span>
                            <div class="code-actions">
                                <select id="example-select" onchange="PlaygroundView.loadExample(this.value)">
                                    <option value="">Load Example...</option>
                                    <option value="loop">FOR Loop</option>
                                    <option value="while">WHILE Loop</option>
                                    <option value="sum">Calculate Sum</option>
                                    <option value="factorial">Factorial</option>
                                    <option value="search">Linear Search</option>
                                </select>
                                <button class="btn btn-secondary" onclick="PlaygroundView.clearCode()">Clear</button>
                                <button class="btn btn-primary" onclick="PlaygroundView.runCode()">▶ Run</button>
                            </div>
                        </div>
                        <textarea id="code-editor" spellcheck="false" placeholder="# Write your Python code here
# Use print() for output

for i in range(5):
    print(i)"></textarea>
                    </div>
                    
                    <div class="output-section">
                        <div class="output-tabs">
                            <button class="tab-btn active" onclick="PlaygroundView.showTab('output', this)">Output</button>
                            <button class="tab-btn" onclick="PlaygroundView.showTab('trace', this)">Trace Table</button>
                        </div>
                        
                        <div class="tab-content active" id="output-tab">
                            <pre id="code-output">Click "Run" to execute your code</pre>
                        </div>
                        
                        <div class="tab-content" id="trace-tab">
                            <div class="trace-controls">
                                <button class="btn btn-secondary" onclick="PlaygroundView.generateTrace()">Generate Trace</button>
                                <span class="trace-help">Tracks variable changes line by line</span>
                            </div>
                            <div id="trace-table-container">
                                <p>Write code with variables and click "Generate Trace" to see how values change.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="playground-tips">
                    <h4>💡 Tips</h4>
                    <ul>
                        <li>Use <code>print()</code> to see output</li>
                        <li>Variables are automatically tracked in trace tables</li>
                        <li>Try the examples to see trace tables in action</li>
                    </ul>
                </div>
            </div>
        `;
    },

    init: () => {
        console.log('💻 Playground view initialized');
    },

    examples: {
        loop: `# FOR loop example
for i in range(1, 6):
    print(i)`,
        while: `# WHILE loop example
count = 0
while count < 5:
    print(count)
    count = count + 1`,
        sum: `# Calculate sum of numbers
total = 0
for i in range(1, 6):
    total = total + i
    print(f"Added {i}, total = {total}")
print(f"Final total: {total}")`,
        factorial: `# Calculate factorial
n = 5
result = 1
for i in range(1, n + 1):
    result = result * i
print(f"{n}! = {result}")`,
        search: `# Linear search
numbers = [4, 2, 7, 1, 9, 3]
target = 7
found = False
for i in range(len(numbers)):
    if numbers[i] == target:
        found = True
        print(f"Found {target} at index {i}")
        break
if not found:
    print(f"{target} not found")`
    },

    loadExample: (name) => {
        if (name && PlaygroundView.examples[name]) {
            document.getElementById('code-editor').value = PlaygroundView.examples[name];
        }
    },

    clearCode: () => {
        document.getElementById('code-editor').value = '';
        document.getElementById('code-output').textContent = '';
    },

    showTab: (tabId, btn) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    },

    runCode: () => {
        const code = document.getElementById('code-editor').value;
        const output = document.getElementById('code-output');
        
        try {
            // Simple Python-like interpreter (very limited)
            const result = PlaygroundView.interpretPython(code);
            output.textContent = result.output || '(No output)';
            output.className = '';
        } catch (e) {
            output.textContent = `Error: ${e.message}`;
            output.className = 'error';
        }
    },

    interpretPython: (code) => {
        // This is a simplified interpreter for basic Python constructs
        const lines = code.split('\n');
        const variables = {};
        let output = [];
        let i = 0;

        const evalExpr = (expr) => {
            // Replace variable names with values
            let processed = expr;
            for (const [name, value] of Object.entries(variables)) {
                const regex = new RegExp(`\\b${name}\\b`, 'g');
                processed = processed.replace(regex, typeof value === 'string' ? `"${value}"` : value);
            }
            
            // Handle len()
            processed = processed.replace(/len\((\[.*?\])\)/g, (_, arr) => {
                try { return JSON.parse(arr).length; } catch { return 0; }
            });
            
            // Handle range()
            if (processed.includes('range(')) {
                const match = processed.match(/range\(([^)]+)\)/);
                if (match) {
                    const args = match[1].split(',').map(s => parseInt(eval(s.trim())));
                    if (args.length === 1) return { type: 'range', start: 0, end: args[0] };
                    if (args.length === 2) return { type: 'range', start: args[0], end: args[1] };
                }
            }
            
            try {
                return eval(processed);
            } catch {
                return processed;
            }
        };

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

                // Assignment
                if (trimmed.includes('=') && !trimmed.includes('==') && !trimmed.startsWith('if') && !trimmed.startsWith('while')) {
                    const [varName, ...rest] = trimmed.split('=');
                    const value = evalExpr(rest.join('=').trim());
                    variables[varName.trim()] = value;
                }
                // Print
                else if (trimmed.startsWith('print(')) {
                    const content = trimmed.match(/print\((.+)\)/)?.[1] || '';
                    let toPrint = evalExpr(content);
                    if (typeof toPrint === 'string' && toPrint.startsWith('f"')) {
                        // f-string handling
                        toPrint = toPrint.slice(2, -1).replace(/\{([^}]+)\}/g, (_, expr) => evalExpr(expr));
                    }
                    output.push(String(toPrint).replace(/^["']|["']$/g, ''));
                }
                // FOR loop
                else if (trimmed.startsWith('for ')) {
                    const match = trimmed.match(/for\s+(\w+)\s+in\s+(.+):/);
                    if (match) {
                        const varName = match[1];
                        const iterable = evalExpr(match[2]);
                        
                        // Find block end
                        let blockEnd = j + 1;
                        while (blockEnd < lines.length && 
                               (lines[blockEnd].trim() === '' || 
                                lines[blockEnd].search(/\S/) > indent ||
                                lines[blockEnd].trim().startsWith('#'))) {
                            blockEnd++;
                        }
                        blockEnd--;

                        if (iterable?.type === 'range') {
                            for (let k = iterable.start; k < iterable.end; k++) {
                                variables[varName] = k;
                                executeBlock(j + 1, blockEnd, indent + 4);
                            }
                        } else if (Array.isArray(iterable)) {
                            for (const item of iterable) {
                                variables[varName] = item;
                                executeBlock(j + 1, blockEnd, indent + 4);
                            }
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
                            lines[blockEnd].search(/\S/) > indent)) {
                        blockEnd++;
                    }
                    blockEnd--;

                    let iterations = 0;
                    while (evalExpr(condition) && iterations < 1000) {
                        executeBlock(j + 1, blockEnd, indent + 4);
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
                            lines[blockEnd].search(/\S/) > indent)) {
                        blockEnd++;
                    }
                    blockEnd--;

                    if (evalExpr(condition)) {
                        executeBlock(j + 1, blockEnd, indent + 4);
                    }
                    j = blockEnd;
                }
                
                j++;
            }
        };

        executeBlock(0, lines.length - 1, 0);
        
        return { output: output.join('\n'), variables };
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
        const lines = code.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
        const traceSteps = [];
        const variables = {};
        
        // Simplified trace - tracks variable changes
        const trackVars = new Set();
        
        // Find all variable names
        lines.forEach(line => {
            const match = line.match(/^\s*(\w+)\s*=/);
            if (match && !['if', 'for', 'while', 'def'].includes(match[1])) {
                trackVars.add(match[1]);
            }
        });

        // Execute and track
        let stepNum = 1;
        const executeWithTrace = (code) => {
            const result = PlaygroundView.interpretPython(code);
            return result;
        };

        // Create simple trace based on variable tracking
        const varNames = Array.from(trackVars);
        
        if (varNames.length === 0) {
            return '<p>No variables found to trace. Add some variable assignments!</p>';
        }

        // Generate trace table header
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

        // Simulate execution
        const state = {};
        varNames.forEach(v => state[v] = '-');
        let step = 1;
        let outputs = [];

        lines.forEach((line, lineNum) => {
            const trimmed = line.trim();
            let changed = false;
            let outputVal = '';
            
            // Check for assignment
            varNames.forEach(v => {
                const regex = new RegExp(`^${v}\\s*=\\s*(.+)$`);
                const match = trimmed.match(regex);
                if (match) {
                    // Evaluate the expression
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

            // Check for print
            if (trimmed.startsWith('print(')) {
                outputVal = '→ print';
                changed = true;
            }

            // Check for loop
            if (trimmed.startsWith('for ') || trimmed.startsWith('while ')) {
                changed = true;
            }

            if (changed) {
                html += `
                    <tr>
                        <td>${step++}</td>
                        <td><code>${trimmed.substring(0, 30)}${trimmed.length > 30 ? '...' : ''}</code></td>
                        ${varNames.map(v => `<td>${state[v]}</td>`).join('')}
                        <td>${outputVal}</td>
                    </tr>
                `;
            }
        });

        html += '</tbody></table>';
        html += '<p class="trace-note"><em>Note: This is a simplified trace. For loops, variables would update on each iteration.</em></p>';
        
        return html;
    }
};
