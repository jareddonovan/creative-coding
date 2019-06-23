// Variation of 10 Print  sketch
// http://10print.org/
// vary parameters

PImage computerOn;
PImage computerOff;

int w = 35; // cell width
int h = 35; // cell height
int index = 0; // counter

void setup() {
  size(600, 600);
  background(#0000ff);
  strokeWeight(3);
  stroke(255);
  smooth();
  frameRate(25);
  
  computerOn = loadImage("data/computerOn.png");
  computerOff = loadImage("data/computerOff.png");
  
  createMaze();
}

void draw() {
  // do nothing here as I redraw maze only on r key.
  createMaze();
}


void createMaze() {
  background(#ff0000);
  //int r = int (random(3, 50));
  int r = 50;
  w = r; // cell width
  h = r; // cell height
  strokeWeight(1);
  // may need to sketch this on paper or whiteboard 
  // to explain the details
  for (int y=0; y < (height/w); y++) {
    for (int x=0; x < (width/w); x++) {
      int x1 = w*x;
      int x2 = x1 + w;
      int y1 = h*y;
      int y2 = h*(y+1);
      noFill();
      if (random(2) > 1) {  // use a random function to decide  orientation 
       // draw an image to the screen
       image(computerOn,x1,y1,w,w);
      } else {
        // draw an image to the screen
        image(computerOff,x1,y1,w,w);
      }
    }
  }
}


// function to handle key events
void keyReleased() {
  // if s is pressed save an image
  if (key == 's') {
    save("myImage.png");
  }

  // if r is pressed reset by drawing background
  if (key == 'r') {
    createMaze();
  }
}