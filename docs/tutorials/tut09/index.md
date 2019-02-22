---
title: "Tutorial 9: Class and Objects"
tut_num: 9
layout: tutorial
---

<p class="lead">
  As your sketches become more complex, you will find that you need a way to
  keep your code organized. In this week's class, you will learn how to define
  `classes` in your code that describe the different parts of your sketch. This
  is the concept of Object Oriented programming. You will work through an
  example in class in which you create some of your own objects and employ them
  in a simple interactive sketch.
</p>

### Tutorial overview

1. Demonstration
2. Activity - create a class of your own
3. Assignment 2 - working time

## Demonstration

In this demonstration, we are going to work through the process of defining a
class and using it to create objects in a simple sketch. You should follow along
as your tutor works through the example to make sure you have a working version
on your computer and understand how it works.

We are going to build an 'aquarium'. The aquarium is going to have some 'fish'
in it that can swim around. The fish in the sketch are going to be defined in
our sketch by a `Fish` class. And we will use this class to create `Fish`
objects.

* **An object** is a special kind of datatype that can contain data of its
  own (fields), and functions of its own (methods).
* **A class** defines how an object should be created, what information it holds
  and what methods it has.

We have already worked with a number of the built in objects that p5js and
JavaScript provide, such as `Strings`, `p5.Fonts`, and `p5.Images`, so this
should already be somewhat familiar to you.

![An object can contain data (fields) and functions (methods)]({{site.baseurl}}{{page.url}}images/object.png)

### Defining an object

In order to create our own objects, we need to do a little bit of work. We need
to describe all the parts that make up an object, including the kinds of data
it needs to store, all the methods it can perform and what kind of
information it requires to be created. Together, this information forms the
`class` definition of the object.

One way to understand the difference between classes and objects is to think
about the difference between cookie cutters and cookies. A cookie cutter defines
the overall shape of the cookie, but it is not the same thing *as* a cookie. In
the same way, a class defines how individual objects will be created and behave,
but it is not the same thing as an object.

![cookie cutter]({{site.baseurl}}{{page.url}}images/cookie-cutter.png)

If class is the definition, the object is the *instantiation*. To continue the
analogy, if the class definition is like a cookie cutter, then the objects we
create with it are like cookies. Delicious, delicious cookies.

![cookies]({{site.baseurl}}{{page.url}}images/cookies.png)

### Object literals

You may have already seen that in JavaScript, you can define objects directly
as a variable, with code like the following:

{% highlight javascript linenos %}
  let ball = {
    x: 75,
    y: 75,
    size: 100
  }
}
{% endhighlight %}

There is really no difference between these kinds of objects and the ones that
we are going to be defining today. Object literals are a perfectly fine way to
define objects, but they can be a bit cumbersome to manage if you want to create
more than one instance of an object. That's why we will use class declarations
in today's tutorial.

### Writing a class definition

<p class="tip">
  In JavaScript, there are a several of different ways to define a class. If you
  google for help on this topic, you'll discover many different approaches. In
  this tutorial, we will concentrate on the method that we think is easiest for
  new programmers to learn and manage, which is
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">ES6 class declarations</a>
</p>

To keep your code organized, it's a good idea to put your class definition in
a new tab. Create a new file called 'Cookie.js' as shown below and link to your
sketch.

{% include youtube.html id="PcwNelvyUg8" %}

Open the project folder on the left of the p5js editor and click into the new
'Cookie.js' file. Paste the code below into the file and save the project.

{% highlight javascript linenos %}
/**
 * This class defines a 'Cookie' object. 
 * Doesn't do much, but in my imagination it is delicious.
 */
class Cookie {  
  // The constructor is a special function that creates a new object.
  // This constructor takes two arguments: one for the sweetness
  // and one for whether the cookie has icing or not.
  constructor(sweetness, icing){
    // The 'this' keyword refers to the newly created object.
    // Here, we are storing some data inside the object.
    this.sweetness = sweetness;
    this.hasIcing = icing;
    this.isBaked = false;
  }
  
  // The class definition also specifies what functions objects have
  bake(){
    // Functions can reference data inside the object with 'this'
    this.isBaked = true;
  }
  
  // The functions of the class can also return values.
  // This function returns the sweetness of the cookie.
  taste(){
    return this.sweetness;
  }
}
{% endhighlight %}

The `class` keyword tells JavaScript that we are defining a class. Whatever name
you write after `class` (in this case `Cookie`) will be the name of the class.
After this comes a block of code contained in curly brackets. Everything in this
block of code is the definition of the class.

Now switch back to the main tab of your sketch. Paste in the following code to
declare and initialize and use a cookie object in your sketch. This code uses
the class definition for cookies to create a new cookie object and display some
information about it on the console and on the canvas.

{% highlight javascript linenos %}
// Simple demo of defining an object in a class.
let myCookie;

function setup(){
  createCanvas(150, 150);
  
  // Create a new cookie with sweetness 10 and no icing.
  myCookie = new Cookie(10, false);

  // Use console.log to show some information about the cookie
  console.log("Baked: " + myCookie.isBaked);
  
  // Bake the cookie
  myCookie.bake();  

  // Now the cookie is baked
  console.log("Baked: " + myCookie.isBaked);
}

function draw(){
  background(200);

  // Display the sweetness of the cookie.
  text("Sweetness of the cookie is: " + myCookie.taste(),
    10, 10, 130, 130);
}
{% endhighlight %}

Click through to the following example to see a live version that you can copy
and edit.

<ul class="code-list">

  {% include example_card.html name="Cookie class" thumb="images/cookie-thumb.png" link="https://editor.p5js.org/awarua/sketches/x8UngPVpM" caption="Simple cookie class." %}

</ul>

<div class="task">
  <p><strong>Activity:</strong> using the 'cookie class' example above, try the
  following to test your understanding</p>
  <ul>
    <li>
      Try adding a second cookie variable. Give it a different sweetness when
      you create it. Use `console.log()` to check that it is different.
    </li>
    <li>
      Add a `show()` function to your Cookie class. Make this depend on
      whether the cookie is baked or not, and how sweet it is. Make it so that
      different cookies are displayed differently on screen.
    </li>
  </ul>
</div>

Now you know how to create a new file for your class definition to keep your
code organized, how to define a class with the `class` keyword, how to declare
variables within your class, what a constructor function is, how to add other
functions to your class and how to declare, instantiate and use objects from
your main p5js sketch.

## Making an Aquarium

Now that you know how to define and use your own classes, your tutor will work
through an example with you of creating a 'Fish' object that can swim around on
screen.

![Aquarium]({{site.baseurl}}{{page.url}}images/aquarium.png)

First, we will need to define a class to create fishes. Create a new p5js
sketch, make a new file for the Fish class, and link it to your sketch in the
`index.html` file.

When you are first defining your class, you should ask yourself questions like:

* What information will we need to store in the fish?
* What information will we need to know in order to create a new fish?

In the example below, we will just record the x and y position as well as the
xVelocity and the yVelocity of the fish. When we create a fish, we will just
need to supply the initial x and y position. We will choose a random starting
velocity.

{% highlight javascript linenos %}
// The Fish class defines fish objects, that move around on the
// screen and change direction when they bump into the walls.
class Fish {
  // Constructor function for a new fish.
  // Requires x, y position where the fish is to be created.
  constructor(x, y){
    // Record the x and y position inside 'this'
    this.x = x;
    this.y = y;

    // Pick a random starting velocity
    this.xVel = random(-1, 1);
    this.yVel = random(-1, 1);
  }

  // Methods left out...
}
{% endhighlight %}

### Add a 'show' function

Next, we should think about how to display the fish on the canvas. The code
listing below defines a 'show' function that draws a triangle pointing in the
direction that the fish is heading. Note the use of the `push()`,
`translate()`, and `rotate()` functions that were introduced in
[Tutorial 7](../tut07).

Copy and paste this into your `Fish` class **between the curly brackets**.

{% highlight javascript linenos %}
  // Function to display the fish on the canvas.
  show(){
    // push matrix to save previous state
    push();

    // Translate to the x, y position of the fish.
    translate(this.x, this.y);

    // Draw a triangle to represent the fish
    triangle(20, 0, -10, -10, -10, 10);

    pop();
  }
{% endhighlight %}

<div class="task">
  <p><strong>Suggestion:</strong> The display function above is a bit boring</p>
  <ul>
    <li>
      What other ways can you think of to display the fish using the drawing
      functions you have already learnt in Processing?
    </li>
    <li>
      Could you find a way to adapt this code to make the fish point in the
      direction it is travelling? (hint: try using the <code>atan2</code>
      function in p5js)
      <!-- see
      <a target="_blank" href="https://youtu.be/xCd6TPclLMU?t=952"
        >demonstration video</a> accompanying last week's lecture). -->
    </li>
  </ul>
</div>

### Add an update function

Now we will add a second function to update the fish, so that it can move around
as the sketch runs. The kind of questions you would ask yourself when
defining a function like this are:

* How do you want the fish change each time?
* Does the fish need information from the environment to update itself?

The function below updates the x and y position each time based on the velocity
of the fish. It also checks whether the fish has gone off one of the sides of
the canvas. If so, it changes the direction. Copy (or adapt) the update function
below into your Fish class **between the curly brackets** to add it do your
class.

{% highlight javascript linenos %}
  // Update the position of the fish depending on its velocity.
  update(){
    this.x += this.xVel;
    this.y += this.yVel;

    // Check whether the fish has gone off the left or right
    if (this.x < 0 || this.x > width){
      // If it has, reverse direction and move back
      this.xVel = -this.xVel;
      this.x += this.xVel;
    }

    // Check whether the fish has gone off the top or bottom
    if (this.y < 0 || this.y > height){
      // If it has, reverse direction and move back
      this.yVel = -this.yVel;
      this.y += this.yVel;
    }
  }
{% endhighlight %}

<div class="task">
  <p>
    <strong>Suggestion:</strong> The update function above does makes the fish
    move, but in a very predictable way. Apart from when they bump into the
    walls, they never change speed or direction.
  </p>
  <ul>
    <li>
      Could you adjust the update function so that the x and y velocity
      changes by a small random amount each time?
    </li>
  </ul>
</div>

### Using the class in the sketch

Now that we have defined the class, it is time to switch back to the main tab
in Processing and *use* the class to use our new fish objects in the sketch.
The code below will declare and initialize a single fish variable and then
update and display it each time `draw()` is called.

{% highlight javascript linenos %}
let myFish;

function setup(){
  createCanvas(600, 400);

  // Create a new fish in the center of the screen.
  myFish = new Fish(width / 2, height / 2);
}

function draw(){
  background(204);

  myFish.update();
  myFish.show();
}
{% endhighlight %}

<div class="task">
  <p>It would be good to add a bit of interactivity to the sketch.</p>
  <ul>
    <li>
      Can you think of ways that a user could interact with the fish through
      keyboard, mouse or other inputs?
    </li>
  </ul>
</div>

### Adding some interactivity

We can make the sketch a little more interesting by adding some simple
interactivity. The code below allows a user to click the mouse to add a fish.

We use an `Array` to store fishes in the code below. As new fishes are created,
we just add them to the array. We don't need to have a separate variable to
keep track of each one individually.

{% highlight java linenos %}
let fishes = [];

function setup(){
  createCanvas(600, 400);

  // Create a first fish in the center of the screen.
  fishes.push(new Fish(width / 2, height / 2));
}

function draw(){
  background(204);

  // Loop over the array and update each fish. 
  for (let f of fishes){
  	f.update();
  	f.show();
  }
}

function mousePressed(){
	fishes.push(new Fish(mouseX, mouseY));
}
{% endhighlight %}

You should now have a complete functioning version of the simple aquarium
sketch. The example below also has a complete example that you can download.

<ul class="code-list">

  {% include example_card.html name="aquarium_example_1" thumb="images/aquarium-example-1-thumb.png" link="https://editor.p5js.org/awarua/sketches/ZsWdIfrpp" caption="Finished version of the aquarium example." %}

</ul>

## Task: Adding to the Aquarium

You should now test your understanding of objects by defining a second class for
some other creature, object or plant to add to the aquarium (e.g. snail,
starfish, submarine, seaweed):

* Work with your neighbor in pairs to implement a new object for the aquarium
* Think about what information your object would need to store (fields)
* Think about what information you would need to create a new object
  (constructor function)
* Think about how it should be drawn to the canvas (show function)
* Think about how it should move/change over time (update function)
* Think about how it can be added to the aquarium through user input
* Think about how it could be interacted with by the user

You should spend 30 minutes to an hour on this activity. At the end of the
session we will pick one example to show to the class.

<div class="task">
  <p><strong>Going further:</strong> Below are some ideas for how you
    could take this activity further:
  </p>
  <ul>
    <li>
      Add ways to vary movement or drawing of the fish to make the collection of
      fishes more diverse
    </li>
    <li>
      Add tail and fins by drawing triangles
    </li>
    <li>
      Use bitmaps instead of drawing triangle. Best with PNG files that have an
      alpha channel.
    </li>
    <li>
      Add fish sounds / other sound effects.
    </li>
    <li>
      Give the aquarium inhabitants ‘thought bubbles’ with text captions.
    </li>
    <li>
      Try turning off the call to `background()` each time through the draw
      function. Does it produce interesting visual traces?
    </li>
  </ul>
</div>

<!-- TODO: Objects tutorial is not ported from Processing to p5js yet

### Further Tutorial

For a further tutorial on working with classes and objects in Processing,
see the below online tutorial.

<ul class="code-list">

  <li>
    <a class="title-link" target="_blank"
       href="https://processing.org/tutorials/objects/"
      >Tutorial: Objects</a>
    <a class="img-link" target="_blank"
      href="https://processing.org/tutorials/objects/"
      ><img alt="Objects Tutorial"
            src="{{site.baseurl}}{{page.url}}images/objects-tutorial.jpg">
    </a>
    An introductory tutorial on Objects. By Daniel Shiffman.
  </li>
</ul>

-->

## Reference links

1. [`atan2`][1]

[1]: https://p5js.org/reference/#/p5/atan2