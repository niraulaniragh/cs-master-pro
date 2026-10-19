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
    <strong>Validation:</strong> Checking that input data is reasonable, sensible, and within acceptable boundaries BEFORE processing.
</div>

<h3>Types of Validation</h3>
<table class="notes-table">
    <tr><th>Type</th><th>Description</th><th>Example</th></tr>
    <tr><td><strong>Range Check</strong></td><td>Value within limits</td><td>Age between 0-120</td></tr>
    <tr><td><strong>Type Check</strong></td><td>Correct data type</td><td>Age must be integer</td></tr>
    <tr><td><strong>Length Check</strong></td><td>Correct number of characters</td><td>Password 8-20 chars</td></tr>
    <tr><td><strong>Presence Check</strong></td><td>Data has been entered</td><td>Name not empty</td></tr>
    <tr><td><strong>Format Check</strong></td><td>Correct pattern</td><td>Email contains @</td></tr>
</table>

<h3>Example: Validating Age</h3>
<pre><code class="language-plaintext">REPEAT
    INPUT age
    IF age < 0 OR age > 120 THEN
        OUTPUT "Invalid age. Try again."
    ENDIF
UNTIL age >= 0 AND age <= 120</code></pre>

<h3>Validation vs Verification</h3>
<ul>
    <li><strong>Validation:</strong> Is the data reasonable? (automatic checks)</li>
    <li><strong>Verification:</strong> Is the data correct? (human checks, double entry)</li>
</ul>

<div class="tip-box">
    <strong>Exam Tip:</strong> Validation can check if data is SENSIBLE but not if it's CORRECT. Age=25 passes validation but might not be the true age.
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
    <li><strong>Reliability:</strong> Easy to distinguish between two states</li>
    <li><strong>Simple logic:</strong> All operations can be built from basic gates</li>
</ul>

<h3>Place Values</h3>
<p>Each position in binary is worth 2× the position to its right (powers of 2):</p>

<table class="notes-table">
    <tr><th>Position</th><td>7</td><td>6</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
    <tr><th>Place Value</th><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>
    <tr><th>Power of 2</th><td>2⁷</td><td>2⁶</td><td>2⁵</td><td>2⁴</td><td>2³</td><td>2²</td><td>2¹</td><td>2⁰</td></tr>
</table>

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

<h3>Denary to Binary Conversion</h3>
<p><strong>Method: Repeated Division by 2</strong></p>

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

<p><strong>Alternative Method: Place Values</strong></p>
<div class="example-box">
    <h4>Convert 45 to binary using place values</h4>
<pre><code>Place values: 128  64  32  16   8   4   2   1

45 - 32 = 13  ✓ (32 fits)
13 - 16 = -3  ✗ (16 doesn't fit)
13 - 8  = 5   ✓ (8 fits)
5  - 4  = 1   ✓ (4 fits)
1  - 2  = -1  ✗ (2 doesn't fit)
1  - 1  = 0   ✓ (1 fits)

Binary:       0   0   1   0   1   1   0   1
Answer: 45 = 00101101 in 8-bit binary</code></pre>
</div>

<h3>Key Terms</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Definition</th><th>Example</th></tr>
    <tr><td><strong>Bit</strong></td><td>Single binary digit (0 or 1)</td><td>1</td></tr>
    <tr><td><strong>Nibble</strong></td><td>4 bits</td><td>1010</td></tr>
    <tr><td><strong>Byte</strong></td><td>8 bits</td><td>10101010</td></tr>
    <tr><td><strong>Kilobyte (KB)</strong></td><td>1,024 bytes</td><td>-</td></tr>
    <tr><td><strong>Megabyte (MB)</strong></td><td>1,024 KB</td><td>-</td></tr>
    <tr><td><strong>Gigabyte (GB)</strong></td><td>1,024 MB</td><td>-</td></tr>
</table>

<h3>Maximum Values</h3>
<table class="notes-table">
    <tr><th>Bits</th><th>Maximum Value (Unsigned)</th><th>Range</th></tr>
    <tr><td>4 bits (nibble)</td><td>15</td><td>0 to 15</td></tr>
    <tr><td>8 bits (byte)</td><td>255</td><td>0 to 255</td></tr>
    <tr><td>16 bits</td><td>65,535</td><td>0 to 65,535</td></tr>
</table>

<div class="tip-box">
    <strong>Quick Formula:</strong> Maximum value for n bits = 2ⁿ - 1<br>
    Example: 8 bits = 2⁸ - 1 = 256 - 1 = 255
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

<h3>Binary Addition Rules</h3>
<table class="notes-table">
    <tr><th>A</th><th>B</th><th>Sum</th><th>Carry</th></tr>
    <tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>0</td><td>1</td><td>1</td><td>0</td></tr>
    <tr><td>1</td><td>0</td><td>1</td><td>0</td></tr>
    <tr><td>1</td><td>1</td><td>0</td><td>1</td></tr>
</table>

<p><strong>Key rule:</strong> 1 + 1 = 10 (which is 0, carry 1)</p>

<h3>Example 1: Simple Addition</h3>
<div class="example-box">
    <h4>Add 0101 (5) + 0011 (3)</h4>
<pre><code>    0 1 0 1   (5)
  + 0 0 1 1   (3)
  ---------
Carry: 1 1
  ---------
    1 0 0 0   (8)

Check: 5 + 3 = 8 ✓</code></pre>
</div>

<h3>Example 2: With Multiple Carries</h3>
<div class="example-box">
    <h4>Add 01101 (13) + 01011 (11)</h4>
<pre><code>      0 1 1 0 1   (13)
    + 0 1 0 1 1   (11)
    -----------
Carry:1 1 1 1
    -----------
      1 1 0 0 0   (24)

Check: 13 + 11 = 24 ✓</code></pre>
</div>

<h3>Overflow Error</h3>
<p class="warning">⚠️ <strong>Overflow</strong> occurs when the result is too large to fit in the available bits. For 8-bit: max value is 255. If result > 255, overflow occurs!</p>

<div class="example-box">
    <h4>Overflow Example (8-bit)</h4>
<pre><code>    1111 1111   (255)
  + 0000 0001   (1)
  -----------
  1 0000 0000   (256 - but needs 9 bits!)

Result would be 0000 0000 with overflow flag set.
The 9th bit is lost!</code></pre>
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Work right to left, just like denary addition</li>
        <li>1 + 1 = 0 carry 1</li>
        <li>1 + 1 + 1 (with carry) = 1 carry 1</li>
        <li>Check your answer by converting both to denary</li>
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
    <strong>Bitmap Image:</strong> A digital image made up of a grid of tiny squares called pixels (picture elements). Each pixel stores color information as binary data.
</div>

<h3>Key Terms</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Definition</th><th>Example</th></tr>
    <tr><td><strong>Pixel</strong></td><td>Smallest single point in an image</td><td>One tiny colored square</td></tr>
    <tr><td><strong>Resolution</strong></td><td>Width × Height in pixels</td><td>1920 × 1080 (Full HD)</td></tr>
    <tr><td><strong>Color Depth</strong></td><td>Bits used per pixel</td><td>24-bit = 16.7 million colors</td></tr>
    <tr><td><strong>Metadata</strong></td><td>Data about the image</td><td>Dimensions, date, camera</td></tr>
</table>

<h3>Color Depth Explained</h3>
<table class="notes-table">
    <tr><th>Color Depth</th><th>Colors Available</th><th>Use Case</th></tr>
    <tr><td>1-bit</td><td>2 (black & white)</td><td>Simple line drawings</td></tr>
    <tr><td>4-bit</td><td>16</td><td>Early computer graphics</td></tr>
    <tr><td>8-bit</td><td>256</td><td>GIFs, simple graphics</td></tr>
    <tr><td>16-bit</td><td>65,536</td><td>Older displays</td></tr>
    <tr><td>24-bit</td><td>16,777,216</td><td>Photos (True Color)</td></tr>
    <tr><td>32-bit</td><td>16.7M + transparency</td><td>Graphics with alpha</td></tr>
</table>

<h3>File Size Calculation</h3>
<div class="definition-box">
    <strong>Formula:</strong> File Size = Width × Height × Color Depth (in bits)
</div>

<div class="example-box">
    <h4>Calculate file size of an 800×600 image with 24-bit color</h4>
<pre><code>File size = Width × Height × Color Depth
          = 800 × 600 × 24 bits
          = 11,520,000 bits

Convert to bytes: 11,520,000 ÷ 8 = 1,440,000 bytes
Convert to KB: 1,440,000 ÷ 1024 = 1,406.25 KB
Convert to MB: 1,406.25 ÷ 1024 ≈ 1.37 MB

Answer: Approximately 1.37 MB (uncompressed)</code></pre>
</div>

<h3>24-bit Color (True Color)</h3>
<p>Each pixel uses 24 bits: 8 bits for Red, 8 for Green, 8 for Blue.</p>

<div class="example-box">
    <h4>How 24-bit color works</h4>
<pre><code>24 bits = 8 bits Red + 8 bits Green + 8 bits Blue

Each color channel: 0-255 (2⁸ = 256 values)

Examples:
Red:   R=255, G=0,   B=0   = Pure Red
Green: R=0,   G=255, B=0   = Pure Green
Blue:  R=0,   G=0,   B=255 = Pure Blue
White: R=255, G=255, B=255 = All colors
Black: R=0,   G=0,   B=0   = No color
Yellow: R=255, G=255, B=0  = Red + Green</code></pre>
</div>

<h3>Quality vs File Size Trade-off</h3>
<table class="notes-table">
    <tr><th>Change</th><th>Effect on Quality</th><th>Effect on Size</th></tr>
    <tr><td>↑ Resolution</td><td>Better (more detail)</td><td>Larger file</td></tr>
    <tr><td>↓ Resolution</td><td>Worse (less detail)</td><td>Smaller file</td></tr>
    <tr><td>↑ Color Depth</td><td>More colors</td><td>Larger file</td></tr>
    <tr><td>↓ Color Depth</td><td>Fewer colors</td><td>Smaller file</td></tr>
</table>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Show your working when calculating file sizes</li>
        <li>Remember: 8 bits = 1 byte, 1024 bytes = 1 KB</li>
        <li>File size formula gives UNCOMPRESSED size - actual files may be smaller</li>
        <li>More pixels OR more colors = bigger file size</li>
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

<h3>How Sound is Digitized</h3>
<ol>
    <li><strong>Analog sound wave</strong> enters a microphone</li>
    <li>Wave is <strong>sampled</strong> at regular intervals</li>
    <li>Each sample's <strong>amplitude is measured</strong></li>
    <li>Amplitude is converted to a <strong>binary value</strong></li>
    <li>Binary values are <strong>stored</strong> in sequence</li>
</ol>

<h3>Key Terms</h3>
<table class="notes-table">
    <tr><th>Term</th><th>Definition</th><th>Typical Values</th></tr>
    <tr><td><strong>Sample Rate</strong></td><td>Number of samples taken per second (Hz)</td><td>CD: 44,100 Hz</td></tr>
    <tr><td><strong>Bit Depth</strong></td><td>Bits used for each sample</td><td>CD: 16-bit</td></tr>
    <tr><td><strong>Bit Rate</strong></td><td>Bits of data per second of audio</td><td>128-320 kbps for MP3</td></tr>
    <tr><td><strong>Channels</strong></td><td>Separate audio tracks</td><td>1=Mono, 2=Stereo</td></tr>
</table>

<h3>Sample Rate</h3>
<p>Higher sample rate = more accurate representation of the original sound wave.</p>

<div class="example-box">
    <h4>Common Sample Rates</h4>
    <ul>
        <li><strong>8,000 Hz</strong> - Telephone quality</li>
        <li><strong>22,050 Hz</strong> - FM Radio quality</li>
        <li><strong>44,100 Hz</strong> - CD quality (44.1 kHz)</li>
        <li><strong>48,000 Hz</strong> - DVD/Professional video</li>
        <li><strong>96,000 Hz</strong> - High-resolution audio</li>
    </ul>
</div>

<h3>Bit Depth</h3>
<p>Higher bit depth = more accurate amplitude measurements = better quality.</p>

<div class="example-box">
    <h4>Bit Depth Effects</h4>
    <ul>
        <li><strong>8-bit:</strong> 256 amplitude levels - lo-fi, retro sound</li>
        <li><strong>16-bit:</strong> 65,536 levels - CD quality</li>
        <li><strong>24-bit:</strong> 16.7 million levels - professional studio</li>
    </ul>
</div>

<h3>File Size Calculation</h3>
<div class="definition-box">
    <strong>Formula:</strong> File Size = Sample Rate × Bit Depth × Channels × Duration (seconds)
</div>

<div class="example-box">
    <h4>Calculate file size for 30 seconds of CD-quality stereo audio</h4>
<pre><code>Given: Sample rate = 44,100 Hz
       Bit depth = 16 bits
       Channels = 2 (stereo)
       Duration = 30 seconds

File size = 44,100 × 16 × 2 × 30
          = 42,336,000 bits

Convert to bytes: 42,336,000 ÷ 8 = 5,292,000 bytes
Convert to MB: 5,292,000 ÷ (1024 × 1024) ≈ 5.05 MB

Answer: Approximately 5.05 MB (uncompressed)</code></pre>
</div>

<h3>Quality vs File Size Trade-off</h3>
<table class="notes-table">
    <tr><th>Increase</th><th>Effect on Quality</th><th>Effect on Size</th></tr>
    <tr><td>↑ Sample Rate</td><td>Better frequency capture</td><td>Larger file</td></tr>
    <tr><td>↑ Bit Depth</td><td>More accurate amplitude</td><td>Larger file</td></tr>
    <tr><td>↑ Channels (stereo)</td><td>Spatial sound</td><td>Double the size</td></tr>
</table>

<div class="tip-box">
    <strong>Nyquist Theorem:</strong> Sample rate must be at least TWICE the highest frequency you want to capture. Human hearing goes up to ~20,000 Hz, so 44,100 Hz captures everything we can hear.
</div>

<div class="tip-box">
    <strong>Exam Tips:</strong>
    <ul>
        <li>Show all working in calculations</li>
        <li>Remember: stereo = ×2 for channels</li>
        <li>CD quality = 44,100 Hz, 16-bit, stereo</li>
        <li>Higher sample rate and bit depth = better quality but bigger files</li>
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
    <strong>CPU (Central Processing Unit):</strong> The "brain" of the computer that fetches, decodes, and executes instructions. It performs all processing and calculations.
</div>

<h3>Main Components</h3>
<table class="notes-table">
    <tr><th>Component</th><th>Full Name</th><th>Purpose</th></tr>
    <tr><td><strong>ALU</strong></td><td>Arithmetic Logic Unit</td><td>Performs calculations (+, -, ×, ÷) and logic (AND, OR, NOT)</td></tr>
    <tr><td><strong>CU</strong></td><td>Control Unit</td><td>Fetches and decodes instructions, controls data flow</td></tr>
    <tr><td><strong>Registers</strong></td><td>-</td><td>Tiny, ultra-fast storage inside the CPU</td></tr>
    <tr><td><strong>Cache</strong></td><td>-</td><td>Small fast memory between CPU and RAM</td></tr>
</table>

<h3>Key Registers</h3>
<table class="notes-table">
    <tr><th>Register</th><th>Full Name</th><th>Purpose</th></tr>
    <tr><td><strong>PC</strong></td><td>Program Counter</td><td>Holds address of NEXT instruction to fetch</td></tr>
    <tr><td><strong>MAR</strong></td><td>Memory Address Register</td><td>Holds address currently being accessed</td></tr>
    <tr><td><strong>MDR</strong></td><td>Memory Data Register</td><td>Holds data being read/written to memory</td></tr>
    <tr><td><strong>CIR</strong></td><td>Current Instruction Register</td><td>Holds instruction being executed</td></tr>
    <tr><td><strong>ACC</strong></td><td>Accumulator</td><td>Stores results of ALU calculations</td></tr>
</table>

<h3>CPU Performance Factors</h3>
<table class="notes-table">
    <tr><th>Factor</th><th>What It Is</th><th>Effect</th></tr>
    <tr><td><strong>Clock Speed</strong></td><td>Cycles per second (GHz)</td><td>Higher = faster processing</td></tr>
    <tr><td><strong>Cores</strong></td><td>Number of processing units</td><td>More = better multitasking</td></tr>
    <tr><td><strong>Cache Size</strong></td><td>Fast memory in CPU</td><td>Larger = fewer slow RAM accesses</td></tr>
</table>

<div class="example-box">
    <h4>Understanding Clock Speed</h4>
    <p>A 3 GHz CPU performs 3 billion cycles per second. Each cycle can do a small part of an instruction.</p>
</div>

<div class="tip-box">
    <strong>Remember:</strong> PC holds the NEXT instruction address. CIR holds the CURRENT instruction being executed.
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
    <strong>Protocol:</strong> A set of rules that govern how data is transmitted and received over a network. Protocols ensure devices can communicate even if made by different manufacturers.
</div>

<h3>Why Protocols Are Needed</h3>
<ul>
    <li>Devices from different manufacturers need common rules</li>
    <li>Data must be formatted consistently</li>
    <li>Errors need to be detected and handled</li>
    <li>Devices must agree on speed and timing</li>
</ul>

<h3>Common Protocols</h3>
<table class="notes-table">
    <tr><th>Protocol</th><th>Full Name</th><th>Purpose</th></tr>
    <tr><td><strong>HTTP</strong></td><td>HyperText Transfer Protocol</td><td>Web page requests (unsecured)</td></tr>
    <tr><td><strong>HTTPS</strong></td><td>HTTP Secure</td><td>Encrypted web traffic</td></tr>
    <tr><td><strong>FTP</strong></td><td>File Transfer Protocol</td><td>Uploading/downloading files</td></tr>
    <tr><td><strong>SMTP</strong></td><td>Simple Mail Transfer Protocol</td><td>Sending emails</td></tr>
    <tr><td><strong>POP/IMAP</strong></td><td>Post Office Protocol / Internet Message Access</td><td>Receiving emails</td></tr>
    <tr><td><strong>TCP</strong></td><td>Transmission Control Protocol</td><td>Reliable data delivery</td></tr>
    <tr><td><strong>IP</strong></td><td>Internet Protocol</td><td>Addressing and routing</td></tr>
</table>

<h3>TCP/IP Model</h3>
<p>The TCP/IP model has 4 layers that work together:</p>
<table class="notes-table">
    <tr><th>Layer</th><th>Purpose</th><th>Protocols</th></tr>
    <tr><td><strong>4. Application</strong></td><td>User-facing services</td><td>HTTP, FTP, SMTP</td></tr>
    <tr><td><strong>3. Transport</strong></td><td>Reliable delivery</td><td>TCP, UDP</td></tr>
    <tr><td><strong>2. Internet</strong></td><td>Addressing & routing</td><td>IP</td></tr>
    <tr><td><strong>1. Network Access</strong></td><td>Physical connection</td><td>Ethernet, Wi-Fi</td></tr>
</table>

<h3>IP Addresses</h3>
<ul>
    <li><strong>IPv4:</strong> 32-bit address (e.g., 192.168.1.1)</li>
    <li><strong>IPv6:</strong> 128-bit address (more addresses available)</li>
    <li>Every device on a network needs a unique IP</li>
</ul>

<h3>MAC Address</h3>
<ul>
    <li>Physical address burned into network card</li>
    <li>48-bit, written in hex (e.g., 00:1A:2B:3C:4D:5E)</li>
    <li>Unique to each device worldwide</li>
</ul>

<div class="tip-box">
    <strong>HTTP vs HTTPS:</strong> HTTPS encrypts data between browser and website. Always look for HTTPS when entering sensitive information (passwords, payments).
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
        }
    }
};
