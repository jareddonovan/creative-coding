/*
///////////////////////////////////////////////
 --------- GEOMERATIVE EXAMPLES ---------------
 //////////////////////////////////////////////
 Title   :   TypoGeo_Random
 Date    :   01/03/2011 
 Version :   v0.5
 Basic random creation of lines. Press mouse to generate
 a new random outline. Press CONTROL to save pdf.
 
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
import processing.pdf.*;
boolean doSave = false;

RFont font;
String myText = "S";

int actRandomSeed = 20;

//----------------SETUP---------------------------------
void setup() {
  size(800, 800);
  background(255);
  noFill(); 
  smooth();
  RG.init(this); 
  font = new RFont("FreeSans.ttf", 500, CENTER);
}

//----------------DRAW---------------------------------

void draw() {
  if (doSave) beginRecord(PDF, timestamp()+".pdf");
  background(255);
  randomSeed(actRandomSeed);
  stroke(0);
  strokeWeight(0.3);
  translate(width/2, 600);

  RCommand.setSegmentLength(20);
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);

  RGroup myGroup = font.toGroup(myText); 
  myGroup = myGroup.toPolygonGroup();
  RPoint[] myPoints = myGroup.getPoints();

  beginShape();

  for (int i=0; i<myPoints.length; i++) {
    float jitter = random(0, 50);
    //line(myPoints[i].x, myPoints[i].y,10,10);
    vertex(myPoints[i].x, myPoints[i].y);//PLAY WITH ADDING OR SUBSTRACTING JITTER
    vertex(myPoints[i].x+jitter, myPoints[i].y+jitter);
    vertex(myPoints[i].x-jitter, myPoints[i].y-jitter);
    //line(myPoints[i].x, myPoints[i].y,30,-280);
    //line(myPoints[i].x, myPoints[i].y,20,myPoints[i].y);
    //ellipse(myPoints[i].x+10,myPoints[i].y,3,3);
  }
  endShape();
  if (doSave) {
    doSave = false;
    endRecord();
    saveFrame(timestamp()+".png");
  }
}
//--------------------------------------------------------------------------
void mousePressed() {
  actRandomSeed = (int) random(1000);
}
//--------------------------------------------------------------------------
void keyReleased() {
  if (keyCode == CONTROL) doSave = true;
}
//--------------------------------------------------------------------------
// timestamp
String timestamp() {
  Calendar now = Calendar.getInstance();
  return String.format("%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", now);
}
//////////////////////////////////////////////

