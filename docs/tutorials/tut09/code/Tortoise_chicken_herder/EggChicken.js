class EggChicken {
  
  constructor(x, y) {
    this.location = createVector(x, y);
    this.direction = createVector(1, 0);
    this.direction.rotate(random(TWO_PI));
    this.age = int(random(5, 50));
    this.age = -(50 * 50) + this.age * this.age;
  	this.steering = 0;
  	this.hatchingAge = 300;
    this.scared = false;
    this.cooped = false;
  	this.free = false;  
  }

  update(tortoise) {
    // Only update if not cooped or free
    if (this.cooped || this.free){
      return;
    }
    
    this.age += 1;

    // If the EggChicken is old enough to be a chicken then update the
    // direction, and location. It will start running around faster and
    // faster as it gets older.
    if (this.age > this.hatchingAge) {
      let currentSpeed = this.direction.mag();
      let speedIncrease = noise(frameCount + (this.age / 0.001)) / 100.0;
      let newSpeed = currentSpeed + speedIncrease;

      this.direction.setMag(newSpeed);

      let steeringChange = noise(frameCount + 10000 + (this.age / 0.01)) - 0.5;

      this.direction.rotate(steeringChange);
      
      this.location.add(this.direction);

      // Check whether the tortoise has gone off the top or bottom of the 
      // screen. If so, then wrap around to the other side. 
      if (this.location.y < 0) {
        this.location.y = height + this.location.y;
      } else if (this.location.y > height) {
        this.location.y = this.location.y - height;
      }      
      
      // Check whether the chicken is in the 'coop' or 'free' zone. If so, 
      // update points and status of chicken.
      if (this.location.x < 100) {
        this.cooped = true;
        this.scared = false;
        points += 1;
      } else if (this.location.x > width - 100) {
        this.free = true;
        this.scared = false;
        // points -= 1;
      } else if (dist(this.location.x, this.location.y, tortoise.location.x, tortoise.location.y) < tortoise.sphereOfInfluence){
        this.scared = true;
        let speed = this.direction.mag();
        this.direction = createVector(this.location.x - tortoise.location.x, this.location.y - tortoise.location.y);
        this.direction.setMag(speed);
      }
      else {
        this.scared = false;
      }
    }
  }

  display() {
    if (this.age < this.hatchingAge) {
      this.displayEgg();
    } else {
      this.displayChicken();
    }
  }

  displayEgg() {
    push();
    translate(this.location.x, this.location.y);

    
    // Draw the egg. The egg should wobble progressively more 
    // until it hatches. This is done with the sin function using 
    // the age of the chicken as part of the argument so that the 
    // wobbles get faster as the chicken gets older.
    fill(255);
    stroke(200);
    
    if(this.age >= 0){
	    // Translate up so the egg rotates on its base.
  	  rotate(sin((this.age * this.age * this.age) / 100000.0) / 2.0);
    }
      
  	ellipse(0, -30, 50, 60);
    
    // For debugging, display the age in the center of the egg.
    // fill(0);
    // text(int(this.age), 0, -30);
    
    pop();
  }

  displayChicken() {
    push();

    translate(this.location.x, this.location.y);
    rotate(this.direction.heading());

    // Draw the beak.
    fill(242, 139, 42);
    triangle(30, -5, 40, 0, 30, 5); 

    // Draw the puffy body.
    if (!this.scared){
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

    pop();
  }
}