> ### Folder acts as routing path

<br>

> ### Nuxt 2 — Full Folder Structure

```
my-nuxt-app/
│
├── 📄 nuxt.config.js          # Main Nuxt configuration file
├── 📄 package.json            # Project dependencies and scripts
├── 📄 .nuxtignore             # Ignore files from build (optional)
├── 📄 .env                    # Environment variables (optional)
├── 📄 jsconfig.json           # Helpful for IDE path aliasing (optional)
│
├── 📁 assets/                 # Uncompiled assets processed by Webpack
│   ├── images/
│   │   └── logo.png
│   ├── scss/
│   │   └── main.scss
│   └── fonts/
│       └── custom-font.woff
│
├── 📁 components/             # Vue components auto-imported if enabled
│   ├── Header.vue
│   ├── Footer.vue
│   ├── Button.vue
│   └── cards/
│       └── ProductCard.vue
│
├── 📁 layouts/                # Application layouts (with <nuxt/> outlet)
│   ├── default.vue            # Default layout
│   ├── admin.vue              # Example admin layout
│   └── error.vue              # Error layout for 404/500 pages
│
├── 📁 middleware/             # Custom route middleware
│   ├── auth.js                # Auth guard example
│   ├── user-agent.js
│   └── stats.js
│
├── 📁 pages/                  # Each .vue file becomes a route
│   ├── index.vue              # / (Home page)
│   ├── about.vue              # /about
│   ├── contact.vue            # /contact
│   ├── users/
│   │   ├── index.vue          # /users
│   │   └── _id.vue            # /users/:id (dynamic route)
│   └── blog/
│       ├── index.vue          # /blog
│       └── _slug.vue          # /blog/:slug
│
├── 📁 plugins/                # JS plugins loaded before Vue app mounts
│   ├── axios.js               # Axios plugin
│   ├── vuetify.js             # Vuetify plugin
│   └── filters.js             # Global Vue filters
│
├── 📁 static/                 # Static files served as root (/favicon.ico)
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│       └── banner.jpg
│
├── 📁 store/                  # Vuex store modules
│   ├── index.js               # Root store
│   ├── auth.js                # Auth module
│   ├── user.js                # User data module
│   └── settings.js
│
├── 📁 utils/ (optional)       # Helper functions
│   ├── constants.js
│   └── formatDate.js
│
├── 📁 server/ (optional)      # Custom server logic (API, middleware)
│   ├── index.js
│   └── api/
│       ├── users.js
│       └── posts.js
│
└── 📁 test/ (optional)        # Unit or e2e tests
    ├── components/
    └── pages/
```

<br>

> ### Nuxt Views Overview

![alt text](https://v2.nuxt.com/_nuxt/image/f55faf.png)

<br>

Views define how data and content are displayed for each route.
A **View** = `app template` + `layout` + `page`.

<br>

### 1. Pages

* Every file in `pages/` is a **Vue component** with extra Nuxt features.
  ```vue
  <!-- pages/index.vue -->
  <template>
    <h1 class="red">Hello World</h1>
  </template>

  <script>
  export default {
    head() {
      // Set Meta Tags for this Page
    }
  }
  </script>

  <style>.red { color: red; }</style>
  ```
* **Page properties:** e.g. `head`, `layout`, etc.

<br>

### 2. Layouts

Used to define the general **look and feel** (header, sidebar, etc.) of your app.

#### **Default Layout**

* File: `layouts/default.vue`
* Used when no layout is specified.
* The `layouts/default.vue` file is automatically used for all pages that **don’t specify a custom layout**.
* **Important:** You must include `<Nuxt />` in your layout to render the page component.

  ```vue
  <template>
    <div>
      <TheHeader />
      <Nuxt />
      <TheFooter />
    </div>
  </template>
  ```

<br>

#### **Custom Layout**

* Create a custom file in `layouts/` (e.g., `blog.vue`):

```vue
<!-- layouts/blog.vue -->
<template>
  <div>
    <div>My blog navigation bar here</div>
    <Nuxt />
  </div>
</template>
```

* Apply it in your page component:

```vue
<!-- pages/posts.vue -->
<script>
export default {
  layout: 'blog',  // Static assignment
  // OR
  layout(context) { // Dynamic assignment
    return 'blog'
  }
}
</script>
```

<br>

### 3. Error Page

* File: `layouts/error.vue`
* Acts like a **page**, not a layout.
* **Do NOT** include `<Nuxt />`.
* Used for 404, 500, etc.

  ```vue
  <template>
    <div>
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <NuxtLink to="/">Home page</NuxtLink>
    </div>
  </template>

  <script>
  export default {
    props: ['error'],
    layout: 'error' // optional custom layout
  }
  </script>
  ```

<br>

> ### Nuxt Context & Helpers

![alt text](https://v2.nuxt.com/_nuxt/image/c12c33.svg)

<br>

### 1. What is Context

* Available in: `asyncData`,`fetch` ,`plugins`, `middleware`, `nuxtServerInit`.
* Gives access to **store**, **route**, **params**, **query**, **env**, **redirect**, **error**, etc.
* Also includes **req/res (server)** and **from/nuxtState (client)**.

**Default context structure:**

```js
function (context) {
  const { app, store, route, params, query, env, isDev, isHMR, redirect, error, $config } = context

  if (process.server) {
    const { req, res, beforeNuxtRender, beforeSerialize } = context
  }

  if (process.client) {
    const { from, nuxtState } = context
  }
}
```

<br>

**Universal Keys (available on both client & server)**

### 1. `app`

**Type:** `NuxtAppOptions`
Gives access to the root Vue instance options, including **plugins**.

Example:

```js
context.app.i18n.locale // access i18n locale
context.app.$axios.get('/api/users') // use plugin
```


<br>



### 2. `store`

**Type:** `Vuex.Store`
Your Vuex store instance (if enabled).

```js
context.store.commit('setUser', user)
```


<br>



### 3. `route`

**Type:** `VueRouter.Route`
Gives access to the active route.

```js
console.log(context.route.path)
```


<br>



### 4. `params`

Alias of `context.route.params`
Example:

```js
context.params.id
```


<br>



### 5. `query`

Alias of `context.route.query`
Example:

```js
context.query.page
```


<br>



### 6. `env`

**Type:** `Object`
Contains environment variables defined in `nuxt.config.js → env`.

```js
// nuxt.config.js
export default {
  env: {
    baseUrl: 'https://api.example.com'
  }
}

// usage
context.env.baseUrl
```


<br>



### 7. `isDev`

**Type:** `Boolean`
Indicates if the app is running in development mode.

```js
if (context.isDev) console.log('Development mode')
```


<br>



### 8. `isHMR`

**Type:** `Boolean`
True when called from **Hot Module Replacement** (HMR) during development.
Useful to skip server calls during hot reloads.

```js
if (context.isHMR) return
```


<br>



### 9. `redirect`

**Type:** `Function`
Redirect the user to another route or URL.

```js
redirect(302, '/login')
redirect({ name: 'user', params: { id: 10 } })
redirect('https://vuejs.org')
```

⚠️ **Limitation:** You cannot call `redirect()` in **client-side plugins** due to hydration mismatch.
Instead, use:

```js
window.onNuxtReady(() => {
  window.$nuxt.$router.push('/login')
})
```


<br>



### 10. `error`

**Type:** `Function`
Show Nuxt’s error page.

```js
error({ statusCode: 404, message: 'Page not found' })
```
<br>

### 11. `$config`

**Type:** `Object`
Provides **runtime configuration** (from `publicRuntimeConfig` or `privateRuntimeConfig`).

```js
context.$config.apiBase
```

<br>

**Server-Side Only Keys**

### 1. `req`

**Type:** `http.Request`
Node.js request object (depends on framework if used as middleware).

```js
context.req.headers['user-agent']
```

> Not available with `nuxt generate`.


<br>



### 2. `res`

**Type:** `http.Response`
Node.js response object.

```js
context.res.setHeader('Cache-Control', 'no-store')
```

> Not available with `nuxt generate`.


<br>



### 3. `beforeNuxtRender(fn)`

**Type:** `Function`
Called before Nuxt serializes the state for client-side hydration.
Lets you mutate the `__NUXT__` global variable.

```js
context.beforeNuxtRender(({ nuxtState }) => {
  nuxtState.customData = { hello: 'world' }
})
```


<br>



### 4. `beforeSerialize(fn)` (Nuxt 2.16+)

**Type:** `Function`
Synchronous version of `beforeNuxtRender`, runs inside SSR render phase.

Example with `asyncData`:

```js
export default {
  asyncData({ beforeSerialize }) {
    if (process.server) {
      beforeSerialize(nuxtState => {
        nuxtState.hello = 'world'
      })
    }
  }
}
```

Or with `fetch`:

```js
export default {
  fetch() {
    if (process.server) {
      this.$root.context.beforeSerialize(nuxtState => {
        nuxtState.hello = 'world'
      })
    }
  }
}
```

<br>

**Client-Side Only Keys**

### 1. `from`

**Type:** `VueRouter.Route`
The previous route (the route navigated from).

```js
context.from.path // e.g. '/home'
```


<br>



### 2. `nuxtState`

**Type:** `Object`
The hydrated Nuxt state sent from server to client.
Used mainly by plugins that need to access SSR state on client.

```js
console.log(context.nuxtState)
```

<br>

> ### Using Context Parameters

* Dynamic routes via `context.params`.
  ```js
  async asyncData({ params, $http, error }) {
    try {
      const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
      return { post }
    } catch (e) {
      error(e) // shows Nuxt error page
    }
  }
  ```
* For query params → `context.query.id`.

<br>

**Example middleware:**

```js
export default {
  middleware({ store, redirect }) {
    if (!store.state.authenticated) redirect('/login')
  }
}
```

<br>

> ### Helpers in nuxt

### 1. $nuxt Helper

Accessible via `this.$nuxt` (Vue) or `window.$nuxt` (client).

#### ✅ Connection Status

```vue
<div v-if="$nuxt.isOffline">You are offline</div>
```

* Properties: `isOnline`, `isOffline`.

<br>

#### ✅ Refresh Page Data

```vue
<button @click="$nuxt.refresh()">Refresh</button>
```

* Refreshes `asyncData` / `fetch` without reloading the app.

<br>

#### ✅ Control Loading Bar

```js
mounted() {
  this.$nextTick(() => {
    this.$nuxt.$loading.start()
    setTimeout(() => this.$nuxt.$loading.finish(), 500)
  })
}
```

<br>

### 2. Process Helpers

Nuxt provides booleans:

* `process.client` → running on client
* `process.server` → running on server
* `process.static` → for static generation

**Example:**

```vue
<h1>I am rendered on the {{ renderedOn }} side</h1>

<script>
export default {
  asyncData() {
    return { renderedOn: process.client ? 'client' : 'server' }
  }
}
</script>
```

<br>

> ### Nuxt Server-Side Rendering (SSR)

* **Server-Side Rendering (SSR)**: HTML is generated **on the server**, not the browser.
* The **server sends a fully rendered page** → browser displays it → **Vue hydrates** the app to make it reactive.


### Extending the Server

You can extend or modify the server behavior using **serverMiddleware**.

```js
// server-middleware/logger.js
export default function (req, res, next) {
  console.log(req.url)
  next()
}

// nuxt.config.js
export default {
  serverMiddleware: ['~/server-middleware/logger']
}
```

<br>

> ### Common Caveats

#### ⚠️ **`window` or `document` Undefined**

* These objects don’t exist on the server.
* Wrap client-only code with:

  ```js
  if (process.client) {
    require('external_library')
  }
  ```

<br>

#### ⚠️ **iOS Phone Number Auto-Linking**

* Mobile Safari may auto-convert numbers to links → causes SSR mismatch warning.

**Fix Options:**

1. Disable auto-linking via meta tag:

   ```html
   <meta name="format-detection" content="telephone=no" />
   ```
2. Wrap numbers in `<a>` tags:

   ```vue
   <template>
     <a href="tel:+79825365077">+7 (982) 536-50-77</a>
   </template>
   ```

<br>

> ### Nuxt Static Site Generation (SSG)

### **1. What is Static Site Generation**

* **SSG** pre-renders your app at **build time**.
* Outputs **static HTML + JS files** → can be deployed to **Netlify, Vercel, GitHub Pages**, etc.
* ✅ No Node.js server needed.

<br>

### **2. How It Works**

* Set `target: 'static'` in `nuxt.config.js`.
* During build, Nuxt:

  * Generates every `.vue` page into HTML & JS.
  * Executes and caches all API calls in a **static** folder.
  * Client-side navigation uses cached data (no API re-calls).

<br>

### **3. SPA Fallback**

* Pages **excluded** from generation via `generate.exclude` →
  become **Single Page App (SPA)** pages.
* Rendered **client-side** (not pre-rendered or cached).

<br>

### **4. Updating Content**

* To reflect new API or CMS content → **rebuild the site**.
* Most hosting platforms trigger rebuilds via:

  * Git pushes to the main branch, or
  * Pull request merges.

<br>

![alt text](https://v2.nuxt.com/_nuxt/image/de48ca.svg)


> ### Nuxt Lifecycle Overview

### ⚙️ Server Lifecycle (SSR or during Static Generation)

1. **serverMiddleware**

   * Custom Node/Express middlewares from `nuxt.config.js`

2. **Server-side Nuxt Plugins**

   * Loaded **in order** as defined in `nuxt.config.js` under `plugins`

3. **nuxtServerInit**

   * Vuex action for **pre-populating the store**
   * Only runs **on the server**
   * Defined in `store/index.js`

4. **Middleware**

   * Runs in order:

     * Global middleware (`middleware/` + `nuxt.config.js`)
     * Layout middleware
     * Route middleware

5. **asyncData**

   * Fetches data **before page creation**
   * Blocks rendering until complete

6. **Vue Lifecycle**

   * `beforeCreate`
   * `created`

7. **fetch()**

   * New fetch method (runs top → bottom, parallel for siblings)
   * Non-blocking

8. **beforeMount**

9. **mounted**

  * Component is now interactive.

<br>

### Quick Mental Model

| Phase              | What Happens                        | Blocking? | Where  |
| ------------------ | ----------------------------------- | --------- | ------ |
| `serverMiddleware` | Handle API, auth, redirects         | ✅         | Server |
| `nuxtServerInit`   | Pre-fill Vuex store                 | ✅         | Server |
| `middleware`       | Auth checks, routing guards         | ✅         | Both   |
| `asyncData`        | Fetch data before rendering         | ✅         | Both   |
| `fetch()`          | Fetch data after component creation | ❌         | Both   |
| `mounted`          | DOM ready, app interactive          | ❌         | Client |


<br>

> ### Navigation with `<NuxtLink>`

Happens **only in the browser** when navigating without page reloads.

1. Runs middleware (Global → Layout → Route)
2. Executes `asyncData` (blocking) or static payload loading
3. Executes `fetch` (non-blocking)
4. Triggers Vue lifecycle (`beforeCreate`, `created`, `beforeMount`, `mounted`)
5. No CDN hit — navigation happens **client-side** only.

<br>

> ### Rendering Modes in Nuxt

### 1. Server-Side Rendering (SSR)

Default mode — `ssr: true` (you don’t need to set it manually).

```js
// nuxt.config.js
export default {
  ssr: true // default (no need to add)
}
```

### 2. Static Site Generation (SSG)

Triggered via `nuxt generate` and often called “pre-rendering”.

```js
// nuxt.config.js
export default {
  target: 'static', // or just run `nuxt generate`
}
```

### 3. Client-Side Rendering (CSR)

“SPA mode” — no SSR or pre-rendering.\
Only runs in the browser.

```js
// nuxt.config.js
export default {
  ssr: false // enables SPA mode
}
```


### Quick Comparison Table

| Mode    | Server Needed? | When HTML is Rendered | SEO Friendly | Example Use Case      |
| ------- | -------------- | --------------------- | ------------ | --------------------- |
| **SSR** | ✅ Yes          | On each request       | ✅ Excellent  | News site, e-commerce |
| **SSG** | ❌ No           | At build time         | ✅ Excellent  | Blogs, portfolios     |
| **CSR** | ❌ No           | In browser            | ❌ Poor       | Internal dashboards   |


<br>

> ### File System Routing in Nuxt

Nuxt automatically creates routes based on your **`pages/`** directory — no manual router config needed.

* Each `.vue` file in `pages/` becomes a route.
* Uses **automatic code-splitting** per page.
* Use `<NuxtLink>` for navigation.

```vue
<template>
  <NuxtLink to="/">Home</NuxtLink>
</template>
```

#### Example

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

Generated routes:

```js
[
  { name: 'index', path: '/', component: 'pages/index.vue' },
  { name: 'user', path: '/user', component: 'pages/user/index.vue' },
  { name: 'user-one', path: '/user/one', component: 'pages/user/one.vue' }
]
```

<br>

### Dynamic Routes

Use `_` prefix for dynamic parameters.

#### Example

```
pages/
--| _slug/
-----| index.vue
-----| comments.vue
--| users/
-----| _id.vue
--| index.vue
```

Generated routes:

```js
[
  { name: 'index', path: '/', component: 'pages/index.vue' },
  { name: 'users-id', path: '/users/:id?', component: 'pages/users/_id.vue' },
  { name: 'slug', path: '/:slug', component: 'pages/_slug/index.vue' },
  { name: 'slug-comments', path: '/:slug/comments', component: 'pages/_slug/comments.vue' }
]
```

> ✅ `?` makes params optional — remove it by creating an `index.vue` inside the folder.

#### Accessing Params

```js
this.$route.params.id
```

<br>

### Nested Routes

Use a parent `.vue` with `<NuxtChild />`.

#### Example

```
pages/
--| users/
-----| index.vue
-----| _id.vue
--| users.vue
```

Creates:

```js
{
  path: '/users',
  component: 'pages/users.vue',
  children: [
    { path: '', component: 'pages/users/index.vue', name: 'users' },
    { path: ':id', component: 'pages/users/_id.vue', name: 'users-id' }
  ]
}
```

<br>

### Dynamic Nested Routes

For deep hierarchies:

```
pages/
--| _category/
-----| _subCategory/
--------| index.vue
--------| _id.vue
-----| _subCategory.vue
-----| index.vue
--| _category.vue
```

Supports multi-level dynamic routes like:

```
/:category/:subCategory/:id
```

<br>

### ❓ **Unknown Depth Routes**

Use a **catch-all** file: `pages/_.vue`

Handles any unmatched path (e.g. `/about`, `/about/team`, `/foo/bar/...`).
Can also serve as a **custom 404 page**.

<br>

> ### Customizing the Router

#### Extend Router via `nuxt.config.js`

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```
<br>

#### With `@nuxt/utils`

```js
import { sortRoutes } from '@nuxt/utils'

export default {
  router: {
    extendRoutes(routes, resolve) {
      // add routes...
      sortRoutes(routes)
    }
  }
}
```

<br>

#### Named Views

```js
routes.push({
  path: '/users/:id',
  components: {
    default: resolve(__dirname, 'pages/users'),
    modal: resolve(__dirname, 'components/modal.vue')
  },
  chunkNames: { modal: 'components/modal' }
})
```

<br>

#### Router Config Options

| Option                          | Description                              | Example                          |
| ------------------------------- | ---------------------------------------- | -------------------------------- |
| **base**                        | Base URL for app                         | `'/app/'`                        |
| **extendRoutes()**              | Add or modify routes                     | `extendRoutes(routes)`           |
| **fallback**                    | Use hash mode if history API unsupported | `fallback: true`                 |
| **mode**                        | Router mode (`history` / `hash`)         | ⚠️ not recommended to change     |
| **parseQuery / stringifyQuery** | Custom query string parser               | —                                |
| **routeNameSplitter**           | Change route name separator              | `routeNameSplitter: '/'`         |
| **scrollBehavior**              | Control scroll position on navigation    | `~/app/router.scrollBehavior.js` |
| **trailingSlash**               | Add/remove trailing slash in URLs        | `trailingSlash: true`            |

<br>

#### Example Scroll Behavior

`app/router.scrollBehavior.js`

```js
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 } // scroll to top
}
```

<br>

#### Other Router Extension Methods

* `router-extras-module` → customize route params.
* `@nuxtjs/router` → override entire router with your own `router.js`.


<br>

> ### Data Fetching in Nuxt

Nuxt provides SSR-friendly alternatives:

| Hook        | Used In       | SSR Support | Access to `this` | Shows Loading State           | Blocks Navigation |
| ----------- | ------------- | ----------- | ---------------- | ----------------------------- | ----------------- |
| `fetch`     | Any component | ✅ Yes       | ✅ Yes            | ✅ Yes (`$fetchState.pending`) | ❌ No              |
| `asyncData` | Only pages    | ✅ Yes       | ❌ No             | ❌ No                          | ✅ Yes             |


<br>

### The `fetch()` Hook

Works in pages and components.\
Runs on the server before initial render, and on the client when navigating.\
`$fetchState` can be used to track the **loading** or **error** state.

```html
<!-- components/MountainsList.vue -->
<template>
  <div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching mountains</p>
    <ul v-else>
      <li v-for="(mountain, index) in mountains" :key="index">
        {{ mountain.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { mountains: [] }
  },
  async fetch() {
    this.mountains = await fetch('https://api.nuxtjs.dev/mountains')
      .then(res => res.json())
  }
}
</script>
```

<br>

#### Behavior Options

| Property        | Type               | Description                                    |
| --------------- | ------------------ | ---------------------------------------------- |
| `fetchOnServer` | Boolean / Function | If false → run only on client                  |
| `fetchKey`      | String / Function  | Unique key for caching/hydration               |
| `fetchDelay`    | Number             | Adds delay to prevent flicker (default: 200ms) |

```js
export default {
  fetchOnServer: false,
  fetchKey() {
    // this.$route is available — return string unique per post
    return `post-${this.$route.params.id}
  }
}
```

<br>

#### 1. fetchKey

`fetchKey` is the **unique identifier**, Nuxt uses to match (and cache) that fetch payload between server and client and across component re-uses.

If the key on the server and client match → Nuxt reuses the server payload (no refetch).

If the key differs → Nuxt treats it as a different fetch and will run `fetch()` on the client.

**Rules of thumb**

- If you want no caching / always refetch on client, make the key vary (e.g. include timestamp) — but normally you should not do that.
- If two component instances return the same key, they will share the same cached fetch payload.

<br>

#### 2. fetchDelay

`fetchDelay` is an **optional numeric value (milliseconds)** you can define in a component that uses the `fetch()` hook.

It tells Nuxt to **wait for a short period before updating the component’s DOM** with the new fetched data.

**Default value: `200ms`**

```js
export default {
  fetchDelay: 300, // wait 300ms before DOM updates after fetch completes
  async fetch() {
    this.data = await this.$axios.$get('/api/data')
  }
}
```

**Why it exists**

When navigating between pages or when a component re-runs `fetch()` (for example, on route param change), sometimes:

* The old data disappears quickly,
* The loading spinner flashes for a few milliseconds,
* Then the new data appears.

This “flash” feels janky.

`fetchDelay` gives Nuxt a small delay buffer so the **loading indicator and data update** feel smoother — especially for fast API responses.

<br>

**How it behaves internally**

1. You navigate or trigger a new `fetch()`.
2. Nuxt sets `this.$fetchState.pending = true`.
3. Once the fetch promise resolves:

   * Nuxt **waits for `fetchDelay` ms**.
   * Then it sets `this.$fetchState.pending = false` and updates the component’s DOM.

So it **doesn’t delay the fetch itself**, only the **DOM update** after fetch.

<br>

**Example 1: Prevent flicker on fast API**

```js
export default {
  data() {
    return { user: null }
  },
  fetchDelay: 500,
  async fetch() {
    this.user = await this.$axios.$get('/api/user')
  },
  template: `
    <div>
      <div v-if="$fetchState.pending">Loading...</div>
      <div v-else>{{ user.name }}</div>
    </div>
  `
}
```

If `/api/user` returns in 100ms, without delay, you’d see:

```
Loading... → flash → data
```

With `fetchDelay: 500`, Nuxt keeps `pending` true for at least 500ms, so the transition feels smoother (consistent).

<br>

#### Fetch State

Nuxt exposes a built-in `$fetchState` object:

| Property                | Description                 |
| ----------------------- | --------------------------- |
| `$fetchState.pending`   | `true` while fetching       |
| `$fetchState.error`     | Error object if fetch fails |
| `$fetchState.timestamp` | Time of last fetch          |

```vue
<p v-if="$fetchState.pending">Loading...</p>
<p v-else-if="$fetchState.error">Error fetching data</p>
<ul v-else>
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<button @click="$fetch">Reload</button>
```

<br>

#### Re-fetching & Caching

* Call `this.$fetch()` manually to reload.
* Use `<nuxt keep-alive />` to **cache** visited pages.
* Limit cache:

  ```vue
  <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
  ```
* Combine with `activated()` for timed re-fetch:

  ```js
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  }
  ```

<br>

#### Listening to Query Changes

`fetch()` doesn’t run on query changes by default.

```js
watch: {
  '$route.query': '$fetch'
}
```

<br>

#### Error Handling

`fetch()` does **not** trigger Nuxt’s error page.\
Handle manually with `$fetchState.error`.

<br>

> ### The asyncData() Hook

- Used **only in page components** (not child components).
- **Note:-**SSR-compatible and merges returned data into the page component’s `data()`.

```vue
<script>
export default {
  async asyncData({ params, $http }) {
    const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
    return { post } // merged into data()
  }
}
</script>
```

❌ **No access to `this`** (use context args).\
✅ **Returns object merged into page data.**\
❌ **No loading placeholder** — navigation waits until data resolves.

<br>

### Query Change Handling

`asyncData` does not automatically run on query changes.\
Use `watchQuery` to control when to re-fetch.

```js
export default {
  watchQuery: ['page', 'limit']
}
```

<br>

### Fetching for Components

Components **can’t** use `asyncData`.

Alternatives:
1. Use `fetch()` (✅ SSR supported)
2. Use `mounted()` (❌ CSR only)
3. Fetch in parent `asyncData` and pass via props.

<br>

### In Short

| Feature                | `fetch()`           | `asyncData()`            |
| ---------------------- | ------------------- | ------------------------ |
| Works in Components    | ✅                   | ❌                        |
| Access `this`          | ✅                   | ❌                        |
| Shows Loading          | ✅                   | ❌                        |
| Blocks Navigation      | ❌                   | ✅                        |
| Error Handling         | `$fetchState.error` | `error()` or redirect    |
| SSR Compatible         | ✅                   | ✅                        |
| Re-run on Query Change | Manual (`watch`)    | Automatic (`watchQuery`) |

<br>

### Meta Tags & SEO in Nuxt

**3 Ways to Add Meta Data**

1. **Globally** — via `nuxt.config.js`
2. **Locally (static)** — via `head` as an **object**
3. **Locally (dynamic)** — via `head()` as a **function**

<br>

### Global Meta Settings

Define defaults that apply to every page.

<details>

```js
// nuxt.config.js

export default {
  head: {
    title: 'My Website Title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'My website description'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
}
```

✅ Sets **default title + description**
✅ Adds **viewport**, **favicon**, etc.
✅ Used on **every page** (unless overridden)

</details>

<br>

### Local Meta (Static)

Define meta tags for a specific page.

<details>

```js
// pages/index.vue
export default {
  head: {
    title: 'Home Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ]
  }
}
```

✅ Simple and **page-specific**\
❌ Can’t use `data()` or `computed` values

</details>

<br>

### Local Meta (Dynamic)

Use `head()` as a **function** to access reactive data or computed props.

<details>

```html
<!-- pages/index.vue -->
<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  data() {
    return { title: 'Home Page' }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ]
    }
  }
}
</script>
```

✅ Access **data** and **computed** values
✅ Good for **dynamic SEO titles/descriptions**

</details>

<br>

### About `hid`

To prevent duplicate meta tags, always give a unique `hid` (HTML ID) to your meta entries.

```js
// example
{ hid: 'description', name: 'description', content: '...' }
```

This tells `vue-meta` (the underlying library) which tag to **replace**, not duplicate.

<br>

> ### Adding External Resources

You can add **scripts**, **stylesheets**, or **fonts** globally or locally.


### Global Example

```js
// nuxt.config.js
export default {
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
    ]
  }
}
```

✅ Loads across **all pages**

<br>

### Local Example

```html
<!-- pages/about.vue -->
<script>
export default {
  head() {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
      ]
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Roboto', sans-serif;
}
</style>
```

✅ Loads only for this page
✅ Keeps bundle size smaller

<br>

### Optional: Load Script Before `</body>`

```js
{ src: '...', body: true }
```

Adds the script **at the end of the body** for better performance.

<br>

> ### Nuxt Configuration Overview

You can configure **CSS**, **pre-processors**, **webpack**, **server settings**, **external resources**, and more.

### 1. CSS Property

Globally include CSS, SCSS, or CSS libraries:

```js
export default {
  css: [
    'bulma',                 // Node module
    '~/assets/css/main.css',  // Local CSS
    '~/assets/css/main.scss'  // Local SCSS
  ]
}
```

<br>

### 2. External Resources

Include scripts, fonts, or styles **globally** or **locally**.

**Global (`nuxt.config.js`):**

```js
head: {
  script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }],
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }]
}
```

**Local (per page):**

```js
head() {
  return {
    script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }],
    link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }]
  }
}
```

> Optional `body: true` to load scripts before `</body>`.

<br>

### 3. JSX Support

Nuxt supports JSX using `@nuxt/babel-preset-app`:

```js
export default {
  data() { return { name: 'World' } },
  render() { return <h1>{this.name}</h1> }
}
```

* `h` (createElement) alias is optional in JSX.

<br>

### 4. Ignoring Files

Use **`.nuxtignore`** or `ignorePrefix` / `ignore` in config:

* `.nuxtignore` example:

```
layouts/foo.vue
pages/ignore/*.vue
store/ignore/_.test._
```

* `ignorePrefix` defaults to `-`, e.g., `store/-foo.js` ignored.
* `ignore` example:

```js
export default { ignore: 'pages/bar.vue' }
```

* `ignoreOptions` allows options like case sensitivity.

<br>


> ### Nuxt Loading & Progress Bar

#### 1. Default Loading Behavior
- Nuxt provides a **loading progress bar** by default between route transitions.
- You can **customize**, **disable**, or **replace** it with a custom component.

<br>

#### 2. Customizing the Progress Bar

```js
// nuxt.config.js
export default {
  loading: {
    color: 'blue',       // Progress bar color
    height: '5px',       // Bar height
    failedColor: 'red',  // Bar color on error
    throttle: 0,         // Show immediately, avoid flash
    duration: 5000,      // Max duration in ms
    continuous: false,   // Animate repeatedly if loading exceeds duration
    css: true,           // Use default CSS styles
    rtl: false           // Right-to-left direction
  }
}
```

#### Available Options

| Property        | Type      | Default   | Description                                           |
| --------------- | --------- | --------- | ----------------------------------------------------- |
| **color**       | `String`  | `'black'` | Color of the progress bar                             |
| **failedColor** | `String`  | `'red'`   | Color when route loading fails                        |
| **height**      | `String`  | `'2px'`   | CSS height of the bar                                 |
| **throttle**    | `Number`  | `200`     | Delay before showing the bar (ms)                     |
| **duration**    | `Number`  | `5000`    | Max duration before auto-complete (ms)                |
| **continuous**  | `Boolean` | `false`   | Keeps the animation running if loading takes too long |
| **css**         | `Boolean` | `true`    | Whether to include Nuxt’s default styles              |
| **rtl**         | `Boolean` | `false`   | Animate from right to left                            |


> **Tip:** If the loading is too fast, set `throttle: 0` to make the bar visible.

<br>

#### 3. Disabling the Progress Bar

Globally:
```js
// nuxt.config.js
export default { 
  loading: false
}
```

Per page:
```vue
<script>
export default {
  loading: false
}
</script>
```

<br>

#### 4. Programmatic Control

Start/stop the loader in components:

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
```

<br>

#### 5. Continuous Progress Bar

If loading exceeds duration, the bar animates from 0 → 100 repeatedly:

```js
export default {
  loading: {
    continuous: true
  }
}
```

<br>

#### 6. Custom Loading Component

Create your own loader component (`components/LoadingBar.vue`):

```vue
<template>
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
    fail() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
```

Then register it in your Nuxt config:

```js
export default {
  loading: '~/components/loading.vue'
}
```

**Optional methods your component can implement:**

* `fail(error)` — called if route fails
* `increase(num)` — during loading, `num` < 100

<br>

#### 7. SPA Mode Loading Spinner

When running in SPA mode, a **spinner** is displayed instead of blank content:

```js
export default {
  loadingIndicator: {
    name: 'circle',       // Built-in spinner
    color: '#3B8070',     // Spinner color
    background: 'white'   // Page background
  }
}
```

**Built-in indicators:**

* `circle`, `cube-grid`, `fading-circle`, `folding-cube`, `chasing-dots`, `nuxt`, `pulse`, `rectangle-bounce`, `rotating-plane`, `three-bounce`, `wandering-cubes`

**Note:-**You can also create a **custom HTML template** for the spinner.


#### 8. Programmatically Control the Loader

You can trigger the Nuxt loader from anywhere in your app:

```js
mounted() {
  this.$nextTick(() => {
    this.$nuxt.$loading.start()

    setTimeout(() => this.$nuxt.$loading.finish(), 500)
  })
}
```

Useful for manual API calls, long-running tasks, or page preloading.

<br>

> ### Nuxt built-in components

#### 1. `<Nuxt>` Component

* Displays the **current page component** inside layouts.
* Must be used **inside layouts** (like `layouts/default.vue`).

```vue
<template>
  <div>
    <div>Navbar</div>
    <Nuxt />
    <div>Footer</div>
  </div>
</template>
```

**Props & Tips:**

* `nuxt-child-key`: Used to control dynamic page transitions.

```vue
<Nuxt :nuxt-child-key="someKey" />
```

* Or set a `key` function in page component:

```js
export default {
  key(route) {
    return route.fullPath
  }
}
```

* Accepts `keep-alive` and `keep-alive-props` for caching pages.

```vue
<Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
```

<br>

#### 2. `<NuxtChild>` Component

* Displays **child components** for **nested routes**.

Example structure:

```
pages/
 └─ parent/
     ├─ index.vue  (parent)
     └─ child.vue  (nested child)
```

`pages/parent.vue`:

```vue
<template>
  <div>
    <h1>Parent View</h1>
    <NuxtChild :foobar="123" />
  </div>
</template>
```

* Supports `keep-alive`, `keep-alive-props`, and props like a normal Vue component.

<br>

#### 3. `<NuxtLink>` Component

* For **internal navigation**, replacing `<a>` tags.
* Props:

  * `to`: destination route
  * `prefetch` / `no-prefetch`: control prefetching behavior

```vue
<NuxtLink to="/about">About Page</NuxtLink>
<NuxtLink to="/about" no-prefetch>Not Prefetched</NuxtLink>
```

**Router config options:**

```js
export default {
  router: {
    prefetchLinks: false,             // disable global prefetching
    linkActiveClass: 'my-active',     // active link CSS
    linkExactActiveClass: 'my-exact', // exact active link CSS
    linkPrefetchedClass: 'prefetched' // prefetched link CSS
  }
}
```

<br>

#### 4. `<client-only>` Component

* Renders content **only on the client side** (useful for components that rely on `window`, `document`, or third-party libraries).

```js
<client-only placeholder="Loading...">
  <comments />
</client-only>
```
<br>

* With slot placeholder:

```js
<client-only>
  <comments />
  <template #placeholder>
    <comments-placeholder />
  </template>
</client-only>
```

**Note:** Nuxt < v2.9.0 uses `<no-ssr>` instead of `<client-only>`.

<br>

**Key Takeaways**
1. Use `<Nuxt>` for page rendering inside layouts.
2. Use `<NuxtChild>` for nested routes.
3. Use `<NuxtLink>` for **internal navigation** with prefetching control.
4. Use `<client-only>` for components that **cannot render on server-side**.
5. Both `<Nuxt>` and `<NuxtChild>` support `keep-alive` to cache pages.

<br>

> ### Nuxt component auto-import and usage

### 1. Enabling Auto-Discovery

Starting from Nuxt v2.13, components can be automatically imported when used in templates.

```js
// nuxt.config.js
export default {
  components: true
}
```

* Once enabled, any component inside `components/` is globally available without explicit imports.

<br>

### 2. Using Components

Example project structure:

```
components/
 ├─ TheHeader.vue
 └─ TheFooter.vue
```

You can use them directly in layouts or pages:

```js
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>
```

<br>

### 3. Component Names

1. For nested directories, Nuxt generates **PascalCase names** based on the file path:

```
components/
 └─ base/
     └─ foo/
         └─ Button.vue
```

Component name: `<BaseFooButton />`

> **Tip:** Rename file to match component name for clarity: `BaseFooButton.vue`.

<br>

2. Custom directory configuration:

```js
components: {
  dirs: [
    '~/components',
    '~/components/base'
  ]
}
```

Now, `components/base/foo/Button.vue` can be used as `<FooButton />`.

<br>

### 4. Dynamic (Lazy) Imports

* Prefix the component with `Lazy` to lazy-load it.
* Useful to optimize bundle size for components not always needed.

```js
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <LazyTheFooter />
  </div>
</template>
```
<br>

> ### components property in Nuxt

* **Automatically imports Vue components** when they are used in pages, layouts, or other components.
* Saves you from manually importing components in every file.

```js
// nuxt.config.js
export default {
  components: true  // auto-import from ~/components
}
```

<br>

### 2. Customizing Auto-Discovery

You can specify directories and options:

```js
export default {
  components: [
    '~/components',                         // default
    { path: '~/components/other', extensions: ['vue'] }
  ]
}
```

<br>

### 3. Example: Using Prefix

Directory:

```
components/
├─ awesome/
│  └─ Button.vue
├─ Button.vue
```

Config:

```js
export default {
  components: [
    '~/components',
    { path: '~/components/awesome', prefix: 'awesome' }
  ]
}
```

Usage in template:

```vue
<template>
  <div>
    <AwesomeButton>Click Me</AwesomeButton>
    <Button>Click Me</Button>
  </div>
</template>
```

<br>

### 4. Overwriting Components with `level`

* Useful when you want local components to override library/theme components.

Example:

```js
components: [
  '~/components', // level 0
  { path: 'node_modules/my-theme/components', level: 1 } // library
]
```

* `~/components/Header.vue` will overwrite `my-theme/components/Header.vue`.

<br>

### 5. Library Authors

* Nuxt exposes a hook `components:dirs` to extend component directories in modules.
* Example for UI library:

```js
// awesome-ui/nuxt.js
import { join } from 'path'

export default function () {
  this.nuxt.hook('components:dirs', dirs => {
    dirs.push({
      path: join(__dirname, 'components'),
      prefix: 'awesome'
    })
  })
}
```

* Then just add the module to `buildModules` and components are auto-imported.

<br>

> ### Nuxt’s build directory and `.nuxt` folder

**Changing the Build Directory**

By default, the build directory is `.nuxt`. You can change it with the `buildDir` property in `nuxt.config.js`:
```js
export default {
  buildDir: 'nuxt-dist' // new directory name
}
```

> Remember to add the new directory to `.gitignore`.

<br>

**Important Files & Folders inside `.nuxt`**

```
.nuxt/
├── app.js                  # Main application entry point
├── client.js               # Client-side entry point
├── index.js                # Bootstraps the Nuxt app
├── server.js               # Server-side code for SSR
├── loading.html            # Default loading page
├── router.js               # Generated routes based on pages/
├── router.scrollBehavior.js # Router scroll behavior
├── empty                   # Empty file for no-op aliases
├── components/             # Nuxt internal components
│   ├── NuxtChild.vue
│   ├── NuxtLink.vue
│   ├── nuxt-loading.vue
│   └── nuxt-error.vue
├── mixins/                 # Mixins required for $fetch
├── views/                  # App template & server error pages
├── middleware/             # Your middleware files
└── utilities/              # Nuxt internal utility functions
```
<br>

> ### Nuxt `assets/` directory and how to use it effectively:

* Contains **uncompiled assets**: images, fonts, Sass/SCSS/Stylus files.
* Unlike `static/`, assets in `assets/` are processed by **Webpack** (with `file-loader` and `url-loader`), allowing imports, hashes, and optimizations.

<br>

#### 1. Using Images

* **In Vue templates**: Use the `~` alias for the source directory.

```vue
<template>
  <img src="~/assets/your_image.png" />
</template>
```

* **Dynamic images**:

```vue
<img :src="require(`~/assets/img/${image}.jpg`)" />
```

<br>

#### 2. Styles

```js
// nuxt.config.js
export default {
  css: [
    'bulma',
    '~/assets/css/main.css',
    '~/assets/css/main.scss'
  ]
}
```
<br>

#### 3. Fonts

* Place font files in `assets/fonts/` and reference them in CSS:

```css
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('~assets/fonts/DMSans-Regular.ttf') format('truetype');
}
```

<br>

#### 4. Aliases

* `~` → source directory (`srcDir`)
* `~~` → project root (`rootDir`)
* `@` → still supported but may fail in CSS background URLs.

Example:

```vue
<img src="~/assets/logo.png" />
<img src="@@/assets/logo.png" /> <!-- rootDir alias -->
```

<br>


> ### Nuxt `static/` directory and how it differs from `assets/`:

* `static/` contains **files that won’t be processed by Webpack** and are served directly by the server.
* Files are **mapped directly to the root URL**.

  * `/static/robots.txt` → `http://localhost:3000/robots.txt`
  * `/static/favicon.ico` → `http://localhost:3000/favicon.ico`

<br>

**Use Cases**
* Robots.txt, sitemap.xml, CNAME, manifest files.
* Images or assets that **don’t require processing** (no compilation, no hashing).

<br>

### Referencing Static Files

* Use paths relative to the root (`/`) for static files:

```html
<!-- Static image -->
<img src="/my-image.png" />

<!-- Webpack-processed image from assets directory -->
<img src="~/assets/my-image-2.png" />
```

> Note: `assets/` files are processed by Webpack and can use features like SCSS, PostCSS, or image optimization.

<br>

### Router Base Consideration

* If your app is deployed in a subfolder (`/blog/`), Nuxt automatically prefixes static assets:

```html
<img src="/blog/my-image.png" />
```

* To **disable automatic prefixing**:

```js
// nuxt.config.js
export default {
  static: {
    prefix: false
  }
}
```

* Now `/static/my-image.png` → `/my-image.png` instead of `/blog/my-image.png`.

<br>

#### Key Differences: `assets/` vs `static/`

| Feature            | `assets/`                    | `static/`                      |
| ------------------ | ---------------------------- | ------------------------------ |
| Webpack processing | ✅ Yes (CSS, JS, images)      | ❌ No                           |
| URL reference      | `~/assets/...`               | `/file-name`                   |
| File changes       | Triggers rebuild             | Served directly without build  |
| Use case           | Styles, JS, processed images | Static files, public resources |

<br>

> ### Nuxt `middleware/` directory

* Middleware in Nuxt allows you to **run custom code before rendering a page or layout**.
* Common use cases: authentication checks, analytics tracking, user-agent detection, etc.
* Middleware can be **shared** (for multiple pages/layouts) or **page-specific**.

<br>

### Middleware Directory

* The `middleware/` directory is where you place **shared middleware**.
* The **filename** becomes the **middleware name**.
  * Example: `middleware/auth.js` → middleware named `auth`.
* Middleware receives the **context object** as its first argument.

**Example: adding user agent to context**

```js
// middleware/user-agent.js
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```

<br>

### Execution Order

Middleware is executed **in series** in the following order:

1. `nuxt.config.js` (router middleware)
2. Matched layouts
3. Matched pages
4. Router middleware

* **Universal mode**: runs once on the server-side (first request) and on the client for subsequent navigations.
* **ssr: false**: runs only on the client-side for both initial load and navigations.

<br>

### Applying Middleware

#### 1. Globally

* Use `router.middleware` in `nuxt.config.js`:

```js
// nuxt.config.js
export default {
  router: {
    middleware: 'stats' // runs on every route
  }
}
```

<br>

#### 2. Layout or Page-Specific

* Use the `middleware` property in the layout or page component:

```js
// pages/index.vue or layouts/default.vue
export default {
  middleware: ['auth', 'stats']
}
```

<br>

#### 3. Named Middleware

* File-based, reusable middleware:

```js
// middleware/authenticated.js
export default function ({ store, redirect }) {
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}

// pages/secret.vue
export default {
  middleware: 'authenticated'
}
```

<br>

#### 4. Anonymous Middleware

* Only used for a specific page:

```js
// pages/secret.vue
export default {
  middleware({ store, redirect }) {
    if (!store.state.authenticated) {
      return redirect('/login')
    }
  }
}
```

<br>

#### Key Points
1. **Execution order:** global → layout → page → router.
2. Middleware can be **synchronous or asynchronous**.

<br>

> ### Nuxt `modules/` directory and module system (phir se samjhao aache se)

* Nuxt modules are **functions that extend Nuxt’s core functionality**.
* They are executed sequentially when Nuxt boots, allowing you to:
  * Customize webpack config.
  * Register plugins.
  * Add CSS libraries.
  * Register hooks for lifecycle events.
  * Extend templates.
  * Add server middleware.
* Modules can be **shared across projects** and packaged as **npm modules**.

<br>

### Using Modules

* Modules are added in `nuxt.config.js` under the `modules` property:
    ```js
    export default {
      modules: [
        '@nuxtjs/axios',              // npm package
        '~/modules/awesome.js',       // local module
        ['@nuxtjs/google-analytics', { ua: 'X1234567' }], // options
        function () {}                // inline function
      ]
    }
    ```
* **Order matters**: modules run sequentially.
* Modules **export a function** and can optionally return a Promise if asynchronous work is needed.

<br>

### Module Options

1. **moduleOptions**
   * Object passed when registering a module.
   * Example:
      ```js
      // nuxt.config.js
      modules: [['~/modules/example', { token: '123' }]]
      ```

      ```js
      // modules/example.js
      export default function ExampleModule(moduleOptions) {
        console.log(moduleOptions.token) // '123'
      }
      ```

<br>

2. **this.options**

  * Access top-level Nuxt options, merged with defaults.
  * Useful for sharing options between modules.
    ```js
    const options = Object.assign({}, this.options.axios, moduleOptions)
    ```

<br>

### Adding Plugins

* Modules can register plugins with `this.addPlugin`:

```js
// module.js
import path from 'path'
export default function myModule() {
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

* Plugins can also use templates and inject options:

```js
// plugin.js
ga('create', '<%= options.ua %>', 'auto')
```

* Options in the template are replaced by Nuxt at runtime.

<br>

### Registering Webpack Loaders

* Use `this.extendBuild` to add custom loaders:

```js
this.extendBuild((config, { isClient, isServer }) => {
  config.module.rules.push({
    test: /\.foo$/,
    use: ['foo-loader']
  })
})
```

<br>

### Nuxt Hooks (Ye smjh nhi aaya aache se)

Modules can hook into Nuxt lifecycle events:

```js
this.nuxt.hook('ready', async nuxt => { /* Nuxt ready */ })
this.nuxt.hook('render:before', renderer => { /* Renderer ready */ })
this.nuxt.hook('build:compile', async ({ name, compiler }) => { /* before webpack compile */ })
this.nuxt.hook('generate:before', async generator => { /* before SSG */ })
```

* Hooks can return a **Promise** or use **async/await**.

---

## **Asynchronous Modules**

Modules can perform async tasks:

```js
// async/await
export default async function asyncModule() {
  const pages = await fse.readJson('./pages.json')
}

// return Promise
export default function asyncModule($http) {
  return $http.get(...).then(...);
}
```

---

## **Publishing Modules**

* If publishing as npm package:

```js
module.exports.meta = require('./package.json')
```

* Use **buildModules** for dev/build-time modules:

  * Improves production performance.
  * Example:

```js
export default {
  buildModules: ['@nuxtjs/eslint-module']
}
```

**Rule of thumb**: your module is a buildModule unless it:

1. Provides serverMiddleware.
2. Uses Node runtime hooks (e.g., Sentry).
3. Affects vue-renderer behavior.
4. Needs server: or vue-renderer: hooks.

---

## ✅ **Key Points**

1. Modules extend Nuxt core and can be reused across projects.
2. They can register plugins, loaders, hooks, templates, and CSS.
3. Can be synchronous or asynchronous.
4. Use `modules` for runtime modules, `buildModules` for dev/build modules.
5. Module options: `moduleOptions` (passed to module) + `this.options` (Nuxt config).

<br>

> ### Nuxt `pages/` directory

* Nuxt **automatically generates the router** based on the `.vue` files inside `pages/`.
* Each page is a Vue component but with additional **Nuxt-specific features**.

<br>

### Dynamic Pages

* Use an **underscore** `_` prefix in the filename or folder to create dynamic routes.
* The values are accessed via `context.params`.

<br>

**Example 1: Single dynamic segment**

```
pages/_slug.vue
```

```vue
<script>
export default {
  async asyncData({ params }) {
    return { slug: params.slug } // URL /abc → slug = "abc"
  }
}
</script>
```

<br>

**Example 2: Nested dynamic segments**

```
pages/_book/_slug.vue
```

```vue
<script>
export default {
  async asyncData({ params }) {
    return { book: params.book, slug: params.slug }
  }
}
</script>
```

<br>

### Page Properties

| Property      | Description                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `asyncData`   | Runs **before loading** the page. Merges returned object with `data()`.                                  |
| `fetch`       | For **asynchronous data fetching**. Runs on server render and client navigation.                         |
| `head`        | Customize `<head>` for this page. Uses `vue-meta`.                                                       |
| `layout`      | Specify a layout from `layouts/`.                                                                        |
| `loading`     | Control Nuxt loading bar. Default: auto.                                                                 |
| `transition`  | Page-specific transitions.                                                                               |
| `scrollToTop` | Scroll to top when navigating to this page. Default: true.                                               |
| `middleware`  | Run page-specific middleware before rendering.                                                           |
| `watchQuery`  | Watch query strings; re-run `asyncData`, `fetch`, etc., on changes. Can be `true`, array, or a function. |
| `key`         | Set a custom key for the page component. Default: `$route.path`.                                         |

<br>

### Watch Query Examples

**Basic array**

```js
export default { watchQuery: ['page'] }
```

**Function for fine control**

```js
export default {
  watchQuery(newQuery, oldQuery) {
    return newQuery.foo && oldQuery.bar
  }
}
```

<br>

### Ignoring Pages

* Prefix the filename with `-` to **exclude** it from routing:

```
pages/-about.vue   // Ignored
```

<br>

### Renaming `pages/` Directory

```js
// nuxt.config.js
export default {
  dir: {
    pages: 'routes' // Use `routes/` instead of `pages/`
  }
}
```

<br>

Here's a **visual file tree with routes** for a Nuxt `pages/` directory, including dynamic and nested pages:

```
pages/
├── index.vue               → Route: /
├── about.vue               → Route: /about
├── contact.vue             → Route: /contact
├── -draft.vue              → Ignored (no route)
├── _slug.vue               → Route: /:slug
├── blog/
│   ├── index.vue           → Route: /blog
│   ├── _post.vue           → Route: /blog/:post
│   └── categories/
│       ├── index.vue       → Route: /blog/categories
│       └── _category.vue   → Route: /blog/categories/:category
├── _book/
│   ├── index.vue           → Route: /:book
│   └── _slug.vue           → Route: /:book/:slug
└── admin/
    ├── dashboard.vue       → Route: /admin/dashboard
    ├── _section.vue        → Route: /admin/:section
    └── settings.vue        → Route: /admin/settings
```

<br>

> ### Nuxt `plugins/` directory

The `plugins/` directory contains JavaScript files that run **before instantiating the root Vue.js application**.

* Typically used to:
  * Register Vue plugins (`Vue.use()`)
  * Inject functions, constants, or services into the app context
  * Configure third-party libraries (like Axios)


<br>

### Basic Plugin Usage

1. Create a plugin file in `plugins/`:

```js
// plugins/axios.js
export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if (error.response.status === 500) redirect('/sorry')
  })
}
```

2. Register the plugin in `nuxt.config.js`:

```js
export default {
  modules: ['@nuxtjs/axios'],
  plugins: ['~/plugins/axios.js']
}
```

<br>

### Client or Server Only

* Use `.client.js` or `.server.js` suffixes for environment-specific plugins:

```js
plugins/foo.client.js   // runs only on client
plugins/bar.server.js   // runs only on server
plugins/baz.js          // runs both client & server
```

* Or use object syntax in `nuxt.config.js`:

```js
export default {
  plugins: [
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

<br>

### Inject into Vue, Context, & Store

* Use `inject()` to make services globally accessible:

```js
// plugins/hello.js
export default ({ app }, inject) => {
  inject('hello', msg => console.log(`Hello ${msg}!`))
}
```

Usage:

```js
// In a component
this.$hello('mounted')

// In asyncData
asyncData({ $hello }) {
  $hello('asyncData')
}

// In Vuex actions
actions: {
  setValue({ commit }) {
    this.$hello('store action')
  }
}
```

<br>

### ES6 & External Packages

* If using an ES6 module from `node_modules`:

```js
export default {
  build: {
    transpile: ['vue-tooltip']
  }
}
```

* Example plugin for Vue plugin `v-tooltip`:

```js
// plugins/vue-tooltip.js
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
```

<br>

### Global Mixins

* Only register once to avoid memory leaks:

```js
// plugins/my-mixin-plugin.js
import Vue from 'vue'

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({ /* mixin content */ })
}
```

<br>

### Extend Plugins / Plugin Order

* `extendPlugins()` in `nuxt.config.js` allows reordering plugins:

```js
export default {
  extendPlugins(plugins) {
    const index = plugins.findIndex(p => p.src === '~/plugins/shouldBeFirst.js')
    const plugin = plugins.splice(index, 1)[0]
    plugins.unshift(plugin)
    return plugins
  }
}
```

<br>

Perfect! Here’s a **diagram showing how Nuxt plugins interact with Vue, Nuxt context, and Vuex store**:

```
 ┌───────────────────────────────────────┐
 │            Nuxt Initialization        │
 └───────────────────────────────────────┘
                    │
                    ▼
           ┌─────────────────┐
           │  Plugins Load   │
           └─────────────────┘
          (from plugins/ directory)
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 ┌───────────────┐         ┌───────────────┐
 │  Vue Instance │         │  Nuxt Context │
 │ (components)  │         │  (app, store, │
 │               │         │   $axios, ...)│
 └───────────────┘         └───────────────┘
        │                       │
        │ inject('hello', ...)  │
        └───────────────┬───────┘
                        ▼
                ┌───────────────┐
                │  Vuex Store   │
                │ (actions can  │
                │ access $hello)│
                └───────────────┘

Legend:
- inject('hello', fn) => $hello
- Plugins can be client-only (.client.js), server-only (.server.js), or universal.
- Global mixins are applied to Vue instance (components) with a flag to avoid memory leaks.
```

<br>

### Flow Explanation

1. Nuxt starts initialization.
2. All registered plugins are loaded **before the root Vue instance is created**.
3. Plugins can:

   * Register Vue plugins (`Vue.use()`)
   * Inject functions/services into:

     * Vue components (`this.$hello`)
     * Nuxt context (`context.$hello`)
     * Vuex store (`this.$hello` in actions)
4. Client/server-only plugins are loaded conditionally.
5. Global mixins apply across all components, but require a flag to avoid multiple registrations.

<br>

> ### Nuxt `store/` directory

* `store/` contains **Vuex store files**.
* Vuex is **disabled by default** in Nuxt; creating any file inside `store/` (like `index.js`) automatically enables it.
* Cannot rename the directory without extra configuration.

<br>

#### Basic Module Structure
```js
// store/index.js
export const state = () => ({ counter: 0 })

export const getters = {
  getCounter(state) { return state.counter }
}

export const mutations = {
  increment(state) { state.counter++ }
}

export const actions = {
  async fetchCounter({ state }) {
    const res = { data: 10 }
    state.counter = res.data
    return res.data
  }
}
```
<br>

### Example of a module
```js
// store/todos.js
export const state = () => ({ list: [] })

export const mutations = {
  add(state, text) { state.list.push({ text, done: false }) },
  remove(state, todo) { state.list.splice(state.list.indexOf(todo), 1) },
  toggle(state, todo) { todo.done = !todo.done }
}
```

* Access module in a component:
```js
computed: {
  todos () { return this.$store.state.todos.list }
},
methods: {
  addTodo(e) { this.$store.commit('todos/add', e.target.value) },
  toggle(todo) { this.$store.commit('todos/toggle', todo) }
}
```

<br>

### Top-Level Splitting (Optional)

* You can split `state`, `getters`, `mutations`, and `actions` into separate files:

```
store/
-- state.js
-- getters.js
-- mutations.js
-- actions.js
```

* Example `store/state.js`:

```js
export default () => ({ counter: 0 })
```

<br>

### nuxtServerInit Action

* Special action called **only on the server** in universal mode.
* Useful to populate the store with server-side data (like session user):

```js
actions: {
  nuxtServerInit({ commit }, { req }) {
    if (req.session.user) commit('user', req.session.user)
  }
}
```

* Supports async/await or returning a Promise:

```js
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```

<br>

### Vuex Strict Mode

* Enabled in dev mode by default.
* Disable in dev mode:

```js
export const strict = false
```

<br>

```
Nuxt Store Directory (store/)
│
├─ index.js           ← Root module
│   ├─ state()        ← Root state
│   ├─ getters        ← Root getters
│   ├─ mutations      ← Root mutations
│   └─ actions        ← Root actions (including nuxtServerInit)
│
├─ todos.js           ← Module: todos
│   ├─ state()        ← Module state
│   ├─ mutations      ← Module mutations
│   └─ actions        ← Module actions
│
├─ shop/              ← Module group
│   ├─ cart/
│   │   ├─ state.js
│   │   ├─ mutations.js
│   │   └─ actions.js
│   └─ products/
│       ├─ state.js
│       └─ mutations.js
│
└─ ui.js              ← Another module

```

<br>

> ### Structured breakdown of Nuxt’s `nuxt.config.js` file and its options for quick reference:

#### 1. Environment Variables

* `env`: build-time env vars
* `runtimeConfig`: public/private runtime config

```js
export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://v2.nuxt.com'
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
```

Use in pages/components:

```js
async asyncData({ $config }) {
  const posts = await fetch(`${$config.baseURL}/posts`).then(res => res.json())
}
```

<br>

#### 2. Server Options

Configure Nuxt server and HTTPS.

```js
import fs from 'fs'
import path from 'path'

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  }
}
```

<br>

#### 3. Others thing

Set default meta tags globally.

```js
import { resolve } from 'path'

export default {
  // Aliases - Define shortcuts for paths in JS and CSS.
  alias: {
    'style': resolve(__dirname, './assets/style')
  }

  // Set dev or production mode.
  dev: process.env.NODE_ENV !== 'production'

  // Include CSS/Sass/Less files globally.
  css: ['~/assets/css/main', '~/assets/css/animations']

  // Customize webpack, loaders, filenames, transpilation.
  build: {
    extend(config, ctx) {
      // Custom webpack config here
    }
  }

  // Head / Meta Tags
  head: {
    title: 'My Title',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  },

  // Loading Component
  loading: {
    color: '#fff'
  },

  // Static generation options for dynamic routes.
  generate: {
    dir: 'gh_pages',
    subFolders: false
  },

  // Add Nuxt modules (runtime or buildModules).
  modules: ['@nuxtjs/axios'],
  buildModules: ['@nuxtjs/eslint-module'] // Dev only


  // Add JS or Vue plugins to run before app initialization.
  plugins: [
    '~/plugins/vue-tooltip.js',
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]

  // Override Vue Router defaults.
  router: {
    linkExactActiveClass: 'text-primary'
  }

  // Rename default Nuxt directories.
  dir: {
    pages: 'views' // Pages now in views/
  }
}
```

<br>

#### 4. Source Directory

Customize source code location.

```js
export default {
  srcDir: 'client/'
}
```

Example folder structure:

```
app/
  node_modules/
  nuxt.config.js
  package.json
  client/
    assets/
    components/
    layouts/
    middleware/
    pages/
    plugins/
    static/
    store/
```

<br>

> ### `alias` property in Nuxt and how to use it effectively:

* Nuxt allows you to create **shortcuts to directories** within your project for easier imports.
* These shortcuts can be used in **JavaScript, Vue, and CSS/SCSS files**.
* Default aliases provided by Nuxt:

```js
{
  '~~': '<rootDir>',
  '@@': '<rootDir>',
  '~': '<srcDir>',
  '@': '<srcDir>',
  'assets': '<srcDir>/assets',
  'static': '<srcDir>/static'
}
```

> `rootDir` → project root
> `srcDir` → source directory (`/` by default)

<br>

### Custom Aliases**

You can define your own directories in `nuxt.config.js`:

```js
import { resolve } from 'path'

export default {
  alias: {
    'images': resolve(__dirname, './assets/images'),
    'style': resolve(__dirname, './assets/style'),
    'data': resolve(__dirname, './assets/other/data')
  }
}
```

* `images` → points to `assets/images`
* `style` → points to `assets/style`
* `data` → points to `assets/other/data`

<br>

### Using Aliases

**In JavaScript / Vue `<script>`**
```js
import testData from 'data/test.json'
console.log(testData)
```

* You **don’t need `~`** here; just use the alias directly.

<br>

### In Templates / CSS / SCSS / Webpack contexts

When using **CSS, SCSS, or images inside templates**, you **must prefix aliases with `~`**:

```vue
<template>
  <img src="~images/main-bg.jpg">
</template>

<style lang="scss">
@import '~style/variables.scss';
@import '~style/utils.scss';

body {
  background-image: url('~images/main-bg.jpg');
}
</style>
```

* `~images` → resolves to `assets/images`
* `~style` → resolves to `assets/style`

> This prefix tells Webpack that it’s an alias, not a relative path.

<br>

> ### `env` property

The `env` property in `nuxt.config.js` allows you to **expose certain environment variables to the client-side** (browser).\
Normally, `process.env` values are available only on the **server**, but Nuxt injects these defined variables into the **client bundle** at **build time**.

```js
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

<br>

The **`env` property is build-time only**.
For **runtime variables** (e.g., values that change after deployment), use:

```js
export default {
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
```

Access via:

```js
this.$config.baseUrl
```

or

```js
context.$config.apiSecret
```

✅ `publicRuntimeConfig` → available on client and server
✅ `privateRuntimeConfig` → available only on server

<br>

> ### `router` Property (Full Overview)

The `router` property in `nuxt.config.js` allows you to **customize Nuxt’s internal Vue Router** behavior — including paths, modes, navigation classes, middleware, and advanced routing features.

<br>

#### 1. Base

**Type:** `String`\
**Default:** `'/'`\
Defines the **base URL** where your app is served.

```js
export default {
  router: {
    base: '/app/'
  }
}
```

If your Nuxt app is hosted under `/app/`, all routes will automatically include that prefix.\
Also adds `<base href="/app/">` to the HTML.

<br>

#### 2. routeNameSplitter

**Type:** `String`\
**Default:** `'-'`\
Changes how Nuxt names routes based on your file structure.

Example:

* File: `pages/posts/_id.vue`
* Default route name: `posts-id`

```js
export default {
  router: {
    routeNameSplitter: '/'
  }
}
// route name becomes: posts/id
```

<br>

#### 3. extendRoutes

**Type:** `Function`

Manually add or modify auto-generated routes.

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
```

You can also import Nuxt’s `sortRoutes()` helper:

```js
import { sortRoutes } from '@nuxt/utils'

export default {
  router: {
    extendRoutes(routes, resolve) {
      // Modify or push routes
      sortRoutes(routes)
    }
  }
}
```

👉 For **Named Views**, specify `components` and `chunkNames`:

```js
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/users/:id',
        components: {
          default: resolve(__dirname, 'pages/users.vue'),
          modal: resolve(__dirname, 'components/modal.vue')
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  }
}
```

<br>

#### 4. fallback

**Type:** `Boolean`\
**Default:** `false`

If `true`, router falls back to **hash mode** when `history.pushState` isn’t supported (like in IE9).
If `false`, navigation causes full page reloads in unsupported browsers.

<br>

#### 5. linkActiveClass

**Type:** `String`\
**Default:** `'nuxt-link-active'`\
Set the global class for active `<nuxt-link>` items.

```js
export default {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

<br>

#### 6. linkExactActiveClass

**Type:** `String`\
**Default:** `'nuxt-link-exact-active'`\
Class for links that exactly match the current route.

```js
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

<br>

#### 7. linkPrefetchedClass

**Type:** `String | false`\
**Default:** `false`\
Sets a custom CSS class for prefetched links.

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

<br>

#### 8. middleware

**Type:** `String` or `Array<String>`\
Set global middleware for **all routes**.

```js
export default {
  router: {
    middleware: 'user-agent'
  }
}
```
<br>

**middleware/user-agent.js**

```js
export default function (context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

<br>

#### 9. mode

**Type:** `String`\
**Default:** `'history'`\
Switch between router modes.

> ⚠️ Changing this is not recommended in SSR apps.

```js
export default {
  router: {
    mode: 'hash'
  }
}
```

<br>

#### 10. parseQuery / stringifyQuery

**Type:** `Function`\
Provide custom functions to parse and stringify URL query strings.

```js
import qs from 'qs'

export default {
  router: {
    parseQuery(query) {
      return qs.parse(query)
    },
    stringifyQuery(obj) {
      return qs.stringify(obj)
    }
  }
}
```

<br>

#### 11. prefetchLinks

**Type:** `Boolean`\
**Default:** `true`\
Automatically prefetch page code when a `<nuxt-link>` enters the viewport.

```js
export default {
  router: {
    prefetchLinks: false
  }
}
```

> Requires `IntersectionObserver`.
> If needed, polyfill it:

```js
export default {
  head: {
    script: [
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  }
}
```

Use per-link control:

```html
<nuxt-link to="/about" no-prefetch>Not prefetched</nuxt-link>
<nuxt-link to="/about" prefetch>Force prefetch</nuxt-link>
```

<br>

#### 12. prefetchPayloads

**Type:** `Boolean`\
**Default:** `true`\
(Only for `target: 'static'`)

When generating static pages, Nuxt prefetches the **payload.js** for faster transitions.

```js
export default {
  router: {
    prefetchPayloads: false
  }
}
```

<br>

#### 13. scrollBehavior

**Type:** `Function`
Controls scroll position when navigating routes.

Create a file:
`app/router.scrollBehavior.js`

```js
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

This file overrides the default Nuxt scroll behavior.

<br>

#### 14. trailingSlash

**Type:** `Boolean | undefined`\
**Default:** `undefined`

Controls if routes end with `/`:

```js
export default {
  router: {
    trailingSlash: true // or false
  }
}
```

* `true` → `/about/` works, `/about` doesn’t
* `false` → `/about` works, `/about/` doesn’t

> ⚠️ Requires redirects or link updates — test carefully.

<br>

**Summary Table**

| Option                          | Type       | Description                        |                         |
| ------------------------------- | ---------- | ---------------------------------- | ----------------------- |
| `base`                          | `String`   | Base URL prefix                    |                         |
| `routeNameSplitter`             | `String`   | Separator for route names          |                         |
| `extendRoutes`                  | `Function` | Add or modify routes manually      |                         |
| `fallback`                      | `Boolean`  | Use hash mode fallback in IE9      |                         |
| `linkActiveClass`               | `String`   | Global active link class           |                         |
| `linkExactActiveClass`          | `String`   | Exact match active class           |                         |
| `linkPrefetchedClass`           | `String    | false`                             | Prefetch link CSS class |
| `middleware`                    | `String    | Array`                             | Global middleware       |
| `mode`                          | `String`   | Router mode (`history` / `hash`)   |                         |
| `parseQuery` / `stringifyQuery` | `Function` | Custom query handling              |                         |
| `prefetchLinks`                 | `Boolean`  | Prefetch code-split pages          |                         |
| `prefetchPayloads`              | `Boolean`  | Prefetch payloads for static sites |                         |
| `scrollBehavior`                | `Function` | Customize scroll on navigation     |                         |
| `trailingSlash`                 | `Boolean`  | Enforce or remove trailing slashes |                         |


<br>

> ### `$nuxt` in Nuxt 2

### 1️. Connection Checker

`$nuxt.isOffline` and `$nuxt.isOnline` let you detect the user's internet status.

```vue
<template>
  <div>
    <div v-if="$nuxt.isOffline">You are offline</div>
    <nuxt />
  </div>
</template>
```

* Shows a message whenever the user loses connection.
* `$nuxt.isOnline` is the opposite: `true` when the user is online.

<br>

### 2️. Refreshing Page Data

Use `$nuxt.refresh()` to **rerun `asyncData` or `fetch()`** for the current page without reloading.

```vue
<template>
  <div>
    <div>{{ content }}</div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
export default {
  asyncData() {
    return { content: 'Created at: ' + new Date() }
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    }
  }
}
</script>
```

* Handy when you want to update data on the same page dynamically.
* Only affects data from `asyncData` or `fetch`.

<br>

### 3️. Controlling the Loading Bar

Nuxt comes with a built-in loading bar that you can control programmatically:

```js
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()  // show the bar
      setTimeout(() => this.$nuxt.$loading.finish(), 500) // hide after 0.5s
    })
  }
}
```

* `$nuxt.$loading.start()` → shows the progress bar.
* `$nuxt.$loading.finish()` → hides it.
* `$nuxt.$loading.fail()` → shows an error state.

<br>

### Key Takeaways

* `$nuxt` is **only available on the client-side**.
* Provides access to: **connection status, data refresh, and loading bar**.
* Useful for improving **UX without reloading the page**.

<br>

> ### scrollToTop property 

In Nuxt is a convenient way to control page scroll behavior when navigating between routes, especially **nested or child routes**. Here's a clear breakdown:

* By default, Nuxt **keeps scroll position** for child routes.
* Setting `scrollToTop: true` forces Nuxt to **scroll to the top** when rendering a page.

<br>

```vue
<template>
  <h1>My Child Component</h1>
  <p>Content here...</p>
</template>

<script>
export default {
  scrollToTop: true
}
</script>
```

* When this component is rendered as a **child route**, the browser scroll will reset to the top.

<br>

### Parent Route Control

* You can **disable scrolling to top** on a parent route by setting:

```js
export default {
  scrollToTop: false
}
```

<br>

### Advanced Control

* If you want **more control over scrolling**, like smooth scrolling or custom positions, use the **`router.scrollBehavior`** option:

```js
// app/router.scrollBehavior.js
export default function (to, from, savedPosition) {
  if (to.hash) return { selector: to.hash }   // scroll to anchor
  return { x: 0, y: 0 }                       // scroll to top
}
```

<br>

> ### Validate method in Nuxt 
It is a **route-level guard for dynamic routes**. It allows you to check whether a route’s parameters are valid **before rendering the page**, both on server-side and client-side navigation. Here’s a detailed breakdown:

* Ensures that a route only renders if certain conditions are met (e.g., valid ID, existing resource).
* If `validate` returns `false` or a rejected promise, Nuxt **renders the error page** (default 404).
* Can be **synchronous** or **asynchronous**.

<br>

### Basic Example (Dynamic Route)

```js
// pages/users/_id.vue
export default {
  validate({ params }) {
    // Only allow numeric IDs
    return /^\d+$/.test(params.id)
  }
}
```

* `/users/123` → valid → page renders
* `/users/abc` → invalid → 404 error page

<br>

### Using Store or Context

```js
export default {
  validate({ params, store }) {
    // Check if the category exists in the store
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

* Useful for **server-side validated data** populated via `nuxtServerInit`.

<br>

### Async Validation

```js
export default {
  async validate({ params, store }) {
    const exists = await store.dispatch('checkCategory', params.id)
    return exists
  }
}
```

* You can perform **API calls** or other asynchronous checks.
* If the promise resolves to `false`, Nuxt will show the 404 page.

<br>

### Throwing Errors

```js
export default {
  async validate({ params }) {
    // Unexpected error
    throw new Error('Service temporarily unavailable')
  }
}
```

* Throws a **500 error** or custom message if something goes wrong.
* You can use this to signal server errors, not just invalid routes.

<br>

**Key Notes**

* Only used in **dynamic route components** (e.g., `_id.vue`).
* Runs:
  * **Server-side**: on first request.
  * **Client-side**: on navigation.
* Returns:
  * `true` → render the page
  * `false` → show 404 page