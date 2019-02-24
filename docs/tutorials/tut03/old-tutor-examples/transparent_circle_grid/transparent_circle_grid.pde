// Date: 19 / April / 2018

int spacing = 40;
int hSize = 40;
int vSize = 40;

void setup(){
  size(600, 400);
  fill(255, 80);
  noStroke();
}

void draw(){
  clear();
  
  for (int i = 0; i < width; i += spacing){
    for (int j = 0; j < height; j += spacing){
      if ((i / spacing + j / spacing) % 2 == 0){
        ellipse(i + spacing / 2, j + spacing / 2, hSize, vSize);
      }
      else {
        ellipse(i + spacing / 2, j + spacing / 2, vSize, hSize);      
      }
    }
  }
}

void keyPressed(){
  if (key == CODED){
    if (keyCode == LEFT){
      hSize -= 1;
    }
    else if (keyCode == RIGHT){
      hSize += 1;    
    }
    else if (keyCode == DOWN){
      vSize -= 1;
    }
    else if (keyCode == UP){
      vSize += 1;    
    }
  }
}
