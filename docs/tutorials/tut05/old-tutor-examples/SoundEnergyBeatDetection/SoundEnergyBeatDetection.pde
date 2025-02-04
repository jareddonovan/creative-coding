/**
 * This sketch demonstrates how to use the BeatDetect object song SOUND_ENERGY mode.<br />
 * You must call <code>detect</code> every frame and then you can use <code>isOnset</code>
 * to track the beat of the music.
 * <p>
 * This sketch plays an entire song, so it may be a little slow to load.
 * <p>
 * For more information about Minim and additional features, 
 * visit http://code.compartmental.net/minim/
 */

import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioPlayer song;
BeatDetect beat;

float eRadius;

void setup()
{
  size(200, 200, P3D);
  minim = new Minim(this);
  song = minim.loadFile("marcus_kellis_theme.mp3", 2048);
  song.play();
  // a beat detection object song SOUND_ENERGY mode with a sensitivity of 10 milliseconds
  beat = new BeatDetect();

  ellipseMode(RADIUS);
  eRadius = 20;
}

void draw()
{
  background(0);
  beat.detect(song.mix); // do the detection
  fill(60, 255, 0);
  
  if ( beat.isOnset() ) { // is there a beat onset change radius
    eRadius = 80;
  }

  ellipse(width/2, height/2, eRadius, eRadius);
  eRadius *= 0.95; // reduce radius each draw

  if ( eRadius < 5 ) // only let it get as small as 5
  {
    eRadius = 5;
  }
}

