* So, Tata AIG is in the **insurance domain**, and we deal with multiple types of insurance like **health**, **motor**, **marine**, and even **electrical appliance insurance**.

* For each of these categories, we have a **dedicated product** that manages the **entire claim process**, right from **inward creation** to **final settlement**.

* The claim journey has **multiple stages**, and each stage is handled by a **specific internal team** within Tata AIG.

* Our **end users** are not the general public — they’re **Tata AIG employees** who use these internal systems to process claims efficiently.

* My role, along with my teammates, is mainly focused on the **front-end development** of these products.

* We take care of all **change requests**, **UI/UX improvements**, and **feature enhancements** to make the claim management process smooth and efficient.

<br>


- How hydration fails
- App Router vs Pages Router Folder structure and difference
- importing the server compoent in client
- Folder Structure of all files in next js(Search Keyword)
- Static route
- Dynamic route
    - static build
    - dynamic build
- generateStaticParams
    - dynamicParams
    - multiple handling
    - ISR case - revalidate export
- Catch-All Route Segment & optional Catch-All Route Segment
- middleware.js (matcher)
- Route Groups & Private Folders
- parallal route, default and its sign also the URL behaviour in notes
- Intercepted Routes and its sign
- Meta data updation - 2 ways
- fetch(`https://...`, { cache: 'force-cache' | 'no-store' })
    - when fetch is not cached- ie except get method
    - revalidate, 2 ways of using
    - revalidateTag('posts') (It is ondemand revalidation tags)
    - RevalidatePath (It is ondemand revalidation tags)
- use client, use server(server action ie form submissions on server side is called the server actions and also implementaion)
- diff b/w template and layout
- How you manage the forms in react

- useFormStatus - 1 thing we get
- useActionState earlier useFormState - 3
- usePathname
- useSearchParams
- useOptimistic
- useParams
- useRouter
- rewrites
- useSelectedLayoutSegments

- How dyncmic params behave in static and ISR website
- Side by side function compare

Nuxt vs Next
- dynamic route is [slug]/page.jsx in app type in next but slug/_id.vue for file _slug/index.vue for folder
———
- shop/[…slug].jsx use hota h yha aur app me shop/[…slug]/page.js use hota h
- Shallow Routing
- _app.js - its use case 3
- getStaticProps - its return(more than 3) and context
- Incremental Static Regeneration (ISR) - revalidate
- getServerSideProps(context)
- getStaticPaths - return & fallback(true|false|blocking)

- metadata
- _document.js
- `<Script>`


——ts—-
* Union Types
* Literal Types
* Unknown vs Any 
* Difference Between Type Aliases and Interfaces
* Constraints
* Call Signatures
* Index Signatures
* Readonly takes generic
* Pick, Omit - ye object k h
* Extract, Exclude - ye union k h
* Partial, Required, NonNullable
* Record<Keys, Type>
* exception of tuple - how you manage
* keyof type operator - yha type k against keyof use hoga, na ki object - real object pe typeof then key of use karo
* ReturnType<> - here also type function, if using normal fn then with typeof fn()
* Mapped Types
* Indexed Access Types
* Typecasting
* Children
Event	Type Annotation
onClick	MouseEvent
onChange	ChangeEvent
onSubmit	FormEvent
onKeyDown	KeyboardEvent
ChangeEvent<HTMLInputElement>

———react———
- what is custom hook, and its conditions(4) and example
- why not to use setCount(count++) instead use setCount(prev => prev + 1);
- useRef vs useState
- Try to use less ref hook, it directly update the DOM without comparing the virtual DOM
- default props - before 17 it is used, now using directly default
- batching, diffing, reconciliation,React Fiber
- Abort controller
- portals in React
- useEffect and useLayoutEffect (3 point)
- useDeferredValue
- useTransition Hook
- useImperativeHandle
- Rule of Thumb in memo (4 point)
- useCallback, useTransition syntex

———Vue———
- plugins - 4
- vue reactivity
- supported modifiers on model - 3
- slots and its type - 4
- props validation -  (1 generic+3specific) possible prop ye search karo 
- route guard - 2 ways
- filters
- merging strategies in mixins - 2
- dynamic components
- <keep-alive>, v-once not <v-onec>
- force update
- two way computed property
- Why the component data must be a function
- Fallthrough Attributes - 4
- Namespacing, Binding Helpers in modules

- Keep in mind below ones are used in computed
mapState
mapGetters

- Iska usage dekh lo(methods me use hota h and direct bn jata h
mapMutations
mapActions

- action ko dispatch karte h mutation ko commit karte h
- How can you write duplicate virtual nodes in a component
- How to make router param changes as reactive
- Event Bus and its 3 points

————— Nuxt —————-
watchQuery
`_` prefix for dynamic pages

————JS———

- Promise.race, Promise.any
- When we talk about the variable like let or var, then it is based on position where the function is written, while for the "this", it refers to where is called.
- Infinite Currying
- also get the solution for the sum(1)(2)
- Var and function declaration are hoisted while let, const and classes in TDZ
- Debounce code and throttle code
- Deep copy trick
- Call, Apply, and Bind
- This in various condition
    - Arrow Function IIFE
    - nested normal function in object
- Object.keys() ishme na hi prototype aata h na hi defineProperty aata h
- for loop me prototype aata h
- static in classes outsider constructor in classes
- Normal function vs Arrow function - 4
- Obj vs map - 4

———Misc———
- Can you give an example of an @media property other than screen
- When should you use translate () instead of absolute positioning
- Advantage of preprocessor - 4
- How would you approach fixing browser-specific styling issues - autoprefixer
- Polyfill of flat,shift,unshift

———S.Design——
- Core web vital manage
- 3 -ve & +ve of vue and react
- FE optimization - 3 point

Security
1. XSS - 3 points in all
2. CSP headers
3. Iframe protection
4. Security Headers
5. Client storage security
6. Dependency Security
7. Permissions Policy
8. CSRF
9. CORS
10. SRI

Critical resource rendering
- Dom,cssom, render tree, layout calc, paint 

Memory leaks - 4 point
You were given a project, you have to choose react or vue, which you will choose and why - 4
what are the points you will keep in mind while creating a project from scratch - 10
Lets say your build time gets increased by 8 min, how you will resolve this issue - 5


How could you do to improve performance in React?
1. React.memo - HOC will help to avoid unnesessary render
2. code splitting - lazy loading
3. Use React.Fragments to Avoid Additional HTML Element Wrappers
4. Throttling and Debouncing Event Action in JavaScript
5. Avoid using Index as Key for map
6. Avoiding Props in Initial States
7. Using Web Workers for CPU Extensive Tasks
8. Virtualize Long Lists
9. Using a CDN
10. Spreading props on DOM elements - it adds unknown HTML attribute
11. Function component- Function is better to zip;
12. Dependency optimization - checking how much code you are actually utilizing from dependencies
13. Use Reselect in Redux to Avoid Frequent Re-render
14. CSS Animations Instead of JS Animations
15. Analyzing and Optimizing Your Webpack Bundle Bloat
16. Consider Server-side Rendering
17. Enable Gzip Compression on Web Server
18. Using Immutable Data Structures
19. Using Production Mode Flag in Webpack - limit optimizations, such as minification or removing development-only code
20. React.PureComponent does a shallow comparison on state change
21. Avoid Inline Function pass as prop 

————————————

* So, Tata AIG is in the insurance domain, and we deal with multiple types of insurance like health, motor, marine, and even electrical appliance insurance.
* For each of these categories, we have a dedicated product that manages the entire claim process, right from inward creation to final settlement.
* The claim journey has multiple stages, and each stage is handled by a specific internal team within Tata AIG.
* Our end users are not the general public — they’re Tata AIG employees who use these internal systems to process claims efficiently.
* My role, along with my teammates, is mainly focused on the front-end development of these products.
* We take care of all change requests, UI/UX improvements, and feature enhancements to make the claim management process smooth and efficient.


—————
- code - 21, 88,93,103
- BFS DFS - pre,post-in
- valueOf, toString
- str[i].charCodeAt()
- String.fromCharCode();

9 Algorithm 
1. Hash Map alogo
2. Prefix sum algorithm
3. Two pointer algorithm
4. Two Sum Algorithm
5. Sliding window algorithm
6. fast and slow pointer algorithm
7. Monotonic stack algorithm
8. BFS and DFS algorithm
9. Backtracking algorithm

<br>

```
https://github.com/typescript-cheatsheets/react
https://github.com/PaulLeCam/react-leaflet
```

<br>

### make notes of below
```
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Javascript/arrow-function/when-not-to-use-arrow-function.md  // iska event wala
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Git-and-Github/git-rebase/git-rebase.md
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Git-and-Github/IMPORANT-Gitignore-a-file-thats-ALREADY-PUSHED-to-Git%20.md
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/careercup/google-biz-trip-boardingPass.js
https://www.atlassian.com/git/tutorials/merging-vs-rebasing
what is the difference between cache-control:no-cache and cache-control:no-store?
```

<br>



### Good website, must see
```
https://jser.dev/series/react-source-code-walkthrough
```

```
https://www.patterns.dev/
```

```
https://www.greatfrontend.com/prepare/coding
```

```
https://www.youtube.com/watch?v=3PHXvlpOkf4&ab_channel=freeCodeCamp.org
```

```
https://www.youtube.com/watch?v=v_fwMoTVmqw&list=PLe3J6mZBq1xUs529Z-IHiCix4KBm0uLp1&ab_channel=JsCafe
```

```
https://www.youtube.com/watch?v=ZrMO0bCGwFg&list=PLKhlp2qtUcSYQojD5G-ElgHezoCyq2Hgo&ab_channel=RoadsideCoder
```

<br>

### Repo for the various react package
```
https://github.com/pradeep3sep/All-react-details-AtoZ
```

If you want to understand any JS concept with help of multiple refrence website and video, refer below repo
```
https://github.com/leonardomso/33-js-concepts
```

<br>


### Pending Repo

```
https://github.com/pradeep3sep/frontend-interview-preparation-kit
```

<br>


### must see repo - Done
```
https://github.com/jayesh2906/JavaScript-with-JC/tree/master
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews
https://github.com/sadanandpai/frontend-mini-challenges
https://bigfrontend.dev/react
https://github.com/ryanmcdermott/clean-code-javascript
```


<br>


### Done Repo
```
https://github.com/pradeep3sep/javascript-questions-machine-code
```
```
https://github.com/pradeep3sep/bulletproof-react
```
```
https://github.com/pradeep3sep/reactjs-interview-questions
```

```
https://github.com/pradeep3sep/javascript-interview-questions
```
