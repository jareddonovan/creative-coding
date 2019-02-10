/**
 * Audio: 'Ain't we got fun' performed by the Benson Orchestra
 *        Public Domain. 
 *        http://www.digitalhistory.uh.edu/music/music.cfm
 */

let song;
let fft;
let duration;
let numPeaks = 5000000;
let peaksPerWidth;

function preload(){
  song = loadSound('assets/aint_we_got_fun_benson_orch.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.play();
  fft = new p5.FFT();
  
  duration = song.duration();
  
  peaksPerWidth = (width * numPeaks) / duration;
  
  stroke(255);
  noFill(); 
}

function draw() {
  background(0);
    
  let posn = floor((numPeaks * song.currentTime()) / duration);
	let peaks = song.getPeaks(numPeaks);
  
	beginShape();	
  
	for (let x = 0; x < width; x++){
		let y = map(peaks[x + posn], -1, 1, 0, height);
    y = height - y;
    
    vertex(x, y);
  }  
  
  endShape();

}
