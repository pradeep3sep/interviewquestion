```
https://github.com/pradeep3sep/vuejs-interview-questions
```

### How to use v-model on custom input box
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

### How to make custom directive using the arguments el,binding etc
https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks

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

### What are dynamic components in vue js
Dynamic components in Vue.js are components that can be switched dynamically at runtime. They allow you to conditionally render different components based on data or user input, without having to manually toggle their visibility or add/remove them from the DOM.

In Vue.js, you can use the built-in `<component>` element to render dynamic components. The `<component>` element is used as a placeholder for the component you want to render, and you can use a `v-bind:is` directive to dynamically switch between different components.

Here's an example of how to use dynamic components in Vue.js:
```vue
<template>
  <div>
    <button @click="toggleComponent">Toggle Component</button>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import FirstComponent from './components/FirstComponent.vue';
import SecondComponent from './components/SecondComponent.vue';

export default {
  data() {
    return {
      currentComponent: 'FirstComponent',
    };
  },
  methods: {
    toggleComponent() {
      this.currentComponent =
        this.currentComponent === 'FirstComponent'
          ? 'SecondComponent'
          : 'FirstComponent';
    },
  },
  components: {
    FirstComponent,
    SecondComponent,
  },
};
</script>
```

### What are async components
In Vue.js, async components are similar to async components in React, in that they allow developers to split a large component into smaller chunks that can be loaded asynchronously, improving the performance of the application.

To define an async component in Vue.js, developers can use the `Vue.component()` method and specify a `component` property that is a function that returns a Promise that resolves to a component definition object. This component definition object can include properties such as `template`, `data`, `computed`, and `methods`, similar to regular components in Vue.js.

Here is an example of defining an async component in Vue.js:

```js
Vue.component('async-component', () => {
  return import('./AsyncComponent.vue');
});
```

In this example, we define an async component named 'async-component' using the `Vue.component()` method. The second argument to the method is a function that returns a Promise that resolves to a component definition object. The component is loaded using the `import()` function, which is a JavaScript feature that loads modules asynchronously.

Once the Promise resolves, Vue.js will automatically register the component and render it when it is used in the template. The component can then be used like any other Vue.js component, using its name as a custom element in the template.

```vue
<template>
  <div>
    <async-component></async-component>
  </div>
</template>
```

Async components in Vue.js provide a way to optimize the performance of large applications by loading components only when they are needed, rather than loading them all at once. This can significantly reduce the initial load time of the application and improve the overall user experience.

### What is the structure of async component factory in vue js
An async component factory in Vue.js is a way to create components that are loaded asynchronously, which can improve the performance of your application by only loading the components that are needed when they are needed.

The structure of an async component factory in Vue.js consists of a factory function that returns a Promise that resolves to the component definition. Here's an example:

```js
const AsyncComponent = () => ({
  // The component definition is returned inside a Promise
  component: import('./MyComponent.vue'),
  // A loading component can be specified to be displayed while the async component is loading
  loading: LoadingComponent,
  // An error component can be specified to be displayed if the async component fails to load
  error: ErrorComponent,
  // The delay before showing the loading component (defaults to 200ms)
  delay: 500,
  // Whether to suspend the rendering of the parent component until the async component has loaded (defaults to false)
  suspensible: true
});

export default AsyncComponent;
```

In this example, `AsyncComponent` is a factory function that returns an object with several properties. The `component` property is a Promise that resolves to the component definition, which is imported from a file called `MyComponent.vue`. The `loading` and `error` properties are optional components that can be displayed while the async component is loading or if it fails to load. The `delay` property specifies the amount of time to wait before showing the loading component, and the `suspensible` property determines whether to suspend the rendering of the parent component until the async component has loaded.

To use the async component factory, you can import it like any other component and use it in your template like this:

```vue
<template>
  <AsyncComponent />
</template>

<script>
import AsyncComponent from './AsyncComponent';

export default {
  components: {
    AsyncComponent
  }
}
</script>
```
When the AsyncComponent is rendered, it will load the component definition asynchronously and render it when it is ready.

### what is vue loader 
Vue Loader is a loader for Webpack, a popular module bundler for web applications, that allows you to write Vue.js components in a format that can be compiled into JavaScript code that can be run in a web browser.

Vue Loader works by parsing your Vue components and their associated templates, and then transforming them into JavaScript code that can be included in your application. This allows you to write your components in a more modular and reusable way, and it also makes it easier to manage the dependencies between your components.

Vue Loader supports many features of Vue.js, including template compilation, scoped CSS, custom blocks, and hot-reloading. It also supports pre-processors such as Sass and Less, and can be configured to use other plugins to extend its functionality.

Overall, Vue Loader simplifies the process of building Vue.js applications by allowing developers to write components in a more intuitive and efficient way.

### How do you configure vue loader in webpack?
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

### What are the conditional directives
VueJS provides set of directives to show or hide elements based on conditions. The available directives are: v-if, v-else, v-else-if and v-show

### What is the difference between v-show and v-if directives?
Below are some of the main differences between v-show and v-if directives,
* v-if only renders the element to the DOM if the expression passes whereas v-show renders all elements to the DOM and then uses the CSS display property to show/hide elements based on expression.
* v-if supports v-else and v-else-if directives whereas v-show doesn't support else directives.
* v-if has higher toggle costs while v-show has higher initial render costs. i.e, v-show has a performance advantage if the elements are switched on and off frequently, while the v-if has the advantage when it comes to initial render time.
* v-if supports `<template>` tab but v-show doesn't support.

> What are the major features of VueJS?

> We can have 2 or more style in single component. One style is used for the global style and other one can be scoped style

> Vue lifecycle methods.

> CSS modules in vue js (similar like we use in the react)(:class="$style.red" and `<style module>` wala part is module)

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

> How to make router param changes as reactive?

> How do you reuse elements with key attribute?  input k liye jarur

> Why should not use if and for directives together on the same element?

> Why do you need to use key attribute on for directive?

> What are the array detection mutation methods?

> What are the array detection non-mutation methods?

> How do you use v-for directive with a range?

> What are the event modifiers provided by vue?

> What are key modifiers?

> What are the supported System Modifier Keys

> What are the supported Mouse Button Modifiers?

> What are the supported modifiers on model?

> How do you communicate from child to parent using events? try example in codesandbox

> What is global registration in components vs local registration? iska second part dekho answer me se

> What are non prop attributes?

> Describe about validations available for props?

> How do you customize model directive for a component?

> What is vue router and their features

> What is route matching priority?

> What are nested routes? video dekho zara nested routing ki

> What are single file components? and then Is Single File Components violating separation of concerns?

>What are filters? What are the different ways to create filters? How do you chain filters? Is it possible to pass parameters for filters? zarur padhe

> What are plugins and their various services? How to create a plugin?  https://www.digitalocean.com/community/tutorials/vuejs-creating-custom-plugins

>  Global mixins --- https://freek.dev/823-using-global-mixins-in-vuejs)

>  What are the merging strategies in mixins?

>  What are custom directives?How do you register directives locally?What are the hook functions provided by directives?  for the video https://youtu.be/HJHKSNA6HU0

> What is the purpose of keep alive tag?

> What is the purpose of vuejs once directive?

>  How do you access the root instance?

>  How do you access parent instance?

> What are asset url transform rules?

> Is it possible to mix both local and global styles?

>  Is parent styles leaked into child components in scoped css?

>  What is hot reloading in vue loader? How do you disable hot reloading explicitly?

> How do you use deep selectors?

> Vuex k questions 143 se start hue h.

>  What are vuex getters?? answer jarur dekhe iska

>  How do you perform mutations in components?

>  How do you perform asynchronous operations?

>  What are differences between mutations and actions?

>  How do you dispatch actions in components?

>  What are modules in vuex?

>   How to use model directive with two way computed property? mast cheez h

>  What does nextTick do in VueJS?

>  What is the main difference between method and computed property? answer dekho jarur

>  How do you watch route object changes?

>  What are navigation guards in vue router?   https://router.vuejs.org/guide/advanced/navigation-guards.html

>  Can I use computed property in another computed property?

>  Why the component data must be a function?

>  v-html,v-once,watchers(use the value concept in it),computed property(ye bhi data function pe depend hota h,change hone pe run hota h, first time run hota h, used for fast calculation,)

>  method vs computed vs watchers vue maxmilian video.

>  various formats are kebap-case, PascalCase, camelCase

>  Slots, teleport

> VueX-mutations

> global imports vs local imports of components. for global componnents use the maxmilian example in main.js file of props video or use global vs local components video of max millian

> :class = "{active : dyanmicdata}" ======== "dynamicdata ? 'active' : ''" keep in mind bracket important h