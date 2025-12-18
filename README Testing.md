## ✅ **Core Jest Knowledge (Must Know)**

### 1️⃣ **Basic Testing Concepts**

* What is unit, integration, and E2E testing
* Test naming conventions (`describe`, `it/test`)
* Test lifecycle (`beforeEach`, `afterEach`, etc.)

1. **Global Setup**

   * `beforeAll()` → runs **once before all tests start**
   * Good for creating DB connections, test server, mock data, etc.

2. **Test-level Setup**

   * `beforeEach()` → runs **before every individual test**
   * Good for resetting variables, re-rendering components, cleaning state

3. **Test Execution**

   * `test()` or `it()` blocks run your actual test logic

4. **Test-level Teardown**

   * `afterEach()` → runs **after every test**
   * Good for cleanup, clearing mocks, timers, DOM cleanup

5. **Global Teardown**

   * `afterAll()` → runs **once after all tests are completed**
   * Good for closing DB connections, shutting down servers, clearing caches

<br>

### 2️⃣ **Matchers (Expect API)**

**Matchers** are built-in helper methods used inside assertions (`expect()`) to **compare actual output with expected output** in different ways (e.g., equality, truthiness, numbers, arrays, objects, strings, exceptions, async).

Example:

```js
expect(value).toBe(expectedValue);
```
<br>

* Common matchers:
  `toBe`, `toEqual`, `toContain`, `toHaveLength`, `toBeTruthy`, `toBeFalsy`
* Deep equality vs reference equality
* Asynchronous matchers: `resolves`, `rejects`, `.toThrow`


### Types of Jest Matchers

**Equality Matchers**

| Matcher     | Description             | Notes                      |
| ----------- | ----------------------- | -------------------------- |
| `toBe()`    | Strict equality (`===`) | Best for primitive values  |
| `toEqual()` | Deep equality           | Best for objects / arrays  |
| `not`       | Negation                | Used as `.not.toBe()` etc. |

<br>

**Example**

```js
expect(10).toBe(10);            // passes
expect({a:1}).toEqual({a:1});   // passes
expect(5).not.toBe(6);          // passes
```
<br>

**Difference: `toBe` vs `toEqual`**

| toBe                                | toEqual                     |
| ----------------------------------- | --------------------------- |
| Uses reference check                | Compares values recursively |
| Fails for objects even if identical | Works for objects/arrays    |

```js
expect({}).toBe({});     // fails
expect({}).toEqual({});  // passes
```

<br>

**Truthiness Matchers**

| Matcher           | Meaning                    |
| ----------------- | -------------------------- |
| `toBeTruthy()`    | Value evaluates to `true`  |
| `toBeFalsy()`     | Value evaluates to `false` |
| `toBeNull()`      | Checks `null`              |
| `toBeUndefined()` | Checks `undefined`         |
| `toBeDefined()`   | Opposite of undefined      |
| `toBeNaN()`       | Value is NaN               |

<br>

Example:
```js
expect(true).toBeTruthy();
expect(0).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect(NaN).toBeNaN();
```

<br>

**Number & Comparison Matchers**

| Matcher                    | Meaning                   |
| -------------------------- | ------------------------- |
| `toBeGreaterThan()`        | >                         |
| `toBeGreaterThanOrEqual()` | >=                        |
| `toBeLessThan()`           | <                         |
| `toBeLessThanOrEqual()`    | <=                        |
| `toBeCloseTo()`            | Floating-point comparison |

<br>

Example:
```js
expect(10).toBeGreaterThan(5);
expect(9.99).toBeCloseTo(10, 1); // avoids float precision issues
```

<br>

**String & Pattern Matchers**

| Matcher     | Meaning               |
| ----------- | --------------------- |
| `toMatch()` | Regex or string match |

Example:
```js
expect("Hello World").toMatch(/World/);
expect("abc123").toMatch("[0-9]+");
```

<br>

**Array & Iterable Matchers**

| Matcher            | Meaning                           |
| ------------------ | --------------------------------- |
| `toContain()`      | Array/string contains item        |
| `toContainEqual()` | Contains object with equal values |

Example:
```js
expect([1,2,3]).toContain(2);

expect([{id:1}, {id:2}]).toContainEqual({id:1});
```

<br>

**Object Matchers**

| Matcher            | Meaning        |
| ------------------ | -------------- |
| `toHaveProperty()` | Object has key |
| `toMatchObject()`  | Partial match  |

Example:
```js
const obj = {name:"John", age:30};

expect(obj).toHaveProperty("age");
expect(obj).toMatchObject({name:"John"}); // partial
```

<br>

**Exception Matchers**

| Matcher          | Meaning                |
| ---------------- | ---------------------- |
| `toThrow()`      | Function throws error  |
| `toThrowError()` | Same but more specific |

Example:
```js
function err() { throw new Error("failed"); }

expect(err).toThrow();
expect(err).toThrow("failed");
```

<br>

**Mock & Spy Matchers**

| Matcher                   | Meaning               |
| ------------------------- | --------------------- |
| `toHaveBeenCalled()`      | Function was called   |
| `toHaveBeenCalledTimes()` | Called n times        |
| `toHaveBeenCalledWith()`  | Called with arguments |
| `toHaveReturned()`        | Returned successfully |

Example:
```js
const fn = jest.fn();
fn("A");

expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledWith("A");
expect(fn).toHaveBeenCalledTimes(1);
```

<br>

**Async / Promise Matchers**

| Matcher    | Meaning          |
| ---------- | ---------------- |
| `resolves` | Promise resolves |
| `rejects`  | Promise rejects  |

Example:
```js
await expect(Promise.resolve("ok")).resolves.toBe("ok");
await expect(Promise.reject("err")).rejects.toBe("err");
```

<br>

### 3️⃣ **Testing Async Code**

* Testing promises
* Testing async/await
* Using `done()` callback when required
* Handling timers with `jest.useFakeTimers`

<br>

**4 Main Ways to Test Async Code in Jest**

| Technique                  | When to Use                      | Syntax                     |
| -------------------------- | -------------------------------- | -------------------------- |
| Return a Promise           | async function returns a promise | `return promise`           |
| Use `async/await`          | Modern & recommended             | `await fn()`               |
| Use `.resolves / .rejects` | For clean promise assertion      | `expect(promise).resolves` |
| Use `done()` callback      | Older callback-based async code  | `done()` argument          |

<br>

**Using async/await (best approach)**

```js
function fetchData() {
  return Promise.resolve("success");
}

test("fetches data with async/await", async () => {
  const data = await fetchData();
  expect(data).toBe("success");
});
```

<br>

**Testing Rejections Using `async/await + try/catch`**

```js
test("error using async/await", async () => {
  try {
    await fetchError();
  } catch (err) {
    expect(err).toBe("error");
  }
});
```

<br>

**Using `.resolves` and `.rejects` (cleanest syntax)**

```js
test("promise resolves", () => {
  return expect(fetchData()).resolves.toBe("success");
});

test("promise rejects", () => {
  return expect(fetchError()).rejects.toBe("error");
});
```

<br>

**Testing Async Code With Callback Style (`done`)**

Used when function expects a callback instead of returning a promise.

```js
function fetchCallback(callback) {
  setTimeout(() => {
    callback("done");
  }, 100);
}

test("callback async", done => {
  fetchCallback(result => {
    expect(result).toBe("done");
    done(); // Important
  });
});
```

If you forget `done()`, Jest will timeout and fail.

<br>

**Testing Async API Calls (Mocking Fetch or Axios)**
```js
import axios from "axios";

jest.mock("axios");

test("mock axios fetch", async () => {
  axios.get.mockResolvedValue({ data: { name: "John" } });

  const response = await axios.get("/user");
  expect(response.data.name).toBe("John");
});
```

<br>

**Testing Timers Using `jest.useFakeTimers()`**

```js
jest.useFakeTimers();

function timerExample(cb) {
  setTimeout(() => cb("done"), 1000);
}

test("timer test", () => {
  const cb = jest.fn();
  timerExample(cb);

  jest.advanceTimersByTime(1000);

  expect(cb).toHaveBeenCalledWith("done");
});
```

<br>

### 4️⃣ **Mocking**

* Function mocks: `jest.fn()`
* Mocking modules: `jest.mock()`
* Mock implementation and mock return values
* Spies: `jest.spyOn()`
* Resetting and clearing mocks


**Mocking** in Jest means **replacing real functions, modules, APIs, timers, or components with simulated (fake) versions** so you can **test behavior without relying on real external dependencies**.

Mocking helps you **isolate** the unit under test by controlling:

* Return values
* Function calls & parameters
* Side effects
* Async behavior
* Errors

Example real-world use cases:

* Mock API calls (Axios, fetch)
* Mock DB services
* Mock timers like `setTimeout`
* Mock utility/helper function
* Mock random values like `Math.random()`
* Mock Date or time

<br>

### Types of Mocking in Jest

| Type           | Meaning                       | Example                     |
| -------------- | ----------------------------- | --------------------------- |
| Manual Mock    | Custom mock implementation    | `/__mocks__/module.js`      |
| Automatic Mock | Jest auto-mocks module        | `jest.mock("module")`       |
| Function Mock  | Fake a single function        | `jest.fn()`                 |
| Spy            | Track original function calls | `jest.spyOn(obj, "method")` |
| Timer Mock     | Fake timers                   | `jest.useFakeTimers()`      |

<br>

**Function Mock using `jest.fn()`**

```js
const mockFn = jest.fn();
mockFn('Hello');

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('Hello');
```

With custom return:

```js
mockFn.mockReturnValue(10);
expect(mockFn()).toBe(10);
```

Async return:

```js
mockFn.mockResolvedValue("done");
await expect(mockFn()).resolves.toBe("done");
```

<br>

**Mocking an imported module**

```js
import axios from "axios";
jest.mock("axios");

test("mock axios", async () => {
  axios.get.mockResolvedValue({ data: { name: "John" } });

  const res = await axios.get("/users");
  expect(res.data.name).toBe("John");
});
```
<br>

**Spy on an existing method**

```js
const user = {
  getName: () => "Alice"
};

test("spy test", () => {
  const spy = jest.spyOn(user, "getName").mockReturnValue("Bob");

  expect(user.getName()).toBe("Bob");
  expect(spy).toHaveBeenCalled();

  spy.mockRestore(); // back to original
});
```

<br>

**Mock Timers**

```js
jest.useFakeTimers();

const callback = jest.fn();

setTimeout(callback, 2000);

jest.advanceTimersByTime(2000);

expect(callback).toHaveBeenCalled();
```
<br>

### 5️⃣ **Snapshot Testing**

* Creating snapshots
* Updating snapshots
* When NOT to use snapshots

<br>

### 6️⃣ **Testing Components (if using React)**

* Using React Testing Library (`@testing-library/react`) with Jest

  * Render and query DOM
  * Fire events (`fireEvent`, `userEvent`)
  * Assertions on UI and accessibility

`@testing-library/react` focuses on testing **how users interact** with your UI rather than implementation details. It encourages **testing UI behavior, accessibility, and real DOM interactions** — not internals.

<br>

**Common Query Methods**

| RTL Method    | Purpose                                     |
| ------------- | ------------------------------------------- |
| `getBy...`    | Find immediately, throws error if not found |
| `queryBy...`  | Returns null instead of throwing            |
| `findBy...`   | Async wait until element appears            |
| `getAllBy...` | Returns multiple elements                   |

Prefer **role-based queries**:

* `getByRole("button")`
* `getByLabelText("Name")`
* `getByPlaceholderText("Search...")`
* `getByText("Login")`

<br>

### Basic Testing Example

```jsx
// Component
const Greeting = ({ name }) => <h1>Hello {name}</h1>;
export default Greeting;
```

```js
// Test
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test("renders greeting", () => {
  render(<Greeting name="Pradeep" />);
  expect(screen.getByText("Hello Pradeep")).toBeInTheDocument();
});
```

<br>

### Testing User Interaction

```jsx
// Component
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
```


```js
// Test
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("increments counter on click", async () => {
  render(<Counter />);
  
  const button = screen.getByRole("button", { name: /increment/i });

  await userEvent.click(button);

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

<br>

### Testing Async Behaviour (API calls / Loaders)

```jsx
// Component example
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => setUser({ name: "John" }), 500);
  }, []);

  return <div>{user ? user.name : "Loading..."}</div>;
}
```


```js
// Test
import { render, screen } from "@testing-library/react";

import UserProfile from "./UserProfile";

test("loads and displays user", async () => {
  render(<UserProfile />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  const name = await screen.findByText("John");
  expect(name).toBeInTheDocument();
});
```

👉 `findBy...` waits automatically for async DOM updates.

<br>

### Mocking APIs (fetch/axios)

```js
jest.mock("axios");
import axios from "axios";
```

```js
axios.get.mockResolvedValue({ data: { name: "John" } });
```

Then assert DOM rendering from API result.

<br>

### Testing Form Inputs

```jsx
<input placeholder="Email" />
```

```js
const input = screen.getByPlaceholderText("Email");
await userEvent.type(input, "john@gmail.com");
expect(input).toHaveValue("john@gmail.com");
```

<br>

### Best Practices
✔ Test behavior, not implementation\
✔ Use `screen` instead of render result variables\
✔ Prefer `userEvent` over `fireEvent`\
✔ Prefer accessibility queries (`getByRole`)\
✔ Avoid snapshots except small components\
✔ One assert per behavior block if possible


> **React Testing Library allows you to test components by interacting with them the same way a user would—focusing on DOM, accessibility roles, and behavior instead of implementation details—using Jest as the underlying test runner.**

<br>

### 7️⃣ **Testing API calls**

* Mocking `fetch`, Axios, or custom HTTP services
* Avoiding real network calls

### 8️⃣ **Testing Redux / Context**

* Mock store or use real but lightweight store
* Verify actions and UI changes

### 9️⃣ **Coverage**

* Coverage report (`--coverage`)
* Understanding threshold settings
* What to exclude (e.g. config, generated files)

<br>

## 🚀 **Advanced Topics (Senior-level Expectations)**

### 🔸 Test Architecture & Quality

* Arrange-Act-Assert (AAA) pattern
* Meaningful test naming
* Avoiding brittle tests / anti-patterns
* What to mock vs. what not to

### 🔸 Performance & CI

* Running tests in CI/CD
* Parallel vs sequential running
* Mocking heavy modules for faster tests

### 🔸 Debugging Tests

* Using `--runInBand`, `--watch`, `--detectOpenHandles`
* Console inspection & test isolation

### 🔸 Custom Matchers

* Extending Jest with your own matchers
* Using libraries like `jest-extended`

<br>

### Bonus Real-world Expectations

A 10+ YOE developer should be able to:

| Expectation                      | ✔️ Competency |
| -------------------------------- | ------------- |
| Decide testing strategy          | Yes           |
| Write clean & maintainable tests | Yes           |
| Guide juniors on best practices  | Yes           |
| Integrate with CI/CD             | Yes           |
| Use mocks smartly                | Yes           |
| Know when NOT to test            | Yes           |

<br>

Great — I'll give you **sample code + interview-style questions + explanations**.

**1. Basic Jest Test Example**
```js
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```js
// sum.test.js
const sum = require('./sum');

describe("Sum function", () => {
  test("adds two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
```

<br>

**2. Async Test Example**

```js
// user.js
async function fetchUser() {
  return { id: 1, name: "John" };
}
module.exports = fetchUser;
```

```js
// user.test.js
const fetchUser = require('./user');

test("resolves user", async () => {
  const user = await fetchUser();
  expect(user).toEqual({ id: 1, name: "John" });
});
```

<br>

**3. Mocking Example (`jest.fn`)**

```js
function greet(getName) {
  return `Hello ${getName()}`;
}

test("mock injected function", () => {
  const mockFn = jest.fn().mockReturnValue("Pradeep");
  expect(greet(mockFn)).toBe("Hello Pradeep");
  expect(mockFn).toHaveBeenCalledTimes(1);
});
```

<br>

**4. Mocking External Modules (Axios)**

```js
// api.js
const axios = require("axios");

async function getUsers() {
  const res = await axios.get("/users");
  return res.data;
}
module.exports = getUsers;
```

```js
// api.test.js
jest.mock("axios");
const axios = require("axios");
const getUsers = require("./api");

test("fetch users", async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1 }] });

  const users = await getUsers();
  expect(users).toEqual([{ id: 1 }]);
  expect(axios.get).toHaveBeenCalledWith("/users");
});
```

<br>

**5. Example Snapshot Test**

```js
test("object snapshot", () => {
  const user = { id: 1, name: "John" };
  expect(user).toMatchSnapshot();
});
```

<br>

**6. Real Interview Questions (Jest)**

### **Basic**

1. What is the difference between `toBe` and `toEqual`?
2. How do you test async code with Jest?
3. What is snapshot testing and when should you avoid it?

### **Intermediate**

4. Difference between `jest.fn()` and `jest.spyOn()`?
5. What is the purpose of `beforeEach` / `afterEach`?
6. How do fake timers work? Explain with `jest.useFakeTimers()`.

### **Senior Level**

7. What are common test anti-patterns?
8. How do you decide what to mock and what not to mock?
9. How do you handle flaky tests in CI/CD?
10. How do you measure the ROI of tests on a medium or large codebase?