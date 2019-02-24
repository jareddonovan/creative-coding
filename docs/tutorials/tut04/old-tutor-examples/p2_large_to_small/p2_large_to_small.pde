// The following is used for showing on the web. Not needed for Desktop.
/* @pjs reload="data/xavier.jpg"; */

PImage img;
float previousEllipseWidth;

void setup() {
  size(400, 400);
  img = loadImage("data/xavier.jpg");
  imageMode(CENTER);
  noStroke();
  background(255);
  previousEllipseWidth = width;
}

void draw() { 
  int x = int(random(img.width));
  int y = int(random(img.height));
  color pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, previousEllipseWidth, previousEllipseWidth);
  if(previousEllipseWidth > 4) {
    previousEllipseWidth = previousEllipseWidth - 0.1;
  }
}
