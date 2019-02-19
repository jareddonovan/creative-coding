
void setup(){
  fill(0, 20);
  frameRate(10);
}

void draw(){
  background(200);
  ellipse("big");
  ellipse("small");
  ellipse("medium"); 
}

void ellipse(String siz){
  int r = 0;
  if(siz.equals("big")){
    r = 100;
  }
  else if(siz.equals("medium")){
    r = 50;
  }
  else if(siz.equals("small")){
    r = 10;
  }
  ellipse(random(width), random(height), r, r);
}
