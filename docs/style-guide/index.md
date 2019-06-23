---
title: Style Guide
layout: default
---

# Style Guide

(Adapted from
[https://github.com/processing/processing/wiki/Style-Guidelines](https://github.com/processing/processing/wiki/Style-Guidelines)
and
[https://github.com/rwaldron/idiomatic.js/](https://github.com/rwaldron/idiomatic.js/))

## Consistent code formatting matters

Code is difficult to read and understand at the best of times. If code is
written without any indentation, or inconsistent formatting, it becomes even
harder to figure out. Consider the following code – can you figure out what it
does?

{% highlight javascript linenos %}
createCanvas(100,100);for(let m=10;m<100;m+=40)ellipse(m,m,20,20);
{% endhighlight %}

If copy this code, you’ll be able to run it without any problems.
Syntactically, it’s correct but it’s very hard to read. Now look at the same
code with proper formatting.

{% highlight javascript linenos %}
// This sketch draws three dots diagonally across the screen.
let dotSize = 20;
let spacing = 40;

createCanvas(100,100);

// Starting with position at half the dotSize (so the dot is at
// the top left), increment by the spacing between the dots to
// draw a diagonal line from top-left to bottom-right.
for( let position = dotSize / 2; position < width; position += spacing){
  ellipse(position, position, dotSize, dotSize);
}
{% endhighlight %}

Not only is this easier to read, it’s also easier to change and experiment
with. For instance, if we wanted to change the output so that the dots were
larger or the spacing between dots was smaller, we would only need to change
the value of the `dotSize` and `spacing` variables.

## Indentation

Good indentation highlights the structure of the code. A simple rule to follow
is: indent in after opening a curly bracket and indent out after closing one.
You can use either spaces or tabs for indentation, just be consistent. If you
use spaces, you should use at least two spaces to show the indent.

{% highlight javascript linenos %}
// This function draws a grid of circles to the screen
function drawCircleGrid(size, spacing){
  // Indent the body of the function.
  for(let i = spacing / 2; i < width; i += spacing){
    // Indent the body of the for loop
    for(let j = spacing / 2; j < height; j += spacing){
      // The body of any nested for loops should be indented again

      if(random(100) > 50){
        // The body of if statements should also be indented
        fill(255, 0, 0);
      } else {
        // Also indent associated else statements.
        fill(255);
      }
      circle(i, j, size);
    }
  }
}
{% endhighlight %}

In the p5js web editor, you can also use the very handy ‘Tidy Command’ command
from the ‘Edit’ menu. This will automatically indent your code for you. Often
it will make it obvious if you’ve made a mistake such as missing an opening or
closing curly bracket.

## Commenting

Comments are lines in your code that explain to other people (and yourself)
what the code does. Comment lines are ignored by JavaScript when it runs your
program, so you can write anything you like in there. Comments can be either
single-line `//` where anything after the forward slashes to the end of the
line is a comment, or multi-line `/* ... */` where anything between the
asterisks is ignored even if it continues over multiple lines.

{% highlight javascript linenos %}
/* This is a multi-line comment. Anything
    between the asterisks is ignored.
    Even if it goes over more than one line.
 */

// This is a single-line comment. Anything to the end of line is ignored.
let spacing = 20;
{% endhighlight %}

For DXB211, you should follow these guidelines when deciding how and when to
comment

### General comment at top of file including attributions

Each file in your p5js program should have a single multi-line comment at the
very top of the file, which:

* explains the **general functioning** of the sketch
* includes **your personal details** (Names and student numbers)
* gives **attributions** for any code you drew inspiration from when you created
  the sketch and a brief explanation of how you changed it for your submission.

{% highlight javascript linenos %}
/*
 * This sketch loads an image from file and generates a picture
 * with triangles of different sizes and orientations to produce
 * an interesting texture. The generated sketch also reacts to
 * mouse movements of the user to change the triangle direction
 * Alice White, n1234567 & Maddie Hatter, n7654321
 * Code adapted from: https://p5js.org/examples/image-pointillism.html
 * - We used the pointillism example as the basis for developing
 *   this sketch but changed the shape from circles to triangles
 *   and added interactivity.
 */
{% endhighlight %}

The extra asterisks added at the start of each line in the example above are
not necessary for the comment, they are ignored by JavaScript just like the
rest of the comment, but they make it easier to read. You should follow this
pattern for your top-of-file comments.

<p class="info">
  <strong>Note:</strong> If you draw on any existing code for your sketch, you <strong>must</strong> give attribution at the top of your file and your sketch <strong>must</strong> add a significant original contribution on top of any code you use. Minor changes to variables is not enough. Unattributed code is plagiarism and will be treated as academic misconduct. <em>If you are unsure, consult with your tutor.</em>
</p>

### Comments to explain variable declarations

It is a good idea to add a single-line comment for variable declarations where
the use of the variable will not be immediately obvious, or where there may be
constraints on the values that the variable can take.

{% highlight javascript linenos %}
// Maximum speed for circles. Should not be negative.
let maxSpeed = 100;
{% endhighlight %}

These comments should be on the line immediately before the variable
declaration as shown above, <strong>not</strong> trailing the declaration,
because this makes it more difficult to read the code.

{% highlight javascript linenos %}
let maxSpeed = 100;    // Maximum speed for circles  <== hard to read
{% endhighlight %}

### Comments to explain functions

Comments should also be added before any function you declare to explain:

* what the function does
* the kind of values it returns
* anhy assumptions about the arguments it accepts

{% highlight javascript linenos %}
/**
 * Given an x,y position and a width, this function returns an array
 * with the points for a triangle centred on that location. The triangle
 * points at the current mouse position. The width of the base of
 * the triangle is given by the 'w' argument and the length of the
 * triangle is calculated based on how far away the mouse position is.
 */
function mouseTrackingTriangle(x, y, w){
  // ...
}
{% endhighlight %}

### Comments to explain program flow

You should also use comments anywhere that you use a statement such as an
`if` statement, `for` loop, or other statements that control the flow of the
program. These are usually difficult parts of code to understand by reading
the code itself, so well-chosen comments can help communicate what it is that
the code is actually doing.

`for` loops should have a single-line style comment above the
initialization of the loop. Consider explaining the stopping conditions of the
loop too.

{% highlight javascript linenos %}
// Variable to hold the index of the largest fitting circle. Initialize
// to size of first circle in array.
let largestCircle = circleSizes[0];

// Loop over the circleSizes array. After the loop finishes, the
// variable 'largestCircle' will contain the largest circle's size
for (let i = 0; i < circleSizes.length; i++){
  largestCircle = max(largestCircle, circleSizes[i]);
}
{% endhighlight %}

For `if` statements, comments should be single-line style above each branch of
the code.

{% highlight javascript linenos %} // If the circle size it is less than the
minimum size, set colour to yellow if(circleSize < minCircleSize){fill(255,
255, 0);} else if(circleSize > maxCircleSize){// Otherwise, if it's larger
than the maximum size set the colour to red fill(255, 0, 0);} else {//
Otherwise, it must be in range. Set the colour to green. fill(0, 255, 0);
}
{% endhighlight %}

### Comments to explain any tricky lines of code

Beyond the above guidelines for when to comment, you should also use comments
to explain any lines of code where the functioning or purpose of the code is
not self-evident. Use your judgement for this.

{% highlight javascript linenos %}
// Use the mouseX position to increase the pulsing of the background.
// The further to the right, the faster the pulsing.

// Normalize the mouseX position to 0..0.1
let normX = map(mouseX, 0, width, 0, 0.1);

// Use the normalized mouse position to adjust the pulsing
float pulseVal = sin(frameCount * normX);

// Map the value of pulseVal from -1..1 to 0..255 to use as a grey
let bgColor = map(pulseVal, -1, 1, 0, 255);
background(bgColor);

{% endhighlight %}

### Don’t over-comment

The last thing to know about commenting is when not to comment. If you add too
many comments to your code, they will start to make it difficult to actually
read the code itself, which defeats the purpose of adding comments in the
first place. As a general rule, if you are commenting every single line of
code, then you are probably commenting more you need. Don’t comment
anything where the meaning of the code itself is self-evident.

{% highlight javascript linenos %}
// This is an example of over-commenting. *Do not* do this.

// Rectangle colour                   <= Variable name is already clear
let rectangleColor;

// Set the initial value to 120       <= Obvious from the code
rectangleColor = 120;

// Set fill using the rectangleColor  <= Obvious from the code
fill(rectangleColor);

// Draw a rectangle in the top half of the screen  <= (borderline)
rect(0, 0, width, height / 2);

// Add 10 to rectangleColor           <= Obvious from the code
rectangleColor = rectangleColor + 10;

// Draw a rectangle in the bottom half of screen   <= (borderline)
rect(0, height / 2, width, height / 2);
{% endhighlight %}

## Spaces

Spaces help the reader see the parts of a single statement. An english
sentence *getsdifficulttoread* if you don't have spaces. So does code!

* Use spaces before/after commas:
  * `someFunction(apple,bear,cat);` (bad)
  * `someFunction(apple, bear, cat);` (good)

* Use spaces before/after use of +
  * `let a = 1 + 2;`
  * `let s = "String " + "joined " + "together";`

## Blank lines

Blank lines make it easier to spot the different sections of code. Add a blank
line between blocks of code such as `if` statements and function declarations
to visually separate them.

## Long lines

Excessively long lines are very difficult to read and understand. Keep code
under 80 columns if you can. Break up statements if necessary.