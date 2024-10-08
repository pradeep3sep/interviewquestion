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
// entry and exist on same side, basically LIFO
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
```

> ### implement two stack in array  ( [Youtube video](https://www.youtube.com/watch?v=TiYif1O1NTc) )

To implement two stacks in a single array, the idea is to divide the array in such a way that both stacks can grow from opposite ends:

1. Stack 1 starts from the beginning of the array (index 0) and grows towards the right (increasing index).
2. Stack 2 starts from the end of the array (index n-1, where n is the array size) and grows towards the left (decreasing index).

We'll maintain two pointers:

- One pointer (top1) tracks the top of Stack 1.
- Another pointer (top2) tracks the top of Stack 2.

```js
class TwoStacks {
  constructor(size) {
    this.size = size;
    this.array = new Array(size);  // Array to hold both stacks
    this.top1 = -1;                // Pointer for Stack 1 (initially no elements)
    this.top2 = size;              // Pointer for Stack 2 (initially no elements)
  }

  // Push an element into Stack 1
  push1(value) {
    if (this.top1 < this.top2 - 1) {
      this.top1++;
      this.array[this.top1] = value;
      console.log(`${value} pushed to Stack 1`);
    } else {
      console.log('Stack 1 Overflow');
    }
  }

  // Push an element into Stack 2
  push2(value) {
    if (this.top1 < this.top2 - 1) {
      this.top2--;
      this.array[this.top2] = value;
      console.log(`${value} pushed to Stack 2`);
    } else {
      console.log('Stack 2 Overflow');
    }
  }

  // Pop an element from Stack 1
  pop1() {
    if (this.top1 >= 0) {
      const poppedValue = this.array[this.top1];
      this.top1--;
      console.log(`${poppedValue} popped from Stack 1`);
      return poppedValue;
    } else {
      console.log('Stack 1 Underflow');
      return null;
    }
  }

  // Pop an element from Stack 2
  pop2() {
    if (this.top2 < this.size) {
      const poppedValue = this.array[this.top2];
      this.top2++;
      console.log(`${poppedValue} popped from Stack 2`);
      return poppedValue;
    } else {
      console.log('Stack 2 Underflow');
      return null;
    }
  }

  // Print the current elements of Stack 1
  printStack1() {
    if (this.top1 === -1) {
      console.log('Stack 1 is empty');
    } else {
      console.log('Stack 1:', this.array.slice(0, this.top1 + 1).join(' -> '));
    }
  }

  // Print the current elements of Stack 2
  printStack2() {
    if (this.top2 === this.size) {
      console.log('Stack 2 is empty');
    } else {
      console.log('Stack 2:', this.array.slice(this.top2, this.size).join(' -> '));
    }
  }
}

// Example usage
const twoStacks = new TwoStacks(10);

// Push elements into Stack 1
twoStacks.push1(5);
twoStacks.push1(10);
twoStacks.push1(15);

// Push elements into Stack 2
twoStacks.push2(25);
twoStacks.push2(30);
twoStacks.push2(35);

// Print both stacks
twoStacks.printStack1();  // Output: Stack 1: 5 -> 10 -> 15
twoStacks.printStack2();  // Output: Stack 2: 35 -> 30 -> 25

// Pop elements from both stacks
twoStacks.pop1();  // Output: 15 popped from Stack 1
twoStacks.pop2();  // Output: 35 popped from Stack 2

// Print both stacks after popping
twoStacks.printStack1();  // Output: Stack 1: 5 -> 10
twoStacks.printStack2();  // Output: Stack 2: 30 -> 25

```

> ### Stock span problem ( [Youtube video](https://www.youtube.com/watch?v=vOqNBU7ipIk) )
The **Stock Span Problem** is a classic problem that can be solved using a stack. The task is to find the span of stock’s price for all days. The span of a stock’s price on a given day is defined as the maximum number of consecutive days just before the given day, where the price of the stock on those days is less than or equal to the price on the given day.

### Example:

For example, if the stock prices for 7 days are as follows:
```
Prices: [100, 80, 60, 70, 60, 75, 85]
```

The corresponding span values are:
```
Span:   [1, 1, 1, 2, 1, 4, 6]
```

### Explanation:
- On day 1 (price = 100), the span is 1 because there are no previous prices.
- On day 2 (price = 80), the span is 1 because 80 is smaller than 100.
- On day 3 (price = 60), the span is 1 because 60 is smaller than 80.
- On day 4 (price = 70), the span is 2 because 70 is greater than 60, and the span of 60 is 1 (so 2 days total).
- On day 5 (price = 60), the span is 1 because 60 is equal to itself but less than 70.
- On day 6 (price = 75), the span is 4 because 75 is greater than 60, 70, and 60.
- On day 7 (price = 85), the span is 6 because 85 is greater than all the previous prices.

### Approach using Stack:
The idea is to use a stack to store the indices of the days where the stock prices are strictly decreasing or equal, so that we can quickly calculate the span for the current day.

1. **Push the current day’s index** onto the stack if its price is higher than the previous day’s price (stored at the top of the stack).
2. **Pop indices** from the stack as long as the price at the current day is greater than or equal to the price at the index stored at the top of the stack.
3. The span is then the difference between the current day’s index and the index of the previous higher price (or the start of the array if no previous higher price exists).

### Code Implementation:

```javascript
function calculateSpan(prices) {
  let n = prices.length;
  let span = new Array(n).fill(0);  // Array to store spans
  let stack = [];                   // Stack to store indices of days
  
  // First day always has a span of 1
  stack.push(0);
  span[0] = 1;

  // Loop through the rest of the days
  for (let i = 1; i < n; i++) {
    // Pop elements from the stack while the stack is not empty and the current price is greater than or equal to the price at the top index of the stack
    while (stack.length > 0 && prices[stack[stack.length - 1]] <= prices[i]) {
      stack.pop();
    }

    // If the stack is empty, it means the current price is greater than all previous prices, so span = i + 1
    span[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];

    // Push the current index onto the stack
    stack.push(i);
  }

  return span;
}

// Example usage:
let prices = [100, 80, 60, 70, 60, 75, 85];
let result = calculateSpan(prices);
console.log(result);  // Output: [1, 1, 1, 2, 1, 4, 6]
```

### Explanation of the Code:
- We maintain an array `span[]` that stores the span for each day.
- We also maintain a stack that stores the indices of stock prices. The stack is used to find the most recent day where the stock price was higher than the current day’s price.
- For each day `i`, we pop elements from the stack as long as the stock price on previous days is less than or equal to the price on day `i`.
- The span for day `i` is calculated as the difference between the current day’s index `i` and the index of the top of the stack (which gives the previous day with a higher price). If no such day exists, the span is `i + 1`.

### Example Output:
```
[1, 1, 1, 2, 1, 4, 6]
```

### Time Complexity:
- **O(n)** where `n` is the number of days. Each element is pushed and popped from the stack at most once, so the overall time complexity is linear.

### Space Complexity:
- **O(n)** to store the spans and indices in the stack.

This solution efficiently calculates the span for each day in a single pass through the prices array using a stack.





> ### previous greater element  ( [Youtube video](https://www.youtube.com/watch?v=fnJGJxvL9nU) )

The **Previous Greater Element** problem is a common algorithmic question where, for each element in an array, you are required to find the **previous greater element** (PGE) that is closest to the left side of the current element. If there is no such element, return `-1` for that element.

### Problem Definition:
For an array `arr[]` of size `n`, the task is to find an array `pge[]` where:
- `pge[i]` contains the **previous greater element** of `arr[i]` (i.e., the closest element to the left of `arr[i]` that is greater than `arr[i]`).
- If no such element exists, `pge[i]` should be `-1`.

### Example:

For an array:
```
arr = [10, 4, 2, 20, 40, 12, 30]
```

The output array (previous greater elements) will be:
```
pge = [-1, 10, 4, -1, -1, 40, 40]
```

### Explanation:
- For `arr[0] = 10`, there is no previous element, so `pge[0] = -1`.
- For `arr[1] = 4`, the previous greater element is `10`, so `pge[1] = 10`.
- For `arr[2] = 2`, the previous greater element is `4`, so `pge[2] = 4`.
- For `arr[3] = 20`, there is no greater element before it, so `pge[3] = -1`.
- For `arr[4] = 40`, there is no greater element before it, so `pge[4] = -1`.
- For `arr[5] = 12`, the previous greater element is `40`, so `pge[5] = 40`.
- For `arr[6] = 30`, the previous greater element is `40`, so `pge[6] = 40`.

### Approach using Stack:

We can solve this problem efficiently using a **stack**. The stack helps us keep track of potential "previous greater elements" as we traverse the array from left to right.

1. We traverse the array from left to right.
2. For each element, we pop elements from the stack until we find a greater element or the stack is empty.
3. The top element of the stack, if it exists, is the previous greater element for the current element.
4. If the stack is empty, it means there is no previous greater element, so we assign `-1`.
5. Push the current element onto the stack for future comparisons.

### Code Implementation:

```javascript
function previousGreaterElement(arr) {
  let n = arr.length;
  let pge = new Array(n);  // Array to store previous greater elements
  let stack = [];          // Stack to store potential previous greater elements
  
  // Traverse the array from left to right
  for (let i = 0; i < n; i++) {
    // Pop elements from the stack while the top of the stack is less than or equal to the current element
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }

    // If stack is empty, no previous greater element exists, otherwise the top is the PGE
    pge[i] = stack.length === 0 ? -1 : stack[stack.length - 1];

    // Push the current element onto the stack
    stack.push(arr[i]);
  }

  return pge;
}

// Example usage:
let arr = [10, 4, 2, 20, 40, 12, 30];
let result = previousGreaterElement(arr);
console.log(result);  // Output: [-1, 10, 4, -1, -1, 40, 40]
```

### Explanation of the Code:

- **Stack**: The stack is used to keep track of the previous elements that are candidates to be the "previous greater element" for the current element.
- **For loop**: We loop through the array once from left to right.
- **While loop**: We pop elements from the stack as long as they are smaller than or equal to the current element (`arr[i]`), because they can't be the previous greater element.
- **Pushing onto stack**: After processing each element, we push the current element onto the stack to check for future elements.
- If the stack is empty after popping, it means there's no previous greater element, so we assign `-1`.

### Example Walkthrough:

For `arr = [10, 4, 2, 20, 40, 12, 30]`:

- **i = 0, arr[0] = 10**: Stack is empty. `pge[0] = -1`, push `10` onto the stack. Stack: `[10]`
- **i = 1, arr[1] = 4**: Top of stack (`10`) is greater than `4`. `pge[1] = 10`, push `4` onto the stack. Stack: `[10, 4]`
- **i = 2, arr[2] = 2**: Top of stack (`4`) is greater than `2`. `pge[2] = 4`, push `2` onto the stack. Stack: `[10, 4, 2]`
- **i = 3, arr[3] = 20**: Top of stack (`2`) is less than `20`, pop it. Stack: `[10, 4]`. Top (`4`) is less than `20`, pop it. Stack: `[10]`. Top (`10`) is less than `20`, pop it. Stack is empty, so `pge[3] = -1`. Push `20` onto the stack. Stack: `[20]`
- **i = 4, arr[4] = 40**: Top of stack (`20`) is less than `40`, pop it. Stack is empty, so `pge[4] = -1`. Push `40` onto the stack. Stack: `[40]`
- **i = 5, arr[5] = 12**: Top of stack (`40`) is greater than `12`. `pge[5] = 40`, push `12` onto the stack. Stack: `[40, 12]`
- **i = 6, arr[6] = 30**: Top of stack (`12`) is less than `30`, pop it. Stack: `[40]`. Top of stack (`40`) is greater than `30`. `pge[6] = 40`, push `30` onto the stack. Stack: `[40, 30]`

Final `pge` array:
```
[-1, 10, 4, -1, -1, 40, 40]
```

### Time Complexity:

- **O(n)**: Each element is pushed and popped from the stack at most once, so the time complexity is linear, i.e., O(n).

### Space Complexity:

- **O(n)**: We use a stack to store elements, which in the worst case can hold all elements (if the array is strictly decreasing).

### Summary:
- **Time Complexity**: O(n)
- **Space Complexity**: O(n) for the stack and the result array.

This approach ensures that we find the **previous greater element** efficiently using a stack in linear time.


> ### next greater element
The **Next Greater Element** (NGE) problem is similar to the **Previous Greater Element** problem but in this case, we are tasked with finding the first element that is greater than the current element on the **right side** of the array.

### Problem Definition:
Given an array `arr[]` of size `n`, for each element in the array, find the **next greater element** (NGE) on its right side. If no such element exists, return `-1` for that element.

### Example:

For an array:
```
arr = [4, 5, 2, 25, 7, 8, 6, 3]
```

The output array (next greater elements) will be:
```
nge = [5, 25, 25, -1, 8, -1, -1, -1]
```

### Explanation:
- For `arr[0] = 4`, the next greater element is `5`.
- For `arr[1] = 5`, the next greater element is `25`.
- For `arr[2] = 2`, the next greater element is `25`.
- For `arr[3] = 25`, there is no greater element to its right, so `nge[3] = -1`.
- For `arr[4] = 7`, the next greater element is `8`.
- For `arr[5] = 8`, there is no greater element to its right, so `nge[5] = -1`.
- For `arr[6] = 6`, there is no greater element to its right, so `nge[6] = -1`.
- For `arr[7] = 3`, there is no greater element to its right, so `nge[7] = -1`.

### Approach using Stack:

We can solve this problem efficiently using a **stack**. The key idea is to traverse the array from **right to left**, so that we can efficiently find the next greater element for each item using the stack.

1. We traverse the array from **right to left**.
2. For each element, we pop elements from the stack until we find an element that is greater than the current element (this element will be the NGE).
3. If the stack is empty after popping, it means there is no greater element to the right, so we assign `-1`.
4. Push the current element onto the stack so that it can serve as a potential NGE for future elements.

### Code Implementation:

```javascript
function nextGreaterElement(arr) {
  let n = arr.length;
  let nge = new Array(n);  // Array to store next greater elements
  let stack = [];          // Stack to store potential next greater elements

  // Traverse the array from right to left
  for (let i = n - 1; i >= 0; i--) {
    // Pop elements from the stack while the top of the stack is less than or equal to the current element
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }

    // If stack is empty, no next greater element exists, otherwise the top is the NGE
    nge[i] = stack.length === 0 ? -1 : stack[stack.length - 1];

    // Push the current element onto the stack
    stack.push(arr[i]);
  }

  return nge;
}

// Example usage:
let arr = [4, 5, 2, 25, 7, 8, 6, 3];
let result = nextGreaterElement(arr);
console.log(result);  // Output: [5, 25, 25, -1, 8, -1, -1, -1]
```

### Explanation of the Code:

- **Stack**: The stack is used to keep track of the potential **next greater elements** as we traverse the array from right to left.
- **For loop**: We start the loop from the last element (`n-1`) and go down to the first element (`i = 0`).
- **While loop**: We pop elements from the stack as long as they are smaller than or equal to the current element (`arr[i]`), because they can't be the next greater element.
- **Pushing onto the stack**: After processing each element, we push it onto the stack so that it can be used for future comparisons.

### Example Walkthrough:

For `arr = [4, 5, 2, 25, 7, 8, 6, 3]`:

- **i = 7, arr[7] = 3**: Stack is empty, so `nge[7] = -1`. Push `3` onto the stack. Stack: `[3]`
- **i = 6, arr[6] = 6**: Top of stack (`3`) is less than `6`, pop it. Stack is empty, so `nge[6] = -1`. Push `6` onto the stack. Stack: `[6]`
- **i = 5, arr[5] = 8**: Top of stack (`6`) is less than `8`, pop it. Stack is empty, so `nge[5] = -1`. Push `8` onto the stack. Stack: `[8]`
- **i = 4, arr[4] = 7**: Top of stack (`8`) is greater than `7`. `nge[4] = 8`. Push `7` onto the stack. Stack: `[8, 7]`
- **i = 3, arr[3] = 25**: Top of stack (`7`) is less than `25`, pop it. Stack: `[8]`. Top of stack (`8`) is less than `25`, pop it. Stack is empty, so `nge[3] = -1`. Push `25` onto the stack. Stack: `[25]`
- **i = 2, arr[2] = 2**: Top of stack (`25`) is greater than `2`. `nge[2] = 25`. Push `2` onto the stack. Stack: `[25, 2]`
- **i = 1, arr[1] = 5**: Top of stack (`2`) is less than `5`, pop it. Stack: `[25]`. Top of stack (`25`) is greater than `5`. `nge[1] = 25`. Push `5` onto the stack. Stack: `[25, 5]`
- **i = 0, arr[0] = 4**: Top of stack (`5`) is greater than `4`. `nge[0] = 5`. Push `4` onto the stack. Stack: `[25, 5, 4]`

Final `nge` array:
```
[5, 25, 25, -1, 8, -1, -1, -1]
```

### Time Complexity:

- **O(n)**: Each element is pushed and popped from the stack at most once, so the time complexity is linear, i.e., O(n).

### Space Complexity:

- **O(n)**: We use a stack to store elements, which in the worst case can hold all elements (if the array is strictly decreasing).

### Summary:
- **Time Complexity**: O(n)
- **Space Complexity**: O(n) for the stack and the result array.

This approach efficiently finds the **next greater element** for each element in the array using a stack in linear time.



> ### largest rectangular area in histogram ( [Youtube video](https://www.youtube.com/watch?v=vhUxKxiconE&ab_channel=AnujBhaiya) )

The **Largest Rectangular Area in a Histogram** problem is a well-known algorithmic challenge where we are given an array representing the heights of bars in a histogram. The goal is to find the area of the largest rectangle that can be formed using one or more contiguous bars.

### Problem Definition:
Given an array `heights[]` of size `n`, where each element represents the height of a bar in a histogram (all bars have a width of 1), find the area of the largest rectangle that can be formed.

### Example:

For the histogram:
```
heights = [2, 1, 5, 6, 2, 3]
```

The output should be:
```
10
```

### Explanation:
The largest rectangle can be formed between bars with heights `[5, 6]` with an area of `5 * 2 = 10`.

### Approach using Stack:

To solve this problem efficiently, we can use a **stack** to keep track of the indices of the histogram bars. The idea is to find the **next smaller** and **previous smaller** bars for each bar, and use these to compute the largest rectangle possible with each bar as the shortest bar in that rectangle.

The approach works as follows:

1. We traverse the array of heights, maintaining a stack of indices. The stack helps us keep track of bars in non-decreasing order of their heights.
2. When we encounter a bar that is shorter than the bar at the index stored on top of the stack, it means we can calculate the area for the bar at the top of the stack using the current bar as a boundary.
3. The width of the rectangle is determined by the indices of the current bar and the bar just below the top of the stack.
4. We repeat this process until we've processed all bars, and then process any remaining bars in the stack.

### Code Implementation:

```javascript
function largestRectangleArea(heights) {
    let stack = []; // Stack to store the indices of the bars
    let maxArea = 0; // Variable to keep track of the maximum area
    let n = heights.length;

    // Traverse through all bars of the histogram
    for (let i = 0; i <= n; i++) {
        // We append a 0 height bar at the end to force the stack to empty at the end
        let currentHeight = i < n ? heights[i] : 0;

        // While stack is not empty and the current bar is shorter than the bar at the top of the stack
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            let h = heights[stack.pop()]; // Pop the top bar from the stack
            let w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1; // Calculate the width of the rectangle
            maxArea = Math.max(maxArea, h * w); // Update the maximum area
        }

        // Push the current bar index onto the stack
        stack.push(i);
    }

    return maxArea;
}

// Example usage:
let heights = [2, 1, 5, 6, 2, 3];
let result = largestRectangleArea(heights);
console.log(result);  // Output: 10
```

### Explanation of the Code:

- **Stack**: We maintain a stack of indices representing the bars in increasing order of height.
- **Current Height**: In each iteration, we check if the current bar is shorter than the bar at the top of the stack.
- **Pop and Calculate**: When we encounter a shorter bar, we pop the top of the stack (which gives us the height of the largest rectangle with that bar as the shortest). The width of this rectangle is determined by the distance between the current index and the index of the bar just below the popped bar in the stack.
- **Width Calculation**: If the stack is empty after popping, it means the current bar is the smallest so far, and the width is the full range from the start to the current index. If the stack is not empty, the width is the difference between the current index and the index of the bar on top of the stack after popping.
- **Pushing Indices**: After calculating the area for the popped bar, we push the current bar's index onto the stack for future processing.
- **Extra Step**: We add a "0-height" bar at the end of the array to ensure that all remaining bars in the stack are processed by the end.

### Example Walkthrough:

For `heights = [2, 1, 5, 6, 2, 3]`:

1. **i = 0, height = 2**: Stack is empty, so push index `0`. Stack: `[0]`
2. **i = 1, height = 1**: Current height is less than `heights[0]`. Pop index `0`, calculate area `2 * 1 = 2`. Push index `1`. Stack: `[1]`
3. **i = 2, height = 5**: Push index `2`. Stack: `[1, 2]`
4. **i = 3, height = 6**: Push index `3`. Stack: `[1, 2, 3]`
5. **i = 4, height = 2**: Current height is less than `heights[3]`. Pop index `3`, calculate area `6 * 1 = 6`. Pop index `2`, calculate area `5 * 2 = 10`. Push index `4`. Stack: `[1, 4]`
6. **i = 5, height = 3**: Push index `5`. Stack: `[1, 4, 5]`
7. **i = 6, height = 0**: Current height is less than `heights[5]`. Pop index `5`, calculate area `3 * 1 = 3`. Pop index `4`, calculate area `2 * 4 = 8`. Pop index `1`, calculate area `1 * 6 = 6`. Push index `6`. Stack: `[6]`

The maximum area found is `10`.

### Time Complexity:

- **O(n)**: We traverse the array once, and each element is pushed and popped from the stack exactly once.
  
### Space Complexity:

- **O(n)**: We use a stack to store the indices of the bars.

### Summary:
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

This approach efficiently calculates the largest rectangular area in a histogram using a stack in linear time.



> ### largest reactangle with all 1s ( [Youtube video](https://www.youtube.com/watch?v=oaN9ibZKMpA&ab_channel=AnujBhaiya) )

The **Largest Rectangle with All 1s** problem is an extension of the largest rectangle in a histogram problem. In this version, we are given a binary matrix (a 2D grid where each cell contains either `0` or `1`), and we need to find the area of the largest rectangle that contains only `1`s.

### Problem Definition:
Given a binary matrix `mat[][]` of size `m x n` containing only `0`s and `1`s, find the area of the largest rectangle containing only `1`s.

### Approach:
We can solve this problem by reducing it to the **Largest Rectangular Area in a Histogram** problem. Here’s the step-by-step approach:

1. **Transform the Matrix into Histograms**:
   - Each row of the matrix can be seen as a base of a histogram.
   - We treat each row as the bottom of a histogram where the height of each bar in the histogram is the number of consecutive `1`s encountered up to that row in the column.
   - For example, for a given column `j`, if `mat[i][j] == 1`, the height of the histogram bar at column `j` is incremented by 1 from the previous row. If `mat[i][j] == 0`, the height becomes `0`.

2. **Apply the Histogram Area Algorithm**:
   - For each row, we can calculate the largest rectangle area using the histogram heights for that row, as we did in the **Largest Rectangular Area in Histogram** problem.
   
3. **Update the Maximum Area**:
   - We compute the largest rectangle for each row, and keep track of the maximum area encountered.

### Code Implementation:

```javascript
function maximalRectangle(matrix) {
    if (matrix.length === 0) return 0;  // Edge case: empty matrix

    let maxArea = 0;
    let n = matrix[0].length;
    let heights = new Array(n).fill(0);  // Histogram heights initialized to 0

    // Traverse each row of the matrix
    for (let i = 0; i < matrix.length; i++) {
        // Update the histogram heights
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == '1') {
                heights[j] += 1;  // Increase the height if we encounter a '1'
            } else {
                heights[j] = 0;   // Reset the height if we encounter a '0'
            }
        }

        // Compute the largest rectangle for this row's histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}

// Function to find largest rectangle area in a histogram
function largestRectangleArea(heights) {
    let stack = []; // Stack to store indices of histogram bars
    let maxArea = 0;
    let n = heights.length;

    for (let i = 0; i <= n; i++) {
        let currentHeight = i < n ? heights[i] : 0; // Add a sentinel value of 0 at the end

        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            let h = heights[stack.pop()]; // Pop the top bar
            let w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1; // Calculate width
            maxArea = Math.max(maxArea, h * w); // Update max area
        }

        stack.push(i); // Push current index onto the stack
    }

    return maxArea;
}

// Example usage:
let matrix = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0']
];

console.log(maximalRectangle(matrix));  // Output: 6
```

### Explanation of the Code:

1. **Maximal Rectangle Calculation**:
   - We traverse each row of the matrix, treating the row as the base of a histogram.
   - The histogram heights array `heights[]` is updated for each row:
     - If `matrix[i][j] == 1`, the height of the histogram bar at column `j` is incremented.
     - If `matrix[i][j] == 0`, the height is reset to `0`.
   - After updating the histogram heights for the current row, we apply the **largest rectangle in histogram** algorithm to calculate the maximum rectangle area for that row's histogram.

2. **Largest Rectangle in Histogram**:
   - This function uses a stack to compute the largest rectangle area in a histogram, just as explained in the previous problem.
   - We traverse the heights array and for each height, we calculate the area by treating the popped bar as the shortest bar of a rectangle. The width of the rectangle is calculated based on the current index and the index of the bar just below the popped bar in the stack.

3. **Time Complexity**:
   - We traverse the matrix once (`O(m * n)`), and for each row, we compute the largest rectangle area in a histogram using a stack (`O(n)`). Therefore, the overall time complexity is **O(m * n)**, where `m` is the number of rows and `n` is the number of columns.

### Example Walkthrough:

For `matrix = [ [1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0] ]`:

1. After processing the first row `[1, 0, 1, 0, 0]`, the histogram is `[1, 0, 1, 0, 0]`. The largest rectangle area for this row is `1`.
2. After processing the second row `[1, 0, 1, 1, 1]`, the histogram becomes `[2, 0, 2, 1, 1]`. The largest rectangle area for this row is `3`.
3. After processing the third row `[1, 1, 1, 1, 1]`, the histogram becomes `[3, 1, 3, 2, 2]`. The largest rectangle area for this row is `6`.
4. After processing the fourth row `[1, 0, 0, 1, 0]`, the histogram becomes `[4, 0, 0, 3, 0]`. The largest rectangle area for this row is `4`.

The maximum area found is `6`, which is the largest rectangle of `1`s in the matrix.

### Summary:
- **Time Complexity**: O(m * n), where `m` is the number of rows and `n` is the number of columns.
- **Space Complexity**: O(n), for the histogram heights array and stack.

This approach efficiently finds the largest rectangle with all 1s in a binary matrix using a stack-based histogram approach.



> ### getmin() in o1) time and o1) extra space in stack ( [Youtube video](https://www.youtube.com/watch?v=gd9xEAnxXzc&ab_channel=Techdose) )

To implement a **stack with `getMin()` operation in O(1) time** and **O(1) extra space**, we can store the minimum value cleverly by modifying the elements pushed onto the stack itself. Instead of using an extra stack, we store the minimum value within the main stack while maintaining the original value using some calculations.

### Approach:

The key idea is to keep track of the minimum element in the stack at all times, but instead of using extra space, we will adjust the values pushed onto the stack.

1. **Push Operation**:
   - When pushing a new value onto the stack, compare it with the current minimum.
   - If the new value is smaller than the current minimum, we push a special value onto the stack that encodes both the new value and the previous minimum. This helps us retrieve the minimum in constant space and time.

2. **Pop Operation**:
   - While popping, if we pop the special encoded value (which indicates the minimum has changed), we update the minimum to its previous value.

3. **Encoding Values**:
   - We will use a simple arithmetic trick to store both the current element and the minimum in the stack. By comparing the new element with the current minimum and storing a modified value when necessary, we can reconstruct the original element and the minimum.

### Code Implementation:

```javascript
class MinStack {
    constructor() {
        this.stack = [];  // Main stack
        this.min = null;  // Current minimum
    }

    // Pushes an element onto the stack
    push(x) {
        if (this.stack.length === 0) {
            // Stack is empty, so the pushed element is the new minimum
            this.stack.push(x);
            this.min = x;
        } else {
            if (x < this.min) {
                // Store a special value instead of x, and update the minimum
                this.stack.push(2 * x - this.min);
                this.min = x;  // Update the new minimum
            } else {
                // Otherwise, push the element as it is
                this.stack.push(x);
            }
        }
    }

    // Removes the top element from the stack
    pop() {
        if (this.stack.length === 0) return null;  // Stack is empty

        let top = this.stack.pop();
        
        // If the popped value is less than the current minimum, it means it's a special encoded value
        if (top < this.min) {
            // The current minimum was changed, restore the previous minimum
            this.min = 2 * this.min - top;
        }
    }

    // Returns the top element of the stack
    top() {
        if (this.stack.length === 0) return null;  // Stack is empty

        let top = this.stack[this.stack.length - 1];

        // If the top is less than the current minimum, it means it's a special encoded value
        return top < this.min ? this.min : top;
    }

    // Returns the minimum element in the stack in O(1) time
    getMin() {
        return this.min;  // Minimum is stored in the min variable
    }
}

// Example usage:
let minStack = new MinStack();
minStack.push(5);
minStack.push(3);
minStack.push(7);
minStack.push(2);
console.log(minStack.getMin()); // Output: 2
minStack.pop();
console.log(minStack.getMin()); // Output: 3
minStack.pop();
console.log(minStack.top());    // Output: 3
console.log(minStack.getMin()); // Output: 3
```

### Explanation:

1. **push(x)**:
   - If the stack is empty, `x` becomes the new minimum and is pushed onto the stack.
   - If `x` is less than the current minimum, we store `2 * x - min` onto the stack, which encodes both the current element and the previous minimum. The `min` variable is then updated to the new minimum.

2. **pop()**:
   - When popping, if the popped value is less than the current minimum, this means that the value popped is the special encoded value, and we restore the previous minimum using the formula `min = 2 * min - top`.

3. **top()**:
   - If the top of the stack is less than the current minimum, it indicates that the actual value is the minimum, as we stored an encoded value. Otherwise, return the top element.

4. **getMin()**:
   - The minimum is directly stored in the `min` variable, which is updated on each push and pop operation.

### Why is this O(1) Space?

- We do not use any extra stack or array to store the minimum values.
- We store modified values directly in the stack when necessary.
- The `min` variable holds the current minimum, and we use arithmetic to recover previous minimums without needing additional space.

### Time and Space Complexity:

- **Time Complexity**:
  - All operations (`push`, `pop`, `top`, and `getMin`) take constant time **O(1)**.
  
- **Space Complexity**:
  - The space complexity is **O(n)**, where `n` is the number of elements in the stack, as we only store one value per element (no extra space for the minimum).

This approach ensures that both `getMin()` and other stack operations run in constant time with constant space overhead.

<br>

> ### infix, prefix, postfix in stack ( [Youtube video](https://www.youtube.com/watch?v=_PU5t-gk_B4&ab_channel=AnujBhaiya) )

![screenshot](images/infix.png)

In computer science, expressions can be written in three main notations: **Infix**, **Prefix**, and **Postfix**. These notations differ in the placement of operators relative to their operands. Using stacks, we can efficiently evaluate or convert between these notations.

### 1. **Infix Notation**:
   - The operator is placed **between** operands.
   - Example: `A + B`
   - This is the standard form of writing expressions and is commonly used in mathematics. However, it requires parentheses and precedence rules to dictate the order of operations (e.g., BODMAS/PEMDAS).

### 2. **Prefix Notation (Polish Notation)**:
   - The operator is placed **before** the operands.
   - Example: `+ A B`
   - This notation does not require parentheses, as the order of operations is clear from the placement of the operator.

### 3. **Postfix Notation (Reverse Polish Notation)**:
   - The operator is placed **after** the operands.
   - Example: `A B +`
   - This notation also eliminates the need for parentheses and follows a straightforward evaluation process using a stack.

### Stack Operations and Their Use:

#### 1. **Infix to Postfix Conversion Using a Stack**:   ( [Youtube video](https://www.youtube.com/watch?v=m7SGekhd1mQ&ab_channel=AnujBhaiya) )

Steps:
1. Initialize an empty stack for operators and an empty string for the output.
2. Scan the infix expression from left to right.
3. If the token is an operand (a `variable or number`), add it to the output.
4. If the token is an operator:
   - Pop from the stack to the output until you find an operator with less precedence or an open parenthesis.
   - Push the current operator onto the stack.
5. If the token is `(` (left parenthesis), push it onto the stack.
6. If the token is `)` (right parenthesis), pop from the stack to the output until you encounter `(`, then discard the parentheses.
7. After the entire expression has been scanned, pop all operators from the stack to the output.

**Operator Precedence** (from high to low):
- `^` (exponentiation)
- `*` `/` (multiplication and division)
- `+` `-` (addition and subtraction)

#### Example Code: Infix to Postfix Conversion

```javascript
function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    if (op === '^') return 3;
    return 0;
}

function infixToPostfix(exp) {
    let stack = [];
    let output = "";
    for (let i = 0; i < exp.length; i++) {
        let char = exp[i];

        // If the character is an operand, add it to the output
        if (/[a-zA-Z0-9]/.test(char)) {
            output += char;
        }
        // If the character is '(', push it to the stack
        else if (char === '(') {
            stack.push(char);
        }
        // If the character is ')', pop and output from the stack until '(' is found
        else if (char === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output += stack.pop();
            }
            stack.pop(); // Remove '(' from the stack
        }
        // If the character is an operator
        else {
            while (stack.length > 0 && precedence(stack[stack.length - 1]) >= precedence(char)) {
                output += stack.pop();
            }
            stack.push(char);
        }
    }

    // Pop all the remaining operators from the stack
    while (stack.length > 0) {
        output += stack.pop();
    }

    return output;
}

// Example usage:
let infixExp = "A+(B*C-(D/E^F)*G)*H";
console.log(infixToPostfix(infixExp)); // Output: "ABC*DEF^/G*-H*+"
```

#### 2. **Postfix Evaluation Using a Stack**:   ( [Youtube video](https://www.youtube.com/watch?v=5B6jw4wOJR0&ab_channel=ApnaCollege) )

Steps:
1. Initialize an empty stack.
2. Scan the postfix expression from left to right.
3. If the token is an operand, push it onto the stack.
4. If the token is an operator, pop the top two elements from the stack, apply the operator, and push the result back onto the stack.
5. After the entire expression has been scanned, the final result will be the only element left in the stack.

#### Example Code: Postfix Evaluation

```javascript
function evaluatePostfix(exp) {
    let stack = [];
    for (let i = 0; i < exp.length; i++) {
        let char = exp[i];

        // If the character is an operand, push it to the stack
        if (!isNaN(parseInt(char))) {
            stack.push(parseInt(char));
        }
        // If the character is an operator
        else {
            let val2 = stack.pop();
            let val1 = stack.pop();
            switch (char) {
                case '+':
                    stack.push(val1 + val2);
                    break;
                case '-':
                    stack.push(val1 - val2);
                    break;
                case '*':
                    stack.push(val1 * val2);
                    break;
                case '/':
                    stack.push(val1 / val2);
                    break;
            }
        }
    }
    return stack.pop();
}

// Example usage:
let postfixExp = "231*+9-";
console.log(evaluatePostfix(postfixExp)); // Output: -4
```

#### 3. **Infix to Prefix Conversion Using a Stack**:   

Steps:
1. Reverse the infix expression.
2. Replace `(` with `)` and `)` with `(`.
3. Convert the modified expression to postfix using the same process as in the **Infix to Postfix** conversion.
4. Reverse the postfix expression to get the prefix expression.

#### Example Code: Infix to Prefix Conversion

```javascript
function reverseString(str) {
    return str.split('').reverse().join('');
}

function replaceBrackets(exp) {
    let result = '';
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '(') result += ')';
        else if (exp[i] === ')') result += '(';
        else result += exp[i];
    }
    return result;
}

function infixToPrefix(exp) {
    // Reverse the infix expression and replace brackets
    let reversedExp = reverseString(exp);
    let modifiedExp = replaceBrackets(reversedExp);

    // Convert modified expression to postfix
    let postfixExp = infixToPostfix(modifiedExp);

    // Reverse the postfix expression to get prefix
    return reverseString(postfixExp);
}

// Example usage:
let infixExp2 = "A+(B*C-(D/E^F)*G)*H";
console.log(infixToPrefix(infixExp2)); // Output: "+A*+*BC-*^/DEFGH"
```

#### 4. **Prefix Evaluation Using a Stack**:

Steps:
1. Initialize an empty stack.
2. Scan the prefix expression from **right to left**.
3. If the token is an operand, push it onto the stack.
4. If the token is an operator, pop the top two elements from the stack, apply the operator, and push the result back onto the stack.
5. After the entire expression has been scanned, the final result will be the only element left in the stack.

#### Example Code: Prefix Evaluation

```javascript
function evaluatePrefix(exp) {
    let stack = [];
    for (let i = exp.length - 1; i >= 0; i--) {
        let char = exp[i];

        // If the character is an operand, push it to the stack
        if (!isNaN(parseInt(char))) {
            stack.push(parseInt(char));
        }
        // If the character is an operator
        else {
            let val1 = stack.pop();
            let val2 = stack.pop();
            switch (char) {
                case '+':
                    stack.push(val1 + val2);
                    break;
                case '-':
                    stack.push(val1 - val2);
                    break;
                case '*':
                    stack.push(val1 * val2);
                    break;
                case '/':
                    stack.push(val1 / val2);
                    break;
            }
        }
    }
    return stack.pop();
}

// Example usage:
let prefixExp = "-+2*31/9";
console.log(evaluatePrefix(prefixExp)); // Output: -4
```

### Summary:
- **Infix** is the standard human-readable form of an expression but requires parentheses and precedence rules.
- **Prefix** (operators first) and **Postfix** (operators last) can be more easily evaluated by a computer using stacks, without needing precedence rules or parentheses.
- Conversion between these notations can be done efficiently using stacks, and both **evaluation** and **conversion** have simple stack-based algorithms.


> ## Queue

Always choose the head as front and tail as rear, becuase if you reverse time complexity changes


```js
// Queue is like linked list with FIFO.
// entry and exit are on opposite side
// Define a Node for the linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedListQueue {
    constructor() {
        this.front = null;  // Points to the front of the queue
        this.rear = null;   // Points to the rear of the queue
        this.size = 0;      // Stores the size of the queue
    }

    // Add an element to the rear of the queue
    enqueue(value) {
        let newNode = new Node(value);
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.size++;
    }

    // Remove and return the front element from the queue
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        let removedValue = this.front.value;
        this.front = this.front.next;

        // If the queue becomes empty after the dequeue operation
        if (!this.front) {
            this.rear = null;
        }

        this.size--;
        return removedValue;
    }

    // Get the front element without removing it
    frontElement() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.front.value;
    }

    // Check if the queue is empty
    isEmpty() {
        return this.size === 0;
    }

    // Get the size of the queue
    getSize() {
        return this.size;
    }

    // Print the elements in the queue
    printQueue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }

        let result = [];
        let currentNode = this.front;
        while (currentNode !== null) {
            result.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return result.join(" ");
    }
}

// Example usage:
let linkedQueue = new LinkedListQueue();
linkedQueue.enqueue(10);
linkedQueue.enqueue(20);
linkedQueue.enqueue(30);
console.log(linkedQueue.printQueue());  // Output: 10 20 30
console.log(linkedQueue.dequeue());     // Output: 10
console.log(linkedQueue.frontElement()); // Output: 20
console.log(linkedQueue.isEmpty());     // Output: false
```

Time complexity table for operations on a **Linked List-based Queue**:

| **Operation** | **Time Complexity** |
|---------------|---------------------|
| **Enqueue**   | O(1)                |
| **Dequeue**   | O(1)                |
| **Front**     | O(1)                |
| **isEmpty**   | O(1)                |
| **Size**      | O(1)                |
| **PrintQueue**| O(n)                |

> ### Implement Stack using Queues ( [Youtube video](https://www.youtube.com/watch?v=SgQ0VV3eM7Q&ab_channel=Yogesh%26Shailesh%28CodeLibrary%29) )

To implement a **stack** using **queues**, we can take advantage of two queues and simulate the Last In, First Out (LIFO) behavior of a stack. There are two common approaches to achieve this:

1. **Making push operation costly**: We keep elements in such a way that the latest pushed element is always at the front of the queue.
2. **Making pop operation costly**: We rearrange elements during the pop operation to mimic stack behavior.

Here, I'll explain and provide code for both approaches.

### 1. **Making Push Operation Costly**
In this approach, the `push` operation will rearrange elements to ensure that the newest element is at the front of the queue. The `pop` operation remains efficient as it simply dequeues from the front.

#### Steps:
- For `push(x)`: 
  1. Move all elements from `queue1` to `queue2`.
  2. Add the new element `x` to `queue1`.
  3. Move all elements back from `queue2` to `queue1`.
- For `pop()`: Simply dequeue from `queue1`.
- For `top()`: Peek the front element of `queue1`.

#### Code Implementation:

```javascript
class StackUsingQueues {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }

    // Push element onto stack
    push(x) {
        // Move all elements from queue1 to queue2
        while (this.queue1.length > 0) {
            this.queue2.push(this.queue1.shift());
        }

        // Add the new element to queue1
        this.queue1.push(x);

        // Move all elements back to queue1 from queue2
        while (this.queue2.length > 0) {
            this.queue1.push(this.queue2.shift());
        }
    }

    // Remove and return the top element from stack
    pop() {
        if (this.queue1.length === 0) {
            return "Stack is empty";
        }
        return this.queue1.shift();
    }

    // Get the top element
    top() {
        if (this.queue1.length === 0) {
            return "Stack is empty";
        }
        return this.queue1[0];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.queue1.length === 0;
    }
}

// Example usage:
let stack = new StackUsingQueues();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.top());    // Output: 30
console.log(stack.pop());    // Output: 30
console.log(stack.top());    // Output: 20
console.log(stack.isEmpty()); // Output: false
```

#### Time Complexity:
- **Push**: O(n) (because we move all elements twice, once to `queue2` and back to `queue1`).
- **Pop**: O(1) (as we simply dequeue from `queue1`).
- **Top**: O(1).
- **isEmpty**: O(1).

---

### 2. **Making Pop Operation Costly**
In this approach, we keep the `push` operation efficient by simply enqueueing the element. The costly operation happens during `pop`, where we transfer elements between queues to simulate stack behavior.

#### Steps:
- For `push(x)`: Enqueue the element into `queue1`.
- For `pop()`: 
  1. Move all elements except the last one from `queue1` to `queue2`.
  2. Dequeue the last element from `queue1` (this is the element we want to pop).
  3. Swap `queue1` and `queue2` references.
- For `top()`: Perform similar steps as `pop()` but without actually removing the element.

#### Code Implementation:

```javascript
class StackUsingQueues2 {
    constructor() {
        this.queue1 = [];
        this.queue2 = [];
    }

    // Push element onto stack
    push(x) {
        this.queue1.push(x);
    }

    // Remove and return the top element from stack
    pop() {
        if (this.queue1.length === 0) {
            return "Stack is empty";
        }

        // Move all elements except the last to queue2
        while (this.queue1.length > 1) {
            this.queue2.push(this.queue1.shift());
        }

        // The last element in queue1 is the top of the stack
        let poppedElement = this.queue1.shift();

        // Swap the queues
        let temp = this.queue1;
        this.queue1 = this.queue2;
        this.queue2 = temp;

        return poppedElement;
    }

    // Get the top element without removing it
    top() {
        if (this.queue1.length === 0) {
            return "Stack is empty";
        }

        // Move all elements except the last to queue2
        while (this.queue1.length > 1) {
            this.queue2.push(this.queue1.shift());
        }

        // Peek the last element (top of the stack)
        let topElement = this.queue1[0];

        // Also move this last element to queue2 to maintain the queue order
        this.queue2.push(this.queue1.shift());

        // Swap the queues
        let temp = this.queue1;
        this.queue1 = this.queue2;
        this.queue2 = temp;

        return topElement;
    }

    // Check if the stack is empty
    isEmpty() {
        return this.queue1.length === 0;
    }
}

// Example usage:
let stack2 = new StackUsingQueues2();
stack2.push(10);
stack2.push(20);
stack2.push(30);
console.log(stack2.top());    // Output: 30
console.log(stack2.pop());    // Output: 30
console.log(stack2.top());    // Output: 20
console.log(stack2.isEmpty()); // Output: false
```

#### Time Complexity:
- **Push**: O(1) (just enqueue).
- **Pop**: O(n) (because we move all elements except the last one to `queue2`).
- **Top**: O(n) (similar to `pop`, but without removing the element).
- **isEmpty**: O(1).

---

### Comparison of Approaches:
- **Push-Costly Approach**: The `push` operation has a time complexity of O(n), but the `pop` and `top` operations are O(1).
- **Pop-Costly Approach**: The `push` operation is O(1), but the `pop` and `top` operations are O(n).

The choice of approach depends on which operation (push or pop) you want to optimize for in terms of performance.


> ### Reverse a Queue  ( [Youtube video](https://www.youtube.com/watch?v=xxlcFYskVRQ&ab_channel=HelloWorld)) )
Keep in mind queue FIFO follow karta h, wahi reverse k method me chaiye

To **reverse a queue**, we can utilize either a stack or recursion. Let's explore both methods.

### 1. **Using a Stack**
A stack follows the **LIFO** (Last In, First Out) principle, which complements the **FIFO** (First In, First Out) principle of a queue. By pushing all the elements from the queue into the stack and then popping them back, we can reverse the order.

#### Steps:
1. Dequeue all elements from the queue and push them onto the stack.
2. Pop elements from the stack and enqueue them back into the queue.

#### JavaScript Code (Reversing Queue Using Stack):

```javascript
class Queue {
    constructor() {
        this.items = [];
    }

    // Add an element to the queue
    enqueue(element) {
        this.items.push(element);
    }

    // Remove and return the front element from the queue
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items.shift();
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Print the elements in the queue
    printQueue() {
        return this.items.join(" ");
    }
}

// Function to reverse the queue
function reverseQueue(queue) {
    let stack = [];

    // Dequeue all elements from the queue and push onto the stack
    while (!queue.isEmpty()) {
        stack.push(queue.dequeue());
    }

    // Pop all elements from the stack and enqueue back to the queue
    while (stack.length > 0) {
        queue.enqueue(stack.pop());
    }
}

// Example usage
let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

console.log("Original Queue: " + queue.printQueue());  // Output: 1 2 3 4

reverseQueue(queue);

console.log("Reversed Queue: " + queue.printQueue());  // Output: 4 3 2 1
```

#### Time Complexity:
- **Enqueue**: O(1) for each element.
- **Dequeue**: O(1) for each element.
- The total time complexity is **O(n)**, where `n` is the number of elements in the queue.

### 2. **Using Recursion**
Alternatively, we can use recursion to reverse the queue by removing elements from the front recursively and adding them back after the recursive call.

#### Steps:
1. Dequeue an element and store it.
2. Recursively reverse the remaining queue.
3. Enqueue the dequeued element back after the recursive call.

#### JavaScript Code (Reversing Queue Using Recursion):

```javascript
// Function to reverse the queue using recursion
function reverseQueueRecursively(queue) {
    if (queue.isEmpty()) {
        return;
    }

    // Dequeue the front element
    let frontElement = queue.dequeue();

    // Recursively reverse the remaining queue
    reverseQueueRecursively(queue);

    // Enqueue the front element back
    queue.enqueue(frontElement);
}

// Example usage
let queue2 = new Queue();
queue2.enqueue(1);
queue2.enqueue(2);
queue2.enqueue(3);
queue2.enqueue(4);

console.log("Original Queue: " + queue2.printQueue());  // Output: 1 2 3 4

reverseQueueRecursively(queue2);

console.log("Reversed Queue: " + queue2.printQueue());  // Output: 4 3 2 1
```

#### Time Complexity:
- **Dequeue/Enqueue**: O(1) for each element.
- The recursion goes as deep as the number of elements in the queue, so the total time complexity is **O(n)**, where `n` is the number of elements in the queue.

---

### Summary:
- **Using a stack** involves first transferring the elements to a stack and then back to the queue, which is iterative and straightforward.
- **Using recursion** is a more elegant, recursive approach where we utilize the call stack to reverse the queue.
- Both methods have a time complexity of **O(n)**, where `n` is the number of elements in the queue.



> ### generate no with given digits using queue

To generate numbers with a given set of digits using a **queue**, we can follow this approach:

### Problem:
We are given a set of digits, and we need to generate all numbers that can be formed by these digits. We'll generate the numbers in increasing order of their lengths, starting from 1-digit numbers and building up to longer numbers by concatenating the digits.

### Approach:
1. **Initialize a queue** with the given digits.
2. **Dequeue** the front element of the queue.
3. For each digit in the set, append it to the dequeued element to form a new number.
4. **Enqueue** the newly formed numbers.
5. Continue the process for a specified number of iterations or until a certain condition is met (e.g., generating a required number of numbers or generating numbers up to a certain length).

### Example:
Given digits: `[5,6]`, the numbers generated would be: `'5', '6', '55', '56', '65', '66', ...`

### Code Implementation in JavaScript:

```javascript
// Function to generate numbers with the given digits using a queue
function generateNumbersWithDigits(digits, n) {
    let queue = [];

    // Step 1: Initialize the queue with the given digits
    for (let i = 0; i < digits.length; i++) {
        queue.push(digits[i].toString());
    }

    let result = [];

    // Step 2: Generate numbers up to 'n' numbers
    while (result.length < n) {
        // Dequeue the front element from the queue
        let current = queue.shift();

        // Add the dequeued element to the result
        result.push(current);

        // Step 3: Append each digit to the current element and enqueue
        for (let i = 0; i < digits.length; i++) {
            queue.push(current + digits[i]);
        }
    }

    // Return the generated numbers
    return result;
}

// Example usage:
let digits = [5,6]; // Given set of digits
let n = 6; // Number of numbers to generate

let generatedNumbers = generateNumbersWithDigits(digits, n);
console.log("Generated Numbers:", generatedNumbers);
```

### Output:
For the example above, the output will be:

```
Generated Numbers: ['5', '6', '55', '56', '65', '66']
```

### Explanation:
- The queue initially holds `["5","6"]`.
- Then, for each number dequeued (like `5`), we append the digits `5,6` to it, resulting in `['55', '56']` being added to the queue.
- This process continues for each dequeued number until we've generated `n` numbers.

### Time Complexity:
- Each enqueue and dequeue operation takes O(1) time.
- The total number of operations is proportional to the number of numbers generated, so the time complexity is **O(n)** where `n` is the number of numbers to generate.

> ### Dequeue data structure

A **Dequeue** (or **Deque**), short for "Double-Ended Queue", is a linear data structure that allows insertion and deletion of elements from both ends (front and rear). It combines the properties of both stacks and queues, making it more versatile.

### Key Operations in Deque:
1. **Insert at front** (`addFront()`): Add an element to the front.
2. **Insert at rear** (`addRear()`): Add an element to the rear.
3. **Delete from front** (`removeFront()`): Remove an element from the front.
4. **Delete from rear** (`removeRear()`): Remove an element from the rear.
5. **Peek front** (`getFront()`): Get the element from the front without removing it.
6. **Peek rear** (`getRear()`): Get the element from the rear without removing it.
7. **isEmpty()**: Check if the deque is empty.
8. **isFull()**: Check if the deque is full (if it's a bounded deque).

### Types of Deque:
- **Input-restricted deque**: Insertion is allowed at only one end, but deletion is possible at both ends.
- **Output-restricted deque**: Deletion is allowed at only one end, but insertion is possible at both ends.

### Applications of Deque:
- Implementing a queue, stack, or both.
- Storing a history of operations in browsers or other applications.
- Sliding window problems, such as finding the maximum in a sliding window in arrays.
- Palindrome checking, where elements are compared from both ends.
  
### JavaScript Implementation of a Deque:
Here's an implementation of a Deque using an array.

### Benefits of Deque:
- Deque is more flexible than a queue or a stack.
- It can be used efficiently for both **LIFO** (Last In, First Out) and **FIFO** (First In, First Out) operations.

### Use Cases of Deque:
1. **Sliding Window Maximum**: Deque can be used to find the maximum element in every sliding window of size `k` in an array.
2. **Palindrome Check**: Deque can be used to check whether a given sequence is a palindrome by comparing elements from both ends.
3. **Job Scheduling**: Deque can be used in scheduling algorithms where both front and rear operations are needed.

### Summary:
Deque is a powerful data structure that allows both stack-like and queue-like operations efficiently from both ends. It is versatile and can solve a wide range of problems that require access from both ends of a data structure.


> ### Implement Dequeue using array and linked list, all operation in O(1)

Implementing a **Deque** (double-ended queue) such that all operations are performed in **O(1)** time is possible using both **arrays** and **linked lists** with careful design. Let's explore both implementations.

### 1. **Array-Based Deque Implementation (Circular Array)**
To achieve **O(1)** time for all operations using an array, we can implement a **circular array** where we maintain two pointers: one for the front and one for the rear. We manage the indices such that when they reach the array's bounds, they wrap around, hence the term "circular."

#### Key Points:
- Maintain a fixed-size array.
- Use two pointers `front` and `rear`.
- Handle both ends of the deque in a circular manner using modulo operations to keep track of the positions.

#### JavaScript Code for Circular Array Deque:

```javascript

// Rear is always (front + size - 1) % capacity

class CircularDeque {
    constructor(capacity) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.front = -1;
        this.rear = -1;
    }

    // Check if the deque is empty
    isEmpty() {
        return this.front === -1;
    }

    // Check if the deque is full
    isFull() {
        return (this.rear + 1) % this.capacity === this.front;
    }

    // Insert element at the front
    addFront(element) {
        if (this.isFull()) {
            console.log("Deque is full");
            return;
        }

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            this.front = (this.front - 1 + this.capacity) % this.capacity;
        }

        this.items[this.front] = element;
    }

    // Insert element at the rear
    addRear(element) {
        if (this.isFull()) {
            console.log("Deque is full");
            return;
        }

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            this.rear = (this.rear + 1) % this.capacity;
        }

        this.items[this.rear] = element;
    }

    // Remove element from the front
    removeFront() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }

        let removedElement = this.items[this.front];

        if (this.front === this.rear) { // Single element case
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.capacity;
        }

        return removedElement;
    }

    // Remove element from the rear
    removeRear() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }

        let removedElement = this.items[this.rear];

        if (this.front === this.rear) { // Single element case
            this.front = -1;
            this.rear = -1;
        } else {
            this.rear = (this.rear - 1 + this.capacity) % this.capacity;
        }

        return removedElement;
    }

    // Get the front element
    getFront() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }
        return this.items[this.front];
    }

    // Get the rear element
    getRear() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }
        return this.items[this.rear];
    }

    // Print the deque
    printDeque() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }
        let i = this.front;
        let result = [];
        while (i !== this.rear) {
            result.push(this.items[i]);
            i = (i + 1) % this.capacity;
        }
        result.push(this.items[this.rear]); // Add the rear element
        console.log(result.join(" "));
    }
}

// Example usage:
let deque = new CircularDeque(5);

deque.addRear(1);
deque.addRear(2);
deque.addFront(0);
deque.addFront(-1);

deque.printDeque(); // Output: -1 0 1 2
console.log("Front element:", deque.getFront()); // Output: -1
console.log("Rear element:", deque.getRear()); // Output: 2

deque.removeFront();
deque.removeRear();

deque.printDeque(); // Output: 0 1
```

### Time Complexity:
- All operations (`addFront`, `addRear`, `removeFront`, `removeRear`, `getFront`, `getRear`) take **O(1)** time.

### 2. **Linked List-Based Deque Implementation**
Using a **doubly linked list**, we can achieve **O(1)** time complexity for all deque operations. The key is that inserting and deleting from the front and rear can be done in constant time with pointers.

#### Key Points:
- Use a doubly linked list to store the deque elements.
- Maintain two pointers: `head` (front) and `tail` (rear).
- Insertions and deletions at both ends are performed in constant time.

#### JavaScript Code for Linked List Deque:

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class Deque {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Check if the deque is empty
    isEmpty() {
        return this.head === null;
    }

    // Insert element at the front
    addFront(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    // Insert element at the rear
    addRear(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    // Remove element from the front
    removeFront() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }
        let removedValue = this.head.value;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        return removedValue;
    }

    // Remove element from the rear
    removeRear() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }
        let removedValue = this.tail.value;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        return removedValue;
    }

    // Get the front element
    getFront() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }
        return this.head.value;
    }

    // Get the rear element
    getRear() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }
        return this.tail.value;
    }

    // Print the deque
    printDeque() {
        if (this.isEmpty()) {
            console.log("Deque is empty");
            return;
        }
        let current = this.head;
        let result = [];
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result.join(" "));
    }
}

// Example usage:
let deque = new Deque();

deque.addRear(1);
deque.addRear(2);
deque.addFront(0);
deque.addFront(-1);

deque.printDeque(); // Output: -1 0 1 2
console.log("Front element:", deque.getFront()); // Output: -1
console.log("Rear element:", deque.getRear()); // Output: 2

deque.removeFront();
deque.removeRear();

deque.printDeque(); // Output: 0 1
```

### Time Complexity:
- All operations (`addFront`, `addRear`, `removeFront`, `removeRear`, `getFront`, `getRear`) take **O(1)** time.

### Conclusion:
- **Array-Based Deque** uses a circular array to achieve **O(1)** time operations.
- **Linked List-Based Deque** uses a doubly linked list where operations on both ends are performed in constant time.
Both implementations can handle deque operations efficiently depending on the use case and memory constraints.


> ### Binary search tree

```js
// Trees

// Full Tree - Every item either points to two nodes or zero nodes

// Leaf nodes - there the nodes which do not have parents

// In binary search tree - if child is greater than parent it goes to right else goes to left.
// in BST, every node has at-most two children
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

> ### height of binary tree

The **height of a binary tree** is the number of edges on the longest path from the root to a leaf node. It can also be defined as the number of levels in the tree minus one. The height of an empty tree is `-1`, and the height of a tree with a single node (the root) is `0`.

### Recursive Approach:
The height of a binary tree can be computed recursively by finding the maximum height of its left and right subtrees and adding `1` for the root.

### Formula:
The height of a node `n` is:
```
height(n) = max(height(left subtree), height(right subtree)) + 1
```

### Code Implementation in JavaScript:

```javascript
// Node class to represent a binary tree node
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Function to calculate the height of a binary tree
function height(node) {
    // Base case: if the tree is empty, the height is -1
    if (node === null) {
        return -1;
    }

    // Recursively calculate the height of the left and right subtrees
    let leftHeight = height(node.left);
    let rightHeight = height(node.right);

    // Return the larger of the two heights plus 1 (for the root node)
    return Math.max(leftHeight, rightHeight) + 1;
}

// Example usage:

// Create the binary tree
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);

// Calculate the height of the tree
let treeHeight = height(root);
console.log("Height of the binary tree is:", treeHeight);  // Output: 2
```

### Explanation:
In this example:
- The binary tree looks like this:
  ```
      1
     / \
    2   3
   / \   \
  4   5   6
  ```
- The longest path is from the root `1` to any of the leaf nodes (`4`, `5`, or `6`). The number of edges in the longest path is `2`, so the height of the tree is `2`.

### Time Complexity:
- **O(n)**, where `n` is the number of nodes in the binary tree. This is because we visit each node exactly once to compute the height of its left and right subtrees.

### Space Complexity:
- The space complexity is **O(h)**, where `h` is the height of the tree due to the recursive call stack. In the worst case (for a skewed tree), this could be **O(n)**, but for a balanced tree, it would be **O(log n)**.


> ### print nodes at distance k in BST 

To print all nodes at a given distance \( k \) from the root in a **Binary Search Tree (BST)**, we can approach the problem recursively. At each recursive call, we reduce the distance \( k \) by 1, and when \( k = 0 \), we print the current node.

### Recursive Approach:
- If the tree is empty (i.e., the node is `null`), we return.
- If \( k = 0 \), print the node's value.
- Otherwise, recursively call the function for both left and right children, decreasing \( k \) by 1.

### Code Implementation in JavaScript:

```javascript
// Node class to represent a binary tree node
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Function to print nodes at distance k
function printNodesAtDistanceK(node, k) {
    // Base case: if the tree is empty, return
    if (node === null) {
        return;
    }

    // If k is 0, print the current node
    if (k === 0) {
        console.log(node.value);
        return;
    }

    // Recurse for left and right subtrees with k-1
    printNodesAtDistanceK(node.left, k - 1);
    printNodesAtDistanceK(node.right, k - 1);
}

// Example usage:

// Create the binary tree
let root = new Node(10);
root.left = new Node(5);
root.right = new Node(20);
root.left.left = new Node(3);
root.left.right = new Node(7);
root.right.left = new Node(15);
root.right.right = new Node(25);

// Print nodes at distance k = 2 from the root
let k = 2;
console.log(`Nodes at distance ${k} from the root:`);
printNodesAtDistanceK(root, k); 
```

### Explanation:
Given the following binary tree:
```
        10
       /  \
      5    20
     / \   / \
    3   7 15  25
```
- For \( k = 2 \), the nodes at this distance from the root are `3`, `7`, `15`, and `25`, since they are two edges away from the root (`10`).

### Time Complexity:
- **O(n)**, where `n` is the number of nodes in the tree. The algorithm visits every node once.

### Space Complexity:
- **O(h)**, where `h` is the height of the tree due to the recursive call stack. In the worst case (for a skewed tree), this could be **O(n)**, but for a balanced tree, it would be **O(log n)**.


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
// also called as Level Order Traversal
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
```
> ### level order traversal line by line

To perform a **level order traversal** of a binary tree **line by line** (i.e., printing each level of the tree on a new line), we can use a **queue** to process nodes level by level. For each node, we enqueue its left and right children, then after processing all nodes at the current level, we move on to the next level.

### Approach:
1. Use a queue to perform a **Breadth-First Search (BFS)**.
2. For each level, track the number of nodes at that level.
3. Print the nodes at each level before moving on to the next one.

### Steps:
1. Start by enqueuing the root node.
2. While the queue is not empty, for each level:
   - Count the number of nodes at the current level (`levelSize`).
   - Dequeue all the nodes at this level and enqueue their children (if any).
   - Print all nodes at the current level.
3. Repeat this for each subsequent level.

### Code Implementation in JavaScript:

```javascript
// Node class to represent a binary tree node
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Function to perform level order traversal line by line
function levelOrderTraversalLineByLine(root) {
    if (root === null) {
        return;
    }

    let queue = [];
    queue.push(root); // Enqueue the root node

    // Perform BFS
    while (queue.length > 0) {
        let levelSize = queue.length; // Number of nodes at the current level
        let currentLevel = ""; // To accumulate node values for the current level

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            let currentNode = queue.shift(); // Dequeue the node

            // Accumulate the current node's value
            currentLevel += currentNode.value + " ";

            // Enqueue the left and right children of the current node
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }

        // Print the entire level after processing
        console.log(currentLevel.trim());
    }
}

// Example usage:

// Create the binary tree
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

// Perform level order traversal line by line
console.log("Level Order Traversal Line by Line:");
levelOrderTraversalLineByLine(root);
```

### Output:
For the following binary tree:
```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

The output of the level order traversal, line by line, will be:
```
1 
2 3 
4 5 6 7
```

### Explanation:
- The root node `1` is printed first (level 0).
- Then nodes `2` and `3` (children of `1`) are printed on the next line (level 1).
- Finally, nodes `4`, `5`, `6`, and `7` (children of `2` and `3`) are printed on the next line (level 2).

### Time Complexity:
- **O(n)**, where `n` is the number of nodes in the tree. Each node is visited once.

### Space Complexity:
- **O(n)**, because in the worst case (a completely balanced tree), we might have to store all nodes of the last level in the queue, which can be up to `n/2` nodes.

```js
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

