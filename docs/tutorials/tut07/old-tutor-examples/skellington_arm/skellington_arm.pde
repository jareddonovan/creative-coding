// Draws a skellington arm
size(600, 400);
background(0);
noStroke();

translate(30, 200);
rotate(radians(30));
ellipse(0, 15, 60, 60);
rect(0, 0, 250, 30);

translate(250, 0);
ellipse(10, 20, 60, 60);
rotate(radians(-60));
rect(0, 0, 250, 10);
rect(0, 20, 250, 10);

translate(250, 15);
ellipse(0, 0, 80, 80);

// first finger
pushMatrix();
translate(20, -30);
rotate(radians(-30));
rect(0, -5, 60, 10);

translate(60, 0);
rotate(radians(-60));
rect(0, -4, 40, 8);

translate(40, 0);
rotate(radians(-60));
rect(0, -3, 20, 6);
popMatrix();

// Second finger
pushMatrix();
translate(20, -10);
rotate(radians(-20));
rect(0, -5, 60, 10);

translate(60, 0);
rotate(radians(-50));
rect(0, -4, 40, 8);

translate(40, 0);
rotate(radians(-60));
rect(0, -3, 20, 6);

popMatrix();

// Third finger
pushMatrix();
translate(20, 10);
rotate(radians(-10));
rect(0, -5, 60, 10);

translate(60, 0);
rotate(radians(-40));
rect(0, -4, 40, 8);

translate(40, 0);
rotate(radians(-60));
rect(0, -3, 20, 6);

popMatrix();

// Thumb
translate(-30, -20);
rotate(radians(-120));
rect(0, -5, 40, 10);

translate(40, 0);
rotate(radians(30));
rect(0, -4, 20, 8);

translate(20, 0);
rotate(radians(30));
rect(0, -3, 10, 6);
