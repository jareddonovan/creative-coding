class Ball {
  PVector location;
  PVector velocity;
  int maxspeed = 10;
  
  Ball(int x, int y) {
    location = new PVector(x, y);
    velocity = new PVector(5, -5);
  }
  
  void move() {
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
