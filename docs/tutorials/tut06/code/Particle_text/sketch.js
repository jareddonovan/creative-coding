let font;
let points;
let bounds;

function preload() {
  font = loadFont('./assets/Avenir.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  points = font.textToPoints(
    'secret', 0, 0, 200, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });

  bounds = font.textBounds(
    'secret', 0, 0, 200);

  cursor(CROSS);
  fill(255, 127);
  noStroke();
}

function draw() {
  background(0);
  
  stroke(51);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  noStroke();
  
  let centerDist = dist(mouseX, mouseY, width / 2, height / 2);

  let transparency = map(centerDist, 0, width / 2, 200, 50);
  transparency = constrain(transparency, 50, 200);
	fill(255, transparency);
  
  let jiggle = map(centerDist, 0, width, 1, 300);

  translate((width - abs(bounds.w)) / 2, 
            (height + abs(bounds.h)) / 2);
  
// 	stroke(255, 0, 0);
//   rect(bounds.x, bounds.y, bounds.w, bounds.h);
  
//   console.log("x: " + bounds.x 
//               + ", y: " + bounds.y
//               + ", w: " + bounds.w
//               + ", h: " + bounds.h);
  
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    ellipse(p.x + jiggle * randomGaussian(), 
      p.y + jiggle * randomGaussian(), 5, 5);
  }

  //noLoop();
}