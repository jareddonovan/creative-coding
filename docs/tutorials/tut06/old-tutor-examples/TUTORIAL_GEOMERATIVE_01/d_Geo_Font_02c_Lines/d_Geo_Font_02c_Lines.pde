/*
//////////////////////////////////////////////
 --------- GEOMERATIVE TUTORIALS --------------
 //////////////////////////////////////////////
 Title   :   Geo_Font_02_c
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

RFont font;
String myText = "JARED";

//----------------SETUP---------------------------------
void setup() {
  size(600, 600);
  background(255);
  smooth();
  RG.init(this); 
  font = new RFont("FreeSans.ttf", 500, CENTER);
}

//----------------DRAW---------------------------------

void draw() {
  background(255);
  noFill();
  stroke(0);
  strokeWeight(0.3);
  translate(2 * (width / 2 - mouseX), mouseY);

  RCommand.setSegmentLength(5);
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);
  
  RGroup myGroup = font.toGroup(myText); 
  RPoint[] myPoints = myGroup.getPoints();

  //TRY DIFFERENT PARAMETERS AND VALUES TO GET VARIATIONS
  for (int i=0; i<myPoints.length; i++) {
    line(myPoints[i].x, myPoints[i].y, - 2* mouseX + width / 2, -mouseY + height / 1.2);
    //line(myPoints[i].x, myPoints[i].y,8,-360);
    //line(myPoints[i].x+10, myPoints[i].y,myPoints[i].x+9,myPoints[i].y+130);
    //ellipse(myPoints[i].x,myPoints[i].y,3,3);
  }
}
//////////////////////////////////////////////
