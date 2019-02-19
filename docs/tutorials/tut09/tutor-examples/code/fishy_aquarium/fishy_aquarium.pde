color waterBlue;
color fishColor;

Fish[] fishes = {};

//Fish fishy = new Fish(50, 50);
//Fish fishyFriend = new Fish(100, 100);

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
  for(int i = 0; i < fishes.length; i++){
    fishes[i].move();
    fishes[i].display();
  }
}


void mousePressed(){
  Fish newFish = new Fish(mouseX, mouseY);
  fishes = (Fish[]) append(fishes, newFish);
}

