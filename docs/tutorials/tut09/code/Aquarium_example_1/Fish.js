// The Fish class defines fish objects, that move around on the
// screen and change direction when they bump into the walls.
class Fish {
  // Constructor function for a new fish.
  // Requires x, y position where the fish is to be created.
  constructor(x, y){
    // Record the x and y position inside 'this'
    this.x = x;
    this.y = y;

    // Pick a random starting velocity
    this.xVel = random(-1, 1);
    this.yVel = random(-1, 1);
  }

  // Function to display the fish on the canvas.
  show(){
    // push matrix to save previous state
    push();

    // Translate to the x, y position of the fish.
    translate(this.x, this.y);

    // Draw a triangle to represent the fish
    triangle(20, 0, -10, -10, -10, 10);

    pop();
  }
  
  // Update the position of the fish depending on its velocity.
  update(){
    this.x += this.xVel;
    this.y += this.yVel;

    // Check whether the fish has gone off the left or right
    if (this.x < 0 || this.x > width){
      // If it has, reverse direction and move back
      this.xVel = -this.xVel;
      this.x += this.xVel;
    }

    // Check whether the fish has gone off the top or bottom
    if (this.y < 0 || this.y > height){
      // If it has, reverse direction and move back
      this.yVel = -this.yVel;
      this.y += this.yVel;
    }
  }  
}