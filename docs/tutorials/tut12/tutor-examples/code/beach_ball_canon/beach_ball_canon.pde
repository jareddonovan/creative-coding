
Canon canon;
int moveInc = 10;

void setup(){
  size(600, 600);
  noStroke();
  smooth();

  canon = new Canon(20, height - 46, radians(45), 0.5);
    
  drawScene();
}

void draw(){
  drawScene();
  
  canon.update();
  canon.display();
}

void drawScene(){
  // Clear background with blue sky color
  background(174, 247, 250);
  
  // Draw grass
  fill(2, 193, 86);
  rect(0, height - 20, width, 20);
}

void mouseClicked(){
  canon.fire(mouseX, mouseY);
}

void keyPressed(){
  if (key == CODED){
    if (keyCode == LEFT){
      canon.x -= moveInc;
    }
    else if (keyCode == RIGHT){
      canon.x += moveInc;
    }
  }
}