function setup(){
  createCanvas(200, 200);

  // Align text center both horizontally and vertically.
  textAlign(CENTER, CENTER);
  textSize(50);
}

function draw(){
  // Store the current milliseconds in variable 'ms'.
  // We use floor to get rid of the decimal places. 
  let ms = floor(millis());
  
  // Calculate a colour for the background based on milliseconds.
  // Use the modulo operator to 'wrap around' at 255.
  let bgColour = ms % 255;
  background(bgColour);

  // Calculate a fill opposite to the background.
  let fillColour = 255 - bgColour;
  fill(fillColour);

  // Draw the millis at the center of the canvas.
  // NOTE: This number might be different from line 12 because some time has passed!
  text(ms, width / 2, height / 2);
}