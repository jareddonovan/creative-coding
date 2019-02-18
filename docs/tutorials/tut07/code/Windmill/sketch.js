let brown;

function setup(){
	createCanvas(300, 300);
  brown = color(170, 105, 0);
}

function draw(){
	background(29, 169, 242);

  // Draw the background of the windmill.
	fill(brown);
	quad(130, 130, 170, 130, 220, 300, 80, 300);

  // Translate to the center of the screen and draw the sails
  translate(width / 2, height / 2);

  // Draw the three sails rotated around the center.
  for (let i = 0; i < 3; i++){
    // Rotate before drawing
    rotate(radians(120));
    fill(brown);
    rect(0, 0, 10, 120);
    fill(255);
    rect(10, 40, 40, 80);
  }
  
  noLoop();
}