class LimitedParticle extends Particle {

  constructor(ix, iy, ivx, ivy, ir) {
    super(ix, iy, ivx, ivy, ir);
    this.friction = 0.99;
  }

  update() {
    this.vy *= this.friction;
    this.vx *= this.friction;
    super.update();
    this.limit();
  }

  limit() {
    if (this.y > height - this.radius) {
      this.vy = -this.vy;
      this.y = constrain(this.y, -height * height, height - this.radius);
    }
    if ((this.x < this.radius) || (this.x > width - this.radius)) {
      this.vx = -this.vx;
      this.x = constrain(this.x, this.radius, width - this.radius);
    }
  }
}