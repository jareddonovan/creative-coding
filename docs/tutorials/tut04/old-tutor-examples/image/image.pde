// load and display an image

PImage jellyFish;
PImage stars;

void setup() {
  size(1024, 640);
  // load the image into the variable
  jellyFish = loadImage("jelly.jpg");
  stars = loadImage("stars.jpg");
}

void draw() {
  image(jellyFish, 0, 0);
  tint(255, 127);
  image(stars,0,0);
}