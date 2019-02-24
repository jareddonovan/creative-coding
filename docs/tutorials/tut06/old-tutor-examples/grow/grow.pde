import geomerative.*;

RFont font;

String message = "GROW";
PVector[] growthDirs;
RGroup myGroup;
RPoint[] myPoints;
int pauseTime= 2000;

void setup() {
  size(600, 400);
  background(255);

  RG.init(this);
  font = new RFont("data/RubikMonoOne-Regular.ttf", 60, CENTER);

  translate(width / 2, height / 2);

  RCommand.setSegmentLength(5);
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);

  myGroup = font.toGroup(message);
  myGroup = myGroup.toPolygonGroup();

  myPoints = myGroup.getPoints();

  growthDirs = new PVector[myPoints.length];

  for (int i = 0; i < myPoints.length; i += 1) {
    float x = myPoints[i].x;
    float y = myPoints[i].y;

    PVector pi = new PVector(0, 0);

    // For each point, find out what direction points
    // *away* from most other points.
    for (int j = 0; j < myPoints.length; j += 1) {
      if (j != i) {      
        PVector pj = new PVector(x - myPoints[j].x, y - myPoints[j].y); 
        pj.setMag(0.4 / pj.mag());
        pi.add(pj);
      }
    }

    growthDirs[i] = pi;
  }

  strokeWeight(4);
  stroke(0, 40);
  font.draw(message);

  noStroke();

  for (int i = 0; i < myPoints.length; i += 1) {
    float f = min(255, 300 * growthDirs[i].mag());
    f = 255 - f;
    stroke(f, 200);
    strokeWeight(growthDirs[i].mag());
    line(myPoints[i].x, myPoints[i].y,
      myPoints[i].x + growthDirs[i].x, myPoints[i].y + growthDirs[i].y);
  }
}

void draw() {
  if (millis() > pauseTime){
    
    translate(width / 2, height / 2);
    noStroke();

    for (int i = 0; i < growthDirs.length; i += 1) {
      float f = min(255, 300 * growthDirs[i].mag());
      f = 255 - f;
      stroke(f, 40);

      float x = myPoints[i].x;
      float y = myPoints[i].y;

      strokeWeight(10 * growthDirs[i].mag());


      myPoints[i].x += growthDirs[i].x;
      myPoints[i].y += growthDirs[i].y;

      PVector change = growthDirs[i].copy();
      change.rotate(radians(random(-20, 20)));
      change.setMag(change.mag() * 0.4998);

      line(x + growthDirs[i].x, y + growthDirs[i].y, 
        x + growthDirs[i].x + change.x, y + growthDirs[i].y + change.y);

      growthDirs[i].setMag(growthDirs[i].mag() * 0.4998);
      growthDirs[i].add(change);
    }
  }
}
