// The Fish class defines fish objects, that move around on the 
// screen and change direction when they bump into the walls.
class Fish {    
  // Constructor functon for a new fish. 
  // Requires x, y position where the fish is to be created.
  constructor(x, y){
	  // How much the velocity should vary by each time
  	this.velocityVariation = 0.05;
    
    this.x = x;
    this.y = y;
    
    // Pick a random velocity to begin with
    this.xVel = random(-1, 1);
    this.yVel = random(-1, 1);
  }
  
  // Update the position of the fish depending on its velocity.
  update(){
    this.x += this.xVel;
    this.y += this.yVel;

    // Check whether the fish has gone off the left or right edges.
    if (this.x < 0 || this.x > width){
      // If it has, reverse direction and move back
      this.xVel = -this.xVel;
      this.x += this.xVel;
    }

    // Check whether the fish has gone off the top or bottom edges.
    if (this.y < 0 || this.y > height){
      // If it has, reverse direction and move back
      this.yVel = -this.yVel;
      this.y += this.yVel;
    }
    
    // Vary the x / y velocity by a little bit each time.
    this.xVel = random(this.xVel - this.velocityVariation, this.xVel + this.velocityVariation);
    this.yVel = random(this.yVel - this.velocityVariation, this.yVel + this.velocityVariation);
    
  }
  
  // Function to display the fish on the canvas. 
  display(){
    // The atan2 function will figure out which angle the fish is 
    // pointing in if you give it the y velocity and x velocity.
    // NOTE: The y velocity is the first argument.
    let angle = atan2(this.yVel, this.xVel);

    // push and pop matrix to save / reset the coordinate system
    push();
    
    // Translate to the x, y position of the fish.
    translate(this.x, this.y);

    // Rotate by the angle the fish is pointing in.
    rotate(angle);

    // Draw a triangle to represent the fish
    // (20, 0) = nose, (-10, -10) = top fin, (-10, 10) = bottom fin
    triangle(20, 0, -10, -10, -10, 10);
    
    pop();
  }
}