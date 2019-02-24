/** 
 * Experiment with using PVector to control colour
 */

/* @pjs font="data/RubikMonoOne-Regular.ttf"; */

PVector h, s, b;
PGraphics text;
PGraphics gradient;
PFont myFont;

void setup() {
  //fullScreen(P3D, 2);
  size(600, 400);
  colorMode(HSB, 1.0, 1.0, 1.0, 1.0);

  randomSeed(5);

  text = createGraphics(width, height);
  gradient = createGraphics(width, height);
  myFont = createFont("data/RubikMonoOne-Regular.ttf", 100);

  randomiseVectors();    
  setupGradient();  

  text.beginDraw();
  text.colorMode(HSB, 1.0, 1.0, 1.0, 1.0);
  text.noStroke();
  // text.background(1);
  text.fill(0);
  text.textFont(myFont);
  text.textAlign(CENTER, CENTER);
  text.text("COLOUR", text.width / 2, text.height / 2);

  text.loadPixels();
  for (int i = 0; i < text.pixels.length; i++) {
    if (text.alpha(text.pixels[i]) > 0) {
      float h = text.hue(gradient.pixels[i]);
      float s = text.saturation(gradient.pixels[i]);
      float b = text.brightness(gradient.pixels[i]);
      float a = text.alpha(text.pixels[i]);

      text.pixels[i] = color(h, s, b, a);
    }
  }
  text.updatePixels();

  text.endDraw();
}

void draw() {
  //fill(1);

  gradient.beginDraw();
  gradient.loadPixels();

  for (int i = 0; i < gradient.pixels.length; i++) {
    if (i < gradient.pixels.length - 1 && (i + 1) % gradient.width != 0) {

      gradient.pixels[i] = gradient.pixels[i + 1];
    } else { 
      gradient.pixels[i] = calcColor();
    }
  }

  gradient.updatePixels();
  gradient.endDraw();
  rotateVectors();

  image(gradient, 0, 0);
  image(text, 0, 0);
}

void setupGradient() {
  gradient.beginDraw();
  // gradient.colorMode(HSB, 1.0, 1.0, 1.0, 1.0);
  gradient.loadPixels();
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      gradient.pixels[j * width + i] = calcColor();
    }  
    rotateVectors();
  }

  gradient.updatePixels();
  gradient.endDraw();
}

void rotateVectors() {
  h.rotate(0.0001);
  s.rotate(0.0005);
  b.rotate(0.00001);
}

color calcColor() {
  return color(
    max(0, min(1.0, h.x + random(-0.001, 0.001))), 
    max(0, min(1.0, 0.5 + random(-0.005, 0.005) + s.x)), 
    max(0, min(1.0, 0.5 + random(-0.005, 0.005) + b.x)));
}

color ditherColor(color col) {
  float h = hue(col);
  float s = saturation(col);
  float b = brightness(col);
  return color(
    max(0, min(1.0, h + random(-0.001, 0.001))), 
    max(0, min(1.0, 0.5 + random(-0.005, 0.005) + s)), 
    max(0, min(1.0, 0.5 + random(-0.005, 0.005) + b)));
}

void randomiseVectors() {
  h = new PVector(random(1.0), random(1.0));
  s = new PVector(random(1.0), random(1.0));
  b = new PVector(random(1.0), random(1.0));

  h.setMag(1.0);
  s.setMag(0.5);
  b.setMag(0.5);
}

void keyPressed() {
  if (key == 's') {
    save("pvector_color-screenshot.png");
  } else {
    //randomiseVectors();
    //setupGradient();
  }
}
