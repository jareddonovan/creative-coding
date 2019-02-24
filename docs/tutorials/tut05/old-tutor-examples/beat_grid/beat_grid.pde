/**
 * This sketch generates a visual pattern triggered by the beats in an audio file. 
 * Jared Donovan, 2018.
 *
 * Adapted from 'SoundEnergyBeatDetection' example supplied with Minim library.
 * Changes: 
 *   - Added explanatory comments
 *   - Improved code formatting 
 *   - Removed mapping of alpha to eRadius for fill
 */

import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioPlayer song;
BeatDetect beat;

// Will hold the current position of the line.
float lineX = 0;
float lineY = 0;
float rowHeight = 100;
float maxRowHeight = 200;
float minRowHeight = 50;
float lineWeight = 1;
float lineSpeed = 5;
float maxLineWeight = 10;
float minLineWeight = 1;
float maxAlpha = 0.5;
float h = 0;

void setup() {
  size(600, 600, P3D);  
  colorMode(HSB, 360, 1, 1, 1);
  background(360);

  // Create the minim object, load the song, and set it playing.
  minim = new Minim(this);
  song = minim.loadFile("marcus_kellis_theme.mp3", 2048);
  song.play();
  
  // Create a beat detection object song SOUND_ENERGY mode 
  // with a sensitivity of 10 milliseconds
  beat = new BeatDetect();
  
  h = random(360);
}

void draw() {
  // background(0);
  
  lineX = (lineX + lineSpeed);
  if (lineX > width){
    lineX = 0;
    lineY += rowHeight;
    
    rowHeight = random(minRowHeight, maxRowHeight);
    
    if (lineY > height){
      lineY = 0;
      h = random(360);
    }
  }

  // Use the 'beat' object to do the detection on the song.
  beat.detect(song.mix); 

  // Test if there is a beat onset. If so, reset radius to full size.
  if ( beat.isOnset() ) { 
    lineWeight = maxLineWeight;
  }

  float alpha = map(lineWeight, 0, maxLineWeight, 0, maxAlpha);
  
  strokeWeight(lineWeight);
  
  stroke(h, 0.5, 1.0, alpha);
  line(lineX, lineY, lineX, lineY + rowHeight);


  // Reduce weight of line a little each time we draw
  lineWeight *= 0.95; 

  // ... but only let it get as small as 5
  if ( lineWeight < minLineWeight ) {
    lineWeight = minLineWeight;
  }
}
