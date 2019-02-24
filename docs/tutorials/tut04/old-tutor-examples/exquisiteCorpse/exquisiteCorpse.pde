/* exquisite corpse 
 * ALL IMAGES by NMIT Illustration students 2010
 * basic example using three images with background
 * key presses change images of each section ( top, middle bottom)
 * By Gavin Sade 2014
 */

// The following lines are used for showing on the web. Not needed for Desktop.
/* @pjs reload="data/background.png"; */
/* @pjs reload="data/head_00.png,data/head_01.png,data/head_02.png,data/head_03.png"; */
/* @pjs reload="data/body_00.png,data/body_01.png,data/body_02.png,data/body_03.png"; */
/* @pjs reload="data/legs_00.png,data/legs_01.png,data/legs_02.png,data/legs_03.png"; */


// variables to store number of current image to display
int currHead = 0;
int currBody = 0;
int currLegs = 0;
int numHeads = 4;
int numLegs = 4;
int numBody = 4;


PImage bkg;

// arrays (lists) to store all of the images for each section
PImage[] top = new PImage[numHeads];
PImage[] middle = new PImage[numBody];
PImage[] bottom = new PImage[numLegs];

void setup() {

  // create canvas
  size(612,840);

  // frame rate
  frameRate(24);

  bkg = loadImage("data/background.png");


  for(int i = 0; i < numHeads; i++) {
    String imageName = "data/head_" + nf(i,2) + ".png"; 
    top[i]  = loadImage(imageName);
    println(imageName);
  }


  for(int i = 0; i<numBody; i++) {
    String imageName = "data/body_" + nf(i,2) + ".png"; 
    middle[i]  = loadImage(imageName);
    println(imageName);
  }



  for(int i = 0; i<numLegs; i++) {
    String imageName = "data/legs_" + nf(i,2) + ".png"; 
    bottom[i]  = loadImage(imageName);
    println(imageName);
  }

}

// draw function, happens continually at set frame rate
void draw() {
  background(0);
  image(bkg, 0, 0);
  // draw currently selected images.
  // change position values based on composition
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
