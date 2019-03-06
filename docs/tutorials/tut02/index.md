---
title: "Tutorial 2: Active Drawing"
tut_num: 2
layout: tutorial
---

<p class="lead">
  This is the first week of in-person tutorials. Please make sure sign up to a
  tutorial class and that you attend the first tutorial. In this
  weeks' tutorial we'll make our first sketch in P5js. You'll learn
  how to draw images using code, and introduce foundational programming
  concepts of variables, functions and decision making. The sketch will use
  basic shapes, lines and color combined with Mouse Input to create a drawing
  program. The outcomes of the in class activity will form part of the
  assignment 1 submission.
</p>

## Drawing simple shapes with P5js

P5js is a JavaScript library that makes it easy to create interactive and visual
creative coding outputs that run in a web-browser. P5js provides a collection of
useful functions for loading data, creating sound, responding to user input,
interacting with the HTML documents, and drawing graphics. It also provides a
way of organizing your code that makes it easy to get started with coding in
the browser.

In this tutorial, we will start by looking at the 'anatomy' of a P5js program
(which we will refer to as a 'sketch') and explore some of the functions that
you can use to draw graphics.

Open up a new sketch on the [P5js web editor](https://editor.p5js.org/), and
enter the following code:

{% highlight javascript linenos %}
function setup(){
  createCanvas(400, 400);
}

function draw(){
  background(220);
  circle(200, 200, 300);
}
{% endhighlight %}

As we discussed in the introduction to P5js, the [`setup()`][setup()] function gets run
once when the sketch first runs and the [`draw()`][draw()] function loops repeatedly until
the sketch ends. In this sketch, we are drawing a circle to the middle of the
canvas each time the draw function is called.

Notice how after the word [`circle`][circle()] on line 7, there are some numbers enclosed in
round brackets? These are the `arguments` to the circle function that determine
where it should be drawn and how big.

The circle function takes three arguments. The first one is the `x` position of the center
of the circle (200 here). The second one is the `y` position (200 here). The last one is the diameter
of the circle (300 here).

<p class="task">
  <strong>Activity:</strong> Try changing the numbers given as arguments to
  <code>circle()</code> and run the sketch again to see how it changes.
</p>

Once you have an understanding of how the [`circle()`][circle()] function works, try some
of these other drawing functions too.

* [`point(x, y)`][point()]: Draws a single point at position `x`, `y`
* [`line(x1, y1, x2, y2)`][line()]:
  Draws a line from `x1`, `y1` to `x2`, `y2`.
* [`ellipse(x, y, w, h)`][ellipse()]: Like a circle, except draws an ellipse with the given
  width: `w` and height: `h`.
* [`square(x, y, s)`][square()]: Draws a square at position `x`, `y` with size `s`
* [`rect(x, y, w, h)`][rect()]: Draws a rectangle at position `x`, `y` with
  width `w` and height `h`.
* [`triangle(x1, y1, x2, y2, x3, y3)`][triangle()]: Draws a triangle with corners at points
  (x1, y1), (x2, y2), and (x3, y3)

<ul class="code-list">

  {% include example_card.html name="Robot face" thumb="images/robot-face-thumb.png" link="https://editor.p5js.org/awarua/sketches/tp6cZUwy5" caption="A sketch that demonstrates drawing with all the shapes listed above" %}

</ul>

### Further tutorials

* [p5.js Overview](https://github.com/processing/p5.js/wiki/p5.js-overview)
* [Coordinate System and Shapes](https://p5js.org/learn/coordinate-system-and-shapes.html)

<p class="info">
  <strong>Tip:</strong> Some of the functions have extra features if you supply
  extra arguments. For instance, the <code>rect()</code> function can draw
  rounded corners. Check the reference links above for more info.
</p>

## Adding colour

Many of the functions in P5js, allow you to set a colour, such as for the
background of the canvas, the fill colour of a shape, or the stroke colour of a
line. In all these cases, colours are defined using numbers. Here, we will use
the `fill()` function to understand how colours work.

Create a new P5js sketch with the following code:

{% highlight javascript linenos %}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  fill(255, 0, 0);
  circle(100, 100, 80);

  fill(0, 255, 0);
  circle(200, 200, 80);

  fill(0, 0, 255);
  circle(308, 300, 80)
}
{% endhighlight %}

If you run this code, you should see a circle drawn in the center of the canvas.
The circle should filled in with red, not white like before. This is because of
the calls to [`fill()`][fill()] on lines 8, 11, and 14.

<ul class="code-list">

  {% include example_card.html name="RGB Circles" thumb="images/rgb-circles-thumb.png" link="https://editor.p5js.org/awarua/sketches/DuMQ5_X7Z" caption="Draws three circles in red, green and blue" %}

</ul>

Try changing the numbers given as arguments to the fill functions above and see
how it affects the colours of the three circles. Any number between **0...255**
will work. You can also use the following sketch to experiment with different
colors.

<ul class="code-list">

  {% include example_card.html name="Color Sliders" thumb="images/color-sliders-thumb.png" link="https://editor.p5js.org/awarua/full/YREGIvcHB" caption="Allows the user to adjust the fill colour using sliders." %}

</ul>

### Further tutorials and examples

* [Color](https://p5js.org/learn/color.html)
* [Hue](https://p5js.org/examples/color-hue.html)
* [Saturation](https://p5js.org/examples/color-saturation.html)
* [Brightness](https://p5js.org/examples/color-brightness.html)
<!-- * [Relativity](https://p5js.org/examples/color-relativity.html) -->

<div class="task">
  <p>
    <strong>Activity:</strong> Open up the P5js editor in your web browser
    and experiment with the shape drawing functions above to see what images
    you can produce. Here are some suggestions:
  </p>
  <ul>
    <li>A stick figure or smiley face</li>
    <li>Pick a flag and try to reproduce it</li>
  </ul>
</div>

## Responding to the mouse

So far, the examples in this tutorial have been fairly static. But we can easily
make our sketches respond to mouse input by using some of the built-in events
and variables that p5js provides. Start a new p5js sketch and add the following
code:

{% highlight javascript linenos %}
// World's simplest drawing program
function setup(){
  createCanvas(400, 400);
}

function draw(){
  if (mouseIsPressed){
    circle(mouseX, mouseY, 10);
  }
}
{% endhighlight %}

<ul class="code-list">

  {% include example_card.html name="World's simplest drawing program" thumb="images/worlds-simplest-drawing-program-thumb.png" link="https://editor.p5js.org/awarua/sketches/FmfUiz72m" caption="The world's simplest drawing program." %}

</ul>

This sketch adds some new concepts that you need to understand – **variables**,
and **if-statements**, which are explained below.

### Variables

Variables are labels for some data that you want to record in your sketch. The
data that is held in a variable can also change and update in relation to things
like user input. In this case, the `mouseX` and `mouseY` are numeric variables
that P5js provides automatically, that record the current x and y position of
the mouse. The `mouseIsPressed` variable records a true/false (boolean) value
depending on whether the button on the mouse is currently pressed or not.

There are several different types of data that you can store in variables in
JavaScript. Here are some you will encounter as you start out:

* [Boolean][Boolean]: true / false values
* [Number][Number]: Numeric values with decimal point values
* [String][String]: Textual data of arbitrary length
* [Object][Object]: A more complex variable that is a collection of properties
* [Array][Array]: An array is an ordered list of variables.

### If  statements

The code example above also demonstrates the use of an [`if`] statement, on lines
7...9. An [`if`] statement lets you make decisions in your code. The form of an
if statement is the keyword `if` followed by a true / false statement enclosed
in round brackets, followed by a block of code enclosed in curly braces.

If the statement in the round brackets is true, then the block of code contained
in the curly brackets will be executed. If it is false, then the block of code
is skipped over.

In the example above, the line `circle(mouseX, mouseY, 10);` is only ever
executed if the value stored in `mouseIsPressed` is `true`. This means that the
drawing only draws when the mouse is pressed down.

### Further drawing examples

<ul class="code-list">

{% include example_card.html name="Continuous lines" thumb="images/continuous-lines-thumb.png" link="https://p5js.org/examples/drawing-continous-lines.html" caption="Draws continuous lines." %}

{% include example_card.html name="Mouse press" thumb="images/mouse-press-thumb.png" link="https://p5js.org/examples/input-mouse-press.html" caption="Move the mouse to position the shape. Press the mouse button to invert the color." %}

{% include example_card.html name="Patterns" thumb="images/patterns-thumb.png" link="https://p5js.org/examples/drawing-patterns.html" caption="Move the cursor over the image to draw with a software tool which responds to the speed of the mouse." %}

{% include example_card.html name="Pulses" thumb="images/pulses-thumb.png" link="https://p5js.org/examples/drawing-pulses.html" caption="Software drawing instruments can follow a rhythm or abide by rules independent of drawn gestures. This is a form of collaborative drawing in which the draftsperson controls some aspects of the image and the software controls others." %}

</ul>

### Further references and examples

* [Events](https://p5js.org/reference/#group-Events)
* [Mouse 1D](https://p5js.org/examples/input-mouse-1d.html)
* [Mouse 2D](https://p5js.org/examples/input-mouse-2d.html)

<p class="task">
  <strong>Activity:</strong> Experiment with the examples above to create your
  own drawing program. See if you can achieve some interesting visual results by
  playing with the dynamics of how the program responds to the user's input.
</p>

## Advanced drawing examples

The sketches below employ some topics that we will be covering in upcoming
tutorials including looping, arrays and randomness. You are welcome to
experiment with these if you are a more advanced student, or come back to them
once you've covered some of the material in upcoming tutorials.

<ul class="code-list">

  {% include example_card.html name="Less-simple drawing program" thumb="images/less-simple-drawing-thumb.png" link="https://editor.p5js.org/awarua/sketches/n22OTl93v" caption="A less-simple drawing program" %}

  {% include example_card.html name="Rainbow lighting" thumb="images/rainbow-lightning-thumb.png" link="https://editor.p5js.org/awarua/sketches/yieRwEMe0" caption="Draws colourful jagged vibrating lines" %}

  {% include example_card.html name="Cloud buster" thumb="images/cloud-buster-thumb.png" link="https://editor.p5js.org/awarua/present/JzFy2E0vZ" caption="Draw with clouds" %}

</ul>

## Reference List

* [setup()]
* [draw()]
* [circle()]
* [point()]
* [line()]
* [ellipse()]
* [square()]
* [rect()]
* [triangle()]
* [fill()]
* [Boolean]
* [Number]
* [String]
* [Object]
* [Array]
* [Undefined]
* [Null]

[setup()]: https://p5js.org/reference/#/p5/setup
[draw()]: https://p5js.org/reference/#/p5/draw
[circle()]: https://p5js.org/reference/#/p5/circle
[point()]: https://p5js.org/reference/#/p5/point
[line()]: https://p5js.org/reference/#/p5/line
[ellipse()]: https://p5js.org/reference/#/p5/ellipse
[square()]: https://p5js.org/reference/#/p5/square
[rect()]: https://p5js.org/reference/#/p5/rect
[triangle()]: https://p5js.org/reference/#/p5/triangle
[fill()]: https://p5js.org/reference/#/p5/fill
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Array]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array
[Undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
[Null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null
[if]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals