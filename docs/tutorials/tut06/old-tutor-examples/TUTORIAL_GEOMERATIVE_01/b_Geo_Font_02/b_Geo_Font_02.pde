/*
//////////////////////////////////////////////
--------- GEOMERATIVE TUTORIALS --------------
//////////////////////////////////////////////
Title   :   Geo_Font_02
Date    :   01/03/2011 
Version :   v0.5
We access a number of points on a font's outline.

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
String myText = "Points on Outline";

//----------------SETUP---------------------------------
void setup() {
  size(800, 300);
  background(255);
  smooth();
  RG.init(this); 
  font = new RFont("FreeSans.ttf", 100, CENTER);

  fill(255, 0, 0);
  noStroke();
  translate(width/2, height/2);

  //CONFIGURE SEGMENT LENGTH AND MODE
  //SETS THE SEGMENT LENGTH BETWEEN TWO POINTS ON A SHAPE/FONT OUTLINE
  RCommand.setSegmentLength(10);//ASSIGN A VALUE OF 10, SO EVERY 10 PIXELS
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);
  
   //RCommand.setSegmentator(RCommand.CUBICBEZIERTO);
   //RCommand.setSegmentator(RCommand.ADAPTATIVE);

  //GROUP TOGETHER MY FONT & TEXT.
  RGroup myGroup = font.toGroup(myText); 
  myGroup = myGroup.toPolygonGroup();
  
  //ACCESS POINTS ON MY FONT/SHAPE OUTLINE
  RPoint[] myPoints = myGroup.getPoints();

  //DRAW ELLIPSES AT EACH OF THESE POINTS
  for (int i=0; i<myPoints.length; i++) {
    ellipse(myPoints[i].x, myPoints[i].y, 5, 5);
  }
}

//----------------DRAW---------------------------------

void draw() {
}

//////////////////////////////////////////////

