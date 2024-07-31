> ### WE have below events in react

OnClick

onInput

onChange

onSubmit - in form

onMouseLeave

onMouseOver

<br>

> ### For the difference between the memo and useMemo
```
https://www.geeksforgeeks.org/difference-between-react-memo-and-usememo-in-react/
```

<br>

> ### Imp: State vs Ref: Refs are mutable and persist between renders without causing re-renders while state do not persist value while rerender

```
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/React/Virtual-DOM-and-Reconciliation-Algorithm.md

https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/React/pass-prop-to-component-rendered-by-React-Router.md

https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Web-Development-In-General/What-happens-when-you-navigate-to-an-URL.md

https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Web-Development-In-General/What-happens-when-you-navigate-to-google.md

```

> ### useEffect-api-call-with-async-inside-useEffect

### Incorrect Code
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


### Correct Code

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
In the code, we are using async/await to fetch data from a third-party API. According to the documentation every function annotated with async returns an implicit promise: “The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result.

However, an useEffect() function must not return anything besides a function, which is used for clean-up. That when useEffect() does return a function that function is ONLY used for cleaning up, like what we will do under componentWillUnmount()

That’s why you may see the following warning in your developer console log: 07:41:22.910 index.js:1452 Warning: useEffect function must return a cleanup function or nothing. Promises and useEffect(async () => …) are not supported, but you can call an async function inside an effect.. That’s why using async directly in the useEffect function isn’t allowed. Let’s implement a workaround for it, by using the async function inside the effect.

<br>

```js
// 👎 Don't use relative paths
import Input from '../../../modules/common/components/Input'

// 👍 Absolute ones don't change
import Input from '@modules/common/components/Input'
```

<br>

**just to know, we can store data in const outside function in component, so it loaded first time, but no effect on rerender when state or prop change**

<br>

> ### error boundary is used as package, because error boundries was only available in class components form but now it comes along with react

<br>


> ### npm install recharts for react charts

> ### for react icon, npm i react-icons


<br>


> ### Hooks are stored in number which is the sequence declared in the code, not by the name.


<br>


> ### In react,  we have the loaders and actions in react-router, loaders for the get and actions for the rest, action is like earlier we create the form which have action like POST,PATCH etc which work on submit button, it is replaced by action of react-router

<br>



> ### Component and state optimizations
- If you have a piece of state that is initialized by an expensive computation, use the state initializer function instead of executing it directly because the expensive function will be run only once as it is supposed to. e.g:

```jsx
// instead of this which would be executed on every re-render:
const [state, setState] = React.useState(myExpensiveFn());

// prefer this which is executed only once:
const [state, setState] = React.useState(() => myExpensiveFn());
```

When you provide a function to initialize state in `useState`, React will call that function only once during the initial render to set the initial state. This is useful for computationally expensive initializations.

Here's an example to demonstrate this:

```jsx
import React, { useState } from 'react';

function generateInitialCount() {
  console.log('Generating initial count');
  return 10;
}

function Counter() {
  const [count, setCount] = useState(generateInitialCount);

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

If you pass a function directly to `useState` without invoking it, React will treat it as a lazy initializer and call it to get the initial state:

```jsx
const [count, setCount] = useState(() => generateInitialCount());
```

This is equivalent to:

```jsx
const [count, setCount] = useState(generateInitialCount);
```

Both approaches ensure that the initialization function runs only once during the first render. Subsequent state updates and re-renders will persist the state without calling the initialization function again.


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

### Example:

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

### When you use Method 1:
- `myExpensiveFn()` runs every time `ExampleComponent` renders.

### When you use Method 2:
- `myExpensiveFn()` runs only once during the initial render of `ExampleComponent`.

Method 2 is more efficient, especially if `myExpensiveFn()` involves heavy computations, network requests, or other expensive operations.

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
referenc is video no 136: state update batching in pratice


> ### How usestate is async
Basically, the thing is you don't get update value right after updating state.

Below code shows async nature, as we can see the console.log gives same value in all 3 log

Below code for batching of state

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

> ### useState accepts the callback function

```jsx
import React, { useState } from 'react';

const MyComponent = () => {
  // Using an arrow function for the default value
  const [count, setCount] = useState(() => {
    // Some heavy computation or logic to determine the initial value
    return computeInitialCount();
  });

  const computeInitialCount = () => {
    // Simulating some heavy computation
    return Math.random() * 100;
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MyComponent;

```

<br>



> ### What is React?

React is an `open-source front-end JavaScript library` that is used for building user interfaces, especially for `single-page applications`

> ### What are the major features of React?
- JSX syntax, a syntax extension of JS that allows developers to write HTML in their JS code.
- VirtualDOM
- reusable/composable


> ### What are the advantages of React?
Below are the list of main advantages of React,

- Increases the application's performance with Virtual DOM.
- JSX makes code easy to read and write.
- It renders both on client and server side (SSR).
- Easy to integrate with frameworks (Angular, Backbone) since it is only a view library.
- Easy to write unit and integration tests with tools such as Jest.


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

JSX stands for JavaScript XML. \
Basically it just provides the `syntactic sugar` for the `React.createElement(type, props, ...children)` function, 
**In children, we can have children component or we can have the text which we want to show**

The Babel convert the JSX to React.createElement to pure javascript

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


<br>



> ### What is the difference between Element and Component?

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


> ### What is the difference between HTML and React event handling?

Below are some of the main differences between HTML and React event handling,

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


> ### We can use the JSON-Server to get temp backend in our frontend project.

<br>

> ### What are forward refs?
Ref forwarding is a feature that lets some components take a ref they receive, and pass it further down to a child.


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


The Shadow DOM and Virtual DOM are two different concepts used to manage and render user interfaces in web development. Let's break down what each is and provide an example using functional components in a JavaScript library like React.

### Shadow DOM

The Shadow DOM is a part of the Web Components standard, providing encapsulation for DOM and CSS. It allows developers to create components with their own isolated DOM tree and styles, preventing style and script interference from the rest of the document.

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
</head>
<body>
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

- **Shadow DOM**: Used for creating encapsulated components with their own styles and DOM tree, providing isolation from the rest of the document. It's a browser feature implemented through the Web Components standard.
- **Virtual DOM**: A programming concept used by libraries like React to optimize updates to the actual DOM by minimizing direct manipulations and efficiently managing re-renders through a virtual representation of the UI.

Both techniques aim to enhance performance and manageability of web applications but are used in different contexts and for different purposes. The Shadow DOM focuses on encapsulation and isolation, while the Virtual DOM aims to optimize rendering performance.

<br>

> ### What is Lifting State Up in React?
When several components need to share the same changing data then it is recommended to lift the shared state up to their closest common ancestor. That means if two child components share the same data from its parent, then move the state to parent instead of maintaining local state in both of the child components.

<br>


> ### Why fragments are better than container divs?
Below are the list of reasons to prefer fragments over container DOM elements,

- Fragments are a bit faster and use less memory by not creating an extra DOM node. This only has a real benefit on very large and deep trees.
- Some CSS mechanisms like Flexbox and CSS Grid have a special parent-child relationships, and adding divs in the middle makes it hard to keep the desired layout.
- The DOM Inspector is less cluttered.


<br>


> ### What are portals in React?

_Portal_ is a recommended way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

```javascript
ReactDOM.createPortal(child, container);
```

The first argument is any render-able React child, such as an element, string, or fragment. The second argument is a DOM element.


<br>


> ### How to use innerHTML in React?
The `dangerouslySetInnerHTML` attribute is React's replacement for using `innerHTML` in the browser DOM. Just like `innerHTML`, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a `__html` object as key and HTML text as value.

In this example MyComponent uses `dangerouslySetInnerHTML` attribute for setting HTML markup:

```
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
Choosing the correct key can be tricky. It's often tempting to use the index as a key if the items in your list do not have a unique identifier. However, this can lead to issues if the order of items changes. This is because React uses keys to determine whether a component needs to be updated or not. If the keys are based on the index and the order changes, React might end up re-rendering more components than necessary, negatively impacting your app's performance.

In the previous example of a list of posts, if we use the post's index as a key and then a post is added to the beginning of the list, all the keys will change, causing all post components to re-render. On the other hand, if each post has a unique ID and we use this ID as a key, only the new post component will re-render.


<br>


> ### prop-types - How to apply validation on props in React?
We don't need to install separate package for defining the type of props. We can do it by default installed prop-types package

When the application is running in development mode, React will automatically check all props that we set on components to make sure they have correct type. If the type is incorrect, React will generate warning messages in the console. It's disabled in production mode due to performance impact. The mandatory props are defined with `isRequired`.

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

In the above example, `props.initialValue` is used to set the initial state using the `useState` hook.

This leads to unexpected behaviour.

This will work for the first time, state value sets to initial value, but when the component re-renders, at that time useState value of `mystate` do `not reset`. During the rerender the state preserves the previous state or value in it. So when props value from the parent changes, the child gets rerendered but it don't have the updated value in it.

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

<br>

> ### console of component

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


> ### Logging sequence

```jsx
import React, {useEffect} from 'react';

export function App(props) {

  useEffect(()=>{
    console.log('B')
  },[])

  useEffect(()=>{
    console.log('C')
  },[])

  console.log('A')

  return (
    <div className='App'>
      <h1>Hello React.</h1>
    </div>
  );
}
```
above code shows
A\
B\
C

this is beacuse useEffect works like mount, not like beforecreate or create. Bacially works after DOM paints in browser



<br>


> ### How you implement Server Side Rendering or SSR?

React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which follows the same pattern as on the client side.

```jsx
import ReactDOMServer from "react-dom/server";
import App from "./App";

ReactDOMServer.renderToString(<App />);
```

This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.


> ### How to loop inside JSX?

```jsx
<tbody>
  {items.map((item) => (
    <SomeComponent key={item.id} name={item.name} />
  ))}
</tbody>
```


> ### How to re-render the view when the browser is resized?

```jsx
import React, { useState, useEffect } from "react";
function WindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <span>
      {dimensions.width} x {dimensions.height}
    </span>
  );
}
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



> ### How to pretty print JSON with React?

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

  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      <PrettyPrintJSON data={jsonData} />
    </div>
  );
}
```

```jsx
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



> ### How can we find the version of React at runtime in the browser?

You can use `React.version` to get the version.

```jsx
const REACT_VERSION = React.version;

ReactDOM.render(
  <div>{`React version: ${REACT_VERSION}`}</div>,
  document.getElementById("app")
);
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

> ### How to perform automatic redirect after login?

```jsx
import React, { Component } from "react";
import { Redirect } from "react-router";

export default class LoginComponent extends Component {
  render() {
    if (this.state.isLoggedIn === true) {
      return <Redirect to="/your/redirect/page" />;
    } else {
      return <div>{"Login Please"}</div>;
    }
  }
}
```

> ### What are the differences between redux-saga and redux-thunk?

Both _Redux Thunk_ and _Redux Saga_ take care of dealing with side effects. In most of the scenarios, Thunk uses _Promises_ to deal with them, whereas Saga uses _Generators_. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them. But both middleware can coexist, so you can start with Thunks and introduce Sagas when/if you need them.


> ### Why are inline ref callbacks or functions not recommended?

If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one.

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


> ### Higher-Order Component (HOC) 

In React, a Higher-Order Component (HOC) is a pattern where a function takes a component and returns a new component with additional props, state, or behavior. HOCs are a way to reuse component logic, share code between components, and enhance the capabilities of existing components.

```jsx
// HOC
const withUpperCase = (WrappedComponent) => {
  return (props) => {
    const modifiedProps = {
      ...props,
      text: props.text.toUpperCase(),
    };

    return <WrappedComponent {...modifiedProps} />;
  };
};

// Component
const MyComponent = ({ text }) => {
  return <div>{text}</div>;
};

// Using the HOC
const EnhancedComponent = withUpperCase(MyComponent);

// Render the enhanced component
ReactDOM.render(<EnhancedComponent text="Hello, World!" />, document.getElementById('root'));
```


<br>


> ### What are hooks?
Hooks is a special JavaScript function that allows you use state and other React features without writing a class. This pattern has been introduced as a new feature in React 16.8 and helped to isolate the stateful logic from the components.


<br>


> ### In which scenarios error boundaries do not catch errors?
Below are the cases in which error boundaries doesn't work,

- Inside Event handlers
- Asynchronous code using setTimeout or requestAnimationFrame callbacks
- During Server side rendering
- When errors thrown in the error boundary code itself


<br>


> ### Why do you not need error boundaries for event handlers?

Error boundaries do not catch errors inside event handlers.

React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

If you need to catch an error inside an event handler, use the regular JavaScript try / catch statement:

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>;
    }
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```


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


<br>


> ### What is the typical use case of portals?
React portals are very useful when a parent component has overflow: hidden or has properties that affect the stacking context (e.g. z-index, position, opacity) and you need to visually “break out” of its container.

For example, dialogs, global message notifications, hovercards, and tooltips.


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


> ### What is the difference between async mode and concurrent mode?
Both refers the same thing. Previously concurrent Mode being referred to as "Async Mode" by React team. The name has been changed to highlight React’s ability to perform work on different priority levels. So it avoids the confusion from other approaches to Async Rendering.


<br>


> ### What are the differences between useEffect and useLayoutEffect hooks?
useEffect and useLayoutEffect are both React hooks that can be used to synchronize a component with an external system, such as a browser API or a third-party library. However, there are some key differences between the two:

- **Timing:** useEffect runs after the browser has finished painting, while useLayoutEffect runs synchronously before the browser paints. This means that useLayoutEffect can be used to measure and update layout in a way that feels more synchronous to the user.


- **Browser Paint:** useEffect allows browser to paint the changes before running the effect, hence it may cause some visual flicker. useLayoutEffect synchronously runs the effect before browser paints and hence it will avoid visual flicker.

 - **Execution Order:** The order in which multiple useEffect hooks are executed is determined by React and may not be predictable. However, the order in which multiple useLayoutEffect hooks are executed is determined by the order in which they were called.

- **Error handling:** useEffect has a built-in mechanism for handling errors that occur during the execution of the effect, so that it does not crash the entire application. useLayoutEffect does not have this mechanism, and errors that occur during the execution of the effect will crash the entire application.

In general, it's recommended to use useEffect as much as possible, because it is more performant and less prone to errors. useLayoutEffect should only be used when you need to measure or update layout, and you can't achieve the same result using useEffect.

<br>


> ### What is strict mode in React?

`React.StrictMode` is a useful component for highlighting potential problems in an application. Just like `<Fragment>`, `<StrictMode>` does not render any extra DOM elements. It activates additional checks and warnings for its descendants. These checks apply for _development mode_ only.


<br>


### Below are my understanding and lack of notes

```jsx
// Question 5
// how to add "<h1>Hello World</h1>" in jsx
export default function App() {
     const htmlString = "<h1>Hello World</h1>";
     return <div dangerouslySetInnerHTML={{ __html: htmlString }}>
            </div>;
}
```

<br>


> ### When to use a Class Component over a Function Component?
If the component needs state or lifecycle methods then use class component otherwise use function component. However, from React 16.8 with the addition of Hooks, you could use state , lifecycle methods and other features that were only available in class component right in your function component. So, it is always recommended to use Function components, unless you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries.



<br>


> ### What are error boundaries in React v16?
Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

<br>

> ### Why should component names start with a capital letter?
If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.

The component names should start with an uppercase letter but there are a few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names. For example, the below tag can be compiled to a valid component,

```jsx
render() {
  return (
    <obj.component/> // `React.createElement(obj.component)`
  )
}
```

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

> ### What does eject do in create react app?
The Create React App documentation characterizes this script as a “one-way operation” and warns that “once you eject, you can’t go back!” Create React App comes with an excellent configuration that helps you build your React app with the best practices in mind to optimize it.

However, we may have to customize the pre-built react-scripts with additional configurations in some advanced scenarios. The eject script gives you full control over the React app configuration. For example, you can customize the webpack or Babel configuration according to a specific need by ejecting the React app.

Running the eject script will remove the single build dependency from your project. That means it will copy the configuration files and the transitive dependencies (e.g., webpack, Babel, etc.) as dependencies in the package.json file. If you do that, you’ll have to ensure that the dependencies are installed before building your project.

After running the eject command, it won’t be possible to run it again, because all scripts will be available except the eject one. Use this command only if you need to. Otherwise, stick with the default configuration. It’s better, anyway.


<br>


> ### Why to avoid using setState() after a component has been unmounted?

- Calling setState() after a component has unmounted will emit a warning. The "setState warning" exists to help you catch bugs, because calling setState() on an unmounted component is an indication that your app/component has somehow failed to clean up properly.
- Specifically, calling setState() in an unmounted component means that your app is still holding a reference to the component after the component has been unmounted - which often indicates a memory leak.


<br>


> ### Differentiate between stateful and stateless components?
- Stateful and stateless components have many different names. They are also known as: `Container vs Presentational components` and `Smart vs Dumb components`.
- The literal difference is that one has state, and the other does not. That means the stateful components are keeping track of changing data, while stateless components print out what is given to them via props, or they always render the same thing.


<br>


> ### What are the benefits of using HOC?
  Benefits:
- Importantly they provided a way to reuse code when using ES6 classes.
- No longer have method name clashing if two HOC implement the same one.
- It is easy to make small reusable units of code, thereby supporting the single responsibility principle.
- Apply multiple HOCs to one component by composing them. The readability can be improve using a compose function like in Recompose.

  Problems:
- Boilerplate code like setting the displayName with the HOC function name e.g. (withHOC(Component)) to help with debugging.
- Ensure all relevant props are passed through to the component.
- Hoist static methods from the wrapped component.
- It is easy to compose several HOCs together and then this creates a deeply nested tree making it difficult to debug.

<br>


> ### Hook for listening click outside

```jsx
import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
          // the handler is any function which we want to excute when we click outside, which can be any close function
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
```

```jsx

// In app.jsx
import React, { useState } from "react";
import { useOutsideClick } from "./useOutsideClick";

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick(handleClose);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
      {isOpen && (
        <div ref={ref} className="dropdown-menu">
          <p>Dropdown Content</p>
        </div>
      )}
    </div>
  );
}
```


<br>


> ### Best toast to use npm install react-hot-toast

<br>


> ### Compound Pattern in react

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

<br>


> ### Below is trick to optimize the slowcomponent or we say that we prevent the rerendering of the slow component without the useMemo or useCallback

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
In commented it is earlier version, the non-commented is optimized version.

It's re-rendered is optimized, you can check it in profiler.

It works because, The component has been passed as a children prop, and so what this means is that this component here was actually created before the Counter component re-rendered. And so therefore, there's no way in which this component could have been affected by the state change in the counter. 


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
