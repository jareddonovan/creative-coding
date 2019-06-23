PImage marlon;
Tree tree;

void setup(){
  size(640, 426);
  marlon = loadImage("marlon.jpg");
  noStroke();
  background(255);
  tree = new Tree(0, 0, width, height);  
}

void draw(){
  background(255);
  tree.display();
  tree.processMouseMove(mouseX, mouseY, mousePressed);
}