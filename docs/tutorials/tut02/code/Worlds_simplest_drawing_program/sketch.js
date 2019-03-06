// World's simplest drawing program.
function setup(){
  createCanvas(400, 400);
  background(220);
}

// Draw a circle whenever the mouse button is down.
function draw(){
  if(mouseIsPressed){
    ellipse(mouseX, mouseY, 20, 20);
  }
}
