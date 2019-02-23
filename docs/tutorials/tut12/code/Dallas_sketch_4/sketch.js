let balls = [];

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  for(let b of balls){
    b.move();
    b.display();
  }
}

function mousePressed(){
  balls.push(new Ball(mouseX, mouseY));
}