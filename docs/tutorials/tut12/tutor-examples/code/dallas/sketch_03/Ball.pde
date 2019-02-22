class Ball {
  PVector location;
  PVector velocity;
  int maxspeed = 10;
  
  Ball(int x, int y) {
    location = new PVector(x, y);
    velocity = new PVector(5, -5);
  }
  
  void move() {
    // the mouse loc in a vector
    PVector target = new PVector(mouseX, mouseY);
    // make a vector between target and locaiton - pointing at target - swap to point away
    PVector steer = PVector.sub(target, location); 
    steer.setMag(1); // set length - magniutude - of vector to 1. retains direction
    velocity.add(steer); // add steering to velocity
    velocity.limit(maxspeed); // set max velocity
    location.add(velocity);
  }
  
  void display() {
    ellipse(location.x, location.y, 10, 10);
    checkBounds();
  }
  
  void checkBounds() {
    if ((location.x > width) || (location.x < 0)) {
      velocity.x = velocity.x * -1;
    }
    
    if ((location.y > height) || (location.y < 0)) {
      velocity.y = velocity.y * -1;
    }
  }
}
