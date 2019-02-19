class EggChicken {
  PVector location;
  PVector direction;
  float steering = 0;
  int age;
  int hatchingAge = 300;
  boolean scared = false;
  boolean cooped = false;
  boolean free = false;

  EggChicken(int x, int y) {
    location = new PVector(x, y);
    direction = new PVector(1, 0);
    direction.rotate(random(TWO_PI));
    age = 0;
  }

  void update(Tortoise tortoise) {
    // Only update if not cooped or free
    if (cooped || free){
      return;
    }
    
    age += 1;

    // If the EggChicken is old enough to be a chicken then update the
    // direction, and location. It will start running around faster and
    // faster as it gets older.
    if (age > hatchingAge) {
      float currentSpeed = direction.mag();
      float speedIncrease = noise(frameCount + (age / 0.001)) / 100.0;
      float newSpeed = currentSpeed + speedIncrease;

      direction.setMag(newSpeed);

      float steeringChange = noise(frameCount + 10000 + (age / 0.01)) - 0.5;

      direction.rotate(steeringChange);
      
      location.add(direction);

      // Check whether the tortoise has gone off the top or bottom of the 
      // screen. If so, then wrap around to the other side. 
      if (location.y < 0) {
        location.y = height + location.y;
      } else if (location.y > height) {
        location.y = location.y - height;
      }      
      
      // Check whether the chicken is in the 'coop' or 'free' zone. If so, 
      // update points and status of chicken.
      if (location.x < 100) {
        cooped = true;
        points += 1;
      } else if (location.x > width - 100) {
        free = true;
        points -= 1;
      }
      
      // Figure out if we need to avoid the tortoise
      if (dist(location.x, location.y, tortoise.location.x, tortoise.location.y) < tortoise.sphereOfInfluence){
        scared = true;
        float speed = direction.mag();
        direction = new PVector(location.x - tortoise.location.x, location.y - tortoise.location.y);
        direction.setMag(speed);
      }
      else {
        scared = false;
      }

    }
  }

  void display() {
    if (age < hatchingAge) {
      displayEgg();
    } else {
      displayChicken();
    }
  }

  void displayEgg() {
    pushStyle();
    pushMatrix();
    translate(location.x, location.y);

    // Draw the egg. The egg should wobble progressively more 
    // until it hatches. This is done with the sin function using 
    // the age of the chicken as part of the argument so that the 
    // wobbles get faster as the chicken gets older.
    fill(255);
    // Translate up so the egg rotates on its base.
    pushMatrix();
    rotate(sin((age * age * age) / 100000.0) / 2.0);
    ellipse(0, -30, 50, 60);

    // For debugging, display the age in the center of the egg.
    //fill(0);
    //text(age, 0, -30);

    popMatrix();

    popMatrix();
    popStyle();
  }

  void displayChicken() {
    pushStyle();
    pushMatrix();

    translate(location.x, location.y);
    rotate(direction.heading());

    // Draw the beak.
    fill(242, 139, 42);
    triangle(30, -5, 40, 0, 30, 5); 

    // Draw the puffy body.
    if (!scared){
      fill(242, 242, 42);
    }
    else {
      fill(44, 240, 222);
    }
    ellipse(0, 0, 60, 60);

    // Draw the direction
    //fill(0);
    //text(direction.toString(), 0, 0);

    // Draw two little eyes.
    rotate(radians(-110));
    fill(0);
    ellipse(0, 30, 5, 5);
    rotate(radians(40));
    ellipse(0, 30, 5, 5);

    popMatrix();
    popStyle();
  }
}