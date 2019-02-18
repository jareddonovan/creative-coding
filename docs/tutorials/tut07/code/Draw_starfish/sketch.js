/**
 * Demonstrates how to draw a starfish with the translate
 * functions.
 * Starfish image by Flickr user Storm Crypt "A Different Decor" 
 *   (CC BY NC SA)
 *   https://www.flickr.com/photos/storm-crypt/3110740710/
 */

let starfish;

function preload(){
  starfish = loadImage("data/starfish.jpg");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (mouseIsPressed){
    image(starfish, 0, 0);
    return;
  }
  
  let seaBlue = color(137, 166, 111);
  
  background(seaBlue);  
  noStroke();
  
  drawStarfish(width / 2 - 30, height / 2, 22, 160);
}

/**
 * This function draws the starfish at the specified 'x', 'y' position 
 * with a rotation of 'rot' and size determined by the 'armLength'. 
 */
function drawStarfish(x, y, rot, armLength){

  // Figure out starfish's arm angle and body diameter.
  let armRotation = 360 / 5.0;
  let bodyDiameter = armLength * 0.85;
  
  // Store the skin colour and spot colour as varaiables. 
  let skinColour = color(240, 182, 98);  
  let spotColour = color(152, 49, 10);

  // Push matrix to let us reset to the previous coordinate system.
  push();

  // Translate to the given x, y position and rotate 
  translate(x, y);
  rotate(radians(rot));
    
  // Draw an ellipse for the center of the starfish's body.
  fill(skinColour);
  ellipse(0, 0, bodyDiameter, bodyDiameter);

  // Draw each of the starfish's arms
  for (let i = 0; i < 360; i += armRotation) {
    drawArm(armLength, skinColour, spotColour);
    rotate(radians(armRotation));
  }
  
  // Draw the central spot of the starfish
  fill(spotColour);
  ellipse(0, 0, armLength / 12.0, armLength / 12.0);

  // Reset the coordinate system.
  pop();
}

/**
 * This function draws a single arm of the starfish. 
 * Length is determined by 'armLength' and colour by 'skinColour' 
 * and 'spotColour'.
 */
function drawArm(armLength, skinColour, spotColour) {

  // Figure out the sizes of the arm based on overall length. 
  let bodyRadius = armLength / 3.0;
  let baseWidth = armLength / 4.0;
  let tipWidth = armLength / 16.0;

  // Draw a quad for the skin of the arm. 
  fill(skinColour);
  quad(-baseWidth, bodyRadius, -tipWidth, armLength, tipWidth, 
    armLength, baseWidth, bodyRadius);

  // Call drawSpots and drawSpikes functions to draw spots and spikes.
  drawSpots(armLength, spotColour);
  drawSpikes(armLength, spotColour);
}

/**
 * Draws a row of spots along the current arm. 
 * Size is determined by arm length. 
 */
function drawSpots(armLength, spotColour) {

  // Figure out the size and spacing of the spots. 
  let spotSize = armLength / 8.0;
  let spotSpacing = armLength / 6.0;

  // Draw a full-size spot at the tip of the arm
  fill(spotColour);
  ellipse(0, armLength, spotSize, spotSize);

  // Iterate along the the arm. Draw successively smaller spots.
  for (let y = spotSpacing; y < armLength; y += spotSpacing) {
    ellipse(0, y, spotSize, spotSize);

    // Make the spots smaller each time.
    spotSize = spotSize * 0.9;
  }
}

/**
 * Draws a series of 4 spikes at the base of the arm. 
 * Size is determined by arm length.
 */
function drawSpikes(armLength, spotColour){

  // Figure out how far to the left or right the spikes are
  // as well as how big they will be and the y position. 
  let spikeRotation = 20;
  let spikeSize = armLength / 12.0;
  let spikeY = armLength / 4.0;

  // Call the drawSpike function to draw each of the four spikes.
  fill(spotColour);
  drawSpike(spikeRotation, spikeY, spikeSize);
  drawSpike(spikeRotation, 1.4 * spikeY, 0.8 * spikeSize);
  drawSpike(-spikeRotation, spikeY, spikeSize);
  drawSpike(-spikeRotation, 1.4 * spikeY, 0.8 * spikeSize);
}

/**
 * Draws a single spike on the starfish arm. 
 * Rotation, position and size are determined by arguments. 
 */
function drawSpike(spikeRotation, y, spikeSize){

  // Record previous coordinate system so we can reset.
  push();
  
  // Rotate the spike away from the center line of the arm. 
  rotate(radians(spikeRotation));

  // Move along the arm by 'spikeY' amount.
  translate(0, y);

  // Rotate again, to make the spike point outward. 
  rotate(radians(spikeRotation * 1.5));

  // Draw the spike as a triangle.
  triangle(-spikeSize / 2, 0, 0, spikeSize, spikeSize / 2, 0); 
  
  // Reset to previous coordinate system. 
  pop();
}
