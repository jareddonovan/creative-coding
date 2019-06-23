// basic sample player on key

import ddf.minim.*;
Minim minim;

AudioSample kick; 
AudioSample snare;

void setup()
{
  size(512, 200);
  minim = new Minim(this);

  // load BD.wav from the data folder. 512 is a buffer size
  kick = minim.loadSample( "BD.mp3",512);

  // load SD.wav from the data folder
  snare = minim.loadSample("SD.wav", 512);

}

void draw()
{
  background(0);

}

void keyPressed() 
{
  if ( key == 's' ) snare.trigger();
  if ( key == 'k' ) kick.trigger();
}


