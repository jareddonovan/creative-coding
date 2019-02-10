let message = "Changes";

function setup() {
  createCanvas(150, 150);
  fill(0);
  stroke(255);
  background(204);
}

function draw() {
	stroke(255);
  
  // Draw a line down the middle of the canvas.
  line(width / 2, 0, width / 2, height);

  noStroke();
  text(message, width / 2, 35);

  textAlign(CENTER);
  textSize(24);
  text(message, width / 2, 75);

  textAlign(RIGHT);
  textSize(48);
  text(message, width / 2, 125);

  noLoop();
}