#### What are the possible ways to create objects in JavaScript 2
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

#### prototype chaining
Prototype chaining is a mechanism in JavaScript that allows objects to inherit properties and methods from their prototype objects. In JavaScript, every object has a prototype object, which is itself an object. The prototype object contains properties and methods that the object can access and use as its own.

When a property or method is accessed on an object, if that property or method does not exist on the object itself, JavaScript will look for it on the object's prototype object. If it's still not found, JavaScript will continue to search up the prototype chain, looking at the prototype's prototype, and so on, until it either finds the property or method or reaches the end of the chain.

For example, suppose you have an object foo that has a prototype object bar, which in turn has a prototype object baz. If you try to access a property on foo that doesn't exist on foo itself, JavaScript will look for it on bar. If it's not on bar, JavaScript will then look on baz. If it's still not found, JavaScript will continue up the prototype chain until it either finds the property or reaches the end of the chain.


When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.

#### Some cases of === or ==
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

#### What is a first order function
First-order function is a function that doesn’t accept another function as an argument and doesn’t return a function as its return value.

#### What is a unary function
Unary function (i.e. monadic) is a function that accepts exactly one argument. It stands for a single argument accepted by a function

#### How do you decode or encode a URL in JavaScript?
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

#### What are classes in ES6
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

#### What are the differences between cookie, local storage and session storage
Below are some of the differences between cookie, local storage and session storage,

Feature |	Cookie |	Local storage |	Session storage
-------- | ------- | -------------- | ---------------
Accessed on client or server side |	Both server-side & client-side	| client-side only |	client-side only
Lifetime |	As configured using Expires option |	until deleted |	until tab is closed
SSL support |	Supported |	Not supported |	Not supported
Maximum data size |	4KB	| 5 MB |	5MB

#### What is a storage event and its event handler
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

#### What is a callback hell
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

#### What is the purpose of double exclamation
The double exclamation or negation(!!) ensures the resulting type is a boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true. For example, you can test IE version using this expression as below,
```
let isIE8 = false;
isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
console.log(isIE8); // returns true or false
```


#### What is the difference between null and undefined
Null |	Undefined
----- | -----------
It is an assignment value which indicates that variable points to no object. | 	It is not an assignment value where a variable has been declared but has not yet been assigned a value.
Type of null is object  | 	Type of undefined is undefined
The null value is a primitive value that represents the null, empty, or non-existent reference.  | 	The undefined value is a primitive value used when a variable has not been assigned a value.
Indicates the absence of a value for a variable  | 	Indicates absence of variable itself
Converted to zero (0) while performing primitive operations  | 	Converted to NaN while performing primitive operations

#### What is eval
The eval() function evaluates JavaScript code represented as a string. The string can be a JavaScript expression, variable, statement, or sequence of statements.
```
console.log(eval("1 + 2")); //  3
```

#### What is isNaN
The isNaN() function is used to determine whether a value is an illegal number (Not-a-Number) or not. i.e, This function returns true if the value equates to NaN. Otherwise it returns false.
```
isNaN("Hello"); //true
isNaN("100"); //false
```

#### What is the difference between document load and DOMContentLoaded events
The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for assets(stylesheets, images, and subframes) to finish loading. Whereas The load event is fired when the whole page has loaded, including all dependent resources(stylesheets, images).

#### What is the difference between native, host and user objects
`Native objects` are objects that are part of the JavaScript language defined by the ECMAScript specification. For example, String, Math, RegExp, Object, Function etc core objects defined in the ECMAScript spec.
`Host objects` are objects provided by the browser or runtime environment (Node). For example, window, XmlHttpRequest, DOM nodes etc are considered as host objects.
`User objects` are objects defined in the javascript code. For example, User objects created for profile information.

#### What are the pros and cons of promises over callbacks
Below are the list of pros and cons of promises over callbacks,

Pros:

* It avoids callback hell which is unreadable
* Easy to write sequential asynchronous code with .then()
* Easy to write parallel asynchronous code with Promise.all()
* Solves some of the common problems of callbacks(call the callback too late, too early, many times and swallow errors/exceptions)

Cons:

* It makes little complex code
* You need to load a polyfill if ES6 is not supported


#### What is the difference between an attribute and a property
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

#### What is the purpose of void 0
Void(0) is used to prevent the page from refreshing.
```
<a href="JavaScript:void(0);" onclick="alert('Well done!')">
  Click Me!
</a>
```

#### What is the use of preventDefault method
The preventDefault() method cancels the event if it is cancelable, meaning that the default action or behaviour that belongs to the event will not occur. For example, prevent form submission when clicking on submit button and prevent opening the page URL when clicking on hyperlink are some common use cases.

#### What is BOM
The Browser Object Model (BOM) allows JavaScript to "talk to" the browser. It consists of the objects navigator, history, screen, location and document which are children of the window. The Browser Object Model is not standardized and can change based on different browsers.

![BOM](/images/bom.png)

#### How do you redirect new page in javascript
```
function redirect() {
  window.location.href = "newPage.html";
}
```