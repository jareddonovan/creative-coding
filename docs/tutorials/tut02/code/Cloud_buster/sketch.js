var puffs;
var pPuffs;
var puffSizes; 
var puffAges;

var puffSpacing;
var puffMargin;
var maxPuffSize;
var startPuffSize;
// var puffTranslucency;
var puffSizeChange;
var cols;
var rows;
var ageInc;
var maxPuffAge;
var mousePressedLastTime;
var mouseErase;

var cloudIcon;
var windIcon;
var iconSize;
var margin;
var cloudIconX;
var cloudIconY;
var windIconX;
var windIconY;

var pmX;
var pmY;

function preload(){
  cloudIcon = loadImage("data/icons-01.png");
  windIcon = loadImage("data/icons-02.png");
}

function setup() {
  let cnv = createCanvas(800, 450);
  cnv.parent('sketch-holder');

  // frameRate(30);
  colorMode(HSB, 1.0, 1.0, 1.0, 1.0);
  imageMode(CENTER);
  noStroke(1);
  fill(1);

  puffSpacing = 5;
  puffMargin = puffSpacing / 2;
  maxPuffSize = 24;
  startPuffSize = maxPuffSize / 3;
  ageInc = 0.03;
  maxPuffAge = 1.0;
  mousePressedLastTime = false;
  mouseErase = false;
  iconSize = 49;
  margin = 20;
  puffSizeChange = 0.02 * maxPuffSize;

  cols = width / puffSpacing;
  rows = height / puffSpacing;
  
  puffs = new Array(cols);
  pPuffs = new Array(cols);
  puffSizes = new Array(cols);
  puffAges = new Array(cols);
  
  pmX = 0;
  pmY = 0;
  
  // Initialize arrays
  for (let i = 0; i < cols; i++){
    puffs[i] = new Array(rows);
    pPuffs[i] = new Array(rows);
    puffSizes[i] = new Array(rows);
    puffAges[i] = new Array(rows);
  }
    
  cloudIconX = margin + 0.5 * iconSize;
  cloudIconY = height - (0.5 * iconSize + margin);
  
  windIconX = 1.5 * margin + 1.5 * iconSize;
  windIconY = height - (0.5 * iconSize + margin);

  noStroke();
}

function draw() {
  background(209 / 360.0, 0.79, 0.89);
  drawIcons();  
  push();
  stroke(1);
  // text(int(frameRate()), 20, 20);
  pop();

  if (mouseIsPressed) {
    mousePressedLastTime = processMouse();
  }
  else {
    mousePressedLastTime = false;
  }

  drawPuffs();
  updatePuffs();  
}

function drawIcons(){  
  push();
  fill(209 / 360.0, 0.39, 0.97);
  
  if (mouseErase){
    ellipse(windIconX, windIconY, iconSize, iconSize);  
  }
  else {
    ellipse(cloudIconX, cloudIconY, iconSize, iconSize);
  }
  
  image(cloudIcon, cloudIconX, cloudIconY, iconSize, iconSize);
  image(windIcon, windIconX, windIconY, iconSize, iconSize);
  
  pop();
}

function checkIconClick(){
  if (dist(mouseX, mouseY, cloudIconX, cloudIconY) < iconSize / 2.0){
    mouseErase = false;
    return true;
  }
  else if (dist(mouseX, mouseY, windIconX, windIconY) < iconSize / 2.0){
    mouseErase = true;
    return true;
  }
  return false;
}

function processMouse() {
  var mX = int(min(max(0, (mouseX - 1) / puffSpacing), cols - 1));
  var mY = int(min(max(0, (mouseY - 1) / puffSpacing), rows - 1));
    
  if (mousePressedLastTime) {

    // interpolate between last position and this one adding extra puffs.
    var deltaX = mX - pmX;
    var deltaY = mY - pmY;      

    var range = max(abs(deltaX), abs(deltaY))
    
    addAlongLine(pmX, pmY, range, deltaX / range, deltaY / range);

    // If we are erasing, draw some extra lines
    if (mouseErase){
      // If the line is more horizontal than vertical, then add extra lines above and below
      if (abs(deltaX) > abs(deltaY)){
        addAlongLine(pmX, pmY - 1, range, deltaX / range, deltaY / range);
        addAlongLine(pmX, pmY + 1, range, deltaX / range, deltaY / range);
        addAlongLine(pmX, pmY - 2, range, deltaX / range, deltaY / range);
        addAlongLine(pmX, pmY + 2, range, deltaX / range, deltaY / range);
      } else {
        // Otherwise, lines are more vertical than horizontal. Add extra lines to left and right.
        addAlongLine(pmX - 1, pmY, range, deltaX / range, deltaY / range);
        addAlongLine(pmX + 1, pmY, range, deltaX / range, deltaY / range);
        addAlongLine(pmX - 2, pmY, range, deltaX / range, deltaY / range);
        addAlongLine(pmX + 2, pmY, range, deltaX / range, deltaY / range);
      }
    }
  }
  else if (checkIconClick()){  
    return false; 
  }
  else {
    // Otherwise, deal with the case of a single mouseclick.
    mouseAddAt(mX, mY);
    
    // If we are erasing, delete some extra puffs.  
    if (mouseErase){
      mouseAddAt(mX - 1, mY - 1);
      mouseAddAt(mX - 1, mY);
      mouseAddAt(mX - 1, mY + 1);
      mouseAddAt(mX,     mY - 1);
      mouseAddAt(mX,     mY + 1);
      mouseAddAt(mX + 1, mY - 1);
      mouseAddAt(mX + 1, mY);
      mouseAddAt(mX + 1, mY + 1);
    }
  }
  
  pmX = mX;
  pmY = mY;
  return true;
}

// Add a series of puffs along the line speficied by the arguments. 
function addAlongLine(startX, startY, range, xstep, ystep){
  for (let i = 0; i <= range; i++){
    mouseAddAt(startX + int(i * xstep), startY + int(i * ystep));
  }
}

function mouseAddAt(x, y) {
  // Sanity check that the supplied x, y are within range.
  if (x < 0 || x >= cols || y < 0 || y >= rows){
    return;
  }
  
  if (mouseErase){
    puffs[x][y] = false;
    // puffSizes[x][y];
    puffAges[x][y] = 0;
  }
  else {
    puffs[x][y] = true;
    puffSizes[x][y] = startPuffSize;
    puffAges[x][y] = 0;
  }
}

function drawPuffs() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (puffs[x][y] || puffSizes[x][y] > 0){
        var s = (puffSizes[x][y]);
        fill(1, s / maxPuffSize);
        ellipse(puffMargin + x * puffSpacing, puffMargin + y * puffSpacing, s, s);
      }
    }
  }
}

function updatePuffs() { 
  
  // Make the ageInc proportional to the frameRate. Slower the framerate, 
  // the faster the aging, so we can clear the screen. 
  var fr = frameRate();
  //ageInc = pow(5.4 / frameRate(), 2);
  ageInc = 0.9 / fr;
  
  // Copy the current puffs into the previous puffs
  pPuffs = puffs.slice();

  // Calculate what all the new puffs should be based on the previous puffs.
  for (let x = cols - 1; x >= 0; x--) {
    for (let y = 0; y < rows; y++) {

      var willLive = updatePuff(x, y);
      puffs[x][y] = willLive;

      // Check whether the puff is too old...
      if (puffAges[x][y] > maxPuffAge) {
        // Copy it one cell to the right.
        if (x < cols) {
          if (x < cols - 1) {
            puffs[x + 1][y] = puffs[x][y];
            puffSizes[x + 1][y] = startPuffSize;
            puffs[x][y] = false;
            // puffSizes[x][y] = 0;
          }
          puffAges[x][y] = 0.0;
          puffs[x][y] = false;
        }
      } 

      let sizeChange = puffSizeChange;

      if (willLive == 1) {
        puffAges[x][y] += ageInc;
      } else {
        puffAges[x][y] = 0;
        sizeChange = -sizeChange;
      }
      puffSizes[x][y] = max(0, min(puffSizes[x][y] + sizeChange, maxPuffSize));
    }
  } 
}

// Update a single puff.
function updatePuff(x, y) {
  var isAlive = pPuffs[x][y];
  var numNeighbours = countNeighbours(x, y, 2);

  if (isAlive) {
    return checkAlive(numNeighbours);
  } else {
    return checkDead(numNeighbours);
  }
}

// Check if a puff that is currently alive should stay alive.
function checkAlive(numNeighbours) {
  // Should have a low (non-zero) chance of dying. 
  // Greater chance the fewer neighbours. 
  // 0.0 = certain death. 100.0 = no chance of dying.
  var chanceToDie = max(0.001, pow(1.0 - numNeighbours, 2));

  chanceToDie = 100 - 0.4 * chanceToDie;
  var chance = random(100);

  // return true;
  return chance < chanceToDie;
}

// Check if a puff that is currently dead should stay dead.
function checkDead(numNeighbours) {
  // Should have a low chance of coming to life if 
  // at least one of its neighbours is alive. 
  var chanceToSpawn = numNeighbours;
  chanceToSpawn = 100 - 0.5 * chanceToSpawn;
  var chance = random(100);

  // return false;
  return chance > chanceToSpawn;
}        

// Count the number of live neighbours in the supplied distance.
function countNeighbours(centerX, centerY, searchSize) {

  var numCellsCounted = 0;
  var numNeighbours = 0;

  for (let xOffset = -searchSize; xOffset <= searchSize; xOffset++) {
    for (let yOffset = -searchSize; yOffset <= searchSize; yOffset++) {
      if (xOffset != 0 || yOffset != 0) {        
        var xSamp = centerX + xOffset;
        var ySamp = centerY + yOffset;

        if (xSamp >= 0 && xSamp < cols && ySamp > 0 && ySamp < rows) {
          if (pPuffs[xSamp][ySamp]){
            numNeighbours += 1;
          }
          numCellsCounted += 1;
        }
      }
    }
  }

  return numNeighbours / numCellsCounted;
}

// Clears all the clouds from the screen.
function clearClouds() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      puffs[x][y] = false;
    }
  }
}

function keyPressed() {
  if (key == 's') {
    //save("cloud-" + frameCount + ".png");
  } else if (key == 'm') {
    mouseErase = !mouseErase;
  } else if (key == ' ') {
    clearClouds();
  }
}



