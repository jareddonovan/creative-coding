let waterBlue;
let fishColor;

let fishes = [];

//Fish fishy = new Fish(50, 50);
//Fish fishyFriend = new Fish(100, 100);

function setup(){
  createCanvas(800, 600);

  waterBlue = color('#1772FF');
  fishColor = color('#FFE517');

  background(waterBlue);
  fill(fishColor);
  smooth();
  noStroke();
}

function draw(){
  background(waterBlue);
  for(let i = 0; i < fishes.length; i++){
    fishes[i].move();
    fishes[i].display();
  }
}

function mousePressed(){
  let newFish = new Fish(mouseX, mouseY);
  fishes.push(newFish);
}

// A class for fishes!
class Fish{
   
  constructor(x, y){
  	this.speed = 2;
  	this.dir = 1;
  	this.w = 50;
  	this.h = 15;
    this.x = x;
    this.baseY = y;
    this.speed = int(random(1, 10));
    this.fishColour = color(random(255),random(255),0);
  }
  
  // Updates the movement of the fish - Class method
  move(){
    // Figure out the new x, y position of the fish.
    this.x += (this.dir * this.speed);
    // If fish hits the edge of the screen, change direction
    if(this.x < 0 || this.x > width){
      this.dir = -this.dir;
      this.x += (this.dir * this.speed);
    }
    // Fish will just sort of bob up and down as it moves.
    this.y = this.baseY + sin(radians(frameCount * 2)) * 40;
    
    // Adjust the height positive or negative depending on the direction
    this.w = 50 * this.dir;
  }
  
  // Draw the fish to the screen.
  display(){
    fill(this.fishColour);
    triangle(this.x, this.y, this.x - this.w, this.y - this.h, this.x - this.w, this.y + this.h);
    fill(255);
    ellipse(this.x - (20 * this.dir), this.y, 10, 10);  
    fill(0);
    ellipse(this.x - (15 * this.dir), this.y, 5, 5);
  }  
}

