> ### :class = "{active : dyanmicdata}"

> ### Lifecycle Hooks

Lifecycle hooks allow you to run custom code **at specific stages of a component’s lifecycle**

1. **Creation phase**
2. **Mounting phase**
3. **Updating phase**
4. **Unmounting (Destruction) phase**

<br>

**1. Creation Phase Hooks**
These hooks run before the component is added to the DOM.

<details>


| Hook             | When it Runs                                                                        | Common Uses                                                                       |
| ---------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `beforeCreate()` | After instance is initialized, but before data/reactivity and events are set up.    | Avoid accessing `data`, `props`, or `computed` here. Usually for low-level setup. |
| `created()`      | After data, props, and methods are initialized, but before the template is mounted. | Fetching initial data, setting up timers, API calls, or event listeners.          |

**Example:**
```js
export default {
  data() {
    return { message: '' };
  },
  beforeCreate() {
    console.log('beforeCreate - data not yet available');
  },
  created() {
    console.log('created - data is available:', this.message);
    this.message = 'Hello Vue!';
  }
}
```
</details>

<br>

**2. Mounting Phase Hooks**

These run when Vue is attaching the component to the actual DOM.

<details>

| Hook            | When it Runs                                                                   | Common Uses                                                                                        |
| --------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `beforeMount()` | Called right before mounting begins (template is compiled but not yet in DOM). | Rarely used — mostly for debugging.                                                                |
| `mounted()`     | Called after the component is inserted into the DOM.                           | Accessing or manipulating DOM elements, initializing third-party libraries (e.g. charts, sliders). |


**Example:**
```js
export default {
  mounted() {
    console.log('Component is now in the DOM');
    this.$refs.input.focus();
  }
}
```
</details>

<br>

**3. Updating Phase Hooks**

Triggered when reactive data changes and the component re-renders.

component is about to update its DOM tree due to a reactive state change (e.g., changes to `data` or `props`)

<details>


| Hook             | When it Runs                                                      | Common Uses                                    |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------- |
| `beforeUpdate()` | Called before the DOM is re-rendered due to reactive data change. | Check or modify data before DOM updates.       |
| `updated()`      | Called after the DOM has been updated.                            | Perform DOM-dependent operations after update. |


**Example:**

```js
export default {
  data() {
    return { count: 0 };
  },
  beforeUpdate() {
    console.log('beforeUpdate - DOM not updated yet');
  },
  updated() {
    console.log('updated - DOM updated with new count:', this.count);
  }
}
```
</details>

<br>

**4. Unmounting (Destruction) Phase Hooks**

Called when the component is being removed from the DOM.

<details>

| Hook                                                  | When it Runs                          | Common Uses                                                    |
| ----------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------- |
| `beforeUnmount()` (Vue 3) / `beforeDestroy()` (Vue 2) | Before the component is torn down.    | Cleanup like removing event listeners, canceling API requests. |
| `unmounted()` (Vue 3) / `destroyed()` (Vue 2)         | After the component is fully removed. | Final cleanup or logging.                                      |


**Example:**
```js
export default {
  beforeUnmount() {
    console.log('beforeUnmount - cleaning up...');
  },
  unmounted() {
    console.log('Component removed from DOM');
  }
}
```

</details>

<br>

**Lifecycle Diagram**

Here’s the flow in order:

```
beforeCreate → created → beforeMount → mounted
→ beforeUpdate → updated
→ beforeUnmount → unmounted
```

<br>

> ### How to create a plugin?

Plugin is an **object or function** that adds global-level functionality to Vue.

A **Vue plugin** is a way to extend Vue’s core functionality globally.

Plugins can:

- Add global methods or properties (`Vue.prototype.$xyz`)
- Add global mixins
- Register global components or directives
- Inject reusable logic into the app (logging, analytics, interceptors, etc.)

<details>

You register it once with:
```js
Vue.use(MyPlugin, options)
```

**Basic Structure of a Vue 2 Plugin**

A Vue 2 plugin should export an object (or function) with an `install()` method:

```js
export default {
  install(Vue, options) {
    // Add global functionality here
  }
}
```

<br>

**Example 1: Simple Logger Plugin**

Step 1 — Create `plugins/logger.js`
```js
export default {
  install(Vue, options) {
    // 1️⃣ Add a global instance method
    Vue.prototype.$log = function (message) {
      if (options && options.prefix) {
        console.log(`[${options.prefix}]`, message);
      } else {
        console.log(message);
      }
    };

    // 2️⃣ Add a global directive
    Vue.directive('focus', {
      inserted(el) {
        el.focus();
      }
    });

    // 3️⃣ Add a global mixin
    Vue.mixin({
      created() {
        console.log('Logger plugin mixin - component created');
      }
    });
  }
};
```
<br>

Step 2 — Register the Plugin in `main.js`
```js
import Vue from 'vue';
import App from './App.vue';
import Logger from './plugins/logger';

Vue.use(Logger, { prefix: 'MyApp' }); // install with custom options

new Vue({
  render: h => h(App),
}).$mount('#app');
```

<br>

Step 3 — Use It in Any Component
```vue
<template>
  <div>
    <h1>Logger Example</h1>
    <input v-focus placeholder="Auto-focused input" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$log('Component mounted!'); // Logs: [MyApp] Component mounted!
  }
}
</script>
```

</details>

<br>

**What You Can Do Inside a Plugin**

| Feature                  | Example                                    |
| ------------------------ | ------------------------------------------ |
| Global instance property | `Vue.prototype.$myProp = ...`              |
| Global method            | `Vue.myGlobalMethod = ...`                 |
| Directive                | `Vue.directive('name', { inserted() {} })` |
| Mixin                    | `Vue.mixin({ created() { ... } })`         |
| Component                | `Vue.component('MyComp', MyComp)`          |





### Real-Life Example 1: Axios Plugin for API Calls

<details>

You want to make HTTP requests throughout your Vue app and automatically handle base URLs, interceptors, and authorization headers — **without repeating setup in every component**.

### 📁 File: `plugins/axios.js`

```js
import axios from 'axios'

export default {
  install(Vue) {
    const api = axios.create({
      baseURL: 'https://api.example.com',
      timeout: 10000
    })

    // Add token to headers automatically
    api.interceptors.request.use(config => {
      const token = localStorage.getItem('token')
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })

    // Global error handling
    api.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          console.warn('Unauthorized — redirecting to login')
        }
        return Promise.reject(error)
      }
    )

    // Make available in all components as this.$api
    Vue.prototype.$api = api
  }
}
```

### 📄 Register in `main.js`

```js
import Vue from 'vue'
import AxiosPlugin from './plugins/axios'

Vue.use(AxiosPlugin)
```

### 🧠 Usage in any component

```js
export default {
  async mounted() {
    const res = await this.$api.get('/users')
    console.log(res.data)
  }
}
```

✅ **Benefit:** Centralized API logic, reusable, consistent auth and error handling.

</details>

<br>

**Best Practices**

✅ Prefix global methods with `$` (like `$log`, `$apiGet`)\
✅ Keep plugin logic **stateless** and **reusable**\
✅ Allow passing **options** for flexibility\
✅ Don’t mutate Vue internals directly

<br>

> ### What is vue reactivity

**Vue reactivity** means that **Vue automatically tracks data changes and updates the DOM** whenever your data (state) changes.

> In short: “When your data changes, your UI changes — automatically.”

<br>

**How It Works (Simplified)**

1. When you declare data in a Vue component:

   ```js
   data() {
     return { count: 0 }
   }
   ```

2. Vue **converts** these properties into **reactive getters and setters** using `Object.defineProperty` (Vue 2) or **Proxies** (Vue 3).

3. When a reactive property is **read**, Vue tracks the dependency (which component or computed property uses it).

4. When it’s **updated**, Vue automatically **re-renders** only the parts of the DOM that depend on it.

**Example**

<details>

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

* Vue makes `count` reactive.
* When you click the button, `count++` changes the data.
* Vue detects the change and re-renders only `<p>Count: ...</p>` automatically.

No manual DOM updates needed.

</details>

<br>

> ### Suppose we have a data property in a Vue component that is initially an object without any nested properties. Later, we add nested properties to this object, but the changes are not reflected in the UI. Why does this happen, what is this behavior called, and how can it be resolved?


**Scenario**
```js
data() {
  return {
    user: {} // initially empty object
  }
},
methods: {
  addNestedData() {
    this.user.name = 'John' // adding nested property dynamically
  }
}
```

* You add a new property (`name`) to the `user` object **after initialization**.
* Vue **does not update the UI** automatically.

<br>

**Why this happens**

In **Vue 2**, the reactivity system is based on **`Object.defineProperty()`**, which only **reactively tracks properties that exist when the data object is created**.

* Newly added properties **are not reactive** by default.
* This is why the UI **doesn’t update** — Vue doesn’t “know” the property was added.

> This is often called the **“reactivity caveat” for adding new properties”**.

<br>

**Solution**

<details>

#### **1️⃣ Use `Vue.set`**
```js
methods: {
  addNestedData() {
    Vue.set(this.user, 'name', 'John')
  }
}
```

* This tells Vue to **add a reactive property** to the object.
* Now the UI updates when `name` changes.


#### **2️⃣ Use `this.$set` (instance method)**

```js
this.$set(this.user, 'name', 'John')
```

* Works the same as `Vue.set`, but called on the component instance.

</details>

<br>

> ### What are the different API styles available?

**Options API:** uses component logic using an object of options such as `data`, `props`, `computed`, `methods and life cycle methods` etc.The properties will be accessible inside functions using component instance(i.e, this).


**Composition API:** The Composition API uses component logic using `imported API functions`. The Single File Components(SFCs) requires setup attribute`(<script setup>)` to use imported variables and functions directly inside template section.

<br>

> ### What are the conditional directives
- VueJS provides set of directives to show or hide elements based on conditions. 
- The available directives are: `v-if`, `v-else`, `v-else-if` and `v-show`

<br>

> ### What is the difference between v-show and v-if directives?

* `v-if` only adds the element to the DOM if the condition is true, while `v-show` always renders it but hides it using CSS.
* `v-if` is slower when toggling often, but faster on initial render. `v-show` is faster to toggle, but slower to render initially.
* `v-if` can be used with `<template>`, but `v-show` cannot.

<br>

> ### Why should not use v-if and v-for directives together on the same element?

<details>

When both are used on the same element:

- `v-for` runs first → creates a virtual node for every item in the list.

- Then `v-if` runs on each node → filters them afterward.

This means Vue still processes all items, even if most of them are not displayed.
➡️ Inefficient if the list is large.


```js
data() {
  return {
    list: Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      visible: Math.random() > 0.5 // randomly visible
    }))
  }
}
```

<br>

**❌ Wrong Way — `v-if` and `v-for` on the Same Element**

```js
<ul>
  <li v-for="item in list" v-if="item.visible" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```

#### What happens:

* Vue runs `v-for` → creates **1000 virtual nodes**.
* Then it runs `v-if` → hides ~500 of them.
* Even invisible nodes still go through **diffing and patching** cycles internally.

➡️ **Wastes CPU cycles**, especially during updates or re-renders.

<br>

**✅ Correct Way — Filter First (via Computed)**

```js
<ul>
  <li v-for="item in visibleItems" :key="item.id">
    {{ item.name }}
  </li>
</ul>

<script>
export default {
  computed: {
    visibleItems() {
      // Only returns items that are visible
      return this.list.filter(item => item.visible)
    }
  }
}
</script>
```
</details>

<br>

> ### How do you use v-for directive with a range?

```js
<div>
  <span v-for="n in 20">{{ n }} </span>
</div>
```

<br>

> ### How do you use event handlers?

```js
<button @click="show('Welcome to VueJS world', $event)">
  Submit
</button>

methods: {
  show: function (message, event) {
    // now we have access to the native event
    if (event) event.preventDefault()
    console.log(message);
  }
}
```

<br>

> ### What are the supported modifiers on model?

There are three modifiers supported for v-model directive.

**1. lazy:** By default, v-model syncs the input with the data after each input event. You can add the lazy
modifier to instead sync after change events.
```js
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" >
```
**2. number:** If you want user input to be automatically typecast as a number, you can add the number modifier to
your v-model. Even with type="number", the value of HTML input elements always returns a string. So, this typecast
modifier is required.
```js
<input v-model.number="age" type="number">
```
**3. trim:** If you want whitespace from user input to be trimmed automatically, you can add the trim modifier to
your v-model.

```js
<input v-model.trim="msg">
```

<br>

#### You Can Combine Modifiers

```html
<input v-model.lazy.trim.number="amount">
```

**Bonus: `v-model` on Custom Components (Modifiers Support)**

In Vue 2, **modifiers don’t automatically apply** to custom components —
you must **manually handle them** in your component’s `model` option or event logic.

Example:

```vue
<CustomInput v-model.trim="userInput" />
```

To support `.trim`, you must handle it inside `CustomInput`:

```js
this.$emit('input', value.trim())
```

<br>

> ### What are Slots in Vue?

**Slots** are like **placeholders** inside a component that allow you to **inject content** from a parent component into a child component.

<br>

**1. Default Slot**

<details>

```js
// Child component: `Card.vue
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
```


```js
// Parent component
<Card>
  <p>This is some custom text inside the card.</p>
</Card>
```

✅ Output:

```html
<div class="card">
  <p>This is some custom text inside the card.</p>
</div>
```
</details>

**Note:-** If no content is passed, you can define **fallback content** inside `<slot>`:

```vue
<slot>Default Text</slot>
```

<br>

**2. Named Slots**

<details>

Used when you want **multiple slot areas** in one component.

```html
<!-- Child (`Card.vue`): -->
<template>
  <div class="card">
    <header><slot name="header"></slot></header>
    <main><slot></slot></main>
    <footer><slot name="footer"></slot></footer>
  </div>
</template>
```


```js
// Parent:
<Card>
  <template v-slot:header>
    <h3>Title Area</h3>
  </template>

  <p>Main content goes here.</p>

  <template v-slot:footer>
    <small>Footer note</small>
  </template>
</Card>
```
</details>

<br>

**3. Conditional Slots**

Sometimes you render sections **only if the slot content exists**.

<details>

```html
<!-- Child — `Card.vue` -->
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>

    <div v-if="$slots.default" class="card-body">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

Here, `$slots` lets you check whether the parent provided content for that slot.

</details>

<br>

**4. Scoped Slots**

Scoped slots let **child components pass data** to the slot content defined in the **parent**.

This allows the parent to use **child data** inside its slot content.

<details>

```html
<!-- Child (`UserCard.vue`): -->
<template>
  <div>
    <slot :user="user"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { name: 'Pradeep', age: 32 }
    }
  }
}
</script>
```


```js
// Parent:
<UserCard v-slot="{ user }">
  <p>{{ user.name }} is {{ user.age }} years old.</p>
</UserCard>
```

➡️ The parent receives `user` from the child’s slot scope.

</details>

<br>

> ### What is global registration in components?

**Global registration** means you register a component **once**, and it becomes available **everywhere** in your app — without needing to import or register it again in each component.

<br>

<details>

**Example — Global Registration**

In your `main.js`

```js
import Vue from 'vue'
import MyButton from './components/MyButton.vue'

Vue.component('MyButton', MyButton)
```

Now you can use `<MyButton />` in **any** component in your app:

```vue
<template>
  <div>
    <MyButton label="Click me!" />
  </div>
</template>
```
<br>

**Local Registration (for comparison)**

If you **don’t** register globally, you must import and register locally in each component that needs it:

```vue
<script>
import MyButton from '@/components/MyButton.vue'

export default {
  components: { MyButton }
}
</script>
```

</details>

<br>

**Best Practice**

* Use **global registration** only for **base or highly reusable components**, such as:

  * Buttons
  * Modals
  * Inputs
  * Loaders

<br>

> ### What are possible prop types, default, required and validations?

```js
props: {
  // Basic type check (`null` matches any type)
  age: Number,

  // Multiple possible types
  identityNumber: [String, Number],

  // Number with a default value
  minBalance: {
    type: Number,
    default: 10000,
    required: true
  },


  // Object with a default value
  message: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function
    default: function () {
      return { message: 'Welcome to Vue' }
    }
  },


  // Custom validator function
  location: {
    validator: function (value) {
      // The value must match one of these strings
      return ['India', 'Singapore', 'Australia'].indexOf(value) !== -1
    }
  }
}
```

<br>

> ### Route guard

```js
watch: {
  '$route' (to, from) {
    // react to route changes...
  }
}

// OR

// Inside the main route file

beforeRouteUpdate (to, from, next) {
  // react to route changes and then call next()
}
```


<br>

> ### Nested routes

**Nested routes** let you render components **inside other route components**.

In other words, a **parent route** defines a layout or wrapper, and **child routes** render inside it — typically within a `<router-view>` inside the parent.

#### 🗂 Folder structure
```
src/
 ├─ views/
 │   ├─ User.vue        ← parent
 │   ├─ UserProfile.vue ← child
 │   └─ UserPosts.vue   ← child
```


#### 📜 Router setup
```js
// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import User from '@/views/User.vue'
import UserProfile from '@/views/UserProfile.vue'
import UserPosts from '@/views/UserPosts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          path: 'profile',
          component: UserProfile
        },
        {
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

#### 🧱 Parent component (`User.vue`)
```vue
<template>
  <div>
    <h2>User {{ $route.params.id }}</h2>

    <!-- Child components will render here -->
    <router-view></router-view>
  </div>
</template>
```


#### ✅ How It Works

When you visit:

* `/user/5/profile` → renders `User.vue` + `UserProfile.vue` inside it
* `/user/5/posts` → renders `User.vue` + `UserPosts.vue` inside it

So `User.vue` acts as a **layout wrapper**, and child routes render inside its `<router-view>`.

<br>

> ### What are filters?

It is `functions` that let you apply simple `text formatting` like capitalization, currency, or date formatting.

```html
<template>
  <p>{{ price | currency }}</p>
</template>

<script>
export default {
  data: () => ({
    price: 2500
  }),
  filters: {
    currency(value) {
      return '₹' + value.toFixed(2)
    }
  }
}
</script>
```

Output → ₹2500.00

<br>

> ### What are the different ways to create filters

**1. Local filters**

Above is example of Local filters

**2. Global filters**

```js
// main.js
import Vue from 'vue'

Vue.filter('uppercase', function (value) {
  if (!value) return ''
  return value.toString().toUpperCase()
})

Vue.filter('currency', function (value) {
  if (isNaN(value)) return value
  return '₹' + value.toFixed(2)
})
```

Now you can use them anywhere in your templates:

```js
<p>{{ name | uppercase }}</p>
<p>{{ amount | currency }}</p>
```

<br>

> ### How do you chain filters

```js
<p>{{ name | capitalize | truncate(10) }}</p>
```

Each filter receives the result of the previous one.

<br>

> ### Is it possible to pass parameters for filters

Yes

```js
{{ message | filterA('arg1', arg2) }}
```

In this case, filterA takes message expression as first argument and the explicit parameters mentioned in the filter as second and third arguments.

For example, you can find the exponential strength of a particular value

```js
{{ 2 | exponentialStrength(10) }} <!-- prints 2 power 10 = 1024 -->
```

<br>

> ### What are the merging strategies in mixins?

When a mixin and the component itself contain overlapping options

1. component's data taking priority over mixins in cases of overlapping or conflicts.

<details>

```js
var mixin = {
  data: function () {
    return {
      message: 'Hello, this is a Mixin'
    }
  }
}
new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'Hello, this is a Component'
    }
  },
  created: function () {
    console.log(this.$data); // => { message: "Hello, this is a Component'" }
  }
})
```

</details>

2. The Hook functions which are overlapping merged into an array so that all of them will be called. Mixin hooks will be called before the component's own hooks.

<details>

```javascript
const myMixin = {
  created(){
    console.log("Called from Mixin")
  }
}

new Vue({
  el: '#root',
  mixins: [myMixin],
  created(){
    console.log("Called from Component")
  }
})

// Called from Mixin
// Called from Component
```
</details>

<br>

> ### What are custom directives?
Custom Directives are tiny commands that you can attach to DOM elements. They are prefixed with v- to let the
library know you're using a special bit of markup and to keep syntax consistent. 

**Globally**

```javascript
// Register a global custom directive called `v-focus`
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})
```
Now you can use v-focus directive on any element as below,
```js
<input v-focus>
```

**Locally**
```js
directives: {
  focus: {
    // directive definition
    inserted: function (el) {
      el.focus()
    }
  }
}
```
```js
<input v-focus>
```

<br>

> ### What are dynamic components?

A **dynamic component** means you can **swap which component is rendered at runtime**, without changing your template structure.

<br>

Vue provides the special built-in component:

```vue
<component :is="componentName"></component>
```

<br>

<details>

The `:is` attribute decides **which component to render** dynamically.

```vue
<template>
  <div>
    <button @click="current = 'LoginForm'">Login</button>
    <button @click="current = 'RegisterForm'">Register</button>

    <component :is="current"></component>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

export default {
  data() {
    return {
      current: 'LoginForm'
    }
  },
  components: { LoginForm, RegisterForm }
}
</script>
```

✅ When you click:

* “Login” → `LoginForm` renders
* “Register” → `RegisterForm` replaces it

</details>

<br>

**Using `<keep-alive>` (Optional but Powerful)**

If you want to **preserve component state** when switching (e.g., form inputs), wrap it with `<keep-alive>`:

```vue
<keep-alive>
  <component :is="current"></component>
</keep-alive>
```

Now when you toggle back and forth, Vue **caches** previous component states.

<br>

> ### What are async components?

**Async components** are Vue components that are **loaded only when needed**, rather than being included in the main bundle during the initial load.

Think of them as **lazy-loaded components** — Vue fetches them **on demand**, which helps reduce the initial bundle size and improve app startup speed.


**Why use them**
* ⏱️ Faster initial load (smaller JS bundle)
* 📦 Code-splitting (each async component gets its own chunk)
* 🔁 Only load when the component is actually rendered


```js
export default {
  components: {
    // Load MyComponent only when needed
    MyComponent: () => import('./MyComponent.vue')
  }
}
```
<br>

**Advanced Usage**

You can also provide options like a loading or error component:

```js
const AsyncComp = defineAsyncComponent({
  loader: () => import('./HeavyComp.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: LoadError,
  delay: 200,   // show loader after 200ms
  timeout: 3000 // fail if not loaded in 3s
})
```

<br>

> ### What are Recursive Components?

A **recursive component** is a component that **calls itself** within its own template. It’s useful for rendering **nested or tree-like structures** (e.g., menus, comments, folders).


Let’s say you have hierarchical data like this:

```js
data() {
  return {
    item: {
      name: 'Root',
      children: [
        { name: 'Child 1' },
        { 
          name: 'Child 2', 
          children: [{ name: 'Grandchild' }]
        }
      ]
    }
  }
}
```

You can render it recursively like this:

```vue
<template>
  <div>
    <p>{{ item.name }}</p>
    <ul v-if="item.children">
      <li v-for="(child, index) in item.children" :key="index">
        <!-- 👇 Recursive call -->
        <tree-item :item="child"></tree-item>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TreeItem', // 👈 Important: must have a name
  props: ['item']
}
</script>
```

#### Be Careful

* Always ensure a **base condition** (like `v-if="item.children"`) — otherwise, you’ll create **infinite recursion** 🔁 and crash the app.

<br>

> ### How do you resolve circular dependencies between components?

A **circular dependency** happens when:

* Component **A imports B**
* And **B imports A** back

Example:

```js
// A.vue
import B from './B.vue'

// B.vue
import A from './A.vue'
```

This creates a **circular reference loop**, which can cause:

* One component being `undefined`
* Runtime errors
* Unexpected render behavior

<br>

**Ways to Resolve It**

#### **1. Use `name` + `<component :is="...">` instead of direct import**

Instead of importing the same component inside itself, rely on its **registered name** for recursion.

```vue
<!-- TreeItem.vue -->
<template>
  <div>
    <p>{{ item.name }}</p>
    <tree-item v-for="child in item.children" :item="child" />
  </div>
</template>

<script>
export default {
  name: 'TreeItem', // 👈 Important
  props: ['item']
}
</script>
```

➡️ This way, you don’t import the file again — Vue uses the component’s `name` for recursion.

<br>

#### **2. Lazy-load or Dynamically Import**

If components need to reference each other, use **lazy imports** to defer evaluation until runtime:

```js
// A.vue
export default {
  components: {
    B: () => import('./B.vue')
  }
}
```

This breaks the static import loop, because the import only happens **when needed**, not during initial parsing.

<br>

> ### How do you force update?

In Vue, data changes automatically trigger re-renders through its **reactivity system**.\
But sometimes, if Vue **doesn’t detect a change** (like with non-reactive properties or mutated objects), you might need to **manually trigger a re-render**.

<br>

**1. Using `$forceUpdate()`**

Each Vue component instance has a built-in method:

```js
this.$forceUpdate()
```

This forces the component to **re-render**, skipping reactivity checks.

```html
<template>
  <div>
    <p>{{ obj.message }}</p>
    <button @click="change">Change</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {}
    }
  },
  methods: {
    change() {
      this.obj.message = "Hello Vue!"
      // Vue won't detect this, so:
      this.$forceUpdate()
    }
  }
}
</script>
```

Here:

* `obj` is reactive, but adding a **new property** (`message`) isn’t tracked in Vue 2.
* Calling `this.$forceUpdate()` forces the template to refresh.

<br>

**2. Alternatives (Better Options)**

#### a. **Use `Vue.set` / `this.$set` (Vue 2 only)**

```js
this.$set(this.obj, 'message', 'Hello Vue!')
```

This is **reactive** — no need to force update.

#### b. **Use Spread Syntax to Replace Object**

```js
this.obj = { ...this.obj, message: 'Hello Vue!' }
```

Replacing the whole object triggers reactivity.

<br>

> ### What is the purpose of vuejs once directive?

The **`v-once` directive** tells Vue to **render the element or component only once**, and then **skip it during future re-renders**.


**Purpose**

1. **Performance Optimization** ✅

   * Useful for parts of the template that **never change**, so Vue can skip diffing and patching them in the virtual DOM.
2. **Static Content**

   * Ideal for **static headers, footers, or labels** that don’t depend on reactive data.

<details>

```html
<template>
  <div>
    <p v-once>{{ message }}</p>
    <p>{{ message }}</p>
    <button @click="message = 'Hello Vue!'">Change</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Initial Message'
    }
  }
}
</script>
```

<br>

* Works with **elements and components**:
```vue
<my-component v-once></my-component>
```

</details>

<br>

> ### How do you access the root instance?

The **root instance** is the main Vue instance you create in your app, usually mounted to `#app`:

```js
const app = new Vue({
  data: { message: 'Hello Vue!' },
  methods: { greet() { alert(this.message) } }
}).$mount('#app')
```
<br>

**Access Root From a Child Component**
```js
this.$root
```

* `this.$root` points to the **root Vue instance**.
* You can access **data, methods, or computed properties** defined in the root.

<br>


> ### Is it possible to mix both local and global styles?
Yes, you can include both scoped and non-scoped styles in the same component. If you don't mention scoped attribute
then it will become global style.

```css
  <style>
  /* global styles */
  </style>

  <style scoped>
  /* local styles */
  </style>
```

<br>

> ### How do you use deep selectors?

When you use **scoped CSS** in Vue, styles are **automatically scoped to the component** using attributes like `data-v-xxxx`.

* Problem: Sometimes you want to **style a child component deeply**, beyond the current component’s root.
* Solution: **Deep selectors** let you target **nested elements inside child components**, bypassing the scoped isolation.

```css
/* Using ::v-deep pseudo-element */
::v-deep(.child-class) {
  color: red;
}

/* Shorthand inside a parent selector */
.parent ::v-deep .child-class {
  font-weight: bold;
}
```

<br>

**Alternative approach**

**Using `>>>`** (older shorthand):

```css
.parent >>> .child-class {
  text-decoration: underline;
}
```

**Example**

#### **Parent.vue**

```vue
<template>
  <div class="parent">
    <child-component />
  </div>
</template>

<style scoped>
.parent ::v-deep(.child-text) {
  color: red;
}
</style>
```

#### **Child.vue**

```vue
<template>
  <p class="child-text">I am styled from parent!</p>
</template>

<style scoped>
.child-text {
  font-size: 16px;
}
</style>
```

**Result:**

* `child-text` inside `Child.vue` is colored **red** from the parent’s scoped CSS.

<br>

> ### What is the purpose of strict mode in vuex?

In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown. It make sure that all state mutations can be explicitly tracked by debugging tools. You can just enable this by passing
`strict: true` while creating the vuex store.

```javascript
const store = new Vuex.Store({
  // ...
  strict: true
})
```


<br>

> ### Can I use strict mode in production environment?

No, it is not recommended to use strict mode in production environment. Strict mode runs a synchronous deep watcher
on the state tree for detecting inappropriate mutations and it can be quite expensive when you perform large amount
of mutations. i.e, It can impact performance if you enable in production mode.
Hence, it should be handled through build tools,


```javascript
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```

<br>

> ### What is the reason not to update the state directly?
We want to explicitly track application state in order to implement tools that can log every mutation, take state snapshots, or even perform time travel debugging. So we need to commit a mutation instead of changing store's state directly.


<br>

> ### What is mapState helper

It makes it easier to access **state variables** from your Vuex store inside a Vue component — without writing repetitive code.

It “maps” Vuex state properties to **computed properties** in your component.


**Without `mapState`**

```js
computed: {
  count() {
    return this.$store.state.count
  },
  user() {
    return this.$store.state.user
  }
}
```

<br>

**With `mapState`**

```html
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>User: {{ user.name }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['count', 'user'])
  }
}
</script>
```

🟢 Now you can use `{{ count }}` or `{{ user }}` directly in your template.

<br>

**Using Aliases (Custom Names)**

You can rename state properties if needed:

```js
computed: {
  ...mapState({
    total: 'count', // this.total = state.count
    profile: 'user'
  })
}
```

<br>

**With Functions**

You can also compute something using the state:

```js
computed: {
  ...mapState({
    doubledCount: (state) => state.count * 2
  })
}
```

<br>

> ### How do you combine local computed properties with mapState helper

When you use `mapState`, it replaces the entire `computed` section if not combined properly.\
So, you need to **merge your local computed properties** with the `mapState` ones.


**Solution** - Use the **spread operator (`...`)** to combine them.

```js
import { mapState } from 'vuex'

export default {
  computed: {
    // 🟢 Local computed property
    localComputed() {
      return this.message.toUpperCase()
    },

    // 🟢 Vuex state mapped properties
    ...mapState(['count', 'user'])
  },

  data() {
    return {
      message: 'hello'
    }
  }
}
```

<br>

> ### What are vuex getters??

Vuex getters acts as computed properties for stores to compute derived state based on store state.

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: 'Vue course', completed: true },
      { id: 2, text: 'Vuex course', completed: false },
      { id: 2, text: 'Vue Router course', completed: true }
    ]
  },
  getters: {
    completedTodos: state => {
      return state.todos.filter(todo => todo.completed)
    }
  }
})
```

<br>

> ### What is a property style access? What is a method style access

**1. Property Style Access**

Property-style access treats a **getter** like a **computed property** — you access it **without parentheses**.

<details>

```js
const store = new Vuex.Store({
  state: { count: 10 },
  getters: {
    doubleCount: (state) => state.count * 2
  }
})
```

Then in your component:

```js
computed: {
  ...mapGetters(['doubleCount'])
}
```

And in template:

```vue
<p>{{ doubleCount }}</p>
```
</details>

<br>

**2. Method Style Access**

Method-style access treats a **getter** like a **function**

<details>

```js
const store = new Vuex.Store({
  state: { todos: [ { done: true }, { done: false } ] },
  getters: {
    // getter returning a function
    getTodosByStatus: (state) => (done) => {
      return state.todos.filter(todo => todo.done === done)
    }
  }
})
```

Then in component:

```js
computed: {
  ...mapGetters(['getTodosByStatus'])
}
```

And in template:

```js
<ul>
  <li v-for="todo in getTodosByStatus(true)" :key="todo.id">
    {{ todo }}
  </li>
</ul>
```

**Key:** `getTodosByStatus(true)` — called like a **method**, because it needs an argument.

</details>

<br>

> ### What is mapGetter helper

`mapGetters` is a **Vuex helper function** that lets you easily use **getters** from your Vuex store as **computed properties** inside your components.

It saves you from manually writing a bunch of computed properties that return store getters.

**Without `mapGetters`**

```js
computed: {
  doubleCount() {
    return this.$store.getters.doubleCount
  },
  isLoggedIn() {
    return this.$store.getters.isLoggedIn
  }
}
```
<br>

**With `mapGetters`**

```js
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['doubleCount', 'isLoggedIn'])
  }
}
```

🟢 Now you can use `{{ doubleCount }}` and `{{ isLoggedIn }}` directly in your template.

<br>

**Using Aliases (Custom Names)**

You can rename getters to match local naming:

```js
computed: {
  ...mapGetters({
    countDouble: 'doubleCount',
    userStatus: 'isLoggedIn'
  })
}
```

Now you use:

```vue
<p>{{ countDouble }}</p>
<p>{{ userStatus }}</p>
```

<br>

> ### What are mutations?

he handler function is where we perform actual state modifications, and it will receive the state as the first argument.

You can also pass payload for the mutation as an additional argument to store.commit.

```js
mutations: {
  increment (state, payload) {
    state.count += payload.increment
  }
}
```

You can't directly invoke mutation instead you need to call store.commit with its type.

```js
store.commit('increment', {
  increment: 20
})
```


**object style commit**

```js
store.commit({
  type: 'increment',
  value: 20
})

mutations: {
  increment (state, payload) {
    state.count += payload.value
  }
}
```


<br>

> ### Why mutations should be synchronous?

Mutations in Vuex **must be synchronous** because **Vuex’s state change tracking** depends on them being **predictable and traceable**.

If a mutation were asynchronous, the **devtools**, **time-travel debugging**, and **state snapshots** would all become unreliable.

<br>

When you commit a mutation then Vuex immediately records:

1. The **previous state**
2. The **mutation type and payload**
3. The **next state**

🕓 If mutations were asynchronous, Vuex wouldn’t know *when* the mutation actually finished, so:

* Devtools can’t log accurate state transitions
* State history becomes inconsistent
* Debugging becomes very hard

<br>

**Wrong (async mutation)**

```js
mutations: {
  incrementAsync(state) {
    setTimeout(() => {
      state.count++ // asynchronous mutation ❌
    }, 1000)
  }
}
```

* Vuex logs `incrementAsync` **immediately**, but the state actually changes **later**, breaking state tracking.

<br>

**Correct Way**

Keep mutations synchronous and move async code into **actions**:

```js
actions: {
  asyncIncrement({ commit }) {
    setTimeout(() => {
      commit('increment') // commit synchronously
    }, 1000)
  }
},
mutations: {
  increment(state) {
    state.count++ // synchronous ✅
  }
}
```

<br>

> ### How do you perform mutations in components?

You can commit mutations in components with either **this.$store.commit('mutation name')** or mapMutations helper to map component methods to **store.commit** calls.

<br>

For example, the usage of mapMutations helper on counter example would be as below,
```javascript
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'increment', // map `this.increment()` to `this.$store.commit('increment')`

      // `mapMutations` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
    })
  }
}
```

<br>

> ### In Vuex, mutations are synchronous transactions. But if you want to handle asynchronous operations then you should use actions.

<br>

> ### What are Actions in Vuex?

In Vuex, **actions** are functions used to perform **asynchronous operations** (like API calls) before committing mutations to change the state.

They **cannot directly mutate the state** — instead, they **commit** mutations once async tasks finish.

```js
actions: {
  async someAction(context, payload) {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      commit('setUsers', response.data) // commit mutation after async call
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
}
```

**Note:**

Fetch data → `dispatch` → `action` → `commit` → `mutation` → `update state` → UI re-renders.


<br>

> ### Can you dispatch an action using payload or object style?

Yes, actions support both payload and object style format similar to mutations.
```javascript
// dispatch with a payload
store.dispatch('incrementAsync', {
  amount: 10
})

// dispatch with an object
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

<br>

> ### How do you dispatch actions in components?

You can dispatch actions in components with **this.$store.dispatch('action name')**, or use the **mapActions**
helper which maps component methods to store.dispatch calls.

For example, you can dispatch increment actions in counter component as below,
```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // map `this.increment()` to `this.$store.dispatch('increment')`

      // `mapActions` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // map `this.add()` to `this.$store.dispatch('increment')`
    })
  }
}
```

<br>

> ### How to use model directive with two way computed property?

You can still use model directive using two-way computed property with a setter.
```js
<input v-model="username">

computed: {
  username: {
    get () {
      return this.$store.state.user.username
    },
    set (value) {
      this.$store.commit('updateProfile', value)
    }
  }
}
mutations: {
  updateProfile (state, username) {
    state.user.username = username
  }
}
```

<br>

> ### What is the main difference between method and computed property?
The main difference between a computed property and a method is that computed properties are cached and invoke/change only when their dependencies change. Whereas a method will evaluate every time it's called.

<br>

> ### How do you watch for nested data changes?

By default, Vue’s `watch` only detects **changes to the property itself**, **not** its nested values.

```js
data() {
  return {
    user: {
      name: 'John',
      age: 25
    }
  }
},
watch: {
  user(newVal, oldVal) {
    console.log('User changed') // ❌ Won’t trigger when only user.name changes
  }
}
```


**Solution: Use `deep: true`**

You can enable **deep watching** to track changes inside nested objects or arrays.

```js
watch: {
  user: {
    handler(newVal, oldVal) {
      console.log('Nested data changed:', newVal)
    },
    deep: true
  }
}
```

Every time `name` or `age` changes, the watcher runs.


❌ Avoid it when:

* The object is **large**, and you only need to watch specific properties — it can be **performance-heavy**.

<br>

**Alternative — Watch Specific Nested Properties**

Instead of deep watching the whole object, target a specific field:

```js
watch: {
  'user.name'(newVal) {
    console.log('Name changed:', newVal)
  }
}
```

This is **more efficient** and often preferable.

<br>

**Summary Table**

| Method        | Description                | Performance |
| ------------- | -------------------------- | ----------- |
| `deep: true`  | Watches all nested changes | 🟠 Medium   |
| `'obj.prop'`  | Watches specific property  | 🟢 Best     |
| Default watch | Watches top-level only     | 🔵 Fastest  |

<br>

> ### Is recommended to use async for computed properties?

❌ **No, it’s not recommended (or supported)** to make **computed properties asynchronous** in Vue.

Computed properties in Vue are designed to be:

* **Pure** (no side effects)
* **Synchronous**
* **Cacheable**

When you use async logic (like `await`, `Promise`, or API calls), Vue can’t:

* Know **when** the value will resolve
* **Cache** the computed result properly
* **Trigger reactivity** when async data changes

So the computed property won’t behave predictably.

<br>

**Recommended Alternatives use `watch` or `watchEffect`**

Trigger async calls when a reactive value changes, and store results in data.

```js
data() {
  return {
    userId: 1,
    userData: null
  }
},
watch: {
  userId: {
    async handler(id) {
      const res = await fetch(`/api/users/${id}`)
      this.userData = await res.json()
    },
    immediate: true
  }
}
```
<br>

> ### Why the component data must be a function?

In Vue **components**, the `data` option **must be a function** that returns an object, instead of just an object.

When `data` is a plain object:

```js
data: { count: 0 }
```

* All **instances of the component** will **share the same object**.
* Changing `count` in one instance will affect **all other instances** — not what you usually want.

#### Problem Example:

```vue
<my-counter v-for="n in 2" :key="n" />
```

```js
// data is an object
data: { count: 0 }
```

* Both counters will **share the same `count`**.
* Incrementing one counter increments the other automatically!


**Solution: Use a Function**

```js
data() {
  return {
    count: 0
  }
}
```

* Each component instance **gets its own copy of the data object**.
* Changes in one component **do not affect others**. ✅

<br>

> ### What is the best way to re-render a component?
The best way to force Vue to re-render a component is to set a `:key` on the component. i.e, Whenever the component
to be re-rendered, just change the value of the key then Vue will re-render the component.

<br>

> ### DOM Update Timing

Vue batches DOM updates for efficiency — updates happen asynchronously on the next tick.

If you need to run code after the DOM update, use nextTick():

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // DOM is now updated
    }
  }
}
```
<br>

| Feature      | Computed Property                                | Method                   |
| ------------ | ------------------------------------------------ | ------------------------ |
| **Caching**  | ✅ Cached — only re-runs when dependencies change | ❌ Runs every time        |
| **Use Case** | Expensive calculations or derived data           | Simple or uncached logic |

```js
computed: {
  list() {
    // cached result until its dependencies change
  }
}
methods: {
  list() {
    // re-runs on every re-render
  }
}
```

<br>

### How to use v-model on custom input box

Read data of the below
```
https://vuejs.org/guide/components/v-model.html
```

```vue
<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input :id="id" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    value: String,
  },
};
</script>
```
```vue
<template>
  <div>
    <custom-input v-model="name" id="my-input" label="Enter your name:" />
  </div>
</template>

<script>
import CustomInput from './CustomInput.vue';

export default {
  components: {
    CustomInput,
  },
  data() {
    return {
      name: '',
    };
  },
};
</script>
```

<br>

### How can you write duplicate virtual nodes in a component?
In Vue.js, you can write duplicate virtual nodes in a component by using a `v-for` directive with a unique `key` attribute. The `key` attribute is used by Vue.js to identify each node and keep track of its state, even when the node is duplicated.

Here's an example of how to write duplicate virtual nodes in a component using `v-for` and `key`:

```vue
<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['item 1', 'item 2', 'item 3', 'item 2'],
    };
  },
};
</script>
```
<br>

> ### What is Vue Loader(for Webpack) 
* **Purpose:** A Webpack loader that lets you write Vue components (`.vue` files) and compiles them into browser-ready JavaScript.
* **How it works:**

  * Parses `.vue` files (template, script, style).
  * Transforms them into JavaScript modules Webpack can bundle.
* **Benefits:**

  * Enables modular and reusable component development.
  * Simplifies dependency management between components.
* **Key Features:**

  * Supports template compilation, scoped CSS, and custom blocks.
  * Enables hot-reloading for faster development.
  * Works with CSS preprocessors like Sass and Less.
  * Can be extended via plugins for extra functionality.
* **Overall:** Simplifies building Vue apps by making component-based development intuitive and efficient.

<br>

> ### How do you configure vue loader in webpack?

<details>

```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files and `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // this will apply to both plain `.css` files and `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for cloning and mapping them to respective language blocks
    new VueLoaderPlugin()
  ]
}
```

- We can have 2 or more style in single component. One style is used for the global style and other one can be scoped style

- CSS modules in vue js (similar like we use in the react)(:class="$style.red" and `<style module>` wala part is module)

<br>

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

</details>

<br>

> ### How to make router param changes as reactive?

Let’s say you have a route like:

```
/user/:id
```

And a component like this:

```js
export default {
  created() {
    this.fetchUser(this.$route.params.id)
  },
  methods: {
    fetchUser(id) {
      console.log('Fetching user', id)
    }
  }
}
```

When you navigate:

```
/user/1 → /user/2
```

Vue **reuses the same component instance** (for performance),
so `created()` doesn’t run again — meaning the `id` change won’t trigger a new fetch.

<br>

**Why It Happens**

In Vue 2, **router params** (`$route.params`) are **reactive**, but the **component instance is reused** for the same route record.
So lifecycle hooks like `created()` or `mounted()` don’t fire again.

<br>

**Solution 1: Watch `$route` or `$route.params`**

```js
// Option A — Watch the Entire `$route`
watch: {
  $route(to, from) {
    this.fetchUser(to.params.id)
  }
}


// Option B — Watch Just the Param
watch: {
  '$route.params.id'(newId, oldId) {
    this.fetchUser(newId)
  }
}
```

<br>

**Solution 2: Use `beforeRouteUpdate` Navigation Guard**

If your component is a **route component**, you can use this special guard.

```js
export default {
  methods: {
    fetchUser(id) {
      console.log('Fetching user', id)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchUser(to.params.id))
  },
  beforeRouteUpdate(to, from, next) {
    // Called when route changes but the same component is reused
    this.fetchUser(to.params.id)
    next()
  }
}
```

`beforeRouteUpdate` runs every time params or query change within the same route.

<br>

**Solution 3: Force Re-render with a Key**

If your component is simple and doesn’t need a guard,\
you can force Vue to recreate the component when params change:

```html
<router-view :key="$route.fullPath" />
```

or

```html
<router-view :key="$route.params.id" />
```

This makes Vue **destroy and re-create** the component whenever the param changes — which triggers the full lifecycle again (`created`, `mounted`, etc.).

<br>

> ### Event Bus

* **Parent → Child** → via **props**
* **Child → Parent** → via **$emit()**

But if two components don’t share a direct relationship, passing events through multiple levels becomes messy.\
That’s where **Event Bus** helps — it acts like a **central event hub**.

<br>

**How Event Bus Works**

It’s just a **Vue instance** used for emitting and listening to custom events.

**Step 1: Create the Event Bus**

```js
// eventBus.js
import Vue from 'vue'
export const EventBus = new Vue()
```


**Step 2: Emit an Event (from one component)**

```js
// ComponentA.vue
import { EventBus } from './eventBus'

export default {
  methods: {
    sendMessage() {
      EventBus.$emit('message', 'Hello from Component A!')
    }
  }
}
```

**Step 3: Listen for the Event (in another component)**

```js
// ComponentB.vue
import { EventBus } from './eventBus'

export default {
  created() {
    EventBus.$on('message', (msg) => {
      console.log('Received:', msg)
    })
  },
  beforeDestroy() {
    // Clean up listener to avoid memory leaks
    EventBus.$off('message')
  }
}
```

**Key Points**

* **$emit(eventName, payload)** → fires the event
* **$on(eventName, callback)** → listens for it
* **$off(eventName)** → removes listener (important for cleanup)

<br>

Avoid in:

* Large apps — can become **hard to trace/debug**.
* Better alternatives:

  * **Vuex / Pinia** → for state management
  * **Provide/Inject** → for deep component trees
  * **Composables / Stores** → in Vue 3 (Composition API)

<br>


> ### What Are Fallthrough Attributes?

> Attributes (like `class`, `style`, `id`, or `@click`) **that are passed to a component but not declared as props or emits**.

<br>

Vue automatically “passes them through” to the component’s **root element**.


```vue
<!-- Parent -->
<MyButton class="large" />
```

```vue
<!-- Child -->
<template>
  <button>Click Me</button>
</template>
```

✅ Output:

```html
<button class="large">Click Me</button>
```

Since `class` was **not declared as a prop**, Vue treated it as a **fallthrough attribute** and automatically applied it to the root `<button>`.

<br>

### 1. Merging class and style

<details>

If the child already defines its own `class` or `style`, Vue merges both:

```vue
<!-- Child -->
<template>
  <button class="btn">Click Me</button>
</template>
```

Parent:

```vue
<MyButton class="large" />
```

✅ Output:

```html
<button class="btn large">Click Me</button>
```

Both class names are merged automatically.

<br>

**v-on Listener Inheritance**

Same rule for event listeners like `@click`:

```vue
<MyButton @click="onClick" />
```

If the child’s root is a native `<button>`, then `onClick` will be attached there — even if the child doesn’t declare it in `emits`.

If the child *also* binds `@click`, both listeners will run.

</details>

<br>

### 2. Nested Component Inheritance

If a component renders **another component** as its root:

```vue
<!-- MyButton.vue -->
<BaseButton />
```

Then all fallthrough attributes passed to `<MyButton>` automatically **forward** to `<BaseButton>`.

But:

* Props or emits declared by `<MyButton>` are *not* forwarded (they’re considered “consumed”).
* Anything else (like `class`, `style`, `@click`) gets passed down.

<br>

### 3. Disabling Automatic Inheritance

If you don’t want automatic attribute inheritance:

```js
export default {
  inheritAttrs: false
}
```

Then you can manually decide **where** to apply them using `$attrs`.

<br>

### 4. Using `$attrs`

<details>

Normally, when you pass attributes (like `class`, `id`, `@click`, etc.) to a component, Vue automatically applies them to the component’s root element. But i want is instead of root element, it should be applied to that component which i want.

Then we Disable Automatic Inheritance

```js
export default {
  inheritAttrs: false
}
```

This tells Vue:

> “Don’t automatically apply unknown attributes to my root element. I’ll handle them myself.”

Now, Vue won’t apply anything automatically.

When you disable `inheritAttrs`, all those “unclaimed” attributes (like `class, id, @click, style`, etc.) are collected inside a special object: `$attrs`.

```js
<MyButton class="large" id="save-btn" @click="submit" />
```

```html
<script>
export default {
  inheritAttrs: false,
  created() {
    console.log(this.$attrs)
  }
}
</script>
```

Then `this.$attrs` would look like:

```js
{
  class: "large",
  id: "save-btn",
  onClick: ƒ()  // event listener function
}
```

Now you can `manually decide` where to apply them.

```html
<template>
  <div class="btn-wrapper">
    <!-- Apply all fallthrough attributes to the actual button -->
    <button class="btn" v-bind="$attrs">Click Me</button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
```

Here’s what happens step-by-step:

1. `<MyButton class="large" @click="submit" /> `is used in parent.
2. Because inheritAttrs is false, Vue doesn’t apply them to `<div>`.
3. $attrs now holds { class: 'large', onClick: ƒ }.
4. v-bind="$attrs" spreads those attributes onto `<button>`.


Output in browser 
```html
<div class="btn-wrapper">
  <button class="btn large">Click Me</button>
</div>
```

</details>

<br>

### 5. Attribute Inheritance on Multiple Root Nodes

If your component has **multiple root elements**, Vue won’t know where to apply fallthrough attributes automatically.

Example:

```vue
<template>
  <header>Header</header>
  <main>Main</main>
  <footer>Footer</footer>
</template>
```

If you do:

```vue
<CustomLayout id="layout" @click="changeValue" />
```
<br>

🚨 Vue warns:

> "Extraneous non-prop attributes (id, onClick) were passed to component but could not be automatically inherited because it has multiple root nodes."

✅ Fix: Explicitly bind `$attrs` to a specific element.

```vue
<template>
  <header>Header</header>
  <main v-bind="$attrs">Main</main>
  <footer>Footer</footer>
</template>
```

<br>

> ### What is `provide` / `inject`?

`provide` and `inject` are a **dependency-sharing mechanism** between ancestor and descendant components (no matter how deep).
They help you **avoid prop drilling** — passing props through multiple layers unnecessarily.

Instead of passing props manually, an ancestor can `provide` data, and any descendant can `inject` it directly.

```html
<!-- Parent.vue -->
<script>
export default {
  provide: {
    message: 'Hello!'
  }
}
</script>
```

```html
<!-- DeepChild.vue -->
<script>
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // "Hello!"
  }
}
</script>
```

<br>

### Injection Aliasing

If you want a different local name for the injected key:

```js
export default {
  inject: {
    localTheme: { from: 'theme' }
  }
}
```

Now you can use `this.localTheme`.

<br>

### Injection Default Values

If the provider might not exist, add defaults to avoid warnings:

```js
export default {
  inject: {
    theme: {
      from: 'theme',
      default: 'light'
    },
    user: {
      default: () => ({ name: 'Guest' })
    }
  }
}
```
<br>

### Making Injection Reactive

By default, injected data is **not reactive**.\
To make it reactive, provide a `computed` value:

<details>

```js
import { computed } from 'vue'

export default {
  data() {
    return { message: 'hello!' }
  },
  provide() {
    return {
      message: computed(() => this.message)
    }
  }
}
```

Now if `this.message` changes in the provider, the injected value updates automatically.

</details>

<br>


<br>

> ### Vuex Modules Overview

* Vuex allows splitting the store into **modules** to avoid a bloated single state tree.
* Each module can have its own:

  * `state`
  * `mutations`
  * `actions`
  * `getters`
  * Nested `modules`

```js
const moduleA = { state: () => ({}), mutations: {}, actions: {}, getters: {} }
const store = createStore({ modules: { a: moduleA } })
store.state.a // moduleA's state
```

<br>

### Module Local State

* **Mutations & Getters:** first argument is local `state`.
* **Actions:** `context.state` = local, `context.rootState` = global root state.
* **Getters:** `rootState` is 3rd argument.

```js
getters: {
  sumWithRootCount(state, getters, rootState) { return state.count + rootState.count }
}
```

<br>

### Namespacing

* By default, actions, mutations, and getters are **global**.
* Use `namespaced: true` to make module self-contained:

```js
const account = {
  namespaced: true,
  state: () => ({}),
  getters: { isAdmin: state => {} },   // accessed as 'account/isAdmin'
  actions: { login() {} },             // dispatch('account/login')
  mutations: { login() {} }            // commit('account/login')
}
```

* Nested namespaced modules inherit or extend namespace.

<br>

### Accessing Global Assets in Namespaced Modules

* **Getters:** `rootGetters` (4th argument).
* **Actions:** `rootState`, `rootGetters`.
* Dispatch/commit global: `{ root: true }`.

```js
dispatch('someAction', null, { root: true })
commit('someMutation', null, { root: true })
```

<br>

### Global Actions in Namespaced Modules

* Mark action with `root: true` and use `handler` function.

```js
actions: {
  someAction: { root: true, handler(ctx, payload) { ... } }
}
```

<br>

### Binding Helpers

* Use `mapState`, `mapGetters`, `mapActions`, `mapMutations` with module namespace:

```js
computed: { ...mapState('moduleA', { a: state => state.a }) }
methods: { ...mapActions('moduleA', ['foo']) }
```

* Or create namespaced helpers:

```js
const { mapState, mapActions } = createNamespacedHelpers('moduleA')
```

<br>

### Dynamic Module Registration

* `store.registerModule('myModule', module)` or nested: `['nested','myModule']`
* Remove dynamically: `store.unregisterModule('myModule')`
* Check: `store.hasModule('myModule')`
* Preserve existing state: `{ preserveState: true }`

<br>

### Module Reuse

* Use a **function** for `state` to avoid shared state across modules or stores:

```js
const MyReusableModule = {
  state: () => ({ foo: 'bar' }),
  mutations: {}, actions: {}, getters: {}
}
```

<br>

✅ **Key Takeaways**

* Modules help organize large stores.
* Namespacing isolates modules for reusability.
* Dynamic registration allows flexible module management.
* Use `state` as a function to avoid shared state issues.

<br>


> ### As FE architeure, how you setup the vuetify and what challenges you faced

> “I configured Vuetify as part of the global UI layer — defining a centralized theme system, global component overrides, and reusable layout patterns.

1. Theme setup
```js
// plugins/vuetify.js
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo.base,
        secondary: colors.pink.base,
        accent: colors.deepPurple.accent2,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.indigo.lighten1,
      }
    },
    options: { customProperties: true }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
})
```

Then load it globally:

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxtjs/vuetify'],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  }
}
```

<br>

2. Theming & Custom Variables

I set up **custom SCSS variables** for brand consistency:

```scss
// assets/variables.scss
$btn-border-radius: 8px;
$body-font-family: 'Inter', sans-serif;
$heading-font-family: 'Poppins', sans-serif;
```

And apply **dynamic themes**:

```js
vuetify.framework.theme.dark = userPrefersDarkMode
```

<br>

3. Directory Structure for Scalability

```
src/
├── plugins/
│   └── vuetify.js        # Vuetify setup
├── styles/
│   ├── variables.scss     # SCSS vars
│   ├── overrides.scss     # Component overrides
│   └── mixins.scss
├── components/
│   ├── base/              # <BaseButton>, <BaseDialog>, <BaseCard>
│   └── layout/            # <AppHeader>, <AppSidebar>
```
<br>

> ### Multiple child gets same data, how you prevent multiple rerendering


#### 1. Identify Why Multiple Re-renders Happen

In Vue (or React), re-renders are triggered when:

* Props change (new object or reference).
* Reactive store/state changes.
* Parent re-renders and passes new reactive data.

So the key is to **stabilize references** and **minimize reactive depth**.

<br>

#### 2. Techniques to Prevent Re-renders

**a. Use Vuex / Pinia or Global Store for Shared Data**\
**b. Use `computed` for Caching Derived Data**

If multiple children depend on the same source data:

* Keep it in a centralized store.
* Let each child subscribe to only the **specific slice** it needs.

Example (Vuex):

```js
// store.js
state: {
  users: []
},
getters: {
  getUserById: (state) => (id) => state.users.find(u => u.id === id)
}
```

Then in components:

```vue
<script>
computed: {
  user() {
    return this.$store.getters['getUserById'](this.userId)
  }
}
</script>
```

✅ Only the specific computed value updates — not all components.

<br>

**c. Use `v-once`**

```vue
<ChildComponent v-once :data="data" />
```

✅ Prevents re-render when the data reference doesn’t change.

<br>

**d. Stabilize Object/Array References**

Passing inline objects/arrays triggers re-render every time:

```vue
❌ <Child :filters="{ active: true }" />
```

Vue treats this as a new object each render.
✅ Fix:

```vue
<script>
export default {
  data: () => ({ filters: { active: true } })
}
</script>
<Child :filters="filters" />
```

Now it only changes when `filters.active` changes.