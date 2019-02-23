class Ball {
  
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(5, -5);
    this.maxspeed = 10;
  }
  
  move() {
    // the mouse loc in a vector
    let target = createVector(mouseX, mouseY);
    // make a vector between target and locaiton - pointing at target - swap to point away
    let steer = p5.Vector.sub(target, this.location); 
    steer.setMag(1); // set length - magniutude - of vector to 1. retains direction
    this.velocity.add(steer); // add steering to velocity
    this.velocity.limit(this.maxspeed); // set max velocity
    this.location.add(this.velocity);
  }
  
  display() {
    ellipse(this.location.x, this.location.y, 10, 10);
    this.checkBounds();
  }
  
  checkBounds() {
    if ((this.location.x > width) || (this.location.x < 0)) {
      this.velocity.x = this.velocity.x * -1;
    }
    
    if ((this.location.y > height) || (this.location.y < 0)) {
      this.velocity.y = this.velocity.y * -1;
    }
  }
}