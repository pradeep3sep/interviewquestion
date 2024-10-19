> ### The Big O
The Big O is basically `worst-case` running `time` of an `algorithm` as the input size increases

```
https://www.bigocheatsheet.com/
```

### Measuring Space Complexity in Practice

- **Variables**: Consider the memory used by variables you create. For example:
  ```js
  let x = 42; // O(1), fixed space for a number
  let arr = [1, 2, 3, 4]; // O(n), space depends on array size
  ```

- **Functions**: Track the memory used by functions, especially if they store data or call other functions recursively:
  ```js
  function sum(arr) {
      if (arr.length === 0) return 0;
      return arr[0] + sum(arr.slice(1));
  }
  // Each recursive call adds to the call stack: O(n) space
  ```

- **Data Structures**: Take note of how much space collections (arrays, objects) use:
  ```js
  let obj = { a: 1, b: 2, c: 3 }; // O(m), where m is the number of keys
  ```

### Example: Analyzing Space Complexity

#### Iterative Algorithm (constant space):
```js
function sum(arr) {
    let total = 0; // O(1) space
    for (let i = 0; i < arr.length; i++) { // O(1) space for i
        total += arr[i]; // O(1)
    }
    return total;
}
// Space Complexity: O(1), since no additional space grows with input size
```

#### Recursive Algorithm (linear space):
```js
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1); // O(n) space for the call stack
}
// Space Complexity: O(n), since each recursive call adds to the stack
```

> ### Big O of various operations in data structure

| **Operation / Data Structure** | **Unsorted Array** | **Sorted Array** | **Linked List** | **BST (Balanced)** | **Hash Table** |
|-------------------------------|--------------------|------------------|-----------------|--------------------|---------------|
| **Search**                     | O(n)               | O(log n)         | O(n)            | O(log n)            | O(1)          |
| **Insert**                     | O(1)               | O(n)             | O(1)            | O(log n)            | O(1)          |
| **Delete**                     | O(n)               | O(n)             | O(n)            | O(log n)            | O(1)          |
| **Find Closest**               | O(n)               | O(log n)         | O(n)            | O(log n)            | O(n)          |
| **Sorted Traversal**           | O(n log n)         | O(n)             | O(n log n)      | O(n)                | O(n log n)    |

### Notes:
- **Unsorted Array**: Insertions are O(1) because they can be done at the end. Searching, deleting, and finding the closest element require scanning the entire array, which takes O(n).
- **Sorted Array**: Binary search (O(log n)) is used for search and finding the closest element. However, insertion and deletion take O(n) due to shifting elements.
- **Linked List**: Searching, deleting, and finding the closest element require traversing the list (O(n)), but insertions at the head take O(1).
- **Balanced BST**: All operations take O(log n) due to the tree's balanced nature, ensuring logarithmic time complexity.
- **Hash Table**: Average-case performance for search, insert, and delete is O(1), but finding the closest element (since it’s unordered) and sorted traversal would take O(n) or O(n log n) for sorting.


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

To check if a string is a subsequence of another string in JavaScript, you can use a two-pointer technique. 

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



> ### Anagram Substring Search (Or Search for all permutations) ( [Youtube video](https://youtu.be/fYgU6Bi2fRg?si=HoRG7uxp0GCmxlCA&t=83) )

Example:

Input: txt = “BACDGABCDA”,  pat = “ABCD”\
Output: [0, 5, 6]\
Explanation: “BACD” is at 0, “ABCD” at 5 and “BCDA” at 6

Input: txt = “AAABABAA”, pat = “AABA”   \
Output:  [0, 1, 4]\
Explanation: “AAAB” is at 0, “AABA” at 5 and “ABAA” at 6

Anagram search is a problem where you need to find all the positions in a string where an anagram (or permutation) of a given pattern exists as a substring. 

### Problem Statement:
Given a **text** and a **pattern**, you need to find all the starting indices in the text where the pattern's anagram (permutation) appears.

### Example:
**Input:**
- Text: `"cbaebabacd"`
- Pattern: `"abc"`

**Output:**
- `[0, 6]`

Explanation:
- The substring starting at index 0 is `"cba"`, which is an anagram of `"abc"`.
- The substring starting at index 6 is `"bac"`, which is also an anagram of `"abc"`.

### Approach: Sliding Window + Frequency Count
To solve this efficiently, we can use the **sliding window technique** with **frequency count** of characters. The key idea is:
1. Maintain a frequency count of the characters in the pattern.
2. Slide a window of the same length as the pattern over the text.
3. At each step, compare the frequency of characters in the current window with the frequency count of the pattern.

### Steps:
1. Use two arrays (or hashmaps) to store the frequency of characters in the pattern and the current window of text.
2. Slide the window over the text and update the frequency array.
3. If the frequency of characters in the current window matches the frequency in the pattern, store the starting index of the window.

### Code Implementation in JavaScript:

```javascript
// Function to find all anagram start indices in the text
function findAnagrams(text, pattern) {
    let result = [];
    let patternLength = pattern.length;
    let textLength = text.length;

    if (textLength < patternLength) {
        return result; // No possible anagram
    }

    // Arrays to store frequency of characters in pattern and current window
    let patternCount = Array(26).fill(0);  // For 'a' to 'z'
    let windowCount = Array(26).fill(0);   // For 'a' to 'z'

    // Helper function to convert a character to its index (0 for 'a', 1 for 'b', etc.)
    const charToIndex = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0);

    // Build the frequency count for the pattern
    for (let i = 0; i < patternLength; i++) {
        patternCount[charToIndex(pattern[i])]++;
        windowCount[charToIndex(text[i])]++;
    }

    // Slide the window over the text
    for (let i = patternLength; i < textLength; i++) {
        // If the current window matches the pattern, add the start index
        if (patternCount.toString() === windowCount.toString()) {
            result.push(i - patternLength);
        }

        // Move the window: remove the count of the first character of the previous window
        windowCount[charToIndex(text[i - patternLength])]--;

        // Add the count of the new character in the current window
        windowCount[charToIndex(text[i])]++;
    }

    // Check the last window (since the loop above ends one step early)
    if (patternCount.toString() === windowCount.toString()) {
        result.push(textLength - patternLength);
    }

    return result;
}

// Example usage:
let text = "cbaebabacd";
let pattern = "abc";
let indices = findAnagrams(text, pattern);
console.log("Anagram start indices:", indices);
```

### Explanation:
- We convert each character to an index (`0` for `'a'`, `1` for `'b'`, etc.) using the `charToIndex` function.
- We create two frequency arrays (`patternCount` and `windowCount`):
  - `patternCount` stores the frequency of characters in the pattern.
  - `windowCount` stores the frequency of characters in the current sliding window of the text.
- We slide a window of length equal to the pattern's length across the text:
  - If the frequency arrays match, the current window is an anagram of the pattern, so we store the starting index.
  - After moving the window, we update the frequency of the characters in the window.
- Finally, we check the last window for a match.

### Output:
For the input:
```javascript
let text = "cbaebabacd";
let pattern = "abc";
```
The output will be:
```
Anagram start indices: [0, 6]
```

### Time Complexity:
- **O(n)** where `n` is the length of the text. We visit each character of the text only once while sliding the window.

### Space Complexity:
- **O(1)**, because we are using fixed-size arrays for the frequency count (26 elements for lowercase English letters).


> ### Lexicographic Rank of a String ( [Youtube video](https://youtu.be/uUN8fVPrJn0?si=Ege3okmmRJvxt331) )

**If needed, can refer the GFG code also https://www.geeksforgeeks.org/lexicographic-rank-of-a-string/**

To solve the **Lexicographic Rank of a String** in **O(n)** time complexity, we need to improve the algorithm by avoiding the costly inner loop (which checks for smaller characters). We can accomplish this by:

1. **Precomputing Factorials**: Instead of recalculating the factorial each time, we can precompute the factorial values up to the length of the string.
  
2. **Frequency Array**: We maintain a frequency array of characters. This array allows us to efficiently track and update the number of characters smaller than the current character in constant time.

### Optimized Approach:

1. **Precompute Factorials**: Store the factorials of numbers from 0 to `n`.
  
2. **Frequency Array**: Maintain a frequency count of all characters in the string. This will help in determining how many characters are smaller than the current character in constant time.

3. **Update Frequency**: After processing each character, update the frequency array.

### Detailed Steps:

1. **Factorial Precomputation**: Precompute factorials of numbers from `0` to `n` (length of the string).
  
2. **Count Frequency of Characters**: Count how often each character appears in the string (we assume ASCII characters, so we use a frequency array of size 256).

3. **Calculate Rank**: For each character in the string, calculate how many permutations start with a smaller character. Use the frequency array to determine how many smaller characters exist and multiply by the factorial of the remaining length.

4. **Adjust Frequency**: After processing each character, reduce its frequency by 1 to account for it being fixed in place.

### Code Implementation in O(n) Time Complexity:

```javascript
// Function to calculate factorials up to 'n'
function precomputeFactorials(n) {
    let fact = Array(n + 1).fill(1);
    for (let i = 2; i <= n; i++) {
        fact[i] = fact[i - 1] * i;
    }
    return fact;
}

// Function to find the lexicographic rank of a string in O(n) time
function lexicographicRank(str) {
    const n = str.length;

    // Precompute factorials up to n
    let fact = precomputeFactorials(n);

    // Create a frequency array for all characters
    let charCount = Array(256).fill(0); // 256 for extended ASCII

    // Populate the frequency array with the count of each character
    for (let i = 0; i < n; i++) {
        charCount[str.charCodeAt(i)]++;
    }

    // Check for duplicate characters (if any)
    for (let i = 0; i < 256; i++) {
        if (charCount[i] > 1) {
            console.log("Error: The string contains duplicate characters.");
            return -1;
        }
    }

    // Initialize rank to 1 (since ranks start from 1)
    let rank = 1;

    // Traverse each character in the string
    for (let i = 0; i < n; i++) {
        // Calculate how many permutations would be generated by smaller characters
        for (let j = 0; j < str.charCodeAt(i); j++) {
            if (charCount[j] > 0) {
                rank += fact[n - i - 1]; // Add factorial of remaining length
            }
        }

        // Reduce the frequency of the current character
        charCount[str.charCodeAt(i)]--;
    }

    return rank;
}

// Example usage
let str = "STRING";
let rank = lexicographicRank(str);
console.log(`Lexicographic rank of "${str}" is: ${rank}`);
```

### Explanation:

1. **Precompute Factorials**:
   - The `precomputeFactorials` function precomputes the factorial values for numbers from 0 to `n`. This reduces the time spent on calculating factorials during the rank calculation.
  
2. **Frequency Array**:
   - A frequency array (`charCount`) is used to store the frequency of each character in the string. Since the problem assumes unique characters, this will just serve as a way to track how many characters are smaller than the current character as we process the string.

3. **Calculate Rank**:
   - For each character, we calculate how many permutations would be generated by all characters smaller than the current character, and then add this count to the rank.
   - After processing each character, we decrement its count in the `charCount` array.

### Example:

For the string `"STRING"`:

1. Precompute factorials for the length of the string.
2. Populate the frequency array with character counts.
3. Traverse each character:
   - For `'S'`, there are `3!` permutations of characters smaller than `'S'`, like `'R'`, `'N'`, etc.
   - For `'T'`, count smaller characters and add corresponding permutations.
4. Sum the contributions of all characters to get the lexicographic rank.

### Output:

For the input `"STRING"`:

```
Lexicographic rank of "STRING" is: 598
```

### Time Complexity:

- **O(n)**: We are precomputing the factorials in O(n) and calculating the rank by iterating over the string once. Accessing and updating the frequency array takes constant time (`O(1)` for each character).
  
### Space Complexity:

- **O(1)** (if we ignore the factorial array and frequency array). Otherwise, it is **O(256)** for the frequency array and **O(n)** for the factorial array.


> ### Check for leftmost repeating character (when we start from left find which character repeats, then give its index)

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

> ### Pattern searching algoritm in string ( [Youtube video](https://youtu.be/V5-7GzOfADQ?si=Al1GgXyjbLyC2zEz&t=460) )

To implement a pattern searching algorithm in JavaScript, one of the most common algorithms is the **Knuth-Morris-Pratt (KMP)** algorithm. It efficiently searches for occurrences of a word within a text and improves performance by avoiding rechecking characters that have already been checked.

Here’s how you can implement the KMP pattern searching algorithm in JavaScript:

### Steps for KMP Algorithm:
1. **Preprocess the pattern** to create the longest prefix which is also a suffix (LPS) array.
2. **Search the pattern** in the given text using the LPS array to skip unnecessary comparisons.

### Code Implementation:

```javascript
// Function to create the LPS array (longest prefix suffix)  ( [Youtube video](https://www.youtube.com/watch?v=9kgWwkgXTGM&ab_channel=CollegeWalaDost) )
function computeLPSArray(pattern) {
  const lps = Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

// Function to perform KMP search
function KMPSearch(text, pattern) {
  const lps = computeLPSArray(pattern);
  const result = [];
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      // Pattern found at index i-j
      result.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return result; // Returns indices where the pattern is found
}

// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const occurrences = KMPSearch(text, pattern);
console.log("Pattern found at index:", occurrences);
```

### Explanation:
- **computeLPSArray**: Prepares the LPS array to optimize the search by storing the length of the previous longest prefix that is also a suffix.
- **KMPSearch**: This function uses the LPS array to perform the actual search, skipping unnecessary comparisons based on the LPS values.

### Example Output:
```
Pattern found at index: [10]
```

This code will find all the positions of the pattern in the given text efficiently.


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

> ### Reverse K Nodes in a Linked List ( [Youtube video](https://www.youtube.com/watch?v=LCRGV8avvUY&t=176s&ab_channel=ApnaCollege) )

To **reverse K nodes in a linked list**, the idea is to reverse every block of `K` nodes in the list. If the remaining nodes are fewer than `K`, they can be left as they are.

Here's the step-by-step approach to solve this problem:

### Approach:

1. **Traverse K Nodes**: First, reverse the first `K` nodes of the linked list. After reversing, the `K-th` node becomes the new head of that part.

2. **Recursive Call or Loop**: Then, recursively process the remaining part of the linked list, and link the last node of the reversed segment to the head of the next segment.

3. **Return the New Head**: Once all segments are reversed, return the new head of the entire list.

### Example:

For the linked list: `1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9` and `K = 3`, the result will be:
```
3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 9 -> 8 -> 7
```

### Code Implementation in JavaScript:

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Function to reverse K nodes in a linked list
function reverseKNodes(head, K) {
    if (head === null || K === 1) return head;

    let current = head;
    let next = null;
    let prev = null;
    let count = 0;

    // Reverse the first K nodes of the linked list
    while (current !== null && count < K) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
        count++;
    }

    // next is now pointing to (K+1)th node. Recursively reverse the rest of the list
    if (next !== null) {
        head.next = reverseKNodes(next, K);
    }

    // prev is the new head of the reversed group
    return prev;
}

// Utility function to print the linked list
function printList(head) {
    let temp = head;
    while (temp !== null) {
        console.log(temp.value + " -> ");
        temp = temp.next;
    }
    console.log("null");
}

// Driver code
const K = 3;

// Creating a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);
head.next.next.next.next.next.next.next = new Node(8);
head.next.next.next.next.next.next.next.next = new Node(9);

console.log("Original List:");
printList(head);

// Reverse every K nodes
head = reverseKNodes(head, K);

console.log("Reversed List in groups of K:");
printList(head);
```

### Explanation:

1. **Reverse First K Nodes**: In the first loop, we reverse the first `K` nodes by keeping track of the previous node (`prev`), the current node (`current`), and the next node (`next`). This process continues for `K` nodes.

2. **Recursive Call**: Once the first `K` nodes are reversed, we recursively call `reverseKNodes` for the next segment of `K` nodes. The head of the original segment (`head`) is then linked to the result of the next recursive call.

3. **Returning the New Head**: After reversing each group of `K` nodes, the new head of the segment is returned (`prev`).

### Time Complexity:
- **O(n)**: Each node is visited once, so the time complexity is linear.

### Space Complexity:
- **O(1)**: The solution uses constant extra space except for the recursion stack, which can go up to **O(n/K)** levels.

### Example:

For the input list `1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9` with `K = 3`, the reversed list will be:

```
3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 9 -> 8 -> 7 -> null
```



> ### Clone a linked list using a random pointer

Cloning a linked list with both a **next pointer** and a **random pointer** is an interesting problem. The challenge here is to create a deep copy of the linked list such that each node's **next** and **random** pointers in the cloned list point to the correct nodes, mirroring the original list.

### Problem Breakdown:
- Each node in the linked list has two pointers:
  - **Next pointer**: Points to the next node in the linked list.
  - **Random pointer**: Points to any arbitrary node within the list (or `null`).

The goal is to clone this list in **O(n)** time and **O(1)** space.

### Steps to Solve the Problem:

1. **Step 1**: Insert each cloned node just after the original node in the linked list. For example, if the list is `A -> B -> C`, transform it to `A -> A' -> B -> B' -> C -> C'`.

2. **Step 2**: Assign the correct random pointers for the cloned nodes. Since the cloned nodes are adjacent to their originals, we can set `A'.random = A.random.next` (i.e., the random pointer of `A'` will point to the clone of `A.random`).

3. **Step 3**: Separate the cloned list from the original list.

### Code Implementation in JavaScript:

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.random = null;
    }
}

function cloneLinkedListWithRandomPointer(head) {
    if (!head) return null;

    // Step 1: Create cloned nodes and place them next to original nodes
    let current = head;
    while (current) {
        let newNode = new Node(current.value);
        newNode.next = current.next;
        current.next = newNode;
        current = newNode.next;
    }

    // Step 2: Update the random pointers of the cloned nodes
    current = head;
    while (current) {
        if (current.random) {
            current.next.random = current.random.next;
        }
        current = current.next.next; // Move to the next original node
    }

    // Step 3: Separate the cloned nodes to form the new cloned list
    current = head;
    let clonedHead = head.next;
    let clonedCurrent = clonedHead;
    
    while (current) {
        current.next = current.next.next; // Restore the original list
        if (clonedCurrent.next) {
            clonedCurrent.next = clonedCurrent.next.next; // Set next for the cloned list
        }
        current = current.next;
        clonedCurrent = clonedCurrent.next;
    }

    return clonedHead; // Return the head of the cloned list
}

// Utility function to print the list along with random pointers
function printListWithRandom(head) {
    let current = head;
    while (current) {
        const randomVal = current.random ? current.random.value : 'null';
        console.log(`Node value: ${current.value}, Random points to: ${randomVal}`);
        current = current.next;
    }
}

// Driver code

// Creating a linked list: 1 -> 2 -> 3 -> 4 -> 5
let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

// Setting up random pointers
head.random = head.next.next; // 1's random -> 3
head.next.random = head; // 2's random -> 1
head.next.next.random = head.next.next.next.next; // 3's random -> 5
head.next.next.next.random = head.next.next; // 4's random -> 3
head.next.next.next.next.random = head.next; // 5's random -> 2

console.log("Original List with Random Pointers:");
printListWithRandom(head);

// Clone the linked list
let clonedHead = cloneLinkedListWithRandomPointer(head);

console.log("Cloned List with Random Pointers:");
printListWithRandom(clonedHead);
```

### Explanation:

1. **Step 1: Clone nodes and link them next to the original nodes**:
   - For each node in the original list, a new cloned node is created and inserted right after the original node. This step creates interleaved original and cloned nodes.

2. **Step 2: Set the random pointers**:
   - The cloned node's random pointer is set by using the original node's random pointer. Since the cloned nodes are right next to the originals, we can access the corresponding cloned node using `current.next`.

3. **Step 3: Separate the cloned list**:
   - Finally, we restore the original list by reconnecting its next pointers and also create the next links for the cloned list by connecting every second node (the cloned nodes).

### Time Complexity:
- **O(n)**: Each node is visited three times — once for cloning, once for setting the random pointer, and once for separating the cloned list from the original.

### Space Complexity:
- **O(1)**: We only use constant extra space (ignoring the output list), which makes this solution space-efficient.

### Example:

For a list like this:

```
1 -> 2 -> 3 -> 4 -> 5
```
With random pointers:
- 1's random -> 3
- 2's random -> 1
- 3's random -> 5
- 4's random -> 3
- 5's random -> 2

After cloning, the cloned list will have exactly the same structure and random pointers:

```
1' -> 2' -> 3' -> 4' -> 5'
```
Where the cloned random pointers mirror the original random pointers.

This method efficiently clones a linked list with both next and random pointers.



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

> ### Implement K stack in an array



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

> ### Delete a node in BST ( [Youtube video](https://www.youtube.com/watch?v=petKaikRiIA&ab_channel=AnujBhaiya) )

In a Binary Search Tree (BST), deletion of a node requires three different cases to handle:

1. **Case 1: Node to be deleted is a leaf node** (no children):
   - Simply remove the node from the tree.
   
2. **Case 2: Node to be deleted has one child**:
   - Replace the node with its child.
   
3. **Case 3: Node to be deleted has two children**:
   - Replace the node with its in-order successor (smallest node in the right subtree) or in-order predecessor (largest node in the left subtree) and delete the in-order successor/predecessor from its original position.

Here is the JavaScript code for deleting a node in a BST:

### Code for Deletion in a Binary Search Tree (BST): 

```js
// Definition for a Binary Search Tree Node
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Function to delete a node from a BST
function deleteNode(root, key) {
    // Base case: if the tree is empty
    if (root === null) return root;

    // Recur down the tree to find the node to be deleted
    if (key < root.value) {
        root.left = deleteNode(root.left, key); // The key to be deleted is in the left subtree
    } else if (key > root.value) {
        root.right = deleteNode(root.right, key); // The key to be deleted is in the right subtree
    } else {
        // Node to be deleted is found

        // Case 1: Node with only one child or no child
        if (root.left === null) {
            let temp = root.right;
            root = null; // Free the current node
            return temp; // Return the right subtree as the new subtree
        } else if (root.right === null) {
            let temp = root.left;
            root = null; // Free the current node
            return temp; // Return the left subtree as the new subtree
        }

        // Case 2: Node with two children
        // Get the inorder successor (smallest in the right subtree)
        let temp = findMin(root.right);

        // Copy the inorder successor's value to the current node
        root.value = temp.value;

        // Delete the inorder successor
        root.right = deleteNode(root.right, temp.value);
    }

    return root;
}

// Function to find the node with the minimum value (in-order successor)
function findMin(node) {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
}

// Example Usage:
let root = new Node(50);
root.left = new Node(30);
root.right = new Node(70);
root.left.left = new Node(20);
root.left.right = new Node(40);
root.right.left = new Node(60);
root.right.right = new Node(80);

console.log("Before deletion:");
console.log(JSON.stringify(root, null, 2));

// Delete node with key 70
root = deleteNode(root, 70);

console.log("After deletion:");
console.log(JSON.stringify(root, null, 2));
```

### Explanation:

- **Case 1 (Leaf Node)**: When the node has no children, the node is set to `null`.
- **Case 2 (One Child)**: When the node has only one child, the node is replaced by its child.
- **Case 3 (Two Children)**: The in-order successor (the smallest node in the right subtree) is found and replaces the node to be deleted. Then the in-order successor is deleted from its original position.

### Example Output (before and after deletion of 70):

**Before Deletion:**

```
        50
       /  \
     30    70
    /  \   /  \
   20  40 60  80
```

**After Deletion of 70:**

```
        50
       /  \
     30    80
    /  \   /
   20  40 60
```

The node `70` is replaced with its in-order successor `80`, and the BST is updated accordingly.

> ### floor and ceil in BST  ( [Youtube video](https://www.youtube.com/watch?v=Sgz3SF_0wOw&ab_channel=AnujBhaiya) )

To find the floor and ceiling of a given value in a Binary Search Tree (BST), we can use a recursive approach. Let's define what the "floor" and "ceiling" mean in the context of a BST:

- **Floor** of a value `x` is the greatest value in the BST that is less than or equal to `x`.
- **Ceiling** of a value `x` is the smallest value in the BST that is greater than or equal to `x`.

### BST Node Structure
```js
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
```

### Inserting Nodes into the BST
```js
class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }
}
```

### Floor and Ceil Functions
The basic idea for both `floor` and `ceil` functions is to traverse the tree and keep track of the possible values while moving through the tree.

#### Finding the Floor
```js
function findFloor(root, key) {
  let floor = null;
  let current = root;

  while (current !== null) {
    if (current.data === key) {
      return current.data;
    }
    if (current.data < key) {
      floor = current.data;
      current = current.right;
    } else {
      current = current.left;
    }
  }

  return floor;
}
```

#### Finding the Ceiling
```js
function findCeil(root, key) {
  let ceil = null;
  let current = root;

  while (current !== null) {
    if (current.data === key) {
      return current.data;
    }
    if (current.data > key) {
      ceil = current.data;
      current = current.left;
    } else {
      current = current.right;
    }
  }

  return ceil;
}
```

### Example Usage
```js
let bst = new BST();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(18);

let key = 6;
console.log("Floor of", key, "is", findFloor(bst.root, key)); // Floor of 6 is 5
console.log("Ceiling of", key, "is", findCeil(bst.root, key)); // Ceiling of 6 is 7
```

### Explanation:
- **Floor**: Traverse the tree, and if you find a node that is less than or equal to the target, move right, but keep track of the most recent value that meets this condition.
- **Ceiling**: Traverse the tree, and if you find a node greater than or equal to the target, move left, but keep track of the most recent value that meets this condition.

This solution runs in **O(h)** time complexity, where **h** is the height of the tree. For balanced trees, it would be **O(log n)**.

> ### AVL tree ( [Youtube video](https://www.youtube.com/watch?v=jDM6_TnYIqE&ab_channel=AbdulBari) )

An **AVL tree** is a type of `self-balancing binary search tree (BST)`. In an AVL tree, the `difference in height`s (balance factor) between the `left and right` subtrees of any node is `at most(<=) 1`. If at any point this condition is violated, the tree performs rotations to restore balance.

The height of an AVL tree is kept in check, ensuring that the time complexity for operations like insertion, deletion, and lookup is O(log n), where **n** is the number of nodes.

### Key Operations in an AVL Tree:
1. **Insertion**: Insert the node as in a normal BST and then check if the tree is balanced. If not, perform rotations to balance it.
2. **Rotation**: There are four types of rotations that can be used to balance the tree after insertion or deletion:
   - Left rotation
   - Right rotation
   - Left-Right rotation
   - Right-Left rotation
3. **Balancing**: After every insertion or deletion, the balance factor (difference between the heights of left and right subtrees) of each node is checked. If it violates the AVL property (i.e., balance factor > 1 or < -1), the tree is rebalanced using rotations.

### Balance Factor
For each node, the **balance factor** is calculated as:
```
balance_factor = height(left subtree) - height(right subtree)
```
The AVL property requires that the balance factor of every node should be in the range of [-1, 1].

### AVL Tree Rotations

#### 1. **Left Rotation**:
Left rotation is performed when a node's right subtree becomes taller, causing the tree to become unbalanced.
```text
      z                            y
     / \                          / \
    T1  y      Left Rotate(z)     z   T3
       / \   ---------------->   / \
      T2  T3                    T1  T2
```

#### 2. **Right Rotation**:
Right rotation is performed when a node's left subtree becomes taller, causing the tree to become unbalanced.
```text
      z                            y
     / \                          / \
    y   T4      Right Rotate(z)   x   z
   / \        ---------------->     / \
  x   T3                          T3  T4
```

#### 3. **Left-Right Rotation**:
A left-right rotation is a combination of a left rotation followed by a right rotation. This is used when the tree becomes unbalanced because of a left-right case.

#### 4. **Right-Left Rotation**:
A right-left rotation is a combination of a right rotation followed by a left rotation. This is used when the tree becomes unbalanced because of a right-left case.

### JavaScript Implementation of an AVL Tree

```js
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1; // height of the node
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // Get the height of a node
  getHeight(node) {
    if (node === null) return 0;
    return node.height;
  }

  // Calculate balance factor
  getBalance(node) {
    if (node === null) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // Right rotation
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    // Return new root
    return x;
  }

  // Left rotation
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    // Return new root
    return y;
  }

  // Insert a node
  insert(node, key) {
    // Perform normal BST insertion
    if (node === null) {
      return new Node(key);
    }

    if (key < node.data) {
      node.left = this.insert(node.left, key);
    } else if (key > node.data) {
      node.right = this.insert(node.right, key);
    } else {
      return node; // Duplicate keys not allowed
    }

    // Update the height of the ancestor node
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // Get the balance factor
    const balance = this.getBalance(node);

    // Balance the node if it's unbalanced
    // Left Left Case
    if (balance > 1 && key < node.left.data) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && key > node.right.data) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && key > node.left.data) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && key < node.right.data) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node; // Return the unchanged node pointer
  }

  // In-order traversal
  inOrder(node) {
    if (node !== null) {
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  }
}

// Example Usage
const avl = new AVLTree();
avl.root = avl.insert(avl.root, 10);
avl.root = avl.insert(avl.root, 20);
avl.root = avl.insert(avl.root, 30);
avl.root = avl.insert(avl.root, 40);
avl.root = avl.insert(avl.root, 50);
avl.root = avl.insert(avl.root, 25);

console.log("In-order traversal of the balanced AVL tree:");
avl.inOrder(avl.root);  // Output will be in sorted order
```

### Explanation:
1. **Insertion**: The `insert` function inserts a node like in a regular BST, but after every insertion, it checks if the tree has become unbalanced. If it has, appropriate rotations (right, left, left-right, or right-left) are performed to balance the tree.
2. **Rotation**: Right and left rotations are performed to restore balance when necessary.

### Time Complexity:
- **Insertion**: O(log n) because the tree is kept balanced after every insertion.
- **Rotation**: O(1) because rotations only involve changing a few pointers and heights.
- **In-order Traversal**: O(n), where **n** is the number of nodes.

AVL trees ensure efficient searching, insertion, and deletion operations, with guaranteed logarithmic time complexity.




> ### find kth smallest element, we tried here using the BST ( [Youtube video](https://www.youtube.com/watch?v=9TJYWh0adfk&ab_channel=takeUforward) )

To achieve an **O(log n)** time complexity for finding the k-th smallest element, you can use a **Balanced Binary Search Tree (BST)**, such as an **Augmented BST** that keeps track of the size of the subtree rooted at each node.

### Key Idea:
- Each node in the BST stores:
  1. The value.
  2. A pointer to the left and right children.
  3. The size of the subtree rooted at that node (including the node itself).

With this additional information, you can efficiently find the k-th smallest element by comparing the size of the left subtree to `k`.

### Operations:
- Insert: **O(log n)** (in a balanced BST like AVL or Red-Black tree).
- Find k-th smallest: **O(log n)** due to the additional size information maintained at each node.

### JavaScript Code (Augmented BST):

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.size = 1; // Keeps track of the size of the subtree rooted at this node
    }
}

class AugmentedBST {
    constructor() {
        this.root = null;
    }

    insert(data) {
        this.root = this._insert(this.root, data);
    }

    _insert(node, data) {
        if (node === null) {
            return new Node(data);
        }

        if (data < node.data) {
            node.left = this._insert(node.left, data);
        } else {
            node.right = this._insert(node.right, data);
        }

        node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
        return node;
    }

    _getSize(node) {
        return node ? node.size : 0;
    }

    findKthSmallest(k) {
        if (k < 1 || k > this._getSize(this.root)) {
            return null; // k is out of bounds
        }
        return this._findKthSmallest(this.root, k);
    }

    _findKthSmallest(node, k) {
        const leftSize = this._getSize(node.left);

        if (k === leftSize + 1) {
            return node.data; // Found the k-th smallest element
        } else if (k <= leftSize) {
            return this._findKthSmallest(node.left, k); // Search in the left subtree
        } else {
            return this._findKthSmallest(node.right, k - leftSize - 1); // Search in the right subtree
        }
    }
}

// Example usage
let bst = new AugmentedBST();
let arr = [7, 10, 4, 3, 20, 15];
arr.forEach(num => bst.insert(num));

let k = 3;
let result = bst.findKthSmallest(k);
console.log(`The ${k}th smallest element is ${result}`);
```

### Explanation:
1. **Node class**:
   - Each node stores the value `data`, pointers to `left` and `right` children, and a `size` attribute that represents the size of the subtree rooted at the current node.
   
2. **AugmentedBST class**:
   - **insert(data)**: Inserts a new element into the BST, updating the subtree sizes during the insertion process. This ensures that every node knows the size of the subtree rooted at itself.
   - **findKthSmallest(k)**: Recursively finds the k-th smallest element by comparing the size of the left subtree with `k`.
     - If `k` equals the size of the left subtree plus 1, the current node is the k-th smallest element.
     - If `k` is smaller than or equal to the size of the left subtree, we recursively search in the left subtree.
     - If `k` is larger, we search in the right subtree, adjusting `k` to account for the size of the left subtree.

### Time Complexity:
- **Insertion**: O(log n) in a balanced BST like an AVL tree or Red-Black tree.
- **Find k-th smallest**: O(log n) due to the size information maintained at each node.

### Example:

For the array `[7, 10, 4, 3, 20, 15]`, the tree is built as follows:
```
        7 (size: 6)
       / \
   4 (2)  10 (3)
   /      /  \
3 (1)   15 (1) 20 (1)
```
- To find the 3rd smallest element, it looks at the root (7) and checks that the left subtree size is 2. Since `k = 3`, the root (7) is the 3rd smallest element.

### Benefits:
- **Balanced BSTs** like AVL or Red-Black trees guarantee **O(log n)** time complexity for both insertion and querying for the k-th smallest element.

This approach is optimal for dynamic data (insertion, deletion) where maintaining sorted order is critical, and efficient querying is required.

Let me know if you'd like further details or clarification!



> ### Check BST is valid or not ( [Youtube video](https://www.youtube.com/watch?v=9btwHI_84DM&ab_channel=AnujBhaiya) )

A Binary Search Tree (BST) is a data structure where each node has at most two children. The left child node's value is smaller than the parent's, and the right child node's value is larger.

To check if a tree is a valid BST in JavaScript, you can perform an in-order traversal and ensure that the values of the nodes are in increasing order. Here's a sample function to check if a tree is a valid BST:

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function isValidBST(node, min = null, max = null) {
  // Base case: an empty node is a valid BST
  if (!node) return true;

  // Check if the current node violates the BST property
  if ((min !== null && node.value <= min) || (max !== null && node.value >= max)) {
    return false;
  }

  // Recursively check the left and right subtrees
  return isValidBST(node.left, min, node.value) && isValidBST(node.right, node.value, max);
}

// Example usage:

let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(20);

console.log(isValidBST(root)); // Output: true
```

### Explanation:
1. The function `isValidBST` takes three arguments: the current node (`node`), and optional `min` and `max` bounds.
2. For each node, it checks if the node's value lies within the valid range defined by `min` and `max`.
3. The function is called recursively for both left and right subtrees, updating the bounds accordingly.
4. If any node violates the BST property, it returns `false`; otherwise, it returns `true`.


> ### fix a BST with two nodes swapped

When two nodes in a Binary Search Tree (BST) are swapped by mistake, the tree no longer satisfies the BST property. To fix this, you need to identify the two swapped nodes and swap them back to restore the tree's properties.

Here's a solution to fix a BST with two swapped nodes in JavaScript. The approach leverages an in-order traversal to identify the two nodes that were swapped, since the in-order traversal of a valid BST should yield a sorted sequence of values.

### Steps:
1. Perform an in-order traversal of the tree.
2. During the traversal, identify two swapped nodes:
   - The first node is the first node where the value decreases (i.e., `prev > current`).
   - The second node is the node where the value is less than the previous node later in the traversal.
3. Swap their values to fix the tree.

### Code:

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function fixBST(root) {
  let first = null;
  let second = null;
  let prev = new TreeNode(-Infinity); // Initialize previous node to -Infinity

  function inorderTraversal(node) {
    if (!node) return;

    // Traverse left subtree
    inorderTraversal(node.left);

    // Find the two nodes that are swapped
    if (prev && node.value < prev.value) {
      // The first time we encounter the anomaly
      if (!first) {
        first = prev; // The first node that's out of order
      }
      // The second time we encounter the anomaly
      second = node; // The second node that's out of order
    }

    // Move the previous pointer to the current node
    prev = node;

    // Traverse right subtree
    inorderTraversal(node.right);
  }

  // Perform in-order traversal to find swapped nodes
  inorderTraversal(root);

  // Swap values of the two nodes to correct the BST
  if (first && second) {
    const temp = first.value;
    first.value = second.value;
    second.value = temp;
  }
}

// Example usage:

let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(8); // This should be 15
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(20); // This should be 8

// The tree is now invalid because nodes 8 and 15 are swapped
fixBST(root);

// After fixing, the tree should now be valid
function inorderPrint(node) {
  if (!node) return;
  inorderPrint(node.left);
  console.log(node.value);
  inorderPrint(node.right);
}

inorderPrint(root); // Output should be: 2, 5, 7, 10, 15, 20
```

### Explanation:
- **In-order Traversal**: The tree is traversed in-order (left -> node -> right). For a valid BST, the in-order traversal will result in values in increasing order.
- **Identify Swapped Nodes**: The algorithm detects two nodes that violate this order.
  - The first node (`first`) is identified when the current node value is less than the previous node value.
  - The second node (`second`) is identified later when the anomaly appears again.
- **Swap Values**: Once the two nodes are identified, their values are swapped to restore the BST property.

This solution ensures that the BST is corrected in `O(n)` time, where `n` is the number of nodes in the tree, and uses `O(h)` space, where `h` is the height of the tree.


> ### Pair with given sum in BST

To find if there exists a pair of nodes in a Binary Search Tree (BST) that sums to a given value, you can take advantage of the BST property, which allows you to traverse the tree in sorted order. Here are two possible approaches:

### 1. In-order Traversal + Two Pointers (Optimal Solution)

This approach uses in-order traversal to convert the BST into a sorted array, and then uses a two-pointer technique to find the pair that adds up to the target sum.

### Steps:
1. Perform an in-order traversal to extract the values of the BST in a sorted array.
2. Use the two-pointer technique on this array to find the pair with the given sum.

### Code:

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function findPairWithSumBST(root, target) {
  const inorder = [];

  // In-order traversal to collect node values in sorted order
  function inorderTraversal(node) {
    if (!node) return;
    inorderTraversal(node.left);
    inorder.push(node.value);
    inorderTraversal(node.right);
  }

  inorderTraversal(root);

  // Use two-pointer technique to find a pair with the given sum
  let left = 0;
  let right = inorder.length - 1;

  while (left < right) {
    const sum = inorder[left] + inorder[right];

    if (sum === target) {
      return [inorder[left], inorder[right]]; // Return the pair
    } else if (sum < target) {
      left++; // Move left pointer to increase sum
    } else {
      right--; // Move right pointer to decrease sum
    }
  }

  return null; // No pair found
}

// Example usage:

let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);
root.right.left = new TreeNode(12);
root.right.right = new TreeNode(18);

const targetSum = 22;
const result = findPairWithSumBST(root, targetSum);

if (result) {
  console.log(`Pair found: ${result[0]} and ${result[1]}`);
} else {
  console.log('No pair found');
}
```

### Explanation:
1. **In-order Traversal**: We traverse the tree in-order, which guarantees that the values will be sorted in ascending order.
2. **Two-pointer Technique**: Once we have the sorted array, we use two pointers (`left` and `right`). The `left` pointer starts from the beginning, and the `right` pointer starts from the end. We move them based on the sum of the values they point to:
   - If the sum is equal to the target, we return the pair.
   - If the sum is less than the target, we increment the `left` pointer to get a larger sum.
   - If the sum is greater than the target, we decrement the `right` pointer to get a smaller sum.

This approach runs in `O(n)` time for both the traversal and the two-pointer search, where `n` is the number of nodes in the tree. It also requires `O(n)` space for the array storing the in-order traversal.

### 2. Using HashSet (Alternative Approach)
Alternatively, you can use a HashSet to store the values you've seen so far as you traverse the tree. For each node, check if `target - currentNodeValue` exists in the set. If it does, you have found a pair.

Here's a code example for this approach:

```js
function findPairWithSumBSTUsingSet(root, target) {
  const set = new Set();

  function findPair(node) {
    if (!node) return false;

    // Check if the complement (target - node.value) exists in the set
    if (set.has(target - node.value)) {
      console.log(`Pair found: ${target - node.value} and ${node.value}`);
      return true;
    }

    // Add current node value to the set
    set.add(node.value);

    // Recursively check left and right subtrees
    return findPair(node.left) || findPair(node.right);
  }

  return findPair(root);
}

// Example usage:

const found = findPairWithSumBSTUsingSet(root, targetSum);

if (!found) {
  console.log('No pair found');
}
```

### Explanation:
- As you traverse the tree, you store each value in the set.
- For each node, you check if its complement (`target - node.value`) exists in the set. If it does, you have found a pair.
- This approach runs in `O(n)` time and uses `O(n)` space for the set.

Both approaches are efficient for finding a pair with a given sum in a BST, with the first approach being more structured for sorted traversal and the second being more direct.



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

> ### Below is for the GRAPH


> ### Tree vs Graph
![screenshot](images/treevsgraph.png)

> ### Direct vs Indirect Graph

![screenshot](images/directVSindirect.png)

> ### Weight VS Unweighted Graph

![screenshot](images/wightVSunweight.png)

> ### Graph Represenation  -  Adjacency Matrix
![screenshot](images/adjacencyMatrix.png)


> ### Graph Represenation  -  Adjacency List
![screenshot](images/adjacencyList.png)


```js

// Graphs are bidirectional,
// edge is line while vertics is point.
// when adjacency matrix is formed in graps, it is symmetrical in shape
// we have both type ie adjacency list and matrix, but for the code purpose and efficiency we use the adjacency List
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

    // https://youtu.be/dCvnjapI6ik?si=osd_nk716OwzbxA_
    // https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/
    bfs(start) {  
        const queue = [start]; // Initialize queue with the starting vertex
        const result = []; // To store the BFS traversal result
        const visited = {}; // To keep track of visited vertices
        visited[start] = true; // Mark the start vertex as visited

        while (queue.length) {
            let vertex = queue.shift(); // Dequeue a vertex
            result.push(vertex); // Add it to the result list

            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) { // If the neighbor hasn't been visited
                    visited[neighbor] = true; // Mark it as visited
                    queue.push(neighbor); // Enqueue the neighbor
                }
            });
        }

        return result;
    }

    // Recursive DFS
    // https://www.youtube.com/watch?v=0ql7lZS2qt0&ab_channel=AnujBhaiya
    // https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/
    dfsRecursive(start) {
        const result = []; // Store DFS result
        const visited = {}; // Track visited nodes

        const dfs = (vertex) => {
            if (!vertex) return null;
            visited[vertex] = true; // Mark as visited
            result.push(vertex); // Add to result

            // Recursively visit all neighbors
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            });
        };

        dfs(start); // Start DFS from the starting vertex
        return result;
    }

    // Iterative DFS
    dfsIterative(start) {
        const stack = [start]; // Use stack instead of queue
        const result = []; // Store DFS result
        const visited = {}; // Track visited nodes
        visited[start] = true;

        while (stack.length) {
            let vertex = stack.pop(); // Pop the vertex from the stack
            result.push(vertex);

            // Push all unvisited neighbors onto the stack
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true; 
                    stack.push(neighbor);
                }
            });
        }

        return result;
    }


    // Display the graph
    display() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex, ":", this.adjacencyList[vertex]);
        }
    }
}

// Example usage
let myGraph = new Graph();
myGraph.addVertex(0);
myGraph.addVertex(1);
myGraph.addVertex(2);
myGraph.addVertex(3);
myGraph.addVertex(4);
myGraph.addVertex(5);

myGraph.addEdge(0, 1);
myGraph.addEdge(0, 2);
myGraph.addEdge(1, 3);
myGraph.addEdge(1, 4);
myGraph.addEdge(4, 5);

console.log("Graph display:");
myGraph.display();

console.log("DFS Recursive:", myGraph.dfsRecursive(0)); // Expected Output: [0, 1, 3, 4, 5, 2]
console.log("DFS Iterative:", myGraph.dfsIterative(0)); // Expected Output: [0, 2, 1, 4, 5, 3]


```

> ### shortest path in unweight graph ( [Youtube video](https://www.youtube.com/watch?v=yysA7ZM2jjA&ab_channel=HelloWorld) )

```
https://www.youtube.com/watch?v=abIEXKFpLNE&ab_channel=CodeHelp-byBabbar
```

To find the **shortest path in an unweighted graph**, you can use **Breadth-First Search (BFS)**. Since all edges in an unweighted graph have the same weight, BFS guarantees the shortest path by visiting nodes layer by layer.

### BFS for Shortest Path

Here’s how you can modify your existing `Graph` class to implement the shortest path using BFS:

```javascript
class Graph {
    constructor(){
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex1].push(vertex2);
            this.adjacencyList[vertex2].push(vertex1);
        }
    }

    // BFS for Shortest Path
    shortestPath(start, target) {
        const queue = [[start]];  // Initialize queue with the start vertex as a path
        const visited = new Set();  // To track visited vertices
        visited.add(start);

        while (queue.length) {
            const path = queue.shift();  // Get the first path from the queue
            const vertex = path[path.length - 1];  // Get the last vertex from the path

            // If the last vertex is the target, return the path (shortest path)
            if (vertex === target) {
                return path;
            }

            // Loop through the neighbors of the current vertex
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited.has(neighbor)) {  // If neighbor hasn't been visited
                    visited.add(neighbor);  // Mark it as visited
                    const newPath = [...path, neighbor];  // Create a new path with this neighbor
                    queue.push(newPath);  // Add the new path to the queue
                }
            });
        }

        return null;  // Return null if no path found
    }

    // Display the graph
    display() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex, ":", this.adjacencyList[vertex]);
        }
    }
}

// Example usage
let myGraph = new Graph();
myGraph.addVertex(0);
myGraph.addVertex(1);
myGraph.addVertex(2);
myGraph.addVertex(3);
myGraph.addVertex(4);
myGraph.addVertex(5);

myGraph.addEdge(0, 1);
myGraph.addEdge(0, 2);
myGraph.addEdge(1, 3);
myGraph.addEdge(1, 4);
myGraph.addEdge(4, 5);

console.log("Graph display:");
myGraph.display();

console.log("Shortest path from 0 to 5:", myGraph.shortestPath(0, 5));  // Expected Output: [0, 1, 4, 5]
```

### Explanation:
1. **`queue = [[start]]`**: The queue holds paths, not just vertices. Initially, the path only contains the start vertex.
2. **Visited Set**: Keeps track of visited vertices to avoid cycles.
3. **BFS Process**: 
   - Dequeue a path, check its last vertex.
   - If this vertex is the target, the path is returned as it represents the shortest path.
   - Otherwise, for each neighbor, a new path is created and added to the queue.
4. **Termination**: The algorithm stops once the target is found, ensuring the shortest path is returned. If no path is found, it returns `null`.

This BFS-based approach ensures that the first time the target vertex is found, you get the shortest path in terms of the number of edges.


> ### Topological sort of graph using DFS  ( [Youtube video](https://www.youtube.com/watch?v=T_boOrr0rvk&ab_channel=CodeHelp-byBabbar) )

**Topological sorting** is an algorithm used for **Directed Acyclic Graphs (DAGs)**. It orders the vertices in such a way that for every directed edge `u -> v`, vertex `u` comes before vertex `v`. A common way to perform topological sorting is through **DFS** (Depth-First Search).

Here’s how you can implement **topological sorting** in your `Graph` class using DFS:

### Topological Sort Using DFS:

```javascript
class Graph {
    constructor(){
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex1].push(vertex2); // Directed edge from vertex1 to vertex2
        }
    }

    // Topological Sort using DFS
    topologicalSort() {
        const visited = new Set();  // Track visited nodes
        const stack = [];  // To store the topologically sorted elements

        const dfs = (vertex) => {
            visited.add(vertex);  // Mark the vertex as visited

            // Visit all its neighbors (adjacent vertices)
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    dfs(neighbor);  // Recursively visit unvisited neighbors
                }
            });

            stack.push(vertex);  // Push the vertex onto the stack after visiting its neighbors
        };

        // Perform DFS on each vertex
        for (let vertex in this.adjacencyList) {
            if (!visited.has(vertex)) {
                dfs(vertex);
            }
        }

        // The stack contains the topological order in reverse
        return stack.reverse();  // Reverse to get the correct topological order
    }

    // Display the graph
    display() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex, ":", this.adjacencyList[vertex]);
        }
    }
}

// Example usage
let myGraph = new Graph();
myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.addVertex("C");
myGraph.addVertex("D");
myGraph.addVertex("E");
myGraph.addVertex("F");

myGraph.addEdge("A", "D");
myGraph.addEdge("F", "B");
myGraph.addEdge("B", "D");
myGraph.addEdge("F", "A");
myGraph.addEdge("D", "C");

console.log("Graph display:");
myGraph.display();

console.log("Topological Sort:", myGraph.topologicalSort());  // Expected Output: [ 'F', 'A', 'B', 'D', 'C' ]
```

### Explanation:
1. **Graph Representation**: The graph is represented as an adjacency list, where each vertex has a directed edge pointing to its neighbors.
2. **DFS for Topological Sort**:
   - **Visited Set**: A set is used to track visited vertices.
   - **Stack**: The stack keeps track of the vertices in reverse order of their completion (i.e., when all neighbors have been processed).
   - For each vertex, if it hasn’t been visited, perform DFS on it, and once its neighbors are processed, push it onto the stack.
   - After visiting all vertices, the stack contains the vertices in topological order (but in reverse, so we reverse it at the end).
3. **Cycle Handling**: This method works for **Directed Acyclic Graphs (DAGs)**. If there's a cycle in the graph, topological sorting is not possible, and the algorithm should be adjusted to detect cycles in such cases (can be done by checking for back edges).

### Example:
In the above example, the graph has the following structure:

```
F → A → D → C
    ↓    ↑
    B ← F
```

The topological sort outputs a valid order like `[ 'F', 'A', 'B', 'D', 'C' ]`, which respects the directed edges in the graph.

### Time Complexity:
- The time complexity is \(O(V + E)\), where \(V\) is the number of vertices and \(E\) is the number of edges, as it performs DFS for each vertex and processes each edge once.



> ### Topological sorting using kahn's alogorithm ie BFS alogrithm approach ( [Youtube video](https://www.youtube.com/watch?v=6XmzL04mlgQ&ab_channel=CodeHelp-byBabbar) )


### Kahn's Algorithm for Topological Sorting

**Kahn's Algorithm** is a method to perform **topological sorting** of a **Directed Acyclic Graph (DAG)** using **BFS (Breadth-First Search)**. The algorithm works by repeatedly removing vertices with no incoming edges (in-degree = 0) and adding them to the topological order. This guarantees that for every directed edge `u -> v`, vertex `u` appears before vertex `v` in the topological order.

### Steps in Kahn's Algorithm:
1. **Calculate In-degree**: For each vertex in the graph, calculate its in-degree (the number of incoming edges).
   
2. **Initialize Queue**: Enqueue all vertices with an in-degree of `0` (these are the starting points that don't depend on any other vertices).

3. **Process Queue**: While the queue is not empty:
   - Dequeue a vertex and add it to the topological ordering.
   - For each neighbor (vertex pointed to by the dequeued vertex), reduce its in-degree by 1. If the in-degree of any neighbor becomes `0`, enqueue that neighbor.

4. **Check for Cycles**: Once the queue is empty, if the topological order contains all vertices, the graph is a DAG and the order is valid. If not, the graph contains a cycle (as some vertices will still have non-zero in-degrees).

### Example

```javascript
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1]) {
            this.adjacencyList[vertex1].push(vertex2); // Directed edge from vertex1 to vertex2
        }
    }

    // Kahn's Algorithm for Topological Sorting
    topologicalSort() {
        const inDegree = {};  // Stores the in-degree of each vertex
        const queue = [];  // Queue for vertices with in-degree 0
        const topologicalOrder = [];  // Result array

        // Initialize in-degree of each vertex to 0
        for (let vertex in this.adjacencyList) {
            inDegree[vertex] = 0;
        }

        // Calculate in-degree of each vertex
        for (let vertex in this.adjacencyList) {
            this.adjacencyList[vertex].forEach(neighbor => {
                inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
            });
        }

        // Enqueue vertices with in-degree 0
        for (let vertex in inDegree) {
            if (inDegree[vertex] === 0) {
                queue.push(vertex);
            }
        }

        // Process the queue
        while (queue.length > 0) {
            const currentVertex = queue.shift();  // Dequeue a vertex with in-degree 0
            topologicalOrder.push(currentVertex);  // Add it to the topological order

            // For each neighbor, reduce its in-degree by 1
            this.adjacencyList[currentVertex].forEach(neighbor => {
                inDegree[neighbor] -= 1;
                // If in-degree becomes 0, add the neighbor to the queue
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            });
        }

        // If the topological order doesn't contain all vertices, there is a cycle
        if (topologicalOrder.length !== Object.keys(this.adjacencyList).length) {
            return "Graph has a cycle!";
        }

        return topologicalOrder;
    }
}

// Example usage
let myGraph = new Graph();
myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.addVertex("C");
myGraph.addVertex("D");
myGraph.addVertex("E");
myGraph.addVertex("F");

myGraph.addEdge("A", "D");
myGraph.addEdge("F", "B");
myGraph.addEdge("B", "D");
myGraph.addEdge("F", "A");
myGraph.addEdge("D", "C");

console.log("Graph display:");
myGraph.display();

console.log("Topological Sort:", myGraph.topologicalSort());  // Expected Output: [ 'F', 'A', 'B', 'D', 'C' ]
```

### Explanation:
1. **In-degree Calculation**:
   - For each vertex, the in-degree is calculated by counting how many incoming edges it has. This is stored in the `inDegree` object.
   - Vertices with no incoming edges (in-degree = 0) are the ones that can be processed immediately.
   
2. **Queue Initialization**:
   - A queue is initialized with all vertices that have an in-degree of `0`, meaning they do not depend on any other vertex.

3. **Processing Vertices**:
   - Vertices are dequeued one by one, and for each dequeued vertex, its neighbors’ in-degrees are reduced by 1 (as their incoming edges are effectively "removed").
   - If a neighbor’s in-degree becomes 0, it is enqueued since it can now be processed.

4. **Cycle Detection**:
   - If the topological sort contains fewer vertices than the total number of vertices in the graph, there is a cycle, meaning that not all vertices could be sorted.

### Time Complexity:
- **Time Complexity**: \( O(V + E) \), where \( V \) is the number of vertices and \( E \) is the number of edges. The algorithm visits every vertex and edge once.
  
### Space Complexity:
- **Space Complexity**: \( O(V) \), since we store the in-degree for each vertex and use a queue for vertices with in-degree 0.

### Key Points:
- Kahn's Algorithm is used to perform topological sorting of a **DAG** using **BFS**.
- It ensures that for every directed edge `u -> v`, vertex `u` comes before vertex `v` in the topological order.
- It can also detect cycles, as a cycle in the graph will prevent some vertices from having in-degree 0, causing the algorithm to fail.


> ### Detect Cycle in Undirected Graph  ( [Youtube video](https://www.youtube.com/watch?v=UPfUFoWjk5w&t=402s&ab_channel=AnujBhaiya) )

To detect a cycle in an **undirected graph**, you can use either **Depth-First Search (DFS)** or **Union-Find (Disjoint Set)** methods. Below, I will explain both approaches for cycle detection in undirected graphs.

### 1. **Cycle Detection Using DFS**

The idea behind using **DFS** for cycle detection is that if you revisit a vertex that has already been visited and it is not the parent of the current vertex, then a cycle exists.

#### Steps:
- Perform DFS traversal.
- Keep track of visited nodes.
- If you find a neighbor that has been visited and is not the parent of the current node, a cycle is detected.

#### Code:

```javascript
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex1].push(vertex2);
            this.adjacencyList[vertex2].push(vertex1);  // Undirected graph, so add edge in both directions
        }
    }

    // Detect cycle using DFS
    hasCycleDFS() {
        const visited = new Set();  // Track visited vertices

        const dfs = (vertex, parent) => {
            visited.add(vertex);  // Mark the current vertex as visited

            // Traverse neighbors
            for (let neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    if (dfs(neighbor, vertex)) return true;  // Recursively visit unvisited neighbors
                }
                // If the neighbor is visited and it's not the parent, we have a cycle
                else if (neighbor !== parent) {
                    return true;
                }
            }
            return false;
        };

        // Loop through all vertices to handle disconnected components
        for (let vertex in this.adjacencyList) {
            if (!visited.has(vertex)) {
                if (dfs(vertex, null)) return true;  // Start DFS from unvisited vertex
            }
        }

        return false;  // No cycle found
    }

    // Display the graph
    display() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex, ":", this.adjacencyList[vertex]);
        }
    }
}

// Example usage
let myGraph = new Graph();
myGraph.addVertex("0");
myGraph.addVertex("1");
myGraph.addVertex("2");
myGraph.addVertex("3");

myGraph.addEdge("0", "1");
myGraph.addEdge("1", "2");
myGraph.addEdge("2", "0");  // Creates a cycle
myGraph.addEdge("1", "3");

console.log("Graph display:");
myGraph.display();

console.log("Cycle detected using DFS:", myGraph.hasCycleDFS());  // Expected Output: true
```

### Explanation:
1. **DFS Traversal**: The DFS traversal starts from a vertex, marks it as visited, and then recursively explores its neighbors.
2. **Cycle Detection**: During traversal, if you encounter a visited vertex that is not the parent of the current vertex, it indicates a cycle.
3. **Handling Disconnected Graphs**: The algorithm checks each component in case the graph is disconnected.

### Time Complexity:
- **Time Complexity**: \(O(V + E)\), where \(V\) is the number of vertices and \(E\) is the number of edges, because we visit each vertex and edge once.


> ### Detect Cycle in directed Graph ( [Youtube video](https://www.youtube.com/watch?v=GLxfoaZlRqs&t=64s&ab_channel=AnujBhaiya) )

To detect a cycle in a **directed graph**, there are two common methods:

1. **Depth-First Search (DFS) with Recursion Stack**
2. **Kahn's Algorithm (Using Topological Sorting)**

### 1. **Cycle Detection Using DFS (Recursion Stack)**

In this method, we use a modified DFS traversal where we keep track of the recursion stack (the vertices currently being explored). If we revisit a vertex that is already in the recursion stack, it means there is a back edge, and hence a cycle exists.

#### Steps:
1. Perform DFS traversal of the graph.
2. Maintain a `visited` array to track whether a vertex has been visited.
3. Maintain a `recStack` (recursion stack) array to track vertices in the current path of recursion.
4. If you find a vertex that is already in the recursion stack, a cycle is detected.

#### Code:

```javascript
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1]) {
            this.adjacencyList[vertex1].push(vertex2);  // Directed edge from vertex1 to vertex2
        }
    }

    // Detect cycle using DFS
    hasCycleDFS() {
        const visited = {};  // Track visited vertices
        const recStack = {}; // Track vertices in the current recursion stack

        // Helper function for DFS traversal
        const dfs = (vertex) => {
            if (!visited[vertex]) {
                visited[vertex] = true;
                recStack[vertex] = true;

                // Traverse neighbors
                for (let neighbor of this.adjacencyList[vertex]) {
                    // If the neighbor is not visited, recursively visit it
                    if (!visited[neighbor] && dfs(neighbor)) {
                        return true;
                    }
                    // If the neighbor is in the recursion stack, we found a cycle
                    else if (recStack[neighbor]) {
                        return true;
                    }
                }
            }

            recStack[vertex] = false;  // Remove vertex from recursion stack when done
            return false;
        };

        // Check each vertex for a cycle
        for (let vertex in this.adjacencyList) {
            if (dfs(vertex)) return true;
        }

        return false;  // No cycle found
    }

    // Display the graph
    display() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex, ":", this.adjacencyList[vertex]);
        }
    }
}

// Example usage
let myGraph = new Graph();
myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.addVertex("C");
myGraph.addVertex("D");

myGraph.addEdge("A", "B");
myGraph.addEdge("B", "C");
myGraph.addEdge("C", "A");  // This edge creates a cycle
myGraph.addEdge("B", "D");

console.log("Graph display:");
myGraph.display();

console.log("Cycle detected using DFS:", myGraph.hasCycleDFS());  // Expected Output: true
```

### Explanation:
1. **DFS Traversal**: For each vertex, the algorithm performs a DFS to explore all its neighbors recursively.
2. **Recursion Stack**: The recursion stack helps keep track of the vertices currently being visited. If a back edge is found (i.e., revisiting a vertex that’s still in the recursion stack), a cycle is detected.
3. **Cycle Detection**: If any back edge is found during DFS traversal, a cycle exists in the graph.

### Time Complexity:
- **Time Complexity**: \(O(V + E)\), where \(V\) is the number of vertices and \(E\) is the number of edges. The graph is traversed once for DFS.
  
---

### 2. **Cycle Detection Using Kahn's Algorithm (Topological Sorting)**

Another approach is to use **Kahn's Algorithm**, which is based on topological sorting. The idea is that if the graph contains a cycle, it is **impossible** to create a valid topological order. So, if you cannot sort all the vertices, a cycle exists.

#### Steps:
1. **In-degree Calculation**: Calculate the in-degree (number of incoming edges) of each vertex.
2. **Queue Initialization**: Enqueue all vertices with in-degree 0 (starting points).
3. **Process Queue**: Dequeue a vertex, reduce the in-degree of its neighbors by 1, and enqueue any neighbors whose in-degree becomes 0.
4. **Cycle Detection**: If not all vertices can be processed (i.e., if the topological order doesn’t include all vertices), a cycle exists.

#### Code:

```javascript
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1]) {
            this.adjacencyList[vertex1].push(vertex2);  // Directed edge from vertex1 to vertex2
        }
    }

    // Detect cycle using Kahn's Algorithm (Topological Sort)
    hasCycleKahns() {
        const inDegree = {};  // Track in-degree of each vertex
        const queue = [];     // Queue for vertices with in-degree 0
        let visitedCount = 0; // Count of vertices added to the topological sort

        // Initialize in-degree of each vertex
        for (let vertex in this.adjacencyList) {
            inDegree[vertex] = 0;
        }

        // Calculate in-degree of each vertex
        for (let vertex in this.adjacencyList) {
            this.adjacencyList[vertex].forEach(neighbor => {
                inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
            });
        }

        // Enqueue all vertices with in-degree 0
        for (let vertex in inDegree) {
            if (inDegree[vertex] === 0) {
                queue.push(vertex);
            }
        }

        // Process the vertices in the queue
        while (queue.length > 0) {
            const currentVertex = queue.shift();
            visitedCount++;

            // Reduce in-degree of neighbors and enqueue if their in-degree becomes 0
            this.adjacencyList[currentVertex].forEach(neighbor => {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            });
        }

        // If not all vertices are visited, the graph has a cycle
        return visitedCount !== Object.keys(this.adjacencyList).length;
    }

    // Display the graph
    display() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex, ":", this.adjacencyList[vertex]);
        }
    }
}

// Example usage
let myGraph = new Graph();
myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.addVertex("C");
myGraph.addVertex("D");

myGraph.addEdge("A", "B");
myGraph.addEdge("B", "C");
myGraph.addEdge("C", "A");  // This edge creates a cycle
myGraph.addEdge("B", "D");

console.log("Graph display:");
myGraph.display();

console.log("Cycle detected using Kahn's Algorithm:", myGraph.hasCycleKahns());  // Expected Output: true
```

### Explanation:
1. **In-degree Calculation**: First, the in-degree (number of incoming edges) of each vertex is calculated.
2. **Processing Queue**: All vertices with in-degree 0 are enqueued. These are vertices with no dependencies, so they can be safely processed.
3. **Cycle Detection**: As you process vertices, you reduce the in-degrees of their neighbors. If you cannot process all vertices, it means there are some vertices with in-degrees that never reached 0, indicating a cycle.

### Time Complexity:
- **Time Complexity**: \(O(V + E)\), where \(V\) is the number of vertices and \(E\) is the number of edges.

---

### Summary:

- **DFS with Recursion Stack**: Detects a cycle by tracking vertices in the current recursion stack. It’s easier to understand and implement.
- **Kahn's Algorithm (Topological Sort)**: Uses in-degree calculations and topological sorting to detect cycles. If not all vertices can be processed, a cycle exists.

Both methods are effective for detecting cycles in **directed graphs**, but they work differently depending on the context of your problem.


> ### shortest path in DAG ( [Youtube video](https://youtu.be/BNpWnXUhMC4?si=m_JJ4olsiBTj8fdL) )

To find the **shortest path in a Directed Acyclic Graph (DAG)**, we can use **Topological Sorting** combined with **dynamic programming**. Since the graph is acyclic, topological sorting ensures that we process each vertex before its descendants, allowing us to calculate the shortest paths in a single pass.

### Steps:
1. **Topologically sort the graph**: This gives us a linear ordering of the vertices.
2. **Relax edges**: Once we have the topological order, iterate over the vertices in this order and update the shortest distance to each of its neighbors.

### Algorithm:
1. **Initialize distances**: Set the distance to the source node to 0 and to all other nodes to infinity.
2. **Topological sort**: Perform a topological sort of the DAG.
3. **Relax edges**: For each vertex in topological order, update the distance to its neighbors if a shorter path is found.
4. **Output shortest paths**: After processing all vertices, the shortest distances from the source node to all other nodes will be computed.

### Code:

```javascript
class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList.get(vertex1).push({ node: vertex2, weight: weight });
    }

    // Helper function for topological sorting using DFS
    topologicalSortUtil(vertex, visited, stack) {
        visited[vertex] = true;

        // Visit all neighbors of the current vertex
        let neighbors = this.adjacencyList.get(vertex);
        for (let neighbor of neighbors) {
            if (!visited[neighbor.node]) {
                this.topologicalSortUtil(neighbor.node, visited, stack);
            }
        }

        // Push the current vertex to the stack after visiting all neighbors
        stack.push(vertex);
    }

    // Topological sort of the graph
    topologicalSort() {
        let stack = [];
        let visited = {};
        for (let i of this.adjacencyList.keys()) {
            visited[i] = false;
        }

        // Call the recursive helper function for topological sort for each vertex
        for (let i of this.adjacencyList.keys()) {
            if (!visited[i]) {
                this.topologicalSortUtil(i, visited, stack);
            }
        }

        // Return stack in reverse order
        return stack.reverse();
    }

    // Shortest path in DAG
    shortestPath(source) {
        let stack = this.topologicalSort();
        let distances = {};

        // Initialize distances to all vertices as infinity, and the source vertex as 0
        for (let vertex of this.adjacencyList.keys()) {
            distances[vertex] = Infinity;
        }
        distances[source] = 0;

        // Process vertices in topological order
        while (stack.length) {
            let currentVertex = stack.shift();  // Get the next vertex from the stack

            // Update the distance of all adjacent vertices of the dequeued vertex
            if (distances[currentVertex] !== Infinity) {
                for (let neighbor of this.adjacencyList.get(currentVertex)) {
                    let newDistance = distances[currentVertex] + neighbor.weight;
                    if (newDistance < distances[neighbor.node]) {
                        distances[neighbor.node] = newDistance;
                    }
                }
            }
        }

        return distances;
    }
}

// Example usage
let graph = new Graph(6);
graph.addVertex("0");
graph.addVertex("1");
graph.addVertex("2");
graph.addVertex("3");
graph.addVertex("4");
graph.addVertex("5");

graph.addEdge("0", "1", 5);
graph.addEdge("0", "2", 3);
graph.addEdge("1", "3", 6);
graph.addEdge("1", "2", 2);
graph.addEdge("2", "4", 4);
graph.addEdge("2", "5", 2);
graph.addEdge("2", "3", 7);
graph.addEdge("3", "5", 1);
graph.addEdge("4", "5", 6);

let shortestPaths = graph.shortestPath("0");
console.log("Shortest distances from source vertex 0:", shortestPaths);
```

### Explanation:

1. **Graph Initialization**: The graph is represented using an adjacency list where each vertex has a list of neighbors with associated weights.
2. **Topological Sort**: A helper function `topologicalSortUtil` is used to recursively perform a DFS and push vertices onto a stack in post-order. The vertices are processed in the reverse order of the stack to guarantee that each vertex is processed before its descendants.
3. **Relaxation**: For each vertex in the topologically sorted order, we check each neighbor and update its shortest distance using dynamic programming.
4. **Result**: The `shortestPath` function computes the shortest distances from the source vertex to every other vertex in the DAG.

### Example Output:
```
Shortest distances from source vertex 0:
{ '0': 0, '1': 5, '2': 3, '3': 11, '4': 7, '5': 10 }
```

### Time Complexity:
- **Topological Sorting**: \(O(V + E)\), where \(V\) is the number of vertices and \(E\) is the number of edges.
- **Relaxation**: \(O(V + E)\), since we process each vertex and its adjacent edges once.

Thus, the total time complexity is \(O(V + E)\).

### Notes:
- **No negative-weight cycles**: Since the graph is a DAG, we don’t have to worry about negative-weight cycles, making this approach efficient and straightforward.
- **Applicability**: This algorithm is ideal for tasks scheduling, dependency resolution, and other problems where tasks are represented as a DAG.


> ### Prim's Algorithm | Minimum Spanning Tree  ( [Youtube video](https://www.youtube.com/watch?v=kXiqvMykeJA&t=214s&ab_channel=AnujBhaiya) )

**Prim's Algorithm** is a greedy algorithm that is used to find the **Minimum Spanning Tree (MST)** for a weighted, undirected graph. The Minimum Spanning Tree of a graph is a subset of edges that connects all vertices together without any cycles and with the minimum possible total edge weight.

### Steps of Prim's Algorithm:
1. **Start with any vertex**: Begin with an arbitrary vertex as part of the MST.
2. **Grow the MST**: At each step, add the smallest edge that connects a vertex in the MST to a vertex outside the MST.
3. **Repeat**: Continue the process until all vertices are included in the MST.

### Key Points:
- The algorithm maintains two sets of vertices:
  1. **Vertices included in the MST** (already processed).
  2. **Vertices not yet included** (yet to be processed).
- At each iteration, Prim's algorithm picks the vertex with the minimum edge weight that connects a vertex in the MST with a vertex outside the MST.

### Algorithm:
1. Create a **min-heap** or use a priority queue to always pick the smallest edge weight.
2. Keep a **visited** set to track the vertices already added to the MST.
3. Keep updating the edge weights of adjacent vertices and choose the smallest one.

### Prim's Algorithm in JavaScript:

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node, key) {
        this.heap.push({ node, key });
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];
            if (element.key >= parent.key) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return min;
    }

    sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.key < element.key) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.key < element.key) ||
                    (swap !== null && rightChild.key < leftChild.key)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList.get(vertex1).push({ node: vertex2, weight });
        this.adjacencyList.get(vertex2).push({ node: vertex1, weight });
    }

    // Prim's algorithm for Minimum Spanning Tree (MST)
    primMST() {
        const minHeap = new MinHeap();
        const mstSet = new Set();  // Tracks vertices included in the MST
        const parent = {};         // Stores the MST edges
        const key = {};            // Stores the minimum weight edge for each vertex

        // Initialize the key of all vertices to infinity and pick the first vertex as the starting point
        for (let vertex of this.adjacencyList.keys()) {
            key[vertex] = Infinity;
            parent[vertex] = null;
        }

        // Start from an arbitrary vertex (let's pick the first one)
        let startVertex = [...this.adjacencyList.keys()][0];
        key[startVertex] = 0;
        minHeap.insert(startVertex, 0);

        while (!minHeap.isEmpty()) {
            let { node: currentVertex } = minHeap.extractMin();

            // If the current vertex is already in the MST set, skip it
            if (mstSet.has(currentVertex)) continue;

            // Add the current vertex to the MST set
            mstSet.add(currentVertex);

            // Process all the adjacent vertices of the current vertex
            let neighbors = this.adjacencyList.get(currentVertex);
            for (let neighbor of neighbors) {
                let { node: adjacentVertex, weight } = neighbor;

                // If adjacent vertex is not in the MST and the current edge is the smallest so far, update the key
                if (!mstSet.has(adjacentVertex) && weight < key[adjacentVertex]) {
                    key[adjacentVertex] = weight;
                    parent[adjacentVertex] = currentVertex;
                    minHeap.insert(adjacentVertex, weight);
                }
            }
        }

        // Print the resulting MST
        for (let vertex in parent) {
            if (parent[vertex] !== null) {
                console.log(`Edge: ${parent[vertex]} - ${vertex}, Weight: ${key[vertex]}`);
            }
        }
    }
}

// Example Usage
let graph = new Graph(5);
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdge('A', 'B', 2);
graph.addEdge('A', 'C', 3);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 1);
graph.addEdge('C', 'D', 5);
graph.addEdge('B', 'E', 4);
graph.addEdge('D', 'E', 2);

graph.primMST();
```

### Output:

```
Edge: A - B, Weight: 2
Edge: B - C, Weight: 1
Edge: B - D, Weight: 1
Edge: D - E, Weight: 2
```

### Explanation:

1. **Graph Representation**: The graph is represented as an adjacency list, where each vertex stores a list of neighbors and the weight of the edge connecting them.
   
2. **Priority Queue (Min-Heap)**: Prim's algorithm uses a **min-heap** to efficiently extract the vertex with the smallest edge weight. In each iteration, it picks the vertex with the smallest key value that has not yet been added to the MST.
   
3. **Key and Parent Arrays**: 
   - The `key` array keeps track of the minimum edge weight for each vertex.
   - The `parent` array keeps track of the parent of each vertex in the MST, helping us reconstruct the tree.

4. **MST Construction**: The algorithm starts from an arbitrary vertex and grows the MST by adding the smallest edge connecting a new vertex to the tree at each step.

### Time Complexity:

- **Min-Heap operations**: Insert and extract-min operations take \(O(\log V)\) time.
- **Total Complexity**: \(O((V + E) \log V)\), where \(V\) is the number of vertices and \(E\) is the number of edges.

### Notes:
- Prim's algorithm is efficient for dense graphs.
- It’s similar to **Dijkstra’s algorithm**, but instead of finding the shortest paths from a source to all vertices, it finds the minimum spanning tree.



> ### Dijkstra's Algorithm | Single Source Shortest Path Algorithm in Graph  ( [Youtube video](https://www.youtube.com/watch?v=wjxCG6dOwcY&ab_channel=AnujBhaiya) )


**Dijkstra's Algorithm** is a greedy algorithm used to find the **shortest path** from a **single source vertex** to all other vertices in a weighted graph. Unlike Prim's algorithm (which is used for Minimum Spanning Trees), Dijkstra's algorithm finds the shortest path between the source node and all other nodes.

### Key Concepts:
- **Single Source Shortest Path**: It calculates the minimum cost (shortest path) from a starting vertex (source) to all other vertices.
- **Non-negative edge weights**: Dijkstra’s algorithm assumes that all edge weights are non-negative. For graphs with negative weights, **Bellman-Ford algorithm** is used.
- **Priority Queue/Min-Heap**: This helps to efficiently get the next vertex with the minimum distance.

### How Dijkstra's Algorithm Works:
1. **Initialize distances**: Set the distance to the source vertex to 0, and to all other vertices as infinity.
2. **Use a priority queue (min-heap)**: This is used to always process the vertex with the smallest known distance.
3. **Relax edges**: For each vertex, check all of its neighbors. If the distance through the current vertex is smaller than the previously known distance, update the distance.
4. **Repeat until all vertices are processed**: Continue until the priority queue is empty.

### Algorithm:

1. **Initialization**:
   - Set the distance of the source vertex to 0 and all other vertices to infinity.
   - Insert the source vertex into a priority queue (min-heap).

2. **Processing**:
   - Extract the vertex with the minimum distance from the priority queue.
   - Update the distances to its neighbors if a shorter path is found (relax the edges).
   - Insert the updated neighbors into the priority queue.

3. **Termination**:
   - The algorithm finishes when all vertices have been processed and their shortest distances have been found.

### Dijkstra's Algorithm in JavaScript:

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node, distance) {
        this.heap.push({ node, distance });
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];
            if (element.distance >= parent.distance) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return min;
    }

    sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.distance < element.distance) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.distance < element.distance) ||
                    (swap !== null && rightChild.distance < leftChild.distance)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList.get(vertex1).push({ node: vertex2, weight });
        this.adjacencyList.get(vertex2).push({ node: vertex1, weight });  // Remove this for directed graphs
    }

    // Dijkstra's Algorithm
    dijkstra(source) {
        let distances = {};
        let previous = {};
        let minHeap = new MinHeap();

        // Initialize distances and previous
        for (let vertex of this.adjacencyList.keys()) {
            distances[vertex] = Infinity;
            previous[vertex] = null;
        }
        distances[source] = 0;
        minHeap.insert(source, 0);

        // While the min-heap is not empty
        while (!minHeap.isEmpty()) {
            let { node: currentVertex, distance: currentDistance } = minHeap.extractMin();

            // If the current distance is greater than the recorded distance, skip
            if (currentDistance > distances[currentVertex]) continue;

            // Process all neighbors of the current vertex
            for (let neighbor of this.adjacencyList.get(currentVertex)) {
                let distance = currentDistance + neighbor.weight;

                // Only consider this path if it's shorter
                if (distance < distances[neighbor.node]) {
                    distances[neighbor.node] = distance;
                    previous[neighbor.node] = currentVertex;
                    minHeap.insert(neighbor.node, distance);
                }
            }
        }

        return { distances, previous };
    }

    // Helper function to print the shortest path from source to target
    printPath(previous, target) {
        let path = [];
        let currentNode = target;
        while (currentNode !== null) {
            path.unshift(currentNode);
            currentNode = previous[currentNode];
        }
        console.log(`Shortest path to ${target}:`, path.join(" -> "));
    }
}

// Example Usage
let graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "C", 5);
graph.addEdge("B", "D", 10);
graph.addEdge("C", "D", 3);
graph.addEdge("C", "E", 8);
graph.addEdge("D", "E", 1);

let result = graph.dijkstra("A");
console.log("Distances:", result.distances);  // Shortest distances from source to all vertices
graph.printPath(result.previous, "D");        // Print the shortest path from A to D
```

### Output:

```
Distances: { A: 0, B: 4, C: 2, D: 5, E: 6 }
Shortest path to D: A -> C -> D
```

### Explanation:
- **Graph Representation**: The graph is represented using an adjacency list, where each vertex stores a list of its neighbors along with the edge weight.
  
- **Dijkstra's Algorithm**:
  1. **Distances**: A dictionary keeps track of the shortest distance to each vertex from the source.
  2. **Min-Heap**: The min-heap (or priority queue) allows for efficient extraction of the vertex with the smallest distance.
  3. **Relaxation**: For each vertex, the distances to its neighbors are updated (relaxed) if a shorter path is found.
  4. **Previous Array**: This keeps track of the parent vertex for each node, allowing the shortest path to be reconstructed later.

### Time Complexity:
- **Min-Heap operations**: Insertion and extraction from the min-heap take \(O(\log V)\).
- **Relaxation**: Each vertex and its adjacent edges are processed once, taking \(O(V + E)\), where \(V\) is the number of vertices and \(E\) is the number of edges.
  
Total time complexity: \(O((V + E) \log V)\).

### Notes:
- **Directed/Undirected Graph**: Dijkstra's algorithm works for both directed and undirected graphs.
- **Non-negative weights**: It requires non-negative edge weights. If the graph contains negative weights, use the **Bellman-Ford algorithm**.
- **Applications**: Dijkstra’s algorithm is widely used in network routing, mapping systems, and other shortest path problems.


> ### Kosaraju's Algorithm for Strongly Connected Components   ( [Youtube video](https://www.youtube.com/watch?v=ndfjV_yHpgQ&ab_channel=CodeHelp-byBabbar) )


**Kosaraju's Algorithm** is an efficient method for finding **Strongly Connected Components (SCCs)** in a directed graph. A **Strongly Connected Component** is a subgraph in which every vertex is reachable from every other vertex. The algorithm works in **O(V + E)** time, where \(V\) is the number of vertices and \(E\) is the number of edges.

### Steps of Kosaraju's Algorithm:

1. **Perform a Depth First Search (DFS)** on the original graph** and maintain a stack** of vertices in the order of their **finishing times** (when DFS finishes processing a vertex, push it to the stack). This ensures that vertices are processed in a decreasing order of their finishing times.
   
2. **Transpose the graph** (reverse the direction of all edges). This step creates a new graph where all edges are reversed.

3. **Perform DFS on the transposed graph** in the order of the vertices in the stack. The vertices processed together during this DFS form a Strongly Connected Component (SCC).

### Kosaraju's Algorithm Steps in Detail:

1. **DFS on Original Graph**:
   - Run a DFS on the original graph to compute the **finishing order** of vertices. This is done by pushing the vertices onto a stack when their DFS finishes.

2. **Transpose the Graph**:
   - Reverse the directions of all edges in the graph. This allows us to explore the SCCs in the reversed graph.

3. **DFS on Transposed Graph**:
   - Run DFS on the transposed graph, but in the **order defined by the stack** from the first step. Each DFS call that starts will find one SCC.

### Kosaraju's Algorithm in JavaScript:

```javascript
class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }

    addEdge(v, w) {
        this.adjacencyList.get(v).push(w);
    }

    // Step 1: Perform DFS and push vertices in the stack in order of finishing time
    fillOrder(v, visited, stack) {
        visited[v] = true;
        for (let neighbor of this.adjacencyList.get(v)) {
            if (!visited[neighbor]) {
                this.fillOrder(neighbor, visited, stack);
            }
        }
        stack.push(v);  // Push vertex to the stack after it's fully processed
    }

    // Step 2: Create a transposed graph (reverse all edges)
    getTranspose() {
        let g = new Graph(this.vertices);
        for (let vertex of this.adjacencyList.keys()) {
            g.addVertex(vertex);
        }
        for (let vertex of this.adjacencyList.keys()) {
            for (let neighbor of this.adjacencyList.get(vertex)) {
                g.addEdge(neighbor, vertex);  // Reverse the edge
            }
        }
        return g;
    }

    // Step 3: Perform DFS for each component in the transposed graph
    dfs(v, visited, component) {
        visited[v] = true;
        component.push(v);  // Collect vertices of this SCC
        for (let neighbor of this.adjacencyList.get(v)) {
            if (!visited[neighbor]) {
                this.dfs(neighbor, visited, component);
            }
        }
    }

    // Main function to find and print all strongly connected components (SCCs)
    kosaraju() {
        let stack = [];
        let visited = {};

        // Step 1: Mark all vertices as not visited
        for (let vertex of this.adjacencyList.keys()) {
            visited[vertex] = false;
        }

        // Step 1: Perform DFS to fill the stack with vertices in finishing order
        for (let vertex of this.adjacencyList.keys()) {
            if (!visited[vertex]) {
                this.fillOrder(vertex, visited, stack);
            }
        }

        // Step 2: Create the transposed graph
        let transposedGraph = this.getTranspose();

        // Step 3: Mark all vertices as not visited for DFS on the transposed graph
        for (let vertex of this.adjacencyList.keys()) {
            visited[vertex] = false;
        }

        // Step 4: Now process all vertices in the order defined by the stack
        let stronglyConnectedComponents = [];
        while (stack.length > 0) {
            let vertex = stack.pop();

            if (!visited[vertex]) {
                let component = [];
                transposedGraph.dfs(vertex, visited, component);
                stronglyConnectedComponents.push(component);
            }
        }

        return stronglyConnectedComponents;
    }
}

// Example usage:
let g = new Graph(5);
g.addVertex(0);
g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);

g.addEdge(0, 2);
g.addEdge(2, 1);
g.addEdge(1, 0);
g.addEdge(0, 3);
g.addEdge(3, 4);

let sccs = g.kosaraju();
console.log("Strongly Connected Components:", sccs);
```

### Output:

```
Strongly Connected Components: [ [ 4 ], [ 3 ], [ 0, 1, 2 ] ]
```

### Explanation:

1. **Original DFS (fillOrder)**:
   - We start by performing a DFS on the original graph. As each vertex finishes, we push it onto the stack. This ensures that vertices with no outgoing edges are processed first.
   
2. **Transpose the Graph**:
   - In the second step, we reverse the direction of all edges. This step is crucial because it helps us "walk back" the graph and discover the SCCs.

3. **DFS on the Transposed Graph**:
   - We perform a DFS on the transposed graph, processing vertices in the reverse finishing order (from the stack). Each DFS traversal finds a strongly connected component.

### Kosaraju’s Algorithm Time Complexity:

- **First DFS**: \(O(V + E)\) where \(V\) is the number of vertices and \(E\) is the number of edges.
- **Transpose the graph**: \(O(V + E)\), since reversing all edges takes linear time.
- **Second DFS on the transposed graph**: \(O(V + E)\).

Thus, the overall time complexity of Kosaraju's algorithm is **O(V + E)**.

### Advantages:
- Kosaraju’s algorithm is simple and efficient for finding all SCCs in a directed graph.
  
### Applications:
- **Web crawlers**: Finding groups of interconnected websites.
- **Graph theory problems**: Identifying modules or circular dependencies in large graphs.
- **Social networks**: Analyzing groups of users who frequently interact with each other.

Kosaraju's algorithm is an elegant solution for decomposing a directed graph into strongly connected components and can be easily implemented using depth-first search.


> ### Bellman Ford Algorithm | Negative Weight Cycle Detection  ( [Youtube video](https://www.youtube.com/watch?v=RiWE52X5wdQ&ab_channel=AnujBhaiya) )

**Bellman-Ford Algorithm** is a single-source shortest path algorithm that computes the shortest paths from a source vertex to all other vertices in a graph. It is more versatile than Dijkstra's algorithm because it can handle **graphs with negative weight edges**. However, it is slower with a time complexity of \(O(V \cdot E)\), where \(V\) is the number of vertices and \(E\) is the number of edges.

### Key Features:
- **Negative weights**: Bellman-Ford can handle graphs with negative weights, which makes it suitable for graphs where the cost of an edge can decrease the total path length.
- **Negative weight cycles**: If a graph contains a **negative weight cycle**, Bellman-Ford can detect it. A negative weight cycle is a cycle whose total weight (sum of edge weights) is negative, and in such cases, the shortest path is not well-defined.

### Steps of Bellman-Ford Algorithm:
1. **Initialize distances**: Set the distance to the source vertex to 0 and all other vertices to infinity.
2. **Relax all edges \(V - 1\) times**: For each vertex, iterate over all edges and update the distance if a shorter path is found.
3. **Detect negative weight cycles**: After \(V - 1\) iterations, check one more time to see if any distance can still be updated. If any edge can still be relaxed, it means there is a negative weight cycle in the graph.

### Bellman-Ford Algorithm in JavaScript:

```javascript
class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.edges = [];
    }

    // Add an edge from vertex u to vertex v with weight w
    addEdge(u, v, w) {
        this.edges.push([u, v, w]);
    }

    // Bellman-Ford Algorithm to find the shortest path from source vertex to all others
    bellmanFord(source) {
        let distances = Array(this.vertices).fill(Infinity);
        distances[source] = 0;

        // Step 2: Relax all edges V-1 times
        for (let i = 1; i < this.vertices; i++) {
            for (let [u, v, w] of this.edges) {
                if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
                    distances[v] = distances[u] + w;
                }
            }
        }

        // Step 3: Check for negative weight cycles
        for (let [u, v, w] of this.edges) {
            if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
                console.log("Graph contains a negative weight cycle.");
                return;
            }
        }

        // Print shortest distances
        this.printDistances(distances);
    }

    // Helper function to print the distance array
    printDistances(distances) {
        console.log("Vertex   Distance from Source");
        for (let i = 0; i < this.vertices; i++) {
            console.log(`${i} \t\t ${distances[i]}`);
        }
    }
}

// Example usage:
let g = new Graph(5);
g.addEdge(0, 1, -1);
g.addEdge(0, 2, 4);
g.addEdge(1, 2, 3);
g.addEdge(1, 3, 2);
g.addEdge(1, 4, 2);
g.addEdge(3, 2, 5);
g.addEdge(3, 1, 1);
g.addEdge(4, 3, -3);

g.bellmanFord(0);
```

### Output:

```
Vertex   Distance from Source
0         0
1         -1
2         2
3         -2
4         1
```

### Explanation:
- **Graph Representation**: The graph is represented using an edge list. Each edge is stored as a tuple \([u, v, w]\), where \(u\) is the start vertex, \(v\) is the end vertex, and \(w\) is the edge weight.
  
- **Bellman-Ford Algorithm**:
  1. **Initialization**: The distance to the source vertex is set to 0, and all other distances are initialized to infinity.
  2. **Relaxation**: In each iteration, we loop through all edges and attempt to "relax" them. If the current known distance to vertex \(v\) through \(u\) is shorter than the known distance, we update the distance for \(v\).
  3. **Negative Cycle Detection**: After \(V - 1\) iterations, we perform one more iteration over all edges. If any edge can still be relaxed, it means there is a negative weight cycle.

### Time Complexity:
- **Relaxation**: The algorithm performs \(V - 1\) iterations over all \(E\) edges. Each iteration takes \(O(E)\), making the time complexity **O(V \cdot E)**.

### Applications:
- **Routing Algorithms**: Bellman-Ford is used in network routing protocols like **Routing Information Protocol (RIP)**.
- **Currency Arbitrage**: In financial systems, Bellman-Ford can be used to detect arbitrage opportunities (which can be modeled as negative weight cycles).
- **Graphs with Negative Weights**: When the graph contains negative weights, Bellman-Ford is a better option than Dijkstra’s algorithm.

### Notes:
- **Negative Weight Cycles**: If the graph contains a negative weight cycle, the algorithm will detect it. The presence of such a cycle makes it impossible to define the shortest path because distances can keep decreasing indefinitely.

### Example of Negative Weight Cycle:

If we add an edge to create a negative weight cycle, such as:

```javascript
g.addEdge(2, 4, -6);
```

Now running the algorithm would output:

```
Graph contains a negative weight cycle.
```

This indicates the presence of a negative weight cycle that makes the shortest path undefined.

> ### Articulation Point   ( [Youtube video](https://www.youtube.com/watch?v=jFZsDDB0-vo&ab_channel=AbdulBari) )

https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/


> ### Bridges in Graph

In graph theory, **Bridges** (also called **cut-edges**) are edges that, when removed, increase the number of connected components in the graph. In other words, removing a bridge disconnects part of the graph, making it an important concept in network analysis for identifying vulnerable connections.

### Key Concepts:
- A **bridge** is an edge in a graph whose removal makes the graph disconnected.
- In an undirected graph, a bridge is an edge that, if removed, increases the number of connected components.
- Like articulation points, bridges are critical in ensuring the structural integrity of the graph.

### Example:
Consider the following graph:
```
   0 ---- 1 ---- 2
    \      |
     \     3
      \    |
       \   4
        \  |
         \ 5
```
In this graph:
- The edge between vertices **1** and **2** is a bridge, because removing it will disconnect vertex 2 from the rest of the graph.
- The edge between vertices **0** and **1** is **not** a bridge, because removing it will not disconnect the graph, as there is still a path between vertices 0 and 1 via vertex 4.

### Finding Bridges Using DFS:

To find all the bridges in a graph, we use a **Depth-First Search (DFS)** and the concepts of **discovery time** and **low values**. The basic idea is to perform a DFS traversal and, during the process, identify edges that, if removed, would disconnect the graph.

### DFS Properties:
- **Discovery time**: The time when a node is first visited during the DFS traversal.
- **Low value**: The lowest discovery time reachable from a node's subtree (including back edges).

### Conditions for a Bridge:
- An edge \((u, v)\) is a bridge if there is no way to reach any of the ancestors of \(u\) from \(v\) or its descendants (i.e., if \(low[v] > disc[u]\)).

### Steps to Find Bridges:
1. **DFS Tree Construction**: Perform DFS traversal, marking discovery times and low values for each vertex.
2. **Bridge Detection**: During the DFS, check the condition \(low[v] > disc[u]\) for each edge \((u, v)\). If true, the edge is a bridge.

### Bridge Algorithm in JavaScript:

```javascript
class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyList = new Map();
        this.time = 0; // Track time in DFS traversal
    }

    addVertex(v) {
        this.adjacencyList.set(v, []);
    }

    addEdge(v, w) {
        this.adjacencyList.get(v).push(w);
        this.adjacencyList.get(w).push(v);  // Undirected graph
    }

    // DFS based function to find all bridges
    findBridges() {
        let visited = Array(this.vertices).fill(false);
        let disc = Array(this.vertices).fill(-1);  // Discovery times of visited vertices
        let low = Array(this.vertices).fill(-1);   // Lowest discovery times reachable
        let parent = Array(this.vertices).fill(-1);  // Parent vertices

        // List to store bridges
        let bridges = [];

        // Call the recursive helper function to find bridges
        for (let i = 0; i < this.vertices; i++) {
            if (!visited[i]) {
                this.dfs(i, visited, disc, low, parent, bridges);
            }
        }

        // Output the bridges
        console.log("Bridges in the graph:");
        for (let [u, v] of bridges) {
            console.log(`Bridge between vertices ${u} and ${v}`);
        }
    }

    // Recursive DFS function to find bridges
    dfs(u, visited, disc, low, parent, bridges) {
        // Mark the current node as visited and set discovery time and low value
        visited[u] = true;
        disc[u] = low[u] = ++this.time;

        // Go through all vertices adjacent to this vertex
        for (let v of this.adjacencyList.get(u)) {
            if (!visited[v]) {  // If v is not visited, make it a child of u in DFS tree
                parent[v] = u;

                // Recur for the child vertex
                this.dfs(v, visited, disc, low, parent, bridges);

                // Check if the subtree rooted at v has a connection back to one of u's ancestors
                low[u] = Math.min(low[u], low[v]);

                // Condition for bridge: if no back edge from subtree rooted at v
                if (low[v] > disc[u]) {
                    bridges.push([u, v]);
                }

            } else if (v !== parent[u]) {
                // Update low value of u for parent function calls
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
}

// Example usage:
let g = new Graph(6);
g.addVertex(0);
g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);
g.addVertex(5);

g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(3, 4);
g.addEdge(4, 5);
g.addEdge(0, 4);

g.findBridges();
```

### Output:

```
Bridges in the graph:
Bridge between vertices 1 and 2
Bridge between vertices 3 and 4
Bridge between vertices 4 and 5
```

### Explanation:
- **Edge (1, 2)** is a bridge because removing it will disconnect vertex 2 from the rest of the graph.
- **Edge (3, 4)** is a bridge because removing it will disconnect vertices 4 and 5 from the rest of the graph.
- **Edge (4, 5)** is a bridge because removing it will disconnect vertex 5.

### Time Complexity:
- The time complexity of finding all the bridges is **O(V + E)**, where \(V\) is the number of vertices and \(E\) is the number of edges. This is because the algorithm performs a DFS traversal, visiting every vertex and edge exactly once.

### Applications of Bridges:
1. **Network Analysis**: Bridges help identify critical connections in computer networks or social networks, where the failure of certain connections can cause the network to split.
2. **Road and Traffic Systems**: In a road network, bridges can represent critical roads whose failure or closure would disrupt traffic flow.
3. **Communication Networks**: In telecommunications, bridges represent links between different parts of the network, and their failure could isolate sections of the network.
4. **Vulnerability Analysis**: In system design or critical infrastructure, bridges are points where failures could cause significant disruptions, and identifying these can guide redundancy and reinforcement efforts.

### Summary:
Bridges in a graph are important structural components that, if removed, can split the graph into disconnected parts. By using DFS with discovery times and low values, we can efficiently find all the bridges in a graph in linear time, making this technique invaluable for network analysis and robustness studies.

> ### Greedy Algorithm

**Below is GFG defination**
Greedy algorithms are a class of algorithms that make locally optimal choices at each step with the hope of finding a global optimum solution. In these algorithms, decisions are made based on the information available at the current moment without considering the consequences of these decisions in the future. The key idea is to select the best possible choice at each step, leading to a solution that may not always be the most optimal but is often good enough for many problems.

Steps for Creating a Greedy Algorithm
The steps to define a greedy algorithm are:

1. Define the problem: Clearly state the problem to be solved and the objective to be optimized.
2. Identify the greedy choice: Determine the locally optimal choice at each step based on the current state.
3. Make the greedy choice: Select the greedy choice and update the current state.
4. Repeat: Continue making greedy choices until a solution is reached.

> ### Activity Selection Problem using Greedy Method  ( [Youtube video](https://www.youtube.com/watch?v=U4UoR9vq238&ab_channel=AnujBhaiya) )

The **Activity Selection Problem** is a classic problem in which we are given a set of activities, each defined by a start and finish time, and the goal is to select the maximum number of non-overlapping activities that can be performed by a single person or machine. The **greedy method** is a popular approach to solve this problem optimally.

### Problem Definition:
You are given \( n \) activities with their start and finish times. Your goal is to select the maximum number of activities such that no two selected activities overlap. Each activity has a start time \( s[i] \) and a finish time \( f[i] \).

### Greedy Strategy:
The idea behind the greedy approach is to always select the activity that finishes the earliest, as this leaves the most room for other activities.

### Steps of the Greedy Algorithm:
1. **Sort activities** by their finish times in non-decreasing order.
2. **Select the first activity** (the one that finishes the earliest).
3. For each subsequent activity, if its start time is greater than or equal to the finish time of the previously selected activity, **select the activity**.
4. Continue this process until all activities have been considered.

### Example:

Let's say we have the following activities with their start and finish times:

| Activity | Start Time | Finish Time |
|----------|------------|-------------|
| A1       | 1          | 3           |
| A2       | 2          | 5           |
| A3       | 4          | 6           |
| A4       | 6          | 8           |
| A5       | 5          | 7           |
| A6       | 8          | 9           |

### Step-by-Step Process:
1. **Sort by finish times**:

   Sorted activities by finish time:

   | Activity | Start Time | Finish Time |
   |----------|------------|-------------|
   | A1       | 1          | 3           |
   | A3       | 4          | 6           |
   | A2       | 2          | 5           |
   | A5       | 5          | 7           |
   | A4       | 6          | 8           |
   | A6       | 8          | 9           |

2. **Select the first activity** (A1).
3. Now, select the next activity that starts after A1 finishes. The next non-overlapping activity is A3.
4. Continue to select activities in this manner. The next activity after A3 is A4, and then A6.

The selected activities are **A1, A3, A4, and A6**, with no overlap.

### Greedy Algorithm Implementation in JavaScript:

```javascript
function activitySelection(activities) {
    // Sort activities based on their finish times
    activities.sort((a, b) => a[1] - b[1]);

    let selectedActivities = [];
    let lastFinishTime = 0;

    // Select the first activity and then the next non-overlapping ones
    for (let i = 0; i < activities.length; i++) {
        let [start, finish] = activities[i];

        if (start >= lastFinishTime) {
            selectedActivities.push(activities[i]);
            lastFinishTime = finish;  // Update the finish time
        }
    }

    return selectedActivities;
}

// Example usage:
const activities = [
    [1, 3], // A1: Start = 1, Finish = 3
    [2, 5], // A2: Start = 2, Finish = 5
    [4, 6], // A3: Start = 4, Finish = 6
    [6, 8], // A4: Start = 6, Finish = 8
    [5, 7], // A5: Start = 5, Finish = 7
    [8, 9], // A6: Start = 8, Finish = 9
];

const result = activitySelection(activities);
console.log("Selected activities:", result);
```

### Output:

```
Selected activities: [ [ 1, 3 ], [ 4, 6 ], [ 6, 8 ], [ 8, 9 ] ]
```

### Explanation:
- The sorted activities based on finish time are: \([1,3]\), \([4,6]\), \([2,5]\), \([5,7]\), \([6,8]\), \([8,9]\).
- The selected activities are: \([1,3]\), \([4,6]\), \([6,8]\), \([8,9]\), ensuring maximum activity selection without any overlaps.

### Time Complexity:
- Sorting the activities takes **O(n log n)**, where \(n\) is the number of activities.
- After sorting, selecting activities takes **O(n)**.
Thus, the overall time complexity is **O(n log n)**.

### Greedy Choice Property:
The key idea is that by selecting the activity that finishes the earliest, we maximize the remaining time for future activities. This "greedy" choice ensures that we can always make the best possible decisions moving forward, leading to an optimal solution.

### Applications:
1. **Scheduling**: Allocating resources (such as meeting rooms) efficiently in time-scheduling problems.
2. **Project Planning**: Ensuring tasks or projects are completed in the shortest time without conflicts.
3. **CPU Scheduling**: Selecting processes in a way that maximizes CPU utilization while avoiding conflicts.

### Summary:
The **Activity Selection Problem** using the **Greedy Method** is an efficient way to select the maximum number of non-overlapping activities by always choosing the activity that finishes first. This approach ensures an optimal solution and is widely applicable in scheduling and resource allocation problems.


> ### Fractional Knapsack - Greedy Algorithm  ( [Youtube video](https://www.youtube.com/watch?v=2i5pclQprGk&ab_channel=ApnaCollege) )

The **Fractional Knapsack Problem** is a classic **greedy algorithm** problem where you are given a set of items, each with a weight and a value, and you need to determine the maximum value you can carry in a knapsack with a weight limit. In this variation of the knapsack problem, you can take fractions of an item, meaning you can split the item if needed to maximize the total value.

### Problem Statement:
- You have a knapsack that can carry a maximum weight \( W \).
- You are given \( n \) items, where each item \( i \) has a weight \( w[i] \) and a value \( v[i] \).
- Your goal is to maximize the value of the items you can fit in the knapsack by potentially taking fractional amounts of the items.

### Greedy Strategy:
To solve the fractional knapsack problem, the greedy approach suggests picking items based on their **value-to-weight ratio** \( \frac{v[i]}{w[i]} \). The idea is to take as much of the item with the highest value per weight unit first, then the next, and so on until the knapsack is full.

### Steps of the Greedy Algorithm:
1. **Calculate the value-to-weight ratio** \( \frac{v[i]}{w[i]} \) for each item.
2. **Sort the items** in descending order of their value-to-weight ratio.
3. Start with an empty knapsack. For each item in the sorted list:
   - If the entire item can fit into the knapsack, add it.
   - If the item cannot fit, take the fraction of the item that will fill the knapsack to capacity.
4. Continue until the knapsack is full or all items have been considered.

### Example:
Let's say we have 3 items with the following weights and values:

- Item 1: weight = 10, value = 60
- Item 2: weight = 20, value = 100
- Item 3: weight = 30, value = 120

And the knapsack capacity \( W \) is 50.

### Steps:

1. Compute the value-to-weight ratio for each item:
   - Item 1: \( \frac{60}{10} = 6 \)
   - Item 2: \( \frac{100}{20} = 5 \)
   - Item 3: \( \frac{120}{30} = 4 \)

2. Sort the items by the value-to-weight ratio in descending order:
   - Item 1 (6), Item 2 (5), Item 3 (4)

3. Select items for the knapsack:
   - First, take all of Item 1 (weight 10, value 60), remaining capacity: \( 50 - 10 = 40 \)
   - Then, take all of Item 2 (weight 20, value 100), remaining capacity: \( 40 - 20 = 20 \)
   - Finally, take \( \frac{20}{30} \) (two-thirds) of Item 3, which gives a value of \( \frac{2}{3} \times 120 = 80 \)

Total value: \( 60 + 100 + 80 = 240 \)

### Fractional Knapsack Algorithm in JavaScript:

```javascript
function fractionalKnapsack(items, capacity) {
    // Sort items by value-to-weight ratio in descending order
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0;

    for (let i = 0; i < items.length; i++) {
        let { weight, value } = items[i];

        if (capacity >= weight) {
            // If the item can be taken fully
            totalValue += value;
            capacity -= weight;
        } else {
            // Take the fraction of the remaining capacity
            totalValue += (value / weight) * capacity;
            break; // Knapsack is full
        }
    }

    return totalValue;
}

// Example usage:
const items = [
    { weight: 10, value: 60 },  // Item 1
    { weight: 20, value: 100 }, // Item 2
    { weight: 30, value: 120 }, // Item 3
];

const capacity = 50;
const maxValue = fractionalKnapsack(items, capacity);
console.log("Maximum value in knapsack:", maxValue);
```

### Output:
```
Maximum value in knapsack: 240
```

### Explanation:
- The items are sorted by their value-to-weight ratio.
- The algorithm adds full Item 1 and Item 2 to the knapsack and then takes a fraction (two-thirds) of Item 3 to fill the remaining capacity.
- The total value is 240, which is the maximum value that can be obtained for the given knapsack capacity.

### Time Complexity:
- Sorting the items by value-to-weight ratio takes \( O(n \log n) \).
- The loop to add items to the knapsack takes \( O(n) \).
Thus, the overall time complexity is **\( O(n \log n) \)**.

### Greedy Choice Property:
The greedy algorithm works because we always make the choice that maximizes the value per unit of weight, which ensures that we are optimizing at each step.

### Applications:
1. **Resource Allocation**: Allocating limited resources (like time, space, or bandwidth) where you can take fractions of each resource.
2. **Investment Decisions**: When allocating funds to investments that can be fractionalized, and you want to maximize the return.
3. **Cargo Loading**: In transport systems where fractional items can be loaded into containers, the aim is to maximize the value carried.

### Summary:
The **Fractional Knapsack Problem** is a variation of the knapsack problem where fractions of items can be taken. The **greedy method** efficiently solves this problem by always selecting the item (or fraction) with the highest value-to-weight ratio until the knapsack is full. This approach guarantees an optimal solution for the fractional variant of the knapsack problem.


> ### Job Sequencing Algorithm  ( [Youtube video](https://www.youtube.com/watch?v=Tpp7o0jQ-8w&ab_channel=GateSmashers) )

The **Job Sequencing Problem** is a popular problem in **greedy algorithms** where you are given a set of jobs, each having a deadline and a profit associated with it. The objective is to schedule the jobs in such a way that you can maximize the total profit while ensuring that no more than one job is executed at a time, and each job is completed before its deadline.

### Problem Statement:
- You are given \( n \) jobs, each having a **deadline** and a **profit**.
- Each job takes **one unit of time** to complete.
- The objective is to find the maximum profit by scheduling jobs such that:
  - No two jobs overlap.
  - Each job is completed before or on its deadline.

### Greedy Approach:
To solve this problem optimally, a greedy approach is used where jobs are scheduled in descending order of their profits, and each job is assigned to the latest available time slot before its deadline (if available).

### Algorithm Steps:
1. **Sort the jobs** in descending order of their profit.
2. **Iterate over each job** and try to schedule it in the latest available time slot before its deadline.
3. If a slot is available, schedule the job; otherwise, skip it.

### Example:

Let's say we have the following jobs:

| Job   | Deadline | Profit |
|-------|----------|--------|
| J1    | 2        | 100    |
| J2    | 1        | 19     |
| J3    | 2        | 27     |
| J4    | 1        | 25     |
| J5    | 3        | 15     |

### Step-by-Step Process:
1. **Sort jobs by profit**:
   Sorted order: J1, J3, J4, J2, J5.

2. **Create a time slot array**: Assume that there are \( t \) available slots (from 1 to max deadline).

   For this example, the maximum deadline is 3, so we create 3 slots: \( [\_, \_, \_] \).

3. **Schedule jobs**:
   - **J1**: Deadline is 2. Place J1 in the latest available slot before or on 2. So, place J1 in slot 2.
   - **J3**: Deadline is 2. Place J3 in the latest available slot before or on 2. Slot 2 is occupied, so place J3 in slot 1.
   - **J4**: Deadline is 1. Slot 1 is already occupied, so J4 cannot be scheduled.
   - **J2**: Deadline is 1. Slot 1 is occupied, so J2 cannot be scheduled.
   - **J5**: Deadline is 3. Place J5 in the latest available slot before or on 3. So, place J5 in slot 3.

Final schedule: \( [J3, J1, J5] \).

The total profit is \( 27 + 100 + 15 = 142 \).

### Job Sequencing Algorithm Implementation in JavaScript:

```javascript
function JobSequencing(jobs) {
    // Sort the jobs based on their profit in descending order
    jobs.sort((a, b) => b.profit - a.profit);

    let maxDeadline = Math.max(...jobs.map(job => job.deadline));
    let timeSlots = Array(maxDeadline).fill(null); // Array to store job schedule
    let totalProfit = 0;

    for (let i = 0; i < jobs.length; i++) {
        // Find a free slot for the job (starting from the last possible slot)
        for (let j = jobs[i].deadline - 1; j >= 0; j--) {
            if (timeSlots[j] === null) {
                timeSlots[j] = jobs[i];  // Schedule the job
                totalProfit += jobs[i].profit; // Add to total profit
                break; // Move to the next job after scheduling
            }
        }
    }

    return {
        timeSlots: timeSlots.filter(job => job !== null), // Jobs that are scheduled
        totalProfit
    };
}

// Example usage
const jobs = [
    { id: "J1", deadline: 2, profit: 100 }, // Job 1
    { id: "J2", deadline: 1, profit: 19 },  // Job 2
    { id: "J3", deadline: 2, profit: 27 },  // Job 3
    { id: "J4", deadline: 1, profit: 25 },  // Job 4
    { id: "J5", deadline: 3, profit: 15 }   // Job 5
];

const result = JobSequencing(jobs);
console.log("Scheduled jobs:", result.timeSlots);
console.log("Total profit:", result.totalProfit);
```

### Output:
```
Scheduled jobs: [ { id: 'J3', deadline: 2, profit: 27 }, { id: 'J1', deadline: 2, profit: 100 }, { id: 'J5', deadline: 3, profit: 15 } ]
Total profit: 142
```

### Explanation:
- The algorithm schedules the jobs with the highest profit in the latest available time slots.
- The final job sequence is \( J3, J1, J5 \), and the total profit is 142.

### Time Complexity:
1. **Sorting the jobs** based on their profit takes \( O(n \log n) \), where \( n \) is the number of jobs.
2. **Finding a slot** for each job takes \( O(n \times d) \), where \( d \) is the maximum deadline.

Thus, the total time complexity is \( O(n \log n + n \times d) \), where \( n \) is the number of jobs and \( d \) is the maximum deadline.

### Greedy Choice Property:
The greedy approach works for the job sequencing problem because:
- At each step, the algorithm makes a choice that seems to offer the most profit by selecting the job with the highest profit.
- By doing so, it ensures that we don't miss any high-profit job that could fit within the remaining slots.

### Applications:
1. **Scheduling**: Optimal scheduling of jobs in manufacturing or computing to maximize profit or minimize cost.
2. **Project Management**: Selecting the most profitable projects to undertake within given deadlines.
3. **Task Assignment**: Assigning tasks to workers in a way that maximizes overall efficiency and profit.

### Summary:
The **Job Sequencing Problem** is solved optimally using a **greedy algorithm** that sorts jobs by their profit and assigns them to the latest available time slot before their deadline. This approach ensures the maximum profit can be obtained, and is widely applicable in scheduling and resource management problems.

> ### Permutations of a String ( [Youtube video](https://youtu.be/mEBEw_xScsE?si=ExivZgmnO9MfF2J-&t=884) )

To generate **all permutations** of a given string, we can use a **recursive approach**. The idea is to swap each character with every other character in the string and recursively generate the permutations for the rest of the string.

### Key Concepts:
1. For each character in the string, place it in the first position and then recursively permute the rest of the characters.
2. This is done by swapping the current character with every character after it, including itself.
3. When the recursion reaches the end of the string (base case), the permutation is stored.

### Example:
If the input string is `"ABC"`, the permutations are:
- ABC
- ACB
- BAC
- BCA
- CAB
- CBA

### Algorithm:

1. Start with the first character and swap it with each character, including itself.
2. Recursively call the function to generate permutations for the rest of the string.
3. Once the base case (end of the string) is reached, add the generated permutation to the result.

### Permutations of a String using Recursion in JavaScript:

```javascript
function permute(str) {
    const result = [];

    // Helper function to generate permutations
    function generatePermutations(chars, index) {
        if (index === chars.length - 1) {
            result.push(chars.join('')); // When a permutation is ready
            return;
        }

        for (let i = index; i < chars.length; i++) {
            // Swap characters at index and i
            [chars[index], chars[i]] = [chars[i], chars[index]];
            
            // Recurse for the next index
            generatePermutations(chars, index + 1);
            
            // Backtrack: Swap back the characters
            [chars[index], chars[i]] = [chars[i], chars[index]];
        }
    }

    generatePermutations(str.split(''), 0); // Split the string into an array of characters
    return result;
}

// Example usage:
const input = "ABC";
const permutations = permute(input);
console.log(permutations);
```

### Output:
```
[ 'ABC', 'ACB', 'BAC', 'BCA', 'CBA', 'CAB' ]
```

### Explanation:
- The recursive function `generatePermutations` works by fixing one character at a time and swapping it with the remaining characters to explore all possible arrangements.
- The **base case** of the recursion occurs when `index` reaches the end of the string (i.e., the last character), and we add the current arrangement (permutation) to the result list.
- After exploring one arrangement, the function **backtracks** by undoing the swap, allowing the function to explore the next possible permutation.

### Time Complexity:
- The time complexity is **O(n!)**, where \( n \) is the length of the string. This is because there are \( n! \) permutations for a string of length \( n \).

### Summary:
- The above algorithm efficiently generates all permutations of a string by recursively swapping characters.
- This approach is commonly used in solving problems related to permutations and combinations.



> ### Rat In a Maze   ( [Youtube video](https://youtu.be/wjqSZy4pMT4?si=fFRwK9Xcp2Uq_XO5) )

The **Rat in a Maze** problem is another classic **backtracking problem** where we need to find a path from the start to the destination in a maze (grid). The maze consists of cells that are either blocked (`0`) or open (`1`), and the objective is to move the rat from the top-left corner to the bottom-right corner by moving only in allowed directions (commonly right and down).

### Problem:

Given a maze represented by a \(N \times N\) grid, the rat can start at the top-left corner (0,0) and needs to reach the bottom-right corner (N-1, N-1). The rat can move **right**, **down**, **left**, or **up**. The goal is to find one possible path for the rat, ensuring it only moves through open cells (`1`) and doesn't move into blocked cells (`0`).

### Approach:

- The backtracking approach tries to move the rat in all possible directions (right, down, left, up).
- If the rat reaches the destination, the path is valid.
- If a move leads to an invalid position (out of bounds, blocked cell, or already visited cell), the algorithm backtracks and tries another direction.

### JavaScript Code for **Rat in a Maze**:

```javascript
function solveMaze(maze) {
    const N = maze.length;
    const solution = Array.from({ length: N }, () => Array(N).fill(0)); // To store the solution path

    // Helper function to check if the move is valid
    function isSafe(maze, x, y) {
        return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] === 1);
    }

    // Backtracking function to solve the maze
    function solveMazeUtil(maze, x, y, solution) {
        // If the rat reaches the destination (bottom-right corner)
        if (x === N - 1 && y === N - 1 && maze[x][y] === 1) {
            solution[x][y] = 1;
            return true;
        }

        // Check if the current position is valid
        if (isSafe(maze, x, y)) {
            // Mark the current cell as part of the solution path
            solution[x][y] = 1;

            // Move to the right (x, y+1)
            if (solveMazeUtil(maze, x, y + 1, solution)) {
                return true;
            }

            // Move down (x+1, y)
            if (solveMazeUtil(maze, x + 1, y, solution)) {
                return true;
            }

            // Move to the left (x, y-1)
            if (solveMazeUtil(maze, x, y - 1, solution)) {
                return true;
            }

            // Move up (x-1, y)
            if (solveMazeUtil(maze, x - 1, y, solution)) {
                return true;
            }

            // If none of the above movements work, backtrack: unmark the current cell
            solution[x][y] = 0;
            return false;
        }

        return false; // Return false if the cell is not valid
    }

    // Main function to solve the maze
    if (!solveMazeUtil(maze, 0, 0, solution)) {
        console.log("No solution exists");
        return false;
    }

    console.log("One possible solution:");
    console.log(solution);
    return solution;
}

// Example usage:
const maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
];

solveMaze(maze);
```

### Example Output:

For the given `maze`:

```javascript
[
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
]
```

The possible output path will be:

```
One possible solution:
[
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 1]
]
```

This path takes the rat from the top-left corner to the bottom-right corner by following open cells (1).

### Explanation:

1. **isSafe function**:
   - Checks if the move is valid by ensuring the position is within bounds and the cell is not blocked (`1`).

2. **solveMazeUtil function**:
   - This is the recursive backtracking function that tries to move the rat in all four possible directions (right, down, left, up) from the current cell `(x, y)`.
   - It marks the current cell as part of the solution (`solution[x][y] = 1`) and continues to explore further.
   - If no valid move exists, it backtracks by unmarking the cell (`solution[x][y] = 0`).

3. **Base Case**:
   - The algorithm stops when the rat reaches the bottom-right corner `(N-1, N-1)`, indicating that the solution has been found.

### Time Complexity:

- The time complexity of this algorithm is \(O(2^{N^2})\) in the worst case, as each cell can potentially have multiple moves to explore and may involve a lot of backtracking.

### Space Complexity:

- The space complexity is \(O(N^2)\), which is the size of the solution array used to store the path.

### Conclusion:
This solution finds **one possible path** for the rat to reach the destination in the maze using a **backtracking** approach. If no path exists, it prints a message indicating that no solution is possible.




> ### N-Queen Problem   ( [Youtube video](https://www.youtube.com/watch?v=MHXR4PCY8c0&ab_channel=AnujBhaiya) )
The **N-Queen Problem** is a classic problem in combinatorial optimization and a well-known example of **backtracking**. The task is to place **N queens** on an \( N \times N \) chessboard such that no two queens threaten each other. This means:

1. No two queens can share the same **row**.
2. No two queens can share the same **column**.
3. No two queens can share the same **diagonal**.

### Problem Definition:
Given a chessboard of size \( N \times N \), the goal is to place N queens on the board such that:
- No two queens can attack each other (no two queens should be on the same row, column, or diagonal).

### Approach:

The **backtracking approach** is used to solve the N-Queen problem efficiently. The idea is to place queens one by one in different columns of a row, and for each placement, check whether it leads to a solution. If it does not lead to a solution, the queen is removed, and we backtrack to the previous step to try another placement.

### Steps:

1. Start with the first row and place a queen in the first column.
2. Move to the next row and try placing a queen in each column, one by one.
3. For each placement, check if it is valid (i.e., no queens are placed in the same column or diagonal).
4. If placing the queen in a particular column leads to a valid solution, move on to the next row. Otherwise, backtrack and try placing the queen in a different column.
5. Repeat until queens are placed in all rows or no valid configuration is possible.

### Algorithm:

- The **base case** is when all queens are placed, meaning we’ve successfully placed a queen in each row.
- The **backtracking** step involves trying all possible positions in the current row and then recursively trying to place queens in subsequent rows. If no valid placement is found in the current configuration, we backtrack to the previous row and try a different configuration.

### Code Implementation (JavaScript):

```javascript
function solveNQueens(N) {
    const result = [];
    const board = Array.from({ length: N }, () => Array(N).fill('.'));

    function isSafe(board, row, col, N) {
        // Check the same column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Check the upper left diagonal
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check the upper right diagonal
        for (let i = row, j = col; i >= 0 && j < N; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    }

    function placeQueens(board, row, N) {
        if (row === N) {
            // All queens are placed successfully, add the board configuration to the result
            const copy = board.map((row) => row.join(''));
            result.push(copy);
            return;
        }

        for (let col = 0; col < N; col++) {
            if (isSafe(board, row, col, N)) {
                // Place the queen
                board[row][col] = 'Q';
                
                // Recur to place the rest of the queens
                placeQueens(board, row + 1, N);

                // Backtrack: remove the queen and try another column
                board[row][col] = '.';
            }
        }
    }

    placeQueens(board, 0, N);
    return result;
}

// Example usage:
const N = 4;
const solutions = solveNQueens(N);
console.log(`Number of solutions for N = ${N}: ${solutions.length}`);
console.log("Solutions:");
solutions.forEach((solution) => console.log(solution.join("\n"), "\n"));
```

### Explanation:

1. **isSafe function**:
   - It checks if placing a queen at `board[row][col]` is valid by checking:
     - No other queen exists in the same column.
     - No other queen exists in the upper left diagonal.
     - No other queen exists in the upper right diagonal.

2. **placeQueens function**:
   - It is the main backtracking function that attempts to place queens row by row.
   - If it successfully places a queen in the current row, it recursively moves to the next row.
   - If placing a queen leads to a solution, it records the solution in `result`.
   - If no valid placement is possible, it backtracks by removing the queen and trying other placements.

3. **Result**:
   - Each valid configuration of the board is stored in the `result` array, where each row is represented as a string.

### Output Example for \( N = 4 \):

```
Number of solutions for N = 4: 2
Solutions:
.Q..
...Q
Q...
..Q. 

..Q.
Q...
...Q
.Q..
```

These two solutions represent valid configurations where no two queens can attack each other.

### Time Complexity:

- The time complexity is **O(N!)** due to the factorial growth in the number of possible configurations as the size of the board increases. Each row has \( N \) options, and we try every possible arrangement.
  
### Space Complexity:

- The space complexity is **O(N^2)** because we use a board of size \( N \times N \) to store the placements, and additional space is required for the recursion stack, which could go up to depth \( N \).

### Conclusion:
The **N-Queen Problem** is an excellent example of using backtracking to solve a problem with constraints. The solution explores every possible configuration of queens on the board, backtracks when an invalid configuration is found, and finds all the valid solutions.


> ### sudoku problem   ( [Youtube video](https://www.youtube.com/watch?v=MHXR4PCY8c0&ab_channel=AnujBhaiya) )

The **Sudoku problem** is a classic example of a **constraint satisfaction problem** that can be solved using **backtracking**. The objective is to fill a \(9 \times 9\) grid with digits from 1 to 9 so that:

1. Each row contains all digits from 1 to 9 without repetition.
2. Each column contains all digits from 1 to 9 without repetition.
3. Each of the nine \(3 \times 3\) sub-grids contains all digits from 1 to 9 without repetition.

### Approach:

The backtracking algorithm tries to place digits in empty cells one by one, checking if the placement is valid. If a valid placement is found, it moves to the next empty cell. If a placement leads to an invalid state (where the rules of Sudoku are violated), the algorithm backtracks by removing the last placed digit and trying the next possibility.

### Steps:

1. **Identify an empty cell** (i.e., a cell with a 0).
2. **Try placing digits** from 1 to 9 in the empty cell.
3. **Check if placing a digit is valid**:
   - The digit should not already exist in the current row, column, or the \(3 \times 3\) sub-grid.
4. If a valid digit is placed, **recur** to solve the rest of the grid.
5. If placing any digit leads to an invalid solution, **backtrack** by resetting the current cell and trying the next digit.
6. The algorithm stops when the entire grid is filled with valid digits.

### JavaScript Code for Sudoku Solver:

```javascript
function solveSudoku(board) {
    // Helper function to check if a digit can be placed in board[row][col]
    function isValid(board, row, col, num) {
        // Check if 'num' is not in the current row, column, or 3x3 box
        for (let i = 0; i < 9; i++) {
            // Check the row
            if (board[row][i] === num) return false;

            // Check the column
            if (board[i][col] === num) return false;

            // Check the 3x3 sub-grid
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }

    // Backtracking function to solve the board
    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) { // Find an empty cell
                    for (let num = 1; num <= 9; num++) { // Try digits 1 to 9
                        if (isValid(board, row, col, num)) { // Check if valid
                            board[row][col] = num; // Place the digit
                            
                            if (solve(board)) { // Recur to solve the rest of the grid
                                return true; // Return true if the board is solved
                            }

                            board[row][col] = 0; // Backtrack by resetting the cell
                        }
                    }
                    return false; // If no valid digit is found, return false
                }
            }
        }
        return true; // If the entire board is filled, return true
    }

    solve(board);
    return board;
}

// Example usage:
let board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

solveSudoku(board);
console.log(board);
```

### Example Output:

For the given initial `board`, the output will be a valid solved Sudoku:

```javascript
[
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]
```

### Explanation:

1. **isValid function**:
   - This function checks if placing the number `num` in the position `board[row][col]` is valid by ensuring that:
     - The number does not already exist in the current row.
     - The number does not exist in the current column.
     - The number does not exist in the \(3 \times 3\) sub-grid that contains the cell.

2. **solve function (Backtracking)**:
   - It iterates through the board to find an empty cell (i.e., `0`).
   - For each empty cell, it tries placing digits from 1 to 9.
   - If placing a digit is valid, it recurses to fill the rest of the board.
   - If a valid solution is found, the function returns `true`. Otherwise, it backtracks by resetting the cell to `0`.

3. **Base Case**:
   - The algorithm stops when there are no empty cells left on the board, meaning a valid solution is found.

### Time Complexity:

- The time complexity of the backtracking algorithm is **exponential** in the worst case: \( O(9^M) \), where \( M \) is the number of empty cells on the board. Each empty cell can potentially take any digit from 1 to 9, making the search space large.

### Space Complexity:

- The space complexity is \( O(1) \) as we solve the problem in place using the given board, although the recursion stack may grow up to \( O(M) \) due to backtracking.

### Conclusion:
This is a backtracking-based approach to solve the **Sudoku problem**. It tries to fill the grid one cell at a time, validating each placement according to Sudoku rules and backtracking when a conflict arises, ensuring that a valid solution is found.


> ### Dynamic Programming
Dynamic Programming is an algorithmic approach to solve some complex problems easily and save time and number of comparisons by storing the results of past computations. The basic idea of dynamic programming is to store the results of previous calculation and reuse it in future instead of recalculating them.

In simple words, it is an optimiztion over plain ecursion

The idea is to reuse the solution of sub-problems when there are overlapping sub-problems
1. Memoization (Top Down)
    - Recursive approach with memoization.
    - Solve the problem recursively but store the results of subproblems so that they can be reused without recalculating them.
2. Tabulation (Bottom Up)



**Fibonacci Sequence**:
   - One of the simplest examples of DP.
   - The Fibonacci sequence is defined as:
     \[
     F(n) = F(n-1) + F(n-2)
     \]
     where \(F(0) = 0\) and \(F(1) = 1\).

If we use the traditional recusive approach, its time complexity will be O(2ⁿ), where n is the input number.

```js
fibonacci = n => {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
fibonacci(12)
```

But if we use the DP, considering both type which is below, then it will be O(n)

**Fibonacci using DP (Memoization):**

```javascript
function fib(n, memo = {}) {
    if (n <= 1) return n; // Base case

    if (memo[n]) return memo[n]; // Check if already solved

    memo[n] = fib(n - 1, memo) + fib(n - 2, memo); // Store the result
    return memo[n];
}

console.log(fib(10)); // Output: 55
```

**Fibonacci using DP (Tabulation):**

```javascript
function fib(n) {
    if (n <= 1) return n;

    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

console.log(fib(10)); // Output: 55
```











2. **0/1 Knapsack Problem**:
   - Given a set of items, each with a weight and a value, determine the maximum value that can be obtained from selecting items without exceeding the given weight capacity.

**0/1 Knapsack using DP:**

```javascript
function knapsack(weights, values, W) {
    const n = values.length;
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][W];
}

const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const W = 7;

console.log(knapsack(weights, values, W)); // Output: 9
```

3. **Longest Common Subsequence (LCS)**:
   - Given two strings, find the length of their longest subsequence that appears in both strings.

**LCS using DP:**

```javascript
function lcs(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

console.log(lcs("abcde", "ace")); // Output: 3 (The LCS is "ace")
```

4. **Longest Increasing Subsequence (LIS)**:
   - Given an array of integers, find the length of the longest subsequence where the numbers are in increasing order.

**LIS using DP:**

```javascript
function lis(arr) {
    const n = arr.length;
    const dp = Array(n).fill(1); // Each element is a subsequence of length 1

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp); // Longest subsequence
}

const arr = [10, 22, 9, 33, 21, 50, 41, 60, 80];
console.log(lis(arr)); // Output: 6 (The LIS is [10, 22, 33, 50, 60, 80])
```

5. **Edit Distance**:
   - The edit distance between two strings is the minimum number of operations required to convert one string into another (using insertions, deletions, or substitutions).

**Edit Distance using DP:**

```javascript
function editDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j; // Insert all characters of str2
            } else if (j === 0) {
                dp[i][j] = i; // Remove all characters of str1
            } else if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // Characters match
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]); // Minimum of replace, remove, insert
            }
        }
    }

    return dp[m][n];
}

console.log(editDistance("kitten", "sitting")); // Output: 3
```

### Key Points of Dynamic Programming:

- **Optimal Substructure**: The optimal solution of the problem can be constructed from the solutions of its subproblems.
- **Overlapping Subproblems**: The same subproblems are solved multiple times, which is why memoization or tabulation helps in reducing redundant computations.
- **Memoization (Top-Down)** vs **Tabulation (Bottom-Up)**: Memoization is typically recursive and stores results as they are computed. Tabulation builds up the solution iteratively from the smallest subproblem.
  
Dynamic programming is widely used in algorithm design, especially when brute-force approaches are inefficient due to redundant work. It provides a systematic approach to solving problems with overlapping subproblems and optimal substructure.


```js
// Heaps
// Heap is like binary tree, but numbers are laid out in a different way
// Each node has a value that is greater than each of its descendants, max value is at top.(ie Max heap, in min heap its is reverse)
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

    deleteKey(index) {
        if (index < 0 || index >= this.#heap.length) {
            throw new Error('Index out of bounds');
        }

        // Swap the element to be deleted with the last element
        this.#swap(index, this.#heap.length - 1);
        
        // Remove the last element (the one to be deleted)
        this.#heap.pop();
        
        // If there are remaining elements, adjust the heap
        if (index < this.#heap.length) {
            // Try to sink down or bubble up to maintain the heap property
            this.#sinkDown(index);
            if (index > 0 && this.#heap[index] > this.#heap[this.#parent(index)]) {
                this.#bubbleUp(index);
            }
        }
    }

    #bubbleUp(index) {
        while (index > 0 && this.#heap[index] > this.#heap[this.#parent(index)]) {
            this.#swap(index, this.#parent(index));
            index = this.#parent(index);
        }
    }

    decreaseKey(index, newValue){
        if (index < 0 || index >= this.#heap.length) {
            throw new Error('Index out of bounds');
        }

        if (newValue > this.#heap[index]) {
            throw new Error('New value is greater than the current value');
        }

        // Update the value at the given index
        this.#heap[index] = newValue;

        // Sink down the value to restore the heap property
        this.#sinkDown(index);
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
```

> ### given random array, rearrange array to form the heap

To rearrange a given random array into a heap, you can use the **heapify** algorithm. Heapifying transforms an unordered array into a valid binary heap. For a max-heap, each parent node should be greater than or equal to its children. This can be achieved by starting from the bottom-most non-leaf node and applying the **sink down** operation up to the root.

The process involves:
1. Identifying the last non-leaf node (the parent of the last element).
2. Applying the sink down operation (also known as "heapify") on each node starting from the last non-leaf node up to the root.

Here’s how you can implement this in the `Heap` class:

### Heapify Function:

```javascript
class Heap {
    #heap = [];

    // Construct heap from an array
    constructor(arr) {
        this.#heap = arr;
        this.heapify();
    }

    // Insert function remains the same
    insert(value){
        this.#heap.push(value);
        let current = this.#heap.length - 1;

        while(current > 0 && this.#heap[current] > this.#heap[this.#parent(current)]){
            this.#swap(current, this.#parent(current));
            current = this.#parent(current);
        }
    }

    // Remove function remains the same
    remove(){
        if(this.#heap.length === 0){
            return null;
        }

        if(this.#heap.length === 1){
            return this.#heap.pop();
        }

        const maxValue = this.#heap[0];
        this.#heap[0] = this.#heap.pop();
        this.#sinkDown(0);

        return maxValue;
    }

    // Heapify function to rearrange the array into a heap
    heapify() {
        let n = this.#heap.length;
        // Start from the last non-leaf node and go upwards
        for (let i = this.#parent(n - 1); i >= 0; i--) {
            this.#sinkDown(i);
        }
    }

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
        return [...this.#heap];
    }

    #leftChild(index){
        return 2 * index + 1;
    }

    #rightChild(index){
        return 2 * index + 2;
    }

    #parent(index){
        return Math.floor((index - 1) / 2);
    }

    #swap(index1, index2){
        [this.#heap[index1], this.#heap[index2]] = [this.#heap[index2], this.#heap[index1]];
    }
}
```

### Explanation:
1. **`heapify()`**: The `heapify` function starts from the last non-leaf node (the parent of the last element) and performs the sink down operation on every node up to the root. This ensures that the entire array satisfies the heap property.
   - The last non-leaf node is at index `Math.floor((n - 1) / 2)`, where `n` is the size of the heap (or array).
2. **`#sinkDown()`**: This is the same as before and ensures that each node satisfies the heap property by swapping the current node with its larger child if necessary.

### Usage:
Now, you can create a heap from any random array by passing it to the constructor:

```javascript
let randomArray = [3, 9, 2, 1, 4, 5];
let heap = new Heap(randomArray);

console.log(heap.getHeap());  // Output: The array rearranged as a valid max-heap
```

If you run this, the `randomArray` will be rearranged to form a valid max-heap.


> ### Heap Sort


Heap sort is a comparison-based sorting algorithm that uses the properties of a binary heap to efficiently sort an array. It works in two main steps:

1. **Heapify the array**: Convert the input array into a max-heap.
2. **Sort the array**:
   - Repeatedly swap the root (maximum value) of the heap with the last element.
   - Reduce the heap size and call `sinkDown` (heapify) on the new root to maintain the heap property.
   - Repeat this process until the array is sorted.

### Steps for Heap Sort:
1. **Heapify the entire array**.
2. **Extract the maximum element** (which is at the root of the max-heap) and place it at the end of the array.
3. **Reduce the heap size by 1** and repeat the process for the remaining heap.

Here’s how you can implement heap sort in the `Heap` class:

### Heap Sort Implementation:

```javascript
class Heap {
    #heap = [];

    // Construct heap from an array
    constructor(arr) {
        this.#heap = arr;
        this.heapify();
    }

    // Insert function (not required for heap sort, but keeping it for completeness)
    insert(value){
        this.#heap.push(value);
        let current = this.#heap.length - 1;

        while(current > 0 && this.#heap[current] > this.#heap[this.#parent(current)]){
            this.#swap(current, this.#parent(current));
            current = this.#parent(current);
        }
    }

    // Remove function (also not required for heap sort)
    remove(){
        if(this.#heap.length === 0){
            return null;
        }

        if(this.#heap.length === 1){
            return this.#heap.pop();
        }

        const maxValue = this.#heap[0];
        this.#heap[0] = this.#heap.pop();
        this.#sinkDown(0);

        return maxValue;
    }

    // Heapify the array to build a valid max-heap
    heapify() {
        let n = this.#heap.length;
        for (let i = this.#parent(n - 1); i >= 0; i--) {
            this.#sinkDown(i);
        }
    }

    // Heap sort function
    heapSort() {
        let n = this.#heap.length;

        // First step: Heapify the array (already done in constructor)
        // Second step: Repeatedly extract the maximum element and restore the heap
        for (let i = n - 1; i > 0; i--) {
            // Move the current max (root of heap) to the end of the array
            this.#swap(0, i);
            // Reduce the heap size and heapify the root element
            this.#sinkDown(0, i);  // Pass 'i' to limit the heap size
        }

        return this.#heap;  // The sorted array
    }

    // Sink down function (modified to allow limiting the heap size for heap sort)
    #sinkDown(index, size = this.#heap.length) {
        let maxIndex = index;
        
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
        return [...this.#heap];
    }

    #leftChild(index){
        return 2 * index + 1;
    }

    #rightChild(index){
        return 2 * index + 2;
    }

    #parent(index){
        return Math.floor((index - 1) / 2);
    }

    #swap(index1, index2){
        [this.#heap[index1], this.#heap[index2]] = [this.#heap[index2], this.#heap[index1]];
    }
}
```

### Explanation:

1. **Heapify**: The array is first heapified using the `heapify()` function.
2. **Heap Sort**:
   - In the `heapSort()` function, we start by swapping the root (the largest element in a max-heap) with the last element of the array.
   - Then, we reduce the size of the heap by one and apply `#sinkDown()` to the root to maintain the heap property.
   - This process is repeated until the entire array is sorted.

### Usage:

You can now perform heap sort on any array as follows:

```javascript
let randomArray = [3, 9, 2, 1, 4, 5];
let heap = new Heap(randomArray);

console.log("Unsorted array:", heap.getHeap());

heap.heapSort();

console.log("Sorted array:", heap.getHeap());
```

### Time Complexity:
- **Heapify**: O(n)
- **Heap Sort**: O(n log n)

Heap sort is efficient, and in-place, and has a time complexity of **O(n log n)** for sorting an array. This implementation sorts the array in descending order because we are using a **max-heap**. If you want to sort in ascending order, simply reverse the result at the end.


> ### Priority queue

A **priority queue** is a special type of queue where each element is assigned a priority, and elements are dequeued in order of their priority rather than the order in which they were added. In the case of a **max-priority queue**, the highest priority (or the largest element) is dequeued first. In a **min-priority queue**, the smallest element is dequeued first.

A **heap** is commonly used to implement a priority queue because heaps efficiently support the insertion and removal of elements with a time complexity of **O(log n)**.

Let's extend the `Heap` class to implement a **priority queue**.

### Priority Queue Implementation

We will:
1. **Insert** elements with priority.
2. **Extract** elements based on their priority (i.e., either maximum or minimum depending on the type of heap).

Here’s a max-priority queue (using a max-heap) implementation:

```javascript
class PriorityQueue {
    #heap = [];

    // Insert a new element with its priority
    insert(value) {
        this.#heap.push(value);
        let current = this.#heap.length - 1;

        // Bubble up to maintain the heap property
        while (current > 0 && this.#heap[current] > this.#heap[this.#parent(current)]) {
            this.#swap(current, this.#parent(current));
            current = this.#parent(current);
        }
    }

    // Remove and return the element with the highest priority (max element)
    extractMax() {
        if (this.#heap.length === 0) {
            return null;  // If the heap is empty
        }

        if (this.#heap.length === 1) {
            return this.#heap.pop();  // If there's only one element
        }

        const maxValue = this.#heap[0];  // The max element (root of the heap)
        this.#heap[0] = this.#heap.pop();  // Move the last element to the root
        this.#sinkDown(0);  // Sink down the new root to maintain heap property

        return maxValue;  // Return the max element
    }

    // Peek at the highest priority element without removing it
    peek() {
        if (this.#heap.length === 0) {
            return null;
        }
        return this.#heap[0];  // The root contains the highest priority element
    }

    // Sink down to maintain the heap property after removal
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
                break;
            }
        }
    }

    // Get the current heap (optional for debugging purposes)
    getHeap() {
        return [...this.#heap];
    }

    #leftChild(index) {
        return 2 * index + 1;
    }

    #rightChild(index) {
        return 2 * index + 2;
    }

    #parent(index) {
        return Math.floor((index - 1) / 2);
    }

    #swap(index1, index2) {
        [this.#heap[index1], this.#heap[index2]] = [this.#heap[index2], this.#heap[index1]];
    }
}
```

### Explanation:

1. **Insert**: When inserting an element, we add it to the end of the heap (array) and then "bubble up" to ensure the heap property is maintained (i.e., parents are larger than children for a max-heap).
   
2. **ExtractMax**: The highest-priority element (root) is extracted by swapping it with the last element, removing the last element, and then applying the `sinkDown` operation to restore the heap property.

3. **Peek**: You can peek at the highest priority element (the root) without removing it.

### Usage:

```javascript
let pq = new PriorityQueue();

// Insert elements with priority
pq.insert(10);
pq.insert(20);
pq.insert(5);
pq.insert(30);

console.log("Priority Queue:", pq.getHeap());  // [30, 20, 5, 10]

// Extract max priority elements
console.log("Extract Max:", pq.extractMax());  // 30
console.log("Priority Queue after extract:", pq.getHeap());  // [20, 10, 5]

// Peek at the highest priority element
console.log("Peek Max:", pq.peek());  // 20
```

### Time Complexity:
- **Insert**: O(log n)
- **Extract Max**: O(log n)
- **Peek**: O(1)

### Min-Priority Queue:
If you want to implement a **min-priority queue**, where the smallest element has the highest priority, you simply need to modify the `insert` and `extractMin` functions to compare elements in the opposite way. Specifically:
- Change comparisons in `insert` and `sinkDown` so that smaller elements are moved upwards (for `bubbleUp`) and downwards (for `sinkDown`).



> ### Sort a K Sorted Array ( [Youtube video](https://www.youtube.com/watch?v=dYfM6J1y0mU&ab_channel=AdityaVerma) )

A **K-sorted array** (also known as a nearly sorted array) is an array where each element is at most `K` positions away from its target position. The goal is to efficiently sort this array.

To solve this problem, we can take advantage of a **min-heap**. The idea is to:
1. Use a heap of size `K+1` to keep track of the next `K+1` elements. Since every element is at most `K` positions away, the minimum element among the first `K+1` elements is guaranteed to be in its correct position.
2. As we move through the array, we extract the minimum element from the heap (which is in its correct position) and insert the next element from the array into the heap.

### Algorithm Steps:
1. Initialize a min-heap and insert the first `K+1` elements from the array into it.
2. Pop the minimum element from the heap (this will be the smallest element and in the correct position) and insert the next element from the array into the heap.
3. Repeat this process until you reach the end of the array.
4. Once the array has been traversed, continue to extract the remaining elements from the heap and place them in the array.

### Time Complexity:
- Building the initial heap with `K+1` elements takes **O(K)**.
- Extracting the minimum element and inserting a new element both take **O(log K)**, and since you do this for each element, the overall complexity is **O(n log K)**, where `n` is the total number of elements in the array.

### Code Implementation:

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Insert an element into the min-heap
    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    // Extract the minimum element from the heap
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const minValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);

        return minValue;
    }

    // Bubble up the last element to maintain heap property
    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;

            // Swap with parent
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // Sink down the root element to maintain heap property
    sinkDown(index) {
        let size = this.heap.length;
        let leftChild = 2 * index + 1;
        let rightChild = 2 * index + 2;
        let smallest = index;

        if (leftChild < size && this.heap[leftChild] < this.heap[smallest]) {
            smallest = leftChild;
        }
        if (rightChild < size && this.heap[rightChild] < this.heap[smallest]) {
            smallest = rightChild;
        }

        if (smallest !== index) {
            // Swap and continue sinking down
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.sinkDown(smallest);
        }
    }
}

function sortKSortedArray(arr, k) {
    let heap = new MinHeap();
    let result = [];
    let n = arr.length;

    // Insert the first K+1 elements into the heap
    for (let i = 0; i < Math.min(k + 1, n); i++) {
        heap.insert(arr[i]);
    }

    // Process the remaining elements in the array
    for (let i = k + 1; i < n; i++) {
        result.push(heap.extractMin());  // Extract min element and place it in result
        heap.insert(arr[i]);  // Insert next element from the array into the heap
    }

    // Extract the remaining elements from the heap
    while (heap.heap.length > 0) {
        result.push(heap.extractMin());
    }

    return result;
}

// Example usage:
let arr = [6, 5, 3, 2, 8, 10, 9];
let k = 3;

console.log("Original K-sorted array:", arr);
let sortedArray = sortKSortedArray(arr, k);
console.log("Sorted array:", sortedArray);
```

### Explanation:

1. **MinHeap Class**: This is a standard min-heap implementation with methods to `insert`, `extractMin`, `bubbleUp`, and `sinkDown` to maintain the heap property.
2. **sortKSortedArray Function**:
   - First, we insert the first `K+1` elements into the heap.
   - We then go through the rest of the array, always extracting the minimum element and inserting the next element from the array into the heap.
   - After processing all the elements, the remaining elements in the heap are extracted.

### Example:

For the array `[6, 5, 3, 2, 8, 10, 9]` with `K = 3`, the sorted array will be:

```
Original K-sorted array: [6, 5, 3, 2, 8, 10, 9]
Sorted array: [2, 3, 5, 6, 8, 9, 10]
```

This algorithm efficiently sorts the array while leveraging the property that each element is at most `K` positions away from its target position.


```js
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

