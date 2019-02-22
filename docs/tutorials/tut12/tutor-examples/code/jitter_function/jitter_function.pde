void setup(){
  size(400, 400);
}

void draw(){
  background(204);
  for(int x = 20; x < width; x += 40){
    for(int y = 20; y < height; y += 40){
      float r = jitter(20,10);
      circle(x, y, r);
    }
  }
}

// We can define a function to do some drawing work for us.
void circle(int x, int y, float r){
  ellipse(x, y, r, r);
}

// Note: The return statement is how the function gives 
//       a result back to us.
float jitter(float num, float amt){
  return num + random(-amt, amt);
}

