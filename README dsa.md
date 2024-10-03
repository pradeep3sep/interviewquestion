> ### The Big O
The Big O is basically `worst-case` running `time` of an `algorithm` as the input size increases

```
https://www.bigocheatsheet.com/
```


> ### Space complexity of array and object are O(n), string are O(1)



## Strings

> ### Palindrome

```js

    // time - O(n/2)
    // space - O(1)

 function checkPalindrome(str) {
    let j = str.length - 1;
    for (let i = 0; i < str.length / 2; i++) {
      if (str[i] === str[j]) {
        j--;
      } else {
        return false;
      }
    }
    return true;
  }

  console.log(checkPalindrome(str));
```

Subsequence of "abc" are  a, b, c, ab, bc, ac, abc. Keep in mind order matter because "ca" is not a subsequence\
count of subsequence is 2^n, where n is length of string.


Substring - All characters in substring appear consecutively in the original string. eg "abcdef", abc and def are substring\
Subsequence - It is sequence of characters that appear in the same order as in the original string, but not necessarily consecutivaly. you can skip character but order must remain remain same. eg -"abcdef", ace and bdf are subsequence



> ### Check if a String is Subsequence of Other

To check if a string is a subsequence of another string in JavaScript, you can use a two-pointer technique. This is a common DSA (Data Structures and Algorithms) approach. Here's the code:

```js
function isSubsequence(s1, s2) {
    let i = 0, j = 0;

    // Traverse both strings
    while (i < s1.length && j < s2.length) {
        // If characters match, move i
        if (s1[i] === s2[j]) {
            i++;
        }
        // Always move j to traverse s2
        j++;
    }

    // If we traversed all characters of s1, it's a subsequence
    return i === s1.length;
}

// Example usage:
console.log(isSubsequence("abc", "ahbgdc")); // true
console.log(isSubsequence("axc", "ahbgdc")); // false
```

### Explanation:
- `s1` is the string we're checking as a subsequence.
- `s2` is the main string.
- The code uses two pointers (`i` for `s1`, and `j` for `s2`). It traverses `s2`, and when characters match, the pointer `i` is incremented. If all characters of `s1` are matched before the end of `s2`, then `s1` is a subsequence of `s2`.

This approach runs in O(n) time complexity, where `n` is the length of `s2`.


> ### Check for anagram

```js
function areAnagrams(str1, str2) {
    if (str1.length !== str2.length) {
        return false; // If lengths don't match, they can't be anagrams
    }

    const charCount = {};

    // Loop through both strings at the same time
    for (let i = 0; i < str1.length; i++) {
        const char1 = str1[i].toLowerCase();
        const char2 = str2[i].toLowerCase();

        // Increment count for char1 from str1
        charCount[char1] = (charCount[char1] || 0) + 1;

        // Decrement count for char2 from str2
        charCount[char2] = (charCount[char2] || 0) - 1;
    }

    // Check if all values in charCount are zero
    for (let count in charCount) {
        if (charCount[count] !== 0) {
            return false;
        }
    }

    return true; // If all counts are zero, the strings are anagrams
}

// Example usage:
const string1 = "listen";
const string2 = "silent";
console.log(areAnagrams(string1, string2)); // Output: true
```

The algorithm used in the code can be classified as a **"Hash Table Frequency Count"** approach for checking anagrams.

### Algorithm Name:
**Two-Pass Hash Map with Character Balancing**

### Logic and Steps:
1. **Initial Length Check**:
   - The algorithm first checks if the two input strings (`str1` and `str2`) have the same length. If they don’t, they can’t be anagrams, and the algorithm returns `false`.

2. **Combined Loop**:
   - A single loop is used to iterate over both strings at the same time.
   - For each character in `str1`, we:
     - Convert the character to lowercase for case-insensitivity.
     - Increment the count of that character in a frequency map (`charCount`).
   - For each character in `str2`, we:
     - Convert the character to lowercase.
     - Decrement the count of that character in the frequency map.

   This approach ensures that if `str1` and `str2` are anagrams, every increment operation from `str1` will be perfectly canceled out by the corresponding decrement operation from `str2`.

3. **Balancing the Frequency Map**:
   - After the loop, we expect that for an anagram:
     - Every character in `str1` would have a corresponding character in `str2`, and the total frequency count for all characters should sum to zero.
   - The frequency map (`charCount`) is then checked to ensure all character counts are zero. If any character has a non-zero count, it means the strings are not anagrams, and the function returns `false`.

4. **Return Result**:
   - If all counts are zero, the function returns `true`, confirming that the two strings are anagrams.

### Why it Works:
- If two strings are anagrams, they will have exactly the same characters with the same frequencies. By combining both the increment and decrement operations in one pass, we ensure that the characters balance each other out.
- The final check ensures that the frequency map is empty or "balanced" (all values are zero), indicating that all characters from one string perfectly match those of the other string.

### Time and Space Complexity:
- **Time Complexity**: **O(n)**, where `n` is the length of the strings (since they have the same length, we iterate once through both strings).
- **Space Complexity**: **O(k)**, where `k` is the number of unique characters in the string (usually a small constant, limited by the number of unique characters in the alphabet).

This algorithm is efficient because it leverages a hash map (or object in JavaScript) to maintain counts and performs all character balancing in a single pass over the strings.



> ### Check for leftmost repeating character 

- Algoname - Hashing

Here's a JavaScript code to check for the leftmost repeating character using a data structures and algorithms (DSA) approach. We can use a `map` (or object) to store character frequencies and their first occurrence.

### Approach:
1. Traverse the string and store the first occurrence of each character in a map.
2. While traversing, check if the character is already in the map. If it is, update the leftmost repeating character.
3. At the end, return the index of the leftmost repeating character.

### Code:
```javascript
function leftMostRepeatingChar(str) {
    const map = {};  // Object to store the first occurrence of characters
    let leftMostIdx = -1;  // Variable to store the index of the leftmost repeating character

    // Traverse from right to left to capture the leftmost repeating character
    for (let i = str.length - 1; i >= 0; i--) {
        const char = str[i];
        if (map[char]) {
            leftMostIdx = i;  // Update index of the leftmost repeating character
        } else {
            map[char] = true;  // Mark this character as visited
        }
    }

    return leftMostIdx;
}

// Test example
console.log(leftMostRepeatingChar("geeksforgeeks")) // 0
console.log(leftMostRepeatingChar("abbcc")) // 1
console.log(leftMostRepeatingChar("abcd")) // -1
```

### Explanation:
- A map (`map`) keeps track of the characters you've seen.
- The loop runs from the right end to the left, so whenever a character repeats, we update the `leftMostIdx`.
- This ensures that the leftmost repeating character is captured first.

### Time Complexity: 
- O(n), where n is the length of the string. The string is traversed only once.

> ### check for leftmost non-repeating character

```js
function leftMostNonRepeatingChar(str) {
  const freqMap = {};

  // First pass: count the frequency of each character
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  // Second pass: find the first character with frequency 1
  for (let i = 0; i < str.length; i++) {
    if (freqMap[str[i]] === 1) {
      return str[i]; // Return the first non-repeating character
    }
  }

  return null; // Return null if no non-repeating character is found
}

// Example usage:
const str = "abacabad";
console.log(leftMostNonRepeatingChar(str)); // Output: "c"
```

<br>

> ### The difference between various notations
The differences between the time complexities \(O(1)\), \(O(\log n)\), \(O(n)\), \(O(nlog n)\), and \(O(n^2)\) describe how the runtime of an algorithm scales with the size of the input \(n\). Here's a breakdown of each:

1. **\(O(1)\) - Constant Time Complexity**:
   - The runtime of the algorithm does not depend on the input size. No matter how large \(n\) is, it always takes a constant amount of time to complete.
   - Example: Accessing an element in an array by index, such as `arr[5]`.

2. **\(O(log n)\) - Logarithmic Time Complexity**:
   - The runtime grows logarithmically as the input size increases. This often occurs in `divide-and-conquer` algorithms, where the problem is split into smaller chunks.
   - Example: Binary search on a sorted array.

3. **\(O(n)\) - Linear Time Complexity**:
   - The runtime `increases linearly` with the input size. If \(n\) doubles, the time taken also doubles.
   - Example: Iterating over an array of size \(n\).

4. **\(O(n log n)\) - Linearithmic Time Complexity**:
   - The runtime grows faster than linear but slower than quadratic. This time complexity often appears in more efficient sorting algorithms.
   - Example: Merge Sort, Quick Sort (average case).

5. **\(O(n^2)\) - Quadratic Time Complexity**:
   - The runtime grows quadratically as the input size increases. If \(n\) doubles, the time taken increases by a factor of four. This happens when you have `nested loops` over the same input.
   - Example: Bubble Sort, Selection Sort.

### Summary of Growth:
- \(O(1)\) < \(O(log n)\) < \(O(n)\) < \(O(n log n)\) < \(O(n^2)\)

<br>


## Various alogorith used in DSA

> ### Prefix sum algorithm [Youtube video for concept](https://www.youtube.com/watch?v=qmlrMrIObvs)

In the **Prefix Sum Algorithm**, the process is typically divided into two common steps:

### 1. **Building the Prefix Sum Array**
   - **Purpose:** Precompute cumulative sums of the array so that future range queries can be answered efficiently.
   - **Steps:**
     1. Create a new array (`prefixSum`), where each element at index `i` stores the sum of all elements from the start of the input array up to `i`.
     2. Initialize the first element of the `prefixSum` array: `prefixSum[0] = arr[0]`.
     3. Iterate through the array from index 1 to `n-1`, updating each element of the `prefixSum` array as:  
        `prefixSum[i] = prefixSum[i-1] + arr[i]`.

   - **Complexity:** O(n)

### 2. **Querying the Sum of a Subarray**
   - **Purpose:** Use the prefix sum array to efficiently compute the sum of elements between two indices (`l` and `r`).
   - **Steps:**
     1. If `l == 0`, the sum of the subarray from index `0` to `r` is just `prefixSum[r]`.
     2. If `l > 0`, the sum of the subarray from index `l` to `r` can be calculated as:  
        `sum = prefixSum[r] - prefixSum[l-1]`.
     3. This works because `prefixSum[r]` gives the sum of elements from `0` to `r`, and subtracting `prefixSum[l-1]` removes the elements from `0` to `l-1`, leaving the sum of elements between `l` and `r`.

   - **Complexity:** O(1)

### Example:

For the array `[2, 4, 6, 8, 10]`:

- **Building the Prefix Sum Array:**
  - prefixSum[0] = 2
  - prefixSum[1] = 2 + 4 = 6
  - prefixSum[2] = 6 + 6 = 12
  - prefixSum[3] = 12 + 8 = 20
  - prefixSum[4] = 20 + 10 = 30
  
  So, the `prefixSum` array is `[2, 6, 12, 20, 30]`.

- **Querying the Sum of a Subarray:**
  - To get the sum of the subarray from index `1` to `3`, compute:
    - `sum = prefixSum[3] - prefixSum[0] = 20 - 2 = 18`.

### Summary of Common Steps:
1. Build the prefix sum array in O(n) time.
2. Query the sum of any subarray in O(1) time by using the prefix sum array.


```js
function buildPrefixSumArray(arr) {
  let prefixSum = [];
  prefixSum[0] = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    prefixSum[i] = prefixSum[i - 1] + arr[i];
  }
  
  return prefixSum;
}

function getRangeSum(prefixSum, l, r) {
  if (l === 0) {
    return prefixSum[r];
  } else {
    return prefixSum[r] - prefixSum[l - 1];
  }
}

// Example usage:
const arr = [2, 4, 6, 8, 10];
const prefixSum = buildPrefixSumArray(arr);

console.log(getRangeSum(prefixSum, 1, 3)); // Output: 18 (4 + 6 + 8)
console.log(getRangeSum(prefixSum, 0, 2)); // Output: 12 (2 + 4 + 6)
```

> ### Two-pointer algorithm
In the two-pointer algorithm, there are several common steps or patterns that we typically follow, regardless of the specific problem. Here’s a generalized breakdown of the steps involved:

### 1. **Initialize Two Pointers**
   - One pointer is placed at the start (`left` or `i`) of the array.
   - The other pointer is placed at the end (`right` or `j`) of the array.
   
   ```javascript
   let left = 0;
   let right = arr.length - 1;
   ```

### 2. **Loop Until the Two Pointers Meet**
   - You continue the iteration while the `left` pointer is less than the `right` pointer.
   - In certain problems (like sliding window, string comparison), the loop condition could change slightly, but in the classic two-pointer approach, this is a common condition.
   
   ```javascript
   while (left < right) {
     // continue with logic
   }
   ```

### 3. **Check a Condition with the Two Pointers**
   - Inside the loop, you'll typically perform some kind of comparison or computation with the values at the two pointers (like summing them, checking their equality, etc.).
   - This condition will help determine the next move for the pointers.
   
   Example: Checking if the sum of the two pointers is equal to the target:
   ```javascript
   const sum = arr[left] + arr[right];
   if (sum === target) {
     return [arr[left], arr[right]];
   }
   ```

### 4. **Move the Pointers Based on the Condition**
   - **Increase the left pointer**: If the current sum (or comparison value) is less than the target, move the `left` pointer one step to the right (`left++`). This is usually done to increase the value.
   - **Decrease the right pointer**: If the current sum (or comparison value) is more than the target, move the `right` pointer one step to the left (`right--`). This is usually done to decrease the value.
   
   ```javascript
   if (sum < target) {
     left++;  // Move left pointer right to increase the sum
   } else {
     right--; // Move right pointer left to decrease the sum
   }
   ```

### 5. **Edge Case Handling**
   - Before the loop or within the loop, handle any special edge cases, like:
     - An empty array.
     - A single element.
     - Conditions where no solution exists.

### 6. **Return the Result**
   - Once the desired condition is met (like finding the target pair), return the result.
   - If no solution is found, return a failure condition (like `null` or an empty array).
   
   ```javascript
   return null; // If no pair or solution is found
   ```

### Summary of the Steps:
1. **Initialize two pointers** at the beginning and end of the array.
2. **Loop until** the pointers meet.
3. **Perform a check** (e.g., sum, comparison) on the values at the two pointers.
4. **Move the pointers** accordingly:
   - Increment the `left` pointer if the current condition suggests a smaller value is needed.
   - Decrement the `right` pointer if a larger value is needed.
5. **Return the result** once the condition is met or exit the loop if no solution is found.

These steps can vary slightly based on the specific problem but generally follow this pattern.


```js

// example of code
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === target) {
      return [arr[left], arr[right]]; // Return the numbers that sum up to the target
    } else if (sum < target) {
      left++; // Move left pointer to the right
    } else {
      right--; // Move right pointer to the left
    }
  }

  return null; // No pair found
}

// Example usage:
const arr = [1, 2, 3, 4, 6];
const target = 6;
console.log(twoSum(arr, target)); // Output: [1, 4]
```


> ### Sliding window algorithm [Youtube video for concept](https://www.youtube.com/watch?v=uqGxFk0cEdI)

Sliding Window problems are problems in which a fixed or variable-size window is moved through a data structure, typically an array or string, to solve problems efficiently based on continuous subsets of elements. This technique is used when we need to find subarrays or substrings according to a given set of conditions.

The general steps to solve these questions by following below steps:

- Find the size of the window required, say K.
- Compute the result for 1st window, i.e. include the first K elements of the data structure.
- Then use a loop to slide the window by 1 and keep computing the result window by window.
- slide basically means add one element from right and remove one element from left from the sum 


How to Identify Sliding Window Problems:

- These problems generally require Finding Maximum/Minimum Subarray, Substrings which satisfy some specific condition.
- The size of the subarray or substring ‘K’ will be given in some of the problems.
- These problems can easily be solved in O(N2) time complexity using nested loops, using sliding window we can solve these in O(n) Time Complexity.
- Required Time Complexity: O(N) or O(Nlog(N))



```js
function maxSumSubarray(arr, w, n) {
    let current = 0;
    
    // Calculate the sum of the first window
    for (let i = 0; i < w; i++) {
        current += arr[i];
    }
    
    let maxx = current;
    
    // Slide the window and update the maximum sum
    for (let i = 1; i <= n - w; i++) {  // when we reach at the end, if remaining element less than window, then that part we do not need to slide
        current = current - arr[i - 1] + arr[i + w - 1];
        if (current > maxx) {
            maxx = current;
        }
    }
    
    return maxx;
}

// Driver code
let arr = [1, 4, 2, 10, 2, 3, 1, 0, 20];
let w = 4; // width of slider window
let n = arr.length;
maxSumSubarray(arr, w, n)
```


> ### fast and slow pointer algorithm [Youtube video for concept](https://www.youtube.com/watch?v=XWyXy2aNrXM)

The **fast and slow pointer algorithm** (also known as the **tortoise and hare algorithm**) is a two-pointer technique used to detect cycles in linked lists, arrays, or other data structures. It involves using two pointers that move at different speeds to determine if and where a cycle exists. This technique is particularly useful in problems related to detecting loops and finding middle points in a data structure.

### General Steps for the Fast and Slow Pointer Algorithm:

1. **Initialize Two Pointers**:
   - The **slow pointer** moves one step at a time.
   - The **fast pointer** moves two steps at a time.

2. **Traverse the Data Structure**:
   - Move both pointers until either:
     - The fast pointer reaches the end of the data structure (indicating no cycle).
     - The fast pointer catches up to the slow pointer (indicating a cycle).

3. **Cycle Detection** (If the fast pointer meets the slow pointer):
   - If the fast pointer equals the slow pointer at some point, a cycle exists.

4. **Find Cycle Length or Cycle Start (if needed)**:
   - To find the **starting point** of the cycle, reset one pointer to the head and move both pointers one step at a time until they meet again.
   - To find the **length of the cycle**, keep one pointer fixed and move the other around the cycle until it meets the first pointer again, counting the steps.

### JavaScript Example: Detecting a Cycle in a Linked List

```javascript
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;          // Move slow by 1 step
    fast = fast.next.next;      // Move fast by 2 steps

    if (slow === fast) {
      return true;              // Cycle detected
    }
  }

  return false;                 // No cycle
}
```

### Finding the Start of the Cycle

```javascript
function detectCycleStart(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Cycle detected, find the starting point
      let pointer = head;
      while (pointer !== slow) {
        pointer = pointer.next;
        slow = slow.next;
      }
      return pointer; // Start of the cycle
    }
  }

  return null; // No cycle
}
```

### Use Cases of Fast and Slow Pointer Algorithm:
- **Cycle Detection in Linked List**: As shown in the examples above, this is one of the most common uses.
- **Find the Middle of a Linked List**: Move one pointer one step and the other pointer two steps, and the slow pointer will be at the middle when the fast pointer reaches the end.
- **Detecting Palindromes**: Useful in determining if a list or array is a palindrome by moving pointers towards the center.
  
To find the **middle of a linked list** using the fast and slow pointer technique, the general idea is simple:

- The **slow pointer** moves one step at a time.
- The **fast pointer** moves two steps at a time.
- When the fast pointer reaches the end of the list (or cannot move further), the slow pointer will be at the middle.

This method works efficiently in `O(n)` time and doesn't require knowing the length of the list beforehand.

### Example of Finding the Middle of a Linked List in JavaScript:

Here's how you can implement it:

```javascript
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function findMiddle(head) {
  if (!head) return null;

  let slow = head;
  let fast = head;

  // Traverse the list with fast and slow pointers
  while (fast !== null && fast.next !== null) {
    slow = slow.next;       // Move slow pointer by 1 step
    fast = fast.next.next;   // Move fast pointer by 2 steps
  }

  // Slow pointer is now at the middle
  return slow;
}

// Example usage:

// Create linked list: 1 -> 2 -> 3 -> 4 -> 5
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

let middle = findMiddle(head);
console.log(middle.value);  // Output: 3 (Middle of the list)
```

### Explanation:

1. **Initialization**: Start with two pointers, `slow` and `fast`, both pointing to the head of the list.
2. **Traversal**: 
   - The `slow` pointer moves one step at a time (`slow = slow.next`).
   - The `fast` pointer moves two steps at a time (`fast = fast.next.next`).
3. **Condition**: The loop runs while `fast` and `fast.next` are not `null` (ensuring the fast pointer does not go out of bounds).
4. **Result**: When the loop terminates, the `slow` pointer will be at the middle of the linked list.

### Handling Even and Odd Length Lists:
- If the list has **odd** length (e.g., 5 nodes), the `slow` pointer will point to the exact middle (e.g., 3 in the list `1 → 2 → 3 → 4 → 5`).
- If the list has **even** length (e.g., 6 nodes), the `slow` pointer will point to the first of the two middle elements (e.g., 3 in the list `1 → 2 → 3 → 4 → 5 → 6`).

You can adjust the logic depending on whether you want to return the first or second middle element in an even-length list. 

### Example with an Even-Length List:

```javascript
// Create linked list: 1 -> 2 -> 3 -> 4 -> 5 -> 6
let headEven = new ListNode(1);
headEven.next = new ListNode(2);
headEven.next.next = new ListNode(3);
headEven.next.next.next = new ListNode(4);
headEven.next.next.next.next = new ListNode(5);
headEven.next.next.next.next.next = new ListNode(6);

let middleEven = findMiddle(headEven);
console.log(middleEven.value);  // Output: 4 (First middle of the list)
```

In this case, the slow pointer will point to `4`, the first middle element.

Let me know if you'd like further clarifications or adjustments!

> ### Monotonic stack algo is pending




> ### Array vs Linked list table in terms of BIG O

| Operation  | Array (Big O) | Linked List (Big O) |
|------------|---------------|---------------------|
| **Pop**    | O(1)          | O(n)                |
| **Push**   | O(1)          | O(n)                |
| **Shift**  | O(n)          | O(1)                |
| **Unshift**| O(n)          | O(1)                |
| **Reverse**| O(n)          | O(n)                |
| **Insert** | O(n)          | O(n)                |
| **Update** | O(1)          | O(n)                |

<br>

> ## Single linked list

> ### Linked List node

In linked list we have basic unit called `node` and below is the basic structure for the same

```js
// let node is 4

{
    value: 4,
    next: null
}
```

Each linked list have the `head node`,`tail node`, along with `length` property.


```js
class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor(value){
        const newNode = new Node(value)
        this.head = newNode
        this.tail = this.head
        this.length = 1
    }

    push(value){
        const newNode = new Node(value)
        
        if(!this.head){
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++

        return this
    }

    pop(){
        // When there is no head
        if(!this.head) return undefined

        // when there is head in linked LinkedList
        let temp = this.head
        let pre = this.head

        while(temp.next){
            pre = temp
            temp = temp.next
        }

        this.tail = pre
        this.tail.next = null
        this.length--

        // for handling if deleting node, it empties the linked list
        if(this.length === 0){
            this.head = null
            this.tail = null
        }

        return temp
    }

    unshift(value){
        const newNode = new Node(value)

        // when there is no head
        if(!this.head){
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }
        this.length++
        return this
    }

    shift(){
        
        // When there is no head
        if(!this.head) return undefined

        let temp = this.head
        this.head = this.head.next
        temp.next = null
        this.length--

        // below is for, if we are removing the last node of linked list
        if(this.length === 0){
            this.tail = null
        }

        // below is for returning the delted value
        return temp
    }

    get(index){
        // for handling the value whose index is not in the range
        if(index < 0 || index >= this.length){
            return undefined
        }

        let temp = this.head
        for(let i=0; i<index; i++){
            temp = temp.next
        }
        return temp
    }

    set(index, value){
        let temp = this.get(index)
        if(temp){
            temp.value = value
            return true
        }
        return false
    }

    insert(index, value){
        // for handling if added to initial or starting position
        if(index === 0) return this.unshift(value)

        // for handling, if added to end of linked list
        if(index === this.length-1) return this.push(value)

        // for handling, if index passed which is out of range of linked list
        if(index < 0 || index >= this.length) return false

        const newNode = new Node(value)
        const temp = this.get(index-1)

        newNode.next = temp.next
        temp.next = newNode
        this.length++
        return true
    }

    remove(index) {
       // Handle index out of range
       if (index < 0 || index >= this.length) return null;
   
       // Handle removing the first node
       if (index === 0) return this.shift();
   
       // Handle removing the last node
       if (index === this.length - 1) return this.pop();
   
       // Get the node before the one we want to remove
       const before = this.get(index - 1);
       const temp = before.next;  // Corrected: no parentheses since next is a property
   
       // Remove the node by adjusting pointers
       before.next = temp.next;
       temp.next = null;
   
       // Decrease the length
       this.length--;
   
       return temp;  // Return the removed node
   }


   // delete a node in a singly linked list when only that node (the one to be deleted) is given
   // you can achieve the deletion by copying the data from the next node into the given node, and then deleting the next node.
   // 1.Copy the value of the next node to the current node (the node to be deleted)
   // 2.Set the next pointer of the current node to the next of the next node, effectively "skipping" the next node.
   // 3.This approach won't work for the last node in the list since there is no next node to copy data from.
    findAndDeleteNode(value) {
       let current = this.head;

       // Traverse the list to find the node with the given value
       while (current) {
           if (current.value === value) {
               // If the node is found, check if it's not the last node
               if (current.next) {
                   // Copy the value of the next node and bypass the next node
                   current.value = current.next.value;
                   current.next = current.next.next;
               } else {
                   console.log('Cannot delete the last node using this method.');
               }
               return;
           }
           current = current.next;
       }

       console.log(`Node with value ${value} not found.`);
    }


    // Function to segregate even and odd nodes
    segregateEvenOdd() {
        if (!this.head) return; // No nodes in the list

        let evenHead = null,
            evenTail = null;
        let oddHead = null,
            oddTail = null;
        let current = this.head;

        while (current) {
            if (current.value % 2 === 0) {
                // Even node
                if (!evenHead) {
                    evenHead = current;
                    evenTail = evenHead;
                } else {
                    evenTail.next = current;
                    evenTail = evenTail.next;
                }
            } else {
                // Odd node
                if (!oddHead) {
                    oddHead = current;
                    oddTail = oddHead;
                } else {
                    oddTail.next = current;
                    oddTail = oddTail.next;
                }
            }
            current = current.next;
        }

        // If there are no even nodes or no odd nodes, no need to modify the list
        if (!evenHead || !oddHead) {
            return;
        }

        // Combine the even and odd lists
        evenTail.next = oddHead;
        oddTail.next = null; // Mark the end of the new list

        // Update the head to point to the even list's head
        this.head = evenHead;
    }

    // Function to calculate the length of the list
    getLength() {
        let current = this.head;
        let length = 0;
        while (current) {
            length++;
            current = current.next;
        }
        return length;
    }

    // Function to find the intersection point of two linked lists
    // 1.Calculate the lengths of both lists.
    // 2.Move the pointer of the longer list ahead by the difference in lengths.
    // 3.Traverse both lists together until the pointers meet at the intersection point.
    static findIntersection(list1, list2) {
        let len1 = list1.getLength();
        let len2 = list2.getLength();

        let head1 = list1.head;
        let head2 = list2.head;

        // Align both lists by moving the pointer of the longer list ahead by the difference in lengths
        if (len1 > len2) {
            let diff = len1 - len2;
            while (diff--) {
                head1 = head1.next;
            }
        } else if (len2 > len1) {
            let diff = len2 - len1;
            while (diff--) {
                head2 = head2.next;
            }
        }

        // Traverse both lists together and find the intersection point
        while (head1 && head2) {
            if (head1 === head2) {
                return head1.value; // Return the value at the intersection point
            }
            head1 = head1.next;
            head2 = head2.next;
        }

        return null; // No intersection
    }


    // Function to swap nodes in pairs by changing links
    pairwiseSwap() {
        if (!this.head || !this.head.next) return; // No need to swap if less than 2 nodes

        let prev = null;
        let current = this.head;

        // Change the head to the second node since we are swapping in pairs
        this.head = current.next;

        while (current && current.next) {
            let nextNode = current.next;
            current.next = nextNode.next;
            nextNode.next = current;

            // Connect the previous pair to the current swapped pair
            if (prev) {
                prev.next = nextNode;
            }

            // Move to the next pair
            prev = current;
            current = current.next;
        }
    }

    // Function to reverse a linked list starting from a given node
    reverse(node) {
        let prev = null;
        let current = node;
        while (current) {
            let nextNode = current.next;
            current.next = prev;
            prev = current;
            current = nextNode;
        }
        return prev;
    }

    // Function to check if the linked list is a palindrome
    // A common method to solve this problem in O(n) time and O(1) space is to:

    // 1.Find the middle of the linked list.
    // 2.Reverse the second half of the list.
    // 3.Compare the first half with the reversed second half.
    // 4.Optionally, restore the list to its original order (by reversing the second half back).

    isPalindrome() {
        if (!this.head || !this.head.next) {
            return true; // A single node or empty list is a palindrome
        }

        // Step 1: Find the middle of the linked list
        let slow = this.head;
        let fast = this.head;

        while (fast && fast.next) {
            slow = slow.next; // Move slow by 1 step
            fast = fast.next.next; // Move fast by 2 steps
        }

        // Step 2: Reverse the second half of the list
        let secondHalf = this.reverse(slow);

        // Step 3: Compare the first half and the reversed second half
        let firstHalf = this.head;
        let checkPalindrome = true;
        let tempSecondHalf = secondHalf;

        while (tempSecondHalf) {
            if (firstHalf.value !== tempSecondHalf.value) {
                checkPalindrome = false;
                break;
            }
            firstHalf = firstHalf.next;
            tempSecondHalf = tempSecondHalf.next;
        }

        // Step 4: Restore the second half back to its original order (optional)
        this.reverse(secondHalf);

        return checkPalindrome;
    }


    // Merge two sorted linked lists
    // 1.Create a dummy node to serve as the starting point of the merged list.
    // 2.Use two pointers to traverse both lists, comparing the nodes from each list.
    // 3.Add the smaller node to the merged list.
    // 4.If one list becomes empty before the other, append the remaining nodes from the other list to the merged list.

    static mergeSortedLists(list1, list2) {
        // Create a dummy node to serve as the start of the merged list
        const dummy = new Node(0);
        let current = dummy;

        let l1 = list1.head;
        let l2 = list2.head;

        // Traverse both lists and merge them in sorted order
        while (l1 && l2) {
            if (l1.value <= l2.value) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        // If one list is not fully traversed, append the remaining nodes
        if (l1) {
            current.next = l1;
        } else if (l2) {
            current.next = l2;
        }

        // Return the merged list starting from the next of dummy
        const mergedList = new LinkedList();
        mergedList.head = dummy.next;
        return mergedList;
    }

    reverse(){
        let temp = this.head
        this.head = this.tail
        this.tail = temp

        let next = temp.next
        let prev = null

        for(let i=0; i<this.length; i++){
            next = temp.next
            temp.next = prev
            prev = temp
            temp = next
        }

        return this
    }

    // reverse if we do not have tail and length
    reverse() {
        let previous = null;
        let current = this.head;
        let next = null;

        // Traverse the list and reverse the links
        while (current) {
            // Store the next node
            next = current.next;
            // Reverse the current node's pointer
            current.next = previous;
            // Move the previous and current pointers one step forward
            previous = current;
            current = next;
        }

        // After the loop, previous will be the new head
        this.head = previous;
    }

    // remove duplicates from a sorted singly linked list 
    removeDuplicates() {
        let current = this.head;

        while (current && current.next) {
            if (current.value === current.next.value) {
                // Skip/delete the duplicate node
                current.next = current.next.next;
            } else {
                // Move to the next node if no duplicate
                current = current.next;
            }
        }
    }

    // Function to reverse the linked list in groups of k
    reverseInGroupsOfK(k) {
        this.head = this.reverseInGroups(this.head, k);
    }

    // Function to reverse a group of k nodes in the linked list
    reverseInGroups(head, k) {
        let current = head;
        let previous = null;
        let next = null;
        let count = 0;

        // Reverse the first k nodes of the linked list
        while (current && count < k) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
            count++;
        }

        // next is now pointing to (k+1)th node
        // Recur for the list starting from current
        if (next) {
            head.next = this.reverseInGroups(next, k);
        }

        // previous is the new head of the reversed group
        return previous;
    }

    // Function to detect a loop using Floyd's Cycle Detection Algorithm ie Slow pointer and Fast pointer
    detectLoop() {
        let slow = this.head;
        let fast = this.head;

        while (fast && fast.next) {
            slow = slow.next;         // Moves one step
            fast = fast.next.next;     // Moves two steps

            // If slow and fast meet, there's a loop
            if (slow === fast) {
                return true;
            }
        }

        // If we reach here, there is no loop
        return false;
    }

    // Function to detect and remove a loop in the linked list
    // 1. Detect the loop using Floyd's Cycle Detection Algorithm (also known as the tortoise and hare method).
    // 2. reset slow pointer to the head of the list
    // 3. Move both pointers one step at a time until they meet. This is the start of the loop.
    // 4. To remove the loop, traverse the loop again and find the node whose next points to the start of the loop. Set that node's next to null.
    detectAndRemoveLoop() {
        let slow = this.head;
        let fast = this.head;
        let loopDetected = false;

        // Step 1: Detect the loop using Floyd's Cycle Detection Algorithm
        while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

            if (slow === fast) {
                loopDetected = true;
                break;
            }
        }

        // If no loop was detected, return
        if (!loopDetected) {
            console.log("No loop detected.");
            return;
        }

        console.log("Loop detected.");

        // Step 2: Find the start of the loop
        slow = this.head;
        while (slow !== fast) {
            slow = slow.next;
            fast = fast.next;
        }

        // `slow` (or `fast`) is now pointing to the start of the loop
        const loopStart = slow;
        console.log("Loop starts at node with value:", loopStart.value);

        // Step 3: Find the node just before the start of the loop and remove the loop
        let current = loopStart;
        while (current.next !== loopStart) {
            current = current.next;
        }

        // Break the loop
        current.next = null;
        console.log("Loop removed.");
    }


    // Function to insert a new node in a sorted manner
    sortedInsert(value) {
        const newNode = new Node(value);

        // If the list is empty or the new node should be inserted at the head
        if (!this.head || this.head.value >= value) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        // Traverse the list and find the correct position to insert
        let current = this.head;
        while (current.next && current.next.value < value) {
            current = current.next;
        }

        // Insert the new node
        newNode.next = current.next;
        current.next = newNode;
    }


    // Function to find the middle node
    // "two-pointer technique" (also called "slow and fast pointer").
    findMiddle() {
        let slow = this.head;
        let fast = this.head;

        // Traverse the list, fast moves 2 steps, slow moves 1 step
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // When fast reaches the end, slow will be at the middle
        return slow;
    }

    // Function to find the nth node from the end
    // two-pointer technique
    findNthFromEnd(n) {
        let first = this.head;
        let second = this.head;

        // Move the first pointer `n` nodes ahead
        for (let i = 0; i < n; i++) {
            if (!first) {
                // If n is larger than the length of the list
                return null;
            }
            first = first.next;
        }

        // Move both pointers until the first pointer reaches the end
        while (first) {
            first = first.next;
            second = second.next;
        }

        // The second pointer is now at the nth node from the end
        return second;
    }


    // Function to print the linked list
    printList() {
        let current = this.head;
        let listStr = '';
        while (current) {
            listStr += current.value + ' -> ';
            current = current.next;
        }
        console.log(listStr + 'null');
    }
}

let myLinkedList = new LinkedList(1)
myLinkedList.push(2)

```

> ### Double linked list

```js
class Node {
    constructor(value){
        this.value = value
        this.next = null
        this.prev = null
    }
}

class DoublyLinkedList {
    constructor(value){
        const newNode  = new Node(value)
        this.head = newNode
        this.tail = newNode
        this.length = 1
    }

    push(value){
        const newNode  = new Node(value)

        if(!this.head){
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
        }

        this.length++
        return this
    }

    pop(){
        if(this.length === 0) return undefined

        let temp = this.tail

        if(this.length === 1){
            this.head = null
            this.tail = null
        } else {
            this.tail = this.tail.prev
            this.tail.next = null
            temp.prev = null
        }
        this.length--
        return temp
    }

    unshift(value){
        const newNode  = new Node(value)

        if(this.length === 0){
            this.head = newNode
            this.tail = newNode
        }else {
            newNode.next = this.head
            this.head.prev = newNode
            this.head = newNode
        }
        this.length++
        return this
    }

    shift(){
        if(this.length === 0) return undefined

        let temp = this.head

        if(this.length === 1){
            this.head = null
            this.tail = null
        } else {
            this.head = this.head.next
            this.head.prev = null
            temp.next = null
        }
        this.length++
        return temp
    }

    get(index){
        // to handle out of range index
        if(index < 0 || index >= this.length) return undefined

        let temp

        // here linked list is bind in two direction, we will find short path at tail and head, then traverse accordingly

        if(index < this.length/2){
            temp = this.head

            for(let i=0; i<index; i++){
                temp = temp.next
            }
        } else {
            temp = this.tail

            for(let i=this.length-1; i>index; i--){
                temp = temp.prev
            }
        }

        return temp
    }

    set(index,value){
        let temp = this.get(index)

        if(temp){
            temp.value = value
            return true
        }

        return false
    }

    insert(index,value){
        if(index === 0) return this.unshift(value)
        if(index === this.length) return this.push(value)
        if(index < 0 || index > this.length) return false

        const newNode = new Node(value)
        const before = this.get(index - 1)
        const after = before.next
        before.next = newNode
        newNode.prev = before
        newNode.next = after
        after.prev = newNode
        this.length++
        return true
        
    }

    remove(index){
        if(index === 0) return this.shift()
        if(index === this.length - 1) return this.pop()
        if(index < 0 || index > this.length) return undefined

        const temp = this.get(index)

        temp.prev.next = temp.next
        temp.next.prev = temp.prev
        temp.next = null
        temp.prev = null

        this.length--
        return temp
    }
}

let myDoublyLinkedList = new DoublyLinkedList(7)
myDoublyLinkedList
```


> ### Stacks and Queues

```js
// stack is like linked list, with head named as top and available at top position. basically vertically alingned of linked list
// entry and exist on same side
class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor(value){
        const newNode = new Node(value)
        this.top = newNode
        this.length = 1
    }

    // push is like unshift of linked list
    push(value){
        const newNode = new Node(value)
        if(this.length === 0){
            this.top = newNode
        } else {
            newNode.next = this.top
            this.top = newNode
        }
        this.length++
        return this
    }

    pop(){
        if(this.length === 0) return undefined

        let temp = this.top
        this.top = this.top.next
        temp.next = null

        this.length--
        return temp
    }
}

let myStack = new Stack(11)


// Queue is like linked list with FIFO.
// entry and exit are on opposite side
class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Queue {
    constructor(value){
        const newNode = new Node(value)
        this.first = newNode
        this.last = newNode
        this.length = 1
    }

    enqueue(value){
        const newNode = new Node(value)
        if(this.length === 0){
            this.first = newNode
            this.last = newNode
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        this.length++
        return this
    }

    dequeue(){
        if(this.length === 0) return undefined

        let temp = this.first
        if(this.length === 1){
            this.first = null
            this.last = null
        } else {
            this.first = this.first.next
            temp.next = null
        }
        this.length--
        return temp
    }
}

let myQueue = new Queue(4)
myQueue
```


> ### Binary search tree

```js
// Trees

// Full Tree - Every item either points to two nodes or zero nodes

// Leaf nodes - there the nodes which do not have parents

// In binary search tree - if child is greater than parent it goes to right else goes to left.
// when we add any node we start comparing from the top.

// When traversing(lookup, insert,remove) through the BST, it is O(logn), it is because in BST, the right side is always greater than the left side,
// so it will be divide and conquere(diving in half in each level) so becomes the O(log n)
// sometime in BST, every node is added in right side means always it is bigger than parent, in that scenario it will become O(n)


class Node(value){
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor(){
        this.root = null
    }

    insert(value){
        const newNode = new Node(value)

        // If BST do not have any node or root node
        if(this.root === null){ 
            this.root = newNode
            return this
        }

        // travesing the node
        let temp = this.root
        while(true){

            // for handling, adding duplicate node
            if(newNode.value === temp.value) return undefined

            if(newNode.value < temp.value){
                
                // if left side has no value
                if(temp.left === null){
                    temp.left = newNode
                    return this
                }

                // if left side has value
                temp = temp.left
            } else {

                // if right side has no value
                if(temp.right === null){
                    temp.right = newNode
                    return this
                }

                // if right side has value
                temp = temp.right
            }
        }
    }

    contains(value){
        // for handling if there is no root node
        if(this.root === null) return false

        let temp = this.root
        while(temp){
            if(value < temp.value){
                temp = temp.left
            } else if(value > temp.value){
                temp = temp.right
            } else {
                return true
            }
        }

        return false
    }
}

let myTree = new BST()
myTree

```


> ###  Hash Table

```js
// A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found.
// common example of hash table is object in JS.


// charactristics of hashes
// 1. They are one way
// 2. Hashes are deterministic, means if you run nails through this equation and it produces the number, the next time you run nails it will produce same number

// collision - It is a situation when we have an item that maps to that same spot in memory

// hash function always give the same number when same input is passed through it

// If we have a prime number. we get a more randomized distribution of the items, which is optimal.

// Big O of hash table

// - Access    => O(1) || O(n). (keep in we are here considering key not the value lookup)
// - Insert    => O(1).
// - Delete    => O(1).

class HashTable {
    constructor(size = 7){
        this.dataMap = new Array(size)
    }

    _hash(key){
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length
        }
        return hash
    }

    // O(1)
    set(key, value){
        let index = this._hash(key)
        if(!this.dataMap[index]){
            this.dataMap[index] = []  // O(1)
        }
        this.dataMap[index].push([key, value]) // O(1)
        return this
    }

    // O(1) || O(n)
    get(key) {
        // we get the index position in table
        let index = this._hash(key) // O(1)
    
        if (this.dataMap(index)) {

            // Here we are looping becuse at particular index we have two or more data
            for (let i = 0; i < this.dataMap[index].length; i++) { // O(1) || O(n)
                if (this.dataMap[index][i][0] === key) {
                    return this.dataMap[index][i][1]
                }
            }
            return undefined // O(1)
        }
    }

    keys(){
        let allKeys = []

        for (let i = 0; i < this.dataMap.length; i++) {
            if(this.dataMap[i]){
                for (let j = 0; j < this.dataMap[i].length; j++) {
                    allKeys.push(this.dataMap[i][j][0])
                }
            }
        }
        return allKeys
    }
}

let myHashtable = new HashTable()
myHashtable

```


```js

// Graphs are bifirectional,
// when adjacency matrix is formed in graps, it is symmetrical in shape
// we create the adjacency list in object form.
// adjacency list is much more easy to maintain and much efficient so we will use this

// Below is basic structure
{
    vertex: [edge1, edge2]
}


// Graph code is below

class Graph {
    constructor(){
        this.adjacencyList = {}
    }

    addVertex(vertex){
        if(!this.adjacencyList[vertex]){
            this.adjacencyList[vertex] = []
            return true
        }
        return false
    }

    addEdge(vertex1, vertex2){
        if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]){
            this.adjacencyList[vertex1].push(vertex2)
            this.adjacencyList[vertex2].push(vertex1)
            return true
        }
        return false
    }

    removeEdge(vertex1, vertex2){
        if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]){
            this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2)
            this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1)
            return true
        }
        return false
    }

    removeVertex(vertex){
        if(!this.adjacencyList[vertex]) return undefined

        while(this.adjacencyList[vertex].length){
            let temp = this.adjacencyList[vertex].pop()
            this.removeEdge(vertex, temp)
        }

        delete this.adjacencyList[vertex]
        return this
        
    }
}

let myGraph = new Graph()
myGraph


// Heaps
// Heap is like binary tree, but numbers are laid out in a different way
// Each node has a value that is greater than each of its descendants, max value is at top.
// heap can have duplicate node while binary tree do not.
// when we add any value in heap, we add left to right and then we bubble up the heap, means repositioning so that highest be at the top


class Heap {
    #heap = [];

    insert(value){
        // here we added value
        this.#heap.push(value)

        // below we are bubbling up

        let current = this.#heap.length - 1  // it is index

        while(current > 0 && this.#heap[current] > this.#heap[this.#parent(current)]){
            this.#swap(current, this.#parent(current))
            current = this.#parent(current)
        }
    }

    remove(){
        if(this.#heap.length === 0){
            return null
        }

        if(this.#heap.length === 1){
            return this.#heap.pop()
        }

        const maxValue = this.#heap[0]
        this.#heap[0] = this.#heap.pop()
        this.#sinkDown(0)

        return maxValue
    }

    // sinkdown is rearranging the value in downward direction
    #sinkDown(index) {
        let maxIndex = index;
        let size = this.#heap.length;
        
        while (true) {
            let leftIndex = this.#leftChild(index);
            let rightIndex = this.#rightChild(index);
            
            if (leftIndex < size && this.#heap[leftIndex] > this.#heap[maxIndex]) {
                maxIndex = leftIndex;
            }
            
            if (rightIndex < size && this.#heap[rightIndex] > this.#heap[maxIndex]) {
                maxIndex = rightIndex;
            }
            
            if (maxIndex !== index) {
                this.#swap(index, maxIndex);
                index = maxIndex;
            } else {
                return;
            }
        }
    
    }

    

    getHeap(){
        return [...this.#heap]
    }
    
    #leftChild(index){
        return 2 * index + 1
    }

    #rightChild(index){
        return 2 * index + 2
    }

    #parent(index){
        return Math.floor((index - 1) / 2)
    }

    #swap(index1, index2){
        [this.#heap[index1], this.#heap[index2]] = [this.#heap[index2], this.#heap[index1]]
    }
}


// Tree Traversal

// BFS - Breadth First Search - is a vertex-based technique for finding the shortest path in the graph. 
// It uses a `Queue data structure` that follows `first in first out`. 
// In BFS, Root ko lete h queue me then usko result me push kr dete h, then root k left and right ko lete h then usko Queue me push kar dete h, then first jo queue me add kia thota h usko results me push kr dete h, jisko push kia h uske left and right ko Queue me add kr dete h 
// It is slower than DFS.

BFS() {
    let currentNode = this.root;
    let queue = [];
    let results = [];

    queue.push(currentNode);

    while (queue.length) {
        currentNode = queue.shift();
        results.push(currentNode.value);

        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
    }

    return results;
}


// DFS - Depth First Search - is an an edge-based technique. 
// It uses the Stack data structure and performs two stages, first visited vertices are pushed into the stack, and second if there are no vertices then visited vertices are popped.

// DFS is of 3 types - Preorder Traversal, Inorder Traversal, Postorder Traversal


// Algorithm for Preorder Traversal:

// Visit the root.
// Traverse the left subtree, i.e., call Preorder(left->subtree)
// Traverse the right subtree, i.e., call Preorder(right->subtree)

DFSPreOrder() {
    let results = [];

    function traverse(currentNode) {
        results.push(currentNode.value);

        if (currentNode.left) traverse(currentNode.left);
        if (currentNode.right) traverse(currentNode.right);
    }

    traverse(this.root);
    return results;
}


// Algorithm for Postorder Traversal:

// Traverse the left subtree, i.e., call Postorder(left->subtree)
// Traverse the right subtree, i.e., call Postorder(right->subtree)
// Visit the root

DFSPostOrder() {
    let results = [];

    function traverse(currentNode) {
        if (currentNode.left) traverse(currentNode.left);
        if (currentNode.right) traverse(currentNode.right);

        results.push(currentNode.value);
    }

    traverse(this.root);
    return results;
}

// Algorithm for Inorder Traversal:

// Traverse the left subtree, i.e., call Inorder(left->subtree)
// Visit the root.
// Traverse the right subtree, i.e., call Inorder(right->subtree)

DFSInOrder() {
    let results = [];

    function traverse(currentNode) {
        if (currentNode.left) traverse(currentNode.left);
        
        results.push(currentNode.value);
        
        if (currentNode.right) traverse(currentNode.right);   
    }

    traverse(this.root);
    return results;
}


// Dynamic Programming or DP

// Dynamic Programming is a method used in mathematics and computer science to solve complex problems by breaking them down into simpler subproblems. 
// By solving each `subproblem only once and storing the results`, it `avoids redundant computations`, leading to more efficient solutions for a wide range of problems.

// How Does Dynamic Programming (DP) Work?
// - Identify Subproblems: Divide the main problem into smaller, independent subproblems.
// - Store Solutions: Solve each subproblem and store the solution in a table or array.
// - Build Up Solutions: Use the stored solutions to build up the solution to the main problem.
// - Avoid Redundancy: By storing solutions, DP ensures that each subproblem is solved only once, reducing computation time.

// When to Use Dynamic Programming (DP)?
// 1. Optimal Substructure: Optimal substructure means that we combine the optimal results of subproblems to achieve the optimal result of the bigger problem
// 2. Overlapping Subproblems: The same subproblems are solved repeatedly in different parts of the problem.


// example: 
// if we have taken example for fibnanchi series, then below code will be O(2^n).
// fib of 20 gives 6765 function calls

// https://www.geeksforgeeks.org/dynamic-programming/

let counter = 0
function fib(n){
    counter++

    if(n === 0 || n === 1){
        return n
    }
    return fib(n-1) + fib(n-2)
}
fib(20)


// now we optimzed through DP(using memoization), fib of 20 gives 39 function calls
let memo = [];
let counter = 0;

function fib(n) {
    counter++;
    if (memo[n] !== undefined) {
        return memo[n];
    }
    if (n === 0 || n === 1) {
        return n;
    }
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}

let n = 20;

console.log('\nFib of', n, '=', fib(n));
console.log('\nCounter:', counter);



// In above case we are filling the array from the right side to left side, but below code fills from left to right side, which is much more optimized
// fib of 20 gives 19 function calls
let counter = 0;

function fib(n) {
    let fibList = [];
    fibList[0] = 0;
    fibList[1] = 1;

    for (let index = 2; index <= n; index++) {
        counter++;
        fibList[index] = fibList[index - 1] + fibList[index - 2];
    }

    return fibList[n];
}

let n = 7;

console.log('\nFib of', n, '=', fib(n));

console.log('\nCounter:', counter);
```

```js
// Below are the basic sorts( bubble sort, selection sort, insertion sort)


// Bubble sort
// Bubble sort algorithm is an algorithm that sorts an array by comparing two adjacent elements and swapping them if they are not in the intended order. 
// Here order can be anything like increasing or decreasing.
// Bubble sort compares the element from index 0 and if the 0th index value is greater than 1st index value, then the values get swapped and if the 0th index value is less than the 1st index value, then nothing happens.

// Next, the 1st index value compares to the 2nd index value, and then the 2nd index value compares to the 3rd index value, and so on…


function bubbleSort(array) {
  const n = array.length;
  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Destructuring to swap
      }
    }
  }
  return array;
}


// Selection sort
// The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion of the list and swaps it with the first element of the unsorted part. This process is repeated for the remaining unsorted portion until the entire list is sorted.


function selectionSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) min = j;
    }
    if (i !== min) {
      [array[i], array[min]] = [array[min], array[i]]; // Destructuring to swap
    }
  }
  return array;
}
```

## Bit Manipulation ( [Youtube video](https://www.youtube.com/watch?v=PP2d0dG1rRY) )

Bit manipulation refers to the process of converting number into individual bits within a binary number. Since all data in computers is represented in binary (0s and 1s)

![screenshot](images/bitManupulation1.png)

> ### Represenation of number in binary form

We just add the bit from right side, try to make it equal to number. then add 1 under the bit which we used.

![screenshot](images/bitManupulation2.png)


### Common Bitwise Operations:
1. **AND (`&`)**: Both bits must be 1 to return 1. (1 + 1 gives 1, but 0+1 or 1+0 gives 0)
   
![screenshot](images/bitManupulation3.png)
   
2. **OR (`|`)**: At least one bit must be 1 to return 1.

![screenshot](images/bitManupulation4.png)

3. **XOR (`^`)**: Returns 1 only if the bits are different.\
   0 + 0 = 0\
   0 + 1 = 1\
   1 + 0 = 1\
   1 + 1 = 0

![screenshot](images/bitManupulation5.png)


4. **NOT (`~`)**: Inverts the bits.
  

5. **Left Shift (`<<`)**: Shifts bits to the left, filling with 0s.
   
![screenshot](images/bitManupulation6.png)


6. **Right Shift (`>>`)**: Shifts bits to the right.
   
![screenshot](images/bitManupulation7.png)


#### Bit Manipulation Techniques in JS:

1. **Check if a number is even or odd:**
   ```js
   const isEven = (n) => !(n & 1);
   ```

2. **Multiply or divide by powers of 2:**
   ```js
   const multiplyBy2 = (n) => n << 1;
   const divideBy2 = (n) => n >> 1;
   ```

3. **Set, clear, or toggle a bit:**
   ```js
   const setBit = (n, pos) => n | (1 << pos); // Set bit
   const clearBit = (n, pos) => n & ~(1 << pos); // Clear bit
   const toggleBit = (n, pos) => n ^ (1 << pos); // Toggle bit
   ```

4. **Check if a bit is set:**
   ```js
   const isBitSet = (n, pos) => (n & (1 << pos)) !== 0;
   ```

5. **Find the rightmost set bit:**
   ```js
   const rightmostSetBit = (n) => n & -n;
   ```

6. **Detect if two integers have opposite signs:**
   ```js
   const oppositeSign = (a, b) => (a ^ b) < 0;
   ```

7. **Invert all bits:**
   ```js
   const invertBits = (n) => ~n;
   ```

