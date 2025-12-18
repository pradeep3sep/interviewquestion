> ### What is Rendering

**Rendering means converting your code (templates + data) into actual HTML that can be displayed on the screen.**

When you write UI code like:

```jsx
<h1>Hello {user.name}</h1>
```

This is **not HTML yet**.
"Rendering" is the process that turns this into actual HTML:

```html
<h1>Hello Pradeep</h1>
```

So that the browser can show it.

<br>

### Where Does Rendering Happen?

**1. Server (SSR)**

HTML is generated **before it reaches the browser**.

```
React Component + Data  →  Server →  Final HTML → Browser displays it
```
<br>

**2. Browser (CSR)**

Browser receives JS code and then builds the HTML **inside the browser**.

```
React Component + Data → JavaScript Runs in Browser → HTML gets created on screen
```

<br>

### When you choose SSR:

* The user gets **ready-made HTML**, so the page shows **faster**
* Search engines can read content easily (better SEO)

### When you choose CSR:

* The browser does the work → requires JS to be downloaded first
* Initial load is slower, but *app feels faster after load*

<br>

> ### Rendering strategies:

* **Static Site (SSG)**
* **ISR (Incremental Static Regeneration)**
* **SSR (Server Side Rendering)**
* **CSR (Client Side Rendering)**
* **Hybrid Approaches**

<br>

### 1. Static Website (SSG - Static Site Generation)

**Concept:**
All pages are generated **once at build time**. The output is just plain HTML, CSS, JS.

**Where used?**

* Blogs
* Marketing websites
* Sites where data **does not change frequently** or **SEO is important**

<br>

**Pros:**

| Benefit        | Explanation                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| **Super Fast** | Files are served from CDN edge → no server compute → millisecond load times. |
| **Scalable**   | Serving static files requires minimal infrastructure.                        |
| **Cheap**      | You can deploy on CDN or GitHub Pages with almost zero runtime cost.         |

<br>

**Cons:**

| Issue                                     | Why                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------- |
| **Rebuild on data change**                | If your content changes, you need to rebuild + redeploy.             |
| **Not suitable for highly dynamic pages** | Data that changes per-user (e.g., dashboards) can't be pre-rendered. |

**Example:**
Blog posts fetched at build time using `getStaticProps` (Next.js).\
When you change a blog, you have to redeploy.

<br>

### Examples

Below is the code for the creation of index.html file which serves as main file

```js
// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // this part specific means that we are going to build static webiste having roote as index.html , // ✅ enables static export
  distDir: 'build',
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : undefined,
};

export default nextConfig;
```

<br>

**Example 1: Static website with api calling on server side**

<details>

```js
// in root page.js

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  // Fetch data at build time (static generation)
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-black dark:to-zinc-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl">
            Welcome
          </h1>
        </div>

        {/* Posts Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-zinc-800 p-6 shadow-lg border border-zinc-200 dark:border-zinc-700"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{post.id}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">
                    {post.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

<br>

Note: Here api is called at the build time and in build folder you will get the index.html along with corresponding js and css file. Everytime you reload the page same build html,css and js will be served


![network](https://github.com/user-attachments/assets/e29d4c99-1a6a-498b-aef6-2a9b7be9a4d8)

![waterfall](https://github.com/user-attachments/assets/89f9f6e2-e4de-4b86-ba1f-cd45598b3dd6)

</details>

<br>
<br>

**Example 2: Static website with api calling on client side**

<details>

```js
'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-100">
          Posts from API
        </h1>

        {loading && (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400">Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                  {post.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                  {post.body}
                </p>
                <div className="text-sm text-zinc-500 dark:text-zinc-500">
                  Post ID: {post.id} | User ID: {post.userId}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

<br>

![UI Preview](https://github.com/user-attachments/assets/f03f44e6-04da-4950-b22a-654ca38d3587)

![waterfall](https://github.com/user-attachments/assets/dfc1e9b1-cf00-476a-a438-fd2faa7131df)

</details>

<br>

**Example 3: Static website with static route**

There is nothing new

<br>

**Example 4: Static website with dynamic route**

<details>

Folder structure

```
my-app/
 ├─ app/
 │   ├─ page.js
 │   └─ blog/
 │       ├─ [slug]/
 │       │   └─ page.js
 │       └─ page.js
 ├─ package.json
 └─ ...
```

```js
// app/page.js

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to my static site</h1>
      <Link href="/blog/hello-world">Go to Hello World blog</Link>
    </main>
  );
}
```

```js
// app/blog/page.js

import Link from "next/link";

export default function Blog() {
  return (
    <main>
      <h1>Blog Page</h1>
      <ul>
        <li><Link href="/blog/hello-world">Hello World</Link></li>
        <li><Link href="/blog/nextjs">Next.js</Link></li>
      </ul>
    </main>
  );
}
```

```js
// app/blog/[slug]/page.js

export async function generateStaticParams() {
  return [
    { slug: 'hello-world' },
    { slug: 'second-post' },
  ];
}

export default function BlogPost({ params }) {
  return (
    <main>
      <h1>Blog Post: {params.slug}</h1>
      <p>This page is statically generated for the slug: <b>{params.slug}</b></p>
    </main>
  );
}
```


![Build structure](https://github.com/user-attachments/assets/fc065d01-04e2-402b-81f5-a484b5139c13)

</details>

<br>
<br>


**Example 5: Static website with dynamic route + api calls**

<details>

Foder Structure
```
my-app/
 ├─ app/
 │   ├─ page.js
 │   └─ blog/
 │       ├─ [slug]/
 │       │   └─ page.js
 │       └─ page.js
 ├─ package.json
 └─ ...
```

```js
// app/blog/page.js

import Link from "next/link";

export default async function Blog() {
  // Fetch data at build time
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache", // ensures static build
  });
  const posts = await res.json();

  // Limit to first 5 posts for simplicity
  const limitedPosts = posts.slice(0, 3);

  return (
    <main>
      <h1>Blog Page</h1>
      <ul>
        {limitedPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

```js
// app/blog/[slug]/page.js

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });
  const posts = await res.json();
  const limitedPosts = posts.slice(0, 3);

  return limitedPosts.map((post) => ({
    slug: post.id.toString(),
  }));
}

export default async function BlogPost({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`,
    { cache: "force-cache" } // ensures it's built statically
  );
  const post = await res.json();

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>
        <b>Post ID:</b> {params.slug}
      </p>
    </main>
  );
}
```

![Build UI](https://github.com/user-attachments/assets/8835f6ab-99b9-4300-be53-1ea5b1632d2e)

</details>
<br>
<br>

###  2. ISR (Incremental Static Regeneration)

**Concept:** A mix of SSG + SSR. Pages are **pre-rendered**, but they can **regenerate** after a time interval or on demand.

This will let your static site **rebuild pages automatically** after a set time (without needing a full redeploy).

**Used in:**

* Blogs / Catalog websites where content changes occasionally
* E-commerce product listings that update periodically

**How it works:**

1. Page is generated at build time.
2. When content changes, the page is regenerated **in the background**.
3. New version is served to the next visitor.

**Pros:**

| Benefit                    | Explanation                             |
| -------------------------- | --------------------------------------- |
| **Fast like static**       | Served from CDN as static HTML.         |
| **No full rebuild needed** | Only pages that get traffic regenerate. |
| **Good for SEO**           | Page always exists as static HTML.      |

**Cons:**

| Issue                                     | Explanation                                                 |
| ----------------------------------------- | ----------------------------------------------------------- |
| **Content may be stale for a short time** | Until regeneration happens.                                 |
| **Requires hosting that supports ISR**    | e.g., Vercel, Netlify (with plugin), custom CDN handles it. |

<br>

**Folder structure**
```
my-app/
 ├─ app/
 │   ├─ page.js
 │   └─ blog/
 │       ├─ [slug]/
 │       │   └─ page.js
 │       └─ page.js
 ├─ package.json
 └─ ...
```



```jsx
// `app/page.js`
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to my ISR static site</h1>
      <Link href="/blog">Go to Blog</Link>
    </main>
  );
}
```

<br>

**Static generation + ISR (revalidate every 60 seconds)**
```jsx
// `app/blog/page.js`
import Link from "next/link";

export const revalidate = 60; // ⏱️ Rebuild every 60s if data changes, this caching of page

export default async function Blog() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 }, // revalidate in background, basically this is caching of api
  });
  const posts = await res.json();
  const limitedPosts = posts.slice(0, 5);

  return (
    <main>
      <h1>Blog Page (ISR enabled)</h1>
      <ul>
        {limitedPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

<br>

**Dynamic routes that also revalidate automatically**
```jsx
// `app/blog/[slug]/page.js`
export const revalidate = 60; // ⏱️ Rebuild each post every 60s

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  const limitedPosts = posts.slice(0, 5);

  return limitedPosts.map((post) => ({
    slug: post.id.toString(),
  }));
}

export default async function BlogPost({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`,
    { next: { revalidate: 60 } }
  );
  const post = await res.json();

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>
        <b>Post ID:</b> {params.slug}
      </p>
    </main>
  );
}
```

### Note
> ⚠️ Note: `npm run export` (static export) **does not support ISR**

Means we have to remove the below code from next.config.js, becuase isr needs server we can not use the build file of html,js,css

```js
const nextConfig: NextConfig = {
  output: 'export', // remove this part
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : undefined, // remove this part also
};
```

<br>

> To test ISR, you must **run the Next.js server** (`npm start`) or **deploy to Vercel**.

<br>

![Build UI](https://github.com/user-attachments/assets/583cbe2c-1251-43d7-8c15-4af9361d4084)

<br>

### ISR in action
✅ When you open `/blog` or `/blog/1`, they’re pre-rendered.
✅ After 60 seconds, the next visitor triggers **background regeneration**.
✅ The new static page replaces the old one automatically.

You get **fresh content** — without a full rebuild or SSR.


<br>
<br>

### 3. CSR (Client Side Rendering)

**Concept:**
Server sends a minimal HTML + JS bundle, and rendering happens in **browser**.

**Used in:**

* SPAs (React, Vue, Angular apps)
* Internal dashboards / admin panels

**Pros:**

| Benefit                   | Why                                           |
| ------------------------- | --------------------------------------------- |
| **Great user experience** | Smooth transitions, no full page reloads.     |
| **Low server load**       | Server only needs to serve static JS bundles. |

**Cons:**

| Issue               | Explanation                                             |
| ------------------- | ------------------------------------------------------- |
| **SEO suffers**     | Initial HTML is empty → search crawlers get no content. |
| **Slow first load** | JS needs to download before UI appears.                 |

<br>

### 4. SSR (Server Side Rendering)

**Concept:**
HTML is generated **per request** on the server.

**Used in:**

* E-commerce (product pages update frequently)
* SEO-heavy dynamic content websites (news, content feeds)
* Personalized content pages

**Pros:**

| Benefit             | Explanation                                   |
| ------------------- | --------------------------------------------- |
| **SEO-friendly**    | Server returns fully rendered HTML            |
| **Dynamic content** | Data is fetched in real-time on every request |

**Cons:**

| Issue                   | Explanation                                         |
| ----------------------- | --------------------------------------------------- |
| **Higher server cost**  | Rendering happens per request → CPU load increases. |
| **Slower TTFB**         | Each request waits for server + DB + render.        |
| **Less cache-friendly** | Pages are not static by default.                    |

<br>

### 5. Hybrid Rendering (Most Real Apps Today)

You can mix strategies based on page type:

| Page Type            | Rendering Strategy        | Reason                           |
| -------------------- | ------------------------- | -------------------------------- |
| Home / Landing Page  | SSG or ISR                | Stable content, SEO important    |
| Blog Post Page       | ISR                       | Content updates but not per user |
| Product Listing Page | SSR or ISR                | Need fresh prices / stock        |
| Dashboard / Profile  | CSR or SSR with hydration | Personalized per user data       |

Modern frameworks like **Next.js, Nuxt, Remix** allow mixing per route.

<br>

### How I Decide in Real Projects

| Question                                                 | If Answer is Yes             | Choose                    |
| -------------------------------------------------------- | ---------------------------- | ------------------------- |
| Does data change rarely?                                 | Yes → Build time good        | **SSG**                   |
| Does SEO matter?                                         | Yes                          | Prefer **SSR** or **ISR** |
| Can content be slightly stale?                           | Yes → No problem             | **ISR**                   |
| Is data personalized per user?                           | Yes → Server or client fetch | **SSR + Client fetch**    |
| Is performance priority + minimal infra cost?            | Yes                          | **Static / ISR**          |
| Is real-time data needed (stock prices, live dashboard)? | Yes                          | **CSR + WebSockets**      |

<br>

> ### SSR vs CSR – The Core Difference

| Aspect                         | **SSR (Server Side Rendering)**                   | **CSR (Client Side Rendering)**                             |
| ------------------------------ | ------------------------------------------------- | ----------------------------------------------------------- |
| **Where HTML is Rendered**     | **On the server** before sending to browser       | **In the browser** using JavaScript                         |
| **First Response from Server** | Fully formed HTML (ready to display)              | Almost empty HTML + JS bundle                               |
| **SEO**                        | **Great** (HTML already contains content)         | **Poor** if not handled with hydration (bots may see blank) |
| **Initial Load Time**          | **Faster first paint** (content visible early)    | **Slower first paint** (needs to load JS first)             |
| **Subsequent Navigation**      | Might re-render from server again depending       | Very fast (SPA-like smooth transitions)                     |
| **Server Load**                | **Higher** – server has to render on each request | **Low** – server just serves static JS files                |
| **Use Case**                   | Dynamic content + SEO needed                      | Logged-in apps, dashboards, internal tools                  |

<br>

### How They Work Technically

**1. SSR (Server Side Rendering)**

When user visits URL:

1. Browser sends request to server.
2. Server fetches data (DB/API).
3. Server renders HTML string.
4. Browser displays HTML immediately.
5. JS hydrates page for interactivity.

**Good for:**

* E-commerce product pages
* News sites
* Pages where SEO matters and data changes frequently

```
User Request → Server Render → Send HTML → Browser Enhances with JS
```

<br>

**2. CSR (Client Side Rendering)**

When user visits URL:

1. Browser loads an **empty HTML shell**.
2. Browser loads JavaScript bundle.
3. JS fetches data from APIs.
4. JS builds UI in the browser (React/Vue does DOM manipulation).

**Good for:**

* Dashboards
* Admin panels
* Apps behind login where SEO doesn't matter

```
User Request → Get Empty HTML + JS → JS Fetches Data → JS Builds UI
```

<br>

> ### Performance Waterfall Comparison (SSR vs CSR)


### CSR (Client Side Rendering) Waterfall

**Sequence:**

1. Browser requests the page → gets **bare HTML**:

   ```
   <html>
     <div id="app"></div>  <!-- Empty shell -->
   </html>
   ```
2. Browser downloads **JavaScript bundle** (often large).
3. JavaScript executes (parse + compile time).
4. JavaScript fetches **API data**.
5. UI is finally rendered.

**Waterfall Visualization:**

```
|---- Request HTML ----|
|------- Download JS Bundle --------|
|--- JS Parsing + Execution ----|
|------ Fetch API Data ------|
|--- Render UI ---|
```

**User Experience:**

* Page looks **blank** initially or have the Loading msg or loader.
* First meaningful paint is delayed.
* If network is slow → **white screen for several seconds**.

<br>

### SSR (Server Side Rendering) Waterfall

**Sequence:**

1. Browser requests the page.
2. Server fetches data and renders HTML **on the server**.
3. Browser receives **fully formed HTML** → content appears **immediately**.
4. Browser downloads JS bundle for **interactivity**.
5. Hydration attaches events and interactions.

**Waterfall Visualization:**

```
|---- Request HTML + Server Renders ----|
|--- HTML visible already ---|
|------- Download JS Bundle --------|
|--- JS Hydration ----|
```

**User Experience:**

* Content appears almost immediately (good **FCP**).
* JS comes later just to make UI interactive.
* Slower network still shows content — no white screen.


<br>

> ### How Hydration Works (and Where It Fails)

### **What is Hydration?**

After SSR sends HTML to the browser, React/Vue needs to **attach event listeners** and re-connect the HTML to the JS component tree.

This process = **Hydration**.

```
SSR outputs:
<h1>Hello John</h1>

Hydration:
React loads JS → sees <h1>Hello John</h1> → attaches onClick, state, etc.
```

So hydration **makes static HTML interactive**.

<br>

**Hydration Lifecycle (Short & Clear)**

1. **SSR Render (Server)**

   * Components run on server → HTML is generated.
   * Browser receives HTML → UI is visible immediately.
   * *No Virtual DOM or events on client yet.*

2. **Browser Parses HTML**

   * Static DOM is displayed.
   * UI looks correct but is **not interactive**.

3. **JS Bundle Loads**

   * Framework code runs in the browser.

4. **Client Creates Virtual DOM (Hydration Render)**

   * Components run **again** → Virtual DOM is generated on client.
   * This is the **first client render**.

5. **Virtual DOM is Compared to SSR DOM**

   * If **match** → attach event listeners → UI becomes interactive. ✅
   * If **mismatch** → framework **re-renders** UI on client (discard SSR DOM). 🔁


<br>

**Where Hydration Fails** (Common Real Issues)

| Problem                                                     | Cause                                          | Result                                                          |
| ----------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| **HTML mismatch**                                           | Server and client produce different HTML       | React logs hydration warning + re-renders entire component tree |
| **Using `Math.random()`, Dates, or Time-based code in SSR** | Server HTML differs from client HTML           | UI flickers or hydration fails                                  |
| **Conditional rendering depending on browser APIs**         | e.g., `window`, `sessionStorage`, screen width | Client render differs → mismatch                                |
| **Large JS bundles**                                        | Hydration takes too long                       | Page looks loaded but **unclickable** until hydration finishes  |

<br>

**Big Pain Point**

> Page looks **visible** but **not clickable yet** → users think the site is slow or broken.

This is a common issue in:

* Large React SSR apps
* E-commerce product pages with lots of components

<br>

**How to Fix Hydration Problems**

| Solution                                                               | Description                                              |
| ---------------------------------------------------------------------- | -------------------------------------------------------- |
| **Avoid rendering different HTML on server and client**                | Same variables, avoid random values without stable seeds |
| **Use `useEffect` for browser-only logic**                             | Never run browser-specific logic on server               |
| **Split components with `dynamic(() => import(...), { ssr: false })`** | Delay heavy components to the client                     |
| **Reduce JavaScript bundle size**                                      | Less JS = faster hydration                               |

<br>

> ### Example where hydration fails

<details>

**Example 1: Mistake: Using `Math.random()` (or any non-deterministic value) directly during render.**

```jsx
// pages/index.js
export default function Home() {
  const randomNumber = Math.random();

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Your random number is: {randomNumber}</p>
    </div>
  );
}
```

**Why this fails:**

* **Server renders:** `Your random number is: 0.27512681`
* **Client renders:** `Your random number is: 0.59487121`

The HTML **doesn’t match**, so during hydration React prints a warning:

```
Warning: Text content did not match. Server: "0.27512681" Client: "0.59487121"
```

</details>

<br>

**Scenario 1 — Generate the Value on the Client Only**

<details>

Move dynamic browser-only behavior into `useEffect()`:

```jsx
import { useEffect, useState } from "react";

export default function Home() {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    setRandomNumber(Math.random());
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Your random number is: {randomNumber ?? "Loading..."}</p>
    </div>
  );
}
```

Now:

* Server renders: `Loading...`
* Client hydrates → computes random → updates value locally

✅ **No mismatch**
✅ **No hydration failure**

</details>

<br>

**Scenario 2: Using `window`, `localStorage`, or screen size in SSR render**

<details>

**Broken Code Example**
```jsx
export default function Dashboard() {
  const isMobile = window.innerWidth < 600;  // ❌ server can't evaluate this

  return (
    <div className={isMobile ? "mobile" : "desktop"}>
      Dashboard
    </div>
  );
}
```

**Result:**
* **Server renders** assuming desktop (because `window` is undefined).
* **Client renders** mobile layout.
* Hydration mismatch → React replaces DOM → flashes layout.

<br>

**Fix: Use `useEffect` so code runs **only on client**.

```jsx
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
  }, []);

  return (
    <div className={isMobile ? "mobile" : "desktop"}>
      Dashboard
    </div>
  );
}
```

✅ Server HTML matches client HTML initially
✅ Client updates layout smoothly after hydration

</details>

<br>

**Scenario 3: Time-based Rendering (date, countdown, timers)**

<details>

**Broken Version**
```jsx
export default function Clock() {
  return <p>{new Date().toLocaleTimeString()}</p>;
}
```

Server and client output different timestamps → **hydration mismatch**.

<br>

**Fix**
```jsx
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <p>{time || "Loading..."}</p>;
}
```
</details>

<br>

> ### How you create the forms in next or react js


| Factor                       | Why it matters                                  | Examples                                |
| ---------------------------- | ----------------------------------------------- | --------------------------------------- |
| **Form Complexity**          | Simple login vs dynamic wizard                  | Few fields vs 50 dependent fields       |
| **Validation Needs**         | Basic required vs Regex vs API-level validation | Email format, uniqueness check          |
| **Performance**              | Re-renders and lag in large forms               | Real-time search fields                 |
| **Where Validation Happens** | Client only vs Client + Server                  | Zod/Yup + server actions/API validation |

<br>

### My Standard Architecture for Forms in Next.js (App Router)

I **never** do *only* frontend validation.

I do:

```
Client Validation (UX)
+
Server Validation (Security)
```

<br>

**I prefer `Zod/YUP` for schema validation (works both Client + Server)**

```js
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

This same schema can be:

* Used in the React form to validate input before submit
* Used in the **Next.js Server Action** or API route to validate final data

<br>

### In React / Next.js, These Are the 3 Main Methods I Use

**1. Controlled Components (For small/simple forms)- basically using the useState hook**

**When I use:** *2–5 fields, trivial UI* (e.g., login, search filters)

```jsx
const [form, setForm] = useState({ email: "", password: "" });

<input
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
/>
```

**Why:** Simple, readable.\
**Why not always:** Re-renders every keystroke → not scalable for large forms.

<br>

**2. React Hook Form (My default for medium/large forms)**

**When I use:** *Most real forms* → 10+ fields, dynamic fields, performance-sensitive.

Why React Hook Form:

* It **does not rerender** entire form per keystroke → performance is great
* Easy integration with Zod / Yup / server validation
* Handles dirty/touched/submit states cleanly

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login";

const { register, handleSubmit, formState } = useForm({
  resolver: zodResolver(loginSchema),
});

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("email")} />
  <input {...register("password")} type="password" />
</form>
```

<br>

**3. Server Actions / API Validation (Final security layer)** — *Next.js App Router*

**I never trust client-side validation fully** — user can bypass it.

```js
"use server";

import { loginSchema } from "@/schemas/login";

export async function loginAction(formData) {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) return { error: "Invalid input" };

  // proceed login logic
}
```

<br>

### Final Thought (Real World Developer Voice)

- I treat forms as state machines, not just UI.
- I validate **first for UX** (frontend) - 
    - resolver: zodResolver(registerSchema)  // ✅ Client validation
- and **always revalidate for security** (server).
    - const result = registerSchema.safeParse(rawData);  // ✅ Server validation
- I avoid unnecessary re-renders, I make schemas reusable,
- and I ensure forms are maintainable 6 months later.

<br>

> ### Production ready example using below:

* **Next.js App Router**
* **React Hook Form**
* **Zod** (shared schema)
* **Server Action** (for secure backend validation & processing)
* **Loading state + Field errors + Success message**


<details>

**Folder Structure**

```
app/
  actions/
    register.ts        <-- Server Action
  register/
    page.tsx           <-- Form UI
schemas/
  registerSchema.ts    <-- Shared Zod schema
components/
  FormInput.tsx        <-- Reusable input component
```


**Install below packages**
```
npm i @hookform/resolvers zod react-hook-form
```


<br>

#### 1. Create Zod Schema (`schemas/registerSchema.ts`)

```ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
```

<br>

#### 2️. Create Server Action (`app/actions/register.ts`)

```ts
"use server";

import { registerSchema } from "@/schemas/registerSchema";

// simulate db insert (replace with prisma/drizzle/query)
async function saveUserToDB(data: any) {
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

export async function registerAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Save to DB (secured here, not client)
  await saveUserToDB(parsed.data);

  return {
    success: true,
    message: "User registered successfully!",
  };
}
```

<br>

#### 3️. Reusable Input Component (`components/FormInput.tsx`)

```tsx
"use client";

export function FormInput({ label, error, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <input
        {...props}
        className="border p-2 rounded-md"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
```

<br>

#### 4️. Form UI in Page (`app/register/page.tsx`)

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/registerSchema";
import { registerAction } from "@/app/actions/register";
import { useState, useTransition } from "react";
import { FormInput } from "@/components/FormInput";

export default function RegisterPage() {
  const [serverErrors, setServerErrors] = useState<any>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterInput) => {
    setSuccessMsg("");
    setServerErrors({});

    startTransition(async () => {
      const result = await registerAction(new FormData(document.querySelector("form")!));

      if (result?.error) setServerErrors(result.error);
      if (result?.success) setSuccessMsg(result.message);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg space-y-4">
      <h1 className="text-2xl font-semibold">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <FormInput
          label="Name"
          {...register("name")}
          error={errors.name?.message || serverErrors.name?.[0]}
        />

        <FormInput
          label="Email"
          {...register("email")}
          error={errors.email?.message || serverErrors.email?.[0]}
        />

        <FormInput
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message || serverErrors.password?.[0]}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Register"}
        </button>
      </form>

      {successMsg && (
        <p className="text-green-600 font-medium">{successMsg}</p>
      )}
    </div>
  );
}
```

</details>

<br>

### What This Demonstrates

| Feature                      | Demonstrated? | Location                     |
| ---------------------------- | :-----------: | ---------------------------- |
| React Hook Form with Zod     |       ✅       | `page.tsx`                   |
| Frontend Validation          |       ✅       | `zodResolver`                |
| Server Validation (Security) |       ✅       | `registerAction.ts`          |
| Reusable Inputs              |       ✅       | `FormInput.tsx`              |
| Loading / Disable UI         |       ✅       | `useTransition`              |
| Error & Success UI           |       ✅       | `serverErrors`, `successMsg` |

<br>

### My understanding

1. If 1 or 2 input, 
    - useState
    - normal regex validation

2. If 2- 3 input -> above + useActionState(simple automatic state handling + loading) + server action

3. If 10 or more input and much advance
    - react-hook-form package
    - zod/YUP for schema and validation
    - useTransition - for Loading or loader management in UI
    - Server action
    - if needed use the useState for the Server errors or Success message

<br>

> ### Importing Alias in TypeScript/JavaScript with Next.js

```js
// Before
import { Button } from '../../../components/button'
 
// After
import { Button } from '@/components/button'
```

in tsconfig.json or jsconfig.json
```js
{
  "compilerOptions": {
    "baseUrl": "src/"
  }
}
```

In addition to configuring the `baseUrl` path, you can use the `"paths"` option to `"alias"` module paths.

tsconfig.json or jsconfig.json
```js
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

<br>

### Note below are for `app router`: 
- Jo bhi `logs terminal` me aaye means wo `server side execute` hua and jo `logs browser` me aaye wo `clinet side execute` hua h
- It has `page.js not index.js` in folder which `serve as main file`.
- By `default`, `all components` are `server side` components only
- `"use client"` directive added, the component should run on client side & server side
- when we click on next Link button, the component which comes on route change runs on server side, not on client side
- you can not have `"use client" or "use server" in single component`, if both needed then make that component to two separate coponenent, and use them separately
- in next js when we are using any type of hook, then we have to add the "use client" at the top, then it is better to make that hook part separate component and add "use client" in that component and import it
- Next caches very regressiveely in next 14
- if you use any 3rd party package, and it does not support server side, run it in "use client" mode.
- You `cannot import` a `Server Component into a Client Component`.

<br>

### How to import server component in client component

<details>

```tsx
'use client'
 
// You cannot import a Server Component into a Client Component.
import ServerComponent from './Server-Component'
 
export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <ServerComponent />
    </>
  )
}
```

**Passing Server Components to Client Components as Props is allowed**

```js
// app/client-component.js
'use client'
 
import { useState } from 'react'
 
export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  )
}
```

```js
// app/page.js 

// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponent from './client-component'
import ServerComponent from './server-component'
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```
</details>

<br>

### App Router vs Pages Router Difference

| Feature        | Pages Router | App Router     |
| -------------- | ------------ | -------------- |
| Meta tags      | `next/head`  | `metadata` API |
| Dynamic SEO    | Manual       | Automatic      |
| Loading UI        | Manual       | `loading.js` |
| Streaming support | ❌            | ✅            |
| Error boundary     | `_error.js`  | `error.js`     |
| Route-level errors | ❌            | ✅              |
| 404 handling       | `404.js`     | `not-found.js` |
| Default                | Client-side  | Server-side    |
| Opt-in client          | N/A          | `"use client"` |
| JS bundle size         | Larger       | Smaller        |
| API           | `getServerSideProps` | `fetch()`            |
| Where it runs | Page-level only      | Any Server Component |
| Granularity   | Whole page           | Component-level      |
| Global layout      | `_app.js`    | `app/layout.js`        |
| Layout persistence | ❌            | ✅ (does not re-render) |
| Route entry         | `pages/home.js`      | `app/home/page.js`       |
| Layout support      | Manual via `_app.js` | Built-in via `layout.js` |
| Route grouping      | ❌                    | ✅ `(group)`              |
| Parallel routes     | ❌                    | ✅                        |
| Intercepting routes | ❌                    | ✅                        |

<br>

### Side by side function compare

| Pages Router         | App Router                     |
| -------------------- | ------------------------------ |
| `getStaticProps`     | `fetch()` + cache              |
| `getStaticPaths`     | `generateStaticParams`         |
| `getServerSideProps` | `fetch({ cache: 'no-store' })` |
| `getInitialProps`    | ❌ Removed                      |
| `_app.js`            | `layout.js`                    |
| `_document.js`       | `layout.js`                    |
| `next/head`          | `metadata` API                 |
| SEO API     | `next/head`  | `generateMetadata` |
| Server side | ❌            | ✅                  |
| Async       | ❌            | ✅                  |



<br>

### App Router vs Pages Router Folder structure in Next.js

<br>

**1. App Router (`app/` directory) - "app" folder is at Top level**

```
/app
  ├── layout.tsx        (Layout for nested pages)
  ├── page.tsx          (Renders as a page)
  ├── loading.tsx       (Handles loading states)
  ├── error.tsx         (Handles errors)
  ├── dashboard/
       ├── page.tsx     (Renders `/dashboard`)
       ├── settings/
             ├── page.tsx  (Renders `/dashboard/settings`)
```

<br>

**2. Pages Router (`pages/` directory) - "pages" folder is at Top level**

```
/pages
  ├── index.js           (Renders `/`)
  ├── about.js           (Renders `/about`)
  ├── dashboard/
       ├── index.js      (Renders `/dashboard`)
       ├── settings.js   (Renders `/dashboard/settings`)
  ├── api/
       ├── users.js      (API route at `/api/users`)
```

<br>
<br>

### Folder Structure of all files in next js

```
app/  
├── layout.(js|jsx|tsx)          # Persistent layout wrapper for all pages  
├── page.(js|jsx|tsx)            # Default route page (e.g., `/` route)  
├── loading.(js|jsx|tsx)         # Suspense fallback for loading state  
├── not-found.(js|jsx|tsx)       # Custom 404 page  
├── error.(js|jsx|tsx)           # Handles errors in a specific route/page  
├── global-error.(js|jsx|tsx)    # Handles global errors across the app  
├── template.(js|jsx|tsx)        # Re-rendered layout (non-persistent)  
├── default.(js|jsx|tsx)         # Default UI for parallel routes  
│  
├── api/  
│   ├── route.(js|ts)           # API endpoint handler  
│  
├── another-route/               # Example sub-route  
│   ├── layout.(js|jsx|tsx)      # Persistent layout for this route  
│   ├── page.(js|jsx|tsx)        # Page for `/another-route`  
│   ├── loading.(js|jsx|tsx)     # Loading state for this route  
│   ├── error.(js|jsx|tsx)       # Error boundary for this route  
│   ├── template.(js|jsx|tsx)    # Re-rendered layout (non-persistent)  

```

<br>
<br>

## Next.js Routing Files in the App Router (`app/` directory) 

<br>

### 1. layout.js / layout.tsx (Layout File)
- Layout.js is `shared between multiple pages`. On `navigation`, `layouts preserve state`, remain interactive, and `do not rerender`.
- Layouts `do not have access` to the `route segments` below itself. To access all route segments, you can use `useSelectedLayoutSegment` or `useSelectedLayoutSegments` in a Client Component.
- A root layout is the top-most layout in the root app directory. while other layout existed in route folder
- The `app directory` `must include` a `root app/layout.js`.
- The `root layout` should have the `html, body` and `metadata(metadata is reseved and must shared object) function`

<br>

```tsx
// app/layout.tsx

export const metadata = {
  title: '...',
  description: '...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

<br>

### Props
1. children (required)
2. params (optional)

<br>

Params is available in layout.js of `route folder`, but params is `not available` in `root layout.js`

<br>

| Example                               | URL            | `params`               |
|---------------------------------------|---------------|------------------------|
| `app/dashboard/[team]/layout.js`      | `/dashboard/1` | `{ team: '1' }`       |
| `app/shop/[tag]/[item]/layout.js`     | `/shop/1/2`    | `{ tag: '1', item: '2' }` |
| `app/blog/[...slug]/layout.js`        | `/blog/1/2`    | `{ slug: ['1', '2'] }` |

<br>

### Note: 

Passing `data between a parent layout` and its `children` is `not possible`. However, you can `fetch the same data` in a route `more than once`, and the same API call is made in layout.js and page.js, React will automatically `deduplicate (dedupe)` requests, ensuring the data is only fetched once.

<br>
<br>

### 2. page.js / page.tsx (Page File)
<br>

```tsx
// app/dashboard/page.tsx → Renders /dashboard

// app/blog/[slug]/page.js
export default function Page({ params, searchParams }) {
  return <h1>My Page</h1>
}
```

<br>

### Props

1. `params (optional)`

| Path | Example URL | Params |
|------|------------|--------|
| app/shop/[slug]/page.js | /shop/1 | { slug: '1' } |
| app/shop/[category]/[item]/page.js | /shop/1/2 | { category: '1', item: '2' } |
| app/shop/[...slug]/page.js | /shop/1/2 | { slug: ['1', '2'] } |

<br>

2. searchParams (optional)

| URL | searchParams |
|-----|---------------|
| /shop?a=1 | { a: '1' }` |
| /shop?a=1&b=2 | { a: '1', b: '2' } |
| /shop?a=1&a=2 | { a: ['1', '2'] } |


<br>
<br>

### 3. loading.js / loading.tsx (Loading UI)
- Provides a loading state while fetching server-side data.
- Uses React Suspense.
-  it gets triggered automatically while fetching the api


```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <p>Loading...</p>;
}
```

- sometimes loading.js is not working as expected then in that condition we can use the `suspense with fallback` in that component, same as we do in react js

<br>
<br>

### 4. not-found.js / not-found.tsx (Custom 404 Page)
- Handles 404 errors for missing pages inside a route.


```js
// app/not-found.tsx
export default function NotFound() {
  return <h1>Page Not Found</h1>;
}
```
<br>

- By default, not-found is a Server Component. You can mark it as async to fetch and display data:

```js
import Link from 'next/link'
import { headers } from 'next/headers'
 
export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get('host')
  const data = await getSiteData(domain)
  return (
    <div>
      <h2>Not Found: {data.name}</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  )
}
```
<br>

### Not found function ie `notFound()`

- The `notFound` function allows you to render the `not-found file` within a route segment
- Invoking the `notFound()` function throws a NEXT_NOT_FOUND error and terminates rendering

**Inshort:** basically, kisi condition pe hum chahte h ki nearest not found page render ho jaye, to ish function ko run karte h

```js
// app/user/[id]/page.js

import { notFound } from 'next/navigation'
 
async function fetchUser(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
 
export default async function Profile({ params }) {
  const { id } = await params
  const user = await fetchUser(id)
 
  if (!user) {
    notFound()
  }
 
  // ...
}
```

<br>
<br>

### 5. error.js / error.tsx (Error UI)
- Handles errors **within a specific layout or page**.
- Uses the `useEffect` hook for error resets.
- To handle errors within the root layout or template, use a variation of `error.js called global-error.js`.

```tsx
// app/dashboard/error.tsx
'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

<br>
<br>

### 6. global-error.js / global-error.tsx (Global Error UI)
- Handles errors for the **entire application**.
- To specifically handle errors in root `layout.js`
- Placed inside `app/`.
- it is important to note that global-error.js must define its own `<html>` and `<body>` tags.

```tsx
// app/global-error.tsx
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h1>Global Error</h1>
        <button onClick={() => reset()}>Retry</button>
      </body>
    </html>
  );
}
```

<br>
<br>

### 7. route.js / route.ts (API Endpoint)
- It lies in api folder, which is backend folder. but it can also be used in pages folder

```ts
// app/api/user/route.ts → API at /api/user
export async function GET() {
  return Response.json({ name: 'John Doe' });
}
```

below is for pages folder
```js
// app/dashboard/[team]/route.js
export async function GET(request, context: { params }) {
  const team = context.params.team // '1'
}
```

<br>
<br>

### 8. template.js / template.tsx (Re-rendered Layout)
- Works **like `layout.tsx` but re-renders on navigation**.
- Useful when you need a fresh layout for each visit.
- Suspense Boundaries inside layouts only show the fallback the first time the Layout is loaded and not when switching pages. For templates, the fallback is shown on each navigation.


```tsx
// app/dashboard/template.tsx
export default function Template({ children }) {
  return <div className="dashboard">{children}</div>;
}
```

<br>

### 9. default.js / default.tsx (Parallel Route Fallback Page)
- Used for **parallel routes** when no other route is matched in the slot( slot is any part of parallel route).

📌 **Example:**
```tsx
// app/@notifications/default.tsx

export default function Default() {
  return <p>No notifications available</p>;
}
```

### params (optional)

| Example                                      | URL         | `params`                  |
|----------------------------------------------|------------|---------------------------|
| `app/@sidebar/[artist]/default.js`          | `/zack`     | `{ artist: 'zack' }`      |
| `app/@sidebar/[artist]/[album]/default.js`  | `/zack/next` | `{ artist: 'zack', album: 'next' }` |

<br>

### When Does `default.js` Load?


<details>

### **1. Initial Folder Structure (Everything Works Fine)**
```
app
 ├── dashboard
 │   ├── @analytics
 │   │   ├── page.js       (Analytics UI)
 │   ├── @revenue
 │   │   ├── page.js       (Revenue UI)
```
- When you visit `/dashboard`, both **analytics** and **revenue** load correctly.

<br>

### **2. Now, You Introduce a Dynamic Route (`[detailId]`) or Nested Route**
```
app
 ├── dashboard
 │   ├── @analytics
 │   │   ├── page.js       (Analytics UI)
 │   │   ├── [detailId]
 │   │        ├── page.js
 │   ├── @revenue
 │   │   ├── page.js       (Revenue UI)
```
- Visiting `/dashboard` still works fine. ✅  
- **Problem:** Visiting `/dashboard/tata` causes a **"Page Not Found"** error ❌  
  - Next.js sees `[detailId]` in `@analytics`, so it expects a matching structure in `@revenue`.  
  - Since `@revenue` doesn't have `[detailId]`, Next.js doesn't know what to render there.

<br>

### **3. How to Fix This?**
You have **two solutions:**

#### **Solution 1: Add `[detailId]` to `@revenue`**
```
app
 ├── dashboard
 │   ├── @analytics
 │   │   ├── page.js
 │   │   ├── [detailId]
 │   │        ├── page.js
 │   ├── @revenue
 │   │   ├── page.js
 │   │   ├── [detailId]    <-- Added this folder
 │   │        ├── page.js
```
- Now both `@analytics` and `@revenue` handle `[detailId]`, so `/dashboard/tata` works fine. ✅  

<br>

#### **Solution 2: Add `default.js` in `@revenue`**
```
app
 ├── dashboard
 │   ├── @analytics
 │   │   ├── page.js
 │   │   ├── [detailId]
 │   │        ├── page.js
 │   ├── @revenue
 │   │   ├── default.js  <-- Fallback for all routes
```
- Now, whenever a nested route (`/dashboard/tata`) is visited:  
  - `@analytics` loads `[detailId]/page.js`  
  - `@revenue` loads `default.js` instead of breaking. ✅  

<br>

### **Conclusion**
- If a parallel route is missing for a dynamic route, Next.js throws an error.  
- Either **match the folder structure** or use `default.js` to **provide fallback UI**.

</details>

<br>
<br>

## **Dynamic Routes in Next.js (App Router)**  

Next.js **App Router** (`app/` directory) supports **dynamic routing** with bracket notation. Here’s how it works:  

<br>

### Dynamic Route Segment 
- keep in mind that `params` is important thing
- Example: `/products/[id]/page.tsx` → Matches `/products/123`, `/products/xyz`  


```
/app
  /products
    /[id]
      page.tsx  → Matches `/products/:id`
```

in app/products/[id]/page.tsx
```tsx
export default function ProductPage({ params }) {
  return <h1>Product ID: {params.id}</h1>;
}
```
✅ **URL:** `/products/42` → **Renders:** `Product ID: 42`  

<br>

### GenerateStaticParams 

The generateStaticParams function can be used in combination with `dynamic route segments` to `statically generate` routes at build time instead of on-demand at request time.

```js
// app/blog/[slug]/page.js

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
 
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }) {
  const { slug } = params
  // ...
}
```
<br>

**Note:**
1. You can use the `dynamicParams segment config(details is below)` option to control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
    <details>

      #### dynamicParams
      ```js
      // layout.js | page.js | route.js
      export const dynamicParams = true // true | false,

      // - true (default): Dynamic segments not included in generateStaticParams are generated on demand.
      // - false: Dynamic segments not included in generateStaticParams will return a 404.
      ```
    </details>

2. During `next dev`, `generateStaticParams` will be `called` `when you navigate` to a route.
3. During `next build`, `generateStaticParams` runs before the corresponding Layouts or Pages are generated.
4. During revalidation (`ISR`), `generateStaticParams `will `not be called again`.
5. `generateStaticParams` replaces the `getStaticPaths` function in the `Pages Router`.

<br>

**What should be Returns of generateStaticParams**

generateStaticParams should return an array of objects

| Example Route                        | Return Type                                 |
|-------------------------------------|---------------------------------------------|
| /product/[id]                     | { id: string }[]                          |
| /products/[category]/[product]    | { category: string, product: string }[]   |
| /products/[...slug]               | { slug: string[] }[]                      |

<br>

### Below are example of usage

<br>

I. **Single Dynamic Segment**

<details>

```js
// app/product/[id]/page.js
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}
 
// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
export default function Page({ params }) {
  const { id } = params
  // ...
}
```
</details>

<br>

II. **Multiple Dynamic Segments**

In this we have two approach
- Generate params from the bottom up
- Generate params from the top down

<br>
<details>

### Generate params from the bottom up

Ishme hum child component me parent & child dono k params return kr dete h 

```js
// app/products/[category]/[product]/page.js

export function generateStaticParams() {
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' },
  ]
}
 
// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default function Page({ params }) {
  const { category, product } = params
  // ...
}
```

or

```js
// app/products/[category]/[product]/page.js

// Generate segments for both [category] and [product]
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())
 
  return products.map((product) => ({
    category: product.category.slug,
    product: product.id,
  }))
}
 
export default function Page({ params }) {
  // ...
}
```
<br>

### Generate params from the top down

Ishme hum parents me parents ka prams return krte h aur child me child ka params return karte h

Lets say we have route like this
```js
/products/[category]/[product]
```

**If a parent route has generateStaticParams, the child route's generateStaticParams will run for each value returned by the parent.**

<br>

Let's say the parent [category] route has this:
```js
// This might be in app/products/[category]/page.js or a layout
export async function generateStaticParams() {
  return [
    { category: 'shoes' },
    { category: 'hats' }
  ];
}
```

So, Next.js will call the child route’s generateStaticParams twice, once for:

- { category: 'shoes' }
- { category: 'hats' }


```js
// app/products/[category]/[product]/page.js

// Generate segments for [product] using the `params` passed from
// the parent segment's `generateStaticParams` function
export async function generateStaticParams({ params: { category } }) {
  const products = await fetch(
    `https://.../products?category=${category}`
  ).then((res) => res.json())
 
  return products.map((product) => ({
    product: product.id,
  }))
}
 
export default function Page({ params }) {
  // ...
}
```
</details>
<br>

III. **Catch-all Dynamic Segment**

<details>

```js
// app/product/[...slug]/page.js

export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}
 
// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default function Page({ params }) {
  const { slug } = params
  // ...
}
```
</details>

<br>
<br>

### `[...folder]` → Catch-All Route Segment
- Example: `/docs/[...slug]/page.tsx` → Matches `/docs/setup/install`, `/docs/react/hooks`  

<br>

```
/app
  /docs
    /[...slug]
      page.tsx  → Matches `/docs/:slug+`
```

<br>

```tsx
// app/docs/[...slug]/page.tsx

export default function DocsPage({ params }) {
  return <h1>Docs Path: {params.slug.join(' / ')}</h1>;
}
```
✅ **URL:** `/docs/setup/install` → **Renders:** `Docs Path: setup / install`  

<br>
<br>

### `[[...folder]]` → Optional Catch-All Route Segment

- **Same as `[...folder]`, but also matches the base route itself**  
- Example: `/blog/[[...slug]]/page.tsx` → Matches `/blog`, `/blog/nextjs`, `/blog/nextjs/app-router`  
- basically cathing all route, which can deeply nested in single component

<br>

```
/app
  /blog
    /[[...slug]]
      page.tsx  → Matches `/blog/:slug*` (including `/blog`)
```

```tsx
// app/blog/[[...slug]]/page.tsx

export default function BlogPage({ params }) {
  return (
    <h1>
      Blog Path: {params.slug ? params.slug.join(' / ') : 'Home'}
    </h1>
  );
}
```
✅ **URL:** `/blog` → **Renders:** `Blog Path: Home`  
✅ **URL:** `/blog/react` → **Renders:** `Blog Path: react`  
✅ **URL:** `/blog/nextjs/app-router` → **Renders:** `Blog Path: nextjs / app-router`  

<br>
<br>


## **Key Configuration Files in a Next.js Project**

### **1. `next.config.js` → Next.js Configuration**
- The main configuration file for Next.js.  
- Used to customize settings like `webpack`, `i18n`, `redirects`, `headers`, and more.  

<details>

```js
// next.config.js
module.exports = {
  reactStrictMode: true,  // Enables React strict mode
  images: {
    domains: ['example.com'],  // Allow images from external domains
  },
  async redirects() {
    return [
      { source: '/old-route', destination: '/new-route', permanent: true },
    ];
  },
};
```
</details>
<br>

### **2. `instrumentation.js|ts` → OpenTelemetry & Instrumentation**
- Used for performance monitoring and logging requests. 
- place the file in the root of your application or inside a src folder if using one, not in app/pages folder
- There are many 3rd party services for the telemetry, `below is code for otel`.

<details>

```js
// instrumentation.js
import { registerOTel } from '@vercel/otel'
 
export function register() {
  registerOTel('next-app')
}
```

```js
// next.config.js
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
}
```
</details>
<br>

### **3. `middleware.ts` → Next.js Middleware**
- Runs **before** the request reaches a route.  
- Useful for authentication, redirects, and request modifications.  
- `matcher` allows you to filter Middleware to run on specific paths.
  - it can be single path or multiple paths
  - allows full regex
- to make it work, add middleware.ts in root folder

<details>

```ts
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}
```
</details>
<br>

## NextResponse in next js

The `NextResponse` API allows you to:

- `redirect` the incoming request to a different URL
- `rewrite` the response by displaying a given URL
- Set request headers for API Routes, getServerSideProps, and rewrite destinations
- Set response cookies
- Set response headers

<br>

#### Using Cookies

- For incoming requests, cookies comes with the following methods: `get`, `getAll`, `set`, and `delete` cookies. You can check for the existence of a cookie with `has` or remove all cookies with `clear`.
- For outgoing responses, cookies have the following methods `get`, `getAll`, `set`, and `delete`.

<details>

```js
// middleware.js
import { NextResponse } from 'next/server'
 
export function middleware(request) {

  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('nextjs')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
 
  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false
 


  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })
  cookie = response.cookies.get('vercel')
  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.
 
  return response
}
```
</details>
<br>

#### Setting Headers

<details>

```js
import { NextResponse } from 'next/server'
 
export function middleware(request) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello')
 
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
 
  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}
```
</details>
<br>

### CORS

<details>

```js
import { NextResponse } from 'next/server'
 
const allowedOrigins = ['https://acme.com', 'https://my-app.org']
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
 
export function middleware(request) {
  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
 
  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'
 
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }
 
  // Handle simple requests
  const response = NextResponse.next()
 
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
 
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
 
  return response
}
 
export const config = {
  matcher: '/api/:path*',
}
```
</details>

<br>
<br>

## **`waitUntil` and `NextFetchEvent` in Next.js Middleware**
In Next.js, Middleware runs **before a request is processed**. Sometimes, you might need to perform **asynchronous background tasks** without delaying the response. This is where `waitUntil` and `NextFetchEvent` come in.

<br>

### **1️⃣ What is `NextFetchEvent`?**
`NextFetchEvent` is an object passed to `Middleware` that provides the `waitUntil` method. This allows you to run **long-running async tasks in the background** without blocking the response.

 ```javascript
export function middleware(request, event) { // event is NextFetchEvent
  // do something
}
```

### **2️⃣ Why Use `waitUntil`?**
By default, JavaScript's event loop might **cancel async tasks** if Middleware finishes execution early. `waitUntil` ensures the task **runs to completion** even after the middleware function returns.

**How `waitUntil` Works**
- **Without `waitUntil`**, background tasks may be interrupted:
  ```javascript
  export function middleware(request) {
    fetch("https://example.com/log", { method: "POST", body: JSON.stringify({ url: request.url }) }); 
    return NextResponse.next();
  }
  ```
  ❌ If Middleware execution finishes before `fetch` completes, the request may be **aborted**.

- **With `waitUntil`**, the task is guaranteed to complete:
  ```javascript
  export function middleware(request, event) { // event is NextFetchEvent
    event.waitUntil(
      fetch("https://example.com/log", { method: "POST", body: JSON.stringify({ url: request.url }) })
    );
    return NextResponse.next();
  }
  ```
  ✅ The logging request **will always complete**, even if Middleware finishes execution.

<br>

**4️⃣ Real-World Use Cases**
- Logging Requests
- Background Token Refresh
- User Analytics Tracking

<br>

## Advance middleware

### **1️⃣ `skipMiddlewareUrlNormalize`**
By default, Next.js **normalizes URLs** before passing them to Middleware. This means:
- Removing duplicate slashes (`//`)
- Decoding encoded characters (`%20` → space)
- Converting `/index` to `/`

👉 **`skipMiddlewareUrlNormalize: true`** **prevents** Next.js from normalizing URLs before Middleware executes.

<br>

```javascript
export const config = {
  matcher: "/api/:path*",
  skipMiddlewareUrlNormalize: true, // Prevents URL normalization
};

export function middleware(request) {
  console.log(request.nextUrl.pathname); // Will show the original request pathname
  return NextResponse.next();
}
```
<br>

### **2️⃣ `skipTrailingSlashRedirect`**
By default, Next.js **automatically redirects URLs** based on trailing slashes:
- `/about/` → `/about`
- `/blog/post/` → `/blog/post`

👉 **`skipTrailingSlashRedirect: true`** **disables** this behavior in Middleware.


```javascript
export const config = {
  matcher: "/blog/:path*",
  skipTrailingSlashRedirect: true, // Prevents automatic removal of trailing slashes
};

export function middleware(request) {
  console.log(request.nextUrl.pathname); // Keeps trailing slash if originally present
  return NextResponse.next();
}
```

<br>
<br>

## `.env` Files → Environment Variables

**Different Environment Files:**
| File | Purpose |
|------|---------|
| `.env` | Default environment variables for all environments. |
| `.env.local` | Variables specific to local development (ignored by Git). |
| `.env.production` | Variables for production builds. |
| `.env.development` | Variables for development mode. |

**Example (`.env.local`):**
```
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgres://user:pass@localhost:5432/db
```

**Access in Next.js:**  
```ts
console.log(process.env.NEXT_PUBLIC_API_URL);
```

#### Dynamic varibale in env file in next js

Next.js will automatically expand variables that use `$` to reference other variables e.g. `$VARIABLE` inside of your `.env*` files

```js
TWITTER_USER=nextjs
TWITTER_URL=https://twitter.com/$TWITTER_USER
```

Note: If you need to use variable with a `$ in the actual value`, it needs to be escaped e.g. `\$`.

<br>
<br>

> ### - How dyncmic params behave in static and ISR website
* **Dynamic params** are values like `/blog/[id]`.

* **Static (SSG)**: all possible params must be known at **build time**.

* Pages are generated once during build and **never change**.

* If a param isn’t pre-generated → **404 page**.

* **ISR**: only some params are generated at build time.

* New params are generated **on first request**.

* Generated page is **cached as static**.

* Page is **revalidated after a set time**.

* No full rebuild needed for new params.


<br>
<br>

## **Route Groups & Private Folders in Next.js (App Router)**  

### **1️⃣ Route Groups → `(folder)`**  

<details>

- Used to **group related routes** **without affecting the URL structure**.  
- **Parent folder names do NOT appear in the URL.**
- In that group folder, we can create a layout.js which only works for that folder

<br>

```
/app
  /(dashboard)
    /users
      page.tsx   → Renders `/users`
    /settings
      page.tsx   → Renders `/settings`
```


**URL Path Output:**  
- `/users` (NOT `/dashboard/users`)  
- `/settings` (NOT `/dashboard/settings`)  
</details>

<br>

### **2️⃣ Private Folders → `_folder`**  

<details>

- Prefixing a folder with `_` **excludes it from the routing system**.  
- Useful for organizing **utility files**, **components**, or **API helpers** inside `app/`.  

<br>

```
/app
  /dashboard
    /users
      page.tsx   → Renders `/dashboard/users`
  /_utils
    helpers.ts   → NOT a route (ignored by Next.js)
```

- Cannot be accessed as a route (`/_utils/helpers`)
- Can be imported inside other components**   
</details>

<br>
<br>

## Parallel & Intercepted Routes in Next.js (App Router)

### Parallel Routes (`@folder`) → Named Slots
- Used to `render multiple pages in parallel` inside a layout.
- Each slot (`@folder`) **renders a separate route**, allowing **multiple views in a single layout**.  
- Ideal for **dashboards with multiple panels**, **chat apps**, or **sidebars**.  
- basically 2 page ko single layout me rakhna h, jisse 2 separate error, layout etc separately manage kr sakte h single layout or common page me

<br>

```
/app
  /dashboard
    layout.tsx  → Shared layout
    /@analytics
      page.tsx  → Renders analytics panel
    /@settings
      page.tsx  → Renders settings panel
    page.tsx   → Main dashboard page
```

<br>

**Note**:\
- In `general` scenario, `layout gets children` prop but when we use the parallel routes.
- We get all the `parallel routes in layout`, in our case `it is analytics, & settings`
- Each nested page has its own environment like, `separate loading,error,not-found,` etc

```tsx
// app/dashboard/layout.tsx (Using Parallel Slots)

export default function DashboardLayout({ analytics, settings }) {
  return (
    <div>
      <main>{analytics}</main>
      <aside>{settings}</aside>
    </div>
  );
}
```
<br>

```tsx
// app/dashboard/@analytics/page.tsx
export default function AnalyticsPage() {
  return <h1>Analytics Panel</h1>;
}
```
<br>

```tsx
// app/dashboard/@settings/page.tsx
export default function SettingsPage() {
  return <h1>Settings Panel</h1>;
}
```
<br>

**Visiting `/dashboard` Renders:**  
```
-----------------------
| Analytics | Settings |
|   Panel   |  Panel   |
-----------------------
```
<br>

#### **🚀 URL Behavior**
| URL | Rendered Components |
|-----|---------------------|
| `/dashboard` | ✅ `layout.js` → `<analytics />` + `<settings />` |
| `/dashboard?analytics=trending` | ✅ Updates only the analytics slot |
| `/dashboard?settings=alerts` | ✅ Updates only the settings slot |


<br>

<br>

### Intercepted Routes (`(.)folder`, `(..)folder`, `(...)folder`)
- Helps when **embedding a different page inside another page** (e.g., opening a modal instead of full navigation). 
- incept don't count @analytics as path, to count no of dots

![BOM](/images/intercepting1.avif)

- However, when navigating to the photo by clicking a shareable URL or by refreshing the page, the entire photo page should render instead of the modal. No route interception should occur.

![BOM](/images/intercepting2.avif)


**Types of Interception**
| Syntax | Intercepts From |
|--------|----------------|
| **`(.)folder`** | Same level |
| **`(..)folder`** | One level above |
| **`(..)(..)folder`** | Two levels above |
| **`(...)folder`** | From the root |

<br>

```
// refer below url for more details

https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes
```

<br>

### **Example 1: Same-Level Interception (`(.)folder`)**  
**Scenario:** Clicking on a post in `/feed` should show a modal instead of navigating away.  

<details>

```
/app
  /feed
    page.tsx   → Renders `/feed`
  /(.)post
    [id]
      page.tsx → Intercepts `/feed/:id`
```
<br>

```tsx
// app/feed/page.tsx
export default function FeedPage() {
  return <h1>Feed Page</h1>;
}
```

```tsx
// app/(.)post/[id]/page.tsx` (Intercepts from `/feed` and renders a modal)

export default function PostModal({ params }) {
  return <div className="modal">Post ID: {params.id}</div>;
}
```
✅ **Visiting `/feed/123` in `/feed` shows the modal instead of full navigation.**  

</details>

<br>
<br>

### **Example 2: One-Level Interception (`(..)folder`)**  
**Scenario:** Clicking on a product inside `/shop` should open a modal inside `/dashboard`, instead of navigating away.

<details>

```
/app
  /shop
    page.tsx  → Renders `/shop`
    /products
      [id]
        page.tsx → Normal `/shop/products/:id`
  /dashboard
    page.tsx  → Renders `/dashboard`
    /(..)products
      [id]
        page.tsx → Intercepts `/shop/products/:id` and opens in `/dashboard`
```

```tsx
// app/dashboard/(..)products/[id]/page.tsx
export default function ProductModal({ params }) {
  return <div className="modal">Product ID: {params.id}</div>;
}
```
✅ **Visiting `/shop/products/42` while in `/dashboard` opens a modal instead of a new page.**  
</details>

<br>
<br>

### **Example 3: Root-Level Interception (`(...)folder`)**  
- Used when you want to **render a different page while keeping the user in the current route**.  
<details>

```
/app
  /about
    page.tsx → Renders `/about`
  /(...)privacy
    page.tsx → Intercepts `/privacy` and shows in `/about`
```
✅ **Visiting `/privacy` inside `/about` will keep you on `/about` while rendering the privacy page.**  
</details>

<br>
<br>

### Component hierarchy
components in special files of a route segment are rendered in a specific order.

- layout.js
- template.js
- error.js (React error boundary)
- loading.js (React suspense boundary)
- not-found.js (React error boundary)
- page.js or nested layout.js

![BOM](/images/hierarchy1.avif)

<br>

In a nested route, the components of a segment will be nested inside the components of its parent segment.

![BOM](/images/hierarchy2.avif)

<br>
<br>

### Colocation

However, even though route structure is defined through folders, a route is `not publicly accessible` until a `page.js(for UI) or route.js(for API)` file is added to a route segment. This means that `project files` can be `safely colocated` inside route segments in the app directory without accidentally being routable.


![BOM](/images/colocation.avif)

<br>
<br>

### Navigation in route through 
```js
<Link href={/blog/${post.slug}}>{post.title}</Link>
```

<br>
<br>

### Scrolling to an id

If you'd like to scroll to a specific `id` on navigation, you can append your URL with a `#` hash link or just pass a hash link to the `href` prop

```js
<Link href="/dashboard#settings">Settings</Link>
 
// Output
<a href="/dashboard#settings">Settings</a>
```
<br>
<br>

### Disabling scroll restoration

- The default behavior of the Next.js App Router is to `scroll to the top of a new route or to maintain the scroll position for backwards and forwards navigation`.
- If you'd like to disable this behavior, you can pass `scroll={false}` to the `<Link>` component, or `scroll: false` to `router.push()` or `router.replace()`.


```js
// next/link
<Link href="/dashboard" scroll={false}>
  Dashboard
</Link>
```

```js
// useRouter
import { useRouter } from 'next/navigation'
 
const router = useRouter()
 
router.push('/dashboard', { scroll: false })
```


<br>
<br>

### Optimizing image

```
https://nextjs.org/docs/14/app/api-reference/components/image
```
<br>

- We can optimize image using the next/image
- We have loader and loaderFile function in next/image, which helps in customizing the image url

```js
import Image from 'next/image'
 
export default function Page() {
    return <Image src="" alt="" />
}
```
<br>

<details>

#### Importing Local images

Next.js will automatically determine the intrinsic `width` and `height` of your image based on the imported file. These values are used to determine the image ratio and prevent Cumulative Layout Shift while your image is loading.

```js
// app/page.tsx
import Image from 'next/image'
import profilePic from './me.png'
 
export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
  )
}
```
<br>

#### Priority prop

```js
priority={false} // {false} | {true}
```
- When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
- true for logo image, in which we don't need the lazy loading

<br>

#### Importing Remote images

Since Next.js does not have access to remote files during the build process, you'll need to provide the `width, height and optional blurDataURL props manually`. The width and height attributes are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in.

```jsx
// app/page.tsx
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```
<br>

Then, to safely allow images from remote servers, you need to define a list of supported URL patterns in `next.config.js`. Be as specific as possible to prevent malicious usage. For example, the following configuration will only allow images from a specific AWS S3 bucket:

in next.config.ts
```js
import { NextConfig } from 'next'
 
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
}
 
export default config
```

</details>

<br>
<br>

## Optimizing fonts

The `next/font` module automatically optimizes your fonts and removes external network requests for improved privacy and performance.

It includes `built-in automatic self-hosting` for any font file. This means you can optimally load web fonts with no layout shift.

To start using `next/font`, import it from `next/font/local` or `next/font/google`, call it as a function with the appropriate options, and set the `className` of the element you want to apply the font to. For example:

```js
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

<br>


### Google fonts

<details>

You can automatically self-host any Google Font. Fonts are included in the deployment and served from the same domain as your deployment, meaning no requests are sent to Google by the browser when the user visits your site.

To start using a Google Font, import your chosen font from next/font/google:

```js
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```
</details>

<br>

### Local fonts

<details>

To use a local font, import your font from next/font/local and specify the src of your local font file in the public folder.

```js
import localFont from 'next/font/local'
 
const myFont = localFont({
  src: './my-font.woff2',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

</details>

<br>
<br>

## Meta data updation
- Metadata can be `provided in` the `page.js` and `layout.js`
- The `metadata object and generateMetadata function` exports are only `supported in Server Components`.
- You `cannot export` `both` the metadata `object and generateMetadata function` from the `same route segment`.

<br>

1. **For static pages, we use meta data object**

  ```js
  // layout.js | page.js
  export const metadata = {
    title: '...',
    description: '...',
  }
  
  export default function Page() {}
  ```

<br>

2. **For dynamic websites we use generateMetadata function**

- It should return an object

  ```js
  // app/products/[id]/page.js
  export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const { id } = await params
  
    // fetch data
    const product = await fetch(`https://.../${id}`).then((res) => res.json())
  
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
  
    return {
      title: product.title,
      openGraph: {        // This is how we can add the OG Details
        title: 'Acme',
        description: 'Acme is a...',
        images: ['/some-specific-page-image.jpg', ...previousImages],
      },
    }
  }
  
  export default function Page({ params, searchParams }) {}
  ```


<br>

more on below

```
https://nextjs.org/docs/app/api-reference/functions/generate-metadata
https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata
```

<br>
<br>

## Redirection


### 1. Redirects in next.config.js

- Redirects runs before Middleware.

```js
// next.config.js
module.exports = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      // Wildcard path matching
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
    ]
  },
}
```

<br>

### 2. Redirection in middleware.js

**NextResponse.redirect in Middleware**
- This is useful if you want to `redirect` users `based on a condition` (e.g. authentication, session management, etc) or have a large number of redirects.
- Middleware `runs after redirects` in `next.config.js` and `before rendering`.
- For `example`, to `redirect the user to a /login page` if they are `not authenticated`

```js
// middleware.ts
import { NextResponse, NextRequest } from 'next/server'
import { authenticate } from 'auth-provider'
 
export function middleware(request: NextRequest) {
  const isAuthenticated = authenticate(request)
 
  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next()
  }
 
  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: '/dashboard/:path*',
}
```

<br>

### 3. Redirection in Server components
```js
// app/team/[id]/page.js
import { redirect } from 'next/navigation'
 
async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
 
export default async function Profile({ params }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }
 
  // ...
}
```

<br>

### 4. Redirection on client side
- redirect can be used in a Client Component through a Server Action. If you need to use an event handler to redirect the user, you can use the useRouter hook.
```js
// app/client-redirect.jsx
'use client'
 
import { navigate } from './actions'
 
export function ClientRedirect() {
  return (
    <form action={navigate}>
      <input type="text" name="id" />
      <button>Submit</button>
    </form>
  )
}


// app/actions.js
'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(data) {
  redirect(`/posts/${data.get('id')}`)
}
```

<br>

**Props in redirect of server and client side component**
```js
redirect(path, type)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | `string` | The URL to redirect to. Can be a relative or absolute path. |
| `type` | `'replace'` (default) or `'push'` (default in Server Actions) | The navigation type. |

<br>
<br>

## Next.js Route Handlers

### What are Route Handlers?
Route Handlers let you create custom API endpoints **inside the `app` directory** using Web APIs (`Request`, `Response`).

Route Handlers in Next.js `replace API routes` and allow you to create custom backend logic inside the `/app/api` directory. They handle HTTP requests (GET, POST, PUT, DELETE, etc.) `without needing an external backend`.

✅ **Equivalent to API Routes in the pages directory**  
🚫 **Cannot use API Routes & Route Handlers together**  

<br>

<details>

**Route Handler File: `route.js`**  
- Located inside `/app/api/`
- Defines backend logic for that route  
- Cannot exist at the same level as `page.js`  

📂 Folder Structure:
```
/app
  /api
    /users
      route.js   → Handles `/api/users`
```

<br>

**Basic Route Handler**
```js
// app/api/users/route.js
export async function GET(request) {
  console.log(request)
  return Response.json({ message: "Hello, Next.js!" });
}
```

- In browser just hit, localhost:3000/api/users, you will see the console value
- we have to always return response object

<br<

**Example: Handling Multiple Methods**  
```js
export async function GET() {
  return Response.json({ message: "GET request received" });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ message: `POST request received: ${body.name}` });
}
```

<br>

**Route Parameters & Query Parameters**  
- Extract route parameters from `{ params }`  
- Extract query parameters using `request.nextUrl.searchParams`


**Example: Dynamic Route (`/api/users/:id`)**
```js
export async function GET(_, { params }) {
  return Response.json({ id: params.id, name: `User ${params.id}` });
}
```
🟢 `GET /api/users/5` → `{ id: "5", name: "User 5" }`  

<br>

**Example: Query Parameters (`?search=hello`)**
```js
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("search");
  return Response.json({ query });
}
```
🟢 `GET /api/search?search=hello` → `{ query: "hello" }`  

<br>
<br>

**Request Body Handling**  
```js
export async function POST(request) {
  const data = await request.json();
  return Response.json({ received: data });
}
```

<br>
<br>

### Caching & Revalidation

#### Default: `GET` requests are `cached`

- Let say on single route, we have two component, and both component we calling same get api, instead of calling the api 2 times, next js will call one time and cache it and serve data to both component, even you navigate to other page and come again on same page, then it will not call even 1 time, it will use cache

### **Example: Cached Data (Revalidate every 60s)**
```js
export async function GET() {
  const res = await fetch("https://data.mongodb-api.com/...", {
    next: { revalidate: 60 },
  });
  return Response.json(await res.json());
}
```

Alternatively, you can use the revalidate segment config option:

```js
export const revalidate = 60
```

<br>
<br>

### Cookies & Headers

```js
// app/api/route.js
import { cookies } from 'next/headers'
 
export async function GET(request) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
 
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}` },
  })
}
```


```js
// app/api/route.js
export async function GET(request) {
  const token = request.cookies.get('token')
}
```
</details>
<br>
<br>

## Reading Headers
```js
// app/page.js

import { Suspense } from 'react'
import { headers } from 'next/headers'
 
async function User() {
  const authorization = headers().get('authorization')
  const res = await fetch('...', {
    headers: { authorization }, // Forward the authorization header
  })
  const user = await res.json()
 
  return <h1>{user.name}</h1>
}
 
export default function Page() {
  return (
    <Suspense fallback={null}>
      <User />
    </Suspense>
  )
}
```

Various header method

- Headers.entries()
- Headers.forEach()
- Headers.get()
- Headers.has()
- Headers.keys()
- Headers.values()

<br>
<br>

## Streaming (For Large Responses or AI APIs)

<details>

```js
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  return new StreamingTextResponse(OpenAIStream(response));
}
```
- Used for **real-time AI-generated content**  

<br>

```js
// app/api/chat/route.js
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
 
export const runtime = 'edge'
 
export async function POST(req) {
  const { messages } = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })
 
  const stream = OpenAIStream(response)
 
  return new StreamingTextResponse(stream)
}
```

These abstractions use the Web APIs to create a stream. You can also use the underlying Web APIs directly.

```js
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream


// app/api/route.js
function iteratorToStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()
 
      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}
 
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
 
const encoder = new TextEncoder()
 
async function* makeIterator() {
  yield encoder.encode('<p>One</p>')
  await sleep(200)
  yield encoder.encode('<p>Two</p>')
  await sleep(200)
  yield encoder.encode('<p>Three</p>')
}
 
export async function GET() {
  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)
 
  return new Response(stream)
}
```

</details>

<br>
<br>

## Data Fetching, Caching, and Revalidating

To call api on `server side` you can use `fetch directly` but on `client side` you have to `use-effect` and `inside` you can `call the api`

### In server component ie page.js, we directly await the api call function, 
<details>

```js
// app/page.js

async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main></main>
}
```
</details>
<br>

### Client-Side Fetching with `useEffect`

<details>

```js
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```
</details>
<br>

### Hybrid Approach: Server + Client Fetching
- You can **preload data on the server** and **fetch additional data on the client**.

<details>

```tsx
// app/page.js (Server Component)
import ClientComponent from "./ClientComponent";

export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await res.json();

  return <ClientComponent post={post} />;
}
```

```tsx
// app/ClientComponent.js (Client Component)
"use client";

import { useState, useEffect } from "react";

export default function ClientComponent({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [post.id]);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h2>Comments:</h2>
      {comments.length > 0
        ? comments.map((c) => <p key={c.id}>{c.body}</p>)
        : "Loading..."}
    </div>
  );
}
```
</details>
<br>
<br>

## Caching Data in Next.js

Next.js extends the `native Web fetch()` API to allow each request on the server to set its own persistent caching semantics.

Next.js **automatically caches `fetch` requests** to optimize performance and reduce redundant API calls. By default, when you use `fetch`, it **stores the response in a Data Cache** on the server, allowing **subsequent requests to reuse the cached data**.

```js
fetch(`https://...`, { cache: 'force-cache' | 'no-store' })
```

<br>

Note: If you don't provide a cache option, Next.js will `default` to `force-cache`, unless a dynamic function such as `cookies()` is used, in which case it will default to `no-store`.

<br>

### 1. Default Caching Behavior (`force-cache`)
By default, **Next.js caches all `fetch` requests on the server**, meaning:
- The response **does not need to be fetched again** on every request.
- Cached data is reused until it **expires** or is manually refreshed.


```javascript
fetch('https://api.example.com/data', { cache: 'force-cache' });
```
<br>

```js
export default async function Page() {
  // This request should be cached until manually invalidated.
  
  // `force-cache` is the default and can be omitted.
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })
 
  // This request should be refetched on every request.
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })
 
  // This request should be cached with a lifetime of 10 seconds.
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })
 
  return <div>...</div>
}
```

<br>

### 2. When `fetch` is NOT Cached**

There are **exceptions** where `fetch` does **not** use caching:

<br>

-  **Inside a Server Action**

Server Actions run **on-demand** and are meant for dynamic, interactive behavior.\
Since they can modify data, caching would cause stale results.

```javascript
"use server";

export async function createUser(data) {
  const res = await fetch('https://api.example.com/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
}
```
❌ The `fetch` request here is **not cached** because **Server Actions require fresh data**.

<br>

- **Inside a Route Handler using `POST`**

Route Handlers (`app/api`) handle requests dynamically.

```javascript
export async function POST(request) {
  const data = await request.json();
  
  const response = await fetch('https://api.example.com/process', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return Response.json(await response.json());
}
```
This `fetch` **will not be cached** because:
- `POST` requests are **meant to mutate data**.
- Caching could **return outdated results**.

<br>
<br>

### Revalidating Data
Revalidation is the process of purging the Data Cache and re-fetching the latest data.

<br>

> ### 1. **Time-based Revalidation**

Time-based revalidation in Next.js ensures that cached data is **refreshed periodically** instead of being permanently stored.

```js
fetch(`https://...`, { next: { revalidate: false | 0 | number } })
```
<br>

- `false` - Cache the resource indefinitely. Semantically equivalent to revalidate: Infinity. The HTTP cache may evict older resources over time.
- `0` - Prevent the resource from being cached.
- `number` - (in seconds) Specify the resource should have a cache lifetime of at most n seconds.

<br>

**How It Works**
- When you fetch data with `revalidate`, Next.js **stores it in the cache**.
- After the specified time (in seconds), the cache **becomes stale**.
- The next request **triggers a re-fetch** to update the cache while still serving stale data until fresh data arrives.

<br>

**Example: Revalidate Every 10 Seconds**
```javascript
export default async function Page() {
  const res = await fetch("https://api.example.com/data", { next: { revalidate: 60 } });
  const data = await res.json();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

<br>

Inside an API route (`app/api/data/route.js`):
```javascript
export async function GET() {
  const res = await fetch("https://api.example.com/data", { next: { revalidate: 30 } });
  const data = await res.json();

  return Response.json(data);
}
```

- The data is cached for **60 seconds**.  
- Any request within **60 seconds** uses the cached data.  
- After **60 seconds**, the next request **re-fetches the data** and updates the cache.

<br>

**Alternatively**, to revalidate all fetch requests in a route segment, you can use

```js
// layout.js | page.js
export const revalidate = 3600 // revalidate at most every hour
```

<br>

**Note**
- If an individual `fetch()` request sets a `revalidate` number lower than the `default revalidate` of a `route`, the whole route revalidation interval will be decreased.
- If two fetch requests with the same URL in the same route have different `revalidate` values, the lower value will be used.
- As a convenience, it is not necessary to set the `cache` option if `revalidate` is set to a number since `0` implies `cache: 'no-store'` and a positive value implies `cache: 'force-cache'`.
- Conflicting options such as `{ revalidate: 0, cache: 'force-cache' }` or `{ revalidate: 10, cache: 'no-store' }` will cause an error.

<br>

**🚀 Summary**
| Approach | Caching? | Revalidation? |
|----------|---------|--------------|
| `fetch(url)` (default) | ✅ Yes | ❌ No, always cached |
| `fetch(url, { cache: 'no-store' })` | ❌ No | ❌ Always fresh |
| `fetch(url, { next: { revalidate: 10 } })` | ✅ Yes | ✅ Every 10 sec |

<br>
<br>

> ### 2. **On-demand Revalidation**

On demand can be of two types.
1. Using tags.
2. Using directly.


<br>

**Using Tag**

Tag is like creating a group of revalidatepaths which we need to revalidate

Below is for adding the tags
```js
// app/page.js
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```

<br>

Now revalidate fetch call tagged with `collection` by calling `revalidateTag` in a Server Action:

```js
// app/actions.js
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function submit() {
  await addPost()
  revalidateTag('posts')
}
```

```js
// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache'
 
export async function GET(request) {
  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now() })
}
```

<br>

**Note: Error handling on revalidation**

If an error is thrown while attempting to revalidate data, the last successfully generated data will continue to be served from the cache. On the next subsequent request, Next.js will retry revalidating the data.

<br>

### Opting out of Data Caching
fetch requests are not cached if:

- The cache: 'no-store' is added to fetch requests.
  layout.js | page.js
  ```js
  fetch('https://...', { cache: 'no-store' })
  ```

- The revalidate: 0 option is added to individual fetch requests.
- The fetch request is inside a Router Handler that uses the POST method.
- The fetch request comes after the usage of headers or cookies.
- The const dynamic = 'force-dynamic' route segment option is used.
- The fetchCache route segment option is configured to skip cache by default.
- The fetch request uses Authorization or Cookie headers and there's an uncached request above it in the component tree.

<br>
<br>

## Server Actions and Mutations

- Server Actions are `asynchronous functions` that are `executed on the server`. They can be `called in Server and Client Components` to `handle form submissions and data mutations` in Next.js applications.

- A Server Action can be defined with the React `"use server"` directive. You can place the directive at the top of an `async` function to mark the function as a Server Action, or at the top of a separate file to mark all exports of that file as Server Actions.

- basically when we do create form, then we have the action thing in html, then that is client side but this time we need this action to be on server side, and action is async in nature so we needed the server action. In short form submissions on server side is called the server actions


```js
// app/page.jsx (Server Component)

export default function Page() {
  // Server Action
  async function create() {
    'use server'
 
    // ...
  }
 
  return (
    // ...
  )
}
```
<br>

**Implementation**

React extends the HTML `<form>` element to allow Server Actions to be invoked with the `action` prop.

When invoked in a form, the action automatically receives the `FormData` object. You `don't need` to use React `useState` to manage fields, instead, you can extract the data using the native `FormData methods like FormData.get()` more method on `https://developer.mozilla.org/en-US/docs/Web/API/FormData#instance_methods`

```js
// app/invoices/page.js

export default function Page() {
  async function createInvoice(formData) {  // 'use server' & async keyword is mandatory to create createInvoice function as server action
    'use server'                            // server fuction receives the formData object by default.
 
    const rawFormData = {
      customerId: formData.get('customerId'), // customerId will be input name
      amount: formData.get('amount'), // amount will be input name
      status: formData.get('status'), // status will be input name
    }
 
    // mutate data
    // revalidate cache
  }
 
  return 
  <form action={createInvoice}>
      <input type="text" name="customerId" />
      <input type="text" name="amount" />
      <button type="submit">Update User Name</button>
  </form>
}
```
<br>

### Server action for Non-form Elements

While it's common to use Server Actions within `<form>` elements, they can also be invoked from other parts of your code such as event handlers and `useEffect`.


1. Example of non-form element like Event Handlers
```js
// app/like-button.js

'use client'
 
import { incrementLike } from './actions'
import { useState } from 'react'
 
export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
 
  return (
    <>
      <p>Total Likes: {likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}
      >
        Like
      </button>
    </>
  )
}
```

2. Example of non-form element like onChange

```js
// app/ui/edit-post.tsx

'use client'
 
import { publishPost, saveDraft } from './actions'
 
export default function EditPost() {
  return (
    <form action={publishPost}>
      <textarea
        name="content"
        onChange={async (e) => {
          await saveDraft(e.target.value)
        }}
      />
      <button type="submit">Publish</button>
    </form>
  )
}
```

more on server action - https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations


<br>

## Various hooks used in forms

### 1. `useFormStatus` Hook in Next.js

It allows you to:  
- Detect if a form is **submitting** (`pending` state).  
- Show **loading indicators** or **disable buttons** while submitting.  
- Improve **user experience** by handling async form interactions properly.

<br>

```tsx
"use client";   // this is because hook using below

import { useFormStatus } from "react-dom";

function SubmitButton() {  // this part need to be created separately because we are using hook, so need to add "use client"
  const { pending } = useFormStatus(); // Get form status

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default function Form() {
  async function submitAction(formData) {
    "use server"; // Server Action
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    console.log("Form submitted:", formData.get("name"));
  }

  return (
    <form action={submitAction}>
      <input type="text" name="name" placeholder="Enter name" required />
      <SubmitButton />
    </form>
  );
}
```
<br>

**Why Use `useFormStatus`?**
- **Eliminates extra state management** (`useState` for loading not needed).  
- **Optimized for Server Actions** (no need for `useEffect` or API calls).  


you can do in below form also

<details>

```js
// app/submit-button.jsx

'use client'
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" disabled={pending}>
      Add
    </button>
  )
}
```


```js
// app/page.jsx

import { SubmitButton } from '@/app/submit-button'
import { createItem } from '@/app/actions'
 
// Server Component
export default async function Home() {
  return (
    <form action={createItem}>
      <input type="text" name="field-name" />
      <SubmitButton />
    </form>
  )
}
```
</details>

<br>
<br>

### 2. `useActionState` Hook in Next.js (earlier it was known as useFormState)
The `useActionState` hook in **Next.js (App Router)** is used to manage **form state** in Client Components when using **Server Actions**.  

It helps with:  
- **Managing form submission state** (loading, success, error).  
- **Updating UI reactively** based on the form's response.  
- **Eliminating the need for `useState` for form data handling**.  


```tsx
"use client";

import { useActionState } from "react";

async function submitAction(prevState, formData) {  // keep in mind that first argument is prevstate not formdata, if we have used directly server
                                                    // action then we get the formdata as first argument

  "use server"; // Server Action
  const name = formData.get("name");

  if (!name) {
    return { error: "Name is required!" };
  }

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
  return { success: `Form submitted with name: ${name}` };
}



export default function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, null);  // formAction will be whatever returned by submitAction when it gets completed

  return (
    <form action={formAction}>  {/* keep in mind here we are using formAction not submitAction*/}
      <input type="text" name="name" placeholder="Enter name" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.success}</p>}
    </form>
  );
}
```
<br>

**How It Works**

1️⃣ **`useActionState(submitAction, initialState)`**  
   - Tracks form state based on the **Server Action (`submitAction`)**.  
   - `initialState` is `null` at the start.  

2️⃣ **Returned values from `useActionState`**  
   - `state` → Stores the **returned response** from the action (success/error).  
   - `formAction` → The function to trigger the Server Action.  
   - `isPending` → Boolean flag (`true` while submitting).  

3️⃣ **Handles Form Submission with Server Actions**  
   - If validation **fails**, an error message appears.  
   - If submission **succeeds**, a success message appears.  
 
<br>
<br>

### 3. usePathname

The `usePathname` hook is part of **Next.js (App Router)** and is used to **get the current URL path** in a React component.

```jsx
"use client";

import { usePathname } from "next/navigation";

export default function CurrentPath() {
  const pathname = usePathname();

  return <p>Current Path: {pathname}</p>;
}
```

**Example Output:**  
If the user is on `/dashboard`, it will display:
```
Current Path: /dashboard
```
<br>

**Example: Highlighting Active Links**
<details>

```jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className={pathname === "/" ? "text-blue-500" : ""}>
        Home
      </Link>
      <Link href="/about" className={pathname === "/about" ? "text-blue-500" : ""}>
        About
      </Link>
    </nav>
  );
}
```
</details>
<br>

**Note:** next/link will be same as nuxt link, but when child component have anchor(`<a></a>`) tag then we have different implementaion. below is url for detail
```
https://nextjs.org/docs/14/app/api-reference/components/link
```

`Note:` Does Not Include Query Params (`?id=123`)
- If you need query params, use `useSearchParams()`.  

<br>
<br>

### 4. `RevalidatePath` in Next.js

`revalidatePath` is a **Server Action utility** in Next.js used to **manually revalidate cached data** for a `specific route`.

**Eg:** get api gets cached on home page, you updated the data of homepage in db, but changes will not reflected, so you need to run this function after succesfull response of api which updates the db

Basically `next cached the whole page`, when we update the db through api call, then we have to revalidatepath, so that next just dump the cache and make new page with updated data

It helps when:  
- You **mutate data** (e.g., after a form submission or database update).  
- You want to **force fetch updated content** from a Server Component.  
- You need to **bypass Next.js caching** for a particular route.  

```js
revalidatePath(path: string, type?: 'page' | 'layout'): void;
```
<br>

**Revalidating A Specific URL**
```js
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/post-1')
```

<br>

**Revalidating A Page Path**
```js
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'page')
// or with route groups
revalidatePath('/(main)/blog/[slug]', 'page')
```

This will revalidate any URL that matches the provided `page` file on the next page visit. This will not invalidate pages beneath the specific page. For example, `/blog/[slug]` won't invalidate `/blog/[slug]/[author]`.

<br>

**Revalidating A Layout Path**
```js
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'layout')
// or with route groups
revalidatePath('/(main)/post/[slug]', 'layout')
```

This will revalidate any URL that matches the provided `layout` file on the next page visit. This will cause pages beneath with the same layout to revalidate on the next visit. For example, in the above case, `/blog/[slug]/[another]` would also revalidate on the next visit.

<br>

**Revalidating All Data**
```js
import { revalidatePath } from 'next/cache'
 
revalidatePath('/', 'layout')
```


```tsx
"use server";

import { revalidatePath } from "next/cache";

export async function addItem(prevState, formData) {
  const item = formData.get("item");

  if (!item) {
    return { error: "Item cannot be empty!" };
  }

  // Simulate adding data to a database
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Revalidate the `/items` page to fetch new data
  revalidatePath("/items");

  return { success: "Item added successfully!" };
}
```

<br>
<br>

### 5. `useOptimistic` in Next.js 13+ (React 18)
`useOptimistic` is a React Hook used with Server Actions to handle **optimistic UI updates**. It allows you to update the UI immediately before receiving a response from the server, making interactions feel more responsive.

<br>

**Basic Syntax**
```tsx
const [optimisticState, setOptimisticState] = useOptimistic(  // setOptimisticState to trigger update function
  state, // initial state
  (currentState, newValue) => newValue // update function which gets newValue when setOptimisticState(newValue) called
);
```

<br>

**Example: Optimistic Counter (Client Component)**
```tsx
"use client";

import { useOptimistic, useState } from "react";

export default function OptimisticCounter() {
  const [count, setCount] = useState(0);

  // Define optimistic state
  const [optimisticCount, setOptimisticCount] = useOptimistic(count, (state, newValue) => state + newValue);

  const increment = async () => {
    setOptimisticCount(1); // Optimistically update the UI

    // Simulate a delayed server response
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCount((prev) => prev + 1); // Update real state when server responds
  };

  return (
    <div>
      <h1>Optimistic Count: {optimisticCount}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```
<br>

**How It Works**
- `useOptimistic` stores an **optimistic version** of `count`.
- `setOptimisticCount(1)` immediately updates the UI **before** waiting for the server.
- The actual `setCount` updates after the simulated server delay.

<br>

**Example: Optimistic Update with Server Action**

**1. Server Action (Server Component)**
```tsx
"use server";

export async function updateLikes(postId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate server delay
  return { success: true };
}
```

**2. Client Component with Optimistic UI**
```js
"use client";

import { useOptimistic, useState } from "react";
import { updateLikes } from "./actions";

export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes, (state, newValue) => state + newValue);

  const handleLike = async () => {
    setOptimisticLikes(1); // Optimistic UI update
    await updateLikes("post-123"); // Call Server Action
    setLikes((prev) => prev + 1); // Actual state update
  };

  return (
    <div>
      <p>Likes: {optimisticLikes}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}
```
<br>

**When to Use `useOptimistic`?**
- Optimistic UI updates (likes, counters, form submissions).
- Avoiding unnecessary loading indicators.
- Making UI feel snappier in async actions.

<br>

**Alternatives**
If you're not using `useOptimistic`, you can achieve similar results with **`useState`** and **optimistic updates manually**. However, `useOptimistic` provides a cleaner and more declarative way to handle optimistic UI in Next.js.

<br>
<br>

### 6. useParams

useParams is a `Client Component` hook that lets you read a route's dynamic params filled in by the current URL.

```js
// app/example-client-component.js
'use client'
 
import { useParams } from 'next/navigation'
 
export default function ExampleClientComponent() {
  const params = useParams()
 
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params)
 
  return <></>
}
```
<br>

| Route | URL | `useParams()` |
|--------|----|--------------|
| app/shop/page.js | /shop | {} |
| app/shop/[slug]/page.js | /shop/1 | { slug: '1' } |
| app/shop/[tag]/[item]/page.js | /shop/1/2 | { tag: '1', item: '2' } |
| app/shop/[...slug]/page.js | /shop/1/2 | { slug: ['1', '2'] } |


<br>

### 7. useRouter

- most of things we get using usePathname and useParams
- The useRouter hook allows you to programmatically change routes inside `Client Components`.

```js
// app/example-client-component.js

'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

#### other mehods of useRouter
- router.push(href: string, { scroll: boolean })
- router.replace(href: string, { scroll: boolean })
- router.refresh()
- router.back()
- router.forward()

<br>
<br>

## Props in page.js

In page.js, `params` and `searchparams` are `available`, both are `optional`

```js
// app/blog/[slug]/page.js

export default function Page({ params, searchParams }) {
  return <h1>My Page</h1>
}
```
<br>

**params**
| Example                                  | URL         | `params`                          |
|------------------------------------------|-------------|------------------------------------|
| `app/shop/[slug]/page.js`               | `/shop/1`    | `{ slug: '1' }`                   |
| `app/shop/[category]/[item]/page.js`    | `/shop/1/2`  | `{ category: '1', item: '2' }`    |
| `app/shop/[...slug]/page.js`            | `/shop/1/2`  | `{ slug: ['1', '2'] }`            |

<br>

**searchParams**

| URL                | `searchParams`            |
|--------------------|---------------------------|
| `/shop?a=1`        | `{ a: '1' }`              |
| `/shop?a=1&b=2`    | `{ a: '1', b: '2' }`      |
| `/shop?a=1&a=2`    | `{ a: ['1', '2'] }`       |

<br>
<br>

### Cookies in pages
```js
import { cookies } from 'next/headers'
 
export default function Page() {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```
<br>

**Various method of cookies**

- cookies().get(name)
- cookies().getAll()
- cookies().has(name)
- cookies().set(name, value, options)   

<br>

Setting value in cookies
```js
cookies().set({
  name: 'name',
  value: 'lee',
  httpOnly: true,
  path: '/',
  maxAge: 0,
  expires: Date.now(),
})
```
- cookies().delete(name)

<br>
<br>

### Dynamic Image Generation

<details>

- The `ImageResponse` constructor allows you to generate `dynamic images` using JSX and CSS
- useful for `creating social media images` such as Open Graph images, Twitter cards, and more.

```js
// app/about/route.js
// browser url - http://localhost:3000/about
import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello world!
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}

```
</details>

<br>
<br>

### JSON-LD

recommendation for JSON-LD is to render structured data as a `<script>` tag in your `layout.js or page.js` components

<details>

```js
// app/products/[id]/page.js
export default async function Page({ params }) {
  const product = await getProduct(params.id)
 
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  }
 
  return (
    <section>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  )
}
```
</details>

<br>
<br>

## Metadata Files

### favicon, icon, and apple-icon

There are two ways to set app icons:

#### 1. Using image files (.ico, .jpg, .png)

Use an image file to set an app icon by placing a favicon, icon, or apple-icon image file within your `/app` directory

| File Convention | Supported File Types               | Valid Locations   |
|-----------------|------------------------------------|-------------------|
| `favicon`       | `.ico`                             | `app/`            |
| `icon`          | `.ico`, `.jpg`, `.jpeg`, `.png`, `.svg` | `app/**/*`        |
| `apple-icon`    | `.jpg`, `.jpeg`, `.png`            | `app/**/*`        |


#### 2. Using code to generate an icon (.js, .ts, .tsx)

| File Convention | Supported File Types     |
|-----------------|--------------------------|
| `icon`          | `.js`, `.ts`, `.tsx`     |
| `apple-icon`    | `.js`, `.ts`, `.tsx`     |

The easiest way to generate an icon is to use the `ImageResponse API` from `next/og`.

<details>

```js
// app/icon.js

import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image size
export const size = {
  width: 32,
  height: 32,
}

// contentType
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        A
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
```

Note: You cannot generate a `favicon` icon. Use `icon or a favicon.ico` file instead.

For dynamic path

```js
// app/shop/[slug]/icon.js

export default function Icon({ params }) {
  // ...
}
```

| Route                             | URL         | params                          |
|-----------------------------------|-------------|----------------------------------|
| app/shop/icon.js                  | /shop       | undefined                        |
| app/shop/[slug]/icon.js           | /shop/1     | { slug: '1' }                    |
| app/shop/[tag]/[item]/icon.js     | /shop/1/2   | { tag: '1', item: '2' }          |
| app/shop/[...slug]/icon.js        | /shop/1/2   | { slug: ['1', '2'] }             |

</details>

<br>
<br>

### Opengraph-image and twitter-image

There are two ways to set Open Graph and Twitter images:

- Using image files (.jpg, .png, .gif)
- Using code to generate images (.js, .ts, .tsx)

#### Image files (.jpg, .png, .gif)

add image name  below in particlar route

| File Convention       | Supported File Types            |
|-----------------------|---------------------------------|
| opengraph-image       | .jpg, .jpeg, .png, .gif         |
| twitter-image         | .jpg, .jpeg, .png, .gif         |
| opengraph-image.alt   | .txt                            |
| twitter-image.alt     | .txt                            |


#### Generate images using code (.js, .ts, .tsx)

| File Convention   | Supported File Types     |
|-------------------|--------------------------|
| opengraph-image   | .js, .ts, .tsx           |
| twitter-image     | .js, .ts, .tsx           |

<details>

```js
// app/about/opengraph-image.js

import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  // Font
  const interSemiBold = fetch(
    new URL('./Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        About Acme
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
```

or for some dynamic route

```js
// app/posts/[slug]/opengraph-image.js

import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image({ params }) {
  const post = await fetch(`https://.../posts/${params.slug}`).then((res) =>
    res.json()
  )
 
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post.title}
      </div>
    ),
    {
      ...size,
    }
  )
}

```
</details>

if needed more - https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image

<br>
<br>

### Robots.txt

- **Adding Static robots.txt**


in app/robots.txt
```txt
User-Agent: *
Allow: /
Disallow: /private/

Sitemap: https://acme.com/sitemap.xml
```

- **Generate a Robots file**

in app/robots.js

```js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
```
<br>
<br>

### Sitemap.xml

sitemap.(xml|js|ts) is a special file that matches the Sitemaps XML format to help search engine crawlers index your site more efficiently.

**Static file**

<details>

```xml
<!-- app/sitemap.xml -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```
</details>

<br>

**Generating a sitemap using code (.js, .ts)**

<details>

```js
// app/sitemap.js

export default function sitemap() {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
```
</details>

more on - https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/sitemap

if you want dynamic sitemap - https://nextjs.org/docs/14/app/api-reference/functions/generate-sitemaps

<br>
<br>

### Manifest.json

In a web app (especially a PWA – Progressive Web App), the manifest.json file is used to tell the browser how your app should behave when installed on a user's device.

**Static Manifest file**

```js
// app/manifest.json | app/manifest.webmanifest

{
  "name": "My Next.js Application",
  "short_name": "Next.js App",
  "description": "An application built with Next.js",
  "start_url": "/"
  // ...
}
```


**Generate a Manifest file**

Add a manifest.js or manifest.ts file that returns a Manifest object.

<details>

```js
// app/manifest.js

export default function manifest() {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

```
</details>

<br>
<br>

## GenerateImageMetadata

You can use generateImageMetadata to generate different versions of one image or return multiple images for one route segment. This is useful for when you want to avoid hard-coding metadata values, such as for icons.

**params (optional)**

```js
// icon.js

export function generateImageMetadata({ params }) {
  // ...
}
```


| Route                               | URL         | params                          |
|-------------------------------------|-------------|----------------------------------|
| app/shop/icon.js                    | /shop       | undefined                        |
| app/shop/[slug]/icon.js             | /shop/1     | { slug: '1' }                    |
| app/shop/[tag]/[item]/icon.js       | /shop/1/2   | { tag: '1', item: '2' }          |
| app/shop/[...slug]/icon.js          | /shop/1/2   | { slug: ['1', '2'] }             |

<details>

```js
// icon.js

import { ImageResponse } from 'next/og'
 
export function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 48, height: 48 },
      id: 'small',
    },
    {
      contentType: 'image/png',
      size: { width: 72, height: 72 },
      id: 'medium',
    },
  ]
}
 
export default function Icon({ id }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 88,
          background: '#000',
          color: '#fafafa',
        }}
      >
        Icon {id}
      </div>
    )
  )
}
```

Examples

Using external data

This example uses the params object and external data to generate multiple Open Graph images for a route segment.

```js
// app/products/[id]/opengraph-image.js

import { ImageResponse } from 'next/og'
import { getCaptionForImage, getOGImages } from '@/app/utils/images'
 
export async function generateImageMetadata({ params }) {
  const images = await getOGImages(params.id)
 
  return images.map((image, idx) => ({
    id: idx,
    size: { width: 1200, height: 600 },
    alt: image.text,
    contentType: 'image/png',
  }))
}
 
export default async function Image({ params, id }) {
  const productId = params.id
  const imageId = id
  const text = await getCaptionForImage(productId, imageId)
 
  return new ImageResponse(
    (
      <div
        style={
          {
            // ...
          }
        }
      >
        {text}
      </div>
    )
  )
}
```
</details>

<br>
<br>

### GenerateViewport

`generateViewport` is a special **function** you can export in the `app/` directory of a **Next.js App Router** project to dynamically define the `<meta name="viewport" />` tag **per page**.

You normally define viewport settings globally like this:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```
<br>

But sometimes, you might want **different viewport behavior per page** — for example:

- A special zoom level for a map page.
- Prevent zooming on login page.
- Different layout behavior for mobile-heavy pages.

<br>

Viewport can be managed by two method

<details>

1. The viewport object

```jsx
// layout.jsx | page.jsx

export const viewport = {
  themeColor: 'black',  // vist website to understand theme - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}
 
export default function Page() {}
```

2. generateViewport function

```jsx
// layout.js | page.js

export function generateViewport({ params }) {
  return {
    themeColor: '...',
  }
}
```

Need more - https://nextjs.org/docs/14/app/api-reference/functions/generate-viewport

</details>

<br>
<br>

### useSearchParams

useSearchParams is a Client Component hook that lets you read the current URL's query string.\
It is read only, you can not set params through it

<br>

```js
// app/dashboard/search-bar.js

'use client'
 
import { useSearchParams } from 'next/navigation'
 
export default function SearchBar() {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('search')
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
```
<br>

Other methods of searchParams
- searchParams.get('search')
- searchParams.getAll()
- searchParams.keys()
- searchParams.values()
- searchParams.entries()
- searchParams.forEach()
- searchParams.toString()

<br>

### Some cases of useSearchParams
<br>

**1. Static Rendering**

**Problem:**

If you're using `useSearchParams` inside a statically rendered route, it **forces client-side rendering** for the **whole component tree** above it or up to the **closest Suspense boundary**.

That’s bad if you want **fast static rendering (SSR/SSG)** for most of the page and only need dynamic data **below**.

<br>

**Solution: Use `<Suspense>`**

<details>

Wrap the dynamic component (`SearchBar`) in a `<Suspense>` block. That way:

- **Static parts** (like nav, header, layout) get **rendered on the server**.
- Only the dynamic part using `useSearchParams` is **hydrated on the client**.

```js
// app/dashboard/search-bar.js
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  console.log(search) // Only logs on client

  return <>Search: {search}</>
}
```

This component:
- Must run on **client side** (uses `useSearchParams`)
- Will read `?search=...` from the URL



```js
// app/dashboard/page.js

import { Suspense } from 'react'
import SearchBar from './search-bar'

function SearchBarFallback() {
  return <>placeholder</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```
<br>

#### Benefits

| Without `<Suspense>` | With `<Suspense>` |
|----------------------|--------------------|
| Entire tree becomes client-rendered | Only the `SearchBar` is client-rendered |
| Slower TTFB (time to first byte) | Faster initial render |
| Less SEO friendly | More SEO friendly |
</details>

<br>

**2. Dyamic rendering**

**`useSearchParams` + Dynamic Rendering**

<br>

If your **route is dynamically rendered**, then:
- `useSearchParams()` will **work on the server during the initial render**
- And also **work on the client** during navigation

This is different from **static rendering**, where `useSearchParams` is **only client-side**.

<br>

#### How to Enable Dynamic Rendering

You just add this in your page component:

```js
export const dynamic = 'force-dynamic'
```

This tells Next.js:
> “Don’t statically render this route — always render it dynamically (on-demand).”

<br>

#### Example Walkthrough

```js
// app/dashboard/search-bar.js`
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  console.log(search) // 🔥 Logs on server AND client (in dynamic mode)

  return <>Search: {search}</>
}
```


```js
// app/dashboard/page.js

import SearchBar from './search-bar'

// Forces dynamic rendering
export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```
<br>

| Feature | Static Rendering | Dynamic Rendering |
|--------|------------------|-------------------|
| `useSearchParams` runs on server? | ❌ No | ✅ Yes |
| `useSearchParams` runs on client? | ✅ Yes | ✅ Yes |
| Console logs on server? | ❌ Never | ✅ On first render |
| SEO benefits | ✅ Better | ⚠️ Depends (might be slower) |
| Needs `<Suspense>` for partial hydration | ✅ Yes | ❌ No (optional) |

<br>

**When to Use `force-dynamic`**

Use when:
- You **need the query params available on the server**
- You're doing **server logic** based on search params (e.g., DB filtering)
- You don't want to split the UI using `<Suspense>`

<br>

**What Does “Dynamic Rendering” Mean in Next.js (App Router)?**

In **Next.js**, a route can be either:

| Type | Description |
|------|-------------|
| **Static Rendering** | The HTML is **pre-rendered at build time** or cached on the server (like SSR/SSG) |
| **Dynamic Rendering** | The page is **rendered fresh on every request**, using **request-specific data** like headers, search params, cookies, etc. |

**"Dynamic Rendering" means:**

> The page is **not pre-rendered** and **not cached** — it’s generated **on the fly** on each request.

<br>
<br>

> ### userAgent

The userAgent helps to know device and other user details

```js
// middleware.js

import { NextResponse, userAgent } from 'next/server'
 
export function middleware(request) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```

in above, instead of device we can extract many things like
- isBot
- browser
- device
- engine
- os
- cpu

<br>
<br>

## Video Optimization

### Using `<video>` and `<iframe>`

Videos can be embedded on the page using the HTML `<video>` tag for direct video files and `<iframe>` for external platform-hosted videos.

<br>

<details>

#### `<video>`

```jsx
// app/ui/video.jsx

export function Video() {
  return (
    <video width="320" height="240" controls preload="none">
      <source src="/path/to/video.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  )
}
```

#### Common `<video>` tag attributes

| Attribute   | Description                                                                                     | Example Value                          |
|-------------|-------------------------------------------------------------------------------------------------|----------------------------------------|
| src         | Specifies the source of the video file.                                                         | `<video src="/path/to/video.mp4" /> `    |
| width       | Sets the width of the video player.                                                             | `<video width="320" />`                 |
| height      | Sets the height of the video player.                                                            | `<video height="240" /> `                |
| controls    | If present, it displays the default set of playback controls.                                   | `<video controls /> `                    |
| autoPlay    | Automatically starts playing the video when the page loads. Note: Autoplay policies vary across browsers. | `<video autoPlay />`                     |
| loop        | Loops the video playback.                                                                       | `<video loop /> `                        |
| muted       | Mutes the audio by default. Often used with autoPlay.                                           | `<video muted /> `                       |
| preload     | Specifies how the video is preloaded. Values: none, metadata, auto.                             | `<video preload="none" />`               |
| playsInline | Enables inline playback on iOS devices, often necessary for autoplay to work on iOS Safari.     | `<video playsInline />`                  |

<br>

#### `<iframe>`

```js
// app/page.jsx

export default function Page() {
  return (
    <iframe
      src="https://www.youtube.com/watch?v=gfU1iZnjRZM"
      frameborder="0"
      allowfullscreen
    />
  )
}
```
<br>

#### Common `<iframe>` tag attributes

| Attribute        | Description                                                                 | Example Value                          |
|------------------|-----------------------------------------------------------------------------|----------------------------------------|
| src              | The URL of the page to embed.                                               | `<iframe src="https://example.com" />`   |
| width            | Sets the width of the iframe.                                               | `<iframe width="500" />`                 |
| height           | Sets the height of the iframe.                                              | `<iframe height="300" />`                |
| frameborder      | Specifies whether or not to display a border around the iframe.             | `<iframe frameborder="0" /> `            |
| allowfullscreen  | Allows the iframe content to be displayed in full-screen mode.              | `<iframe allowfullscreen />`             |
| sandbox          | Enables an extra set of restrictions on the content within the iframe.      | `<iframe sandbox />`                     |
| loading          | Optimize loading behavior (e.g., lazy loading).                             | `<iframe loading="lazy" /> `             |
| title            | Provides a title for the iframe to support accessibility.                   | `<iframe title="Description" />`         |

<br>

```
If needed more about video - https://nextjs.org/docs/14/app/building-your-application/optimizing/videos
```

</details>

<br>
<br>

### What are `rewrites`?
- Allow you to **serve content from a different path or domain** while keeping the original URL in the browser.
- User sees: `/about`  
  Real content served from: `/` or an external URL.
- Defined in `next.config.js`.
  ```js
  module.exports = {
    async rewrites() {
      return [
        {
          source: '/about',
          destination: '/',
        },
      ]
    },
  }
  ```
<br>

#### What it means:
- When someone visits `/about`, Next.js **tries to serve the content from `/`**.
- Browser still **shows `/about`** in the URL bar.


#### Important Behavior:
- If you **have a real page** at `pages/about.js` or `app/about/page.js`, the rewrite **will NOT apply**.
- Next.js gives **actual files/pages priority** over rewrites.


#### **Modifications / Fixes**

<details>

#### Fix Option 1: Remove the `/about` page
- Rename/delete the `about` file if you want the rewrite to work:
  ```bash
  pages/about.js → pages/about.bak.js
  ```

#### Fix Option 2: Use a Redirect Instead
- If your goal is to **redirect the user to home**, do this instead:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true, // or false for temporary redirect
      },
    ]
  },
}
```
</details>

```
more detail - https://nextjs.org/docs/14/app/api-reference/next-config-js/rewrites
```

<br>
<br>

### useSelectedLayoutSegments

It's a **React hook** provided by **Next.js App Router** that lets you get **specific parts of the current URL path** (segments), especially when using **nested layouts**.

> Think of it as a way to read which part of the layout is currently active.

<br>

<details>

Let's say your app has a URL like:

```js
/dashboard/settings/profile
```
<br>

You might have a layout like:

```js
app/
  layout.js
  dashboard/
    layout.js
    settings/
      page.js
```
<br>

Now, inside `dashboard/layout.js`, if you run:

```js
'use client'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const segments = useSelectedLayoutSegments()
  console.log(segments) // ["settings", "profile"]

  return (
    <>
      <nav>Sidebar</nav>
      {children}
    </>
  )
}
```

You'll get:
```js
["settings", "profile"]
```
<br>

You can use it to:
- **Highlight menu items** based on the current route.
- Show/hide components conditionally depending on path.
- Customize layout behavior dynamically.
</details>

<br>
<br>

### useSelectedLayoutSegment

A **React hook** in the **Next.js App Router** that gives you the **active segment** (a part of the URL) under the current layout level.

It’s similar to `useSelectedLayoutSegments`, but instead of an **array of all nested segments**, it just returns **one segment** — the one directly after the layout where it’s called.

Let’s say your URL is:

<br>

```js
/dashboard/settings/profile
```

And your app structure is:

```js
app/
  layout.js              // Root layout
  dashboard/
    layout.js            // Dashboard layout
    settings/
      page.js
```

Now in `dashboard/layout.js`, if you use:

```js
'use client'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const segment = useSelectedLayoutSegment()
  console.log(segment) // 'settings'

  return (
    <>
      <aside>Sidebar</aside>
      {children}
    </>
  )
}
```

You’ll get:

```js
'settings'
```

That’s because **`settings`** is the **next path segment** under `/dashboard`.


<br>

#### ✅ Summary

| Hook | Returns | Use case |
|------|---------|----------|
| `useSelectedLayoutSegment()` | `'settings'` | When you only need the next segment |
| `useSelectedLayoutSegments()` | `['settings', 'profile']` | When you want all nested segments |

<br>
<br>

### PermanentRedirect

`permanentRedirect()` is a helper from Next.js that lets you **redirect users** to a **new URL with a 308 status code** — meaning:

> "This route has **permanently moved** to a new location."

<br>

Use `permanentRedirect` when:
- A page or route has **moved permanently**
- You want search engines to **update their index** to the new URL
- You want the browser to **remember** the new path


```js
// app/old-page/page.js
import { permanentRedirect } from 'next/navigation'

export default function Page() {
  permanentRedirect('/new-page')
}
```
<br>

#### Behavior:
- If a user visits `/old-page`, they are immediately **redirected to `/new-page`**
- The server sends HTTP status **308 Permanent Redirect**
- Search engines know that this is a **permanent move**

#### 308 vs 307 vs 302?

| Code | Type            | Browser Caching | SEO Impact |
|------|------------------|------------------|-------------|
| `308` | Permanent Redirect | ✅ Yes           | ✅ Yes (recommended) |
| `307` | Temporary Redirect | ❌ No            | ❌ No SEO change |
| `302` | Temporary Redirect (legacy) | ❌ No | ❌ No SEO change |


#### ⚠️ Notes
- Only works in **Server Components** (like `page.js`)
- Must be called **synchronously** at the top level of your component

<br>
<br>

---------------
Ye dekhna h
- https://nextjs.org/docs/14/app/building-your-application/optimizing/lazy-loading- kr k dekhna hoga time lagega
- https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming
- https://nextjs.org/docs/14/app/building-your-application/configuring/draft-mode - smjh nhi aya
- https://nextjs.org/docs/14/app/building-your-application/authentication - Above is when you need to read authentication in detail
- https://nextjs.org/docs/14/app/building-your-application/deploying/static-exports - not needed now
- https://nextjs.org/docs/14/app/api-reference/next-config-js/output


<br>
<br>




----------------------------------------Below are the notes for the page routing, above was app routing---------------------

Note:
- In this, instead of page.js, default render file will be index.js
- kepp in mind, other than index file will be consider as route but this is not same in `app router`.
- In this, instead of app folder we have the `pages` folder

<br>

### Static routes
The router will automatically route files named index to the root of the directory.

- `pages/index.js → "/"`

<br>

- `pages/about.js → "/about"`
- `pages/about/index.js → "/about"`

<br>

- `pages/about/test.js → "/about/test "`

<br>

- `pages/blog/index.js → "/blog"`
- `pages/blog/first-post.js → "/blog/first-post"`

<br>

### Dynamic Routes
- `pages/posts/[id].js`, then it will be accessible at `posts/1`, `posts/2`, etc.
- `pages/posts/[id]/client.js`, then it will be accessible at `posts/1/client`, `posts/2/client`, etc.
- `pages/posts/[id]/[nestedId].js`, then it will be accessible at `posts/1/nesteval1`, `posts/2/nesteval2`, `posts/2/nesteval1`, `posts/1/nesteval2` etc.

<br>

### Catch-all Segments
For example, `pages/shop/[...slug].js` will match `/shop/clothes`, but also `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`, and so on.


```
Route	                        Example URL     	              params
pages/shop/[...slug].js	        /shop/a                         { slug: ['a'] }
pages/shop/[...slug].js	        /shop/a/b                         { slug: ['a', 'b'] }
pages/shop/[...slug].js	        /shop/a/b/c                         { slug: ['a', 'b', 'c'] }
```

Note: Keep in mind, url: `localhost:3000/shop` k liye index file add krni pdegi shop folder me, wrna 404 aa jayega.

<br>

### Optional Catch-all Segments
Catch-all Segments can be made `optional` by including the parameter in double square brackets: `[[...segmentName]]`.

For example, `pages/shop/[[...slug]].js` will `also` match `/shop`, in addition to `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`.

The difference between `catch-all` and optional `catch-all` segments is that with optional, the route without the parameter is also matched (/shop in the example above).

Note: Here we don't need to add inex.js in shop folder only single file `[[...slug.js]]` will work for all


```
Route	                            Example URL	             params
pages/shop/[[...slug]].js	        /shop	                   { slug: [] }
pages/shop/[[...slug]].js	        /shop/a	                 { slug: ['a'] }
pages/shop/[[...slug]].js	        /shop/a/b	               { slug: ['a', 'b'] }
pages/shop/[[...slug]].js	        /shop/a/b/c	             { slug: ['a', 'b', 'c'] }
```

<br>

### Not found page

- 404.js will serve as not found page
- Here we can add 404.js at root level only in pages folder, we can not add separately in nested folder. One projet one 404 file

```js
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

<br>
<br>

### Shallow Routing

Shallow routing allows you to change the URL without running data fetching methods again, that includes `getServerSideProps`, `getStaticProps`, and `getInitialProps`.

You'll receive the updated pathname and the query via the router object (added by useRouter), without losing state.


```jsx
// pages/index.js (Home Page)
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const navigateWithShallowRouting = () => {
    router.push('/about?name=John');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Shallow Routing Example</h1>
      <p>Click the button below to navigate to the About page using shallow routing.</p>
      <button onClick={navigateWithShallowRouting} style={{ padding: 10, fontSize: 16 }}>
        Go to About (Shallow)
      </button>
    </div>
  );
}
```

<br>
<br>

```js
// pages/about.js (About Page)
import { useRouter } from 'next/router';

export default function About({ name }) {
  const router = useRouter();

  const updateQueryParam = () => {
    router.push('/about?name=Alice', undefined, { shallow: true });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>About Page</h1>
      <p>Hello, {name}! Welcome to the About page.</p>
      <button onClick={updateQueryParam} style={{ padding: 10, fontSize: 16 }}>
        Change Name to Alice (Shallow)
      </button>
    </div>
  );
}

// Fetch server-side data
export async function getServerSideProps(context) {
  console.log('Fetching data from the server...');

  return {
    props: {
      name: context.query.name || 'Guest',
    },
  };
}
```

**Note:** Just see the changes after removing/adding "undefined, { shallow: true }"


<br>
<br>

###  `_app.js` usage in Next.js
In **Next.js**, the `_app.js` file `wraps all pages`. It is used to:

- **Persist layout** across pages  
- **Inject global styles or Provide global state or context**  
- **Handling Route Changes (e.g., Loading Indicator)**  

<br>

### **Default `_app.js`**
If you don't create `_app.js`, Next.js will use a default version automatically.  
But if you want to customize it, create `pages/_app.js` and add:

```javascript
import '../styles/globals.css'; // Import global styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

Here:
- **`Component`**: The `active page component` 
- **`pageProps`**: Props passed from `getInitialProps`, `getStaticProps`, or `getServerSideProps`

<br>

### Common Use Cases of _app.js

**1. Persistent Layouts**

If you want to keep a **navbar, footer, or sidebar** across all pages:

<details>

```javascript
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```
</details>
<br>

**2. Global State with Context API**
<details>

```javascript
import { createContext, useState } from 'react';

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
```
</details>

<br>

**3. Handling Route Changes (e.g., Loading Indicator)**

<details>

```javascript
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      {loading && <p>Loading...</p>}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

</details>

<br>
<br>

## Data Fetching

### Static Generation -  Basically generate static when build command is done

> ### 1. getStaticProps

- In static website, data-fetching method used to pre-render a page at build time

Let's say we have fixed data website called `static website like Blog website`, but sometimes we come the situation when we want static website which have some `data from api or external source`. In that condition we `called the api during build(npm run build command) time`, `api gets called` and `update the component` then `page with that updated content`, i want to `build static website`. Then we use getStaticProps function.

- getStaticProps always `runs on the server and never on the client`.
-  the `code` written inside getStaticProps is `removed` from the `client-side bundle`, so it is not visible in client side js file
- getStaticProps should `return an object` which which is `passed as prop in page function`, in below code we have passed props object which we gets inside the blog function



```js
// posts will be populated at build time by getStaticProps()
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}
 
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}
```


- After build command, in addition to the page `HTML file`, Next.js `generates a JSON file` holding the result of running getStaticProps.
- This `JSON file` will be `used in client-side routing` through next/link or next/router. When you navigate to a page that’s pre-rendered using getStaticProps, Next.js fetches this JSON file (pre-computed at build time) and uses it as the props for the page component. This means that client-side page transitions `will not call` getStaticProps as only the exported JSON is used.
- `getStaticProps` can `only be exported from a page`. You cannot export it from non-page files, _app, _document, or _error.
- Keep in mind, getStaticProps will run only in build time


<br>


> ### 2. Incremental Static Regeneration (ISR)

Let say we have created static website using getStaticProps in which we have - **Static Site with `getStaticProps`**: API is called at build time, generating a static site.  
- **Issue**: If API/DB data changes, a rebuild & redeployment is needed.  
- **Solution (`revalidate`)**: Set `revalidate` time (in seconds) to enable Incremental Static Regeneration (ISR).  
- **How it Works**:  
  - Within the `revalidate` period: Served cached (unchanged) data.  
  - After `revalidate` time: On next request, the page regenerates with updated data.  
- **Benefit**: No need for manual redeployment; data updates automatically.


```js
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
 
export default Blog
```


- After revalidate time, Next.js will invalidate the cache and show the updated page. If the background regeneration fails, the old page would still be unaltered.

<br>


**Error handling and revalidation**

- If there is an error inside getStaticProps when handling background regeneration, or you manually throw an error, the last successfully generated page will continue to show. On the next subsequent request, Next.js will retry calling getStaticProps.
<details>

```js
export async function getStaticProps() {
  // If this request throws an uncaught error, Next.js will
  // not invalidate the currently shown page and
  // retry getStaticProps on the next request.
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  if (!res.ok) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(`Failed to fetch posts, received status ${res.status}`)
  }
 
  // If the request was successful, return the posts
  // and revalidate every 10 seconds.
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}
```
</details>

<br>

### revalidate

The revalidate property is the amount in seconds after which a page re-generation can occur (defaults to false or no revalidation).
```js
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
```



<br>

### Additonal return object of getStaticProps
- You can return any one or more according to the condition as return object

```js
return {
    props: {
      posts,
    },
    revalidate: 10,
    notFound: true,
    redirect: {
      destination: '/',
      permanent: false,
      // statusCode: 301
    },
  }
```

<br>

below is more detail of `redirect` case
```js
export async function getStaticProps(context) {
  const res = await fetch(`https://...`)
  const data = await res.json()
 
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
        // statusCode: 301
      },
    }
  }

  if (!data.val) {
    return {
      notFound: true,
    }
  }
 
  return {
    props: { data }, // will be passed to the page component as props
  }
}
```

<br>

### Context in getStaticProps

Note:
Suppose you needed the params from the url, if you use the any hook then we have to make the component client side, in that case, getStaticProps comes with context, from which we can destructure required values


```js
// in pages/[sku].js
export async function getStaticProps(context) {
  const { params } = context  // from param you can get sku value

  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  }
}
```

<br>

### Context parameter
The context parameter is an object containing the following keys:


| Name            | Description |
|----------------|-------------|
| `params`       | Contains the route parameters for pages using dynamic routes. For example, if the page name is `[id].js`, then `params` will look like `{ id: ... }`. You should use this together with `getStaticPaths`, which we'll explain later. |
| `defaultLocale`| Contains the configured default locale (if enabled). |
| `revalidateReason` | Provides a reason for why the function was called. Can be one of: `"build"` (run at build time), `"stale"` (revalidate period expired, or running in development mode), `"on-demand"` (triggered via on-demand revalidation). |

<br>

> ### 2. getStaticPaths - used in static page generation with dynamic route

In above case, one challenge comes that we use `getStaticProps` for `dynamic(pages/[sku].js) routes` means we want `static pages` during build time for `dynamic value(sku)`. But we dont know in what range sku will lies, either it can be 1 or 2 or anything. So how next will know How many static pages he has to build. Then getStaticPaths comes as saviour


If a page has `Dynamic Routes` and uses `getStaticProps`, it needs to define a `list of paths` to be `statically generated`.

- getStaticPaths will only run during build in production, it will not be called during runtime. 


```js
// pages/posts/[id].js
function Post({ post }) {
  // Render post...
}
 
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
 
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()
 
  // Pass post data to the page via props
  return { props: { post } }
}
 
export default Post
```

<br>

### Fallback usages in getStaticPaths

In `getStaticPaths`, the `fallback` key determines how Next.js handles paths that were not generated at build time. Here are the possible values and their behaviors:

**`fallback: false`**

- Only the paths returned by `getStaticPaths` will be generated at build time.
- Any other path will result in a **404 page**.
- Best for **static sites** with a fixed number of pages.

```javascript
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // Non-predefined paths will 404
  };
}
```

<br>

**`fallback: true`**
- If a requested path is **not pre-generated**, Next.js will **render it on-demand on the server** and **cache it**.
- The first request might take longer while the page is being generated.
- Useful for large datasets where generating all pages at build time is impractical.



<br>

Sure! Here’s a simpler breakdown of how `fallback: true` works in **Next.js**:

#### **What happens when `fallback: true`?**
1. **Pre-rendered Pages at Build Time:**  
   - The pages returned from `getStaticPaths` are **pre-rendered** during the build.
  
2. **Handling Unavailable Pages (No 404)**  
   - If a user visits a page **not pre-generated**, instead of a **404 error**, Next.js **dynamically** generates it.

3. **First Request for a Non-Generated Page:**  
   - The user **sees a temporary fallback UI** (like a loading spinner).  
   - Meanwhile, Next.js **runs `getStaticProps`** in the background to generate the page.

4. **After Generation Completes:**  
   - The page **updates automatically** for the user.  
   - Next.js **saves the generated page** so future visits to the same URL are fast.

5. **Crawlers & Client-side Navigation:**  
   - **Search engines (Google, etc.)** don’t get the fallback UI; they wait for the page to be fully ready.  
   - When navigating through **`next/link` or `next/router`**, the page behaves like `fallback: 'blocking'`, meaning it only loads when fully generated.

6. **No Support for `output: 'export'` Mode**  
   - `fallback: true` **does not work** when using `output: 'export'` (static HTML export).
<br>

#### **When should you use `fallback: true`?**
- If you have **many pages that depend on data**, like a large e-commerce site.  
- Instead of pre-generating **all** product pages, you **only pre-generate a few**.  
- The rest are generated **on-demand when someone visits them**.  
- This keeps **build times fast** while still using Static Generation.

<br>

#### **Important Note:**
- `fallback: true` **does not update pages** after they’re generated.  
  - To update pages, use **Incremental Static Regeneration (ISR)**.

<br>

Once **User 1** visits a page that was not pre-generated, Next.js:  

1. **Shows a fallback UI** (loader).  
2. **Runs `getStaticProps`** to fetch data and generate the page.  
3. **Saves (caches) the page** for future requests.  

Now, when **User 2** visits the same page **later**, Next.js **serves the cached static page instantly**, without showing the loader again.  

#### ✅ **Final Behavior:**  
- **User 1:** Sees the loader first, then the page loads.  
- **User 2+:** Gets the fully generated page instantly (no loader).

<br>

```javascript
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: true, // Other paths will be dynamically generated
  };
}
```
- You must handle the loading state in the component using `useRouter`:

```javascript
import { useRouter } from 'next/router';

export default function Post({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>; // Show loading UI while page is generating
  }

  return <div>{data.content}</div>;
}
```

<br>

**`fallback: 'blocking'`**
- Works like `true`, but **without showing a loading state**.
- The user waits for the page to generate **before seeing anything**, identical to SSR (hence why blocking) and then be cached for future requests so it only happens once per path.
- At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, like other pages pre-rendered at build time.
- Useful when you don’t want to handle `isFallback` in the UI.

```javascript
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: 'blocking', // Other paths will be generated but no loading UI
  };
}
```

### Summary
| `fallback` Value  | Behavior |
|-------------------|----------|
| `false`          | Only pre-generated paths work, others 404 |
| `true`           | Non-pre-generated paths show a loading state while being generated |
| `'blocking'`     | Non-pre-generated paths are generated before showing anything |

<br>

## Dynamic Generation -  when no pregenerated/static page needed

> ###  1. getServerSideProps

- Next.js will `pre-render(not prebuild)` this page on each request using the data returned by getServerSideProps
- This is useful if you want to fetch data that changes often, and have the page update to show the most current data.
- it should return anything (1 or more) eg props, notFound, redirect
- getServerSideProps can only be exported from a `page`.
- If an `error` is thrown inside getServerSideProps, it will show the `pages/500.js` file.

<br>

pages/index.js
```js
export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}
 
export default function Page({ repo }) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  )
}
```

<br>

**Context parameter**

| Name            | Description |
|----------------|-------------|
| `params`       | If this page uses a dynamic route, `params` contains the route parameters. If the page name is `[id].js`, then `params` will look like `{ id: ... }`. |
| `req`          | The HTTP `IncomingMessage` object, with an additional `cookies` prop, which is an object with string keys mapping to string values of cookies. |
| `res`          | The HTTP response object. |
| `query`        | An object representing the query string, including dynamic route parameters. |
| `preview`      | (**Deprecated for `draftMode`**) `preview` is `true` if the page is in Preview Mode and `false` otherwise. |
| `previewData`  | (**Deprecated for `draftMode`**) The preview data set by `setPreviewData`. |
| `draftMode`    | `draftMode` is `true` if the page is in Draft Mode and `false` otherwise. |
| `resolvedUrl`  | A normalized version of the request URL that strips the `_next/data` prefix for client transitions and includes original query values. |
| `locale`       | Contains the active locale (if enabled). |
| `locales`      | Contains all supported locales (if enabled). |
| `defaultLocale`| Contains the configured default locale (if enabled). |

<br>

For props
```js
export async function getServerSideProps(context) {
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  }
}
```

<br>

For notFound
```js
export async function getServerSideProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()
 
  if (!data) {
    return {
      notFound: true,
    }
  }
 
  return {
    props: { data }, // will be passed to the page component as props
  }
}
```
<br>

For redirect
```js
export async function getServerSideProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()
 
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
 
  return {
    props: {}, // will be passed to the page component as props
  }
}
```
<br>

### Point to consider

- keep in mind that the server side running function like getServerSideProps, in which you can not write client slide hooks like useeffect or any other hook.
- In page router, if you use any hook, then whole will not become the client side, only data which is used using the hook become the client and any function used inside hook becomes the client side, but in app router if you use any hook then whole component becomes clinent side. In that condition we try to make data regarding hook in separate components.

<br>

> ### Adding meta data in component

We use the `<Head/>` component

```js
import Head from 'next/head'
 
function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <title>{contextOfserverSideProp.title}</title>
        <meta name="descriptuin" content="this is the content" />
      </Head>
    </div>
  )
}
 
export default IndexPage
```
<br>

### _documents.js usage

- _documents.js should be added directly in pages folder at root level
- `_app.js` kind of wrapper which runs on every page but helps only to customize only `<body>` of DOM while `_documents.js` helps in customize `entire HTML` documents
- useful in adding meta tags, CSS libraries, or custom fonts.
 
```
/pages
 ├── _document.js
 ├── index.js
```
<br>

```javascript
// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";
import Document from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head> {/*   must be added */}
          {/* Custom Meta Tags */}
          <meta name="description" content="My Next.js App" />
          <meta charSet="UTF-8" />

          {/* Preconnect to external fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* Custom Font Example */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head> {/*   must be added */}
        <body>
          <Main />             {/*   must be added, This is where Next.js will render the app. */}
          <NextScript />       {/*   must be added, Injects Next.js scripts (for interactivity, hydration, etc.). */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

#### When to Use `_document.js`
- If you **want to modify** the document structure (e.g., add global meta tags, external stylesheets, fonts).  
- When you **need to customize** the `<html>` or `<body>` (e.g., adding a custom class to `<body>`).  
- If you **want to optimize performance** using `<link rel="preconnect">` for fonts or CDNs.  

⛔ **Do NOT use `_document.js` for client-side components** (e.g., event listeners, dynamic imports). Instead, use `_app.js` for global logic.

<br>

### Middleware.js 

- It is added at root level in repo, not inside the app/pages folder
- Middleware executes before routes are rendered. It's particularly useful for implementing custom server-side logic like authentication, logging, or handling redirects.
- It has NextRequest and NextResponse, both have attached many method on it like 

<br>
<br>

### redirects in next.config.js

```js
// next.config.js

module.exports = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      // Wildcard path matching
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
      // if the header `x-redirect-me` is present,
      // this redirect will be applied
      {
        source: '/:path((?!another-page$).*)',
        has: [
          {
            type: 'header',
            key: 'x-redirect-me',
          },
        ],
        permanent: false,
        destination: '/another-page',
      },
    ]
  },
}
```
<br>

- `permanent true or false` - if true will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.

- When a redirect is applied, any query values provided in the request will be passed through to the redirect destination. For example, see the following redirect configuration:

  ```js
  {
    source: '/old-blog/:path*',
    destination: '/blog/:path*',
    permanent: false
  }
  ```

When `/old-blog/post-1?hello=world` is requested, the client will be redirected to `/blog/post-1?hello=world`.


more details:
```
https://nextjs.org/docs/14/app/api-reference/next-config-js/redirects
```
<br>
<br>

### NextResponse.redirect in Middleware

middleware addition

```
/my-next-app
  ├── pages/
  ├── middleware.js  ✅ (Ensure it's here)
  ├── package.json
```
<br>

- Middleware will be invoked for `every route` in your project. 

```js
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
  // matcher: ['/about/:path*', '/dashboard/:path*'],     // multiple paths
}
```

- There are many things which you can refer documentation

<br>
<br>

### API Routes 

```
https://nextjs.org/docs/14/pages/building-your-application/routing/api-routes
```

API routes provide a solution to build a `public API` with Next.js.

Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a `page`. They are server-side only bundles and won't increase your client-side bundle size.

<details>

pages/api/hello.js
```js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}
```

- Setting cookies

pages/api/cookie.js
```js
export default async function handler(req, res) {
  res.setHeader('Set-Cookie', 'username=lee; Path=/; HttpOnly')
  res.status(200).send('Cookie has been set.')
}
```

- Reading cookies

pages/api/cookie.js
```js
export default async function handler(req, res) {
  const auth = req.cookies.authorization
  // ...
}
```
</details>


<br>
<br>

### Bundle Analyzer

`@next/bundle-analyzer` is a plugin for Next.js that helps you manage the size of your JavaScript modules.

Installation
```
npm i @next/bundle-analyzer
# or
yarn add @next/bundle-analyzer
# or
pnpm add @next/bundle-analyzer
```

<details>

next.config.js
```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {}
 
module.exports = withBundleAnalyzer(nextConfig)
```

Run the following command to analyze your bundles: The report will open three new tabs in your browser

```
ANALYZE=true npm run build
# or
ANALYZE=true yarn build
# or
ANALYZE=true pnpm build
```
</details>

<br>
<br>

### `<Script>`

- used for adding external script

```js
// app/dashboard/page.js
import Script from 'next/script'
 
export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```
<br>

| Prop       | Example                               | Type     |
|------------|---------------------------------------|----------|
| `src`      | `src="http://example.com/script"`    | `String`  |
| `strategy` | `strategy="lazyOnload"`              | `String`  |
| `onLoad`   | `onLoad={onLoadFunc}`                | `Function` |
| `onReady`  | `onReady={onReadyFunc}`              | `Function` |
| `onError`  | `onError={onErrorFunc}`              | `Function` |

**Strategy prop**
- `beforeInteractive`: Load the script before any Next.js code and before any page hydration occurs.
- `afterInteractive`: (default) Load the script early but after some hydration on the page occurs.
- `lazyOnload`: Load the script later during browser idle time.


- Next.js ensures the script will only `load once`, even if a user navigates between multiple routes in the same layout, irrespective of addition in nested page.js

<br>
<br>

### userAgent

it helps to get various things 

```js
// middleware.js
import { NextResponse, userAgent } from 'next/server'
 
export function middleware(request) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```
<details>

1. `isBot` - A boolean indicating whether the request comes from a known bot.

2. `browser` - An object containing information about the browser used in the request.
  - name: A string representing the browser's name, or undefined if not identifiable.
  - version: A string representing the browser's version, or undefined.

3. `device` - An object containing information about the device used in the request.
  - model: A string representing the model of the device, or undefined.
  - type: A string representing the type of the device, such as console, mobile, tablet, smarttv, wearable, embedded, or undefined.
  - vendor: A string representing the vendor of the device, or undefined.

4. `os` - An object containing information about the operating system.
  - name: A string representing the name of the OS, or undefined.
  - version: A string representing the version of the OS, or undefined.

</details>

<br>

### To configure the build folder name

```js
// next.config.js

module.exports = {
  distDir: 'build',  // build instead of the default .next folder
  productionBrowserSourceMaps: true,  // enable SourceMap in production
  reactStrictMode: true,
  trailingSlash: true,  // "/about/"" will redirect to "/about", to stop this use true  
  compiler: {
    removeConsole: true,  // to remove console from build
    removeConsole: { // Remove console.* output except console.error
      exclude: ['error'],
    },
  },
  crossOrigin: 'anonymous' or 'use-credentials', // anonymous means cross-origin request without including credentials, this is default applied to all scripts
}
```
<br>

### Setting headers through config file

<details>

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ],
      },
      // if the header `x-add-header` is present,
      // the `x-another-header` header will be applied
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-add-header',
          },
        ],
        headers: [
          {
            key: 'x-another-header',
            value: 'hello',
          },
        ],
      },
      // if the header `x-no-header` is not present,
      // the `x-another-header` header will be applied
      {
        source: '/:path*',
        missing: [
          {
            type: 'header',
            key: 'x-no-header',
          },
        ],
        headers: [
          {
            key: 'x-another-header',
            value: 'hello',
          },
        ],
      },
      // if the source, query, and cookie are matched,
      // the `x-authorized` header will be applied
      {
        source: '/specific/:path*',
        has: [
          {
            type: 'query',
            key: 'page',
            // the page value will not be available in the
            // header key/values since value is provided and
            // doesn't use a named capture group e.g. (?<page>home)
            value: 'home',
          },
          {
            type: 'cookie',
            key: 'authorized',
            value: 'true',
          },
        ],
        headers: [
          {
            key: 'x-authorized',
            value: ':authorized',
          },
        ],
      },
    ]
  },
}

```
</details>

<br>

### Continuous Integration (CI) Build Caching

To improve build performance, Next.js saves a cache to `.next/cache` that is shared between builds.

<details>

eg for **AWS CodeBuild**
Add (or merge in) the following to your `buildspec.yml`:
```
cache:
  paths:
    - 'node_modules/**/*' # Cache `node_modules` for faster `yarn` or `npm i`
    - '.next/cache/**/*' # Cache Next.js for faster application rebuilds
```

eg for **Bitbucket Pipelines**
```
definitions:
  caches:
    nextcache: .next/cache
```

Refer below url for more details and cases
```
https://nextjs.org/docs/14/pages/building-your-application/deploying/ci-build-caching
```
</details>

<br>

### useRouter

The router provide an object

```js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RouterDemo() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      console.log('Router is ready:', router);
    }
  }, [router.isReady]);

  return (
    <div>
      <h1>Next.js Router Object Demo</h1>
      <ul>
        <li><strong>pathname:</strong> {router.pathname}</li>               {/*String*/}
        <li><strong>query:</strong> {JSON.stringify(router.query)}</li>     {/*Object*/}
        <li><strong>asPath:</strong> {router.asPath}</li>                    {/*String*/}
        <li><strong>isFallback:</strong> {String(router.isFallback)}</li>    {/*boolean*/}
        <li><strong>basePath:</strong> {router.basePath}</li>                {/*String*/}
        <li><strong>locale:</strong> {router.locale}</li>                     {/*String*/}
        <li><strong>locales:</strong> {JSON.stringify(router.locales)}</li>    {/*String[]*/}
        <li><strong>defaultLocale:</strong> {router.defaultLocale}</li>         {/*String*/}
        <li><strong>domainLocales:</strong> {JSON.stringify(router.domainLocales)}</li>    
        <li><strong>isReady:</strong> {String(router.isReady)}</li>
        <li><strong>isPreview:</strong> {String(router.isPreview)}</li>
      </ul>
    </div>
  );
}
```

**Example Scenario**
If you visit /product?id=123&color=blue, the output will be:

```
pathname: /product
query: {"id":"123","color":"blue"}
asPath: /product?id=123&color=blue
isFallback: false
basePath: 
locale: en
locales: ["en","fr"]
defaultLocale: en
domainLocales: []
isReady: true
isPreview: false
```

<br>

### router.events

You can listen to different events happening inside the Next.js Router. Here's a list of supported events:

- `routeChangeStart(url, { shallow })` - Fires when a route starts to change
- `routeChangeComplete(url, { shallow })` - Fires when a route changed completely
- `routeChangeError(err, url, { shallow })` - Fires when there's an error when changing routes, or a route load is cancelled
  - `err.cancelled` - Indicates if the navigation was cancelled
- `beforeHistoryChange(url, { shallow })` - Fires before changing the browser's history
- `hashChangeStart(url, { shallow })` - Fires when the hash will change but not the page
- `hashChangeComplete(url, { shallow })` - Fires when the hash has changed but not the page

<br>

For example, to listen to the router event `routeChangeStart`, open or create `pages/_app.js` and subscribe to the event, like so:

```js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
 
export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
 
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      )
    }
 
    router.events.on('routeChangeStart', handleRouteChange)
 
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])
 
  return <Component {...pageProps} />
}
```
<br>
<br>

### Next.js Output File Tracing & Standalone Mode (Simplified Notes)

#### What is Output File Tracing?
- Next.js **automatically traces** required files for production during `next build`.  
- **Reduces deployment size** by including only necessary dependencies.  
- Helps in **Docker deployments** by avoiding unnecessary files in `node_modules`.  


#### How It Works
1. **Next.js scans** `import`, `require`, and `fs` usage to find required files.  
2. Generates a **`.nft.json` file** in `.next/`, listing dependencies per page.  
3. These files can be copied to a **deployment location** for optimized production.  


#### Standalone Mode (Automatic Copying of Files)
- Next.js **creates a `standalone/` folder** with only essential files for deployment.  
- To enable, add this to `next.config.js`:  
  ```javascript
  module.exports = {
    output: 'standalone',
  };
  ```
- This allows deployment **without installing `node_modules`**.  


#### What's Inside `standalone/`?
- Only **necessary files** (minimizing deployment size).  
- A **minimal `server.js` file** to run Next.js without `next start`.  
- Does **not** include `public/` or `.next/static/` by default (should be handled by a CDN).  

for more
```
https://nextjs.org/docs/14/pages/api-reference/next-config-js/output
```

<br>
<br>

ye wala aache se padhna h
```
https://nextjs.org/docs/14/pages/building-your-application/authentication
https://nextjs.org/docs/14/pages/building-your-application/deploying/static-exports
https://nextjs.org/docs/14/pages/building-your-application/upgrading
https://nextjs.org/docs/14/pages/api-reference/next-config-js/rewrites
```

-----------------------------------------------------------------------------------------------------------------------------------



