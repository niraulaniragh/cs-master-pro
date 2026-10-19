/**
 * ToolsView.js - Enhanced Interactive Learning Tools
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
                        <h3>Number Base Converter</h3>
                        <p>Convert between binary, denary, hex with visual breakdowns</p>
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
                    
                    <button class="tool-card" onclick="ToolsView.openTool('filesize')">
                        <span class="tool-icon">📁</span>
                        <h3>File Size Calculator</h3>
                        <p>Calculate image and sound file sizes</p>
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
                ToolsView.renderTruthTable();
                break;
            case 'algorithm':
                workspace.innerHTML = ToolsView.renderAlgorithmVisualizer();
                ToolsView.initAlgorithmVisualizer();
                break;
            case 'ascii':
                workspace.innerHTML = ToolsView.renderASCIITable();
                break;
            case 'filesize':
                workspace.innerHTML = ToolsView.renderFileSizeCalculator();
                break;
        }

        // Track tool usage
        const usedTools = Storage.load('usedTools') || [];
        if (!usedTools.includes(toolId)) {
            usedTools.push(toolId);
            Storage.save('usedTools', usedTools);
            if (usedTools.length >= 5) {
                AppState.unlockAchievement('tool_master');
            }
        }
    },

    // ==================== ENHANCED BINARY CONVERTER ====================
    renderBinaryConverter: () => {
        return `
            <div class="tool-panel binary-converter">
                <h3>🔢 Number Base Converter</h3>
                
                <div class="converter-tabs">
                    <button class="conv-tab active" onclick="ToolsView.switchConverterTab('convert', this)">Convert</button>
                    <button class="conv-tab" onclick="ToolsView.switchConverterTab('add', this)">Binary Addition</button>
                    <button class="conv-tab" onclick="ToolsView.switchConverterTab('shift', this)">Bit Shifting</button>
                </div>
                
                <!-- Conversion Tab -->
                <div class="conv-content" id="conv-convert">
                    <div class="converter-inputs">
                        <div class="input-group">
                            <label>Denary (Base 10)</label>
                            <input type="number" id="denary-input" min="0" max="255" placeholder="0-255"
                                   oninput="ToolsView.convertFromDenary(this.value)">
                        </div>
                        <div class="input-group">
                            <label>Binary (Base 2)</label>
                            <input type="text" id="binary-input" placeholder="e.g., 11010110"
                                   oninput="ToolsView.convertFromBinary(this.value)">
                        </div>
                        <div class="input-group">
                            <label>Hexadecimal (Base 16)</label>
                            <input type="text" id="hex-input" placeholder="e.g., D6"
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
                                <span class="bit" onclick="ToolsView.toggleBit(0)">0</span>
                                <span class="bit" onclick="ToolsView.toggleBit(1)">0</span>
                                <span class="bit" onclick="ToolsView.toggleBit(2)">0</span>
                                <span class="bit" onclick="ToolsView.toggleBit(3)">0</span>
                                <span class="bit" onclick="ToolsView.toggleBit(4)">0</span>
                                <span class="bit" onclick="ToolsView.toggleBit(5)">0</span>
                                <span class="bit" onclick="ToolsView.toggleBit(6)">0</span>
                                <span class="bit" onclick="ToolsView.toggleBit(7)">0</span>
                            </div>
                        </div>
                        <p class="bit-hint">👆 Click bits to toggle them!</p>
                    </div>
                    
                    <div class="conversion-working" id="conversion-working">
                        <h4>📝 Working (How to convert)</h4>
                        <div class="working-content">Enter a number above to see the conversion working</div>
                    </div>
                    
                    <div class="hex-breakdown" id="hex-breakdown">
                        <h4>🔷 Hex Nibble Breakdown</h4>
                        <div class="nibble-display">
                            <div class="nibble">
                                <div class="nibble-binary" id="nibble-high">0000</div>
                                <div class="nibble-hex" id="nibble-high-hex">0</div>
                            </div>
                            <div class="nibble">
                                <div class="nibble-binary" id="nibble-low">0000</div>
                                <div class="nibble-hex" id="nibble-low-hex">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Binary Addition Tab -->
                <div class="conv-content hidden" id="conv-add">
                    <h4>➕ Binary Addition</h4>
                    <p class="tool-desc">Add two 8-bit binary numbers together</p>
                    
                    <div class="addition-inputs">
                        <div class="add-row">
                            <label>Number 1:</label>
                            <input type="text" id="add-num1" placeholder="e.g., 00101101" maxlength="8"
                                   oninput="ToolsView.validateBinaryInput(this)">
                            <span class="denary-preview" id="add-num1-dec">= 0</span>
                        </div>
                        <div class="add-row">
                            <label>Number 2:</label>
                            <input type="text" id="add-num2" placeholder="e.g., 00011010" maxlength="8"
                                   oninput="ToolsView.validateBinaryInput(this)">
                            <span class="denary-preview" id="add-num2-dec">= 0</span>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="ToolsView.performBinaryAddition()">Calculate ➕</button>
                    
                    <div class="addition-result hidden" id="addition-result">
                        <div class="add-working">
                            <div class="add-carry" id="add-carry"></div>
                            <div class="add-line" id="add-line1"></div>
                            <div class="add-line" id="add-line2"></div>
                            <div class="add-separator"></div>
                            <div class="add-answer" id="add-answer"></div>
                        </div>
                        <div class="add-summary" id="add-summary"></div>
                    </div>
                </div>
                
                <!-- Bit Shifting Tab -->
                <div class="conv-content hidden" id="conv-shift">
                    <h4>↔️ Bit Shifting</h4>
                    <p class="tool-desc">See how left and right shifts multiply/divide by 2</p>
                    
                    <div class="shift-input">
                        <label>Enter number (denary):</label>
                        <input type="number" id="shift-num" value="42" min="0" max="255"
                               oninput="ToolsView.updateShiftDisplay()">
                    </div>
                    
                    <div class="shift-display" id="shift-display">
                        <!-- Shift visualization -->
                    </div>
                    
                    <div class="shift-controls">
                        <button class="btn btn-secondary" onclick="ToolsView.performShift('left')">
                            ⬅️ Left Shift (×2)
                        </button>
                        <button class="btn btn-secondary" onclick="ToolsView.performShift('right')">
                            Right Shift (÷2) ➡️
                        </button>
                    </div>
                    
                    <div class="shift-history" id="shift-history">
                        <h4>📋 Shift History</h4>
                        <div class="history-list" id="history-list"></div>
                    </div>
                </div>
            </div>
        `;
    },

    switchConverterTab: (tab, btn) => {
        document.querySelectorAll('.conv-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.conv-content').forEach(c => c.classList.add('hidden'));
        
        btn.classList.add('active');
        document.getElementById(`conv-${tab}`).classList.remove('hidden');
        
        if (tab === 'shift') {
            ToolsView.updateShiftDisplay();
        }
    },

    convertFromDenary: (value) => {
        const num = parseInt(value) || 0;
        if (num < 0 || num > 255) return;
        
        const binary = Helpers.denaryToBinary(num);
        const hex = Helpers.denaryToHex(num);
        
        document.getElementById('binary-input').value = binary;
        document.getElementById('hex-input').value = hex;
        ToolsView.updateBitVisual(binary);
        ToolsView.updateConversionWorking('denary', num);
        ToolsView.updateHexBreakdown(binary);
    },

    convertFromBinary: (value) => {
        if (!/^[01]*$/.test(value)) return;
        const num = Helpers.binaryToDenary(value || '0');
        
        document.getElementById('denary-input').value = num;
        document.getElementById('hex-input').value = Helpers.denaryToHex(num);
        ToolsView.updateBitVisual(value.padStart(8, '0'));
        ToolsView.updateConversionWorking('binary', value || '0');
        ToolsView.updateHexBreakdown(value.padStart(8, '0'));
    },

    convertFromHex: (value) => {
        if (!/^[0-9A-Fa-f]*$/.test(value)) return;
        const num = Helpers.hexToDenary(value || '0');
        const binary = Helpers.denaryToBinary(num);
        
        document.getElementById('denary-input').value = num;
        document.getElementById('binary-input').value = binary;
        ToolsView.updateBitVisual(binary);
        ToolsView.updateConversionWorking('hex', value || '0');
        ToolsView.updateHexBreakdown(binary);
    },

    toggleBit: (index) => {
        const bitEls = document.querySelectorAll('#bit-visual .bit');
        const currentBit = bitEls[index].textContent;
        bitEls[index].textContent = currentBit === '0' ? '1' : '0';
        bitEls[index].classList.toggle('active');
        
        // Reconstruct binary and update inputs
        const binary = Array.from(bitEls).map(b => b.textContent).join('');
        document.getElementById('binary-input').value = binary;
        ToolsView.convertFromBinary(binary);
    },

    updateBitVisual: (binary) => {
        const bits = binary.padStart(8, '0').slice(-8).split('');
        const bitEls = document.querySelectorAll('#bit-visual .bit');
        bits.forEach((bit, i) => {
            bitEls[i].textContent = bit;
            bitEls[i].classList.toggle('active', bit === '1');
        });
    },

    updateConversionWorking: (fromBase, value) => {
        const working = document.querySelector('.working-content');
        let html = '';
        
        if (fromBase === 'denary') {
            const num = parseInt(value);
            if (num === 0) {
                html = '<p>0 in denary = 00000000 in binary = 0 in hex</p>';
            } else {
                // Show division method
                let steps = [];
                let n = num;
                while (n > 0) {
                    steps.push({ dividend: n, remainder: n % 2 });
                    n = Math.floor(n / 2);
                }
                html = `
                    <p><strong>Denary to Binary (Division by 2):</strong></p>
                    <div class="working-steps">
                        ${steps.map(s => `${s.dividend} ÷ 2 = ${Math.floor(s.dividend/2)} remainder <strong>${s.remainder}</strong>`).join('<br>')}
                    </div>
                    <p>Read remainders bottom-to-top: <strong>${steps.map(s => s.remainder).reverse().join('')}</strong></p>
                `;
            }
        } else if (fromBase === 'binary') {
            const binary = value.padStart(8, '0');
            const placeValues = [128, 64, 32, 16, 8, 4, 2, 1];
            const activeBits = [];
            let sum = 0;
            
            binary.split('').forEach((bit, i) => {
                if (bit === '1') {
                    activeBits.push(placeValues[i]);
                    sum += placeValues[i];
                }
            });
            
            if (activeBits.length === 0) {
                html = '<p>All bits are 0, so the value is 0</p>';
            } else {
                html = `
                    <p><strong>Binary to Denary (Add place values):</strong></p>
                    <p>${activeBits.join(' + ')} = <strong>${sum}</strong></p>
                `;
            }
        } else if (fromBase === 'hex') {
            const hex = value.toUpperCase().padStart(2, '0');
            const chars = hex.split('');
            const values = chars.map(c => parseInt(c, 16));
            const calc = values.length === 2 ? 
                `${values[0]} × 16 + ${values[1]} = ${values[0] * 16 + values[1]}` :
                `${values[0]}`;
            
            html = `
                <p><strong>Hex to Denary:</strong></p>
                <p>${chars.join('')} → ${calc}</p>
            `;
        }
        
        working.innerHTML = html;
    },

    updateHexBreakdown: (binary) => {
        const padded = binary.padStart(8, '0');
        const high = padded.slice(0, 4);
        const low = padded.slice(4, 8);
        
        document.getElementById('nibble-high').textContent = high;
        document.getElementById('nibble-low').textContent = low;
        document.getElementById('nibble-high-hex').textContent = parseInt(high, 2).toString(16).toUpperCase();
        document.getElementById('nibble-low-hex').textContent = parseInt(low, 2).toString(16).toUpperCase();
    },

    validateBinaryInput: (input) => {
        input.value = input.value.replace(/[^01]/g, '');
        const id = input.id === 'add-num1' ? 'add-num1-dec' : 'add-num2-dec';
        const denary = parseInt(input.value || '0', 2);
        document.getElementById(id).textContent = `= ${denary}`;
    },

    performBinaryAddition: () => {
        const num1 = document.getElementById('add-num1').value.padStart(8, '0');
        const num2 = document.getElementById('add-num2').value.padStart(8, '0');
        
        const dec1 = parseInt(num1, 2);
        const dec2 = parseInt(num2, 2);
        const sum = dec1 + dec2;
        const overflow = sum > 255;
        
        // Calculate with carry
        let carry = '';
        let result = '';
        let carryBit = 0;
        
        for (let i = 7; i >= 0; i--) {
            const bit1 = parseInt(num1[i]);
            const bit2 = parseInt(num2[i]);
            const total = bit1 + bit2 + carryBit;
            
            result = (total % 2) + result;
            carryBit = Math.floor(total / 2);
            carry = (i > 0 && (bit1 + bit2 + parseInt(carry[0] || 0)) >= 2 ? '1' : ' ') + carry;
        }
        
        if (carryBit) {
            carry = '1' + carry;
        }
        
        document.getElementById('add-carry').textContent = carry.trim() ? `Carry: ${carry}` : '';
        document.getElementById('add-line1').innerHTML = `<span class="num-label">A:</span> ${num1.split('').join(' ')}`;
        document.getElementById('add-line2').innerHTML = `<span class="num-label">B:</span> ${num2.split('').join(' ')} +`;
        document.getElementById('add-answer').innerHTML = `<span class="num-label">=</span> ${result.split('').join(' ')}`;
        
        document.getElementById('add-summary').innerHTML = `
            <p>${dec1} + ${dec2} = ${sum}</p>
            <p>Result in binary: <strong>${result}</strong></p>
            ${overflow ? '<p class="overflow-warning">⚠️ OVERFLOW! Result exceeds 8 bits (255)</p>' : ''}
        `;
        
        document.getElementById('addition-result').classList.remove('hidden');
    },

    shiftHistory: [],

    updateShiftDisplay: () => {
        const num = parseInt(document.getElementById('shift-num').value) || 0;
        const binary = num.toString(2).padStart(8, '0');
        
        document.getElementById('shift-display').innerHTML = `
            <div class="shift-visual">
                <div class="shift-binary">
                    ${binary.split('').map(b => `<span class="shift-bit ${b === '1' ? 'active' : ''}">${b}</span>`).join('')}
                </div>
                <div class="shift-value">
                    <span>Denary: <strong>${num}</strong></span>
                    <span>Hex: <strong>${num.toString(16).toUpperCase()}</strong></span>
                </div>
            </div>
        `;
        
        ToolsView.shiftHistory = [];
        document.getElementById('history-list').innerHTML = '<p class="empty-history">Perform shifts to see history</p>';
    },

    performShift: (direction) => {
        const input = document.getElementById('shift-num');
        const current = parseInt(input.value) || 0;
        let shifted;
        
        if (direction === 'left') {
            shifted = Math.min(current * 2, 255);
        } else {
            shifted = Math.floor(current / 2);
        }
        
        // Add to history
        ToolsView.shiftHistory.push({
            from: current,
            to: shifted,
            direction: direction,
            operation: direction === 'left' ? '×2' : '÷2'
        });
        
        // Update history display
        document.getElementById('history-list').innerHTML = ToolsView.shiftHistory.map((h, i) => `
            <div class="history-item">
                <span>${h.from}</span>
                <span class="history-arrow">${h.direction === 'left' ? '⬅️' : '➡️'} ${h.operation}</span>
                <span>${h.to}</span>
            </div>
        `).join('');
        
        input.value = shifted;
        ToolsView.updateShiftDisplay();
        
        // Highlight if overflow or truncation
        if (direction === 'left' && current * 2 > 255) {
            Toast.show('⚠️ Overflow! Result capped at 255', 'warning');
        }
        if (direction === 'right' && current % 2 !== 0) {
            Toast.show('ℹ️ Remainder lost in right shift', 'info');
        }
    },

    // ==================== FILE SIZE CALCULATOR ====================
    renderFileSizeCalculator: () => {
        return `
            <div class="tool-panel filesize-calc">
                <h3>📁 File Size Calculator</h3>
                
                <div class="calc-tabs">
                    <button class="calc-tab active" onclick="ToolsView.switchCalcTab('image', this)">🖼️ Image</button>
                    <button class="calc-tab" onclick="ToolsView.switchCalcTab('sound', this)">🔊 Sound</button>
                </div>
                
                <div class="calc-content" id="calc-image">
                    <h4>Image File Size Calculator</h4>
                    <p class="formula">File size = Width × Height × Colour Depth</p>
                    
                    <div class="calc-inputs">
                        <div class="calc-row">
                            <label>Width (pixels):</label>
                            <input type="number" id="img-width" value="1920" min="1" oninput="ToolsView.calcImageSize()">
                        </div>
                        <div class="calc-row">
                            <label>Height (pixels):</label>
                            <input type="number" id="img-height" value="1080" min="1" oninput="ToolsView.calcImageSize()">
                        </div>
                        <div class="calc-row">
                            <label>Colour Depth (bits):</label>
                            <select id="img-depth" onchange="ToolsView.calcImageSize()">
                                <option value="1">1-bit (Black & White)</option>
                                <option value="8">8-bit (256 colours)</option>
                                <option value="16">16-bit (65,536 colours)</option>
                                <option value="24" selected>24-bit (True colour)</option>
                                <option value="32">32-bit (True colour + alpha)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="calc-result" id="img-result">
                        <!-- Result shown here -->
                    </div>
                </div>
                
                <div class="calc-content hidden" id="calc-sound">
                    <h4>Sound File Size Calculator</h4>
                    <p class="formula">File size = Sample Rate × Bit Depth × Channels × Duration</p>
                    
                    <div class="calc-inputs">
                        <div class="calc-row">
                            <label>Sample Rate (Hz):</label>
                            <select id="sound-rate" onchange="ToolsView.calcSoundSize()">
                                <option value="8000">8,000 Hz (Phone quality)</option>
                                <option value="22050">22,050 Hz (Radio quality)</option>
                                <option value="44100" selected>44,100 Hz (CD quality)</option>
                                <option value="48000">48,000 Hz (DVD quality)</option>
                                <option value="96000">96,000 Hz (Studio quality)</option>
                            </select>
                        </div>
                        <div class="calc-row">
                            <label>Bit Depth:</label>
                            <select id="sound-depth" onchange="ToolsView.calcSoundSize()">
                                <option value="8">8-bit</option>
                                <option value="16" selected>16-bit (CD quality)</option>
                                <option value="24">24-bit (Studio)</option>
                            </select>
                        </div>
                        <div class="calc-row">
                            <label>Channels:</label>
                            <select id="sound-channels" onchange="ToolsView.calcSoundSize()">
                                <option value="1">Mono (1 channel)</option>
                                <option value="2" selected>Stereo (2 channels)</option>
                            </select>
                        </div>
                        <div class="calc-row">
                            <label>Duration (seconds):</label>
                            <input type="number" id="sound-duration" value="180" min="1" oninput="ToolsView.calcSoundSize()">
                        </div>
                    </div>
                    
                    <div class="calc-result" id="sound-result">
                        <!-- Result shown here -->
                    </div>
                </div>
            </div>
        `;
    },

    switchCalcTab: (tab, btn) => {
        document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.calc-content').forEach(c => c.classList.add('hidden'));
        
        btn.classList.add('active');
        document.getElementById(`calc-${tab}`).classList.remove('hidden');
        
        if (tab === 'image') ToolsView.calcImageSize();
        if (tab === 'sound') ToolsView.calcSoundSize();
    },

    calcImageSize: () => {
        const width = parseInt(document.getElementById('img-width').value) || 0;
        const height = parseInt(document.getElementById('img-height').value) || 0;
        const depth = parseInt(document.getElementById('img-depth').value);
        
        const totalPixels = width * height;
        const bits = totalPixels * depth;
        const bytes = bits / 8;
        const kb = bytes / 1024;
        const mb = kb / 1024;
        
        document.getElementById('img-result').innerHTML = `
            <div class="result-breakdown">
                <h4>📊 Calculation</h4>
                <p>Total pixels: ${width.toLocaleString()} × ${height.toLocaleString()} = <strong>${totalPixels.toLocaleString()}</strong></p>
                <p>File size in bits: ${totalPixels.toLocaleString()} × ${depth} = <strong>${bits.toLocaleString()} bits</strong></p>
                <p>File size in bytes: ${bits.toLocaleString()} ÷ 8 = <strong>${bytes.toLocaleString()} bytes</strong></p>
            </div>
            <div class="result-final">
                <p><strong>${kb.toFixed(2)} KB</strong> (${bytes.toLocaleString()} bytes)</p>
                ${mb >= 1 ? `<p><strong>${mb.toFixed(2)} MB</strong></p>` : ''}
            </div>
            <div class="result-note">
                <p>💡 This is the uncompressed file size. Actual image files (JPEG, PNG) are smaller due to compression.</p>
            </div>
        `;
    },

    calcSoundSize: () => {
        const rate = parseInt(document.getElementById('sound-rate').value);
        const depth = parseInt(document.getElementById('sound-depth').value);
        const channels = parseInt(document.getElementById('sound-channels').value);
        const duration = parseInt(document.getElementById('sound-duration').value) || 0;
        
        const bits = rate * depth * channels * duration;
        const bytes = bits / 8;
        const kb = bytes / 1024;
        const mb = kb / 1024;
        
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const durationStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        
        document.getElementById('sound-result').innerHTML = `
            <div class="result-breakdown">
                <h4>📊 Calculation</h4>
                <p>Duration: ${durationStr}</p>
                <p>File size = ${rate.toLocaleString()} × ${depth} × ${channels} × ${duration}</p>
                <p>= <strong>${bits.toLocaleString()} bits</strong></p>
                <p>= <strong>${bytes.toLocaleString()} bytes</strong></p>
            </div>
            <div class="result-final">
                <p><strong>${mb.toFixed(2)} MB</strong></p>
            </div>
            <div class="result-note">
                <p>💡 This is uncompressed (WAV) size. MP3 compression reduces this by ~90%.</p>
            </div>
        `;
    },

    // ==================== LOGIC GATES ====================
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

    // ==================== ALGORITHM VISUALIZER ====================
    renderAlgorithmVisualizer: () => {
        return `
            <div class="tool-panel algorithm-viz">
                <h3>📊 Algorithm Visualizer</h3>
                
                <div class="viz-controls">
                    <select id="algorithm-select">
                        <option value="bubble">Bubble Sort</option>
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

    // ==================== ASCII TABLE ====================
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
