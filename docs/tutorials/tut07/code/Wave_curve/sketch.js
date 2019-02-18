function setup(){
  createCanvas(600, 400);
}

function draw(){
  // Choose some interesting colours. Because fun.
  background(100, 255, 125);
  fill(255, 100, 212);
  stroke(110, 100, 255);
  strokeWeight(4);

  // Draw some curveVertex points from left to right across screen.
  // NOTE that the first and last points are repeated as control points.
  beginShape();
  curveVertex( 40,200);
  curveVertex( 40,200);
  curveVertex( 86, 52);
  curveVertex(200,379);
  curveVertex(236,143);
  curveVertex(267,256);
  curveVertex(365, 48);
  curveVertex(496,310);
  curveVertex(560,200);
  curveVertex(560,200);
  endShape(OPEN);
}