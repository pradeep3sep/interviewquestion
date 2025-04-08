> ###  What is TypeScript and how does it differ from JavaScript?
- TypeScript is a statically-typed superset of JavaScript
- After compiling, TypeScript code is transpiled into standard, browser-compatible JavaScript.
<br>

> ### Can you explain what is meant by "TypeScript is a superset of JavaScript"?
- TypeScript is often described as a "superset of JavaScript" because every valid JavaScript code is also a valid TypeScript code.
<br>

> ### What are the basic types available in TypeScript?

<br>

> ### What are Interfaces in TypeScript and how do they work

interface defines the `structure and types` of its members

```ts
interface Point {
    x: number;
    y: number;
}
  
function printPoint(p: Point) {
    console.log(`Point coordinates: (${p.x}, ${p.y})`);
}

let pointA = { x: 3, y: 7 }; // This object matches Point's structure
let pointB = { x: 8 }; // This object is missing the 'y' property

printPoint(pointA); // Output: Point coordinates: (3, 7)
printPoint(pointB); // Compile-time error due to incorrect structure
```
<br>

> ### Optional,Default, and Rest Parameters

Optional Parameters
```js
function greet(name: string, title?: string) {
    if (title) {
        console.log(`Hello, ${title} ${name}!`);
    } else {
        console.log(`Hello, ${name}!`);
    }
}
```
<br>


Default parameter
```js
function greet(name = "Stranger") {
    console.log(`Hello, ${name}!`);
}
```
<br>


Rest Parameters
```js
function introduce(greeting: string, ...names: string[]) {
    console.log(`${greeting}, ${names.join(", ")}!`);
}

introduce("Hello", "Alice", "Bob", "Carol");
```
<br>

> ### Call Signature

When using objects in TypeScript, you have the call signature to define the expected function structure for a specific method within the object.

Here is a code example:

```js
type Greeter = {
    (name: string): void
};

let welcome: Greeter;
welcome = function(name: string): void {
    console.log(`Welcome, ${name}!`);
};
```

> ### Union Types

Union types are used when a value can be more than a single type.

```ts
function printStatusCode(code: string | number) {
  console.log(`My status code is ${code}.`)
}
printStatusCode(404);
printStatusCode('404');
```

> ### Literal Types

Literal Types in TypeScript are types that represent exact values rather than general types. They are useful when you want to restrict a variable to hold only specific values.

```ts
let direction: "left" | "right" | "up" | "down";

direction = "left";   // ✅ allowed
direction = "right";  // ✅ allowed
direction = "forward" // ❌ Error: not assignable to type
```

Here, the variable direction can only have one of the specified string values.


To install Typescript globally - 
```
npm install -g typescript
```
for dev dependencies - 
```
npm install typescript --save-dev
```
To compile code - 
```
tsc filename.ts
```

tsc to watch the changes and build file
```
tsc -w
```

Generate a tsconfig.json
```
tsc --init
```

<br>

Generally ts file is not shown in the source section of the browser, only js, css and html are shown. for the debugging the ts file or to place debugger in ts file and get the debugger in browser, we set `true` the `sourceMap` in the tsconfig file.
```
sourceMap: true
``` 
<br>

Basic config in tsconfig.json
```
"outDir": './dist',   // this the location where ts to js converted file placed
"rootDir": './src'    // This is the location where it reads the ts file
"noEmitOnError": false  // This sets the ts that if any error occur in any file then do not convert any ts file to js. default behaviour is to convert all ts to js except the file which has the error. 
```
<br>

Below is basic code
```js
var num: number = 5;
num = "this is a string"; // error: Type 'string' is not assignable to type 'number'.
```
<br>

The basic types are :
- number (both integers and floating point numbers)
- string
- boolean
- `Array`. You can specify the types of an array's elements. There are two equivalent ways to define array types:\
  `Array<T>` and `T[]`. For example:
  - `number[]` - array of numbers
  - `Array<string>` - array of strings
- `Tuples`. Tuples have a fixed number of elements with specific types.
  - `[boolean, string]` - tuple where the first element is a boolean and the second is a string.
  - `[number, number, number]` - tuple of three numbers.
  - let employee: [string, number, boolean] = ['John', 35, true];
- {} - object, you can define its properties or indexer
  - `{name: string, age: number}` - object with name and age attributes
  - `{[key: string]: number}` - a dictionary of numbers indexed by string
- enum - Provides a set of named constants such as days or colors.
    ```js
    enum WeekDays { Monday, Tuesday, Wednesday, Thursday, Friday }
    let today: WeekDays = WeekDays.Wednesday;
    ```
    - `{ Red = 0, Blue, Green }` - enumeration mapped to numbers
- Function. You specify types for the parameters and return value:
  - (param: number) => string - function taking one number parameter returning string
  - () => number - function with no parameters returning an number.
  - (a: string, b?: boolean) => void - function taking a string and optionally a boolean with no return value.
- `any` - Permits any type. Expressions involving any are not type checked.
- `void` - represents "nothing", can be used as a function return value. Only `null` and `undefined` are part of the void type.
- never
  - `let` foo: never; -As the type of variables under type guards that are never true.
  - `function` error(message: string): never { throw new Error(message); } - As the return type of functions that never return.
- `null` - type for the value `null`. null is implicitly part of every type, unless strict null checks are enabled.

<br>

### Access Modifiers

1. **Readonly**
  - readonly is used to make a property or variable read-only. It means that the value of the property cannot be changed once it's set
```js
class Example {
    readonly readOnlyProperty: number = 42;

    constructor(readonly readOnlyParameter: string) {}
}
```
<br>

2. **Private**
  - private members are only accessible within the class that defines them. They cannot be accessed from outside the class or its instances.
```js
class Example {
    private privateProperty: number = 42;

    private privateMethod() {
        // Do something
    }
}
```
<br>

3. **Public**
  - public is the `default` access modifier for class members if no modifier is specified. Members marked as public are accessible from any code that can access the instance
```js
class Example {
    public publicProperty: number = 42;

    public publicMethod() {
        // Do something
    }
}
```
<br>

4. **Protected**
  - protected members are accessible within the class and its subclasses. They cannot be accessed from outside the class hierarchy.
  - It is useful when you want to allow access to certain members only to subclasses

```js
class Parent {
    protected protectedProperty: number = 42;

    protected protectedMethod() {
        // Do something
    }
}

class Child extends Parent {
    // Can access protectedProperty and protectedMethod here
}
```
<br>

5. **Static**
  - static is used to define static members of a class. Static members belong to the class itself, not to instances of the class.
  - They are accessed using the class name rather than an instance.
```js
class Example {
    static staticProperty: number = 42;

    static staticMethod() {
        // Do something
    }
}

// Access static property and method without creating an instance
console.log(Example.staticProperty);
Example.staticMethod();
```
<br>
<br>

### `protected` in classes
`protected` members are only visible to subclasses of the class they're declared in.

```js
class Greeter {
    public greet() {
        console.log("Hello, " + this.getName());
    }
    protected getName() {
        return "hi";
    }
}
class SpecialGreeter extends Greeter {
    public howdy() {
        // OK to access protected member here
        console.log("Howdy, " + this.getName());
    }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName();
// will show error Property 'getName' is protected and only accessible within class
// 'Greeter' and its subclass
```
<br>

### private in classes

`private` is like `protected` , but doesn't allow access to the member even from subclasses:

```js
class Base {
 private x = 0;
}
const b = new Base();
// Can't access from outside the class
console.log(b.x);
// shows the error Property 'x' is private and only accessible within class 'Base'.
```

there is caveats of above
```js
class MySafe {
 private secretKey = 12345;
}
const s = new MySafe();
// Not allowed during type checking
console.log(s.secretKey);
// above shows error that Property 'secretKey' is private and only accessible within class 'MySafe'.
// OK
console.log(s["secretKey"]);
```

Unlike TypeScripts's private , JavaScript's private fields ( # ) remain private after compilation and
do not provide the previously mentioned escape hatches like bracket notation access, making them
hard private.

```js
class Dog {
 #barkAmount = 0;
 personality = "happy";
 constructor() {}
}
```
<br>
<br>

### Unknown vs Any 

1. `any` Type: 
  - The any type is the most flexible type in TypeScript.
  - Variables of type any can hold values of any type, and you can call any method or access any property on them without the compiler checking.
  - It essentially opts out of static type checking for the values it is applied to.
  - It is often used when migrating JavaScript code to TypeScript or when dealing with values of unknown types in a generic way.
  - The downside is that you lose many of the benefits of static typing because the compiler can't provide type-checking assistance.
    ```js
    let value: any = 10;
    value = "hello";
    value.foo(); // No compilation error, even though foo may not exist
    ```
<br>

2. `unknown` Type:
  - The unknown type is `more restrictive than any`.
  - Variables of type unknown are similar to the any type in that they can hold values of any type, but you must perform some      type-checking or type assertion before performing operations on them.
  - It provides a safer alternative to any when dealing with dynamic data, as it requires you to explicitly check and cast types.
  - It is often used in situations where the type of a value is not known initially, but you want to maintain type safety.

    ```js
    let value: unknown = 10;

    // Type-checking required before using the value
    if (typeof value === "number") {
    let result = value + 5; // OK
    }
    ```

    ```js
    let userInput: unknown;
    let userName: string;

    userInput = 5;
    userInput = 'max';
    userName = userInput  // this will show error, because userInput can be anything but userName must be string
    ```

    ```js
    let userInput: any;
    let userName: string;

    userInput = 5;
    userInput = 'max';
    userName = userInput  // this code will not show any error. typescript do not check anything if any added
    ```

`In summary`, while both any and unknown offer flexibility when dealing with dynamic types, `unknown is a more type-safe option`, requiring explicit type-checking before performing operations. It's generally recommended to use unknown over any when possible to take advantage of TypeScript's static type-checking features.

<br>
<br>

### Never type

if we do not return anything then bydefault the function return the undefined, but when the function enconter error then it do not return anything. for the error case where function do not return the anything or have error case then we use the never type.

```js
function throwError(message: string): never {
    throw new Error(message);
}
```

<br>
<br>

### Enum in typescript
- Convention is start with Upper capital in enum ie UserResponse
- If default vaue is not provide then enum provide/gives index as its value

```js
enum Role { ADMIN, READ_ONLY = 100, AUTHOR = 'AUTHOR' };

const person = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
};

console.log(person.role)  // gives 0

const person2 = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.READ_ONLY
};
console.log(person2.role)  // gives 100
```

one more example is below

```js
enum UserResponse {
  No = 0,
  Yes = 1,
}
 
function respond(recipient: string, message: UserResponse): void {
  // ...
}
 
respond("Princess Caroline", UserResponse.Yes);
```
<br>
<br>

### Optional Parameter
Optional parameters must come after all non-optional parameters:
```js
function buildName(firstName?: string, lastName: string) // Invalid

function buildName(firstName: string, lastName?: string) // valid
```
<br>
<br>

### Constructor Shortcut
```js
class Car {
    public position: number;
    protected speed: number;

    constructor(position: number, speed: number) {
        this.position = position;
        this.speed = speed;
    }

    move() {
        this.position += this.speed;
    }
}
```

All this code can be resumed in one single constructor:

```js
class Car {
    constructor(public position: number, protected speed: number) { }

    move() {
        this.position += this.speed;
    }
}
```

<br>

Of course object types can also be created for nested objects.

Let's say you have this JavaScript object:

```js
const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}
```
This would be the type of such an object:
```js
{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
```
So you have an object type in an object type so to say.

<br>

#### keep in mind that the we should use the string not the String or number not Number

```js
function combine(input1: number | string | boolean, input2: string){
  const result = input1 + input2;
  return result;
}
```
<br>

#### The type names String , Number , and Boolean (starting with capital letters) are legal, but refer to some special built-in types that will very rarely appear in your code. Always use string , number , or boolean for types.

<br>

#### To specify the type of an array like [1, 2, 3] , you can use the syntax number[] ; this syntax works for any type (e.g. string[] is an array of strings, and so on). `Note that [number] is a different thing;`
<br>
<br>

### Functions

#### Parameter Type Annotations
```js
// Parameter type annotation
function greet(name: string) {
 console.log("Hello, " + name.toUpperCase() + "!!");
}
```
<br>

#### Return Type Annotations
```js
// In below return value of this function should always be number
function getFavoriteNumber(): number {
  return 26;
}
```
<br>

##### Function as a parameter
```js
function foo(otherFunc: Function): void {
 //...
}
```
<br>

#### Object Types
```js
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```
<br>

#### Optional Properties
```js
function printName(obj: { first: string; last?: string }) {
 // ...
}

// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

<br>
<br>

### Union Types

```js
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

// OK
printId(101);

// OK
printId("202");

// Error
printId({ myID: 22342 });
```
<br>
<br>

### Type Aliases
```js
type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });
```
<br>
<br>

### Interfaces
An interface declaration is another way to name an object type:
```js
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });
```
<br>

### Differences Between Type Aliases and Interfaces

Type aliases and interfaces are very similar, and in many cases you can choose between them freely.
Almost all features of an `interface` are available in `type`

- the key distinction is that a `type` cannot be re-opened to add new properties vs an `interface` which is always extendable.


- use custom `types` when you need unions, intersections, or mapped types
- use `interface` when defining object shapes or classes that adhere to a contract

- custom `types` can use unions and intersections for more complex type compositions
- `interfaces` can extend other interfaces to inherit their members.

  eg `types`

```js
type Stud = {
    name: string,
    age: string
}

type StudAddr = {
    city: string,
    state: string
}

type data = Stud & StudAddr

const bioData:data  = {
    name: 'vinode',
    age: "29",
    city: "Pune",
    state: "MM"
}

console.log(bioData)
```
  

eg `interface`

keep in mind equal to (=) sign hath gya h and extends word use hua h operator ki jgh and {}

```js
interface Stud {
    name: string,
    age: string
}

interface StudAddr {
    city: string,
    state: string
}
interface data extends Stud, StudAddr {}

const bioData:data  = {
    name: 'vinode',
    age: "29",
    city: "Pune",
    state: "MM"
}

console.log(bioData)
```

two `interface` can have same and when we use that interface it has combine value in it, but this can not happen in `type` it will show error `Duplicate identifier`

```js
interface Stud {
    name: string,
    age: string
}

interface Stud {
    city: string,
    state: string
}
interface data extends Stud {}

const bioData:data  = {
    name: 'vinode',
    age: "29",
    city: "Pune",
    state: "MM"
}

console.log(bioData)
```

<br>

#### Constraints

We constrain the type parameter to that type by writing an extends clause. Constraint means it should have that property.

```js
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
    console.log(item.length);
}

logLength("Hello"); // Okay
// logLength(42); // Error: Property 'length' is missing in type 'number'.
```

In above, whatever we pass in logLength as parameter should have length property, string hvae the length property, it is ok but if we pass number in it, number do not have length property then it will show error.


<br>


#### Non-null Assertion Operator (Postfix ! )

important to only use `!` when you know that the value can't be `null` or `undefined`.

```js
function liveDangerously(x?: number | null) {
 // No error
 console.log(x!.toFixed());
}
```
or

```js
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
```
or 

```js
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
```
- HTMLInputElement should be as per need, syntex is fixed but not value, if we have taken the `<input/>` in html then HTMLInputElement should be used. if `<p></p>` taken then HTMLParagraphElement.

<br>

#### Function Type Expressions

```js
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
function printToConsole(s: string) {
  console.log(s);
}
greeter(printToConsole);
```
The syntax `(a: string) => void` means "a function with one parameter, named `a` , of type `string`, that doesn't have a return value. Just like with function declarations, if a parameter type isn't specified, it's implicitly `any` .

using the `type` alias
```
type GreetFunction = (a: string) => void;

function greeter(fn: GreetFunction) {
 // ...
}
```

<br>

#### Call Signatures
```
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}
```
- `DescribableFunction` is a `type` that represents a function with a specific structure:
It has a property `description` of type `string`.
It is also a callable function that takes a single argument `someArg` of type `number` and returns a `boolean`.


<br>

#### Generic Functions
It's common to write a function where the types(can be string, number, boolean, object, etc) of the input relate to the type of the output

```
function firstElement<Type>(arr: Type[]): Type {
  return arr[0];
}

const stringArray: string[] = ["apple", "banana", "orange"];
console.log(firstElement(stringArray)); // Output: "apple"

```

in above we defined that the `Type` let say `string`, it means thaat arr value will be `array of string` and `return` value will be `string`

below is one more example

```
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed) // gives [1,2,3]
```
- The `map` function is a generic function that takes two type parameters (`Input` and `Output`).
- It takes an array `arr` of type `Input[]` and a function `func` that takes an argument of type `Input` and returns a value of type `Output`.
- The function returns an array of type `Output[]` by applying the provided function func to each element of the input array `arr` using the `map` method.
- In this example, the `map` function is used to transform an array of strings into an array of numbers.
- The input array `["1", "2", "3"]` is of type `string[]`.
- The provided mapping function `(n) => parseInt(n)` takes a string and converts it to a `number` using `parseInt`. So when you hover it will show `function(n: string): number` means return value is number 
- The result is an array of numbers, and the variable `parsed` is inferred to have the type `number[]`.

---

key checking in ts, which sometimes useful is
```
if('propertyName' in createdObject){
    // do something
}
```
above is replacemnet for some time below checking when show error
```
if(createdObject.propertyName){
    // do something
}
```

we have another way of checking is

```
if(newSubClass instanceof baseClass){
    // do something
}
```

---


```
function longest<Type extends { length: number }>(a: Type, b: Type) {
 if(a.length >= b.length) {
    return a;
 } else {
    return b;
 }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");

```
The provided TypeScript function, longest, is a generic function that takes two parameters of the same type, and the type is constrained to a structure with a length property.\
The `extends { length: number }` part is a constraint on the generic type. It means that `Type` must have a `length` property of type `number`.


#### Index Signatures


In TypeScript, index signatures allow you to define a type that represents the `allowable keys` and their corresponding `value types` in an object. This is particularly useful when you want to create objects with dynamic keys, where the keys are not known in advance.\

The syntax for an index signature looks like this:
```
{ [keyType: string]: valueType }
```

Here, `keyType` is the type of the keys, and `valueType` is the type of the corresponding values. For example:

```
interface StringMap {
  [key: string]: string;
}

const myMap: StringMap = {
  "key1": "value1",
  "key2": "value2",
  // ...
};
```

stringMap will always be have key which is always string and its value will always be string.

```
interface NumberDictionary {
 [index: string]: number;
 length: number; // ok
 name: string; // this is wrong
}
```

<br>

#### Generic Object Types and Interface
```
interface Box {
  contents: any;
}
```
for above requirement, we can make it generic type which is more good

```
interface Box<Type> {
 contents: Type;
}

let boxA: Box<string> = { contents: "hello" };
```

also below is generic `type`
```
type Box<Type> = {
  contents: Type;
};
```

#### The Array Type

Whenever we write out types like `number[]` or `string[]` , that's really just a shorthand for `Array<number>` and `Array<string>` .

```
function doSomething(value: Array<string>) {
 // ...
}

let myArray: string[] = ["hello", "world"];

// either of these work!
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

#### The `ReadonlyArray` Type

The `ReadonlyArray` is a special type that describes arrays that shouldn't be changed.

```
function doStuff(values: ReadonlyArray<string>) {

  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push("hello!");
}
```


Just as TypeScript provides a shorthand syntax for `Array<Type>` with `Type[]` , it also provides a shorthand syntax for `ReadonlyArray<Type>` with readonly `Type[]` .
below is the code

```
function doStuff(values: readonly string[]) {
 // We can read from 'values'...
 const copy = values.slice();
 console.log(`The first value is ${values[0]}`);
 // ...but we can't mutate 'values'.
 values.push("hello!");
}

```

#### Tuple Types

A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

```
type StringNumberPair = [string, number];
```

- Key point to note here `push` is exceptional in tuple. Like if we have defined the tuple then we can push in that. below is example

```
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author']
};

// This is allowed as exception
person.role.push('admin');

// This is not allowed
person.role = [0, 'admin', 'user'];
```


#### Optional Tuples
```
type Either2dOr3d = [number, number, number?];
```

#### Generic Classes
```
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;

myGenericNumber.add = function (x, y) {
  return x + y;
};
```

#### Generic Constraints
```
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no
  return arg;
}
```

#### The `keyof` type operator
The `keyof` operator takes an object type and produces a string or numeric literal union of its keys.
The following type `P` is the same type as `"x" | "y"`:

```
type Point = { x: number; y: number };
type P = keyof Point;
```


If the type has a `string` or `number` index signature, `keyof` will return those types instead:
```
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
```
in above `type A = number`

#### predefined type `ReturnType<T>`
It takes a function type and produces its return type:
```
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
 //type K is boolean
```


If we try to use ReturnType on a function name, we see an instructive error:

```
function f() {
 return { x: 10, y: 3 };
}
type P = ReturnType<f>;
//'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```

Remember that values and types aren't the same thing. To refer to the type that the value f has, we use typeof :
```
function f() {
 return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;

//* onHover we will see type P = {
 x: number;
 y: number;
} *//
```

#### Indexed Access Types
```
type Person = { age: number; name: string; alive: boolean };

type I1 = Person["age" | "name"];
 //onHover we will see type I1 = string | number

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
 //onHover we will see type I3 = string | boolean
```

Another example of `indexing` with an arbitrary type is using `number` to get the type of an array's
elements. We can combine this with `typeof` to conveniently capture the element type of an array
literal:

```
const MyArray = [
 { name: "Alice", age: 15 },
 { name: "Bob", age: 23 },
 { name: "Eve", age: 38 },
];
type Person = typeof MyArray[number];

type Person = {
 name: string;
 age: number;
}
type Age = typeof MyArray[number]["age"];
 //onHover we will see type Age = number
// Or
type Age2 = Person["age"];
 //onHover we will see type Age2 = number

```

You can only use types when indexing, meaning you can't use a const to make a variable
reference:

```
const key = "age";
type Age = Person[key];
// error will show Type 'key' cannot be used as an index type. 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
```

However, you can use a type alias for a similar style of refactor:
```
type key = "age";
type Age = Person[key];
```

#### Conditional Types 119 to 125 smjh nhi aaya


#### Mapped Types
mapped type is like using mapping function of JS on types of Typescript

```
type CreateMutable<Type> = {
 readonly [Property in keyof Type]: Type[Property]; 
};
// [Property in keyof Type] is loop part, Property is like 'e' of map function of js and 'keyof Type' gives the array

type LockedAccount = {
 readonly id: string;
 readonly name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>;
// on hover over you will see UnlockedAccount
/* type UnlockedAccount = {
    readonly id: string;
    readonly name: string;
}*/
```

#### Template Literal Types
```
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
```
aboves gives on hovering LocaleMessageIDs
```
type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
```



---
<br>

below is the "this" key concept

```
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log('Department: ' + this.name);
  }
}

const accounting = new Department('Accounting');

accounting.describe();  // gives "Department: Accounting"

const accountingCopy = { describe: accounting.describe };

accountingCopy.describe();  // gives "Department: undefined", irrespective of `accounting.describe` means referring the accounting, when accountingCopy is created then the method is copied but 'this' referred is not copied so the function gives undefined, below is possible solutions.
```

solutions

```
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {  // here we defined that the this will always refer to departmwnt else show error
    console.log('Department: ' + this.name);
  }
}

const accounting = new Department('Accounting');

accounting.describe();  // gives "Department: Accounting"

const accountingCopy = { name: 'DUMMY', describe: accounting.describe }; // in above we mentioned `this` to Department then there is must to add the name property. 

accountingCopy.describe();  // gives "Department: DUMMY" 
```


-------

### Udemy TypeScript Learning

#### Getters and Setters
A getter method returns the value of the property’s value. A getter is also called an accessor.\
A setter method updates the property’s value. A setter is also known as a mutator.\
A getter method starts with the keyword get and a setter method starts with the keyword set.

We can access/update the value directly with using the dot notation but if we want to access with certain checks then we needs the getters
```
class Person {
    public age: number;
    public firstName: string;
    public lastName: string;
}

let person = new Person();
person.age = 26;

// suppose we want to get and update with below condition then we need the getters and setters

if( inputAge > 0 && inputAge < 200 ) {
    person.age = inputAge;
}

```
the getters should have a `return` value\
we execute the getters and setters like property not like the method, ie without using the `()`. below we have use `accounting.mostRecentReport` not like `accounting.mostRecentReport()`

```
class Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  constructor(id: string, private reports: string[]) {
    this.lastReport = reports[0];
  }
}

const accounting = new Department('d2', []);
accounting.mostRecentReport = 'Year End Report';
console.log(accounting.mostRecentReport);

```

#### Static Methods and property
Static methods are the methods are directly called without using the `new` keyword. If its property it is directly accessible\
common example in js is `Math` method like `Math.pow()`. It is called  directly without using `new Math()`, although still we can use that way

```
class Department {
    private lastReport: string;

    // Static property
    static fiscalYear = 2020

    // Static method
    static createEmployee(name: String){
        return {name: name}
    }

    constructor(id: string, private reports: string[]) {
        this.lastReport = reports[0];
    }
}
const employee1 = Department.createEmployee('Max')
console.log(employee1)
console.log(Department.fiscalYear)
```
`Important` to note that static property is not accessible directly in the class inside any `method or constructor` using the `this` keyword, instead of this keyword we should use the class name

below code will show error
```
class Department {
  
    // Static property
    static fiscalYear = 2020

    constructor(id: string, private reports: string[]) {      
        this.fiscalYear
    }
}
```

below will be error free
```
class Department {
  
    // Static property
    static fiscalYear = 2020

    constructor(id: string, private reports: string[]) {      
        Department.fiscalYear
    }
}
```

#### Abstract Classes

When we need a common property and method which we need in every classes. Then we create that common class separatey and named as `Abstract Classes`. From it we extend other classes

Abstract classes provide a way to define common properties and methods that multiple derived classes can share.\
Generally classes are the blueprint of object but abstract is the blueprint of classes

It may contain abstract methods, which are declared in the abstract class but do not provide an implementation. Instead, the subclasses are required to provide the implementation for these abstract methods.

like hum chahte h ki describe har class me define ho separately login, then describe hum mention kar denge apni abstract class me. Keep in mind abstract class me hum logic nhi likhte, jo classes extend ki h ushme likhte h.

Keep in mind abstract class me jis method me abstract likha hoga wo hi compulary h create karna extend classs me like calculateArea compulsory but summary nhi

```
abstract class Shape {
    summary() {
      console.log("Im not necessary to be on every inherit class")
    }

    abstract calculateArea(): number; // Abstract method with no implementation
}

class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Square extends Shape {
    private sideLength: number;

    constructor(sideLength: number) {
        super();
        this.sideLength = sideLength;
    }

    calculateArea(): number {
        return this.sideLength * this.sideLength;
    }
}

// Creating instances
const circle = new Circle(5);
const square = new Square(4);

console.log(circle.calculateArea()); // Output: ~78.54
console.log(square.calculateArea()); // Output: 16
```

Keep in mind that we can not create the instance of abstract class

#### Private constructor
Private constructor is a constructor that can only be `called from within the class` in which it is defined. It cannot be called from outside the class, preventing the instantiation of objects using that constructor by external code.

Private constructors are used to enforce the singleton pattern.

In singleton pattern:

1. You cannot directly instantiate an object from outside the class.
2. You will always have exactly one instance of a class.

Private constructor is used when you want the only `one and fixed` instance to be created every time.

`trick` - ishme hum static method k throgh internally hi instance create kr k instance return kara dete h.

```
class AccountingDepartment {
    private lastReport: string;

    // Here we stored copy of the instance of class
    private static instance: AccountingDepartment;

    // We created the private constructor
    private constructor(id: string, private reports: string[]) {
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

}
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);
```

#### Interface with classes
We can also extend te interface\
we can inherit one interface with 2 interface with comma\
and we can also use 2 interface on single class using the comma separator.\
we use the `interface`, `type` in the class with `implements` keyword
type and interface both can use union, type use & while interface use extends

```
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

let user1: Greetable;

user1 = new Person('Max');

user1.greet('Hi there - I am');
console.log(user1);
```

#### this at Runtime in Classes
```
class MyClass {
 name = "MyClass";
 getName() {
 return this.name;
 }
}
const c = new MyClass();
const obj = {
 name: "obj",
 getName: c.getName,
};
// Prints "obj", not "MyClass"
console.log(obj.getName());
```

Long story short, by default, the value of this inside a function depends on how the function was called. In this example, because the function was called through the obj reference, its value of this was obj rather than the class instance.

#### Arrow Functions
```
class MyClass {
 name = "MyClass";
 getName = () => {
 return this.name;
 };
}
const c = new MyClass();
const g = c.getName;
// Prints "MyClass" instead of crashing
console.log(g());
```

### Decorators

## Niche wala point imp h, ye use nhi kia tha bhuat dikkat aa rahi thi
To enable experimental support for decorators, you must enable the `experimentalDecorators` compiler option either on the command line or in your `tsconfig.json`:

##### Command Line:
```
tsc --target ES5 --experimentalDecorators
```
##### tsconfig.json:
```
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

Decorator is a function that runs when the `class is defined`, not when to create the instance through `new className`
Decorators starts with @ symbol eg - @DecoratorName
There is general covention that decorator name starts with capital letter


A Decorator is a special kind of declaration that can be attached to a class 
- class Decorators 
- Property Decorators
- Accessor Decorators
- Method Decorators
- Parameter Decorators

#### Class Decorators
In class decrator,
The Decorators is attached at the top of the class.

```
// Class decorator function
function MyClassDecorator(target: Function) {  // it gets one params which is the constructor of the class where it is placed
    console.log(target)
}

// Applying the class decorator to a class
@MyClassDecorator
class ExampleClass {
    title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
}
```

#### Property Decorators
In Property decrator,
The Decorators is attached at the top of all the properties of class.
we get the `constructor` of the class `as parameter` of decorator
@Log is the example below

```
function Log(target: any, propertyName: string | Symbol) {  // it gets only two params
  console.log('Property decorator!');
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
}
```

#### Accessor Decorators
Accessor decorators are used to modify or enhance the behavior of accessors (getters and setters) within a class.

```
function myAccessorDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {  // it gets only three params
  console.log("target",target)
  console.log("propertyKey",propertyKey)
  console.log("descriptor",descriptor)
}

class MyClass {
    private _myProperty: number = 0;

    @myAccessorDecorator
    get myProperty(): number {
        return this._myProperty;
    }

    @myAccessorDecorator
    set myProperty(value: number) {
        this._myProperty = value;
    }
}

const instance = new MyClass();

```

#### Method Decorators
Method decorator is similar to Accessor Decorators, instead of placing on getters or setters, we place it on the method.

#### Parameter Decorators
Parameter decorators specifically target parameters of function

```
function logParameter(target: any, key: string | symbol, index: number) {
    console.log(`Parameter decorator called on: ${key}, index: ${index}`);
}

class MyClass {
    // Applying parameter decorator to the parameter of the method
    myMethod(@logParameter param1: string, @logParameter param2: number) {
        console.log(`Inside myMethod with params: ${param1}, ${param2}`);
    }
}

const myInstance = new MyClass();

// Calling the method to see the decorator in action
myInstance.myMethod("Hello", 42);
```

#### Decorator Factories
Decorator Factory is simply a `function` that `returns the expression` that will be called by the decorator at runtime.
keep in mind here we used @color() not @color, because decorator is returning function
Decorator function can be used any place like as class Decorator, Property decorator, etc

In simple word, It is same dectoratos along with wrapped by a function which gets the passed value by decorator and return the decorator function

```
function addMetadata(metadata: any) {
  return function log(target: any) {

    // Add metadata
    target.__customMetadata = metadata;

    // Return target
    return target;

  }
}

@addMetadata({ guid: "417c6ec7-ec05-4954-a3c6-73a0d7f9f5bf" })
class Person {
  private _name: string;
  public constructor(name: string) {
    this._name = name;
  }
  public greet() {
    return this._name;
  }
}

function getMetadataFromClass(target: any) {
   return target.__customMetadata;
}
console.log(getMetadataFromClass(Person));
```

#### Decorator Composition
Multiple decorators can be applied to a declaration, for example

on a single line
```
@f @g x
```

On multiple lines: 
```
@f
@g
x
```

the following steps are performed when evaluating multiple decorators on a single declaration in TypeScript:
1. The expressions for each decorator are evaluated top-to-bottom.
2. The results are then called as functions from bottom-to-top.

```
// @experimentalDecorators
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}
```

gives output 

```
"first(): factory evaluated" 
"second(): factory evaluated" 
"second(): called" 
"first(): called" 
```

------------------------

Import and Export of file in ts

1. NameSpace 
2. ES6 import and export

<br>
- Namespace Method

first you should add below in tsconfig.json. `bundle.js` is bundle name and should be formed inside `dist` folder
```
"outFile": "./dist/bundle.js",
```

export only whch you needed not everything
name after namespace ie App should be same everywhere
importing start with `///`

Below code in exporting file
```
namespace App {
  enum ProjectStatus {
    Active,
    Finished
  }

  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
```

Below code in importing file

```
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
```

<br>
- ES6 Modules, import and export method
This is recommended approach

In index.html, use below code. module thing is important
```
<script type="module" src="dist/app.js"></script>
```

```
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
```

```
import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';

new ProjectInput();
new ProjectList('active');
```


----

### Webpack
What happen is when we import many file in app.ts, we see many file download request in network section,each section takes few milisec time to setup an then request is fired.To overcome this time effect we make single bundle using the webpack.

Webpack transform ts to js and then js to js bundle

Command line to install is
```
npm i --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```

In webpack.config.js
```
const path = require('path');
 
module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // it means it should consider the js and ts file combine
  },
  plugins: [
    // any plugin you want to add here
  ]
};
```

#### Use of Super for self revison
We use the super to base reuirement to base class
```
class Department {
  // private readonly id: string;
  // private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    // validation etc
    // this.id = 'd2';
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

const it = new ITDepartment('d1', ['Max']);

it.describe();
```

#### Typecasting
When we don't know the data which is coming from api, but we want to add limitiations to it. then we do the procedure
```
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(Math.random().toString(), text);

  res.status(201).json({message: 'Created the todo.', createdTodo: newTodo});
};
```

in above we states `(req.body as {text: string}).text;` that text will be available and it will be of string

Sometime we need the value of input of html, then we use that in below form
```
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = "hi"
```


#### Handling the props in ts way in react js

```
interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={props.onDeleteTodo.bind(null, todo.id)}>
            DELETE
          </button>
        </li>
      ))}
    </ul>
  );
};
```

we have handled the props details through TodoListProps

#### Using the useRef,FormEvent,React.FC  in ts

```
type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};


const NewTodo: React.FC<NewTodoProps> = props => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};
```

### Declare in TS,  Response setup from api calling, in this we define the way in which reponse should come means what should come in it(GoogleGeocodingResponse).
When we need any variable which needs to available globally, we use the `declare`

```
declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: coordinates,
        zoom: 16
      }); 

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
```


#### Partial Type in TS
Constructs a type with all properties of Type set to optional. 

```
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

#### Autobind using decorators
```
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);
```

---
We need to add `draggable="true"` in the html where we want to have draggable functionality
```
<li draggable="true">
  <h2></h2>
  <h3></h3>
  <p></p>
</li>
```