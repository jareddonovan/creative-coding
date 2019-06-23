/** 
 * A simple demonstration of asking for input from a user
 * and displaying it on the canvas.
 *
 * Jared Donovan 2019
 *
 */

let txtName;
let btnName;
let name = "";

function setup() {
  createCanvas(400, 400);

  textAlign(CENTER, CENTER);  
  textSize(20);
  
  // Set up the input elements for collecting names
  createElement("BR");
  createSpan("Tell me your name: ");
  txtName = createInput();
  createSpan(" ");
  btnName = createButton("OK");
  
  // Set the callback for when the button is pressed.
  btnName.mousePressed(nameSubmitted);  
}

function draw() {
  background(220);

  // By default, ask the user for their name.
  let msg = "What's your name?";
  
  if (name !== ""){
    // If a name has been given, then say hello to that person.
    msg = "Hello: " + name;
  }

  // Draw the message to the screen. 
  text(msg, width / 2, height / 2);
}

// Do something with the data provided by the user when the
// button is pressed. 
function nameSubmitted(){
  name = txtName.value();
  txtName.value("");
}
