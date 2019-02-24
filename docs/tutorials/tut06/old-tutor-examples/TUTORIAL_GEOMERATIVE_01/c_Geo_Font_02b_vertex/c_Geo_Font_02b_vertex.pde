/*
//////////////////////////////////////////////
 --------- GEOMERATIVE TUTORIALS --------------
 //////////////////////////////////////////////
 Title   :   Geo_Font_02_b
 Date    :   01/03/2011 
 Version :   v0.5
 We access a number of points on a font's outline.
 In this variation we draw vertex instead of ellipses.
 
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
String myText = "VERTEX LINES";

//----------------SETUP---------------------------------
void setup() {
  size(800, 300);
  background(255);
  smooth();
  RG.init(this); 
  font = new RFont("FreeSans.ttf", 100, CENTER);

  stroke(255, 0, 0);
  noFill();
  translate(width/2, height/1.7);

  RCommand.setSegmentLength(20);//TRY DIFFERENT VALUES HERE
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);

  RGroup myGroup = font.toGroup(myText); 
  RPoint[] myPoints = myGroup.getPoints();

  //HERE WE DRAW LINES USING VERTEX.

  beginShape();
  //TRY ADDING DIFFERENT MODES HERE LIKE LINES OR TRIANGLES.
  //beginShape(QUAD_STRIP);//THIS CHANGES DRAMATICALLY THE FORM.
  for (int i=0; i<myPoints.length; i++) {
    vertex(myPoints[i].x, myPoints[i].y);
    //TRY CURVEVERTEX TOO BUT CHOOSE POLYGON MODE IN BEGINSHAPE()
    // curveVertex(myPoints[i].x, myPoints[i].y);
  }
  endShape();
}

//----------------DRAW---------------------------------
void draw() {
}

//////////////////////////////////////////////

