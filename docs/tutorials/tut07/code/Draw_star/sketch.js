/**
 * This sketch demonstrates how you can think of a PVector
 * as representing a line from the center of a shape to one
 * of its vertices. You can use this idea to more easily draw
 * shapes with rotational symmetry. 
 * 
 * Instructions: 
 *   Press the UP and DOWN arrows to change the number of vertices.
 *   SPACE switches from polygon to star mode
 *   MouseX position will determine the outer 'radius' of the shape
 *   MouseY position will determine the inner 'radius' if in star mode.
 */

let vx;
let isPolygonMode = true;
let numEdges = 6;
let angle;
let outerRadius;
let innerRadius;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 1, 1, 1);
  noStroke();
}

function draw() {
  // Calculate a pleasing fill / bg combination based on 
  // the current mouse position.
  let hBg = map(mouseX, 0, width, 0, 360);
  let hFill = (hBg + 180) % 360;
  let sBg = map(mouseY, 0, height, 0.4, 0.6);
  let sFill = 1.0 - sBg;

  background(hBg, sBg, 1.0);
  fill(hFill, sFill, 1.0);

  // Figure out the angle from center of the screen to mouse position
  let rot = atan2(mouseY - height / 2, mouseX - width / 2);

  translate(width / 2, height / 2);
  rotate(rot);

  if (isPolygonMode) {
    drawPolygon();
  } else {
    drawStar();
  }
}

function drawPolygon() {
  angle = 360 / numEdges;
  outerRadius = abs(mouseX - width / 2);

  vx = createVector(outerRadius, 0);

  beginShape();
  for (let i = 0; i < numEdges; i++) {
    vertex(vx.x, vx.y);
    vx.rotate(radians(angle));
  }
  endShape(CLOSE);
}

function drawStar() {
  angle = radians(180 / numEdges);
  outerRadius = abs(mouseX - width / 2);
  innerRadius = abs(mouseY - height / 2);

  vx = createVector(outerRadius, 0);

  beginShape();
  for (let i = 0; i < numEdges; i++) {
    vx.setMag(outerRadius);
    vertex(vx.x, vx.y);
    vx.rotate(angle);
    vx.setMag(innerRadius);
    vertex(vx.x, vx.y);
    vx.rotate(angle);
  }
  endShape(CLOSE);

}

function keyPressed() {
  if (keyCode == UP_ARROW){
    numEdges += 1;
  } else if (keyCode == DOWN_ARROW){
    numEdges -= 1;
  } else if (key == ' ') {
    isPolygonMode = !isPolygonMode;
  }
  
  return false;
}