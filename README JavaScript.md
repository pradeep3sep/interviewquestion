# Table of Contents

- [Rule of this ](#rule-of-this)



> ### What is Javascript ?

It is `High Level`, `Object oriented`, `Multi Paradigm` programming language.

- High Level ==> We don't have to worry about complex stuff like memory management.

- Object oriented ==> based on objects, for storing the most kind of data

- Multi Paradigm ==> We can use different styles of programming like `imperative and declarative` approach.

- programming Language ==> Instruct computer to do things

<br>

> ### There are only `six` falsey values in JavaScript: undefined , null , NaN , 0 , "" (empty string), and false.

<br>

> ### Type of NaN is Number

> ### Type of Null is object.

<br>

```
              Data Value
        ___________|____________       
        |                      |
        |                      |
      Object             Primitive
  (Copy by referenc)     (Copy by value)
```

Primitives stored in call stack while object stored in heap

![BOM](/images/heap.jpeg)

if needed more refer article - https://vinoo.hashnode.dev/primitives-vs-objects-in-javascript

<br>

> ### How JS code is executed

JavaScript code execution happens in two phases:  

1. **Memory Creation Phase (Creation Phase)**
2. **Code Execution Phase (Execution Phase)**  

This process occurs inside the **JavaScript Execution Context (JEC)**, which consists of:  
- **Memory (Variable Environment)** – Stores variables and functions.  
- **Thread of Execution** – Executes the code line by line.  

<br>
<details>

**1. Memory Creation Phase (Creation Phase)**
Before executing the code, JavaScript first scans the script and sets up memory for variables and functions.  

**Steps:**
- **Variables are stored in memory with `undefined`.**  
- **Functions are stored entirely in memory (hoisting).**  
- The `this` keyword is assigned based on execution context (global or function scope).

**Example:**
```js
console.log(a); // undefined
console.log(foo()); // "Hello"

var a = 10;

function foo() {
  return "Hello";
}
```

**How Memory is Set Up:**
| Variable | Value in Memory |
|----------|---------------|
| `a`      | `undefined`   |
| `foo`    | `function() { return "Hello"; }` |

<br>

**2. Code Execution Phase**
After memory allocation, the code executes line by line.

**Steps:**
1. `console.log(a);`  
   - `a` is accessed → prints `undefined` (due to hoisting).  
2. `console.log(foo());`  
   - `foo()` is executed and prints `"Hello"`.  
3. `var a = 10;`  
   - `a` is updated from `undefined` to `10`.  

<br>

**Execution Context Lifecycle**
Each function call creates a new **Execution Context** with its own memory and execution thread.  
After execution, the function's context is destroyed (except closures).

**Example:**
```js
function outer() {
  var x = 5;
  function inner() {
    var y = 10;
    console.log(x + y);
  }
  inner();
}
outer();
```

**Execution Context Stack (Call Stack)**

1. **Global Execution Context (GEC)**
   - Stores `outer` function.
2. **Outer Function Execution Context**
   - Stores `x = 5` and `inner`.
3. **Inner Function Execution Context**
   - Stores `y = 10`, accesses `x`, executes `console.log(15)`, then removed.  
4. **Outer function finishes and is removed.**
5. **Global Execution Context remains until script finishes.**

</details>

<br>

> ### 7 Primitive Data Types

- Numbers
- String
- Boolean
- Undefined
- Null
- Symbol
- BigInt


<br>


> ### Operator Precedence 
Every operator has its precendence which value, which defines which operator will excute first

See table of below website

```
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
```

<br>



> ### Conversion and Coercion in javascript

conversion - In this we manually convert the type of value

coercion - In this, the js automatically convert the type of value
eg==>  console.log("2" * "3") gives 6, basically the string to number

<br>


**Note** `Js has dynamic typing`: We do `not` have to manually define the data type of the value stored in a variable. Insted, data types are determined automatically.


<br>


> ### Functions
- A **function** is a piece of code that can be used repeatedly.

- **Push function**: returns the array's length.

- **Pop function**: retrun the popped value


<br>



> ### **Dot Notation vs Bracket Notation**

- **Dot Notation**:
  - Used to access an object's property `statically`.
  - Example:  
    ```js
    const person = {
      firstName: "Jonas",
      lastName: "Schedt"
    };
    console.log(person.firstName); // Output: "Jonas"
    ```
- **Bracket Notation**:
  - Used to access an object's property `dynamically` (e.g., using variables).
  - Example:  
    ```js
    const key = "lastName";
    console.log(person[key]); // Output: "Schedt"
    ```

**In short** dot gives the direct value in static way while the bracket gives the same value in static as well as dynamic way

- When we try to get the property which is not available in the object, it shows the `undefined`

- In object, the key values, the key is also called the `property`

<br>

> ### **Functions: Declarative vs Expressive**
1. **Declarative Function**:
   - Syntax:
     ```js
     function calcAge(birthYear) {
         return 2037 - birthYear;
     }
     ```
   - Can be called **before** they are defined in the code.
   
2. **Expressive Function**:
   - Syntax:
     ```js
     const calcAge = function(birthYear) {
         return 2037 - birthYear;
     };
     ```
   - `Cannot` be called before they are defined.

<br>

> ### let VS const VS var

Here’s a concise comparison of `let`, `const`, and `var` in JavaScript presented in tabular form:

| Feature                       | `var`                              | `let`                              | `const`                             |
|-------------------------------|-------------------------------------|-------------------------------------|--------------------------------------|
| **Declaration Scope**         | Function-scoped                    | Block-scoped                       | Block-scoped                        |
| **Re-declaration**            | Allowed within the same scope      | Not allowed in the same scope      | Not allowed in the same scope       |
| **Hoisting Behavior**         | Hoisted and initialized as `undefined` | Hoisted but not initialized         | Hoisted but not initialized         |
| **Re-assignment**             | Allowed                            | Allowed                            | Not allowed                         |

### Notes:
- **Block Scope**: A block is defined by `{}` (e.g., in loops, `if` statements).
- **Hoisting**: Although all three are hoisted, only `var` is initialized to `undefined`, while `let` and `const` remain in the "temporal dead zone" until their definition is encountered.

<br>

> ### **Array Destructuring**
- **Case 1**:
  ```js
  const [x, y, z] = [2, 3, 4];
  ```
  - After destructuring:
    - `x = 2`
    - `y = 3`
    - `z = 4`

- **Case 2**:
  - When skipping elements:
    ```js
    const [main, , secondary] = ["Pizza", "Pasta", "Risotto"];
    ```
    - `main = Pizza`
    - `secondary = Risotto`

- **Case 3**:
  Example:
  ```js
  const [main,secondary] = ["Pizza", "Pasta", "Risotto"];
  ```
  - `main = Pizza`
  - `secondary = Pasta`


- **Case 4**:
  Example:
  ```js
  const [p,q,r] = [8,9];
  ```
  - `p = 8`
  - `q = 9`
  - `r = undefined`


- **Case 5**:
  Example:
  ```js
  const [p=1,q=1,r=1] = [8,9];
  ```
  - `p = 8`
  - `q = 9`
  - `r = 1`

<br>


> ### **Object Destructuring**
- **Case 1**:
  - Similar to arrays but use `{}`.
  - Example:
    ```js
    let a = 1;
    let b = 2;
    const obj = { a: 25, b: 35, c: 13 };
    ({ a, b } = obj); // a = 25, b = 35
    ```


<br>


> ### **Spread Operator (`...`)**
- Used for arrays, strings, maps, sets, and objects.
- Additional Notes:
  ```js
  const str = "Jonas"
  ```
  - `console.log([...str, "sks"])` gives `['J', 'o', 'n', 'a', 's', 'sks']`

  - ``${...str}`` gives the error


<br>

> ### **Spread vs Rest Operator**
- **Spread**:
  - Used on the **right** side.
  - It `unpack` the data
  - Example:
    ```js
    const arr = [1, 2, ...[3, 4]];
    ```
    - Output: `[1, 2, 3, 4]`

- **Rest**:
  - Used on the **left** side.
  - It `pack` the data
  - Example:
    ```js
    const [a, b, ...others] = [1, 2, 3, 4, 5];
    ```
    - `a = 1`
    - `b = 2`
    - `others = [3, 4, 5]`

<br>

> ### Rest operator in object
```js
let myObj = {
    name: "Luke",
    age: 25,
    hobbies: "music"
};

let { hobbies, ...rest } = myObj;  // => Luke 25 music

console.log(hobbies, rest)  // => music { name: 'Luke', age: 25 }

console.log(hobbies, rest.age)  // => music 25

```

<br>


> ### **Short Circuiting**
- Using `||`:
  ```js
  console.log(0 || "Jonas"); // Output: "Jonas"
  console.log(1 || "Jonas"); // Output: 1
  console.log(0 || false); // Output: false
  ```

- Using `&&`:
  ```js
  console.log(0 && "Jonas"); // Output: 0
  console.log(1 && "Jonas"); // Output: "Jonas"
  ```

- **Logic**:
  - For `||`, it `returns` the `first truthy` value. If `all false` then return `last false` value
  - For `&&`, it `returns` the `last value` if `all are truthy`, `else` return the `false value`

- Example:
  ```js
  console.log(null || undefined || "hi"); // Output: "hi"
  console.log(null && undefined && "hi"); // Output: null
  ```


<br>


> ### Logical Assignment Operators

- Example:
  ```js
  const rest1 = {
      name: "Capi",
      numGuests: 20,
  };
  ```

- **Usage**:
  ```js
  rest1.numGuests = rest1.numGuests || 10;
  ```
  - Can be rewritten as:
    ```js
    rest1.numGuests ||= 10;
    ```

- **Logical Assignment**:
  - Works similarly to incrementing:
    ```js
    sum = sum + 1;
    sum += 1;
    ```
  - Similarly applies to `||=` and `&&=`.

- **Potential Issue**:
  - If `numGuests` is `0`, using `||` may result in the default value being assigned:
    ```js
    rest1.numGuests = rest1.numGuests || 10; // This sets to 10 even if numGuests = 0
    ```

  - Use `??=` (nullish coalescing):
    ```js
    rest1.numGuests ??= 10;
    ```

<br>



> ### **For...Of Loop**

- **Destructuring in Loops**:
  ```js
  for (const [i, e] of menu.entries()) {
      console.log(`${i}: ${e}`);
  }
  ```

<br>

> ### nullish coalescing operator ( ?? )

```js
console.log(rest.numGuests ?? 10)
```

If above is null or undefined (not 0 or ''), it gives 10 otherwise gives first value

<br>


> ### Padding a string

In JavaScript, you can pad a string using the `padStart` and `padEnd` methods. 

### Syntax:
1. **`padStart(targetLength, padString)`**: Pads the beginning of a string.
2. **`padEnd(targetLength, padString)`**: Pads the end of a string.

### Example Usage:

#### Padding at the Beginning
```javascript
let str = "123";
let paddedStr = str.padStart(6, "0");
console.log(paddedStr); // Output: "000123"
```

#### Padding at the End
```javascript
let str = "123";
let paddedStr = str.padEnd(6, "0");
console.log(paddedStr); // Output: "123000"
```

### Parameters:
- **`targetLength`**: The length of the resulting string after padding. If the `targetLength` is less than or equal to the string's length, no padding is added.
- **`padString`** *(optional)*: The string used for padding. If omitted, `" "` (a single space) is used by default.

### Notes:
- If the `padString` is longer than the needed padding, it will be truncated.
- These methods do not modify the original string; they return a new string.


<br>



> ### First Class Functions

**Below are key points which makes them 1st class**
- Store function in variable or properties:

```js
const add = (a,b) => a+b

// or

const counter = {
  value: 25,
  inc: function(){ this.value++ }
}
```


- Pass functions as arguments to other functions

```js
const greet = () => console.log("hey")
btnClose.addEventListner("click", greet)
```


- Return functions from functions

```js
counter.inc.bind(someOtherObject)
```

<br>


> ### Higher Order Functions

- A function that receives another function as an argument, that return a new function or both.
- This is only possible because of first class functions.

1. Function that receives another function

```js
const greet = () => console.log("hey")
btnClose.addEventListner("click", greet)
```

addEventListner here is the higher order function

2. Function that returns new function

```js
function count(){  // count id higher order function
  let counter  = 0
  return function(){  // this function is return function
    counter++ 
  }
}
```


<br>


> ### '/n' is use for new line for split()

<br>


> ### Should know the some and every of array

<br>


> ### Difference between the some and includes

Some method is like includes but difference is that `includes check the equality(=)` condition only and return true or false,\
In some method, we can `check` any `condition` if that `satisfies` then we get return as true or false


```js
const data = [1,2,3,4]
console.log(data.includes(5))  // here we only checked equality
console.log(data.some( unit => unit >1 ))  // here condition is checked which "geater than condition"
```

<br>


> ### Implicit Binding and Explicit Binding

**Implicit Binding**

It is like self binding, means 'this' points towards created object

- **Definition**: When the `this` keyword refers to the object that invokes the function.
- **Example**:
  ```javascript
  const person = {
    name: "Karen",
    age: 40,
    hi() {
      console.log("hi " + this.name);
    }
  };
  person.hi(); // Output: "hi Karen"
  ```
- **Key Point**: 
  - In implicit binding, `this` points to the object (`person`) that is calling the method (`hi`).


**Explicit Binding**

- **Definition**: When the `this` keyword is explicitly bound to a specific object using methods like `.bind()`, `.call()`, or `.apply()`.
- **Example**:
  ```javascript
  const person3 = {
    name: "Karen",
    age: 40,
    hi: function () {
      console.log("hi " + this.name);
    }
  };
  
  const boundHi = person3.hi.bind(window);
  boundHi(); // Output will depend on the global `window.name`
  ```
- **Key Point**:
  - Explicit binding allows manual control over the value of `this`.


<br>


> ### Bubbling vs Capturing

- **Syntax**:
  ```javascript
  <element>.addEventListener(eventName, callbackFunction, {capture: boolean});
  ```
  - Example:
    ```javascript
    grandParent.addEventListener("click", (e) => {
      console.log("grandParent");
    }, { capture: false }); // or simply `false`
    ```


**Bubbling**:
- **Definition**: Propagation moves from the innermost element (target) outward to its ancestors.
- **Key Points**:
  - Bubbling occurs when `{capture: false}` (default behavior).
  - Almost all events bubble, **except** the `focus` event.
  - Can be stopped using `stopPropagation()`.



**Capturing**:
- **Definition**: Opposite of bubbling; propagation moves from the outermost ancestor inward to the target element.
- **Key Points**:
  - Capturing occurs when `{capture: true}`.
  - Usually followed by event bubbling.



**Mixed Mode (Both `true` and `false`)**:
- **Behavior**: JavaScript first handles capturing (outer to inner) and then bubbling (inner to outer).
- **Example**: When combining capturing and bubbling on different elements.

see akshay saini video form 17:34**



### **Stopping Propagation**:
- Use `stopPropagation()` to prevent further propagation in either phase.
  ```javascript
  e.stopPropagation();
  ```


<br>


> ### Event Delegation:
- **Concept**: Instead of adding listeners to multiple child elements, add a listener to a common parent and use `e.target` to handle child-specific logic.
- **Key Points**:
  - Efficient for dynamically generated elements.
  - Example:
    ```javascript
    parentElement.addEventListener("click", (e) => {
      if (e.target.matches("button")) {
        console.log("Button clicked!");
      }
    });
    ```


<br>


> ### OOP

- Objects may contain data (properties) and function (methods). By using objects, we pack data and corresponding behavior into one block.
- In OOP, objects are **self-contained pieces/blocks of code**.


**Class** - Like a blueprint from which we can create new objects.

**Instance** - Like making a real object using the class.



### Fundamental principles of Object-Oriented Programming

1. **Abstraction**  
2. **Encapsulation**  
3. **Inheritance**  
4. **Polymorphism**  

---

**Abstraction**  
- Ignoring or `hiding details that don’t matter`, allowing us to get an overview perspective of the thing we’re implementing, instead of messing with details that don’t really matter to our implementation.  
- **Example:** `eventlistner`, we don’t know the real code for how it works; we only know the method to use it.  

**Encapsulation**  
- Keeping `properties and methods private` inside the class, so they are not accessible from outside the class.  
- Some methods can be exposed as a public interface (API).  
- **Purpose:** Prevents external code from accidentally manipulating internal properties/state.  


**Inheritance**
- Child classes inherit methods & properties from parent classes.  
- Making all properties and methods of a certain class available to a child class, forming a hierarchical relationship between classes.  
- This allows us to reuse common logic and model real-world relationships.  


**Polymorphism**
- A child class can overwrite a method it inherited from a parent class.[It's more complex than that, but enough for our purposes.]

<br>

> ### Prototype  

- **Prototype** contains methods; objects linked to this prototype can access methods.  
- Objects are linked to a prototype object.  

<br>

> ### Prototypal Inheritance

- JS uses Protoypal Inheritance
- Inheritance is an object getting access to the properties and methods of another object

![BOM](/images/chain.png)

**Note** `proto` is simply a refernce or a pointer to up the chain protype chain

![BOM](/images/protoInheri.png)

- `created array.prototype` or `created object.prototype` or `created function.prototype` `returns` `undefined` unless any property created in it. It has all method or function of Base object and Base array or Base function, basically inherit all from above hierarchy

eg: `Array.prototype` `has all` the `built-in` method of array like `map, filter, etc` but created `array.protoype` `don't have` similar to function case `eg is call, bind,apply`.

<br>

> ### 3 Ways of implementing Prototypal inheritance in JS

1.  Constructor function
2. ES6 Classes
3. Object.create()


<br>

> ### Call, Apply, and Bind  

- Call, Apply, and Bind : It is use for `function borrowing`
- Function borrowing allows us to `use the method of one object on another object` without having to make a copy of that method and maintain it in two separate places.
- These methods allow you to **change the context of the `this` keyword** in function, which can be useful for controlling the behaviour of functions

#### **Call**  
- **Use:** It is used for function borrowing.  
```javascript
let name = {  
  firstname: "Akshay",  
  lastname: "Saini"  
};  

let printFullName = function (hometown, state) {  
  console.log(this.firstname + " " + this.lastname + " from " + hometown + ", " + state);  
};  

printFullName.call(name, "Dehradun", "Uttarakhand");  
```
**Output:**  
`Akshay Saini from Dehradun, Uttarakhand`  

**`name` is the object which 'this' refer, "Dehradun", "Uttarakhand" are the parameter to function**

<br>

#### **Apply**  
- **Use:** Similar to `call`, but instead of passing parameters separately, we pass the parameters in array form.  
```javascript
printFullName.apply(name, ["Dehradun", "Uttarakhand"]);  
```  

<br>

#### **Bind**  

- **Use:** The `bind` method binds a method (e.g., `printFullName`) with an object and returns a copy of the method, which can be invoked later.  

```javascript
let printMyName = printFullName.bind(name, "Dehradun", "Uttarakhand");  
console.log(printMyName); // Returns a function  

printMyName();  
```  

**Output:**  
`Akshay Saini from Dehradun, Uttarakhand`  

<br>

> ### Core web vitals and lighthouse interview question

<br>

> ### Difference between substring and slice
- `substring()` `doesn't` support `negative indices`.
- `slice()` `supports` negative indices.

<br>


> ### forEach Method
- forEach() always `returns undefined`
- It is `not invoked` for `empty slots` in sparse arrays.
- There is `no way to stop or break a forEach()` loop other than by `throwing an exception`. If you need such behavior, the forEach() method is the wrong tool.
- forEach do not modify array on return, you have to intentionally modify the array

```js
// not modified the array
const d = [1,2,3,4]

console.log(d.forEach((el) => el * 2));
console.log(d);
```

```js
// here we modified the array
const d = [1, 2, 3, 4];

d.forEach((el, index, arr) => {
  arr[index] = el * 2;  // explicitly modify the original array
});

console.log(d);  // [2, 4, 6, 8]
```


<br>



> ### Callback hell full code
```
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Promise-Async-Await-Sequential-Execution/Promise-async-await-master-notes/calback-hell-resolved-with-promise.js
```


<br>



> ### to get the paragraph length
```js
const paragraphs = text.split('\n').filter((para) => para.trim() !== '').length;
```

<br>

> ### To get the color picker
```js
<input type="color" name="color1" value={color1} onChange={handleColorChange} />
```

<br>


> ### What is the purpose of template tag in html

The `<template>` tag in HTML is used to define a `reusable fragment of HTML that is not rendered when the page loads`. Instead, it can be cloned and inserted into the DOM dynamically using JavaScript.

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>The Template Tag</h1>
  <button onclick="show()">Show</button>
  <div id="login"></div>

  <template id="tmp">
    <div>
      <label>Login</label>
      <input type="text">
    </div>
  </template>

  <script>
    function show(){
      const login = document.getElementById('login')
      const template = document.getElementById('tmp')
      const clone = template.content.cloneNode(true)
      login.appendChild(clone)
    }
  </script>
</body>
</html>
```


<br>

> ### Various Promise Method

Here’s a breakdown of the key differences between `Promise.all()`, `Promise.allSettled()`, `Promise.any()`, and `Promise.race()`:

<details>

### 1. **`Promise.all()`**
- **Behavior**: Waits for all promises to either resolve or reject. If any promise is rejected, the entire `Promise.all()` is rejected.
- **Use case**: When you need **all promises** to succeed or fail as a whole.
- **Return value**: An array of resolved values if all promises resolve. If any promise rejects, it returns the first rejection reason.
- **Example**:
    ```js
    Promise.all([promise1, promise2, promise3])
      .then(results => console.log(results))  // All promises resolved
      .catch(error => console.log(error));    // Any promise rejected
    ```

### 2. **`Promise.allSettled()`**
- **Behavior**: Waits for all promises to either resolve or reject. It does not fail when a promise is rejected.
- **Use case**: When you want to know the **outcome of all promises**, regardless of success or failure.
- **Return value**: An array of objects that describe the outcome (`{status: "fulfilled", value: ...}` for resolved, `{status: "rejected", reason: ...}` for rejected).
- **Example**:
    ```js
    Promise.allSettled([promise1, promise2, promise3])
      .then(results => console.log(results));  // Get result of all promises
    ```

### 3. **`Promise.any()`**
- **Behavior**: Resolves as soon as **any one promise** resolves. If all promises reject, it rejects with an `AggregateError`.
- **Use case**: When you need **at least one promise to resolve** and don’t care about others.
- **Return value**: The value of the first resolved promise. If all promises reject, it returns an `AggregateError` containing all rejection reasons.
- **Example**:
    ```js
    Promise.any([promise1, promise2, promise3])
      .then(result => console.log(result))  // First fulfilled promise
      .catch(error => console.log(error));  // All promises rejected
    ```

### 4. **`Promise.race()`**
- **Behavior**: Resolves or rejects as soon as **any one promise** settles (resolves or rejects).
- **Use case**: When you want the **first promise to settle**, whether it's resolved or rejected.
- **Return value**: The value of the first resolved promise or the reason for the first rejected promise.
- **Example**:
    ```js
    Promise.race([promise1, promise2, promise3])
      .then(result => console.log(result))  // First settled promise (resolved)
      .catch(error => console.log(error));  // First settled promise (rejected)
    ```

### Summary:

- **`Promise.all()`**: All promises must succeed or fail.
- **`Promise.allSettled()`**: Waits for all promises to settle (either fulfilled or rejected).
- **`Promise.any()`**: Returns the first successfully resolved promise.
- **`Promise.race()`**: Returns the result of the first settled promise (either fulfilled or rejected).

</details>

<br>

> ### keep in mind that delete a[1] deletes the value in the array and make it empty, but the length of the array do not changes

<br>

> ### console value
```js
console.log(1 + + 2)   // 3
console.log(1 + + + 2)  // 3
console.log(1 + '2')  // 12
console.log(1 + + '2')  // 3
console.log('1' + + 2)  // 12
console.log(1 + + true) // 2
console.log('1' + true)  // 1true
console.log('1' + + true)  // 11
console.log('1' + null)  // 1null
console.log('1' + + null)  // 10
console.log(1 + undefined)  // NaN
console.log(1 + + undefined)  // NaN
console.log('1' + undefined)  // 1undefined
console.log(typeof null)   // object
console.log(null instanceof Object)  // false
console.log(1 instanceof Number) // false
console.log(Number(1) instanceof Object)  // false
console.log(new Number(1) instanceof Object)  // true
console.log([] instanceof Array)  // true
console.log([] instanceof Object)  // true
console.log(0 / 0)  // NaN
console.log(0 === -0)  // true
console.log(Object.is(0, -0))  // false
console.log(0 * Infinity)  // NaN
console.log(Infinity / Infinity)  // NaN
console.log(!![])  // true
```

The code `console.log(1 + +true)` results in the output `2`.

Here’s why:

<details>

1. `true` is a boolean value in JavaScript.
2. The unary plus operator (`+`) is used to convert its operand to a number.
3. Applying the unary plus operator to `true` converts it to the number `1`.
4. So, `+true` becomes `1`.
5. Then, the expression `1 + 1` is evaluated, which equals `2`.
6. Finally, `console.log(2)` outputs `2` to the console.

Thus, the output is `2`.
</details>

<br>

> ### Accessing Custom Attribute from HTML

```html
<div id="myDiv" data-name="pradeep" data-score="20"></div>
```

```js
const myDiv = document.getElementById('myDiv')
const name = myDiv.dataset.name 
const score = myDiv.dataset.score

console.log(name)  // "pradeep"
console.log(score) // '20'
```

<br>

> ### Immediately Invoked function
These are the function which we need only one time. when we write function and called immedialtely

Example

```js
(function(){
    console.log("This will never run again")
})()
```

**Primary reason** to use IIFE to obtain data privacy because any variable declared within the IIFE cannot be accessed by outside world, if you try will show error

```js
(function(){
    var message = "IIFE"
    console.log(message)
})()
console.log(message) // Error: message is not defined
```

<br>

> ### special case
The output of `console.log(['0','1'].map(parseInt))` in JavaScript might be surprising if you're not familiar with how the `map` function works in conjunction with `parseInt`.

<details>

Here's what's happening:

1. `parseInt` is a function in JavaScript used to parse a string and return an integer. It takes two parameters: the string to parse and an optional radix (the base in mathematical numeral systems). However, when used with `map`, it's being called with three parameters: `currentValue`, `index`, and `array`.
   
2. When you pass `parseInt` to `map`, it calls `parseInt` with three parameters: the element value, the index, and the array being traversed. However, `parseInt` only uses the first two parameters: the string to parse and the radix. The `map` function passes these parameters to `parseInt` in that order.

3. In JavaScript, `parseInt` interprets its second argument (radix) differently depending on the base. If the radix is not specified or is 0, the JavaScript engine tries to determine the most appropriate base. For this reason, it interprets the strings `'0'` and `'1'` as base-10 numbers.

4. Here's what `parseInt` does with each element:
   - For `'0'`, `parseInt` tries to parse `'0'` as a base-10 number, which is `0`.
   - For `'1'`, `parseInt` tries to parse `'1'` as a base-10 number, which is `1`.

So, the output of `console.log(['0','1'].map(parseInt))` would be `[0, NaN]`.

The reason the second result is `NaN` is because when `parseInt` tries to parse `'1'` with a radix of `1` (the index of the element in the array), it fails because in base-1 numeral system, there's no representation for `1`. Therefore, `parseInt` returns `NaN` (Not-a-Number).

</details>

<br>


> ### Keep in mind below condition using the stingify
```js
JSON.stringify({a: null})      // '{"a":null}'
JSON.stringify({a: undefined}) // '{}'

JSON.stringify([null])         // '[null]'
JSON.stringify([undefined])    // '[null]

JSON.stringify([NaN, null, Infinity]); // '[null,null,null]'

// String-keyed array elements are not enumerable and make no sense in JSON
const a = ["foo", "bar"];
a["baz"] = "quux"; // a: [ 0: 'foo', 1: 'bar', baz: 'quux' ]
JSON.stringify(a);
// '["foo","bar"]'

JSON.stringify({ x: [10, undefined, function () {}, Symbol("")] });
// '{"x":[10,null,null,null]}'

// Standard data structures
JSON.stringify([
  new Set([1]),
  new Map([[1, 2]]),
  new WeakSet([{ a: 1 }]),
  new WeakMap([[{ a: 1 }, 2]]),
]);
// '[{},{},{},{}]'

// Symbols:
JSON.stringify({ x: undefined, y: Object, z: Symbol("") });
// '{}'
JSON.stringify({ [Symbol("foo")]: "foo" });
// '{}'
```


<br>


> ### Arguments in function
- Non-strict functions that only have simple parameters (that is, no `rest`, `default`, or `destructured` parameters) will sync the new value of parameters with the arguments object, and vice versa:

```js
function func(a) {
  arguments[0] = 99; // updating arguments[0] also updates a
  console.log(a);
}
func(10); // 99

function func2(a) {
  a = 99; // updating a also updates arguments[0]
  console.log(arguments[0]);
}
func2(10); // 99
```

- Non-strict functions that are passed rest, default, or destructured parameters will not sync new values assigned to parameters in the function body with the arguments object.
```js
function funcWithDefault(a = 55) {
  arguments[0] = 99; // updating arguments[0] does not also update a
  console.log(a);
}
funcWithDefault(10); // 10

function funcWithDefault2(a = 55) {
  a = 99; // updating a does not also update arguments[0]
  console.log(arguments[0]);
}
funcWithDefault2(10); // 10

// An untracked default parameter
function funcWithDefault3(a = 55) {
  console.log(arguments[0]);
  console.log(arguments.length);
}
funcWithDefault3(); // undefined; 0
```

```js
function log(a,b,c,d) {
  console.log(a,b,c,d)
  arguments[0] = 'bfe'
  arguments[3] = 'dev'
 
  console.log(a,b,c,d)
}

log(1,2,3)

// 1 2 3 undefined
// bfe 2 3 undefined
```
<br>

## Object k saare method

<br>

> ### Object.assign()

The `Object.assign()` static method copies all `enumerable own properties` from one or more source objects to a target object. It returns the modified target object.

```js

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(source);
// Expected output: Object { b: 4, c: 5 }

console.log(returnedTarget);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
```

<br>
 
> ### Object.create() 

The `Object.create()` static method creates a new object, using an existing object as the `prototype` of the newly created object.

keep in mind, it attaches on the prototype, not on real object

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // Inherited properties can be overwritten

me.printIntroduction();
// Expected output: "My name is Matthew. Am I human? true"

console.log(me)
// Object { name: "Matthew", isHuman: true }
```

<br>
 
> ### Object.defineProperty()

The Object.defineProperty() static method defines a new property directly on an object, or modifies an existing property on an object, and returns the object.

```js
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 42

```

<br>
 
> ### Object.defineProperties()

The `Object.defineProperties()` static method defines new or modifies existing properties directly on an object, returning the object.

```js
const object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true,
  },
  property2: {},
});

console.log(object1.property1);
// Expected output: 42
```

<br>
 
### Object.freeze() do not freeze nested data

<br>
 
> ### Object.getOwnPropertyDescriptor()

The Object.getOwnPropertyDescriptor() static method returns an object describing the configuration of a specific property on a given object (that is, one directly present on an object and not in the object's prototype chain). The object returned is mutable but mutating it has no effect on the original property's configuration.

```js
const object1 = {
  property1: 42,
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1)
// Object { value: 42, writable: true, enumerable: true, configurable: true }

console.log(descriptor1.configurable);
// Expected output: true

console.log(descriptor1.value);
// Expected output: 42

```

<br>
 


<br>
 
> ### Object.is()

The Object.is() static method determines whether two values are the same value.

```js
console.log(Object.is('1', 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

const obj = {};
console.log(Object.is(obj, {}));
// Expected output: false
```

<br>
 
> ### Object.hasOwn()

**Note**: `Object.hasOwn()` is intended as a `replacement` for `Object.prototype.hasOwnProperty()`.

The `Object.hasOwn()` static method returns `true` if the specified object has the indicated property as its own property. If the property is inherited, or does not exist, the method returns `false`.

```js
const object1 = {
  prop: 'exists',
};

console.log(Object.hasOwn(object1, 'prop'));
// Expected output: true

console.log(Object.hasOwn(object1, 'toString'));
// Expected output: false

console.log(Object.hasOwn(object1, 'undeclaredPropertyValue'));
// Expected output: false
```

<br>
 

> ### Object.getOwnPropertyNames()

The Object.getOwnPropertyNames() static method returns an array of all properties (including non-enumerable properties except for those which use Symbol) found directly in a given object.

```js
const arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort());
// ["0", "1", "2", "length"]

// Array-like object
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.getOwnPropertyNames(obj).sort());
// ["0", "1", "2"]
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
 

### Array k sare method

<br>

> ### Array.prototype.at()

The `at()` method of Array instances takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.

```js
const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(`An index of ${index} returns ${array1.at(index)}`);
// Expected output: "An index of 2 returns 8"

index = -2;

console.log(`An index of ${index} returns ${array1.at(index)}`);
// Expected output: "An index of -2 returns 130"
```


<br>
 
### Array.prototype.fill()

The fill() method of Array instances changes all elements within a range of indices in an array to a static value. It returns the modified array. `fill() fills up to but not including end.`
```js
const array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(array1.fill(5, 1));
// Expected output: Array [1, 5, 5, 5]

console.log(array1.fill(6));
// Expected output: Array [6, 6, 6, 6]
```

<br>
 
### Array.from()

The `Array.from()` static method creates a new, shallow-copied `Array` instance from an iterable or array-like object.

Array.from(iterableArray, mapFn)

```js
console.log(Array.from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// Expected output: Array [2, 4, 6]
```

<br>
 
### Array.prototype.flatMap()

The `flatMap()` method of `Array` instances returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a `map()` followed by a `flat()` of depth 1 `(arr.map(...args).flat())`, but slightly more efficient than calling those two methods separately.

```js
const arr1 = [1, 2, 1];

const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));

console.log(result);
// Expected output: Array [1, 2, 2, 1]
```

<br>
 
> ### arr.sort() return the modified array, also modified base array

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
 
> ### async await under the hood'
Async/Await enables us to write asynchronous code in a synchronous fashion, which produces cleaner and easier-to-understand logic. Under the hood, it’s just syntactic sugar using generators and yield statements to “pause” execution. In other words, async functions can “pull out” the value of a Promise even though it’s nested inside a callback function, giving us the ability to assign it to a variable!


<br>
 
> ### When we return in then of promise
```js
const axios = require(‘axios’);

axios.get(‘http://www.somepage.com')
.then(function (response) {
    // response being the result of the first request
    // Returns another promise to the next .then(..) in the chain
    return axios.get(`http://www.somepage.com/${response.someValue}`);

    // Keep in mind, yha jo bhi retrn karenge wo Promise ban k return hoga, niche wale then me resove hoga
})
.then(function response {
    // response being the result of the second request
    // Handle response
})
.catch(function (error) {
    // Handle error.
});

```
<br>

> ### what are the various type of scope in js, explain with example and also show how they are differentiate with other with example or code

**Scope** The scope is the place where variables are declared

In JavaScript, scope determines the visibility and accessibility of variables, functions, and objects in different parts of your code. There are mainly four types of scope:

1. **Global Scope**
2. **Function Scope**
3. **Block Scope**
4. **Module Scope**

<br>

**Global Scope**

<details>

Variables declared `outside any function or block` have global scope. They can be accessed from anywhere in the code.

```js
var globalVar = "I am a global variable";

function showGlobalVar() {
  console.log(globalVar); // I am a global variable
}

showGlobalVar();
console.log(globalVar); // I am a global variable
```

</details>

<br>

**Function Scope**

<details>

Variables declared `within a function` are `accessible` only `within that function`. JavaScript uses the `var` keyword for function-scoped variables.

```js
function showFunctionScope() {
  var functionVar = "I am a function-scoped variable";
  console.log(functionVar); // I am a function-scoped variable
}

showFunctionScope();
console.log(functionVar); // ReferenceError: functionVar is not defined
```

```js
if(1){
    var a = "a"
}
console.log(a) // "a"
```
</details>

<br>

**Block Scope**

<details>

Variables declared with `let` or `const` within a block (e.g., within `{}` , like if block, for loop block but not function {}) are only accessible within that block. Block scope is a feature introduced in ES6.

```js
if (true) {
  let blockVar = "I am a block-scoped variable";
  const blockConst = "I am also a block-scoped constant";
  console.log(blockVar); // I am a block-scoped variable
  console.log(blockConst); // I am also a block-scoped constant
}

console.log(blockVar); // ReferenceError: blockVar is not defined
console.log(blockConst); // ReferenceError: blockConst is not defined
```

- only let and const are blocked scope. variable declared with var end up in the closest function scope.

</details>

<br>

**Module Scope**

<details>

When using ES6 modules, variables, functions, and classes declared in a module are scoped to that module. They are not added to the global scope.

```js
// module1.js
export const moduleVar = "I am a module-scoped variable";

// module2.js
import { moduleVar } from './module1.js';
console.log(moduleVar); // I am a module-scoped variable

// global scope doesn't know about moduleVar
console.log(window.moduleVar); // undefined
```

</details>

### Differentiating Scope with Examples

<br>

**Global vs. Function Scope**


```js
var globalVar = "I am global";

function testScope() {
  var functionVar = "I am local to function";
  console.log(globalVar); // I am global
  console.log(functionVar); // I am local to function
}

testScope();
console.log(functionVar); // ReferenceError: functionVar is not defined
```

<br>

**Function Scope vs. Block Scope**

```js
function testFunctionScope() {
  if (true) {
    var functionVar = "I am function-scoped";
    let blockVar = "I am block-scoped";
    const blockConst = "I am also block-scoped";
    console.log(functionVar); // I am function-scoped
    console.log(blockVar); // I am block-scoped
    console.log(blockConst); // I am also block-scoped
  }
  console.log(functionVar); // I am function-scoped
  console.log(blockVar); // ReferenceError: blockVar is not defined
  console.log(blockConst); // ReferenceError: blockConst is not defined
}

testFunctionScope();
```

<br>

> ### Scope chain

- `Grandchild` has `access` of `parent scope`, `parent` have `acces` of `global scope`, so `grandchild` has `access` of `global scope`. This is `scope chain`.
- `Parent` `don't have access` of `child scope`
- Scope chain has nothing to do with order in which functions were called. It depends on order in which function are written in the code.

<br>
 
> ### NaN is a falsy value
```js
NaN ? console.log("truthy") : console.log("falsy") // falsy
```

<br>
 

> ### Good case of 'this'

```js
function foo() {
  console.log("Simple function call")
  console.log(this === window)
}

let user = {
  count: 10,
  foo: foo,
  foo1: function() {
    console.log(this === window)
  },
}

user.foo() // Prints false because now “this” refers to user object instead of global object.
let fun1 = user.foo1
fun1() // Prints true as this method is invoked as a simple function.
user.foo1() // Prints false on console as foo1 is invoked as a object’s method, and the 'this' refers to the containing object NOT 'window' or 'global'
```

<br>
 
### **Note:** When we talk about the variable like `let or var`, then it is based on `position where the function is written`, while for the `"this", it refers to where is located`.

<br>

> ### Mutability
Array, objects are mutable while primitives don't

```js
let name = 'pra'
name[0] = 'x'
console.log(name) // 'pra'

```

```js
let name = ['p','r','a']
name[0] = 'x'
console.log(name) // ['x', 'r', 'a']
```

```js
let lifeDiscovered = {
  "Earth": true,
  "Mars": false,
  "Titan": false,
};

console.log(lifeDiscovered);
  // Logs: { Earth: true, Mars: false, Titan: false }

lifeDiscovered["Mars"] = true;
console.log(lifeDiscovered);
  // Logs: { Earth: true, Mars: true, Titan: false }
```

<br>
 
> ### BigInt
BigInt is a built-in object that provides a way to represent whole numbers larger than 2^(53) - 1, which is the largest number JavaScript can reliably represent with the Number primitive and represented by the Number.MAX_SAFE_INTEGER constant. BigInt can be used for arbitrarily large integers.


<br>
 

> ### Answer below
```js
(function(){
    var a = b = 3
})()

console.log('a defined? ' + (typeof a !== 'undefined') )
console.log('b defined? ' + (typeof b !== 'undefined') )
```

But how can b be defined outside of the scope of the enclosing function?\
Well, since the statement var a = b = 3; is shorthand for the statements b = 3; and var a = b;,\
b ends up being a global variable (since it is not preceded by the var keyword) and is therefore still in scope even outside of the enclosing function.

<br>

> ### Some points to consider
```js
class Person {
  constructor() {
    this.name = 'Lydia';
  }
}

console.log(typeof Person) // function

const d = new Person()

console.log(typeof d) // object, object becuse new instance create blank object ie {}
```
<br>
 
> ### NaN
There are several ways in which NaN can happen:

- Division of zero by zero
- Dividing an infinity by an infinity
- Multiplication of an infinity by a zero
- Any operation in which NaN is an operand
- Converting a non-numeric string or undefined into a number

```js
NaN < 1 // false
NaN > 1 // false
NaN == NaN // false
// But we can still check for NaN:
isNaN(NaN) // true
```

This is why you cannot determine whether a given value is NaN by comparing it to NaN, and instead you must use the isNaN() function. It is not surprising, then, that the native implementation of the function isNaN() could be simply replaced with:

```js
// Native implementation
function isNaN(x) {
  // Coerce into number
  x = Number(x)
  // if x is NaN, NaN != NaN is true, otherwise it's false
  return x != x
}
```


<br>

> ### Module

1. In earlier days, there was one JS file.
2. Over the time, the file became larger and larger, then we decide to divide the code into two or more script file.
3. But when the browser run, it convert all the file into one which cause merging and clashing of variable, because the variable declared have the global variable not the local or isolated variable.

```html
<script type="module"></script>
```

- Top level imports make imports known before execution. This makes bundling and dead code elimination possible
- When we import any module, it doesn't mean that we are creating a copy, we are creating a live connection or just pointing toward it.


**Top-level awaits**

We can use await without/outside async in module(It can happpen only in module)

eg;
```html
<!-- in index.html -->
<script type="module" src='script.js'><script>
```
```js
// in script.js
const res = await fetch ('some url')
const data = await res.json()
console.log(data)
```

<br>
 
> ### determine if bar is an object
```js
console.log((bar !== null) && (bar.constructor === Object));   // it covers all the cases nulls, arrays, and functions, because typeof null,array is object
```

<br>
 
> ### 8 Ways to get Undefined:
- A declared variable without assigning any value to it.
- Implicit returns of functions due to missing return statements.
- return statements that do not explicitly return anything.
- Lookups of non-existent properties in an object.
- Function parameters that have not passed.
- Anything that has been set to the value of undefined.
- Any expression in the form of void(expression)
- The value of the global variable undefined

<br>
 
> ### Need to know
```js
console.log(Number(42)) // 42
console.log(Number("42")) // 42
console.log(Number("paul")) // NaN
```

<br>
 
> ### Various Typeof
```js
// Numbers
typeof 37 === "number";
typeof 3.14 === "number";
typeof 42 === "number";
typeof Math.LN2 === "number";
typeof Infinity === "number";
typeof NaN === "number"; // Despite being "Not-A-Number"
typeof Number("1") === "number"; // Number tries to parse things into numbers
typeof Number("shoe") === "number"; // including values that cannot be type coerced to a number

typeof 42n === "bigint";

// Strings
typeof "" === "string";
typeof "bla" === "string";
typeof `template literal` === "string";
typeof "1" === "string"; // note that a number within a string is still typeof string
typeof typeof 1 === "string"; // typeof always returns a string
typeof String(1) === "string"; // String converts anything into a string, safer than toString

// Booleans
typeof true === "boolean";
typeof false === "boolean";
typeof Boolean(1) === "boolean"; // Boolean() will convert values based on if they're truthy or falsy
typeof !!1 === "boolean"; // two calls of the ! (logical NOT) operator are equivalent to Boolean()

// Symbols
typeof Symbol() === "symbol";
typeof Symbol("foo") === "symbol";
typeof Symbol.iterator === "symbol";

// Undefined
typeof undefined === "undefined";
typeof declaredButUndefinedVariable === "undefined";
typeof undeclaredVariable === "undefined";

// Objects
typeof { a: 1 } === "object";
typeof null === "object";

// use Array.isArray or Object.prototype.toString.call
// to differentiate regular objects from arrays
typeof [1, 2, 4] === "object";

typeof new Date() === "object";
typeof /regex/ === "object";

// The following are confusing, dangerous, and wasteful. Avoid them.
typeof new Boolean(true) === "object";
typeof new Number(1) === "object";
typeof new String("abc") === "object";

// Functions
typeof function () {} === "function";
typeof class C {} === "function";
typeof Math.sin === "function";
```

<br>
 
> ### why is NaN === NaN or NaN == NaN returning false
`NaN != NaN` because they are not necessary the SAME non-number. Thus it makes a lot of sense... Also why floats have both +0.00 and -0.00 that are not the same. Rounding may do that they are actually not zero.

As for typeof, that depends on the language. And most languages will say that NaN is a float, double or number depending on how they classify it... I know of no languages that will say this is an unknown type or null.

<br>
 
> ### What is the value of Math.max([2,3,4,5]);
Answer: NaN

you call this function with one parameter - [1,2,3] and javascript try convert it to number and get ("1,2,3" -> NaN) fail. So result as expected - NaN

**NOTE**: if array with just one number - all work correctly

```js
 Math.max([23]) // return 23
```
because [23] -> "23" -> 23 and covert to Number is done.

If you want get max element from array you should use apply function, like

```js
Math.max.apply(Math,[1,2,3])
```

or you can use the new spread operator

```js
Math.max(...[1,2,3])
```


<br>
 
> ### What is 2 in [1,2]
false. Because "in" returns whether a particular property/index available in the Object. In this case object has index 0 and 1 but don't have 2. Hence you get false.

The `in` operator returns `true` if the specified property is in the specified object or its prototype chain.

```js

const car = { make: 'Honda', model: 'Accord', year: 1998 };

console.log('make' in car);
// Expected output: true

```

<br>
 
> ### Explain why the following doesn't work as an IIFE: function foo(){ }();. What needs to be changed to properly make it an IIFE?
Here are two ways to fix it that involves adding more parentheses:

```js
(function foo(){ })() and (function foo(){ }()).
```

<br>
 

> ### 42..toString()
'42'

> ### 42.toString()
SyntaxError: Invalid or unexpected token

> ### 4.2.toString
'4.2'

> ### 4.2..toString
SyntaxError: Unexpected token .


<details>

In JavaScript, the `toString()` method is available for all objects, including primitive types like numbers. When you call `42..toString()`, JavaScript interprets the first dot as part of the number literal (i.e., `42.` is treated as `42.0`), and the second dot is treated as a method call.

Here’s what’s happening:
- `42..toString()` is essentially the same as `(42).toString()`.
- The first dot makes `42` a floating-point number (like `42.0`), and the second dot calls the `toString()` method on that number.

If you use only one dot (e.g., `42.toString()`), it results in a syntax error because JavaScript tries to parse `42.` as an incomplete number literal, expecting more digits or a method call.

In other words:
- `42.toString()` → Syntax error.
- `42..toString()` → Works fine because the first dot is interpreted as part of the number.

To avoid confusion, it's often clearer to wrap the number in parentheses: `(42).toString()`.

</details>

<br>

> ### Pipe and Compose Implementation
Pipe and Compose functions are higher order functions that are used for writing a well structured and 
clean code by avoiding nested function calls.

👉 Pipe flows from left-to-right, calling each function with the return result of the last one.

👉 Compose flows from right-to-left, calling each function with the return result of the last one.

```js
// 💡Let's take an Example -

// 👇 first function to fetch all players data
const getAllPlayers = (team) => {
  // console.log("fetching all players api.....");
  const india = ["virat kohli", "rohit sharma", "hardik pandya"];
  const pakistan = ["babar azam", "mohammad rizwan", "fakar zaman"];
  return team === "india" ? india : pakistan;
};

// 👇 second function to get first player
const getFirstPlayer = (players) => {
  return players[0];
};

// 👇 third function to get first name of player
const getFirstName = (player) => {
  return player.split(" ")[0];
};

// 👇 fourth function to capitalize first name
const capitalizeName = (firstName) => {
  return firstName.toUpperCase();
};

// 👇 final result here you can see we are calling nested functions and
// because of this, our code is not clean and readable.
const playerName = capitalizeName(
  getFirstName(getFirstPlayer(getAllPlayers("india")))
);

console.log(playerName); // VIRAT

// 💡 1) Implementation of pipe using simple for loop
const pipe = function (...functions) {
  return (...args) => {
    let result;
    for (let i = 0; i < functions.length; i++) {
      if (i === 0) {
        result = functions[i](...args);
      } else {
        result = functions[i](result);
      }
    }
    return result;
  };
};

// 👇 Wrapping all the functions in one pipe ( HOF ) function to avoid nested function calls
let pipedPlayerName = pipe(
  getAllPlayers,
  getFirstPlayer,
  getFirstName,
  capitalizeName
)("india");
console.log(pipedPlayerName); // VIRAT


//💡2) Implementation of compose using simple for loop
const compose = function (...functions) {
  return function (...args) {
    let result;
    for (let i = functions.length - 1; i >= 0; i--) {
      if (i === functions.length - 1) {
        result = functions[i](...args);
      } else {
        result = functions[i](result);
      }
    }
    return result;
  };
};

// 👇 Wrapping all the functions in one compose ( HOF ) function to avoid nested function calls
const composedPlayerName = compose(
  capitalizeName,
  getFirstName,
  getFirstPlayer,
  getAllPlayers
)("india");

console.log(composedPlayerName); // VIRAT
```

<br>
 
> ### constructor property which points to Person function itself

<br>
 
> ### A memory leak is any object that persists after you no longer have a use or need for it.

<br>
 
> ### new Keyword in js
The `new` keyword is used to invoke a constructor. What it actually does is:

Create a new instance

Bind `this` to the new instance

Reference the new object’s delegate [[Prototype]] to the object referenced by the constructor function’s `prototype` property.

<br>
 
> ### Break vs Continue in for loop

The `break` statement `"jumps out" or stops` of a loop.

The `continue` statement `"jumps over or skip"` one iteration in the loop.

<br>

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

> ### Explain the difference between Object.freeze() vs const
`const` and `Object.freeze` are two completely different things.

`const` applies to bindings ("variables"). It creates an immutable binding, i.e. you cannot assign a new value to the binding.

```js
const person = {
  name: "Leonardo",
}
let animal = {
  species: "snake",
}
person = animal // ERROR "person" is read-only
```

`Object.freeze` works on values, and more specifically, object values. It makes an object immutable, i.e. you cannot change its properties.

```js
let person = {
  name: "Leonardo",
}
let animal = {
  species: "snake",
}
Object.freeze(person)
person.name = "Lima" //TypeError: Cannot assign to read only property 'name' of object
console.log(person)
```

### Summary

`const` and `Object.freeze()` serve totally different purposes.

- `const` is there for declaring a variable which has to assinged right away and can't be reassigned. variables declared by `const` are block scoped and not function scoped like variables declared with `var`
- `Object.freeze()` is a method which accepts an object and returns the same object. Now the object cannot have any of its properties removed or any new properties added.


<br>



> ### Data structures which are assigned to const can be mutated
```js
    const object = {
      prop1: 1,
      prop2: 2
    }

    object.prop1 = 5;   // object is still mutable!
    object.prop3 = 3;   // object is still mutable!

    console.log(object);  // object is mutated
```

In this example we declare a variable using the `const` keyword and assign an object to it. Although we can't reassign to this variable called object, we can mutate the object itself. If we change existing properties or add new properties this will this have effect. To disable any changes to the object we need `Object.freeze()`.


<br>


> ### Objects with references aren't fully frozen
```js
const object = {
  prop1: 1,
  nestedObj: {
    nestedProp1: 1,
    nestedProp2: 2,
  }
}


const frozen = Object.freeze(object);

frozen.prop1 = 5; // won't have any effect
frozen.nestedObj.nestedProp1 = 5; //will update because the nestedObject isn't frozen

console.log(frozen);
```


<br>



> ### If we want the nested object to be freezed, we can use below code
```js
function deepFreeze(obj) {
  // Use Object.entries to get [key, value] pairs
  for (const [key, value] of Object.entries(obj)) {
    // Recursively freeze the value if it is an object
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  // Freeze the object itself and return it
  return Object.freeze(obj);
}

// Example nested object
const nestedObj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};

// Deep freeze the nested object
const frozenObj = deepFreeze(nestedObj);

// Attempting to modify a frozen property will throw an error in strict mode
// In non-strict mode, the assignment will fail silently
frozenObj.b.c = 5; // Throws an error
```


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

> ### Object.entries(newObj), Object.keys(newObj), Object.values(newObj) 

<br>

> ### How do you detect caps lock key turned on or not

The mouseEvent `getModifierState()` is used to return a boolean value that indicates whether the specified modifier key is activated or not. The modifiers such as `CapsLock, ScrollLock and NumLock` are activated when they are clicked, and deactivated when they are clicked again.

Let's take an input element to detect the CapsLock on/off behavior with an example,

```js
document.addEventListener('keydown', function (event) {
  const isCapsLockOn = event.getModifierState('CapsLock');
  
  if (isCapsLockOn) {
    console.log('Caps Lock is ON');
  } else {
    console.log('Caps Lock is OFF');
  }
});
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

**Iterable**: It is an object which can be iterated over via a method whose key is Symbol.iterator.\
Iterator: It is an object returned by invoking `[Symbol.iterator]()` on an iterable. This iterator object wraps each iterated element in an object and returns it via `next()` method one by one. 

**IteratorResult**: It is an object returned by `next()` method. The object contains two properties; the `value` property contains an iterated element and the done property determines whether the element is the last element or not.

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

### Partial Application

currying eg

```js
const multiply = (a,b,c) => a*b*c;
const curriedMultiply = (a) => (b) => (c) => a*b*c;
curriedMultiply(3)(4)(10)
```

Partial Application says we have to call the function once and then apply the rest of the arguments later.

```js
const multiply = (a,b,c) => a*b*c;
const partialMultiplyBy5 = multiply.bind(this, 5);
partialMultiplyBy5(4,10)
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

Number.isNaN() `doesn't` attempt to `convert` the parameter to a number, so non-numbers always return false. 

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
 
### Promise resolve() method 
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
 
> ### What is the purpose of the race method in promise
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
 
> ### What is a callback function
A callback function is a function passed into another function as an argument. This function is invoked inside the outer function to complete an action. Let's take a simple example of how to use callback function

It is a function paased into another function as arguments, whcih is then invoked inside the outer function to complete some kind of action.

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
 
> ### What is a callback hell
Callback Hell is an `anti-pattern` with `multiple nested callbacks` which makes code hard to read and debug when dealing with asynchronous logic. The callback hell looks like below,

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

<br>

Callback Hell :-
- Callback Hell is the situation where callbacks are nested several levels deep which makes it difficult to understand and maintain the code. It's also known as Pyramid of Doom.

💡 Avoiding Callback Hell\
👉 1) Using Promises \
👉 2) Using async-await \
👉 3) Using generators

<br>

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
 
> ### What happens if we add two arrays

If you add two arrays together, it will convert them both to strings and concatenate them. For example, the result of adding arrays would be as below,

```js
console.log(["a"] + ["b"]); // "ab"
console.log([] + []); // ""
console.log(![] + []); // "false", because ![] returns false.
console.log([] - 1) // -1
```
```js
console.log([] + {}) // [object Object]
console.log({} + {}) // [object Object][object Object]
console.log({} - {}) // NaN
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

> ### Why does parseInt(1/0, 19) return 18?

<details>

The result of 1/0 is `Infinity`.

`parseInt` treats its first argument as a string which means first of all `Infinity.toString()` is called, producing the string `"Infinity"`. So it works the same as if you asked it to convert `"Infinity"` in base 19 to decimal.

Here are the digits in base 19 along with their decimal values:

```
Base 19   Base 10 (decimal)
---------------------------
   0            0
   1            1
   2            2
   3            3
   4            4
   5            5
   6            6
   7            7
   8            8
   9            9
   a            10
   b            11
   c            12
   d            13
   e            14
   f            15
   g            16
   h            17
   i            18
```

What happens next is that `parseInt` scans the input `"Infinity"` to find which part of it can be parsed and stops after accepting the first `I` (because `n` is not a valid digit in base 19).

Therefore it behaves as if you called `parseInt("I", 19)`, which converts to decimal 18 by the table above.
</details>
<br>
 
> ### Why does ++[[]][+[]]+[+[]] return the string “10”?

```js
// behind the scene js convert the [] to '' and +'' gives 0
// [+[]] = [0], ++0 = 1

    ++[[]][+[]] => 1 
    [+[]] => [0]
```

<br>
 

> ### How do you create custom HTML element?
```js
https://javascript.info/custom-elements
```

The creation of custom HTML elements involves two main steps,

  1. **Define your custom HTML element:** First you need to define some custom class by extending HTMLElement class.\
     **Note:** The browser exposes a function called customElements.define inorder to reuse the element.

  ```js
  class ProdcutCard extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = this.getAttribute('passedData') || '<h2>Hi from product card</h2>'
    }

    // Below are the lifecycle
    connectedCallback() {
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
    }

    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }

    static get observedAttributes() {
        return [ /* array of attribute names to monitor for changes */ ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }

    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}

window.customElements.define('product-card', ProdcutCard)
  ```

  2. Use custome element just like other HTML element: Declare your custom element as a HTML tag.

  ```html
    <body>
       <product-card passedData="<h1>hi this pass data </h1>"/>
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

**Also for the same**

```js
function isPromise(obj) {
  return obj instanceof Promise;
}
```


<br>
 
> ### What is a service worker
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
| Feature                                 | **Object**                                                              | **Map**                                                 |
| --------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------- |
| **Key Types**                           | Only strings, symbols (integers get converted to strings internally)    | Any data type (objects, arrays, functions, etc.)        |
| **Key Order**                           | No guaranteed order (insertion order not strictly maintained)           | Maintains insertion order                               |
| **Size Retrieval**                      | Requires manual calculation (`Object.keys(obj).length`)                 | Easy using `map.size`                                   |
| **Iteration**                           | Requires `for...in` or `Object.entries()`                               | Can use `map.forEach()` or `for...of` directly          |
| **Performance for Frequent Add/Remove** | Less optimized                                                          | More optimized for frequent additions and deletions     |
| **Prototypes**                          | Has a prototype by default (`{}` inherits from `Object.prototype`)      | Does not have prototype collisions                      |
| **Serialization**                       | Can be serialized using `JSON.stringify()` (only string keys preserved) | Cannot be directly stringified; needs conversion        |
| **Utility Methods**                     | Fewer native methods (`Object.keys`, `Object.values`, etc.)             | Rich API (`set`, `get`, `has`, `delete`, `clear`, etc.) |
| **Use Case**                            | Best for structured data / JSON                                         | Best for dynamic key-value pairs                        |


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


<br>
 

> ### map and weakMap

if we use an object as the key in a regular Map, then while the Map exists, that object exists as well. It occupies memory and may not be garbage collected.

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

// john is stored inside the map,
// we can get it by using map.keys()
```

In Weakmap, if we use an object as the key in it, and there are no other references to that object – it will be removed from memory (and from the map) automatically.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference

// john is removed from memory!
```

Compare it with the regular Map example above. Now if john only exists as the key of WeakMap – it will be automatically deleted from the map (and memory).

<br>

**Use case: additional data**

The main area of application for WeakMap is an additional data storage.

If we’re working with an object that “belongs” to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive – then WeakMap is exactly what’s needed.


refer below for understanding
```
https://javascript.info/weakmap-weakset
```
<br>

Map  | WeakMap
------------- | -------------
A Map is an unordered list of key-value pairs where the `key and the value` can `be` of `any type` like string, boolean, number, etc.  | In a Weak Map, every `key` can only be an `object and function`. It used to store weak object references.
Maps are `iterable`.  | WeakMaps are `not iterable`.
Maps will keep everything even if you don’t use them. | WeakMaps holds the reference to the key, not the key itself.
The garbage collector doesn’t remove a key pointer from “Map” and also doesn’t remove the key from memory. | The garbage collector goes ahead and removes the key pointer from “WeakMap” and also removes the key from memory. WeakMap allows the garbage collector to do its task but not the Map.
Maps have some properties : .set, .get, .delete, .size, .has, .forEach, Iterators. | WeakMaps have some properties : .set, .get, .delete, .has.
You can create a new map by using a new Map(). | You can create a new WeakMap by using a new WeakMap().

<br>

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

<br>
 
> ### illegal shadowing
If you create a variable in a global scope with the let keyword and another variable with the var keyword in a block scope but the exact same name, it will throw an error. This is called illegal shadowing.

```js
let fruit = 'apple';
let hungry = true;

if(hungry) {
  var fruit = 'orange'
  console.log(fruit)
}

console.log(fruit)
```


<br>
 

> ### What is a pure function
A Pure function is a function where the return value is only determined by its arguments without any side effects. i.e, If you call a function with the same arguments 'n' number of times and 'n' number of places in the application then it will always return the same value.

<br>
 
> ### How do you redeclare variables in switch block without an error
```js
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


<br>
 

> ### What is the Temporal Dead Zone

The Temporal Dead Zone refers to the period between the entering of a scope and the actual declaration of a variable using let or const. 

Time since when the let variable was hoisted until it is initialized some value.

- So any line till before "let a = 10" is the TDZ for a

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization
console.log(b); // prints undefined as expected
let a = 10;
console.log(a); // 10
var b = 15;
console.log(window.a); // undefined
console.log(window.b); // 15
```

<br>
 
>### Hoisting

### Var and function declaration are hoisted while let, const and classes in TDZ

Hoisting is a concept which enables us to extract values of variables and functions even before initialising/assigning value without getting error 

Hoisting in JavaScript is a behavior in which a function or a variable can be used before declaration. 


When javaScript engine starts executing the code, It creates the global execution context in callstack
Each context in callstack has two phases:-
1) Memory Creation
2) Code Execution



💡 3 Things you should know about "Hoisting"\
👉 Hoisting of Variables ( var, let, const and global )\
👉 Hoisting of Functions ( declaration and expression ) \
👉 Hoisting of Classes ( declaration and expression )

<br>

**Hoisting of Variables**

**case 1:-** varibles declared with var keyword
```js
console.log(name); // undefined
var name = "Jayesh";
console.log(name); // Jayesh
```

<br>

**case 2:-** let and const variables ( Temporal Dead Zone :- Technically they are also hoisted )

**What is TDZ** :- time frame between let and const varibles are hoisted to they are initialized\
let and const are allocated in diffrent memory space ( script scope ) than global scope

let example
```js
console.log(age); // Uncaught ReferenceError: Cannot access 'age' before initialization
let age = 24;
console.log(age); // 24
```

const example
```js
console.log(language); // Uncaught ReferenceError: Cannot access 'language' before initialization
const language = "javaScript";
console.log(language); // javaScript
```

<br>

**case 3:-** global variables
```js
console.log(a); // Uncaught ReferenceError: a is not defined
a = 4;
console.log(a); // 4
```

<br>

**Hoisting of functions**

**case 1:-** function declaration
```js
displayName(); // Jc
function displayName() {
  console.log("Jc");
}
displayName(); // Jc
```

<br>

**case 2:-** function expression

with "var" keyword
```js
getName(); // Uncaught TypeError: getName is not a function ( getName is undefined here )
var getName = function () {
  console.log("Jayesh");
};
getName(); // Jayesh
```


with "let" or "const" keyword
```js
getNameTDZ(); // Uncaught ReferenceError: Cannot access 'getNameTDZ' before initialization
const getNameTDZ = function () {
  console.log("Jayesh");
};
getNameTDZ(); // Jayesh
```

<br>

**case 3:-** Arrow function ( similar to function expression )

with "var" keyword
```js
getNameArrow(); // Uncaught TypeError: getNameArrow is not a function ( getNameArrow is undefined here )
var getNameArrow = () => {
  console.log("Jayesh");
};
getNameArrow(); // Jayesh
```


with "let" or "const" keyword
```js
getNameArrowTDZ(); // Uncaught ReferenceError: Cannot access 'getNameArrowTDZ' before initialization
const getNameArrowTDZ = () => {
  console.log("Jayesh");
};
getNameArrowTDZ(); // Jayesh
```

<br>

**Hoisting of Classes**

**case 1:-** class declaration
```js
var jayesh = new Person("jayesh", 24); // Uncaught ReferenceError: Cannot access 'Person' before initialization ( TDZ )

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const jc = new Person("jc", 24);
console.log(jc); // Person { name: 'jc', age: 24 }
```

<br>

**case 2:-** class expression

with "var" keyword
```js
var viru = new Player("viru"); // Uncaught TypeError: Player is not a constructor ( Player is undefined here )

var Player = class {
  constructor(name) {
    this.name = name;
  }
};

var virat = new Player("virat");
console.log(virat); // Player { name: 'virat' }
```


with "let" or "const" keyword

```js
const meow = new Animal("meow"); // Uncaught ReferenceError: Cannot access 'Animal' before initialization ( TDZ )

const Animal = class {
  constructor(name) {
    this.name = name;
  }
};

const cat = new Animal("cat");
console.log(cat); // Animal { name: 'cat' }
```

<br>
 
> ### What is webpack
Webpack is a module bundler for JavaScript applications
* Uses
  * Make Build
  * Js & CSS minify
  * Create the entry file

> ### What is loader and plugin in Webpack?


<br>
 

> ### What is Array-Like Objects in JavaScript?
An Array-Like object is an object that has properties and methods similar to a regular Array object but `does not possess` all the functionalities of a regular array, such as the `methods like push(), pop(), and splice()`. These objects can be `indexed like an array`, and their `property` values can be `accessed` with `bracket notation`.

To loop through Array-Like Objects, we can use a for loop or forEach method, just like we do for regular arrays. Here is an example of using a for loop to loop through a NodeList object:

```js
const list = document.querySelectorAll('li');
for (let i = 0; i < list.length; i++) {
  console.log(list[i].textContent);
}
```

Array-like objects are objects that have some characteristics of arrays but may not be true JavaScript arrays. They have numeric indices and a length property like arrays, allowing you to access elements using bracket notation and loop through them.

Note: They may lack some of the array methods like `push, pop, or forEach` but rather have similar methods to achieve the same functionality.

Array-Like Object it is an usual object - {}, keys are numbers and has a length property. It doesn't have any specific methods, and doesn't support array's methods.


<br>
 
> ### What is the difference between ES6 Class and ES5 implementation? (solution is below code)
- ES6 classes provide a more concise and readable syntax for creating objects and handling inheritance in JavaScript compared to the ES5 implementation.
- ES6 uses the `class` keyword, `constructor` for initialization, and `extends` and `super` for inheritance, making the code more intuitive.
-  Methods are defined directly within the class body, while ES5 relies on function constructors and manually manipulating the prototype chain.
-   ES6 also introduces static methods and the `new.target` meta-property, enhancing functionality and ease of use. Overall, ES6 classes simplify object-oriented programming in JavaScript, addressing the verbosity and complexity of ES5.

<br>

> ### What is the difference between classical inheritance and prototypal inheritance? (solution is below code)

**Class Inheritance**: instances inherit from classes (like a blueprint - a description of the class), and create sub-class relationships: hierarchical class taxonomies. Instances are typically instantiated via constructor functions with the `new keyword`. Class inheritance may or may not use the class keyword from ES6.\

**Prototypal Inheritance**: instances inherit directly from other objects. Instances are typically instantiated via `factory functions or Object.create()`. Instances may be composed from many different objects, allowing for easy selective inheritance.

<br>
 
> ### child class inheritance using constructor function

```js
// ES6 Class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // Calls the parent constructor
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog('Mitzie');
d.speak(); // Mitzie barks.


// ES5 Implementation
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + ' makes a noise.');
};

function Dog(name) {
  Animal.call(this, name); // Call the parent constructor
}

// Inherit from Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log(this.name + ' barks.');
};

var d = new Dog('Mitzie');
d.speak(); // Mitzie barks.

```

<br>
 
> ### What are the possible ways to create objects in JavaScript
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


<br>
 
> ### What are the possible ways to create array in JavaScript
- ONLY ONE(NUMBER) ARGUMENT:
```js
let arr1 = new Array(2);
console.log(arr1)  // => [ <2 empty items> ]
```

- MORE THAN ONE ARGUMENTS:
```js
let arr2 = new Array(1, 2)
console.log(arr2)       // => [ 1, 2 ]
```

```js
let ones = new Array(5).fill(1);
console.log(ones); // [ 1, 1, 1, 1, 1 ]
```

```js
let arr3 = Array.from(new Array(5));
console.log(arr3) // => [ undefined, undefined, undefined, undefined, undefined ]

let zeros = Array.from(new Array(5), () => 0);

console.log(zeros);  // => [ 0, 0, 0, 0, 0 ]

let dynamicItems = Array.from(new Array(5), (item, index) => index + 10)

console.log(dynamicItems);  // => [ 10, 11, 12, 13, 14 ]
```

```js
let arr4 = [...new Array(5)]
console.log(arr4)  // => [ undefined, undefined, undefined, undefined, undefined ]
```

```js
console.log(Array.of(5)); // [5]
console.log(Array(5)); // [ <5 empty items> ]
```

<br>

> ### Prototype chaining & Prototype Inheritance

**Prototype inheritance** refers to the mechanism by which objects inherit properties and methods from their prototypes or parents.

<br>

**Prototype chaining** is a mechanism in JavaScript for property/method lookup.
- When accessing a property or method on an object:
  - JavaScript first checks if the object itself has that property.
  - If not found, it looks at the object's **prototype**.
  - This continues **up the prototype chain** until:
    - The property is found, or
    - It reaches an object with `null` as its prototype.
- This chain of lookups is called the **prototype chain**.


#### **Example Scenario**
- Suppose you have objects linked via prototypes: `foo → bar → baz`.
  - If a property isn't found on `foo`, JavaScript checks `bar`.
  - If not on `bar`, it checks `baz`.
  - If still not found, the search continues until `null` is reached.

#### **JavaScript Inheritance Model**
- JavaScript uses only **objects** for inheritance.
- Every object has a hidden property pointing to its **prototype object**.
- Each prototype may have its own prototype, forming a **chain**.
- This chain ends when a prototype is `null`.
  - `null` has no prototype and is the **end of the chain**.

<br>

💡Difference between prototype and  __proto__\
prototype is a property of a Function object. It is the prototype of objects constructed by that function.\
__proto__ is an internal property of an object, pointing to its prototype.

<br>

```js
const Person = function (name, age) {
  this.name = name;
  this.age = age;
  this.getName = function () {
    console.log("name is", this.name);
  };
};

const jayesh = new Person("jayesh", 24);
// jayesh.__proto__ => Person.prototype => Object.prototype => null

jayesh.getName(); // name is jayesh

console.log(jayesh.__proto__); // Person.prototype
console.log(jayesh.__proto__ === Person.prototype); // true
console.log(Object.getPrototypeOf(jayesh) === Person.prototype); // true
console.log(jayesh.__proto__.__proto__); // Object.prototype
console.log(jayesh.__proto__.__proto__.__proto__); // null

const sam = new Person("sam", 25);
// sam.__proto__ => Person.prototype => Object.prototype => null

sam.getName(); // name is sam

// Now, Let's create prototype member ( common parent inherit member for all objects ) saves memory.
Person.prototype.getAge = function () {
  console.log("age is", this.age);
};

// only one copy of getAge() will be created inside Person.prototype
jayesh.getAge(); // age is 24
sam.getAge(); // age is 24

console.log(Object.keys(jayesh));
// ['name', 'age', 'getName', 'lastName']

for (let key in jayesh) {
  console.log(key);
}
// name, age, getName, lastName, getAge(Prototype member)
```

<br>

> ### Some cases of === or ==
```js
0 == false   // true
0 === false  // false
1 == "1"     // true
1 === "1"    // false
null == undefined // true
null === undefined // false
null == 0 // false
null === 0 // false
null < 0 // false
null > 0 // false
null <= 0 // true
null >= 0 // true
null == false // false
undefined == 0 // false
undefined < 0 // false
undefined > 0 // false
undefined <= 0 // false
undefined >= 0 // false
'0' == false // true
'0' === false // false
[]==[] or []===[] //false, refer different objects in memory
{}=={} or {}==={} //false, refer different objects in memory

NaN === NaN  // false
NaN == NaN  // false
```


<br>
 
> ### What is a unary function
Unary function (i.e. monadic) is a function that accepts exactly one argument. It stands for a single argument accepted by a function

<br>
 
> ### How do you decode or encode a URL in JavaScript?
In JavaScript, you can encode or decode a URL using the encodeURIComponent() and decodeURIComponent() functions, respectively.
The encodeURIComponent() function encodes a string by replacing special characters with their corresponding escape sequences. This is useful when you want to include special characters, such as spaces or non-ASCII characters, in a URL.

Here is an example of how to encode a URL in JavaScript using encodeURIComponent():\

```js
const url = "https://www.example.com/search?q=hello world";
const encodedUrl = encodeURIComponent(url);
console.log(encodedUrl);
// Output: "https%3A%2F%2Fwww.example.com%2Fsearch%3Fq%3Dhello%20world"
```

The decodeURIComponent() function decodes a string that has been encoded using encodeURIComponent(). This is useful when you want to retrieve the original string from an encoded URL.

Here is an example of how to decode a URL in JavaScript using decodeURIComponent():

```js
const encodedUrl = "https%3A%2F%2Fwww.example.com%2Fsearch%3Fq%3Dhello%20world";
const decodedUrl = decodeURIComponent(encodedUrl);
console.log(decodedUrl);
// Output: "https://www.example.com/search?q=hello world"
```
Note that encodeURI() and decodeURI() functions are also available in JavaScript, which are similar to encodeURIComponent() and decodeURIComponent() respectively, but with slightly different encoding rules.

<br>
 
> ### What are classes in ES6
Classes are a template ( a blueprint ) for creating objects.

In ES6, Javascript classes are `primarily syntactic sugar over JavaScript’s existing prototype-based inheritance`. For example, the prototype based inheritance written in function expression as below,

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

<br>
 
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

<br>
 
Two ways to define class in javascript
1) Class Declaration
2) Class Expression

<br>
<details>

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
</details>

<br>

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
<br>

### Key point to note

`Important` to note that static property is not accessible directly in the class inside any `method or constructor` using the `this` keyword, instead of this keyword we should use the class name

below code will show error
```js
class Department {
  
    // Static property
    static fiscalYear = 2020

    constructor(id: string, private reports: string[]) {      
        this.fiscalYear
    }
}
```

below will be error free
```js
class Department {
  
    // Static property
    static fiscalYear = 2020

    constructor(id: string, private reports: string[]) {      
        Department.fiscalYear
    }
}
```
<br>

### Private Properties in Class using "#"

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
<br>

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

> ### What happens if you write constructor more than once in a class
The "constructor" in a class is a special method and it should be defined only once in a class. i.e, If you write a constructor method more than once in a class it will throw a `SyntaxError` error.

```js
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

<br>
 
 > ### How do you call the constructor of a parent class
 You can use the `super keyword` to call the constructor of a parent class. Remember that `super()` must be `called before` using `'this' reference`. `Otherwise` it will `cause a reference error`. Let's the usage of it,


 ```js
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


<br>
 

> ### What are the differences between cookie, local storage and session storage
Below are some of the differences between cookie, local storage and session storage,

Feature |	Cookie |	Local storage |	Session storage
-------- | ------- | -------------- | ---------------
Accessed on client or server side |	Both server-side & client-side	| client-side only |	client-side only
Lifetime |	As configured using Expires option |	until deleted |	until tab is closed
SSL support |	Supported |	Not supported |	Not supported
Maximum data size |	4KB	| 5 MB |	5MB


<br>
 

> ### What is the purpose of double exclamation
The double exclamation or negation(!!) ensures the resulting type is a boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true. For example, you can test IE version using this expression as below,
```js
let isIE8 = false;
isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
console.log(isIE8); // returns true or false
```


<br>
 
> ### What is the difference between null and undefined
Null |	Undefined
----- | -----------
It is an assignment value which indicates that variable points to no object. | 	It is not an assignment value where a variable has been declared but has not yet been assigned a value.
Type of null is object  | 	Type of undefined is undefined
The null value is a primitive value that represents the null, empty, or non-existent reference.  | 	The undefined value is a primitive value used when a variable has not been assigned a value.
Indicates the absence of a value for a variable  | 	Indicates absence of variable itself
Converted to zero (0) while performing primitive operations  | 	Converted to NaN while performing primitive operations

<br>
 
> ### What is eval
The eval() function evaluates JavaScript code represented as a string. The string can be a JavaScript expression, variable, statement, or sequence of statements.
isko hum calculator me use kar sakte h, '10+3' as a string pass kar do ye 13 return karega.
```js
console.log(eval("1 + 2")); //  3
```

<br>
 
> ### Is it recommended to use eval
No, it allows arbitrary code to be run which causes a security problem. As we know that the eval() function is used to run text as code. In most of the cases, it should not be necessary to use it.

```js
var morning = "good morning"
function speak(greeting) {
  console.log(morning)
}
speak(morning)
```

This logs `good morning`. But what about this:

```js
var greeting = "good morning"
function speak(str) {
  eval(str)
  console.log(greeting)
}
speak("var greeting = 'meow'")
```

This will log `meow`. Meow... indeed Since no local greeting variable was defined. We expected to access the global scope and print 'good morning' , Instead, eval injected a new local variable into our scope.

So how bad is this:

- You leave your code vulnerable to malicious code injection
- You slow down your code's performance


<br>
 
> ### What is isNaN
The isNaN() function is used to determine whether a value is an illegal number (Not-a-Number) or not. i.e, This function returns true if the value equates to NaN. Otherwise it returns false.
```js
isNaN("Hello"); //true
isNaN("100"); //false
```

<br>
 
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


<br>
 
> ### What is the difference between an attribute and a property
`Attributes` are defined on the `HTML markup` whereas `properties` are `defined on the DOM`. For example, the below HTML element has 2 attributes type and value,

```html
<input type="text" value="Name:">
```

You can retrieve the attribute value as below,
```js
const input = document.querySelector("input");
console.log(input.getAttribute("value")); // Good morning
console.log(input.value); // Good morning
```

And after you change the value of the text field to "Good evening", it becomes like

```js
console.log(input.getAttribute("value")); // Good evening
console.log(input.value); // Good evening
```

<br>
 
> ### What is the purpose of void 0
Void(0) is used to prevent the page from refreshing.
```html
<a href="JavaScript:void(0);" onclick="alert('Well done!')">
  Click Me!
</a>
```

<br>
 
> ### What is the use of preventDefault method
The preventDefault() method cancels the event if it is cancelable, meaning that the default action or behaviour that belongs to the event will not occur. For example, prevent form submission when clicking on submit button and prevent opening the page URL when clicking on hyperlink are some common use cases.

<br>
 
> ### What is BOM
The Browser Object Model (BOM) allows JavaScript to "talk to" the browser. It consists of the objects navigator, history, screen, location and document which are children of the window. The Browser Object Model is not standardized and can change based on different browsers.

![BOM](/images/bom.png)

<br>
 
> ### How do you redirect new page in javascript
```js
function redirect() {
  window.location.href = "newPage.html";
}
```

<br>
 
> ### How do get query string values in javascript
`window.location.search`
Basically use te window.location to get all things related to url

<br>
 
> ### Can we define properties for functions
Yes, We can define properties for functions because functions are also objects.
```js
fn = function (x) {
  //Function code goes here
};

fn.name = "John";

fn.profile = function (y) {
  //Profile code goes here
};
```

<br>
 
> ### What is the way to find the number of parameters expected by a function
You can use function.length syntax to find the number of parameters expected by a function. Let's take an example of sum function to calculate the sum of numbers,

```js
function sum(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
sum.length; // 4 is the number of parameters expected.
```

<br>
 
> ### What is a polyfill
A polyfill is a piece of JS code used to provide modern functionality on older browsers that do not natively support it. For example, Silverlight plugin polyfill can be used to mimic the functionality of an HTML Canvas element on Microsoft Internet Explorer 7.


<br>
 
> ### How do you convert date to another timezone in javascript
You can use the toLocaleString() method to convert dates in one timezone to another. For example, let's convert current date to British English timezone as below,
```js
console.log(event.toLocaleString("en-GB", { timeZone: "UTC" })); //29/06/2019, 09:56:00
```

<br>
 
> ### What are the properties used to get size of window
You can use innerWidth, innerHeight, clientWidth, clientHeight properties of windows, document element and document body objects to find the size of a window. Let's use them combination of these properties to calculate the size of a window or document,
```js
var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
```

<br>
 
> ### Can you apply chaining on conditional operator
```js
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

<br>
 
> ###  Method chaining
Method chaining, also known as named parameter idiom, is a common syntax for invoking multiple method calls in object-oriented programming languages. Each method returns an object allowing the calls to be chained together in a single statement without requiring variables to store the intermediate results.

```js
var obj = function(){

    this.i = 0; // public property

    this.add = function(i){ // public function add()
        this.i += i;   // Add The value
        return this;   // return's entire object
    };

    this.subtract = function(i){  // public function substract()
        this.i -= i;  // Subtract's the value
        return this;  // return's entire object
    };

    this.print = function(){  // public function print()
        return this.i ;  // Prints the value
    };
    console.log(this)
}

let x = new obj()

console.log(x.add(3).subtract(2).print());  // => 1

console.log(obj.this)

/* OUTPUT
obj { i: 0, add: [Function], subtract: [Function], print: [Function] }

*/
```

<br>
 
> ### Calling a function when it exist

```js
callingFunction?.()
```


<br>
 
> ### What happens if you do not use rest parameter as a last argument
The rest parameter should be the last argument, as its job is to collect all the remaining arguments into an array. For example, if you define a function like below it doesn’t make any sense and will throw an error.
```js
function someFunc(a,…b,c){
  //You code goes here
  return;
}
```

<br>
 
> ### How do you create an object with prototype
The Object.create() method is used to create a new object with the specified prototype object and properties. i.e, It uses an existing object as the prototype of the newly created object. It returns a new object with the specified prototype object and properties.
```js
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

<br>
 
> ### What is call stack
Call Stack is a `data structure for javascript interpreters` to keep track of function calls(creates execution context) in the program. It has two major actions,

* Whenever you call a function for its execution, you are pushing it to the stack.
* Whenever the execution is completed, the function is popped out of the stack.

<br>
 
> ### What is the purpose of compareFunction while sorting arrays
The compareFunction is used to define the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value. Let's take an example to see the usage of compareFunction,

compareFn(a, b) return value |	sort order
-------------  |  -------------
 "> 0"                          |	sort a after b, e.g. [b, a]
 "< 0"                          |	sort a before b, e.g. [a, b]
 "=== 0"                        | keep original order of a and b


```js
const d = [1,10,2,1000]

d.sort((a,b)=>{
    debugger    //a,b ulta hota h, b = 1 a = 10, agr a-b +ve to waisa hi rahega
    return a - b
})

console.log(d);
```


<br>
 

> ### What happens If I pass string type for getPrototype method
In ES5, it will throw a TypeError exception if the obj parameter isn't an object. Whereas in ES2015, the parameter will be coerced to an Object.
```js
// ES5
Object.getPrototypeOf("James"); // TypeError: "James" is not an object
// ES2015
Object.getPrototypeOf("James"); // String.prototype
```


<br>
 

> ### How do you prevent an object to extend
The `Object.preventExtensions()` method is used to prevent new properties from ever being added to an object. In other words, it prevents future extensions to the object. Let's see the usage of this property,

```js
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


<br>
 

> ### What are the different ways to make an object non-extensible
You can mark an object non-extensible in 3 ways,

* Object.preventExtensions
* Object.seal
* Object.freeze


<br>
 
> ### What Is Obfuscation in javascript
Obfuscation is the deliberate act of creating obfuscated `javascript code`(i.e, source or machine code) that is `difficult for humans to understand`. It is something similar to encryption, but a machine can understand the code and execute it. Let's see the below function before Obfuscation,

```js
function greeting() {
  console.log("Hello, welcome to JS world");
}
```
And after the code Obfuscation, it would be appeared as below,
```js
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

<br>
 
> ### Why do you need Obfuscation
Below are the few reasons for Obfuscation,

* The Code size will be reduced. So data transfers between server and client will be fast.
* It hides the business logic from outside world and protects the code from others
* Reverse engineering is highly difficult
* The download time will be reduced


<br>
 
> ### typeof `new Number(3)` is object not number because of class but Number(3) is number

<br>
 
> ### What is the purpose of double tilde operator
The double tilde operator(~~) is known as double NOT bitwise operator. This operator is going to be a quicker substitute for Math.floor().

<br>
 
> ### Do all objects have prototypes
No. All objects have prototypes except for the base object which is created by the user, or an object that is created using the new keyword.

<br>
 
> ### How do you create specific number of copies of a string
The `repeat()` method is used to construct and return a new string which contains the specified number of copies of the string on which it was called, concatenated together. Remember that this method has been added to the ECMAScript 2015 specification. Let's take an example of Hello string to repeat it 4 times,
```js
"Hello".repeat(4); // 'HelloHelloHelloHello'
```

<br>
 
> ### How do you empty an array
You can empty an array quickly by setting the array length to zero.
```js
let cities = ["Singapore", "Delhi", "London"];
cities.length = 0; // cities becomes []

// or
cities = []
```

<br>
 
> ### Is it possible to add CSS to console messages
Yes, you can apply CSS styles to console messages similar to html text on the web page.


<br>
 
> ### How do you capture browser back button
The window.onbeforeunload method is used to capture browser back button events. This is helpful to warn users about losing the current data.
```js
window.onbeforeunload = function () {
  alert("You work will be lost");
};
```

<br>
 
> ### What are the differences between for...of and for...in statements
Both for...in and for...of statements iterate over js data structures. The only difference is over what they iterate:

* for..in iterates over all enumerable property keys of an object
* for..of iterates over the values of an iterable object.
Let's explain this difference with an example,

```js
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


<br>
 
> ### What are the differences between primitives and non-primitives?
Primitives | 	Non-primitives
-----------  | -----------------
These types are predefined | 	Created by developer
These are immutable | 	Mutable
Compare by value | 	Compare by reference
Stored in Stack | 	Stored in heap
Contain certain value | 	Can contain NULL too


<br>
 

> ### Debouncing vs Throttling
1st one is diff b/w to type value time and second one is the time difference between two function call

* Throttling is a technique where a function is executed at a regular interval, no matter how frequently it is called.
*  Debouncing, on the other hand, is a technique where a function is only executed after a certain amount of time has passed since the last time it was called.

**Debounce**

- Wait until the user stops triggering the event — then run the function once.

Other use cases :-\
👉 Continous button click event function call can be delay.\
👉 Resize of window event function call can be delay.

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, delay);
  };
}


// Example usage
const debouncedFunction = debounce(function() {
  console.log('Debounced function executed!');
}, 500);

debouncedFunction()
debouncedFunction()
debouncedFunction()

// It will console after the 500ms and only one time
```

#### why we have return function in debounce

- If we didn’t return a function, timer would be useless — it would be recreated on every call.
- Returning a function creates a closure, so timer stays in memory:
- Function returned → keeps access to the 'timer' variable → debounce logic works
- We return a function because debounce needs to create a closure to remember the timer across calls and act as a wrapper that schedules the original function execution.

<br>

**Throttle**

- Ensure function runs at most once every X ms, even if triggered constantly.

**Using Date.now()**
```js
function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

**Using setTimeout**
```js
function throttle(func, delay) {
  let isThrottled = false;
  
  return function() {

    if (!isThrottled) {
      func(args);
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

<br>
 
> ### Event Loop
The event loop is a process that continuously monitors both the call stack and the event queue and checks whether or not the call stack is empty.\
If the call stack is empty and there are pending events in the event queue, the event loop dequeues the event from the event queue and pushes it to the call stack. The call stack executes the event, and any additional events generated during the execution are added to the end of the event queue.

```
event loop sequence microtask - https://www.jsv9000.app/
```


<br>
 

> ### http methods
* GET: GET request is used to read/retrieve data from a web server. 
* POST: POST request is used to send data (file, form data, etc.) to the server. On successful creation, it returns an HTTP status code of 201.
* PUT: A PUT request is used to modify the data on the server. It replaces the entire content at a particular location with data that is passed in the body payload.If there are no resources that match the request, it will generate one.
* PATCH: PATCH is similar to PUT request, but the only difference is, it modifies a part of the data. It will only replace the content that you want to update.
* DELETE: A DELETE request is used to delete the data on the server at a specified location.

<br>
 
> ### how to stop all the console log at onec console.log = function (){}

<br>
 
> ### async vs differ  === see this image for answer  
```
https://media.licdn.com/dms/image/v2/C5112AQFW3cKEhP9AkQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520214760879?e=2147483647&v=beta&t=vDdQPieyUHqIdU8HjtKncTHxoPLeLa_KCVF630yzE_I
```


<br>
 
> ### how to call two api when second one depend on first response in js
```js
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

```js
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
```js
axios.get(...)
  .then((response) => {
    return axios.get(...); // using response.data
  })
  .then((response) => {
    console.log('Response', response);
  });
```

<br>
 
> ### Can you name two programming paradigms important for JavaScript app developers?
JavaScript is a multi-paradigm language, supporting imperative/procedural programming along with `OOP (Object-Oriented Programming)` and `functional programming`. JavaScript supports OOP with prototypal inheritance.

<br>
 
> ### Es6(ECMAScript 2015)
let and const, Arrow Functions, Template Literals, rest and spread operator,  Default Parameters in functions, classes

<br>
 
> ### To delete a property in object
```js
const myObject = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

delete myObject.key2;
```

or 

```js
const myObject = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

const { key2, ...newObject } = myObject;
```

<br>
 
> ### Shallow Copy vs Deep copy
* `Shallow copy`: means that only the first level of the object is copied. Deeper levels are referenced.

```js
const obj1 = { name: "John", age: 30 };
const obj2 = { ...obj1 };
console.log(obj2); // { name: "John", age: 30 }
```

* `Deep copy`: means that all levels of the object are copied. This is a true copy of the object.

```js

const obj = { name: 'Version 1', additionalInfo: { version: 1 } };

const deepCopy = JSON.parse(JSON.stringify(obj));

deepCopy.name = 'Version 2';
deepCopy.additionalInfo.version = 2;

console.log(obj); // { name: 'Version 1', additionalInfo: { version: 1 } }
console.log(deepCopy); // { name: 'Version 2', additionalInfo: { version: 2 } }
```

<br>
 
> ### Intersection Observer

An Intersection Observer API provides a way to observe the visibility and position of a DOM element relative to the specified root element or viewport.

💡Note - Intersection Observer API is asynchronous, Performs operations in the Microtask queue.

💡Use Cases :-\
👉 1) Implementation of infinite scrolling. \
👉 2) lazy-loading images on scroll. \
👉 3) Auto-pause video when it’s out of view


<br>
 
> ### Mutation Observer

The MutationObserver API allows you to continuously monitor the changes being made to the DOM tree. \
When the DOM nodes change, you can invoke a callback function to detect the changes.


<br>
 
> ### Normal function vs Arrow function (4 points)

- `Arguments objects` are not available in arrow functions, but are available in regular functions.

<details>

```js
let user = {
  show() {
    console.log(arguments)
  },
}
user.show(1, 2, 3) // => [Arguments] { '0': 1, '1': 2, '2': 3 }
```

```js
let user = {
  show_ar: () => {
    console.log(...arguments)
  },
}

user.show_ar(1, 2, 3)    // arguments is not defined
```
</details>

<br>

- `Can NOT Use new keyword` with arrow function

<details>

Regular functions created using function declarations or expressions are ‘constructible’ and ‘callable’. Since regular functions are constructible, they can be called using the ‘new’ keyword. However, the arrow functions are only ‘callable’ and not constructible. Thus, we will get a run-time error on trying to construct a non-constructible arrow functions using the new keyword.

```js
let x = function() {
  console.log(arguments)
}
new x(1, 2, 3) // => [Arguments] { '0': 1, '1': 2, '2': 3 }
// The above will compile properly

let x = () => {
  console.log(arguments)
}
new x(1, 2, 3) // => TypeError: x is not a constructor
```
</details>

- arrow do not have `"this"` keyword
- `No hoisting` -> arrow can not be called before defined in code. 

<br>
 
> ### IIFE-10-ways

```js
~function () {console.log("Hi I'm IIFE 1")}();
!function () {console.log("Hi I'm IIFE 2")}();
+function () {console.log("Hi I'm IIFE 3")}();
-function () {console.log("Hi I'm IIFE 4")}();
(function () {console.log("Hi I'm IIFE 5")}())
var i = function(){console.log("Hi I'm IIFE 6")}();
true && function(){console.log("Hi I'm IIFE 7")}();
0, function(){console.log("Hi I'm IIFE 8")}();
new function(){console.log("Hi I'm IIFE 9")};
new function(){console.log("Hi I'm IIFE 10")}();
```

<br>

[Back to Top](#table-of-contents)

> ### Rule of this   

💡 7 Things you should know about "this"
- 👉 Rule 1) function with new keyword ( this refers to the function object )
- 👉 Rule 2) call, apply, bind ( this refers to the obj passed to methods )
- 👉 Rule 3) method in object ( this refers to the object )
- 👉 Rule 4) simple function ( this refers to window object, undefined in strict mode )
- 👉 Rule 5) multiple rules ( Higher rule has given priority )
- 👉 Rule 6) arrow function ( inherits "this" from its outer function )
- 👉 Rule 7) IFFE ( inherits "this" of global object )
- 👉 Rule 8) Event listner ( Dom element that the handler is attached )
- 👉 Miscellaneous important things about "this"


<br>
 
**Rule 1)** function with new keyword ( this refers to the function object )

```js
function Person() {
  console.log(this); // Person {}
  this.name = "Jayesh";
  this.age = 24;
  console.log(this); // Person { name: 'Jayesh', age: 24 }
}

new Person();
```

<br>
 
**Rule 2)** call, apply, bind ( this refers to the obj passed to methods)

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

<br>
 
**Rule 3)** method in object ( this refers to the object )

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

- "this" in object gives blank {}
```js
const obj = {
    a: 1,
    b: this,
}
console.log(obj.b)
```

<br>
 
**Rule 4)** simple function ( undefined in strict mode)

```js
function simpleFunc() {
  console.log(this); // window object
}

simpleFunc(); // or window.simpleFunc()
```

<br>
 
**Rule 5)** multiple rules :- Higher rule has more priority

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

<br>
 
**Rule 6)** arrow function :- arrow function does not create its own execution context, inherits "this" from its outer function.

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

<br>

**Rule 7)** IFFE ( inherits "this" of `global object` in `function declaration` and `lexical scope` in `arrow function`)

In an Immediately Invoked Function Expression (IIFE), the `this` keyword behaves differently depending on how the IIFE is invoked and the execution context. Here's a breakdown:

1. **Global Context (Non-strict mode & Strict mode)**
   - Example:
     ```javascript
     (function() {
       console.log(this); // In a browser, this will log the global window object
     })();

     (function() {
       'use strict';
       console.log(this); // Logs: undefined
     })();
     ```

2. **function in Object Context**
   - Regular Function IIFE:
     ```javascript
      const obj1 = {
          value: 42,
          method: function () {
              (function () {
                  console.log("Regular IIFE:", this);  // this refers to the global object
              })();
          }
      };
      obj1.method();
     ```   
   - Arrow Function IIFE:
     ```javascript
      const obj2 = {
          value: 42,
          method: function () {
              (() => {
                  console.log("Arrow IIFE:", this);  // this refers to the object
              })();
          }
      };

      obj2.method();
     ```

3. **Explicit Binding with `call`, `apply`, or `bind`**
   - You can explicitly set the value of `this` using `call`, `apply`, or `bind`.
   - Example:
     ```javascript
     (function() {
       console.log(this); // Logs: { custom: 'context' }
     }).call({ custom: 'context' });
     ```

<br>
 
**Miscellaneous important things about "this"**


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

- "this" in arguments

```js
var length = 4;

function callback() {
    console.log(this.length);
}

const object = {
    length: 5,
    method: function() {
        arguments[0]();  // Call the first argument, which is `callback`
    },
};

object.method(callback, 2, 3);

// 👍A) 2     💡B) 3
// 💖C) 4     😀D) 5
```

When `callback` is invoked via `arguments[0]()`, `this` is set to the `arguments object`, not the object or the global scope


<br>

### This context in setTimeout

```js
let obj_1 = {
    name: "asim",
    sayLater: function () {
        setTimeout(function () {
            console.log(this)
            console.log(`${this.name}`);
        }, 500);
    }
};

obj_1.sayLater();

/* OUTPUT

Timeout {
  _called: true,
  _idleTimeout: 500,
  _idlePrev: null,
  _idleNext: null,
  _idleStart: 60,
  _onTimeout: [Function],
  _timerArgs: undefined,
  _repeat: null,
  _destroyed: false,
  [Symbol(asyncId)]: 6,
  [Symbol(triggerAsyncId)]: 1 }
undefined
*/
```

### Explanation:

1. **Context of `this`:**  
   The issue lies in how `this` works in JavaScript. In the `sayLater` method, `setTimeout` runs its callback function in the global execution context (or `window` in browsers, `undefined` in strict mode). Therefore, inside the `setTimeout` callback, `this` does not refer to the `obj_1` object but to the global object (or `undefined` in strict mode).

2. **`this.name`:**  
   Since `this` inside the `setTimeout` callback does not point to `obj_1`, `this.name` will be `undefined`.

---

### Modifications to fix the issue:

To ensure that `this` inside the `setTimeout` callback still refers to `obj_1`, you can use one of the following methods:

#### 1. **Bind `this` to the callback:**
```javascript
let obj_1 = {
    name: "asim",
    sayLater: function () {
        setTimeout(function () {
            console.log(this);
            console.log(`${this.name}`);
        }.bind(this), 500); // Bind `this` to the callback
    }
};

obj_1.sayLater();
```

#### 2. **Use an arrow function:**
Arrow functions do not have their own `this` but inherit `this` from their surrounding lexical scope.
```javascript
let obj_1 = {
    name: "asim",
    sayLater: function () {
        setTimeout(() => {
            console.log(this);
            console.log(`${this.name}`);
        }, 500);
    }
};

obj_1.sayLater();
```

#### 3. **Store `this` in a variable:**
```javascript
let obj_1 = {
    name: "asim",
    sayLater: function () {
        let self = this; // Store reference to `this`
        setTimeout(function () {
            console.log(self);
            console.log(`${self.name}`);
        }, 500);
    }
};

obj_1.sayLater();
```

---

### Output with modifications:

For all the above modifications, the output will be:
```
{ name: 'asim', sayLater: [Function: sayLater] }
asim
```

<br>
 
> ### LRU Cache implementation

### LRU Cache: Overview

**Least Recently Used (LRU) Cache** is a cache eviction algorithm that discards the least recently used items first. This is particularly useful when you have limited space, and you need to ensure that the most recently accessed items remain available.

### Real-life Example

Imagine you have a small desk with limited space for books. You can only keep 5 books on your desk at any given time. You frequently refer to these books for your work. However, you have a large library of books on your bookshelf. When you bring a new book to your desk and there isn't enough space, you need to decide which book to remove. Using an LRU policy, you would remove the book that you haven't referred to in the longest time.

### Code in JavaScript

Here's an implementation of an LRU Cache in JavaScript:

<details>

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    // Move the accessed item to the end of the Map to mark it as recently used
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Remove the old value
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove the least recently used (first) item
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    // Insert the new item
    this.cache.set(key, value);
  }
}

// Usage example
const lruCache = new LRUCache(3);
lruCache.put(1, 'A');
lruCache.put(2, 'B');
lruCache.put(3, 'C');

console.log(lruCache.get(1)); // Outputs: A
lruCache.put(4, 'D'); // This will remove key 2 as it's the least recently used
console.log(lruCache.get(2)); // Outputs: -1 (not found)
console.log(lruCache.get(3)); // Outputs: C
lruCache.put(5, 'E'); // This will remove key 1 as it's the least recently used
console.log(lruCache.get(1)); // Outputs: -1 (not found)
console.log(lruCache.get(4)); // Outputs: D
console.log(lruCache.get(5)); // Outputs: E
```

</details>

### Explanation

1. **Constructor**: Initializes the cache with a specified capacity and a Map to store the items.
2. **get(key)**: Retrieves the value for the given key. If the key exists, it moves the key to the end to mark it as recently used.
3. **put(key, value)**: Adds a new item to the cache. If the cache is at capacity, it removes the least recently used item before adding the new one. If the key already exists, it updates the value and marks it as recently used.


**Real Life example is below**
Certainly! Let's consider a real-life scenario where an LRU Cache could be beneficial: a small e-commerce website that wants to optimize its product page loading times. We'll use the LRU Cache to store recently viewed product details.

Here's how we might implement this:

<details>

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}

class ProductService {
  constructor() {
    this.cache = new LRUCache(100); // Cache last 100 viewed products
    this.db = new Map(); // Simulating a database
  }

  async fetchProductDetails(productId) {
    // Check if product is in cache
    const cachedProduct = this.cache.get(productId);
    if (cachedProduct) {
      console.log(`Product ${productId} found in cache`);
      return cachedProduct;
    }

    // If not in cache, fetch from "database"
    console.log(`Product ${productId} not in cache, fetching from DB`);
    const product = await this.fetchFromDatabase(productId);
    
    // Add to cache
    this.cache.put(productId, product);
    
    return product;
  }

  async fetchFromDatabase(productId) {
    // Simulate database fetch with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.db.get(productId) || { id: productId, name: `Product ${productId}`, price: Math.random() * 100 };
  }
}

// Usage example
async function main() {
  const productService = new ProductService();

  // Simulate user viewing products
  for (let i = 1; i <= 5; i++) {
    await productService.fetchProductDetails(i);
  }

  // User views product 2 again
  await productService.fetchProductDetails(2);

  // User views a new product
  await productService.fetchProductDetails(6);

  // User views product 1 again
  await productService.fetchProductDetails(1);
}

main();
```

</details>

In this example:

1. We have a `ProductService` class that uses an LRU Cache to store recently viewed product details.

2. The `fetchProductDetails` method first checks the cache for the product. If found, it returns the cached data immediately.

3. If the product is not in the cache, it fetches the data from the "database" (simulated with a Map and a delay for realism).

4. After fetching from the database, it stores the product in the cache for future quick access.

5. In the `main` function, we simulate a user viewing different products:
   - First, they view products 1 through 5.
   - Then they view product 2 again (which should be in the cache).
   - Next, they view a new product (6).
   - Finally, they view product 1 again (which should still be in the cache).

This setup provides several benefits:

- Frequently viewed products load faster because they're cached in memory.
- The cache has a fixed size (100 in this example), preventing unbounded memory growth.
- Least recently viewed products are automatically evicted when the cache is full, ensuring the most relevant products stay in the cache.

In a real e-commerce site, this could significantly improve the user experience by reducing load times for popular or recently viewed products, while keeping the memory usage of the server in check.

<br>
 
> ### Math function in js
Math.ceil(x) Returns x rounded up next integer
```js
console.log(Math.ceil(4.9)) //5
console.log(Math.ceil(4.5))  //5
console.log(Math.ceil(4.1))  //5
console.log(Math.ceil(-4.1))  //-4
```

Math.floor(x) returns the value of x rounded down to its nearest integer
```js
console.log(Math.floor(4.9))    //4
console.log(Math.floor(4.5))    //4
console.log(Math.floor(4.1))    //4
console.log(Math.floor(-4.1))   //-5
```

Math.round(x)	Returns x rounded to its nearest integer
```js
console.log(Math.round(4.9))    //5
console.log(Math.round(4.5))    //5
console.log(Math.round(4.1))    //4
console.log(Math.round(-4.1))   //-4
```

Math.trunc(x) returns the integer part of x

```js
console.log(Math.trunc(4.9))    //4
console.log(Math.trunc(4.5))    //4
console.log(Math.trunc(4.1))    //4
console.log(Math.trunc(-4.1))   //-4
```

```js
Math.sqrt()
Math.sqrt(64);

Math.pow()
Math.pow(8, 2);
```

Math.abs(x) returns the absolute (positive) value of x:
```js
Math.abs(-4.7); //4.7
```
```js
Math.min(0, 150, 30, 20, -8, -200); //-200
console.log(Math.max(0, 150, 30, 20, -8, -200)) //150
```

<br>
 
> ### How to invoke an IIFE without any extra brackets?
```js
!function() {
    // Your code here
}();
```

<br>
 
> ### What is the difference between setTimeout, setImmediate and process.nextTick?

<br>
 
> ### What is an empty statement and purpose of it
In JavaScript, an empty statement is a statement that consists solely of a semicolon (;) and nothing else. It serves as a no-operation (no-op) or a placeholder where a statement is syntactically required but no action needs to be performed.

Here's an example of an empty statement:

```javascript
;
```

<br>
 
> ### what is a comma operator

In JavaScript, the comma operator (`,`) is used to evaluate multiple expressions sequentially and return the value of the last expression. It allows you to combine multiple expressions into a single statement.

Here's an example demonstrating the use of the comma operator:

```javascript
var a = 1, b = 2, c = 3;

var result = (a++, b++, c++);

console.log(result); // Output: 3
console.log(a, b, c); // Output: 2 3 4
```

In this example:

- `a++`, `b++`, and `c++` are three expressions separated by commas.
- The comma operator evaluates each expression in sequence but only returns the value of the last expression, which is `c++` in this case.
- After the comma operator is evaluated, `a`, `b`, and `c` are incremented by 1, so their values become 2, 3, and 4 respectively.
- The variable `result` holds the value of the last expression evaluated by the comma operator, which is `c++`, resulting in `3`.

<br>
 
> ### What is the different between '^1.2.3' and '~1.2.3' in package.json

**Caret (^) Range**: allows updates to the package up to the next major version.

^1.2.3 specifies a minimum version of 1.2.3 and allows any version up to, but not including, 2.0.0.

**Tilde (~) Range**: allows updates to the package up to the next minor version, but not the next major version.

~1.2.3 specifies a minimum version of 1.2.3 and allows any version up to, but not including, 1.3.0


<br>
 
> ### What is the difference between Function constructor and function declaration

1. **Function Constructor**:
   - The `Function` constructor is a built-in JavaScript constructor function used to create new function objects dynamically.
   - Example:
     ```javascript
     var add = new Function('a', 'b', 'return a + b;');
     ```

2. **Function Declaration**:
   - Function declarations define named functions using the `function` keyword followed by the function name, parameters (if any), and function body enclosed in curly braces.
   - Example:
     ```javascript
     function add(a, b) {
         return a + b;
     }
     ```

Key differences:

- **Hoisting**: Function declarations are hoisted, while function expressions are not hoisted.
- **Syntax**: Function declarations have a specific syntax using the `function` keyword and are defined in a more traditional way, while the Function constructor uses a string representation of the function body and arguments.
- **Performance**: Function declarations are generally more efficient in terms of performance because they are parsed and compiled during the initial compilation phase, whereas the Function constructor is evaluated at runtime, which may result in slower performance.
- **Clarity and Readability**: Function declarations are often preferred for their clarity and readability, as they provide a more straightforward way to define functions within the code.

In most cases, function declarations are preferred due to their simplicity, clarity, and performance benefits. However, the Function constructor can be useful in certain advanced scenarios where dynamic function creation is necessary.

<br>

> ### How to detect if a function is called as constructor

In JavaScript, you can detect if a function is called as a constructor by checking the value of the `this` keyword within the function. When a function is called as a constructor (i.e., using the `new` keyword), the `this` keyword refers to the newly created instance of the object.

Here's how you can detect if a function is called as a constructor:

```javascript
function MyClass() {
    // Check if the function is called as a constructor
    if (!(this instanceof MyClass)) {
        throw new Error('MyClass must be called with new keyword');
    }

    // Constructor logic here
}

// Usage
var obj1 = new MyClass(); // This is called as a constructor
var obj2 = MyClass();     // This will throw an error
```

<br>

### Needs discussion

Can I add getters and setters using defineProperty method\
What is an object initializer\
What are the DOM methods available for constraint validation\
What are the available constraint validation DOM properties\
What are the list of validity properties\
Give an example usage of rangeOverflow property\
How do you get property descriptors of an object\
What are the attributes provided by a property descriptor\
How to cancel a fetch request\
What is minimum timeout throttling\


<br>
 
> ### Strict Mode
- It's used to catch common coding mistakes and "unsafe" actions.
- Please make sure that "use strict" is at the top of your scripts, otherwise strict mode may not be enabled.
- There’s `no way to cancel use strict`
- There is `no directive like"no use strict"` that reverts the engine to old behavior.

<br>
 
> ### variables
**What’s interesting**
the dollar sign '$' and the underscore '_' can also be used in names. They are regular symbols, just like letters, without any special meaning.\


These names are valid:
```js
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
```

```js
let my-name; // hyphens '-' aren't allowed in the name
```

Non-Latin letters are allowed, but not recommended
It is possible to use any language, including cyrillic letters, Chinese logograms and so on, like this:
```js
let имя = '...';
let 我 = '...';
```

<br>

url: https://javascript.info/cross-window-communication

**above is for iframe or cross-window communication**

<br>

> ### Iframe
An `<iframe>` tag hosts a separate embedded window, with its own separate document and window objects.\
We can access them using properties:\
iframe.contentWindow to get the window inside the `<iframe>`.\
iframe.contentDocument to get the document inside the `<iframe>`, shorthand for iframe.contentWindow.document.



<br>
 
must read attack - 
- The clickjacking attack - https://javascript.info/clickjacking  
- also see https://www.geeksforgeeks.org/http-headers-set-cookie/,
- https://http.dev/set-cookie


No idea - 
- https://javascript.info/arraybuffer-binary-arrays
- https://javascript.info/text-decoder

Axios upload progress with progress bar tutorial --- https://www.youtube.com/watch?v=nC3ntJUQrAM
