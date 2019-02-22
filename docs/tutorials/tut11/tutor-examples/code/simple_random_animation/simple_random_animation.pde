/**
 * Animate the position of two balls depending on randomness.
 *
 * Jared Donovan. 
 */
 
float redX;
float blueX;
 
void setup(){
  size(600, 400);
  noStroke();
  
  redX = width / 2;
  blueX = width / 2;
}

void draw(){
  background(204);
  
  // Pick a new random x position.
  redX = random(-20, 20);
  blueX = randomGaussian() * 5;

  // Place the two balls relative to the middle of the screen.
  redX = width / 2 + redX;
  blueX = width / 2 + blueX;
  
  fill(255, 0, 0);
  ellipse(redX, 100, 100, 100);
  
  fill(0, 0, 255);
  ellipse(blueX, 300, 100, 100);
  
}

void keyPressed(){
  save("simple_random_animation-screenshot.png");
}
