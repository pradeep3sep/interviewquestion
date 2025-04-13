> ###  What is TypeScript and how does it differ from JavaScript?
- TypeScript is a statically-typed superset of JavaScript
- After compiling, TypeScript code is transpiled into standard, browser-compatible JavaScript.
<br>

> ### Can you explain what is meant by "TypeScript is a superset of JavaScript"?
- TypeScript is often described as a "superset of JavaScript" because every valid JavaScript code is also a valid TypeScript code.
<br>

> ### Some Generic commands of TS

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

Generally ts file is not shown in the source section of the browser, only js, css and html are shown. for the debugging the ts file or to place debugger in ts file and get the debugger in browser, we set `true` the `sourceMap` in the tsconfig file.
```
sourceMap: true
``` 

Basic config in tsconfig.json
```ts
"outDir": './dist',   // this the location where ts to js converted file placed
"rootDir": './src'    // This is the location where it reads the ts file
"noEmitOnError": false  // This sets the ts that if any error occur in any file then do not convert any ts file to js. default behaviour is to convert all ts to js except the file which has the error. 
```

<br>

> ### What are the basic types available in TypeScript?

<details>

The basic types are :
- **number** (both integers and floating point numbers)
- **string**
- **boolean**
- **Array**- There are two equivalent ways to define array types:\
  `Array<T>` and `T[]`. For example:
    - `string[]` - array of string
    - `Array<string>` - array of strings
- **Tuples**- Tuples have a `fixed number of elements` with `specific types`.
  - `[boolean, string]` - tuple where the first element is a boolean and the second is a string.
  - `[number, number, number]` - tuple of three numbers.
  - let employee: [string, number, boolean] = ['John', 35, true];
- **{} - object**- you can define its properties or indexer
  - `{name: string, age: number}` - object with name and age attributes
  - `{[key: string]: number}` - a dictionary of numbers indexed by string
- **enum** - Provides a set of named constants such as days or colors.
    ```js
    enum WeekDays { Monday, Tuesday, Wednesday, Thursday, Friday }
    let today: WeekDays = WeekDays.Wednesday;
    ```
    - `{ Red = 0, Blue, Green }` - enumeration mapped to numbers
- **Function**. You specify types for the parameters and return value:
  - (param: number) => string - function taking one number parameter returning string
  - () => number - function with no parameters returning an number.
  - (a: string, b?: boolean) => void - function taking a string and optionally a boolean with no return value.
- **any** - Permits any type. Expressions involving any are not type checked.
- **void** - represents "nothing", can be used as a function return value. Only `null` and `undefined` are part of the void type.
  - **If you have nothing to retun instead of return undefined, you can use void to return**
    ```ts
    type Pra = (a: number) => void;

    const red: Pra = (a) => {
      // your implementation here
      console.log(a);
    };
    // or
    const red: Pra = function (a) {
      // your implementation here
      console.log(a);
    };
    ```
- **never**
  - `let` foo: never; -As the type of variables under type guards that are never true.
  - if we do not return anything then by default the function `return the undefined`, but when the function enconter error then it do not return anything. for the error case where function do not return the anything or have error case then we use the never type.
  ```ts
  function throwError(message: string): never {
      throw new Error(message);
  }
  ```
- **null** - type for the value `null`. null is implicitly part of every type, unless strict null checks are enabled.
</details>
<br>


> ### Notes:
1. keep in mind that the we should use the string not the String or number not Number
2. The type names String , Number , and Boolean (starting with capital letters) are legal, but refer to some special built-in types that will very rarely appear in your code. Always use string , number , or boolean for types.
3. To specify the type of an array like [1, 2, 3] , you can use the syntax number[].`Note that [number] is a different thing;`
4. key checking in ts

<details>

```ts
if(createdObject.propertyName){
    // do something
}
```
Above code is ok as per JS but sometimes we get error in ts, then we use below code


```ts
if('propertyName' in createdObject){
    // do something
}
```

we have another way of checking is

```ts
if(newSubClass instanceof baseClass){
    // do something
}
```
</details>

<br>

> ### What are Interfaces in TypeScript and how do they work

<details>

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
</details>
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

Optional parameters must come after all non-optional parameters:
```js
function buildName(firstName?: string, lastName: string) // Invalid

function buildName(firstName: string, lastName?: string) // valid
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

> ### Union Types

Union types are used when a value can be more than a single type.

```tsx
function printStatusCode(code: string | number) {
  console.log(`My status code is ${code}.`)
}
printStatusCode(404);
printStatusCode('404');
```
<br>

> ### Literal Types

Literal Types in TypeScript are types that represent exact values rather than general types. They are useful when you want to restrict a variable to hold only specific values.

Here, the variable direction can only have one of the specified string values.

```ts
let direction: "left" | "right" | "up" | "down";

direction = "left";   // ✅ allowed
direction = "right";  // ✅ allowed
direction = "forward" // ❌ Error: not assignable to type
```
<br>

> ### Unknown vs Any 

1. `any` Type: 
  - The any type is the most flexible type, `type any` can hold values of any type.
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

    ```ts
    let value: unknown = 10;

    // Type-checking required before using the value
    if (typeof value === "number") {
    let result = value + 5; // OK
    }
    ```

    ```ts
    let userInput: unknown;
    let userName: string;

    userInput = 5;
    userInput = 'max';
    userName = userInput  // this will show error, because userInput can be anything but userName must be string
    ```

    ```ts
    let userInput: any;
    let userName: string;

    userInput = 5;
    userInput = 'max';
    userName = userInput  // this code will not show any error. typescript do not check anything if any added
    ```

`In summary`, while both any and unknown offer flexibility when dealing with dynamic types, `unknown is a more type-safe option`, requiring explicit type-checking before performing operations. It's generally recommended to use unknown over any when possible to take advantage of TypeScript's static type-checking features.

<br>
<br>

> ### Enum in typescript
- Convention is start with Upper capital in enum ie UserResponse
- If `default vaue` is `not provide` then enum `provide/gives index as its value`

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

> ### Functions

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
<br>

> ### Type Aliases
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

> ### Interfaces
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
<br>

> ### Differences Between Type Aliases and Interfaces

| Feature                         | `type`                                     | `interface`                              |
|-------------------------------|--------------------------------------------|------------------------------------------|
| ✅ Can describe objects        | Yes                                        | Yes                                      |
| ✅ Can be extended             | Yes (with `&`)                              | Yes (with `extends`)                     |
| 🔁 Can be reopened/merged      | ❌ No                                       | ✅ Yes                                    |
| 🔣 Can define primitives       | ✅ Yes (`type Age = number`)               | ❌ No (only objects)                     |
| 🧩 More suitable for           | Union types, complex types                 | Class-like structures, OOP-style objects |
| 👨‍👩‍👧‍👦 Can be implemented by class | ❌ No                                       | ✅ Yes (`class MyClass implements MyInterface`) |

<br>

#### 1. used for object
Both **type aliases** and **interfaces** are used to define the shape of an object (or structure of data).  

- one genric diff is type has equal(=) sign before object while interace don't

Example:

```ts
type User = {
  name: string;
  age: number;
};

interface User {
  name: string;
  age: number;
}
```
<br>

#### 2. Extending
```ts
// Type
type Animal = { name: string };
type Dog = Animal & { breed: string };

// Interface
interface Animal { name: string }
interface Dog extends Animal { breed: string }
```

#### 3. Merging
```ts
// Interface can be merged
interface Person { name: string }
interface Person { age: number }

// Result: { name: string; age: number }
```

```ts
// Type cannot be merged
type Person = { name: string }
// ❌ Cannot redefine "Person" again
```


#### 4. Primitive/object

```ts
type Age = number;
type Name = string;
type IsActive = boolean;

type Animal = {
  name: string;
};
```

```ts
// ❌ This is NOT allowed:
interface Age = number; // ❌ Syntax error

interface User {  // this is allowed
  name: string;
  age: number;
}

```


#### 5. Classes usage

```ts
type Animal = {
  name: string;
  speak(): void;
}

// ❌ Error: A class can only implement an object type or intersection of object types with statically known members
class Dog implements Animal {
  name = "Buddy";

  speak() {
    console.log("Woof!");
  }
}
```

```ts
interface Animal {
  name: string;
  speak(): void;
}

class Dog implements Animal {
  name = "Buddy";

  speak() {
    console.log("Woof!");
  }
}
```
<br>

**Note:** two `interface` can be same and when we use that interface it has combine value in it, but this can not happen in `type` it will show error `Duplicate identifier`

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
<br>

> ### Generic Types

Whatever we put inside the <> is called the generic

```ts
type DataStorage<T> = {
  storage: T[];
  add: (data: T) => void;
};

// Here T is generic means whatever we pass as T, will be its type on every position of T

const textStorage: DataStorage<string> = {
  storage: [],
  add(data) {
    this.storage.push(data);
  },
};

// Above we pass string to be used as generic
```

<br>
<br>

> ### Generic Object Types and Interface
```ts
interface Box {
  contents: any;
}
```
for above requirement, we can make it generic type which is more good

```ts
interface Box<Type> {
 contents: Type;
}

let boxA: Box<string> = { contents: "hello" };
```

also below is generic `type`
```ts
type Box<Type> = {
  contents: Type;
};
```

<br>
<br>

### Generic Functions
- As names, it is generic in nature
- Generic functions are the function in which we pass the type separately as per use everytime we use it

```ts
function firstElement<Type>(arr: Type[]): Type {
  return arr[0];
}

const stringArray: string[] = ["apple", "banana", "orange"];
console.log(firstElement(stringArray)); // Output: "apple"

const stringNumber: number[] = [1, 2, 3];
console.log(firstElement(stringNumber)); // Output: 1
```

- In above we defined that the `Type` let say `string`, it means thaat arr value will be `array of string` and `return` value will be `string`

- Below is one more example, here we pass 2 generic one is 'input' and other is 'output'.

```ts
function merge<T, U>(a: T, b: U) {
  return {
    ...a,
    ...b,
  };
}

const newUser = merge(
  { name: 'Max' },
  { age: 34 }
);

```
<br>

**Extends in generic function**

```ts
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
The provided TypeScript function, longest, is a generic function that takes two parameters of the same type, and the type is constrained to a structure with a length property.

The `extends { length: number }` part is a constraint on the generic type. It means that `Type` must have a `length` property of type `number`.

<br>
<br>

> ### Constraints

We constrain the type parameter to that type by writing an extends clause. Constraint means it should have that property.

```ts
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
<br>

> ### Non-null Assertion Operator (Postfix ! )

important to only use `!` when you know that the value can't be `null` or `undefined`. We are assured ki value milegi hi har case me.

```ts
function liveDangerously(x?: number | null) {
 // No error
 console.log(x!.toFixed());
}
```
or

```ts
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
```
or 

```ts
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
```
- HTMLInputElement should be as per need, syntex is fixed but not value, if we have taken the `<input/>` in html then HTMLInputElement should be used. if `<p></p>` taken then HTMLParagraphElement.

<br>
<br>

> ### Call Signatures

In JavaScript, functions can have properties in addition to being callable. However, the function type expression syntax doesn’t allow for declaring properties. If we want to describe something callable with properties, we can write a call signature in an object type:

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
 
function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";
 
doSomething(myFunc);
```

<br>
<br>


> ### Index Signatures

In TypeScript, index signatures allow you to define a type that represents the `allowable keys` and their corresponding `value types` in `an object`. This is particularly useful when you want to create objects with dynamic keys, where the keys are not known in advance.

The syntax for an index signature looks like this:
```ts
{ 
  [keyType: string]: valueType 
}
```

Here, `keyType` is the type of the keys, and `valueType` is the type of the corresponding values. For example:

```tsx
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

```ts
interface NumberDictionary {
 [index: string]: number;
 length: number; // ok
 name: string; // this is wrong ie Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}
```

<br>
<br>

### The `ReadonlyArray` Type

The `ReadonlyArray` is a special type that describes arrays that shouldn't be changed.

```ts
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

```ts
function doStuff(values: readonly string[]) {
 // We can read from 'values'...
 const copy = values.slice();
 console.log(`The first value is ${values[0]}`);
 // ...but we can't mutate 'values'.
 values.push("hello!");
}

```
<br>
<br>

> ### Record<Keys, Type>

Constructs an `object` type whose property `keys` are `Key`s and whose property `values` are `Type`. This utility can be used to map the properties of a type to another type.

```ts
type CatName = "miffy" | "boris" | "mordred";

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris;
// on hovering cats -> const cats: Record<CatName, CatInfo>
```

<br>
<br>

> ### Tuple Types

A tuple type is another sort of Array type that knows `exactly how many elements it contains`, and exactly which types it contains at specific positions.

```ts
type StringNumberPair = [string, number];
```

- **Note :**Key point to note here `push` is exceptional in tuple. Like if we have defined the tuple then we can push in that. below is example

```ts
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
```ts
type Either2dOr3d = [number, number, number?];
```

<br>
<br>

> ### Generic Classes
```ts
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
<br>
<br>

> ### The `keyof` type operator
The `keyof` operator takes an object type and produces a string or numeric literal union of its keys.

The following type `P` is the same type as `"x" | "y"`:

```ts
type Point = { x: number; y: number };
type P = keyof Point;
```

The following type P is the same type as `type P = "x" | "y"`

<br>

If the type has a `string` or `number` index signature, `keyof` will return those types instead:
```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
```
in above `type A = number`

<br>
<br>

> ### ReturnType<T>

It takes a `function type` and `produces` its `return type`:
```ts
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
 //type K is boolean
```
<br>

If we try to use ReturnType on a function name, we see an instructive error:

```ts
function f() {
 return { x: 10, y: 3 };
}
type P = ReturnType<f>;
//'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```
<br>

**Note:** Remember that `values and types aren't the same thing`. To refer to the `type` that the `value f has`, we use `typeof` :

- typeof - refer to the type of a variable or property which can be string, boolean,etc
- ReturnType - return type of a function type
- ReturnType<typeof f> - provide the type of return of function

```ts
function f() {
 return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;

// onHover we will see type P = {
//   x: number;
//   y: number;
// } 
```
<br>
<br>

### Indexed Access Types
```ts
type Person = { age: number; name: string; alive: boolean };

type I1 = Person["age" | "name"];
 //onHover we will see type I1 = string | number

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
 //onHover we will see type I3 = string | boolean
```
<br>

Another example of `indexing` with an arbitrary type is using `number` to get the type of an array's elements. We can combine this with `typeof` to conveniently capture the element type of an array literal:

```ts
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
<br>

You can only use types when indexing, meaning you can't use a const to make a variable reference:

```ts
const key = "age";
type Age = Person[key];
// error will show Type 'key' cannot be used as an index type. 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
```

However, you can use a type alias for a similar style of refactor:
```ts
type key = "age";
type Age = Person[key];
```

<br>
<br>

### Mapped Types
mapped type is like using mapping function of JS on types of Typescript

```ts
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
<br>
<br>

### Template Literal Types
```ts
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
```


aboves gives on hovering LocaleMessageIDs
```ts
type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
```

<br>
<br>

> ### Typecasting
type casting (aka type assertion) is how you tell the compiler, "Trust me, I know what this value's type actually is." You're essentially overriding TypeScript's inference.

For example, if you’re using `document.getElementById`, TypeScript only knows that this will return some kind of `HTMLElement`, but you might know that your page will always have an `HTMLCanvasElement` with a given ID.

```js
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

or

```js
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

Some more use cases

When we don't know the data which is coming from api, but we want to add limitiations to it. then we do the procedure
```ts
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(Math.random().toString(), text);

  res.status(201).json({message: 'Created the todo.', createdTodo: newTodo});
};
```

in above we states `(req.body as {text: string}).text;` that text will be available and it will be of string

Sometime we need the value of input of html, then we use that in below form
```ts
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = "hi"
```

When to Use Type Casting
- You're getting data from a dynamic source (like any, unknown, or a third-party lib)
- You know more about the type than TypeScript can infer
- You're narrowing types manually (like DOM elements or API results)

<br>
<br>

#### Partial Type in TS

Constructs a type with `all properties` of Type set to `optional`. 

```js
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
<br>
<br>

## React + Typescript Udemy Learning

- `Children` prop will be `ReactNode`

### For destructuring in function

**Method 1**

```ts
export default function CourseGoal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
}
```

**Method 2**

```ts
import { type ReactNode } from 'react';

interface CourseGoalProps {
  title: string;
  children: ReactNode
}

export default function CourseGoal({ title, children }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
}
```

**Method 3**
- To handle children react provide additional like PropsWithChildren
- PropsWithChildren is a generic type means we can provide data in it, like we provide add on data like title in below example

```ts
import { type PropsWithChildren } from 'react';

type CourseGoalProps = PropsWithChildren<{ title: string }>;

export default function CourseGoal({ title, children }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
}
```

<br>
<br>

### For writing a function in arrow function forms

```ts
import { type ReactNode } from 'react';

interface CourseGoalProps {
  title: string;
  children: ReactNode
}

export default function CourseGoal({ title, children }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
}
```

**Above function can be written as following ways**

- ways 1

```ts
import { type PropsWithChildren } from 'react';

interface CourseGoalProps {
  title: string;
  children: ReactNode
}

const CourseGoal = ({ title, children }: CourseGoalProps) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
};

export default CourseGoal;
```

- Ways 2

FC is also generic function, means we can add in it

```ts
import { type FC } from 'react';

interface CourseGoalProps {
  title: string;
  children: ReactNode
}

const CourseGoal: FC<CourseGoalProps> = ({ title, children }) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
};

export default CourseGoal;
```

<br>
<br>

### Handling useState

- useState is generic function so we can assign value in it

```ts
type CourseGoal = {
  title: string;
  description: string;
  id: number;
};

export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);
}
```

<br>
<br>

### Importing and expoting types in ts


**Exporting a Type from One File**
```ts
// types.ts
export type User = {
  id: number;
  name: string;
  email: string;
};
```

**Importing the Type in Another File**

```ts
// another-file.ts
import type { User } from './types';

const getUserName = (user: User): string => {
  return user.name;
};
```

#### Notes

- The `import type` syntax is optional, but it's useful when you're only importing types. It helps TypeScript keep type-only imports out of your compiled JavaScript.
- You can also do a regular import like this (it works the same way):

```ts
import { User } from './types';
```


<br>
<br>


### How to handle event in ts

#### **Common Event Types in React (TypeScript)**

| Event | Type Annotation |
|-------|------------------|
| onClick | MouseEvent<HTMLElement> |
| onChange | ChangeEvent<HTMLInputElement> |
| onSubmit | FormEvent<HTMLFormElement> |
| onKeyDown | KeyboardEvent<HTMLInputElement> |


**Example: Handling an `onClick` Event**

```tsx
import React from 'react';

const ButtonComponent: FC = () => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', event);
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

**Example: `onChange` for an input field**

```tsx
const InputComponent: FC = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Value:', e.target.value);
  };

  return <input type="text" onChange={handleChange} />;
};
```

**Handle Form Event**

```tsx
export default function NewGoal({ onAddGoal }: NewGoalProps) {

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" ref={goal} />
        <button>Add Goal</button>
    </form>
  );
}
```

<br>
<br>

### Handling useRefs in ts

Since useRef is generic function, we can provide type in it

**1. Referencing a DOM Element**

```tsx
import React, { useRef } from 'react';

const InputFocus: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus(); // Safe with optional chaining
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};
```

**2. Storing a Mutable Value (not related to DOM)**

```tsx
const Timer: React.FC = () => {
  const count = useRef<number>(0);

  const increment = () => {
    count.current += 1;
    console.log(count.current);
  };

  return <button onClick={increment}>Increment</button>;
};
```

<br>
<br>

### componentpropswithoutref<elementName> in ts

Lets say we want to use the input element as custom componet, but we want `certain props to be mandatory` and `other props to be optional`, but want `other props be standard` as per input element type not anything can be passed, also the ref should not be passed in component, then we use the componentpropswithoutref

```ts
// customInput.tsx
import { ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({label, id, ...props}: InputProps) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </p>
  );
}

```
-  We're using `ComponentPropsWithoutRef<'input'>` to inherit all valid props for a native `<input> element` `excluding ref`, and combining it with your own custom props like label and id.
- `ComponentPropsWithoutRef<'input'>` restricts `...props to valid input-only props` (not button, etc.).
- ref is intentionally excluded.
- `ComponentPropsWithoutRef<'button'>`, `ComponentPropsWithoutRef<'a'>` can be used as per need


```ts
// app.tsx
import Input from './components/Input.tsx';

function App() {
  return (
    <main>
      <Input id="name" label="Your name" type="text" />
      <Input id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="off"/>
    </main>
  );
}

export default App;
```

<br>
<br>


### Polymorphic Component

Creating a `polymorphic component in TypeScript` means you can `render it as different HTML tags or components`, `using` an as `prop` — like in Chakra UI or Radix.

Example
```tsx
<Text as="h1">Heading</Text>
<Text as="p">Paragraph</Text>
<Text as="button" onClick={() => alert('Clicked')}>Click me</Text>
```

Now below is actual code
if needed video-55,56

```tsx
// in container.jsx
import { type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType> = { 
  as?: T; // ElementType means HTML element type like div,span
  children: ReactNode; // reactNode means JSX
} & ComponentPropsWithoutRef<T>;

export default function Container<C extends ElementType>({ as, children, ...props }: ContainerProps<C>) {
  const Component = as || "div"; // directly using <as></as> is not good way
  return <Component {...props}>{children}</Component>;
}
```

```tsx
// in app.jsx

import Container from './components/Container.tsx';

function App() {
  return (
    <main>
      <Container as={Button}>Click me</Container>
    </main>
  );
}

export default App;
```

<br>
<br>


### ForwardRef in ts

```tsx
// app.tsx
import { useRef } from 'react';

import Input from './components/Input.tsx';

function App() {
  const input = useRef<HTMLInputElement>(null);

  return (
    <main>
      <Input label="Test" id="test" ref={input} />
    </main>
  );
}

export default App;
```

- forwardRef is generic function means we can provide type in it, it accepts two paramter
  1. type of ref we are passing, here we are passing input element so using `HTMLInputElement`
  2. type or interface of `props`
```tsx
// customInput.tsx
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, ...props },
  ref
) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} ref={ref} />
    </p>
  );
});

export default Input;
```

<br>
<br>

### createContext in ts

- createContext is generic function so we can provide type in it

```tsx
const TimersContext = createContext<TimersContextValue | null>(null);
```


<br>
<br>

### Api calling in ts
```tsx
// http.ts
export async function get(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }

  const data = await response.json() as unknown; 
  return data;
}
```

```tsx
// app.tsx

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = (await get(
          'https://jsonplaceholder.typicode.com/posts'
        )) as RawDataBlogPost[];  // Here we are checking the response of api response

        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        // setError('Failed to fetch posts!');
      }

      setIsFetching(false);
    }

    fetchPosts();
  }, []);
}

```

- We can use `zod` library for response data validation

```tsx
import { z } from 'zod';
// other imports ...
 
// outside of App component function (since this doesn't need to be re-created all the time)
const rawDataBlogPostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});
// z.array() is a Zod method that creates a new schema based on another schema
// as the name suggests, it's simply an array containing the expected objects
const expectedResponseDataSchema = z.array(rawDataBlogPostSchema);
 
function App() {
  // other code like useState() etc ...
 
  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = await get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        const parsedData = expectedResponseDataSchema.parse(data);
        // No more type casting via "as" needed!
        // Instead, here, TypeScript "knows" that parsedData will be an array
        // full with objects as defined by the above schema
        const blogPosts: BlogPost[] = parsedData.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        // setError('Failed to fetch posts!');
      }
 
      setIsFetching(false);
    }
 
    fetchPosts();
  }, []);
 
  // other code ...
}
```

- we can create a generic 'get' function

```ts
// http.js

export async function get<T>(url: string) {
  const response = await fetch(url);
 
  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }
 
  const data = await response.json() as unknown; 
  return data as T;
}
```

```tsx
// app.jsx

const data = await get<RawDataBlogPost[]>(
  'https://jsonplaceholder.typicode.com/posts'
);
```

- generic 'get' function with Zod

```tsx
// http.jsx
import { z } from 'zod';
 
export async function get<T>(url: string, zodSchema: z.ZodType<T>) {
  const response = await fetch(url);
 
  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }
 
  const data = (await response.json()) as unknown;
 
  try {
    return zodSchema.parse(data);
  } catch (error) {
    throw new Error('Invalid data received from server.');
  }
}
```

```tsx
// app.jsx
import { z } from 'zod';
 
const rawDataBlogPostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});
 
const data = await get('https://jsonplaceholder.typicode.com/posts', z.array(rawDataBlogPostSchema));
 
data[0].userId; // works => TypeScript knows that userId will exist on the returned data
```

- Below is chatGPT code

```ts
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

// Define the schema using zod
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const UserListSchema = z.array(UserSchema);

// Infer the TypeScript type from the schema
type User = z.infer<typeof UserSchema>;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();

      // Validate the shape of the data
      const data = UserListSchema.parse(json);

      setUsers(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(`Validation error: ${err.errors.map(e => e.message).join(', ')}`);
      } else {
        setError((err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
```

<br>
<br>

### Redux toolkit

#### Handling useSelector and useDispatch
- We want to make the `useSelector hook` to be `typescript`,we create `useCartSelector` custom hook, which is  `ts form of useSelector`.
- we use `TypedUseSelectorHook` from react, it is generic function so we can assign value in it, so we assign the `Rootstate`
- so RootState should be similar to the data managed in our store, means we have to provide store in it
- so we use `store.getState>`, getState provide the store but it is function. and its return value is our store
- `typeof store.getState` provide its type, ie function which gets stored in RootState as type function, but we needed its return value
- now we use `ts uitility function` which provide the return value of function ie `ReturnType`
- whole code becomes `ReturnType<typeof store.getState>`
- same case we do for dispatch but without ReturnType, as we have created the function directly `type DispatchFunction = () => AppDispatch;`


#### Handling the Dispatch Action payload
- when we dispatch some action we pass the payload then the payload should be TS
- `PayloadAction` is a generic function, then we can pas type value in it,
- so we pass the what we are expectiong in it

```ts
// store.ts
import { configureStore } from '@reduxjs/toolkit';

import { cartSlice } from './cart-slice.ts';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```


```ts
// hooks.ts
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

import { AppDispatch, RootState } from './store.ts';

type DispatchFunction = () => AppDispatch;

export const useCartDispatch: DispatchFunction = useDispatch;
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
```

```ts
// app.ts
import { Provider } from 'react-redux';
import { DUMMY_PRODUCTS } from './dummy-products.ts';
import { store } from './store/store.ts';

function App() {
  return (
    <Provider store={store}>
      {DUMMY_PRODUCTS}
    </Provider>
  );
}

export default App;
```

```ts
// cart-slice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ id: string; title: string; price: number }>
    ) {
      // do some action 
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (state.items[itemIndex].quantity === 1) {
        state.items.splice(itemIndex, 1);
      } else {
        state.items[itemIndex].quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
```


```tsx
// usage in card component
import { type CartItem, addToCart, removeFromCart } from '../store/cart-slice.ts';
import { useCartDispatch, useCartSelector } from '../store/hooks.ts';

export default function CartItems() {
  const cartItems = useCartSelector((state) => state.cart.items);
  const dispatch = useCartDispatch();

  function handleAddToCart(item: CartItem) {
    dispatch(addToCart(item));
  }

  function handleRemoveFromCart(id: string) {
    dispatch(removeFromCart(id));
  }

  return (
    <div id="cart">
      {cartItems.map((item) => {
        return 
          <li key={item.id}>
            <button onClick={() => handleRemoveFromCart(item.id)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => handleAddToCart(item)}>+</button>
          </li>
      })}
    </div>
  );
}
```