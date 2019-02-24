// The following is used for showing on the web. Not needed for Desktop.
/* @pjs reload="data/xavier.jpg"; */

PImage img;
float previousX, previousY;

void setup() {
  size(400, 400);
  img = loadImage("data/xavier.jpg");
  imageMode(CENTER);
  noStroke();
  background(255);
  previousX = (width / 2);
  previousY = (height / 2);
}

void draw() { 
  int x = int(random(img.width));
  int y = int(random(img.height));
  color pix = img.get(x, y);
  fill(pix, 128);
  previousX = previousX + (random(-5, 5));
  previousY = previousY + (random(-5, 5));
  ellipse(previousX, previousY, mouseX, mouseX);
}
