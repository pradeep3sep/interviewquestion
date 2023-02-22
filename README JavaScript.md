### What are the possible ways to create objects in JavaScript 2
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

### prototype chaining
Prototype chaining is a mechanism in JavaScript that allows objects to inherit properties and methods from their prototype objects. In JavaScript, every object has a prototype object, which is itself an object. The prototype object contains properties and methods that the object can access and use as its own.

When a property or method is accessed on an object, if that property or method does not exist on the object itself, JavaScript will look for it on the object's prototype object. If it's still not found, JavaScript will continue to search up the prototype chain, looking at the prototype's prototype, and so on, until it either finds the property or method or reaches the end of the chain.

For example, suppose you have an object foo that has a prototype object bar, which in turn has a prototype object baz. If you try to access a property on foo that doesn't exist on foo itself, JavaScript will look for it on bar. If it's not on bar, JavaScript will then look on baz. If it's still not found, JavaScript will continue up the prototype chain until it either finds the property or reaches the end of the chain.


When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.

### Some cases of === or ==
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

### What is a first order function
First-order function is a function that doesn’t accept another function as an argument and doesn’t return a function as its return value.

### What is a unary function
Unary function (i.e. monadic) is a function that accepts exactly one argument. It stands for a single argument accepted by a function

### How do you decode or encode a URL in JavaScript?
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

### What are classes in ES6
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

### What are the differences between cookie, local storage and session storage
Below are some of the differences between cookie, local storage and session storage,

Feature |	Cookie |	Local storage |	Session storage
-------- | ------- | -------------- | ---------------
Accessed on client or server side |	Both server-side & client-side	| client-side only |	client-side only
Lifetime |	As configured using Expires option |	until deleted |	until tab is closed
SSL support |	Supported |	Not supported |	Not supported
Maximum data size |	4KB	| 5 MB |	5MB

### What is a storage event and its event handler
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

### What is a callback hell
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

### What is the purpose of double exclamation
The double exclamation or negation(!!) ensures the resulting type is a boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true. For example, you can test IE version using this expression as below,
```
let isIE8 = false;
isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
console.log(isIE8); // returns true or false
```


### What is the difference between null and undefined
Null |	Undefined
----- | -----------
It is an assignment value which indicates that variable points to no object. | 	It is not an assignment value where a variable has been declared but has not yet been assigned a value.
Type of null is object  | 	Type of undefined is undefined
The null value is a primitive value that represents the null, empty, or non-existent reference.  | 	The undefined value is a primitive value used when a variable has not been assigned a value.
Indicates the absence of a value for a variable  | 	Indicates absence of variable itself
Converted to zero (0) while performing primitive operations  | 	Converted to NaN while performing primitive operations

### What is eval
The eval() function evaluates JavaScript code represented as a string. The string can be a JavaScript expression, variable, statement, or sequence of statements.
```
console.log(eval("1 + 2")); //  3
```

### What is isNaN
The isNaN() function is used to determine whether a value is an illegal number (Not-a-Number) or not. i.e, This function returns true if the value equates to NaN. Otherwise it returns false.
```
isNaN("Hello"); //true
isNaN("100"); //false
```

### What is the difference between document load and DOMContentLoaded events
The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for assets(stylesheets, images, and subframes) to finish loading. Whereas The load event is fired when the whole page has loaded, including all dependent resources(stylesheets, images).

### What is the difference between native, host and user objects
`Native objects` are objects that are part of the JavaScript language defined by the ECMAScript specification. For example, String, Math, RegExp, Object, Function etc core objects defined in the ECMAScript spec.
`Host objects` are objects provided by the browser or runtime environment (Node). For example, window, XmlHttpRequest, DOM nodes etc are considered as host objects.
`User objects` are objects defined in the javascript code. For example, User objects created for profile information.

### What are the pros and cons of promises over callbacks
Below are the list of pros and cons of promises over callbacks,

Pros:

* It avoids callback hell which is unreadable
* Easy to write sequential asynchronous code with .then()
* Easy to write parallel asynchronous code with Promise.all()
* Solves some of the common problems of callbacks(call the callback too late, too early, many times and swallow errors/exceptions)

Cons:

* It makes little complex code
* You need to load a polyfill if ES6 is not supported


### What is the difference between an attribute and a property
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

### What is the purpose of void 0
Void(0) is used to prevent the page from refreshing.
```
<a href="JavaScript:void(0);" onclick="alert('Well done!')">
  Click Me!
</a>
```

### What is the use of preventDefault method
The preventDefault() method cancels the event if it is cancelable, meaning that the default action or behaviour that belongs to the event will not occur. For example, prevent form submission when clicking on submit button and prevent opening the page URL when clicking on hyperlink are some common use cases.

### What is BOM
The Browser Object Model (BOM) allows JavaScript to "talk to" the browser. It consists of the objects navigator, history, screen, location and document which are children of the window. The Browser Object Model is not standardized and can change based on different browsers.

![BOM](/images/bom.png)

### How do you redirect new page in javascript
```
function redirect() {
  window.location.href = "newPage.html";
}
```

### How do get query string values in javascript
`window.location.search`
Basically use te window.location to get all things related to url

### Can we define properties for functions
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

### What is the way to find the number of parameters expected by a function
You can use function.length syntax to find the number of parameters expected by a function. Let's take an example of sum function to calculate the sum of numbers,

```
function sum(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
sum.length; // 4 is the number of parameters expected.
```

### What is a polyfill
A polyfill is a piece of JS code used to provide modern functionality on older browsers that do not natively support it. For example, Silverlight plugin polyfill can be used to mimic the functionality of an HTML Canvas element on Microsoft Internet Explorer 7.

### What are js labels
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

### Can you write a random integers function to print integers with in a range
```
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInteger(1, 100); // returns a random integer from 1 to 100
randomInteger(1, 1000); // returns a random integer from 1 to 1000
```

### How do you get the image width and height using JS
You can programmatically get the image and check the dimensions(width and height) using Javascript.
```
var img = new Image();
img.onload = function () {
  console.log(this.width + "x" + this.height);
};
img.src = "http://www.google.com/intl/en_ALL/images/logo.gif";
```

### How do you convert date to another timezone in javascript
You can use the toLocaleString() method to convert dates in one timezone to another. For example, let's convert current date to British English timezone as below,
```
console.log(event.toLocaleString("en-GB", { timeZone: "UTC" })); //29/06/2019, 09:56:00
```

### What are the properties used to get size of window
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

### Can you apply chaining on conditional operator
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

### How do you detect javascript disabled in the page
You can use the `<noscript>` tag to detect javascript disabled or not. The code block inside `<noscript>` gets executed when JavaScript is disabled, and is typically used to display alternative content when the page generated in JavaScript.
```
<script type="javascript">
    // JS related code goes here
</script>
<noscript>
    <a href="next_page.html?noJS=true">JavaScript is disabled in the page. Please click Next Page</a>
</noscript>
```

### What happens if you do not use rest parameter as a last argument
The rest parameter should be the last argument, as its job is to collect all the remaining arguments into an array. For example, if you define a function like below it doesn’t make any sense and will throw an error.
```
function someFunc(a,…b,c){
//You code goes here
return;
}
```

### How do you create an object with prototype
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

### What is call stack
Call Stack is a data structure for javascript interpreters to keep track of function calls(creates execution context) in the program. It has two major actions,

* Whenever you call a function for its execution, you are pushing it to the stack.
* Whenever the execution is completed, the function is popped out of the stack.

### What is the purpose of compareFunction while sorting arrays
The compareFunction is used to define the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value. Let's take an example to see the usage of compareFunction,

### What happens if you write constructor more than once in a class
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

 ### How do you call the constructor of a parent class
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

### What happens If I pass string type for getPrototype method
In ES5, it will throw a TypeError exception if the obj parameter isn't an object. Whereas in ES2015, the parameter will be coerced to an Object.
```
// ES5
Object.getPrototypeOf("James"); // TypeError: "James" is not an object
// ES2015
Object.getPrototypeOf("James"); // String.prototype
```

### How do you set prototype of one object to another
You can use the `Object.setPrototypeOf()` method that sets the prototype (i.e., the internal `Prototype` property) of a specified object to another object or null. For example, if you want to set prototype of a square object to rectangle object would be as follows,

```
Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
Object.setPrototypeOf({}, null);
```

### How do you check whether an object can be extendable or not
The `Object.isExtensible()` method is used to determine if an object is extendable or not. i.e, Whether it can have new properties added to it or not.
* `Note`: By default, all the objects are extendable. i.e, The new properties can be added or modified.

```
const newObject = {};
console.log(Object.isExtensible(newObject)); //true
```

### How do you prevent an object to extend
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


### What are the different ways to make an object non-extensible
You can mark an object non-extensible in 3 ways,

* Object.preventExtensions
* Object.seal
* Object.freeze

### What Is Obfuscation in javascript
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

### Why do you need Obfuscation
Below are the few reasons for Obfuscation,

* The Code size will be reduced. So data transfers between server and client will be fast.
* It hides the business logic from outside world and protects the code from others
* Reverse engineering is highly difficult
* The download time will be reduced

### How do I modify the url without reloading the page
The window.location.href property will be helpful to modify the url but it reloads the page. HTML5 introduced the history.pushState() and history.replaceState() methods, which allow you to add and modify history entries, respectively. For example, you can use pushState as below,
```
window.history.pushState("page2", "Title", "/page2.html");
```

### How do you print numbers with commas as thousand separators
You can use the `Number.prototype.toLocaleString()` method which returns a string with a language-sensitive representation such as thousand separator,currency etc of this number.
```
function convertToThousandFormat(x) {
  return x.toLocaleString(); // 12,345.679
}

console.log(convertToThousandFormat(12345.6789));
```

### What is the purpose of double tilde operator
The double tilde operator(~~) is known as double NOT bitwise operator. This operator is going to be a quicker substitute for Math.floor().

### Do all objects have prototypes
No. All objects have prototypes except for the base object which is created by the user, or an object that is created using the new keyword.

### How do you create specific number of copies of a string
The `repeat()` method is used to construct and return a new string which contains the specified number of copies of the string on which it was called, concatenated together. Remember that this method has been added to the ECMAScript 2015 specification. Let's take an example of Hello string to repeat it 4 times,
```
"Hello".repeat(4); // 'HelloHelloHelloHello'
```

### What is the output of prepend additive operator on falsy values
If you prepend the additive(+) operator on falsy values(null, undefined, NaN, false, ""), the falsy value converts to a number value zero. Let's display them on browser console as below,
```
console.log(+null); // 0
console.log(+undefined); // NaN
console.log(+false); // 0
console.log(+NaN); // NaN
console.log(+""); // 0
```


### How do you empty an array
You can empty an array quickly by setting the array length to zero.
```
let cities = ["Singapore", "Delhi", "London"];
cities.length = 0; // cities becomes []
```


### How do you create an array with some data
You can create an array with some data or an array with the same values using fill method.
```
var newArray = new Array(5).fill("0");
console.log(newArray); // ["0", "0", "0", "0", "0"]
```

### Is it possible to add CSS to console messages
Yes, you can apply CSS styles to console messages similar to html text on the web page.

### How do you create copy to clipboard button
You need to select the content(using .select() method) of the input element and execute the copy command with execCommand (i.e, execCommand('copy')). You can also execute other system commands like cut and paste.

```
document.querySelector("#copy-button").onclick = function () {
  // Select the content
  document.querySelector("#copy-input").select();
  // Copy to the clipboard
  document.execCommand("copy");
};
```

### How do you capture browser back button
The window.onbeforeunload method is used to capture browser back button events. This is helpful to warn users about losing the current data.
```
window.onbeforeunload = function () {
  alert("You work will be lost");
};
```

### What is babel
Babel is a JavaScript transpiler to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Some of the main features are listed below,

* Transform syntax
* Polyfill features that are missing in your target environment (using @babel/polyfill)
* Source code transformations (or codemods)

### What are the differences between for...of and for...in statements
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

### How do you create custom HTML element?
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

### What are the differences between primitives and non-primitives?
Primitives | 	Non-primitives
-----------  | -----------------
These types are predefined | 	Created by developer
These are immutable | 	Mutable
Compare by value | 	Compare by reference
Stored in Stack | 	Stored in heap
Contain certain value | 	Can contain NULL too