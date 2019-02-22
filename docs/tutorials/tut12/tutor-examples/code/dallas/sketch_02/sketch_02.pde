Ball[] balls = {};

void setup() {
  size(800, 600);
}

void draw() {
  background(120);
  for(int i = 0; i < balls.length; i++){
    balls[i].move();
    balls[i].display();
  }
}

void mousePressed(){
  Ball new_ball = new Ball(mouseX, mouseY);
  balls = (Ball[]) append(balls, new_ball);
}
