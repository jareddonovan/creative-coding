// TOOD: I'm not sure where this example originally comes from.
// .     Maybe one of Shiffmans?
// simple movement

let locn;
let velocity;
let gravity;
let maxspeed = 10;

function setup() {
  createCanvas(400, 400);
  locn = createVector(250, 250);
  velocity = createVector(5, -5);
  gravity = createVector(0, 0.5);
  
  textFont("monospace");
  
  fill(255);
}

function draw() {
	background(120);
  // the mouse loc in a vector
  let target = createVector(mouseX, mouseY);
  // make a vector between target and locaiton - pointing at target - swap to point away
  let steer = p5.Vector.sub(target, locn); 
  steer.setMag(1); // set length - magniutude - of vector to 1. retains direction
  velocity.add(steer); // add steering to velocity
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