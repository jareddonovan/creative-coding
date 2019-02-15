let txt = "shivering";
let font;

function preload(){
	font = loadFont("data/LibreBaskerville-Regular.ttf");
}

function setup(){
  createCanvas(400, 400);
  textSize(48);
  textFont(font);  
  textAlign(CENTER);
  noStroke();
  smooth();
  background(0);
}

function draw(){

  background(0);
  fill(255);
  let txtH = 48;
  let txtW = textWidth(txt);
  let spacing = txtW / txt.length;
    
  for(let i = 0; i < txt.length; i++){
    let c = txt.charAt(i);
    
    let offsetX = random(-spacing / 10.0, spacing / 10.0);
    let offsetY = random(-spacing / 10.0, spacing / 10.0);
        
    let startX = (width - txtW) / 2 + spacing / 2;
    let y = height / 2; //  + textHeight / 2;
    text(c, startX + i * spacing + offsetX, y + offsetY);
  }
}
