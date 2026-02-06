> ### React Patterns




> ### What are the limitation of usecontextapi so we used the redux

1. Unnecessary Re-renders (Performance Issue)

<details>

**Problem** - When a context value changes, **all consuming components re-render**, even if they use only a small part of the state.

```jsx
<UserContext.Provider value={{ user, theme }}>
```

If `theme` changes → components using only `user` also re-render.

**Redux advantage**
* Components subscribe to **only the slice they need**
* Uses selectors + memoization

</details>

<br>

2. Not Designed for Complex Global State

<details>

**Context API**

* Best for **static or low-frequency updates**

  * theme
  * auth user
  * language

**Redux**

* Handles:

  * large, deeply nested state
  * frequent updates
  * derived state
  * cross-feature dependencies

</details>

<br>

3. Debugging Is Hard

<details>

Context:

* No time-travel debugging
* No centralized state logs

Redux:

* Redux DevTools
* Action history
* Time travel debugging

</details>

<br>

4. Scalability & Maintainability Issues

<details>

With Context:

```text
AuthContext
ThemeContext
CartContext
UserContext
ProductContext
```

This leads to:

* Provider hell
* Tight coupling
* Harder refactoring

Redux:

* Centralized store
* Feature-based slices
* Predictable structure

</details>

5. Async & Side Effects Are Manual

<details>

Context:

```js
useEffect + fetch + setState
```

Redux:

```js
createAsyncThunk
sagas
RTK Query
```

✔ Cleaner async handling
✔ Better error/loading states

</details>

<br>

> ### How we come up the situation where we needed the redux

**We don’t start with Redux.We adopt Redux when React’s local state and Context API stop scaling**.

1. Props Drilling Becomes Unmanageable

2. Context API Starts Causing Performance Issues

<details>

**Situation**

Context value updates frequently (e.g. filters, cart, notifications).

```js
<GlobalContext.Provider value={{ cart, filters, user }} />
```

**Problem**

* Every update triggers **all consumers to re-render**
* Hard to optimize

**Why Redux**

* Selective subscriptions
* Memoized selectors
* Better performance control

</details>

<br>

3. State Is Shared Across Unrelated Features

<details>

**Situation**

Same state used in:

* Header (cart count)
* Product page
* Checkout page
* Order summary

**Problem**

* Duplicated logic
* Sync issues

**Why Redux**

* Single source of truth
* Consistent data across the app

</details>

<br>

4. Async Logic Gets Messy

<details>

**Situation**

Many API calls:

* Loading
* Success
* Error
* Retry
* Cancellation

```js
useEffect(() => {
  setLoading(true);
  fetchData()
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

**Problem**

* Repeated patterns
* Hard to debug
* Inconsistent states

**Why Redux**

* Thunks / RTK Query
* Standard async lifecycle
* Central error handling

</details>

<br>

5. Debugging & Traceability Become Important

<details>

**Situation**

* Bugs in production
* Hard to reproduce state issues

**Problem**

* No visibility into state changes
* No action history

**Why Redux**

* Redux DevTools
* Action logs
* Time-travel debugging

</details>

<br>
<br>

> ### Difference between useTransition useDeferredValue

<br>

> ### We have below events in react
onKeyDown

onPaste

onClick

onInput

onChange

onSubmit - in form

onMouseLeave

onMouseOver

onDragStart

onDragOver

onDrop

<br>

> ### How to use the props and children in react

<br>

> ### If you have many useState in your components, what are the methods you can reduce

1. Use `useReducer`
2. Group State into a Single Object State
3. Lift State Up (Correct State Ownership)
4. Move Logic into Custom Hooks - You create the state in custom hook, then only single line added in every component, which is less code compare to earlier many useState.

<br>

> ### Features of React 18

1. Concurrency

<details>

A new concept & set of feature that help with state update prioritization, Urgent state updates can be prioritized over less urgent, long-taking (blocking) updates

Concurrency in React 18 means **React can prepare multiple UI updates at the same time and decide which one is more important to show first**, instead of blocking the UI with one long render.

**Why concurrency was needed**

Before React 18:
- Rendering was synchronous & blocking
- A heavy render could:
  - Freeze the UI
  - Delay typing, clicks, or animations

<br>

React 18 fixes this by **splitting rendering into chunks** and scheduling them smartly.

without concurrecny (ie <= React 17)
```js
setUser(u1) // first state update    
setShow(true) // second state update

// setUser is completed then setShow will be done
```


with concurrecny (ie >= React 18)
```js
setUser(u1) // Long taking state update is performed in the background
setShow(true) // whilst the urgent update can be prioritized
```
<br>

#### Key features built on concurrency
1. startTransition
2. useTransition


#### Real-world example

Search input with heavy filtering:
```jsx
onChange={(e) => {
  setSearch(e.target.value); // high priority

  startTransition(() => {
    setFilteredList(filterData(e.target.value)); // low priority
  });
}}
```

</details>

<br>

2. Automatic Batching Everywhere

<details>

**React 17 (Pre-Concurrent)**

In React 17 and earlier, **React only batched updates inside React event handlers**.

✔ Batched:

```jsx
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 17 will re-render once
}
```

❌ Not batched:

```jsx
function increaseCounter(){
  setTimeout(() => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // React 17 re-renders twice
  }, 0);
}
```

So outside React events (e.g., `setTimeout`, Promises, native DOM events), **updates were not batched**.

<br>

**React 18 (Automatic Batching Everywhere)**

React 18 introduced **automatic batching across all contexts** — not just event handlers.

Now the same code above becomes batched even inside:

✅ `setTimeout`\
✅ native event listeners\
✅ async callbacks\
✅ Promises

Example:

```jsx
function increaseCounter(){
  setTimeout(() => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // React 18 batches them -> ONE re-render
  }, 0);
}
```

</details>

<br>

3. Strict Mode Changes (Dev Only)

<details>

**StrictMode** is a **development-only tool** that helps identify:

* Unsafe lifecycle methods
* Side effects in render
* Legacy APIs
* Code that will break with future concurrent features

👉 **It does NOT affect production builds.**

<br>

In **React 17**, Strict Mode mainly focused on **legacy warnings**.

* Warned about:

  * `componentWillMount`
  * `componentWillReceiveProps`
  * `componentWillUpdate`
* Detected:

  * Side effects in `render`
  * Unsafe lifecycles in class components

#### ❌ What React 17 did NOT do:

* ❌ Did **not** double-invoke effects
* ❌ Did **not** simulate re-mounting
* ❌ Did **not** stress-test for concurrent rendering

#### Example (React 17)

```jsx
useEffect(() => {
  console.log("mounted");
}, []);
```

➡️ Runs **once** in development.

<br>

React 18 introduced **new Strict Mode checks** to prepare apps for **Concurrent Rendering**.

#### Major Change: *Intentional Double Invocation*

In **development mode only**, React 18:

* **Mounts → Unmounts → Re-mounts components**
* Re-runs:

  * `useEffect`
  * `useLayoutEffect`
  * Component initialization logic

👉 This helps catch **non-idempotent side effects**.

<br>

🚫 Should You Disable Strict Mode?

❌ **No** (unless debugging legacy code)

Why?

* It exposes real bugs early
* Prevents memory leaks
* Prepares your app for concurrent features

</details>

<br>

4. Imporoved Suspense component

<details>

**Suspense** lets you declaratively handle **loading states** by telling React:

- “This part of the UI may suspend while waiting for something.”

```jsx
<Suspense fallback={<Loader />}>
  <Component />
</Suspense>
```

<br>

**React 17 – Suspense (Limited & Incomplete)**

In **React 17**, Suspense was **NOT a general data-fetching solution**.

What Suspense supported in React 17

✔ **Code splitting only**

* `React.lazy()` + `import()`

```jsx
const Profile = React.lazy(() => import('./Profile'));

<Suspense fallback={<Spinner />}>
  <Profile />
</Suspense>
```

✔ Worked well for **bundle loading**

<br>

#### ❌ What React 17 did NOT support

❌ Suspense for **data fetching**\
❌ Server-side Suspense streaming\
❌ Coordination with concurrent rendering\
❌ Transitions or UI interruption control

> Data-fetching Suspense was **experimental** and unsupported.

<br>

#### React 18 – Suspense Becomes a Core Feature

React 18 turns Suspense into a **first-class concurrent feature**.

#### 1️⃣ Suspense + Concurrent Rendering

* Rendering can **pause, resume, or restart**
* Suspense boundaries isolate slow parts of UI
* Prevents blocking the entire page

```jsx
<Suspense fallback={<Skeleton />}>
  <Comments />
</Suspense>
```

<br>

#### 2️⃣ Suspense for Data Fetching (Framework-Level)

React 18 officially supports Suspense **when used with compatible frameworks**:

✔ Next.js App Router\
✔ Relay\
✔ React Server Components

> ⚠️ React itself still doesn’t provide a built-in data-fetching API.

<br>

#### Important Behavioral Difference

#### React 17

* Suspense fallback **blocks render**
* No prioritization
* All-or-nothing UI

#### React 18

* Suspense boundaries are **interruptible**
* Only the suspended subtree falls back
* Rest of UI stays responsive

<br>

#### 🚫 Common Misconception

> “Suspense fetches data for you”

❌ False

✔ Suspense **coordinates async rendering**\
✔ Data fetching is done by libraries/frameworks

<br>

### Very Simple Suspense Data Fetching Example (React 18)

```js
import React, { Suspense } from "react";

// 1️⃣ Fake API
function fetchMessage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello from Suspense 🚀");
    }, 2000);
  });
}

// 2️⃣ Simple cache
let message;
let promise;

// 3️⃣ Read function
function readMessage() {
  if (message) {
    return message;
  }

  if (!promise) {
    promise = fetchMessage().then((data) => {
      message = data;
    });
  }

  throw promise; // ⬅️ Suspense magic
}

// 4️⃣ Component
function Message() {
  const msg = readMessage();
  return <h2>{msg}</h2>;
}

// 5️⃣ App
export default function App() {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Message />
    </Suspense>
  );
}

```
</details>

<br>

5. React server components

<br>

> ### How does react handles state management or different ways to manage state in react
1. useState
2. useRef
3. useReducer
4. Context API
5. Redux Toolkit

<br>

> ### We have parent, child and grandchild component, we can can pass data from parent to grandchild through props, but can we pass the component from parent to grandchild, if yes then how.

#### 1️⃣ Pass Component as a Prop (Most Common & Clean)
You pass the **component reference**, not JSX.

<details>

```jsx
// Parent.jsx
function Parent() {
  return (
    <Child RenderComponent={GrandChildUI} />
  );
}

function GrandChildUI() {
  return <h3>I am passed as a component</h3>;
}
```
<br>

```jsx
// Child.jsx
function Child({ RenderComponent }) {
  return (
    <div>
      <GrandChild RenderComponent={RenderComponent} />
    </div>
  );
}
```
<br>

```jsx
// GrandChild.jsx
function GrandChild({ RenderComponent }) {
  return (
    <div>
      <RenderComponent />
    </div>
  );
}
```
</details>

<br>

#### 2️⃣ Pass JSX (Element) Instead of Component

👉 Here you pass **already created JSX**.

<details>

```jsx
// Parent.jsx
function Parent() {
  return (
    <Child content={<GrandChildUI />} />
  );
}

function GrandChildUI() {
  return <h3>JSX passed from Parent</h3>;
}
```
<br>

```jsx
// Child.jsx
function Child({ content }) {
  return <GrandChild content={content} />;
}
```
<br>

```jsx
// GrandChild.jsx
function GrandChild({ content }) {
  return <div>{content}</div>;
}
```
</details>

<br>

### 3️⃣ Using `children` (Best Practice – Composition Pattern)

<details>

```jsx
// Parent.jsx
function Parent() {
  return (
    <Child>
      <GrandChildUI />
    </Child>
  );
}

function GrandChildUI() {
  return <h3>Passed using children</h3>;
}
```
<br>

```jsx
// Child.jsx
function Child({ children }) {
  return <GrandChild>{children}</GrandChild>;
}
```
<br>

```jsx
// GrandChild.jsx
function GrandChild({ children }) {
  return <div>{children}</div>;
}
```

</details>

<br>

> ### For the difference between the memo and useMemo
```
https://www.geeksforgeeks.org/difference-between-react-memo-and-usememo-in-react/
```

```js
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}
```


```js
function Child({ count }) {
  console.log("Child rendered");
  return <h2>Count: {count}</h2>;
}

export default React.memo(Child);
```

```js
const Child = React.memo(({ value }) => {
  console.log("Child rendered");
  return <div>{value}</div>;
});
```

<br>

> ### Note:

1. React in-line style has double bracket, `first` one is for the `dynamic value` and `second` one is that react wants value as `object`.
2. Joining label and input, we use `htmlFor=""`, not `for=""`.

    ```js
    <label htmlFor="email">Email:</label>
    <input id="email" type="email" />
    ```

<br>

> ### How to use the useEffect to api call with async

#### Incorrect Code

<details>

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(async () => {
    const result = await axios(
      "http://hn.algolia.com/api/v1/search?query=redux"
    );

    setData(result.data);
  }, []); // Incorrect: async directly in useEffect

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
```
</details>

#### Correct Code

<details>

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://hn.algolia.com/api/v1/search?query=redux"
      );

      setData(result.data);
    };

    fetchData();
  }, []); // Correct: async function inside useEffect

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
```
</details>

<br>

- **`useEffect()` restrictions**:  
  The `useEffect` hook **must return either `undefined` or a cleanup function**, and nothing else.

- **Problem with using async directly in `useEffect`**:  
  If you declare `useEffect(async () => { ... })`, it will return a Promise, which React does not expect. This causes a warning like:  
  _"Warning: useEffect function must return a cleanup function or nothing. Promises and useEffect(async () => …) are not supported..."_

- **Why React warns you**:  
  React interprets any returned value from `useEffect` as a cleanup function. If it’s a Promise instead, this breaks the expected behavior.

<br>

> ### We can store data in const outside function in component, so it loaded first time, but no effect on rerender when state or prop change

<br>

> ### Error boundary is used as package, because error boundries was only available in class components form but now it comes along with react

<br>

> ### Hooks are stored in number which is the sequence declared in the code, not by the name.

<br>

> ### In react,  we have the loaders and actions in react-router, loaders for the get and actions for the rest, action is like earlier we create the form which have action like POST,PATCH etc which work on submit button, it is replaced by action of react-router

<br>

> ### Component and state optimizations
- If you have a piece of state that is initialized by an `expensive computation`, `use` the `state initializer function` `instead` of `executing it directly` because the expensive function will be run only once as it is supposed to. e.g:

```jsx
// instead of this which would be executed on every re-render:
const [state, setState] = React.useState(myExpensiveFn());

// prefer this which is executed only once:
const [state, setState] = React.useState(() => myExpensiveFn());
```


<details>


**Below is the further detail explanation**
When you provide a function to initialize state in `useState`, React will call that function only once during the initial render to set the initial state. This is useful for computationally expensive initializations.

Here's an example to demonstrate this:

```jsx
import React, { useState } from 'react';

function generateInitialCount() {
  console.log('Generating initial count');
  return 10;
}

function Counter() {
  const [count, setCount] = useState(generateInitialCount); // keep in mind, we havn used generateInitialCount not generateInitialCount()

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

In this example, the `generateInitialCount` function will log "Generating initial count" to the console and return `10` as the initial state for `count`. This function is called only once during the initial render. Subsequent re-renders will not call `generateInitialCount` again; they will use the existing state.

If you `pass a function directly` to `useState` `without invoking` it, React will `treat it as` a `lazy initializer` and call it to get the initial state:

<br>

```jsx
const [count, setCount] = useState(() => generateInitialCount());
```

This is equivalent to:

```jsx
const [count, setCount] = useState(generateInitialCount);
```

Both approaches ensure that the initialization function runs only once during the first render. Subsequent state updates and re-renders will persist the state without calling the initialization function again.

<br>

**Below is my fruther details ask**

```
1. const [state, setState] = React.useState(myExpensiveFn());

2. const [state, setState] = React.useState(() => myExpensiveFn());

why 2 is most preferred method over 1, but you said both are same
```


I apologize for any confusion. The two lines are not the same, and the second method is preferred for a reason.

Here's the difference:

1. **First method**: `const [state, setState] = React.useState(myExpensiveFn());`
    - This immediately invokes `myExpensiveFn()` during each render and passes the result to `useState`.
    - This means `myExpensiveFn()` runs every time the component renders, which can be inefficient if the function is expensive.

2. **Second method**: `const [state, setState] = React.useState(() => myExpensiveFn());`
    - This passes a function to `useState`, and React will only call this function to get the initial state value during the initial render.
    - This approach ensures that `myExpensiveFn()` runs only once, making it more efficient.

The preferred method (2) ensures that the expensive computation is only done once, during the initial render, and not on every re-render. Here’s a quick comparison:

#### Example:

```jsx
import React, { useState } from 'react';

function myExpensiveFn() {
  console.log('Running expensive computation...');
  return 10;
}

function ExampleComponent() {
  // Method 1
  const [state1, setState1] = useState(myExpensiveFn());

  // Method 2
  const [state2, setState2] = useState(() => myExpensiveFn());

  return (
    <div>
      <p>State 1: {state1}</p>
      <p>State 2: {state2}</p>
    </div>
  );
}

export default ExampleComponent;
```

#### When you use Method 1:
- `myExpensiveFn()` runs every time `ExampleComponent` renders.

#### When you use Method 2:
- `myExpensiveFn()` runs only once during the initial render of `ExampleComponent`.

Method 2 is more efficient, especially if `myExpensiveFn()` involves heavy computations, network requests, or other expensive operations.

</details>


<br>

> ### useNavigation can be used, 
```jsx
import { useNavigation } from "react-router-dom";

function SomeComponent() {
  const navigation = useNavigation();
  navigation.state;
  navigation.location;
  navigation.formData;
  navigation.json;
  navigation.text;
  navigation.formAction;
  navigation.formMethod;
  navigation.formEncType;
}
```

navigation.state has idle → loading → idle, which can be used for loader (circle wala)

<br>


> ### In react, all synthetic events like focus,blur,and change bubbles except scroll

<br>


> ### useState is async
Multiple state updates inside an event handler function are **batched**, so they happen all at once, **causing only one re-render**. This means we can **not access a state variable immediately after updating it**. State updates are **async**. Since React 18, batching also happens in timeouts, promises, and native event handlers.


<br>


> ### How usestate is async
Basically, the thing is you don't get update value right after updating state.

**See all the console of the code after clicking both button**

```jsx
import { useState } from "react";

export function App() {
    const [count, setCount] = useState(0);
    const handleCount = () => {
        setCount(count + 1);
        console.log(count)
        setCount(count + 1);
        console.log(count)
        setCount(count + 1);
        console.log(count)
    };

    const handleCountCallback = () => {
        setCount(count => count + 1);
        console.log(count)
        setCount(count => count + 1);
        console.log(count)
        setCount(count => count + 1);
        console.log(count)
    };

    return (
        <div className="App">
            <div>
                <h2>Count Without useEffect</h2>
                <h3>Count: {count}</h3>
                <button onClick={handleCount}>Count++</button>
                <button onClick={handleCountCallback}>Count++ callback</button>
            </div>
        </div>
    );
}

```

### **Why `handleCount` only increases by 1 (not 3)?**

<details>

In `handleCount`, you're calling `setCount(count + 1)` three times in a row. However, React's state updates are **asynchronous** and **batched** for performance reasons. 

Here's the key points:
1. When you call `setCount(count + 1)`, the value of `count` inside the function refers to the **current state** at the time the function was executed (closure). 
2. Even though you call `setCount(count + 1)` multiple times, React batches these updates, effectively overwriting previous calls. Therefore, the final value of `count` after all three calls will reflect only **one increment** by the end of the render cycle.

</details>

<br>

### **Why `handleCountCallback` increases by 3?**

<details>

In `handleCountCallback`, you're using the callback form of `setCount`: 
```javascript
setCount(count => count + 1);
```

Here's why this works as expected:
1. The callback form of `setCount` ensures that you work with the **most recent state value** in each call.
2. React processes these updates sequentially, applying each callback to the updated state. This means:
   - The first call increments the state from `count` to `count + 1`.
   - The second call starts with the updated state and increments it again.
   - The third call starts with the new state and increments it once more.

Thus, the state ends up incrementing by 3.

</details>

<br>

> ### What is React?

React is an `open-source front-end JavaScript library` that is used for building user interfaces, especially for `single-page applications`

<br>


> ### What are the major features of React?
- JSX syntax, a syntax extension of JS that allows developers to write HTML in their JS code.
- VirtualDOM
- reusable/composable


<br>

> ### What are the advantages of React?
Below are the list of main advantages of React,

- Increases the application's performance with Virtual DOM.
- JSX makes code easy to read and write.
- It renders both on client and server side (SSR).
- Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
- Easy to write unit and integration tests with tools such as Jest.


<br>


> ### What are the limitations of React?
Apart from the advantages, there are few limitations of React too,

- React is just a view library, not a full framework.
- There is a learning curve for beginners who are new to web development.
- Integrating React into a traditional MVC framework requires some additional configuration.
- The code complexity increases with inline templating and JSX.
- Too many smaller components leading to over engineering or boilerplate.

<br>

> ### Pure React in HTML file, below we haven't used the JSX

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello React!</title>
  </head>
  <body>
    <div id="root"></div>

    <script
      src="https://unpkg.com/react@18/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
      crossorigin
    ></script>

    <script>
      function App() {
        // const time = new Date().toLocaleTimeString();
        const [time, setTime] = React.useState(new Date().toLocaleTimeString());

        React.useEffect(function () {
          setInterval(function () {
            setTime(new Date().toLocaleTimeString());
          }, 1000);
        }, []);

        return React.createElement("header", null, `Hello React! It's ${time}`);
      }

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(React.createElement(App));
    </script>
  </body>
</html>
```

<br>



> ### What is JSX?

- JSX stands for JavaScript XML.
- Basically it just provides the `syntactic sugar` for the `React.createElement(type, props, ...children)` function, 
- **In children, we can have children component or we can have the text which we want to show**

The `Babel convert the JSX to React.createElement to pure javascript`

In the example below, the text inside `<h1>` tag is returned as JavaScript function to the render function.

```jsx
export default function App() {
  return (
      <h1 className="greeting">{"Hello, this is a JSX Code!"}</h1>
  );
}
```

If you `don't use JSX syntax` then the respective JavaScript code should be written as below,

```jsx
import { createElement } from 'react';

export default function App() {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello, this is a JSX Code!'
  );
}
```

**Do the below HTML code using react**
```html
<div id="container">
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
</div>
```

Below is the solution

<details>

```js
const heading1 = React.createElement(
  "h1",
  {
    id: "title1",
  },
  "Heading 1"
)

const heading2 = React.createElement(
  "h2",
  {
    id: "title2",
  },
  "Heading 2"
)

const conatiner = React.createElement(
  "div",
  {
    id: "container",
  },
  [heading1, heading2]
)

const root = ReactDOM.createRoot(
  document.getElementById("root")
)
root.render(container)
```

</details>
<br>

> ### What is the difference between Element and Component?

<details>

An Element is a `plain object`, describing what you want to appear on the screen in terms of the DOM nodes or other components. Elements can contain other Elements in their props. Creating a React element is cheap. Once an element is created, it cannot be mutated.

The JavaScript representation(Without JSX) of React Element would be as follows:

```jsx
const element = React.createElement("div", { id: "login-btn" }, "Login");
```

and this element can be simiplified using JSX

```jsx
<div id="login-btn">Login</div>
```

The above React.createElement() function returns an object as below:

```jsx
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```

Finally, this element renders to the DOM using `ReactDOM.render()`.


Whereas a `component` can be declared in several different ways.

```jsx
const Button = ({ handleLogin }) => (
  <div id={"login-btn"} onClick={handleLogin}>
    Login
  </div>
);
```

Then JSX gets transpiled to a `React.createElement()` function tree:

```jsx
const Button = ({ handleLogin }) =>
  React.createElement(
    "div",
    { id: "login-btn", onClick: handleLogin },
    "Login"
  );
```

</details>

<br>

> ### Why should we not update the state directly?

If you try to update the state directly then it won't re-render the component.

```jsx
//Wrong
this.state.message = "Hello world";
```

Instead use setState() method. It schedules an update to a component's state object. When state changes, the component responds by re-rendering.

```jsx
//Correct
this.setState({ message: "Hello World" });
```

<br>

> ### Custom Hooks and its Rules

- Outsource `stateful logic into reusable functions`.
- Custom hooks is like `component but without JSX`.
- Custom hook also return something in component where we used, you just need the `return` in hook

Simple term : The custom hooks are the function which we can use in many components. It makes reuseability of functions.


#### 1. Always start the name with `use`

This is how React knows it’s a hook.

#### 2. Only call hooks at the top level

Just like with normal hooks, **don’t call custom hooks inside loops, conditions, or nested functions**.

```js
// ✅ valid
function MyComponent() {
  const { value } = useMyCustomHook();
}
```

```js
// ❌ invalid
if (someCondition) {
  useMyCustomHook(); // don't do this
}
```


#### 3. Only call hooks from React functions
> That means: React components or other custom hooks.

```js
// ✅ valid
function useMyHook() {
  const [count, setCount] = useState(0);
}
```

```js
// ❌ invalid
function regularJSFunction() {
  useState(0); // not allowed here
}
```

#### 4. Custom hooks can use other hooks

In normal js function. we can't use the hooks

```js
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return { count, increment, decrement };
}
```
<br>

**Simple example of custom hooks**

```js
// useCounter.js

import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

export default useCounter;
```

```js
// CounterComponent.js

import React from 'react';
import useCounter from './useCounter';

function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>➕</button>
      <button onClick={decrement}>➖</button>
      <button onClick={reset}>🔄</button>
    </div>
  );
}

export default CounterComponent;
```


<br>

> ### Conditional rendering in React 

1. **Using `if` statement**

    ```jsx
    if (isLoggedIn) {
      return <Dashboard />;
    }
    return <Login />;
    ```

2. **Ternary operator (`? :`)**

    ```jsx
    {isLoggedIn ? <Dashboard /> : <Login />}
    ```

3. **Logical AND (`&&`)**

    ```jsx
    {isAdmin && <AdminPanel />}
    ```

4. **Switch-case style rendering**

    ```jsx
    switch (status) {
      case 'loading':
        return <Spinner />;
      case 'error':
        return <ErrorMessage />;
      case 'success':
        return <Success />;
      default:
        return null;
    }
    ```
<br>

**Can also be done with an object map for cleaner code:**

```jsx
const renderMap = {
  loading: <Spinner />,
  error: <ErrorMessage />,
  success: <Success />
};

return renderMap[status] || null;
```
<br>

> ### What is the difference between HTML and React event handling?

  1. In HTML, the event name usually represents in _lowercase_ as a convention:

       ```html
       <button onclick="activateLasers()"></button>
       ```

       Whereas in React it follows _camelCase_ convention:

       ```jsx harmony
       <button onClick={activateLasers}>
       ```

  2. In HTML, you can return `false` to prevent default behavior:

       ```html
       <a
         href="#"
         onclick='console.log("The link was clicked."); return false;'
       />
       ```

       Whereas in React you must call `preventDefault()` explicitly:

       ```javascript
       function handleClick(event) {
         event.preventDefault();
         console.log("The link was clicked.");
       }
       ```

  3. In HTML, you need to invoke the function by appending `()`
       Whereas in react you should not append `()` with the function name. (refer "activateLasers" function in the first point for example)

<br>



> ### How to pass a parameter to an event handler or callback?

  You can use an _arrow function_ to wrap around an _event handler_ and pass parameters:

  ```jsx
  <button onClick={() => handleClick(id)} />
  ```

  This is an equivalent to calling `.bind`:

  ```jsx
  <button onClick={handleClick.bind(this, id)} />
  ```

  Apart from these two approaches, you can also pass arguments to a function which is defined as arrow function

  ```jsx harmony
  <button onClick={handleClick(id)} />;
  handleClick = (id) => () => {
    console.log("Hello, your ticket number is", id);
  };
  ```

<br>


> ### What are synthetic events in React?

`SyntheticEvent` is a cross-browser wrapper around the browser's native event. Its API is same as the browser's native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers. The native events can be accessed directly from synthetic events using `nativeEvent` attribute.


<br>


> ### trick in module.css in react

when we get the class which is not inside the component we use the global, like react router provide active class in route

```css
.nav :global(.active){
  background-color: #ffff;
}
```

<br>

> ### Module CSS

- General css is global in nature means whether we import in component or in app file. It will be applicable in all area, so to overcome this limitation, we use mdoule css

- CSS module let you use the same css class name in different files without worrying about naming clashes

- CSS files in which all class names and animation names are scoped locally by default.

- syntex of file => name.module.css, eg app.module.css

- In js, 

```js
import styles from "./app.module.css"

<h1 className={styles.txt}>Hello</h1>
```

- If CSS class have '-' inside its name, then className={classes['main-image']}

<br>

> ### We can use the JSON-Server to get temp backend in our frontend project.

<br>

> ### `useRef` vs `useState`

| Feature | `useRef` | `useState` |
|--------|----------|------------|
| Triggers re-render on change | ❌ No | ✅ Yes |
| Ideal for DOM access | ✅ Yes | ❌ No |
| Good for non-UI values (timers, IDs) | ✅ Yes | ❌ Not ideal |
| Recommended for UI/data logic | ❌ Not really | ✅ Yes |

<br>

**1 You don’t need a re-render** when the value changes.
   - `useRef` keeps a mutable object that doesn’t trigger a re-render when its `.current` value is updated.
   - Example: Tracking previous values, DOM elements, timers.

   ```js
   const countRef = useRef(0);
   countRef.current += 1; // Won't re-render
   ```
<br>

**2 You want to access DOM elements directly.**
   - Like using `ref` in vanilla JS.
   - Example: Focusing an input on load.

   ```js
   const inputRef = useRef();
   useEffect(() => {
     inputRef.current.focus();
   }, []);
   ```
<br>

**3 You need to keep track of values between renders without triggering re-renders.**
   - Useful for things like:
     - Timeout IDs
     - Scroll position
     - Previous props/state
     - Preventing stale closures

   ```js
   const timeoutRef = useRef(null);
   useEffect(() => {
     timeoutRef.current = setTimeout(...);
     return () => clearTimeout(timeoutRef.current);
   }, []);
   ```
<br>

**4 The value is part of UI logic.**
   - Like toggling visibility, managing form input values, updating lists, etc.

   ```js
   const [isVisible, setIsVisible] = useState(true);
   ```

<br>

> ### What are forward refs?
Ref forwarding is a feature that lets some components take a ref they receive, and pass it further down to a child.

Try to `use less ref` hook because it directly `update the DOM` without comparing the virtual DOM in storage

```js
import React, { forwardRef } from 'react';

const Input = (props, ref) => {   // keep in mind, ref props me nhi aaya h
  return <input ref={ref} {...props} />;
};

export default forwardRef(Input);
```


```js
import React, { useRef, useEffect } from 'react';
import Input from './Input';

function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <Input placeholder="Type here" ref={inputRef} />
    </div>
  );
}
```

<br>

### Lazy Loading

> Load code only when needed, it helps improve performance by reducing the initial bundle size.

We wanna split our code into multiple chunks or into multiple bundles which are each only downloaded when they are needed or clicked.

React provides `React.lazy()` and `Suspense` to handle this natively.


```js
// Dashboard.js
import React from 'react';

export default function Dashboard() {
  return <h1>Welcome to the Dashboard!</h1>;
}
```

```js
// App.js
import React, { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<p>Loading Dashboard...</p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

export default App;
```


#### Lazy load on route change (React Router v6+)

```js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

<br>

> ### What is useImperativeHandle

`useImperativeHandle`, which is used `with forwardRef` when you want to `expose custom methods or properties` to the parent that uses the ref ie child component


**Example: Modal Component with useImperativeHandle**

- useImperativeHandle should return object having functions like method which we use in parent component

```ts
// child component

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

const Modal = forwardRef((props, ref) => {   //keep in mind ref does not come in props while using forward ref
  const [isOpen, setIsOpen] = useState(false);

  // Expose open and close methods
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p>This is a modal</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
});

export default Modal;

// Just for demo styling
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '1rem 2rem',
    borderRadius: '8px',
  },
};
```


```ts
// parent component
import React, { useRef } from 'react';
import Modal from './Modal';

function App() {
  const modalRef = useRef();

  return (
    <div>
      <h1>Hello!</h1>
      <button onClick={() => modalRef.current?.open()}>Open Modal</button>
      <Modal ref={modalRef} />
    </div>
  );
}
```

<br>


> ### What is Virtual DOM? How Virtual DOM works?

The Virtual DOM (VDOM) is an `in-memory representation of Real DOM`. The representation of a UI is kept in memory and `synced with the "real" DOM`. It's a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called `reconciliation`.

The Virtual DOM works in three simple steps.

  1. Whenever any underlying data changes, the entire UI is re-rendered in Virtual DOM representation.
  2. Then the difference between the previous DOM representation and the new one is calculated.
  3. Once the calculations are done, the real DOM will be updated with only the things that have actually changed.


<br>


> ### What is the difference between Shadow DOM and Virtual DOM?
The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components.\
The Virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs.

<br>

### Shadow DOM

The Shadow DOM is a part of the Web Components standard, providing `encapsulation for DOM and CSS` or `separate environment dom, css from global environment`. It allows developers to create components with their own isolated DOM tree and styles, preventing style and script interference from the rest of the document.

**Note:** Keep in mind that, agr custom component hum bnate h to uski css global css ko pollute/overwrite kr sakti h, so separete environment bnate h jo global environment or css ko pollute nhi karti.

#### Key Features:
- Encapsulation: Styles and scripts in a shadow DOM do not affect the rest of the document.
- Scoped Styles: CSS styles defined inside a shadow DOM are scoped to that shadow tree.
- DOM Isolation: Elements inside a shadow DOM are hidden from the main document's DOM tree.

#### Example of Shadow DOM:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shadow DOM Example</title>
  <style>

  <style
</head>
<body>
  <p> Hi, im global p </p>
  <my-component></my-component>

  <script>
    class MyComponent extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
          <style>
            p {
              color: blue;
            }
          </style>
          <p>Hello from Shadow DOM!</p>
        `;
      }
    }

    customElements.define('my-component', MyComponent);
  </script>
</body>
</html>
```

**In above example p of shadow colors will change only**

<br>

### Virtual DOM

The Virtual DOM is a concept used primarily in libraries like React to optimize UI rendering. It creates a lightweight in-memory representation of the actual DOM, allowing for efficient updates and re-renders.

#### Key Features:
- Performance: Minimizes direct DOM manipulations, which are costly operations.
- Diffing: Calculates the minimal set of changes needed to update the real DOM.
- Reconciliation: Efficiently updates the real DOM based on changes in the virtual DOM.

#### Example of Virtual DOM using Functional Components in React:
```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('root'));
```

### Summary

The Shadow DOM focuses on encapsulation and isolation, while the Virtual DOM aims to optimize rendering performance.

<br>

> ### What is Lifting State Up in React?
When several components need to share the same changing data then it is recommended to lift the shared state up to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.

<br>


> ### Why fragments are better than container divs?
Below are the list of reasons to prefer fragments over container DOM elements,

- Fragments are a `bit faster` and `use less memory` by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
- Some CSS mechanisms like Flexbox and CSS Grid have a special parent-child relationships, and `adding divs` in the middle makes it `hard to keep the desired layout`.
- The `DOM Inspector` is `less cluttered`.

fragments in JS

1. <></>

2. <React.fragment></React.fragment>

3. `<div></div>`


<br>

> ### What are Keyed Fragments?

The Fragments declared with the explicit <React.Fragment> syntax may have keys. The general use case is mapping a collection to an array of fragments as below,

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

**Note**: key is the only attribute that can be passed to Fragment. In the future, there might be a support for additional attributes, such as event handlers.

<br>

> ### How to use innerHTML in React?
The `dangerouslySetInnerHTML` attribute is React's replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:

```js
function createMarkup() {
  return { __html: "First &middot; Second" };
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```


<br>


> ### Importance of Keys in React
Keys are significant in React because they aid in determining whether items in a list have been changed, updated, or removed. This process helps React to optimize the rendering by recycling existing DOM elements.

When an element's key changes, React will create a new component instance rather than update the current one. This is why keys need to be stable in a list.


<br>


> ### What is the impact of indexes as keys?

- **Keys help React identify which items have changed, are added, or are removed.**
- React uses keys to **track and optimize component updates**.
- If the **order of items changes** and **keys are based on index**, React may **re-render all items unnecessarily**, impacting performance.
- **Example scenario**:  
  - You have a list of posts.
  - You use the post index as the key.
  - A new post is inserted at the start of the list.
  - All keys shift, causing **all post components to re-render**.
- A better approach is to use a **unique ID** (like `post.id`) as the key.
- This way, React only **re-renders the new post**, not the entire list.

<br>


> ### prop-types - How to apply validation on props in React?

it is external package

The set of predefined prop types:

- PropTypes.number
- PropTypes.string
- PropTypes.array
- PropTypes.object
- PropTypes.func
- PropTypes.node
- PropTypes.element
- PropTypes.bool
- PropTypes.symbol
- PropTypes.any


The Equivalent Functional Component

```jsx
import React from "react";
import PropTypes from "prop-types";

function User({ name, age }) {
  return (
    <>
      <h1>{`Welcome, ${name}`}</h1>
      <h2>{`Age, ${age}`}</h2>
    </>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
```

<br>

> ### What will happen if you use props in initial state?

<details>

```jsx
import React, { useState } from 'react';

const MyComponent = (props) => {
  // Don't do this! It breaks the principle of immutability with props.
  const [myState, setMyState] = useState(props.initialValue);

  // Rest of your component logic...

  return (
    <div>
      {/* Your component UI */}
    </div>
  );
};

export default MyComponent;
```
<br>

Above leads to unexpected behaviour.

This will work for the first time, state value sets to initial value, but when the component re-renders, at that time useState value of `mystate` do `not reset`. `During the rerender` the `state preserves` the previous state or value in it. So when `props` value `from` the `parent changes`, the `child gets rerendered` but it `don't have the updated value` in it.

<br>

below is the code you should better to use

```jsx
import React, { useState } from 'react';

const MyComponent = (props) => {
  // Don't do this! It breaks the principle of immutability with props.
  const [myState, setMyState] = useState(props.initialValue);

  useEffect(() => {
    // Update the state when the props change
    setMyState(props.initialValue);
  }, [props.initialValue]);

  // Rest of your component logic...

  return (
    <div>
      {/* Your component UI */}
    </div>
  );
};

export default MyComponent;
```

</details>

<br>

> ### console of component, also How to pretty print JSON with React?

```jsx
import React from 'react';

export function App(props) {

  const jsonData = {
    key1: 'value1',
    key2: 'value2',
    key3: {
      nestedKey1: 'nestedValue1',
      nestedKey2: 'nestedValue2'
    }
  };


  console.log(<PrettyPrintJSON data={jsonData} />)

  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <PrettyPrintJSON data={jsonData} />
    </div>
  );
}

const PrettyPrintJSON = ({ data }) => {
  // Use JSON.stringify with third and fourth parameters for pretty printing
  const prettyJSON = JSON.stringify(data, null, 2);

  return (
    <pre>
      {prettyJSON}
    </pre>
  );
};

export default PrettyPrintJSON;
```

- when we see in the console, we see all the details of the components in the form of objects.

- we see the `$$typeof : Symbol(react.element)`, symbole is added here because the symbol can not be passed through the JSON. It prevents from XSS.


- In below code,

```js
 console.log(<PrettyPrintJSON data={jsonData} />)

 // or

  console.log(PrettyPrintJSON())
```

we can also `console or use in the code` in the form of function call, it gives the almost same output, but things will be different because React now don't see as component instance,  it sees as raw react element.

<br>

> ### How you implement Server Side Rendering or SSR?

React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.

```jsx
import ReactDOMServer from "react-dom/server";
import App from "./App";

ReactDOMServer.renderToString(<App />);
```

This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.

<br>

> ### How to loop inside JSX?

```jsx
<tbody>
  {items.map((item) => (
    <SomeComponent key={item.id} name={item.name} />
  ))}
</tbody>
```

<br>

> ### Abort controller in react

```jsx
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data', { signal });
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request was aborted');
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function to abort the request when the component is unmounted
      abortController.abort();
    };
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  return (
    <div>
      {loading && <p>Loading...</p>}
      {data && (
        <div>
          {/* Render your data here */}
          <p>{data.someProperty}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;

```

<br>

> ### Is it possible to use React without rendering HTML?

  It is possible. Below are the possible options:

  ```jsx
  render() {
    return false
  }
  ```

  ```jsx
  render() {
    return true
  }
  ```

  ```jsx
  render() {
    return null
  }
  ```

  React version >=16.0.0:

  ```jsx
  render() {
    return []
  }
  ```

  ```jsx
  render() {
    return ""
  }
  ```

  React version >=16.2.0:

  ```jsx
  render() {
    return <React.Fragment></React.Fragment>
  }
  ```

  ```jsx 
  render() {
    return <></>
  }
  ```

  React version >=18.0.0:

  ```jsx
  render() {
    return undefined
  }
  ```
<br>

> ### How to focus an input element on page load?

```jsx
import React, { useEffect, useRef } from "react";

const App = () => {
  const inputElRef = useRef(null);

  useEffect(() => {
    inputElRef.current.focus();
  }, []);

  return (
    <div>
      <input defaultValue={"Won't focus"} />
      <input ref={inputElRef} defaultValue={"Will focus"} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
```

<br>

> ### What are the possible ways of updating objects in state in react?

1. Using the spread operator:

```jsx
const [state, setState] = useState({ key1: 'value1', key2: 'value2' });

const updateState = () => {
  setState(prevState => ({ ...prevState, key1: 'new value' }));
};

```

2. Using Object.assign():

```jsx
const [state, setState] = useState({ key1: 'value1', key2: 'value2' });

const updateState = () => {
  setState(prevState => Object.assign({}, prevState, { key1: 'new value' }));
};

```

3. Updating nested objects:
If your state contains nested objects, you should ensure immutability at each level:

```jsx
const [state, setState] = useState({ nested: { key1: 'value1', key2: 'value2' } });

const updateState = () => {
  setState(prevState => ({
    ...prevState,
    nested: { ...prevState.nested, key1: 'new value' }
  }));
};

```

<br>

> ### How to use https instead of http in create-react-app?

You just need to use `HTTPS=true` configuration. You can edit your `package.json` scripts section:

```js
"scripts": {
  "start": "set HTTPS=true && react-scripts start"
}
```

or just run `set HTTPS=true && npm start`


<br>


> ### How to update a component every second?

```jsx
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Set up an interval to update the component every second
    const intervalId = setInterval(() => {
      // Update the state to trigger a re-render
      setCounter(prevCounter => prevCounter + 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <p>Counter: {counter}</p>
    </div>
  );
};

export default MyComponent;
```

<br>


> ### How to programmatically trigger click event in React?
Same as we did for the focus, just replace focus with click

<br>



> ### What are render props?

**Render Props** is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element

```jsx
// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  return (
    <div>
      <h2>Parent Component</h2>
      <ChildComponent render={(data) => <p>Data from parent: {data}</p>} />
    </div>
  );
};

export default ParentComponent;
```

```jsx
// ChildComponent.js
import React from 'react';

const ChildComponent = ({ render }) => {
  const dataFromParent = "Hello from Parent";

  return (
    <div>
      <h3>Child Component</h3>
      {render(dataFromParent)}
    </div>
  );
};

export default ChildComponent;
```


<br>


> ### What is the purpose of push() and replace() methods of history?

If you think of the `history` as an `array of visited locations`, `push()` will add a new location to the array and `replace()` will replace the current location in the array with the new one.

<br>


> ### How to pass params to history.push method in React Router v4?

```jsx
this.props.history.push({
  pathname: "/template",
  search: "?name=sudheer",
  state: { detail: response.data },
});
```
<br>

> ### What are the differences between redux-saga and redux-thunk?

Both _Redux Thunk_ and _Redux Saga_ take care of dealing with side effects. In most of the scenarios, Thunk uses _Promises_ to deal with them, whereas Saga uses _Generators_. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them. But both middleware can coexist, so you can start with Thunks and introduce Sagas when/if you need them.


<br>


> ### Why are inline ref callbacks or functions not recommended?

If the ref callback is defined as an inline function, it `will get` `called twice` during updates, `first with null` and then `again with the DOM element`. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one.

```jsx
// Less performant (creates a new function on every render)
const MyComponent = () => {
  const myInputRef = useRef(null);

  return <input ref={(input) => { myInputRef.current = input; }} />;
};

// More performant (assigns the ref once during initialization)
const MyComponent = () => {
  const myInputRef = useRef(null);

  return <input ref={myInputRef} />;
};
```

<br>



> ### What are HOC factory implementations?

A Higher-Order Component (HOC) factory is a function that returns a Higher-Order Component. In React, a Higher-Order Component is a function that takes a component and returns a new component with additional props, state, or behavior. A HOC factory is essentially a function that generates HOCs with specific configurations.

```jsx
import React, { useEffect } from 'react';

const withLogger = (WrappedComponent, logMessage) => {
  // Return a new functional component (HOC)
  return (props) => {
    // useEffect to log when the component mounts and unmounts
    useEffect(() => {
      console.log(`${logMessage}: Component ${WrappedComponent.name} mounted`);
      
      // Cleanup function for componentWillUnmount
      return () => {
        console.log(`${logMessage}: Component ${WrappedComponent.name} will unmount`);
      };
    }, []); // Empty dependency array ensures the effect runs only on mount and unmount

    // Render the original component with its props
    return <WrappedComponent {...props} />;
  };
};

// Usage of the HOC factory
const MyComponent = ({ name }) => {
  return <div>{`Hello, ${name}!`}</div>;
};

const LogEnhancedComponent = withLogger(MyComponent, 'Log Message');

// Usage of the enhanced component
const App = () => {
  return <LogEnhancedComponent name="John" />;
};

export default App;
```

- The `withLogger` HOC factory takes a functional component `(WrappedComponent)` and a `logMessage`.
- It returns a new functional component (the HOC) that logs messages when the component it wraps mounts and unmounts using the `useEffect` hook.
- The `LogEnhancedComponent` is the result of using the `withLogger` HOC factory with the original `MyComponent`.
- Finally, in the `App` component, we use  `LogEnhancedComponent` just like any other component.

<br>
<br>

> ### In which scenarios error boundaries do not catch errors?
Below are the cases in which error boundaries doesn't work,

- Inside Event handlers
- Asynchronous code using setTimeout or requestAnimationFrame callbacks
- During Server side rendering
- When errors thrown in the error boundary code itself

<br>

> ### What is the difference between try catch block and error boundaries?

`Try catch` block works with `imperative code` whereas `error boundaries` are meant for `declarative code` to render on the screen.

For example, the try catch block used for below imperative code

```jsx
try {
  showButton();
} catch (error) {
  // ...
}
```

Whereas error boundaries wrap declarative code as below,

```jsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

So if an error occurs in a componentDidUpdate method caused by a setState somewhere deep in the tree, it will still correctly propagate to the closest error boundary.

**What are Error Boundaries?**

Special components that catch JavaScript errors in:

- Rendering
- Lifecycle methods
- Constructors of child components

They prevent the entire app from crashing by showing a fallback UI instead.

<br>

> ### What is the required method to be defined for a class component?

The `render()` method is the only required method in a class component. i.e, All methods other than render method are optional for a class component.

<br>

> ### What are default props?

The defaultProps can be defined as a property on the component to set the default values for the props. These default props are used when props not supplied(i.e., undefined props), but not for null props. That means, If you provide null value then it remains null value.

For example, let us create color default prop for the button component,

```jsx
function MyButton {
  // ...
}

MyButton.defaultProps = {
  color: "red",
};
```

If props.color is not provided then it will set the default value to 'red'. i.e, Whenever you try to access the color prop it uses the default value

<br>

> ### What are the limitations with HOCs?

- **Prop Clashing:**

    - HOCs introduce new props to the wrapped component, and there's a potential for naming conflicts with existing prop names in the wrapped component. This can lead to unexpected behavior if not handled carefully.

- **Unintentional Re-renders:**

    - Some HOCs might cause unnecessary re-renders due to the way they handle props or state. This can impact the performance of the application, especially if not optimized.

- **Prop Drilling:**

    - If HOCs introduce props that are not used by the wrapped component but are only meant for internal functionalities, it might lead to prop drilling, where props are passed through multiple layers of components, making the code harder to maintain.


<br>

> ### How to prevent component from rendering?
You can prevent component from rendering by returning null based on specific condition. This way it can conditionally render component.

```jsx
function Greeting(props) {
  if (!props.loggedIn) {
    return null;
  }

  return <div className="greeting">welcome, {props.name}</div>;
}
```

<br>

> ### What are the conditions to safely use the index as a key?
There are three conditions to make sure, it is safe use the index as a key.

- The list and items are static– they are not computed and do not change
- The items in the list have no ids
- The list is never reordered or filtered.


<br>

> ### Is it possible to use react without JSX?

Yes, JSX is not mandatory for using React. Actually it is convenient when you don’t want to set up compilation in your build environment. Each JSX element is just syntactic sugar for calling `React.createElement(component, props, ...children)`.

For example, let us take a greeting example with JSX,

```jsx
import React from 'react';

const MyComponent = (props) => {
  return React.createElement('div', null,
    React.createElement('h1', null, `Hello, ${props.name}!`),
    React.createElement('p', null, `Age: ${props.age}`)
  );
};

export default MyComponent;

```
<br>

> ### What is diffing algorithm?

React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree.

The diffing algorithms is generating the `minimum number of operations to transform one tree into another`. However, the algorithms have a complexity in the order of O(n³) where n is the number of elements in the tree.

In this case, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions:

- Two elements of different types will produce different trees.
- The developer can hint at which child elements may be stable across different renders with a key prop.

<br>

> ### What is reconciliation?

`Reconciliation` is the process through which React updates the Browser DOM and makes React work faster. React use a `diffing algorithm` so that component updates are predictable and faster. React would first calculate the difference between the `real DOM` and the copy of DOM `(Virtual DOM)` when there's an update of components.\
React stores a copy of Browser DOM which is called `Virtual DOM`. When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one. This comparison is done by `Diffing Algorithm`.\
Now React compares the Virtual DOM with Real DOM. It finds out the changed nodes and updates only the changed nodes in Real DOM leaving the rest nodes as it is. This process is called _Reconciliation_.

<br>

> ### What is React Fiber?

Fiber is the `new reconciliation engine` or `reimplementation of core algorithm` in React v16. The goal of React Fiber is to increase its suitability for areas like animation, layout, gestures, ability to pause, abort, or reuse work and assign priority to different types of updates; and new concurrency primitives.

Its main goals are:

  1. Ability to split interruptible work in chunks.
  2. Ability to prioritize, rebase and reuse work in progress.
  3. Ability to yield back and forth between parents and children to support layout in React.
  4. Ability to return multiple elements from render().
  5. Better support for error boundaries.

<br>

> ### What are the rules covered by diffing algorithm?

<details>

When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements. It covers the below rules during reconciliation algorithm,

  1. **Elements Of Different Types**: Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch. For example, elements to , or from to of different types lead a full rebuild.

  2. **DOM Elements Of The Same Type**: When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes. Lets take an example with same DOM elements except className attribute,

      ```html
        <div className="show" title="ReactJS" />

        <div className="hide" title="ReactJS" />
      ```
  3. **Component Elements Of The Same Type**: When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance. After that, the render() method is called and the diff algorithm recurses on the previous result and the new result.

  4. **Recursing On Children**: when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference. For example, when adding an element at the end of the children, converting between these two trees works well.

      ```html
      <ul>
        <li>first</li>
        <li>second</li>
      </ul>

      <ul>
        <li>first</li>
        <li>second</li>
        <li>third</li>
      </ul>
      ```

  5. **Handling keys**: React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key can make the tree conversion efficient,

      ```html
      <ul>
        <li key="2015">Duke</li>
        <li key="2016">Villanova</li>
      </ul>

      <ul>
        <li key="2014">Connecticut</li>
        <li key="2015">Duke</li>
        <li key="2016">Villanova</li>
      </ul>
      ```

</details>

<br>


> ### What is the typical use case of portals?

**Portals** let you render a component’s **child elements outside of its parent’s DOM hierarchy — while keeping the same React component tree.**

React portals are very useful when a parent component has overflow: hidden or has properties that affect the stacking context (e.g. z-index, position, opacity) and you need to visually “break out” of its container.

For example, dialogs, global message notifications, hovercards, and tooltips.

```javascript
ReactDOM.createPortal(child, container);
```

The first argument is any render-able React child, such as an element, string, or fragment. The second argument is a DOM element.


<br>

> ### Controlled vs Uncontrolled component

**Uncontrolled component**: When we use ref, it don't control the internal stateof input with react, so it is called Uncontrolled component

**Controlled component**: When we use useState, we input field is called controlled component because their `Internal state is controlled by react`.

| Feature | Controlled | Uncontrolled |
|--------|------------|--------------|
| Value stored in | React state | DOM |
| Update method | `setState` | `ref` |
| Ideal for | Complex forms | Simple inputs |
| Validation | Easy to implement | Manual |
| Default value | `value` prop | `defaultValue` prop |



<br>

> ### How do you set default value for uncontrolled component?

In React, the value attribute on form elements will override the value in the DOM. With an uncontrolled component, you might want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a `defaultValue` attribute instead of `value`.


```jsx
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        User Name:
        <input
          defaultValue="John"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

The same applies for `select` and `textArea` inputs. But you need to use **defaultChecked** for `checkbox` and `radio` inputs.

<br>

> ### What is Concurrent Rendering?
The Concurrent rendering makes React apps to be more responsive by rendering component trees without blocking the main UI thread. It allows React to interrupt a long-running render to handle a high-priority event. i.e, When you enabled concurrent Mode, React will keep an eye on other tasks that need to be done, and if there's something with a higher priority it will pause what it is currently rendering and let the other task finish first. You can enable this in two ways,

```jsx
// 1. Part of an app by wrapping with ConcurrentMode
<React.unstable_ConcurrentMode>
  <Something />
</React.unstable_ConcurrentMode>;

// 2. Whole app using createRoot
ReactDOM.unstable_createRoot(domNode).render(<App />);
```
<br>

> ### useTransition Hook

In Simple words, Let say you have two state updates one is fast state update and other is slow state update in same function, by default there is batching and both state are executed at a time time and sync form, but you want fast state to execute first and make UI responsive and the slow state update then we use the useTransition hook.

When React state updates:

* Some updates are **urgent** (like typing in input, clicking button)
* Some updates are **slow / heavy** (like filtering huge data, changing big UI sections)

If heavy updates happen immediately → **UI freezes**.

`useTransition` solves this by telling React:

> "Do this heavy update in background. Keep UI interactive."

<br>

**✅ Example Use Case**

**Typing in a search input** but the **filtered list** is big.

You want:

* Input typing → **smooth**
* List update → **can happen slightly later**

<br>

**How it’s used**

```jsx
import { useState, useTransition } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(bigDataList);

  const [isPending, startTransition] = useTransition();

  function handleSearch(e) {
    setQuery(e.target.value); // urgent update

    startTransition(() => {
      // non-urgent update
      const filtered = bigDataList.filter(item =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setList(filtered);
    });
  }

  return (
    <>
      <input value={query} onChange={handleSearch} />
      {isPending && <p>Updating list...</p>}
      <ul>
        {list.map(item => <li key={item}>{item}</li>)}
      </ul>
    </>
  );
}
```

<br>

**What is returned?**

| value                       | meaning                                                      |
| --------------------------- | ------------------------------------------------------------ |
| `isPending`                 | `true` while transition is in progress (you can show loader) |
| `startTransition(callback)` | Wrap your slow state updates here                            |


<br>

> ### What is the difference between async mode and concurrent mode?
Both refers the same thing. Previously concurrent Mode being referred to as "Async Mode" by React team. The name has been changed to highlight React’s ability to perform work on different priority levels. So it avoids the confusion from other approaches to Async Rendering.

<br>

> ### What are the differences between useEffect and useLayoutEffect hooks?

- **Timing:** `useEffect` runs after the browser has `finished painting`, while `useLayoutEffect` runs `synchronously before` the browser `paints`. This means that useLayoutEffect can be used to measure and update layout in a way that feels more synchronous to the user.


- **Visual flicker** `useEffect` allows browser to paint the changes before running the effect, hence it may cause some `visual flicker`. `useLayoutEffect` synchronously runs the effect before browser paints and hence it will `avoid visual flicker`.


- **Error handling:** `useEffect` has a `built-in mechanism for handling errors` that occur during the execution of the effect, so that it does `not crash the entire application`. `useLayoutEffect does not have` this mechanism, and errors that occur during the execution of the effect will `crash the entire application`.


- Both `useEffect` and `useLayoutEffect` are React Hooks used to `run side effects` in functional components. However, they have key differences in **timing** and **execution order**.

<br>

#### 1. `useEffect` (Asynchronous & Non-blocking)

`useEffect` runs **asynchronously after the render** and does **not block** the browser from painting the UI. This makes it suitable for non-UI updates like **data fetching, logging, or setting up subscriptions**.

```jsx
import { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect: Runs after render");
  });

  return <button onClick={() => setCount(count + 1)}>Click {count}</button>;
}
```

<br>

#### 2. `useLayoutEffect` (Synchronous & Blocking)
`useLayoutEffect` runs **synchronously after the DOM updates but before the browser paints the UI**. This makes it useful for **layout measurements, animations, and UI adjustments**.

```jsx
import { useEffect, useLayoutEffect, useRef } from "react";

function Example() {
  const divRef = useRef(null);

  useLayoutEffect(() => {
    console.log("useLayoutEffect: Runs before paint");
    divRef.current.style.color = "red"; // Immediate UI update
  });

  useEffect(() => {
    console.log("useEffect: Runs after paint");
  });

  return <div ref={divRef}>Hello</div>;
}
```
<br>

### **When to Use Which?**
✅ **Use `useEffect`** when:
- You are fetching data (`fetch` API).
- You are subscribing to events (e.g., `addEventListener`).
- You are updating external states (e.g., logging, analytics).

✅ **Use `useLayoutEffect`** when:
- You need to **measure the DOM** before the next frame (e.g., `getBoundingClientRect()`).
- You are **synchronizing animations**.
- You are making **imperative UI changes** that should happen before the user sees the updated UI.

⚠️ **Tip:**  
- If you don’t need to **measure the layout or block rendering**, always prefer `useEffect` to avoid unnecessary UI blocking.

<br>


> ### What is strict mode in React?

`React.StrictMode` is a useful component for highlighting potential problems in an application. Just like `<Fragment>`, `<StrictMode>` does not render any extra DOM elements. It activates additional checks and warnings for its descendants. These checks apply for _development mode_ only.

<br>

> ### When react has aready class based system then why they have introduced functional component

#### 1. Simplicity and Readability:
* **Concise syntax:** Functional components are often shorter and easier to understand compared to their class-based counterparts.
* **No need for `this` keyword:** This eliminates potential confusion and reduces boilerplate code.
* **Focus on pure functions:** Functional components encourage a declarative style, making code more predictable and testable.

#### 2. State Management with Hooks:
* **useState:** Provides a straightforward way to manage component state within functional components.
* **useEffect:** Handles side effects like data fetching, subscriptions, and manual DOM manipulations.
* **Custom Hooks:** Enables reusable stateful logic, promoting code organization and reusability.

#### 3. Improved Performance:
* **Potential for optimization:** Functional components can often be optimized more easily due to their simpler structure.
* **Reduced overhead:** In some cases, functional components can have a slight performance advantage over class components.

#### 4. Better Code Organization and Reusability:
* **Custom Hooks:** Allow for encapsulating complex stateful logic, making code more modular and reusable.
* **Improved composability:** Functional components can be easily combined and nested, leading to more flexible component structures.

#### 5. Community Adoption and Ecosystem:
* **Widespread usage:** Functional components have become the preferred choice for many React developers.
* **Rich ecosystem:** A growing number of libraries and tools are designed to work seamlessly with functional components and Hooks.

<br>

> ### Why should component names start with a capital letter?
If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.

<br>

> ### How to combine multiple inline style objects?
You can use the spread operator in regular React:

```jsx
<button style={{...styles.panel.button, ...styles.panel.submitButton}}>{'Submit'}</button>
```

<br>

> ### How to avoid using relative path imports in create-react-app?
we can use the "~" which points towards the root directory


<br>

> ### Why does React emphasize on unidirectional data flow?
It is also known as one-way data flow, which means the data has one, and only one way to be transferred to other parts of the application. In essence, this means child components are not able to update the data that is coming from the parent component. In React, data coming from a parent is called props.


<br>

> ### Why to avoid using setState() after a component has been unmounted?

- Calling setState() after a component has unmounted will emit a warning. The "setState warning" exists to help you catch bugs, because calling setState() on an unmounted component is an indication that your app/component has somehow failed to clean up properly.
- Specifically, calling setState() in an unmounted component `means` that your `app is still holding a reference to the component after the component has been unmounted` - which often `indicates a memory leak`.

<br>

> ### Differentiate between stateful and stateless components?
- Stateful and stateless components have many different names. They are also known as: `Container vs Presentational components` and `Smart vs Dumb components`.
- The literal difference is that one has state, and the other does not. That means the stateful components are keeping track of changing data, while stateless components print out what is given to them via props, or they always render the same thing.

<br>

> ### Compound Pattern in react

<details>

```jsx

import { createContext, useContext, useState } from "react";

// 1. Create a context
const CounterContext = createContext();

// 2. Create parent component
function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

// 3. Create child components to help implementing the common task
function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}

function Label({ children }) {
  return <span>{children}</span>;
}

function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}
// 4. Add child components as proeprties to parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
```
</details>

<br>


> ### Below is trick to optimize the slowcomponent or we say that we prevent the rerendering of the slow component without the useMemo or useCallback

<details>

```jsx
import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>

      {children}
    </div>
  );
}

export default function Test() {
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>

  //     <SlowComponent />
  //   </div>
  // );

  return (
    <div>
      <h1>Slow counter?!?</h1>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
```

</details>

In commented it is earlier version, the non-commented is optimized version.

It's re-rendered is optimized, you can check it in profiler.

It works because, The component has been passed as a children prop, and so what this means is that this component here was actually created before the Counter component re-rendered. And so therefore, there's no way in which this component could have been affected by the state change in the counter. 


<br>

> ### What is the difference between React Node, React Element, and a React Component?

| Concept           | What It Represents                                      | Example |
|------------------|------------------------------------------------|---------|
| **React Node**   | Anything that React can render, including elements, components, numbers, strings, `null`, `undefined` | `'Hello'`, `42`, `<div>Test</div>` |
| **React Element** | An object describing a UI structure, created via JSX or `React.createElement()` | `<h1>Hello</h1>` |
| **React Component** | A function or class that returns React Elements | `function MyComponent() { return <h1>Hello</h1>; }` |

<br>

> ### Explain what React hydration is

React hydration is the process of attaching event listeners and making a server-rendered HTML page interactive on the client side. When a React application is server-side rendered, the HTML is sent to the client, and React takes over to make it dynamic by attaching event handlers and initializing state. This process is called hydration.

<br>

> ### Why React's useDeferredValue hook is useful?

Defer means it to be execute at the end, when the react is free, let say you have heavy computation which freezes the UI, we want the react to do all the task and at the end when its free, it do the heavy compuation task without freezing the UI.


The `useDeferredValue` hook is useful for improving UI **performance** by **deferring** updates to expensive computations while keeping the UI responsive.

When a React state update causes a **slow re-render** (e.g., filtering a large list or expensive UI updates), `useDeferredValue` helps by:
- **Prioritizing user interactions** (e.g., typing in an input field).
- **Delaying expensive updates** until the browser is idle.
- **Improving perceived performance** (UI feels snappier).


#### Example: Search with Large List Filtering
Imagine filtering a large list based on user input. Without `useDeferredValue`, typing can feel sluggish.

##### Without `useDeferredValue` (Slow UI)
```jsx
import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");

  const filteredItems = heavyFilteringFunction(query); // Expensive operation

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
```

**Issue**: Every keystroke **immediately triggers expensive filtering**, causing lag.


#### With `useDeferredValue` (Smoother UI)
```jsx
import { useState, useDeferredValue } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); // Defers expensive filtering

  const filteredItems = heavyFilteringFunction(deferredQuery);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
```


#### When to Use `useDeferredValue`?
- You have **expensive computations** triggered by fast-changing state (e.g., filtering, sorting).  
- You want to keep the UI **responsive while processing background updates**.  

❌ **Avoid `useDeferredValue` when:**  
- The update **must happen immediately** (e.g., form validation, real-time feedback).  

<br>

> ### Create your own useState hook for your new vanilla javascript project.

```js
function useState(initialState) {
  let state = initialState;
  function setState(newState) {
    //we can also add few conditions to validate the data.
    state = newState;
    render(); //your custom method to trigger page refresh on state change
  }
  return [state, setState];
}
```
<br>

> ### Scenario Based - Dynamic Nested List Rendering

```js
const data = [
  {
    name: "Item 1",
    children: [
      {
        name: "Subitem 1.1",
        children: [
          { name: "Subsubitem 1.1.1", children: [] },
          { name: "Subsubitem 1.1.2", children: [] },
        ],
      },
      { name: "Subitem 1.2", children: [] },
    ],
  },
  {
    name: "Item 2",
    children: [
      { name: "Subitem 2.1", children: [] },
      { name: "Subitem 2.2", children: [] },
    ],
  },
];
```

Solution -

```js
import React from "react";

function NestedList({ data }) {
  const renderNestedItems = (items) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}
            {item.children.length > 0 && renderNestedItems(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Nested List</h2>
      {renderNestedItems(data)}
    </div>
  );
}

export default NestedList;
```

<br>

> ### useCallback hook

**Purpose:**
`useCallback` **memoizes a function**, meaning it returns the *same function instance* between renders unless its dependencies change.

```jsx
const memoizedFn = useCallback(() => {
  // function logic
}, [dependencies]);
```

<br>

### Without `useCallback` (Problem Version) → unnecessary child re-renders.

```jsx
import React, { useState } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("🧒 Child rendered");
  return <button onClick={onClick}>Increment from Child</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 👇 Function recreated every render
  const handleClick = () => setCount((c) => c + 1);

  console.log("👨‍💻 Parent rendered");

  return (
    <div style={{ padding: 20 }}>
      <h2>Count: {count}</h2>
      <input
        placeholder="Type something"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Child onClick={handleClick} />
    </div>
  );
}
```

In console you will see
```
👨‍💻 Parent rendered
🧒 Child rendered
👨‍💻 Parent rendered
🧒 Child rendered
```

Even though you only changed `text`, not `count`,\
👉 **the child still re-rendered!**

**Why?**\
Because `handleClick` was **recreated** on every render, so React sees it as a *new prop reference*.

`React.memo` compares props shallowly, and since `onClick` (a function) changes reference each time, the memoized child still re-renders.

<br>

### ✅ With `useCallback` (Optimized Version) → optimized, child re-renders only when needed.

```jsx
import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("🧒 Child rendered");
  return <button onClick={onClick}>Increment from Child</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 👇 Stable reference, only changes when dependencies change
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // no deps → never changes

  console.log("👨‍💻 Parent rendered");

  return (
    <div style={{ padding: 20 }}>
      <h2>Count: {count}</h2>
      <input
        placeholder="Type something"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Child onClick={handleClick} />
    </div>
  );
}
```

Now type something in the input again:
```
👨‍💻 Parent rendered
👨‍💻 Parent rendered
```

<br>

🧒 **No child re-render!** 🎉\
Because the function reference (`handleClick`) is the **same** between renders.

When you click the child button, count updates and you’ll see:

```
👨‍💻 Parent rendered
🧒 Child rendered
```

— expected, because `count` changed.

<br>

#### The Key Takeaway

| Without useCallback             | With useCallback                |
| ------------------------------- | ------------------------------- |
| Function recreated every render | Function stable between renders |
| Memoized child still re-renders | Memoized child skips re-render  |
| Causes wasted renders           | Prevents unnecessary renders    |

<br>

### Extra Tip: When You Don’t Need It

If your child **is not wrapped in `React.memo`**, or the function **isn’t passed as a prop**, then `useCallback` gives **no benefit** — it just adds unnecessary complexity.

<br>

> ### Quick Rule of Thumb, when you are using react.memo in child then

- If prop is a **function** → use `useCallback`
- If prop is an **object or array** → use `useMemo` (Below is the code)
- If prop is an **object or array in useState** → Then during rerender useState value do not gets updated of parent, or object reference do not change, then the passed value in child remain same then React.memo in child work efficiently
- If prop is a **primitive (string, number, boolean)** → no need, React compares by value, you can use React.memo directly

<br>

> ### memo in the case of object pass in the child

Let’s explore what happens when you pass a **nested object** (or any object/array) as a prop to a memoized child

```jsx
// Child Component
const Child = React.memo(({ data }) => {
  console.log("🧒 Child rendered");
  return <div>Value: {data.value}</div>;
});
```

<br>

#### ❌ Case 1: Passing Object Directly (Without useMemo)

```jsx
import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 👇 New object every render
  const userData = { value: count };

  console.log("👨‍💻 Parent rendered");

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
      <Child data={userData} />
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

<br>

You’ll see:
```
👨‍💻 Parent rendered
🧒 Child rendered
👨‍💻 Parent rendered
🧒 Child rendered
```

😬 Even though you only changed `text`, **Child re-rendered again**.

<br>

**Why?** Because:

```js
const userData = { value: count };
```

creates a **new object reference** on every render.

Even though `{ value: 0 }` looks the same, React compares props **shallowly** (`===` comparison).
Since object references differ each time → React.memo sees it as “changed”.

<br>

#### ✅ Case 2: Fix with `useMemo`

We stabilize the **object reference**.

```jsx
import React, { useState, useMemo } from "react";

const Child = React.memo(({ data }) => {
  console.log("🧒 Child rendered");
  return <div>Value: {data.value}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ✅ Object reference stable unless count changes
  const userData = useMemo(() => ({ value: count }), [count]);

  console.log("👨‍💻 Parent rendered");

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
      <Child data={userData} />
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

<br>

#### What Happens Now

When you type in the input:

```
👨‍💻 Parent rendered
```

🧒 Child **doesn’t render** anymore!
Because `userData` object reference is **stable** until `count` changes.

When you click “Increment”:

```
👨‍💻 Parent rendered
🧒 Child rendered
```

— expected, since `count` changes.

<br>

#### Takeaways

| Problem                                | Solution                   | Hook          |
| -------------------------------------- | -------------------------- | ------------- |
| Function recreated on every render     | Memoize function reference | `useCallback` |
| Object/Array recreated on every render | Memoize value reference    | `useMemo`     |

<br>

> ### What are the ways in which we can import dynamically in react


**1. Using `React.lazy()` (for components)**

```jsx
import React, { Suspense } from "react";

const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

* Only works for **default exports**.
* Must be wrapped inside `Suspense`.

<br>

**2. Dynamic `import()` without React.lazy (general-purpose)**

You can **dynamically import any module** (not just React components):

```javascript
async function loadModule() {
  const module = await import("./utils");
  module.someFunction();
}

loadModule();
```

* Can be used **anywhere**, not just components.
* Works with **named exports** too:

```javascript
const { someFunction } = await import("./utils");
someFunction();
```

<br>

**3. Conditional dynamic import**

You can dynamically import **based on a condition**:

```javascript
async function loadComponent(type) {
  if (type === "A") {
    const ComponentA = (await import("./ComponentA")).default;
    return ComponentA;
  } else {
    const ComponentB = (await import("./ComponentB")).default;
    return ComponentB;
  }
}
```

* Useful for **feature flags**, **user roles**, or **route-based loading**.

<br>

**4. Lazy loading images/assets**

You can also dynamically import **images, JSON, or other assets**:

```javascript
async function loadImage(name) {
  const image = await import(`./images/${name}.png`);
  console.log(image.default); // URL to use in <img>
}
```

✅ **Summary Table:**

| Method                      | Use Case                | Notes                                  |
| --------------------------- | ----------------------- | -------------------------------------- |
| `React.lazy()` + `Suspense` | Lazy-load components    | Only default exports                   |
| `import()`                  | Any module dynamically  | Works anywhere, supports named exports |
| Conditional `import()`      | Load based on condition | Async/await required                   |
| Assets `import()`           | Load images, JSON, etc. | Returns a URL (for images)             |

<br>

### **What Redux Usually Involves**

* A **single global store**
* **Dispatching actions** to update state
* **Pure reducers** to compute new immutable state
* Often includes:

  * Action creators
  * Middleware (e.g., thunks)
  * Normalized state
  * Memoized selectors (Reselect)
  * Redux DevTools
  * React-Redux bindings

#### Other Helpful APIs:

* **createAsyncThunk** → simplifies async logic
* **createEntityAdapter** → manages normalized data
* **createListenerMiddleware** → side-effect handling
* **RTK Query** → Handles data fetching + caching + auto-generated hooks



```
A[Start] --> B[Install: @reduxjs/toolkit & react-redux]

B --> C[Create Store using configureStore()]
C --> D[Create Slice using createSlice()]
D --> E[Export Reducer & Actions]

E --> F[Add Slice Reducer to Store]
F --> G[Wrap App with <Provider store={store}>]

G --> H[Use useSelector() to Read State]
G --> I[Use useDispatch() to Dispatch Actions]

H --> J[UI Updates Automatically When State Changes]
```

<br>

> ### React Query, now officially known as TanStack Query

<br>

> ### RTK Query - React toolkit query

RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, **eliminating the need to hand-write data fetching & caching logic yourself**.

RTK Query is a tool built into **Redux Toolkit**.

It separates **data fetching logic** from general **state management**, like React Query or Apollo.


**Key Benefits**

* Automatically handles **fetching, caching, re-fetching, and memoization**
* Generates **custom React hooks** for API calls
* Reduces need for manual `loading`, `error`, and `data` state management
* Minimizes duplicate network requests

<br>

**Step 1: Create an API Service**

Use `createApi` and `fetchBaseQuery` to define API endpoints.

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
```

<br>

**Step 2: Add API to the Store**

Include the API **reducer** and **middleware** inside the Redux store.

```ts
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './services/pokemon';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);
```

<br>

**Step 3: Wrap App with Provider**

```tsx
import { Provider } from 'react-redux';
import { store } from './store';

<Provider store={store}>
  <App />
</Provider>
```

<br>

**Step 4: Use API Hook in Components**

The hook automatically fetches and tracks request state.

```tsx
import { useGetPokemonByNameQuery } from './services/pokemon';

export default function App() {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <div>
      {error ? "Error" :
       isLoading ? "Loading..." :
       data ? <h3>{data.name}</h3> : null}
    </div>
  );
}
```

<br>

**Important Points**

| Feature             | Explanation                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| `data`              | Response result                                                                 |
| `error`             | Any request error                                                               |
| `isLoading`         | First time loading                                                              |
| `isFetching`        | True when refetching                                                            |
| Auto de-duplication | Multiple components using same query share the same data; no duplicate requests |

<br>

> ### extraReducers

Used to **handle actions from outside this slice**, such as:

* Actions from another slice
* `createAsyncThunk` lifecycle actions
* Manually created actions

```js
extraReducers: (builder) => {
  builder.addCase(otherAction, (state, action) => { ... })
}
```

<br>

**Key Points**

* **Mutating syntax is safe** (because of Immer)
* Each reducer inside `reducers` **generates** an action creator
* `extraReducers` does **not** generate actions
* `name` determines action type prefix (`sliceName/actionName`)

<br>

**Example (Short)**

```js
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state) { state.value++ },
    decrement(state) { state.value-- },
    incrementByAmount(state, action) { state.value += action.payload },
  },
})
```

Generated action types:

```
counter/increment
counter/decrement
counter/incrementByAmount
```

<br>

> ### Below is the detailed example

Usage Example:

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({ // Query means caching for get api
      query: () => "/tasks",  // this is the end point
      transformResponse: (tasks) => tasks.reverse(), // these are additional function for response manipulation
      providesTags: ["Tasks"],  // these tags are added as marking, means when we want to call this api, utlize this tag
    }),
    addTask: builder.mutation({ // mutation means other than get api
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.unshift({ id: crypto.randomUUID(), ...task });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(
        { id, ...updatedTask },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (tasksList) => {
            const taskIndex = tasksList.findIndex((el) => el.id === id);
            tasksList[taskIndex] = { ...tasksList[taskIndex], ...updatedTask };
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (tasksList) => {
            const taskIndex = tasksList.findIndex((el) => el.id === id);
            tasksList.splice(taskIndex, 1);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = api;  // these are the methods exports for api call
```

<br>

Below is consuming the query

```js
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "./apiSlice";

export default function Home() {
  const [newTask, setNewTask] = useState("");

  // Below is the usgae of query hooks
  const { data: tasksList, isError, isLoading, error } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  return (
    <div>
      <div >
        <div >
          <h4 className="ml-3 text-lg font-semibold">My Tasks</h4>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const task = {
              value: newTask,
              completed: false,
            };
            addTask(task);
            setNewTask("");
          }}
        >
          <input
            type="text"
            placeholder="Add a new task"
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            required
          />
          <button className="text-indigo-400">Add</button>
        </form>
        <div className="tasks-container overflow-auto">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : isError ? (
            <p className="text-center">
              {error.error || "Something went wrong"}
            </p>
          ) : (
            tasksList.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))
          )}
        </div>
      </div>
      <Link to="contact" className="absolute text-gray-800 hover:text-gray-400">
        Contact
      </Link>
    </div>
  );
}
```

<br>

> ### useParams VS useLocation


#### ✅ `useParams()`: Extract **Route Parameters**

Use it to get values from **dynamic segments** of the route path like `/user/:id` or `/post/:slug`.

##### Example:

If your route is defined as:

```tsx
<Route path="/user/:id" element={<UserDetails />} />
```

Then in `UserDetails.tsx`:

```tsx
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();

  return <div>User ID: {id}</div>;
};
```


#### ✅ `useLocation()`: Get **full path**, **query params**, **hash**, etc.

Use this to access:

* `pathname`: e.g., `/user/123`
* `search`: e.g., `?page=2&sort=desc`
* `hash`: e.g., `#top`

##### Example:

```tsx
import { useLocation } from "react-router-dom";

const MyComponent = () => {
  const location = useLocation();

  console.log(location.pathname); // "/user/123"
  console.log(location.search);   // "?tab=profile"
  console.log(location.hash);     // "#settings"

  return <div>URL: {location.pathname + location.search}</div>;
};
```

#### 🤔 When to Use Which?

| Task                              | Use                              |
| --------------------------------- | -------------------------------- |
| Get `:id` from `/user/:id`        | `useParams()`                    |
| Get query params like `?page=1`   | `useLocation()`                  |
| Detect route changes              | `useLocation()`                  |
| Build breadcrumb/navigation logic | `useLocation()` or `useParams()` |
| React to any URL change           | `useLocation()` in `useEffect`   |

<br>


> ### What is the difference between npx and npm?

### **`npx` vs `npm` – What's the Difference?**  

#### `npm` (Node Package Manager)
`npm` is used to **install, manage, and run packages** globally or locally in a project.

✅ **Key Features of `npm`:**  
- Installs dependencies (`node_modules/` folder).  
- Adds dependencies to `package.json`.  
- Runs installed packages using `npx` or `scripts` in `package.json`.

#### `npx` (Node Package eXecute)
`npx` is used to **run Node.js packages without installing them globally**.

✅ **Key Features of `npx`:**  
- Runs CLI tools **without installing** them permanently.  
- Uses the locally installed version if available.  
- Ensures correct package versions are executed.

#### When to Use What?
✅ **Use `npm`** when:
- Installing dependencies (`npm install react`).  
- Running scripts (`npm run dev`).  
- Managing project dependencies in `package.json`.  

✅ **Use `npx`** when:
- Running one-time CLI commands (`npx create-react-app`).  
- Avoiding global package installations (`npx eslint .`).  
- Ensuring the correct version of a package runs.  

<br>


> ### How to detect 'click' outside React component?

#### Approach: Using `useRef` & `useEffect`

<details>

```jsx
import { useEffect, useRef } from "react";

function OutsideClickDetector({ onClose }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose(); // Trigger the close action
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={wrapperRef} className="p-4 border rounded">
      Click outside me to close
    </div>
  );
}

export default function App() {
  return (
    <OutsideClickDetector onClose={() => alert("Clicked outside!")} />
  );
}
```

</details>

<br>

#### Alternative: Using a Custom Hook
You can create a reusable **`useClickOutside`** hook.

<details>

```jsx
import { useEffect, useRef } from "react";

function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback]);
}

export default function App() {
  const ref = useRef(null);
  useClickOutside(ref, () => alert("Clicked outside!"));

  return <div ref={ref} className="p-4 border rounded">Click outside me</div>;
}
```

</details>

<br>

> ### Children types
React can render `children` from most types. In most cases it's either an `array` or a `string`.

#### String
```html
<div>Hello World!</div>
```
#### Array

```jsx
<div>{["Hello ", <span>World</span>, "!"]}</div>
```

<br>

> ### Array as children
Providing an array as `children` is a very common. It's how lists are drawn in React.

We use `map()` to create an array of React Elements for every value in the array.

```jsx
<ul>
  {["first", "second"].map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

That's equivalent to providing a literal `array`.

```jsx
<ul>{[<li>first</li>, <li>second</li>]}</ul>
```
<br>

> ### What does eject do in create react app?
The Create React App documentation characterizes this script as a “one-way operation” and warns that “once you eject, you can’t go back!” Create React App comes with an excellent configuration that helps you build your React app with the best practices in mind to optimize it.

However, we may have to customize the pre-built react-scripts with additional configurations in some advanced scenarios. The eject script gives you full control over the React app configuration. For example, you can customize the webpack or Babel configuration according to a specific need by ejecting the React app.

Running the eject script will remove the single build dependency from your project. That means it will copy the configuration files and the transitive dependencies (e.g., webpack, Babel, etc.) as dependencies in the package.json file. If you do that, you’ll have to ensure that the dependencies are installed before building your project.

After running the eject command, it won’t be possible to run it again, because all scripts will be available except the eject one. Use this command only if you need to. Otherwise, stick with the default configuration. It’s better, anyway.

<br>