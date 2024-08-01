> ### Pseudo-elements : befor and after
A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). For example, ::first-line can be used to change the font of the first line of a paragraph.

<br>

> ### Pseudo-classes/ Pseudo selector : hover,focus,active,link,first child,last child,nth child
A pseudo-class is used to define a special state of an element.

<br>


> ### CSS Attribute Selectors

CSS [attribute] Selector\
The [attribute] selector is used to select elements with a specified attribute.

The following example selects all <a> elements with a target attribute:

```css
a[target] {
  background-color: yellow;
}
```

```css
a[target="_blank"] {
  background-color: yellow;
}
```

**Below for the selectors**

```js
https://learning-notes.mistermicheels.com/web/css/selectors/
```

<br>

> ### CSS Combinator Selectors

There are four different combinators in CSS:

- descendant selector (space)
- direct child selector (>) (not the nested)
- adjacent sibling selector (+)
- general sibling selector (~)

<br>

> ### What do the following CSS selectors mean?
div, p\
div p\
div ~ p\
div + p\
div > p

The CSS selectors you mentioned are used to target HTML elements in different ways. Here’s a breakdown of what each selector does:

1. **`div, p`**
   - This is a **group selector**. It selects all `<div>` elements and all `<p>` elements in the document.
   - Example: It will apply the same styles to both `<div>` and `<p>` elements.
     ```css
     div, p {
         color: blue;
     }
     ```

2. **`div p`**
   - This is a **descendant selector**. It selects all `<p>` elements that are descendants of a `<div>` element (at any level).
   - Example: It will style `<p>` elements that are inside `<div>` elements.
     ```css
     div p {
         color: red;
     }
     ```

3. **`div ~ p`**
   - This is a **general sibling selector**. It selects all `<p>` elements that are siblings of a `<div>` element and come after it in the document.
   - Example: It will style `<p>` elements that follow a `<div>` element as a sibling.
     ```css
     div ~ p {
         color: green;
     }
     ```

4. **`div + p`**
   - This is an **adjacent sibling selector**. It selects the `<p>` element that immediately follows a `<div>` element as a sibling.
   - Example: It will style the first `<p>` element that directly follows a `<div>` element.
     ```css
     div + p {
         color: orange;
     }
     ```

5. **`div > p`**
   - This is a **child selector**. It selects all `<p>` elements that are direct children of a `<div>` element.
   - Example: It will style `<p>` elements that are direct children of `<div>` elements.
     ```css
     div > p {
         color: purple;
     }
     ```

Each selector allows for different levels of specificity and targeting, enabling precise control over the styling of HTML elements.

<br>

> ### Box-Sizing :
- The box-sizing property in CSS is used to control how the total width and height of an HTML element is calculated. It has two possible values: `content-box and border-box`.
- The `default value` for box-sizing is `content-box`. This means that the `width and height of an element` are calculated `based` on the `content` of the element, `excluding` `padding and border`.
- If you set the value of box-sizing to `border-box`, the `width and height` of an element are calculated based on the `content, padding, and border` of the element. This can be useful in situations where you want to set a specific width for an element that includes its padding and border, rather than having to calculate the total width manually.

<br>

> ### What is flexbox
Flexbox is a `layout module in CSS` that provides a more efficient and flexible way to arrange and align elements in a container. The main idea behind Flexbox is that you can `turn` any `container element` into a `flexible container`,

<br>

> ### Position in css
- position: static;
- position: relative;
- position: absolute;
- position: fixed;
- position: sticky;

Below for diagram
```
https://www.programiz.com/css/position
```

<br>

> ### Diff between visibility and d none
**visibility:hidden** hides the element, but it still takes up space in the layout.\
**display:none** removes the element from the document. It does not take up any space.

<br>


> ### Advantage of CSS3 over CSS
some are Responsiveness or Media queries,new color formats Colors, advanced Animations,Border Radius,  etc

<br>


> ### how does `clear` in CSS work?
The clear CSS property sets whether an element must be moved below (cleared) floating elements that precede it.

<br>

> ### BEM model for naming classes

```
https://getbem.com/naming/
```

```
https://www.w3schools.com/css/css_grid.asp
```

<br>

> ### What is a CSS Preprocessor? What are Sass, Less, and Stylus? Why do people use them?
A CSS Preprocessor is a tool used to extend the basic functionality of default vanilla CSS through its own scripting language. It helps us to use complex logical syntax like – variables, functions, mixins, code nesting, and inheritance to name a few, supercharging your vanilla CSS.

<br>

> ### scss notes

```
https://learning-notes.mistermicheels.com/web/css/sass-scss/
```

<br>

> ### What is the difference between inline, inline-block, and block?

**Block Element:** The block elements always `start on a new line`. They will also `take space` for an `entire row or width`. List of block elements are `<div>`, `<p>`.

**Inline Elements:** Inline elements `don't start on a new line`, they `appear on the same line` as the content and tags beside them. Some examples of inline elements are `<a>`, `<span>` , `<strong>`, and `<img>` tags. 

**Inline Block Elements:** Inline-block elements are `similar` to `inline` elements, `except` they can `have padding and margins and set height and width values`.


<br>


> ### Does margin-top or margin-bottom have an effect on inline elements?
No, it doesn’t affect the inline elements. Inline elements flow with the contents of the page.

<br>

> ### What does the :root pseudo-class refer to?

The `:root selector` allows you to `target` the `highest-level “parent” element` in the DOM, or document tree. It is defined in the CSS Selectors Level 3 specification.

<br>


> ### How do I restore the default value of a property?

The keyword initial can be used to reset it to its default value.

<br>


> ### How does Calc work?

The CSS3 `calc()` function allows us to perform mathematical operations on property values. Instead of declaring, for example, static pixel values for an element's width, we can use calc() to specify that the width is the result of the addition of two or more numeric values.

```css
.foo {
	Width: calc(100px + 50px)
}
```

<br>


> ### What do CSS Custom properties variables mean?

Custom properties are defined by users that contain specific values to be reused throughout a document. The value is set using -- notion. And the values are accessed using the var() function.

```css
:root {
	--main-bg-color: brown
}

.one {
	color: white;
	background-color· var (--main-bg-color);
	margin: l0px,
	width: 50px,
	height: 5Opx;
	display: inline-block;
}
```

<br>


> ### What does !important mean in CSS?
The style is having the important will have the `highest precedence` and it overrides the cascaded property.

```css
 p {
 	color: red !important;
 }
 #thing {
 	color: green;
 } 
```
```html
 <p id="thing">Will be RED.</p>
```
 
<br>


> ### What is specificity? How to calculate specificity?

A process of determining which CSS rule will be applied to an element. It actually determines which rules will take precedence.\
`Inline style` usually `wins` then `ID` `then` the `class` value (or pseudo-class or attribute selector), the `universal selector` (*) has no specificity. ID selectors have a higher specificity than attribute selectors.

<br>


> ### How to determine if the browser supports a certain feature?

The `@support` in CSS can be very useful to scan if the current browser has support for a certain feature.

```css
@supports (display: grid) {
  div {
     display: grid;
   }
}
```

<br>


> ### In how many ways can we add CSS to our HTML file?

1. Inline CSS
2. Internal or Embedded CSS
3. External CSS


<br>


> ### How can we add comments in CSS?

```
 /* content */
```

<br>


> ### What does margin: 40px 100px 120px 80px signify?
     
top = 40px\
right = 100px\
bottom = 120px\
left = 80px

<br>


> ### What is the difference between margin and padding?

- `Margin` is used to `create space` `around elements` and `padding` is used to `create space` around elements `inside the border`.\
- We can set the `margin property to auto` but we `cannot` set the `padding property to auto`.\
- In `Margin property` we can `allow negative` or float number but in `padding` we `cannot` allow negative values.\
- Margin and padding target all the 4 sides of the element. Margin and padding will work without the border property also.


<br>


> ### What is the difference between CSS border and outline?

- `CSS border` properties allow us to `set the style, color, and width of the border`.
- `CSS outline` property allows us to `draw a line` around the element, `outside the border`.


<br>


> ### What is CSS overflow?

The CSS overflow controls the big content. It tells whether to clip content or to add scroll bars. The overflow contains the following property:

- visible
- hidden
- scroll
- auto

1. `Visible`: The content is not clipped and is visible outside the element box.

2. `Hidden`: The overflow is clipped and the rest of the content is invisible.

3. `Scroll`: The overflow is clipped but a scrollbar is added to see the rest of the content. The scrollbar can be horizontal or vertical.

4. `Auto`: It automatically adds a scrollbar whenever it is required.

`Overflow-x and Overflow-y`: This property specifies how to change the overflow of elements. x deals with horizontal edges and y deals with vertical edges.


<br>


> ### How case-sensitive is CSS?

All CSS style sheets are case-insensitive, except for portions that are not under the control of CSS. For example, the case sensitivity due to values of the HTML attributes “id” and “class”, font names, and URIs lies outside the scope of this specification.

<br>


> ### What property is used for changing the font face?

The font-family property is used for changing the font face that is applied to the element in the DOM.

<br>



> ### Does style1.css have to be downloaded and parsed before style2.css can be fetched?

No. The CSS file will be downloaded via browser in order to appear on the HTML page.

<br>


> ### When should you use translate () instead of absolute positioning?

Translate is a CSS transform value. On changing opacity or transform, browser reflow or repaint is not triggered. Transform requires the browser to create a GPU layer for elements but using the CPU changes absolutes positioning properties. Translate () is more efficient and results in shorter paint times. On using translate (), element occupies original space, unlike in changing absolute positioning.

<br>

> ### How would you approach fixing browser-specific styling issues?

- After identifying the issue and the offending browser, use a separate style sheet that only loads when that specific browser is being used. This technique requires server-side rendering though.
- Use libraries like Bootstrap that already handles these styling issues for you.
- Use autoprefixer to automatically add vendor prefixes to your code.
- Use Reset CSS or Normalize.css.
- If you're using Postcss (or a similar transpiling library), there may be plugins which allow you to opt in for using modern CSS syntax (and even W3C proposals) that will transform those sections of your code into corresponding safe code that will work in the targets you've used.


<br>


> ### What are the different ways to visually hide content (and make it available only for screen readers)?

These techniques are related to accessibility (a11y).

- `width: 0; height: 0`. Make the element not take up any space on the screen at all, resulting in not showing it.

- `position: absolute; left: -99999px`. Position it outside of the screen.

- `text-indent: -9999px`. This only works on text within the block elements.
Meta tags. For example by using Schema.org, RDF, and JSON-LD.
WAI-ARIA. A W3C technical specification that specifies how to increase the accessibility of web pages.\
Even if WAI-ARIA is the ideal solution, I would go with the absolute positioning approach, as it has the least caveats, works for most elements and it's an easy technique.


<br>



> ### Can you give an example of an @media property other than screen?

Yes, there are four types of @media properties (including screen):

- `all` - for all media type devices
- `print` - for printers
- `speech` - for screenreaders that "reads" the page out loud
- `screen` - for computer screens, tablets, smart-phones etc.


Here is an example of print media type's usage:

```html
@media print {
  body {
    color: black;
  }
}
```

<br>


> ### Explain how a browser determines what elements match a CSS selector.

This part is related to the above about writing efficient CSS. Browsers match selectors from rightmost (key selector) to left. Browsers filter out elements in the DOM according to the key selector and traverse up its parent elements to determine matches. The shorter the length of the selector chain, the faster the browser can determine if that element matches the selector.

For example with this selector p span, browsers firstly find all the `<span>` elements and traverse up its parent all the way up to the root to find the `<p>` element. For a particular `<span>`, as soon as it finds a `<p>`, it knows that the `<span>` matches and can stop its matching.


A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). They can be used for decoration (`::first-line`, `::first-letter`) or adding elements to the markup (combined with `content: ...`) without having to modify the markup (`:before`, `:after`).

`::first-line` and `::first-letter` can be used to decorate text.\
Used in the `.clearfix` hack as shown above to add a zero-space element with `clear: both`.

Triangular arrows in tooltips use `:before` and `:after`. Encourages separation of concerns because the triangle is considered part of styling and not really the DOM.
