/**
 * Draws a magical rainbow horse of rainbow power.
 * Demonstrates the use of the translate() and rotate() functions. 
 * Also uses pushMatrix() and popMatrix() to save and reset the
 * coordinate system.
 * 
 * Jared Donovan 2018.
 */

// Store an array of colours which we will use to fill the horse 
// with rainbow colours of joy.
let cols = new Array(7);

// Records the hue of the first colour in the array.
let firstColHue = 0;

// How fast the colours should cycle. Higher = faster.
let colInc = 1;

function setup(){
  createCanvas(600, 400);

  // Use colorMode() for mega rainbow control of colours.
  colorMode(HSB, 360, 100, 100);
}

function draw(){
  background(200, 87, 93);
  // Call our rotateColours function to calculate the next colours. 
  rotateColours();
  
  // Body of the joyfully prancing horse.
  translate(200, 150);
  fill(cols[0]);
  rect(0, 0, 200, 70);
  
  // Tail of the speedy steed.
  push();
  rotate(-radians(160));
  fill(cols[1]);
  rect(0, -20, 100, 20);
  pop();
  
  // Prancing back legs.
  push();
  translate(20, 70);
  rotate(radians(80));
  fill(cols[2]);
  rect(0, -20, 100, 20);
  rotate(radians(40));
  rect(0, 0, 100, 20);
  pop();
  
  // Galloping front legs.
  push();
  translate(180, 70);
  rotate(radians(40));
  fill(cols[3]);
  rect(0, -20, 100, 20);
  rotate(radians(20));
  rect(0, 0, 100, 20);
  pop();
  
  // Proud neck and head
  push();
  translate(160, 0);
  rotate(-radians(60));
  fill(cols[4]);
  rect(0, 0, 80, 50);
  translate(90, 50);
  rotate(radians(80));
  rect(-20, 0, 80, 30);
  
  // Glittering eyes, nose and mouth
  fill(cols[5]);
  rect(5, 5, 10, 10);
  rect(50, 10, 5, 5);
  line(50, 30, 30, 20);
  
  // Alert ears
  translate(-20, 0);
  rotate(-radians(100));
  fill(cols[6]);
  rect(0, 0, 20, 10);
  rotate(-radians(20));
  rect(0, -10, 20, 10);
  pop();
}

// Rotate a series of colours through the rainbow
function rotateColours(){
  // Move the hue of the starting colour a little bit each time. 
  firstColHue += colInc;

  for (let i = 0; i < cols.length; i++){
    // Calculate each colour. Remember to use % 360 to wrap to zero.
    cols[i] = color((firstColHue + i * 30) % 360, 50, 100);
  }
}
