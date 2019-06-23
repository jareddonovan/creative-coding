class Snowball {
  
  constructor(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  
  update(){
    this.x += this.speed;
  }

  show(){
    circle(this.x, this.y, 10);
  }

}