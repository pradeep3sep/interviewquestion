### Question 1
```js
const numbers = [10,20,30,40,50,60]
const [,,,...newNumbers] = numbers
console.log(newNumbers);
```
<details>
  <summary>Answer</summary>
  <p>[40,50,60]</p>
</details>


### Question 2
```js
const details = {
    name : "Pradeep",
    age : 25,
    name : "Himanshu"
}
console.log(details);
```
<details>
  <summary>Answer</summary>
  <p>
    age: "25",<br>
    name: "Himanshu"
  </p>
</details>
 

### Question 3
```js
const name = "testify"
console.log(!typeof name === "object");
console.log(!typeof name === "string");
console.log(!typeof name); //this is for hint
```
<details>
  <summary>Answer</summary>
  <p>false,false</p>
</details>


### Question 4
```js
let a = 1
c= 2;
console.log(--c === a);
```
<details>
  <summary>Answer</summary>
  <p>true</p>
</details>


### Question 5
```js
let check = [1,2,3,4]
let hi = [,...check]
console.log(hi);
```
<details>
  <summary>Answer</summary>
  <p>[empty, 1, 2, 3, 4]</p>
</details>

### Question 6
```js
var x;
x = 10;
function test(){
    var x;
    if(x>29){
        x=50
    }
    console.log(x);
}
test();
```
<details>
  <summary>Answer</summary>
  <p>undefined</p>
</details>


### Question 7
```js
const number = 2
const result  = (function () {
    delete number;
    return number
})();
console.log(result);
```
<details>
  <summary>Answer</summary>
  <p>2</p>
</details>


### Question 8
```js
const number = 2
const result  = (function (number) {
    delete number;
    return number
})(20);
console.log(result);
```
<details>
  <summary>Answer</summary>
  <p>20</p>
</details>


### Question 9
```js
function sum(num1, num2 = num1){
    console.log(num1 + num2);
}
sum(10)
```
<details>
  <summary>Answer</summary>
  <p>20</p>
</details>


### Question 10
```js
function sum(num1, num2 = num1){
    console.log(num1 + num2);
}
sum(10,89)
```
<details>
  <summary>Answer</summary>
  <p>99</p>
</details>


### Question 11
```js
var a = "hello"
var sum = 0
for (let i = 0; i < a.length; i++) {
    sum += (a[i] - "a");
}
console.log(sum);
```
<details>
  <summary>Answer</summary>
  <p>NaN</p>
</details>


### Question 12
```js
let a = 0
for(a; a<5; a++);
console.log(a);
```
<details>
  <summary>Answer</summary>
  <p>5</p>
</details>


### Question 13(revise the concept of shallow and deep copy)
```js
let person = {
    name : "Lynda"
}
const members = [person]
person = null
console.log(members);
```
<details>
  <summary>Answer</summary>
  <p>[{name : "Lynda"}]</p>
</details>


### Question 14
```js
const a = {}
const b = {
    key : "b"
}
const c = {
    key : "c"
}
a[b] = 123;
a[c] = 456;
console.log(a[b]);
```
- A: 123
- B: 456
- C: undefined
- D: ReferenceError

<details>
  <summary>Answer</summary>
  <p>solution is 456</p>

Object keys are automatically converted into strings because object can store onlyy string and symbol. We are trying to set an object as a key to object `a`, with the value of `123`.

However, when we stringify an object, it becomes `"[object Object]"`. So what we are saying here, is that `a["[object Object]"] = 123`. Then, we can try to do the same again. `c` is another object that we are implicitly stringifying. So then, `a["[object Object]"] = 456`.

Then, we log `a[b]`, which is actually `a["[object Object]"]`. We just set that to `456`, so it returns `456`.
</details>

### Question 15
```js
(()=> {
    let x = (y = 10)
})()
console.log(typeof x);
console.log(typeof y);
```
<details>
  <summary>Answer</summary>
  <p>undefined, number</p>
</details>


### Question 16
```js
(function(a){
    return (function(){
        console.log(a);
        a = 23
    })()
})(45);
```
<details>
  <summary>Answer</summary>
  <p>45</p>
</details>

### Question 17
```js
const person = {
    name : "pradeep",
    age : 45
}
let city = person.city
city = "delhi"
console.log(person);
```
<details>
  <summary>Answer</summary>
  <p>{name: 'pradeep', age: 45}</p>
</details>

### Question 18
```js
var count = 1;
var func1 = function (){
    console.log(count)
}
var func2 = function(){
    var count = 2
    func1()
}
func2()
```
<details>
  <summary>Answer</summary>
  <p>1</p>


 In JavaScript, variable scoping and closures can sometimes be tricky to understand. The reason the output is `1` instead of `2` involves understanding how JavaScript's lexical scoping and execution context work.

Here's a step-by-step explanation:

1. **Global Execution Context**: 
   - When the script starts, the global execution context is created. In this context, the `count` variable is defined and initialized to `1`.
   - The `func1` and `func2` functions are also defined in this global context.

2. **Execution of `func2`**:
   - When `func2` is called, a new execution context is created for `func2`.
   - Within this new execution context, a local variable `count` is declared and initialized to `2`.

3. **Calling `func1` from `func2`**:
   - When `func1` is called from within `func2`, a new execution context is created for `func1`.
   - `func1` does not have a local `count` variable, so it looks for `count` in its outer (lexical) environment, which is the global context where `func1` was originally defined.

4. **Lexical Environment**:
   - In JavaScript, functions carry along with them the scope in which they were defined, not the scope from which they were called.
   - Since `func1` was defined in the global scope, it will look for the `count` variable in the global context, not in the local scope of `func2`.

Therefore, when `func1` executes `console.log(count)`, it finds the `count` variable in the global scope, which has the value `1`, not the local `count` variable inside `func2`.

Here is the relevant part of the code with comments:

```javascript
var count = 1; // Global variable

var func1 = function () {
    console.log(count); // Looks for 'count' in its lexical scope, i.e., the global scope
};

var func2 = function () {
    var count = 2; // Local variable in func2's scope
    func1(); // Calls func1, which uses the global scope
};

func2(); // Executes func2
```

So, the output is `1` because `func1` uses the `count` from its lexical environment (global scope) where `count` is `1`.
</details>

### Question 19
```js
let users  = {
    name : "outside",
    hasArrowfunc : function(){
        const name = "Inside";
        (()=>{
            console.log(this.name);
            return this.name
        })()
    }

}
console.log(users.hasArrowfunc());
```
<details>
  <summary>Answer</summary>
  <p>outside, undefined</p>
</details>

### Question 20
```js
bar();
(function abc(){
    console.log("something")
})();
function bar(){
    console.log("bar got called")
}
```
<details>
  <summary>Answer</summary>
  <p>bar got called <br>
     something
  </p>
</details>

### Question 21 sorting of the array
```js
let daya = [1,12,3,11,10]
daya.sort((a,b)=> {
    return a-b
});
console.log(daya);
```
<details>
  <summary>Answer</summary>
  <p>[1, 3, 10, 11, 12]</p>
</details>

### Question 21 sorting of the object
```js
const items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
];
```
sort by value
```js
items.sort((a, b) => a.value - b.value)
console.log(items);
```

sort by name
```js
items.sort(function(a, b){
    if(a.firstname < b.firstname) { return -1; }
    if(a.firstname > b.firstname) { return 1; }
    return 0;
})
console.log(items);
```

### Question 22 converting the number into textnumber
```js
let number = 9966
let data = number.toLocaleString()
```
<details>
  <summary>Answer</summary>
  <p>'9,966'</p>
</details>


### Question 23
```js
function check(num1){
    return (num2)=>{
      return (num3)=> {
        return num1 * num2 * num3
      }
    }
  }
console.log(check(4)(2)(3));
```
<details>
  <summary>Answer</summary>
  <p>24</p>
</details>

### Question 24
```js
let array = [2,3,[5,2,[6,[3, [4, 5, [5, 1, 3]]]],1,1],9];
//flat without using flat
console.log(array.toString().split(','));
```
<details>
  <summary>Answer</summary>
  <p> ['2', '3', '5', '2', '6', '3', '4', '5', '5', '1', '3', '1', '1', '9']</p>
</details>

### Question 25
```js
const firstname = fun()
let name = 'ram'
function fun(){
  return `my is ${name} malviya`
}
console.log(firstname);
```
<details>
  <summary>Answer</summary>
  <p>
	  ReferenceError: name is not defined
  </p>
</details>

### Question 26 , output of below code
```js
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
  
}
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  },  1000);
  
}
```
<details>
  <summary>Answer</summary>
  <p></p>
</details>

### Question 27
```js
var num = 4;
function outer(){
  var num = 2;
  function inner(){
    num++
    var num = 3;
    console.log("num",num);
  }
  inner()
}
outer()
```
<details>
  <summary>Answer</summary>
  <p>3</p>
</details>


### Question 28
```js
const obj = {
  prop1: function () {
    return 0;
  },
  prop2() {
    return 1;
  },
  ["prop" + 3]() {
    return 2;
  },
};

console.log(obj.prop1());
console.log(obj.prop2());
console.log(obj.prop3());
```

<details>
  <summary>Answer</summary>
  <p>0 <br> 1 <br> 2</p>
</details>

### Question 29
```js
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```

<details>
  <summary>Answer</summary>
  <p>true,false</p>
</details>

### Question 30
```js
function printNumbers(first, second, first) {
  console.log(first, second, first);
}
printNumbers(1, 2, 3);
```
<details>
  <summary>Answer</summary>
  <p>3, 2, 3</p>
</details>

### Question 31
```js
console.log(Math.max());
```
<details>
  <summary>Answer</summary>
  <p>-Infinity</p>
</details>

### Question 32
```js
console.log(10 == [10]);
console.log(10 == [[[[[[[10]]]]]]]);
```

1: True, True\
2: True, False\
3: False, False\
4: False, True

<details>
  <summary>Answer</summary>
  <p>Answer: 1</p>

 As per the comparison algorithm in the ECMAScript specification(ECMA-262), the above expression converted into JS as below

10 === Number([10].valueOf().toString()); // 10\
So it doesn't matter about number brackets([]) around the number, it is always converted to a number in the expression.
</details>


### Question 33
```js
console.log([0] == false);
if ([0]) {
  console.log("I'm True");
} else {
  console.log("I'm False");
}
```
<details>
  <summary>Answer</summary>
  <p>true, I'm True</p>

 In comparison operators, the expression [0] converted to Number([0].valueOf().toString()) which is resolved to false. Whereas [0] just becomes a truthy value without any conversion because there is no comparison operator.
</details>


### Question 34
```js
console.log([1, 2] + [3, 4]);
```
<details>
  <summary>Answer</summary>
  <p>1,23,4</p>
</details>

### Question 35
```js
let numbers = [1, 2, 3, 4, NaN];
console.log(numbers.indexOf(NaN));
```
<details>
  <summary>Answer</summary>
  <p>-1</p>
</details>

### Question 36
```js
async function func() {
  return 10;
}
console.log(func());
```

1: Promise {<fulfilled>: 10} \
2: 10 \
3: SyntaxError \
4: Promise {<rejected>: 10}

<details>
  <summary>Answer</summary>
  <p>Answer: 1 </p>

 
Async functions always return a promise. But even if the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise. The above async function is equivalent to below expression,

```
function func() {
  return Promise.resolve(10);
}
```

</details>


### Question 37
```js
async function func() {
  await 10;
}
console.log(func());
```

1: Promise {<fulfilled>: 10} \
2: 10 \
3: SyntaxError \
4: Promise {<resolved>: undefined}

<details>
  <summary>Answer</summary>
  <p>Answer: 4 </p>

The await expression returns value 10 with promise resolution and the code after each await expression can be treated as existing in a .then callback. In this case, there is no return expression at the end of the function. Hence, the default return value of undefined is returned as the resolution of the promise. The above async function is equivalent to below expression,
```js
function func() {
  return Promise.resolve(10).then(() => undefined);
}
```
</details>


### Question 38
```js
let message = 'Hello World!';
message[0] = 'J'
console.log(message)

let name = 'John';
name = name + ' Smith';
console.log(name);
```

1: Jello World!, John Smith \
2: Jello World!, John \
3: Hello World!, John Smith \
4: Hello World!, John 

<details>
  <summary>Answer</summary>
  <p>Answer: 3 </p>

 In JavaScript, primitives are immutable i.e. there is no way to change a primitive value once it gets created. So when you try to update the string's first character, there is no change in the string value and prints the same initial value Hello World!. Whereas in the later example, the concatenated value is re-assigned to the same variable which will result into creation of new memory block with the reference pointing to John Smith value and the old memory block value(John) will be garbage collected.
</details>

### Question 39
```js
var a = [1,2,3]
var b = [1,2,3]
var c = '1,2,3'

console.log(a == c) 
console.log(b == c)  
console.log(a == b) 
```

<details>
  <summary>Answer</summary>
  <p>true, true, false</p>

 arrays are coerced to strings by simply joining all the values with comma(,) in between
</details>

### Question 40
```js
'a' < 'b' // gives true because a and b both are string so are converted to number 1 and 2 respectively by coercion of js
'a' > 'b'  // gives false because a and b both are string so are converted to number 1 and 2 respectively by coercion of js
42 < 'hh'  // gives false
42 > 'hh'  // gives false because the both are different data type so 'hh' are coerced to NaN and the comparison becomes 42 > NaN
```

### Question 41
```js
+true;
!'Lydia';
```
<details>
  <summary>Answer</summary>
  <p>1 <br> false</p>
</details>

### Question 42
```js
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));
```
- A: orange
- B: purple
- C: green
- D: TypeError

<details>
  <summary>Answer</summary>
  <p>TypeError</p>

  The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class Chameleon, the function cannot be called upon it. A `TypeError` is thrown.

</details>

### Question 43
```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```

- A: `Person {firstName: "Lydia", lastName: "Hallie"}` and `undefined`
- B: `Person {firstName: "Lydia", lastName: "Hallie"}` and `Person {firstName: "Sarah", lastName: "Smith"}`
- C: `Person {firstName: "Lydia", lastName: "Hallie"}` and `{}`
- D: `Person {firstName: "Lydia", lastName: "Hallie"}` and `ReferenceError`


<details>
  <summary>Answer</summary>
  <p>A</p>

  For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the `global object!`

We said that `this.firstName` equals `"Sarah"` and `this.lastName` equals `"Smith"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function.

</details>


### Question 44
```js
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

- A: "Lydia" 21 ["", " is ", " years old"]
- B: ["", " is ", " years old"] "Lydia" 21
- C: "Lydia" ["", " is ", " years old"] 21

<details>
  <summary>Answer</summary>
  <p>Answer: B</p>
  <p>If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!</p>
</details>

### Question 45
```js
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);
```

- A: false true false true
- B: false true true true
- C: true true false true
- D: true true true true

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>

  All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why `obj.hasOwnProperty('1')` also returns true.

It doesn't work that way for a set. There is no `'1'` in our set: `set.has('1')` returns `false`. It has the numeric type `1`, `set.has(1)` returns `true`.
</details>


### Question 46
```js
function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi());
```

- A: "object"
- B: "number"
- C: "function"
- D: "undefined"

<details>
  <summary>Answer</summary>
  <p>Answer: B</p>

  The `sayHi` function returns the returned value of the immediately invoked function expression (IIFE). This function returned `0`, which is type `"number"`.
</details>

### Question 47

```js
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

- A: "one"
- B: "two"
- C: "two" "one"
- D: "one" "two"

<details>
  <summary>Answer</summary>
  <p>Answer: B</p>

  When we pass multiple promises to the `Promise.race` method, it resolves/rejects the first promise that resolves/rejects. To the `setTimeout` method, we pass a timer: 500ms for the first promise (`firstPromise`), and 100ms for the second promise (`secondPromise`). This means that the `secondPromise` resolves first with the value of `'two'`. `res` now holds the value of `'two'`, which gets logged.
</details>

### Question 48
```js
function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);

console.log(person, birthYear);
```

- A: { name: "Lydia" }, "1997"
- B: { name: "Sarah" }, "1998"
- C: { name: "Lydia" }, "1998"
- D: { name: "Sarah" }, "1997"

<details>
  <summary>Answer</summary>
  <p>Answer: A</p>

  Arguments are passed by value, unless their value is an object, then they're passed by reference. `birthYear` is passed by value, since it's a string, not an object. When we pass arguments by value, a copy of that value is created (see question 46).

The variable `birthYear` has a reference to the value `"1997"`. The argument `year` also has a reference to the value `"1997"`, but it's not the same value as `birthYear` has a reference to. When we update the value of `year` by setting `year` equal to `"1998"`, we are only updating the value of `year`. `birthYear` is still equal to `"1997"`.

The value of `person` is an object. The argument `member` has a (copied) reference to the same object. When we modify a property of the object `member` has a reference to, the value of `person` will also be modified, since they both have a reference to the same object. `person's` `name` property is now equal to the value `"Lydia"`
</details>

### Question 49

```js
function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);
```

- A: "Lamborghini"
- B: "Maserati"
- C: ReferenceError
- D: TypeError

<details>
  <summary>Answer</summary>
  <p>Answer: B</p>

  When you return a property, the value of the property is equal to the returned value, not the value set in the constructor function. We return the string `"Maserati"`, so `myCar.make` is equal to `"Maserati"`.
</details>


### Question 50
```js
// counter.js
let counter = 10;
export default counter;
```

```js
// index.js
import myCounter from './counter';

myCounter += 1;

console.log(myCounter);
```


- A: 10
- B: 11
- C: Error
- D: NaN

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>

  An imported module is read-only: you cannot modify the imported module. Only the module that exports them can change its value.

When we try to increment the value of `myCounter`, it throws an error: `myCounter` is read-only and cannot be modified.

</details>

### Question 51
```js
const name = 'Lydia';
age = 21;
var last = 'verma'
console.log(delete name);
console.log(delete age);
console.log(delete last);
```

- A: false, true, false
- B: "Lydia", 21
- C: true, true
- D: undefined, undefined


<details>
  <summary>Answer</summary>
  <p>Answer: A</p>

  The `delete` operator returns a boolean value: `true` on a successful deletion, else it'll return `false`. However, variables declared with the `var, const or let` keyword cannot be deleted using the `delete` operator.

The `name` variable was declared with a `const` keyword, so its deletion is not successful: `false` is returned. When we set `age` equal to `21`, we actually added a property called `age` to the global object. You can successfully delete properties from objects this way, also the global object, so `delete age` returns `true`.

</details>


### Question 52

```js
const person = { name: 'Lydia' };

Object.defineProperty(person, 'age', { value: 21 });

console.log(person);
console.log(Object.keys(person));
```


- A: { name: "Lydia", age: 21 }, ["name", "age"]
- B: { name: "Lydia", age: 21 }, ["name"]
- C: { name: "Lydia"}, ["name", "age"]
- D: { name: "Lydia"}, ["age"]

<details>
  <summary>Answer</summary>
  <p>Answer: B</p>

With the `defineProperty` method, we can add new properties to an object, or modify existing ones. When we add a property to an object using the `defineProperty` method, they are by `default not enumerable` means not iterable. The `Object.keys` method returns all enumerable property names from an object, in this case only `"name"`.

Properties added using the `defineProperty` method are immutable by default. You can override this behavior using the `writable`, `configurable` and `enumerable` properties. This way, the `defineProperty` method gives you a lot more control over the properties you're adding to an object.
</details>


### Question 53

```js
const settings = {
  username: 'lydiahallie',
  level: 19,
  health: 90,
};

const data = JSON.stringify(settings, ['level', 'health']);
console.log(data);
```

- A: `"{"level":19, "health":90}"`
- B: `"{"username": "lydiahallie"}"`
- C: `"["level", "health"]"`
- D: `"{"username": "lydiahallie", "level":19, "health":90}"`

<details>
  <summary>Answer</summary>
  <p>Answer: A</p>

The second argument of `JSON.stringify` is the replacer. The replacer can either be a function or an array, and lets you control what and how the values should be stringified.

If the replacer is an array, only the property names included in the array will be added to the JSON string. In this case, only the properties with the names `"level"` and `"health"` are included, `"username"` is excluded. `data` is now equal to `"{"level":19, "health":90}"`.

If the replacer is a function, this function gets called on every property in the object you're stringifying. The value returned from this function will be the value of the property when it's added to the JSON string. If the value is `undefined`, this property is excluded from the JSON string.

</details>



### Question 54

```js
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

- A: 10, 10
- B: 10, 11
- C: 11, 11
- D: 11, 12

<details>
  <summary>Answer</summary>
  <p>Answer: A</p>

  The unary operator `++` first returns the value of the operand, then increments the value of the operand. The value of `num1` is `10`, since the `increaseNumber` function first returns the value of `num`, which is `10`, and only increments the value of `num` afterwards.

`num2` is `10`, since we passed `num1` to the `increasePassedNumber`. `number` is equal to `10`(the value of `num1`. Again, the unary operator `++` first returns the value of the operand, then increments the value of the operand. The value of `number` is `10`, so `num2` is equal to `10`.

</details>


### Question 55
```js
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);
```

- A: 20, 40, 80, 160
- B: 20, 40, 20, 40
- C: 20, 20, 20, 40
- D: NaN, NaN, 20, 40

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>
  
The default argument is evaluated at call time! Every time we call the function, a new object is created. We invoke the multiply function the first two times without passing a value: x has the default value of { number: 10 }. We then log the multiplied value of that number, which is 20.

The `third time` we invoke multiply, we do pass an argument: the object called value. The `*=` operator is actually shorthand for `x.number = x.number * 2`: we modify the value of x.number, and log the multiplied value 20.

`passed value is object and object have refrence type which means when x is modifed in 3rd time then value also gets modified and become 20

The fourth time, we pass the value object again. x.number was previously modified to 20, so x.number *= 2 logs 40. also the value.number becomes 40`

</details>


### Question 56

```js
async function getData() {
  return await Promise.resolve('I made it!');
}

const data = getData();
console.log(data);
```

- A: "I made it!"
- B: Promise {<resolved>: "I made it!"}
- C: Promise {<pending>}
- D: undefined

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>

An async function always returns a promise. The `await` still has to wait for the promise to resolve: a pending promise gets returned when we call `getData()` in order to set `data` equal to it.

simply run below code you will get clear idea

```
function getData() {
  return  Promise.resolve('I made it!');
}

const data = getData();
console.log(data);
```

</details>

### Question 57

```js
const add = () => {
  const cache = {};
  return num => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
```

- A: Calculated! 20 Calculated! 20 Calculated! 20
- B: Calculated! 20 From cache! 20 Calculated! 20
- C: Calculated! 20 From cache! 20 From cache! 20
- D: Calculated! 20 From cache! 20 Error

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>

  The `third time`, we pass `5 * 2` to the function which gets evaluated to `10`.
</details>


### Question 58

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);
```

- A: "class"
- B: "function"
- C: "object"
- D: "string"

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>

Calling a function constructor with `new` results in the creation of an instance of `Person`, `typeof` keyword returns `"object"` for an instance. `typeof member` returns `"object"`.

</details>

### Question 59

```js
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

- A: 1 2 and 3 3 and 6 4
- B: 1 2 and 2 3 and 3 4
- C: 1 undefined and 2 undefined and 3 undefined and 4 undefined
- D: 1 2 and undefined 3 and undefined 4


<details>
  <summary>Answer</summary>
  <p>Answer: D</p>

  The first argument that the `reduce` method receives is the   `accumulator`, `x` in this case. The second argument is the `current value`, `y`. With the reduce method, we execute a callback function on every element in the array, which could ultimately result in one single value.

In this example, we are `not returning any values`, we are simply logging the values of the accumulator and the current value.

The value of the `accumulator` is `equal` to the `previously returned` value of the callback function. If you `don't pass` the `optional initialValue argument` to the reduce method, the `accumulator` is `equal` to the `first element` ie `arr[0]` on the first call. and `start value` is `arr[1]`

On the first call, the accumulator `(x)` is `1`, and the current value `(y)` is `2`. We don't return from the callback function, we log the accumulator and current value: `1` and `2` get logged.

If you don't return a value from a function, it returns `undefined`. On the next call, the accumulator is `undefined`, and the current value is `3`. `undefined` and `3` get logged.

On the fourth call, we again don't return from the callback function. The accumulator is again `undefined`, and the current value is `4`. `undefined` and `4` get logged.
</details>


### Question 60

```js
class Person {
  constructor() {
    this.name = 'Lydia';
  }
}

Person = class AnotherPerson {
  constructor() {
    this.name = 'Sarah';
  }
};

const member = new Person();
console.log(member.name);
```

- A: "Lydia"
- B: "Sarah"
- C: Error: cannot redeclare Person
- D: SyntaxError

<details>
  <summary>Answer</summary>
  <p>Answer B</p>

  We can set classes equal to other classes/function constructors. In this case, we set `Person` equal to `AnotherPerson`. The name on this constructor is `Sarah`, so the name property on the new `Person` instance `member` is `"Sarah"`.
</details>


### Question 61

```js
const info = {
  [Symbol('a')]: 'b',
};

console.log(info);
console.log(Object.keys(info));
```


- A: {Symbol('a'): 'b'} and ["{Symbol('a')"]
- B: {} and []
- C: { a: "b" } and ["a"]
- D: {Symbol('a'): 'b'} and []

<details>
  <summary>Answer</summary>
  <p>Answer D</p>

  A `Symbol` is not `enumerable` ie can not run loop over it or non-iterable. The `Object.keys` method returns all `enumerable key` properties on an object. The Symbol won't be visible, and an empty array is returned. When `logging` the entire object, `all properties will be visible`, `even non-enumerable ones`.

You can still `access symbols` using the `Object.getOwnPropertySymbols()` method).
</details>


### Question 62

```js
const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }

const list = [1, 2, 3, 4]
const user = { name: "Lydia", age: 21 }

console.log(getList(list))
console.log(getUser(user))
```

- A: [1, [2, 3, 4]] and SyntaxError
- B: [1, [2, 3, 4]] and { name: "Lydia", age: 21 }
- C: [1, 2, 3, 4] and { name: "Lydia", age: 21 }
- D: Error and { name: "Lydia", age: 21 }


<details>
  <summary>Answer</summary>
  <p>Answer: A</p>

  The `getUser` function receives an object. With arrow functions, we `don't` have to write `curly brackets` if we just `return one value`. However, if you want to instantly `return an object` from an arrow function, you have to `write it between parentheses`, otherwise everything between the two braces will be interpreted as a block statement. In this case the code between the braces is not a valid JavaScript code, so a SyntaxError gets thrown.

The following function would have returned an object:

`const getUser = user => ({ name: user.name, age: user.age })`

or 

`const getUser = user => { return { name: user.name, age: user.age }}`
</details>

### Question 63.a

```js
const myPromise = () => Promise.resolve('I have resolved!');

function firstFunction() {
  myPromise().then(res => console.log(res));
  console.log('second');
}

async function secondFunction() {
  console.log(await myPromise());
  console.log('second');
}

firstFunction();
secondFunction();
```


- A: I have resolved!, second and I have resolved!, second
- B: second, I have resolved! and second, I have resolved!
- C: I have resolved!, second and second, I have resolved!
- D: second, I have resolved! and I have resolved!, second

<details>
  <summary>Answer</summary>
  <p>Answer: D</p>

  In the `firstFunction`, we (sort of) put the myPromise function aside while it was running, but continued running the other code, which is `console.log('second')` in this case. Then, the function resolved with the string `I have resolved`, which then got logged after it saw that the callstack was empty.

With the await keyword in `secondFunction`, we literally pause the execution of an async function until the value has been resolved before moving to the next line.
</details>

### Question 63.b

```js
const myPromise = Promise.resolve(Promise.resolve('Promise'));

function funcOne() {
  setTimeout(() => console.log('Timeout 1!'), 0);
  myPromise.then(res => res).then(res => console.log(`${res} 1!`));
  console.log('Last line 1!');
}

async function funcTwo() {
  const res = await myPromise;
  console.log(`${res} 2!`)
  setTimeout(() => console.log('Timeout 2!'), 0);
  console.log('Last line 2!');
}

funcOne();
funcTwo();
```

- A: Promise 1! Last line 1! Promise 2! Last line 2! Timeout 1! Timeout 2!
- B: Last line 1! Timeout 1! Promise 1! Last line 2! Promise2! Timeout 2! 
- C: Last line 1! Promise 2! Last line 2! Promise 1! Timeout 1! Timeout 2!
- D: Timeout 1! Promise 1! Last line 1! Promise 2! Timeout 2! Last line 2!

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>
</details>



### Question 64

```js
let name = 'Lydia';

function getName() {
  console.log(name);
  let name = 'Sarah';
}

getName();
```


- A: Lydia
- B: Sarah
- C: undefined
- D: ReferenceError

<details>
  <summary>Answer</summary>
  <p>Answer: D</p>

  Variables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`
</details>

### Question 65

```js
function* generatorOne() {
  yield ['a', 'b', 'c'];
}

function* generatorTwo() {
  yield* ['a', 'b', 'c'];
}

const one = generatorOne();
const two = generatorTwo();

console.log(one.next().value);
console.log(two.next().value);
```


- A: a and a
- B: a and undefined
- C: ['a', 'b', 'c'] and a
- D: a and ['a', 'b', 'c']

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>

  In `generatorTwo`, we use the `yield*` keyword. This means that the first yielded value of `two`, is equal to the first yielded value in the iterator. The iterator is the array `['a', 'b', 'c']`. The first yielded value is `a`, so the first time we call `two.next().value`, `a` is returned.
</details>


### Question 66

```js
console.log(`${(x => x)('I love')} to program`);
```

- A: I love to program
- B: undefined to program
- C: ${(x => x)('I love') to program
- D: TypeError

<details>
  <summary>Answer</summary>
  <p>Answer: A</p>

  Expressions within template literals are evaluated first. This means that the string will contain the returned value of the expression, the immediately invoked function `(x => x)('I love')` in this case. We pass the value `'I love'` as an argument to the `x => x` arrow function. `x` is equal to `'I love'`, which gets returned. This results in `I love to program`.
</details>



### Question 67


```js
let config = {
  alert: setInterval(() => {
    console.log('Alert!');
  }, 1000),
};

config = null;
```

- A: The setInterval callback won't be invoked
- B: The setInterval callback gets invoked once
- C: The setInterval callback will still be called every second
- D: We never invoked config.alert(), config is null

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>


  Normally when we set objects equal to `null`, those objects get garbage collected as there is no reference anymore to that object.
  
   However, since the callback function within `setInterval` is an arrow function (thus bound to the `config` object), the callback function still holds a reference to the config object. 
   
   As long as there is a reference, the object won't get garbage collected. Since this is an interval, setting `config` to `null` or `delete`-ing `config.alert` won't garbage-collect the interval, so the interval will still be called. It should be cleared with `clearInterval(config.alert)` to remove it from memory. Since it was not cleared, the setInterval callback function will still get invoked every 1000ms (1s).
</details>

### Question 68

```js
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang);
  },
};

console.log(config.language);
```

- A: function language(lang) { this.languages.push(lang) }
- B: 0
- C: []
- D: undefined



<details>
  <summary>Answer</summary>
  <p>Answer: D</p>

  The `language` method is a `setter`. Setters don't hold an actual value, their purpose is to modify properties. When calling a `setter` method, `undefined` gets returned.
</details>


### Question 69

```js
async function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield Promise.resolve(i);
  }
}

(async () => {
  const gen = range(1, 3);
  for await (const item of gen) {
    console.log(item);
  }
})();
```

- A: Promise {1} Promise {2} Promise {3}
- B: Promise {<pending>} Promise {<pending>} Promise {<pending>}
- C: 1 2 3
- D: undefined undefined undefined


<details>
  <summary>Answer</summary>
  <p>Answer: C</p>

  The generator function `range` returns an async object with promises for each item in the range we pass: `Promise{1}`, `Promise{2}`, `Promise{3}`. We set the variable `gen` equal to the async object, after which we loop over it using a `for await ... of` loop. We set the variable `item` equal to the returned Promise values: first `Promise{1}`, then `Promise{2}`, then `Promise{3}`. Since we're awaiting the value of `item`, the resolved promise, the resolved values of the promises get returned: `1`, `2`, then `3`.
</details>


### Question 70

```js
const myFunc = ({ x, y, z }) => {
  console.log(x, y, z);
};

myFunc(1, 2, 3);
```


- A: 1 2 3
- B: {1: 1} {2: 2} {3: 3}
- C: { 1: undefined } undefined undefined
- D: undefined undefined undefined

<details>
  <summary>Answer</summary>
  <p>Answer: D</p>

  `myFunc` expects an object with properties `x, y and z` as its argument. Since we're only passing three separate numeric values (1, 2, 3) instead of one object with properties `x, y and z` `({x: 1, y: 2, z: 3})`, `x, y and z` have their default value of `undefined`.
</details>


### Question 71

```js
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);
```

- A: 0
- B: 1
- C: 2
- D: 3

<details>
  <summary>Answer</summary>
  <p>Answer: D</p>
</details>

### Question 73

```js
const person = {
  name: 'Lydia Hallie',
  hobbies: ['coding'],
};

function addHobby(hobby, hobbies = person.hobbies) {
  hobbies.push(hobby);
  return hobbies;
}

addHobby('running', []);
addHobby('dancing');
addHobby('baking', person.hobbies);

console.log(person.hobbies);
```

- A: ["coding"]
- B: ["coding", "dancing"]
- C: ["coding", "dancing", "baking"]
- D: ["coding", "running", "dancing", "baking"]

<details>
  <summary>Answer</summary>
  <p>Answer: C</p>

  The `addHobby` function receives two arguments, `hobby` and `hobbies` with the default value of the `hobbies` array on the `person` object.

First, we invoke the `addHobby` function, and pass `"running"` as the value for `hobby` and an empty array as the value for `hobbies`. Since we pass an empty array as the value for `hobbies`, `"running"` gets added to this empty array.

Then, we invoke the `addHobby` function, and pass `"dancing"` as the value for `hobby`. We didn't pass a value for `hobbies`, so it gets the default value, the `hobbies` property on the `person` object. We push the hobby `dancing` to the `person.hobbies` array.

Last, we invoke the `addHobby` function, and pass `"baking"` as the value for `hobby`, and the `person.hobbies` array as the value for `hobbies`. We push the hobby `baking` to the `person.hobbies` array.

After pushing `dancing` and `baking`, the value of `person.hobbies` is `["coding", "dancing", "baking"]`
</details>


### Question 74


```js
class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();
```


- A: I'm pink. 🌸
- B: I'm pink. 🌸 I'm a bird. 🦢
- C: I'm a bird. 🦢 I'm pink. 🌸
- D: Nothing, we didn't call any method


<details>
  <summary>Answer</summary>
  <p>Answer: B</p>


  We create the variable `pet` which is an instance of the `Flamingo` class. When we instantiate this instance, the `constructor` on `Flamingo` gets called. First, `"I'm pink. 🌸"` gets logged, after which we call `super()`. `super()` calls the constructor of the parent class, `Bird`. The constructor in `Bird` gets called, and logs `"I'm a bird. 🦢"`.
</details>


### Question 75

```js
const user = {
	email: "e@mail.com",
	password: "12345"
}

const updateUser = ({ email, password }) => {
	if (email) {
		Object.assign(user, { email })
	}

	if (password) {
		user.password = password
	}

	return user
}

const updatedUser = updateUser({ email: "new@email.com" })

console.log(updatedUser === user)
```


- A: false
- B: true
- C: TypeError
- D: ReferenceError


<details>
  <summary>Answer</summary>
  <p>Answer: B</p>

  The `updateUser` function updates the values of the `email` and `password` properties on user, if their values are passed to the function, after which the function returns the `user` object. The returned value of the `updateUser` function is the `user` object, which means that the value of updatedUser is a reference to the same `user` object that `user` points to. `updatedUser === user` equals `true`.
</details>


### Question 75

```js
const promise1 = Promise.resolve('First')
const promise2 = Promise.resolve('Second')
const promise3 = Promise.reject('Third')
const promise4 = Promise.resolve('Fourth')

const runPromises = async () => {
	const res1 = await Promise.all([promise1, promise2])
	const res2  = await Promise.all([promise3, promise4])
	return [res1, res2]
}

runPromises()
	.then(res => console.log(res))
	.catch(err => console.log(err))
```

- A: [['First', 'Second'], ['Fourth']]
- B: [['First', 'Second'], ['Third', 'Fourth']]
- C: [['First', 'Second']]
- D: 'Third'


<details>
  <summary>Answer</summary>
  <p>Answer: D</p>

  The `Promise.all` method runs the passed promises in parallel. If one promise fails, the `Promise.all` method rejects with the value of the rejected promise. In this case, `promise3` rejected with the value `"Third"`. We’re catching the rejected value in the chained `catch` method on the `runPromises` invocation to catch any errors within the `runPromises` function. Only `"Third"` gets logged, since `promise3` rejected with this value.
</details>


### Question 76
```js
What is value of 3 instanceof Number
```
<details>
  <summary>Answer</summary>
  <p>Answer: false</p>
</details>


### Question 77

```js
var foo = 'outside';

function logIt() {
    console.log(foo); 
    var foo = 'inside';
}
logIt();
```
<details>
  <summary>Answer</summary>
  <p>Answer: undefined</p>
</details>


### Question 78
Why below gives true
```js
.1+.2 != .3
```
<details>
  <summary>Answer</summary>
  <p>Answer: </p>

 This is not a javascript only limitation, it applies to all floating point calculations. The problem is that 0.1 and 0.2 and 0.3 are not exactly representable as javascript (or C or Java etc) floats. Thus the output you are seeing is due to that inaccuracy.

In particular only certain sums of powers of two are exactly representable. 0.5 = =0.1b = 2^(-1), 0.25=0.01b=(2^-2), 0.75=0.11b = (2^-1 + 2^-2) are all OK. But 1/10 = 0.000110001100011..b can only be expressed as an infinite sum of powers of 2, which the language chops off at some point. Its this chopping that is causing these slight errors.
</details>


### Question 79
For which value of `x` the results of the following statements are not the same?

```js
if( x <= 100 ) {...}
if( !(x > 100) ) {...}
```

<details>
  <summary>Answer</summary>

`NaN <= 100` is `false` and `NaN > 100` is also `false`, so if the value of `x` is `NaN`, the statements are not the same.

The same holds true for any value of x that being converted to type Number, returns `NaN`, e.g.: `undefined`, `[1,2,5]`, `{a:22}` , etc.

This is why you need to pay attention when you deal with numeric variables. `NaN` can’t be equal, less than or more than any other numeric value, so the only reliable way to check if the value is `NaN`, is to use the `isNaN()` function.
</details>

### Question 80

Guess the result

```js
var myObject = {
  foo: 'bar',
  func: function(){
    var self = this;
    console.log("Outer func: this.foo = " + this.foo);
    console.log("Outer func: self.foo = " + self.foo);
    (function(){
      console.log("Outer func: this.foo = " + this.foo);
      console.log("Outer func: self.foo = " + self.foo);
    }())
  }
}

myObject.func()
```


<details>
  <summary>Answer</summary>

Outer func: this.foo = bar
Outer func: self.foo = bar
Outer func: this.foo = undefined
Outer func: self.foo = bar
</details>


### Question 81
Guess the result

```js
const number = 1
const result = (function (number) {
  delete number
  return number
})(10)
console.log(result)

```
<details>
  <summary>Answer</summary>
  <p>Answer: The output of the above code is 10</p>

In this code, we are passing the value 10 as the input to the function. But again inside the function number is just a local primitive type of variable so delete will not make any changes to the number and the value 10 passed to the function will be returned from the function.
</details>


### Question 81
Guess the output

```js
var myObject = {
  price: 20.99,
  get_price: function () {
    return this.price
  },
}
var customObject = Object.create(myObject)
customObject.price = 19.99
delete customObject.price
console.log(customObject.get_price())
```
<details>
  <summary>Answer</summary>
  <p>20.99</p>
</details>

### Question 82

```js
(function (a) {
  arguments[0] = 10
  return a
})(5)
```

<details>
  <summary>Answer</summary>
  <p>10</p>
</details>

### Below 3 cases must see, why having the issue

### Question 83

```js
function Car(color) {
  this.color = color
}
var lada = new Car("Black")
Car.prototype.currentGear = 1
console.log(++lada.currentGear)
console.log(Car.prototype.currentGear)
```
<details>
  <summary>Answer</summary>
  <p>2 <br> 1</p>
</details>

### Question 84

```js
var User = function () {}
User.prototype.attributes = {
  isAdmin: false,
}
var admin = new User("Sam"),
  guest = new User("Bob")
admin.attributes.isAdmin = true
alert(admin.attributes.isAdmin)
alert(guest.attributes.isAdmin)
```
<details>
  <summary>Answer</summary>
  <p>true, true</p>
</details>


### Question 85

```js
function Person(name) {
  if (name) this.options.name = name
}
Person.prototype.options = {
  name: "Default name",
}
var foo = new Person("foo")
var bar = new Person("bar")
console.log(foo.options.name)
console.log(bar.options.name)
```

<details>
  <summary>Answer</summary>
  <p>bar, bar</p>
</details>

### Question 86

```js
var a = {};
(function b(a) {
  a.a = 10
  a = null
})(a)
console.log(a)
```
<details>
  <summary>Answer</summary>
  <p>{a: 10}</p>
</details>

### Question 87

```js
var obj = {
  a: 1,
}
(function (obj) {
  obj = {
    a: 2,
  }
})(obj)
console.log(obj.a)
```

<details>
  <summary>Answer</summary>
  <p>1</p>
</details>

### Question 88
below 2 code will show different answers

```js
let name = "Jayesh";
function printName() {
    if (name === "Jayesh") {
      let name = "JC";
      console.log(name);
    }
    console.log(name);
}
printName();
```

```js
var player = "Virat";
function displayPlayer() {
    if (player === "Virat") {
      var player = "VK";
      console.log(player);
    }
    console.log(player);
}
displayPlayer();
```

### Question 89
```js
// No Strict Mode
  name = "Jayesh"; // window.name ( property of window object )
  console.log(delete name);

  const displayName = (function (name) {
    console.log(delete name); // Local variable of function
    return name;
  })("JC");

  console.log(displayName);

  // 👍A) true, false, JC
  // 💡B) true, true, undefined
  // 💖C) false, false, JC
  // 😀D) false, true, undefined
```

<details>
  <summary>Answer</summary>
  <p>Answer is A</p>

Answer is A) true, false, JC because delete keyword deletes only property of an object. delete keyword can not delete local variables ( declared with var, let, and const ) and functions. delete keyword can delete global variables as they are property of window object.
</details>


### Question 90

```js
const arr = [];

for (var i = 0; i < 5; i++) {
    arr[i] = function() {
        return i;
    };
}

console.log(arr[0]());
console.log(arr[4]());

// 👍A) 0, 4     💡B) 4, 4
// 💖C) 5, 5     😀D) TypeError
```

<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>

 Answer is C) 5, 5 because variables declared with var keyword are function-scoped or globally-scoped but not blocked scoped. 
  Inner function will form the closure and points to the updated value of i that is 5. 
  In the case of Let variable, as they are blocked scoped so inner function will hold different values of i from 0 to 4.

```js
/* 👇 In the case of Let variable */
  const arrBlock = [];

  for (let i = 0; i < 5; i++) {
    arrBlock[i] = function () {
      return i;
    };
  }

  console.log(arrBlock[0]()); // 0
  console.log(arrBlock[4]()); // 4
```
</details>


### Question 92
```js
 const user = {
     userName: "Jayesh",
     displayName: function() {
         console.log(this.userName);
     },
 };

 setTimeout(user.displayName, 1000);

 // 👍A) Jayesh     💡B) undefined
 // 💖C) ""         😀D) TypeError
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>


 Answer is B) undefined because setTimeout is using user.displayName as a callback function rather than object method.
  callback function's "this" will refer to the window object and It will console undefined as there is no property such as userName in the window object.   

  // 👇 We can get "Jayesh" as an output by wrapping the user.displayName() inside a function :-

```js
  setTimeout(function () {
    user.displayName(); // Here, displayName is called by user object ( object method ). Hence, "this" will refer to user object.
  }, 1000);
```
</details>



### Question 93

```js
var name = "Jayesh";

function displayName() {
  console.log(this.name);
}

const person = {
    name: "JC",
    method(fn) {
      fn();
    },
};

person.method(displayName);

// 👍A) JC           💡B) Jayesh
// 💖C) undefined    😀D) TypeError
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

 Answer is B) Jayesh because displayName function is passed to person object method as a callback function.
  "this" keyword in displayName function will refer to window object and window object has a property "name" with value "Jayesh". Hence, It will console Jayesh as an output.

```js
  // 👇 We can get JC as an output by attaching call method with fn() inside person method :-

  const person2 = {
    name: "JC",
    method(fn) {
      fn.call(this); // borrowing function and passing "this" of person2 object.
    },
  };

  person2.method(displayName); // JC
```
</details>


### Question 94

```js
var length = 4;

function callback() {
    console.log(this.length);
}

const object = {
    length: 5,
    method: function() {
        arguments[0]();
    },
};

object.method(callback, 2, 3);

// 👍A) 2     💡B) 3
// 💖C) 4     😀D) 5
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

```js
Answer is B) 3 because arguments keyword is an array of arguments passed to the function. 
  Here while calling object.method(), we are passing three arguments callback fn(), 2 and 3.
  If we try to console arguments it will look like this 👇

  Arguments(3) [ƒ, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  0: ƒ callback()
  1: 2
  2: 3
  callee: ƒ ()
  length: 3
  Symbol(Symbol.iterator): ƒ values()
  [[Prototype]]: Object

  As we can clearly see, arguments is having length property that is equal to number of arguments passed to function.
  So, arguments[0] is nothing but the first argument passed to function that is callback function in this case.
  As we know, Everything in JavaScript is an object ( arguments is also an object which has length property with value 3 )
  arguments[0]() function's "this" will refer to arguments object. Hence, It will console 3 as an output
```
</details>

### Question 95

```js
var name = "Jayesh";

function displayName() {
    console.log(this.name);
}

const person = {
    name: "JC",
    method: displayName.bind(this),
};

person.method();

// 👍A) Jayesh       💡B) JC
// 💖C) undefined    😀D) TypeError
```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>


 ```js
 /*
  Answer is A) Jayesh because "this" inside the definition for person object does not refer to person object. 
  "this" will refer to the window object here, and binding displayName function with passing window's this  
  as a context will return a copy of bound function that is stored in method property of person object. 
  So, While calling person.method() will console Jayesh as an output.
  */

  // 👇 We can get JC as an output by wrapping displayName.bind(this) inside a function because "this" inside the normal function of an object refers to the object :-

  const person2 = {
    name: "JC",
    method: function () {
      return displayName.bind(this); // Here, "this" refers to the person2 object
    },
  };

  person2.method()(); // JC

```
</details>

### Question 96

```js

function show() {
    console.log(this.name);
}

const person1 = {
    name: "Jc"
};
const person2 = {
    name: "Jayesh"
};

show = show.bind(person1).bind(person2);
show();

// 👍A) Jayesh       💡B) undefined
// 💖C) JC           😀D) TypeError
```
<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>

 ```js
/*
  Answer is C) JC because a function which is bound with bind keyword can not be re-bound with other new context, bind chaining does not exist.
  once the function is bound to a particular object, It will always be bound to that object no matter how many times it's further bounded.
  */
```
</details>

### Question 97

```js
for (var i = 0; i < 5; i++) {
    setTimeout((i) => {
        console.log(i);
      },1000,i);
}

// 👍A) 0 1 2 3 4      💡B) 5 5 5 5 5
// 💖C) 4 4 4 4 4      😀D) 0 1 2 3 4 5
```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>

 ```js
/*
  Answer is A) 0 1 2 3 4 because as we are passing i ( 0 to 4 ) value as an argument to setTimeout callback function
  therefore this will console different values of i from 0 to 4.

  if there was no argument passed to setTimeout callback function then the output would be 5 5 5 5 5 because variables declared 
  with var keyword are function-scoped or globally-scoped but not blocked scoped. Inner function i would point to the updated value of i that is 5.
*/
```
</details>

### Question 98

```js
console.log(1);

async function fetchData() {
    console.log(2);
    let result = await Promise.resolve(3);
    console.log(result);
}

fetchData();
console.log(4);

// 👍A) 1 2 3 4      💡B) 1 4 2 3
// 💖C) 1 2 4 3      😀D) 1 3 4 2

```
<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>

 ```js
Answer is C) 1 2 4 3 beacause promise is used to handle the asynchronous result of an operation and 
  callback functions attached to the promises are stored into microtask queue. 
  So, first synchronous code will be executed i.e 1,2,4 and once callstack is empty, event loop pushes the microtask queue's task into callstack
  callstack will start executing the task and It will console 3 at last.
```
</details>


### Question 99


```js

 console.log("start");

 const promise = new Promise((resolve) => {
     console.log(1);
     resolve(2);
     console.log(3);
 });

 promise.then((result) => {
     console.log(result);
 });

 console.log("end");

 // 👍A) start end 1 3 2      💡B) start 1 3 end 2
 // 💖C) start end 1 2 3      😀D) start 1 end 2 3
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

 ```js
Answer is B) start 1 3 end 2 beacause The function we pass into the Promise constructor runs synchronously, 
  but anything that depends on its resolution ( resolve or reject ) will be called asynchronously. 
  Even if the promise resolves immediately, any handlers ( callback attached to promise then and catch ) will execute asynchronously. 

const promise = new Promise((resolve) => {
  console.log(1);  // runs synchronously
  resolve(2); // called asynchronously by then callback
  console.log(3); // runs synchronously
});

```
</details>


### Question 100

```js
const fetchData = function() {
    return new Promise((resolve, reject) => {
        reject();
    });
};

fetchData()
    .then(() => {
        console.log("Success 1");
    })
    .catch(() => {
        console.log("Error 1");
    })
    .then(() => {
        console.log("Success 2");
    });

// 👍A) Error 1 TypeError    💡B) Error 1
// 💖C) Error 1 Success 2    😀D) undefined

 
```
<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>

```js
 /*
  Answer is C) Error 1 Success 2 because in promise chaining .then method below .catch method will be called if in .catch method we are not 
  returning rejected promise ( by default implicitly returns a promise that is handled by it's below .then method )
  */
``` 
</details>

see also below code

```js
let p = new Promise((resolve, reject) => {
    reject(Error("Fails!"));
  });
  p.catch((error) => {
    console.log(error.message);
  }).then((result) => {
    console.log(result);
  });

  // 👍A) Fails! undefined    💡B) Fails!
  // 💖C) Fails! TypeError    😀D) Fails! Fails!
```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>

 ```js
/* 
  Answer is A) Fails! undefined because promise is rejecting so .catch callback will execute and console "Fails" first.
  In promise chaining .then method below .catch method will be called if in .catch method we are not 
  returning rejected promise ( by default implicitly it returns a promise that is handled by it's below .then method ).
  as .catch method is not returning anything, result of .then method will be undefined.

  The Error() constructor creates an error object. Error() can be called with or without new. Both create a new Error instance.
  Error objects are thrown when runtime errors occur. The Error object can also be used as a base object for user-defined exceptions.
  Error.message in user-created Error objects is the string provided as the constructor's first argument that is "Fails!" in our case.
  */
```
</details>

### Question 101

```js
function foo() {
    let a = (b = 0);
    a++;
    return a;
}
foo();
console.log(typeof a);
console.log(typeof b);

// 👍A) undefined number        💡B) ReferenceError number
// 💖C) undefined undefined     😀D) number number

```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>

 ```js
/* 
  Answer is A) undefined number because variable a is declared with let it is blocked scope and will be "not defined" outside function foo().
  The typeof operator returns "undefined" even for “undeclared” (or “not defined”) variables.
  Notice that there was no error thrown when we executed typeof a, even though a is an undeclared variable. 
  This is a special safety guard in the behavior of typeof. 
  and variable b is a just global scope variable hence it will be available outside function foo() also. 
  */
```
</details>

### Question 102

```js
console.log("start");

async function getData() {
    console.log("JC");
    return "Jayesh";
}

getData().then((res) => console.log(res));

console.log("end");

// 👍A) start end JC Jayesh     💡B) start JC Jayesh end
// 💖C) start JC end Jayesh     😀D) start Jayesh JC end
```

<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>


 ```js
 /* 
  Answer is C) start JC end Jayesh because async function always returns a promise. If no promise is return other values are wrapped in a resolved promise automatically.
  So in the above question return "Jayesh" would be same as Promise.resolve("Jayesh");
  First, All the synchronous code will be executed i.e start JC end and later on callback function attached to promise that is stored in microtask queue will be executed by callstack.
  Hence, The Final Result will be:- start JC end Jayesh
  */
```
</details>

### Question 103

```js
const inc = async (x) => {
    x = x + (await 1);
    return x;
};

const increment = async (x) => {
    x = x + 1;
    return x;
};

inc(1).then((x) => {
    increment(x).then((x) => console.log(x));
});

// 👍A) 1    💡B) 2
// 💖C) 3    😀D) 4
```

<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>

 ```js
/* 
  Answer is C) 3 because first promise return by async function "inc" will resolve and return ( 1 + 1 ) 2 as a result in .then method.
  secondly, promise return by async function "increment" will resolve and return ( 2 + 1 ) 3 as a result in .then method.

  Note:- await keyword in async function waits for the promise to fullfilled but if the value is not a Promise ( In above question await 1 ), 
  it converts the value to a resolved Promise, and waits for it. So. await 1 would be same as Promise.resolve(1).
  */
```
</details>

### Question 104

```js

const fetchData = function() {
    return new Promise((res, reject) => {
        reject("Error");
    });
};

fetchData()
    .then(null, (err) => {
        console.log("First");
        console.log(err);
    })
    .catch(() => {
        console.log("Second");
        console.log(err);
    });

// 👍A) First Error        💡B) Second Error
// 💖C) Second undefined   😀D) ReferenceError

```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>

 ```js
/* 
  Answer is A) First Error because then() method takes up to two arguments: callback functions for the fulfilled and rejected 
  cases of the Promise.
  Syntax of then :- then(onFulfilled) or then(onFulfilled, onRejected).
  then(
  (value) => fulfillment handler 
  (reason) => rejection handler 
  );

  In the above question, Inside .then() - We are passing first argument as null and second argument as callback function for rejected 
  case of the Promise. So, Second argument callback function will be executed for rejected case and will console First Error. 
  */
```
</details>


### Question 105

```js

function resolveAfterNSeconds(time, value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, time);
    });
}

async function doTasks() {
    console.time("time");
    let a = await resolveAfterNSeconds(1000, 1);
    let b = resolveAfterNSeconds(2000, 2);
    let c = resolveAfterNSeconds(1000, 3);

    console.log(a + (await b) + (await c));
    console.timeEnd("time");
}
doTasks();

// 👍A) 6 in 4 Sec      💡B) 6 in 3 Sec
// 💖C) NaN in 1 Sec    😀D) 1 in 4 Sec

```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>


  Answer is B) 6 in 3 Sec because while execution of doTasks function, first await resolveAfterNSeconds(1000, 1) will wait
  for 1 second. variable "a" will be assigned value as 1. a = 1, Total time = 1 Sec.

  In Next Line, resolveAfterNSeconds(2000, 2) pending Promise will be assigned to variable "b" and immediately next line
  resolveAfterNSeconds(1000, 3) pending Promise will be assigned to variable "c", both promises "b" and "c" will run concurrently.

  At Last Line, console.log(a + (await b) + (await c)), promise "b" will take 2Sec to resolve and concurrently promise "c" will 
  also get resolved in 1sec. overall time to execute (await b) + (await c) is only 2Sec because of concurrency.

  Hence, Output would be 6 where a = 1, b = 2, c = 3 and Total time = 3 Sec.
</details>

### Question 106

```js
 let a = true;

 setTimeout(() => {
     a = false;
 }, 2000);

 while (a) {
     console.log("JC");
 }

 // 👍A) "JC" one time after 2 sec.
 // 💡B) "JC" continously till 2 sec.
 // 💖C) "JC" Infinite times.
 // 😀D) Console Nothing.
```

<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>

 Answer is C) "JC" Infinite times because callback attached to setTimeout function is asynchronous task and need to wait
  for execution of main thread ( synchronous tasks in callstack ) to execute.

  As value of a is true, code will never exit from while loop ( callstack will never be empty to take callback attached to
  setTimeout function ). Hence, It will console "JC" Infinite times.
</details>

### Question 107

```js

console.log(1);

setTimeout(function() {
    console.log(2);
}, 1000);

setTimeout(
    (function() {
        console.log(3);
        return () => {};
    })(),
    2000
);

console.log(4);

// 👍A) 1 2 3 4    💡B) 1 4 3 2
// 💖C) 1 4 2 3    😀D) 1 3 4 2

```

<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>

 Answer is D) 1 3 4 2 because at first console.log(1) will print "1", callback function attached to first setTimeout will 
  wait for atleast 1 second.
  In the 2nd setTimeout we are passing IIFE ( Immediately Invoked Function Expression ). So, IIFE will print "3" immediately 
  and will return () => {} as callback that will wait for atleast 2 seconds. 
  console.log(4) will print "4", callstack will be empty as all synchronous tasks completed.
  After one second callback function attached to first setTimeout pushed into callstack and console.log(2) will print "2".
</details>


### Question 108

```js

setTimeout(() => {
    console.log(1);
    Promise.resolve().then(() => {
        console.log(2);
    });
}, 0);

Promise.resolve().then(() => {
    console.log(3);
    setTimeout(() => {
        console.log(4);
    }, 0);
});

// 👍A) 3 1 2 4    💡B) 3 2 1 4
// 💖C) 1 2 3 4    😀D) 3 4 1 2


```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>


  Answer is A) 3 1 2 4 because of taskqueue and microtask queue behaviour.
  callback attached to setTimeout will be pushed to taskqueue and callback of Promise.resolve().then will be pushed to microtask queue.

  As microtask queue has higher priority than taskqueue, callback attached to Promise.then will start executing in callstack 
  and console.log(3) will print "3", in the next line callback attached to setTimeout will be pushed to taskqueue.

  Now taskqueue has two setTimeout callback functions, So first callback function will start executing and console.log(1) will print "1"
  in the next line callback attached to Promise.resolve().then will be pushed to microtask queue.

  Now, microtask queue has one callback and taskqueue also has one callback, As microtask queue has higher priority than taskqueue
  from microtask queue callback function will execute and console.log(2) will print "2" and at last from taskqueue console.log(4) will print "4".
 
</details>


### Question 109

```js
function getName1() {
    console.log(arguments[0]);
}

getName1("Jayesh");

const getName2 = () => {
    console.log(arguments[0]);
};

getName2("JC");

// 👍A) Jayesh ReferenceError    💡B) Jayesh undefined
// 💖C) ReferenceError JC        😀D) Jayesh JC

```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>

 Answer is A) Jayesh ReferenceError because Arrow functions don't have their own bindings to this, arguments, or super.
  Above code will give Uncaught ReferenceError: arguments is not defined at getName2. In place of arguments, we can use 
  rest operator in arrow function definition for arguments array. 
  ```js
  const getName2 = (...arguments) => {
    console.log(arguments[0]);
  };
  getName2("JC"); // JC
  ```
</details>

### Question 110

```js
const arr = [1, 2, 3];

const removeLast = function(array) {
    array.pop();
    return array;
};

removeLast([...arr]);
console.log(arr);

removeLast(arr);
console.log(arr);

// 👍A) [1, 2, 3] 3      💡B) [1, 2] [1, 2, 3]
// 💖C) [1, 2] [1]       😀D) [1, 2, 3] [1, 2]
```

<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>


 Answer is D) [1, 2, 3] [1, 2] because first time for removeLast([...arr]), arr is passed with spread operator because of which new copy ( different reference ) 
  of arr will be passed to removeLast function and won't mutate the original arr. arr will still have [1, 2, 3] as value.
  For second call of removeLast(arr), arr is passed directly with same memory reference so mutating array will change original "arr" as well, so arr will be modified to [1, 2].
</details>

### Question 111


```js

console.log("start");

const first = setTimeout(() => {
    console.log("first");
    clearTimeout(second);
}, 1000);

const second = setTimeout(() => {
    console.log("second");
    clearTimeout(first);
}, 2000);

console.log("end");

// 👍A) start first second end    💡B) start end first
// 💖C) start end first second    😀D) start second end
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

 Answer is B) start end first because The clearTimeout() method clears a timer set with the setTimeout() method.
  In variable "first" we are assigning id of first setTimeout and similarly in variable "second" we are assigning id of seconnd setTimeout.
  Both the setTimeouts ( asynchronous task ) will be handled by web api, as first setTimeout is taking only 1 second. So    
  callback function attached to first setTimeout will be executed and clearTimeout(second) will clear the second setTimeout from web api.
  Hence, The Final Output will be start end first.
</details>

### Question 112

```js
function* generateNumber(i) {
    yield i;
    yield i * 2;
    return i * 2 * 2;
    yield i * 2 * 2 * 2;
}

const numbers = generateNumber(10);

console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);
console.log(numbers.next().value);

// 👍A) 10 20 40 80    💡B) 10 20 undefined 40
// 💖C) 10 20 20 40    😀D) 10 20 40 undefined
```

<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>


Answer is D) 10 20 40 undefined, Generator is a function that can be paused and resumed from where it was paused. It is written as the function keyword followed by an asterisk (*).
  Generator returns a Generator object that is used by calling the next method. For the first time calling numbers.next().value, we will get 10 as an output, second time 20 as an ouput.
  While calling numbers.next().value for third time, Inside generator function we have return keyword that will return 40 and also terminate the generator function and 
  as the generator function is finished calling numbers.next().value again for fourth time will give output as undefined. So, Final Output will be 10 20 40 undefined

  Note:- A return statement in a generator, when executed, will make the generator finish ( i.e. the done property of the object returned by it will be set to true ).
</details>


### Question 113

```js
let num = 10;

const incrementNumber1 = () => num++;

const incrementNumber2 = (num) => num++;

const num1 = incrementNumber1();
const num2 = incrementNumber2(num1);

console.log(num1);
console.log(num2);

// 👍A) 11 12     💡B) 10 10
// 💖C) 10 11     😀D) 11 11

```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

  Answer is B) 10 10 because The unary operator ++ first returns the value of the operand, then increments the value of the operand.
  So, incrementNumber1() will return "10" that will be assigned to "num1" and increment "num" by 1. incrementNumber2(num1) will also return "10" that will be assigned to "num2".
 
</details>


### Question 113

```js
 obj1 = {
     a: 10
 };
 const obj2 = obj1;
 obj2.a = 20;

 console.log(obj1);
 console.log(obj2);
 let obj1;

 // 👍A) { a: 10 } { a: 20 }
 // 💡B) { a: 20 } { a: 10 }
 // 💖C) { a: 20 } { a: 20 }
 // 😀D) ReferenceError


```

<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>


  Answer is D) ReferenceError because "let" variables can not be accessed before their initialization. at the last line we are declaring let obj1. 
  and at first line obj1 = { a: 10 } we will get Uncaught ReferenceError: Cannot access 'obj1' before initialization.

  Once the "let" variables are declared then only we can initialize them. If we try to initialize "let" variables before their declaration It will throw ReferenceError.

  In the case of "var" variables, because of hoisting the obj1 variable will be initialized as undefined and will get { a: 20 } { a: 20 } as an output.
  In the case of "let" variables, the obj1 variable will be in temporal dead zone (time frame between hoisted to initialization). 
</details>

### Question 114

```js
function Person(name) {
    this.name = name;
}

Person.prototype.age = 24;

const jayesh = new Person("JC");

console.log(Object.keys(jayesh));

let keys = [];
for (let key in jayesh) {
    keys.push(key);
}

console.log(keys);

// 👍A) ['name', 'age'] ['name', 'age']    💡B) ['name', 'age'] ['name']
// 💖C) ['name'] ['name', 'age']           😀D) ['name', 'age'] ['age']

```


<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>

  Answer is C) ['name'] ['name', 'age'] because Object.keys() method returns an array of a given object's own properties only,
  whereas for...in loop enumerates properties in the prototype chain as well. 
</details>

### Question 115

```js
const person = {
    pName: "Jayesh",
    getInfo() {
        function getName() {
            console.log(this.pName);
        }
        getName();
    },
};

person.getInfo();

// 👍A) undefined     💡B) Jayesh
// 💖C) ""            😀D) Error

```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>

  Answer is A) undefined because "this" keyword inside nested normal function refers to window object and no property named with pName is present in window object.
  We can get "Jayesh" as an output using arrow function, Because in arrow function the 'this' pointer is interpreted lexically, so it will refer to the object as desired.
 
</details>



### Question 116

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

class Player {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const jayesh = new Person("JC", 24);
const virat = new Player("VK", 34);

console.log(typeof Person);
console.log(typeof Player);

// 👍A) "object" "object"     💡B) "function" "function"
// 💖C) "function" "class"    😀D) "object" "class"
```


<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

  Answer is B) "function" "function" because The typeof operator in JavaScript returns "function" for user-defined function, a predefined function, or a class.
  console.log(typeof function() {}) - user-defined function => "function"
  console.log(typeof Math.tan) - predefined function => "function"
  console.log(typeof class C {}) - class => "function" 
</details>

### Question 117

```js
function getName1() {
    return "Jayesh";
}

const getName2 = () => {
    return "JC";
};

console.log(getName1.prototype);
console.log(getName2.prototype);

// 👍A) { constructor: ...} { constructor: ...}
// 💡B) {} { constructor: ...}
// 💖C) { constructor: ...} {}
// 😀D) { constructor: ...} undefined
```


<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>

 Answer is D) { constructor: ...} undefined because regular functions have a prototype property, which is an object (prototype object) with a constructor property. 
  Where as arrow functions do not have this prototype property. undefined gets returned when trying to access the prototype property using getName2.prototype.

  Difference b/w Regular Function and Arrow Function :-
  1) Arrow Function does not have it's own "this" keyword. 
  2) Arrow Function does not have it's own "argument" keyword. 
  3) Arrow Function can not be used as object function constructor.
  4) We can not use "new" keyword with arrow function.

</details>

### Question 118

```js
function getName() {
    name = "JC";
    console.log(name);
}

let name = "Jayesh";
getName();
console.log(name);

// 👍A) JC JC       💡B) JC undefined
// 💖C) JC Jayesh   😀D) ReferenceError
```


<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>

 
  Answer is A) JC JC because at first name is initialized as "Jayesh", while calling getName() function name will be overwritten by "JC".
  Hence, The result will be "JC" "JC".

</details>


### Question 119

```js
const person = [{ name: "Jayesh" }, 24];
const result = person.slice();

result[0].name = "JC";
result[1] = 34;

console.log(person[0]);
console.log(person[1]);

// 👍A) {name: 'Jayesh'} 24     💡B) {name: 'JC'} 24
// 💖C) {name: 'Jayesh'} 34     😀D) {name: 'JC'} 34
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

 Answer is B) {name: 'JC'} 24 because Array.prototype.slice method returns only a shallow copy of an original array.
  While changing result[0].name will also change person[0].name as nested property of array will have same reference.
  
</details>


### Question 120

```js
const arr1 = new Array(3);
const arr2 = new Array(1, 2, 3);

console.log(arr1);
console.log(arr2);

// 👍A) [3] [1, 2, 3]
// 💡B) [empty × 3] [3]
// 💖C) [3] [3]
// 😀D) [empty × 3] [1, 2, 3]
```

<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>

 Answer is D) [empty × 3] [1, 2, 3] because The Array() constructor is used to create Array objects. 
  If the only one argument passed to the Array constructor then it returns a new empty slots array of the passed argument as length.
  Syntax :-
  new Array(element0, element1, ....., elementN)
  new Array(arrayLength)

</details>

### Question 121

```js
const num1 = 034;
const num2 = 082;

console.log(num1);
console.log(num2);

// 👍A) 34 82      💡B) 28 82
// 💖C) 82 28      😀D) 82 34
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

 Answer is B) 28 82 because of the Octal literals in JavaScript. If the number has zero prefix (0) followed by a sequence of octal digits (from 0 to 7) 
  then the number will be converted into octal number. num1 => 034 is equal to 3*8 + 4*1 => 24 + 4 => 28.
  If the octal literal contains a number that is out of range, JavaScript ignores the leading 0 and treats the octal literal as a decimal.
  num2 => 082 has "8" which is out of range ( 0 to 7 ) so num2 will be treated as 82 only.
  
</details>


### Question 122
Ishme dhyan se dekho ki kon sa array lia h and then uska reference

```js
const arr = ["JC", { name: "VK"}, "JC", { name: "VK" }];

const res = arr.filter((item, index, array) => {
    if (array.indexOf(item) === index) {
        return true;
    } else {
        return false;
    }
});

console.log(res);

// 👍A) ["JC", { name: "VK" }, "JC", { name: "VK" }]
// 💡B) ["JC", { name: "VK" }, { name: "VK" }]
// 💖C) ["JC", { name: "VK" }]
// 😀D) ["JC", { name: "VK" }, "JC"]
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

Answer is B) ["JC", { name: "VK" }, { name: "VK" }] because the above code is to remove the primitive type duplicates from an array with the help of filter method.
  Non-primitive type duplicates will not be filtered out as indexOf() method uses strict equality ( === ), array.indexOf({ name: "VK" }) will return -1 as object are compared by their references. 
 
</details>


### Question 123

```js

const map = new Map();

map.set("a", 1);
map.set("b", 2);
map.set("c", 3);
map.set("a", 7);

console.log(map.get("a"));
console.log(map.size);

// 👍A) 7 4      💡B) 1 4
// 💖C) 1 3      😀D) 7 3
```

<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>

 Answer is D) 7 3 because Map objects are collections of key-value pairs. A key in the Map may only occur once; it is unique in the Map's collection.
  map.set("a", 7) will override key "a" with value "7" and the size of map object will be 3.

</details>



### Question 124

```js

 const calc = {
     total: 0,
     add: function(num) {
         this.total += num;
         return this;
     },
     sub: function(num) {
         this.total -= num;
         return this;
     },
     mul: function(num) {
         this.total *= num;
         return this;
     },
 };

 console.log(calc.add(10).sub(5).mul(10).total);

 // 👍A) 0   💡B) -50   💖C) 50   😀D) Error
```

<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>


 Answer is C) 50 because Method chaining. Method chaining is a chain of methods where each method shares the same reference means each method returns an object, allowing the calls to be 
  chained together in a single statement. Method chaining is used to write more readable code.
  
</details>

### Question 125

```js
 var result;
 for (var i = 5; i > 0; i--) {
     result = result + i;
 }

 console.log(result);

 // 👍A) 14      💡B) 15
 // 💖C) 10      😀D) NaN
```

<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>

 Answer is D) NaN because at first line declaring "result" variable without initialization will store result value as undefined.
  + operator applies an implicit coercion to an integer to an operand when the other is a number undefined is coerced to NaN.
  
</details>

### Question 126

```js
let arr = ["Java Script", "with", "JC"];

let res = arr.flatMap((ele) => ele.split(" "));

console.log(res);

// 👍A) ['Java', 'Script', 'with', 'JC']
// 💡B) ["Java Script", "with", "JC"]
// 💖C) ['Java', 'Script', ['with'], ['JC']]
// 😀D) ['Java Script', ['with'], ['JC']]
```

<details>
  <summary>Answer</summary>
  <p>Answer is A)</p>

 Answer is A) ['Java', 'Script', 'with', 'JC'] because The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. 
  It is similar to a map() followed by a flat() of depth 1. 
</details>


### Question 127

```js
const arr = [1, 2, 3, 4];

arr.fill(0, 1, 3);

console.log(arr);

// 👍A) [0, 0, 0, 0]   💡B) [0, 1, 3, 4]
// 💖C) [1, 0, 0, 4]   😀D) [1, 0, 0, 0]
```

<details>
  <summary>Answer</summary>
  <p>Answer is C)</p>

  Answer is C) [1, 0, 0, 4] because The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (excluding end index and default array.length). 
  It returns the modified array.
 
</details>


### Question 128

```js
const arr = [1, 2, 3];

let sum = arr.reduceRight((acc, curr) => {
    console.log(curr);
    return acc + curr;
});

// 👍A) 3 2 1        💡B) 2 1
// 💖C) 1 2 3        😀D) 1 2
```

<details>
  <summary>Answer</summary>
  <p>Answer is B)</p>

  Answer is B) 2 1 because The reduceRight() is a higher order function that iterates through each value of an array (from right-to-left) and reduces array of values into single value.
  as second argument is not passed to reduceRight() method, currentValue will start from last second element of an array. 
</details>

### Question 129

```js
const person = {};

Object.defineProperties(person, {
    name: {
        value: "JC",
        writable: true,
    },
    age: {
        value: 24,
        writable: false,
    },
});

person.name = "VK";
person.age = 34;

console.log(person.name);
console.log(person.age);

// 👍A) JC 34     💡B) JC 24
// 💖C) VK 34     😀D) VK 24

```

<details>
  <summary>Answer</summary>
  <p>Answer is D)</p>

  Answer is D) VK 24 because The Object.defineProperties() method defines new or modifies existing properties directly on an object, returning the object.
  if writable: true then value associated with the property can be modified else value can not be modified. 
</details>

### Question 130

```js
console.log(1)
const promise = new Promise((resolve) => {
    console.log(2)
    resolve()
    console.log(3)
})

console.log(4)

promise.then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})

console.log(7)

setTimeout(() => {
    console.log(8)
}, 10)

setTimeout(() => {
    console.log(9)
}, 0)
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

1
2
3
4
7
5
6
9
8
</details>


### Question 131

```js
Promise.resolve(1)
.then(() => 2)
.then(3)
.then((value) => value * 3)
.then(Promise.resolve(4))
.then(console.log)
```

<details>
  <summary>Answer</summary>
  <p>Answer is 6</p>
</details>

### Question 132

```js
Promise.resolve(1)
.then((val) => {
  console.log(val)
  return val + 1
}).then((val) => {
  console.log(val)
}).then((val) => {
  console.log(val)
  return Promise.resolve(3)
    .then((val) => {
      console.log(val)
    })
}).then((val) => {
  console.log(val)
  return Promise.reject(4)
}).catch((val) => {
  console.log(val)
}).finally((val) => {
  console.log(val)
  return 10
}).then((val) => {
  console.log(val)
})
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

1\
2\
undefined\
3\
undefined\
4\
undefined\
undefined
</details>



### Question 133

```js
console.log(Boolean('false'))
console.log(Boolean(false))
console.log('3' + 1)
console.log('3' - 1)
console.log('3' - ' 02 ')
console.log('3' * ' 02 ')
console.log(Number('1'))
console.log(Number('number'))
console.log(Number(null))
console.log(Number(false))
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

true\
false\
31\
2\
1\
6\
1\
NaN\
0\
0
</details>


### Question 134

```js
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => resolve(p1))
const p3 = Promise.resolve(p1)
const p4 = p2.then(() => new Promise((resolve) => resolve(p3)))
const p5 = p4.then(() => p4)

console.log(p1 == p2)
console.log(p1 == p3)
console.log(p3 == p4)
console.log(p4 == p5)
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

Let's break down what each of these promises represents:

1. `p1` is a promise resolved with the value `1`.
2. `p2` is a promise that resolves with `p1`. This is effectively the same as `Promise.resolve(p1)`.
3. `p3` is also a promise resolved with `p1`.
4. `p4` is a promise chained from `p2`, and it resolves with a new promise that resolves with `p3`.
5. `p5` is a promise chained from `p4`, and it resolves with `p4`.

Now, let's evaluate the comparisons:

- `p1 == p2`: `p1` and `p2` both resolve to the same value (`1`). Since objects and primitives are compared by reference in JavaScript, they will not be strictly equal. So, this will log `false`.
- `p1 == p3`: Both `p1` and `p3` are resolved with the same value (`1`). Again, they are not strictly equal. So, this will log `false`.
- `p3 == p4`: `p4` resolves with a promise that resolves with `p3`. Although `p3` is the resolved value of `p4`, they are not strictly equal. So, this will log `false`.
- `p4 == p5`: `p5` resolves with `p4`. As with the previous comparisons, they are not strictly equal. So, this will log `false`.

Therefore, all comparisons will log `false`.
</details>




### Question 135

```js
console.log(Math.min())
console.log(Math.max())
console.log(Math.min(1))
console.log(Math.max(1,2))
console.log(Math.min([1,2,3]))
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

Infinity\
-Infinity\
1\
2\
NaN
</details>


### Question 136

```js
var a = 1
function a() {
}

console.log(typeof a)

var d = 1;

(function(){
  d = '2'
  console.log(typeof d)
  function d() {
  }
})()

console.log(typeof d)

var e = 1
const f = function e() {}

console.log(typeof e)
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

number\
string\
number\
number
</details>


### Question 137

```js
Promise.resolve(1)
.finally((data) => {
  console.log(data)
  return Promise.reject('error')
})
.catch((error) => {
  console.log(error)
  throw 'error2'
})
.finally((data) => {
  console.log(data)
  return Promise.resolve(2).then(console.log)
})
.then(console.log)
.catch(console.log)
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

undefined\
error\
undefined\
2\
error2
</details>


### Question 138

```js
const arr = [1,2]
arr.push(3,4)
arr.unshift(5,6)
console.log(arr)
```

<details>
  <summary>Answer</summary>
  <p>Answer is [ 5, 6, 1, 2, 3, 4 ]</p>
</details>


### Question 139

```js
function a() {
    console.log(1)
    return {
        a: function () {
            console.log(2)
            return a()
        }
    }
}

a().a()
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

1\
2\
1
</details>


### Question 140

```js
// This is a JavaScript Quiz from BFE.dev

function Foo() { }
Foo.prototype.bar = 1
const a = new Foo()
console.log(a.bar)

Foo.prototype.bar = 2
const b = new Foo()
console.log(a.bar)
console.log(b.bar)

Foo.prototype = {bar: 3}
const c = new Foo()
console.log(a.bar)
console.log(b.bar)
console.log(c.bar)
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

**explanation is below**

Let's go through the code step by step:

1. `function Foo() { }`: Defines a constructor function named `Foo`.
2. `Foo.prototype.bar = 1`: Adds a property `bar` to the prototype of `Foo` with a value of `1`.
3. `const a = new Foo()`: Creates a new object `a` using the `Foo` constructor.
4. `console.log(a.bar)`: Prints the value of `bar` property of object `a`, which is `1`.
5. `Foo.prototype.bar = 2`: Changes the value of the `bar` property on the prototype to `2`.
6. `const b = new Foo()`: Creates a new object `b` using the `Foo` constructor.
7. `console.log(a.bar)`: Prints the value of `bar` property of object `a`, which is now `2`. This is because objects `a` and `b` share the same prototype object.
8. `console.log(b.bar)`: Prints the value of `bar` property of object `b`, which is `2`.
9. `Foo.prototype = {bar: 3}`: Changes the prototype of `Foo` to a new object with a `bar` property of `3`. This doesn't affect objects `a` and `b` because they already have their own prototypes set when they were created.
10. `const c = new Foo()`: Creates a new object `c` using the `Foo` constructor.
11. `console.log(a.bar)`: Prints the value of `bar` property of object `a`, which is still `2`.
12. `console.log(b.bar)`: Prints the value of `bar` property of object `b`, which is still `2`.
13. `console.log(c.bar)`: Prints the value of `bar` property of object `c`, which is `3`. This is because object `c` is created after changing the prototype of `Foo`, so it inherits the new prototype with `bar` set to `3`.

So, the output of the code will be:

```
1
2
2
2
2
3
```

**also**

Foo.prototype = {bar: 3}: Changes the prototype of Foo to a new object with a bar property of 3. This doesn't affect objects a and b because they already have their own prototypes set when they were created. why ????

<br>

Apologies for the confusion. Let's clarify:

When you create an object using the `new` keyword in JavaScript, the prototype chain is established at that moment. The prototype chain determines where JavaScript looks for properties and methods when you try to access them on an object.

In your code, `a` and `b` were created before you reassigned `Foo.prototype`, so they have already established their prototype chain. When you create `a` and `b`, they inherit properties from `Foo.prototype` as it was at the time of their creation. Changing `Foo.prototype` afterward does not affect the prototype chain of `a` and `b` because they have already established their connections.

However, when you create `c` after reassigning `Foo.prototype`, it inherits from the new prototype object `{bar: 3}`, because at the time of its creation, `Foo.prototype` was pointing to this new object.

So, in summary:

- `a` and `b` have their own prototype objects created when they were instantiated, so changing `Foo.prototype` later does not affect them.
- `c` is created after `Foo.prototype` is reassigned, so it inherits from the new prototype object.

I hope this clears up any confusion! Let me know if you need further clarification.
</details>

### Question 141

```js
const arr = [1,,,2]

// forEach
arr.forEach(i => console.log(i))

// map
console.log(arr.map(i => i * 2))

// for ... of
for (const i of arr) {
  console.log(i)
}

// spread
console.log([...arr])
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

1\
2\
[ 2, <2 empty items>, 4 ]\
1\
undefined\
undefined\
2\
[ 1, undefined, undefined, 2 ]
</details>


### Question 142

```js
const obj1 = {
    valueOf() {
        return 1
    },
    toString() {
        return '100'
    }
}

console.log(obj1 + 1)
console.log(parseInt(obj1))
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

In JavaScript, when you perform operations like addition or conversion, the language engine tries to coerce objects to primitive types. The order in which it tries to do this is: `valueOf()` first, then `toString()`.

Let's analyze your code:

```javascript
const obj1 = {
    valueOf() {
        return 1
    },
    toString() {
        return '100'
    }
}

console.log(obj1 + 1);
console.log(parseInt(obj1));
```

1. `obj1 + 1`: In this case, JavaScript first attempts to convert `obj1` to a primitive type. It tries the `valueOf()` method first. Since `valueOf()` is defined and returns a numeric value (1), JavaScript uses this value. Therefore, `obj1` is effectively treated as `1` in the expression. So, the expression becomes `1 + 1`, which equals `2`.

2. `parseInt(obj1)`: `parseInt()` function attempts to parse a string into an integer. It first converts its argument to a string (using `toString()`), then parses that string. In this case, `toString()` returns `'100'`, so `parseInt()` parses `'100'`, which results in `100`.

So, the output of the code will be:

```
2
100
```

</details>



### Question 143

```js
const obj3 = {
    toString() {
        return '100'
    }
}

console.log(+obj3)
console.log(obj3 + 1)
console.log(parseInt(obj3))
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

**Reason is below**

In this code, you've defined an object `obj3` with a `toString` method that returns the string `'100'`.

Let's break down each `console.log` statement:

1. `console.log(+obj3)`
   - The unary plus operator (`+`) tries to convert its operand to a number.
   - In this case, it calls the `toString` method of `obj3`, which returns the string `'100'`.
   - The unary plus operator then converts this string to a number, resulting in `100`.
   - Output: `100`

2. `console.log(obj3 + 1)`
   - Here, you're trying to perform addition (`+`) between an object (`obj3`) and a number (`1`).
   - JavaScript performs a type coercion, trying to convert `obj3` to a primitive value.
   - Since `obj3` has a `toString` method, it's converted to a string, resulting in `'100'`.
   - Then, JavaScript concatenates the string `'100'` with the string representation of `1`, resulting in `'1001'`.
   - Output: `'1001'`

3. `console.log(parseInt(obj3))`
   - The `parseInt` function tries to parse a string and return an integer.
   - Since `obj3` is an object, JavaScript first calls its `toString` method, resulting in the string `'100'`.
   - `parseInt` then tries to parse this string as an integer.
   - Output: `100`

So, the outputs will be:

```
100
1001
100
```
</details>

### Question 144

```js
const obj4 = {
    valueOf() {
        return 1
    }
}

console.log(obj4 + 1)
console.log(parseInt(obj4))
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

**Reason is below**

In JavaScript, the `valueOf()` method is invoked automatically whenever an object is coerced to a primitive value. In the case of addition (`+` operator), if one operand is an object, JavaScript attempts to convert it to a primitive value using the `valueOf()` method.

Let's analyze the code:

```javascript
const obj4 = {
    valueOf() {
        return 1;
    }
};

console.log(obj4 + 1);  // Output: 2
console.log(parseInt(obj4));  // Output: 1
```

1. `console.log(obj4 + 1);`:
   - Here, `obj4` is an object. When you use the `+` operator, JavaScript tries to convert `obj4` into a primitive value.
   - Since `valueOf()` is defined for `obj4`, it will be called. This method returns `1`.
   - So, effectively, the expression becomes `1 + 1`, resulting in `2`.

2. `console.log(parseInt(obj4));`:
   - The `parseInt()` function attempts to convert its argument into an integer.
   - Internally, `parseInt` will call the `toString()` method of the object to get the string representation, then parse it.
   - In this case, `obj4`'s `valueOf()` method is called because `toString()` is not defined.
   - `valueOf()` returns `1`, so effectively `parseInt` receives `"1"` as a string argument, which it successfully parses to the integer `1`. Hence, it prints `1`.

</details>

### Question 145

```js
const a = {}
Object.defineProperty(a, 'foo1', {
  value: 1
})
const b = Object.create(a)
b.foo2 = 1

console.log(b.foo1)
console.log(b.foo2)

b.foo1 = 2
b.foo2 = 2


console.log(b.foo1)
console.log(b.foo2)

```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

1\
1\
1\
2
</details>


### Question 146

```js
let val = 0

class A {
  set foo(_val) {
    val = _val
  }
  get foo() {
    return val
  }
}

class B extends A { }

class C extends A {
  get foo() {
    return val
  }
}

const b = new B()
console.log(b.foo)
b.foo = 1
console.log(b.foo)

const c = new C()
console.log(c.foo)
c.foo = 2
console.log(c.foo)
console.log(b.foo)
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

0\
1\
1\
1\
1
</details>


### Question 147

```js
const num = +((~~!+[])+(~~!+[])+[]+(~~!+[]))
console.log(num)
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

solution

```js
+[] // 0 since Number([]) = 0
!0 // true since 0 is falsy
~true // -2
~-2 // 1

// another way to think will be is that ~~ cancel out each other and Number(true) is 1

// If we use all this,
(~~!+[]) // 1


const num = +((~~!+[])+(~~!+[])+[]+(~~!+[]))

// We know that (~~!+[]) = 1
// num = +(1 + 1 + [] + 1)
// num = +(2 + [] + 1)
// since not all operands are number JS performs string concatenation, String([]) = ""
// num = +('2' + '' + '1') = +("21") = 21

console.log(num) // 21
```
</details>

### Question 148

```js
const obj = {}
const a = { name: 'a'}
const b = { name: 'b'}
obj[a] = {...a}
obj[b] = {...b}

console.log(obj[a].name)
console.log(obj[b].name)
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

b\
b
</details>

### Question 149

```js
function* genA() {
  yield [1, 2, 3]
}

function* genB() {
  yield* [1, 2, 3]
}

console.log(genA().next().value)
console.log(genB().next().value)

```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

[ 1, 2, 3 ]\
1
</details>

### Question 150

```js
function* gen() {
    try {
        yield 1
        yield 2
        return 3
        yield 4
    } finally {
        yield 5
        return 6
        yield 7
    }
}

console.log([...gen()])
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

Let's break down the function `gen` step by step to understand its behavior and explain the output of `console.log([...gen()])`.

### Function Definition
The function `gen` is a generator function. Generator functions are defined using the `function*` syntax and can yield multiple values, pausing and resuming their execution.

```javascript
function* gen() {
    try {
        yield 1;
        yield 2;
        return 3;
        yield 4;
    } finally {
        yield 5;
        return 6;
        yield 7;
    }
}
```

### Explanation

1. **`yield 1`**: The generator yields the value `1` and pauses.
2. **`yield 2`**: When resumed, the generator yields the value `2` and pauses again.
3. **`return 3`**: The generator returns `3`. When a generator returns a value, it terminates and no further `yield` statements are executed in the `try` block.
4. **`finally` block**: Despite the `return` statement, the `finally` block is executed.
    - **`yield 5`**: The `finally` block starts executing, and the generator yields the value `5`.
    - **`return 6`**: The generator returns `6` from the `finally` block, which causes it to terminate.
    - **`yield 7`**: This `yield` is unreachable because the generator terminates at `return 6`.

### Execution Flow

- First, `yield 1` produces `1`.
- Then, `yield 2` produces `2`.
- `return 3` stops the execution of the `try` block.
- The `finally` block runs:
  - `yield 5` produces `5`.
  - `return 6` stops the execution of the `finally` block.

### Output of `console.log([...gen()])`

The spread operator `...` in `console.log([...gen()])` iterates through the generator, collecting all yielded values into an array. Since the generator terminates at `return 6` in the `finally` block, the sequence of yielded values collected is `[1, 2, 5]`.

```javascript
console.log([...gen()]); // Output: [1, 2, 5]
```

The value `6` is not included in the array because `return` values from generators are not part of the yielded sequence; they just indicate termination.

</details>


### Question 151

```js
async function async1(){
  console.log(1)
  await async2()
  console.log(2)
}

async function async2(){
  console.log(3)
}

console.log(4)

setTimeout(function(){
  console.log(5)
}, 0)

async1()

new Promise(function(resolve){
  console.log(6)
  resolve()
}).then(function(){
  console.log(7)
})

console.log(8)

```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

4\
1\
3\
6\
8\
2\
7\
5
</details>


### Question 152

```js
var a = 1;
(function() {
  console.log(a + this.a);
  var a = '2'
  console.log(a + this.a);
})();

var name = 1;
(function() {
  console.log(name + this.name);
  var name = '2'
  console.log(name + this.name);
})();
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

NaN\
2undefined\
NaN\
2undefined
</details>



### Question 153

```js
let num

for (let i = 0; i < 5; i++) {
  num = i
  setTimeout(() => {
    console.log(num)
  }, 100)
}
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

4\
4\
4\
4\
4
</details>


### Question 154

```js
class A {
  static dev = "BFE";
  dev = "bigfrontend";
}

class B extends A {
  log() {
    console.log(this.dev);
  }

  static log() {
    console.log(this.dev);
  }
}

B.log();
new B().log();
```

<details>
  <summary>Answer</summary>
  <p>Answer is </p>

BFE\
bigfrontend
</details>


### Question 155

```jsx
import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

function A() {
  console.log('A')
  return <B/>
}

function B() {
  console.log('B')
  return <C/>
}

function C() {
  console.log('C')
  return null
}

function D() {
  console.log('D')
  return null
}

function App() {
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  console.log('App')
  return (
    <div>
      <A state={state}/>
      <D/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
/* Ans:
"App"
"A"
"B"
"C"
"D"
"App"
"A"
"B"
"C"
"D"
 */

```
### Question 156

```jsx
import React, { useState, useEffect, memo } from 'react'
import ReactDOM from 'react-dom'

function A() {
  console.log('A')
  return <B/>
}

const B = memo(() => {
  console.log('B')
  return <C/>
})

function C() {
  console.log('C')
  return null
}

function D() {
  console.log('D')
  return null
}

function App() {
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  console.log('App')
  return (
    <div>
      <A state={state}/>
      <D/>
    </div>
  )
}

/*App
A
B
C
D
App
A
D*/
```

### Question 157

```js
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function A({ children }) {
  console.log('A')
  return children
}

function B() {
  console.log('B')
  return <C/>
}

function C() {
  console.log('C')
  return null
}

function D() {
  console.log('D')
  return null
}

function App() {
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  console.log('App')
  return (
    <div>
      <A><B/></A>
      <D/>
    </div>
  )
}
```
### Question 158

```js
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function A({ children }) {
  console.log('A')
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])

/* Here even on state change of `A` parent component, child components will not re-render. When the parent state
   changes, parent component re-renders. But it still has the same children prop it got last time, 
   so React doesn’t visit that subtree. And as a result, child component doesn’t re-render.
  
  
  Thus there are two ways to 
  prevent child components from re-rendering.
    - wrapping them in `memeo`
    - passing them as `children` prop
 */

  return children
}

function B() {
  console.log('B')
  return <C/>
}

function C() {
  console.log('C')
  return null
}

function D() {
  console.log('D')
  return null
}

function App() {
  console.log('App')
  return (
    <div>
      <A><B/></A>
      <D/>
    </div>
  )
}
```

### Question 158 

```jsx
function App() {
  const [state, setState] = useState(0)
  console.log("App " + state)
  return (
    <div>
      <button onClick={() => {
        setState(count => count + 1)
        setState(count => count * 2)
      }}>click me</button>
    </div>
  )
}
```

### Question 159

```jsx
import React, { useState, memo, createContext, useEffect, useContext} from 'react'
import ReactDOM from 'react-dom'

const MyContext = createContext(0);

function B() {
  const count = useContext(MyContext)
  console.log('B')
  return null
}

const A = memo(() => {
  console.log('A')
  return <B/>
})

function C() {
  console.log('C')
  return null
}
function App() {
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  console.log('App')
  return <MyContext.Provider value={state}>
    <A/>
    <C/>
  </MyContext.Provider>
}

/* App
A
B
C
App
B
C */

React Rendering Process

 - Trigger Re-render: When the state of a component changes, React schedules a re-render of that component and all of its children.
Render in JSX Order: React renders the children in the order they appear in the JSX tree.

 - Context Consumers: When a context value changes, all consumers of that context will re-render, but they will still follow the rendering order defined by the parent component.
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```

### Question 158 

```jsx
```
