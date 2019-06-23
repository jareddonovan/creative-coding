let ball;
let snowy;

function setup() {
  createCanvas(400, 400);
  snowy = new Snowman(width - 35, height / 2);
}

function draw() {
  background(220);
  fill(255);
  
  if(ball){
    ball.show();

    if (snowy.isHit(ball)){
      fill(255, 0, 0);
    }
    
    ball.update();
  }
  
  snowy.show();
}

function mousePressed(){
  ball = new Snowball(20, mouseY, 5);  
}