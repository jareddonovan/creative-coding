void setup(){
  size(400, 400);
}

void draw(){
// Normalize the mouseX position to 0..0.1 
float normalizedMouseX = map(mouseX, 0, width, 0, 0.1);

println(normalizedMouseX);

// Use the normalized mouse position to adjust the frequency of the pulsing.
// The further right, the faster the pulsing. 
float pulseVal = sin(frameCount * normalizedMouseX);

// Value of pulseVal will be in range -1..1. Map it to 0..255 to use as a grey-scale.
float bgColour = map(pulseVal, -1, 1, 0, 255);

background(bgColour);
}