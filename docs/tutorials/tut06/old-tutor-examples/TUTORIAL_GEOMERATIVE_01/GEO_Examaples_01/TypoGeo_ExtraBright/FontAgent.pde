class FontAgent {

  PVector loc;
  float dia;

  FontAgent(PVector l) {
    loc = l.get();
  }

  void motion() {
    float deplacementX = noise(xoff)*width;
    float deplacementY = noise(yoff)*height;

    xoff += xincrement;
    yoff += yincrement;
    MouvPoint = dist(deplacementX-(width/2), deplacementY-(height/2), loc.x, loc.y);
  }  

  void display() {
    noStroke();
    fill(255,73);
    dia = (150/MouvPoint) *5;
    ellipse(loc.x + random(-randX, randX), loc.y + random(-randY, randY), dia, dia);
  }
}

