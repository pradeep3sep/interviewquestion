- Folder acts as routing path

```js
<NuxtLink to="/">Home page</NuxtLink>
```

> ### Static Deployment (Pre-rendered)

Nuxt gives you the ability to host your web application on any static hosting.

To deploy a static generated site make sure you have `target: 'static'` in your `nuxt.config.js` (for Nuxt >= 2.13):

```js
// nuxt.config.js
export default {
  target: 'static'
}
```


Here’s a **concise version** of your Nuxt “Views” notes — shortened but keeping all important details intact 👇

---

![alt text](https://v2.nuxt.com/_nuxt/image/f55faf.png)


## **Nuxt Views Overview**

Views define how data and content are displayed for each route.
A **View** = `app template` + `layout` + `page`.

---

### **1. Pages**

* Every file in `pages/` is a **Vue component** with extra Nuxt features.
* Example:

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
* Refer to **Directory Structure** docs for full property list.

---

### **2. Layouts**

Used to define the general **look and feel** (header, sidebar, etc.) of your app.

#### **Default Layout**

* File: `layouts/default.vue`
* Used when no layout is specified.

  ```vue
  <template>
    <Nuxt />
  </template>
  ```
* `<Nuxt />` renders the page component.

#### **Custom Layout**

* Create a custom file in `layouts/` (e.g., `blog.vue`):

  ```vue
  <!-- layouts/blog.vue -->
  <template>
    <div>
      <div>My blog navigation bar</div>
      <Nuxt />
    </div>
  </template>
  ```
* Use it in a page:

  ```vue
  <!-- pages/posts.vue -->
  <script>
  export default {
    layout: 'blog'
  }
  </script>
  ```
* If no `layout` specified → uses `default.vue`.

---

### **3. Error Page**

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

---

### **4. App Template (app.html)**

Defines the **HTML skeleton** of your Nuxt app.
Default:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

#### **Customization Example**

Add custom scripts or conditional CSS (e.g., for IE):

```html
<!DOCTYPE html>
<!--[if IE 9]><html class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

---

✅ **Summary:**

* **Pages** = route components (`head`, `layout`, etc.).
* **Layouts** = shared structure (`default` or custom).
* **Error Page** = special page for error states (no `<Nuxt />`).
* **App Template** = global HTML wrapper (rarely modified).

---

Would you like me to format this as a **Markdown cheat sheet** for easier reference (headings, bullets, code blocks)?



![alt text](https://v2.nuxt.com/_nuxt/image/c12c33.svg)


Here’s a **short, structured version** of your *“Context and Helpers”* notes — compact but includes all key details 👇

---

## **Nuxt Context & Helpers — Quick Notes**

### **1. What is Context**

* Context gives **extra info** about the current request.
* Available in: `asyncData`, `plugins`, `middleware`, `nuxtServerInit`.
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

> ⚠️ Not the same as Vuex or build.extend context objects.

---

### **2. Using Context Parameters**

* Dynamic routes via `context.params`.
* Example:

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

---

### **3. Redirect & Store Access**

* `store`: same as `this.$store`.
* `redirect`: helper for navigation.

**Example middleware:**

```js
export default {
  middleware({ store, redirect }) {
    if (!store.state.authenticated) redirect('/login')
  }
}
```

---

## **Helpers**

### **1. $nuxt Helper**

Accessible via `this.$nuxt` (Vue) or `window.$nuxt` (client).

#### ✅ Connection Status

```vue
<div v-if="$nuxt.isOffline">You are offline</div>
```

* Properties: `isOnline`, `isOffline`.

#### ✅ Access Root Instance

* `window.$nuxt` gives access to app instance or modules (e.g., `$axios`).
* Use **only as last resort**.

#### ✅ Refresh Page Data

```vue
<button @click="$nuxt.refresh()">Refresh</button>
```

* Refreshes `asyncData` / `fetch` without reloading the app.

#### ✅ Control Loading Bar

```js
mounted() {
  this.$nextTick(() => {
    this.$nuxt.$loading.start()
    setTimeout(() => this.$nuxt.$loading.finish(), 500)
  })
}
```

---

### **2. onNuxtReady**

Run scripts after Nuxt is fully loaded (client-side only).

```js
window.onNuxtReady(() => {
  console.log('Nuxt is ready')
})
```

---

### **3. Process Helpers**

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

---

✅ **Summary**

* **Context** = shared data & utilities for server/client.
* **Helpers** = `$nuxt`, `onNuxtReady`, and `process.*` for app state control.
* Use context for data fetching, redirects, and store access; use helpers for app-level interactions.

---

Would you like me to combine this and the previous *Views* section into one **printable Markdown cheat sheet** for quick reference?




Here’s a **concise and complete summary** of your *“Server-Side Rendering (SSR)”* notes — simplified but with all important technical details retained 👇

---

## **Nuxt Server-Side Rendering (SSR) — Quick Notes**

### **1. What is SSR**

* **Server-Side Rendering (SSR)**: HTML is generated **on the server**, not the browser.
* The **server sends a fully rendered page** → browser displays it → **Vue hydrates** the app to make it reactive.

---

### **2. Node.js Requirement**

* SSR needs a **Node.js server** to render and serve your Vue pages.

---

### **3. Extending the Server**

You can extend or modify the server behavior using **serverMiddleware**.

**Example:**

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

---

### **4. Server vs Browser Environment**

* **Server (Node.js):**
  Access to `req`, `res`.
  ❌ No access to `window` or `document`.
* **Browser:**
  Use `window` or `document` inside lifecycle hooks like:

  ```js
  beforeMount() { window.alert('hello') }
  mounted() { window.alert('hello') }
  ```

---

### **5. SSR Lifecycle (Steps in Nuxt)**

#### **Step 1: Browser → Server**

* Browser requests page → hits Node.js internal server.
* Nuxt renders HTML with data from `asyncData`, `nuxtServerInit`, or `fetch`.
* Server executes hooks and sends rendered HTML.

#### **Step 2: Server → Browser**

* Browser receives rendered HTML.
* Vue **hydrates** it → page becomes reactive and interactive.

#### **Step 3: Browser → Browser**

* Navigation via `<NuxtLink>` happens **client-side** (no new server request unless hard refresh).

---

### **6. Common Caveats**

#### ⚠️ **`window` or `document` Undefined**

* These objects don’t exist on the server.
* Wrap client-only code with:

  ```js
  if (process.client) {
    require('external_library')
  }
  ```

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

---

✅ **Summary**

* **SSR** = pre-rendered HTML from server → hydrated by Vue.
* Needs **Node.js** runtime.
* Use **serverMiddleware** to extend server logic.
* Avoid using `window`/`document` directly on the server.
* **Hydration** makes the app interactive after the first load.
* Handle iOS number auto-linking to prevent rendering mismatches.

---

Would you like me to merge this with your **Views** and **Context & Helpers** sections into a single, well-formatted **Markdown cheat sheet** (for print or quick reference)?



Here’s a **short, complete summary** of your *“Static Site Generation (SSG)”* notes — formatted for clarity and quick reference 👇

---

## **Nuxt Static Site Generation (SSG) — Quick Notes**

### **1. What is Static Site Generation**

* **SSG** pre-renders your app at **build time**.
* Outputs **static HTML + JS files** → can be deployed to **Netlify, Vercel, GitHub Pages**, etc.
* ✅ No Node.js server needed.

---

### **2. How It Works**

* Set `target: 'static'` in `nuxt.config.js`.
* During build, Nuxt:

  * Generates every `.vue` page into HTML & JS.
  * Executes and caches all API calls in a **static** folder.
  * Client-side navigation uses cached data (no API re-calls).

---

### **3. Lifecycle Steps**

#### **Step 1: Browser → CDN**

* Browser sends request → hits CDN hosting your static files.

#### **Step 2: CDN → Browser**

* CDN serves **pre-rendered HTML, JS, and assets**.
* Vue **hydrates** the page → makes it reactive & interactive.

#### **Step 3: Browser → Browser**

* Navigation via `<NuxtLink>` handled **client-side**.
* Even hard refresh loads from cached **static folder**, not API or CDN.

---

### **4. SPA Fallback**

* Pages **excluded** from generation via `generate.exclude` →
  become **Single Page App (SPA)** pages.
* Rendered **client-side** (not pre-rendered or cached).

---

### **5. Updating Content**

* To reflect new API or CMS content → **rebuild the site**.
* Most hosting platforms trigger rebuilds via:

  * Git pushes to the main branch, or
  * Pull request merges.

---

### **6. Preview Mode**

* Enables **live preview** of API/CMS changes before deployment.
* Temporarily fetches live data without rebuilding.

---

✅ **Summary**

* **SSG = Pre-rendered static HTML at build time.**
* **Fast, secure, and serverless deployment.**
* **Client navigation = instant (cached data).**
* **Rebuild required for content updates.**
* **Preview Mode** allows testing new content live.

---

Would you like me to now compile all four topics —
**Views**, **Context & Helpers**, **SSR**, and **SSG** —
into a single **Markdown cheat sheet** (well formatted for quick revision or printing)?





![alt text](https://v2.nuxt.com/_nuxt/image/de48ca.svg)

Perfect — you’ve shared the full **Nuxt.js lifecycle**, which is one of the most important core concepts to truly master Nuxt development.
Let’s break it down and summarize it **clearly and visually**, so you can recall it easily when debugging or optimizing apps 👇

---

## 🧩 Nuxt Lifecycle Overview

Nuxt’s lifecycle happens **after the build phase** (once code is bundled and optimized).
From here, it diverges into two main paths depending on your mode:

1. **SSR (Server-Side Rendering)** — via `nuxt start`
2. **SSG (Static Site Generation)** — via `nuxt generate`

Each mode has its **Server** and **Client** lifecycle phases.

---

## ⚙️ Server Lifecycle (SSR or during Static Generation)

> Happens on the server for every initial request (SSR) or once per route during static generation (SSG).

### 🧠 Step-by-step:

1. **Server starts**

   * `nuxt start` (for SSR)
   * `nuxt generate` (for SSG)

2. **Nuxt Hooks**

   * Framework-level hooks run (e.g., `render:before`, `build:done`)

3. **serverMiddleware**

   * Custom Node/Express middlewares from `nuxt.config.js`

4. **Server-side Nuxt Plugins**

   * Loaded **in order** as defined in `nuxt.config.js` under `plugins`

5. **nuxtServerInit**

   * Vuex action for **pre-populating the store**
   * Only runs **on the server**
   * Defined in `store/index.js`

6. **Middleware**

   * Runs in order:

     * Global middleware (`middleware/` + `nuxt.config.js`)
     * Layout middleware
     * Route middleware

7. **asyncData**

   * Fetches data **before page creation**
   * Blocks rendering until complete

8. **Vue Lifecycle**

   * `beforeCreate`
   * `created`

9. **fetch()**

   * New fetch method (runs top → bottom, parallel for siblings)
   * Non-blocking

10. **Serialization**

    * Vuex state is serialized (Nuxt hook: `render:routeContext`)

11. **HTML Rendering**

    * Actual HTML output (hook: `render:route`)

12. **render:routeDone**

    * Triggered once HTML is sent to browser

13. **(Static Only)**

    * `generate:before` → before generation
    * `generate:page` → each page HTML created
    * `generate:routeCreated` → route fully generated
    * `generate:done` → all routes done

---

## 💻 Client Lifecycle (in the Browser)

> This part happens in the browser for **both SSR and SSG**.

### 🧠 Step-by-step:

1. **Receives HTML**

   * Browser loads pre-rendered page.

2. **Loads JS Assets**

   * JavaScript bundles, hydration scripts, etc.

3. **Client-side Nuxt Plugins**

   * Executed in the same order as defined in `nuxt.config.js`

4. **Vue Hydration**

   * Converts static HTML into a live, reactive Vue app.

5. **Middleware (Blocking)**

   * Global → Layout → Route middleware

6. **asyncData**

   * Fetched again (if needed) on client navigation.

7. **Vue Lifecycle**

   * `beforeCreate`
   * `created`

8. **fetch()**

   * Non-blocking data fetching.

9. **beforeMount**

10. **mounted**

    * Component is now interactive.

---

## 🔁 Navigation with `<NuxtLink>`

> Happens **only in the browser** when navigating without page reloads.

1. Runs middleware (Global → Layout → Route)
2. Executes `asyncData` (blocking) or static payload loading
3. Executes `fetch` (non-blocking)
4. Triggers Vue lifecycle (`beforeCreate`, `created`, `beforeMount`, `mounted`)
5. No CDN hit — navigation happens **client-side** only.

---

## 🧭 Quick Mental Model

| Phase              | What Happens                        | Blocking? | Where  |
| ------------------ | ----------------------------------- | --------- | ------ |
| `serverMiddleware` | Handle API, auth, redirects         | ✅         | Server |
| `nuxtServerInit`   | Pre-fill Vuex store                 | ✅         | Server |
| `middleware`       | Auth checks, routing guards         | ✅         | Both   |
| `asyncData`        | Fetch data before rendering         | ✅         | Both   |
| `fetch()`          | Fetch data after component creation | ❌         | Both   |
| `mounted`          | DOM ready, app interactive          | ❌         | Client |

---

Would you like me to make a **visual lifecycle flow diagram** (like a timeline from server → client → navigation) to help you remember this more intuitively?


Exactly ✅ — that passage explains the **three rendering modes in Nuxt**.
Let’s summarize them clearly so you can recall when and why to use each 👇

---

## ⚙️ Rendering Modes in Nuxt

### 1. **Server-Side Rendering (SSR)**

> 🧠 Default mode — `ssr: true` (you don’t need to set it manually).

#### 🏗 How it works:

* Each time a user requests a page, the **server** generates the HTML.
* The generated HTML is sent to the browser.
* Once received, Vue **hydrates** it — making it interactive.

#### 📦 nuxt.config.js

```js
export default {
  ssr: true // default (no need to add)
}
```

#### ✅ Pros:

* Great **SEO** — full HTML available to crawlers.
* Faster **first contentful paint**.
* Dynamic data always up-to-date.

#### ⚠️ Cons:

* Needs a **Node.js server**.
* Slightly higher latency per request (HTML generated on demand).

#### 🏁 Use when:

* Content changes frequently (e.g., dashboards, logged-in pages, news feeds).
* SEO is important.

---

### 2. **Static Site Generation (SSG)**

> ⚙️ Triggered via `nuxt generate` and often called “pre-rendering”.

#### 🏗 How it works:

* Pages are **rendered at build time** — HTML generated once and stored.
* On deploy, files are served via **CDN** (no Node server needed).
* Navigation between pages uses client-side rendering.

#### 📦 nuxt.config.js

```js
export default {
  target: 'static', // or just run `nuxt generate`
}
```

#### ✅ Pros:

* Very fast — served from CDN.
* No backend server required.
* Secure (no runtime code execution).

#### ⚠️ Cons:

* To see new data, must **regenerate the site**.
* Not ideal for highly dynamic or personalized content.

#### 🏁 Use when:

* Blog, docs, marketing sites, portfolios.
* Content changes occasionally.

---

### 3. **Client-Side Rendering (CSR)**

> 🚀 “SPA mode” — no SSR or pre-rendering.
> Only runs in the browser.

#### 🏗 How it works:

* The server sends a **bare HTML shell** and a JavaScript bundle.
* Vue takes over and renders the entire app in the browser.

#### 📦 nuxt.config.js

```js
export default {
  ssr: false // enables SPA mode
}
```

#### ✅ Pros:

* No Node server or build-time generation needed.
* Ideal for **internal tools** or apps behind login.

#### ⚠️ Cons:

* Poor SEO (HTML is empty before JS runs).
* Slower first paint (browser must download JS before rendering).

#### 🏁 Use when:

* SEO doesn’t matter (e.g., dashboards, admin panels, internal apps).

---

## 🧭 Quick Comparison Table

| Mode    | Server Needed? | When HTML is Rendered | SEO Friendly | Example Use Case      |
| ------- | -------------- | --------------------- | ------------ | --------------------- |
| **SSR** | ✅ Yes          | On each request       | ✅ Excellent  | News site, e-commerce |
| **SSG** | ❌ No           | At build time         | ✅ Excellent  | Blogs, portfolios     |
| **CSR** | ❌ No           | In browser            | ❌ Poor       | Internal dashboards   |

---

Would you like me to show **how Nuxt decides which lifecycle steps run differently** in each rendering mode (SSR vs SSG vs CSR)? That’s a nice way to connect this section to the lifecycle you shared earlier.


Perfect — this section describes **where and how your Nuxt app is deployed** depending on your rendering strategy.
Here’s a clean, developer-friendly summary 👇

---

## 🚀 **Nuxt Deployment Targets**

Nuxt can be deployed in **two main ways** — depending on whether you need a **server** or not.

---

### **1. Static Hosting (`target: 'static'`)**

> 🧱 Generates your site as a **fully static website** — no Node.js server needed.

#### ⚙️ **How it works**

* Run:

  ```bash
  nuxt generate
  ```
* Nuxt **pre-renders HTML** for every route.
* Output goes into the `/dist` folder — ready to deploy anywhere (Netlify, GitHub Pages, Vercel, etc.).
* Dynamic routes are handled via the **Nuxt Crawler**, which finds and generates them automatically.

#### 📦 **nuxt.config.js**

```js
export default {
  target: 'static' // default is 'server'
}
```

#### 🧠 **When you run `nuxt dev` with `target: 'static'`:**

* Removes `req` & `res` from context (no server context available).
* Falls back to **client-side rendering** for:

  * 404s
  * errors
  * redirects
    *(see SPA fallback)*
* `$route.query` = `{}` on the server-side.
* `process.static` → `true`
* `process.target` → `'static'` (helpful for module authors).

#### ✅ **Pros**

* No backend required — deploy anywhere.
* Faster load times (CDN-friendly).
* SEO-friendly (pre-rendered HTML).
* Works offline (thanks to pre-generated files).

#### ⚠️ **Cons**

* Must rebuild site for new content.
* Limited server interactivity (no `req`/`res`).

#### 🏁 **Use when**

* Blogs, portfolios, documentation, marketing sites — content changes rarely.

---

### **2. Server Hosting (`target: 'server'`)**

> 🖥️ Runs on a **Node.js server**, rendering pages on demand.

#### ⚙️ **How it works**

* Browser requests a page → Node.js server renders HTML for that request → sends it back.
* You can also use `serverMiddleware` for APIs, logging, or authentication.
* Works with **both SSR and CSR** modes:

  * With `ssr: true` → full server-side rendering.
  * With `ssr: false` → SPA served from Node (no SSR, but still uses middleware).

#### 📦 **nuxt.config.js**

```js
export default {
  target: 'server' // default value
}
```

#### ✅ **Pros**

* Supports dynamic content.
* Can use server APIs and middleware.
* Real-time rendering per request.

#### ⚠️ **Cons**

* Requires a running Node.js server.
* Slightly slower initial response than static.

#### 🏁 **Use when**

* You need **serverMiddleware** (custom APIs, authentication, etc.).
* Your content updates frequently.
* You require **true SSR** for SEO or personalization.

---

## ⚡ Quick Comparison

| Feature                     | `target: 'static'`         | `target: 'server'`     |
| --------------------------- | -------------------------- | ---------------------- |
| **Requires Node.js server** | ❌ No                       | ✅ Yes                  |
| **Rendered**                | At build time              | On each request        |
| **Performance**             | ⚡ Very fast (CDN cached)   | 🚀 Depends on server   |
| **SEO**                     | ✅ Excellent                | ✅ Excellent            |
| **Middleware support**      | ❌ Limited                  | ✅ Full                 |
| **Dynamic content**         | ⚠️ Requires rebuild        | ✅ Always fresh         |
| **Use case**                | Blogs, docs, landing pages | Dashboards, apps, APIs |

---

Would you like me to combine this with the **Rendering** section into a single summarized sheet (to see how SSR/SSG/CSR connect to `target: 'server'` and `target: 'static'`)? It makes the relationships much clearer.








Here’s a **short, complete summary** of the **File System Routing** chapter — simplified and structured while keeping all important details intact 👇

---

## 🚏 **File System Routing in Nuxt**

Nuxt automatically creates routes based on your **`pages/`** directory — no manual router config needed.
It also supports **nested**, **dynamic**, and **custom** routes.

---

### ⚙️ **Basics**

* Each `.vue` file in `pages/` becomes a route.
* Uses **automatic code-splitting** per page.
* Use `<NuxtLink>` for navigation.

```vue
<template>
  <NuxtLink to="/">Home</NuxtLink>
</template>
```

#### 🗂️ Example

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

---

### 🌀 **Dynamic Routes**

Use `_` prefix for dynamic parameters.

#### 🗂️ Example

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

#### 📍Accessing Params

```js
this.$route.params.id
```

#### 🕵️‍♂️ Static Site Note

Nuxt’s **crawler (v2.13+)** auto-detects linked dynamic routes.
Unlinked/secret pages must be manually defined in `generate.routes`.

---

### 🌳 **Nested Routes**

Use a parent `.vue` with `<NuxtChild />`.

#### 🗂️ Example

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

---

### 🔁 **Dynamic Nested Routes**

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

---

### ❓ **Unknown Depth Routes**

Use a **catch-all** file: `pages/_.vue`

Handles any unmatched path (e.g. `/about`, `/about/team`, `/foo/bar/...`).
Can also serve as a **custom 404 page**.

---

## 🧩 **Customizing the Router**

### Extend Router via `nuxt.config.js`

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

#### 🧱 With `@nuxt/utils`

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

#### 🧩 Named Views

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

---

## ⚙️ **Router Config Options**

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

#### Example Scroll Behavior

`app/router.scrollBehavior.js`

```js
export default function (to, from, savedPosition) {
  return { x: 0, y: 0 } // scroll to top
}
```

---

### 🧩 Other Router Extension Methods

* `router-extras-module` → customize route params.
* `@nuxtjs/router` → override entire router with your own `router.js`.

---

Would you like me to make a **visual diagram** showing how the file structure → routes → nested/dynamic routing work together? It’s great for quick revision.



Here’s a **clear and compact summary** of the **Data Fetching** chapter in Nuxt — perfect for quick understanding and revision 👇

---

## ⚡ **Data Fetching in Nuxt**

Nuxt provides **two main hooks** for fetching async data — optimized for **server-side rendering (SSR)** and **static generation**.

---

### 🧠 **Why Nuxt Hooks?**

Traditional Vue methods like `mounted()` only run on the **client-side**, so data isn’t rendered on the server.
Nuxt provides SSR-friendly alternatives:

| Hook        | Used In       | SSR Support | Access to `this` | Shows Loading State           | Blocks Navigation |
| ----------- | ------------- | ----------- | ---------------- | ----------------------------- | ----------------- |
| `fetch`     | Any component | ✅ Yes       | ✅ Yes            | ✅ Yes (`$fetchState.pending`) | ❌ No              |
| `asyncData` | Only pages    | ✅ Yes       | ❌ No             | ❌ No                          | ✅ Yes             |

---

## 🔁 **1️⃣ The `fetch()` Hook**

> Works in pages and components.
> Runs on the server before initial render, and on the client when navigating.

---

### 🧩 **Basic Example**

```vue
<script>
export default {
  data() {
    return { posts: [] }
  },
  async fetch() {
    this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts')
  }
}
</script>
```

---

### ⚙️ **Behavior Options**

| Property        | Type               | Description                                    |
| --------------- | ------------------ | ---------------------------------------------- |
| `fetchOnServer` | Boolean / Function | If false → run only on client                  |
| `fetchKey`      | String / Function  | Unique key for caching/hydration               |
| `fetchDelay`    | Number             | Adds delay to prevent flicker (default: 200ms) |

```js
export default {
  fetchOnServer: false,
  fetchKey(getCounter) {
    return 'sidebar-' + getCounter('sidebar')
  }
}
```

---

### 🔍 **Fetch State**

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

---

### ⏱️ **Re-fetching & Caching**

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

---

### 🕵️ **Listening to Query Changes**

`fetch()` doesn’t run on query changes by default.

```js
watch: {
  '$route.query': '$fetch'
}
```

---

### 🚨 **Error Handling**

`fetch()` does **not** trigger Nuxt’s error page.
Handle manually with `$fetchState.error`.

---

## 📘 **2️⃣ The `asyncData()` Hook**

> Used **only in page components** (not child components).
> SSR-compatible and merges returned data into the page component’s `data()`.

---

### 🧩 **Example**

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

✅ **Runs before rendering** (SSR + during client navigation).
❌ **No access to `this`** (use context args).
✅ **Returns object merged into page data.**
❌ **No loading placeholder** — navigation waits until data resolves.

---

### ⚙️ **Query Change Handling**

`asyncData` does not automatically run on query changes.
Use `watchQuery` to control when to re-fetch.

```js
export default {
  watchQuery: ['page', 'limit']
}
```

---

### 🧩 **Fetching for Components**

Components **can’t** use `asyncData`.
Alternatives:

1. Use `fetch()` (✅ SSR supported)
2. Use `mounted()` (❌ CSR only)
3. Fetch in parent `asyncData` and pass via props.

---

### 🧠 **In Short**

| Feature                | `fetch()`           | `asyncData()`            |
| ---------------------- | ------------------- | ------------------------ |
| Works in Components    | ✅                   | ❌                        |
| Access `this`          | ✅                   | ❌                        |
| Shows Loading          | ✅                   | ❌                        |
| Blocks Navigation      | ❌                   | ✅                        |
| Error Handling         | `$fetchState.error` | `error()` or redirect    |
| SSR Compatible         | ✅                   | ✅                        |
| Re-run on Query Change | Manual (`watch`)    | Automatic (`watchQuery`) |

---

Would you like me to make a **visual table + flow diagram** showing when each hook runs (SSR vs Client Navigation vs Static Build)? It helps a lot to memorize how `fetch()` and `asyncData()` differ.





Here’s a **concise and developer-friendly summary** of the **Meta Tags and SEO** chapter in Nuxt 👇

---

## 🌐 **Meta Tags & SEO in Nuxt**

Nuxt provides flexible ways to manage **meta tags**, **titles**, and **external resources** — essential for **SEO** and **social sharing**.

---

### 🧠 **3 Ways to Add Meta Data**

1. **Globally** — via `nuxt.config.js`
2. **Locally (static)** — via `head` as an **object**
3. **Locally (dynamic)** — via `head()` as a **function**

---

## 🏗️ **1️⃣ Global Meta Settings**

Define defaults that apply to every page.

**`nuxt.config.js`**

```js
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

---

## 🧩 **2️⃣ Local Meta (Static)**

Define meta tags for a specific page.

**`pages/index.vue`**

```vue
<script>
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
</script>
```

✅ Simple and **page-specific**
❌ Can’t use `data()` or `computed` values

---

## ⚙️ **3️⃣ Local Meta (Dynamic)**

Use `head()` as a **function** to access reactive data or computed props.

**`pages/index.vue`**

```vue
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

---

## 🧩 **About `hid`**

To prevent duplicate meta tags, always give a unique `hid` (HTML ID) to your meta entries.

> Example:
> `{ hid: 'description', name: 'description', content: '...' }`

This tells `vue-meta` (the underlying library) which tag to **replace**, not duplicate.

---

## 🧰 **Adding External Resources**

You can add **scripts**, **stylesheets**, or **fonts** globally or locally.

---

### 🌍 **Global Example**

**`nuxt.config.js`**

```js
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

---

### 📄 **Local Example**

**`pages/about.vue`**

```vue
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

---

### 🧩 **Optional: Load Script Before `</body>`**

```js
{ src: '...', body: true }
```

Adds the script **at the end of the body** for better performance.

---

## 📘 **Summary Table**

| Scope           | Method                     | Dynamic? | Applies To    | Use Case                     |
| --------------- | -------------------------- | -------- | ------------- | ---------------------------- |
| Global          | `head` in `nuxt.config.js` | ❌        | Whole app     | Default meta, favicon, fonts |
| Local (Static)  | `head: { ... }`            | ❌        | Specific page | Static title/meta            |
| Local (Dynamic) | `head() { ... }`           | ✅        | Specific page | Dynamic SEO/meta tags        |

---

Would you like me to include an example of **Open Graph (OG)** and **Twitter Card** meta tags (for social sharing) next? It’s often the next practical SEO step after this.




Here’s a **structured summary** of the Nuxt **Configuration** chapter you shared, highlighting key points and practical usage.

---

## ⚙️ **Nuxt Configuration Overview**

Nuxt comes pre-configured for most use cases, but you can override defaults using **`nuxt.config.js`**.
You can configure **CSS**, **pre-processors**, **webpack**, **server settings**, **external resources**, and more.

---

## 🖌️ **CSS Property**

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

* Nuxt detects the type from the file extension.
* Preprocessor loaders like **sass-loader** are required for SCSS/SASS.
* You can omit extensions; Nuxt uses the **`styleExtensions` order**:
  `['css', 'pcss', 'postcss', 'styl', 'stylus', 'scss', 'sass', 'less']`.

---

### 🎨 **Style Pre-processors**

Use the `lang` attribute in `<style>` or `<template>`:

```vue
<template lang="pug">
  h1.red Hello {{ name }}!
</template>

<style lang="scss">
.red { color: red; }
</style>
```

Install loaders:

```bash
yarn add --dev sass sass-loader@10 pug pug-plain-loader
```

---

## 🌐 **External Resources**

Include scripts, fonts, or styles **globally** or **locally**.

**Global (`nuxt.config.js`):**

```js
head: {
  script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }],
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }]
}
```

**Local (per page):**

```vue
head() {
  return {
    script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }],
    link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }]
  }
}
```

> Optional `body: true` to load scripts before `</body>`.

---

## 🛠️ **PostCSS Plugins**

Configure PostCSS in `nuxt.config.js`:

```js
build: {
  postcss: {
    plugins: {
      'postcss-url': false,
      'postcss-nested': {},
      'postcss-responsive-type': {},
      'postcss-hexrgba': {}
    },
    preset: {
      autoprefixer: { grid: true }
    }
  }
}
```

---

## ✨ **JSX Support**

Nuxt supports JSX using `@nuxt/babel-preset-app`:

```js
export default {
  data() { return { name: 'World' } },
  render() { return <h1>{this.name}</h1> }
}
```

* `h` (createElement) alias is optional in JSX.

---

## 🚫 **Ignoring Files**

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

---

## 🔧 **Extending Webpack**

* Use `build.extend` to customize webpack:

```js
build: {
  extend(config, { isDev, isClient }) {
    config.module.rules.push({
      test: /\.(ttf|eot|svg|woff(2)?)$/,
      loader: 'file-loader'
    })
  }
}
```

* Can set `splitChunks.maxSize` for client bundle optimization.
* Add plugins:

```js
import webpack from 'webpack'
plugins: [
  new webpack.ProvidePlugin({ $: 'jquery', _: 'lodash' })
]
```

* Load audio files:

```js
config.module.rules.push({
  test: /\.(ogg|mp3|wav|mpe?g)$/i,
  loader: 'file-loader',
  options: { name: '[path][name].[ext]' }
})
```

* For `<audio src="@/assets/water.mp3">`:

```js
loaders: { vue: { transformAssetUrls: { audio: 'src' } } }
```

---

## 🌍 **Server Host & Port**

* Default: `localhost:3000`
* Change in `nuxt.config.js`:

```js
server: { host: '0', port: 8000 }
```

* Or via command line:

```bash
HOST=0 PORT=8000 npm run dev
```

---

## ⚡ **Asynchronous Config**

You can export an async function to fetch remote data at config time:

```js
import axios from 'axios'

export default async () => {
  const data = await axios.get('https://api.nuxtjs.dev/posts')
  return {
    head: { title: data.title }
  }
}
```

---

If you want, I can create a **visual “Nuxt Configuration Cheat Sheet”** that summarizes **CSS, head, webpack, server, ignore rules, and build options** in a single diagram. This is super handy for reference.

Do you want me to make that?




Here’s a structured **Nuxt Loading & Progress Bar guide** based on what you shared:

---

## ⏳ **Default Loading Behavior**

Nuxt provides a **loading progress bar** by default between route transitions.
You can **customize**, **disable**, or **replace** it with a custom component.

---

## 🎨 **Customizing the Progress Bar**

Set options in `nuxt.config.js`:

```js
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

> **Tip:** If the loading is too fast, set `throttle: 0` to make the bar visible.

---

## ❌ **Disabling the Progress Bar**

Globally:

```js
export default { loading: false }
```

Per page:

```vue
<script>
export default {
  loading: false
}
</script>
```

---

## ⚡ **Programmatic Control**

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

---

## 🔄 **Continuous Progress Bar**

If loading exceeds duration, the bar animates from 0 → 100 repeatedly:

```js
export default {
  loading: { continuous: true }
}
```

---

## 🛠️ **Custom Loading Component**

Create your own loader component (`components/LoadingBar.vue`):

```vue
<template>
  <div v-if="loading" class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({ loading: false }),
  methods: {
    start() { this.loading = true },
    finish() { this.loading = false }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
}
</style>
```

Tell Nuxt to use it:

```js
export default { loading: '~/components/LoadingBar.vue' }
```

**Optional methods your component can implement:**

* `fail(error)` — called if route fails
* `increase(num)` — during loading, `num` < 100

---

## 🌐 **SPA Mode Loading Spinner**

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

> You can also create a **custom HTML template** for the spinner.

---

If you want, I can make a **visual cheat sheet showing all loading options, built-in indicators, and how to switch between default, programmatic, and custom loaders**. This makes it super easy to reference.

Do you want me to create that?



Here’s a clear summary of **Nuxt built-in components** and how to use them effectively:

---

## **1. `<Nuxt>` Component**

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

---

## **2. `<NuxtChild>` Component**

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

---

## **3. `<NuxtLink>` Component**

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

---

## **4. `<client-only>` Component**

* Renders content **only on the client side** (useful for components that rely on `window`, `document`, or third-party libraries).

```vue
<client-only placeholder="Loading...">
  <comments />
</client-only>
```

* With slot placeholder:

```vue
<client-only>
  <comments />
  <template #placeholder>
    <comments-placeholder />
  </template>
</client-only>
```

**Note:** Nuxt < v2.9.0 uses `<no-ssr>` instead of `<client-only>`.

---

### ✅ **Key Takeaways**

1. Use `<Nuxt>` for page rendering inside layouts.
2. Use `<NuxtChild>` for nested routes.
3. Use `<NuxtLink>` for **internal navigation** with prefetching control.
4. Use `<client-only>` for components that **cannot render on server-side**.
5. Both `<Nuxt>` and `<NuxtChild>` support `keep-alive` to cache pages.

---

If you want, I can make a **visual cheat sheet showing `<Nuxt>`, `<NuxtChild>`, `<NuxtLink>`, and `<client-only>` usage** with props, keep-alive, and prefetch options. This makes it super quick to reference.

Do you want me to make that?






Here’s a structured overview of **Nuxt component auto-import and usage**, based on your notes:

---

## **1. Enabling Auto-Discovery**

Starting from Nuxt v2.13, components can be automatically imported when used in templates.

```js
// nuxt.config.js
export default {
  components: true
}
```

* Once enabled, any component inside `components/` is globally available without explicit imports.

---

## **2. Using Components**

Example project structure:

```
components/
 ├─ TheHeader.vue
 └─ TheFooter.vue
```

You can use them directly in layouts or pages:

```vue
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>
```

---

## **3. Component Names**

* For nested directories, Nuxt generates **PascalCase names** based on the file path:

```
components/
 └─ base/
     └─ foo/
         └─ Button.vue
```

Component name: `<BaseFooButton />`

> **Tip:** Rename file to match component name for clarity: `BaseFooButton.vue`.

* **Custom directory configuration**:

```js
components: {
  dirs: [
    '~/components',
    '~/components/base'
  ]
}
```

Now, `components/base/foo/Button.vue` can be used as `<FooButton />`.

---

## **4. Dynamic (Lazy) Imports**

* Prefix the component with `Lazy` to lazy-load it.
* Useful to optimize bundle size for components not always needed.

```vue
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <LazyTheFooter />
  </div>
</template>
```

Example with conditional rendering:

```vue
<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
```

* The component is only loaded when `show` becomes `true`.

---

## **✅ Best Practices**

1. Keep file names consistent with component names.
2. Use `Lazy` prefix for rarely used components to improve performance.
3. Configure `dirs` in `nuxt.config.js` if you want simpler component names for nested directories.
4. Follow the [Vue Style Guide](https://vuejs.org/style-guide/) for naming conventions.

---

If you want, I can create a **visual cheat sheet of Nuxt components** including auto-imported, lazy-loaded, and nested naming rules. It makes it much easier to reference while coding.

Do you want me to do that?



Here’s a structured summary of **Nuxt’s build directory and `.nuxt` folder**:

---

## **1. The `.nuxt` Directory**

* **Purpose:** It’s the **build directory** generated automatically by Nuxt.
* **When it’s created:** Running `nuxt dev` or `nuxt build`.
* **Visibility:** Hidden by default (`.` prefix) and should **not be committed** to version control. Add to `.gitignore`.
* **Use case:** Useful for **debugging** generated files, e.g., routes or components.

---

## **2. Changing the Build Directory**

By default, the build directory is `.nuxt`. You can change it with the `buildDir` property in `nuxt.config.js`:

```js
export default {
  buildDir: 'nuxt-dist' // new directory name
}
```

> Remember to add the new directory to `.gitignore`.

---

## **3. Important Files & Folders inside `.nuxt`**

| File/Folder                | Description                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `router.js`                | Generated router file based on your `pages/` folder; useful for debugging routes.   |
| `router.scrollBehavior.js` | Handles your router’s scroll behavior.                                              |
| `components/`              | Nuxt components like `<NuxtChild>`, `<NuxtLink>`, `nuxt-loading`, and `nuxt-error`. |
| `mixins/`                  | Files required for `$fetch` method.                                                 |
| `views/`                   | App template and server error pages.                                                |
| `app.js`                   | Main application file.                                                              |
| `client.js`                | Client-side entry point.                                                            |
| `empty`                    | Intentionally empty, used for no-op aliases.                                        |
| `index.js`                 | Bootstraps the application.                                                         |
| `loading.html`             | Default page displayed while loading.                                               |
| `middleware/`              | Your middleware files.                                                              |
| `server.js`                | Server-side code for SSR.                                                           |
| `utilities/`               | Nuxt internal utilities.                                                            |

---

## **4. Deployment Notes**

* **SSR apps:** `.nuxt` is required to deploy.
* **Static apps:** Only `dist/` is needed; `.nuxt` is not required.

---

If you want, I can also make a **visual tree diagram of the `.nuxt` folder** showing all main files and their purpose—it’s easier to remember for debugging and deployment.

Do you want me to create that?


Here’s a **visual tree of the `.nuxt` folder** with key files and folders annotated for purpose:

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

### ✅ Key Notes:

* **Dynamic & auto-generated:** Re-running `nuxt dev` or `nuxt build` will regenerate everything.
* **Do not commit** to Git; always add to `.gitignore`.
* **Required for SSR deployment**; optional for static deployment (`dist/` is enough).

---

If you want, I can also make a **diagram showing the difference between `.nuxt` and `dist/`** for SSR vs static deployment—it’s a nice visual for understanding deployment needs. Do you want me to do that?


Here’s a concise breakdown of the **Nuxt `assets/` directory** and how to use it effectively:

---

### **Purpose**

* Contains **uncompiled assets**: images, fonts, Sass/SCSS/Stylus files.
* Unlike `static/`, assets in `assets/` are processed by **Webpack** (with `file-loader` and `url-loader`), allowing imports, hashes, and optimizations.

---

### **Using Images**

* **In Vue templates**: Use the `~` alias for the source directory.

```vue
<template>
  <img src="~/assets/your_image.png" />
</template>
```

* **In CSS/SCSS**: Use `~assets` (no leading slash).

```css
background: url('~assets/banner.svg');
```

* **Dynamic images**:

```vue
<img :src="require(`~/assets/img/${image}.jpg`)" />
```

* **Webpack behavior**:

  * Files ≤ 1 kB → inlined as Base64 via `url-loader`.
  * Files > 1 kB → copied to `.nuxt` with hashed names for caching.

---

### **Styles**

* Add global CSS/SCSS in `nuxt.config.js`:

```js
export default {
  css: [
    'bulma',
    '~/assets/css/main.css',
    '~/assets/css/main.scss'
  ]
}
```

* **Sass setup**:

```bash
yarn add --dev sass sass-loader@10
```

---

### **Fonts**

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

---

### **Aliases**

* `~` → source directory (`srcDir`)
* `~~` → project root (`rootDir`)
* `@` → still supported but may fail in CSS background URLs.

Example:

```vue
<img src="~/assets/logo.png" />
<img src="@@/assets/logo.png" /> <!-- rootDir alias -->
```

---

### **Webpack Loaders**

Default configuration for `assets/`:

```js
{
  test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
  use: [{
    loader: 'url-loader',
    options: { esModule: false, limit: 1000, name: 'img/[name].[contenthash:7].[ext]' }
  }]
},
{
  test: /\.(woff2?|eot|ttf|otf)$/i,
  use: [{
    loader: 'url-loader',
    options: { esModule: false, limit: 1000, name: 'fonts/[name].[contenthash:7].[ext]' }
  }]
},
{
  test: /\.(webm|mp4|ogv)$/i,
  use: [{
    loader: 'file-loader',
    options: { esModule: false, name: 'videos/[name].[contenthash:7].[ext]' }
  }]
}
```

* Small files → inlined as Base64
* Large files → copied with hashed filenames for caching.

---

If you want, I can make a **quick diagram showing `assets/` vs `static/` in Nuxt**, highlighting when to use which folder—it’s a common point of confusion. Do you want me to do that?



Here’s a structured breakdown of **Nuxt’s `components/` directory** and how it works:

---

### **Purpose**

* Holds **Vue components** that make up your pages, layouts, and other components.
* Components are **reusable** and can be organized in nested folders.
* Components are typically imported into pages or layouts, but Nuxt can auto-import them (see below).

---

### **Fetching Data in Components**

* Use `fetch()` inside a component to fetch asynchronous data from APIs.
* `$fetchState` can be used to track the **loading** or **error** state.

**Example: `components/MountainsList.vue`**

```vue
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

---

### **Components Auto-Discovery**

* **Starting v2.13**, Nuxt can **auto-import components** from `~/components`.
* Enable in `nuxt.config.js`:

```js
export default {
  components: true
}
```

* Example usage without import:

```vue
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>
```

---

### **Dynamic Imports (Lazy Loading)**

* Prefix the component name with `Lazy` to **lazy-load** it.
* Useful for optimizing bundle size or loading components only on-demand.

**Example:**

```vue
<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>

<script>
export default {
  data() {
    return { show: false }
  }
}
</script>
```

---

### **Nested Directories**

* Component name is derived from **directory path + filename**.

```text
components/
  base/
    foo/
      CustomButton.vue
```

* Default name: `<BaseFooCustomButton />`

* To **keep a simpler name** like `<CustomButton />`, configure in `nuxt.config.js`:

```js
components: {
  dirs: [
    '~/components',
    '~/components/base/foo'
  ]
}
```

* Then you can use it directly:

```vue
<CustomButton />
```

---

✅ **Tips**

1. Keep component **file names aligned with their usage** for clarity.
2. Use **Lazy prefix** to improve performance on large apps.
3. Use **nested directories** for organization, but control the final component name in `nuxt.config.js`.
4. Use `fetch()` in components for **local data fetching**, especially when the component is reused in multiple pages.

---

If you want, I can make a **diagram showing the `components/` structure with auto-import and lazy loading** to make it visually clear how components are named and used. Do you want me to do that?




Here’s a structured breakdown of the **Nuxt `layouts/` directory** and how it works:

---

## **Purpose of Layouts**

* Layouts help you define the **overall structure and look** of your app.
* Examples: headers, footers, sidebars, or distinct layouts for **desktop vs mobile**.
* Cannot rename the `layouts` directory without extra configuration.

---

## **Default Layout**

* The `layouts/default.vue` file is automatically used for all pages that **don’t specify a custom layout**.
* **Important:** You must include `<Nuxt />` in your layout to render the page component.

**Minimal default layout:**

```vue
<!-- layouts/default.vue -->
<template>
  <Nuxt />
</template>
```

**With additional components:**

```vue
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>
```

* If you have **auto-imported components** (`components: true`), no `import` statements are needed.

---

## **Custom Layouts**

* Any top-level file in `layouts/` creates a **custom layout**.
* Example: creating a blog layout:

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

---

## **Error Page**

* Special layout for handling errors (404, 500, etc.).
* Placed in `layouts/error.vue` but behaves like a **page component**.
* **Do not include `<Nuxt />`** inside it.

**Example:**

```vue
<!-- layouts/error.vue -->
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // Optional: assign a custom layout for error page
}
</script>
```

* The error page can use **any layout** like `blog` or `default` as needed.

---

### ✅ **Key Points**

1. **Default layout** is `layouts/default.vue` for all unspecified pages.
2. **Custom layouts** can be added as separate `.vue` files in `layouts/`.
3. Always include `<Nuxt />` in **regular layouts** to render pages.
4. **Error layout** is special; it does **not** need `<Nuxt />`.
5. Auto-imported components can be used freely inside layouts.

---

If you want, I can create a **diagram showing how layouts, pages, and `<Nuxt />` work together** so it’s visually easy to understand.

Do you want me to make that diagram?



Here’s a clear breakdown of the **Nuxt `middleware/` directory** and how it works:

---

## **Purpose of Middleware**

* Middleware in Nuxt allows you to **run custom code before rendering a page or layout**.
* Common use cases: authentication checks, analytics tracking, user-agent detection, etc.
* Middleware can be **shared** (for multiple pages/layouts) or **page-specific**.

---

## **Middleware Directory**

* The `middleware/` directory is where you place **shared middleware**.
* The **filename** becomes the **middleware name**.

  * Example: `middleware/auth.js` → middleware named `auth`.
* Middleware receives the **context object** as its first argument.

**Example: adding user agent to context**

```js
// middleware/user-agent.js
export default function (context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

---

## **Execution Order**

Middleware is executed **in series** in the following order:

1. `nuxt.config.js` (router middleware)
2. Matched layouts
3. Matched pages
4. Router middleware

* **Universal mode**: runs once on the server-side (first request) and on the client for subsequent navigations.
* **ssr: false**: runs only on the client-side for both initial load and navigations.

---

## **Asynchronous Middleware**

Middleware can be **async**:

```js
// middleware/stats.js
import http from 'http'

export default async function ({ route }) {
  await http.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```

* Can also return a Promise.

---

## **Applying Middleware**

### **Globally**

* Use `router.middleware` in `nuxt.config.js`:

```js
// nuxt.config.js
export default {
  router: {
    middleware: 'stats' // runs on every route
  }
}
```

---

### **Layout or Page-Specific**

* Use the `middleware` property in the layout or page component:

```js
// pages/index.vue or layouts/default.vue
export default {
  middleware: ['auth', 'stats']
}
```

---

### **Named Middleware**

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

---

### **Anonymous Middleware**

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

---

### ✅ **Key Points**

1. **Shared middleware:** place in `middleware/` directory, named by file.
2. **Anonymous middleware:** define inline in a page or layout.
3. **Execution order:** global → layout → page → router.
4. Middleware can be **synchronous or asynchronous**.
5. Apply middleware **globally, per layout, or per page**.

---

If you want, I can also make a **diagram showing the middleware flow** in Nuxt, from server request → layout → page → client navigation. It makes the order super clear.

Do you want me to do that?


Here’s a structured breakdown of the **Nuxt `modules/` directory and module system**:

---

## **Purpose of Modules**

* Nuxt modules are **functions that extend Nuxt’s core functionality**.
* They are executed sequentially when Nuxt boots, allowing you to:

  * Customize webpack config.
  * Register plugins.
  * Add CSS libraries.
  * Register hooks for lifecycle events.
  * Extend templates.
  * Add server middleware.
* Modules can be **shared across projects** and packaged as **npm modules**.

---

## **Using Modules**

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

---

## **Module Options**

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

2. **this.options**

   * Access top-level Nuxt options, merged with defaults.
   * Useful for sharing options between modules.

```js
const options = Object.assign({}, this.options.axios, moduleOptions)
```

---

## **Adding Plugins**

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

---

## **Registering Webpack Loaders**

* Use `this.extendBuild` to add custom loaders:

```js
this.extendBuild((config, { isClient, isServer }) => {
  config.module.rules.push({
    test: /\.foo$/,
    use: ['foo-loader']
  })
})
```

---

## **Nuxt Hooks**

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

---

I can also make a **visual diagram showing how Nuxt loads modules, hooks, and plugins sequentially** if you want a clear picture of the flow.

Do you want me to do that?


Here’s a clear breakdown of the **Nuxt `pages/` directory** and its features:

---

## **Purpose of `pages/`**

* Contains your **Application Views and Routes**.
* Nuxt **automatically generates the router** based on the `.vue` files inside `pages/`.
* Can also include `.js` or `.ts` files for routes.
* Each page is a Vue component but with additional **Nuxt-specific features**.

---

## **Basic Page**

```vue
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  data() {
    return { name: 'Nuxt' }
  }
}
</script>

<style>
.red { color: red; }
</style>
```

---

## **Dynamic Pages**

* Use an **underscore** `_` prefix in the filename or folder to create dynamic routes.
* The values are accessed via `context.params`.

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

---

## **Page Properties**

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

---

## **Watch Query Examples**

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

---

## **Ignoring Pages**

* Prefix the filename with `-` to **exclude** it from routing:

```
pages/-about.vue   // Ignored
```

---

## **Renaming `pages/` Directory**

```js
// nuxt.config.js
export default {
  dir: {
    pages: 'routes' // Use `routes/` instead of `pages/`
  }
}
```

---

✅ **Summary**

* `pages/` is central to Nuxt routing.
* Supports **dynamic routes**, **async data fetching**, **custom layouts**, **middleware**, and more.
* Auto-generates router based on file structure.
* Can be **renamed or partially ignored** if needed.

---

I can also create a **visual file tree showing how dynamic pages map to routes** if you want, which helps in understanding nested and dynamic routing.

Do you want me to make that?


Perfect! Here's a **visual file tree with routes** for a Nuxt `pages/` directory, including dynamic and nested pages:

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

### **Explanation**

1. **Static pages**:

   * `index.vue` → `/`
   * `about.vue` → `/about`

2. **Ignored pages**:

   * Prefix `-` (like `-draft.vue`) → not included in router.

3. **Dynamic pages**:

   * `_slug.vue` → `/something` (`params.slug = "something"`)
   * Nested dynamic `_book/_slug.vue` → `/mybook/mypage` (`params.book = "mybook"`, `params.slug = "mypage"`)

4. **Nested directories**:

   * Subfolders automatically become nested routes.
   * Example: `blog/categories/_category.vue` → `/blog/categories/:category`

5. **Mix of static & dynamic routes**:

   * Example: `admin/_section.vue` → `/admin/settings` would match `/admin/settings` (dynamic).

---

If you want, I can **draw a route map diagram** showing **URLs → component mapping**, which visually represents both static and dynamic routes. This is great for understanding complex nested pages.

Do you want me to create that diagram?


Here’s a concise summary of the **Nuxt `plugins/` directory** and how it works, organized for clarity:

---

## **Purpose**

The `plugins/` directory contains JavaScript files that run **before instantiating the root Vue.js application**.

* Typically used to:

  * Register Vue plugins (`Vue.use()`)
  * Inject functions, constants, or services into the app context
  * Configure third-party libraries (like Axios)

---

## **Basic Plugin Usage**

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

---

## **Client or Server Only**

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

---

## **Inject into Vue, Context, & Store**

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

---

## **ES6 & External Packages**

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

---

## **Global Mixins**

* Only register once to avoid memory leaks:

```js
// plugins/my-mixin-plugin.js
import Vue from 'vue'

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({ /* mixin content */ })
}
```

---

## **Extend Plugins / Plugin Order**

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

---

### ✅ Key Takeaways

1. Plugins are **pre-initialization scripts** for Vue and Nuxt.
2. Use **inject()** for services accessible in components, store, and context.
3. File suffix `.client.js` / `.server.js` or `mode` option controls environment.
4. Avoid directly modifying `Vue.prototype` or using `Vue.use()` inside inject functions to prevent memory leaks.
5. Plugins can configure **external libraries, global mixins, and app-level behaviors**.

---

If you want, I can make a **diagram showing how plugins interact with Vue, Nuxt context, and Vuex store**, which visually explains `$hello`, client/server-only, and global injection.

Do you want me to make that diagram?


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
                │  Vuex Store    │
                │  (actions can  │
                │   access $hello)│
                └───────────────┘

Legend:
- inject('hello', fn) => $hello
- Plugins can be client-only (.client.js), server-only (.server.js), or universal.
- Global mixins are applied to Vue instance (components) with a flag to avoid memory leaks.
```

### **Flow Explanation**

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

---

If you want, I can also make a **visual diagram showing a page component accessing `$hello` in asyncData, mounted, and Vuex actions**. It will clearly show server vs client flow.

Do you want me to create that one too?


Here’s a clear summary of the **Nuxt `static/` directory** and how it differs from `assets/`:

---

### **Purpose**

* `static/` contains **files that won’t be processed by Webpack** and are served directly by the server.
* Files are **mapped directly to the root URL**.

  * `/static/robots.txt` → `http://localhost:3000/robots.txt`
  * `/static/favicon.ico` → `http://localhost:3000/favicon.ico`

---

### **Use Cases**

* Robots.txt, sitemap.xml, CNAME, manifest files.
* Images or assets that **don’t require processing** (no compilation, no hashing).

---

### **Referencing Static Files**

* Use paths relative to the root (`/`) for static files:

```html
<!-- Static image -->
<img src="/my-image.png" />

<!-- Webpack-processed image from assets directory -->
<img src="~/assets/my-image-2.png" />
```

> Note: `assets/` files are processed by Webpack and can use features like SCSS, PostCSS, or image optimization.

---

### **Router Base Consideration**

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

---

### **Key Differences: `assets/` vs `static/`**

| Feature            | `assets/`                    | `static/`                      |
| ------------------ | ---------------------------- | ------------------------------ |
| Webpack processing | ✅ Yes (CSS, JS, images)      | ❌ No                           |
| URL reference      | `~/assets/...`               | `/file-name`                   |
| File changes       | Triggers rebuild             | Served directly without build  |
| Use case           | Styles, JS, processed images | Static files, public resources |

---

If you want, I can make a **visual diagram showing the difference between `assets/` and `static/`**, including how they are accessed in pages/components.

Do you want me to do that?



Here’s a concise breakdown of the **Nuxt `store/` directory** and how it integrates Vuex into your application:

---

## **Purpose**

* `store/` contains **Vuex store files**.
* Vuex is **disabled by default** in Nuxt; creating any file inside `store/` (like `index.js`) automatically enables it.
* Cannot rename the directory without extra configuration.

---

## **Activating Vuex Store**

* Nuxt automatically:

  1. Imports Vuex.
  2. Adds the `store` option to the root Vue instance.
* Every `.js` file in `store/` becomes a **namespaced module** (except `index.js` which is the root module).

---

## **Basic Module Structure**

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

---

## **Top-Level Splitting (Optional)**

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

---

## **Plugins in Store**

* Add Vuex plugins in `store/index.js`:

```js
import myPlugin from 'myPlugin'
export const plugins = [myPlugin]
```

---

## **`nuxtServerInit` Action**

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

---

## **Vuex Strict Mode**

* Enabled in dev mode by default.
* Disable in dev mode:

```js
export const strict = false
```

---

## **Folder Structure Example**

```
store/
-- index.js
-- ui.js
-- shop/
---- cart/
------ actions.js
------ getters.js
------ mutations.js
------ state.js
---- products/
------ mutations.js
------ state.js
------ itemsGroup1/
-------- state.js
```

---

If you want, I can make a **diagram showing the relationship between `store/index.js`, modules, and how components access state/mutations/actions**. This helps visualize Nuxt’s store system.

Do you want me to make that diagram?


Perfect! Here’s a visual representation of how Nuxt’s **Vuex store structure** works and how components interact with it:

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

Component Usage:
----------------
pages/todos.vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.text">
      <input :checked="todo.done" @change="toggle(todo)">
      <span>{{ todo.text }}</span>
    </li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos() {
      return this.$store.state.todos.list   // Access module state
    }
  },
  methods: {
    ...mapMutations('todos', ['toggle']),  // Map module mutations
  }
}
</script>

Data Flow Overview:
------------------
[Component] --calls--> [Mutation/Action] --updates--> [State] --reactively updates--> [Component]
```

**Key Points Highlighted in the Diagram:**

1. **Root module (`index.js`)** holds global state.
2. **Modules (`todos.js`, `shop/cart/`)** are namespaced automatically.
3. Components access **state** via `this.$store.state.moduleName`.
4. Components trigger **mutations** via `this.$store.commit('moduleName/mutation')`.
5. **Actions** can dispatch async operations, including server-side operations (`nuxtServerInit`).

---

If you want, I can make a **color-coded flowchart showing root vs module vs component interactions**, which makes the state flow very clear at a glance.

Do you want me to make that flowchart?



Here’s a **structured breakdown of Nuxt’s `nuxt.config.js` file** and its options for quick reference:

---

## **1. Aliases**

Define shortcuts for paths in JS and CSS.

```js
import { resolve } from 'path'

export default {
  alias: {
    'style': resolve(__dirname, './assets/style')
  }
}
```

---

## **2. Build Configuration**

Customize webpack, loaders, filenames, transpilation.

```js
export default {
  build: {
    extend(config, ctx) {
      // Custom webpack config here
    }
  }
}
```

---

## **3. Global CSS**

Include CSS/Sass/Less files globally.

```js
export default {
  css: ['~/assets/css/main', '~/assets/css/animations']
}
```

---

## **4. Development Mode**

Set dev or production mode.

```js
export default {
  dev: process.env.NODE_ENV !== 'production'
}
```

---

## **5. Environment Variables**

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

---

## **6. Generate**

Static generation options for dynamic routes.

```js
export default {
  generate: {
    dir: 'gh_pages',
    subFolders: false
  }
}
```

---

## **7. Head / Meta Tags**

Set default meta tags globally.

```js
export default {
  head: {
    title: 'My Title',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
  }
}
```

---

## **8. Loading Component**

Customize loading indicator.

```js
export default {
  loading: {
    color: '#fff'
  }
}
```

---

## **9. Modules**

Add Nuxt modules (runtime or buildModules).

```js
export default {
  modules: ['@nuxtjs/axios'],
  buildModules: ['@nuxtjs/eslint-module'] // Dev only
}
```

---

## **10. Plugins**

Add JS or Vue plugins to run before app initialization.

```js
export default {
  plugins: [
    '~/plugins/vue-tooltip.js',
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }
  ]
}
```

---

## **11. Router Configuration**

Override Vue Router defaults.

```js
export default {
  router: {
    linkExactActiveClass: 'text-primary'
  }
}
```

---

## **12. Server Options**

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

---

## **13. Source Directory**

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

---

## **14. Directory Renaming**

Rename default Nuxt directories.

```js
export default {
  dir: {
    pages: 'views' // Pages now in views/
  }
}
```

---

## **15. Page Transition**

Set default page transition globally.

```js
export default {
  pageTransition: 'page'
}
```

---

## **16. Other Configuration Files**

* `.eslintrc`, `prettier.config.json` for code linting/formatting
* `.gitignore`:

```
node_modules
.nuxt
dist
```

---

If you want, I can make a **one-page visual map of `nuxt.config.js` options**, showing how all of these sections relate to **runtime, build, server, and client**—it’s super handy for quick reference.

Do you want me to make that?


Here’s a clear breakdown of the **`alias` property in Nuxt** and how to use it effectively:

---

## **1. What is `alias`?**

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

---

## **2. Custom Aliases**

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

---

## **3. Using Aliases**

### **In JavaScript / Vue `<script>`**

```js
import testData from 'data/test.json'
console.log(testData)
```

* You **don’t need `~`** here; just use the alias directly.

---

### **In Templates / CSS / SCSS / Webpack contexts**

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

---

## **4. Key Notes**

1. Aliases work for both **JavaScript imports** and **CSS/Webpack assets**.
2. Use `~` **only for Webpack paths**, not for JS imports.
3. Aliases improve **readability** and **reduce relative path hell** (like `../../../assets/...`).

---

If you want, I can make a **small diagram showing alias usage in JS vs CSS/templates**—it’s a super handy visual reference.

Do you want me to do that?


Here’s a concise guide to the **`components` property in Nuxt** and how it works:

---

## **1. What is the `components` property?**

* Introduced in **Nuxt 2.13+** (can be backported to 2.10–2.12 with `@nuxt/components` module).
* **Automatically imports Vue components** when they are used in pages, layouts, or other components.
* Saves you from manually importing components in every file.

```js
// nuxt.config.js
export default {
  components: true  // auto-import from ~/components
}
```

---

## **2. Customizing Auto-Discovery**

You can specify directories and options:

```js
export default {
  components: [
    '~/components',                         // default
    { path: '~/components/other', extensions: ['vue'] }
  ]
}
```

### **Options for each directory**

| Option       | Type    | Default                        | Description                                          |
| ------------ | ------- | ------------------------------ | ---------------------------------------------------- |
| `path`       | String  | -                              | Directory path to scan for components                |
| `extensions` | Array   | ['vue', 'js']                  | File types to scan                                   |
| `pattern`    | String  | `**/*.${extensions.join(',')}` | Glob pattern for matching files                      |
| `ignore`     | Array   | []                             | Glob patterns to exclude files                       |
| `prefix`     | String  | ''                             | Prefix for component names                           |
| `pathPrefix` | Boolean | true                           | Include path segments in component name              |
| `watch`      | Boolean | true                           | Watch for file additions/deletions                   |
| `transpile`  | Boolean | 'auto'                         | Whether to transpile files                           |
| `level`      | Number  | 0                              | Allows overwriting components from other directories |

---

## **3. Example: Using Prefix**

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

---

## **4. Overwriting Components with `level`**

* Useful when you want local components to override library/theme components.

Example:

```js
components: [
  '~/components', // level 0
  { path: 'node_modules/my-theme/components', level: 1 } // library
]
```

* `~/components/Header.vue` will overwrite `my-theme/components/Header.vue`.

---

## **5. Library Authors**

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

---

## **6. Key Benefits**

1. **No manual imports** needed.
2. **Automatic tree-shaking** – only used components are bundled.
3. **Supports HMR** – updates are reflected immediately.
4. **Prefixing & levels** make it easy to manage local overrides or library integrations.

---

If you want, I can create a **visual flow diagram showing how Nuxt auto-imports components** with directories, prefixes, and levels—it makes this system much easier to grasp.

Do you want me to do that?


✅ Perfect summary — you’ve captured the key idea of Nuxt’s **`env` property** exactly right.

Here’s a concise explanation with some deeper insight (especially for Nuxt 2.12+):

---

## 🌍 What `env` Does (Nuxt 2)

The `env` property in `nuxt.config.js` allows you to **expose certain environment variables to the client-side** (browser).
Normally, `process.env` values are available only on the **server**, but Nuxt injects these defined variables into the **client bundle** at **build time**.

---

### 🧩 Example

```js
export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
```

This means:

* If you have `BASE_URL` in your system (or `.env` file), it’ll use that.
* Otherwise, it falls back to `'http://localhost:3000'`.
* Nuxt will **compile** your code so that any `process.env.baseUrl` becomes that value.

---

### 🪄 Accessing it

You can use the value anywhere:

**1. Inside your app code**

```js
console.log(process.env.baseUrl)
```

**2. Inside Nuxt context**

```js
export default ({ env }) => {
  console.log(env.baseUrl)
}
```

---

### ⚙️ Example — Axios plugin

```js
// plugins/axios.js
import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl
})
```

Then import it:

```js
import axios from '~/plugins/axios'
```

---

## 🚀 NUXT_ENV_ Prefix (Automatic Injection)

If you define variables like this during build:

```bash
NUXT_ENV_API_URL=https://api.example.com nuxt build
```

Then in your app:

```js
process.env.NUXT_ENV_API_URL // → 'https://api.example.com'
```

Nuxt automatically exposes those without needing to define them in `nuxt.config.js`.

---

## ⚠️ Important Notes

### 1. `process.env == {}`

You’ll often see this:

```js
console.log(process.env) // {}
```

That’s expected!
Nuxt replaces only **known variables** during Webpack build.
So `process.env.baseUrl` works, but `process.env` as a whole is empty because there’s no real Node process at runtime on the client.

---

### 2. ServerMiddleware Limitation

Anything in `serverMiddleware` runs **outside of the Nuxt build**, so it doesn’t get access to the `env` variables from `nuxt.config.js`.
There, you must use:

```js
process.env.MY_ENV_VAR // directly from Node environment
```

---

## 💡 For Nuxt 2.12+ and later

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

---

Would you like me to show a **migration example** of converting your existing `env`-based config to `runtimeConfig` (for Nuxt ≥2.12)? It’s a best practice now.



✅ **Summary of the `loading` Property in Nuxt 2**

---

### 🔹 **Purpose**

`loading` controls Nuxt’s built-in **route transition progress bar** — the thin line that appears at the top when navigating between pages.
You can:

* Disable it completely,
* Customize its appearance, or
* Replace it with a **custom Vue component**.

---

### 🔹 **Type**

```js
Type: Boolean | Object | String
```

---

## ⚙️ 1. Disable the Progress Bar

If you don’t want any loading indicator during route navigation:

```js
export default {
  loading: false
}
```

---

## 🎨 2. Customize the Default Progress Bar

You can modify the color, height, animation duration, etc.

```js
export default {
  loading: {
    color: 'blue',
    failedColor: 'red',
    height: '5px',
    throttle: 200,
    duration: 5000,
    continuous: false,
    css: true,
    rtl: false
  }
}
```

### 🧩 Available Options

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

---

## 🧱 3. Using a Custom Loading Component

If you want to show your **own loader UI**, define a component and expose specific methods.

### `components/loading.vue`

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

---

## ⚡ 4. Programmatically Control the Loader

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

---

## ✅ **Summary Table**

| Goal                        | Configuration                               |
| --------------------------- | ------------------------------------------- |
| Disable progress bar        | `loading: false`                            |
| Customize bar color/height  | `loading: { color: 'blue', height: '4px' }` |
| Add full-page custom loader | `loading: '~/components/loading.vue'`       |
| Trigger manually in code    | `this.$nuxt.$loading.start()` / `finish()`  |

---

Would you like me to show how to **combine a page-level loading indicator with Nuxt’s global loader** (e.g., show both progress bar + full-screen loader during slow API calls)?



✅ **Nuxt 2 — `router` Property (Full Overview)**

The `router` property in `nuxt.config.js` allows you to **customize Nuxt’s internal Vue Router** behavior — including paths, modes, navigation classes, middleware, and advanced routing features.

---

## 🧭 **1. base**

**Type:** `String`
**Default:** `'/'`
Defines the **base URL** where your app is served.

```js
export default {
  router: {
    base: '/app/'
  }
}
```

➡️ If your Nuxt app is hosted under `/app/`, all routes will automatically include that prefix.
Also adds `<base href="/app/">` to the HTML.

---

## 🔤 **2. routeNameSplitter**

**Type:** `String`
**Default:** `'-'`
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

---

## 🧩 **3. extendRoutes**

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

---

## 🧱 **4. fallback**

**Type:** `Boolean`
**Default:** `false`

If `true`, router falls back to **hash mode** when `history.pushState` isn’t supported (like in IE9).
If `false`, navigation causes full page reloads in unsupported browsers.

---

## 🟦 **5. linkActiveClass**

**Type:** `String`
**Default:** `'nuxt-link-active'`
Set the global class for active `<nuxt-link>` items.

```js
export default {
  router: {
    linkActiveClass: 'active-link'
  }
}
```

---

## 🟩 **6. linkExactActiveClass**

**Type:** `String`
**Default:** `'nuxt-link-exact-active'`
Class for links that exactly match the current route.

```js
export default {
  router: {
    linkExactActiveClass: 'exact-active-link'
  }
}
```

---

## 🟨 **7. linkPrefetchedClass**

**Type:** `String | false`
**Default:** `false`
Sets a custom CSS class for prefetched links.

```js
export default {
  router: {
    linkPrefetchedClass: 'nuxt-link-prefetched'
  }
}
```

---

## 🧠 **8. middleware**

**Type:** `String` or `Array<String>`
Set global middleware for **all routes**.

```js
export default {
  router: {
    middleware: 'user-agent'
  }
}
```

**middleware/user-agent.js**

```js
export default function (context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

---

## ⚙️ **9. mode**

**Type:** `String`
**Default:** `'history'`
Switch between router modes.

> ⚠️ Changing this is not recommended in SSR apps.

```js
export default {
  router: {
    mode: 'hash'
  }
}
```

---

## 🧩 **10. parseQuery / stringifyQuery**

**Type:** `Function`
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

---

## ⚡ **11. prefetchLinks**

**Type:** `Boolean`
**Default:** `true`
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

---

## ⚡ **12. prefetchPayloads**

**Type:** `Boolean`
**Default:** `true`
(Only for `target: 'static'`)

When generating static pages, Nuxt prefetches the **payload.js** for faster transitions.

```js
export default {
  router: {
    prefetchPayloads: false
  }
}
```

---

## 📜 **13. scrollBehavior**

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

---

## 🔚 **14. trailingSlash**

**Type:** `Boolean | undefined`
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

---

## 🧾 **Summary Table**

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

---

Would you like me to show **an example Nuxt project** where several of these router options (like `base`, `extendRoutes`, `middleware`, and `scrollBehavior`) are all used together in one clean config?


✅ **Nuxt 2 — The `context` Object (Complete Guide)**

The **Nuxt Context** is a powerful object that gives you access to runtime information about your app, route, store, and environment — and it’s available in special Nuxt lifecycle hooks like:

* `asyncData`
* `fetch`
* `plugins`
* `middleware`
* `nuxtServerInit`

> ⚠️ Note: This **context** is *not* the same as the **Vuex action context** — they are different objects.

---

## 🧩 **Basic Example**

```js
export default {
  asyncData(context) {
    const {
      app,
      store,
      route,
      params,
      query,
      env,
      isDev,
      isHMR,
      redirect,
      error,
      $config
    } = context

    // Example usage:
    if (!store.state.user) {
      redirect('/login')
    }

    return { slug: params.slug }
  }
}
```

---

## 🌍 **Universal Keys (available on both client & server)**

### 1. `app`

**Type:** `NuxtAppOptions`
Gives access to the root Vue instance options, including **plugins**.

Example:

```js
context.app.i18n.locale // access i18n locale
context.app.$axios.get('/api/users') // use plugin
```

---

### 2. `store`

**Type:** `Vuex.Store`
Your Vuex store instance (if enabled).

```js
context.store.commit('setUser', user)
```

---

### 3. `route`

**Type:** `VueRouter.Route`
Gives access to the active route.

```js
console.log(context.route.path)
```

---

### 4. `params`

Alias of `context.route.params`
Example:

```js
context.params.id
```

---

### 5. `query`

Alias of `context.route.query`
Example:

```js
context.query.page
```

---

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

---

### 7. `isDev`

**Type:** `Boolean`
Indicates if the app is running in development mode.

```js
if (context.isDev) console.log('Development mode')
```

---

### 8. `isHMR`

**Type:** `Boolean`
True when called from **Hot Module Replacement** (HMR) during development.
Useful to skip server calls during hot reloads.

```js
if (context.isHMR) return
```

---

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

---

### 10. `error`

**Type:** `Function`
Show Nuxt’s error page.

```js
error({ statusCode: 404, message: 'Page not found' })
```

---

### 11. `$config`

**Type:** `Object`
Provides **runtime configuration** (from `publicRuntimeConfig` or `privateRuntimeConfig`).

```js
context.$config.apiBase
```

---

## 🖥️ **Server-Side Only Keys**

### 1. `req`

**Type:** `http.Request`
Node.js request object (depends on framework if used as middleware).

```js
context.req.headers['user-agent']
```

> Not available with `nuxt generate`.

---

### 2. `res`

**Type:** `http.Response`
Node.js response object.

```js
context.res.setHeader('Cache-Control', 'no-store')
```

> Not available with `nuxt generate`.

---

### 3. `beforeNuxtRender(fn)`

**Type:** `Function`
Called before Nuxt serializes the state for client-side hydration.
Lets you mutate the `__NUXT__` global variable.

```js
context.beforeNuxtRender(({ nuxtState }) => {
  nuxtState.customData = { hello: 'world' }
})
```

---

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

---

## 💻 **Client-Side Only Keys**

### 1. `from`

**Type:** `VueRouter.Route`
The previous route (the route navigated from).

```js
context.from.path // e.g. '/home'
```

---

### 2. `nuxtState`

**Type:** `Object`
The hydrated Nuxt state sent from server to client.
Used mainly by plugins that need to access SSR state on client.

```js
console.log(context.nuxtState)
```

---

## 🧠 **Summary Table**

| Key                | Type         | Environment | Description                        |
| ------------------ | ------------ | ----------- | ---------------------------------- |
| `app`              | `Object`     | Universal   | Root Vue app instance with plugins |
| `store`            | `Vuex.Store` | Universal   | Vuex store instance                |
| `route`            | `Route`      | Universal   | Current route                      |
| `params`           | `Object`     | Universal   | Alias for `route.params`           |
| `query`            | `Object`     | Universal   | Alias for `route.query`            |
| `env`              | `Object`     | Universal   | Environment variables              |
| `isDev`            | `Boolean`    | Universal   | Is development mode                |
| `isHMR`            | `Boolean`    | Universal   | Is Hot Module Replacement call     |
| `redirect`         | `Function`   | Universal   | Redirect user                      |
| `error`            | `Function`   | Universal   | Show error page                    |
| `$config`          | `Object`     | Universal   | Runtime config                     |
| `req`              | `Object`     | Server      | Node.js Request                    |
| `res`              | `Object`     | Server      | Node.js Response                   |
| `beforeNuxtRender` | `Function`   | Server      | Modify SSR state before hydration  |
| `beforeSerialize`  | `Function`   | Server      | Sync modification of SSR state     |
| `from`             | `Route`      | Client      | Previous route                     |
| `nuxtState`        | `Object`     | Client      | SSR state before hydration         |

---

Would you like me to show **practical examples** of using context in:

* `middleware`
* `plugin`
* and `asyncData`
  …all together in one mini Nuxt setup (so you can see real-world use cases)?


Exactly! Let me summarize what your snippet shows about **`$nuxt` in Nuxt 2** and how it works:

---

### 1️⃣ Connection Checker

`$nuxt.isOffline` and `$nuxt.isOnline` let you detect the user's internet status.

Example:

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

---

### 2️⃣ Refreshing Page Data

Use `$nuxt.refresh()` to **rerun `asyncData` or `fetch()`** for the current page without reloading.

Example:

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

---

### 3️⃣ Controlling the Loading Bar

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

---

### ⚡ Key Takeaways

* `$nuxt` is **only available on the client-side**.
* Provides access to: **connection status, data refresh, and loading bar**.
* Useful for improving **UX without reloading the page**.

---

If you want, I can make a **compact cheatsheet** of all `$nuxt` helpers and methods for **offline detection, refresh, and loading control** — super handy to keep while coding.

Do you want me to do that?


Exactly! The **`fetch` hook** in Nuxt (>=2.12) is a powerful way to fetch asynchronous data in components, both **server-side** when the route is first rendered and **client-side** when navigating. Here's a structured overview:

---

## 1️⃣ Basic Usage

```vue
<script>
export default {
  data() {
    return {
      posts: []
    }
  },
  async fetch() {
    this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts')
  }
}
</script>
```

* `fetch()` runs automatically on server and client navigation.
* `$fetchState` is available for reactive state tracking:

| Property    | Type          | Description                                                  |
| ----------- | ------------- | ------------------------------------------------------------ |
| `pending`   | Boolean       | True when fetch is running (useful for loading placeholders) |
| `error`     | Error or null | Captures any error during fetching                           |
| `timestamp` | Integer       | Last fetch timestamp (useful for caching or `keep-alive`)    |

---

## 2️⃣ Calling `fetch` Manually

From **template**:

```vue
<button @click="$fetch">Refresh</button>
```

From **methods**:

```js
export default {
  methods: {
    refresh() {
      this.$fetch()
    }
  }
}
```

---

## 3️⃣ Options

* **`fetchOnServer`**: Boolean or Function (default: `true`)
  Decide if fetch should run during server rendering.

  ```js
  fetchOnServer: false // fetch only on client-side
  ```

* **`fetchKey`**: String or Function (Nuxt 2.15+)
  Assigns a unique key for each fetch result; allows multiple components to track fetches separately.

  ```js
  fetchKey: 'site-sidebar'
  fetchKey() { return this.someData + this._uid }
  ```

* **`fetchDelay`**: Integer (default: 200 ms)
  Minimum execution time to prevent quick flashes.

---

## 4️⃣ Accessing Nuxt Context

Inside `fetch`, you can access the full Nuxt context:

```js
async fetch() {
  const { env, route, store } = this.$nuxt.context
  this.posts = await this.$http.$get(`${env.API_URL}/posts`)
}
```

---

## 5️⃣ Key Notes

* `$fetchState.pending` can be used to show loading placeholders.
* `$fetchState.error` can be used to display errors.
* **fetch relies on `fetchKey` internally**—don’t set `inheritAttrs: false` on components using fetch.
* Fetch is **more modern** than `asyncData` for component-level fetching, especially useful for **reusable components** or `keep-alive`.

---

If you want, I can make a **full example combining `$fetch`, `$fetchState`, and client/server fetching with error/loading handling**, so you can use it directly in your Nuxt components.

Do you want me to do that?


Exactly! The **`scrollToTop`** property in Nuxt is a convenient way to control page scroll behavior when navigating between routes, especially **nested or child routes**. Here's a clear breakdown:

---

## 1️⃣ Purpose

* By default, Nuxt **keeps scroll position** for child routes.
* Setting `scrollToTop: true` forces Nuxt to **scroll to the top** when rendering a page.

---

## 2️⃣ Usage Example

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

---

## 3️⃣ Parent Route Control

* You can **disable scrolling to top** on a parent route by setting:

```js
export default {
  scrollToTop: false
}
```

---

## 4️⃣ Advanced Control

* If you want **more control over scrolling**, like smooth scrolling or custom positions, use the **`router.scrollBehavior`** option:

```js
// app/router.scrollBehavior.js
export default function (to, from, savedPosition) {
  if (to.hash) return { selector: to.hash }   // scroll to anchor
  return { x: 0, y: 0 }                       // scroll to top
}
```

---

**Summary:**

* `scrollToTop: true` → always scroll to top on this page.
* `scrollToTop: false` → preserve current scroll position.
* `scrollBehavior` → fully customize scrolling for all routes.

---

I can also make a **small diagram showing how Nuxt handles scroll position with parent/child routes** if you want—it makes it super visual. Do you want me to do that?

Exactly! The **`validate`** method in Nuxt is a **route-level guard for dynamic routes**. It allows you to check whether a route’s parameters are valid **before rendering the page**, both on server-side and client-side navigation. Here’s a detailed breakdown:

---

## 1️⃣ Purpose

* Ensures that a route only renders if certain conditions are met (e.g., valid ID, existing resource).
* If `validate` returns `false` or a rejected promise, Nuxt **renders the error page** (default 404).
* Can be **synchronous** or **asynchronous**.

---

## 2️⃣ Basic Example (Dynamic Route)

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

---

## 3️⃣ Using Store or Context

```js
export default {
  validate({ params, store }) {
    // Check if the category exists in the store
    return store.state.categories.some(category => category.id === params.id)
  }
}
```

* Useful for **server-side validated data** populated via `nuxtServerInit`.

---

## 4️⃣ Async Validation

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

---

## 5️⃣ Throwing Errors

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

---

## 6️⃣ Key Notes

* Only used in **dynamic route components** (e.g., `_id.vue`).
* Runs:

  * **Server-side**: on first request.
  * **Client-side**: on navigation.
* Returns:

  * `true` → render the page
  * `false` → show 404 page

---

If you want, I can make a **flow diagram showing how Nuxt handles `validate` on both server-side and client-side navigation**—it makes it very intuitive. Do you want me to do that?

