let waterBlue, fishColor;
let fishX = 0;
let fishY = 0;
let fishSpeed = 2;
let dir = 1;
let fishW = 50;
let fishH = 15;

function setup(){
  createCanvas(800, 600);
  waterBlue = color("#1772FF");
  fishColor = color("#FFE517");
  background(waterBlue);
  fill(fishColor);
  smooth();
  noStroke();
}

function draw(){
  background(waterBlue);

  // Figure out the new x, y position of the fish.
  fishX += (dir * fishSpeed);
  // If fish hits the edge of the screen, change direction
  if(fishX < 0 || fishX > width){
    dir = -dir;
    fishX += (dir * fishSpeed);
  }
  // Fish will just sort of bob up and down as it moves.
  fishY = height / 2 + sin(radians(frameCount * 2)) * 40;
  
  // Adjust the height positive or negative depending on the direction
  fishW = 50 * dir;
  
  // Draw the fish.
  fill(fishColor);
  triangle(fishX, fishY, fishX - fishW, fishY - fishH, fishX - fishW, fishY + fishH);
  fill(255);
  ellipse(fishX - (20 * dir), fishY, 10, 10);  
  fill(0);
  ellipse(fishX - (15 * dir), fishY, 5, 5);
}



