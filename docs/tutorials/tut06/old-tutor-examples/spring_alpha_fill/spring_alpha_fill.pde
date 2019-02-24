void setup(){

  textSize(24);
  textAlign(CENTER, CENTER);
  noCursor();
}

void draw(){
  background(127);
  
  for (int i = 0; i < 6; i++){
    int x = width / 2 + i * (mouseX - width / 2) / 6;
    int y = height / 2 + i * (mouseY - width / 2) / 6;
    fill(255, i * (255 / 6));
    text("Spring", x, y);
  }
}
