class Canon {
  int x;
  int y;
  float angle;
  float scale;

  float wheelDiam = 110;
  float wheelRadians = PI / wheelDiam;

  PGraphics barrel;
  PGraphics wheel;

  ArrayList<Ball> balls = new ArrayList<Ball>();

  Canon(int x, int y, float angle, float scale) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.scale = scale;

    // Set up the PGraphics objects for drawing the wheel and the barrel. 
    // This saves having to redraw these each time through the draw loop 
    // and should make the sketch run a bit smoother.
    barrel = createGraphics(180, 46);
    barrel.beginDraw();
    barrel.smooth();
    barrel.fill(80);
    barrel.noStroke();
    barrel.ellipse(30, barrel.height / 2, 50, 40);
    barrel.ellipse(5, barrel.height / 2, 10, 10);
    barrel.quad(30, 3, 180, 8, 180, barrel.height - 8, 30, barrel.height - 3);
    barrel.stroke(70);
    barrel.strokeWeight(5);
    barrel.line(30, 3, 30, barrel.height - 4);
    barrel.line(40, 3, 40, barrel.height - 4);
    barrel.line(160, 7, 160, barrel.height - 8);
    barrel.line(170, 7, 170, barrel.height - 8); 
    barrel.endDraw();

    wheel = createGraphics(int(wheelDiam) + 10, int(wheelDiam) + 10);
    wheel.beginDraw();
    wheel.noFill();
    wheel.stroke(121, 83, 1);
    wheel.strokeWeight(5);
    wheel.translate(wheel.width / 2, wheel.height / 2);
    for (int i = 0; i < 12; i++) {
      wheel.rotate(radians(360 / 12));
      wheel.line(0, 0, 0, 50);
    }  
    wheel.stroke(80, 55, 1);
    wheel.strokeWeight(10);
    wheel.ellipse(0, 0, 100, 100);
    wheel.strokeWeight(2);
    wheel.ellipse(0, 0, 15, 15);
    wheel.fill(40);
    wheel.noStroke();
    wheel.ellipse(0, 0, 8, 8);
    wheel.endDraw();
  }

  void update() {
    angle = atan2(mouseY - y, mouseX - x);

    for (Ball b : balls) {
      b.update();
    }
  }

  void display() {
    float wheelRotation = x * wheelRadians;

    for (Ball b : balls) {
      b.display();
    }

    // Draw canon
    pushMatrix();
    translate(x, y);
    scale(scale, scale);

    pushMatrix();
    rotate(angle);
    image(barrel, -70, -barrel.height / 2);
    popMatrix();

    pushMatrix();
    rotate(wheelRotation);
    image(wheel, -wheel.width / 2, -wheel.height / 2);
    popMatrix();

    popMatrix();
  }

  void fire(float targetX, float targetY) {
    PVector endOfBarrel = new PVector(110 * scale, 0).rotate(angle);
    float launchX = x + endOfBarrel.x;
    float launchY = y + endOfBarrel.y;
    
    float d = dist(x, y, targetX, targetY) / (60.0 * scale);
    balls.add(new Ball(launchX, launchY, cos(angle) * d, sin(angle) * d, 10));    
  }
}