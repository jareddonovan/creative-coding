class Ripple{
 
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.c = color(random(255), random(255), 255);
    this.t = millis();
    this.maxSize = 300;
    this.rippleSpace = 20;
  }
  
  display(){
    let timeElapsed = millis() - this.t;
    noFill();
    
    for (let i = 0; i < min(timeElapsed, this.maxSize); i += this.rippleSpace){
      stroke(this.c);
      ellipse(this.x, this.y, i, i);
    }
  }
}