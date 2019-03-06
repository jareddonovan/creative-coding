/*
 * DXB211 Programming for Visual Designers
 * Repetition - drawing a grid functions
 * by Gavin Sade
 * Copyright (c) 2014 QUT
 *
 * Interaction
 * Next Draw a Grid of objects
 * long hand
 * multiple for loops
 * nested for loops
 *
 * Look ar completx grid example where load svg graphics to make patterns
 *
 *
 * 
 * ACTIVITY
 * Vary the function, and draw parameters
 * vary line spacing with mouse input, or key input
 * experiement 
 */


// Setup function -- called only once when the program begins
void setup() {
  //  set the size of the display area / window
  size(600, 700);

  //set the background colour
  background(122, 122, 122);

// do this first
  // 1st row of rects
  for (int x=0; x<width; x=x+20) {
    float w = 5 + random(10);
    rect(x, 10, w, 10);
  }

  // 2rd row of rects
  for (int x=0; x<width; x=x+20) {
    float w = 5 + random(10);
    rect(x, 25, w, 10);
  }

  // 3rd row of rects
  for (int x=0; x<width; x=x+20) {
    float w = 5 + random(10);
    rect(x, 40, w, 10);
  }

// then look at nesting for loops to make a grid.
  fill(100, 0, 0, 100);
  // nested for loop
  for (int y=100; y<height; y=y+20) {
    for (int x=0; x<width; x=x+20) {
      float w = 5 + random(10);
      rect(x, y, w, 10);
    }
  }


  // frameRate(5);
}



// the draw function -- called continuously while program is running
void draw() {

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

