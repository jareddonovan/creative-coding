function setup(){
  // xSample will be the point from which we sample the noise.
  let xSample = 0.0;

  // The inc is how far we move the sample point each time we sample
  let inc = 0.02;

  createCanvas(700, 100);
  background(200);
  stroke(0);

  // Loop across the width of the screen.
  // Each time, sample the noise() function and use this to draw a line
  // with a varying length.
  for (let x = 0; x < width; x++) {
    // The noise function will return a value between 0..1.
    let n = noise(xSample);

    // Use the noise value to give a length. Scale from 0..1 to 0..height
    let len = n * height;
    line(x, height, x, height - len);

    // Move the sample point, so next time we get a bit different value.
    xSample = xSample + inc;
  }
}