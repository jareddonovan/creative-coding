/*
 * DXB303 Programming for Visual Designers
 * Repetition - and random functions
 * by Gavin Sade
 * Copyright (c) 2014 QUT
 *
 * Interaction
 * Use a for loop to draw a series of vertical lines across the canvas
 * Use the random function to vary a visual parameter (length, stroke etc)
 * change from line to rect or ellipse
 * vary other properties
 * 
 * ACTIVITY
 * Vary the function, and draw parameters
 * vary line spacing with mouse input, or key input
 * move to drw() see variation
 * useRandomSeed() with a constant in draw() see difference.
 */


// Setup function -- called only once when the program begins
void setup() {
  //  set the size of the display area / window
  size(600, 700);

  //set the background colour
  background(122, 122, 122);


  // three different for loops which draw vertical lines across the canvas

  // Using Random  - do this in setup to see the pattern, or set framerate to lower number
  for (int x=0; x< width; x=x+2) {
    float y = random(100);
    line(x, 150, x, 150-y); // line
    ellipse(x, 150-y, 3, 3); // dot at end of line
  }

  // USING randomGausian  function
  for (int x=0; x< width; x+=5) {
    float y = 50*randomGaussian();
    line(x, 300, x, y+300);
    ellipse(x, y+300, 3, 3); // dot at end of line
  }



  // Using Random  - do this in setup to see the pattern, or set framerate to lower number
  for (int x=0; x< width; x=x+10) {
    float y = random(100);
    float w = random(5);
    strokeWeight(w);
    line(x, 550, x, 550-y); // line
    strokeWeight(1);
    ellipse(x, 550-y, w+3, w+3); // dot at end of line
  }


  // USING randomGausian  function
  // Add noise to vary angle
  float off = 0.0;
  for (int x=0; x< width; x+=2) {
    float y = random(50);
    float offset = noise(off) * 20;
    line(x+offset, 650, x, 650-y);
    off+= 0.5;
  }


  frameRate(5);
}



// the draw function -- called continuously while program is running
void draw() {

  //background(255, 255, 255);
}


// function to handle key events
void keyReleased() {
  // if s is pressed save an image
  if (key == 's') {
    save("myImage.png");
  }

  // if r is pressed reset by drawing background
  if (key == 'r') {
    background(122, 122, 122);
  }
}

