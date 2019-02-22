size(200, 200);
smooth();
background(#5CA7CB);
strokeWeight(2);
strokeCap(ROUND);

translate(width / 2, height / 2);

fill(#FBFF83);
ellipse(0, 0, 150, 150);


fill(0);
// Eyes
pushMatrix();
rotate(radians(10));
ellipse(-50, 0, 10, 20);
rotate(radians(-20));
ellipse(50, 0, 10, 20);
popMatrix();

// Hair
pushMatrix();
rotate(radians(-140));
for(int i = 0; i <= 8; i++){
  rotate(radians(10));
  line(75, 0, 85, 0);
}
popMatrix();

// Mouth
pushMatrix();
translate(0, 20);
arc(0, 0, 100, 80, 0, PI);
line(-50, 0, 50, 0); 

popMatrix();

save("character_1.png");

