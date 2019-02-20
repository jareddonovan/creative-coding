class Tortoise {
  
  constructor(x, y){
    this.location = createVector(x, y);
  	this.direction = createVector(0, 1);
  	this.speed = 2; 
  	this.sphereOfInfluence = 200;
    this.right(); 
  }

  update(){
    // Update the location of the tortoise based on the direction.
    this.location.add(this.direction);
    
    // Check whether the tortoise has gone off the left or right sides of the 
    // screen. If so, then wrap around to the other side. 
    if (this.location.x < 0) {
      this.location.x = width + this.location.x;
    }
    else if (this.location.x > width){
      this.location.x = this.location.x - width;
    }
    // Same for top and bottom.
    if (this.location.y < 0){
      this.location.y = height + this.location.y;
    }
    else if (this.location.y > height){
      this.location.y = this.location.y - height;
    }
    
  }
  
  display(){
    push();
    translate(this.location.x, this.location.y);
    rotate(this.direction.heading());

    push();
    fill(157, 105, 105);

    // Draw the legs    
    push();
    rotate(radians(-45));
    ellipse(0, 0, 20, 80);
    rotate(radians(90));
    ellipse(0, 0, 20, 80);
    pop();
    
    // Draw the head
    ellipse(35, 0, 30, 20);
    
    pop();  
        
    // Draw the eyes
    fill(0);
    ellipse(45, -7, 5, 5);
    ellipse(45, 7, 5, 5);
    
    // Draw the shell
    fill(84, 152, 80);
    ellipse(0, 0, 70, 60);
    
    // Draw the 'sphere of influence'
    fill(255, 20);
    ellipse(0, 0, this.sphereOfInfluence * 2, this.sphereOfInfluence * 2);
    
    pop();
  }
  
  left(){
    this.direction = createVector(-this.speed, 0);
  }
  
  up(){
    this.direction = createVector(0, -this.speed);  
  }
  
  right(){
    this.direction = createVector(this.speed, 0);  
  }
  
  down(){
    this.direction = createVector(0, this.speed);  
  }
}