// Use rectMode(CENTER) to make rectangles easier to rotate.
rectMode(CENTER);

// Translate in from top left corner
translate(24, 24);

// (1) Save the current transformation
pushMatrix();
  // Rotate and draw a rectangle.
  rotate(radians(30));
  rect(0, 0, 18, 36);
// (1) <= Reset
popMatrix();

// Translate further right.
translate(36, 0);

// (2) Save the current transformation.
pushMatrix();
  // Rotate and draw a second smaller rectangle.
  rotate(radians(30));
  rect(0, 0, 12, 24);
// (2) <= Reset
popMatrix();

// Translate even further right 
translate(24, 0);

// (3) Save the current transformation
pushMatrix();
  rotate(radians(30));
  rect(0, 0, 8, 16);
// (3) <= Reset
popMatrix();
