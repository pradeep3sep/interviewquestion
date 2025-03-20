# Table of Contents

- [Hash Map alogo ](#1-hash-map-alogo)
- [Prefix sum algorithm ](#2-prefix-sum-algorithm)
- [Two pointer algorithm ](#3-two-pointer-algorithm)
- [Two Sum Algorithm ](#4-two-sum-algorithm)
- [Sliding window algorithm ](#5-sliding-window-algorithm)
- [fast and slow pointer algorithm ](#6-fast-and-slow-pointer-algorithm)
- [Monotonic stack algorithm  ](#7-monotonic-stack-algorithm)
- [BFS and DFS algorithm  ](#8-bfs-and-dfs-algorithm)
- [Backtracking algorithm  ](#9-backtracking-algorithm)

<br>

## The Big O
The Big O is basically `worst-case` running `time` of an `algorithm` as the input size increases

```
https://www.bigocheatsheet.com/
```
<br>

> ### Measuring Space Complexity in Practice

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

<br>

> ### The difference between various notations
The differences between the time complexities \(O(1)\), \(O(log n)\), \(O(n)\), \(O(nlog n)\), and \(O(n^2)\) describe how the runtime of an algorithm scales with the size of the input \(n\). Here's a breakdown of each:

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

> ### Example: Analyzing Space Complexity

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

<br>

## Various alogorithm used in DSA

<br>

> ## Binary Search Algo O(log n)

> ### 704. Binary Search 

Given an array of integers nums which is `sorted in ascending order`, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

Example 1:\
**Input**: nums = [-1,0,3,5,9,12], target = 9\
**Output**: 4\
**Explanation**: 9 exists in nums and its index is 4

Example 2:\
**Input**: nums = [-1,0,3,5,9,12], target = 2\
**Output**: -1\
**Explanation**: 2 does not exist in nums so return -1

**Algorithm: Binary Search (Iterative)**  

<details>

- We maintain `left` and `right` pointers to track the search space.
- At each step:
  - Compute `mid = Math.floor((left + right) / 2)`.
  - Compare `nums[mid]` with `target`:
    - If equal, return `mid`.
    - If smaller, search in the right half (`left = mid + 1`).
    - If larger, search in the left half (`right = mid - 1`).
- If we exit the loop, return `-1` (not found).

```javascript
function search(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1; // Target not found
}

// Test Cases
console.log(search([-1,0,3,5,9,12], 9));  // **Output**: 4
console.log(search([-1,0,3,5,9,12], 2));  // **Output**: -1
console.log(search([1,2,3,4,5,6,7], 4));  // **Output**: 3
console.log(search([5], 5));              // **Output**: 0
console.log(search([], 3));               // **Output**: -1
```

</details>

<br>

[Back to Top](#table-of-contents)

> ## 1. Hash Map alogo
In this algo, we approach the question by converting it into objects.

> ### 594. Longest Harmonious Subsequence
We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.

Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.

Example 1:

**Input**: nums = [1,3,2,2,5,2,3,7]\
**Output**: 5

**Explanation**:\
The longest harmonious subsequence is [3,2,2,2,3].

Example 2:

**Input**: nums = [1,2,3,4]\
**Output**: 2

**Explanation**:\
The longest harmonious subsequences are [1,2], [2,3], and [3,4], all of which have a length of 2.

Example 3:

**Input**: nums = [1,1,1,1]\
**Output**: 0

**Explanation**:\
No harmonic subsequence exists.

video - https://youtu.be/Gu9aKI7Oj_I?si=cL7FY5gknzV-fjmY&t=284

<details>

```js
var findLHS = function(nums) {
    const frequencyMap = new Map();
    let maxLength = 0;

    // Count the frequency of each number
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Check pairs where the difference is exactly 1
    for (const [key, value] of frequencyMap.entries()) {
        if (frequencyMap.has(key + 1)) {
            maxLength = Math.max(maxLength, value + frequencyMap.get(key + 1));
        }
    }

    return maxLength;
};

// Example usage:
console.log(findLHS([1, 3, 2, 2, 5, 2, 3, 7])); // **Output**: 5
console.log(findLHS([1, 2, 3, 4]));             // **Output**: 2
console.log(findLHS([1, 1, 1, 1]));             // **Output**: 0
```

</details>

<br>

> ### 350. Intersection of Two Arrays II - (edge case - we can duplicate value in both array)

Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

Example 1:

**Input**: nums1 = [1,2,2,1], nums2 = [2,2]\
**Output**: [2,2]

Example 2:

**Input**: nums1 = [4,9,5], nums2 = [9,4,9,8,4]\
**Output**: [4,9]\
**Explanation**: [9,4] is also accepted.


<details>

```js
var intersect = function(nums1, nums2) {
    const countMap = {};
    const result = [];
    
    // Count occurrences of elements in nums1
    for (let num of nums1) {
        countMap[num] = (countMap[num] || 0) + 1;
    }
    
    // Check for intersections in nums2
    for (let num of nums2) {
        if (countMap[num] > 0) {
            result.push(num);
            countMap[num]--; // Decrement count
        }
    }
    
    return result;
};

// Example 1
console.log(intersect([1, 2, 2, 1], [2, 2])); // **Output**: [2, 2]

// Example 2
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4])); // **Output**: [4, 9]
```

</details>

<br>

> ### 1. Two Sum - LeetCode - Keep in mind we have use the hasOwnProperty,
`hasOwnProperty` - it handles edge case of 0 index, for 0 index it is true but being 0 is false it comes out of if condition.

Example 1:

**Input**: nums = [2,7,11,15], target = 9\
**Output**: [0,1]\
**Explanation**: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

**Input**: nums = [3,2,4], target = 6\
**Output**: [1,2]

Example 3:

**Input**: nums = [3,3], target = 6\
**Output**: [0,1]

yt - https://youtu.be/KLlXCFG5TnA

<details>

```js
var twoSum = function(nums, target) {
    let dic={}

    for(let i=0;i<nums.length;i++){
        let diff=target-nums[i]

        if(dic.hasOwnProperty(diff)){
            return [i,dic[diff]];
        }
        dic[nums[i]]=i
    }
    return null
};
twoSum([7,11,15,2],9)
```

</details>

<br>

> ### 13. Roman to Integer

Symbol    -   Value\
I          -   1\
V           -  5\
X            - 10\
L             - 50\
C             - 100\
D            - 500\
M            - 1000

I can be placed before V (5) and X (10) to make 4 and 9. \
X can be placed before L (50) and C (100) to make 40 and 90.\
C can be placed before D (500) and M (1000) to make 400 and 900.


Example 1:

**Input**: s = "III"\
**Output**: 3\
**Explanation**: III = 3.

Example 2:

**Input**: s = "LVIII"\
**Output**: 58\
**Explanation**: L = 50, V= 5, III = 3.

Example 3:

**Input**: s = "MCMXCIV"\
**Output**: 1994\
**Explanation**: M = 1000, CM = 900, XC = 90 and IV = 4.

<details>

```js
function romanToInt(roman) {
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let total = 0;

    for (let i = 0; i < roman.length; i++) {
        const currentVal = romanMap[roman[i]];
        const nextVal = romanMap[roman[i + 1]];

        if (nextVal > currentVal) {
            total -= currentVal; // Subtract if a smaller numeral comes before a larger one
        } else {
            total += currentVal; // Otherwise, add the value
        }
    }

    return total;
}

// Example usage
console.log(romanToInt("III"));    // **Output**: 3
console.log(romanToInt("IV"));     // **Output**: 4
console.log(romanToInt("IX"));     // **Output**: 9
console.log(romanToInt("LVIII"));  // **Output**: 58
console.log(romanToInt("MCMXCIV"));// **Output**: 1994
```
</details>


> ### Below code integer to roman

```
integerToRoman(123)
// 'CXXIII'

integerToRoman(1999)
// 'MCMXCIX'

integerToRoman(3420)
// 'MMMCDXX'
```

<details>

**Solution**

```js
function integerToRoman(num) {
  const numerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let result = '';

  for (let key in numerals) {
    while (num >= numerals[key]) {
      result += key;
      num -= numerals[key];
    }
  }

  return result;
}
```

</details>

<br>

[Back to Top](#table-of-contents)

<br>

> ## 2. Prefix sum algorithm 

[Youtube video for concept](https://www.youtube.com/watch?v=qmlrMrIObvs)

**`Hints when to use` - Find the sum of elements between indices `i` and `j` for multiple queries.**

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


- **Reason for subracting 1:**
    1. If `l == 0`, the sum of the subarray from index `0` to `r` is just `prefixSum[r]`.
    2. If `l > 0`, the sum of the subarray from index `l` to `r` can be calculated as:  
    `sum = prefixSum[r] - prefixSum[l-1]`.
    3. This works because `prefixSum[r]` gives the sum of elements from `0` to `r`, and subtracting `prefixSum[l-1]` removes the elements from `0` to `l-1`, leaving the sum of elements between `l` and `r`.

### Summary of Common Steps:
1. Build the prefix sum array in O(n) time.
2. Query the sum of any subarray in O(1) time by using the prefix sum array.

<details>

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

console.log(getRangeSum(prefixSum, 1, 3)); // **Output**: 18 (4 + 6 + 8)
console.log(getRangeSum(prefixSum, 0, 2)); // **Output**: 12 (2 + 4 + 6)
```
</details>

<br>

> ### Leetcode - 724 - Find Pivot Index

Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.

 

Example 1:

**Input**: nums = [1,7,3,6,5,6]\
**Output**: 3\
**Explanation**:\
The pivot index is 3.\
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11\
Right sum = nums[4] + nums[5] = 5 + 6 = 11


Example 2:

**Input**: nums = [1,2,3]\
**Output**: -1\
**Explanation**:\
There is no index that satisfies the conditions in the problem statement.

Example 3:

**Input**: nums = [2,1,-1]\
**Output**: 0\
**Explanation**:\
The pivot index is 0.\
Left sum = 0 (no elements to the left of index 0)\
Right sum = nums[1] + nums[2] = 1 + -1 = 0

<details>

```js
function findPivotIndex(nums) {
    // Calculate the total sum of the array manually
    let totalSum = 0;
    for (let i = 0; i < nums.length; i++) {
        totalSum += nums[i];
    }

    let leftSum = 0; // Initialize left sum

    for (let i = 0; i < nums.length; i++) {
        // Calculate the right sum dynamically
        let rightSum = totalSum - leftSum - nums[i];

        // Check if left sum equals right sum
        if (leftSum === rightSum) {
            return i;
        }

        // Update the left sum
        leftSum += nums[i];
    }

    return -1; // Return -1 if no pivot index exists
}

// Example Usage:
const nums = [1, 7, 3, 6, 5, 6];
console.log(findPivotIndex(nums)); // **Output**: 3
```
</details>

<br>

> ### 1413. Minimum Value to Get Positive Step by Step Sum
Given an array of integers nums, you start with an initial positive value startValue.\
In each iteration, you calculate the step by step sum of startValue plus elements in nums (from left to right).\
Return the minimum positive value of startValue such that the step by step sum is never less than 1.

Example 1:

**Input**: nums = [-3,2,-3,4,2]\
**Output**: 5\
**Explanation**: If you choose startValue = 4, in the third iteration your step by step sum is less than 1.

**step by step sum**
startVal=4 | startVal =5| nums\
(4 -3 ) = 1  | (5 -3 ) = 2    |  -3\
(1 +2 ) = 3  | (2 +2 ) = 4    |   2\
(3 -3 ) = 0  | (4 -3 ) = 1    |  -3\
(0 +4 ) = 4  | (1 +4 ) = 5    |   4\
(4 +2 ) = 6  | (5 +2 ) = 7    |   2

Example 2:

**Input**: nums = [1,2]\
**Output**: 1\
**Explanation**: Minimum start value should be positive. 

Example 3:

**Input**: nums = [1,-2,-3]\
**Output**: 5

`Video:` https://youtu.be/acIkZpmbiaA?si=zNiN1UkCKzastQ1S

<Details>

- basically jab prefix sum karte h ush time ush range ki jo min value hogi, utni value jodne pe sum 0 aayega but hume 1 jayda chaiye to, min value me 1 sum kr denge

```js
function minStartValue(nums) {
    let minSum = 0;
    let currentSum = 0;

    for (let num of nums) {
        currentSum += num;
        minSum = Math.min(minSum, currentSum);
    }

    // To ensure the step-by-step sum is never less than 1,
    // we need startValue to be at least 1 - minSum.
    return 1 - minSum;
}

// Example Usage
console.log(minStartValue([-3, 2, -3, 4, 2])); // **Output**: 5
console.log(minStartValue([1, 2]));            // **Output**: 1
console.log(minStartValue([1, -2, -3]));       // **Output**: 5
```

</Details>

<br>

> ### 1854. Maximum Population Year
You are given a 2D integer array logs where each logs[i] = [birthi, deathi] indicates the birth and death years of the ith person.

The population of some year x is the number of people alive during that year. The ith person is counted in year x's population if x is in the inclusive range [birthi, deathi - 1]. Note that the person is not counted in the year that they die.

Return the earliest year with the maximum population.

Example 1:

**Input**: logs = [[1993,1999],[2000,2010]]\
**Output**: 1993\
**Explanation**: The maximum population is 1, and 1993 is the earliest year with this population.

Example 2:

**Input**: logs = [[1950,1961],[1960,1971],[1970,1981]]\
**Output**: 1960\
**Explanation**:\
The maximum population is 2, and it had happened in years 1960 and 1970.\
The earlier year between them is 1960.

`video:` https://www.youtube.com/watch?v=v0xswVJnRlE

<Details>

```js
var maximumPopulation = function(logs) {
    const yearChanges = new Array(101).fill(0); // 1950 to 2050 inclusive

    logs.forEach(([birth, death]) => {
        yearChanges[birth - 1950]++; // Increment for birth year
        yearChanges[death - 1950]--; // Decrement for death year
    });

    let maxPopulation = 0;
    let maxYear = 1950;
    let currentPopulation = 0;

    for (let i = 0; i < yearChanges.length; i++) {
        currentPopulation += yearChanges[i];
        if (currentPopulation > maxPopulation) {
            maxPopulation = currentPopulation;
            maxYear = 1950 + i; // Convert index back to the actual year
        }
    }

    return maxYear;
};
```

</Details>

<br>

> ### 437. Path Sum III
Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

Example 1:

**Input**: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\
**Output**: 3\
**Explanation**: The paths that sum to 8 are shown.

Example 2:

**Input**: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\
**Output**: 3

`video:` https://youtu.be/UQzXYDN49cs?si=jxPPtTM3alVIQ5JF

<Details>

```js
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function pathSum(root, targetSum) {
    const prefixSumMap = new Map();
    prefixSumMap.set(0, 1); // Base case: one way to reach sum 0 is by not taking any nodes
    let count = 0;

    function dfs(node, currentSum) {
        if (!node) return;

        // Add the current node's value to the running sum
        currentSum += node.val;

        // Check if there's a prefix sum such that currentSum - prefixSum = targetSum
        const neededSum = currentSum - targetSum;
        if (prefixSumMap.has(neededSum)) {
            count += prefixSumMap.get(neededSum);
        }

        // Add the current running sum to the map
        prefixSumMap.set(currentSum, (prefixSumMap.get(currentSum) || 0) + 1);

        // Explore the left and right subtrees
        dfs(node.left, currentSum);
        dfs(node.right, currentSum);

        // Backtrack: Remove the current running sum from the map
        prefixSumMap.set(currentSum, prefixSumMap.get(currentSum) - 1);
    }

    dfs(root, 0);
    return count;
}

// Example usage:
// Create the tree: [10,5,-3,3,2,null,11,3,-2,null,1]
const root = new TreeNode(10,
    new TreeNode(5,
        new TreeNode(3, new TreeNode(3), new TreeNode(-2)),
        new TreeNode(2, null, new TreeNode(1))
    ),
    new TreeNode(-3, null, new TreeNode(11))
);

const targetSum = 8;
console.log(pathSum(root, targetSum)); // **Output**: 3
```

</Details>

<br>

[Back to Top](#table-of-contents)

> ## 3. Two pointer algorithm
In the two-pointer algorithm, there are several common steps or patterns that we typically follow, regardless of the specific problem. Here’s a generalized breakdown of the steps involved:

### 1. Initialize Two Pointers
   - One pointer is placed at the start (`left` or `i`) of the array.
   - The other pointer is placed at the end (`right` or `j`) of the array.
   
   ```javascript
   let left = 0;
   let right = arr.length - 1;
   ```

### 2. Loop Until the Two Pointers Meet
   - You continue the iteration while the `left` pointer is less than the `right` pointer.
   - In certain problems (like sliding window, string comparison), the loop condition could change slightly, but in the classic two-pointer approach, this is a common condition.
   
   ```javascript
   while (left < right) {
     // continue with logic
   }
   ```

### 3. Check a Condition with the Two Pointers
   - Inside the loop, you'll typically perform some kind of comparison or computation with the values at the two pointers (like summing them, checking their equality, etc.).
   - This condition will help determine the next move for the pointers.
   
   Example: Checking if the sum of the two pointers is equal to the target:
   ```javascript
   const sum = arr[left] + arr[right];
   if (sum === target) {
     return [arr[left], arr[right]];
   }
   ```

### 4. Move the Pointers Based on the Condition
   - **Increase the left pointer**: If the current sum (or comparison value) is less than the target, move the `left` pointer one step to the right (`left++`). This is usually done to increase the value.
   - **Decrease the right pointer**: If the current sum (or comparison value) is more than the target, move the `right` pointer one step to the left (`right--`). This is usually done to decrease the value.
   
   ```javascript
   if (sum < target) {
     left++;  // Move left pointer right to increase the sum
   } else {
     right--; // Move right pointer left to decrease the sum
   }
   ```

### 5. Edge Case Handling
   - Before the loop or within the loop, handle any special edge cases, like:
     - An empty array.
     - A single element.
     - Conditions where no solution exists.

### 6. Return the Result
   - Once the desired condition is met (like finding the target pair), return the result.
   - If no solution is found, return a failure condition (like `null` or an empty array).
   
   ```javascript
   return null; // If no pair or solution is found
   ```
<br>

> ### 11. Container With Most Water

You are given an integer array `height` of length `n`. There are n vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Example 1:

![screenshot](images/water.jpg)

**Input**: height = [1,8,6,2,5,4,8,3,7]\
**Output**: 49\
**Explanation**: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

Example 2:

**Input**: height = [1,1]\
**Output**: 1

[Youtube video for concept](https://youtu.be/EbkMABpP52U?si=oVee2x5W2xPP7dN3&t=869)

<details>

```js
var maxArea = function(height) {
    let l = 0;
    let r = height.length -1;
    let max = 0;

    while(l < r){
        let containerHeight = Math.min(height[l], height[r]);
        let containerWidth = r - l;
        let area = containerWidth * containerHeight;

        if(area > max){
            max = area
        }

        if(height[l] < height[r]){
            l++
        }else{
            r--
        }

    }
    return max
    
};
```

</details>

<br>

> ### 633. Sum of Square Numbers

Given a non-negative integer c, decide whether there're two integers a and b such that a2 + b2 = c.

Example 1:

**Input**: c = 5\
**Output**: true\
**Explanation**: 1 * 1 + 2 * 2 = 5

Example 2:

**Input**: c = 3\
**Output**: false

<details>

1. Start with **left pointer** at \( a = 0 \) and **right pointer** at \( b = \lfloor \sqrt{c} \rfloor \).  
2. Compute the sum of squares and compare it to \( c \).  
3. Adjust pointers accordingly:  
   - If sum is **less than** \( c \), increment \( a \).  
   - If sum is **greater than** \( c \), decrement \( b \).  
   - If sum **equals** \( c \), return `true`.  
4. If no such pair exists, return `false`.  

```javascript
var judgeSquareSum = function(c) {
    let left = 0, right = Math.floor(Math.sqrt(c));

    while (left <= right) {
        let sum = left * left + right * right;

        if (sum === c) return true;
        else if (sum < c) left++;
        else right--;
    }

    return false;
};

// Example test cases
console.log(judgeSquareSum(5)); // **Output**: true (1^2 + 2^2 = 5)
console.log(judgeSquareSum(3)); // **Output**: false
console.log(judgeSquareSum(4)); // **Output**: true (0^2 + 2^2 = 4)
console.log(judgeSquareSum(25)); // **Output**: true (3^2 + 4^2 = 25)
console.log(judgeSquareSum(1000)); // **Output**: true (6^2 + 28^2 = 1000)
```

</details>

<br>

> ### 849. Maximize Distance to Closest Person

You are given an array representing a row of seats where seats[i] = 1 represents a person sitting in the ith seat, and seats[i] = 0 represents that the ith seat is empty.\
There is at least one empty seat, and at least one person sitting.\
Alex wants to sit in the seat such that the distance between him and the closest person to him is maximized. 

Return that maximum distance to the closest person.

**Example 1:**

**Input**: seats = [1,0,0,0,1,0,1]\
**Output**: 2\
**Explanation**:\
If Alex sits in the second open seat (i.e. seats[2]), then the closest person has distance 2.\
If Alex sits in any other open seat, the closest person has distance 1.\
Thus, the maximum distance to the closest person is 2.

**Example 2:**

**Input**: seats = [1,0,0,0]\
**Output**: 3\
**Explanation**:\
If Alex sits in the last seat (i.e. seats[3]), the closest person is 3 seats away.\
This is the maximum distance possible, so the answer is 3.

**Example 3:**

**Input**: seats = [0,1]\
**Output**: 1

<details>

#### **Approach:**
1. **Find the first occupied seat** → This helps in handling leading empty seats.
2. **Find the last occupied seat** → This helps in handling trailing empty seats.
3. **Find the maximum gap between two occupied seats**:
   - Traverse the array and calculate the distance between two consecutive `1`s.
   - The maximum half of the gap (`floor(gap / 2)`) determines the best seat in that gap.


### **JavaScript Solution**
```javascript
// Algorithm: Two-Pointer Traversal
function maxDistToClosest(seats) {
    let maxDist = 0;
    let prev = -1; // Track the previous occupied seat index
    
    for (let i = 0; i < seats.length; i++) {
        if (seats[i] === 1) {
            if (prev === -1) {
                // Handle leading zeros case (first occupied seat)
                maxDist = i;
            } else {
                // Find the max gap distance
                maxDist = Math.max(maxDist, Math.floor((i - prev) / 2));
            }
            prev = i; // Update last occupied seat
        }
    }
    
    // Handle trailing zeros case (last occupied seat)
    maxDist = Math.max(maxDist, seats.length - 1 - prev);
    
    return maxDist;
}

// Test Cases
console.log(maxDistToClosest([1,0,0,0,1,0,1])); // **Output**: 2
console.log(maxDistToClosest([1,0,0,0]));       // **Output**: 3
console.log(maxDistToClosest([0,1]));           // **Output**: 1
console.log(maxDistToClosest([1,0,0,1]));       // **Output**: 1
console.log(maxDistToClosest([0,0,1,0,1,0,0,0])); // **Output**: 3
```

#### ****Input**:**  
```js
seats = [1,0,0,0,1,0,1]
```

We maintain a variable `prev` to store the index of the last occupied seat and compute the maximum distance.

| Index | Seat Value | Action |
|--------|------------|-----------|
| 0      | 1         | `prev = 0` (First occupied seat) |
| 1      | 0         | Empty seat |
| 2      | 0         | Empty seat |
| 3      | 0         | Empty seat |
| 4      | 1         | **Found occupied seat at index 4**, compute the gap: `(4 - 0) / 2 = 2` → `maxDist = 2`, update `prev = 4` |
| 5      | 0         | Empty seat |
| 6      | 1         | **Found occupied seat at index 6**, compute the gap: `(6 - 4) / 2 = 1`, no change to `maxDist` |


</details>

<br>


[Back to Top](#table-of-contents)

> ##  4. Two Sum Algorithm

**it is advance case of two pointer alogo, which is specially used when given sum of two number equal to required no.**

Simple logic - It works like create a `object` and `add keys` in it with `value as index or just count` of array, then iterate over array and check if `(sum - current number)` exist in the obejct.


- Create an empty Hash Set or Unordered Set
- Iterate through the array and for each number in the array:
    - Calculate the complement (target – current number).
    - Check if the complement exists in the set:
        - If it is, then pair found.
        - If it isn’t, add the current number to the set.
- If the loop completes without finding a pair, return that no pair exists.

<br>

> ### Max Number of K-Sum Pairs

You are given an integer array nums and an integer k.

In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.

Return the maximum number of operations you can perform on the array.

Example 1:

**Input**: nums = [1,2,3,4], k = 5\
**Output**: 2

**Explanation**: Starting with nums = [1,2,3,4]:\
- Remove numbers 1 and 4, then nums = [2,3]\
- Remove numbers 2 and 3, then nums = []\
There are no more pairs that sum up to 5, hence a total of 2 operations.

Example 2:

**Input**: nums = [3,1,3,4,3], k = 6\
**Output**: 1

**Explanation**: Starting with nums = [3,1,3,4,3]:\
- Remove the first two 3's, then nums = [1,4,3]\
There are no more pairs that sum up to 6, hence a total of 1 operation.

<details>

```js
var maxOperations = function(nums, k) {
     let count = 0;
    let map = new Map();

    for (let num of nums) {
        let complement = k - num;
        if (map.has(complement) && map.get(complement) > 0) {
            count++;
            map.set(complement, map.get(complement) - 1); 
        } else {
            map.set(num, (map.get(num) || 0) + 1);
        }
    }

    return count;
};
```

</details>

<br>

> ### 1010. Pairs of Songs With Total Durations Divisible by 60

You are given a list of songs where the ith song has a duration of time[i] seconds.

Return the number of pairs of songs for which their total duration in seconds is divisible by 60. Formally, we want the number of indices i, j such that i < j with (time[i] + time[j]) % 60 == 0.

Example 1:

**Input**: time = [30,20,150,100,40]\
**Output**: 3\
**Explanation**: Three pairs have a total duration divisible by 60:\
(time[0] = 30, time[2] = 150): total duration 180\
(time[1] = 20, time[3] = 100): total duration 120\
(time[1] = 20, time[4] = 40): total duration 60

Example 2:

**Input**: time = [60,60,60]\
**Output**: 3\
**Explanation**: All three pairs have a total duration of 120, which is divisible by 60.

<details>

```js
function numPairsDivisibleBy60(time) {
    // Array to store counts of remainders, jab hum 60 se divide krenge to 
    // remainder 1 se 59 k beech aayega to 60 blank array bnaye h
    let remainderCount = new Array(60).fill(0); 
    let count = 0;

    // main concept- ek ka remainder dusre k remainder me add krene pe 60 ka divisble hoga to wo pair correct h

    for (let t of time) {

        // Calculate the remainder of the current time when divided by 60
        let remainder = t % 60;
        
        // Calculate the complementary remainder, complement means kitna aur chaiye 60 divisble k liye
        let complement = (60 - remainder) % 60;

        // agr complement array me exist karta h to count badha do
        count = count + remainderCount[complement];

        // Update the remainder count
        remainderCount[remainder]++;
    }

    return count;
}

// Example usage:
const time1 = [30, 20, 150, 100, 40];
console.log(numPairsDivisibleBy60(time1)); // **Output**: 3

const time2 = [60, 60, 60];
console.log(numPairsDivisibleBy60(time2)); // **Output**: 3
```
</details>

<br>

[Back to Top](#table-of-contents)

> ## 5. Sliding window algorithm

[Youtube video for concept](https://www.youtube.com/watch?v=uqGxFk0cEdI)

`Trick` - when we have to find min or max length of string or array, which have to do operations

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

<br>

> ### Maximum Average Subarray I

Example 1:

**Input**: nums = [1,12,-5,-6,50,3], k = 4\
**Output**: 12.75\
**Explanation**: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

Example 2:

**Input**: nums = [5], k = 1\
**Output**: 5.00

<details>

```js
var findMaxAverage = function(nums, k) {
    let sum = 0;
    for(let i = 0; i < k; i++) {
        sum += nums[i];
    }
    
    let maxSum = sum;
    for(let i = k; i < nums.length; i++) {
        sum = sum - nums[i-k] + nums[i];  // i-k is the important part
        maxSum = Math.max(maxSum, sum);
    }
    
    return maxSum/k;  
};
```
</details>

<br>

> ### 1004. Max Consecutive Ones

Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

Example 1:

**Input**: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2\
**Output**: 6\
**Explanation**: [1,1,1,0,0,.1,.1,.1,.1,.1,.1]\
dotted numbers were flipped from 0 to 1. The longest subarray is underlined.

Example 2:

**Input**: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3\
**Output**: 10\
**Explanation**: [0,0,.1,.1,.1,.1,.1,.1,.1,.1,.1,.1,0,0,0,1,1,1,1]\
dotted numbers were flipped from 0 to 1. The longest subarray is underlined.

[Youtube video for concept](https://youtu.be/7FE5Q_Bqzw8?si=uKw4xkjOtPBZzeUi&t=132)

<details>

```js
var longestOnes = function(nums, k) {
  let l =0;
  let r =0;
  let zeros = 0;
  let maxLength =0;
  while(r < nums.length){
    if(nums[r] === 0) {
        zeros++;
    }
    if(zeros > k){
        if(nums[l]=== 0){
            zeros--;
        }
        l++;
    }
   
    maxLength = Math.max(maxLength, r-l+1)
    r++;

  }  
  return maxLength;
};
longestOnes([1,1,1,0,0,0,1,1,1,1,0],2)
```

</details>

<br>

> ### Q-1234. Replace the Substring for Balanced String

You are given a string s of length n containing only four kinds of characters: 'Q', 'W', 'E', and 'R'.

A string is said to be balanced if each of its characters appears n / 4 times where n is the length of the string.

Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced. If s is already balanced, return 0.

 

Example 1:

**Input**: s = "QWER"\
**Output**: 0\
**Explanation**: s is already balanced.

Example 2:

**Input**: s = "QQWE"\
**Output**: 1\
**Explanation**: We need to replace a 'Q' to 'R', so that "RQWE" (or "QRWE") is balanced.

Example 3:

**Input**: s = "QQQW"\
**Output**: 2\
**Explanation**: We can replace the first "QQ" to "ER". 

<details>

### Approach

1. **Frequency Calculation**: Count the occurrences of each character.
2. **Sliding Window**: Use a sliding window to find the minimum substring length that can be replaced to balance the string.



### JavaScript Solution

```javascript
function balancedString(s) {
    const n = s.length;
    const requiredCount = n / 4;
    const charCount = { Q: 0, W: 0, E: 0, R: 0 };

    // Count occurrences of each character
    for (const char of s) {
        charCount[char]++;
    }

    // Check if already balanced
    if (Object.values(charCount).every(count => count === requiredCount)) {
        return 0;
    }

    let minLength = n;
    let left = 0;

    for (let right = 0; right < n; right++) {
        charCount[s[right]]--;

        // Check if current window satisfies the balance condition
        while (
            Object.values(charCount).every(
                count => count <= requiredCount
            )
        ) {
            minLength = Math.min(minLength, right - left + 1);  // (right - left + 1) this part gives the length of sliding window
            charCount[s[left]]++; // to get the optimized value count, we need to check by decreasing the count along with increasing the count
            left++;
        }
    }

    return minLength;
}

// Example usage:
const s = "WQWRQQQW";
console.log(balancedString(s)); // **Output**: 3
```


### **Explanation**

1. **Initial Count**: Calculate the count of `'Q'`, `'W'`, `'E'`, and `'R'` in the string.
2. **Sliding Window**:
   - Expand the window by increasing `right`.
   - Check if the substring inside the window can balance the string.
   - If so, try shrinking the window by increasing `left` to find the minimum possible length.
3. **Result**: Return the minimum substring length that needs to be replaced.

This approach ensures an efficient solution with a time complexity of \(O(n)\).

</details>

<br>

[Back to Top](#table-of-contents)

> ## 6. fast and slow pointer algorithm

[Youtube video for concept](https://www.youtube.com/watch?v=XWyXy2aNrXM)

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

> ### 141. Detecting a Cycle in a Linked List

<details>

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
</details>

> ### Finding the Start of the Cycle

<details>

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
</details>

### Use Cases of Fast and Slow Pointer Algorithm:
- **Cycle Detection in Linked List**: As shown in the examples above, this is one of the most common uses.
- **Find the Middle of a Linked List**: Move one pointer one step and the other pointer two steps, and the slow pointer will be at the middle when the fast pointer reaches the end.
- **Detecting Palindromes**: Useful in determining if a list or array is a palindrome by moving pointers towards the center.
  
<br>

> ### 876. Middle of the Linked List
- To find the **middle of a linked list** using the `fast and slow pointer` technique

<details>

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
console.log(middle.value);  // **Output**: 3 (Middle of the list)
```
</details>

### Handling Even and Odd Length Lists:
- If the list has **odd** length (e.g., 5 nodes), the `slow` pointer will point to the exact middle (e.g., 3 in the list `1 → 2 → 3 → 4 → 5`).
- If the list has **even** length (e.g., 6 nodes), the `slow` pointer will point to the first of the two middle elements (e.g., 3 in the list `1 → 2 → 3 → 4 → 5 → 6`).

You can adjust the logic depending on whether you want to return the first or second middle element in an even-length list. 

<br>

[Back to Top](#table-of-contents)

> ## 7. Monotonic stack algorithm
[Youtube video for concept](https://www.youtube.com/watch?v=Dq_ObZwTY_Q&t=152s)

[website](https://algo.monster/problems/mono_stack_intro)

The word "monotonic" means a list or a function is either always increasing, or always decreasing.

Monotonic stack is like a regular stack with one key distinction in the push operation: Before we push a new element onto the stack, we first check if adding it breaks the monotonic condition. If it does, then we pop the top element off the stack until pushing the new element no longer breaks the monotonic condition.


The monotonic stack is a useful data structure that maintains elements in a sorted order (increasing or decreasing) as you traverse an array or a list. It's commonly used in problems involving finding the **next greater element**, **previous smaller element**, or similar scenarios.

Here’s a breakdown of the **monotonic stack algorithm** in JavaScript:

### Algorithm:
1. **Decide the Stack Type**: Use an **increasing stack** (top-to-bottom smallest to largest) or **decreasing stack** (top-to-bottom largest to smallest) based on the problem.
2. **Iterate through the Array**: Traverse the array from left-to-right or right-to-left as required.
3. **Push/Pop Elements**:
   - While the stack is not empty and the current element violates the monotonic property, pop elements from the stack.
   - Push the current element (or its index) onto the stack.
4. **Process Results**: Based on the problem, use the stack to calculate results.



### Example: **Next Greater Element**
Here’s an example implementation for finding the **next greater element** for each element in an array:

```javascript
function nextGreaterElements(nums) {
    let stack = [];
    let result = Array(nums.length).fill(-1); // Initialize result array with -1

    for (let i = 0; i < nums.length; i++) {
        // While the stack is not empty and the current element is greater
        // than the element corresponding to the index on top of the stack
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            let index = stack.pop();
            result[index] = nums[i]; // Update the result array
        }
        stack.push(i); // Push the current index
    }

    return result;
}

// Example usage:
let nums = [2, 1, 2, 4, 3];
console.log(nextGreaterElements(nums)); // **Output**: [4, 2, 4, -1, -1]
```


### **Explanation**:
- **Stack stores indices**: The stack contains indices of the elements in the array.
- **While condition**: If the current element is greater than the element at the top of the stack, pop from the stack, and update the result for that index.
- **Push the index**: Push the current index onto the stack to process later.


<br>

## Big O of various operations in data structure

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

<br>

[Back to Top](#table-of-contents)

<br>

[Back to Top](#table-of-contents)

> ## 9. Backtracking algorithm

Backtracking is controlled recursion


> ### Permutations of a String ( [Youtube video](https://youtu.be/mEBEw_xScsE?si=ExivZgmnO9MfF2J-&t=884) )

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

<details>

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

### **Output**:
```
[ 'ABC', 'ACB', 'BAC', 'BCA', 'CBA', 'CAB' ]
```
</details>

![screenshot](images/flow-backtrack.png)

<br>

![screenshot](images/backtrack.png)

### Time Complexity:
- The time complexity is **O(n!)**, where \( n \) is the length of the string. This is because there are \( n! \) permutations for a string of length \( n \).

<br>

> ### 671. Second Minimum Node In a Binary Tree
- Given a non-empty special `binary tree` consisting of nodes with the non-negative value, 
- where `each node` in this tree has `exactly two or zero sub-node`. 
- If the node has two sub-nodes, then this `node's value` is the `smaller value` among `its two sub-nodes`. More formally, the property `root.val = min(root.left.val, root.right.val)` always holds.

Given such a binary tree, you need to output the second minimum value in the set made of all the nodes' value in the whole tree.

If no such second minimum value exists, output -1 instead.

Example 1:

**Input**: root = [2,2,5,null,null,5,7]\
**Output**: 5\
**Explanation**: The smallest value is 2, the second smallest value is 5.

Example 2:

**Input**: root = [2,2,2]\
**Output**: -1\
**Explanation**: The smallest value is 2, but there isn't any second smallest value.

```js
var findSecondMinimumValue = function(root) {
    if (!root || !root.left || !root.right) return -1;

    let firstMin = root.val;
    let secondMin = Infinity;

    const traverse = (node) => {
        if (!node) return;

        if (node.val > firstMin && node.val < secondMin) {
            secondMin = node.val;
        } else if (node.val === firstMin) {
            traverse(node.left);
            traverse(node.right);
        }
    };

    traverse(root);

    return secondMin === Infinity ? -1 : secondMin;
};

// Example usage:
const root = {
    val: 2,
    left: { val: 2, left: null, right: null },
    right: { 
        val: 5, 
        left: { val: 5, left: null, right: null }, 
        right: { val: 7, left: null, right: null }
    }
};

console.log(findSecondMinimumValue(root)); // **Output**: 5 `
```

<br>

## Strings

> ### Palindrome

<details>

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


second approach

```js
function isPalindrome(s) {

    // Initialize two pointers
    let left = 0;
    let right = s.length - 1;

    // Iterate while left pointer is less than right pointer
    while (left < right) {
        // Compare characters at the pointers
        if (s[left] !== s[right]) {
            return false;
        }
        // Move pointers inward
        left++;
        right--;
    }

    return true; // The string is a palindrome
}
```
</details>

> ### 680. Valid Palindrome II
Given a string s, return true if the s can be palindrome after deleting at most one character from it.

Example 1:

**Input**: s = "aba"\
**Output**: true

Example 2:

**Input**: s = "abca"\
**Output**: true\
**Explanation**: You could delete the character 'c'.

Example 3:

**Input**: s = "abc"\
**Output**: false

<details>

```js
function validPalindrome(s) {
    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            // Try removing one character from either end
            return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
        }
        left++;
        right--;
    }

    return true;
}

// Example usage
console.log(validPalindrome("aba"));  // true
console.log(validPalindrome("abca")); // true
console.log(validPalindrome("abc"));  // false
```
</details>

<br>

> ### 859. Buddy Strings
Given two strings s and goal, return true if you can swap two letters in s so the result is equal to goal, otherwise, return false.

Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and swapping the characters at s[i] and s[j].

For example, swapping at indices 0 and 2 in "abcd" results in "cbad".
 

Example 1:

**Input**: s = "ab", goal = "ba"\
**Output**: true\
**Explanation**: You can swap s[0] = 'a' and s[1] = 'b' to get "ba", which is equal to goal.\

Example 2:

**Input**: s = "ab", goal = "ab"\
**Output**: false\
**Explanation**: The only letters you can swap are s[0] = 'a' and s[1] = 'b', which results in "ba" != goal.

Example 3:

**Input**: s = "aa", goal = "aa"\
**Output**: true\
**Explanation**: You can swap s[0] = 'a' and s[1] = 'a' to get "aa", which is equal to goal.

<details>

```js
function buddyStrings(s, goal) {
    if (s.length !== goal.length) return false;

    if (s === goal) { // for the case like s="aa" and goal="aa"
        // If s and goal are the same, check if there is a duplicate character
        const charSet = new Set(s);
        return charSet.size < s.length; // Duplicate characters exist
    }

    let diffs = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== goal[i]) {
            diffs.push(i);
            if (diffs.length > 2) return false; // More than two differences
        }
    }

    // Check if there are exactly two differences and they can be swapped
    return diffs.length === 2 &&
           s[diffs[0]] === goal[diffs[1]] &&
           s[diffs[1]] === goal[diffs[0]];
}
```

</details>

<br>



> ### Subsequence & Substring

**Main defination of Subsequence** of "abc" are  a, b, c, ab, bc, ac, abc. Keep in mind order matter because "ca" is not a subsequence\
count of subsequence is 2^n, where n is length of string.


**Substring** - All characters in substring appear `consecutively` in the original string. eg `"abcdef"`, `abc` and `def` are `substring`.

**Subsequence** - It is sequence of characters that appear in the same order as in the original string, but not necessarily consecutivaly. you can skip character but order must remain remain same. eg -`"abcdef"`, `ace` and `bdf` are `subsequence`.

<br>

> ### 2099. Find Subsequence of Length K With the Largest Sum

You are given an integer array nums and an integer k. You want to find a subsequence of nums of length k that has the largest sum.

Return any such subsequence as an integer array of length k.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

Example 1:

**Input**: nums = [2,1,3,3], k = 2\
**Output**: [3,3]\
**Explanation**:\
The subsequence has the largest sum of 3 + 3 = 6.

Example 2:

**Input**: nums = [-1,-2,3,4], k = 3\
**Output**: [-1,3,4]\
**Explanation**:\
The subsequence has the largest sum of -1 + 3 + 4 = 6.

Example 3:

**Input**: nums = [3,4,3,3], k = 2\
**Output**: [3,4]\
**Explanation**:\
The subsequence has the largest sum of 3 + 4 = 7. \
Another possible subsequence is [4, 3].

<details>

```js
var maxSubsequence = function(nums, k) {
    debugger
   const indexnums = nums.map((nums,index) => [nums,index])

   indexnums.sort((a,b) => b[0] - a[0])

   const top = indexnums.slice(0,k) 

   top.sort((a,b) => a[1] - b[1])
   
   return top.map(pair =>pair[0])
};

maxSubsequence([-1,-2,3,4],3)
```

</details>

<br>

> ### Check if a String is Subsequence of Other

console.log(isSubsequence("abc", "ahbgdc")); // true\
console.log(isSubsequence("axc", "ahbgdc")); // false

<details>

To check if a string is a subsequence of another string in JavaScript, you can use a `two-pointer` technique. 

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

### **Explanation**:
- `s1` is the string we're checking as a subsequence.
- `s2` is the main string.
- The code uses two pointers (`i` for `s1`, and `j` for `s2`). It traverses `s2`, and when characters match, the pointer `i` is incremented. If all characters of `s1` are matched before the end of `s2`, then `s1` is a subsequence of `s2`.

This approach runs in O(n) time complexity, where `n` is the length of `s2`.

</details>

<br>

> ### 438. Anagram Substring Search (Or Search for all permutations) ( [Youtube video](https://youtu.be/fYgU6Bi2fRg?si=HoRG7uxp0GCmxlCA&t=185) )

**Example**:

**Input**: txt = “BACDGABCDA”,  **pat** = “ABCD”\
**Output**: [0, 5, 6]\
**Explanation**: “BACD” is at 0, “ABCD” at 5 and “BCDA” at 6

**Input**: txt = “AAABABAA”, **pat** = “AABA”   \
**Output**:  [0, 1, 4]\
**Explanation**: “AAAB” is at 0, “AABA” at 5 and “ABAA” at 6


<details>

### Approach: Sliding Window + Frequency Count
To solve this efficiently, we can use the `sliding window technique` with `frequency count` of characters. The key idea is:
1. Maintain a frequency count of the characters in the pattern.
2. Slide a window of the same length as the pattern over the text.
3. At each step, compare the frequency of characters in the current window with the frequency count of the pattern.


### Code Implementation in JavaScript:

```javascript
// Function to find all anagram start indices in the text
function findAnagrams(text, pattern) {
    let result = [];
    let patternLength = pattern.length;
    let textLength = text.length;

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

### **Explanation**:
- We convert each character to an index (`0` for `'a'`, `1` for `'b'`, etc.) using the `charToIndex` function.
- We create two frequency arrays (`patternCount` and `windowCount`):
  - `patternCount` stores the frequency of characters in the pattern.
  - `windowCount` stores the frequency of characters in the current sliding window of the text.
- We slide a window of length equal to the pattern's length across the text:
  - If the frequency arrays match, the current window is an anagram of the pattern, so we store the starting index.
  - After moving the window, we update the frequency of the characters in the window.
- Finally, we check the last window for a match.


### Time Complexity:
- **O(n)** where `n` is the length of the text. We visit each character of the text only once while sliding the window.

</details>

<br>

> ### Lexicographic Rank of a String ( [Youtube video](https://youtu.be/uUN8fVPrJn0?si=Ege3okmmRJvxt331) )

**If needed, can refer the GFG code also https://www.geeksforgeeks.org/lexicographic-rank-of-a-string/**

<details>

**Detailed Steps:**

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

### **Explanation**:

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

### **Output**:

For the input `"STRING"`:

```
Lexicographic rank of "STRING" is: 598
```

### Time Complexity:

- **O(n)**: We are precomputing the factorials in O(n) and calculating the rank by iterating over the string once. Accessing and updating the frequency array takes constant time (`O(1)` for each character).
  
### Space Complexity:

- **O(1)** (if we ignore the factorial array and frequency array). Otherwise, it is **O(256)** for the frequency array and **O(n)** for the factorial array.

</details>

<br>

> ### 1071 - Greatest Common Divisor of Strings

Given two strings str1 and str2, return the `largest` string x such that x divides both str1 and str2.

 

Example 1:

**Input**: str1 = "ABCABC", str2 = "ABC"\
**Output**: "ABC"


Example 2:

**Input**: str1 = "ABABAB", str2 = "ABAB"\
**Output**: "AB"


Example 3:

**Input**: str1 = "LEET", str2 = "CODE"\
**Output**: ""

<details>

```js
var gcdOfStrings = function (str1, str2) {
    // (1)
    if (str1 + str2 !== str2 + str1) {
        return "";
    }

    // (2)
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

    // (3)
    const maxLength = gcd(str1.length, str2.length);
    return str1.slice(0, maxLength);
};
```
For point 1;\
Since both strings contains multiples of the identical segment `base`, their concatenation must be consistent, regardless of the order `(str1 + str2 = str2 + str1)`.

For point 2;\
It is basically getting the `HCF` of two numbers.
```js
const gcd = (a, b) => {
    // Step 1: Check if `b` is 0. If so, return `a` as the GCD.
    if (b === 0) {
        return a;
    }

    // Step 2: Calculate the remainder of `a` divided by `b`.
    const remainder = a % b;

    // Step 3: Recursively call gcd with `b` and the remainder.
    return gcd(b, remainder);
};
```
How Does the above Euclidean Algorithm Work?

If b is 0, then a is the GCD (because any number divided by itself or zero has itself as the largest divisor).\
Otherwise, replace a with b and b with a % b (the remainder when a is divided by b).\
Repeat this process until b becomes 0.\
This is a recursive algorithm, meaning the function repeatedly calls itself with smaller values until a base case (b === 0) is reached.

Example Calculation: GCD of 48 and 18\
Let’s break it down step by step:

Initial **Input**: a = 48, b = 18

remainder = 48 % 18 = 12\
Call gcd(18, 12).\
Second Step: a = 18, b = 12

remainder = 18 % 12 = 6\
Call gcd(12, 6).\
Third Step: a = 12, b = 6

remainder = 12 % 6 = 0\
Call gcd(6, 0).\
Final Step: b = 0

Base case is reached, return a = 6.\
Thus, the GCD of 48 and 18 is 6.


For point 3;\

maxLength gives the the length of repeation of the identical segment `base` in the first string.\

</details>

<br>

> ### 345. Reverse Vowels of a String

Example 1:\
**Input**: s = "IceCreAm"\
**Output**: "AceCreIm"

**Explanation**:\
The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

Example 2:\
**Input**: s = "leetcode"\
**Output**: "leotcede"


Hint is here that we have used the `two pointer therorem`.

<details>

```js
var reverseVowels = function (s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

    let left = 0;
    let right = s.length - 1;
    let r = s.split('');
    // debugger

    while (left < right) {
        // debugger
        if (!vowels.has(r[right])) right--;
        else if (!vowels.has(r[left])) left++;
        else {
            [r[left], r[right]] = [r[right], r[left]] 
            left++;
            right--;
        }
    }
    return r.join('');
};

reverseVowels('IceCreAm')
```

</details>

<br>

> ### 238. Product of Array Except Self

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

You must write an algorithm that runs in `O(n)` time and `without using the division operation`.

Example 1:

**Input**: nums = [1,2,3,4]\
**Output**: [24,12,8,6]

Example 2:

**Input**: nums = [-1,1,0,-3,3]\
**Output**: [0,0,9,0,0]

<details>

### Approach:
We can solve this problem by using two auxiliary arrays:
1. **Left Product Array**: Contains the product of all elements to the left of the current index.
2. **Right Product Array**: Contains the product of all elements to the right of the current index.

However, to optimize for space, we can avoid the auxiliary arrays and calculate the result directly in one pass after maintaining cumulative products.

video - https://youtu.be/bNvIQI2wAjk

```js
var productExceptSelf = function(nums) {
    
    const result = [];
    
    // Step 1: Calculate the prefix product (left product)
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    // result will be [1, 1, 2, 6]

    // Step 2: Calculate the suffix product (right product) and multiply
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
};
productExceptSelf([1,2,3,4])
// [24,12,8,6]
```
</details>

<br>

> ### Increasing Triplet Subsequence

Given an integer array nums, return true if there exists a triple of indices `(i, j, k)` such that `i < j < k` and `nums[i] < nums[j] < nums[k]`. If no such indices exists, return false.

 

Example 1:

**Input**: nums = [1,2,3,4,5]\
**Output**: true\
**Explanation**: Any triplet where i < j < k is valid.

Example 2:

**Input**: nums = [5,4,3,2,1]\
**Output**: false\
**Explanation**: No triplet exists.

Example 3:

**Input**: nums = [2,1,5,0,4,6]\
**Output**: true\
**Explanation**: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.

<details>

#### Steps:
1. Maintain two variables `first` and `second` to represent the smallest and second smallest numbers found so far.
2. Traverse the array:
   - If the current number is smaller than or equal to `first`, update `first`.
   - Else if the current number is smaller than or equal to `second`, update `second`.
   - Otherwise, if the current number is greater than `second`, we have found our triplet, so return `true`.

3. If no triplet is found after the loop, return `false`.

### Implementation in JavaScript:
```javascript
function increasingTriplet(nums) {
    let first = nums[0];  // Smallest number so far
    let second = Infinity; // Second smallest number so far

    for (let num of nums) {
        if (num <= first) {
            first = num; // Update the smallest number
        } else if (num <= second) {
            second = num; // Update the second smallest number
        } else {
            // Found a number greater than both first and second
            return true;
        }
    }
    return false; // No triplet found
}

// Example usage
console.log(increasingTriplet([1, 2, 3, 4, 5])); // true
console.log(increasingTriplet([5, 4, 3, 2, 1])); // false
console.log(increasingTriplet([2, 1, 5, 0, 4, 6])); // true
```
</details>

<br>

> ### String Compression

You must write an algorithm that uses only constant extra space.

Example 1:

**Input**: chars = ["a","a","b","b","c","c","c"]\
**Output**: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]\
**Explanation**: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".

Example 2:

**Input**: chars = ["a"]\
**Output**: Return 1, and the first character of the input array should be: ["a"]\
**Explanation**: The only group is "a", which remains uncompressed since it's a single character.

Example 3:

**Input**: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]\
**Output**: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].\
**Explanation**: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".

<details>

```javascript
function compress(chars) {
    let write = 0; // Position to write compressed data
    let count = 1; // Count occurrences of the current character

    for (let i = 1; i <= chars.length; i++) {
        // Check if the current character is the same as the previous one
        if (i < chars.length && chars[i] === chars[i - 1]) {
            count++;
        } else {
            // Write the character
            chars[write] = chars[i - 1];
            write++;

            // Write the count if greater than 1
            if (count > 1) {
                const countStr = count.toString();
                for (const digit of countStr) {
                    chars[write] = digit;
                    write++;
                }
            }

            // Reset the count
            count = 1;
        }
    }

    return write;
}

// Example Usage
const chars1 = ["a","a","b","b","c","c","c"];
console.log(compress(chars1)); // **Output**: 6, chars1 = ["a","2","b","2","c","3"]

const chars2 = ["a"];
console.log(compress(chars2)); // **Output**: 1, chars2 = ["a"]

const chars3 = ["a","b","b","b","b","b","b","b","b","b","b","b","b"];
console.log(compress(chars3)); // **Output**: 4, chars3 = ["a","b","1","2"]

```
</details>

<br>

> ### check for leftmost non-repeating character

<details>

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
console.log(leftMostNonRepeatingChar(str)); // **Output**: "c"
```

</details>

<br>

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

> ### Below is linked list which have all linked list functions

<details>

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

    // LeetCode : Q-160
    // Function to find the intersection point of two linked lists
    // 1.Calculate the lengths of both lists.
    // 2.Move the pointer of the longer list ahead by the difference in lengths.
    // 3.Traverse both lists together until the pointers meet at the intersection point.
    static findIntersection(headA, headB) {
        if (!headA || !headB) return null;

        let lenA = 0, lenB = 0;
        let currA = headA, currB = headB;

        // Calculate lengths of both lists
        while (currA) {
            lenA++;
            currA = currA.next;
        }
        while (currB) {
            lenB++;
            currB = currB.next;
        }

        // Reset pointers to heads
        currA = headA;
        currB = headB;

        // Align the starts
        if (lenA > lenB) {
            for (let i = 0; i < lenA - lenB; i++) {
                currA = currA.next;
            }
        } else if (lenB > lenA) {
            for (let i = 0; i < lenB - lenA; i++) {
                currB = currB.next;
            }
        }

        // Traverse and find intersection
        while (currA && currB) {
            if (currA === currB) {
                return currA; // Intersection found
            }
            currA = currA.next;
            currB = currB.next;
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

    // leetcode - 206. Function to reverse a linked list starting from a given node
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

    // 234. Leetcode -  Function to check if the linked list is a palindrome
    // A common method to solve this problem in O(n) time and O(1) space is to:
    function isPalindrome(head) {
        if (!head || !head.next) return true;

        // Step 1: Find the middle of the linked list
        let slow = head, fast = head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // Step 2: Reverse the second half of the linked list
        let prev = null;
        while (slow) {
            let next = slow.next;
            slow.next = prev;
            prev = slow;
            slow = next;
        }

        // Step 3: Compare the first and second halves
        let left = head, right = prev; // `prev` is now the head of the reversed second half
        while (right) {
            if (left.val !== right.val) return false;
            left = left.next;
            right = right.next;
        }

        // Step 4 (optional): Restore the list (if needed)
        // This step is usually optional unless the problem specifically asks to retain the original list structure.

        return true;
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


    // leetcode : 83
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
</details>

<br>

> ### 21. Merge Two Sorted Linked Lists

Example 1:

**Input**: list1 = [1,2,4], list2 = [1,3,4]\
**Output**: [1,1,2,3,4,4]

Example 2:

**Input**: list1 = [], list2 = []\
**Output**: []

Example 3:

**Input**: list1 = [], list2 = [0]\
**Output**: [0]

**Solution 1 - Recursion**

<details>

```js
function mergeTwoLists(list1, list2) {
    // If one of the lists is null, return the other list since there's nothing to merge
    if (list1 === null || list2 === null) {
        return list1 || list2;
    }

    // Compare the values of the two list heads and recursively merge the rest of the lists
    if (list1.val < list2.val) {
        // If the value of the first list head is less, 
        // link that node to the result of merging the rest of the lists
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        // If the value of the second list head is less or equal,
        // link that node to the result of merging the rest of the lists
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}
```
</details>


**Solution 2 - Iteration**

<details>

```js
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val
        this.next = next
    }
}


var mergeTwoLists = function (list1, list2) {
    let newList = new ListNode()
    let curr = newList

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            curr.next = list1
            list1 = list1.next
        } else {
            curr.next = list2
            list2 = list2.next
        }
        curr = curr.next
    }

    // This is for adding extra length jo bach jaye
    if (list1 !== null) {
        curr.next = list1;
    } else if (list2 !== null) {
        curr.next = list2;
    }

    return newList.next
};

const l1 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 4,
            next: null
        }
    }
};
const l2 = {
    val: 1,
    next: {
        val: 3,
        next: {
            val: 4,
            next: null
        }
    }
};

mergeTwoLists(l1, l2)
```
</details>

<br>

> ### Double linked list

<details>

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
</details>

<br>

> ### 25. Reverse K Nodes in a Linked List ( [Youtube video](https://www.youtube.com/watch?v=LCRGV8avvUY&t=176s&ab_channel=ApnaCollege) )


For the linked list: `1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8` and `K = 3`, the result will be:
```
3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 8 -> 7
```

<details>

```javascript
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

// Driver code
const K = 3;

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

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

// Reverse every K nodes
head = reverseKNodes(head, K);
console.log(head)
```

1. **Reverse First K Nodes**: In the first loop, we reverse the first `K` nodes by keeping track of the previous node (`prev`), the current node (`current`), and the next node (`next`). This process continues for `K` nodes.

2. **Recursive Call**: Once the first `K` nodes are reversed, we recursively call `reverseKNodes` for the next segment of `K` nodes. The head of the original segment (`head`) is then linked to the result of the next recursive call.

3. **Returning the New Head**: After reversing each group of `K` nodes, the new head of the segment is returned (`prev`).

</details>

<br>

`Above function correctly` reverses nodes in groups of K, but it `doesn't handle` the case when the `remaining nodes are less than K`. We need to first count the total number of nodes before reversing to ensure that only complete groups are reversed.

Example 1:\
Input: head = [1,2,3,4,5], k = 2\
Output: [2,1,4,3,5]

Example 2:\
Input: head = [1,2,3,4,5], k = 3\
Output: [3,2,1,4,5]

<details>

```js
function reverseKNodes(head, K) {
    if (!head || K === 1) return head;

    // Step 1: Count the number of nodes
    let count = 0;
    let temp = head;
    while (temp) {
        count++;
        temp = temp.next;
    }

    // Step 2: Reverse the first K nodes only if count >= K
    if (count < K) return head; // If less than K nodes, return head as is

    let current = head;
    let next = null;
    let prev = null;
    let kCount = 0;

    while (current && kCount < K) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
        kCount++;
    }

    // Step 3: Recursively process the remaining nodes
    if (next) {
        head.next = reverseKNodes(next, K);
    }

    return prev; // New head of the reversed segment
}
```
</details>

<br>


> ### 138. Copy a linked list using a random pointer

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

### **Explanation**:

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

> ### 138. Copy List with Random Pointer

A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
Your code will only be given the head of the original linked list.

 

Example 1:\
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:\
Input: head = [[1,1],[2,1]]\
Output: [[1,1],[2,1]]

Example 3:\
Input: head = [[3,null],[3,0],[3,null]]\
Output: [[3,null],[3,0],[3,null]]

### Algorithm: **Hash Map + Two Pass Approach**
1. **First Pass:** Create a mapping of original nodes to new nodes without handling random pointers.
2. **Second Pass:** Assign `next` and `random` pointers using the mapping.

This ensures that each node is only processed twice, keeping the time complexity **O(n)** and space complexity **O(n)**.

---

### **JavaScript Implementation**
```javascript
class Node {
    constructor(val, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

var copyRandomList = function(head) {
    if (!head) return null;

    let map = new Map();

    // First pass: Create a mapping of original to new nodes
    let current = head;
    while (current) {
        map.set(current, new Node(current.val));
        current = current.next;
    }

    // Second pass: Assign next and random pointers
    current = head;
    while (current) {
        let clonedNode = map.get(current);
        clonedNode.next = current.next ? map.get(current.next) : null;
        clonedNode.random = current.random ? map.get(current.random) : null;
        current = current.next;
    }

    return map.get(head);
};
```

### **Time Complexity:** `O(n)`
- Each node is visited twice.

### **Space Complexity:** `O(n)`
- A map is used to store `n` nodes.

Let me know if you want an **O(1) space** solution using the interweaving method! 🚀

<br>

<br>

> ### Stacks and Queues

Stack ki need jab padti h jab hume chaiye jo `last key` visit ki thi traverse karte time wo kya thi ya uska effect kya tha.

- entry and exist on same side, basically LIFO

<br>

> ### 2390.Removing Stars From a String

You are given a string s, which contains stars *.

In one operation, you can:
- Choose a star in s.
- Remove the closest non-star character to its left, as well as remove the star itself.
- Return the string after all stars have been removed.


Example 1:

**Input**: s = "leet**cod*e"\
**Output**: "lecoe"\
**Explanation**: Performing the removals from left to right:\
- The closest character to the 1st star is 't' in "leet**cod*e". s becomes "lee*cod*e".\
- The closest character to the 2nd star is 'e' in "lee*cod*e". s becomes "lecod*e".\
- The closest character to the 3rd star is 'd' in "lecod*e". s becomes "lecoe".\
There are no more stars, so we return "lecoe".

<br>

Example 2:

**Input**: s = "erase*****"\
**Output**: ""\
**Explanation**: The entire string is removed, so we return an empty string.

<details>

```js
function removeStars(s) {
    const stack = [];
    
    for (const char of s) {
        if (char === '*') {
            // Remove the last character if `*` is encountered
            stack.pop();
        } else {
            // Add the character to the stack
            stack.push(char);
        }
    }
    
    // Join the stack to form the resulting string
    return stack.join('');
}

// Example usage
const input = "leet**cod*e";
console.log(removeStars(input)); // **Output**: "lecoe"
```

more solution

```js
var removeStars = function(s) {
    let result = "";
    let stars = 0;

    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === "*") {
            stars++;
        } else if (stars > 0) {
            stars--;
        } else {
            result = s[i] + result;
        }
    }

    return result;
};
```
</details>


<br>


> ### 735. Asteroid Collision

refer any youtube video for reference

We are given an array asteroids of integers representing asteroids in a row. The indices of the asteriod in the array represent their relative position in space.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

 

Example 1:\
**Input**: asteroids = [5,10,-5]\
**Output**: [5,10]\
**Explanation**: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

Example 2:\
**Input**: asteroids = [8,-8]\
**Output**: []\
**Explanation**: The 8 and -8 collide exploding each other.

Example 3:\
**Input**: asteroids = [10,2,-5]\
**Output**: [10]\
**Explanation**: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

<details>

```js
var asteroidCollision = function (asteroids) {
    const res = [];

    for (let i = 0; i < asteroids.length; i++) {
        const last = res[res.length - 1];
        const cur = asteroids[i];

        // If there are no potential collisions:
        // - The result array is empty
        // - The last asteroid is moving left (negative)
        // - The current asteroid is moving right (positive)
        if (!res.length || last < 0 || cur > 0) {
            res.push(cur); // Add the current asteroid to the result
        }
        // If the current and last asteroids have equal magnitude but opposite directions
        else if (-cur == last) {
            res.pop(); // Both asteroids are destroyed
        }
        // If the current asteroid is larger in magnitude and moving left
        else if (-cur > last) {
            res.pop(); // Destroy the last asteroid
            i--;       // Reprocess the current asteroid for further collisions
        }
    }

    return res;
};
```
</details>

<br>

> ### 394. Decode String

Example 1:

**Input**: s = "3[a]2[bc]"\
**Output**: "aaabcbc"

Example 2:

**Input**: s = "3[a2[c]]"\
**Output**: "accaccacc"

Example 3:

**Input**: s = "2[abc]3[cd]ef"\
**Output**: "abcabccdcdcdef"

<details>

```js
function decodeString(s) {
    let stack = [];
    let currentString = "";
    let currentNum = 0;

    for (let char of s) {
        if (!isNaN(char)) { // it is check pass value is number or not, if number go in it
            currentNum = (currentNum + char)*1; // Build the number (handles multi-digit numbers)
        } else if (char === '[') {
            // Push the current number and string onto the stack
            stack.push(currentString);
            stack.push(currentNum);
            currentString = "";
            currentNum = 0;
        } else if (char === ']') {
            // Pop the stack and build the new string
            let num = stack.pop();
            let prevString = stack.pop();
            currentString = prevString + currentString.repeat(num);
        } else {
            // Append the current character to the string
            currentString += char;
        }
    }

    return currentString;
}

// Example usage:
console.log(decodeString("3[a2[c]]")); // **Output**: "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")); // **Output**: "abcabccdcdcdef"
```
</details>

<br>

> ### Binary search tree
 
**Full Tree** - Every item either points to two nodes or zero nodes

**Leaf nodes** - there the nodes which do not have child nodes

In binary search tree 
- if child is greater than parent it goes to right else goes to left.
- In BST, every node has at-most two children.when we add any node we start comparing from the top.

When traversing(lookup, insert,remove) through the BST, it is O(logn), it is because in BST, the right side is always greater than the left side, so it will be divide and conquere(diving in half in each level) so becomes the O(log n)\
sometime in BST, every node is added in right side means always it is bigger than parent, in that scenario it will become O(n)


Here’s a table summarizing the time and space complexity of BST operations for implementations using a **linked list** and an **array**:

| **Operation**   | **Linked List (Typical BST)**                | **Array (Complete BST)**                  |
|------------------|---------------------------------------------|-------------------------------------------|
| **Search**       | Best: \(O(log n)\), Worst: \(O(n)\)         | Best: \(O(log n)\), Worst: \(O(log n)\) |
| **Insertion**    | Best: \(O(log n)\), Worst: \(O(n)\)         | Best: \(O(1)\), Worst: \(O(n)\)*          |
| **Deletion**     | Best: \(O(log n)\), Worst: \(O(n)\)         | Best: \(O(log n)\), Worst: \(O(log n)\) |
| **Traversal**    | \(O(n)\)                                     | \(O(n)\)                                  |
| **Space**        | \(O(n)\) for nodes, \(O(h)\) recursion stack | \(O(n)\) for array storage                |


<br>

We can make binary search tree with array and linked list, below is in form of linked list

<details>

```js
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
</details>

<br>

> ### 8. BFS and DFS algorithm

BFS Algorithm
- use Queue structure
- Best for shortest path


**BFS - Breadth First Search**

- is a vertex-based technique for finding the shortest path in the graph. 
- also called as **Level Order Traversal**
- It uses a `Queue data structure` that follows `first in first out`. 
- It is `slower than DFS`.


<br>


**In Simple term**
In BFS, Root ko lete h queue me then usko result me push kr dete h, then root k left and right ko lete h 
then usko Queue me push kar dete h, then first jo queue me add kia thota h usko results me push kr dete h,
jisko push kia h uske left and right ko Queue me add kr dete h 

BFS code

<details>

```js
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
</details>

<br>

> ### level order traversal line by line(in linked list form)

<details>

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

**Output**:
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
</details>

<br>

**DFS - Depth First Search**
- is an an edge-based technique. 
- It uses the Stack data structure and performs two stages, 
    - first visited vertices are pushed into the stack, and 
    - second if there are no vertices then visited vertices are popped.

- DFS is of 3 types
    - Preorder Traversal, 
    - Inorder Traversal, 
    - Postorder Traversal

DFS Algorithm
- use recursion
- Best for exploring all paths

<br>

**Algorithm for Preorder Traversal:**
- Visit the root.
- Traverse the left subtree, i.e., call Preorder(left->subtree)
- Traverse the right subtree, i.e., call Preorder(right->subtree)

below is code

<details>

```js
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
```
</details>

<br>


**Algorithm for Postorder Traversal:**
- Traverse the left subtree, i.e., call Postorder(left->subtree)
- Traverse the right subtree, i.e., call Postorder(right->subtree)
- Visit the root

> ### belwo is code fo postorder along with leetCode - Q 145(Binary Tree Postorder Traversal)

<details>

```js
DFSPostOrder() {
    let results = [];

    function traverse(currentNode) {
        if (!currentNode) return;

        if (currentNode.left) traverse(currentNode.left);
        if (currentNode.right) traverse(currentNode.right);

        results.push(currentNode.value);
    }

    traverse(this.root);
    return results;
}
```
</details>

<br>

**Algorithm for Inorder Traversal:**

- Traverse the left subtree, i.e., call Inorder(left->subtree)
- Visit the root.
- Traverse the right subtree, i.e., call Inorder(right->subtree)

Below is code for same
<details>

```js
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
```
</details>

<br>

> ### 637. Average of Levels in Binary Tree

Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. 
 
Example 1:\
**Input**: root = [3,9,20,null,null,15,7]\
**Output**: [3.00000,14.50000,11.00000]\
**Explanation**: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.\
Hence return [3, 14.5, 11].



Example 2:\
**Input**: root = [3,9,20,15,7]\
**Output**: [3.00000,14.50000,11.00000]

<details>

```js
Input: root = [3,9,20,null,null,15,7]

Tree structure:
        3
       / \
      9   20
         /  \
        15   7
```

**Step-by-Step Execution**
1. **Level 0:** `[3]`
   - Sum = 3
   - Average = `3 / 1 = 3.00000`
   - **Queue:** `[9, 20]`

2. **Level 1:** `[9, 20]`
   - Sum = `9 + 20 = 29`
   - Average = `29 / 2 = 14.50000`
   - **Queue:** `[15, 7]`

3. **Level 2:** `[15, 7]`
   - Sum = `15 + 7 = 22`
   - Average = `22 / 2 = 11.00000`
   - **Queue:** `[]` (Tree processed)

✅ **Output**: `[3.00000, 14.50000, 11.00000]`


We will use **Level Order Traversal** (BFS) with a queue to compute the average of each level.

```javascript
var averageOfLevels = function(root) {
    if (!root) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let levelSize = queue.length;
        let levelSum = 0;

        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            levelSum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(levelSum / levelSize);
    }
    
    return result;
};
```

</details>

<br>

> ### 257. Binary Tree Paths

Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.

Example 1:\
**Input**: root = [1,2,3,null,5]\
**Output**: ["1->2->5","1->3"]

Example 2:\
**Input**: root = [1]\
**Output**: ["1"]



<details>

**Algorithm: DFS (Depth-First Search)**
```javascript
var binaryTreePaths = function(root) {
    if (!root) return [];

    let result = [];
    
    function dfs(node, path) {
        if (!node) return;

        path += node.val; // Add current node value to the path

        if (!node.left && !node.right) {
            result.push(path); // If it's a leaf, add to result
        } else {
            path += "->"; // Add separator for next node
            dfs(node.left, path);
            dfs(node.right, path);
        }
    }
    
    dfs(root, "");
    return result;
};
```

**Example**
```js
Input: root = [1,2,3,null,5]
```

Binary Tree:
```
    1
   / \
  2   3
   \
    5
```
- **DFS Traversal Paths**:
  - `1 -> 2 -> 5`
  - `1 -> 3`
✅ **Output:** `["1->2->5", "1->3"]`

</details>

<br>


> ### 606. Construct String from Binary Tree

Given the root node of a binary tree, your task is to create a string representation of the tree following a specific set of formatting rules.

Example 1:

**Input**: root = [1,2,3,4]\
**Output**: "1(2(4))(3)"\
**Explanation**: Originally, it needs to be "1(2(4)())(3()())", but you need to omit all the empty parenthesis pairs. And it will be "1(2(4))(3)".

Example 2:

**Input**: root = [1,2,3,null,4]\
**Output**: "1(2()(4))(3)"\
**Explanation**: Almost the same as the first example, except the () after 2 is necessary to indicate the absence of a left child for 2 and the presence of a right child.


<details>

1. **Base Case:**  
   - If the node is `null`, return an **empty string**.
2. **Root Processing:**  
   - Convert the node value to a string.
3. **Recursive Calls for Left & Right Children:**  
   - If the left child exists, recursively process it inside **parentheses**.
   - If the right child exists:
     - If the left child is **missing**, include empty `()` to preserve structure.
     - Otherwise, process the right child inside **parentheses**.

```javascript
var tree2str = function(root) {
    if (!root) return ""; // Base case

    let result = root.val.toString();

    if (root.left || root.right) { // Add left subtree if it exists or right subtree forces empty ()
        result += "(" + tree2str(root.left) + ")";
    }

    if (root.right) { // Add right subtree if it exists
        result += "(" + tree2str(root.right) + ")";
    }

    return result;
};
```

</details>

<br>

> ### 108. Convert Sorted Array to Binary Search Tree

Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced

Example 1:

**Input**: nums = [-10,-3,0,5,9]\
**Output**: [0,-3,9,-10,null,5]\
**Explanation**: [0,-10,5,null,-3,null,9] is also accepted:

Example 2:

**Input**: nums = [1,3]\
**Output**: [3,1]\
**Explanation**: [1,null,3] and [3,1] are both height-balanced BSTs.

<details>

**Algorithm: Recursive Divide and Conquer (Binary Search Approach)**  
To construct a **height-balanced** Binary Search Tree (BST) from a sorted array, we use the **middle element** as the root. This ensures that the left and right subtrees are as balanced as possible.


**Approach**
1. **Find the middle element** of the array and make it the root.
2. **Recursively apply the same process** to the left half for the left subtree and the right half for the right subtree.
3. **Base case:** If the subarray is empty, return `null`.

```javascript
var sortedArrayToBST = function(nums) {
    if (!nums.length) return null; // Base case: empty array -> null node

    let mid = Math.floor(nums.length / 2);
    let root = new TreeNode(nums[mid]); // Middle element as root
    
    root.left = sortedArrayToBST(nums.slice(0, mid));  // Left subtree from left half
    root.right = sortedArrayToBST(nums.slice(mid + 1)); // Right subtree from right half

    return root;
};
```

**Example**
```js
Input: nums = [-10, -3, 0, 5, 9]
```

**Recursive Calls:**
```
nums = [-10, -3, 0, 5, 9] → mid = 2 → root = 0
    Left subtree: [-10, -3] → mid = 1 → root = -3
        Left: [-10] → root = -10
        Right: null
    Right subtree: [5, 9] → mid = 1 → root = 9
        Left: [5] → root = 5
        Right: null
```

✅ **Output (BST Representation)**:
```
        0
       /  \
    -3     9
   /     /
-10    5
```
</details>

<br>

> ### 993. Cousins in Binary Tree

Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y, return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.

Two nodes of a binary tree are `cousins` if they have the `same depth` with `different parents`.

Note that in a binary tree, the root node is at the depth 0, and children of each depth k node are at the depth k + 1.

Example 1:\
**Input**: root = [1,2,3,4], x = 4, y = 3\
**Output**: false

Example 2:\
**Input**: root = [1,2,3,null,4,null,5], x = 5, y = 4\
**Output**: true

Example 3:\
**Input**: root = [1,2,3,null,4], x = 2, y = 3
**Output**: false


<details>

**Algorithm: BFS (Level Order Traversal)**
1. **Use BFS (Queue-Based Level Order Traversal)**:
   - Traverse the tree level by level.
   - Track the **parent** and **depth** of `x` and `y` as we traverse.

2. **Check Cousin Conditions**:
   - If `x` and `y` are found at the **same depth** but have **different parents**, return `true`.
   - Otherwise, return `false`.


```javascript
var isCousins = function(root, x, y) {
    if (!root) return false;

    let queue = [[root, null]]; // Store node and its parent

    while (queue.length) {
        let size = queue.length;
        let xParent = null, yParent = null; // Track parents of x and y

        for (let i = 0; i < size; i++) {
            let [node, parent] = queue.shift();

            if (node.val === x) xParent = parent;
            if (node.val === y) yParent = parent;

            if (node.left) queue.push([node.left, node]);
            if (node.right) queue.push([node.right, node]);
        }

        // If both x and y are found in the same level but have different parents, they are cousins
        if (xParent && yParent) return xParent !== yParent;

        // If only one of x or y is found in this level, they cannot be cousins
        if (xParent || yParent) return false;
    }

    return false;
};
```

**Example 1**
```js
Input: root = [1,2,3,4], x = 4, y = 3
```
- Level 1: `[1]`
- Level 2: `[2, 3]`
- Level 3: `[4]`
- **x = 4 (parent = 2), y = 3 (parent = 1)**
- ✅ **Output** `false` (different depths)

**Example 2**
```js
Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
```
- Level 1: `[1]`
- Level 2: `[2, 3]`
- Level 3: `[4, 5]`
- **x = 5 (parent = 3), y = 4 (parent = 2)**
- ✅ **Output** `true` (same depth, different parents)


This **BFS approach efficiently finds cousins** in **linear time** using **level order traversal**. 🚀

also

```js
var isCousins = function(root, x, y) {
    
    const map = new Map()

    const explore = (parent, node, lvl) => {

        // If node is null, stop
        if (!node) return

        // Set the Current value to have its parent and the level
        map.set(node.val, {parent, level: lvl})

        // Run the func for the children, 
        //    - using current node val as parent
        //    - the children as node
        //    - and incrementing lvl
        explore(node.val, node.left, lvl + 1)
        explore(node.val, node.right, lvl + 1)
    }
    
    explore(null, root, 0)
    
    const xVal = map.get(x) 
    const yVal = map.get(y) 

    return (xVal.parent !== yVal.parent && xVal.level === yVal.level)
};
```
</details>

<br>

> ### 100. Same Tree

Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example 1:\
**Input**: p = [1,2,3], q = [1,2,3]\
**Output**: true

Example 2:\
**Input**: p = [1,2], q = [1,null,2]\
**Output**: false

Example 3:\
**Input**: p = [1,2,1], q = [1,1,2]\
**Output**: false

<details>

```js
var isSameTree = function(p, q) {
    if (!p && !q) return true;    // Both trees are empty
    if (!p || !q) return false;   // One tree is empty
    if (p.val !== q.val) return false; // Values don't match
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```
</details>

<br>

> ### 700. Search in a Binary Search Tree

You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

Example 1:\
**Input**: root = [4,2,7,1,3], val = 2\
**Output**: [2,1,3]

Example 2:\
**Input**: root = [4,2,7,1,3], val = 5\
**Output**: []

<details>

**Algorithm: BST Search**
- If `root` is `null`, return `null`.
- If `root.val === val`, return `root`.
- If `val < root.val`, search in `root.left`, else search in `root.right`.

**Recursive JavaScript Code**
```javascript
var searchBST = function(root, val) {
    if (!root || root.val === val) return root;
    return val < root.val ? searchBST(root.left, val) : searchBST(root.right);
};
```

**Iterative JavaScript Code**
```javascript
var searchBST = function(root, val) {
    while (root) {
        if (root.val === val) return root;
        root = val < root.val ? root.left : root.right;
    }
    return null;
};
```

</details>

<br>

> ### 572. Subtree of Another Tree

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

 

Example 1:\
**Input**: root = [3,4,5,1,2], subRoot = [4,1,2]\
**Output**: true


Example 2:\
**Input**: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]\
**Output**: false

<details>

**Algorithm: Subtree Check using Tree Comparison**  
- If `subRoot` is `null`, return `true`.  
- If `root` is `null`, return `false`.  
- Check if `root` and `subRoot` are the same using a helper function.  
- Recursively check `root.left` and `root.right` for `subRoot`.  

```javascript
var isSubtree = function(root, subRoot) {
    if (!root) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

var isSameTree = function(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```
</details>

<br>

> ### 404. Sum of Left Leaves

Given the root of a binary tree, return the sum of all left leaves.

A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.

 
Example 1:\
**Input**: root = [3,9,20,null,null,15,7]\
**Output**: 24\
**Explanation**: There are two left leaves in the binary tree, with values 9 and 15 respectively.


Example 2:\
**Input**: root = [1]\
**Output**: 0

<details>

**Algorithm: DFS Traversal**  
- If the current node has a left child that is a leaf, add its value to the sum.  
- Recursively traverse the left and right subtrees.  
- Return the total sum of left leaves.  

```javascript
var sumOfLeftLeaves = function(root) {
    if (!root) return 0;
    
    let sum = 0;
    if (root.left && !root.left.left && !root.left.right) {
        sum += root.left.val;
    }
    
    return sum + sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right);
};
```
</details>

<br>

> ### 1022. Sum of Root To Leaf Binary Numbers
You are given the root of a binary tree where each node has a value 0 or 1. Each root-to-leaf path represents a binary number starting with the most significant bit.

For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.
For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return the sum of these numbers.

<br>

Example 1:\
```
       1
      / \
     0    1
    / \   /\
   0   1  0 1
```

**Input**: root = [1,0,1,0,1,0,1]\
**Output**: 22\
**Explanation**: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22

Example 2:\
**Input**: root = [0]\
**Output**: 0


<details>

**Algorithm: DFS Traversal**  
- Use Depth-First Search (DFS) to traverse the tree.  
- Maintain the current binary number as you go deeper.  
- When reaching a leaf node, convert the binary number to decimal and add it to the sum.  
- Return the total sum of all root-to-leaf paths.  

```javascript
var sumRootToLeaf = function(root, sum = 0) {
    if (!root) return 0;
    
    sum = (sum << 1) | root.val; // Shift left and add current value
    
    if (!root.left && !root.right) return sum; // If it's a leaf, return sum
    
    return sumRootToLeaf(root.left, sum) + sumRootToLeaf(root.right, sum);
};
```


also

```js
var sumRootToLeaf = function(root) {
    const nums = [];

    const traverse = (node, path) => {
        if (!node) {
            return;
        }
        
        path += node.val;

        if (!node.left && !node.right) {
            nums.push(path);
            return;
        }

        traverse(node.left, path)
        traverse(node.right, path)
    }

    traverse(root, '')

    return nums.reduce((sum, n) => sum + parseInt(n, 2), 0)
};
```

</details>

<br>

> ### 101. Symmetric Tree

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Example 1:\
**Input**: root = [1,2,2,3,4,4,3]\
**Output**: true


Example 2:\
**Input**: root = [1,2,2,null,3,null,3]\
**Output**: false

<details>

**Algorithm: Recursive DFS**  
- A tree is symmetric if the left subtree is a mirror of the right subtree.  
- Recursively check:  
  - Both left and right subtrees must have the same value.  
  - The left child of the left subtree should match the right child of the right subtree, and vice versa.  

```javascript
var isSymmetric = function(root) {
    if (!root) return true;
    
    function isMirror(t1, t2) {
        if (!t1 || !t2) return t1 === t2;
        if (t1.val !== t2.val) return false;
        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
    }
    
    return isMirror(root.left, root.right);
};
```
</details>

<br>

> ### 653. Two Sum IV - Input is a BST
Given the root of a binary search tree and an integer k, return true if there exist two elements in the BST such that their sum is equal to k, or false otherwise.

Example 1:\
**Input**: root = [5,3,6,2,4,null,7], k = 9\
**Output**: true

Example 2:\
**Input**: root = [5,3,6,2,4,null,7], k = 28\
**Output**: false


<details>

**Algorithm: Inorder Traversal + Hash Set**  
- Perform an inorder traversal to access elements in sorted order.  
- Use a `Set` to check if `k - node.val` exists.  
- If found, return `true`; otherwise, continue traversal.  

```javascript
var findTarget = function(root, k) {
    let set = new Set();

    function dfs(node) {
        if (!node) return false;
        if (set.has(k - node.val)) return true;
        set.add(node.val);
        return dfs(node.left) || dfs(node.right);
    }

    return dfs(root);
};
```
</details>

<br>

> ### 617. Merge Two Binary Trees

You are given two binary trees root1 and root2.

Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

Return the merged tree.


Example 1:\
**Input**: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]\
**Output**: [3,4,5,5,4,null,7]


Example 2:\
**Input**: root1 = [1], root2 = [1,2]\
**Output**: [2,2]

<details>

**Algorithm: DFS (Recursive Approach)**
- If one of the trees is `null`, return the other tree.
- Otherwise, sum the values of the current nodes.
- Recursively merge the left and right children.

```javascript
var mergeTrees = function(root1, root2) {
    if (!root1) return root2;
    if (!root2) return root1;
    
    root1.val += root2.val;
    root1.left = mergeTrees(root1.left, root2.left);
    root1.right = mergeTrees(root1.right, root2.right);
    
    return root1;
};
```

</details>

<br>



> ### 112. Path Sum

Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.

Example 1:\

```
       ✅5
      / \
     ✅4   8
    /   / \
   ✅11  13  4
  /  \      \
 7    ✅2      1
```

**Input**: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22\
**Output**: true\
**Explanation**: The root-to-leaf path with the target sum is shown.


Example 2:\
**Input**: root = [1,2,3], targetSum = 5\
**Output**: false\
**Explanation**: There are two root-to-leaf paths in the tree:\
(1 --> 2): The sum is 3.\
(1 --> 3): The sum is 4.\
There is no root-to-leaf path with sum = 5.
 

<details>

**Algorithm: Depth-First Search (DFS)**
1. If the tree is empty, return `false`.
2. Use **DFS (recursion)**:
   - Subtract the current node’s value from `targetSum`.
   - If it's a **leaf node** and `targetSum == 0`, return `true`.
   - Recursively check the left and right subtree.
3. If any recursive call returns `true`, return `true`.


```javascript
var hasPathSum = function(root, targetSum) {
    if (!root) return false;

    targetSum -= root.val;
    if (!root.left && !root.right) return targetSum === 0;
    
    return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};
```

also 

```js
var hasPathSum = function(root, targetSum) {
    if(!root) {
        return false
    }
    if(!root.right && !root.left) {
        return targetSum === root.val
    }

    return (
        hasPathSum(root.left, targetSum-root.val) ||
        hasPathSum(root.right, targetSum-root.val)
    )
};
```
</details>


<br>



> ### 111. Minimum Depth of Binary Tree

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

 

Example 1:\
**Input**: root = [3,9,20,null,null,15,7]\
**Output**: 2


Example 2:\
**Input**: root = [2,null,3,null,4,null,5,null,6]\
**Output**: 5


<details>

**Algorithm: BFS (Breadth-First Search)**
The **minimum depth** of a binary tree is the shortest path from the root to a leaf node. BFS is ideal for this because it finds the shortest path efficiently.

**Steps:**
1. **Use a Queue:** Start BFS from the root.
2. **Track Depth:** Store `(node, depth)` in the queue.
3. **Find First Leaf Node:** The first leaf node encountered gives the minimum depth.


```javascript
var minDepth = function(root) {
    if (!root) return 0;

    let queue = [[root, 1]];  // Store [node, depth]
    
    while (queue.length > 0) {
        let [node, depth] = queue.shift();
        
        // If it's a leaf node, return the depth
        if (!node.left && !node.right) return depth;

        // Add children to the queue with incremented depth
        if (node.left) queue.push([node.left, depth + 1]);
        if (node.right) queue.push([node.right, depth + 1]);
    }
};
```

**Alternative Approach: DFS (Recursive)**
DFS can also be used, but it may explore deeper unnecessary paths before finding the shortest one.

```javascript
var minDepth = function(root) {
    if (!root) return 0;
    if (!root.left) return 1 + minDepth(root.right);
    if (!root.right) return 1 + minDepth(root.left);
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};
```

🚀 **BFS is recommended** because it finds the shortest depth **faster** than DFS!


alos

```js
var minDepth = function (root) {
    if (!root) return 0

    const queue = [[root, 1]]

    while (queue.length > 0) {
        const [node, depth] = queue.shift()

        if (!node.left && !node.right) return depth

        if (node.left) queue.push([node.left, depth + 1])
        if (node.right) queue.push([node.right, depth + 1])
    }
};
```
</details>

<br>

> ### 543. Diameter of Binary Tree

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

Example 1:\
**Input**: root = [1,2,3,4,5]\
**Output**: 3\
**Explanation**: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

Example 2:\
**Input**: root = [1,2]\
**Output**: 1

<details>

We use **DFS (Postorder Traversal)** to calculate the depth of each subtree and update the diameter.

1. **Define a helper function** that returns the height of the subtree.
2. **Compute height** recursively for left and right subtrees.
3. **Update diameter** as `leftHeight + rightHeight` (max path through current node).
4. **Return max depth** of left and right subtree to continue recursion.

```javascript
var diameterOfBinaryTree = function(root) {
    let diameter = 0;

    function depth(node) {
        if (!node) return 0;
        
        let left = depth(node.left);
        let right = depth(node.right);
        
        diameter = Math.max(diameter, left + right);
        
        return Math.max(left, right) + 1;
    }

    depth(root);
    return diameter;
};
```

</details>

<br>


> ### 938. Range Sum of BST

Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].

Example 1:\
**Input**: root = [10,5,15,3,7,null,18], low = 7, high = 15\
**Output**: 32\
**Explanation**: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.


Example 2:\
**Input**: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10\
**Output**: 23\
**Explanation**: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.
 

<details>

We use **DFS (Preorder Traversal)** to explore the tree and sum only the nodes within the range `[low, high]`.
1. **Base Case:** If the node is `null`, return `0`.
2. **Check node value:**
   - If `node.val` is in `[low, high]`, add it to the sum.
   - If `node.val > low`, search the **left subtree**.
   - If `node.val < high`, search the **right subtree**.
3. **Return the total sum**.

```javascript
var rangeSumBST = function(root, low, high) {
    if (!root) return 0;
    
    let sum = 0;
    
    if (root.val >= low && root.val <= high) {
        sum += root.val;
    }
    
    if (root.val > low) {
        sum += rangeSumBST(root.left, low, high);
    }
    
    if (root.val < high) {
        sum += rangeSumBST(root.right, low, high);
    }
    
    return sum;
};
```
</details>


<br>


> ### 501. Find Mode in Binary Search Tree

Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.

If the tree has more than one mode, return them in any order.

Assume a BST is defined as follows:

- The left subtree of a node contains only nodes with keys less than or equal to the node's key.
- The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
- Both the left and right subtrees must also be binary search trees.
 

Example 1:\
**Input**: root = [1,null,2,2]\
**Output**: [2]


Example 2:\
**Input**: root = [0]\
**Output**: [0]


<details>

**Algorithm: Inorder Traversal with Frequency Count**  
Since an **inorder traversal** of a BST results in a sorted sequence, we can traverse the tree while keeping track of the **current frequency** of each value. The most frequently occurring value(s) will be the **mode(s)**.

```javascript
var findMode = function(root) {
    let modes = [], maxCount = 0, currentCount = 0, prev = null;

    const inorder = (node) => {
        if (!node) return;

        inorder(node.left);

        // Process current node
        if (prev === node.val) {
            currentCount++;
        } else {
            currentCount = 1;
        }
        prev = node.val;

        if (currentCount > maxCount) {
            maxCount = currentCount;
            modes = [node.val]; // Reset modes
        } else if (currentCount === maxCount) {
            modes.push(node.val);
        }

        inorder(node.right);
    };

    inorder(root);
    return modes;
};
```

**Alternative Approach: Hash Map Counting**
Another approach is using a **hash map** to count occurrences, then finding the maximum count:
```javascript
var findMode = function(root) {
    let count = new Map();
    let maxCount = 0, modes = [];

    const traverse = (node) => {
        if (!node) return;

        count.set(node.val, (count.get(node.val) || 0) + 1);
        maxCount = Math.max(maxCount, count.get(node.val));

        traverse(node.left);
        traverse(node.right);
    };

    traverse(root);

    for (let [key, value] of count) {
        if (value === maxCount) modes.push(key);
    }

    return modes;
};
```
🔹 **This method takes extra space (O(n)) but is easier to understand.**

</details>

<br>


> ### 110. Balanced Binary Tree

Given a binary tree, determine if it is height-balanced.

Example 1:\
**Input**: root = [3,9,20,null,null,15,7]\
**Output**: true


Example 2:\
**Input**: root = [1,2,2,3,3,null,null,4,4]\
**Output**: false


Example 3:\
**Input**: root = []\
**Output**: true

<details>

**Algorithm: Depth-First Search (DFS) with Height Calculation**

A **Balanced Binary Tree** is a binary tree in which the depth of the two subtrees of every node never differs by more than **1**. We can check this using a **recursive DFS approach**, where we calculate the height of each subtree and determine if the tree is balanced.

**Approach**
1. Use a helper function that calculates the height of the tree recursively.
2. If any subtree is unbalanced (height difference > 1), return `-1` as an indicator.
3. If all nodes satisfy the balance condition, return `true`.


```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isBalanced(root) {
  function checkHeight(node) {
    if (!node) return 0;

    let leftHeight = checkHeight(node.left);
    if (leftHeight === -1) return -1; // Left subtree is unbalanced

    let rightHeight = checkHeight(node.right);
    if (rightHeight === -1) return -1; // Right subtree is unbalanced

    if (Math.abs(leftHeight - rightHeight) > 1) return -1; // Current node is unbalanced

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return checkHeight(root) !== -1;
}

// Example Usage
let tree = new TreeNode(1, 
  new TreeNode(2, new TreeNode(3), new TreeNode(4)), 
  new TreeNode(2, new TreeNode(4), new TreeNode(3))
);
console.log(isBalanced(tree)); // **Output**: true

let unbalancedTree = new TreeNode(1, 
  new TreeNode(2, 
    new TreeNode(3, 
      new TreeNode(4) // Extra depth here makes it unbalanced
    )
  )
);
console.log(isBalanced(unbalancedTree)); // **Output**: false
```
</details>

<br>


> ### Delete a node in BST ( [Youtube video](https://www.youtube.com/watch?v=petKaikRiIA&ab_channel=AnujBhaiya) )

In a Binary Search Tree (BST), deletion of a node requires three different cases to handle:

1. **Case 1: Node to be deleted is a leaf node** (no children):
   - Simply remove the node from the tree.
   
2. **Case 2: Node to be deleted has one child**:
   - Replace the node with its child.
   
3. **Case 3: Node to be deleted has two children**:
   - Replace the node with its in-order successor (smallest node in the right subtree) or in-order predecessor (largest node in the left subtree) and delete the in-order successor/predecessor from its original position.

Here is the JavaScript code for deleting a node in a BST:

**Code for Deletion in a Binary Search Tree (BST):**

<details>

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

### **Explanation**:

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
</details>

<br>

> ### AVL tree ( [Youtube video](https://www.youtube.com/watch?v=jDM6_TnYIqE&ab_channel=AbdulBari) )

An **AVL tree** is a type of `self-balancing binary search tree (BST)`. In an AVL tree, the `difference in height`s (balance factor) between the `left and right` subtrees of any node is `at most(<=) 1`. If at any point this condition is violated, the tree performs rotations to restore balance.

The height of an AVL tree is kept in check, ensuring that the time complexity for operations like insertion, deletion, and lookup is O(log n), where **n** is the number of nodes.

**Key Operations in an AVL Tree:**
1. **Insertion**: Insert the node as in a normal BST and then check if the tree is balanced. If not, perform rotations to balance it.
2. **Rotation**: There are four types of rotations that can be used to balance the tree after insertion or deletion:
   - Left rotation
   - Right rotation
   - Left-Right rotation
   - Right-Left rotation
3. **Balancing**: After every insertion or deletion, the balance factor (difference between the heights of left and right subtrees) of each node is checked. If it violates the AVL property (i.e., balance factor > 1 or < -1), the tree is rebalanced using rotations.

<br>


#### Balance Factor
For each node, the **balance factor** is calculated as:
```
balance_factor = height(left subtree) - height(right subtree)
```
The AVL property requires that the balance factor of every node should be in the range of [-1, 1].


**JavaScript Implementation of an AVL Tree**
<details>

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

### **Explanation**:
1. **Insertion**: The `insert` function inserts a node like in a regular BST, but after every insertion, it checks if the tree has become unbalanced. If it has, appropriate rotations (right, left, left-right, or right-left) are performed to balance the tree.
2. **Rotation**: Right and left rotations are performed to restore balance when necessary.

### Time Complexity:
- **Insertion**: O(log n) because the tree is kept balanced after every insertion.
- **Rotation**: O(1) because rotations only involve changing a few pointers and heights.
- **In-order Traversal**: O(n), where **n** is the number of nodes.

</details>


<br>

> ### 235. Lowest Common Ancestor of a Binary Search Tree

The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).

Example 1:

**Input**: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8\
**Output**: 6\
**Explanation**: The LCA of nodes 2 and 8 is 6.

Example 2:

**Input**: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4\
**Output**: 2\
**Explanation**: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

Example 3:

**Input**: root = [2,1], p = 2, q = 1\
**Output**: 2

`video: (first see code)` https://www.youtube.com/watch?v=cOjLyASDJcc

<details>

```js
var lowestCommonAncestor = function(root, p, q) {
    while (root) {
        // If both p and q are smaller than root, LCA must be in the left subtree
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } 
        // If both p and q are larger than root, LCA must be in the right subtree
        else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } 
        // If p and q lie on either side of root, root is the LCA
        else {
            return root;
        }
    }
    return null; // This line is generally not reached
};
```
</details>

<br>

> ### Check BST is valid or not ( [Youtube video](https://www.youtube.com/watch?v=9btwHI_84DM&ab_channel=AnujBhaiya) )

A Binary Search Tree (BST) is a data structure where each node has at most two children. The left child node's value is smaller than the parent's, and the right child node's value is larger.

To check if a tree is a valid BST in JavaScript, you can perform an in-order traversal and ensure that the values of the nodes are in increasing order. Here's a sample function to check if a tree is a valid BST:

<details>

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

console.log(isValidBST(root)); // **Output**: true
```

**Explanation**:
1. The function `isValidBST` takes three arguments: the current node (`node`), and optional `min` and `max` bounds.
2. For each node, it checks if the node's value lies within the valid range defined by `min` and `max`.

</details>

<br>

> ### fix a BST with two nodes swapped

<details>

**Approach** - in-order traversal

```js
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
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(8); // This should be 15
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(20); // This should be 8

// The tree is now invalid because nodes 8 and 15 are swapped
fixBST(root);
```

**Explanation**:
- **In-order Traversal**: The tree is traversed in-order (left -> node -> right). For a valid BST, the in-order traversal will result in values in increasing order.
- **Identify Swapped Nodes**: The algorithm detects two nodes that violate this order.
  - The first node (`first`) is identified when the current node value is less than the previous node value.
  - The second node (`second`) is identified later when the anomaly appears again.
- **Swap Values**: Once the two nodes are identified, their values are swapped to restore the BST property.

</details>

<br>

> ### Pair with given sum in BST

To find if there exists a pair of nodes in a Binary Search Tree (BST) that sums to a given value,

1. In-order Traversal + Two Pointers (Optimal Solution)
- Perform an in-order traversal to extract the values of the BST in a sorted array.
- Use the two-pointer technique on this array to find the pair with the given sum.

<details>

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
</details>

<br>

2. Using HashSet (Alternative Approach)

Alternatively, you can use a HashSet to store the values you've seen so far as you traverse the tree. For each node, check if `target - currentNodeValue` exists in the set. If it does, you have found a pair.

Here's a code example for this approach:

<details>

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

### **Explanation**:
- As you traverse the tree, you store each value in the set.
- For each node, you check if its complement (`target - node.value`) exists in the set. If it does, you have found a pair.
- This approach runs in `O(n)` time and uses `O(n)` space for the set.

Both approaches are efficient for finding a pair with a given sum in a BST, with the first approach being more structured for sorted traversal and the second being more direct.
</details>

<br>

> ### Q-104 - height of binary tree

The **height of a binary tree** is the number of edges on the longest path from the root to a leaf node. It can also be defined as the number of levels in the tree minus one. The height of an empty tree is `-1`, and the height of a tree with a single node (the root) is `0`.


```
height(n) = max(height(left subtree), height(right subtree)) + 1
```

<details>

```javascript
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
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Create the binary tree
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);

// Calculate the height of the tree
let treeHeight = height(root);
console.log("Height of the binary tree is:", treeHeight);  // **Output**: 2
```

**Explanation**:
```
      1
     / \
    2   3
   / \   \
  4   5   6
```
- The longest path is from the root `1` to any of the leaf nodes (`4`, `5`, or `6`). The number of edges in the longest path is `2`, so the height of the tree is `2`.

</details>

<br>

> ### print nodes at distance k in BST 

To print all nodes at a given distance (k) from the root in a **Binary Search Tree (BST)**, we can approach the problem recursively. At each recursive call, we reduce the distance (k) by 1, and when (k=0), we print the current node.

<details>

```javascript
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
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

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

### **Explanation**:
Given the following binary tree:
```
        10
       /  \
      5    20
     / \   / \
    3   7 15  25
```
- For (k=2), the nodes at this distance from the root are `3`, `7`, `15`, and `25`, since they are two edges away from the root (`10`).

</details>

<br>

> ### Q-872- Leaf-Similar Trees

Consider all the leaves of a binary tree, from left to right, to form a leaf value sequence. Two binary trees are considered "leaf-similar" if their leaf value sequences are the same.

Given the roots of two binary trees, determine if they are leaf-similar.

### Approach:
1. Traverse the trees using Depth-First Search (DFS).
2. Collect all the leaf nodes into an array for both trees.
3. Compare the two arrays.


```javascript
// Definition for a binary tree node.
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function leafSimilar(root1, root2) {
    // Helper function to collect leaf values
    const getLeaves = (node, leaves = []) => {
        if (!node) return leaves;
        if (!node.left && !node.right) {
            leaves.push(node.val); // Found a leaf
        } else {
            getLeaves(node.left, leaves);
            getLeaves(node.right, leaves);
        }
        return leaves;
    };

    // Get leaf sequences for both trees
    const leaves1 = getLeaves(root1);
    const leaves2 = getLeaves(root2);

    // Compare the two leaf sequences
    if (leaves1.length !== leaves2.length) return false;
    for (let i = 0; i < leaves1.length; i++) {
        if (leaves1[i] !== leaves2[i]) return false;
    }
    return true;
}

// Example usage:
// Tree 1: [3,5,1,6,2,9,8,null,null,7,4]
// Tree 2: [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]

// Creating test trees
const root1 = new TreeNode(3,
    new TreeNode(5,
        new TreeNode(6),
        new TreeNode(2,
            new TreeNode(7),
            new TreeNode(4)
        )
    ),
    new TreeNode(1,
        new TreeNode(9),
        new TreeNode(8)
    )
);

const root2 = new TreeNode(3,
    new TreeNode(5,
        new TreeNode(6),
        new TreeNode(7)
    ),
    new TreeNode(1,
        new TreeNode(4),
        new TreeNode(2,
            new TreeNode(9),
            new TreeNode(8)
        )
    )
);

console.log(leafSimilar(root1, root2)); // **Output**: true
```



### **Explanation**:
1. **Tree Traversal**: Use a helper function `getLeaves` to recursively collect the leaves of a tree.
2. **Comparison**: Compare the leaf sequences for both trees to determine if they are identical.

This approach has a time complexity of \(O(N + M)\), where \(N\) and \(M\) are the number of nodes in the two trees, and a space complexity of \(O(H1 + H2)\), where \(H1\) and \(H2\) are the heights of the two trees (due to recursion stack).

<br>

> ### Subarray with given sum   

https://www.youtube.com/watch?v=Ofl4KgFhLsM&ab_channel=Techdose

To find a subarray with a given sum in an unsorted array of positive integers, you can use a sliding window technique with two pointers. If the array contains both positive and negative integers, we can use a cumulative sum approach with a `Map`.


<details>

### Solution for Array with Positive Integers

When all elements are positive, a sliding window technique is efficient.

```javascript
function subarrayWithGivenSum(arr, targetSum) {
    let start = 0;
    let currentSum = 0;

    for (let end = 0; end < arr.length; end++) {
        // Add the current element to currentSum
        currentSum += arr[end];

        // Shrink the window as long as currentSum is greater than targetSum
        while (currentSum > targetSum && start <= end) {
            currentSum -= arr[start];
            start++;
        }

        // Check if we found the target sum
        if (currentSum === targetSum) {
            return arr.slice(start, end + 1); // Return the subarray
        }
    }

    return null; // No subarray found with the target sum
}

// Example usage:
const array = [1, 4, 20, 3, 10, 5];
const target = 33;
console.log(subarrayWithGivenSum(array, target)); // Output: [20, 3, 10]
```

**Solution for Array with Positive and Negative Integers**

When the array contains both positive and negative integers, we use a `Map` to track cumulative sums.


```javascript
function subarrayWithGivenSumMixed(arr, targetSum) {
    const cumulativeSumMap = new Map();
    let cumulativeSum = 0;

    for (let i = 0; i < arr.length; i++) {
        cumulativeSum += arr[i];

        // Check if current cumulative sum equals targetSum
        if (cumulativeSum === targetSum) {
            return arr.slice(0, i + 1); // Subarray from the start to the current index
        }

        // Check if there's a previous cumulative sum that matches (currentSum - targetSum)
        if (cumulativeSumMap.has(cumulativeSum - targetSum)) {
            const start = cumulativeSumMap.get(cumulativeSum - targetSum) + 1;
            return arr.slice(start, i + 1); // Subarray from start to current index
        }

        // Store cumulative sum and index
        cumulativeSumMap.set(cumulativeSum, i);
    }

    return null; // No subarray found with the target sum
}

// Example usage:
const arrayMixed = [10, 2, -2, -20, 10];
const targetMixed = -10;
console.log(subarrayWithGivenSumMixed(arrayMixed, targetMixed)); // **Output**: [10, 2, -2, -20]
```

</details>

<br>

> ### 53. Maximum Subarray

Given an integer array nums, find the subarray with the largest sum, and return its sum.

Example 1:

**Input**: nums = [-2,1,-3,4,-1,2,1,-5,4]\
**Output**: 6\
**Explanation**: The subarray [4,-1,2,1] has the largest sum 6.

Example 2:

**Input**: nums = [1]\
**Output**: 1\
**Explanation**: The subarray [1] has the largest sum 1.

Example 3:

**Input**: nums = [5,4,-1,7,8]\
**Output**: 23\
**Explanation**: The subarray [5,4,-1,7,8] has the largest sum 23.

<details>

```js
function maxSubArray(nums) {
    if (nums.length === 0) return 0; // Handle edge case

    let currentMax = nums[0];
    let globalMax = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Either extend the current subarray or start a new one
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        globalMax = Math.max(globalMax, currentMax);
    }

    return globalMax;
}

// Example usage
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums)); // **Output**: 6 (Subarray: [4, -1, 2, 1])
```
</details>

<br>

> ### Longest subarray with given sum

To find the longest subarray with a given sum in an unsorted array, we can use a cumulative sum approach with a `Map`. This solution works efficiently for arrays containing both positive and negative integers.

<details>

```javascript
function longestSubarrayWithGivenSum(arr, targetSum) {
    const cumulativeSumMap = new Map();
    let cumulativeSum = 0;
    let maxLength = 0;

    for (let i = 0; i < arr.length; i++) {
        cumulativeSum += arr[i];

        // Check if cumulative sum is equal to targetSum
        if (cumulativeSum === targetSum) {
            maxLength = i + 1; // Subarray from start to current index
        }

        // Check if cumulativeSum - targetSum is in the map
        if (cumulativeSumMap.has(cumulativeSum - targetSum)) {
            const previousIndex = cumulativeSumMap.get(cumulativeSum - targetSum);
            maxLength = Math.max(maxLength, i - previousIndex);
        }

        // Store cumulative sum if not already present
        if (!cumulativeSumMap.has(cumulativeSum)) {
            cumulativeSumMap.set(cumulativeSum, i);
        }
    }

    return maxLength;
}

// Example usage:
const array = [10, 5, 2, 7, 1, 9];
const target = 15;
console.log(longestSubarrayWithGivenSum(array, target)); // **Output**: 4 ([5, 2, 7, 1])
```
</details>

<br>


> ### Longest Subarray with equal number of 0s and 1s

To find the longest subarray with an equal number of `0s` and `1s` in a binary array, you can use the **prefix sum** technique combined with a hash map for efficient lookup. Here's how it works:

<details>

```javascript
function findMaxLength(nums) {
    let prefixSum = 0; 
    let maxLength = 0; 
    const prefixMap = new Map();
    prefixMap.set(0, -1); // Initialize to handle cases where the subarray starts from index 0

    for (let i = 0; i < nums.length; i++) {
        // Convert 0 to -1
        prefixSum += nums[i] === 0 ? -1 : 1;

        if (prefixMap.has(prefixSum)) {
            // Calculate the length of the subarray
            maxLength = Math.max(maxLength, i - prefixMap.get(prefixSum));
        } else {
            // Store the first occurrence of the prefix sum
            prefixMap.set(prefixSum, i);
        }
    }

    return maxLength;
}

// Example usage
const binaryArray = [0, 1, 0, 1, 1, 0, 0];
console.log(findMaxLength(binaryArray)); // **Output**: 6
```

**Explanation**
1. Replace `0` with `-1` in the binary array: `[0, 1, 0, 1, 1, 0, 0]` → `[-1, 1, -1, 1, 1, -1, -1]`.
2. Compute the prefix sum as you traverse:
   - At each index, check if the prefix sum has been seen before.
   - If yes, the subarray between the two occurrences of the prefix sum is balanced.
   - Update the maximum length accordingly.

</details>

<br>

> ### Count Distinct Elements In Every Window

You are given an array `arr[]` and an integer `k`. You need to count the distinct numbers in every contiguous subarray (window) of size `k`.

<details>

**Approach**
1. Use a **sliding window technique** to traverse the array with a window size of `k`.
2. Use a **hash map** to keep track of the frequency of elements in the current window.
3. For each window:
   - Add the count of distinct elements to the result.
   - Slide the window by:
     - Decreasing the frequency of the outgoing element.
     - Increasing the frequency of the incoming element.

```javascript
function countDistinctElements(arr, k) {
    const result = [];
    const freqMap = new Map();

    // Build initial window
    for (let i = 0; i < k; i++) {
        freqMap.set(arr[i], (freqMap.get(arr[i]) || 0) + 1);
    }
    result.push(freqMap.size);

    // Slide the window
    for (let i = k; i < arr.length; i++) {
        const outgoing = arr[i - k];
        const incoming = arr[i];

        // Remove the frequency of the outgoing element
        if (freqMap.get(outgoing) === 1) {
            freqMap.delete(outgoing);
        } else {
            freqMap.set(outgoing, freqMap.get(outgoing) - 1);
        }

        // Add the frequency of the incoming element
        freqMap.set(incoming, (freqMap.get(incoming) || 0) + 1);

        // Add the count of distinct elements for this window
        result.push(freqMap.size);
    }

    return result;
}

// Example Usage:
const arr = [1, 2, 1, 3, 4, 2, 3];
const k = 4;
console.log(countDistinctElements(arr, k)); // **Output**: [3, 4, 4, 3]
```



**Explanation** of the Example
Given `arr = [1, 2, 1, 3, 4, 2, 3]` and `k = 4`:
1. First window `[1, 2, 1, 3]`: Distinct elements = {1, 2, 3} → Count = 3
2. Second window `[2, 1, 3, 4]`: Distinct elements = {1, 2, 3, 4} → Count = 4
3. Third window `[1, 3, 4, 2]`: Distinct elements = {1, 3, 4, 2} → Count = 4
4. Fourth window `[3, 4, 2, 3]`: Distinct elements = {2, 3, 4} → Count = 3

The result is `[3, 4, 4, 3]`.

</details>

<br>

> ### Below is for the GRAPH

<br>

> ### Tree vs Graph
![screenshot](images/treevsgraph.png)

<br>

> ### Direct vs Indirect Graph

![screenshot](images/directVSindirect.png)

<br>

> ### Weight VS Unweighted Graph

![screenshot](images/wightVSunweight.png)

<br>

> ### Graph Represenation  -  Adjacency Matrix
![screenshot](images/adjacencyMatrix.png)

<br>

> ### Graph Represenation  -  Adjacency List
![screenshot](images/adjacencyList.png)

<br>

Graph major points
- Graphs are `bidirectional`,
- `Edge` is line while `vertics` is `point`.
- When `adjacency matrix` is formed in graps, it is `symmetrical` in shape
- We have both type ie adjacency list and matrix, but for the code purpose and efficiency we use the adjacency List
- We create the adjacency list in object form.
- Adjacency list is much more easy to maintain and much efficient so we will use this

- Below is basic structure
```js
{
    vertex: [edge1, edge2]
}
```

Below is the all the operations of graph

<details>

```js
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

console.log("DFS Recursive:", myGraph.dfsRecursive(0)); // Expected **Output**: [0, 1, 3, 4, 5, 2]
console.log("DFS Iterative:", myGraph.dfsIterative(0)); // Expected **Output**: [0, 2, 1, 4, 5, 3]
```
</details>

<br>

> ### 841. Keys and Rooms

There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.

When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.

<br>

Example 1:

**Input**: rooms = [[1],[2],[3],[]]\
**Output**: true\
**Explanation**:\
We visit room 0 and pick up key 1.\
We then visit room 1 and pick up key 2.\
We then visit room 2 and pick up key 3.\
We then visit room 3.\
Since we were able to visit every room, we return true.

<br>

Example 2:

**Input**: rooms = [[1,3],[3,0,1],[2],[0]]\
**Output**: false\
**Explanation**: We can not enter room number 2 since the only key that unlocks it is in that room.

`video: ` https://youtu.be/d0J-s0ZdYsY?si=wCQqajThu2f-014K

`Algo:` Graph with DFS

<details>

```js
var canVisitAllRooms = function(rooms) {
    let visited = new Set();
    
    const dfs = (room) => {
        if (visited.has(room)) return;
        visited.add(room);
        for (let key of rooms[room]) {
            dfs(key);
        }
    };
    
    // Start DFS from room 0
    dfs(0);
    
    // Check if all rooms were visited
    return visited.size === rooms.length;
};
```
</details>

<br>

> ### Dynamic Programming

**It is like recursion with memory use or cache**

Dynamic Programming is an algorithmic approach to solve some complex problems easily and save time and number of comparisons by storing the results of past computations. The basic idea of dynamic programming is to store the results of previous calculation and reuse it in future instead of recalculating them.

In simple words, it is an optimiztion over plain ecursion

The idea is to reuse the solution of sub-problems when there are overlapping sub-problems
1. Memoization (Top Down)
    - Recursive approach with memoization.
    - Solve the problem recursively but store the results of subproblems so that they can be reused without recalculating them.
2. Tabulation (Bottom Up)


**Example:**
if we have taken example for fibnanchi series, then below code will be O(2^n).

**fib of 20 gives 6765 function calls**

https://www.geeksforgeeks.org/dynamic-programming/

```js
let counter = 0
function fib(n){
    counter++

    if(n === 0 || n === 1){
        return n
    }
    return fib(n-1) + fib(n-2)
}
fib(20)
```

**Now we optimzed through DP(using memoization), fib of 20 gives 39 function calls**
```js
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
```


- In above case we are filling the array from the right side to left side, but below code fills from left to right side, which is much more optimized
- **fib of 20 gives 19 function calls**

```js
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

<br>

> ### 198. House Robber

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

<br>

Example 1:\
**Input**: nums = [1,2,3,1]\
**Output**: 4\
**Explanation**: Rob house 1 (money = 1) and then rob house 3 (money = 3).\
Total amount you can rob = 1 + 3 = 4.


Example 2:\
**Input**: nums = [2,7,9,3,1]\
**Output**: 12\
**Explanation**: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).\
Total amount you can rob = 2 + 9 + 1 = 12.

<details>

`video solution :`https://youtu.be/73r3KWiEvyk

```js
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = 0; // Maximum money robbed from two houses ago
    let prev1 = 0; // Maximum money robbed from the last house

    for (let num of nums) {
        const temp = prev1;
        prev1 = Math.max(prev1, prev2 + num); // Choose the best option: skip or rob the current house
        prev2 = temp; // Update `prev2` for the next iteration
    }

    return prev1;
}

// Example usage:
console.log(rob([1, 2, 3, 1])); // **Output**: 4
console.log(rob([2, 7, 9, 3, 1])); // **Output**: 12
```
</details>

<br>

> ### 70. Climbing Stairs

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many `distinct ways` can you climb to the top?


Example 1:\
**Input**: n = 2\
**Output**: 2

**Explanation**: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps


Example 2:\
**Input**: n = 3\
**Output**: 3

<details>

**Explanation**: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step


`video:`- https://youtu.be/Y0lT9Fck7qI  || https://youtu.be/UUaMrNOvSqg

```js
function climbStairs(n) {
    if (n <= 2) return n;

    let first = 1;
    let second = 2;

    for (let i = 3; i <= n; i++) {
        let third = first + second;
        first = second;
        second = third;
    }

    return second;
}

// Example usage:
console.log(climbStairs(2)); // **Output**: 2
console.log(climbStairs(3)); // **Output**: 3
```

</details>

<br>

1. **0/1 Knapsack Problem**:
- Given a set of items, each with a weight and a value, determine the maximum value that can be obtained from selecting items without exceeding the given weight capacity.

**0/1 Knapsack using DP:**

<details>

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

console.log(knapsack(weights, values, W)); // **Output**: 9
```
</details>

<br>

2. **Longest Common Subsequence (LCS)**:   ( [Youtube video](https://www.youtube.com/watch?v=0yvOxPwe3Dg&ab_channel=AnujBhaiya) )
   - Given two strings, find the length of their longest subsequence that appears in both strings.

**LCS using DP:**
<details>

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

console.log(lcs("abcdgh", "aedfhr")); // **Output**: 3 (The LCS is "adh")
```
</details>

<br>

3. **Longest Increasing Subsequence (LIS)**:     ( [Youtube video](https://www.youtube.com/watch?v=okgM58Tv9jQ&ab_channel=ApnaCollege) )
   - Given an array of integers, find the length of the longest subsequence where the numbers are in increasing order.

**LIS using DP:**
<details>

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
console.log(lis(arr)); // **Output**: 6 (The LIS is [10, 22, 33, 50, 60, 80])
```
</details>

<br>

4. **Edit Distance**:   ( [Youtube video](https://www.youtube.com/watch?v=eMnyEDYGobA&ab_channel=AnujBhaiya) )
- The edit distance between two strings is the minimum number of operations required to convert one string into another (using insertions, deletions, or substitutions).

<details>

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

console.log(editDistance("kitten", "sitting")); // **Output**: 3
```
</details>
<br>

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

<br>


> ### 2352. Equal Row and Column Pairs

Example 1:

```
3 | 2 | 1
--|---|--
1 | 7 | 6
--|---|--
2 | 7 | 7
```

**Input**: grid = [[3,2,1],[1,7,6],[2,7,7]]\
**Output**: 1\
**Explanation**: There is 1 equal row and column pair:
- (Row 2, Column 1): [2,7,7]


<br>


Example 2:

```
3 | 1 | 2 | 2
--|---|---|--
1 | 4 | 4 | 5
--|---|---|--
2 | 4 | 2 | 2
--|---|---|--
2 | 4 | 2 | 2
```


**Input**: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]\
**Output**: 3\
**Explanation**: There are 3 equal row and column pairs:
- (Row 0, Column 0): [3,1,2,2]
- (Row 2, Column 2): [2,4,2,2]
- (Row 3, Column 2): [2,4,2,2]


<details>

```js
function equalRowAndColumnPairs(matrix) {
    const n = matrix.length;
    const rowCount = new Map();

    // Store rows in a map
    for (const row of matrix) {
        debugger
        const key = row.join(",");
        rowCount.set(key, (rowCount.get(key) || 0) + 1);
    }

    let count = 0;

    // Check columns against rows
    for (let col = 0; col < n; col++) {
        let colKey = [];
        for (let row = 0; row < n; row++) {
            colKey.push(matrix[row][col]);
        }
        colKey = colKey.join(",");
        if (rowCount.has(colKey)) {
            count += rowCount.get(colKey);
        }
    }

    return count;
}

// Example usage:
const matrix = [[3,2,1],[1,7,6],[2,7,7]];
console.log(equalRowAndColumnPairs(matrix)); // **Output**: 1
```

</details>

<br>

> ### 14. Longest Common Prefix

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".


Example 1:\
**Input**: strs = ["flower","flow","flight"]\
**Output**: "fl"

Example 2:\
**Input**: strs = ["dog","racecar","car"]\
**Output**: ""\
**Explanation**: There is no common prefix among the input strings.

<details>

```js
function longestCommonPrefix(strs) {
    if (strs.length === 0) return ""; // If the array is empty
    if (strs.length === 1) return strs[0]; // If there's only one string

    // Start with the first string as the prefix
    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
       
        while (strs[i].indexOf(prefix) !== 0) {
           
            // Reduce the prefix by one character at a time
            prefix = prefix.slice(0, prefix.length - 1);
            if (prefix === "") return ""; // No common prefix
        }
    }

    return prefix;
}

// Example Usage
const strings = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strings)); // **Output**: "fl"
```


</details>

<br>

> ### 121. Best Time to Buy and Sell Stock

You are given an array prices where prices[i] is the price of a given stock on the ith day.\
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

<br>

Example 1:\
**Input**: prices = [7,1,5,3,6,4]\
**Output**: 5\
**Explanation**: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.


Example 2:\
**Input**: prices = [7,6,4,3,1]\
**Output**: 0\
**Explanation**: In this case, no transactions are done and the max profit = 0.

<details>

```js
var maxProfit = function(prices) {
    let maxProfit = 0;
    let cheapestPriceAtDay = prices[0];

    for(let idx = 1; idx < prices.length; idx++){
    
        let price = prices[idx];
        if (cheapestPriceAtDay > price) {
            cheapestPriceAtDay = price;
        } else {
            maxProfit = Math.max(maxProfit, price - cheapestPriceAtDay);
        }
    }

    return maxProfit;
};
maxProfit([7,1,5,3,6,4])
```

</details>

<br>

> ### 1029. Two City Scheduling

A company is planning to interview 2n people. Given the array costs where costs[i] = [aCosti, bCosti], the cost of flying the ith person to city a is aCosti, and the cost of flying the ith person to city b is bCosti.

Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.

<br>

Example 1:\
**Input**: costs = [[10,20],[30,200],[400,50],[30,20]]\
**Output**: 110\
**Explanation**:\ 
The first person goes to city A for a cost of 10.\
The second person goes to city A for a cost of 30.\
The third person goes to city B for a cost of 50.\
The fourth person goes to city B for a cost of 20.\

The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.



Example 2:\
**Input**: costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]\
**Output**: 1859


Example 3:\
**Input**: costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]
**Output**: 3086

<details>

`video :` https://youtu.be/d-B_gk_gJtQ?si=9-KHhO0SYdM62wBe&t=304


```js
function twoCitySchedCost(costs) {
    // Sort the costs by the difference between city A and city B
    costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));

    let totalCost = 0;
    const n = costs.length / 2;

    // Send the first n people to city A
    for (let i = 0; i < n; i++) {
        totalCost += costs[i][0];
    }

    // Send the next n people to city B
    for (let i = n; i < 2 * n; i++) {
        totalCost += costs[i][1];
    }

    return totalCost;
}

// Example usage
const costs1 = [[10,20],[30,200],[400,50],[30,20]];
console.log(twoCitySchedCost(costs1)); // **Output**: 110

const costs2 = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]];
console.log(twoCitySchedCost(costs2)); // **Output**: 1859

const costs3 = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]];
console.log(twoCitySchedCost(costs3)); // **Output**: 3086
```

</details>

<br>

> ### 2016. Maximum Difference Between Increasing Elements
Given a 0-indexed integer array nums of size n, find the maximum difference between nums[i] and nums[j] (i.e., nums[j] - nums[i]), such that 0 <= i < j < n and nums[i] < nums[j].

Return the maximum difference. If no such i and j exists, return -1.

<br>

Example 1:\
**Input**: nums = [7,1,5,4]\
**Output**: 4\
**Explanation**:\
The maximum difference occurs with i = 1 and j = 2, nums[j] - nums[i] = 5 - 1 = 4.\
Note that with i = 1 and j = 0, the difference nums[j] - nums[i] = 7 - 1 = 6, but i > j, so it is not valid.



Example 2:\
**Input**: nums = [9,4,3,2]\
**Output**: -1\
**Explanation**:\
There is no i and j such that i < j and nums[i] < nums[j].


Example 3:\
**Input**: nums = [1,5,2,10]\
**Output**: 9\
**Explanation**:\
The maximum difference occurs with i = 0 and j = 3, nums[j] - nums[i] = 10 - 1 = 9.

<details>

Note - Basically iterate karenge, point pe min number compare kr k store karenge aur usi min se differnece nikal k store karenge


```js
function maximumDifference(nums) {
    let minSoFar = nums[0]; // Initialize with the first element
    let maxDifference = -1; // Initialize the maximum difference as -1

    for (let j = 1; j < nums.length; j++) {
        if (nums[j] > minSoFar) {
            maxDifference = Math.max(maxDifference, nums[j] - minSoFar);
        } else {
            minSoFar = nums[j]; // Update the minimum so far
        }
    }

    return maxDifference;
}

// Example 1:
console.log(maximumDifference([7, 1, 5, 4])); // **Output**: 4

// Example 2:
console.log(maximumDifference([9, 4, 3, 2])); // **Output**: -1
```
</details>


<br>



> ### 136. Single Number
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a `linear runtime complexity and use only constant extra space.`

Example 1:\
**Input**: nums = [2,2,1]\
**Output**: 1

Example 2:\
**Input**: nums = [4,1,2,1,2]\
**Output**: 4

Example 3:\
**Input**: nums = [1]\
**Output**: 1

<details>

```js
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num; // XOR operation
    }
    return result;
}
```

</details>

> ### 278. First Bad Version

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.


<br>


Example 1:

**Input**: n = 5, bad = 4\
**Output**: 4\
**Explanation**:\
call isBadVersion(3) -> false\
call isBadVersion(5) -> true\
call isBadVersion(4) -> true\
Then 4 is the first bad version.

Example 2:

**Input**: n = 1, bad = 1\
**Output**: 1

<details>

```js
var solution = function(isBadVersion) {
    /**
     * @param {integer} n - Total number of versions
     * @return {integer} - The first bad version
     */
    return function(n) {
        let left = 1;
        let right = n;

        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            if (isBadVersion(mid)) {
                right = mid; // Continue searching in the left half
            } else {
                left = mid + 1; // Continue searching in the right half
            }
        }

        // At the end of the loop, left and right will converge to the first bad version
        return left;
    };
};

```

</details>


<br>



> ### 867. Transpose Matrix
Given a 2D integer array matrix, return the transpose of matrix.

The transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.

Example 1:

**Input**: matrix = [[1,2,3],[4,5,6],[7,8,9]]\
**Output**: [[1,4,7],[2,5,8],[3,6,9]]

Example 2:

**Input**: matrix = [[1,2,3],[4,5,6]]\
**Output**: [[1,4],[2,5],[3,6]]

<details>

```js
function transpose(matrix) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let result = Array.from({ length: cols }, () => Array(rows).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}
```

</details>


<br>



> ### 1827. Minimum Operations to Make the Array Increasing
You are given an integer array nums (0-indexed). In one operation, you can choose an element of the array and increment it by 1.

For example, if nums = [1,2,3], you can choose to increment nums[1] to make nums = [1,3,3].\
Return the minimum number of operations needed to make nums strictly increasing.

An array nums is strictly increasing if nums[i] < nums[i+1] for all 0 <= i < nums.length - 1. An array of length 1 is trivially strictly increasing.

Example 1:

**Input**: nums = [1,1,1]
**Output**: 3\
**Explanation**: You can do the following operations:\
1) Increment nums[2], so nums becomes [1,1,2].\
2) Increment nums[1], so nums becomes [1,2,2].\
3) Increment nums[2], so nums becomes [1,2,3].

Example 2:

**Input**: nums = [1,5,2,4,1]\
**Output**: 14\
Example 3:

**Input**: nums = [8]\
**Output**: 0

<details>

`video: `https://youtu.be/ttznU-BTqTk

```js
function minOperations(nums) {
    let operations = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= nums[i - 1]) {
            // Calculate how many increments are needed to make nums[i] > nums[i - 1]
            let increment = nums[i - 1] - nums[i] + 1;
            operations += increment;
            nums[i] += increment; // Update nums[i] to maintain the strictly increasing condition
        }
    }

    return operations;
}
```

</details>

<br>

> ### 453. Minimum Moves to Equal Array Elements
Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

In one move, you can increment n - 1 elements of the array by 1.

Example 1:

**Input**: nums = [1,2,3]\
**Output**: 3\
**Explanation**: Only three moves are needed (remember each move increments two elements):\
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]

Example 2:

**Input**: nums = [1,1,1]\
**Output**: 0

<details>

To solve this problem, we can approach it mathematically. `Instead of incrementing (n-1) elements in each move, we can think of this as decrementing one element (effectively shifting the perspective)`. This approach simplifies the problem to finding the total difference between all elements and the smallest element.

```javascript
var minMoves = function(nums) {
    const min = Math.min(...nums);
    let moves = 0;

    for (const num of nums) {
        moves += num - min;
    }

    return moves;
};

// Example 1
console.log(minMoves([1, 2, 3])); // **Output**: 3

// Example 2
console.log(minMoves([1, 1, 1])); // **Output**: 0
```

- In the example `[1, 2, 3]`, the smallest element is `1`. 
- The total moves are `(2 - 1) + (3 - 1) = 1 + 2 = 3`. 
- The array becomes `[4, 4, 4]` after 3 moves.

</details>


<br>


> ### 202. Happy Number

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.\
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.\
Those numbers for which this process ends in 1 are happy.\
Return true if n is a happy number, and false if not.


<br>


Example 1:\
**Input**: n = 19\
**Output**: true\
**Explanation**:\
1^2 + 9^2 = 82\
8^2 + 2^2 = 68\
6^2 + 8^2 = 100\
1^2 + 0^2 + 0^2 = 1


<br>


Example 2:\
**Input**: n = 2\
**Output**: false

<details>

```js
function sumDigitSquare(n) {
  	n = n+ ''
    let sum = 0;
    for(let unit of n){
      sum = sum + (unit * unit)
    }

    return sum;
}

function isHappy(n) {
    let s = [];
    s.push(n);

    while (true) {
        if (n == 1) return true;
        n = sumDigitSquare(n)

        if (s.includes(n)) return false
        s.push(n)
    }
    return false;
}
isHappy(2)
isHappy(19)
```

</details>


<br>

> ### 1005. Maximize Sum Of Array After K Negations
Given an integer array nums and an integer k, modify the array in the following way:

choose an index i and replace nums[i] with -nums[i].\
You should apply this process exactly k times. You may choose the same index i multiple times.

Return the largest possible sum of the array after modifying it in this way.

Example 1:\
**Input**: nums = [4,2,3], k = 1\
**Output**: 5\
**Explanation**: Choose index 1 and nums becomes [4,-2,3].

Example 2:\
**Input**: nums = [3,-1,0,2], k = 3\
**Output**: 6\
**Explanation**: Choose indices (1, 2, 2) and nums becomes [3,1,0,2].

Example 3:\
**Input**: nums = [2,-3,-1,5,-4], k = 2\
**Output**: 13\
**Explanation**: Choose indices (1, 4) and nums becomes [2,3,-1,5,4].

<details>

`video:` https://www.youtube.com/watch?v=8GDHYgbxTN4

```js
function largestSumAfterKNegations(nums, k) {
    // Sort the array based on the absolute values in descending order
    nums.sort((a, b) => Math.abs(b) - Math.abs(a));
    
    // Iterate through the array and apply negations
    for (let i = 0; i < nums.length && k > 0; i++) {
        if (nums[i] < 0) {
            nums[i] = -nums[i];
            k--;
        }
    }

    // If k is still greater than 0 and it's odd, flip the smallest value
    if (k % 2 === 1) {
        nums[nums.length - 1] = -nums[nums.length - 1];
    }

    // Return the sum of the modified array
    return nums.reduce((sum, num) => sum + num, 0);
}

// Example 1
console.log(largestSumAfterKNegations([4, 2, 3], 1)); // **Output**: 5

// Example 2
console.log(largestSumAfterKNegations([3, -1, 0, 2], 3)); // **Output**: 6
```
</details>


<br>



> ### 122. Best Time to Buy and Sell Stock II
You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.

Example 1:

**Input**: prices = [7,1,5,3,6,4]\
**Output**: 7\
**Explanation**: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.\
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.\
Total profit is 4 + 3 = 7.

Example 2:

**Input**: prices = [1,2,3,4,5]\
**Output**: 4\
**Explanation**: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.\
Total profit is 4.

Example 3:

**Input**: prices = [7,6,4,3,1]\
**Output**: 0\
**Explanation**: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.

<details>

`video:` https://www.youtube.com/watch?v=Q7v239y-Tik


```js
var maxProfit = function(prices) {
    let profit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        // If today's price is greater than yesterday's, we make a profit by selling today
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    
    return profit;
};

// Example usage:
const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // **Output**: 7
```
</details>

<br>

> ### 1700. Number of Students Unable to Eat Lunch

The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers 0 and 1 respectively. All students stand in a queue. Each student either prefers square or circular sandwiches.

The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a stack. At each step:

If the student at the front of the queue prefers the sandwich on the top of the stack, they will take it and leave the queue.\
Otherwise, they will leave it and go to the queue's end.\
This continues until none of the queue students want to take the top sandwich and are thus unable to eat.\

You are given two integer arrays students and sandwiches where sandwiches[i] is the type of the i​​​​​​th sandwich in the stack (i = 0 is the top of\ the stack) and students[j] is the preference of the j​​​​​​th student in the initial queue (j = 0 is the front of the queue). Return the number of\ students that are unable to eat.

Example 1:

**Input**: students = [1,1,0,0], sandwiches = [0,1,0,1]\
**Output**: 0 \
**Explanation**:\
- Front student leaves the top sandwich and returns to the end of the line making students = [1,0,0,1].\
- Front student leaves the top sandwich and returns to the end of the line making students = [0,0,1,1].\
- Front student takes the top sandwich and leaves the line making students = [0,1,1] and sandwiches = [1,0,1].\
- Front student leaves the top sandwich and returns to the end of the line making students = [1,1,0].\
- Front student takes the top sandwich and leaves the line making students = [1,0] and sandwiches = [0,1].\
- Front student leaves the top sandwich and returns to the end of the line making students = [0,1].\
- Front student takes the top sandwich and leaves the line making students = [1] and sandwiches = [1].\
- Front student takes the top sandwich and leaves the line making students = [] and sandwiches = [].\
Hence all students are able to eat.

Example 2:

**Input**: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]\
**Output**: 3

<br>


<details>

```js
function countStudents(students, sandwiches) {
    let studentQueue = students;
    let sandwichStack = sandwiches;
    let count = 0;

    while (studentQueue.length > 0) {
        if (studentQueue[0] === sandwichStack[0]) {
            // If the student at the front of the queue wants the top sandwich
            studentQueue.shift();
            sandwichStack.shift();
            count = 0; // Reset the count as a match happened
        } else {
            // Move the student to the end of the queue
            studentQueue.push(studentQueue.shift());
            count++;
            // If all students in the queue refuse the current sandwich
            if (count === studentQueue.length) {
                return count;
            }
        }
    }

    return 0; // All students were able to eat
}
```
</details>

<br>


> ### 1710. Maximum Units on a Truck

You are assigned to put some amount of boxes onto one truck. You are given a 2D array boxTypes, where boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]:

numberOfBoxesi is the number of boxes of type i.\
numberOfUnitsPerBoxi is the number of units in each box of the type i.\
You are also given an integer truckSize, which is the maximum number of boxes that can be put on the truck. You can choose any boxes to put on the truck as long as the number of boxes does not exceed truckSize.

Return the maximum total number of units that can be put on the truck.

Example 1:

**Input**: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4\
**Output**: 8\
**Explanation**: There are:\
- 1 box of the first type that contains 3 units.\
- 2 boxes of the second type that contain 2 units each.\
- 3 boxes of the third type that contain 1 unit each.\
You can take all the boxes of the first and second types, and one box of the third type.\
The total number of units will be = (1 * 3) + (2 * 2) + (1 * 1) = 8.

Example 2:

**Input**: boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10\
**Output**: 91

<br>

<details>

```js
var maximumUnits = function(boxTypes, truckSize) {
    // Sort boxTypes in descending order based on the number of units per box
    boxTypes.sort((a, b) => b[1] - a[1]);

    let maxUnits = 0;

    for (let i = 0; i < boxTypes.length; i++) {
        let [numBoxes, unitsPerBox] = boxTypes[i];

        if (truckSize >= numBoxes) {
            // Take all boxes of this type
            maxUnits += numBoxes * unitsPerBox;
            truckSize -= numBoxes;
        } else {
            // Take only the number of boxes that can fit
            maxUnits += truckSize * unitsPerBox;
            break; // Truck is full
        }
    }

    return maxUnits;
};

// Example usage:
console.log(maximumUnits([[1,3],[2,2],[3,1]], 4)); // **Output**: 8
console.log(maximumUnits([[5,10],[2,5],[4,7],[3,9]], 10)); // **Output**: 91
```
</details>

<br>


> ### 2027. Minimum Moves to Convert String
You are given a string s consisting of n characters which are either 'X' or 'O'.

A move is defined as selecting three consecutive characters of s and converting them to 'O'. Note that if a move is applied to the character 'O', it will stay the same.

Return the minimum number of moves required so that all the characters of s are converted to 'O'.

Example 1:

**Input**: s = "XXX"\
**Output**: 1\
**Explanation**: XXX -> OOO\
We select all the 3 characters and convert them in one move.

Example 2:

**Input**: s = "XXOX"\
**Output**: 2\
**Explanation**: XXOX -> OOOX -> OOOO\
We select the first 3 characters in the first move, and convert them to 'O'.\
Then we select the last 3 characters and convert them so that the final string contains all 'O's.

Example 3:

**Input**: s = "OOOO"\
**Output**: 0\
**Explanation**: There are no 'X's in s to convert.

<details>

```js
function minimumMoves(s) {
    let moves = 0; // To count the minimum number of moves
    let i = 0;    // Pointer to iterate through the string

    while (i < s.length) {
        if (s[i] === 'X') {
            // If we encounter 'X', apply a move to convert 3 characters starting from this index to 'O'
            moves++;
            i += 3; // Skip the next two characters since they are covered by this move
        } else {
            // If the character is 'O', just move to the next character
            i++;
        }
    }

    return moves;
}

// Example usage:
console.log(minimumMoves("XXX")); // **Output**: 1
console.log(minimumMoves("XXOX")); // **Output**: 2
console.log(minimumMoves("OXOXOX")); // **Output**: 2
```
</details>


<br>



> ### 1403. Minimum Subsequence in Non-Increasing Order

Given the array nums, obtain a subsequence of the array whose sum of elements is strictly greater than the sum of the non included elements in such subsequence. 

If there are multiple solutions, return the subsequence with minimum size and if there still exist multiple solutions, return the subsequence with the maximum total sum of all its elements. A subsequence of an array can be obtained by erasing some (possibly zero) elements from the array. 

Note that the solution with the given constraints is guaranteed to be unique. Also return the answer sorted in non-increasing order.

Example 1:

**Input**: nums = [4,3,10,9,8]\
**Output**: [10,9]\
**Explanation**: The subsequences [10,9] and [10,8] are minimal such that the sum of their elements is strictly greater than the sum of elements not included. However, the subsequence [10,9] has the maximum total sum of its elements. 

Example 2:

**Input**: nums = [4,4,7,6,7]\
**Output**: [7,7,6]\
**Explanation**: The subsequence [7,7] has the sum of its elements equal to 14 which is not strictly greater than the sum of elements not included (14 = 4 + 4 + 6). Therefore, the subsequence [7,6,7] is the minimal satisfying the conditions. Note the subsequence has to be returned in non-increasing order.  
 
<br>

<details>

```js
var minSubsequence = function(nums) {
    // Sort the array in descending order
    nums.sort((a, b) => b - a);

    const totalSum = nums.reduce((acc, num) => acc + num, 0);
    let subsequenceSum = 0;
    let subsequence = [];

    // Iterate through the sorted array
    for (let i = 0; i < nums.length; i++) {
        subsequenceSum += nums[i];
        subsequence.push(nums[i]);

        // Stop once the subsequence sum is greater than the remaining sum
        if (subsequenceSum > totalSum - subsequenceSum) {
            break;
        }
    }

    return subsequence;
};
```
</details>

<br>


> ### 1436. Destination City
You are given the array paths, where paths[i] = [cityAi, cityBi] means there exists a direct path going from cityAi to cityBi. Return the destination city, that is, `the city without any path outgoing to another city`.

It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.

Example 1:

**Input**: paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]\
**Output**: "Sao Paulo" \
**Explanation**: Starting at "London" city you will reach "Sao Paulo" city which is the destination city. Your trip consist of: "London" -> "New York" -> "Lima" -> "Sao Paulo".

Example 2:

**Input**: paths = [["B","C"],["D","B"],["C","A"]]\
**Output**: "A"\
**Explanation**: All possible trips are:\
"D" -> "B" -> "C" -> "A".\
"B" -> "C" -> "A".\
"C" -> "A".\
"A".\
Clearly the destination city is "A".

Example 3:

**Input**: paths = [["A","Z"]]\
**Output**: "Z"

<details>

```js
var destCity = function(paths) {
    const startCities = new Set();

    // Collect all starting cities
    for (const [start, end] of paths) {
        startCities.add(start);
    }

    // Find the destination city
    for (const [start, end] of paths) {
        if (!startCities.has(end)) {
            return end; // This city is not a starting city, so it's the destination
        }
    }

    return ""; // Default return, though it won't reach here due to the problem guarantee
};

// Example 1
console.log(destCity([["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]])); 
// **Output**: "Sao Paulo"

// Example 2
console.log(destCity([["B","C"],["D","B"],["C","A"]])); 
// **Output**: "A"

// Example 3
console.log(destCity([["A","Z"]])); 
// **Output**: "Z"
```
</details>

<br>


> ### 532. K-diff Pairs in an Array
Given an array of integers nums and an integer k, return the number of unique k-diff pairs in the array.

A k-diff pair is an integer pair (nums[i], nums[j]), where the following are true:

0 <= i, j < nums.length\
i != j\
|nums[i] - nums[j]| == k\
Notice that |val| denotes the absolute value of val.

Example 1:

**Input**: nums = [3,1,4,1,5], k = 2\
**Output**: 2\
**Explanation**: There are two 2-diff pairs in the array, (1, 3) and (3, 5).\
Although we have two 1s in the input, we should only return the number of unique pairs.

Example 2:

**Input**: nums = [1,2,3,4,5], k = 1\
**Output**: 4\
**Explanation**: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).

Example 3:

**Input**: nums = [1,3,1,5,4], k = 0\
**Output**: 1\
**Explanation**: There is one 0-diff pair in the array, (1, 1).

<details>

```js
var findPairs = function(nums, k) {
    if (k < 0) return 0; // Difference cannot be negative
    
    const map = new Map();
    let count = 0;

    // Count occurrences of each number
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    // Find k-diff pairs
    for (const [num, freq] of map.entries()) {
        if (k === 0) {
            // For k = 0, count numbers with frequency > 1
            if (freq > 1) count++;
        } else {
            // For k > 0, check if (num + k) exists
            if (map.has(num + k)) count++;
        }
    }

    return count;
};

// Example 1
console.log(findPairs([3,1,4,1,5], 2)); 
// **Output**: 2

// Example 2
console.log(findPairs([1,2,3,4,5], 1)); 
// **Output**: 4

// Example 3
console.log(findPairs([1,3,1,5,4], 0)); 
// **Output**: 1
```
</details>


<br>



> ### 1716. Calculate Money in Leetcode Bank
Hercy wants to save money for his first car. He puts money in the Leetcode bank every day.

He starts by putting in $1 on Monday, the first day. Every day from Tuesday to Sunday, he will put in $1 more than the day before. On every subsequent Monday, he will put in $1 more than the previous Monday.

Given n, return the total amount of money he will have in the Leetcode bank at the end of the nth day.

Example 1:

**Input**: n = 4\
**Output**: 10\
**Explanation**: After the 4th day, the total is 1 + 2 + 3 + 4 = 10.

Example 2:

**Input**: n = 10\
**Output**: 37\
**Explanation**: After the 10th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4) = 37. Notice that on the 2nd Monday, Hercy only puts in $2.

Example 3:

**Input**: n = 20\
**Output**: 96\
**Explanation**: After the 20th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4 + 5 + 6 + 7 + 8) + (3 + 4 + 5 + 6 + 7 + 8) = 96.

<details>

```js

var totalMoney = function(n) {
    let total = 0;
    let weekStart = 1; // Money deposited on the first day of the week

    for (let i = 1; i <= n; i++) {
        total += weekStart + ((i - 1) % 7); // Add the daily deposit
        if (i % 7 === 0) {
            weekStart++; // Increment the weekly starting value after every 7 days
        }
    }

    return total;
};

// Example 1
console.log(totalMoney(4)); 
// **Output**: 10

// Example 2
console.log(totalMoney(10)); 
// **Output**: 37

// Example 3
console.log(totalMoney(20)); 
// **Output**: 96
```
</details>


<br>



> ### 985. Sum of Even Numbers After Queries
You are given an integer array nums and an array queries where queries[i] = [vali, indexi].\
For each query i, first, apply nums[indexi] = nums[indexi] + vali, then print the sum of the even values of nums.\
Return an integer array answer where answer[i] is the answer to the ith query.

Example 1:

**Input**: nums = [1,2,3,4], queries = [[1,0],[-3,1],[-4,0],[2,3]]\
**Output**: [8,6,2,4]\
**Explanation**: At the beginning, the array is [1,2,3,4].\
After adding 1 to nums[0], the array is [2,2,3,4], and the sum of even values is 2 + 2 + 4 = 8.\
After adding -3 to nums[1], the array is [2,-1,3,4], and the sum of even values is 2 + 4 = 6.\
After adding -4 to nums[0], the array is [-2,-1,3,4], and the sum of even values is -2 + 4 = 2.\
After adding 2 to nums[3], the array is [-2,-1,3,6], and the sum of even values is -2 + 6 = 4.

Example 2:

**Input**: nums = [1], queries = [[4,0]]\
**Output**: [0]

<details>

`video:`https://www.youtube.com/watch?v=2bjRM_6hDsI

```js
function sumEvenAfterQueries(nums, queries) {
    let evenSum = nums.reduce((sum, num) => (num % 2 === 0 ? sum + num : sum), 0);
    const result = [];

    for (const [val, index] of queries) {
        // If the current number at index is even, subtract it from the even sum
        if (nums[index] % 2 === 0) {
            evenSum -= nums[index];
        }

        // Apply the update
        nums[index] += val;

        // If the new number at index is even, add it to the even sum
        if (nums[index] % 2 === 0) {
            evenSum += nums[index];
        }

        // Append the current even sum to the result
        result.push(evenSum);
    }

    return result;
}

// Example 1
const nums1 = [1, 2, 3, 4];
const queries1 = [[1, 0], [-3, 1], [-4, 0], [2, 3]];
console.log(sumEvenAfterQueries(nums1, queries1)); // **Output**: [8, 6, 2, 4]

// Example 2
const nums2 = [1];
const queries2 = [[4, 0]];
console.log(sumEvenAfterQueries(nums2, queries2)); // **Output**: [0]
```
</details>


<br>



> ### 976. Largest Perimeter Triangle
Given an integer array nums, return the largest perimeter of a triangle with a `non-zero area`, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return 0.

Example 1:

**Input**: nums = [2,1,2]\
**Output**: 5\
**Explanation**: You can form a triangle with three side lengths: 1, 2, and 2.

Example 2:

**Input**: nums = [1,2,1,10]\
**Output**: 0\
**Explanation**:\ 
You cannot use the side lengths 1, 1, and 2 to form a triangle.\
You cannot use the side lengths 1, 1, and 10 to form a triangle.\
You cannot use the side lengths 1, 2, and 10 to form a triangle.\
As we cannot use any three side lengths to form a triangle of non-zero area, we return 0.

<details>

`video:` https://youtu.be/1dmbC4I7yZE

```js
function largestPerimeter(nums) {
    // Sort the array in descending order
    nums.sort((a, b) => b - a);

    // Check triples for the triangle inequality
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] < nums[i + 1] + nums[i + 2]) {
            // Valid triangle found
            return nums[i] + nums[i + 1] + nums[i + 2];
        }
    }

    // No valid triangle can be formed
    return 0;
}

// Example 1
const nums1 = [2, 1, 2];
console.log(largestPerimeter(nums1)); // **Output**: 5

// Example 2
const nums2 = [1, 2, 1, 10];
console.log(largestPerimeter(nums2)); // **Output**: 0
```
</details>


<br>


> ### 914. X of a Kind in a Deck of Cards
You are given an integer array deck where deck[i] represents the number written on the ith card.

Partition the cards into one or more groups such that:

Each group has exactly x cards where x > 1, and\
All the cards in one group have the same integer written on them.\
Return true if such partition is possible, or false otherwise.

Example 1:

**Input**: deck = [1,2,3,4,4,3,2,1]\
**Output**: true\
**Explanation**: Possible partition [1,1],[2,2],[3,3],[4,4].

Example 2:

**Input**: deck = [1,1,1,2,2,2,3,3]\
**Output**: false\
**Explanation**: No possible partition.

<details>

`video:` https://youtu.be/UvpXInRkZ3Q?si=gsImTBuuojY_hXAY

```js
function hasGroupsSizeX(deck) {
    // Step 1: Count the frequencies of each number
    const count = {};
    for (const num of deck) {
        count[num] = (count[num] || 0) + 1;
    }

    // Step 2: Find the GCD of the frequencies
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    let groupSize = Object.values(count).reduce((a, b) => gcd(a, b));

    // Step 3: Check if the GCD is greater than 1
    return groupSize > 1;
}

// Example Usage
console.log(hasGroupsSizeX([1, 2, 3, 4, 4, 3, 2, 1])); // **Output**: true
console.log(hasGroupsSizeX([1, 1, 1, 2, 2, 2, 3, 3])); // **Output**: false
```
</details>


<br>



> ### 941. Valid Mountain Array

Given an array of integers arr, return true if and only if it is a valid mountain array.

![screenshot](images/mountain.png)

Example 1:

**Input**: arr = [2,1]\
**Output**: false

Example 2:

**Input**: arr = [3,5,5]\
**Output**: false

Example 3:

**Input**: arr = [0,3,2,1]\
**Output**: true

<details>

```js
var validMountainArray = function (arr) {
  const n = arr.length;

  let pivot = false;

  for (let i = 1; i < arr.length - 1; i++) {
    const curr = arr[i];
    const prev = arr[i - 1];
    const next = arr[i + 1];

    if (curr > prev && curr > next) {
      pivot = true;
    } else if (prev >= curr && next >= curr) {
      return false;
    }
  }

  return pivot;
};
```
</details>

<br>

> ### 69. Sqrt(x)

Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.
 

Example 1:

**Input**: x = 4\
**Output**: 2\
**Explanation**: The square root of 4 is 2, so we return 2.

Example 2:

**Input**: x = 8\
**Output**: 2\
**Explanation**: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.


<details>

```js
var mySqrt = function(x) {
    if (x === 0) return 0; // Edge case for 0

    let left = 1, right = x;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let squared = mid * mid;

        if (squared === x) {
            return mid;
        } else if (squared < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return right; // Return the largest integer less than or equal to sqrt(x)
};
```
</details>


> ### 1221. Split a String in Balanced Strings

Balanced strings are those that have an equal quantity of 'L' and 'R' characters.

Given a balanced string s, split it into some number of substrings such that:

Each substring is balanced. Return the maximum number of balanced strings you can obtain.


Example 1:\
**Input**: s = "RLRRLLRLRL"\
**Output**: 4\
**Explanation**: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.


Example 2:\
**Input**: s = "RLRRRLLRLL"\
**Output**: 2\
**Explanation**: s can be split into "RL", "RRRLLRLL", each substring contains same number of 'L' and 'R'.\
Note that s cannot be split into "RL", "RR", "RL", "LR", "LL", because the 2nd and 5th substrings are not balanced.


Example 3:\
**Input**: s = "LLLLRRRR"\
**Output**: 1\
**Explanation**: s can be split into "LLLLRRRR".

<details>

1. **Initialize two variables:**
   - `balance = 0` → This tracks the difference between the count of 'R' and 'L'.
   - `count = 0` → This keeps track of how many balanced substrings we have found.

2. **Iterate through the string `s` character by character:**
   - If the character is `'R'`, increase `balance` by `1` (`balance += 1`).
   - If the character is `'L'`, decrease `balance` by `1` (`balance -= 1`).

3. **Whenever `balance === 0`, we have a balanced substring:**
   - Increase `count` by `1` because we just found a valid split.
   - Continue processing the remaining part of the string.

4. **Return `count` at the end.**

**Example:**
```
Input: "RLRRLLRLRL"
```
We process the string character by character:

| Step | Char | Balance (`R = +1`, `L = -1`) | Balanced Substring Found? |
|------|------|-----------------------------|----------------------------|
| 1    | R    | 1                           | No                         |
| 2    | L    | 0                           | ✅ Yes → `count = 1`       |
| 3    | R    | 1                           | No                         |
| 4    | R    | 2                           | No                         |
| 5    | L    | 1                           | No                         |
| 6    | L    | 0                           | ✅ Yes → `count = 2`       |
| 7    | R    | 1                           | No                         |
| 8    | L    | 0                           | ✅ Yes → `count = 3`       |
| 9    | R    | 1                           | No                         |
| 10   | L    | 0                           | ✅ Yes → `count = 4`       |

**Final **Output**:** `4`

```javascript
var balancedStringSplit = function(s) {
    let balance = 0, count = 0;

    for (let char of s) {
        balance += (char === 'R' ? 1 : -1);
        if (balance === 0) count++; // Found a balanced substring
    }

    return count;
};

console.log(balancedStringSplit("RLRRLLRLRL")); // **Output**: 4
console.log(balancedStringSplit("RLRRRLLRLL")); // **Output**: 2
console.log(balancedStringSplit("LLLLRRRR"));   // **Output**: 1
console.log(balancedStringSplit("LRLR"));       // **Output**: 2
```
</details>

<br>

> ### 821. Shortest Distance to a Character

Given a `string s` and a `character c` that occurs in s, return an array of integers answer where answer.length == s.length and answer[i] is the distance from index i to the closest occurrence of character c in s.

The distance between two indices i and j is abs(i - j), where abs is the absolute value function.

<br>

Example 1:

**Input**: s = "loveleetcode", c = "e"\
**Output**: [3,2,1,0,1,0,0,1,2,2,1,0]\
**Explanation**: The character 'e' appears at indices 3, 5, 6, and 11 (0-indexed).\
The closest occurrence of 'e' for index 0 is at index 3, so the distance is abs(0 - 3) = 3.\
The closest occurrence of 'e' for index 1 is at index 3, so the distance is abs(1 - 3) = 2.\
For index 4, there is a tie between the 'e' at index 3 and the 'e' at index 5, but the distance is still the same: abs(4 - 3) == abs(4 - 5) = 1.\
The closest occurrence of 'e' for index 8 is at index 6, so the distance is abs(8 - 6) = 2.



Example 2:

**Input**: s = "aaab", c = "b"\
**Output**: [3,2,1,0]

<details>

video - https://youtu.be/NJ294ovmUB4?si=wfqeen7_5mv_senR&t=55

**Algorithm Name: Two-Pass Approach (Forward & Backward Scan)**  

**Optimal Approach Using Two-Pass Traversal**
We solve this problem efficiently in **O(n) time** by scanning the string twice:  
1. **First Pass (Left to Right):** Track the closest occurrence of `c` from the left.
2. **Second Pass (Right to Left):** Track the closest occurrence from the right and update distances.

```javascript
var shortestToChar = function(s, c) {
    let n = s.length;
    let answer = new Array(n).fill(Infinity);
    let prev = -Infinity;

    // Left to right pass
    for (let i = 0; i < n; i++) {
        if (s[i] === c) prev = i;
        answer[i] = Math.abs(i - prev);
    }

    prev = Infinity;
    // Right to left pass
    for (let i = n - 1; i >= 0; i--) {
        if (s[i] === c) prev = i;
        answer[i] = Math.min(answer[i], Math.abs(i - prev));
    }

    return answer;
};

// Example test cases
console.log(shortestToChar("loveleetcode", "e")); // **Output**: [3,2,1,0,1,0,0,1,2,2,1,0]
console.log(shortestToChar("aaab", "b")); // **Output**: [3,2,1,0]
```
</details>


<br>


> ### 35. Search Insert Position

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

Example 1:\
**Input**: nums = [1,3,5,6], target = 5\
**Output**: 2

Example 2:\
**Input**: nums = [1,3,5,6], target = 2\
**Output**: 1

Example 3:\
**Input**: nums = [1,3,5,6], target = 7\
**Output**: 4

<details>

```js
var searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;  // Target found
        } else if (nums[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }

    return left; // Target not found, return insertion index
};
```
</details>


<br>


> ### 788. Rotated Digits

An integer x is a good if after rotating each digit individually by 180 degrees, we get a valid number that is different from x. Each digit must be rotated - we cannot choose to leave it alone.

A number is valid if each digit remains a digit after rotation. For example:

0, 1, and 8 rotate to themselves,\
2 and 5 rotate to each other (in this case they are rotated in a different direction, in other words, 2 or 5 gets mirrored),\
6 and 9 rotate to each other, and\
the rest of the numbers do not rotate to any other number and become invalid.\
Given an integer n, return the number of good integers in the range [1, n].

Example 1:
**Input**: n = 10\
**Output**: 4\
**Explanation**: There are four good numbers in the range [1, 10] : 2, 5, 6, 9.\
Note that 1 and 10 are not good numbers, since they remain unchanged after rotating.

Example 2:

**Input**: n = 1\
**Output**: 0

Example 3:

**Input**: n = 2\
**Output**: 1

video - https://youtu.be/J8rh2Yacu0c?si=pAE3oA3lMHuvLS8F

### **Key Idea**
- Use a **DP array** where:
  - `dp[i] = 0` → Invalid (contains 3, 4, 7).
  - `dp[i] = 1` → Valid but unchanged (only contains 0, 1, 8).
  - `dp[i] = 2` → Valid and changes (contains 2, 5, 6, 9) → **"Good Number"**.

- For each `i`:
  - If `i < 10`, we check directly.
  - If `i >= 10`, **use previous DP results**:
    - `dp[i] = dp[i / 10]` (last digit) & `dp[i % 10]` (remaining).
    - If any part is invalid (`0`), the whole number is invalid.
    - If any part is a "good number" (`2`), the whole number is good.

### **Optimized JavaScript Implementation**
```javascript
var rotatedDigits = function(n) {
    let dp = new Array(n + 1).fill(0);
    let count = 0;

    for (let i = 0; i <= n; i++) {
        if (i < 10) {
            if ("347".includes(i.toString())) {
                dp[i] = 0; // Invalid
            } else if ("2569".includes(i.toString())) {
                dp[i] = 2; // Good number (changes)
                count++;
            } else {
                dp[i] = 1; // Valid but unchanged
            }
        } else {
            let lastDigit = i % 10;
            let remaining = Math.floor(i / 10);

            if (dp[lastDigit] === 0 || dp[remaining] === 0) {
                dp[i] = 0; // Invalid
            } else if (dp[lastDigit] === 2 || dp[remaining] === 2) {
                dp[i] = 2; // Good number (changes)
                count++;
            } else {
                dp[i] = 1; // Valid but unchanged
            }
        }
    }

    return count;
};

// Example test cases
console.log(rotatedDigits(10)); // **Output**: 4
console.log(rotatedDigits(20)); // **Output**: 9
console.log(rotatedDigits(30)); // **Output**: 15
```

<br>

> ### 1332. Remove Palindromic Subsequences

You are given a string s consisting only of letters 'a' and 'b'. In a single step you can remove one palindromic subsequence from s.

Return the minimum number of steps to make the given string empty.

A string is a subsequence of a given string if it is generated by deleting some characters of a given string without changing its order. Note that a subsequence does not necessarily need to be contiguous.

A string is called palindrome if is one that reads the same backward as well as forward.

Example 1:

**Input**: s = "ababa"\
**Output**: 1\
**Explanation**: s is already a palindrome, so its entirety can be removed in a single step.

Example 2:

**Input**: s = "abb"\
**Output**: 2\
**Explanation**: "abb" -> "bb" -> "".\
Remove palindromic subsequence "a" then "bb".

Example 3:

**Input**: s = "baabb"\
**Output**: 2\
**Explanation**: "baabb" -> "b" -> "". \
Remove palindromic subsequence "baab" then "b".

<details>

1. **If the string `s` is already a palindrome**, we can remove it in **1 step**.
2. **If `s` is not a palindrome**, we can always remove all `'a'` characters in one step and all `'b'` characters in another step.  
   - This guarantees that the entire string will be removed in **2 steps**.


```javascript
var removePalindromeSub = function(s) {
    return s === s.split('').reverse().join('') ? 1 : 2;
};

// Example test cases
console.log(removePalindromeSub("ababa")); // **Output**: 1
console.log(removePalindromeSub("abb"));   // **Output**: 2
console.log(removePalindromeSub("baabb")); // **Output**: 2
console.log(removePalindromeSub(""));      // **Output**: 0 (Empty string needs no steps)
```
</details>

<br>

> ### 1047. Remove All Adjacent Duplicates In String

You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.

<br>

Example 1:\
**Input**: s = "abbaca"\
**Output**: "ca"\
**Explanation**:\
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".

Example 2:\
**Input**: s = "azxxzy"\
**Output**: "ay"

<details>

**Algorithm**
We can solve this problem efficiently using a **stack**. The idea is to iterate through the string and keep track of characters using a stack. Whenever we encounter a duplicate adjacent character (i.e., it matches the top of the stack), we remove it.
1. **Initialize a stack** to store characters.
2. **Iterate through `s`**:
   - If the stack is **not empty** and the current character is equal to the top of the stack, **pop** (remove) the top.
   - Otherwise, **push** the current character onto the stack.
3. **Return the final stack** as a string.


```javascript
var removeDuplicates = function(s) {
    let stack = [];
    
    for (let char of s) {
        if (stack.length && stack[stack.length - 1] === char) {
            stack.pop(); // Remove duplicate
        } else {
            stack.push(char);
        }
    }
    
    return stack.join(''); // Convert stack back to string
};

// Example test cases
console.log(removeDuplicates("abbaca")); // **Output**: "ca"
console.log(removeDuplicates("azxxzy")); // **Output**: "ay"
console.log(removeDuplicates("aabbcc")); // **Output**: ""
console.log(removeDuplicates("abc"));    // **Output**: "abc"
```

</details>

<br>

> ### 231. Power of Two/Three, (replace 2 with 3 in soln)

Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2x.

<br>

Example 1:\
**Input**: n = 1\
**Output**: true\
**Explanation**: 20 = 1

Example 2:\
**Input**: n = 16\
**Output**: true\
**Explanation**: 24 = 16

Example 3:\
**Input**: n = 3\
**Output**: false

<details>

If `n` is a power of two, it should be **divisible by 2 repeatedly** until it becomes `1`. Otherwise, it will have a remainder at some step.

```javascript
var isPowerOfTwo = function(n) {
    if (n <= 0) return false; // Power of two must be positive

    while (n > 1) {
        if (n % 2 !== 0) return false; // If not divisible by 2, return false
        n /= 2; // Keep dividing by 2
    }
    
    return true; // If we reach 1, it is a power of two
};

// Example test cases
console.log(isPowerOfTwo(1));  // true
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(3));  // false
console.log(isPowerOfTwo(64)); // true
console.log(isPowerOfTwo(0));  // false
```

</details>

<br>

> ### 66. Plus One

You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

<br>

Example 1:\
**Input**: digits = [1,2,3]\
**Output**: [1,2,4]\
**Explanation**: The array represents the integer 123.\
Incrementing by one gives 123 + 1 = 124.\
Thus, the result should be [1,2,4].

Example 2:\
**Input**: digits = [4,3,2,1]\
**Output**: [4,3,2,2]\
**Explanation**: The array represents the integer 4321.\
Incrementing by one gives 4321 + 1 = 4322.\
Thus, the result should be [4,3,2,2].

Example 3:\
**Input**: digits = [9]\
**Output**: [1,0]\
**Explanation**: The array represents the integer 9.\
Incrementing by one gives 9 + 1 = 10.\
Thus, the result should be [1,0].

<details>

```javascript
var plusOne = function(digits) {
    let n = digits.length;

    for (let i = n - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;  // Just increment and return early
            return digits;
        }
        digits[i] = 0;  // If it's 9, make it 0 and continue loop
    }

    // If loop ends, that means we had all 9s (like 999 → 1000)
    digits.unshift(1);
    return digits;
};

// Example Test Cases
console.log(plusOne([1,2,3]));   // [1,2,4]
console.log(plusOne([4,3,2,1])); // [4,3,2,2]
console.log(plusOne([9,9,9]));   // [1,0,0,0]
console.log(plusOne([0]));       // [1]
```

</details>

<br>

> ### 852. Peak Index in a Mountain Array

You are given an integer mountain array arr of length n where the values increase to a peak element and then decrease.

Return the index of the peak element.

Your task is to solve it in `O(log(n))` time complexity.

Example 1:\
**Input**: arr = [0,1,0]\
**Output**: 1

Example 2:\
**Input**: arr = [0,2,1,0]\
**Output**: 1

Example 3:\
**Input**: arr = [0,10,5,2]\
**Output**: 1

<details>

Since the array first increases to a peak and then decreases, we can use **binary search** to efficiently locate the peak.

```javascript
var peakIndexInMountainArray = function(arr) {
    let left = 0, right = arr.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] < arr[mid + 1]) {
            // Move right (ascending part)
            left = mid + 1;
        } else {
            // Move left (descending part)
            right = mid;
        }
    }

    return left; // or return right (both will be at peak)
};

// Example Test Cases
console.log(peakIndexInMountainArray([0,1,0]));  // **Output**: 1
console.log(peakIndexInMountainArray([0,2,1,0])); // **Output**: 1
console.log(peakIndexInMountainArray([0,10,5,2])); // **Output**: 1
console.log(peakIndexInMountainArray([1,3,5,7,9,8,6,4,2])); // **Output**: 4
```

</details>

<br>


> ### 1013. Partition Array Into Three Parts With Equal Sum

Given an array of integers arr, return true if we can partition the array into three non-empty parts with equal sums.

Example 1:\
**Input**: arr = [0,2,1,-6,6,-7,9,1,2,0,1]\
**Output**: true\
**Explanation**: 0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1


Example 2:\
**Input**: arr = [0,2,1,-6,6,7,9,-1,2,0,1]\
**Output**: false


Example 3:\
**Input**: arr = [3,3,6,5,-2,2,5,1,-9,4]\
**Output**: true\
**Explanation**: 3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4

<details>

Since we need to split the array into **three equal sum parts**, we first compute the **total sum**. If the total sum is **not divisible by 3**, it's **impossible** to partition the array.


```javascript
var canThreePartsEqualSum = function(arr) {
    let totalSum = arr.reduce((sum, num) => sum + num, 0);
    
    if (totalSum % 3 !== 0) return false; // Cannot be divided into 3 equal parts
    
    let targetSum = totalSum / 3;
    let partitionSum = 0, count = 0;
    
    for (let num of arr) {
        partitionSum += num;
        
        if (partitionSum === targetSum) {
            count++; // Found one valid partition
            partitionSum = 0; // Reset sum for the next partition
        }
        
        if (count === 2) return true; // If two partitions are found, the third is automatic
    }
    
    return false;
};

// Example Test Cases
console.log(canThreePartsEqualSum([0,2,1,-6,6,-7,9,1,2,0,1]));  // **Output**: true
console.log(canThreePartsEqualSum([0,2,1,-6,6,7,9,-1,2,0,1]));  // **Output**: false
console.log(canThreePartsEqualSum([3,3,6,5,-2,2,5,1,-9,4]));    // **Output**: true
```

### **Explanation**
1. **Compute Total Sum**:
   - If the total sum is not divisible by `3`, return **false**.
   - Otherwise, set `targetSum = totalSum / 3`.
   
2. **Greedy Partitioning**:
   - Iterate through `arr`, accumulating the sum.
   - If the sum reaches `targetSum`, count a partition and reset the sum.
   - Stop early if we find **two** valid partitions (since the third is implied).

3. **Final Check**:
   - If two partitions are found, return **true**.
   - Otherwise, return **false**.

</details>

<br>

> ### 476. Number Complement (solution ka concept)

The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.\
Given an integer num, return its complement.

Example 1:\
**Input**: num = 5\
**Output**: 2\
**Explanation**: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.


Example 2:\
**Input**: num = 1\
**Output**: 0\
**Explanation**: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.

<details>

```js
var findComplement = function(num) {
    let binary = num.toString(2); // Convert num to binary string
    let complementStr = binary.split('').map(bit => bit === '1' ? '0' : '1').join('');
    return parseInt(complementStr, 2); // Convert back to integer
};

// Example Test Cases
console.log(findComplement(5));  // **Output**: 2
console.log(findComplement(1));  // **Output**: 0
console.log(findComplement(10)); // **Output**: 5
```

</details>

<br>

> ### 746. Min Cost Climbing Stairs

You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.

<br>

Example 1:\
**Input**: cost = [10,15,20]\
**Output**: 15\
**Explanation**: You will start at index 1.\
- Pay 15 and climb two steps to reach the top.\
The total cost is 15.

<br>

Example 2:\
**Input**: cost = [1,100,1,1,1,100,1,1,100,1]\
**Output**: 6\
**Explanation**: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.


<details>

1. Define `dp[i]` as the minimum cost to reach step `i`.
2. We can reach step `i` from:
   - Step `i - 1` with cost `cost[i - 1]`
   - Step `i - 2` with cost `cost[i - 2]`
3. The recurrence relation:
   - dp[i] = \min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
4. Start at either `cost[0]` or `cost[1]`, and calculate `dp` iteratively.

**Optimized JavaScript Solution (O(1) Space)**
Instead of storing the entire `dp` array, we only keep track of the last two steps.

```javascript
var minCostClimbingStairs = function(cost) {
    let prev1 = 0, prev2 = 0; // Base cases
    
    for (let i = 2; i <= cost.length; i++) {
        let curr = Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
};

// Example test cases:
console.log(minCostClimbingStairs([10, 15, 20])); // **Output**: 15
console.log(minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])); // **Output**: 6
```

</details>

<br>

> ### 624. Maximum Distance in Arrays

You are given m arrays, where each array is `sorted` in ascending order.

You can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers a and b to be their absolute difference |a - b|.

Return the maximum distance.

Example 1:\
**Input**: arrays = [[1,2,3],[4,5],[1,2,3]]\
**Output**: 4\
**Explanation**: One way to reach the maximum distance 4 is to pick 1 in the first or third array and pick 5 in the second array.


Example 2:\
**Input**: arrays = [[1],[1]]\
**Output**: 0

<details>

```javascript
var maxDistance = function(arrays) {
    let minVal = arrays[0][0], maxVal = arrays[0][arrays[0].length - 1];
    let maxDistance = 0;

    for (let i = 1; i < arrays.length; i++) {
        let currMin = arrays[i][0], currMax = arrays[i][arrays[i].length - 1];

        // Compute max distance considering different arrays
        maxDistance = Math.max(maxDistance, Math.abs(maxVal - currMin), Math.abs(currMax - minVal));

        // Update min and max values
        minVal = Math.min(minVal, currMin);
        maxVal = Math.max(maxVal, currMax);
    }

    return maxDistance;
};

// Example test cases:
console.log(maxDistance([[1,2,3],[4,5],[1,2,3]]));  // **Output**: 4
console.log(maxDistance([[1],[1]]));  // **Output**: 0
```

</details>

<br>

> ### 1544. Make The String Great

Given a string `s` of lower and upper case English letters.

A good string is a string which doesn't have **two adjacent characters** `s[i]` and `s[i + 1]` where:

- `0 <= i <= s.length - 2`
- `s[i]` is a lower-case letter and `s[i + 1]` is the same letter but in upper-case or **vice-versa**.

To make the string good, you can choose **two adjacent** characters that make the string bad and remove them. You can keep doing this until the string becomes good.

Return the string after making it good. The answer is guaranteed to be unique under the given constraints.

<br>

Example 1:\
**Input**: s = "leEeetcode"\
**Output**: "leetcode"\
**Explanation**: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".


Example 2:\
**Input**: s = "abBAcC"\
**Output**: ""\
**Explanation**: We have many possible scenarios, and all lead to the same answer. For example:\
"abBAcC" --> "aAcC" --> "cC" --> ""\
"abBAcC" --> "abBA" --> "aA" --> ""


Example 3:\
**Input**: s = "s"\
**Output**: "s"


<details>

**Solution: Using a Stack**
- Iterate through the string.
- For each character:
- If the stack is not empty and the top of the stack is the same letter but opposite case, remove it.
- Otherwise, push the character onto the stack.
- Convert the stack to a string and return it.

```js
var makeGood = function(s) {
    let stack = [];

    for (let char of s) {
        if (stack.length && stack[stack.length - 1].toLowerCase() === char.toLowerCase() && stack[stack.length - 1] !== char) {
            stack.pop();  // Remove the bad pair
        } else {
            stack.push(char);
        }
    }

    return stack.join('');
};

// Example test cases:
console.log(makeGood("leEeetcode")); // **Output**: "leetcode"
console.log(makeGood("abBAcC")); // **Output**: ""
console.log(makeGood("s")); // **Output**: "s"
```

</details>

<br>

> ### 1380. Lucky Numbers in a Matrix
Given an `m x n matrix` of distinct numbers, `return all lucky numbers` in the matrix in any order.

A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.

Example 1:\
**Input**: matrix = [[3,7,8],[9,11,13],[15,16,17]]\
**Output**: [15]\
**Explanation**: 15 is the only lucky number since it is the minimum in its row and the maximum in its column.

Example 2:\
**Input**: matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]\
**Output**: [12]\
**Explanation**: 12 is the only lucky number since it is the minimum in its row and the maximum in its column.

Example 3:\
**Input**: matrix = [[7,8],[1,2]]\
**Output**: [7]\
**Explanation**: 7 is the only lucky number since it is the minimum in its row and the maximum in its column.

<details>

```js
var luckyNumbers  = function(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let row = matrix[i];
        let minRow = Math.min(...row);
        let index = row.indexOf(minRow);
        if (matrix.every(element => element[index] <= minRow)) {
            return [minRow];
        }
    }
    return [];
};
```

</details>

<br>

> ### 409. Longest Palindrome

Given a string s which consists of lowercase or uppercase letters, return the length of the longest 
palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome.

Example 1:\
**Input**: s = "abccccdd"\
**Output**: 7\
**Explanation**: One longest palindrome that can be built is "dccaccd", whose length is 7.

Example 2:\
**Input**: s = "a"\
**Output**: 1\
**Explanation**: The longest palindrome that can be built is "a", whose length is 1.


<details>

To form the **longest palindrome**, we need to consider the frequency of each character:
- **Even counts** can always be fully used in a palindrome.
- **Odd counts** can contribute their **even part** (e.g., `ccc` → `cc`) to both sides of the palindrome.
- **At most one odd character** can be placed in the center.

```javascript
var longestPalindrome = function(s) {
    let freq = new Map();
    for (let char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }

    let length = 0;
    let hasOdd = false;

    for (let count of freq.values()) {
        if (count % 2 === 0) {
            length += count;
        } else {
            length += count - 1; // Use the even part of the count
            hasOdd = true;       // Mark that an odd character exists
        }
    }

    return hasOdd ? length + 1 : length;
};

// Example test cases:
console.log(longestPalindrome("abccccdd")); // **Output**: 7
console.log(longestPalindrome("a"));        // **Output**: 1
console.log(longestPalindrome("bb"));       // **Output**: 2
```
</details>

<br>

> ### 1365. How Many Numbers Are Smaller Than the Current Number

Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it. That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].

Return the answer in an array.

Example 1:

**Input**: nums = [8,1,2,2,3]\
**Output**: [4,0,1,1,3]\
**Explanation**: \
For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3). \
For nums[1]=1 does not exist any smaller number than it.\
For nums[2]=2 there exist one smaller number than it (1).\ 
For nums[3]=2 there exist one smaller number than it (1). \
For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).

Example 2:

**Input**: nums = [6,5,4,8]\
**Output**: [2,1,0,3]

Example 3:

**Input**: nums = [7,7,7,7]\
**Output**: [0,0,0,0]


<details>

```js
var smallerNumbersThanCurrent = function(nums) {
    let sorted = [...nums].sort((a, b) => a - b);
    let map = new Map();
    
    for (let i = 0; i < sorted.length; i++) {
        if (!map.has(sorted[i])) {
            map.set(sorted[i], i);
        }
    }
    
    return nums.map(num => map.get(num));
};

// Example test cases:
console.log(smallerNumbersThanCurrent([8,1,2,2,3])); // **Output**: [4,0,1,1,3]
console.log(smallerNumbersThanCurrent([6,5,4,8]));   // **Output**: [2,1,0,3]
console.log(smallerNumbersThanCurrent([7,7,7,7]));   // **Output**: [0,0,0,0]
```

</details>

<br>

> ### 1374. Generate a String With Characters That Have Odd Counts

Given an `integer n`, return a string with n characters such that `each character` in such string `occurs an odd number of times`.

The returned string must contain only lowercase English letters. If there are multiples valid strings, return any of them.  

Example 1:

**Input**: n = 4\
**Output**: "pppz"\
**Explanation**: "pppz" is a valid string since the character 'p' occurs three times and the character 'z' occurs once. Note that there are many other valid strings such as "ohhh" and "love".

Example 2:

**Input**: n = 2\
**Output**: "xy"\
**Explanation**: "xy" is a valid string since the characters 'x' and 'y' occur once. Note that there are many other valid strings such as "ag" and "ur".

Example 3:

**Input**: n = 7\
**Output**: "holasss"

<details>

1. If `n` is **odd**, we can simply return `"a".repeat(n)`. Since all characters are `'a'`, it occurs `n` times, which is **odd**.
2. If `n` is **even**, we need at least one character with an odd count. 
   - We can use `"a".repeat(n - 1) + "b"`, ensuring:
     - `'a'` appears `n - 1` times (odd when `n` is even).
     - `'b'` appears **once**, which is also odd.

```javascript
var generateTheString = function(n) {
    return n % 2 === 1 ? "a".repeat(n) : "a".repeat(n - 1) + "b";
};

// Example test cases:
console.log(generateTheString(4)); // **Output**: "aaab" or similar
console.log(generateTheString(2)); // **Output**: "ab" or similar
console.log(generateTheString(7)); // **Output**: "aaaaaaa"
```

</details>

<br>

> ### 168. Excel Sheet Column Title

Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.

For example:

A -> 1\
B -> 2\
C -> 3\
...\
Z -> 26\
AA -> 27\
AB -> 28 \
...
 

Example 1:\
**Input**: columnNumber = 1\
**Output**: "A"

Example 2:\
**Input**: columnNumber = 28\
**Output**: "AB"

<details>

1. Initialize an empty string `result` to store the column title.
2. Use a loop to extract letters:
   - Subtract `1` from `columnNumber`.
   - Find the character using `(columnNumber % 26)`, mapping it to `A-Z` (`String.fromCharCode(65 + remainder)`).
   - Reduce `columnNumber` using `Math.floor(columnNumber / 26)`.
3. Continue until `columnNumber` becomes zero.
4. Reverse the result since characters are extracted from least significant to most significant.


```javascript
// Algorithm: Base-26 Encoding
function convertToTitle(columnNumber) {
    let result = '';

    while (columnNumber > 0) {
        columnNumber--; // Adjust to 0-based index
        let remainder = columnNumber % 26;
        result = String.fromCharCode(65 + remainder) + result; // Convert to letter
        columnNumber = Math.floor(columnNumber / 26); // Move to the next digit
    }

    return result;
}

// Test Cases
console.log(convertToTitle(1));   // **Output**: "A"
console.log(convertToTitle(28));  // **Output**: "AB"
console.log(convertToTitle(701)); // **Output**: "ZY"
console.log(convertToTitle(2147483647)); // Large case
```

</details>

<br>

> ### 171. Excel Sheet Column Number

Given a string columnTitle that represents the column title as appears in an Excel sheet, return its corresponding column number.

For example:

A -> 1\
B -> 2\
C -> 3\
...\
Z -> 26\
AA -> 27\
AB -> 28 \
...
 
Example 1:\
**Input**: columnTitle = "A"\
**Output**: 1

Example 2:\
**Input**: columnTitle = "AB"\
**Output**: 28


<details>

- To convert `"AB"` to `28`, we use:
  - `A = 1 → (1 × 26^1) = 26`
  - `B = 2 → (2 × 26^0) = 2`
  - **Total = 26 + 2 = 28**

```javascript
function titleToNumber(columnTitle) {
    let result = 0;

    for (let i = 0; i < columnTitle.length; i++) {
        let value = columnTitle.charCodeAt(i) - 64; // Convert 'A' -> 1, 'B' -> 2, etc.
        result = result * 26 + value; // Shift left in base-26 and add new value
    }

    return result;
}

console.log(titleToNumber("A"));    // **Output**: 1
console.log(titleToNumber("AB"));   // **Output**: 28
console.log(titleToNumber("ZY"));   // **Output**: 701
console.log(titleToNumber("FXSHRXW")); // Large case
```

</details>

<br>

> ### 1030. Matrix Cells in Distance Order

You are given four integers row, cols, rCenter, and cCenter. There is a rows x cols matrix and you are on the cell with the coordinates (rCenter, cCenter).

Return the coordinates of all cells in the matrix, sorted by their distance from (rCenter, cCenter) from the smallest distance to the largest distance. You may return the answer in any order that satisfies this condition.

The distance between two cells (r1, c1) and (r2, c2) is |r1 - r2| + |c1 - c2|.

Example 1:

**Input**: rows = 1, cols = 2, rCenter = 0, cCenter = 0\
**Output**: [[0,0],[0,1]]\
**Explanation**: The distances from (0, 0) to other cells are: [0,1]

Example 2:

**Input**: rows = 2, cols = 2, rCenter = 0, cCenter = 1\
**Output**: [[0,1],[0,0],[1,1],[1,0]]\
**Explanation**: The distances from (0, 1) to other cells are: [0,1,1,2]\
The answer [[0,1],[1,1],[0,0],[1,0]] would also be accepted as correct.

Example 3:

**Input**: rows = 2, cols = 3, rCenter = 1, cCenter = 2\
**Output**: [[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]\
**Explanation**: The distances from (1, 2) to other cells are: [0,1,1,2,2,3]\
There are other answers that would also be accepted as correct, such as [[1,2],[1,1],[0,2],[1,0],[0,1],[0,0]].

### **Algorithm: Sorting by Manhattan Distance**
The problem requires us to list all matrix cells sorted by their **Manhattan distance** from a given center.

#### **Approach:**
1. **Generate All Cells**: Create an array containing all the cell coordinates in the matrix.
2. **Sort by Manhattan Distance**: Sort the array using the formula  
   \[
   \text{distance} = |r1 - rCenter| + |c1 - cCenter|
   \]
3. **Return the Sorted List**.


### **Implementation in JavaScript**
```js
var allCellsDistOrder = function(rows, cols, rCenter, cCenter) {
    let cells = [];

    // Step 1: Generate all cell coordinates
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            cells.push([r, c]);
        }
    }

    // Step 2: Sort based on Manhattan distance
    cells.sort((a, b) => {
        let distA = Math.abs(a[0] - rCenter) + Math.abs(a[1] - cCenter);
        let distB = Math.abs(b[0] - rCenter) + Math.abs(b[1] - cCenter);
        return distA - distB;
    });

    return cells;
};
```

### **Example Walkthrough**
#### ****Input**:**
```js
rows = 2, cols = 2, rCenter = 0, cCenter = 1
```
#### **Step 1: Generate All Cells**
```js
[
  [0,0], [0,1],
  [1,0], [1,1]
]
```
#### **Step 2: Calculate Manhattan Distances**
| Cell  | Distance Calculation  | Distance |
|--------|----------------------|----------|
| (0,1)  | `|0-0| + |1-1| = 0`  | 0 |
| (0,0)  | `|0-0| + |0-1| = 1`  | 1 |
| (1,1)  | `|1-0| + |1-1| = 1`  | 1 |
| (1,0)  | `|1-0| + |0-1| = 2`  | 2 |

#### **Step 3: Sorted Output**
```js
[[0,1],[0,0],[1,1],[1,0]]
```


> ### 720. Longest Word in Dictionary

Given an array of strings words representing an English Dictionary, return the longest word in words that can be built one character at a time by other words in words.

If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.

Note that the word should be built from left to right with each additional character being added to the end of a previous word. 

Example 1:

**Input**: words = ["w","wo","wor","worl","world"]\
**Output**: "world"\
**Explanation**: The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".

Example 2:

**Input**: words = ["a","banana","app","appl","ap","apply","apple"]\
**Output**: "apple"\
**Explanation**: Both "apply" and "apple" can be built from other words in the dictionary. However, "apple" is lexicographically smaller than "apply".

```js
var longestWord = function(words) {
    if (!words || !words.length)
        return "";
    
    let res = "";
    let set = new Set();
    words.sort();
    set.add("")
    
    for (let word of words) {
        let prev = word.substring(0, word.length - 1);
        
        if (set.has(prev)) {
            if (word.length > res.length)
                res = word;
            set.add(word);
        }
    }
    return res;
};
```

### ****Explanation** of the Code**
The given function `longestWord(words)` finds the longest word that can be built one character at a time by other words in the list. If there are multiple possible answers, it returns the lexicographically smallest one.



### **Step-by-Step Breakdown**
#### **1. Edge Case Handling**
```js
if (!words || !words.length)
    return "";
```
- If `words` is `null`, `undefined`, or an empty array, return an empty string (`""`).
- This prevents runtime errors when processing an empty or invalid input.


#### **2. Initialize Variables**
```js
let res = "";
let set = new Set();
words.sort();
set.add("");
```
- `res`: Stores the longest valid word found so far.
- `set`: A `Set` to keep track of words that can be built.
- `words.sort()`: Sorts the words **lexicographically** to ensure that shorter words come before longer ones.
  - This is crucial because we need to process words in the correct order to ensure each word is built incrementally.
- `set.add("")`: Adds an empty string to `set` to handle the first character of any word.


#### **3. Iterate Over Sorted Words**
```js
for (let word of words) {
    let prev = word.substring(0, word.length - 1);
    
    if (set.has(prev)) {
        if (word.length > res.length)
            res = word;
        set.add(word);
    }
}
```
- Loop through each `word` in `words`.
- Compute `prev` as `word.substring(0, word.length - 1)`.  
  - Example: `"apple"` → `prev = "appl"`
- **Check if `prev` exists in `set`**:
  - If `prev` exists, it means the current `word` can be built one character at a time.
  - If `word.length` is longer than `res.length`, update `res`.
  - Add `word` to `set` to allow longer words to be built from it.


### **Example Walkthrough**
#### **Input**
```js
words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
```
#### **Step 1: Sorting**
The sorted `words` list:
```
["a", "ap", "app", "appl", "apple", "apply", "banana"]
```

#### **Step 2: Iteration**
| Word   | `prev`   | `set.has(prev)` | `res` Update | `set` After |
|--------|---------|----------------|-------------|------------|
| `"a"`  | `""`    | ✅ (exists)    | `"a"`       | `{"", "a"}` |
| `"ap"` | `"a"`   | ✅ (exists)    | `"ap"`      | `{"", "a", "ap"}` |
| `"app"`| `"ap"`  | ✅ (exists)    | `"app"`     | `{"", "a", "ap", "app"}` |
| `"appl"` | `"app"` | ✅ (exists)  | `"appl"`    | `{"", "a", "ap", "app", "appl"}` |
| `"apple"` | `"appl"` | ✅ (exists) | `"apple"`   | `{"", "a", "ap", "app", "appl", "apple"}` |
| `"apply"` | `"appl"` | ✅ (exists) | No change (same length as `"apple"`, but `"apple"` is lexicographically smaller) | `{"", "a", "ap", "app", "appl", "apple", "apply"}` |
| `"banana"` | `"banan"` | ❌ (not in set) | No change | No change |

#### **Final Output**
```js
"apple"
```


### **Time Complexity Analysis**
1. **Sorting the array** → \( O(N \log N) \)
2. **Iterating through words** → \( O(N) \)
3. **Set operations (`has` & `add`)** → \( O(1) \) on average.

**Overall Complexity** → \( O(N \log N) \) due to sorting.


### **Key Takeaways**
- Sorting ensures lexicographical order is maintained.
- Using a `Set` allows checking previous words efficiently.
- This approach guarantees the longest valid word is found in \( O(N \log N) \) time.

Would you like me to further optimize it or explain with another example? 🚀


> ### 925. Long Pressed Name

Your friend is typing his name into a keyboard. Sometimes, when typing a character c, the key might get long pressed, and the character will be typed 1 or more times.

You examine the typed characters of the keyboard. Return True if it is possible that it was your friends name, with some characters (possibly none) being long pressed.

Example 1:

**Input**: name = "alex", typed = "aaleex"\
**Output**: true\
**Explanation**: 'a' and 'e' in 'alex' were long pressed.

Example 2:

**Input**: name = "saeed", typed = "ssaaedd"\
**Output**: false\
**Explanation**: 'e' must have been pressed twice, but it was not in the typed output.


### **Algorithm: Two Pointers Approach**

We can solve this problem using a **two-pointer approach** to compare characters in `name` and `typed` while allowing long-pressed characters.


### **Approach**
1. **Initialize Two Pointers:**
   - `i` for `name` (tracking characters in `name`).
   - `j` for `typed` (tracking characters in `typed`).

2. **Iterate Over `typed`:**
   - If `name[i] === typed[j]`, move both `i` and `j` forward.
   - If `name[i] !== typed[j]` but `typed[j] === typed[j-1]`, it means the character is long-pressed, so move `j` forward.
   - Otherwise, return `false` (mismatch found).

3. **Check If All Characters in `name` Are Processed:**
   - `i` should reach the end of `name`, ensuring all characters in `name` are matched.
   - If `i` doesn’t reach `name.length`, return `false`.


### **Code Implementation**
```javascript
var isLongPressedName = function(name, typed) {
    let i = 0, j = 0;

    while (j < typed.length) {
        if (i < name.length && name[i] === typed[j]) {
            i++; // Move both pointers when characters match
        } else if (j > 0 && typed[j] === typed[j - 1]) {
            // Allow long-pressed character
        } else {
            return false; // Mismatch found
        }
        j++;
    }

    return i === name.length; // Ensure all characters in name are matched
};
```

### **Example Walkthrough**
#### **Example 1**
****Input**:**  
```js
name = "alex", typed = "aaleex"
```
**Processing Steps:**
| `i` (name) | `j` (typed) | `name[i]` | `typed[j]` | Action | Result |
|------------|------------|-----------|------------|--------|--------|
| 0 | 0 | 'a' | 'a' | Match | `i++`, `j++` |
| 1 | 1 | 'l' | 'a' | Long Pressed | `j++` |
| 1 | 2 | 'l' | 'l' | Match | `i++`, `j++` |
| 2 | 3 | 'e' | 'e' | Match | `i++`, `j++` |
| 3 | 4 | 'x' | 'e' | Long Pressed | `j++` |
| 3 | 5 | 'x' | 'x' | Match | `i++`, `j++` |
| 4 | 6 | - | - | End | ✅ Return `true` |

**Output** `true`


#### **Example 2**
****Input**:**  
```js
name = "saeed", typed = "ssaaedd"
```
**Processing Steps:**
| `i` (name) | `j` (typed) | `name[i]` | `typed[j]` | Action | Result |
|------------|------------|-----------|------------|--------|--------|
| 0 | 0 | 's' | 's' | Match | `i++`, `j++` |
| 1 | 1 | 'a' | 's' | Long Pressed | `j++` |
| 1 | 2 | 'a' | 'a' | Match | `i++`, `j++` |
| 2 | 3 | 'e' | 'a' | Mismatch | ❌ Return `false` |

**Output** `false`


### **Time Complexity Analysis**
- We traverse `typed` once → **O(M)**
- We traverse `name` once → **O(N)**
- Overall complexity: **O(M)** (since `typed` is generally longer)


### **Edge Cases**
1. **Characters in `typed` don’t match the order in `name`**  
   ```js
   name = "alex", typed = "aelx" // false
   ```
2. **Extra characters at the end of `typed`**  
   ```js
   name = "alex", typed = "aaleexxx" // true
   ```
3. **Long-pressed characters appearing but not in the required places**  
   ```js
   name = "saeed", typed = "ssaaedd" // false
   ```
4. **All characters in `typed` are long-pressed but valid**  
   ```js
   name = "leelee", typed = "lleeelee" // true
   ```


> ### 482. License Key Formatting

You are given a license key represented as a string s that consists of only alphanumeric characters and dashes. The string is separated into n + 1 groups by n dashes. You are also given an integer k.

We want to reformat the string s such that each group contains exactly k characters, except for the first group, which could be shorter than k but still must contain at least one character. Furthermore, there must be a dash inserted between two groups, and you should convert all lowercase letters to uppercase.

Return the reformatted license key.

Example 1:

**Input**: s = "5F3Z-2e-9-w", k = 4\
**Output**: "5F3Z-2E9W"\
**Explanation**: The string s has been split into two parts, each part has 4 characters.\
Note that the two extra dashes are not needed and can be removed.

Example 2:

**Input**: s = "2-5g-3-J", k = 2\
**Output**: "2-5G-3J"\
**Explanation**: The string s has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.

### **Algorithm: String Processing with Grouping**
We can solve this problem by:
1. **Removing all dashes (`-`)**.
2. **Converting all characters to uppercase**.
3. **Rearranging the string into groups of `k` characters**, ensuring that the first group may have fewer than `k` characters.


### **Approach**
1. **Remove dashes**:  
   - Use `.replace(/-/g, "")` to remove all dashes from `s`.
2. **Convert to uppercase**:  
   - Use `.toUpperCase()`.
3. **Determine grouping**:
   - The first group may be **shorter** than `k` but should not be empty.
   - Subsequent groups should have exactly `k` characters.
4. **Build the result string**:
   - Use a loop to insert dashes (`-`) after every `k` characters.
   - Join the final list into a string.


### **Code Implementation**
```javascript
var licenseKeyFormatting = function(s, k) {
    // Remove dashes and convert to uppercase
    let cleanStr = s.replace(/-/g, "").toUpperCase();
    
    let n = cleanStr.length;
    let firstGroupSize = n % k || k; // Ensure first group is not empty
    let result = [];

    // Add first group
    result.push(cleanStr.slice(0, firstGroupSize));

    // Add remaining groups of size `k`
    for (let i = firstGroupSize; i < n; i += k) {
        result.push(cleanStr.slice(i, i + k));
    }

    return result.join("-");
};
```

### **Example Walkthrough**
#### **Example 1**
```js
s = "5F3Z-2e-9-w", k = 4
```
**Processing Steps:**
1. Remove dashes → `"5F3Z2E9W"`
2. Convert to uppercase → `"5F3Z2E9W"`
3. Length of `cleanStr` = `8`, first group size = `8 % 4 = 0`, so take `4` characters.
4. Split into groups:
   - `"5F3Z"`
   - `"2E9W"`
5. Join with dashes → `"5F3Z-2E9W"`

**Output**  
```js
"5F3Z-2E9W"
```

#### **Example 2**
```js
s = "2-5g-3-J", k = 2
```
**Processing Steps:**
1. Remove dashes → `"25G3J"`
2. Convert to uppercase → `"25G3J"`
3. Length of `cleanStr` = `5`, first group size = `5 % 2 = 1`
4. Split into groups:
   - `"2"`
   - `"5G"`
   - `"3J"`
5. Join with dashes → `"2-5G-3J"`

**Output**  
```js
"2-5G-3J"
```

### **Edge Cases**
✅ **Already formatted input**  
```js
s = "ABCD-EFGH", k = 4
// **Output**: "ABCD-EFGH"
```
✅ **All dashes input**  
```js
s = "---", k = 3
// **Output**: ""
```
✅ **Small `k` value**  
```js
s = "abcdef", k = 1
// **Output**: "A-B-C-D-E-F"
```

<br>

> ### 205. Isomorphic Strings

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

Example 1:\
**Input**: s = "egg", t = "add"\
**Output**: true\
**Explanation**:\
The strings s and t can be made identical by:\
Mapping 'e' to 'a'.\
Mapping 'g' to 'd'.


Example 2:\
**Input**: s = "foo", t = "bar"\
**Output**: false\
**Explanation**:\
The strings s and t can not be made identical as 'o' needs to be mapped to both 'a' and 'r'.

Example 3:\
**Input**: s = "paper", t = "title"\
**Output**: true


<details>

1. Use two hash maps:
   - One to map characters from `s` to `t`.
   - Another to ensure no two characters in `s` map to the same character in `t`.
2. Traverse both strings simultaneously, checking if the mapping is consistent.


```javascript
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;

    let mapST = new Map();
    let mapTS = new Map();

    for (let i = 0; i < s.length; i++) {
        let charS = s[i], charT = t[i];

        if ((mapST.has(charS) && mapST.get(charS) !== charT) || (mapTS.has(charT) && mapTS.get(charT) !== charS)) {
            return false;
        }

        mapST.set(charS, charT);
        mapTS.set(charT, charS);
    }
    
    return true;
};
isIsomorphic("egg","add")
```


```js
s = "egg", t = "add"
- `'e' → 'a'`
- `'g' → 'd'`
```

Since mappings are consistent, output is `true`.

</details>

<br>

> ### 893. Groups of Special-Equivalent Strings

You are given an array of strings of the same length words.

In one move, you can swap any two even indexed characters or any two odd indexed characters of a string words[i].

Two strings words[i] and words[j] are special-equivalent if after any number of moves, words[i] == words[j].

For example, words[i] = "zzxy" and words[j] = "xyzz" are special-equivalent because we may make the moves "zzxy" -> "xzzy" -> "xyzz".
A group of special-equivalent strings from words is a non-empty subset of words such that:

Every pair of strings in the group are special equivalent, and\
The group is the largest size possible (i.e., there is not a string words[i] not in the group such that words[i] is special-equivalent to every string in the group).\
Return the number of groups of special-equivalent strings from words.

 

Example 1:

**Input**: words = ["abcd","cdab","cbad","xyzz","zzxy","zzyx"]\
**Output**: 3\
**Explanation**:\ 
One group is ["abcd", "cdab", "cbad"], since they are all pairwise special equivalent, and none of the other strings is all pairwise special equivalent to these.\
The other two groups are ["xyzz", "zzxy"] and ["zzyx"].\
Note that in particular, "zzxy" is not special equivalent to "zzyx".

Example 2:

**Input**: words = ["abc","acb","bac","bca","cab","cba"]\
**Output**: 3

### **Approach: Normalization & Hashing**
- Since we can swap even-indexed and odd-indexed characters independently, two words are **special-equivalent** if:
  - Their **even-indexed characters**, when sorted, are the same.
  - Their **odd-indexed characters**, when sorted, are the same.
- We represent each word as a tuple: `(sorted(even chars), sorted(odd chars))`
- Use a **set** to track unique groups.


### **Code Implementation (JavaScript)**
```javascript
var numSpecialEquivGroups = function(words) {
    let groups = new Set();

    for (let word of words) {
        let evenChars = [], oddChars = [];

        for (let i = 0; i < word.length; i++) {
            if (i % 2 === 0) evenChars.push(word[i]);
            else oddChars.push(word[i]);
        }

        evenChars.sort();
        oddChars.sort();

        groups.add(evenChars.join('') + '-' + oddChars.join(''));
    }

    return groups.size;
};
```


### **Complexity Analysis**
- **Sorting each word**: \(O(k \log k)\) where \(k\) is the word length.
- **Iterating over all words**: \(O(n)\) where \(n\) is the number of words.
- **Total Complexity**: \(O(nk \log k)\)


### **Example Walkthrough**
#### ****Input**:** 
```js
words = ["abcd","cdab","cbad","xyzz","zzxy","zzyx"]
```
#### **Processing:**
1. `"abcd"` → `("ac", "bd")`
2. `"cdab"` → `("ac", "bd")` → Same as `"abcd"`
3. `"cbad"` → `("ac", "bd")` → Same as `"abcd"`
4. `"xyzz"` → `("xz", "yz")`
5. `"zzxy"` → `("xz", "yz")` → Same as `"xyzz"`
6. `"zzyx"` → `("zx", "zy")` → **New group**

#### **Unique Groups in Set:**
```js
{ "ac-bd", "xz-yz", "zx-zy" }
```

#### **Output** `3`

<br>

> ### 172. Factorial Trailing Zeroes

Given an integer n, return the number of trailing zeroes in n!.

Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.

Example 1:\
**Input**: n = 3\
**Output**: 0\
**Explanation**: 3! = 6, no trailing zero.

Example 2:\
**Input**: n = 5\
**Output**: 1\
**Explanation**: 5! = 120, one trailing zero.

Example 3:\
**Input**: n = 0\
**Output**: 0

<details>

**Approach: Count Factors of 5**
Trailing zeroes in (n!) come from factors of **10**, which is formed by **2 × 5**. Since multiples of **2** are more frequent than **5**, the number of trailing zeroes is determined by the number of times **5** appears as a factor.

**basically koi number ke end me 0 hota h it means ye 5 ka divisble h, uske ander ek 5 h, to 5 ka count kr lo, 0 ka count apne aap mil jayega**

```javascript
var trailingZeroes = function(n) {
    let count = 0;
    
    while (n >= 5) {
        n = Math.floor(n / 5);
        count += n;
    }
    
    return count;
};
```

</details>

<br>

> ### 1309. Decrypt String from Alphabet to Integer Mapping

You are given a string s formed by digits and '#'. We want to map s to English lowercase characters as follows:

Characters ('a' to 'i') are represented by ('1' to '9') respectively.\
Characters ('j' to 'z') are represented by ('10#' to '26#') respectively.\
Return the string formed after mapping.

<br>

Example 1:\
**Input**: s = "10#11#12"\
**Output**: "jkab"\
**Explanation**: "j" -> "10#" , "k" -> "11#" , "a" -> "1" , "b" -> "2".



Example 2:\
**Input**: s = "1326#"\
**Output**: "acz"


<details>

```javascript
var freqAlphabets = function(s) {
    let res = "";
    
    for (let i = 0; i < s.length; i++) {
        if (i + 2 < s.length && s[i + 2] === '#') {
            let num = s.slice(i, i + 2); // Extract two-digit number
            res += String.fromCharCode(96 + parseInt(num)); // Convert to character
            i += 2; // Skip next two characters as they are processed
        } else {
            res += String.fromCharCode(96 + parseInt(s[i])); // Convert single-digit number
        }
    }
    
    return res;
};
freqAlphabets("10#11#12")
```

1. **Iterate using a `for` loop**:
   - If the current character is part of a `10#-26#` mapping:
     - Extract two digits (`s[i]` and `s[i+1]`).
     - Convert them to a character.
     - Skip the next two indices.
   - Otherwise, process a single digit.

2. **Use `String.fromCharCode(96 + num)` to map numbers to letters**:
   - `'a' = 1 + 96 = 97` (ASCII)
   - `'z' = 26 + 96 = 122` (ASCII)


</details>

<br>


> ### 1441. Build an Array With Stack Operations

You are given an integer array target and an integer n.

You have an empty stack with the two following operations:

"Push": pushes an integer to the top of the stack.\
"Pop": removes the integer on the top of the stack.\
You also have a stream of the integers in the range [1, n].

Use the two stack operations to make the numbers in the stack (from the bottom to the top) equal to target. You should follow the following rules:

If the stream of the integers is not empty, pick the next integer from the stream and push it to the top of the stack.\
If the stack is not empty, pop the integer at the top of the stack.\
If, at any moment, the elements in the stack (from the bottom to the top) are equal to target, do not read new integers from the stream and do not do more operations on the stack.\
Return the stack operations needed to build target following the mentioned rules. If there are multiple valid answers, return any of them.

Example 1:

**Input**: target = [1,3], n = 3\
**Output**: ["Push","Push","Pop","Push"]\
**Explanation**: Initially the stack s is empty. The last element is the top of the stack.\
Read 1 from the stream and push it to the stack. s = [1].\
Read 2 from the stream and push it to the stack. s = [1,2].\
Pop the integer on the top of the stack. s = [1].\
Read 3 from the stream and push it to the stack. s = [1,3].

Example 2:

**Input**: target = [1,2,3], n = 3\
**Output**: ["Push","Push","Push"]\
**Explanation**: Initially the stack s is empty. The last element is the top of the stack.\
Read 1 from the stream and push it to the stack. s = [1].\
Read 2 from the stream and push it to the stack. s = [1,2].\
Read 3 from the stream and push it to the stack. s = [1,2,3].

Example 3:

**Input**: target = [1,2], n = 4\
**Output**: ["Push","Push"]\
**Explanation**: Initially the stack s is empty. The last element is the top of the stack.\
Read 1 from the stream and push it to the stack. s = [1].\
Read 2 from the stream and push it to the stack. s = [1,2].\
Since the stack (from the bottom to the top) is equal to target, we stop the stack operations.\
The answers that read integer 3 from the stream are not accepted.


video- https://youtu.be/zMdBVvG0We4?si=1Q86uXZdMCosxqXU

### **Approach: Simulating Stack Operations**  
We iterate through numbers from **1 to `n`** and simulate stack operations to build the `target` array.


### **Optimized JavaScript Solution**
```javascript
var buildArray = function(target, n) {
    let operations = [];
    let index = 0; // Track index in target array
    
    for (let i = 1; i <= n; i++) {
        if (index >= target.length) break; // Stop if target is complete

        operations.push("Push"); // Always push the current number

        if (target[index] === i) {
            index++; // Move to next target number
        } else {
            operations.push("Pop"); // Pop if the number is not in target
        }
    }
    
    return operations;
};
```

### **Explanation**
1. **Iterate from `1` to `n`** (simulating the stream).
2. **Push every number onto the stack**.
3. **If the number is not in `target`**, immediately `"Pop"` it.
4. **Stop early** when all `target` elements are added.


### **Time Complexity**
- **O(n)** → We process each number in the stream **at most twice** (Push & Pop).

This **greedy approach** ensures an **optimal sequence of operations** while keeping it simple! 🚀

<br>

> ### 874. Walking Robot Simulation

A robot on an infinite XY-plane starts at point (0, 0) facing north. The robot receives an array of integers commands, which represents a sequence of moves that it needs to execute. There are only three possible types of instructions the robot can receive:

-2: Turn left 90 degrees.\
-1: Turn right 90 degrees.\
1 <= k <= 9: Move forward k units, one unit at a time.


Some of the grid squares are obstacles. The ith obstacle is at grid point obstacles[i] = (xi, yi). If the robot runs into an obstacle, it will stay in its current location (on the block adjacent to the obstacle) and move onto the next command.

Return the maximum squared Euclidean distance that the robot reaches at any point in its path (i.e. if the distance is 5, return 25).

**Note**:
- There can be an obstacle at (0, 0). If this happens, the robot will ignore the obstacle until it has moved off the origin. However, it will be unable to return to (0, 0) due to the obstacle.\
- North means +Y direction.\
- East means +X direction.\
- South means -Y direction.\
- West means -X direction.
 
<br>

Example 1:\
**Input**: commands = [4,-1,3], obstacles = []\
**Output**: 25

**Explanation**:\
The robot starts at (0, 0):\
Move north 4 units to (0, 4).\
Turn right.\
Move east 3 units to (3, 4).\
The furthest point the robot ever gets from the origin is (3, 4), which squared is 32 + 42 = 25 units away.



Example 2:\
**Input**: commands = [4,-1,4,-2,4], obstacles = [[2,4]]\
**Output**: 65

**Explanation**:\
The robot starts at (0, 0):\
Move north 4 units to (0, 4).\
Turn right.\
Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).\
Turn left.\
Move north 4 units to (1, 8).\
The furthest point the robot ever gets from the origin is (1, 8), which squared is 12 + 82 = 65 units away.


Example 3:\
**Input**: commands = [6,-1,-1,6], obstacles = [[0,0]]\
**Output**: 36

**Explanation**:\
The robot starts at (0, 0):\
Move north 6 units to (0, 6).\
Turn right.\
Turn right.\
Move south 5 units and get blocked by the obstacle at (0,0), robot is at (0, 1).\
The furthest point the robot ever gets from the origin is (0, 6), which squared is 62 = 36 units away.



<details>

```js
var robotSim = function(commands, obstacles) {
  let dir = 0;
  let ans = 0;
  let x = 0;
  let y = 0;
  const stones = new Set();
  for (const [x, y] of obstacles) {
    stones.add(`${x},${y}`)
  }
  for (const cmd of commands) {
    if (cmd === -2) {
      dir = (dir + 3) % 4
      continue
    }
    if (cmd === -1) {
      dir = (dir + 1) % 4
    }
    for (let i = 0; i < cmd; i++) {
      let nextX = x;
      let nextY = y;
      switch (dir) {
        case 2: nextY--; break;
        case 1: nextX++; break;
        case 0: nextY++; break;
        case 3: nextX--; break;
      }
      if (stones.has(`${nextX},${nextY}`)) {
        break;
      }
      x = nextX;
      y = nextY;
      ans = Math.max(ans, x**2+y**2)
    }
  }
  return ans;
};
```

</details>

<br>

> ### 167. Two Sum II - Input Array Is Sorted

Return the indices of the two numbers, index1 and index2, added by one as an integer array `[index1, index2]` of length 2.

Your solution must use only `constant extra space`.

<br>

Example 1:\
**Input**: numbers = [2,7,11,15], target = 9\
**Output**: [1,2]\
**Explanation**: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

Example 2:\
**Input**: numbers = [2,3,4], target = 6\
**Output**: [1,3]\
**Explanation**: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

Example 3:\
**Input**: numbers = [-1,0], target = -1\
**Output**: [1,2]\
**Explanation**: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

<details>

If space was not constrained then we can use two sum

**Approach: Two-Pointer Technique** - Since the array is **already sorted**, we can use a **two-pointer approach**

```javascript
var twoSum = function(numbers, target) {
    let left = 0, right = numbers.length - 1;

    while (left < right) {
        let sum = numbers[left] + numbers[right];

        if (sum === target) return [left + 1, right + 1]; // Convert to 1-based index
        else if (sum < target) left++; // Move left pointer forward to increase sum
        else right--; // Move right pointer backward to decrease sum
    }
};
```

</details>

<br>

> ### 766. Toeplitz Matrix
Given an `m x n matrix`, return `true` if the matrix is `Toeplitz`. Otherwise, return `false`.\
A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.

<br>

Example 1:

```
[1  2  3  4]
[5  1  2  3]
[9  5  1  2]
```

**Input**: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]\
**Output**: true\
**Explanation**:\
In the above grid, the diagonals are:
- "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".\
- In each diagonal all elements are the same, so the answer is True.


<br>

Example 2:

```
[1  2]
[2  2]
```

**Input**: matrix = [[1,2],[2,2]]\
**Output**: false\
**Explanation**:\
The diagonal "[1, 2]" has different elements.


<details>

A **Toeplitz Matrix** has the property that every diagonal from **top-left to bottom-right** contains the same values.  
This means that for every element at position `(i, j)`, it must be equal to the element at `(i+1, j+1)` (if they exist).


```javascript
var isToeplitzMatrix = function(matrix) {
    let rows = matrix.length, cols = matrix[0].length;
    
    for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < cols - 1; j++) {
            if (matrix[i][j] !== matrix[i + 1][j + 1]) return false;
        }
    }
    
    return true;
};
isToeplitzMatrix([[1,2,3,4],[5,1,2,3],[9,5,1,2]])
```

</details>

<br>


> ### 908. Smallest Range I

You are given an integer array `nums` and an integer `k`.

In one operation, you can choose any index `i where 0 <= i < nums.length` and change `nums[i] to nums[i] + x` where `x` is an integer from the range `[-k, k]`. You can apply this operation **at most once** for each index `i`.

The `score of nums` is the difference between the maximum and minimum elements in `nums`.

Return the `minimum score of nums` after applying the mentioned operation at most once for each index in it.

<br>

Example 1:

**Input**: nums = [1], k = 0\
**Output**: 0\
**Explanation**: The score is max(nums) - min(nums) = 1 - 1 = 0.

Example 2:

**Input**: nums = [0,10], k = 2\
**Output**: 6\
**Explanation**: Change nums to be [2, 8]. The score is max(nums) - min(nums) = 8 - 2 = 6.

Example 3:

**Input**: nums = [1,3,6], k = 3\
**Output**: 0\
**Explanation**: Change nums to be [4, 4, 4]. The score is max(nums) - min(nums) = 4 - 4 = 0.

<br>

<details>

To minimize the score, we should **reduce the difference** between the maximum and minimum values in `nums`.  
Each number in `nums` can be increased or decreased by at most `k`, so:

- The **maximum possible value** is `max(nums) - k`
- The **minimum possible value** is `min(nums) + k`
- The new score will be: new score = max(0, (max(nums) - k) - (min(nums) + k))


```javascript
var smallestRangeI = function(nums, k) {
    let minNum = Math.min(...nums);
    let maxNum = Math.max(...nums);
    return Math.max(0, (maxNum - k) - (minNum + k));
};
```
</details>

<br>

> ### 645. Set Mismatch

You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

You are given an integer array nums representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return them in the form of an array.

 

Example 1:

**Input**: nums = [1,2,2,4]\
**Output**: [2,3]

Example 2:

**Input**: nums = [1,1]\
**Output**: [1,2]

Example 3:

**Input**: nums = [2,2]
**Output**: [2,1]


<details>

```javascript
var findErrorNums = function(nums) {
    let numSet = new Set();
    let duplicate, missing;
    
    for (let num of nums) {
        if (numSet.has(num)) duplicate = num;
        numSet.add(num);
    }

    for (let i = 1; i <= nums.length; i++) {
        if (!numSet.has(i)) {
            missing = i;
            break;
        }
    }

    return [duplicate, missing];
};
```
</details>

<br>

> ### 1021. Remove Outermost Parentheses

For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

Return s after removing the outermost parentheses of every primitive string in the primitive decomposition of s.

Example 1:

**Input**: s = "(()())(())"\
**Output**: "()()()"\
**Explanation**: \
The input string is "(()())(())", with primitive decomposition "(()())" + "(())".\
After removing outer parentheses of each part, this is "()()" + "()" = "()()()".

Example 2:

**Input**: s = "(()())(())(()(()))"\
**Output**: "()()()()(())"\
**Explanation**: \
The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".\
After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".

Example 3:

**Input**: s = "()()"\
**Output**: ""\
**Explanation**:\ 
The input string is "()()", with primitive decomposition "()" + "()".\
After removing outer parentheses of each part, this is "" + "" = "".

<details>

1. Use a **counter (`depth`)** to track the nesting level of parentheses.
2. Iterate through the string `s`:
   - If encountering `'('`, increase `depth`. **Only append if `depth > 1`** (i.e., it's not the outermost).
   - If encountering `')'`, **only append if `depth > 1`**, then decrease `depth`.
3. Return the modified string.


```javascript
var removeOuterParentheses = function(s) {
    let result = "";
    let depth = 0;

    for (let char of s) {
        if (char === ')') depth--; // Decrease depth before appending
        if (depth > 0) result += char; // Only add when inside primitive
        if (char === '(') depth++; // Increase depth after appending
    }

    return result;
};
```

### **Step-by-step execution:**
| Index | Char | Depth Before | Action | Depth After | Result |
|--------|------|-------------|--------|------------|--------|
| 0      | `(`  | 0           | Increase depth, **do not add** | 1 | "" |
| 1      | `(`  | 1           | **Add `(`**, then increase depth | 2 | `"("` |
| 2      | `)`  | 2           | **Add `)`**, then decrease depth | 1 | `"()"` |
| 3      | `(`  | 1           | **Add `(`**, then increase depth | 2 | `"()("` |
| 4      | `)`  | 2           | **Add `)`**, then decrease depth | 1 | `"()()"` |
| 5      | `)`  | 1           | Decrease depth, **do not add** | 0 | `"()()"` |
| 6      | `(`  | 0           | Increase depth, **do not add** | 1 | `"()()"` |
| 7      | `(`  | 1           | **Add `(`**, then increase depth | 2 | `"()()("` |
| 8      | `)`  | 2           | **Add `)`**, then decrease depth | 1 | `"()()()"` |
| 9      | `)`  | 1           | Decrease depth, **do not add** | 0 | `"()()()"` |

</details>

<br>

> ### 997. Find the Town Judge

In a town, there are `n` people labeled from `1 to n`. There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:

1. The town judge trusts nobody.
2. Everybody (except for the town judge) trusts the town judge.
3. There is exactly one person that satisfies properties `1` and `2`.

You are given an array `trust` where `trust[i] = [ai, bi]` representing that the person labeled `ai` trusts the person labeled `bi`. If a trust relationship does not exist in `trust` array, then such a trust relationship does not exist.

Return the label of the town judge if the town judge exists and can be identified, or return `-1` otherwise.

Example 1:

**Input**: n = 2, trust = [[1,2]]\
**Output**: 2

Example 2:

**Input**: n = 3, trust = [[1,3],[2,3]]\
**Output**: 3

Example 3:

**Input**: n = 3, trust = [[1,3],[2,3],[3,1]]\
**Output**: -1

<details>

- Use **two arrays**:
  - `trustCount[i]`: Number of people **trusting** person `i`.
  - `trustedBy[i]`: Number of people **trusted by** person `i`.
- Iterate through `trust`:
  - Increase `trustCount[a]` (person `a` trusts someone).
  - Increase `trustedBy[b]` (person `b` is trusted).
- The judge is the person `j` where:
  - `trustCount[j] == 0` (does not trust anyone).
  - `trustedBy[j] == n - 1` (trusted by everyone else).


```javascript
var findJudge = function(n, trust) {
    if (n === 1 && trust.length === 0) return 1; // Edge case: Single person is the judge

    let trustCount = new Array(n + 1).fill(0);
    
    for (let [a, b] of trust) {
        trustCount[a]--; // a trusts someone → disqualify
        trustCount[b]++; // b is trusted → increase count
    }
    
    for (let i = 1; i <= n; i++) {
        if (trustCount[i] === n - 1) return i; // Judge found
    }
    
    return -1; // No judge found
};
```
</details>  

<br>

> ### 598. Range Addition II

You are given an `m x n` matrix `M` initialized with all `0's` and an array of operations `ops`, where `ops[i] = [ai, bi]` means `M[x][y]` should be incremented by one for all `0 <= x < ai` and `0 <= y < bi`.

Count and return the number of maximum integers in the matrix after performing all the operations.

Example 1:

```
| 0 | 0 | 0 |
| 0 | 0 | 0 |
| 0 | 0 | 0 |

➡

| 1 | 1 | 0 |
| 1 | 1 | 0 |
| 0 | 0 | 0 |

➡

| 2 | 2 | 1 |
| 2 | 2 | 1 |
| 1 | 1 | 1 |

```

**Input**: m = 3, n = 3, ops = [[2,2],[3,3]]\
**Output**: 4\
**Explanation**: The maximum integer in M is 2, and there are four of it in M. So return 4.


Example 2:

**Input**: m = 3, n = 3, ops = [[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3]]\
**Output**: 4

<details>

#### **Steps**
1. The area that gets incremented the most is the **smallest intersection** of all operations.
2. Find the **minimum ai** (`minRow`) and **minimum bi** (`minCol`) from `ops`.
3. The result is simply `minRow * minCol`, since that submatrix contains the maximum values.


```javascript
var maxCount = function(m, n, ops) {
    if (ops.length === 0) return m * n; // If no operations, all elements remain 0

    let minRow = m, minCol = n;
    
    for (let [a, b] of ops) {
        minRow = Math.min(minRow, a);
        minCol = Math.min(minCol, b);
    }
    
    return minRow * minCol;
};
```

</details>

<br>

> ### 27. Remove Element

Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Example 1:

**Input**: nums = [3,2,2,3], val = 3\
**Output**: 2, nums = [2,2,_,_]\
**Explanation**: Your function should return k = 2, with the first two elements of nums being 2.\
It does not matter what you leave beyond the returned k (hence they are underscores).


Example 2:

**Input**: nums = [0,1,2,2,3,0,4,2], val = 2\
**Output**: 5, nums = [0,1,4,0,3,_,_,_]\
**Explanation**: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.\
Note that the five elements can be returned in any order.\
It does not matter what you leave beyond the returned k (hence they are underscores).


<details>

**Algorithm: Two-Pointer Approach**
1. Use a **slow pointer (`k`)** to track where to place the next valid element (not equal to `val`).
2. Iterate through `nums` with a **fast pointer (`i`)**:
   - If `nums[i]` **is not** `val`, store it at `nums[k]` and increment `k`.
   - Otherwise, skip it.
3. After the loop, `k` represents the **number of valid elements** in `nums`, and the first `k` elements contain the correct values.


```javascript
var removeElement = function(nums, val) {
    let k = 0; // Slow pointer

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i]; // Move valid element
            k++;
        }
    }
    
    return k; // Number of valid elements
};
removeElement([0,1,2,2,3,0,4,2],2)
```

**Step-by-step Execution:**
| i  | nums[i] | Action                 | nums (modified)     | k  |
|----|--------|------------------------|--------------------|----|
| 0  | 0      | Store at `nums[0]`      | [0,1,2,2,3,0,4,2] | 1  |
| 1  | 1      | Store at `nums[1]`      | [0,1,2,2,3,0,4,2] | 2  |
| 2  | 2      | Skip                    | [0,1,2,2,3,0,4,2] | 2  |
| 3  | 2      | Skip                    | [0,1,2,2,3,0,4,2] | 2  |
| 4  | 3      | Store at `nums[2]`      | [0,1,3,2,3,0,4,2] | 3  |
| 5  | 0      | Store at `nums[3]`      | [0,1,3,0,3,0,4,2] | 4  |
| 6  | 4      | Store at `nums[4]`      | [0,1,3,0,4,0,4,2] | 5  |
| 7  | 2      | Skip                    | [0,1,3,0,4,0,4,2] | 5  |

**Final **Output**:**
```plaintext
k = 5
Modified nums = [0,1,3,0,4,_,_,_]
```

</details>

<br>

> ### 566. Reshape the Matrix

In MATLAB, there is a handy function called reshape which can reshape an m x n matrix into a new one with a different size r x c keeping its original data.

You are given an m x n matrix mat and two integers r and c representing the number of rows and the number of columns of the wanted reshaped matrix.

The reshaped matrix should be filled with all the elements of the original matrix in the same row-traversing order as they were.

If the reshape operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.

<br> 

Example 1:\
**Input**: mat = [[1,2],[3,4]], r = 1, c = 4\
**Output**: [[1,2,3,4]]


Example 2:\
**Input**: mat = [[1,2],[3,4]], r = 2, c = 4\
**Output**: [[1,2],[3,4]]

<details>

- **Step 1**: Check if reshaping is possible:  
  - If `m * n !== r * c`, return `mat` as reshaping is not possible.
- **Step 2**: Flatten the original matrix into a 1D array.
- **Step 3**: Construct the new matrix row by row using the 1D array.

```javascript
var matrixReshape = function(mat, r, c) {
    let m = mat.length, n = mat[0].length;

    // Check if reshape is possible
    if (m * n !== r * c) return mat;

    // Flatten the matrix
    let flat = mat.flat();
    
    // Build the new reshaped matrix
    let result = [];
    for (let i = 0; i < r; i++) {
        result.push(flat.slice(i * c, (i + 1) * c));
    }

    return result;
};
```

</details>

<br>

> ### 1260. Shift 2D Grid

Given a 2D grid of size m x n and an integer k. You need to shift the grid k times.

In one shift operation:

Element at grid[i][j] moves to grid[i][j + 1].\
Element at grid[i][n - 1] moves to grid[i + 1][0].\
Element at grid[m - 1][n - 1] moves to grid[0][0].\
Return the 2D grid after applying shift operation k times.

 

Example 1:\
**Input**: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1\
**Output**: [[9,1,2],[3,4,5],[6,7,8]]

Example 2:\
**Input**: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4\
**Output**: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]

Example 3:\
**Input**: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9\
**Output**: [[1,2,3],[4,5,6],[7,8,9]]

<details>

1. **Flatten the grid into a 1D array**: Since the grid is row-wise stored, convert it into a 1D array.
2. **Optimize `k`**: Since shifting `k` times is equivalent to shifting `k % (m * n)` times, update `k = k % (m * n)`.
3. **Rotate the 1D array**: Move the last `k` elements to the front.
4. **Rebuild the 2D grid**: Convert the rotated 1D array back into a 2D grid.

```javascript
var shiftGrid = function(grid, k) {
    let m = grid.length, n = grid[0].length;
    let total = m * n;
    
    // Optimize k
    k = k % total;
    if (k === 0) return grid;

    // Flatten the grid
    let flat = grid.flat();

    // Rotate the array
    let rotated = flat.slice(-k).concat(flat.slice(0, total - k));

    // Rebuild the grid
    let result = [];
    for (let i = 0; i < m; i++) {
        result.push(rotated.slice(i * n, (i + 1) * n));
    }

    return result;
};
```

**Example 1**
```js
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
```
1. **Flattened**: `[1,2,3,4,5,6,7,8,9]`
2. **Rotate 1 step**: `[9,1,2,3,4,5,6,7,8]`
3. **Reshape**:
   ```
   [[9,1,2],
    [3,4,5],
    [6,7,8]]
   ```
✅ **Output**: `[[9,1,2],[3,4,5],[6,7,8]]`

**Example 2**
```js
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9
```
1. **Flattened**: `[1,2,3,4,5,6,7,8,9]`
2. **Optimize `k = 9 % 9 = 0`**, so no change.
3. **Reshape**:
   ```
   [[1,2,3],
    [4,5,6],
    [7,8,9]]
   ```
✅ **Output**: `[[1,2,3],[4,5,6],[7,8,9]]`

</details>

<br>

> ### 67. Add Binary

Given two binary strings a and b, return their sum as a binary string.

Example 1:
**Input**: a = "11", b = "1"\
**Output**: "100"

Example 2:
**Input**: a = "1010", b = "1011"\
**Output**: "10101"


<br>

**Algorithm: Bit-by-Bit Addition (Simulating Binary Addition)**

We perform binary addition similar to how we add numbers manually:
1. **Start from the rightmost bit (LSB)**.
2. **Add corresponding bits** from both strings along with any carry from the previous addition.
3. **Calculate the new bit** and **update the carry**.
4. **Continue moving left** until all bits are processed.
5. **If there's a leftover carry, append it** to the result.
6. **Return the final sum in reversed order**.


```javascript
var addBinary = function(a, b) {
    let i = a.length - 1, j = b.length - 1;
    let carry = 0, result = "";

    while (i >= 0 || j >= 0 || carry) {
        let sum = carry;
        if (i >= 0) sum += a[i--] - '0'; // Convert char to number
        if (j >= 0) sum += b[j--] - '0';

        result = (sum % 2) + result; // Append binary bit
        carry = Math.floor(sum / 2); // Update carry
    }
    
    return result;
};
addBinary("1010","1011")
```

### **Example Walkthrough**
#### **Example 1**
```js
**Input**: a = "11", b = "1"
```
**Steps:**
1. `1 + 1 = 10` → bit: `0`, carry: `1`
2. `1 + 0 + 1 = 10` → bit: `0`, carry: `1`
3. `carry 1` → bit: `1`
✅ **Output** `"100"`

---

#### **Example 2**
```js
**Input**: a = "1010", b = "1011"
```
**Steps:**
1. `0 + 1 = 1` → bit: `1`, carry: `0`
2. `1 + 1 = 10` → bit: `0`, carry: `1`
3. `0 + 0 + 1 = 1` → bit: `1`, carry: `0`
4. `1 + 1 = 10` → bit: `0`, carry: `1`
5. `carry 1` → bit: `1`
✅ **Output** `"10101"`

---

### **Complexity Analysis**
- **Time Complexity:** \( O(\max(n, m)) \) → We iterate through the longer of the two strings.
- **Space Complexity:** \( O(\max(n, m)) \) → The result string stores the sum.

This method efficiently performs binary addition without converting to decimal, ensuring precision and speed! 🚀


<br>

> ### 696. Count Binary Substrings

Given a binary string s, return the number of non-empty substrings that have the same number of 0's and 1's, and all the 0's and all the 1's in these substrings are grouped consecutively.

Substrings that occur multiple times are counted the number of times they occur.

Example 1:

**Input**: s = "00110011"\
**Output**: 6\
**Explanation**: There are 6 substrings that have equal number of consecutive 1's and 0's: "0011", "01", "1100", "10", "0011", and "01".\
Notice that some of these substrings repeat and are counted the number of times they occur.\
Also, "00110011" is not a valid substring because all the 0's (and 1's) are not grouped together.

Example 2:

**Input**: s = "10101"\
**Output**: 4\
**Explanation**: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1's and 0's.


1. **Group Consecutive Characters:**  
   - Traverse the string `s` and count consecutive `0`s and `1`s.
   - Store these counts in an array.

2. **Count Valid Substrings:**  
   - A valid substring occurs between two adjacent groups of `0`s and `1`s.
   - The number of valid substrings contributed by two adjacent groups is `min(prev, curr)`, where:
     - `prev` = previous group's length.
     - `curr` = current group's length.
   - Sum up these values to get the final result.



```javascript
var countBinarySubstrings = function(s) {
    let count = 0;
    let prev = 0, curr = 1;  // Track consecutive group counts

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            curr++;  // Increment count if same character
        } else {
            count += Math.min(prev, curr);  // Add min of previous and current group
            prev = curr;  // Update previous group count
            curr = 1;  // Reset current count
        }
    }
    
    count += Math.min(prev, curr); // Handle last transition
    return count;
};
```

**Example 1**

```js
Input: s = "00110011"
```
**Step-by-step processing:**
- Groups: `[2,2,2,2]` (two `0`s, two `1`s, two `0`s, two `1`s)
- Contributions:  
  - `min(2,2) = 2`
  - `min(2,2) = 2`
  - `min(2,2) = 2`
- ✅ **Output** `6`

**Example 2**
```js
Input: s = "10101"
```
**Step-by-step processing:**
- Groups: `[1,1,1,1,1]`
- Contributions:  
  - `min(1,1) = 1`
  - `min(1,1) = 1`
  - `min(1,1) = 1`
  - `min(1,1) = 1`
- ✅ **Output**: `4`

<br>

> ### 944. Delete Columns to Make Sorted

You are given an array of n strings strs, all of the same length.

The strings can be arranged such that there is one on each line, making a grid.

- For example, `strs = ["abc", "bce", "cae"]` can be arranged as follows:
abc\
bce\
cae

You want to `delete` the columns that are `not sorted lexicographically`. In the above example (`0-indexed`), columns 0 ('a', 'b', 'c') and 2 ('c', 'e', 'e') are sorted, while column 1 ('b', 'c', 'a') is not, so you would delete column 1.

Return the number of columns that you will delete.

<br>

Example 1:

**Input**: strs = ["cba","daf","ghi"]
**Output**: 1
**Explanation**: The grid looks as follows:
  cba\
  daf\
  ghi\
Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 1 column.


Example 2:

**Input**: strs = ["a","b"]
**Output**: 0
**Explanation**: The grid looks as follows:
  a\
  b\
Column 0 is the only column and is sorted, so you will not delete any columns.


Example 3:

**Input**: strs = ["zyx","wvu","tsr"]
**Output**: 3
**Explanation**: The grid looks as follows:
  zyx\
  wvu\
  tsr\
All 3 columns are not sorted, so you will delete all 3.


```js
var minDeletionSize = function(strs) {
    let deleteCount = 0;
    let rows = strs.length, cols = strs[0].length;

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows - 1; i++) {
            if (strs[i][j] > strs[i + 1][j]) {
                deleteCount++;
                break;
            }
        }
    }

    return deleteCount;
};
```

<br>

> ### 118. Pascal's Triangle

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

```
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```

Example 1:

**Input**: numRows = 5\
**Output**: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Example 2:

**Input**: numRows = 1\
**Output**: [[1]]


<details>

**Algorithm: Dynamic Construction**
1. Initialize a result array `res` with the first row as `[1]`.
2. For each new row:
   - Start with `1`.
   - Compute the middle values as the sum of two adjacent numbers from the previous row.
   - End with `1`.
3. Repeat until `numRows` is reached.


```javascript
var generate = function(numRows) {
    let res = [[1]];

    for (let i = 1; i < numRows; i++) {
        let prev = res[i - 1];
        let row = [1];

        for (let j = 1; j < prev.length; j++) {
            row.push(prev[j - 1] + prev[j]);
        }
        
        row.push(1);
        res.push(row);
    }

    return res;
};
```

</details>

<br>

> ### 119. Pascal's Triangle II

Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


Example 1:\
**Input**: rowIndex = 3\
**Output**: [1,3,3,1]

Example 2:\
**Input**: rowIndex = 0\
**Output**: [1]

Example 3:\
**Input**: rowIndex = 1\
**Output**: [1,1]


**Algorithm: Iterative Approach (O(n²) Time, O(n) Space)**
1. Start with `row = [1]`.
2. Iterate `rowIndex` times:
   - Compute the new row using the previous row.
   - Each value (except the first and last) is the sum of two adjacent values from the previous row.
3. Return the final computed row.


```javascript
var getRow = function(rowIndex) {
    let row = [1];

    for (let i = 1; i <= rowIndex; i++) {
        let newRow = [1];
        for (let j = 1; j < row.length; j++) {
            newRow.push(row[j - 1] + row[j]);
        }
        newRow.push(1);
        row = newRow;
    }

    return row;
};
```

**Another Method**

Instead of creating a new array for each row, update the same array from the back.

```javascript
var getRow = function(rowIndex) {
    let row = Array(rowIndex + 1).fill(1);

    for (let i = 1; i < rowIndex; i++) {
        for (let j = i; j > 0; j--) {
            row[j] += row[j - 1];
        }
    }

    return row;
};
```

<br>

> ### 1496. Path Crossing

Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.

Return true if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. Return false otherwise.

 

Example 1:\
**Input**: path = "NES"\
**Output**: false\
**Explanation**: Notice that the path doesn't cross any point more than once.

Example 2:\
**Input**: path = "NESWW"\
**Output**: true\
**Explanation**: Notice that the path visits the origin twice.


<details>

```javascript
var isPathCrossing = function(path) {
    let x = 0, y = 0;
    let visited = new Set();
    visited.add("0,0");

    for (let dir of path) {
        if (dir === 'N') y++;
        else if (dir === 'S') y--;
        else if (dir === 'E') x++;
        else if (dir === 'W') x--;

        let pos = `${x},${y}`;
        if (visited.has(pos)) return true;
        visited.add(pos);
    }

    return false;
};
```

</details>

<br>

> ### 1217. Minimum Cost to Move Chips to The Same Position

We have `n` chips, where the position of the `ith` chip is `position[i]`.

We need to move all the chips to `the same position`. In one step, we can change the position of the ith chip from position[i] to:

- `position[i] + 2` or `position[i] - 2` with `cost = 0`.
- `position[i] + 1` or `position[i] - 1` with `cost = 1`.

Return the minimum cost needed to move all the chips to the same position.

Example 1:\
**Input**: position = [1,2,3]\
**Output**: 1\
**Explanation**: First step: Move the chip at position 3 to position 1 with cost = 0.\
Second step: Move the chip at position 2 to position 1 with cost = 1.\
Total cost is 1.


Example 2:\
**Input**: position = [2,2,2,3,3]\
**Output**: 2\
**Explanation**: We can move the two chips at position  3 to position 2. Each move has cost = 1. The total cost = 2.

Example 3:\
**Input**: position = [1,1000000000]\
**Output**: 1
 
<details>

**Algorithm: Counting Odd and Even Positions**
1. Chips at **even positions** can be moved to any other even position at **zero cost**.
2. Chips at **odd positions** can be moved to any other odd position at **zero cost**.
3. Moving a chip from **even to odd or vice versa costs 1 per chip**.
4. The optimal strategy:
   - Count the number of chips at **odd** positions.
   - Count the number of chips at **even** positions.
   - The minimum of these two counts is the answer.


```javascript
var minCostToMoveChips = function(position) {
    let odd = 0, even = 0;

    for (let pos of position) {
        if (pos % 2 === 0) even++;
        else odd++;
    }

    return Math.min(odd, even);
};
```
</details>

<br>

> ### 1422. Maximum Score After Splitting a String

Given a string **s** of **zeros and ones**, return the maximum score after splitting the string into two non-empty substrings. The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.

Example 1:

**Input**: s = "011101"\
**Output**: 5 \
**Explanation**:\ 
All possible ways of splitting s into two non-empty substrings are:\
left = "0" and right = "11101", score = 1 + 4 = 5\
left = "01" and right = "1101", score = 1 + 3 = 4\
left = "011" and right = "101", score = 1 + 2 = 3\
left = "0111" and right = "01", score = 1 + 1 = 2\
left = "01110" and right = "1", score = 2 + 1 = 3

Example 2:

**Input**: s = "00111"\
**Output**: 5\
**Explanation**: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5

Example 3:

**Input**: s = "1111"\
**Output**: 3

**Algorithm: Prefix Count and Iteration**

1. **Count Total Ones:** First, count the total number of `1`s in the string.
2. **Iterate Over Possible Splits:**
   - Maintain `leftZeros` (count of `0`s in the left substring).
   - Maintain `rightOnes` (remaining `1`s in the right substring).
   - Update the maximum score for each split.
3. **Ensure Non-Empty Substrings:** The split is only considered between `0` and `n-1`.


```javascript
var maxScore = function(s) {
    let totalOnes = 0, leftZeros = 0, maxScore = 0;

    // Count total number of 1s in the string
    for (let ch of s) {
        if (ch === '1') totalOnes++;
    }

    let rightOnes = totalOnes;

    // Iterate through the string, but stop at n-1 to keep non-empty right substring
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === '0') leftZeros++;
        else rightOnes--;

        maxScore = Math.max(maxScore, leftZeros + rightOnes);
    }

    return maxScore;
};
```

<br>

> ### 657. Robot Return to Origin

There is a robot starting at the position (0, 0), the origin, on a 2D plane. Given a sequence of its moves, judge if this robot ends up at (0, 0) after it completes its moves.

You are given a string moves are 'R' (right), 'L' (left), 'U' (up), and 'D' (down).

Return true if the robot returns to the origin after it finishes all of its moves, or false otherwise.

Example 1:\
**Input**: moves = "UD"\
**Output**: true\
**Explanation**: The robot moves up once, and then down once. All moves have the same magnitude, so it ended up at the origin where it started. Therefore, we return true.

Example 2:\
**Input**: moves = "LL"\
**Output**: false\
**Explanation**: The robot moves left twice. It ends up two "moves" to the left of the origin. We return false because it is not at the origin at the end of its moves.
 
<details>

```javascript
var judgeCircle = function(moves) {
    let x = 0, y = 0;

    for (let move of moves) {
        if (move === 'U') y++;
        else if (move === 'D') y--;
        else if (move === 'L') x--;
        else if (move === 'R') x++;
    }

    return x === 0 && y === 0;
};
```

**Alternative Approach (Using Hash Map)**
```javascript
var judgeCircle = function(moves) {
    let count = { 'U': 0, 'D': 0, 'L': 0, 'R': 0 };

    for (let move of moves) {
        count[move]++;
    }

    return count['U'] === count['D'] && count['L'] === count['R'];
};
```
</details>

<br>

