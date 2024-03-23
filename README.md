Below is the storage by reference
```js
let person = { name: "Jayesh" };
  const personArray = [person];
  person = null;
  console.log(personArray);

  personArray = [];
  console.log(personArray);

  // 👍A) [ { name: "Jayesh" } ], []
  // 💡B) [ { name: "Jayesh" } ] , TyperError
  // 💖C) [ null ], TypeError
  // 😀D) [ {} ], []

  /*
  Answer is B) [ { name: "Jayesh" } ] , TyperError because person = null will only disconnect the person variable from value { name: "Jayesh"} which is stored in memory, personArray[0] will still point to same value { name: "Jayesh"}.
  and personArray = [] at this line TyperError as const variable can't be redeclared and throws Uncaught TypeError: Assignment to constant variable.  
 */
```


make notes of below
```
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Javascript/arrow-function/arrow-vs-regular-functions.md
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Javascript/arrow-function/when-not-to-use-arrow-function.md  // iska event wala
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Javascript/js-basics/IIFE-10-ways.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Javascript/Why-eval-function-considered-dangerous.md
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Javascript/is-JS-block-scoped-or-function-scoped.md
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Git-and-Github/PR-Flow/git-squash-many-commits-to-a-single-one-before-PR.md
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Git-and-Github/git-rebase/git-rebase.md
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Git-and-Github/IMPORANT-Gitignore-a-file-thats-ALREADY-PUSHED-to-Git%20.md
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/Array-Problems/find-closest-number-in-array.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/Array-Problems/find-length-of-integer-without-converting-to-string.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/Array-Problems/shuffle_Array-2.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/Dealing-with-Objects-in-JS/flatten-objects-plain-js-recursive.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/ES6/this-in-ES6/this-in-ES6.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/tree/master/Collection-of-Popular-Problems-with-Solutions/General-JS-Problems
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/Imp-TECHNIQUES/general-Array-Creation.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/Imp-TECHNIQUES/method_chaining.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Collection-of-Popular-Problems-with-Solutions/careercup/google-biz-trip-boardingPass.js
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/Challenges-from-Popular-Coding-Practice-sites/Codewar-solutions/5kyu/maxSubarraySum.js
```


Good website, must see

```
https://www.patterns.dev/
```

```
https://www.greatfrontend.com/prepare/coding
```
```
https://bigfrontend.dev/problem
```

```
https://github.com/sadanandpai/frontend-mini-challenges
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

```
https://bigfrontend.dev/react-quiz
```

```
https://bigfrontend.dev/react
```


must see repo - Done
```
https://github.com/jayesh2906/JavaScript-with-JC/tree/master
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews
```

must see

```
https://github.com/pradeep3sep/frontend-interview-preparation-kit
```

machine code for pratice
```
https://github.com/pradeep3sep/Machine-Coding-Round
```

Pending Repo
```
https://github.com/pradeep3sep/All-react-details-AtoZ
```

```
https://github.com/pradeep3sep/frontend-interview-preparation-kit
```

```
https://github.com/pradeep3sep/react-interview-new-check
```

```
https://github.com/pradeep3sep/bulletproof-react
```


Done Repo
```
https://github.com/pradeep3sep/javascript-questions-machine-code
```

```
https://github.com/pradeep3sep/reactjs-interview-questions
```

```
https://github.com/pradeep3sep/javascript-interview-questions
```
