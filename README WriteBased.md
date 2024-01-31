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