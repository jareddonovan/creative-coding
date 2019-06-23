class Clickable {
  
  constructor(x, y, w, h){
    this.x = x;
    this.y = y; 
    this.w = w; 
    this.h = h;
    this.wasClicked = false;
  }

  show(){
    if (this.wasClicked){
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    rect(this.x, this.y, this.w, this.h);
  }
  
  mousePressed(mx, my){
    // It is only clicked if all of these conditions are true.
    this.wasClicked = (mx > this.x && mx < this.x + this.w
       && my > this.y && my < this.y + this.h);
  }

}