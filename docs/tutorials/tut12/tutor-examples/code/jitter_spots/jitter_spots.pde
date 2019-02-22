int spacing = 50;
float z = 0.0;
float inc = 0.002;

void setup(){
  size(400, 400);
  smooth();
  frameRate(15);
  background(255);
  colorMode(HSB);
  fill(0);
  noStroke();
}

void draw(){
  background(255);
  
  z += inc;
  fill(255, 10);
  rect(0, 0, width, height);
  for(int x = spacing / 2; x < width; x += spacing){
    for(int y = spacing / 2; y < height; y += spacing){
      float n = noise(x, y, z);
      fill(120 + n * 125);
      int r = int(n * 10) + 10;
      drawSpot(x, y, r);
    }
  }
}

void drawSpot(int x, int y, int r){
  ellipse(jitter(x), jitter(y), jitter(r), jitter(r));
}

int jitter(int num){
  return jitter(num, 1);
}

int jitter(int num, int amt){
  return int(num + random(-amt, amt));
}
