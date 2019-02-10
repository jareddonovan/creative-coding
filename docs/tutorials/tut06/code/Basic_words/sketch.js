/**
 * Words. 
 * loads a font then uses text() function to write words to screen
 * The text() function is used for writing words to the screen.
 */

// PFont f;

function setup() {
  createCanvas(400, 285);

  // Create the font
  // printArray(PFont.list());
  //f = createFont("Georgia", 24);
  //textFont(f);
  
  textSize(26);
}

function draw() {
  background(102);
  textAlign(RIGHT);
  drawTypeCN(width * 0.25);
  textAlign(CENTER);
  drawTypeEN(width * 0.5);
  textAlign(LEFT);
  drawTypeFR(width * 0.75);
}

function drawTypeCN(x) {
  line(x, 0, x, 65);
  line(x, 220, x, height);
  fill(0);
  text("ichi", x, 95);
  fill(51);
  text("ni", x, 130);
  fill(204);
  text("san", x, 165);
  fill(255);
  text("shi", x, 210);
}

function drawTypeEN(x) {
  line(x, 0, x, 65);
  line(x, 220, x, height);
  fill(0);
  text("one", x, 95);
  fill(51);
  text("two", x, 130);
  fill(204);
  text("three", x, 165);
  fill(255);
  text("four", x, 210);
}

function drawTypeFR(x) {
  line(x, 0, x, 65);
  line(x, 220, x, height);
  fill(0);
  text("un", x, 95);
  fill(51);
  text("dues", x, 130);
  fill(204);
  text("trois", x, 165);
  fill(255);
  text("quatre", x, 210);
}