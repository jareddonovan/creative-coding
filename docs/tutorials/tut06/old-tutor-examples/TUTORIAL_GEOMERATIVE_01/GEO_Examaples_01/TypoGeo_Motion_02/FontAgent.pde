class FontAgent {

  PVector loc;
  //PVector acc;
  float dia = 1.5;
  float xMove;
  float theta;
  float lifespan = 255;

  FontAgent(PVector l) {
    loc = l.get();
    // acc = new PVector (0, 0.1);
  }

  void motion() {
    xMove += random (-6, 6);
    theta = radians(xMove);
    loc.x += cos(theta);
    lifespan -= 0.29;
  }  

  void display() {
    noStroke();
    fill(lifespan);

    ellipse(loc.x, loc.y, dia, dia);
  }
}

