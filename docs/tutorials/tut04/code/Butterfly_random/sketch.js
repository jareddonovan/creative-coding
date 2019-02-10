// Holds the source image. A picture of a butterfly.
let butterfly;

// Will hold the little pieces that are sampled.
let piece;

// Where to sample from.
let sampX;
let sampY;

// The size of the tiles to sample.
let sampSize = 40;

// The amount of random variation for each tile.
let variation = 20;

function preload(){
  butterfly = loadImage("data/butterfly.jpg");
}

function setup(){
  createCanvas(600, 600);
}

function draw(){
  // Clear the background.
  background(0);
  
  // Choose a random sample point
  sampX = random(butterfly.width - sampSize);
  sampY = random(butterfly.height - sampSize);

  // Figure out how many rows and cols of samples there will be
  let rows = floor(width / sampSize);
  let cols = floor(height / sampSize);
  
  // Iterate over the rows and collumns of samples. Sample them. Place them.
  for (let r = 0; r < rows; r += 1){
    for (let c = 0; c < cols; c += 1){  
      // Choose a point to cut out a piece from, randomly offset
      // from the sample point chosen above.
      let getFromX = int(sampX + random(-variation, variation));
      let getFromY = int(sampY + random(-variation, variation));
      
      piece = butterfly.get(getFromX, getFromY, sampSize, sampSize);
      
      // Draw the piece onto the main canvas. 
      image(piece, c * sampSize, r * sampSize, sampSize, sampSize);
    }
  }
  noLoop();
}

// Handles key presses from the user.
function keyPressed(){
  // When the user presses SPACEBAR, loop again.
  if (key == ' '){
    loop();
  }
}