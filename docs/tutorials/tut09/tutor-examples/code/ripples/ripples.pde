// Date 28/March/2018

ArrayList<Ripple> ripples;

void setup(){
  size(800, 800);
  background(0);
  
  ripples = new ArrayList<Ripple>();
  
}

void draw(){
  for (Ripple r : ripples){
    r.display();
  }
}

void mousePressed(){
  ripples.add(new Ripple(mouseX, mouseY));
}
