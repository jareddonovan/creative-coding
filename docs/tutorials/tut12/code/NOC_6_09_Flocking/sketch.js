// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

// Click mouse to add boids into the system

// Taken from the p5js version available here: https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp06_agents/NOC_6_09_Flocking

let flock;

let text;

function setup() {
  text = createP("Drag the mouse to generate new boids.");
  text.position(10, 365);

  createCanvas(640, 360);
  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 60; i++) {
    let b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  background(51);
  flock.run();
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}
