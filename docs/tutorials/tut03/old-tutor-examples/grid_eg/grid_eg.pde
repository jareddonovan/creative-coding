/*
 * DXB211 Programming for Visual Designers
 * Repetition - drawing a grid functions
 * by Gavin Sade
 * Copyright (c) 2014 QUT
 *
 * example  where I use dist() and map() functions
 */

int f = 0;

// Setup function -- called only once when the program begins
void setup() {
  //  set the size of the display area / window
  size(600, 700);

  //set the background colour
  background(122, 122, 122);


  // frameRate(5);
}



// the draw function -- called continuously while program is running
void draw() {
  background(255);
  randomSeed(10);
  // then look at nesting for loops to make a grid.
  // nested for loop
  for (int y=0; y<height; y=y+20) {
    for (int x=0; x<width; x=x+20) {
      float d = abs(dist(mouseX, mouseY, x, y));
      float w = 10 + random(100);
      //map(value, start1, stop1, start2, stop2)
      float g = map(mouseY, 0, height, 0, 255);
      fill(100, 0, g, 30);
      rect(x, y, d/5, d/5);
    }
  }
}


// function to handle key events
void keyReleased() {
  // if s is pressed save an image
  if (key == 's') { //<>//
    save("myImage.png");
  }

  // if r is pressed reset by drawing background
  if (key == 'r') {
    background(122, 122, 122);
  }
}
