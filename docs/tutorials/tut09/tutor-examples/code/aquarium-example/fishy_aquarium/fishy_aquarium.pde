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


// A class for fishes!
class Fish{
  float x = 0;
  float baseY = 0;
  float y = 0;
  float speed = 2;
  int dir = 1;
  int w = 50;
  int h = 15;
  color fishColour;
   
  Fish(int x, int y){
    this.x = x;
    this.baseY = y;
    this.speed = int(random(1, 10));
    this.fishColour = color(random(255),random(255),0);
  }
  
  // Updates the movement of the fish - Class method
  void move(){
    // Figure out the new x, y position of the fish.
    x += (dir * speed);
    // If fish hits the edge of the screen, change direction
    if(x < 0 || x > width){
      dir = -dir;
      x += (dir * speed);
    }
    // Fish will just sort of bob up and down as it moves.
    y = baseY + sin(radians(frameCount * 2)) * 40;
    
    // Adjust the height positive or negative depending on the direction
    w = 50 * dir;
  }
  
  // Draw the fish to the screen.
  void display(){
    fill(fishColour);
    triangle(x, y, x - w, y - h, x - w, y + h);
    fill(255);
    ellipse(x - (20 * dir), y, 10, 10);  
    fill(0);
    ellipse(x - (15 * dir), y, 5, 5);
  }  
}

