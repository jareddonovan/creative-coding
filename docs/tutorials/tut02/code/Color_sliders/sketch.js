let sldRed;
let sldGreen;
let sldBlue;
let sldAlpha;

function setup() {
  createCanvas(400, 400);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(30);
  
  sldRed = createSlider(0, 255, random(255));
	createSpan(" RED");
	createElement("br");
  sldGreen = createSlider(0, 255, random(255));
  createSpan(" GREEN");  
	createElement("br");
  sldBlue = createSlider(0, 255, random(255));
  createSpan(" BLUE");  
	createElement("br");
  sldAlpha = createSlider(0, 255, random(255));
  createSpan(" ALPHA");  
	createElement("br");
}

function draw() {
  let r = sldRed.value();
  let g = sldGreen.value();
  let b = sldBlue.value();
  let a = sldAlpha.value();
  
  background(0);
  fill(204);
  rect(200, 0, 200, 400);
  
  fill(r, g, b, a);
  circle(200, 200, 180);
  
  if (a < 127 || (r + g + b) < (127 * 3)){
  	fill(255);
  } else {
	  fill(0);
  }
  text(`fill(${r}, ${g}, ${b})`, 200, 200);
}