/**
 * This sketch chops up a source image into a series of little squares 
 * and then repeats these to create a magnification effect.
 *
 * Jared Donovan 2018
 * Inspired by 'Untitled' Tom Friedman, 2004. 
 *   p87 in C. Reas, McWilliams, C. & LUST, 'Form + Code', 
 *   Princeton Architectural Press, New York 2010.
 */
 
// Following line is for running the sketch in the browser. Not needed for desktop.
/* @pjs preload="data/butterfly.jpg"; */

// Wil hold the source image. 
let butterfly;

// Will hold the individual pieces we cut out. 
let piece;

// The following variables will affect the 'size' of magnification.
let pieceSize = 24;
let spacing = 8;
let magnification = pieceSize / spacing;

function preload(){
  // Load source image.
  butterfly = loadImage("data/butterfly.jpg");	
}

function setup(){
  // The size of the final canvas depends on the size of the original image
  // as well as the values you choose for the 'pieceSize' and 'spacing' variables.
  // Trial and error is probably the easiest way to find a good size. 
  createCanvas(648, 468);
}

function draw(){
  
  // Loop from 0..butterfly.width/height and cut out a piece each time.
  // then paste these into the main canvas with a bit more space between.
  for (let x = 0; x < butterfly.width - pieceSize; x += spacing) {
    for (let y = 0; y < butterfly.height - pieceSize; y += spacing) {
      // Copy a piece from the source.
      piece = butterfly.get(x, y, pieceSize, pieceSize);
      
      // Place the piece onto the main canvas.
      image(piece, x * magnification, y * magnification);
    }
  }
  
  // No need to continue looping.
  noLoop();
}