class Snowman{

  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  isHit(ball){
    let headDist  = dist(ball.x, ball.y, this.x, this.y);
    let tummyDist = dist(ball.x, ball.y, this.x, this.y + 35);
    let footDist  = dist(ball.x, ball.y, this.x, this.y + 80);
    
    if (headDist < 25 || tummyDist < 30 || footDist < 35){
      return true;
    } else {
      return false;
    }
  }
  
  show(){
    circle(this.x, this.y, 15);
    circle(this.x, this.y + 35, 20);
    circle(this.x, this.y + 80, 25);    
  }

}