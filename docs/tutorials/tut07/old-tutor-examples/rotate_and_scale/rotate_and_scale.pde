size(400, 400);
rectMode(CENTER);
noFill();
smooth();

float s = 1.22;
float sw = 1.0;

translate(width / 2, height / 2);

for(int i = 0; i <= 18; i++){
  rect(0, 0, 15, 15);  
  rotate(radians(90 / 6));
  scale(s);
  sw /= s;
  strokeWeight(sw);
}
