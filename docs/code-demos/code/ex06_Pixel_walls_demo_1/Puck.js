class Puck {

  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;  
  }
  
  move(amtX, amtY){
    this.x += amtX;
    this.y += amtY;
  }

  show(){
    rect(this.x, this.y, this.w, this.h);
  }

}