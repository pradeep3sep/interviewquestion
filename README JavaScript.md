```
https://github.com/pradeep3sep/javascript-interview-questions
```
break and continue in for loop

setTimeout(functionRef, delay, param1) explain func with param

map and weakMap

> ### Number.isNaN() vs global isNaN()

Number.isNaN() doesn't attempt to convert the parameter to a number, so non-numbers always return false. 

Number.isNaN() return true if the given value is a number with value NaN. Otherwise, false. 

```
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
```
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

> ### Promise
Promise is pending state object which can be either fulfilled or rejected in future.

```
const promise = new Promise(function (resolve, reject) {
  // promise description
});
```
The above condition gives promise of state pending which can be fullfilled or reject

##### Promise resolve() method 
The promise.resolve() is a `static method` of class Promise in JS returns a Promise object that is resolved in state

```
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

> #### What is the purpose of the race method in promise
Promise.race() method will return the promise instance which is firstly resolved or rejected. Let's take an example of race() method where promise2 is resolved first

```
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

> #### What is a callback function
A callback function is a function passed into another function as an argument. This function is invoked inside the outer function to complete an action. Let's take a simple example of how to use callback function

```
function callbackFunction(name) {
  console.log("Hello " + name);
}

function outerFunction(callback) {
  let name = prompt("Please enter your name.");
  callback(name);
}

outerFunction(callbackFunction);
```

> #### What is a callback hell
Callback Hell is an anti-pattern with multiple nested callbacks which makes code hard to read and debug when dealing with asynchronous logic. The callback hell looks like below,

```
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


> ### Web Worker
Some task which are sync and very lengthy task and that could block the main thread and block the UI. then we perform that task in other thread called worker thread which is in browser separate from the js single thread. This happens in the background.

```
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
```
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


> ### Array things
- When setting a property on a JavaScript array when the property is a valid array index and that index is outside the current bounds of the array, the engine will update the array's length property accordingly:
```
const check = ["hi"]
check[2] = "bbb"

console.log(check)  // gives ['hi', empty, 'bbb']
```

- Increasing the length extends the array by adding empty slots without creating any new elements — not even undefined.
```
const list = ["sam"]
list.length = 3
console.log(list)   // gives  ['sam', empty × 2]
```

- Decreasing the length property does, however, delete elements.

```
const list = ["sam","ram","bima"]
list.length = 1
console.log(list)   // gives ['sam']
```
> ### Slice vs Splice in array

for slice - return new array
```
slice()  // gives full array
slice(startIndex)  // gives values from start index to end
slice(startIndex, endIndex) // gives values from start index to one before endIndex
```

for splice - mutate the array and *keep in mind it return array of deleted values
```
splice() // delete all the values and make a blank array
splice(startIndex) // delete all the values from satrtIndex
splice(startIndex, deleteCount)  // delete the no of delteCount values from satrtIndex
splice(startIndex, deleteCount, item1)  // delete the no of delteCount values from satrtIndex and add item1 before last deleted value
splice(startIndex, deleteCount, item1, item2)
```

> #### What is scope in javascript
Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime. In other words, scope determines the visibility of variables and other resources in areas of your code.

> #### What is a service worker
A Service worker is basically a script (JavaScript file) that runs in the background, separate from a web page and provides features that don't need a web page or user interaction. Some of the major features of service workers are Rich offline experiences(offline first web application development), periodic background syncs, push notifications, intercept and handle network requests and programmatically managing a cache of responses.

> ### Closure
- Function bundled along with it's lexical scope is closure.
- If a function needs to access a variable, it first goes to its local memory. When it does not find it there, it goes to the memory of its lexical parent. See Below code, Over here function y along with its lexical scope i.e. (function x) would be called a closure.
```
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
  ```
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

    - Module Design Pattern
    - Currying
    - Memoize
    - Data hiding and encapsulation
    - setTimeouts etc.

- Disadvantages of Closure:

    - Over consumption of memory
    - Memory Leak
    - Freeze browser

> ### Map
The Map object holds key-value pairs and remembers the original insertion order of the keys

```
const map1 = new Map();

map1.set('a', 1);
map1.set('b', ["hi","hello"]);
map1.set('c', "any value can be added");

console.log(map1.get('a'));
// Expected output: 1

map1.set('a', 97);

console.log(map1.get('a'));
// Expected output: 97

console.log(map1.size);
// Expected output: 3

map1.delete('b');

console.log(map1.size);
// Expected output: 2
```

- Another way of create map

```
const question = new Map([
    ["question","what is ..."],
    [1,"C++"],
    [2,"Java"],
    [3,"Javascript"]
])
```

- To convert an object to map
```
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
In ES6, Javascript classes are primarily syntactic sugar over JavaScript’s existing prototype-based inheritance. For example, the prototype based inheritance written in function expression as below,

```
function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has" + this.color + " color";
};
```
Whereas ES6 classes can be defined as an alternative

```
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
```
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

> ### What is a callback hell
Callback Hell is an anti-pattern with multiple nested callbacks which makes code hard to read and debug when dealing with asynchronous logic. The callback hell looks like below,

```
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

Explanation by use case:
* Search bar- Don't want to search every time user presses key? Want to search when user stopped typing for 1 sec. Use debounce 1 sec on key press.
* Shooting game- Pistol take 1 sec time between each shot but user click mouse multiple times. Use throttle on mouse click.

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


### object freeze vs seal
* Object.freeze(obj)  ===  kuch bhi nhi ho sakta
    - Remember freezing is only applied to the top-level properties in objects but not for nested objects.
      ```
      const user = {
          name: "John",
          employment: {
            department: "IT",
          },
        };
        
        Object.freeze(user);
        user.employment.department = "HR";
      ```
* Object.seal(obj) === new properties cannot be added, existing properties cannot be removed.Values of existing properties can still be changed as long as they are writable

### hosting
Hoisting in JavaScript is a behavior in which a function or a variable can be used before declaration. 

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

What is memoization
What are server-sent events
How do you receive server-sent event notifications
How do you check browser support for server-sent events
What are the events available for server sent events
What is promise.all
What is the purpose of the race method in promise
How do you test for an empty object
What is an arguments object
How do you check if a string starts with another string
What is a proxy object
What are javascript accessors
How do you define property on Object constructor
What is the difference between get and defineProperty
What are the advantages of Getters and Setters
Can I add getters and setters using defineProperty method
What is a decorator
What is an empty statement and purpose of it
How do you get metadata of a module
hat is a comma operator
What is the advantage of a comma operator
What is an object initializer
What are the DOM methods available for constraint validation
What are the available constraint validation DOM properties
What are the list of validity properties
Give an example usage of rangeOverflow property
How do you get property descriptors of an object
What are the attributes provided by a property descriptor
How do you load CSS and JS files dynamically
How to cancel a fetch request
What is web speech API
What is minimum timeout throttling
How do you implement zero timeout in modern browsers
What is the difference between Function constructor and function declaration
What is the difference between function and class declarations
How to detect if a function is called as constructor
How to invoke an IIFE without any extra brackets?
What is the difference between dense and sparse arrays?
What are the different ways to create sparse arrays?
What is the difference between setTimeout, setImmediate and process.nextTick?







```
React.memo() is a higher-order component that we can use to wrap components that we do not want to re-render unless props within them change
useMemo() is a React Hook that we can use to wrap functions within a component. We can use this to ensure that the values within that function are re-computed only when one of its dependencies change

debouncing vs throttling
1st one is diff b/w to type value time and second one is the time difference between two function call

Redux Thunk
Oftentimes, when building a web application, you’ll need to call on APIs which means some asynchronous action is going on. Redux Thunk is a middleware that to do these asynchronous actions with Redux. Redux, by itself, does not allow asynchronous actions and this is troublesome if we want to dispatch an action that fetches data from an API for example. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.

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
