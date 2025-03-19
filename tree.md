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

### **Explanation**:
- **computeLPSArray**: Prepares the LPS array to optimize the search by storing the length of the previous longest prefix that is also a suffix.
- **KMPSearch**: This function uses the LPS array to perform the actual search, skipping unnecessary comparisons based on the LPS values.

### Example **Output**:
```
Pattern found at index: [10]
```

This code will find all the positions of the pattern in the given text efficiently.

<br>


> ### Stock span problem ( [Youtube video](https://www.youtube.com/watch?v=vOqNBU7ipIk) )
- The task is to find the span of stock’s price for all days. 
- The span of a stock’s price on a given day is defined as the `maximum number of consecutive days` just before the given day, where the `price of the stock` on those days is `less than or equal` to the price on the given day.

For example, if the stock prices for 7 days are as follows:
```
Prices: [100, 80, 60, 70, 60, 75, 85]
```

The corresponding span values are:
```
Span:   [1, 1, 1, 2, 1, 4, 6]
```

**Explanation**:
- On day 1 (price = 100), the span is 1 because there are no previous prices.
- On day 2 (price = 80), the span is 1 because 80 is smaller than 100.
- On day 3 (price = 60), the span is 1 because 60 is smaller than 80.
- On day 4 (price = 70), the span is 2 because 70 is greater than 60, and the span of 60 is 1 (so 2 days total).
- On day 5 (price = 60), the span is 1 because 60 is equal to itself but less than 70.
- On day 6 (price = 75), the span is 4 because 75 is greater than 60, 70, and 60.
- On day 7 (price = 85), the span is 6 because 85 is greater than all the previous prices.

<details>

**Approach using Stack:**
The idea is to use a stack to store the indices of the days where the stock prices are strictly decreasing or equal, so that we can quickly calculate the span for the current day.

1. **Push the current day’s index** onto the stack if its price is higher than the previous day’s price (stored at the top of the stack).
2. **Pop indices** from the stack as long as the price at the current day is greater than or equal to the price at the index stored at the top of the stack.
3. The span is then the difference between the current day’s index and the index of the previous higher price (or the start of the array if no previous higher price exists).


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
console.log(result);  // **Output**: [1, 1, 1, 2, 1, 4, 6]
```
</details>

<br>


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

### **Explanation**:
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
console.log(result);  // **Output**: [-1, 10, 4, -1, -1, 40, 40]
```

### **Explanation** of the Code:

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

### **Explanation**:
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
console.log(result);  // **Output**: [5, 25, 25, -1, 8, -1, -1, -1]
```

### **Explanation** of the Code:

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

### **Explanation**:
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
console.log(result);  // **Output**: 10
```

### **Explanation** of the Code:

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

console.log(maximalRectangle(matrix));  // **Output**: 6
```

### **Explanation** of the Code:

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
console.log(minStack.getMin()); // **Output**: 2
minStack.pop();
console.log(minStack.getMin()); // **Output**: 3
minStack.pop();
console.log(minStack.top());    // **Output**: 3
console.log(minStack.getMin()); // **Output**: 3
```

### **Explanation**:

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
console.log(infixToPostfix(infixExp)); // **Output**: "ABC*DEF^/G*-H*+"
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
console.log(evaluatePostfix(postfixExp)); // **Output**: -4
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
console.log(infixToPrefix(infixExp2)); // **Output**: "+A*+*BC-*^/DEFGH"
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
console.log(evaluatePrefix(prefixExp)); // **Output**: -4
```

### Summary:
- **Infix** is the standard human-readable form of an expression but requires parentheses and precedence rules.
- **Prefix** (operators first) and **Postfix** (operators last) can be more easily evaluated by a computer using stacks, without needing precedence rules or parentheses.
- Conversion between these notations can be done efficiently using stacks, and both **evaluation** and **conversion** have simple stack-based algorithms.


> ## Queue

Always choose the head as front and tail as rear, becuase if you reverse time complexity changes


```js
// Below code is for Queue in Linked List form

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
console.log(linkedQueue.printQueue());  // **Output**: 10 20 30
console.log(linkedQueue.dequeue());     // **Output**: 10
console.log(linkedQueue.frontElement()); // **Output**: 20
console.log(linkedQueue.isEmpty());     // **Output**: false
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
console.log(stack.top());    // **Output**: 30
console.log(stack.pop());    // **Output**: 30
console.log(stack.top());    // **Output**: 20
console.log(stack.isEmpty()); // **Output**: false
```

#### Time Complexity:
- **Push**: O(n) (because we move all elements twice, once to `queue2` and back to `queue1`).
- **Pop**: O(1) (as we simply dequeue from `queue1`).
- **Top**: O(1).
- **isEmpty**: O(1).



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
console.log(stack2.top());    // **Output**: 30
console.log(stack2.pop());    // **Output**: 30
console.log(stack2.top());    // **Output**: 20
console.log(stack2.isEmpty()); // **Output**: false
```

#### Time Complexity:
- **Push**: O(1) (just enqueue).
- **Pop**: O(n) (because we move all elements except the last one to `queue2`).
- **Top**: O(n) (similar to `pop`, but without removing the element).
- **isEmpty**: O(1).



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

console.log("Original Queue: " + queue.printQueue());  // **Output**: 1 2 3 4

reverseQueue(queue);

console.log("Reversed Queue: " + queue.printQueue());  // **Output**: 4 3 2 1
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

console.log("Original Queue: " + queue2.printQueue());  // **Output**: 1 2 3 4

reverseQueueRecursively(queue2);

console.log("Reversed Queue: " + queue2.printQueue());  // **Output**: 4 3 2 1
```

#### Time Complexity:
- **Dequeue/Enqueue**: O(1) for each element.
- The recursion goes as deep as the number of elements in the queue, so the total time complexity is **O(n)**, where `n` is the number of elements in the queue.



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

### **Output**:
For the example above, the output will be:

```
Generated Numbers: ['5', '6', '55', '56', '65', '66']
```

### **Explanation**:
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

![screenshot](images/dequeArray.png)

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

deque.printDeque(); // **Output**: -1 0 1 2
console.log("Front element:", deque.getFront()); // **Output**: -1
console.log("Rear element:", deque.getRear()); // **Output**: 2

deque.removeFront();
deque.removeRear();

deque.printDeque(); // **Output**: 0 1
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

deque.printDeque(); // **Output**: -1 0 1 2
console.log("Front element:", deque.getFront()); // **Output**: -1
console.log("Rear element:", deque.getRear()); // **Output**: 2

deque.removeFront();
deque.removeRear();

deque.printDeque(); // **Output**: 0 1
```

### Time Complexity:
- All operations (`addFront`, `addRear`, `removeFront`, `removeRear`, `getFront`, `getRear`) take **O(1)** time.

### Conclusion:
- **Array-Based Deque** uses a circular array to achieve **O(1)** time operations.
- **Linked List-Based Deque** uses a doubly linked list where operations on both ends are performed in constant time.
Both implementations can handle deque operations efficiently depending on the use case and memory constraints.
