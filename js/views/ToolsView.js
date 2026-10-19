/**
 * ToolsView.js - Interactive Learning Tools
 */

const ToolsView = {
    activeTool: null,

    render: () => {
        return `
            <div class="tools-view">
                <h2>🔧 Interactive Tools</h2>
                <p>Practice with these interactive tools to reinforce your learning</p>
                
                <div class="tools-grid">
                    <button class="tool-card" onclick="ToolsView.openTool('binary')">
                        <span class="tool-icon">🔢</span>
                        <h3>Binary Converter</h3>
                        <p>Convert between binary, denary, and hexadecimal</p>
                    </button>
                    
                    <button class="tool-card" onclick="ToolsView.openTool('logic')">
                        <span class="tool-icon">⚡</span>
                        <h3>Logic Gates</h3>
                        <p>Build and test logic gate circuits</p>
                    </button>
                    
                    <button class="tool-card" onclick="ToolsView.openTool('algorithm')">
                        <span class="tool-icon">📊</span>
                        <h3>Algorithm Visualizer</h3>
                        <p>Watch sorting and searching algorithms in action</p>
                    </button>
                    
                    <button class="tool-card" onclick="ToolsView.openTool('ascii')">
                        <span class="tool-icon">📝</span>
                        <h3>ASCII Table</h3>
                        <p>Look up ASCII codes and characters</p>
                    </button>
                </div>
                
                <div class="tool-workspace" id="tool-workspace">
                    <div class="tool-placeholder">
                        <span>👆</span>
                        <p>Select a tool above to get started</p>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        console.log('🔧 Tools view initialized');
    },

    openTool: (toolId) => {
        ToolsView.activeTool = toolId;
        const workspace = document.getElementById('tool-workspace');
        
        // Update active state
        document.querySelectorAll('.tool-card').forEach(card => {
            card.classList.remove('active');
        });
        event.currentTarget.classList.add('active');

        switch(toolId) {
            case 'binary':
                workspace.innerHTML = ToolsView.renderBinaryConverter();
                break;
            case 'logic':
                workspace.innerHTML = ToolsView.renderLogicGates();
                break;
            case 'algorithm':
                workspace.innerHTML = ToolsView.renderAlgorithmVisualizer();
                ToolsView.initAlgorithmVisualizer();
                break;
            case 'ascii':
                workspace.innerHTML = ToolsView.renderASCIITable();
                break;
        }

        // Track tool usage
        const usedTools = Storage.load('usedTools') || [];
        if (!usedTools.includes(toolId)) {
            usedTools.push(toolId);
            Storage.save('usedTools', usedTools);
            if (usedTools.length >= 4) {
                AppState.unlockAchievement('tool_master');
            }
        }
    },

    renderBinaryConverter: () => {
        return `
            <div class="tool-panel binary-converter">
                <h3>🔢 Binary Converter</h3>
                
                <div class="converter-inputs">
                    <div class="input-group">
                        <label>Denary (Base 10)</label>
                        <input type="number" id="denary-input" min="0" max="255" 
                               oninput="ToolsView.convertFromDenary(this.value)">
                    </div>
                    <div class="input-group">
                        <label>Binary (Base 2)</label>
                        <input type="text" id="binary-input" pattern="[01]*" 
                               oninput="ToolsView.convertFromBinary(this.value)">
                    </div>
                    <div class="input-group">
                        <label>Hexadecimal (Base 16)</label>
                        <input type="text" id="hex-input" 
                               oninput="ToolsView.convertFromHex(this.value)">
                    </div>
                </div>
                
                <div class="binary-visual">
                    <h4>8-bit Binary Breakdown</h4>
                    <div class="bit-display">
                        <div class="bit-row headers">
                            <span>128</span><span>64</span><span>32</span><span>16</span>
                            <span>8</span><span>4</span><span>2</span><span>1</span>
                        </div>
                        <div class="bit-row bits" id="bit-visual">
                            <span class="bit">0</span><span class="bit">0</span>
                            <span class="bit">0</span><span class="bit">0</span>
                            <span class="bit">0</span><span class="bit">0</span>
                            <span class="bit">0</span><span class="bit">0</span>
                        </div>
                    </div>
                </div>
                
                <div class="converter-operations">
                    <h4>Operations</h4>
                    <div class="operation-buttons">
                        <button class="btn btn-secondary" onclick="ToolsView.shiftLeft()">Left Shift (×2)</button>
                        <button class="btn btn-secondary" onclick="ToolsView.shiftRight()">Right Shift (÷2)</button>
                    </div>
                </div>
            </div>
        `;
    },

    convertFromDenary: (value) => {
        const num = parseInt(value) || 0;
        if (num < 0 || num > 255) return;
        
        const binary = Helpers.denaryToBinary(num);
        const hex = Helpers.denaryToHex(num);
        
        document.getElementById('binary-input').value = binary;
        document.getElementById('hex-input').value = hex;
        ToolsView.updateBitVisual(binary);
    },

    convertFromBinary: (value) => {
        if (!/^[01]*$/.test(value)) return;
        const num = Helpers.binaryToDenary(value || '0');
        
        document.getElementById('denary-input').value = num;
        document.getElementById('hex-input').value = Helpers.denaryToHex(num);
        ToolsView.updateBitVisual(value.padStart(8, '0'));
    },

    convertFromHex: (value) => {
        if (!/^[0-9A-Fa-f]*$/.test(value)) return;
        const num = Helpers.hexToDenary(value || '0');
        
        document.getElementById('denary-input').value = num;
        document.getElementById('binary-input').value = Helpers.denaryToBinary(num);
        ToolsView.updateBitVisual(Helpers.denaryToBinary(num));
    },

    updateBitVisual: (binary) => {
        const bits = binary.padStart(8, '0').slice(-8).split('');
        const bitEls = document.querySelectorAll('#bit-visual .bit');
        bits.forEach((bit, i) => {
            bitEls[i].textContent = bit;
            bitEls[i].classList.toggle('active', bit === '1');
        });
    },

    shiftLeft: () => {
        const current = parseInt(document.getElementById('denary-input').value) || 0;
        const shifted = Math.min(current * 2, 255);
        document.getElementById('denary-input').value = shifted;
        ToolsView.convertFromDenary(shifted);
    },

    shiftRight: () => {
        const current = parseInt(document.getElementById('denary-input').value) || 0;
        const shifted = Math.floor(current / 2);
        document.getElementById('denary-input').value = shifted;
        ToolsView.convertFromDenary(shifted);
    },

    renderLogicGates: () => {
        return `
            <div class="tool-panel logic-gates">
                <h3>⚡ Logic Gates</h3>
                
                <div class="gate-selector">
                    <button class="gate-btn active" onclick="ToolsView.selectGate('AND', this)">AND</button>
                    <button class="gate-btn" onclick="ToolsView.selectGate('OR', this)">OR</button>
                    <button class="gate-btn" onclick="ToolsView.selectGate('NOT', this)">NOT</button>
                    <button class="gate-btn" onclick="ToolsView.selectGate('NAND', this)">NAND</button>
                    <button class="gate-btn" onclick="ToolsView.selectGate('NOR', this)">NOR</button>
                    <button class="gate-btn" onclick="ToolsView.selectGate('XOR', this)">XOR</button>
                </div>
                
                <div class="gate-workspace">
                    <div class="gate-inputs">
                        <div class="input-toggle">
                            <label>Input A</label>
                            <button class="toggle-btn" id="input-a" onclick="ToolsView.toggleInput('a')">0</button>
                        </div>
                        <div class="input-toggle" id="input-b-container">
                            <label>Input B</label>
                            <button class="toggle-btn" id="input-b" onclick="ToolsView.toggleInput('b')">0</button>
                        </div>
                    </div>
                    
                    <div class="gate-output">
                        <span class="output-label">Output</span>
                        <span class="output-value" id="gate-output">0</span>
                    </div>
                </div>
                
                <div class="truth-table" id="truth-table">
                    <!-- Truth table rendered here -->
                </div>
            </div>
        `;
    },

    currentGate: 'AND',
    inputA: 0,
    inputB: 0,

    selectGate: (gate, btn) => {
        ToolsView.currentGate = gate;
        document.querySelectorAll('.gate-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show/hide input B for NOT gate
        document.getElementById('input-b-container').style.display = gate === 'NOT' ? 'none' : 'flex';
        
        ToolsView.updateGateOutput();
        ToolsView.renderTruthTable();
    },

    toggleInput: (input) => {
        if (input === 'a') {
            ToolsView.inputA = ToolsView.inputA ? 0 : 1;
            document.getElementById('input-a').textContent = ToolsView.inputA;
            document.getElementById('input-a').classList.toggle('active', ToolsView.inputA);
        } else {
            ToolsView.inputB = ToolsView.inputB ? 0 : 1;
            document.getElementById('input-b').textContent = ToolsView.inputB;
            document.getElementById('input-b').classList.toggle('active', ToolsView.inputB);
        }
        ToolsView.updateGateOutput();
    },

    updateGateOutput: () => {
        const a = ToolsView.inputA;
        const b = ToolsView.inputB;
        let output;

        switch(ToolsView.currentGate) {
            case 'AND': output = a & b; break;
            case 'OR': output = a | b; break;
            case 'NOT': output = a ? 0 : 1; break;
            case 'NAND': output = (a & b) ? 0 : 1; break;
            case 'NOR': output = (a | b) ? 0 : 1; break;
            case 'XOR': output = a ^ b; break;
        }

        const outputEl = document.getElementById('gate-output');
        outputEl.textContent = output;
        outputEl.classList.toggle('active', output === 1);
    },

    renderTruthTable: () => {
        const gate = ToolsView.currentGate;
        const isUnary = gate === 'NOT';
        
        let rows;
        if (isUnary) {
            rows = [[0, 1], [1, 0]];
        } else {
            const calc = (a, b) => {
                switch(gate) {
                    case 'AND': return a & b;
                    case 'OR': return a | b;
                    case 'NAND': return (a & b) ? 0 : 1;
                    case 'NOR': return (a | b) ? 0 : 1;
                    case 'XOR': return a ^ b;
                }
            };
            rows = [
                [0, 0, calc(0, 0)],
                [0, 1, calc(0, 1)],
                [1, 0, calc(1, 0)],
                [1, 1, calc(1, 1)]
            ];
        }

        document.getElementById('truth-table').innerHTML = `
            <h4>Truth Table: ${gate}</h4>
            <table>
                <tr>
                    <th>A</th>
                    ${isUnary ? '' : '<th>B</th>'}
                    <th>Output</th>
                </tr>
                ${rows.map(row => `
                    <tr>
                        ${row.map(v => `<td class="${v ? 'high' : ''}">${v}</td>`).join('')}
                    </tr>
                `).join('')}
            </table>
        `;
    },

    renderAlgorithmVisualizer: () => {
        return `
            <div class="tool-panel algorithm-viz">
                <h3>📊 Algorithm Visualizer</h3>
                
                <div class="viz-controls">
                    <select id="algorithm-select">
                        <option value="bubble">Bubble Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="linear">Linear Search</option>
                        <option value="binary">Binary Search</option>
                    </select>
                    <button class="btn btn-secondary" onclick="ToolsView.generateArray()">New Array</button>
                    <button class="btn btn-primary" onclick="ToolsView.runAlgorithm()">Run</button>
                    <input type="range" id="speed-slider" min="1" max="10" value="5">
                    <span>Speed</span>
                </div>
                
                <div class="viz-display" id="viz-display">
                    <!-- Visualization bars rendered here -->
                </div>
                
                <div class="viz-status" id="viz-status">
                    Click "Run" to start visualization
                </div>
            </div>
        `;
    },

    vizArray: [],
    vizRunning: false,

    initAlgorithmVisualizer: () => {
        ToolsView.generateArray();
        setTimeout(() => ToolsView.selectGate('AND', document.querySelector('.gate-btn')), 0);
    },

    generateArray: () => {
        ToolsView.vizArray = Array.from({length: 20}, () => Math.floor(Math.random() * 100) + 10);
        ToolsView.renderVizArray();
    },

    renderVizArray: (highlights = {}) => {
        const display = document.getElementById('viz-display');
        if (!display) return;
        
        const maxVal = Math.max(...ToolsView.vizArray);
        display.innerHTML = ToolsView.vizArray.map((val, i) => {
            const height = (val / maxVal) * 100;
            let className = 'viz-bar';
            if (highlights.comparing?.includes(i)) className += ' comparing';
            if (highlights.sorted?.includes(i)) className += ' sorted';
            if (highlights.found === i) className += ' found';
            return `<div class="${className}" style="height: ${height}%"><span>${val}</span></div>`;
        }).join('');
    },

    runAlgorithm: async () => {
        if (ToolsView.vizRunning) return;
        ToolsView.vizRunning = true;
        
        const algorithm = document.getElementById('algorithm-select').value;
        const speed = 11 - document.getElementById('speed-slider').value;
        const delay = speed * 50;

        switch(algorithm) {
            case 'bubble':
                await ToolsView.bubbleSortViz(delay);
                break;
            case 'linear':
                await ToolsView.linearSearchViz(delay);
                break;
            case 'binary':
                ToolsView.vizArray.sort((a, b) => a - b);
                ToolsView.renderVizArray();
                await Helpers.sleep(500);
                await ToolsView.binarySearchViz(delay);
                break;
        }
        
        ToolsView.vizRunning = false;
    },

    bubbleSortViz: async (delay) => {
        const arr = [...ToolsView.vizArray];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                ToolsView.vizArray = [...arr];
                ToolsView.renderVizArray({comparing: [j, j+1]});
                document.getElementById('viz-status').textContent = `Comparing positions ${j} and ${j+1}`;
                await Helpers.sleep(delay);
                
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    ToolsView.vizArray = [...arr];
                    ToolsView.renderVizArray({comparing: [j, j+1]});
                    await Helpers.sleep(delay);
                }
            }
        }
        
        ToolsView.vizArray = arr;
        ToolsView.renderVizArray({sorted: arr.map((_, i) => i)});
        document.getElementById('viz-status').textContent = 'Sorted!';
    },

    linearSearchViz: async (delay) => {
        const target = ToolsView.vizArray[Math.floor(Math.random() * ToolsView.vizArray.length)];
        document.getElementById('viz-status').textContent = `Searching for ${target}...`;
        
        for (let i = 0; i < ToolsView.vizArray.length; i++) {
            ToolsView.renderVizArray({comparing: [i]});
            await Helpers.sleep(delay);
            
            if (ToolsView.vizArray[i] === target) {
                ToolsView.renderVizArray({found: i});
                document.getElementById('viz-status').textContent = `Found ${target} at position ${i}!`;
                return;
            }
        }
        document.getElementById('viz-status').textContent = `${target} not found`;
    },

    binarySearchViz: async (delay) => {
        const target = ToolsView.vizArray[Math.floor(Math.random() * ToolsView.vizArray.length)];
        document.getElementById('viz-status').textContent = `Binary search for ${target}...`;
        
        let low = 0, high = ToolsView.vizArray.length - 1;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            ToolsView.renderVizArray({comparing: [mid]});
            await Helpers.sleep(delay * 2);
            
            if (ToolsView.vizArray[mid] === target) {
                ToolsView.renderVizArray({found: mid});
                document.getElementById('viz-status').textContent = `Found ${target} at position ${mid}!`;
                return;
            } else if (ToolsView.vizArray[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        document.getElementById('viz-status').textContent = `${target} not found`;
    },

    renderASCIITable: () => {
        const printable = [];
        for (let i = 32; i < 127; i++) {
            printable.push({ code: i, char: String.fromCharCode(i) });
        }

        return `
            <div class="tool-panel ascii-table">
                <h3>📝 ASCII Table</h3>
                
                <div class="ascii-lookup">
                    <input type="text" id="ascii-input" placeholder="Enter character or code" 
                           oninput="ToolsView.lookupASCII(this.value)">
                    <div class="ascii-result" id="ascii-result">
                        Enter a character to see its ASCII code, or a number to see the character
                    </div>
                </div>
                
                <div class="ascii-grid">
                    ${printable.map(item => `
                        <div class="ascii-cell" onclick="ToolsView.showASCII(${item.code})">
                            <span class="char">${item.char === ' ' ? 'SPC' : item.char}</span>
                            <span class="code">${item.code}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="ascii-info">
                    <p><strong>Key ranges:</strong> A-Z: 65-90 | a-z: 97-122 | 0-9: 48-57</p>
                </div>
            </div>
        `;
    },

    lookupASCII: (value) => {
        const result = document.getElementById('ascii-result');
        if (!value) {
            result.textContent = 'Enter a character to see its ASCII code';
            return;
        }

        if (/^\d+$/.test(value)) {
            const code = parseInt(value);
            if (code >= 0 && code <= 127) {
                const char = code === 32 ? 'Space' : String.fromCharCode(code);
                result.innerHTML = `ASCII ${code} = <strong>"${char}"</strong>`;
            } else {
                result.textContent = 'ASCII codes range from 0-127';
            }
        } else {
            const code = value.charCodeAt(0);
            result.innerHTML = `"${value[0]}" = ASCII <strong>${code}</strong> (binary: ${code.toString(2).padStart(7, '0')})`;
        }
    },

    showASCII: (code) => {
        document.getElementById('ascii-input').value = code;
        ToolsView.lookupASCII(code.toString());
    }
};
