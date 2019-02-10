/**
 * The user can type and their words will appear on the screen.
 */
 
let message = "";

function setup(){
  createCanvas(400, 400);
  textSize(48);
  fill(255);
  noStroke();
}

function draw(){
  background(0);
  text(message, 10, 50);
}

function keyPressed(){
	// First check if the key is something we want to type.
  if (key.length == 1 && key.match(/[\S,\ ,\n]/)) {
    message = message + key;
  // Otherwise, if it is the backspace key remove one charater.
  } else if (keyCode == BACKSPACE || keyCode == DELETE){
    message = message.substr(0, message.length - 1);
	// If it is the enter key, then add a newline.
  } else if (keyCode == ENTER){
  	message += "\n";
  }
  return false;
}