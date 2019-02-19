---
title: "Tutorial 9: Objects and Functions"
tut_num: 9
layout: tutorial
---

<p class="lead">
  In this week's class, we will introduce the concept of Object Oriented
  programming. You will work through an example in class in which you
  create some of your own objects and employ them in a simple interactive
  Processing sketch.
</p>

### Tutorial Overview

1. Demonstration
2. Activity - create an object of your own
3. Assignment 2 - working time

## Demonstration

In this demonstration, we are going to work through the process of creating an
object and using it in a simple interactive sketch. You should follow along as
your tutor works through the example to make sure you have a working version on
your computer and understand how it works. We are going to build an 'aquarium'.
The aquarium is going to have some 'fish' in it that can swim around.

For this, we are going to use something called an object. An object is a special
kind of datatype that we define that can include both data of its own, and
functions of its own to act on that data. We have already worked with a number
of the built in objects that Processing provides, such as `Strings`, `PFonts`,
and `PImages`, so this should already be familiar to you.

![An object can contain data and functions]({{site.baseurl}}{{page.url}}images/object.png)

### Defining an Object

In order to create our own objects, we need to do a little bit of work. We need
to describe all the parts that make up an object, including the kinds of data
it needs to store, all the functions it can perform and what kind of
information it requires to be created. Together, this information forms the
`class` definition of the object.

One way to think about it is that the `class` is like a cookie cutter. It has
all the information you need to create individual cookies.

![cookie cutter]({{site.baseurl}}{{page.url}}images/cookie-cutter.png)

The class is different to the objects it creates though. The class is the
definition, the object is the instantiation. To continue the analogy, if the
class definition is like a cookie cutter, then the objects we create with it are
like cookies. Delicious cookies.

![cookies]({{site.baseurl}}{{page.url}}images/cookies.png)

To keep your code organised, it's a good idea to put your class definition in
a new tab. Create a new tab called 'Cookie' as shown below and save your sketch.

<iframe width="414" height="248" src="https://www.youtube.com/embed/iUgZYZ1hbTU?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

If you open up the folder where the sketch is saved, you should now see that
it has two files in it. One for your main sketch file and one for the 'Cookie'
tab that you just created. Any other tabs that you create will also be saved
as separate `.pde` files in your sketch folder.

![Cookie tab file]({{site.baseurl}}{{page.url}}images/cookie-demo-files.png)

Switch back to your sketch, and paste the code below into the 'Cookie' tab. The
`class` keyword tells Processing that we are defining a class. Whatever name you
write after `class` (in this case `Cookie`) will be the name of the class.
After this comes a block of code contained in curly brackets. Everything in this
block of code is the definition of the class.

{% highlight javascript linenos %}
/**
 * This class defines a 'Cookie' object.
 * Doesn't do much, but in my imagination it is delicious.
 */
class Cookie {

  // The class defines what data the objects need to store.
  int sweetness = 0;
  boolean hasIcing = false;
  boolean isBaked = false;

  // The constructor is a special function that creates a new object.
  // This constructor requires an integer and a boolean.
  Cookie(int sweetness, boolean icing){
    this.sweetness = sweetness;
    this.hasIcing = icing;
  }

  // The class also defines functions that the objects can perform
  // This function will change the state of the object from unbaked, to baked.
  void bake(){
    this.isBaked = true;
  }

  // Like other functions, the functions of the class can also return values
  // This function returns the sweetness of the cookie as an integer.
  int taste(){
    return this.sweetness;
  }
}
{% endhighlight %}

Now switch back to the main tab of your sketch. Paste in the following code to
declare and initialize and use a cookie object in your sketch.

{% highlight javascript linenos %}
// Simple demo of defining an object in a class.
Cookie myCookie;

void setup(){
  size(600, 600);

  // Create a new cookie with sweetness 10 and no icing.
  myCookie = new Cookie(10, false);

  // Bake the cookie
  myCookie.bake();

  // Print out the sweetness of the cookie.
  console.log("Sweetness of the cookie is: " + myCookie.taste());
}

void draw(){

}
{% endhighlight %}

<div class="task">
  <p><strong>Activity:</strong> try the following to test your understanding</p>
  <ul>
    <li>
      Try adding a second cookie variable. Give it a different sweetness when
      you create it. Use `console.log()` to check that it is different.
    </li>
    <li>
      Add a `display()` function to your Cookie class. Make this depend on
      whether the cookie is baked or not, and how sweet it is. Make it so that
      different cookies are displayed differently on screen.
    </li>
  </ul>
</div>

Now you know how to create a new tab for your class definition, how to
define a class with the `class` keyword, how to declare variables within your
class, what a constructor function is, how to add other functions to your class
and how to declare, instantiate and use objects from your main Processing
sketch.

## Making an Aquarium

Now that you know how to define and use your own classes, your tutor will work
through an example with you of creating a 'Fish' object that can swim around on
screen.

![Aquarium]({{site.baseurl}}{{page.url}}images/aquarium.png)

First, we will need to define a class to create fishes. Create a new processing
sketch and make a new tab for the Fish class. When you are first defining your
class, you should ask yourself questions like:

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
  // Variables to record the x,y position and the x,y velocity.
  float x;
  float y;
  float xVel;
  float yVel;
  
  // Constructor function for a new fish.
  // Requires x, y position where the fish is to be created.
  Fish(float x, float y){
    this.x = x;
    this.y = y;
  
    // Pick a random velocity to begin with
    this.xVel = random(-1, 1);
    this.yVel = random(-1, 1);
  }

  // Methods left out...
}
{% endhighlight %}

### Add a display function

Next, we should think about how to display the fish on the canvas. The code
listing below defines a display function that draws a triangle pointing in the
direction that the fish is heading. Note the use of the `push()`,
`translate()`, and `rotate()` functions that were introduced in
[Tutorial 7](../tut07).

Copy and paste this into your `Fish` class **between the curly brackets**.

{% highlight javascript linenos %}
// Function to display the fish on the canvas.
void display(){
  // push an pop matrix to save / reset the coordinate system
  push();

  // Translate to the x, y position of the fish.
  translate(x, y);

  // Draw a triangle to represent the fish
  // (20, 0) = nose, (-10, -10) = top fin, (-10, 10) = bottom fin
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
      direction it is travelling? (hint: see
      <a target="_blank" href="https://youtu.be/xCd6TPclLMU?t=952"
        >demonstration video</a> accompanying last week's lecture).
    </li>
  </ul>
</div>

### Add an update function

The final thing we need to do to complete our fish class is define another
function to update the fish. The kind of questions you would ask yourself when
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
void update(){
  x += xVel;
  y += yVel;

  // Check whether the fish has gone off the left or right edges.
  if (x < 0 || x > width){
    // If it has, reverse direction and move back
    xVel = -xVel;
    x += xVel;
  }

  // Check whether the fish has gone off the top or bottom edges.
  if (y < 0 || y > height){
    // If it has, reverse direction and move back
    yVel = -yVel;
    y += yVel;
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
Fish myFish;

void setup(){
  size(600, 400);

  // Create a new fish in the center of the screen.
  myFish = new Fish(width / 2, height / 2);
}

void draw(){
  background(204);

  myFish.update();
  myFish.display();
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
interactivity. The code below allows a user to press the 'f' key and add another
fish at the current mouse position.

We use an `ArrayList` to store fishes in the code below. An `ArrayList` is sort
of like an array, but with one big difference! It can grow and shrink as objects
are added or removed. This makes it much easier to work with scenarios like an
aquarium where we don't know ahead of time exactly how many fish we are going to
have.

`ArrayLists` also let us loop over items in the list using a simpler syntax than
the basic `for` loops we have used until now. Declaring an ArrayList is
also bit different than how we would declare an Array. Check the Processing
reference and the code below, or ask your tutor, to understand how these features
work.

{% highlight java linenos %}
/**
 * Draws an aquarium into which the user can add fish by pressing the 'f' key.
 *
 * Jared Donovan 2018
 **/

// Declare an ArrayList of Fish to store the fishes.
// An ArrayList is like an Array, but it can grow and shrink in size.
// When we declare an ArrayList, we need to say what kind of object
// is going to store. This is why we have written '<Fish>'.
ArrayList<Fish> fishes;

void setup(){
  size(600, 400);

  // Initialize the new ArrayList of Fish.
  fishes = new ArrayList<Fish>();
}

void draw(){
  background(204);

  // Iterate over the array of fishes, update and display each one.
  // Another advantage of an ArrayList is that it allows for a nicer syntax
  // for looping over the collection, as shown below.
  for (Fish f : fishes){
    f.update();
    f.display();
  }
}

// When the user presses the 'f' key, a new fish
// should be added at the current mouse position.
void keyReleased(){
  if (key == 'f'){
    fishes.add(new Fish(mouseX, mouseY));
  }
}
{% endhighlight %}

You should now have a complete functioning version of the simple aquarium
sketch. The example below also has a complete example that you can download.

<ul class="code-list">

  {% include example_card.html name="aquarium_example_2" thumb="images/aquarium-example-2-thumb.png" link="https://editor.p5js.org/awarua/sketches/x8UngPVpM" caption="Finished example of the aquarium example." %}

</ul>

## Task: Adding to the Aquarium

You should now test your understanding of objects by defining a second class for
some other creature, object or plant to add to the aquarium (e.g. snail,
starfish, submarine, seaweed):

* Work with your neighbor in pairs to implement a new object for the aquarium
* Think about what information your object would need to store (fields)
* Think about what information you would need to create a new object
  (constructor function)
* Think about how it should be drawn to the canvas (display method)
* Think about how it should move/change over time (update method)
* Think about how it can be added to the aquarium through user input

You should spend 30minutes to an hour on this activity. At the end of the
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