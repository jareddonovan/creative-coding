// The Fish class defines fish objects, that move around on the 
// screen and change direction when they bump into the walls.
class Fish {
  // Variables to record the x,y position and the x,y velocity.
  float x;
  float y;
  float xVel;
  float yVel;
  
  // How much the velocity should vary by each time
  float velocityVariation = 0.05;
    
  // Constructor functon for a new fish. 
  // Requires x, y position where the fish is to be created.
  Fish(float x, float y){
    this.x = x;
    this.y = y;
    
    // Pick a random velocity to begin with
    this.xVel = random(-1, 1);
    this.yVel = random(-1, 1);
  }
  
  // Update the position of the fish depending on its velocity.
  void update(){
    x += xVel;
    y += yVel;

    // Check whether the fish has gone off the left or right edges.
    if (x < 0 || x > width){
      // If it has, reverse direction and move back
      xVel = -xVel;
      x += xVel;
    }

    // Check whether the fish has gone off the top or bottom edges.
    if (y < 0 || y > height){
      // If it has, reverse direction and move back
      yVel = -yVel;
      y += yVel;
    }
    
    // Vary the x / y velocity by a little bit each time.
    xVel = random(xVel - velocityVariation, xVel + velocityVariation);
    yVel = random(yVel - velocityVariation, yVel + velocityVariation);
    
  }
  
  // Function to display the fish on the canvas. 
  void display(){
    // The atan2 function will figure out which angle the fish is 
    // pointing in if you give it the y velocity and x velocity.
    // NOTE: The y velocity is the first argument.
    float angle = atan2(yVel, xVel);

    // push an pop matrix to save / reset the coordinate system
    pushMatrix();
    
    // Translate to the x, y position of the fish.
    translate(x, y);

    // Rotate by the angle the fish is pointing in.
    rotate(angle);

    // Draw a triangle to represent the fish
    // (20, 0) = nose, (-10, -10) = top fin, (-10, 10) = bottom fin
    triangle(20, 0, -10, -10, -10, 10);
    
    popMatrix();
  }
}
