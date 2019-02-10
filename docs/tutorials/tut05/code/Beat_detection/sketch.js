/**
 * Audio file: 'Rouge' by Raw Stiles
 * Creative Commons, BY NC ND
 * http://freemusicarchive.org/music/Raw_Stiles/STOP_2X2_04/A2_Raw_Stiles_-_Rouge_1291
 */

let song;
let pulseSize = 0;

function preload(){
	song = loadSound('assets/Raw_Stiles_-_02_-_-smRouge.mp3');
}

function setup() {
  createCanvas(400, 400);

	song.processPeaks(peaksProcessed);
  
  noStroke();
  fill(0, 255, 0);
}

function draw() {
  background(0);
  
  pulseSize = max(pulseSize - 20, 0);
  ellipse(width / 2, height / 2, pulseSize);
}


function peaksProcessed(peaks){
	for (let i = 0; i < peaks.length; i++){
  	song.addCue(peaks[i], createPulse);
  }
  song.play();
}

function createPulse(){
	pulseSize = 250;
}

function keyPressed(){
	saveCanvas("beat-detection-screenshot", "png");
}