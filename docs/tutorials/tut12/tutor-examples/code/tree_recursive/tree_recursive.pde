/**
 * This sketch will produce an image of a tree. 
 * Jared Donovan, n1234567
 * Based on examples from...
 */

void setup(){
  size(600, 600);
  fill(0);
  noStroke();
}

void draw(){
  background(255);
  
  rect(0, height - 20, width, 20);

  // Change the coord system to the bottom center of the screen.
  pushMatrix();
  translate(width / 2, height - 20);
  rotate(radians(180));  
  drawBranch(0, 0, 40, 200, 0);
  popMatrix();

  noLoop();
}

/** 
 * Draws a branch at the specified coord with width w and length l and angle a.
 */ 
void drawBranch(float x, float y, float w, float l, float a){
  pushMatrix();
  translate(x, y);
  rotate(radians(a));
  rect(-w / 2, 0, w, l);
  
  // Keep drawing sub-branches (with smaller width) as long as
  // the width of this branch is greater than 10.
  if(w > 10){
    // Draw 4 sub-branches at different angles.
    for(int i = 0; i < 4; i++){
      drawBranch(0, random(l / 2, l), w / random(1.2, 2), l / random(1.1, 1.5), -45 + (i * 30));
    }
  }
  
  popMatrix();
}
