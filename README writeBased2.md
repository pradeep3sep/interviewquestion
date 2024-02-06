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