> ### Security

- XSS

An XSS (Cross-Site Scripting) attack occurs when an attacker injects malicious scripts into a website viewed by other users.

The attacker add the malicious script in browser through various method like 
- added script in params or query in url, we take directly value form parms and then pass value in payload in api
- added script in the input box, then script passed into function from input box.
- sometimes script passed is event listner which listen every event like click and call api and pass value to hacker api
- if external scripts runs, then it can also access your token.


Prevention Techniques:
- Input Validation and Sanitization: Always validate and sanitize user input before processing it, especially when dealing with user-generated content
- Replace innerHTML of DOM manipulation method with innerText or textContent of DOM manupulation.
- use library like REACT or Vue, which handle all the sanitization itself
- you can use the pakage like DOMPurity
- avoid using the eval
- CSP headers


### CSP headers

https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

Content Security Policy (CSP) is a security feature that helps prevent a range of attacks, including Cross-Site Scripting (XSS), data injection, and other code injection attacks by `controlling` which `resources (like scripts, styles, images, etc.) the browser is allowed` to load and execute.

### How CSP Works:
CSP allows you to create a whitelist of trusted sources for various types of content. The browser will only load resources from these trusted sources. If a resource is not in the whitelist, the browser will block it, preventing malicious code from running.

### Main Directives of CSP:
1. **`default-src`**: Specifies the default source for all content types if no other `*-src` directive is provided.
   
2. **`script-src`**: Controls the sources from which JavaScript can be loaded. You can allow or block inline scripts, external scripts, and JavaScript files.
   
3. **`style-src`**: Controls the sources from which CSS styles can be loaded. It can also restrict inline styles.
   
4. **`img-src`**: Controls the sources from which images can be loaded.
   
5. **`connect-src`**: Specifies which URLs the application can connect to using mechanisms like `XMLHttpRequest`, `WebSocket`, `fetch()`, etc.
   
6. **`font-src`**: Specifies the sources for fonts used by the application.
   
7. **`frame-src`**: Controls which sources can be embedded in `<iframe>` elements.
   
8. **`object-src`**: Specifies allowed sources for `<object>`, `<embed>`, or `<applet>` tags.

9. **`report-uri` / `report-to`**: Allows you to specify a URI or a group of URIs where CSP violation reports should be sent, enabling you to detect and respond to CSP violations.

### Implementing CSP in the Frontend:
There are different methods for implementing CSP in the frontend:

#### 1. **Via HTTP Headers (Best Practice)**:
The CSP is typically set in the server’s HTTP headers, which instruct the browser on how to handle various types of content for a web page.

Example header:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.example.com; style-src 'self' 'unsafe-inline'
```

- `'self'`: Allows resources to be loaded from the same domain.
- `https://apis.example.com`: Only allows scripts to be loaded from `https://apis.example.com`.
- `'unsafe-inline'`: Allows inline styles (though this is not recommended for security).

#### 2. **Via HTML `<meta>` Tag**:
If you don't have access to the server configuration or you're working on static sites, you can add CSP rules via the `<meta>` tag in your HTML `<head>` section:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://apis.example.com">
```
This works similarly to the HTTP header method but is less flexible, as it applies only to the specific HTML document.

#### 3. **Nonce-based CSP (Script-specific CSP)**:
One method to allow specific inline scripts while still using a restrictive `script-src` directive is by using a `nonce` (a unique, cryptographically random token for each request).

Example CSP header:
```http
Content-Security-Policy: script-src 'self' 'nonce-abc123'
```

In the HTML:
```html
<script nonce="abc123">
  // Your trusted inline JavaScript
</script>
```

Only the script with the matching nonce will be allowed to execute.

#### 4. **Strict Dynamic**:
For scenarios where you load third-party libraries like Google Tag Manager or Stripe (which may load additional scripts), you can use `strict-dynamic` to trust dynamically loaded scripts, provided the parent script is trusted.

Example header:
```http
Content-Security-Policy: script-src 'strict-dynamic' 'nonce-abc123'; object-src 'none'; base-uri 'none'
```

#### 5. **Hash-based CSP**:
You can also specify which inline scripts are allowed by providing a hash of the script. This prevents any modifications to the inline script without updating the CSP policy.

Example header:
```http
Content-Security-Policy: script-src 'self' 'sha256-xyz' 
```

The `sha256-xyz` hash corresponds to a specific inline script, ensuring that only the script with that exact content is allowed to run.

### Common CSP Pitfalls to Avoid:
- **'unsafe-inline' and 'unsafe-eval'**: Allowing these can significantly weaken the CSP as they allow inline scripts and eval() to execute, which are common attack vectors.
  
- **Too Restrictive**: A CSP that's too restrictive (blocking legitimate resources like Google Analytics or third-party APIs) may break the site functionality. Test thoroughly before deploying CSP rules.

- **Content Type Considerations**: Ensure that you include rules for all resource types (e.g., scripts, images, fonts) to avoid missing coverage on certain attack vectors.

### CSP Reporting:
You can set up a reporting mechanism to monitor CSP violations without blocking content immediately. This is useful during the development phase.

Example:
```http
Content-Security-Policy: default-src 'self'; report-uri /csp-violation-report-endpoint
```

In this case, violations will be reported to `/csp-violation-report-endpoint`, helping you adjust your policy before enforcing it strictly.

### Example Implementation:
Let’s say you’re building a web app and you want to allow:
- All resources from your domain.
- Scripts from a CDN (e.g., Google API).
- Styles from your domain but no inline styles.

Your CSP might look like this:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.google.com; style-src 'self'; img-src 'self' https://img.example.com; object-src 'none'
```

This policy will:
- Block any script that doesn’t come from your domain or the Google CDN.
- Only allow styles from your domain, disallowing inline styles.
- Only load images from your domain or `img.example.com`.
- Block any embedded object (e.g., flash, applet).


### Iframe protection

The iFrame is a common technique to embed webpages, videos, or maps in your web page.

we have to control iframe usage in your website along with when person use your website in iframe in its website

eg. suppose you use content from a malicious website within an iFrame in your website. In that case, it could execute harmful scripts or redirect the user to a malicious site, exposing sensitive information.

What security risks do iFrames bring?

The main security threat of iFrames is XSS (cross-site scripting) attacks. Attackers can perform XSS attacks in multiple ways. For example, changing the source site URL, installing malware, stealing information, or hijacking clicks and keystrokes through an iFrame.

- **iFrame Injection** – HTML documents are displayed on websites using iFrames, redirecting users to different websites.
- **iFrame Phishing** – iFrame phishing attacks combine iFrame, which loads a legitimate page, with an iFrame which loads the attacker’s website to steal data from an unsuspecting user.
- **Cross-Frame Scripting** – The Cross-Frame Scripting (XFS) attack uses malicious JavaScript on an iFrame that loads a legitimate page to collect data.
- **Clickjacking** – A clickjacking assault occurs when a person is persuaded to click a webpage element that is not readily visible. Therefore, consumers risk unintentionally downloading malware, accessing malicious websites, disclosing passwords or other sensitive information, transferring money, or making online purchases.

- **Data theft via javascript**

- **Session and cookie theft**



7 Required Steps to Secure Your iFrames

1. Use the ‘sandbox’ attribute  : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox

Controls the restrictions applied to the content embedded in the `<iframe>`. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:

An empty sandbox attribute will completely sandbox the iFrame. As a result, all the above privileges will be restricted, and the JavaScript inside the iFrame won’t run. 

2. Use the ‘allow’ attribute

The allow attribute enables you to safelist particular functionalities, such as allowing iFrame access to the camera, battery information, or accelerometer. 

3. Use the ‘X-Frame-Options’ HTTP response header : 

Deprecated: This feature is no longer recommended.

The X-Frame-Options HTTP response header can be used to indicate whether a browser should be allowed to render your website page in a `<iframe>`. Sites can use this to avoid click-jacking attacks, by ensuring that their content is not embedded into other sites.


**Warning**: Setting X-Frame-Options inside the <meta> element (e.g., <meta http-equiv="X-Frame-Options" content="deny">) has no effect. X-Frame-Options is only enforced via HTTP headers.

X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
X-Frame-Options: allow-from-url

4. Use the ‘Content-Security-Policy’ standard    :    https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors

The HTTP Content-Security-Policy (CSP) frame-ancestors directive specifies valid parents that may embed a page using `<iframe>`

```
Content-Security-Policy: frame-ancestors 'none';

Content-Security-Policy: frame-ancestors 'self' https://www.example.org;

Content-Security-Policy: frame-ancestors 'self' https://example.org https://example.com https://store.example.com;
```

5. Cookies must be set from backend having the httpOnly be true, secure be true, sameSite be Strict


> ### Security Headers

1. X-Powered-By

"X-Powered-By" is a common non-standard HTTP response header. It gives idea what is technologies server is using, and hacker can run malicious script easily. The X-Powered-By header describes the technologies used by the webserver. This information exposes the server to attackers.

eg. X-Powered-By: express

we have to remove "X-Powered-By" from the headers

2. Referrer-Policy  : https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy

The Referrer-Policy HTTP header controls how much referrer information (from which site you are coming, eg going from youtube nested url to linkedin, how much youtube url information you want to share with the linkedin) should be included with requests

eg
Referrer-Policy: no-referrer
Referrer-Policy: origin
Referrer-Policy: origin-when-cross-origin
Referrer-Policy: same-origin

3. X-Content-Type-Options

Sure! Let's break it down simply:

### What is `X-Content-Type-Options`?

It’s a security feature that tells the browser, **"Hey, don't guess what kind of file this is; just use the type I say!"**. This stops the browser from making mistakes that could lead to security problems, like running harmful code by accident.

earlier, sometime the browser expect jpg file but someone modified the content and add the harmful script in html form, then the browser accepts it considering that it might be update form of jpg. this cause malicius script can run in your browser.

### Why is it important?

Browsers sometimes try to be "smart" and guess what kind of file is being loaded (like an image, script, or text). But if they guess wrong, it can open up your website to attacks, like **cross-site scripting (XSS)**, where harmful code could be executed.

### Example:
You want to make sure a browser only treats a file as a JavaScript file if it is **actually** a JavaScript file, not something else.

So, you add this to your server's response:

```
X-Content-Type-Options: nosniff
```

This tells the browser, "Don’t sniff (guess) the file type—just trust what I’m telling you!"

### How does it help?

- Prevents the browser from interpreting files incorrectly.
- Protects your site from certain security risks like running scripts that weren't meant to be scripts.

### Example Use Case in Headers (for a Node.js app with Express):
```js
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});
```

This way, every time your app responds, it tells the browser not to guess the content type. Simple and effective!

4. x-xss-protection

The `X-XSS-Protection` is another security header that helps protect your website from **cross-site scripting (XSS) attacks**. XSS attacks occur when attackers inject malicious scripts into web pages viewed by others, potentially stealing information or performing unwanted actions on behalf of users.

### How Does `X-XSS-Protection` Work?

This header works by telling the browser to enable its built-in XSS filter, which detects and prevents certain types of XSS attacks.

### Directives:

1. **`0` (Disable Protection):**
   - Turns off the browser's XSS filter. Not recommended unless you're sure your app is already protected in other ways.
   
   Example:
   ```
   X-XSS-Protection: 0
   ```

2. **`1` (Enable Protection - Default):**
   - Enables the browser’s XSS filter. When an XSS attack is detected, the browser will sanitize the page to prevent malicious code from running.
   
   Example:
   ```
   X-XSS-Protection: 1
   ```

3. **`1; mode=block` (Enable Protection & Block):**
   - When an XSS attack is detected, instead of just sanitizing the page, the browser will block the entire page from loading.
   
   Example:
   ```
   X-XSS-Protection: 1; mode=block
   ```

### Easy Explanation:
When you enable this protection, you’re telling the browser to keep an eye out for XSS attacks and **stop** or **block** pages if malicious code is detected.

- **`mode=block`** is often used because it **prevents the page from loading altogether** when an XSS attack is found, adding an extra layer of safety.

### Example in a Node.js App (with Express):
```js
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

This will enable the XSS protection for every response your server sends. It’s a simple but effective way to reduce the risk of XSS attacks.


5. HSTS

HSTS (HTTP Strict Transport Security) is a security feature that forces browsers to only interact with your website over **HTTPS** and never over plain HTTP. This helps protect users from certain types of attacks, like **man-in-the-middle (MITM) attacks**, where attackers intercept unencrypted communications.

### How Does HSTS Work?

When a user visits your website, the server sends the `Strict-Transport-Security` header, telling the browser:

- **Always use HTTPS** for this site, even if the user types in "http://".
- **Remember** this rule for a set period of time.
- Optionally, apply this rule to **all subdomains** too.

### Key Directives:

1. **`max-age`**: This defines how long (in seconds) the browser should remember to only use HTTPS for the website.
   - Example: `max-age=31536000` (1 year).

2. **`includeSubDomains`**: This tells the browser to apply HSTS to all subdomains as well.
   - Example: If set, both `www.example.com` and `sub.example.com` must use HTTPS.

3. **`preload`**: This tells the browser to include your website in the browser's HSTS preload list, which means your site will always default to HTTPS even on the first visit (useful for new users who haven't visited before).
   - To add your site to the preload list, you can submit it to the [HSTS Preload List](https://hstspreload.org/).

### Example:
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Easy Explanation:
HSTS is like telling the browser, **“Only visit my site using a secure connection (HTTPS), and remember this rule for a year.”** This makes sure users aren’t accidentally exposed to unencrypted traffic.

### Why is HSTS important?

1. **Prevents Downgrade Attacks**: Attackers can’t force users to downgrade from HTTPS to HTTP.
2. **Stops Man-in-the-Middle Attacks**: It ensures data is always encrypted, even if a user tries to access the site using an insecure link.
3. **Better User Security**: It protects your users by ensuring that they always use the safest version of your site.

### Example in a Node.js App (with Express):
```js
const helmet = require('helmet');

// Use Helmet's HSTS middleware
app.use(helmet.hsts({
  maxAge: 31536000, // 1 year in seconds
  includeSubDomains: true,
  preload: true
}));
```

This will ensure that all your HTTP responses include the HSTS header, forcing browsers to stick to HTTPS for your site.


> ### Client storage security

- always store the client data in encrypted form with strong salt in localstorage or cookies or anything.
- always set expiry of taoken whether it is cookies or localstorage, for localstorage we can create the custom function which clears the data.
- while setting the data in cookies or localstorage, first check how much space is left, otherwise you will loose some data.

```js
function getCookieSpaceLeft() {
  // Maximum cookie space allowed per domain (4KB)
  const maxCookieSpace = 4096; // 4KB = 4096 bytes
  
  // Get all cookies as a single string
  const cookies = document.cookie;

  // Get the total size of the current cookies
  const cookieSize = new Blob([cookies]).size;

  // Calculate the remaining space
  const remainingSpace = maxCookieSpace - cookieSize;

  // Return the result in bytes
  return remainingSpace > 0 ? remainingSpace : 0; // Ensures we don't return negative values
}

console.log(`Remaining cookie space: ${getCookieSpaceLeft()} bytes`);

```


```js
function getLocalStorageSpaceLeft() {
  // Maximum localStorage space (assume 5MB for this example)
  const maxLocalStorageSpace = 5 * 1024 * 1024; // 5MB = 5 * 1024 * 1024 bytes

  // Calculate the total size of the data stored in localStorage
  let totalSize = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage.getItem(key).length + key.length;
    }
  }

  // Calculate the remaining space
  const remainingSpace = maxLocalStorageSpace - totalSize;

  // Return the result in bytes
  return remainingSpace > 0 ? remainingSpace : 0;
}

console.log(`Remaining localStorage space: ${getLocalStorageSpaceLeft()} bytes`);

```


> ### Dependency Security

1. Regular audit or update the dependencies/package beacuse some package became outdated or vulnerable
 eg npm update, it provide the list of package which have update or shwo the package which are vulnerable, out of which you can update the packages which you required


> ### Permissions Policy

Let say you have used iframe in your site, now the iframe website tried to cheat on you, he ask for the voice and video permission and user on your website thinks that it is giving permission to your website but actually the permission is taken by iframe website. This can cause security issue

https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy

In this we restrict the permission to self and iframe or other mailcious code on your website

Permissions Policy is similar to Content Security Policy but controls features instead of security behavior.

Examples of what you can do with Permissions Policy:

- Change the default behavior of autoplay on mobile and third-party videos.
- Restrict a site from using sensitive devices like the camera, microphone, or speakers.
- Allow iframes to use the Fullscreen API.
- Stop items from being scripted if they are not visible in the viewport, to improve performance.


**Permissions-Policy header syntax**

The general syntax looks like this:
```
Permissions-Policy: <directive>=<allowlist>

```
eg: below is no one is allowed for the geolocation permission

```
Permissions-Policy: geolocation=()
```

below is allow access to a subset of origins
```
Permissions-Policy: geolocation=(self "https://a.example.com" "https://b.example.com")
```

you can refer below website if you want to see demo

```
https://permissions-policy-demo.glitch.me/demo/
```


> ### CSRF (cross site request forgery)

A cross site request forgery attack is a cyber attack that tricks a user into accidentally using their credentials to invoke a state changing activity, such as transferring funds from their account, changing their email address and password, or some other undesired action.

Here is an example of the 4 steps in a cross-site request forgery attack:

1. An attacker creates a forged request that, when run, will transfer $10,000 from a particular bank into the attacker’s account.
2. The attacker embeds the forged request into a hyperlink and sends it out in bulk emails and also embeds it into websites. (Hyperlink contains a POST or GET request, as user is alreadys logged in bank website and cookies is already setup, it directly calls the api and end point actions done on backend)
3. A victim clicks on an email or website link placed by the attacker, resulting in the victim making a request to the bank to transfer $10,000.
4. The bank server receives the request, and because the victim is properly authorized, it treats the request as legitimate and transfers the funds.


How can Cross-Site Request Forgery be mitigated?

1. Synchronizer token pattern:

When a user visits a web page, such as the bank webpage that allows for the transfer of funds, the bank’s website embeds a random token into the form. When the user submits the form, the random token is returned and the bank is able to check to see if the two tokens match. If the tokens match, the transfer occurs. The attacker has no way to access the random token value created in the webpage, and if they request the page, the same origin policy would prevent the attacker from reading the response.

2. SameSite Cookies

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

cookies to be set as SameSite=Strict,Secure.

3. Refere-based-validate

referer shouold be added in the link, so that we can verify it in the backend, refere is our website or any other website

4. Use captacha

5. Add CSP header


> ### For handling Cross Origin Resource sharing

1. Access-Control-Allow-Origin : 

The `Access-Control-Allow-Origin` header is part of Cross-Origin Resource Sharing (CORS) in web development. It tells the browser which origins (domains) are permitted to access a resource on the server. When a web application running at one origin tries to request resources from another origin (like making an API call from `https://example.com` to `https://api.example.com`), the server responds with `Access-Control-Allow-Origin` to specify if it allows access from the requesting origin.

Here’s how it works:

1. **Single Origin**: If a server wants to allow a specific origin, it includes `Access-Control-Allow-Origin: https://example.com` in its response. Only `https://example.com` can access this resource.

2. **Wildcard (`*`)**: If a server wants to allow access from any origin, it can use `Access-Control-Allow-Origin: *`. However, this is generally less secure and is often restricted for APIs that require user credentials or sensitive information.

3. **No Header**: If the server doesn't include `Access-Control-Allow-Origin`, the browser blocks the request for security reasons.

**Example header**:
```http
Access-Control-Allow-Origin: https://example.com
```

This header is typically used in the server response to handle CORS policies for frontend applications that need to make cross-origin HTTP requests.


2. Access-Control-Allow-Methods

The `Access-Control-Allow-Methods` header is used in Cross-Origin Resource Sharing (CORS) to specify which HTTP methods are permitted when accessing a resource on the server from a different origin. This is part of the server's response to a "preflight" request, which is an initial request the browser sends to determine if the actual request is safe to make.

For instance, if a web application on `https://example.com` wants to send a `POST` request to `https://api.example.com`, the browser first sends an `OPTIONS` request to check what methods are allowed by the server. The server then responds with an `Access-Control-Allow-Methods` header to specify which HTTP methods it supports.

### Examples of `Access-Control-Allow-Methods`:

1. **Allow specific methods**:
   ```http
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   ```

   Here, only `GET`, `POST`, `PUT`, and `DELETE` requests are allowed.

2. **Allow all methods** (not commonly used for security reasons):
   ```http
   Access-Control-Allow-Methods: *
   ```

### Use in a Full CORS Response:
Along with `Access-Control-Allow-Origin`, this header is part of the server's CORS response setup, helping control what requests are permitted cross-origin.

### Common Values for `Access-Control-Allow-Methods`:
- `GET`
- `POST`
- `PUT`
- `DELETE`
- `OPTIONS`
- `PATCH`

This helps restrict or permit various actions based on the server’s security policies.

3. Access-Control-Allow-Headers

The `Access-Control-Allow-Headers` header in Cross-Origin Resource Sharing (CORS) specifies which HTTP headers can be included in requests made to the server from a different origin. This is especially relevant when making requests that use custom headers or non-standard headers that aren’t typically included in simple requests, like `Authorization`, `Content-Type`, or other custom headers.

When a browser makes a preflight `OPTIONS` request, it checks which headers it can include in the actual request by looking at the `Access-Control-Allow-Headers` response from the server.

### Example Usage

If a server allows specific headers like `Content-Type`, `Authorization`, and `X-Custom-Header`, it would respond with:

```http
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
```

This response tells the browser that the specified headers are permitted in requests from allowed origins.

### Key Points:

1. **Common Headers**: Frequently permitted headers include `Authorization`, `Content-Type`, `Accept`, and custom headers like `X-Requested-With`.

2. **Security and Control**: By specifying allowed headers, the server can control which information clients are allowed to send, helping to prevent malicious or unintended data from being sent.

3. **Wildcard (`*`)**: Though it's possible to use `*` to allow all headers, this is generally discouraged due to security concerns.

### Example in a CORS Response

In a full CORS setup, you might see:

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

This setup ensures only certain headers and methods are allowed when accessing resources from cross-origin requests, providing an additional layer of security for API resources.


4. Access-Control-Allow-Credentials

The `Access-Control-Allow-Credentials` header in Cross-Origin Resource Sharing (CORS) specifies whether or not the browser should include credentials (such as cookies, HTTP authentication, or client-side SSL certificates) with requests to the server. This header is crucial for applications that rely on user authentication and need to send credentials in cross-origin requests.

When a web application from one origin (e.g., `https://example.com`) requests resources from another origin (e.g., `https://api.example.com`) and the server sets `Access-Control-Allow-Credentials: true`, the browser will send cookies and authentication data along with the request.

### Example Usage

```http
Access-Control-Allow-Credentials: true
```

This response header tells the browser to include credentials in cross-origin requests to the server.

### Important Notes

1. **Must be Used with Specific Origins**: For `Access-Control-Allow-Credentials: true` to work, `Access-Control-Allow-Origin` must specify a particular origin rather than a wildcard (`*`). For example:
   ```http
   Access-Control-Allow-Origin: https://example.com
   Access-Control-Allow-Credentials: true
   ```

2. **Security Implications**: Allowing credentials can expose sensitive user data, so it’s typically used only with secure (HTTPS) requests and with trusted origins.

3. **Restricted Header Access**: When `Access-Control-Allow-Credentials` is set to `true`, the browser restricts access to the response headers to prevent exposing sensitive information unintentionally. Only a few headers like `Content-Type`, `Cache-Control`, and `Expires` are accessible.

### Example in a Full CORS Response

Here’s an example CORS response that allows credentials:

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

In this setup, requests to the server at `https://api.example.com` will include cookies or other credentials if they originate from `https://example.com`. This enables authenticated sessions to work across different domains securely.



5. Access-Control-Allow-Headers 

The `Access-Control-Allow-Headers` header in CORS specifies which HTTP headers can be included in requests made to a server from a different origin. This is necessary when the request includes non-standard headers, like `Authorization` or any custom headers.

When a browser makes a "preflight" `OPTIONS` request, it checks which headers it’s allowed to use in the actual request based on the server’s `Access-Control-Allow-Headers` response.

### Example Usage

If a server allows specific headers such as `Content-Type`, `Authorization`, and a custom header like `X-Custom-Header`, it would respond with:

```http
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
```

This tells the browser that these headers are permitted in cross-origin requests to this server.

### Key Points

1. **Common Headers**: Headers frequently included in the allow list are `Authorization`, `Content-Type`, `Accept`, and custom headers like `X-Requested-With`.

2. **Security**: By limiting which headers are allowed, the server controls what kind of information is sent, helping to avoid potentially harmful or unexpected data.

3. **Wildcard (`*`)**: While it’s technically possible to allow all headers by using `*`, this is usually discouraged as it’s less secure.

### Example in a Full CORS Response

In a typical CORS response setup:

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
```

This setup allows requests to the server from `https://example.com` with specific headers and methods, making cross-origin requests safe and controlled.


> ###  Subresource Integrity (SRI)

```
https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
```

Let say you are using any third part script like bootstrap cdn, and you are loading its content, but somehow hacker load mailicous script in bootstrap or its security gets compromised, then your website will be very much vulnerable. so thats why we use the SRI.

Subresource Integrity (SRI) is a security feature that allows browsers to verify that resources (such as scripts or stylesheets) loaded from a third-party source have not been tampered with. This is done by including a cryptographic hash in the HTML `<script>` or `<link>` tags for the resource. If the resource’s content doesn’t match the specified hash, the browser blocks it, helping to prevent attacks such as code injection.

### How It Works

When you include an SRI hash in a `<script>` or `<link>` tag, the browser:
1. Downloads the resource.
2. Calculates its hash.
3. Compares the calculated hash to the hash provided in the SRI attribute.
4. Loads the resource only if the hashes match.

### Example of SRI in HTML

For a CDN-hosted JavaScript file:

```html
<<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
```

In this example:
- The `integrity` attribute contains the hash (`sha384` here), which the browser uses to verify the file’s integrity.
- The `crossorigin="anonymous"` attribute allows cross-origin requests without credentials. This is typically required for SRI to work when loading resources from a different origin.

### Commonly Used Hash Algorithms
SRI hashes are usually created using either:
- **sha256**: Secure Hash Algorithm 256-bit
- **sha384**: Secure Hash Algorithm 384-bit
- **sha512**: Secure Hash Algorithm 512-bit

### Benefits of SRI
- **Security**: Prevents attackers from injecting malicious code into third-party resources.
- **Content Authenticity**: Ensures that the exact version of the resource you intended to load is what’s actually loaded.
  
### Limitations
- **CDN Updates**: If the third-party resource changes (e.g., the CDN updates it), the hash will no longer match, and the resource won’t load.
- **Hash Generation**: Requires generating and updating hashes whenever the resource changes.

### How to Generate an SRI Hash
You can generate an SRI hash using command-line tools like `openssl` or online tools. For example:

```bash
# Generate an SRI hash for a local file using sha384
openssl dgst -sha384 -binary file.js | openssl base64 -A
```

```
// website url

https://www.srihash.org/
```

Visit above site and paste bootstrap url in it ie 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', select hash, it wil generate the hash from the url take the genrated integrity, compare it with the hash provided in the integrity in above bootstrap cdn, if it matches then content gets loaded otherwise not loaded. 


## How does the web works

![screenshot](images/webworks.png)

### So what happens, exactly?

note: ip address defines the as the main address of any website.

When you type a web address into your browser (for our analogy that's like walking to the shop):

1. The browser goes to the DNS server, and finds the real address(ip address) of the server that the website lives on (you find the address of the shop).
2. The browser sends an HTTP request message to the server(hits that ip address from the browser), asking it to send a copy of the website to the client (you go to the shop and order your goods). This message, and all other data sent between the client and the server, is sent across your internet connection using TCP/IP.
3. If the server approves the client's request, the server sends the client a "200 OK" message, which means "Of course you can look at that website! Here it is", and then starts sending the website's files to the browser as a series of small `chunks` called data packets (the shop gives you your goods, and you bring them back to your house).
4. The browser assembles the small chunks into a complete web page and displays it to you (the goods arrive at your door — new shiny stuff, awesome!).


### Order in which component files are parsed
When browsers send requests to servers for HTML files, those HTML files often contain `<link>` elements referencing external CSS stylesheets and `<script>` elements referencing external JavaScript scripts. It's important to know the order in which those files are parsed by the browser as the browser loads the page:

- The browser parses the HTML file first, and that leads to the browser recognizing any `<link>` - element references to external CSS stylesheets and any `<script>`- element references to scripts.
- As the browser parses the HTML, it sends requests back to the server for any CSS files it has found from `<link>` elements, and any JavaScript files it has found from `<script>` elements, and from those, then parses the CSS and JavaScript.
- The browser generates an in-memory DOM tree from the parsed HTML, generates an in-memory CSSOM structure from the parsed CSS, and compiles and executes the parsed JavaScript.
- As the browser builds the DOM tree and applies the styles from the CSSOM tree and executes the JavaScript, a visual representation of the page is painted to the screen, and the user sees the page content and can begin to interact with it.

**The CSS Object Model (CSSOM) is a set of APIs that allows JavaScript to read and manipulate CSS styles dynamically in the browser.**

## DNS explained
Real web addresses aren't the nice, memorable strings you type into your address bar to find your favorite websites. They are special numbers that look like this: 192.0.2.172.

This is called an IP address, and it represents a unique location on the web. However, it's not very easy to remember, is it? That's why the Domain Name System was invented. This system uses special servers that match up a web address you type into your browser (like "mozilla.org") to the website's real (IP) address.

Websites can be reached directly via their IP addresses. You can use a [DNS lookup tool](https://www.nslookup.io/website-to-ip-lookup/) to find the IP address of a website.



> ### To get all the details of any domain visit below, enter the url in search and you will see when this doamin was first registered and when it was last updated or renewed.

[url](https://www.whois.com/whois/tataaig.com)

**Now we have connected server with the browser, we will se how they transfer data from server to browser**



## Communication Protocols

Communication protocols are essential rules and conventions for data transfer between network devices. These protocols define how data is formatted, transmitted, and received, enabling reliable communication across networks. Here are some common types of communication protocols:

### 1. **Network Protocols**
   - **TCP/IP (Transmission Control Protocol/Internet Protocol):** The foundation of the internet, governing how data is divided into packets, transmitted, and reassembled at the destination. TCP ensures reliability, while IP handles addressing.
   - **UDP (User Datagram Protocol):** A faster but less reliable alternative to TCP, often used for real-time applications like video streaming and gaming, where speed is prioritized over guaranteed delivery.
   - **HTTP/HTTPS (Hypertext Transfer Protocol):** A protocol for transmitting web pages. HTTPS is the secure version, adding encryption for secure communication.
   - **FTP (File Transfer Protocol):** Used for transferring files between a client and server, commonly for file sharing and website management.

### 2. **Email Protocols**
   - **SMTP (Simple Mail Transfer Protocol):** Used for sending emails from clients to servers and between servers.
   - **IMAP (Internet Message Access Protocol):** Allows users to access emails on a remote server, keeping the email on the server and syncing it across devices.
   - **POP3 (Post Office Protocol):** Downloads emails to a local client and usually deletes them from the server, suitable for accessing email from a single device.

### 3. **Wireless and Mobile Protocols**
   - **Wi-Fi (Wireless Fidelity):** Based on IEEE 802.11 standards, it allows devices to connect to a LAN without cables.
   - **Bluetooth:** A short-range protocol enabling communication between devices like phones, laptops, and accessories.
   - **5G/4G LTE (Long-Term Evolution):** Cellular protocols for high-speed data transfer on mobile networks, offering improved speed and connectivity.

### 4. **Data Link Layer Protocols**
   - **Ethernet:** A widely used protocol in LAN environments, based on IEEE 802.3, managing data transmission over wired networks.
   - **PPP (Point-to-Point Protocol):** Often used for establishing direct connections between network nodes, commonly used in DSL connections.

### 5. **Application Layer Protocols**
   - **DNS (Domain Name System):** Resolves human-readable domain names (like openai.com) into IP addresses.
   - **DHCP (Dynamic Host Configuration Protocol):** Assigns IP addresses dynamically to devices on a network, simplifying device configuration.
   - **SNMP (Simple Network Management Protocol):** Used for network management, it monitors network devices and handles alerts.

Each protocol plays a specific role in enabling reliable, efficient, and secure communication between devices across various types of networks. These protocols can operate at different layers of the OSI (Open Systems Interconnection) model, from the physical transfer of data to application-level interactions.

Explaining 8 Popular Network Protocols in 1 Diagram. The method to download the high-resolution PDF is available at the end.

Network protocols are standard methods of transferring data between two computers in a network.

1. HTTP (HyperText Transfer Protocol)
HTTP is a protocol for fetching resources such as HTML documents. It is the foundation of any data exchange on the Web and it is a client-server protocol.

2. HTTP/3
HTTP/3 is the next major revision of the HTTP. It runs on QUIC, a new transport protocol designed for mobile-heavy internet usage. It relies on UDP instead of TCP, which enables faster web page responsiveness. VR applications demand more bandwidth to render intricate details of a virtual scene and will likely benefit from migrating to HTTP/3 powered by QUIC.

3. HTTPS (HyperText Transfer Protocol Secure)
HTTPS extends HTTP and uses encryption for secure communications.

4. WebSocket
WebSocket is a protocol that provides full-duplex communications over TCP. Clients establish WebSockets to receive real-time updates from the back-end services. Unlike REST, which always “pulls” data, WebSocket enables data to be “pushed”. Applications, like online gaming, stock trading, and messaging apps leverage WebSocket for real-time communication.

5. TCP (Transmission Control Protocol)
TCP is is designed to send packets across the internet and ensure the successful delivery of data and messages over networks. Many application-layer protocols build on top of TCP.

6. UDP (User Datagram Protocol)
UDP sends packets directly to a target computer, without establishing a connection first. UDP is commonly used in time-sensitive communications where occasionally dropping packets is better than waiting. Voice and video traffic are often sent using this protocol.

7. SMTP (Simple Mail Transfer Protocol)
SMTP is a standard protocol to transfer electronic mail from one user to another.

8. FTP (File Transfer Protocol)
FTP is used to transfer computer files between client and server. It has separate connections for the control channel and data channel.


![common network protocols](images/protocol.jpg)


## Rest API

1 Tier architecture - frontend and backend are on same
2 Tier architecture - frontend and backend are manage separately
3 Tier architecture - frontend, backend and database, we managing separately

For communicationg between the frontend, backend and database, we need api,

A REST (Representational State Transfer) API is a widely-used web service architecture that allows clients and servers to `communicate over HTTP protocol` using standard HTTP methods like GET, POST, PUT, DELETE, and PATCH. RESTful APIs are stateless, meaning each request from the client to the server must contain all the information needed to understand and process the request.

Here’s a quick overview of REST API principles and best practices:

### Key Principles
1. **Statelessness**: Each request is independent and does not rely on previous requests. This makes the API more scalable.
2. **Client-Server Separation**: The client and server interact only through requests and responses, keeping the client interface separate from server data management.
3. **Uniform Interface**: REST defines a standard set of methods (HTTP verbs) for interaction.
4. **Cacheability**: Responses should define whether they are cacheable, improving performance on the client side.
5. **Layered System**: An API can have multiple layers, improving scalability, load balancing, and security.

### Common HTTP Methods
- **GET**: Retrieve information from the server (e.g., a list of users or a specific user).
- **POST**: Send data to the server, often to create a new resource.
- **PUT**: Update an existing resource or create one if it doesn’t exist.
- **DELETE**: Remove a resource.
- **PATCH**: Partially update a resource.

### RESTful API Example
Assume you’re building an API for a blog application.

- **Endpoint**: `/posts`
  - `GET /posts` – Fetch all blog posts
  - `POST /posts` – Create a new blog post
  - `GET /posts/{id}` – Retrieve a specific blog post by ID
  - `PUT /posts/{id}` – Update a specific post by ID
  - `DELETE /posts/{id}` – Delete a specific post by ID

### Best Practices
- **Use Nouns for Endpoints**: Name endpoints as resources (e.g., `/users` instead of `/getUsers`).
- **Handle Errors Gracefully**: Use proper HTTP status codes (e.g., 404 for "Not Found," 400 for "Bad Request").
- **Document the API**: Use tools like Swagger or OpenAPI to provide easy-to-understand documentation.
- **Version Your API**: To handle changes, version the API (e.g., `/api/v1/posts`).

The REST (Representational State Transfer) architectural style offers several benefits that make it a popular choice for building APIs. Here are some key advantages:

### 1. **Simplicity and Scalability**
   - **Simple Structure**: REST APIs use HTTP methods (GET, POST, PUT, DELETE, PATCH), making them straightforward to implement and understand.
   - **Stateless**: Each request is independent, so the server does not need to store client context between requests, enhancing scalability and allowing the server to handle large volumes of requests easily.

### 2. **Flexibility and Extensibility**
   - **Language-Agnostic**: REST APIs are protocol-based and can be used with any programming language that supports HTTP (like JavaScript, Python, Java, etc.), providing flexibility in both client and server technologies.
   - **Modular**: REST allows for flexible data handling, making it possible to add or modify resources and methods without disrupting the whole system.

### 3. **Reusability and Interoperability**
   - **Reusable Endpoints**: With REST, the same endpoint can be used across various applications and client devices, such as web, mobile, IoT, etc.
   - **Interoperability**: REST APIs are accessible over HTTP, which is universally supported, allowing different systems to easily interact, regardless of platform or language.

### 4. **Performance and Caching**
   - **Caching**: REST APIs can use HTTP caching, where responses can be stored on the client or intermediary servers, reducing the load on the backend and improving performance.
   - **Lightweight**: REST typically transmits data in formats like JSON or XML, which are lightweight and easy to parse, resulting in faster data transfer over the network.

### 5. **Easy Integration and Adoption**
   - **Standard Protocols**: REST uses standard HTTP methods and status codes, which are widely recognized and understood, making it easier for developers to integrate and adopt REST APIs without a steep learning curve.
   - **Wide Ecosystem Support**: Many libraries, tools, and frameworks are available for working with REST, such as Axios for JavaScript, Retrofit for Android, or Flask for Python, which speed up development.

### 6. **Scalable Development and Maintenance**
   - **Separation of Concerns**: REST’s client-server model ensures that the client and server are independent of each other, allowing teams to work on client and server components separately.
   - **Modular Design**: REST’s resource-based approach allows different parts of the API to evolve independently, making it easier to maintain and extend.

### 7. **Consistency and Usability**
   - **Uniform Interface**: REST’s standardized approach (using nouns for resources and HTTP verbs for actions) creates a predictable structure, making APIs more intuitive to use and understand.

REST’s simplicity, flexibility, and broad support make it ideal for building scalable, reliable, and maintainable APIs across various applications and industries.








> ### Various headers used in api   https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

### **1. Authentication & Authorization Headers**
   - **Authorization**: Used for client authentication. Includes tokens or credentials.
     - Example: `Authorization: Bearer {token}`
   - **WWW-Authenticate**: Sent by the server when an `Authorization` is missing or invalid.
     - Example: `WWW-Authenticate: Basic realm="Access to the site"`

### **2. Content & Encoding Headers**
   - **Content-Type**: Indicates the media type of the request/response body.
     - Example: `Content-Type: application/json`
   - **Content-Length**: Specifies the size (in bytes) of the body in a request or response.
     - Example: `Content-Length: 348`
   - **Content-Encoding**: Specifies the encoding applied to the body, like gzip, deflate, or br (Brotli).
     - Example: `Content-Encoding: gzip`
   - **Transfer-Encoding**: Indicates that the message body uses chunked encoding (data sent in smaller chunks).
     - Example: `Transfer-Encoding: chunked`
   - **Accept**: Tells the server which response formats the client can handle.
     - Example: `Accept: application/json`
   - **Accept-Encoding**: Specifies the content encoding types the client supports for compressed data (e.g., gzip).
     - Example: `Accept-Encoding: gzip, deflate, br`

### **3. Caching & Conditional Headers**
   - **Cache-Control**: Specifies caching policies to control data freshness and caching.
     - Example: `Cache-Control: no-store, must-revalidate`
   - **ETag**: Provides a unique identifier for a version of a resource to help with cache validation.
     - Example: `ETag: "33a64df551425fcc55e"`
   - **Last-Modified**: Specifies the last time the resource was modified, helping clients cache responses.
     - Example: `Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT`
   - **Expires**: Indicates the date/time after which the response is considered stale.
     - Example: `Expires: Thu, 01 Dec 2023 16:00:00 GMT`

### **4. Connection Management Headers**
   - **Connection**: Controls whether the network connection stays open after the transaction.
     - Example: `Connection: keep-alive`
   - **Keep-Alive**: Provides parameters for how long a connection should remain open (used with `Connection: keep-alive`).
     - Example: `Keep-Alive: timeout=5, max=100`

### **5. Security Headers**
   - **X-Content-Type-Options**: Prevents MIME-type sniffing by specifying content type.
     - Example: `X-Content-Type-Options: nosniff`
   - **Strict-Transport-Security (HSTS)**: Enforces HTTPS by instructing browsers to only connect securely.
     - Example: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
   - **X-Frame-Options**: Controls whether a site can be embedded in an `<iframe>`.
     - Example: `X-Frame-Options: DENY`
   - **X-XSS-Protection**: Activates cross-site scripting filters in browsers.
     - Example: `X-XSS-Protection: 1; mode=block`

### **6. Client Metadata Headers**
   - **User-Agent**: Identifies the client (browser or app) making the request.
     - Example: `User-Agent: Mozilla/5.0`
   - **Referer**: Specifies the URL of the page that referred the client to the current page.
     - Example: `Referer: https://example.com/page`
   - **Origin**: Specifies the origin (protocol, host, port) of the request, essential for CORS.
     - Example: `Origin: https://example.com`
   - **Host**: Identifies the domain name of the server (useful for virtual hosting).
     - Example: `Host: api.example.com`
   - **Accept-Language**: Specifies the language expected in the response, useful for localization..
     - Example: `Accept-Language: en-US`

### **7. CORS (Cross-Origin Resource Sharing) Headers**
   - **Access-Control-Allow-Origin**: Indicates which domains are allowed to access resources.
     - Example: `Access-Control-Allow-Origin: https://example.com`
   - **Access-Control-Allow-Methods**: Specifies allowed HTTP methods (GET, POST, etc.) for cross-origin requests.
     - Example: `Access-Control-Allow-Methods: GET, POST`
   - **Access-Control-Allow-Headers**: Lists allowed headers in the actual request.
     - Example: `Access-Control-Allow-Headers: Content-Type, Authorization`

### **8. Rate Limiting Headers**
   - **X-RateLimit-Limit**: Maximum number of requests allowed within a period.
     - Example: `X-RateLimit-Limit: 1000`
   - **X-RateLimit-Remaining**: Number of requests remaining in the period.
     - Example: `X-RateLimit-Remaining: 499`
   - **X-RateLimit-Reset**: Time (in seconds) until the rate limit resets.
     - Example: `X-RateLimit-Reset: 3600`

### **9. Session & Cookie Headers**
   - **Set-Cookie**: Used to set a cookie on the client’s browser.
     - Example: `Set-Cookie: sessionId=abc123; Secure; HttpOnly`
   - **Cookie**: Contains cookie data to be sent back to the server.
     - Example: `Cookie: sessionId=abc123`

### **10. Custom Headers**
   - **X-Requested-With**: Common in AJAX requests to signal the request was made with JavaScript.
     - Example: `X-Requested-With: XMLHttpRequest`
   - **X-Forwarded-For**: Identifies the originating IP address of a client connecting through a proxy or load balancer.
     - Example: `X-Forwarded-For: 192.168.1.1`
   - **X-Correlation-ID**: Unique identifier for a request, useful for tracing requests across services.
     - Example: `X-Correlation-ID: 12345abcde`


> ### Etag is used for ?

The **ETag** (Entity Tag) header is used in HTTP responses for caching and conditional requests. It serves as a unique identifier for a specific version of a resource. When the resource changes, the ETag value changes as well. This is particularly useful for optimizing performance and bandwidth usage.

### **How ETag Works**

1. **Server Response with ETag**: When a server responds to a request for a resource (e.g., an image, JSON data, or a webpage), it may include an `ETag` header with a unique identifier for the current version of that resource.

   ```plaintext
   HTTP/1.1 200 OK
   ETag: "34a64df551429fcc55e4d42a148795d9f25f89d4"
   Content-Type: application/json
   ```

2. **Client Caching and Revalidation**: The client (browser or other HTTP client) caches the response along with the ETag. On subsequent requests for the same resource, the client can include an `If-None-Match` header with the cached ETag value.

   ```plaintext
   GET /resource HTTP/1.1
   If-None-Match: "34a64df551429fcc55e4d42a148795d9f25f89d4"
   ```

3. **Server Comparison**:
   - **If the ETag matches** the current version of the resource, the server responds with a `304 Not Modified` status code, meaning the cached version on the client is still valid. This saves bandwidth by not resending the full resource.
   - **If the ETag does not match**, the server sends the new version of the resource with a new ETag.

### **Benefits of ETag**

- **Reduced Bandwidth**: Avoids resending unchanged resources, saving bandwidth and speeding up the loading time.
- **Improved Performance**: Reduces latency by allowing clients to validate cached resources instead of fully re-downloading them.
- **Cache Control**: Ensures that clients always have the most recent version of the resource, avoiding outdated cache issues.

### **Example with ETag**

**Initial Response:**

```plaintext
HTTP/1.1 200 OK
ETag: "v1.0"
Content-Type: application/json
```

**Client Subsequent Request:**

```plaintext
GET /resource HTTP/1.1
If-None-Match: "v1.0"
```

**Server Response If Resource Unchanged:**

```plaintext
HTTP/1.1 304 Not Modified
```

**Server Response If Resource Changed:**

```plaintext
HTTP/1.1 200 OK
ETag: "v2.0"
Content-Type: application/json
``` 

In this way, `ETag` helps maintain up-to-date data while optimizing server-client communication.


> ### Status code and category

1XX - Information
2XX - Success
3XX - Redirection
4XX - Client Error
5XX - Server Error