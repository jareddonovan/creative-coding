let spacing = 50;
let z = 0.0;
let inc = 0.002;

function setup(){
  createCanvas(400, 400);
  smooth();
  frameRate(15);
  background(255);
  //colorMode(HSB);
  fill(0);
  noStroke();
}

function draw(){
  background(255);
  
  z += inc;
  fill(255, 10);
  rect(0, 0, width, height);
  for(let x = spacing / 2; x < width; x += spacing){
    for(let y = spacing / 2; y < height; y += spacing){
      let n = noise(x, y, z);
      fill(120 + n * 125);
      let r = int(n * 10) + 10;
      drawSpot(x, y, r);
    }
  }
}

function drawSpot(x, y, r){
  ellipse(jitter(x), jitter(y), jitter(r));
}

function jitter(num, amt = 1){
  return int(num + random(-amt, amt));
}
