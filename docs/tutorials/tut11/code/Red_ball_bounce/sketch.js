/**
 * Creates a simple animation of a red ball 'bouncing'
 *
 * Jared Donovan 2018
 */

// How high the ball should bounce. 
let bounceHeight = 300;

// How quickly the ball should bounce. Larger = slower!
let bounceSpeed = 10;

// Size and position of the ball. 
let ballSize = 50;
let ballX = 300;
let ballY;

function setup(){
  createCanvas(600, 400);
  fill(255, 0, 0);
  noStroke();
}

function draw(){
  // Clear the background
  background(204);
  
  // Use the frameCount to calculate a y-value for the ball
  // so it bounces up and down. 
  ballY = sin(frameCount / bounceSpeed) * bounceHeight;
    
  // BallY will be between -bounceHeight and bounceHeight. 
  // Use the abs() function to make it positive only.
  ballY = abs(ballY);
  
  // Set the position to bounce from the bottom of the screen. 
  ballY = height - (ballSize / 2) - ballY;
    
  ellipse(ballX, ballY, ballSize, ballSize);
}