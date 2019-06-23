const START = 0;
const PLAY  = 1;
const LOSE  = 2;
const WIN   = 3;

let state = START;

let timeAllowed = 10000;
let timeStarted = 0;

function setup() {
  createCanvas(600, 400);
  textSize(48);
  textAlign(CENTER, CENTER);  
}

function draw() {
  background(204);
  if (state === START){
    drawStart();
  } else if (state === PLAY){
    drawPlay();
  } else if (state === LOSE){
    drawLose();
  } else if (state === WIN){
    drawWin();
  }
}

function drawStart(){
  fill(0);
  text("Press any key to START", 0, 0, width, height);
}

function drawPlay(){
  
  let timeTaken = int(millis() - timeStarted);
  
  fill(0, 0, 255);
  text(timeTaken, width / 2, 60);
  text("Click MOUSE to WIN", 0, 0, width, height);
  
  if (timeTaken > timeAllowed){
    state = LOSE;
  }
}

function drawLose(){
  fill(255, 0, 0);
  text("TIME IS UP", 0, 0, width, height);
  fill(0);
  text("Press any key to retry", width / 2, height - 60);
}

function drawWin(){
  fill(0, 155, 0);
  text("YOU WIN", 0, 0, width, height);
  fill(0);
  text("Press any key to retry", width / 2, height - 60);
}

function keyPressed(){
  if (state === START){
    timeStarted = millis();
    state = PLAY;
  } else if (state === LOSE){
    state = START;
  } else if (state === WIN){
    state = START;
  }
}

function mousePressed(){
  if (state === PLAY){
    state = WIN;
  }
}