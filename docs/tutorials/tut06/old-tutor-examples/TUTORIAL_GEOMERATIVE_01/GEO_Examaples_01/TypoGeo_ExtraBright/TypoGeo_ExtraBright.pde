/*
///////////////////////////////////////////////
 --------- GEOMERATIVE EXAMPLES ---------------
 //////////////////////////////////////////////
 Title   :   TypoGeo_ExtraBright
 Date    :   31/08/2011 
 Version :   v0.5
 
 Interactive work which you need to play with. 
 
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
String myText = "EXTRA BRIGHT";

float xoff = 0.0;
float yoff = 0.0;
float xincrement = 0.000005; 
float yincrement = 0.000008; 

float randX;
float randY;
float MouvPoint;

FontAgent[] myAgents;

void setup() {
  size(900, 350);
  background(0);
  smooth();

  RG.init(this);
  myFont = new RFont("FreeSans.ttf", 97, CENTER);

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
  translate(width/2, height/2);
  background(0);

  for (int i = 0; i < myPoints.length; i++) {
    randX = (((100/MouvPoint)*2)+mouseX)-width/2;
    randY = (((100/MouvPoint)*2)+mouseY)-height/2;
    myAgents[i].display();
    myAgents[i].motion();
  }
}

