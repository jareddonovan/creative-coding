---
title: "Tutorial 6:"
layout: tutorial
---

<p class="lead">
  In this week’s tutorial we'll work with Fonts and Text in
  Processing and use Time as an input for your sketches. This is the last
  in-class activity that'll form part of the assignment 1 submission. The
  sketch for this part of the assignment must
  involve drawing some text to the screen and it must change over time, without
  user input. You will learn some ways to do this in this tutorial.
</p>

## Text as data in p5.js

We've already seen some of the ways to use text
as data in Processing. Along with the other data types we've
covered, you should now be familiar with code such as
the following:

{% highlight java linenos %}
// Initialise a String and a char variable
char c = 'h';
String myString = "Hello World.";
{% endhighlight %}

The
[`char`][1] data type is a primitive datatype in Processing. A
[`char`][1] can store a single _character_ of text. The [`String`][2] class
lets us store whole words and sentences --- _strings_ of characters.

There're lots of uses for [`Strings`][2] and [`chars`][1] in Processing. For
instance, when you load an image, you must tell Processing the name
of the file you want to load. Or you might also use strings to print
information to the console using the [`println()`][8] function.

{% highlight java linenos %}
// Message to print
String consoleMsg = "Hello from the console!";
println(consoleMsg);
{% endhighlight %}

You can also display strings on the drawing canvas with the [`text()`][3]
function. To change the colour of the displayed text, use the [`fill()`][4]
function. The listing below shows an example, along with output.

{% highlight java linenos %}
// Message we want to display
String canvasMsg = "Hello Canvas!";

text(canvasMsg, 10, 20);

fill(0);
text(canvasMsg, 10, 40);

fill(255, 0, 0);
text(canvasMsg, 10, 60);

fill(255, 0, 0, 100);
text(canvasMsg, 10, 80);
{% endhighlight %}

![Text function example output]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/text_function-screenshot.png)

<p class="info">
  <strong>Tip:</strong> Being able to draw text to the screen like this can be
  helpful when you need to debug your sketches. Rather than scroll through output
  from the
  <a href="https://processing.org/reference/println_.html"
    ><code class="highlighter-rouge">println()</code></a>
  function, you can draw your messages on the screen. In the following example
  the current location of the mouse is drawn to the screen.
</p>

<ul class="code-list">

{% include captioned_card.html name="loctextfeedback" example_dir="tutor-examples" caption="Move text with mouse" %}

</ul>

### Changing the display of text

Apart from changing the colour of text, we can also change its size and alignment.
For this, we use the [`textSize()`][5] and [`textAlign()`][6] functions. By
default, text is left-aligned and 12px tall. The following listing and output
shows how to use these functions.

{% highlight java linenos %}
String message = "Changes";

size(150, 150);
fill(0);
stroke(255);

// Draw a line down the middle of the canvas.
line(width / 2, 0, width / 2, height);

text(message, width / 2, 35);

textAlign(CENTER);
textSize(24);
text(message, width / 2, 75);

textAlign(RIGHT);
textSize(48);
text(message, width / 2, 125);
{% endhighlight %}

![Text display functions example]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/text_display-screenshot.png)

Below are two further examples. The first one demonstrates changing the visual
properties of text. The second one is a basic demo of how to take text input
from a person and display it on the screen.

<ul class="code-list">

{% include captioned_card.html name="basic_words" example_dir="tutor-examples" caption="Create a font. Display words on the screen. Change visual properties" %}

{% include captioned_card.html name="message_buffer" example_dir="tutor-examples" link_to_web_version=true    caption="Reads keyboard input into a buffer, display text on screen" %}

</ul>

### Changing fonts

The default font used by Processing is Lucida Sans Regular.
To change to a different font, we need to do a little bit of work.
First, we need to declare a [`PFont`][7] object that will hold information about
the font we want to display. Then we need to either create the font from one of
the fonts installed on our computer or load it from file. The listing and sample
output below shows how to create a font from one installed on the computer.

{% highlight java linenos %}
// PFont variable will hold font information
PFont myFont;
String message = "Menu Cliché";

// Create a new font from one installed on the computer.
// createFont requires the name of the font and the size in pixels.
myFont = createFont("Papyrus", 24);

// We also need to tell Processing to *use* the font with textFont function.
textFont(myFont);

// Message will be drawn in the font we've set.
text(message, 10, 75);
{% endhighlight %}

![Example output of createFont sketch]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/createFont-screenshot.png)

There's a potential problem with creating fonts in this way. If you run the sketch
on a different computer (e.g., your marker's) where the font
isn't installed, it'll not display properly. To get around this, you can 
include a font file in the data folder of your sketch and load it into a 
[`PFont`][7] variable.

There're two main ways to achieve this. The first is to use Processing's built in
'createFont' tool.

From the 'Tools' menu, choose 'Create Font…'

![Create Font Menu Item]({{site.baseurl}}{{page.url}}images/create-font-menu.png)

A dialog will pop up. You can select the font you want to use and set
options for it such as size. Set the options you want and click OK.

![Create Font Dialog]({{site.baseurl}}{{page.url}}images/create-font-dialog.png)

Once you click OK, a [`.vlw`][9] file will be created inside the 'data' folder
of your sketch. Now you can use it in your sketch by loading it with the
[`loadFont()`][9] function as shown in the following listing and output.

{% highlight java linenos %}
// PFont variable will hold font information
PFont myFont;
String message = "Avatar";

size(150, 150);
fill(0);

// Create a new font from a font file in the data folder.
// loadFont requires the name of the font.
myFont = loadFont("Papyrus-48.vlw");

// We again need to tell Processing to use the font.
textFont(myFont);
textAlign(CENTER);

// Message will be drawn in the font we've set.
text(message, width / 2, 75);
{% endhighlight %}

![Avatar used Papyrus]({{site.baseurl}}{{page.url}}tutor-examples/thumbs/loadFont-screenshot.png)

<p class="task">
  <strong>Task:</strong> Try this now. Create a font using the Create Font
  dialog, and then load it and display it in your sketch using the text display
  functions described above.
</p>

For more information, refer to the following tutorial from Dan Shiffman or check
the [Procesing reference][10] typography functions.

<ul class="code-list">
  <li>
    <a class="title-link" target="_blank" href="https://processing.org/tutorials/text/">Tutorial: Strings and Drawing Text</a>
    <a class="img-link" target="_blank" href="https://processing.org/tutorials/text/">
      <img
        alt="Text Tutorial"
        src="{{site.baseurl}}{{page.url}}images/text_tutorial.jpg">
    </a>
    A detailed tutorial by Dan Shiffman on how to work with Strings and draw
    them to the canvas using the text display functions of Processing.
  </li>
</ul>

## Working with time

There're several ways that we can make our sketches change over time.

### Counting frames

One way to respond to time is to use the [`frameCount`][11] variable
that Processing provides. This variable holds a counter of the number of
frames shown so far. The following example demonstrates its use.

{% highlight java linenos %}
void setup(){
  size(150, 150);

  // Align text center both horizontally and vertically.
  textAlign(CENTER, CENTER);
  textSize(50);
}

void draw(){
  // Calculate a colour for the background based on frameCount.
  // Use the modulo operator to 'wrap around' at 255.
  int bgColour = frameCount % 255;
  background(bgColour);

  // Calculate a fill opposite to the background.
  int fillColour = 255 - bgColour;
  fill(fillColour);

  // Draw the frameCount at the center of the canvas.
  text(frameCount, width / 2, 75);
}
{% endhighlight %}

<ul class="code-list">

{% include captioned_card.html name="frameCount" example_dir="tutor-examples" caption="Demonstrates how to use the frameCount variable." %}

</ul>

### Counting milliseconds

A disadvantage of using [`frameCount`][11] is that if the sketch
runs slowly, then the counter will go slower too.
An alternative is to use the [`millis()`][12] function, which returns the
number of milliseconds since the sketch started. The following listing is
identical to the one above for [`frameCount`][11]. Note how the output sketch
cycles much faster from white to black. This is because millis happen faster than
frames!

{% highlight java linenos %}
void setup(){
  size(150, 150);

  // Align text center both horizontally and vertically.
  textAlign(CENTER, CENTER);
  textSize(50);
}

void draw(){
  // Calculate a colour for the background based on milliseconds.
  // Use the modulo operator to 'wrap around' at 255.
  int bgColour = millis() % 255;
  background(bgColour);

  // Calculate a fill opposite to the background.
  int fillColour = 255 - bgColour;
  fill(fillColour);

  // Draw the millis at the center of the canvas.
  // NOTE: This number might be different from line 12 because some time has passed!
  text(millis(), width / 2, 75);
}
{% endhighlight %}

<ul class="code-list">

{% include captioned_card.html name="millis" example_dir="tutor-examples" caption="Demonstrates how to use the millis() function." %}

</ul>

The following example shows a slightly more complex example, which uses
[`millis()`][12] together with the [`% (modulo)`][13] operator to generate a
more interesting visual result.

<ul class="code-list">

{% include captioned_card.html title="Milliseconds" name="Milliseconds" example_dir="online-examples" link="https://processing.org/examples/milliseconds.html" caption="Generates a pattern of vertical stripes based on the time elapsed." %}

</ul>

<p class="task">
  <strong>Task:</strong>
  The brief for the assignment requires that you integrate text into your
  time-based sketch. Could you combine text in the examples above? Remember that
  something like frameCount or millis() can also control other
  aspects, such as colour, size, position, or font.
</p>

### Telling time

Beyond counting frames and milliseconds, Processing also gives us some time
based functions to get information about the current time:

* [`year()`][14] gives the current year.
* [`month()`][15] gives the current month.
* [`day()`][16] gives the current day.
* [`hour()`][17] gives the current hour.
* [`minute()`][18] gives the current minute.
* [`second()`][19] gives the current second.

The following examples use these functions to draw a clock. The first one, from
the Processing website, draws a dial clock. This example uses some advanced
drawing functions, which we haven't covered yet, so don't worry too much about
these. The main thing to understand for this class is the use of the time
functions. The second one, from Indae Hwang and Jon McCormack, from Monash Uni,
draws a digital clock with simple interaction.

<ul class="code-list">

{% include captioned_card.html title="Clock" name="Clock" example_dir="online-examples" link="https://processing.org/examples/clock.html" caption="Implements a dial clock." %}

{% include captioned_card.html name="clockexample" example_dir="tutor-examples" link_to_web_version=true caption="uses time to create a clock with text (by Indae Hwang and Jon McCormack, Monash Uni.)" %}

</ul>

<p class="task">
  <strong>Task:</strong>
  See if you can alter the example to include a text representation of the
  hours, minutes and seconds.
</p>

<p class="info">
  <strong>Tip:</strong>
  The examples above are mainly meant to show you how the time functions work.
  Implementing a clock alone for this part of the assignment might not be so
  interesting. If you are thinking of implementing a clock for this part of the
  assignment, try to be a bit creative with it. E.g. could you recreate something
  like the <a target="_blank" href="https://qlocktwo.com/en/">qlocktwo</a>
  clock pictured below?
</p>

![Qlocktwo]({{site.baseurl}}{{page.url}}images/qwlocktwo-text-clock.jpg)
[]()

## Typographic animations ##

One way to approach this part of the assignment is to pick a word
and animate it in a way that fits with its meaning.
The examples below show a range of examples of this approach.

<p class="task">
  <strong>Task:</strong>
  As a class, brainstorm a word that we could use to
  create a typographic animation for. we'll go through
  this as a worked example.
</p>

<p class="info">
  <strong>Tip:</strong>
  If you want to create a typographic animation for your
  assignment. Make sure you choose your own word and come
  up with an original creative response.
</p>

<ul class="code-list">

{% include captioned_card.html name="decay" example_dir="tutor-examples" link_to_web_version=true caption="Draws some text that's gradually decayed away." %}

{% include captioned_card.html name="day_night" example_dir="tutor-examples" link_to_web_version=true caption="Animates between two words" %}

{% include captioned_card.html name="shivers" example_dir="tutor-examples" link_to_web_version=true caption="Text is animated to look like it's shivering." %}

{% include captioned_card.html name="avoidance" example_dir="tutor-examples" link_to_web_version=true caption="Text avoids the mouse." %}

{% include captioned_card.html title="Run Animation (Advanced)" name="run_animation" example_dir="tutor-examples" link_to_web_version=true caption="More advanced - example of using processing to animate text" %}

</ul>

## Loading text

The following two examples show how to load text into processing from a
file or url using the [`loadStrings()`][20] function. This is an advanced topic,
but may be useful if you want to work with longer passages of text.

<ul class="code-list">

{% include captioned_card.html name="weather" example_dir="tutor-examples" link_to_web_version=true caption="Advanced example, which shows using live data and manipulating Strings. The sketch loads a weather forecast text file from the Bureau of Meteorology and splits it to get data that's displayed on screen." %}

{% include captioned_card.html name="dada_poem_generator" example_dir="tutor-examples" caption="Another more advanced example, which shows how to randomly use strings from a larger text file to create a cutup poem." %}

</ul>

## Further tutorials

<p>
  The following online tutorials go into more depth on how to work
  with typography, text and fonts in Processing.
</p>

<ul class="code-list">
  <li>
    <a class="title-link" target="_blank" href="https://processing.org/tutorials/typography/">Typography Tutorial</a>
    <a class="img-link" target="_blank" href="https://processing.org/tutorials/typography/">
      <img
        alt="Typography Tutorial"
        src="{{site.baseurl}}{{page.url}}images/typography_tutorial.png">
    </a>
    A detailed tutorial on the use of typography in Processing.
  </li>

  <li>
    <a class="title-link" target="_blank" href="http://freeartbureau.org/fab_activity/geomerative-tutorial-part-1/"
      >Geomerative Tutorial (Advanced)</a>
    <a class="img-link" target="_blank" href="http://freeartbureau.org/fab_activity/geomerative-tutorial-part-1/">
      <img
        alt="Geomerative Tutorial"
        src="{{site.baseurl}}{{page.url}}images/geomerative-tutorial.png">
    </a>
    A tutorial on achieving more advanced font effects using the geomerative library.
  </li>

  <li>
    <a class="title-link" target="_blank"
      href="tutor-examples/zips/brisvegas.zip">
      BrisVegas (Bonus - Advanced)
    </a>
    <iframe width="150" height="150" src="https://www.youtube.com/embed/EI32vcn6bh4?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    An animated text for 'Brisvegas'. This example uses the geomerative library,
    which is explained in the tutorial above.
    <strong>Note:</strong> You will need to install the Geomerative library in
    order to get this sketch to run. See tutorial 5 for instructions.<br>
    <a target="_blank"
      href="tutor-examples/zips/brisvegas.zip"
      >(Download zip)</a>
  </li>

</ul>

## Reference links

1. [Processing Reference][10]
2. [`PFont`][7]
3. [`text()`][3]
4. [`textSize()`][5]
5. [`textAlign()`][6]
6. [`loadFont()`][9]
7. [`char`][1]
8. [`String`][2]
9. [`fill()`][4]
10. [`println()`][8]
11. [`frameCount`][11]
12. [`millis()`][12]
13. [`% (modulo)`][13]
14. [`year()`][14]
15. [`month()`][15]
16. [`day()`][16]
17. [`hour()`][17]
18. [`minute()`][18]
19. [`second()`][19]
20. [`loadStrings()`][20]

[1]: https://processing.org/reference/char.html
[2]: https://processing.org/reference/String.html
[3]: https://processing.org/reference/text_.html
[4]: https://processing.org/reference/fill_.html
[5]: https://processing.org/reference/textSize_.html
[6]: https://processing.org/reference/textAlign_.html
[7]: https://processing.org/reference/PFont.html
[8]: https://processing.org/reference/println_.html
[9]: https://processing.org/reference/loadFont_.html
[10]: https://processing.org/reference
[11]: https://processing.org/reference/frameCount.html
[12]: https://processing.org/reference/millis_.html
[13]: https://processing.org/reference/modulo.html
[14]: https://processing.org/reference/year_.html
[15]: https://processing.org/reference/month_.html
[16]: https://processing.org/reference/day_.html
[17]: https://processing.org/reference/hour_.html
[18]: https://processing.org/reference/minute_.html
[19]: https://processing.org/reference/second_.html
[20]: https://processing.org/reference/loadStrings_.html