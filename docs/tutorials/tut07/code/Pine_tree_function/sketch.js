function setup(){
  // Set size and colours.
  createCanvas(600, 400);
  background(29, 169, 242);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}
 
function draw(){
  // Nothing actually happens in draw()...
}

function mousePressed(){
	fill(random(140, 170), 100, random(50, 80));
  
	drawTree(mouseX, mouseY);
}

function drawTree(x, y){
  // Save the transformation matrix and translate to the x, y position.
  push();
  translate(x, y);

  // Draw the shape as a series of vertices.
  beginShape();
  // Vertices of tree are defined relative to (0, 0) point
  vertex(0, -140);
  vertex(-40, -60);
  vertex(-20, -60);
  vertex(-80, 10);
  vertex(-40, 10);
  vertex(-110, 100);
  vertex(-20, 100);
  vertex(-20, 140);
  vertex(20, 140);
  vertex(20, 100);
  vertex(110, 100);
  vertex(40, 10);
  vertex(80, 10);
  vertex(20, -60);
  vertex(40, -60);
  endShape(CLOSE);

  pop();
}