//main

PImage src;
PGraphics outputGraphic;
PGraphics out;

void setup() { 
  size(640,640);
  selectInput("Select an image to process:", "inputSelect");
  noLoop();
  interrupt();
}

void interrupt() {
  while (src == null) {
    delay(200);
  }
  loop();
}

void draw() {
  int CANVAS_SIZE = 640; //DYLAN: CHANGE THIS TO ANY POWER OF 2 LESS THAN 640
  color[] PALETTE = nes; //DYLAN: CHANGE THIS TO ANY OF THE PALETTES LISTED IN THE PALETTES TAB
  
  limitSize(src,CANVAS_SIZE);
  outputGraphic = createGraphics(src.width,src.height);
  outputGraphic.beginDraw();
  outputGraphic.background(255,255,255);
  println("starting the drawdraw");
  ditherQuantize(src, PALETTE);
  outputGraphic.endDraw();
  println("drawdraw fin");
  //TODO: check and fix basicScale in this context.
  out = createGraphics(outputGraphic.width*(CANVAS_SIZE/width),outputGraphic.height*(CANVAS_SIZE/height));
  out = basicScale(outputGraphic,width/CANVAS_SIZE);
  image(out,0,0);
  selectOutput("Select a file to write to, or cancel to abort:", "outputSelected");
  noLoop();
}

void inputSelect(File selection) {
  if (selection == null) {
    println("Window was closed or the user hit cancel.");
    exit();
  } else {
    println("User selected " + selection.getAbsolutePath());
    src = loadImage(selection.getAbsolutePath());
  } 
}

void outputSelected(File selection) {
  if (selection == null) {
    println("Window was closed or the user hit cancel.");
  } else {
    println("User selected " + selection.getAbsolutePath());
    out.save(selection.getAbsolutePath()+".png");
  }
}