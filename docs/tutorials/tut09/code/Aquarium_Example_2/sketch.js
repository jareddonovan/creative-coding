/**
 * Draws an aquarium into which the user can add fish by pressing the 'f' key.
 *
 * Jared Donovan 2018
 */

// Declare an ArrayList of Fish to store the fishes.
// An ArrayList is like an Array, but it can grow and shrink in size.
// When we declare an ArrayList, we need to say what kind of object 
// is going to store. This is why we have written '<Fish>'. 
let fishes = [];

function setup(){
  createCanvas(600, 400);
}

function draw(){
  background(204);
  
  // Iterate over the ArrayList of fishes and
  // update and display each one. 
  for (let f of fishes){
    f.update();
    f.display();
  }
}

// When the user presses the 'f' key, a new fish 
// should be added at the current mouse position.
function keyReleased(){
  if (key == 'f'){
    fishes.push(new Fish(mouseX, mouseY));
  }
}