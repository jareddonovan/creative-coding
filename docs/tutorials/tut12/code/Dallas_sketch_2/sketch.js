let balls = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(120);
  for(let b of balls){
    b.move();
    b.display();
  }
}

function mousePressed(){
  balls.push(new Ball(mouseX, mouseY));
}