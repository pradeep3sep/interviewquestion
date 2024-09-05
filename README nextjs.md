### App Router vs Pages Router

### The public folder (optional)
Create a public folder to store static assets such as images, fonts, etc. Files inside public directory can then be referenced by your code starting from the base URL (/).

### https://nextjs.org/docs/getting-started/project-structure

### https://nextjs.org/docs/app/building-your-application/routing#file-conventions (from this and below see)

A page.js file is required to make a route segment publicly accessible.
Pages are Server Components by default, but can be set to a Client Component.


### https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates

### https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching

### https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering

### https://nextjs.org/docs/app/building-your-application/routing/error-handling#using-error-boundaries

### https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-global-errors

### Only the root layout can contain `<html>` and `<body>` tags.

### Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.

### Layouts do not have access to pathname (learn more). But imported Client Components can access the pathname using usePathname hook.
### Layouts do not have access to the route segments below itself. To access all route segments, you can use useSelectedLayoutSegment or useSelectedLayoutSegments in a Client Component.
