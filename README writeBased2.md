Refer full code in - https://github.com/jayesh2906/JavaScript-with-JC/blob/master/DSA.js

> ### Q1 - Reverse an array

```js
const data = [1,2,3,4,5,6]

function reverserArray(arr){
    let reverseArray = []
    for(let i=arr.length; i>0; i--){
        reverseArray.push(i)
    }
    console.log(reverseArray);
}
reverserArray(data);
```

> ### Q2 - Maximum and minimum of an array using minimum number of comparisons

Input: arr = [3, 5, 4, 1, 9]
Output: Minimum element is: 1
        Maximum element is: 9

```js
const numbers = [3, 5, 4, 1, 9];

function maxAndMinCalculate(arr){
    
    let max, min;
    
    if (arr[0] > arr[1]) {
        max = arr[0]
        min = arr[1]
    } else {
        max = arr[1]
        min = arr[0]
    }

    for(let i=2; i<arr.length; i++){
        if (max < arr[i]) {
            max = arr[i]
        } 
        if (min > arr[i]) {
            min = arr[i];
        }
    }

    console.log("max : ",max, "min : ",min);
}

maxAndMinCalculate(numbers)
```

other method are also there

```js
// using Math.min and Math.max
console.log(Math.min(...numbers)); // 1
console.log(Math.max(...numbers)); // 9

// using Math and apply
console.log(Math.min.apply(null, numbers)); // 1
console.log(Math.max.apply(null, numbers)); // 9
```

> ### Q3 - Find the "Kth" max and min element of an array
arr[] = 7 10 4 3 20 15
K = 3;
Output: kth Min - 7, kth Max - 10

```js

const numbers = [7, 10, 4, 3, 20, 15];

function minMax(array, k) {
    let min, max;
    const sortedArray = array.slice().sort((a, b) => a - b);
    min = sortedArray[k - 1];
    max = sortedArray[array.length - k];

    return { min, max };
}

const { min, max } = minMax(numbers, 3);
console.log(min); // 7
console.log(max); // 10

```

> ### Q4 - Given an array of size N containing only 0s, 1s, and 2s; sort the array in ascending order without sort.
arr = [0, 2, 1, 2, 0]
Output: [0, 0, 1, 2, 2]

```js
function sortArray(arr) {
    let count = [0, 0, 0]; // Count of 0s, 1s, and 2s
    let sortedArr = [];

    // Count occurrences of each element
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    // Reconstruct the sorted array based on counts
    for (let i = 0; i < count[0]; i++) {
        sortedArr.push(0);
    }
    for (let i = 0; i < count[1]; i++) {
        sortedArr.push(1);
    }
    for (let i = 0; i < count[2]; i++) {
        sortedArr.push(2);
    }

    return sortedArr;
}

let arr = [0, 2, 1, 2, 0];
console.log("Original array:", arr);
console.log("Sorted array:", sortArray(arr));
```

> ### Q6 - Find the Union of two sorted arrays.
arr1 = [1, 2, 3, 4, 5]
arr2 = [1, 2, 3, 8, 9]
output = [ 1, 2, 3, 4, 5, 8, 9 ]

```js
const x = [1, 2, 3, 5, 6];
const y = [1, 3, 4, 7];

let obj = {};
for (let i = x.length - 1; i >= 0; --i){
    obj[x[i]] = x[i];
}

for (let i = y.length - 1; i >= 0; --i){
    obj[y[i]] = y[i];
}

const n = Object.keys(obj)
console.log(n);
```

Using the set

```js
console.log([...new Set([...arr1, ...arr2])]); // [ 1, 2, 3, 4, 5, 8, 9 ]
```

using concat

```js
const unionR = arr1.concat(
    arr2.filter((num) => {
        return !arr1.includes(num);
    })
);
console.log("unionR", unionR); // [ 1, 2, 3, 4, 5, 8, 9 ]
```

> ### Q6A - Find the Intersection of two sorted arrays.
arr1 = [1, 2, 3, 4, 5]
arr2 = [1, 2, 3, 8, 9]
output = [ 1, 2, 3]

using filter
```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3, 8, 9];

const intersection = arr1.filter((num) => arr2.includes(num));
console.log("intersection", intersection);
```

for loop
```js
function findIntersection(arr1, arr2) {
  const intersection = [];
  for (let i = 0; i < arr1.length; i++) {
    const element = arr1[i];
    if (arr2.indexOf(element) !== -1 && intersection.indexOf(element) === -1) {
      intersection.push(element);
    }
  }
  return intersection;
}
```

using while loop sorted array
```js
  let i = 0;
  let j = 0;
  let result = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      i++;
    } else if (arr1[i] > arr2[j]) {
      j++;
    } else {
      result.push(arr1[i]);
      i++;
      j++;
    }
  }
```

> ### Q6B - unique from two arrays

const arr3 = [1, 2, 3, 4];
const arr4 = [1, 2, 5, 6];
output : [ 3, 4, 5, 6 ]

using filter

```js
const uniqueArr3 = arr3.filter((num) => !arr4.includes(num));
const uniqueArr4 = arr4.filter((num) => !arr3.includes(num));
console.log([...uniqueArr3, ...uniqueArr4]); // [ 3, 4, 5, 6 ]
```

while loop
```js
 function uniqueNums() {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 5, 6];
    // output : [ 3, 4, 5, 6 ]
    let i = 0;
    let j = 0;
    let result = [];
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] === arr2[j]) {
        i++;
        j++;
      } else if (arr1[i] < arr2[j]) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
    console.log(result);
  }
  uniqueNums();
```

Other method

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 2, 5, 6];

const concatenatedArr = arr1.concat(arr2);
const countMap = {};

// Count occurrences of each element
for (let i = 0; i < concatenatedArr.length; i++) {
    const num = concatenatedArr[i];
    countMap[num] = (countMap[num] || 0) + 1;
}

// Filter out elements that appear only once
const uniqueElements = [];
for (const num in countMap) {
    if (countMap.hasOwnProperty(num) && countMap[num] === 1) {
        uniqueElements.push(parseInt(num));
    }
}

console.log(uniqueElements); // Output: [ 3, 4, 5, 6 ]
```

> ### Q8 - find duplicate in an array

arr1 = [1, 2, 2, 2, 3, 4, 4, 5]
output = [ 2, 4 ]

using object and for loop

```js
const arr2 = [3, 4, 5, 1, 2, 4, 3, 5];
const obj2 = {};
const result1 = [];

for (let num of arr2) {
    if (obj2[num]) {
      if (!result1.includes(num)) result1.push(num);
    } else {
      obj2[num] = (obj2[num] || 0) + 1;
    }
}

console.log("result1", result1);
```

using sorting and one loop

```js
const arr = [3, 4, 5, 1, 2, 4, 3, 5];
const sorted = [...arr.sort()];
const output = [];

for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i] === sorted[i + 1]) {
      if (!output.includes(sorted[i])) {
        output.push(sorted[i]);
      }
    }
}

console.log("output", output);
```

> ### Q10 - Merge Intervals
Input: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
Output: [ [1, 6], [8, 10], [15, 18]]
https://www.youtube.com/watch?v=LvygwImtvEw


```js

const intervals = [[1, 3],[2, 6],[8, 10],[15, 18]];

intervals.sort((a, b) => a[0] - b[0]);

const result = [intervals[0]]; // [[1,3]]

for (let interval of intervals.slice(1)) {
    e1 = result[result.length - 1][1]; // 3
    s2 = interval[0]; // 2
    e2 = interval[1]; // 6

    if (e1 >= s2) {
      // 3 >= 2
      result[result.length - 1][1] = Math.max(e1, e2); // [[1,6]]
    } else {
      result.push(interval);
    }
}

console.log("result", result);

```


> ### Q12 Best Time to Buy and Sell Stock:-
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

```js
const prices = [7, 1, 5, 3, 6, 4];

  let maxProfit = 0;
  let lowestPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    lowestPrice = Math.min(prices[i], lowestPrice);
    maxProfit = Math.max(prices[i] - lowestPrice, maxProfit);
  }

  console.log("maxProfit", maxProfit);
```


> ### Q13 find all pairs on integer array whose sum is equal to given number
arr[] = {1, 5, 7, 1}
Output: 2
Explanation: 
arr[0] + arr[1] = 1 + 5 = 6 
and arr[1] + arr[3] = 5 + 1 = 6.


```js
const arr = [1, 5, 7, 1];
  let sum = 6;
  let count = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) {
        count++;
        console.log(`[${arr[i]},${arr[j]}]`);
      }
    }
  }
  console.log("No. of Pairs", count);
```


> ### Q14 - find common elements In 3 sorted arrays
n1 = 6; A = {1, 5, 10, 20, 40, 80}
n2 = 5; B = {6, 7, 20, 80, 100}
n3 = 8; C = {3, 4, 15, 20, 30, 70, 80, 120}
Output: 20 80
Explanation: 20 and 80 are the only
common elements in A, B and C.

```js

 const arr1 = [1, 5, 10, 20, 40, 80];
  const arr2 = [6, 7, 20, 80, 100];
  const arr3 = [3, 4, 15, 20, 30, 70, 80, 120];
  let result = [];
  let i = 0,
    j = 0,
    k = 0;

  while (i < arr1.length && j < arr2.length && k < arr3.length) {
    if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
      result.push(arr1[i]);
      i++;
      j++;
      k++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else if (arr2[j] < arr3[k]) {
      j++;
    } else {
      k++;
    }
  }
  console.log("result", result); // [ 20, 80 ]

```
> ### Q15 - Rearrange array in alternating positive & negative items
Input:  arr[] = {1, 2, 3, -4, -1, 4}
Output: arr[] = {-4, 1, -1, 2, 3, 4}

key concept - Main concept is that first do the sorting and it becomes the -ve at first and +ve at the end, so we add the first -ve frist and +ve from the end using the loop.

```js
function rearrangeArray(arr) {
    // Sort the array
    arr.sort((a, b) => a - b);

    // Create a new array to store rearranged elements
    let rearrangedArr = [];

    // Initialize indices for positive and negative numbers
    let posIndex = 0;
    let negIndex = arr.length - 1;

    // Rearrange the elements
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            rearrangedArr.push(arr[negIndex]);
            negIndex--;
        } else {
            rearrangedArr.push(arr[posIndex]);
            posIndex++;
        }
    }

    return rearrangedArr;
}

// Example usage:
let arr = [1, 2, 3, -4, -1, 4];
console.log(rearrangeArray(arr)); // Output: [-4, 1, -1, 2, 3, 4]
```

> ### Q16 - Find if there is any subarray with sum equal to 0

Input:  arr[] = 4 2 -3 1 6
Output: 2, -3, 1 is the subarray with sum 0.

```js

function findSubarrayWithZeroSum(arr) {
    let sum = 0;
    let map = {};
    let result = [];

    // Traverse the array
    for (let i = 0; i < arr.length; i++) {
        // Add the current element to the sum
        sum += arr[i];

        // If the sum is zero or if it has been seen before
        if (sum === 0 || map[sum] !== undefined) {
            // If the sum is zero, extract the subarray from the beginning to the current index
            if (sum === 0) {
                result.push(arr.slice(0, i + 1));
            } else {
                // Otherwise, extract the subarray from the index after the previous occurrence of the sum to the current index
                result.push(arr.slice(map[sum] + 1, i + 1));
            }
        } else {
            // Store the current sum along with its index
            map[sum] = i;
        }
    }

    return result;
}

// Example usage:
const arr = [4, 2, -3, 1, 6];
const subarrays = findSubarrayWithZeroSum(arr);
console.log(subarrays); // Output: [[2, -3, 1]]
```

> ### Q17 - Find factorial of a large number

```js
function factorial(num) {
    if (num < 0) {
      console.log("Please provide positive number");
      return;
    }
    if (num === 0 || num === 1) {
      return 1;
    } else {
      return num * factorial(num - 1);
    }
}
console.log(factorial(5));

```

> ### Q18 - find maximum product subarray

Arr[] = [ 6, -3, -10, 0, 2 ]
Output: 180

```js

function maxProductSubarray(arr) {
    if (arr.length === 0) return 0;

    let maxEndingHere = arr[0];
    let minEndingHere = arr[0];
    let maxSoFar = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let tempMax = Math.max(arr[i], maxEndingHere * arr[i], minEndingHere * arr[i]);
        minEndingHere = Math.min(arr[i], maxEndingHere * arr[i], minEndingHere * arr[i]);

        maxEndingHere = tempMax;

        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

const arr = [6, -3, -10, 0, 2];
console.log(maxProductSubarray(arr)); // Output: 180
```

below is double loop

```js
const arr = [6, -3, -10, 0, 2];

  function maxProduct(arr) {
    let outMaxProd = arr[0];
    for (let i = 0; i < arr.length - 1; i++) {
      let innerProd = 1;
      for (let j = i; j < arr.length; j++) {
        innerProd *= arr[j];

        if (innerProd > outMaxProd) {
          outMaxProd = innerProd;
        }
      }
    }
    return outMaxProd;
  }

  console.log(maxProduct(arr));

```

> ### Q19 - Find longest coinsecutive subsequence
a[] = {2,6,1,9,4,5,3}
Output:
6 => [1,2,3,4,5,6]

```js
function longestConsecutiveSubsequence(arr) {
    if (arr.length === 0) {
        return [];
    }
    
    arr.sort((a, b) => a - b);
    let longestSeq = [arr[0]];
    let currentSeq = [arr[0]];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === currentSeq[currentSeq.length - 1] + 1) {
            currentSeq.push(arr[i]);
        } else if (arr[i] !== currentSeq[currentSeq.length - 1]) {
            currentSeq = [arr[i]];
        }
        
        if (currentSeq.length > longestSeq.length) {
            longestSeq = currentSeq;
        }
    }
    
    return longestSeq;
}

const arr = [2, 6, 1, 9, 4, 5, 3];
console.log(longestConsecutiveSubsequence(arr)); // Output: [1, 2, 3, 4, 5, 6]
```

> ### Q20 - Given Array of size n, find all elements that appear more than k times
Input: arr[] = {3, 1, 2, 2, 1, 2, 3, 3}, k = 2
Output: {2, 3}

```js
const arr = [3, 1, 2, 2, 1, 2, 3, 3];
  const k = 2;
  const map = new Map();
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }

  for (let [key, value] of map) {
    if (value > k) {
      result.push(key);
    }
  }

  console.log("result", result);
```

> ### Q21 - Find whether an array is a subset of another array
Input:
a1[] = {11, 1, 13, 21, 3, 7}
a2[] = {11, 3, 7, 1}
Output: Yes

```js
function isSubset(array1, array2) {
    // Convert arrays to sets to make element lookup more efficient
    let set1 = new Set(array1);
    let set2 = new Set(array2);

    // Check if every element in array2 exists in array1
    for (let elem of set2) {
        if (!set1.has(elem)) {
            return false; // If any element doesn't exist, return false
        }
    }

    return true; // All elements found, return true
}

// Example usage:
let a1 = [11, 1, 13, 21, 3, 7];
let a2 = [11, 3, 7, 1];

if (isSubset(a1, a2)) {
    console.log("Yes"); // Output: Yes
} else {
    console.log("No");
}
```

> ### Q23 - Pair elements of an array

const arr = [ 1, 2, 3, 2, 4, 5, 3, 2 ]
output :- [ [ 1 ], [ 2, 2, 2 ], [ 3, 3 ], [ 4 ], [ 5 ] ]


```js

 const arr = [1, 2, 3, 2, 4, 5, 3, 2];

  function pairElements(arr) {
    let map = new Map();
    const result = [];

    for (let num of arr) {
      map.set(num, (map.get(num) || 0) + 1);
    }

    for (let [key, value] of map) {
      let temp = [];
      for (let j = 0; j < value; j++) {
        temp.push(+key);
      }
      result.push(temp);
    }

    return result;
  }

  console.log(pairElements(arr));
```

--- String ---

> ### Q24 - Reverse a string

 1) using Decrementing for loop

```js
  const str1 = "hello";
  let reverse = "";
  for (i = str1.length - 1; i >= 0; i--) {
    reverse += str1[i];
  }

  console.log(reverse);
```

2) using simple for loop

```js
  const str3 = "hello";
  let output = "";

  for (let char of str3) {
    output = char + output;
  }
  console.log(output);
```

> ### Q25 - Check whether a String is Palindrome or not

1) using for loop
```js
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

2) using Built-In Functions
```js
const str1 = "abcba";
const rev = str1;
console.log(rev.split("").reverse().join("") === str1);
```

> ### Q26 - Find Duplicate characters in a string

```js
  const str = "babbar";
  let map = new Map();

  for (let i = 0; i < str.length; i++) {
    if (map.has(str[i])) {
      map.set(str[i], map.get(str[i]) + 1);
    } else {
      map.set(str[i], 1);
    }
  }

  for (let [key, value] of map) {
    if (value < 2) {
      map.delete(key);
    }
  }

  console.log(map);
```

> ### Q27 - 27) Write a Code to check whether one string is a rotation of another
Input: S1 = ABCD, S2 = CDAB
Output: Strings are rotations of each other

Input: S1 = ABCD, S2 = ACBD
Output: Strings are not rotations of each other

```js
const str1 = "ABCD";
  const str2 = "CDAB";

  function checkRotation(str1, str2) {
    const str3 = str1 + str1;

    if (str3.includes(str2)) {
      return true;
    } else {
      return false;
    }
  }

  console.log(checkRotation(str1, str2));
```

> ### Q28 - Write a Program to check whether a string is a valid shuffle of two strings or not

```js
function isShuffle(str, str1, str2) {
    if (str1.length + str2.length !== str.length) {
        return false;
    }

    let i = 0, j = 0, k = 0;
    while (k < str.length) {
        if (i < str1.length && str[k] === str1[i]) {
            i++;
        } else if (j < str2.length && str[k] === str2[j]) {
            j++;
        } else {
            return false;
        }
        k++;
    }
    return true;
}

// Example usage:
const string = "abcde";
const string1 = "ab";
const string2 = "cde";
console.log(isShuffle(string, string1, string2)); // Output: true

const invalidString = "bacde";
console.log(isShuffle(invalidString, string1, string2)); // Output: false
```

> ### Q29 - Balanced Parenthesis problem.
the function should return 'true' for exp = “[()]{}{[()()]()}” and 'false' for exp = “[(])”.

```js
function isBalanced(str) {
    const stack = [];
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    for (let char of str) {
        if (pairs[char]) {
            stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (pairs[stack.pop()] !== char) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

// Example usage:
console.log(isBalanced("[(())]{}{[()()]()}")); // Output: true
console.log(isBalanced("[(])"));  // Output: false
```


