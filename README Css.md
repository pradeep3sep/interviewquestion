> ### CSS Combinator Selectors

There are four different combinators in CSS:

- descendant selector (space)
- direct child selector (>) (not the nested)
- adjacent sibling selector (+)
- general sibling selector (~)

> ### Pseudo-elements : befor and after
A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). For example, ::first-line can be used to change the font of the first line of a paragraph.

> ### Pseudo-classes/ Pseudo selector : hover,focus,active,link,first child,last child,nth child
A pseudo-class is used to define a special state of an element.

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

> ### Box-Sizing :
- The box-sizing property in CSS is used to control how the total width and height of an HTML element is calculated. It has two possible values: `content-box and border-box`.
- The default value for box-sizing is content-box. This means that the width and height of an element are calculated based on the content of the element, excluding padding and border.
- If you set the value of box-sizing to border-box, the width and height of an element are calculated based on the content, padding, and border of the element. This can be useful in situations where you want to set a specific width for an element that includes its padding and border, rather than having to calculate the total width manually.

```
https://learning-notes.mistermicheels.com/web/css/box-model/
```

> ### What is flexbox
Flexbox is a layout module in CSS that provides a more efficient and flexible way to arrange and align elements in a container. The main idea behind Flexbox is that you can turn any container element into a flexible container,

> ### Position in css
- position: static;
- position: relative;
- position: absolute;
- position: fixed;
- position: sticky;

> ### Screen meaning in media queries

> ### diff between visibility and d none
visibility:hidden hides the element, but it still takes up space in the layout. display:none removes the element from the document. It does not take up any space.

> ### Advantage of CSS3 over CSS
some are Responsiveness or Media queries,new color formats Colors, advanced Animations,Border Radius,  etc

> ### how does `clear` in CSS work?
The clear CSS property sets whether an element must be moved below (cleared) floating elements that precede it.

> ### scss notes

```
https://learning-notes.mistermicheels.com/web/css/sass-scss/
```

> ### BEM model for naming classes

```
https://getbem.com/naming/
```

```
https://github.com/pradeep3sep/Awesome-JavaScript-Interviews/blob/master/CSS/Collection-of-CSS-Questions.md
https://www.w3schools.com/css/css_grid.asp
https://css-tricks.com/the-css-box-model/
https://www.w3schools.com/cssref/pr_class_position.php
```

7. What is a CSS Preprocessor? What are Sass, Less, and Stylus? Why do people use them?
A CSS Preprocessor is a tool used to extend the basic functionality of default vanilla CSS through its own scripting language. It helps us to use complex logical syntax like – variables, functions, mixins, code nesting, and inheritance to name a few, supercharging your vanilla CSS.


10. What is the difference between inline, inline-block, and block?
Block Element: The block elements always start on a new line. They will also take space for an entire row or width. List of block elements are <div>, <p>.

Inline Elements: Inline elements don't start on a new line, they appear on the same line as the content and tags beside them. Some examples of inline elements are <a>, <span> , <strong>, and <img> tags. 

Inline Block Elements: Inline-block elements are similar to inline elements, except they can have padding and margins and set height and width values.


13. Does margin-top or margin-bottom have an effect on inline elements?
No, it doesn’t affect the inline elements. Inline elements flow with the contents of the page.

The border-box property includes the content, padding and border in the height and width properties. Consider an example as shown:
```
div{
    width:300px;
    height:200px;
    padding:15px;
    border: 5px solid grey;
    margin:30px;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
}
```

Here, the box-sizing for the div element is given as border-box. That means the height and width considered for the div content will also include the padding and border. This means that the actual height of the div content will be:

```
actual height = height - 
                padding on top and bottom - 
                border on top and bottom
              = 200 - (15*2) - (5*2) 
              = 160 px
```


What do the following CSS selectors mean?
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


Can you name the four types of @media properties?\
The four types of @media properties are:

All → It’s the default property. Used for all media-type devices.
Screen → Used for computer screen, mobile screen.\
Print → Used for printers.\
Speech → Used for screen readers.

What does the :root pseudo-class refer to?
The :root selector allows you to target the highest-level “parent” element in the DOM, or document tree. It is defined in the CSS Selectors Level 3 specification.

11. How do I restore the default value of a property?
The keyword initial can be used to reset it to its default value.

12. How does Calc work?
The CSS3 calc() function allows us to perform mathematical operations on property values. Instead of declaring, for example, static pixel values for an element's width, we can use calc() to specify that the width is the result of the addition of two or more numeric values.

.foo {
	Width: calc(100px + 50px)
}


13. What do CSS Custom properties variables mean?
Custom properties (sometimes referred to as CSS variables or cascading variables) are defined by users that contain specific values to be reused throughout a document. The value is set using -- notion. And the values are accessed using the var() function.

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


15. What does * { box-sizing: border-box; } do? What are its advantages?
It makes every element in the document include the padding and border in the element’s inner dimension for the height and width computation.  
In box-sizing: border-box, The height of an element is now calculated by the content's height + vertical padding + vertical border width.
The width of an element is now calculated by the content's width + horizontal padding + horizontal border width.


16. What does !important mean in CSS?
The style is having the important will have the highest precedence and it overrides the cascaded property.

 p {
 	color: red !important;
 }
 #thing {
 	color: green;
 } 
 <p id="thing">Will be RED.</p>

 
17. What is specificity? How to calculate specificity?
A process of determining which CSS rule will be applied to an element. It actually determines which rules will take precedence. Inline style usually wins then ID then the class value (or pseudo-class or attribute selector), the universal selector (*) has no specificity. ID selectors have a higher specificity than attribute selectors.



21. How to determine if the browser supports a certain feature?
The @support in CSS can be very useful to scan if the current browser has support for a certain feature.

@supports (display: grid) {
	div {
		display: grid;
	}
}


