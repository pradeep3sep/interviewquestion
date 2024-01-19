//! https://github.com/pradeep3sep/javascript-questions-machine-code
// Question no 9,11,12,13,17,24,26,27,34,36,39,46.49 solution bhi,50,51 mast h solution bhi,54 solution bhi.56,57,58 solution bhi,59,61,62 solution must,63,64,65,67,72,73,74,75,76,83 sol,86 good,91,93,94,95,105,106,113 very good,123 revison concept,127,145,151
// Pending 38,44,45,55,66,71,78,82,90,92,96,97,98,114,116,127,132,133, object seal and freeze,138,139,140,141,142,144,147,150,152,153,154

### Question 1
```
const numbers = [10,20,30,40,50,60]
const [,,,...newNumbers] = numbers
console.log(newNumbers);
```
<details>
  <summary>Answer</summary>
  <p>[40,50,60]</p>
</details>


### Question 2
```
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
```
const name = "testify"
console.log(!typeof name === "object");
console.log(!typeof name === "string");
console.log(!typeof name); //this is for hint
```
false,false

### Question 4
```
let a = 1
c= 2;
console.log(--c === a);
```
true

### Question 5
```
let check = [1,2,3,4]
let hi = [,...check]
console.log(hi);
```

### Question 6
```
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
undefined

### Question 7
```
const number = 2
const result  = (function () {
    delete number;
    return number
})();
console.log(result);
```
2

### Question 8
```
const number = 2
const result  = (function (number) {
    delete number;
    return number
})(20);
console.log(result);
```
20

### Question 9
```
function sum(num1, num2 = num1){
    console.log(num1 + num2);
}
sum(10)
```
20

### Question 10
```
function sum(num1, num2 = num1){
    console.log(num1 + num2);
}
sum(10,89)
```
99

### Question 11
```
var a = "hello"
var sum = 0
for (let i = 0; i < a.length; i++) {
    sum += (a[i] - "a");
}
console.log(sum);
```
NaN

### Question 12
```
let a = 0
for(a; a<5; a++);
console.log(a);
```
5

### Question 13(revise the concept of shallow and deep copy)
```
let person = {
    name : "Lynda"
}
const members = [person]
person = null
console.log(members);
```
[{name : "Lynda"}]

### Question 14
```
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

```
solution is 456

Object keys are automatically converted into strings because object can store onlyy string and symbol. We are trying to set an object as a key to object `a`, with the value of `123`.

However, when we stringify an object, it becomes `"[object Object]"`. So what we are saying here, is that `a["[object Object]"] = 123`. Then, we can try to do the same again. `c` is another object that we are implicitly stringifying. So then, `a["[object Object]"] = 456`.

Then, we log `a[b]`, which is actually `a["[object Object]"]`. We just set that to `456`, so it returns `456`.
```

### Question 15(console kra k check karo)
```
(()=> {
    let x = (y = 10)
})()
console.log(typeof x);
console.log(typeof y);
```
undefined, number

### Question 16
(function(a){
    return (function(){
        console.log(a);
        a = 23
    })()
})(45);

### Question 17
```
const person = {
    name : "pradeep",
    age : 45
}
let city = person.city
city = "delhi"
console.log(person);
```

### Question 18
```
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

### Question 19
```
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

### Question 20
```
bar();
(function abc(){
    console.log("something")
})();
function bar(){
    console.log("bar got called")
}
```

### Question 21 sorting of the array
```
let daya = [1,12,3,11,10]
daya.sort((a,b)=> {
    return a-b
});
console.log(daya);
```

### Question 21 sorting of the object
```
const items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
];
```
sort by value
```
items.sort((a, b) => a.value - b.value)
console.log(items);
```

sort by name
```
items.sort(function(a, b){
    if(a.firstname < b.firstname) { return -1; }
    if(a.firstname > b.firstname) { return 1; }
    return 0;
})
console.log(items);
```

### Question 22 converting the number into textnumber
```
let number = 9966
let data = number.toLocaleString()
```
10K

### Question 23 check(4)(2)(3)
```
function check(num1){
    return (num2)=>{
      return (num3)=> {
        return num1 ### num2 ### num3
      }
    }
  }
console.log(check(4)(2)(3));
```

### Question 24
```
let array = [2,3,[5,2,[6,[3, [4, 5, [5, 1, 3]]]],1,1],9];
//flat without using flat
console.log(array.toString().split(','));
```

### Question 25
```
const firstname = fun()
let name = 'ram'
function fun(){
  return `my is ${name} malviya`
}
console.log(firstname);
```

### Write a program to remove duplicate from the array without using the default method
### Write a program to give second largest integer from the array without using the default method
### Write a program to make polyfill for map,filter,reduce method in javascript

### Question 26 , output of below code
```
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

### Question 27
```
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

### Question 28
```
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

### Question 29
```
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```

### Question 30
```
function printNumbers(first, second, first) {
  console.log(first, second, first);
}
printNumbers(1, 2, 3);
```

### Question 31
```
console.log(Math.max());
```

### Question 32
```
console.log(10 == [10]);
console.log(10 == [[[[[[[10]]]]]]]);
```

1: True, True
2: True, False
3: False, False
4: False, True

Answer: 1
As per the comparison algorithm in the ECMAScript specification(ECMA-262), the above expression converted into JS as below

10 === Number([10].valueOf().toString()); // 10
So it doesn't matter about number brackets([]) around the number, it is always converted to a number in the expression.

### Question 33
```
console.log([0] == false);
if ([0]) {
  console.log("I'm True");
} else {
  console.log("I'm False");
}
```

In comparison operators, the expression [0] converted to Number([0].valueOf().toString()) which is resolved to false. Whereas [0] just becomes a truthy value without any conversion because there is no comparison operator.

### Question 34
```
console.log([1, 2] + [3, 4]);
```

### Question 35
```
let numbers = [1, 2, 3, 4, NaN];
console.log(numbers.indexOf(NaN));
```

### Question 36
```
async function func() {
  return 10;
}
console.log(func());
```

1: Promise {<fulfilled>: 10} \
2: 10 \
3: SyntaxError \
4: Promise {<rejected>: 10}

Answer: 1 \
Async functions always return a promise. But even if the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise. The above async function is equivalent to below expression,
function func() {
  return Promise.resolve(10);
}


### Question 37
```
async function func() {
  await 10;
}
console.log(func());
```

1: Promise {<fulfilled>: 10} \
2: 10 \
3: SyntaxError \
4: Promise {<resolved>: undefined}

Answer: 4 \
The await expression returns value 10 with promise resolution and the code after each await expression can be treated as existing in a .then callback. In this case, there is no return expression at the end of the function. Hence, the default return value of undefined is returned as the resolution of the promise. The above async function is equivalent to below expression,
function func() {
  return Promise.resolve(10).then(() => undefined);
}

### Question 38
```
let message = 'Hello World!';
message[0] = 'J'
console.log(message) // Hello World!

let name = 'John';
name = name + ' Smith';
console.log(name); // John Smith
```

1: Jello World!, John Smith \
2: Jello World!, John \
3: Hello World!, John Smith \
4: Hello World!, John 

Answer: 3 \
In JavaScript, primitives are immutable i.e. there is no way to change a primitive value once it gets created. So when you try to update the string's first character, there is no change in the string value and prints the same initial value Hello World!. Whereas in the later example, the concatenated value is re-assigned to the same variable which will result into creation of new memory block with the reference pointing to John Smith value and the old memory block value(John) will be garbage collected.

### Question 39
```
var a = [1,2,3]
var b = [1,2,3]
var c = '1,2,3'

console.log(a == c)  // true
console.log(b == c)  // true
console.log(a == b)  // false
```

arrays are coerced to strings by simply joining all the values with comma(,) in between

### Question 40
```
'a' < 'b' // gives true because a and b both are string so are converted to number 1 and 2 respectively by coercion of js
'a' > 'b'  // gives false because a and b both are string so are converted to number 1 and 2 respectively by coercion of js
42 < 'hh'  // gives false
42 > 'hh'  // gives false because the both are different data type so 'hh' are coerced to NaN and the comparison becomes 42 > NaN
```

### Question 41
```
+true;
!'Lydia';
```

gives 1 and false

### Question 42
```
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
```
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
  <p></p>

  For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the `global object!`

We said that `this.firstName` equals `"Sarah"` and `this.lastName` equals `"Smith"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function.

</details>


### Question 44
```
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
```
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
```
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

```
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
```
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

```
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

```
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

- A: "undefined", "number"
- B: "number", "number"
- C: "object", "number"
- D: "number", "undefined"

<details>
  <summary>Answer</summary>
  <p>Answer: A</p>

  `let x = (y = 10);` is actually shorthand for:
  ```
  y = 10;
  let x = y;
  ```
</details>


### Question 51
```
// counter.js
let counter = 10;
export default counter;
```

```
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

### Question 52
```
const name = 'Lydia';
age = 21;
var last = 'verma'
console.log(delete name);
console.log(delete age);
console.log(delete last);
```

- A: false, true
- B: "Lydia", 21
- C: true, true
- D: undefined, undefined


<details>
  <summary>Answer</summary>
  <p>Answer: A</p>

  The `delete` operator returns a boolean value: `true` on a successful deletion, else it'll return `false`. However, variables declared with the `var, const or let` keyword cannot be deleted using the `delete` operator.

The `name` variable was declared with a `const` keyword, so its deletion is not successful: `false` is returned. When we set `age` equal to `21`, we actually added a property called `age` to the global object. You can successfully delete properties from objects this way, also the global object, so `delete age` returns `true`.

</details>


### Question 53

```
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

With the `defineProperty` method, we can add new properties to an object, or modify existing ones. When we add a property to an object using the `defineProperty` method, they are by default not enumerable means not iterable. The `Object.keys` method returns all enumerable property names from an object, in this case only `"name"`.

Properties added using the `defineProperty` method are immutable by default. You can override this behavior using the `writable`, `configurable` and `enumerable` properties. This way, the `defineProperty` method gives you a lot more control over the properties you're adding to an object.
</details>


### Question 54

```
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



### Question 55

```
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


### Question 56
```
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


### Question 57

```
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

### Question 58

```
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
