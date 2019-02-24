/**
 * basic display of time. Can extend to include date if you like.
 */

PFont f;

int cx, cy;

void setup() {
  size(400, 300);
  stroke(255);

  // Create the font
  printArray(PFont.list());
  f = createFont("Monaco", 36);
  textFont(f);
}

void draw() {
  background(0);

  float s = second();
  float m = minute(); 
  float h = hour();

  // draw time use int() function to remove decimal places
  text(int(h), 20, 75);
  text(int(m), 100, 75);
  text(int(s), 180, 75);
  text(millis()%1000, 260, 75);

  // or do it in one line
  text(int(h) + ":" + int(m) + ":" + int(s) + ":" + millis()%1000, 20, 150);
  
  // show just the millis
    text(millis(), 20, 225);

}