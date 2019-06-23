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
let nameTime = 0;

// How long the name should be shown on screen for.
let nameDuration = 2000;

// A list of previous names that have been submitted.
let guests = [];

function setup() {
  createCanvas(600, 400);

  textSize(20);  
  
  // Set up the user input elements.
  createElement("BR");
  createSpan("Tell me your name: ");
  txtName = createInput();
  createSpan(" ");
  btnName = createButton("OK");
  // Set callback for when user adds information.
  btnName.mousePressed(nameSubmitted);  
}

function draw() {
  drawWelcome();
  drawGuests();  
}

function drawWelcome(){
  // Default message to show
  let msg = "What's your name?";
  
  if (name !== ""){
    msg = "Hello: " + name;
  }

  // By default, the background should be filled dark grey.
  let bg = 150;
  
  // Calculate the time remaining to show the current name.
  let timeRemaining = nameTime + nameDuration - millis();
  
  // If the time has run out and the name is not already reset,
  // then save the current name to the list of guests and set
  // it back to an empty string.
  if (timeRemaining < 0 && name !== ""){
    guests.push(name);
    name = "";
  } else {
    // There is still some time left that the name should be
    // shown on the canvas. Gradually fade the background from 
    // white to grey.
    bg = map(timeRemaining, 0, nameDuration, 150, 255);
    
    // Make sure the value of bg stays in the expected range.
    bg = constrain(bg, 150, 255);
  }
  
  background(bg);
  fill(0);
  text(msg, 20, 100);
}

// Draw the list of previous guests to the right side
// of the canvas.
function drawGuests(){
  noStroke();
  fill(20);
  rect(width / 2, 0, width / 2, height);
  fill(255);
  
  text("Guests: ", width / 2 + 20, 50);
  
  // Loop over the list of guests and draw each one to canvas.
  for (let i = 0; i < guests.length; i++){
    text(guests[i], width / 2 + 20, 100 + 30 * i);
  }
}

// Process user input when a name is submitted.
function nameSubmitted(){
  name = txtName.value();
  
  // Record the time it was submitted, so we can animate.
  nameTime = millis();
  
  // Reset the input field to blank.
  txtName.value("");
}
