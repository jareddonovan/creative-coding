let gridSize = 10;
let numCols;
let numRows;

function setup() {
  createCanvas(400, 400);
  background(51, 51, 255);
  stroke(255);
  strokeWeight(2);
  
  createP("Press any key to see another maze");
  
  // Figure out the number of cols and rows
  numCols = width / gridSize;
  numRows = height / gridSize;
}

function draw() {
  background(51, 51, 255);
  
	for (let x = 0; x < numCols; x++){
  	for (let y = 0; y < numRows; y++){
    	if (random(1) > 0.5){
      	line(x * gridSize, y * gridSize, (x + 1) * gridSize, (y + 1) * gridSize);
      } else {
      	line((x + 1) * gridSize, y * gridSize, x * gridSize, (y + 1) * gridSize);
      }
    }
  }
  
  noLoop();
}

function keyPressed(){
	loop();
}