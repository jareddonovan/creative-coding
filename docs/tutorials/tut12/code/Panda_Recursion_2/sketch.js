'use strict';

// Adjust these to alter how it behaves. 
let period = 24;
let inc = 0.025;
let startDiam = 10;
let h = 0.5;
let pH = 0.011514;
let v = 1;
let pV = -0.411732
let mag = 4.641445;

// These record state. Don't need to change.
let step = 0;
let panda;

// These affect the UI. You probably don't want to change. 
let minInc = 0.01;
let maxInc = 5;
let minSld = 0;
let maxSld = 1000000;
let midSld = (minSld + maxSld) / 2;

let spnStepVal;
let sldPeriod;
let spnPeriodVal;
let sldInc;
let spnIncVal;
let sldH;
let spnHVal;
let sldPH;
let spnPHVal;
let sldV;
let spnVVal;
let sldPV;
let spnPVVal;
let sldMag;
let spnMagVal;
let chkClear;
let chkDoStep;
let doSave = true;

function preload(){
	panda = loadImage("data/panda.png");
}

function setup() {
  createCanvas(panda.width / 2, panda.height / 2);

  // initUI();
  // updateSpanVals();

  frameRate(30);
  background(200);
  imageMode(CENTER);
  noFill();
  stroke(0);
}

function draw() {
  //if (chkClear.checked()) {
  //  background(200);
  //}

  // inc = sldToInc(sldInc.value());
  // period = sldPeriod.value();

  // updateSpanVals();
  // mag = sldToNorm(sldMag.value(), 1, 10);

  push();
  
  let p = getPAt(0);

  // Find the max diam we will need
  let maxD = findMaxD();
  let requiredI = 0;
  while (getPAt(requiredI) < maxD) {
    requiredI += 1;
  }

  // Just do as many as we need of them.
  for (let i = requiredI; i >= 0; i--) {
    let p = getPAt(i);
    drawPanda(p);
    // drawStep(p);
  }
  
  // let p = getPAt(0);
  
  pop();
  
	if (doSave){
	  // saveCanvas(`panda-${nf(frameCount, 2, 0)}.png`);
  }
    
  
  //if (chkDoStep.checked()) {
  doStep();
  //}
  
  
  // noLoop();
}

// Draws a panda series
function drawPanda(p){
	// Get the x and y of this p
  let [h, pH, v, pV] = gethpHvpV();
  let x = h * width + pH * p;
  let y = v * height + pV * p;
  image(panda, x, y, p, p)
}

// Draws a single step.
function drawStep(p) {
  let [h, pH, v, pV] = gethpHvpV();
  let x = h * width + pH * p;
  let y = v * height + pV * p;
  ellipse(x, y, p);
}

// Increments the step counter according to increment and period.
function doStep() {
  // inc *= incMag;
  step = (step + inc)
  if (step > period * inc){
    console.log("looped");
    doSave = false;
    step = step % (period * inc);
  }
}

// Draws a center line.
function drawCenter() {
  let c = getCenter();
  stroke(100);
  line(0, c.y, width, c.y);
  line(c.x, 0, c.x, height);
}

// Gets a 'p' for a particular step
function getPAt(i){
  return startDiam + pow(step + i * period * inc, mag);
}

// Get the h and v props
function gethpHvpV() {
  //let h = h; //  sldToNorm(sldH.value());
  //let pH = sldToNorm(sldPH.value(), -1, 1);
  //let v = sldToNorm(sldV.value());
  //let pV = sldToNorm(sldPV.value(), -1, 1);
  return [h, pH, v, pV];
}

// Finds the center of the recursion
function getCenter() {
  let [h, pH, v, pV] = gethpHvpV();
  let cX = h * width;
  let cY = v * height;
  return createVector(cX, cY);
}

// Finds the maximum drawable diameter given the
// current h and v props. 
function findMaxD() {
  let c = getCenter();
  let lt = dist(c.x, c.y, 0, 0);
  let rt = dist(c.x, c.y, width, 0);
  let lb = dist(c.x, c.y, 0, height);
  let rb = dist(c.x, c.y, width, height);
  return 2 * max(lt, rt, lb, rb);
}

// Converts from a slider value to an increment.
// Maps linear slider onto an exponential scale. 
function sldToInc(sld) {
  let norm = sldToNorm(sld);
  let exp = pow(norm, 4);
  let inc = map(exp, 0, 1, minInc, maxInc);
  return inc;
}

// Converts from an (exponential) increment scale to a slider value.
function incToSld(inc) {
  let exp = map(inc, minInc, maxInc, 0, 1);
  let norm = sqrt(sqrt(exp));
  let sld = normToSld(norm);
  return sld;
}

// Normalise a slider from minSld..maxSld to 0..1
function sldToNorm(sld, a = 0, b = 1) {
  return map(sld, minSld, maxSld, a, b);
}

// Get a slider scaled number from a normalised range
function normToSld(norm, a = 0, b = 1) {
  return map(norm, a, b, minSld, maxSld);
}

// Round a floating point number to a given precision
function roundTo(num, places) {
  return round(num * places) / places;
}

function setCenter(vec) {
  // Figure out what the new h and v props should be
  let h = map(vec.x, 0, width, 0, 1);
  h = normToSld(h);
  let v = map(vec.y, 0, height, 0, 1);
  v = normToSld(v);

  // Figure out an inverse value for the pH and pV props
  let pAmt = 0.3;
  let pH = map(vec.x, 0, width, -pAmt, pAmt);
  pH = normToSld(-pH, -1, 1);
  let pV = map(vec.y, 0, height, -pAmt, pAmt);
  pV = normToSld(-pV, -1, 1);

  sldH.value(h);
  sldV.value(v);
  sldPH.value(pH);
  sldPV.value(pV);
}

// Updates the user interface values.
function updateSpanVals() {
  spnPeriodVal.html(sldPeriod.value());
  spnIncVal.html(sldToInc(sldInc.value()));
  spnHVal.html(sldToNorm(sldH.value()));
  spnPHVal.html(sldToNorm(sldPH.value(), -1, 1));
  spnVVal.html(sldToNorm(sldV.value()));
  spnPVVal.html(sldToNorm(sldPV.value(), -1, 1));
  spnMagVal.html(sldToNorm(sldMag.value(), 1, 10));
}

// Initialises the user interface (sliders etc.)
function initUI() {
  createElement("br");
  createSpan("step: ");
  spnStepVal = createSpan(step);

  createElement("br");
  sldPeriod = createSlider(2, 200, period);
  createSpan("period: ");
  spnPeriodVal = createSpan();

  createElement("br");
  sldInc = createSlider(minSld, maxSld, incToSld(inc));
  createSpan("inc: ");
  spnIncVal = createSpan();

  createElement("br");
  sldH = createSlider(minSld, maxSld, normToSld(h));
  createSpan("h: ");
  spnHVal = createSpan();

  createElement("br");
  sldPH = createSlider(minSld, maxSld, normToSld(pH, -1, 1));
  createSpan("pH: ");
  spnPHVal = createSpan();

  createElement("br");
  sldV = createSlider(minSld, maxSld, normToSld(v));
  createSpan("v: ");
  spnVVal = createSpan();

  createElement("br");
  sldPV = createSlider(minSld, maxSld, normToSld(pV, -1, 1));
  createSpan("pV: ");
  spnPVVal = createSpan();

  createElement("br");
  sldMag = createSlider(minSld, maxSld, normToSld(mag, 1, 10));
  createSpan("mag: ");
  spnMagVal = createSpan();

  chkClear = createCheckbox("clear", true);
  
  chkDoStep = createCheckbox("step", false);
}

// Returns true if the given point is over the canvas, false otherwise.
function isOverCanvas(x, y){
	return x > 0 && x < width && y > 0 && y < height;
}

function keyPressed() {
  //loop();
  //if (key == ' ' && !chkDoStep.checked()) {
  // doStep();
  //}
}

// function mouseClicked() {
//   if (isOverCanvas(mouseX, mouseY)){
// 	  setCenter(createVector(mouseX, mouseY));
// 	}
// }

// function mouseDragged() {
//   if (isOverCanvas(mouseX, mouseY)){
// 	  setCenter(createVector(mouseX, mouseY))
// 	}
// }