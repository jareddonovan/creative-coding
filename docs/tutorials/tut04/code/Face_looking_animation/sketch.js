/**
 * This sketch displays an animation with 5 frames.
 * - Change the images in the 'data' folder to change the frames that are shown.
 * - Add more frames by adjusting the numFrames variable, and adding 
 *   images from the data folder. Make sure they have the right filename.
 * - Adjust the argument to 'frameRate' to change the playback speed. 
 **/
 
// frames will be an array of PImages. 
let frames;

// Num frames will set the length of the array. Change this if you add/remove frames.
let numFrames = 5;

// Counter keeps track of which frame to display each time through the draw loop.
let counter = 0;

function preload(){
  // Initialise the array of frames.
  frames = new Array(numFrames);

  // Iterate over the array and populate it with images
  // Note that we expect the file names to follow a pattern (0.jpg, 1.jpg, 2.jpg, etc.) 
  for (let i = 0; i < numFrames; i++){
    frames[i] = loadImage("data/" + i + ".png");
  }
}

function setup(){
  createCanvas(480, 480);

  // Limit the frameRate to 4 frames per second.
  frameRate(1);
}

function draw(){
  // Draw the current image to the screen. 
  image(frames[counter], 0, 0);

  // Increment the counter. 
  counter += 1;

  // Whenever the counter gets to the end of the frames, reset it to zero.
  if (counter >= numFrames){
    counter = 0;
  }
}