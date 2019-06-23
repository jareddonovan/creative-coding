int numFrames = 12;
PImage[] frames = new PImage[numFrames];
int currFrame = 0;

void setup() {
  size(100, 100);

  frameRate(24);
  // load images into the array
  // use a for loop to step through the sequence

  for (int i = 0; i < numFrames; i++) {
    frames[i] = loadImage("data/Computers" + i + ".png");
  }
}


void draw() {

  image(frames[currFrame], 0, 0);

  currFrame = currFrame + 1;

  if (currFrame >= numFrames) {
    currFrame = 0;
  }
}