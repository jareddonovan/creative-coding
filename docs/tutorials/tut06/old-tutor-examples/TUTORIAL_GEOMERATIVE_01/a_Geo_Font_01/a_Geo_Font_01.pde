/*
//////////////////////////////////////////////
--------- GEOMERATIVE TUTORIALS --------------
//////////////////////////////////////////////
Title   :   Geo_Font_01
Date    :   01/03/2011 
Version :   v0.5
We choose a font and display some text.

 Licensed under GNU General Public License (GPL) version 3.
 http://www.gnu.org/licenses/gpl.html
 
 A series of tutorials for using the Geomerative Library
 developed by Ricard Marxer. 
 http://www.ricardmarxer.com/geomerative/
 
 More info on these tutorial and workshops at :
 www.freeartbureau.org/blog

 */
//////////////////////////////////////////////

import geomerative.*;//IMPORT THE GEOMERATIVE LIBRARY

//DECLARE A NEW FONT VARIABLE
RFont font;
//DECLARE A NEW STRING VARIABLE AND ASSIGN SOME TEXT
String myText = "GEOMERATIVE";

//----------------SETUP---------------------------------
void setup() {
  size(800, 300);
  background(255);
  smooth();
  RG.init(this); //YOU MUST ALWAYS INITIALIZE THE GEOMERATIVE LIBRARY
  
  //HERE WE ASSIGN A FONT TO OUR FONT VARIABLE. NOTE IT MUST BE A .TTF FORMAT FONT
  font = new RFont("FreeSans.ttf", 100, CENTER);//100 DETERMINES FONT SIZE

  fill(255, 0, 0);
  noStroke();

  translate(width/2, 175);  
  font.draw(myText); //HERE WE CALL THE DRAW FUNCTION & DISPLAY OUR TEXT WITH OUR CHOSEN FONT
}

//////////////////////////////////////////////
