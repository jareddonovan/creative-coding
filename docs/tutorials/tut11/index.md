---
title: "Tutorial 11: Animation Dynamics"
tut_id: tut11
layout: tutorial
---

<p class="lead">
  In this week's tutorial we will run a short activity on how to use the
  random, noise and sin functions to control aspects of a sketch. Following
  this, we will use the rest of the tutorial to work on your second
  assignment.
</p>

## Animating a character

<p class="task">
  <strong>Activity:</strong>
  In this activity, we will use the <code>sin()</code> <code>random()</code> and
  <code>noise()</code> functions to animate parts of the following characters.
  Download the zip below, which has the drawing code for the characters. Look
  through the sections below to understand how the functions work. Use this
  to animate each of the characters as you go.
</p>

![Three characters]({{site.baseurl}}{{page.url}}images/characters.png)

## Understanding random()

You are probably already pretty familiar with how the `random()` function works.
You can give it either one or two arguments. If you give it one argument, it
will return a random number somewhere between zero and that number. If you give
it two arguments, it will return a random number between the numbers you give.

{% highlight javascript linenos %}
// The random() function takes either one or two arguments.
// If you give it a single argument, it will return a random number somewhere
// between 0 and the number you give.
let r1 = random(10);

// The value of r1 will be somewhere between 0 and 10.
console.log(r1);

// If you give it two arguments, it will return a random number somewhere
// between the numbers you give.
let r2 = random(10, 100);

// The value of r2 will be somewhere between 10 and 100.
console.log(r2);
{% endhighlight %}

The following image is created by randomly choosing an x position to draw a line
at each frame. Overtime, the lines are more or less evenly spread across the
page.

<ul class="example-list">

  {% include example_card.html name="Random demo" thumb="images/random_demo-screenshot.png" link="https://editor.p5js.org/creativecoding/sketches/lz-OGdUIx" caption="Demonstrates the random function." %}

</ul>

There is another function called `randomGaussian()`, which also returns a random
number, but it has a couple of differences:

1. There is no upper or lower limit on the size of the number it will return.
2. It is more likely to return a number that is close to zero.

The following picture shows how it works. In this sketch, the x position is
calculated with `randomGausian()`. Notice how more lines are grouped around the
middle of the picture?

<ul class="example-list">

  {% include example_card.html name="Random gaussian demo" thumb="images/random_gaussian_demo-screenshot.png" link="https://editor.p5js.org/creativecoding/sketches/5zU-_QqjT" caption="Demonstrates the randomGaussian function." %}

</ul>

### Using randomness for animation

We can use `random()` and `randomGaussian()` to create animations. The following
tutor example shows this.

<ul class="example-list">

  {% include example_card.html name="Simple random animation" thumb="images/simple-random-animation-thumb.png" link="https://editor.p5js.org/creativecoding/sketches/mQ69Q13e3" caption="Creates a simple animation of two circles using the <code>random()</code> and <code>randomGaussian()</code> functions." %}

</ul>

<div class="task">
  <p><strong>Over to you:</strong> Use the `random()` or `randomGaussian()`
  function to animate the position of the eyes of the teddy bear.</p>
</div>

<ul class="example-list">

  {% include example_card.html name="Scared teddy" thumb="images/character_2-thumb.png" link="https://editor.p5js.org/creativecoding/sketches/7APavnpcp" caption="Alter the code to animate the position of the eyes of the teddy bear." %}

</ul>

## Understanding sin()

You have probably heard of the `sin` function before if you've ever done
trigonometry. There, you would have used it to figure out angles, lengths
and so on in geometry problems.

We are going to use it in a different way today.

The useful thing about the `sin` function is that if you give it a
sequence of numbers as arguments, it will generate a wave pattern that you
can use to animate things. No matter what value you give it, the result you
get from `sin` will always be between -1 and 1. The following picture and
code listing shows this.

![sin-wave]({{site.baseurl}}{{page.url}}images/sin_wave-screenshot.png)

{% highlight javascript linenos %}
// Draws a sin wave across the screen based on the x position.
function setup(){
  createCanvas(700, 100);
  background(200);
  noStroke();
  fill(0);

  // Iterate across the width of the canvas.
  for (let x = 0; x <= width; x += 5) {
    // Calculate a y value based on the current x.
    // Divide by 50 to stretch the wave horizontally.
    // Value of y will be between -1 and 1.
    let y = sin(x / 50.0);

    // Scale value of y up to -35...35
    y *= 35;

    // Draw a rectangle at x, y. Add 50 to y to center vertically.
    rect(x, 50 + y, 2, 4);
  }
}
{% endhighlight %}

### Using sin for animation

One really useful thing that you can do with `sin` is use it to animate
something on screen. The following tutor example demonstrates this. Download it
and see how it works.

<ul class="example-list">

  {% include example_card.html name="Red ball bounce" thumb="images/red-ball-bounce-thumb.png" link="https://editor.p5js.org/creativecoding/sketches/NTZEwfCzt" caption="Creates an animation of a bouncing ball using the <code>sin()</code> function." %}

</ul>

<div class="task">
  <p><strong>Over to you:</strong> Use the <code>sin()</code> function to animate
  the size of the hairless baby's mouth.</p>
</div>

<ul class="example-list">

  {% include example_card.html name="Hairless baby" thumb="images/character_1-thumb.png" link="https://editor.p5js.org/creativecoding/sketches/tdNiiCumA" caption="Alter the code to animate the size of the baby's mouth." %}

</ul>

## Understanding noise()

The `noise()` function is a bit like `random()` but it lets you create more
natural looking results. It is a bit like 'smoothed-out' randomness. The easiest
way to understand how the noise function works is if you picture a randomly
generated landscape with hills and valleys. Using the noise function is like
reaching in to this landscape and asking what height it is at a particular spot.

The following code listing and output shows how it works.

{% highlight javascript linenos %}
function setup(){
  // xSample will be the point from which we sample the noise.
  let xSample = 0.0;

  // The inc is how far we move the sample point each time we sample
  let inc = 0.02;

  createCanvas(700, 100);
  background(200);
  stroke(0);

  // Loop across the width of the screen.
  // Sample the noise() function and use this to draw a line.
  for (let x = 0; x < width; x++) {
    // The noise function will return a value between 0..1.
    let n = noise(xSample);

    // Use the noise value to give a length 
    // Scale from 0..1 to 0..height
    let len = n * height;
    line(x, height, x, height - len);

    // Move the sample point, so next time we get a bit different value
    xSample = xSample + inc;
  }
}
{% endhighlight %}

![Perlin noise demo]({{site.baseurl}}{{page.url}}images/perlin_noise_1d_demo-screenshot.png)

A cool thing about `noise()` is that we can also use it to sample a two or even
three dimensional space of noise. This means that we can use it to generate
things like cloud textures, as the following example shows.

{% highlight javascript linenos %}
function setup() {
  // Based on example 15_09 from the text
  let xn = 0.0;
  let yn = 0.0;
  let inc = 0.02;

  createCanvas(700, 100);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let gray = noise(xn, yn) * 255;
      stroke(gray);
      point(x, y);
      xn = xn + inc;
    }
    xn = 0;
    yn = yn + inc;
  }
}
{% endhighlight %}

![Perlin noise 2d demo]({{site.baseurl}}{{page.url}}images/perlin_noise_2d_demo-screenshot.png)

### Using noise for animation

We can also use noise as the basis for animation in Processing. Often this leads
to more natural looking movements than either the `sin()` or `random()`
functions. The following tutor example demonstrates this.

<ul class="example-list">

  {% include example_card.html name="Noise animation" thumb="images/noise-animation-thumb.png" link="https://editor.p5js.org/creativecoding/sketches/-0OwCDmTN" caption="Creates an animation of a circle using the <code>noise()</code> function." %}

</ul>

<div class="task">
  <p><strong>Over to you:</strong> Use the <code>noise()</code> function to animate
  the vampire daisy.</p>
</div>

<ul class="example-list">

  {% include example_card.html name="Vampire daisy" thumb="images/character_3-thumb.png" link="https://editor.p5js.org/creativecoding/sketches/Utlcbz63A" caption="Alter the code to animate the vampire daisy's petals." %}

</ul>

## Tutorial recording

The following recording is from Louis' Friday tutorial. Thank you Louis!

{% include youtube.html id="sjDW969LMtE" %}