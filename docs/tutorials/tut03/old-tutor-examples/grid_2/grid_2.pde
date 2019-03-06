/*
 * DXB211 Programming for Visual Designers
 * Repetition - drawing a grid 
 * by Gavin Sade
 * Copyright (c) 2014 QUT
 * *
 * 
 * ACTIVITY
 * draw in setup first and vary patterns
 * try rects, and ellipse, change params of each draw,  draw multiples
 * move to draw() 
 * try random function in draw() see movement
 * add key input
 * add mouse input
 */

// declare grid properties
int numTiles = 50;
float cellW, cellH; // width and height of a grid cell

// Setup function -- called only once when the program begins
void setup() {
  //  set the size of the display area / window
  size(600, 600);
  smooth(); // draw smoother lines

  //set the background colour
  background(255, 255, 255);
}



// the draw function -- called continuously while program is running
void draw() {

  background(255, 255, 255);

  //work out based on size of canvas
  cellW = width/float(numTiles);  // number tiles is an int so make float for division
  cellH = height/float(numTiles);


  noFill();

  randomSeed(10); // so we get same random num sequence each draw


  // a more detailed grid method based on number of tiles 
  for (int cellY=0; cellY<numTiles; cellY++) {
    for (int cellX=0; cellX<numTiles; cellX++) {

      // work out position for grid cell (helps to draw this to understand)
      int x = width/numTiles*cellX;
      int y = height/numTiles*cellY;

      // draw what ever you want to draw into a grid cell here
      // shapes, lines etc
      rect(x, y, cellW, cellH);
      rect(x+cellW/2, y+cellH/2, 2, 2); // rect drawn from x,y as top left, hence adding half width of cell.

      int toggle = (int) random(0, 2); // use range for random, and make result an int
      // use toggle  and if statement to draw something else.
      if (toggle == 1) {
       // line(x, y, x+width/numTiles, y+height/numTiles);
      }
    }
  }
}


// function to handle key events
void keyReleased() {
  // if s is pressed save an image
  if (key == 's') {
    save("myImage.png");
  }

  if (key == 'a') {
    numTiles = numTiles+1; //change number of tiles with key input
  }

  // if r is pressed reset by drawing background
  if (key == 'r') {
    background(122, 122, 122);
  }
}

