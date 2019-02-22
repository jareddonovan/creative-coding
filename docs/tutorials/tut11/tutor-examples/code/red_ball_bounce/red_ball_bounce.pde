/**
 * Creates a simple animation of a red ball 'bouncing'
 *
 * Jared Donovan 2018
 */

// How high the ball should bounce. 
float bounceHeight = 300;

// How quickly the ball should bounce. Larger = slower!
float bounceSpeed = 10;

// Size and position of the ball. 
float ballSize = 50;
float ballX = 300;
float ballY;

void setup(){
  size(600, 400);
  fill(255, 0, 0);
  noStroke();
}

void draw(){
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
