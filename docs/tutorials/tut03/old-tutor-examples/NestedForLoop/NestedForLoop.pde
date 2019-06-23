PImage forloop;
float x = -500/3;
float y = -500/3;
int count = 0;
boolean draw = false;
boolean xInit = false;
boolean yInit = false;
boolean finish = false;
int[] r1 = {569, 58, 102, 33};
int[] r2 = {682, 58, 135, 33};
int[] r3 = {824, 58, 143, 33};
int[] r4 = {591, 104, 102, 31};
int[] r5 = {704, 104, 120, 31};
int[] r6 = {835, 102, 136, 31};
int[] r7 = {551, 140, 260, 46};
int[] r = {0, 0, 0, 0};
void setup() {
  size(1000, 500);
  background(255);
  forloop = loadImage("forloopFinal2.png");
  line(width/2, 0, width/2, height);
}

void draw() {
  if (draw) {
    fill(0);
    ellipse(x, y, 125, 125);
  }
  
  fill(255);
  rect(width/2, 0, width/2, height);
  
  image(forloop, 1+width/2, 36, width/2, height/2);
  
  fill(235);
  rect(788, 325, 957-788, 388-325);

  fill(0);
  textSize(15);
  text("Conditional Evaluator", 788, 315);
  textSize(25);
  if (x >= 0) {
    text("x = " + int(x), width/2+30, 130+height/2);
  }
  if (y >= 0) {
    text("y = " + int(y), width/2+30, 100+height/2);
  }
  
  text("width = " + width/2, width/2+30, 180+height/2);
  text("height = " + height, width/2+30, 210+height/2);

  String conditional;
  if ((r == r2)&&(y != -125)) {
    text(int(y) + " <= " + height, 50+3*width/4, 100+height/2);
    if (y <= height) {
      fill(0, 255, 0);
      conditional = "TRUE";
    } else {
      fill(255, 0, 0);
      conditional = "FALSE";
    }

    text(conditional, 70+3*width/4, 130+height/2);
    
  }
  if (r == r5) {
    text(int(x) + " <= " + width/2, 50+3*width/4, 100+height/2);
    if (x <= width/2) {
      fill(0, 255, 0);
      conditional = "TRUE";
    } else {
      fill(255, 0, 0);
      conditional = "FALSE";
    }
    text(conditional, 70+3*width/4, 130+height/2);
  }


  fill(255, 255, 0, 50);
  rect(r[0], r[1], r[2], r[3]);
  
}

void keyPressed() {
  if (finish){
    y = -125;
    r[0] = 0;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
  }
  //saveFrame("####.png");
  if (!yInit) {
    if (count == 0) {
      r = r1;
      y = 0;
    }
    if (count == 1) {
      r = r2;
      count = -1;
      yInit = true;
      if (y > height) {

        
        finish = true;
      }
    }
  } 
  else if (!xInit) {
    if (count == 0) {
      r = r4;
      x = 0;
    }
    if (count == 1) {
      r = r5;
      count = -1;
      xInit = true;
    }
  } 
  else {
    if (count == 0) {
      draw = true;
      r = r7;
    }
    else {
      draw = false;
      if (count == 1) {
        if (x > width/2) {
          x = -125;
          xInit = false;
          yInit = false;
          y += height/2;
          r = r3;
          count = 0;
        } 
        else {
          r = r6;
          x+=width/4;
        }
      }
      if (count == 2) {
        r = r5;
        count = -1;
        if (x > width/2) {
          count = 0;
        }
      }
    }
  }
  if (!finish) {
    count += 1;
  }
}