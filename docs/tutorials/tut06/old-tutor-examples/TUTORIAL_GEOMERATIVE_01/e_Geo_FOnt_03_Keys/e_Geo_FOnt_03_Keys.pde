/*
//////////////////////////////////////////////
 --------- GEOMERATIVE TUTORIALS --------------
 //////////////////////////////////////////////
 Title   :   Geo_Font_03
 Date    :   01/03/2011 
 Version :   v0.5
 We access a number of points on a font's outline.
 In this variation we draw lines from a fixed position.
 
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
RPoint[] myPoints; 
String myText = "Type something";
RGroup myGroup;

//----------------SETUP---------------------------------
void setup() {
  size(800,300);
  background(255);
  smooth();
  RG.init(this); 
  font = new RFont("FreeSans.ttf", 100, CENTER);
}

//----------------DRAW---------------------------------
void draw() {
  if (doSave) beginRecord(PDF, timestamp()+".pdf");
  background(255);
  stroke(255,0,0);
  noFill();
  translate(width/2, height/1.7);

  RCommand.setSegmentLength(map(mouseX, width, 0, 3, 100));
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);

  if (myText.length() > 0) {
    RGroup myGroup = font.toGroup(myText); 
    myGroup = myGroup.toPolygonGroup();
    RPoint[] myPoints = myGroup.getPoints();

    beginShape();
    for(int i=0; i<myPoints.length; i++) {
      //vertex(myPoints[i].x, myPoints[i].y); 
      curveVertex(myPoints[i].x, myPoints[i].y);
    }
    endShape();

    // ------ SAVING  ------ 
    if (doSave) {
      doSave = false;
      endRecord();
      saveFrame(timestamp()+".png");
      println("Enregistré !");
    }
  }
}

//----------------KEYS---------------------------------
void keyReleased() {
  if (keyCode == CONTROL) doSave = true;
}

void keyPressed() {
  if(key !=CODED) {
    switch(key) {
    case DELETE:
    case BACKSPACE:
      myText = myText.substring(0,max(0,myText.length()-1));
      break;
    case ENTER:
      break;
    default:
      myText +=key;
    }
  }
}

//----------------TIMESTAMP---------------------------------
String timestamp() {
  Calendar now = Calendar.getInstance();
  return String.format("%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", now);
}

