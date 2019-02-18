/**
 * Draws a fearsome spider hanging from a silken thread. 
 * Uses the translate() and rotate() functions as well as pushMatrix() 
 * and popMatrix() to save and restore the coordinate system as we go.
 * Also demonstrates using a for loop with the translation functions.
 *
 * Jared Donovan 2018.
 */

function setup(){
  createCanvas(300, 300);
}

function draw(){
  background(84, 99, 178);
  fill(52, 56, 77);
  stroke(255);
  
  // Draw a tantalising line for the spider's silk.
  line(width / 2, 0, width / 2, height / 2);

  stroke(0);
  strokeWeight(2);

  // Translate to the middle of the screen.
  translate(width / 2, height / 2);

  // Save the coordinate system so we can reset to this point.
  push();

  // Render eight frightful legs. 
  // Use a for loop for this. Each leg is 30 degrees apart.
  rotate(radians(-45));

  for (let i = 0; i < 4; i++){
    // The first pair of ellipses are the legs going left and right.
    ellipse(  50, 0, 150, 10);
    ellipse( -50, 0, 150, 10);

    // These ellipses are the claws at the end of each leg.
    ellipse(-125, 5,   5, 10);
    ellipse( 125, 5,   5, 10);

    rotate(radians(30));
  }

  // Reset to where we were before we started drawing legs.
  pop();

  // Draw ghastly fangs. 
  // Push matrix so we can reset after this.
  push();
  rotate(radians(80));
  ellipse(50, 0, 20, 10);
  rotate(radians(20));
  ellipse(50, 0, 20, 10);

  // Reset to where we were before drawing the fangs.
  pop();

  // Body
  ellipse(0, 0, 100, 100);

  // Gruesome hairs on body. 
  // Use a nested for loop to draw lines radiating from center.
  for (let i = 0; i < 360; i += 30){
    for (let j = 10; j < 50; j += 10){
      line(0, j, 0, j + 5);
    }
    rotate(radians(30));
  }

  // Glowing spider eyes. 
  // Fill with spooky colour for max thrills.
  fill(179, 248, 250);
  ellipse(10, 40, 10, 10);
  ellipse(-10, 40, 10, 10);
}