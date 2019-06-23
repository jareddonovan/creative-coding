let ball;
let snowy;
let snowImg;

function preload(){
  snowImg = loadImage("snowball.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  noFill();
  snowy = new Snowman(width - 35, height / 2);
}

function draw() {
  background(220);
  noStroke();
  
  if(ball){
    ball.show();

    if (snowy.isHit(ball)){
      stroke(255, 0, 0);
      strokeWeight(4);
    }
    
    ball.update();
  }
  
  snowy.show();
}

function mousePressed(){
  ball = new Snowball(20, mouseY, 5);  
}