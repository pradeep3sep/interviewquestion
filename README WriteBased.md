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