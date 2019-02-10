/*
 * DXB211 Creative Coding
 * Basic Drawing Program 
 * by Gavin Sade
 * Copyright (c) 2014 QUT
 *
 * A very simple drawing example
 * draw a line between current mose location and last location
 * 
 * ACTIVITY
 * Vary other params using mouse location
 * Draw on mouse down
 * Vary line properties
 * change colour mode to HSV and vary HUE with mouse location.
 */

// "global" variables
let lastX;
let lastY;

// Setup function -- called only once when the program begins
function setup() {
  //  set the size of the display area / window
  createCanvas(600, 700);

  //set the background colour
  background(255, 255, 255);

  // set the rectanble mode to draw from the centre with a specified radius
  rectMode(RADIUS);

  lastX = mouseX;
  lastY = mouseY;
}


// the draw function -- called continuously while program is running
function draw() {
  fill(0, 0, 0, 10);
  rect(0, 0, width, height);

  if (mouseIsPressed) {
    // draw line
    stroke(200, 200, 200, 255); // set the stroke colour to a grey with transparency 
    line(mouseX, mouseY, lastX, lastY);

    // draw ellipse
    stroke(mouseX, 200, mouseY, 255); // set the stroke colour to a red 
    noFill(); // turn off fill so have outline of ellipse only

    let d = dist(mouseX, mouseY, lastX, lastY); // function to get distance between two points
    d = abs(d/4); // make it always positive with abs, and divide by a factor to reduce scale

    ellipse(mouseX, mouseY, d, d);
    ellipse(mouseX, mouseY, d*2, d*2);
    ellipse(mouseX, mouseY, d*4, d*4);


    //set curr position as last
    lastX = mouseX;
    lastY = mouseY;
  }
}


// function to handle key events
function keyReleased() {
  // if s is pressed save an image
  if (key == 's') {
    save("myImage.png");
  }

  // if r is pressed reset by drawing background
  if (key == 'r') {
    background(122, 122, 122);
  }
}