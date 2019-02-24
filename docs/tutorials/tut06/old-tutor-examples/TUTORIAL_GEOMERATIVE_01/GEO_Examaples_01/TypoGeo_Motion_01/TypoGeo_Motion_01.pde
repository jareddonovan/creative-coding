/*
///////////////////////////////////////////////
 --------- GEOMERATIVE EXAMPLES ---------------
 //////////////////////////////////////////////
 Title   :   TypoGEo_Motion_01
 Date    :   01/03/2011 
 Version :   v0.5
 Finally making some movement. Press key 'f' to
 freeze the motion.
 
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

RFont font;
String myText = "MOTION";
int n = 0;
boolean stopAnime = false;

//----------------SETUP---------------------------------
void setup() {
  size(1200, 400);
  background(255);
  noFill();
  smooth();
  RG.init(this); 
  font = new RFont("FreeSans.ttf", 200, CENTER);
}

//----------------DRAW---------------------------------
void draw() {
  background(255);
  stroke(0, 150);
  strokeWeight(0.3);
  translate(550, 270);

  RCommand.setSegmentLength(10);
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);

  RGroup myGoup = font.toGroup(myText); 
  RPoint[] myPoints = myGoup.getPoints();

  for (int i=0; i<myPoints.length; i++) {
    ellipse(myPoints[i].x, myPoints[i].y, n, 0);// TRY ADDING N TO BOTH DIA VALUES.
  }

  if (n > 200) {
    n*=-1;
  }
  else {
    n++;
  }
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

