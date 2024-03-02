# HTML Best Practices

### Start with DOCTYPE

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

### Don’t use character references as much as possible

If you write an HTML document with UTF-8, almost all characters (including Emoji) can be written directly.

Bad:

    <p><small>Copyright &copy; 2014 W3C<sup>&reg;</sup></small></p>

Good:

    <p><small>Copyright © 2014 W3C<sup>®</sup></small></p>

### Escape `&`, `<`, `>`, `"`, and `'` with named character references

These characters should escape always for a bug-free HTML document.

Bad:

    <h1>The "&" character</h1>

Good:

    <h1>The &quot;&amp;&quot; character</h1>

### What Is Semantic HTML?
Semantic HTML, also known as semantic markup, refers to the use of HTML tags that convey the meaning—or semantics—of the content contained within them.

For example, tags like `<header>`, `<article>`, and `<footer>` are semantic HTML tags. They clearly indicate the role of the content they contain.