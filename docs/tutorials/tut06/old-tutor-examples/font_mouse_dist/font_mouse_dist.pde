int hSpacing = 36;
int vSpacing = 36;
int textSize = 48;
char c = 'X';


void setup(){
  size(480, 480);

  textFont(loadFont("data/menlo.vlw"));
  textSize(textSize);
  
}

void draw(){
  background(0);
  
  for (int row = hSpacing; row < height; row += hSpacing){
    for (int col = 0; col < width; col += vSpacing){
      float mouseDist = dist(col + vSpacing / 2, row - hSpacing / 2, mouseX, mouseY);
      float biggestDist = dist(0, 0, width, height);
      float normalizedDist = mouseDist / biggestDist;
      textSize(pow((1 - normalizedDist), 2) * 2.5 * textSize);
      text(c, col, row);
    }
  }
}

void keyPressed(){
  if (!(key == CODED)){
    c = key;
  }
  else {
    save("font_mouse_dist-screenshot.png");
  }
}
