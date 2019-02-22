// Draw a panda recursion...
PImage panda;

void setup(){
  frameRate(15);
  size(400, 400);
  noStroke();
  panda = loadImage("panda.png");
}

float step = 0;
int r = 0;

void draw(){
  println(step);
  float stepF = (step + 10) / 10.0;
  
  drawPanda( 1000 * stepF, 1000 * stepF);

  //save("panda_" + nf(int(step), 2) + ".png");

  step = step + 1;
  //step = step * 1.008;

  // Only generate one loop.
  if(step > 15){
    step = 0;
    //  noLoop();
  }
}

void drawPanda(float w, float h){
  //println("w: " + w);
  image(panda, width / 2 - w / 2, (height - h * 0.85) - 30, w, h);
  if(w < 5){
    return;
  }
  drawPanda(w / 2.5, h / 2.5);  
}

