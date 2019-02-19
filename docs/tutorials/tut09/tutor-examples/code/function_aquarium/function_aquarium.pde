color waterBlue;
color fishColor;

Fish fishy = new Fish();
Fish fishy2 = new Fish();


void setup(){
  size(800, 600);

  waterBlue = color(#1772FF);
  fishColor = color(#FFE517);

  background(waterBlue);
  fill(fishColor);
  smooth();
  noStroke();
}

void draw(){
  background(waterBlue);
  fishy.moveFish();
  fishy.drawFish();
  
  fishy2.moveFish();
  fishy2.drawFish();
}


