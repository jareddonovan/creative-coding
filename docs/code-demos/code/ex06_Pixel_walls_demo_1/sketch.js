let p;
let bg;

function preload(){
  bg = loadImage("rooms.png");
}

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  p = new Puck(width / 2, height / 2, 20, 20);
}

function draw() {
  background(220);
  image(bg, 0, 0, width, height);
  p.show();
}

function keyPressed(){
  if (key == 'w'){
    // Move up
    p.move(0, -20);
  } else if (key == 'a'){
    // Move left
    p.move(-20, 0);
  } else if (key == 'd'){
    // Move right
    p.move(20, 0);
  } else if (key == 's'){
    // Move down.
    p.move(0, 20);
  }

}