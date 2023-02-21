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