class Puck {

  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;  
  }
  
  move(amtX, amtY){
    let newX = this.x + amtX;
    let newY = this.y + amtY;
    
    
    let c = bg.get(newX, newY);
    let a = alpha(c);

    console.log(a);
    
    if (a === 255 || newX <= 0 || newY <= 0){
      console.log("can't move there buddy");
    } else {
      this.x = newX;
      this.y = newY;
    }
  }

  show(){
    rect(this.x, this.y, this.w, this.h);
  }

}