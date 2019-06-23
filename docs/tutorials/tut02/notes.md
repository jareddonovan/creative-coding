---
title: Tut02 Notes
---

## Tutorial Plan:

* Introduce self
* Talk to neighbor and find out what they are doing in the class.
* Open Bb and Assignment 1 overview
* Who has done the T01 activity? (Overview of tuts)
* Open p5js editor and sign up for an account
* Open gosoapbox so we can share links
* Simple shapes / coordinate system. Understanding how to call a function
* Colour
* Variables
* Mouse input
* Drawing program

## TODO:

* Rework the two examples
* Add a guided section on mouse events
* Add a guided section on colour
* Add a guided section on coordinate system and shapes.

## Understanding the parts of a p5js project

When you open the p5js web editor, it will set up an empty project for you.
Because p5js is a javascript library, it actually runs inside a web-page,
and it needs some different kinds of files to run properly.  

Let's take a quick look at what the different parts of the project are and
how they fit together. If you have some previous experience with web-design,
you should recognize some of these. If not, don't worry. Most of the time,
you won't need to worry too much about how this works.

[Diagram of different files in p5js project

* **index.html** This file is the base file of the webpage that your
  browser loads when you visit a website. It has the extension `.html`.
  HTML is the markup language that defines the content of the
  webpage. This page also has links to other files
  the webpage needs, such as CSS files that define the visual style of the page
  and JavaScript files that define interactive parts of the page. Look
  through the index.html file now and find the links to the following
  files:
  * **p5js libraries** Near the top of the index.html page, you will see three lines
    something like `<script src="https://cdn.cloudflare.com/p5js/p5dom.js"\>`.
    These are links to the three main parts of the p5dom library, which are
    the p5js main library, p5dom library, and p5sound library. If you don't
    need one of these, you can remove the link, but it doesn't hurt to leave
    it in there. If you want to add extra parts of the library, you add a line
    to the part that you want to reference.
  * **sketch.js** This is the JavaScript file where you will write the
    main part of your p5js sketch. If you look in the index.html file, you
    will see a reference to `sketch.js`. Once your sketches become
    more complex, you will probably want to organize parts of your code into
    separate javascript files. You will link to these files in a similar way.

* **style definitions** In the default p5js web editor project, the `index.html`
  file contains a section that starts with `<style>`. This defines how the
  page looks. The code inside the `<style>` tags is CSS. This is a
  simple language for defining how content should appear in a webpage.
  * Find the part of the CSS where it says `background: #222222;` and change it to
    `background: #FF0000;`. Reload the page and the background should change
    from grey to red. You can change a range of aspects of the way the page is
    displayed in this way.
  * If the styles used in your page become more complex, it can also be
    useful to organize them into a separate file. In this case, you would
    create a file called `stylesheet.css` and create a link to this from `index.html`
    in the same way you would with a JavaScript file.

### Other parts of the project you will see

* **data folder** It's often necessary to store other resources that
  your sketch will use, such as images and data files. A convenient place
  to put these is in a folder called `data`.

## Dynamic Typing

<p class="info">
  <strong>Info:</strong> You may have come across other programming languages
  where variables must always have a declared type. This is not
  the case in JavaScript. In JavaScript, types are determined dynamically.
  Any variable can hold any type and the type of variable can change at run-time.
</p>

## Color variables

* [Color Variables](https://p5js.org/examples/color-color-variables.html)

## If statement activity

<div class="task">
  <p>
    <strong>Activity</strong> Try changing the condition of the <code>if</code>
    statement above to something else and see how it affects the drawing. Some
    examples:
  </p>
  <ul>
    <li><code>if (mouseX > mouseY)</code></li>
    <li><code>if (random(10) > 5)</code></li>
    <li><code>if (!mouseIsPressed)</code></li>
  </ul>
</div>