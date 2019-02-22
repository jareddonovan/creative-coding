import ddf.minim.*;

color waterBlue;
color fishColor;

Minim minim;
AudioInput input;
float maxVolume = 0;

Fish[] fishes = {};

//Fish fishy = new Fish(50, 50);
//Fish fishyFriend = new Fish(100, 100);

void setup(){
  size(800, 600);
  
//  frameRate(5);

  waterBlue = color(#1772FF);
  fishColor = color(#FFE517);
  
  minim = new Minim(this);  
  input = minim.getLineIn(Minim.STEREO, 512);

  background(waterBlue);
  fill(fishColor);
  smooth();
  noStroke();
}

void draw(){
  // background(waterBlue);
  if (keyPressed){
    background(255);
  }
  
  float volume = input.mix.level();
  maxVolume = max(volume, maxVolume);
  //println(maxVolume);
 
  if(volume > 0.2){
    scareFishes();
  }
 
  for(int i = 0; i < fishes.length; i++){
    for(int j = i+1; j < fishes.length; j++){
      fishes[i].compare(fishes[j]);
      fishes[j].compare(fishes[i]);
    }
  }
  for(int i = 0; i < fishes.length; i++){
    fishes[i].move();
    fishes[i].display();
  }
}

void scareFishes(){
  for(int i = 0; i < fishes.length; i++){
    fishes[i].flee();
  }
}

void mousePressed(){
  Fish newFish = new Fish(mouseX, mouseY);
  fishes = (Fish[]) append(fishes, newFish);
}

void keyPressed(){
  if(key == ' '){
    scareFishes();
  }
}
