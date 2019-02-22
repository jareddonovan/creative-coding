// Draws a sin wave across the screen based on the x position. 
size(700, 100);
noStroke();
fill(0);

// Iterate across the width of the canvas. 
for (int x = 0; x <= width; x += 5) {
  // Calculate a y value based on the current x. 
  // Divide by 50 to stretch the wave horizontally.
  // Value of y will be between -1 and 1.
  float y = sin(x / 50.0);
  
  // Scale value of y up to -35...35
  y *= 35;

  // Draw a rectangle at the given x, y position. Add 50 to y to center vertically.
  rect(x, 50 + y, 2, 4);
}
