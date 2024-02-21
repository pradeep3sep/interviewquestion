```
https://github.com/pradeep3sep/javascript-interview-questions
```
<br>

> ### Break vs Continue in for loop

The `break` statement `"jumps out" or stops` of a loop.

The `continue` statement `"jumps over or skip"` one iteration in the loop.

<br>

> ### setTimeout(functionRef, delay, param1)

params is passed functionRef
```js
setTimeout((a)=>{console.log(a)},1000,"sam")

// gives sam in output
```

<br>
 
> ### What is the difference between window and document
Window  | Document
------------- | -------------
It is the root level element in any web page | It is the direct child of the window object. This is also known as Document Object Model(DOM)
By default window object is available implicitly in the page | You can access it via window.document or document.
It has methods like alert(), confirm() and properties like document, location | It provides methods like getElementById, getElementsByTagName, createElement etc

<br>
 

> ### How do you detect javascript disabled in the page

You can use the `<noscript>` tag to detect javascript disabled or not. The code block inside `<noscript>` gets executed when JavaScript is disabled, and is typically used to display alternative content when the page generated in JavaScript.

```js
<script type="javascript">
    // JS related code goes here
</script>
<noscript>
    <a href="next_page.html?noJS=true">JavaScript is disabled in the page. Please click Next Page</a>
</noscript>
```

<br>
 
> ### object freeze vs seal
* Object.freeze(obj)  ===  kuch bhi nhi ho sakta
    - Remember freezing is only applied to the top-level properties in objects but not for nested objects.
      ```js
      const user = {
          name: "John",
          employment: {
            department: "IT",
          },
        };
        
      Object.freeze(user);
      user.employment.department = "HR";
      ```
* Object.seal(obj) === new properties cannot be added, existing properties cannot be removed. `Values` of existing properties can still be `changed` as long as they are writable


<br>
 

> ### How do you determine whether object is frozen or not

Object.isFrozen() method is used to determine if an object is frozen or not.An object is frozen if all of the below conditions hold true,

- If it is not extensible.
- If all of its properties are non-configurable.
- If all its data properties are non-writable. The usage is going to be as follows,

```js
const object = {
  property: "Welcome JS world",
};
Object.freeze(object);
console.log(Object.isFrozen(object));
```

<br>
 
> ### What is a proxy object

The Proxy object is used to define custom behavior for fundamental operations such as property lookup, assignment, enumeration, function invocation, etc. The syntax would be as follows,

```js
var p = new Proxy(target, handler);
```

Let's take an example of proxy object,

```js
var handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 100;
  },
};

var p = new Proxy({}, handler);
p.a = 10;
p.b = null;

console.log(p.a, p.b); // 10, null
console.log("c" in p, p.c); // false, 100
```

In the above code, it uses get handler which define the behavior of the proxy when an operation is performed on it

> ### Object.entries(newObj), Object.keys(newObj), Object.values(newObj) 


<br>
 

> ### How do you detect caps lock key turned on or not

The mouseEvent `getModifierState()` is used to return a boolean value that indicates whether the specified modifier key is activated or not. The modifiers such as `CapsLock, ScrollLock and NumLock` are activated when they are clicked, and deactivated when they are clicked again.

Let's take an input element to detect the CapsLock on/off behavior with an example,

```html
<input type="password" onmousedown="enterInput(event)" />

<p id="feedback"></p>

<script>
  function enterInput(e) {
    var flag = e.getModifierState("CapsLock");
    if (flag) {
      document.getElementById("feedback").innerHTML = "CapsLock activated";
    } else {
      document.getElementById("feedback").innerHTML =
        "CapsLock not activated";
    }
  }
</script>
```


<br>
 

> ### What is the purpose of isFinite function
The isFinite() function is used to determine whether a number is a finite, legal number. It returns false if the value is +infinity, -infinity, or NaN (Not-a-Number), otherwise it returns true.

```js
isFinite(Infinity); // false
isFinite(NaN); // false
isFinite(-Infinity); // false

isFinite(100); // true
```

<br>
 

> ### What is the difference between document load and DOMContentLoaded events

The `DOMContentLoaded` event is fired when the initial `HTML document` has been completely `loaded and parsed`, `without waiting for assets(stylesheets, images, and subframes)` to finish loading. Whereas The `load event` is fired when the `whole page has loaded, including all dependent resources(stylesheets, images)`.


<br>
 
> ### How do you test for an empty object

There are different solutions based on ECMAScript versions

  1. Using Object entries(ECMA 7+): You can use object entries length along with constructor type.
  ```js
  Object.entries(obj).length === 0 && obj.constructor === Object; // Since date object length is 0, you need to check constructor check as well
  ```

  2. Using Object keys(ECMA 5+): You can use object keys length along with constructor type.
  ```js
  Object.keys(obj).length === 0 && obj.constructor === Object; // Since date object length is 0, you need to check constructor check as well
  ```

  3. Using for-in with hasOwnProperty(Pre-ECMA 5): You can use a for-in loop along with hasOwnProperty.
  ```js
  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true
  }
  ```

<br>
 
> ### What are js labels

The label statement allows us to name loops and blocks in JavaScript. We can then use these labels to refer back to the code later. For example, the below code with labels avoids printing the numbers when they are same,

```js
var i, j;

loop1: for (i = 0; i < 3; i++) {
  loop2: for (j = 0; j < 3; j++) {
    if (i === j) {
      continue loop1;
    }
    console.log("i = " + i + ", j = " + j);
  }
}

// Output is:
//   "i = 1, j = 0"
//   "i = 2, j = 0"
//   "i = 2, j = 1"
```



<br>
 

 
> ### How does synchronous iteration works

Synchronous iteration was introduced in ES6 and it works with below set of components,

**Iterable**: It is an object which can be iterated over via a method whose key is Symbol.iterator. 
Iterator: It is an object returned by invoking `[Symbol.iterator]()` on an iterable. This iterator object wraps each iterated element in an object and returns it via `next()` method one by one. **IteratorResult**: It is an object returned by `next()` method. The object contains two properties; the `value` property contains an iterated element and the done property determines whether the element is the last element or not.

Let's demonstrate synchronous iteration with an array as below,

```js
const iterable = ["one", "two", "three"];
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // { value: 'one', done: false }
console.log(iterator.next()); // { value: 'two', done: false }
console.log(iterator.next()); // { value: 'three', done: false }
console.log(iterator.next()); // { value: 'undefined, done: true }
```


<br>
 
> ### Generator 
Generator is a function that can be paused and resumed from where it was paused. It is written as the function keyword followed by an asterisk (*).
Generator returns a Generator object that is used by calling the next method.

Use cases :-
1) Creating Infinite loop ( generating unique Id ).
2) Iterators ( looping through an array ).
3) Handling promises using async generator.
4) State management using Redux Saga.

Simple Example

```js
function simpleExample() {
  function* getNumbers() {
    yield 1;
    yield 2;
    yield 3;
  }

  const numberObject = getNumbers();
  const first = numberObject.next();
  const second = numberObject.next();
  const third = numberObject.next();
  const fourth = numberObject.next();

  console.log(first); // { value: 1, done: false }
  console.log(second); // { value: 2, done: false }
  console.log(third); // { value: 3, done: false }
  console.log(fourth); // { value: undefined, done: true }
}
simpleExample();
```


Use cases :-
1) Creating Infinite loop ( generating unique Id )

```js

function infiniteLoop() {
  function* generateId() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }

  const uniqueId = generateId();
  console.log(uniqueId.next().value); // 1
  console.log(uniqueId.next().value); // 2
  console.log(uniqueId.next().value); // 3
  console.log(uniqueId.next().value); // 4
  console.log(uniqueId.next().value); // 5 => infinite loop

  // passing value to next
  function passValuetoNext() {
    function* generateId() {
      let id = 1;
      while (true) {
        const increment = yield id;
        if (increment != null) {
          id += increment;
        } else {
          id++;
        }
      }
    }

    const uniqueId = generateId();
    console.log(uniqueId.next().value); // 1
    console.log(uniqueId.next().value); // 2
    console.log(uniqueId.next(5).value); // 7
    console.log(uniqueId.next().value); // 8
    console.log(uniqueId.next().value); // 9 => infinite loop
  }
  passValuetoNext();
}
infiniteLoop()
```

2) Iterators ( looping through an array )

```js

function iterators() {
  function* arrayIterator(array) {
    for (let i = 0; i < array.length; i++) {
      yield array[i];
    }
  }

  const arrayItem = arrayIterator([11, 22, 33, 44]);
  console.log(arrayItem.next().value); // 11
  console.log(arrayItem.next().value); // 22
  console.log(arrayItem.next().value); // 33
  console.log(arrayItem.next().value); // 44
}
iterators();

```


3) Handling promises using async generator

```js

const taskOne = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("First task resolved");
    }, 1000);
  });
};

const taskTwo = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Second task resolved");
    }, 1000);
  });
};

const taskThree = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Third task resolved");
    }, 1000);
  });
};

async function* generateTasks() {
  yield await taskOne();
  yield await taskTwo();
  yield await taskThree();
}

// using then and catch
const tasks = generateTasks();
tasks
  .next()
  .then((response) => {
    console.log(response); // { value: 'First task resolved', done: false }
  })
  .catch((error) => console.log(error));

tasks
  .next()
  .then((response) => {
    console.log(response); // { value: 'Second task resolved', done: false }
  })
  .catch((error) => console.log(error));

tasks
  .next()
  .then((response) => {
    console.log(response); // { value: 'Third task resolved', done: false }
  })
  .catch((error) => console.log(error));

// More cleaner way
async function doTasks() {
  const tasks = generateTasks();
  for await (let result of tasks) {
    console.log(result);
  }
}
doTasks().catch((error) => {
  console.log("error", error);
});

/* Output
First task resolved
Second task resolved
Third task resolved 
*/

```



<br>
 
> ### How do you set prototype of one object to another

You can use the `Object.setPrototypeOf()` method that sets the prototype (i.e., the internal `Prototype` property) of a specified object to another object or null. For example, if you want to set prototype of a square object to rectangle object would be as follows,

```js
Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
Object.setPrototypeOf({}, null);
```

<br>
 
> ### How do you check whether an object can be extendable or not

The `Object.isExtensible()` method is used to determine if an object is extendable or not. i.e, Whether it can have new properties added to it or not.

```js
const newObject = {};
console.log(Object.isExtensible(newObject)); //true
```

**Note**: By default, all the objects are extendable. i.e, The new properties can be added or modified.


<br>
 
> ### Currying

Currying is a technique to convert multiple arguments function into a single argument functions (unary functions) in a sequence.

Two ways to perform currying :-
 1) Using Closures
 2) Using Bind

Simple Example of Currying -

`Regular` n-ary function taking 3 parameters
```js
const addition = (a, b, c) => {
  return a + b + c;
};

const result = addition(2, 3, 5);
console.log(result); // 10
```

1. let's transform it to `currying using Closures`

```js
const additionCurry = (a) => {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
};

const resultCurryClosure = additionCurry(2)(3)(5);
console.log(resultCurryClosure); // 10
```

2) let's transform it to `currying using Bind`

```js
const additionAll = (a, b, c) => {
  return a + b + c;
};

const additionFirst = additionAll.bind(this, 2);
// binding further to get unary arguments to each function
const additionSecond = additionFirst.bind(this, 3);
const additionThird = additionSecond.bind(this, 5);

const resultCurryBind = additionThird();
console.log(resultCurryBind); // 10

```


Now Let's take an example of Infinite Currying -
Implementation of sum(1)(2)(3)....(n)()

```js
const sum = (a) => {
  return (b) => {
    if (b) return sum(a + b);
    return a;
  };
};

const sumResult = sum(1)(2)(3)(4)(5)();
console.log(sumResult); // 15
```


<br>
 
> ### What are the different error names from error object

There are 6 different types of error names returned from error object,

Error Name |	Description
---------- | --------------
EvalError	| An error has occurred in the eval() function
RangeError	| An error has occurred with a number "out of range"
ReferenceError	| An error due to an illegal reference
SyntaxError	| An error due to a syntax error
TypeError	| An error due to a type error
URIError	| An error due to encodeURI()


<br>
 
> ### Keep in mind below
```js
const a = {}
const b = {}
console.log(a === b)  // false
```

```js
const a = {}
const b = a
console.log(a === b)  // true
```

<br>
 
> ### Number.isNaN() vs global isNaN()

Number.isNaN() doesn't attempt to convert the parameter to a number, so non-numbers always return false. 

Number.isNaN() return true if the given value is a number with value NaN. Otherwise, false. 

```js
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0); // true
Number.isNaN(37); // false

// below give false
Number.isNaN("NaN");
Number.isNaN(undefined);
Number.isNaN({});
Number.isNaN("blabla");
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");
```

isNaN()

The isNaN() function determines whether a value is NaN, first converting the value to a number if necessary
```js
isNaN(NaN); // true
isNaN(undefined); // true
isNaN({}); // true

isNaN(true); // false
isNaN(null); // false
isNaN(37); // false

// Strings
isNaN("37"); // false: "37" is converted to the number 37 which is not NaN
isNaN("37.37"); // false: "37.37" is converted to the number 37.37 which is not NaN
isNaN("37,5"); // true
isNaN("123ABC"); // true: Number("123ABC") is NaN
isNaN(""); // false: the empty string is converted to 0 which is not NaN
isNaN(" "); // false: a string with spaces is converted to 0 which is not NaN

// Dates
isNaN(new Date()); // false; Date objects can be converted to a number (timestamp)
isNaN(new Date().toString()); // true; the string representation of a Date object cannot be parsed as a number

// Arrays
isNaN([]); // false; the primitive representation is "", which coverts to the number 0
isNaN([1]); // false; the primitive representation is "1"
isNaN([1, 2]); // true; the primitive representation is "1,2", which cannot be parsed as number
```

<br>
 
> ### Promise
Promise is pending state object which can be either fulfilled or rejected in future.

```js
const promise = new Promise(function (resolve, reject) {
  // promise description
});
```
The above condition gives promise of state pending which can be fullfilled or reject

<br>
 
##### Promise resolve() method 
The promise.resolve() is a `static method` of class Promise in JS returns a Promise object that is resolved in state

```js
let promise = Promise.resolve(17468);

promise.then(function (val) {
	console.log(val);
});
	//Output: 17468

console.log(promise)
// Promise {<fulfilled>: 17468}
//  [[Prototype]]: Promise
//  [[PromiseState]]: "fulfilled"
//  [[PromiseResult]]: 17468
```

<br>
 
> #### What is the purpose of the race method in promise
Promise.race() method will return the promise instance which is firstly resolved or rejected. Let's take an example of race() method where promise2 is resolved first

```js
var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
var promise2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then(function (value) {
  console.log(value); // "two" // Both promises will resolve, but promise2 is faster
});
```

<br>
 
> #### What is a callback function
A callback function is a function passed into another function as an argument. This function is invoked inside the outer function to complete an action. Let's take a simple example of how to use callback function

```js
function callbackFunction(name) {
  console.log("Hello " + name);
}

function outerFunction(callback) {
  let name = prompt("Please enter your name.");
  callback(name);
}

outerFunction(callbackFunction);
```

<br>
 
> #### What is a callback hell
Callback Hell is an anti-pattern with multiple nested callbacks which makes code hard to read and debug when dealing with asynchronous logic. The callback hell looks like below,

```js
async1(function(){
    async2(function(){
        async3(function(){
            async4(function(){
                ....
            });
        });
    });
});
```

👉 Callback and Callback Hell
Callback functions are first class citizens passed as an argument to higher order function,
and later on higher order function calls the callback function to perform some operation.


💡Types of Callback :- 
👉 Synchronous Callback (blocking) :- Executes immediately during the execution of the higher-order function.
👉 Asynchronous Callback (non-blocking) :- Executes after the execution of the higher-order function.

💡Callback Hell :- 
👉 Callback Hell is the situation where callbacks are nested several levels deep
which makes it difficult to understand and maintain the code. It's also known as Pyramid of Doom.

💡 Avoiding Callback Hell
👉 1) Using Promises 
👉 2) Using async-await 
👉 3) Using generators


```js
function callBackExample() {
  const DhoniFinishing = () => {
    console.log("Dhoni came to bat after 16 overs for finishing");
  };

  const indiaBatting = (callDhoni) => {
    console.log("India's batting...");
    let overs = 16.2;
    if (overs > 16) {
      callDhoni();
    }
  };

  indiaBatting(DhoniFinishing);
}
```


```js
// Function with nested callbacks
function stepOne(callback) {
  setTimeout(function () {
    console.log("Step One completed");
    callback();
  }, 1000);
}

function stepTwo(callback) {
  setTimeout(function () {
    console.log("Step Two completed");
    callback();
  }, 1000);
}

function stepThree(callback) {
  setTimeout(function () {
    console.log("Step Three completed");
    callback();
  }, 1000);
}

// Callback hell example
stepOne(function () {
  stepTwo(function () {
    stepThree(function () {
      console.log("All steps completed");
    });
  });
});

```



<br>
 


> ### Web Worker
Some task which are sync and very lengthy task and that could block the main thread and block the UI. then we perform that task in other thread called worker thread which is in browser separate from the js single thread. This happens in the background.

```js
// 1.Creating a Web Worker:

// main.js
const myWorker = new Worker('worker.js');



// 2.Communication:

// main.js
myWorker.postMessage('Hello from the main thread!');

myWorker.onmessage = function(event) {
  console.log('Message from worker:', event.data);
};

// worker.js
onmessage = function(event) {
  console.log('Message from main thread:', event.data);
  postMessage('Hello from the worker!');
};



// 3.Handling Errors:
// worker.js
onerror = function(error) {
  console.error('Error in worker:', error.message);
};



// 4.Terminating a Worker:
// main.js
myWorker.terminate();

```

How do you check web workers browser support
```js
if (typeof Worker !== "undefined") {
  // code for Web worker support.
} else {
  // Sorry! No Web Worker support..
}
```


Points to note
- Each worker thread will have its own isolated global env that is different form js env
- Worker can not manipulate the DOM operations
- Worker is not a part of js thread its browser feature


<br>
 
> ### How do you get property descriptors of an object

You can use the `Object.getOwnPropertyDescriptors()` method which returns all own property descriptors of a given object. The example usage of this method is below,

```js
const newObject = {
  a: 1,
  b: 2,
  c: 3,
};
const descriptorsObject = Object.getOwnPropertyDescriptors(newObject);
console.log(descriptorsObject.a.writable); //true
console.log(descriptorsObject.a.configurable); //true
console.log(descriptorsObject.a.enumerable); //true
console.log(descriptorsObject.a.value); // 1

```


<br>
 
> ### How do I modify the url without reloading the page
The `window.location.href` property will be helpful to modify the url but it reloads the page. HTML5 introduced the `history.pushState()` and `history.replaceState()` methods, which allow you to add and modify history entries, respectively. For example, you can use pushState as below,

```js
window.history.pushState("page2", "Title", "/page2.html");
```

<br>
 
> ### How do you print numbers with commas as thousand separators

You can use the `Number.prototype.toLocaleString()` method which returns a string with a language-sensitive representation such as thousand separator,currency etc of this number.

```js
function convertToThousandFormat(x) {
  return x.toLocaleString(); // 12,345.679
}

console.log(convertToThousandFormat(12345.6789));
```

<br>
 

> ### Does JavaScript supports namespace

JavaScript doesn’t support namespace by default. So if you create any element(function, method, object, variable) then it becomes global and pollutes the global namespace. Let's take an example of defining two functions without any namespace,

```js
function func1() {
  console.log("This is a first definition");
}
function func1() {
  console.log("This is a second definition");
}
func1(); // This is a second definition
```

**Note**: It always calls the second function definition. In this case, namespace will solve the name collision problem.

<br>
 

> ### How do you declare namespace
Even though JavaScript lacks namespaces, we can use Objects , IIFE to create namespaces.

  1. **Using Object Literal Notation**: Let's wrap variables and functions inside an Object literal which acts as a namespace. After that you can access them using object notation

  ```js
  var namespaceOne = {
    function func1() {
        console.log("This is a first definition");
    }
  }
  var namespaceTwo = {
      function func1() {
          console.log("This is a second definition");
      }
  }
  namespaceOne.func1(); // This is a first definition
  namespaceTwo.func1(); // This is a second definition
  ```
  2. **Using IIFE (Immediately invoked function expression)**: The outer pair of parentheses of IIFE creates a local scope for all the code inside of it and makes the anonymous function a function expression. Due to that, you can create the same function in two different function expressions to act as a namespace.

  ```js
  (function () {
    function fun1() {
      console.log("This is a first definition");
    }
    fun1();
  })();

  (function () {
    function fun1() {
      console.log("This is a second definition");
    }
    fun1();
  })();
  ```


<br>
 
> ### How do you load CSS and JS files dynamically

You can create both link and script elements in the DOM and append them as child to head tag. Let's create a function to add script and style resources as below,

```js
function loadAssets(filename, filetype) {
  if (filetype == "css") {
    // External CSS file
    var fileReference = document.createElement("link");
    fileReference.setAttribute("rel", "stylesheet");
    fileReference.setAttribute("type", "text/css");
    fileReference.setAttribute("href", filename);
  } else if (filetype == "js") {
    // External JavaScript file
    var fileReference = document.createElement("script");
    fileReference.setAttribute("type", "text/javascript");
    fileReference.setAttribute("src", filename);
  }
  if (typeof fileReference != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileReference);
}
```

<br>
 
> ### How do you create an infinite loop

```js
for (;;) {}
while (true) {}

```

<br>
 
> ### How do you convert character to ASCII code

```js
"ABC".charCodeAt(0); // returns 65

String.fromCharCode(65, 66, 67); // returns 'ABC'
```

<br>
 
> ### What is the output of below console statement with unary operator

```js
console.log(+"Hello");
```

The output of the above console log statement returns NaN. Because the element is prefixed by the unary operator and the JavaScript interpreter will try to convert that element into a number type. Since the conversion fails, the value of the statement results in NaN value


<br>
 
> ### What happens if we add two arrays

If you add two arrays together, it will convert them both to strings and concatenate them. For example, the result of adding arrays would be as below,

```js
console.log(["a"] + ["b"]); // "ab"
console.log([] + []); // ""
console.log(![] + []); // "false", because ![] returns false.
```

<br>
 
> ### What is the output of prepend additive operator on falsy values

If you prepend the additive(+) operator on falsy values(null, undefined, NaN, false, ""), the falsy value converts to a number value zero. Let's display them on browser console as below,

```js
console.log(+null); // 0
console.log(+undefined); // NaN
console.log(+false); // 0
console.log(+NaN); // NaN
console.log(+""); // 0
```

<br>
 
> ### What is destructuring aliases
Sometimes you would like to have a destructured variable with a different name than the property name. In that case, you'll use a `: newName` to specify a name for the variable. This process is called destructuring aliases.

```js
const obj = { x: 1 };
// Grabs obj.x as as { otherName }
const { x: otherName } = obj;
```

<br>
 
> ### How do you create copy to clipboard button

You need to select the content(using .select() method) of the input element and execute the copy command with execCommand (i.e, execCommand('copy')). You can also execute other system commands like cut and paste.

```js
document.querySelector("#copy-button").onclick = function () {
  // Select the content
  document.querySelector("#copy-input").select();
  // Copy to the clipboard
  document.execCommand("copy");
};
```

<br>
 
> ### What is babel
Babel is a JavaScript transpiler to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Some of the main features are listed below,

- Transform syntax
- Polyfill features that are missing in your target environment (using @babel/polyfill)
- Source code transformations (or codemods)

<br>
 

> ### How do you make an object iterable in javascript

By default, plain objects are not iterable. But you can make the object iterable by defining a `Symbol.iterator` property on it.

Let's demonstrate this with an example,

```js
const collection = {
  one: 1,
  two: 2,
  three: 3,
  [Symbol.iterator]() {
    const values = Object.keys(this);
    let i = 0;
    return {
      next: () => {
        return {
          value: this[values[i++]],
          done: i > values.length,
        };
      },
    };
  },
};

const iterator = collection[Symbol.iterator]();

console.log(iterator.next()); // → {value: 1, done: false}
console.log(iterator.next()); // → {value: 2, done: false}
console.log(iterator.next()); // → {value: 3, done: false}
console.log(iterator.next()); // → {value: undefined, done: true}
```

The above process can be simplified using a generator function,

```js
const collection = {
  one: 1,
  two: 2,
  three: 3,
  [Symbol.iterator]: function* () {
    for (let key in this) {
      yield this[key];
    }
  },
};
const iterator = collection[Symbol.iterator]();
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

<br>
 
> ### What is the difference between dense and sparse arrays?

An array contains items at each index starting from first(0) to last(array.length - 1) is called as Dense array. Whereas if at least one item is missing at any index, the array is called as sparse.

Let's see the below two kind of arrays,

```js
const avengers = ["Ironman", "Hulk", "CaptainAmerica"];
console.log(avengers[0]); // 'Ironman'
console.log(avengers[1]); // 'Hulk'
console.log(avengers[2]); // 'CaptainAmerica'
console.log(avengers.length); // 3

const justiceLeague = ["Superman", "Aquaman", , "Batman"];
console.log(justiceLeague[0]); // 'Superman'
console.log(justiceLeague[1]); // 'Aquaman'
console.log(justiceLeague[2]); // undefined
console.log(justiceLeague[3]); // 'Batman'
console.log(justiceLeague.length); // 4

```


<br>
 
> ### What are the different ways to create sparse arrays?

There are 4 different ways to create sparse arrays in JavaScript

  1. **Array literal**: Omit a value when using the array literal
  ```js
  const justiceLeague = ["Superman", "Aquaman", , "Batman"];
  console.log(justiceLeague); // ['Superman', 'Aquaman', empty ,'Batman']
  ```

  2. **Array() constructor**: Invoking Array(length) or new Array(length)
  ```js
  const array = Array(3);
  console.log(array); // [empty, empty ,empty]
  ```

  3. **Delete operator**: Using delete array[index] operator on the array
  ```js
  const justiceLeague = ["Superman", "Aquaman", "Batman"];
  delete justiceLeague[1];
  console.log(justiceLeague); // ['Superman', empty, ,'Batman']
  ```

  4. **Increase length property**: Increasing length property of an array

  ```js
  const justiceLeague = ["Superman", "Aquaman", "Batman"];
  justiceLeague.length = 5;
  console.log(justiceLeague); // ['Superman', 'Aquaman', 'Batman', empty, empty]
  ```


<br>
 
> ### How do you create custom HTML element?
The creation of custom HTML elements involves two main steps,

  1. Define your custom HTML element: First you need to define some custom class by extending HTMLElement class. After that define your component properties (styles,text etc) using connectedCallback method. Note: The browser exposes a function called customElements.define inorder to reuse the element.

  ```js
  class CustomElement extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "This is a custom element";
    }
  }
  customElements.define("custom-element", CustomElement);
  ```

  2. Use custome element just like other HTML element: Declare your custom element as a HTML tag.

  ```html
    <body>
      <custom-element>
    </body>
  ```


<br>
 

> ### How do you check an object is a promise or not

If you don't know if a value is a promise or not, wrapping the value as `Promise.resolve(value)` which returns a promise

```js
function isPromise(object) {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) == object;
  } else {
    throw "Promise not supported in your environment";
  }
}

var i = 1;
var promise = new Promise(function (resolve, reject) {
  resolve();
});

console.log(isPromise(i)); // false
console.log(isPromise(promise)); // true
```

Another way is to check for .then() handler type

```js
function isPromise(value) {
  return Boolean(value && typeof value.then === "function");
}
var i = 1;
var promise = new Promise(function (resolve, reject) {
  resolve();
});

console.log(isPromise(i)); // false
console.log(isPromise(promise)); // true
```

<br>
 

> ### How do you map the array values without using map method

```js
const countries = [
  { name: "India", capital: "Delhi" },
  { name: "US", capital: "Washington" },
  { name: "Russia", capital: "Moscow" },
  { name: "Singapore", capital: "Singapore" },
  { name: "China", capital: "Beijing" },
  { name: "France", capital: "Paris" },
];

const cityNames = Array.from(countries, ({ capital }) => capital);
console.log(cityNames); // ['Delhi, 'Washington', 'Moscow', 'Singapore', 'Beijing', 'Paris']
```

<br>
 
> ### How do you create an array with some data

You can create an array with some data or an array with the same values using `fill` method.

```js
var newArray = new Array(5).fill("0");
console.log(newArray); // ["0", "0", "0", "0", "0"]
```

<br>
 
> ### Array things
- When setting a property on a JavaScript array when the property is a valid array index and that index is outside the current bounds of the array, the engine will update the array's length property accordingly:
```js
const check = ["hi"]
check[2] = "bbb"

console.log(check)  // gives ['hi', empty, 'bbb']
```

- Increasing the length extends the array by adding empty slots without creating any new elements — not even undefined.
```js
const list = ["sam"]
list.length = 3
console.log(list)   // gives  ['sam', empty × 2]
```

- Decreasing the length property does, however, delete elements.

```js
const list = ["sam","ram","bima"]
list.length = 1
console.log(list)   // gives ['sam']
```



<br>
 
> ### Slice vs Splice in array

**for slice** - return new array
```js
slice()  // gives full array
slice(startIndex)  // gives values from start index to end
slice(startIndex, endIndex) // gives values from start index to one before endIndex
```

**Note**

```js
const numbers = [10, 11, 12, 13, 14, 15, 16];

const result7 = numbers.slice(false, true); // 0 to 1  // due to coercion
console.log(result7); // [ 10 ]

```

**for splice** - mutate the array and *keep in mind it `return array of deleted values`
```js
splice() // delete all the values and make a blank array
splice(startIndex) // delete all the values from satrtIndex
splice(startIndex, deleteCount)  // delete the no of delteCount values from satrtIndex
splice(startIndex, deleteCount, item1)  // delete the no of delteCount values from satrtIndex and add item1 before last deleted value
splice(startIndex, deleteCount, item1, item2)
```

<br>
 
> #### What is scope in javascript
Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime. In other words, scope determines the visibility of variables and other resources in areas of your code.

<br>
 
> #### What is a service worker
A Service worker is basically a script (JavaScript file) that runs in the background, separate from a web page and provides features that don't need a web page or user interaction. Some of the major features of service workers are Rich offline experiences(offline first web application development), periodic background syncs, push notifications, intercept and handle network requests and programmatically managing a cache of responses.

<br>
 
> ### Closure
- Function bundled along with it's lexical scope is closure.
- If a function needs to access a variable, it first goes to its local memory. When it does not find it there, it goes to the memory of its lexical parent. See Below code, Over here function y along with its lexical scope i.e. (function x) would be called a closure.
```js
function x() {
    var a = 7;
    function y() {
        console.log(a);
    }
    return y;
}
var z = x();
console.log(z);  // value of z is entire code of function y.
```
- In above code, When y is returned, not only is the function returned but the entire closure (fun y + its lexical scope) is returned and put inside z. So when z is used somewhere else in program, it still remembers var a inside x()

- Another example
  ```js
      function z() {
        var b = 900;
        function x() {
            var a=7;
            function y(){
                console.log(a,b);
            }
            y();
        }
        x();
    }
    z();    // 7 900
  ```
- Advantages of Closure:

    - Memoize
    Memoizing the result of the function and if later the same function is called with same arguments then return memoized result instead of executing whole function again


    ```js
    const memoizedMultiplyBy100 = () => {
      const cache = {};

      return (num) => {
        if (cache[num]) {
          return cache[num];
        }
        const result = num * 100;
        cache[num] = result;
        return result;
      };
    };


    // Here, inner return function has access to cache object of outer function

    const multiplyBy100 = memoizedMultiplyBy100();

    console.log(multiplyBy100(1)); // 100
    console.log(multiplyBy100(2)); // 200
    console.log(multiplyBy100(3)); // 300
    console.log(multiplyBy100(4)); // 400
    console.log(multiplyBy100(2)); // 200
    ```



    - Module Design Pattern

    All the members and methods of a particular module should be encapsulated together to maintain the well-structured code

    ```js

      const todosModule = (() => {
        let todos = ["office", "gym", "party", "drive"];

        const getTodos = () => {
          return todos;
        };

        const addTodo = (newTodo) => {
          todos.push(newTodo);
          return todos;
        };

        const deleteTodo = (todoName) => {
          const findIndex = todos.indexOf(todoName);
          todos.splice(findIndex, 1);
          return todos;
        };

        return {
          getTodos,
          addTodo,
          deleteTodo,
        };
      })();

      // console.log(todos); // todos is not defined
      console.log(todosModule.getTodos());
      // [ 'office', 'gym', 'party', 'drive' ]
      console.log(todosModule.addTodo("sleep"));
      // [ 'office', 'gym', 'party', 'drive', 'sleep' ]
      console.log(todosModule.deleteTodo("gym"));
      // [ 'office', 'party', 'drive', 'sleep' ]
    ```
    - Currying
    - Data hiding and encapsulation
    - setTimeouts etc.

- Disadvantages of Closure:

    - Over consumption of memory
    - Memory Leak
    - Variables are not Garbage collected.

<br>
 
> ### Map
The Map object holds key-value pairs and remembers the original insertion order of the keys

```js
const players = new Map();
players.set("Virat", "Batsman");
players.set("Hardik", "All-Rounder");
players.set("Bhumrah", "Bowler");

console.log(players); // Map(3) {'Virat' => 'Batsman', 'Hardik' => 'All-Rounder', 'Bhumrah' => 'Bowler'}

// 👉 check size of map using map.size
console.log(players.size); // 3

// 👉 get value using map.get(key)
console.log(players.get("Hardik")); // All-Rounder
console.log(players.get("Rishab")); // undefined

// 👉 check value exists using map.has(key)
console.log(players.has("Hardik")); // true
console.log(players.has("Rishab")); // false

// 💡 Map Iteration :-
// 👉 1) map.keys()
console.log(players.keys()); // [Map Iterator] { 'Virat', 'Hardik', 'Bhumrah' }

// 👉 2) map.values()
console.log(players.values()); // [Map Iterator] { 'Batsman', 'All-Rounder', 'Bowler' }

// 👉 3) map.entries()
console.log(players.entries());
/* 👇 output 
[Map Entries] {
  [ 'Virat', 'Batsman' ],
  [ 'Hardik', 'All-Rounder' ],
  [ 'Bhumrah', 'Bowler' ]
} 
*/

// 👉 4) Iterating Map with for...of
for (let [key, value] of players) {
  console.log("name", key, "Role", value);
}
/* 👇 output
name Virat Role Batsman
name Hardik Role All-Rounder
name Bhumrah Role Bowler 
*/

// 👉 5) Iterating Map with forEach()
players.forEach((value, key) => {
  console.log("name", key, "Role", value);
});
/* 👇 output
name Virat Role Batsman
name Hardik Role All-Rounder
name Bhumrah Role Bowler 
*/

// 👉 delete value using map.delete(key)
console.log(players.delete("Hardik")); // true
console.log(players.delete("Rishab")); // false
console.log(players); // Map(3) { 'Virat' => 'Batsman', 'Bhumrah' => 'Bowler' }

// 👉 clear all values using map.clear()
console.log(players.clear()); // undefined
console.log(players); // Map(0) {}
```

- Another way of create map

```js
const question = new Map([
    ["question","what is ..."],
    [1,"C++"],
    [2,"Java"],
    [3,"Javascript"]
])
```

- To convert an object to map
```js
const newObject = {
    name: "Pradeep",
    gender: "M"
}

const objToMap = new Map(Object.entries(newObject))
console.log(objToMap)
```

Diff b/w Object and Map
1. In Object, the data-type of the key-field is restricted to integer(behind the scene it is stored as string), strings, and symbols. Whereas in Map, the key-field can be of any data-type (integer, an array, even an object!)
2. In the Map, the original order of elements is preserved. This is not true in case of objects. Thus, when iterating over it, a Map object returns keys in order of insertion.
3. You can get the size of a Map easily with the size property, while the number of properties in an Object must be determined manually.
4. An Object has a prototype, so there are default keys in the map that could collide with your keys if you're not careful. As of ES5 this can be bypassed by using map = Object.create(null), but this is seldom done.


<br>
 

> ### Set Object
Set objects are collections of value of any type ( primitive or object).
A value in the Set may only occur once. It is unique in the Set's collection.
Set remembers the original insertion order of the values.

```js

// 💡 Creation of Set
// 👉 1) Create Set Obj by Passing an array :-
const numbers = [1, 2, 3, 4, 5, 5];
const uniqueNumbers = new Set(numbers);
console.log(uniqueNumbers); // Set(5) { 1, 2, 3, 4, 5 }

const uniqueNumbersArray = [...new Set(numbers)];
console.log(uniqueNumbersArray); // [ 1, 2, 3, 4, 5 ]

// 👉 2) Create Set Obj by new Set() and Set.add() :-
const persons = new Set();
persons.add("Jayesh");
persons.add("Sam");
persons.add("John");
console.log(persons); // Set(3) { 'Jayesh', 'Sam', 'John' }

// 👉 get size using set.size
console.log(persons.size); // 3

// 👉 check value exists using set.has(value)
console.log(persons.has("Jayesh")); // true
console.log(persons.has("Jc")); // false

// 💡 Set Iteration
// 👉 1) set.keys()
console.log(persons.keys()); // [Set Iterator] { 'Jayesh', 'Sam', 'John' }

// 👉 2) set.values()
console.log(persons.values()); // [Set Iterator] { 'Jayesh', 'Sam', 'John' }

// 👉 3) set.entries()
console.log(persons.entries());
/* 👇 output
[Set Entries] {
  [ 'Jayesh', 'Jayesh' ],
  [ 'Sam', 'Sam' ],
  [ 'John', 'John' ]
}
*/

// 👉 4) Iterating Set with for...of
for (let value of persons) {
  console.log(value);
}
/* 👇 output
Jayesh
Sam
John
*/

// 👉 5) Iterating Set with forEach
persons.forEach((value) => {
  console.log(value);
});
/* output
Jayesh
Sam
John
*/

// 👉 delete value using set.delete(value)
console.log(persons.delete("Sam")); // true
console.log(persons.delete("Jc")); // false
console.log(persons); // Set(2) { 'Jayesh', 'John' }

// 👉 clear all values using set.clear()
console.log(players.clear()); // undefined
console.log(players); // Map(0) {}
```

**We can loop over the set as we have done in the map**



> ### map and weakMap

refer below for understanding
```
https://javascript.info/weakmap-weakset
```


Map  | WeakMap
------------- | -------------
A Map is an unordered list of key-value pairs where the key and the value can be of any type like string, boolean, number, etc.  | In a Weak Map, every key can only be an object and function. It used to store weak object references.
Maps are iterable.  | WeakMaps are not iterable.
Maps will keep everything even if you don’t use them. | WeakMaps holds the reference to the key, not the key itself.
The garbage collector doesn’t remove a key pointer from “Map” and also doesn’t remove the key from memory. | The garbage collector goes ahead and removes the key pointer from “WeakMap” and also removes the key from memory. WeakMap allows the garbage collector to do its task but not the Map.
Maps have some properties : .set, .get, .delete, .size, .has, .forEach, Iterators. | WeakMaps have some properties : .set, .get, .delete, .has.
You can create a new map by using a new Map(). | You can create a new WeakMap by using a new WeakMap().


some code for weakMap and weakSet

```js
const employees = new WeakSet();

let employee1 = {
  name: "John",
  experience: "5 years",
};

let employee2 = {
  name: "Steve",
  experience: "8 years",
};

employees.add(employee1);
employees.add(employee2);
console.log(employees);

/* 👇 output 
[[Entries]]
0: value: {name: 'Steve', experience: '8 years'}
1: value: {name: 'John', experience: '5 years'}
*/

// 👉 check key exists using WeakSet.has(key)
console.log(employees.has(employee1)); // true
console.log(employees.has(employee2)); // true

// 👉 delete key-value using WeakSet.delete(key)
console.log(employees.delete(employee1)); // true
console.log(employees);
/* 👇 output 
[[Entries]]
0: value: {name: 'Steve', experience: '8 years'}
*/
```

> ### What is a pure function
A Pure function is a function where the return value is only determined by its arguments without any side effects. i.e, If you call a function with the same arguments 'n' number of times and 'n' number of places in the application then it will always return the same value.

> ### How do you redeclare variables in switch block without an error
```
let counter = 1;
switch (x) {
  case 0: {
    let name;
    break;
  }
  case 1: {
    let name; // No SyntaxError for redeclaration.
    break;
  }
}
```
> #### What is the Temporal Dead Zone

Time since when the let variable was hoisted until it is initialized some value.

- So any line till before "let a = 10" is the TDZ for a

```
console.log(a); // ReferenceError: Cannot access 'a' before initialization
console.log(b); // prints undefined as expected
let a = 10;
console.log(a); // 10
var b = 15;
console.log(window.a); // undefined
console.log(window.b); // 15
```

>### Hoisting
Hoisting is a concept which enables us to extract values of variables and functions even before initialising/assigning value without getting error 

Hoisting in JavaScript is a behavior in which a function or a variable can be used before declaration. 


When javaScript engine starts executing the code, It creates the global execution context in callstack
Each context in callstack has two phases:-
1) Memory Creation
2) Code Execution

```js
/*
💡 3 Things you should know about "Hoisting"
👉 Hoisting of Variables ( var, let, const and global ) ?
👉 Hoisting of Functions ( declaration and expression ) ?
👉 Hoisting of Classes ( declaration and expression ) ?
*/

// Hoisting of Variables ?

// case 1:- varibles declared with var keyword
console.log(name); // undefined
var name = "Jayesh";
console.log(name); // Jayesh

// case 2:- let and const variables ( Temporal Dead Zone :- Technically they are also hoisted )
// What is TDZ ? :- time frame between let and const varibles are hoisted to they are initialized
// let and const are allocated in diffrent memory space ( script scope ) than global scope

// let example
console.log(age); // Uncaught ReferenceError: Cannot access 'age' before initialization
let age = 24;
console.log(age); // 24

// const example
console.log(language); // Uncaught ReferenceError: Cannot access 'language' before initialization
const language = "javaScript";
console.log(language); // javaScript

// case 3:- global variables
console.log(a); // Uncaught ReferenceError: a is not defined
a = 4;
console.log(a); // 4

// Hoisting of functions ?

// case 1:- function declaration
displayName(); // Jc
function displayName() {
  console.log("Jc");
}
displayName(); // Jc

// case 2:- function expression
// with "var" keyword
getName(); // Uncaught TypeError: getName is not a function ( getName is undefined here )
var getName = function () {
  console.log("Jayesh");
};
getName(); // Jayesh

// with "let" or "const" keyword
getNameTDZ(); // Uncaught ReferenceError: Cannot access 'getNameTDZ' before initialization
const getNameTDZ = function () {
  console.log("Jayesh");
};
getNameTDZ(); // Jayesh

// case 3:- Arrow function ( similar to function expression )
// with "var" keyword
getNameArrow(); // Uncaught TypeError: getNameArrow is not a function ( getNameArrow is undefined here )
var getNameArrow = () => {
  console.log("Jayesh");
};
getNameArrow(); // Jayesh

// with "let" or "const" keyword
getNameArrowTDZ(); // Uncaught ReferenceError: Cannot access 'getNameArrowTDZ' before initialization
const getNameArrowTDZ = () => {
  console.log("Jayesh");
};
getNameArrowTDZ(); // Jayesh

// Hoisting of Classes ?

// case 1:- class declaration

// var jayesh = new Person("jayesh", 24); // Uncaught ReferenceError: Cannot access 'Person' before initialization ( TDZ )

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const jc = new Person("jc", 24);
console.log(jc); // Person { name: 'jc', age: 24 }

// case 2:- class expression

// with "var" keyword
var viru = new Player("viru"); // Uncaught TypeError: Player is not a constructor ( Player is undefined here )

var Player = class {
  constructor(name) {
    this.name = name;
  }
};

var virat = new Player("virat");
console.log(virat); // Player { name: 'virat' }

// with "let" or "const" keyword

const meow = new Animal("meow"); // Uncaught ReferenceError: Cannot access 'Animal' before initialization ( TDZ )

const Animal = class {
  constructor(name) {
    this.name = name;
  }
};

const cat = new Animal("cat");
console.log(cat); // Animal { name: 'cat' }

```


> ### What is webpack
Webpack is a module bundler for JavaScript applications
* Uses
  * Make Build
  * Js & CSS minify
  * Create the entry file

> ### What are the possible ways to create objects in JavaScript 2
* Object constructor
 ```
 var object = new Object();
 ```
 * Object's create method:
 ```
 var object = Object.create(null);
 ```
 * Object literal syntax:
 ```
 var object = {
     name: "Sudheer",
     age: 34
};
```
* Function constructor:
```
function Person(name) {
  this.name = name;
  this.age = 21;
}
var object = new Person("Sudheer");
```
* Function constructor with prototype: 
```
function Person() {}
Person.prototype.name = "Sudheer";
var object = new Person();
```
* ES6 Class syntax:
```
class Person {
  constructor(name) {
    this.name = name;
  }
}

var object = new Person("Sudheer");
```

> ### Prototype chaining & Prototype Inheritance

Prototype inheritance refers to the mechanism by which objects inherit properties and methods from their prototypes or parents.

Prototype chaining is a mechanism in JavaScript When a property or method is accessed on an object, if that property or method does not exist on the object itself, JavaScript will look for it on the object's prototype object. If it's still not found, JavaScript will continue to search up the prototype chain, looking at the prototype's prototype, and so on, until it either finds the property or method or reaches the end of the chain.

For example, suppose you have an object foo that has a prototype object bar, which in turn has a prototype object baz. If you try to access a property on foo that doesn't exist on foo itself, JavaScript will look for it on bar. If it's not on bar, JavaScript will then look on baz. If it's still not found, JavaScript will continue up the prototype chain until it either finds the property or reaches the end of the chain.


When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.



👉 Prototype and Prototype Inheritance 
The prototype is an object that is associated with every functions and objects by default in JavaScript,
Every object includes __proto__ property that points to prototype object of a function that created the object.

💡Difference between prototype and  __proto__
prototype is a property of a Function object. It is the prototype of objects constructed by that function.
__proto__ is an internal property of an object, pointing to its prototype.


```js
// 👉 Prototype
// function constructor, Person.prototype => Object.prototype => null
const Person = function (name, age) {
  // instance members created for each object separately consume extra memory
  this.name = name;
  this.age = age;
  this.getName = function () {
    console.log("name is", this.name);
  };
};

const jayesh = new Person("jayesh", 24);
// jayesh.__proto__ => Person.prototype => Object.prototype => null
console.log("jayesh", jayesh);
/* output
age: 24;
getName: ƒ(); => method created separately for jayesh object consume extra memory
name: "jayesh";
*/
jayesh.getName(); // name is jayesh
console.log(jayesh.__proto__); // Person.prototype
console.log(jayesh.__proto__ === Person.prototype); // true
console.log(Object.getPrototypeOf(jayesh) === Person.prototype); // true
console.log(jayesh.__proto__.__proto__); // Object.prototype
console.log(jayesh.__proto__.__proto__.__proto__); // null

const sam = new Person("sam", 25);
// sam.__proto__ => Person.prototype => Object.prototype => null
console.log("sam", sam);
/* output
age: 25;
getName: ƒ(); => method created separately for sam object consume extra memory
name: "sam";
*/
sam.getName(); // name is sam

// Now, Let's create prototype member ( common parent inherit member for all objects ) saves memory.
Person.prototype.getAge = function () {
  console.log("age is", this.age);
};

console.log("After adding getAge fn as Prototype member");
console.log("jayesh", jayesh);
/* output
age: 24;
getName: ƒ(); => method created separately for jayesh object consume extra memory
name: "jayesh";
*/
console.log("sam", sam);
/* output
age: 25;
getName: ƒ(); => method created separately for sam object consume extra memory
name: "sam";
*/

console.log("Person.prototype", Person.prototype);
/*output
getAge: ƒ () => common method sharable with jayesh and sam object saves memory
constructor: ƒ (name, age) => function constructor
[[Prototype]]: Object => Object.Prototype => null
*/

// only one copy of getAge() will be created inside Person.prototype
jayesh.getAge(); // age is 24
sam.getAge(); // age is 24

// now let's add one new property to jayesh
jayesh.lastName = "Choudhary";
console.log(jayesh);
/* output
age: 24
getName: ƒ ()
lastName: "Choudhary" // new property added only in jayesh obj not in Person.prototype
name: "jayesh"
*/

// now let's check how to get all keys of object
// 1) get instance members key
console.log(Object.keys(jayesh));
// ['name', 'age', 'getName', 'lastName']

// 2) get Instance + prototype members key (Recommended)
for (let key in jayesh) {
  console.log(key);
}
// name, age, getName, lastName, getAge(Prototype member)

// Now, Let's see Prototype inheritance

// Parent function contructor Parent.prototype => Object.prototype => null
const Parent = function (name, age) {
  //instance member
  this.name = name;
  this.age = age;
};

// adding prototype member to Parent
Parent.prototype.getNameAge = function () {
  console.log("name", this.name, "age", this.age);
};

// creating object of Parent function constructor
const joseph = new Parent("joseph", 35);
joseph.getNameAge(); // name joseph age 35

// Child function contructor Child.prototype => Object.prototype => null
const Child = function (name, age, isCrying) {
  // function constructor borrowing using call method (inheriting instance members)
  Parent.call(this, name, age);
  this.isCrying = isCrying;
};

// Now we have to make Child.prototype points to Parent.Prototype (inheriting prototype members)
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
// After above 2 steps, Child.prototype => Parent.prototype => Object.prototype => null

const josephBaby = new Child("josephBaby", 3, true);
console.log(josephBaby);
josephBaby.getNameAge(); // name josephBaby age 3, child is inheriting the property getNameAge of parent.

```



> ### Some cases of === or ==
```
0 == false   // true
0 === false  // false
1 == "1"     // true
1 === "1"    // false
null == undefined // true
null === undefined // false
'0' == false // true
'0' === false // false
[]==[] or []===[] //false, refer different objects in memory
{}=={} or {}==={} //false, refer different objects in memory
```

> ### What is a unary function
Unary function (i.e. monadic) is a function that accepts exactly one argument. It stands for a single argument accepted by a function

> ### How do you decode or encode a URL in JavaScript?
In JavaScript, you can encode or decode a URL using the encodeURIComponent() and decodeURIComponent() functions, respectively.
The encodeURIComponent() function encodes a string by replacing special characters with their corresponding escape sequences. This is useful when you want to include special characters, such as spaces or non-ASCII characters, in a URL.

Here is an example of how to encode a URL in JavaScript using encodeURIComponent():\

```
const url = "https://www.example.com/search?q=hello world";
const encodedUrl = encodeURIComponent(url);
console.log(encodedUrl);
// Output: "https%3A%2F%2Fwww.example.com%2Fsearch%3Fq%3Dhello%20world"
```

The decodeURIComponent() function decodes a string that has been encoded using encodeURIComponent(). This is useful when you want to retrieve the original string from an encoded URL.

Here is an example of how to decode a URL in JavaScript using decodeURIComponent():

```
const encodedUrl = "https%3A%2F%2Fwww.example.com%2Fsearch%3Fq%3Dhello%20world";
const decodedUrl = decodeURIComponent(encodedUrl);
console.log(decodedUrl);
// Output: "https://www.example.com/search?q=hello world"
```
Note that encodeURI() and decodeURI() functions are also available in JavaScript, which are similar to encodeURIComponent() and decodeURIComponent() respectively, but with slightly different encoding rules.

> ### What are classes in ES6
Classes are a template ( a blueprint ) for creating objects.

In ES6, Javascript classes are primarily syntactic sugar over JavaScript’s existing prototype-based inheritance. For example, the prototype based inheritance written in function expression as below,

```js
function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has" + this.color + " color";
};
```
Whereas ES6 classes can be defined as an alternative

```js
class Bike {
  constructor(color, model) {
    this.color = color;
    this.model = model;
  }

  getDetails() {
    return this.model + " bike has" + this.color + " color";
  }
}
```

Below is for the parent and child
```js
// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

// Child class
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // call the parent class constructor with 'super'
    this.breed = breed;
  }
  
  speak() { // override the parent class method
    console.log(`${this.name} barks!`);
  }
}

// Create instances of both classes
const animal = new Animal('Animal');
const dog = new Dog('Buddy', 'Golden Retriever');

animal.speak(); // Animal makes a noise.
dog.speak(); // Buddy barks!
```

💡 9 Things you should know about Classes and Objects.
1) Ways to define a class ( Class Declaration, Class Expression).
2) Do Classes get Hoisted ? 
3) Types of Constructor ( default constructor, Parameterized constructor ).
4) Class Inheritance.
5) Method Overriding.
6) Class Static Methods and Properties.
7) Private Properties in Class using "#".
8) Classes getters and setters.
9) 8 Ways to create objects in javascript.

Two ways to define class in javascript
1) Class Declaration
2) Class Expression

1) Let's take an example Class Declaration

```js

class Person {
  // special method for creating and initializing an object
  constructor(name, age) {
    // instance members ( created for each object separately )
    this.name = name;
    this.age = age;
  }

  // prototype members ( created in Person.prototype common sharable with all object )
  getInfo() {
    console.log("name", this.name, "age", this.age);
  }
}

console.log(typeof Person); // function, ( Person.prototype => Object.prototype => null )
// Everything in javascript is an object
const jayesh = new Person("jayesh", 24);
jayesh.getInfo(); // name jayesh age 24
```

2) Let's take an example Class Expression

```js
// unnamed class expression
const Person1 = class {
  constructor(name, age) {
    // instance members ( created for each object separately )
    this.name = name;
    this.age = age;
  }
};

const sam = new Person1("sam", 24);
sam.getInfo(); // name sam age 24

// named class expression
const Person2 = class PersonClass {
  constructor(name, age) {
    // instance members ( created for each object separately )
    this.name = name;
    this.age = age;
  }
};

const john = new Person("john", 24);
john.getInfo(); // name john age 24
```

---

💡 Class Hoisting

Class Declaration hoisting ? => TDZ

```js
const Ford = new Car("black"); // Uncaught ReferenceError: Cannot access 'Car' before initialization

class Car {
  constructor(color) {
    this.color = color;
  }
}

// Class Expression hoisting ? => TDZ (let, const) or undefined (var)

const Ferrari = new Car("red"); // Uncaught ReferenceError: Cannot access 'Car' before initialization

const Car = class {
  constructor(color) {
    this.color = color;
  }
};
```

---

💡 Two types of Constructor
  1) default constructor
  2) Parameterized constructor


i. Let's take an example default constructor in Class Declaration

```js
class Animal1 {
  // If we do not specify any constructor default constructor will be used

  // prototype member
  display() {
    console.log("prototype member");
  }
}

const cat = new Animal1();
cat.display();
```

ii. Let's take an example parameterized constructor in Class Declaration

```js
class Animal2 {
  //  parameterized constructor overriding default constructor
  constructor(color) {
    // instance member
    this.color = color;
  }

  // prototype members
  display() {
    console.log("color", this.color);
  }
}

const dog = new Animal2("black");
dog.display(); // color black
```

---

💡 Class Inheritance

```js
class Parent {
  constructor(name, age) {
    // instance members
    this.name = name;
    this.age = age;
  }

  // prototype member
  getInfo() {
    console.log("name", this.name, "age", this.age);
  }
}

const sachin = new Parent("sachin", "60");
sachin.getInfo(); // name sachin age 60

class Child extends Parent {
  // case 1 :- if we don't specify constructor then default constrouctor calls super constructor automatically

  // case 2 :- if we specify parameterized constructor then need to call super constructor at the starting
  constructor(name, age) {
    super(name, age); // similar to Parent.call(this, name, age);
  }
}

const sachinBaby = new Child("sachinBaby", "28");
sachinBaby.getInfo(); // name sachinBaby age 28 ( Child inheriting the properties of Parent )
```

---

Class Inheritance Method Overriding

```js
class Father {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getInfo() {
    console.log("father Info", this.name, this.age);
  }
}

const daddy = new Father("daddy", 70);
daddy.getInfo(); // father Info daddy 70

class Son extends Father {
  constructor(name, age, sport) {
    super(name, age);
    this.sport = sport;
  }
  // overriding the method getInfo() of Parent class
  getInfo() {
    console.log("Son Info", this.name, this.age, "plays", this.sport);
  }
}

const babby = new Son("babby", 10, "cricket");
babby.getInfo(); // Son Info babby 10 plays cricket
```

---

Class Static Methods and Properties ( created once and only access by class )

```js
class Student {
  static school = "little flower";
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // can be used as utility functions
  static ageDifference(a, b) {
    return a - b;
  }

  // object or intance method
  displaySchool() {
    // can't access static members
    console.log(this.school);
  }

  // class method
  static displaySchoolName() {
    console.log(this.school);
  }
}

const stud1 = new Student("jonh", 15);
const stud2 = new Student("sam", 13);

// static method or class method
const ageDiff = Student.ageDifference(stud1.age, stud2.age);
console.log(ageDiff); // 2

Student.displaySchoolName(); // little flower
stud1.displaySchool(); // undefined
stud2.displaySchool(); // undefined
```

---

Private Properties in Class using "#"

```js
class BankAccount {
  // private member
  #amount;
  constructor(name, amount) {
    this.name = name; // this is public
    this.#amount = amount; // this is private
  }

  // private method
  #withdrawAmount(amount) {
    this.#amount -= amount;
    console.log(this.#amount);
  }

  displayAmount() {
    // here you can access private members
    console.log(this.#amount);
  }

  enterPinAndWithdraw(amount) {
    this.#withdrawAmount(amount);
  }
}

const account = new BankAccount("rakesh", 5000);
console.log(account.name); // rakesh

// console.log(account.#amount); // SyntaxError
account.displayAmount(); // 5000

// account.#withdrawAmount(); // SyntaxError
account.enterPinAndWithdraw(2000); // 3000
```

---

Classes getters and setters

```js
class User {
  #name;
  #age;
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get age() {
    return this.#age;
  }

  set age(age) {
    this.#age = age;
  }
}

const mukesh = new User("mukesh", 44);
console.log(mukesh.name); // mukesh
console.log(mukesh.age); // 44

mukesh.name = "new mukesh";
console.log(mukesh.name); // new mukesh
mukesh.age = 45;
console.log(mukesh.age); // 45
```

> ### What are javascript accessors

ECMAScript 5 introduced javascript object accessors or computed properties through getters and setters. Getters uses the `get` keyword whereas Setters uses the `set` keyword.


```js
var user = {
  firstName: "John",
  lastName: "Abraham",
  language: "en",
  get lang() {
    return this.language;
  },
  set lang(lang) {
    this.language = lang;
  },
};
console.log(user.lang); // getter access lang as "en"
user.lang = "fr";
console.log(user.lang); // setter used to set lang as "fr"
```

<br>




---

8 Ways to create object in javascript

1) using new keyword ( object constructor )

```js
const obj1 = new Object();
obj1.name = "Jc";
obj1.age = 24;
console.log(obj1); // { name: 'Jc', age: 24  }
```

2) using object literals
```js
const obj2 = {
  name: "Jc",
  age: 24,
};
console.log(obj2); // { name: 'Jc', age: 24  }
```


3) using function constructor

```js
function Person3(name, age) {
  this.name = name;
  this.age = age;
}
const obj3 = new Person3("Jc", 24);
console.log(obj3); // Person3 { name: 'Jc', age: 24 }
```


4) using class and constructor

```js
class Person4 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const obj4 = new Person4("Jc", 24);
console.log(obj4); // Person4 { name: 'Jc', age: 24 }
```

5) using Object.create()

```js
const obj5 = Object.create({ name: "Jc", age: 24 });
console.log(obj5.name); // Jc
console.log(obj5.age); // 24
```

6) using Object.assign()

```js
const obj6 = Object.assign({}, { name: "Jc", age: 24 });
console.log(obj6); // { name: 'Jc', age: 24 }
```

7) using singleton pattern

```js
const obj7 = new (function (name, age) {
  this.name = name;
  this.age = age;
})("Jc", 24);
console.log(obj7); // { name: 'Jc', age: 24 }
```


8) using factory function

```js
function Person8(name, age) {
  return {
    name: name,
    age: age,
  };
}
const obj8 = Person8("Jc", 24);
console.log(obj8); // { name: 'Jc', age: 24 }
```




> ### What happens if you write constructor more than once in a class
The "constructor" in a class is a special method and it should be defined only once in a class. i.e, If you write a constructor method more than once in a class it will throw a `SyntaxError` error.

```
 class Employee {
   constructor() {
     this.name = "John";
   }
   constructor() {   //  Uncaught SyntaxError: A class may only have one constructor
     this.age = 30;
   }
 }

 var employeeObject = new Employee();

 console.log(employeeObject.name);
 ```

 > ### How do you call the constructor of a parent class
 You can use the super keyword to call the constructor of a parent class. Remember that super() must be called before using 'this' reference. Otherwise it will cause a reference error. Let's the usage of it,


 ```
 class Square extends Rectangle {
  constructor(length) {
    super(length, length);
    this.name = "Square";
  }

  get area() {
    return this.width * this.height;
  }

  set area(value) {
    this.area = value;
  }
}
```

**Note** : If you are `extending` the class then, you can skip the constructor part then the `this` of function will point to parent. If we have used the  constructor in child then `super` must be used. Otherwise the error will come `Error: Must call super constructor in derived class before accessing 'this' or returning from derived constructor`

below code is ok

```js
class Foo {
  constructor(name) {
    this.name = name;
  }

  getNameSeparator() {
    return '-';
  }
}

class FooBar extends Foo {
  getFullName() {
    return this.name
  }
}

const firstFooBar = new FooBar('foo', 1);

console.log(firstFooBar);

```

but below code will give error

```js
class Player {
  constructor(name, role, country) {
    // instance members
    this.name = name;
    this.role = role;
    this.country = country;
  }

  // prototype members - common tasks which can be perform by any player in a team
  // 1) Batsman class extends from Player Base class
class Batsman extends Player {
  // prototype member
  batting() {
    // batting method created count 1
    console.log(`${this.name} can do batting.`);
  }
}

const virat = new Batsman("Virat Kohli", "Batsman", "India");
console.log(virat); // Batsman { name: 'Virat Kohli', role: 'Batsman', country: 'India' }
virat.fielding(); // Virat Kohli can do fielding.
virat.running(); // Virat Kohli can do running.
virat.batting(); // Virat Kohli can do batting.
}

class FooBar extends Foo {
  constructor(name, index) {
    
    this.index = index;
  }

  getFullName() {
    return this.name 
  }
}

const firstFooBar = new FooBar('foo', 1);

console.log(firstFooBar);

```



> ### What are the differences between cookie, local storage and session storage
Below are some of the differences between cookie, local storage and session storage,

Feature |	Cookie |	Local storage |	Session storage
-------- | ------- | -------------- | ---------------
Accessed on client or server side |	Both server-side & client-side	| client-side only |	client-side only
Lifetime |	As configured using Expires option |	until deleted |	until tab is closed
SSL support |	Supported |	Not supported |	Not supported
Maximum data size |	4KB	| 5 MB |	5MB

> ### What is a storage event and its event handler
The StorageEvent is an event that fires when a storage area has been changed in the context of another document. Whereas onstorage property is an EventHandler for processing storage events. The syntax would be as below
```
window.onstorage = functionRef;
```
Let's take the example usage of onstorage event handler which logs the storage key and it's values
```
window.onstorage = function (e) {
  console.log(
    "The " +
      e.key +
      " key has been changed from " +
      e.oldValue +
      " to " +
      e.newValue +
      "."
  );
};
```

> ### What is the purpose of double exclamation
The double exclamation or negation(!!) ensures the resulting type is a boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true. For example, you can test IE version using this expression as below,
```
let isIE8 = false;
isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
console.log(isIE8); // returns true or false
```


> ### What is the difference between null and undefined
Null |	Undefined
----- | -----------
It is an assignment value which indicates that variable points to no object. | 	It is not an assignment value where a variable has been declared but has not yet been assigned a value.
Type of null is object  | 	Type of undefined is undefined
The null value is a primitive value that represents the null, empty, or non-existent reference.  | 	The undefined value is a primitive value used when a variable has not been assigned a value.
Indicates the absence of a value for a variable  | 	Indicates absence of variable itself
Converted to zero (0) while performing primitive operations  | 	Converted to NaN while performing primitive operations

> ### What is eval
The eval() function evaluates JavaScript code represented as a string. The string can be a JavaScript expression, variable, statement, or sequence of statements.
isko hum calculator me use kar sakte h, '10+3' as a string pass kar do ye 13 return karega.
```
console.log(eval("1 + 2")); //  3
```

> ### Is it recommended to use eval
No, it allows arbitrary code to be run which causes a security problem. As we know that the eval() function is used to run text as code. In most of the cases, it should not be necessary to use it.

> ### What is isNaN
The isNaN() function is used to determine whether a value is an illegal number (Not-a-Number) or not. i.e, This function returns true if the value equates to NaN. Otherwise it returns false.
```
isNaN("Hello"); //true
isNaN("100"); //false
```

> ### What is the difference between document load and DOMContentLoaded events
The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for assets(stylesheets, images, and subframes) to finish loading. Whereas The load event is fired when the whole page has loaded, including all dependent resources(stylesheets, images).

> ### What is the difference between native, host and user objects
`Native objects` are objects that are part of the JavaScript language defined by the ECMAScript specification. For example, String, Math, RegExp, Object, Function etc core objects defined in the ECMAScript spec.
`Host objects` are objects provided by the browser or runtime environment (Node). For example, window, XmlHttpRequest, DOM nodes etc are considered as host objects.
`User objects` are objects defined in the javascript code. For example, User objects created for profile information.

> ### What are the pros and cons of promises over callbacks
Below are the list of pros and cons of promises over callbacks,

Pros:

* It avoids callback hell which is unreadable
* Easy to write sequential asynchronous code with .then()
* Easy to write parallel asynchronous code with Promise.all()
* Solves some of the common problems of callbacks(call the callback too late, too early, many times and swallow errors/exceptions)

Cons:

* It makes little complex code
* You need to load a polyfill if ES6 is not supported


> ### What is the difference between an attribute and a property
Attributes are defined on the HTML markup whereas properties are defined on the DOM. For example, the below HTML element has 2 attributes type and value,
```
<input type="text" value="Name:">
```
You can retrieve the attribute value as below,
```
const input = document.querySelector("input");
console.log(input.getAttribute("value")); // Good morning
console.log(input.value); // Good morning
```

And after you change the value of the text field to "Good evening", it becomes like

```
console.log(input.getAttribute("value")); // Good evening
console.log(input.value); // Good evening
```

> ### What is the purpose of void 0
Void(0) is used to prevent the page from refreshing.
```
<a href="JavaScript:void(0);" onclick="alert('Well done!')">
  Click Me!
</a>
```

> ### What is the use of preventDefault method
The preventDefault() method cancels the event if it is cancelable, meaning that the default action or behaviour that belongs to the event will not occur. For example, prevent form submission when clicking on submit button and prevent opening the page URL when clicking on hyperlink are some common use cases.

> ### What is BOM
The Browser Object Model (BOM) allows JavaScript to "talk to" the browser. It consists of the objects navigator, history, screen, location and document which are children of the window. The Browser Object Model is not standardized and can change based on different browsers.

![BOM](/images/bom.png)

> ### How do you redirect new page in javascript
```
function redirect() {
  window.location.href = "newPage.html";
}
```

> ### How do get query string values in javascript
`window.location.search`
Basically use te window.location to get all things related to url

> ### Can we define properties for functions
Yes, We can define properties for functions because functions are also objects.
```
fn = function (x) {
  //Function code goes here
};

fn.name = "John";

fn.profile = function (y) {
  //Profile code goes here
};
```

> ### What is the way to find the number of parameters expected by a function
You can use function.length syntax to find the number of parameters expected by a function. Let's take an example of sum function to calculate the sum of numbers,

```
function sum(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
sum.length; // 4 is the number of parameters expected.
```

> ### What is a polyfill
A polyfill is a piece of JS code used to provide modern functionality on older browsers that do not natively support it. For example, Silverlight plugin polyfill can be used to mimic the functionality of an HTML Canvas element on Microsoft Internet Explorer 7.

> ### What are js labels
The label statement allows us to name loops and blocks in JavaScript. We can then use these labels to refer back to the code later. For example, the below code with labels avoids printing the numbers when they are same,
```
var i, j;

loop1: for (i = 0; i < 3; i++) {
  loop2: for (j = 0; j < 3; j++) {
    if (i === j) {
      continue loop1;
    }
    console.log("i = " + i + ", j = " + j);
  }
}

// Output is:
//   "i = 1, j = 0"
//   "i = 2, j = 0"
//   "i = 2, j = 1"
```

> ### Can you write a random integers function to print integers with in a range
```
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInteger(1, 100); // returns a random integer from 1 to 100
randomInteger(1, 1000); // returns a random integer from 1 to 1000
```

> ### How do you get the image width and height using JS
You can programmatically get the image and check the dimensions(width and height) using Javascript.
```
var img = new Image();
img.onload = function () {
  console.log(this.width + "x" + this.height);
};
img.src = "http://www.google.com/intl/en_ALL/images/logo.gif";
```

> ### How do you convert date to another timezone in javascript
You can use the toLocaleString() method to convert dates in one timezone to another. For example, let's convert current date to British English timezone as below,
```
console.log(event.toLocaleString("en-GB", { timeZone: "UTC" })); //29/06/2019, 09:56:00
```

> ### What are the properties used to get size of window
You can use innerWidth, innerHeight, clientWidth, clientHeight properties of windows, document element and document body objects to find the size of a window. Let's use them combination of these properties to calculate the size of a window or document,
```
var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
```

> ### Can you apply chaining on conditional operator
```
function traceValue(someParam) {
  return condition1
    ? value1
    : condition2
    ? value2
    : condition3
    ? value3
    : value4;
}

// The above conditional operator is equivalent to:

function traceValue(someParam) {
  if (condition1) {
    return value1;
  } else if (condition2) {
    return value2;
  } else if (condition3) {
    return value3;
  } else {
    return value4;
  }
}
```

> ### How do you detect javascript disabled in the page
You can use the `<noscript>` tag to detect javascript disabled or not. The code block inside `<noscript>` gets executed when JavaScript is disabled, and is typically used to display alternative content when the page generated in JavaScript.
```
<script type="javascript">
    // JS related code goes here
</script>
<noscript>
    <a href="next_page.html?noJS=true">JavaScript is disabled in the page. Please click Next Page</a>
</noscript>
```

> ### Calling a function when it exist

```
callingFunction?.()
```


> ### What happens if you do not use rest parameter as a last argument
The rest parameter should be the last argument, as its job is to collect all the remaining arguments into an array. For example, if you define a function like below it doesn’t make any sense and will throw an error.
```
function someFunc(a,…b,c){
//You code goes here
return;
}
```

> ### How do you create an object with prototype
The Object.create() method is used to create a new object with the specified prototype object and properties. i.e, It uses an existing object as the prototype of the newly created object. It returns a new object with the specified prototype object and properties.
```
const user = {
  name: "John",
  printInfo: function () {
    console.log(`My name is ${this.name}.`);
  },
};

const admin = Object.create(user);

admin.name = "Nick"; // Remember that "name" is a property set on "admin" but not on "user" object

admin.printInfo(); // My name is Nick
```

> ### What is call stack
Call Stack is a data structure for javascript interpreters to keep track of function calls(creates execution context) in the program. It has two major actions,

* Whenever you call a function for its execution, you are pushing it to the stack.
* Whenever the execution is completed, the function is popped out of the stack.

> ### What is the purpose of compareFunction while sorting arrays
The compareFunction is used to define the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value. Let's take an example to see the usage of compareFunction,

compareFn(a, b) return value |	sort order
-------------  |  -------------
 "> 0"                          |	sort a after b, e.g. [b, a]
 "< 0"                          |	sort a before b, e.g. [a, b]
 "=== 0"                        | keep original order of a and b


```
const d = [1,10,2,1000]

d.sort((a,b)=>{
    debugger    //a,b ulta hota h, b = 1 a = 10, agr a-b +ve to waisa hi rahega
    return a - b
})

console.log(d);
```



> ### What happens If I pass string type for getPrototype method
In ES5, it will throw a TypeError exception if the obj parameter isn't an object. Whereas in ES2015, the parameter will be coerced to an Object.
```
// ES5
Object.getPrototypeOf("James"); // TypeError: "James" is not an object
// ES2015
Object.getPrototypeOf("James"); // String.prototype
```

> ### How do you set prototype of one object to another
You can use the `Object.setPrototypeOf()` method that sets the prototype (i.e., the internal `Prototype` property) of a specified object to another object or null. For example, if you want to set prototype of a square object to rectangle object would be as follows,

```
Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
Object.setPrototypeOf({}, null);
```

> ### How do you check whether an object can be extendable or not
The `Object.isExtensible()` method is used to determine if an object is extendable or not. i.e, Whether it can have new properties added to it or not.
* `Note`: By default, all the objects are extendable. i.e, The new properties can be added or modified.

```
const newObject = {};
console.log(Object.isExtensible(newObject)); //true
```

> ### How do you prevent an object to extend
The `Object.preventExtensions()` method is used to prevent new properties from ever being added to an object. In other words, it prevents future extensions to the object. Let's see the usage of this property,

```
const newObject = {};
Object.preventExtensions(newObject); // NOT extendable

try {
  Object.defineProperty(newObject, "newProperty", {
    // Adding new property
    value: 100,
  });
} catch (e) {
  console.log(e); // TypeError: Cannot define property newProperty, object is not extensible
}
```


> ### What are the different ways to make an object non-extensible
You can mark an object non-extensible in 3 ways,

* Object.preventExtensions
* Object.seal
* Object.freeze

> ### What Is Obfuscation in javascript
Obfuscation is the deliberate act of creating obfuscated javascript code(i.e, source or machine code) that is difficult for humans to understand. It is something similar to encryption, but a machine can understand the code and execute it. Let's see the below function before Obfuscation,

```
function greeting() {
  console.log("Hello, welcome to JS world");
}
```
And after the code Obfuscation, it would be appeared as below,
```
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return c;
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[c] = k[c] || c;
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(
    "2 1(){0.3('4, 7 6 5 8')}",
    9,
    9,
    "console|greeting|function|log|Hello|JS|to|welcome|world".split("|"),
    0,
    {}
  )
);
```

> ### Why do you need Obfuscation
Below are the few reasons for Obfuscation,

* The Code size will be reduced. So data transfers between server and client will be fast.
* It hides the business logic from outside world and protects the code from others
* Reverse engineering is highly difficult
* The download time will be reduced

> ### How do I modify the url without reloading the page
The window.location.href property will be helpful to modify the url but it reloads the page. HTML5 introduced the history.pushState() and history.replaceState() methods, which allow you to add and modify history entries, respectively. For example, you can use pushState as below,
```
window.history.pushState("page2", "Title", "/page2.html");
```

> ### How do you print numbers with commas as thousand separators
You can use the `Number.prototype.toLocaleString()` method which returns a string with a language-sensitive representation such as thousand separator,currency etc of this number.
```
function convertToThousandFormat(x) {
  return x.toLocaleString(); // 12,345.679
}

console.log(convertToThousandFormat(12345.6789));
```

### typeof `new Number(3)` is object not number because of class but Number(3) is number

> ### What is the purpose of double tilde operator
The double tilde operator(~~) is known as double NOT bitwise operator. This operator is going to be a quicker substitute for Math.floor().

> ### Do all objects have prototypes
No. All objects have prototypes except for the base object which is created by the user, or an object that is created using the new keyword.

> ### How do you create specific number of copies of a string
The `repeat()` method is used to construct and return a new string which contains the specified number of copies of the string on which it was called, concatenated together. Remember that this method has been added to the ECMAScript 2015 specification. Let's take an example of Hello string to repeat it 4 times,
```
"Hello".repeat(4); // 'HelloHelloHelloHello'
```

> ### What is the output of prepend additive operator on falsy values
If you prepend the additive(+) operator on falsy values(null, undefined, NaN, false, ""), the falsy value converts to a number value zero. Let's display them on browser console as below,
```
console.log(+null); // 0
console.log(+undefined); // NaN
console.log(+false); // 0
console.log(+NaN); // NaN
console.log(+""); // 0
```


> ### How do you empty an array
You can empty an array quickly by setting the array length to zero.
```
let cities = ["Singapore", "Delhi", "London"];
cities.length = 0; // cities becomes []
```


> ### How do you create an array with some data
You can create an array with some data or an array with the same values using fill method.
```
var newArray = new Array(5).fill("0");
console.log(newArray); // ["0", "0", "0", "0", "0"]
```

> ### Is it possible to add CSS to console messages
Yes, you can apply CSS styles to console messages similar to html text on the web page.

> ### How do you create copy to clipboard button
You need to select the content(using .select() method) of the input element and execute the copy command with execCommand (i.e, execCommand('copy')). You can also execute other system commands like cut and paste.

```
document.querySelector("#copy-button").onclick = function () {
  // Select the content
  document.querySelector("#copy-input").select();
  // Copy to the clipboard
  document.execCommand("copy");
};
```

> ### How do you capture browser back button
The window.onbeforeunload method is used to capture browser back button events. This is helpful to warn users about losing the current data.
```
window.onbeforeunload = function () {
  alert("You work will be lost");
};
```

> ### What is babel
Babel is a JavaScript transpiler to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Some of the main features are listed below,

* Transform syntax
* Polyfill features that are missing in your target environment (using @babel/polyfill)
* Source code transformations (or codemods)

> ### What are the differences between for...of and for...in statements
Both for...in and for...of statements iterate over js data structures. The only difference is over what they iterate:

* for..in iterates over all enumerable property keys of an object
* for..of iterates over the values of an iterable object.
Let's explain this difference with an example,

```
let arr = ["a", "b", "c"];

arr.newProp = "newVlue";

// key are the property keys
for (let key in arr) {
  console.log(key); // 0, 1, 2 & newValue
}

// value are the property values
for (let value of arr) {
  console.log(value); // a, b, c
}
```
Since for..in loop iterates over the keys of the object, the first loop logs 0, 1, 2 and newProp while iterating over the array object. The for..of loop iterates over the values of a arr data structure and logs a, b, c in the console.

> ### How do you create custom HTML element?
The creation of custom HTML elements involves two main steps,

* Define your custom HTML element: First you need to define some custom class by extending HTMLElement class. After that define your component properties (styles,text etc) using connectedCallback method. Note: The browser exposes a function called customElements.define inorder to reuse the element.
```
class CustomElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "This is a custom element";
  }
}
customElements.define("custom-element", CustomElement);
```
* Use custome element just like other HTML element: Declare your custom element as a HTML tag.
```
<body>
    <custom-element>
</body>
```

> ### What are the differences between primitives and non-primitives?
Primitives | 	Non-primitives
-----------  | -----------------
These types are predefined | 	Created by developer
These are immutable | 	Mutable
Compare by value | 	Compare by reference
Stored in Stack | 	Stored in heap
Contain certain value | 	Can contain NULL too

### throttling vs debouncing
* Throttling is a technique where a function is executed at a regular interval, no matter how frequently it is called.
*  Debouncing, on the other hand, is a technique where a function is only executed after a certain amount of time has passed since the last time it was called.

debounce

💡Other use cases :-
👉 Continous button click event function call can be delay.
👉 Resize of window event function call can be delay.

```js
function debounce(func, delay) {
  let timeoutId;
  
  return function() {
    const context = this;
    const args = arguments;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  };
}

// Example usage
const debouncedFunction = debounce(function() {
  console.log('Debounced function executed!');
}, 500);

// Attach the debounced function to an event
window.addEventListener('scroll', debouncedFunction);

```

Throttle

```js
function throttle(func, delay) {
  let isThrottled = false;
  
  return function() {
    const context = this;
    const args = arguments;
    
    if (!isThrottled) {
      func.apply(context, args);
      isThrottled = true;
      
      setTimeout(function() {
        isThrottled = false;
      }, delay);
    }
  };
}

// Example usage
const throttledFunction = throttle(function() {
  console.log('Throttled function executed!');
}, 500);

// Attach the throttled function to an event
window.addEventListener('scroll', throttledFunction);

```


Explanation by use case:
* Search bar- Don't want to search every time user presses key? Want to search when user stopped typing for 1 sec. Use debounce 1 sec on key press.
* Shooting game- Pistol take 1 sec time between each shot but user click mouse multiple times. Use throttle on mouse click.


> ### How do you create your own bind method using either call or apply method?

The custom bind function needs to be created on Function prototype inorder to use it as other builtin functions. This custom function should return a function similar to original bind method and the implementation of inner function needs to use apply method call.

The function which is going to bind using custom `myOwnBind` method act as the attached function(`boundTargetFunction`) and argument as the object for `apply` method call.


```
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

> ### "this" refrence in class, constructor function, object in js

  1. Using "this" in a Class:

  ```
  class MyClass {
    constructor(name) {
      this.name = name;
    }

    sayHello() {
      console.log(`Hello, ${this.name}!`);
    }
  }

  const obj = new MyClass('John');
  obj.sayHello(); // Output: Hello, John!
  ```

  2. Using "this" in a Constructor Function:

  ```
    function Person(name) {
      this.name = name;

      this.sayHello = function() {
        console.log(`Hello, ${this.name}!`);
      };
    }

    const person1 = new Person('Alice');
    person1.sayHello(); // Output: Hello, Alice!
  ```

  3. Using "this" in an Object:

  ```
    const myObject = {
      value: 42,
      getValue: function() {
        console.log(this.value);
      }
    };

    myObject.getValue(); // Output: 42
  ```

### Event Loop
The event loop is a process that continuously monitors both the call stack and the event queue and checks whether or not the call stack is empty. If the call stack is empty and there are pending events in the event queue, the event loop dequeues the event from the event queue and pushes it to the call stack. The call stack executes the event, and any additional events generated during the execution are added to the end of the event queue.

---
event loop sequence microtask - https://www.jsv9000.app/
---

### http methods
* GET: GET request is used to read/retrieve data from a web server. 
* POST: POST request is used to send data (file, form data, etc.) to the server. On successful creation, it returns an HTTP status code of 201.
* PUT: A PUT request is used to modify the data on the server. It replaces the entire content at a particular location with data that is passed in the body payload.If there are no resources that match the request, it will generate one.
* PATCH: PATCH is similar to PUT request, but the only difference is, it modifies a part of the data. It will only replace the content that you want to update.
* DELETE: A DELETE request is used to delete the data on the server at a specified location.

### how to stop all the console log at onec console.log = function (){}

### async vs differ  === see this image for answer  https://i.stack.imgur.com/wfL82.png

###   2 + undefined gives NaN, not gives any error

### There are 8 falsy values:
undefined, null, NaN, false,'' (empty string),0,-0,0n (BigInt(0))

### What is OBJECTS
JavaScript supports programming with objects. Objects are a way of organizing the variables. The different screen elements such as Web pages, forms, text boxes, images, and buttons are treated as objects. Every object has its own properties and methods.
* Properties define the characteristics of an object. Examples: color, length, name, height, width Methods are the actions that the
* object can perform or that can be performed on the object. Examples: alert, confirm, write, open, close .

### how to call two api when second one depend on first response in js
```
async function fetchData() {
  try {
    const first_api_response = await fetch('first_api_url');
    const first_api_data = await first_api_response.json();
    
    const second_api_url = `second_api_base_url?param=${first_api_data.some_value}`;
    const second_api_response = await fetch(second_api_url);
    const second_api_data = await second_api_response.json();
    
    console.log(second_api_data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
```


or

```
fetch('first_api_url')
  .then(response => response.json())
  .then(data => {
    // Use the data from the first API response to construct the second API URL
    const second_api_url = `second_api_base_url?param=${data.some_value}`;
    
    // Call the second API using the constructed URL
    return fetch(second_api_url);
  })
  .then(response => response.json())
  .then(data => {
    // Use the data from the second API response
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
```

or 
```
axios.get(...)
  .then((response) => {
    return axios.get(...); // using response.data
  })
  .then((response) => {
    console.log('Response', response);
  });
```
### Can you name two programming paradigms important for JavaScript app developers?
JavaScript is a multi-paradigm language, supporting imperative/procedural programming along with OOP (Object-Oriented Programming) and functional programming. JavaScript supports OOP with prototypal inheritance.

### Es6(ECMAScript 2015)
let and const, Arrow Functions, Template Literals, rest and spread operator,  Default Parameters in functions, classes

### To delete a property in object
```
const myObject = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

delete myObject.key2;
```

or 

```
const myObject = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

const { key2, ...newObject } = myObject;
```

### Shallow Copy vs Deep copy
* `Shallow copy`: means that only the first level of the object is copied. Deeper levels are referenced.

```
const obj1 = { name: "John", age: 30 };
const obj2 = { ...obj1 };
console.log(obj2); // { name: "John", age: 30 }
```

* `Deep copy`: means that all levels of the object are copied. This is a true copy of the object.

```

const obj = { name: 'Version 1', additionalInfo: { version: 1 } };

const deepCopy = JSON.parse(JSON.stringify(obj));

deepCopy.name = 'Version 2';
deepCopy.additionalInfo.version = 2;

console.log(obj); // { name: 'Version 1', additionalInfo: { version: 1 } }
console.log(deepCopy); // { name: 'Version 2', additionalInfo: { version: 2 } }
```




### Intersection Observer

An Intersection Observer API provides a way to observe the visibility and position of a DOM element relative to the specified root element or viewport.

💡Note - Intersection Observer API is asynchronous, Performs operations in the Microtask queue.

💡Use Cases :-
👉 1) Implementation of infinite scrolling. 
👉 2) lazy-loading images on scroll. 
👉 3) Auto-pause video when it’s out of view


> ### Mutation Observer

The MutationObserver API allows you to continuously monitor the changes being made to the DOM tree. 
When the DOM nodes change, you can invoke a callback function to detect the changes.


> ### Rule of this

💡 7 Things you should know about "this"
👉 Rule 1) function with new keyword ( this refers to the function object )
👉 Rule 2) call, apply, bind ( this refers to the obj passed to methods )
👉 Rule 3) method in object ( this refers to the object )
👉 Rule 4) simple function ( this refers to window object, undefined in strict mode )
👉 Rule 5) multiple rules ( Higher rule has given priority )
👉 Rule 6) arrow function ( inherits "this" from its outer function )
👉 Miscellaneous important things about "this"


Rule 1) function with new keyword ( this refers to the function object )

```js
function Person() {
  console.log(this); // Person {}
  this.name = "Jayesh";
  this.age = 24;
  console.log(this); // Person { name: 'Jayesh', age: 24 }
}

new Person();
```

Rule 2) call, apply, bind ( this refers to the obj passed to methods)

```js

const player = {
  name: "Virat",
  role: "Batsman",
};

// Note:- Normal function ( not an arrow function )
const getPlayerInfo = function (country) {
  console.log(this); // { name: 'Virat', role: 'Batsman' }
  console.log(this.name, this.role, country); // Virat Batsman India
};

getPlayerInfo.call(player, "India"); // here, player borrowing getPlayerInfo function
```

Rule 3) method in object ( this refers to the object )

```js
const obj = {
  name: "Jc",
  displayName() {
    console.log(this); // {name: 'Jc', displayName: ƒ}
    console.log(this.name); // Jc
  },
};

obj.displayName();
```

Rule 4) simple function ( undefined in strict mode)

```js
function simpleFunc() {
  console.log(this); // window object
}

simpleFunc(); // or window.simpleFunc()
```

Rule 5) multiple rules :- Higher rule has more priority

```js
const obj1 = {
  name: "Jayesh",
  showName() {
    console.log(this.name); // Jc
  },
};
const obj2 = {
  name: "Jc",
};

obj1.showName.call(obj2); // Jc precedence of Rule 2) Call method > Rule 3) method in object
```

Rule 6) arrow function :- arrow function does not create its own execution context

inherits "this" from its outer function.

  - case 1:- arrow function without any parent function
  ```js
  const arrowFunc = () => {
    // ( Global function's "this" is window object, arrowFunc inherits "this" of Global function in this case )
    console.log(this); // window object
  };
  arrowFunc();
  ```


  - case 2:- arrow function inside normal function

  ```js
    const animal = {
      name: "cat",
      displayName() {
        console.log(this); // {name: 'cat', displayName: ƒ}
        console.log(this.name); // cat

        // inner arrow function inherits "this" from its outer normal funtion
        const innerArrow = () => {
          console.log(this); // {name: 'cat', displayName: ƒ}
          console.log(this.name); // cat
        };
        innerArrow();
      },
    };

    animal.displayName();
  ```

  - case 3 :- arrow function inside an arrow function

  ```js
    const outerArrow = () => {
      console.log(this); //  window object ( Global function's "this" is window object )

      // inner arrow function inherits "this" from its outer funtion
      const innerArrow = () => {
        console.log(this); // window object
      };
      innerArrow();
    };
    outerArrow();
  ```

  - case 4:- arrow function inside function constructor ( new keyword )

  ```js

    function OuterFunction() {
      this.name = "jayeh";
      console.log(this); // OuterFunction { name: 'jayeh' }

      // inner arrow function inherits "this" from its outer funtion
      const innerArrow = () => {
        console.log(this); // OuterFunction { name: 'jayeh' }
      };
      innerArrow();
    }
    new OuterFunction();
  ```

Miscellaneous important things about "this"


- "this" inside nested normal function

```js
const myObj = {
  name: "Jc",
  outerNormal() {
    console.log(this); // {name: 'Jc', outerNormal: ƒ}

    function innerNormal() {
      console.log(this); // window object
    }
    innerNormal();
  },
};
myObj.outerNormal();
```

- "this" inside normal function having outer arrow function

```js
const myobj2 = {
  name: "Jc",
  outerArrowFoo: () => {
    console.log(this); // window object

    function innerNormal() {
      console.log(this); // window object
    }
    innerNormal();
  },
};
myobj2.outerArrowFoo();
```

- "this" inside nested objects

```js
const outerObj = {
  name: "Jc",
  innerObj: {
    name: "inner Jc",
    getName() {
      console.log(this.name); // inner Jc
    },
  },
};
outerObj.innerObj.getName();
```




### call, bind and apply

### Window vs document

`window` is the top-level object in the browser's JavaScript hierarchy, and it represents the browser window or tab itself. It contains properties and methods that control the behavior of the browser window, such as `alert()`, `confirm()`, `setTimeout()`, `location`, and more. The `window` object is also the global object in the browser's JavaScript environment, meaning that any variables or functions declared without the `var`, `let`, or `const` keywords are automatically added as properties of the window object.

On the other hand, `document` is an object that represents the web page displayed in the browser window. It contains properties and methods that allow you to manipulate the content and structure of the web page, such as `getElementById()`, `createElement()`, `querySelector()`, `innerHTML`, and more. The `document` object is a property of the window object, so you can access it as `window.document` or simply document.

In summary, `window` is used to interact with the browser window, while `document` is used to interact with the content of the web page displayed in that window.


### how to empty a array
```
myArray.length = 0;
```
or 
```
myArray = [];
```

### key,value,entries in object

### Math function in js
Math.ceil(x)	Returns x rounded up next integer
console.log(Math.ceil(4.9)) //5
console.log(Math.ceil(4.5))  //5
console.log(Math.ceil(4.1))  //5
console.log(Math.ceil(-4.1))  //-4

Math.round(x)	Returns x rounded to its nearest integer
console.log(Math.round(4.9))    //5
console.log(Math.round(4.5))    //5
console.log(Math.round(4.1))    //4
console.log(Math.round(-4.1))   //-4

Math.floor(x) returns the value of x rounded down to its nearest integer
console.log(Math.floor(4.9))    //4
console.log(Math.floor(4.5))    //4
console.log(Math.floor(4.1))    //4
console.log(Math.floor(-4.1))   //-5

Math.trunc(x) returns the integer part of x
console.log(Math.trunc(4.9))    //4
console.log(Math.trunc(4.5))    //4
console.log(Math.trunc(4.1))    //4
console.log(Math.trunc(-4.1))   //-4


Math.sqrt()
Math.sqrt(64);

Math.pow()
Math.pow(8, 2);

Math.abs(x) returns the absolute (positive) value of x:
Math.abs(-4.7); //4.7

Math.min(0, 150, 30, 20, -8, -200); //-200
console.log(Math.max(0, 150, 30, 20, -8, -200)) //150


### Needs discussion

How do you define property on Object constructor\
What is the difference between get and defineProperty\
What are the advantages of Getters and Setters\
Can I add getters and setters using defineProperty method\
What is a decorator\
What is an empty statement and purpose of it\
How do you get metadata of a module\
hat is a comma operator\
What is the advantage of a comma operator\
What is an object initializer\
What are the DOM methods available for constraint validation\
What are the available constraint validation DOM properties\
What are the list of validity properties\
Give an example usage of rangeOverflow property\
How do you get property descriptors of an object\
What are the attributes provided by a property descriptor\
How to cancel a fetch request\
What is minimum timeout throttling\
How do you implement zero timeout in modern browsers\
What is the difference between Function constructor and function declaration\
What is the difference between function and class declarations\
How to detect if a function is called as constructor\
How to invoke an IIFE without any extra brackets?\
What is the difference between setTimeout, setImmediate and process.nextTick?\







```
React.memo() is a higher-order component that we can use to wrap components that we do not want to re-render unless props within them change
useMemo() is a React Hook that we can use to wrap functions within a component. We can use this to ensure that the values within that function are re-computed only when one of its dependencies change

debouncing vs throttling
1st one is diff b/w to type value time and second one is the time difference between two function call


window.onbeforeunload = popup;

function popup() {
  return 'I see you are leaving the site';
}
```
### Strict Mode
Please make sure that "use strict" is at the top of your scripts, otherwise strict mode may not be enabled.

Strict mode isn’t enabled here:
```
alert("some code");
// "use strict" below is ignored--it must be at the top

"use strict";

// strict mode is not activated
```
There’s no way to cancel use strict
There is no directive like "no use strict" that reverts the engine to old behavior.
Once we enter strict mode, there’s no going back.

### variables
What’s interesting – the dollar sign '$' and the underscore '_' can also be used in names. They are regular symbols, just like letters, without any special meaning.
These names are valid:
```
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
```

```
let my-name; // hyphens '-' aren't allowed in the name
```

Non-Latin letters are allowed, but not recommended
It is possible to use any language, including cyrillic letters, Chinese logograms and so on, like this:
```
let имя = '...';
let 我 = '...';
```

### Data Types
Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: Infinity, -Infinity and NaN.


url: https://javascript.info/cross-window-communication
above is for iframe or cross-window communication
An <iframe> tag hosts a separate embedded window, with its own separate document and window objects.
We can access them using properties:
iframe.contentWindow to get the window inside the <iframe>.
iframe.contentDocument to get the document inside the <iframe>, shorthand for iframe.contentWindow.document.



must read attack - The clickjacking attack - https://javascript.info/clickjacking  also see https://www.geeksforgeeks.org/http-headers-set-cookie/, https://http.dev/set-cookie


No idea - 
https://javascript.info/arraybuffer-binary-arrays
https://javascript.info/text-decoder
blob


Axios upload progress with progress bar tutorial --- https://www.youtube.com/watch?v=nC3ntJUQrAM
to copy the text - navigator.clipboard.writeText(copy_text)  . We can do according to promise resolve
