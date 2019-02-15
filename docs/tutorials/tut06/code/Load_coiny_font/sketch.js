let font;

function preload(){
	font = loadFont("data/Coiny-Regular.ttf");
}

function setup() {
  createCanvas(400, 400);
  textFont(font);
  textSize(50);
  textAlign(LEFT, CENTER);
  
}

function draw() {
  background(220);
  let msg = "This message is written in a font called Coiny";
  text(msg, 25, 25, width - 50, height - 50);
}