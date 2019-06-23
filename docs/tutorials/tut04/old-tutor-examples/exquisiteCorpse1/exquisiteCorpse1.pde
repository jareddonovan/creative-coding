/* exquisite corpse 
 * ALL IMAGES by NMIT Illustration students 2010
 * basic example using three images with background
 * key presses change images of each section ( top, middle bottom)
 */

// variables to store number of current image to display
int currHead = 0;
int currBody = 0;
int currLegs = 0;
int numHeads = 4;
int numLegs = 5;
int numBody = 3;


PImage bkg;

// arrays (lists) to store all of the images for each section
PImage[] top = new PImage[numHeads];
PImage[] middle = new PImage[numBody];
PImage[] bottom = new PImage[numLegs];

void setup() {

  // create canvas
  size(1024,840);

  // frame rate
  frameRate(22);

 // bkg = loadImage("background.png");


  for(int i = 0; i<numHeads; i++) {
    String imageName = "head_" + nf(i,2) + ".png"; 
    top[i]  = loadImage(imageName);
    println(imageName);
  }


  for(int i = 0; i<numBody; i++) {
    String imageName = "body_" + nf(i,2) + ".png"; 
    middle[i]  = loadImage(imageName);
    println(imageName);
  }



  for(int i = 0; i<numLegs; i++) {
    String imageName = "legs_" + nf(i,2) + ".png"; 
    bottom[i]  = loadImage(imageName);
    println(imageName);
  }

}

// draw function, happens continually at set frame rate
void draw() {
  background(0);
 // image(bkg, 0, 0);
  // draw currently selected images.
  // change position values based on composition
 // tint(0, mouseX, mouseY); 

  image(bottom[currLegs], 0, 0);
  image(middle[currBody], 0, 0);
  image(top[currHead], 0, 0);

}


// function which occurs when a key is pressed
void keyPressed() {
  // change the top image on key a
  if (key == 'a') {
    currHead = currHead + 1;
    if (currHead >= numHeads) {
      currHead=0;
    }
  }

  // change middle image on key s
  if (key == 's') {
    currBody = currBody + 1;
    if (currBody >= numBody) {
      currBody=0;
    }
  }

  // change bottom image on key d
  if (key == 'd') {
    currLegs = currLegs + 1;
    if (currLegs >= numLegs) {
      currLegs=0;
    }
  }
}