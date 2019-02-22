function setup() {
  // Based on example 15_09 from the text
  let xn = 0.0;
  let yn = 0.0;
  let inc = 0.02;

  createCanvas(700, 100);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let gray = noise(xn, yn) * 255;
      stroke(gray);
      point(x, y);
      xn = xn + inc;
    }
    xn = 0;
    yn = yn + inc;
  }
}
