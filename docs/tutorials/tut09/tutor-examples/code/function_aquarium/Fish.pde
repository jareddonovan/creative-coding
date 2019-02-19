

// A class for fishes!
class Fish{
  float fishX = 0;
  float fishY = 0;
  float fishSpeed = 2;
  int dir = 1;
  int fishW = 50;
  int fishH = 15;
    int y;
    
  Fish(){
    fishW = int(random(30));
    y = int(random(40));
  }
  
  // Updates the movement of the fish
  void moveFish(){
    // Figure out the new x, y position of the fish.
    fishX += (dir * fishSpeed);
    // If fish hits the edge of the screen, change direction
    if(fishX < 0 || width < fishX){
      dir = -dir;
      fishX += (dir * fishSpeed);
    }
    // Fish will just sort of bob up and down as it moves.
    fishY = height / 2 + sin(radians(frameCount * 2)) * r;
    
    // Adjust the height positive or negative depending on the direction
    fishW = 50 * dir;
  }
  
  // Draw the fish to the screen.
  void drawFish(){
    fill(fishColor);
    triangle(fishX, fishY, fishX - fishW, fishY - fishH, fishX - fishW, fishY + fishH);
    fill(255);
    ellipse(fishX - (20 * dir), fishY, 10, 10);  
    fill(0);
    ellipse(fishX - (15 * dir), fishY, 5, 5);
  }  
}
