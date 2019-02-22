/**
 * Animate the position of a ball depending on noise.
 *
 * Jared Donovan 2018.
 */
 
float xSample = 0.0;
float inc = 0.01;
 
void setup(){
  size(600, 400);
  fill(0, 255, 0);
  noStroke();
}

void draw(){
  background(204);
  // X will have a value between 0..1
  float x = noise(xSample);
  
  // Scale up the value of x from 0..1 to 100..500
  x = 100 + x * 400;
  
  // Use the value of x to draw a circle
  ellipse(x, height / 2, 100, 100);
  
  // Change the sample point, so we get a slightly different
  // value for x each time. 
  xSample += inc;
}

void keyPressed(){
  save("noise_animation-screenshot.png");
}
