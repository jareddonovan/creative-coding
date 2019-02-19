class Tortoise {
  
  PVector location;
  PVector direction;
  float speed = 2; 
  int sphereOfInfluence = 200;
  
  Tortoise(int x, int y){
    location = new PVector(x, y);
    right(); 
  }

  void update(){
    // Update the location of the tortoise based on the direction.
    location.add(direction);
    
    // Check whether the tortoise has gone off the left or right sides of the 
    // screen. If so, then wrap around to the other side. 
    if (location.x < 0) {
      location.x = width + location.x;
    }
    else if (location.x > width){
      location.x = location.x - width;
    }
    // Same for top and bottom.
    if (location.y < 0){
      location.y = height + location.y;
    }
    else if (location.y > height){
      location.y = location.y - height;
    }
    
  }
  
  void display(){
    pushStyle();
    pushMatrix();
    translate(location.x, location.y);
    rotate(direction.heading());
    
    // Draw the legs
    pushMatrix();
    fill(157, 105, 105);
    rotate(radians(-45));
    ellipse(0, 0, 20, 80);
    rotate(radians(90));
    ellipse(0, 0, 20, 80);
    popMatrix();  
    
    // Draw the head
    ellipse(35, 0, 30, 20);
    
    // Draw the eyes
    fill(0);
    ellipse(45, -7, 5, 5);
    ellipse(45, 7, 5, 5);
    
    // Draw the shell
    fill(84, 152, 80);
    ellipse(0, 0, 70, 60);
    
    // Draw the 'sphere of influence'
    fill(255, 20);
    ellipse(0, 0, sphereOfInfluence * 2, sphereOfInfluence * 2);
    
    popMatrix();
    popStyle();
  }
  
  void left(){
    direction = new PVector(-speed, 0);
  }
  
  void up(){
    direction = new PVector(0, -speed);  
  }
  
  void right(){
    direction = new PVector(speed, 0);  
  }
  
  void down(){
    direction = new PVector(0, speed);  
  }
}