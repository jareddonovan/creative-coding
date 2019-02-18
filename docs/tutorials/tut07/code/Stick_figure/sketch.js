function setup(){
  createCanvas(150, 150);
}

function draw(){
  // Draw body and head of stick figure
  translate(100, 50);
  line(0, 25, 0, 60);
  ellipse(0, 15, 20, 20);

  // Draw Arms
  // Save and reset the drawing coordinates after drawing arms.
  // Try commenting out the pushMatrix() and popMatrix()
  // to see the effect on the drawing.
  push();
  translate(0, 30);
  rotate(radians(60));
  line(0, 0, 30, 0);
  rotate(radians(60));
  line(0, 0, 30, 0);
  pop();

  // Draw Legs
  translate(0, 60);
  rotate(radians(70));
  line(0, 0, 40, 0);
  rotate(radians(40));
  line(0, 0, 40, 0);
}