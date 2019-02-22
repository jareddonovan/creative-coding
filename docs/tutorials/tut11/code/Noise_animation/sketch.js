/**
 * Animate the position of a ball depending on noise.
 *
 * Jared Donovan 2018.
 */
 
let xSample = 0.0;
let inc = 0.01;
 
function setup(){
  createCanvas(600, 400);
  fill(0, 255, 0);
  noStroke();
}

function draw(){
  background(204);
  // X will have a value between 0..1
  let x = noise(xSample);
  
  // Scale up the value of x from 0..1 to 100..500
  x = 100 + x * 400;
  
  // Use the value of x to draw a circle
  ellipse(x, height / 2, 100, 100);
  
  // Change the sample point, so we get a slightly different
  // value for x each time. 
  xSample += inc;
}

function keyPressed(){
  save("noise_animation-screenshot.png");
}