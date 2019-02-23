// simple movement

let locn;
let velocity;
let maxspeed = 10;

function setup() {
  createCanvas(800, 800);
  locn = createVector(250, 250);
  velocity = createVector(5, -5);
}

function draw() {
  background(120);
  velocity.limit(maxspeed); // set max velocity
  locn.add(velocity);

  ellipse(locn.x, locn.y, 10, 10);
  checkBounds();
}

function checkBounds() {
  if ((locn.x > width) || (locn.x < 0)) {
    velocity.x = velocity.x * -1;
  }
  
  if ((locn.y > height) || (locn.y < 0)) {
    velocity.y = velocity.y * -1;
  }
}