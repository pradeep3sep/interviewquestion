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

You would use the srcset attribute when you want to serve different images to users depending on their device display width - serve higher quality images to devices with retina display enhances the user experience while serving lower resolution images to low-end devices increase performance and decrease data wastage (because serving a larger image will not have any visible difference). For example: ```<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="..." alt="">``` tells the browser to display the small, medium or large .jpg graphic depending on the client's resolution. The first value is the image name and the second is the width of the image in pixels. For a device width of 320px, the following calculations are made:

500 / 320 = 1.5625\
1000 / 320 = 3.125\
2000 / 320 = 6.25

If the client's resolution is 1x, 1.5625 is the closest, and 500w corresponding to small.jpg will be selected by the browser.

If the resolution is retina (2x), the browser will use the closest resolution above the minimum. Meaning it will not choose the 500w (1.5625) because it is greater than 1 and the image might look bad. The browser would then choose the image with a resulting ratio closer to 2 which is 1000w (3.125).

srcsets solve the problem whereby you want to serve smaller image files to narrow screen devices, as they don't need huge images like desktop displays do — and also optionally that you want to serve different resolution images to high density/low-density screens.

<br>


> ### What Is Semantic HTML?
Semantic HTML, also known as semantic markup, refers to the use of HTML tags that convey the meaning—or semantics—of the content contained within them.

For example, tags like `<header>`, `<article>`, and `<footer>` are semantic HTML tags. They clearly indicate the role of the content they contain.

<br>


> ### Difference between <b> and <strong> Elements

The HTML `<b>` element defines bold text, without any extra importance. The HTML `<strong>` element defines text with strong importance. The content inside is typically displayed in bold.
