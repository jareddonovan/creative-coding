function setup(){
  // Set size and colours.
  createCanvas(600, 400);
  background(29, 169, 242);
  noStroke();
  fill(4, 124, 81);
}
 
function draw(){
  // Draw a pine tree shape using the vertex() function.
  beginShape();
  vertex(300, 70);
  vertex(260, 150);
  vertex(280, 150);
  vertex(220, 230);
  vertex(260, 230);
  vertex(190, 310);
  vertex(280, 310);
  vertex(280, 350);
  vertex(320, 350);
  vertex(320, 310);
  vertex(410, 310);
  vertex(340, 230);
  vertex(380, 230);
  vertex(320, 150);
  vertex(340, 150);
  endShape(CLOSE);
  
  noLoop();
}