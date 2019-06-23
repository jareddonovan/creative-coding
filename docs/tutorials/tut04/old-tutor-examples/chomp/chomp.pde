
// image list
PImage[] images = new PImage[3];

void setup() {
  size(100, 100);
  background(0);
  for (int i = 1; i < 4; i++ ) {
    images[i-1]  = loadImage("face" + i + ".png");
    images[i-1].resize(100, 100);
  }
  frameRate(10);
}


void draw() {

  int s = millis() % 3;
  image(images[s].get(), 0, 0);
}