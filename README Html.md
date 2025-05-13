# HTML Best Practices

### Start with DOCTYPE
All HTML documents must start with a <!DOCTYPE> declaration. The declaration is not an HTML tag. It is an "information" to the browser about what document type to expect. In HTML 5, the declaration is simple: <!DOCTYPE html>

DOCTYPE is required for activating no-quirks mode.

Bad:

    <html>
      ...
    </html>

Good:

    <!DOCTYPE html>
    <html>
      ...
    </html>


<br>


> ### Iframe in HTML

An inline frame is used to embed another document within the current HTML document.


<br>


> ### HTML Formatting Elements 

Formatting elements were designed to display special types of text:
```
<b> - Bold text
<strong> - Important text
<i> - Italic text
<em> - Emphasized text
<mark> - Marked text
<small> - Smaller text
<del> - Deleted text
<ins> - Inserted text
<sub> - Subscript text
<sup> - Superscript text
```

Below is the output of above


<b> - Bold text</b>\
<strong> - Important text</strong>\
<i> - Italic text</i>\
<em> - Emphasized text</em>\
<mark> - Marked text</mark>\
<small> - Smaller text</small>\
<del> - Deleted text</del>\
<ins> - Inserted text</ins>\
<sub> - Subscript text</sub>\
<sup> - Superscript text</sup>


<br>


> ### Don’t use character references as much as possible

If you write an HTML document with UTF-8, almost all characters (including Emoji) can be written directly.

Bad:

    <p><small>Copyright &copy; 2014 W3C<sup>&reg;</sup></small></p>

Good:

    <p><small>Copyright © 2014 W3C<sup>®</sup></small></p>
    


<br>


> ### Escape `&`, `<`, `>`, `"`, and `'` with named character references

These characters should escape always for a bug-free HTML document.

Bad:

    <h1>The "&" character</h1>

Good:

    <h1>The &quot;&amp;&quot; character</h1>

<br>


> ### Why you would use a srcset attribute in an image tag? Explain the process the browser uses when evaluating the content of this attribute.

#### When to Use `srcset`

* Use the `srcset` attribute when you want to **serve different images based on the user's device display width and resolution**.
* This helps to:

  * Improve user experience by serving **high-quality images on retina displays**.
  * **Optimize performance** and **reduce data usage** on low-end or narrow-screen devices by serving lower resolution images.

#### How `srcset` Works

* The `srcset` attribute lets the browser choose the best image to load.
* Syntax example:

  ```html
  <img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="fallback.jpg" alt="Responsive Image">
  ```

  * The `first value` (e.g., `small.jpg`) is the **image filename**.
  * The `second value` (e.g., `500w`) is the **image width in pixels**.

#### Why `srcset` is Useful

* Solves the problem of needing to:

  * Serve **smaller image files** to **mobile/narrow screens**.
  * Serve **higher resolution images** to **high-density (retina) displays**.
* Ensures both **performance** and **visual quality** are optimized depending on the device.

<br>


> ### What Is Semantic HTML?
Semantic HTML, also known as semantic markup, refers to the use of `HTML tags that convey the meaning—or semantics—of the content contained within them`.

For example, tags like `<header>`, `<article>`, and `<footer>` are semantic HTML tags. They clearly indicate the role of the content they contain.

<br>


> ### Difference between `<b>` and `<strong>` Elements

The HTML `<b>` element defines `bold text`, `without any extra importance`. The HTML `<strong>` element defines `text with strong importance`. The content inside is typically displayed in bold.
