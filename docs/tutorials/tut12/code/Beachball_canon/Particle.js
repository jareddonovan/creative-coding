class Particle {

  constructor(xpos, ypos, velx, vely, r) {
    // The x- and y-coordinates
    this.x = xpos;
    this.y = ypos;

    // The x- and y-velocities
    this.vx = velx;
    this.vy = vely;

    // Particle radius
    this.radius = r;

    // Gravity
    this.gravity = 0.1;
  }

  update() {
    this.vy = this.vy + this.gravity;
    this.y += this.vy;
    this.x += this.vx;
  }

  display() {
    ellipse(this.x, this.y, this.radius * 2);
  }
}