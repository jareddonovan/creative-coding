---
title: "Coding examples"
layout: page
---

The coding examples on this page are designed to be simple
demonstrations of techniques you might find useful for completing the second
assignment. I plan to produce one or two new videos per week until the end
of the semester.

<!-- If you have suggestions or requests for other topics you'd like
me to cover, please post them on the [discussion forum](http://qut.to/v1yju). -->

---

## Kaleidoscope effect

In this series of videos, I show how to create a kaleidoscope effect by
reflecting and rotating images to fill up the canvas.

### Kaleidoscope 1: Image masks

The first part shows how to create an image mask using a p5.Graphics object to
make parts of an image transparent.

{% include youtube.html id="BWFO-NgSLGo" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/ZHIt6UHkW)

### Kaleidoscope 2: Image rotation and reflection

 The second part shows how to rotate and reflect images like a kaleidoscope does.

 {% include youtube.html id="3V2NiR9aU4M" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/253uq5lnl)

### Kaleidoscope 3: Hexagon pattern

The third part shows how to combine triangular images into a hexagon shape
stored in a p5.Graphics object and then tile this across the canvas.

 {% include youtube.html id="YpBZ76QAdQU" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/COGeT3LXl)

---

## Character States and Behaviors

In this series of videos, I show how to apply the concept of states to the
characters in a game. This lets us change the way that characters look, move,
and behave based on their state.

### Star Bliss Game

In the first video, I give an overview of the concept and start implementing
classes for Star and Moon objects.

{% include youtube.html id="I_ovJRZhlLo" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/6PnRcGzE_)

### Character States 1

In this video, I start to implement the states for the Star object and use these
to change which image is drawn to the canvas.

{% include youtube.html id="CSGYWufRGJk" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/uEj6DeKKu)

### Animating based on state

In this video, I go beyond just showing different images based on state and
start to use the state to also how the Star objects move and behave.

{% include youtube.html id="cYFfxNEQTDc" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/AfFD6DS0G)

### Character States 2

In this video, I finish implementing the state and behaviors on the Moon object
and figure out how the scoring conditions work.

{% include youtube.html id="T3dPUQMb0Jc" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/-Wg20-BnF)

### Resetting game state

In this video, I look back into the overall game state transitions and figure out
how to tell if the game has been won or lost and also to reset the game if the
user wants to play again.

{% include youtube.html id="ykeImdtertY" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/RNV-rPHfX)

### Following the mouse (bonus)

In this final (bonus) video, I show how to make the Moon follow the mouse
position, so that you don't need to explicitly drag it everywhere.

{% include youtube.html id="Xtu8xJVyZlo" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/viFxjHAJV)

---

## Have you WON?

In this example, I explain how to model state transitions in your sketch.
This lets you do things like keep track of whether a user has won a game
or not, or decide which screen to show at different times.

{% include youtube.html id="W35PRULdlAw" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/MJ0VOq6mg)

---

## Working Offline

In this example, I show how to use a text editor to work on your p5.js sketches
offline. Some editors you can download:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Atom](https://atom.io/)
* [SublimeText](https://www.sublimetext.com/)

{% include youtube.html id="f2Un1Q-0UvI" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/fJyCZ0alA)

---

## Collision detection

In this series of examples I will work through the process of creating a simple
game where you can throw snowballs at a snowman. The aim is to show how to do 
collision detection.

### Part 1

In the first part, I show how to do the collision detection between two
circles.

{% include youtube.html id="zuOmV1cqH8Y" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/H378ia5KT)

### Part 2

In the second part, I show how to add some graphics to the sketch and still
have the collision detection work. The links I mentioned in the video are:

* [p5.Collide2D library](https://github.com/bmoren/p5.collide2D)
* [Collision Detection, Jeff Thompson](http://www.jeffreythompson.org/collision-detection/)

{% include youtube.html id="2gw10lzI7Jg" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/GULVoYPe5)

### Part 3

In the third part, I show how to have multiple snowballs on the screen at one
time. I also show how to keep score, and move the snowman up and down to make
it harder to hit.

{% include youtube.html id="PlSczCOhIqQ" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/WAfX9-noj)

---

## Pixel Walls

In this series of videos, I show how to create a simple sketch where you can 
move a character around on the canvas, but stop it from moving through walls
that you draw on a background image.

### Part 1

In the first video, I set up the basics of the class for the character, and
functions to control its movement.

{% include youtube.html id="Q1tIg4TmQc0" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/UhqRJh5D1)

### Part 2

In the second video, I show how to stop the puck from moving through the walls.
I also explain how to set the drawing for the background up using a grid and
talk about what can go wrong if you don't get that part right.

{% include youtube.html id="Mqr1orw4exE" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/yH-Lvwkcv)

[Illustrator file](code/ex07_Pixel_walls_demo_2/rooms.ai)

### Part 3

In the third video, I show how to use a second graphics file to draw a better
looking background. Also how to draw a graphic for your characters and make it
rotate depending on which direction was moved.

{% include youtube.html id="93URkuxyXRc" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/_BkWvqLjj)

---

## Wiki Wordle

In this demo, from the week 10 lecture, I give an introduction to the DOM and
show how we can access it from p5js to create a simple text visualisation.

{% include youtube.html id="2BV3LJOWCGQ" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/KqfhXEzDH)

---

## Weather Data

In this example, from the second part of the week 10 lecture, I introduce the
concept of an API and work through a demonstration of getting weather data from
an online API and showing it in your sketch.

{% include youtube.html id="ztzrwyMLl_I" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/Ytty41XPX)

---

## Side-scroller background

In this video, I show how to make a scrolling background that moves left and
right when a character gets to the edge of the canvas.

### Scrolling background

{% include youtube.html id="q_pDcE9nyfY" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/56MUCxckn)

### Repeating background

In the second part, I show how to make the background repeat.

{% include youtube.html id="QBs4YFxhghI" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/XC-Lmc1Zc)

### Noise background

In the third part, I show how to generate the background using the noise
function so it can scroll forever.

{% include youtube.html id="HiBHFPHV2co" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/tB8carvYz)

---

## User input and saving data

In this series of videos, I show how to get input from the user that you can
display in your sketch, how to save data to a file, and how to load it back in
from a file.

### Part 1

In the first, part I just show how to use an input element to get some text
input from the user and display it on the canvas.

{% include youtube.html id="nhO4cN_HtW8" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/GLKm9HkfQ)

### Part 2

In the second part, I show how to make a list of previous entries and also how
to make an animation triggered by user input.

{% include youtube.html id="h1YYkYEEhcQ" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/UmJDkYPLr)

### Part 3

In the final part, I show how to save the data to a file and load it back in to
the sketch when it runs so that the sketch is pre-populated with data.

{% include youtube.html id="gzMGWULVmxI" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/dHiUYLZX6)

---

## Countdown timer

In this series of examples, I show how to create a countdown timer that counts
down to an event at some point in the future.

### Part 1

In the first part, I just create the simplest version of the countdown timer
that I can. This video shows how to make a simple countdown timer for some
date in the future.

{% include youtube.html id="n4fvoZBPoHU" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/QoXKAFzP-)

### Part 2

In the second part, I have the timer do something based on a date in the
future.

{% include youtube.html id="VntMX80I00g" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/bUK4R75pY)

---

## Clickable

This example shows how to make a simple clickable 'button' in p5.js. Use this
as the basis for a whole range of sketches that involve clicking on regions on
the screen.

{% include youtube.html id="Ma8EnaU7924" %}

[Live version](https://editor.p5js.org/creativecoding/sketches/Xux8ksl_1)