// Simple sketch to show how fast the frameRate is going.

PFont font;

void setup(){
  size(1000, 100);
  font = loadFont("Consolas-24.vlw");
  smooth();
  textFont(font);
  textSize(24);
  noCursor();
}

void draw(){
  frameRate(max(mouseX, 1));
  background(200);
  fill(255);
  float w = textWidth(str(int(frameRate)));
  text(int(frameRate), width - w - 10, height / 2 + 24);
  fill(0);
  w = textWidth(str(frameCount));
  text(frameCount, width - w - 10, height);
  drawWheel(mouseX, mouseY);
}

// Draws a wheel at x, y, which spins depending on the frameRate
void drawWheel(int x, int y){
  pushMatrix();
  translate(x, y);
  rotate(radians(frameCount));
  noFill();
  stroke(0);
  ellipse(0, 0, 50, 50);
  for(int i = 0; i < 12; i++){
    rotate(radians(360 / 12));
    line(0, 0, 0, 27);
  }
  popMatrix();
}
