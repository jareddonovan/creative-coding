/*
///////////////////////////////////////////////
 --------- GEOMERATIVE EXAMPLES ---------------
 //////////////////////////////////////////////
 Title   :   TypoGeo_Motion_02
 Date    :   31/08/2011 
 Version :   v0.5
 
 Moves our particles along the x axis. 
 
 Code adapted from an original idea by Stéphane Buellet
 http://www.chevalvert.fr/
 
 Licensed under GNU General Public License (GPL) version 3.
 http://www.gnu.org/licenses/gpl.html
 
 A series of tutorials for using the Geomerative Library
 developed by Ricard Marxer. 
 http://www.ricardmarxer.com/geomerative/
 
 More info on these tutorials and workshops at :
 www.freeartbureau.org/blog
 
 */
//////////////////////////////////////////////
import geomerative.*;

RFont myFont;
RGroup myGroup;
RPoint[] myPoints;
String myText = "DISPLACE";

FontAgent[] myAgents;
int step = 7;

void setup() {
  size(640, 350);
  background(0);
  smooth();

  RG.init(this);
  myFont = new RFont("FreeSans.ttf", 143, CENTER);

  RCommand.setSegmentLength(1);
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);
  myGroup = myFont.toGroup(myText);
  myPoints = myGroup.getPoints();

  myAgents = new FontAgent[myPoints.length];
  for (int i=0; i<myPoints.length; i++) {
    myAgents[i] = new FontAgent(new PVector(myPoints[i].x, myPoints[i].y));
  }
}


void draw() {
  fill(0, 23);
  rect(0, 0, width, height);
  translate(350, 205);
  //background(0);

  for (int i = 0; i < myPoints.length; i++) {
    myAgents[i].display();
    myAgents[i].motion();
  }
}


void keyPressed() {
 if(key=='s' || key =='S')
saveFrame("savedImage_###.png"); 
  
  
}
