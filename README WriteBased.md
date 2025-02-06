Refer full code in - https://github.com/jayesh2906/JavaScript-with-JC/blob/master/DSA.js

<br>

> ### To generate random no
```js
const x = Math.floor(Math.random() * 12 ) // Number between 0 to 11
const y = Math.floor(Math.random() * 13); //  Number between 0 to 12
const y = Math.floor(Math.random() * 12 + 1) // Number between 1 to 12
const z = Math.floor((Math.random() * 13) + 3) // Number between 3 to 15 not 3 to 12, below is reason
const z = Math.floor((Math.random() * 10) + 3); // Number between 3 to 12, jitna right me increase utna left me decrease
```

so

```js
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(1, 6)
console.log(rndInt)
```

<details>

Let's break down both expressions to understand why they produce different ranges of numbers:

1. `const y = Math.floor(Math.random() * 12 + 1)`

   Here, `Math.random()` generates a random floating-point number between 0 (inclusive) and 1 (exclusive). When you multiply it by 12, you get a number between 0 and 11.9999... Then when you add 1, the range becomes 1 to 12.9999..., and finally, `Math.floor()` rounds down to the nearest integer, so the result is between 1 and 12 (inclusive).

2. `const z = Math.floor((Math.random() * 13) + 3)`

   In this case, `Math.random()` generates a random floating-point number between 0 (inclusive) and 1 (exclusive). When you multiply it by 13, you get a number between 0 and 12.9999.... Then, when you add 3, the range becomes 3 to 15.9999.... Finally, `Math.floor()` rounds down to the nearest integer, so the result is between 3 and 15 (inclusive).

To make `z` produce numbers between 3 and 12 (inclusive), you should adjust the range accordingly. Here's how you can do it:

```javascript
const z = Math.floor((Math.random() * 10) + 3);
```

With this modification, `z` will give you a random integer between 3 and 12 (inclusive).

</details>

<br>

> ### ⭐️ Q1 - Swap 2 no without temp

<Details>

```js
// solution 1
let a = 5;
let b = 10;

a = a + b; // a now becomes 15
b = a - b; // b becomes 5 (original value of a)
a = a - b; // a becomes 10 (original value of b)

console.log(a); // 10
console.log(b); // 5

// solution 2
[a,b] = [b,a]

```
</Details>

<br>


> ### Q2 - Shuffle algorithm

<Details>

```js
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // 1 is added because at 0 index, i=0 and which cause random no to be 0, also it make it lies below max index as you can see in above random no explanation
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const arr = [1, 2, 3, 4];
shuffle(arr);
console.log(arr);
```
</Details>

<br>

> ### Q3 - Reverse an array

<Details>

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

```js
// ES6 version
function reverseArray (arr) {
   return arr.map((item, index) => arr[arr.length-1-index]);
}
```
</Details>

<br>

> ### Q4 - Sort of array

<Details>

```js
const array = [7, 10, 4, 3, 20, 15];

function sortArray(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        
        [arr[i], arr[j] ]= [arr[j], arr[i]];
       
      }
    }
  }
  console.log(arr);
}

sortArray(array)
```
</Details>
<br>

> ### Q5 - Remove duplicate from array.
<Details>

```js
const array = [1, 2, 3, 3, 4, 5, 5];

function removeDuplicates(array) {
    const uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
        if (!uniqueArray.includes(array[i])) {
            uniqueArray.push(array[i]);
        }
    }
    console.log(uniqueArray)
}

removeDuplicates(array); // Output: [1, 2, 3, 4, 5]
```

```js
const array = [1, 2, 3, 3, 4, 5, 5];
const uniqueArray = array.filter((value, index) => array.indexOf(value) === index);
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
```

**if array is sorted**

```js
function removeDuplicates(array) {
    // Sort the array
    array.sort((a, b) => a - b);
    
    const uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
        // Skip adding if the current element is the same as the previous one
        if (array[i] !== array[i - 1]) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}

const array = [1, 2, 3, 3, 4, 5, 5];
const uniqueArray = removeDuplicates(array);
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
```
</Details>
<br>

> ### Q6 - Maximum and minimum of an array using minimum number of comparisons

Input: arr = [3, 5, 4, 1, 9]
Output: Minimum element is: 1\
        Maximum element is: 9

<Details>

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
</Details>

<br>

> ### Q7 - Find the "Kth" max and min element of an array
arr[] = 7 10 4 3 20 15\
K = 3;\
Output: kth Min - 7, kth Max - 10

<Details>

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
</Details>

<br>

> ### Q8 - Given an array of size N containing only 0s, 1s, and 2s; sort the array in ascending order without sort.
arr = [0, 2, 1, 2, 0]
Output: [0, 0, 1, 2, 2]

<Details>

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
</Details>

<br>

> ### ⭐️ Q9 - Find the Union of two sorted arrays. 

arr1 = [1, 2, 3, 4, 5]\
arr2 = [1, 2, 3, 8, 9]\
output = [ 1, 2, 3, 4, 5, 8, 9 ]

<Details>

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
</Details>

<br>

> ### Q11 - unique from two arrays

const arr3 = [1, 2, 3, 4];
const arr4 = [1, 2, 5, 6];
output : [ 3, 4, 5, 6 ]

<details>

using filter

```js
const uniqueArr3 = arr3.filter((num) => !arr4.includes(num));
const uniqueArr4 = arr4.filter((num) => !arr3.includes(num));
console.log([...uniqueArr3, ...uniqueArr4]); // [ 3, 4, 5, 6 ]
```

using object

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
</details>

<br>

> ### Q14 - find common elements In 3 sorted arrays
n1 = 6; A = [1, 5, 10, 20, 40, 80]\
n2 = 5; B = [6, 7, 20, 80, 100]\
n3 = 8; C = [3, 4, 15, 20, 30, 70, 80, 120]\
Output: 20 80

**Explanation:** 20 and 80 are the only\
common elements in A, B and C.


<details>

```js
let a = [1, 5, 10, 20, 40, 80],
b = [6, 7, 20, 80, 100],
c = [3, 4, 15, 20, 30, 70, 80, 120],
common = []

for(i=0; i<a.length; i++){
    if(b.includes(a[i]) && c.includes(a[i])){
        common.push(a[i])
    }
}

console.log(common)
```

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

</details>

<br>

> ### Q15 - Given Array of size n, find all elements that appear more than k times
Input: arr = [3, 1, 2, 2, 1, 2, 3, 3], k = 2\
Output: [2, 3]


<details>

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

</details>

<br>


> ### Q16 - Find whether an array is a subset of another array
Input:\
a1 = [11, 1, 13, 21, 3, 7]\
a2 = [11, 3, 7, 1]\
Output: Yes

<details>

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

</details>

<br>


> ### ⭐️ Q17 - Find factorial of a large number 

<details>

```js
function factorial (num) {
  let result = 1;
  for (var i = 0; i < num; i++) {
    result = result * (num - i);
  }
  return result;
}

// console.log(factorial(5));

function factorialRecursively (n) {
  if (n < 2) {
    return 1;
  } else {
    return n * factorial (n - 1);
  }
}

```
</details>

<br>


 > ### Q18 - Find square-root of a number without using native JS function

<details>

```js
var squrt = function (num) {
  var sroot = 1;
  while (sroot < num) {
    if ( sroot * sroot == num) {
      return sroot;
    } else {
      sroot++
    }
  }
};
console.log(squrt(25));
```

</details>

<br>

> ### Q19 - Rearrange array in alternating positive & negative items
Input:  arr = [1, 2, 3, -4, -1, 4]\
Output: arr = [-4, 1, -1, 2, 3, 4]

<details>

```js
function rearrange(arr) {
  const positive = [];
  const negative = [];

  for (const num of arr) {
    if (num > 0) {
      positive.push(num);
    } else if (num < 0) {
      negative.push(num);
    }
  }

  const result = [];
  let i = 0;
  let j = 0;

  while (i < positive.length && j < negative.length) {
    result.push(negative[j]);
    result.push(positive[i]);
    i++;
    j++;
  }

  // Add any remaining elements
  result.push(...positive.slice(i));
  result.push(...negative.slice(j));

  return result;
}
// -4, 1, -1, 2, 3, 4

// Example usage
const arr = [1, 2, 3, -4, -1, 4];
const rearranged = rearrange(arr);
console.log(rearranged); // Output: [-4, 1, -1, 2, 3, 4]
```

</details>

<br>

> ### ⭐️ Q20 - Find if there is any subarray with sum equal to 0  

Input:  arr = [4, 2, -3, 1, 6]\
Output: [2, -3, 1] is the subarray with sum 0.

<details>

```js
// Algo : Prefix Sum with Hashing

function findZeroSumSubarray(arr) {

  // Stores prefix sum and its index
  const seen = {};

  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    // Check if the current sum or a previous sum exists in the object
    if (sum in seen) {
        return arr.slice(seen[sum] + 1, i + 1); // If prefixSum was seen before, subarray sum must be zero
    } else if (sum === 0) {
        return arr.slice(0, i + 1); // If prefixSum is 0, return the subarray from start to current index
    }

    seen[sum] = i;  // Store the current prefixSum with index
    console.log(seen);
  }
  

  return null; // No subarray with sum 0 found
}

console.log(findZeroSumSubarray([4, 2, -3, 1, 6]));

// { '4': 0 }
// { '4': 0, '6': 1 }
// { '3': 2, '4': 0, '6': 1 }

```

</details>

<br>

> ### ⭐️ Q21 - Leetcode - 152. find maximum product subarray  

arr = [ 6, -3, -10, 0, 2 ]\
Output: 180


<details>

Algo - DP

```js
function maxProduct(nums) {
  let max = -Infinity;
  let prefix = 1;  // prefix calculates the product from the left side.
  let suffix = 1;  // suffix calculates the product from the right side.
  const n = nums.length;

  for(let i=0; i<nums.length; i++){

    // If prefix or suffix becomes 0, reset it to 1 because multiplying by 0 ruins the product.
    if(prefix == 0) prefix = 1;
    if(suffix == 0) suffix = 1;

    // Update prefix and suffix
    prefix = prefix * nums[i];
    suffix = suffix * nums[n-1-i];
    max = Math.max(max, prefix, suffix)
  }
  return max;
}


```

```js

// 628. Leetcode - Given an array of integers, find the largest product yielded from three of the integers

/* Algo -

Sort the given array in ascending order and you have to take the maximum of these cases to get the answer..

Product of last 3 numbers in sorted array
Product of first two and last number in the sorted array

*/

maxProductOfThreeeElem = (arr) => {

  let sortedArr = arr.sort((a, b) => a - b);

  // Greatest product is either (min1 * min2 * max1 || max1 * max2 * max3)

  let product1 = 1, product2 = 1, len = arr.length - 1;

  product1 = sortedArr[0] * sortedArr[1] * sortedArr[len];

  for (let i = len; i > len - 3; i-- ) {
    product2 *= sortedArr[i];
  }

  return Math.max(product1, product2)
}

console.log(maxProductOfThreeeElem([1,2,3,4]));     // => 12
console.log(maxProductOfThreeeElem([-4,2,3,1]));    // => 12
console.log(maxProductOfThreeeElem([-4,-2,-3,1]));  // => 12

```

</details>

<br>


> ### ⭐️ Q22 - Find longest consecutive subsequence 
a = [2,6,1,9,4,5,3]\
Output:\
6 => [1,2,3,4,5,6]

a = [100,4,200,1,3,2]\
Output:\
6 => [1,2,3,4]

<details>

Algo : **Hashing**

```js
function findLongestConsecutiveSubsequence(arr) {
    let numSet = new Set(arr);
    let longestSequence = [];

    for (let num of arr) {
        if (!numSet.has(num - 1)) { // Start of a new sequence
            let currentNum = num;
            let currentSequence = [];

            while (numSet.has(currentNum)) {
                currentSequence.push(currentNum);
                currentNum++;
            }

            if (currentSequence.length > longestSequence.length) {
                longestSequence = currentSequence;
            }
        }
    }

    return longestSequence;
}

// Example usage
let a = [2, 6, 1, 9, 4, 5, 3];
console.log(findLongestConsecutiveSubsequence(a));
```

</details>

<br>

> ### ⭐️ Q23 - Pair elements of an array  

const arr = [ 1, 2, 3, 2, 4, 5, 3, 2 ]\
output :- [ [ 1 ], [ 2, 2, 2 ], [ 3, 3 ], [ 4 ], [ 5 ] ]

<details>

```js
function pairElements(arr) {
    let map = new Map();

    // Group elements in a map
    for (let num of arr) {
        if (!map.has(num)) {
            map.set(num, []);
        }
        map.get(num).push(num);
    }

    // Convert map values to array
    return Array.from(map.values());
}

// Example usage
const arr = [1, 2, 3, 2, 4, 5, 3, 2];
console.log(pairElements(arr));
```

```js
  // below is also of O(n)
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

</details>

<br>

> ### Q24 - Reverse a string

<details>

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

</details>

<br>

> ### Q25 - Check whether a String is Palindrome or not

<details>

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

</details>

<br>

> ### ⭐️ Q26 - Find Duplicate characters in a string or array  

<details>
**Below also cover for Find Elements that occurred only once in the array**
</details>

<details>

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

</details>

<br>

> ### Q27- Leetcode - 796. Write a Code to check whether one string is a rotation of another
Input: S1 = ABCD, S2 = CDAB\
Output: Strings are rotations of each other\

Input: S1 = ABCD, S2 = ACBD\
Output: Strings are not rotations of each other

<details>

```js
  const str1 = "ABCD";
  const str2 = "CDAB";

  function checkRotation(str1, str2) {
    if(str1.length !== str2.length) return false

    const str3 = str1 + str1;

    return str3.includes(str2)
    // return str3.indexOf(str2) >= 0
  
  }

  console.log(checkRotation(str1, str2));
```

</details>

<br>

> ### Q28 - Write a Program to check whether a string is a valid shuffle of two strings or not

<details>

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

</details>

<br>

> ### Q29 - Balanced Parenthesis problem.
the function should return 'true' for exp = “[()]{}{[()()]()}” and 'false' for exp = “[(])”.

<details>

```js
// the solution  is of stack approach
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

**Same is below**

```js
const pairs = {
    '(': ')',
    '[': ']',
    '{': '}'
};

const check = "[()]{}{()()}"

function balanceSign(){
    
    let temp = []

    for(let i=0; i<check.length; i++){
        if(pairs[check[i]]){
            temp.push(pairs[check[i]])
        } else {
            if(check[i] !== temp.pop()){
                return false
            }
        }
        
    }   
    return true 
}

console.log(balanceSign());
```

</details>

<br>

> ### Q31 -  Find maximum char from string.
const str = "hello"\
Output => l => 2

<details>

```js
function findMaxChar(str) {
    const charMap = {};
    let maxChar = '';
    let maxCount = 0;

    for (let char of str) {
        charMap[char] = charMap[char] + 1 || 1;
        if (charMap[char] > maxCount) {
            maxCount = charMap[char];
            maxChar = char;
        }
    }

    return maxChar;
}

const str = "hello";
const maxChar = findMaxChar(str);
console.log(maxChar); // Output: l
```

</details>

<br>

> ### Q32 - Check Whether Two Strings Are Anagram Of Each Other

<details>

An anagram of a string is another string that contains the same characters,\
only the order of characters can be different. For example, “abcd” and “dabc” are an anagram of each other. 

1) sorting and compare

```js
  const s1 = "listen";
  const s2 = "silent";

  const ss1 = s1.split("").sort().join("");
  const ss2 = s2.split("").sort().join("");

  if (ss1 === ss2) {
    console.log(true);
  } else {
    console.log(false);
  }
```

2) other method -

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

### Time and Space Complexity:
- **Time Complexity**: **O(n)**, where `n` is the length of the strings (since they have the same length, we iterate once through both strings).
- **Space Complexity**: **O(k)**, where `k` is the number of unique characters in the string (usually a small constant, limited by the number of unique characters in the alphabet).

</details>

<br>


> ### Q33 - convert a array into small chunks of given size

 const arr = [1,2,3,4,5,6,7], size of chunk = 2\
 output = [[1,2], [3,4], [5,6], [7]]

<details>

```js
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const size = 2;
  const chunks = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  console.log(chunks); // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7 ] ]
```

</details>

<br>


> ### ⭐️ Q34 - Array Rotation by n  
const arr = [1,2,3,4,5,6] n=2\
output =>   [5,6,1,2,3,4]

<details>

⏳ Time Complexity: O(n)\
📌 Space Complexity: O(1)

```js
function rotateArray(arr, k) {
    let n = arr.length;
    k = k % n; // Handle cases where k > n

    reverse(arr, 0, n - 1);
    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

// Example
let arr = [1, 2, 3, 4, 5, 6, 7];
rotateArray(arr, 3);
console.log(arr); // Output: [5, 6, 7, 1, 2, 3, 4]
```

</details>

<br>


> ### ⭐️ Q35 - Find all permutations of string  LOGIC 
 const str = "ABC"\
 output => ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]

<details>

```js
function permutations(str) {
  let result = [];

  // Base case: if the string has only one character, return it as the only permutation
  if (str.length === 1) {
      result.push(str);
      return result;
  }

  for (let i = 0; i < str.length; i++) {
      const char = str[i];
      // Exclude the current character and get the rest of the string, can be like str.filter(e => e !== char)
      const remainingChars = str.slice(0, i) + str.slice(i + 1);

      // Recursively find permutations of the remaining characters
      const perms = permutations(remainingChars);

      // Add the current character to the beginning of each permutation of the remaining characters
      for (const perm of perms) {
          result.push(char + perm);
      }
  }

  return result;
}

// Example usage:
const inputString = "abc";
const result = permutations(inputString);
console.log(result);
```

</details>

<br>

> ### ⭐️ Q44 -  Find all subsets of an array  
const arr = [1, 2, 3];\
output => [ [], [ 1 ], [ 2 ], [ 1, 2 ], [ 3 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ]

similar case code - 
Input : abc
Output : a, b, c, ab, bc, ac, abc

<details>

```js
const arr = [1, 2, 3];
const result = [[]]; // Start with an empty set

for (let i = 0; i < arr.length; i++) {
  const currentLength = result.length;
  
  // Loop over each element in the result and add the current element to each subset
  for (let j = 0; j < currentLength; j++) {
    result.push([...result[j], arr[i]]);
  }
}

console.log(result);
```

```js
function getAllSubsets(arr) {
    debugger
    let result = [[]]; // Start with an empty subset

    for (let i = 0; i < arr.length; i++) {
        debugger
        const currentElement = arr[i];
        const length = result.length; // here we have created separated becuse while in loop we are updating the result array it cause loop to be infinte

        // For each existing subset, create a new subset that includes the current element
        for (let j = 0; j < length; j++) {
            debugger
            const newSubset = [...result[j],currentElement];
            result.push(newSubset);
        }
    }

    return result;
}

// Example usage:
let array = [1, 2, 3];
let subsets = getAllSubsets(array);
console.log(subsets);

```



**Below is same but more optimized**

```js
function getAllSubsets(arr) {
    let result = [];
    
    function backtrack(start, subset) {
        result.push([...subset]);
        
        for (let i = start; i < arr.length; i++) {
            subset.push(arr[i]);
            backtrack(i + 1, subset);
            subset.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

// Example usage:
let array = [1, 2, 3];
let subsets = getAllSubsets(array);
console.log(subsets);
```

</details>

<br>


> ### Q36 - Find missing number from an array 1 to n. ( sum of 1 to n and subtract all one by one to get missing number )

const arr = [1,2,3,5,6]\
output =>  missing number is 4

<details>

```js
const arr = [1, 2, 3, 5, 6];
const n = arr.length + 1; // + 1 for missing number

  // 1) using sum and minus
function findMissing(arr, n) {
let total = (n * (n + 1)) / 2;

    for (let num of arr) {
      total -= num;
    }
    return total;
}
console.log(findMissing(arr, n)); // 4

  // 2) Using sorting and for loop
let missing;

for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      missing = arr[i] - 1;
    }
}

console.log(missing);
```

</details>

<br>


> ### Q37 - Remove duplicate items object from an array
const arr = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 5 }]\
output => [{ id: 1 }, { id: 2 }, { id: 5 }]

<details>

```js
const arr = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 5 }];

  // using map ( filter won't work beacuse of diff object reference )
let map = new Map();
let result = [];

for (let item of arr) {
    if (!map.has(item.id)) {
      map.set(item.id, true);
      result.push(item);
    }
}

console.log(result); // [ { id: 1 }, { id: 2 }, { id: 5 } ]
```

</details>

<br>


> ### Q38 - Check all the chars are unique in string
const str = "Jayesh"\
output => true

const str = "boss"\
output => false

<details>

```js
const str = "Jayesh";
const str2 = "boss";

function checkAllCharUnique(s) {
    let obj = {};

    for (let char of s.split("")) {
        if (obj[char]) {
            return false;
        } else {
            obj[char] = true;
        }
    }

    return true;
}

console.log(checkAllCharUnique(str)); // true
console.log(checkAllCharUnique(str2)); // false
```

</details>

<br>

> ### Q39 - Implement Deep copy of an object ( deepClone )

const obj1 = { a: 10, b: { x: 20 } };\
const obj2 = deepClone(obj1);\
obj2.b.x = 90;

console.log(obj1); // { a: 10, b: { x: 20 } }\
console.log(obj2); // { a: 10, b: { x: 90 } }

<details>

```js
function deepClone(obj) {
    let clone = {};

    for (let key in obj) {
        if (typeof obj[key] === "object") {
            clone[key] = deepClone(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }

    return clone;
}

const obj1 = { a: 10, b: { x: 20 } };
const obj2 = deepClone(obj1);
obj2.b.x = 90;

console.log(obj1); // { a: 10, b: { x: 20 } }
console.log(obj2); // { a: 10, b: { x: 90 } }
```

**Below is another way of doing which handles many cases**

```js
function cloneDeep(obj, map = new Map()) {

    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (map.has(obj)) {
        return map.get(obj);
    }

    const output = Array.isArray(obj) ? [] : {};
    map.set(obj, output);
    const keys = [...Object.getOwnPropertySymbols(obj), ...Object.keys(obj)];

    for (const key of keys) {
        const val = obj[key];
        output[key] = cloneDeep(val, map);
    }

    return output;

}
```

</details>

<br>

> ### Q40 - String compression
const str = "aaaaaabbcc"\
output => 'a6b2c2'

<details>

```js
const str = "aaaaaabbcc";

function compress(s) {
    let compressed = "";
    let map = new Map();

    for (let char of s.split("")) {
        if (!map.has(char)) {
            map.set(char, 1);
        } else {
            let prevCount = map.get(char);
            map.set(char, prevCount + 1);
        }
    }

    console.log(map);

    for (let [key, value] of map) {
        compressed += key + value;
    }

    return compressed;
}

console.log(compress(str));
```

</details>

<br>


> ### Q41 - Check two given strings are isomorphic in JavaScript
Two strings are said to be isomorphic if it is possible to map every character of the first string to every character 
of the second string. Basically, in isomorphic strings, there is a one-to-one mapping between every character of 
the first string to every character of the second string

str1 = 'ABCA'\
str2 = 'XYZX'\
'A' maps to 'X'\
'B' maps to 'Y'\
'C' maps to 'Z' true

str1 = 'ABCA'\
str2 = 'WXYZ'\
'A' maps to 'W'\
'B' maps to 'X'\
'C' maps to 'Y'\
'A' again maps to 'Z' false

<details>

```js

const str1 = "ABCA";
const str2 = "XYZX";

const str3 = "ABCA";
const str4 = "WXYZ";

function checkIsomorphic(s1, s2) {
    let map = {};
    if (s1.length !== s2.length) {
        return false;
    }

    for (let i = 0; i < s1.length; i++) {
        if (map[s1[i]]) {
            if (map[s1[i]] !== s2[i]) {
                return false;
            }
        } else {
            map[s1[i]] = s2[i];
        }
    }

    return true;
}
console.log(checkIsomorphic(str1, str2));
console.log(checkIsomorphic(str3, str4));
```

</details>

<br>


> ### Q42 - find count of given digit ( 0 to 9 ) in range 1 to 250
output => 4 -> 52, 9 -> 43

<details>

```js
let digit = 4;
let range = 250;
let count = 0;

for (let i = 1; i <= range; i++) {
    if (i.toString().includes(digit.toString())) {
        count++;
    }
}

console.log(count);

```
</details>

<br>


> ### ⭐️ Q45 - Filter array of objects with exclude array 

let items = [\
  { color: "red", type: "tv" },\
  { color: "silver", type: "phone" },\
  { color: "black", type: "phone" },\
  { color: "blue", type: "phone" },\
];

let excludes = [\
  { k: "color", v: "silver" },\
  { k: "type", v: "tv" },\
];

output:- [ \
  { color: "black", type: "phone" },\
  { color: "blue", type: "phone" },\
];


<details>

```js
let items = [
  { color: "red", type: "tv" },
  { color: "silver", type: "phone" },
  { color: "black", type: "phone" },
  { color: "blue", type: "phone" },
];

let excludes = [
  { k: "color", v: "silver" },
  { k: "type", v: "tv" },
];

let filteredItems = items.filter(item => {
  return !excludes.some(exclude => item[exclude.k] === exclude.v);
});

console.log(filteredItems);
```


Below is another simple my way
```js
const d = items.filter(unit => {
    for(let ex of excludes){
        
        if(unit[ex.k] == ex.v){
            return false
        }
        
    }
    return true
})

console.log(d)
```




below is without in-built
```js
let items = [
  { color: "red", type: "tv" },
  { color: "silver", type: "phone" },
  { color: "black", type: "phone" },
  { color: "blue", type: "phone" },
];

let excludes = [
  { k: "color", v: "silver" },
  { k: "type", v: "tv" },
];

let filteredItems = [];

for (let i = 0; i < items.length; i++) {
  let includeItem = true;
  for (let j = 0; j < excludes.length; j++) {
    if (items[i][excludes[j].k] === excludes[j].v) {
      includeItem = false;
      break;
    }
  }
  if (includeItem) {
    filteredItems.push(items[i]);
  }
}

console.log(filteredItems);
```
</details>

<br>


> ### Q46 - Moving selected item at the end of an array ( move all 0 to end I.M.P )
const arr = [1, 2, 3, 4, 3, 5, 3, 6, 7]; selected item = 3\
output => [1, 2, 4, 5, 6, 7, 3, 3, 3];

<details>

```js
const arr = [1, 2, 3, 4, 3, 5, 3, 6, 7];
const selectedItem = 3;

// Filter out the selected item from the array
const filteredArr = arr.filter(item => item !== selectedItem);

// Count how many times the selected item occurred
const count = arr.length - filteredArr.length;

// Push the selected item to the end of the filtered array the number of times it occurred
for (let i = 0; i < count; i++) {
    filteredArr.push(selectedItem);
}

console.log(filteredArr);
```

without in-built method

```js
const arr = [1, 2, 3, 4, 3, 5, 3, 6, 7];
const selectedItem = 3;

// Loop through the array and move the selected item to the end
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === selectedItem) {
        // Remove the selected item from its current position
        const removedItem = arr.splice(i, 1)[0];
        // Push the removed item to the end of the array
        arr.push(removedItem);
        // Since we moved an element, decrement i to stay at the same position in the next iteration
        i--;
    }
}

console.log(arr);
```

</details>

<br>


> ### Q47 - write a program to print the first non-repeated number in an array.
const arr = [1, 2, 3, 1, 2, 4, 5]\
output => 3

<details>

```js
function firstNonRepeated(arr) {
    const counts = {};
    
    // Count occurrences of each number
    for (const num of arr) {
        counts[num] = (counts[num] || 0) + 1;
    }
    
    // Find the first non-repeated number
    for (const num of arr) {
        if (counts[num] === 1) {
            return num;
        }
    }
    
    // If no non-repeated number found, return null or any other default value as per your requirement
    return null;
}

const arr = [1, 2, 3, 1, 2, 4, 5];
console.log(firstNonRepeated(arr)); // Output: 3
```
</details>

<br>

> ### Q49 - Array of objects manipulation.
a) declare array of employees & sort them in ascending order (empId)\
b) declare an array of employees & sort them in ascending order by name.\
c) declare array of employees & filter the employees whose sal>6000;\
d) declare array of employees & increase sal of every employee by 500;\
e) declare array of employees & add "comp:ibm" to every employee;

<Details>

```js
const employees = [
    { empId: 1, name: "John", salary: 8000 },
    { empId: 3, name: "Ana", salary: 4000 },
    { empId: 2, name: "Zion", salary: 7000 },
];

// a) declare array of employees & sort them in ascending order (empId)
employees.sort((a, b) => a.empId - b.empId);
console.log(employees);

// b) declare an array of employees & sort them in ascending order by name.
employees.sort((a, b) => {
    if (a.name > b.name) {
        return 1;
    } else if (a.name < b.name) {
        return -1;
    } else {
        return 0;
    }
});
console.log(employees);

// c) declare array of employees & filter the employees whose sal>6000;
const result = employees.filter((employee) => {
    return employee.salary > 6000;
});
console.log(result);

// d) declare array of employees & increase sal of every employee by 500;
const increaseSal = employees.map((employee) => ({
    ...employee,
    salary: employee.salary + 500,
}));
console.log(increaseSal);

// e) declare array of employees & add "comp:ibm" to every employee;
const addIbm = employees.map((employee) => ({ ...employee, comp: "IBM" }));
console.log(addIbm);
```

</Details>

<br>


> ### Q50 - Add Dept info for each employee.

```js
const employees = [
    { eId: 101, name: "sanjay", sal: 5000, gender: "male" },
    { eId: 104, name: "reena", sal: 8000, gender: "female" },
];

const departments = [
    { eId: 101, dept: "sales" },
    { eId: 104, dept: "manager" },
];
```

<Details>

```js
const updatedEmployees = employees.map((employee) => {
    let department = departments.find((department) => {
        if (department.eId === employee.eId) {
            return true;
        }
    }).dept;

    return { ...employee, dept: department };
});

console.log(updatedEmployees);
```
</Details>

<br>


> ### Q51 - WAP to print Account number
input:- '12345678987'\
output:- '12*******87'

<Details>

```js
let accountNo = "12345678987";
accountNo = accountNo.split("");
for (let i = 2; i < accountNo.length - 2; i++) {
    accountNo[i] = "*";
}
console.log(accountNo.join(""));
```
</Details>

<br>


> ### Q52 - WAP to print Credit-card number
input:- '1111222233334444'\
output:- '1111-2222-3333-4444'

<Details>

```js
const str = "1111222233334444";
const result = [];

for (let i = 1; i < str.length; i++) {
    if (i % 4 === 0) {
        result.push(str.slice(i - 4, i));
    }
}
result.push(str.slice(-4));

console.log(result.join("-"));
```
</Details>

<br>

> ### Q54 - WAP to move all the special characters to the end of the string

input:- 'hello@#hi&'\
output:- 'hellohi@#&'

<Details>

```js
function moveSpecialCharactersToEnd(inputString) {
    // Separate alphabetic characters and special characters
    let alphabeticChars = '';
    let specialChars = '';
    
    for (let i = 0; i < inputString.length; i++) {
        if (/[a-zA-Z]/.test(inputString[i])) {
            alphabeticChars += inputString[i];
        } else {
            specialChars += inputString[i];
        }
    }
    
    // Concatenate alphabetic characters and special characters
    return alphabeticChars + specialChars;
}

// Test the function
let input = 'hello@#hi&';
let output = moveSpecialCharactersToEnd(input);
console.log(output); // Output will be 'hellohi@#&'
```
</Details>

<br>


> ### Q55 - Covert char into word
const input = ["c", "a", "k", "e", "", "e", "a", "t", "", "m", "a", "t", "e", "" ];\
output => ["cake", "eat", "mate"];

<Details>

```js
const input = ["c","a","k","e","","e","a","t","","m","a","t","e",""];

const output = [];
let temp = "";

for (let i = 0; i < input.length; i++) {
    if (input[i] === "") {
        output.push(temp);
        temp = "";
    } else {
        temp += input[i];
    }
}

console.log(output); // [ 'cake', 'eat', 'mate' ]
```
</Details>

<br>


> ### Q56 - String Capatalize

let arr = ["jayesh choudhary", "ankit sharma"];\
Output: JayeshChoudhary , AnkitSharma

<Details>

```js
let arr = ["jayesh choudhary", "ankit sharma"];

for (let i = 0; i < arr.length; i++) {
    let string = arr[i];
    let res = "";
    for (let j = 0; j < string.length; j++) {
        if (j === 0 || string[j - 1] === " ") {
            res = res + string[j].toUpperCase();
        } else if (string[j] === " ") {
            continue;
        } else {
            res = res + string[j];
        }
    }
    console.log(res);
}
```
</Details>

<br>


> ### Q57 - Rearrange array of Objects
[ { id: '1', name: 'number1' },\
  { id: '2', name: 'number2' },\
  { id: '3', name: 'number3' },\
  { id: 'S1', name: 'number4' },\
  { id: '4', name: 'number4' } ]
       
Output :-\
[ { id: 'S1', name: 'number4' },\
  { id: '1', name: 'number1' },\
  { id: '2', name: 'number2' },\
  { id: '3', name: 'number3' },\
  { id: '4', name: 'number4' } ]

<Details>

```js
[ { id: '1', name: 'number1' },
{ id: '2', name: 'number2' },
{ id: '3', name: 'number3' },
{ id: 'S1', name: 'number4' },
{ id: '4', name: 'number4' } ].sort((a,b) =>  a.id === "S1" ? -1 :  1)
```

other also
```js
const arr = [
    { id: "1", name: "number1" },
    { id: "2", name: "number2" },
    { id: "3", name: "number3" },
    { id: "S1", name: "number4" },
    { id: "4", name: "number4" },
];

let front = [];
let back = [];

arr.forEach((obj) => (isNaN(obj.id) ? front.push(obj) : back.push(obj)));
console.log([...front, ...back]);
```
</Details>

<br>


> ### Q58 - Mapping array
 
let friends = [\
  { name: "chris", age: 13, books: ["sherlock holmes", "english"] },\
  { name: "john", age: 13, books: ["bible", "harry potter"] },\
  { name: "jack", age: 21, books: ["Alchemist", "Java"] },\
  { name: "jack", age: 21, books: ["Wings of fire”,”Davinci code"] },\
  { name: "holmes", age: 23, books: ["Invisible man”,”The Rainbow"] },\
];

Output:-\
{\
  13: ["sherlock holmes", "english", "bible", "harry potter"],\
  21: ["Alchemist", "Java", "Wings of fire”,”Davinci code"],\
  23: ["Invisible man”,”The Rainbow"]\
}

<Details>

```js
const friends = [
    { name: "chris", age: 13, books: ["sherlock holmes", "english"] },
    { name: "john", age: 13, books: ["bible", "harry potter"] },
    { name: "jack", age: 21, books: ["Alchemist", "Java"] },
    { name: "jack", age: 21, books: ["Wings of fire”,”Davinci code"] },
    { name: "holmes", age: 23, books: ["Invisible man”,”The Rainbow"] },
];
const result = {};

friends.forEach((friend) => {
    if (result[friend.age]) {
        result[friend.age] = [...result[friend.age], ...friend.books];
    } else {
        result[friend.age] = [...friend.books];
    }
});

console.log(result);
```
</Details>

<br>


> ### Q59 - Find peak elements from an array, An element is called a peak element if its value is not smaller than the value of its adjacent elements(if they exists).

const arr = [1, 2, 3, 77, 6, 99, 2];\
output :- [ 77, 99 ]

<Details>

```js
function findPeakElements(arr) {
    const peaks = [];
    
    for (let i = 0; i < arr.length; i++) {
        if ((i === 0 || arr[i] >= arr[i - 1]) && (i === arr.length - 1 || arr[i] >= arr[i + 1])) {
            peaks.push(arr[i]);
        }
    }
    
    return peaks;
}

const arr = [1, 2, 3, 77, 6, 99, 2];
console.log(findPeakElements(arr)); // Output: [77, 99]
```
</Details>

<br>


> ### ⭐️ Q60 - find continuous sub-array which adds up to a given number. 

A = [1,2,3,7,5]\
S = 12\
Output: [ 2, 3, 7 ], [ 7, 5 ]\
Explanation: The sum of elements from 2nd position to 4th position is 12. 

<details>

```js
// algo: Sliding window

function findSubarraysWithSum(arr, target) {
    let result = [];
    let i = 0, sum = 0;

    for (let j = 0; j < arr.length; j++) {
        sum += arr[j]; // Expand the window

        // Shrink window if sum exceeds target
        while (sum > target && i <= j) {
            sum -= arr[i];
            i++;
        }

        // If sum matches target, store the subarray
        if (sum === target) {
            result.push(arr.slice(i, j + 1));
        }
    }

    return result;
}

// Example usage
let A = [1, 2, 3, 7, 5];
let S = 12;
console.log(findSubarraysWithSum(A, S));
```
</details>

<br>


> ### Q61 - Panagram Checking:- 

**A pangram is a sentence containing every letter in the English Alphabet ( A to Z )**

Input: S = Bawds jog, flick quartz, vex nymph\
Output: 1\
Explanation: In the given input, there are all the letters of the English alphabet. Hence, the output is 1.

<details>

```js
const str = "Bawds jog, flick quartz, vex nymph";

function checkPanagram(str) {
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    str = str.toLowerCase();

    for (let char of alphabets) {
        if (!str.includes(char)) {
            return 0;
        }
    }
    return 1;
}

console.log(checkPanagram(str));
```

</details>

<br>

> ### Q63 -  Program to convert time from 12 hour to 24 hour format

Input : 07:05:45PM\
Output : 19:05:45

<details>

```js
function convertTime12to24(time12) {
    // Extracting hours, minutes, seconds, and AM/PM indicator
    var time = time12.slice(0, -2).split(':');
    var hours = parseInt(time[0]);
    var minutes = parseInt(time[1]);
    var seconds = parseInt(time[2]);
    var indicator = time12.slice(-2);

    // Converting to 24-hour format
    if (indicator === 'PM' && hours < 12) {
        hours = hours + 12;
    } else if (indicator === 'AM' && hours === 12) {
        hours = 0;
    }

    // Formatting the output
    var hoursStr = hours.toString().padStart(2, '0');
    var minutesStr = minutes.toString().padStart(2, '0');
    var secondsStr = seconds.toString().padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

// Test the function
var inputTime = "07:05:45PM";
var outputTime = convertTime12to24(inputTime);
console.log("Output:", outputTime); // Output: 19:05:45
```

</details>

<br>


> ### 64 -  Program to calculate the number of days between two dates
var date1 = new Date("06/30/2019");\
var date2 = new Date("07/30/2019");\
output => 30 

<details>

```js
const date1 = new Date("06/29/2019");
const date2 = new Date("07/30/2019");

timeDifference = date2.getTime() - date1.getTime();
//--------------------------- sec   min   hr   day
const day = timeDifference / (1000 * 60 * 60 * 24);
console.log(day);
```

</details>

<br>


> ### Q65 - Print the middle character of the word. If the word's length is odd, return the middle character. If the word's length is even, return the middle 2 characters.

"test" => "es"\
"testing" => "t"\
"middle" => "dd"\
"A" => "A"

<details>

```js
function getMiddleCharacter(word) {
    if (word.length % 2 === 0) {
        // If the length is even, return the middle two characters
        return word.substring(word.length / 2 - 1, word.length / 2 + 1);
    } else {
        // If the length is odd, return the middle character
        return word.charAt(Math.floor(word.length / 2));
    }
}

// Test cases
console.log(getMiddleCharacter("test")); // Output: "es"
console.log(getMiddleCharacter("testing")); // Output: "t"
console.log(getMiddleCharacter("middle")); // Output: "dd"
console.log(getMiddleCharacter("A")); // Output: "A"
```

</details>

<br>


> ### Q66 -  Remove given character from string.

const str = "Jayesh";\
const char = "a";\
output = "Jyesh";

<details>

```js
const str = "Jayesh";
const char = "a";

let result = "";

for (let c of str) {
    if (c !== char) {
        result += c;
    }
}

console.log(result);
```

</details>

<br>


> ### Q67 - Spell out numbers ( convert numbers which are less than 100 into words ).

spellNumber(50) => 'Fifty'\
spellNumber(99) => 'Ninety Nine'\
spellNumber(14632) => 'Fourteen Thousand Six Hundred Thirty Two'\
spellNumber(7483647) => 'Seventy Four Lakh Eighty Three Thousand Six Hundred Forty Seven'\
spellNumber(997751076) => 'Ninety Nine Crore Seventy Seven Lakh Fifty One Thousand Seventy Six'\

<Details>

```js
function spellNumber(number) {
    const singleDigits = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teenNumbers = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertLessThanOneThousand(n) {
        let result = '';

        if (n >= 100) {
            result += singleDigits[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }

        if (n >= 11 && n <= 19) {
            return result + teenNumbers[n - 10];
        } else if (n === 10 || n >= 20) {
            result += tens[Math.floor(n / 10)] + ' ';
            n %= 10;
        }

        if (n > 0) {
            result += singleDigits[n];
        }

        return result.trim();
    }

    if (number === 0) return 'Zero';

    let result = '';
    let crores = Math.floor(number / 10000000);
    let lakhs = Math.floor((number % 10000000) / 100000);
    let thousands = Math.floor((number % 100000) / 1000);
    let remaining = number % 1000;

    if (crores > 0) {
        result += convertLessThanOneThousand(crores) + ' Crore ';
    }
    if (lakhs > 0) {
        result += convertLessThanOneThousand(lakhs) + ' Lakh ';
    }
    if (thousands > 0) {
        result += convertLessThanOneThousand(thousands) + ' Thousand ';
    }
    if (remaining > 0) {
        result += convertLessThanOneThousand(remaining);
    }

    return result.trim();
}

console.log(spellNumber(50)); // Fifty
console.log(spellNumber(99)); // Ninety Nine
console.log(spellNumber(14632)); // Fourteen Thousand Six Hundred Thirty Two
console.log(spellNumber(7483647)); // Seventy Four Lakh Eighty Three Thousand Six Hundred Forty Seven
console.log(spellNumber(997751076)); // Ninety Nine Crore Seventy Seven Lakh Fifty One Thousand Seventy Six
```
</Details>

<br>

> ### ⭐️ Q68 - Array of objects Manipulation 

const portfolio = [\
&nbsp; { name: "Mark", stock: "FB" },\
&nbsp; { name: "Steve", stock: "AAPL" },\
&nbsp; { name: "Tim", stock: "AAPL" },\
&nbsp; { name: "Steve", stock: "MSFT" },\
&nbsp; { name: "Bill", stock: "MSFT" },\
&nbsp; { name: "Bill", stock: "AAPL" },\
];

Output \
const shareholder = [\
&nbsp; { stock: "AAPL", name: ["Steve", "Bill", "Tim"], count: 3 },\
&nbsp; { stock: "MSFT", name: ["Steve", "Bill"], count: 2 },\
&nbsp; { stock: "FB", name: ["Mark"], count: 1 },\
];

<details>

```js
const portfolio = [
    { name: "Mark", stock: "FB" },
    { name: "Steve", stock: "AAPL" },
    { name: "Tim", stock: "AAPL" },
    { name: "Steve", stock: "MSFT" },
    { name: "Bill", stock: "MSFT" },
    { name: "Bill", stock: "AAPL" },
];

const shareholderObj = {};

for (let i = 0; i < portfolio.length; i++) {
    const { name, stock } = portfolio[i];

    if (!shareholderObj[stock]) {
        shareholderObj[stock] = { stock, name: [name], count: 1 };
    } else {
        if (!shareholderObj[stock].name.includes(name)) {
            shareholderObj[stock].name.push(name);
            shareholderObj[stock].count++;
        }
    }
}

const shareholder = Object.values(shareholderObj);

console.log(shareholder);

```

</details>

<br>


> ### ⭐️ Q69 - Finding sum of digits of a number until sum becomes single digit 
const "5431" => "13" => "4"

<details>

```js
function sumOfDigits(num) {
    // Convert the number to a string to iterate through its digits
    let strNum = num.toString();

    // Base case: If the number has only one digit, return it
    if (strNum.length === 1) {
        return parseInt(strNum);
    }

    // Sum the digits of the number
    let sum = 0;
    for (let digit of strNum) {
        sum += parseInt(digit);
    }

    // Recursively call the function with the sum
    return sumOfDigits(sum);
}

// Example usage:
const result = sumOfDigits(5431);
console.log(result); // Output will be 4
```

</details>

<br>


> ### Q70 -  Find sum of numbers occurred only once in the array ( using only one loop )

const array = [2, 5, 4, 4, 6, 5, 4, 7, 6];\
output => 2 + 7 => 9

<details>

```js
function sumOfUniqueNumbers(arr) {
    let occurrences = new Map();
    let sum = 0;

    for (let num of arr) {
        if (occurrences.has(num)) {
            if (occurrences.get(num) === 1) {
                sum -= num;
            }
            occurrences.set(num, occurrences.get(num) + 1);
        } else {
            occurrences.set(num, 1);
            sum += num;
        }
    }

    return sum;
}

// Example usage:
let arr = [1, 2, 3, 2, 4, 5, 3];
console.log(sumOfUniqueNumbers(arr)); // Output should be 1 + 4 + 5 = 10
```

----------------------------------------

```js
function sumOfNumbersOccurringOnce(array) {
    const occurrences = {};

    // Populate occurrences object
    for (const num of array) {
        occurrences[num] = (occurrences[num] || 0) + 1;
    }

    let sum = 0;

    // Iterate over the occurrences object
    for (const num in occurrences) {
        if (occurrences[num] === 1) {
            sum += parseInt(num);
        }
    }

    return sum;
}

// Example usage:
const array = [2, 5, 4, 4, 6, 5, 4, 7, 6];
const result = sumOfNumbersOccurringOnce(array);
console.log(result); // Output will be 9
```

</details>

<br>


> ### Q71 - Find the smallest positive number missing from an unsorted array

const arr1 = [2, 3, 7, 6, 8, -1, -10, 15]; // 1\
const arr2 = [2, 3, -7, 6, 8, 1, -10, 15]; // 4\
const arr3 = [1, 1, 0, -1, -2]; // 2\
const arr4 = [3, 2, 1, 4, 5]; // 6


<details>

```js
const arr1 = [3, 2, 1, 4, 5];

// Find the maximum value in the array
let max = Math.max(...arr1);

// Loop from 1 to max + 1 to find the first missing integer
for (let i = 1; i <= max + 1; i++) {
    if (!arr1.includes(i)) {
        console.log(i);
        break;
    }
}
```
</details>

<br>


> ### Q72 - compare nested object ( custom without JSON.stringify())

const obj1 = { a: 20, b: { x: 40, y: 60 } };\
const obj2 = { a: 20, b: { x: 40, y: 60 } };

<details>

```js
const obj1 = { a: 20, b: { x: 40, y: 60 } };
const obj2 = { a: 20, b: { x: 40, y: 60 } };

function compare(obj1, obj2) {
    for (let key in obj1) {
        if (typeof obj1[key] === "object") {
            return compare(obj1[key], obj2[key]);
        } else {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    return true;
}

console.log(compare(obj1, obj2));
```

</details>

<br>


> ### Q73 - Find the 3rd min element of an array without using index and sorting

const arr = [7, 10, 4, 3, 20, 15]\
output => 7 

<details>

```js
const arr = [7, 10, 4, 3, 20, 15];
const Max = 1000000;

let min1 = Max;
let min2 = Max;
let min3 = Max;

for (let num of arr) {
    if (num < min1) {
        min3 = min2;
        min2 = min1;
        min1 = num;
    } else if (num < min2) {
        min3 = min2;
        min2 = num;
    } else if (num < min3) {
        min3 = num;
    }
}

console.log(min3);
```

</details>

<br>

> ### Q74 - Given an array of string return group of anagrams string array

const arr = ["eat", "tea", "ate", "ball", "dna", "and"]\
output => [ [ 'eat', 'tea', 'ate' ], [ 'ball' ], [ 'dna', 'and' ] ]

<details>

```js
function groupAnagrams(arr) {
    const map = {};
    arr.forEach(word => {
        const sortedWord = word.split('').sort().join('');
        if (!map[sortedWord]) {
            map[sortedWord] = [];
        }
        map[sortedWord].push(word);
    });

    return Object.values(map);
}

const arr = ["eat", "tea", "ate", "ball", "dna", "and"];
const result = groupAnagrams(arr);
console.log(result);
```

</details>

<br>


> ### Q75 - Given a positive integer N as input , print first N prime numbers ⭐️

Input  : 5, Output : [2,3,5,7,11]\
Input  : 0, Output : []

<details>

```js
function generatePrimes(N) {
    let primes = [];
    let num = 2;
    
    while (primes.length < N) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }
    
    return primes;
}

function isPrime(num) {
    // Prime numbers are greater than 1
    if (num <= 1) {
        return false;
    }
    // Check for divisibility from 2 to sqrt(num)
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Test cases
console.log(generatePrimes(5)); // Output: [2, 3, 5, 7, 11]
console.log(generatePrimes(0)); // Output: []
```

above function in combined form 

```js
function printFirstNPrimes(N) {
    let primes = [];
    let num = 2; // Start checking from 2

    while (primes.length < N) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(num);
        }
        num++;
    }

    console.log(`First ${N} prime numbers:`);
    console.log(primes.join(', '));
}

// Example usage:
printFirstNPrimes(10); // Prints the first 10 prime numbers
```

</details>

<br>

> ### Q76 - Given a string as input, Return a string without duplicates in the same order of occurrence appended with positions of first occurrence of duplicate characters.

Input  : Banana, Output : Ban12\
Input  : Jayesh, Output : Jayesh


<details>

```js
const str1 = "Banana";
const str2 = "Jayesh";

function removeDuplicateswithIndex(str) {
    let result = "";
    const obj = {};

    for (let i = 0; i < str.length; i++) {
        if (obj[str[i]]) {
            obj[str[i]] = { ...obj[str[i]], count: obj[str[i]].count + 1 };
        } else {
            result += str[i];
            obj[str[i]] = { firstIndex: i, count: 1 };
        }
    }
    console.log(obj);
    // {
    //     B: { firstIndex: 0, count: 1 },
    //     a: { firstIndex: 1, count: 3 },
    //     n: { firstIndex: 2, count: 2 }
    // }
    
    for (let [key, value] of Object.entries(obj)) {
        if (value.count > 1) {
            result += value.firstIndex;
        }
    }

    return result;
}

console.log(removeDuplicateswithIndex(str1));
console.log(removeDuplicateswithIndex(str2));
```

</details>

<br>


> ### Q77 -  Implement the chessBoard pattern
W B W B W B W B\
B W B W B W B W\
W B W B W B W B\
B W B W B W B W\
W B W B W B W B\
B W B W B W B W\
W B W B W B W B\
B W B W B W B W

<details>

```js
function drawChessboard(rows, cols) {
    let output = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if ((i + j) % 2 === 0) {
                output += 'W ';
            } else {
                output += 'B ';
            }
        }
        output += '\n';
    }
    return output;
}

// Call the function with desired dimensions
console.log(drawChessboard(8, 8));
```

</details>

<br>


> ### Q78 - longest Substring of two strings ⭐️

const str1 = "ABABC";\
const str2 = "BABCA";\
Output: "BABC"

<details>

```js
function longestCommonSubstring(str1, str2) {
    let maxLength = 0; // To keep track of the maximum length of common substring
    let longestSubstring = ""; // To store the longest common substring

    for (let i = 0; i < str1.length; i++) {
        for (let j = i; j < str1.length; j++) {
            debugger
            // Get the substring from str1 starting at index i to j
            let subStr = str1.slice(i, j + 1);

            // Check if this substring exists in str2
            if (str2.includes(subStr)) {
                // Update maxLength and longestSubstring if a longer common substring is found
                if (subStr.length > maxLength) {
                    maxLength = subStr.length;
                    longestSubstring = subStr;
                }
            }
        }
    }

    return longestSubstring;
}

// Example usage
const str1 = "ABABC";
const str2 = "BABCA";
const result = longestCommonSubstring(str1, str2);
console.log(result); // Output: "BABC"
```


**Below is the optimized DSA version**

```js
// https://www.youtube.com/watch?v=ps_eAvR9R10&t=396s


function longestCommonSubstring(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    
    // Create a 2D array to store lengths of longest common suffixes of substrings
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    let maxLength = 0; // Length of longest common substring
    let endingIndex = m; // Ending index of longest common substring in str1

    // Build the dp array
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endingIndex = i;
                }
            }
        }
    }

    // If no common substring found, return an empty string
    if (maxLength === 0) {
        return '';
    }

    // Extract the longest common substring
    return str1.slice(endingIndex - maxLength, endingIndex);
}

// Example usage:
const str1 = "abcdxyz";
const str2 = "xyzabcd";
console.log(longestCommonSubstring(str1, str2)); // Output: "abcd"
```

</details>

<br>

> ### Q101 - longest substring with unique characters ⭐️

```js
longestUniqueSubstr('aaaaa')
// 'a'
longestUniqueSubstr('abcabc')
// 'abc', or 'bca', or 'cab'
longestUniqueSubstr('a12#2')
// 'a12#
```

<Details>

This is a **Sliding Window** problem.

### Algorithm: Sliding Window  
- Use two pointers (`left` and `right`) to define the window.
- Use a `Set` to keep track of unique characters.
- Expand the `right` pointer while characters are unique.
- If a duplicate is found, move the `left` pointer to remove characters until the substring is unique again.
- Keep track of the maximum length.

### Code Implementation:
```javascript
function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let left = 0, maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Example usage:
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
console.log(lengthOfLongestSubstring("bbbbb"));    // Output: 1
console.log(lengthOfLongestSubstring("pwwkew"));   // Output: 3
```
</Details>

<br>

> ### Q79 - shift each letter by number of position in js

For example if the string is "ac" and num is 2 the output should be "ce".

const str = "Hello, World!";\
const num = 5;\
Output: "Mjqqt, Btwqi!"

<details>

```js

CaesarCipher = (str, num) => {

  str = str.toUpperCase();

  let resultStr = '';
  let charAfterNumShift = 0;

  for (let i = 0; i < str.length; i++) {

    charAfterNumShift = (str[i].charCodeAt()) + num

    resultStr += String.fromCharCode(charAfterNumShift);
  }

  return resultStr;
}

/* The fromCharCode function doesn't operate on strings, it operates on the global String object. like so
String.fromCharCode(65, 66, 67);  // "ABC" */

console.log(CaesarCipher('ac', 2));  // => ce

const str = "Hello, World!";
const num = 5;
console.log(CaesarCipher(str, num)); // Output: "Mjqqt, Btwqi!"
```
</details>

<br>

> ### Q81 - Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']\
uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']\
uniqueInOrder([1,2,2,3,3])       == [1,2,3]

<details>

```js
function uniqueInOrder(iterable){
  let array = []

    for(var i = 0; i < iterable.length; i++) {
      if(iterable[i] !== iterable[i+1]) {
        array.push(iterable[i]);
      };
    }
    return array;
  }

console.log(uniqueInOrder('AAAABBBCCDAABBB'));
console.log(uniqueInOrder('ABBCcAD'));
console.log(uniqueInOrder([1,2,2,3,3]));
```

</details>

<br>


> ### Q82 - Implement a function that adds two numbers together and returns their sum in binary. The conversion can be done before, or after the addition.The binary number returned should be a string.

<details>

```js
// normal
function addBinary(a,b){
  let decSum = a + b;
  return decSum.toString(2);
}
```
```js
// without inbuilt
function addBinaryAlt(a,b) {
  var c = a + b;
  var res = '';
  while (c >= 1) {
  	// console.log("value of c is " + c); // this line was only for debugging
    res = c % 2 + res;
    c = Math.floor(c / 2);    
    // console.log("Accumuled string value of res is " + res); // this line was only for debugging
  }
  return res;
}

console.log(addBinaryAlt(5, 6));

```

</details>

<br>


> ### Q83 - Your goal is to return multiplication table for number that is always an integer from 1 to 10.

For example, a multiplication table (string) for number == 5 looks like below:

1 * 5 = 5\
2 * 5 = 10\
3 * 5 = 15\
4 * 5 = 20\
5 * 5 = 25\
6 * 5 = 30\
7 * 5 = 35\
8 * 5 = 40\
9 * 5 = 45\
10 * 5 = 50\
P. S. You can use \n in string to jump to the next line.

<details>

```js
//Alternative solution by others
function multiTable(number) {
  multArr = [];
  for (i = 1; i < 11; i++) {
    multArr.push(`${i} * ${number} = ${i * number}`);
  }
  return multArr.join('\n');
}

console.log(multiTable(5));
```

```js
// other

function multiTable(number) {
  return [...Array(10)].map((currentNumber, index) => `${index + 1} * ${number} = ${ (index + 1) * number}`).join('\n');
}

```

</details>

<br>


> ### Q84 - Leetcode - 509. Below is for the fibonacci number  ⭐️

<details>

```js
// Same as above, using ternary operator - AND THIS IS THE STANDARD SOLUTION
fibonacci = n => {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
fibonacci(12)
```

Other method\
below is without recursion

```js
n_th_fibonacci = n => {
  let [a, b] = [0, 1]

  while (--n) {
    [a, b] = [b, b + a]
  }
  return b
}

n_th_fibonacci(12)
```

</details>

<br>


> ### Q85 - To print 1 to 5 with different cases

naive approach
```js
const arr = [10, 12, 15, 21]

for (var i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log("Index: " + i + ", element : " + arr[i])
  }, 1000)
}
```
above will show 
Index: 4, element : undefined\
Index: 4, element : undefined\
Index: 4, element : undefined\
Index: 4, element : undefined

Below are the possible solutions

<Details>

Case 1. We have changes var to let

```js
const arr1 = [10, 12, 15, 21]

for (let i = 0; i < arr1.length; i++) {
  setTimeout(() => {
    console.log("The index of this number is: " + i)
  }, 1000)
}

```

case 2.  By using the IFFE with var

```js
const arr2 = [10, 12, 15, 21]

for (var i = 1; i <= arr2.length; i++) {
  setTimeout(
    (function (i_local) {
      return function () {
        console.log("The index of this number is " + i_local)
      }
    })(i),
    1000
  )
}

```

case 3. Use different iterator variable i and j

```js
for (var i = 1; i <= 3; i++) {
  let j = i
  setTimeout(function () {
    console.log(`j: ${j}`)
  }, 1000)
}
```

case 4. using the return function

```js
funcToExecute = x => {
  return () => {
    console.log(x);
  };
};

for (var i = 1; i <= 5; i++) {
  setTimeout(funcToExecute(i), 1000);
}
```

When we want to log every output after one second, just use the i withh time

```js
const arr1 = [10, 12, 15, 21]

for (let i = 0; i < arr1.length; i++) {
  setTimeout(() => {
    console.log("The index of this number is: " + i)
  }, 1000 * i)
}
```
</Details>

<br>


> ### Q86 - Leetcode - 2239. Find the number in an array that is closest to a given number  ⭐️

const array = [5,10,15,20,25,30,35];\
const target = 22;\
Output: 20

<details>

```js
// sort based on distance from the reference value num, and then take the first item.
closestNumInArr = (arr, num) => {
	return arr.sort((a, b) => Math.abs(num - a) - Math.abs(num - b))[0];
}

console.log(closestNumInArr([5,10,15,20,25,30,35], 22));
```


```js
function findClosestNumber(arr, target) {
  
    let closest = arr[0];
    let closestDiff = Math.abs(target - closest);

    for (let i = 1; i < arr.length; i++) {
        let currentDiff = Math.abs(target - arr[i]);

        if (currentDiff < closestDiff) {
            closestDiff = currentDiff;
            closest = arr[i];
        }
    }

    return closest;
}

// Example usage:
const array = [5,10,15,20,25,30,35];
const target = 22;
console.log(findClosestNumber(array, target)); // Output: 20
```

</details>

<br>



> ### Q87 - find length of integer without converting to string

<Details>

```js
let number = 12345
countDigits_1 = n => {

    let counter = 0;

    while ( n > 0) {
        n = parseInt(n/10)
        counter++
    }
    return counter;
}

console.log(countDigits_1(number));
```
</Details>

<br>


> ### Q88 - flatten my deep object.  ⭐️

```
const person = {
  name: "Jayesh",
  address: {
    state: "M.P",
    country: "India",
    subAdress: {
      city: "Burhanpur",
    },
  },
  skills: {
    frontend: ["JavaScript", "React Js", "CSS"],
    backend: ["Node Js", "Mongo Db"],
  },
};

const output = {
  name: "Jayesh",
  address.state: "M.P",
  address.country: "India",
  address.subAdress.city: "Burhanpur",
  skills.frontend.0: "JavaScript",
  skills.frontend.1: "React Js",
  skills.frontend.2: "CSS",
  skills.backend.0: "Node Js",
  skills.backend.1: "Mongo Db"
}
```



<details>

```js

const person = {
  name: "Jayesh",
  address: {
    state: "M.P",
    country: "India",
    subAdress: {
      city: "Burhanpur",
    },
  },
  skills: {
    frontend: ["JavaScript", "React Js", "CSS"],
    backend: ["Node Js", "Mongo Db"],
  },
};


const flattenObject = (obj) => {
  const result = {};
  //// looping through obj
  for (let key in obj) {
    // checking type of key
    if (typeof obj[key] === "object") {
      // if object call flattenObject again
      const temp = flattenObject(obj[key]);

      for (let childKey in temp) {
        // concatenate key with childKey => key.childKey
        result[key + "." + childKey] = temp[childKey];
      }
    } else {
      // else store obj[key] in result directly
      result[key] = obj[key];
    }
  }

  return result;
};

const flattenPerson = flattenObject(person);
console.log(flattenPerson);
//  output
// {
//     name: "Jayesh",
//     address.state: "M.P",
//     address.country: "India",
//     address.subAdress.city: "Burhanpur",
//     skills.frontend.0: "JavaScript",
//     skills.frontend.1: "React Js",
//     skills.frontend.2: "CSS",
//     skills.backend.0: "Node Js",
//     skills.backend.1: "Mongo Db"
// }

```

Below is the DFS approach

```js
function flattenObject(obj, prefix = "") {
  let result = {};

  for (let key in obj) {
    let newKey = prefix ? `${prefix}.${key}` : key; // Create dot-separated keys

    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        // If it's an array, iterate with index using traditional for loop
        for (let i = 0; i < obj[key].length; i++) {
          let arrayKey = `${newKey}.${i}`;
          if (typeof obj[key][i] === "object" && obj[key][i] !== null) {
            result = { ...result, ...flattenObject(obj[key][i], arrayKey) };
          } else {
            result[arrayKey] = obj[key][i];
          }
        }
      } else {
        // If it's an object, recurse
        result = { ...result, ...flattenObject(obj[key], newKey) };
      }
    } else {
      result[newKey] = obj[key];
    }
  }

  return result;
}

// Test
const person = {
  name: "Jayesh",
  address: {
    state: "M.P",
    country: "India",
    subAdress: {
      city: "Burhanpur",
    },
  },
  skills: {
    frontend: ["JavaScript", "React Js", "CSS"],
    backend: ["Node Js", "Mongo Db"],
  },
};

console.log(flattenObject(person));
```

</details>

<br>

> ### Q89 - Find the maximum sum of any contiguous subarray in a list of integers  ⭐️

should be 6: [4, -1, 2, 1]

<Details>

```js
// algo - DP

function maxSubarraySum(arr) {
    let maxSoFar = -Infinity;
    let maxEndingHere = 0;

    for (let num of arr) {
        maxEndingHere += num;
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
        if (maxEndingHere < 0) maxEndingHere = 0;
    }

    return maxSoFar;
}

// Example Usage
console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6
```
</Details>

<br>

> ### Q90 - One of the differences between null and undefined is how they are treated differently in JSON.stringify().

```js
JSON.stringify({a: null})      // '{"a":null}'
JSON.stringify({a: undefined}) // '{}'

JSON.stringify([null])         // '[null]'
JSON.stringify([undefined])    // '[null]'
```

You are asked to implement `undefinedToNull()` to return a copy that has all undefined replaced with null.

```js
undefinedToNull({a: undefined, b: 'BFE.dev'})\
// {a: null, b: 'BFE.dev'}

undefinedToNull({a: ['BFE.dev', undefined, 'bigfrontend.dev']})\
// {a: ['BFE.dev', null, 'bigfrontend.dev']}
```

<Details>

```js
function undefinedToNull(arg) {
    if (arg === undefined) {
        return null;
    }
    if (Array.isArray(arg)) {
        for (let i = 0; i < arg.length; i++) {
            arg[i] = undefinedToNull(arg[i]);
        }
    } else if (typeof arg === 'object' && arg !== null) {
        for (let key in arg) {
            arg[key] = undefinedToNull(arg[key]);
        }
    }
    return arg;
}
// Test case
// {a: undefined, b: 'BFE.dev'}  

// {a: undefined, b: { c: { d: undefined, e: ['BFE.dev', undefined]} }}  

// ['BFE.dev', undefined, null, {a: ['BFE.dev', undefined]}]  

// {a: 'BFE.dev', b: 'BFE.dev'}   
```
</Details>

<br>


> ### Q91 - Please implement a curry() function, which accepts a function and return a curried one.  ⭐️

Here is an example

```js
const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'
```

<Details>

```js

const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}

const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return function (...nextArgs) {
                return curried(...args.concat(nextArgs));
            };
        }
    };
};

const curriedJoin = curry(join)


console.log(curriedJoin(1, 2, 3)) // '1_2_3'

console.log(curriedJoin(1)(2, 3)) // '1_2_3'

console.log(curriedJoin(1, 2)(3)) // '1_2_3'
```
</Details>

<br>

> ### Q92 - I believe you've used jQuery before, we often chain the jQuery methods together to accomplish our goals. ⭐️

For example, below chained call turns button into a black button with white text.

```js
$('#button')
  .css('color', '#fff')
  .css('backgroundColor', '#000')
  .css('fontWeight', 'bold')
```

<Details>

```js
function $(el) {
    console.log(el);
    // const getElement = document.getElementById(el)
    return {
        css(propertyName, value) {
            console.log(property, value);
            // getElement.forEach((element) => {
            //     element.style[propertyName] = value;
            // });
            return this
        }
    }
}


$('#button').css('color', '#fff').css('backgroundColor', '#000').css('fontWeight', 'bold')
```
</Details>

<br>


> ### Q93 - Create a sum(), which makes following possible  ⭐️

```js
const sum1 = sum(1)
sum1(2) == 3 // true
sum1(3) == 4 // true
sum(1)(2)(3) == 6 // true
sum(5)(-1)(2) == 6 // true
```

**Solution**

<details>

```js
function sum(num) {
    const func = function (num2) {
        return num2 ? sum(num + num2) : num;
    }

    func.valueOf = () => num; 
    return func; 
}


const sum1 = sum(1)
console.log(sum(1) == 1); // true
console.log(sum1(2) == 3) // true
console.log(sum1(3) == 4) // true
console.log(sum(1)(2)(3) == 6) // true
sum(5)(-1)(2) == 6 // true

```

The line `func.valueOf = () => num;` is overriding the default behavior of JavaScript's `valueOf` method for the `func` object.

### Detailed Explanation:

1. **What is `valueOf`?**
   - In JavaScript, the `valueOf` method is used to convert an object to a primitive value. This method is automatically called by JavaScript when an object is compared with a primitive value using operators like `==`, `<`, `>`, etc.

2. **Overriding `valueOf`:**
   - By default, when you compare a function object with a number (e.g., `sum(1) == 1`), JavaScript would attempt to convert the function to a primitive value. If `valueOf` isn't overridden, the comparison would typically not work as expected because a function is not directly comparable to a number.
   - By overriding `func.valueOf` to return `num`, you're telling JavaScript, "When you need to compare this function object to a number, use the value stored in `num`."

3. **How It Works in Context:**
   - `sum(1)` returns the function `func`.
   - When you do `sum(1) == 1`, JavaScript calls `func.valueOf()`, which returns `1`.
   - The comparison `1 == 1` is `true`, so the statement evaluates to `true`.

   Similarly, when you call `sum1(2) == 3`, `sum1(2)` returns a new function where `num` is `3` (since `1 + 2 = 3`). The overridden `valueOf` method returns `3`, so the comparison `3 == 3` is `true`.

This technique allows the function to "accumulate" values through repeated calls and then be compared directly to a primitive number.


</details>

<br>


> ### Q94 - Suppose we have an array of items - A, and another array of indexes in numbers - B

```js
const A = ['A', 'B', 'C', 'D', 'E', 'F']
const B = [1,   5,   4,   3,   2,   0]
```
You need to reorder A, so that the A[i] is put at index of B[i], which means B is the new index for each item of A.

For above example A should be modified inline to following
```js
['F', 'A', 'E', 'D', 'C', 'B']
```

<Details>

```js
const A = ['A', 'B', 'C', 'D', 'E', 'F'];
const B = [1, 5, 4, 3, 2, 0];

function reorderArray(A, B) {
  const C = new Array(A.length);

  // Place each element of A at the index specified by B
  for (let i = 0; i < A.length; i++) {
    C[B[i]] = A[i];
  }

  // now is C = [ 'F', 'A', 'E', 'D', 'C', 'B' ]

  // Copy the elements back to A to modify it inline
  for (let i = 0; i < A.length; i++) {
    A[i] = C[i];
  }
}

reorderArray(A, B);

console.log(A); // ['F', 'A', 'E', 'D', 'C', 'B']
```
</Details>

<br>


> ### Q95 - window.setTimeout() could be used to schedule some task in the future.

Could you implement clearAllTimeout() to clear all the timers ? This might be useful when we want to clear things up before page transition.

For example

```js
setTimeout(func1, 10000)
setTimeout(func2, 10000)
setTimeout(func3, 10000)

// all 3 functions are scheduled 10 seconds later
clearAllTimeout()

// all scheduled tasks are cancelled.
```

<details>

note

You need to keep the interface of window.setTimeout and window.clearTimeout the same, but you could replace them with new logic

**Solution-1**
```js
function clearAllTimeout() {
  // your code here
  let id = setTimeout(null, 0);
  while(id>=0){
    window.clearTimeout(id);
    id--;
  }
}
```

**Solution-2**

```js

// Create an object to keep track of all timeouts
const timeoutIds = {};

// Replace the original setTimeout with a new one that stores the timeout id
window.setTimeout = function(callback, delay) {
  const timeoutId = setTimeout(callback, delay);
  timeoutIds[timeoutId] = true;
  return timeoutId;
};

// Replace the original clearTimeout with a new one that clears all timeouts
window.clearTimeout = function(timeoutId) {
  clearTimeout(timeoutId);
  delete timeoutIds[timeoutId];
};

// Implement clearAllTimeout function that clears all timeouts
function clearAllTimeout() {
  Object.keys(timeoutIds).forEach(timeoutId => {
    clearTimeout(timeoutId);
    delete timeoutIds[timeoutId];
  });
}
```

</details>

<br>

> ### Q96 - For all the basic data types in JavaScript, how could you write a function to detect the type of arbitrary data?

**Note:**Keep in min here `typeof` will not work because array and null both show `object`

```js
detectType(1) // 'number'
detectType(new Map()) // 'map'
detectType([]) // 'array'
detectType(null) // 'null'

// more in judging step
```

<Details>

```js
function detectType(data) {
  if (data === null) {
    return 'null';
  }

  if (data === undefined) {
    return 'undefined'
  }

  return data.constructor.name.toLowerCase();
}
```
</Details>

<br>

> ### Q97 - If you did unit test before, you must be familiar with Spy.  ⭐️

You are asked to create a spyOn(object, methodName), which works the same as jest.spyOn().

To make it simple, here are the 2 requirements of spyOn

original method should be called when spied one is called
spy should have a calls array, which holds all the arguments in each call.
Code to explain everything.

```js
const obj = {
   data: 1, 
   increment(num) {
      this.data += num
   }
}

const spy = spyOn(obj, 'increment')

obj.increment(1)

console.log(obj.data) // 2

obj.increment(2)

console.log(obj.data) // 4

console.log(spy.calls)
// [ [1], [2] ]
```

<Details>

```js
function spyOn(obj, methodName) {
    // your code here
    const originalMethod = obj[methodName];
    const calls = [];
    obj[methodName] = function (...args) {
        calls.push(args);
        return originalMethod.apply(this, args);
    };
    return { calls };
}
```
</Details>

<br>

> ### Q99 - get(object, path, [defaultValue]) is a handy method to help retrieving data from an arbitrary object. if the resolved value from path is undefined, defaultValue is returned.  ⭐️

Please create your own get().

```js
const obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
}

get(obj, 'a.b.c') // [1,2,3]
get(obj, 'a.b.c.0') // 1
get(obj, 'a.b.c[1]') // 2
get(obj, ['a', 'b', 'c', '2']) // 3
get(obj, 'a.b.c[3]') // undefined
get(obj, 'a.c', 'bfe') // 'bfe'
```

<Details>

```js

function get(source, path, defaultValue = undefined) {
  // your code here
  const props = Array.isArray(path)? path: path.replaceAll('[','.').replaceAll(']','').split('.');

  // sabsko [ 'a', 'b', 'c', '1' ] or [ 'a', 'b', 'c' ] ish format me convert karna h

  let curNode = source;
  for(let i=0;i<props.length;i++){
    let k = props[i];
    if(curNode[k] === undefined) return defaultValue;
    if(i === props.length-1) return curNode[k];
    else  curNode = curNode[k];
  }
}

```
</Details>

<br>


> ### Q100 _.set(object, path, value) is a handy method to updating an object without checking the property existence. ⭐️

Can you create your own set()?

```js
const obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
}
set(obj, 'a.b.c', 'BFE')
console.log(obj.a.b.c) // "BFE"

set(obj, 'a.b.c.0', 'BFE')
console.log(obj.a.b.c[0]) // "BFE"

set(obj, 'a.b.c[1]', 'BFE')
console.log(obj.a.b.c[1]) // "BFE"

set(obj, ['a', 'b', 'c', '2'], 'BFE')
console.log(obj.a.b.c[2]) // "BFE"

set(obj, 'a.b.c[3]', 'BFE')
console.log(obj.a.b.c[3]) // "BFE"

set(obj, 'a.c.d[0]', 'BFE')
// valid digits treated as array elements
console.log(obj.a.c.d[0]) // "BFE"

set(obj, 'a.c.d.01', 'BFE')
// invalid digits treated as property string
console.log(obj.a.c.d['01']) // "BFE"
```
<Details>

```js
function set(obj, path, value) {
  path = Array.isArray(path) ? path :  path.replace('[', '.').replace(']', '').split('.');
  src = obj;
  path.forEach((key, index, array) => {
    if (index == path.length - 1) {
      src[key] = value;
    } else {
      if (!src.hasOwnProperty(key)) { // if the key doesn't exist on object
        const next = array[index + 1];
        src[key] = String(Number(next)) === next ? [] : {}; // create a new object if next is item in array is not a number
      }
      src = src[key];
    }
  })
}
```
</Details>

<br>

> ### Q102 - Given an array of numbers, pick any two numbers a and b, we could get the difference by Math.abs(a - b). ⭐️

Can you write a function to get the largest difference?

```js
largestDiff([-1, 2,3,10, 9])
// 11,  obviously Math.abs(-1 - 10) is the largest

largestDiff([])
// 0

largestDiff([1])
// 0
```
<details>

**Solution**

```js
function largestDiff(arr) {
  if(arr.length < 2) return 0
  return Math.max(...arr) - Math.min(...arr)
}
```

</details>

<br>


> ### Q103 - Please create a function count(), when called it should return how many times it has been called, count.reset() should also implemented. ⭐️

```js
count() // 1
count() // 2
count() // 3

count.reset()

count() // 1
count() // 2
count() // 3
```

<details>

```js
function count() {
  count.val = count.val || 1
  return count.val++
}

count.reset = function () {
  count.val = 1
}
```
</details>

<br>

> ### Q104 - check 2 arrays are same or not

<details>

a. when sequence matter
```js

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    
    return true;
}

const array1 = [1, 2, 3];
const array2 = [1, 2, 3];
console.log(arraysAreEqual(array1, array2)); // Output: true
```


b. When sequence do not matter

```js

function arraysHaveSameElements(array1, array2) {
    // Check if arrays have the same length
    if (array1.length !== array2.length) {
        return false;
    }
    
    // Create objects to count occurrences of elements in both arrays
    const count1 = {};
    const count2 = {};
    
    // Count occurrences in the first array
    for (const element of array1) {
        count1[element] = (count1[element] || 0) + 1;
    }
    
    // Count occurrences in the second array
    for (const element of array2) {
        count2[element] = (count2[element] || 0) + 1;
    }
    
    // Check if counts of elements in both arrays match
    for (const key in count1) {
        if (count1[key] !== count2[key]) {
            return false;
        }
    }
    
    return true;
}

const array1 = [1, 3, 2];
const array2 = [1, 2, 3];

console.log(arraysHaveSameElements(array1, array2)); // Output: true
```

</details>

<br>


> ### Q105 - Flatten array implementation - Non recursive approach. ⭐️

<details>

1) Using Stack

```js
const numbers = [1, 2, 3, [4, 5], 6, [7, [8, 9], 10]];

const flatten = function (array) {
  let stack = [...array];
  let result = [];

  while (stack.length) {
    let last = stack.pop();
    if (Array.isArray(last)) {
      stack.push(...last);
    } else {
      result.push(last);
    }
  }
  return result.reverse();
};

console.log(flatten(numbers));
```

2) Using toString()

```js
const arr = [1, 2, [3, 4], 5, [6, [7, 8], 9]];
console.log(arr.toString()); // 1,2,3,4,5,6,7,8,9
console.log(arr.toString().split(",")); // [ '1', '2', '3','4', '5', '6','7', '8', '9' ]
console.log([...arr.toString().split(",")]); // [ '1', '2', '3','4', '5', '6','7', '8', '9' ]
```

Array.prototype.flat method flattens a given array up to the given depth. By default, It takes depth as 1.

```js
💡Example -
const numbers = [1, 2, 3, [4, 5], 6, [7, [8, 9], 10]];

const result1 = numbers.flat(Infinity); // depth infinity
console.log(result1); => [ 1, 2, 3, 4, 5 , 6, 7, 8, 9 , 10 ]

const result2 = numbers.flat("1"); // depth 1 type coersion
console.log(result2); => [ 1, 2, 3, 4, 5, 6, 7, [ 8, 9 ], 10 ]

const result3 = numbers.flat(); // default depth 1
console.log(result3); => [ 1, 2, 3, 4, 5, 6, 7, [ 8, 9 ], 10 ]

const result4 = numbers.flat(2); // depth 2
console.log(result4); => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

</details>

<br>

> ### Q108 - Given a non-empty string, return the most frequently ocurring character.

If there are multiple characters with same occurrance, return an array of them.
```js
count('abbccc')
// 'c'

count('abbcccddd')
// ['c', 'd']
```

<details>

**Solution**

```js
function count(str) {
  const countMap = {};
  let maxCount = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    countMap[char] = (countMap[char] || 0) + 1;
    maxCount = Math.max(maxCount, countMap[char]);
  }
  const result = [];
  for (const char in countMap) {
    if (countMap[char] === maxCount) {
      result.push(char);
    }
  }
  return result.length === 1 ? result[0] : result;
}
```

</details>

<br>


> ### Q109 - leetcode - 415 Sum two numbers which are very large in size  ⭐️

<details>

1. To add 2 numbers we take
```
a = "987"
b = "45"
```

2. we convert above to below(make same length, add padding of '0')
```
a = "987"
b = "045"
```

3. now we iterate from end, because in normal addition we start adding from right side
```
7 + 5 = 12  → carry = 1, result = "2"
```


```js
function addLargeNumbers(a, b) {
    // Make sure a is the longer string
    if (b.length > a.length) [a, b] = [b, a];

    // Pad the shorter string with leading zeros
    b = b.padStart(a.length, '0');

    let carry = 0;
    let result = '';

    // Add digits from right to left
    for (let i = a.length - 1; i >= 0; i--) {
        let sum = parseInt(a[i]) + parseInt(b[i]) + carry;
        carry = Math.floor(sum / 10);
        result = (sum % 10) + result;
    }

    // If there's a carry left at the end, add it to the result
    if (carry > 0) {
        result = carry + result;
    }

    return result;
}

let c = "45555555555555555555555555555555555555777777772222222222222222222222222222222222222222222";
let d = "99999998888888888888888888888888888888888888888888888888888888899";

let sum = addLargeNumbers(c, d);
console.log(sum);

```

</details>

<br>


> ### Q110 - Calculate the sum of two integers a and b, without using the operator +  ⭐️

<details>

When we add two numbers we have to maintain two things
1. sum of value(8+4 => 12 ie 2)
2. carry of sum (s+4 => 12 ie 1)

**for first part, XOR (`^`) Works Like Addition Without Carrying**

**Binary Addition Rules**
| Bit A | Bit B | Sum (A + B) | Carry |
|-------|-------|------------|-------|
| 0     | 0     | 0          | 0     |
| 0     | 1     | 1          | 0     |
| 1     | 0     | 1          | 0     |
| 1     | 1     | 0          | 1 (carry) |

- Notice that in binary addition, `1 + 1 = 10`, where `0` is the sum, and `1` is the carry.
- **XOR (`^`) behaves exactly like addition but ignores the carry.**
  - `0 ^ 0 = 0`
  - `0 ^ 1 = 1`
  - `1 ^ 0 = 1`
  - `1 ^ 1 = 0` (instead of `10`, it just takes `0`)

#### **Example: `5 + 3` Using XOR**
Decimal: `5` and `3`

Binary representation:
```
  101  (5 in binary)
^ 011  (3 in binary)
-------
  110  (6 in binary)
```
- The sum bit is correct for positions where there's no carry.
- But the carry isn't included, which is why we need an additional step using `AND` (`&`) and `<<`.

---

**for second part, ie carry, We handle here**
Since XOR ignores the carry, we must calculate it separately using **AND (`&`) and Left Shift (`<<`)**:
- `a & b` finds where both bits are `1` (which would normally generate a carry).
- `<< 1` shifts the carry left so it adds to the correct place in the next iteration.

#### **Example: Calculating Carry**
```
  101  (5 in binary)
& 011  (3 in binary)
-------
  001  (1 in binary) → This is the carry
```
- Left shifting by `1` moves the carry:
```
  001 << 1  →  010 (2 in decimal)
```

Now, we repeat the process with `XOR` again until there's no carry.

---

**Conclusion**
- **XOR (`^`) acts as addition without carrying** because it mimics binary addition rules except for `1 + 1`, where it returns `0` instead of `10`.
- **To account for carry, we use `AND (&) << 1` and repeat the process until carry is 0.**


**Steps to Compute `a + b` Without Using `+`**
1. Compute `XOR` of `a` and `b`, which gives the sum without carry.
2. Compute `AND` of `a` and `b`, which finds the carry.
3. Left shift the carry by 1 to add it to the next higher bit.
4. Repeat the above steps until the carry becomes `0`.

```javascript
function add(a, b) {
    while (b !== 0) {
        let sum = a ^ b;       // Step 1: Sum without carry
        let carry = (a & b) << 1; // Step 2: Carry shifted left

        a = sum;  // Assign sum to a
        b = carry; // Assign carry to b (repeat until carry is 0)
    }
    return a;
}

// Example Usage
console.log(add(5, 3));  // Output: 8
console.log(add(-2, 3)); // Output: 1
console.log(add(7, 0));  // Output: 7
```



**Step-by-Step Example**
**Example: `5 + 3`**
Binary representations:
- `5 = 101`
- `3 = 011`

| Iteration | a (XOR result) | b (Carry shifted) |
|-----------|--------------|-----------------|
| 1st       | `110` (6)    | `010` (2)      |
| 2nd       | `100` (4)    | `100` (4)      |
| 3rd       | `000` (0)    | `1000` (8)     |
| 4th       | `1000` (8)   | `0000` (0)     |

Now `b = 0`, so the final result is `8`.
</details>

<br>


> ### Q111 - Find power of a number without using native JS function

<Details>

```js
function power (base, exponent) {
  var result = 1;
  for(var i=1; i<=exponent; i++) {
    result = result * base;
  }
  return result;
}
console.log(power(2,3));
```
</Details>

<br>

> ### Q113 - Check if a given number narcissistic number

Note:Narcissistic Number is a number that is the sum of its own digits each raised to the power of the number of digits

eg : 153 is Nacrissistic number - (3 digits), you can see 153 = 1^3 + 5^3 + 3^3

<details>

```js
isNarcissistic = num => {

  //convert the original number to string. I can do this in the below way, or using toString()
  // let numStr = '' + num;

  let numStr = num.toString();

  let numLen = numStr.length;

  let narcissisticResult = 0

  for (let i in numStr ) {
    narcissisticResult += Math.pow( parseInt(numStr[i]), numLen);
  }

  return num === narcissisticResult;
}

console.log(isNarcissistic(153));

// 153 is Nacrissistic number - (3 digits), you can see 153 = 1^3 + 5^3 + 3^3

```

</details>

<br>


> ### Q114 - The first dimension represents the activity and the second one shows the number of hours spent per day for each. calculates the percentage of the hours spent for each activity and append the percentage to the inner array.

<details>

```js
var activities = [
    ['Work', 9],
    ['Eat', 2],
    ['Commute', 2],
    ['Play Game', 2],
    ['Sleep', 7]
];

for (let i = 0; i < activities.length; i++) {
        let percentage = ((activities[i][1] / 24) * 100).toFixed();
        activities[i][2] = percentage + "%";
}

console.log(activities);

```

</details>

<br>


> ### Q115 - Given an array of non negative integers,arrange them such that they form the largest number. ⭐️

Sample input: [3, 30, 34, 5, 9],

Output number is 9534330.

<Details>

```js
function largestNumber(nums) {
  if (!nums || nums.length === 0) return "";

  // Convert numbers to strings
  nums = nums.map(String);

  // Sort the array based on the concatenated comparison
  nums.sort((a, b) => (b + a) - (a + b));

  // Join the array to form the largest number
  const result = nums.join('');

  // Handle the edge case where the result is a sequence of zeros
  return result[0] === '0' ? '0' : result;
}

// Sample input
const nums = [3, 30, 34, 5, 9];
console.log(largestNumber(nums)); // Output: "9534330"
```

The provided code snippet is a custom sorting function in JavaScript used with the `Array.prototype.sort()` method. It sorts an array of numbers (or strings that represent numbers) in a specific order based on the concatenation of the elements. Here's a detailed breakdown:

```javascript
nums.sort((a, b) => (b + a) - (a + b));
```

- `nums.sort(...)`: This calls the `sort` method on the `nums` array.
- `(a, b) => ...`: This is an arrow function that defines the comparison logic between two elements, `a` and `b`.

### Comparison Logic

1. **Concatenation of Elements**:
   - `b + a`: Concatenates `b` and `a` as strings.
   - `a + b`: Concatenates `a` and `b` as strings.

2. **Subtraction**:
   - `(b + a) - (a + b)`: Compares the two concatenated strings by their numeric values.

### Example

Let's say `nums` is an array of numbers represented as strings:

```javascript
let nums = ["3", "30", "34", "5", "9"];
```

- For `a = "3"` and `b = "30"`:
  - `b + a` results in `"303"`
  - `a + b` results in `"330"`
  - `"303" - "330"` results in a negative value, so `"3"` comes after `"30"`.

This custom comparator sorts the numbers such that the concatenation results in the largest possible combined number.

### Purpose

The purpose of this sorting function is to order the numbers in such a way that when they are concatenated, they form the largest possible number. This kind of problem is commonly encountered in coding challenges and interviews, often referred to as the "largest number" problem.

### Full Example

Here's how you might use this sorting function:

```javascript
let nums = ["3", "30", "34", "5", "9"];
nums.sort((a, b) => (b + a) - (a + b));
console.log(nums.join('')); // Outputs: "9534330"
```

In this example, the sorted array results in the string `"9534330"`, which is the largest possible number formed by concatenating the elements of the array.

</Details>

<br>

> ### Q118 - Implement a class that can subscribe to and emit events that trigger attached callback functions.

<Details>

```js
class EventEmitter {
    constructor() {
        this.events = {};
    }

    // Method to subscribe to an event
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    // Method to unsubscribe from an event
    off(event, listener) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    // Method to emit an event
    emit(event, ...args) {
        if (!this.events[event]) return;

        this.events[event].forEach(listener => {
            listener(...args);
        });
    }
}

// Example usage:
const emitter = new EventEmitter();

function onFoo(data) {
    console.log('foo event triggered with data:', data);
}

// Subscribe to the 'foo' event
emitter.on('foo', onFoo);

// Emit the 'foo' event with some data
emitter.emit('foo', { some: 'data' }); // Output: foo event triggered with data: { some: 'data' }

// Unsubscribe from the 'foo' event
emitter.off('foo', onFoo);

// Emit the 'foo' event again to show that the listener has been removed
emitter.emit('foo', { some: 'data' }); // No output

```
</Details>
<br>


> ### Q119 - Implement a debounce function that comes with a cancel method to cancel delayed invocations.

```js
function debounce(func, delay) {
    let timeoutId;

    function debounced(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    }

    debounced.cancel = function() {
        clearTimeout(timeoutId);
    };

    return debounced;
}

// Example usage:
function saveChanges(text) {
    console.log(`Saving changes for: ${text}`);
}

const debouncedSave = debounce(saveChanges, 1000);

debouncedSave('Text 1');
debouncedSave('Text 2');

// Cancelling the debounce
debouncedSave.cancel();

// This invocation will not trigger the saveChanges function because it's cancelled
debouncedSave('Text 3');

```

<br>


> ### Q120 - Implement a function to execute N async tasks in series. in js

<details>

```js
async function executeTasksInSeries(tasks) {
    for (const task of tasks) {
        await task();
    }
}

// Example usage:
const task1 = async () => {
    console.log('Task 1 started');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Task 1 completed');
};

const task2 = async () => {
    console.log('Task 2 started');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Task 2 completed');
};

const task3 = async () => {
    console.log('Task 3 started');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Task 3 completed');
};

executeTasksInSeries([task1, task2, task3]);

```

</details>

<br>


> ### Q121 - Implement a function to execute N async tasks in parallel.

<details>

```js
async function executeTasksInParallel(tasks) {
    await Promise.all(tasks.map(task => task()));
}

// Example usage:
const task1 = async () => {
    console.log('Task 1 started');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Task 1 completed');
};

const task2 = async () => {
    console.log('Task 2 started');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Task 2 completed');
};

const task3 = async () => {
    console.log('Task 3 started');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Task 3 completed');
};

executeTasksInParallel([task1, task2, task3]);

```

</details>

<br>

> ### Q122 -  Implement memoizing or caching identical API requests

<details>

```js
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
}

// Usage
fetchWithCache('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

</details>

<br>


> ### Q123 - Implement a curried function with placeholders support

```js

function curry(func) {
  const placeholder = Symbol('placeholder');
  return function curried(...args) {
    const complete = args.length >= func.length && !args.includes(placeholder);
    if (complete) {
      return func.apply(this, args);
    } else {
      return function(...nextArgs) {
        const newArgs = args.map(arg => arg === placeholder ? nextArgs.shift() : arg).concat(nextArgs);
        return curried.apply(this, newArgs);
      };
    }
  };
}

// Usage
const _ = curry.placeholder;

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(_, 2)(1)(3)); // 6
```

<br>



> ### Q124 - Implement custom Virtual DOM I which serializes and deserializes the data in valid JavaScript objects

```js
// serializes
class VNode {
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props;
    this.children = children;
  }

  serialize() {
    return JSON.stringify(this);
  }
}

// Usage
const vnode = new VNode('div', { id: 'app' }, [
  new VNode('h1', {}, ['Hello, World!']),
]);
console.log(vnode.serialize()); // {"tag":"div","props":{"id":"app"},"children":[{"tag":"h1","props":{},"children":["Hello, World!"]}]}


// deserializes
function deserializeVNode(json) {
  const obj = JSON.parse(json);
  if (typeof obj === 'string') return obj;
  const { tag, props, children } = obj;
  return new VNode(tag, props, children.map(deserializeVNode));
}

// Usage
const serialized = '{"tag":"div","props":{"id":"app"},"children":[{"tag":"h1","props":{},"children":["Hello, World!"]}]}';
const vnode = deserializeVNode(serialized);
console.log(vnode); // VNode { tag: 'div', props: { id: 'app' }, children: [ VNode { tag: 'h1', props: {}, children: [ 'Hello, World!' ] } ] }
```

<br>

> ### Q125 - Creating a counter using setTimeout in JavaScript

<details>

```js
// Initialize the counter
let count = 0;

function startCounter() {
    // Display the current count
    console.log(count);
    
    // Increment count
    count++;
    
    // Schedule the next iteration after 1 second (1000 milliseconds)
    setTimeout(startCounter, 1000);
}

// Start the counter
startCounter();
```

</details>

<br>


> ### Q126 Given an alphanumeric string, return the list of distinct numbers present in the string.
Input: "som23era23nd56omstr23ing", output: [23,56]

<details>

```js
function extractDistinctNumbers(str) {
  let currentNumber = '';
  const numbers = new Set();

  for (let char of str) {
    if (char >= '0' && char <= '9') {
      currentNumber += char;
    } else if (currentNumber !== '') {
      numbers.add(Number(currentNumber));
      currentNumber = '';
    }
  }

  if (currentNumber !== '') {
    numbers.add(Number(currentNumber));
  }

  return Array.from(numbers);
}

// Example usage
const input = "som23era23nd56omstr23ing";
console.log(extractDistinctNumbers(input)); // Output: [23, 56]
```

</details>

> ### new operator is used to create new instance objects.

Do you know exactly what new does?

You are asked to implement myNew(), which should return an object just as what new does but without using new.

Pay attention to the return type of constructor.

```js
function myNew(constructorFn, ...args) {
  const instanceObj = Object.create(constructorFn.prototype);
  const result = constructorFn.apply(instanceObj, args);
  return (typeof result === "object" && result !== null) ? result : instanceObj;
}
```

> ### hex to rcb
```js
const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return { r, g, b };
}
```

> ### rcb to hex
```js
function rgbToHex(r, g, b) {
    // Convert each component to hexadecimal and ensure two digits
    var hexR = r.toString(16).padStart(2, '0');
    var hexG = g.toString(16).padStart(2, '0');
    var hexB = b.toString(16).padStart(2, '0');
    
    // Concatenate the components to form the hexadecimal representation
    var hexColor = '#' + hexR + hexG + hexB;
    
    return hexColor;
}

// Example usage:
var red = 255;
var green = 128;
var blue = 0;

var hexColor = rgbToHex(red, green, blue);
console.log(hexColor); // Output: #ff8000
```

> ### throttle Promises

Say you need to fetch some data through 100 APIs, and as soon as possible.

If you use Promise.all(), 100 requests go to your server at the same time, which is a burden to low spec servers.

Can you throttle your API calls so that always maximum 5 API calls at the same time?

You are asked to create a general throttlePromises() which takes an array of functions returning promises, and a number indicating the maximum concurrent pending promises.

```js
throttleAsync(callApis, 5).then((data) => {
  // the data is the same as `Promise.all` 
}).catch((err) => {
  // any error occurs in the callApis would be relayed here
})
```

By running above code, at any time, no more than 5 APIs are requested, so low spec servers are saved.

```js
function throttlePromises(funcs, max){
  const results = [];
  async function doWork(iterator) {
    for (let [index, item] of iterator) {
      const result = await item();
      results[index] = result;
    }
  }
  const iterator = Array.from(funcs).entries()
  const workers = Array(max).fill(iterator).map(doWork); // maps over asynchronous fn doWork, which returns array of results for each promise
  return Promise.all(workers).then(() => results);
}
```

> ### Math.sqrt() helps us getting the square root of a number.

Can your write your own mySqrt() ? You should return the integer part only, truncating the fraction part.

```js
mySqrt(0)
// 1

mySqrt(1)
// 1

mySqrt(2)
// 1

mySqrt(4)
// 2

mySqrt(NaN)
// NaN
```

**Solution**

```js
function mySqrt(x) {
  if(x < 0 || isNaN(x) || typeof x !== 'number' ) return NaN

  let start = 0;
  let end = Math.floor(x/2)
  let ans = 1;

  while(start <= end){
    const mid = Math.floor(start + (end-start)/2)
    const square = mid*mid;
    if(square === x) return mid
    else if(square > x) end = mid-1
    else {
      ans = Math.max(mid, ans)
      start = mid+1
    }
  }
  return ans
}
```



> ### You are asked to create a function that multiplies two big integers in string.

```js
multiply(
  '1123456787654323456789', 
  '1234567887654323456'
)
// '1386983673205309924427166592431045142784'
```

**Solution is below**

```js
function multiply(num1, num2) {
  const len1 = num1.length;
  const len2 = num2.length;
  const result = new Array(len1 + len2).fill(0);

  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      const mul = (num1[i] - '0') * (num2[j] - '0');
      const sum = mul + result[i + j + 1];

      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }

  while (result.length > 1 && result[0] === 0) {
    result.shift();
  }

  return result.join('');
}

// Example usage
const num1 = '1123456787654323456789';
const num2 = '1234567887654323456';
console.log(multiply(num1, num2)); 
// Output: '1386983673205309924427166592431045142784'

```

> ### You are asked to create a BigInt division function.

```js
divide(
  '1123456787654323456789', 
  '1234567887654323456'
)
// '910'

divide(
  '-1123456787654323456789', 
  '1234567887654323456'
)
```

**Solution is below**

```js
function divide(a, b) {
    if (b === '0') {
        throw new Error('Division by zero');
    }

    // Determine the sign of the result
    let sign = '';
    if ((a[0] === '-' && b[0] !== '-') || (a[0] !== '-' && b[0] === '-')) {
        sign = '-';
    }

    // Remove sign characters for simplicity
    a = a.replace('-', '');
    b = b.replace('-', '');

    // Convert strings to arrays of digits
    const dividend = a.split('').map(Number);
    const divisor = b.split('').map(Number);

    let quotient = '';

    // Initialize dividend for long division
    let currDividend = parseInt(dividend.slice(0, divisor.length).join(''));

    for (let i = divisor.length; i <= dividend.length; i++) {
        let digit = 0;

        while (currDividend >= parseInt(b)) {
            currDividend -= parseInt(b);
            digit++;
        }

        quotient += digit;

        if (i < dividend.length) {
            currDividend = parseInt(currDividend.toString() + dividend[i]);
        }
    }

    // Remove leading zeros from the quotient
    quotient = quotient.replace(/^0+/, '');

    return sign + (quotient || '0');
}

// Test cases
console.log(divide('1123456787654323456789', '1234567887654323456')); // '910'
console.log(divide('-1123456787654323456789', '1234567887654323456')); // '-910'
console.log(divide('5', '2')); // '2'
console.log(divide('-3', '2')); // '-1'
```

> ### For tasks of string processing, in many cases we are given a string, and are asked to understand this string in specific logic and then return the result.

For example, if we are to calculate the result of following expression:

```js
 1 * (20 -   300      )
```
before we implement the logic, first we need to get the "keywords"(tokens) and ignore the spaces, like following:

```js
'1','*', '(', '20', '-', '300', ')'
```
Then we can process above tokens and get the result easier.

You are asked to implement a tokenize() for arithmetic expression , which works as below:

```js
const tokens = tokenize(' 1 * (20 -   300      ) ')


while (true) {
  let token = tokens.next()
  if (token.done) {
    break
  }
  console.log(token.value)
}
```
or you can use for ... of
```js
for (let token of tokens) {
    console.log(token)   
}
```
Because it is trivial, in a real interview you talk to interviewer and implement tokenizer later, this could save yourself some time for more important tasks.

Input

input only contains valid non-negative integers with +, -, *, /, (, ) and spaces, space should be ignored.

your method should return an Generator object.

**Solution is below**

```js
const digits = new Set('1234567890');
const operators = new Set('+-*/');
const parens = new Set('()');

function* tokenize(str) {
  for (let i = 0; i < str.length; i++) {
    if (operators.has(str[i]) || parens.has(str[i])) {
      yield str[i];
    } else if (digits.has(str[i])) {
      let num = '';
      let j = i;
      while (digits.has(str[j])) num += str[j++];
      yield num;
      i = j - 1;
    }
  }
}
```

> ### Now please create a function to generate unique class names following rules below.

only use alphabets: a to z , A to Z\
return one unique class name each time function is called\
the class name sequence should first be in order of length, then in Alphabetical order(lowercase in front).\
should provide a function to reset the sequence

```js
getUniqueClassName()
// 'a'

getUniqueClassName()
// 'b'

getUniqueClassName()
// 'c'

// skip cases till 'Y'

getUniqueClassName()
// 'Z'

getUniqueClassName()
// 'aa'

getUniqueClassName()
// 'ab'

getUniqueClassName()
// 'ac'

// skip more cases

getUniqueClassName()
// 'ZZ'

getUniqueClassName()
// 'aaa'

getUniqueClassName()
// 'aab'

getUniqueClassName()
// 'aac'

getUniqueClassName.reset()

getUniqueClassName()
// 'a'
```

**Solution is below**

```js
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let id = 0;

function getUniqueClassName() {
  let className = '';
  let num = id++;

  while (num >= 0) {
    className = chars[num % chars.length] + className;
    num = Math.floor(num / chars.length) - 1;
  }

  return className;
}

getUniqueClassName.reset = function() {
  id = 0;
}
```

> ### Here are some simple Jest test code.

```js
expect(3).toBe(3) // ✅
expect(4).toBe(3) // ❌
```

We can reverse it with not.

```js
expect(3).not.toBe(3) // ❌
expect(4).not.toBe(3) // ✅
```

Please implement myExpect() to support toBe() and also not.

**Solution**

```js
function myExpect(input) {
  // your code here
  function toBe(value, isNegate = false){
    const result = Object.is(input, value);
    if(isNegate ? result : !result) throw new Error("Test case failed");
    return true;
  }
  return {
    toBe,
    not: {
      toBe: function(value){
        return toBe(value, true)
      }
    }
  }
}
```

> ### Given a string contaning only a, b and c, remove all b and ac.
```js
removeChars('ab') // 'a'
removeChars('abc') // ''
removeChars('cabbaabcca') // 'caa'
```

**Solution**

```js
function removeChars(input) {
  let res = input
  while (res.includes("b") || res.includes("ac")) {
    if (res.includes("b")) {
      res = res.replace("b", "")
    }
    if (res.includes("ac")) {
      res = res.replace("ac", "")
    }
  }
  return res
}
```

> ### Remove duplicate no from array using the reduce

```js
const DuplicateNumbers = [1, 1, 2, 2, 3, 4, 5, 1];

const DuplicatesRemoved = DuplicateNumbers.reduce(
  (acc, curr, index, arr) => (acc.includes(curr) ? acc : [...acc, curr]),
  []
);

console.log(DuplicatesRemoved); => [ 1, 2, 3, 4, 5 ]

```

> ### Now please calculate() the result of the string. You can use the tokenizer you wrote before.

```js
calculate('1 * (20 -   300      ) ')
// -280

calculate('     1/0 ')
// Infinity
```

- the input expression is syntactically valid, containing non-negative integers, +, -, *, /, (, ) and spaces
- Don't use eval()

**Solution is below**

```js
function calculate(str) {
  function calc(start) {
    const stack = [];
    let num = 0;
    let sign  = '+';
    let lastIndex;
    let signs = new Set(['+', '-', '/', '*', ')']);
    for (let i=start; i<str.length; i++) {
      const char = str.charAt(i);
      if (char === ' ') continue;
      if (!isNaN(+char)) {
        num = num * 10 + +char;
      } else if (signs.has(char)) {
        switch (sign) {
          case '+':
            stack.push(num);
            break;
          case '-':
            stack.push(-num);
            break;
          case '*':
            stack[stack.length-1]*= num;
            break;
          case '/':
            stack[stack.length-1]/= num;
            break;
        }
        if (char === ')') {
          lastIndex = i;
          break;
        }
        sign = char;
        num = 0;
      } else if (char === '(') {
        const [newNum, index] = calc(i+1);
        i = index;
        lastIndex = i;
        num = newNum;
      }
    }
    const val = stack.reduce((accm, curr) => accm+curr, 0);
    return [val, lastIndex];
  }
  str = str + '+';
  return calc(0)[0];
}
```

> ### LazyMan is very lazy, he only eats and sleeps.

LazyMan(name: string, logFn: (log: string) => void) would output a message, the passed logFn is used.

```js
LazyMan('Jack', console.log)
// Hi, I'm Jack.
```

He can eat(food: string)

```js
LazyMan('Jack', console.log)
  .eat('banana')
  .eat('apple')
// Hi, I'm Jack.
// Eat banana.
// Eat Apple.
```

He also sleep(time: number), time is based on seconds.
```js
LazyMan('Jack', console.log)
  .eat('banana')
  .sleep(10)
  .eat('apple')
  .sleep(1)
// Hi, I'm Jack.
// Eat banana.
// (after 10 seconds)
// Wake up after 10 seconds.
// Eat Apple.
// (after 1 second)
// Wake up after 1 second.
```

He can sleepFirst(time: number), which has the highest priority among all tasks, no matter what the order is.

```js
LazyMan('Jack', console.log)
  .eat('banana')
  .sleepFirst(10)
  .eat('apple')
  .sleep(1)
// (after 10 seconds)
// Wake up after 10 seconds.
// Hi, I'm Jack.
// Eat banana
// Eat apple
// (after 1 second)
// Wake up after 1 second.
```

Please create such LazyMan()


**Solution is below**

```js
class ALazyMan {
  constructor(name, logFn) {
    this.name = name
    this.log = logFn
    
    this.normalTasks = []
    this.urgentTasks = []
    
    this.greet()
    
    setTimeout(() => {
      this._triggerNext()
    }, 0)
  }
  
  greet() {
    this.normalTasks.push(['greet'])
    return this
  }
  
  eat(food) {
    this.normalTasks.push(['eat', food])
    return this
  }
  
  sleep(time) {
    this.normalTasks.push(['sleep', time])
    return this
  }
  
  sleepFirst(time) {
    this.urgentTasks.push(['sleep', time])
    return this
  }
  
  _triggerNext() {
    let task = this.urgentTasks.shift()
    if (!task) {
      task = this.normalTasks.shift()
    }
    
    if (!task) {
      return
    }
    
    const [action, param] = task
    
    switch (action) {
      case 'greet':
        this.log(`Hi, I'm ${this.name}.`)
        this._triggerNext()
        return
      case 'eat':
        this.log(`Eat ${param}.`)
        this._triggerNext()
        return
      case 'sleep':
        setTimeout(() => {
          this.log(`Wake up after ${param} second${param > 1 ? 's' : ''}.`)
          this._triggerNext()
          return
        }, param * 1000)
    }
  }
}

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  // use 2 array to to hold tasks , one for sleepFirs, one for the other
  // return `this` for each method call
  return new ALazyMan(name, logFn)
}
```



> ### Given a time string in format HH:mm, please return the angle between hour hand and minute hand.

You should return rounded integer representing the smaller angle in degrees.

```js
angle('12:00')
// 0

angle('23:30')
// 165
```

**Solution**

```js
function angle(time) {
  // your code here
  const [hour, min] = time.split(':').map((seg) => parseInt(seg, 10))
  
  const h = (hour >= 12 ? hour - 12 : hour)
  const m = min

  const angleMin = (m / 60) * 360
  const angleHour = (h / 12) * 360 + angleMin / 12

  
  const angle = Math.abs(angleHour - angleMin)
  const finalAngle = angle > 180 ? 360 - angle : angle
  return Math.round(finalAngle)
}
```

> ### Given two sorted array of integers, please return the median.

```js
median([1,2],[3,4,5])
// 3
If there are even numbers, return the average.

median([1,2],[3,4])
// 2.5
```

**Solution**

```js
const median = (arr1, arr2) => {
  const merged = [...arr1, ...arr2].sort((a, b) => a - b)

  return merged.length % 2
    ? merged[Math.floor(merged.length / 2)]
    : (merged[merged.length / 2] + merged[merged.length / 2 - 1]) / 2
}
```

> ### There is a pile of n (n > 0) stones.

Player A and Player B take turns to pick 1 or 2 stones from the pile. A starts first.

Who picks the last stone loses the game.

Now here is the question, is there a winning strategy for A or B ? If so, returns the player name. If there is none, return null.

```js
winningStonePicking(1)
// 'B'

winningStonePicking(2)
// 'A'

winningStonePicking(3)
// 'A'

winningStonePicking(4)
// 'B'
```

**Solution**

```js
function canWinStonePicking(n) {
  if(n === 0)
  {
    return null;
  }
  return n % 3 === 1 ? 'B' : 'A';
}
// n=1 : B
// n=2 : A
// n=3 : A

// n=4 : B
// n=5 : A
// n=6 : A

// n=7 : B
// n=8 : A
// n=9 : A
```

> ### Say you have multiple versions of a program, write a program that will find and return the first bad revision given a isBad(version) function.

Versions after first bad version are supposed to be all bad versions.

notes

Inputs are all non-negative integers\
if none found, return -1

```js
function firstBadVersion(isBad) {
  // firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)

  // the check function return the first bad version
  // if version v is bad, continue to check v-1
  // else return v+1
  const check = (v) => isBad(v)?  check(v-1) : v+1;
  return (version) => {
    // if none found, return -1, else use the check function defined above
    return isBad(version)? check(version) : -1
  }
}

firstBadVersion((i) => i >= 4)(100) // expects 4

firstBadVersion((i) => i >= 4)(4)  // expects -1

firstBadVersion((i) => i >= 5)(3)  // expects -1

firstBadVersion((i) => i >= 1)(1)  // expects -1

firstBadVersion((i) => i >= 1)(2) // expects 1
```


> ### Your are given a 2-D array of characters. There is a hidden message in it.

I B C A L K A\
D R F C A E A\
G H O E L A D \
The way to collect the message is as follows

start at top left\
move diagonally down right\
when cannot move any more, try to switch to diagonally up right\
when cannot move any more, try switch to diagonally down right, repeat 3\
stop when cannot neither move down right or up right. the character on the path is the message\
for the input above, IROCLED should be returned.

notes

if no characters could be collected, return empty string

```js
function decode(message) {
  const result = [];
  let row = 0;
  let col = 0;
  while(message[row] && message[row][col]) {
    result.push(message[row][col]);
    if (message[row + 1]) {
      row++;
    } else {
      row--;
    }
    col++;
  }
  return result.join('');
}
const matrix = [
    ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
    ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
    ['G', 'H', 'O', 'E', 'L', 'A', 'D']
];
console.log(decode(matrix))
```


> ### Q10 - Merge Intervals
Input: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]\
Output: [ [1, 6], [8, 10], [15, 18]]\
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

> ### Here comes the Immutability Helper, you are asked to implement your own Immutability Helper update(), which supports following features.

- 1. {$push: array} push() all the items in array on the target.
     
    ```js
	const arr = [1, 2, 3, 4]
	const newArr = update(arr, {$push: [5, 6]})
	// [1, 2, 3, 4, 5, 6]
    ```
     
- 2. {$set: any} replace the target
     
    ```js
	 const state = {
	  a: {
	    b: {
	      c: 1
	    }
	  },
	  d: 2
	}
	
	const newState = update(
	  state, 
	  {a: {b: { c: {$set: 3}}}}
	)
	/*
	{
	  a: {
	    b: {
	      c: 3
	    }
	  },
	  d: 2
	}
	*/
    ```
     
	Notice that we could also update array elements with $set

    ```js
        const arr = [1, 2, 3, 4]
	const newArr = update(
	  arr, 
	  {0: {$set: 0}}
	)
	//  [0, 2, 3, 4]
    ```

- 3. {$merge: object} merge object to the location
       
    ```js
	const state = {
	  a: {
	    b: {
	      c: 1
	    }
	  },
	  d: 2
	}
	
	const newState = update(
	  state, 
	  {a: {b: { $merge: {e: 5}}}}
	)
	/*
	{
	  a: {
	    b: {
	      c: 1,
	      e: 5
	    }
	  },
	  d: 2
	}
	*/
    ```

- 4. {$apply: function} custom replacer
   
   ```js
	const arr = [1, 2, 3, 4]
	const newArr = update(arr, {0: {$apply: (item) => item * 2}})
	// [2, 2, 3, 4]
   ```

solution is below

```js
function update(data, command) {
  for (const [key, value] of Object.entries(command)) {
    switch (key) {
      case '$push':
        return [...data, ...value];
      case '$set':
        return value;
      case '$merge':
        if (!(data instanceof Object)) {
          throw Error("bad merge");
        }
        return {...data, ...value};
      case '$apply':
        return value(data);
      default:
        if (data instanceof Array) {
          const res = [...data];
          res[key] = update(data[key], value);
          return res;
        } else {
          return {
            ...data,
            [key]: update(data[key], value)
          }
        }
    }
  }
}

// test cases
console.log(update([1], {$push: [2, 3]})) 

console.log(update({a: [1]}, {a: {$push: [2, 3]}})) 

// $push on non-array should throw error  

console.log(update([1], {1: {$set: 2}}))  

console.log(update({a: {b: 1}}, {a: { b: {$set: 2}}})) 

console.log(update({a: {b: 1}}, {a: {$merge: {c: 3}}}))

console.log(update({a: {c: 1}}, {a: {$merge: {c: 3}}}))  

// $merge on non-object should throw error  

console.log(update([1], {0: {$apply: (item) => item * 2}})) 
```
