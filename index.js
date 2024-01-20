//! https://www.thatjsdude.com/interview/js1.html#isPrime


//* html 5 comes with semantic tags
//* doctype in html, 
//All HTML documents must start with a <!DOCTYPE> declaration. The declaration is not an HTML tag. It is an "information" to the browser about what document type to expect. In HTML 5, the declaration is simple: <!DOCTYPE html>

//* Iframe in html : An inline frame is used to embed another document within the current HTML document.
//* HTML Formatting Elements 
// Formatting elements were designed to display special types of text:
// <b> - Bold text
// <strong> - Important text
// <i> - Italic text
// <em> - Emphasized text
// <mark> - Marked text
// <small> - Smaller text
// <del> - Deleted text
// <ins> - Inserted text
// <sub> - Subscript text
// <sup> - Superscript text

//* Difference between <b> and <strong> Elements
// The HTML <b> element defines bold text, without any extra importance. The HTML <strong> element defines text with strong importance. The content inside is typically displayed in bold.

//*   semantic tag === A semantic element clearly describes its meaning to both the browser and the developer.

//! -------------------------CSS ------------------------

//* Box-Sizing :
// The box-sizing property in CSS is used to control how the total width and height of an HTML element is calculated. It has two possible values: content-box and border-box.
// The default value for box-sizing is content-box. This means that the width and height of an element are calculated based on the content of the element, excluding padding and border.
// If you set the value of box-sizing to border-box, the width and height of an element are calculated based on the content, padding, and border of the element. This can be useful in situations where you want to set a specific width for an element that includes its padding and border, rather than having to calculate the total width manually.

//* Pseudo-elements : befor and after
//A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). For example, ::first-line can be used to change the font of the first line of a paragraph.

//* Pseudo-classes/ Pseudo selector : hover,focus,active,link,first child,last child,nth child
// A pseudo-class is used to define a special state of an element.

//* What is flexbox
// Flexbox is a layout module in CSS that provides a more efficient and flexible way to arrange and align elements in a container. The main idea behind Flexbox is that you can turn any container element into a flexible container,

//* Position in css
// position: static;
// position: relative;
// position: absolute;
// position: fixed;
// position: sticky;

//* Screen meaning in media queries

//* Advantage of CSS3 over CSS  === refer https://www.geeksforgeeks.org/advantage-of-css3-over-css/    and some are Responsiveness or Media queries,new color formats Colors, advanced Animations, etc

//*   diff between visibility and d none  == visibility:hidden hides the element, but it still takes up space in the layout. display:none removes the element from the document. It does not take up any space.

//* selectors in css ====  https://www.w3schools.com/css/css_selectors.asp

//! -------------------------VANILLA JS ------------------------ 

//* What is the difference between classical inheritance and prototypal inheritance?
// Class Inheritance: instances inherit from classes (like a blueprint - a description of the class), and create sub-class relationships: hierarchical class taxonomies. Instances are typically instantiated via constructor functions with the new keyword. Class
// inheritance may or may not use the class keyword from ES6.
// Prototypal Inheritance: instances inherit directly from other objects. Instances are typically instantiated via factory functions
// or Object.create(). Instances may be composed from many different objects, allowing for easy selective inheritance.



//! -------------------------REACT JS ------------------------

// Props are immutable states are

//* useimperativehandle hook 

// ### Question 5
// how to add "<h1>Hello World</h1>" in jsx
// export default function App() {
//     const htmlString = "<h1>Hello World</h1>";
//     return <div dangerouslySetInnerHTML={{ __html: htmlString }}>
//            </div>;
// }
// true


//*real dom virtual dom,ref, shadow dom, createelement in react, clone element in react, stateful components, limitations of react, react router,can we pass react hook as a prop. High order components , redux, improve performance of react - usememo, useeffect with clear, lazy load,
//*react one way binding
//use this url for refernce, vue has v-model so direct but react has to added the event function and the we use the setstate https://stackoverflow.com/questions/34519889/can-anyone-explain-the-difference-between-reacts-one-way-data-binding-and-angula
//* What is the difference between Element and Component?
// An Element is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other components. Elements can contain other Elements in their props. Creating a React element is cheap. Once an element is created, it is never mutated.

//error boundaries in react,

//functional Component has advantage that in the end class components converted to functional so direct usage increase the fastness

// The object representation of React Element would be as follows:

// const element = React.createElement(
//   'div',
//   {id: 'login-btn'},
//   'Login'
// )
// The above React.createElement() function returns an object:

// {
//   type: 'div',
//   props: {
//     children: 'Login',
//     id: 'login-btn'
//   }
// }
// And finally it renders to the DOM using ReactDOM.render():

// <div id='login-btn'>Login</div>
// Whereas a component can be declared in several different ways. It can be a class with a render() method or it can be defined as a function. In either case, it takes props as an input, and returns a JSX tree as the output:

// const Button = ({ onLogin }) =>
//   <div id={'login-btn'} onClick={onLogin}>Login</div>
// Then JSX gets transpiled to a React.createElement() function tree:

// const Button = ({ onLogin }) => React.createElement(
//   'div',
//   { id: 'login-btn', onClick: onLogin },
//   'Login'
// )
//* When to use a Class Component over a Function Component?
// If the component needs state or lifecycle methods then use class component otherwise use function component. However, from React 16.8 with the addition of Hooks, you could use state , lifecycle methods and other features that were only available in class component right in your function component. *So, it is always recommended to use Function components, unless you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries *
//* What are synthetic events in React?
// SyntheticEvent is a cross-browser wrapper around the browser's native event. Its API is same as the browser's native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers.
//* What are forward refs?
// Ref forwarding is a feature that lets some components take a ref they receive, and pass it further down to a child.
//* What is the difference between Shadow DOM and Virtual DOM?
// The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components. The Virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs.
//* What are the limitations of React?
// React is just a view library, not a full framework.
// There is a learning curve for beginners who are new to web development.
// Integrating React into a traditional MVC framework requires some additional configuration.
// The code complexity increases with inline templating and JSX.
// Too many smaller components leading to over engineering or boilerplate.
//* What are error boundaries in React v16?
// Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
//* How to use innerHTML in React?
// The dangerouslySetInnerHTML attribute is React's replacement for using innerHTML in the browser DOM. Just like innerHTML, it is risky to use this attribute considering cross-site scripting (XSS) attacks. You just need to pass a __html object as key and HTML text as value.
//* What is the impact of indexes as keys?
// Keys should be stable, predictable, and unique so that React can keep track of elements.

// In the below code snippet each element's key will be based on ordering, rather than tied to the data that is being represented. This limits the optimizations that React can do.

// {todos.map((todo, index) =>
//   <Todo
//     {...todo}
//     key={index}
//   />
// )}
// If you use element data for unique key, assuming todo.id is unique to this list and stable, React would be able to reorder elements without needing to reevaluate them as much.

// {todos.map((todo) =>
//   <Todo {...todo}
//     key={todo.id} />
// )}
//* How do you conditionally render components?
// In some cases you want to render different components depending on some state. JSX does not render false or undefined, so you can use conditional short-circuiting to render a given part of your component only if a certain condition is true.

// const MyComponent = ({ name, address }) => (
//   <div>
//     <h2>{name}</h2>
//     {address &&
//       <p>{address}</p>
//     }
//   </div>
// )
//* What is strict mode in React?
// React.StrictMode is a useful component for highlighting potential problems in an application. Just like <Fragment>, <StrictMode> does not render any extra DOM elements. It activates additional checks and warnings for its descendants. These checks apply for development mode only.
//* Why should component names start with capital letter?
// If you are rendering your component using JSX, the name of that component has to begin with a capital letter otherwise React will throw an error as an unrecognized tag. This convention is because only HTML elements and SVG tags can begin with a lowercase letter.
// The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names. For example, the below tag can be compiled to a valid component,

//      render() {
//           return (
//             <obj.component/> // `React.createElement(obj.component)`
//           )
//     }
//* How to combine multiple inline style objects?
// You can use spread operator in regular React:

//  <button style={{...styles.panel.button, ...styles.panel.submitButton}}>{'Submit'}</button>
//* How to re-render the view when the browser is resized?
// we can add eventlistner on resize
//* How to use https instead of http in create-react-app?
// You just need to use HTTPS=true configuration. You can edit your package.json scripts section:

// "scripts": {
//   "start": "set HTTPS=true && react-scripts start"
// }
//* How to avoid using relative path imports in create-react-app?
// we can use the "~" which points towards the root directory
//* How to update a component every second?
// const [time, setTime] = useState(Date.now());
// useEffect(() => {
//   const interval = setInterval(() => setTime(Date.now()), 1000);
//   return () => {
//     clearInterval(interval);
//   };
// }, []);
//* Why does React emphasize on unidirectional data flow?
// It is also known as one-way data flow, which means the data has one, and only one way to be transferred to other parts of the application. In essence, this means child components are not able to update the data that is coming from the parent component. In React, data coming from a parent is called props.

// In React this means that:

// state is passed to the view and to child components
// actions are triggered by the view
// actions can update the state
// the state change is passed to the view and to child components
// The view is a result of the application state. State can only change when actions happen. When actions happen, the state is updated. One-way data binding provides us with some key advantages

// Easier to debug, as we know what data is coming from where.
// Less prone to errors, as we have more control over our data.
// More efficient, as the library knows what the boundaries are of each part of the system.
//! What does eject do in create react app?
//* Is it possible to use React without rendering HTML?
// It is possible with latest version (>=16.2). Below are the possible options:

// render() {
//   return false
// }
// render() {
//   return null
// }
// render() {
//   return []
// }
//* Why to avoid using setState() after a component has been unmounted?
// Calling setState() after a component has unmounted will emit a warning. The "setState warning" exists to help you catch bugs, because calling setState() on an unmounted component is an indication that your app/component has somehow failed to clean up properly.
// Specifically, calling setState() in an unmounted component means that your app is still holding a reference to the component after the component has been unmounted - which often indicates a memory leak.
//*Differentiate between stateful and stateless components?
// Stateful and stateless components have many different names. They are also known as:
// – Container vs Presentational components
// – Smart vs Dumb components
// The literal difference is that one has state, and the other does not. That means the stateful components are keeping track of changing data, while stateless components print out what is given to them via props, or they always render the same thing.
//* What are the benefits of using HOC?
// Benefits:
// Importantly they provided a way to reuse code when using ES6 classes.
// No longer have method name clashing if two HOC implement the same one.
// It is easy to make small reusable units of code, thereby supporting the single responsibility principle.
// Apply multiple HOCs to one component by composing them. The readability can be improve using a compose function like in Recompose.
// Problems:
// Boilerplate code like setting the displayName with the HOC function name e.g. (withHOC(Component)) to help with debugging.
// Ensure all relevant props are passed through to the component.
// Hoist static methods from the wrapped component.
// It is easy to compose several HOCs together and then this creates a deeply nested tree making it difficult to debug.








