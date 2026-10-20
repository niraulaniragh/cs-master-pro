/**
 * notes.js - Comprehensive Revision Notes for Edexcel IGCSE 4CP0
 */

const NOTES = {
    'problem-solving': {
        'Algorithms & Flowcharts': {
            content: `
<h2>What is an Algorithm?</h2>
<div class="definition-box">
    <strong>Algorithm:</strong> A step-by-step set of instructions to solve a problem or complete a task. Think of it like a recipe - it tells you exactly what to do, in what order, to achieve a specific result.
</div>

<h3>Key Characteristics of Algorithms</h3>
<p>For something to be a valid algorithm, it must have these properties:</p>
<ul>
    <li><strong>Finite:</strong> Must eventually stop - it cannot go on forever</li>
    <li><strong>Precise:</strong> Each step must be clear and unambiguous - no guessing what to do</li>
    <li><strong>Effective:</strong> Must actually solve the problem correctly</li>
    <li><strong>Input:</strong> Takes zero or more inputs (data to work with)</li>
    <li><strong>Output:</strong> Produces at least one output (the result)</li>
    <li><strong>Ordered:</strong> Steps must be in a specific sequence</li>
</ul>

<h3>Real-World Algorithm Example</h3>
<div class="example-box">
    <h4>Making a Cup of Tea</h4>
    <ol>
        <li>Fill kettle with water</li>
        <li>Turn on kettle</li>
        <li>Wait until water boils</li>
        <li>Put tea bag in cup</li>
        <li>Pour boiling water into cup</li>
        <li>Wait 3 minutes</li>
        <li>Remove tea bag</li>
        <li>Add milk if desired</li>
    </ol>
    <p>This is an algorithm because it has clear steps, a definite end, and produces an output (tea)!</p>
</div>

<h2>Flowcharts</h2>
<p>Flowcharts are <strong>visual representations</strong> of algorithms. They use standardized symbols connected by arrows to show the flow of a program. They're excellent for planning before you code!</p>

<h3>Standard Flowchart Symbols</h3>
<table class="notes-table">
    <tr><th>Symbol</th><th>Name</th><th>Purpose</th><th>Example</th></tr>
    <tr><td>⬭ Oval</td><td>Terminator</td><td>Start or End of program</td><td>START, END, STOP</td></tr>
    <tr><td>▭ Rectangle</td><td>Process</td><td>Calculation or action</td><td>total = price × quantity</td></tr>
    <tr><td>▱ Parallelogram</td><td>Input/Output</td><td>Getting or displaying data</td><td>INPUT name, OUTPUT result</td></tr>
    <tr><td>◇ Diamond</td><td>Decision</td><td>Yes/No question (branching)</td><td>Is age >= 18?</td></tr>
    <tr><td>→ Arrow</td><td>Flow line</td><td>Shows direction of flow</td><td>Connects symbols</td></tr>
</table>

<h3>Flowchart Example: Check Voting Eligibility</h3>
<pre><code>    ┌─────────┐
    │  START  │
    └────┬────┘
         ↓
    ┌─────────────┐
    │ INPUT age   │
    └──────┬──────┘
           ↓
      ◇ age >= 18? ◇
     ╱            ╲
   YES            NO
    ↓              ↓
┌────────────┐ ┌────────────────┐
│OUTPUT "You │ │OUTPUT "Too     │
│can vote"   │ │young to vote"  │
└─────┬──────┘ └───────┬────────┘
      └────────┬───────┘
               ↓
          ┌─────────┐
          │   END   │
          └─────────┘</code></pre>

<h3>Why Use Flowcharts?</h3>
<ul>
    <li><strong>Visual clarity:</strong> Easier to understand than text descriptions</li>
    <li><strong>Planning tool:</strong> Design your program before coding</li>
    <li><strong>Communication:</strong> Share ideas with others who may not know programming</li>
    <li><strong>Debugging:</strong> Find logic errors by tracing through the flowchart</li>
    <li><strong>Documentation:</strong> Record how a system works</li>
</ul>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Always include START and END terminators</li>
        <li>Use arrows to show direction - don't leave connections ambiguous</li>
        <li>Decision diamonds must have exactly TWO outputs (Yes/No or True/False)</li>
        <li>Keep flowcharts neat - use straight lines where possible</li>
        <li>Each symbol should contain only ONE action or decision</li>
    </ul>
</div>
            `
        },
        'Pseudocode': {
            content: `
<h2>What is Pseudocode?</h2>
<div class="definition-box">
    <strong>Pseudocode:</strong> A way of writing algorithms using structured English that resembles programming code but isn't tied to any specific programming language. It's a "halfway point" between human language and actual code.
</div>

<p>Pseudocode helps you plan your program's logic without worrying about syntax rules. It's like writing a draft before the final essay.</p>

<h3>Why Use Pseudocode?</h3>
<ul>
    <li><strong>Language-independent:</strong> Works regardless of which programming language you'll use</li>
    <li><strong>Focus on logic:</strong> Concentrate on WHAT to do, not HOW to write it</li>
    <li><strong>Easy to modify:</strong> Changing pseudocode is faster than changing actual code</li>
    <li><strong>Communication:</strong> Non-programmers can understand it</li>
</ul>

<h3>Standard Pseudocode Keywords</h3>
<table class="notes-table">
    <tr><th>Category</th><th>Keywords</th><th>Purpose</th></tr>
    <tr><td>Input/Output</td><td>INPUT, OUTPUT, PRINT, READ</td><td>Getting data from user, displaying results</td></tr>
    <tr><td>Assignment</td><td>← or =</td><td>Storing values in variables</td></tr>
    <tr><td>Selection</td><td>IF...THEN...ELSE...ENDIF</td><td>Making decisions</td></tr>
    <tr><td>Selection</td><td>CASE...OF...ENDCASE</td><td>Multiple choice decisions</td></tr>
    <tr><td>Count Loop</td><td>FOR...TO...STEP...NEXT</td><td>Repeat a known number of times</td></tr>
    <tr><td>Pre-test Loop</td><td>WHILE...DO...ENDWHILE</td><td>Repeat while condition is true</td></tr>
    <tr><td>Post-test Loop</td><td>REPEAT...UNTIL</td><td>Repeat until condition becomes true</td></tr>
    <tr><td>Subprograms</td><td>FUNCTION, PROCEDURE, RETURN</td><td>Reusable code blocks</td></tr>
</table>

<h3>Pseudocode Conventions</h3>
<ul>
    <li>Use <strong>←</strong> for assignment (not = which means "equals" in maths)</li>
    <li><strong>Indent</strong> code inside loops and IF statements</li>
    <li>Use <strong>UPPERCASE</strong> for keywords</li>
    <li>Use <strong>meaningful names</strong> for variables (totalScore not ts)</li>
    <li>Add <strong>comments</strong> with // to explain complex parts</li>
</ul>

<h3>Example 1: Calculate Average of Three Numbers</h3>
<pre><code class="language-plaintext">// Program to calculate the average of 3 numbers
INPUT num1
INPUT num2
INPUT num3

total ← num1 + num2 + num3
average ← total / 3

OUTPUT "The average is: ", average</code></pre>

<h3>Example 2: Find the Largest of Two Numbers</h3>
<pre><code class="language-plaintext">INPUT number1
INPUT number2

IF number1 > number2 THEN
    OUTPUT number1, " is larger"
ELSE IF number2 > number1 THEN
    OUTPUT number2, " is larger"
ELSE
    OUTPUT "Both numbers are equal"
ENDIF</code></pre>

<h3>Example 3: Countdown with a Loop</h3>
<pre><code class="language-plaintext">FOR counter ← 10 TO 1 STEP -1
    OUTPUT counter
NEXT counter
OUTPUT "Blast off!"</code></pre>

<h3>Example 4: Password Validation</h3>
<pre><code class="language-plaintext">correctPassword ← "secret123"
attempts ← 0
maxAttempts ← 3

REPEAT
    OUTPUT "Enter password: "
    INPUT userPassword
    attempts ← attempts + 1
    
    IF userPassword = correctPassword THEN
        OUTPUT "Access granted!"
    ELSE
        OUTPUT "Incorrect. Attempts remaining: ", maxAttempts - attempts
    ENDIF
UNTIL userPassword = correctPassword OR attempts >= maxAttempts

IF attempts >= maxAttempts AND userPassword ≠ correctPassword THEN
    OUTPUT "Account locked!"
ENDIF</code></pre>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Use ← for assignment, NOT the = sign</li>
        <li>Always indent code inside loops and IF statements</li>
        <li>Close every IF with ENDIF, every WHILE with ENDWHILE</li>
        <li>Write clearly - the examiner needs to understand your logic</li>
        <li>Include all necessary steps - don't skip the obvious ones</li>
    </ul>
</div>
            `
        },
        'Linear Search': {
            content: `
<h2>Linear Search Algorithm</h2>
<div class="definition-box">
    <strong>Linear Search:</strong> A simple searching algorithm that checks each item in a list one by one, from the beginning to the end, until it finds the target value or reaches the end of the list. Also called "sequential search".
</div>

<h3>How Linear Search Works</h3>
<p>Imagine looking for a specific book on a shelf by checking each book from left to right. That's linear search!</p>

<ol>
    <li>Start at the <strong>first item</strong> (index 0)</li>
    <li><strong>Compare</strong> the current item with the target value</li>
    <li>If they <strong>match</strong> → Success! Return the position</li>
    <li>If they <strong>don't match</strong> → Move to the next item</li>
    <li>Repeat steps 2-4 until:
        <ul>
            <li>The item is found, OR</li>
            <li>You reach the end of the list (item not found)</li>
        </ul>
    </li>
</ol>

<h3>Visual Example</h3>
<div class="example-box">
    <h4>Finding the value 7 in [3, 8, 2, 7, 1, 9]</h4>
    <pre><code>Step 1: Check index 0 → 3 ≠ 7 → Keep looking
Step 2: Check index 1 → 8 ≠ 7 → Keep looking
Step 3: Check index 2 → 2 ≠ 7 → Keep looking
Step 4: Check index 3 → 7 = 7 → FOUND at index 3! ✓</code></pre>
    <p>Result: Found at position 3 (4 comparisons needed)</p>
</div>

<h3>Pseudocode Implementation</h3>
<pre><code class="language-plaintext">FUNCTION linearSearch(list, target)
    FOR i ← 0 TO LENGTH(list) - 1
        IF list[i] = target THEN
            RETURN i                    // Found! Return position
        ENDIF
    NEXT i
    RETURN -1                           // Not found (convention: return -1)
ENDFUNCTION

// Usage:
position ← linearSearch([3, 8, 2, 7, 1, 9], 7)
IF position = -1 THEN
    OUTPUT "Value not found"
ELSE
    OUTPUT "Found at index ", position
ENDIF</code></pre>

<h3>Efficiency Analysis</h3>
<table class="notes-table">
    <tr><th>Scenario</th><th>Comparisons Needed</th><th>Example</th></tr>
    <tr><td><strong>Best Case</strong></td><td>1</td><td>Target is the first item</td></tr>
    <tr><td><strong>Worst Case</strong></td><td>n (all items)</td><td>Target is last item or not in list</td></tr>
    <tr><td><strong>Average Case</strong></td><td>n/2</td><td>Target is somewhere in the middle</td></tr>
</table>

<p>Where <strong>n</strong> is the number of items in the list.</p>

<h3>Advantages of Linear Search</h3>
<ul>
    <li><strong>Simple:</strong> Very easy to understand and implement</li>
    <li><strong>No sorting required:</strong> Works on unsorted data</li>
    <li><strong>Works on any data:</strong> Can search lists, arrays, linked lists</li>
    <li><strong>Good for small lists:</strong> Efficient enough for short lists</li>
</ul>

<h3>Disadvantages of Linear Search</h3>
<ul>
    <li><strong>Slow for large lists:</strong> Must check every item in worst case</li>
    <li><strong>Inefficient:</strong> Doesn't use any information about the data</li>
    <li><strong>Time grows linearly:</strong> Double the data = double the search time</li>
</ul>

<div class="tip-box">
    <strong>When to Use Linear Search:</strong>
    <ul>
        <li>Small datasets (under ~100 items)</li>
        <li>Data is unsorted and sorting isn't worth the effort</li>
        <li>You only need to search once or rarely</li>
        <li>Simplicity is more important than speed</li>
    </ul>
</div>
            `
        },
        'Binary Search': {
            content: `
<h2>Binary Search Algorithm</h2>
<div class="definition-box">
    <strong>Binary Search:</strong> An efficient searching algorithm that works by repeatedly dividing the search interval in half. Each comparison eliminates half of the remaining items. Also called "divide and conquer" search.
</div>

<p class="warning">⚠️ <strong>CRITICAL REQUIREMENT:</strong> Binary search ONLY works on SORTED data! The list must be in order (ascending or descending) before you can use binary search.</p>

<h3>How Binary Search Works</h3>
<p>Think of it like finding a word in a dictionary - you don't start at page 1. You open roughly to the middle, then decide whether to look in the first or second half.</p>

<ol>
    <li>Find the <strong>middle item</strong> of the current search range</li>
    <li><strong>Compare</strong> it with the target value</li>
    <li>If they match → <strong>Found!</strong></li>
    <li>If target is <strong>smaller</strong> → Search the LEFT half (discard right half)</li>
    <li>If target is <strong>larger</strong> → Search the RIGHT half (discard left half)</li>
    <li>Repeat with the new (smaller) range until found or range is empty</li>
</ol>

<h3>Visual Example</h3>
<div class="example-box">
    <h4>Finding 23 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]</h4>
<pre><code>Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
        0  1  2   3   4   5   6   7   8   9

Step 1: low=0, high=9, mid=4
        Check index 4 → value 16
        23 > 16, so search RIGHT half
        
Step 2: low=5, high=9, mid=7
        Check index 7 → value 56
        23 < 56, so search LEFT half
        
Step 3: low=5, high=6, mid=5
        Check index 5 → value 23
        23 = 23 → FOUND at index 5! ✓</code></pre>
    <p>Result: Found in only <strong>3 comparisons</strong> (vs 6 for linear search)</p>
</div>

<h3>Pseudocode Implementation</h3>
<pre><code class="language-plaintext">FUNCTION binarySearch(list, target)
    low ← 0
    high ← LENGTH(list) - 1
    
    WHILE low <= high
        mid ← (low + high) DIV 2        // Integer division
        
        IF list[mid] = target THEN
            RETURN mid                   // Found!
        ELSE IF list[mid] < target THEN
            low ← mid + 1               // Search right half
        ELSE
            high ← mid - 1              // Search left half
        ENDIF
    ENDWHILE
    
    RETURN -1                           // Not found
ENDFUNCTION</code></pre>

<h3>Efficiency Analysis</h3>
<table class="notes-table">
    <tr><th>Scenario</th><th>Comparisons</th><th>Example with 1000 items</th></tr>
    <tr><td><strong>Best Case</strong></td><td>1</td><td>Target is exactly in the middle</td></tr>
    <tr><td><strong>Worst Case</strong></td><td>log₂(n)</td><td>~10 comparisons (not 1000!)</td></tr>
    <tr><td><strong>Average Case</strong></td><td>log₂(n)</td><td>~10 comparisons</td></tr>
</table>

<h3>Why is it so fast?</h3>
<div class="example-box">
    <h4>The Power of Halving</h4>
    <p>Each comparison eliminates HALF the remaining data:</p>
    <ul>
        <li>1,000 items → 500 → 250 → 125 → 63 → 32 → 16 → 8 → 4 → 2 → 1</li>
        <li>That's only <strong>10 comparisons</strong> maximum!</li>
    </ul>
    <p>Linear search might need up to 1,000 comparisons for the same list.</p>
</div>

<h3>Comparison: Binary vs Linear Search</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>Binary Search</th><th>Linear Search</th></tr>
    <tr><td><strong>Speed</strong></td><td>Very fast O(log n)</td><td>Slow O(n)</td></tr>
    <tr><td><strong>Data requirement</strong></td><td>MUST be sorted</td><td>Any order</td></tr>
    <tr><td><strong>Best for</strong></td><td>Large datasets</td><td>Small datasets</td></tr>
    <tr><td><strong>1 million items</strong></td><td>~20 comparisons max</td><td>Up to 1 million!</td></tr>
    <tr><td><strong>Complexity</strong></td><td>More complex code</td><td>Simple code</td></tr>
</table>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Always mention that binary search requires SORTED data</li>
        <li>Use DIV (integer division) to find the middle index</li>
        <li>Remember: log₂(n) is MUCH smaller than n for large values</li>
        <li>If asked to trace through, show low, high, and mid at each step</li>
    </ul>
</div>
            `
        },
        'Bubble Sort': {
            content: `
<h2>Bubble Sort Algorithm</h2>
<div class="definition-box">
    <strong>Bubble Sort:</strong> A simple sorting algorithm that repeatedly steps through the list, compares adjacent pairs of elements, and swaps them if they're in the wrong order. Larger values "bubble up" to the end of the list with each pass.
</div>

<h3>How Bubble Sort Works</h3>
<ol>
    <li>Start at the beginning of the list</li>
    <li>Compare the first two adjacent elements</li>
    <li>If they're in the wrong order, <strong>swap</strong> them</li>
    <li>Move to the next pair and repeat</li>
    <li>When you reach the end, that's one <strong>"pass"</strong></li>
    <li>The largest unsorted item is now in its correct position</li>
    <li>Repeat passes until no more swaps are needed</li>
</ol>

<h3>Complete Walkthrough Example</h3>
<div class="example-box">
    <h4>Sorting [5, 3, 8, 1, 2] in ascending order</h4>
<pre><code>PASS 1:
[5, 3, 8, 1, 2]  Compare 5 and 3: 5 > 3, SWAP
[3, 5, 8, 1, 2]  Compare 5 and 8: 5 < 8, no swap
[3, 5, 8, 1, 2]  Compare 8 and 1: 8 > 1, SWAP
[3, 5, 1, 8, 2]  Compare 8 and 2: 8 > 2, SWAP
[3, 5, 1, 2, 8]  ← 8 is now in final position ✓

PASS 2:
[3, 5, 1, 2, 8]  Compare 3 and 5: 3 < 5, no swap
[3, 5, 1, 2, 8]  Compare 5 and 1: 5 > 1, SWAP
[3, 1, 5, 2, 8]  Compare 5 and 2: 5 > 2, SWAP
[3, 1, 2, 5, 8]  ← 5 is now in final position ✓

PASS 3:
[3, 1, 2, 5, 8]  Compare 3 and 1: 3 > 1, SWAP
[1, 3, 2, 5, 8]  Compare 3 and 2: 3 > 2, SWAP
[1, 2, 3, 5, 8]  ← 3 is now in final position ✓

PASS 4:
[1, 2, 3, 5, 8]  Compare 1 and 2: 1 < 2, no swap
[1, 2, 3, 5, 8]  ← No swaps = DONE! ✓

Final sorted array: [1, 2, 3, 5, 8]</code></pre>
</div>

<h3>Pseudocode Implementation</h3>
<pre><code class="language-plaintext">PROCEDURE bubbleSort(list)
    n ← LENGTH(list)
    
    FOR i ← 0 TO n - 2                      // Outer loop: number of passes
        swapped ← FALSE
        
        FOR j ← 0 TO n - 2 - i              // Inner loop: comparisons
            IF list[j] > list[j + 1] THEN
                // Swap the elements
                temp ← list[j]
                list[j] ← list[j + 1]
                list[j + 1] ← temp
                swapped ← TRUE
            ENDIF
        NEXT j
        
        // Optimization: if no swaps, list is sorted
        IF swapped = FALSE THEN
            RETURN                          // Exit early!
        ENDIF
    NEXT i
ENDPROCEDURE</code></pre>

<h3>Efficiency Analysis</h3>
<table class="notes-table">
    <tr><th>Case</th><th>Comparisons</th><th>When This Happens</th></tr>
    <tr><td><strong>Best Case</strong></td><td>O(n)</td><td>Already sorted (with optimization)</td></tr>
    <tr><td><strong>Worst Case</strong></td><td>O(n²)</td><td>Reverse sorted [5,4,3,2,1]</td></tr>
    <tr><td><strong>Average Case</strong></td><td>O(n²)</td><td>Random order</td></tr>
</table>

<h3>Why "Bubble" Sort?</h3>
<p>The name comes from the way larger elements "bubble up" to the top (end) of the list, like bubbles rising in water. Each pass guarantees the largest unsorted element reaches its final position.</p>

<h3>Advantages</h3>
<ul>
    <li><strong>Simple:</strong> Easy to understand and implement</li>
    <li><strong>In-place:</strong> Doesn't need extra memory (sorts within the array)</li>
    <li><strong>Stable:</strong> Equal elements stay in their original relative order</li>
    <li><strong>Adaptive:</strong> Fast if data is nearly sorted (with optimization)</li>
</ul>

<h3>Disadvantages</h3>
<ul>
    <li><strong>Very slow:</strong> O(n²) makes it impractical for large datasets</li>
    <li><strong>Many swaps:</strong> Moves elements one position at a time</li>
    <li><strong>Inefficient:</strong> Other algorithms (merge sort, quicksort) are much faster</li>
</ul>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Show your working clearly - write out each comparison and swap</li>
        <li>Remember: after pass k, the last k items are in their final positions</li>
        <li>The optimization (checking for swaps) can make it O(n) for sorted data</li>
        <li>Bubble sort is mainly used for educational purposes, not real applications</li>
    </ul>
</div>
            `
        },
        'Merge Sort': {
            content: `
<h2>Merge Sort Algorithm</h2>
<div class="definition-box">
    <strong>Merge Sort:</strong> A "divide and conquer" algorithm that recursively splits the list into halves until each sublist has one element, then merges them back together in sorted order. It's one of the most efficient general-purpose sorting algorithms.
</div>

<h3>The Two Phases</h3>
<p>Merge sort works in two distinct phases:</p>
<ol>
    <li><strong>DIVIDE:</strong> Split the list in half repeatedly until you have individual elements</li>
    <li><strong>CONQUER (Merge):</strong> Combine the sublists back together in sorted order</li>
</ol>

<h3>Complete Visual Walkthrough</h3>
<div class="example-box">
    <h4>Sorting [38, 27, 43, 3, 9, 82, 10]</h4>
<pre><code>DIVIDE PHASE (split until single elements):
                [38, 27, 43, 3, 9, 82, 10]
                      ↙           ↘
            [38, 27, 43, 3]     [9, 82, 10]
              ↙       ↘           ↙     ↘
         [38, 27]   [43, 3]    [9, 82]  [10]
          ↙   ↘     ↙   ↘      ↙   ↘      |
        [38] [27] [43] [3]   [9] [82]   [10]

MERGE PHASE (combine in sorted order):
        [38] [27] [43] [3]   [9] [82]   [10]
          ↘   ↙     ↘   ↙      ↘   ↙      |
         [27, 38]   [3, 43]   [9, 82]   [10]
              ↘       ↙           ↘     ↙
          [3, 27, 38, 43]      [9, 10, 82]
                      ↘           ↙
             [3, 9, 10, 27, 38, 43, 82] ✓</code></pre>
</div>

<h3>How the Merge Step Works</h3>
<div class="example-box">
    <h4>Merging [27, 38] and [3, 43]</h4>
<pre><code>Left:  [27, 38]    Right: [3, 43]    Result: []

Step 1: Compare 27 and 3
        3 < 27, so take 3
        Left: [27, 38]  Right: [43]  Result: [3]

Step 2: Compare 27 and 43
        27 < 43, so take 27
        Left: [38]  Right: [43]  Result: [3, 27]

Step 3: Compare 38 and 43
        38 < 43, so take 38
        Left: []  Right: [43]  Result: [3, 27, 38]

Step 4: Left is empty, take remaining from Right
        Result: [3, 27, 38, 43] ✓</code></pre>
</div>

<h3>Pseudocode Implementation</h3>
<pre><code class="language-plaintext">FUNCTION mergeSort(list)
    // Base case: single element is already sorted
    IF LENGTH(list) <= 1 THEN
        RETURN list
    ENDIF
    
    // DIVIDE: Split into two halves
    mid ← LENGTH(list) DIV 2
    left ← list[0 TO mid - 1]
    right ← list[mid TO end]
    
    // Recursively sort both halves
    left ← mergeSort(left)
    right ← mergeSort(right)
    
    // MERGE: Combine sorted halves
    RETURN merge(left, right)
ENDFUNCTION

FUNCTION merge(left, right)
    result ← []
    
    WHILE LENGTH(left) > 0 AND LENGTH(right) > 0
        IF left[0] <= right[0] THEN
            APPEND left[0] TO result
            REMOVE first element from left
        ELSE
            APPEND right[0] TO result
            REMOVE first element from right
        ENDIF
    ENDWHILE
    
    // Add any remaining elements
    APPEND all of left TO result
    APPEND all of right TO result
    
    RETURN result
ENDFUNCTION</code></pre>

<h3>Efficiency Analysis</h3>
<table class="notes-table">
    <tr><th>Case</th><th>Time Complexity</th><th>Why?</th></tr>
    <tr><td><strong>Best Case</strong></td><td>O(n log n)</td><td>Always divides and merges</td></tr>
    <tr><td><strong>Worst Case</strong></td><td>O(n log n)</td><td>Same process regardless of input</td></tr>
    <tr><td><strong>Average Case</strong></td><td>O(n log n)</td><td>Consistent performance</td></tr>
    <tr><td><strong>Space</strong></td><td>O(n)</td><td>Needs extra space for merging</td></tr>
</table>

<h3>Comparison: Merge Sort vs Bubble Sort</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>Merge Sort</th><th>Bubble Sort</th></tr>
    <tr><td><strong>Speed</strong></td><td>Fast O(n log n)</td><td>Slow O(n²)</td></tr>
    <tr><td><strong>Memory</strong></td><td>Needs extra space O(n)</td><td>In-place (no extra)</td></tr>
    <tr><td><strong>Complexity</strong></td><td>More complex (recursion)</td><td>Simple loops</td></tr>
    <tr><td><strong>Large data</strong></td><td>Excellent</td><td>Very poor</td></tr>
    <tr><td><strong>1 million items</strong></td><td>~20 million operations</td><td>~1 trillion operations!</td></tr>
</table>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Show both the DIVIDE (splitting) and MERGE (combining) phases</li>
        <li>Merge sort is ALWAYS O(n log n) - it doesn't have a "worst case" slowdown</li>
        <li>The trade-off is extra memory usage</li>
        <li>It's a recursive algorithm - the function calls itself</li>
    </ul>
</div>
            `
        },
        'Decomposition': {
            content: `
<h2>Decomposition</h2>
<div class="definition-box">
    <strong>Decomposition:</strong> Breaking down a complex problem into smaller, more manageable sub-problems.
</div>

<h3>Why Use Decomposition?</h3>
<ul>
    <li>Makes complex problems easier to understand</li>
    <li>Allows team members to work on different parts</li>
    <li>Makes testing easier (test each part separately)</li>
    <li>Allows code reuse</li>
</ul>

<h3>Example: Building a Game</h3>
<div class="example-box">
    <p><strong>Main Problem:</strong> Create a quiz game</p>
    <p><strong>Sub-problems:</strong></p>
    <ul>
        <li>Display questions</li>
        <li>Get user input</li>
        <li>Check answers</li>
        <li>Calculate score</li>
        <li>Show results</li>
    </ul>
</div>

<div class="tip-box">
    <strong>Key Point:</strong> Each sub-problem should be small enough to solve easily, but still complete a meaningful task.
</div>
            `
        },
        'Abstraction': {
            content: `
<h2>Abstraction</h2>
<div class="definition-box">
    <strong>Abstraction:</strong> Removing unnecessary details to focus on what's important for solving the problem.
</div>

<h3>Types of Abstraction</h3>
<ul>
    <li><strong>Data Abstraction:</strong> Hiding how data is stored (e.g., using a list without knowing memory addresses)</li>
    <li><strong>Procedural Abstraction:</strong> Using functions without knowing their internal code</li>
</ul>

<h3>Real-World Example</h3>
<div class="example-box">
    <p><strong>London Tube Map:</strong></p>
    <ul>
        <li>Shows: stations, lines, connections</li>
        <li>Hides: actual distances, geographical locations, tunnel depths</li>
    </ul>
    <p>The unnecessary details are abstracted away!</p>
</div>

<h3>Programming Example</h3>
<pre><code class="language-python"># We use print() without knowing HOW it works
print("Hello")  # Abstraction!</code></pre>

<div class="tip-box">
    <strong>Exam Tip:</strong> Abstraction = hiding complexity. Decomposition = breaking into parts. They work together!
</div>
            `
        }
    },

    'programming': {
        'Data Types': {
            content: `
<h2>Data Types</h2>
<div class="definition-box">
    <strong>Data Type:</strong> Defines what kind of data can be stored in a variable and what operations can be performed on it. Choosing the correct data type is essential for efficient programs.
</div>

<h3>Why Do Data Types Matter?</h3>
<ul>
    <li><strong>Memory efficiency:</strong> Different types use different amounts of storage</li>
    <li><strong>Correct operations:</strong> You can't do maths on text!</li>
    <li><strong>Error prevention:</strong> Catches mistakes before they cause problems</li>
    <li><strong>Program clarity:</strong> Makes code easier to understand</li>
</ul>

<h3>The Five Main Data Types</h3>
<table class="notes-table">
    <tr><th>Data Type</th><th>Description</th><th>Examples</th><th>Memory</th></tr>
    <tr><td><strong>Integer</strong></td><td>Whole numbers (positive, negative, or zero)</td><td>-5, 0, 42, 1000</td><td>2-4 bytes</td></tr>
    <tr><td><strong>Real/Float</strong></td><td>Numbers with decimal points</td><td>3.14, -0.5, 99.99</td><td>4-8 bytes</td></tr>
    <tr><td><strong>Boolean</strong></td><td>Only two values: True or False</td><td>True, False</td><td>1 bit</td></tr>
    <tr><td><strong>Character</strong></td><td>A single letter, digit, or symbol</td><td>'A', '7', '@', ' '</td><td>1-2 bytes</td></tr>
    <tr><td><strong>String</strong></td><td>A sequence of characters (text)</td><td>"Hello", "123", ""</td><td>Varies</td></tr>
</table>

<h3>Detailed Explanations</h3>

<h4>Integer</h4>
<p>Whole numbers with no decimal point. Used for counting, indexing, and calculations where fractions aren't needed.</p>
<pre><code class="language-python">age = 16
quantity = 100
temperature = -5
score = 0</code></pre>

<h4>Real/Float</h4>
<p>Numbers that can have decimal places. Used for measurements, money, scientific calculations.</p>
<pre><code class="language-python">price = 19.99
pi = 3.14159
percentage = 85.5
weight = 72.3</code></pre>

<h4>Boolean</h4>
<p>Can only be True or False. Used for yes/no decisions, flags, and conditions.</p>
<pre><code class="language-python">isLoggedIn = True
gameOver = False
hasWon = True
isValid = False</code></pre>

<h4>Character</h4>
<p>A single character - letter, digit, symbol, or space. Usually enclosed in single quotes.</p>
<pre><code class="language-python">grade = 'A'
initial = 'J'
symbol = '@'
digit = '7'    # Note: '7' is a character, 7 is an integer!</code></pre>

<h4>String</h4>
<p>A sequence of zero or more characters. Used for text, names, messages. Enclosed in quotes.</p>
<pre><code class="language-python">name = "Alice Smith"
message = "Hello, World!"
empty = ""
number_as_text = "42"    # This is text, not a number!</code></pre>

<div class="tip-box">
    <strong>Common Mistakes:</strong>
    <ul>
        <li><code>"7"</code> is a STRING, but <code>7</code> is an INTEGER - they're different!</li>
        <li>You cannot add <code>"5" + 3</code> directly (string + integer)</li>
        <li>Boolean True/False is not the same as the strings "True"/"False"</li>
    </ul>
</div>
            `
        },
        'Variables & Constants': {
            content: `
<h2>Variables and Constants</h2>

<div class="definition-box">
    <strong>Variable:</strong> A named storage location in memory whose value CAN change during program execution. Think of it as a labeled box that can hold different things at different times.
</div>

<div class="definition-box">
    <strong>Constant:</strong> A named storage location whose value is set once and CANNOT be changed. Like a sealed container - once you put something in, it stays there.
</div>

<h3>Variables in Action</h3>
<pre><code class="language-python"># Variables can change
score = 0           # Start at 0
score = score + 10  # Now it's 10
score = score + 5   # Now it's 15
print(score)        # Outputs: 15

# The same variable holds different values at different times
playerName = "Alice"
playerName = "Bob"  # Changed to Bob
print(playerName)   # Outputs: Bob</code></pre>

<h3>Constants in Action</h3>
<pre><code class="language-python"># Constants should NOT change (by convention, use UPPERCASE)
PI = 3.14159
VAT_RATE = 0.20
MAX_LIVES = 3
SCHOOL_NAME = "Riverside Academy"

# Use them in calculations
circumference = 2 * PI * radius
priceWithVAT = price * (1 + VAT_RATE)</code></pre>

<h3>Naming Rules</h3>
<table class="notes-table">
    <tr><th>Rule</th><th>Valid ✓</th><th>Invalid ✗</th></tr>
    <tr><td>Must start with a letter or underscore</td><td>score, _count</td><td>1stPlace, 99bottles</td></tr>
    <tr><td>Can contain letters, numbers, underscores</td><td>player1, total_score</td><td>player-1, total score</td></tr>
    <tr><td>No spaces allowed</td><td>firstName</td><td>first name</td></tr>
    <tr><td>No special characters</td><td>email_address</td><td>email@address</td></tr>
    <tr><td>Case-sensitive</td><td>Score ≠ score</td><td>-</td></tr>
</table>

<h3>Good Naming Practice</h3>
<div class="example-box">
    <h4>Bad Names vs Good Names</h4>
    <pre><code class="language-python"># BAD - unclear what they mean
x = 16
y = 75.5
z = True

# GOOD - descriptive and meaningful
age = 16
averageScore = 75.5
isGameOver = True</code></pre>
</div>

<h3>Why Use Constants?</h3>
<ul>
    <li><strong>Prevents accidental changes:</strong> Can't accidentally modify PI to 4</li>
    <li><strong>Self-documenting:</strong> MAX_PLAYERS is clearer than just 4</li>
    <li><strong>Easy updates:</strong> Change the constant once, updates everywhere</li>
    <li><strong>No "magic numbers":</strong> Avoid unexplained values in code</li>
</ul>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Use meaningful names - the examiner should understand what data is stored</li>
        <li>Constants are typically written in UPPERCASE_WITH_UNDERSCORES</li>
        <li>Variables typically use camelCase or snake_case</li>
        <li>In pseudocode, use ← for assignment, not =</li>
    </ul>
</div>
            `
        },
        'Operators': {
            content: `
<h2>Operators</h2>

<h3>Arithmetic Operators</h3>
<table class="notes-table">
    <tr><th>Operator</th><th>Name</th><th>Example</th><th>Result</th></tr>
    <tr><td>+</td><td>Addition</td><td>5 + 3</td><td>8</td></tr>
    <tr><td>-</td><td>Subtraction</td><td>5 - 3</td><td>2</td></tr>
    <tr><td>*</td><td>Multiplication</td><td>5 * 3</td><td>15</td></tr>
    <tr><td>/</td><td>Division</td><td>5 / 2</td><td>2.5</td></tr>
    <tr><td>DIV or //</td><td>Integer Division</td><td>5 DIV 2</td><td>2</td></tr>
    <tr><td>MOD or %</td><td>Modulus (remainder)</td><td>5 MOD 2</td><td>1</td></tr>
    <tr><td>^</td><td>Exponent</td><td>2 ^ 3</td><td>8</td></tr>
</table>

<h3>Comparison Operators</h3>
<table class="notes-table">
    <tr><th>Operator</th><th>Meaning</th></tr>
    <tr><td>=  or ==</td><td>Equal to</td></tr>
    <tr><td>≠ or !=</td><td>Not equal to</td></tr>
    <tr><td>&lt;</td><td>Less than</td></tr>
    <tr><td>&gt;</td><td>Greater than</td></tr>
    <tr><td>&lt;=</td><td>Less than or equal</td></tr>
    <tr><td>&gt;=</td><td>Greater than or equal</td></tr>
</table>

<h3>Logical Operators</h3>
<table class="notes-table">
    <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
    <tr><td>AND</td><td>Both must be true</td><td>x > 0 AND x < 10</td></tr>
    <tr><td>OR</td><td>At least one true</td><td>x < 0 OR x > 100</td></tr>
    <tr><td>NOT</td><td>Reverses value</td><td>NOT found</td></tr>
</table>

<div class="tip-box">
    <strong>MOD is useful for:</strong> checking if even (n MOD 2 = 0), extracting digits, cycling through values.
</div>
            `
        },
        'Selection (IF/ELSE)': {
            content: `
<h2>Selection Statements</h2>
<div class="definition-box">
    <strong>Selection:</strong> Making decisions in code - executing different code based on conditions.
</div>

<h3>IF Statement</h3>
<pre><code class="language-plaintext">IF condition THEN
    // code runs if TRUE
ENDIF</code></pre>

<h3>IF-ELSE Statement</h3>
<pre><code class="language-plaintext">IF condition THEN
    // code if TRUE
ELSE
    // code if FALSE
ENDIF</code></pre>

<h3>IF-ELSE IF-ELSE (Nested)</h3>
<pre><code class="language-plaintext">IF score >= 90 THEN
    grade ← "A"
ELSE IF score >= 80 THEN
    grade ← "B"
ELSE IF score >= 70 THEN
    grade ← "C"
ELSE
    grade ← "F"
ENDIF</code></pre>

<h3>CASE/SWITCH Statement</h3>
<pre><code class="language-plaintext">CASE choice OF
    1: OUTPUT "Option 1"
    2: OUTPUT "Option 2"
    3: OUTPUT "Option 3"
    DEFAULT: OUTPUT "Invalid"
ENDCASE</code></pre>

<div class="tip-box">
    <strong>Exam Tip:</strong> Always include ENDIF/ENDCASE. Indent code inside selection statements.
</div>
            `
        },
        'Iteration (Loops)': {
            content: `
<h2>Iteration (Loops)</h2>
<div class="definition-box">
    <strong>Iteration:</strong> Repeating a block of code multiple times. Also called "looping". Essential for processing lists, repeating actions, and automating repetitive tasks.
</div>

<h3>Three Types of Loops</h3>

<h2>1. FOR Loop (Count-Controlled)</h2>
<p>Use when you <strong>know exactly how many times</strong> to repeat.</p>

<pre><code class="language-plaintext">FOR counter ← startValue TO endValue
    // Code to repeat
NEXT counter</code></pre>

<div class="example-box">
    <h4>Example: Print numbers 1 to 5</h4>
    <pre><code class="language-python"># Pseudocode
FOR i ← 1 TO 5
    OUTPUT i
NEXT i

# Python
for i in range(1, 6):    # Note: range excludes the end value
    print(i)

# Output: 1, 2, 3, 4, 5</code></pre>
</div>

<div class="example-box">
    <h4>Example: Countdown from 10</h4>
    <pre><code class="language-plaintext">FOR i ← 10 TO 1 STEP -1
    OUTPUT i
NEXT i
OUTPUT "Blast off!"</code></pre>
</div>

<h2>2. WHILE Loop (Pre-Condition)</h2>
<p>Use when you <strong>don't know how many times</strong> to repeat. Checks condition <strong>BEFORE</strong> each iteration. May execute <strong>zero times</strong> if condition is false initially.</p>

<pre><code class="language-plaintext">WHILE condition is TRUE
    // Code to repeat
ENDWHILE</code></pre>

<div class="example-box">
    <h4>Example: Password entry</h4>
    <pre><code class="language-python"># Pseudocode
password ← ""
WHILE password ≠ "secret123"
    OUTPUT "Enter password: "
    INPUT password
ENDWHILE
OUTPUT "Access granted!"

# Python
password = ""
while password != "secret123":
    password = input("Enter password: ")
print("Access granted!")</code></pre>
</div>

<h2>3. REPEAT-UNTIL Loop (Post-Condition)</h2>
<p>Checks condition <strong>AFTER</strong> each iteration. Always executes <strong>at least once</strong>.</p>

<pre><code class="language-plaintext">REPEAT
    // Code to repeat
UNTIL condition is TRUE</code></pre>

<div class="example-box">
    <h4>Example: Menu selection</h4>
    <pre><code class="language-plaintext">REPEAT
    OUTPUT "1. Play Game"
    OUTPUT "2. View Scores"
    OUTPUT "3. Exit"
    OUTPUT "Enter choice: "
    INPUT choice
UNTIL choice >= 1 AND choice <= 3</code></pre>
    <p>This guarantees the menu is shown at least once!</p>
</div>

<h3>Comparison Table</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>FOR</th><th>WHILE</th><th>REPEAT-UNTIL</th></tr>
    <tr><td><strong>When to use</strong></td><td>Known iterations</td><td>Unknown iterations</td><td>Unknown, but at least 1</td></tr>
    <tr><td><strong>Condition check</strong></td><td>Automatic counter</td><td>Before (pre-test)</td><td>After (post-test)</td></tr>
    <tr><td><strong>Minimum runs</strong></td><td>0 (if start > end)</td><td>0</td><td>1 (always)</td></tr>
    <tr><td><strong>Example use</strong></td><td>Process all items in array</td><td>Wait for valid input</td><td>Show menu at least once</td></tr>
</table>

<h3>Common Loop Patterns</h3>

<h4>Running Total</h4>
<pre><code class="language-python">total = 0
FOR i ← 1 TO 5
    INPUT number
    total ← total + number
NEXT i
OUTPUT "Sum is: ", total</code></pre>

<h4>Counting Occurrences</h4>
<pre><code class="language-python">count = 0
FOR i ← 0 TO LENGTH(list) - 1
    IF list[i] = searchValue THEN
        count ← count + 1
    ENDIF
NEXT i
OUTPUT "Found ", count, " occurrences"</code></pre>

<div class="tip-box">
    <strong>Avoiding Infinite Loops:</strong>
    <ul>
        <li>WHILE and REPEAT loops need a way to eventually become false/true</li>
        <li>Always ensure the condition can change inside the loop</li>
        <li>Test with small values first</li>
    </ul>
</div>

<p class="warning">⚠️ <strong>Infinite Loop Example (BAD!):</strong><br>
<code>x ← 1</code><br>
<code>WHILE x > 0</code> — x is always > 0, never changes!<br>
This will run forever and crash your program!</p>
            `
        },
        'Arrays': {
            content: `
<h2>Arrays</h2>
<div class="definition-box">
    <strong>Array:</strong> A data structure that stores multiple values of the SAME type under ONE name, where each value is accessed by its index (position number). Think of it as a row of numbered boxes.
</div>

<h3>Why Use Arrays?</h3>
<p>Without arrays, storing 100 student scores would need 100 separate variables! Arrays let you store and process large amounts of related data efficiently.</p>

<h3>Key Concepts</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Meaning</th><th>Example</th></tr>
    <tr><td><strong>Index</strong></td><td>Position number (usually starts at 0)</td><td>scores[0] is the first element</td></tr>
    <tr><td><strong>Element</strong></td><td>Individual value stored in the array</td><td>The value 85 at position 2</td></tr>
    <tr><td><strong>Length/Size</strong></td><td>Number of elements in the array</td><td>An array with 5 elements</td></tr>
</table>

<h3>Visual Representation</h3>
<div class="example-box">
    <h4>Array: names = ["Alice", "Bob", "Charlie", "Diana"]</h4>
<pre><code>Index:     0        1        2          3
        ┌────────┬────────┬──────────┬────────┐
        │ Alice  │  Bob   │ Charlie  │ Diana  │
        └────────┴────────┴──────────┴────────┘
        
names[0] = "Alice"     (first element)
names[1] = "Bob"       (second element)
names[2] = "Charlie"   (third element)
names[3] = "Diana"     (fourth element, LAST)
names[4] = ERROR!      (index out of bounds)</code></pre>
</div>

<h3>Declaring and Using Arrays</h3>
<pre><code class="language-python"># Creating arrays
scores = [85, 92, 78, 95, 88]      # Array of 5 integers
names = ["Alice", "Bob", "Charlie"] # Array of 3 strings
empty = []                          # Empty array

# Accessing elements (0-indexed!)
firstScore = scores[0]    # 85
lastScore = scores[4]     # 88

# Changing elements
scores[2] = 80            # Change 78 to 80

# Getting array length
size = len(scores)        # 5</code></pre>

<h3>Looping Through Arrays</h3>
<pre><code class="language-plaintext"># Method 1: Using index
FOR i ← 0 TO LENGTH(scores) - 1
    OUTPUT scores[i]
NEXT i

# Method 2: For each element (some languages)
FOR EACH score IN scores
    OUTPUT score
NEXT</code></pre>

<h3>Common Array Operations</h3>

<h4>Find the total/sum</h4>
<pre><code class="language-python">total = 0
FOR i ← 0 TO LENGTH(scores) - 1
    total ← total + scores[i]
NEXT i
OUTPUT "Total: ", total</code></pre>

<h4>Find the average</h4>
<pre><code class="language-python">total = 0
FOR i ← 0 TO LENGTH(scores) - 1
    total ← total + scores[i]
NEXT i
average ← total / LENGTH(scores)
OUTPUT "Average: ", average</code></pre>

<h4>Find the maximum</h4>
<pre><code class="language-python">max ← scores[0]              # Assume first is largest
FOR i ← 1 TO LENGTH(scores) - 1
    IF scores[i] > max THEN
        max ← scores[i]
    ENDIF
NEXT i
OUTPUT "Maximum: ", max</code></pre>

<h3>2D Arrays (Tables/Grids)</h3>
<p>Arrays can have multiple dimensions - like a table with rows and columns.</p>

<div class="example-box">
    <h4>2D Array: A 3x3 grid</h4>
<pre><code>grid = [[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]]

        Col 0  Col 1  Col 2
Row 0  [  1  ,   2  ,   3  ]
Row 1  [  4  ,   5  ,   6  ]
Row 2  [  7  ,   8  ,   9  ]

grid[0][0] = 1   (row 0, column 0)
grid[1][2] = 6   (row 1, column 2)
grid[2][1] = 8   (row 2, column 1)</code></pre>
</div>

<p class="warning">⚠️ <strong>Common Error - Index Out of Bounds:</strong><br>
If an array has 5 elements (indices 0-4), accessing index 5 causes an error!<br>
Always use <code>LENGTH(array) - 1</code> as the maximum valid index.</p>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Arrays are 0-indexed: first element is at index 0</li>
        <li>Last valid index = LENGTH - 1</li>
        <li>All elements should be the same data type</li>
        <li>Use loops to process arrays - don't write repetitive code</li>
    </ul>
</div>
            `
        },
        'Functions & Procedures': {
            content: `
<h2>Functions and Procedures (Subroutines)</h2>

<div class="definition-box">
    <strong>Subroutine:</strong> A named block of reusable code that performs a specific task. There are two types: procedures and functions.
</div>

<div class="definition-box">
    <strong>Procedure:</strong> A subroutine that performs actions but does NOT return a value. It just DOES something.
</div>

<div class="definition-box">
    <strong>Function:</strong> A subroutine that performs a task AND returns a value. It CALCULATES and gives back a result.
</div>

<h3>The Key Difference</h3>
<table class="notes-table">
    <tr><th>Procedure</th><th>Function</th></tr>
    <tr><td>Does NOT return a value</td><td>ALWAYS returns a value</td></tr>
    <tr><td>Performs an action</td><td>Calculates a result</td></tr>
    <tr><td>Called as a statement</td><td>Called in an expression</td></tr>
    <tr><td>Example: displayMenu()</td><td>Example: calculateArea(5, 3)</td></tr>
</table>

<h3>Procedure Example</h3>
<pre><code class="language-plaintext">PROCEDURE displayWelcome(name)
    OUTPUT "================================"
    OUTPUT "  Welcome, ", name, "!"
    OUTPUT "================================"
ENDPROCEDURE

// Calling the procedure
displayWelcome("Alice")

// Output:
// ================================
//   Welcome, Alice!
// ================================</code></pre>

<h3>Function Example</h3>
<pre><code class="language-plaintext">FUNCTION calculateArea(length, width)
    area ← length * width
    RETURN area
ENDFUNCTION

// Calling the function and using the returned value
roomArea ← calculateArea(5, 3)
OUTPUT "The area is: ", roomArea    // Outputs: The area is: 15

// Can also use directly in expressions
totalArea ← calculateArea(4, 6) + calculateArea(3, 3)
OUTPUT totalArea    // Outputs: 33</code></pre>

<h3>Parameters vs Arguments</h3>
<div class="example-box">
    <pre><code class="language-plaintext">FUNCTION add(num1, num2)    ← num1 and num2 are PARAMETERS
    RETURN num1 + num2         (placeholders in definition)
ENDFUNCTION

result ← add(5, 3)           ← 5 and 3 are ARGUMENTS
                               (actual values passed in)</code></pre>
</div>

<h3>More Function Examples</h3>

<h4>Check if number is even</h4>
<pre><code class="language-plaintext">FUNCTION isEven(number)
    IF number MOD 2 = 0 THEN
        RETURN TRUE
    ELSE
        RETURN FALSE
    ENDIF
ENDFUNCTION

// Usage
IF isEven(7) THEN
    OUTPUT "Even"
ELSE
    OUTPUT "Odd"
ENDIF</code></pre>

<h4>Calculate grade from score</h4>
<pre><code class="language-plaintext">FUNCTION getGrade(score)
    IF score >= 90 THEN
        RETURN "A*"
    ELSE IF score >= 80 THEN
        RETURN "A"
    ELSE IF score >= 70 THEN
        RETURN "B"
    ELSE IF score >= 60 THEN
        RETURN "C"
    ELSE
        RETURN "F"
    ENDIF
ENDFUNCTION

// Usage
myGrade ← getGrade(85)
OUTPUT "Your grade: ", myGrade    // Outputs: Your grade: A</code></pre>

<h3>Benefits of Using Subroutines</h3>
<ul>
    <li><strong>Reusability:</strong> Write once, use many times</li>
    <li><strong>Readability:</strong> Main program is cleaner and easier to understand</li>
    <li><strong>Testing:</strong> Test each subroutine independently</li>
    <li><strong>Maintenance:</strong> Fix a bug once, fixed everywhere it's used</li>
    <li><strong>Modularity:</strong> Break complex problems into smaller parts</li>
    <li><strong>Teamwork:</strong> Different people can work on different subroutines</li>
</ul>

<div class="tip-box">
    <strong>Remember:</strong>
    <ul>
        <li>Functions RETURN values - use RETURN keyword</li>
        <li>Procedures just DO things - no RETURN (or return nothing)</li>
        <li>Give subroutines descriptive names: calculateTotal, displayMenu, isValid</li>
        <li>Keep subroutines focused on ONE task</li>
    </ul>
</div>
            `
        },
        'Validation': {
            content: `
<h2>Validation</h2>
<div class="definition-box">
    <strong>Validation:</strong> Automatic checking by a computer program that data entered is reasonable, sensible, and within acceptable boundaries BEFORE it is processed. Validation checks if data is acceptable, NOT if it is correct.
</div>

<h3>Validation vs Verification - KEY DIFFERENCE!</h3>
<table class="notes-table">
    <tr><th>Validation</th><th>Verification</th></tr>
    <tr><td>Automatic computer check</td><td>Human check</td></tr>
    <tr><td>Checks if data is REASONABLE</td><td>Checks if data is ACCURATE/CORRECT</td></tr>
    <tr><td>Example: Age is a number between 0-120</td><td>Example: User checks their typed email is correct</td></tr>
    <tr><td>Can be wrong but valid (age=25 when really 26)</td><td>Confirms data matches the truth</td></tr>
</table>

<div class="tip-box">
    <strong>Remember:</strong> Validation can check if data is SENSIBLE but NOT if it's CORRECT. An age of 25 passes validation even if the person is actually 26!
</div>

<h2>Types of Validation - LEARN ALL OF THESE!</h2>

<h3>1. Range Check</h3>
<div class="definition-box">
    <strong>Range Check:</strong> Ensures data falls within acceptable minimum and maximum limits.
</div>

<div class="example-box">
    <h4>Examples:</h4>
    <ul>
        <li>Age must be between 0 and 120</li>
        <li>Exam mark must be between 0 and 100</li>
        <li>Month must be between 1 and 12</li>
        <li>Temperature must be between -50 and 60</li>
    </ul>
    
    <h4>Pseudocode:</h4>
<pre><code>REPEAT
    OUTPUT "Enter your age (0-120): "
    INPUT age
    IF age < 0 OR age > 120 THEN
        OUTPUT "Invalid! Age must be between 0 and 120"
    ENDIF
UNTIL age >= 0 AND age <= 120</code></pre>
</div>

<h3>2. Type Check</h3>
<div class="definition-box">
    <strong>Type Check:</strong> Ensures data is of the correct data type (integer, string, real, etc.).
</div>

<div class="example-box">
    <h4>Examples:</h4>
    <ul>
        <li>Age must be an integer (whole number)</li>
        <li>Price must be a real number (decimal)</li>
        <li>Name must be a string (text)</li>
        <li>Answer must be Boolean (True/False)</li>
    </ul>
    
    <h4>Pseudocode:</h4>
<pre><code>REPEAT
    OUTPUT "Enter quantity: "
    INPUT quantity
    IF NOT isInteger(quantity) THEN
        OUTPUT "Invalid! Please enter a whole number"
    ENDIF
UNTIL isInteger(quantity)</code></pre>
</div>

<h3>3. Length Check</h3>
<div class="definition-box">
    <strong>Length Check:</strong> Ensures data has the correct number of characters - either exact, minimum, maximum, or a range.
</div>

<div class="example-box">
    <h4>Examples:</h4>
    <ul>
        <li>Password must be at least 8 characters</li>
        <li>UK postcode must be 6-8 characters</li>
        <li>Username must be between 3 and 20 characters</li>
        <li>PIN must be exactly 4 digits</li>
    </ul>
    
    <h4>Pseudocode:</h4>
<pre><code>REPEAT
    OUTPUT "Enter password (minimum 8 characters): "
    INPUT password
    IF LENGTH(password) < 8 THEN
        OUTPUT "Password too short! Must be at least 8 characters"
    ENDIF
UNTIL LENGTH(password) >= 8</code></pre>
</div>

<h3>4. Presence Check</h3>
<div class="definition-box">
    <strong>Presence Check:</strong> Ensures that data has actually been entered and the field is not left empty.
</div>

<div class="example-box">
    <h4>Examples:</h4>
    <ul>
        <li>Name field cannot be empty</li>
        <li>Email address must be provided</li>
        <li>All required fields marked with * must be filled in</li>
    </ul>
    
    <h4>Pseudocode:</h4>
<pre><code>REPEAT
    OUTPUT "Enter your name: "
    INPUT name
    IF name = "" THEN
        OUTPUT "Name cannot be empty! Please enter your name."
    ENDIF
UNTIL name ≠ ""</code></pre>
</div>

<h3>5. Format Check (Pattern Check)</h3>
<div class="definition-box">
    <strong>Format Check:</strong> Ensures data matches a specific pattern or format.
</div>

<div class="example-box">
    <h4>Examples:</h4>
    <ul>
        <li>Email must contain @ and a domain (user@example.com)</li>
        <li>UK postcode format: LL## #LL (e.g., SW1A 1AA)</li>
        <li>Date must be DD/MM/YYYY format</li>
        <li>Phone number must start with 0 and be 11 digits</li>
        <li>National Insurance: LL######L (e.g., AB123456C)</li>
    </ul>
    
    <h4>Pseudocode:</h4>
<pre><code>REPEAT
    OUTPUT "Enter email address: "
    INPUT email
    IF NOT contains(email, "@") OR NOT contains(email, ".") THEN
        OUTPUT "Invalid email format! Must contain @ and a domain"
    ENDIF
UNTIL contains(email, "@") AND contains(email, ".")</code></pre>
</div>

<h3>6. Check Digit</h3>
<div class="definition-box">
    <strong>Check Digit:</strong> An extra digit calculated from the other digits and added to the end. Used to detect errors in data entry (especially transposition errors).
</div>

<div class="example-box">
    <h4>Examples:</h4>
    <ul>
        <li>ISBN numbers (book codes) - last digit is check digit</li>
        <li>Barcodes (EAN-13) - includes check digit</li>
        <li>Credit card numbers (Luhn algorithm)</li>
    </ul>
    
    <p><strong>How it works:</strong> When a barcode is scanned, the check digit is recalculated. If it doesn't match the stored check digit, an error has occurred.</p>
</div>

<h3>7. Lookup Check (Table Lookup)</h3>
<div class="definition-box">
    <strong>Lookup Check:</strong> Checks that data exists in a predefined list of acceptable values.
</div>

<div class="example-box">
    <h4>Examples:</h4>
    <ul>
        <li>Country must be from the list of valid countries</li>
        <li>Product code must exist in the database</li>
        <li>Title must be Mr, Mrs, Ms, Miss, or Dr</li>
        <li>Day must be Monday, Tuesday, Wednesday, etc.</li>
    </ul>
    
    <h4>Pseudocode:</h4>
<pre><code>validTitles = ["Mr", "Mrs", "Ms", "Miss", "Dr"]
REPEAT
    OUTPUT "Enter title (Mr/Mrs/Ms/Miss/Dr): "
    INPUT title
    IF title NOT IN validTitles THEN
        OUTPUT "Invalid title! Please choose from the list."
    ENDIF
UNTIL title IN validTitles</code></pre>
</div>

<h3>Summary Table</h3>
<table class="notes-table">
    <tr><th>Validation Type</th><th>What It Checks</th><th>Example</th></tr>
    <tr><td><strong>Range Check</strong></td><td>Value within limits</td><td>Age between 0-120</td></tr>
    <tr><td><strong>Type Check</strong></td><td>Correct data type</td><td>Age must be integer</td></tr>
    <tr><td><strong>Length Check</strong></td><td>Correct number of characters</td><td>Password 8-20 chars</td></tr>
    <tr><td><strong>Presence Check</strong></td><td>Data has been entered</td><td>Name field not empty</td></tr>
    <tr><td><strong>Format Check</strong></td><td>Correct pattern/format</td><td>Email contains @</td></tr>
    <tr><td><strong>Check Digit</strong></td><td>Calculated digit matches</td><td>Barcode check digit</td></tr>
    <tr><td><strong>Lookup Check</strong></td><td>Value in allowed list</td><td>Country from list</td></tr>
</table>

<h3>Combining Validation Checks</h3>
<div class="example-box">
    <h4>Complete validation for a password</h4>
<pre><code>FUNCTION validatePassword(password)
    // Presence check
    IF password = "" THEN
        RETURN "Password cannot be empty"
    ENDIF
    
    // Length check (minimum)
    IF LENGTH(password) < 8 THEN
        RETURN "Password must be at least 8 characters"
    ENDIF
    
    // Length check (maximum)
    IF LENGTH(password) > 20 THEN
        RETURN "Password cannot exceed 20 characters"
    ENDIF
    
    // Format check (must contain a number)
    IF NOT containsDigit(password) THEN
        RETURN "Password must contain at least one number"
    ENDIF
    
    RETURN "Valid"
ENDFUNCTION</code></pre>
</div>

<h3>Practice Questions</h3>
<div class="example-box">
    <ol>
        <li>What type of validation would check that a mark is between 0 and 100?</li>
        <li>Which validation type checks that a phone number starts with 07?</li>
        <li>What's the difference between validation and verification?</li>
        <li>Which validation ensures a field isn't left blank?</li>
        <li>Give an example of a lookup validation check.</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
        <ol>
            <li>Range check</li>
            <li>Format check (pattern check)</li>
            <li>Validation = automatic computer check if data is reasonable; Verification = human check if data is accurate/correct</li>
            <li>Presence check</li>
            <li>Checking a country is from a valid list of countries, or a product code exists in a database</li>
        </ol>
    </details>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Know ALL seven types of validation</li>
        <li>Be able to write pseudocode for each validation type</li>
        <li>Remember: Validation checks if data is REASONABLE, not CORRECT</li>
        <li>Often multiple validation checks are combined for one field</li>
        <li>Use REPEAT-UNTIL loops to keep asking until valid data is entered</li>
    </ul>
</div>
            `
        },
        'String Handling': {
            content: `
<h2>String Handling (Paper 2)</h2>
<div class="definition-box">
    <strong>String:</strong> A sequence of characters (text). String handling involves manipulating, searching, and modifying text data - essential for Paper 2 programming.
</div>

<h3>Key String Operations</h3>
<table class="notes-table">
    <tr><th>Operation</th><th>Description</th><th>Example</th><th>Result</th></tr>
    <tr><td><strong>LENGTH</strong></td><td>Number of characters</td><td>LENGTH("Hello")</td><td>5</td></tr>
    <tr><td><strong>SUBSTRING</strong></td><td>Extract part of string</td><td>SUBSTRING("Hello", 0, 2)</td><td>"He"</td></tr>
    <tr><td><strong>UPPER</strong></td><td>Convert to uppercase</td><td>UPPER("Hello")</td><td>"HELLO"</td></tr>
    <tr><td><strong>LOWER</strong></td><td>Convert to lowercase</td><td>LOWER("Hello")</td><td>"hello"</td></tr>
    <tr><td><strong>CONCATENATE</strong></td><td>Join strings together</td><td>"Hello" + " World"</td><td>"Hello World"</td></tr>
    <tr><td><strong>ASC</strong></td><td>Get ASCII code</td><td>ASC("A")</td><td>65</td></tr>
    <tr><td><strong>CHR</strong></td><td>Get character from code</td><td>CHR(65)</td><td>"A"</td></tr>
</table>

<h3>Accessing Individual Characters</h3>
<p>Strings are like arrays - each character has an index (starting from 0):</p>
<pre><code class="language-python">text = "Hello"
# Index:  01234

text[0]    # "H" (first character)
text[1]    # "e" (second character)
text[4]    # "o" (last character)
text[-1]   # "o" (last character - Python)
</code></pre>

<h3>Common String Tasks</h3>

<h4>1. Count occurrences of a character</h4>
<pre><code class="language-python">text = "Hello World"
count = 0
FOR i = 0 TO LENGTH(text) - 1
    IF text[i] = "l" THEN
        count = count + 1
    ENDIF
NEXT i
OUTPUT count    // Outputs: 3</code></pre>

<h4>2. Reverse a string</h4>
<pre><code class="language-python">text = "Hello"
reversed = ""
FOR i = LENGTH(text) - 1 TO 0 STEP -1
    reversed = reversed + text[i]
NEXT i
OUTPUT reversed    // Outputs: "olleH"</code></pre>

<h4>3. Check if palindrome</h4>
<pre><code class="language-python">text = "radar"
reversed = ""
FOR i = LENGTH(text) - 1 TO 0 STEP -1
    reversed = reversed + text[i]
NEXT i
IF text = reversed THEN
    OUTPUT "Palindrome!"
ELSE
    OUTPUT "Not a palindrome"
ENDIF</code></pre>

<h4>4. Extract first name from full name</h4>
<pre><code class="language-python">fullName = "John Smith"
firstName = ""
FOR i = 0 TO LENGTH(fullName) - 1
    IF fullName[i] = " " THEN
        BREAK    // Stop at space
    ENDIF
    firstName = firstName + fullName[i]
NEXT i
OUTPUT firstName    // Outputs: "John"</code></pre>

<div class="tip-box">
    <strong>Paper 2 Tips:</strong>
    <ul>
        <li>Remember strings are 0-indexed (first character is position 0)</li>
        <li>LENGTH gives total characters, so last index is LENGTH - 1</li>
        <li>Build new strings by concatenating characters one at a time</li>
        <li>Practice reversing, searching, and extracting substrings</li>
    </ul>
</div>
            `
        },
        'File Handling': {
            content: `
<h2>File Handling (Paper 2)</h2>
<div class="definition-box">
    <strong>File Handling:</strong> Reading data from files and writing data to files. This allows programs to store data permanently (data persists after program ends).
</div>

<h3>Why Use Files?</h3>
<ul>
    <li><strong>Persistence:</strong> Data survives after program closes</li>
    <li><strong>Large data:</strong> Store more data than fits in memory</li>
    <li><strong>Sharing:</strong> Data can be used by other programs</li>
    <li><strong>Input:</strong> Read data prepared in advance</li>
</ul>

<h3>File Operations</h3>
<table class="notes-table">
    <tr><th>Operation</th><th>Purpose</th></tr>
    <tr><td><strong>OPEN</strong></td><td>Open a file for reading or writing</td></tr>
    <tr><td><strong>READ</strong></td><td>Get data from a file</td></tr>
    <tr><td><strong>WRITE</strong></td><td>Put data into a file</td></tr>
    <tr><td><strong>CLOSE</strong></td><td>Finish using the file</td></tr>
    <tr><td><strong>EOF</strong></td><td>Check for End Of File</td></tr>
</table>

<h3>File Modes</h3>
<table class="notes-table">
    <tr><th>Mode</th><th>Description</th></tr>
    <tr><td><strong>Read ("r")</strong></td><td>Open for reading only</td></tr>
    <tr><td><strong>Write ("w")</strong></td><td>Open for writing (overwrites existing)</td></tr>
    <tr><td><strong>Append ("a")</strong></td><td>Open for writing (adds to end)</td></tr>
</table>

<h3>Reading from a File</h3>
<pre><code class="language-python"># Pseudocode
OPEN "data.txt" FOR READ AS file
WHILE NOT EOF(file)
    line = READLINE(file)
    OUTPUT line
ENDWHILE
CLOSE file

# Python
file = open("data.txt", "r")
for line in file:
    print(line)
file.close()</code></pre>

<h3>Writing to a File</h3>
<pre><code class="language-python"># Pseudocode
OPEN "output.txt" FOR WRITE AS file
WRITELINE(file, "Hello World")
WRITELINE(file, "This is line 2")
CLOSE file

# Python
file = open("output.txt", "w")
file.write("Hello World\\n")
file.write("This is line 2\\n")
file.close()</code></pre>

<h3>Appending to a File</h3>
<pre><code class="language-python"># Add to existing file without overwriting
OPEN "log.txt" FOR APPEND AS file
WRITELINE(file, "New entry added")
CLOSE file</code></pre>

<h3>Example: Read numbers and calculate average</h3>
<pre><code class="language-python">OPEN "numbers.txt" FOR READ AS file
total = 0
count = 0
WHILE NOT EOF(file)
    number = READLINE(file)
    total = total + number
    count = count + 1
ENDWHILE
CLOSE file

average = total / count
OUTPUT "Average: ", average</code></pre>

<h3>Example: Save high scores</h3>
<pre><code class="language-python">// Writing scores
OPEN "scores.txt" FOR WRITE AS file
WRITELINE(file, playerName + "," + score)
CLOSE file

// Reading scores
OPEN "scores.txt" FOR READ AS file
WHILE NOT EOF(file)
    line = READLINE(file)
    // Split line by comma to get name and score
    OUTPUT line
ENDWHILE
CLOSE file</code></pre>

<div class="tip-box">
    <strong>Paper 2 Tips:</strong>
    <ul>
        <li>Always CLOSE files when finished</li>
        <li>Use READ mode for input, WRITE for output</li>
        <li>APPEND adds to end, WRITE overwrites everything</li>
        <li>Check for EOF (End Of File) when reading</li>
        <li>Each WRITELINE creates a new line in the file</li>
    </ul>
</div>
            `
        },
        'Testing': {
            content: `
<h2>Testing (Paper 2)</h2>
<div class="definition-box">
    <strong>Testing:</strong> The process of checking that a program works correctly, handles errors gracefully, and meets its requirements.
</div>

<h3>Types of Test Data</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th><th>Example (Age 0-120)</th></tr>
    <tr><td><strong>Normal</strong></td><td>Typical, expected valid data</td><td>25, 45, 67</td></tr>
    <tr><td><strong>Boundary</strong></td><td>At the edges of valid range</td><td>0, 1, 119, 120</td></tr>
    <tr><td><strong>Erroneous</strong></td><td>Invalid data that should be rejected</td><td>-5, 150, "abc"</td></tr>
</table>

<h3>Why Each Type Matters</h3>
<ul>
    <li><strong>Normal:</strong> Confirms program works for typical use</li>
    <li><strong>Boundary:</strong> Checks edges work correctly (common source of bugs)</li>
    <li><strong>Erroneous:</strong> Ensures program handles bad input gracefully</li>
</ul>

<h3>Test Table Example</h3>
<p>For a program that accepts ages 18-65:</p>
<table class="notes-table">
    <tr><th>Test #</th><th>Type</th><th>Input</th><th>Expected Output</th></tr>
    <tr><td>1</td><td>Normal</td><td>25</td><td>Accepted</td></tr>
    <tr><td>2</td><td>Normal</td><td>40</td><td>Accepted</td></tr>
    <tr><td>3</td><td>Boundary</td><td>18</td><td>Accepted (minimum)</td></tr>
    <tr><td>4</td><td>Boundary</td><td>65</td><td>Accepted (maximum)</td></tr>
    <tr><td>5</td><td>Boundary</td><td>17</td><td>Rejected (below min)</td></tr>
    <tr><td>6</td><td>Boundary</td><td>66</td><td>Rejected (above max)</td></tr>
    <tr><td>7</td><td>Erroneous</td><td>-5</td><td>Rejected (negative)</td></tr>
    <tr><td>8</td><td>Erroneous</td><td>"abc"</td><td>Rejected (not number)</td></tr>
</table>

<h3>Trace Tables</h3>
<p>Used to track variable values through program execution:</p>
<div class="example-box">
    <h4>Trace table for: total = 0; FOR i = 1 TO 3: total = total + i</h4>
    <table class="notes-table">
        <tr><th>Step</th><th>i</th><th>total</th></tr>
        <tr><td>Start</td><td>-</td><td>0</td></tr>
        <tr><td>1</td><td>1</td><td>1</td></tr>
        <tr><td>2</td><td>2</td><td>3</td></tr>
        <tr><td>3</td><td>3</td><td>6</td></tr>
    </table>
</div>

<div class="tip-box">
    <strong>Paper 2 Tips:</strong>
    <ul>
        <li>Always include ALL THREE types of test data</li>
        <li>Boundary tests should include values just inside AND just outside the range</li>
        <li>Document expected vs actual results</li>
        <li>Use trace tables to find logic errors</li>
    </ul>
</div>
            `
        }
    },

    'data': {
        'Binary Numbers': {
            content: `
<h2>Binary Number System</h2>
<div class="definition-box">
    <strong>Binary:</strong> A base-2 number system using only two digits: 0 and 1. Computers use binary because electronic circuits have two states: ON (1) and OFF (0), like a light switch.
</div>

<h3>Why Binary?</h3>
<ul>
    <li><strong>Electronics:</strong> Circuits are either on or off - perfect for 0 and 1</li>
    <li><strong>Reliability:</strong> Easy to distinguish between two states (less error-prone than 10 voltage levels)</li>
    <li><strong>Simple logic:</strong> All operations can be built from basic AND, OR, NOT gates</li>
    <li><strong>Noise immunity:</strong> Small voltage fluctuations don't change 0 to 1</li>
</ul>

<h3>Place Values (MEMORIZE THIS!)</h3>
<p>Each position in binary is worth 2× the position to its right (powers of 2):</p>

<table class="notes-table">
    <tr><th>Position</th><td>7</td><td>6</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
    <tr><th>Place Value</th><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>
    <tr><th>Power of 2</th><td>2⁷</td><td>2⁶</td><td>2⁵</td><td>2⁴</td><td>2³</td><td>2²</td><td>2¹</td><td>2⁰</td></tr>
</table>

<div class="tip-box">
    <strong>Memory trick:</strong> Learn the sequence: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024...<br>
    Each number is double the previous one!
</div>

<h3>Binary to Denary (Decimal) Conversion</h3>
<p>Add up the place values where there's a 1:</p>

<div class="example-box">
    <h4>Convert 10110101 to denary</h4>
<pre><code>Place values: 128  64  32  16   8   4   2   1
Binary:         1   0   1   1   0   1   0   1
                ↓       ↓   ↓       ↓       ↓
              128  +  32 + 16  +  4   +  1  = 181

Answer: 10110101 in binary = 181 in denary</code></pre>
</div>

<div class="example-box">
    <h4>Practice: Convert 01100110 to denary</h4>
<pre><code>Place values: 128  64  32  16   8   4   2   1
Binary:         0   1   1   0   0   1   1   0
                    ↓   ↓           ↓   ↓
                   64 + 32    +    4 + 2  = 102

Answer: 01100110 = 102</code></pre>
</div>

<h3>Denary to Binary Conversion</h3>
<p><strong>Method 1: Repeated Division by 2</strong></p>

<div class="example-box">
    <h4>Convert 45 to binary</h4>
<pre><code>45 ÷ 2 = 22 remainder 1  ↑
22 ÷ 2 = 11 remainder 0  │ Read remainders
11 ÷ 2 = 5  remainder 1  │ from bottom
5  ÷ 2 = 2  remainder 1  │ to top
2  ÷ 2 = 1  remainder 0  │
1  ÷ 2 = 0  remainder 1  ↓

Answer: 45 = 101101 in binary</code></pre>
</div>

<p><strong>Method 2: Place Values (Subtraction Method - FASTER!)</strong></p>
<div class="example-box">
    <h4>Convert 45 to binary using place values</h4>
<pre><code>Place values: 128  64  32  16   8   4   2   1

45 - 128 = -83 ✗ (128 doesn't fit, write 0)
45 - 64  = -19 ✗ (64 doesn't fit, write 0)
45 - 32  = 13  ✓ (32 fits! write 1, continue with 13)
13 - 16  = -3  ✗ (16 doesn't fit, write 0)
13 - 8   = 5   ✓ (8 fits! write 1, continue with 5)
5  - 4   = 1   ✓ (4 fits! write 1, continue with 1)
1  - 2   = -1  ✗ (2 doesn't fit, write 0)
1  - 1   = 0   ✓ (1 fits! write 1, done!)

Binary:       0   0   1   0   1   1   0   1
Answer: 45 = 00101101 in 8-bit binary</code></pre>
</div>

<h3>Key Terms</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Definition</th><th>Example</th></tr>
    <tr><td><strong>Bit</strong></td><td>Single binary digit (0 or 1) - smallest unit</td><td>1</td></tr>
    <tr><td><strong>Nibble</strong></td><td>4 bits (half a byte)</td><td>1010</td></tr>
    <tr><td><strong>Byte</strong></td><td>8 bits - standard unit for storing a character</td><td>10101010</td></tr>
    <tr><td><strong>Kilobyte (KB)</strong></td><td>1,024 bytes (2¹⁰)</td><td>A short email</td></tr>
    <tr><td><strong>Megabyte (MB)</strong></td><td>1,024 KB (2²⁰ bytes)</td><td>An MP3 song</td></tr>
    <tr><td><strong>Gigabyte (GB)</strong></td><td>1,024 MB (2³⁰ bytes)</td><td>A movie file</td></tr>
    <tr><td><strong>Terabyte (TB)</strong></td><td>1,024 GB (2⁴⁰ bytes)</td><td>Large hard drive</td></tr>
</table>

<h3>Maximum Values - IMPORTANT FOR EXAMS!</h3>
<table class="notes-table">
    <tr><th>Bits</th><th>Maximum Value (Unsigned)</th><th>Range</th><th>Formula</th></tr>
    <tr><td>4 bits (nibble)</td><td>15</td><td>0 to 15</td><td>2⁴ - 1</td></tr>
    <tr><td>8 bits (byte)</td><td>255</td><td>0 to 255</td><td>2⁸ - 1</td></tr>
    <tr><td>16 bits</td><td>65,535</td><td>0 to 65,535</td><td>2¹⁶ - 1</td></tr>
    <tr><td>32 bits</td><td>4,294,967,295</td><td>0 to ~4 billion</td><td>2³² - 1</td></tr>
</table>

<div class="tip-box">
    <strong>Quick Formula:</strong> Maximum value for n bits = 2ⁿ - 1<br>
    Example: 8 bits = 2⁸ - 1 = 256 - 1 = 255
</div>

<h2>Two's Complement (Signed Binary)</h2>
<div class="definition-box">
    <strong>Two's Complement:</strong> A method for representing NEGATIVE numbers in binary. The leftmost bit (MSB - Most Significant Bit) indicates the sign: 0 = positive, 1 = negative.
</div>

<h3>Why Two's Complement?</h3>
<ul>
    <li>Allows representation of negative numbers</li>
    <li>Only ONE representation of zero (unlike sign-magnitude)</li>
    <li>Addition and subtraction work the same way as unsigned</li>
</ul>

<h3>Two's Complement Range</h3>
<table class="notes-table">
    <tr><th>Bits</th><th>Range</th><th>Min</th><th>Max</th></tr>
    <tr><td>4 bits</td><td>-8 to +7</td><td>1000 = -8</td><td>0111 = +7</td></tr>
    <tr><td>8 bits</td><td>-128 to +127</td><td>10000000 = -128</td><td>01111111 = +127</td></tr>
</table>

<h3>Converting Positive to Negative (Finding Two's Complement)</h3>
<p><strong>Method: Flip all bits, then add 1</strong></p>

<div class="example-box">
    <h4>Convert +5 to -5 in 8-bit two's complement</h4>
<pre><code>Step 1: Write +5 in binary
        +5 = 00000101

Step 2: Flip ALL bits (0→1, 1→0)
        00000101 → 11111010

Step 3: Add 1
        11111010
      +        1
        --------
        11111011

Answer: -5 = 11111011 in two's complement</code></pre>
</div>

<div class="example-box">
    <h4>Convert +35 to -35 in 8-bit two's complement</h4>
<pre><code>Step 1: +35 = 00100011
Step 2: Flip:  11011100
Step 3: Add 1: 11011101

Answer: -35 = 11011101</code></pre>
</div>

<h3>Reading Two's Complement Numbers</h3>
<p><strong>If MSB is 0:</strong> Read normally (it's positive)<br>
<strong>If MSB is 1:</strong> It's negative - flip and add 1 to find the magnitude</p>

<div class="example-box">
    <h4>What decimal number is 11110011 in two's complement?</h4>
<pre><code>MSB is 1, so it's NEGATIVE

Step 1: Flip all bits
        11110011 → 00001100

Step 2: Add 1
        00001100 + 1 = 00001101

Step 3: Convert to decimal
        00001101 = 8 + 4 + 1 = 13

Answer: 11110011 = -13</code></pre>
</div>

<h3>Practice Questions</h3>
<div class="example-box">
    <p><strong>Try these yourself:</strong></p>
    <ol>
        <li>Convert 156 to binary</li>
        <li>Convert 10011100 to denary</li>
        <li>What is -20 in 8-bit two's complement?</li>
        <li>What decimal is 11101010 in two's complement?</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
        <ol>
            <li>156 = 10011100</li>
            <li>10011100 = 128 + 16 + 8 + 4 = 156</li>
            <li>+20 = 00010100, flip = 11101011, add 1 = 11101100</li>
            <li>Flip 11101010 = 00010101, add 1 = 00010110 = 22, so answer is -22</li>
        </ol>
    </details>
</div>

<div class="warning">
    <strong>⚠️ Common Exam Mistakes:</strong>
    <ul>
        <li>Forgetting to add 1 after flipping bits</li>
        <li>Not checking if the number should be negative (MSB = 1)</li>
        <li>Mixing up unsigned and two's complement ranges</li>
    </ul>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Always state if you're using unsigned or two's complement</li>
        <li>Check your answer by converting back</li>
        <li>In 8-bit two's complement: range is -128 to +127</li>
        <li>The most negative number in 8-bit is 10000000 = -128</li>
    </ul>
</div>
            `
        },
        'Hexadecimal': {
            content: `
<h2>Hexadecimal (Hex)</h2>
<div class="definition-box">
    <strong>Hexadecimal:</strong> A base-16 number system using digits 0-9 and letters A-F. It's used as a human-friendly shorthand for binary because each hex digit represents exactly 4 bits.
</div>

<h3>Hex Digits</h3>
<table class="notes-table">
    <tr><th>Decimal</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
    <tr><th>Hex</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
    <tr><th>Binary</th><td>0000</td><td>0001</td><td>0010</td><td>0011</td><td>0100</td><td>0101</td><td>0110</td><td>0111</td></tr>
</table>
<table class="notes-table">
    <tr><th>Decimal</th><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
    <tr><th>Hex</th><td>8</td><td>9</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr>
    <tr><th>Binary</th><td>1000</td><td>1001</td><td>1010</td><td>1011</td><td>1100</td><td>1101</td><td>1110</td><td>1111</td></tr>
</table>

<h3>Why Use Hexadecimal?</h3>
<ul>
    <li><strong>Shorter:</strong> 1 hex digit = 4 bits, so FF is shorter than 11111111</li>
    <li><strong>Easier to read:</strong> Humans find A3F2 easier than 1010001111110010</li>
    <li><strong>Error reduction:</strong> Less chance of mistakes when reading/typing</li>
    <li><strong>Direct conversion:</strong> Easy to convert to/from binary</li>
</ul>

<h3>Common Uses of Hexadecimal</h3>
<ul>
    <li><strong>Color codes:</strong> #FF5733 (red=FF, green=57, blue=33)</li>
    <li><strong>MAC addresses:</strong> 00:1A:2B:3C:4D:5E</li>
    <li><strong>Memory addresses:</strong> 0x7FFF0000</li>
    <li><strong>Error codes:</strong> Error 0x80070005</li>
</ul>

<h3>Binary ↔ Hex Conversion</h3>
<p>Split binary into groups of 4 bits (nibbles), convert each group:</p>

<div class="example-box">
    <h4>Binary to Hex: 10101111</h4>
<pre><code>Step 1: Split into nibbles
        1010  1111

Step 2: Convert each nibble
        1010 = 10 = A
        1111 = 15 = F

Answer: 10101111 = AF</code></pre>
</div>

<div class="example-box">
    <h4>Hex to Binary: 3C</h4>
<pre><code>Step 1: Convert each hex digit to 4-bit binary
        3 = 0011
        C = 1100

Step 2: Combine
        3C = 0011 1100

Answer: 3C = 00111100</code></pre>
</div>

<h3>Hex ↔ Denary Conversion</h3>
<div class="example-box">
    <h4>Hex to Denary: 2F</h4>
<pre><code>Hex place values:  16¹  16⁰
                    ↓    ↓
                    2    F (F = 15)

Calculation: (2 × 16) + (15 × 1)
           = 32 + 15
           = 47

Answer: 2F = 47 in denary</code></pre>
</div>

<div class="example-box">
    <h4>Denary to Hex: 200</h4>
<pre><code>200 ÷ 16 = 12 remainder 8
12  ÷ 16 = 0  remainder 12 (C)

Read bottom to top: C8

Answer: 200 = C8 in hex</code></pre>
</div>

<h3>Color Codes Explained</h3>
<div class="example-box">
    <h4>Understanding #FF5733</h4>
<pre><code>#FF5733
 ││││││
 ││││└┴─ Blue:  33 = 51  (out of 255)
 ││└┴─── Green: 57 = 87  (out of 255)
 └┴───── Red:   FF = 255 (out of 255)

This color is mostly red, a bit of green, little blue = Orange!</code></pre>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Memorize hex A=10, B=11, C=12, D=13, E=14, F=15</li>
        <li>When converting binary to hex, pad with zeros to make groups of 4</li>
        <li>Each hex digit is exactly 4 bits - this makes conversion easy</li>
    </ul>
</div>
            `
        },
        'Binary Addition': {
            content: `
<h2>Binary Addition</h2>
<div class="definition-box">
    <strong>Binary Addition:</strong> Adding binary numbers using the same column method as denary, but with only 0 and 1. When the sum exceeds 1, we carry to the next column.
</div>

<h3>Binary Addition Rules - MEMORIZE THESE!</h3>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>Carry In</th><th>Sum</th><th>Carry Out</th></tr>
    <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td></tr>
    <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
    <tr><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
    <tr><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
</table>

<div class="tip-box">
    <strong>Simple Rules:</strong>
    <ul>
        <li>0 + 0 = 0</li>
        <li>0 + 1 = 1</li>
        <li>1 + 0 = 1</li>
        <li>1 + 1 = 10 (write 0, carry 1)</li>
        <li>1 + 1 + 1 = 11 (write 1, carry 1)</li>
    </ul>
</div>

<h3>Step-by-Step Method</h3>
<ol>
    <li>Write numbers aligned by the right (ones column)</li>
    <li>Start from the <strong>rightmost column</strong></li>
    <li>Add the digits plus any carry from the previous column</li>
    <li>Write down the sum digit; if sum ≥ 2, carry 1 to the next column</li>
    <li>Move left and repeat until done</li>
</ol>

<h3>Example 1: Simple Addition</h3>
<div class="example-box">
    <h4>Add 0101 (5) + 0011 (3)</h4>
<pre><code>Column:    4   3   2   1
           ↓   ↓   ↓   ↓
           0   1   0   1   (5)
         + 0   0   1   1   (3)
         ─────────────────
Carry:         1   1
         ─────────────────
           1   0   0   0   (8)

Working right to left:
• Column 1: 1 + 1 = 0, carry 1
• Column 2: 0 + 1 + carry(1) = 0, carry 1
• Column 3: 1 + 0 + carry(1) = 0, carry 1
• Column 4: 0 + 0 + carry(1) = 1

Check: 5 + 3 = 8 ✓</code></pre>
</div>

<h3>Example 2: Larger Numbers with Multiple Carries</h3>
<div class="example-box">
    <h4>Add 10110110 (182) + 01101001 (105)</h4>
<pre><code>         1 0 1 1 0 1 1 0   (182)
       + 0 1 1 0 1 0 0 1   (105)
       ─────────────────────
Carry: 1 1 1 1 1 1 1
       ─────────────────────
       1 0 0 0 1 1 1 1 1   (287)

Wait! This needs 9 bits, but we only have 8!
This is OVERFLOW - see below.</code></pre>
</div>

<h3>Example 3: 8-bit Addition (No Overflow)</h3>
<div class="example-box">
    <h4>Add 01100100 (100) + 00011001 (25)</h4>
<pre><code>         0 1 1 0 0 1 0 0   (100)
       + 0 0 0 1 1 0 0 1   (25)
       ─────────────────────
Carry:       1 1
       ─────────────────────
         0 1 1 1 1 1 0 1   (125)

Check: 100 + 25 = 125 ✓
This fits in 8 bits (max 255), so no overflow.</code></pre>
</div>

<h2>Overflow Errors - VERY IMPORTANT!</h2>
<div class="definition-box">
    <strong>Overflow:</strong> Occurs when the result of a calculation is too large to be stored in the available number of bits. The extra bit is lost, giving an incorrect result.
</div>

<h3>When Does Overflow Occur?</h3>
<table class="notes-table">
    <tr><th>Number of Bits</th><th>Maximum Unsigned Value</th><th>Overflow If Result Exceeds</th></tr>
    <tr><td>4 bits</td><td>15</td><td>15</td></tr>
    <tr><td>8 bits</td><td>255</td><td>255</td></tr>
    <tr><td>16 bits</td><td>65,535</td><td>65,535</td></tr>
</table>

<div class="example-box">
    <h4>Overflow Example 1: 4-bit (max 15)</h4>
<pre><code>Add 1100 (12) + 0110 (6)

      1 1 0 0   (12)
    + 0 1 1 0   (6)
    ─────────────
    1 0 0 1 0   (18 needs 5 bits!)

In 4-bit system: Result is 0010 (2) ← WRONG!
The leading 1 is lost.
12 + 6 should equal 18, but we get 2!

OVERFLOW has occurred!</code></pre>
</div>

<div class="example-box">
    <h4>Overflow Example 2: 8-bit (max 255)</h4>
<pre><code>Add 11111111 (255) + 00000001 (1)

      1 1 1 1 1 1 1 1   (255)
    + 0 0 0 0 0 0 0 1   (1)
    ───────────────────
    1 0 0 0 0 0 0 0 0   (256 needs 9 bits!)

In 8-bit system: Result is 00000000 (0) ← WRONG!
255 + 1 should equal 256, but we get 0!

OVERFLOW has occurred!</code></pre>
</div>

<div class="example-box">
    <h4>Overflow Example 3: 8-bit</h4>
<pre><code>Add 11000000 (192) + 01100000 (96)

      1 1 0 0 0 0 0 0   (192)
    + 0 1 1 0 0 0 0 0   (96)
    ───────────────────
    1 0 0 1 0 0 0 0 0   (288 needs 9 bits!)

In 8-bit: Result is 00100000 (32) ← WRONG!
192 + 96 = 288, but we get 32.

OVERFLOW - the 9th bit carrying 256 is lost!</code></pre>
</div>

<h3>How to Detect Overflow</h3>
<ul>
    <li><strong>Check the result:</strong> Is it smaller than either input? Overflow!</li>
    <li><strong>Check the carry:</strong> Is there a carry out of the last bit? Overflow!</li>
    <li><strong>Do the maths:</strong> Would the decimal result exceed maximum value? Overflow!</li>
</ul>

<h3>Real-World Consequences of Overflow</h3>
<div class="example-box">
    <p><strong>Ariane 5 Rocket (1996):</strong> A 64-bit number was converted to 16-bit, causing overflow. The rocket veered off course and self-destructed 37 seconds after launch. Cost: $370 million!</p>
    <p><strong>Pac-Man Kill Screen:</strong> Level counter stored in 8 bits. Level 256 causes overflow, corrupting the screen and making the game unplayable.</p>
</div>

<h3>Practice Questions</h3>
<div class="example-box">
    <p><strong>Try these (8-bit):</strong></p>
    <ol>
        <li>Add 00110101 + 00101010</li>
        <li>Add 11001010 + 01010101</li>
        <li>Add 11110000 + 00010001</li>
        <li>Which of the above causes overflow?</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
        <ol>
            <li>00110101 (53) + 00101010 (42) = 01011111 (95) ✓</li>
            <li>11001010 (202) + 01010101 (85) = 100011111 → 00011111 (31) OVERFLOW! (should be 287)</li>
            <li>11110000 (240) + 00010001 (17) = 100000001 → 00000001 (1) OVERFLOW! (should be 257)</li>
            <li>Questions 2 and 3 cause overflow</li>
        </ol>
    </details>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Always work right to left</li>
        <li>Show your carry row clearly</li>
        <li>Check your answer by converting to decimal</li>
        <li>State if overflow has occurred and why</li>
        <li>Remember: overflow = result too big for available bits</li>
    </ul>
</div>

<div class="warning">
    <strong>⚠️ Common Mistakes:</strong>
    <ul>
        <li>Forgetting to add the carry</li>
        <li>Working left to right instead of right to left</li>
        <li>Not recognizing when overflow has occurred</li>
        <li>Writing 2 instead of 10 (0 with carry)</li>
    </ul>
</div>
            `
        },
        'Binary Shifts': {
            content: `
<h2>Binary Shifts</h2>
<div class="definition-box">
    <strong>Binary Shift:</strong> Moving all bits left or right by a certain number of positions. This is a very fast way to multiply or divide by powers of 2.
</div>

<h3>Left Shift (Multiply)</h3>
<p>Shifting left by n positions <strong>multiplies</strong> by 2ⁿ</p>

<div class="example-box">
    <h4>Left shift 00001010 (10) by 1 position</h4>
<pre><code>Before: 0 0 0 0 1 0 1 0  = 10
             ← ← ← ← ← ← ← ←  (shift left)
After:  0 0 0 1 0 1 0 0  = 20

10 × 2 = 20 ✓</code></pre>
</div>

<div class="example-box">
    <h4>Left shift 00000101 (5) by 2 positions</h4>
<pre><code>Before: 0 0 0 0 0 1 0 1  = 5
After:  0 0 0 1 0 1 0 0  = 20

5 × 2² = 5 × 4 = 20 ✓</code></pre>
</div>

<h3>Right Shift (Divide)</h3>
<p>Shifting right by n positions <strong>divides</strong> by 2ⁿ (integer division)</p>

<div class="example-box">
    <h4>Right shift 00010100 (20) by 1 position</h4>
<pre><code>Before: 0 0 0 1 0 1 0 0  = 20
             → → → → → → → →  (shift right)
After:  0 0 0 0 1 0 1 0  = 10

20 ÷ 2 = 10 ✓</code></pre>
</div>

<div class="example-box">
    <h4>Right shift 00011000 (24) by 3 positions</h4>
<pre><code>Before: 0 0 0 1 1 0 0 0  = 24
After:  0 0 0 0 0 0 1 1  = 3

24 ÷ 2³ = 24 ÷ 8 = 3 ✓</code></pre>
</div>

<h3>Summary Table</h3>
<table class="notes-table">
    <tr><th>Shift</th><th>Direction</th><th>Effect</th><th>Example</th></tr>
    <tr><td>Left by 1</td><td>←</td><td>× 2</td><td>5 → 10</td></tr>
    <tr><td>Left by 2</td><td>← ←</td><td>× 4</td><td>5 → 20</td></tr>
    <tr><td>Left by 3</td><td>← ← ←</td><td>× 8</td><td>5 → 40</td></tr>
    <tr><td>Right by 1</td><td>→</td><td>÷ 2</td><td>20 → 10</td></tr>
    <tr><td>Right by 2</td><td>→ →</td><td>÷ 4</td><td>20 → 5</td></tr>
</table>

<p class="warning">⚠️ Right shift performs INTEGER division - remainders are lost. 7 >> 1 = 3 (not 3.5)</p>

<div class="tip-box">
    <strong>Why Use Shifts?</strong>
    <ul>
        <li>Much faster than multiplication/division</li>
        <li>Used in graphics, games, and low-level programming</li>
        <li>Left shift: bits that "fall off" the left are lost</li>
        <li>Right shift: bits that "fall off" the right are lost</li>
    </ul>
</div>
            `
        },
        'Encryption': {
            content: `
<h2>Encryption</h2>
<div class="definition-box">
    <strong>Encryption:</strong> The process of converting readable data (plaintext) into unreadable scrambled data (ciphertext) to protect it from unauthorized access.
</div>

<h3>Key Terms</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Definition</th></tr>
    <tr><td><strong>Plaintext</strong></td><td>Original readable message</td></tr>
    <tr><td><strong>Ciphertext</strong></td><td>Encrypted (scrambled) message</td></tr>
    <tr><td><strong>Key</strong></td><td>Secret value used to encrypt/decrypt</td></tr>
    <tr><td><strong>Encryption</strong></td><td>Plaintext → Ciphertext</td></tr>
    <tr><td><strong>Decryption</strong></td><td>Ciphertext → Plaintext</td></tr>
</table>

<h3>Caesar Cipher</h3>
<p>A simple substitution cipher that shifts each letter by a fixed number of positions.</p>

<div class="example-box">
    <h4>Caesar Cipher with shift of 3</h4>
<pre><code>Plaintext:   H E L L O
Shift +3:    ↓ ↓ ↓ ↓ ↓
Ciphertext:  K H O O R

A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
D E F G H I J K L M N O P Q R S T U V W X Y Z A B C</code></pre>
</div>

<h3>Caesar Cipher Algorithm</h3>
<pre><code class="language-python">FUNCTION encrypt(text, shift)
    result = ""
    FOR each character IN text
        IF character is a letter THEN
            code = ASC(character)
            code = code + shift
            // Wrap around if past Z
            IF code > ASC('Z') THEN
                code = code - 26
            ENDIF
            result = result + CHR(code)
        ELSE
            result = result + character
        ENDIF
    NEXT
    RETURN result
ENDFUNCTION</code></pre>

<h3>Why Caesar Cipher is Weak</h3>
<ul>
    <li>Only 25 possible keys (shifts 1-25)</li>
    <li>Easy to crack by trying all keys (brute force)</li>
    <li>Letter frequency analysis can break it</li>
</ul>

<h3>Modern Encryption Concepts</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th><th>Example Use</th></tr>
    <tr><td><strong>Symmetric</strong></td><td>Same key for encrypt & decrypt</td><td>AES - file encryption</td></tr>
    <tr><td><strong>Asymmetric</strong></td><td>Public key + Private key pair</td><td>HTTPS websites</td></tr>
</table>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Know how Caesar cipher works with shifts</li>
        <li>Be able to encrypt AND decrypt messages</li>
        <li>Remember: decryption uses the OPPOSITE shift</li>
        <li>Understand why simple ciphers are insecure</li>
    </ul>
</div>
            `
        },
        'ASCII & Unicode': {
            content: `
<h2>Character Encoding</h2>
<div class="definition-box">
    <strong>Character Encoding:</strong> A system that assigns unique numbers to characters so computers can store and process text. Without encoding, computers couldn't understand letters, symbols, or text.
</div>

<h2>ASCII</h2>
<div class="definition-box">
    <strong>ASCII</strong> (American Standard Code for Information Interchange): A 7-bit encoding system that represents 128 different characters including letters, digits, punctuation, and control codes.
</div>

<h3>ASCII Character Table (Key Values)</h3>
<table class="notes-table">
    <tr><th>Characters</th><th>Decimal Range</th><th>Example</th></tr>
    <tr><td><strong>Control codes</strong></td><td>0 - 31</td><td>Tab (9), Newline (10)</td></tr>
    <tr><td><strong>Space</strong></td><td>32</td><td>' '</td></tr>
    <tr><td><strong>Digits 0-9</strong></td><td>48 - 57</td><td>'0'=48, '9'=57</td></tr>
    <tr><td><strong>Uppercase A-Z</strong></td><td>65 - 90</td><td>'A'=65, 'Z'=90</td></tr>
    <tr><td><strong>Lowercase a-z</strong></td><td>97 - 122</td><td>'a'=97, 'z'=122</td></tr>
</table>

<h3>Important ASCII Values to Remember</h3>
<div class="example-box">
<pre><code>'A' = 65    'a' = 97    (difference of 32!)
'B' = 66    'b' = 98
'Z' = 90    'z' = 122

'0' = 48    (the CHARACTER zero, not the number!)
'9' = 57

Space = 32</code></pre>
</div>

<h3>ASCII Tricks</h3>
<ul>
    <li><strong>Uppercase to lowercase:</strong> Add 32 (A=65, a=97)</li>
    <li><strong>Lowercase to uppercase:</strong> Subtract 32</li>
    <li><strong>Character digit to number:</strong> Subtract 48 ('5' - 48 = 5)</li>
</ul>

<h2>Unicode</h2>
<div class="definition-box">
    <strong>Unicode:</strong> A universal character encoding standard that supports over 143,000 characters from all the world's writing systems, symbols, and emojis. It's the modern replacement for ASCII.
</div>

<h3>Why Unicode?</h3>
<ul>
    <li>ASCII only has 128 characters - not enough for global use</li>
    <li>Can't represent Chinese, Arabic, Japanese, Russian, etc.</li>
    <li>Unicode includes symbols, mathematical notation, and emojis</li>
</ul>

<h3>Unicode Formats</h3>
<table class="notes-table">
    <tr><th>Format</th><th>Bits per Character</th><th>Characters Supported</th></tr>
    <tr><td><strong>UTF-8</strong></td><td>8-32 bits (variable)</td><td>All Unicode (most common)</td></tr>
    <tr><td><strong>UTF-16</strong></td><td>16-32 bits</td><td>All Unicode</td></tr>
    <tr><td><strong>UTF-32</strong></td><td>32 bits (fixed)</td><td>All Unicode</td></tr>
</table>

<h3>ASCII vs Unicode Comparison</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>ASCII</th><th>Unicode</th></tr>
    <tr><td><strong>Bits</strong></td><td>7 bits</td><td>8-32 bits</td></tr>
    <tr><td><strong>Characters</strong></td><td>128</td><td>143,000+</td></tr>
    <tr><td><strong>Languages</strong></td><td>English only</td><td>All languages</td></tr>
    <tr><td><strong>Emojis</strong></td><td>No</td><td>Yes 😀</td></tr>
    <tr><td><strong>File size</strong></td><td>Smaller</td><td>Larger</td></tr>
    <tr><td><strong>Compatibility</strong></td><td>ASCII subset of Unicode</td><td>Includes ASCII</td></tr>
</table>

<div class="tip-box">
    <strong>Key Points:</strong>
    <ul>
        <li>ASCII is a subset of Unicode - the first 128 Unicode characters are identical to ASCII</li>
        <li>UTF-8 is backward compatible with ASCII</li>
        <li>Unicode uses more storage but supports ALL languages</li>
        <li>Modern systems and the internet primarily use UTF-8</li>
    </ul>
</div>
            `
        },
        'Images': {
            content: `
<h2>Image Representation</h2>
<div class="definition-box">
    <strong>Bitmap Image:</strong> A digital image made up of a grid of tiny squares called pixels (picture elements). Each pixel stores color information as binary data. The image is essentially a map of bits.
</div>

<h3>Key Terms - Learn These Definitions!</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Definition</th><th>Example</th></tr>
    <tr><td><strong>Pixel</strong></td><td>Smallest single point in an image - one colored square</td><td>A single dot of color</td></tr>
    <tr><td><strong>Resolution</strong></td><td>Total number of pixels (Width × Height)</td><td>1920 × 1080 = 2,073,600 pixels</td></tr>
    <tr><td><strong>Color Depth</strong></td><td>Number of bits used to represent each pixel's color</td><td>24-bit = 16.7 million colors</td></tr>
    <tr><td><strong>Metadata</strong></td><td>Additional information stored about the image</td><td>Date taken, camera model, GPS location</td></tr>
</table>

<h3>Resolution Explained</h3>
<p>Resolution determines how much detail an image can show:</p>
<table class="notes-table">
    <tr><th>Resolution</th><th>Name</th><th>Total Pixels</th><th>Use</th></tr>
    <tr><td>640 × 480</td><td>VGA</td><td>307,200</td><td>Old monitors, low quality</td></tr>
    <tr><td>1280 × 720</td><td>HD (720p)</td><td>921,600</td><td>Web videos</td></tr>
    <tr><td>1920 × 1080</td><td>Full HD (1080p)</td><td>2,073,600</td><td>TVs, monitors</td></tr>
    <tr><td>3840 × 2160</td><td>4K UHD</td><td>8,294,400</td><td>High-end TVs</td></tr>
    <tr><td>4032 × 3024</td><td>12 MP</td><td>12,192,768</td><td>Smartphone cameras</td></tr>
</table>

<h3>Color Depth Explained</h3>
<p>More bits per pixel = more possible colors:</p>
<table class="notes-table">
    <tr><th>Color Depth</th><th>Colors Available</th><th>Calculation</th><th>Use Case</th></tr>
    <tr><td>1-bit</td><td>2 (black & white)</td><td>2¹ = 2</td><td>Simple line drawings, fax</td></tr>
    <tr><td>4-bit</td><td>16</td><td>2⁴ = 16</td><td>Early computer graphics</td></tr>
    <tr><td>8-bit</td><td>256</td><td>2⁸ = 256</td><td>GIFs, simple graphics</td></tr>
    <tr><td>16-bit</td><td>65,536</td><td>2¹⁶ = 65,536</td><td>High Color displays</td></tr>
    <tr><td>24-bit</td><td>16,777,216</td><td>2²⁴ = 16.7M</td><td>True Color - photos</td></tr>
    <tr><td>32-bit</td><td>16.7M + transparency</td><td>24-bit + 8-bit alpha</td><td>Graphics with transparency</td></tr>
</table>

<h2>FILE SIZE CALCULATIONS - EXAM ESSENTIAL!</h2>

<div class="definition-box">
    <strong>Formula:</strong><br>
    <strong>File Size (bits) = Width × Height × Color Depth</strong><br><br>
    <strong>File Size (bytes) = (Width × Height × Color Depth) ÷ 8</strong>
</div>

<h3>Unit Conversions - MEMORIZE!</h3>
<table class="notes-table">
    <tr><th>Conversion</th><th>Value</th></tr>
    <tr><td>8 bits</td><td>= 1 byte</td></tr>
    <tr><td>1024 bytes</td><td>= 1 Kilobyte (KB)</td></tr>
    <tr><td>1024 KB</td><td>= 1 Megabyte (MB)</td></tr>
    <tr><td>1024 MB</td><td>= 1 Gigabyte (GB)</td></tr>
</table>

<h3>Worked Example 1 - FULL WORKING</h3>
<div class="example-box">
    <h4>Calculate the file size of an 800×600 image with 24-bit color depth</h4>
<pre><code><strong>Step 1: Calculate total pixels</strong>
Total pixels = Width × Height
             = 800 × 600
             = 480,000 pixels

<strong>Step 2: Calculate size in bits</strong>
Size in bits = Total pixels × Color depth
             = 480,000 × 24
             = 11,520,000 bits

<strong>Step 3: Convert bits to bytes</strong>
Size in bytes = 11,520,000 ÷ 8
              = 1,440,000 bytes

<strong>Step 4: Convert bytes to KB</strong>
Size in KB = 1,440,000 ÷ 1024
           = 1,406.25 KB

<strong>Step 5: Convert KB to MB</strong>
Size in MB = 1,406.25 ÷ 1024
           = 1.373 MB (approximately 1.37 MB)

<strong>Answer: The image file size is approximately 1.37 MB (uncompressed)</strong></code></pre>
</div>

<h3>Worked Example 2</h3>
<div class="example-box">
    <h4>Calculate the file size of a 1920×1080 image with 32-bit color</h4>
<pre><code>Step 1: Total pixels = 1920 × 1080 = 2,073,600 pixels

Step 2: Size in bits = 2,073,600 × 32 = 66,355,200 bits

Step 3: Size in bytes = 66,355,200 ÷ 8 = 8,294,400 bytes

Step 4: Size in KB = 8,294,400 ÷ 1024 = 8,100 KB

Step 5: Size in MB = 8,100 ÷ 1024 = 7.91 MB

<strong>Answer: Approximately 7.91 MB</strong></code></pre>
</div>

<h3>Worked Example 3 - Small Image</h3>
<div class="example-box">
    <h4>Calculate the file size of a 100×100 image with 8-bit color</h4>
<pre><code>Total pixels = 100 × 100 = 10,000 pixels
Size in bits = 10,000 × 8 = 80,000 bits
Size in bytes = 80,000 ÷ 8 = 10,000 bytes
Size in KB = 10,000 ÷ 1024 = 9.77 KB

<strong>Answer: Approximately 9.77 KB</strong></code></pre>
</div>

<h3>24-bit True Color Explained</h3>
<p>Each pixel uses 24 bits: 8 bits for Red, 8 bits for Green, 8 bits for Blue (RGB).</p>

<div class="example-box">
    <h4>How 24-bit color works</h4>
<pre><code>24 bits per pixel:
┌────────────┬────────────┬────────────┐
│  8 bits    │   8 bits   │   8 bits   │
│   RED      │   GREEN    │   BLUE     │
│  0-255     │   0-255    │   0-255    │
└────────────┴────────────┴────────────┘

Color Examples:
Pure Red:    R=255, G=0,   B=0   → Hex: #FF0000
Pure Green:  R=0,   G=255, B=0   → Hex: #00FF00
Pure Blue:   R=0,   G=0,   B=255 → Hex: #0000FF
White:       R=255, G=255, B=255 → Hex: #FFFFFF
Black:       R=0,   G=0,   B=0   → Hex: #000000
Yellow:      R=255, G=255, B=0   → Hex: #FFFF00
Orange:      R=255, G=128, B=0   → Hex: #FF8000</code></pre>
</div>

<h3>Quality vs File Size Trade-off</h3>
<table class="notes-table">
    <tr><th>Change</th><th>Effect on Quality</th><th>Effect on File Size</th></tr>
    <tr><td>↑ Resolution</td><td>Better - more detail, sharper</td><td>LARGER file</td></tr>
    <tr><td>↓ Resolution</td><td>Worse - less detail, pixelated</td><td>Smaller file</td></tr>
    <tr><td>↑ Color Depth</td><td>Better - more colors, smoother gradients</td><td>LARGER file</td></tr>
    <tr><td>↓ Color Depth</td><td>Worse - fewer colors, banding</td><td>Smaller file</td></tr>
</table>

<h3>Practice Questions</h3>
<div class="example-box">
    <p><strong>Calculate the file sizes:</strong></p>
    <ol>
        <li>400 × 300 pixels, 8-bit color</li>
        <li>1024 × 768 pixels, 24-bit color</li>
        <li>3000 × 2000 pixels, 16-bit color</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
        <ol>
            <li>400 × 300 × 8 = 960,000 bits = 120,000 bytes = 117.19 KB</li>
            <li>1024 × 768 × 24 = 18,874,368 bits = 2,359,296 bytes = 2,304 KB = 2.25 MB</li>
            <li>3000 × 2000 × 16 = 96,000,000 bits = 12,000,000 bytes = 11,718.75 KB = 11.44 MB</li>
        </ol>
    </details>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>ALWAYS show your working step by step</li>
        <li>Remember: 8 bits = 1 byte, 1024 bytes = 1 KB, 1024 KB = 1 MB</li>
        <li>File size formula gives UNCOMPRESSED size - actual files may be smaller due to compression</li>
        <li>Double the resolution = 4× the file size (because both width AND height double)</li>
        <li>If asked about metadata, mention it adds to file size but is usually small</li>
    </ul>
</div>

<div class="warning">
    <strong>⚠️ Common Mistakes:</strong>
    <ul>
        <li>Forgetting to divide by 8 when converting bits to bytes</li>
        <li>Using 1000 instead of 1024 for KB/MB conversions</li>
        <li>Not showing working (even if answer is correct)</li>
        <li>Confusing color depth (bits per pixel) with total colors (2^bits)</li>
    </ul>
</div>
            `
        },
        'Sound': {
            content: `
<h2>Sound Representation</h2>
<div class="definition-box">
    <strong>Digital Sound:</strong> Analog sound waves converted to digital data through sampling - measuring the wave's amplitude at regular intervals and storing each measurement as a binary number.
</div>

<h3>Analog vs Digital Sound</h3>
<table class="notes-table">
    <tr><th>Analog Sound</th><th>Digital Sound</th></tr>
    <tr><td>Continuous wave</td><td>Discrete samples (snapshots)</td></tr>
    <tr><td>Natural sound</td><td>Approximation of original</td></tr>
    <tr><td>Degrades when copied</td><td>Perfect copies possible</td></tr>
    <tr><td>Vinyl records, cassettes</td><td>CDs, MP3s, streaming</td></tr>
</table>

<h3>How Sound is Digitized (ADC - Analog to Digital Conversion)</h3>
<ol>
    <li><strong>Sound wave</strong> enters a microphone (analog signal)</li>
    <li>Wave is <strong>sampled</strong> at regular intervals (e.g., 44,100 times per second)</li>
    <li>Each sample's <strong>amplitude is measured</strong> (height of wave)</li>
    <li>Amplitude is <strong>quantized</strong> (rounded to nearest level based on bit depth)</li>
    <li>Each value is converted to a <strong>binary number</strong></li>
    <li>Binary values are <strong>stored</strong> in sequence</li>
</ol>

<h3>Key Terms - MEMORIZE THESE!</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Definition</th><th>Unit</th><th>Typical Values</th></tr>
    <tr><td><strong>Sample Rate</strong></td><td>Number of samples taken per second</td><td>Hz (Hertz)</td><td>CD: 44,100 Hz</td></tr>
    <tr><td><strong>Bit Depth</strong></td><td>Number of bits used for each sample</td><td>bits</td><td>CD: 16-bit</td></tr>
    <tr><td><strong>Bit Rate</strong></td><td>Amount of data processed per second</td><td>kbps</td><td>MP3: 128-320 kbps</td></tr>
    <tr><td><strong>Channels</strong></td><td>Number of separate audio tracks</td><td>-</td><td>1=Mono, 2=Stereo</td></tr>
</table>

<h3>Sample Rate (Sampling Frequency)</h3>
<p>How often we take a "snapshot" of the sound wave. Higher = better quality.</p>

<div class="example-box">
    <h4>Common Sample Rates</h4>
    <table class="notes-table">
        <tr><th>Sample Rate</th><th>Quality</th><th>Use</th></tr>
        <tr><td>8,000 Hz (8 kHz)</td><td>Very low</td><td>Telephone, voice calls</td></tr>
        <tr><td>22,050 Hz (22 kHz)</td><td>Low-Medium</td><td>AM Radio quality</td></tr>
        <tr><td>44,100 Hz (44.1 kHz)</td><td>High (CD quality)</td><td>Music CDs, standard audio</td></tr>
        <tr><td>48,000 Hz (48 kHz)</td><td>High</td><td>DVD, professional video</td></tr>
        <tr><td>96,000 Hz (96 kHz)</td><td>Very High</td><td>High-resolution audio, studios</td></tr>
    </table>
</div>

<div class="tip-box">
    <strong>Nyquist Theorem:</strong> Sample rate must be at least TWICE the highest frequency you want to capture.<br>
    Human hearing: up to ~20,000 Hz (20 kHz)<br>
    Therefore: 44,100 Hz captures everything humans can hear (44,100 > 2 × 20,000)
</div>

<h3>Bit Depth (Sample Resolution)</h3>
<p>How precisely each sample measures the amplitude. More bits = more accurate.</p>

<div class="example-box">
    <h4>Bit Depth Comparison</h4>
    <table class="notes-table">
        <tr><th>Bit Depth</th><th>Amplitude Levels</th><th>Quality</th><th>Use</th></tr>
        <tr><td>8-bit</td><td>256 (2⁸)</td><td>Lo-fi, noisy</td><td>Retro games, voice</td></tr>
        <tr><td>16-bit</td><td>65,536 (2¹⁶)</td><td>CD quality</td><td>Standard music</td></tr>
        <tr><td>24-bit</td><td>16,777,216 (2²⁴)</td><td>Professional</td><td>Studio recording</td></tr>
        <tr><td>32-bit</td><td>4+ billion (2³²)</td><td>Ultra-high</td><td>Professional mixing</td></tr>
    </table>
</div>

<h2>SOUND FILE SIZE CALCULATIONS - EXAM ESSENTIAL!</h2>

<div class="definition-box">
    <strong>Formula:</strong><br>
    <strong>File Size (bits) = Sample Rate × Bit Depth × Channels × Duration (seconds)</strong><br><br>
    <strong>File Size (bytes) = (Sample Rate × Bit Depth × Channels × Duration) ÷ 8</strong>
</div>

<h3>Worked Example 1 - CD Quality Audio</h3>
<div class="example-box">
    <h4>Calculate file size for 30 seconds of CD-quality stereo audio</h4>
<pre><code>Given information:
• Sample rate = 44,100 Hz (CD quality)
• Bit depth = 16 bits (CD quality)
• Channels = 2 (stereo)
• Duration = 30 seconds

<strong>Step 1: Apply the formula</strong>
File size (bits) = Sample Rate × Bit Depth × Channels × Duration
                 = 44,100 × 16 × 2 × 30
                 = 42,336,000 bits

<strong>Step 2: Convert bits to bytes</strong>
File size (bytes) = 42,336,000 ÷ 8
                  = 5,292,000 bytes

<strong>Step 3: Convert bytes to KB</strong>
File size (KB) = 5,292,000 ÷ 1024
               = 5,167.97 KB

<strong>Step 4: Convert KB to MB</strong>
File size (MB) = 5,167.97 ÷ 1024
               = 5.05 MB

<strong>Answer: Approximately 5.05 MB (uncompressed)</strong></code></pre>
</div>

<h3>Worked Example 2 - Phone Call Quality</h3>
<div class="example-box">
    <h4>Calculate file size for 60 seconds of telephone quality mono audio</h4>
<pre><code>Given:
• Sample rate = 8,000 Hz
• Bit depth = 8 bits
• Channels = 1 (mono)
• Duration = 60 seconds

File size (bits) = 8,000 × 8 × 1 × 60
                 = 3,840,000 bits

File size (bytes) = 3,840,000 ÷ 8 = 480,000 bytes

File size (KB) = 480,000 ÷ 1024 = 468.75 KB

<strong>Answer: Approximately 469 KB</strong>

Compare: Same 60 seconds in CD quality stereo would be:
44,100 × 16 × 2 × 60 = 84,672,000 bits = 10.1 MB
That's over 20 times larger!</code></pre>
</div>

<h3>Worked Example 3 - Professional Audio</h3>
<div class="example-box">
    <h4>Calculate file size for a 3-minute song at 48 kHz, 24-bit, stereo</h4>
<pre><code>Given:
• Sample rate = 48,000 Hz
• Bit depth = 24 bits
• Channels = 2 (stereo)
• Duration = 3 minutes = 180 seconds

File size (bits) = 48,000 × 24 × 2 × 180
                 = 414,720,000 bits

File size (bytes) = 414,720,000 ÷ 8 = 51,840,000 bytes

File size (KB) = 51,840,000 ÷ 1024 = 50,625 KB

File size (MB) = 50,625 ÷ 1024 = 49.44 MB

<strong>Answer: Approximately 49.44 MB (uncompressed)</strong>

Note: This is why MP3 compression exists!
An MP3 of this song would be around 3-5 MB.</code></pre>
</div>

<h3>Quality vs File Size Trade-off</h3>
<table class="notes-table">
    <tr><th>Change</th><th>Effect on Quality</th><th>Effect on File Size</th></tr>
    <tr><td>↑ Sample Rate</td><td>Better - captures higher frequencies</td><td>LARGER file</td></tr>
    <tr><td>↓ Sample Rate</td><td>Worse - sounds muffled</td><td>Smaller file</td></tr>
    <tr><td>↑ Bit Depth</td><td>Better - more accurate amplitude</td><td>LARGER file</td></tr>
    <tr><td>↓ Bit Depth</td><td>Worse - more noise, less dynamic range</td><td>Smaller file</td></tr>
    <tr><td>Stereo → Mono</td><td>Worse - no spatial sound</td><td>HALF the size</td></tr>
</table>

<h3>Practice Questions</h3>
<div class="example-box">
    <p><strong>Calculate the file sizes:</strong></p>
    <ol>
        <li>20 seconds of audio at 22,050 Hz, 8-bit, mono</li>
        <li>45 seconds of audio at 44,100 Hz, 16-bit, stereo</li>
        <li>2 minutes of audio at 48,000 Hz, 16-bit, mono</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
        <ol>
            <li>22,050 × 8 × 1 × 20 = 3,528,000 bits = 441,000 bytes = 430.66 KB</li>
            <li>44,100 × 16 × 2 × 45 = 63,504,000 bits = 7,938,000 bytes = 7,752.93 KB = 7.57 MB</li>
            <li>48,000 × 16 × 1 × 120 = 92,160,000 bits = 11,520,000 bytes = 11,250 KB = 10.99 MB</li>
        </ol>
    </details>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>ALWAYS show full working - even partial working can get marks</li>
        <li>Remember: stereo = 2 channels, mono = 1 channel</li>
        <li>CD quality = 44,100 Hz, 16-bit, stereo (memorize this!)</li>
        <li>Convert minutes to seconds before calculating</li>
        <li>These calculations give UNCOMPRESSED sizes - actual MP3s are much smaller</li>
    </ul>
</div>

<div class="warning">
    <strong>⚠️ Common Mistakes:</strong>
    <ul>
        <li>Forgetting to multiply by number of channels (stereo = ×2)</li>
        <li>Forgetting to convert minutes to seconds</li>
        <li>Dividing by 1000 instead of 1024 for KB/MB</li>
        <li>Confusing sample rate (Hz) with bit rate (kbps)</li>
    </ul>
</div>
            `
        },
        'Compression': {
            content: `
<h2>Compression</h2>
<div class="definition-box">
    <strong>Compression:</strong> The process of reducing file size to save storage space and reduce transmission time. Compressed files take up less space and transfer faster over networks.
</div>

<h3>Why Compress?</h3>
<ul>
    <li><strong>Save storage:</strong> Fit more files on a device</li>
    <li><strong>Faster transfers:</strong> Quicker downloads and uploads</li>
    <li><strong>Reduce bandwidth:</strong> Use less internet data</li>
    <li><strong>Faster streaming:</strong> Video/music streams smoothly</li>
</ul>

<h2>Two Types of Compression</h2>

<h3>1. Lossy Compression</h3>
<div class="definition-box">
    <strong>Lossy:</strong> Permanently removes some data to achieve smaller file sizes. The original cannot be perfectly restored.
</div>

<p><strong>Common Lossy Formats:</strong> JPEG (photos), MP3 (music), MP4 (video)</p>

<h3>2. Lossless Compression</h3>
<div class="definition-box">
    <strong>Lossless:</strong> Reduces file size WITHOUT losing any data. The original can be perfectly restored.
</div>

<p><strong>Common Lossless Formats:</strong> PNG (images), ZIP (archives), FLAC (audio)</p>

<h3>Comparison Table</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>Lossy</th><th>Lossless</th></tr>
    <tr><td><strong>Quality</strong></td><td>Some loss</td><td>Perfect</td></tr>
    <tr><td><strong>File size</strong></td><td>Much smaller</td><td>Moderately smaller</td></tr>
    <tr><td><strong>Reversible?</strong></td><td>No</td><td>Yes</td></tr>
    <tr><td><strong>Best for</strong></td><td>Photos, music, video</td><td>Documents, code, source files</td></tr>
</table>

<h3>Run-Length Encoding (RLE)</h3>
<p>A simple lossless compression technique that replaces repeated values with a count.</p>

<div class="example-box">
    <h4>RLE Example</h4>
<pre><code>Original: AAAABBBCCDDDDDD
Encoded:  4A3B2C6D

Saved: 15 characters → 8 characters (47% reduction!)</code></pre>
</div>

<div class="tip-box">
    <strong>When to Use Each:</strong>
    <ul>
        <li><strong>Lossy:</strong> Media for sharing (photos, streaming)</li>
        <li><strong>Lossless:</strong> Documents, source code, originals</li>
    </ul>
</div>
            `
        }
    },

    'computers': {
        'Von Neumann Architecture': {
            content: `
<h2>Von Neumann Architecture</h2>
<div class="definition-box">
    <strong>Von Neumann Architecture:</strong> A computer design where programs and data are stored in the SAME memory and share the same bus system. This is the foundation of virtually all modern computers.
</div>

<h3>Key Principle: Stored Program Concept</h3>
<p>Instructions are stored in memory just like data. This means:</p>
<ul>
    <li>Programs can be changed without rewiring the hardware</li>
    <li>Programs can modify themselves</li>
    <li>The same hardware can run different programs</li>
</ul>

<h3>Main Components</h3>
<table class="notes-table">
    <tr><th>Component</th><th>Purpose</th></tr>
    <tr><td><strong>CPU</strong></td><td>Processes all instructions and data</td></tr>
    <tr><td><strong>Memory (RAM)</strong></td><td>Stores programs AND data currently in use</td></tr>
    <tr><td><strong>Input Devices</strong></td><td>Get data into the computer (keyboard, mouse)</td></tr>
    <tr><td><strong>Output Devices</strong></td><td>Send data out (monitor, printer, speakers)</td></tr>
    <tr><td><strong>Storage</strong></td><td>Permanent storage (HDD, SSD)</td></tr>
    <tr><td><strong>Buses</strong></td><td>Connect all components together</td></tr>
</table>

<h3>The Three Buses</h3>
<table class="notes-table">
    <tr><th>Bus</th><th>Purpose</th><th>Direction</th></tr>
    <tr><td><strong>Address Bus</strong></td><td>Carries memory addresses</td><td>One-way (CPU → Memory)</td></tr>
    <tr><td><strong>Data Bus</strong></td><td>Carries actual data</td><td>Two-way (bidirectional)</td></tr>
    <tr><td><strong>Control Bus</strong></td><td>Carries control signals (read/write)</td><td>Two-way</td></tr>
</table>

<div class="example-box">
    <h4>How the buses work together</h4>
    <p>To READ data from memory:</p>
    <ol>
        <li>CPU puts address on <strong>address bus</strong></li>
        <li>CPU sends "read" signal on <strong>control bus</strong></li>
        <li>Memory sends data back on <strong>data bus</strong></li>
    </ol>
</div>

<h3>Von Neumann Bottleneck</h3>
<p class="warning">⚠️ <strong>Limitation:</strong> Because data and instructions share the same bus, only one can be transferred at a time. This creates a bottleneck that limits processing speed.</p>

<div class="tip-box">
    <strong>Exam Tip:</strong> Remember that Von Neumann = shared memory for data AND instructions. The bottleneck occurs because they share the same pathway.
</div>
            `
        },
        'CPU Components': {
            content: `
<h2>CPU Components</h2>
<div class="definition-box">
    <strong>CPU (Central Processing Unit):</strong> The "brain" of the computer that fetches, decodes, and executes instructions. All processing and calculations happen here. Also called the processor.
</div>

<h3>Main Components of the CPU</h3>
<table class="notes-table">
    <tr><th>Component</th><th>Full Name</th><th>Purpose</th></tr>
    <tr><td><strong>ALU</strong></td><td>Arithmetic Logic Unit</td><td>Performs ALL calculations (+, -, ×, ÷) and logic operations (AND, OR, NOT, comparisons)</td></tr>
    <tr><td><strong>CU</strong></td><td>Control Unit</td><td>Manages the FDE cycle, decodes instructions, coordinates data flow between components</td></tr>
    <tr><td><strong>Registers</strong></td><td>-</td><td>Tiny, ultra-fast storage locations inside the CPU for immediate use</td></tr>
    <tr><td><strong>Cache</strong></td><td>-</td><td>Small, very fast memory between CPU and RAM - stores frequently used data</td></tr>
    <tr><td><strong>Clock</strong></td><td>-</td><td>Generates timing pulses that synchronize all CPU operations</td></tr>
</table>

<h3>The ALU in Detail</h3>
<div class="definition-box">
    <strong>ALU (Arithmetic Logic Unit):</strong> The part of the CPU that performs mathematical and logical operations.
</div>

<p><strong>Arithmetic Operations:</strong></p>
<ul>
    <li>Addition (+)</li>
    <li>Subtraction (-)</li>
    <li>Multiplication (×)</li>
    <li>Division (÷)</li>
</ul>

<p><strong>Logical Operations:</strong></p>
<ul>
    <li>AND, OR, NOT, XOR</li>
    <li>Comparisons (equal, greater than, less than)</li>
    <li>Binary shifts</li>
</ul>

<h3>The Control Unit in Detail</h3>
<div class="definition-box">
    <strong>Control Unit (CU):</strong> The component that manages and coordinates all CPU activities. It doesn't process data itself but tells other parts what to do.
</div>

<p><strong>Functions of the Control Unit:</strong></p>
<ul>
    <li>Fetches instructions from memory</li>
    <li>Decodes instructions to determine what operation is needed</li>
    <li>Controls the timing of operations</li>
    <li>Sends control signals to other components</li>
    <li>Manages data flow between CPU and memory</li>
</ul>

<h2>CPU Registers - MUST KNOW FOR EXAMS!</h2>

<div class="definition-box">
    <strong>Register:</strong> A small, extremely fast storage location inside the CPU. Registers hold data that is being immediately processed. Much faster than RAM!
</div>

<h3>Key Registers and Their Functions</h3>
<table class="notes-table">
    <tr><th>Register</th><th>Full Name</th><th>Purpose</th><th>Memory Aid</th></tr>
    <tr><td><strong>PC</strong></td><td>Program Counter</td><td>Holds the address of the NEXT instruction to fetch</td><td>"Points" to next instruction</td></tr>
    <tr><td><strong>MAR</strong></td><td>Memory Address Register</td><td>Holds the address currently being accessed in memory</td><td>"Address" is in the name</td></tr>
    <tr><td><strong>MDR</strong></td><td>Memory Data Register</td><td>Holds the data being read from OR written to memory</td><td>"Data" is in the name</td></tr>
    <tr><td><strong>CIR</strong></td><td>Current Instruction Register</td><td>Holds the instruction currently being decoded/executed</td><td>"Current" = right now</td></tr>
    <tr><td><strong>ACC</strong></td><td>Accumulator</td><td>Stores results from ALU calculations</td><td>"Accumulates" results</td></tr>
</table>

<div class="example-box">
    <h4>How Registers Work Together</h4>
<pre><code>To fetch and execute "ADD 5":

1. PC contains address 100 (next instruction location)
2. PC value copied to MAR (MAR = 100)
3. Memory at address 100 is read
4. Instruction "ADD 5" copied to MDR
5. MDR contents copied to CIR (CIR = "ADD 5")
6. PC incremented (PC = 101 for next time)
7. CU decodes "ADD 5" 
8. ALU adds 5 to ACC value
9. Result stored in ACC</code></pre>
</div>

<h3>Visual Summary of Registers</h3>
<pre><code>┌─────────────────────────────────────────────────────┐
│                        CPU                          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐         │
│  │   PC    │    │   MAR   │    │   MDR   │         │
│  │ Address │───→│ Address │───→│  Data   │←──┐     │
│  │ of next │    │  to     │    │  to/from│   │     │
│  │  instr  │    │ access  │    │ memory  │   │     │
│  └─────────┘    └─────────┘    └─────────┘   │     │
│       │                              │       │     │
│       │         ┌─────────┐          │       │     │
│       │         │   CIR   │←─────────┘       │     │
│       │         │ Current │                  │     │
│       │         │ Instr.  │                  │     │
│       │         └────┬────┘                  │     │
│       │              │ Decode                │     │
│       │              ↓                       │     │
│       │         ┌─────────┐    ┌─────────┐   │     │
│       │         │   CU    │    │   ALU   │   │     │
│       │         │ Control │───→│  Math   │   │     │
│       │         │  Unit   │    │  Logic  │   │     │
│       │         └─────────┘    └────┬────┘   │     │
│       │                             │        │     │
│       │         ┌─────────┐         │        │     │
│       │         │   ACC   │←────────┘        │     │
│       │         │ Results │─────────────────→│     │
│       │         └─────────┘                  │     │
│       │                                      │     │
└───────┼──────────────────────────────────────┼─────┘
        │                                      │
        ↓                                      ↓
   ┌────────────────────────────────────────────────┐
   │                  MEMORY (RAM)                  │
   └────────────────────────────────────────────────┘</code></pre>

<h2>CPU Performance Factors</h2>

<h3>Three Main Factors Affecting CPU Performance</h3>
<table class="notes-table">
    <tr><th>Factor</th><th>What It Is</th><th>Effect on Performance</th></tr>
    <tr><td><strong>Clock Speed</strong></td><td>Number of cycles per second (measured in GHz)</td><td>Higher = more instructions per second = faster</td></tr>
    <tr><td><strong>Number of Cores</strong></td><td>Number of independent processing units</td><td>More cores = better multitasking, parallel processing</td></tr>
    <tr><td><strong>Cache Size</strong></td><td>Amount of fast memory on the CPU chip</td><td>Larger = fewer slow RAM accesses = faster</td></tr>
</table>

<h3>Clock Speed Explained</h3>
<div class="definition-box">
    <strong>Clock Speed:</strong> The number of instruction cycles the CPU can perform per second. Measured in Hertz (Hz), typically GigaHertz (GHz) for modern CPUs.
</div>

<div class="example-box">
    <p><strong>A 3.5 GHz CPU:</strong></p>
    <ul>
        <li>3.5 GHz = 3,500,000,000 cycles per second</li>
        <li>3.5 billion "ticks" of the clock every second</li>
        <li>Each cycle can perform part of an instruction</li>
    </ul>
</div>

<h3>Cores Explained</h3>
<div class="definition-box">
    <strong>Core:</strong> An independent processing unit within the CPU. Each core can execute instructions separately.
</div>

<ul>
    <li><strong>Single-core:</strong> Can only do one thing at a time</li>
    <li><strong>Dual-core:</strong> 2 cores - can run 2 tasks simultaneously</li>
    <li><strong>Quad-core:</strong> 4 cores - common in modern computers</li>
    <li><strong>Octa-core:</strong> 8 cores - found in high-end systems</li>
</ul>

<div class="tip-box">
    <strong>Important:</strong> More cores doesn't always mean faster! Software must be designed to use multiple cores (parallel processing). A single-threaded program won't benefit from extra cores.
</div>

<h3>Cache Explained</h3>
<div class="definition-box">
    <strong>Cache:</strong> Very fast memory located on or near the CPU chip. Stores copies of frequently accessed data from RAM.
</div>

<table class="notes-table">
    <tr><th>Cache Level</th><th>Size</th><th>Speed</th><th>Location</th></tr>
    <tr><td><strong>L1 Cache</strong></td><td>Smallest (32-64KB)</td><td>Fastest</td><td>On CPU core</td></tr>
    <tr><td><strong>L2 Cache</strong></td><td>Medium (256KB-1MB)</td><td>Fast</td><td>On CPU</td></tr>
    <tr><td><strong>L3 Cache</strong></td><td>Largest (4-50MB)</td><td>Slower than L1/L2</td><td>Shared between cores</td></tr>
</table>

<h3>Practice Questions</h3>
<div class="example-box">
    <ol>
        <li>What is stored in the Program Counter?</li>
        <li>Which register holds the instruction currently being executed?</li>
        <li>What is the purpose of the ALU?</li>
        <li>Name three factors that affect CPU performance.</li>
        <li>What's the difference between the MAR and MDR?</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
        <ol>
            <li>The address of the NEXT instruction to be fetched</li>
            <li>The Current Instruction Register (CIR)</li>
            <li>To perform arithmetic calculations and logic operations</li>
            <li>Clock speed, number of cores, cache size</li>
            <li>MAR holds memory ADDRESSES, MDR holds the actual DATA</li>
        </ol>
    </details>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Know ALL register names and their specific purposes</li>
        <li>PC holds NEXT instruction address, CIR holds CURRENT instruction</li>
        <li>MAR = Address, MDR = Data (the clue is in the names!)</li>
        <li>Be able to explain how clock speed, cores, and cache affect performance</li>
    </ul>
</div>
            `
        },
        'Fetch-Decode-Execute Cycle': {
            content: `
<h2>Fetch-Decode-Execute Cycle</h2>
<div class="definition-box">
    <strong>FDE Cycle:</strong> The continuous cycle the CPU uses to process every instruction. It fetches an instruction from memory, decodes what it means, then executes it. This repeats billions of times per second.
</div>

<h3>The Three Stages</h3>

<h2>1. FETCH</h2>
<p>Get the next instruction from memory:</p>
<ol>
    <li><strong>PC → MAR:</strong> Copy address from Program Counter to Memory Address Register</li>
    <li><strong>Memory lookup:</strong> Find the instruction at that address</li>
    <li><strong>Memory → MDR:</strong> Copy instruction to Memory Data Register</li>
    <li><strong>MDR → CIR:</strong> Copy instruction to Current Instruction Register</li>
    <li><strong>PC + 1:</strong> Increment Program Counter to point to next instruction</li>
</ol>

<h2>2. DECODE</h2>
<p>Work out what the instruction means:</p>
<ol>
    <li>Control Unit examines the instruction in CIR</li>
    <li>Splits instruction into <strong>opcode</strong> (what to do) and <strong>operand</strong> (data/address)</li>
    <li>Determines which circuits/components are needed</li>
</ol>

<h2>3. EXECUTE</h2>
<p>Carry out the instruction:</p>
<ol>
    <li>The relevant CPU component performs the operation</li>
    <li>ALU does calculations if needed</li>
    <li>Results stored in accumulator or memory</li>
    <li>Cycle repeats with next instruction</li>
</ol>

<div class="example-box">
    <h4>Example: ADD 5 instruction</h4>
<pre><code>FETCH:
  PC contains address 100
  Instruction "ADD 5" fetched from address 100
  PC incremented to 101

DECODE:
  CU decodes: "Add the value 5 to the accumulator"

EXECUTE:
  ALU performs: ACC = ACC + 5
  Result stored in accumulator</code></pre>
</div>

<h3>Visual Summary</h3>
<pre><code>┌─────────────────────────────────────────┐
│              FDE CYCLE                   │
│                                          │
│   ┌─────────┐                           │
│   │  FETCH  │ ← Get instruction         │
│   └────┬────┘                           │
│        ↓                                │
│   ┌─────────┐                           │
│   │ DECODE  │ ← Understand it           │
│   └────┬────┘                           │
│        ↓                                │
│   ┌─────────┐                           │
│   │ EXECUTE │ ← Do it                   │
│   └────┬────┘                           │
│        │                                │
│        └──────── Repeat ────────→       │
└─────────────────────────────────────────┘</code></pre>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Know the order: Fetch → Decode → Execute</li>
        <li>PC is incremented during FETCH stage</li>
        <li>This cycle repeats continuously while computer is running</li>
        <li>Each cycle processes ONE instruction</li>
    </ul>
</div>
            `
        },
        'Primary Storage': {
            content: `
<h2>Primary Storage (Main Memory)</h2>
<div class="definition-box">
    <strong>Primary Storage:</strong> Memory that is directly accessible by the CPU. It holds data and instructions currently being used. Fast but limited in size.
</div>

<h3>Types of Primary Storage</h3>

<h4>RAM (Random Access Memory)</h4>
<ul>
    <li><strong>Volatile:</strong> Loses data when power is turned off</li>
    <li><strong>Read/Write:</strong> Can read and write data</li>
    <li><strong>Fast access:</strong> CPU can access any location directly</li>
    <li><strong>Purpose:</strong> Stores running programs and data in use</li>
</ul>

<h4>ROM (Read Only Memory)</h4>
<ul>
    <li><strong>Non-volatile:</strong> Keeps data when power is off</li>
    <li><strong>Read only:</strong> Cannot be easily modified</li>
    <li><strong>Purpose:</strong> Stores boot instructions (BIOS/UEFI)</li>
    <li><strong>Permanent:</strong> Written during manufacturing</li>
</ul>

<h3>Comparison Table</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>RAM</th><th>ROM</th></tr>
    <tr><td><strong>Volatile?</strong></td><td>Yes - loses data</td><td>No - keeps data</td></tr>
    <tr><td><strong>Speed</strong></td><td>Fast</td><td>Fast</td></tr>
    <tr><td><strong>Read/Write</strong></td><td>Both</td><td>Read only</td></tr>
    <tr><td><strong>Contents</strong></td><td>Programs, user data</td><td>Boot instructions</td></tr>
    <tr><td><strong>Size</strong></td><td>4GB - 64GB typical</td><td>Small (few MB)</td></tr>
</table>

<h3>Virtual Memory</h3>
<div class="definition-box">
    <strong>Virtual Memory:</strong> Uses part of the hard drive as if it were RAM when physical RAM is full.
</div>
<ul>
    <li>Allows running more programs than RAM can hold</li>
    <li>Much slower than real RAM (hard drive speed)</li>
    <li>Swaps data between RAM and disk</li>
</ul>

<div class="tip-box">
    <strong>Key Point:</strong> RAM is volatile (temporary), ROM is non-volatile (permanent). Both are primary storage with fast CPU access.
</div>
            `
        },
        'Secondary Storage': {
            content: `
<h2>Secondary Storage</h2>
<div class="definition-box">
    <strong>Secondary Storage:</strong> Non-volatile storage that keeps data permanently, even when powered off. Larger capacity but slower than primary storage.
</div>

<h3>Types of Secondary Storage</h3>

<h4>1. Magnetic Storage</h4>
<p><strong>Hard Disk Drive (HDD)</strong></p>
<ul>
    <li>Spinning magnetic platters with read/write heads</li>
    <li>High capacity (1TB - 20TB)</li>
    <li>Relatively cheap per GB</li>
    <li>Slower than SSD, mechanical parts can fail</li>
</ul>

<h4>2. Solid State Storage</h4>
<p><strong>Solid State Drive (SSD)</strong></p>
<ul>
    <li>No moving parts - uses flash memory chips</li>
    <li>Much faster than HDD</li>
    <li>More expensive per GB</li>
    <li>More durable, silent, lower power</li>
</ul>

<p><strong>USB Flash Drive</strong></p>
<ul>
    <li>Portable solid state storage</li>
    <li>Small capacity (8GB - 256GB typical)</li>
    <li>Good for transferring files</li>
</ul>

<h4>3. Optical Storage</h4>
<p><strong>CD, DVD, Blu-ray</strong></p>
<ul>
    <li>Data stored using laser marks on disc</li>
    <li>CD: ~700MB, DVD: ~4.7GB, Blu-ray: ~25GB</li>
    <li>Good for distributing software, movies</li>
    <li>Becoming less common</li>
</ul>

<h3>Comparison Table</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Speed</th><th>Capacity</th><th>Cost/GB</th><th>Durability</th></tr>
    <tr><td><strong>HDD</strong></td><td>Slow</td><td>Very High</td><td>Low</td><td>Medium</td></tr>
    <tr><td><strong>SSD</strong></td><td>Fast</td><td>High</td><td>Medium</td><td>High</td></tr>
    <tr><td><strong>USB</strong></td><td>Medium</td><td>Low</td><td>Medium</td><td>High</td></tr>
    <tr><td><strong>Optical</strong></td><td>Slow</td><td>Low</td><td>Very Low</td><td>Medium</td></tr>
</table>

<h3>Cloud Storage</h3>
<ul>
    <li>Data stored on remote servers via internet</li>
    <li>Accessible from anywhere with internet</li>
    <li>Examples: Google Drive, Dropbox, iCloud</li>
    <li>Requires internet connection</li>
</ul>

<div class="tip-box">
    <strong>Exam Tip:</strong> Know the differences between storage types, their speeds, capacities, and appropriate uses.
</div>
            `
        },
        'System Software': {
            content: `
<h2>System Software</h2>
<div class="definition-box">
    <strong>System Software:</strong> Software that manages and controls computer hardware, providing a platform for application software to run. The most important is the Operating System.
</div>

<h3>Operating System (OS)</h3>
<p>The main system software that manages all computer resources.</p>

<h4>Key Functions of an OS:</h4>
<table class="notes-table">
    <tr><th>Function</th><th>Description</th></tr>
    <tr><td><strong>Memory Management</strong></td><td>Allocates RAM to programs, manages virtual memory</td></tr>
    <tr><td><strong>Processor Management</strong></td><td>Schedules which programs use the CPU and when</td></tr>
    <tr><td><strong>File Management</strong></td><td>Organizes files and folders, controls read/write access</td></tr>
    <tr><td><strong>I/O Management</strong></td><td>Handles input/output devices (keyboard, printer)</td></tr>
    <tr><td><strong>Security</strong></td><td>User accounts, passwords, access permissions</td></tr>
    <tr><td><strong>User Interface</strong></td><td>GUI (graphical) or CLI (command line) for user interaction</td></tr>
</table>

<h3>Types of User Interface</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th><th>Example</th></tr>
    <tr><td><strong>GUI</strong></td><td>Graphical - windows, icons, menus</td><td>Windows, macOS</td></tr>
    <tr><td><strong>CLI</strong></td><td>Command Line - text commands</td><td>Terminal, Command Prompt</td></tr>
    <tr><td><strong>Menu</strong></td><td>List of options to select</td><td>ATM machines</td></tr>
</table>

<h3>Examples of Operating Systems</h3>
<ul>
    <li><strong>Desktop:</strong> Windows, macOS, Linux</li>
    <li><strong>Mobile:</strong> Android, iOS</li>
    <li><strong>Server:</strong> Windows Server, Linux</li>
</ul>

<div class="tip-box">
    <strong>Key Point:</strong> The OS acts as an intermediary between the user, applications, and hardware. Without it, you couldn't use the computer!
</div>
            `
        },
        'Utility Software': {
            content: `
<h2>Utility Software</h2>
<div class="definition-box">
    <strong>Utility Software:</strong> Programs designed to help maintain, optimize, and secure a computer system. They perform specific tasks to keep the system running smoothly.
</div>

<h3>Common Utility Programs</h3>
<table class="notes-table">
    <tr><th>Utility</th><th>Purpose</th></tr>
    <tr><td><strong>Antivirus</strong></td><td>Detects and removes malware, viruses, trojans</td></tr>
    <tr><td><strong>Firewall</strong></td><td>Monitors and filters network traffic</td></tr>
    <tr><td><strong>Disk Defragmenter</strong></td><td>Reorganizes fragmented files on HDD for faster access</td></tr>
    <tr><td><strong>Backup Software</strong></td><td>Creates copies of files for recovery</td></tr>
    <tr><td><strong>File Compression</strong></td><td>Reduces file size (ZIP, RAR)</td></tr>
    <tr><td><strong>Disk Cleanup</strong></td><td>Removes temporary and unnecessary files</td></tr>
    <tr><td><strong>Encryption</strong></td><td>Scrambles data to protect it</td></tr>
</table>

<h3>Defragmentation Explained</h3>
<div class="example-box">
    <p>When files are saved and deleted, fragments get scattered across the disk:</p>
<pre><code>Before defrag: [A1][B1][--][A2][C1][B2][A3][--]
                (file A is in 3 separate pieces!)

After defrag:  [A1][A2][A3][B1][B2][C1][--][--]
                (file A is now together - faster to read!)</code></pre>
</div>

<p><strong>Note:</strong> SSDs don't need defragmentation - it can actually reduce their lifespan!</p>

<h3>Backup Types</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th></tr>
    <tr><td><strong>Full Backup</strong></td><td>Copies ALL files (takes longest, uses most space)</td></tr>
    <tr><td><strong>Incremental</strong></td><td>Only files changed since last backup</td></tr>
    <tr><td><strong>Differential</strong></td><td>Files changed since last FULL backup</td></tr>
</table>

<div class="tip-box">
    <strong>Exam Tip:</strong> Know the difference between system software (OS, utilities) and application software (Word, games, browsers). System software manages the computer; applications are used by users to do tasks.
</div>
            `
        },
        'Logic Gates': {
            content: `
<h2>Logic Gates</h2>
<div class="definition-box">
    <strong>Logic Gate:</strong> An electronic circuit that performs a Boolean (true/false) operation on one or more binary inputs to produce a single binary output. They are the building blocks of all digital circuits.
</div>

<h3>The Six Main Logic Gates</h3>

<h4>1. AND Gate</h4>
<p>Output is 1 only if ALL inputs are 1 (both must be true)</p>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>A AND B</th></tr>
    <tr><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>0</td></tr>
    <tr><td>1</td><td>0</td><td>0</td></tr>
    <tr><td>1</td><td>1</td><td>1</td></tr>
</table>
<p><strong>Real-world:</strong> Both switches must be ON for light to work</p>

<h4>2. OR Gate</h4>
<p>Output is 1 if ANY input is 1 (at least one must be true)</p>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>A OR B</th></tr>
    <tr><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>1</td></tr>
    <tr><td>1</td><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>1</td><td>1</td></tr>
</table>
<p><strong>Real-world:</strong> Either switch can turn the light on</p>

<h4>3. NOT Gate (Inverter)</h4>
<p>Output is the OPPOSITE of input (flips the value)</p>
<table class="notes-table">
    <tr><th>A</th><th>NOT A</th></tr>
    <tr><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>0</td></tr>
</table>

<h4>4. NAND Gate (NOT AND)</h4>
<p>Opposite of AND - output is 0 only if ALL inputs are 1</p>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>A NAND B</th></tr>
    <tr><td>0</td><td>0</td><td>1</td></tr>
    <tr><td>0</td><td>1</td><td>1</td></tr>
    <tr><td>1</td><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>1</td><td>0</td></tr>
</table>

<h4>5. NOR Gate (NOT OR)</h4>
<p>Opposite of OR - output is 1 only if ALL inputs are 0</p>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>A NOR B</th></tr>
    <tr><td>0</td><td>0</td><td>1</td></tr>
    <tr><td>0</td><td>1</td><td>0</td></tr>
    <tr><td>1</td><td>0</td><td>0</td></tr>
    <tr><td>1</td><td>1</td><td>0</td></tr>
</table>

<h4>6. XOR Gate (Exclusive OR)</h4>
<p>Output is 1 if inputs are DIFFERENT</p>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>A XOR B</th></tr>
    <tr><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>1</td></tr>
    <tr><td>1</td><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>1</td><td>0</td></tr>
</table>
<p><strong>Real-world:</strong> Two-way light switch - either switch changes state</p>

<h3>Memory Tricks</h3>
<div class="tip-box">
    <ul>
        <li><strong>AND:</strong> Both must be 1 (A AND B)</li>
        <li><strong>OR:</strong> At least one is 1 (A OR B)</li>
        <li><strong>XOR:</strong> Exactly one is 1 (one but not both)</li>
        <li><strong>NAND/NOR:</strong> Just invert AND/OR results</li>
    </ul>
</div>
            `
        },
        'Translators': {
            content: `
<h2>Translators</h2>
<div class="definition-box">
    <strong>Translator:</strong> Software that converts source code (human-readable) into machine code (binary that CPU can execute). Without translators, we'd have to write in binary!
</div>

<h3>Three Types of Translators</h3>

<h4>1. Compiler</h4>
<div class="definition-box">
    Translates the ENTIRE source code into machine code at once, creating an executable file.
</div>
<ul>
    <li>Translates whole program before running</li>
    <li>Creates standalone executable file (.exe)</li>
    <li>Shows all errors after compilation</li>
    <li><strong>Examples:</strong> C, C++, Java (to bytecode)</li>
</ul>

<h4>2. Interpreter</h4>
<div class="definition-box">
    Translates and executes code LINE BY LINE, without creating an executable file.
</div>
<ul>
    <li>Translates one line, executes it, moves to next</li>
    <li>No executable file created</li>
    <li>Stops at the first error encountered</li>
    <li><strong>Examples:</strong> Python, JavaScript, Ruby</li>
</ul>

<h4>3. Assembler</h4>
<div class="definition-box">
    Translates assembly language (low-level) into machine code. One assembly instruction = one machine instruction.
</div>
<ul>
    <li>Simple 1-to-1 translation</li>
    <li>Assembly is CPU-specific</li>
    <li><strong>Examples:</strong> NASM, MASM</li>
</ul>

<h3>Compiler vs Interpreter Comparison</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>Compiler</th><th>Interpreter</th></tr>
    <tr><td><strong>Translation</strong></td><td>Whole program at once</td><td>Line by line</td></tr>
    <tr><td><strong>Speed (running)</strong></td><td>Fast (already compiled)</td><td>Slower (translates each time)</td></tr>
    <tr><td><strong>Speed (developing)</strong></td><td>Slower (must recompile)</td><td>Faster (run immediately)</td></tr>
    <tr><td><strong>Executable file</strong></td><td>Yes - can share easily</td><td>No - need source + interpreter</td></tr>
    <tr><td><strong>Error detection</strong></td><td>All errors at end</td><td>Stops at first error</td></tr>
    <tr><td><strong>Memory</strong></td><td>More (stores executable)</td><td>Less (no executable)</td></tr>
    <tr><td><strong>Best for</strong></td><td>Finished software</td><td>Development/testing</td></tr>
</table>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li><strong>Compiler:</strong> Fast to RUN, slow to DEVELOP (must recompile)</li>
        <li><strong>Interpreter:</strong> Slow to RUN, fast to DEVELOP (test immediately)</li>
        <li>Compiled code can be distributed without source code</li>
        <li>Interpreted code needs the interpreter installed</li>
    </ul>
</div>
            `
        }
    },

    'networks': {
        'Network Types (LAN/WAN)': {
            content: `
<h2>Network Types</h2>
<div class="definition-box">
    <strong>Network:</strong> Two or more devices connected together to share resources and communicate.
</div>

<h3>LAN - Local Area Network</h3>
<div class="definition-box">
    A network covering a small geographical area, typically a single building or campus. Usually owned and managed by one organization.
</div>

<ul>
    <li><strong>Coverage:</strong> Small area (room, building, campus)</li>
    <li><strong>Speed:</strong> High speed (100 Mbps - 10 Gbps)</li>
    <li><strong>Ownership:</strong> Privately owned</li>
    <li><strong>Cost:</strong> Lower setup and maintenance</li>
    <li><strong>Examples:</strong> School network, office network, home network</li>
</ul>

<h3>WAN - Wide Area Network</h3>
<div class="definition-box">
    A network covering a large geographical area, connecting multiple LANs across cities, countries, or the world.
</div>

<ul>
    <li><strong>Coverage:</strong> Large area (cities, countries, global)</li>
    <li><strong>Speed:</strong> Generally slower than LAN</li>
    <li><strong>Ownership:</strong> Often uses third-party infrastructure (ISPs)</li>
    <li><strong>Cost:</strong> Higher (leased lines, more equipment)</li>
    <li><strong>Examples:</strong> The Internet, bank networks across branches</li>
</ul>

<h3>Comparison Table</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>LAN</th><th>WAN</th></tr>
    <tr><td><strong>Size</strong></td><td>Small (building)</td><td>Large (countries/global)</td></tr>
    <tr><td><strong>Speed</strong></td><td>Fast (1-10 Gbps)</td><td>Slower (variable)</td></tr>
    <tr><td><strong>Latency</strong></td><td>Low</td><td>Higher</td></tr>
    <tr><td><strong>Ownership</strong></td><td>Private/single org</td><td>Multiple orgs/public</td></tr>
    <tr><td><strong>Setup cost</strong></td><td>Lower</td><td>Higher</td></tr>
    <tr><td><strong>Hardware</strong></td><td>Switches, cables</td><td>Routers, leased lines</td></tr>
</table>

<h3>Other Network Types</h3>
<ul>
    <li><strong>PAN (Personal Area Network):</strong> Very small, around one person (Bluetooth devices)</li>
    <li><strong>MAN (Metropolitan Area Network):</strong> City-wide network</li>
    <li><strong>WLAN (Wireless LAN):</strong> LAN using Wi-Fi</li>
</ul>

<div class="tip-box">
    <strong>Exam Tip:</strong> The Internet is the largest WAN - it connects millions of smaller networks worldwide.
</div>
            `
        },
        'Network Topologies': {
            content: `
<h2>Network Topologies</h2>
<div class="definition-box">
    <strong>Topology:</strong> The arrangement or layout of devices (nodes) in a network - how they are connected to each other.
</div>

<h3>Star Topology</h3>
<p>All devices connect to a central switch or hub.</p>
<pre><code>        [PC]    [PC]
           \\    /
        [Switch/Hub]
           /    \\
        [PC]   [Printer]</code></pre>

<h4>Advantages:</h4>
<ul>
    <li>If one cable fails, only that device is affected</li>
    <li>Easy to add new devices</li>
    <li>Easy to find faults</li>
    <li>Good performance - no collisions</li>
</ul>

<h4>Disadvantages:</h4>
<ul>
    <li>Central switch is a single point of failure</li>
    <li>Requires more cable than bus topology</li>
    <li>More expensive (need central device)</li>
</ul>

<h3>Bus Topology</h3>
<p>All devices connect to a single main cable (backbone).</p>
<pre><code>    [PC]---[PC]---[PC]---[PC]
       \\    |     |    /
    ════════════════════════  (backbone cable)
        |         |
      [PC]     [Printer]</code></pre>

<h4>Advantages:</h4>
<ul>
    <li>Cheap - uses less cable</li>
    <li>Easy to install for small networks</li>
    <li>No central device needed</li>
</ul>

<h4>Disadvantages:</h4>
<ul>
    <li>If backbone fails, entire network fails</li>
    <li>Limited cable length</li>
    <li>Collisions occur with heavy traffic</li>
    <li>Hard to troubleshoot</li>
</ul>

<h3>Mesh Topology</h3>
<p>Every device connects to every other device.</p>

<h4>Advantages:</h4>
<ul>
    <li>Very reliable - multiple paths available</li>
    <li>No single point of failure</li>
    <li>If one link fails, data takes another route</li>
</ul>

<h4>Disadvantages:</h4>
<ul>
    <li>Expensive - lots of cables needed</li>
    <li>Complex to set up and maintain</li>
    <li>Impractical for large networks</li>
</ul>

<h3>Comparison Table</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>Star</th><th>Bus</th><th>Mesh</th></tr>
    <tr><td><strong>Cost</strong></td><td>Medium</td><td>Low</td><td>High</td></tr>
    <tr><td><strong>Reliability</strong></td><td>Good</td><td>Poor</td><td>Excellent</td></tr>
    <tr><td><strong>Scalability</strong></td><td>Easy</td><td>Limited</td><td>Complex</td></tr>
    <tr><td><strong>Single failure point</strong></td><td>Central switch</td><td>Backbone</td><td>None</td></tr>
</table>

<div class="tip-box">
    <strong>Most Common:</strong> Star topology is used in most modern LANs because it balances cost, reliability, and ease of management.
</div>
            `
        },
        'Network Hardware': {
            content: `
<h2>Network Hardware</h2>
<div class="definition-box">
    <strong>Network Hardware:</strong> Physical devices required to create, connect, and manage computer networks.
</div>

<h3>Key Network Devices</h3>
<table class="notes-table">
    <tr><th>Device</th><th>Purpose</th><th>Layer</th></tr>
    <tr><td><strong>NIC</strong></td><td>Network Interface Card - connects device to network</td><td>Physical</td></tr>
    <tr><td><strong>Switch</strong></td><td>Connects devices in a LAN, sends data to specific device</td><td>Data Link</td></tr>
    <tr><td><strong>Router</strong></td><td>Connects different networks, directs traffic between them</td><td>Network</td></tr>
    <tr><td><strong>Hub</strong></td><td>Connects devices, broadcasts to all (outdated)</td><td>Physical</td></tr>
    <tr><td><strong>WAP</strong></td><td>Wireless Access Point - provides Wi-Fi</td><td>Data Link</td></tr>
    <tr><td><strong>Modem</strong></td><td>Converts digital ↔ analog signals for internet</td><td>Physical</td></tr>
</table>

<h3>Switch vs Hub vs Router</h3>
<table class="notes-table">
    <tr><th>Device</th><th>Intelligence</th><th>Traffic</th></tr>
    <tr><td><strong>Hub</strong></td><td>None - "dumb" device</td><td>Broadcasts to ALL ports</td></tr>
    <tr><td><strong>Switch</strong></td><td>Learns MAC addresses</td><td>Sends to SPECIFIC port</td></tr>
    <tr><td><strong>Router</strong></td><td>Uses IP addresses</td><td>Routes between NETWORKS</td></tr>
</table>

<h3>Transmission Media</h3>
<ul>
    <li><strong>Ethernet Cable (Cat5/6):</strong> Copper wires, up to 1 Gbps</li>
    <li><strong>Fiber Optic:</strong> Light pulses, very fast, long distance</li>
    <li><strong>Wireless (Wi-Fi):</strong> Radio waves, convenient but slower</li>
</ul>

<div class="tip-box">
    <strong>Remember:</strong> Switches work within a LAN, Routers connect different networks (like your home to the internet).
</div>
            `
        },
        'Protocols': {
            content: `
<h2>Network Protocols</h2>
<div class="definition-box">
    <strong>Protocol:</strong> A set of rules that govern how data is transmitted, received, and formatted over a network. Protocols ensure devices from different manufacturers can communicate with each other.
</div>

<h3>Why Protocols Are Essential</h3>
<ul>
    <li><strong>Standardization:</strong> Devices from different manufacturers can communicate</li>
    <li><strong>Data formatting:</strong> Both sender and receiver understand the data structure</li>
    <li><strong>Error handling:</strong> Errors can be detected and corrected</li>
    <li><strong>Flow control:</strong> Sender doesn't overwhelm a slower receiver</li>
    <li><strong>Routing:</strong> Data finds the correct path to its destination</li>
    <li><strong>Security:</strong> Data can be encrypted and authenticated</li>
</ul>

<h2>TCP/IP Model - ESSENTIAL FOR EXAMS!</h2>
<div class="definition-box">
    <strong>TCP/IP Model:</strong> A four-layer model that defines how data is transmitted across networks. It's the foundation of the Internet.
</div>

<h3>The Four TCP/IP Layers</h3>
<table class="notes-table">
    <tr><th>Layer</th><th>Name</th><th>Purpose</th><th>Key Protocols</th><th>Data Unit</th></tr>
    <tr><td><strong>4</strong></td><td>Application</td><td>User-facing services and applications</td><td>HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS</td><td>Data</td></tr>
    <tr><td><strong>3</strong></td><td>Transport</td><td>End-to-end communication, reliability</td><td>TCP, UDP</td><td>Segment</td></tr>
    <tr><td><strong>2</strong></td><td>Internet</td><td>Addressing and routing between networks</td><td>IP, ICMP</td><td>Packet</td></tr>
    <tr><td><strong>1</strong></td><td>Network Access</td><td>Physical transmission of data</td><td>Ethernet, Wi-Fi</td><td>Frame</td></tr>
</table>

<h3>Layer 4: Application Layer</h3>
<p>The layer closest to the user. Provides services that applications use to communicate.</p>

<table class="notes-table">
    <tr><th>Protocol</th><th>Full Name</th><th>Purpose</th><th>Port</th></tr>
    <tr><td><strong>HTTP</strong></td><td>HyperText Transfer Protocol</td><td>Web page requests (unencrypted)</td><td>80</td></tr>
    <tr><td><strong>HTTPS</strong></td><td>HTTP Secure</td><td>Encrypted web traffic (uses SSL/TLS)</td><td>443</td></tr>
    <tr><td><strong>FTP</strong></td><td>File Transfer Protocol</td><td>Uploading/downloading files</td><td>21</td></tr>
    <tr><td><strong>SMTP</strong></td><td>Simple Mail Transfer Protocol</td><td>SENDING emails</td><td>25/587</td></tr>
    <tr><td><strong>POP3</strong></td><td>Post Office Protocol v3</td><td>RECEIVING emails (downloads to device)</td><td>110</td></tr>
    <tr><td><strong>IMAP</strong></td><td>Internet Message Access Protocol</td><td>RECEIVING emails (keeps on server)</td><td>143</td></tr>
    <tr><td><strong>DNS</strong></td><td>Domain Name System</td><td>Converts domain names to IP addresses</td><td>53</td></tr>
</table>

<div class="example-box">
    <h4>HTTP vs HTTPS</h4>
    <table class="notes-table">
        <tr><th>HTTP</th><th>HTTPS</th></tr>
        <tr><td>Unencrypted - data sent as plain text</td><td>Encrypted - data scrambled</td></tr>
        <tr><td>Can be intercepted and read</td><td>Cannot be read even if intercepted</td></tr>
        <tr><td>http://example.com</td><td>https://example.com (padlock icon)</td></tr>
        <tr><td>OK for non-sensitive pages</td><td>Essential for logins, payments, personal data</td></tr>
    </table>
</div>

<div class="example-box">
    <h4>Email Protocols: SMTP vs POP3 vs IMAP</h4>
    <table class="notes-table">
        <tr><th>Protocol</th><th>Direction</th><th>Where Emails Stored</th><th>Best For</th></tr>
        <tr><td><strong>SMTP</strong></td><td>Outgoing (sending)</td><td>N/A - just sends</td><td>All email sending</td></tr>
        <tr><td><strong>POP3</strong></td><td>Incoming (receiving)</td><td>Downloaded to your device, deleted from server</td><td>Single device, offline access</td></tr>
        <tr><td><strong>IMAP</strong></td><td>Incoming (receiving)</td><td>Stays on server, synced to devices</td><td>Multiple devices, webmail</td></tr>
    </table>
    <p><strong>Real example:</strong> When you send an email, SMTP is used. When you read it on your phone and laptop, IMAP keeps them in sync.</p>
</div>

<h3>Layer 3: Transport Layer</h3>
<p>Manages end-to-end communication between applications.</p>

<table class="notes-table">
    <tr><th>Protocol</th><th>Full Name</th><th>Features</th><th>Use Cases</th></tr>
    <tr><td><strong>TCP</strong></td><td>Transmission Control Protocol</td><td>Reliable, ordered delivery, error checking, slower</td><td>Web pages, email, file transfer</td></tr>
    <tr><td><strong>UDP</strong></td><td>User Datagram Protocol</td><td>Fast, no reliability guarantee, no ordering</td><td>Video streaming, gaming, VoIP</td></tr>
</table>

<div class="example-box">
    <h4>TCP vs UDP</h4>
    <table class="notes-table">
        <tr><th>TCP</th><th>UDP</th></tr>
        <tr><td>Connection-oriented (handshake first)</td><td>Connectionless (just sends)</td></tr>
        <tr><td>Guarantees delivery</td><td>No delivery guarantee</td></tr>
        <tr><td>Checks for errors, re-sends lost data</td><td>No error correction</td></tr>
        <tr><td>Data arrives in order</td><td>Data may arrive out of order</td></tr>
        <tr><td>Slower but reliable</td><td>Faster but unreliable</td></tr>
        <tr><td>Web browsing, email, downloads</td><td>Live streaming, online gaming</td></tr>
    </table>
    <p><strong>Analogy:</strong> TCP is like sending a signed letter (confirmed delivery). UDP is like shouting across a room (fast but might be missed).</p>
</div>

<h3>Layer 2: Internet Layer</h3>
<p>Handles addressing and routing of data packets between networks.</p>

<div class="definition-box">
    <strong>IP (Internet Protocol):</strong> Responsible for addressing packets with source and destination IP addresses, and routing them across networks.
</div>

<h4>IP Addresses</h4>
<table class="notes-table">
    <tr><th>Version</th><th>Format</th><th>Example</th><th>Addresses Available</th></tr>
    <tr><td><strong>IPv4</strong></td><td>32-bit, 4 octets</td><td>192.168.1.1</td><td>~4.3 billion</td></tr>
    <tr><td><strong>IPv6</strong></td><td>128-bit, 8 groups</td><td>2001:0db8:85a3:0000:0000:8a2e:0370:7334</td><td>~340 undecillion</td></tr>
</table>

<h3>Layer 1: Network Access Layer</h3>
<p>Deals with the physical transmission of data over the network medium.</p>

<ul>
    <li><strong>Ethernet:</strong> Wired network protocol for LANs</li>
    <li><strong>Wi-Fi (802.11):</strong> Wireless network protocol</li>
    <li>Uses <strong>MAC addresses</strong> to identify devices on local network</li>
</ul>

<h3>MAC Address</h3>
<div class="definition-box">
    <strong>MAC Address (Media Access Control):</strong> A unique physical address assigned to every network interface card (NIC). Permanent and set during manufacturing.
</div>

<ul>
    <li><strong>Format:</strong> 48-bit, written in hexadecimal</li>
    <li><strong>Example:</strong> 00:1A:2B:3C:4D:5E or 00-1A-2B-3C-4D-5E</li>
    <li><strong>First 3 pairs:</strong> Manufacturer ID</li>
    <li><strong>Last 3 pairs:</strong> Unique device ID</li>
    <li>Used for communication within a LAN</li>
</ul>

<h3>IP Address vs MAC Address</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>IP Address</th><th>MAC Address</th></tr>
    <tr><td><strong>Layer</strong></td><td>Internet (Layer 2)</td><td>Network Access (Layer 1)</td></tr>
    <tr><td><strong>Assigned</strong></td><td>By network/DHCP</td><td>By manufacturer (permanent)</td></tr>
    <tr><td><strong>Can change?</strong></td><td>Yes</td><td>No (hardcoded)</td></tr>
    <tr><td><strong>Scope</strong></td><td>Global (across internet)</td><td>Local (within LAN)</td></tr>
    <tr><td><strong>Format</strong></td><td>192.168.1.1</td><td>00:1A:2B:3C:4D:5E</td></tr>
</table>

<h3>How Data Travels Through the Layers</h3>
<div class="example-box">
    <h4>Sending a web page request</h4>
<pre><code>1. APPLICATION: Browser creates HTTP request for webpage
                ↓ Add application data
2. TRANSPORT:   TCP breaks data into segments, adds port numbers
                ↓ Add segment header
3. INTERNET:    IP adds source/destination IP addresses
                ↓ Add packet header  
4. NETWORK:     Ethernet adds MAC addresses, converts to signals
                ↓ Add frame header
5. PHYSICAL:    Electrical signals sent over cable/wireless

At the receiving end, this process is REVERSED.</code></pre>
</div>

<h3>Practice Questions</h3>
<div class="example-box">
    <ol>
        <li>Which protocol would you use to send an email?</li>
        <li>What's the difference between POP3 and IMAP?</li>
        <li>Why might you choose UDP over TCP?</li>
        <li>What is the purpose of DNS?</li>
        <li>At which layer does the router operate?</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
        <ol>
            <li>SMTP (Simple Mail Transfer Protocol)</li>
            <li>POP3 downloads emails to device and deletes from server; IMAP keeps emails on server and syncs across devices</li>
            <li>When speed is more important than reliability, e.g., live streaming or gaming</li>
            <li>To convert domain names (like google.com) to IP addresses (like 142.250.185.46)</li>
            <li>Internet layer (Layer 2) - routers use IP addresses</li>
        </ol>
    </details>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Know ALL protocols and their purposes (HTTP, HTTPS, FTP, SMTP, POP3, IMAP)</li>
        <li>Remember: SMTP = Sending, POP3/IMAP = Receiving</li>
        <li>HTTPS = HTTP + encryption (SSL/TLS)</li>
        <li>TCP = reliable but slow, UDP = fast but unreliable</li>
        <li>MAC addresses are permanent, IP addresses can change</li>
    </ul>
</div>
            `
        },
        'Security Threats': {
            content: `
<h2>Security Threats</h2>
<div class="definition-box">
    <strong>Security Threat:</strong> Any potential danger that could exploit a vulnerability to harm a computer system, network, or data.
</div>

<h3>Malware (Malicious Software)</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th><th>How It Spreads</th></tr>
    <tr><td><strong>Virus</strong></td><td>Attaches to files, damages system when file is opened</td><td>Email attachments, downloads</td></tr>
    <tr><td><strong>Worm</strong></td><td>Self-replicates across networks without user action</td><td>Network connections</td></tr>
    <tr><td><strong>Trojan</strong></td><td>Disguised as legitimate software, creates backdoor</td><td>Downloads, fake software</td></tr>
    <tr><td><strong>Ransomware</strong></td><td>Encrypts files, demands payment for decryption</td><td>Email, malicious websites</td></tr>
    <tr><td><strong>Spyware</strong></td><td>Secretly monitors and collects user data</td><td>Hidden in software</td></tr>
    <tr><td><strong>Adware</strong></td><td>Displays unwanted advertisements</td><td>Free software bundles</td></tr>
</table>

<h3>Social Engineering</h3>
<p>Attacks that manipulate PEOPLE rather than technology:</p>
<table class="notes-table">
    <tr><th>Attack</th><th>Description</th></tr>
    <tr><td><strong>Phishing</strong></td><td>Fake emails/websites that trick users into revealing passwords or personal info</td></tr>
    <tr><td><strong>Shoulder surfing</strong></td><td>Watching someone enter passwords or PINs</td></tr>
    <tr><td><strong>Pretexting</strong></td><td>Creating a fake scenario to get information</td></tr>
    <tr><td><strong>Baiting</strong></td><td>Leaving infected USB drives for people to find</td></tr>
</table>

<h3>Other Threats</h3>
<table class="notes-table">
    <tr><th>Threat</th><th>Description</th></tr>
    <tr><td><strong>Brute force</strong></td><td>Trying every possible password combination</td></tr>
    <tr><td><strong>SQL injection</strong></td><td>Inserting malicious code into website forms to access databases</td></tr>
    <tr><td><strong>DDoS attack</strong></td><td>Overwhelming a server with traffic to crash it</td></tr>
    <tr><td><strong>Man-in-the-middle</strong></td><td>Intercepting communications between two parties</td></tr>
    <tr><td><strong>Data theft</strong></td><td>Stealing sensitive information</td></tr>
</table>

<div class="example-box">
    <h4>Phishing Example</h4>
    <p>Email: "Your bank account has been compromised! Click here to verify your details."</p>
    <p>Link goes to fake website that looks like your bank but steals your login.</p>
</div>

<div class="tip-box">
    <strong>Remember:</strong> Social engineering targets PEOPLE, not systems. The best technical security can be bypassed if someone is tricked into giving away their password!
</div>
            `
        },
        'Security Prevention': {
            content: `
<h2>Security Prevention</h2>
<div class="definition-box">
    <strong>Defense in Depth:</strong> Using multiple layers of security so that if one layer fails, others still protect the system.
</div>

<h3>Technical Security Measures</h3>
<table class="notes-table">
    <tr><th>Measure</th><th>What It Does</th><th>Protects Against</th></tr>
    <tr><td><strong>Firewall</strong></td><td>Filters incoming/outgoing network traffic based on rules</td><td>Unauthorized access, some malware</td></tr>
    <tr><td><strong>Antivirus</strong></td><td>Detects and removes malicious software</td><td>Viruses, worms, trojans</td></tr>
    <tr><td><strong>Encryption</strong></td><td>Scrambles data so only authorized users can read it</td><td>Data theft, eavesdropping</td></tr>
    <tr><td><strong>Backups</strong></td><td>Creates copies of data for recovery</td><td>Ransomware, data loss</td></tr>
    <tr><td><strong>Updates/Patches</strong></td><td>Fixes security vulnerabilities in software</td><td>Exploits of known bugs</td></tr>
</table>

<h3>Authentication Methods</h3>
<table class="notes-table">
    <tr><th>Method</th><th>Type</th><th>Example</th></tr>
    <tr><td><strong>Password</strong></td><td>Something you KNOW</td><td>Secret phrase</td></tr>
    <tr><td><strong>Token/Phone</strong></td><td>Something you HAVE</td><td>Code sent to phone</td></tr>
    <tr><td><strong>Biometrics</strong></td><td>Something you ARE</td><td>Fingerprint, face scan</td></tr>
</table>

<h3>Two-Factor Authentication (2FA)</h3>
<div class="definition-box">
    <strong>2FA:</strong> Requires TWO different types of verification - something you know PLUS something you have (or are).
</div>
<div class="example-box">
    <p><strong>Example:</strong> Enter password (something you know) + enter code from phone (something you have)</p>
</div>

<h3>Strong Password Guidelines</h3>
<ul>
    <li>At least 8 characters (12+ is better)</li>
    <li>Mix of uppercase, lowercase, numbers, and symbols</li>
    <li>No personal information (name, birthday)</li>
    <li>Different password for each account</li>
    <li>Consider using a password manager</li>
</ul>

<h3>User Training</h3>
<ul>
    <li>Recognize phishing emails</li>
    <li>Don't click suspicious links</li>
    <li>Report security concerns</li>
    <li>Lock computers when away</li>
    <li>Don't share passwords</li>
</ul>

<div class="tip-box">
    <strong>Exam Tip:</strong> Security requires BOTH technical measures (firewalls, encryption) AND human measures (training, policies). Technology alone isn't enough!
</div>
            `
        }
    },

    'bigger-picture': {
        'Environmental Impact': {
            content: `
<h2>Environmental Impact of Computing</h2>

<h3>Energy Consumption</h3>
<ul>
    <li>Data centers use massive amounts of electricity</li>
    <li>Cooling systems required for servers</li>
    <li>Manufacturing devices requires energy and resources</li>
</ul>

<h3>E-Waste</h3>
<div class="definition-box">
    <strong>E-Waste:</strong> Discarded electronic devices that can contain hazardous materials.
</div>
<ul>
    <li>Toxic materials: lead, mercury, cadmium</li>
    <li>Often shipped to developing countries</li>
    <li>Improper disposal contaminates soil/water</li>
</ul>

<h3>Positive Impacts</h3>
<ul>
    <li><strong>Remote working:</strong> Reduces commuting/emissions</li>
    <li><strong>Smart systems:</strong> Optimize energy use</li>
    <li><strong>Paperless offices:</strong> Reduce deforestation</li>
    <li><strong>Video conferencing:</strong> Reduces travel</li>
</ul>

<h3>Solutions</h3>
<ul>
    <li>Recycling programs</li>
    <li>Energy-efficient hardware</li>
    <li>Renewable energy for data centers</li>
    <li>Extending device lifespans</li>
</ul>
            `
        },
        'Ethical Issues': {
            content: `
<h2>Ethical Issues in Computing</h2>

<h3>Privacy</h3>
<ul>
    <li>Companies collecting personal data</li>
    <li>Surveillance cameras and tracking</li>
    <li>Social media data mining</li>
    <li>Right to be forgotten</li>
</ul>

<h3>Digital Divide</h3>
<div class="definition-box">
    Gap between those with access to technology and those without.
</div>
<ul>
    <li>Economic factors</li>
    <li>Geographic location (rural vs urban)</li>
    <li>Age and digital literacy</li>
</ul>

<h3>AI and Automation</h3>
<ul>
    <li>Job displacement</li>
    <li>Algorithmic bias</li>
    <li>Decision-making accountability</li>
    <li>Autonomous weapons concerns</li>
</ul>

<h3>Social Issues</h3>
<ul>
    <li>Cyberbullying</li>
    <li>Screen addiction</li>
    <li>Spread of misinformation</li>
    <li>Echo chambers and polarization</li>
</ul>

<div class="tip-box">
    <strong>Key principle:</strong> Technology itself is neutral - it's how we use it that raises ethical questions.
</div>
            `
        },
        'Copyright & Licensing': {
            content: `
<h2>Copyright and Licensing</h2>

<h3>Copyright</h3>
<div class="definition-box">
    <strong>Copyright:</strong> Legal protection giving creators exclusive rights to their work.
</div>
<ul>
    <li>Automatic - no registration needed</li>
    <li>Covers: software, music, images, text</li>
    <li>Prevents unauthorized copying/distribution</li>
</ul>

<h3>Software Licenses</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th></tr>
    <tr><td><strong>Proprietary</strong></td><td>Paid, closed source, restrictions apply</td></tr>
    <tr><td><strong>Open Source</strong></td><td>Free to use/modify, source code available</td></tr>
    <tr><td><strong>Freeware</strong></td><td>Free to use but not modify</td></tr>
    <tr><td><strong>Shareware</strong></td><td>Free trial, pay for full version</td></tr>
</table>

<h3>Creative Commons</h3>
<p>Flexible licenses for sharing creative work:</p>
<ul>
    <li>BY - Attribution required</li>
    <li>SA - Share-alike (same license)</li>
    <li>NC - Non-commercial only</li>
    <li>ND - No derivatives</li>
</ul>

<div class="tip-box">
    <strong>Piracy is illegal:</strong> Downloading/sharing copyrighted material without permission is a criminal offense.
</div>
            `
        },
        'Artificial Intelligence': {
            content: `
<h2>Artificial Intelligence</h2>
<div class="definition-box">
    <strong>AI:</strong> Computer systems that can perform tasks that normally require human intelligence.
</div>

<h3>Types of AI</h3>
<ul>
    <li><strong>Narrow AI:</strong> Specialized tasks (Siri, chess programs)</li>
    <li><strong>General AI:</strong> Human-level intelligence (theoretical)</li>
    <li><strong>Machine Learning:</strong> Systems that improve from experience</li>
</ul>

<h3>Applications</h3>
<table class="notes-table">
    <tr><th>Field</th><th>Examples</th></tr>
    <tr><td>Healthcare</td><td>Disease diagnosis, drug discovery</td></tr>
    <tr><td>Transport</td><td>Self-driving cars, traffic prediction</td></tr>
    <tr><td>Finance</td><td>Fraud detection, trading algorithms</td></tr>
    <tr><td>Entertainment</td><td>Recommendations, game AI</td></tr>
</table>

<h3>Concerns</h3>
<ul>
    <li>Job displacement</li>
    <li>Privacy implications</li>
    <li>Bias in algorithms</li>
    <li>Accountability for AI decisions</li>
    <li>Security risks</li>
</ul>

<div class="tip-box">
    <strong>Key point:</strong> AI augments human capabilities but raises important ethical questions about control and responsibility.
</div>
            `
        },
        'Automation & Robotics': {
            content: `
<h2>Automation & Robotics</h2>
<div class="definition-box">
    <strong>Automation:</strong> Using technology to perform tasks with minimal human intervention.
</div>

<h3>Types of Automation</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th><th>Example</th></tr>
    <tr><td><strong>Fixed</strong></td><td>Repetitive, unchanging tasks</td><td>Assembly line welding</td></tr>
    <tr><td><strong>Programmable</strong></td><td>Can be reprogrammed for different tasks</td><td>CNC machines</td></tr>
    <tr><td><strong>Flexible</strong></td><td>Adapts in real-time</td><td>Warehouse robots</td></tr>
</table>

<h3>Robots in Society</h3>
<ul>
    <li><strong>Manufacturing:</strong> Assembly, welding, painting cars</li>
    <li><strong>Healthcare:</strong> Surgical robots, patient care</li>
    <li><strong>Domestic:</strong> Vacuum cleaners, lawn mowers</li>
    <li><strong>Exploration:</strong> Space rovers, deep sea drones</li>
    <li><strong>Military:</strong> Bomb disposal, drones</li>
</ul>

<h3>Advantages of Automation</h3>
<ul>
    <li>Faster and more efficient</li>
    <li>Consistent quality (no human error)</li>
    <li>Can work 24/7 without breaks</li>
    <li>Can work in dangerous environments</li>
    <li>Reduces long-term costs</li>
</ul>

<h3>Disadvantages of Automation</h3>
<ul>
    <li>Job losses - unemployment</li>
    <li>High initial cost</li>
    <li>Requires skilled maintenance</li>
    <li>Lacks human judgment/creativity</li>
    <li>Technical failures can halt production</li>
</ul>

<div class="tip-box">
    <strong>Key Issue:</strong> Balance between efficiency gains and social impact on employment.
</div>
            `
        },
        'Digital Currency': {
            content: `
<h2>Digital Currency & Blockchain</h2>
<div class="definition-box">
    <strong>Digital Currency:</strong> Electronic money that exists only digitally, with no physical form like coins or notes.
</div>

<h3>Types of Digital Currency</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th><th>Example</th></tr>
    <tr><td><strong>Cryptocurrency</strong></td><td>Decentralized, uses blockchain</td><td>Bitcoin, Ethereum</td></tr>
    <tr><td><strong>Central Bank Digital</strong></td><td>Government-issued digital money</td><td>Digital Yuan</td></tr>
    <tr><td><strong>Virtual Currency</strong></td><td>Used in specific platforms</td><td>Game credits</td></tr>
</table>

<h3>Blockchain Technology</h3>
<div class="definition-box">
    <strong>Blockchain:</strong> A distributed ledger that records transactions across many computers, making it nearly impossible to alter.
</div>

<h4>How Blockchain Works:</h4>
<ol>
    <li>Transaction is requested</li>
    <li>Transaction broadcast to network of computers</li>
    <li>Network validates the transaction</li>
    <li>Transaction added to a "block"</li>
    <li>Block added to the chain (permanent record)</li>
</ol>

<h3>Advantages</h3>
<ul>
    <li>Decentralized - no single point of control</li>
    <li>Transparent - all transactions visible</li>
    <li>Secure - cryptographically protected</li>
    <li>Fast international transfers</li>
    <li>Lower transaction fees</li>
</ul>

<h3>Disadvantages</h3>
<ul>
    <li>Volatile value (prices fluctuate wildly)</li>
    <li>Used for illegal transactions</li>
    <li>Environmental impact (energy for mining)</li>
    <li>Not widely accepted</li>
    <li>No consumer protection</li>
</ul>

<div class="tip-box">
    <strong>Key Point:</strong> Blockchain has uses beyond currency - supply chain tracking, voting systems, digital identity.
</div>
            `
        }
    },

    'databases': {
        'Database Concepts': {
            content: `
<h2>Database Concepts</h2>
<div class="definition-box">
    <strong>Database:</strong> An organized collection of structured data, stored electronically. Databases allow efficient storage, retrieval, and management of large amounts of data.
</div>

<h3>Why Use Databases?</h3>
<ul>
    <li>Store large amounts of data efficiently</li>
    <li>Multiple users can access simultaneously</li>
    <li>Easy to search and filter data</li>
    <li>Reduce data redundancy (duplication)</li>
    <li>Maintain data integrity and consistency</li>
</ul>

<h3>Database vs Spreadsheet</h3>
<table class="notes-table">
    <tr><th>Feature</th><th>Database</th><th>Spreadsheet</th></tr>
    <tr><td><strong>Data volume</strong></td><td>Millions of records</td><td>Thousands of rows</td></tr>
    <tr><td><strong>Multiple users</strong></td><td>Yes, simultaneously</td><td>Limited</td></tr>
    <tr><td><strong>Data relationships</strong></td><td>Links between tables</td><td>Limited</td></tr>
    <tr><td><strong>Data integrity</strong></td><td>Strong validation</td><td>Basic</td></tr>
    <tr><td><strong>Complexity</strong></td><td>Requires training</td><td>Easy to use</td></tr>
</table>

<h3>Key Database Terms</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Definition</th><th>Example</th></tr>
    <tr><td><strong>Table</strong></td><td>Collection of related data in rows/columns</td><td>Students table</td></tr>
    <tr><td><strong>Record (Row)</strong></td><td>Single entry in a table</td><td>One student's data</td></tr>
    <tr><td><strong>Field (Column)</strong></td><td>Single piece of data</td><td>StudentName, Age</td></tr>
    <tr><td><strong>Primary Key</strong></td><td>Unique identifier for each record</td><td>StudentID</td></tr>
    <tr><td><strong>Foreign Key</strong></td><td>Links to primary key in another table</td><td>ClassID in Students</td></tr>
</table>

<h3>Example Database Structure</h3>
<div class="example-box">
    <h4>Students Table</h4>
<pre><code>| StudentID | FirstName | LastName | ClassID | Age |
|-----------|-----------|----------|---------|-----|
| S001      | John      | Smith    | C1      | 15  |
| S002      | Emma      | Jones    | C2      | 16  |
| S003      | Ali       | Khan     | C1      | 15  |

Primary Key: StudentID (unique for each student)
Foreign Key: ClassID (links to Classes table)</code></pre>
</div>

<div class="tip-box">
    <strong>Exam Tip:</strong> Primary keys must be UNIQUE and NOT NULL. They identify each record distinctly.
</div>
            `
        },
        'Primary & Foreign Keys': {
            content: `
<h2>Primary & Foreign Keys</h2>

<h3>Primary Key</h3>
<div class="definition-box">
    <strong>Primary Key:</strong> A field (or combination of fields) that uniquely identifies each record in a table. No two records can have the same primary key value.
</div>

<h4>Rules for Primary Keys:</h4>
<ul>
    <li><strong>Unique:</strong> No duplicates allowed</li>
    <li><strong>Not Null:</strong> Must have a value (cannot be empty)</li>
    <li><strong>Unchanging:</strong> Should not change over time</li>
    <li><strong>Simple:</strong> Preferably a single field</li>
</ul>

<h4>Good vs Bad Primary Keys:</h4>
<table class="notes-table">
    <tr><th>Good ✓</th><th>Bad ✗</th><th>Why?</th></tr>
    <tr><td>StudentID</td><td>Name</td><td>Names can be duplicated</td></tr>
    <tr><td>ISBN</td><td>BookTitle</td><td>Titles can repeat</td></tr>
    <tr><td>OrderNumber</td><td>OrderDate</td><td>Many orders same day</td></tr>
    <tr><td>NationalInsuranceNo</td><td>PhoneNumber</td><td>Phone numbers change</td></tr>
</table>

<h3>Foreign Key</h3>
<div class="definition-box">
    <strong>Foreign Key:</strong> A field in one table that links to the primary key of another table. It creates a relationship between two tables.
</div>

<h3>Example: School Database</h3>
<div class="example-box">
<pre><code>CLASSES Table                    STUDENTS Table
+---------+------------+         +-----------+-----------+---------+
| ClassID | ClassName  |         | StudentID | Name      | ClassID |
+---------+------------+         +-----------+-----------+---------+
| C1      | 10A        |         | S001      | John      | C1      |
| C2      | 10B        |    ←──  | S002      | Emma      | C2      |
| C3      | 11A        |    Link | S003      | Ali       | C1      |
+---------+------------+         +-----------+-----------+---------+
Primary Key: ClassID             Primary Key: StudentID
                                 Foreign Key: ClassID

The ClassID in STUDENTS links to ClassID in CLASSES
This tells us which class each student is in.</code></pre>
</div>

<h3>Why Use Foreign Keys?</h3>
<ul>
    <li><strong>Links tables:</strong> Creates relationships between data</li>
    <li><strong>Reduces redundancy:</strong> Store class info once, reference it many times</li>
    <li><strong>Data integrity:</strong> Can't add student to non-existent class</li>
    <li><strong>Easier updates:</strong> Change class name in one place</li>
</ul>

<div class="tip-box">
    <strong>Remember:</strong> Foreign key in one table → Primary key in another table. This creates the link!
</div>
            `
        },
        'SQL Queries': {
            content: `
<h2>SQL Queries</h2>
<div class="definition-box">
    <strong>SQL (Structured Query Language):</strong> The standard language for interacting with relational databases. Used to create, read, update, and delete data (CRUD operations).
</div>

<h3>The Four Main SQL Commands (CRUD)</h3>
<table class="notes-table">
    <tr><th>Operation</th><th>SQL Command</th><th>Purpose</th></tr>
    <tr><td><strong>Create</strong></td><td>INSERT</td><td>Add new records</td></tr>
    <tr><td><strong>Read</strong></td><td>SELECT</td><td>Retrieve data</td></tr>
    <tr><td><strong>Update</strong></td><td>UPDATE</td><td>Modify existing records</td></tr>
    <tr><td><strong>Delete</strong></td><td>DELETE</td><td>Remove records</td></tr>
</table>

<h2>SELECT - Retrieving Data</h2>
<p>The most common SQL command - gets data from tables.</p>

<h3>Basic SELECT Syntax</h3>
<pre><code class="language-sql">SELECT column1, column2, ...
FROM TableName
WHERE condition
ORDER BY column ASC/DESC;</code></pre>

<h3>SELECT Examples</h3>
<div class="example-box">
<pre><code class="language-sql">-- Get ALL columns from ALL students
SELECT * FROM Students

-- Get specific columns only
SELECT FirstName, LastName, Age FROM Students

-- Get students with a condition
SELECT * FROM Students WHERE Age > 16

-- Get students in a specific class
SELECT * FROM Students WHERE Class = "10A"

-- Get students sorted by name (A-Z)
SELECT * FROM Students ORDER BY LastName ASC

-- Get students sorted by age (highest first)
SELECT * FROM Students ORDER BY Age DESC

-- Combine conditions with AND
SELECT * FROM Students 
WHERE Age >= 16 AND Class = "10A"

-- Combine conditions with OR
SELECT * FROM Students 
WHERE Class = "10A" OR Class = "10B"</code></pre>
</div>

<h3>SQL Keywords for SELECT</h3>
<table class="notes-table">
    <tr><th>Keyword</th><th>Purpose</th><th>Example</th></tr>
    <tr><td><strong>SELECT</strong></td><td>Choose which columns to display</td><td>SELECT Name, Age</td></tr>
    <tr><td><strong>FROM</strong></td><td>Choose which table</td><td>FROM Students</td></tr>
    <tr><td><strong>WHERE</strong></td><td>Filter rows (condition)</td><td>WHERE Age > 16</td></tr>
    <tr><td><strong>AND</strong></td><td>Both conditions must be true</td><td>WHERE Age > 16 AND Class = "10A"</td></tr>
    <tr><td><strong>OR</strong></td><td>Either condition can be true</td><td>WHERE Class = "10A" OR Class = "10B"</td></tr>
    <tr><td><strong>ORDER BY</strong></td><td>Sort results</td><td>ORDER BY Name ASC</td></tr>
    <tr><td><strong>ASC</strong></td><td>Ascending order (A-Z, 0-9)</td><td>ORDER BY Age ASC</td></tr>
    <tr><td><strong>DESC</strong></td><td>Descending order (Z-A, 9-0)</td><td>ORDER BY Age DESC</td></tr>
    <tr><td><strong>*</strong></td><td>All columns</td><td>SELECT * FROM Students</td></tr>
</table>

<h3>Comparison Operators</h3>
<table class="notes-table">
    <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
    <tr><td>=</td><td>Equal to</td><td>WHERE Class = "10A"</td></tr>
    <tr><td><> or !=</td><td>Not equal to</td><td>WHERE Status <> "Absent"</td></tr>
    <tr><td>></td><td>Greater than</td><td>WHERE Age > 15</td></tr>
    <tr><td><</td><td>Less than</td><td>WHERE Score < 50</td></tr>
    <tr><td>>=</td><td>Greater than or equal</td><td>WHERE Age >= 18</td></tr>
    <tr><td><=</td><td>Less than or equal</td><td>WHERE Price <= 100</td></tr>
    <tr><td>LIKE</td><td>Pattern matching</td><td>WHERE Name LIKE "J%"</td></tr>
    <tr><td>BETWEEN</td><td>Within a range</td><td>WHERE Age BETWEEN 16 AND 18</td></tr>
    <tr><td>IN</td><td>Matches any value in list</td><td>WHERE Class IN ("10A", "10B", "10C")</td></tr>
</table>

<h3>Wildcards with LIKE</h3>
<table class="notes-table">
    <tr><th>Wildcard</th><th>Meaning</th><th>Example</th><th>Matches</th></tr>
    <tr><td>%</td><td>Any number of characters</td><td>LIKE "J%"</td><td>John, Jane, James</td></tr>
    <tr><td>%</td><td>Any number of characters</td><td>LIKE "%son"</td><td>Johnson, Wilson</td></tr>
    <tr><td>%</td><td>Any number of characters</td><td>LIKE "%an%"</td><td>Daniel, Fran, Andrew</td></tr>
    <tr><td>_</td><td>Exactly one character</td><td>LIKE "J___"</td><td>John, Jane (4 letters)</td></tr>
</table>

<h2>INSERT - Adding New Records</h2>
<p>Adds new rows to a table.</p>

<h3>INSERT Syntax</h3>
<pre><code class="language-sql">INSERT INTO TableName (column1, column2, ...)
VALUES (value1, value2, ...);</code></pre>

<h3>INSERT Examples</h3>
<div class="example-box">
<pre><code class="language-sql">-- Insert a new student (specifying columns)
INSERT INTO Students (StudentID, FirstName, LastName, Age, Class)
VALUES ("S100", "Emma", "Watson", 16, "10B");

-- Insert when adding all columns in order
INSERT INTO Students
VALUES ("S101", "Tom", "Holland", 17, "11A");

-- Insert multiple records
INSERT INTO Students (StudentID, FirstName, LastName, Age, Class)
VALUES 
    ("S102", "Chris", "Evans", 16, "10A"),
    ("S103", "Robert", "Downey", 17, "11B");</code></pre>
</div>

<h2>UPDATE - Modifying Existing Records</h2>
<p>Changes data in existing rows.</p>

<h3>UPDATE Syntax</h3>
<pre><code class="language-sql">UPDATE TableName
SET column1 = value1, column2 = value2, ...
WHERE condition;</code></pre>

<div class="warning">
    <strong>⚠️ WARNING:</strong> Always use WHERE with UPDATE! Without it, ALL records will be updated!
</div>

<h3>UPDATE Examples</h3>
<div class="example-box">
<pre><code class="language-sql">-- Update a specific student's age
UPDATE Students
SET Age = 17
WHERE StudentID = "S100";

-- Update multiple fields
UPDATE Students
SET Age = 18, Class = "12A"
WHERE StudentID = "S100";

-- Update all students in a class
UPDATE Students
SET Class = "11A"
WHERE Class = "10A";

-- Increase all prices by 10%
UPDATE Products
SET Price = Price * 1.10;

-- DANGEROUS - updates ALL records!
UPDATE Students
SET Class = "10A";    -- Missing WHERE!</code></pre>
</div>

<h2>DELETE - Removing Records</h2>
<p>Removes rows from a table.</p>

<h3>DELETE Syntax</h3>
<pre><code class="language-sql">DELETE FROM TableName
WHERE condition;</code></pre>

<div class="warning">
    <strong>⚠️ WARNING:</strong> Always use WHERE with DELETE! Without it, ALL records will be deleted!
</div>

<h3>DELETE Examples</h3>
<div class="example-box">
<pre><code class="language-sql">-- Delete a specific student
DELETE FROM Students
WHERE StudentID = "S100";

-- Delete all students in a class
DELETE FROM Students
WHERE Class = "10A";

-- Delete students over 18
DELETE FROM Students
WHERE Age > 18;

-- DANGEROUS - deletes ALL records!
DELETE FROM Students;    -- Missing WHERE!</code></pre>
</div>

<h2>Putting It All Together - Example Queries</h2>

<div class="example-box">
    <h4>Given this Students table:</h4>
<pre><code>| StudentID | FirstName | LastName | Age | Class | Score |
|-----------|-----------|----------|-----|-------|-------|
| S001      | John      | Smith    | 15  | 10A   | 78    |
| S002      | Emma      | Jones    | 16  | 10B   | 92    |
| S003      | Ali       | Khan     | 15  | 10A   | 65    |
| S004      | Sarah     | Wilson   | 17  | 11A   | 88    |
| S005      | James     | Brown    | 16  | 10B   | 71    |</code></pre>

    <h4>Query Examples:</h4>
<pre><code class="language-sql">-- 1. Find all students in class 10A
SELECT * FROM Students WHERE Class = "10A";
-- Returns: John Smith, Ali Khan

-- 2. Find students aged 16 or over, sorted by score
SELECT FirstName, LastName, Score FROM Students
WHERE Age >= 16
ORDER BY Score DESC;
-- Returns: Emma (92), Sarah (88), James (71)

-- 3. Find students whose name starts with 'J'
SELECT * FROM Students WHERE FirstName LIKE "J%";
-- Returns: John Smith, James Brown

-- 4. Add a new student
INSERT INTO Students (StudentID, FirstName, LastName, Age, Class, Score)
VALUES ("S006", "Mia", "Taylor", 15, "10A", 85);

-- 5. Update Ali's score to 70
UPDATE Students SET Score = 70 WHERE StudentID = "S003";

-- 6. Delete students with score below 70
DELETE FROM Students WHERE Score < 70;</code></pre>
</div>

<h3>Practice Questions</h3>
<div class="example-box">
    <p>Using the Students table above, write SQL queries to:</p>
    <ol>
        <li>Find all students aged 15</li>
        <li>Find students with scores between 70 and 90</li>
        <li>Find all students sorted by LastName alphabetically</li>
        <li>Update James Brown's class to "11A"</li>
        <li>Delete the student with StudentID "S005"</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
<pre><code class="language-sql">-- 1
SELECT * FROM Students WHERE Age = 15;

-- 2
SELECT * FROM Students WHERE Score >= 70 AND Score <= 90;
-- OR: SELECT * FROM Students WHERE Score BETWEEN 70 AND 90;

-- 3
SELECT * FROM Students ORDER BY LastName ASC;

-- 4
UPDATE Students SET Class = "11A" WHERE FirstName = "James" AND LastName = "Brown";
-- OR: UPDATE Students SET Class = "11A" WHERE StudentID = "S005";

-- 5
DELETE FROM Students WHERE StudentID = "S005";</code></pre>
    </details>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>SQL keywords are usually written in UPPERCASE (but not required)</li>
        <li>Text values need quotes: "John" or 'John'</li>
        <li>Numbers don't need quotes: 16</li>
        <li>* means "all columns"</li>
        <li>Always use WHERE with UPDATE and DELETE to avoid changing all records!</li>
        <li>End statements with semicolon ; (good practice)</li>
    </ul>
</div>

<div class="warning">
    <strong>⚠️ Common Mistakes:</strong>
    <ul>
        <li>Forgetting WHERE in UPDATE/DELETE (changes ALL records!)</li>
        <li>Using = instead of LIKE for pattern matching</li>
        <li>Forgetting quotes around text values</li>
        <li>Wrong order of keywords (SELECT...FROM...WHERE...ORDER BY)</li>
    </ul>
</div>
            `
        },
        'Data Validation in Databases': {
            content: `
<h2>Data Validation in Databases</h2>
<div class="definition-box">
    <strong>Validation:</strong> Rules applied to database fields to ensure data entered is reasonable and appropriate.
</div>

<h3>Validation Types in Databases</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th><th>Example</th></tr>
    <tr><td><strong>Presence Check</strong></td><td>Field cannot be left empty</td><td>CustomerName required</td></tr>
    <tr><td><strong>Range Check</strong></td><td>Value must be within limits</td><td>Age between 0-120</td></tr>
    <tr><td><strong>Type Check</strong></td><td>Data must be correct type</td><td>Age must be integer</td></tr>
    <tr><td><strong>Length Check</strong></td><td>Text must be certain length</td><td>Postcode max 8 chars</td></tr>
    <tr><td><strong>Format Check</strong></td><td>Must match pattern</td><td>Email contains @</td></tr>
    <tr><td><strong>Lookup Check</strong></td><td>Must exist in another table</td><td>ClassID must exist</td></tr>
</table>

<h3>Field Properties</h3>
<table class="notes-table">
    <tr><th>Property</th><th>Purpose</th></tr>
    <tr><td><strong>Data Type</strong></td><td>Integer, Text, Date, Boolean, etc.</td></tr>
    <tr><td><strong>Field Size</strong></td><td>Maximum characters allowed</td></tr>
    <tr><td><strong>Required</strong></td><td>Yes/No - presence check</td></tr>
    <tr><td><strong>Default Value</strong></td><td>Automatic value if none entered</td></tr>
    <tr><td><strong>Validation Rule</strong></td><td>Custom rule (e.g., >0 AND <100)</td></tr>
    <tr><td><strong>Input Mask</strong></td><td>Format template</td></tr>
</table>

<h3>Referential Integrity</h3>
<div class="definition-box">
    <strong>Referential Integrity:</strong> Ensures relationships between tables remain valid. You cannot add a foreign key value that doesn't exist as a primary key in the related table.
</div>

<div class="example-box">
    <p><strong>Example:</strong> If ClassID "C5" doesn't exist in the Classes table, you cannot add a student with ClassID = "C5" in the Students table.</p>
</div>

<div class="tip-box">
    <strong>Key Point:</strong> Validation ensures data QUALITY. Without it, databases fill with errors that cause problems later.
</div>
            `
        }
    },

    'web-development': {
        'HTML Basics': {
            content: `
<h2>HTML Basics</h2>
<div class="definition-box">
    <strong>HTML (HyperText Markup Language):</strong> The standard language for creating web pages. HTML defines the structure and content of a webpage using tags.
</div>

<h3>HTML Document Structure</h3>
<pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Main Heading&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

<h3>Common HTML Tags</h3>
<table class="notes-table">
    <tr><th>Tag</th><th>Purpose</th><th>Example</th></tr>
    <tr><td><strong>&lt;h1&gt; - &lt;h6&gt;</strong></td><td>Headings (h1 largest)</td><td>&lt;h1&gt;Title&lt;/h1&gt;</td></tr>
    <tr><td><strong>&lt;p&gt;</strong></td><td>Paragraph</td><td>&lt;p&gt;Text here&lt;/p&gt;</td></tr>
    <tr><td><strong>&lt;a&gt;</strong></td><td>Hyperlink</td><td>&lt;a href="url"&gt;Click&lt;/a&gt;</td></tr>
    <tr><td><strong>&lt;img&gt;</strong></td><td>Image</td><td>&lt;img src="pic.jpg"&gt;</td></tr>
    <tr><td><strong>&lt;ul&gt; / &lt;ol&gt;</strong></td><td>Lists (unordered/ordered)</td><td>&lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;</td></tr>
    <tr><td><strong>&lt;table&gt;</strong></td><td>Table</td><td>&lt;table&gt;&lt;tr&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;</td></tr>
    <tr><td><strong>&lt;div&gt;</strong></td><td>Division/container</td><td>&lt;div&gt;Content&lt;/div&gt;</td></tr>
    <tr><td><strong>&lt;br&gt;</strong></td><td>Line break</td><td>Line 1&lt;br&gt;Line 2</td></tr>
</table>

<h3>Attributes</h3>
<p>Tags can have attributes that provide additional information:</p>
<pre><code class="language-html">&lt;!-- Link with href attribute --&gt;
&lt;a href="https://google.com"&gt;Visit Google&lt;/a&gt;

&lt;!-- Image with src and alt attributes --&gt;
&lt;img src="photo.jpg" alt="Description of image"&gt;

&lt;!-- Element with id and class --&gt;
&lt;div id="header" class="container"&gt;Content&lt;/div&gt;</code></pre>

<h3>HTML Form Elements</h3>
<pre><code class="language-html">&lt;form action="submit.php" method="POST"&gt;
  &lt;label&gt;Name:&lt;/label&gt;
  &lt;input type="text" name="username"&gt;
  
  &lt;label&gt;Password:&lt;/label&gt;
  &lt;input type="password" name="pass"&gt;
  
  &lt;label&gt;Age:&lt;/label&gt;
  &lt;input type="number" name="age"&gt;
  
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

<div class="tip-box">
    <strong>Remember:</strong>
    <ul>
        <li>Tags usually come in pairs: &lt;p&gt;...&lt;/p&gt;</li>
        <li>Some tags are self-closing: &lt;img&gt;, &lt;br&gt;</li>
        <li>HTML defines STRUCTURE, CSS defines STYLE</li>
    </ul>
</div>
            `
        },
        'CSS Basics': {
            content: `
<h2>CSS Basics</h2>
<div class="definition-box">
    <strong>CSS (Cascading Style Sheets):</strong> A language used to describe the presentation and styling of HTML documents. CSS controls colors, fonts, layout, and more.
</div>

<h3>Ways to Add CSS</h3>
<table class="notes-table">
    <tr><th>Method</th><th>Example</th><th>Best For</th></tr>
    <tr><td><strong>Inline</strong></td><td>&lt;p style="color:red"&gt;</td><td>Single element</td></tr>
    <tr><td><strong>Internal</strong></td><td>&lt;style&gt; in &lt;head&gt;</td><td>Single page</td></tr>
    <tr><td><strong>External</strong></td><td>&lt;link rel="stylesheet"&gt;</td><td>Whole website</td></tr>
</table>

<h3>CSS Syntax</h3>
<pre><code class="language-css">selector {
    property: value;
    property: value;
}

/* Example */
h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}</code></pre>

<h3>CSS Selectors</h3>
<table class="notes-table">
    <tr><th>Selector</th><th>Example</th><th>Selects</th></tr>
    <tr><td><strong>Element</strong></td><td>p { }</td><td>All &lt;p&gt; elements</td></tr>
    <tr><td><strong>Class</strong></td><td>.intro { }</td><td>Elements with class="intro"</td></tr>
    <tr><td><strong>ID</strong></td><td>#header { }</td><td>Element with id="header"</td></tr>
    <tr><td><strong>Multiple</strong></td><td>h1, h2, p { }</td><td>All h1, h2, and p</td></tr>
</table>

<h3>Common CSS Properties</h3>
<pre><code class="language-css">/* Text styling */
color: red;              /* Text color */
font-size: 16px;         /* Text size */
font-family: Arial;      /* Font */
text-align: center;      /* Alignment */

/* Box styling */
background-color: yellow;
border: 1px solid black;
padding: 10px;           /* Inside spacing */
margin: 20px;            /* Outside spacing */

/* Size */
width: 200px;
height: 100px;</code></pre>

<h3>Colors in CSS</h3>
<pre><code class="language-css">/* Named colors */
color: red;
color: blue;

/* Hexadecimal */
color: #FF0000;     /* Red */
color: #00FF00;     /* Green */

/* RGB */
color: rgb(255, 0, 0);   /* Red */</code></pre>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Classes use . (dot): .myclass</li>
        <li>IDs use # (hash): #myid</li>
        <li>IDs should be unique, classes can be reused</li>
        <li>External CSS is best for larger websites</li>
    </ul>
</div>
            `
        }
    },

    'boolean-logic': {
        'Boolean Expressions': {
            content: `
<h2>Boolean Expressions</h2>
<div class="definition-box">
    <strong>Boolean Expression:</strong> An expression that evaluates to either TRUE (1) or FALSE (0). Used in programming conditions, logic circuits, and digital systems. Named after mathematician George Boole.
</div>

<h3>Boolean Operators</h3>
<table class="notes-table">
    <tr><th>Operator</th><th>Symbols</th><th>Description</th><th>Result is TRUE when...</th></tr>
    <tr><td><strong>AND</strong></td><td>∧ or · or &&</td><td>Logical conjunction</td><td>BOTH inputs are TRUE</td></tr>
    <tr><td><strong>OR</strong></td><td>∨ or + or ||</td><td>Logical disjunction</td><td>AT LEAST ONE input is TRUE</td></tr>
    <tr><td><strong>NOT</strong></td><td>¬ or ! or ‾ (overline)</td><td>Logical negation</td><td>Input is FALSE</td></tr>
    <tr><td><strong>XOR</strong></td><td>⊕</td><td>Exclusive OR</td><td>Inputs are DIFFERENT</td></tr>
    <tr><td><strong>NAND</strong></td><td>NOT AND</td><td>Negated AND</td><td>NOT both TRUE</td></tr>
    <tr><td><strong>NOR</strong></td><td>NOT OR</td><td>Negated OR</td><td>BOTH inputs are FALSE</td></tr>
</table>

<h3>Writing Boolean Expressions</h3>
<div class="example-box">
    <h4>Different notations:</h4>
    <table class="notes-table">
        <tr><th>Expression</th><th>Mathematical</th><th>Programming</th></tr>
        <tr><td>A AND B</td><td>A ∧ B or A · B</td><td>A && B</td></tr>
        <tr><td>A OR B</td><td>A ∨ B or A + B</td><td>A || B</td></tr>
        <tr><td>NOT A</td><td>¬A or Ā</td><td>!A or NOT A</td></tr>
        <tr><td>A XOR B</td><td>A ⊕ B</td><td>A ^ B</td></tr>
    </table>
</div>

<h3>Order of Operations (Precedence)</h3>
<p>When evaluating Boolean expressions without brackets, follow this order:</p>
<ol>
    <li><strong>Brackets ()</strong> - highest priority, evaluate first</li>
    <li><strong>NOT</strong></li>
    <li><strong>AND</strong></li>
    <li><strong>XOR</strong></li>
    <li><strong>OR</strong> - lowest priority, evaluate last</li>
</ol>

<div class="example-box">
    <h4>Evaluate: A OR B AND NOT C, where A=1, B=1, C=1</h4>
<pre><code>Step 1: NOT C = NOT 1 = 0         (NOT first)
Step 2: B AND 0 = 1 AND 0 = 0     (AND second)
Step 3: A OR 0 = 1 OR 0 = 1       (OR last)

Answer: 1 (TRUE)</code></pre>
</div>

<div class="example-box">
    <h4>Evaluate: (A OR B) AND NOT C, where A=0, B=1, C=0</h4>
<pre><code>Step 1: (A OR B) = (0 OR 1) = 1   (Brackets first)
Step 2: NOT C = NOT 0 = 1         (NOT second)
Step 3: 1 AND 1 = 1               (AND last)

Answer: 1 (TRUE)</code></pre>
</div>

<h2>Boolean Laws and Identities</h2>

<h3>Basic Laws</h3>
<table class="notes-table">
    <tr><th>Law</th><th>AND Form</th><th>OR Form</th></tr>
    <tr><td><strong>Identity</strong></td><td>A AND 1 = A</td><td>A OR 0 = A</td></tr>
    <tr><td><strong>Null</strong></td><td>A AND 0 = 0</td><td>A OR 1 = 1</td></tr>
    <tr><td><strong>Idempotent</strong></td><td>A AND A = A</td><td>A OR A = A</td></tr>
    <tr><td><strong>Complement</strong></td><td>A AND NOT A = 0</td><td>A OR NOT A = 1</td></tr>
    <tr><td><strong>Double Negation</strong></td><td colspan="2">NOT (NOT A) = A</td></tr>
    <tr><td><strong>Commutative</strong></td><td>A AND B = B AND A</td><td>A OR B = B OR A</td></tr>
    <tr><td><strong>Associative</strong></td><td>(A AND B) AND C = A AND (B AND C)</td><td>(A OR B) OR C = A OR (B OR C)</td></tr>
</table>

<h2>De Morgan's Laws - VERY IMPORTANT!</h2>

<div class="definition-box">
    <strong>De Morgan's Laws:</strong> Two rules for converting between AND and OR expressions by using NOT. Essential for simplifying Boolean expressions.
</div>

<h3>The Two Laws</h3>
<table class="notes-table">
    <tr><th>Law</th><th>Formula</th><th>In Words</th></tr>
    <tr><td><strong>First Law</strong></td><td>NOT (A AND B) = (NOT A) OR (NOT B)</td><td>"NOT both" = "either NOT"</td></tr>
    <tr><td><strong>Second Law</strong></td><td>NOT (A OR B) = (NOT A) AND (NOT B)</td><td>"NOT either" = "both NOT"</td></tr>
</table>

<div class="tip-box">
    <strong>Memory Trick:</strong> "Break the line, change the sign"<br>
    When you push NOT through brackets:<br>
    • AND becomes OR<br>
    • OR becomes AND<br>
    • Each term gets inverted
</div>

<h3>De Morgan's Examples</h3>
<div class="example-box">
    <h4>Example 1: Simplify NOT (A AND B)</h4>
<pre><code>Using De Morgan's First Law:
NOT (A AND B) = (NOT A) OR (NOT B)

Verification with truth table:
A | B | A AND B | NOT(A AND B) | NOT A | NOT B | (NOT A) OR (NOT B)
0 | 0 |    0    |      1       |   1   |   1   |         1
0 | 1 |    0    |      1       |   1   |   0   |         1
1 | 0 |    0    |      1       |   0   |   1   |         1
1 | 1 |    1    |      0       |   0   |   0   |         0

Both columns match! ✓</code></pre>
</div>

<div class="example-box">
    <h4>Example 2: Simplify NOT (P OR Q)</h4>
<pre><code>Using De Morgan's Second Law:
NOT (P OR Q) = (NOT P) AND (NOT Q)

Real-world meaning:
"It's NOT raining OR snowing" 
means
"It's NOT raining AND it's NOT snowing"</code></pre>
</div>

<div class="example-box">
    <h4>Example 3: Simplify NOT ((NOT A) AND B)</h4>
<pre><code>Step 1: Apply De Morgan's First Law
NOT ((NOT A) AND B) = (NOT (NOT A)) OR (NOT B)

Step 2: Apply Double Negation
(NOT (NOT A)) = A

Final answer: A OR (NOT B)</code></pre>
</div>

<h2>Simplification Techniques</h2>

<h3>Using Boolean Laws to Simplify</h3>
<div class="example-box">
    <h4>Simplify: A AND (A OR B)</h4>
<pre><code>Using Absorption Law:
A AND (A OR B) = A

Proof:
If A = 0: 0 AND (0 OR B) = 0 AND B = 0 = A ✓
If A = 1: 1 AND (1 OR B) = 1 AND 1 = 1 = A ✓</code></pre>
</div>

<div class="example-box">
    <h4>Simplify: (A AND B) OR (A AND NOT B)</h4>
<pre><code>Step 1: Factor out A (Distributive Law)
= A AND (B OR NOT B)

Step 2: Apply Complement Law (B OR NOT B = 1)
= A AND 1

Step 3: Apply Identity Law
= A

Final answer: A</code></pre>
</div>

<div class="example-box">
    <h4>Simplify: NOT A AND NOT B OR NOT A AND B</h4>
<pre><code>Step 1: Factor out NOT A
= NOT A AND (NOT B OR B)

Step 2: Apply Complement Law (NOT B OR B = 1)
= NOT A AND 1

Step 3: Apply Identity Law
= NOT A

Final answer: NOT A</code></pre>
</div>

<h3>Practice Questions</h3>
<div class="example-box">
    <ol>
        <li>Evaluate: (1 AND 0) OR (NOT 0)</li>
        <li>Simplify using De Morgan: NOT (X OR Y)</li>
        <li>Simplify: A OR (NOT A AND B)</li>
        <li>What is NOT (NOT (P AND Q))?</li>
        <li>Evaluate: NOT (1 AND 1) OR 0</li>
    </ol>
    <details>
        <summary>Click for answers</summary>
        <ol>
            <li>(1 AND 0) OR (NOT 0) = 0 OR 1 = 1</li>
            <li>NOT (X OR Y) = (NOT X) AND (NOT Y)</li>
            <li>A OR (NOT A AND B) = A OR B (Absorption Law)</li>
            <li>NOT (NOT (P AND Q)) = P AND Q (Double Negation)</li>
            <li>NOT (1 AND 1) OR 0 = NOT 1 OR 0 = 0 OR 0 = 0</li>
        </ol>
    </details>
</div>

<h3>Boolean in Programming</h3>
<pre><code class="language-python">age = 18
hasLicense = True
hasCar = False

# Using AND - both must be true
IF age >= 17 AND hasLicense THEN
    OUTPUT "Can drive"
ENDIF

# Using OR - at least one must be true
IF hasCar OR hasLicense THEN
    OUTPUT "Has some driving qualification"
ENDIF

# Using NOT - inverts the condition
IF NOT hasCar THEN
    OUTPUT "Needs to get a car"
ENDIF

# Complex condition
IF (age >= 17 AND hasLicense) OR (age >= 21) THEN
    OUTPUT "Can rent a car"
ENDIF</code></pre>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Know De Morgan's Laws by heart - they come up frequently!</li>
        <li>Remember order of precedence: NOT, then AND, then OR</li>
        <li>Use brackets to make expressions clearer</li>
        <li>Verify your simplifications with a truth table if unsure</li>
        <li>A AND NOT A always = 0, A OR NOT A always = 1</li>
    </ul>
</div>
            `
        },
        'Truth Tables': {
            content: `
<h2>Truth Tables</h2>
<div class="definition-box">
    <strong>Truth Table:</strong> A table showing all possible input combinations and their corresponding outputs for a Boolean expression or logic circuit.
</div>

<h3>How to Create a Truth Table</h3>
<ol>
    <li>List all input variables</li>
    <li>Calculate number of rows: 2ⁿ (where n = number of inputs)</li>
    <li>List all possible combinations (count in binary)</li>
    <li>Calculate output for each combination</li>
</ol>

<h3>Basic Truth Tables</h3>

<h4>NOT (1 input = 2 rows)</h4>
<table class="notes-table">
    <tr><th>A</th><th>NOT A</th></tr>
    <tr><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>0</td></tr>
</table>

<h4>AND (2 inputs = 4 rows)</h4>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>A AND B</th></tr>
    <tr><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>0</td></tr>
    <tr><td>1</td><td>0</td><td>0</td></tr>
    <tr><td>1</td><td>1</td><td>1</td></tr>
</table>

<h4>OR (2 inputs = 4 rows)</h4>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>A OR B</th></tr>
    <tr><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>1</td></tr>
    <tr><td>1</td><td>0</td><td>1</td></tr>
    <tr><td>1</td><td>1</td><td>1</td></tr>
</table>

<h3>Complex Expression Example</h3>
<div class="example-box">
    <h4>Truth table for: (A AND B) OR (NOT C)</h4>
    <table class="notes-table">
        <tr><th>A</th><th>B</th><th>C</th><th>A AND B</th><th>NOT C</th><th>Output</th></tr>
        <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
        <tr><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
        <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
        <tr><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
    </table>
    <p>3 inputs = 2³ = 8 rows</p>
</div>

<div class="tip-box">
    <strong>Exam Tip:</strong> When filling in input columns, use binary counting: 000, 001, 010, 011, 100, 101, 110, 111
</div>
            `
        }
    },

    'exam-tips': {
        'Command Words': {
            content: `
<h2>📝 Command Words</h2>
<p>Understanding command words is <strong>essential</strong> for exam success. They tell you exactly what the examiner expects in your answer.</p>

<div class="definition-box">
    <strong>Definition:</strong> Command words are the words in a question that tell you what type of response is required and how much detail to provide.
</div>

<h3>Low-Mark Commands (1-2 marks)</h3>

<div class="info-box">
    <h4>State / Give / Name / Identify</h4>
    <p><strong>Meaning:</strong> Write a brief answer without explanation.</p>
    <p><strong>Format:</strong> Single word, phrase, or short sentence.</p>
    <div class="example-box">
        <strong>Example Q:</strong> State what ASCII stands for. (1 mark)<br>
        <strong>Answer:</strong> American Standard Code for Information Interchange
    </div>
</div>

<div class="info-box">
    <h4>Define</h4>
    <p><strong>Meaning:</strong> Give the precise meaning of a term.</p>
    <p><strong>Format:</strong> One or two sentences with technical accuracy.</p>
    <div class="example-box">
        <strong>Example Q:</strong> Define the term 'algorithm'. (2 marks)<br>
        <strong>Answer:</strong> An algorithm is a step-by-step set of instructions to solve a problem or complete a task. It must be finite, unambiguous, and produce an output.
    </div>
</div>

<h3>Medium-Mark Commands (2-4 marks)</h3>

<div class="info-box">
    <h4>Describe</h4>
    <p><strong>Meaning:</strong> Give a detailed account of features or characteristics.</p>
    <p><strong>Format:</strong> Multiple sentences describing what something is or does. No reasons needed.</p>
    <div class="example-box">
        <strong>Example Q:</strong> Describe the purpose of RAM. (2 marks)<br>
        <strong>Answer:</strong> RAM (Random Access Memory) is a type of primary storage that holds data and programs currently in use. It is volatile, meaning data is lost when the power is turned off. The CPU can read from and write to RAM very quickly.
    </div>
</div>

<div class="info-box">
    <h4>Explain</h4>
    <p><strong>Meaning:</strong> Give reasons or causes. Say WHY or HOW something happens.</p>
    <p><strong>Format:</strong> Points + reasons. Use connectives like "because", "this means", "therefore", "as a result".</p>
    <div class="example-box">
        <strong>Example Q:</strong> Explain why binary search is faster than linear search. (3 marks)<br>
        <strong>Answer:</strong> Binary search eliminates half of the remaining items with each comparison <strong>because</strong> it compares the target with the middle element and discards the half that cannot contain the target. <strong>This means</strong> it only needs log₂(n) comparisons in the worst case, <strong>whereas</strong> linear search may need to check every item (n comparisons).
    </div>
</div>

<h3>High-Mark Commands (4-8 marks)</h3>

<div class="info-box">
    <h4>Discuss</h4>
    <p><strong>Meaning:</strong> Consider different aspects, viewpoints, or arguments. Explore pros AND cons.</p>
    <p><strong>Format:</strong> Balanced response with multiple paragraphs covering different perspectives.</p>
    <div class="example-box">
        <strong>Example Q:</strong> Discuss the impact of automation on employment. (6 marks)<br>
        <strong>Answer should include:</strong><br>
        • Positive impacts (new jobs, increased productivity)<br>
        • Negative impacts (job losses, skills gaps)<br>
        • A concluding statement weighing up the impacts
    </div>
</div>

<div class="info-box">
    <h4>Compare</h4>
    <p><strong>Meaning:</strong> Identify similarities AND differences between items.</p>
    <p><strong>Format:</strong> Structured comparison using "Both...", "However...", "Unlike..."</p>
    <div class="example-box">
        <strong>Example Q:</strong> Compare a compiler and an interpreter. (4 marks)<br>
        <strong>Answer:</strong><br>
        <strong>Similarities:</strong> Both translate high-level source code into machine code.<br>
        <strong>Differences:</strong> A compiler translates the entire program at once before execution, creating an executable file. An interpreter translates and executes one line at a time, without creating an executable.
    </div>
</div>

<div class="info-box">
    <h4>Evaluate</h4>
    <p><strong>Meaning:</strong> Make a judgment based on criteria. Weigh up evidence and reach a conclusion.</p>
    <p><strong>Format:</strong> Present evidence, analyze it, and give a justified conclusion.</p>
    <div class="example-box">
        <strong>Example Q:</strong> Evaluate the use of cloud storage versus local storage. (6 marks)<br>
        <strong>Answer should:</strong><br>
        • List advantages of cloud storage (accessibility, automatic backup)<br>
        • List disadvantages of cloud storage (requires internet, privacy concerns)<br>
        • List advantages of local storage (fast access, no internet needed)<br>
        • Make a justified conclusion about which is better for a specific scenario
    </div>
</div>

<h3>🔑 Key Command Word Summary</h3>

<table class="data-table">
    <tr>
        <th>Command</th>
        <th>What to Do</th>
        <th>Typical Marks</th>
    </tr>
    <tr>
        <td><strong>State</strong></td>
        <td>Brief answer, no explanation</td>
        <td>1</td>
    </tr>
    <tr>
        <td><strong>Define</strong></td>
        <td>Give precise meaning</td>
        <td>1-2</td>
    </tr>
    <tr>
        <td><strong>Describe</strong></td>
        <td>What it is/does (no reasons)</td>
        <td>2-4</td>
    </tr>
    <tr>
        <td><strong>Explain</strong></td>
        <td>Give reasons (why/how)</td>
        <td>2-4</td>
    </tr>
    <tr>
        <td><strong>Compare</strong></td>
        <td>Similarities + Differences</td>
        <td>3-4</td>
    </tr>
    <tr>
        <td><strong>Discuss</strong></td>
        <td>Multiple viewpoints/aspects</td>
        <td>4-6</td>
    </tr>
    <tr>
        <td><strong>Evaluate</strong></td>
        <td>Judge + Conclude</td>
        <td>5-8</td>
    </tr>
</table>

<div class="warning">
    <strong>⚠️ Common Mistake:</strong> Describing when asked to explain! If the question says "Explain", you MUST give reasons. "Describe" only requires you to say what something is, not why.
</div>
            `
        },
        'Exam Technique': {
            content: `
<h2>📝 Exam Technique</h2>
<p>Good exam technique can gain you extra marks even when you're not sure of the content.</p>

<h3>Before the Exam</h3>

<div class="info-box">
    <h4>📖 Preparation</h4>
    <ul>
        <li>Know the exam format (Paper 1: Theory 2 hours, Paper 2: Practical 3 hours)</li>
        <li>Practice past papers under timed conditions</li>
        <li>Review mark schemes to understand what examiners want</li>
        <li>Create flashcards for definitions and key facts</li>
        <li>Practice writing pseudocode and trace tables</li>
    </ul>
</div>

<h3>During the Exam</h3>

<div class="tip-box">
    <strong>📊 Time Management</strong>
    <ul>
        <li><strong>Paper 1 (2 hours, 100 marks):</strong> ~1.2 minutes per mark</li>
        <li><strong>Paper 2 (3 hours, 100 marks):</strong> ~1.8 minutes per mark</li>
        <li>Don't spend too long on any one question</li>
        <li>Leave time at the end to check your answers</li>
    </ul>
</div>

<div class="info-box">
    <h4>✅ Reading Questions</h4>
    <ul>
        <li><strong>Highlight command words</strong> - What are you being asked to do?</li>
        <li><strong>Note the marks</strong> - 4 marks usually needs 4 distinct points</li>
        <li><strong>Look for context</strong> - Many questions relate to a scenario</li>
        <li><strong>Answer what's asked</strong> - Don't write about what you know if it's not relevant</li>
    </ul>
</div>

<div class="info-box">
    <h4>📝 Writing Answers</h4>
    <ul>
        <li><strong>One mark = one point</strong> - Make sure you have enough points</li>
        <li><strong>Use technical terminology</strong> - Shows your knowledge</li>
        <li><strong>Be specific, not vague</strong> - "RAM stores data" is weaker than "RAM stores data and programs currently being executed"</li>
        <li><strong>For "Explain" questions:</strong> Point → Because → Therefore</li>
    </ul>
</div>

<h3>Paper 1 Specific Tips</h3>

<div class="example-box">
    <h4>Theory Questions</h4>
    <ul>
        <li>Draw diagrams if they help (flowcharts, logic gates)</li>
        <li>For binary/hex conversions, show your working</li>
        <li>In discussion questions, structure your answer with clear paragraphs</li>
        <li>Always relate answers back to the scenario if one is given</li>
    </ul>
</div>

<h3>Paper 2 Specific Tips</h3>

<div class="example-box">
    <h4>Programming Questions</h4>
    <ul>
        <li><strong>Read all of the code</strong> before answering</li>
        <li><strong>Trace through carefully</strong> - use trace tables</li>
        <li><strong>Check your syntax</strong> - but examiners usually accept minor errors</li>
        <li><strong>Test your logic</strong> with boundary values</li>
        <li><strong>Comment your code</strong> when asked to write programs</li>
    </ul>
</div>

<div class="tip-box">
    <h4>Trace Table Tips</h4>
    <ul>
        <li>Create columns for ALL variables and outputs</li>
        <li>Work through line by line - don't skip</li>
        <li>Show values change with each iteration</li>
        <li>Check loop conditions carefully</li>
    </ul>
</div>

<h3>If You're Stuck</h3>

<div class="warning">
    <h4>🆘 Don't Panic!</h4>
    <ul>
        <li><strong>Skip and return</strong> - Don't waste time, move on and come back</li>
        <li><strong>Write something</strong> - Partial marks are better than no marks</li>
        <li><strong>Use common sense</strong> - Even if you can't remember, think logically</li>
        <li><strong>Check the question</strong> - Sometimes hints are in the wording</li>
    </ul>
</div>
            `
        },
        'Mark Scheme Advice': {
            content: `
<h2>📋 Mark Scheme Advice</h2>
<p>Understanding how examiners mark will help you write better answers.</p>

<h3>How Marking Works</h3>

<div class="definition-box">
    <p>Examiners use <strong>mark schemes</strong> with specific points that earn marks. They look for these exact points in your answer.</p>
</div>

<div class="info-box">
    <h4>Point-Based Marking</h4>
    <p>Most questions use <strong>point-based marking</strong>:</p>
    <ul>
        <li>Each valid point = 1 mark</li>
        <li>Alternative acceptable answers are included</li>
        <li>You can't get more than max marks even with extra points</li>
    </ul>
</div>

<div class="example-box">
    <h4>Example: "Describe two features of a star network topology" (2 marks)</h4>
    <p><strong>Mark scheme points:</strong></p>
    <ul>
        <li>All devices connect to a central switch/hub (1)</li>
        <li>If one device fails, others continue working (1)</li>
        <li>Easy to add new devices (1)</li>
        <li>More cable is needed than bus topology (1)</li>
    </ul>
    <p><em>Any 2 points from the list = 2 marks</em></p>
</div>

<h3>Levels-Based Marking (Extended Questions)</h3>

<div class="info-box">
    <h4>For 6+ Mark Questions</h4>
    <p>Longer questions often use <strong>levels-based marking</strong>:</p>
    <table class="data-table">
        <tr>
            <th>Level</th>
            <th>Marks</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Level 3</td>
            <td>5-6</td>
            <td>Comprehensive, detailed, well-structured</td>
        </tr>
        <tr>
            <td>Level 2</td>
            <td>3-4</td>
            <td>Good understanding, some gaps</td>
        </tr>
        <tr>
            <td>Level 1</td>
            <td>1-2</td>
            <td>Basic points, limited detail</td>
        </tr>
        <tr>
            <td>Level 0</td>
            <td>0</td>
            <td>No relevant content</td>
        </tr>
    </table>
</div>

<h3>Common Marking Notes</h3>

<div class="tip-box">
    <h4>What Examiners Accept</h4>
    <ul>
        <li><strong>Abbreviations:</strong> CPU, RAM, ROM, etc. are accepted</li>
        <li><strong>Minor spelling errors:</strong> If the meaning is clear</li>
        <li><strong>Alternative terms:</strong> "Random Access Memory" or "RAM"</li>
        <li><strong>Diagrams:</strong> Can earn marks if they answer the question</li>
    </ul>
</div>

<div class="warning">
    <h4>What Loses Marks</h4>
    <ul>
        <li><strong>Vague answers:</strong> "It makes things faster" without saying what/why</li>
        <li><strong>Contradictions:</strong> Writing two opposite statements</li>
        <li><strong>Irrelevant information:</strong> Writing about things not asked</li>
        <li><strong>Listing when asked to explain:</strong> No marks without reasons</li>
    </ul>
</div>

<h3>Example Analysis</h3>

<div class="example-box">
    <h4>Question: Explain why hexadecimal is used instead of binary by programmers. (3 marks)</h4>
    
    <p><strong>Poor Answer (1 mark):</strong><br>
    "Hexadecimal is easier to use than binary."</p>
    <p><em>Only gets 1 mark - doesn't explain WHY it's easier</em></p>
    
    <p><strong>Good Answer (3 marks):</strong><br>
    "Hexadecimal is used because binary numbers can be very long and difficult to read (1). Hexadecimal is more compact as each hex digit represents 4 bits (1). This makes it easier to spot errors and remember values like memory addresses (1)."</p>
    <p><em>Gets 3 marks - explains with reasons</em></p>
</div>

<h3>Pro Tips from Mark Schemes</h3>

<div class="info-box">
    <ul>
        <li><strong>Match points to marks:</strong> 4-mark question = aim for 4 distinct points</li>
        <li><strong>Quality over quantity:</strong> 3 good points beats 6 weak ones</li>
        <li><strong>Answer the question asked:</strong> Don't write everything you know</li>
        <li><strong>Use examples:</strong> Concrete examples often earn marks</li>
        <li><strong>Show your working:</strong> Especially for calculations</li>
    </ul>
</div>
            `
        },
        'Common Mistakes': {
            content: `
<h2>⚠️ Common Mistakes to Avoid</h2>
<p>Learn from the most common errors students make in IGCSE Computer Science exams.</p>

<h3>Theory Mistakes</h3>

<div class="warning">
    <h4>❌ RAM vs ROM Confusion</h4>
    <p><strong>Mistake:</strong> Saying RAM stores permanent data or ROM is volatile.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li><strong>RAM:</strong> Volatile (loses data when power off), read/write, stores running programs</li>
        <li><strong>ROM:</strong> Non-volatile (keeps data), read-only, stores boot instructions</li>
    </ul>
</div>

<div class="warning">
    <h4>❌ Compiler vs Interpreter</h4>
    <p><strong>Mistake:</strong> Mixing up which one creates executable files.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li><strong>Compiler:</strong> Translates entire program at once → Creates executable → Faster to run</li>
        <li><strong>Interpreter:</strong> Translates line by line → No executable → Easier to debug</li>
    </ul>
</div>

<div class="warning">
    <h4>❌ Lossy vs Lossless Compression</h4>
    <p><strong>Mistake:</strong> Not knowing when to use each type.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li><strong>Lossy:</strong> Permanently removes data, smaller files, for images/audio (JPEG, MP3)</li>
        <li><strong>Lossless:</strong> No data lost, can restore original, for text/important files (PNG, ZIP)</li>
    </ul>
</div>

<h3>Binary & Hex Mistakes</h3>

<div class="warning">
    <h4>❌ Left Shift vs Right Shift</h4>
    <p><strong>Mistake:</strong> Forgetting which shift multiplies and which divides.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li><strong>Left shift:</strong> ×2 (bits move left, adds zero on right)</li>
        <li><strong>Right shift:</strong> ÷2 (bits move right, loses rightmost bit)</li>
    </ul>
</div>

<div class="warning">
    <h4>❌ Binary Overflow</h4>
    <p><strong>Mistake:</strong> Not recognizing when a result is too large.</p>
    <p><strong>Remember:</strong> 8 bits can only store 0-255. If your answer exceeds this, overflow has occurred!</p>
</div>

<div class="warning">
    <h4>❌ Hex Conversion Errors</h4>
    <p><strong>Mistake:</strong> Forgetting that A=10, B=11... F=15</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li>Split binary into groups of 4 from the right</li>
        <li>A=10, B=11, C=12, D=13, E=14, F=15</li>
    </ul>
</div>

<h3>Programming Mistakes</h3>

<div class="warning">
    <h4>❌ Arrays Start at 0</h4>
    <p><strong>Mistake:</strong> Thinking the first element is at index 1.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li>First element = index 0</li>
        <li>Array of 5 elements has indices 0, 1, 2, 3, 4</li>
    </ul>
</div>

<div class="warning">
    <h4>❌ MOD vs DIV</h4>
    <p><strong>Mistake:</strong> Confusing remainder with quotient.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li><strong>DIV:</strong> Integer division (whole number only) → 7 DIV 3 = 2</li>
        <li><strong>MOD:</strong> Remainder after division → 7 MOD 3 = 1</li>
    </ul>
</div>

<div class="warning">
    <h4>❌ WHILE vs REPEAT-UNTIL</h4>
    <p><strong>Mistake:</strong> Forgetting which runs at least once.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li><strong>WHILE:</strong> Checks condition BEFORE → might never run</li>
        <li><strong>REPEAT-UNTIL:</strong> Checks condition AFTER → always runs at least once</li>
    </ul>
</div>

<h3>Algorithm Mistakes</h3>

<div class="warning">
    <h4>❌ Binary Search Requirements</h4>
    <p><strong>Mistake:</strong> Forgetting that binary search needs sorted data.</p>
    <p><strong>Remember:</strong> Binary search ONLY works on sorted data. Always check if data is sorted first!</p>
</div>

<div class="warning">
    <h4>❌ Sorting Algorithm Confusion</h4>
    <p><strong>Mistake:</strong> Mixing up bubble sort and merge sort processes.</p>
    <table class="data-table">
        <tr>
            <th>Bubble Sort</th>
            <th>Merge Sort</th>
        </tr>
        <tr>
            <td>Compares adjacent pairs</td>
            <td>Divides list in half</td>
        </tr>
        <tr>
            <td>Swaps if wrong order</td>
            <td>Merges sorted sublists</td>
        </tr>
        <tr>
            <td>O(n²) - slower</td>
            <td>O(n log n) - faster</td>
        </tr>
    </table>
</div>

<h3>Network Mistakes</h3>

<div class="warning">
    <h4>❌ LAN vs WAN</h4>
    <p><strong>Mistake:</strong> Not knowing the key differences.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li><strong>LAN:</strong> Small area (building), fast, private, own hardware</li>
        <li><strong>WAN:</strong> Large area (countries), slower, often uses public infrastructure</li>
    </ul>
</div>

<div class="warning">
    <h4>❌ Switch vs Router</h4>
    <p><strong>Mistake:</strong> Treating them as the same device.</p>
    <p><strong>Remember:</strong></p>
    <ul>
        <li><strong>Switch:</strong> Connects devices within a LAN, uses MAC addresses</li>
        <li><strong>Router:</strong> Connects different networks, uses IP addresses</li>
    </ul>
</div>

<h3>Exam Technique Mistakes</h3>

<div class="warning">
    <h4>❌ Not Reading the Question</h4>
    <p>Always check:</p>
    <ul>
        <li>Command word (describe, explain, compare...)</li>
        <li>Number of marks (how many points needed?)</li>
        <li>Context (relate to the scenario given)</li>
    </ul>
</div>

<div class="warning">
    <h4>❌ Writing Too Little</h4>
    <p>For a 4-mark question, you need approximately 4 valid points. One-word answers rarely get full marks!</p>
</div>

<div class="tip-box">
    <h4>✅ Quick Checklist Before Moving On</h4>
    <ul>
        <li>Did I answer what was asked?</li>
        <li>Did I give enough points for the marks?</li>
        <li>Did I explain (give reasons) if required?</li>
        <li>Did I use technical vocabulary?</li>
        <li>Did I relate to the scenario if given?</li>
    </ul>
</div>
            `
        }
    }
};
