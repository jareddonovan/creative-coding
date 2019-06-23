let clickr;

function setup() {
  createCanvas(400, 400);
  
  clickr = new Clickable(150, 150, 100, 100);
}

function draw() {
  if (clickr.wasClicked){
    background(220);
  } else {
    background(20);
  }
    
  clickr.show();
}

function mousePressed(){
  clickr.mousePressed(mouseX, mouseY);
  console.log(clickr.wasClicked);
}