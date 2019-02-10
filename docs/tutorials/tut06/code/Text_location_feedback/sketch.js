/** 
 * Text displays X,Y next to mouse position
 */

let crossSize = 100;

function setup() {
  createCanvas(600, 400);
  fill(255);
}

function draw() {
  background(120);

  let mousePosition = "(" + mouseX + "," + mouseY + ")";

  noStroke();
  text(mousePosition, mouseX + 5, mouseY - 5);

  stroke(255, 255, 100);
  line(mouseX - crossSize, mouseY, mouseX + crossSize, mouseY);
  line(mouseX, mouseY - crossSize, mouseX, mouseY + crossSize);
}