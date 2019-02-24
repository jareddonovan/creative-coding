class FontAgent {

  PVector loc;
  float motion;

  FontAgent(PVector l) {
    loc = l.get();
  }

  void motion() {
    float noiseScale = map(mouseX, 0, width, 0.001, 0.01); //Smaller numbers give less variation in the noise val.
    float noiseZ = map(mouseY, 0, height, frameCount*0.0003, frameCount*0.02);//Greater numbers will make the motion more nervous.
    motion = noise(loc.x * noiseScale * noiseZ, loc.y * noiseScale * noiseZ) * 53;
  }  


  void display() {
    noStroke();
    fill(255, 53);
    ellipse(loc.x, loc.y, motion+step, motion+step);
  }
}

