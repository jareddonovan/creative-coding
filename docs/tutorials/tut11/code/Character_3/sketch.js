function setup() {
  createCanvas(200, 200);
  smooth();
  background("#5CA7CB");
  strokeWeight(2);
  strokeCap(ROUND);

  translate(width / 2, height / 2);

  // Petals
  push();
  for(let i = 0; i < 360; i += 40){
    fill(noise(i / 10.0) * 100 + 155, 120, 0); 
    rotate(radians(40));
    ellipse(70, 0, 40, 50);
  }
  pop();

  fill("#F0FF83");
  ellipse(0, 0, 140, 140);

  fill(0);
  // Eyes
  push();
  rotate(radians(20));
  ellipse(-40, 0, 30, 20);
  rotate(radians(-40));
  ellipse(40, 0, 30, 20);
  pop();

  // Mouth
  push();
  fill(255);
  translate(-40, 16);
  triangle(-4, 0, 4, 0, 0, 20);
  translate(80, 0);
  triangle(-4, 0, 4, 0, 0, 20);

  translate(-40, -6);
  noFill();
  strokeWeight(4);
  arc(0, 0, 100, 20, 0, PI);

  pop();

  saveCanvas("character_3.png");
}