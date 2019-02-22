Ball[] balls = {};

void setup() {
  size(600, 600);
}

void draw() {
  background(255);
  for(int i = 0; i < balls.length; i++){
    balls[i].move();
    balls[i].display();
  }
}

void mousePressed(){
  Ball new_ball = new Ball(mouseX, mouseY);
  balls = (Ball[]) append(balls, new_ball);
}
