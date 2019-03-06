---
title: "Tutorial 4: Working with Images"
tut_num: 4
layout: tutorial
---

<p class="lead">
  In this week's tutorial we'll look at using image files in p5js. We'll look at
  how we can access the color of each pixel, how to slice up a bitmap to create
  new images. We'll use this to create animated "sprites" with image
  sequences. The outcomes of the in class activity will form part of the
  assignment 1 submission.
</p>

## Loading and displaying images

The following examples show the basics of loading and displaying images.

<ul class="code-list">

{% include example_card.html name="Load an image" thumb="images/load_display_image-screenshot.png" link="https://p5js.org/examples/image-load-and-display-image.html" caption="Loads and displays an image." %}

{% include example_card.html name="Background image" thumb="images/background_image-screenshot.png" link="https://p5js.org/examples/image-background-image.html" caption="Shows the quickest way to load and display a background image." %}

{% include example_card.html name="Transparency" thumb="images/transparency-screenshot.png" link="https://p5js.org/examples/image-transparency.html" caption="Shows how to work with transparency with images." %}

{% include example_card.html name="Alphamask" thumb="images/alphamask-screenshot.png" link="https://p5js.org/examples/image-alpha-mask.html" caption="Shows how to create and use an alphamask." %}

{% include example_card.html name="Create image" thumb="images/create_image-screenshot.png" link="https://p5js.org/examples/image-create-image.html" caption="Shows how to create an image from scratch, that you can draw into. This one creates a gradient." %}

{% include example_card.html name="Pointillism" thumb="images/pointillism-screenshot.png" link="https://p5js.org/examples/image-pointillism.html" caption="A pleasing effect from randomly drawing ellipses over an image." %}

</ul>

<!-- TODO: The following examples need porting from Processing to p5.js

## Animation with bitmap examples

The following examples show how to create animations with a series of
bitmap images stored in an array.

<ul class="code-list">

{  include captioned_card.html name="Sequential" example_dir="online-examples" link="https://processing.org/examples/sequential.html" caption="An animation tiled across the canvas."  }

{  include captioned_card.html title="Animated Sprite" name="AnimatedSprite" example_dir="online-examples" link="https://processing.org/examples/animatedsprite.html" caption="A simple animation follows the mouse position."  }

</ul>

-->

<!-- TODO: The following examples need porting from Processing to p5.js 

## Image processing examples

The following examples all show how to work with the pixel data in an image.
The more advanced examples show how you can do this to map pixel values to
inputs such as 3D position.

<ul class="code-list">

{  include captioned_card.html title="Pixel Array" name="PixelArray" example_dir="online-examples" link="https://processing.org/examples/pixelarray.html" caption="Samples the color of every pixel in an image. Click and drag mouse to control sample point."  }

{  include captioned_card.html name="Brightness" example_dir="online-examples" link="https://processing.org/examples/brightness.html" caption="Adjust brightness of pixels in the image according to how close to the mouse they are."  }

{  include captioned_card.html name="Blur" example_dir="online-examples" link="https://processing.org/examples/blur.html" caption="Uses a low pass filter to blur an image."  }

{  include captioned_card.html title="Edge Detection (Advanced)" name="EdgeDetection" example_dir="online-examples" link="https://processing.org/examples/edgedetection.html"	caption="Uses a high-pass filter to sharpen an image."  }

-->

<!-- TODO: The following examples are still on the processing site, but I can't find where they're linked...

{  include captioned_card.html title="Zoom (Advanced 3D)" name="Zoom" example_dir="online-examples" link="https://processing.org/examples/zoom.html" caption="Displays a 3D image, where the heights of lines depend on colors from an image."  }

{  include captioned_card.html title="Explode (Advanced)" name="Explode" example_dir="online-examples" link="https://processing.org/examples/explode.html" caption="Mouse controls zoom level. Zoom amount depends on color of pixels in image."  }

</ul>

-->

<!-- TODO: SVG is not implemented in p5.js. See discussion on this issue thread: https://github.com/processing/p5.js/issues/458

## Working with SVG images

As well as letting you work with bitmap images (as in the examples above),
Processing also lets you load and work with SVG images. SVG images are a vector
graphic format. This means that they don't get pixelated when you zoom in on
them. You can also manipulate the colors at run time. You can use a program
like Illustrator or Inkscape to produce SVG images.

<ul class="code-list">

{  include captioned_card.html title="Load and Display SVG" name="LoadDisplaySVG" example_dir="online-examples" link="https://processing.org/examples/loaddisplaysvg.html" caption="Loads and displays an SVG image."  }

{  include captioned_card.html title="Disable Style" name="DisableStyle" example_dir="online-examples" link="https://processing.org/examples/disablestyle.html" caption="Shows how to disable the styles in an svg and restyle it."  }

{  include captioned_card.html title="Scale Shape" name="ScaleShape" example_dir="online-examples" link="https://processing.org/examples/scaleshape.html" caption="Shows how to change the scale of an SVG image."  }

{  include captioned_card.html title="Get Child" name="GetChild" example_dir="online-examples" link="https://processing.org/examples/getchild.html" caption="Shows how to get a child part of an SVG image and style it differently."  }

</ul>

-->

## Tutor examples

Below are some further examples that your tutors may go through with you.
You can also explore how these work yourself.

## Image chopping and shuffling

<ul class="code-list">

{% include example_card.html name="Butterfly" thumb="images/butterfly-screenshot.png" link="https://editor.p5js.org/awarua/sketches/ryagE2_xN" caption="An example of cutting up and recombining an image for a magnification effect." %}

{% include example_card.html name="Butterfly random" thumb="images/butterfly_random-screenshot.png" link="https://editor.p5js.org/awarua/sketches/r1t7Shdg4" caption="Another example of cutting up and recombining an image. This one creates a semi-regular grid." %}

<!-- {% include example_card.html name="Butterfly sort" thumb="images/butterfly_sort-screenshot.png" link="https://editor.p5js.org/awarua/sketches/AQUEnxA1u" caption="This example uses the same source image as the butterfly examples above, but it reorders all the pixels in the image according to brightness." %} -->

</ul>

## Animation examples

<ul class="code-list">

{% include example_card.html name="Face looking animation" thumb="images/face_looking_animation-screenshot.png" link="https://editor.p5js.org/awarua/sketches/rJu_vnugE" caption="An animation of a face looking around." %}

{% include example_card.html name="Face looking mouse" thumb="images/face_looking_mouse-screenshot.png" link="https://editor.p5js.org/awarua/sketches/ryXLu3dxE" caption="A variation on the face looking example, where the face follows the mouse." %}

</ul>

<!-- TODO: Rework pointilism variations into a more structured tutorial that guides students on how to adapt

## Pointillism variations

<ul class="code-list">

{  include captioned_card.html name="p1_mouse" example_dir="tutor-examples" caption="A student work exploring the pointillism example. This one follows the mouse."  }

{  include captioned_card.html name="p2_large_to_small" example_dir="tutor-examples" caption="Another student work exploring the pointillism example. This one goes from large to small."  }

{  include captioned_card.html name="p3_random_directions" example_dir="tutor-examples" caption="A third example by the same student exploring the pointillism example. This one draws in random directions."  }

{  include captioned_card.html name="p4_multiple_painters" example_dir="tutor-examples" caption="A final example of a student's explorations of the pointillism example. This one draws in random directions with multiple 'brushes'"  }

</ul>

-->

## Advanced example

<ul class="code-list">

<!-- TODO: Rework old examples from Gavin Sade.

{  include captioned_card.html name="exquisiteCorpse" example_dir="tutor-examples" caption="Draws a random head, body, and tail. Change with 'a', 's', 'd' keys."  }

{  include captioned_card.html name="faceSlam" example_dir="tutor-examples" link_to_web_version=true caption="Let's mash up the faces of Brad and Angelina"  }

{  include captioned_card.html  name="painterly" example_dir="tutor-examples" caption="Another Brad / Ange mashup."  }

-->

{% include example_card.html name="Click divide" thumb="images/click_divide-screenshot.png" link="https://editor.p5js.org/awarua/sketches/BJps92OlE" caption="A more advanced example, which uses objects (we cover these later in the semester). Click and move the mouse to reveal a face." %}

</ul>

<!-- TODO: Neither of the following tutorials are 'ported' to p5.js yet.

## Further tutorials

The following online tutorials go into more depth on how to work with pixel 
data and also how to use two dimensional arrays.

<ul class="code-list">

  <li>
    <a class="title-link" target="_blank" href="https://processing.org/tutorials/pixels/">
      Pixels Tutorial
    </a>
    <a class="img-link" target="_blank" href="https://processing.org/tutorials/pixels/">
      <img src="{{site.baseurl}}{{page.url}}images/pixel_tutorial_tint1.jpg">
    </a>
    A detailed tutorial on how to work with pixels in images.
  </li>

  <li>
    <a class="title-link" target="_blank" href="https://processing.org/tutorials/2darray/">
      2D Array Tutorial
    </a>
    <a class="img-link" target="_blank" href="https://processing.org/tutorials/2darray/">
      <img src="{{site.baseurl}}{{page.url}}images/2darray_tutorial_cells.jpg">
    </a>
    A detailed tutorial on how to work with two dimensional arrays.
  </li>

</ul>

-->