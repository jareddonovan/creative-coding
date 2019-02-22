class Canon {
  
  constructor(x, y, angle, scale) {
  	this.wheelDiam = 110;
  	this.wheelRadians = PI / this.wheelDiam;
  	this.balls = [];
    
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.scale = scale;

    // Set up the PGraphics objects for drawing the wheel and the barrel. 
    // This saves having to redraw these each time through the draw loop 
    // and should make the sketch run a bit smoother.
    this.barrel = createGraphics(180, 46);
    // this.barrel.beginDraw();
    this.barrel.smooth();
    this.barrel.fill(80);
    this.barrel.noStroke();
    this.barrel.ellipse(30, this.barrel.height / 2, 50, 40);
    this.barrel.ellipse(5, this.barrel.height / 2, 10, 10);
    this.barrel.quad(30, 3, 180, 8, 180, this.barrel.height - 8, 30, this.barrel.height - 3);
    this.barrel.stroke(70);
    this.barrel.strokeWeight(5);
    this.barrel.line(30, 3, 30, this.barrel.height - 4);
    this.barrel.line(40, 3, 40, this.barrel.height - 4);
    this.barrel.line(160, 7, 160, this.barrel.height - 8);
    this.barrel.line(170, 7, 170, this.barrel.height - 8); 
    // this.barrel.endDraw();

    this.wheel = createGraphics(int(this.wheelDiam) + 10, int(this.wheelDiam) + 10);
    // this.wheel.beginDraw();
    this.wheel.noFill();
    this.wheel.stroke(121, 83, 1);
    this.wheel.strokeWeight(5);
    this.wheel.translate(this.wheel.width / 2, this.wheel.height / 2);
    for (let i = 0; i < 12; i++) {
      this.wheel.rotate(radians(360 / 12));
      this.wheel.line(0, 0, 0, 50);
    }  
    this.wheel.stroke(80, 55, 1);
    this.wheel.strokeWeight(10);
    this.wheel.ellipse(0, 0, 100, 100);
    this.wheel.strokeWeight(2);
    this.wheel.ellipse(0, 0, 15, 15);
    this.wheel.fill(40);
    this.wheel.noStroke();
    this.wheel.ellipse(0, 0, 8, 8);
    // this.wheel.endDraw();
  }

  update() {
    this.angle = atan2(mouseY - this.y, mouseX - this.x);

    for (let b of this.balls) {
      b.update();
    }
  }

  display() {
    let wheelRotation = this.x * this.wheelRadians;

    for (let b of this.balls) {
      b.display();
    }

    // Draw canon
    push();
    translate(this.x, this.y);
    scale(this.scale, this.scale);

    push();
    rotate(this.angle);
    image(this.barrel, -70, -this.barrel.height / 2);
    pop();

    push();
    rotate(wheelRotation);
    image(this.wheel, -this.wheel.width / 2, -this.wheel.height / 2);
    pop();

    pop();
  }

  fire(targetX, targetY) {
    let endOfBarrel = createVector(110 * this.scale, 0).rotate(this.angle);
    let launchX = this.x + endOfBarrel.x;
    let launchY = this.y + endOfBarrel.y;
    
    let d = dist(this.x, this.y, targetX, targetY) / (60.0 * this.scale);
    this.balls.push(new Ball(launchX, launchY, cos(this.angle) * d, sin(this.angle) * d, 10));    
  }
}