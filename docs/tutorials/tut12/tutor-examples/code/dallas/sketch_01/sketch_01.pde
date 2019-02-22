// simple movement

PVector location;
PVector velocity;
int maxspeed = 10;

void setup() {
  size(800, 800);
  location = new PVector(250, 250);
  velocity = new PVector(5, -5);
}

void draw() {
  background(120);
  velocity.limit(maxspeed); // set max velocity
  location.add(velocity);

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
