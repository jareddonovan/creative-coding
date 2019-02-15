/**
 * Shows a simple typo animation
 */

let message="run";
var positions = [];
var targets = [];

let runFont;
let restFont;

let runTowards = true;
let runSpeed = 30;
let restSpeed = 1;
let currentSpeed = restSpeed;
let ts = 64;

let pauseTime = 1000;
let reachedTargetAt = 0;
let hasReachedTarget = true;

function preload(){
	runFont = loadFont("data/Poppins-SemiBoldItalic.ttf");
  restFont = loadFont("data/Poppins-SemiBold.ttf");
}

function setup(){
  createCanvas(600, 600);
  
  // Set up the positions and targets arrays
  while(positions.push([0, 0]) < message.length);
  while(targets.push([0, 0]) < message.length);
  
  textSize(ts);
  textFont(restFont);
  
  fill(0);
  background(255);

  pickNewTarget();
}

function draw(){  
  background(255);
  fill(0);
    
  if (hasReachedTarget){
    textFont(restFont);
    
    if (runTowards){
      fill(255, 0, 0);
    }
    
    let elapsedTime = millis() - reachedTargetAt;

    if (elapsedTime > pauseTime){
      pickNewTarget();
    }
  }
  else {
    textFont(runFont);
  }

  drawChars();
  
  updatePositions();
  updateCurrentSpeed();
}

function mousePressed(){
  pickNewTarget();
}

function drawChars(){
  for (let i = 0; i < message.length; i++){
    text(message.charAt(i), positions[i][0], positions[i][1]);
  }
}

function updatePositions(){
  let allHaveReached = true;
  let thisHasReached = false;
  
  // Update the positions a little bit
  for (let i = 0; i < message.length; i++){
    let distX = abs(positions[i][0] - targets[i][0]);
    let distY = abs(positions[i][1] - targets[i][1]);

    let changeX = random(currentSpeed);
    let changeY = random(currentSpeed);

    thisHasReached = changeX > distX && changeY > distY;
    
    if (positions[i][0] > targets[i][0]){
      changeX = -changeX;
    }
    
    if (positions[i][1] > targets[i][1]){
      changeY = -changeY;
    }
    
    positions[i][0] += changeX;
    positions[i][1] += changeY;
    
    allHaveReached = allHaveReached && thisHasReached;
  }
  
  if (!hasReachedTarget && allHaveReached){
      hasReachedTarget = true;
      reachedTargetAt = millis();  
    }
}

function updateCurrentSpeed(){
  if (hasReachedTarget){
    if (currentSpeed >= restSpeed){
      currentSpeed -= (currentSpeed - restSpeed) * 0.5;
    }
    else {
      currentSpeed += 1;
    }
  }
  else {
    if (currentSpeed <= runSpeed){
      currentSpeed += (runSpeed - currentSpeed) * 0.25;
    }
    else {
      currentSpeed -= 1;
    }
  }
}

function pickNewTarget(){
  if (!runTowards && random(1) > 0.75){
    runTowards = true;
    
    let tX = random(ts, width - 3 * ts);
    let tY = random(ts, height - ts);
    
    for (let i = 0; i < message.length; i++){
      targets[i][0] = tX + i * ts;
      targets[i][1] = tY;
    }
  }
  else {
    runTowards = false;
    
    for (let i = 0; i < message.length; i++){
      targets[i][0] = random(ts, width - ts);
      targets[i][1] = random(ts, height - ts);
    }
  }
  
  hasReachedTarget = false;
}

function keyPressed(){
  save("run_animation-screenshot.png");
}
