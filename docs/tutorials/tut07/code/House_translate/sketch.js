/**
 * Draws three houses each larger than the one before. 
 * The houses stand on a field of verdant green beneath a sky
 * of crystal blue. Just like the ones you drew as a kid.
 *
 * Demonstrates the use of transformation functions as well as
 * push() and pop() to save and reset transformation
 * state.
 *
 * Jared Donovan 2018.
 */

// Declare some global variables for storing colours.
let blue;
let green;
let red;
let yellow;

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  
  // Initialise the colour variables.
  blue = color(114, 230, 240);
	green = color(6, 147, 89);
	red = color(193, 6, 50);
	yellow = color(239, 240, 114);
}

function draw() { 
  // Summery blue sky
  background(blue);

  // Draw verdant grass
  fill(green);
  rect(300, 330, 600, 140);

  // Draw three houses, each larger than the one before.
  drawHouse(100, 250, 0.5);
  drawHouse(200, 250, 1.0);
  drawHouse(400, 250, 2.0);
  
  // Draw the Summery sun
  fill(yellow);
  ellipse(130, 80, 30, 30);
  
  noLoop();
}

// Draws a single childlike house.
function drawHouse(x, y, s) {

  // Save the previous transformation.
  push();

  // Move to the x, y position and scale.
  translate(x, y);
  scale(s, s);

  // Draw the wall, roof and door.
  fill(255);
  rect(0, 0, 100, 100);
  fill(red);
  triangle(-60, -50, 60, -50, 0, -110);
  fill(yellow);
  rect(0, 10, 30, 80);

  // Draw windows
  drawWindow(-30, -15);
  drawWindow(30, -15);
  drawWindow(0, -15);

  // Reset the drawing to where we were before drawing.
  pop();
}

// Draws a single diamond faceted window.
function drawWindow(x, y) {
  // Save the previous transformation so we can reset.
  push();

  translate(x, y);
  rotate(radians(45));
  fill(blue);
  rect(0, 0, 12, 12); 
  line(-6, -6, 6, 6);
  line(-6, 6, 6, -6);

  // Reset to previous transformation.
  pop();
}
