Refer full code in - https://github.com/jayesh2906/JavaScript-with-JC/blob/master/DSA.js

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

4. {$apply: function} custom replacer
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
update([1], {$push: [2, 3]})  

update({a: [1]}, {a: {$push: [2, 3]}})  

$push on non-array should throw error  

update([1], {1: {$set: 2}})  

update({a: {b: 1}}, {a: { b: {$set: 2}}})  

update({a: {b: 1}}, {a: {$merge: {c: 3}}})  

update({a: {c: 1}}, {a: {$merge: {c: 3}}})  

$merge on non-object should throw error  

update([1], {0: {$apply: (item) => item * 2}})  
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


> ### Shuffle algorithm
```js
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const arr = [1, 2, 3, 4];
shuffle(arr);
console.log(arr);
```

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

> ### Sort of array

```js
const array = [7, 10, 4, 3, 20, 15];

function sortArray(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  console.log(arr);
}

sortArray(array)
```

> ### Remove duplicate from array.
```js
function removeDuplicates(array) {
    const uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}

const array = [1, 2, 3, 3, 4, 5, 5];
const uniqueArray = removeDuplicates(array);
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
```

if array is sorted
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

```js
const array = [1, 2, 3, 3, 4, 5, 5];
const uniqueArray = array.filter((value, index) => array.indexOf(value) === index);
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
```


```js
const array = [1, 2, 3, 3, 4, 5, 5];
const uniqueArray = [];
array.forEach(item => {
    if (!uniqueArray.includes(item)) {
        uniqueArray.push(item);
    }
});
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
```

> ### Infinite currying

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

arr1 = [1, 2, 2, 2, 3, 4, 4, 5]\
output = [ 2, 4 ]\

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


> ### Q12 Best Time to Buy and Sell Stock:-
Input: prices = [7,1,5,3,6,4]\
Output: 5\
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\
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
arr[] = {1, 5, 7, 1}\
Output: 2\
Explanation:\ 
arr[0] + arr[1] = 1 + 5 = 6 \
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
n1 = 6; A = {1, 5, 10, 20, 40, 80}\
n2 = 5; B = {6, 7, 20, 80, 100}\
n3 = 8; C = {3, 4, 15, 20, 30, 70, 80, 120}\
Output: 20 80\
Explanation: 20 and 80 are the only\
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
Input:  arr[] = {1, 2, 3, -4, -1, 4}\
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

Input:  arr[] = 4 2 -3 1 6\
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

Arr[] = [ 6, -3, -10, 0, 2 ]\
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
a[] = {2,6,1,9,4,5,3}\
Output:\
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
Input: arr[] = {3, 1, 2, 2, 1, 2, 3, 3}, k = 2\
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
Input:\
a1[] = {11, 1, 13, 21, 3, 7}\
a2[] = {11, 3, 7, 1}\
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

const arr = [ 1, 2, 3, 2, 4, 5, 3, 2 ]\
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

> ### Q27 - Write a Code to check whether one string is a rotation of another
Input: S1 = ABCD, S2 = CDAB\
Output: Strings are rotations of each other\

Input: S1 = ABCD, S2 = ACBD\
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

> ### Q33 - Find Elements that occurred only once in the array

const a = [1, 2, 3, 4, 5, 1, 2];\
Output => [ 3, 4, 5 ]

```js
function findUniqueElements(arr) {
    const countMap = {};
    const uniqueElements = [];

    // Count occurrences of each element
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        countMap[element] = (countMap[element] || 0) + 1;
    }

    // Filter out elements that occurred only once
    for (let key in countMap) {
        if (countMap.hasOwnProperty(key) && countMap[key] === 1) {
            uniqueElements.push(parseInt(key)); // Convert key to integer if needed
        }
    }

    return uniqueElements;
}

// Example usage:
const array = [1, 2, 3, 4, 5, 1, 2, 3, 4];
console.log(findUniqueElements(array)); // Output: [5]

```


> ### Q34 -  Find maximum char from string.
const str = "hello"\
Output => l => 2

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


> ### Q35 - Check Whether Two Strings Are Anagram Of Each Other

An anagram of a string is another string that contains the same characters,\
only the order of characters can be different. For example, “abcd” and “dabc” are an anagram of each other. 

```js

function areAnagrams(str1, str2) {
    // Function to count the frequency of characters in a string
    function countCharacters(str) {
        const charCount = {};
        for (let char of str) {
            charCount[char] = (charCount[char] || 0) + 1;
        }
        return charCount;
    }

    // Count the characters in both strings
    const charCount1 = countCharacters(str1.toLowerCase());
    const charCount2 = countCharacters(str2.toLowerCase());

    // Check if both objects have the same keys and values
    if (Object.keys(charCount1).length !== Object.keys(charCount2).length) {
        return false; // Different number of unique characters
    }

    for (let char in charCount1) {
        if (charCount1[char] !== charCount2[char]) {
            return false; // Different frequencies of characters
        }
    }

    return true; // Same frequency of characters
}

// Example usage:
const string1 = "abcd";
const string2 = "dabc";
console.log(areAnagrams(string1, string2)); // Output: true
```


2) sorting and compare

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

> ### Q36 - convert a array into small chunks of given size

 const arr = [1,2,3,4,5,6,7], size of chunk = 2\
 output = [[1,2], [3,4], [5,6], [7]]

```js
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const size = 2;
  const chunks = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  console.log(chunks); // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7 ] ]
```

> ### Q40 - Array Rotation by n
const arr = [1,2,3,4,5,6] n=2\
output =>   [5,6,1,2,3,4]

Using merging arr twice
```js
const arr1 = [1, 2, 3, 4, 5, 6];
const doubleArr = [...arr1, ...arr1];
const start = arr1.length - n;
const end = start + arr1.length;

console.log(doubleArr.slice(start, end)); // [ 5, 6, 1, 2, 3, 4 ]
```

> ### Q41 - Find all permutations of string  LOGIC
 const str = "ABC"\
 output => ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]

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
        // Exclude the current character and get the rest of the string
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

> ### Q42 - Find missing number from an array 1 to n. ( sum of 1 to n and subtract all one by one to get missing number )

 const arr = [1,2,3,5,6]\
 output =>  missing number is 4

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

> ### Q44 - Remove duplicate items object from an array
const arr = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 5 }]\
output => [{ id: 1 }, { id: 2 }, { id: 5 }]

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

> ### Q45 - Check all the chars are unique in string
const str = "Jayesh"\
output => true

const str = "boss"\
output => false

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


> ### 47 - Implement Deep copy of an object ( deepClone )

const obj1 = { a: 10, b: { x: 20 } };\
const obj2 = deepClone(obj1);\
obj2.b.x = 90;

console.log(obj1); // { a: 10, b: { x: 20 } }\
console.log(obj2); // { a: 10, b: { x: 90 } }

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

> ### Q48 - String compression
const str = "aaaaaabbcc"\
output => 'a6b2c2'

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

> ### Q49 - Check two given strings are isomorphic in JavaScript
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

> ### Q50 - find count of given digit ( 0 to 9 ) in range 1 to 250
output => 4 -> 52, 9 -> 43

```js
let digit = 4;
let range = 250;
let count = 0;

function checkNumber(num) {
    while (num !== 0) {
        let r = num % 10;
        num = parseInt(num / 10);
        if (r === digit) {
            return true;
        }
    }
    return false;
}

for (let i = 1; i <= range; i++) {
    if (checkNumber(i)) {
        count++;
    }
}
console.log(count);
```

> ### Q51 - compare ONE-LEVEL object ( custom without JSON.stringify())
const obj1 = { a: 20, b:40 }\
const obj2 = { a: 20, b:40 }

```js
const obj1 = { a: 20, b: 40 };
const obj2 = { a: 20, b: 40 };
const obj3 = { a: 20, b: 50 };

function compareObj(o1, o2) {
    let props1 = Object.keys(o1);
    let props2 = Object.keys(o2);

    if (props1.length !== props2.length) {
        return false;
    }

    for (let prop of props1) {
        if (o1[prop] !== o2[prop]) {
            return false;
        }
    }

    return true;
}

console.log(compareObj(obj1, obj2)); // true
console.log(compareObj(obj1, obj3)); // true
```

> ### Q52 -  Find all subsets of an array
const arr = [1, 2, 3];\
output => [ [], [ 1 ], [ 2 ], [ 1, 2 ], [ 3 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ]

```js
function generateSubsets(arr) {
    const subsets = [[]];

    function generate(index, currentSubset) {
        for (let i = index; i < arr.length; i++) {
            currentSubset.push(arr[i]);
            subsets.push([...currentSubset]);
            generate(i + 1, currentSubset);
            currentSubset.pop();
        }
    }

    generate(0, []);

    return subsets;
}

const arr = [1, 2, 3];
console.log(generateSubsets(arr));
```

> ### 53 - Filter array of objects with exclude array

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

> ### 54 - Moving selected item at the end of an array ( move all 0 to end I.M.P )
const arr = [1, 2, 3, 4, 3, 5, 3, 6, 7]; selected item = 3\
output => [1, 2, 4, 5, 6, 7, 3, 3, 3];

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

> ### Q55 - write a program to print the first non-repeated number in an array.
const arr = [1, 2, 3, 1, 2, 4, 5]\
output => 3

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

> ### Q56 -  Find all the common elements from the arrays ( not sorted ) .
const arr = [1, 100, 10, 20, 50];\
const arr1 = [2, 30, 21, 10, 20];\
output :- [ 10, 20 ]

```js
const arr = [1, 100, 10, 20, 50];
const arr1 = [2, 30, 21, 10, 20];

const set = new Set(arr);
const commonElements = arr1.filter(item => set.has(item));

console.log(commonElements); // Output: [10, 20]
```

```js
function findCommonElements(arr1, arr2) {
    const common = [];
    const map = {};
    
    // Populate map with elements from arr1
    for (const num of arr1) {
        map[num] = true;
    }
    
    // Iterate through arr2 and check if elements exist in the map
    for (const num of arr2) {
        if (map[num]) {
            common.push(num);
            // Remove the element from map to avoid duplicates
            delete map[num];
        }
    }
    
    return common;
}

const arr = [1, 100, 10, 20, 50];
const arr1 = [2, 30, 21, 10, 20];

const commonElements = findCommonElements(arr, arr1);
console.log(commonElements); // Output: [10, 20]
```

> ### 57 - Array of objects manipulatiion.
a) declare array of employees & sort them in ascending order (empId)\
b) declare an array of employees & sort them in ascending order by name.\
c) declare array of employees & filter the employees whose sal>6000;\
d) declare array of employees & increase sal of every employee by 500;\
e) declare array of employees & add "comp:ibm" to every employee;

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


> ### Q58 - Add Dept info for each employee.

```js
const employees = [
    { eId: 101, name: "sanjay", sal: 5000, gender: "male" },
    { eId: 104, name: "reena", sal: 8000, gender: "female" },
];

const departments = [
    { eId: 101, dept: "sales" },
    { eId: 104, dept: "manager" },
];

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

> ### Q59 - WAP to print Account number
input:- '12345678987'\
output:- '12*******87'

```js
let accountNo = "12345678987";
accountNo = accountNo.split("");
for (let i = 2; i < accountNo.length - 2; i++) {
    accountNo[i] = "*";
}
console.log(accountNo.join(""));
```

> ### Q60 - WAP to print Credit-card number
input:- '1111222233334444'\
output:- '1111-2222-3333-4444'

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

> ### Q61 - WAP to remove special character from a string
input:- 'hello@#hi&'\
output:- 'hellohi'

```js
const str = "hello@#hi&";
console.log(str.replace(/[^a-zA-Z0-9 ]/g, ""));
```

> ### Q62 - WAP to move all the special characters to the end of the string

input:- 'hello@#hi&'\
output:- 'hellohi@#&'

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

> ### Q63 - Covert char into word
const input = ["c", "a", "k", "e", "", "e", "a", "t", "", "m", "a", "t", "e", "" ];\
output => ["cake", "eat", "mate"];

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

> ### Q64 - String Capatalize

let arr = ["jayesh choudhary", "ankit sharma"];\
Output: JayeshChoudhary , AnkitSharma

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

> ### Q65 - Rearrange array of Objects
/* 
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

> ### Q66 - Mapping array
 
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

> ### Q67 - Find peak elements from an array, An element is called a peak element if its value is not smaller than the value of its adjacent elements(if they exists).

const arr = [1, 2, 3, 77, 6, 99, 2];\
output :- [ 77, 99 ]

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

> ### Q68 - find continuous sub-array which adds up to a given number.

A[] = [1,2,3,7,5] , S = 12\
Output: [ 2, 3, 7 ], [ 7, 5\ ]
Explanation: The sum of elements from 2nd position to 4th position is 12. 

```js
function findSubArrayWithSum(arr, targetSum) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum === targetSum) {
        result.push(arr.slice(i, j + 1));
      }
    }
  }
  return result;
}

const arr = [1, 2, 3, 7, 5];
const targetSum = 12;
const subArrays = findSubArrayWithSum(arr, targetSum);
console.log(subArrays); // Output: [ [ 2, 3, 7 ], [ 7, 5 ] ]

```

> ### Q69 - Panagram Checking:- A pangram is a sentence containing every letter in the English Alphabet ( A to Z )

Input: S = Bawds jog, flick quartz, vex nymph\
Output: 1\
Explanation: In the given input, there are all the letters of the English alphabet. Hence, the output is 1.

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

> ### Q70 - Print all subsequences of a string

Input : abc\
Output : a, b, c, ab, bc, ac, abc

Input : aaa\
Output : a, a, a, aa, aa, aa, aaa

using recursion

```js
function generateSubsequences(str, index = 0, current = '') {
    const n = str.length;

    // Base case: if index has reached the end of the string
    if (index === n) {
        if (current !== '') {
            console.log(current); // Print the current subsequence
        }
        return;
    }

    // Case 1: Include current character in the subsequence
    generateSubsequences(str, index + 1, current + str[index]);

    // Case 2: Exclude current character from the subsequence
    generateSubsequences(str, index + 1, current);
}

// Test cases
console.log("Input: abc");
generateSubsequences("abc");

console.log("\nInput: aaa");
generateSubsequences("aaa");
```

without recursion

```js
function generateSubsequences(str) {
    const subsequences = [''];
    for (let i = 0; i < str.length; i++) {
        const currentCharacter = str[i];
        const currentLength = subsequences.length;
        for (let j = 0; j < currentLength; j++) {
            subsequences.push(subsequences[j] + currentCharacter);
        }
    }
    // Sort if you want the subsequences to be in lexicographical order
    subsequences.sort();
    // Print the subsequences
    subsequences.forEach(sub => console.log(sub));
}

// Example usage:
generateSubsequences("abc");

```



> ### Q71 -  Program to convert time from 12 hour to 24 hour format

Input : 07:05:45PM\
Output : 19:05:45

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


> ### 72 -  Program to calculate the number of days between two dates
var date1 = new Date("06/30/2019");\
var date2 = new Date("07/30/2019");\
output => 30 

```js
const date1 = new Date("06/29/2019");
const date2 = new Date("07/30/2019");

timeDifference = date2.getTime() - date1.getTime();
//--------------------------- sec   min   hr   day
const day = timeDifference / (1000 * 60 * 60 * 24);
console.log(day);
```

> ### Q74 - Print the middle character of the word. If the word's length is odd, return the middle character. If the word's length is even, return the middle 2 characters.

"test" => "es"\
"testing" => "t"\
"middle" => "dd"\
"A" => "A"


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

> ### Q75 -  Remove given character from string.

const str = "Jayesh";\
const char = "a";\
output = "Jyesh";

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

> ### Q76 - Spell out numbers ( convert numbers which are less than 100 into words ).

spellNumber(50) => 'Fifty'\
spellNumber(99) => 'Ninety Nine'\
spellNumber(14632) => 'Fourteen Thousand Six Hundred Thirty Two'\
spellNumber(7483647) => 'Seventy Four Lakh Eighty Three Thousand Six Hundred Forty Seven'\
spellNumber(997751076) => 'Ninety Nine Crore Seventy Seven Lakh Fifty One Thousand Seventy Six'\

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


> ### Q77 - Array of objects Manipulation

const portfolio = [\
  { name: "Mark", stock: "FB" },\
  { name: "Steve", stock: "AAPL" },\
  { name: "Tim", stock: "AAPL" },\
  { name: "Steve", stock: "MSFT" },\
  { name: "Bill", stock: "MSFT" },\
  { name: "Bill", stock: "AAPL" },\
];

Output \
const shareholder = [\
  { stock: "AAPL", name: ["Steve", "Bill", "Tim"], count: 3 },\
  { stock: "MSFT", name: ["Steve", "Bill"], count: 2 },\
  { stock: "FB", name: ["Mark"], count: 1 },\
];

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

portfolio.forEach(({ name, stock }) => {
  if (!shareholderObj[stock]) {
    shareholderObj[stock] = { stock, name: [name], count: 1 };
  } else {
    if (!shareholderObj[stock].name.includes(name)) {
      shareholderObj[stock].name.push(name);
      shareholderObj[stock].count++;
    }
  }
});

const shareholder = Object.values(shareholderObj);

console.log(shareholder);
```

> ### Q78 - Finding sum of digits of a number until sum becomes single digit
const "5431" => "13" => "4"

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

> ### Q79 -  Find sum of numbers occurred only once in the array ( using only one loop )

const array = [2, 5, 4, 4, 6, 5, 4, 7, 6];\
output => 2 + 7 => 9

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

> ### Q80 - Find the smallest positive number missing from an unsorted array

const arr1 = [2, 3, 7, 6, 8, -1, -10, 15]; // 1\
const arr2 = [2, 3, -7, 6, 8, 1, -10, 15]; // 4\
const arr3 = [1, 1, 0, -1, -2]; // 2\
const arr4 = [3, 2, 1, 4, 5]; // 6

```js
function smallestMissingPositive(arr) {
    const n = arr.length;
    let present = Array(n + 1).fill(false);

    // Mark elements that are positive and within the range of the array size
    for (let i = 0; i < n; i++) {
        if (arr[i] > 0 && arr[i] <= n) {
            present[arr[i]] = true;
        }
    }

    // Find the smallest positive number missing
    for (let i = 1; i <= n; i++) {
        if (!present[i]) {
            return i;
        }
    }

    // If all positive integers are present, return the next positive integer
    return n + 1;
}

// Test cases
const arr1 = [2, 3, 7, 6, 8, -1, -10, 15]; // 1
const arr2 = [2, 3, -7, 6, 8, 1, -10, 15]; // 4
const arr3 = [1, 1, 0, -1, -2]; // 2
const arr4 = [3, 2, 1, 4, 5]; // 6

console.log(smallestMissingPositive(arr1)); // Output: 1
console.log(smallestMissingPositive(arr2)); // Output: 4
console.log(smallestMissingPositive(arr3)); // Output: 2
console.log(smallestMissingPositive(arr4)); // Output: 6
```

> ### Q81 - compare nested object ( custom without JSON.stringify())

const obj1 = { a: 20, b: { x: 40, y: 60 } };\
const obj2 = { a: 20, b: { x: 40, y: 60 } };

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

> ### Q84 - Find the 3rd min element of an array without using index and sorting

const arr = [7, 10, 4, 3, 20, 15]\
output => 7 

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


> ### Q85 - Given an array of string return group of anagrams string array

const arr = ["eat", "tea", "ate", "ball", "dna", "and"]\
output => [ [ 'eat', 'tea', 'ate' ], [ 'ball' ], [ 'dna', 'and' ] ]

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

> ### Q87 - Given a positive integer N as input , print first N prime numbers

Input  : 5, Output : [2,3,5,7,11]\
Input  : 0, Output : []

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



> ### Q88 - Given a string as input, Return a string without duplicates in the same order of occurrence appended with positions of first occurrence of duplicate characters.

Input  : Banana, Output : Ban12\
Input  : Jayesh, Output : Jayesh

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

> ### Q89 -  Implement the chessBoard pattern
W B W B W B W B\
B W B W B W B W\
W B W B W B W B\
B W B W B W B W\
W B W B W B W B\
B W B W B W B W\
W B W B W B W B\
B W B W B W B W


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

> ### Q90 - longest_Substring-of-two-strings.js

```js

function longestCommonSubstring(str1, str2) {
    let longestSubstring = '';
    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            let k = 0;
            while (str1[i + k] === str2[j + k]) {
                k++;
                if (i + k >= str1.length || j + k >= str2.length) break;
            }
            if (k > longestSubstring.length) {
                longestSubstring = str1.substring(i, i + k);
            }
        }
    }
    return longestSubstring;
}

// Example usage:
const str1 = 'abcdxyz';
const str2 = 'xyzabcd';
console.log(longestCommonSubstring(str1, str2)); // Output: 'abcd'

```

> ### Q91 - shift-each-letter-by-number.-of-position.js

```js
/* how to shift each letter in the given string N places down in the alphabet? Punctuation, spaces, and capitalization should remain intact. For example if the string is "ac" and num is 2 the output should be "ce".  */

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

> ### Q92 - Find the length of the longest substring in the given string s that is the same in reverse.
As an example, if the input was “I like racecars that go fast”, the substring (racecar) length would be 7.
If the length of the input string is 0, return value must be 0.
Example:
"a" -> 1
"aab" -> 2
"abcde" -> 1
"zzbaabcd" -> 4

```js
function longestPalindromeSubstring(s) {
    if (s.length === 0) return 0;

    let maxLength = 1;

    // Function to check if a substring is a palindrome
    function isPalindrome(str) {
        return str === str.split('').reverse().join('');
    }

    // Iterate through all possible substrings
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            let substr = s.substring(i, j);
            if (isPalindrome(substr) && substr.length > maxLength) {
                maxLength = substr.length;
            }
        }
    }

    return maxLength;
}

// Test cases
console.log(longestPalindromeSubstring("a"));        // Output: 1
console.log(longestPalindromeSubstring("aab"));      // Output: 2
console.log(longestPalindromeSubstring("abcde"));    // Output: 1
console.log(longestPalindromeSubstring("zzbaabcd")); // Output: 4
```

> ### Q93 - Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.
For example://
uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
uniqueInOrder([1,2,2,3,3])       == [1,2,3]*/

```js
var uniqueInOrder=function(iterable){
  var array = [],
      len = iterable.length;

    for(var i = 0; i < len; i++) {
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

> ### Q94 - Implement a function that adds two numbers together and returns their sum in binary. The conversion can be done before, or after the addition.The binary number returned should be a string.

```js
// normal
function addBinary(a,b){
  let decSum = a + b;
  return decSum.toString(2);
}

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

// console.log(addBinaryAlt(5, 6));
console.log(addBinaryAlt(5, 6));

```

> ### Q95 - Your goal is to return multiplication table for number that is always an integer from 1 to 10.

For example, a multiplication table (string) for number == 5 looks like below:

1 * 5 = 5/
2 * 5 = 10/
3 * 5 = 15/
4 * 5 = 20/
5 * 5 = 25/
6 * 5 = 30/
7 * 5 = 35/
8 * 5 = 40/
9 * 5 = 45/
10 * 5 = 50/
P. S. You can use \n in string to jump to the next line.

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


// other

function multiTable(number) {
  return [...Array(10)].map((currentNumber, index) => `${index + 1} * ${number} = ${ (index + 1) * number}`).join('\n');
}

```



```js
// Below is for the fibonacci number
// Same as above, using ternary operator - AND THIS IS THE STANDARD SOLUTION
fibonacci = n => {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci1(n - 2)
}

// below is without recursion
n_th_fibonacci = n => {
  let [a, b] = [0, 1]

  while (--n) {
    ;[a, b] = [b, b + a]
  }
  return b
}
```


> ### To print 1 to 5 with different cases

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
find-closest-number-in-array.js

```js
// Find the number in an array that is closest to a given number

// sort based on distance from the reference value num, and then take the first item.
closestNumInArr = (arr, num) => {
	return arr.sort((a, b) => Math.abs(num - a) - Math.abs(num - b))[0];
}

console.log(closestNumInArr([5,10,15,20,25,30,35], 22));
```

> ### find-length-of-integer-without-converting-to-string

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

> ### flatten my deep object to one level depth.

```js
const input = {
  user: {
    key_value_map: {
      CreatedDate: "123424",
      Department: {
        Name: "XYZ",
      },
    },
  },
}

//  Expected output:

{
    "user.key_value_map.CreatedDate": "123424",
    "user.key_value_map.Department.Name": "XYZ"
}
```


```js
const input = {
  user: {
    key_value_map: {
      CreatedDate: "123424",
      Department: {
        Name: "XYZ",
      },
    },
  },
}

const flattenObject = obj => {
  let flattened = {}
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue // ie. if the object does not have the 'i' property as its own property, ie. the object does not have any property to enumerate

    if (typeof obj[i] === "object" && obj[i] !== null) {
      var flatObject = flattenObject(obj[i])
      for (let j in flatObject) {
        if (!flatObject.hasOwnProperty(j)) continue
        flattened[i + "." + j] = flatObject[j]
      }
    } else {
      flattened[i] = obj[i]
    }
  }
  return flattened
}

console.log(flattenObject(input))
```

> ### The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

```js
maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// should be 6: [4, -1, 2, 1]
Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.
*/

// My Solution
var maxSequence = function(arr){
var now = 0, prev = 0;
 for(var i = 0; i< arr.length; i++){
   prev = Math.max(0, prev + arr[i]);
   now = Math.max(prev, now);
 }
 return now;
}

// Test cases

console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
```

> ### One of the differences between null and undefined is how they are treated differently in JSON.stringify().

``
JSON.stringify({a: null})      // '{"a":null}'
JSON.stringify({a: undefined}) // '{}'

JSON.stringify([null])         // '[null]'
JSON.stringify([undefined])    // '[null]'
```
This difference might create troubles if there are missing alignments between client and server. It might be helpful to enforce using only one of them.

You are asked to implement `undefinedToNull()` to return a copy that has all undefined replaced with null.

undefinedToNull({a: undefined, b: 'BFE.dev'})\
// {a: null, b: 'BFE.dev'}

undefinedToNull({a: ['BFE.dev', undefined, 'bigfrontend.dev']})\
// {a: ['BFE.dev', null, 'bigfrontend.dev']}


solution

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

> ### Please implement a curry() function, which accepts a function and return a curried one.

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

solution

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

> ### There is already Array.prototype.flat() in JavaScript (ES2019), which reduces the nesting of Array.

Could you manage to implement your own one?

Here is an example to illustrate
```
const arr = [1, [2], [3, [4]]];

flat(arr)
// [1, 2, 3, [4]]

flat(arr, 1)
// [1, 2, 3, [4]]

flat(arr, 2)
// [1, 2, 3, 4]
```

solution 

```js
function flat(arr, depth = 1) {
    const result = [];

    for (const item of arr) {
        if (Array.isArray(item) && depth > 0) {
            result.push(...flat(item, depth - 1));
        } else {
            result.push(item);
        }
    }
    return result;
}

const arr = [1, [2], [3, [4]]];
console.log(flat(arr)); // [1, 2, 3, [4]]
console.log(flat(arr, 1)); // [1, 2, 3, [4]]
console.log(flat(arr, 2)); // [1, 2, 3, [4]]
```


> ### I believe you've used jQuery before, we often chain the jQuery methods together to accomplish our goals.

For example, below chained call turns button into a black button with white text.

```js
$('#button')
  .css('color', '#fff')
  .css('backgroundColor', '#000')
  .css('fontWeight', 'bold')
```
The chaining makes the code simple to read, could you create a simple wrapper $ to make above code work as expected?

The wrapper only needs to have css(propertyName: string, value: any)

**Solution**

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

> ### There is Event Emitter in Node.js, Facebook once had its own implementation but now it is archived.

You are asked to create an Event Emitter Class

```js
const emitter = new Emitter()
```

It should support event subscribing
```js
const sub1  = emitter.subscribe('event1', callback1)
const sub2 = emitter.subscribe('event2', callback2)

// same callback could subscribe 
// on same event multiple times
const sub3 = emitter.subscribe('event1', callback1)
```
emit(eventName, ...args) is used to trigger the callbacks, with args relayed

```js
emitter.emit('event1', 1, 2);
// callback1 will be called twice
```

Subscription returned by subscribe() has a release() method that could be used to unsubscribe

```js
sub1.release()
sub3.release()
// now even if we emit 'event1' again, 
// callback1 is not called anymore
```

**Solution**

```js
class EventEmitter {

  constructor() {
    this.subs = {};
  }

  subscribe(eventName, callback) {
    this.subs[eventName] ??= new Map();

    const key = Symbol();
    this.subs[eventName].set(key, callback);

    return {
      release: () => {
        this.subs[eventName].delete(key);
      }
    }
  }
  
  emit(eventName, ...args) {
    for(const callback of this.subs[eventName].values()) {
      try {
        callback(...args);
      } catch (e) {
        // Make sure to catch any errors - I was asked this in interview
      }
    }
  }
}

```


> ### For all the basic data types in JavaScript, how could you write a function to detect the type of arbitrary data?

Besides basic types, you need to also handle also commonly used complex data type including Array, ArrayBuffer, Map, Set, Date and Function

The goal is not to list up all the data types but to show us how to solve the problem when we need to.

The type should be lowercase

```js
detectType(1) // 'number'
detectType(new Map()) // 'map'
detectType([]) // 'array'
detectType(null) // 'null'

// more in judging step
```

**Solution**

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

> ### Create a sum(), which makes following possible

```js
const sum1 = sum(1)
sum1(2) == 3 // true
sum1(3) == 4 // true
sum(1)(2)(3) == 6 // true
sum(5)(-1)(2) == 6 // true
```

**Solution**

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

`func.valueOf = () => num;` This line adds a custom valueOf method to the func function object. The valueOf method is a default method in JavaScript that is called when the object is to be converted to a primitive value. In this case, it simply returns the num value associated with the func function.

In simple words, in curry we have  sum(1)(2)(), but in above we have sum(1)(2), so for this we have used func.valueOf = () => num; the valueof is directly called by js itself due to which we do not need to use call function in end


> ### Suppose we have an array of items - A, and another array of indexes in numbers - B

```js
const A = ['A', 'B', 'C', 'D', 'E', 'F']
const B = [1,   5,   4,   3,   2,   0]
```
You need to reorder A, so that the A[i] is put at index of B[i], which means B is the new index for each item of A.

For above example A should be modified inline to following
```js
['F', 'A', 'E', 'D', 'C', 'B']
```
The input are always valid.

follow-up

It is fairly easy to do this by using extra O(n) space, could you solve it with O(1) space?

```js
function sort(items, newOrder) {
  let i=0;
  while (i<items.length) {
    if (i!=newOrder[i]) {
      let newIndex = newOrder[i]; 
      [items[i], items[newIndex]] = [items[newIndex], items[i]];
      [newOrder[i], newOrder[newIndex]] = [newOrder[newIndex], newOrder[i]];
    }
    i++;
  }
}
```

> ### The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the target object. (source: MDN)

It is widely used, Object Spread operator actually is internally the same as Object.assign() (source). Following 2 lines of code are totally the same.

```js
let aClone = { ...a };
let aClone = Object.assign({}, a);
```
This is an easy one, could you implement Object.assign() with your own implementation ?

note

Don't use Object.assign() in your code It doesn't help improve your skills

**Solution**

```js
function objectAssign(target, ...sources) {
  if(target == null) {
    throw Error();
  }
  
  target = Object(target);

  for (let source of sources) {
    if(source == null) continue;

    merge(Object.keys(source), source);
    merge(Object.getOwnPropertySymbols(source), source);
  }

  function merge(keys = [], currSource) {
    for (let key of keys) {
      target[key] = currSource[key];
      if(target[key] !== currSource[key]) {
        throw Error();
      }
    }
  }

  return target;
}
```

> ### window.setTimeout() could be used to schedule some task in the future.

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

> ### If you did unit test before, you must be familiar with Spy.

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

**Solution** 

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

> ### Can you create a range(from, to) which makes following work?
```js
for (let num of range(1, 4)) {
  console.log(num)  
}
// 1
// 2
// 3
// 4
```
This is a simple one, could you think more fancy approaches other than for-loop?

Notice that you are not required to return an array, but something iterable would be fine.

**Solution**

```js

// 1. for loop approach
function range(from, to) {
  // return the result array
  const result = []
  while (from <= to) {
    result.push(from++)
  }
  return result
}


// 2. implement iterable/iterator protocol
// for ... of uses interable protocol
// [Symbol.iterator]: () =>  Iterator
// next: () => {done: bolean, value?: any} 

function range(from, to) {
  return {
    // iterable protocol
    [Symbol.iterator]() {
      // iterator protocol
      return {
        next() {
          return {
            done: from > to,
            value: from++
          }
        }
      }
    }
  }
}


// 3. use geneator function to make things simpler
// geneator function returns generator which implements iterator protocol
function range(from, to) {
  return {
    // iterable protocol
    [Symbol.iterator]: function * () {
      while (from <= to) {
        yield from++
      }
    }
  }
}

// 4. actualy geneator also implements iterable protocol
function range(from, to) {
  return (function * () {
    while (from <= to) {
      yield from++
    }
  })(from, to)
}

// 5. maybe just change the entry function?
function * range(from, to) {
  while (from <= to) {
    yield from++
  }
}


// 6.
const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => i + from)
```

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


> ### _.get(object, path, [defaultValue]) is a handy method to help retrieving data from an arbitrary object. if the resolved value from path is undefined, defaultValue is returned.

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


**Solutions is below**

```js

function get(source, path, defaultValue = undefined) {
  // your code here
  const props = Array.isArray(path)? path: path.replaceAll('[','.').replaceAll(']','').split('.');
  let curNode = source;
  for(let i=0;i<props.length;i++){
    let k = props[i];
    if(curNode[k] === undefined) return defaultValue;
    if(i === props.length-1) return curNode[k];
    else  curNode = curNode[k];
  }
}

```


> ### longest substring with unique characters

Given a string, please find the longest substring that has no repeated characters.

If there are multiple result, any one substring is fine.

```js
longestUniqueSubstr('aaaaa')
// 'a'
longestUniqueSubstr('abcabc')
// 'abc', or 'bca', or 'cab'
longestUniqueSubstr('a12#2')
// 'a12#
```

**Solution**

```js
function longestUniqueSubstr(str) {
  let maxLength = 0;
  let maxSubstr = "";
  let currSubstr = "";
  let seenChars = {};

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (!seenChars[char]) {
      seenChars[char] = true;
      currSubstr += char;
      if (currSubstr.length > maxLength) {
        maxLength = currSubstr.length;
        maxSubstr = currSubstr;
      }
    } else {
      let prevOccurrence = str.lastIndexOf(char, i - 1);
      currSubstr = str.slice(prevOccurrence + 1, i + 1);
      seenChars = {};
      for (let j = prevOccurrence + 1; j <= i; j++) {
        seenChars[str[j]] = true;
      }
    }
  }
  return maxSubstr;
}
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

> ### Generate Fibonacci Number you are asked to create a fib(n).

This could be simply done by a recursion, but it costs so much time that your browser freezes, don't try it with large numbers.

const fib = (n) => {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}

fib(10) // 55
fib(1000) // timeout
Can you improve above implementation to make it work for fib(1000) ? recursion should still be used.

**Solution**

```js
const fib = (() => {
  const memo = {};

  const fibonacci = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    if (memo[n]) {
      return memo[n];
    } else {
      memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
      return memo[n];
    }
  };

  return fibonacci;
})();

console.log(fib(10));   // 55
console.log(fib(1000)); // 4.346655768693743e+208
```

**another method**

```js
const fib = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;

  const fibArray = [0, 1];
  for (let i = 2; i <= n; i++) {
    fibArray[i] = fibArray[i - 1] + fibArray[i - 2];
  }
  
  return fibArray[n];
};

console.log(fib(10));   // 55
console.log(fib(1000)); // 4.346655768693743e+208
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


> ### Given an array of integers, find two number that sums up to 0, return their indices.

There might be multiple pairs, any of them would do. If not found, return null

```js
findTwo([1,2,3,-1])
// [0,3]

findTwo([1,2,3,-1,-2,0])
// [0,3] or [1,4] or [5, 5]

findTwo([1,2,3,4])
// null
```

**Solution**

```js
function findTwo(arr) {
  const obj = {};
  for(let i in arr) obj[arr[i]] = i;
  for(let key in obj){
    if(obj[-key]) return [obj[key], obj[-key]]
  }

  return null;
}
```

> ### Given an array of numbers, pick any two numbers a and b, we could get the difference by Math.abs(a - b).

Can you write a function to get the largest difference?

```js
largestDiff([-1, 2,3,10, 9])
// 11,  obviously Math.abs(-1 - 10) is the largest

largestDiff([])
// 0

largestDiff([1])
// 0
```

**Solution**

```js
function largestDiff(arr) {
  if(arr.length < 2) return 0
  return Math.max(...arr) - Math.min(...arr)
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
function multiply(a, b) {
  let sign = ''

  if (a === '0' || b === '0') return '0';

  if(a[0] === '-' && b[0] !== '-') {
    sign = '-'
    a = a.substr(1)
  } else if (a[0] !== '-' && b[0] === '-') {
    sign = '-'
    b = b.substr(1)
  } else if (a[0] === b[0] && a[0] === '-') {
    a = a.substr(1);
    b = b.substr(1);
  }

  let result = new Array(a.length + b.length).fill(0)

  for(let i = a.length -1; i >= 0; i --) {
    for(let j = b.length -1; j >= 0; j--) { 
      const m = i + j + 1
      const n = i + j

      const s = (+a[i]) * (+b[j]) + result[m] 
      result[m] = s % 10
      result[n] += Math.floor(s / 10)
    }
  }

  while (result[0] === 0) {
    result.shift()
  }

  return sign + result.join('')
}
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

