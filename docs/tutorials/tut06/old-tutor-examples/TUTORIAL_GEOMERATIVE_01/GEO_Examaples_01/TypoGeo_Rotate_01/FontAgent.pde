class FontAgent {

  PVector loc;

  FontAgent(PVector l) {
    loc = l.get();
  }

  void display() {
    stroke(255);
    float len = map(mouseY,0,height,0,100);
    pushMatrix();
    translate(loc.x, loc.y);
    rotate(map(mouseX, 0, width, 0, TWO_PI));
    line(-len, -len, len, len);
    popMatrix();
  }
} 

