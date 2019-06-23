// Background photo by yiannis_chatzi, CC: BY NC SA.
// flickr.com/photos/yiannis_chatzi/19639640266

let bg;
let bgLeft = 0;
let moveSpeed = 15;
let p;

function preload(){
  bg = loadImage("bg.jpg");
}

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  
  p = new Puck(width / 2, height - 50);
}

function draw() {
  background(220);
  image(bg, bgLeft, 0);
  
  if(keyIsDown){
    handleKey();
  }
  
  p.show();
}

function moveBackgroundLeft(){
  let minBgLeft = -bg.width + width;
  
  if (bgLeft - moveSpeed > minBgLeft){
    bgLeft -= moveSpeed;
  }
}

function moveBackgroundRight(){
  if (bgLeft + moveSpeed < 0){
    bgLeft += moveSpeed;  
  }
}

function handleKey(){
  if (key === "a" || key === "A"){
    // Move left
    if (p.canMoveLeft()){
      p.moveLeft();
    } else {
      moveBackgroundRight();
    }
  } else if (key === "d" || key === "D"){
    // Move right.
    if (p.canMoveRight()){
      p.moveRight();
    } else {
      moveBackgroundLeft();
    }
  }
}