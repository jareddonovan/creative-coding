import ddf.minim.*;

Minim minim;
AudioSample stepSound;

int walkFrame = 0;
int imgW;
int imgH;
int lastFrameAt = 0;
int minTimeBetweenFrames = 50;

PImage[] walkFrames = new PImage[4];

void setup() {
  size(800, 400);
  background(255);
  fill(0);
  noStroke();

  minim = new Minim(this);
  stepSound = minim.loadSample("data/smallstep.mp3", 1024);

  walkFrames[0] = loadImage("data/walk-cycle-0.png");
  walkFrames[1] = loadImage("data/walk-cycle-1.png");
  walkFrames[2] = loadImage("data/walk-cycle-2.png");
  walkFrames[3] = loadImage("data/walk-cycle-3.png");
  
  // Get the image width and height so we can center on the screen
  imgW = walkFrames[0].width;
  imgH = walkFrames[0].height;
}

void draw() {
  background(255);
  rect(0, height - 10, width, 10);
  
  text(walkFrame, 10, 20);

  image(walkFrames[walkFrame], (width - imgW) / 2, height - imgH, imgW, imgH);  
}

void keyPressed(){

  int timeNow = millis();

  // Only trigger a new frame if enough time has elapsed.
  if (timeNow - lastFrameAt > minTimeBetweenFrames){
    
    // Check for key.
    if (key == 'a'){
      // A = move back a frame.
      lastFrameAt = timeNow;

      walkFrame = walkFrame - 1;
      if (walkFrame < 0){
        walkFrame = walkFrames.length - 1;
      }
      
      if (walkFrame == 1){
        stepSound.trigger();
      }
    }
    else if (key == 'd'){
      // D = move forward a frame.
      lastFrameAt = timeNow;
  
      walkFrame = walkFrame + 1;
      if (walkFrame >= walkFrames.length){
        walkFrame = 0;
      }

      if (walkFrame == 1){
        stepSound.trigger();
      }

    }    
  }
}
