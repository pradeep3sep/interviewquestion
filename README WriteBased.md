> ### Polyfill for the call,apply and bind

```js
getPlayerInfo = function (role, country) {
    return `${this.firstName} ${this.lastName}, ${role} from ${country}`;
};

const player1 = {
    firstName: "Virat",
    lastName: "Kohli",
};

const player2 = {
    firstName: "Hardik",
    lastName: "Pandya",
};

console.log(getPlayerInfo.call(player1, "Batsman", "India"));
console.log(getPlayerInfo.bind(player1, "All-Rounder", "India")());
console.log(getPlayerInfo.apply(player1, ["All-Rounder", "India"]));

Function.prototype.myBind = function(scope, ...args){
    scope._this = this
    console.log("nn",scope);
    return function(){
        return scope._this(...args)
    }
}


Function.prototype.myCall = function(scope, ...args){
    scope._this = this
    return scope._this(...args)
}


Function.prototype.myApply = function(scope, args){
    scope._this = this
    return scope._this(...args)
}

console.log(getPlayerInfo.myCall(player2, "Batsman", "India"));
console.log(getPlayerInfo.myBind(player2, "All-Rounder", "India")());
console.log(getPlayerInfo.myApply(player2, ["All-Rounder", "India"]));
```

> ### How do you create your own bind method using either call or apply method?

```js
Function.prototype.myOwnBind = function (whoIsCallingMe) {
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as it's not callable");
  }
  const boundTargetFunction = this;
  return function () {
    boundTargetFunction.apply(whoIsCallingMe, arguments);
  };
};
```


> ### Polyfill for the includes

```js

const numbers = [1, 2, 5, 3, 4, 5, 6];

Array.prototype.customIncludes = function (value, fromIndex) {
  if (fromIndex === undefined || isNaN(fromIndex)) {
    fromIndex = 0;
  }
  if (fromIndex < 0) {
    fromIndex += this.length;
  }
  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === value) {
      return true;
    }
  }
  return false;
};


const resultCustom1 = numbers.customIncludes(5);
console.log("resultCustom1", resultCustom1); // true

const resultCustom2 = numbers.customIncludes();
console.log("resultCustom2", resultCustom2); // false

const resultCustom3 = numbers.customIncludes(5, 6);
console.log("resultCustom3", resultCustom3); // false

const resultCustom4 = numbers.customIncludes(5, -2);
console.log("resultCustom4", resultCustom4); // true

const resultCustom5 = numbers.customIncludes("5");
console.log("resultCustom5", resultCustom5); // false
```


> ### Polyfill of Index-of

```js

const numbers = [1, 2, 5, 3, 4, 5, 6];

Array.prototype.customIndexOf = function (value, fromIndex) {
  if (fromIndex === undefined || isNaN(fromIndex)) {
    fromIndex = 0;
  }
  if (fromIndex < 0) {
    fromIndex += this.length;
  }
  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === value) {
      return i;
    }
  }
  return -1;
};

const resultCustom1 = numbers.customIndexOf(5);
console.log("resultCustom1", resultCustom1); // 2

const resultCustom2 = numbers.customIndexOf();
console.log("resultCustom2", resultCustom2); // -1

const resultCustom3 = numbers.customIndexOf(5, 3);
console.log("resultCustom3", resultCustom3); // 5

const resultCustom4 = numbers.customIndexOf(5, -2);
console.log("resultCustom4", resultCustom4); // 5

const resultCustom5 = numbers.customIndexOf("5");
console.log("resultCustom5", resultCustom5); // -1

```

> ### Polyfill to Join

The join() method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string.

```js

const names = ["jay", "sam", "john"];

Array.prototype.customJoin = function (separator) {
  let resultString = "";
  if (!this?.length) {
    return resultString;
  }
  if (separator === undefined) {
    separator = ",";
  }
  resultString = this[0];
  for (let i = 1; i < this.length; i++) {
    resultString = resultString + separator + this[i];
  }
  return resultString;
};


const resultCustom = names?.customJoin();
console.log("resultCustom", resultCustom); // jay,sam,john

const resultCustom1 = names?.customJoin("");
console.log("resultCustom1", resultCustom1); // jaysamjohn

const resultCustom2 = names?.customJoin(" ");
console.log("resultCustom2", resultCustom2); // jay sam john

const resultCustom3 = names?.customJoin("-");
console.log("resultCustom3", resultCustom3); // jay-sam-john

```

> ### Polyfill for concat

```js
Array.prototype.myConcat = function() {
    const result = [];
    
    console.log(this);
    for (let i = 0; i < this.length; i++) {
      result.push(this[i]);
    }
  
    for (let i = 0; i < arguments.length; i++) {
      const currentArray = arguments[i];
  
      if (Array.isArray(currentArray)) {
        for (let j = 0; j < currentArray.length; j++) {
          result.push(currentArray[j]);
        }
      } else {
        result.push(currentArray);
      }
    }
  
    return result;
  };
  
  const numbers1 = [1, 2, 3];
  const numbers2 = [4, 5, 6];
  const value1 = "jc";
  const value2 = "2";
  const value3 = function () {};
  const value4 = undefined;
  const value5 = null;
  const numbers3 = [7, 8, 9];
  
  const result = numbers1.myConcat(
    numbers2,
    value1,
    value2,
    value3,
    value4,
    value5,
    numbers3
  );
  
  console.log(result);
```

> ### Polyfill for the lastIndexof

The lastIndexOf() method returns the last index at which a given element is found in an array, or -1 if it is not present, array is searched backwards, starting at fromIndex.

Note - It does not mutate the original array, and returns an index or -1.

```js

const numbers = [1, 2, 5, 3, 4, 5, 6];

Array.prototype.customLastIndexOf = function (value, fromIndex) {
  if (fromIndex === undefined) {
    fromIndex = this.length - 1;
  }
  if (isNaN(fromIndex)) {
    return -1;
  }
  if (fromIndex < 0) {
    fromIndex += this.length;
  }
  for (let i = fromIndex; i >= 0; i--) {
    if (this[i] === value) {
      return i;
    }
  }
  return -1;
};

const resultCustom1 = numbers.customLastIndexOf(5);
console.log("resultCustom1", resultCustom1); // 5

const resultCustom2 = numbers.customLastIndexOf();
console.log("resultCustom2", resultCustom2); // -1

const resultCustom3 = numbers.customLastIndexOf(5, 1);
console.log("resultCustom3", resultCustom3); // -1

const resultCustom4 = numbers.customLastIndexOf(5, -2);
console.log("resultCustom4", resultCustom4); // 5

const resultCustom5 = numbers.customLastIndexOf("5");
console.log("resultCustom5", resultCustom5); // -1


```


> ### Polyfill for the Every of array

```js
const numbers = [1, 2, 3, 4, 5, 6];

const isGreaterThan5 = (value, index, array) => {
  return value > 5;
};

const result = numbers.every(isGreaterThan5);
console.log("result", result); // false

Array.prototype.customEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

const resultCustom = numbers.customEvery(isGreaterThan5);
console.log("resultCustom", resultCustom); // false
``` 

> ### Polyfill for the Map of the array

```js
const numbers = [1, 2, 3, 4, 5];

const square = (element, index, array) => {
  return element * 2;
};

Array.prototype.customMap = function (callback) {
  //this is pointing to numbers array here
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(callback(this[i], i, this));
  }
  return temp;
};

const doubleNumbersCustom = numbers.customMap(square);
console.log("doubleNumbersCustom", doubleNumbersCustom); // [ 2, 4, 6, 8, 10 ]
```


> ### Polyfill for the Filter of the array

```js

const numbers = [1, 2, 3, 4, 5, 6];

const isOddNumber = (element, index, array) => {
  if (element % 2) {
    return true;
  }
  return false;
};

const oddNumbers = numbers.filter(isOddNumber);
console.log("oddNumbers", oddNumbers); // [ 1, 3, 5 ]

// Polyfill of filter
Array.prototype.customFilter = function (callback) {
  // this is pointing to numbers array here
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

const oddNumbersCustom = numbers.customFilter(isOddNumber);
console.log("oddNumbersCustom", oddNumbersCustom); // [ 1, 3, 5 ]

```

> ### Polyfill for the forEach

```js

const todos = [
  { id: 1, todo: "Morning Walk" },
  { id: 2, todo: "Go to Office" },
  { id: 3, todo: "Watch Netflix" },
  { id: 4, todo: "Go to Gym" },
  { id: 5, todo: "Go for Movie" },
];

const display = ({ todo }, index, array) => {
  console.log(todo);
};

todos.forEach(display);

// 👉 Polyfill of forEach
Array.prototype.customForEach = function (callback) {
  // 👉 this is pointing to todos array here
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};
todos.customForEach(display);

/* output 👇
Morning Walk
Go to Office
Watch Netflix
Go to Gym
Go for Movie */




```




> ### Polyfill for the Find

```js

const numbers = [2, 4, 5, 6, 7, 9];

const isOddNumber = (number, index, array) => {
  if (number % 2) {
    return true;
  }
  return false;
};

const findFirstOdd = numbers.find(isOddNumber);
console.log(findFirstOdd); // 5

// 👉 Polyfill of find
Array.prototype.customFind = function (callback) {
  // 👉 this is pointing to numbers array here
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
};

const findFirstOddCustom = numbers.customFind(isOddNumber);
console.log(findFirstOddCustom); // 5

```

> ### Polyfill for findindex

```js
const numbers = [1, 2, 5, 3, 4, 5, 6];

const valueEqualto5 = (value, index, array) => {
  return value === 5;
};

const valueEqualto8 = (value, index, array) => {
  return value === 8;
};

const result1 = numbers.findIndex(valueEqualto5);
console.log("result1", result1); // 2

const result2 = numbers.findIndex(valueEqualto8);
console.log("result2", result2); // -1

Array.prototype.customFindIndex = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  return -1;
};

const resultCustom1 = numbers.customFindIndex(valueEqualto5);
console.log("resultCustom1", resultCustom1); // 2

const resultCustom2 = numbers.customFindIndex(valueEqualto8);
console.log("resultCustom2", resultCustom2); // -1
```


> ### Flatten array implementation - Non recursive approach.

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






> ### Polyfill for the Promise.all()

Promise.all() Cases :-
1) If all promises resolve, returns the array of results of all promises resolved.
2) If any promise fails, returns the rejected promise error.
3) If passed empty [], returns empty [].


```js

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1st Promise resolved!");
  }, 1000);
});

const p2 = Promise.resolve("2nd Promise resolved!");

const p3 = 3;

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let status = true;
    if (status) {
      resolve("4th Promise resolved!");
    } else {
      reject("4th Promise rejected!");
    }
  }, 2000);
});


Promise.customAll = function (promisesArray) {
  // 👇 return a new promise
  return new Promise((resolve, reject) => {
    const result = [];

    // 👇 to check how many promises are completed
    let completed = 0;

    // 👇 if passed as empty [] then return empty []
    if (promisesArray.length === 0) {
      resolve(result);
    }

    // 👇 execute each promise of promisesArray
    for (let i = 0; i < promisesArray.length; i++) {
      Promise.resolve(promisesArray[i])
        .then((response) => {
          // 👇 if promise passes store its response and increment the count
          result[i] = response;
          completed++;

          // 👇 if all the promises are completed,
          //resolve and return the result array
          if (completed === promisesArray.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          // 👇 if any promise fails, reject.
          reject(error);
        });
    }
  });
};

Promise.customAll([p1, p2, p3, p4])
  .then((result) => {
    console.log("result customAll", result);
  })
  .catch((error) => {
    console.log("error customAll", error);
  });

/* output :-
 [
   "1st Promise resolved!",
   "2nd Promise resolved!",
   3,
  "4th Promise resolved!",
 ]; */

```


> ### Polyfill for the Promise.allSettled()

Promise.allSettled() returns a promise that gets resolved when all passed promises are settled ( either fulfilled or rejected ) and in result 
it gives an array of objects having status and the value/reason of each promise.

Note :- If passed empty [], returns empty [].

```js

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1st Promise resolved!");
  }, 1000);
});

const p2 = Promise.resolve("2nd Promise resolved!");

const p3 = 3;

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let status = true;
    if (!status) {
      resolve("4th Promise resolved!");
    } else {
      reject("4th Promise rejected!");
    }
  }, 2000);
});

// 👉 1) Using simple for loop
Promise.customAllSettled = function (promisesArray) {
  // 👇 return a new promise
  return new Promise((resolve) => {
    const result = [];

    // 👇 to check how many promises are settled
    let settledCount = 0;

    // 👇 if passed as empty [] then return empty []
    if (promisesArray.length === 0) {
      resolve(result);
    }

    // 👇 if all the promises are settled,
    //resolve and return the result array
    function resolveFinalResult() {
      settledCount++;
      if (settledCount === promisesArray.length) {
        resolve(result);
      }
    }

    for (let i = 0; i < promisesArray.length; i++) {
      Promise.resolve(promisesArray[i])
        .then((response) => {
          // 👇 if promise passes store its status and increment the count
          result[i] = { status: "fulfilled", value: response };
          resolveFinalResult();
        })
        .catch((error) => {
          // 👇 if promise fails store its status and increment the count
          result[i] = { status: "rejected", reason: error };
          resolveFinalResult();
        });
    }
  });
};

Promise.customAllSettled([p1, p2, p3, p4]).then((result) => {
  console.log("result custom", result);
});



// 👉 2) Using map method and promise.all()
Promise.customAllSettled2 = function (promisesArray) {
  const transformedpromises = promisesArray.map((promise) => {
    return Promise.resolve(promise)
      .then((value) => {
        return {
          status: "fulfilled",
          value,
        };
      })
      .catch((reason) => {
        return {
          status: "rejected",
          reason,
        };
      });
  });
  return Promise.all(transformedpromises);
};




/* Output 👇
[
  { status: 'fulfilled', value: '1st Promise resolved!' },
  { status: 'fulfilled', value: '2nd Promise resolved!' },
  { status: 'fulfilled', value: 3 },
  { status: 'rejected', reason: '4th Promise rejected!' }
]
*/

```


> ### Polyfill for Promise.any()

Promise.any() - It executes all passed promises concurrently and returns the first resolved promise result.

💡Promise.any() Cases :-
1) If no promise passes, returns the AggregateError "All promises were rejected".
2) If passed empty [], returns error.


```js

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("1st Promise rejected!");
  }, 1000);
});

const p2 = Promise.reject("2nd Promise rejected!");

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let status = true;
    if (status) {
      resolve("3rd Promise resolved!");
    } else {
      reject("3rd Promise rejected!");
    }
  }, 2000);
});


Promise.customAny = function (promisesArray) {
  // 👇 return a new promise
  return new Promise((resolve, reject) => {
    const errors = [];

    // 👇 to check how many promises are rejected
    let failedCount = 0;

    // 👇 if passed as empty [] reject
    if (promisesArray.length === 0) {
      reject(new Error());
    }

    // 👇 execute each promise of promisesArray
    for (let i = 0; i < promisesArray.length; i++) {
      Promise.resolve(promisesArray[i])
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // 👇 if promise fails store its error and increment the count
          failedCount++;
          errors[i] = error;

          // 👇 if all the promises are failed,
          //reject and return the aggreagate error
          if (failedCount === promisesArray.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    }
  });
};

Promise.customAny([p1, p2, p3])
  .then((result) => {
    console.log("result customAny", result); // 3rd Promise resolved!
  })
  .catch((error) => {
    console.log("error customAny", error);
    console.log(error instanceof AggregateError);
    console.log(error.message);
    console.log(error.name);
    console.log(error.errors);
  });

```


> ### Polyfill for the Promise.race()

Promise.race() - It executes all passed promises concurrently and returns the first resolved or rejected promise result.
1) If passed empty [], forever pending.

```js

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1st Promise resolved!");
  }, 1000);
});

const p2 = Promise.reject("2nd Promise rejected!");

const p3 = 3;

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let status = true;
    if (status) {
      resolve("4th Promise resolved!");
    } else {
      reject("4th Promise rejected!");
    }
  }, 2000);
});


Promise.customRace = function (promisesArray) {
  // 👇 return a new promise
  return new Promise((resolve, reject) => {
    // 👇 execute each promise of promisesArray
    for (let i = 0; i < promisesArray.length; i++) {
      Promise.resolve(promisesArray[i]).then(
        // 👇 return first resolved or rejected promise
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

Promise.customRace([p1, p2, p3, p4])
  .then((result) => {
    console.log("result customRace", result); // 2nd Promise rejected!
  })
  .catch((error) => {
    console.log("error customRace", error);
  });


```


> ### Reduce and Its Polyfill

```js
const numbers = [1, 2, 3, 4, 5, 6];

const summation = (acc, curr, index, array) => {
  acc = acc + curr;
  return acc;
};

Array.prototype.customReduce = function (callback, initial) {
  let result = initial;

  // this is pointing to numbers array here,
  // If initial value is not passed then callback skips first iteration as initial value is undefined.
  for (let i = 0; i < this.length; i++) {
    result =
      result !== undefined ? callback(result, this[i], i, this) : this[i];
  }
  return result;
};

const totalCustom = numbers.customReduce(summation, 0);
console.log("totalCustom", totalCustom); // 21
```


> ### re-build forEach(), some(), find() and every() method using reduce

1. Implementation of forEach() using reduce method

```js

const numbers = [1, 2, 3, 4, 5];

const display = (value, index, array) => {
  console.log(value);
};

numbers.forEach(display);

// let's re-build forEach using reduce this time 👇

numbers.reduce((acc, curr, index, array) => {
  display(curr, index, array);
}, undefined);

```

2. Implementation of some() using reduce method

```js

const someNumbers = [1, 2, 3, 4, 5, 6];

const isGreaterThan5 = (value, index, array) => {
  return value > 5;
};

const someResult = someNumbers.some(isGreaterThan5);
console.log("someResult", someResult); // true

// let's re-build some using reduce this time 👇

const reduceSomeResult = someNumbers.reduce((acc, curr, index, array) => {
  if (isGreaterThan5(curr, index, array)) {
    acc = true;
  }
  return acc;
}, false);
console.log("reduceSomeResult", reduceSomeResult); // true

```

3. Implementation of find() using reduce method

```js
const findNumbers = [2, 4, 5, 6, 7, 9];

const isOddNumber = (number, index, array) => {
  if (number % 2) {
    return true;
  }
  return false;
};

const findFirstOdd = findNumbers.find(isOddNumber);
console.log(findFirstOdd); // 5

// let's re-build some using reduce this time 👇

let found = false;
const reduceFindFirstOdd = findNumbers.reduce((acc, curr, index, array) => {
  if (isOddNumber(curr, index, array) && !found) {
    acc = curr;
    found = true;
  }
  return acc;
}, undefined);
console.log(reduceFindFirstOdd); // 5

```


4. Implementation of every() using reduce method

```js
const everyNumbers = [11, 12, 13, 14, 15];

const everyResult = everyNumbers.every(isGreaterThan5);
console.log("everyResult", everyResult); // true

// let's re-build every using reduce this time 👇

const reduceEveryResult = everyNumbers.reduce((acc, curr, index, array) => {
  if (!isGreaterThan5(curr, index, array)) {
    acc = false;
  }
  return acc;
}, true);
console.log("reduceEveryResult", reduceEveryResult); // true
```

> ### Polyfill of the reverse of the array

```js

Array.prototype.customReverse = function () {
  let array = this;
  let j = array.length - 1;

  for (let i = 0; i < array.length / 2; i++) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    j--;
  }

  return array;
};

const numbersCustom = [1, 2, 3, 4, 5];

const resultCustom = numbersCustom.customReverse();

console.log("resultCustom", resultCustom); // [ 5, 4, 3, 2, 1 ]
console.log("numbersCustom", numbersCustom); // [ 5, 4, 3, 2, 1 ]
```

> ### Polyfill of shift

```js

const numbers = [1, 2, 3, 4, 5];

Array.prototype.customShift = function () {
  let array = this;
  let result = array[0];

  for (let i = 0; i < this.length; i++) {
    array[i] = array[i + 1];
  }
  array.length = array.length - 1;
  return result;
};

const numbersCustom = [1, 2, 3, 4, 5];

const resultCustom = numbersCustom.customShift();

console.log("resultCustom", resultCustom); // 1
console.log("numbersCustom", numbersCustom); // [ 2, 3, 4, 5 ]

```


> ### Polyfill for the slice

```js
Array.prototype.customSlice = function (start, end) {
  let array = this;
  let temp = [];

  if (start === undefined && end === undefined) {
    return [...array];
  }
  if (end === undefined) {
    end = array.length;
  }
  if (start < 0) {
    start = array.length + start;
  }
  if (end < 0) {
    end = array.length + end;
  }

  for (let i = parseInt(+start); i < parseInt(+end); i++) {
    temp.push(array[i]);
  }
  return temp;
};

const result1 = numbers.customSlice(2, 5);
console.log(result1); // [ 12, 13, 14 ]

const result2 = numbers.customSlice(-4, -1);
console.log(result2); // [ 13, 14, 15 ]

const result3 = numbers.customSlice();
console.log(result3); // [ 10, 11, 12, 13, 14, 15, 16 ]

const result4 = numbers.customSlice(false, true); // 0 to 1
console.log(result4); // [ 10 ] implicit type coercion 👆


```


> ### Polyfill for the some of array

```js

const numbers = [1, 2, 3, 4, 5, 6];

const isGreaterThan5 = (value, index, array) => {
  return value > 5;
};

const result = numbers.some(isGreaterThan5);
console.log("result", result); // true

Array.prototype.customSome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

const resultCustom = numbers.customSome(isGreaterThan5);
console.log("resultCustom", resultCustom); // true
```

> ### Polyfill of Splice

Array.prototype.splice modifies an original array and returns deleted values array.

splice method takes (start, howManyDelete, newAdd1, newAdd2, newAddN), If no argument  is passed then original array remains as it is and it returns an empty array [].

```js

const numbers = [10, 11, 12, 13, 14, 15];

Array.prototype.customSplice = function (start, deleteCount) {
  let array = this;

  if (start !== undefined && deleteCount === undefined) {
    deleteCount = array.length;
  }
  start = Number(start);
  if (start < 0) {
    start = array.length + start;
  }
  if (isNaN(start)) {
    start = 0;
  }
  if (isNaN(deleteCount) || deleteCount < 0) {
    deleteCount = 0;
  }

  let end = start + Number(deleteCount);

  let valuesBeforeStart = [];
  let SplicedArray = [];
  let valuesAfterSplice = [];

  for (let i = 0; i < array.length; i++) {
    if (i < start) {
      valuesBeforeStart.push(array[i]);
    }
    if (i >= start && i < end) {
      SplicedArray.push(array[i]);
    }
    if (i >= end && i < array.length) {
      valuesAfterSplice.push(array[i]);
    }
  }

  for (let i = 2; i < arguments.length; i++) {
    valuesBeforeStart.push(arguments[i]);
  }

  let result = valuesBeforeStart.concat(valuesAfterSplice);
  let len = Math.max(array.length, result.length);

  for (i = 0; i < len; i++) {
    if (result.length > i) {
      array[i] = result[i];
    } else {
      array.pop();
    }
  }
  return SplicedArray;
};

const customNumbers = [10, 11, 12, 13, 14, 15];

const deletedCustomNums = customNumbers.customSplice(2, 3, 77, 88);

console.log(customNumbers); // [10, 11, 77, 88, 15]
console.log(deletedCustomNums); // [12, 13, 14]

```


> ### Polyfill for the Split

In the following example, split() looks for spaces in a string and returns the first 3 splits that it finds.

```js

const myString = "Hello World. How are you doing?";
const splits = myString.split(" ", 3);

console.log(splits); // [ "Hello", "World.", "How" ]


```

below is the polyfill
```js

String.prototype.customSplit = function (separator, limit) {
  const string = this;
  const result = [];

  if (separator === "") {
    return Array.from(string);
  }

  const splitString = (str) => {
    if (result.length >= limit) {
      return;
    }
    const index = str.indexOf(separator);
    if (index >= 0) {
      result.push(str.substring(0, index));
      splitString(str.substring(index + separator.length));
    } else {
      result.push(str);
    }
  };

  splitString(string);
  return result;
};

const resultCustom1 = message.customSplit(" ", 4);
console.log(message); // This is the string with two the in it.
console.log(resultCustom1); // [ 'This', 'is', 'the',  'string' ]

const resultCustom2 = message.customSplit("the");
console.log(resultCustom2); // [ 'This is ', ' string with two ', ' in it.' ]


```

> ### Polyfill of Unshift

```js

const numbers = [1, 2, 3, 4, 5];

const result = numbers.unshift("88", "99");

console.log("result", result); // 7
console.log("numbers", numbers); // ["88", "99", 1, 2, 3, 4, 5];

Array.prototype.customUnshift = function () {
  let array = this;
  let temp = [];

  for (let i = 0; i < array.length; i++) {
    temp.push(array[i]);
  }

  const arrLength = arguments.length + array.length;

  for (i = 0; i < arrLength; i++) {
    if (arguments[i]) {
      array[i] = arguments[i];
    } else {
      array[i] = temp[i - arguments.length];
    }
  }

  return arrLength;
};

const numbersCustom = [1, 2, 3, 4, 5];

const resultCustom = numbersCustom.customUnshift("88", "99");

console.log("resultCustom", resultCustom); // 7
console.log("numbersCustom", numbersCustom); // ["88", "99", 1, 2, 3, 4, 5];

```


> ### check 2 arrays are same or not

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

> ### Implement filter using the reduce method

1. array of numbers

```js

const numbers = [1, 2, 3, 4, 5, 6];

const isOddNumber = (element, index, array) => {
  if (element % 2) {
    return true;
  }
  return false;
};

// Implementation of filter using reduce method
const reduceOddNumbers = numbers.reduce((acc, curr, index, array) => {
  if (isOddNumber(curr, index, array)) {
    acc.push(curr);
  }
  return acc;
}, []);
console.log("reduceOddNumbers", reduceOddNumbers); // [ 1, 3, 5 ]

```


2. array of objects

```js

const todos = [
  { id: 1, todo: "Morning Walk" },
  { id: 2, todo: "Go to Office" },
  { id: 3, todo: "Watch Netflix" },
  { id: 4, todo: "Go to Gym" },
  { id: 5, todo: "Go for Movie" },
];

const filterTodo = (todoItem, index, array) => {
  return todoItem.id !== 2;
};


// Implementation of filter using reduce method
const reduceResultTodos = todos.reduce((acc, curr, index, array) => {
  if (filterTodo(curr, index, array)) {
    acc.push(curr);
  }
  return acc;
}, []);
console.log("reduceResultTodos", reduceResultTodos);
```

> ### Implementation of map method using reduce

1. array of numbers

```js

const numbers = [1, 2, 3, 4, 5];

const doubleNumber = (value, index, array) => {
  return value * 2;
};


// Implementation of map using reduce method
const reduceResult = numbers.reduce((acc, curr, index, array) => {
  acc.push(doubleNumber(curr, index, array));
  return acc;
}, []);

console.log("reduceResult", reduceResult);

```


2. array of objects

```js

const todos = [
  { id: 1, todo: "Morning Walk" },
  { id: 2, todo: "Go to Office" },
  { id: 3, todo: "Watch Netflix" },
  { id: 4, todo: "Go to Gym" },
  { id: 5, todo: "Go for Movie" },
];

const addStatus = (todoItem, index, array) => {
  return { ...todoItem, status: "completed" };
};


// Implementation of map using reduce method
const reduceResultTodos = todos.reduce((acc, curr, index, array) => {
  acc.push(addStatus(curr, index, array));
  return acc;
}, []);
console.log("reduceResultTodos", reduceResultTodos);

```



> ### Counting occurrences of items in an array 👇

```js

const names = ["Jayesh", "John", "Sam", "Sam", "Jayesh", "Jayesh"];

const nameOccurrences = names.reduce((acc, currName) => {
  return {
    ...acc,
    [currName]: (acc[currName] || 0) + 1,
  };
}, {});

console.log(nameOccurrences);
// o/p { Jayesh: 3, John: 1, Sam: 2 }

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

> ### Flatten Object implementation

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

> ### Flatten Array Recursive method

```js
const numbers = [1, 2, 3, [4, 5], 6, [7, [8, 9], 10]];

const result1 = numbers.flat("");
const result2 = numbers.flat("1");
const result3 = numbers.flat();
const result4 = numbers.flat(2);
console.log("result1", result1);
console.log("result2", result2);
console.log("result3", result3);
console.log("result4", result4);

// flatten array low simple for loop
Array.prototype.customFlat = function (depth) {
  // If no depth, default to 1
  if (depth === undefined) {
    depth = 1;
  }

  const flatten = function (array, depth) {
    let output = [];
    // If depth is 0, return the array as it is
    if (depth < 1) {
      return array.slice();
    }

    // Otherwise, concatenate into the parent array
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        output = output.concat(flatten(array[i], depth - 1));
      } else {
        output.push(array[i]);
      }
    }

    return output;
  };

  return flatten(this, depth);
};

// flatten array medium forEach method
Array.prototype.customFlat = function (depth) {
  // If no depth, default to 1
  if (depth === undefined) {
    depth = 1;
  }

  const flatten = function (array, depth) {
    let output = [];
    // If depth is 0, return the array as it is
    if (depth < 1) {
      return array.slice();
    }

    // Otherwise, concatenate into the parent array
    array.forEach((value) =>
      Array.isArray(value)
        ? (output = output.concat(flatten(value, depth - 1)))
        : output.push(value)
    );

    return output;
  };

  return flatten(this, depth);
};

// flatten array hard reduce method
Array.prototype.customFlat = function (depth) {
  // If no depth, default to 1
  if (depth === undefined) {
    depth = 1;
  }

  const flatten = function (array, depth) {
    // If depth is 0, return the array as it is
    if (depth < 1) {
      return array.slice();
    }

    // Otherwise, concatenate into the parent array
    return array.reduce((acc, curr) => {
      return acc.concat(Array.isArray(curr) ? flatten(curr, depth - 1) : curr);
    }, []);
  };

  return flatten(this, depth);
};

const resultCustom1 = numbers.customFlat("");
const resultCustom2 = numbers.customFlat("1");
const resultCustom3 = numbers.customFlat();
const resultCustom4 = numbers.customFlat(2);

console.log("resultCustom1", resultCustom1);
console.log("resultCustom2", resultCustom2);
console.log("resultCustom3", resultCustom3);
console.log("resultCustom4", resultCustom4);
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


> ### _.chunk() splits array into groups with the specific size.

Please implement your chunk(arr: any[], size: number)

```js
chunk([1,2,3,4,5], 1)
// [[1], [2], [3], [4], [5]]

chunk([1,2,3,4,5], 2)
// [[1, 2], [3, 4], [5]]

chunk([1,2,3,4,5], 3)
// [[1, 2, 3], [4, 5]]

chunk([1,2,3,4,5], 4)
// [[1, 2, 3, 4], [5]]

chunk([1,2,3,4,5], 5)
// [[1, 2, 3, 4, 5]]
```

for size smaller than 1, return an empty array.

**Solution**

```js
function chunk(arr, size) {
  if (size < 1) {
    return [];
  }
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
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

> ### Roman numerals are represented by combinations of following seven symbols, each with a fixed integer value.

Symbol	I	V	X	L	C	D	M
Value	1	5	10	50	100	500	1000
For Standard form, subtractive notation is used, meaning 4 is IV rather than IIII, 9 is IX rather than VIIII. Same rule applies to 40(XL) and 900(CM) .etc.

Simply speaking, the roman numerals in standard form follow these rules.

symbols are listed from highest to lowest, from left to right
from left to right, if the next symbol value is bigger than current one, it means subtracting, otherwise adding.
Please implement romanToInteger(). The input are all valid strings.

```js
romanToInteger('CXXIII')
// 123

romanToInteger('MCMXCIX')
// 1999

romanToInteger('MMMCDXX')
// 3420
```

**Solution**

```js
function romanToInteger(str) {
  const romanInt = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
  ])

  let values = 0
  for (let i = 0; i < str.length; i++) {
    const currInt = romanInt.get(str[i])
    const nextInt = i+1 < str.length ? romanInt.get(str[i+1]) : 0
    
    if (currInt < nextInt) {
      values -= currInt
    } else {
      values += currInt
    }
  }

  return values
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
