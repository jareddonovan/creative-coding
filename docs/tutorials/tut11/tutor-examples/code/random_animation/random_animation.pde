/**
 * Animate the position of two balls depending on randomness.
 *
 * Jared Donovan. 
 */
 
float redX;
float blueX;
float redTarget;
float blueTarget;
 
void setup(){
  size(600, 400);
  noStroke();
  
  redX = width / 2;
  blueX = width / 2;
}

void draw(){
  background(204);
  
  // Every 100 frames, set a new x target to animate to.
  if (frameCount % 25 == 0){  
    redTarget = random(100, 500);
    blueTarget = width / 2 + randomGaussian() * 50;
  }  
  
  // Figure out the difference between the current 
  // position and the target and animate towards it. 
  float moveRed = (redTarget - redX) / 25.0;
  redX += moveRed;
  
  float moveBlue = (blueTarget - blueX) / 25.0;
  blueX += moveBlue;
  
  fill(255, 0, 0);
  ellipse(redX, 100, 100, 100);
  
  fill(0, 0, 255);
  ellipse(blueX, 300, 100, 100);
  
}

void keyPressed(){
  save("random_animation-screenshot.png");
}
