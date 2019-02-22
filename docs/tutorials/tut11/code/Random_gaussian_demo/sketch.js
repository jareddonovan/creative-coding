/**
 * Demo of the randomGaussian() function.
 * Choose an x position using the randomGausian function.
 * Draw a transparent stroke each time at that location.
 * You should see that more strokes are drawn near the center. 
 *
 * Jared Donovan 2018
 */
 
function setup(){
  createCanvas(700, 100);
  background(255);
  stroke(0, 20);
}

function draw(){
  let x = randomGaussian();
  
  // There is theoretically no minimum or maximum value that the 
  // randomGaussian function will return. But most values will be within the
  // range -2..2, so 'stretch' the value of x to fill more of the screen.
  x = x * 100;
  
  // Group the x around the center of the screen. 
  x = width / 2 + x;
  
  // Draw a line at x. Over time, more lines will be drawn near the middle. 
  line(x, 0, x, height);  
  
  if (frameCount == 1000){
    keyPressed();
  }
  
}

function keyPressed(){
  saveCanvas("random_gaussian_demo-screenshot.png");
}