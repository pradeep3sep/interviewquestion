//! https://github.com/pradeep3sep/javascript-questions-machine-code
// Question no 4,7,9,11,12,13,17,24,26,27,34,36,39,46.49 solution bhi,50,51 mast h solution bhi,54 solution bhi.56,57,58 solution bhi,59,61,62 solution must,63,64,65,67,72,73,74,75,76,83 sol,86 good,91,93,94,95,105,106,113 very good,123 revison concept,127,145,151
// Pending 8,38,44,45,55,66,71,78,82,90,92,96,97,98,114,116,127,132,133, object seal and freeze,138,139,140,141,142,144,147,150,152,153,154


//! https://github.com/pradeep3sep/123-Essential-JavaScript-Interview-Questions
// question no 3,


//! https://www.thatjsdude.com/interview/js1.html#isPrime

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

//! -------------------------VANILLA JS ------------------------
//* throttling vs debouncing
// Throttling is a technique where a function is executed at a regular interval, no matter how frequently it is called.
// Debouncing, on the other hand, is a technique where a function is only executed after a certain amount of time has passed since the last time it was called.

// Explanation by use case:
// Search bar- Don't want to search every time user presses key? Want to search when user stopped typing for 1 sec. Use debounce 1 sec on key press.
// Shooting game- Pistol take 1 sec time between each shot but user click mouse multiple times. Use throttle on mouse click.
//* Event Loop
//* prototype chaining
//* http methods like 
    //GET: GET request is used to read/retrieve data from a web server. 
    //POST: POST request is used to send data (file, form data, etc.) to the server. On successful creation, it returns an HTTP status code of 201.
    //PUT: A PUT request is used to modify the data on the server. It replaces the entire content at a particular location with data that is passed in the body payload.If there are no resources that match the request, it will generate one.
    //PATCH: PATCH is similar to PUT request, but the only difference is, it modifies a part of the data. It will only replace the content that you want to update.
    //DELETE: A DELETE request is used to delete the data on the server at a specified location.
//* html 5 comes with semantic tags
// Advantage of CSS3 over CSS  === refer https://www.geeksforgeeks.org/advantage-of-css3-over-css/    and some are Responsiveness or Media queries,new color formats Colors, advanced Animations, etc
//* how to stop all the console log at onec console.log = function (){},
//*async vs differ  === see this image for answer  https://i.stack.imgur.com/wfL82.png

//*   diff between visibility and d none  == visibility:hidden hides the element, but it still takes up space in the layout. display:none removes the element from the document. It does not take up any space.

// doctype in html, 
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

//* selectors in css ====  https://www.w3schools.com/css/css_selectors.asp

//*   semantic tag === A semantic element clearly describes its meaning to both the browser and the developer.

//*     2 + undefined gives NaN, not gives any error

//* There are 8 falsy values:
// undefined, null, NaN, false,'' (empty string),0,-0,0n (BigInt(0))
//* OBJECTS
// JavaScript supports programming with objects. Objects are a way of organizing the variables. The different screen elements such
// as Web pages, forms, text boxes, images, and buttons are treated as objects. Every object has its own properties and methods.
// Properties define the characteristics of an object. Examples: color, length, name, height, width Methods are the actions that the
// object can perform or that can be performed on the object. Examples: alert, confirm, write, open, close .

//* Can you name two programming paradigms important for JavaScript app developers?
// JavaScript is a multi-paradigm language, supporting imperative/procedural programming along with OOP (Object-Oriented
// Programming) and functional programming. JavaScript supports OOP with prototypal inheritance.

//* What is the difference between classical inheritance and prototypal inheritance?
// Class Inheritance: instances inherit from classes (like a blueprint - a description of the class), and create sub-class relationships: hierarchical class taxonomies. Instances are typically instantiated via constructor functions with the new keyword. Class
// inheritance may or may not use the class keyword from ES6.
// Prototypal Inheritance: instances inherit directly from other objects. Instances are typically instantiated via factory functions
// or Object.create(). Instances may be composed from many different objects, allowing for easy selective inheritance.

// Es6(ECMAScript 2015) ====== let and const, Arrow Functions, Template Literals, rest and spread operator,  Default Parameters in functions, classes
//pure components,

// generator in javascript ,
// Object.keys(myObj). This method returns an array with only the enumerable own string property names ("keys") in the object myObj, but not those in the prototype chain. 
//object.entries all, 
// delete myobj.a;
// Object.freeze(obj)  ===  kuch bhi nhi ho sakta
// Object.seal() === new properties cannot be added, existing properties cannot be removed.Values of existing properties can still be changed as long as they are writable
// hosting  === Hoisting in JavaScript is a behavior in which a function or a variable can be used before declaration. 
//deep copy shallow copy deep copy limitations ,
    //shallow copy
        // let a = {
        //     b: 7,
        //     c: 8
        // }
        // let m = a
    //deep copy ==  use the spread operator,Object.assign()
            // for the nested objects 
            //let m = JSON.parse(JSON.stringify(a))




//  what is display flex, map and foreach with example, this keyword with example, accordian with nested child elements, call bind apply, array string object methods, pseudo element and class, position in css, duplicate count and other things in array, shadow DOM in react, dependency injection , box model in css, position and display in css, null ==\=== undefined and reason ,rest and spread operator, diff b/w functional class components , package.json vs package.lock.json, create 3 promises and resolve them one by one, window vs document , attributes and property of html , how to empty a array, 
 


// Arrow, let const, spread, rest, literal, destructuring 
// Spa, component, virtual, declarative, seo
// Props are immutable states are
// Freeze,seal,key,value,entries
// This in method, is object of method
// This in normal function refer to global object ie window but show undefined in strict mode
// This in arrow function is this keyword of surrounding

// String-upper,lower,slice,concat,trim,


//! -------------------------REACT JS ------------------------
//* useimperativehandle hook 
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
//! -------------------------VUE JS ------------------------
//jo smjh nhi aaya  ==  39,65,66,68,69,70,71,79,81,82,83,84,85,86,87,105

//* What are the major features of VueJS?
//* We can have 2 or more style in single component. One style is used for the global style and other one can be scoped style
//* Vue lifecycle methods.
//* CSS modules in vue js (similar like we use in the react)(:class="$style.red" and <style module> wala part is module)
{/* <template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style> */}


//*What are the conditional directives
// VueJS provides set of directives to show or hide elements based on conditions. The available directives are: v-if, v-else, v-else-if and v-show
//* How to make router param changes as reactive?
//* What is the difference between v-show and v-if directives?
// Below are some of the main differences between v-show and v-if directives,
// v-if only renders the element to the DOM if the expression passes whereas v-show renders all elements to the DOM and then uses the CSS display property to show/hide elements based on expression.
// v-if supports v-else and v-else-if directives whereas v-show doesn't support else directives.
// v-if has higher toggle costs while v-show has higher initial render costs. i.e, v-show has a performance advantage if the elements are switched on and off frequently, while the v-if has the advantage when it comes to initial render time.
// v-if supports <template> tab but v-show doesn't support.

//*How do you reuse elements with key attribute?  input k liye jarur
//*Why should not use if and for directives together on the same element?
//* Why do you need to use key attribute on for directive?
//*What are the array detection mutation methods?
//*What are the array detection non-mutation methods?
//*How do you use v-for directive with a range?
//*What are the event modifiers provided by vue?
//*What are key modifiers?
//*What are the supported System Modifier Keys
//*What are the supported Mouse Button Modifiers?
//*What are the supported modifiers on model?
//*How do you communicate from child to parent using events? try example in codesandbox
//*What is global registration in components vs local registration? iska second part dekho answer me se
//*What are non prop attributes?
//*Describe about validations available for props?
//*How do you customize model directive for a component?
//*What is vue router and their features
//* What is route matching priority?
//* What are nested routes? video dekho zara nested routing ki
//* What are single file components? and then Is Single File Components violating separation of concerns?
//*What are filters? What are the different ways to create filters? How do you chain filters? Is it possible to pass parameters for filters? zarur padhe
//* What are plugins and their various services? How to create a plugin?  https://www.digitalocean.com/community/tutorials/vuejs-creating-custom-plugins

//* Global mixins --- https://freek.dev/823-using-global-mixins-in-vuejs)
//* What are the merging strategies in mixins?
//* What are custom directives?How do you register directives locally?What are the hook functions provided by directives?  for the video https://youtu.be/HJHKSNA6HU0
//*What is the purpose of keep alive tag?
//*What is the purpose of vuejs once directive?
//* How do you access the root instance?
//* How do you access parent instance?
//*What are asset url transform rules?
//*Is it possible to mix both local and global styles?
//* Is parent styles leaked into child components in scoped css?
//* What is hot reloading in vue loader? How do you disable hot reloading explicitly?
//*How do you use deep selectors?

// Vuex k questions 143 se start hue h.
//* What are vuex getters?? answer jarur dekhe iska
//* How do you perform mutations in components?
//* How do you perform asynchronous operations?
//* What are differences between mutations and actions?
//* How do you dispatch actions in components?
//* What are modules in vuex?
//*  How to use model directive with two way computed property? mast cheez h
//* What does nextTick do in VueJS?
//* What is the main difference between method and computed property? answer dekho jarur
//* How do you watch route object changes?
//* What are navigation guards in vue router?
//* Can I use computed property in another computed property?
//* Why the component data must be a function?
//* v-html,v-once,watchers(use the value concept in it),computed property(ye bhi data function pe depend hota h,change hone pe run hota h, first time run hota h, used for fast calculation,)
//* method vs computed vs watchers vue maxmilian video.
//* various formats are kebap-case, PascalCase, camelCase
//* Slots, teleport
//*VueX-mutations
//^global imports vs local imports of components. for global componnents use the maxmilian example in main.js file of props video or use global vs local components video of max millian


//! :class = "{active : dyanmicdata}" ======== "dynamicdata ? 'active' : ''" keep in mind bracket important h






//* Question 1
// const numbers = [10,20,30,40,50,60]
// const [,,,...newNumbers] = numbers
// console.log(newNumbers);
//?[40,50,60]

//* Question 2
// const details = {
//     name : "Pradeep",
//     age : 25,
//     name : "Himanshu"
// }
// console.log(details);
//? age: 25
//?name: "Himanshu"

//* Question 3
// const name = "testify"
// console.log(!typeof name === "object");
// console.log(!typeof name === "string");
// console.log(!typeof name); this is for hint

//? false
//? false

//* Question 4
// let a = 1
// c= 2;
// console.log(--c === a);
//? true

//* Question 5
// let check = [1,2,3,4]
// let hi = [,...check]
// console.log(hi);

//* Question 5
//how to add "<h1>Hello World</h1>" in jsx
// export default function App() {
//     const htmlString = "<h1>Hello World</h1>";
//     return <div dangerouslySetInnerHTML={{ __html: htmlString }}>
//            </div>;
//   }
//? true

//* Question 6
// var x;
// x = 10;
// function test(){
//     var x;
//     if(x>29){
//         x=50
//     }
//     console.log(x);
// }
// test();
//? undefined

//* Question 7
// const number = 2
// const result  = (function () {
//     delete number;
//     return number
// })();
// console.log(result);
//? 2

//* Question 8
// const number = 2
// const result  = (function (number) {
//     delete number;
//     return number
// })(20);
// console.log(result);
//? 20

//* Question 9
// function sum(num1, num2 = num1){
//     console.log(num1 + num2);
// }
// sum(10)
//? 20

//* Question 10
// function sum(num1, num2 = num1){
//     console.log(num1 + num2);
// }
// sum(10,89)
//? 99

//* Question 11
// var a = "hello"
// var sum = 0
// for (let i = 0; i < a.length; i++) {
//     sum += (a[i] - "a");
// }
// console.log(sum);
//? NaN

//* Question 12
// let a = 0
// for(a; a<5; a++);
// console.log(a);
//? 5

//* Question 13(revise the concept of shallow and deep copy)
// let person = {
//     name : "Lynda"
// }
// const members = [person]
// person = null
// console.log(members);
//?[{name : "Lynda"}]

//* Question 14(problem in concept)
// const a = {}
// const b = {
//     key : "b"
// }
// const c = {
//     key : "c"
// }
// a[b] = 123;
// a[c] = 456;
// console.log(a[b]);

//* Question 15(console kra k check karo)
// (()=> {
//     let x = (y = 10)
// })()
// console.log(typeof x);
// console.log(typeof y);
//?undefined, number

//* Question 16
// (function(a){
//     return (function(){
//         console.log(a);
//         a = 23
//     })()
// })(45);

//* Question 17
// const person = {
//     name : "pradeep",
//     age : 45
// }
// let city = person.city
// city = "delhi"
// console.log(person);

//* Question 18
// var count = 1;
// var func1 = function (){
//     console.log(count)
// }
// var func2 = function(){
//     var count = 2
//     func1()
// }
// func2()

//* Question 19
// let users  = {
//     name : "outside",
//     hasArrowfunc : function(){
//         const name = "Inside";
//         (()=>{
//             console.log(this.name);
//             return this.name
//         })()
//     }

// }
// console.log(users.hasArrowfunc());

//* Question 20
// bar();
// (function abc(){
//     console.log("something")
// })();
// function bar(){
//     console.log("bar got called")
// }

//* Question 21 sorting of the array
// let daya = [1,12,3,11,10]
// daya.sort((a,b)=> {
//     return a-b
// });
// console.log(daya);

//* Question 21 sorting of the object
// const items = [
//     { name: 'Edward', value: 21 },
//     { name: 'Sharpe', value: 37 },
//     { name: 'And', value: 45 },
//     { name: 'The', value: -12 },
// ];

//? sort by value
// items.sort((a, b) => a.value - b.value)
// console.log(items);

//? sort by name
// items.sort(function(a, b){
//     if(a.firstname < b.firstname) { return -1; }
//     if(a.firstname > b.firstname) { return 1; }
//     return 0;
// })
// console.log(items);

//* Question 22 converting the number into textnumber
// let number = 9966
// let data = number.toLocaleString()
//? 10K

//* Question 23 check(4)(2)(3)
// function check(num1){
//     return (num2)=>{
//       return (num3)=> {
//         return num1 * num2 * num3
//       }
//     }
//   }
// console.log(check(4)(2)(3));

//* Question 24
// let array = [2,3,[5,2,[6,[3, [4, 5, [5, 1, 3]]]],1,1],9];
// //flat without using flat
// console.log(array.toString().split(','));

//* Question 25
// const firstname = fun()
// let name = 'ram'
// function fun(){
//   return `my is ${name} malviya`
// }
// console.log(firstname);

//* Write a program to remove duplicate from the array without using the default method
//* Write a program to give second largest integer from the array without using the default method
//* Write a program to make polyfill for map,filter,reduce method in javascript

//* Question 26 , output of below code
// for (let i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
  
// }
// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }
// for (let i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   },  1000);
  
// }

//* Question 27
// var num = 4;
// function outer(){
//   var num = 2;
//   function inner(){
//     num++
//     var num = 3;
//     console.log("num",num);
//   }
//   inner()
// }
// outer()