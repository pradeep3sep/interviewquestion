Note: It has page.js not index.js in folder

> ### **App Router vs Pages Router in Next.js**  

Next.js has two routing systems: **App Router** (introduced in Next.js 13) and **Pages Router** (the traditional routing system). Below is a comparison of both:

---

### **1. App Router (`app/` directory)**
✅ **Uses React Server Components (RSC)** – Mixes server and client components for better performance.  
✅ **File-based routing with React Suspense** – Each file inside `app/` becomes a route.  
✅ **Layout System** – Allows nested layouts for better reusability.  
✅ **Built-in Server Actions & API Routes** – Can handle backend logic inside React components.  
✅ **Loading & Error Handling** – Uses special `loading.tsx` and `error.tsx` files.  
✅ **Partial Prerendering** – Supports both static and dynamic rendering per component.  

#### **Example Structure**
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

---

### **2. Pages Router (`pages/` directory)**
✅ **File-based routing** – Each `.js/.ts` file inside `pages/` is a route.  
✅ **Uses `getServerSideProps`, `getStaticProps`, and `getInitialProps`** for data fetching.  
✅ **Traditional API Routes (`pages/api`)** – API endpoints live under `pages/api/`.  
✅ **Good for legacy projects** – Well-tested and stable.  

#### **Example Structure**
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

---

### **Comparison Table**
| Feature               | **App Router (`app/`)** | **Pages Router (`pages/`)** |
|----------------------|------------------|------------------|
| **Rendering Mode**  | Supports RSC, SSR, and CSR | Uses SSR, SSG, CSR |
| **Routing**        | File-based (React Suspense) | File-based (older model) |
| **Data Fetching**  | Uses `fetch()`, React Server Components, `useEffect()` | Uses `getServerSideProps`, `getStaticProps` |
| **API Routes**     | Can handle in component (`async function action()`) | Uses `pages/api/` directory |
| **Middleware**     | Middleware (`middleware.ts`) | Middleware (`middleware.ts`) |
| **Performance**    | Optimized with Server Components | Slightly less optimized |
| **Error Handling** | Uses `error.tsx` | Needs `getInitialProps()` or Error Boundaries |
| **Best for**       | New projects, full-stack apps | Legacy projects, traditional SSR |

---

### **Which One Should You Use?**
- **New Projects:** Use **App Router** (`app/`) for better performance and scalability.  
- **Existing Projects:** Stick with **Pages Router** (`pages/`) unless migrating.  
- **API-heavy apps:** App Router simplifies backend logic inside components.  
- **SEO-focused apps:** Both are good, but App Router has better performance optimizations.  

Let me know if you need more details! 🚀


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

### **Next.js Routing Files in the App Router (`app/` directory)**  

In Next.js **App Router**, specific file names have special meanings. Here’s what each does:  

---

### **1. `layout.js / layout.tsx` (Layout File)**
- Defines a persistent UI wrapper (like headers, sidebars, and footers) for all child pages.
- Useful for nested layouts.
- A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.
- Layouts are Server Components by default but can be set to a Client Component.
- Layouts do not have access to the route segments below itself. To access all route segments, you can use `useSelectedLayoutSegment` or `useSelectedLayoutSegments` in a Client Component.


📌 **Example:**
```tsx
// app/layout.tsx
export default function Layout({ children }) {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
    </div>
  );
}
```


Note: Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.

Even if the same API call is made in layout.js and page.js, React will automatically deduplicate (dedupe) requests, ensuring the data is only fetched once.

Example: layout.js and page.js Fetching the Same Data

```js
// app/dashboard/layout.js
export default async function DashboardLayout({ children }) {
  const data = await fetch('https://api.example.com/user').then(res => res.json());

  return (
    <div>
      <h1>Welcome, {data.name}!</h1>
      {children} {/* No way to pass `data` directly */}
    </div>
  );
}
```

```js
// app/dashboard/page.js
export default async function DashboardPage() {
  const data = await fetch('https://api.example.com/user').then(res => res.json());

  return <h2>Dashboard for {data.name}</h2>;
}
```

- Even though both files call the API, Next.js only makes one request (auto-deduping)!

---

### **2. `page.js / page.tsx` (Page File)**
- Defines an actual page route.
- Required for rendering a route.

📌 **Example:**
```tsx
// app/dashboard/page.tsx → Renders /dashboard
export default function Dashboard() {
  return <h1>Dashboard Page</h1>;
}
```

---

### **3. `loading.js / loading.tsx` (Loading UI)**
- Provides a loading state while fetching server-side data.
- Uses React Suspense.

📌 **Example:**
```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <p>Loading...</p>;
}
```

---

### **4. `not-found.js / not-found.tsx` (Custom 404 Page)**
- Handles 404 errors for missing pages inside a route.

📌 **Example:**
```tsx
// app/not-found.tsx
export default function NotFound() {
  return <h1>Page Not Found</h1>;
}
```

---

### **5. `error.js / error.tsx` (Error UI)**
- Handles errors **within a specific layout or page**.
- Uses the `useEffect` hook for error resets.
- To handle errors within the root layout or template, use a variation of `error.js called global-error.js`.
- it is important to note that global-error.js must define its own `<html>` and `<body>` tags.

📌 **Example:**
```tsx
// app/dashboard/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
```

---

### **6. `global-error.js / global-error.tsx` (Global Error UI)**
- Handles errors for the **entire application**.
- Placed inside `app/`.

📌 **Example:**
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

---

### **7. `route.js / route.ts` (API Endpoint)**
- Defines an **API route** for handling server-side requests.

📌 **Example:**
```ts
// app/api/user/route.ts → API at /api/user
export async function GET() {
  return Response.json({ name: 'John Doe' });
}
```

---

### **8. `template.js / template.tsx` (Re-rendered Layout)**
- Works **like `layout.tsx` but re-renders on navigation**.
- Useful when you need a fresh layout for each visit.

📌 **Example:**
```tsx
// app/dashboard/template.tsx
export default function Template({ children }) {
  return <div className="dashboard">{children}</div>;
}
```

---

### **9. `default.js / default.tsx` (Parallel Route Fallback Page)**
- Used for **parallel routes** when no other route is matched.

📌 **Example:**
```tsx
// app/@notifications/default.tsx
export default function Default() {
  return <p>No notifications available</p>;
}
```

---

### **📌 Summary Table**
| File Name        | Extension | Purpose |
|-----------------|-----------|---------|
| `layout`        | `.js/.jsx/.tsx` | Persistent layout wrapper |
| `page`          | `.js/.jsx/.tsx` | Defines a route page |
| `loading`       | `.js/.jsx/.tsx` | Shows loading state (Suspense) |
| `not-found`     | `.js/.jsx/.tsx` | Custom 404 page |
| `error`         | `.js/.jsx/.tsx` | Handles errors in a specific page |
| `global-error`  | `.js/.jsx/.tsx` | Handles errors globally |
| `route`         | `.js/.ts` | API endpoint handler |
| `template`      | `.js/.jsx/.tsx` | Re-rendered layout (non-persistent) |
| `default`       | `.js/.jsx/.tsx` | Default UI for parallel routes |

Let me know if you need further explanation! 🚀




### **Dynamic Routes in Next.js (App Router)**  

Next.js **App Router** (`app/` directory) supports **dynamic routing** with bracket notation. Here’s how it works:  

---

## **1️⃣ `[folder]` → Dynamic Route Segment**  
- **Creates a dynamic route based on a URL parameter**  
- Example: `/products/[id]/page.tsx` → Matches `/products/123`, `/products/xyz`  

📌 **Example Structure:**  
```
/app
  /products
    /[id]
      page.tsx  → Matches `/products/:id`
```

📌 **Example Code (`app/products/[id]/page.tsx`):**  
```tsx
export default function ProductPage({ params }) {
  return <h1>Product ID: {params.id}</h1>;
}
```
✅ **URL:** `/products/42` → **Renders:** `Product ID: 42`  

---

## **2️⃣ `[...folder]` → Catch-All Route Segment**  
- **Matches multiple path segments after a base route**  
- Example: `/docs/[...slug]/page.tsx` → Matches `/docs/setup/install`, `/docs/react/hooks`  

📌 **Example Structure:**  
```
/app
  /docs
    /[...slug]
      page.tsx  → Matches `/docs/:slug+`
```

📌 **Example Code (`app/docs/[...slug]/page.tsx`):**  
```tsx
export default function DocsPage({ params }) {
  return <h1>Docs Path: {params.slug.join(' / ')}</h1>;
}
```
✅ **URL:** `/docs/setup/install` → **Renders:** `Docs Path: setup / install`  

---

## **3️⃣ `[[...folder]]` → Optional Catch-All Route Segment**  
- **Same as `[...folder]`, but also matches the base route itself**  
- Example: `/blog/[[...slug]]/page.tsx` → Matches `/blog`, `/blog/nextjs`, `/blog/nextjs/app-router`  

📌 **Example Structure:**  
```
/app
  /blog
    /[[...slug]]
      page.tsx  → Matches `/blog/:slug*` (including `/blog`)
```

📌 **Example Code (`app/blog/[[...slug]]/page.tsx`):**  
```tsx
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

---

## **📌 Summary Table**
| Dynamic Route Type  | Syntax         | Example Match |
|--------------------|---------------|--------------|
| **Dynamic Segment** | `[folder]` | `/products/42` → `{ id: "42" }` |
| **Catch-All Route** | `[...folder]` | `/docs/setup/install` → `{ slug: ["setup", "install"] }` |
| **Optional Catch-All** | `[[...folder]]` | `/blog`, `/blog/react` → `{ slug: ["react"] }` OR `{ slug: undefined }` |

Let me know if you need more details! 🚀



### **Key Configuration Files in a Next.js Project**  

Next.js projects include several configuration files that control project settings, environment variables, and dependencies. Here’s a breakdown of each file and its purpose:  

---

## **📌 1. `next.config.js` → Next.js Configuration**
- The main configuration file for Next.js.  
- Used to customize settings like `webpack`, `i18n`, `redirects`, `headers`, and more.  

📌 **Example:**
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

---

## **📌 2. `package.json` → Project Dependencies & Scripts**
- Manages dependencies and scripts for the Next.js project.  
- Defines installed packages and CLI scripts like `dev`, `build`, and `start`.  

📌 **Example:**
```json
{
  "name": "nextjs-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

---

## **📌 3. `instrumentation.ts` → OpenTelemetry & Instrumentation**
- Used for performance monitoring and tracing requests.  
- Introduced in Next.js 13+ to integrate observability tools like OpenTelemetry.  

📌 **Example:**
```ts
export function register() {
  console.log('OpenTelemetry instrumentation registered');
}
```

---

## **📌 4. `middleware.ts` → Next.js Middleware**
- Runs **before** the request reaches a route.  
- Useful for authentication, redirects, and request modifications.  
- matcher allows you to filter Middleware to run on specific paths.
  - it can be single path or multiple paths
  - allows full regex

📌 **Example:**
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
✅ **Applies to every request automatically when placed in the root of the `app/` or `pages/` directory.**


### NextResponse

The `NextResponse` API allows you to:

- `redirect` the incoming request to a different URL
- `rewrite` the response by displaying a given URL
- Set request headers for API Routes, getServerSideProps, and rewrite destinations
- Set response cookies
- Set response headers

### Using Cookies

- For incoming requests, cookies comes with the following methods: `get`, `getAll`, `set`, and `delete` cookies. You can check for the existence of a cookie with `has` or remove all cookies with `clear`.
- For outgoing responses, cookies have the following methods `get`, `getAll`, `set`, and `delete`.



middleware.js
```js
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

### Setting Headers

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

### CORS
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


### **`waitUntil` and `NextFetchEvent` in Next.js Middleware**
In Next.js, Middleware runs **before a request is processed**. Sometimes, you might need to perform **asynchronous background tasks** without delaying the response. This is where `waitUntil` and `NextFetchEvent` come in.

---

## **1️⃣ What is `NextFetchEvent`?**
`NextFetchEvent` is an object passed to Middleware that provides the `waitUntil` method. This allows you to run **long-running async tasks in the background** without blocking the response.

📌 **Example: Basic Usage of `NextFetchEvent`**
```javascript
import { NextResponse } from "next/server";

export function middleware(request, event) {
  event.waitUntil(
    fetch("https://example.com/log", { method: "POST", body: JSON.stringify({ url: request.url }) })
  );

  return NextResponse.next(); // Continue processing the request immediately
}
```
🔹 Here, we send a logging request **in the background** while letting the request continue.  

---

## **2️⃣ Why Use `waitUntil`?**
By default, JavaScript's event loop might **cancel async tasks** if Middleware finishes execution early. `waitUntil` ensures the task **runs to completion** even after the middleware function returns.

---

## **3️⃣ How `waitUntil` Works**
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
  export function middleware(request, event) {
    event.waitUntil(
      fetch("https://example.com/log", { method: "POST", body: JSON.stringify({ url: request.url }) })
    );
    return NextResponse.next();
  }
  ```
  ✅ The logging request **will always complete**, even if Middleware finishes execution.

---

## **4️⃣ Real-World Use Cases**
### **🔹 Logging Requests**
Track page visits or API calls without delaying user responses.
```javascript
export function middleware(request, event) {
  event.waitUntil(
    fetch("https://analytics.example.com/track", {
      method: "POST",
      body: JSON.stringify({ url: request.url, time: new Date().toISOString() }),
    })
  );

  return NextResponse.next();
}
```

### **🔹 Background Token Refresh**
Refresh authentication tokens **without blocking page loads**.
```javascript
export function middleware(request, event) {
  const token = request.cookies.get("authToken");

  event.waitUntil(
    fetch("https://example.com/refresh-token", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  return NextResponse.next();
}
```

### **🔹 User Analytics Tracking**
Send user session data **without delaying the main request**.
```javascript
export function middleware(request, event) {
  event.waitUntil(
    fetch("https://example.com/analytics", {
      method: "POST",
      body: JSON.stringify({ userAgent: request.headers.get("user-agent") }),
    })
  );

  return NextResponse.next();
}
```

---

## **5️⃣ Key Takeaways**
✔ `NextFetchEvent` gives access to `waitUntil` in Middleware.  
✔ `waitUntil` ensures async tasks **run to completion**.  
✔ **Use cases:** logging, analytics, token refresh, etc.  
✔ **Does not block** request execution.  

🚀 **Now you can efficiently run background tasks in Next.js Middleware!**


### Advance middleware
### **`skipMiddlewareUrlNormalize` and `skipTrailingSlashRedirect` in Next.js**

Next.js automatically **normalizes URLs** and **redirects trailing slashes** unless you configure it otherwise. These two options allow you to **control this behavior** in Middleware.

---

## **1️⃣ `skipMiddlewareUrlNormalize`**
By default, Next.js **normalizes URLs** before passing them to Middleware. This means:
- Removing duplicate slashes (`//`)
- Decoding encoded characters (`%20` → space)
- Converting `/index` to `/`

👉 **`skipMiddlewareUrlNormalize: true`** **prevents** Next.js from normalizing URLs before Middleware executes.

📌 **Example**
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
### **✅ When to Use?**
✔ When your Middleware logic depends on the **original raw URL format**  
✔ When handling **case-sensitive** or **encoded URLs**  
✔ When working with **special characters in URLs**  

---

## **2️⃣ `skipTrailingSlashRedirect`**
By default, Next.js **automatically redirects URLs** based on trailing slashes:
- `/about/` → `/about`
- `/blog/post/` → `/blog/post`

👉 **`skipTrailingSlashRedirect: true`** **disables** this behavior in Middleware.

📌 **Example**
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
### **✅ When to Use?**
✔ When your routes **require trailing slashes** for proper behavior  
✔ When handling **legacy URLs** that depend on a trailing slash  
✔ When working with **external services that expect a specific URL format**  

---

## **3️⃣ Using Both Together**
You can **combine both options** to completely prevent Next.js from modifying the URL **before Middleware runs**.

📌 **Example**
```javascript
export const config = {
  matcher: "/api/:path*",
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
};

export function middleware(request) {
  console.log(request.nextUrl.pathname); // Preserves the exact format of the incoming URL
  return NextResponse.next();
}
```

### **🚀 Summary**
| Option | Default Behavior | Effect When Enabled |
|--------|----------------|------------------|
| `skipMiddlewareUrlNormalize` | Normalizes URL before Middleware | Preserves raw URL format |
| `skipTrailingSlashRedirect` | Removes trailing slashes automatically | Keeps trailing slashes |

👉 **Use these options when you need precise URL handling in Middleware!** 🚀

---

## **📌 5. `.env` Files → Environment Variables**
- Used to store API keys, database credentials, and other sensitive data.  
- Next.js automatically loads variables from `.env` files.  

📌 **Different Environment Files:**
| File | Purpose |
|------|---------|
| `.env` | Default environment variables for all environments. |
| `.env.local` | Variables specific to local development (ignored by Git). |
| `.env.production` | Variables for production builds. |
| `.env.development` | Variables for development mode. |

📌 **Example (`.env.local`):**
```
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgres://user:pass@localhost:5432/db
```

✅ **Access in Next.js:**  
```ts
console.log(process.env.NEXT_PUBLIC_API_URL);
```

---

## **📌 6. `.eslintrc.json` → ESLint Configuration**
- Configures ESLint rules for code linting and formatting.  
- Helps enforce best practices and coding standards.  

📌 **Example:**
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "react/no-unescaped-entities": "off"
  }
}
```

---

## **📌 7. `.gitignore` → Git Ignore File**
- Specifies files and folders to **exclude** from Git commits.  

📌 **Example:**
```
node_modules/
.next/
.env.local
```

---

## **📌 8. `next-env.d.ts` → TypeScript Declarations**
- **Auto-generated** file that ensures TypeScript support in Next.js.  
- **Do not edit** this file manually.  

📌 **Example Content:**
```ts
/// <reference types="next" />
/// <reference types="next/types/global" />
```

---

## **📌 9. `tsconfig.json` → TypeScript Configuration**
- Configures TypeScript compiler options.  

📌 **Example:**
```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

---

## **📌 10. `jsconfig.json` → JavaScript Configuration**
- Similar to `tsconfig.json`, but for **JavaScript projects**.  
- Used for configuring paths and module resolution.  

📌 **Example:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

---

## **🚀 Summary Table**
| File | Purpose |
|------|---------|
| `next.config.js` | Configures Next.js settings (e.g., redirects, images, webpack). |
| `package.json` | Manages dependencies and project scripts. |
| `instrumentation.ts` | Handles OpenTelemetry and observability. |
| `middleware.ts` | Runs code before a request reaches a route (e.g., auth checks). |
| `.env` Files | Store environment variables securely. |
| `.eslintrc.json` | Configures ESLint for linting JavaScript/TypeScript. |
| `.gitignore` | Specifies files/folders to ignore in Git. |
| `next-env.d.ts` | Auto-generated TypeScript declaration file. |
| `tsconfig.json` | Configures TypeScript compiler options. |
| `jsconfig.json` | Configures JavaScript module resolution and paths. |

Let me know if you need more details! 🚀



## **📌 Route Groups & Private Folders in Next.js (App Router)**  

Next.js **App Router** (`app/` directory) allows structuring routes efficiently using **Route Groups** and **Private Folders**.  

---

## **1️⃣ Route Groups → `(folder)`**  
- Used to **group related routes** **without affecting the URL structure**.  
- Helps organize large projects by grouping routes logically.  
- **Parent folder names do NOT appear in the URL.**  

### **📌 Example Structure:**
```
/app
  /(dashboard)
    /users
      page.tsx   → Renders `/users`
    /settings
      page.tsx   → Renders `/settings`
```
✅ **URL Path Output:**  
- `/users` (NOT `/dashboard/users`)  
- `/settings` (NOT `/dashboard/settings`)  

### **📌 Example Code (`app/(dashboard)/users/page.tsx`):**
```tsx
export default function UsersPage() {
  return <h1>User List</h1>;
}
```
✅ **Visiting `/users` renders:** `"User List"`  

💡 **Why Use Route Groups?**  
- Organizes routes **without affecting the URL**.  
- Useful for layouts, authentication groups, or dashboards.  

---

## **2️⃣ Private Folders → `_folder`**  
- Prefixing a folder with `_` **excludes it from the routing system**.  
- Useful for organizing **utility files**, **components**, or **API helpers** inside `app/`.  

### **📌 Example Structure:**
```
/app
  /dashboard
    /users
      page.tsx   → Renders `/dashboard/users`
  /_utils
    helpers.ts   → NOT a route (ignored by Next.js)
```

### **📌 Example Code (`app/_utils/helpers.ts`):**
```ts
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
```
✅ **Cannot be accessed as a route (`/_utils/helpers`)**  
✅ **Can be imported inside other components**  

💡 **Why Use Private Folders?**  
- Keep non-route files organized **inside the `app/` directory**.  
- Prevent unnecessary public access to helper files.  

---

## **🚀 Summary Table**
| Feature | Syntax | Purpose |
|---------|--------|---------|
| **Route Groups** | `(folder)` | Groups routes **without affecting the URL** |
| **Private Folders** | `_folder` | Excludes folder from routing (for utils, helpers, components) |

Let me know if you need more details! 🚀


# **📌 Parallel & Intercepted Routes in Next.js (App Router)**  

Next.js **App Router** allows creating advanced routing patterns using **Parallel Routes** and **Intercepted Routes**.

---

## **1️⃣ Parallel Routes (`@folder`) → Named Slots**  
- **Used to render multiple pages in parallel inside a layout.**  
- Each slot (`@folder`) **renders a separate route**, allowing **multiple views in a single layout**.  
- Ideal for **dashboards with multiple panels**, **chat apps**, or **sidebars**.  

### **📌 Example Structure:**
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

### **📌 Example Code:**
#### **`app/dashboard/layout.tsx` (Using Parallel Slots)**
```tsx
export default function DashboardLayout({ analytics, settings }) {
  return (
    <div>
      <main>{analytics}</main>
      <aside>{settings}</aside>
    </div>
  );
}
```

#### **`app/dashboard/@analytics/page.tsx`**
```tsx
export default function AnalyticsPage() {
  return <h1>Analytics Panel</h1>;
}
```

#### **`app/dashboard/@settings/page.tsx`**
```tsx
export default function SettingsPage() {
  return <h1>Settings Panel</h1>;
}
```

✅ **Visiting `/dashboard` Renders:**  
```
-----------------------
| Analytics | Settings |
|   Panel   |  Panel   |
-----------------------
```
✅ **Allows loading multiple pages (slots) at once!**  

---

## **2️⃣ Intercepted Routes (`(.)folder`, `(..)folder`, `(...)folder`)**  
- Used to **override the normal navigation flow** by intercepting requests.  
- Helps when **embedding a different page inside another page** (e.g., opening a modal instead of full navigation). 
- For example, when clicking on a photo in a feed, you can display the photo in a modal, overlaying the feed. In this case, Next.js intercepts the /photo/123 route, masks the URL, and overlays it over /feed.

![BOM](/images/intercepting1.avif)

- However, when navigating to the photo by clicking a shareable URL or by refreshing the page, the entire photo page should render instead of the modal. No route interception should occur.

![BOM](/images/intercepting2.avif)


### **📌 Types of Interception**
| Syntax | Intercepts From |
|--------|----------------|
| **`(.)folder`** | Same level |
| **`(..)folder`** | One level above |
| **`(..)(..)folder`** | Two levels above |
| **`(...)folder`** | From the root |


```
// refer below url for more details

https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes
```
---

### **📌 Example 1: Same-Level Interception (`(.)folder`)**  
**Scenario:** Clicking on a post in `/feed` should show a modal instead of navigating away.  

#### **📌 Example Structure:**
```
/app
  /feed
    page.tsx   → Renders `/feed`
  /(.)post
    [id]
      page.tsx → Intercepts `/feed/:id`
```

#### **📌 Example Code:**
##### **`app/feed/page.tsx`**
```tsx
export default function FeedPage() {
  return <h1>Feed Page</h1>;
}
```

##### **`app/(.)post/[id]/page.tsx` (Intercepts from `/feed` and renders a modal)**
```tsx
export default function PostModal({ params }) {
  return <div className="modal">Post ID: {params.id}</div>;
}
```
✅ **Visiting `/feed/123` in `/feed` shows the modal instead of full navigation.**  

---

### **📌 Example 2: One-Level Interception (`(..)folder`)**  
**Scenario:** Clicking on a product inside `/shop` should open a modal inside `/dashboard`, instead of navigating away.

#### **📌 Example Structure:**
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

##### **`app/dashboard/(..)products/[id]/page.tsx`**
```tsx
export default function ProductModal({ params }) {
  return <div className="modal">Product ID: {params.id}</div>;
}
```
✅ **Visiting `/shop/products/42` while in `/dashboard` opens a modal instead of a new page.**  

---

### **📌 Example 3: Root-Level Interception (`(...)folder`)**  
- Used when you want to **render a different page while keeping the user in the current route**.  

#### **📌 Example Structure:**
```
/app
  /about
    page.tsx → Renders `/about`
  /(...)privacy
    page.tsx → Intercepts `/privacy` and shows in `/about`
```
✅ **Visiting `/privacy` inside `/about` will keep you on `/about` while rendering the privacy page.**  

---

## **🚀 Summary Table**
| Feature | Syntax | Purpose |
|---------|--------|---------|
| **Parallel Routes** | `@folder` | Renders multiple views in the same layout |
| **Same-Level Interception** | `(.)folder` | Intercepts requests at the same level |
| **One-Level Up Interception** | `(..)folder` | Intercepts requests one level above |
| **Two-Levels Up Interception** | `(..)(..)folder` | Intercepts requests two levels above |
| **Root-Level Interception** | `(...)folder` | Intercepts from the root level |

Let me know if you need more details! 🚀


## Component hierarchy
components in special files of a route segment are rendered in a specific order. This hierarchy ensures layouts, error handling, and loading states work seamlessly.

The React components defined in special files of a route segment are rendered in a specific hierarchy:

- layout.js
- template.js
- error.js (React error boundary)
- loading.js (React suspense boundary)
- not-found.js (React error boundary)
- page.js or nested layout.js

![BOM](/images/hierarchy1.avif)


In a nested route, the components of a segment will be nested inside the components of its parent segment.

![BOM](/images/hierarchy2.avif)


> ## Colocation

However, even though route structure is defined through folders, a route is `not publicly accessible` until a `page.js or route.js` file is added to a route segment. This means that `project files` can be `safely colocated` inside route segments in the app directory without accidentally being routable.


![BOM](/images/colocation.avif)


> ## Route groups

Route groups can be created by wrapping a folder in parenthesis: `(folderName)`

This indicates the folder is for organizational purposes and should `not be included` in the route's URL path.

- Organizing routes into groups e.g. by site section, intent, or team.

![BOM](/images/groups.avif)

<br>

> ### navigation in route ` <Link href={`/blog/${post.slug}`}>{post.title}</Link>`

> ### Scrolling to an id

If you'd like to scroll to a specific `id` on navigation, you can append your URL with a `#` hash link or just pass a hash link to the `href` prop

```js
<Link href="/dashboard#settings">Settings</Link>
 
// Output
<a href="/dashboard#settings">Settings</a>
```

> ### Disabling scroll restoration

The default behavior of the Next.js App Router is to `scroll to the top of a new route or to maintain the scroll position for backwards and forwards navigation`. If you'd like to disable this behavior, you can pass `scroll={false}` to the `<Link>` component, or `scroll: false` to `router.push()` or `router.replace()`.


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

> ### Optimizing image
 
```js
import Image from 'next/image'
 
export default function Page() {
    return <Image src="" alt="" />
}
```

**Local images**

- Next.js will automatically determine the intrinsic `width` and `height` of your image based on the imported file. These values are used to determine the image ratio and prevent Cumulative Layout Shift while your image is loading.

- in app/page.tsx
```js
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

**Remote images**

- Since Next.js does not have access to remote files during the build process, you'll need to provide the `width, height and optional blurDataURL props manually`. The width and height attributes are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in.

- in app/page.tsx
```jsx
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

- Then, to safely allow images from remote servers, you need to define a list of supported URL patterns in `next.config.js`. Be as specific as possible to prevent malicious usage. For example, the following configuration will only allow images from a specific AWS S3 bucket:

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

> ### Optimizing fonts

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


**Google fonts**
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

**Local fonts**
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

> ### Metadata

```js
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Next.js',
}
 
export default function Page() {
  return '...'
}
```

> ### redirects in next.config.js

in next.config.js
```js
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

- redirects runs before Middleware.

**NextResponse.redirect in Middleware**
- This is useful if you want to redirect users based on a condition (e.g. authentication, session management, etc) or have a large number of redirects.
- For example, to redirect the user to a /login page if they are not authenticated:

in middleware.ts
```js
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

- Middleware runs after redirects in next.config.js and before rendering.



## **📌 Parallel Routes in Next.js (App Router)**  

### **🔹 What Are Parallel Routes?**  
Parallel Routes in Next.js **allow multiple pages to render simultaneously** in different sections of the UI. This is useful when:  
- **Different parts of a page have independent navigation** (e.g., a sidebar and main content)  
- **Multiple layouts need to be displayed at once**  
- **You want independent UI states without reloading the entire page**  

- Parallel Routes allows you to simultaneously or conditionally render one or more pages within the same layout. eg considering a dashboard, you can use parallel routes to simultaneously render the team and analytics pages

- basically 2 page ko single layout me rakhna h, jisse 2 separate error, layout etc separately manage kr sakte h single layout or common page me

---

## **🔹 How Do Parallel Routes Work?**  
Parallel Routes use **named slots (`@slotName`)**, which act as placeholders for different route components.  

### **✅ Example: Parallel Dashboard Panels**  

### **📌 Folder Structure**
```
/app
  /dashboard
    layout.js        → Layout for dashboard
    /@feed
      page.js        → `/dashboard`
    /@notifications
      page.js        → `/dashboard`
```

### **📌 `layout.js` (Defining Parallel Slots)**
```tsx
export default function DashboardLayout({ feed, notifications }) {
  return (
    <div className="dashboard">
      <section>{feed}</section>
      <aside>{notifications}</aside>
    </div>
  );
}
```
- The **`feed` and `notifications` slots** render different routes **in parallel**.  

---

### **📌 `@feed/page.js` (Main Feed)**
```tsx
export default function FeedPage() {
  return <h1>News Feed</h1>;
}
```
✅ **Rendered inside `<section>` in `layout.js`**  

---

### **📌 `@notifications/page.js` (Sidebar Notifications)**
```tsx
export default function NotificationsPage() {
  return <h1>Notifications</h1>;
}
```
✅ **Rendered inside `<aside>` in `layout.js`**  

---

## **🚀 URL Behavior**
| URL | Rendered Components |
|-----|---------------------|
| `/dashboard` | ✅ `layout.js` → `<FeedPage />` + `<NotificationsPage />` |
| `/dashboard?feed=trending` | ✅ Updates only the feed slot |
| `/dashboard?notifications=alerts` | ✅ Updates only the notifications slot |

---

## **🔹 Why Use Parallel Routes?**  
✅ **Independent UI updates** (e.g., sidebar and feed update separately)  
✅ **Better UX** (switching tabs doesn’t reload the whole page)  
✅ **Optimized performance** (Next.js fetches only the needed part)  

---

## **🚀 Summary**  
- **Parallel Routes allow independent UI sections to update separately.**  
- **Use `@slotName` to define multiple areas that render different routes.**  
- **Great for dashboards, messaging apps, or any UI with independent sections.**  

Let me know if you need more details! 🚀





# **📌 Next.js Route Handlers – Simplified Guide 🚀**  

## **🔹 What are Route Handlers?**  
Route Handlers let you create custom API endpoints **inside the `app` directory** using Web APIs (`Request`, `Response`).

Route Handlers in Next.js `replace API routes` and allow you to create custom backend logic inside the `/app/api` directory. They handle HTTP requests (GET, POST, PUT, DELETE, etc.) `without needing an external backend`.

✅ **Equivalent to API Routes in the pages directory**  
🚫 **Cannot use API Routes & Route Handlers together**  

---

## **📌 Route Handler File: `route.js`**  
- Located inside `/app/api/`
- Defines backend logic for that route  
- Cannot exist at the same level as `page.js`  

✅ **Example**  
📂 Folder Structure:
```
/app
  /api
    /users
      route.js   → Handles `/api/users`
```

### **✅ Basic Route Handler**
```js
export async function GET() {
  return Response.json({ message: "Hello, Next.js!" });
}
```
---

## **🔹 Supported HTTP Methods**  
✅ **GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS**  
🚫 If an unsupported method is used, **Next.js returns 405 (Method Not Allowed).**  

### **✅ Example: Handling Multiple Methods**  
```js
export async function GET() {
  return Response.json({ message: "GET request received" });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ message: `POST request received: ${body.name}` });
}
```
---

## **🔹 Route Parameters & Query Parameters**  
✅ Extract route parameters from `{ params }`  
✅ Extract query parameters using `request.nextUrl.searchParams`

### **✅ Example: Dynamic Route (`/api/users/:id`)**
```js
export async function GET(_, { params }) {
  return Response.json({ id: params.id, name: `User ${params.id}` });
}
```
🟢 `GET /api/users/5` → `{ id: "5", name: "User 5" }`  

### **✅ Example: Query Parameters (`?search=hello`)**
```js
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("search");
  return Response.json({ query });
}
```
🟢 `GET /api/search?search=hello` → `{ query: "hello" }`  

---

## **🔹 Request Body Handling**  
### **✅ JSON Request Body**
```js
export async function POST(request) {
  const data = await request.json();
  return Response.json({ received: data });
}
```
---

## **🔹 Caching & Revalidation**  
**🔹 Default:** `GET` requests are **cached**  
**🔹 To disable caching:**  
1️⃣ Use **POST, PUT, DELETE**  
2️⃣ Use **cookies, headers**  
3️⃣ Set **dynamic mode**  

### **✅ Example: Cached Data (Revalidate every 60s)**
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
---

## **🔹 Cookies & Headers**  
### **✅ Setting Cookies**
app/api/route.js
```js
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


app/api/route.js
```js
export async function GET(request) {
  const token = request.cookies.get('token')
}
```

### **✅ Reading Headers**
```js
import { headers } from "next/headers";

export async function GET() {
  const referer = headers().get("referer");
  return Response.json({ referer });
}
```
---

## **🔹 Redirects**
```js
import { redirect } from "next/navigation";

export async function GET() {
  redirect("https://nextjs.org/");
}
```
🟢 Redirects to **Next.js website**  

---

## **🔹 Streaming (For Large Responses or AI APIs)**  
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
🟢 Used for **real-time AI-generated content**  



app/api/chat/route.js
```js
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

app/api/route.js
```js
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
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


---

## **🔹 Webhooks (Handling External API Calls)**  
```js
export async function POST(request) {
  try {
    const payload = await request.text();
    return new Response("Webhook received!", { status: 200 });
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
}
```
🟢 **Used for third-party API notifications (e.g., Stripe, GitHub Webhooks).**  

---

## **🔹 CORS (Cross-Origin Resource Sharing)**  
```js
export async function GET() {
  return new Response("Hello, Next.js!", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
```
🟢 **Allows requests from any origin.**  

---

## **🔹 Edge vs Node.js Runtime**  
By default, Route Handlers run on **Node.js**.  
To use **Edge Functions** for faster execution:  
```js
export const runtime = "edge";
```

---

## **🔹 Returning Non-UI Responses (XML, RSS, etc.)**
```js
export async function GET() {
  return new Response(`<?xml version="1.0"?><rss><channel></channel></rss>`, {
    headers: { "Content-Type": "application/xml" },
  });
}
```
🟢 **For generating `robots.txt`, `sitemap.xml`, etc.**  

---

## **🚀 Summary**
| Feature | Implementation |
|---------|---------------|
| **Create API Routes** | ✅ `route.js` inside `/app/api/` |
| **Handle GET Requests** | ✅ `export async function GET()` |
| **Handle POST Requests** | ✅ `export async function POST(request)` |
| **Use Route Params** | ✅ Extract from `{ params }` |
| **Use Query Params** | ✅ `request.nextUrl.searchParams.get("key")` |
| **Set Cookies** | ✅ `cookies().set("token", "abc123")` |
| **Set Headers** | ✅ `headers().get("referer")` |
| **Enable Streaming** | ✅ `return new StreamingTextResponse(stream)` |
| **Handle Webhooks** | ✅ Read `request.text()` |
| **CORS Support** | ✅ Set `Access-Control-Allow-Origin` in headers |
| **Run on Edge Functions** | ✅ `export const runtime = "edge"` |
| **Generate XML Responses** | ✅ `return new Response("<xml>...</xml>")` |

---

### **🎯 Key Takeaways**
✔️ **Route Handlers replace API Routes** in Next.js  
✔️ **Supports all HTTP methods** (GET, POST, PUT, DELETE, etc.)  
✔️ **Works with dynamic routes, query params, cookies, and headers**  
✔️ **Supports caching, revalidation, and Edge runtime**  

🔥 **Next.js Route Handlers simplify backend logic while staying in the same project!** 🚀  

Let me know if you need more details! 💡





## Data Fetching, Caching, and Revalidating

in app/page.js
```js
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


### **Caching Data in Next.js**

Next.js **automatically caches `fetch` requests** to optimize performance and reduce redundant API calls. By default, when you use `fetch`, it **stores the response in a Data Cache** on the server, allowing **subsequent requests to reuse the cached data**.

---

## **1️⃣ Default Caching Behavior (`force-cache`)**
By default, **Next.js caches all `fetch` requests on the server**, meaning:
- The response **does not need to be fetched again** on every request.
- Cached data is reused until it **expires** or is manually refreshed.

📌 **Example**
```javascript
fetch('https://api.example.com/data', { cache: 'force-cache' });
```
🔹 `force-cache` is **the default behavior** (even if not explicitly written).  
🔹 The response is **cached and reused** across multiple requests.

---

## **2️⃣ When `fetch` is NOT Cached**
There are **exceptions** where `fetch` does **not** use caching:

### **🔹 Inside a Server Action**
Server Actions run **on-demand** and are meant for dynamic, interactive behavior.  
Since they can modify data, caching would cause stale results.

📌 **Example**
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

---

### **🔹 Inside a Route Handler using `POST`**
Route Handlers (`app/api`) handle requests dynamically.  
`POST` requests usually **send data** to the server and expect an immediate response.

📌 **Example**
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
❌ This `fetch` **will not be cached** because:
- `POST` requests are **meant to mutate data**.
- Caching could **return outdated results**.

---

## **🚀 Summary**
| Case | Cached? | Reason |
|------|---------|--------|
| **Default fetch (`force-cache`)** | ✅ Yes | Next.js automatically caches it |
| **Inside a Server Action** | ❌ No | Server Actions run dynamically |
| **Inside a Route Handler (`POST`)** | ❌ No | `POST` modifies data, needs fresh results |

👉 **Use caching for performance, but ensure fresh data where needed!** 🚀


## Revalidating Data
Revalidation is the process of purging the Data Cache and re-fetching the latest data.

1. Time-based Revalidation 

Time-based revalidation in Next.js ensures that cached data is **refreshed periodically** instead of being permanently stored. This is done using the `{ next: { revalidate: <time_in_seconds> } }` option in `fetch`.

---

### **🔹 How It Works**
- When you fetch data with `revalidate`, Next.js **stores it in the cache**.
- After the specified time (in seconds), the cache **becomes stale**.
- The next request **triggers a re-fetch** to update the cache while still serving stale data until fresh data arrives.

---

### **📌 Example: Revalidate Every 10 Seconds**
```javascript
fetch("https://api.example.com/data", { next: { revalidate: 10 } });
```
🔹 The data is cached for **10 seconds**.  
🔹 Any request within **10 seconds** uses the cached data.  
🔹 After **10 seconds**, the next request **re-fetches the data** and updates the cache.

Alternatively, to revalidate all fetch requests in a route segment, you can use

layout.js | page.js
```js
export const revalidate = 3600 // revalidate at most every hour
```

---

### **🔹 Server Component Example**
If you're using a **Server Component**, you can fetch and revalidate data like this:
```javascript
export default async function Page() {
  const res = await fetch("https://api.example.com/data", { next: { revalidate: 60 } });
  const data = await res.json();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```
🛠 **Behavior:**
- The data is refreshed **every 60 seconds**.
- Requests **within 60 seconds** return cached data.
- After 60 seconds, the **first request triggers a re-fetch**.

---

### **🔹 API Route Example**
Inside an API route (`app/api/data/route.js`):
```javascript
export async function GET() {
  const res = await fetch("https://api.example.com/data", { next: { revalidate: 30 } });
  const data = await res.json();

  return Response.json(data);
}
```
🔹 The API route returns **cached data for 30 seconds**.  
🔹 After 30 seconds, the **first request triggers a re-fetch**.

---

## **🚀 Summary**
| Approach | Caching? | Revalidation? |
|----------|---------|--------------|
| `fetch(url)` (default) | ✅ Yes | ❌ No, always cached |
| `fetch(url, { cache: 'no-store' })` | ❌ No | ❌ Always fresh |
| `fetch(url, { next: { revalidate: 10 } })` | ✅ Yes | ✅ Every 10 sec |

👉 **Use `revalidate` to balance caching and fresh data!** 🚀


2. On-demand Revalidation

Next.js has a cache tagging system for invalidating fetch requests across routes.
1. When using fetch, you have the option to tag cache entries with one or more tags.
2. Then, you can call revalidateTag to revalidate all entries associated with that tag.

app/page.js
```js
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```

You can then revalidate this fetch call tagged with `collection` by calling `revalidateTag` in a Server Action:

```js
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function action() {
  revalidateTag('collection')
}
```

**Error handling and revalidation**
If an error is thrown while attempting to revalidate data, the last successfully generated data will continue to be served from the cache. On the next subsequent request, Next.js will retry revalidating the data.


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




## Server Actions and Mutations

- Server Actions are asynchronous functions that are executed on the server.
- A Server Action can be defined with the React `"use server"` directive. You can place the directive at the top of an `async` function to mark the function as a Server Action, or at the top of a separate file to mark all exports of that file as Server Actions.

app/page.jsx
```js
// Server Component
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







---------------
Ye dekhna h

- https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes#generating-static-params

-----
