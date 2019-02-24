/*
///////////////////////////////////////////////
 --------- GEOMERATIVE EXAMPLES ---------------
 //////////////////////////////////////////////
 Title   :   TypoGEo_Sound_In
 Date    :   01/03/2011 
 Version :   v0.5
 More motion but this time with sound as input
 to make the text wiggle. Again key'f' to freeze.
 
 Licensed under GNU General Public License (GPL) version 3.
 http://www.gnu.org/licenses/gpl.html
 
 A series of tutorials for using the Geomerative Library
 developed by Ricard Marxer. 
 http://www.ricardmarxer.com/geomerative/
 
 More info on these tutorial and workshops at :
 www.freeartbureau.org/blog
 
 */
//////////////////////////////////////////////

import geomerative.*;
import ddf.minim.*;

Minim mySound; //CREATE A NEW SOUND OBJECT
AudioInput in;

RFont font;
String myText = "SOUND";
//COULD USE A NOISE FUNCTION HERE FOR WIGGLE.
//float wiggle = 3.7;
boolean stopAnime = false;

//----------------SETUP---------------------------------
void setup() {
  size(800, 400);
  background(255);
  smooth();
  RG.init(this); 
  font = new RFont("FreeSans.ttf", 200, CENTER);
  
  mySound = new Minim(this);
  in = mySound.getLineIn(Minim.STEREO,512);
}

//----------------DRAW---------------------------------
void draw() {
  background(255);
  stroke(255, 0, 0);
  noFill();
  translate(width/2, height/1.5);
  
  float soundLevel = in.mix.level(); //GET OUR AUDIO IN LEVEL

  RCommand.setSegmentLength(soundLevel*1000);
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);

  RGroup myGoup = font.toGroup(myText); 
  RPoint[] myPoints = myGoup.getPoints();

  beginShape(TRIANGLE_STRIP);
  for (int i=0; i<myPoints.length; i++) {

    vertex(myPoints[i].x, myPoints[i].y);
  }
  endShape();
}

//----------------KEYS---------------------------------
void keyReleased() {
  if (key == 'f') 
    stopAnime = !stopAnime;
  if (stopAnime == true) 
    noLoop(); 
  else loop();
}
//////////////////////////////////////////////

