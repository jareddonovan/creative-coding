void setup(){
  size(400, 400);
  smooth();
  frameRate(5);
  background(100);
}

void draw(){
  background(100);
  for(int x = 30; x < width; x += 80){
    for(int y = 30; y < height; y += 80){
      drawEye(x, y);
      drawEye(x + 20, y);
    }
  }
}

void drawEye(int x, int y){
  fill(255);
  ellipse(x, y, 20, 20);

  if(random(10) < 9){
    fill(0);
    int moveX = 0;
    int moveY = 0;
    if(mouseX < x){
      moveX = -3;
    }
    else if(x < mouseX){
      moveX = 3;
    }
    if(mouseY < y){
      moveY = -3;
    }
    else if(y < mouseY){
      moveY = 3;
    }
    ellipse(x + moveX, y + moveY, 7, 7);
  }
  else {
    stroke(0);
    line(x-10, y, x + 10, y);    
  }
}
