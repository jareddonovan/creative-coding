// Example 15_09 from the text

// xSample will be the point from which we sample the noise.
float xSample = 0.0; 

// The inc is how far we move the sample point each time we sample
float inc = 0.02;

void setup() {
  size(700, 100);
  stroke(0);
}

void draw() {
  for (int x = 0; x < width; x++) {
    // The noise function will return a value between 0..1.
    float n = noise(xSample);
    
    // Use the noise value to give a length. Scale from 0..1 to 0..height
    float len = n * height;
    line(x, height, x, height - len);

    // Move the sample point so that next time, we get a slightly different value.
    xSample = xSample + inc;
  }
}
