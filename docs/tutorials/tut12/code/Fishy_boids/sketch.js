let waterBlue;
let fishColor;

let mic;
let maxVolume = 0;

let fishes = [];

function setup(){
  createCanvas(windowWidth, windowHeight);

  waterBlue = color("#1772FF");
  fishColor = color("#FFE517");
  
  mic = new p5.AudioIn()
  mic.start();

  background(waterBlue);
  fill(fishColor);
  smooth();
  noStroke();
  
  // Add some initial fishes
  for (let i = 0; i < 10; i++){
  	fishes.push(new Fish(random(width), random(height)));
  }
}

function draw(){
  background(waterBlue);

  if (keyIsPressed){
    background(255);
  }
  
  let volume = mic.getLevel();
  maxVolume = max(volume, maxVolume);
 
  if(volume > 0.2){
    scareFishes();
  }
 
  for(let i = 0; i < fishes.length; i++){
    for(let j = i+1; j < fishes.length; j++){
      fishes[i].compare(fishes[j]);
      fishes[j].compare(fishes[i]);
    }
  }
  for(let i = 0; i < fishes.length; i++){
    fishes[i].move();
    fishes[i].display();
  }
}

function scareFishes(){
  for(let i = 0; i < fishes.length; i++){
    fishes[i].flee();
  }
}

function mousePressed(){
  fishes.push(new Fish(mouseX, mouseY));
}

function keyPressed(){
  if(key == ' '){
    scareFishes();
  }
}