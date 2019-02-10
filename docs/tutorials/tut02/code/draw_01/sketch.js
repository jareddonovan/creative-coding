/*
 * DXB211 Programming for Visual Designers
 * Week 2, Basic Drawing shape under mouse
 * by Gavin Sade
 * Copyright (c) 2014/2015 QUT
 *
 * A very simple drawing example
 * draw an ellipse under the mouse
 *
 * ACTIVITY :
 * vary other visual parameters used in fill and ellipse,  
 * draw with a rect instead, add stroke etc. 
 * Draw multiple objects each draw() - maybe not all under the mouse
 * Make it work only on mouseDown, 
 * use other keys to change params
 *
 */

// Setup function -- called only once when the program begins

function setup() {
  //  set the size of the display area / window
  createCanvas(600, 700);

  //set the background colour
  background(122, 122, 122);

  // set the rectangle mode to draw from the centre with a specified radius
  rectMode(RADIUS);
}


// the draw function -- called continuously while program is running
function draw() {
  // set the stroke colour to a red 
  stroke(200, 0, 0); 
  // set the fill colour to blue with transparency
  fill(0,0, mouseY, 150); 
  let eRadius = random(20);
  ellipse(mouseX, mouseY, eRadius, eRadius);
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