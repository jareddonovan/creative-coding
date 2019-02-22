let fishes = [];

function setup(){
  createCanvas(600, 400);

  // Create a first fish in the center of the screen.
  fishes.push(new Fish(width / 2, height / 2));
}

function draw(){
  background(204);

  // Loop over the array and update each fish. 
  for (let f of fishes){
  	f.update();
  	f.show();
  }
}

function mousePressed(){
	fishes.push(new Fish(mouseX, mouseY));
}