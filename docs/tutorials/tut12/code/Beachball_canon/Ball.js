class Ball extends LimitedParticle {

  constructor(ix, iy, ivx, ivy, ir) {
    super(int(ix), int(iy), ivx, ivy, ir);
    
    this.ballColor = color(255, 255, 0);

    let baseHue = random(255);
    this.rotation = random(radians(360));
    let baseVel = dist(0, 0, this.vx, this.vy);
    this.angularV = (random(baseVel / 2, baseVel)) / 50.0;

    this.sprite = createGraphics(int(this.radius * 2 + 10), int(this.radius * 2 + 10));
    //this.sprite.beginDraw();
    this.sprite.colorMode(HSB);
    this.sprite.noStroke();
  	this.sprite.translate(this.sprite.width / 2, this.sprite.height / 2);
    for (let i = 0; i < 3; i++) {
      this.sprite.rotate(radians(120));
      this.sprite.fill((baseHue + (i * (255 / 3.0))) % 255, 200, 255); 
      this.sprite.arc(0, 0, this.radius * 2, this.radius * 2, 0, radians(120));
    }
    this.sprite.fill(255);
    this.sprite.ellipse(0, 0, this.radius * 0.8, this.radius * 0.8);
    //this.sprite.endDraw();
  }

  update() {
    let v = dist(0, 0, this.vx, this.vy);
    if(v > 0.1){
      if(v > 1.0){
        this.rotation += this.angularV;    
      }
      else {
        this.rotation += this.angularV * v;      
      }
    }
    super.update();
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    image(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
    pop();
  }

  limit() {
    super.limit();
    if (this.y > height - 20 - this.radius) {
      this.y = height - 20 - this.radius;
      this.vy = -this.vy;
    }
  }
}