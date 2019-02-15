/**
 * This sketch shows how to load a font from google fonts using a 
 * stylesheet link. 
 * If you check the 'index.html' file, you will see the following 
 * line in the <head> section
 *   <link href="https://fonts.googleapis.com/css?family=Felipa" rel="stylesheet">
 *
 * This makes the font available to p5js.
 */

function setup() {
  createCanvas(400, 400);
  textFont('Felipa', 40);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  let msg = "This message is written in Felipa";
  text(msg, mouseX - 100, mouseY - 100, 200, 200);
}