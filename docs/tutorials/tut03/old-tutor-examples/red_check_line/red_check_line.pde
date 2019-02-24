

void setup(){
  size(800, 100);
}

void draw(){
  background(255);
  
  for (int i = 0; i < width; i += 100){
    if ((i / 100) % 2 == 0){
      fill(255, 0, 0);
    }
    else {
      fill(255);
    }
    rect(i, 0, 100, height);




  }
  
}
