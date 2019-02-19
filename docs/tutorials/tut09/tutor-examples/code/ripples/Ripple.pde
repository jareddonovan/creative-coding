class Ripple{
  int x;
  int y;
  color c;
  int t;
  int maxSize = 300;
  int rippleSpace = 20;
  
  Ripple(int x, int y){
    this.x = x;
    this.y = y;
    this.c = color(random(255), random(255), 255);
    this.t = millis();
  }
  
  void display(){
    int timeElapsed = millis() - t;
    noFill();
    
    for (int i = 0; i < min(timeElapsed, maxSize); i += rippleSpace){
      stroke(c);
      ellipse(x, y, i, i);
    }
  }
}
