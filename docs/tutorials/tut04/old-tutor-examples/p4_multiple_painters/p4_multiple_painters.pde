// The following is used for showing on the web. Not needed for Desktop.
/* @pjs reload="data/xavier.jpg"; */

PImage img;
int totalNumberOfPainters = 10;
int[] previousX;
int[] previousY;

void setup() {
  size(400, 400);
  img = loadImage("data/xavier.jpg");
  imageMode(CENTER);
  noStroke();
  background(255);
  
  float middleX = (width / 2);
  float middleY = (height / 2);
  
  totalNumberOfPainters = 5;
  previousX = new int[totalNumberOfPainters];
  previousY = new int[totalNumberOfPainters];
  for(int i = 0; i < totalNumberOfPainters; i = i + 1) {
    previousX[i] = int(middleX);
    previousY[i] = int(middleY);
  }
}

void draw() { 
  for(int i = 0; i < totalNumberOfPainters; i = i + 1) {
    paint(i);
  }
}

void paint(int i) {
  int x = int(random(img.width));
  int y = int(random(img.height));
  color pix = img.get(x, y);
  fill(pix, 128);
  previousX[i] = int(previousX[i] + (random(-4, 5)));
  previousY[i] = int(previousY[i] + (random(-4, 5)));
  int ellipseWidth = int(random(1, 10));
  ellipse(previousX[i], previousY[i], ellipseWidth, ellipseWidth);
}
