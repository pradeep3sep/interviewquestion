//! https://github.com/pradeep3sep/javascript-questions-machine-code
// Question no 9,11,12,13,17,24,26,27,34,36,39,46.49 solution bhi,50,51 mast h solution bhi,54 solution bhi.56,57,58 solution bhi,59,61,62 solution must,63,64,65,67,72,73,74,75,76,83 sol,86 good,91,93,94,95,105,106,113 very good,123 revison concept,127,145,151
// Pending 8,38,44,45,55,66,71,78,82,90,92,96,97,98,114,116,127,132,133, object seal and freeze,138,139,140,141,142,144,147,150,152,153,154

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

### Question 14(problem in concept)
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
