class Ball extends LimitedParticle {
  color ballColor = color(255, 255, 0);
  PGraphics sprite;
  float rotation;
  float angularV;

  Ball(float ix, float iy, float ivx, float ivy, float ir) {
    super(int(ix), int(iy), ivx, ivy, ir);

    float baseHue = random(255);
    rotation = random(radians(360));
    float baseVel = dist(0, 0, vx, vy);
    angularV = (random(baseVel / 2, baseVel)) / 50.0;

    sprite = createGraphics(int(radius * 2 + 10), int(radius * 2 + 10));
    sprite.beginDraw();
    sprite.colorMode(HSB);
    sprite.noStroke();
    sprite.translate(sprite.width / 2, sprite.height / 2);
    for (int i = 0; i < 3; i++) {
      sprite.rotate(radians(120));
      sprite.fill((baseHue + (i * (255 / 3.0))) % 255, 200, 255); 
      sprite.arc(0, 0, radius * 2, radius * 2, 0, radians(120));
    }
    sprite.fill(255);
    sprite.ellipse(0, 0, radius * 0.8, radius * 0.8);
    sprite.endDraw();
  }

  void update() {
    float v = dist(0, 0, vx, vy);
    if(v > 0.1){
      if(v > 1.0){
        rotation += angularV;    
      }
      else {
        rotation += angularV * v;      
      }
    }
    super.update();
  }

  void display() {
    pushMatrix();
    translate(x, y);
    rotate(rotation);
    image(sprite, -sprite.width / 2, -sprite.height / 2);
    popMatrix();
  }

  void limit() {
    super.limit();
    if (y > height - 20 - radius) {
      y = height - 20 - radius;
      vy = -vy;
    }
  }
}