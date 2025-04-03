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

Note below are for app router: 
- Jo bhi logs terminal me aaye means wo server side execute hua and jo logs browser me aaye wo clinet side execute hua h
- It has page.js not index.js in folder which serve as main file.
- By default, all components are server side components only
- "use client" directive added, the component should run on client side & server side
- when we click on next Link button, the component which comes on route change runs on server side, not on client side
- you can have "use client" or "use server" in single component, if both needed then make that component to two separate coponenent, and use them separately
- in next js when we are using any type of hook, then we have to add the "use client" at the top, then it is better to make that hook part separate component and add "use client" in that component and import it
- Next caches very regressiveely in next 14

<br>

## 120, 150,180 no ki video phir dekhni h

<br>

> ### **App Router vs Pages Router in Next.js**

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

**2. Pages Router (`pages/` directory) - "pages" folder is at Top leve**

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

## **Next.js Routing Files in the App Router (`app/` directory)**  

### **1. `layout.js / layout.tsx` (Layout File)**
- A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender. Act as persistent UI wrapper
- Layouts are Server Components by default but can be set to a Client Component.
- Layouts do not have access to the route segments below itself. To access all route segments, you can use `useSelectedLayoutSegment` or `useSelectedLayoutSegments` in a Client Component.
- A root layout is the top-most layout in the root app directory. while other layout existed in route folder
- The app directory must include a root app/layout.js.
- The `root layout` should have the `html, body` and `metadata(metadata is reseved and must shared object) function`


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

**`Props` in layout**
1. children (required)
2. params (optional)

Params is available in layout.js of `route folder`, but params is `not available` in `root layout.js`


| Example                               | URL            | `params`               |
|---------------------------------------|---------------|------------------------|
| `app/dashboard/[team]/layout.js`      | `/dashboard/1` | `{ team: '1' }`       |
| `app/shop/[tag]/[item]/layout.js`     | `/shop/1/2`    | `{ tag: '1', item: '2' }` |
| `app/blog/[...slug]/layout.js`        | `/blog/1/2`    | `{ slug: ['1', '2'] }` |


**Note**: Passing `data between a parent layout` and its `children` is `not possible`. However, you can `fetch the same data` in a route `more than once`, and the same API call is made in layout.js and page.js, React will automatically `deduplicate (dedupe)` requests, ensuring the data is only fetched once.

**Example:**

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

<br>

### **2. `page.js / page.tsx` (Page File)**
- Defines an actual page route.


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

### **3. `loading.js / loading.tsx` (Loading UI)**
- Provides a loading state while fetching server-side data.
- Uses React Suspense.


```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <p>Loading...</p>;
}
```

- sometimes loading.js is not working as expected then in that condition we can use the `suspense with fallback` in that component, same as we do in react js

<br>

### **4. `not-found.js / not-found.tsx` (Custom 404 Page)**
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

### we have not found function `notFound()`

The `notFound` function allows you to render the `not-found file` within a route segment

**notFound()**

Invoking the `notFound()` function throws a NEXT_NOT_FOUND error and terminates rendering of the route segment in which it was thrown. Specifying a not-found file allows you to gracefully handle such errors by rendering a Not Found UI within the segment.

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

### **5. `error.js / error.tsx` (Error UI)**
- Handles errors **within a specific layout or page**.
- Uses the `useEffect` hook for error resets.
- To handle errors within the root layout or template, use a variation of `error.js called global-error.js`.
- it is important to note that global-error.js must define its own `<html>` and `<body>` tags.

📌 **Example:**
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

### **6. `global-error.js / global-error.tsx` (Global Error UI)**
- Handles errors for the **entire application**.
- To specifically handle errors in root `layout.js`
- Placed inside `app/`.


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

### **7. `route.js / route.ts` (API Endpoint)**
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

### **8. `template.js / template.tsx` (Re-rendered Layout)**
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

### **9. `default.js / default.tsx` (Parallel Route Fallback Page)**
- Used for **parallel routes** when no other route is matched in the slot( slot is any part of parallel route).

📌 **Example:**
```tsx
// app/@notifications/default.tsx
export default function Default() {
  return <p>No notifications available</p>;
}
```

**Props**

**params (optional)**

| Example                                      | URL         | `params`                  |
|----------------------------------------------|------------|---------------------------|
| `app/@sidebar/[artist]/default.js`          | `/zack`     | `{ artist: 'zack' }`      |
| `app/@sidebar/[artist]/[album]/default.js`  | `/zack/next` | `{ artist: 'zack', album: 'next' }` |

<br>

### **When Does `default.js` Load?**

Let’s break it down in a simple way.  

### **1. Initial Folder Structure (Everything Works Fine)**
```
app
 ├── dashboard
 │   ├── @analytics
 │   │   ├── page.js       (Analytics UI)
 │   ├── @revenue
 │   │   ├── page.js       (Revenue UI)
```
- When you visit `/dashboard`, both **analytics** and **revenue** load correctly. ✅



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



### **Conclusion**
- If a parallel route is missing for a dynamic route, Next.js throws an error.  
- Either **match the folder structure** or use `default.js` to **provide fallback UI**.


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

## **Dynamic Routes in Next.js (App Router)**  

Next.js **App Router** (`app/` directory) supports **dynamic routing** with bracket notation. Here’s how it works:  

<br>

> ### Dynamic Route Segment 
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

> ### `[...folder]` → Catch-All Route Segment

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

<br>

> ### `[[...folder]]` → Optional Catch-All Route Segment**  

- **Same as `[...folder]`, but also matches the base route itself**  
- Example: `/blog/[[...slug]]/page.tsx` → Matches `/blog`, `/blog/nextjs`, `/blog/nextjs/app-router`  

- basically cathing all route, which can deeply nested in single component

**Example Structure:**  
```
/app
  /blog
    /[[...slug]]
      page.tsx  → Matches `/blog/:slug*` (including `/blog`)
```

**Example Code (`app/blog/[[...slug]]/page.tsx`):**  
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

<br>
<br>


## **Key Configuration Files in a Next.js Project**  

Next.js projects include several configuration files that control project settings, environment variables, and dependencies. Here’s a breakdown of each file and its purpose:  

<br>

### **1. `next.config.js` → Next.js Configuration**
- The main configuration file for Next.js.  
- Used to customize settings like `webpack`, `i18n`, `redirects`, `headers`, and more.  


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

<br>

### **2. `instrumentation.js|ts` → OpenTelemetry & Instrumentation**
- Used for performance monitoring and logging requests.  
- Introduced in Next.js 13+ to integrate observability tools like OpenTelemetry.  
- place the file in the root of your application or inside a src folder if using one, not in app/pages folder

- There are many 3rd party services for the telemetry, `below is code for otel`.

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

<br>

### **3. `middleware.ts` → Next.js Middleware**
- Runs **before** the request reaches a route.  
- Useful for authentication, redirects, and request modifications.  
- `matcher` allows you to filter Middleware to run on specific paths.
  - it can be single path or multiple paths
  - allows full regex
- to make it work, add middleware.ts in root folder


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

#### Setting Headers

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
<br>

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

<br>
<br>

## **`waitUntil` and `NextFetchEvent` in Next.js Middleware**
In Next.js, Middleware runs **before a request is processed**. Sometimes, you might need to perform **asynchronous background tasks** without delaying the response. This is where `waitUntil` and `NextFetchEvent` come in.

<br>

### **1️⃣ What is `NextFetchEvent`?**
`NextFetchEvent` is an object passed to `Middleware` that provides the `waitUntil` method. This allows you to run **long-running async tasks in the background** without blocking the response.

```js
import { NextResponse } from "next/server";

export function middleware(request, event) {
  event.waitUntil(
    fetch("https://example.com/log", { method: "POST", body: JSON.stringify({ url: request.url }) })
  );

  return NextResponse.next(); // Continue processing the request immediately
}
```
🔹 Here, we send a logging request **in the background** while letting the request continue.  

<br>

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
  export function middleware(request, event) {
    event.waitUntil(
      fetch("https://example.com/log", { method: "POST", body: JSON.stringify({ url: request.url }) })
    );
    return NextResponse.next();
  }
  ```
  ✅ The logging request **will always complete**, even if Middleware finishes execution.

<br>

### **4️⃣ Real-World Use Cases**

<br>

**🔹 Logging Requests**
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

**🔹 Background Token Refresh**
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

**🔹 User Analytics Tracking**
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

<br>

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

<br>

## **📌 Route Groups & Private Folders in Next.js (App Router)**  

**1️⃣ Route Groups → `(folder)`**  
- Used to **group related routes** **without affecting the URL structure**.  
- **Parent folder names do NOT appear in the URL.**
- In that group folder, we can create a layout.js which only works for that folder

**📌 Example Structure:**
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


**Example Code (`app/(dashboard)/users/page.tsx`):**
```tsx
export default function UsersPage() {
  return <h1>User List</h1>;
}
```
✅ **Visiting `/users` renders:** `"User List"`  


**Why Use Route Groups?**  
- Organizes routes **without affecting the URL**.  
- Useful for layouts, authentication groups, or dashboards.  


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

<br>

> ### Parallel & Intercepted Routes in Next.js (App Router)

**1️⃣ Parallel Routes (`@folder`) → Named Slots**  
- **Used to render multiple pages in parallel inside a layout.**  
- Each slot (`@folder`) **renders a separate route**, allowing **multiple views in a single layout**.  
- Ideal for **dashboards with multiple panels**, **chat apps**, or **sidebars**.  

**📌 Example Structure:**
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

**📌 Example Code:**
**`app/dashboard/layout.tsx` (Using Parallel Slots)**
**Note**: In general scenario, layout gets children prop but when we use the parallel routes, we get all the parallel routes in layout, in our case it is analytics, & settings
- Each nested page has its own environment like, separate loading,error,not-found, etc

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

**`app/dashboard/@analytics/page.tsx`**
```tsx
export default function AnalyticsPage() {
  return <h1>Analytics Panel</h1>;
}
```

**`app/dashboard/@settings/page.tsx`**
```tsx
export default function SettingsPage() {
  return <h1>Settings Panel</h1>;
}
```

**Visiting `/dashboard` Renders:**  
```
-----------------------
| Analytics | Settings |
|   Panel   |  Panel   |
-----------------------
```
**Allows loading multiple pages (slots) at once!**  


Note-
When we don't have any page.js in parallel route then we can provide the default.js which works as default file for that parallel route

eg: if we don't have the page.js in settings folder then we can provide the default.js in that folder

- In Next.js Parallel Routes, the default.js (or default.tsx) file acts as a fallback component when a slot does not have a corresponding file
- If a slot (e.g., @settings) does not receive a page, default.js renders instead.
- if we provide the dynamic or static route inside the analytics, then that part will render only in Analytics part of total page

<br>

**2️⃣ Intercepted Routes (`(.)folder`, `(..)folder`, `(...)folder`)**  
- Used to **override the normal navigation flow** by intercepting requests.  
- Helps when **embedding a different page inside another page** (e.g., opening a modal instead of full navigation). 
- For example, when clicking on a photo in a feed, you can display the photo in a modal, overlaying the feed. In this case, Next.js intercepts the /photo/123 route, masks the URL, and overlays it over /feed.
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

```
https://nextjs.org/docs/14/app/api-reference/components/image
```
 
- We have loader and loaderFile function in next/image, which helps in customizing the image url

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


- priority

```js
priority={false} // {false} | {true}
```
- When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
- true for logo image, in which we don't need the lazy loading



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
<br>

## Meta data updation
- metadata can be provided in the page.js and layout.js
- The metadata object and generateMetadata function exports are only supported in Server Components.
- You cannot export both the metadata object and generateMetadata function from the same route segment.

<br>

1. for static pages, we use meta data object

layout.js | page.js
```js
export const metadata = {
  title: '...',
  description: '...',
}
 
export default function Page() {}
```

2. for dynamic websites

we use generateMetadata function


app/products/[id]/page.js
```js
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

- it should return an object


more on below

```
https://nextjs.org/docs/app/api-reference/functions/generate-metadata
```

<br>

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

<br>



> ### **Next.js Route Handlers – Simplified Guide 🚀**  

**What are Route Handlers?**  
Route Handlers let you create custom API endpoints **inside the `app` directory** using Web APIs (`Request`, `Response`).

Route Handlers in Next.js `replace API routes` and allow you to create custom backend logic inside the `/app/api` directory. They handle HTTP requests (GET, POST, PUT, DELETE, etc.) `without needing an external backend`.

✅ **Equivalent to API Routes in the pages directory**  
🚫 **Cannot use API Routes & Route Handlers together**  


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

**Basic Route Handler**
```js
export async function GET(request) {
  console.log(request)
  return Response.json({ message: "Hello, Next.js!" });
}
```

- In browser just hit, localhost:3000/api/users, you will see the console value
- we have to always return response object


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
- Let say on single, we have two component, and both component we calling same get api, instead of calling the api 2 times, next js will call one time and cache it and serve data to both component, even you navigate to other page and come again on same page, then it will not call even 1 time, it will use cache
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
<br>

## **🔹 Redirects**

On Server components
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

On client side
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



- props
```js
redirect(path, type)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | `string` | The URL to redirect to. Can be a relative or absolute path. |
| `type` | `'replace'` (default) or `'push'` (default in Server Actions) | The navigation type. |


<br>

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

Note: To call api on `server side` you can use `fetch directly` but on `client side` you have to `use-effect` and `inside` you can `call the api`


### **Caching Data in Next.js**


Next.js extends the `native Web fetch()` API to allow each request on the server to set its own persistent caching semantics.

Next.js **automatically caches `fetch` requests** to optimize performance and reduce redundant API calls. By default, when you use `fetch`, it **stores the response in a Data Cache** on the server, allowing **subsequent requests to reuse the cached data**.

```js
fetch(`https://...`, { cache: 'force-cache' | 'no-store' })
```

Note: If you don't provide a cache option, Next.js will `default` to `force-cache`, unless a dynamic function such as `cookies()` is used, in which case it will default to `no-store`.


**1️⃣ Default Caching Behavior (`force-cache`)**
By default, **Next.js caches all `fetch` requests on the server**, meaning:
- The response **does not need to be fetched again** on every request.
- Cached data is reused until it **expires** or is manually refreshed.


```javascript
fetch('https://api.example.com/data', { cache: 'force-cache' });
```
🔹 `force-cache` is **the default behavior** (even if not explicitly written).  
🔹 The response is **cached and reused** across multiple requests.


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


**2️⃣ When `fetch` is NOT Cached**
There are **exceptions** where `fetch` does **not** use caching:

**Inside a Server Action**
Server Actions run **on-demand** and are meant for dynamic, interactive behavior.  
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



**Inside a Route Handler using `POST`**
Route Handlers (`app/api`) handle requests dynamically.  
`POST` requests usually **send data** to the server and expect an immediate response.


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



### Revalidating Data
Revalidation is the process of purging the Data Cache and re-fetching the latest data.

1. Time-based Revalidation 

Time-based revalidation in Next.js ensures that cached data is **refreshed periodically** instead of being permanently stored. This is done using the `{ next: { revalidate: <time_in_seconds> } }` option in `fetch`.

```js
fetch(`https://...`, { next: { revalidate: false | 0 | number } })
```

- `false` - Cache the resource indefinitely. Semantically equivalent to revalidate: Infinity. The HTTP cache may evict older resources over time.
- `0` - Prevent the resource from being cached.
- `number` - (in seconds) Specify the resource should have a cache lifetime of at most n seconds.


**How It Works**
- When you fetch data with `revalidate`, Next.js **stores it in the cache**.
- After the specified time (in seconds), the cache **becomes stale**.
- The next request **triggers a re-fetch** to update the cache while still serving stale data until fresh data arrives.


**Example: Revalidate Every 10 Seconds**
```javascript
fetch("https://api.example.com/data", { next: { revalidate: 10 } });
```
- The data is cached for **10 seconds**.  
- Any request within **10 seconds** uses the cached data.  
- After **10 seconds**, the next request **re-fetches the data** and updates the cache.



Alternatively, to revalidate all fetch requests in a route segment, you can use

layout.js | page.js
```js
export const revalidate = 3600 // revalidate at most every hour
```





**Note**
- If an individual `fetch()` request sets a `revalidate` number lower than the `default revalidate` of a `route`, the whole route revalidation interval will be decreased.
- If two fetch requests with the same URL in the same route have different `revalidate` values, the lower value will be used.
- As a convenience, it is not necessary to set the `cache` option if `revalidate` is set to a number since `0` implies `cache: 'no-store'` and a positive value implies `cache: 'force-cache'`.
- Conflicting options such as `{ revalidate: 0, cache: 'force-cache' }` or `{ revalidate: 10, cache: 'no-store' }` will cause an error.



### **Server Component Example**
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


### **API Route Example**
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



**🚀 Summary**
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

Tag is like creating a group of revalidatepaths which we need to revalidate

app/page.js
```js
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```

You can then revalidate this fetch call tagged with `collection` by calling `revalidateTag` in a Server Action:

- `revalidateTag` allows you to purge `cached data` on-demand for a specific cache tag.

```js
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function action() {
  revalidateTag('collection')
}
```

more example
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

- Server Actions are `asynchronous functions` that are executed on the server. They can be `called in Server and Client Components` to `handle form submissions and data mutations` in Next.js applications.
- A Server Action can be defined with the React `"use server"` directive. You can place the directive at the top of an `async` function to mark the function as a Server Action, or at the top of a separate file to mark all exports of that file as Server Actions.

- basically when we do create form, then we have the action thing in html, then that is client side but this time we need this action to be on server side, so we needed the server action. In short form submissions on server side is called the server actions

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

example 

React extends the HTML `<form>` element to allow Server Actions to be invoked with the `action` prop.

When invoked in a form, the action automatically receives the `FormData` object. You `don't need` to use React `useState` to manage fields, instead, you can extract the data using the native `FormData methods like FormData.get()` more method on `https://developer.mozilla.org/en-US/docs/Web/API/FormData#instance_methods`

app/invoices/page.js
```js
export default function Page() {
  async function createInvoice(formData) {  // 'use server' & async keyword is mandatory to create createInvoice function as server action
    'use server'   
 
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


> ### **`useFormStatus` Hook in Next.js**

It allows you to:  
✅ Detect if a form is **submitting** (`pending` state).  
✅ Show **loading indicators** or **disable buttons** while submitting.  
✅ Improve **user experience** by handling async form interactions properly.


```tsx
"use client";

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


**How It Works**
1️⃣ **`useFormStatus()`** is used inside a **Client Component** to check if the form is submitting (`pending`).  
2️⃣ The **submit button disables itself** (`disabled={pending}`) while the form is being processed.  
3️⃣ The form uses a **Server Action (`"use server"`)** to handle submission without needing an API route.  



**Why Use `useFormStatus`?**
✅ **Eliminates extra state management** (`useState` for loading not needed).  
✅ **Optimized for Server Actions** (no need for `useEffect` or API calls).  
✅ **Works seamlessly with Next.js Server Components**.




<br>




> ### `useActionState` Hook in Next.js (earlier it was known as useFormState)
The `useActionState` hook in **Next.js (App Router)** is used to manage **form state** in Client Components when using **Server Actions**.  

It helps with:  
✅ **Managing form submission state** (loading, success, error).  
✅ **Updating UI reactively** based on the form's response.  
✅ **Eliminating the need for `useState` for form data handling**.  


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



**Why Use `useActionState`?**
**Eliminates extra `useState` for form state**.  
**Works with Server Actions** (no need for an API route).  
**Optimized for handling form submissions and responses dynamically**.  



<br>



> ### usePathname

### **🔹 `usePathname` Hook in Next.js**
The `usePathname` hook is part of **Next.js (App Router)** and is used to **get the current URL path** in a React component.

---

## **✅ Basic Usage**
```jsx
"use client";

import { usePathname } from "next/navigation";

export default function CurrentPath() {
  const pathname = usePathname();

  return <p>Current Path: {pathname}</p>;
}
```
🔹 **Example Output:**  
If the user is on `/dashboard`, it will display:
```
Current Path: /dashboard
```

---

## **📌 When to Use `usePathname`?**
✅ **Active Link Highlighting (Navigation Menus)**  
✅ **Conditional Rendering Based on URL**  
✅ **Breadcrumbs & Page Titles**  

---

## **📌 Example: Highlighting Active Links**
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
🔹 **Why?**  
- The active link gets a blue color based on the `pathname`.


Note: next/link will be same as nuxt link, but when child component have anchor(`<a></a>`) tag then we have different implementaion. below is url for detail
```
https://nextjs.org/docs/14/app/api-reference/components/link
```

---

## **⚠️ Important Notes**
1️⃣ **Works Only in Client Components**  
   - `usePathname` only works inside `"use client"` components.  
   - For **Server Components**, use `cookies()` or `headers()`.

2️⃣ **Does Not Include Query Params (`?id=123`)**  
   - If you need query params, use `useSearchParams()`.  

---

## **📌 `usePathname` vs. `useRouter()`**
| Feature            | `usePathname`  | `useRouter()` |
|-------------------|---------------|--------------|
| **Gets current URL** | ✅ Yes | ✅ Yes |
| **Includes query params?** | ❌ No | ✅ Yes (`router.query`) |
| **Used for navigation?** | ❌ No | ✅ Yes (`router.push()`) |

Would you like an example using both `usePathname` and `useSearchParams`? 🚀


<br>

### **🔹 `revalidatePath` in Next.js**
`revalidatePath` is a **Server Action utility** in Next.js used to **manually revalidate cached data** for a `specific route`.\
eg get api gets cached on home page, you updated the data of homepage in db, but changes will not reflected, so you need to run this function after succesfull response of api which updates the db

- basically next cached the whole page, when we update the db through api call, then we have to revalidatepath, so that next just dump the cache and make new page with updated data

It helps when:  
✅ You **mutate data** (e.g., after a form submission or database update).  
✅ You want to **force fetch updated content** from a Server Component.  
✅ You need to **bypass Next.js caching** for a particular route.  

```js
revalidatePath(path: string, type?: 'page' | 'layout'): void;
```

Revalidating A Specific URL
```js
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/post-1')
```



Revalidating A Page Path
```js
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'page')
// or with route groups
revalidatePath('/(main)/blog/[slug]', 'page')
```
This will revalidate any URL that matches the provided `page` file on the next page visit. This will not invalidate pages beneath the specific page. For example, `/blog/[slug]` won't invalidate `/blog/[slug]/[author]`.



Revalidating A Layout Path
```js
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'layout')
// or with route groups
revalidatePath('/(main)/post/[slug]', 'layout')
```

This will revalidate any URL that matches the provided `layout` file on the next page visit. This will cause pages beneath with the same layout to revalidate on the next visit. For example, in the above case, `/blog/[slug]/[another]` would also revalidate on the next visit.


Revalidating All Data
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

### **📌 How to Use with a Form**

**Client Component Form with `useActionState`**
```tsx
"use client";

import { useActionState } from "react";
import { addItem } from "./actions"; // Import Server Action

export default function ItemForm() {
  const [state, formAction, isPending] = useActionState(addItem, null);

  return (
    <form action={formAction}>
      <input type="text" name="item" placeholder="Enter item" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Item"}
      </button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.success}</p>}
    </form>
  );
}
```

**How It Works**
1️⃣ **User submits the form** with an item.  
2️⃣ The `addItem` **Server Action** runs, adding the item.  
3️⃣ **`revalidatePath("/items")`** ensures the `/items` page **fetches fresh data** instead of using cached content.  
4️⃣ The updated list appears immediately after form submission.  


**`revalidatePath` vs. `revalidateTag`**
| Feature             | `revalidatePath`  | `revalidateTag`  |
|-------------------|----------------|----------------|
| **Use Case**       | Revalidates a specific **page** | Revalidates **data** marked with a tag |
| **Scope**         | Affects only the given **path** | Affects all queries with a **specific tag** |
| **Example**       | `revalidatePath("/dashboard")` | `revalidateTag("user-data")` |



**🎯 When to Use `revalidatePath`?**
✅ **After a form submission (CRUD operations)**  
✅ **When updating user profile data**  
✅ **When modifying a database and needing fresh data**  

<br>

> ### `useOptimistic` in Next.js 13+ (React 18)
`useOptimistic` is a React Hook introduced in **React 18** and is commonly used in **Next.js 13+** with Server Actions to handle **optimistic UI updates**. It allows you to update the UI immediately before receiving a response from the server, making interactions feel more responsive.


**Basic Syntax**
```tsx
const [optimisticState, setOptimisticState] = useOptimistic(
  state, // initial state
  (currentState, newValue) => newValue // update function
);
```


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

**How It Works**
- `useOptimistic` stores an **optimistic version** of `count`.
- `setOptimisticCount(1)` immediately updates the UI **before** waiting for the server.
- The actual `setCount` updates after the simulated server delay.


**Example: Optimistic Update with Server Action**
`useOptimistic` is especially useful with **Server Actions** in Next.js.

**1. Server Action (Server Component)**
```tsx
"use server";

export async function updateLikes(postId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate server delay
  return { success: true };
}
```

**2. Client Component with Optimistic UI**
```tsx
"use client";

import { useOptimistic, useState } from "react";
import { updateLikes } from "./actions";

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
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

**When to Use `useOptimistic`?**
✅ **Good for:**
- Optimistic UI updates (likes, counters, form submissions).
- Avoiding unnecessary loading indicators.
- Making UI feel snappier in async actions.

❌ **Not needed when:**
- The update happens instantly (no delay).
- The app does **not** need an immediate UI update.


**Alternatives**
If you're not using `useOptimistic`, you can achieve similar results with **`useState`** and **optimistic updates manually**. However, `useOptimistic` provides a cleaner and more declarative way to handle optimistic UI in Next.js.

<br>


### **🔹 API Calling in Next.js (Server & Client Side)**  
Next.js allows you to **fetch data** on both the **server side** (for performance & SEO) and the **client side** (for dynamic updates).  

---

# **1️⃣ Server-Side API Calls**  
✅ **Best for SEO & performance**  
✅ **Runs on the server** (not in the browser)  
✅ **Data is fetched before rendering**  

### **📌 Example: Server-Side Fetching with `fetch()`**  
```tsx
// app/page.js (Server Component)
export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await res.json();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```
🔹 This fetches data **on the server before rendering** and is sent **as static HTML to the browser**.  
- In server component ie page.js, we directly await the api call function, 
- every function(n number of fn) in server component ie page.js can be made async and call api

---

## **2️⃣ Client-Side API Calls**  
✅ **Best for real-time updates**  
✅ **Runs in the browser**  
✅ **Data fetches after initial page load**  

### **📌 Example: Client-Side Fetching with `useEffect`**
```tsx
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
🔹 The data is **fetched after the page loads** (useful for interactive updates).  

---

## **3️⃣ Hybrid Approach: Server + Client Fetching**
You can **preload data on the server** and **fetch additional data on the client**.

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
🔹 **Post data** is **fetched on the server** for SEO, and **comments are fetched on the client** dynamically.  

---

## **4️⃣ API Calling in Server Actions (`use server`)**  
✅ **Used inside Server Components**  
✅ **No need for `useEffect`**  
✅ **Best for forms & mutations**  

```tsx
"use server";

export async function fetchUserData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  return res.json();
}
```

```tsx
// app/page.js (Server Component)
import { fetchUserData } from "./actions";

export default async function Home() {
  const user = await fetchUserData();

  return <h1>{user.name}</h1>;
}
```
🔹 **No API routes required!** Fetch data **directly inside a Server Component**.

---

# **📌 When to Use Each Approach?**
| **Method**             | **Use Case**                                        |
|----------------------|------------------------------------------------|
| **Server-Side Fetching**  | SEO, fast initial page loads, static/dynamic pages |
| **Client-Side Fetching**  | User interactions, real-time updates, lazy loading |
| **Hybrid Approach**       | Preload important data + fetch extra client-side  |
| **Server Actions**        | Secure API calls, form submissions, mutations |

Would you like an example with **authentication and API calls?** 🚀


> ### props and searchparams

- In page.js, params and searchparams are available, both are optional

app/blog/[slug]/page.js
```js
export default function Page({ params, searchParams }) {
  return <h1>My Page</h1>
}
```

**props**
```
Example	                                URL                      	params
app/shop/[slug]/page.js	               /shop/1	             { slug: '1' }
app/shop/[category]/[item]/page.js	   /shop/1/2	           { category: '1', item: '2' }
app/shop/[...slug]/page.js            	/shop/1/2	           { slug: ['1', '2'] }
```

**searchParams**
```
URL	               searchParams
/shop?a=1         	{ a: '1' }
/shop?a=1&b=2     	{ a: '1', b: '2' }
/shop?a=1&a=2      	{ a: ['1', '2'] }
```


### Sharing data between components

When fetching data on the server, there may be cases where you need to share data across different components. For example, you may have a layout and a page that depend on the same data.

Instead of using `React Context` (which is not available on the server) or passing data as props, you can use `fetch` or React's `cache` function to fetch the same data in the components that need it, without worrying about making duplicate requests for the same data. This is because React extends `fetch` to automatically memoize data requests, and the `cache` function can be used when `fetch` is not available.



> ### Cookies in pages
```js
import { cookies } from 'next/headers'
 
export default function Page() {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```
- cookies().get(name)
- cookies().getAll()
- cookies().has(name)
- cookies().set(name, value, options)   
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


### useParams

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

| Route | URL | `useParams()` |
|--------|----|--------------|
| `app/shop/page.js` | `/shop` | `{}` |
| `app/shop/[slug]/page.js` | `/shop/1` | `{ slug: '1' }` |
| `app/shop/[tag]/[item]/page.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |
| `app/shop/[...slug]/page.js` | `/shop/1/2` | `{ slug: ['1', '2'] }` |


<br>

### usePathname

usePathname is a `Client Component hook` that lets you read the current URL's pathname.

```js
'use client'
 
import { usePathname } from 'next/navigation'
 
export default function ExampleClientComponent() {
  const pathname = usePathname()
  return <p>Current pathname: {pathname}</p>
}
```

| URL | Returned Value |
|-----|---------------|
| `/` | `'/'` |
| `/dashboard` | `'/dashboard'` |
| `/dashboard?v=2` | `'/dashboard'` |
| `/blog/hello-world` | `'/blog/hello-world'` |

<br>

### useRouter

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

### Dynamic varibale in env file in next js

Next.js will automatically expand variables that use `$` to reference other variables e.g. `$VARIABLE` inside of your `.env*` files

```
TWITTER_USER=nextjs
TWITTER_URL=https://twitter.com/$TWITTER_USER
```

Note: If you need to use variable with a `$ in the actual value`, it needs to be escaped e.g. `\$`.


In general only one `.env.local` file is needed. However, Next.js allows you to set defaults in `.env (all environments)`, `.env.development (development environment)`, and `.env.production (production environment)`.


<br>

### Dynamic Image Generation

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


<br>

### JSON-LD

recommendation for JSON-LD is to render structured data as a `<script>` tag in your `layout.js or page.js` components


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

---------------
Ye dekhna h

- https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes#generating-static-params
- https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata
- https://nextjs.org/docs/14/app/api-reference/functions/generate-image-metadata
- https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata
- https://nextjs.org/docs/14/app/api-reference/functions/generate-sitemaps
- https://nextjs.org/docs/14/app/api-reference/functions/generate-static-params
- https://nextjs.org/docs/14/app/api-reference/functions/generate-viewport
- https://nextjs.org/docs/14/app/api-reference/functions/headers
- https://nextjs.org/docs/14/app/api-reference/functions/next-request
- https://nextjs.org/docs/14/app/api-reference/functions/next-response
- https://nextjs.org/docs/14/app/api-reference/functions/permanentRedirect
- https://nextjs.org/docs/14/app/api-reference/functions/use-search-params
- https://nextjs.org/docs/14/app/api-reference/functions/use-selected-layout-segment
- https://nextjs.org/docs/14/app/api-reference/functions/use-selected-layout-segments
- https://nextjs.org/docs/14/app/api-reference/functions/userAgent
- https://nextjs.org/docs/14/app/api-reference/next-config-js/crossOrigin
- https://nextjs.org/docs/14/app/api-reference/next-config-js/optimizePackageImports
- https://nextjs.org/docs/14/app/api-reference/next-config-js/output
- https://nextjs.org/docs/14/app/api-reference/next-config-js/redirects
- https://nextjs.org/docs/14/app/api-reference/next-config-js/rewrites
- https://nextjs.org/docs/14/app/api-reference/next-config-js/transpilePackages
- https://nextjs.org/docs/14/app/building-your-application/deploying/static-exports
- https://nextjs.org/docs/14/app/building-your-application/authentication
Above is when you need to read authentication in detail
- https://nextjs.org/docs/14/app/building-your-application/configuring/draft-mode
- https://nextjs.org/docs/14/app/building-your-application/optimizing/videos
- https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts
- https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/app-icons
- https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image
- https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/robots
- https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/sitemap
- https://nextjs.org/docs/14/app/building-your-application/optimizing/lazy-loading
- https://nextjs.org/docs/14/app/building-your-application/optimizing/open-telemetry
- https://nextjs.org/docs/14/app/building-your-application/optimizing/memory-usage
- https://nextjs.org/docs/14/app/building-your-application/caching
- https://nextjs.org/docs/14/app/building-your-application/rendering
- https://nextjs.org/docs/14/app/building-your-application/data-fetching

- news wale project me parallel routing and interceptor dekhna h
---------------

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

> ### Not found page

- 404.js will serve as not found page
- Here we can add 404.js at root level only in pages folder, we can not add separately in nested folder. One projet one 404 file

pages/404.js
```js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

<br>

### Retrieve dynamic route parameters

1️⃣ **Using `useRouter` (Client-Side)**

`pages/product/[id].js`
```javascript
import { useRouter } from "next/router";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic param

  return <h1>Product ID: {id}</h1>;
};

export default ProductPage;
```
🔹 **Note:** The `id` will be `undefined` on the first render in Next.js because it runs on the client side.

<br>

2️⃣ **Using `getServerSideProps` (Server-Side)

```javascript
export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: { id }, // Pass to the component
  };
}

const ProductPage = ({ id }) => {
  return <h1>Product ID: {id}</h1>;
};

export default ProductPage;
```
🔹 **Best for:** When you need fresh data on each request.

<br>

3️⃣ **Using `getStaticProps` + `getStaticPaths` (Static Generation)

```javascript
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }], // Pre-generate pages for these IDs
    fallback: false, // If false, undefined paths will return 404
  };
}

export async function getStaticProps({ params }) {
  return {
    props: { id: params.id },
  };
}

const ProductPage = ({ id }) => {
  return <h1>Product ID: {id}</h1>;
};

export default ProductPage;
```
🔹 **Best for:** When you want to pre-generate pages at build time.

<br>

### Shallow Routing

Shallow routing allows you to change the URL without running data fetching methods again, that includes `getServerSideProps`, `getStaticProps`, and `getInitialProps`.

You'll receive the updated pathname and the query via the router object (added by useRouter), without losing state.


pages/index.js (Home Page)
```js
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


pages/about.js (About Page)
```js
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

> ###  `_app.js` usage in Next.js
In **Next.js**, the `_app.js` file `wraps all pages`. It is used to:

✅ **Persist layout** across pages  
✅ **Inject global styles**  
✅ **Provide global state or context**  

<br>

### **📌 Default `_app.js`**
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

### Common Use Cases

**1️⃣ Persistent Layouts**

If you want to keep a **navbar, footer, or sidebar** across all pages:
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

<br>

**2️⃣ Global State with Context API**

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
<br>

**3️⃣ Handling Route Changes (e.g., Loading Indicator)**
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

<br>

> ## Data Fetching

<br>

### Static Generation -  Basically generate static when build command is done

> ### 1. getStaticProps

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

### Additonal return oject of getStaticProps
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


in pages/[sku].js
```js
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


pages/repo/[name].js
```js
export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          name: 'next.js',
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  }
}
 
export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}
 
export default function Page({ repo }) {
  return repo.stargazers_count
}
```

- getStaticPaths will only run during build in production, it will not be called during runtime. 


pages/posts/[id].js
```js
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

### fallback usages in getStaticPaths

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

### **What happens when `fallback: true`?**
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

### **When should you use `fallback: true`?**
- If you have **many pages that depend on data**, like a large e-commerce site.  
- Instead of pre-generating **all** product pages, you **only pre-generate a few**.  
- The rest are generated **on-demand when someone visits them**.  
- This keeps **build times fast** while still using Static Generation.

### **Important Note:**
- `fallback: true` **does not update pages** after they’re generated.  
  - To update pages, use **Incremental Static Regeneration (ISR)**.


Once **User 1** visits a page that was not pre-generated, Next.js:  

1. **Shows a fallback UI** (loader).  
2. **Runs `getStaticProps`** to fetch data and generate the page.  
3. **Saves (caches) the page** for future requests.  

Now, when **User 2** visits the same page **later**, Next.js **serves the cached static page instantly**, without showing the loader again.  

### ✅ **Final Behavior:**  
- **User 1:** Sees the loader first, then the page loads.  
- **User 2+:** Gets the fully generated page instantly (no loader).  

This caching ensures **fast subsequent visits** while keeping build times short. 🚀

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


Context parameter
- The context parameter is an object containing the following keys:

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


For props
```js
export async function getServerSideProps(context) {
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  }
}
```

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

> ### _documents.js usage

- _documents.js should be added directly in pages folder at root level
- _app.js kind of wrapper which runs on every page but helps only to customize only `<body>` of DOM while _documents.js helps in customize entire HTML documents


### **`_document.js` Usage in Next.js (Page Router)**  

In Next.js (Page Router), **`_document.js`** is a custom document file that allows you to modify the **HTML and `<body>` structure** of your pages. It is used primarily for:  
✅ Customizing the `<html>` and `<body>` structure.  
✅ Adding **meta tags**, **CSS libraries**, or **custom fonts**.  
✅ Improving **performance** by preloading assets.  

---

### **📌 How to Use `_document.js` in Page Router**
#### **Step 1: Create the `_document.js` file**  
📂 **Project Structure**  
```
/pages
 ├── _document.js
 ├── index.js
```

#### **Step 2: Implement `_document.js`**
Create a `_document.js` file inside the `pages/` directory:
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
          <Main />             {/*   must be added */}
          <NextScript />       {/*   must be added */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

---

### **📝 Explanation of Key Components**
| Component      | Description |
|---------------|------------|
| `<Html>`      | Defines the root HTML element (`<html lang="en">`). |
| `<Head>`      | Used to add meta tags, links, and fonts to the document head. |
| `<Main>`      | This is where Next.js will render the app. |
| `<NextScript>`| Injects Next.js scripts (for interactivity, hydration, etc.). |

---

### **🚀 When to Use `_document.js`?**
✅ If you **want to modify** the document structure (e.g., add global meta tags, external stylesheets, fonts).  
✅ When you **need to customize** the `<html>` or `<body>` (e.g., adding a custom class to `<body>`).  
✅ If you **want to optimize performance** using `<link rel="preconnect">` for fonts or CDNs.  

⛔ **Do NOT use `_document.js` for client-side components** (e.g., event listeners, dynamic imports). Instead, use `_app.js` for global logic.


<br>

### Middleware.js 

- It is added at root level in repo, not inside the app/pages folder
- Middleware executes before routes are rendered. It's particularly useful for implementing custom server-side logic like authentication, logging, or handling redirects.
- It has NextRequest and NextResponse, both have attached many method on it like 



<br>

### redirects in next.config.js

next.config.js
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

- permanent true or false - if true will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.

> ### NextResponse.redirect in Middleware

middleware addition

```
/my-next-app
  ├── pages/
  ├── middleware.js  ✅ (Ensure it's here)
  ├── package.json
```

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

### API Routes `https://nextjs.org/docs/14/pages/building-your-application/routing/api-routes`

API routes provide a solution to build a `public API` with Next.js.

Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a `page`. They are server-side only bundles and won't increase your client-side bundle size.


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

<br>


### <Script>

- used for adding external script

app/dashboard/page.js
```js
import Script from 'next/script'
 
export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```



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

### userAgent

it helps to get various things 

middleware.js
```js
import { NextResponse, userAgent } from 'next/server'
 
export function middleware(request) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  return NextResponse.rewrite(url)
}
```

1. isBot
A boolean indicating whether the request comes from a known bot.

2. browser
An object containing information about the browser used in the request.

- name: A string representing the browser's name, or undefined if not identifiable.
- version: A string representing the browser's version, or undefined.

3. device
An object containing information about the device used in the request.

- model: A string representing the model of the device, or undefined.
- type: A string representing the type of the device, such as console, mobile, tablet, smarttv, wearable, embedded, or undefined.
- vendor: A string representing the vendor of the device, or undefined.

4. os
An object containing information about the operating system.

- name: A string representing the name of the OS, or undefined.
- version: A string representing the version of the OS, or undefined.

<br>

### To configure the build folder name

next.config.js
```js
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
}
```

### Setting headers through config file
next.config.js
```js
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




<br>

### Continuous Integration (CI) Build Caching

To improve build performance, Next.js saves a cache to `.next/cache` that is shared between builds.

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


<br>

### useRouter

In normal react, we have to use external router package but in next router is setup by next. So to use router function we use below code

```js
import { useRouter } from 'next/router'
 
function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  }
 
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
 
  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
 
export default ActiveLink
```

#### The router provide an object

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

```js
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

#### router.events

You can listen to different events happening inside the Next.js Router. Here's a list of supported events:

- `routeChangeStart(url, { shallow })` - Fires when a route starts to change
- `routeChangeComplete(url, { shallow })` - Fires when a route changed completely
- `routeChangeError(err, url, { shallow })` - Fires when there's an error when changing routes, or a route load is cancelled
  - `err.cancelled` - Indicates if the navigation was cancelled
- `beforeHistoryChange(url, { shallow })` - Fires before changing the browser's history
- `hashChangeStart(url, { shallow })` - Fires when the hash will change but not the page
- `hashChangeComplete(url, { shallow })` - Fires when the hash has changed but not the page


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


### **📌 Next.js Output File Tracing & Standalone Mode (Simplified Notes)**  

#### **🚀 What is Output File Tracing?**  
- Next.js **automatically traces** required files for production during `next build`.  
- **Reduces deployment size** by including only necessary dependencies.  
- Helps in **Docker deployments** by avoiding unnecessary files in `node_modules`.  

---

#### **🔹 How It Works**  
1. **Next.js scans** `import`, `require`, and `fs` usage to find required files.  
2. Generates a **`.nft.json` file** in `.next/`, listing dependencies per page.  
3. These files can be copied to a **deployment location** for optimized production.  

---

#### **📂 Standalone Mode (Automatic Copying of Files)**  
- Next.js **creates a `standalone/` folder** with only essential files for deployment.  
- To enable, add this to `next.config.js`:  
  ```javascript
  module.exports = {
    output: 'standalone',
  };
  ```
- This allows deployment **without installing `node_modules`**.  

---

#### **🔹 What's Inside `standalone/`?**  
✅ Only **necessary files** (minimizing deployment size).  
✅ A **minimal `server.js` file** to run Next.js without `next start`.  
❌ Does **not** include `public/` or `.next/static/` by default (should be handled by a CDN).  

---

#### **🎯 Why Use This?**  
✅ **Faster & smaller deployments** (especially in Docker).  
✅ **No need for `serverless` target** (which caused issues).  
✅ **Optimized production builds** without extra dependencies.  

for more

```
https://nextjs.org/docs/14/pages/api-reference/next-config-js/output
```

<br>

ye wala aache se padhna h
```
https://nextjs.org/docs/14/pages/building-your-application/authentication
https://nextjs.org/docs/14/pages/building-your-application/deploying/static-exports
https://nextjs.org/docs/14/pages/building-your-application/upgrading

https://nextjs.org/docs/14/pages/api-reference/next-config-js/rewrites
```

-----------------------------------------------------------------------------------------------------------------------------------



