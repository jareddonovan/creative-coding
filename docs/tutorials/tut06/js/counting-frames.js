function setup(){
  createCanvas(150, 150);

  // Align text center both horizontally and vertically.
  textAlign(CENTER, CENTER);
  textSize(50);
}

function draw(){
  // Calculate a colour for the background based on frameCount.
  // Use the modulo operator to 'wrap around' at 255.
  let bgColour = frameCount % 255;
  background(bgColour);

  // Calculate a fill opposite to the background.
  let fillColour = 255 - bgColour;
  fill(fillColour);

  // Draw the frameCount at the center of the canvas.
  text(frameCount, width / 2, 75);
}
