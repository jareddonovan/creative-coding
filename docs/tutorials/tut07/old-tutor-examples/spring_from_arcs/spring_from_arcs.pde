int r1 = 25;
int r2 = 100;
int a = 30;

void setup() {
  size(1000, 600, P2D);
  strokeWeight(3);
  smooth();
  noFill();
}

void draw() {
  background(205);

  int diff = r2 - r1;

  float inc = diff * cos(radians(a));
  float off = diff * sin(radians(a));

  //int x = width / 2;
  int y = height / 2;

  for(float x = -2 * inc; x < width + (2 * inc); x += (2 *  inc)){

/*    
    stroke(0);
    strokeWeight(1);
    // Small circle
    ellipse(x, y - off, 2 * r1, 2 * r1);  
    // Big circle
    ellipse(x + inc, y, 2 * r2, 2 * r2);
*/  
//    stroke(255, 0, 0);
//    strokeWeight(3);
    
    stroke(205);
    strokeWeight(7);
    arc(x + inc, y, 2 * r2, 2 * r2, radians(360 - a), radians(360 + 180 + a));
    stroke(0);
    strokeWeight(3);
    arc(x + inc, y, 2 * r2, 2 * r2, radians(360 - a), radians(360 + 180 + a));
    
    arc(x, y - off, 2 * r1, 2 * r1, radians(180 + a), radians(360 - a));
    
  }
    
  //a += 10;
  //if(a >= 360){
  //  a = 0;
  //}
}

void keyPressed() {
  int aInc = 1;
  
  if (keyCode == LEFT) {
    r1 -= 1;
  } else if (keyCode == RIGHT) {
    r1 += 1;
  } else if (keyCode == UP) {
    a += aInc;
  } else if (keyCode == DOWN) {
    a -= aInc;
  }
  
  if(a >= 90){
    a = 90 - aInc;
  }
  else if(a <= -90){
    a = -90 + aInc;
  }
}