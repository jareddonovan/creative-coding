---
title: "Tutorial 7: A2 Kick-off"
tut_num: 7
layout: tutorial
---

<p class="lead">
  In this week's tutorial, we will kick off Assignment 2.
  Your tutor will go through the assignment brief with you to make sure you
  understand it. You will start by brainstorming ideas for the assignment and
  sketching these on paper.  Your tutor will discuss with you how you could go
  about implementing the concepts and highlight the programming concepts that
  you will need to apply. This tutorial will also introduce the translation
  functions, and show you how to work with shapes and curves. This will allow
  you to create more complex visual output from your sketches.
</p>

## Tutorial Overview

1. A2 briefing
2. A2 concept brainstorming and planning
3. Demonstration – translation functions
4. Activity – using translation functions
5. Demonstration - shapes and curves
6. Activity - applying shape and curve functions
7. Wrap up

## A2 Briefing

Your tutor will go through the task for Assignment 2 with the class and
answer any questions you have. Make sure you understand all the different parts
of the assignment, including the documentation.

Review the task sheet for Assignment 2:
* [Task Sheet]({{site.baseurl}}/assessment/a2-major-interactive-work/task-sheet-dxb303-a2.pdf)

## A2 Concept Brainstorming and Planning

![Picasso portrait (public domain)]({{site.baseurl}}{{page.url}}images/picasso.jpg)

Don't wait for inspiration. It's like Pablo Picasso said: *"Inspiration
exists, but it has to find you working".*

<p class="task">
  <strong>Task:</strong> (10 mins)
  You should brainstorm 5 ideas for responding to the briefs from
  assignment 2. Make a pen and paper sketch of the basic concepts to help you
  think through them, and also so your tutor has something to discuss with you.
  You can also scan these early sketches and include them as your part of your
  documentation of process. If you already have an idea, brainstorm 5 variations
  on it.
</p>

When you have come up with some concepts, discuss them with your neighbor.
Your tutor will take a round of the class and list the ideas on the whiteboard.
Then they will discuss with you how you might approach implementing the ideas
in Processing.

### Planning

To help with your process of planning out your program, you may find the
following 'Anatomy of a Program' tutorial useful. It gives a good overview of
the process of planning and designing a program and then moving into
implementation. Thinking about how you actually approach programming as a
problem solving process is an important skill to learn in DXB303.

<ul class="code-list">

  <li>
    <a class="title-link" target="_blank"
      href="https://processing.org/tutorials/anatomy/"
      >Tutorial: Anatomy of a Program</a>
    <a class="img-link" target="_blank"
      href="https://processing.org/tutorials/anatomy/"
      ><img alt="Anatomy of a Program Tutorial"
        src="{{site.baseurl}}{{page.url}}images/anatomy-tutorial.jpg">
    </a>
    A detailed tutorial by J David Eisenberg on how do you analyze a problem and
    break it down into steps that the computer can do.
  </li>

</ul>

## Moving the Drawing Coordinates

It is often necessary to be able to control how Processing's coordinate system
works. We will use the transformation functions for this:
* [`translate()`][2] moves the `(0, 0)` point to the left, right, up or down.
* [`rotate()`][3] rotates the x and y drawing axes
* [`scale()`][4] changes the scale of the drawing axes

These functions can make drawing **much** easier, but there are a couple of
concepts you need to understand first!

<div class="card-row">
  <div class="card">
    <img class="card-image" alt="transformation functions illustration 1"
      src="{{site.baseurl}}{{page.url}}images/fullsize/transform/transform-11.png" />
    <p class="card-caption">
      When you set up a canvas in Processing the default (0,0) position is in
      the top left corner. This defines the coordinate system that Processing
      uses to draw shapes. The rectangle is drawn 40 from the left and 80
      from the top.
    </p>
  </div>

  <div class="card">
    <img class="card-image" alt="transformation functions illustration 2"
      src="{{site.baseurl}}{{page.url}}images/fullsize/transform/transform-12.png">
    <p class="card-caption">
      You can change the coordinate system with the transformation functions.
      Here, we have moved it left and down using the <code>translate()</code>
      function. Any shapes that get drawn will now be relative to this new (0, 0) point. The rectangle is drawn further left and further down.
    </p>
  </div>
</div>

<div class="card-row">
  <div class="card">
    <img class="card-image" alt="transformation functions illustration 3"
      src="{{site.baseurl}}{{page.url}}images/fullsize/transform/transform-13.png">
    <p class="card-caption">
      You can also rotate the coordinate system. Here we rotate by 30 degrees.
      We need to convert from degrees to radians for the <code>rotate()</code>
      function. Now any drawing we do will also be rotated. The rectangle is
      rotated clockwise by 30 degrees.
    </p>
  </div>

  <div class="card">
    <img class="card-image" alt="transformation functions illustration 4"
      src="{{site.baseurl}}{{page.url}}images/fullsize/transform/transform-15.png">
    <p class="card-caption">
      The order that you apply the transformation functions matters. If you
      first <code>rotate()</code> by 30 degrees and <em>then</em>
      <code>translate()</code>, the coordinate system will be
      different. The rectangle is still rotated, but it ends up closer to the
      bottom of the canvas.
    </p>
  </div>
</div>

<div class="card-row">
  <div class="card">
    <img class="card-image" alt="transformation functions illustration 5"
      src="{{site.baseurl}}{{page.url}}images/fullsize/transform/transform-16.png">
    <p class="card-caption">
      You can also change the scale of the coordinate system with the
      <code>scale()</code> function. Here, the rectangle is drawn twice as large
      as before.
    </p>
  </div>

  <div class="card">
    <img class="card-image" alt="transformation functions illustration 6"
      src="{{site.baseurl}}{{page.url}}images/fullsize/transform/transform-17.png">
    <p class="card-caption">
      Scaling does not need to be uniform. Here, the horizontal scale is doubled
      and the vertical scale is halved. The rectangle is stretched out
      in the x direction and squashed up in the y direction.
    </p>
  </div>
</div>

We can use this technique to produce more interesting drawings. Imagine that we
wanted to draw a windmill that looks something like the following picture. It
would be possible to draw this picture entirely using the [`quad()`][9]
function, but it's much easier to think of drawing the sails with rectangles
that are rotated around the center point.

![Windmill output]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/fullsize/windmill_transform-screenshot.png)

{% highlight javascript linenos %}
color brown = color(170, 105, 0);

size(300, 300);
background(29, 169, 242);

// Draw the background of the windmill.
fill(brown);
quad(130, 130, 170, 130, 220, 300, 80, 300);

// Translate to the center of the screen and draw the sails
translate(width / 2, height / 2);

// Draw the three sails rotated around the center.
for (int i = 0; i < 3; i++){
  // Rotate before drawing
  rotate(radians(120));
  fill(brown);
  rect(0, 0, 10, 120);
  fill(255);
  rect(10, 40, 40, 80);
}
{% endhighlight %}

### Saving and restoring transformations

Often, when you use the transformation functions, you will find that it is
useful to be able to save the state of the coordinate system so you can reset to
it later. In Processing, we use the [`pushMatrix()`][5] and [`popMatrix()`][6]
functions for this. The [`pushMatrix()`][5] function saves the current state of
the transformations and the [`popMatrix()`][6] function resets to the last saved
state.

The following code listing shows how these functions can be useful.

{% highlight javascript linenos %}
size(150, 150);

// Draw body and head of stick figure
translate(100, 50);
line(0, 25, 0, 60);
ellipse(0, 15, 20, 20);

// Draw Arms
// Save and reset the drawing coordinates after drawing arms.
// Try commenting out the pushMatrix() and popMatrix()
// to see the effect on the drawing.
pushMatrix();
translate(0, 30);
rotate(radians(60));
line(0, 0, 30, 0);
rotate(radians(60));
line(0, 0, 30, 0);
popMatrix();

// Draw Legs
translate(0, 60);
rotate(radians(70));
line(0, 0, 40, 0);
rotate(radians(40));
line(0, 0, 40, 0);
{% endhighlight %}

Below is a picture of the output that the code above will produce. Can you
undestand what the calls to [`pushMatrix()`][5] and [`popMatrix()`][6] do? Try
commenting out lines 12 and 18 above to see the effect on the output. (**Hint:**
remember that the transformation functions are cumulative, i.e. they add on to
each other).

![Stick Figure output]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/fullsize/stick_figure-screenshot.png)

<div class="task">
  <p>
    <strong>Task:</strong>
    Try and apply the transformation functions to produce the image of a flower below.
  </p>
  <img alt="flower"
       src="{{site.baseurl}}{{page.url}}images/flower-01.png">
</div>

### Tutor Examples

These tutor examples further demonstrate the use of the transformation
functions.

<ul class="code-list">

  {% include example_card.html name="spider_transform" thumb="" link="" caption="Draws a spider using the <code>translate()</code> and <code>rotate()</code> functions." %}

  {% include example_card.html name="house_translate" thumb="" link="" caption="Draws a three houses using the <code>translate()</code>, <code>rotate()</code>, and <code>scale()</code> functions. Also demonstrates <code>pushMatrix()</code> and <code>popMatrix()</code>." %}

  {% include example_card.html name="horse_transform" thumb="" link="" caption="Draws a horse using the <code>translate()</code> and <code>rotate()</code> functions." %}

  {% include example_card.html name="draw_starfish" thumb="" link="" caption="Draws a starfish using the <code>translate()</code> and <code>rotate()</code> functions" %}

</ul>

### Further tutorials

For a refresher on how the Processing coordinate system works with shapes, and
for a more in-depth tutorial on how 2D transformations work, check the online
tutorials below.

<ul class="code-list">

  <li>
    <a class="title-link" target="_blank"
       href="https://processing.org/tutorials/drawing/"
      >Tutorial: Coordinate System and Shapes</a>
    <a class="img-link" target="_blank"
      href="https://processing.org/tutorials/drawing/"
      ><img alt="Coordinate System and Shapes Tutorial"
            src="{{site.baseurl}}{{page.url}}images/drawing-tutorial.jpg">
    </a>
    An introductory tutorial on the Processing coordinate system and drawing.
    Check this out if you need a refresher. By Daniel Shiffman.
  </li>

  <li>
    <a class="title-link" target="_blank"
       href="https://processing.org/tutorials/transform2d/"
      >Tutorial: 2D Transformations</a>
    <a class="img-link" target="_blank"
      href="https://processing.org/tutorials/transform2d/"
      ><img alt="2D Transformations Tutorial"
            src="{{site.baseurl}}{{page.url}}images/transformation-tutorial.png">
    </a>
    A detailed tutorial by J David Eisenberg on how the 2D transformations work
    in Processing.
  </li>

</ul>


## PShapes and Curves

So far in DXB303, we have used the simple in-built functions, such as
[`ellipse()`][7] for drawing shapes to the canvas. As you have seen, you can
still achieve a lot with these functions, but eventually you will find that you
need to draw something more complex than you can make with these. In this
section, we will introduce two more powerful drawing techniques available to you
in Processing: [`PShapes`][10] and curves.

### PShape

A [`PShape`][10] is an object that for storing information about geometric
shapes. We have actualy already seen [`PShape`][10] in
{% include unit_link.html name="tut04" link_text="Tutorial 4," anchor="#working-with-svg-images" %}
where we used it to load and display SVG vector images.

In addition to loading a [`PShape`][10] from an external file, there are also
a number of ways we can create one from scratch. One way is to use the
[`createShape()`][11] function and give the name of a shape that we would like
to create, along with some arugments for the size and position of the shape. We
then use the [`shape()`][14] function to draw the shape to the screen. Below
is some example code and output that creates a simple rectangle shape.

{% highlight javascript linenos %}
// Declare a PShape variable, called rectangle to hold shape data.
PShape rectangle;

size(150, 150);
background(100, 0, 50);

// Initialise rectangle using the createShape() function.
// RECT will create a rectangle shape. The remaining arguments
// define the position and width / height, just like the regular
// rect() function.
rectangle = createShape(RECT, 20, 20, 60, 40);

// We can also set the fill and stroke. Note the function names
// are slightly different from the ones we normally use and are
// called on rectangle itself.
rectangle.setFill(color(200, 200, 0));
rectangle.setStroke(color(0, 200, 200));
rectangle.setStrokeWeight(10);

// Draw the shape to the canvas.
shape(rectangle);
{% endhighlight %}

![PShape RECT example]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/fullsize/pshape_rect-screenshot.png)

In addition to creating rectangles with `RECT`, you can also create any of the
other primitive shapes that we have seen in processing so far (`POINT`, `LINE`,
`ELLIPSE`, `TRIANGLE`, `QUAD`, `ARC`). The following
code listing and example shows how this works.

{% highlight javascript linenos %}
// If you give the name of a primitive shape (e.g. POINT, LINE, RECT, ELLIPSE,
// TRIANGLE, or QUAD) as the first argument, the createShape() function will
// make that shape. The rest of the arguments will depend on the shape you
// specify. They will match the normal Processing shape functions.
createShape(POINT, x, y);
createShape(LINE, x1, y1, x2, y2);
createShape(RECT, x, y, w, h);
createShape(ELLIPSE, x, y, w, h);
createShape(TRIANGLE, x1, y1, x2, y2, z1, z2);
createShape(QUAD, x1, y1, x2, y2, x3, y3, x4, y4);
createShape(ARC, x, y, w, h, startAngle, endAngle);
{% endhighlight %}

<ul class="code-list">

  {% include example_card.html name="pshape_primitives" thumb="" link="" caption="Draws a face using the <code>createShape()</code> function to draw a series of primitive shapes." %}

</ul>

Of course, we could just use the functions we already have to draw these shapes.
So why go to the trouble of creating a [`PShape`][10] object? One advantage is
that this allows you to store all the visual properties associated with a shape
together with the shape and access all that information through a single
variable. As your sketches increase in complexity, this can make it easier to
organise and manage the code that handles your drawing.

Another situation where the [`PShape`][10] object comes in very handy is when
you want to create custom shapes.

### Drawing a custom shape

The primitive drawing functions provided by Processing ([`ellipse()`][7],
[`rect()`][8], etc.) may not be able to draw everything that you want. Imagine
you wanted to draw a pine tree. Rather than trying to cobble something together
from the built in functions, a better way to draw something like this is by
creating a custom shape. We do this by defining the points that make up the
shape's outline. It's a bit like a 'connect-the-dots' drawing.

![Connect the dots drawing of a tree]({{site.baseurl}}{{page.url}}images/tree-connect-dots-01.png)

To do this in Processing, we start the shape with the [`beginShape()`][15]
function, and then use the [`vertex()`][17] function to place each corner of the
outline at an `x, y` position. Finally, we use the [`endShape()`][16] function to
end the shape. We can pass an argument to this function depending on whether
we want to `CLOSE` the shape or leave it `OPEN`. In the illustration above, if
we said that the drawing should be left `OPEN`, the final line segment from
point 19 back to point 1 would not be drawn.

{% highlight javascript linenos %}
// Set size and colours.
size(600, 400);
background(29, 169, 242);
noStroke();
fill(4, 124, 81);

// Draw a pine tree shape using the vertex() function.
beginShape();
vertex(300, 70);
vertex(260, 150);
vertex(280, 150);
vertex(220, 230);
vertex(260, 230);
vertex(190, 310);
vertex(280, 310);
vertex(280, 350);
vertex(320, 350);
vertex(320, 310);
vertex(410, 310);
vertex(340, 230);
vertex(380, 230);
vertex(320, 150);
vertex(340, 150);
endShape(CLOSE);
{% endhighlight %}

![Pine Tree output]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/fullsize/pine_tree-screenshot.png)

Although this lets us draw the shape we want, it's still rather tedious to type
out each time! A better way is to store all the information for drawing the
shape in a special variable so we can reuse it. We can use a [`PShape`][10]
object for this. When we want to draw the shape to the screen, we use the
[`shape()`][14] function with our shape object as an argument.

{% highlight javascript linenos %}
// Declare a PShape variable to hold tree shape information
PShape tree;

//
// Setup left out...
//

// We create the tree shape and then ask it to beginShape(), add vertices and
// end shape.
tree = createShape();
tree.beginShape();
tree.vertex(300, 70);
//
// Vertex definitions left out...
//
tree.endShape(CLOSE);

// Use the shape() to draw the shape to the screen as many times as we like.
shape(tree);
shape(tree);
shape(tree);
{% endhighlight %}

One thing to note is that because the [`PShape`][10] records the position of the
shape exactly as we define it, it will always be placed at the same position on
the screen when we draw it. Not very useful if we want to draw a forest of
trees!

To get around this, we can define the shape relative to the `(0, 0)` position
and then use the [`translate()`][2] and [`rotate()`][3] functions to change
where it gets drawn. The following simplified code listing and downloadable
example demonstrates this.

{% highlight javascript linenos %}
// Variable declarations and setup omitted...

tree = createShape();
tree.beginShape();
// Vertices of tree are defined relative to (0, 0) point
tree.vertex(0, -140);
tree.vertex(-40, -60);
tree.vertex(-20, -60);
tree.vertex(-80, 10);
tree.vertex(-40, 10);
tree.vertex(-110, 100);
tree.vertex(-20, 100);
tree.vertex(-20, 140);
tree.vertex(20, 140);
tree.vertex(20, 100);
tree.vertex(110, 100);
tree.vertex(40, 10);
tree.vertex(80, 10);
tree.vertex(20, -60);
tree.vertex(40, -60);
tree.endShape(CLOSE);

// Translate to the position we want the shape to be drawn at.
translate(mouseX, mouseY);

// Use the shape() function to draw the shape to the screen.
shape(tree);
{% endhighlight %}

<ul class="code-list">

  {% include example_card.html name="pine_tree_pshape" thumb="" link="" caption="Stores shape information for drawing a pine tree. The user can click to 'stamp' this shape onto the canvas." %}

</ul>

### Adding textures to shapes

Another thing we can do with shapes is map an image onto them as a texture. This
is done by calling the [`texture()`][21] function. To do this, you provide a
[`PImage`][23] variable that you want to use as a texture and then specify the
coordinates that each vertex should be mapped to in the texture. You can also
use the [`tint()`][22] function with the shape, which allows you to make shapes
transparent or different colours. The following code listing and  downloadable
examples demonstrate this.

{% highlight javascript linenos %}
// Demonstrates how to apply a texture to an image
// cobblestones.jpg by Flickr user Patrick Marioné
//    CC BY NC SA
//    https://www.flickr.com/photos/p_marione/

size(600, 400, P2D);
background(166,187,192);
PImage cobblestones = loadImage("data/cobblestones.jpg");

beginShape();
// The texture() function should be called between beginShape() and
// endShape. It takes a PImage variable as an argument.
texture(cobblestones);

// When you add a texture to a shape, you need to add two extra
// arguments to each vertex(). These are the locations in the source
// texture that the vertex should be mapped to. Here we simply map
// the four corners of the texture to the four corners of the shape.
vertex(10, 10, 0, 0);
vertex(100, 300, 0, cobblestones.height);
vertex(350, 390, cobblestones.width, cobblestones.height);
vertex(590, 100, cobblestones.width, 0);
endShape(CLOSE);
{% endhighlight %}

![PShape Texture output]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/fullsize/pshape_texture-screenshot.png)

### Tutor examples

<ul class="code-list">

  {% include example_card.html name="cobblestones_texture" thumb="" link="" caption="Draws a textured shape. Drag the mouse to change the shape and create an interesting image." %}

  {% include example_card.html name="pine_tree_pshape_texture" thumb="" link="" caption="A version of the pine tree 'stamp' sketch that loads a texture into the pine tree shape. Also demonstrates use of the <code>tint()</code> function with the texture." %}
</ul>

### Drawing curves

What if we wanted to draw a shape with a curved outline rather than one made up
of straight line segments? We need a way to specify points on the outline of a
curve. In Processing, we can define an outline made up of [`curveVertex()`][18]
or [`bezeirVertex()`][19] points and these will create a curved outline. These
work in a similar way to the [`vertex()`][17] function demonstrated above. You
use them as part of defining a shape with [`beginShape()`][15] and
[`endShape()`][16].

The [`curveVertex()`][18] function will create a series of spline points

{% highlight javascript linenos %}
size(600, 400);

// Choose some interesting colours. Because fun.
background(100, 255, 125);
fill(255, 100, 212);
stroke(110, 100, 255);
strokeWeight(4);

// Draw some curveVertex points from left to right across screen.
// NOTE that the first and last points are repeated as control points.
beginShape();
curveVertex( 40,200);
curveVertex( 40,200);
curveVertex( 86, 52);
curveVertex(200,379);
curveVertex(236,143);
curveVertex(267,256);
curveVertex(365, 48);
curveVertex(496,310);
curveVertex(560,200);
curveVertex(560,200);
endShape(OPEN);
{% endhighlight %}

![wave_curve sketch output]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/fullsize/wave_curve-screenshot.png)

### Tutor examples

The first tutor example further demonstrates how to use the
[`beginShape()`][15], [`vertex()`][17] and [`endShape()`][16] functions with a
[`PShape`][10] object. The second one is a program you can use to generate code
for drawing curves.

<ul class="code-list">

  {% include example_card.html name="draw_vertex" thumb="" link="" caption="Draws a polygon or star as a shape. Uses a <code>PVector</code> object to simplify figuring out positions of vectors." %}

  {% include example_card.html name="curve_explorer" thumb="" link="" caption="A program that lets you draw a curve in Processing and then export the code it would take to draw that curve." %}

</ul>

### Further Tutorials

For a more in-depth tutorial on using [`PShape`][10], including drawing with curves,
check the online tutorials below. The second tutorial also explains bezier
curves, which we have not covered in the tutorial.

<ul class="code-list">
  <li>
    <a class="title-link" target="_blank"
       href="https://processing.org/tutorials/pshape/"
      >Tutorial: PShape</a>
    <a class="img-link" target="_blank"
      href="https://processing.org/tutorials/pshape/"
      ><img alt="PShape Tutorial"
            src="{{site.baseurl}}{{page.url}}images/pshape-tutorial.png">
    </a>
    A tutorial on using Processing's PShape object. By Daniel Shiffman.
  </li>

  <li>
    <a class="title-link" target="_blank"
       href="https://processing.org/tutorials/curves/"
      >Tutorial: Curves</a>
    <a class="img-link" target="_blank"
      href="https://processing.org/tutorials/curves/"
      ><img alt="Curves Tutorial"
            src="{{site.baseurl}}{{page.url}}images/smooth_bezier.png">
    </a>
    A tutorial introducing the tree types of curves that you can draw wtih
    Processing. By J David Eisenberg.
  </li>

</ul>

## Reference Links

1. [Processing Reference][1]
2. [`translate()`][2]
3. [`rotate()`][3]
4. [`scale()`][4]
5. [`pushMatrix()`][5]
6. [`popMatrix()`][6]
7. [`ellipse()`][7]
8. [`rect()`][8]
9. [`quad()`][9]
10. [`PShape`][10]
11. [`createShape()`][11]
12. [`setFill()`][12]
13. [`setStroke()`][13]
14. [`shape()`][14]
15. [`beginShape()`][15]
16. [`endShape()`][16]
17. [`vertex()`][17]
18. [`curveVertex()`][18]
19. [`bezierVertex()`][19]
20. [`PVector`][20]
21. [`texture()`][21]
22. [`tint()`][22]
23. [`PImage`][23]

[1]: https://processing.org/reference
[2]: https://processing.org/reference/translate_.html
[3]: https://processing.org/reference/rotate_.html
[4]: https://processing.org/reference/scale_.html
[5]: https://processing.org/reference/pushMatrix_.html
[6]: https://processing.org/reference/popMatrix_.html
[7]: https://processing.org/reference/ellipse_.html
[8]: https://processing.org/reference/rect_.html
[9]: https://processing.org/reference/quad_.html
[10]: https://processing.org/reference/PShape.html
[11]: https://processing.org/reference/createShape_.html
[12]: https://processing.org/reference/PShape_setFill_.html
[13]: https://processing.org/reference/PShape_setStroke_.html
[14]: https://processing.org/reference/shape_.html
[15]: https://processing.org/reference/PShape_beginShape_.html
[16]: https://processing.org/reference/PShape_endShape_.html
[17]: https://processing.org/reference/vertex_.html
[18]: https://processing.org/reference/curveVertex_.html
[19]: https://processing.org/reference/bezierVertex_.html
[20]: https://processing.org/reference/PVector.html
[21]: https://processing.org/reference/texture_.html
[22]: https://processing.org/reference/tint_.html
[23]: https://processing.org/reference/PImage.html