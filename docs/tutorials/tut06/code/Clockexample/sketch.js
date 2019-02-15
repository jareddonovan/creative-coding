/**
 * (Not Mine, but from below - is an excellent example of using time as input to make a clock
 *
 * by Indae Hwang and Jon McCormack
 * Copyright (c) 2014 Monash University
 *
 * This sketch shows how to use text in Processing
 * The sketch creates a digital clock that shows the current time in hours, minutes and seconds
 * Use the 'h', 'm' and 's' keys to enlarge the hours, minutes or seconds in the display.
 *
 */
 
 /* @p5js font="data/Roboto-Regular.ttf"; */
  
// font data
let font;    

// what is selected (h,m,s)
let selected;  

// gap between digits
let gap;       

// Use the preload function to load the font before the sketch starts.
function preload() {
	font = loadFont("data/Roboto-Regular.ttf");
}

function setup() {
  createCanvas(1024, 600);
  
  textSize(65);

  // set the current font to font
  textFont(font);  
  
  selected = '0';
  gap = 300;
  noStroke();
}

function draw() {
  background(0);
  fill(255);

  // draw h, m, s
  drawNumber(hour(), selected == 'h', -gap, 0, this);
  drawNumber(minute(), selected == 'm', 0, 0, this);
  drawNumber(second(), selected == 's', gap, 0, this);
  let c = color(selected == 'h' ? 255 : 0, selected == 'm' ? 255 : 0, selected == 's' ? 255 : 0);
  drawBanner(c, 10);
}

/*
 * drawNumber
 * takes an number and draws it offset from the centre of the screen by
 * offsetX and offsetY. If big is true then use a big size for the type.
 */
function drawNumber(number, big, offsetX, offsetY) {
  // convert number to string
  let theText = str(number); 
  if (big) {
    // set big font size
    textSize(400); 
  }
  else {
    // normal font size
    textSize(20);  
  }
  
  let tw = textWidth(theText) * 0.5;
  let ta = textAscent() * 0.375;

  // draw text offset from the centre of the screen
  text(theText, width/2 - tw + offsetX, height/2 + ta + offsetY);
}

/*
 * drawBanner
 * draw a coloured banner at the bottom of the screen in the supplied colour
 */
function drawBanner(c, w) {
  noStroke();
  fill(c);
  rect(0, height - w, width, w);
}

function keyReleased() {
  // set selected to be the last key released
  selected = key;
}