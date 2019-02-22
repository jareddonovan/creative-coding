function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(2);
}

function draw() {
  background(51);

  let spacing = 50;

  translate(spacing / 2, spacing / 2);
  
  for (let i = 0; i < 12; i++){
  	for (let j = 0; j < 8; j++){
    	for (let k = 0; k < 20; k++){
      	let v = createVector(0, random(1, spacing * 0.5));
        v.rotate(random(TWO_PI));
	      stroke(random(0, 60), 80, 100, 80);
        push();
        translate(i * spacing, j * spacing);
        line(0, 0, v.x, v.y);
        pop();
      }
    }
  }
}