/**
 * This sketch shows how to get the current volume that the 
 * computer's microphone is detecting and use this to display
 * a simple visualisation (just a rectangle that changes size).
 * - You will need a computer with a microphone input for 
 *   this sketch.
 * - Clapping your hands in front of the microphone should 
 *   give a response.
 *
 * Jared Donovan 2018
 */
 
// Import the minim library.
import ddf.minim.*;

Minim minim;
AudioInput in;

void setup(){
  size(600, 400);

  noStroke();
  fill(255);

  // Set up the minim object.
  minim = new Minim(this);

  // Ask the minim object to give us a reference to the AudioInput.
  in = minim.getLineIn();
}

void draw(){
  background(0);
  
  // Here, we assume that the input is stereo, so will potentially
  // have different volumes on the left and right channels.
  // If don't care about stereo, you can get the overall volume as
  // follows:
  // float mixLevel = in.mix.level();
  float leftLevel = in.left.level();
  float rightLevel = in.left.level();

  // The values of leftLevel and rightLevel will be in the range -1...0...1.
  // Where 0 is no sound, and -1 and 1 are the loudest volume. 
  // For this reason, it is useful to get rid of the -ve sign and treat all
  // values as being in the range 0...1 (quiet...loud).
  //
  // We can do this with the 'abs' function, which returns the absolute value
  // of any number you give it. After this, levels will be in range 0...1
  
  // We are only interested in the absolute value of the levels (i.e. how loud).
  leftLevel = abs(leftLevel);
  rightLevel = abs(rightLevel);
  
  // We still need to map the numbers to something that will be useful for
  // displaying on the screen. I will map them to the height of the canvas.
  
  // Map levels from range 0...1 to 0...height
  leftLevel = map(leftLevel, 0, 1, 0, height);
  rightLevel = map(rightLevel, 0, 1, 0, height);
  
  // Draw two rectangles representing the levels.
  rect(10, height - leftLevel, width / 2 - 15, leftLevel);
  rect(width / 2 + 5, height - rightLevel, width / 2 - 15, rightLevel);
}
