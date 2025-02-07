> ###  What is TypeScript and how does it differ from JavaScript?
- TypeScript is a statically-typed superset of JavaScript
- After compiling, TypeScript code is transpiled into standard, browser-compatible JavaScript.

> ### Can you explain what is meant by "TypeScript is a superset of JavaScript"?
- TypeScript is often described as a "superset of JavaScript" because every valid JavaScript code is also a valid TypeScript code.

> ### What are the basic types available in TypeScript?

Common Basic Types in TypeScript

1. **Boolean**: Represents true/false values.
2. **Number**: Applies to both integer and floating-point numbers.
3. **String**: Refers to textual data.
4. **Array**: Offers a flexible way to work with structured data.
5. **Tuple**: Enables the definition of arrays with a fixed number of elements, each potentially of a different data type.

<details>

```js
let employee: [string, number, boolean] = ['John', 35, true];
```
</details>

6. **Enum**: Provides a set of named constants such as days or colors.

<details>

```js
enum WeekDays { Monday, Tuesday, Wednesday, Thursday, Friday }
let today: WeekDays = WeekDays.Wednesday;
```
</details>

7. **Any**: Offers a dynamic type, which can be used to bypass type-checking. It's typically best to be avoided, as it defeats the purpose of using TypeScript, which is primarily focused on static typing. However, there are certain use cases where it becomes necessary.
8. **Void**: Typically used as the return type for functions that don't return a value.
9. **Null and Undefined**: Allow for the assignment of null and undefined values, respectively. However, this isn’t enabled by default, and these are probably better handled using the strict mode settings in TypeScript.
10. **Never**: Represents the type of values that never occur. For instance, the return type of a function that doesn't reach its end or always throws an error.

<details>

```js
function errorMessage(message: string): never {
  throw new Error(message);
}
```
</details>

11. **Object**: Any JavaScript object.
12. **Function**: Denotes a function type.


> ### What are Interfaces in TypeScript and how do they work

interface defines the structure and types of its members

```js
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

Default parameter
```js
function greet(name = "Stranger") {
    console.log(`Hello, ${name}!`);
}
```

Rest Parameters
```js
function introduce(greeting: string, ...names: string[]) {
    console.log(`${greeting}, ${names.join(", ")}!`);
}

introduce("Hello", "Alice", "Bob", "Carol");
```


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
