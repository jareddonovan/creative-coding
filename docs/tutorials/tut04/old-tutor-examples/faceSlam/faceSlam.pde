// face slam

PImage Brad;
PImage Ange;

PGraphics layer1;

void setup() {
  size(515, 620);
  
  Brad = loadImage("data/brad.jpg");
  Ange = loadImage("data/ange.jpg");
  
  layer1 = createGraphics(515, 620);
  
  image(Ange,0,0);
}

void draw() {
  image(Ange, 0, 0);

  layer1.copy(Brad, mouseX - 10, mouseY - 10, 20, 20,
    mouseX - 10, mouseY - 10, 20, 20);
  image(layer1, 0, 0);
  
}
