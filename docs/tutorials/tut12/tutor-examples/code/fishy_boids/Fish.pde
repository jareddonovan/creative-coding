

// A class for fishes!
class Fish{
  float x = 0;
  float baseY = 0;
  float y = 0;
  float speed = 2;
  float dir = radians(random(360));
  int close = 200;
  int tooClose = 30;
  int numPartners = 0;

  float avgX = 0;
  float avgY = 0;
  float avgDir = 0;
  float avgSpeed = 0;
  boolean steerAway = false;

  int w = 50;
  int h = 15;
  int adrenalin = 0;
  float fleeDirection;
    
  Fish(int x, int y){
    this.x = x;
    this.baseY = y;
    this.y = y;
    this.speed = random(1, 5);    
  }
  
  // Makes the fish flee in a random direction.
  void flee(){
    this.adrenalin = int(random(40, 60));
    this.dir += radians(random(-90, 90));
  }

  void compare(Fish partner){
    float d = dist(x, y, partner.x, partner.y);
    if(d < close){
      if(d < tooClose){
        steerAway = true;
        avgDir = atan2(y - partner.y, x - partner.x);
      }
      else {
        numPartners++;
        avgX += partner.x;
        avgY += partner.y;
        avgDir += partner.dir;
        avgSpeed += partner.speed;
      }
    }
  }
  
  // Updates the movement of the fish
  void move(){
    // Move toward average direction
    if(steerAway){
      dir -= avgDir / 100.0;
    }
    else if(numPartners > 0){
      avgDir = avgDir / numPartners;
      avgSpeed = avgSpeed / numPartners;
      
      float speedDif = avgSpeed - speed;
      float dirDif = avgDir - dir;
      dir += dirDif / 4.0;

      avgX = avgX / numPartners;
      avgY = avgY / numPartners;
      avgDir = atan2(y - avgY, x - avgX);
      dir += avgDir / 100.0;
      
      speed += speedDif / 4.0;
    }
    avgDir = 0;
    avgX = 0;
    avgY = 0;
    avgSpeed = 0;
    numPartners = 0;
    steerAway = false;

    float xD = (speed + adrenalin) * cos(dir);
    float yD = (speed + adrenalin) * sin(dir);

    if(adrenalin > 0){
        adrenalin--;
    }

    // Figure out the new x, y position of the fish.
    x += xD;
    if(x < 0 - w / 2){
      x += width;
    }
    if(x > width + w / 2){
      x = width - x;
    }

    y += yD;
    if(y < 0 - w / 2){
      y += height;
    }
    if(y > height + w / 2){
      y = height - y;
    }
  }
  
  // Draw the fish to the screen.
  void display(){
    stroke(0);
    point(this.x, this.y);
    //pushMatrix();
    //translate(this.x, this.y);
    //rotate(this.dir);
    
    //fill(fishColor);
    //triangle(w / 2, 0, -w / 2, -h, -w / 2, h);
    //fill(255);
    //ellipse(5, 0, 10, 10);  
    //fill(0);
    //ellipse(5, 0, 5, 5);
    
    //popMatrix();
  }  
}
