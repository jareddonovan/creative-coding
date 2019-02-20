// Date 28/March/2018

let ripples = [];

function setup(){
  createCanvas(800, 800);
  background(0);
}

function draw(){
  for (let r of ripples){
    r.display();
  }
}

function mousePressed(){
  ripples.push(new Ripple(mouseX, mouseY));
}
