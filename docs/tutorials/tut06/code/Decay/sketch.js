/**
 * Very simple typographic animation. 
 *
 */

let txt="DECAY";
let font;

function preload(){
  font = loadFont("data/PlayfairDisplay-Black.ttf");
}

function setup(){
  createCanvas(1044, 223);
  
  background(255);  
  fill(0);
  noStroke();
  
  textFont(font);
  textSize(299);

  textAlign(CENTER, CENTER);
  text(txt, width / 2 - 13, height / 2 - 56);
}

function draw(){
  fill(255);
  let s = random(10);
  ellipse(random(width), random(height), s, s);
}
