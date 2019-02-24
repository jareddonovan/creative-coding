/**
 * This sketch requires the Geomerative library. 
 * Install this from the processing contributions manager as shown in tutorial 5.
 * See the following tutorial and reference for more info on how to use the library:
 *    http://freeartbureau.org/fab_activity/geomerative-tutorial-part-1/
 *    http://www.ricardmarxer.com/geomerative/
 * Jared Donovan 2018
 */
import geomerative.*;

String message = "BRISVEGAS";

// These are objects from the Geomerative library for 
// dealing with fonts (RFont), and points along their outlines (RPoint, RGroup).
RFont font;
RGroup myGroup;
RPoint[] myPoints;

void setup() {
  size(1200, 400);
  background(0);
  
  // Set colorMode to HSB and set some convenient ranges for the arguments.
  colorMode(HSB, 360, 1.0, 1.0, 1.0);

  // Initialize the Geomerative library and load our font file.
  RG.init(this);
  font = new RFont("data/RubikMonoOne-Regular.ttf", 150, CENTER);

  // Specify how we want to divide up the fonts.
  RCommand.setSegmentLength(10);
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);

  // Create a polygon group for our message based on the font.
  myGroup = font.toGroup(message);
  myGroup = myGroup.toPolygonGroup();

  // Get a series of points from the outline of the fonts.
  myPoints = myGroup.getPoints();
}

void draw() {
  background(240, 0.85, 0.4);
    
  // framePulse will be a number that varies between -1 and 1
  // the sin function will make a 'wave' of values. 
  // We will use this to vary the maximum size of lights over time.
  float framePulse = sin(frameCount / 10.0);

  // We want to draw relative to just below the center of the screen, so
  // record that position in variables to save some typing later.
  float cX = width / 2;
  float cY = height / 2 + 100;
  
  // Loop over the collection of points that Geomerative has created
  // from our message and font.
  for (int i = 0; i < myPoints.length; i++){
    
    // Point pulse will be another pulse that follows around
    // the collection of points. Using the sin function, it 
    // will vary between -1 ... 1. The pulsePosition also depends 
    // on the framecount. 
    float pulsePosition = i + (frameCount % myPoints.length);
    float pointPulse = sin(pulsePosition / 5.0);

    // Make the max size be based on the framePulse
    float maxSize = map(framePulse, -1, 1, 10, 30);
    
    // Figure out a size for the lights based on the point pulse.
    float lightSize = map(pointPulse, -1, 1, 2, maxSize);  
    
    // Fill with a yellow colour.
    float h = random(0, 360);
    float b = random(0.8, 1);
    noStroke();  
    fill(h, 0.8, b, 0.5);
    ellipse(myPoints[i].x + cX, myPoints[i].y + cY, lightSize, lightSize);

    // Figure out the weight of the projection lines also based on pulse.
    float lineWeight = map(pointPulse, -1, 1, 1, maxSize / 2.0);

    // Stroke with same colour, but less saturated and more transparent.
    stroke(h, 0.2, b, 0.05);
    strokeWeight(lineWeight); 
    line(myPoints[i].x + cX, myPoints[i].y + cY, cX, 50);
  }
}
