// A drawing program that is more 'active'

// Declare an array to hold points
let points = [];

function setup() {
  createCanvas(400, 400);
  background(220);
  stroke(0, 10);
}

function draw() { 
  // If the mouse is pressed, save the point into the array
  if (mouseIsPressed){
    // We store the point as a 'p5.Vector' object
  	points.push(createVector(mouseX, mouseY));
  }

  // Go through the array of points
  for (let p of points){
    // For each point, change it by a random amount
    p.x = p.x + random(-1, 1);
    p.y = p.y + random(-1, 1);
    // ...and draw a point.
		point(p.x, p.y);
  }
}