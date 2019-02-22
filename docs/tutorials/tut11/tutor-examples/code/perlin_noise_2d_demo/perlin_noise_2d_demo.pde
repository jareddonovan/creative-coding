// Based on example 15_09 from the text
float xn = 0.0; 
float yn = 0.0;
float inc = 0.02;

size(700, 100);

for (int y = 0; y < height; y++) {
  for (int x = 0; x < width; x++) {
    float gray = noise(xn, yn) * 255;
    stroke(gray);
    point(x, y);
    xn = xn + inc;
  }
  xn = 0;
  yn = yn + inc;
}

save("perlin_noise_2d_demo-screenshot.png");
