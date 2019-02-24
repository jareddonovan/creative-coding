
import processing.opengl.*;
import geomerative.*;

//-----------------------------------------------------
Particle p;
ArrayList particles;

RFont font;
RShape s;
float distMin=40;

//-----------------------------------------------------
void setup() {
  size(640, 350, OPENGL);
  smooth();
  particles = new ArrayList();

  RG.init(this);
  RCommand.setSegmentLength(10);
  font = new RFont("FreeSans.ttf", 273, RFont.CENTER);
  RGroup maGroupe = font.toGroup("GEO");
  RPoint[] points = maGroupe.getPoints();

  for (int i=0;i<points.length;i++) {
    particles.add(new Particle(points[i].x, points[i].y, 3));
  }
}

//-----------------------------------------------------
void draw() {
  translate(width/2, 275);
  background(0);
  fill(255, 50);
  strokeWeight(0.3);
  stroke(0,255,255, 50);

  for (int i=0;i<particles.size();i++) {
    Particle p = (Particle) particles.get(i);
    p.draw();

    float dpart=0;
    for (int j =0;j<particles.size();j++) {

      Particle pj = (Particle)particles.get(j);
      dpart = p.distance(pj);

      if (dpart <= distMin) {
       // stroke(255, map(dpart, 0, distMin, 255, 0));
        line(p.x, p.y, pj.x, pj.y);
      }
    }
  }
}

//-----------------------------------------------------
void keyPressed() {
  if (key == ' ') {
    saveFrame("captures/capture_"+(new Date().getTime())+".tiff");
    println("save TIFF");
  }
}

