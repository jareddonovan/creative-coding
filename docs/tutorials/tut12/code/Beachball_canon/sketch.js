
let canon;
let moveInc = 10;

function setup(){
  createCanvas(600, 600);
  noStroke();
  smooth();

  canon = new Canon(20, height - 46, radians(45), 0.5);
    
  drawScene();
}

function draw(){
  drawScene();
  
  canon.update();
  canon.display();
}

function drawScene(){
  // Clear background with blue sky color
  background(174, 247, 250);
  
  // Draw grass
  fill(2, 193, 86);
  rect(0, height - 20, width, 20);
}

function mouseClicked(){
  canon.fire(mouseX, mouseY);
}

function keyPressed(){
  if (keyCode ==  LEFT_ARROW){
    canon.x -= moveInc;
  }
  else if (keyCode == RIGHT_ARROW){
    canon.x += moveInc
  }
}