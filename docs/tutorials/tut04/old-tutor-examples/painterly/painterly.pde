
// The following line is used when showing in a browser. Not needed for Desktop.
/* @pjs preload="data/ange.jpg,data/brad.jpg"; */

PImage Ange;
PImage Brad;
int w;
int h;

void setup() {
  size(515, 620);
  Ange = loadImage("data/ange.jpg");
  Brad = loadImage("data/brad.jpg");
}

void draw() {
  pixelate();
}

void pixelate() {
  int r = int (random(3, 10));
  w = r; // cell width
  h = r; // cell height

  for (int y=0; y < (height/h); y++) {
    for (int x=0; x < (width/w); x++) {
      int x1 = w*x;
      int y1 = h*y;
      
      color c = Ange.get(x1, y1);

      // use a random function to decide  orientation 
      if (random(6) < 2) {  
        c = Ange.get(x1, y1);
      } else {
        c = Brad.get(x1, y1);
      }

      fill(c);
      ellipse(x1, y1, w, h);
    }
  }
}
