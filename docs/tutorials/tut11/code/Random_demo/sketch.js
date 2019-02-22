/**
 * Demo of the random() function.
 * Choose an x position using the random function.
 * Draw a transparent stroke each time at that location.
 * You should see strokes randomly spread across the page. 
 *
 * Jared Donovan 2018
 */
 
function setup(){
  createCanvas(700, 100);
  background(255);
  stroke(0, 20);
}

function draw(){
  // Choose a random x position somewhere between 0..width
  let x = random(width);
  
  // Draw a line at x. Over time, lines will build up. Evenly spread across the page. 
  line(x, 0, x, height);  
  
  if (frameCount == 1000){
    keyPressed();
  }
}

function keyPressed(){
  saveCanvas("random_demo-screenshot.png");
}