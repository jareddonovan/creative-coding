function setup() {
  createCanvas(200, 200);
  smooth();
  background("#5CA7CB");
  strokeWeight(2);
  strokeCap(ROUND);
  noStroke();

  let lightBrown = color("#E5A931");
  let darkBrown = color("#744D00");


  let w = width;
  let h = height;
  let s = w / 10;
  let per1 = sin(radians(10 * frameCount));
  let per2 = sin(radians(20 * frameCount));
  let per3 = sin(radians(30 * frameCount));
  let per4 = sin(radians(frameCount));

  // Ears
  stroke(0);
  fill(darkBrown);
  ellipse(w / 5, h / 2 - 2 * s - per1 * 5, s * 3, s * 3);
  ellipse(4 * w / 5, h / 2 - 2 * s - per2 * 5, s * 3, s * 3);
  fill(0);
  ellipse(w / 5, h / 2 - 2 * s - per1 * 5, s * 2, s * 2);
  ellipse(4 * w / 5, h / 2 - 2 * s - per2 * 5, s * 2, s * 2);

  // Face background
  fill(lightBrown);
  ellipse(width / 2 + (per4 * 8), height / 2, width * 0.75, height * 0.75);


  noStroke();
  // Eyes
  fill(255);
  ellipse(w / 2 - s, h / 2 - s / 2, s * 3, 3 * s);
  ellipse(w / 2 + s, h / 2 - s / 2, s * 3, 3 * s);

  fill(0);
  ellipse(w / 2 - 20, h / 2, s, s);
  ellipse(w / 2 + 20, h / 2, s, s);

  stroke(0);

  // Mouth
  fill(0);
  ellipse(w / 2, 12.0 * h / 14.8, s + (10 * (per1 / 2)), s / 2);

  // Nose
  fill(darkBrown);
  ellipse(w / 2, h / 2 + s * 1.5, s * 3, s * 2);
  fill(0);
  let nostril = ((per4 + 2) / 8.0) * s;
  ellipse(w / 2 - s / 2, h / 2 + s * 2, nostril, nostril);
  ellipse(w / 2 + s / 2, h / 2 + s * 2, nostril, nostril);

  saveCanvas("character_2.png");
}