// A class for fishes!
class Fish{
    
  constructor(x, y){
    this.x = x;
    this.baseY = y;
    this.y = y;
    this.speed = random(1, 5);    
    
    this.dir = radians(random(360));
    this.close = 100;
    this.tooClose = 30;
    this.numPartners = 0;

    this.avgX = 0;
    this.avgY = 0;
    this.avgDir = 0;
    this.avgSpeed = 0;
    this.steerAway = false;

    this.w = 50;
    this.h = 15;
    this.adrenalin = 0;
  }
  
  // Makes the fish flee in a random direction.
  flee(){
    this.adrenalin = int(random(40, 60));
    this.dir += radians(random(-90, 90));
  }

  compare(partner){
    let d = dist(this.x, this.y, partner.x, partner.y);
    if(d < this.close){
      if(d < this.tooClose){
        this.steerAway = true;
        this.avgDir = atan2(this.y - partner.y, this.x - partner.x);
      }
      else {
        this.numPartners++;
        this.avgX += partner.x;
        this.avgY += partner.y;
        this.avgDir += partner.dir;
        this.avgSpeed += partner.speed;
      }
    }
  }
  
  // Updates the movement of the fish
  move(){
    // Move toward average direction
    if(this.steerAway){
      this.dir -= this.avgDir / 100.0;
    }
    else if(this.numPartners > 0){
      this.avgDir = this.avgDir / this.numPartners;
      this.avgSpeed = this.avgSpeed / this.numPartners;
      
      let speedDif = this.avgSpeed - this.speed;
      let dirDif = this.avgDir - this.dir;
      this.dir += dirDif / 4.0;

      this.avgX = this.avgX / this.numPartners;
      this.avgY = this.avgY / this.numPartners;
      this.avgDir = atan2(this.y - this.avgY, this.x - this.avgX);
      this.dir += this.avgDir / 100.0;
      
      this.speed += speedDif / 4.0;
    }
    this.avgDir = 0;
    this.avgX = 0;
    this.avgY = 0;
    this.avgSpeed = 0;
    this.numPartners = 0;
    this.steerAway = false;

    let xD = (this.speed + this.adrenalin) * cos(this.dir);
    let yD = (this.speed + this.adrenalin) * sin(this.dir);

    if(this.adrenalin > 0){
      this.adrenalin--;
    }

    // Figure out the new x, y position of the fish.
    this.x += xD;
    if(this.x < 0 - this.w / 2){
      this.x += width;
    }
    if(this.x > width + this.w / 2){
      this.x = width - this.x;
    }

    this.y += yD;
    if(this.y < 0 - this.w / 2){
      this.y += height;
    }
    if(this.y > height + this.w / 2){
      this.y = height - this.y;
    }
  }
  
  // Draw the fish to the screen.
  display(){
    push();
    translate(this.x, this.y);
    rotate(this.dir);
    stroke(0);
    triangle(20, 0, -10, -10, -10, 10);
    strokeWeight(4);
    point(7, 0);
    pop();
  }  
}